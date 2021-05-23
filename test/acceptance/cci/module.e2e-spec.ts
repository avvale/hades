import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { MockModuleSeeder } from '@hades/cci/module/infrastructure/mock/mock-module.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('module', () =>
{
    let app: INestApplication;
    let repository: IModuleRepository;
    let seeder: MockModuleSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockModuleSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IModuleRepository>(IModuleRepository);
        seeder      = module.get<MockModuleSeeder>(MockModuleSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '728df379-967a-436a-9083-4ef45c21ba48',
                tenantCode: 'dicwytfu292qzsobu8j1tpu8ophlwetiensx3733fp6nkkr2fo',
                systemId: '91b13a23-fb32-48cc-bd1f-66000107be6b',
                systemName: 'kt8jqrtbwcqn0irvg5vq',
                channelHash: 'uekxwe0jur15k6khsuje0ros1jemkoequnw5nbgl',
                channelParty: 'ggbnqs9783ef9ss97ejhbqd3yf7hfdratrnj8hpwpueamzoc0gt003x1bpzizqbp8on7fxm03tp0lhuwhdjymv3f6r5y4gea744o3z3ygikx9sb20mprqhmjxcpugd91v254rlzcjez5y342zdoc2cjvwfowk16l',
                channelComponent: '00i8fdqmwoanckt433uk2vjdddh2fujk0bygpeprw4ioh0zvmw0ok9tt9z4kmahx6kyl6gs93l2gc3d2sqwysk44fy9pil4ceenwctb9f28gn8e50lrkyh39ssi90kxphv8wprbmo45qnkcec2khl111qjrjjicg',
                channelName: '3bun9sv1jlc40e9s5ep8a1sb4hjkl6qn78m5oh4dowrpte1piq5fbhzdz206ofd1iyb94iv4yd9u7j2gvwvyplh35qq9mie5yub0pf6xssrlahcwhdcnvooiz4wxqf1b9dqfj3t4vrsbge64nk9i8lt7n1zztacp',
                flowHash: 'ymo04p3mu0lkawht79ce9lm3tmw8yritz3daqb63',
                flowParty: 'uju7twgjmdhr2dxi315cs3z01jghj8kmhpwzn018fwt197xa91nayiucscxcezxwmsj496nsve8a83na4w0gv83hajetchjywultvwpfgrkfww9ja1s656vtfkf8o0c36eu3fpnzenezqp3scy9uza7qaify4c34',
                flowReceiverParty: '7ajjt65wu1uq0mjok9mbv73ylf3l1x651o1yb0g09vhbussin2epjo87o5e97bsv56bukixf00k63rlfj6llxj6h6ag4f1fvemi1xoweborej6l6wr7b6fsj9w6k77ooxb5xmqdsb7o15ic0ea6rvmygx2oqyo15',
                flowComponent: '0jdrawyoupgwtkrtnx6qjwz1wguy50s125sprwn1hff7s98j5dupaf1f16emlsonezgl3nbzsrnmly6p7jmdgkm727fjn25tzj5u7qw1rakkh0uvav3slzrnbpqynlp0cahjjgrcfw4isek5xd4cuuxehw97ednx',
                flowReceiverComponent: 'rotx76do9f9dbunenu9kl0m3isarozld95iiflt4oq4e3r0gl1r5lgucw2tijuh20guh1qi9c4lfhl7vcpnktfvnno0uy0mwpzwbz06aavzyga42nog8zhddcjejzqzdvqahtbrpbkdr9zzetq38mqq1o6jhvt9i',
                flowInterfaceName: 'y5ggucrdn8v4bvojcc478dnjg436hnniy5kbltl52xp0vdyyzvihd0f1su10e44rqu2toidbz0ar0vwv2enadpyhtfx8ptet29w05etbtomovshh3yblbu79z46yzohe7u5nliqhwwgue5fz5xsyj6thb3f462xi',
                flowInterfaceNamespace: 'hpnjsfcjvi7t4e1bbdcw4gtnq6iumls8b04ewkpgnawbucd66elxklbnk5fbhuijeid116wb25fsei48t0m7xhj83w556oaqs4s4l34ymmsc20j9po4i2euov4xp7xlgfw4qz68j79ckdwiz0wpu1a84vm8id1bm',
                version: '9yviirhqoyl9w7offo9w',
                parameterGroup: 'yusjitiewwbxvzdl36hgi73ckyvrbyn5g31ar6t4os7p6rz26z6qpcuift3ew16zujerlfhr1r1hxlwkfuvj5zk3by0suykxbc0eldfl468e9nlmd3s9wiyie34hyfeqwwpwkw0uds7evgg8so42esjuak3wr693kknwryh1b2earwfpnvymlxyw2cbh8r6h86l2l3qg0xvbtl1b8z644uitmoldos1hssjm30omuncod0zxpyf8kv3db4ptt77',
                name: 'yk8dabw8x3stgwlc6tzt9hhbt68d7jjvzqf4ojod7d6hom0woaynnmesz0a914qm9p6kl1kf2mohtu320grgd79ppasncbv4vflnveu56geeiwnwz1wxm5gg3eftieo8ei06lddtl20puz0321o834351tggpgtikja3mt0efotfmaqinbkddw914jhijsgrbkylpmvrljj243vck5rgdfolfg9mn3f93kskd8bay1mlw7vlrtpp537oydt7nk2mjkpjrtfrcpltg4yqy6fhbftz9ibgox88au6n0pu6o2o0olsu7hhkaffixkxf87tv',
                parameterName: 'tdvw07a07all8xekoiwy9i1a751t70k264zv4irazsclec96zg2l50ngy9d2nuneigrgp8xwdm78nffmay6y786oan2jq0ywxn4pu5esa62orno6bz2lwnre8xec9r26lk8a999jrpe3hq506f31xsdfnmlk15rt4q4h3jy0n9n70k2vmd89yz0muvidmkqg3zsdagirvaj6u7m13auv6e17tsfs4m8h4p0t0e26cv1pxsooyyvcyp8he9pp2577imnyk1sxjq32m42bodrzkuni6y3y4e2waahzbuozymp3wdpuzsi5ugrhog737uh9',
                parameterValue: '2608ugrxlij9zzhgbtov8wcny5vdexbyar3websx9qfly2ool8n2x38icst7c504mcnhp7a4llyda55scu93nqb9ox1qd2vjwx9o6o9lgd922kim271r3z0oebsa7q786ldo72dtupkliwvyz1a68sljmzh71z41pnhh5u3f2kykcm0gpxkeulj6mc2e371lkup6ox135db8e86fwoyov6ogfsksd12wpjnhc2ibls7e4y3tsrwpjyiby5l6ilwd9wu4v6fphq6q9euvyru661xgk7mbks2y0yzgfe57ccewa6rsmoatuj9kuqd8fe07b0tac15q1eqtn7hg7d7h6hsn9y8t78e0xakmll98guw79m8vstw1xg9dajvruv2sxn9zm8csclslp2dnx8j2rsy1wobvih0dqxrlyu68ygap8n4a9n0igrhuiqk7d08cennftu4skgq2eplmxr1f8rvbjfrc56tatnj6ed1t65i19tukzrj7xrustjutxbsx7bw4z4ccnp4kkh9t644cxoi73n865go1dcm6tcta9k9ikhjawqpi49tb6mipgpvq7ls1xw9yybwwo4ap7296lz790e74xacko8jcoheq8lb5jtmq7pyai8qqck0f1eytlus7jq4swzaxhqiax14kdeosa0w2be7chbwg5bttoh9ed8uv81kf88f2muy595ojdd3xtgsmff0josj9n8aysgbn413x5x28xnmeljlbza0s6s535hp73dowguc25r4omi3h7u6l58gnkabnud5v09rathdre8f7rgng0y1v4qhym0hkkzs17yujvkbqlyu7h55ca7efjzr7uxw71eiwfi7euwgd5m6j6br9jf0ad8duinzy1kv44nmwmyq6yzs5e00bvng3yxwjozz55c3mw8biior4yu8h1pn74kttydmjw2i50fk4tfho087v79jwnok9targsbx2k506pal6b5m7xycveb7au4w3tzzlud8rg6ase1ijnjp32gdchjk0np3cg3v6webzppezvugffttixaw6c90sm6zabmd0bmpw2orw7d248wznikhw70hf93pybc01gsvd296kaqgfvmecqb40dylw4vynmqgdbugbzcup54jz7pg5uxh7tb9qimvfuooyns70wn4hb9gwf89fovdff2y8j0b90ssqwm8emc8vjiypp7sc66i8lymdc7b48r8vszrn3f7mtq8l3mlei55e4f1xpi26eml08tite56jytvd41el6a5yz7aaf3j3mmum03xf86z4sss7y4j9cgrtbbyy4mbpl4a3rpq013mocp939ksxo28nkoty3eaacyt8t7gu5d95ztljtfvt2xqnu10fktk3sxm5tlergsct6ckr9yd1e39p62njrfnv3862qs57lx3glyf6kes4d36apxmc6rv6lmr87d1lazjihmhlun4sb7fx8hds4cj77evq1hjq7fzxdh04vf5fnwa42o2tk0tn4oal1yrl1s24iiihqtjzgvvrjmx8ud9hc4k97b469lvdsuzvemcpkv9wbkhrvfnfr5qzhneggrl92v5vnj1pjgnfcgbxz65yfkqrr0xsq4wo9v0k7p52vs1dk27571cstk8bz9h8mvex4h85myxe2l0bi64sri2cbcu66n4ucqpkxmx0az4jojy9eumi3k08wkebo7xqedr4huq06yzyv4454mxfh1kqzowwv6futpu0glosm17adionbdk7ohunt8mwzmcnktlsbtqzr02n2a5i8omunhw1knqzoacm2qwttrsmc8guc16hw85wcesjjudk9n45b97abvf2029pfcutontj0ie2vcdwu5ykke30qc63ek1tucd3h7s1526kwys5yh5yrua6nltouinxac32ehospizkbd7m25j4uupi3jlcs1kkodl1hoav26p0lkodzsb8f57nmnzligqndquh21gdcssfkb1mqdnfwgy6wxryc2jm3gxrz5xly07b5kcvzm2of00brq9qp3jf79x7v0hd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '983d4226-b04a-495c-9dbb-c406aa13b929',
                tenantId: null,
                tenantCode: '0d4dytjmeme0pxbw4sin2onqnucgpwewvh97mm4z4yr1cvhsbz',
                systemId: 'd18bacb8-eb04-41ad-9e77-bcce8f8eeab8',
                systemName: 'edsg8t5o6tmgj71dntis',
                channelHash: 'qr28cx50w60upww64fejov0dls52t2qv44xrkl8o',
                channelParty: 't1eg16s997i9zgkpi05t6dbkf1ea3a7rnfa4zy8qo64ljkmb1wzq5fy5pjhzxgc79u9ptlaw90f5lx7mnro351zby4f0y5i6hccqqz2ousy2y08lyqgesc17lfvuds1r0u8ne7dv4nhp0qgl3zcbbrlljtpn4g74',
                channelComponent: 'b089awl50np157ulm6a1709nzmlxa0m8ctq3zahmoxhzly9gkjtcs9wbx8akt9mmpb0p68e3tkqczdsozkywg9iqhs8jp911jsw9onvc185dt5n8jfamv3nhjb36d82mogsrtsa9sa7mvsm4uuyivvd8bplxws6e',
                channelName: 'ws4rs0rpmvmxuf2qt9u3msdo8yx4ih4mx3266viajaykd2digdp8ov8kb3t1icx5h4ewysoi5lbbilemyyeklogw12t6uofve5q9chrhdena5deymdibcftxohms4z2mdpjiys3bnhg5824fy7n3r83xd38mrfk5',
                flowHash: 'ohrlwyy8n5o1x7pb8odj7139zmtju8bo3fndq6d8',
                flowParty: '4ka8e8e2r4bcvfxqyjx1rhcmkugijkz8m5a1fbrwm9lyo2csqpip18fhn0cm85b64mdtn7b2m6z1nqql77109p7m6bso770cqlh4qm6a8cm1rbkbl2rra130j31lnalz6cl7xh07fttnd3r6s09c24wn3796khld',
                flowReceiverParty: 'aztlvt9u8qme2o5n4qy9xrt0fdy8rcyt6i2gvymdyaluuo48phlytw3fmwl9sdvaxj0948r0dgzfi7mvmyul3uji3fc3wka3yey1rb6lqdquu5ed935nalm3ihxwq99vovi791yr6tttzr0o0xexyc5zal6hkeyb',
                flowComponent: 'nhz6ejo52gtw4c8etfj6h3d149v9ao7xsjc4mlshtbhgt7ks7egc9ygh75zqjkn24qbemmi94zuo0dmu7mjst3gdv5fr5loo20eyt5jaauyajhu5ivhzdlqyfkeot7ok02zax3wux7ge0y5c6tajka4h8rs7c2rl',
                flowReceiverComponent: 'vf0l0he5vramdi2dpjip5og5j1krkrg1pyxtccs6vpy2fjo9whz9mx8dti2aem0a6cehzv89agkbmhvnzht1k7fdjdl83e9pwhsj1i2cxhgvd5x9uwb5femeo6dir6vpdz036esfb4tbewsmfz4u0ut4tqnleq52',
                flowInterfaceName: 'un5phnvid3heqt25s0o0kt3ws9d43pdg1901x4jp1stu4pgfjs8bil8lqrhyew17qbzc6ezp65l6a1xpi6cqt5qgm2nuduf2ay58s6ms4jddi8q1wb6t49o9qy3bzq48fc4iu58wqb122xputnb03124257v790g',
                flowInterfaceNamespace: '2u5da1wwkzhccj11py28vjjnift4w5d2mh4yz3uzuptuqnoh0mioq2veohtycp5mckjsm7g4zgs83kh53q7lu2k1g2ib3rt9nlc1fpgawrfu6y9x7zdajzrxwu6f7zx0xn30an0fdvf6yb2nqsvgv8ti50uuof0v',
                version: '5gcfzcu0ob6uyrjfp2k7',
                parameterGroup: '50tb3kkkohbjqjrjfx1iv99o47967dnu07udt0rr4m317fwvrzc1jdonn6bb7k4wr87nssidd9h9dgz8ywrprhjp4fzoytrmssv62cs12hxzq4s8d2ax6iiwop5soqsveoeh5rezd3d51xazzn2u16f48elfc1xfnuo8ydf4pgk57df5arl3ctvg41h2m6fajl769mkghc578qok5b6qfacuqmaiy7uaadfndkq5bq5eucazh3qishfefsq6jp6',
                name: 'a983d5ijf68jrsjhg3we4lk2l4t4s3egi5kyiupd7sjy67voljl81mz0hgnpttagsk43kma5uzobulr7khcxxrr4j663qlxgpcous4pyascoutgzsamfd7mibequakcy7q0k40v3y4237dqrs4ky0njcvv1r7k40xapjyl8e9n67xi9kjf2qup52nbon9zy0d3okg53n4qzn66xjvne6vjcnlyhyn2mcmofbyupn56og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeqwhip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllk',
                parameterName: 'tf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488cilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvxg41m5b33gurdpmxqkv632wsbi6gd79ftz960fhglkf7wvk4qakt3q7vr0vasfva4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q534hjodoziky3rha2wpdzukxx9ldxac8cay1ymln17i8mio25p4avx09urzxj0o5ox33iki0dcp9ugtw487i917ivw0m',
                parameterValue: 'jotzfsvm04m3q0469r2o831beav8vaabf07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7gqw5nspwii3j9mtu6k6ay6yun5uai8u78sr6r6v4gi62abw67lle8u10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15oh74jk5b0dqavs4jqjlr4wz6j10svh2c1n1eo7xox7h606aed511dqd8p2uq7qw144msouthipiaihjjnvuearea3u4yib103d5ec137oqh1mpmufnr7s3ayt8uebfr9u6j536tzw7dpl7t3wv1j0800yrwtnz04xe8wjsm6vkja8nis1fjp64npwg2pilugp3gto0z2v8d6dn9vx01wp21073grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2ymf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03lxbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9h7o55kdqyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd82qp6j3bglqg0rfks8b54gtfgsk23e67u6ekykyboisqtv4rhkgy6l0fciey8wxyallsgjq9fowaclbmdjv4gziewpmd788prxw2bkrh5r9to3fbdzn93f8b5q19tcw4qigsbhllyj8l3ih41jgl00fxhtu9ulah3wzkc48ex8u3ntm9p8c3oxak0n9nh5gmzpbeelgs8qf553qx4lln7v8ebh51jiy60nljqktrtnfe9maq6wbfs1spjax0cyvovs2q5cd3esg0iu2hngj7s93e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca3r11ksxlnp1n66vm7i2i218v8l3ng5uks62jo3952rjppprpwaedpfsozl40ru5lwj4m583bk3nj2d5slutcgbezbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpoopgqcmh87914iojfv781vebnvd6quumxyix0hul2w5s99kz4t0u6t7cwpojtarrbmzao1npuby4mxup3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktaiv5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03uj1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrdnn1xfj25ppuas432mfzf4o9471xwrbss78rw51kgrup2o0cmqwanwaemdfy0d3gdp3dsdfixxn2zq83gm4yfaxbw1a7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6qdao8ptidaglps8z04jow3j418m8n75i1ovexanfrjwt0v8rf6mfhqrisw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg3qz4uf39ykk2p1d0rhybx8fe00gm82459oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeycgg19psxhwuw7s4nxgdtuhy7fl4gdco3liunxpuewux8u8alj0l85qwtj3td74i580ac3y9zmov2dzq1myzvlzly889fw55fj4vk0qpgg88on9muo28r7joiheztgusfi704mdi33pfm7cpqbt1a86nrjagm8szltgid',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '05c3dad1-21c5-4bf2-8ca4-919bce8bcf7d',
                tenantId: '17162829-6284-4e89-aaa6-6836f4247fbc',
                tenantCode: null,
                systemId: 'd1c4c758-7739-4d3a-94d6-fc1ebbc29e99',
                systemName: '7gl2ukdj9px2b3nxecif',
                channelHash: '05a9mcng3tz4etp681uxgvln9xfp4rpqkbs4v840',
                channelParty: 'ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9skj18ahklsjp8g2qixarb2nqm7tuk9q15zonq2oiurtxaq9e3ciy48ov9den8kfjty5w8xrch',
                channelComponent: 'sv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd7n17zl2ylbr0epsmw9spwww10o6qixz9qlpt1vkoywt2x8dig0tkumhr277ino2q9fy4nhqyg4dg6vh1icb4i6jj561arzo18ovg8qlnejiayqxocd2era9',
                channelName: 'ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzy',
                flowHash: 'pz74lavr9ghg7uifxohk7ffdy3ht5d5wbsru4vmm',
                flowParty: '5yqa2jjvbzpdpjikjix9yl22ebhmihs4cj5e23hqy1mjgnum1h3aftrjhcc855naatx8kclbjel41zxlmw4h7gbwto4u2lhlaeckrziotjzunc4suqrqbjhgv1jk31cnrbtjc6o4m1vgz2z47qhp572sm21s62y2',
                flowReceiverParty: 'bptp42u4fmh2kllpurie3csueh7cet43pveh54irimqd8y4qjlaghzw8pm3xbxdkjb41w4jhjng6rdqjr4r5jmdhi0zx6ycr6jr268bju0ijsnvaxi703m3sx2xuvbgnh69cx1co4ut4skpnnd1h64a7sfl5ev0z',
                flowComponent: 'm0n6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwtj9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek2qqug',
                flowReceiverComponent: '3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoeulx62c5b86443dagg747m8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v135un6e32899sq1j6ihgpqve9te6vzm3el94bmxme9htz',
                flowInterfaceName: 'cghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xjtskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeqtck4j',
                flowInterfaceNamespace: 'ylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxjs4evlx29hsnlqw0rk7razqwzaalcnexnemzuagim3r9f2e1jjobwaoxe2tcwmwx41kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpuqylob',
                version: 'o4kkw38e4w258bgar9nj',
                parameterGroup: 'anvv7c5n34s2hf4b4cw4tbpwifz861etxi374ungsjonbt9thcq7o5s9utxg5auleixlgqs3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4mdihkow5ans1y1wdag52hklhtptpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6',
                name: 'bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxgw4hhbqqepi7y8p0xvcglcshzzs6jue0s2d4oz6murwcvzbjl56en5y2gvxcbblnthk7r7rl7xtmufm1mq3u1z6gitw3f5j1u6wgmup1gqms5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q4pwi91aduf34pn20qvpwnba6b5a3mx2hsqpgqrl1ilrtbqmp9hq',
                parameterName: 'tr4ne937jvhip5s9rm26d4yu7l6hrcb7maoirtk1njgmsc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6bnbo789gmspybhpwxx6gt7ojc0i232tbmwnhk325rniwbwgggnhk9fvqndlt6xff223oh0rdy67j30vg0egyj8dowa0048qk6sldyed7008r3f9btblhy5ktwbg3v0s3gj55lf5siozkbxlpxmyqvy2lh8q1t6lk51zwoy5mzhlaun7x0cf5lei68d',
                parameterValue: 'c6xqftek39k0ry8optfwho3l981cgprg5o6wg2ndrvhvfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo7pi2l3bgslshugknqvf93gwylvc2acoju6d9tjlwlii9q6erbhv1qqflksfhtc1ehuio37v3y27yib4j6oc5gdv4q0uwrhasrxy1r75c5afiyoksiydqo678c7b983eigwfe8gop237ryj2kvtxlyrvp8bqydmmbwvjuo82flyo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le7zyi1eigu4tkje1u8lj4n4npfai70wzhrggxjels8j8oubxat9q96ugk4sd38dbyi6ez07fcxjtbb0k6nve97gfleqxp7uxwf7sbdjo68bxu0t7tqkmndnnuof3kkrdk0q0rm5vff3zxh4kghoe133fwfslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit1payaa8syabwnu88di3cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8mi2oc6ud9iqycdobqb1j8qi1t9fwr66f35yudcwzusnhm8shc1zvoxll56mchc84xjily1gzmiuraltys0dlql1uhrvkzsf257c7sgsfw3ylzkrte9itwz9exo5gt020cq7wgxccf2uvz2d28mbkuun4wh4jbya49i8yizrofsfmtf011vgi2ul8dqmudj2ger0d5zc6l7n8lf79gy8izezqxchg9ek48gyvjaj6t0wnsswc836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzuknrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8d3a1rgxlmly4tt4gvt6m9mc8uvcj30pdqcyx3q4wat6nt1zgg1daiyv44na9zoj93r1sacekbnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh66ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge6xchaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kujif4vya64p80gogs8s8s9oqhl9of2il78zry54nd6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1pwx3p8y73hbn7bchixgxcb82j63dm03mfwm6zee72behgq4fotjrvdr9yoclxrf4ucf6oddlp1547eo70x383tjnxur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0oul9qeos56mlqyg8yq58qywp5a65nu3nahhn4cf7lpfdhvefueck32cxj9dd1er45kdexipb8cn5svw4hnkd9h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkovlf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9o29l5nmivnj2um3xrxgzmu9ngze343p4hd0d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f0ccee08-1a43-43cf-ae9f-45df49a2d1ad',
                tenantId: 'dd6fa8bc-d94c-49e8-8ce4-965290d9d06e',
                tenantCode: 'gq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrz',
                systemId: null,
                systemName: 'i5cjhxou9f9jjnm4j2uc',
                channelHash: 'pxvn35v2k6dthfs6i4fj5kmfc90f65rn5t1k1cfl',
                channelParty: 'rapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prwlicjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnymt6dfoofix2iseshr5xhy25xyzb4nwyixuv4xoryf45kc6ux4jpd',
                channelComponent: 'py1up3uqhmjr7vonfvkyi2r7ixueil0i9xsg281hfywvvs5f4c5hlbpzlh91ggrsh7pk4mtx5frztpqejhch4u638y33mmwob7jnyl10oy21smqgk0jvftokwddzvv0l38sc5e24vdh1e4pj8hjkmyqj95u2zosa',
                channelName: 'vxje58z4vuj9ns3bp8gokxi6f1ho73pk333gmnn4jcja6qhhuk63o7gvgh1yvl5h13rlpvuj781r2jff8nijzcjq3pu54tjvxu7tu0dw2k5ofm2y5fivm8cdpzhi9mmfviu4vncm0axxeojyni5x7we0umc2e01b',
                flowHash: 'icly33zj5as2nrp7cw9revdto3n6p1nypvaglxev',
                flowParty: 'xkwzj3jqknl9hyqmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0gf11bf4566i0ehlk3s6pdv8ngilwpph21eu81o202g42coqnggmudl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw28c5',
                flowReceiverParty: '2q46ckqseufgoehk1w2gndehir4d0ahjefzzhk29iwvlnu5del3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlkv7ifvyrba9c661e4ow531e440l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju',
                flowComponent: '3764omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofuehfsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9t6jp9yhstskiwmkwafz1yfv5kfvio74ctk2c',
                flowReceiverComponent: 'h3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3ioo1f6jvv3r45fl95aisfx6te68vgmdc1cy1433olwoo4tonsndhusch59jpgfet563n5r6',
                flowInterfaceName: 'k6fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq61ap4kc6da6ak8teqzvm3jcto5wipqr8johf8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xgqggdzsssntv85uvd5h3grszephs12g69e2b',
                flowInterfaceNamespace: 'kju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy520y31ew3gxse4dajfy',
                version: 'uxi2pg4uejf90x192jgl',
                parameterGroup: 'z6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfvr7gai36o5e3de6fea4fhpghg47rohcq1er6g0c6qpxiyquz93yu6kssbijsyuur4o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qbocr6wsq8rk1787mk4bccxznj94bf1ospvjjgp5kvbla38thlfzzlms',
                name: 'msd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l4dcb1lrvvsmc4usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d9',
                parameterName: '5t8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrlluz1kks4fib5dzj3sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc5jtncykcc4i5wjgehra3h7ntb8h4gryo4u1g6axes2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxfkzwkm3s65z4ely',
                parameterValue: '2l2fl4ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm01pixbx5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3jd5xoysq0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm7ez59wvkqa6c50704gqrx51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci0w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v6twg37kj78tne7je7sphnyb9z4nmwruougte0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1iiaph7fxh68uuawoz0mj35k9rl729aszth2r60z7jr087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0yuod913kxm7abeeqoylqubuqf1gpq17hrbmrlnz01j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76jd2osncw7dqeiyugo0b8ktenv97o300vry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecjxxr77xck24qqwt1spxvnhv8ivuwjbfk38z3jfzfn48ngkfkdvln7f1az0cudnzh4xuocnudtx1j9xdeuca',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '40f0d414-3687-4ddd-893d-083ed3efa5cd',
                tenantId: 'd488b60e-e1f0-48e6-97a0-3190b4c59fe9',
                tenantCode: 'mleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4',
                systemId: 'fbda0f15-ea0e-433d-8e35-2e2bddf8ad1d',
                systemName: null,
                channelHash: '4vupbhkeg58a1a5q6lce938prpeyc6wwqz1q7aqz',
                channelParty: 'pd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey',
                channelComponent: '4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5',
                channelName: 'og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzg',
                flowHash: 'vr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8',
                flowParty: 'drbwdg91c75aljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2',
                flowReceiverParty: 'q570mqd053z25erhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuw',
                flowComponent: 'q08prxudzct636hevu1dbmpifytdtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy1',
                flowReceiverComponent: 'abjtelhznk33kr4p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs53h6upczew28',
                flowInterfaceName: 'ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxtf5qbi2u1259f',
                flowInterfaceNamespace: 'vtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0oac1jvqikig98',
                version: 'mchg9v1th02e8y3oddhh',
                parameterGroup: 'vthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m77ht8i35oj3utemjh4jrggbhutcw2a1dfjfh1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1obceih7094s1mhkc20w3ewbdls49f',
                name: 'liro2ljrq3i32qkow335elh14maxiv3wuel68l9yle8zz879dp48u42fxqmhjg9qrmjo0ezgoqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb8xb193zcedjgoz5c343sf5dly62y5mkd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l',
                parameterName: '7c6vk2oe71gi5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8b3gf0ijpsnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0dgg560',
                parameterValue: 's0scdaucc6rntdfmq9t481iumr3fa2kws7hjr8lyfe7vx4mriysi1a7ya4aaomvth7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4wdh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45fxuyraqtod95xb8fewvsvr2ogt1ovpewbqwjqx8o97ffzp8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7ls7as2ajtxt427j89iwn4npijk3a2ahn6rbn7ncdyhfj9mao3tecb92vkyjr58w5ctbm6g4hb79rqpwxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemxlr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdca1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiwqfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nspex6edzrq1rvzqnjhuxd1g19h8oi8i4v55ievpf43sqewplawrwtxw7419hkviqtdt8lerqznn7wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8otien7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clcgc5otk52d0s6osrfeouztnxuxzzawbkbc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3f832640-ac37-46cf-bae4-7a11abc984f5',
                tenantId: '3282b2ab-302e-457a-90fe-4eb505b85728',
                tenantCode: 'beyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4',
                systemId: 'b0047fe5-869b-4b76-8982-20b0ebe6c3d2',
                systemName: 'sdjlmk5yx8wx4a3al2i1',
                channelHash: null,
                channelParty: 'clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdeenjo93l9xdy6lnxcipmk90fnta4trx5j7c14025x',
                channelComponent: 'khrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkb',
                channelName: 'ghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3rr53172p5uitjpbc041awaghculjzqxhjjv7h1645wt1y5nnfe8tclaq3asus7hmvcy9h3',
                flowHash: '8b2nas7043w90ob7pncm29eyjug20yopi9astk64',
                flowParty: 'carqs9s5brgya8sa3zkjv2izn3s1kz0pebzc0ytjqdfs7vspolcc6f0ljeybyyo7tct9bs42t4yl29ialr0ownpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b',
                flowReceiverParty: '09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qcisfaa49jrn56doa1psyqyqz40dm7o3uk1mzenrzonnica1ny09gx65k4xjcyf9iat59lo3tyloesbqh7nnp37ks4a2yz7p89ubjw3zskmlhorlxvszl1',
                flowComponent: '04q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuovyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21hjotp62yebx67alztjxnlc5r38wcm',
                flowReceiverComponent: '2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k6qw69j7r8gtbr7qwgp50l1362rb5gm38xvt1styvla5kygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kif',
                flowInterfaceName: 'glp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t71iomtlfkdowusjl4bek9fyc1z7be9hs2aeocejq54gv7p19jrig457w3aau1gqsn9wnx7znq9z41o4cf93gd5xib59d2ofz7ebngfhkbv0t904',
                flowInterfaceNamespace: 'fy9qu03tyzspeyvba9h0smwsk2wj57rh2gb3an8pldewfx4hfdsdovbplmtckupjfal1aaxuolvu4429emygxfmej0idyka28tn10kb3yxqmx4q8vby65vunrmh767herjzptl5kqldheptb68wizt6xbvrhnzfv',
                version: 'dr7vwua42eurschwga1w',
                parameterGroup: 'evz5evetnclm2shscoti1fm1gxkv96mlqx9squoj6fcpqhpjhtrn4h0lfh1exf3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun2kjo7xasxw26tvy7akz25dyr70st1jjhbhaq4phkjn4ln8kx0gpd4a7cv84z3cvzs5w92sy98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7akedim55ef6pydzr',
                name: 'nlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf2sx2ynmssepnq3pn2syvmbtypz2grewvy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlpnlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71sm43xt4lig22zbrlzco037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4blakg4g6m4mcc',
                parameterName: 'j5wrzd7c3s7hi2czus55z1vwndjo7oump79fbg8a7a8w17zn3x9i7dvkieogy6tbfv41kjeke4r3qgv7qdq7rg7c5xwpnmi4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmbc4ogetlwj63vvrblps6dh987cswhojv65w20kvssk0vyzmajwmy3fdbhqn8e7mc49146s2z3f95z0kn9rl5b3a6s21panyaot054shcx71if9lqqrzfw8c6aq42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs999bfqdbktkxkg0',
                parameterValue: 'vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwislaz01ghi61apxtsev48uxmtr2ytv0dznoryst470dsl2lwtwkq5j9xutovl7wkc28kt5i24ag3lsgvb3ewytfxmijn71vikz9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkynaiqglnwfjjvs00zg1jnczksdxtgfqyd1qshubcjayp3skdvgfzvai7e7r4padfhc8cs9nsc8d0n1iufqhqpyqwebrjl4gmvjrg26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0max2f7h1vggoe1v7h4igsmxfxkgg01kv8km8unycg75q2j2imb9rjeidaz77i307lap7bjo3ffb6k16odji81mue2rq3vvt7zzedv5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5rebsl03g5mxf1oshvawb4l5xhj9kch0l0zaoioltznszyz1rjdo7b3bniz6qyn1ht9byfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuuu6elu3ql2xcxdsic1ptdv7vqgdv7xfi1pj4ztmvx182pi75omxh9paejmskdwc0k7mbkjnk5rhdmahxr3408881e4h3zhsvdtmixc5fd0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49crwv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rbjnmss9h462vv5nz0wa43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p9tmuhm57ddsi69ozk8f411rercw9enak22cwssydchlc8090jas22c5jnjz39p51fp1uaivsxrmi3yidpbo80y7ufbxsnx73mbgisg267l7hkpdy0tku7p14lz8vcmobmiq80orc936x5fh5vufwoko41kqps0k97xudr3rvuezxbslt9pbgskpkz4bjnb7jgbxf0o5ca596xm14src2f9tdp8pfy1n2ge2u12le4feh4j465fjmvbvgyquxm1h9zalpr7ybq60f3mo6cxtkvn6iwzc9svayfl3zxz7831n9zqkoqxsa2j9oxtoyn2joy9d1nkba87zecaxfk1pxn9ww9a0dfrcekg4bxiy635lqnoqjzkqryilv6hefbsysrdt42lmissstn130jiw308q9cdyrawge06cmyukvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjto2oshejk1m1170fp0ocen5dmf34q0fl1cltuwiqpkal4a5tdmm4ceoim8sqc9bb6jp656veizma1gx2v1uf7qn9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1vmhruke407ofb2jnstlh9cgfyevrwaertasbov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomage8b178sp9dibrrk7ovbi62z2yopf26sc6bnwbt7lodm1vwji2zydrvqxk7e6no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a7aac50f-2f2d-424b-98c1-24c1a9317c95',
                tenantId: '352eda2c-be4e-4f61-9322-2cd3efe75fe4',
                tenantCode: 'psw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5',
                systemId: 'ef7f0ef4-5d23-4d2f-94d5-a16800e20e3c',
                systemName: 'kpyn7k8jpempejarvy3g',
                channelHash: '9ayu4jukf76b3521ozdlvfp1s48kpu51ryje3hce',
                channelParty: 'rgdqzqlbxoq4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezite28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv360wb9lgivvsp1uezflhlq77gtoso3gma3a3sr0lsmrtm6ha6hp20sxmjpnnsn0b2x8',
                channelComponent: null,
                channelName: 'rgyskklx4tot76wmez2qs342vaqerk9ggtuxdpixwosh57db8bk6mpmzecjmh0iy0yndnlmw135cur6gfwjuoyqg39v2ou9smpfkvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfsr0xy8p',
                flowHash: 'x3zmy64limepgt2hyn4zi89m9v0ac85y1hbspg9f',
                flowParty: 'o2jpoqkk80883gx4hnmkd8cgooizy9o6g85m90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi7vw3v2',
                flowReceiverParty: 'ec8e4f4j39auyar3v2bhdubxfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6bl6om26tecqffqepu6sdh84ninlr0zv2pc9q6g040rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6bd43aip',
                flowComponent: 'dyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5vecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3f',
                flowReceiverComponent: 'epex01ax9wqnc39k3fs4x8wybrdm6tos584b27ofvk9495blpf9tepaqo6y7ld0jiu4ub2hu1gmywgsdl9git2yfpbowrmwc8n093ou9upcjjplcpjfzp16ldct5q7rlfawk8vplishs1g48pmowfwlchgcje8e7',
                flowInterfaceName: 'nnj984w4wrtaa71r3yu5r8mr2mfujqs79eesudwdss6oz4hj8ml0af0k8132zsr6ngtq9tidwk7lry1xij03vnozwcbctwpb5pvaoc2u9sa9lm5enxzgopw878i1pefcykya3eo8wqurfi69nmg1p91djltzboax',
                flowInterfaceNamespace: 'ob5b9cy2zy3jtj2oflfc31oxymiknaadlbfxkyb1432i3tzt1tb0sgayysiazfd3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26zdmcdbmdq8p94h4x0ofm51orkqub40njnlv3aswj7clzd7vajjj9z0w',
                version: 'osswxqxn7vsm0nc6cp43',
                parameterGroup: '4woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3c86gbjz6zba2cwvf6mtiew09ri764uesk9o3wiini94edsoy3rustei5euzjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tuaov4u40le3yv8i9qz5lk18pp4x6yvusvsvwz98vp80gm8rj93d8qz2mlvklhfxkwrpirqfmmiytzcvf5hy3z6u2z44cjsktzizt4',
                name: 'nu9tnhf9pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7hnbuafttop29e1f3k145df9ewy9r6fqau538od5nx6inms1duc3m2z2g0nr40krunzdp65wjreonbse899p4v68dzv3ogeyexl0qj9yyazogqadhggv3po3db2zthzqyw1i71bqse44bncdz4i95o11azylkf2o7alm88gzbviyt3b6oq7uk5zoj8x',
                parameterName: 'm67xhevhi7ra9ejef5i2iscycy3mob3zkeyu74hppdyieshniep1lhvr6ei4zrp1zx5ycbzszfeou0sf5k6wy4s35t8yt9q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qej1b3ic9g6hajtpjptxy0wat15l717yq50fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizoasac5ypg41kxnnbrqrh7lznjz',
                parameterValue: 'dkszkx8xce4yot1zn5vfw94ovn9h3yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr9e8hcv51xxphhh7ujbwqgwny4yne976kbeq6eailgbtg98spdarzpm64mtee93nz4hhbqhile6u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5q5wtfo51esa76am2u0ah7ahi3ukvz7hetw4ak74gnuvxkjbvst3oxgkiimv58oglyfns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcxxrvuszkxop6qj965m99sc47hz31ehklffjgfatg4oa6yo7ddlbe0924lml4nxjk97g2tlm1lnhm9sv371z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e2i0zu74soia795og003xe194dskc43yi17hihqqd4k60fwjkn6dcptpu3tw4h05n8nykwy63eck0jrcl521c5q0vloth548obprghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyoubjbx54ykrf90hfqxws47mxy1t1xmws6k9l9t8yok8m9bwbaae1kqw6ck6zi4aszsu041lrq569l6x5aq9nwf7o4vi65hoynh4va6jhmw3gbxvv3eyt0sbb7wyqw71807r15559yozq2w6d3nei1jrv4ls7yb0hamw7jjcc2v9bccwni1om760opztoqvgm11qyfbku10hzjap5vy2aihf5lmcuuc2ckvr36cac9j5an9lafv5syap7j0kiddf8wkm0rierkolnbpf9w7syqr2earst7yz202hgxzaollzjvl6b5hqfrwv13q4l1i2lpb1iv67b70ailbyxfcbeacxf8dvz5kg3ihyhv6gqm71tm5j9s2e5w0elnjbj0scv7j887ifhr94jcvaucvuyp9vu8av96zi3yb355gp60ieufpmg4edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svigqnzl0k74m01u09xhm2yykn53iuevm7bryhb1emmwxxuhi9e0yfren3evqlsosi8u3tqumsrmn4eouwfano6y6cxfs210nuw6x8gxwd6wpye75o2m1i4v8oi6vm9lc0tbv5kythwesjz02db7oper307dvfrumq8y0zazi3arvwyefv4zosvupkmwwbt2bat120omj4wdvs89e8untagjuehrb5qwtph86yerqrzhjf0qbfktupchylvda1cc2eo6kh7jtc278yvkax0lvhrwels814oez34ujzr0antucjnn0ch3xznyyf2k0hik4cfmumxxj50a1udjbik2z6sdzlmnzd1oroea9uz68wuredy46w5qeg2sxs79umt43o60ok001l4appaa6tlhd1eworhf1n4z4qwwgo7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosepn4y50erylwguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus885pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjamigo4l1jxc5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yit3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b8ad404a-a723-4fe8-8a2d-f472a83a4842',
                tenantId: '5192a7cd-2a20-400c-9f77-65c4d51f4b1e',
                tenantCode: 'hnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d29',
                systemId: '34e6daad-2728-46f5-8609-b237590c0272',
                systemName: 'bkcq0eeoueumkb7tmes9',
                channelHash: 'eahja87brijteuo7un3lgs5k5awc50ln9lpojw5w',
                channelParty: 'eb5hyr6ylqwaguiox9ov7mff0m6dr06v1z3h7y9t1pk358j1ddyochy96sotbrvrmshwt5xmcyv7zeb0wefz2v4yd3cvwahtvwzl942x7vix4lhf7tkcevr8kzvivzeiulpwcsnlxochlr2q7zdv0gljlb9om036',
                channelComponent: '1m62s9rvmszozspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5bh31ufnzyksxsuaufmf',
                channelName: null,
                flowHash: 'av2j78528hxcbaxb92ynon6s5bhvischlewy0lpx',
                flowParty: 'dfdnnym43ae8n914b5s8h0xsgrcr94m32azkx3qngesn3zxuq3yda9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto',
                flowReceiverParty: '76h68imhq0c7km3g0s7u5rj7bqy6l1n6aas5nmnlsb1lwl5ie3foe61x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6srlct81u8lyyo1c7cmwa8k1cfdezod342zelvx9u3x7tou6woepm94uf1smhb8',
                flowComponent: '6v6teqpkjfrnvpy7l3j0e4u757arjkczum16kit3n0jn5texft1f3mbebm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgnl4101g8472mq4twnwsr8ynbosisereo07xs4t3fzqz1xiei1kx801ceza0vyh9ngt8j6',
                flowReceiverComponent: '3t2yy2kpr8vbpinbq8htqrsnu7vt78vxussy3296bwivhp8ds6dx1d23l49d6gcarhbacf43f7nkmvarqbw8bx6av5ae1zkewdevvt15gz588yfyzn44svkb3cilrxykjiw6845s8uwkbfwpwjw0lwwng16q2mgi',
                flowInterfaceName: 'oxuwjt68tfm9h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgukm9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3fxtskklamirf1972akl10w1sxsoz6',
                flowInterfaceNamespace: 'nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1klpc7tdr80wd69khxatnbxbwttbft0xjmtwv16ve3vxp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf114athm853ma1m7l',
                version: 'vwvq25oye8ix73v1at6z',
                parameterGroup: '2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5ikoxqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7',
                name: 'yfb2kfgots2vf2ddiz1scgg8npuok0gvvjj29etaee0qeynmw3m9zruh042qfli21zmcg569kjncs0gkdmon63xmvmf7r6sglxpodxgqqs0n3ke5y06zxfj2xw64633jg86cfo9b49lehq5x26i9xox8ra4u8b55luvsjy6mr6gvboimc6z292589dz7via9c3do6j4r41qc3isvmnv6c2w2reb87avmjec542sbfqv38apgor05fo1vuhfkf2z96qsqb9n45ymqf1miq0d4qvit5bnpap4t3oazl9m9503s1e8f6751x5662jbq0w4w',
                parameterName: 'sdkaonsm2lm6fi8ce011koprmpd02hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3pxsuoeooik2s1pb5gxesc3xxtnyiht065vdgcgn5mt02mirpk4jydtasx4s0y1ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6',
                parameterValue: 'lkydezkud4hpjut3dw1ly0od6ti7t927ehyr5nrnnvmgwopek1fki86j4baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaft2ewn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1ei7if0wm6i4wg34jzuwzmzd8hse4f8j8iqvzse3re5fyyawvo9et3nn6knnzuwd2uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr042be6x5mudg3fzuvk9mp7cfgdz3f719o76jyppqsrp1qjxu27sehvxdcxmieqmb82yidruvry3wfd1g52qbu8r5ztfh42dbdktq47o59x2t6why9b007smnn9ytv2la0yt56bx9sdauiagcxszvezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjzynpdcee93rodebhvsyi0acqx5w9z9bqbmzwkjwbnkgqg9fakq6tx8816c54zg0taqhmofsjns4opswpb5ogpk9yzelgn4jwgzunvmufadmpm3090xsjqfipger0jdostmu9udy75x062exkx6le376leagenmqgzzl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9jtrx62ai34fyzsswlh5wbmzikfkrfr9273y2vipbc7q2syl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwkn1qpflhaz2ipwwat3gvbhxkrikvbfxbh53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga7ymqb07sqx4wu22lw8zz1v6t5g3sme09o5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc7pkyzzo0g1xksk3bo7hfo49eth0acm0vg95mlyn5pgj1rmk0buokpr24swtmsm4r5hjzc6jk1xxsl5qoykuclbe7wxqa0cwv5qt8s08m3ve0azjo5kjyauanbharmyiqlnhtlz0w14pb5m1tnr4gzch96lpcnvgsrky1bd3hpmds3aezi3o1pqtwml4z5zyafmqqlsaj2ex8d2ubajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf0iqzkugf8wtuyd04tda1e4hr54h2wcg31826snzq8aj0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcgxly8z3sfouxer1hsgdcyjfxma64gtclx21skwz5udtyz458mqtn8qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6g30slf11ypsjr6nah1c83izujjj3eme8iqge7lpbt61tegsvurakifn1eykv0n8jnqpgexjwyoxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04jfc7zt37tk1928ywpphaxbqpf4709b1ca9z339ood90z8ohkobeodrebvmq88jwoviuno8jgate6yqanypwh43kqt50tbne0ln5u95r7jn8ixlxmyjq9ezjazjy7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc10o0x6p6f82ga4hg49kembe6e4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '57641cb6-8205-4b97-8738-04baf1ab82be',
                tenantId: 'f8daabde-dbe7-4ce1-9860-43d43541883f',
                tenantCode: '15m2afk8xe0tz25k0fe44mw62wgoiao0v2x9yy1359wgrvltqc',
                systemId: '2fa896b0-9122-4263-a2f1-4aae4d4dc238',
                systemName: 'tikkieil7kp5t6x2lhad',
                channelHash: 'pstgai65oxim3d8h7x0dfrx2tsw6rt5kzuk2dqux',
                channelParty: 'sslyd774ptmxvpv1oy1m00jc1adissuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfyl464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3',
                channelComponent: 'f7a5fz7jotfszxzrmfxm93km1f9tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxiuas0ysoi1fsxifzpu1fn8p71sgypmpt39yfyk0hlx6l0ez2my4sorxt41gy45je0q5k7wt7w6xj2u6i2oovegiqbt6cip',
                channelName: 'o35fba5n93wi96xt7ykygurf4rn2bvbufz5s1katp8gz371e13tqf2so3jddt85lkvxsn5milq8wsfozhy7z86qzy54m4b4vejnd8cpb50quhvxmyryyz9d9dolmnyv7e4r0m1xw7lw3g5ydx6ojwoq59p1cn249',
                flowHash: 'f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9i',
                flowParty: 'ha5v29i31ra8xzlob6tfibgatyoledrymfniepm2v76jhq6fqxyr135e41egeh5v0z3qzq9ztbcnow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5oprf94ujmz51oapuws2dyk5q2yf',
                flowReceiverParty: 'iadnkttr1ylaxiucvjmwbvj1jmac80zpbon6rvoumharm45xtp5elc7u33b94l24vvr6uomi8n1qaoj9bwhtxvywcc1aflly34eb3cykgvx4xx78pnmor673vznk62l0t6ypslzuk3pbtrqt7sjx46d72py558zl',
                flowComponent: 'ecvrtrxecxaa05uk819wr1zuq4tp9ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr08f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdesezimnjicamw9j5x5r1ckg9di54c',
                flowReceiverComponent: '89nldh0xadv3awy47zjlckp3xynvg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm0z15evmkk8ofhkl7o37l7pvbr0mr926qqj6qttso8hfftyon95s53tjlistmgp4n4kf9p1xblmuh3ezhko9t',
                flowInterfaceName: 'ahtw7mi7ucu327dn13sydjfjpafwsyh13xydj9tuh7bgm65woc59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x1qbkjlcw2892hyniop35f87obfdtk3n1mebeodsaymw1ogkxfbvnqhkor',
                flowInterfaceNamespace: 'lgocz61qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udjni4rsastjrs0i0rvkt2hlakrbzn8el41omhauyjreh0xvbvegm5fsoopjpurlurk04tfii1v9dpuhn9nnwnrsiya1aysb',
                version: null,
                parameterGroup: 'g8t8dqxew2r7bj5c7o9jomuhzzcxnwzuc15mscmhw4q8vfuo0ax6b6j13qejxzuimmmi73h3lavbpqluxm9omfwj2arwpstvyflk1wdmb490u6czbjnnrfudfjgj4cdztdto1y4oodjid1v4k019kicuda64fe05w0u2fxbybhfrhk2odg32tumdbdogyjgqbwwfpndrlygmcnut124t415tew37g3fw8d5dna67bz7ob32zmh9hqajcgv9604j',
                name: 'tg07shzutrnlz49w8z62godhvjabu0ldxoqcze52hdm9hkdezgect4k7hnznt2v31byhbyzscex7ghntiwwyrb90ue2orhl66nn92u6h3bes09o6iyblp4ljujkotr1yr9jsnmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvkomue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0eyn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zg',
                parameterName: 'regg7mfcvo9qccw887ciekqnuynxj4mechuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbdg0boen6skpgk0apb1wbe1vagy61rvr78n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzlvopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2qvuf374z9s2fgh3ev6zrm9g30lbljqgijhgmibe7xr6yc0lejjj8cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hds',
                parameterValue: 'xrd6tvb7a3x0onmbck73848b96nase5hrfw1z6nhau3k2129sz2va6nmso7ev7a1xkagnp3yorezqof19vc2fppkxsnvl0tdalx9l33y7w4ngvxxf1vhj8snqg80lz2x5j7q7sjh52tntpcs0654r4a1ztmiq6015ovuuy3s259xu9hx4luqmhl1r8j1g4cbujex2owjgbkm8sholdjd2ql6y0gw9xvurn7wuyx70378e62n95uwpzkb11ls7sq29prjf1sbqd743dpfec5rfvvw255f74edoz894ugi9dkabbgrs9mogvoc3f71ljh0wfg72hde5w9vrsadq7k6im3twl5ryqwvaer24ncujq5bgdj6gqnjtmygdue2mzq699odq5x3zocz59szw8qt923rmij399k7owm2zylu89ra0ekw6n5qiph3622rmtuze3bks5jwzm3avku9g9exslar07o8mhfgjkus3c71yn3o2nzgo4pmk5vevjfb0tjt6m3yk8r3f7prhbtnhwmv7c1rwd673tzby69fy3pncg5v7uraibl6libfikm0imyyeqvckpum6up3arc8m2e9z372x6le28c02wv3zlwmnop4qzn4c8lrwrg6f7x8pzyw4kemaqqagxicqudmc53holxtanir17lw2vz49p1s0va01zgshpydrmnhrf6ok9y51h31tvcjc7bzob2l4b3y3g3uzif6el4l0vbm4omjuirxgykqbg022rhg4bx8erpfxsif3imuqd3pjazjvsbo5uzihabr91qeanm6zqtai4kbms2jt69at91g7rk1exlha0ow1nnjykor3atr1m61iruksw33bb4zwjgqh34zgu0qmh1ij9cvi9a2j44kbr8672ipdum61riaqjgvnyzymmt9yqqb27uqug6l46q4mi19zneevgs9a74phdqvnb84rb10vlymmff346dsj1k6hde3xhd72cqlxzb80uqmfn70dpusgm4eak7a8wtikzlz6spkv6xpdyhvxba5wwfkbj79qym61dvecnd0jck14t96oec3zgo9fyob1pwwbffrl69azll02jf38yicbgwgt2sfv4uf8jdyer314jf8cpecgg2iy3x9axtkd71ov5pgxbmnh2fqx06a204n61hfkc9z6s5rg3fy5cut17r57qzp27u2buvza3euw1amqrbf5pssy0vpamud85tjfvzynyj18i31p4v5ark0j6gqwjdh9s789wuef1a5vzbd6zwjyg7fjhg83ayutuelt9yxow0v51t0rkl8klgx9s4baxh9yswms9pv0ariaopra2nwsf9hg3e7pik830envbluv1tk48n3060o0fec5kjsx1tnj0riu574srv8lqkdhf6xwkn6lggou31amvjq0sxw9ei61frc9hhgo80jgj5uer04hkvmmmvjeuhz8fxjx53xcwog93xs6bnzk91e89ws657rsy43wxz7i7xprv2fhhtqfwa63m5c3m6pyc7okl8kbxfgqcu3b9splpv0oydmxr9i12zftvgix75ayns6tchxvw5zboj3mlm04y13w4fnu7jzbcukiit8wmg2ras64lian8ieulaj544g99sqqdrzi1oz66lrlfmmtl5vkcd4xho1plg0mz5j1m3i9qax8anho51za0is8felubgd2s91xikr594ewe9d3uc1rc8fdzqj1xfu82y6fb55uqtpq2q5v45vfdpe84a8n8tvsvtmtlbp3vdfkuewvm1vckasp635i1p7rb348zcrehauu4l8p5xbi4574y02lilqoor2hx32m0sj1oazdpm5y2pjkp394rb7fhijwlbw8d5dyxsgjezznrf78zzj4ncbmy1wuc6e55ddr1gd4wh2hb0t31nkfzud7iksrgocvlqoavu06e0458mhboiaqjpf8dwetp12fw8fa0jor20ygin07dh5pb1pjy51n8hxb83if98gtum7c1arin5i5medngicdnlko7bvpt3rfgwakl3a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '71dab29a-7cee-42cf-a26f-632308f1609a',
                tenantCode: 'qndi6447j99tmb1vewbnul27wwjrpx8bn8ggqlzrvivoxxmgln',
                systemId: 'b3efeabb-0f31-4dc4-8f35-66bc48a1cdf1',
                systemName: 'rv7dq4qvhdpmeagi97r5',
                channelHash: 't72l4xnpyq8hff429benf9hegxx7fhhon0zvrbd1',
                channelParty: 'y1aspvu2plyitbllscsooz6l0l75xdknda08vrqp0yfim9des0iwfveg0tbn5bj5r1280vfam0hxvglssjxbp23slrqmkt4bnwa8etndy4qgt8eiy5v6nnma5sg86bxbwa14ckrn403q1w3rgc2j5mmwzhai8dav',
                channelComponent: 'v28kqg03rgfjlfjrz7xpyvlvehqn8h83vz90bp55tsec8pecdn7d4bx1d3cy1taio8ngby2oesii5arcpyhks3c6mzhk3j7wn5vpylpq9x0xg3t7idpvzkrftkw4j9j6abbeafbgwblis2v6kdxml92e0ar6jrgy',
                channelName: 'oro3503hscu321art6uj1n0n25rmb2495m3cs1xksya9ywi14h2r7xz4wk7o49ekmav34aw8tyhibqo6x3b9k85ck3tqzvgvnbp6ws70mrqocxuich0gmin0qklet7mma3lf9lolsnmu78kdbokqh0frq433mghk',
                flowHash: '5fq0fbjevsf6tzw2jp4o01do6cz5xp5j91djz7yl',
                flowParty: 'b8deqo7p4om1tonsq5qpye4p8wumc4iregn7llx4gvd06jvjxcacs951odyodb1cnr1jdx8u2h4gs00i888lbl1bstae228sykzmnk5sebmm2ma1o6hlauoeuidfdh60tzmzvjsdzro8cb62g44lzfb633qn7k7u',
                flowReceiverParty: 'nb0jtqbr3roc7nzaaoojv5abw1skdaes9rlnbuqul9l4z4exo9jcih0ldkmjlhp7ndqy6qwiaq22vo3a55j78mwjcrolp5hg6jigok8lmvwx9qeufuxx13tyj0u8u05ricvo2i756c1mg5fgg2olclsrwg5s49ec',
                flowComponent: '8np4lka6ijopgwcq660aqvv4lrflqqmh0uw894yd3czv1iq2pjs8g7d56em8t4jyvw6nonaz0wvkoqd2ydj31rvuszibrvmxcc6kcy7hxvvb7hyt7370htu4bgs2d2hrqj5r5r9pnnju5usd6rps2ey0wnx1xjio',
                flowReceiverComponent: 'nlmfe6vy3gpe01aos4du39i2yqqxj2wleiakoslwk2zlgjtmhdb6w3h8xufjmwrcjaipoepzl35moztit3ayce1gwkckyt2ijxi0lcl1qtkp2py6p2gjydmaxc1hdrajlao963ojevm7fcm5ft5rmh911033uakc',
                flowInterfaceName: 'abltinfmn1zf1ophmarfqo1btesks7ui9r5chfkk7mmdp1978bgs8iff8j5c0fzy5kmjhljxck3irk8oexacyqcde883p0eseler8evmctild37lic3e92yd2lm7lnw33ai4hfux6bww7q2atqd3zrtjxhmt2zu7',
                flowInterfaceNamespace: 'wl2q7yrv7333cxueqnpbq6jjfzc5ckzt72h3bne64m3qywj67wliqvk6hfq4xib6jzd9znqxvnaavr7pnsm7sb45lqrgawtcjlf04hdzrtx8mj6rdrptk4eijiifqh3avukd4ewwhwrqgk4gdezm47aovb87rs41',
                version: '0a39l6ujluw2kyokoehi',
                parameterGroup: 'ov0rvljdaobpxusuicfeteeg96oo6ktad67nbjeqq8kifrcbtwl73k5122mna7vjm61sjmwbm3599iy6xgdvjjlf5lpfog92zibgedvcdl30wxrx2pqwpidaot0uplnx9ryy9v9unmus5cmmnsiyfe9xjzn3zko3te5g0n98u0apn7dl6c6s4vemxwbdw7iwof1xtleg4ubueiswo1eu5nv14mls0x6an1ua8u155k7651r3sqew0y5gy428esi',
                name: 'eie20yj8swix4hx10pviebcpex2quowbclvmz0ik8r824qoefhpvsfnp6ujizikn95v1ud60q1okul5xxca7c3d0i7np5o4thb44h58dizkt0m56u2v45om9fu15yypywjdw4my4imx540jtduxicafs0233n2itibwxqlyt183uwfvsof0eg2n0y2l81fa5fxp7ok85a5f6eif0cx3k0ob8qcydwg70de1vnx6zb98bvce89h6ogvnlfay1mpcns9n14nd9wb0s1fjbbjuar8zsex52h3y2an5b969i06qjcpzmnq18vt0e2obsn4wj',
                parameterName: 'wpu4nd2dh8p9ayfsza2299v799q6hky8kaobwkx9paq3b05be49918g65po6tkkvhv0ptdqy6n8mlev6ko96gsiyr5biy6nrctg1m6xyv1lrka0z3o3dv2zm6e13ag2edak9ifgw4hr8e2y59va0x5094ebf2hr8ty5ykd7o83hustxvbr95z9skxw95t2a6hubl23ks8n695g501b9xi9vaj1pfy9ty2i2nssimtrwjmqy2bc66suw5951pdv55f8pk79m8maygmplq0ys9dvuxeji3d0lwym7gwxdwx2k7kqa9hb88rgtlqba2hqz6',
                parameterValue: '6bb9sj2voe0ivxn5g57uxcd6b7sbw7d6qxat4lu49eqif4iac4bhfhw4ikumdmqd4flg66b1iqrrpx7cqtcqw4wv8hclmt1hvzwux8ep7jcgic4pnaxii60p8w1enmghsx4m73oont06g9gl9sr58jyos7r624fjo1smte6qdah3z8sicgilzz77llffzs6u6flpve6sce15irn9qxek7iefg3nxyrjn2pim8yqt64rzkvoqcpdifv4qo4ic1zgd19046td9nt696l3uu878jolfpn5d34odulzd1aherptrlcmmdxetyvawn0c46gontfwt7fo64ancvnd9cqlx4mvcwkdizuvgn1u8g6xvsmnkf47nzdq0s399q5kgh3ot7fxj9nha4kkjkhhk3tm0ws0vqwi3cd73piy5ggfdugbykvny1izkgdri9niunyilzf00rnz6ecggga2ybs2mlvfmck7j0gxssw49p4i48ifw3io01afoa8emqh6yiedvrr9d3a85bv14aajto74flwftr4v3sgollivvbdw6nng8rvrefksykd793xhavswiuq6h8gwb8jmi47a7medwo08gsnjnrh6jbx8x4ct9e8ojgl9mj78oxqyd0fdfpxyh93e8ifx69j183w8nqypsxrttjmxq3wwc4hwjq1sx157lphb2uydp3okjt2clo7bolqhbvgjk55x7zlis62tllj2b2f8n0gl1rotcqewjv3lsp9rgph7hv4yy4k8iqe7qsvzatx10h6gdpgiypjdj0x4y95uiah2utozy8qpk1rwdhbr65j18uk2i5tv674dsohe27qy3xom2fjvhyymuobxk25g50yi2b5pxn5nf4epmzfem5rbk20z9q6bwenok0nq1a9b6t9ugre7igls4n7alndqqo4jipugprhpd8mg24wn4a8ekgi6edkrp6ybnjbm99p1v2kpcd6ucp2hsb9kkmnqpeiw9y41syrlxospgqkoc9xbovvzsx6qhwhnz71j1g5d1094td23i1hyx2ngul4euhaoye3ow2tpucea8vyng8m534t7nibg7xy60lne9d9cpqgwtzou9xgui7d652lsrrwzj716by08u5zwkfbqb4byg6pu3ly4pau5j7qyjv0kof2xezbffv1frloxxom392704dzmvwr2d9foa3rgcyz9yuucizr1gbec9wx5fomhcln16q5zkmjf0diuerol34l3i44qx5b90mqaxrc0wdye6y9row1j3rkrgvtlh3ib3xqtk7vitipqw1de272wynuhgu3rtbe5dscjdsf6p8fw2c9h8s5c31r9u2fgs9w59c2612xd2o5ria6tse2f4s3nxnkxr8qof339o6i32jj9lk0umzzjknrnyhs2oz88hm8t18w9xvdi4mlii2u0ri2q3jtltx890e2tntiynbzb0rbehse0pzedgfdlyrdpo854bp2gsn82vobtrgxcjn18y4vdgbu15a7u9ircitiwdsdldfd54hggab66k1jzndu433l91og407pcmd0yptprig81mb0um2k43kqq31e8pz48av02lo23jrn4jcd3cluy3ww4s0q2vwxpdzcgfox5e1yxnw397t1xmia7rat4qh9pgzcvk9df624do75ub1rvw0mtqqb9mpb2fhf1thdcgn160vm4h7d5hg9eqsllbtxe4gxl7rkx1cp0i4g4pwoqnvcprqts2da9e6kmcvkk31y2d2wjoust1egje1pb67dfqtghkpbju8v1htolq9libhl014ssryk9anvrbm72u7urae3yr5qb0oowhujz7u1zfvctepbisd9y6ppkyt4oey04nu6hrd1jctgjyb3uizo61mzl4u4itr89zdtx5d9tps9x8graviczkrzd7ezbgcsd3sy8m40dl4ct38wyszls2ksc5jptthyai07viudb4tvqx9survyioheas1qjyqbofb7ggev91iqukllmyi1306uydedgck6q6w05xyupnbv6zehxn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8faede6a-8f8f-4613-9ab3-4c9a4202df4f',
                tenantCode: 'dltkmhkdvxqvivzns5j9r1udpz6viktb3hz52ac42yh6ixfqin',
                systemId: '0e99a161-ceb6-4a7d-8062-34c0706337bc',
                systemName: 'k9o7l9ukbd55hz7o06hu',
                channelHash: '7qrptl3r7muqj2r9ayl92e23230r749bh2nv4y0g',
                channelParty: 'i62520kyih5usmrruqs8g6lg96pokvh9bu2ujp3yqtglt75gt669cqb22n4yiwoz31wt40gta9h1h09768q6ab5eok7ok63gqhs4zg0qfy14eo3i6kp84i6fya77y3hlc8erqqter1bkzp9u98ya18ypjjy488db',
                channelComponent: 'zw2n9ldgewgf6y5d7ve26au76kco1ut6kxdwhfq87l9n1fv2cvhnnco9htwvruy6heohi4suchndx4l0muwkqxlr231kfbf71cd85way1uask3my6gu7oixkv4ae8so6g7305e5ni42vqbk3i34jo78pvizmv60e',
                channelName: '11va9fsnppsgenc180z4dwce8g8gokj9xhhfms75h0wae39uuiho7gl32s647mg5inppgicr3un3dlv4kldx3qi3lv04emrab7cz2pdwz2drep6reh83ywdautqe1a59h7mw0jsc9hquq1no8g08y9aeiqvtkcnu',
                flowHash: 'zgfpnw0dg2hpum0nx0b2qx0jsjehgvvkr4q9aolm',
                flowParty: 'lvx83bds0mnia0j8i1kodn6bm60ecnyxn3uocl8lh50ygknmvpqo4gvxk13pdn7k3c6l1a81j3qgcg1ip56qxxre97yfqjeruvtqiamh6n064x3ed0aph8x8vm8toow4z9oesyzynblijn9tpwe0zv4qdb5xn85r',
                flowReceiverParty: '3q4vsu9k801mwvne9g5180xftqp92vlnfshgbvpyqrw5hck11yeagguzd2c8g9gieq9fm8jtxfymb09u6u2bq7vjg38if7vyvzqztwchyy3w03zxxo01z3j1515uo8i3jcicppzu1hk8no3sp1u0ztaav3uevh21',
                flowComponent: 'qi9okjza7la2wkv9auve2evc33y39te04ry6e8u3orbjaxl2l15t26nyn9gwscxxn45ltxbl1kuabox70v2x7h31lz8362g52h54qnsgpp0oqwehigigqqampeinj8ygcu97ws4j97bdb5u875y65imj5fnjo5h1',
                flowReceiverComponent: 'h0qwao154xm0asgzukqg8sqsur5zvq61fhk7u3wpzpuspntz1j9z67r6yr50b6i9hdd0sh5gmwckdtr67bpwu7azqzprvl1yu4nxj6g1q02nkrn8dvcwgewr2pq804sdayx31mg1a1i992hun06zo9ysz25kkf9z',
                flowInterfaceName: 'lbc4nwx5jr1n9skyls1u9xvqzf2fhhl3xdru0g2chpmlhrx6p0adieux0j35f77ptah2adzye7g964yk5i73esngnvluqcq42mjfdoxgk8c38gtcislg1cer4md8mnt5hagrqpwo8mwuobiaqne0z0ktnz39dvo1',
                flowInterfaceNamespace: 'ddrqq1o3nvezjdc0i075b30gv1cfej9kc5vqakn82c5qfgmdekdxck3gsk8hu07bpu9snm0ae7e6tsedio19oqdhq4o6ort2nd9uvnehcst6a221bzckp1puue7yjjigz2sxqpjqxifq63k4ne9g36nlz9dob5ms',
                version: 'c0nd3gie7rs0ebx19rqg',
                parameterGroup: 'ehhs42de1qhxrmdmio9yb086qtwxnglf3167sf2ibyh72ltntjmdg8jqmnfq83do1uhq6g3hxen9wmuq5xylb77jgfxpf8b00qoilykmn7t1migekhg1h6nrhyrl2yt72ir83bsp5ngr57dsa1wwta30hnxwm594717idnuwfx95zaf1sf2l2t90ry1aek3x13br0m0cdz0lllsc3ha0wyj0yq00v1zpdd0dhm2wcxg6td8wxojidkws1w1mcpz',
                name: 'ijbet16p0n2e79x7gptx2p7d31u2tble3zv9qngw5x65422l8iiq4sivuitgpflst7n33rp9eqe2p6q5j9x712yw7go2i6kie4s0witnl5ymwqwcirmtxn4fxi9mbind7pub49bzxix284uyg158hrnnbdcgv5wjgvl9k2y4e6tovjiwrtm9jhpi68ydx5tmgwtdlj5tmdwcfkfejioai1yenep2m0ynwf8nrbd8of2asvub0eg35tay2bi10ybuz4umbrmq9k4hohz60q62cvgq726gth3mu6cfpvk2n27waymoc048zzo930l9ht5z',
                parameterName: 'mu1maavvallsg65saqr3nnz1j55eu5b994haoaoosnn36k86mbi4vwn8o9gzezn3j29egazmhw8pdiix1neao2nmi6yoj8zvhbuzslmfqbbjdo8w05ysb6elqxr1y3we1ygsoxts9vm8q6rxfw1sykxs606ltcx1m4zcvzerbzyjyp1soypmwdet497tf5wowof0tiyhhmloua030q6xkvwl34t1s2dhy8tsqa00g1wz7wxfn0nr42i2uvb0rjjf51lf20p83wd5k95cjhf5arvkoym4lng4ampizd5hg5yywycjc6dvzmw1mv5bima2',
                parameterValue: 'p5n7trahr1q8im4fezzbj1adcucdce89zdzovultpv1hgnn3rfy48kzhuqufubr6uh741tbtl1hww9m169p2vw4738lykuz8kpoo4ubvvyid3dsr5frwogi9vrvx66kxfvaeensweosmf639hjp6z2wpfh2ah5gwj5495mca369qd88ztuf6lxbfv4lvv91vmnx3xlx3spq8itoc75ugepkufp5vf5fhjtvdqo38p3w5n4y3ca6cuzs45v7d01c82nn7bet2m2mjauuqhq4m4lpg3tpdovu1wg0h6yy73s9f0g8hupmmv942w0h2ump2647jhi0vv6mkcvo3bmexp12oi0v5jd37k7np7l6x13ld4qs3c3rlix9mpy9dis9y5zpiq3bvzhr88xorlp5jz3w7bkrnfp60cdkwchc76j1vpb0f6a5jxhemsh92oph8bg93035m4omvy1rhea7la9iaa26kj7zdzetqfhiz1fdxd9y8nyv6hvwx4xq9jlt356cwxze0125g1sh70bow803q0m7t79bsim0g5sooyxr93qideksufo95duqxs6yg372wmftxf1g4err8nufn0eig6obtjukf30hhvb8s2ga266gcj4pw6szbelpaq8nzexyl0e7918s7g1e2xd5igp4idh7p0si06ej27r5gvd4x1kwj2o443wxb1fmii71fcehh0kj2ffyiywyn0l8ut1blaatf4rivdh0nxtzlom1jevq8t6sqd8mqa98ns8p7rawya9vl12m6nhrthqfrnfkr23oliaqn4ijc9wolz5a061rw37s5udw7vhnimfn9p5bhc0ud50cp2lumi4h0xo1eevn09xvwtnwxcdottte5bwthf0zce7p7wvjklx1p730rdf1c9ghi2otmrb92xoexjdms6z0cyzcjigrr3cj26d8elfs4827rjfk7h1ja4eip5rizhw3e1qy5mgbmwe4odduf35lyejf10vb7l1hyi1nf3nnhmtb48r25ghi6zwnr7dfn73vk62xtmpiea32d67rt1xqdmgs640o0mcy8bvx8stzym3vrm3x1idk2xio2220g1erv8yzk0g80tqq0zqv93oiek1licbtn1ovgdsbl5cbmaplgy2ydecurlnh2lrjzpx3tau4496hps3k7nd0mvteuquie3uhk2nohfrj1jwjjhr4hhog01avjv2ok1x0ur4n094u5pzu6otznmgrgc93q52tyeye31dwlwxzyvm5du3uvyz1atzp7j3dlfdeycucocum9i3aosnxgns87vw22s8x1c2jl0rknwmv1ekzti8s0ycxs5kje9cgfz9fnv2cbt83z5qvz239hf4ax3i70gns1jyavaih5jalexlwwac0df8ibyjy23v5gdnkabptf3chzgsiou0ye5ffx2fat8dqyfrwrt47dofhr9aecasigxaedvb3uti8rbxdiky29cenfwe7cxpi81wbms2z7yh2nzodx20ob4dchj7l7jwripi1ww782wajt0ubiy8sqhxaqd33pen560j90hxki6ghlx01i3276flavavfz14bhyzg05v9kuvnhrufglxg76p9qfxnzby6ytqeyf5l921sfgs3mhoh8vd34ijwyaxig468c4ba0oklo7s0k62dg2itvazqy4hu4ag7pwloq8xsn2d730kzgloavqzaefug03wm5kj2kq3ju20gd7a6v0schtq0atm5ioavtksi8fw1dc1a5848mk1cevjycjm7fa7dlqvzl2h5pfz1ojzs1h5wb5fb7vzww5o0he9e7zycygg9w2bcw051vy999j5qaqvviv29csvst8bvnk4xrbucet28m075jkqduc9l26dff0hc233o1l7jl9eopaektwt891r0xtir6x1hfax7b8t46k6yod2l16qvdsjgcne89j0n9y7ls6iu3ejzaw8vonbq4e8lt5bcrvwsdm010dv6r3xp8naiysk75vftnuojywnlp2kccg9y7w4jdb5g2sp5ald4f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '95aecd57-6e51-4443-b0eb-2fad3a5df14f',
                tenantId: 'ffb616b8-21eb-4b6b-9898-9ac1df466352',
                systemId: '9f5e327d-077a-4771-a0d4-a1e305863e70',
                systemName: '3wba593ocuqcidpcp3rh',
                channelHash: 'inpk6e80mz3fjyphhroycfj41fy7xmvqqk68aoj6',
                channelParty: '1uvf2tkp39o6khyf2oysef35a1c6pixctus1508kj1se1njkptxw5l29888o5qecoze4ic703mzj3wzsibkgeab3p7agjjj4evf6w3pq2jakl6trh0j07q33o8ae3xi3y7az2v2s5h207zfrw764lw7xs6isr3qo',
                channelComponent: 'orgll8sfglwwvdn2t4uvtqqtp5x9h99bvbjtgcxcq3dructalyxiar0l7znuoi47yzi44prn553cqdv341yn36uwfji4lnbiqeo0f2odj3cvjqa1z0yvjdhwvt0xemvujuqcswg6rlwo2lo05mrfkno1h5gk1ycv',
                channelName: '2nud41idrgv5gbu3cucotmkluw79g92hjim6makzq99q3z61yjgtto77xoodld6bp86o40rkzs7q6ow2qj2j89bd344nub3l48j1dpscmtnb4rz3hhcerh34n12zqju6lmv0eemajgxzumhgp6gzjpkdm7xp8uck',
                flowHash: 'm14db8rok7otnwh96jtereudtwq7htrgr0nbp3t3',
                flowParty: 'j6qpupu49rnxo3kmzdvdoe7t7ujzaee9cq8vc77yt9sevz1bpwkcve5c2qzrclv3hngengzhlqn57te2to3p99bdc7lm4bxpqkddwuww155z8phhnocd0bn2t7pj5azkz65ji4jexmd0kt5uj8jqe3ebbetntox6',
                flowReceiverParty: 'onx49ngrwro3cj9azqqrrpu5mqn4ti99qa0q5693s1si1m5riqn79zbqmeimvqeannmalvfe0xmo05gegmyurlpt067tfffqv6c8rhlboke179tay91aydg4nxv9bsuejsugkbu4gft1udsfhjhtiu0zhn5o58bu',
                flowComponent: 'doetrwhvx2mh0nrcp6nxg08pdaknggfg6thwqr3x1ilkppycu62a6b3q3gyd2hutle4cs1let2d5ugtf4npclrhecczaqlr9fkcxrbemv9p6p4es2zg4qnk2dwst1sc2gttr82iunngaln4bb4ra0e0l2vr5bvrr',
                flowReceiverComponent: '9tr3bqyis3qpn959yxbsuj4u239ik2jriv76fdqykbwhhpd5ft7npuwujmasoip03iw5tfk02b8jl0v74yw70748ibg48bq2uj42nind5rfwedkdw5zenqc29qct6u2hcith7nl2mazv1jjya6ofcaq75a29g91o',
                flowInterfaceName: '2gkwg9w1y1gfai4sibpm00vcykee27hpqcg4lxptju3pm59iifhaafrf13mbi5kk7qmm5yzior0qj7hfjvjd2l84uich4cc55kfzr27je8cbcs7yja94wb7elqmxn9br0nv5af8tzxu0lap7y85caat2oumczwvw',
                flowInterfaceNamespace: 'b140029jc4r3px2czbjghyaj16fgk5edm7xf6411dict1mgfduyl6w1teglxxjki0tr4o45rotltco1k0t99ljeiq2w9jhinurgvd20turql01o4ux9jezuerv6ygumqoerpfxcdpduuketuubovz9pc32hoy1bs',
                version: 'p52rspqvgf3p50qk3j3i',
                parameterGroup: '8m7rgxh22hsxsh66q5646k1lz2seyyfwkpxjicx9bxyihf2hl7cxzvva37mms0y46ftw4utv578fpfb22jkmirp17hk2ws1c8qzebdc2lhvgquxmx4qaox16t0k19l3b5bt5teitajlvrm4gq7xw4yq28hqtdgtwzbsotq9c3x3tjzmg9bpqi4f93m1uuc0wax8rrs0fb5x4d219hbz7lbhfrmuww6n6zqxy2jh5ycnifj4yjbbkudpbw8srajx',
                name: 'yzqkxfv9xxqo9j1proyx01xc08fs3wb0t6rcx9uqawxdntlc3sdc4zl2d0te0taw798c7h5sear5c2f8l65iaraa0rhh5k4do0fvyggx0by7tc5piss8qn4qb9e0ef0j2x7p0lyw3anofqf3dydsk9z5zqjg0ax140uw4x7f1pm303tbsdcgc9h94yk76irl5ne4thnx6ffvo8eue5hafgpkpam4wsb5jrywwc5zj4tfpy3vfcmkqidlt4c7aq1w19n4o2o6825pto8ayxxdgfzru9ncpg6mn9hg2mdg7avibb84m6qegvilcoigcx0u',
                parameterName: 'hqe3sge5wp8tyhhym3h4ooxfa01bpk08x21d0x9g937tw3ka2vrsj0g8xvvlel522varvwd2nlj8glv5qojtd2qmj5dri3oq4uze68uh31so266ugq96gnhcldh1u88oblkovefy4ddu8eh61bm3zjotiormog13le8xiec7uhqz130qy8ne0mw97v2k389zt43z8ajhvj1m9za4z3dwvxcy9l0di2abd5beym5686hhasepob3di2ydr3li2xc5i7m6lgti248o8apyloshdlqr9dqe4nhdizcz4jj4fszu5uv1dlma5xhn87fiauyr',
                parameterValue: 'mqd8n8ndi1gxxsg6n259auhj5vfa1o5ymsl31oyfamb20boxxc94jlf156i2aqod4tnwrntgwzrevvsw4qbq4bnbqzsb0aeu9w3ujhbw38pbx1485suaiveqkgesupadxn6en9emux981xj88x477yktqmsgn0180xw648n0yyec9o4gvlgcky2o8o3u3baac8zsuzgu4sigctwodls9zrm7dodrdbv0soz0prdwu1g3youzm1rmk11qkv8amp1x6e5u8krlw2mil0ll3oylors2d8q8qwq8jpl4ls2z5f2ox43ngp6p3e176aeon14irod0iimaqsldakahnh3qgk2326s125qo2vvwlclwa7rshidecsf6dl9g4uvuw8pasevyqieo6lu1f2mv7u3b4f8f84p1xypzhnsmfdkxin6ss949jvc2lh2ywq4c5y81348sdlsmp78golob9itaz3s2u3pin6z34h4f4jo4v5d39d9znx7a4lj3koaq5dypo20qqfprs2ew2m8ui1xqc203mwhkhduve2uj5cklqed3jyrqwg0i0186x4si2433shn1ykoj4absskas4duxgtllnm7jq66ref11es0dxm4g5qbuwxjm0gm4dnubc9qx0pzg1sg1exoicclh5yml4875f9lq3zik55258hys1o7y534eq8uq5elvay1gldazscvypc5qj5gwg0xxzg9nysnjpi0wfyy8r6retphsigov6gtbq5jfw8qv2c7xeai0a16rtjh8euaemdhvclo7d223mld8dzdx4a31sb5fd9jrofjah7kjqldtq2lxxi0k3tdzo4gn8tjwym0msn7sk46zhuqz5grchid0fxxu1omcn9x9l6duco2d1q074g2wh8swuclfit3xm1wt6vwypxfg2xrc2ed8uwltrcpfugtblpzd62oywr2lw2r38s9rf3e8flf34ldzspyl11odq10kni4xt2sjkfqa552vncps3ryujva5iuh7wf42mxa149r36kze51idzpwhulcjlyb5ei24zgy2xaqvc9ipyw9vit1e1z8655kjk06r1to4kusnx4275h0ln3tfba5qm5daktuhdjh02czsclw8stads72u89n5l5zocw70ptula9dsrxb0glo0ldoqbn9t9l0gyhlgsqyjxqf3teeun04zzdcmqc1yyc1psgj5jso063qsb7sxkzmo93qmgtzvtn9n3sb9shvrgcno3mrj6cyppew75ogpskiljkbwk533tz6szi4d8mn9q9j2x408uj26tql1rurynt39iuiz1h7nrxcge3yeqhic8bprdyuu1qxflvman4ovn1ewqyan1dcw28r4ljygwe00wzolidwxghqg5fdw0dbljywlbm53v3cr3dfdagwajziwl957uent86p9kthhkpppclr8ekfdjhwd62dave3ysddjodgrbnzy4ueckv4mrzzcipa45qz95s63k49pmew36a7kk0jdlof400skwxy2yhyod4eun75knhg1la05sqwfd58yhu43qs0f74umlplv1uax1smy3xu4mfjgoolpnsapgo91mrphtcs6k8szyslx42wkdk1tqsv5bimee8xsfzau033nng37mks897nk215u26dyv4ff4t95qvf7503350mjbqxdzvjcde74auyjmiy50o2vjo86wwjgfdiv6cvgvvunzj3c24dj42u9pdst7h8n3qgysrci360323leqkx64v6y7zr178v3wimjwz6rscu7ddn43kdubkt5balnztywbzgyyv1c1tsa44gg5ydb0ff29t2ofysc4jwm1c44tp2boppn3aeyuydbzcc43lag1ljqndnhfnez3b8bvpvew81zxb393gplotkstg2sh0bo9shylb5jj3jcj6pgxu04aruf2kn0gg450lke2ijdptcgl88iauwoyu354hdbesrx7bev0zw1tdzc6znzkmh06urkpb0ql9rlvwa39w5yf1xivqpsy58dfi3fy6bw9g71',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5d03aa50-b093-4f1d-b7ec-3bbe6af005c1',
                tenantId: '44778cca-7012-4474-98f0-8efd5611c61c',
                tenantCode: 'qhv30ulfg5n0kerf3br9nl3peeta6z02zrww9bn66aocqdiise',
                systemName: 't2lh0uaeh0zyj9eghnrz',
                channelHash: 'ygqixq3lylkb1ohp4mdli42emli46r0r7gmec8lv',
                channelParty: 'u8yg1eab5jigbow8mzud9j6odoeh5o4spr17n4sqj4z8srml1kbb03nsb3jwtg4t1s9lc18r3oeovlhbbdnxzws6i55atisirllfkxxuxgvcrh5he3d7z6muod7zdkkclykq0zlufstlh8w958iivbxyjyovaslp',
                channelComponent: 'l39vlr3ixttsogs5qkw1bynniiwlw5d2kuzrw2xmlop415sagsiw4nmzl0vqvnsw58xl4n2ssdgf50vkvnn63qwonscwwxd6qz4jbisql410wlau2cvat0ccomwv11npocv61k2i4iypn6oz0czbnf59wepcfej6',
                channelName: 'p70yc4eu4v0l5vvbrp1yzl6v6cv47b0tazbxv5onq0idllmszxdl4a1iaur7bh2lv17ajs63lz3oksj0l8909pzsksdevy4h2924v12a7rkbrizpjrf8z5v55jk7a8y2szl9zccp3tbhyurtjc343fstq8owjqzs',
                flowHash: 'd88hced2wv1dtqqhwdbvwbj78pvzueipjfrvlvkg',
                flowParty: 'f2sekz5aqfus76cyjnam4cxcir6jbgypn8av9vzqfa6y82lnp3iz7n4il0ib038gls3v5jkg0cc7vvt4uwqhoynsf599tc3sbz69rckhkbu1eoklao9jbqdsdroy1dx3x01zk1vrzdeg7tu9eln7bzchuwt6xudx',
                flowReceiverParty: '0qyqk34do5ieow84f4i716335yac5jwlnwz28143jcd16ehgyk0173fg36rz19gzfkp7ulku43uco0nk65lx509pbnlpsjqg34cjxd9iu2qpymmk0lg9qgxy204m04sa322eosq61w3rzzlcs0x38j6xrahfav8m',
                flowComponent: 'ic1mbrd4n7e8w60o9khvdkira9pvv4o0om3t7q73sk0g13vmaax06xqdkw3jhdhe4tzj8kzyw26esaoqgqu0bf6d915yk33zzh6zz8wyfxokloiagi9nkz4d1el0uv2zrh7jf7bfjnnkxdrc5wtv2qiu1yxb3e8e',
                flowReceiverComponent: 'dcmwni5ji993ae831lwbiz6jlbgcaqwi2t9bo1g9c3lvrw8xcpto9k1dvriiwa3w6q5j5k9ezgzn9uqyd3kuxg4kyaa3q9h0fx901wdypvz4wr4pc3pab1imrqzl27qldun6b6n4n8ys99o7o8jh0tf0ivtlsh2s',
                flowInterfaceName: 'm32uk7ogqg5z8sbyngynjmskl73mwl8pjmgsriavf2mzb1xtajebnyraoeg803hkqxr5f2bi5njkpp3p446809pnbbwcc7pndisv5tdr4m3k5jilp1i0nvxrdnvr805caxcykqlzuh34vw59ce3wcf94o22a25dc',
                flowInterfaceNamespace: '365vx4n9v292gzp8zsi65fooamo16a6tyx8ewi43zf7m5zfhmk2cxorrw7gdo4nxev1dz11551kzb7wyddj715ldzqk9b64b4w76gwyonwsvxuea1x4qc8zcju9ga1vpjikkga1ivfd0ho0gdcuecfvkn79limvs',
                version: 'oc4hdb3eno0pn8anlio3',
                parameterGroup: 'mnhqfdazpbz5wyehkkc92os3nl6ei6owbikizmnfmlojs8dskhp1vdm0maxlvsm8tcjfhuppeasn2pe25pk1omka2505xjxewpexj3f8vnx87qc2v2yrpt13qgz9zz3gj8vx1j3h4f2fwr4s3l5hnim1w1fxyt0tuvuikdcyq1x2nd2cmxuys08gakfl5n8pq3r6tx2h6yisjqgiy4ohwqx6hbnlwrppbuewsybronvxtqewl9tlqnz92xmp68g',
                name: 'ibubmcywbhbrl56ejce9umisylnojdd1mwhg3umzyp0iljy5rh3heb6ogd7vncm4umvtaq7t99id4hf112o528eaj90gyilf5dlb6nsa7n4jajss2ptdpu1lllea6684tb8l1z1gs2z7tenejb84hzxl27wz7304yn9epj9ukcyw4hr9psip41grh4edplns881mwvawa780p35mzba5etsbacz7bwy0z8snu6tsav7zmhjcjqsgdi9b0lyvs3owixw0a487yocjh1rdqj1t7y4j5m44edu6hr90mgi1wv97av82a4li3y4ck8b2lx4l',
                parameterName: 'zvwag92kygxe51y41wybvtl3om6ht6ga37ni0bpkn49jfi6mrdpzl1tgzhhgpzwbv9nruvmot72fwi44j4oouofhgugezfhvmwsedt9hki5eoigh4okob5n9gtgoi70xq026n2cjlz4eoq20lyd34xxh0h6tg93lb9goj04yua6sav94kv4ao1e1g7b5vy8nt1rerb9sqyrqn3zjna6lect19sr98if0xyepb1408izoe8ef3m4vcgddcrbleai1dhbx2jp7penoutkh24vpagipskyt0r0nr6l7u04srz75dwz0vmb1notg4132jpvx',
                parameterValue: 'fklhqtseheib4egwbnxqrhas2h7tkq3phfcwis882t2hd49qxdv6as5jmvii981c969be5latmhug9rrgbnkjfpqs3528230qu980ynp1glld84s26hlvnlrpk2f0l6cp18btznk5zkqdrdr5721kwyv1d3g1yk3ryubaubxpi4dvn85ehn6mgu9bxw2h29st1zrtw2x6n824xgu1vq4h7674bhlplniv8d4agm93rjsdjkrozkkc86jnwd2bhcretj4u20oggvwy7yhjgdluyut5775tlojh9682h1edlur7ociytdvpnyey9muojfnuzzat7cy4o5ex4skfm6p2rvtgg2nhov4ajowc1agzuwiq5qmtkteuxvfeqnhuiotn320tlfldu7vlwdfl417i50s5psox2g49j4hprld4zfg39by6e3vzvtbalm837hfnv4xvaa9zstoj511dxz3y6wpz8o8dcb22ems42e85x08f0d4h5q5hw3tozvnu8sa1k0a2bj24de9oxpwixbtsz58svc24jz7az3yugsu6j5v9r31vgiy52ffx8qf68oy86lyz640i0732rviymmkxkjff4i8ox8giad9pmjmacto1eziw9ctu3c2nmr7iheylu67ki2nhuhoj8i3wpq0vpnf9flbcd6busj5qnbduw5k9eozj3sxeojgtqbl3vc5nd2vcmjt5f9y22v1e5a1lxw8bl3n5c317ks286vanclxz8oou1orpppky54mtc7ocvh5iba4q0xn8dmrz8rzqe854mmuhifu68r9bjd4tt3q45nfwneuc6ha9h5shusjvbjm22acvefl794yv66mtbm6ba4bil4fvmyhmcm27hce8rxorchqsa511zlnpdmjsg4977a6evzb7lg6i2x8xtshnzgq0mb37j8uztgeonj6nwkp9k4jzq7v1oet7hvega33lk8qvwm9uju9pw17p62w2a19yu5whn3mbnvlqbdl4sgxzosl0jawo1fe2ztxjub9qfeo529rrfeayjapmzpbttg32l04lu60m8qfa9xloennm000ck4zr8kkcfq7tascvoo6sp9z1ga28pqhptw8xkcf7wq2e6mjq8qfrq8t31mi7xfh4zxt6nmuxbe24z0h4zuhiv3qddi2taovlx1y5cr7xybnt0u1u9oyw68bn1gasf7vxvtpvf5ocv9l7ffw3om3eq2qbjtnwr1qrb6oui7917xxy3agq74rvyzmj24i0afl6rwde6l16rpebfbo6xrnmy71xee1api8hry6xt7btljgsh2thk9a9ymte6fk9zou30d3tn3nqhvlcugynbef43p0rsqnj7hmh0jm10jzgq5cqtdl1mzva6ji9gz1tj1wjk66zdwvkm71mpzo0vzpk90so5v26uxu89o9w1ri8l6gb3rmj1la3oxip3sdw2cyqafelaxt2qrp7ngqh0jq98jh975kgsyl04iq4d4m6gu124e0vb0okk7spp7u9wp4ilq88dglx264goyi0ahmjx0pe7iihsnjwuibo1of5x34rbo3df9kzglxwmbdziowqhsmhi1df0njc70fvunvw57wh82zc1hoxzynjrbghb0pwng3tki3ux2avpxnmmvh2falewbvfdd278z64nn1d0lduzzftnd4pspj23373ekud65rsrvfaribatydsjh0acu2opolbf5dpah1c7h7zyu482ekxyqxhrajw1ule3u5bfzmy4af53e652lct4ytpjzptd64ufsbx55eao0405tlrrynv0lv2k2r7yrvv4txfzlihgdqcymoir5daluqvdlb5r8olo2tnd12we3t5tnne4g5t996ydge8wr1feu3nt5owi4u51oyz59lulllmfkk58byurjcdicnryxpjphczwb5kqck6gpttef7u15vsw969gxqye0re7a5k9wcox7el2i09y3rt74y4i2ax7p8z8mukokajvobyqcfm31dtumfms2w5s28vsvguirrr4gd9496hbze',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a3138bab-b80f-4d6f-8288-4814a3af63e5',
                tenantId: '6bb22c08-416c-4c19-85cc-7e8dac238d63',
                tenantCode: 'frhwwyh2adoum3o6luttt3n4jwv6nsy59bwp196g6wpevhpg2w',
                systemId: 'fe7d8df8-333d-425f-a5f0-2e0909ca1c3c',
                channelHash: 'fxw920h7alu32gmqhqyewonwiyeeotb3ohka41qv',
                channelParty: 'sn2a4qeqvlb0ony71sxlnqw1rkcxpm2nmpgzya1bbnhyko5k56yl9j8zgx80uv1tlxpudik0bvi5zerrrzc08q89zv62deod5hnrhnp6pz212c6kf4sxdc4zupjka6uzh5v2uv6khfkh0a87lcjjsy95g55aolk0',
                channelComponent: '3nw311jz2cinl4ht5iv8bsdvja485fi0zgv4wkdoi70qdeuqqggu0qe73oefg1o9ruh13cff9q3myvwkwe9rb9fkmvt9y5uydb857d32ujkq7w4x15ofbub4a6zmsex0i1u9owzqua5c3sjp7vb5d1zt6r5bqerl',
                channelName: '1gov8nn51v4l0bmknu0orwmonxj3nrq52vcasz6lg9de2nyrciz1sx1grwerx5xfbhvwnfzjd5zasur9pctwyio822gfknie5uajqvhs7w5j6dcz94zy9ho3lwtx9gcj6fm6vkl5aze51kbcfpeaxziw0z8jgk9u',
                flowHash: 'vree0clzv6scxu61djwq8qo6cas7ui54z1t9lr3t',
                flowParty: 'xx71nlssbhctbrnr334s584rir9qzfpsj1afxh2fr9922gszorku55kntuehwe84h4qqs44d6n6dso5wz69iyv3rw3xbocbf723oethqftayrfctbls0u3ehgo5zqs2mbp3nne9sr6je9akean8ymhykjz2axeq7',
                flowReceiverParty: 'iywavou6bepy3zsa7qztedpdh2rvotlkm0sjshe4ipb8gh92inwrfhxjkpb6ma1pa3jqdkihbj0gttetu5u0ileh49keixai2gkgx7cw7zjd68zh2vczrnp3jqnjxopgin7xwnx526qkd35b494oc6uiod4phgj8',
                flowComponent: 'ht1ygn6s1s1w9azwo8e4xhqtp5hg5jxy8jthmpu9pab1adsfbvf9fp810ttn2a30v2t5b7ngzewy51ed1w650pk87m3qkncvkeejfa515jjz9ze8grtnpm6i4qxoqlbtiatmtstp7ixaoibjsjq81iirwc2nnv8u',
                flowReceiverComponent: 'khxmmnbem2fq6f0en162r0oh4941qwen4azo2cvcxavqgni51ma4tqarzxewlr0tgwcdwp9dxrdaxevj7tv8mjq7xy28zk28rcaqgklhmaewez9542b3mbmhno4kwe7bju0htt084120sloycim2162pp7xqwnx7',
                flowInterfaceName: 'jnz1ub22wo94dv2dc3yemawgb6i3hqcmcdmhcsao3untq7tkzyz7ry3s30vzop4gy84lcb5iamk5yk434m3nq18b9ypoewr9pnorp59sif0knw847lxyhgx98eez4dgnrrpwfjv5iptwsopja6p3k3sjjolney2d',
                flowInterfaceNamespace: 'zf8za4glikcyz1unfbrykwjk4xsmmmxpc5f9pqa8fd6jl83kqedm0l6d1g7hc7zp7xie0o59sjuvkd4xntrselhfutc2zvshywgr5sbwic0hgoiq5bunbh8z1q7c9bwpfbnrfv3chaavwrd8cyjlp52wc8uukrpw',
                version: 'vt11bh2a7xcjvj5exien',
                parameterGroup: 'hu29fhho7l1tyffnvmof7eg2s6dmhpczhgue2hn2ta1wmnkiz2n826ndg0zsgnuqkj7jjvn87gkvqy49n7cot90zfhqvrc59oldm7a9g8qxa8nwq9jjs36knqmtdo3z8dfdfulyyd2qqor0m3eqwdasy44rwduaqdfn0rm0g7rdrpaxzew5r60s0ob91nmwoms4fbb05z7fqu3gyvtkz0tsz65u3xhzhuhvaxy16osm3pmscmiwnrq2cv8mldjn',
                name: '8xb21028b4fxu3ggyfbtlvmtw0t43i2nkq0aknxjn2g1uurz6shjxy0nchsahofbptks1v6qwxpfl5b7vtuq99pkkges6ef70zow3nb0hcb7vf2ijlxem2xca2ybi7ulnwknrgbsvu949gs23wzhebmqd3c65s1w9iwmpqw42n0hlaqpjnw7i1f3q6v7v19rmze9pqbe9c4t38yv8y2l7avg1r0lupntusjmzdcw7tou6676i8j3mp80etvyy825yrsgguoj0yre7x791twmw0s99zl1xo4hus7lnme7anxi4c8xn0d5jqvocgl1vy89',
                parameterName: 'wbefa2dhxz0eanea8wz9htwdsdjufzs2v1inqnl7byn8arccjz6y5059kzsg7kmrxnrpxxn0qahig4io6x9yovn6wyqw74w1s537lstzc7tbzei09w6meoa452xt3onna7fnagxncapq5l1vzb0gq2lwyr94v58gvo13dggthxfv9hy0fwyoklgvgavj4r3ts82em417hakz5pjaq5ps3yzudaf0dsvnnz66xxdqogr62ybwftq9w6sa4p5oh5ufp0c6ydmkhw84ectxxhyp0rurhmvb8amqunskk6azskhleq1oiamuarg3z2etump3',
                parameterValue: 'vef51edsy7lsvvid8gxhvgjlywdspbt02aszku4b25i48oap2xrr99qgvx5ucz4fo2ltz7i0zhiaz58ljdyx7rx2oy5ugitojz4miehbxghfkzl8ew0prrokfani2c8bz5u5gr7va0w73xu2o1yrqge65vzwslve3tsrrrteiemkyoeebsw4xaja3exbhrc8vxjedl8ozfh4v60qu6irdlam24d23ydhwlspxpotkiard048m2xkkc1tdrk8v6aeczh4b457yv3maxzip5r1py6or7d3p8wvfgqv3u6wa7ec4in6fxrk0a3dmy7d9pbe51fan67t3yt7ucyniwzqh67xu6f71n21tycqr4d1e76r0qeizzwpn0vxorqptheswaewqhgp2gwwabvfct2ohkqu4vfxy4lmrngulyrluvs8absiu2sw9ir77f5updxvrkul5yg2xtex33njio83ninzs4jccj56pmbiar9n8tbig5g03gtl4aq91u3fge540rcw4sy76n6g847a0u2f6k9ju56p4tm4os3clv5yffba1ro6i000oipjwzp0dr9s697g3smnj5be93w75j9qvr137f20zuhje1v5wymypob49ow5eiiabo9jvjtfi0nh6xwplc8kfuhqao7weoilowg893i2nkn3php53qty55mu3hlc1jv3xu5fp9bifyb7vdsqe8if783x3g2hy1n7sn3994k0r8xv0wj2t8ezp0vpy46a7y5r08ywiyh9xst5igrvnrfkeo39pk1joa3o0b3tfoye5tt2zrvagi3kbis2zhi4g1b3tzfvvh9vbu2pr6w3vbvt8gtobdwd4qs1r4o89aolfx6wnqvhc0g81jnbv65mfe732ylwjk0mfgludqtnf3oi2872defqt2hf9ppj1bcicoyv64tti0kp4cjnsn8okcfeejwfqlbaewf6p7mw1ph9c2kz3031znxbfb9nxe0dv41kdbos95ca98nns1m7ytpog8bv6u5ko0s1pkz8hhzg2txarzbtap186cdpn1g0fkbneko2h7wqe1k80mz0tlev5wqhqt96kmm87qm19d52o25zyxgmibb48wao2jxu27d878n2r8deh4vxl0wa66zzzpjzmphp6yow7qv8mnff1g05iy7bykfz5n6m69k1kyv0v4h34cs0pvor93q1gsms13fv05mtxdpi3u7zog71s1npndedulfhynqbtd637pacrtkaogbits7ujba8lu7kei8sj1uxdewa50of80go5pd0i9ye6yd8w9h18rmlntl78o0fahnicejvtqq3o0ssew3y5cy72w9flcseoo28w5yrgo85a4sfspjp3tad0ghjrhhidrek3plhtkos7wha254zu1ffegkh2be5efg2fr7l4ivndi5828oqnczx38xdgbqap453tx4hcwycmmt3qqrdgifnphp4syvza9sp0k6q3xnp5z2mzbldzird8up7cvyhr6rb8mh58qwmxwmi9zkgky45s25bs8oinh1cxvnmwlyiqafuxk6nmcxavc635xtly6xahfv4h1a8qfyelrr8wzt1kv4vfs85r54nykhgkwpu1p9skku4ehbxlsebekhvi1auudvc0p0vmir3bicipqm9hsjk0t8k1uwdflg5zzxtsg7wzv7e5fih20dgpzqe85f9e71tsqg8x7xkjz5o3vpos1660mdt21qztumo70m3xg5nmwj7nyzt58zmplrwb8ogl234gi79kbkdre5tkiem3cnklln355cqp3perpq62uli0zjnbsey7jeydr73tgxgxxzuarhdxcucansta42vssq7y65qpmtxykmxxezpmpqnpa6r0gdz02me9aoquhhayh246ku0ecpb3jq4z6x8i1se5z50rrd8pt5jthto2v5yy5pwo1spo3vxz5694x976baplw8hrd5j1whnuh8v2fzwy3lt5vb4gp0esstnoyg37sqj9nafmv74ntvokkfi6fqm0mf4xdcatekhb8iyy3tp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '139db028-09d6-46f1-b0f2-23152d9d8190',
                tenantId: '15d5b35c-96fd-4379-a05a-3f56f7acfcd7',
                tenantCode: '9j79ws4sliai9td5t38n5qqre7zs7solujcs65c8opu1d0ri6o',
                systemId: '85a0abda-f37a-47b1-a790-4b02559ddb46',
                systemName: '5gii78tr708xx2r2trnz',
                channelParty: 'uqsj2fizl91tur9civ8wnxuw7hf5gvgriutfl3piwbac5zfhem11ugfsur5i8zk0n6yhrn1c1iek38qefzr6dlqkkr1o68tl7o7nrnps958o4sa8gqffwp2238lf62c4nhsekbztwgeyqdnti4l07ai7qfjit6bs',
                channelComponent: 'soku4l450vmfyf0xukr7t7x5l4jlzehkio3f8hkj73ljp8wbgrjz8b2c133husa2ycl7ixq52bd5s5fsys98jqy7xnwlc23i7t41t5od1p8zchgy765n89brngeaefyeqz2atdfci1uo2c7x63zwghqxhmrgxve2',
                channelName: 'ne77khan2qxlvr0v6c6l5wpg6hdjmb1662qm38hhtyq9dfy58eha2qiw3f1fx51hu0b3yv12f1pwtafjkps30s9qzl4nisedq4fv06znu1icuzej7zp0ierf3b3jm9mlyq8ty9izeljkftixw7ei5zyz1n7qrbc3',
                flowHash: '944f5s1ohb1hze141bhxxsir8cu0u7apniyurfai',
                flowParty: 'e1hkvnrliqbw0ziqflbvn9c08d89wwnwod2d22d7zixr4rw7unrimqdjae4719wbj3me7oj0rvn8ds0jinwn6c0wevucvpmheaowk2teertfzi454a0pyb0mtinmqap7v07982lz1mvyledyvgv54wrlfae4lvap',
                flowReceiverParty: 'jq8zwogd2awie4yx0hcdyyds3jttx0dmmjk95qbbqtfafdpzf34o276dws8ggugqt0a0lqzi52pzq84x3oe10ectrrd6d2ufpnjp0iifp0hjfoq2f04jjhnhcpdmbkties6xyppf4w3yhoe2dgedxzuzh011ju54',
                flowComponent: 'qtf8tdb97e8w8iib5v4v2k193rdhyhnxu1ywtkx78g4lq05dqfdv9ll88b4v7qvkv1l75br2fluuekc4zf8vjjhs8ry5a2nyl401gze335kr19jkw7cdb69u9vxizs256lsed1yn375r76r0ajg1qvh3fkd0b3y2',
                flowReceiverComponent: '59hkiv7gj30xg4eecierve5h5rgujavjdshqtthkpaz0co7byzvy2sskrxecpjlrsfy4zweasvnrsh8z4uhztkropdkjkk0ey99rtmvt9mmfincnx8anfzyizjvxzdvnmqc7xu059qbngtahtv8sy6esmw272ps3',
                flowInterfaceName: 'yclx8vrc81kcdmsoi0sb60qz0u7xdd8nte4raksnc4kyvtj3xu2oqjdpm3y7m91o6ubz8se2ha9nue0esjlxlxosubtn12bb4lktijrxpnf4x3uwsw76ekvtdv1m9gz5te60qylhxpt3iaj095umle4zcup04myb',
                flowInterfaceNamespace: 'gyi16hp4jowx6ip2kajhp7wynvnx5cncwbrq30fevdrzwkyplf0rka454l670127yqvpylbuugpjq0138ct3jiu55ka1yfewi7pq9k67npxw6g0u0a6saw3n9jlam3a2pv31zrjx4ca8ojx18otkghasideq6q26',
                version: 'zbpzbum0qhc1263a7z4i',
                parameterGroup: 'kln61880si89fd8lonq8butnder7aeo0a77814vdqh9cg5esrpt6kyce6fqw8ayfcs7vyj8usljv5wuak0kxupi15lala4o83iofg4xrfn77ew8jop9z4h7lddt8esj8rs3f3nlfreen5repdsm4ehqwwsptpzerllqinmu0kgfhy2tkba5j7my1py04wxiwnbquisvgbzv2qewrvldtcgcb8a367w1wzw72cc08tfxuoaolx5tnbyw5yeb2fc2',
                name: 'dthxrwvqr83lk2ny47g85ct616cat80b4g9xu5g52arlfyn9hn4wptfdj2ql6z9igqzzyp4n6u6yvcciy854r8da8aq7n6cfg9j6gonw0hw2jtplcspzyc4cr1mt8nucny1tvyrp5pbau4t3mosh3g3gu19mtfehxw5uk442ae5fgdkvnmoas427tvyh12g4nznv5hrk73d51oced9h1uziigse1ht9mk5p5dwyldyy6pbvnm14dpql6eegck18p4gq78vu3511yicwemotnce3s7bsf174ur537mlxo1y3rcb19j6gl6oyhqprm23e4',
                parameterName: 'b6d8ucdhpo58s5o422fscfhjap03ddnw1s8y4psbyy4p0ie46hif5x32scej9wqcrsyf178v7237tz861lo4k3g4nbmedgm3vchfk8gz8ojzx4jel6qd42x07tbi786m05447l3o7olhlxs1u81k67xz47q5mnxyvjimhr28ws4nkj0f8t1om09q4krkh77yq5bfs32o09r0jswok482lm3oqpbrb64dly8xtxqoidljsswqh67imw4pzbg9htwycqhc24qynxpbwjnqdn3yut5iypeyv5ziykcmalg4nd3ot782gyeo29769remyov1',
                parameterValue: 'cz6sfhr6tdee2s0m0i7zp4tq63ykwm95hswm5cwe1gpus1gqyzj5z5nuvyaq3dz3auico15hkm9it2v9jw0xte9lncrzi2k7qnvy7aook9z7h4bu6qw6867wamh557j51v6oji0goxj0ds9za03wzaajrw6skew3417ugkvjgd95zolggzkxjnsb0we8xevyi8h49f09jr1p028i077m6u42qzempmxgzkah4zrkjodnhhf0t09dug55tu15l0a8wxu0lkn1vn661rs9djveepw4t3cscpm9wx3pecg2xwjcr02a37bzv4vhn4ljmzfx5tbm3lgly3c0i7pg5zsojxe9mu5rnnvacvrbbkho289rf9xzjud80zdl61v50ts31sgs09e65qy6mo4n4hnj7fo65dqtwce9lo6vcj0s1rb19nf70in3ibykxh4fmuqy0fr0jgtadklvz9cmbtqsgyhkrivojc5w4269f22yf8spr8y6bu35fce4zd14jommoedjqmbjgfum3nlukm9h1s2wbvivlkqme6ghzoqiggr67z3bidtg6l6wss1s2vy8lftqmqoiuonpqunb5srq5yp4edbrjuudrqjv81bg1666lwdfd8mjexmzxaxuultaicb5tjsx8lnenhxl5yj7815kkicd4zlkc7osn74kjeodyvdj3rodhd7rianwh5imomz7bzovldu9wrl1z5jn594zttyi92wsu2sl6ly89n4r412e7j793tt60edo17b8za9rl4ajvrw9qfcwvei9d0r1bznhc9gtiez3ztpd3lt6cy93g7pl0uayce2g52cvze43yx0iymi00r43vk9ijkcyfbwgjho6ovty8gm9vmex6kfbjmhuqpviyfgnytfd0jlu8s8prjuepk6cli8os394ysoojek2pt0ohlc75jr35457f1op52crzsaumvgwsmlv059naaa438gj6i1db5peiv397nbcr98frq6bvjp4km20veldou14bkjmoanivu97nt59wvcgvatncrlb3pyau17x9hdkqw1kck21nfygnk1220yo7pvnpl968e53w1qlk0ofkj6wzhil2qaz6stytmon2dm8e3f2a5iu8x26sxa999x8y8194p7o7ad5gkkyqc668pysl3ar4fg93e4zur7m4kr9vttkyegupuca2o75abu53wf7byk1ag8sb0fpj7vnsztv8yr2uzo4om0lxjm86s1hp40yhtaorlzk5he7bh9vdjkd23v690mj4yqm85h13yccavc5hyb1c2u4o2bd014jzgpg20lvccrvapp7vryhwve35xsvr6pu2n9pqmlgaivkcmvx1e2wbej0t0eunl0mh15rjom4uixshgh3lgtoe5iezxnirpfw99s6q79i57mezz3rbqpnxjgvs7gyvtaei6u5o84uxylgpa4a5v4dtppsz5ffupazkv6i69i2u195kmi0e03yl2pddwjr2xmdgwlu6ifwwwwgiylov0ve4qrxuq4u824283erceun601xhk7goyayq3rxvqtpcj3bnowol1tngemnrjsiildprbsmqlz9v2r7pd2fakdicnuc42cawv8uut4xn36gro70qft4uoahoubldl23i7asz8snaem08ccs0my9b0hxy707gr00ngz0ujtoo2m1nxzd25s4cs70f6e1q3f209n8rnzmp4nh0162l9og0vi6gejynjs6d93zmragzwkp8ubacwz45f2el5lhs21ux4heolqvqrv6479ev2yox8oq5pesbovjqfl71sd3m58497o6a97j5vi27lafp0946m2h3ilha0w9c4a0zvtrdz024bcn3u84dk6oyp3su3sritmodagr4qdqiqxax9x42hgzhhlvz4jw7bjk4tohimizywiifsho0irsbrtbdn1syyyum3op69wmchyhmc9vig2b4qwp3ud2xp2eiami851e59jmzfrmlgkb72xif7jgxti280l38zxejoalne3p09ytvp4huvvxzyxd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1455e072-d720-4b39-b752-f37541db8495',
                tenantId: '252f6491-2a7c-4f34-9d00-acfe4d923014',
                tenantCode: '8cwwlsak875exwtoctws25csyx4q5q3fr4u7p9hlmfu0n17fwi',
                systemId: 'e1f059da-94bc-4425-b9e2-5ea3ff7e4941',
                systemName: 'kuc8e8mxjaci2cyhls4w',
                channelHash: 'e32nclzk7cwybhkw1xnw2hwl3l95tcg4wnx54hx1',
                channelParty: '5seb4aa0bs1ty9ena84w0f140tafy2by40aa990xsynvcrmbo8rfz7y8cxdm4d2j9gbd4424xu3so7tl0wdydezkf6ospc63oquho10ndtdjltfql3gyrhhhaek5nrsaxhr4giyybi3cnj53jorx6gmfhxjqsjnz',
                channelName: 'n23sus4jgcxcdmydyosyysxxl1bx9n809r3zegptw2twgrt911u2ukdny1blmci3sk01kr4py0z1rj0167616j6541oq2kuenkbfjnw2awq9bpjqt3phfi2himq15lptnkssxvejdhjdht6akedcmyi4sfeq7ug1',
                flowHash: 'jrnua8qw2lmond8he1jdovl0v4qo3s9b15uermlc',
                flowParty: 'dhvf73h58fntv05z1yi9rcxh17j61xj7vt2yfi0iy6ovi4157tb9n6ofgcbu7v5ml11lky6lc2pz230eg4v9vqau5peobzwphnp97l6gqheo7y123tpfgmluehoez19u0q48zcj9jxvv9jup25dub5ifbvlidunh',
                flowReceiverParty: '5r77z77fnex80z42mlr7t7b7jt9s6e6fal17kykcv02ui93zgs0qj4b0hpdtxwi49ltg8b46ksll53e0oxv66cdihkcneodrg5ttphe4nkbjd52vbu76ppqseotmlfnvydn8g28ar86q4z0zt3e3bxk48rkqymjq',
                flowComponent: 'c7vpno3hlwrr50bah0r0ad7qlzrl3a9v9vi7vnpjw2u1pjj6p1guh0o5dejc4zphstih63uanu3p0oqtdqe0b05w44rxe26laazz8zsyid54rtf1ui75fcrv6m316uli3dygi0ca4vniajiypjlil0tx4cd7ro68',
                flowReceiverComponent: 'uevkld3uqyai01xlszr4fj4lg0d06rkuhyfehd8ppxgtb19t0frfrw0at0h1m1j8n2ty3fr4wvk95lznve4n5qbtiwkz8lxx0a1a0wnke07nt9x7nl3wbzq41nit6sx15njs4bs0hmw69n7s6ivsq5qm1okwvi3b',
                flowInterfaceName: 'rr014o1lpqk7yo6whqgz5dzy8qpvr2islemyqrleu21yuffw7z3njgypt2dlaj54s8upr6dbqtzkjasjxi8mebhkxxgk7htufl4qkqkby1yxx6ex020ich2yhy4md0kkut0nx1bf6xunx2t286rs3fffvotxmx8q',
                flowInterfaceNamespace: 'zdceuocp4z8mrohwedslypk24p7t9hknlgc0gj0g3stvawta4kb3nhgohy2fp1xrfasuqzbqqxq3ydlw0pn4j1nb8frnsiyekmab24e3ur59oaeffqdka96qda6wz3q7yijd1ve64rmwa406wlzuj37ug519uh6w',
                version: 'y8tn7btvkq62tianhby5',
                parameterGroup: 'y3algydgkdpagll80okebisif78yu6mvz4fl4zcxst7ji62i9egkhdrrr49h0fanj8vq3njre6bsl4lu66zw39tihs7o9mmv2p9imjkrbgrqe1mhaco4914tqn40fp6fcae4v8j9mlfak82ocxe6d861g8hzbkvtr2rqx10tzdx32a7u2p8veqzi9cc84e4udld7di1aqerfe35yc5mip8z99o7mgooz22nv1iqn3x52r9uqljby1bj382xpz4x',
                name: '3ginhbyos33agndkczaaqolrh75elkmbqp6r7ys21plind8ayp1vhihf2mfrgxknx6fkvszzzcoizl8eajd02gk5bgd9sn2a0yhj8of5kdkw4dk565pdzhow14q9tt6sccjl3q5mb1uh38iql3vxu76q66350avgwx2h6j1i0e7t79q9axtw42ullxfjx2txxsiap79t3jz4tnmtde9b6qydl69jp50eoguurzrx3zneb3f4pm84w4x4aypbicd9emgingpoh9lzc7w8r0gpe7f11fb3rdsaa4muq6vdxgfh2b3wc3zrhdvgni2xungr',
                parameterName: 'uwuscfj8v3dasybvi02zcz3yu69jbrvunc9qhvltfshrma6ywqm9br6zljn7mu4qf4fgqqdhkdop40g8bog3jgafowtcnj49s2z813h7wjpgwrmbd0j0okrta54tz7ehob3dyde5al4p3tiy0g1juzrj97hn8daknmi5ox011k6a1zcdijh43h5eitob2vwpyyyrf32nzumygw36jy3blx9g8axj7dt41zx2imw04n7x096qq0ojv9opt2e7cmxzeylf8bryxkttq9jo4apmc5443l069m2jt43bft4x7mdmdzngll5c0eehtebxp61l',
                parameterValue: 'rbia5vx4a3sqjiqdql543t3jiq501qb6zsxvyqhk5k9667ndpbi7i0s00bs0d0m9alnkswc8i9kqp25ejbi3df2n4hegfxpcearykmh2gigid673jmfcl1lh6dcvv2kkcwlp5wcd28kzhatq99u2k4b8ln2peznnkt5hfjrvunmqg5z1ogjripucpzgyzg6774g5v025aibqfhdvvvkkcfzrg3s6tc4qimiq8bmh9za13egp82qytieim91jdoff07kg7coqk606m2textyxbzralchciwufamppbp9rlfqg8yy7ns8w960b88jz2xytadsi7d8oyvfvqnek0uvyzrst9mr8ghbp96nk2h0p3orqi4u5w2gksc883pupnt5blcwmgnj2xnwmf7dmeqjmhsy9j2wgf641yqzi8z86rn18c3d3f0yrxm8jcm79ipfvlyt44vxjx79uyferiuu0e0i08oc02fsk6svcs5wldqhm3japoplfl0zyf0jlhhyrshedz8jbjsx53wojuj7qrrrgoiszl5fiwhnw4c37i3av0s1wwusdm8el8phq8x7ux5s8851vc5le8j2dus4si40y8uyn6iui7icpxqd7i67cb28k243l545vwysv2pevn6md7gut4fwvy0e987kyhfw4zhvqy5gfiqegrhx751y0wy25pu9ltvaaquw1m3430rum3r1q7tr4bh6e16fjmgttqpizomqltitkqkjcdwy3810ewd7bmlr1ny7frq3hgfzz87ujq2g84d5jfhdo24t7nb7wotnmk1lvv2owtfra5lq0ty1xgcu8mi5q1b17isxwod3hvt3920r3z0qkzn0scew9kjoj06bu3n0pnk1lyj6udxz12bqptq3nhgbvr1ai7vbab417wiaeal7s28qi7h91gvitg83m7doxser3zevusixi8ciabtcj8ci7z2ozniaujm2dgkacrefkdwlxdb4sqdw0u6kygg7nm59y90nqqyyo4bk9c8jfqbqgqo86jkjph97sri6ds7g41bjo91ej4kaan3vcjy5hggc7mmdwbgg44fpe4fvjoz2my07ghbzw0hkw0fycky8khm962odwqd57phudfkchdrcv5t8n44a0zbzstckkkdj29jy14cx5u5ijk19cjjpd8k6e4uv9wr8gj0nvuor241x4stqcqxkkvc1argbacg37wb75uhg4xigmpnmihh262b7w79543ve6pusdbtyhvy8pmnn7rxdocxef3xzzrypvfs6z1nks4ngmv7i7oyz4kfnlx85rcxhr32frs2z5k7wnm89oir3iyljuzttfp9nbe9b70t0bmlgxs2bwxogukvgdf39qeynt757sd2hlg6xudosbczqvsmflh3onk76zt0uq3cqjz8f39viffvxnn0xjw0wap0tdqckpk5aw6a60y2i13eugybz65ppupsldbn0lnh4yajkadphc7y0qg95i1rhj9vy1o86vt55gihvmi0yeopm8h4r7orfitkr3bfgjz44be8n0w6tri99kvxfd3o0bn6w1kj4m21lgm295zlqq77zjq11hqyewkzv3a44dfjauf2xyy6skqril9bem5mt74lfczb3ps8v73g1co7eww971uk7t0lwi9orgny6cadyto8mqkk4z4wytud50w6npkrci1nsm6i7r0ewa45gp9cd7m009ygtfg00705jxebswnwasluw70fad46q396cp93p949zfl0prx03tim7zpewf90zuegcs3gts11p2inugspaim2uh9f75i6b526zmk6mklc5fuxtu618r6ccrejw02tjujbwolankvomqn47s89e7eqxxy1jaghr4ux2n7kc0l9ce3460jmxajst9ro2reqeadx7q78q3js78ncyv2b61b7lh73d22bc6di7htwsiljfx5eia2io85a3wjiy27x8t5des9de9yho7d8ifmghmvpka2ax1bzr87eg349e3xze2xuvzto21ymmsdl6edf7qu8ix15cx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2ffa7729-5ab2-40fa-992f-2675272ed1da',
                tenantId: 'f9bd49a4-c7bc-45b2-a38b-03392375db29',
                tenantCode: 'lsgi6e6tahs5ymra574e1yabc07l7ax7ypo64mvjsjabmoicco',
                systemId: '464051bb-2c32-4dab-8fc4-1c65fb71891e',
                systemName: '6jgqn2kqtzqeaedq5lbg',
                channelHash: 'kujq6ytmvtx9s16mjlvn0by2jdealo33t0olt4rl',
                channelParty: 'b5hgq1afym4vn1lujsq14v3871yas1jvz4dnjkyhjtzxe3lfvlf2mggr30bnd4sa7y8vux30blf7xz1aifc4yxu848gq92go2n8otlqcbxzcm221w39t3jhwzb3noqpbovv2mco7k0ng7tzuzmqz8sexvkod4fgt',
                channelComponent: 'piu1k634tu6i1qx4x9sozdmntu6zl6v55745c59i9ast486ke2icvi134x8kh65ggrhqfdsl4qme23cz3s2zbq691jyrzalq4b2w70dqmmsoc14ynta3mrney6ylhtqkwsc9tgmxsz2mjw2fvgke8f66so0spo22',
                flowHash: 'a0gc4exx15jsjinlvodva16yfawxff0dqdu77t4h',
                flowParty: 'e62wc3ej9wub564lqe2tuqvdw33709xcaaimsluxfc9ewwutze1mzq4cayphzpa5xwl8ajj6856k7zi3vh1y5n0jwtintx23hgvh5zkfzrjriha8feq9xnvd6chu9jhjqlnkvdb9bj4sujpgoct1sqdg4wriqnm6',
                flowReceiverParty: '49fns5c8qwl1vjn03tczmsjhfdt4rcwleou0vv1z1sa6fo903f7px3nykhg8yaved2pf7njsmzezlsn6xnuwqc4ajo4j8236ub3azyga03hdwdrg0e0e3qniqcrwfi561bp6a8osi41h3xh457g9iady3mvmp1cw',
                flowComponent: '8jio46qxeokpobo3upv559f7aa67c1qwnrehx5q0o7xms11aobb28prcqc9ns2fcl0p23mqbyarbnpp1bl5lzg3rnt8imn1oallb8fqcbkjcmpad52idmwd8qc9srd0g9lqjlul8sadvhghsmfus5rvxjqmjoi54',
                flowReceiverComponent: 'kpbgepz3omdhh3fr2kr1makmmyd0meckeg2apsjnbx5u20xppdp716n5bj13ei3uzwtz1jlsjg3y403i52wni74zdkqh1d5nvdpvs6fhfuozvtqlmhku5mepjz2f3ysvvkk4q473y05hx5d5ntrzjdry39obdzjl',
                flowInterfaceName: 'kmncoijtkbrd170y10v0rbbd6gez3x2p326kq7m9hd82qzfc65y8u99m1l0ktbp1e1wgb2xjwjqsad8vzl7r9b0web18cex9staques8im25yzcd530nkaxoyhq3tsyu5q57et7hjlxptnyzjv9lqnzevgqf4kez',
                flowInterfaceNamespace: 'npqinyievfacqug451w57hl65zjpfapevk9k4ohy90emetuaj2g3ffsxbv8cledtjxbgsswyp90c75yti3442sx9kn3078sye5ttxxj4wjav5ywcsy2goho90tajfxws613wdap3m5a65oike29zvtkc32n06bhd',
                version: 'uelcl462mwbshkc6vmzf',
                parameterGroup: 'ko92cdzume6uiq252xt3p4vo3uckqk4imciawo0f1n5jo2cqizfgjr5gjzk9xq9gjl4uv3oh832wykooi01l943pkhbdm2iaf4z0tap2ra5fbu0mgqn7x1a9w0zxwqkru2xkbrucsdzjtjmq8hgvoao6ncr9al9abjaswdic8fzggohh3xtkahidnecxjb3a9qb52iitadiptqc2t4o41kego6jl483ehxhcag1as87nv10rn7r9tm2iwc8st3a',
                name: '64z2ko50usdclthxb3geg45iu3cf5sqneikn75rfm7sofjjpruxw07uebrhw7huv462xx9i7jf2dwy6kmq41vv7ruetppqv3n906vk1w31we1uyapwwso1y0trh1gmhb24f7arddjatccuqq021lem1851ux566mwq9pffpyqb1gi3cbnd01yu3s767mcx1hz4ubo7gzk5fhehunwpvfpf1cv6kobfkopxetbnewclsfhjsezs7utmz1hgytjxez5s4evgbrr7m4a8vi4yjcirzi3xc049uqfzun2jt9aswfaf3o6vzi1e55g3m4vx5b',
                parameterName: '13ft67u74fryxcgv2johllj8kyqq4q24fuu70orlbkg0uiu3ta0m1i0voslfmfbtb57ezf79vcpxr3frn1z60yjz1zd7vbgel7ugmkey2wt5squgsn2q3yu42udsfti5lw9h9xdy4sjw1vbjkgtst4309qq0wvmz6fdhi8nkpuwh13my9agvdd22xyw51mohtkn1wz6ro7jqysy4cx4t3dclixc7r4jpluas5lp5ubkq7ycqv420djjq8el4p8zqib3ilpf2eig8nmqf1veg0fr6fmpevu6mzg45ikw9xe33x6fwls55qfd0de215ov5',
                parameterValue: 'laquf50l1y2bvldhvzjgj4tmlxzmuatsznjy5alod00swyok6wnszojyt7q13u7ywcj0i4m94crlh3bb0oltuo5gxsu8920nvrtmt6hfr67t1l0k4xxbrf6emzfxqkiuolusn371dqhpm3v4ivnjw7vuubzvrdfu908g6hc21rhkqfeidcyt2fhcrm1lz5wz8seelxghzcu9mhno5yitlw1s35fw77inzam18gmwqr7dbgtzl1jzlcey6oeoynfd8rw1tnkllzb08f55t184nftpfuyyw5k1scb2yitjxazbf1ocuil4i11akbydwsq5pj4cpfnlwlwg6x3mxhysx65s7xarewjcabkwbxcb3cbdaw27qbg2lneq0f3ps2vadcamodgzdu87ted326737h9bjqgilxohee4r8lm0q19be2841rrecx6rv9vor2kfeq7rn5rb1tlyqo30q0bzzxs4jp65lvxmth06e7augnyhltu491lo5r8otkut8hbb9ul3rml8ewyeljjwubx0wtlwq3s1ze1trmetsys7gz01x0hw8i6brs250wg0fe8hornpbg91it3gl62o27wkgwszt2bjgaafod582nof5chdvo0w3658zrd92mkybismnyvtg61zt2hznca5wc9isqb6db50r70badc1r7q3fxzc3n7csj06yng09zqu4xkpemmfcw37tk195er2aytvve4dzc0l3l9kvcwy698apvjt4axwp08y97v8t2h3tywncxqx9jt1q824cq7o6yrgugscjuwte5d1aj8tpti1zkxnw4pn3vtm05xucsk3h5rha397w69v5ke7m116uhot6ydoc7sjhk0he0tmcnoobzfal66rhn6w4aqigzm83ztxt2f9b7cqhslmr00a95rv8kazgecir5tjarx6puzhkcmh60m1jzbrk88epe4z856aa1k6v18vxv8niv92c7z8x5ov32njr7pzp91gaqmh1f5bvm07ebokq93n8aa73tlpnxfyilg111qsqq6chv0fb4zuzx6uytd5phfah41i7zvzq9mi7jc58201o14kq5u00xje7ebrsy3adglp7umxwuaf30wncbc8hui7zupa2nfu03z32sbmlbwkycbhs9eo40p7lavwyjtfffts4rbqtflxizegacv9yr9hz6ndva1j1stdif62i632dpl9izs4kg96l7vw398hq6t23tiaa82oqmiweriq1jx21vhlgxdq9hz1139y09eglimftdh5uft2rpqmhypubly109vfh06e3fji7x2cmynpaupimizu8lpudg1qmyqi02urcj2pel00kcomu57r3jwim5i4luvua06yei8e21khiupaptgpgqlqjgw9oh2honzijbalgcs80t3o576i897j0dvkuzq8xwlh9orkqxndogtv86cz7w00hlc8umjug15luit2s98peq5yd0s5i3onuit94dcgoc8m1je76jjn5576jvtxhjhy18jx9odb0fov826vtctkm6chca1wafxsfb53zxqs5485catt6ajn0qku4cenvomhv9u68getg3n47xbzpaafxdwq04g4jacsby3wo068mazx2ag3u7ntqagouc0oswyi5kyf6g7pf17sag0w71mdj8x6fde2l3h6zpaiv1b6xgfpm7ck4gymhvqzm8x1gpy594f08nzv98di5sxgvtxc4zql75vo96exxu3t7it2e4wweqmxncs5srye4jfnabmnt6b3i1ih57o2iv43kvg4jsmlon3qw8wi9jycc5tji4t5235d1awg9uztg111szo2txoyd9pnc2h5dral9fshpduysmlx8g68yuw93u0d7mczaas4tfbz7ifmm0vcaraqk3goimb0sylv0y1fr35h59v9iulqwgruxgflwt0uhgjdavz86920z2947socqbdqk7vw2raopd52i0kuex537ydzr7klt4ds47iu9m5tut393kmincl7mfg12pxbpd18nswqzey8rob0svvn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '748248b9-784d-4648-9533-db9d25728d46',
                tenantId: 'cf0e8810-c48b-4afe-9c42-8fcb12c92ed5',
                tenantCode: '34s4innx642pcgl3qepdggm70csdplxvmevxz1r2zyy1dnq0yp',
                systemId: '63771be8-003e-4d4c-bbcd-b9de3ef4d3e4',
                systemName: 'u5rjmq8ub3q93ngskf5u',
                channelHash: 'moxccm9t4tn7v0utr2nd7xyu6p4377ur7ceu20je',
                channelParty: 'nhvmpwhg6dz0wcy35uedhius5pt2zi85cs8z3bay2lygmultzxa2iqceu0u7ty5rptug41bj2kkh5jjq791j859x60o37czev32hizn8szv0xangim75m12pppa2cp7x5kk9ananv17kr3xyf4nev0kegwcm1fvb',
                channelComponent: '1bixx656m147xnzzfvj8u6u05wem5wrnnfp8goqg9anyp5zpnr5xc02z8nm5kqhmntdgptmwghlnprdsixma07989zzgzym2cfju24pfg5uomqylaoyc5v7l5td30hxfke5f9iz4k8ljrvmjznwx8voj0do8brlh',
                channelName: 'zebfvoei9waxlg5ij7ap6nogoqmhl3i2lkhb0rg7ex1gic1o219h3w66wbwbhmozwvh39750wj7bbci245puzktmsam6p7ja14tqtrvblxhank4cvert9jtzflpzemifb0tcn1j36t5y3bimcp1mih4ow6bc9i1y',
                flowHash: '193ajvx5x0nncbot8d00dwqaqnsaopdr1cp7c3qp',
                flowParty: 'k0cz748fyo0zfo2h59bk42dco4wllne4y2dk6ppf5szcfmnb6plx3vqoc37pmrqpovc4r0lsvgagn7ltyr2dje5yjsumkvogxsbsfss5qq4dni4m77h9q0vfhuf1ne9jekkb61z0zc8w3qoq6x03gjob6wqg7wbk',
                flowReceiverParty: '862r4uf8vx3gqyhyl5ga11ev29ijfzog60w947revnu7hvr4z7ekq4ptb6s60pg6bjarey1gehkxvqbhxacw5nwhrsk2rkzkjxj8km4ql7jd410qa6cm330ttsgfwtozrjjodxjpjnesgazqywa30dptsto6u3sp',
                flowComponent: '9mgcgxrky7abi69n7hpy4n4gacc2qlzl7wbdwm1z5di7zr9nh5nxu96el1fsv57eu6pa622mmczx0684riyxn3aqe37nir1our1u3p1ulrq5ll4092fxe2r596hwtnw4uios0bwr8kriwwlaxdei1iq8yqdrkzma',
                flowReceiverComponent: '9regou0v3tltml8p5ql8sd62rqscztwuygioxswhw6odaa369upcbbaw6hpbsd0pequk2v7hi1anio1x8m5slz5g81j7npozn5qcd6jssq3phfzsy6llxtnnxvrmug086ivjrat5pq8chkx70lug3k0i2ap2r3ej',
                flowInterfaceName: 'rm6kgrgepvbam3sbuu1g2r03g3m8gkcf2vhkib8p56vbjxwf0qx6vd6c036o7136wa3pkzpd75g7ncg4h0vifcoghxmhz1xngwbg28t1qzoxp5zkmce41uzzhpwsatwk0xgp4ynp6rh5i1fij3aqq4lne4zfrfbv',
                flowInterfaceNamespace: 'mrxqm2gutktria5m8xw5gvxz9bwly882gd8ofwwie6me0sraktjwcfypnpf148860popsdfun5p0fzzekndwl4zzf0wxlgfqzgfmgzztkk6g4oo3bbmtnfqpnpfmfq9i927w8te2u79zjgu7dlc0oly3isqpzdk2',
                parameterGroup: 'x97tjwin9c45psly83tqgua83grsc1bqe7ip8i1o1ib22gkajg9opkcbqv9tpzjko8eoi79rd9sbvzgc9y4kdmxqxebmj1b5fkc0j3cw95t0j8gtor5pr8fuqz9xbfcxuffhgigf3cu2fhb2ob7rc6s9vd2klp3rstuvodqxpqzt8hzqrra9ulnfmfejyzlzeull1wbdqs52af5suly3n2j12jbrpxj43vb0otvotzajibu0g9ulvdk971nsnsp',
                name: '22ghzcaj3ivvib95ae81mn1kdtpm4434f1jhszvecrcg4zbaf1qxhj65bxbawcwdpznl5duvg5qi4ffbcwn9yqrnkqxewbhuvxzekj91783poyg6u9pbvfhwvzbr6wbdf4q2agk4s1pargxh6sj19a07y0a4048fareqen3c1nukp4b6fv8wis2cynr1uv1qn2blgx0xsk49uzqfqqnevz80wg1h9g51wha2d0sehev7ahofup9nmlye9ru6j1yp5w27mcdzaea6sbk710dx9bmp475bpva54btsqbe7zd0m0as65gvfcdc70sivkham',
                parameterName: '75y3k887d4uhh9oeolvd01qc96kfpxk4qzlth36ga44raraoyixu7e119uw242uzihmcao0yne6ytyn97k9vaswiuqjahmxdqfpu5m111gc0ax3ksqugenzyei5dnpppl9ckfrhofsf6qkrbatwd4qyxrn6q92h3evx7glrve05nx1skmb83vgo9k30qpwcsjw2xiswl0l51es7fp9uqht4qxpa83v8gggdpd9uaocl6lx71iua08wvzlz2qnr8sgt897r3krigryt1n1fbwoke1sxwyougi6nmbo66shf8qrw9nakiyf41kr40ldo5l',
                parameterValue: 'mas3kg3fuv4bxuukgtcc8czirxekzfk8iej7mwomyw5igxpi9nq5by1qtfqlnes1y70pal6c4riq3pucea9c9a5bm2vi3eq16w5evc4huq74olg7xdazt6j0qh8400yr5iwlwqdo2py1rrho2frkhebirapdz0uoih74la0b1a1ru7ww3fsbgnvh8b6ajh2xclijd18n9q15jfma68t25dk1zh9bexb5kf1yk946ohuzaaz2qxdvr64w9oh508vppj9z0ueb6s3tp9sfugppbwtznpcq9eig4zf60crgotf73ekgyfmexyl3z7vnypo1wj57ftikey9pqpkelvddsr6qqzb24rvcbq2qnqmfp7vmzdwmmszby2k9xyl1zwio6kpbcfx1ddrk8nrxwhw5cykink4k2lwaq4dlelhe8hzuxn1vzd2ycxj2lw3pv69xjrb2sw3zcin0pczidb7ym92j8yimhlc8s5fnwp024ik46chnwzlqj4x20n2436ecel1x6yygtslb5ra62zqxisth3cpiacinpyrf68l8d4ma39h8008rm90dc23jxp48dduibbffswwpdq202fc6hx8lf2qeo4a68f4q6flx9yi6mp8k3tn8r8wpx0123k0zocrh63utaq0y0f09ciyy0tc8pizwv5hxa7trbw305nfbhqnmrftqx62hgb050nmlcd1ny2hnz1k4pfqp56vjp7d6h2e6yu6rmhwe6nindky8x3ivldyvgwrntq1c6pwdo6cxcfmjwzdyomfie21odjcs4mi4twudvstqb1vp3hfzbvy7qbf6q8thrltfv9787bs7pv3fum2eimngvhwi9ge3onpk3w25wwpzp2t49jvjmspbzc9dm5mm8k4dgbk22dkcqdqj6homb7j697nroizpqrwkfbu21xeh7d5mpskhjyi2wkqfdyyxepbtc0s7f1ij8h98o4c79n694dlbjjbt7qvd8v2mgb12qby09iilso8h6bhunsf0harn28vuhsnxghsst1q6u9ro8wwpgwjbqnq7xsd5o522hakcsfw9jwfth2gl6s5c5ju9gg5j5cy2boe7ic2bgm1aknm6y4g7v67nnxhpyb74z07tlh82w5jgsirqglcfhdziq9l47maxhwycpywgyd7r9g1k9iwwa9a52ckr292wpjwx26u5gapa7etzpperavkvi3g02dgsps6asghvzk023r49399z08k59imtljitryp4jxt65umi9qzw0rz86876w536zz8cqp5s9nnyizpajghpjcwh67j56pdtblpx2pc7jfyj6mnk27amripa1wii9vdtbpt9bot4pe86l884iuv4117552xmrgfy4v6lht7izeogth7l7hcha267l2quvgjv86dpkja493t8bcrn6r4oweavwh9t9qb4zp9n6l3o9mds8yynlxdt8d8bwl5p2dgeuht7mtbvc4ohn6k2qd6hs2pfk75ii0l1xl005gthaeynxtuqvc08onpf78e8kkzpvu3fv161elvy5ypeu09y94qd520ipc8upugmjbu398ic4m3q72qit7jvcd83hlb6puzgfv9zcbnas68ockejxl3fr24f3hi4w7kvvq7ifswnttnovuatyju09tnfzoy8obt8kjerenzujeodqtba6haci9312rmjjdpvin3f7x5fxichwb9l9b9ld6qdrtwrppk7lpe7br6rao2lzjfwo0gb73h4dnyppldn8jbydz01r4xancwavp8v0eoz7ddjxr1n6da2sfkoqmun1o8ylo1fak0r7bm3lym1sq0enczly05jn9w99l2j35lzsmex24joavghaaa7ck4utqoon9c9hw5sxoqrf8jexko1pxxxlgjzo672362m2jkqsvmbyhpuboevlk49aearwxhhs2xqi283a1h509qyc8l0cftx2pba3jxng6vo42f69im2ryoof9vhi2phdu4w36v73rzvvsfsen59klqniklpjt5wja9ji5xyjr6pv3ezam8v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'js5w2pvbga77rou18yy745u8qm4gch2lszfad',
                tenantId: '4f9177ef-e0c4-4487-9770-73d0070d22ae',
                tenantCode: 'wh0gzdjjzrv2y9oviyfqayvrtwbmqvdwwhe2r4e41u8guj8db9',
                systemId: 'f8a4bd5a-1ced-4652-b6c8-847442b655f4',
                systemName: 'ntg63kmxf7ftigohhaq7',
                channelHash: 'tj4jcpllcgc0dkaq4ypm6bec646bn0ipjqgixqnk',
                channelParty: '783gdb25dmc21uezynpbjtx6utn8vcjok27imc9z2mmldza5v2o9l0c74gplcy08qk0kmwi1e6qo0ckqyc3ixi5hibugrxbk8ym2y2497vze0cvwjkqdf2s8l1coc3dct13nimx1gem9ufkoiz4plq33pmscul53',
                channelComponent: 'y3i9oz6vec3moy1mvrs7bhi9h89olvy0cgcpyw216cwc0lm86prtalqmoe483eajjr2yut1dyx059w3w36sks6480wknwv2makwyg2ksld2g0c35x6ks4h0eu3rd8xv3yp5qhfizniil2d60hd0ahr3bvkmvag24',
                channelName: 'ddotwwre2se4bp93zduhoqwjjo4ys4qctae3dipzkfef8m83fal9hic2vxfv77e0wwjgcktz0b2g8ippl275vxw2fg4n9w8quhqynfv5l113ya12cbu8gt054h5hvoj2qpll4w2yryxiacy7kfhxqq08h0a1n1z8',
                flowHash: 'cpfocmvf4rj39nxvn5s2ne5efnf3mkcn7o2pt68b',
                flowParty: '6ewtu6rgyo8fpy1lm8qpjesuke6cr2aqnco22lmiu23bpmfgpurgyo1omal8dmcb2lmuq0fqmm71qb4444odgwsn2oojiqntnvn8whkrqgexgoy8dgplc7tkrgehdnr3sn0qdaj7iir3b7agrvgka4wm65gc8vaf',
                flowReceiverParty: 'v8u0vo2ikmumcyj112tj4cm6wf7b95debbz6kkj6v3yrc18yjc9b8j5gkjrapntw8stjvcdc5ui71tjx80o8k1p4vot225amfr9lguopgqbilxy67ypwrulvopuigc379asyt1jjty4bv1jbhnh1oi13lxrr9bl7',
                flowComponent: 'edp8y4si5e5qbscnqb4emdufubvopupv18xv7cil577xs2nv2ykfn49xw1z2eewcbz5jolo610x20b13x41usmdpurnnadgnqi3k47vdcx2vz2myecvwniomkbw5dacue91cqrkv07m3vhjuiy4jh4nkh0qocww1',
                flowReceiverComponent: '2mnxg96sye0qoi0qwgfibxqywqix5wzn6a8me5uqenx9pju5lk0rp6713ekfk2smoi6zflor9rzy97nw66nad8e5pzdh7owhcr7ulqfjk8qa6e8zi3ou3oygmijitdkgh1ghxqc35v13xsz2d8xugjkw1k38cokr',
                flowInterfaceName: 'huh5ah8fwshq95meri3hj73gtdav6kzlm60qvl8yo5p0ysa8y9zwlm2c5ot6y0okxv1mtx3f4lde61jaugw1crafjoman2hoz8ksswkpnq22x667ty4a1h1utfphb5028zwl6ojaa5jrzwrzy9yjpoj4fry36wfq',
                flowInterfaceNamespace: 'xn1pjeotve4bzvcarfj89598ydk4319ml0ysrcjd13449lqcc64tv765mdpwv2c57zhq9udbywt4crzdbeb3h7bv76kd826qcsjt1e9mrrxdq4a8xbl0qsg1g97hars4kmga3rjag9mkud0k243athfknaij3y4e',
                version: 'k6y0b0xm7i8dn9minsbq',
                parameterGroup: 'gwb791l7h3a3lkigo3lh3iub2zj7lws74f2b5pny1du7c370egw0af6irhenzcr2ty97rlbph8ovtr0j4prk3z3z43k4x8lrtvwohubb21icoznltfigb5485k7lsjh6ow45sekogf1hl7h0wlax66ghy6yejemowmbvba42krlb3owmvl3u26qqq50eidyp4w8v8ogc7mpwsdexe40fahcn3a5ebseogt3kq1z1nfxbnns67z2pa7hda4js5vy',
                name: '4zp1a1pw3rnbytdtbzcr24jzx2p59ryf3lmvhtzkrfcgjnr64qizklee3b4y79m6iqszy12ef57ndchmlz4p886xhs1wzblr5mqacagnewrfihq00bffqvy7xngd8ortyqpy8nxwo8jdfh58woo3cl8j25il78z1yrpifbbdju3pa6p79mo9dcous6rsguu167kuzob7acmk6hezqvlx9ey1baq55jkvc85850poryyhrp2nnmuvl2qepcezkd05xxgldtq7p58d6tjligywjf44aacb3fjzy3n60nbro4obbqf8fwnleis8dk7esh71',
                parameterName: '4ynj3rrzagyyx59ckfaufvk04xozcv1o9vf4z41a81n0dbmugnxueb5mvke9mx15vvbpo8cswc84lwdl2775syjljcf4gbxqplmlu2uk7pfn16nmxuvgi1c14c20ejgxjid98an0ie7ngxw26adw8bzlknquotr24pyyrjyr8zoqrqa258frcu7y8tvzq2ouxzmcgepxsfcdqh26ty0w6wencdg90m3d6awk2jak2cqgi4kl3476buo6xbcrhxtle5twgttlgjg9nv9humalxksjm8rikydc1em6a4it7hqrhtqlr4s4nmsuwcoyb4gw',
                parameterValue: '0eoxuf6lekiq4vfzirjtso15m0c3wpykwrxcikpv4a5cw4p4akc8zake2sg7y96as0v8p3865s6bs2gfxywivsyt6lmkfq6v6nz04gr4ugo115vppaybfs579ankt62mvwyumf3tl4bqxuduzqxbx9ty9zp5rl5a4xkwt5pswu8s9xczugy373xf1ehldh8n8yvfpd3spy1i2a78jcpvnvrzl76005rv222odi7xb1i1wicsjv0n75tqrofi0qemsgo3y3ya4qm90uo79b10a5m7eon8dsq7a1w3cahhne9jzcw9474xy13iwnw3by945swsqor6041y5m0ivubdle8340nssg4xgamzrupb0s1ykmmowfsmvn4pm61zh51li1s50eg3mvaamxn0ivbglhquduypczap7og8vmjdbh6ok8w3iv7hxznrk5jyp074n37tn8b954oe0pyi20qrkwqmuxy8sjj0ohpmi003v550t6gflfrqpkvmj1i4wiba5w3o74nl1jv474o9tllvj0jp35yahivvad3fhm038s3qcglhcche7dp6khv9v5tmo2g7xxz8l0mz224csbrx0qldvwn8b0h99a6tkkz99phyg0747qi8o5c79940sytqs4xhpzr5vsuhy6gw1eqb8mssf4x8z6iw2qyfonmy6wprojm2x1q1eoj4iw5fcin7thpthe4ww63jz6c2vjiqqr0q8168ogzrz1vt97v2g0t9yrlcxnc0py6gedsyn6exmco8zbmicjyw1a3pfj5zktec0qfamj3d1le3zxzhd4soznkj4ol9oksn7iwm5w017hw1py86rcvfjtldxa2yrkztt5ig87i0s092150x41op75n9vmnze3qqviqe21fg1gjdw02ryrsvadi1z7vdrpvvoib3uimyliz74iwhwtb1c629vi99nm5ar51q1gv0vraql4mg36bhc84e4o91m1arkxiaztic2gsxw2l8bgpdj2im8bd1npj7e62z8htl9vu1koogbikc069btladogk021bljacbm2to6u1xprqqzbk8smgvoesun4l45e572t208n6970872viocdjfzu6tnfmf9oabtdeh0br3eleyk3zj6ukvwkolfg4qhe542ucrh4wjinx2ejif210ucklr9kzsd2vyyeljurn56ozpjl1q8xttdqsufp5ifrbhqdklilfazktu0uq6xqqlxtqbh23dyokqcur6nb6syz9f9mk3tn3f3kejyuyda30zofzgjsksirc9t4znlmeduypxnx9aq4s09ieeth3lbo9di29t6c6bakkd0x2w3tyoidwx26fgyc82fs2iei23l59hw1k6e0hwrgzc29j8ijqxeb3mkvdg733ojkw7xybrhnyufwlnq6pd52mktkht0pymfbjd0gcpettc4dpgwyli627u5umpf8aq9as58qnjj1ir222h2fp9x3ienrt4yx7zwu10nybitqytfeei31ajcx4jhh7ybmmjikwq9z8bdoziii43yvznqmnegnvlt2759se5n7n1tupsn0lgb0ugg86z38u4qyhnbidfuvffz5eakef37no2qx27m1sacenx1v311v1zl2pb5v6kpe6z1gpw1ezk7e38hmbwfpegrdfkgjconhvmzgio9h1vaweikv2cg7mn3wm2vnfvodswp8xxln8wo1inv5le30eiocjibn8e4x8ahgr8t8hdkm9yal7xnbnovgpuqizk0fkwxvwnfkwgvop1cxkq9z5htk2ca2dd8fu0zc3uzyv0wde98w4aurxuyu908rvvtfc5c674ckmfbib0ziayrgff61mxlwxv4sp2wo5etq3k3yqjxou2d5fxwez9817ws1bhwjkhpdbet925ty48xxh9l069ty0qyvkr3sq1soqr1asa0k0di4foqbj0s96pmiottyfaucc4hrch5hkmqo4sn2lhng6xbk3993zq8ht0tktg6rz4l8q1l389ax85ij5awb8d0l3c152uu60wfd4z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1629a5d7-025b-4ca6-9b64-6948f5631a46',
                tenantId: 'z3qyto0ppbwd08r1ez58v6neqqvb76ndgi2ri',
                tenantCode: 'l2zxq9sjggbu6wvwevuh2vsajpvz68yr5jdlddzluh9x2r16c0',
                systemId: '0a15d61c-0078-499d-9353-83f86348fe94',
                systemName: 'bwlap4r30chp9b6wdjhg',
                channelHash: 'scft9ulli6mdiylgvqgmc5euz1v0qdl3p6sw7bd0',
                channelParty: '35ynb9w2u2rhd9s3ufoijxxl7ll4pqqy391atwchlpr2vdnwkqwd42ebjodes0nkccutjmct73obx3dxbu6lw8mrotswpu242f2t73dqou8t98qqiu7puzp5oxnaafu2sohoyuo9p886z4yd9tsnawpurkhicrb4',
                channelComponent: '4etq8b6dv7r7dqndlowli5lt5b2h6f179fgr4omzsnc5tcmuf3dn59yeuhg34pzwrzxknsp1u2ax5pqkfvsykhgg22gs01li6lgecz1bmc82h2x5j923uv2pb6p3d0edh27w975dtm7v3ysy9nzfo49642g9tem6',
                channelName: 'ty5ugx2c7zrgfz9roxbcp6rrkv39r2t28vfmzylr90htocwjb6ylqfaucacdiypso1wikzaepzy7ck9ammif7rgubmj0bht9yh5ntj6fvkz18j2kcsf6jdj2u85wytlis6knaajtfcyqk1l7os1ja6h621xvtp84',
                flowHash: 'swbfi1t3gwcs15y5w77027uk4fuqoqoofe0hwqes',
                flowParty: 'p4oc3xqic4yi1er3opw7t25d3drjo6sdxocg5gd0i7bhq5y2tkgdt5wx8zjfuca36daw9sm1h00hmx37ueo6zi7jxr4x6qfd3ju43wqpd4o1wbj3a10j4ng6opz8ay0jm2mxj3ehpj75kb2s4xrjr2rj6rdk51wm',
                flowReceiverParty: 'wlyn0ulc8emzgt54oh0qeyetflgxmnkkd0x12yhjtj9lixfwl3zdcp87rkymaowcbg9xhp9gm8e0112z9f2kugua1jhss0jfzja13rh3i0jmwqil4as6ce4fvxwyqpre92dkrl49yy0hczrj5ssi40n8e7qcrw51',
                flowComponent: '6sxifost0aykznk8n9lvi31ks4mic5fwh3yjit1u12yr58uamhp7n9m92rqlgueyurthfhofzibjt5riv5266si9hi90rgn3lrodzvvyrnsc52572qz2dlh51e3mrffqo1aa6l5bi1veyy74j3mgwrjkcbih9ftt',
                flowReceiverComponent: '2s8n37822fqkahx81p9dauhi5wvqtkrkd9dipp3k7n6y4r4by3xvhy443xmddxk2u0e19x1bh6l5l39yb1lr7o596vffk5xayhg8296f2mos9zp7rpd26mf4fvzwffcqhikjllfpqd3f5aorl63nvol4n9ix62sq',
                flowInterfaceName: 'het0t4uaz8rxxqrhjtsrvdkrid98b111q2x8wos4en7xvd7juq9bc0n05zbjyhrm6fxef9lww12jygf7bkf3xhhu2eaamupl858x6h9uqfuqtuxlk0of1pbc8k0ee8ul6k0iyqmsq6egjw1651he1b74ns4o8wdr',
                flowInterfaceNamespace: 'u5t264t1e7w3wh9r2e8q4847gf0w1pv57g3s2k00meicgd08l42jqwndblvfphkik4aeifm8u687m7hfm6tw51fdfu4q11tm6aqhskaa309590ig1qx90xwr2w6nrv6qvcx8tgmn1ulkpul5yhrexn7o5ye9fvdb',
                version: 'hxyunovge1kaj4xmchzx',
                parameterGroup: 'f3l9hdyu9inr3t7l9mcl7ijbh7b45un0vspymtrvw3ioc5v19mbhr4fkgbrcop1d61k9rnwb8gyxpls8mzjltolb1ugewqjpid7o4fj9b9re71c6xoq8wyy4dbhk6qbo0ctf6km5ngmiu5u9uqqmddpengmgl2a3hh9ab3szvj4iw20kc1dfd5bexa59rxl7szaiuep93tcg048nivqvwlz0nen7acf2i42pmzijvy2vx2t904barg6n5vyi9ml',
                name: 'cdgz2qjlp5n525oe1mrteudmojxu1tayq54bwrp9pm7z9awqvpc8g8dta123r4ied4lobw4oo4g29gd11c0fg7cbyd4ubl6hswxlrx0nexmks327jun4iacji583kvna3lonri8ifmzr6b35pdb3xd48gk90rok0962z6fs9hm3b24ghcubg5fjwhc54xjg2cxpz03tnrchpksb43nycigxcfsfyciuc4dm3gythmw42r5966eqv3w1lin19lk7xxmx2me2ls58bkz6bflf0a9vdw68gsifnb1iswld9wq7zhzro9znuynhvo87vrrem',
                parameterName: 'tujmz7hagroa43vqyh5t93a4x9xblcwl1y0mhwzragpchbm3bge4n98gcrx12jazgz7frldz015ybtligkpe6mwx71lhvrczn219d83bpmbzvm4idms0cr0pkie1ub3j5wiq1bpmnqt3v9vrkgtspzyutbk2t6br40cp8sqwr7k19l8sqhulkqwebakcik9r09x02x5znt1r7l5omczwf721lzx3io2e6h6s4126l84bkqknju3h8pc12rvbu8dsvff1v7y6b6tmo0sfa2yajwkag4n9prqz5omugl2m0saq8lrj84kjqo0maiditwln',
                parameterValue: 'punamucuxz6d74qcmx6fqa3wzemu4vnvyyv4s9uf2ubg2v2p20qsty49vt527scatkeil75kkarclw1i0pf8p5s5bavr0rlhj1inozh18wph8evshu0eo7lxxz85wfwaeemp2r08a3og8s6dlcg698xisvkd7u75hcvcbslxrtscogyeq16ht3ah0iojh5ztmwlxh33xd451x4oar5cbfuepk97ovmdvigi441lysfvapkj2ueyvllevmlak9kgurpfdoai0ew2jnn9u6l44y4kzx12xv6mu3mxi4im3i0sanlfevuhrpmtzx7fj4yc8nw0px8eg15jok7ludz9tsr620dfdjo1oa6hh54cn42nbuvgekry1vr2y5rx4yb9unzq8lhd3lhd9nd78il6dxv2nlz4mhoca0oymaj1dy2mrh7srn35kc5ry5awc9leh3r1pb2gc42il7h0mq8q4fk1xtisgl8k6mni39ykcvo12gsx8qathfka5wex0e8atipno1f32gjiwzmkhk1jxj4jwahmt1g0frybb2c00bshfdj5e4dia2ck8w5k417ojxsonvv391x9323ppj89n3bqkcw0qkxz9sucx4w46je5ep5qmzp1061b45bhyfftxcx8yfxlfw9tgjjixcyhtzi0cbvg2z609435v1hpezuv5scz5qx55twzdvb2njjnegey7jg842ht4gghfw3ku2qbqnggk9dn3nkbb71ztp746r9zfrpv12vm3913xt6iujxluvhjnuztvtik43yraze6nyab6k0h2vg0jgb1xqanmnj7c7hi86dd3gup6sulwle27fsgxe3py3x6zoesi6vrwur7bth3p7ew7lxmxgi958moi1xrp8w6y6rs677rf7389ni6m57qx14xfb8a04nyxmrbjcw4i5nyqqzsflcluvyaa6v2xxditqvdauv9r6jujp41nkkt7mvqmx2ap19sd8ymhnpqi4ofpnzx5dzjz59f2oq27t1id71jeb7wk8sygel11pxy6vu71um6ludu0k2puonb1eaoiqa3rikvfwnvly3ztqbszujw0qo8uudpkekdgyrw7jkesbg64eci0etnxmbb2z3ote19eknxyat3rprfri83x20l9ho0elpybwkzi9v7lfbrziz430x8v1jzwm6qdn4eizgouf191rhlpdsvicl6f9qlgnyz9gr2xenyvzn70kdfgngi7nrict5py0t9zgreq4cpcw0pb3497h9q9fq4gomw5cywwfm86l10rizzvrmqp5au6r39pi2kh228g1r5g3o4xo6iaxixd9f8tj3ov05nikcxrm3d5n2vpvnuxdyuye9nxhs15rx642t2uinsarebjf3nnv5a707bc3ov1ktbyr33e3hu0uw42xo0hq9o8klfqffn4wfmgxcajtr6jhm543b6xv88du3xj60jo7nct2zj8jipdomxn08r1p6o93urnn8lrq8dvqujs5rmj7hph35zdwb83tbns0icbqd6wrldtxy2u7vcwr55i45765fpuhcvjffveaqg0654gc2rfwf47loica3ghziqeywvuoiiiekpai74e75rtrk82ou2qj513ru1kobkt44bl80tle3is5puxl7siri28qgu6xylg2m29yqrx0a2btv5iulth1bo6e4gerkbg3uyx8581m6pvottk0h5uz5ypchp5dbgbi008if2thozfy7l3hb9pin1tin75j8emzzef79icw3ts8dvhg4z2bxax6wpxaennhodr62nziraihef5vtcam8h9vuow67rb3qgpo88dxyuxm0u31vb38ko73dsi18aqj9uskk7gbvjtap539wk7gz5taukcolmv6xiz6b1ix82w0suwfsh1xkzqgt35ln1xba42w99tmfcxl9zujaekih62h7s7ak4y8yesk9jat03t4sammg810kbkzdnachmiyoip0t7vwoiuxec9teqmuvjmp8v356k4al53z24h1ossu7p5mtrk5wbwvfvyjurx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cd7c049f-6c4e-4984-b057-445b82eed651',
                tenantId: '2a0af5b4-92b0-4f70-aaaa-0ad4a1450110',
                tenantCode: 'cm2w1qtdjto59o8m7vsvjri0kgx02uttdbqvbetlg106c621kx',
                systemId: 'fe58p52u67t67u90ehc1kvgoj86kzp55lpbox',
                systemName: 'wa980rssitc44rf7yj2x',
                channelHash: 'blrk15ypw5jxnc1364sbukqz26w902kuysgfmmww',
                channelParty: 'ob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9cklpxujewj71blyjxv7k5fjjipfa13ubks2502p5oiy1v2ovmgbjyzxp07xwnu5er3a6mh166omi91i8v1e9m',
                channelComponent: 'rt43dcu82uvgld9xe6eyy8px9k9f3kpep7aofdc55ddh85f04vha5rlh2s6gho4yiicxt9q4cim55f6b1z8rdr33ekauxsongilwicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2ny',
                channelName: 'of49detpqh7rv6v4p8gzk0cvtp81f0nbv18k1zfjczcoejq6u98hqh065v3r15nky5mmer1iehcrfveqnqtwfoxtkuhomfel4su315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhleb',
                flowHash: 'mn2b02ww0oda6z88wv28ch871a0791r5o36jwthp',
                flowParty: '467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1gq2zqaycus1usjwsv6mae290eu7x2p',
                flowReceiverParty: 'fictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551sy',
                flowComponent: 'jv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrbg20vpg6l4ncpp5bev5a1q4vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nx',
                flowReceiverComponent: 'pu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euappnl75q3crpytzlc5hneplxcklnkvxn8l3w167zndplkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2',
                flowInterfaceName: 'wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwarunmnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7ws41',
                flowInterfaceNamespace: 'otkv1etzrt4el3coy512zert1f3mzy6vlzivx2fgfngpyo4dzf4jiku3pu6lu48cuulzu4zkraplokysfeno7ihwpmxgxt2omiafno32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ci',
                version: 'ffefz7nwokw9ei3hppe2',
                parameterGroup: '2oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7v',
                name: 'qmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41ssc5zar7hmjdaez670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iay',
                parameterName: 'qf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00hp5x7yen662xksfwsq3mw5lotul7yrp3lj59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q476ob3h93jeahg9oank68h',
                parameterValue: 'qnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuovstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczrr2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw2959p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzji5to1daf20ppipjzfiu7it839ypo3axxf0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydivl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo3wunp6waq1loxw32gaa1sbrvuc9qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4986m1sicaid9zld60f73kvqk2uu9fmgocer9nz6tclitycq8w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampaaefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cec51101-1ae6-43ff-bd17-deb44038ebf0',
                tenantId: 'd47855de-2da6-43ff-a8bf-53e22a948627',
                tenantCode: 'i44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx',
                systemId: '34abd649-f09c-400e-93da-620e81b87dd6',
                systemName: 'ywsphj6xjo3aljs7cq7j',
                channelHash: 'xc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iip',
                channelParty: 'd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji74yxtr2xibtc7ivk8btsgdy5ecrq',
                channelComponent: '8aw57s1w6qt2zwet2sw4of0ip4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3kc49zsjjq861vnx1252usgdvg474lcd1j41j49ha2ax8r8njdz5etf0iyl6kej0hsooqoz36q4nk4pg0',
                channelName: '1o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2ry9e5fgncq71hb33evu',
                flowHash: 'patj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt',
                flowParty: '9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgo',
                flowReceiverParty: 'fuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn',
                flowComponent: '5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svcqcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh',
                flowReceiverComponent: '3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p',
                flowInterfaceName: '7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w9',
                flowInterfaceNamespace: '2fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pcg3duez6dhfptby5dh3dcdgeiwn878uij2voog85tps',
                version: 'okctv9ahqlp1dy6qkwmh',
                parameterGroup: 'wnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji',
                name: '2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1',
                parameterName: 'rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3',
                parameterValue: 'x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f9flhv106f7lsmslem4zdxwywalrufmca89xd77x18gre67pusp1j90yuzwo99zq9lstskghevlxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9bw7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefstt9osrkri6z14nfn8jt9frskc67f135ynzirhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clzcng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d693hok99huik4gkg9u7xgev2vmrwgn5xvggh4jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g3e1o8dxq9h5mpbrwesuskklo4nkjmx7hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtfn32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo990dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8eme',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd6867fbe-f940-4d6c-bb34-4f4b34f4113f',
                tenantId: '9b7e09e1-c514-4bea-bb87-f2218515661e',
                tenantCode: 'zdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3',
                systemId: '76ec8605-efff-4988-b3c1-41ac7e9e77e6',
                systemName: 'jzehlow17ovsx1jr4uir',
                channelHash: 'uffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2d',
                channelParty: 'p4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imxy208w5sl8ep09jzokowaq4086vsg4',
                channelComponent: '52kzeu6fk34aoc0akmx1qodcbmw42gedjothovtqbesxubdyy9145g8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y7kojlhu11sj765318jldimbyk9',
                channelName: 'cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxlqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94dc395rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769',
                flowHash: 'odj9gdg3zoirpt9yfbhbl6286f0watkyfxl5gdlyd',
                flowParty: 'vb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585rxk7gz9o1o554egondpoxaz7mwbz',
                flowReceiverParty: 'nwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6',
                flowComponent: 'pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3z3holmw44',
                flowReceiverComponent: '2sc24hso5gr2vhhj7p1wkd4ol87cpit75t3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geoo60nvqs6q',
                flowInterfaceName: 'au8g89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh6r0',
                flowInterfaceNamespace: 'jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8vebjjpjm7d8jqfnysimyosp2yk6mehivi559qs81zs96f1gb8dxa6s1dzvpfwi',
                version: '3ybj8occbxt9fn48v8eh',
                parameterGroup: 'uiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qed',
                name: 'gv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl',
                parameterName: '12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65atvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl08jto0cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoul',
                parameterValue: 'e4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixnsp97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1zv9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujpnsfgpl0lovlen33wjxhg1z8frtibvgh3we4tfemvuyziawz1brqlzoq078q3gixas13i10yshix702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84qnx63b5b4lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvmt6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp04ymltcfyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogxi5zqurmmnu9r01yxaaan09oam769zwvtbs5g97zf07z4sbcjq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq0he0v6soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42qd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7imhk58lf792pixpv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqsxhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '488d0047-de26-4f54-be00-b9aa9cedc39d',
                tenantId: '2572f091-82d2-41ae-9af6-3f5af10edafb',
                tenantCode: 'ynxdftyx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhy',
                systemId: 'b205115d-197f-46ba-beb6-68d2d22f356d',
                systemName: 'ff6gyysc6toqf7wszdh1',
                channelHash: 'pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgcz',
                channelParty: 'r7lhkrjycr1r630hxenq554kf0l38h1guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinf',
                channelComponent: 'age6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlgl59wwosppk5d6i1qcgv6xe5vs7k5ci35y8accj92h01qlnflvmgurpeq6j31elula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i08',
                channelName: '3ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uyamlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2',
                flowHash: 'i3hm72upl885ri43taxrqurf0adkqm19w7saeapp',
                flowParty: 'unysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc',
                flowReceiverParty: '10rj5sflfit8nlle3765mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyz',
                flowComponent: 'uye4bzpxexgwl6vi39xqu2t6k5oqc07vof99igno8o4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3fwnss5qvzth3tmfvr',
                flowReceiverComponent: '7bvoy4etn3cvfecc8cfq47mxb7ror2dgukundm0xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbue',
                flowInterfaceName: 'meag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxx',
                flowInterfaceNamespace: 'u11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6ljt3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpq',
                version: 'itdwbhr3jyzqf6rxrjsx',
                parameterGroup: '6u7c6g15bjkb9njqtz0usmevmwct1de74i6i7jzhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy0ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0w',
                name: 'yof7ne8hvphybcqaiohbvt148i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2l7v7d01aq0xlolhh4292184ze80plu9c3x31t20xb7ij22el2q6tqqyzm5uvvxgkscyjyf7f5qjcc24jw3m3cx8kqor1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngpipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90f',
                parameterName: 'y61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh09t6x803tzcgqq47ukinfeychcui2xojmtfkfy5y9hys3zyxaaxif3eekbkhg7355yf51vv3xasl5fnvedog810wzziorhuoydfjfpugujbp9zbnje61x893c06si0id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7in5singcgwadxz61dvy8x2aq1zk8qo',
                parameterValue: 'l0wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnwnfrjuww7jb3nt78uh49mvboxkr7d0w7uyl67xzdrzle9rucppbv81rm0ftybwa076pwxzjjx8ezvs2jn0hkxm8ipts0p4ucg0sek0pk4vqrsvib5ue3qohlwf6ohpo6u8oujbzvtnk9zvrmfda3mkzs51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ugx9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgww2bmad5cbqfdib8ufzkywh21ukfm1z8ivw5du69izwsya20pumjsl1cgysqac78nejt7scxvj44r6aj2um5kn9z32i4rx0wcfpfsg4e98nse2hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekzwosipsfr64tlylbtz0cussdsgig2ztuy7oa1uhctz9ur4hx1ay2686n0wsedsqp5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsyvtbdpn0w4dc09d4xj41ayhejxh3mbkdyscq428mtttxid4j00xvlijngy0zjnsv1fn96ni0436a0cdqkremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvhf0oh9amsrzwms9rcmj35xlf3gd7dioo9u5ireuigprleyc538ju5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0a4e716fgko8t0o4hl4qmgxjpyvwmokpk8h9fifbnty80h09oyi4783thud5z1bphbnulxac35vywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetcat6gqu5l44y0osovxhdzwdw77ri2xsrja19sehjbzgx1hjoz3ao0o630xnydwunip050yvmygzsnovx7817ljdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9o26w558nwqwuabniwp0hldnakyo3s82qvjkg8wdeybie09flcrahao7zmcyc00ub7b565fleocac8kegtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz6ej807lmuw3a8kggw5yilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbogxliasulb2u7vi5bmmx1zoku019xyxjgebvfrkyo0gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e04e76bb-557d-4c21-8ee7-f0897d51ba59',
                tenantId: '3496d3e7-edc2-468e-8eed-244d7ff2fed8',
                tenantCode: 'u30jlfsp6mw19qfcyqp4l0rntyaggx11aak8pwp0j93vu7dc1v',
                systemId: '138e6432-ec9e-45b0-83c9-a09be4e04a16',
                systemName: 'muuscta1q015gyaae9y2l',
                channelHash: 'zfn3slld3gul90d0jwgopbtu2udssus52le5t5qo',
                channelParty: 'x9w9ow41j0pd3xya7fs412l898d20g2ql0dz9ojxys9wksqe8rdycazs9pt5gsqhvlu5t6fb655h9htinn0b83pjtkv00desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq31qd10mo2l03p7hdv4eyhg459pfq',
                channelComponent: 'oevznkjl5w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrpgsm2hrjr8i316t655kafo63m6qwgs22ksblgtyrlyn06t5j6aucpbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjb',
                channelName: 'pzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0sauutmjrcos6g9us6lzwp8x736wp02zle43kop4h01dhttqbvhu8541u2b5ajn774xwes89d3tiu4813qznum84u1wh1jyr74tazbw',
                flowHash: 'dsyynlwa838gmzzb8uocffv2dl8jx78c3gx3jrgt',
                flowParty: 'dzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91sddexv98d0c2ydu298uqo',
                flowReceiverParty: 'amkcpua4outs6qcfmimwxpg3jrk0xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5tm2kdjtyqwyxw974vf8uqfytam7cznne46leezbclmm1l11xq0i1t5mr6u3qde561vupcmnpfk7a4o6wvpzyn2yenk9',
                flowComponent: 'k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i57wj1yddhfnqhpqutj2ko6n1sfkcdbgpaaw24opb2v2aqu7g9z3',
                flowReceiverComponent: 'hnqiep47rseqkms673di96dpoqccmo71iyimn1anfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo4f9ibsxzcn1u8p1ilp4o5b074wqij3dcfdgnlp5bg1rpq5qdmo',
                flowInterfaceName: 'hmr3681j42h02tav2z7yxznxn85f68r0cyb8kid84ny50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxlxgxg8u1tuajwqv2ju97jiy86tv3ov5270vsbknji96lnddsd6msxuqlle2epvue01kcf',
                flowInterfaceNamespace: '38lb4rvf86pz4hbmuelwcr1xq31oqdof5ka3podobkh9ruxrdsb6y8loojnrr329g1vvxdtpboaqrca6lownd31mnla3ibpmzjnuvwafhbxrqyu3svp0ctojw8mx52uuiluodqgpwsw62ail377by8pxnq456a93',
                version: 'i6avm4nwg1wypr6bao4v',
                parameterGroup: 'wv6x69qukxikx4cm30sfqqxstclr4tvtwetzp5o9oxa9ir1u0jdlvwjwoxp2yzbeyqd7qrzu6ala3pbnp1kou28cjm9qppnxt3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcwsz58o2',
                name: '57jicu7uyjlxqa0ki3jqw957xyx0ucuo84ams14ffuaw1nwrjjta83xvkhprvoexu2tks4dr8r43rcv4yn3pblzg91uvmwdy2hlify2kofdmualykcf9y2drit11wmph5xsbzjfljc9r0t59p56m2rq6anwirl8cdp211d8v96n1fviejj43n35iv7fayk0nc8uvqfbqknxwxbf7fi6qydlcyp2c31d3hou1gvgz46raec5ndjv9yfrx3kp4z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268f',
                parameterName: 'qt2ta2ycgm4s6ne4hiq3lfsl3d236kc4af3qoagqhig9gtaqulkj1652ci9qjxmfrn8uf2sr5w1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u45t0xepppy504rxkfsjx6sqky5l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp4',
                parameterValue: '5b28w4u4bahztl4k89k5q1nuenog143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5zmnarjs4smc4g42qub2dgfsf2v11csjp51h9kz705db1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpkym45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4mqmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xmh29mwfk0vvkxv3g8a87nn49s2gaq77ntcvdrdhwibtfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9pzgkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22gcqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szwsic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llkurja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf48j9om02jg43nv13n0e7aunujjhhvbgcxu6vxqp0mgg1kpoozyy062c0mouf5p3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vkbgap2kalyu8v9dn8k4fpk5j116x1aem4vc9ednpyb5nvh82n8v023kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevtqik0r7qwe535wqa8ez9xapzlldl671mhthbrnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5wxpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el6r6btojojuojbzvk017xnn3c06fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxtov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3ufdeev55odvec10cy6e3zmw9xmbk7wnlpvfzx8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6rvyirol8kqjm59au',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '22e69c6d-abe0-4636-9e4f-c30844b50f0b',
                tenantId: '2d6ff699-7587-4e1a-a59f-350439120290',
                tenantCode: '843874trki9h07e1r9tq23paotftkeupn6r724jmi03ba0tjk9',
                systemId: 'ddf337bc-e43b-4565-8e19-6b10e35c4027',
                systemName: 'r38x2nbiml83ag73lev1',
                channelHash: 'nmkxc5chucorckr5rn5pywv970kkfv1l44bttnin',
                channelParty: 'vm8ddpborfngr0gdi0t2o8xgrauigzvpsnga5a4v3yhxxme39w4dody4udfjet4pqt6jkyf07oa4tk4yvpqs5vs1sia82kjhybb0zwv5eok43rlm30qmpcgnvlaxmx3nlzwviz1ivjfnkl4u1vu51kqg3z1axt6r5',
                channelComponent: 'tiawrp5h4fze4sopur25nwczodx14q52gcq1kq0iir7aktl9i6k10f8e9nh03mu58sdw4o9aq2cyk1gsle2sjln9e4pc8coqppapd808h0srjg7gglnnj5shbig11tynu59hpil4sgit6ed59sz80ch5tcq5a404',
                channelName: 't5wrjjzfs2l6hwngbob5t44mt5qwqsyptqqfuioeteou3gxbba7856xuh687v7o6vbxzenabi7yagrib8rnmupf43ro20ftwio8g1fn16qi93ua72w33rhe9u2qp21140n98k0cb1vdd1fjb482jr1v1ohrlg279',
                flowHash: 'gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl',
                flowParty: '37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j77ihgatibf6quvdcu017cktevcp76pundwbbjdvkpdteyp5ud0qyt3qpe4gumzpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cf',
                flowReceiverParty: 'xxtfjykr8uhi137zw4wq9j3bafe2djvxnmovjj7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87zin4i5v8nfzmr6ozzzihr3seh9jz5791b7b2r32c0oaaioyuv9s4vusek9jhwtdm5epva',
                flowComponent: 'ujk2a3wyrct2nf8ml8nbllbkuulpryo51njohhxaeb3h5w09ub2k30haj13ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht29ooosjjqnlhf7s0yvvzbzc4mqe4fzjiyzb9tuk30xcfznqzem2abxk3x',
                flowReceiverComponent: 'pb780ubdp6pj1psz7s6quv8w9wkmm8tpq20mhgtxy77xrhecd9xf4200rzqw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn1',
                flowInterfaceName: '2g5poxfzq3eo0t69qaq4tya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahupr2ys10e',
                flowInterfaceNamespace: '645z4p8bwwinilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b',
                version: '75grdl4yqkefcje2mtx9',
                parameterGroup: 'gq1wis4n4dyclqupfmug8h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge9cx5f56s6m3cwlap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0j',
                name: 'cqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn',
                parameterName: '82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7ad',
                parameterValue: 'ibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmtb8d7ozrqkog3mt53cpzqc0692sr2z890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6aeyenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw3ui9fqhd2pd3ukxh54gbo2j3918vcv3mvfjoy04p4wv308cjr4zi17j7t1394189alyb7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2omb35nkbn5ugo64ii3kxgo8465zp4cyes3gkc1gzo10lam6svti06l3q3fxw6ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f74khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975crbjhwbt22ftbjz130ls5rt4zey8642rm3sh9c7dj9t540v0gp19vpnslgp7x2uez7a0sdrz163wgshmnsv1hsvs3gow20kjo5igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zrsde91qcs8ufs7nhxw5j8xxu8oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '82d11685-84da-4260-bbde-49d174c84ef9',
                tenantId: '80e62d4c-05f0-4088-90e0-6ae89c523a19',
                tenantCode: '3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8bt',
                systemId: '89598ba3-43b3-44d4-8a82-c81a467dc053',
                systemName: '6mr8fsp69w7eu44xt70k',
                channelHash: 'vn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4k',
                channelParty: 'v1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3s',
                channelComponent: 'zo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng107',
                channelName: '56qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7l',
                flowHash: 'mjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm',
                flowParty: '3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4',
                flowReceiverParty: 'a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrwwlpwud3js4qjzurrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqa',
                flowComponent: 'wwfbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruuvy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4',
                flowReceiverComponent: 'mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfa',
                flowInterfaceName: 'nmwi7k0ndeu8amvt7c9e4jcl7rhcdhkakgy1a8kfp0y1ctujqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb',
                flowInterfaceNamespace: '4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03',
                version: 't5iimik4ppagg7nvc0nc',
                parameterGroup: '28s8wsvrro00zmrcp8j71f3m6mnmz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481niasqip8qat31acixy28yoi65h5wn2wlv121sbmme7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflirczvabmtifkqeypvbayr41nqgcclkzxet459j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r118',
                name: '5zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae0j6vn6oalb14z5uclnwbv8ypzif3r3lp92asml52oub3aytjbyr5errojjrcqkw55f63qjgrdbq8zdxzk8g887wm5ftt63k0rqed9lq9rxai69aeng08ja03xep943kozhtw3j5fifjl63t1d5k0oefw63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvpv6wjh',
                parameterName: '0n4x6d6ifgmsdlbcb31v5znnyfuffid0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9gwtge09eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr18l57m',
                parameterValue: 'qsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1huwwvodu951mm2kewp07yxih8mz34vagmrh78e3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi87gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a50yvwjivgbvgrd64yv08422k14x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2a97dphpy859hqhifg009k6o73fcba773guqsyshpzswlfrcih6vjay3ie1h2qel2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnle5075opvy25bpqsyltfpip06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn30wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgthx458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3naeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22q6xrs26zg4gw5hwpxbqmhljqb9zfg22vpj08kuix9pmjf3dqad32qvvfnow4kl5a0ulupgfnwvbil9e030zoa4wj1v3wu36lg7pq98wa0s1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a5053348-d603-44c7-8a73-a8ac637c718a',
                tenantId: 'b71d0509-bddc-4acb-864a-1c99b273d954',
                tenantCode: 's59creahw1b50kcflko7pwbytlsnelwnzj06zrv3j0cj0ce1nk',
                systemId: 'ae35af0f-19f0-4807-a9ce-67cf60c29fea',
                systemName: 'wb7uiaki3zgng53lqgwv',
                channelHash: 'stlerdu9g9qn7765k1uvmr0hnbsdi8vv0xj7pg9o',
                channelParty: 'ulnxiydo2scx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5p',
                channelComponent: 'jwmwv5qyf31f15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacpscu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9',
                channelName: 'ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbe',
                flowHash: 'o4s1ss65wt5jnosdhmhhjj461civw6e64e1yrgmy',
                flowParty: 'tw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhj',
                flowReceiverParty: 'sce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkqvuoiliigvs0qr9bpcc9iow8rg311x8d',
                flowComponent: '8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b41htgq2ehu',
                flowReceiverComponent: 'uihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqifnveah8h4j5i1gscdkwx3zr7k0hmmb72circepyhqusv9nfdkehzbmt8zb35zatn0z92f',
                flowInterfaceName: 'wr8jx8ym6xj5zir4rvpuw3amtxy26ibzlwey8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9ku',
                flowInterfaceNamespace: 'npkp5xkr91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x',
                version: '8l963oisczbmxh537hpb',
                parameterGroup: 'tkphqaheqyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1ldp67emmt1uwhbu6yt6a3gvx45o',
                name: 'm679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70j8eni7pd',
                parameterName: 'i2w7s4oujfvkww6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5ewkgiwnsqk2ig1xz0x8seoo492ifflz58din02hb4imtasoytq4lte3kuwbjtgrbof5ml72665eax9hmsvp7cgk71ys82tm1bepf5l9av750fv1gxt734y2h7u5scxunf5wn4r1haya54toxcmrn5djjom0agfykqne11eyt',
                parameterValue: 'eb4jcft5xvp30ljjziw5xkpu8y75jtmk2itp0zmre6t9ypk6805pm9x6xry1egge8xdv9yt7l2toovscqpj2kdes16q75pn54zzy7u9wivuhy780ade99x9g31da5i71l3930vnkv9npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q4igxh1uut1rwoqe4i08dd6k68bwqqhfz74yrnm3djaplu2nrnq3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qqy9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gfjd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6yp967elw98d0a210qo9cict0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnqk4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4zdk5dqcn36ins6myrkoyf092uegf8zc11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e2uf38m55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbsracf41g45tj0jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53zfou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoezi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd7db0812-ad26-4403-8ec6-52df9da5448a',
                tenantId: 'd9543085-ade0-4c0f-9dd9-f86dfdf51652',
                tenantCode: 'mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd8',
                systemId: '1e3e942f-3ea6-4daa-bb93-59e7a3b4b1e4',
                systemName: '41z7s6qapf77j44l8g1i',
                channelHash: 'irj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3j',
                channelParty: 'o96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsu',
                channelComponent: 'lv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqktvw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx1msk6htbrrhy0',
                channelName: 'emrcw81ds9xcofyt7kjlicqxtpmykrf5ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdtchq7ekboxwqmac32xleruy91ufgk6yblkn74z5nqzzwvsw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9t',
                flowHash: 'ifd1kw2vqx5lhhmk9torsno58fq3g59fbyjivpmk',
                flowParty: '1rovjowcbaj137hsz0vhjo9rq1bbpjdkdy64gb0rqpkqfnutz8ngfmwnz547oildmmfchwy6ougd5j5wi4qlnhhj8y1nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cymdt38',
                flowReceiverParty: 'qzy8rplxyead671q4zm1aygurgpaop9t93odcscdhenzbh9t4qczmbrq0goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7o',
                flowComponent: 'i1he8tco7lif2vtvbzcrmdilkgtfasng41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01q',
                flowReceiverComponent: 'ysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0oci',
                flowInterfaceName: 'pepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57oviqbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj',
                flowInterfaceNamespace: '356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8bt',
                version: 'ez2cfnc7u9g502dvoszm',
                parameterGroup: '0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na',
                name: '1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3',
                parameterName: 'lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba',
                parameterValue: '3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducrp4fc5eh48tp8h2oduwg9y3nmlcsv0biwimt89kzmw82aodgyvpxnqj9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs76d9pyxh4zsrlkggbk2rf4g9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0aziov9glhigd06hggw590cio2idr1pnwrvot3iaqhkeo79ctz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3vlf8ircmscdtxqpdxq7kqjm8oqjqxisv1xpm5kwp394i3zznhyd0fh9x6wkdlon9ofjeh58s6c6cnwefzsi3fixxpme0n0ljsd5a6fdj6j1lwmw40njsqu3xdke6koko5w736xfl9x8bn9h0qyxgk24a9xpo2ioicdkm3dfwxabyvpxfunelirorp9p72lf1abvyh7tmynhqic5a9v011ss42r50y4ucxomw1id0oo0sz0woql6zurus9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2aumeet6xz0xmqvko098v0o5th7asvxrctuqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3gz3cj7vd1mg8g166izuo5rxraxzos5i285tekq0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0lg2y8bz1skyo2ym04y0fpdp9r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '042b2a01-b086-450e-ba39-f31536d459e6',
                tenantId: '551db759-5bb5-4bcb-a0d5-814d658885f1',
                tenantCode: 'zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9',
                systemId: '5befe868-f3dd-48f4-ab8a-17d890aa373d',
                systemName: '4hvfxno19lpvyknunbh6',
                channelHash: 'ud5fb66l8eupccpmegz8mpngay4b359mf2zmzs8m',
                channelParty: 'kquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl65rzgquz',
                channelComponent: 'dmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1',
                channelName: 'fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8ax',
                flowHash: 'zc3wx9kof3kxgqf1rxlfwu7t7ah2uoemx0izrrrx',
                flowParty: '1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1spcckkphdegk212ppoi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98',
                flowReceiverParty: 'it4llfh5laa49zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrt',
                flowComponent: 'n7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5aupgoc26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgykfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1',
                flowReceiverComponent: 'qqqmnxiyos9ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4lh5cfag0systtacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07',
                flowInterfaceName: 'k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdganoqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36',
                flowInterfaceNamespace: 'lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0',
                version: 'osrs9ti8v6c9q1ib3nqj',
                parameterGroup: '842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix49xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2emje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoy',
                name: 'rj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7dyz5bsfd7y',
                parameterName: '6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1q',
                parameterValue: 'ti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8pgi022omsjmbqtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0zkfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsqom1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9mj4jwhnfeofy962fyrprenuafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxqkdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvibh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzzx4ks5ugey9wl4uyzdkb2o1najjzrbi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh50g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp0d2xgydiipis2d2n987kfdgikkt5rfvz9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vryv4og30jagabajt6u97njcgkq5qvdlthytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71grlvqb5rttymnrasuq25e0meznfavaihkcxlv0pynnyarz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4d0xwykx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxgn1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '656d0db2-d658-4ef6-8056-71a594fdd0ed',
                tenantId: '01e1b9c1-33b0-48a9-bd54-bd3f0c6ceb60',
                tenantCode: 'd9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8d',
                systemId: 'e089c94b-c267-46e5-b9c2-80f401b859ca',
                systemName: 'rqf8q5yli3hu9ml53r8r',
                channelHash: 'nqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8i',
                channelParty: 'kz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010',
                channelComponent: 'zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7',
                channelName: 'evmkjun1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg',
                flowHash: '9kb8azkvtk9nc4euc4h85z0oh7ghucz557sa1f6f',
                flowParty: '1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gvmsv5xfe2j6dx3u2addqa588lvdfqm83w1h',
                flowReceiverParty: 'fvjjku2gbndx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1psv3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv7uaa91cjx6nkgwaw67mc4lyn1qrun78cbn',
                flowComponent: 'lfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10om1qzk5utkdiu49oh4knqlrplladc0e4299cncbg9fvsw3h4h7wpicfkb3e5hxh4sg0chstq1e2czd9lel69',
                flowReceiverComponent: 'bal4n7bbrnwhyf80vbnsbut0v2jh80mldcqm9wf1norbr0ykftoyqtg2zhqls5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr940j6twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm5',
                flowInterfaceName: '69f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0v89h7ad3wahspb1z25qih22cwof7fz9tnwyvkllzlgf4lrldutwlx1ptbp',
                flowInterfaceNamespace: 'mqy9onsoqudg9vupe5r71nxhqtw8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qrb6meh5dsndukbcssmm6fcoj2leh35thdhxsqz3qzokfzse1q169qieph0mpxu4',
                version: 'hifktqrcx4bxjrs1w4op',
                parameterGroup: 'gu3euehdfkfdjonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevozp3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef',
                name: '8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upma2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0xsycvg5lp5lzhh',
                parameterName: 'qyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3',
                parameterValue: 'crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb26081ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihpz9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1reww6oopov5iaz086jjc7kvqcz1qnhsh2dtoows89soaupngli0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxopofgt8gmfz7bjegcc4i1oftsqvpioyfme4cxnih5ci2jwholg7u1w4gqh42srn2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3aq1aw4tg3pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6t8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux8wydl3j3a5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowReceiverComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ab59b410-6e31-4cd8-a4ec-aee7c3db0d96',
                tenantId: 'e96b85ab-724c-426a-929d-9879086ffeda',
                tenantCode: 'xysbdb4eeisyimlvarkw6h8uothzjqq22x211jd29fli4ty7b0',
                systemId: '8a7b448c-0461-49a5-9c22-ba0ac8cad396',
                systemName: 'sxrn0igxsb10m6j5d68z',
                channelHash: '03pflrloui95l3ap023b0ngp3oykjqa1dswtuhm0',
                channelParty: '8t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiqhszl6r4hbsoj9in5',
                channelComponent: 'bg7amkgjdyq33tak0lksnkmah10pbpi1stpfommslx4mk6pzpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs15pzql9mtf6yxnzxj5mju97s7nmuvvej0ym106dvek5np9y6l696d7kektssuajhkm',
                channelName: 'urr8kgz41hm12i1hzo7jjjmgcsdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh3uxg3cn50oty84x',
                flowHash: 'eco7c27mbcxvmd90vv6jg9mlmqamk235allm7k0h',
                flowParty: 'e8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu377ms2vzzrf5ou7u',
                flowReceiverParty: 'jplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49pm6oyqlnh56rvq6',
                flowComponent: 'cf02i8rswr1036c8eu5phlsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xthmz1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg57fcrjp98jtr92ugn35nkh3k085byyept77t5tnf',
                flowReceiverComponent: '6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71zbkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522d780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxwbjf44kbe9eim6yeq',
                flowInterfaceName: 'o79xg7mnme155u57yglzrtai4bjweb6ni4nh2fn6c5fm31h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ewwfrlk8nibkc6sgg6k54itpxeb7430awk4e9x5077n7e7lpc4eh9rvk0d0js59onkxi',
                flowInterfaceNamespace: 'zzmpn3j092b5q32ue6kr9fiy8o6idyheq0d3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoifylyjp13xmog085w4i',
                version: '4ktodvohcoxhn9sjjdcp',
                parameterGroup: 'gljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5',
                name: 'r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqns',
                parameterName: 'h0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvqb6ejeljf7uiic77qmhm',
                parameterValue: 'qiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5fjqm6njtihn5dwe55xugvgqsmilrfx6ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr50j4oga4dzw4goj5b3f3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95f3euf3e9ezi8xqm64m8jz18v02o9lg9bhc454z66sfc6emi9hwpu8rd6ojpff43jqyhcdcwdut460xf1wwl1w8aupy66vk56qgep35gufn73mknb30nq8oy234wrus12og2pavu9vmlcdhkc4ol0ljzlpetqo7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqeahakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5lk3s8m3g86s9tgs6i8sstucn11v452jnlpdkpihgfhu12a08ypi4omvseuknpzqg6vntcoi11iprl93ktkc14jcnfynhgsw5gabaw0pqpf18qmwvbap9qmx8j2jsmdhkba84bn327b16ttf9mvgoh9okzoh2zua63yxwpcbrk7ulovyngzywc3ql0m58ud1u7en4ddl5wbr2umrgj7n43vs4gacpdnv5dh5lhnlbsjroyv97shwcxaapkeqs23me7zs81o6y9ntg18lstllc4a7e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5chvs2kzrod67bd3q1jv6cunai3rjd0aqtektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9lpm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9ex1jkkh8n99emv1h4q1ofzhf3ysm52i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd1b8b6b1-4389-444b-ab6c-58c3571c6d63',
                tenantId: '846cb1b0-abe9-4bb6-8509-5275559448ef',
                tenantCode: 'ilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d',
                systemId: '28ad5e44-1cef-4e3b-bbd2-a4e6993f8ae7',
                systemName: '1ga70r7gcpoi6n869091',
                channelHash: 'fzo6imyib0uray8r5qxvuu3qptgguohqobvg2twd',
                channelParty: 'm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw6erkk9w0uvhki0z7ibrejeyo7xormr5kr5mnx3q51f8sagi0civs0owsnxp8uzv18xgg4b95i7lsbtykifxua6c9x8tz8dqg76b96wd6',
                channelComponent: 'l569kb77u9ytzaiy19oy8jeetuu6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8u4afcmzxl4dnhlpk7e',
                channelName: 'vhnnhq7xy7ad9kiu22bzvttj97eia1lip3aqkoulqz5c2toysx1x7h8ukmtkk8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0y',
                flowHash: 's7tsyvou7swkwwdvhjk1ss20cqt779wxtddwf2x4',
                flowParty: 'y6r139inbeqamvdy9037wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi8wv9j4dmrx4azjd7tcrith9qb98nrzfd8z8hdwxsck3ejs1wea87dgjimtiqz380px3wikl7xkmiaprjzz6kyo2shlrpw2c0vne1v3',
                flowReceiverParty: 'vemgsfuzu4fkq61oedic336sawfl854tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf',
                flowComponent: '29por3us4wg7xu90gbt8ab1puxctygv277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcom',
                flowReceiverComponent: 'h9a9gku5b2wj84t3rxyloj9q16rp9p3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df',
                flowInterfaceName: '9m4n0vemfi74ujak6j2o7uicgz99g2i3t31t74kgvenfou0elqe96p03mxy3ih85cussarnt1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5w',
                flowInterfaceNamespace: 'vq5npgfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwvp78qsnnrl8ims0lp2yjr5mo8f5v9gxup6goo5l7djs3x7peeih5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozko4ndz',
                version: 'yfcpnlh0l3ym5pye64ym',
                parameterGroup: 'n2ze2tinyhn0hh4vbq02gw2t1drofanfty8ap4yoh7fvdlwc5z4rz1a3h5iho8nam2qeb65ykdg84pn4gudfdgrzejb1dpztnny1qa8g62xm9mhqx246jjo5c0s9630da32l1m6nnurg775uypcdu8ggkdd1uf20fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p572om5cpvycx5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi61fnvn',
                name: '3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvvk5lmxr0dxjyhh657epd71g5f36uakc7ye1ob5ol9g8mv704bpvgrdq1q0bbr3u6ovgscdhhw98sckdcpnfkcahr9b2eeaul2z313ubdq8bk2d4r6vcizgf72bdy1lt6skqdydx6uw231wobhfxfwly2d7m65i7mlg70i78nvkzqgrfnytq4ba9yo4962ohhuvaz5yickwdtzelpzvg0rres7e6s025jvsco8qn7q7ikljyng6zw4fnujo1dm75zecjxxiq0hobp0u45t5k1z',
                parameterName: 'akwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36pq36fpdl2l4hiu2pot65fjqq5drx5w74w7ckoqbmnalo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu482af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduya788jgjw19iptv7qaluam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gexrdtiq',
                parameterValue: 'mh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef840o48lvi3espo8n2u2kekdrc8pjloq8xy7243hbw9ukez6v2by5ucs9y15bnxgupmhgzzwnodhgicculynzrfpq1cwfpbef4usohwl5oej05a9msb7y7dz1vtnulr48og0kiz8ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us8gl3od0dp5zu0v7goh121midgxwpz66jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2rho8sfwy9p7ws51c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz9lhkyvhukfp893aiyiac45hz3f96mdqn6kzhw39huk6nio6j7o0pj4smuw8xl25m11trx8vtu8m3d1c1i170t10qkyaqbskpn8wo068qfsp7yfk0nnn2n2n3rqqntwgdvm2lgghhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbhhx18vwz40u430g54v4l0s60qfkbydz7r3pzbapguxovs2gb8l0jrl98jl90vx9nmmvbnfvvkzlpxkpyw7czkhth7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kzckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzszawg8zh0xgfdx19j5vuthgcchqbhxs8tx9iwyrvg1rpmlx9rkxyf67sjt6hx1awirnbvrhzp51glyeqc4s6f1o6bw3729f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjttp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292h8qjz5qojeb17d8el21h90fcdb1y9wcqefdrgqv0mc06jzfm9hp8gz9wuev8pwba1xape7kw4no1dksbc17mo8kypf84cqgbkm1tno1nbmzeawmlx2veiqdmc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5fqhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ekgvld2zlwxv5b5g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd71ec164-5098-4eb6-89d9-301e1fbc80cf',
                tenantId: '52eec417-b316-4e5c-8fed-19440c0869c9',
                tenantCode: '9utg1cw0oycrpfeht6zrnz67gf0t7npipo6br0if87rysu0b7t',
                systemId: '88e8d764-47c6-41af-b0ec-929efaed352c',
                systemName: 'e6l3oqoq52gbywcx9bq2',
                channelHash: 'um93y1v2bdhpar7ayr2p3omyvfsr1ocy7k3savu0',
                channelParty: 'ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9',
                channelComponent: 'dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclvk8irzk784adtds10tomt',
                channelName: 'gs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0',
                flowHash: 'tskw8fooup689acg46cqh4zr0upfdcqphjcysbp6',
                flowParty: 'f2xmy3r20as38zuacoig6vkpqn7k1v8wjsbr3qbpkw4bezmaaj8aehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789xmig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3unme036ush',
                flowReceiverParty: 'tmqkycl5ic6pv66c2duzm1b0f9okijyua2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikzn',
                flowComponent: 'ixhgxqasw6yvdpiz7g7sy954tv8uqb1pztqc7c6untycqh3a4mgwpwnpigwzhdgjysod0ol2xn1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4ytkcz16sa3veb90cti62uh5s9toupz24vsoy2lz5j40',
                flowReceiverComponent: 'qkszccy4mkcoozfsw4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2x470nh1ol89r1oxngw362kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8l3jgy1f9wr07f2urx7q2rt5pxy97gn9',
                flowInterfaceName: 'rspbk8pwcgcigppt57jwlzep6xezvr2nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl2r8c3fyt4wh28tcvmjepil2ix9j13ypekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1sl2jc3zl8p4qzj1e',
                flowInterfaceNamespace: 'isuwezy6u3vlitc57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvuonkq0jpllz7q12i37y8vwtponl4kcxpihkmgwhqndh2ybtaxm7b5nf25izknp02t64dwjhdbd7ijwcfvkp87w5k10d21mkia',
                version: '99ht73w728g6mi8cp94f',
                parameterGroup: '0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qorbvmx888pwuyc0fevecenvfcla7mhlvbxf886ru10ya7arh11c4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj7k60l3yk1zjwkuwptcvofx05lp80twz8rhrf5xfnq8vuk4swunvvk4iu6ekiiidxa32ew4ywf0pq7',
                name: '67wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m94vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf5bvzqjtg87w2lks27wzzmn3gm4jxdu06q9s77knwzch1f1j4clsttrtsok6ol4i6n3e1ah95bxst7ajkg3cyrbg9k153zix8r8bec1heiaatphio5ryzcdlu',
                parameterName: '46o5ulrik12s3s5xbccb3n9yc7z32kkwggqgzx7m068gtpypjub2hquu5n4tvohvj6hdqte62owjkndjn3lmgu7ghd90ebw5nrwiygbo7xi6lpfef51m15e2wp0llt1mhun9ia28iho5lkulv9t7c71zj28emjqnub54nys2ko17tlk15kuuxy4li7xl0cskh522kl326ouu4wcgi9q9qwjqkn5rtnlwc9gflpjy8ox59blz7ac7qk11iuhmil0o5dmfuy582w597eb7wpdd6l73zn0k2kqi1rt05tzkv6wjszkm5kb0kdzfnm0e7xjw',
                parameterValue: 'nq1euucgmszg9i6urzx7cp1ad0gokmgr969lof6icwei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsumuestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nage7oqr3v0ot1w6tlwft3fq8859dgfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2i546cqfuh4ao8xbze962ejige858h5gdozmcneyefeud1iubh8b6ul0ttbnmsq6cj8127bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqciaof545kzq1rudxgipakfpq0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcdfo3w0rk1csadeltto6bv926gbg346cwdnmdim8re9ujyf29i49lkvvf5v7swjqtcixcg01a5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916usdrdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt27w98e81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipvm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54xdh9ytdfz3kw9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet14c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzsq5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh83m69garpxfakq1lnvrhk2lqzoi4cdl32p2v9n4q8f8bn17e3bvn3ljwse46knr9tto9dngypygsvgdaewfasw4up14hnnzoulnuy45lqv1c7e9kwj151l7307eit5ggfipm8b5delpzietlix0ewfvbn8vmldj6pdfa26t4f4l3z9pjrhf5zsfmpu5ad4hrq737tk85suxty3uhv8ymm2qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yqauygwpchat3bsarah0a7vbj0a958nwix4s1avie134hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuonsno0jtkgcinius5rgn9p2637kcibn3e1m942a8ohl0je81act8x8rp8jgr2nxhbefsrgl5kgjia7n6pzj5un99alz53zfu8y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5d2bb22c-6271-4033-a5e7-81cc30f098ee',
                tenantId: '92ccae31-0028-4374-8c06-9abc5292caff',
                tenantCode: 'fl0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2',
                systemId: 'fc9e3de5-3676-4c43-928d-295fbd3881cc',
                systemName: 'zlr327vczh7iscvtvcxt',
                channelHash: 'j56jppzs08mbelbnexbpxf5j9ysqlm397fw6ngls',
                channelParty: 'ipaf07kyni4d1pndxosflzea24g9r8h3cslk7gmcs9l6rigg18523q2zb5rsv2uem00d6c33r3wmfzt4t89mzxvu5n7e7xxtvn6ryv5gut53boej3hqdd5hcw7chnx6iv1txjhnak91cp29guy1fbphbqyyi8die',
                channelComponent: 'mtusq730uaaeaeesus1zdsk1rz7h3w1me8sml16wk8h92j54xa2d5fd9ipcl6wvjeggcd5wd1bjv3csvc224ny71ajruvcy0fhwsuv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbpib2ow5mmcdlup93l',
                channelName: 'a52c90drvaig6e4c6gbf1dug4np23mmtkp19sffac8rarh9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rk',
                flowHash: 'yakutj0auf4nwrbk3gl1nnu1u14xbbsow8c5gph8',
                flowParty: '6e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxbam6svytzsh3rom7z2sflj4ju7r7ds82uq9honej016i2hfktv6j2r0dupuir',
                flowReceiverParty: '2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2nu4nwae1nlvx0ympmhor35ky8fmm6n1ckq94yksqvm0gj6yjixdyicmxxi7vmbsk7pn500',
                flowComponent: 'n2ianay3d79wtq1rub9lpj75bobytaeyk6pukwsr1mkptfp0ftgqh3hpl8a2v0yzubltxkt4n5y1oqlpj11qlr48h2w7bi2t9ah0l49mkvosifz1lfizlfqksyxcgasq7m064p579k6tk41v99g1tffi20me5874',
                flowReceiverComponent: 'ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6fa7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2f',
                flowInterfaceName: 'gtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4qk2e6tiesuhxkuo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvyjapzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh',
                flowInterfaceNamespace: '0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5bc8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lfvf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287a',
                version: 'frxcciu24mtf7oa70ttjz',
                parameterGroup: 'goq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynljqxfoxrdwjciumqp6grqxqn0auoobcdhkcam6pqtrgh5g5fwu2vm23a8ldi2itjfcohi48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364yot45opspd98lybo3c2gdowqmt79yr7krco3z7cko',
                name: 'j0ooqxu3k98bw7wa03m2uj1pwsddbsjzkhu0xiznzo6lzmqrwvmo79uvtv532z6fzgev26urdornwp2sssrrcc6ulw0b3alampnygzlpy5zhjn0elidmdcajy39wk9hxgcbjppbyfkcfog93yozb231kb33d8yfrwhsgpg6upfv3852aa37u7dyek6zui5ybvkois4nqhjr4aquxq9feg09arm6275h8mhgyoe7i2cg1jt5ow2bpku9naf70oku2cvnqf9at5vrcrf07ky9m59qvst6vghpzyaz2w6bczi2mqn9jjknxg20n2b76z7kx',
                parameterName: 's2ccse74kz3l8fjvouq5u6iqrx5k7dhowpaf7uixbabeke59v3myk686g9ryyjcaqx05im3axudpqm1dhp5s11dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147ansav4midj5lw0m5htjvq7ab94zk0aw3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam1j673o857zwba',
                parameterValue: 'gbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pnfs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5udyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76v61r996gg713vhxpthyab47x5r9uw5wzef3vm0p59ypezq2ymfuqpicw6kfmv3rf9sw96fg14h8avr3u16e6kq80eexwj8oou2ytzvyqo34zftprdzsmqal4ykasnv06yvxitnugdhslvw6ria5duuj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpneiimnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zkvmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6esoydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3etuwp48wm9l0btty9gopar6w5mez45wdajdv92agcxx3bhmzh3efvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0tygoi20h9pv5x1c2l6nqt1mkkmqbglkmqddg55io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq3njej3df2b5s170tpbyeubf25wdhnr60ye6jr5f1b5axh4ql35sg4w2v00qq4zlfdph2j1w4108zi1sgoo39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02lf9j66cfeip6go9t8c3zormrg13s0xw1uvz9xckij9c6mwmcqww5zes06yuls5vvhii3boy8bmda2krgh8jif15ktidve0h5zhzp7kz7b5kwutnnul6l54spbab3np1ozxmgiggzgw2186wltok6pzy82n96zlrbvmlpwkl825hgcnzg5qwqm3v9wuxv2kl6s5skgq10o6ij39b00grd8hpwnyo2zl0lf11yt4627ir48ut3u2385qonbk5aenkcyjl8rbc7gdgigmgki0gpslda15jubgpg3mcbpxlok6s624skqv6lry6ywblu35n9qcn6ho0r693jt3iam0fuscre77ktypi0wnb615bxxtr661crrw46s4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cleot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox19z0zs019i7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2njkdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58nacln57au2zvs2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '31edb8b1-513c-40f4-8422-d03495d87d3d',
                tenantId: '63f81bc9-ca78-4d1f-9fd8-66ae751561fb',
                tenantCode: 'bsk3rnbyn7gy7wxa5zxrdbk2b3b5ghjkr4nvu677hc39ab4l9n',
                systemId: 'cafa1938-3b5d-4f6f-aaa5-fa250ea7a218',
                systemName: '2jsdo5j5ocnv4l08wrza',
                channelHash: 'c0fknwuqtnolxols0lwooqj5z33ywjayhpu0ybdq',
                channelParty: 'kloz34cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesahw9wc064rln3h438q104vyui73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orlnh5imk3a33kbqffa297',
                channelComponent: 'v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7it8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys',
                channelName: '8s8i4nfdnjoeehlts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3bp4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz',
                flowHash: '163w4vqrprv5ziwt9r8vj80uo7kf1qqyp49y7zcf',
                flowParty: 'b1esxa7ilsshv0es5gtlnuowvyq4us04icecipto56gqvhdkct96t1kum5j2030dga47uq50yrbb05cv9ceab85zp590euclwsjvftn0afgraqy8di11ixpc9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhm',
                flowReceiverParty: 'i7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn7',
                flowComponent: '3voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc4wihtu374hvht6txjt7mdehuob9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9',
                flowReceiverComponent: 'by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfy',
                flowInterfaceName: 'j6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj',
                flowInterfaceNamespace: '1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zu',
                version: 'or7iqir6326ngmhlw32c',
                parameterGroup: 'dzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfj',
                name: 'unfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pbxu6te2k82jb1ljtygt9hl59tdgabxpv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35flqtxago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad9',
                parameterName: '9l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84zxsgyn5wangxwkaonjimiu037jtahd3peiuparkv6xt8845gw8b8095sco8pdkj8gzmzaswc',
                parameterValue: '1qehmoctg5jmgc431ursfadxyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gskxu1v4wbe75j76x6zd6gxykrc92oes1kl1g4umnw54jt4kgo0g4vlwgzl652u5i89zd1vxcb52keemvtkvsyy1uf3z7yq0d5prvhy804xoyd8jm0zp9mf1sh2xn5foaf3qe37zjk7vsulpyyxn5gjn7mupyn6zqul80niy3em1or36p5x5h3xnrz8x4bixgn7sj63d8jt8fp915haoo1cetip731gls13dr7o383fdzzajcaukol673062smtxbgj0uoj6jzw8oomn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55ku00o15hnx1n4lpbrsz51ihff3m26og220kak9003j7ohdd74rwsi58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85fjfyndjs8r0oalbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxrespudg5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg0wfibebp1zpv7fhooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzeicx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgiid22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujsvv3tkl92778zhx93k5qayrc08shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8xfra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87vfe2njj0urse8mokvqmwet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgpbhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23spvgn6c8c7chcbri9wqnu2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoau',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '64b01e18-db26-4b95-aa1b-d553b33ae7ea',
                tenantId: '14966f8b-a4ae-4a72-b087-7ece62885233',
                tenantCode: 'j2ku59b10ox4vyqzs93bu4wwvc5t6gk0yie78uao97dle0en2u',
                systemId: 'bab40f9a-0030-4f2b-8174-14ecdaaf7f8f',
                systemName: '44x4nlq2y74z4qob73od',
                channelHash: 'td63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6',
                channelParty: 'j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2',
                channelComponent: 'vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re',
                channelName: '0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptyegwxy0s5u59k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ipsj0ohwhzue2exkuz83nc6926ypnl3za5c9ov3f',
                flowHash: '52zfj17mnc2wrqee1nsr8nfb27hyerdn4auplbx8',
                flowParty: 'w4x9c9hzh08br1ui31gugbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1abye5n3lo0nku0kttkymxdmzc3cyzswoibkn3gkb3gnfn8to2sgvopwe625aij733fhotgzlkjmj1hrds88u8b781hw5a8be',
                flowReceiverParty: '788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7my',
                flowComponent: 'mopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fplf7drvyolaqpkmmbkjmi7b64e1njw9',
                flowReceiverComponent: 'wdlj8af85iosple1b96ib5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpmpn8yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf78q5t1g873kd',
                flowInterfaceName: 'uuvbm1d4e6qy7nz3nq3joucwc3qimmrjfwp1zvvxjpxscj1uxwpe2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gyw',
                flowInterfaceNamespace: 'jd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9irv30q24108urlm2',
                version: 'z7wvvj9mzmb42uxtin64',
                parameterGroup: 'lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbsdjyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjupc41kymla0jg3123zr76d6h1g3uytx461u9tbv1by30xn0j1vvi0dboodew8iz',
                name: 'm1i4qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n',
                parameterName: '9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvxz9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7',
                parameterValue: 'qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13ukpjr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bnax7x4k9qqebc7e8at2dvu92hnxx6scklrjojqvojs26gmp1n874mxn831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznny8awcvb0r1o62gz54dfc5neufi2oslbf6xyarg83u4olj0b8ykj1gh3tu5lc2bhupv8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz8ukjm1bvdfm8vm40kgh5oifn1hsz6ytce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc5ph70a5qet5jqiwkwjnefmkv30iz31zxxg8n7qs5noml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5hyrrvm55jcvdx80aadsl88yks2l9bnlzy2cetxpp4t8e455oih1cxu4zyoag2no49hk8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrjdcc5jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9zejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1jrcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smprecwsh9y4s01nqfr9a03xd888uwn5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohviaphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwyz3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cfc88d61-747c-4321-9ad6-7dc5f71f2627',
                tenantId: '78cf8b90-198c-4987-8991-9a160baf9ad7',
                tenantCode: '6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd',
                systemId: '0e6a2ba5-0c01-4be8-bef8-ef9269f4a19e',
                systemName: 'gch3m59xfsouxx2fbth5',
                channelHash: '1thre6u2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh',
                channelParty: '9uevsw8ih6g398zmrdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv9szeso7o5v2usb3wo95698l2d38s7oxc',
                channelComponent: 'ih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8t',
                channelName: 'tewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxodskyu260ad3ksxexawd6qm9qa1g9y2kkst',
                flowHash: 'rpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyl',
                flowParty: 'lmj0ypsen9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8ryk9kdfpm5asnqc6o5xd5yk72jb5xbs4yzuo',
                flowReceiverParty: 'pkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjesg635uu6i0mw0hxp1k52mz9yx25s4oi1b',
                flowComponent: '0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us459b36cg4xycic878nqg8t2dno1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j',
                flowReceiverComponent: '1i7axafbj0b96cbfg7rb0s8uib03b4dptj16w4ykht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f3oqtz15ixmygfr4efn0cug44emvmp13y0azx1yrw5v22ox22ptmav6k8mek521jm0nzhqa',
                flowInterfaceName: 'k9d0dkavdtur8njewycn1fhylw9j266a99uz5con47g2byx50l4qq71mqxkid874boeqple9n8pit6azutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05k7wjxobn4k0gd5pqzpzzwoshg',
                flowInterfaceNamespace: '407cfllkmxwhhjt689t242i8u4fm8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqh',
                version: 'lw8w5gr1wdnpu15mghlt',
                parameterGroup: 'kvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7fthk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3zlpznj',
                name: 'xgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhba0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49',
                parameterName: 'o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlpewbw2e08qemoz9g1x3f7uqcu',
                parameterValue: 'ax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5lg2k4pt2stgpc8wx9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798fq8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviwha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af87ie55xzu0dxedb2k18jdiobv3y4pzhbb2arkczwuqq6shfp8zpi3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9qz06dmh0tmtb8cm7cut7dvbqkykglmg9w5w3efeo1gvdzvz6vekehhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvzterfezq0ia0fdhtxh2qsw16xsbw3vmv645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76avg90i4cchhjfwy2iqypxnisiada42h8kqyafppkn5fikyuepb9no29l350r7q0m29ht5f9hfh50uno2zuepqc2s6il404j354ejfk1l011gyqp71d3wyh8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkqwwqh6u1o8gzo2yxvdw3zobih1vtt6kh6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19vbuusogubahcmxdojjsbx26bckz0m58ll23unmphtu4ag7qegvsvgmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });

    test(`/REST:POST cci/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 2048`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a1ce3a13-37bf-4c48-b63f-89b113f7c714',
                tenantId: '161394ba-4870-4fa1-a7ff-341674379ddd',
                tenantCode: '78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6y',
                systemId: '79551a01-1f60-47aa-aa84-ba1194c1b0e2',
                systemName: 'yg28voxmps02uvbhtyl5',
                channelHash: 'jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5',
                channelParty: 'c4bncbsv5i19sehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5twlb7m8ucwbq8tev42cec8odshghqpn',
                channelComponent: 'y99ee6e9e75dv2usjxofofld1yjv9mli4ef80zprxyyq115u67fuln1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje',
                channelName: '37uu2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwuq3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7',
                flowHash: 'sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zg',
                flowParty: 'xev2mbtzaktoistzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w18',
                flowReceiverParty: '79de6k1kgisrr947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf',
                flowComponent: '8nx4v67fsdhggjkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqn',
                flowReceiverComponent: 'azl30qpbi8daw1k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk3',
                flowInterfaceName: '1b5qttpdzw4fwupzbdmwpqa7nlw1h8kgt6p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6cqspwe',
                flowInterfaceNamespace: 'w4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkv',
                version: 'l2f9mymnlydh38ncg8to',
                parameterGroup: 'uilvhoqoajs12mgdvue7yk9byhqbn3w3voc9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8ygsojw',
                name: 'ehekvt9ytmrcenxlm67kyd9izcaix95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tth6coxs0t40keu0d375w40h1yvihjgni9zfw5h36metj6g46d5xs6x5ak08tju4wosfys84fs0becwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rscwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6ioqidh67grw2iyl5feghk0etp1fddjm',
                parameterName: '69mz8yx9g6olbofvc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk9wr2ttvad14hhltzec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkav',
                parameterValue: 'xuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqtabxf076ospec0pysceomsyyhz8adyncg29pxlhde1qwy946sua64awunhql2vcli7vl8s7b15vm1cgulieg8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksjejahknbadykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwan0o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6ec5w4ru6aut2ohdmclmw99eurovkdncxqowqefcwmakwg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkecc0kqp1d8mdq6j5gox8w085tueepi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j90z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co82',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 2048');
            });
    });


    test(`/REST:POST cci/module - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/modules/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/modules/paginate')
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/modules`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/modules')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/module - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '10660973-9e47-4445-b92c-1b92fb3edf94'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/module`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                version: '4iyw9pwsdxcmgcu744j2',
                parameterGroup: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                parameterName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                parameterValue: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
            })
            .expect(201);
    });

    test(`/REST:GET cci/module`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/module/fdf951c8-7b0c-443f-9c24-edcf6e7612ff')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/module/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/module - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                channelHash: 'myn282zl1ect8c684xo8v4ajo1l62460waru7gxt',
                channelParty: 'obxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoa',
                channelComponent: 'kraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelg',
                channelName: 'ewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4a',
                flowHash: 'zd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jn',
                flowParty: 'unagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7c',
                flowReceiverParty: 'igf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo',
                flowComponent: '95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vn',
                flowReceiverComponent: 'u51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g',
                flowInterfaceName: '3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4',
                flowInterfaceNamespace: 'a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff',
                version: '9yo7uxtsg8w34a3f7ecw',
                parameterGroup: 'c6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5j',
                name: 'jpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybfl',
                parameterName: 'f53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafr',
                parameterValue: 'h2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6mnetdg26dzv3u2sgmaetnd737pxos24ar0x7b9ze15qfnp8k0zpe2rucrutdyf0z2k4xzyj6251lfivuzo19kgdlluuu7xm12bmjx83cndbxa71way162l2pst9uq8l8hbjqgukt7p1vn67yani904xwhqarkwkpj264ostad0tyxs',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/module`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/module')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                version: '4iyw9pwsdxcmgcu744j2',
                parameterGroup: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                parameterName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                parameterValue: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/module/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/e2f0a81f-cd80-4419-a3d3-b4b84f2d171e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/module/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/module/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateModule - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateModules`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateModules.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateModules.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetModules`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetModules (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetModules.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateModule`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateModuleInput!)
                    {
                        cciCreateModule (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        version: '4iyw9pwsdxcmgcu744j2',
                        parameterGroup: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        parameterName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        parameterValue: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateModule).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindModule - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            id: '50378289-a556-46d4-baa8-b46535713790'
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

    test(`/GraphQL cciFindModule`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindModule (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModule.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindModuleById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2e66d166-3160-4992-b353-2562d964cd69'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindModuleById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindModuleById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindModuleById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateModule - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        channelHash: 'myn282zl1ect8c684xo8v4ajo1l62460waru7gxt',
                        channelParty: 'obxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoa',
                        channelComponent: 'kraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelg',
                        channelName: 'ewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4a',
                        flowHash: 'zd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jn',
                        flowParty: 'unagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7c',
                        flowReceiverParty: 'igf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo',
                        flowComponent: '95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vn',
                        flowReceiverComponent: 'u51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g',
                        flowInterfaceName: '3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4',
                        flowInterfaceNamespace: 'a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff',
                        version: '9yo7uxtsg8w34a3f7ecw',
                        parameterGroup: 'c6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5j',
                        name: 'jpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybfl',
                        parameterName: 'f53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafr',
                        parameterValue: 'h2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6mnetdg26dzv3u2sgmaetnd737pxos24ar0x7b9ze15qfnp8k0zpe2rucrutdyf0z2k4xzyj6251lfivuzo19kgdlluuu7xm12bmjx83cndbxa71way162l2pst9uq8l8hbjqgukt7p1vn67yani904xwhqarkwkpj264ostad0tyxs',
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

    test(`/GraphQL cciUpdateModule`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateModuleInput!)
                    {
                        cciUpdateModule (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        channelHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        channelParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        channelName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        version: '4iyw9pwsdxcmgcu744j2',
                        parameterGroup: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        parameterName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        parameterValue: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateModule.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteModuleById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '139000f0-26ca-4d66-bd77-31d149cc8602'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteModuleById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteModuleById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteModuleById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});