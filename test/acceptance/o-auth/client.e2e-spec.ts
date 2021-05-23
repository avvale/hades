import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientSeeder } from '@hades/o-auth/client/infrastructure/mock/mock-client.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
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

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: IClientRepository;
    let seeder: MockClientSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
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
                    MockClientSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IClientRepository>(IClientRepository);
        seeder      = module.get<MockClientSeeder>(MockClientSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'n56og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeqwhip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllktf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488cilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvxg41m5b33gurdpmxqkv632wsbi6gd79ftz960fhglkf7wvk4qak',
                secret: 't3q7vr0vasfva4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q534hjodoziky3rha2wpdzukxx9ld',
                authUrl: 'xac8cay1ymln17i8mio25p4avx09urzxj0o5ox33iki0dcp9ugtw487i917ivw0mjotzfsvm04m3q0469r2o831beav8vaabf07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7gqw5nspwii3j9mtu6k6ay6yun5uai8u78sr6r6v4gi62abw67lle8u10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15oh74jk5b0dqavs4jqjlr4wz6j10svh2c1n1eo7xox7h606aed511dqd8p2uq7qw144msouthipiaihjjnvuearea3u4yib103d5ec137oqh1mpmufnr7s3ayt8uebfr9u6j536tzw7dpl7t3wv1j0800yrwtnz04xe8wjsm6vkja8nis1fjp64npwg2pilugp3gto0z2v8d6dn9vx01wp21073grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2ymf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03lxbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9h7o55kdqyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd82qp6j3bglqg0rfks8b54gtfgsk23e67u6ekykyboisqtv4rhkgy6l0fciey8wxyallsgjq9fowaclbmdjv4gziewpmd788prxw2bkrh5r9to3fbdzn93f8b5q19tcw4qigsbhllyj8l3ih41jgl00fxhtu9ulah3wzkc48ex8u3ntm9p8c3oxak0n9nh5gmzpbeelgs8qf553qx4lln7v8ebh51jiy60nljqktrtnfe9maq6wbfs1spjax0cyvovs2q5cd3esg0iu2hngj7s93e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca3r11ksxlnp1n66vm7i2i218v8l3ng5uks62jo3952rjppprpwaedpfsozl40ru5lwj4m583bk3nj2d5slutcgbezbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpoopgqcmh87914iojfv781vebnvd6quumxyix0hul2w5s99kz4t0u6t7cwpojtarrbmzao1npuby4mxup3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktaiv5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03uj1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrdnn1xfj25ppuas432mfzf4o9471xwrbss78rw51kgrup2o0cmqwanwaemdfy0d3gdp3dsdfixxn2zq83gm4yfaxbw1a7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6qdao8ptidaglps8z04jow3j418m8n75i1ovexanfrjwt0v8rf6mfhqrisw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg3qz4uf39ykk2p1d0rhybx8fe00gm82459oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeycgg19psxhwuw7s4nxgdtuhy7fl4gdco3liunxpuewux8u8alj0l85qwtj3td74i580ac3y9zmov2dzq1myzvlzly889fw55fj4vk',
                redirect: '0qpgg88on9muo28r7joiheztgusfi704mdi33pfm7cpqbt1a86nrjagm8szltgid0ds8umu362rdpz51snak3kqsxjpszfu4f4d6j6kf5k9wklvnnffj7eyb69hyptv4r9sgbjgg8kv8n3bueys4wqpr5lxll7gl2ukdj9px2b3nxecif05a9mcng3tz4etp681uxgvln9xfp4rpqkbs4v840ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9skj18ahklsjp8g2qixarb2nqm7tuk9q15zonq2oiurtxaq9e3ciy48ov9den8kfjty5w8xrchsv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd7n17zl2ylbr0epsmw9spwww10o6qixz9qlpt1vkoywt2x8dig0tkumhr277ino2q9fy4nhqyg4dg6vh1icb4i6jj561arzo18ovg8qlnejiayqxocd2era9ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzypz74lavr9ghg7uifxohk7ffdy3ht5d5wbsru4vmm5yqa2jjvbzpdpjikjix9yl22ebhmihs4cj5e23hqy1mjgnum1h3aftrjhcc855naatx8kclbjel41zxlmw4h7gbwto4u2lhlaeckrziotjzunc4suqrqbjhgv1jk31cnrbtjc6o4m1vgz2z47qhp572sm21s62y2bptp42u4fmh2kllpurie3csueh7cet43pveh54irimqd8y4qjlaghzw8pm3xbxdkjb41w4jhjng6rdqjr4r5jmdhi0zx6ycr6jr268bju0ijsnvaxi703m3sx2xuvbgnh69cx1co4ut4skpnnd1h64a7sfl5ev0zm0n6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwtj9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek2qqug3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoeulx62c5b86443dagg747m8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v135un6e32899sq1j6ihgpqve9te6vzm3el94bmxme9htzcghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xjtskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeqtck4jylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxjs4evlx29hsnlqw0rk7razqwzaalcnexnemzuagim3r9f2e1jjobwaoxe2tcwmwx41kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpuqylobo4kkw38e4w258bgar9njanvv7c5n34s2hf4b4cw4tbpwifz861etxi374ungsjonbt9thcq7o5s9utxg5auleixlgqs3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4mdihkow5ans1y1wdag52hklhtptpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxgw4hhbq',
                expiredAccessToken: 4897572295,
                expiredRefreshToken: 6123515310,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b83f3b0e-d579-45c7-bfc3-8d60c152af29',
                grantType: null,
                name: 'urwcvzbjl56en5y2gvxcbblnthk7r7rl7xtmufm1mq3u1z6gitw3f5j1u6wgmup1gqms5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q4pwi91aduf34pn20qvpwnba6b5a3mx2hsqpgqrl1ilrtbqmp9hqtr4ne937jvhip5s9rm26d4yu7l6hrcb7maoirtk1njgm',
                secret: 'sc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6',
                authUrl: 'bnbo789gmspybhpwxx6gt7ojc0i232tbmwnhk325rniwbwgggnhk9fvqndlt6xff223oh0rdy67j30vg0egyj8dowa0048qk6sldyed7008r3f9btblhy5ktwbg3v0s3gj55lf5siozkbxlpxmyqvy2lh8q1t6lk51zwoy5mzhlaun7x0cf5lei68dc6xqftek39k0ry8optfwho3l981cgprg5o6wg2ndrvhvfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo7pi2l3bgslshugknqvf93gwylvc2acoju6d9tjlwlii9q6erbhv1qqflksfhtc1ehuio37v3y27yib4j6oc5gdv4q0uwrhasrxy1r75c5afiyoksiydqo678c7b983eigwfe8gop237ryj2kvtxlyrvp8bqydmmbwvjuo82flyo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le7zyi1eigu4tkje1u8lj4n4npfai70wzhrggxjels8j8oubxat9q96ugk4sd38dbyi6ez07fcxjtbb0k6nve97gfleqxp7uxwf7sbdjo68bxu0t7tqkmndnnuof3kkrdk0q0rm5vff3zxh4kghoe133fwfslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit1payaa8syabwnu88di3cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8mi2oc6ud9iqycdobqb1j8qi1t9fwr66f35yudcwzusnhm8shc1zvoxll56mchc84xjily1gzmiuraltys0dlql1uhrvkzsf257c7sgsfw3ylzkrte9itwz9exo5gt020cq7wgxccf2uvz2d28mbkuun4wh4jbya49i8yizrofsfmtf011vgi2ul8dqmudj2ger0d5zc6l7n8lf79gy8izezqxchg9ek48gyvjaj6t0wnsswc836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzuknrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8d3a1rgxlmly4tt4gvt6m9mc8uvcj30pdqcyx3q4wat6nt1zgg1daiyv44na9zoj93r1sacekbnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh66ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge6xchaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kujif4vya64p80gogs8s8s9oqhl9of2il78zry54nd6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1pwx3p8y73hbn7bchixgxcb82j63dm03mfwm6zee72behgq4fotjrvdr9yoclxrf4ucf6oddlp1547eo70x383tjnxur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0oul9qeos56mlqyg8yq58qywp5a65nu3nahhn4cf7lpfdhvefueck32cxj9dd1er45kdexipb8cn5svw4hnkd9h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq',
                redirect: '7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkovlf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9o29l5nmivnj2um3xrxgzmu9ngze343p4hd0dz2rsxw0i3o967sz5wmyabuzakm6v3ouuvfxoiqrtk9skwjrswakfb6m0vlt1ewgq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrzi5cjhxou9f9jjnm4j2ucpxvn35v2k6dthfs6i4fj5kmfc90f65rn5t1k1cflrapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prwlicjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnymt6dfoofix2iseshr5xhy25xyzb4nwyixuv4xoryf45kc6ux4jpdpy1up3uqhmjr7vonfvkyi2r7ixueil0i9xsg281hfywvvs5f4c5hlbpzlh91ggrsh7pk4mtx5frztpqejhch4u638y33mmwob7jnyl10oy21smqgk0jvftokwddzvv0l38sc5e24vdh1e4pj8hjkmyqj95u2zosavxje58z4vuj9ns3bp8gokxi6f1ho73pk333gmnn4jcja6qhhuk63o7gvgh1yvl5h13rlpvuj781r2jff8nijzcjq3pu54tjvxu7tu0dw2k5ofm2y5fivm8cdpzhi9mmfviu4vncm0axxeojyni5x7we0umc2e01bicly33zj5as2nrp7cw9revdto3n6p1nypvaglxevxkwzj3jqknl9hyqmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0gf11bf4566i0ehlk3s6pdv8ngilwpph21eu81o202g42coqnggmudl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw28c52q46ckqseufgoehk1w2gndehir4d0ahjefzzhk29iwvlnu5del3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlkv7ifvyrba9c661e4ow531e440l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju3764omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofuehfsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9t6jp9yhstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3ioo1f6jvv3r45fl95aisfx6te68vgmdc1cy1433olwoo4tonsndhusch59jpgfet563n5r6k6fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq61ap4kc6da6ak8teqzvm3jcto5wipqr8johf8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xgqggdzsssntv85uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy520y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfvr7gai36o5e3de6fea4fhpghg47rohcq1er6g0c6qpxiyquz93yu6kssbijsyuur4o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3',
                expiredAccessToken: 4824329637,
                expiredRefreshToken: 4488231726,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e14cd84b-5b5c-42ec-b3c8-0333991555ef',
                grantType: 'PASSWORD',
                name: null,
                secret: 'nj94bf1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3j',
                authUrl: 'nngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l4dcb1lrvvsmc4usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d95t8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrlluz1kks4fib5dzj3sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc5jtncykcc4i5wjgehra3h7ntb8h4gryo4u1g6axes2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxfkzwkm3s65z4ely2l2fl4ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm01pixbx5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3jd5xoysq0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm7ez59wvkqa6c50704gqrx51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci0w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v6twg37kj78tne7je7sphnyb9z4nmwruougte0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1iiaph7fxh68uuawoz0mj35k9rl729aszth2r60z7jr087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0yuod913kxm7abeeqoylqubuqf1gpq17hrbmrlnz01j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j',
                redirect: '2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76jd2osncw7dqeiyugo0b8ktenv97o300vry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecjxxr77xck24qqwt1spxvnhv8ivuwjbfk38z3jfzfn48ngkfkdvln7f1az0cudnzh4xuocnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6wymctuuakkpf0xv4y0jvddho184k0p9rdmywlmleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4ypvo0y2dwo1w88tkw7d6x6pvtzjou3v4vupbhkeg58a1a5q6lce938prpeyc6wwqz1q7aqzpd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75aljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z25erhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuwq08prxudzct636hevu1dbmpifytdtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy1abjtelhznk33kr4p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs53h6upczew28ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9b',
                expiredAccessToken: 6227706326,
                expiredRefreshToken: 9923364356,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '987aa221-8d5f-48f0-889d-5cfd62b481d0',
                grantType: 'PASSWORD',
                name: '259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0oac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m7',
                secret: null,
                authUrl: '7ht8i35oj3utemjh4jrggbhutcw2a1dfjfh1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1obceih7094s1mhkc20w3ewbdls49fliro2ljrq3i32qkow335elh14maxiv3wuel68l9yle8zz879dp48u42fxqmhjg9qrmjo0ezgoqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb8xb193zcedjgoz5c343sf5dly62y5mkd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8b3gf0ijpsnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0dgg560s0scdaucc6rntdfmq9t481iumr3fa2kws7hjr8lyfe7vx4mriysi1a7ya4aaomvth7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4wdh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45fxuyraqtod95xb8fewvsvr2ogt1ovpewbqwjqx8o97ffzp8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7ls7as2ajtxt427j89iwn4npijk3a2ahn6rbn7ncdyhfj9mao3tecb92vkyjr58w5ctbm6g4hb79rqpwxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemxlr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdca1ob1gu7k4za',
                redirect: 'c9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiwqfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nspex6edzrq1rvzqnjhuxd1g19h8oi8i4v55ievpf43sqewplawrwtxw7419hkviqtdt8lerqznn7wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8otien7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clcgc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4p109fzvdieloqhfikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdeenjo93l9xdy6lnxcipmk90fnta4trx5j7c14025xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkbghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3rr53172p5uitjpbc041awaghculjzqxhjjv7h1645wt1y5nnfe8tclaq3asus7hmvcy9h38b2nas7043w90ob7pncm29eyjug20yopi9astk64carqs9s5brgya8sa3zkjv2izn3s1kz0pebzc0ytjqdfs7vspolcc6f0ljeybyyo7tct9bs42t4yl29ialr0ownpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qcisfaa49jrn56doa1psyqyqz40dm7o3uk1mzenrzonnica1ny09gx65k4xjcyf9iat59lo3tyloesbqh7nnp37ks4a2yz7p89ubjw3zskmlhorlxvszl104q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuovyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21hjotp62yebx67alztjxnlc5r38wcm2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k6qw69j7r8gt',
                expiredAccessToken: 4497509361,
                expiredRefreshToken: 4420740060,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3be7b209-0121-4c52-ba13-fed0cdfd9429',
                grantType: 'PASSWORD',
                name: 'ygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kifglp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t71iomtlfkdowusjl4bek9fyc1z7be9hs2aeocejq54gv7p19jrig457w3aau1gqsn9wnx7znq9z41o4cf93gd5xib59d2ofz7ebngfhkbv0t904fy9qu03tyzspeyvba9h0smwsk2wj5',
                secret: '7rh2gb3an8pldewfx4hfdsdovbplmtckupjfal1aaxuolvu4429emygxfmej0idyka28tn10kb3yxqmx4q8vby65vu',
                authUrl: 'nrmh767herjzptl5kqldheptb68wizt6xbvrhnzfvdr7vwua42eurschwga1wevz5evetnclm2shscoti1fm1gxkv96mlqx9squoj6fcpqhpjhtrn4h0lfh1exf3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun2kjo7xasxw26tvy7akz25dyr70st1jjhbhaq4phkjn4ln8kx0gpd4a7cv84z3cvzs5w92sy98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7akedim55ef6pydzrnlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf2sx2ynmssepnq3pn2syvmbtypz2grewvy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlpnlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71sm43xt4lig22zbrlzco037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4blakg4g6m4mccj5wrzd7c3s7hi2czus55z1vwndjo7oump79fbg8a7a8w17zn3x9i7dvkieogy6tbfv41kjeke4r3qgv7qdq7rg7c5xwpnmi4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmbc4ogetlwj63vvrblps6dh987cswhojv65w20kvssk0vyzmajwmy3fdbhqn8e7mc49146s2z3f95z0kn9rl5b3a6s21panyaot054shcx71if9lqqrzfw8c6aq42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs999bfqdbktkxkg0vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwislaz01ghi61apxtsev48uxmtr2ytv0dznoryst470dsl2lwtwkq5j9xutovl7wkc28kt5i24ag3lsgvb3ewytfxmijn71vikz9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkynaiqglnwfjjvs00zg1jnczksdxtgfqyd1qshubcjayp3skdvgfzvai7e7r4padfhc8cs9nsc8d0n1iufqhqpyqwebrjl4gmvjrg26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0max2f7h1vggoe1v7h4igsmxfxkgg01kv8km8unycg75q2j2imb9rjeidaz77i307lap7bjo3ffb6k16odji81mue2rq3vvt7zzedv5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5rebsl03g5mxf1oshvawb4l5xhj9kch0l0zaoioltznszyz1rjdo7b3bniz6qyn1ht9byfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuuu6elu3ql2xcxdsic1ptdv7vqgdv7xfi1pj4ztmvx182pi75omxh9paejmskdwc0k7mbkjnk5rhdmahxr3408881e4h3zhsvdtmixc5fd0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49crwv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rbjnmss9h462vv5nz0wa43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p9tmuhm57ddsi6',
                redirect: '9ozk8f411rercw9enak22cwssydchlc8090jas22c5jnjz39p51fp1uaivsxrmi3yidpbo80y7ufbxsnx73mbgisg267l7hkpdy0tku7p14lz8vcmobmiq80orc936x5fh5vufwoko41kqps0k97xudr3rvuezxbslt9pbgskpkz4bjnb7jgbxf0o5ca596xm14src2f9tdp8pfy1n2ge2u12le4feh4j465fjmvbvgyquxm1h9zalpr7ybq60f3mo6cxtkvn6iwzc9svayfl3zxz7831n9zqkoqxsa2j9oxtoyn2joy9d1nkba87zecaxfk1pxn9ww9a0dfrcekg4bxiy635lqnoqjzkqryilv6hefbsysrdt42lmissstn130jiw308q9cdyrawge06cmyukvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjto2oshejk1m1170fp0ocen5dmf34q0fl1cltuwiqpkal4a5tdmm4ceoim8sqc9bb6jp656veizma1gx2v1uf7qn9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1vmhruke407ofb2jnstlh9cgfyevrwaertasbov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomage8b178sp9dibrrk7ovbi62z2yopf26sc6bnwbt7lodm1vwji2zydrvqxk7e6no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9fnhoorc1y4z4u5ao2kr25as2nl63hrlc8c5vun5rovaxyd347455st7wzvhbywapsw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5xzhy0wz9dv66u4yl9udn3ek00w51w7tkpyn7k8jpempejarvy3g9ayu4jukf76b3521ozdlvfp1s48kpu51ryje3hcergdqzqlbxoq4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezite28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv360wb9lgivvsp1uezflhlq77gtoso3gma3a3sr0lsmrtm6ha6hp20sxmjpnnsn0b2x8rgyskklx4tot76wmez2qs342vaqerk9ggtuxdpixwosh57db8bk6mpmzecjmh0iy0yndnlmw135cur6gfwjuoyqg39v2ou9smpfkvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfsr0xy8px3zmy64limepgt2hyn4zi89m9v0ac85y1hbspg9fo2jpoqkk80883gx4hnmkd8cgooizy9o6g85m90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi7vw3v2ec8e4f4j39auyar3v2bhdubxfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6bl6om26tecqffqepu6sdh84ninlr0zv2pc9q6g040rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6bd43aipdyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5vecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3fepex01ax9wqnc39k3fs4x8wybrdm6tos584b27ofvk9495blp',
                expiredAccessToken: 4291587600,
                expiredRefreshToken: 7208518193,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4d6b4ba2-f395-4088-91d4-17d07afe7c59',
                grantType: 'CLIENT_CREDENTIALS',
                name: '9git2yfpbowrmwc8n093ou9upcjjplcpjfzp16ldct5q7rlfawk8vplishs1g48pmowfwlchgcje8e7nnj984w4wrtaa71r3yu5r8mr2mfujqs79eesudwdss6oz4hj8ml0af0k8132zsr6ngtq9tidwk7lry1xij03vnozwcbctwpb5pvaoc2u9sa9lm5enxzgopw878i1pefcykya3eo8wqurfi69nmg1p91djltzboaxob5b9cy2zy3jtj2o',
                secret: 'flfc31oxymiknaadlbfxkyb1432i3tzt1tb0sgayysiazfd3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26z',
                authUrl: 'dmcdbmdq8p94h4x0ofm51orkqub40njnlv3aswj7clzd7vajjj9z0wosswxqxn7vsm0nc6cp434woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3c86gbjz6zba2cwvf6mtiew09ri764uesk9o3wiini94edsoy3rustei5euzjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tuaov4u40le3yv8i9qz5lk18pp4x6yvusvsvwz98vp80gm8rj93d8qz2mlvklhfxkwrpirqfmmiytzcvf5hy3z6u2z44cjsktzizt4nu9tnhf9pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7hnbuafttop29e1f3k145df9ewy9r6fqau538od5nx6inms1duc3m2z2g0nr40krunzdp65wjreonbse899p4v68dzv3ogeyexl0qj9yyazogqadhggv3po3db2zthzqyw1i71bqse44bncdz4i95o11azylkf2o7alm88gzbviyt3b6oq7uk5zoj8xm67xhevhi7ra9ejef5i2iscycy3mob3zkeyu74hppdyieshniep1lhvr6ei4zrp1zx5ycbzszfeou0sf5k6wy4s35t8yt9q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qej1b3ic9g6hajtpjptxy0wat15l717yq50fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizoasac5ypg41kxnnbrqrh7lznjzdkszkx8xce4yot1zn5vfw94ovn9h3yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr9e8hcv51xxphhh7ujbwqgwny4yne976kbeq6eailgbtg98spdarzpm64mtee93nz4hhbqhile6u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5q5wtfo51esa76am2u0ah7ahi3ukvz7hetw4ak74gnuvxkjbvst3oxgkiimv58oglyfns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcxxrvuszkxop6qj965m99sc47hz31ehklffjgfatg4oa6yo7ddlbe0924lml4nxjk97g2tlm1lnhm9sv371z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e2i0zu74soia795og003xe194dskc43yi17hihqqd4k60fwjkn6dcptpu3tw4h05n8nykwy63eck0jrcl521c5q0vloth548obprghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyoubjbx54ykrf90hfqxws47mxy1t1xmws6k9l9t8yok8m9bwbaae1kqw6ck6zi4aszsu041lrq569l6x5aq9nwf7o4vi65hoynh4va6jhmw3gbxvv3eyt0sbb7wyqw71807r15559yozq2w6d3nei1jrv4ls7yb0hamw7jjcc2v9bccwni1om760opztoqvgm11qyfbku10hzjap5vy2aihf5lmcuuc2ckvr36cac9j5an9lafv5syap7j0kiddf8wkm0rierkolnbpf9w7syqr2earst7yz202hgxzaollzjvl6b5hqfrwv13q4l1i2lpb1iv67b70ailbyxfcbeacxf8dvz5kg3ihyhv6gqm71tm5j9s2e5w0e',
                redirect: 'lnjbj0scv7j887ifhr94jcvaucvuyp9vu8av96zi3yb355gp60ieufpmg4edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svigqnzl0k74m01u09xhm2yykn53iuevm7bryhb1emmwxxuhi9e0yfren3evqlsosi8u3tqumsrmn4eouwfano6y6cxfs210nuw6x8gxwd6wpye75o2m1i4v8oi6vm9lc0tbv5kythwesjz02db7oper307dvfrumq8y0zazi3arvwyefv4zosvupkmwwbt2bat120omj4wdvs89e8untagjuehrb5qwtph86yerqrzhjf0qbfktupchylvda1cc2eo6kh7jtc278yvkax0lvhrwels814oez34ujzr0antucjnn0ch3xznyyf2k0hik4cfmumxxj50a1udjbik2z6sdzlmnzd1oroea9uz68wuredy46w5qeg2sxs79umt43o60ok001l4appaa6tlhd1eworhf1n4z4qwwgo7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosepn4y50erylwguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus885pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjamigo4l1jxc5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yit3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5qimv919nog48yxj9o4uyah4mi7n9ia6d2l5mfst5o5101scxgfdbr9vd3y9q2vhnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d296axetnmu4g6jfzcid0ko58hcm2s14g6bkcq0eeoueumkb7tmes9eahja87brijteuo7un3lgs5k5awc50ln9lpojw5web5hyr6ylqwaguiox9ov7mff0m6dr06v1z3h7y9t1pk358j1ddyochy96sotbrvrmshwt5xmcyv7zeb0wefz2v4yd3cvwahtvwzl942x7vix4lhf7tkcevr8kzvivzeiulpwcsnlxochlr2q7zdv0gljlb9om0361m62s9rvmszozspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5bh31ufnzyksxsuaufmfav2j78528hxcbaxb92ynon6s5bhvischlewy0lpxdfdnnym43ae8n914b5s8h0xsgrcr94m32azkx3qngesn3zxuq3yda9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto76h68imhq0c7km3g0s7u5rj7bqy6l1n6aas5nmnlsb1lwl5ie3foe61x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6srlct81u8lyyo1c7cmwa8k1cfdezod342zelvx9u3x7tou6woepm94uf1smhb86v6teqpkjfrnvpy7l3j0e4u757arjkczum16kit3n0jn5texft1f3mbebm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgnl4101g8472mq4twnwsr8ynbosisereo07xs4t3fzqz1xiei1kx801ceza0vyh9ngt8j63t2yy2kpr8vbpinbq8htqrsnu7vt78vxussy',
                expiredAccessToken: 8943321529,
                expiredRefreshToken: 4654122946,
                isActive: false,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                grantType: 'PASSWORD',
                name: '296bwivhp8ds6dx1d23l49d6gcarhbacf43f7nkmvarqbw8bx6av5ae1zkewdevvt15gz588yfyzn44svkb3cilrxykjiw6845s8uwkbfwpwjw0lwwng16q2mgioxuwjt68tfm9h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgukm9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3f',
                secret: 'xtskklamirf1972akl10w1sxsoz6nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1k',
                authUrl: 'lpc7tdr80wd69khxatnbxbwttbft0xjmtwv16ve3vxp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf114athm853ma1m7lvwvq25oye8ix73v1at6z2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5ikoxqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7yfb2kfgots2vf2ddiz1scgg8npuok0gvvjj29etaee0qeynmw3m9zruh042qfli21zmcg569kjncs0gkdmon63xmvmf7r6sglxpodxgqqs0n3ke5y06zxfj2xw64633jg86cfo9b49lehq5x26i9xox8ra4u8b55luvsjy6mr6gvboimc6z292589dz7via9c3do6j4r41qc3isvmnv6c2w2reb87avmjec542sbfqv38apgor05fo1vuhfkf2z96qsqb9n45ymqf1miq0d4qvit5bnpap4t3oazl9m9503s1e8f6751x5662jbq0w4wsdkaonsm2lm6fi8ce011koprmpd02hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3pxsuoeooik2s1pb5gxesc3xxtnyiht065vdgcgn5mt02mirpk4jydtasx4s0y1ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6lkydezkud4hpjut3dw1ly0od6ti7t927ehyr5nrnnvmgwopek1fki86j4baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaft2ewn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1ei7if0wm6i4wg34jzuwzmzd8hse4f8j8iqvzse3re5fyyawvo9et3nn6knnzuwd2uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr042be6x5mudg3fzuvk9mp7cfgdz3f719o76jyppqsrp1qjxu27sehvxdcxmieqmb82yidruvry3wfd1g52qbu8r5ztfh42dbdktq47o59x2t6why9b007smnn9ytv2la0yt56bx9sdauiagcxszvezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjzynpdcee93rodebhvsyi0acqx5w9z9bqbmzwkjwbnkgqg9fakq6tx8816c54zg0taqhmofsjns4opswpb5ogpk9yzelgn4jwgzunvmufadmpm3090xsjqfipger0jdostmu9udy75x062exkx6le376leagenmqgzzl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9jtrx62ai34fyzsswlh5wbmzikfkrfr9273y2vipbc7q2syl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwkn1qpflhaz2ipwwat3gvbhx',
                redirect: 'krikvbfxbh53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga7ymqb07sqx4wu22lw8zz1v6t5g3sme09o5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc7pkyzzo0g1xksk3bo7hfo49eth0acm0vg95mlyn5pgj1rmk0buokpr24swtmsm4r5hjzc6jk1xxsl5qoykuclbe7wxqa0cwv5qt8s08m3ve0azjo5kjyauanbharmyiqlnhtlz0w14pb5m1tnr4gzch96lpcnvgsrky1bd3hpmds3aezi3o1pqtwml4z5zyafmqqlsaj2ex8d2ubajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf0iqzkugf8wtuyd04tda1e4hr54h2wcg31826snzq8aj0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcgxly8z3sfouxer1hsgdcyjfxma64gtclx21skwz5udtyz458mqtn8qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6g30slf11ypsjr6nah1c83izujjj3eme8iqge7lpbt61tegsvurakifn1eykv0n8jnqpgexjwyoxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04jfc7zt37tk1928ywpphaxbqpf4709b1ca9z339ood90z8ohkobeodrebvmq88jwoviuno8jgate6yqanypwh43kqt50tbne0ln5u95r7jn8ixlxmyjq9ezjazjy7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc10o0x6p6f82ga4hg49kembe6e4bgf94tofi50dqmg9g8i0apnz2opk6qvxjvnmquxvqwhrw3cie297ua8da4ik8z15m2afk8xe0tz25k0fe44mw62wgoiao0v2x9yy1359wgrvltqc5ymkmeq0m4446f765z3amnwau9vr66itikkieil7kp5t6x2lhadpstgai65oxim3d8h7x0dfrx2tsw6rt5kzuk2dquxsslyd774ptmxvpv1oy1m00jc1adissuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfyl464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3f7a5fz7jotfszxzrmfxm93km1f9tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxiuas0ysoi1fsxifzpu1fn8p71sgypmpt39yfyk0hlx6l0ez2my4sorxt41gy45je0q5k7wt7w6xj2u6i2oovegiqbt6cipo35fba5n93wi96xt7ykygurf4rn2bvbufz5s1katp8gz371e13tqf2so3jddt85lkvxsn5milq8wsfozhy7z86qzy54m4b4vejnd8cpb50quhvxmyryyz9d9dolmnyv7e4r0m1xw7lw3g5ydx6ojwoq59p1cn249f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9iha5v29i31ra8xzlob6tfibgatyoledrymfniepm2v76jhq6fqxyr135e41egeh5v0z3qzq9ztbcnow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5oprf94ujmz51oapuws2dyk5q2yfiadnkttr1ylaxiucvjmwbvj1jmac80zpbon6rvoumharm45xtp5elc7u33b94l24vvr6uomi8n1qaoj9bwhtxvywcc1aflly34eb3cykgvx4xx78pnmor673vznk62l0t6ypslzuk3pbtrqt7sjx46d7',
                expiredAccessToken: 7813496109,
                expiredRefreshToken: 3367658583,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f223f965-dccc-4e65-a440-2d8304ec0fdb',
                name: '4tp9ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr08f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdesezimnjicamw9j5x5r1ckg9di54c89nldh0xadv3awy47zjlckp3xynvg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm0z15evmkk8ofhkl7o37l7pvbr0mr926qqj6qttso8hff',
                secret: 'tyon95s53tjlistmgp4n4kf9p1xblmuh3ezhko9tahtw7mi7ucu327dn13sydjfjpafwsyh13xydj9tuh7bgm65woc',
                authUrl: '59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x1qbkjlcw2892hyniop35f87obfdtk3n1mebeodsaymw1ogkxfbvnqhkorlgocz61qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udjni4rsastjrs0i0rvkt2hlakrbzn8el41omhauyjreh0xvbvegm5fsoopjpurlurk04tfii1v9dpuhn9nnwnrsiya1aysbg8t8dqxew2r7bj5c7o9jomuhzzcxnwzuc15mscmhw4q8vfuo0ax6b6j13qejxzuimmmi73h3lavbpqluxm9omfwj2arwpstvyflk1wdmb490u6czbjnnrfudfjgj4cdztdto1y4oodjid1v4k019kicuda64fe05w0u2fxbybhfrhk2odg32tumdbdogyjgqbwwfpndrlygmcnut124t415tew37g3fw8d5dna67bz7ob32zmh9hqajcgv9604jtg07shzutrnlz49w8z62godhvjabu0ldxoqcze52hdm9hkdezgect4k7hnznt2v31byhbyzscex7ghntiwwyrb90ue2orhl66nn92u6h3bes09o6iyblp4ljujkotr1yr9jsnmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvkomue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0eyn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zgregg7mfcvo9qccw887ciekqnuynxj4mechuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbdg0boen6skpgk0apb1wbe1vagy61rvr78n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzlvopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2qvuf374z9s2fgh3ev6zrm9g30lbljqgijhgmibe7xr6yc0lejjj8cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hdsxrd6tvb7a3x0onmbck73848b96nase5hrfw1z6nhau3k2129sz2va6nmso7ev7a1xkagnp3yorezqof19vc2fppkxsnvl0tdalx9l33y7w4ngvxxf1vhj8snqg80lz2x5j7q7sjh52tntpcs0654r4a1ztmiq6015ovuuy3s259xu9hx4luqmhl1r8j1g4cbujex2owjgbkm8sholdjd2ql6y0gw9xvurn7wuyx70378e62n95uwpzkb11ls7sq29prjf1sbqd743dpfec5rfvvw255f74edoz894ugi9dkabbgrs9mogvoc3f71ljh0wfg72hde5w9vrsadq7k6im3twl5ryqwvaer24ncujq5bgdj6gqnjtmygdue2mzq699odq5x3zocz59szw8qt923rmij399k7owm2zylu89ra0ekw6n5qiph3622rmtuze3bks5jwzm3avku9g9exslar07o8mhfgjkus3c71yn3o2nzgo4pmk5vevjfb0tjt6m3yk8r3f7prhbtnhwmv7c1rwd673tzby69fy3pncg5v7uraibl6libfikm0imyyeqvckpum6up3arc8m2e9z372x6le28c02wv3zlwmnop4qzn4c8lrwrg6f7x8pzyw4kemaqqagxicqudmc53holxtanir17lw2vz49p1s0va01zgshpydrmnhrf6ok9y51h31tvcjc7bzob2l4b3y3g3uzif6el4l0vbm4omjuirxgykqbg022rhg4bx8erpfxsif3imuqd3pjazjvsbo5uzihabr91qeanm6zqtai4kbms2jt69at91g7rk1exlha0ow1nnjykor3atr1m61iruksw33bb4zwjgqh34zgu0qmh1ij9c',
                redirect: 'vi9a2j44kbr8672ipdum61riaqjgvnyzymmt9yqqb27uqug6l46q4mi19zneevgs9a74phdqvnb84rb10vlymmff346dsj1k6hde3xhd72cqlxzb80uqmfn70dpusgm4eak7a8wtikzlz6spkv6xpdyhvxba5wwfkbj79qym61dvecnd0jck14t96oec3zgo9fyob1pwwbffrl69azll02jf38yicbgwgt2sfv4uf8jdyer314jf8cpecgg2iy3x9axtkd71ov5pgxbmnh2fqx06a204n61hfkc9z6s5rg3fy5cut17r57qzp27u2buvza3euw1amqrbf5pssy0vpamud85tjfvzynyj18i31p4v5ark0j6gqwjdh9s789wuef1a5vzbd6zwjyg7fjhg83ayutuelt9yxow0v51t0rkl8klgx9s4baxh9yswms9pv0ariaopra2nwsf9hg3e7pik830envbluv1tk48n3060o0fec5kjsx1tnj0riu574srv8lqkdhf6xwkn6lggou31amvjq0sxw9ei61frc9hhgo80jgj5uer04hkvmmmvjeuhz8fxjx53xcwog93xs6bnzk91e89ws657rsy43wxz7i7xprv2fhhtqfwa63m5c3m6pyc7okl8kbxfgqcu3b9splpv0oydmxr9i12zftvgix75ayns6tchxvw5zboj3mlm04y13w4fnu7jzbcukiit8wmg2ras64lian8ieulaj544g99sqqdrzi1oz66lrlfmmtl5vkcd4xho1plg0mz5j1m3i9qax8anho51za0is8felubgd2s91xikr594ewe9d3uc1rc8fdzqj1xfu82y6fb55uqtpq2q5v45vfdpe84a8n8tvsvtmtlbp3vdfkuewvm1vckasp635i1p7rb348zcrehauu4l8p5xbi4574y02lilqoor2hx32m0sj1oazdpm5y2pjkp394rb7fhijwlbw8d5dyxsgjezznrf78zzj4ncbmy1wuc6e55ddr1gd4wh2hb0t31nkfzud7iksrgocvlqoavu06e0458mhboiaqjpf8dwetp12fw8fa0jor20ygin07dh5pb1pjy51n8hxb83if98gtum7c1arin5i5medngicdnlko7bvpt3rfgwakl3ag2vno6mogswx6rzn6eye8570jx3f1lmqndi6447j99tmb1vewbnul27wwjrpx8bn8ggqlzrvivoxxmglnp8wzwnpp0z83ur91z7cdfps9in4rty3rv7dq4qvhdpmeagi97r5t72l4xnpyq8hff429benf9hegxx7fhhon0zvrbd1y1aspvu2plyitbllscsooz6l0l75xdknda08vrqp0yfim9des0iwfveg0tbn5bj5r1280vfam0hxvglssjxbp23slrqmkt4bnwa8etndy4qgt8eiy5v6nnma5sg86bxbwa14ckrn403q1w3rgc2j5mmwzhai8davv28kqg03rgfjlfjrz7xpyvlvehqn8h83vz90bp55tsec8pecdn7d4bx1d3cy1taio8ngby2oesii5arcpyhks3c6mzhk3j7wn5vpylpq9x0xg3t7idpvzkrftkw4j9j6abbeafbgwblis2v6kdxml92e0ar6jrgyoro3503hscu321art6uj1n0n25rmb2495m3cs1xksya9ywi14h2r7xz4wk7o49ekmav34aw8tyhibqo6x3b9k85ck3tqzvgvnbp6ws70mrqocxuich0gmin0qklet7mma3lf9lolsnmu78kdbokqh0frq433mghk5fq0fbjevsf6tzw2jp4o01do6cz5xp5j91djz7ylb8deqo7p4om1tonsq5qpye4p8wumc4iregn7llx4gvd06jvjxcacs951odyodb1cnr1jdx8u2h4gs00i888lbl1bstae228sykzmnk5sebmm2ma1o6hlauoeuidfdh60tzmzvjsdzro8cb62g44lzfb633qn7k7unb0jtqbr3roc7nzaaoojv5abw1skdae',
                expiredAccessToken: 9788573782,
                expiredRefreshToken: 4216047875,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9a5dbd9-492f-426e-a485-870958a897b3',
                grantType: 'CLIENT_CREDENTIALS',
                secret: 'ndqy6qwiaq22vo3a55j78mwjcrolp5hg6jigok8lmvwx9qeufuxx13tyj0u8u05ricvo2i756c1mg5fgg2olclsrwg',
                authUrl: '5s49ec8np4lka6ijopgwcq660aqvv4lrflqqmh0uw894yd3czv1iq2pjs8g7d56em8t4jyvw6nonaz0wvkoqd2ydj31rvuszibrvmxcc6kcy7hxvvb7hyt7370htu4bgs2d2hrqj5r5r9pnnju5usd6rps2ey0wnx1xjionlmfe6vy3gpe01aos4du39i2yqqxj2wleiakoslwk2zlgjtmhdb6w3h8xufjmwrcjaipoepzl35moztit3ayce1gwkckyt2ijxi0lcl1qtkp2py6p2gjydmaxc1hdrajlao963ojevm7fcm5ft5rmh911033uakcabltinfmn1zf1ophmarfqo1btesks7ui9r5chfkk7mmdp1978bgs8iff8j5c0fzy5kmjhljxck3irk8oexacyqcde883p0eseler8evmctild37lic3e92yd2lm7lnw33ai4hfux6bww7q2atqd3zrtjxhmt2zu7wl2q7yrv7333cxueqnpbq6jjfzc5ckzt72h3bne64m3qywj67wliqvk6hfq4xib6jzd9znqxvnaavr7pnsm7sb45lqrgawtcjlf04hdzrtx8mj6rdrptk4eijiifqh3avukd4ewwhwrqgk4gdezm47aovb87rs410a39l6ujluw2kyokoehiov0rvljdaobpxusuicfeteeg96oo6ktad67nbjeqq8kifrcbtwl73k5122mna7vjm61sjmwbm3599iy6xgdvjjlf5lpfog92zibgedvcdl30wxrx2pqwpidaot0uplnx9ryy9v9unmus5cmmnsiyfe9xjzn3zko3te5g0n98u0apn7dl6c6s4vemxwbdw7iwof1xtleg4ubueiswo1eu5nv14mls0x6an1ua8u155k7651r3sqew0y5gy428esieie20yj8swix4hx10pviebcpex2quowbclvmz0ik8r824qoefhpvsfnp6ujizikn95v1ud60q1okul5xxca7c3d0i7np5o4thb44h58dizkt0m56u2v45om9fu15yypywjdw4my4imx540jtduxicafs0233n2itibwxqlyt183uwfvsof0eg2n0y2l81fa5fxp7ok85a5f6eif0cx3k0ob8qcydwg70de1vnx6zb98bvce89h6ogvnlfay1mpcns9n14nd9wb0s1fjbbjuar8zsex52h3y2an5b969i06qjcpzmnq18vt0e2obsn4wjwpu4nd2dh8p9ayfsza2299v799q6hky8kaobwkx9paq3b05be49918g65po6tkkvhv0ptdqy6n8mlev6ko96gsiyr5biy6nrctg1m6xyv1lrka0z3o3dv2zm6e13ag2edak9ifgw4hr8e2y59va0x5094ebf2hr8ty5ykd7o83hustxvbr95z9skxw95t2a6hubl23ks8n695g501b9xi9vaj1pfy9ty2i2nssimtrwjmqy2bc66suw5951pdv55f8pk79m8maygmplq0ys9dvuxeji3d0lwym7gwxdwx2k7kqa9hb88rgtlqba2hqz66bb9sj2voe0ivxn5g57uxcd6b7sbw7d6qxat4lu49eqif4iac4bhfhw4ikumdmqd4flg66b1iqrrpx7cqtcqw4wv8hclmt1hvzwux8ep7jcgic4pnaxii60p8w1enmghsx4m73oont06g9gl9sr58jyos7r624fjo1smte6qdah3z8sicgilzz77llffzs6u6flpve6sce15irn9qxek7iefg3nxyrjn2pim8yqt64rzkvoqcpdifv4qo4ic1zgd19046td9nt696l3uu878jolfpn5d34odulzd1aherptrlcmmdxetyvawn0c46gontfwt7fo64ancvnd9cqlx4mvcwkdizuvgn1u8g6xvsmnkf47nzdq0s399q5kgh3ot7fxj9nha4kkjkhhk3tm0ws0vqwi3cd73piy5ggfdugbykvny1izkgdri9niunyilzf00rnz6ecggga2ybs2mlvfmck7j0gxssw49p4i',
                redirect: '48ifw3io01afoa8emqh6yiedvrr9d3a85bv14aajto74flwftr4v3sgollivvbdw6nng8rvrefksykd793xhavswiuq6h8gwb8jmi47a7medwo08gsnjnrh6jbx8x4ct9e8ojgl9mj78oxqyd0fdfpxyh93e8ifx69j183w8nqypsxrttjmxq3wwc4hwjq1sx157lphb2uydp3okjt2clo7bolqhbvgjk55x7zlis62tllj2b2f8n0gl1rotcqewjv3lsp9rgph7hv4yy4k8iqe7qsvzatx10h6gdpgiypjdj0x4y95uiah2utozy8qpk1rwdhbr65j18uk2i5tv674dsohe27qy3xom2fjvhyymuobxk25g50yi2b5pxn5nf4epmzfem5rbk20z9q6bwenok0nq1a9b6t9ugre7igls4n7alndqqo4jipugprhpd8mg24wn4a8ekgi6edkrp6ybnjbm99p1v2kpcd6ucp2hsb9kkmnqpeiw9y41syrlxospgqkoc9xbovvzsx6qhwhnz71j1g5d1094td23i1hyx2ngul4euhaoye3ow2tpucea8vyng8m534t7nibg7xy60lne9d9cpqgwtzou9xgui7d652lsrrwzj716by08u5zwkfbqb4byg6pu3ly4pau5j7qyjv0kof2xezbffv1frloxxom392704dzmvwr2d9foa3rgcyz9yuucizr1gbec9wx5fomhcln16q5zkmjf0diuerol34l3i44qx5b90mqaxrc0wdye6y9row1j3rkrgvtlh3ib3xqtk7vitipqw1de272wynuhgu3rtbe5dscjdsf6p8fw2c9h8s5c31r9u2fgs9w59c2612xd2o5ria6tse2f4s3nxnkxr8qof339o6i32jj9lk0umzzjknrnyhs2oz88hm8t18w9xvdi4mlii2u0ri2q3jtltx890e2tntiynbzb0rbehse0pzedgfdlyrdpo854bp2gsn82vobtrgxcjn18y4vdgbu15a7u9ircitiwdsdldfd54hggab66k1jzndu433l91og407pcmd0yptprig81mb0um2k43kqq31e8pz48av02lo23jrn4jcd3cluy3ww4s0q2vwxpdzcgfox5e1yxnw397t1xmia7rat4qh9pgzcvk9df624do75ub1rvw0mtqqb9mpb2fhf1thdcgn160vm4h7d5hg9eqsllbtxe4gxl7rkx1cp0i4g4pwoqnvcprqts2da9e6kmcvkk31y2d2wjoust1egje1pb67dfqtghkpbju8v1htolq9libhl014ssryk9anvrbm72u7urae3yr5qb0oowhujz7u1zfvctepbisd9y6ppkyt4oey04nu6hrd1jctgjyb3uizo61mzl4u4itr89zdtx5d9tps9x8graviczkrzd7ezbgcsd3sy8m40dl4ct38wyszls2ksc5jptthyai07viudb4tvqx9survyioheas1qjyqbofb7ggev91iqukllmyi1306uydedgck6q6w05xyupnbv6zehxniyowuvfojziye272oo8armo9514vy9zdltkmhkdvxqvivzns5j9r1udpz6viktb3hz52ac42yh6ixfqin1wklo3e3swpdohus1d689s1h1d78hork9o7l9ukbd55hz7o06hu7qrptl3r7muqj2r9ayl92e23230r749bh2nv4y0gi62520kyih5usmrruqs8g6lg96pokvh9bu2ujp3yqtglt75gt669cqb22n4yiwoz31wt40gta9h1h09768q6ab5eok7ok63gqhs4zg0qfy14eo3i6kp84i6fya77y3hlc8erqqter1bkzp9u98ya18ypjjy488dbzw2n9ldgewgf6y5d7ve26au76kco1ut6kxdwhfq87l9n1fv2cvhnnco9htwvruy6heohi4suchndx4l0muwkqxlr231kfbf71cd85way1uask3my6gu7oixkv4ae8so6g7305e5ni42vqbk3i34jo78pviz',
                expiredAccessToken: 6484598751,
                expiredRefreshToken: 5716566382,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '20600e44-7cab-4bc7-aa50-30f25e563737',
                grantType: 'PASSWORD',
                name: 'okj9xhhfms75h0wae39uuiho7gl32s647mg5inppgicr3un3dlv4kldx3qi3lv04emrab7cz2pdwz2drep6reh83ywdautqe1a59h7mw0jsc9hquq1no8g08y9aeiqvtkcnuzgfpnw0dg2hpum0nx0b2qx0jsjehgvvkr4q9aolmlvx83bds0mnia0j8i1kodn6bm60ecnyxn3uocl8lh50ygknmvpqo4gvxk13pdn7k3c6l1a81j3qgcg1ip56',
                authUrl: 'qxxre97yfqjeruvtqiamh6n064x3ed0aph8x8vm8toow4z9oesyzynblijn9tpwe0zv4qdb5xn85r3q4vsu9k801mwvne9g5180xftqp92vlnfshgbvpyqrw5hck11yeagguzd2c8g9gieq9fm8jtxfymb09u6u2bq7vjg38if7vyvzqztwchyy3w03zxxo01z3j1515uo8i3jcicppzu1hk8no3sp1u0ztaav3uevh21qi9okjza7la2wkv9auve2evc33y39te04ry6e8u3orbjaxl2l15t26nyn9gwscxxn45ltxbl1kuabox70v2x7h31lz8362g52h54qnsgpp0oqwehigigqqampeinj8ygcu97ws4j97bdb5u875y65imj5fnjo5h1h0qwao154xm0asgzukqg8sqsur5zvq61fhk7u3wpzpuspntz1j9z67r6yr50b6i9hdd0sh5gmwckdtr67bpwu7azqzprvl1yu4nxj6g1q02nkrn8dvcwgewr2pq804sdayx31mg1a1i992hun06zo9ysz25kkf9zlbc4nwx5jr1n9skyls1u9xvqzf2fhhl3xdru0g2chpmlhrx6p0adieux0j35f77ptah2adzye7g964yk5i73esngnvluqcq42mjfdoxgk8c38gtcislg1cer4md8mnt5hagrqpwo8mwuobiaqne0z0ktnz39dvo1ddrqq1o3nvezjdc0i075b30gv1cfej9kc5vqakn82c5qfgmdekdxck3gsk8hu07bpu9snm0ae7e6tsedio19oqdhq4o6ort2nd9uvnehcst6a221bzckp1puue7yjjigz2sxqpjqxifq63k4ne9g36nlz9dob5msc0nd3gie7rs0ebx19rqgehhs42de1qhxrmdmio9yb086qtwxnglf3167sf2ibyh72ltntjmdg8jqmnfq83do1uhq6g3hxen9wmuq5xylb77jgfxpf8b00qoilykmn7t1migekhg1h6nrhyrl2yt72ir83bsp5ngr57dsa1wwta30hnxwm594717idnuwfx95zaf1sf2l2t90ry1aek3x13br0m0cdz0lllsc3ha0wyj0yq00v1zpdd0dhm2wcxg6td8wxojidkws1w1mcpzijbet16p0n2e79x7gptx2p7d31u2tble3zv9qngw5x65422l8iiq4sivuitgpflst7n33rp9eqe2p6q5j9x712yw7go2i6kie4s0witnl5ymwqwcirmtxn4fxi9mbind7pub49bzxix284uyg158hrnnbdcgv5wjgvl9k2y4e6tovjiwrtm9jhpi68ydx5tmgwtdlj5tmdwcfkfejioai1yenep2m0ynwf8nrbd8of2asvub0eg35tay2bi10ybuz4umbrmq9k4hohz60q62cvgq726gth3mu6cfpvk2n27waymoc048zzo930l9ht5zmu1maavvallsg65saqr3nnz1j55eu5b994haoaoosnn36k86mbi4vwn8o9gzezn3j29egazmhw8pdiix1neao2nmi6yoj8zvhbuzslmfqbbjdo8w05ysb6elqxr1y3we1ygsoxts9vm8q6rxfw1sykxs606ltcx1m4zcvzerbzyjyp1soypmwdet497tf5wowof0tiyhhmloua030q6xkvwl34t1s2dhy8tsqa00g1wz7wxfn0nr42i2uvb0rjjf51lf20p83wd5k95cjhf5arvkoym4lng4ampizd5hg5yywycjc6dvzmw1mv5bima2p5n7trahr1q8im4fezzbj1adcucdce89zdzovultpv1hgnn3rfy48kzhuqufubr6uh741tbtl1hww9m169p2vw4738lykuz8kpoo4ubvvyid3dsr5frwogi9vrvx66kxfvaeensweosmf639hjp6z2wpfh2ah5gwj5495mca369qd88ztuf6lxbfv4lvv91vmnx3xlx3spq8itoc75ugepkufp5vf5fhjtvdqo38p3w5n4y3ca6cuzs45v7d01c8',
                redirect: '2nn7bet2m2mjauuqhq4m4lpg3tpdovu1wg0h6yy73s9f0g8hupmmv942w0h2ump2647jhi0vv6mkcvo3bmexp12oi0v5jd37k7np7l6x13ld4qs3c3rlix9mpy9dis9y5zpiq3bvzhr88xorlp5jz3w7bkrnfp60cdkwchc76j1vpb0f6a5jxhemsh92oph8bg93035m4omvy1rhea7la9iaa26kj7zdzetqfhiz1fdxd9y8nyv6hvwx4xq9jlt356cwxze0125g1sh70bow803q0m7t79bsim0g5sooyxr93qideksufo95duqxs6yg372wmftxf1g4err8nufn0eig6obtjukf30hhvb8s2ga266gcj4pw6szbelpaq8nzexyl0e7918s7g1e2xd5igp4idh7p0si06ej27r5gvd4x1kwj2o443wxb1fmii71fcehh0kj2ffyiywyn0l8ut1blaatf4rivdh0nxtzlom1jevq8t6sqd8mqa98ns8p7rawya9vl12m6nhrthqfrnfkr23oliaqn4ijc9wolz5a061rw37s5udw7vhnimfn9p5bhc0ud50cp2lumi4h0xo1eevn09xvwtnwxcdottte5bwthf0zce7p7wvjklx1p730rdf1c9ghi2otmrb92xoexjdms6z0cyzcjigrr3cj26d8elfs4827rjfk7h1ja4eip5rizhw3e1qy5mgbmwe4odduf35lyejf10vb7l1hyi1nf3nnhmtb48r25ghi6zwnr7dfn73vk62xtmpiea32d67rt1xqdmgs640o0mcy8bvx8stzym3vrm3x1idk2xio2220g1erv8yzk0g80tqq0zqv93oiek1licbtn1ovgdsbl5cbmaplgy2ydecurlnh2lrjzpx3tau4496hps3k7nd0mvteuquie3uhk2nohfrj1jwjjhr4hhog01avjv2ok1x0ur4n094u5pzu6otznmgrgc93q52tyeye31dwlwxzyvm5du3uvyz1atzp7j3dlfdeycucocum9i3aosnxgns87vw22s8x1c2jl0rknwmv1ekzti8s0ycxs5kje9cgfz9fnv2cbt83z5qvz239hf4ax3i70gns1jyavaih5jalexlwwac0df8ibyjy23v5gdnkabptf3chzgsiou0ye5ffx2fat8dqyfrwrt47dofhr9aecasigxaedvb3uti8rbxdiky29cenfwe7cxpi81wbms2z7yh2nzodx20ob4dchj7l7jwripi1ww782wajt0ubiy8sqhxaqd33pen560j90hxki6ghlx01i3276flavavfz14bhyzg05v9kuvnhrufglxg76p9qfxnzby6ytqeyf5l921sfgs3mhoh8vd34ijwyaxig468c4ba0oklo7s0k62dg2itvazqy4hu4ag7pwloq8xsn2d730kzgloavqzaefug03wm5kj2kq3ju20gd7a6v0schtq0atm5ioavtksi8fw1dc1a5848mk1cevjycjm7fa7dlqvzl2h5pfz1ojzs1h5wb5fb7vzww5o0he9e7zycygg9w2bcw051vy999j5qaqvviv29csvst8bvnk4xrbucet28m075jkqduc9l26dff0hc233o1l7jl9eopaektwt891r0xtir6x1hfax7b8t46k6yod2l16qvdsjgcne89j0n9y7ls6iu3ejzaw8vonbq4e8lt5bcrvwsdm010dv6r3xp8naiysk75vftnuojywnlp2kccg9y7w4jdb5g2sp5ald4flcnwrvcgexc49a7q1vp5yot7ocvz2ayyypf4eqj52wqqfqbikjmos3tz9ed8c6lybw75fu2hgogf3e0v9m4w70cif6wh03wba593ocuqcidpcp3rhinpk6e80mz3fjyphhroycfj41fy7xmvqqk68aoj61uvf2tkp39o6khyf2oysef35a1c6pixctus1508kj1se1njkptxw5l29888o5qecoze4ic703mzj3wzsibkgeab3p7agjjj4evf6w3p',
                expiredAccessToken: 8614221565,
                expiredRefreshToken: 3639835357,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '84892cc7-0803-4b11-a346-1e81f34f1e1c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5h207zfrw764lw7xs6isr3qoorgll8sfglwwvdn2t4uvtqqtp5x9h99bvbjtgcxcq3dructalyxiar0l7znuoi47yzi44prn553cqdv341yn36uwfji4lnbiqeo0f2odj3cvjqa1z0yvjdhwvt0xemvujuqcswg6rlwo2lo05mrfkno1h5gk1ycv2nud41idrgv5gbu3cucotmkluw79g92hjim6makzq99q3z61yjgtto77xoodld6bp86o40r',
                secret: 'kzs7q6ow2qj2j89bd344nub3l48j1dpscmtnb4rz3hhcerh34n12zqju6lmv0eemajgxzumhgp6gzjpkdm7xp8uckm',
                authUrl: '14db8rok7otnwh96jtereudtwq7htrgr0nbp3t3j6qpupu49rnxo3kmzdvdoe7t7ujzaee9cq8vc77yt9sevz1bpwkcve5c2qzrclv3hngengzhlqn57te2to3p99bdc7lm4bxpqkddwuww155z8phhnocd0bn2t7pj5azkz65ji4jexmd0kt5uj8jqe3ebbetntox6onx49ngrwro3cj9azqqrrpu5mqn4ti99qa0q5693s1si1m5riqn79zbqmeimvqeannmalvfe0xmo05gegmyurlpt067tfffqv6c8rhlboke179tay91aydg4nxv9bsuejsugkbu4gft1udsfhjhtiu0zhn5o58budoetrwhvx2mh0nrcp6nxg08pdaknggfg6thwqr3x1ilkppycu62a6b3q3gyd2hutle4cs1let2d5ugtf4npclrhecczaqlr9fkcxrbemv9p6p4es2zg4qnk2dwst1sc2gttr82iunngaln4bb4ra0e0l2vr5bvrr9tr3bqyis3qpn959yxbsuj4u239ik2jriv76fdqykbwhhpd5ft7npuwujmasoip03iw5tfk02b8jl0v74yw70748ibg48bq2uj42nind5rfwedkdw5zenqc29qct6u2hcith7nl2mazv1jjya6ofcaq75a29g91o2gkwg9w1y1gfai4sibpm00vcykee27hpqcg4lxptju3pm59iifhaafrf13mbi5kk7qmm5yzior0qj7hfjvjd2l84uich4cc55kfzr27je8cbcs7yja94wb7elqmxn9br0nv5af8tzxu0lap7y85caat2oumczwvwb140029jc4r3px2czbjghyaj16fgk5edm7xf6411dict1mgfduyl6w1teglxxjki0tr4o45rotltco1k0t99ljeiq2w9jhinurgvd20turql01o4ux9jezuerv6ygumqoerpfxcdpduuketuubovz9pc32hoy1bsp52rspqvgf3p50qk3j3i8m7rgxh22hsxsh66q5646k1lz2seyyfwkpxjicx9bxyihf2hl7cxzvva37mms0y46ftw4utv578fpfb22jkmirp17hk2ws1c8qzebdc2lhvgquxmx4qaox16t0k19l3b5bt5teitajlvrm4gq7xw4yq28hqtdgtwzbsotq9c3x3tjzmg9bpqi4f93m1uuc0wax8rrs0fb5x4d219hbz7lbhfrmuww6n6zqxy2jh5ycnifj4yjbbkudpbw8srajxyzqkxfv9xxqo9j1proyx01xc08fs3wb0t6rcx9uqawxdntlc3sdc4zl2d0te0taw798c7h5sear5c2f8l65iaraa0rhh5k4do0fvyggx0by7tc5piss8qn4qb9e0ef0j2x7p0lyw3anofqf3dydsk9z5zqjg0ax140uw4x7f1pm303tbsdcgc9h94yk76irl5ne4thnx6ffvo8eue5hafgpkpam4wsb5jrywwc5zj4tfpy3vfcmkqidlt4c7aq1w19n4o2o6825pto8ayxxdgfzru9ncpg6mn9hg2mdg7avibb84m6qegvilcoigcx0uhqe3sge5wp8tyhhym3h4ooxfa01bpk08x21d0x9g937tw3ka2vrsj0g8xvvlel522varvwd2nlj8glv5qojtd2qmj5dri3oq4uze68uh31so266ugq96gnhcldh1u88oblkovefy4ddu8eh61bm3zjotiormog13le8xiec7uhqz130qy8ne0mw97v2k389zt43z8ajhvj1m9za4z3dwvxcy9l0di2abd5beym5686hhasepob3di2ydr3li2xc5i7m6lgti248o8apyloshdlqr9dqe4nhdizcz4jj4fszu5uv1dlma5xhn87fiauyrmqd8n8ndi1gxxsg6n259auhj5vfa1o5ymsl31oyfamb20boxxc94jlf156i2aqod4tnwrntgwzrevvsw4qbq4bnbqzsb0aeu9w3ujhbw38pbx1485suaiveqkgesupadxn6en9',
                redirect: 'emux981xj88x477yktqmsgn0180xw648n0yyec9o4gvlgcky2o8o3u3baac8zsuzgu4sigctwodls9zrm7dodrdbv0soz0prdwu1g3youzm1rmk11qkv8amp1x6e5u8krlw2mil0ll3oylors2d8q8qwq8jpl4ls2z5f2ox43ngp6p3e176aeon14irod0iimaqsldakahnh3qgk2326s125qo2vvwlclwa7rshidecsf6dl9g4uvuw8pasevyqieo6lu1f2mv7u3b4f8f84p1xypzhnsmfdkxin6ss949jvc2lh2ywq4c5y81348sdlsmp78golob9itaz3s2u3pin6z34h4f4jo4v5d39d9znx7a4lj3koaq5dypo20qqfprs2ew2m8ui1xqc203mwhkhduve2uj5cklqed3jyrqwg0i0186x4si2433shn1ykoj4absskas4duxgtllnm7jq66ref11es0dxm4g5qbuwxjm0gm4dnubc9qx0pzg1sg1exoicclh5yml4875f9lq3zik55258hys1o7y534eq8uq5elvay1gldazscvypc5qj5gwg0xxzg9nysnjpi0wfyy8r6retphsigov6gtbq5jfw8qv2c7xeai0a16rtjh8euaemdhvclo7d223mld8dzdx4a31sb5fd9jrofjah7kjqldtq2lxxi0k3tdzo4gn8tjwym0msn7sk46zhuqz5grchid0fxxu1omcn9x9l6duco2d1q074g2wh8swuclfit3xm1wt6vwypxfg2xrc2ed8uwltrcpfugtblpzd62oywr2lw2r38s9rf3e8flf34ldzspyl11odq10kni4xt2sjkfqa552vncps3ryujva5iuh7wf42mxa149r36kze51idzpwhulcjlyb5ei24zgy2xaqvc9ipyw9vit1e1z8655kjk06r1to4kusnx4275h0ln3tfba5qm5daktuhdjh02czsclw8stads72u89n5l5zocw70ptula9dsrxb0glo0ldoqbn9t9l0gyhlgsqyjxqf3teeun04zzdcmqc1yyc1psgj5jso063qsb7sxkzmo93qmgtzvtn9n3sb9shvrgcno3mrj6cyppew75ogpskiljkbwk533tz6szi4d8mn9q9j2x408uj26tql1rurynt39iuiz1h7nrxcge3yeqhic8bprdyuu1qxflvman4ovn1ewqyan1dcw28r4ljygwe00wzolidwxghqg5fdw0dbljywlbm53v3cr3dfdagwajziwl957uent86p9kthhkpppclr8ekfdjhwd62dave3ysddjodgrbnzy4ueckv4mrzzcipa45qz95s63k49pmew36a7kk0jdlof400skwxy2yhyod4eun75knhg1la05sqwfd58yhu43qs0f74umlplv1uax1smy3xu4mfjgoolpnsapgo91mrphtcs6k8szyslx42wkdk1tqsv5bimee8xsfzau033nng37mks897nk215u26dyv4ff4t95qvf7503350mjbqxdzvjcde74auyjmiy50o2vjo86wwjgfdiv6cvgvvunzj3c24dj42u9pdst7h8n3qgysrci360323leqkx64v6y7zr178v3wimjwz6rscu7ddn43kdubkt5balnztywbzgyyv1c1tsa44gg5ydb0ff29t2ofysc4jwm1c44tp2boppn3aeyuydbzcc43lag1ljqndnhfnez3b8bvpvew81zxb393gplotkstg2sh0bo9shylb5jj3jcj6pgxu04aruf2kn0gg450lke2ijdptcgl88iauwoyu354hdbesrx7bev0zw1tdzc6znzkmh06urkpb0ql9rlvwa39w5yf1xivqpsy58dfi3fy6bw9g71cu27noc0p0k7y2tqgwr7qoveoz20cs3a9hhjssng144bh93iy2jxxvdf34re3rqhv30ulfg5n0kerf3br9nl3peeta6z02zrww9bn66aocqdiiset2lh0uaeh0zyj9eghnrzyg',
                expiredAccessToken: 7538722318,
                expiredRefreshToken: 6350454455,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8eb19f99-50a7-4b19-9982-1699823c0c37',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'mec8lvu8yg1eab5jigbow8mzud9j6odoeh5o4spr17n4sqj4z8srml1kbb03nsb3jwtg4t1s9lc18r3oeovlhbbdnxzws6i55atisirllfkxxuxgvcrh5he3d7z6muod7zdkkclykq0zlufstlh8w958iivbxyjyovaslpl39vlr3ixttsogs5qkw1bynniiwlw5d2kuzrw2xmlop415sagsiw4nmzl0vqvnsw58xl4n2ssdgf50vkvnn63qwon',
                secret: 'scwwxd6qz4jbisql410wlau2cvat0ccomwv11npocv61k2i4iypn6oz0czbnf59wepcfej6p70yc4eu4v0l5vvbrp1',
                authUrl: 'yzl6v6cv47b0tazbxv5onq0idllmszxdl4a1iaur7bh2lv17ajs63lz3oksj0l8909pzsksdevy4h2924v12a7rkbrizpjrf8z5v55jk7a8y2szl9zccp3tbhyurtjc343fstq8owjqzsd88hced2wv1dtqqhwdbvwbj78pvzueipjfrvlvkgf2sekz5aqfus76cyjnam4cxcir6jbgypn8av9vzqfa6y82lnp3iz7n4il0ib038gls3v5jkg0cc7vvt4uwqhoynsf599tc3sbz69rckhkbu1eoklao9jbqdsdroy1dx3x01zk1vrzdeg7tu9eln7bzchuwt6xudx0qyqk34do5ieow84f4i716335yac5jwlnwz28143jcd16ehgyk0173fg36rz19gzfkp7ulku43uco0nk65lx509pbnlpsjqg34cjxd9iu2qpymmk0lg9qgxy204m04sa322eosq61w3rzzlcs0x38j6xrahfav8mic1mbrd4n7e8w60o9khvdkira9pvv4o0om3t7q73sk0g13vmaax06xqdkw3jhdhe4tzj8kzyw26esaoqgqu0bf6d915yk33zzh6zz8wyfxokloiagi9nkz4d1el0uv2zrh7jf7bfjnnkxdrc5wtv2qiu1yxb3e8edcmwni5ji993ae831lwbiz6jlbgcaqwi2t9bo1g9c3lvrw8xcpto9k1dvriiwa3w6q5j5k9ezgzn9uqyd3kuxg4kyaa3q9h0fx901wdypvz4wr4pc3pab1imrqzl27qldun6b6n4n8ys99o7o8jh0tf0ivtlsh2sm32uk7ogqg5z8sbyngynjmskl73mwl8pjmgsriavf2mzb1xtajebnyraoeg803hkqxr5f2bi5njkpp3p446809pnbbwcc7pndisv5tdr4m3k5jilp1i0nvxrdnvr805caxcykqlzuh34vw59ce3wcf94o22a25dc365vx4n9v292gzp8zsi65fooamo16a6tyx8ewi43zf7m5zfhmk2cxorrw7gdo4nxev1dz11551kzb7wyddj715ldzqk9b64b4w76gwyonwsvxuea1x4qc8zcju9ga1vpjikkga1ivfd0ho0gdcuecfvkn79limvsoc4hdb3eno0pn8anlio3mnhqfdazpbz5wyehkkc92os3nl6ei6owbikizmnfmlojs8dskhp1vdm0maxlvsm8tcjfhuppeasn2pe25pk1omka2505xjxewpexj3f8vnx87qc2v2yrpt13qgz9zz3gj8vx1j3h4f2fwr4s3l5hnim1w1fxyt0tuvuikdcyq1x2nd2cmxuys08gakfl5n8pq3r6tx2h6yisjqgiy4ohwqx6hbnlwrppbuewsybronvxtqewl9tlqnz92xmp68gibubmcywbhbrl56ejce9umisylnojdd1mwhg3umzyp0iljy5rh3heb6ogd7vncm4umvtaq7t99id4hf112o528eaj90gyilf5dlb6nsa7n4jajss2ptdpu1lllea6684tb8l1z1gs2z7tenejb84hzxl27wz7304yn9epj9ukcyw4hr9psip41grh4edplns881mwvawa780p35mzba5etsbacz7bwy0z8snu6tsav7zmhjcjqsgdi9b0lyvs3owixw0a487yocjh1rdqj1t7y4j5m44edu6hr90mgi1wv97av82a4li3y4ck8b2lx4lzvwag92kygxe51y41wybvtl3om6ht6ga37ni0bpkn49jfi6mrdpzl1tgzhhgpzwbv9nruvmot72fwi44j4oouofhgugezfhvmwsedt9hki5eoigh4okob5n9gtgoi70xq026n2cjlz4eoq20lyd34xxh0h6tg93lb9goj04yua6sav94kv4ao1e1g7b5vy8nt1rerb9sqyrqn3zjna6lect19sr98if0xyepb1408izoe8ef3m4vcgddcrbleai1dhbx2jp7penoutkh24vpagipskyt0r0nr6l7u04srz75dwz0vmb1notg',
                redirect: '4132jpvxfklhqtseheib4egwbnxqrhas2h7tkq3phfcwis882t2hd49qxdv6as5jmvii981c969be5latmhug9rrgbnkjfpqs3528230qu980ynp1glld84s26hlvnlrpk2f0l6cp18btznk5zkqdrdr5721kwyv1d3g1yk3ryubaubxpi4dvn85ehn6mgu9bxw2h29st1zrtw2x6n824xgu1vq4h7674bhlplniv8d4agm93rjsdjkrozkkc86jnwd2bhcretj4u20oggvwy7yhjgdluyut5775tlojh9682h1edlur7ociytdvpnyey9muojfnuzzat7cy4o5ex4skfm6p2rvtgg2nhov4ajowc1agzuwiq5qmtkteuxvfeqnhuiotn320tlfldu7vlwdfl417i50s5psox2g49j4hprld4zfg39by6e3vzvtbalm837hfnv4xvaa9zstoj511dxz3y6wpz8o8dcb22ems42e85x08f0d4h5q5hw3tozvnu8sa1k0a2bj24de9oxpwixbtsz58svc24jz7az3yugsu6j5v9r31vgiy52ffx8qf68oy86lyz640i0732rviymmkxkjff4i8ox8giad9pmjmacto1eziw9ctu3c2nmr7iheylu67ki2nhuhoj8i3wpq0vpnf9flbcd6busj5qnbduw5k9eozj3sxeojgtqbl3vc5nd2vcmjt5f9y22v1e5a1lxw8bl3n5c317ks286vanclxz8oou1orpppky54mtc7ocvh5iba4q0xn8dmrz8rzqe854mmuhifu68r9bjd4tt3q45nfwneuc6ha9h5shusjvbjm22acvefl794yv66mtbm6ba4bil4fvmyhmcm27hce8rxorchqsa511zlnpdmjsg4977a6evzb7lg6i2x8xtshnzgq0mb37j8uztgeonj6nwkp9k4jzq7v1oet7hvega33lk8qvwm9uju9pw17p62w2a19yu5whn3mbnvlqbdl4sgxzosl0jawo1fe2ztxjub9qfeo529rrfeayjapmzpbttg32l04lu60m8qfa9xloennm000ck4zr8kkcfq7tascvoo6sp9z1ga28pqhptw8xkcf7wq2e6mjq8qfrq8t31mi7xfh4zxt6nmuxbe24z0h4zuhiv3qddi2taovlx1y5cr7xybnt0u1u9oyw68bn1gasf7vxvtpvf5ocv9l7ffw3om3eq2qbjtnwr1qrb6oui7917xxy3agq74rvyzmj24i0afl6rwde6l16rpebfbo6xrnmy71xee1api8hry6xt7btljgsh2thk9a9ymte6fk9zou30d3tn3nqhvlcugynbef43p0rsqnj7hmh0jm10jzgq5cqtdl1mzva6ji9gz1tj1wjk66zdwvkm71mpzo0vzpk90so5v26uxu89o9w1ri8l6gb3rmj1la3oxip3sdw2cyqafelaxt2qrp7ngqh0jq98jh975kgsyl04iq4d4m6gu124e0vb0okk7spp7u9wp4ilq88dglx264goyi0ahmjx0pe7iihsnjwuibo1of5x34rbo3df9kzglxwmbdziowqhsmhi1df0njc70fvunvw57wh82zc1hoxzynjrbghb0pwng3tki3ux2avpxnmmvh2falewbvfdd278z64nn1d0lduzzftnd4pspj23373ekud65rsrvfaribatydsjh0acu2opolbf5dpah1c7h7zyu482ekxyqxhrajw1ule3u5bfzmy4af53e652lct4ytpjzptd64ufsbx55eao0405tlrrynv0lv2k2r7yrvv4txfzlihgdqcymoir5daluqvdlb5r8olo2tnd12we3t5tnne4g5t996ydge8wr1feu3nt5owi4u51oyz59lulllmfkk58byurjcdicnryxpjphczwb5kqck6gpttef7u15vsw969gxqye0re7a5k9wcox7el2i09y3rt74y4i2ax7p8z8mukokajvobyqcfm31dtumfms2w5s28vsvguirrr4gd',
                expiredAccessToken: 5503930232,
                expiredRefreshToken: 9604343372,
                isActive: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '496hbzen848jqnppj0zueyj5ki9j2an7mxf7v',
                grantType: 'PASSWORD',
                name: 'ddpo55s1j93etr3krctrhwkuos47itf7frhwwyh2adoum3o6luttt3n4jwv6nsy59bwp196g6wpevhpg2wzvgtjvzj668u5cz5cy05w0l0mro2s6rfxw920h7alu32gmqhqyewonwiyeeotb3ohka41qvsn2a4qeqvlb0ony71sxlnqw1rkcxpm2nmpgzya1bbnhyko5k56yl9j8zgx80uv1tlxpudik0bvi5zerrrzc08q89zv62deod5hnrhn',
                secret: 'p6pz212c6kf4sxdc4zupjka6uzh5v2uv6khfkh0a87lcjjsy95g55aolk03nw311jz2cinl4ht5iv8bsdvja485fi0',
                authUrl: 'zgv4wkdoi70qdeuqqggu0qe73oefg1o9ruh13cff9q3myvwkwe9rb9fkmvt9y5uydb857d32ujkq7w4x15ofbub4a6zmsex0i1u9owzqua5c3sjp7vb5d1zt6r5bqerl1gov8nn51v4l0bmknu0orwmonxj3nrq52vcasz6lg9de2nyrciz1sx1grwerx5xfbhvwnfzjd5zasur9pctwyio822gfknie5uajqvhs7w5j6dcz94zy9ho3lwtx9gcj6fm6vkl5aze51kbcfpeaxziw0z8jgk9uvree0clzv6scxu61djwq8qo6cas7ui54z1t9lr3txx71nlssbhctbrnr334s584rir9qzfpsj1afxh2fr9922gszorku55kntuehwe84h4qqs44d6n6dso5wz69iyv3rw3xbocbf723oethqftayrfctbls0u3ehgo5zqs2mbp3nne9sr6je9akean8ymhykjz2axeq7iywavou6bepy3zsa7qztedpdh2rvotlkm0sjshe4ipb8gh92inwrfhxjkpb6ma1pa3jqdkihbj0gttetu5u0ileh49keixai2gkgx7cw7zjd68zh2vczrnp3jqnjxopgin7xwnx526qkd35b494oc6uiod4phgj8ht1ygn6s1s1w9azwo8e4xhqtp5hg5jxy8jthmpu9pab1adsfbvf9fp810ttn2a30v2t5b7ngzewy51ed1w650pk87m3qkncvkeejfa515jjz9ze8grtnpm6i4qxoqlbtiatmtstp7ixaoibjsjq81iirwc2nnv8ukhxmmnbem2fq6f0en162r0oh4941qwen4azo2cvcxavqgni51ma4tqarzxewlr0tgwcdwp9dxrdaxevj7tv8mjq7xy28zk28rcaqgklhmaewez9542b3mbmhno4kwe7bju0htt084120sloycim2162pp7xqwnx7jnz1ub22wo94dv2dc3yemawgb6i3hqcmcdmhcsao3untq7tkzyz7ry3s30vzop4gy84lcb5iamk5yk434m3nq18b9ypoewr9pnorp59sif0knw847lxyhgx98eez4dgnrrpwfjv5iptwsopja6p3k3sjjolney2dzf8za4glikcyz1unfbrykwjk4xsmmmxpc5f9pqa8fd6jl83kqedm0l6d1g7hc7zp7xie0o59sjuvkd4xntrselhfutc2zvshywgr5sbwic0hgoiq5bunbh8z1q7c9bwpfbnrfv3chaavwrd8cyjlp52wc8uukrpwvt11bh2a7xcjvj5exienhu29fhho7l1tyffnvmof7eg2s6dmhpczhgue2hn2ta1wmnkiz2n826ndg0zsgnuqkj7jjvn87gkvqy49n7cot90zfhqvrc59oldm7a9g8qxa8nwq9jjs36knqmtdo3z8dfdfulyyd2qqor0m3eqwdasy44rwduaqdfn0rm0g7rdrpaxzew5r60s0ob91nmwoms4fbb05z7fqu3gyvtkz0tsz65u3xhzhuhvaxy16osm3pmscmiwnrq2cv8mldjn8xb21028b4fxu3ggyfbtlvmtw0t43i2nkq0aknxjn2g1uurz6shjxy0nchsahofbptks1v6qwxpfl5b7vtuq99pkkges6ef70zow3nb0hcb7vf2ijlxem2xca2ybi7ulnwknrgbsvu949gs23wzhebmqd3c65s1w9iwmpqw42n0hlaqpjnw7i1f3q6v7v19rmze9pqbe9c4t38yv8y2l7avg1r0lupntusjmzdcw7tou6676i8j3mp80etvyy825yrsgguoj0yre7x791twmw0s99zl1xo4hus7lnme7anxi4c8xn0d5jqvocgl1vy89wbefa2dhxz0eanea8wz9htwdsdjufzs2v1inqnl7byn8arccjz6y5059kzsg7kmrxnrpxxn0qahig4io6x9yovn6wyqw74w1s537lstzc7tbzei09w6meoa452xt3onna7fnagxncapq5l1vzb0gq2lwyr94v58gvo13d',
                redirect: 'ggthxfv9hy0fwyoklgvgavj4r3ts82em417hakz5pjaq5ps3yzudaf0dsvnnz66xxdqogr62ybwftq9w6sa4p5oh5ufp0c6ydmkhw84ectxxhyp0rurhmvb8amqunskk6azskhleq1oiamuarg3z2etump3vef51edsy7lsvvid8gxhvgjlywdspbt02aszku4b25i48oap2xrr99qgvx5ucz4fo2ltz7i0zhiaz58ljdyx7rx2oy5ugitojz4miehbxghfkzl8ew0prrokfani2c8bz5u5gr7va0w73xu2o1yrqge65vzwslve3tsrrrteiemkyoeebsw4xaja3exbhrc8vxjedl8ozfh4v60qu6irdlam24d23ydhwlspxpotkiard048m2xkkc1tdrk8v6aeczh4b457yv3maxzip5r1py6or7d3p8wvfgqv3u6wa7ec4in6fxrk0a3dmy7d9pbe51fan67t3yt7ucyniwzqh67xu6f71n21tycqr4d1e76r0qeizzwpn0vxorqptheswaewqhgp2gwwabvfct2ohkqu4vfxy4lmrngulyrluvs8absiu2sw9ir77f5updxvrkul5yg2xtex33njio83ninzs4jccj56pmbiar9n8tbig5g03gtl4aq91u3fge540rcw4sy76n6g847a0u2f6k9ju56p4tm4os3clv5yffba1ro6i000oipjwzp0dr9s697g3smnj5be93w75j9qvr137f20zuhje1v5wymypob49ow5eiiabo9jvjtfi0nh6xwplc8kfuhqao7weoilowg893i2nkn3php53qty55mu3hlc1jv3xu5fp9bifyb7vdsqe8if783x3g2hy1n7sn3994k0r8xv0wj2t8ezp0vpy46a7y5r08ywiyh9xst5igrvnrfkeo39pk1joa3o0b3tfoye5tt2zrvagi3kbis2zhi4g1b3tzfvvh9vbu2pr6w3vbvt8gtobdwd4qs1r4o89aolfx6wnqvhc0g81jnbv65mfe732ylwjk0mfgludqtnf3oi2872defqt2hf9ppj1bcicoyv64tti0kp4cjnsn8okcfeejwfqlbaewf6p7mw1ph9c2kz3031znxbfb9nxe0dv41kdbos95ca98nns1m7ytpog8bv6u5ko0s1pkz8hhzg2txarzbtap186cdpn1g0fkbneko2h7wqe1k80mz0tlev5wqhqt96kmm87qm19d52o25zyxgmibb48wao2jxu27d878n2r8deh4vxl0wa66zzzpjzmphp6yow7qv8mnff1g05iy7bykfz5n6m69k1kyv0v4h34cs0pvor93q1gsms13fv05mtxdpi3u7zog71s1npndedulfhynqbtd637pacrtkaogbits7ujba8lu7kei8sj1uxdewa50of80go5pd0i9ye6yd8w9h18rmlntl78o0fahnicejvtqq3o0ssew3y5cy72w9flcseoo28w5yrgo85a4sfspjp3tad0ghjrhhidrek3plhtkos7wha254zu1ffegkh2be5efg2fr7l4ivndi5828oqnczx38xdgbqap453tx4hcwycmmt3qqrdgifnphp4syvza9sp0k6q3xnp5z2mzbldzird8up7cvyhr6rb8mh58qwmxwmi9zkgky45s25bs8oinh1cxvnmwlyiqafuxk6nmcxavc635xtly6xahfv4h1a8qfyelrr8wzt1kv4vfs85r54nykhgkwpu1p9skku4ehbxlsebekhvi1auudvc0p0vmir3bicipqm9hsjk0t8k1uwdflg5zzxtsg7wzv7e5fih20dgpzqe85f9e71tsqg8x7xkjz5o3vpos1660mdt21qztumo70m3xg5nmwj7nyzt58zmplrwb8ogl234gi79kbkdre5tkiem3cnklln355cqp3perpq62uli0zjnbsey7jeydr73tgxgxxzuarhdxcucansta42vssq7y65qpmtxykmxxezpmpqnpa6r0gdz02me9aoqu',
                expiredAccessToken: 7185017718,
                expiredRefreshToken: 4764031599,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4f70229d-065b-4518-b1f2-e380c62f20cc',
                grantType: 'PASSWORD',
                name: 'd8pt5jthto2v5yy5pwo1spo3vxz5694x976baplw8hrd5j1whnuh8v2fzwy3lt5vb4gp0esstnoyg37sqj9nafmv74ntvokkfi6fqm0mf4xdcatekhb8iyy3tp38kup05i0ktedy3h1y6663d4uluj3l14dtdq6bsldyu7fmn0cm8xbfygnszrth9j79ws4sliai9td5t38n5qqre7zs7solujcs65c8opu1d0ri6oibn1npuny7hmho4whl1aq2',
                secret: '6cblvvq9e5gii78tr708xx2r2trnzuqsj2fizl91tur9civ8wnxuw7hf5gvgriutfl3piwbac5zfhem11ugfsur5i8',
                authUrl: 'zk0n6yhrn1c1iek38qefzr6dlqkkr1o68tl7o7nrnps958o4sa8gqffwp2238lf62c4nhsekbztwgeyqdnti4l07ai7qfjit6bssoku4l450vmfyf0xukr7t7x5l4jlzehkio3f8hkj73ljp8wbgrjz8b2c133husa2ycl7ixq52bd5s5fsys98jqy7xnwlc23i7t41t5od1p8zchgy765n89brngeaefyeqz2atdfci1uo2c7x63zwghqxhmrgxve2ne77khan2qxlvr0v6c6l5wpg6hdjmb1662qm38hhtyq9dfy58eha2qiw3f1fx51hu0b3yv12f1pwtafjkps30s9qzl4nisedq4fv06znu1icuzej7zp0ierf3b3jm9mlyq8ty9izeljkftixw7ei5zyz1n7qrbc3944f5s1ohb1hze141bhxxsir8cu0u7apniyurfaie1hkvnrliqbw0ziqflbvn9c08d89wwnwod2d22d7zixr4rw7unrimqdjae4719wbj3me7oj0rvn8ds0jinwn6c0wevucvpmheaowk2teertfzi454a0pyb0mtinmqap7v07982lz1mvyledyvgv54wrlfae4lvapjq8zwogd2awie4yx0hcdyyds3jttx0dmmjk95qbbqtfafdpzf34o276dws8ggugqt0a0lqzi52pzq84x3oe10ectrrd6d2ufpnjp0iifp0hjfoq2f04jjhnhcpdmbkties6xyppf4w3yhoe2dgedxzuzh011ju54qtf8tdb97e8w8iib5v4v2k193rdhyhnxu1ywtkx78g4lq05dqfdv9ll88b4v7qvkv1l75br2fluuekc4zf8vjjhs8ry5a2nyl401gze335kr19jkw7cdb69u9vxizs256lsed1yn375r76r0ajg1qvh3fkd0b3y259hkiv7gj30xg4eecierve5h5rgujavjdshqtthkpaz0co7byzvy2sskrxecpjlrsfy4zweasvnrsh8z4uhztkropdkjkk0ey99rtmvt9mmfincnx8anfzyizjvxzdvnmqc7xu059qbngtahtv8sy6esmw272ps3yclx8vrc81kcdmsoi0sb60qz0u7xdd8nte4raksnc4kyvtj3xu2oqjdpm3y7m91o6ubz8se2ha9nue0esjlxlxosubtn12bb4lktijrxpnf4x3uwsw76ekvtdv1m9gz5te60qylhxpt3iaj095umle4zcup04mybgyi16hp4jowx6ip2kajhp7wynvnx5cncwbrq30fevdrzwkyplf0rka454l670127yqvpylbuugpjq0138ct3jiu55ka1yfewi7pq9k67npxw6g0u0a6saw3n9jlam3a2pv31zrjx4ca8ojx18otkghasideq6q26zbpzbum0qhc1263a7z4ikln61880si89fd8lonq8butnder7aeo0a77814vdqh9cg5esrpt6kyce6fqw8ayfcs7vyj8usljv5wuak0kxupi15lala4o83iofg4xrfn77ew8jop9z4h7lddt8esj8rs3f3nlfreen5repdsm4ehqwwsptpzerllqinmu0kgfhy2tkba5j7my1py04wxiwnbquisvgbzv2qewrvldtcgcb8a367w1wzw72cc08tfxuoaolx5tnbyw5yeb2fc2dthxrwvqr83lk2ny47g85ct616cat80b4g9xu5g52arlfyn9hn4wptfdj2ql6z9igqzzyp4n6u6yvcciy854r8da8aq7n6cfg9j6gonw0hw2jtplcspzyc4cr1mt8nucny1tvyrp5pbau4t3mosh3g3gu19mtfehxw5uk442ae5fgdkvnmoas427tvyh12g4nznv5hrk73d51oced9h1uziigse1ht9mk5p5dwyldyy6pbvnm14dpql6eegck18p4gq78vu3511yicwemotnce3s7bsf174ur537mlxo1y3rcb19j6gl6oyhqprm23e4b6d8ucdhpo58s5o422fscfhjap03ddnw1s',
                redirect: '8y4psbyy4p0ie46hif5x32scej9wqcrsyf178v7237tz861lo4k3g4nbmedgm3vchfk8gz8ojzx4jel6qd42x07tbi786m05447l3o7olhlxs1u81k67xz47q5mnxyvjimhr28ws4nkj0f8t1om09q4krkh77yq5bfs32o09r0jswok482lm3oqpbrb64dly8xtxqoidljsswqh67imw4pzbg9htwycqhc24qynxpbwjnqdn3yut5iypeyv5ziykcmalg4nd3ot782gyeo29769remyov1cz6sfhr6tdee2s0m0i7zp4tq63ykwm95hswm5cwe1gpus1gqyzj5z5nuvyaq3dz3auico15hkm9it2v9jw0xte9lncrzi2k7qnvy7aook9z7h4bu6qw6867wamh557j51v6oji0goxj0ds9za03wzaajrw6skew3417ugkvjgd95zolggzkxjnsb0we8xevyi8h49f09jr1p028i077m6u42qzempmxgzkah4zrkjodnhhf0t09dug55tu15l0a8wxu0lkn1vn661rs9djveepw4t3cscpm9wx3pecg2xwjcr02a37bzv4vhn4ljmzfx5tbm3lgly3c0i7pg5zsojxe9mu5rnnvacvrbbkho289rf9xzjud80zdl61v50ts31sgs09e65qy6mo4n4hnj7fo65dqtwce9lo6vcj0s1rb19nf70in3ibykxh4fmuqy0fr0jgtadklvz9cmbtqsgyhkrivojc5w4269f22yf8spr8y6bu35fce4zd14jommoedjqmbjgfum3nlukm9h1s2wbvivlkqme6ghzoqiggr67z3bidtg6l6wss1s2vy8lftqmqoiuonpqunb5srq5yp4edbrjuudrqjv81bg1666lwdfd8mjexmzxaxuultaicb5tjsx8lnenhxl5yj7815kkicd4zlkc7osn74kjeodyvdj3rodhd7rianwh5imomz7bzovldu9wrl1z5jn594zttyi92wsu2sl6ly89n4r412e7j793tt60edo17b8za9rl4ajvrw9qfcwvei9d0r1bznhc9gtiez3ztpd3lt6cy93g7pl0uayce2g52cvze43yx0iymi00r43vk9ijkcyfbwgjho6ovty8gm9vmex6kfbjmhuqpviyfgnytfd0jlu8s8prjuepk6cli8os394ysoojek2pt0ohlc75jr35457f1op52crzsaumvgwsmlv059naaa438gj6i1db5peiv397nbcr98frq6bvjp4km20veldou14bkjmoanivu97nt59wvcgvatncrlb3pyau17x9hdkqw1kck21nfygnk1220yo7pvnpl968e53w1qlk0ofkj6wzhil2qaz6stytmon2dm8e3f2a5iu8x26sxa999x8y8194p7o7ad5gkkyqc668pysl3ar4fg93e4zur7m4kr9vttkyegupuca2o75abu53wf7byk1ag8sb0fpj7vnsztv8yr2uzo4om0lxjm86s1hp40yhtaorlzk5he7bh9vdjkd23v690mj4yqm85h13yccavc5hyb1c2u4o2bd014jzgpg20lvccrvapp7vryhwve35xsvr6pu2n9pqmlgaivkcmvx1e2wbej0t0eunl0mh15rjom4uixshgh3lgtoe5iezxnirpfw99s6q79i57mezz3rbqpnxjgvs7gyvtaei6u5o84uxylgpa4a5v4dtppsz5ffupazkv6i69i2u195kmi0e03yl2pddwjr2xmdgwlu6ifwwwwgiylov0ve4qrxuq4u824283erceun601xhk7goyayq3rxvqtpcj3bnowol1tngemnrjsiildprbsmqlz9v2r7pd2fakdicnuc42cawv8uut4xn36gro70qft4uoahoubldl23i7asz8snaem08ccs0my9b0hxy707gr00ngz0ujtoo2m1nxzd25s4cs70f6e1q3f209n8rnzmp4nh0162l9og0vi6gejynjs6d93zmragzwkp8ubacw',
                expiredAccessToken: 7579097279,
                expiredRefreshToken: 6707643009,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '26169297-c00d-4e17-ab9b-dbce22346d0f',
                grantType: 'PASSWORD',
                name: 'ox8oq5pesbovjqfl71sd3m58497o6a97j5vi27lafp0946m2h3ilha0w9c4a0zvtrdz024bcn3u84dk6oyp3su3sritmodagr4qdqiqxax9x42hgzhhlvz4jw7bjk4tohimizywiifsho0irsbrtbdn1syyyum3op69wmchyhmc9vig2b4qwp3ud2xp2eiami851e59jmzfrmlgkb72xif7jgxti280l38zxejoalne3p09ytvp4huvvxzyxd4b',
                secret: 'ddw0h5uh50p7kqgb4z8fd92upjamc5b5zf9l26nhry794u11nszx9tk470498cwwlsak875exwtoctws25csyx4q5q3',
                authUrl: 'fr4u7p9hlmfu0n17fwiw2y1clvomaos96cgkw6cwm7zxgwal93kuc8e8mxjaci2cyhls4we32nclzk7cwybhkw1xnw2hwl3l95tcg4wnx54hx15seb4aa0bs1ty9ena84w0f140tafy2by40aa990xsynvcrmbo8rfz7y8cxdm4d2j9gbd4424xu3so7tl0wdydezkf6ospc63oquho10ndtdjltfql3gyrhhhaek5nrsaxhr4giyybi3cnj53jorx6gmfhxjqsjnzn23sus4jgcxcdmydyosyysxxl1bx9n809r3zegptw2twgrt911u2ukdny1blmci3sk01kr4py0z1rj0167616j6541oq2kuenkbfjnw2awq9bpjqt3phfi2himq15lptnkssxvejdhjdht6akedcmyi4sfeq7ug1jrnua8qw2lmond8he1jdovl0v4qo3s9b15uermlcdhvf73h58fntv05z1yi9rcxh17j61xj7vt2yfi0iy6ovi4157tb9n6ofgcbu7v5ml11lky6lc2pz230eg4v9vqau5peobzwphnp97l6gqheo7y123tpfgmluehoez19u0q48zcj9jxvv9jup25dub5ifbvlidunh5r77z77fnex80z42mlr7t7b7jt9s6e6fal17kykcv02ui93zgs0qj4b0hpdtxwi49ltg8b46ksll53e0oxv66cdihkcneodrg5ttphe4nkbjd52vbu76ppqseotmlfnvydn8g28ar86q4z0zt3e3bxk48rkqymjqc7vpno3hlwrr50bah0r0ad7qlzrl3a9v9vi7vnpjw2u1pjj6p1guh0o5dejc4zphstih63uanu3p0oqtdqe0b05w44rxe26laazz8zsyid54rtf1ui75fcrv6m316uli3dygi0ca4vniajiypjlil0tx4cd7ro68uevkld3uqyai01xlszr4fj4lg0d06rkuhyfehd8ppxgtb19t0frfrw0at0h1m1j8n2ty3fr4wvk95lznve4n5qbtiwkz8lxx0a1a0wnke07nt9x7nl3wbzq41nit6sx15njs4bs0hmw69n7s6ivsq5qm1okwvi3brr014o1lpqk7yo6whqgz5dzy8qpvr2islemyqrleu21yuffw7z3njgypt2dlaj54s8upr6dbqtzkjasjxi8mebhkxxgk7htufl4qkqkby1yxx6ex020ich2yhy4md0kkut0nx1bf6xunx2t286rs3fffvotxmx8qzdceuocp4z8mrohwedslypk24p7t9hknlgc0gj0g3stvawta4kb3nhgohy2fp1xrfasuqzbqqxq3ydlw0pn4j1nb8frnsiyekmab24e3ur59oaeffqdka96qda6wz3q7yijd1ve64rmwa406wlzuj37ug519uh6wy8tn7btvkq62tianhby5y3algydgkdpagll80okebisif78yu6mvz4fl4zcxst7ji62i9egkhdrrr49h0fanj8vq3njre6bsl4lu66zw39tihs7o9mmv2p9imjkrbgrqe1mhaco4914tqn40fp6fcae4v8j9mlfak82ocxe6d861g8hzbkvtr2rqx10tzdx32a7u2p8veqzi9cc84e4udld7di1aqerfe35yc5mip8z99o7mgooz22nv1iqn3x52r9uqljby1bj382xpz4x3ginhbyos33agndkczaaqolrh75elkmbqp6r7ys21plind8ayp1vhihf2mfrgxknx6fkvszzzcoizl8eajd02gk5bgd9sn2a0yhj8of5kdkw4dk565pdzhow14q9tt6sccjl3q5mb1uh38iql3vxu76q66350avgwx2h6j1i0e7t79q9axtw42ullxfjx2txxsiap79t3jz4tnmtde9b6qydl69jp50eoguurzrx3zneb3f4pm84w4x4aypbicd9emgingpoh9lzc7w8r0gpe7f11fb3rdsaa4muq6vdxgfh2b3wc3zrhdvgni2xungruwuscfj8v3dasybvi02zcz3',
                redirect: 'yu69jbrvunc9qhvltfshrma6ywqm9br6zljn7mu4qf4fgqqdhkdop40g8bog3jgafowtcnj49s2z813h7wjpgwrmbd0j0okrta54tz7ehob3dyde5al4p3tiy0g1juzrj97hn8daknmi5ox011k6a1zcdijh43h5eitob2vwpyyyrf32nzumygw36jy3blx9g8axj7dt41zx2imw04n7x096qq0ojv9opt2e7cmxzeylf8bryxkttq9jo4apmc5443l069m2jt43bft4x7mdmdzngll5c0eehtebxp61lrbia5vx4a3sqjiqdql543t3jiq501qb6zsxvyqhk5k9667ndpbi7i0s00bs0d0m9alnkswc8i9kqp25ejbi3df2n4hegfxpcearykmh2gigid673jmfcl1lh6dcvv2kkcwlp5wcd28kzhatq99u2k4b8ln2peznnkt5hfjrvunmqg5z1ogjripucpzgyzg6774g5v025aibqfhdvvvkkcfzrg3s6tc4qimiq8bmh9za13egp82qytieim91jdoff07kg7coqk606m2textyxbzralchciwufamppbp9rlfqg8yy7ns8w960b88jz2xytadsi7d8oyvfvqnek0uvyzrst9mr8ghbp96nk2h0p3orqi4u5w2gksc883pupnt5blcwmgnj2xnwmf7dmeqjmhsy9j2wgf641yqzi8z86rn18c3d3f0yrxm8jcm79ipfvlyt44vxjx79uyferiuu0e0i08oc02fsk6svcs5wldqhm3japoplfl0zyf0jlhhyrshedz8jbjsx53wojuj7qrrrgoiszl5fiwhnw4c37i3av0s1wwusdm8el8phq8x7ux5s8851vc5le8j2dus4si40y8uyn6iui7icpxqd7i67cb28k243l545vwysv2pevn6md7gut4fwvy0e987kyhfw4zhvqy5gfiqegrhx751y0wy25pu9ltvaaquw1m3430rum3r1q7tr4bh6e16fjmgttqpizomqltitkqkjcdwy3810ewd7bmlr1ny7frq3hgfzz87ujq2g84d5jfhdo24t7nb7wotnmk1lvv2owtfra5lq0ty1xgcu8mi5q1b17isxwod3hvt3920r3z0qkzn0scew9kjoj06bu3n0pnk1lyj6udxz12bqptq3nhgbvr1ai7vbab417wiaeal7s28qi7h91gvitg83m7doxser3zevusixi8ciabtcj8ci7z2ozniaujm2dgkacrefkdwlxdb4sqdw0u6kygg7nm59y90nqqyyo4bk9c8jfqbqgqo86jkjph97sri6ds7g41bjo91ej4kaan3vcjy5hggc7mmdwbgg44fpe4fvjoz2my07ghbzw0hkw0fycky8khm962odwqd57phudfkchdrcv5t8n44a0zbzstckkkdj29jy14cx5u5ijk19cjjpd8k6e4uv9wr8gj0nvuor241x4stqcqxkkvc1argbacg37wb75uhg4xigmpnmihh262b7w79543ve6pusdbtyhvy8pmnn7rxdocxef3xzzrypvfs6z1nks4ngmv7i7oyz4kfnlx85rcxhr32frs2z5k7wnm89oir3iyljuzttfp9nbe9b70t0bmlgxs2bwxogukvgdf39qeynt757sd2hlg6xudosbczqvsmflh3onk76zt0uq3cqjz8f39viffvxnn0xjw0wap0tdqckpk5aw6a60y2i13eugybz65ppupsldbn0lnh4yajkadphc7y0qg95i1rhj9vy1o86vt55gihvmi0yeopm8h4r7orfitkr3bfgjz44be8n0w6tri99kvxfd3o0bn6w1kj4m21lgm295zlqq77zjq11hqyewkzv3a44dfjauf2xyy6skqril9bem5mt74lfczb3ps8v73g1co7eww971uk7t0lwi9orgny6cadyto8mqkk4z4wytud50w6npkrci1nsm6i7r0ewa45gp9cd7m009ygtfg00705jxebswnwasluw70fad46q',
                expiredAccessToken: 2304813964,
                expiredRefreshToken: 4195125359,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '35b41b41-4f69-40bc-a01d-893fb6e740fd',
                grantType: 'PASSWORD',
                name: 'egcs3gts11p2inugspaim2uh9f75i6b526zmk6mklc5fuxtu618r6ccrejw02tjujbwolankvomqn47s89e7eqxxy1jaghr4ux2n7kc0l9ce3460jmxajst9ro2reqeadx7q78q3js78ncyv2b61b7lh73d22bc6di7htwsiljfx5eia2io85a3wjiy27x8t5des9de9yho7d8ifmghmvpka2ax1bzr87eg349e3xze2xuvzto21ymmsdl6edf7',
                secret: 'qu8ix15cx5yymgh6lbmq40ymdm4z5fhd4f4xv4tmzlpt9ln9sgprcp6n7jp178k57gbtp6klsgi6e6tahs5ymra574',
                authUrl: 'e1yabc07l7ax7ypo64mvjsjabmoiccoaea0b2oq5r75vno1ysa2rddzph3il3w6jgqn2kqtzqeaedq5lbgkujq6ytmvtx9s16mjlvn0by2jdealo33t0olt4rlb5hgq1afym4vn1lujsq14v3871yas1jvz4dnjkyhjtzxe3lfvlf2mggr30bnd4sa7y8vux30blf7xz1aifc4yxu848gq92go2n8otlqcbxzcm221w39t3jhwzb3noqpbovv2mco7k0ng7tzuzmqz8sexvkod4fgtpiu1k634tu6i1qx4x9sozdmntu6zl6v55745c59i9ast486ke2icvi134x8kh65ggrhqfdsl4qme23cz3s2zbq691jyrzalq4b2w70dqmmsoc14ynta3mrney6ylhtqkwsc9tgmxsz2mjw2fvgke8f66so0spo22a0gc4exx15jsjinlvodva16yfawxff0dqdu77t4he62wc3ej9wub564lqe2tuqvdw33709xcaaimsluxfc9ewwutze1mzq4cayphzpa5xwl8ajj6856k7zi3vh1y5n0jwtintx23hgvh5zkfzrjriha8feq9xnvd6chu9jhjqlnkvdb9bj4sujpgoct1sqdg4wriqnm649fns5c8qwl1vjn03tczmsjhfdt4rcwleou0vv1z1sa6fo903f7px3nykhg8yaved2pf7njsmzezlsn6xnuwqc4ajo4j8236ub3azyga03hdwdrg0e0e3qniqcrwfi561bp6a8osi41h3xh457g9iady3mvmp1cw8jio46qxeokpobo3upv559f7aa67c1qwnrehx5q0o7xms11aobb28prcqc9ns2fcl0p23mqbyarbnpp1bl5lzg3rnt8imn1oallb8fqcbkjcmpad52idmwd8qc9srd0g9lqjlul8sadvhghsmfus5rvxjqmjoi54kpbgepz3omdhh3fr2kr1makmmyd0meckeg2apsjnbx5u20xppdp716n5bj13ei3uzwtz1jlsjg3y403i52wni74zdkqh1d5nvdpvs6fhfuozvtqlmhku5mepjz2f3ysvvkk4q473y05hx5d5ntrzjdry39obdzjlkmncoijtkbrd170y10v0rbbd6gez3x2p326kq7m9hd82qzfc65y8u99m1l0ktbp1e1wgb2xjwjqsad8vzl7r9b0web18cex9staques8im25yzcd530nkaxoyhq3tsyu5q57et7hjlxptnyzjv9lqnzevgqf4keznpqinyievfacqug451w57hl65zjpfapevk9k4ohy90emetuaj2g3ffsxbv8cledtjxbgsswyp90c75yti3442sx9kn3078sye5ttxxj4wjav5ywcsy2goho90tajfxws613wdap3m5a65oike29zvtkc32n06bhduelcl462mwbshkc6vmzfko92cdzume6uiq252xt3p4vo3uckqk4imciawo0f1n5jo2cqizfgjr5gjzk9xq9gjl4uv3oh832wykooi01l943pkhbdm2iaf4z0tap2ra5fbu0mgqn7x1a9w0zxwqkru2xkbrucsdzjtjmq8hgvoao6ncr9al9abjaswdic8fzggohh3xtkahidnecxjb3a9qb52iitadiptqc2t4o41kego6jl483ehxhcag1as87nv10rn7r9tm2iwc8st3a64z2ko50usdclthxb3geg45iu3cf5sqneikn75rfm7sofjjpruxw07uebrhw7huv462xx9i7jf2dwy6kmq41vv7ruetppqv3n906vk1w31we1uyapwwso1y0trh1gmhb24f7arddjatccuqq021lem1851ux566mwq9pffpyqb1gi3cbnd01yu3s767mcx1hz4ubo7gzk5fhehunwpvfpf1cv6kobfkopxetbnewclsfhjsezs7utmz1hgytjxez5s4evgbrr7m4a8vi4yjcirzi3xc049uqfzun2jt9aswfaf3o6vzi1e55g3m4vx5b13ft67u74fry',
                redirect: 'xcgv2johllj8kyqq4q24fuu70orlbkg0uiu3ta0m1i0voslfmfbtb57ezf79vcpxr3frn1z60yjz1zd7vbgel7ugmkey2wt5squgsn2q3yu42udsfti5lw9h9xdy4sjw1vbjkgtst4309qq0wvmz6fdhi8nkpuwh13my9agvdd22xyw51mohtkn1wz6ro7jqysy4cx4t3dclixc7r4jpluas5lp5ubkq7ycqv420djjq8el4p8zqib3ilpf2eig8nmqf1veg0fr6fmpevu6mzg45ikw9xe33x6fwls55qfd0de215ov5laquf50l1y2bvldhvzjgj4tmlxzmuatsznjy5alod00swyok6wnszojyt7q13u7ywcj0i4m94crlh3bb0oltuo5gxsu8920nvrtmt6hfr67t1l0k4xxbrf6emzfxqkiuolusn371dqhpm3v4ivnjw7vuubzvrdfu908g6hc21rhkqfeidcyt2fhcrm1lz5wz8seelxghzcu9mhno5yitlw1s35fw77inzam18gmwqr7dbgtzl1jzlcey6oeoynfd8rw1tnkllzb08f55t184nftpfuyyw5k1scb2yitjxazbf1ocuil4i11akbydwsq5pj4cpfnlwlwg6x3mxhysx65s7xarewjcabkwbxcb3cbdaw27qbg2lneq0f3ps2vadcamodgzdu87ted326737h9bjqgilxohee4r8lm0q19be2841rrecx6rv9vor2kfeq7rn5rb1tlyqo30q0bzzxs4jp65lvxmth06e7augnyhltu491lo5r8otkut8hbb9ul3rml8ewyeljjwubx0wtlwq3s1ze1trmetsys7gz01x0hw8i6brs250wg0fe8hornpbg91it3gl62o27wkgwszt2bjgaafod582nof5chdvo0w3658zrd92mkybismnyvtg61zt2hznca5wc9isqb6db50r70badc1r7q3fxzc3n7csj06yng09zqu4xkpemmfcw37tk195er2aytvve4dzc0l3l9kvcwy698apvjt4axwp08y97v8t2h3tywncxqx9jt1q824cq7o6yrgugscjuwte5d1aj8tpti1zkxnw4pn3vtm05xucsk3h5rha397w69v5ke7m116uhot6ydoc7sjhk0he0tmcnoobzfal66rhn6w4aqigzm83ztxt2f9b7cqhslmr00a95rv8kazgecir5tjarx6puzhkcmh60m1jzbrk88epe4z856aa1k6v18vxv8niv92c7z8x5ov32njr7pzp91gaqmh1f5bvm07ebokq93n8aa73tlpnxfyilg111qsqq6chv0fb4zuzx6uytd5phfah41i7zvzq9mi7jc58201o14kq5u00xje7ebrsy3adglp7umxwuaf30wncbc8hui7zupa2nfu03z32sbmlbwkycbhs9eo40p7lavwyjtfffts4rbqtflxizegacv9yr9hz6ndva1j1stdif62i632dpl9izs4kg96l7vw398hq6t23tiaa82oqmiweriq1jx21vhlgxdq9hz1139y09eglimftdh5uft2rpqmhypubly109vfh06e3fji7x2cmynpaupimizu8lpudg1qmyqi02urcj2pel00kcomu57r3jwim5i4luvua06yei8e21khiupaptgpgqlqjgw9oh2honzijbalgcs80t3o576i897j0dvkuzq8xwlh9orkqxndogtv86cz7w00hlc8umjug15luit2s98peq5yd0s5i3onuit94dcgoc8m1je76jjn5576jvtxhjhy18jx9odb0fov826vtctkm6chca1wafxsfb53zxqs5485catt6ajn0qku4cenvomhv9u68getg3n47xbzpaafxdwq04g4jacsby3wo068mazx2ag3u7ntqagouc0oswyi5kyf6g7pf17sag0w71mdj8x6fde2l3h6zpaiv1b6xgfpm7ck4gymhvqzm8x1gpy594f08nzv98di5sxgvtxc4zql75vo',
                expiredAccessToken: 9575744507,
                expiredRefreshToken: 7782108837,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6eed1c38-d161-4ee6-bafa-5c2ccf6187a4',
                grantType: 'AUTHORIZATION_CODE',
                name: 'bmnt6b3i1ih57o2iv43kvg4jsmlon3qw8wi9jycc5tji4t5235d1awg9uztg111szo2txoyd9pnc2h5dral9fshpduysmlx8g68yuw93u0d7mczaas4tfbz7ifmm0vcaraqk3goimb0sylv0y1fr35h59v9iulqwgruxgflwt0uhgjdavz86920z2947socqbdqk7vw2raopd52i0kuex537ydzr7klt4ds47iu9m5tut393kmincl7mfg12pxb',
                secret: 'pd18nswqzey8rob0svvng9j49ipmgiaueajdd88upmu6bh5it9frz2wjj21sajqozwura4jzrp25tk5xtc34s4innx',
                authUrl: '642pcgl3qepdggm70csdplxvmevxz1r2zyy1dnq0ypf7gh2pxj217vtarpostplux7wy9v7x9u5rjmq8ub3q93ngskf5umoxccm9t4tn7v0utr2nd7xyu6p4377ur7ceu20jenhvmpwhg6dz0wcy35uedhius5pt2zi85cs8z3bay2lygmultzxa2iqceu0u7ty5rptug41bj2kkh5jjq791j859x60o37czev32hizn8szv0xangim75m12pppa2cp7x5kk9ananv17kr3xyf4nev0kegwcm1fvb1bixx656m147xnzzfvj8u6u05wem5wrnnfp8goqg9anyp5zpnr5xc02z8nm5kqhmntdgptmwghlnprdsixma07989zzgzym2cfju24pfg5uomqylaoyc5v7l5td30hxfke5f9iz4k8ljrvmjznwx8voj0do8brlhzebfvoei9waxlg5ij7ap6nogoqmhl3i2lkhb0rg7ex1gic1o219h3w66wbwbhmozwvh39750wj7bbci245puzktmsam6p7ja14tqtrvblxhank4cvert9jtzflpzemifb0tcn1j36t5y3bimcp1mih4ow6bc9i1y193ajvx5x0nncbot8d00dwqaqnsaopdr1cp7c3qpk0cz748fyo0zfo2h59bk42dco4wllne4y2dk6ppf5szcfmnb6plx3vqoc37pmrqpovc4r0lsvgagn7ltyr2dje5yjsumkvogxsbsfss5qq4dni4m77h9q0vfhuf1ne9jekkb61z0zc8w3qoq6x03gjob6wqg7wbk862r4uf8vx3gqyhyl5ga11ev29ijfzog60w947revnu7hvr4z7ekq4ptb6s60pg6bjarey1gehkxvqbhxacw5nwhrsk2rkzkjxj8km4ql7jd410qa6cm330ttsgfwtozrjjodxjpjnesgazqywa30dptsto6u3sp9mgcgxrky7abi69n7hpy4n4gacc2qlzl7wbdwm1z5di7zr9nh5nxu96el1fsv57eu6pa622mmczx0684riyxn3aqe37nir1our1u3p1ulrq5ll4092fxe2r596hwtnw4uios0bwr8kriwwlaxdei1iq8yqdrkzma9regou0v3tltml8p5ql8sd62rqscztwuygioxswhw6odaa369upcbbaw6hpbsd0pequk2v7hi1anio1x8m5slz5g81j7npozn5qcd6jssq3phfzsy6llxtnnxvrmug086ivjrat5pq8chkx70lug3k0i2ap2r3ejrm6kgrgepvbam3sbuu1g2r03g3m8gkcf2vhkib8p56vbjxwf0qx6vd6c036o7136wa3pkzpd75g7ncg4h0vifcoghxmhz1xngwbg28t1qzoxp5zkmce41uzzhpwsatwk0xgp4ynp6rh5i1fij3aqq4lne4zfrfbvmrxqm2gutktria5m8xw5gvxz9bwly882gd8ofwwie6me0sraktjwcfypnpf148860popsdfun5p0fzzekndwl4zzf0wxlgfqzgfmgzztkk6g4oo3bbmtnfqpnpfmfq9i927w8te2u79zjgu7dlc0oly3isqpzdk2x97tjwin9c45psly83tqgua83grsc1bqe7ip8i1o1ib22gkajg9opkcbqv9tpzjko8eoi79rd9sbvzgc9y4kdmxqxebmj1b5fkc0j3cw95t0j8gtor5pr8fuqz9xbfcxuffhgigf3cu2fhb2ob7rc6s9vd2klp3rstuvodqxpqzt8hzqrra9ulnfmfejyzlzeull1wbdqs52af5suly3n2j12jbrpxj43vb0otvotzajibu0g9ulvdk971nsnsp22ghzcaj3ivvib95ae81mn1kdtpm4434f1jhszvecrcg4zbaf1qxhj65bxbawcwdpznl5duvg5qi4ffbcwn9yqrnkqxewbhuvxzekj91783poyg6u9pbvfhwvzbr6wbdf4q2agk4s1pargxh6sj19a07y0a4048fareqen3c1nukp4b6fv8w',
                redirect: 'is2cynr1uv1qn2blgx0xsk49uzqfqqnevz80wg1h9g51wha2d0sehev7ahofup9nmlye9ru6j1yp5w27mcdzaea6sbk710dx9bmp475bpva54btsqbe7zd0m0as65gvfcdc70sivkham75y3k887d4uhh9oeolvd01qc96kfpxk4qzlth36ga44raraoyixu7e119uw242uzihmcao0yne6ytyn97k9vaswiuqjahmxdqfpu5m111gc0ax3ksqugenzyei5dnpppl9ckfrhofsf6qkrbatwd4qyxrn6q92h3evx7glrve05nx1skmb83vgo9k30qpwcsjw2xiswl0l51es7fp9uqht4qxpa83v8gggdpd9uaocl6lx71iua08wvzlz2qnr8sgt897r3krigryt1n1fbwoke1sxwyougi6nmbo66shf8qrw9nakiyf41kr40ldo5lmas3kg3fuv4bxuukgtcc8czirxekzfk8iej7mwomyw5igxpi9nq5by1qtfqlnes1y70pal6c4riq3pucea9c9a5bm2vi3eq16w5evc4huq74olg7xdazt6j0qh8400yr5iwlwqdo2py1rrho2frkhebirapdz0uoih74la0b1a1ru7ww3fsbgnvh8b6ajh2xclijd18n9q15jfma68t25dk1zh9bexb5kf1yk946ohuzaaz2qxdvr64w9oh508vppj9z0ueb6s3tp9sfugppbwtznpcq9eig4zf60crgotf73ekgyfmexyl3z7vnypo1wj57ftikey9pqpkelvddsr6qqzb24rvcbq2qnqmfp7vmzdwmmszby2k9xyl1zwio6kpbcfx1ddrk8nrxwhw5cykink4k2lwaq4dlelhe8hzuxn1vzd2ycxj2lw3pv69xjrb2sw3zcin0pczidb7ym92j8yimhlc8s5fnwp024ik46chnwzlqj4x20n2436ecel1x6yygtslb5ra62zqxisth3cpiacinpyrf68l8d4ma39h8008rm90dc23jxp48dduibbffswwpdq202fc6hx8lf2qeo4a68f4q6flx9yi6mp8k3tn8r8wpx0123k0zocrh63utaq0y0f09ciyy0tc8pizwv5hxa7trbw305nfbhqnmrftqx62hgb050nmlcd1ny2hnz1k4pfqp56vjp7d6h2e6yu6rmhwe6nindky8x3ivldyvgwrntq1c6pwdo6cxcfmjwzdyomfie21odjcs4mi4twudvstqb1vp3hfzbvy7qbf6q8thrltfv9787bs7pv3fum2eimngvhwi9ge3onpk3w25wwpzp2t49jvjmspbzc9dm5mm8k4dgbk22dkcqdqj6homb7j697nroizpqrwkfbu21xeh7d5mpskhjyi2wkqfdyyxepbtc0s7f1ij8h98o4c79n694dlbjjbt7qvd8v2mgb12qby09iilso8h6bhunsf0harn28vuhsnxghsst1q6u9ro8wwpgwjbqnq7xsd5o522hakcsfw9jwfth2gl6s5c5ju9gg5j5cy2boe7ic2bgm1aknm6y4g7v67nnxhpyb74z07tlh82w5jgsirqglcfhdziq9l47maxhwycpywgyd7r9g1k9iwwa9a52ckr292wpjwx26u5gapa7etzpperavkvi3g02dgsps6asghvzk023r49399z08k59imtljitryp4jxt65umi9qzw0rz86876w536zz8cqp5s9nnyizpajghpjcwh67j56pdtblpx2pc7jfyj6mnk27amripa1wii9vdtbpt9bot4pe86l884iuv4117552xmrgfy4v6lht7izeogth7l7hcha267l2quvgjv86dpkja493t8bcrn6r4oweavwh9t9qb4zp9n6l3o9mds8yynlxdt8d8bwl5p2dgeuht7mtbvc4ohn6k2qd6hs2pfk75ii0l1xl005gthaeynxtuqvc08onpf78e8kkzpvu3fv161elvy5ypeu09y94qd520ipc8upugmjbu398ic4m3q72qit',
                expiredAccessToken: 8425491973,
                expiredRefreshToken: 4316041337,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd5631795-2bdf-476d-8f55-a4c33a5968e9',
                grantType: 'CLIENT_CREDENTIALS',
                name: '3fr24f3hi4w7kvvq7ifswnttnovuatyju09tnfzoy8obt8kjerenzujeodqtba6haci9312rmjjdpvin3f7x5fxichwb9l9b9ld6qdrtwrppk7lpe7br6rao2lzjfwo0gb73h4dnyppldn8jbydz01r4xancwavp8v0eoz7ddjxr1n6da2sfkoqmun1o8ylo1fak0r7bm3lym1sq0enczly05jn9w99l2j35lzsmex24joavghaaa7ck4utqoon',
                secret: '9c9hw5sxoqrf8jexko1pxxxlgjzo672362m2jkqsvmbyhpuboevlk49aearwxhhs2xqi283a1h509qyc8l0cftx2pb',
                authUrl: 'a3jxng6vo42f69im2ryoof9vhi2phdu4w36v73rzvvsfsen59klqniklpjt5wja9ji5xyjr6pv3ezam8vjs5w2pvbga77rou18yy745u8qm4gch2lszfad9zl3hgwyv1rabifcgg0g8u01g0v44owwh0gzdjjzrv2y9oviyfqayvrtwbmqvdwwhe2r4e41u8guj8db9yinaotco3svvdd6hftijbg995qdbcyantg63kmxf7ftigohhaq7tj4jcpllcgc0dkaq4ypm6bec646bn0ipjqgixqnk783gdb25dmc21uezynpbjtx6utn8vcjok27imc9z2mmldza5v2o9l0c74gplcy08qk0kmwi1e6qo0ckqyc3ixi5hibugrxbk8ym2y2497vze0cvwjkqdf2s8l1coc3dct13nimx1gem9ufkoiz4plq33pmscul53y3i9oz6vec3moy1mvrs7bhi9h89olvy0cgcpyw216cwc0lm86prtalqmoe483eajjr2yut1dyx059w3w36sks6480wknwv2makwyg2ksld2g0c35x6ks4h0eu3rd8xv3yp5qhfizniil2d60hd0ahr3bvkmvag24ddotwwre2se4bp93zduhoqwjjo4ys4qctae3dipzkfef8m83fal9hic2vxfv77e0wwjgcktz0b2g8ippl275vxw2fg4n9w8quhqynfv5l113ya12cbu8gt054h5hvoj2qpll4w2yryxiacy7kfhxqq08h0a1n1z8cpfocmvf4rj39nxvn5s2ne5efnf3mkcn7o2pt68b6ewtu6rgyo8fpy1lm8qpjesuke6cr2aqnco22lmiu23bpmfgpurgyo1omal8dmcb2lmuq0fqmm71qb4444odgwsn2oojiqntnvn8whkrqgexgoy8dgplc7tkrgehdnr3sn0qdaj7iir3b7agrvgka4wm65gc8vafv8u0vo2ikmumcyj112tj4cm6wf7b95debbz6kkj6v3yrc18yjc9b8j5gkjrapntw8stjvcdc5ui71tjx80o8k1p4vot225amfr9lguopgqbilxy67ypwrulvopuigc379asyt1jjty4bv1jbhnh1oi13lxrr9bl7edp8y4si5e5qbscnqb4emdufubvopupv18xv7cil577xs2nv2ykfn49xw1z2eewcbz5jolo610x20b13x41usmdpurnnadgnqi3k47vdcx2vz2myecvwniomkbw5dacue91cqrkv07m3vhjuiy4jh4nkh0qocww12mnxg96sye0qoi0qwgfibxqywqix5wzn6a8me5uqenx9pju5lk0rp6713ekfk2smoi6zflor9rzy97nw66nad8e5pzdh7owhcr7ulqfjk8qa6e8zi3ou3oygmijitdkgh1ghxqc35v13xsz2d8xugjkw1k38cokrhuh5ah8fwshq95meri3hj73gtdav6kzlm60qvl8yo5p0ysa8y9zwlm2c5ot6y0okxv1mtx3f4lde61jaugw1crafjoman2hoz8ksswkpnq22x667ty4a1h1utfphb5028zwl6ojaa5jrzwrzy9yjpoj4fry36wfqxn1pjeotve4bzvcarfj89598ydk4319ml0ysrcjd13449lqcc64tv765mdpwv2c57zhq9udbywt4crzdbeb3h7bv76kd826qcsjt1e9mrrxdq4a8xbl0qsg1g97hars4kmga3rjag9mkud0k243athfknaij3y4ek6y0b0xm7i8dn9minsbqgwb791l7h3a3lkigo3lh3iub2zj7lws74f2b5pny1du7c370egw0af6irhenzcr2ty97rlbph8ovtr0j4prk3z3z43k4x8lrtvwohubb21icoznltfigb5485k7lsjh6ow45sekogf1hl7h0wlax66ghy6yejemowmbvba42krlb3owmvl3u26qqq50eidyp4w8v8ogc7mpwsdexe40fahcn3a5ebseogt3kq1z1nfxbnns67z2pa7hda4js5vy4zp',
                redirect: '1a1pw3rnbytdtbzcr24jzx2p59ryf3lmvhtzkrfcgjnr64qizklee3b4y79m6iqszy12ef57ndchmlz4p886xhs1wzblr5mqacagnewrfihq00bffqvy7xngd8ortyqpy8nxwo8jdfh58woo3cl8j25il78z1yrpifbbdju3pa6p79mo9dcous6rsguu167kuzob7acmk6hezqvlx9ey1baq55jkvc85850poryyhrp2nnmuvl2qepcezkd05xxgldtq7p58d6tjligywjf44aacb3fjzy3n60nbro4obbqf8fwnleis8dk7esh714ynj3rrzagyyx59ckfaufvk04xozcv1o9vf4z41a81n0dbmugnxueb5mvke9mx15vvbpo8cswc84lwdl2775syjljcf4gbxqplmlu2uk7pfn16nmxuvgi1c14c20ejgxjid98an0ie7ngxw26adw8bzlknquotr24pyyrjyr8zoqrqa258frcu7y8tvzq2ouxzmcgepxsfcdqh26ty0w6wencdg90m3d6awk2jak2cqgi4kl3476buo6xbcrhxtle5twgttlgjg9nv9humalxksjm8rikydc1em6a4it7hqrhtqlr4s4nmsuwcoyb4gw0eoxuf6lekiq4vfzirjtso15m0c3wpykwrxcikpv4a5cw4p4akc8zake2sg7y96as0v8p3865s6bs2gfxywivsyt6lmkfq6v6nz04gr4ugo115vppaybfs579ankt62mvwyumf3tl4bqxuduzqxbx9ty9zp5rl5a4xkwt5pswu8s9xczugy373xf1ehldh8n8yvfpd3spy1i2a78jcpvnvrzl76005rv222odi7xb1i1wicsjv0n75tqrofi0qemsgo3y3ya4qm90uo79b10a5m7eon8dsq7a1w3cahhne9jzcw9474xy13iwnw3by945swsqor6041y5m0ivubdle8340nssg4xgamzrupb0s1ykmmowfsmvn4pm61zh51li1s50eg3mvaamxn0ivbglhquduypczap7og8vmjdbh6ok8w3iv7hxznrk5jyp074n37tn8b954oe0pyi20qrkwqmuxy8sjj0ohpmi003v550t6gflfrqpkvmj1i4wiba5w3o74nl1jv474o9tllvj0jp35yahivvad3fhm038s3qcglhcche7dp6khv9v5tmo2g7xxz8l0mz224csbrx0qldvwn8b0h99a6tkkz99phyg0747qi8o5c79940sytqs4xhpzr5vsuhy6gw1eqb8mssf4x8z6iw2qyfonmy6wprojm2x1q1eoj4iw5fcin7thpthe4ww63jz6c2vjiqqr0q8168ogzrz1vt97v2g0t9yrlcxnc0py6gedsyn6exmco8zbmicjyw1a3pfj5zktec0qfamj3d1le3zxzhd4soznkj4ol9oksn7iwm5w017hw1py86rcvfjtldxa2yrkztt5ig87i0s092150x41op75n9vmnze3qqviqe21fg1gjdw02ryrsvadi1z7vdrpvvoib3uimyliz74iwhwtb1c629vi99nm5ar51q1gv0vraql4mg36bhc84e4o91m1arkxiaztic2gsxw2l8bgpdj2im8bd1npj7e62z8htl9vu1koogbikc069btladogk021bljacbm2to6u1xprqqzbk8smgvoesun4l45e572t208n6970872viocdjfzu6tnfmf9oabtdeh0br3eleyk3zj6ukvwkolfg4qhe542ucrh4wjinx2ejif210ucklr9kzsd2vyyeljurn56ozpjl1q8xttdqsufp5ifrbhqdklilfazktu0uq6xqqlxtqbh23dyokqcur6nb6syz9f9mk3tn3f3kejyuyda30zofzgjsksirc9t4znlmeduypxnx9aq4s09ieeth3lbo9di29t6c6bakkd0x2w3tyoidwx26fgyc82fs2iei23l59hw1k6e0hwrgzc29j8ijqxeb3mkvdg733ojkw7xybrhny',
                expiredAccessToken: 77318036867,
                expiredRefreshToken: 8124410111,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e9ab2b62-1a8d-497d-8bf9-7586075b6dd5',
                grantType: 'CLIENT_CREDENTIALS',
                name: '4dpgwyli627u5umpf8aq9as58qnjj1ir222h2fp9x3ienrt4yx7zwu10nybitqytfeei31ajcx4jhh7ybmmjikwq9z8bdoziii43yvznqmnegnvlt2759se5n7n1tupsn0lgb0ugg86z38u4qyhnbidfuvffz5eakef37no2qx27m1sacenx1v311v1zl2pb5v6kpe6z1gpw1ezk7e38hmbwfpegrdfkgjconhvmzgio9h1vaweikv2cg7mn3wm',
                secret: '2vnfvodswp8xxln8wo1inv5le30eiocjibn8e4x8ahgr8t8hdkm9yal7xnbnovgpuqizk0fkwxvwnfkwgvop1cxkq9',
                authUrl: 'z5htk2ca2dd8fu0zc3uzyv0wde98w4aurxuyu908rvvtfc5c674ckmfbib0ziayrgff61mxlwxv4sp2wo5etq3k3yqjxou2d5fxwez9817ws1bhwjkhpdbet925ty48xxh9l069ty0qyvkr3sq1soqr1asa0k0di4foqbj0s96pmiottyfaucc4hrch5hkmqo4sn2lhng6xbk3993zq8ht0tktg6rz4l8q1l389ax85ij5awb8d0l3c152uu60wfd4z2e6mnbuh06dpsmfupe9dlaiyce84n9fz3qyto0ppbwd08r1ez58v6neqqvb76ndgi2ril2zxq9sjggbu6wvwevuh2vsajpvz68yr5jdlddzluh9x2r16c00n2dte3r20gjlmtu8b8j8zie8bjzxm9bwlap4r30chp9b6wdjhgscft9ulli6mdiylgvqgmc5euz1v0qdl3p6sw7bd035ynb9w2u2rhd9s3ufoijxxl7ll4pqqy391atwchlpr2vdnwkqwd42ebjodes0nkccutjmct73obx3dxbu6lw8mrotswpu242f2t73dqou8t98qqiu7puzp5oxnaafu2sohoyuo9p886z4yd9tsnawpurkhicrb44etq8b6dv7r7dqndlowli5lt5b2h6f179fgr4omzsnc5tcmuf3dn59yeuhg34pzwrzxknsp1u2ax5pqkfvsykhgg22gs01li6lgecz1bmc82h2x5j923uv2pb6p3d0edh27w975dtm7v3ysy9nzfo49642g9tem6ty5ugx2c7zrgfz9roxbcp6rrkv39r2t28vfmzylr90htocwjb6ylqfaucacdiypso1wikzaepzy7ck9ammif7rgubmj0bht9yh5ntj6fvkz18j2kcsf6jdj2u85wytlis6knaajtfcyqk1l7os1ja6h621xvtp84swbfi1t3gwcs15y5w77027uk4fuqoqoofe0hwqesp4oc3xqic4yi1er3opw7t25d3drjo6sdxocg5gd0i7bhq5y2tkgdt5wx8zjfuca36daw9sm1h00hmx37ueo6zi7jxr4x6qfd3ju43wqpd4o1wbj3a10j4ng6opz8ay0jm2mxj3ehpj75kb2s4xrjr2rj6rdk51wmwlyn0ulc8emzgt54oh0qeyetflgxmnkkd0x12yhjtj9lixfwl3zdcp87rkymaowcbg9xhp9gm8e0112z9f2kugua1jhss0jfzja13rh3i0jmwqil4as6ce4fvxwyqpre92dkrl49yy0hczrj5ssi40n8e7qcrw516sxifost0aykznk8n9lvi31ks4mic5fwh3yjit1u12yr58uamhp7n9m92rqlgueyurthfhofzibjt5riv5266si9hi90rgn3lrodzvvyrnsc52572qz2dlh51e3mrffqo1aa6l5bi1veyy74j3mgwrjkcbih9ftt2s8n37822fqkahx81p9dauhi5wvqtkrkd9dipp3k7n6y4r4by3xvhy443xmddxk2u0e19x1bh6l5l39yb1lr7o596vffk5xayhg8296f2mos9zp7rpd26mf4fvzwffcqhikjllfpqd3f5aorl63nvol4n9ix62sqhet0t4uaz8rxxqrhjtsrvdkrid98b111q2x8wos4en7xvd7juq9bc0n05zbjyhrm6fxef9lww12jygf7bkf3xhhu2eaamupl858x6h9uqfuqtuxlk0of1pbc8k0ee8ul6k0iyqmsq6egjw1651he1b74ns4o8wdru5t264t1e7w3wh9r2e8q4847gf0w1pv57g3s2k00meicgd08l42jqwndblvfphkik4aeifm8u687m7hfm6tw51fdfu4q11tm6aqhskaa309590ig1qx90xwr2w6nrv6qvcx8tgmn1ulkpul5yhrexn7o5ye9fvdbhxyunovge1kaj4xmchzxf3l9hdyu9inr3t7l9mcl7ijbh7b45un0vspymtrvw3ioc5v19mbhr4fkgbrcop1d61k9rnwb8gyxpls8',
                redirect: 'mzjltolb1ugewqjpid7o4fj9b9re71c6xoq8wyy4dbhk6qbo0ctf6km5ngmiu5u9uqqmddpengmgl2a3hh9ab3szvj4iw20kc1dfd5bexa59rxl7szaiuep93tcg048nivqvwlz0nen7acf2i42pmzijvy2vx2t904barg6n5vyi9mlcdgz2qjlp5n525oe1mrteudmojxu1tayq54bwrp9pm7z9awqvpc8g8dta123r4ied4lobw4oo4g29gd11c0fg7cbyd4ubl6hswxlrx0nexmks327jun4iacji583kvna3lonri8ifmzr6b35pdb3xd48gk90rok0962z6fs9hm3b24ghcubg5fjwhc54xjg2cxpz03tnrchpksb43nycigxcfsfyciuc4dm3gythmw42r5966eqv3w1lin19lk7xxmx2me2ls58bkz6bflf0a9vdw68gsifnb1iswld9wq7zhzro9znuynhvo87vrremtujmz7hagroa43vqyh5t93a4x9xblcwl1y0mhwzragpchbm3bge4n98gcrx12jazgz7frldz015ybtligkpe6mwx71lhvrczn219d83bpmbzvm4idms0cr0pkie1ub3j5wiq1bpmnqt3v9vrkgtspzyutbk2t6br40cp8sqwr7k19l8sqhulkqwebakcik9r09x02x5znt1r7l5omczwf721lzx3io2e6h6s4126l84bkqknju3h8pc12rvbu8dsvff1v7y6b6tmo0sfa2yajwkag4n9prqz5omugl2m0saq8lrj84kjqo0maiditwlnpunamucuxz6d74qcmx6fqa3wzemu4vnvyyv4s9uf2ubg2v2p20qsty49vt527scatkeil75kkarclw1i0pf8p5s5bavr0rlhj1inozh18wph8evshu0eo7lxxz85wfwaeemp2r08a3og8s6dlcg698xisvkd7u75hcvcbslxrtscogyeq16ht3ah0iojh5ztmwlxh33xd451x4oar5cbfuepk97ovmdvigi441lysfvapkj2ueyvllevmlak9kgurpfdoai0ew2jnn9u6l44y4kzx12xv6mu3mxi4im3i0sanlfevuhrpmtzx7fj4yc8nw0px8eg15jok7ludz9tsr620dfdjo1oa6hh54cn42nbuvgekry1vr2y5rx4yb9unzq8lhd3lhd9nd78il6dxv2nlz4mhoca0oymaj1dy2mrh7srn35kc5ry5awc9leh3r1pb2gc42il7h0mq8q4fk1xtisgl8k6mni39ykcvo12gsx8qathfka5wex0e8atipno1f32gjiwzmkhk1jxj4jwahmt1g0frybb2c00bshfdj5e4dia2ck8w5k417ojxsonvv391x9323ppj89n3bqkcw0qkxz9sucx4w46je5ep5qmzp1061b45bhyfftxcx8yfxlfw9tgjjixcyhtzi0cbvg2z609435v1hpezuv5scz5qx55twzdvb2njjnegey7jg842ht4gghfw3ku2qbqnggk9dn3nkbb71ztp746r9zfrpv12vm3913xt6iujxluvhjnuztvtik43yraze6nyab6k0h2vg0jgb1xqanmnj7c7hi86dd3gup6sulwle27fsgxe3py3x6zoesi6vrwur7bth3p7ew7lxmxgi958moi1xrp8w6y6rs677rf7389ni6m57qx14xfb8a04nyxmrbjcw4i5nyqqzsflcluvyaa6v2xxditqvdauv9r6jujp41nkkt7mvqmx2ap19sd8ymhnpqi4ofpnzx5dzjz59f2oq27t1id71jeb7wk8sygel11pxy6vu71um6ludu0k2puonb1eaoiqa3rikvfwnvly3ztqbszujw0qo8uudpkekdgyrw7jkesbg64eci0etnxmbb2z3ote19eknxyat3rprfri83x20l9ho0elpybwkzi9v7lfbrziz430x8v1jzwm6qdn4eizgouf191rhlpdsvicl6f9qlgnyz9gr2xenyvzn70kdfgn',
                expiredAccessToken: 6344596167,
                expiredRefreshToken: 19868509102,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3ac85c2b-f0d4-4f7c-ab15-b5e0b5114374',
                grantType: 'PASSWORD',
                name: 'q9fq4gomw5cywwfm86l10rizzvrmqp5au6r39pi2kh228g1r5g3o4xo6iaxixd9f8tj3ov05nikcxrm3d5n2vpvnuxdyuye9nxhs15rx642t2uinsarebjf3nnv5a707bc3ov1ktbyr33e3hu0uw42xo0hq9o8klfqffn4wfmgxcajtr6jhm543b6xv88du3xj60jo7nct2zj8jipdomxn08r1p6o93urnn8lrq8dvqujs5rmj7hph35zdwb83t',
                secret: 'bns0icbqd6wrldtxy2u7vcwr55i45765fpuhcvjffveaqg0654gc2rfwf47loica3ghziqeywvuoiiiekpai74e75r',
                authUrl: 'trk82ou2qj513ru1kobkt44bl80tle3is5puxl7siri28qgu6xylg2m29yqrx0a2btv5iulth1bo6e4gerkbg3uyx8581m6pvottk0h5uz5ypchp5dbgbi008if2thozfy7l3hb9pin1tin75j8emzzef79icw3ts8dvhg4z2bxax6wpxaennhodr62nziraihef5vtcam8h9vuow67rb3qgpo88dxyuxm0u31vb38ko73dsi18aqj9uskk7gbvjtap539wk7gz5taukcolmv6xiz6b1ix82w0suwfsh1xkzqgt35ln1xba42w99tmfcxl9zujaekih62h7s7ak4y8yesk9jat03t4sammg810kbkzdnachmiyoip0t7vwoiuxec9teqmuvjmp8v356k4al53z24h1ossu7p5mtrk5wbwvfvyjurxsvhr0akzfs9xljby1bg9bdpk5vxted24o1oybqbl5o1xh0foom0nuan49c0430cm2w1qtdjto59o8m7vsvjri0kgx02uttdbqvbetlg106c621kxfe58p52u67t67u90ehc1kvgoj86kzp55lpboxwa980rssitc44rf7yj2xblrk15ypw5jxnc1364sbukqz26w902kuysgfmmwwob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9cklpxujewj71blyjxv7k5fjjipfa13ubks2502p5oiy1v2ovmgbjyzxp07xwnu5er3a6mh166omi91i8v1e9mrt43dcu82uvgld9xe6eyy8px9k9f3kpep7aofdc55ddh85f04vha5rlh2s6gho4yiicxt9q4cim55f6b1z8rdr33ekauxsongilwicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2nyof49detpqh7rv6v4p8gzk0cvtp81f0nbv18k1zfjczcoejq6u98hqh065v3r15nky5mmer1iehcrfveqnqtwfoxtkuhomfel4su315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhlebmn2b02ww0oda6z88wv28ch871a0791r5o36jwthp467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1gq2zqaycus1usjwsv6mae290eu7x2pfictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551syjv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrbg20vpg6l4ncpp5bev5a1q4vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nxpu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euappnl75q3crpytzlc5hneplxcklnkvxn8l3w167zndplkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwarunmnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7ws41otkv1etzrt4el3coy512zert1f3mzy6vlzivx2fgfngpyo4dzf4jiku3pu6lu48cuulzu4zkraplokysfe',
                redirect: 'no7ihwpmxgxt2omiafno32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ciffefz7nwokw9ei3hppe22oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41ssc5zar7hmjdaez670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00hp5x7yen662xksfwsq3mw5lotul7yrp3lj59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q476ob3h93jeahg9oank68hqnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuovstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczrr2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw2959p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzj',
                expiredAccessToken: -9,
                expiredRefreshToken: 3679802299,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ca054610-bb8b-48f6-8d38-c314fba14fe7',
                grantType: 'CLIENT_CREDENTIALS',
                name: '0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydivl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo3wunp6waq',
                secret: '1loxw32gaa1sbrvuc9qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91b',
                authUrl: 'wmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4986m1sicaid9zld60f73kvqk2uu9fmgocer9nz6tclitycq8w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampaaefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbif4hi44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx8anpud9lx0ms01xd8uof61wi2pihuudywsphj6xjo3aljs7cq7jxc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iipd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji74yxtr2xibtc7ivk8btsgdy5ecrq8aw57s1w6qt2zwet2sw4of0ip4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3kc49zsjjq861vnx1252usgdvg474lcd1j41j49ha2ax8r8njdz5etf0iyl6kej0hsooqoz36q4nk4pg01o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2ry9e5fgncq71hb33evupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svcqcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig2',
                redirect: '6j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w92fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pcg3duez6dhfptby5dh3dcdgeiwn878uij2voog85tpsokctv9ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f9flhv106f7lsmslem4zdxwywalrufmca89xd77x18gre67pusp1j90yuzwo99zq9lstskghevlxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9bw7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefst',
                expiredAccessToken: 3504759804,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'acc9c83f-01a6-4a38-946c-c95336012faf',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'irhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clzcng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqt',
                secret: 'beo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d693hok99huik4gkg9u7xgev2vmrwgn5xvggh4',
                authUrl: 'jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g3e1o8dxq9h5mpbrwesuskklo4nkjmx7hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtfn32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo990dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp899yaq8bya427ykqhx0lw3rb3bpvnpqihx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imxy208w5sl8ep09jzokowaq4086vsg452kzeu6fk34aoc0akmx1qodcbmw42gedjothovtqbesxubdyy9145g8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y7kojlhu11sj765318jldimbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxlqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94dc395rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg3zoirpt9yfbhbl6286f0watkyfxl5gdlydvb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585rxk7gz9o1o554egondpoxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75t3gjf52cdxv9hvotpdccez1',
                redirect: 'n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geoo60nvqs6qau8g89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh6r0jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8vebjjpjm7d8jqfnysimyosp2yk6mehivi559qs81zs96f1gb8dxa6s1dzvpfwi3ybj8occbxt9fn48v8ehuiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65atvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl08jto0cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixnsp97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1zv9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf',
                expiredAccessToken: 9918568777,
                expiredRefreshToken: 4838031081,
                isActive: 'true',
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0f668fd8-bac6-47b9-89ae-96a11e8f770f',
                grantType: 'PASSWORD',
                name: '8frtibvgh3we4tfemvuyziawz1brqlzoq078q3gixas13i10yshix702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84qnx63b5b4lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvmt6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodj',
                secret: 'i5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp0',
                authUrl: '4ymltcfyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogxi5zqurmmnu9r01yxaaan09oam769zwvtbs5g97zf07z4sbcjq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq0he0v6soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42qd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7imhk58lf792pixpv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqsxhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqynxdftyx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b24cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgczr7lhkrjycr1r630hxenq554kf0l38h1guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinfage6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlgl59wwosppk5d6i1qcgv6xe5vs7k5ci35y8accj92h01qlnflvmgurpeq6j31elula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i083ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uyamlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrqurf0adkqm19w7saeappunysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle3765mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyzuye4bzpxexgwl6vi39xqu2t6k5oqc07vof99igno8o',
                redirect: '4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3fwnss5qvzth3tmfvr7bvoy4etn3cvfecc8cfq47mxb7ror2dgukundm0xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbuemeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxxu11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6ljt3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpqitdwbhr3jyzqf6rxrjsx6u7c6g15bjkb9njqtz0usmevmwct1de74i6i7jzhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy0ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0wyof7ne8hvphybcqaiohbvt148i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2l7v7d01aq0xlolhh4292184ze80plu9c3x31t20xb7ij22el2q6tqqyzm5uvvxgkscyjyf7f5qjcc24jw3m3cx8kqor1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngpipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90fy61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh09t6x803tzcgqq47ukinfeychcui2xojmtfkfy5y9hys3zyxaaxif3eekbkhg7355yf51vv3xasl5fnvedog810wzziorhuoydfjfpugujbp9zbnje61x893c06si0id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7in5singcgwadxz61dvy8x2aq1zk8qol0wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnwnfrjuww7jb3nt78uh49mvboxkr7d0w7uyl67xzdrzle9rucppbv81rm0ftybwa076pwxzjjx8ezvs2jn0hkxm8ipts0p4ucg0sek0pk4vqrsvib5ue3qohlwf6ohpo6u8oujbzvtnk9zvrmfda3mkzs51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ugx9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgww2bmad5cbqfdib8ufzkywh2',
                expiredAccessToken: 9887020741,
                expiredRefreshToken: 4661991765,
                isActive: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd9690f38-de25-4d24-8fec-f410bd98c905',
                grantType: 'XXXX',
                name: 'gysqac78nejt7scxvj44r6aj2um5kn9z32i4rx0wcfpfsg4e98nse2hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekzwosipsfr64tlylbtz0cussdsgig2ztuy7oa1uhctz9ur4hx1ay2686n0wsedsqp5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz',
                secret: '3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsyvtbdpn0w4dc09d4xj41ayhejxh3mbkdyscq428mtttxid4j00xvlijn',
                authUrl: 'gy0zjnsv1fn96ni0436a0cdqkremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvhf0oh9amsrzwms9rcmj35xlf3gd7dioo9u5ireuigprleyc538ju5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0a4e716fgko8t0o4hl4qmgxjpyvwmokpk8h9fifbnty80h09oyi4783thud5z1bphbnulxac35vywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetcat6gqu5l44y0osovxhdzwdw77ri2xsrja19sehjbzgx1hjoz3ao0o630xnydwunip050yvmygzsnovx7817ljdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9o26w558nwqwuabniwp0hldnakyo3s82qvjkg8wdeybie09flcrahao7zmcyc00ub7b565fleocac8kegtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz6ej807lmuw3a8kggw5yilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbogxliasulb2u7vi5bmmx1zoku019xyxjgebvfrkyo0gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cyx0awgdppdbgvt530wwfy1ilfuc4pmbk89kdu8xhwvs6eivsvwu6aavgzy5yxuju30jlfsp6mw19qfcyqp4l0rntyaggx11aak8pwp0j93vu7dc1v28ivea85xrlwdp2b7rlo0kpxbx0an3emuuscta1q015gyaae9y2lzfn3slld3gul90d0jwgopbtu2udssus52le5t5qox9w9ow41j0pd3xya7fs412l898d20g2ql0dz9ojxys9wksqe8rdycazs9pt5gsqhvlu5t6fb655h9htinn0b83pjtkv00desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq31qd10mo2l03p7hdv4eyhg459pfqoevznkjl5w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrpgsm2hrjr8i316t655kafo63m6qwgs22ksblgtyrlyn06t5j6aucpbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjbpzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0sauutmjrcos6g9us6lzwp8x736wp02zle43kop4h01dhttqbvhu8541u2b5ajn774xwes89d3tiu4813qznum84u1wh1jyr74tazbwdsyynlwa838gmzzb8uocffv2dl8jx78c3gx3jrgtdzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91sddexv98d0c2ydu298uqoamkcpua4outs6qcfmimwxpg3jrk0',
                redirect: 'xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5tm2kdjtyqwyxw974vf8uqfytam7cznne46leezbclmm1l11xq0i1t5mr6u3qde561vupcmnpfk7a4o6wvpzyn2yenk9k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i57wj1yddhfnqhpqutj2ko6n1sfkcdbgpaaw24opb2v2aqu7g9z3hnqiep47rseqkms673di96dpoqccmo71iyimn1anfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo4f9ibsxzcn1u8p1ilp4o5b074wqij3dcfdgnlp5bg1rpq5qdmohmr3681j42h02tav2z7yxznxn85f68r0cyb8kid84ny50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxlxgxg8u1tuajwqv2ju97jiy86tv3ov5270vsbknji96lnddsd6msxuqlle2epvue01kcf38lb4rvf86pz4hbmuelwcr1xq31oqdof5ka3podobkh9ruxrdsb6y8loojnrr329g1vvxdtpboaqrca6lownd31mnla3ibpmzjnuvwafhbxrqyu3svp0ctojw8mx52uuiluodqgpwsw62ail377by8pxnq456a93i6avm4nwg1wypr6bao4vwv6x69qukxikx4cm30sfqqxstclr4tvtwetzp5o9oxa9ir1u0jdlvwjwoxp2yzbeyqd7qrzu6ala3pbnp1kou28cjm9qppnxt3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcwsz58o257jicu7uyjlxqa0ki3jqw957xyx0ucuo84ams14ffuaw1nwrjjta83xvkhprvoexu2tks4dr8r43rcv4yn3pblzg91uvmwdy2hlify2kofdmualykcf9y2drit11wmph5xsbzjfljc9r0t59p56m2rq6anwirl8cdp211d8v96n1fviejj43n35iv7fayk0nc8uvqfbqknxwxbf7fi6qydlcyp2c31d3hou1gvgz46raec5ndjv9yfrx3kp4z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268fqt2ta2ycgm4s6ne4hiq3lfsl3d236kc4af3qoagqhig9gtaqulkj1652ci9qjxmfrn8uf2sr5w1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u45t0xepppy504rxkfsjx6sqky5l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp45b28w4u4bahztl4k89k5q1nuenog143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5zmnarjs4smc4g42qub2dgfsf2v11csjp51h9kz705db1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1p',
                expiredAccessToken: 4120449564,
                expiredRefreshToken: 8029508672,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET o-auth/clients/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/clients`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '8a02f94f-1f32-4c80-b8a4-eddff563252f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST o-auth/client`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                grantType: 'PASSWORD',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                authUrl: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                redirect: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                expiredAccessToken: 3276228185,
                expiredRefreshToken: 5027358806,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/client`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
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

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/8c3ad696-dbc6-465e-99cc-62732661a15f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                grantType: 'PASSWORD',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                secret: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe',
                authUrl: '9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9',
                redirect: 'hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6',
                expiredAccessToken: 1169564060,
                expiredRefreshToken: 2152813517,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                grantType: 'CLIENT_CREDENTIALS',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                authUrl: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                redirect: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                expiredAccessToken: 9545279154,
                expiredRefreshToken: 1669720284,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/e8ddc823-0124-47f8-aec1-12104d330bcc')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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

    test(`/GraphQL oAuthPaginateClients`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthGetClients`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthCreateClient`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                        authUrl: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                        redirect: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                        expiredAccessToken: 4703549812,
                        expiredRefreshToken: 5477989276,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: 'dde13522-000d-4734-b43a-61b3e797b1c2'
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

    test(`/GraphQL oAuthFindClient`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '701b2911-8767-4038-8852-ab4d077540ee'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        secret: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe',
                        authUrl: '9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9',
                        redirect: 'hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe59op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6',
                        expiredAccessToken: 9607685360,
                        expiredRefreshToken: 9914140060,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        grantType: 'PASSWORD',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                        authUrl: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                        redirect: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzd',
                        expiredAccessToken: 1353612680,
                        expiredRefreshToken: 2404352741,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b7a8b080-03f3-4a29-8b7b-5c802b990b7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});