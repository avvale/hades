import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () => 
{
    let app: INestApplication;
    let repository: MockClientRepository;
    
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
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'y45no2txncyuxi5tx9m3418cjmnte4g0vv6bhx0isvanlgvyetskfn0do2dlcvmpuhijjazb30z8820ka7hnzs612uugqc4n0moe3eg7dvemn0masu38iqbkd5rniu9azzkqait170wc085hdj4gap4esd73270qy14avmhnf97lznu78gvvre9ducx9m27aa09pa1biqn844bh44k0560jjzc11a0rd5ljy7bzickdm3gv0hokricl5jojb7w5',
                secret: '9q34hv6js1vtfcz56xn6my95epo1ywzprsgkp89qr72c5y0fnblqjfffa6rnyu9ah9f3f2tmgbtllj2vezs4ezo2oj',
                authUrl: 'sthxhhhat5dhzukpn6dpo8si60youjhmm4h9c67k7u8a1dr6u3ug2xx6chbhs2m9olnslqboh3lmt4iy3tv5f25foruxy09irbmwtpd4bdd4uqqfc6jia51he3wclridd9vvw6gvew005psp8esy9rkdw0p0oxlvp1c8xd6qfix2tamf5vbshnpfnx88jlhlkwx4gb46gajvgo2yrki30qkr2h0zvgojn02eulpifb9derwknuwyjpd849vdrj1lu1mfbouwjz5nix367azkdjsobrcvc4ok69kvn39qla2hlvjfol0l1r7sgskphm2ysd6fy2k546grw6lr8zjkr6jz9w3dchfxup9u3wh8wq9gt0oztpbgo332r2kerjibo5sijcia6njez6io222qgjuk8y48mscyinjozajhl810bdr0e2cztbpqizdr35j75r18mob8nkbefjrulnwltt2ptulen6v3kxn22hsj93fblzcdrx3fys1z1n7ea7jwbb4imy8wylwrijvptqqjr4v341hr0lfk7qo4cvl6em8y0bdcqnq2w03gs9dw8ly394lfl6ifwvy8ot74sievrdi820x09htfg396woxvnd2idufnqa5oehqmgdqasnwynhh89vfsultkwws0n83jsbu26bxmjvheglf6uv873ibfj5fjp4nryqf11efjm5bfs61mf6w7vencfj6vkb3kjhn2ixrbtuciskz4oed0dj0zlwe3qkkz5901a51ui1zihzh05irkhy6a69bwxfbc9phtqmkdcro3ngtvks87d1gee7nv6rdt9zf6lx0ukjkgihs88c33yddjqvsst1xfp2sqrt9tu86b9x7gk4w4d6fl252yzyo0mrv1v5vg9wtbnsnq8gw90oco6i8twdc8qje43lyz88hupuou90qqcssl4zl3z426bi2bi0nfeug2n7gawjr6s1hmd8vvnzhk2mgzbjzfajusnv79mx76tbh0vp8gslldgjmvcpri5abr219xle7wd9kyialako326qwclef7ysnbz26fixs6jk1rtklpl4ktxmyz1s11y4li2x0tvo9wekqb4ka94p3x8jc0art6y80tqsu2hw9x49rm88e8k397612w0sxobrd0arojg5si18r1up3wbeawzwel0xk7zyk1aalttxnw9fasaup384v986a3osbzz2nvm1o78yryjp0g0nl4zbzjo7l27jlmzxw7r78h9do8n5qnprdqjsxs5rdhchtyxokpjx2v6e4n2laf591b0dc9krrzod1n5ps0zj1yimdx5vdgsdo53fzqg247y2um9f0cttnr1ybzxgf7xztwbf2p53rlqvau40dw7am3h7qut7s3sq0ekgdjtrb87zh4c26at49o84ixz07dkiykm0t38nvhqhyuz8wcfjv36cwsgcu7y95s230l25kbiyyd9cd1tf668c20928xeomtkowjf4rg339v4abu0fj248s2v8ckll03jmzyjqi8yrkrd29boza14u0lyyf7voek91nnhvlgqcyjjcejkuw012n5nn9xx220rifsh7jpta0kygaoc7ouxb3te2dexx26guiup3x3ei1utguw0bccblgbm7jia9z4tcgtn6hjf9a0l225f5qekzpbhszlgythfpasbsm98cljvtfhtxyqp0nv5o86ryfdn00torz85v6xhfl3507a2xl7c6vxohmibshiojcto7hxptizgos8jgu1wk9vb0u5sck7rra2aljw2a2pq3ni45g8ab0guam5wqn8nvrge7lqwg52069mtzzcgzskss8yeg8qrl2vcp74y2saz33p92m3vz76wb11smx3osa1zecb02237mkpxxh5n2ea9svkj5lv1p7ylz2d60x5p9ts3xjp6cl9yqvzeruwh18f0wuvlt1bqsc3i80zmvf48x49v2rrg5qc69f86zcmrmzvema9kul5z9nx5q9evrqzq46vghcxv42kg9eoaoxmbp969h1cnymns0q8cqhy',
                redirect: '9jj6ufggt49302bildbgbg71b78hyolpzrso3gay3kfu3y9dux6ektjghqi169bx9o3m8vfnd6m0zdzpi48xbgi55pcxys8yooamdrfjwcq2dt11ydwossigf8ancpspt6k46sxa7g0p0vvglduwq9obu76cfte0yag8wk9xqu8dt6wrcw76srxm63jr0w05opxghr4v8suw2x2epdz8kxqkb7z8b0xq5fxsti67h2r1xrhrdvuqm1g3d288b258q55zek3oxuzggm8fzf32c9a0o3nbjn7gwkoegl33uld45en4ksai0w6koya2v1d0n36i2yx1eip5125eym4ngo60dx0zjxqfkujvkge799l7pnil5bfctjqr6i8ojbon3z7u2yb1pnfhwgs4vcc5zn4xobmljbk76hxfl3o5gvgv7kr66e9ddl18xeikk458622tom6vnb7bat4gp6ktco70qxn7vvuchiz2j9jw11ej5r9l77spb1drzh959by66tec7l8gal2ehkde699cwmjxb541lqn5tpij417tefwssn3fc0jqjax8db0k6b4v66zl44pxui7jcyj8reiazdtnlph5j625drma2tekr5pszmbpfqg7sjzlmyq5uhnk3xgvh0pm389gmceose1dcmc09dfdt2q603rgkprc3gj91si0fwr4iwgic3dwbe2btowpj5x0r34g9n2xzi3c7j7lfmolrzf2si79u9raqufcazduhkolxinnj5j6egs3v2pdugd2vyd5ajk29su6rxjchx0afz3huwpjpi3hbzz0ct2hfmf4atovdgwarmsa0osp7l5yob4esyijx43bn6hmjg9f0x3foqq8bt7gum8ha9wx4omjaeyu5nuktl44xqxzz8xaadu6ksz2gzz3hp2r0ap1zzezmtpxnxk5sov65s1w9jo90t6q5bdnfbfwzz6nuzu9wit39ntqsadb3nz0sqt93kdt66gjjkl68qxuk6522y9mzxlr7a52xsg2n9ja52ag9ap8zhf9lxtu7x80eu0nj08xoykg562obkblknf4xe8nq6taddq3yzggr33lz41lzhwoaj3y48aswuj9v41n6qdwe4nm3pgqdltojrrfkm0qmu38v13v1fk8zgv3m86b0mj0xd6h5xzvs85hp266pijmhhbvncnenj3mh8ma29lsgzfq6km5eau3dz6t0hu3cse5aquoore8qahhi05o04pqgds99uzga43bds3sjuh5ztdeealey2ciu4wk3kohlmz8xu6qalq2oluguncwhs0fiuicyy7enl3kct3oio1q3lucroc26z56as42ejd8nb5dlojnt86q7y2g3fv50noit1fwyy74aj6ngeqex24ixo8vauofxry4mpramvp8sopfnckguditohebjym1rv3lyc9oyeh3wnf3kl8khqqt1inwsnlroe94rabtxuxqwju8mzlnlf2npph8xjhoeutateisecysaskaaldclvqg7uvory4xc3kc5e5q4p1n3ont8wn9s0hfe0x1v7eoawdbb97oaryrl42ucbh5c8jixu8ljuhjuwy1mjcg8wopcsr5jjngpjhtfnyhwfzly19g122qrtdcj1g1cgfvb60pnhjj2x3gd6q4380hkgqunil59n09rzr3jxumemhsv1lu9wryhgw3t9pmwm71sq7sujm7e6fd70alkfitt7r4rocwi2uqxmjill354xh086vixcbtrqsv9vdzf3v7fjivl7wxennzglf21ty8xu5qg4urgqckbxvg79zkmpe0h47y9yuuxabvazvuikj1emq9daqg98svmt2lsx9svrhfv3vg9innx74d7ixi6o1e21h03uieuazxf23u63p8hfg11nkpqpl5w05uw6m5jvhcj57tl82ynujthgyv617fi6t102yiwwrqpc4erxp0l66i0esynsfsel0w3rfiptk5h3vnq5lkelueh5z9oyg3rxyb6xrmjrekuwd6frtjhah2nqsk2mut2v0k',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7672730513,
                expiredRefreshToken: 2146374441,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'PASSWORD_GRANT',
                name: 'z8vus15j93u1gwlndk4mqvw98hr7swsg8rtajajs8kia6mfhupuias9j235urnbg6u0gyc0x1cfk1oh8qw4cxjskwpw4xrw22sw16yk7hdo6olku7273glo73cqt1pw45pzarjvxh669mhrfz7c06yyw38ozxk0xe8iz7u5ssn3lsdoymbs7qt6mft3m5feq2x1fvgv9m4yg2z5x9zndw18z2yyc1mgr80xnyb5rt12wfcr70x3pt6f0yy2iof1',
                secret: '1cy16bprf8bfo0fyq6uo58jywk5gxqbap5gtiegm654pi2d0d7od66o1t3du6ex5dbkxnzpal2mspmb87i6yvcbuja',
                authUrl: 'etrdksow4scns6i98nvwy67mr2ysm8atcii7bo5pjdctga6g5mg2msk0erfdzv2g8bxlnw463fndtzl28q8xwd4ova6r72qgvni4wag1ints5n262herpiprgobpl7q1dgtvhbfr16ve5mzc6irvuaiiig8s4mas7fw89c1xqoyl4zkoct0uw1jma084g6moe2pauv8686jandkbg0nlcl955abiyvz2etvu72iij3az3k7tv5eqrmuhlbgoejhc741r2mkzy264fjg881i70bln2ok4bbc48ba7lulpt5o723tc1fgdtup29spggtegfflg9xczej5uvhbddqr0rzgge30qks9sjr6994mdp6fpjk612bn29l7sgmmyiqgig2km0fzxykhdmv9i2g2m7t40d2kovpmco4440puqs8lt2zjqnm9s1n3zzbsy1mm3x3ffhb7s5ev2en3izwntgwxo12ny9igasq7e03ou9pp7am0iw77z3uyqfvhbqi1y53ata1asgcpbgbhiyvlib8egyl9gjfgh9nogagiches5kwk4xs0b0rg6zma2m0mf8i4sgho8z2tu7p5trgwpfby8gb4fam429zqbd036rpglwszakgwsu1cwjzhdpiba44enr48cqswcmxzkdk9tu1k0kfsgvzb4zagny3jspwfgxrouftjlxsm2hgjpc0uvmht9wnenxhts0ru2vo8omzsldq8y48zi38v1hhh5q88uxwdl2oo0a21q386bdu1gl7gtniuqofk8j7hhe3ygq1w7ua84jeu5xhl1usaprdjjfi29aeneazod0ye9cn58uhj5i35th2krvpmcvkyunah6a4nrwlfupb10o9gc6oukv7xcjz2vjslymykjlg3p61292kx09ri1dwho7toadr7opjxo4ef8ixy0qqj0pvzgpxfynrmjzmdo14m0bpquv03gq0d4v1x7lkuvi6dn6j4f9pv42igibbk9w5cc5bvskhsw8mzf17n5kvfn1dw1ycqf922arv55z6tk196kg5sokwg4z2ima23v6igp0v8vhydc0k1adgy9i2eugvud5ufubpz7zpdky6gbqv2ave9256j34220ic1kqae0u44sen9bx0lfthb4dg8jwabwhy2ghzgxutedk15vgz25tpc10oq7i7ftph3hlfmebndbqp6imql8jm1u4f2s7pr3tgc8umjmc8ekady9zng9her9l7xwre1oxw6pm66bgvlre6ksy50l2wl27kdhn3t0gogebgrkff2zw0lgf7pr6terswhw5w0u4ofr01fzfe6u76aue10ifo0n8s7ey83hy9u9vufo0s99v6cf7mg4flkqlyb7qgr3wvx801aeglm31r0hhkemxt1o04sa50ewhmg3xoyndnqdzbo8sgl5xxhk4r76kughf3v57xmza8qhydem0qhv2iob7bz1n5ctb5cev2vtdo2e5be20e2qz3pv2v0wsxo6310pbvmvglykunp9hw5g3eckefijxe0adisc8ccaxnmniczufq5df0s04ziqqvumgl26donx3k6xkd4vl5nv2rsg4gri2ilup4792nhiazg1zyizsmceqo7xmlz3xzu73ahsrhdvc4i8pjkmsgfgbrup9s259vbf5yswevi1ixgxnz9kdr7hdere6xv78427h3hsbwd8o78niax3vcg5u44bb7rist6uuamd6idjd06k0cq4lkrhl0iolxm1ln2j749ow89ielsnjuam7vgijzyzeigebt0u2ozbor03x0pc58c1jq5cgaalxujg3tsxz32sxl7992m8t2kxv0z176vs6nq6eovclwand763l9babid5w242xqudoxqsrr5qp15o0hqu4nfhge7ax7lpb76rtpwn2gpe1vk4tlj1cdeixs8skzkz76f18l0ej2pxcyj6edafb8azhlhx5nxirfbmuligkfej2o7qj0a3j6cfdjvd1saaiw4kvgl0g9zr7cnxht8ewm8tl0eevldfjgn7bfy858vl',
                redirect: 'nyunqitwh6cykxb0scya5eve1qv204w4ttctti106xc3qx177djrtwnmpv61dtz7hc69rp8lkd19e2h2lztme8cujaceo0fwqh6sjyccdgomggspr74ljtz9ko665b57tetunou8valovvuzzxe1cgffcqruj23enwdcqp0mszy5z9zr5uaxes30vy2qk7v8cqpk8xp8sj746yt8ww1n9r3rp9cxwouqaxvsmsj94ltiijbvuba0e7rf9khgpsy5iqagoatzo7ikg20wve16kzq2bvctk6afxmwu4702vf5v8y50qcopjg5svyy0y4m4uk0s8yagq5tcjz3pqhh0dwibi21hakwm3ycw6nrdr0ke1nd1j32ai10xh595myswep20niyq3rdlq2slaona6uiemlhpds229ezheeqj8m91a2v154wb5qc49om54r865orqsxfuzpvfkoukaf5x2u36m7hkbfeju92pp1evzsm4fqkt19365ws9usbwsdkie9xlivyz6w6uxa79b8ir34hn59k5xsfg2mbzj22mln9g65epk9h80vowb277j4cdf78df1ap3xpo59e8zpeiy1aawu77bqtlqy99jfwzduluy489z7vluvqe8kzum5zucxy9uw5xsx0wv9n636bm5674pqmncun2tmeljabiaqn6jym3g072u4vga571jvz7o1i7svv4pt9gyylhae8mzrfy666c4f6uxzqzl37weubk25zdbp8fbzpn9l5puonx00qxnmqwd2fjz8o95oih35yd3lpmjoapzeyxyg86mc6qudscgevaontlopagvazkkeptsg8obvc1wj7s089ozu2rl9pi4p3vxh7u1r6h6555zc8q26jsfa0k2t8xd6bpwkr321vzdrscez0o6xha4o6ze20mb4vw2gs8sk0tqjb8gpwad9d6wrxbcfppib5eledbp1qzoxqn4jlswtoqozckpz77bdkkoh0epvsmo2swcfh1akrm93oxxi5h9jlwd74kd959ddiqemiydcpnu48f2fx7smpo5ejqnhwtvp8n2svaoku5p70rm8rzq3z6ha1gallas5c2gxw2lrvpm0wkmtvoew8tg9xvrk8u2jpv0itkcjqpvas8lse33j915ysc7bvhgnpprxg664z1ahkqjumb45ycsxcrqaue0vee2aqa8bl9dgnykg62aonkobz5p77yrkxkec9nofvu2b3oelgbyg8pdnla0ttgqf1ztqblzwcdledajvhw3xg876csac3udt9snuy5lyqho8asu016wxkn4m21ef3puczknzry1as2itveoewuyo4piw24uf2dh7euswn78696w96a6xk1rxtv55udambaso9vl1qmxvljya2ieqb0werdw8ga5n8d2tjwlb3obm4lwnss3ul8qs9x3m7dq0u9r08pgticbpwv13uwwm0w6c5j9xu7ijkun84noi9ydq0z8xzt3z6o85rx4na68cisud335k0is00655rh101mbu1coqsbgxlfuv4flnwiumbch6vy8wtrkjvj7e79nxmsohpbw1nf5mr9iy71mhxs6vmfc4gmafjvk674i56gmbp7s4jhnw1ahqx9rp683xvrucbzpihexmyrixpdant1onf0xiq4cqv0mg2ip1qbai58yiru4jvnh7zdt4uytn6guohsxe7hcf3xvrzf7ayn8gnuj992egs9dwo0c40dx2p0524iukf8i0mzg886ai7j59irtx4tgd1hif08rx4bilr3zoj6plywbjgwwb4njwb1rb2y70g28fe2wxx84jlowiy9voqffu97jrqcykpfhpj3pk4fxqakxj8bi5keztvbj8006aiw8qa59wn1ilb20f3ykr5zhk1g7oomidui7k8r2r0ar57ebwdkoonw7ut6t9me9epcc66gyri5j3vw9nibv0wmaw0xf0xkikyzcqpvwy4ayl9o2bdcjuuq684e0bn2094f8hwt5ha5eo8a9r3oh0y4x2qlgwtsb9wjpvdy',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7923648012,
                expiredRefreshToken: 9978059143,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: null,
                name: 'tdrizxa57nab8i5x6tvxggz09xinv83t4luofkmvc4k6tj89hkiz49bkmsk3igi4l5llohflt6szhnfmum5mhknuxkk4crk1lfi5hdis97i4ru8yr1ec6zhszipidrs7wo6ttz64ao9hdhogyjrxu931nmbslsr6gjwba62mukiggxldae98tp6ynot5kmbvyrgl9yrw28ns9wvp2ge8kcmoum9yd79n5rh5bv428wx686tozz63m567bg3tziq',
                secret: 'aww729hn9mreqx3k4kq9knld0d8kmih49bzgol9el4axjgi409955fn4j4tu6vp46gvtfesdvqlb85z1bpadnh42xj',
                authUrl: '24waiuapkopbac6iv6m41jiz1zp5dpbdsokprh6wz14b9fg0vr4khsbbfmmj8d02op6e0xe4uiqx7pfn4qdlqsjwcyc655q15ajcly95dpcps1u6bthg6ctlb9xeudkq8i9rxh8n5wii5uhrgc0rgq3vej7vtyd0bhpuxfy2lxq57e2q41gwngr7ixv5n7bbga30kvkrveecs47o59863q3eoabh7jf1rlnzb4mu733zai65nq4aeyy5rma69l2q52s1xr6u9h7zcyoleq0o9jhhra5skr6046f46jyvy5pukgepc5ec8flal1hh1abqlw6e4y9pzp50a0w6g57xywaaym07g3dme8em9zt4fegzxwojkw82nm7xyu5prrnvsyc1wzzxf27zrebecewft8ppx9j0l08k0gbgr0va2rh01ntuypp1egh0045uum7uq45ptr0ac8s047c2vw24i8s0uo4pgbi2acc1r3kzzrooikcerz5ecm0pw56ikom0ybsoin2v3kpt2w58gmejb7resgiefpm7wgxxmq4px6qr1lpcb5qz9qc54tor3vvqv7atjapwjmlg41f3e7a29ph9te2mwnpbitfnx7qyxcbiqojdpct29q32gqy0mncemhqvusxlu2q2sx89fqoyppupnr0ps7dbp5ep9tt8nm183z2hsali9gaqs5sz9vioqa49d2hurwl7dk327ospdbdxizg1xh50ocyxaxu20irr4ne7by6j7gapberxawh8p5vcp86csqrt06l2qu9e435xxy0i3bl8ctcvgigdbmr8d8ets46hhy7aevq1lu6e3rpdpq7vpqtjgcw2qm5fp5yb00txd2brsfeokqbfgtkxm9bossao31w8qh8gquld5xywgmauq32dr0za627unj7en0qdjpd44u5ln9j7n4wf3breo59tjowl3g0yx6rs97xopigvuzwavbklwm7kiwtf5tbk7llxg88aoi3auiitbwd2f4w2engg4x2xccvhmq9qad14dc1nxkyzo4m1qyfaclwmxst7bndywnbeh2klvhm46w2op5738814lsqm2uy8fl05s38ifr12gjwdq9e1w27xrs4lmd56lf1nkfdpa4kj93lwg7bh074oi2pv4lngc6ie0c1sng9wwsfyttmx7stwnu1m596m1jj0tvog5dtzdsxb8qvoeiiwq7owkmxmxcnx0gtxv7z2hkf78nm55qatpted5wodjfsfqpmsr346qqzthb7n0u57xcd5b94ageune2qqu464vmtderxol5om4cyswj3ksjmmi5xdv4sqp8idim5xbidunz6pl4w0bxrg5efdhhp5a6zov9k504j7i2ot5f52hdwhd9tdth28f43zl7krwg8vlnjrhsjmtteeblbn72wgver34s04swqnr1fii61v4sgwn3jha8h8oruz2zpti5icx4504p76y3t17umjcpkugpom714n770ipe0uos64c6d5d0hqn72evdbrqry6z0pfzwf7w8oaiiyu1xko1nlb0eknxkf3431sw7qh6bhtx8a64ldy1ad1le20b19glyxqj8t5fnbypxbxs8hqqozuxok8wkec10mt8q93phc89l5u8in0mod6sqtwbfw71nx3at70azespmyyn6ajgwluxnw90nmrs3w1zu5136pyiihf7pv2mo3ez5ck0vbh505ovmi3ttb1nrh9ow7136al0mkn8wsd6opjnx0meedsgrff9by0reai5iutwjayfqto3fpauuv4knkrz7d9l64hqorb5lof61d2wfaseg7r0k7x4f1xi86vbcjd5xrgckkaufapi3fsqrgauggs0bhcja7p4fxb6vejmuw1so2v0nghrbmmswfzwbskmaz9hx9btt66f1vdx2vf6ij6g52y25ruugctuxrt2a6v7nt145n12t4qn7ph3fgy3ql2f7e0rv4sx9zquel23zad5ouy0b18oxhxbtqt1u0i2ce57q9nfuuwxk96q5x190m3j1oidfb3',
                redirect: 'ievg568h6o6otysmylm08gwae57uwuw3qxm7iqa7ymm3wcvthhwihqulkdq4wkk7gyip95kgr9zd8934g7bewmt8btp9cvxleb6rwcbrnef6u8mubvu9v6wn4aek49mg008fbekvuehddvgmi3sww4c4xa673qwx0w4duh0ieo1vxve3ipq3odofslq9e16pnecko30xv1f7ox11ip9kflda7yy1r0f20d5mzida1hbbn2jqj6nu3hjjlwp4noykg0jomefceq3s93dy0teohrj0jydln1gyzrgwre6w1xo633gdvig1syw7a5qcvghxmyree2q0favi9n3szfpjhg85q7789ef8ke5k373asyi5dazzx77hfst12o747a8az0pnwqlnqhy191lrzdviy0eo3gs1caw0czwgatuo70oe4pz050bfzb3g1czfwsl6sewlzr5qrbjfjys5ywhd18bf6j69xy6k9517vt0yh0od9cugv0lhzo2gtr22vm3ttyz8izphtl7r9rrqkolqe05olwn8vigqbgndvczjhvlkfvh1ew6cvfcpu8s09o7d09fnhu0d01hp6g8zflr0aiyjs0ming1314ib2lnys4qemi598yonkw328w9uxlfvm7i39i8xg0m288y3qvpfqhoim3vuc5qfoa5389nhiptzxorcg03kdx4ecyha02hhyn659dd35y684ru7jah8iq47867q3zy6nkryp27dvcz6n0nugb5tue2npuxklvhe8magkseki4nvt5k1w4edt6lx4gb4d4xlj3fbvjx6lgfo77kgh263lu54grcwxsyt306j7nmus88bhuhgwldlg9c2hp7gryvlwh14lbjb1yzs63o54ft2e412tof4afqvkpymf39oioej6hpiyi7so1jos1hlfi6xnqy4jvc0l38ov27i2zxn0gab7d1kqka8v7ie3iev0x46kqrew1764d28d7568j175lkd88sasjua0dbsflmiyyf8diq303j3z1sn6nxxboq5vchkazxnf80vechlt879gs5qfuu9kl9te6t3zcw3r7buaa2cq3hhg7x7lvoq4y8rtvzk851k1rbyn6b51avzn9wlkdx3xp9t9iwu24onfpfwql61e4cvhp2hfgacv4jgxiiub4nrf6bz1gt8zkl2yn9gpj44xmx0c3zzc79vjw7jxnnsxsgg2oo38nop4hlzceawpdoqqil4halc9sno429ws9scub25n3rsf1brwi1me9lsudvji91l1f3p2qugcuh3lu89e5nyiccrcbi5gbyuxp0is57ldjwgpw4kwcz5x1iqc4kat0zt9g050mjdvlulxvlbvffbqee2hq0afwsbwybkqkybyi9xfjekn1o67ixadu5hkuh54po89qvqavtz08vaqi4n4ijbbkbqv4rmxuy56ryw0hd2zqoxmlpllwc2h92dryta8w6181hnxo6o9e8wtdwx44tphmf7pievet3u8si1pe4w9fzs6dcj2zapdjjdaowqm21dy20qynug40ct0euhsep0219invvxlzuu6hp85nly4bjeytas98j04nka5zgaquih702ezgxabo5lxb9mvpy0x2gtk7uuanv8so9rzkzlno8u7qa4wvmkx31c5fnw6dfpr9bq8p5fzu4u480wziarj78zndsblafcdynharavby2ecrgl08pgl7s0i1yxhdplmboql05tq5lp4zijmf931aeusvz0jzlb6onk195mxkv6ziwhinduq45e7liicyp67kctacb34882m2zy1tqvcos6f8g35i5t3htbyp82fd7h8ld50wuljsitv91ljeutxvh5e2vipx8e0vr4mqnf8aca5yn2g4sz473xprl5p74w5ht3166ox2xhvwjmvc93mj7lsraiij7i8xix2eu82q42orkxfqtdibssl9u7o7qxvbs9wj14gruoxy3r7kk5om4g7eifx29wlyaboac4idmq9zkf941ar9fr14te03bi5w3525oo7kol',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9701735994,
                expiredRefreshToken: 5017249025,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                
                name: 'gkemlowmel1bh6nqb93scj5kjmdkpwsbj4vb84x1weqfj1z0teqmx7k73r5d3z52ssfcnfjpcvdjfwgljbgjig291i9d80legc2x9gsgy7z3ixzikjc2licymn4m8v7d9iw5mc9xb8sprrswb8460qn3qsvazjpucwidk6zz9id3km0w8d4mj598hkvyljxzg6su2y8ayp9psl33fj9w3vvck2gmcm07c8uyigadm187247ro58orlda565m7pe',
                secret: '9xjom0so2rukuyge1as49taj3f5h7ityvunidjj3bg6mvzvpusvq9770jlifqc6i70ktnrc9doq67kaaspxzidmow6',
                authUrl: '8jd18ws2719wdhbt4vlfg4wh1ewswoai4wvst9xg21mbq1h215ri869953qzh68pq3ccc9gkhgj52wkjvgusoqytqzejv0qop6ayt8ncb24g1d3qay8rhkruzqlm2on4z54rj6wgozf0nv5hwyi9o1fbc12m2qs9lnu4de0jirarlb21fgg3upajkegfduzd7ig5trbvwx8znq51ziyceixou58c7l1203huysuubgtcz5wyk63a5o9c3h15t8p0medtxnopo3yjulgz6elmeniwqcj9ccr6q6zum9i008w29nsv1ba4v062hsexnjj9lcfaf7f6hn6a4i4pg9g1xzvobycqs0e4tf6a3hn2d33rzfdzic5t8p6xye8uxnq1e058fntv60v07duf6um3kvum6xa8rxtynzbp01hkr7ruogl1b6rhwjjrkfs6qq71uy7m4kezvch924tpp4k9isnqskq36bjxalt1ypv1ugx3g2b54a3erp1px5uxqsd50xpng2pr18ikp9jwj0atadhw8wp2mum9dunslh4wnedhhuu17systzscd3s5yveu6k6o8gc9e23whru0rxp14ukem8sk6j7q65xdzughifucukjq85odq5ybhno4etzady8757r089lf28z2bgkydjicsplba6hv5ibv7d2qzfy1cub8t5n063b4jnfn2qszm470jx50ywodeeulrdq0oukgggfgljh5djdz35kec04j57ujiub6avba5e8nsam4b6iqd5sk16l3g24f8z0zldxaekn8cwa6q9tq0ldu6n62g66dxeiznlw5klxkt1zx6km7tzbxubk1uz4v0bcddk4r44fz87mz8mng1cc1tw16aeig0q8m89nfpy7yrh16uy0w5s0b92kj50qefo74sbbtbgnhq06frc3i0q5bhn9s0drg1nekf5ewdzppi0irr37wllfjq8iogd2l6up83tsumwpf9y3u6z4bh860ykcbgo862y7y4i5uagca2zdd35rb8vkzju1kdmp9byn3d36k9o2ypyi8vu3b3lfu6mnj3brqizbr6de97caisvb3dgc2ygiaksyr4p19pfgf2p1q25lb5zklbo3fuelc7p0d9nmhg3b78kol0mgogeidhlkh3ebo6t8h3acvdzjm45gptba05yo56cy9q0m1uoxa4hb2acuwmzebeqblps9by5eutibyjqsg40bfysmw9btwz45ls1hji66g64r0liehcrf5163eeny8z0lrawf1ua99ibv1l67pph5rb4esdcx0plta2xi7v8i0984885cylujxajdeuyxeq28178hgt9ci86bbm4qf6t9jingltr05z3lbdu0sk314gw9ytq1dqvhrb7z3ehqawg1r88lm9wsmohu94a440survaa9bdqzcsa0ml33dxn056vxn3k1hxbafao5ttlu789g00wt06q04uws8kekmj4lfvdwis3cvboa637ipnsnkmhjcz6bqjqdys5w2oadwjg2nsn9tfgm7cq7bvdudoo40g5533ap0fwbp8mmicocml9mqt4rfbkcfxz43tujt8f78j6nru4h2abn5s4t1x8xhc54wwkp1a01rgg8kv874jm0gc6kgxkjjgwxma2ev3zh2lmh2vbtzrgcs6nd9ublekjya35w2v7sehnjhvl1p55y6nt1l4t129xohlf1egkrp9y45i868jq44cnnbausc2l2esgpu0nqkesx88823he1jxhb5ydvfqvjkwgu1j92lwacgxyinrtdsuvjdl2i4evw138vrfm3or4jakp3909ydzpt4bdsknc2bchjtw1q87bq3jhwmtqyp19kln2vx9pnta54s9676t9s34cf9rmjqkoj0ik7x8eq50uh1f26dnn21j4nxw2j2ukci4alylywti7sv8f1fzasitsr4x7yrel6thjaan9lbrt53c8fc5d4ec4yt6v0e7xg09brz6aypid7j72mq0tkc93vj5y1jsd6iqw94ybco0744ib4gt66',
                redirect: 'ouqouw9undqxghzsh1c82ahgpa9pvg3ktiqi1z1hczijoid63pubh6s6fr80omuk1wi1fco1c7xoi6bs75pry9z0u85wlrltb2lgxcbo2cwyshjle1lj6970spe6yje1nedr87mj6955msojknrecb33z4vxpsad1nul7xheswfwpkmsx4ojceyg9ryl1nyor7eex9tb982t19gzt5lfok595b9qxvab7b1e9whwooegtblrwfst6b84kwy2efwgbr8xrh8pyi8xqvmuu66nlfc68mns3s1v63cq6r9d7u2g81waq3nlvvxwlcahrscduoqqafg1xjz0gnt3zdjy5gv9bx5mkyhxxevdo2c0ws7bauqu6wgut01rpi8i9ze70gy8rgljzyeu0lwq5hfe9yzahhzmqgd4s3rzu2rnii7flzlriqao2e9xsmce7bypjdf6auuw7iiyuihfjlnd1cm2dtff09i8uut0ta1v6q7fsxxldvwfu9gxvkxq27j5zrrbtx0xtxhjxcu4ck295a9pylz4c29e9pp26mpbi9zoskgp57xrkwmowoz0p41d0il822y75eghduilrkubrl1ca4t0nm17ei94vifhx4zw4neqnb9d7in6cv7hkm8uelcu3vmd1zb4e0ilxorl11otmcq12giofl9wba51ecoam812hn42b66rj1xyui0rxiylg48fwzal16eisjrd6gcwjjaf079pmorqyxfwcmv7xnssuuivm1p4cukppuecbnj07ri57hf4nx98vbgp5e3b4afbqozn4yu6139ihspp8l9b3rfgknpszs3wpjvczlqeogvz8x0yu0xo0gqnae9jd71bbhy8ndx27lo8nc9k6n5pn3n8ve5was6hog31pjssmw8w9zannta8x7llb3xhyzckdi1ykzwcznu6t3rkjuuyfl6cew9cectbdyeyd4xw0q61oixx7pyi63umhzukcu29i09vv71dkezjx8x1hsakf1blbze2x28vgfdatxmq84le80k8lq4j0mmvd42hh3000gvthgks2oplgotj3ddddsrtsk4iq52f05kh15dicd6g1k9o8kfi5dqh7v70i48nh3ps7nqqig8djkbd2n3kdpfer0rj6rb1l3wtv9k7kks0oyxpaf3d6faesctz9i9ns75o98oq105cn57xyxjhadc3zokdvwg412nr7u34f013jfyfks6ul4octzm2a3h9ounegtj6ktlb19v5lawqr6yi1e22tip16twos54rrq84jcmfol9rvpo3npzl38a2lmbagc4ixxlbhbxcr3a1z0ma8z3wcmmu69ym64ntdjnd3u9wvp1qo07q4tfeqcnj2va6mznusol9y2hg5zp8dvv16yo8srdehwn0arkr0v4ult8ge5gp17bs9ampxmpyqzdr41exeg31tc2rh4w5rh0l88ulhvncz94ijs4wtskphuo85m38ghacv35a6obwx84pcni1i197ntrmr1fuarvsf4o0gs7b2qctcqhq14xgd8i87bq6n92qqaf8q67moi1x4m4qwegyg8eazy60dgx8yjdordvi8naje0c9nyb02qakvl3pm9uxif2sggk3r2m6p9jvvrh6hjhcmnltr1w5tlrt3hhtkaf402n54tequifkuswel24i5p99jmasw9bo2gwkkl5krlt6sjhtnqtkuu7mury7uvd4nty79pollprwiow7tyjxwnqtamnmvjk4mdcd5mgk3xqwkqblkurb3ve8m2s4op3ilz3hgg76j14rsmfsmtgeognsl5bes4wlyj473kx57yf9hckdgs5wl4bhkqnt5m0zy26ntsddtgsu8e0rifx9174eqevzofytfj13vevjionfn5zaez1pbvsknmswoosv9x3tr459uord9d48o31x394ne1y529m8dl0lmdz9af23a510ft4cb4dze8wxmczcn2hfh2oxbw7yro5fp0pzawe4gyadd8vkt9k52az5lmjjxjujd7fgfklq7iy3fgdl',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1873278560,
                expiredRefreshToken: 1467948275,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'u0vu0cevl5wl5l2wwwexe8g2xcaxo2i4325yquc4x648zasxfjl1iieqfo7h5uev739bzjab4lgr2f7gxmo4spdp30',
                authUrl: 'rh9wqxxv0jqxr8n3810ghdqvbif5jef4sl2gokypnnkqiu9rtp1xf538h53e64am4hw3lfrfnd0tf6yut1zoy7uyqvkji3rigmy9gv6dlo50yodvh3b113r0lql97qg6cg5o4r2skg8cklqpqbc39eyjbttxtreedq8yx1aemuzatc2bo5eimbek8ynh2jhtokxf89qgo3fl45dpmll22w68cb11tv1082rxolt2851obp0pjonbek2eydvgs7efpcbtsg47r4r6n6jsj730yumrrui5jv5y4hjzf38almf30seazw6ch59pwj6zai4knz5ziy7q7xwkb5yhwypx3f61knt8elx2secbkr2q3k4symjadrg820bt8r6uqzp6ju14kfkjzsurqtzn8p7kzcltsw2g53g9010u1mv4noreaum3e2tllp70t6doffwjb0a9csj5sx3m58p5q0czb802s5vzn637xh0wue0k96kffjjwzw6r4azmuwbdj24bbm8ozahnkqbnuswitva4bxsln6jhl2hnokt4kndal9ajntyh5eqrymc89izs5anbxw8ainm3ffklwj8h8bf4n0gaujr9p4k8hru7j458bu45eu0eqgfrzxgkox7j9zb7e1u0kp0iy03qv0ccbzwqq7ciit8azokajbq5zwcpqhdr5i28j8140b1foe54x35g2be5fex34q30c8ymfgmzq7nneqpnunaw6hadi5jq1452aitaczdywz76elbc2qvcek5s7allex56836z7jkixwa1hf1d5ljf0klf8wc2z0s6z0n319fdsdoexoakv481oumbvgjp888ciwwmkjavfi7rek1gnyoqsa481cml84ffrovkgp9l3k0s1fj4wuemkyms6nb6g6zs14qsa28vhyvtr0tqzwqwa0kc2w9ro20c3pfnp7pepzdtm3lvlpitgtqqemw7b1kmmbh22z05l1uu3u4z03w2wou1l5hck3ncxrfvjygo8ynxpz438vvjt7bixelrddta717e2yzjtgxvo46f8hukbn1we3ty701jiq1p43jkfy1si331nyqrll5x8mn1gzrdfohkcgt5xoiigkmkjh0leb0icpie0fx3ojdmeuocnk824ukim0lwc1no2efy9njy7hhfauyrdwvb60s7c6bo0519ajwu53d5tmju0yp3ngpbmjtsntjso21vjomqxpo7e78unihheda56uuh4pbjdfpdzm3e6o5k3z48599gru2kpa4yrcljftnk03k0naz859vo8euo82uf9eu1ksl1qy9vi0kr30lzlfzxjal4c26oz0d0doiaooehjadr1a1sbeow0qu0r2ypelfeeatzvjttoxcx95t8niaul2oyalva4rakkzt0z4p90ghho414a472vn8v1fwydei54p23rizyvspkkwlzgr5m7hjaioocxo6ayi9t2eq80cujdnf2t07cb68xa0vdpio2mcl48hfbf1rhrwpi7xpvvpa8gvbzgnszv0kphwcild3wsmoqld151midrs27tw7kfcfvbgc52diefo7rhw7j7nhnks67kw3j7r4lw17lv4n02g0nf039r70nxnctnxt8kdadpua6cegai3n9vt6p0on2p2t8jl1fhfwmwrb6dznola7gy21rejyp83q0bjamta5rza0muoizh8hmyos12awh9nt6qd9m3mie2ofsqsyw5s40tqsvvewxy1ahp4mdg6btwyn3tnuna7fiv79acycmxvcqfkp344dyiawux1atydod9jkkapft8km0dj9vavvto7z6o5e85zta3sx8nqlg6kddjwagiqgpmrfku3926lagonoh180h9tj75vfk1ris8ep7187nkkikh56zooap1byegv5uqnf8ox7bx5m5uyeqclyiass38g6kygeg4nnw42ns420i9of8ll8q2lb72quw9l36z6ucwj75z6ldzd2j2k1y36l1wbtm9f7eul8uqybqx0ulmfvq1l83nuwboc018zhmuinn',
                redirect: 'v4nfzrltl1j41ynggla5ks80i5m0za9nstt6ywqfv77bfr1n3vv52u5p1mal25nvjkfhb9hsj31hdcglykydj01hm0fmt9n3xrp84l5c4oylj09l5b6329hgv0zlz4b72c7ay25h8idlwwfebylekgqvux1gaed3slgs70dobgybr9skgs8vkxovmrrota52r3lw4bb8oxy6vd57wltsncdvcjfhfvqdxdeqa8w3jdkhh6eaxpifq829qnd0i3cdcd3w0w4b4u93b96uh8crx5jy4aads56p1wuvn7wu5if2j566ii2kxoe23ez4hylor7j5856by20zwk838zcks9x2e5b4rl696shlx49tsacmno7tdphh2z3c6zfjh9qm6yvf40daezgakpji0dlwf1ipf4bbxuezasgreczzcnokqmn5qh6yf2hcay25obumul8dctac3xphbafz5rhtdf5o5hmfs11faqiryedsgshyg2s1exad19ib51t56r1v2fwqvw1fp11ofsuw4s2zuete21bmnsrp221omg0k9fm59zrph0aikrqquc916qqlkku6lc7d7l8thkqaijf2ycf4zannjtl0tz5p38wkk5rukzolno2qsifpjthbtfsgts3uup3djy6mazm04uy3o62hsuo8yuwpklj02m1ao57j339ib4pfgzvhiyxlxupvch86i9lpa5f2evbfqq8wk3i1qmlp47w5brb0zfp5t0xb4n5dzhfzojql3i7j7m3lbkwebgfhbljpuyo2hexovtapsirhrwmi4cjv03rmo8cyzaj19tuf3lmolc6vzczw7im0gjoccqx7boxm43nwiiv2q85wm32i43qdvtndj8zsktzaog0shgp8p69xy3lkzg7bgt8aqq23p1cbuzw4emzsedn3peudxtuvwnu9ya46b0w18n6kjktzjeoxporg2nzcfo1rpphg1xorg52ydd6nw3fk62c1pbuz10fle6v30e2mdi20pqwu27kqa2dcezdxd39i7gesxpiotvzd5aerx5u60dsxhljts8yh2elg0y3skkju1tvvctx2pd7bx26nhur9x62j3lge7a4psmikvc0zv4we4beehrmua07cw5q9jn7f3dok6y11up4k2gkh25vmkcolqm954opc7lwjl9zdfdbrxh5izhn5g7kie0m10wtcv1i5oohigtk41s90yz7yv5ix6s5ke9cbbt3mbefb10z0vkm9dx8sb5r97aj900d3assvk8he3ojewqgiweb9bna4faybxz4fpyfu7u3d72seotxv36e1lyz5gnpgjhl5kqjannlyu689n1azlgsbulmeb5i6vifri2qh6xfw41013dt5s7noflzv75t7h2xp2qkhw9nbuob0srah6s7cpvz28sajes3mmjqndfzid7up508plmiyv2ldbpu7w0rftku51pgk4ogd5dndecaanh0soz7clhq2sjc9oj2irpgahsyg7ihqhtivwvx685pdky4ow9ba4bwehlz6g4cjtvnsshm7slgoudm710nxn2p6g5aftqx8wupt38ic9sx258hengikhocwjpfyeltjx32jmpyh1uclezbml1tcnp1nz5xjdbmgt8usq2vpz7edqodepysocbf422qqntf6tkki5bt2lrdkhgwep9ztdtw6j6nxmvzkugq35gbxzspl7cg8mlt1c1gc92menufdbtou353ly41hgfouz18q5sz6lryp845lbe7lr4slxh7hsa2jlaewkk4kwiy23d59wkvgs98bj9704z25gv126ae2n125geurm3781vq1c6pdcped6b83kpce9vg3fcbe7qp5dfchpvv5uw9z62vddrevg3ddbhtme64ol9vf55rujpohy0c720b923a93f49b3jlq8mgjafnmf5atp4hji03c9tdskbaysvmgjp1tv14fu7qzx6ekleyfft1rdr64tw0gk3j1cfa1kmriqkts78ht8w4rwusfuqjmuzubj908zehahzp0x4o',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9497583910,
                expiredRefreshToken: 4673864570,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '72lkecj0m8z1aivk15h7a9ay2j2typ1jk3hywza1gybr7qc7vk8ouct27rfpnqcf7spsqxod9pxko0k67yhju56snn',
                authUrl: 'phoale91z2lgxqx4w2r6zoenw1rzu5tw61kwwajamdnn3ig8rycpwbmysptp4l1im2sz9gleyrxm31b908pfd8asffhwg9vytv05a4flkl9w3u0r37jq71xincgo4wn5h306dqi4lshgw7ay4u526ip8wpsgdfd9bjt47llke3vrf2ocujb22dr3ubzn24xzlnbrpexfkg7fs4xu84k1yftmmvdvpxixhdqk865fniyv5xc1mopf1t0emgnkiqzt2zdoot2m8cltlpwcl65jiw08z8d1k0sf2378bexvrwo3z5vmbd41v17vsctn5yjgaf7oyjnrd6d9n07csqunfe6n78njpqpq940sz44w3hwxp2ayoqfi552o3xzcr00qi78yw1vtko2jyz0jcwgnlulu1h08iwcfg25tpry9j44mgrwfffozm1x6v76y4umlp5yamwcc2ujn7s5lzkxtduec5r7oh73cyiu3w4rcntv41gji2irq3b6tcudc1qm2ddrsoxel8rrmuf6hua7fqm0t89fvvswaq0ade996ehlrj4wsya2w4ft4y5w5arrphwah5uno9t2d48yml33cignw7oy131nhgawzainde8mr8p6d0si5evfyix33p0s2o38je53zyqy83hf3fki76apc2usahp2r6ohqsqs2r7ky7v5l8oewps0p02y7uffr5gmrvuy72hahuin118uae4gu3vxajyqhjiiq2y5evt1yc07vr404m7u2r2qebxq6r3736qvgzfbtwdpgpijupef1ciyomt6u7hyl8puvn8mngvu2rfkt74net7ohy03y5odfvsiwjshcwo2pkiu100p7ddok0mxv78uoy5va6vhjoq9i7rfwin4tt6vwx4z861i98idojwxa9mm1ifhlvdrtee5npq91sbn8czsdun920kmjexen92sk0co9nj88qbju6jao1ukwdd4t6iypkx7ek1r2oa3zfjbmpsh2tqgmrfkj2p0rx9w9auk0vb6fa1jbbyhuk5lrwbxg64mvdyz0eh2wrwc65dwmhq60nghk7tyrbqolqx0q69695hzu8f4pe5wz6z7n3irazllzw8l1ab5opwwy72mm6qx183s30da5x06mwovi03o8cg6rk033w885h6rov18z5ssyv2ednr40thm6fma7wndpb2s6kx3hlzyme78gbwtzwg3igkvbungakzl9tflnv88rj52q6sqef50n4d5mg24mgb93sspivyjcrnqpdy630gowj8bq2p0gigd0o8qhwjg418nbq77igns8on2clyrzgj2v6rhaxxsojo6orq0t02cy6eempxzvmy7a4iiwltcj3k4on5vwn2c9zygj1c8e4wkb8ju5e4srsw6o0vite7x280rjom2r8c8suxxxwwrnv4nd86xey3lhog2s5mw2rluwyiqdekawolwtgclfr5hculd9zq02zyfgztibrxyxgav604hqjbaiuv1us2nibgp03rn25q9571322ou71axtdqiqqxz15ui9sjxc3t7bf3u2cqw4en2pl8r7y2dkiuav2awu6b7s3adtrjcn9awpibcaeqtipfh9ez3hzcjpkjq6fn2jz5jfozu81dy2w626cii6yh7ltjpgalm0cwkcko94x1i6nvcgz44rqgzty933n0z7jh5a3r4fqgat2jc8didsfd07xkr6y0cazhrayv0ogo9cxhe254pg5rs6zm9ajso1xezy2zgr6cv1nozm33dpky2byel96y3xs3gtpf4uzextmp11u6ne3ge4ukfesykkjz27b7snlj9y54n0tsjx4s2nznditqvejrtiffkyqntrg9ruvd9ujovscjjfjvbqo1alwpjfwh3pzj0rwyxfk8nosh7wjofodisntpv7ydgnu1gdmhpqw4dbr8e4ppb6xrvjrzwp5i98htob8uhwgd3tweccxp633jav2wrx267rens6v6tqhw99higkk3nrhu39ohn1uhk70dagnzmbw6av9at7t9eylnvx',
                redirect: '79mft1abe6xx8dyg5fcpdg15rw0lvzbk2t4u54wwcvksegt49795d7joq1uhrxtjojke0ws60uglw7uav6pi7mdn0c0jn638dcvg36egtbif5jxouh6l6z60gr9no93p73oz0hgydg8zajx87zvxmcegqmftz9fydbv94maqrg2ehdsgfxlybj05xsxn1pd2u2w499hngsgzf47zevt0fvskvygbi22nvks3bwbzk7uumswvq4do4ke78ergoy02spop73b32smw3hzz1y7cqsfkxgftn5tzu5oy08zj9jxic128f6qkgmhag7aukf0zr7xg32c113cwordevux0q2nvvudqzo4h6stir7x1qmiigzlgvsg7lij6kgn6lvnh1iqgryedo61frkov2bmtrrqtoosuwc2xb1fzu8ay8w11dnkyf4grsqtllhjp95unp77fc5pau32xow4zpb8svnk8u5xzvgym0hw75w0i0ttlwk6yurcp5hqffskok3y82t85kdcp7rypvnkas548fvqfthl2aiq3axm4ncvxuv7om6bs8bsrdejci7eofp3kmgox5p6zd4yngy5esmvt1vucv3h1h2lqva494i9234y4t7ki4okxp3wpbxhsi81rqx8kz2utbz7v7f2kfe9a9zy3karksi6gbl958f7vqsfr6c7avtdamwe6w2cjko1387m2ouybxfsujketnzrovt1r119dqjgiopd5kg5nvq905b1wwvx8f3xniymjgz4apqh54vgg2ulyz5w0pgizgmjlmp7cswfe0ie1tmq8e9xa3rethk0r2a8u8zl0477krn5a9udtpvl92rhkk1zg7f2vhgwn9o6yers5t9f886kbz4q5yley0fb9jdra3co97fxym9fj4u5q8yxjuz3ffdnlp1q1uxn5feaq9xm516d0r1e5hr05onjqi4qc8mw5njvidrgcyi00p71bp7tnoe7wk6wdxsoal669u5ow01o6rmz16uptzytraas8tpocsnfwr6f2vzrrsesiiv8ruwtz4rwgvgxcuf1sebnegluonk90b4wwe46qfi225zvnwnyolq3tvgyim3135znh32py4a0f6r82m7u17ixqv6pu0zq2mga3luykmjyvstilg2e42eayfvnsexcvkrnnlt6klg2kiszfpaxswy62jbxe049sgizh727l4ccgagkebs3rtdru3o07f563pzgk3ufnav5tkhyrn0p6n20cr235cmwmy7hx7i9dpqacn4dc7fd55fbpur9uax2e954287pwtzcsd2vuvaw9mvyqy3t82b3a540vvzvcnalkgqv1h2turepoc83y03hi8bt7vmybhm9hp2a4hvt3iesea2fkedosaf3fkr41z7ltzo53s08mrbm0m0wn9uatsnws3lwktyn3qmai1lv5fpjb0n4sksssjojqt8rd6ipn60rd3geqdoae21yoqqonudnhsbwapoejtc3glythgoj83559zv6bqax1013leby90s2z87od131g0uyh2hq4j9tud2h93byh6kz2zug4auuhe23ho5ri8cweotr8r0tj4hndj9i2wzg7ea8op0zf86awxi6pxexf44snptk3dmh203lrq9chldwb2mpqv8guvtp5q2uaposlmch7hr752wyowdl2bsi0ob01y9hctisq2upaozmq2e2okw9wrdnvf8itshljhktoq81xe50kszxer5fvqbqepshjs0zs7xr47z1zbk965dkgytdqqfqheyhd57l5fyh0lm58rj34vzsrqgutntv51ndgl7zejnscfn0n9ikqrk4476pmoyl9z0ogcppn4qo6md47sto8ket30cwteganq9kprfudkx346rt9mxj5gf29zk1f092hvnnaa9q6nwfhp92krff6gxdbedd1rxqfn3m7ovmxmwfu41fdjfu3aiyvz321wbdfzrpr9g9w0bann7klxjo0d8b10vqtfqvxlkqj6bt5qy83g6zppv6fg7qy5hd32tf1ynjs',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6927995066,
                expiredRefreshToken: 9464566804,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: '35od5d58x0c7a8l8cxmyi8841590uy3w33oyv884gm5chlzw71xp6h6jn8fotp7pgzvdquly2t61sv9mfw1mcef90pely03jhdpv5ncl2c3xszto3aqm7a8mo11pitryr82x2hfwb9n5n7srk188nh8dgm8cpv81ym6pk8si0w99e9nifndeehstc2mm0cpnyqshdekznctaspgx2pgw08sx5cjhhofitjd3wlzx0zdz1ji75laeyzt2exb4rle',
                secret: null,
                authUrl: 'drlzdnehwi9j5dhhlkawv6pwo94ewgw0q4epg4gqqk7fuo3mk3tqu2w2mmo89wdbfiyqhxb626o1qs50yjddhg5ouysrsr44uzxpj3j8gz5dtqtq2iu20lwmt2u11n24fgm53d1pv4mwj629z6wivvdzctgbxacsnc275p3lx0j9opw5m7qtw47i3hpbipsg72scjvouw88kksd9ifr01ineq62nvep9roqxd3gdlnqo8wsev0iwhgp4bv7i11r23f06ifzanyhpysw8b5gs0wytr8oawwjhte083demc0bmc9lb9pwhvd1jzhcddejvxkc58dd90gdbc6mwy9y4fo2dbyzmy39w6q458zrlgcst33xar4f6m7knshqp19qmygwsg8g14rfv99ylp6jwpeljqq6ncmcdprm03trkmoodf0wg2civ92oy3h8xd2insmbbqn7go8c2k2n7w7yq1mj6cgw9whstr4pmh2jun0969ichezugsbx1rjtnhnibl7zs6ut3kfy6n8fei5thrkvd0a3o3nzje5e7ky39nwoloahcsfzyplem8j1pnja90o41w3hmk2prf27546rst8hk5jt60neubwh6oepg1n2zmtonyvtqvfns4hfr0l9cdwn4bzkpmsked3u2xn61defzhew757icbglg9kkk6xlq7gta1nahynma0q7j96lbv9u52wolvkjkvbot39zb2w6e7emmfzq4a8j3p6yfe4gvnawexamu81idwcnojxwbs4ve890g8ftwycjd3nnubyp9sirikhgr0snr1730klfd0fubg6fah0vd0xjtpenzk3tudh1g5tpkw986nnduwsdgdsx7ku7lio1mzuvl5zcvmx5hymw2dnnyzqqz560ui91d6r27asb9lz0pian3zfrk3peou394b1p0nr7tbzfn5aiz3xbrjkxw7jmujxvei45i4gij5ubbdqf0hjay3kvajkpoipjq175nu3if50dkavzyr6tkrmaqjd5sxwp0xvvdr9lcosi4y15t6lt5lwk20s90tp4jjvq0q577788bamwo3ojbtq0wdu72pv4ogrxrezien7m2j6e2zifmui2y9i5eptbv1juna0bdrcz0aqxn4k1nxbm8sjmj9sryz9g0zwktkypj6geh5c2bzy046tdph0gh19zfordhmzpv1rbjwzcg8lph80dwelfjb43bxb6l4fk2uitehdn2tahhhodd2oo13c0ts15l0sthmrm33y1vc83nmqukaq9n8wfynoq7c3kz2td3yx0vq4zzveswjvc2a71aspos8czkahbbu23bxw1gsxak5kvcqgxvsyl31929lx88u2j1tljxx5vf6cas3o6wgi4jlj0hvg446cw8jwc8fa5wp8tf1lc66tygt3x6rvkckvtru6a9pi79at2mpgb5elowzx1tdfx1rva1nggin94y9p607koql7w2knnb5glt6xmc15dbx6ug90gcr1xkqqpvt8drca6vl59vuavmnsgxrhwl5aexbnkojpsfb1uv6v5ycn5pl3i77nqtk0twpi3ct62kz300f6aoh1snp5d8bhv9pk34llzup1qc1xm2sqx3vlic45rw8cr9fkiizuahp60b855nhd5xzhqcjtig18n0xxunhyukb9ru6btmt7gy0yjcm5yo2aq3lcpj0hqmdmukbuggafumak7gvl01p0vggcwqxkkvu7un37xnlehcsdz3k7u9g3g6yju4b70dyp21g2j93c3s2umrnc6xf9qh5ojsrifnep4n144k6xqy5pml0f10e4uow7ytvghwstocjlg84dwvvudtbu0f8w4gg80r1kcmjwest55p5k8plju7b3at8of0kf9uay8lodg6n12iel9xq4b3gucpvk0b46lap4ac2au488pr7k7ogw8j4o6vpucdx9zybhezn9i37svw9tnhopbi4ckoj3r11bekcey200iqfdveisg8x67gm4ojskiagxk16rp9ttyfn44gqak3w3yo9xxieosd',
                redirect: 'don0cp07gjb1ua50itg7kmt14yuc1iwqmbaw0otyp5k4t3ppw6b2xnu0um13qwvscc7e4406y63n49lyf7bjnr3c82u8qm0mes3elbmr06kjf61vipuzb47st9pnphxvbsg8m3gao0shppfptt1ibxacjin18mh56lsj6fjf28vvndqyznk7h5rqfnq2ijlulq0og6m06ksvambu57la6x37o4t18qr7aljc9r03znjbs3tv6msmxdeu8tqu7guqeqmmlxiqeblr6ibxi96in0eyo4deqabe9qlop1u81skvxrqvwdgusjyyu8xr53e4eafsffgnpeayd9dwff1rtxpbnig6ep7wbihvpunj3kmmk5syxhngib0hlbwg0xpzqjt6qwulql1ttg1xqccl68n59umawc133lhehsfhkzip0860hrey78mzde0rwoegdjma0aig9d89hesha60hjjreassigg1sujt3wksqb86p1jqyq0o9da767l9s630ulgmffvy7ts5k6r2e5816garqdyxs14nefx3gkjqjd1hdz5rndu05n285lgrh8e794i8lxkj8s7ch21jvrd523lfvwhuz5llmq1evaj3a7692zzbfx9y5dhov0d3mamh7j2pkcmzx86m94cb0bhoyh54huw7tbqeol0c2ucqh4kmftx3kvodcbj31a4gtcp1zfr2487szgb4j5jg1f2nhjaou6vinuzvko8n9gbhtkuj0l36whp2e7g4z4ccn30fe07i095npukfyp668hvl45uto609fqk9t8q54zlhbediw1m89tkeo6wc6il3s0s9hj8ogw9s2kq7u1art9eiv1k5keklg1zzl607tiny6knt038iwp682xo33wjpvye6pfr1cdfxs7yceqqpcc31neoziz8kija561atpg1zb89q3slmkabl4d531oz0d06e1zb512x179iq7zktgwm8zws3565xempsv0wje855gxrk3nayl28hgey2fwz9wqafl5jwzlmpvehcqqhuuq8e997isxi3evjqp4plw7853swjejaqnfsan22eqr1tbcqiggeg778nlj5nk62zky4c41vv2rx3i9404m16se5dout20posg0dj5ypyjspu7osptomjgxyj9sr2rww8usizlq9r13evvarcy7dumsvnq8rqh90m5i7eokx664b55m3kmkgf27g8zx1kp92e44ki82l8g28dm5y4bfzw7e3co3qlsf5n5u5rkfgx93lo943ncup1gmgaxxdnd6zzih8e001ule7e0g8z0zu4a6jj1iqotsfzm5nxzxxl6qsdjdpxlbnrmirxexa1cbika2hfadavj6iciyay7bnfuzotlvvp6gy8pmwmxgkdb8w5yks7qn2sd2l50wt9o82y6vkr9lhy5vm4zkcoohfk2jwaefje5l8xi5uxepmbv0whjfmz4llvshrgh18pntd2nymrj3il6l0ta3majd8cw7otukmuvo4b7s7huxtvlulge25oagpqul3kkue2lmzb9t8qxwsgbf8ntqd07lr9zyy2szmpwedg0maht1pvjc3dj8uy646esh17mf3uvjxwrrh0jjb79q7m05b8hsh5gd9dwurric6swrxzlkff0lu3pfn5ie79wp1at7d2mht7wcyclhlwwo9pnmlauayafsbw2dl0vuyjvhxboirae4ia3o21u4qk32ap1ftc3sxtx2kmdlcvf8g8zc0dhsnj77yl4llz7l5htnzntxkhd5v4ygil56c48yzsmhpgynkgn9hd0v28b7fuy3fgy1plmjbrhlq4sbqrvo03lt9butc5icmwcnkkvcrahcuc7x5eal5va9bn7fryo08kyyf0swzxfzcbfe7j21y9yo2t737936wdls116ec1vspfy82dcnzxlm5m9oh8x1wrwel35v2fn1cw0hpy667z1bt4u1vqqsl7z1du9bfk6d0vvyr0rxd8gqee83pa0iwd9kqt9zfpbvbgk8ko2wtqy84l2zibqq6q7',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2853550595,
                expiredRefreshToken: 4157946860,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'fjzkh6jrqqbfyf0zxrkw4k46nr6k68ptep0cvnati0xc5jvw7150liykp1jn450tgdyyoqik0hb8n56nuyd36r7evxtuzsppxcwkt34l325f5nzm3velsz6173oo3uwqhpxjj3rjztv7br0gprrprdpa94ltmj02lm9ikzebsr3aev02h7j6rd1j2ynloekd2e2zegu3azy0hc2rgea0mi6es6tptvz97f3c9wtfdrfrzzat8tk749ha4008ico',
                
                authUrl: 'zwuoruk18f4sjqea96vpuu9upml2ou4hhiqly8f8gt5kywu1n673908yfxy490erkucx8k8losbwghsdn35x1ea1lpp2pr274dcg6tlz933zzun2rjsxc4m7fckhyodyvc8kf1okixhfqjuymvjjqf25nm6bn5bp3xpoux49x3edusy7qade8zl9vk4ervknhi5lmdplk6eviw13zta05f4qq0cibtzekff6hthzjk9lclhnrqhit6720l9lpescampx55jyiax67xek5xls6racvafokj2cs7bp24g9udrf9yefbn3comu2lbovd3b8gbadq5enr9jjgaqwmfjo7mdbwe7iync0pprxt42p2dtead8im59zjlqf4cxdgxicon2cgov47tb5crnqwzatnbpow2lu7rybqg2wstsmg7swd9e3hokawpxxmto0i2rt45psc9zxuuzwdakzow3epa5yx1xejf09lh0jtrd1v769bqkraj0o85l307fhyz6mprls67kcqf55l6v1il5h4lz2k75o9o5pil14y5dcj3d9k00qffg6qnva1td1e6d6irguxlb4ok8q5cxq5cr5n4r0nvnxtk5t750tsje7gdrnivqaz5tveqij5pizp3erwemscucitwd3bhqw77hmlm2t57owq59trnxdrarnkl1irq4fetbaucqvbj5d4mdue6a5hzfq1uqt3g2fn28bii19jvqyq2p0l6yxrbgsxl38clo4s0diuwl90k1msctmfnjgnhjd55a1hg2wh72vmgqci9quehsevb2cii2ruzvt861dfq9scli46rpnwm5jwuc00lawnmezkx9gypn4389v188b73kv2psuesdov3mzaih8b9x4noc4ajk6sl676fdw9w282zfy1vhfx6n04qw2h5h7dkzg2vv3xlxsl5rik9ae19e3a29y0x7a8txgouzflcvcvxq7d24bsnqp0jms7xylveba69xwn98e9dcxm80sganvafijhvfwr7frtekkj0kejx1yefip631tjifk679n0wsw0wmuoiz01oftsowkop3p3jg67zrmedqj1jxsxdtxr5hraoi4n7fzc3pk6zlr2kdk1amjif5x6jo3r4r3n35pgpp73unhu85fkawgba8v5xpi2zks73ay3vfho0gk1hk4gfo0hsv1q0i23kmfek1gamgaibtiiviryz37pbymg4coh60kukunuk9ngo8p9kmpurobzfh44pkonteuzqwn0refadql4vq3uxq8udc1iv7hya2afh6vd7dqbhfpklw1jlyxg14g36fyhfre94za15z00t5n3egcnicf875xvwk9m10w9ztlwqlunllytf4h36c3qjymeqgt1dcuhxra6tadkq8g7f34z5gzz2jhdpwa2kem238zrz5ovqn7s5ojmafziuz6khgyjdprlz6le9cgj1fy297fsfi0ygt47vpovz7uk0640ehjk5psvjkkrp791z3ek4qotgthmvdfl814mwqxcardwc0otzeevzj6xkyr4798ibww1um96qz190jbzg60zz9yutnxyek7p0e6ysiu6s05pg6b4hu7mlcn7dl7zqy6cnw2i77vqi8mua6ntzyctvo5gem5mlw24k6fb8a0y2mjgpyw03fdof8j3143y30yts9r6mhtllftwk7rx3ob8iy71sy40bzmrux512ef33q5e0un2r1rrvy8dbjct9rhbgh598bh1u8utv1lsoqst9ole0fqew06o5luvl550aiduappyyd9bghjqj373ke2mrcvosv18t330phdzzgscm6u8wqujiedza1ik0ebzx1fxepq3n60s5avbche8vvs68pyumsr021vh6oebncoq0dbmcmeal1krmtudgzkgrv014r8krdc3fihnspel9q7glg2on0alqt1tydtjzxrcqz26ro2pkph0ns8xysxu291cclmwqbcnpw13jhjdwls095p81g1nduukqrhgxo7xk43e4sr0q4fakg54b41n4dl',
                redirect: 'l2vlhze6h36chs74joubv80lx062l24vjhcd4fqlc73od53e20we10cgk8w4aycgqffuxsfzemg5707h0ulea6nshgxfzlx3jkhwu9gztugtinhfimmm1eokkavdd99fnpzuo772hbl2m9lekkaanprzo5tpd44xc7i6muvi21g9jnj5bpyvbdqtofqz8v8210bgb024bv80hp9wdui6rfoivoaf1t4rsizylobe44lckk5iwd1rp8fuk2q9xvo4c8prwlnoan30v5g98u6gccjc6pi93bkvxdm4bne1tk4xpfy8ikce2110yzb1lqqr9jygywdk71knlppv0knxroc05wsn3pp2ijkbgke9tmmt89i22yt2rcg4oeh8er7bif574pc086cistkxrk3xkoncgw8pnep125vd46ui3kay6d063wtlanh7m1nvvom2ohhx0r27s4wd9i6m4lgy1d34awricy5dvwsnxmbakeao1j4r8sd17d50hovb8ir69k80xqljwc34aq9zlkf1x3a3hadhucg5p9tns11p7xzlgqwn8gysarohejeufqlxwa0jlwsfr7pv6qb4yfxomv4vw38yrfglf4qd4shxncd1jp09pmjzkmdtkjuyr65wpqpeg330bpjrc5ouop6a463nr9teaeg7bzpxnq7v3ofx83nk595hzje6hp47onb0tf8s9uev2pwifphs0mzly2dbdecjmwirskbc6xj7qz5rubc4h00rll6s16sk7bzz15sjn9k8y5232kq0m9911eib9yl80ebsrndpmqwypobbvdr4o68vd8dhkh3ud4qls5st52lqk0e0yk1vqv8qtp6337x1msgvfq1g71q967h3gsajwefhlc614gnj2zh2cajun8a3o2zhaxiw7kjbp7fvqkfk199ngpl7s8srvujoroejwtsogfdet7gkdwdfxm2db9n7ln9lh035zceqh8e37bdd7ivgkra6pqpdhlkfsuv9vahze7w86n0nliyokpnaa7bc5y1a2kvrn3bgpsoz0yh5jhux5urpkwt1bn38y28wcpvqypzwnfdrm9tpu59it7emkj9xmj3wi1673qk8lzncjk2brqgcn2kwht2e3d30h69atxvuot8hjzchetfgyhde87csj0e6ae1rqtqdq1t7gbrp9krcdpm9thyzfc36l6e6c0101hc8hapisei5qsn7rvky13ze83n57764voi9s7tvtk0a75rx544tqkcad7fzdd6muhen29dgt6sbsp0jyn4lfqsww1nzaqfqh57w8rw8d38x6jgc98gjh0qozf75axwyvgxvbgniglhvn2ziuuyluinqp9cfg2a1bc5za8izc6ndysdxtg6sk61ndp3aqjenb7sm90eq972rwz6quhjsxu7d4nhtzxf2wuf3ih9upguoxx9rnbnky84unkwkbz24ftr6kqikdzryksrolja2rrg2ulusn7k019xhnq5qj05wpjaglu6j53bv5yj5i20nzjdom81uakwgt9npxd6ffnv3eutp9l9t9ue52pfwqcsp4u73hnwkxgvyo3r7w9opru69v8fou1zzqioej84b1cqa1l1zr5k2arncn250px6tfowceiq7qxnwkeawkckjldnoh93zoah1isagqi8j1f80obflsha2l05py9nce6lim7v1cfegjr88ydd8528s60dmtvmj5b2p7ilpklbfn8tsojd999ktp9vko1y2xnzyiq0vsxvzo49e4t2w473806p1gjds3e8xbenhlxvk8dv0ltnrtdritp1qkw81giai6yql1f5d3b6nmr9aqfwl4gnz87v9l2262a118briznby710lv69b5zw93pjz3z4q521czphvvphrpxkek63589fp17v6ju1vqo4dzuu22euwwux01shhc5x1gyr0d31uzg2goy7l5tki283jrr88a3z15ob9slym71ctg5vz557d0mcrxz2ni3jnj448gypkyz1kwa5wksx2obadoi0n3xewvwj4',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6916395388,
                expiredRefreshToken: 7338287026,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'xwaisditjwkm206cbhmkygzjnb8n3ts7ly4ff3rve3nkt02eh2ghz313n8egy2h9otnb1bpy80nmh50kfyms8zg2kmr4ajcvlx57ttnr2bwoww9shsd6rzadfn1b3sb1nhgl3b1e00ir61fppj2hzkev11vigadvoa4ml5rd5nnuezla6lf7eo6txubb78hqitg8pc4rvnil6x08n8u36fldgblrbynakki7z0lc35xw3ys2pciryl5ullmpyzt',
                secret: '3b91dmjsyp2e8ojqjcyl9rqdghwg76gxy4gf7ajqq680bcggj0jmkhqzie3co8gh4qmzh9dj9w3ea1cmugl76vtj9f',
                authUrl: 'xqtouyk8vyfnxssw4lnnf2drg25qug70ciw94fggv9d6awcgz3j7gwofotirgbu9aitbl5pm2xqhjmd3dve2vip29hakwq6mumt519996gfw1kl77n57qx6bw18ks1aaqvapx20hd8ohl6i5cp6m7q7jcovcs01avkriyqhpgmzttacdbxgxy3aj9semoy2k38eix7jarjktqz6jv58zwabo2dfody51oyrh4vydbh6xv76jldrf8v7c2t1hhlqyf9yk6i8t8v12sqmfnmx193vi844436qu4jmwrm143e0pry5bijy90hgz8xhwjkvc8sqz5u75l0sq7bx3xb4l4gl5tlv5fsxv8dslwzvmb8sia3jrf325k2w5yxjsez093b3wyrqp205w1ck7eo225rd2sdwt6ymr61gvjdylc7q8bd1jmy1sz0lqr3zwguvyes1ydakkqaijlqzygkebwgnj4mu5exrzhg4urhfq8excta7gqwvjxvxdgx26xwn529vd2t88zi74j1fksgllkhr75d8y11xge0ssi3dkt3c0f6hjl2c8dknxls13ld1uhdvgttxlougcukjeuo7oh8upediidr92ghfbkt9kk47rcsrom3qxxcpoe3obeoaodxsi2u9qi8j1sq4e0ukcegjf0zsa360z7l8m3h2ueajdmiju5xe0tv3s3c4asn6awlc4xqo9s8gz7rn4gfszrh2yhj3s5svzxeeanzvnlo9fos5jmkwf77r2flgy8hgzgfhgkasg2olvalgcdxbyi28n7dz25fmbb3cfne6v42c74yk1qtl0t6b4s7xru2pxsfd5pm3x0iyz0a9xkybcv3zxtcu0vkoz47a0le2rva8gu1pz7kqrv8wwrqtvoifx9dmesdfcn29iuij2w25q35nz8tscx5f4qaqamu5f6g53uekrbsts71pk8wa2cynacavkqwbzhorezd8jprq1tt4iz6d7hdum4ofce9p5j0cs5w499m1n8xphpilet2hwrrgnmo1eq1or065xwo2d91dmisqzd3bgmb45bgbyei00ux8ljvvd5bmuyinq4fcyf953fy3gn0bdrxhcbbymqkpz129sgpkfo092jxmvnzrjfpif1kbyuec7feljhvr4pbnxugw99yuk8p4zaztx4rjfuuiy1fspkrs8p3z7cippukrtueo0up5wlq82q8bzmlsf6z88ciexi0ufnba569s9ysewnrfkq2xpuqte1s5yhsz8lmuf0n9gye8tfiiuc5x6elimeyynwvnu0jjztpmr41omygiuerzht0z84y3boiuv9ogi17uf49ggyypte5d80tlacatl7vsz84uizg1ted9xekm17qxl2nejp1pl3wevee4af5ffjyxvq388yg6tiff9oym59xpope6mjj3c9ou1mhas7f01k9ffrc29fqp3zf0vk0bvclp7zl8g6ql319celq0317ohpi7d1d3h1duwny4khdg5e11bdhw8k0woa7h3fh732xy1njxbiiaf7ldap1grxk1pca9xv6z7awdft3jars009291dcavy96nlraek0w5dtp2jyd60gsjgr76g7v74ko0cbj4ys8o0b8wnvnfjiwfqlsqvos0l3gqbm1yjfnm7gajr6v75euaq03sser663ch6sc07ju5ze22hvc8p7s0vcch95vwxbre1lhtopqytiycqjkaew78oeqj71i5d4c6uzr295v2oir0xdgldm4p83cd8v1a3rlw1feg9azna6p2rq5lkbbztqjme2pw220vn7kzd1529dvptbirhonnbvgtxlgw8jr2x9bra4z42dhj69xnod4qyarzefz2m6hdwbwnnvhqio5z0efe50wrfbshbcergurjad3g3xnmbc90ue2cop39g1t46x5torx0b4590zi2nz1m3tl9ouwa2cghlai35y1r6voyaz8h1jjafzf27rrn9ebsj53om50yd583o574v1tf1yq5z1qqzrct1ca8d3k054y5jwwpgnr4s78g',
                redirect: 'lvsth2c5dykx6nxflfqofpm6t0yc76qml9pvie7d3koawf9pfwhvzr01s2o96nyiayg5x3vybxlf04c13qret5vqbtw59qgkppj787csjpn0rf0s6q16lz8oylubc8grgv7uodg5llk222p1kvowtrxggw8qvq39z25brolibqaj6rst8fcxesdeeu25tba5aaeg2x06v1cq8gw5jdqkct6twooozpigjk0n8gy6ubvc8tn7lh9go5j2kdhsti7jmv702fxz7a98bv03wbn4eoy43r49tyhu5cwourrabau4xgasfh0wd3dfhkzauydmmfaivb6uww4pqlz1pdjveuc0uu2s8irpm3fjcfwqkcdh25ht695td3cgh2mwoa5m479o2mrmadzza44d7qyzkzdhx1tcpc8mc4h4q46rwon4i8y57wvekly4svodz47j1agywvvjfbj2uhwt6rsudzdzchetl34ys99efz6xwx9wngjvd5nb22wugidixv69wvzazpzypw7zy1fag35gmbokmxcb2zmgxwal8s2z4yvshk0mhrk2ejiesg8io0mde8rfj6w94y8asym9m5nw7y90f9i1lcdw3h3amvn5tergrd87jj21bzm0omba9kby9ojz9fklqhry1hrireikf2asvlyoncd2ttq6els5j33z5qi6e3j92y42b1ef3nouwq34qa3kri852e1q0sile78p5hfp9kpk5dfxmv85vda09f1814iu50snxtwpcyepo8ogllgime9tr6m7wunzvxos0qhuv26dd3gi2nz6069vaxilp9w3qnexypuz6uxnvvhv4r5ey9xwlaipbul5fy5z0kx955qjy6u1e1vniqle8i58bk0iaugr7j9qxtfyo1eb81bjsupxg51vzkui5tz7v0xy6csspxd8e8mpftskrwm1ryor3dbp0ozhbjcpgoxm867ljzba1q8yvhfy3wtp8go8l8lspm46adnvdlfevjywwm6wyjmtfbwj5kdxsg64n3x8l1sjc03v49ch0udf5g1bwgwah2qxymgajiskq3fjnsi7dcbs1yg96jt4t3lh1sdjlupwwg3dwwz96quk43q2li2mj97apycd2jxyotvn6ng9z36b3oluteewsupbw1697mix3drf7np7qaqquiwpnli5c3vpe0kdht02wuhb7koh9jp1pmsw4b92x8nutv3nngsfxs0484t685urbx4pecuzfy5oz21hsngv5f3mewkmeo58jjvm50uazjtipa5u0j8xneakbogic0srxofocmglvyxzghujv4l6kfv2edf1b3cnt6fqjjp8lh5or1k64swbn4cknzwb7bfjcinzc0y0kbpdngy19hy2ym92911juiysgqtdr73fxniqa50r3givyi9815xzavrs52jvhnkvme960fg43m3vy9g0a3rj1k8xvfuvs9tek1vdff1mhwqrr08198id7zstqmf4zh2m09f5etgmm2n0s621qjfvp4nwn7ftf6nu6z22fjj2su97ehd5uuqbgs1h0ht1gs72br9aq4c9pnkaglt4sm078jdmxhjqzihuohvf5nbwax1ls9i2uiq8a8ljc56g2jgrfs6f8mriq412ktubuu0u8xd4sl09bp8m4opvxzdety1611sbcr1qtmpzfoelj3ixj996sv88v373nc6ie3r3ebct6ityue6qfb964ccm37njvbptlfw7k1aspawb5ukckrpudwnhps22qxxptuy8k1n9fp5alfwq8w9066fn40uqk3f2qqzofgvjgti7bi6nu7n7wo3s23cwloeu8y1wwvir4qv6uxqyl9qj4o20cyf3611c7jyb4qidl5d48aw1sya1djzpmflh1bp6ctxo6t59b3twcvpgcemm8uictj0kv8j1f1istzcsns9vnh9g88zybporn16z8d9z0xfsyo82g4pbce2sx6rurc4xe8mkuiicyu6lyek3dw4kz6q2kw5ip8fdqy9yzr93g7wrq70k5k9tpntv',
                resourceCodes: null,
                expiredAccessToken: 5650375993,
                expiredRefreshToken: 2692761027,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'PASSWORD_GRANT',
                name: 'm6ywcz692z918kz6w5y9g22s0bz5rk6wiuhdlvafapjzn4htcum50wv9x29ojjt474pjsqmcoh5i4uqz0pfhgxwrx7wkplq17ekq09rvql0fiqcngvj2owf20ayrc7ch2jhppsh2oy06t7drnh7171bzoeiootwxjr8sjb0p4770rndsikkcwc21guqpz87977lsmdn24b7b14aktvuygqjf66jh8wyhz70ahcxx952abx89n1qaf2q75w3unhg',
                secret: 'qfr5zqb34cb9248u1ty8b6otgu8wgwomu5hcapqlls63j8lwlu6zamg7onh1zz187fjwdw8fyt2gg13p0gw2a9abn1',
                authUrl: '1qgfubylpz1cj6hm0i2sx0e4qr4hbokutsk5gb9adjohzycrie9m87teu7yhh23899yszy7q79lwe0sazckix57hj66c0qv544f8p4nvr22qvyjkpjwfdl4ty5k0hqzju73e9qnuwym0qmwe555u229say85ijqvbjpls4n953z3n02hvyidziwjjra8crxs76oqh30qpeti3nlcsrj2m49od8jy0j2v30v78aueolpiu9ry1hwna5vmg62v0vaouw12air34q1olk88z7ne12un8lr3o0pq3zmyve2sb9jspquciyia5h9uclbrvfkmqafl0n5rqtl5ai6e5y7tk9o1dqykscsieteslu9mvxvipnds6xu8kn0xwnnp5bhuwheghf2dsycgwmng187jdpz6egz8vp5q3ktzgq4rifgiun9rz01idhraz80uy3199v7fun3fzr5777qmrfqp2xkoso9jt3w8y3ws0a89o4s4pxheafxu1clgokyum782tcjqwuszdcw7mq0x3piv7ndgmyjls7oc9fnan787nkc1z94vyl37p42tc8dvuowl16jtjsh0chai5i49u56smx1hh7asr95vifd3uvpd41qnirs3ao3965a3powmhojp806c88eqy06eyz22n7kvm72y1pd2hohz2d55lptu2k6mh3euc07bm7rpvzb59sf9iq543ow0h6a8kso6nfawhqt49gba1z0x3rlcouo7a122uvrdz6baa5nhfknp7ew4rymae70we5zwflihk89l4yrab2wgcc7pxdnvrce46iksrkp1c4f0ribg68ozq6e1hqzkw1gyfcjkfbn63g0kp78e108ipkpdbl6484o7zt45ngwo932oiscfp1k9wnfdayr97uyc8ev7qbc8qar89uvmoatx17wtqo80zr8svyji2p93pjxuawwsfp4bkwuvisclctk7ba05gcq5xq9n5877i9skkthpdudc0ra2wz035jeyxm66o07pv97xfjpje189fldp72o1j0ojeu0pomu9ij30l55meurgvqm20z4dxm2rmwpylwplc0t9ccwbr2r5485cwxbrzwzdxwpy50doti5oacygeui54tjofzslq46qbygerijn2m8qxlvzr83l3hfiwlmt501wforktxwoinfzm66p9k40ooqkhl1dmuc803o283iv440u9ghbv14k31laktv7r4patdysxbftxdquh6kxeyodysyzmwtfcz6vuppzbn5flfkfz8egn3svxhpzgz3n56b6cybo6xj8zquhfq1gjtzc93grb2x105v4g4w72sbenc6vpvmltl7oatoxxccltelfq7n8paomt454cwl6ii93dd1xy8afb0kwfzqbhmh25pdz8hzkfucl8rydv98tlep1obl0cxm204hndn76ikahz8jk1yz3hep8he3160o68tj1y50oc18gqhpsvm48u2qi2rwex7l2cgda58kk7yy7va3qx3zomi9bshjfkfuhqjm1fcfqlrznyuqhiecn6uhk7pkyucu3d1ccrb5e1bquv32fz55hsxy570ra5vwxp9nrrqupjdjwjn3augg0s1rf7ff9vtjop7pcrdbkoc6flcd4x4ljis3hxetu4kt0phrl6aybdtzep4j2y7ug2ll16fd9s2pfj6q70byz30w3l4cdyyl5pmgos8l1orpq99v59zwu6ono4t841enpp6qecsxwv8x3frqi23mhjrcb5cs8f05z8f1zdcsbkxj2738yov80nxarby4nzy3vwnopmfvggexx4d5khdlyghbsxh9zoeeld6e6cljf2p1mpzsjmrjejy3r1n04pz0fgdgfo2el5ckkx13sxv472y490p6hj93ze9xdr1662iwzym7qxq0z0r898kw7rch5dfgvd5h7vhf0168m2df596eug9thyf8eb6beshtyesb3jaifrv77rurg49qyn4obhutwcmsel9vo8ltmzie10x433h68a5unutw6la9csvw9nmtfe7kp',
                redirect: '02e8b62n40djqb4yzyaz1bspqjafdubtwzam31wdqxv01od40c0ebpdb324dc6leo7ewojmre27a2hrdj8j30tsir4s1viu0o1g4yu2jgf1jf2zj8liiom31jfhk260zyrfzb3yxs51gzqf91sbm6b64sqyo6fbxl45bepiw8d8nejmdqd5rpo278wobinqp2733vo9b1htwevcdz4bi96lvzhtxp5dnpep17bltx0rlzdsg2wnnoce7xyjcqne0htutanertdqcxwtlhuvwibmc5gvsnq19ihkbfyh35t28ylol9b8wiroadrcffce5zz5ewk7c4rbr93hp10a9sv0id7jl8ukeacry6pw2kwe3dy2a5p0doedjfbozexvjpyqdewc7z7f05aoy4vrzy8zb0e6duxyw1032cftfdo87x2cit1rjztzsioil4fbvt8m6h1g86dojssurhdsa5xu9rtbnahurlsc9icylk6h5brbors6k7iu1x3uz2h3mi7njc0yvvq6tlydgpx0zhpfpnz5reojt2jozbpvz9h1lvvk3g0x27h9hlhq6qh78tecgvbtu41u5ixusppjejkkukynjoq22k5quciz0k9xie4syla183d1tuo5ec0d2j7qgydrspc0bcunxcsxhimjtajmy2isqpevo28zehq8o9k6tgcrcqay1uxjfprn5tzzcppoc7472edgq4ncdg1w1p6vrxp55y305965r7ppbpnlgrhvxe9v9w3neyyrhzr1hnedbykp28svhixnaab0xe48b9lij8n9qu079txup8hg8v2dchjykm8xtadzo9qcxa8noo50ed54n9e8h5dl582cto12x42a0ie44wko9m642xc8hkbfdvioglkwnjal8ci2lblka8fii9kvwdp7acumx2gtjxkan99c37c9ohntsfcuiv1khyurepyahwo9brdyrrxewzxdny8j9qb9c9kvn5ed7sqzeue759384q2vuo124e7ig2oe3zw2bo4qit2enj8cgcivclr7ns2yv3pytl9l70ndjpcf62x3qzyz3nz2kttslgwtso9e10rtnx2iviemxg4njobhul354g07hf1cyeplx2sb894ekzn2hykse420wj5qw845eh57mbwsxa2btif1q1xgyvmto3k13wodsg59dxm38kcumy4aqg0zqfgokv3qyntvuw2wxj6shct909yuf0dudvongss35ws39inj1fs35tjduz2e30ql7m6ht4xwsk7agjdri1ubfo550d2cd9q3zwjyz1keo2jsj7bg3e3kc6m1ksecqsw65y7bk05367hcapypr1zunivlvbugheoagsog0avxqc2znwufxsi4225ty8gt2a3uqa2zj5u6xzqjtrgveh8khszm1hoepluc1cm1mffy6tq3kud0tn3x0pksh5acnc47dwdcdo5nv55vxncwvpn7w1vr4ewlbysj7b2i40qyvnvlqergtkserq3i0wig0l9cgvcbklci0sybvrelknnz8zhx77u5g6yto4oxk2cukr4a9d1jqul4fgc7vmsx695fpl7gx7q882wisl9qfk122tenlyvvqvu88oyl2ef2f2jl5yisgzdmnuwwwcdbu2fewow1e7e693tf1oqutec3rnp2t1mz8hs4jp86au918jjqi81gl227gpigs6eju1thel64jpv2ntt9ta44gcs6pbcfy7x5x5jdzipuiskxnlpxyju76zc2y4wx3z0s17smauax47tam4mntxpmx6khuq2shlasaf6ol98mr795mxv8umvil001j9ea4srp9fclywuo3gt3gbxei1rx5hhc0rq901nfnol6n40hbu9gdnbrleusmvfdso9krskvqaliwonqswokbbrv6j0nk43gtuvod09aeeh1xxzu6xe07egu58k62ti07x9o48cscvsth4ndwzdbt3y6xfbsi6rmc6mq7j8trs01zpgffyziqlru596iiub1ed5f2j04vipmzgsa93g7ykfoa',
                
                expiredAccessToken: 2152672897,
                expiredRefreshToken: 3683667205,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'frd770d8aonqtkaa24ao2oq2gn6p5z8nipejv7ou9qz4zqi03xbr8xrej6kexoo3kpu4lc6o89qx3rc5ill4vwllvaw7d1wn82ub4h4hthaivszrycvtfb3cc5uebrlw4wr9s5tr19ik0hpp37ei5pgepqeztzs0htodeub5vrfy6vd0wosuytpikkr9sjborovi4uldr2djdnpgj478tnjayditomo01xkpktfgtwfw6a99ciduhn2osy2uvdq',
                secret: 'wkvxhma533abslig8jna9x3qzor8fv711cwvjgtbmqxsujpmx3u7bx8ektq5zvil18ihqv2i91519ux8yd4ca58jbp',
                authUrl: '7c52khwpq5w129ce3v2l10h4tbxxpnhxbo2gigshignfcg4ih1j8rjdm2m5de3hf5kstr6v7y4qi5irba37v6jzlst1z47lsgzvar286zdecfa5jrcejbogpy2xrw3h3nradjlihocomby0gciy6n3usly5vzq5gtoydv8tswuci5d0l0dkzx232mb0g2uwxt14x7nvg3qw549vh80gfvi9ewjjmtk42f7hb9ib1sa5sq16h0gcqoai12sog2ahxv2p3k097kdu29rr3gvjylw90izclinhazzao1faxfzm067s1b68oxylddg749olbsrfolrtqf0s4kcb4smi8gquhjckkhpevncwvae4t5qnsdcdwffhmnobl5dx9u0716xhtyz82vyben0jmxayu3uk6do6ixm6ti9chx0ize9iwndxce2ncef5v1tx0zewqfaxfrtok5qlrycdigr5brn4dswwonw0c4eezsgaw5jwjord6kkkgyqwcrt45rugk2u6ke5exuk91d21qqxt4ebf2njj4b8pgcnlnvpckcqjtbkykg63knlk9elp4k977i9te693a3imc6xsonowqs8ntq9t8d0qwl5hy5syj1sr3s4cvyqgr6l09v5q5o9hv37k4ahga3yawuff2pig7b81zk0y6ro6l7cadzz2i1cickfuclbpwn1dpfqq7pt8afszsgy9yp18zgt8tv0hdupa1ave8zey0d39ztq4dbprjjuu64paqz6vizqpjxe81ufxzr341wknp4k5jasf6xie7sym0ryf85rofxqhri3e4j28pxz0d6rfhtbkxj0l6j43on2fom4q9kus38xn32uho0ufx3cshyr5lj67ocahwsmswqx35hd901x5lx9wssa8yko4fig735h593krx2m4ospuib3ixwinzvfsjzjfx45fiuc5vkju1oj5ouoejv93ixadbjgyumbzwplx9fy4zjy3mdwq5dqm1kt1xoqyo9gzxl76jsy5th1tm5xpe0l5ja6qfe292cji4v0m2aaf56fyf8nq0xadwgaszl0tb05yx9nwkkpf7ia39q8b1i4eaqv41pidq098yqd6ymo7t9pk7zvuy8hwgu78w6o9u8twug3714yqcikm3yx5sigb90jfu218dl76v04csit4t4whzbcfl4q7xenl040jthsc2kzyvojv41cgr81zgasjft3z0uxal5q4qxr0ccn31jjo2tzu0bqkmtyfxzy1jc6ippk6agb9w6wd7xng9mlmjonpb7jf16fs87fj0owlx8ik16jcjvnkqrabpogeo61kcxawzyy486f9osyxh7ztz40ioccxy37nbdhloev8equ9pz3ba0560otlgmt5jeju3t4yen0ef91pg7xvow79rnz74616v26yhlnno853envzzw9jstzznr4jcvaz1k7nmx4zywp6hy14cn5h9s0q50ydx19flukscxib78agorcc65uwpwan7j59c97kn22thuigeyr71getqdohyup65j1ki7ygg7rawhrqhd8penv8uge631hr1oc5j58u5jz4jqhda0ga0bwetrn8svdddxqbrnrx7ckk6sqfqz2h36bc50azr5halnoyn4ikuqf2s1gsbc3pfkl4opf0cn95ufcbnkv0b0a4x678zn0xqik5aiiat6npt4cqdgybou46vg4ntiujkyiizzk1ko13egx80qejz30ldp0jggr0zf4awhmet6f27xuzszaxi4f35ji6emln9ql2pna9bhekka624hx0r28ksngwu5u700r52ctsui34vi28so8cpchik8eamc7xaf9px7oakfvszgmfy714ejorp6u3a2o9ui85bhcn0wk3zflskai09i7sn3usigsz0afjyhyz8pkqkq0e1toun7q096fdkwvkiyryb1tukzvdbxaeritwlxgm0io5cbyxa6zb482nfu2ztfiyjq4e3orau4ujjt2neusewfog4uxcknq6s24jpd10hp79rd09ovli1fcjh',
                redirect: 'etamq80do50b4zdxl67k2l1ctchjvjf65nppt16s9hq40kpiq3rmedrg8vahfzfy7vsjqsl1290e0ddgy4yzmm5su5214h1ac11l2cvxeb7uxh1nf1u8iiwlizf6sgosc52rwcnagwaeg6p9j2sovlzkqt71601n5chfyxs75ahb32n262jjmw7ncqpooelsmi6i8qm3gw6ohoe6allrmkc63zp685m2mk14n0pr789mwfubqzdfv6qyj7b7yvslvc979dterxg0im8npvpkbme68tej1ztasadhqa6s54zdr5tdkk32gpstidu79y5s44ocmtl0hzddw5ulsdmmyxjfqsfjhw4757cgk8bwxm15iw2y6249s6rctbbyvj38geympr8wkvclfmovs8f9aply1clfgpawwzymrichrm73b11dvy13m4rpfavf2n4m3jirhia0kuhksasihr98ywpj6fboe2vxlbm9y84pt4r7fyfzijvanzktjcg4378xx11xfbmprgjrbb99c3kpt2oy6kd3pfl1q1o8z3cflvsuivkknxh6178sb9kteacf90jellyb4qw6xsu875ghkyxcq2t4de6cmewoc13halnea8pbjl1q17zspm2rgw4efjwkqrid85k7ul5s0aizk2cad7y006ox3xnhpi1ph4c59okxdf5v8x8skuhseo4om5c0miolgb0a1c39hnrvx3a5mb34t7s6ytio77aqpog00sknr4l829e0avk26mqrnx7rb8jnn8b8jwhdtp3t132pjl79jpid0ehurymqmjx85kfgu88zd6l8mgiwi81xjsbgg1hgcbnagh0j1m6hwloqktano7gyx0t8hil8nkmmbthip5090l1r8i3b1g1qqvz4kskn2atixda0klyocfbtkwd5ofjg3kvsybvj8qg2f91aetrh0oj2aq8qe9lyacczzi4qgsetp4ih2icides352gyh7uwwflwmnz1wm5si6c9bmmegx8faog7huh0jrm5qsakudzf1iaztonegcvpp5rip9xs7y9ex39tzkvx1edi3g45g3feghkldxt20xajuuf378jsnbm8jekil5hyr8ha398cjqrrfkva2ixwj1y8tkhv2m5q2t6hmotp9v7bs30zpx1t58m4o2e1ihoyje4ldgw2zjgv86wgidhgp4g88q55yguxij4crv22tmjwji3ghnojw56a445pumv51z9sunxmkuczvhnvoadi9r68rn7j6zpmhfxnmvsdt1zp4ufcfhc9lqpmsra3nmbfwkypede449j1184w3du8ys5h1ryr9vlyxo0l4g8b5fr8aeirlbt94dq53t4coqv6kugk6chuzy74796q67fp6yn2axijp8n3y6685iibzk0nm6dsshhrygxvrug0hc294trqothzslrvznddofnsbekfbtfzpb2phaqfnov5wgoxn7bpjm39cmu7jj36i9dlunecllirvu8l7hr0ktvpke8jq6e298ie80h7ucyscstfeqkbpnn8y33w4uhhebl587jumjto3cchmg4rlmeh1pfh3n6mq8ddqjyoh5e28z9palfpmds08zle8mv190kilejoydjq5kv5z7bj6by9jm0td2hcxj5hyaggfbstficzuj199i9ueb1w67emq2vqs1dssgz5dlhgsl9e72wdo998d5uca5rxkuhzgn8zle2qihudcqerr7f7w8nt5aju665u96pc32jryimhytiosqiw5wjznl47fxzqr51cfa8hx38sqsspgl30nyx6jwnnva5of29346viiusg4o3454l38je9zsopgg4bzakssxvuck71er3rj8nrrj5kmopn94fnp6pkums104dl2a675jc6mc83n2r2z0rzlcgw3kpw6xlz944dc85y6xqlo48sp1y3xgmf4j68og0vdm011pllbtihz260btirhhosqj57s8dlwjfrputjapzgyt1y2nh4tmv07vlwlzcycvcxbsnv1twditvtqlz4ijex',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6891968723,
                expiredRefreshToken: 3392334403,
                isRevoked: null,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'uq2whsh966c0hyt2gtp3osd7e1itvg3iwhky47usiljnlx7syejsc3rvxz9ag5u8gv09a2y2z6e6whz3u7jnid2vh6a4f2ccs048y4wmgs4bxiwepa5e1ypi2yh6fhekw2eebegf0x13dygv9tysf4g1jobx5btaebemd5cp3k0ci12gq5590yuedhletnxw1oe8pyxlgmwdqy6na7jw69mb3o542qsebimnnj41db8stn9ox1plubb2e9sr0yf',
                secret: 'q11jd4tvmvt1hhpafrhpolg67e6yhmv23cxleuvu2eco2frp14ysvs2t8hxogtfdm7nes1lxdfeq8hrwvb5sdn4abd',
                authUrl: '9inj4vv4xnx7j4jmehcs7csu585fqx0q34i48l8cdy47up97uy7dzvjfey5fgwz6zu0n005cxx3i6h0yizjb9nndf3iemrj0dhb966qwt5ee531c3c0pr3rbgpbi8rc551p6fj50jczel10t3wz4sokb1kz0ums1bd1a1n7dl1h0162k50wpvhqfcarqew86jnv4a4trk2qwwjo33i4hl5wl6jzjs6ikf2gzwyv5a3b5i97gyugevkggoqddqk2v3ahd25fl2k5h0aq7gk3re0ino2sllgmrknp2zdnz9z4imlpdbd3ej4cdn8tt9a7rt03ou3bvr4i166btwreatuy1rlyqh0ks1nz2rs08z7r5nzlq2wc2dc10haogisvvj90uk7z2jpm5zrw4xf38kfg8j6tjrry5vaqk7u4y5jlvsfkzptn20t4993pqgmkb20dmme7bypybv683ar1pf6pqvb2lk87df4g0agb74mo7zrh47o4m94qfsyzfalqxj7hmygmh09pbbh655u4fo4nuge617b7d88qofbdf5j9zvvihanohhmaymgutdyxc3u5pvw4jzcup1yk29tg9cnyiibeq3yvqzgdg1rnkxop3vixvtrlpxh6vro5h21jrrjs1nezzwmsg6ltqng27ha5o6k8te6u0tppnv5tn90y9mgkr6dpqh2jsqs1t3vd6l2cx4s0nbqgbjpwn4i9kcd1phkezwz3y1uucldgv54oyhezey3gstfa3ev7aqd6d7t35c1t9a9uvuv5t0kp1sfwqvsvrl8d83txcrv1c5n5tlqqs00ozkf900g1mdrx0x96vog3poo6fiumf63f6eqbaiaees2zcedhlthxztmv5iml9bpzyf90p6rxfuzsa69pye57tuw8p4l9juh505mgywqp2ulc1obx3cs0uqlsuj3fk3cdh1gxddx15cvb4locn7i01vntfiz5qpq8xe08yadbg6pe7ngwsfcy70dcounj6u1akvgswng7jp3bck3zvh5iomdryz57j56mk9s0egaslvrm3dea5tjnzv54n93kjzbufn88c4y01maljv2d5f2ueqfox01fzg7xiurx8hce9vnop24xjcp94nwvkyyr5qo84hxjfu1rcmbdq35vjeu7lt1jhxtj72kdxwqdeez0ecazjjngy4wzacex150y4shq90rq0icmqes0qws2txo8ai3pbfnx7w0b1l5v6efbf48p6s3yokqcjd1ve4i99sjzikfqcawft13cg7joupt9nnv2esvrp7ar7w7bqmar9tkt2u89cjw0oeczmgqwhbmsqp191u7mk9p6ejwkfbmn1vuxmkuobzb7yjrgw0nakmmp0lbsukun1sqhh5duf2u357y5u9qej7ec97xxi00jhkzc8859m5hd3rturopxy61dyslifgcdh3dslbzbyglebvb9wcrqiwsak3utusoqp43p5o618l089jppwdklsciog73lj7nps5h4n2am5v9jcqw0tryld7z34oipmnyucxl9kwfq5agjj87m8mki4f5du3520nlxhfzhqimky7x10nhuk4qf4u8gmwo4b3yw5wpv8ui1i1h7h9i21kto52tmgqbb7h26kyokluwwzxupu99m0eji36prq0r0mbapmkzb8mqu7xer5m605s46b0lqpanv44pj45fclmb2tync1plozpw1bjes8hxrvxd0kj76tnlgp68vzmkktjpecmkrgtpfr0fye4abe8ywyze12ytiqcy8azv9qo4rgwfopd2u0on8ih1g50ir3pzfingzao1ijagpcqaleaiq6agfpo63a1y58vyhqrlrqk0or3ck21wgy87cfo859nbbm6ux3x8dbu3w7cmqyfg839rusgnbi82iw5frkt1we0kghttbhtp1cgbz942ihbnsw0mf1lcdsuc1bkogal3cew0p6lq7zzmupuwxn73h4vuafbccwv0wv11xlhcm640skardt1yjtlmzcuiv8ahzou76if0hdygf7lw55',
                redirect: 's6o6o9umdph4ivjttmswitepymsttc3fyzshictduqfpc382l5dijcu3ltqqeyi05tgpy3eqqxo3moaynora2q0zn7s64pmfz95jphnwp70ud7jnhoi8d2o3aj0sjafxqstt641uomyqxric9xm4twr5cu5k89urzcmvp1amzcn3mcm1u9xb2s9gnxmu7f4ws0z2cnpgk3rx4o3bv5yutlro4ipg1sdfm7oqfhi5pd20mqlgbe3ugxpzvi58zgzr1o51oooudbbchennkpa580t24b8oiu595jse5i5jlkgcz9gjlumjxxr7l51k07mgj8j2fl3zpmwv4oot871mmwlsxzg9lvzzwb5thbaw1nn68urai3pm97da9qed6ycsips87i29v7s0b62rcyxaqgxvtm82uzz937674hykfn8n9lhbrq1ytqeq9qe93ua62ggm78ovgk2lkpqdx1tuymqkap0pmduasx5saegc8j63d7knr42poicfpv7nwdlvjnvm32suf7kga8zjtaihweyrj19kfjalhuh3ngcvxok37g4d5y2vvbattqxv8u13ditmaz9sh1uijqm3cfcas80ctbo5ssj85dtf2am2t2tkwvsuz85lx3u53b2lxdhvx4x3placv2cvym1gzoksfq4cb9y9n9ngrsacl7wnl4hurfcd31pqjupdmxgmql5sv9pw1dntu7ntr5spqro7ys53iyhqnjpin9lc0q4tssv2u7fas5826nl1sv1rqz9jhqx3jfuj0j7rrayrnjr4gfy5me5aiy5zdpsgv3ws5qvoyx7d78t819h1fhoznrk2yc8dv9h339l15bnebr5dr6p6ry2hrv2ictom65bh4y285v2lo7742xbmsj7jp3fvdj4wl0f2ps85tmono8wtt9za7t7q2dt7zu9edq2sn3b1xi9tcwidj2kkm8rkopl72eojan0o7fc3qek1ut7tsm71foxy1rcj00blzpoliiy8r9ewt11x020hwk8hp7mknm682pac4ef1q8w7eo79y4kbnnihmfg1jmjejblz9axobgrvr004jcwdrwgb559gicymvyff58q3b0n3l402hmup9wt2l17rdwrnk8c37k672nqzu9mevofgewpabdoo31dq8lr7blwkw6w7qruu7p5ozipil0jollz3i7kmza8jockq5jsea79oqyuu08bvfknduaf39xuarh3rk43v0rcsdju6ylcs7o470aptzebv92hkn0pksw9b1p2prelw4hwsp3j9yjcv69ter7tqws6403mpr1n5lhej5dmebdf1ythf1rf2ikrkglb2nqwquarzavpbthbgegg411fstv0zp5ejstuwyhoximpiemirfibuzpjtqz74g6gddaqmb9adddpz3h022yat1uyhahvh0g20p72t5dtkj7bwhv4xmasax6opdgz34wfe0vp4c7yq7heizazg6iizf599nee5ij0ik8n0yxrqmhjdjltou5lppeja84hl4j0gtdj09px4evya8glys2rq6uj4h6bdvpuih55zhgik5zoy8tdrsjk8z7zd0ef81nebynjw7m8qqm38ziybl254rf43kds553yjqzhym25kny696dxxvi7kzx9ikfu1nuhmqr7x482semec5ndf01dy2ger8ts9oaul92tt0191mbt0lva7ayo7ohjsfk24onn2mio9xxx5o0o1bp7s8kmop2up9vhoxzfjzx69hf9p3ip8mf2y15peqjr19tom1k7c1s0k7ep51yq1qqyxicu1qd49ynesrnfhv9lyzt3maajpts1ut6h8diol7tx0l6mb189muklwkm9txculn28emk9lcabg0945br6p920i7mlzjk0ycxo6rismsk9wynhk82s96il0brt6g9wwj02o21g5yiisc2jmiqclgw8tgd5yc19x1rico7248setkf05ctnhnovy8p2yl0hcnq8p8fufzpnjp02l5jtzw02fbmfw7you1fi8cdqkr6pgs2pezpjb',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2622398428,
                expiredRefreshToken: 8409562947,
                
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'abm38ehxky8v60zvxr354tpse4spzqsk3w9tz39bhq7tupkpa2thmppk8axb8m07cymy8x4k4gkcpb22y7sdxwbd5oggdzdysb0kxe81tffynns00roh7f785aqvr7di19lqt01urghgsan405hc0j14s38lh9vwtlhac7c7q9048cx0rd6sgfv12hlg7hj31dzobka7wdp1rhl1p7u69tjl1yqvwphes69hkzjjcfzzfk0bs77k6zciys0bfwv',
                secret: 'asi1xgucpw4gr2vcugfx658q85uczwew6fn8v7rshhb7vxy3xj8krzq8f02n7jbshzzw9pus73n8mlvmam0ecfm5kv',
                authUrl: 'bir8mozrs6jg19wgp9g4d8y6cxh9i5u9xkontzqpf4qwi8e110750rex5rfa8wciqkfko4tl7j5ggfbk241gt5pt1owey1o860iq2j9ixszgfsm8euv8yzf2m0omewr73wcb6vbulsk4afza94df198ue98wcpfdetrtbakiy4ilt0n54hcewlf0qsq0rxpa30doryudnkf8ouux3wciobwsrt69f5zvdd51kw18cd12pjohy9e2rs91j00tp9e0vk4j599yfm6q71esgmpgqh0f1ph1tnsbf4hfl4j7viwvhndl6vc8a11pu81rnc4lzfph552hm715145kwbxagcqhae37l97ufxt2vzgkh642tac11iknto1yb439chwo3l2qlz8hiat9bw8n076xin8zzk0dsy6740iq4kpc89ew7d5hjvd7q5mlf8inl953fd50ye3fofu8o52qtg2joqc6mmrgs3mb5alf0i1kyjd7b1nufvzwrr7j2c7rc4tdigatiuuoe6vejlremutjfhfpvuryl4cnlgz9hhla7d9r3wdoqy4ffpufhtvzmksu7voq6x671rezil3fv956dxfud35dfzo8xe8zmkmxc2v29aputa36qs9tucrpka0chiinnhbh7c1nbxzl8v3hzrf0yh3u8l2iw66zxl1dndux6lqdtccomkzoy9zqebst7fh02xpa1zhc9cujpn73c13yg201scb6ic9zqyimnixto64zc0j049c5coxq5cplvuvwxlkndbxhoso77huvlmzxm6s2x4exrk2pun3jj3p3jvdrxjcqt944hkb38hd5bancbvkj2bstb1wysbx8plxvihmuofdngcvv12zvh6yr1v0zp1fn3wpg05se2sh7o3z14phjcb9zcf3qjgfuov33i21n8gwxsu6882236gwoua00nfc6079ime0jiiyyhvrcivqi2ob2qot1nf3nsf0ev589m7dkjbvxaazjwynlcrl2y3e4oiedq2nvevsi829c9zyxlswq2bx0mqx6f7owra3w643ghlilqx9332nsrc5g3n1rxbudu33lqot8fm9vt1uwahg2x97ozo2qfn2yftfuah8g3rb74mdc226fuupwr7rs2kdx5n8y6zmlu9y7t53542yjy1ryzkaqap19yojnb88meikzxif797wgm3syleqr18dhhk9ibl7p5yuayxqzqn83oy8syzlimtxsabwcqdi5m3trbj9ru5575zjhd4taham75d6p4vezwv9wgva30lhfwgxd84mz76oz7h6mfzljd12ffqtefa80q53lqsptvyr2hw607e8aejdm2w1fhyswoj0hiquyf7nu1ri1k36fvnhkl5kegxnv03a17x4c7ffznzo3qp1abj8o0hwpawpxfio8ocg7kpvhx9mx1afiksnapvpofm14z7t31v6x4zjwxbbyiiyhgh38cks21cjceoizd2zscki5giigblfrontlnlektu7mh2fkq5prh1vesy11ap3c4ibfusvkk576sib9px8i3nanhww525o72yg44yhe0yahzq1kmkaikhoh06lepcapps6aucleodymj4gdxi8zs1amk2in71acxltkmvn3mq14h5b8piqjdznbeefpgxk7lmyqy41wfr11f4n0xusubuercvzbbg2gs40r52edppnl9wt09nm7yn666j2p0icr0qqs2cidz8rmbqm8ccuxo50uszokh3tiprpkvmk3qw86ou4mu5kpizzpp8tttno0ksh02nxsl6mg6g7dpdutwu9x2muiciyedlgn7he1b7sr8lczzo9yqyp7fn12rxal6lwzhtbk6abfr29c6zwn2pmcmzy3ialxs8bzddbi3ulg1pb1y6zvizdpilax77rgdihqs0kzq318lracoi12q6vd4y7jcpzy62pbe0mhpcv9vqa76ovjhkvsnzqztuuf9zw9f8yx4ld4xpivd6xlx05jy5io2zzeh1pf8f6r52efwxy2xmogi8eytgondywh',
                redirect: '1hlows8isbf4px4uim81pokn1yka469sw7u4f8ajeq70thrk22dp4rc0njdhkr0xgo9p1xs6h7v1ip8z0yjrnbzdcaqs007mc5azzw18n07hw93fncztitmfmjvao2vosolhpwwgis4awgvjnycnsxebjm6mrjlbh3lldblg1zwk851e7stm0on4yj7c9mhywseimcm72vedpdoabdsjvmokcuq2ejsvy0z4unem20cfblszet1islj66i665ltjmt0pu6t15nq7fko6av8a0l1l3xh41sgej3t57hk6f7f2hslxfz2hbl705j8spqasi35tqefc5ty4dlj28fchiecv33d73mvl7y5n2oiv33w0tyi3k4u48kbofhd41gj2twzef6al90vfz38ugmxeeyvx6pvz9crogxb7gxph146nyavc4fpoxweualh1ieq49nnikzyu5b1qn5lf7tzo21ffvt4kw98nagfdktom7naijriqgxfa0j1khcufsy4k4ipk6bfjup1pquw86wq784dr5lfu425z1i5ugqynzhxihjcb6vbz51x6qi0utmtozehyvlgea24mglhixq5c9kxrfl2wwgvw2jxd7rq3579tsyh9ezvb0nkw1r6ek1is3xuoxg3474b27frszyyrpro1cksovkgjf2qqyuzbid0izvg83sr6xinwd01rcjprjq60kuu3royufmp5k9ctupzesriw7jxqel1dua3zucxm5pziduj34wo4npbkfdtpwmcwpsq5v3it2mny1ov1q5v3gz5ymjpx79ddz265tnrvghyvkcfbuel6aj32oa53cadeaei8cs25fo57i64e2dl7tacxflqdnuput2wzqo1d2saburb34vwqkx6giasehqisdqbvboyyx77tn375bfpan6t6h7wx649z2qik2mixog2gipg1trvda0727wlccwrn2jme7q37r3n06thnyieeabumrizjlitc72iwrrs9irn4x72x132aqjmikmykxwg3yaogj6tb2zhaf2kqkv6kqtj5gutc58jz0rnsyn7ctz80rn95j35t7m88wrc1ie9s6rz34arq76ovo6pfgfwbypwd93knsoxnrfsg1m4kobf8ufkr053txda29vskfidd4icqqpxbnwxkimz41unewb0vywn7y6355kayqk4wklgkigzdxwg82dqm8tbqiho9dj8lqfaw9va7auyaslrf69frurrjlp01kcd2fyxgfvoaqdi38kcj3yan7t46exc92s8m087nu2dj05m71ysjv5zz7lq7mpad1q95u1h4nj9934bjmr5njtmq8v6n6hyd4l0f8iv1nz96nos4nmjb0retw5a256q820dlujao6sc73ho9vao3wjhu14gjy14mc1r1lxk41xb3tg8akv6ihe7v22pgdrk8aqh0f634xwjvfkget5y3ystg1fc1hwc7vd5a2fw95bp4dn3az6q0nnj5gkoyg5vsf6kq98col9r4dp50hgmwv164qa6kfmt9c1ouhlqmvc4x7g9wfqabnfc0uewu5hsqi527hls73sems28e4kmp04juaxadugi3nyyqvthoddonkhpqk92f34vf8zsbtqdjy2tp1uwsaiunwsqwdyfgjl3tt7hi958bow25uh4h0d4x3fizgnvqex2d6n0f9cmy0ycxp6pyf2ubbzc1mh2sq671lutzgk8o6jdvlty064udbblpkm7i0wwi4bg0oqjvzi9ar16nkubp8uefs0v7f166qktmhx4lephznwllt6qiee4oafres7j8137s7pwya7gdyohgs8d6moy5yg2md6eksh8170dcqtdzw8v2rtn585xoallhvdoj2er92xmtlo8v7d51wrxd2d42w54ek7nw87j0l7n65cdt74yythb92dn3vo2j9c237dsbxmw281igc0rul5e470cid3xnkjcec0t2q6gtmj6643xfkwo0a6dd7mnzkmmkckyph46zngi35qxv8s8gq1f7tm5lmvpvn1t5',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4720344173,
                expiredRefreshToken: 9216553679,
                isRevoked: false,
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'xw2dvxsqvcoixe3beqabepfmavck8pmwqbw8n2x5gpyh8xpq6ita80my8zvg4zso8xwlfe8yn6fjudiwvxv3q7mhg23ve97nf8mer915nznmrr54nu2z4wtx0cujibxu3py8zy8rlvknr5gluphxpvag61enlcnhau6vgru6k2rl5wot9yqpgvzk1evdga9r7eipeqmp3d8zh7rhromlj0aljpxg42aplju7xnosvcscwb3oqevyf6x4mc78lkp',
                secret: '1u2ve9a9rip3zfseyg9e48iqfucnw6hjqeslcz9244wryv6tya4o3e5dv7ywsijxs2kii50u9h3eh1o96ygqnwbm58',
                authUrl: 'c0761il5clyduo070qd5hopj352znsm47qurf5oa6obsnzndjbrbr9il5yxsvf6duqf7q2pziqvf81zbejuz3sto3urset1bnd7fvokcx925d18g3cvkhv1bl6vtt93q9mvgvmzojgx0jypbwjbw4frlw7sztko2iwkmhayrgjz4csyaye6gr44gdkm7ucu02a8upyil925cngrqcdjdn3jzga4minoevc7jv4fh6lmn4fq9m7zz21eua3lmifyl9uyt2he8ekk8e0lk80ej8pby75154wwtbtiyn4zu791wr07biz53m1hrdmlrhz0cbxpxmx1tgq5d3ks3ljth6t0znq3nhlup25858o8mr0q7r5zgilklcnftqbear4fh2zp3l0rh2p2wc2lgias86n0ykpfd7g2m33ke54jtlzblk3zo501i3u9nmcls42jf01q3djk918h5en0d2i7gzjsdnlaxpszhr9jku1jnm6ppt5pp5le44ip4izjgz47xj2rr5j73u76qsusftw9oimi9t91o11w4pz391hp7ym1aeultpx6nqe3w50oxigi5ufb3csmkbslb9pj5c66zxcooh1v2lgv9vqcfvvvxrcz56m8wnnkoyxrhlg5i12kqrqk2vwquoaybs5sfof678f3r7gtknju2dqp74cpm0eyurteupqu4fe46piz1t1upfwzdskerms0u8rz9injjpnnb7u6vrmg9639g5a7zcsoep0lve8zjbgordu84xlukjfzdmdyor6cqibnw8rwz69acsl4bsa1uh0pka7r7n2l8q128s1pxlj5bdo9915zpmousu2wuyf76voy7gbu372nf4e0afx7urar4gltf7mbp1snp8gaty3aw24rxy7g0kkjfr4us2kfge4uzwco9pmmehewxd2c70deozxlaryvrrargfh0hhbjea4qlgtinmtji1gw6hldblq2jn7ie1ydoz2p6dgdvmqidphqdey287f1awf3sg3kiypn0alz591ppqebwvn3neppzawv7b1kq2l8dymg1cencfhzcumuz7si17qrh330cqupabo0w1trgz6wd5kpzigaup9g3erndm6sijwr4fdzm0ko6uuo9xwifs2xf5cl1juft7iju3ujkanoflysb3pma2r55eaxpqbwbqjcrwzva9gfrhjpi3jsik4ck026c39gre5nlu8638iiex9cd4rxqgo1jvulzj6top155w0xfzc7m1gy4j33vp9iw9vmvyh21jklntevnmjon0kbs37o5p9yrxv1qi14ku50zg7ybs3xj6hq5ekckb15mh8tuicvp7v4skvf73ke39sum7ovrq0d5sc41ng1uqvve4g2vlxoo6ycwd3t413sk2bsfqo4rru7jvlx972fq9wfq6w97fsdiyr7l6r173wtfuqmxe37n7bpnc21w6d6d9aueasnrj5atkj6lmmni2gzw236uzrty83f51sn4yg5mmaz3sgcsdsupf7bzshq388j3lh3mlozwrwe9i7lvlv5uc3q8fvhf3dchpisbph1yezr7t00oi4etthxz37uicbrk14ml4lngm5ib40gew8vq201g3l6llaw5yiahbacspinqvhudkosney5w7o4eifvu6mzlib3q64l8q0ieysyfikxcqjijfzpw70icppfadp7n2w1uktbrtozm12r89bl45uqiswj3py960tvm3vrt81vajzs1xf3ai5wy9k88nkcvgfbsc95wwum31oz6pkx58zkbbh89xbupofoj8w38s5i39ury0tz4cv9hb66d2xd4cj81c6eqzprn3yuwqnjylpe3uuqwte9tbwizz2nphrrg3ecoc7ccwx9u9gdajobybu8qwwggqw0i2zb00rrth25m6e0y668nqif47rvrelkwl23vo6cp9zfd0qdrh1wbg5dbhb04fxnz241trbr439gvd0q15t0r2hxrl1vs1kq1c0ds5ujmo4xny4unwnj9ly4mkezpiemcfph6et8xyokzd5dn',
                redirect: '8zq43324ni89uoa2z83s30s8kl2skmiffopo748rvwsb0ua34s6si6j8us6887ugpqmssr3t3is6feqx3o6xplui49600fjgw1yr0r0rdns6debkj3335dj3fs3gbbnkahmfr9mf8c15al9hipqjldit5874ucc8jzkc9xyhbwuu8rxkv63sgfmv7y71voiek3azthikt6pefpotl1llzmbx3gcf1a0xfsgyngn70jqsusb9qdt3s2u7hs2s5wegahglatjdymqlmdlcen7wm0ffg9wdvvzphwt45npfr25jjonlxgilghogt8c9x1o9g95w8np3j5kdes159qs8sg6um7vaezoaxzynresk2ouh54ec53jn2dcn6mr8fubi6bmus2tmawrx6c1abwtms990p70t212em5dsln6ddvxpg4wektbfl1pqu1dbzhkx9liqljii0nr5lnprveay9rxeoqmhy76mrq12yvmu23lyphhuin4gukq15mpby0g2182kxes9tr5i5q3o57hkmche5uu0qsty8785vdaau3904oqzeo2qn185b7ng0z28hjkcmkmrftib9ocqh70xgy5p84qwrt1kycy6rp3y1hx92spjpr5tw9hmizwn52x84qil30z40rxfxjkewbaraw901uljm2ijlsbr1md61dap3gtr7c1p0o4bd46j9kanyvdczrtyjeck777jmr2t4glkzdx2avq4bt6tbc1hffyz7jcjbrcsdynzxcrxiaqo7fmxkr6buk7xwy4hax7c7egazs2qc67klggb0nby7zkb2s0kux5gq3el5egpzy90mlw8kozqk9iaeno1n5kishvrl4aake1hcfgwiozaqn9z4a9y2he8cbapkhawuynjrtzaw6phqok2xea068wzha56z53j9oszn4q8z8vlrmyn04hh8d03krxbou6saocwivh9sp2amqellid7ef8eqqib0ewb6eje4ofvb7mbtthbyxkawahp530r4rvnvb46cpcehwu5wcamlfp7lhaptfuj5ktafco1rdre6grv6z2r4y09p6yzae25jt5wig1vzocmspu1p7b79xnw7voow1roifpmza6xikjhdge6jqtbuq6fyesx0p8iwvn9k1j6p7qc21im3xyj24vg029ron3yzlly408624w87i6kwk8r538zygs7j74b3tn0f5xw02l0vge322lqpc84ydyr8nz7iwpxkov0h0t5xszg4vf3bnooec5smjbbd007u32u7d12hme9bkevj14yuerzag5kl19dscw44qm3w2robgwoygmpb0dps7wc826eqb328u3cbp4div996twi6krtwijcgvh5xyxdt64xq3b6w59bzbbi3d1x2ux6jy2qkjmz8kfhif561q9r3e4sk0vf2a431u3h7biazwr9t4j7sfw4oc30fgacafnl9uhmz2ppf8of4jh9d67xzxhthdeb0yi56cvy8ndr31d89k96pfw3y7rv2mbfzo6svuyn3620a36edayhgcalnvsst31xyeeg4ngr8mniu764do8xkxu2sr3lddkzazyuw9yqyd19733kswg7gkqbj5cykdg8g1sgzzr2o81o3r50luje0dtca3eu98xkkdb6oyvd40gfvunx7b5bo3k456fb5rq7ub363gxd2denu7xcra91sxyhst4sgqvg6kv25vgvutyphvirzmth2902s2t8ieuubgsdm8g6fmgfhzgk5hukds3dehurdx9haeap4lpysdjldojm3tjsqam4gw647grcrpdjaw2mt2v5ijxz8ne2ju7m3fbb5dionbh2sdttr2ndf3oz5aq3ukovy2vg0yqh9vc4o0s7tluciundvt5ta9b7c9z75a3p27s0kxz25vsbfo2xfqd2q3jh5tyv26sr4bchswgtde9psmc9u28pmmmxyg5htjrrlaztu6b14mlhd8fyu0ouxnrp1q5kay11cylqlxed3y7qugopyqxxoj32wpwceu97fpes63zvhj5q',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7738522956,
                expiredRefreshToken: 8113791443,
                isRevoked: false,
                
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
            .send({
                id: 'hrv56wl5kqom6f6pea9eyal6vddk8hfamt13m',
                grantType: 'PASSWORD_GRANT',
                name: 'skezdjeup7v2m49f65j6scfikg4czghu8cc05uf16ykmn0fzxz54mtnsbglrpu6h5yfgcw32r0snejuuf6kx1s06cuzyz0cizo61uxhhetb5gberlynt6xg47duq3gi0hiab8h2xwmxyh1b65ux9g3d0pvrxlys4wdp6y9apfc2t2hd2jpyflof88qk89rrhiw5quvihw1xzcwvmqohhs8efrcz6rzxrjajxo5mlz5umbgjs10h9s33g55t3oqt',
                secret: 'asrfmew9fbq2p21eu3ay3wi9n2uxbkltpur7cjpcwk7y6qo3xow8zqx0yyucgclwj8677ztdjsognuafeyu5wr81kk',
                authUrl: '1dtt6c4k4r8lg0x1my7h7dtx0dmxbje6vcgatclgmwo1lkhlnfmtmxqq6fysb06e0nibip9wrknipvx2wop83vz53pj6xi2schzlv629ls1javq40ib6998h2d2ia7p00jgkovc9suxd99gm8xdsjrgj7ca8b78yu5nmya7o3lltf6ikhhdwc8tkjqbx7iyvi07f68yrj41zikt7c5ir1pimkgj0m7xdt3davytofpl9wvx7pg6yaxfi64gtrel187ue0f87jq0n68nayrv0akea6hvyovqsc0mubn05oemxh8golwxs1pph8hqpnuluo69762tkb0tymtcirp6scywpf7ba3bjihnsj73h81somgho3vt2hto9hz620sr24ghno4u5m01fccsul5bz0emycziofdxbijmbwl6q9n4hyz9seyfdfuoizsvbcjfycvz5abrmhtwihnhyhjr0oisbli9133t28cvbuwnu35cy5y0siqrlz1z40e6y3kobi78w38islpjqindafw1mbi42yxog5nl2526apuf33b5fa89a2ya9insvj9lhhepddx0jsk45u77gcebl9ehloi2vyzx4z1al4yuhscjuyvnis3m3mhfc54cetpn83wd71yacjbgg6f9lxbvs0u5butt17ksddrd3gemp6kx1sp8orlqgxpy0zi595ckrm7518cp128o69nss7z1qt1fu4w1bi7s6zr2lsgcbd3cprvvqretdbjkfs3prs74ykjewe7drhz2ba53eqyjkcin5nc60w4bo6406t9temvf7w5jq9bb1r5a7tgnuvp5xuh1y85nvr61a1uvsld3hw267duiqgv5xc66xfvz7d5nwz2nzu9ia2n5ci96o9x9ku96tg5x5ah4z5ker8ysoqyi704j1jii2xq7o4bboimayn3y3h61mksn38v8kueh1d2zw0dl6t0hv62bjlya1ym28u8ccpbklrhx8bc60zl2jjf201mtqiad92zmzp3ft5b9qeb3ajhq97i4nk3k7b81nl88el761o2y38d76fdgvk1uidt138m2yit9i3uqscxt1bc3t9xvl7n2fej5l64b0erfzig1zr91d9vitmv5nl7hdt4z3zuljwhbn69hdt24dkt474bxjwtn5qhx2plg9iqhet50mg9dwogavxv5e5tli9heltnuruat3f6xufadzrtdw3xvthdovuw77lx1ojobnkzqhmq8gyc5vrua366yffw0mbebh4fiplxpm8738w752yxy6n1c22wt6uqbwdz8h0avumhs63dt4kgad9lmtyvgr12b54rmeqwymj3u57uohpp730lxosnaw8owzt6noqvr3qolxe5w3ifckpbfh6yvgi7jqwzbvld1phh0ojonn1xwuw63dq74zk58ckg1ms2vpuxcfd7y6bjeyjyg2loiq0o0fivtjbe3xwy49dck5nxw1dcbil54pex74tyszcj47iobg03wa7mye13k44g6kyt1hzzipkmdwqharwkeljcenfg75phx9yzc5eyd6nfj76zyq87oro783usgvaq7rnks1ldct6yscfk16e1ug7m345m5du9qdsrrd8szi646cszb4a7qtjo6y068uj3ppvalywgrxs7tfus59x3mnvfwe7bbqzrntqvkhrukgnxytqi0xnq6eew3yvrrxvvi6gkb0wjohbdn64hpkzyov96x4xnystdl16upkcghl4l3yfu54wpzlcr0z8844uhl0u6dv6wmx4f88rr4gnfiywf8hsiwvrfwsjdgmd6x2ur1x13is7xeoefxn5drtx8mhbt1secen6kve60lr8c66y8t7mz5hdtqhpbj7198qqh5d62vn9pcnf9m3fsvbatopg50m74irc9n9c72wrr59vede3jh4dahq5yti35wp60kzwdius3rd0wjjzbw6ge2gn9fxd5mnuklcz4569xn0sffjivxucwcdayqba5t1auqx5im96kdhc9117mu6sbi9dmhgyksafbnngeypi',
                redirect: 'j8tira4o2e0jbla2126qkvgf6tm5hi3f2k58j2muyarb7aipd1d4q14puyiko8128wurfkms2448evkfnk13s1bkf8an4de5x0wapw3dh47ksq77wa6d7hl94nzm00r166xu5r83u9nt6jblwld49g3ebruntz9b43vp98chfjzqnpsyv0m1jqyzkzohiksss3ffe40ppsvzw5ml75o9lopwxl2v5phbi1fllaft70n1rw00hbwbe9djx1qn8ttivx57gl7df6qv53jj19irx90upizkcqd9mw9zr4djyd8m70rnb77ypvjpvgi9f0hrb2b1vjssu9v0fzsnh6bgzpnr5iq1945cwieimm2bu0msoc5dph7cmvse7n48jut1a507l9g4gf7e9365hol9uv6xfm7lzn6s8nsjixukzbp5yikgszi50p0tthodlr46elkqrdxyzq24p8pvaim25ho4mx8jz67ugzyjw93yjj672v51i3xf67e81uoagtzfo9ptifq6jst8ogl9np8enl8s8xeq7g0biwqn2svr3mcoe1xo0r3n3aqto48hr0dizgxupouq9edz44rgu72z7ihn6v890ts2ud5lslcuuzgn5sno2zr10vgt85r5hkjsb3j6f28akmz1oepxubzkjhlf3wuuioagid03g2ls0r6k41p792hqlws3d3dlzgg6mcvidb4lp70h7pnbkq55g3m3op9mlgi2c9i3ppaiquvc41uhan7rp3pwzlj5r44ajitr1ldwlpnnrctrm8tf4xq7seugit7pt1j4seotzbnnohjj2kgu1ijlr3628fsw7isdn4iw3dsbz5sh9pa1r2uvinq9yw28sl2xdp4jv58r7q6wyyz8hbqyr7vsz8co4ry0jotsbbe5dz5evbm1zy0xgsz28sye2lyw0ioysfepxfomd0996v8ftwkdd4lodjpgls23id3k1pjxj40mj3l1agdnlqkcxmzbwrir7rzkaphcypgfwcxulohi8rn5wwsw12mr48fy77arfhvdkm8s8jtn71jkc14qmptozmrmnws6yshhtwgeqmx2xrfox7yiz1uf5qbmntzjiqlsur7xgfwb7e255upxmjx5gti4nwqlee7t5jpci45oprbsbzzh2st9rnd41zeomead6r5vpvo2pd1ghzd3k16a7cm0vnncbsqer1g13wx5ntzyfyj9vb1vqifr74ws059ouvf72f8gzlro524d1bexxadn31xjpznb1cpm9xrs7b0meev1g8ti3tde43vnx2tl93ehut0bs8bfljnjefdcjcjvm97rzqz3lq9mo8qf7pplahlgy7zvbfp4ibm32el82otrlvqw6eumt36ac4g8x9v6rkk2y0zwyz25war6jtq87aj1s0az694eqk1w0dpljdyl0uwusi551o54203azc4b1r31wq877a1c4znd2z0iqqmju3i8x78672dtlp1hk0tdu51gfssda4bkqb502f883cjn6v31jv906aszeue6lq5sppaohuhb2tivgc1o1dd183gczj4srgb6cu4fhp392gku1hc2k75ni5jl79nzcf4t8h4pstyb7pyaw50mo2maf1l63l6530fwu82fs0q7f1x17lu9hfeyygzf6z3nfnvhjhpglrxd5qcc6qrg97nl08su083fymq214x2jaa3x720l8gh0fggqc5a8279br9hy8ahfkza52tx39i8rr3il9js4e76yx98nkw03dg5pglddk6p6k1s8n6wghsc1hc0o7hdie7kbm5iffxzgllcegqmn6ph8bgt4wjlhpm1yva4875bvct2rdtv57crp2sl6upd1szre8owxy30jphhai7i6dbh3shqprgsle6yaumk07wthsyj3pxavb1napzsyhgb3ldhs4ion8jl7s1t5qiqb4vviqhces26d154qqnnn7lmeomrcf7susfkcnes3nb9a5cxuhow7gqq9wwt7nppe1ocsuppnti8pcs2y627zl2wbyio2zgrleg9',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7783423134,
                expiredRefreshToken: 9128801688,
                isRevoked: true,
                isMaster: false,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: '3kqm2j3m0hrrljqx6zogbocwjl980vk1krrymj4x1yik6r9dhrd7wrk3s2ot3b8pixk782vddj8g1m13xmr7dvopn3m81ja7iwthmnrhm8vz65kbg5rd1caj14l2ztjsc7284bw98dnxwh41u3r522rlp58pr040gq85j6p5ej51x2wk5f20q99lnd41zrzks2vf5cr2fpp6npkd7d6dxz6qgy2vwpo964py15k6pzq1rjc5vpyes6o01v83qwsn',
                secret: 'hd8tphs5p3u9tda2yd4kushi2qoxprp1fb2ovtf9fiw6amnp3eqgg5y8o2jfd3r857gasg4zvy7bib1pyxd2l0i0i3',
                authUrl: 'fmsi5m3wdpj98h144at31jlxd355lyafxknogut7pq8dafjnahto78ca857v8dgl5asrq1junfc7o2e9uhtwzkjb1uvmepzxuvnmlopxldfn1owyandtlmoglehb6k51uj4mmdljpla8ajbt4hitn2iob8d7xd0z7pftdyws18sz79yfplp6lb08817w6rap9m8bvdsh7s9bwads6fkang19yibxoi06sqvw7fsk3e2bw5ymj3xhn82h3f0641e01c9emj4fiwg2s7nutnx64qcs94qvyckfc4ayoa9w3ds6ajf7gq26f5u8j40b1ubeb8alkdoao9pbjg1r2ym6cwoggxklmjlymd2546lwgxv6sox8qz470oovrcckloepl9iqjzwilvtcpdmnjwpnniob89w9gy6bq35kj7cj4igqauc3cllesg8di8m24gm35agmkbivroczwi8s2aig0owp23hzoa5t13davf1fafay5a0jcdeynpfoi4evpn7ux0qoo0ld0dtp0uogcjdmx3inhvx6lz7jhjdoe9mmvh3u7vr1ktftxmyg2lvs4o3ted533f8as9idmx1e3wi20npya9bdtqjyyor9yrfz5nyno0lqw820eszs558u281692rkw1jnj6ti59lo4lfrrjjnlr6hgo8iwlbhkagq6kslmzcj5u2dr3rionbi0f3vt9d4szkwjmituw7hhkgoy6sjxc2o4iwu2evfkawumabbrlsx5a7oqdyrq7zv5cgeqxaiqm9e90yor3r62idds5veylxt0k4o24aly9zt3ei4z0n266ocvd21bry15ttw6gssco9yni76j8s59i0ynwia7q65r1lcj72qxxsotq3r7y3hj80wpk7cx9px8kepmqldvbassehj8rp8jtfyk7gg2zmg2gj0wm3v2kq1wvrsyxav2z36ahs08iytn5r7w8ntjw4s8xpkdqkhn5mi77rgkgedr44ws52hiue3998daef0de7i1czdze6sfy5ofhlgyun5q0rdzvt8xgmrgo7nefw2c502hj1xsj9vw514ln56p06yfyxmna7nfnoqa66steko2uk59q1ctg9p3k2496qfstib4yet3hp1zenor2rj50hu07y8j4atqrn9b5rha91owh50956pelwar7peyiiiash45zr2n53zvfx4d3b7agkowvga1xql73k9kgi7icniyajc5f0md5w4ednun93a8hp2ynbrq31k0cuzgcho5k6wr252ceq0ccsflolque51y73onv6lmyb077sv9q50xwn825f9btyq77vud40st42we505cjttbzwzxat64n8adn8ihutih1pcv0v0t03s5ks956p8zkuw2gfxe03pg0urvhf2u3x7ge3fpn5pl94zhhnqdl1bbi3fje46eg0dizqgpvb70aa648yszjdszwtnv773upb18chj34h7gb2jzjeii7etsobkg5pl2tixz27tdfad5ubrn2br5rjnmtc5yuox3yvxylew2tdqvo17t5mggxv0xbny2d4joakjphqoeghhtyvfspi6gis8bq8rq2fup6vmn7to2qxf80cql6683zsz8pxyjzqsnqk2ilz1epccmhywk7u1epnsiknziivf93lcu9pvp055ekoky0gfd10khikgxb1a35xmbd0u7v7w21cjwvm0u327dt3r36e7ouyimru4w20hm884euaq486n7ksbcccjc4ykjblvbazeow06la7y3726gsqkzfzkccn4282jnyahw7a98y77skj24lw9ou0t47z5t8eubnuonw5uyvjyywco5p4iftxnwlkjpyqfe9639yxcc9mclbh4qmid693wrn12vgmd3ktxwtvwv2f6nexpst9q24lb2owrlk7dzo8fmap4znp5bslouupkxz3s0xt4as87kmfbo3wv4kv7m7nt89c98qijsjj13ytjao5mpfyism394172b8la55v6ti0oy62rnbcl8b3osdxsmyw2fsx5emqq997mmjjr',
                redirect: '2wozn5u5n5k26ffni6fswfgtwskj5nyxk0hrzr9e8zqfxg83cf5y9d3gh3sw84zhay1k8hj82irneu18izhkv1rb7h31p2s5piif71kvkttuoq59u1vgaxwb7kqcke00gs3y21rsaa8l44j8u8o7l1dxu5bkb5efcol2g1nmmc75g9vk0tztd8f6n3q2kny5ruzu3d7u8k13sebbhzzijkchlumtrz2b9gzagnhhp52ows4ham0lgyygao9d1wj7lp9rjmv3uxh684rsxaacx0nawuqklujs2hv0hrl76hpmky10p8e2rkhguerlcwaio572zg0jdbew0qouirbsei86hqddybucggq9qmxd1h8bbxg0c1pryl5y8n2taaqhpc254xxpjaoj3f2u9yxlml2ye7vi41qhm0fvien5f4pcyyue5p1png8e32ayui14cr873f47dx0wozaii3kd6cl6a2gjkrswy1l80wwdq4qyycospww32th8aye0sx3a8c1fkruk6kk5351podx7l9o2bo9lx80fuxixpw4lestpjpsuagrbytxa71uhypc3204f4t3s9g0ptkuxslukbwmnxo399dt3j7uq6kkrlzotuoe3wj14r7hq5u5z8tjpq9anc0uqzyrjj3b7p8nlvevylvlrcgskstios0kdq7ni1h0a8hgvuqz6n5lc6ab6w5lc2ldtzdqp1i8ouv0ko38my3srxk6f8q5lgj9tfbe3dz2rqxxtchyzk9yg51cmkf2prm9fhj7o1x2p81jsa35230x34qu2q4nzcws1rs9jqbu4x93b23n4qw5ovgbrroy1ewfbffvn6rkle2jb8dt94z6sxd22cqr2moya0qv6g9vswxi1vi8f7ravzq7czb12f63shxfk0064psrwxacblk39d60xd2m7g9h821tqor3dsq0tduazx23h2yadg0xbev9kn4w5hkrxae1n5mw2on2oxskdb8fkifl5qhszmqafg7jigspnrnyxsd67n1jo6xtertp0c34avfi356rdmn4lw936l082462hgyv06qimq9uoomczavf8b798gbg0o0e9pjxpf06vci3cou36fhpkqlo96efngu06gnu4gbe51e9td96gadckgzlegu068z8iqcif5fu1tcneidzs8jzjga71cbt1vz57hja6kbvyeawbf7diewmlz2wrmgfwg7s3zrkm9mgvl926ilsu6sr9xvvf8e5hyacr9fv20bz6yp5h19sncwwlw2gvvr2fbebg7st9cy47bbtd5p8wfhhjhljkb4vdbb1t94zm6bycth8ji8nvui2sp082bzw7j2nc94xjmkwh4oqvky21xnxkvw18p1yylre8ack2m3cicnujkt0g33s9j4k571blbd5yapy36241vuwwuhpvjt6gpk0yq3n2dc04ueg37uhfb78xa8e7zqbkffjp6yr1jimy8ymou80xq32bfn0n4j73j9fuzsfren54ipcq398s4k78lsrxaeu0oje6noin9ab4abdc6zcla4e1wclq4cy1ps8k6jombgjh7ydhzd8k4iqexa1e0t9pleux5eer9q5gaz00zb2npp5nhd4qsxt3kuztnd0kman4c7gmu93tjrjlppx6a17a24wvvilevvu74drfdcib5knna5j5hktfqx6urb6a9dh38yrslij27cqr2d70qkwv8dzsiafrd45ode6ak43kcac0rv9zhryjmeufo66ar66yfsa1kdj9b2ew7cp9g23yiumq3vqljkpjyb133282ex44b9kqib8dwmh1hedmi8kpm2db81uhjf0rrybz7jorh93qjudfrn6evofwz5wzn63j7b8grukn7mvu3tmu08nsogjjx5dw2u5494cr01tf86281y11nuiyeluz8qtafs8mtyk9ukktpki8nh2etxy2g5zub9f50zy4wrcnc9qfv7xnshvjz1ctm1v1zm8q432dhn1td457iqmgo0yy3vhwnjp8jiek40px3twu4kb67ze1',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8871365882,
                expiredRefreshToken: 2547234853,
                isRevoked: false,
                isMaster: true,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: '94873tgj9wn9aztkfttz76wcc9qbtzd9evyh3mxwyuaf2kpdjf2tjnv74wimxaddi31o0zwian453b2imccgu6oinxs1t3ekt3bmft9j961nejtguyb20uys9t312oaozrdzgadww1pxsqdxy7whfho6qkwok14yfck9vof3nbrnd7rd0j00gzichfd2cikum9g5msw3rwobzmj5ibgxkgdifxuhic75cm6pwa431zznxod6xxqg08xsixmdcj7',
                secret: '08x5geimxf36tx3u0pp9wfovls3o05991r9znz4rjttyo65hcc805z4wxwbq9jio1z4fqklrlpvskyaib5uhc83eo3f',
                authUrl: 'lupjzvi0cx4trqqx2zc0q7ir4r79ha1i80hxmez4dkuhk58um7skunf40oreuc7lgaz40v8lxrwrcp0ttk72m2duxamuewl86p30r3uke4psnrhcdfu4um1bte0lza331zdr7u4mb1s00x9dpp72m4teprf0ah9b80rq67qap23kyv6s1ddvpwisa33zno8zz33u4ayzls9fgrtj01bazgb4371whsct79c89gaaicbsgf3o5wawggj2jr06wkogfyjeoui4cnknhx2edgf89ciifgyrwc2t9n0zkspwhdj58obtaqbcud2b69c7iv7bdyd67lue4g9ku27r84z5lwpdb0r054xu9kkuiaw49etrgr8owqoim2ddbpaqafwnw75i2jljvu2p02p517thkmc5lmhq2a30qjbebjdb8qnwyn5g4xtv6ss1sqqiw9hbpl0lz4oysv5pfpxu9y3itra8ztuy7edmlaisx1ofabgihx39kf11tc2a22orxxgy0dccgd65x9ebnvdq6vwssp0c9bizf93ebyx5ltttefzya7o55pm9s3sh1mwfehvlxojthm88xgtiuxldlpju6ny9z8m6b1o4d4qs9xdyy99dgbt5kgfm3i1vnam39opsy1rlkbu97xwwh0w9tw7b6p6eiq3m2xtm5v730pz6qhavpb7x78d4rpi5x7sh5x4o4ne5e3q26qpqhj41csav1fsfqkxih49jafki26i9vni1bq6mmp7vczd87n3w5b1hxxcbtkll712w7fjwv725jxrkvhy5gkrvllcwqvqji7jyqj6iv3qc1o07sx46arr46ewr5u3fusqtamfov58a6164gw15xur6r1xqis5lqauz3j8br8drjvu3dtnyx49tfzfuk2isblfyu080za21xt24cyctqv9j55ha6r2aptxgyl1oobme7tt3r0c28i0in055awck2jm1ubj849cxyonats5eha3b370998lnd18j50zbgjlo21vejkluv4habypji3datkgwvu0kiupjadpb48dr9n0jtokcvd5ynfmvytilqmxc32ivui0r6s8w10tycyuqrtosythophxmd7d44x1rh9b1kvqfjarg6fj90wheguo6w9ci1o4ku6fowt9w4lcdxb7go2n3pk2hyvbhmxjlbgn8n0d4uzkpvlz3w2ug4cz90qt9opn78xy6ci7n8h0l6v8lif2py85yp7yb5drs7510g8ykjoo3iuis1vst0lqbqni116ujobc70wf0x1ctozecq2260xqb61kl2rtjox8z2pwyew4uogu83wyohny3mzklrl4ykc3boefhl7bu0kyjlev04wt9mjjdi76lny0y5k65ocxs6a5a4r1kvtjv21bivi8sbi2wiaiqxvrz2xj83vcwotnkcgwqoa8vh1utsaaxslaq0sgbw8w5b6pv67nu6hqfyta3grw4luvl6qsrr8m1en1db028xuxc0bi8n9tt9etko3crxvjr0c4pq3lts09btv0qniccvzsk3fj89o6j1rpgcaw3gec7goj6ohn0lqnbd5y4a3j7rhcdmilgdd14tvjtwdlv5nqbq97ifadaqie8vzeq4kgmzhj02qtockyk5x2aei0zapv1wtje7ebwrvpmj2bahqzwidwb6uucvvi9983f8ck2ylytbrre6u9mlbikgx033wu0i49o5p4x878u00axgj305z5epl1lc5yiteqk4zidf5y0oesq5momrowaqkpnoqanubh263d6oa1rl75qnnca8l9l6twlepuqlk23awew0b9epdbtylnm9bce3bxh5d7gbchymfeorjz1s4gi8kaoztuttaxb6q6253dv31o5ak4aid5z6uwtvfpw439kvi1bn92m1392o76hqgoi3fcf3yupy7rgni3hqtjvqj4uym2tq2yxn6r94rqplszkntq4l9k1jlh00rqibyp7ay839fw4tpdmp8guv01anbydbeo9b2kuv0sizdn1pvy8s7ih39modi5th0xr',
                redirect: '2jhvsqt4yeepzmskh47zfiyhlmn2osmh33mue4i2ihtciub3nelchiax9nn2429te9jlalkeh7e1y8hd0yyy4t2jlqvib6rjataxl1y9bnw7qt9q7ygt68ezfdna4e8t4jjdwak4b4nogx4afg9oifyax4rjusgwrac93hiouxxzaart1lqaibnnfy1n6mim5aexliydbo6dcdiid3rk11tk0bgqbqcfe80mxeb6sdoias7ncb3ujhhf5d9pus7edox40ueou2oy6t0kg0hay58v1yruvofaoni7hlwbm0m2kj9rv59egjf59nipq25ia2hzt23qiv4w1g8xjby5kqxd71pph50sr1t8fkbfan3j4f5dhezg6qzb44loijarm3xgfc9mg154qp1lfrsu0hcd7t9h0ebdkznnlkmfedtvk8u4v2zkhq3455zctt8u0kli7pfxxjklq967yzsp8ghfol0mlqvp5268w3di2gyoqyth57uhnr6n568fuwb3m93r6vbellltfr6rvtax4tjtqfflwrq2jj4uach5ulmxm1mwqx3f4ilksbjm3lne2lqr5kwx65i0i6uw0jrlud71g4tub6cjyol12xewho1vjgcsyqtv6dbl7ssqumi30m9jogmp91vb590r15uyyw5iwl26pyp6q9twbfxjn64va01lvuxr0qpsu3er4xbhsn0k09c12mjqpnc3w0urg932es1sxlldsfta2m909alw9c1392lhitbwn6zerktuck1hevb8wsnfzebvs6zyiz8mzn2bmqd0dj4867ivkx8dajm5f0f1tq0bz49gqk3c2njn1jy02gnvgvms5lul9v01vzic5n2iduk0bxcfiogb2wprdvwpkjuvlo7vva46xz23lcxtntzy7e23st2wa1g58n07j1ueivvt10n71ahfui8ormglzxh4mp8ohb0n5suuqs1dunjofez69x2k4zxinqqamqhk4qj8zkhbhl7u7oyeolntxhjzkh54uuu8nq78xrxvow1v3sy4fxogk0z8t405yf7fe3z1u484qu8u7lv6fikf7penv21k32bydkxa4hi65w97lplxu89ey5b2csngocsc5wxz603y9byuxbgageq0k7dwcbzahfw1afzziw03yynnm4bbfrywpkhxcg2t6xwulpgclot9lu3dfwyilrbwket2ujhdzjim8ouekb18d11c4fs2bymhy8g23jrfnkz1ucbz5t02oswtl0j9qcmyt5s6r3gnwv99i4y0unvu0442cl6ueg9brvsnwwhl5ksdviv3hwehqp5vfz63a0mjmtzg0yicxyytlbj607698zujtccwq18visse5b09rw5caf74ybcbnofmnv5mprz7p5jjcxch8mn6mhxx1disi5bg86lg2z9rhy4cbbcktxlt5caokqw1xoup2wnf60zbg6rxdvrxgbl6xi3uu7xjax3b7w0siwijhhcalincht8wq7x0g3z7pfr5wjhozv2mi8oxzo2hijkr9srnxgx86li40yi6tlczhvi8kyim0mn6f2tm2ebs6j2vsq088obgerc9tbytpj3s6pgmt935c6d1we93uwgtryyxv7cnp48295a6qy79v7jsvzlghc791lde5fw52rsqz92fizrm7m2kyp3akszgcvkycqrxr8q0ye23vtl5ww9ws0yt9b4nw1gfalrvazj0mouickb9a3nychhvo2ezypi9goiv67es54635g37cpah9k5lngf9pirgfzdxnmwqqehovca8r4sz151ze95lplxpfdhjwto2bbll9jm5zn257yv9dzo256tcjx3sbajrxvu5wyl3yup1jr24y0kzgb8hcikfdpqgo7ih2zv8bo9gqygi8l62fa8d9wercw6573srvm0ftpzeh5gki188x2w195dsldq9oaja18j2brzj9fi4e8vtm27gc74boi3rysdefrewajbk2ncqch09whrupe19ink23xbnhmo10zywboxf65ff2ue42yjg2te4',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5396364366,
                expiredRefreshToken: 1429944945,
                isRevoked: false,
                isMaster: false,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'f853o45mc58367uxgt0r5x4ofmzku3xknsz1yv6kr0xk84t0g880y0xc79b7z38rdzim3qrk2fn6noh2erxekv5kz9wxy7v1bsrn6n0x25xfk6ucrvv14oazh85eg8fslr2wkbjskfebef30zio8v97tqp59bxsvlsvazmgrblb5s1j2vtjldw7babrveyibgrvd05cphy7fcdxsddbez6q8of4lmh9tyel1bts2zdninozem28lm0u4s5kjdtt',
                secret: 'bnigiq5s4x28y4wu5gp4cavm3igo2fpf2xy6cm3s8kcq3b4mzgt5ww24z4kmw3kmqe4ozwhq1y58vxp9xli7xeoojo',
                authUrl: 'nfgxnxxtia9yu9kty1ba8pmddamp87fl7lcpkxso3l0b1ofadcclsidmxc3zsoawcbdto1xt4c4nqqb55sht3gfh6w32r4rzk80aeftmr3vktwflig2x86kmr1xwtkdq13djobgczickj9hbapa4h490rcyii9q5kqhngjqivcyeq8l7itj97n1oobv1gm0jo4oyx5sjw9x8hy8xqrqjzyul16sn5adx5cgjemj56w5cc7yl56cs6aqslkzuc5iqny9j45vvpqj0auzmkijnxy42fvkj1xl3aj8inl6r49yzkytviy0ge8t9nllbtnqbi0rb47txyakfjkdweifslifmzw7r938q59nko14oouuy5hynmtk3pqarx2qzd03a9e2cv18dxw9m0x905rytm4o3nuwsujp0ockbipswp9nnwq33ty6je3p4ap9z0o1cucpd6kmuskrzwglglmuaftt8hrjnfmbxk0tvhrs1r14ydirrz90ffig01tsq0v0xnd54ye615lmpl4p1y4e6glpryzn8m416u82pchh9jfbv7ffbaxe9cuy8dk6qjk0hllg2p15aipcwwocb9eej4ttg773jvueb5fjueo77d8szuxapoaievrwrdqndx6tzbat8j5xxgkhfwmlds9tw38ao7sqr21i119pb78rfxdzvdlzg5ffqj3m9ha4cvunhd21dwnxk0ccmed2iifb65wbrnsfc7y7jwjuuvddxl6v4fd8h0ideu5ck2ubzkub3mc8uaffq69fjjpgaghet9krnskvwec7817t1llg5sc6sx1ggaq92vc392olqu76dpb2qzrllfna1e1nfy2z8tdsglwjle2mozu6r8orl55t6m9n4okfcg444q6cfu53etnd55i2id8nha3ba42b4f0kr89sr1en9aizdv8disc3oq42txyasdnrbnp0sdakota93molqwrkgzbhvjtb415i122i5qlco3ar9i2xy8ztn6yv8l1q9rbd5qkudw72tye0mxvb3okgzd3obkghdgbvbkq69qavgo8i649dj9tzqmv2kpk3bcoi3duxsjtaqshqsisw6n1qkookbwxh1nfe49pchjhfs6zidn26hquilygyvlavvtqw2wx3xecet2sghxk61i5uyp40p6t9ic92tgrnqzn49pamx0343q8qsz03qxeewh27qqswcio8zkcnzgrhu9h9c8jifoksss40mzlq3ncolpbtf72klkndypa9oiwt8wcvzs5q8ukb6xv3ei99hpuhs6wjkqsxk0ulvtcefylznkyeevadg5er0qd3b0kwvz9r2g8wu6oywvruao9z2tiqwwf6c5cgtgbzkggyc52qozno2pj83r4q5l75ypcnz74ik06dvj5k8otcf8lv9j6gjamf3pcywatusz16yyw5ck2fpt60q85el261mxc1h085wn2lxtfo85ep8358piv9sgfgx0mqvqcggmcwex8gzrxwr73webdv1g2fgkrjty9cevq5xfy1sqnlvhco9sbe867kljrp04g3pv99sdn4kq1l23i1o37az6d2hqeib4m7e7xsk4al9upkshxk64wdgzrxzu40gi471jlxda7bla76zr9372wnamed062ip3a3amcznizi5st2a55phdfkk04gu0xvapyr69dlu6e0ebqqt3uk9rps217cvjtgci63h55ot8b2iau5kh2k2iau2gkrcf7rhjv5gtbixgkfgda5y48k7kekoyrwnily2n3dl11ztry5u3ch4oxch94e8yk0rwvpkbtu36tpkaqhi1r9vzw8xrix12e8g1uuufkbekpkpg02mrtftkh0bn9l5xzerl08tjiglgxfd3mbprmvvmpx44clg28243i846gd0vdbv1gwis4hnjjmlpzbpjsr1yi5a1p19731slogv4t7r6bc3amax0ebx7umjmu4uh7tev2jhbffwh2m3xku0m03s5q44wlrgkjt9wsvftafsn28lqnqyr1qasaf4go8z3lw6dj31g',
                redirect: 'h4v9vbr4n1kgxjknw7rpg33rouahm6cixuyet3sfr25avhge93qceu74s8vg5m47oes56iyi29rhgiwvfalr1avbx4lg7u8u6fgqi95zs82ai78ng5al1o2eq1ac5mrsnz99s53bdhwux4h58hxnd4047i3j0z0ecwqajaxw6kk1vhxrlcuftfwi2ebq80nrg9b1awo8ux10a7thx9o4awpbl3ehc3nxainntn8vt2cjhep6y5ffkpaomzk9hofnqba61t06j9vtjlquzncd7lra0vy6cp2o37vxqqdpfy14cp6ycjz5f7esck5jcpmyv3jsswpe8m2tpq4vsyuolxb83fxj4177j1mhm7emypofxjj0kepfjn6t9c3b8iyek82l9tytjj2kbzfy3eoulbaue9uq937zw81narq63viu5vze05thy19bv1glaabwymd2jdc7wh18pbyd4qiwtw64hmtvzglg377ok6vt6gnh6sdryoda21413dpxod9b6yilg81a3oalodagulv2gx38twwa42k9ckxmm791dzqoqeiaio8rps8ekrdlpr4530gy1kz8nhwdsi5cocbgmzgp2h1ur98m22ny7pmpe8cmfunbyz0a2qr6r07yfc1q9syuzkyk7wypua1vzt5ui25ul2ht54mzvvt9dyy5pjnaz85dlx03nhqxtu7fwc4p56aagdssmxe55rf06q6oug3ehdxhk5rdgu0mu55m7tiaieczd9h6t7whesbdgukh3xcxg4gy73ekhp4p6iotlcrvqk0vzrumwj5gvmu3uuprd3bnuoyvzo4lnwg1murc358i62jn0b0pdkjzq0xcj99ev8hzolm965lf8datr7d66bl1kek19313q2cvz7536qh4zfs8tgxif68k2hvdrxtmc4ras22eor1aqcdmarq782yaoe2xh2qctnclo8hvddiu7vzkv3foxay66mr69n8fsr21l2vckclr1nksq82h3gv2stq9kbrtl5thjbsmhqw8m7c72axjkq3ftlmn6d0h4tz33j8hn6bhfrtj5q4yzjhx54c4sm6bur0xa0al3551hrjuxlarmc9j4blliyuhiduh9pdkqiy4dja37qi8ri62qmxcpyh8t82oi2avh24z4bmx06wa2azwwcmmxe12jl27yx2zgjzt04mo456jzj3rh5te50ef0rpaxfw10xy1ei59rmhrvdd52x0pjug1t37tdhpvh1em1l1yrean0veyzjdhkl9f4nhsffc9he4t649dbthdcgfkqi30jg7qmn3l6mmiiaq8elkjpokr2wp0btx7rtoyzfdh2th94tr1vaxs8l9j5eh232x86w72qoac1q5suj1vd0ga9z8h68sqnpd8bscx0xlepgqpqyr4siupxf09qqyxuqa9fizz3a2bmkdofmb93tjtpwcdnwcce265fte40chnquxj15znj141xhwvr6aonu39mjq1c1ogqb1gpgplypcvcafo2nu1njkt4e5d5pyxit6rsluic9uecmljwp0cxjsr1vjdmlhqhsppemc7y7cwu692y2hzjx11n8bxdow0tdalv1985duzx83vqb4ejf7mjkjvpaltewlo9pp2ixt40nx4qkf0fttb7rr63kdyvn839b4tzimz1jykgb0u84r737hfrj19rvj7n6h5o15csefsd9tnqva4g7pvr6nj64bctjeljzx1ln7i0d4ekpbk1ruh6qqq3oryngfhi1yr563yd81dpi94m6n24l9ua5uosw8b2l8x8a6ar6cwizizkw4e0aoq2op6kww4qan7w0ruhgawdc128js40djm94nzfuh373w4nwm4zi2j6moz5m16fxm1pqqd2u2u12hklgkuvbelidj0aazqkoezrvsy2uvwdi8wee5rguo58l9j54hue5ub2wd0jurjsngqa40eudkph6o4z29qeqqt8z8yly9hzg04clzenyzb8nrty53ajiqz3k920o8n8nb2heqc8dqhdcleudm2bh971snm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6973561477,
                expiredRefreshToken: 9153272452,
                isRevoked: true,
                isMaster: true,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: '8n5jjhbx4dp56dceeva61gy2936r3c0xn3nil0yeeszbffhlv9qb6dwh1kjar9nndf87xls2zqgx2y40i3bv1ewllhogcn7qs3nu96sg38fp5v183wp6scgz4s6x95z58s5qxnpw4uqv4pcaq6wyifw9yez41owzf0sdd18exlz5g5zx79pmm8on2yme8w0pb7jbo0b9lj2gt8rcpdnn27zuoab1ic4sxz4q1g6mthlrhpcdcmztmjkx30cgwz8',
                secret: 'o8sosxgr124v3zkh280bg3z48357bih0s77pleojc30tfsthrlkwzunwfv5oqjbm0g8bjlvgbn3zzfpr3zwa5m95l1',
                authUrl: 'xfgu3ldckk4pb56x7qav9kjlo1yoz8iynnkwk4osg6dg0tdylz9sp74dzir8t7w9p8rc8z4va14kl8jr99lqnvk3eva2guiq0gf8sgze9d2etif1t2x8s3t86z5qqb4vpwg8mf7pbqswk405ys8ndqwzg21d6r00o52xjuivps8uobjzk260glg595fnr1n93m4772buzfurv0d072oaud334wxppflmlao6cjkcriqj1mwojqhblaivotte1zbzgku2vmkvokma5y5s01ihlwf50i06kjq11eerm27v5dag5seuz1khwfcnoa7f1r0ta693c44e3q3mhblt9mab5rezw1198lf0wgz9vk7cx8oy8qcx0opwzakcob5e2xc52025249m3dboe64f3qt4dgem7wrpbysmhekrdth2s7ubcacdqidrj2cpgf38iv4axfvpu8c5rjq3n8e1gq3ch4ofluuztd14xzeac46wdu8yi2ziyeqasv3qngveceg3z8c86reyv8grlfyr1t5fdo7y09sf95ws1kylig29lgh36kk9lhjhefdjwghjdm66cn4cg7t17s8873so0sybh6ezuoemac2m4zcb4mag5xw3hssewlke7ft66zhkdocj2ev26x3jbnwrxczjsw0hgcczcfdvoo9otksviovgzdqnpi5bje6u0hqigbt1r0njqtvzeekcd7jlgch5upb9rs3b9mqyo2k7vo5j81bn96egaeb1yfp3nehihcccykpdw5373a9zfoqzrzmdtke7kg92v6q57dq1qr4dq5wszqnyfa9un99mgdyazimadapm8v4sr8puet6p6qwj5d180wkzac7ew4w073emt22yere0zsyk67urlbkakw3s7yzvj2wea8wkb573tk5jeoqhcunkc0lggymxsft58sxfnk76lxsuli6t6b6fynrsjonghvjty3asisj5u647fds9j0oaf1o4fs0bryiupx3nkctxm6n1cqnfnsmuajkds0zyddpf654e0clb1l895wdbpbpbtq72y9ogbqerhs10se8h151rj0llqa3bhgq3v0p9aav8cxxicpe47rjsgks8u5z76p0rl4euewo4vb5krc0ptpb33ab3o0n88smc4lpc36qh4sy68jhxx3dody6xmuffhioig8gkakzfwa64ycs0evaw5k1937cdcyuwvvedx3bmi6pkz2qdaxgzois262uvqwuswgccifv494tqfkv131z5aqcrut9ogq6bcrgfar3e2inry6gjnqpuny7ap385c7dsmgw4a1ueyzr1e90yelmegimog59ht7gxi2uc6bw1wlar77rtoctngs7i58h3yfcxujqifm6ng8ahle6sniidl8eaxl8p62d7b72no6tq942eywo94kdokfgq01lv6bllu59zb89oaq51mnfjpj8wbm6xhwm0d6cc6au4f322c5z4ohine2nhbisc4x7osdr1hgck38roe2qb1npbv8bh0uorispd1ipxyjcb9s78jq7oeaa1g03r81uu59z67syfehjkih9ikzq9t0x9a5dw51eq7tou088t5470x0n5r7yunmtd7j4wg1qmy927omvuvxey44r84d23nk74wrabjpozbx7dgmx7pohjvpxhijlzcm2q3tmfssgmh0k0jbbj3pyd655dh3fnq1zm998zohttv4xgq8x89zcr4s82citkclvbhw7clauo5a7o4j1dkm4jj6dgz4kb42zwcw122m6bmm1dxdylgmx5xs56btlaudg1wl7ired9nrhif0gb8otryu7rbf1hfofp89hwlbf5u4kochpvuhhenz4r4pwt68bpk5llhwyd2k6ho22z5y1qxy8ybw6sqe746kbzkjwyps2szqrxopq57eg2nn6x915374cpox2zq93ac68ojv0zrtdds2jlk5aw9xqlbykhcxpldhdkbo6wqep5l1c188noksqn49au0upr7m3kjo1u1qx03gxahbwvf4txx4olog95ff9oy8fz',
                redirect: 'ymubduy67pfar05tppwb011z0vwtdaralnagy82qtbjvmvj9e559sxn9zyfqlj9zdr34s3iratzclznpx914b9k3mgdo458hdjdohgsryjpn50b59q6bzesfnckudtab8pcsqczcu0otk1ochglxjfj5zzc9j5km7bpc0ywn908h5nc5s74fni2m7srkbxubthne9aw38fn10frp8brwagzl9na0ryf1fp2z2xgvqnczhv326xqu0ibahkfxvihyuwhkos9jb4ihyqufo6oe2uxmggmxeljlxsmimzlc566f24pw628vop0xx0lm5rdk3hsjhbwup21n6ofvuz6qczpb94jle4hbzmis7cw1n9fwtcl3l6kaby0llc63stbpzvjlafev8mrjt1d0wnhvwatphtb5kczwkthl8f2ddn6p5lf06kkm5j2irvn82snbmf58r1f9kq4rjea6r4jr8cab36hdpqouoduvkqplr0tm99636nie1c7l4xa95q1c8avvxzd2m53ijwr3ejg32cqkql0kh67b5rw9j86jhmaiais24slfskn7d227l96bfm5etd7dhmcakucz8z90t7y9nw171trwoxjvnf0qsh865y23hbvthz29poltl7d084pmd06xjgrbhe2m9sf452msxacjedb2w4sdqzbohffhbc26iuw3f6ihzzxs7s8vymlb33pu9ed8gk3zvz4vohv8x2ozrwmc44mrvkzspuk2yb3oty5xc64b9x28wid22rg6fbu85fm2ergzyo56v5v8id96haoev61lx7ja0b50y5ux6xc9e3tgodof1z2mymhdhlirvqtk7genx5mpykqk6pav2vlevliou5jjq9b8tnkyiyw6ddt3g9qzx385j761cq86qvi6rvxkgcx0t4jw58ce8hwdfwg8zekbcpsh4c38pugln8aysoyiwvbf1383rnfqygxdafeynaiu20kkoahziwn6g5161vkq4rffa5sogp5headcwgxj8w6br1ywap7745w07poa25zllpukdr8a1gszqll1hsbz45do3gynefej40crxk1hxxakpikurxzmegvnc4170612veg119q1hluwviqihq6sd1w8q98mgx9e86e8o9w8k8qw4u1smiufq62aul7yo41gsn0ioclgap0jzw7yxhgcqasnocz34177kibajhdvm020t2yu18nzy9v0cs9ihq6fp6hhdps53mq0kyx24v66ccqe6pes8wxjsickyixvzj1rvsr5x9jhq0u6ccpzxsom78jemwwmhqa3pv5kss7gj45642rp0z6avsa8jn5gej4tfocabn0ah17fmn7hcks1quu5e8mhqnu0afvkp3kcr492n6rmzkp1vyiwoox1e3r7q0nqqh6vdhzsvljtsnf72yg64cjgbhfd296i4iouzh1lsbt496mf2rkloyc2juo15rxdhet4w97haep8tz57xd7mbhery5fdebtelweylw4xexn1uiuyie4zsdcz6mwxjzhktecb4a3jgv5994zjsno7018lqx2j8toz5wvqfnwv8fnssy6pq6axqlezplmwhp34i78i7fu8tv2a4vmgtvov2kx8we9hihqhfq1sedg6ut0n380psym9ofd25o0dx8w564narnyau58kyy8nah1fw4tzkutff6ggfdozeyc1kesxyw5byqi1rihqo0nuv5qnyqou7trxd24kltlkwvwvo27abtzw8xbe7idxv4g62ge9paea82azqhswpeepp9zw08tr5lk2t8x45mw7kjahrcx1qx7hssmj7a3j2gb9o6is5f1qgririof05vsfsrmbifoux6hfp45law6r47p859s95hu5gmj7fus65pmsf11o587fr47c7686kioz7oqyy58b9wkg7k6mloaujo04w7h3b3eanw8w8j9cmner9gndfqg91regpk02azzl07z6o92y4lav6pa45z7xmtno5gc0n91zfqxzgib41v3cll1dytajyyxpah8ul0m36',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3167839721,
                expiredRefreshToken: 1223387506,
                isRevoked: false,
                isMaster: false,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: '9alktnf5e7fhlyngwakv2s9ecdcdpazbyu05bpt7vxmmm4yag8r0sm47fkol56fi0a05pnpa1odugbl603gkj90qnioaxsc18h7grn72t99s3y6jytv6fjyfxgok99gl2sbb4rdm8kc8ntarkcwzt50o55j1zxyvlt87v23gydi0tvico7917my55846d9zheiimc6th5shgoone7mx0p5q9uzsduxk7tf5cgbxfqdp42qniups546kqgsypmx1',
                secret: 'ms44k5odfymia6vwas9n8takj8t87z4uxbnw2vzzxcbs13pnqa8gy9t9a4juqbras9p3kz3t6aqi580jezu3bwgdd0',
                authUrl: 'osxvna4yofp6t4ggsyjd048n55i53rqex6l0qx0cl4g4kd6k37t8inhctmfi3p2177rgqods3cw0i5n8s3si0xvjln6kp4wcoyeroa1i5lxu86xhpsrrukngdccatg073sheefds0hwvts59p6dholvzcvoyxvb522ty8hqedwpz1ahgysvlwoszuopkor8nd4442d167xd82plwt1jll2qypql2qult3qlf27p31szznk2zpt793ha4sz871tez2sema3o3nb71nf9rqany2orb6jbzaunba4ymh12kdzs8odkctppptanx27azrgx1sy8quai5rxyt94f5a63e6ok9e2p5td2hhfdmmlxmw0exb7wa7gqe2hcy2l8jbwz8blvoyceblxpg1jmdjz8dcbc29vsi0xjhq2jyj7muwdww696n7rcjfee7g0xbg3c9i2gu454vqbd2ms5t7y78jv9378wny32ve7lt2e1xolrmulhkue51k16acyx3g7hfdvs1z0xumuz2x0wjyrlkh1clj4rp1ojy5grfke6j9ebkse4jm08tk64mrgxb2gk0wk54cevy7xgt1qhy8c9blez25vui0t2iwnjw65rddsmzzx0p744xz3rte03qmzjpkk8u5xtyvramfmabe1kic32fb32918rc9o8n3c43qt62d2fsdsbx9vro5y3ipo4e0vqducoh4gw983jji33wl5atoqemfenp7yg0s2e69ric1rn5toiirexwms34o1f56eqm3b0x17fg3i8daadqw8h20mxgjh2emibfw4u8fjawqskyus5qa4aaqdi0pmhv5kg93yg9lp6u61i8ghp9ffe9e97e3n90m4abkp4hhqr7h3mxfgkvk3vzm3dm7zfnvc5pp2w6zuy0uyute26z0e59zkfmhix58x8pb6p9ricccunlohiqboq0ok6gsi0mcxmxnadzqe84t3ebuqyanpngp101glm22ec4fegyly6q8hugnc1iyjeon9p53oagn6z51gccgj7tgvp8333hd997tyeijznssm8mzb2bt7oqvn604we20vv0vluw1e45xlpaal1hnypc62y07ek2ix6hjss1y0nglblzje0nf68oahndcahdelflan2r8033hqn5x89zjtudiw50w2ct2c19ic18ppw745gval34celu1u5a7dedhn3tb9qd7d12bvos1zyhvmm2bebs1zxe8t2i9xf83388z2tgntteauli03gizcv3i1h39m9z17ovpfz4q7n5dic7838s5qj0tvg1sc9soavl5j9i4118cfishu3uhifgatmoh158sl12sjlr01kmcmdnnkc8tu7b38tw44tw2dm4fm03es6qjifikvav0t1f65gqxo01rd5dt7dio88h24hch68t41kre26tubne02rokwmzyilqfi6l5fc4l2e9pmnp6i2hcb7gisr5lej3x45kxswpa59xwj01iw9our9f4zaf0bnufmvc4d29fe2kzlywdkbconb5tgh1nn6d4cywjge5ajhww78vd1cmg6fthd5l03tcurokn040qqw656wc5zxek9dauzzdw2fzykrv9umgzgsq0uyxvde0cnc9wcuh0vn3gu3r0trp3mxvfpqaj8bz7jqap64uhv1hnsisfrlw5fbzqroa1l4r3lgj6d0z47f3nkz58jtx9m8k4x8aomxcckmrarnw1eg2iqwasbygsjrbt8mm84e6sryr1hhib9q21iep4w5d5hrtdra9cy1wad5wjdjpxirzpgm5jgmc01b8p12hm5u7yqxehdct0vi1rbv0dzrha01xs2d5u89ea93u0ive92lrjbk189tla690r1b4w8taernc5kislzepqdb7fzpiy223678rp2a1j8icnamt2exubp5e2147dim20e7wprnh3b3i40nx4gzc8t2wz3e5mxvplyyhnx6ujvoq4a3q0r2wjr5utuqc29zj2txo8nafzo7ovnyqnn2jtdcud52zau5iu5ztt8luezyg',
                redirect: '9828x880fss673fa160bwb3zaiibc2lg5wm85pdlct4qru4b9j9c6cffx8tquiq5kr06zhl539uy6gt8m58q7laarr2o3d1al09n4whkwj52lca5ovidz1jlhwgsijeeieml2hjgpuyoc1lt1dbv604ilkbaqncvbbmlukorvlq34ng9kewkknwvuujwxgrasfspoez74ztpwxl0rjv775gdiobg622uaxg5xvq6zw0ea6mgjdl6wiz6ibq0qn509axxjzytk29i2txw0qc62wqcmob0fbrcft1ebl5i3oi3nixrvtbrstrp9sybh46uyk8e4bca6hcjm3v7g7x925j87xhfv9ie1vui626s0os3oudmccse7g8cgpth39ux6xzm3h4in134dmy8jockclsytxg3rsqa8vzbkvse3thzw42hwdmirsny5ix9zyx2zjbvs9lxgczj2vpy1tkh19ro71jx3dgvh0ccg2xoi6t640mevre3o70h3a6lg81s473anxrthc8x22j3s9ym13n0jvuu4clwuj3kd6qrndkpocdopi9ud3c01rsno1lxwm965u16ke0fvhpnwxdnusofvf1dlvfktsm8g6ry689lhs21nak1qml836ol14ck88qzwp2erxbtk1ni20mtmvnuvfv8mzcros4fpevzv13f3been7zrbrzi3hdnvcszv75syic6u9op9htd2hzkm0t4c628j1q3seuqm989pfnof55x9b6f15fme6m9vwcskyufrkys9blvcgsfuivl21ea5rlivi89ziy5o1pmgcb4srcmzy7p7nba4lv2f5aingg4wx6pz5dtvsjiyfchfffxv6ewpiffdstwfhpvi2tfnj0ge3nmmx3v8exwvpk651rxbi7sw2b1eawyo3llgtzpp0fnx9yeznx4c42mmaax1gn0v2fii5mwkaae1waoeaz1r9ug0hmitdox1m45naeigjr0e2kwt08h3yctsotgdffvyp5djzj2oo4mrmei844vn3rqvo234l96uwusj2vmus5h9zfbuz1v8joafbixegn90yadl6qzghz17rgrq9xvydnh5lizk4k2ej651yq0r1ribtncp8qt8s412xcefij5n62odqjnczlstesmmvvcxhxfleyexxnyu507f3jsw5dosmzicjr9d67iec9gwfagmak7oooomy60lnxt7dk5zdlt6mepgf6ly8s0kq5irqm3dnj9wt6nikhq4wqj5pmkq2hnww067spe2ohv34iu9dazoytadx6aw28zhqxf3euog6t6i5txtnqjvzy7qko0ea4ti28nvhn5cq9hxt4n8d9p205apcswuwvlzw45fkyrm0l7g30ieg2suo1qnfvuqla8381lcc27z36md4fihamnu6m8n5wymysau4zefia7e41lirj7o6ik60lfj7q7inauq0stjzl69278uzco4l8dnk10b9ynyt7jp0mzjr41we1v4bpq17t6gzq0ntjhp2bf9id3k6imfh2rjs84qqlm54kqfwr8tpbxhz8agb0s5ashpondum3iblekmw5tni9zsdcdhzcvxc0ep718gc82do8e6ip4h8bdrhvoifejh9i9j17vu1qidd0apw4tca7hw34rv4lr0werb7pjap5mf1e7kgsizymtowf9kix7bevadsacbtpx5ot0yknnmlbxwnxxbl9xl5juk90ac8oxbnch732c645n1ioq5bzvbue1bcem8qbnxbvxpt46o7lrsn06sg98y51vu6alu2lwdj88vzd6f4k4d5av8paivo4recp1htouiksazd0kxd4wa2fe9off2tv46izs0o7lisdwm7sps5zer3bgswx3llvc2uungv72yowpd8mekcyiaxemlskc7w3c7knybbg3wrcqnm3slmp1q5vhbcioc5xdpyeh7v0gwfw83pvtxe5lv9e5qierizln5nfwpz6kf50eol6n6p41okmyw28bcjvny1hi2yqqo6tenin1bvnctaa6fgpg14js',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 72464279575,
                expiredRefreshToken: 7525532135,
                isRevoked: true,
                isMaster: true,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'y4vwvuj52215jlic4coth68ijeh9wo00kama42qpg8ryw42gl9f4pvzckl439z51xvy6scobk7doncc0vnvk08m0kjkk0e5c8m12rdp06lzhwynx6o7txl8s3v3bx3gih5ms9qiolpjft5wpnxfpzpir124d81nf9955dhkv4cg81bd2wo0fak8n2lwc004n61wewjy8qaud79bj5gyos5y50prza5rxz4dnprf06y9hcc93dogsvyj3s0ge5kj',
                secret: 'g5dbrby09wm7k06guuvuddts895fpi2v0l1bxbbcc90u5ir5flccqjmwzxw3gk6t859le7yvyvd5blw2j1awwj686e',
                authUrl: '4no5saj4w56ttwome4diwpru1on3palnod9zxct9joqvvnr6mcdiwd65d27l9jji5f13femet9zu0j7deganusf1z6ff53p94suo9s6702jd3pvl4e9x511f9m83p8eriw76b5uup6w1jikdzgavbgjiqxq0hyaudltk8es7lzxm6dqy0jlpfnfcquuht5x2onkrp4gnwagx1j2k9zunlpcr678kfy8c31wu1pc6xwsj7a1b114rxq7phgsw4sqra39jbsn1m0y5mphl5l3jxe0ubt4utb04oqw5ksioainddm28zucylzjz319gnsp77yq2wqa0htonuqdp4383tau017qj55bxzxv6c6ztr615e95v4oqbsouz43ntejh95k9d76drvvxnai23hcb6jr4d01sci6ml8ivfdl6y6rvraxf9rt8nhg6f8dctofp0gxl2puvh6sqnk2zvs2qq841js7n5dygai0rrt1zezcacr3nyr85sj76j6srtk5uikc2v28cdsl0m02fh8ki4hygiebto81gumlpi7bzgyil7fifbc8hakhkljhcuc9n6sb4nn7hith3xmz8327owvu74yfhj8f7vdzf6jkd7mg6ej378vv3x2d9ynq9b25qqb86hyzdqkjuy45l81v3p0jfvxr6h8nnl8zd07qor5vfzdf634r6yu2e8wakf3vc44s5k35nturkzshxqyr03sojg8g0unyf8aw3iu5yo5eiu1ffxexnwjfkxki0hauh6pztshwlfwedj44y7m3w9qrg5zz1bh9sn32zhnsghu7bxjipdx1xxykp2de8ctywbibp4whw9dng3fjf6wrnwme3yl5omxtqw0do5kusiph81ivsgg1dz7p7w3enkwj5vgpq51r80gxygihqdt27tqohkw7pd78bsbvxepl3aydk6vd1k90t05z8vy7tqxittj1lkba2jdj36xmm5v1xyc5ynl41k3uysokq800b12aq5rnl9aamsubwvt9axwpu7sm2kgq7heav5dnnv2r9yipiat039a62t4f8czhp9krqdfmh819ee30qzbo2k5n019ka77g8lrya4io8q1nip9u58tr6gs2ocxqigt8cn2uz6camxg1379rkw38z1wlp5b92ekcuxx3qicq1tbqcxpr5pa9c82gsqu1y86c06nz8vjhx9ezmnmx73f3si1hcyl774be4fun77dyx1js20huw8v5899l3suct003cjoh0u0k1dpzc5226t1zkegm1n3y7tvtv7c0vgpedxrenn0zuzr041udrmpstvi0fa73p00xw628s8dru2bmlah4xe231jwwtuwsh4w1edtyvooqu23emnftb8x6w8kg8al8pbx8hlfin0jucktbet9e7webr9wckmfdmsj4zfjc7acy371znuhpp0358ugqsu3yjw7lu1t8e32iw4k0yuff3mrc8o81ivzg7m38vfr0xx9prz5ijqtdj9nun6a5a0yvn3b215u4jduyoiwnl0r7z2b28z5daqdpqsulmg8pbif8rmb6b7irmo629r3zmkj9j2aa3cc0c279ww5t91q0a0wzn0hzgjozpmvbiqdy7vdvwaqo9ezucyipzag9oici2ogqi9mycxu5qjvw3f5jd3dl0ij0f6zdzu6fyggkdctz0pekqwhaq8oao1deidwus8nnglwro85ebnssqgqhgr3ovvkyjevqkhbkq6fnmq4c6x0j9y1xcwzg36bwnhyk1gokvyb6funpes9fu36cta1rxvwarebaxu5lrheqmb8whlg2q075pmod9b1bbkekz44o8snws90c5ompf1hxxp7oymz177r4t7bqgkdxgb0abu3bn2zqph4orxkyrqqgyhfil0dz6nnulnfjyuzu3og5mn98o40wfkg11b4w97lg5zr0gcfkvjmb9r19qnir7gfal633pzdhn23duhed5xuavvn6gtm1d4p6uar7pdyekozixhq73drrvzk2g772j16guzty9lvztwmf3dp5ya',
                redirect: 'wjxziicskzaxhkkw5efk2s18of4tcug638jg94azsn4myjayfuf45p9fe351ok9pt9wrspdppilestd17pvez4tlpx9vu5vnxudcb19q0ie508guwqkz7bq6wpi8pf6wv7zl3w8hv1q29thvmyq1kgutcn2wwrv2hwv0hzna0h0wnbyqokkriv5lgx70v4lwp5y1c7vzu5zfdt25z421zjq04z0725ddox0tsjld3yovaxiazliknqcdycdf8wi2qlus3xw0ojdkdtagokbz25h8wl5moxm31lnupcx150xpdjlbqoiq8fnx654gr6j83gav01p4fyyh34tg93k9ko2y1stfazog2tei1a6vq58zh2wwl0tygor9kkc7gx41yyzfzdit9folvpmew1qb9kazb5hhnyzbjgxgmfy28rsqwzfjibed10myjlkesvie9qhtzwetfq7l7ltmgl1cgnsbu3o4d918nvc1hw32j51hmkr0w9wxpfkc0a2a1gb4c3t3qzbfj1qzy84g4fzlz0918alamplksfb0s3o36793g7gf636m3nrmefu0gkcb4606ypoa1a79tqrv54ysexsqgagl0erdbjo3l9v1gv5cz2ab91nwrz1j3o9fm5udw9dr1g36p7syklb3dsxz61gtg7fvff9r93uuamst4ykkzxoe2uj9zvjt0ug0wrye8au74tob9s92lnuktdcugroi7u0d7hzp22alws9lq9g5rs1wsen91ig5bfotww0h68r3bnpdm046szlw474d51cigfhxvpmq941lokdkbsxvox4gafx4cw2p9w9xnnrxi8d8p66wbcmq4awln89qudikpz4he68a47ppmhq08jjllgjinla6doq74dwh8e0id8dtxx8si7bzm5qpo67504l8nfbk83pevx339bhwl17iingeybzinerekrtmre1p6be4gurf6jrz339npe1gc002hny31u9zzhuotzgogetjg1gnpb7c4hz9ddmwjl6vivu1ffo4njv7szdyjyqlvpkqly4pz3hmdvdqqmkbvxm90kkg20u2updd3p1dnnyg1wwhm85a6d14lxurcjvmykwoi50psjh95cpumvv12albi4gskjvbgw0rj12m16egh7kx27w90jq8a34ih1q9t2q6a3l0tboqir0zc6r3awe3h8jtc4ri597u8l58da0kyo7aimwy0mepimukzrh884kp8q9amvz9sh9ztv5aac20i0a4zxs7bs5ubdtfr6we0yj0bkrfwxp97l1mwkgjcj61z4ysch86k75r84wzkntk3wp2qpodfzmlhhm3qb17phu22a58zjx9d80qmgqsb0izbhgedwpl99qk7p0vihb88fl9paqiwh9458hruob3j9qlpepfkmz60nia1e6ex37g344n12orkh6gslg08iijcwr6ankwr1sy0u58pex2i3wnpnp9x0ud2ft76xkii7edf4h4sasllhxwsjxww6qxa3hjn2k6lokom7bt8vl4z1an5i0r0ez7bar10l5xihc5njqus2hs4gi476gdl7ml6o95j8t51jh12voyst5oqskz742kv7vzs8rq2s88ngse2v388ru7yomdvov1k3eap1opswk9dsdspakh4gr4a7byqo77sjqbatw0yldvgxgm6by8edqrmbsu858jhtb40intiy9ljhev70alfjqobldagi2l8u49kb91cd22pstc0dwjmgccjfjdl65nyq0bqsgh81fgqc72nyzkfoo2nwrjfntw5siql5pys035vz1xh4yn9o9uyrk8ejm2ko5co1bi91v4srq2u1mwpi7h3cxmp4f7j3uc52pe92kq3ci7igci4p2c35ax25dji5ab0vtqclk5zjwwuo3yo25dipwh68pl9vhgfqsvwnlcietuh2uyh00v989cnr0cynlzx6gs6usmrt41dm2odbjyz6w8xn75wirdbq0sl3afjflwpt97qwacas3ol9b5xidnauajl7vmr426ihvncurg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4789768230,
                expiredRefreshToken: 23658412859,
                isRevoked: false,
                isMaster: false,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'PASSWORD_GRANT',
                name: 'mx0zwg9z4tu2hcz3zeayuy62voi220c49evfcoozy06nwo6e49tv32yr2513pobleg0xom4x99sj5dksjasbs8jg3vz7cskyrustnq7kbjtt5hpgpdsq24ez6fgftti1gh0ha8hwydwjvol0q8r1c3leentt4ws46uqk3mv1n313nnkasz2ccsoar47oiyfru89z9a65ukiijwk7vqpxllvnxql1r4m5udixncytj1bbvuq1tzh0z358qh9fs0f',
                secret: 'm0hhcvbxju1ejgy70yj9h3dooa6ef5xf66qd4c37ion91rxscpbvq6tajrohvv585tk1wdvunh1i8h4xwu7nl2gxml',
                authUrl: 'p9xi2sq3iuyusyzvh2dueqnp4qst6iso1ben8srcpn2vxrliujqtnal0iwvqjzzatmxsr4f9f1acx8rm1a81y9f0m4zgyk2fm6uxqf10l0ji0cdmk4chyfzfl94nj402kptcchxp9gv8kytk3ne2u4eqqrtfkvwi9tn9hyeo563zuk7cqg9kzjrqx83yxdk58e2x3kwwv8c8heuooo5mukxabd7vkdiqdjr9jfwwsd6pnxajk493d0g2w1wq9mbjx18lbvf0kjirs1754fm8cq2yko4wrcz50uejicqyta1snlyar93aq78908jbz12kjzy99llq3v35y3f5tfd46uichhswdy7baaqxqcshxif94qrxea4vdy87py973e1mwmdmkedrgoevh6h15ltqsvazxn36nsbe8er40ghy2n1oshbnpjqshcjj89f8kzt5h5gh4hvhg4bbm5dy6scejlavdtd1ww6g31dqnz1i6qjvyomak1k5f3kalqv3byijq0ktiyj3chsf3aannqwss7y4usfm2hmubgtkvpz5e8bjmqx9gisvhjp5zzfbsozecbid4uf21j6c3eicuihxqz9m7xel65ul1nhtid729z0ptn8ofjcmwomr5sklhilpdm65wlaxp76lx3smkedtxccw2p0pqspoq52en02dwwp5ne9mp8rvhun31ln23iju9o688idzeyy83cpp4x4to0ll2smo3ip5l5rs7tismzv9q31l7kbywa47zh0fntkp9qvfi0dz11ear51qtc0sk69yzcr6r9k6v5xkmbt237wbj7bdqjmdg6sotcwht7bzgowmzke4571mxqr1ejrqf62ydj8s0r0e1vohrp90w8wczuvkeslsb5g7cr3ogqoonr2cgleqyzznxmhdggra5mvk6c3cod1d07fx94790s98hxjxheg8mp10y0lvgz429cpe5wl8dr137u6da32yxj2kmmyhexw0fluvczgeznzuld56x1h39e9am97kjsh1z6kse0w6ck4buvxmf2czjbv39a901uo4a6yttxo57bj8rv2kqysjxxjotijm10l6w5qe9v15jioadzuoojo83pu4umn1whozlxnu9pc64w9gx4007zugipqbu6wlcnqizoeusckx4r32jlvqdwk3tzk5eol4lvnz7y1wzn82seh7dogiv4cn0mxodwk7gns5fwljsbikyhzv1h9dbviqhysmx20lz9m0r8dp8n7sgfc0b6fy6nz3tmzjvqngk1lw9v9t7wz67e57zpr42xaoc4n0f6ueuffungth79ia0a3q31xk98midudekoz04327t2p0xmkui4xuak0zsg9e0e4jy8a5gxryn1njpz3hfifzodm403151wjtoj8finyg9zfko6l1gcyfipstjn05fwxevpb1klwt85c1w76jizq7aivls1umka06di6f1yyoflf269s8ztgaa5tsx7pdxby0wd0jy9teoru21brgr6drj6vwuq7az7tfi97si2isyw2n6lws95kgdij5p6w8mkyxos9zm9l2fwlkeu5prjazt1r5l04fpa8jda2t2su6s9ray7lk5tagx6opyv3sd7ezyv3c84jmn3iu3olmu5yrbypntgolx32q45z8iwi4bfzyp8v136h3bo1q49tuo3hi6749rd1buzlw2794tj5alvk5mcszse894rd3mu2i5qcaa305hmc14vqn565dkr88k1ueay601hvk6bbvu3yoouqzr928i2a9ce7w8vktoa50qhtrg4yiut5ltmnkai6wnwu57z3ix1mdoqr18uism32ifprfd003mwnhob29gkd2gihkqqcma1y926jgi98y9p6newdfhijglab8crhqvh524fp5z2n157pobdnxwwcumzghjdyz1fp9n2phzri6s1e2puckfvw0aj79q2ghv4cji4ec9oz0sqylmxvcsua500iv3q7al2uyy2tcd2m2qthybemwkwatzu379257g9q6vne9dwc5pz04asnh',
                redirect: 'p9htddmvdz38r6339ok0d1mh5e6fw2d1o2hw04euh1lf0v3f80u1ke7nslsozvvzbmjfzr5jwqsb5odj4yf8dpkejucejkdbpnj4ntobkq34g3rnat4vcbgllpm1e20l5v9n6ka294uf7qtibnh0gnjp04kq2w6nbmst75sqhjmc8gx8l9ti7j4enuhrolaeo9e91y0lvrjnok3y9z1f5i16czxkjr129cg6jujlliq2uzbktg0uet5c2e0u3eghgr1j5nsm6vt9h3i4s72d0tspdc3xfyg2xiy679nulyv0gn8mahvh215h9yhrmdk6e7r6q9vcqmuggjmh9lsn7ir35sh6j4ir8q8egapnyhx7ke8vqweovmb1yxrvghuz2qyfht6mt3qu68cw1c39864smvx0zzg0l3gvjwcj568vwez8mt813puxfbo9854ocly2119xzjrwvzk54akzij9zsrs5n3sd3f32vtxqc0n4jvuh7q6p45z46cpr2d613unaba036esdkzbzkp1ypwu1feu0di51vjdpvck9j8ofqna4i41up2o44vbni0frnxj9l2f21xwyrc1m3kaso74x2iv8mryj6umnf2co4ixlhfjlusvcjdl71z97eskzk9v5pes5mszwymexbn5o866km4b4xhvnq7i2mf1mb4yxzvvfxtx1ypgr40clip2bif6wz9gqhf4kskohn71geptjgdrrg5f0yl0ye14g2765waan8y1aczdj982qdi6codkxizysopocj3y3nhwn9fc188chgpt886wrwmbhvaesyaw5fe3jfyeaza6lkm3m97xcsvs2l6x3kdszvz3endte5owg06k20f4r47ve61gcx3y9ymsvx791fivuxk9pnjd07zni7yr01v1l6o0i5k1c3bnewc3bntpzuzcpxzhdhq93kk8rjdhl7h17oegrj7fvwoksldzjefp8jsi8hm6tjntnmbgvl2ndltrl3hvwqyn6gtq1rkg9b8etimg7iho5yqc34tluu4h2pi6kmtwgmq8u9etv6vt25u93svxd1nrbrdn5t25i4gk6yqxm2oljj43wj15hkfh2nd7egyehmezk24kt7o2gooy2h6wtnrx5xmemmtxjf7pqrqvifuqfch49ql8t5yjgxopuee6hvw18sw9fsl7f8nlltdan79iklqiideer1o9xnkmb21znkt5h7z499s1rgxpvgntmipqqt868x3saiq23dzpgnxzar5pwzct10z8e7ww8if0vui6gc5vby5ljw3axc33n6c6ue2pquy6h6phe5pq04re3ccotw48u7t1ddhng2pa2mvz4byn73ihm2la9poua457rbavae8asjib5m6ip0akwlw00gfpgvr010h9rged5b9iwk3f2emqgqdgr9jjolcltey306xaxijcdb6fbj40m5x35n31mzwert5e931ru5qemu010gncthu6h4kwrg1t7084tkvjxgr9dp2jnd51u731f53davvkgt52pop9bv1df7s8ipaq427gpdank3fcmr0h1azh5qdvbqdilifipkhlwdiyk0fcszekyof1j9z58prd7a7ryzihx9z1ebca9bgue2db7zpcottza4f99vsce80o67bwzf9kmslmb4gwfs2cb8po1kyxhlgtkjrwfh6xeoyzc5z7p3umj03hhbn19h7amx2x0ks45wvnegstyvntd8cn7mg3nors74nhkm0ohcvbtlw1eziiq1r2v7cm82amydxl00ffkoeb6x7pxbnewn2xq7n39psqvasl286obptq52q0u6rt01anshbjrnma95vumdpr3kd3za61ocwip4upgeaixbtc3a93t7tqgkzpwhq7vkmtiwzanl61f1cryqx2z0x5ukyj1lbwknwyjubeeldv6ezzitc031t6pkjqn5r8v0dz64qwegb329qjr9n79w8deozsip6vohol5li6wnl7a9jqnb4ei9ci7b981c7lyy7k7vfktkwkp5qlmgpdlrr3n',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 1746673021,
                isRevoked: true,
                isMaster: false,
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
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'PASSWORD_GRANT',
                name: 'y9qduukh9omnesvczw48qx6q9z511ccw8susip48dcfvfhepj1tv7mg0r5y0s2xrztwajy36s34zy0in0zj5l6uf6aj0zya7jt99mvb5w1uchb8939by3blchltl9rzl3wf3qjjb47xbxmjd4wkp0hnmnjrszb418adc8t6q92b9abr70iiyhx6bdw1uvd470osjepm1vgwachwpj7d91ac8e2ykrlxpyz6i6ex4i88o8g7119nev4msuzn5o87',
                secret: '6d9kq7tfx7gmrayqrywa99ay4q70gtxqjb8934i0nrpi16rs4ivfyuzpxzurt3948mvd9psr3d8i21ugnj624e2yxe',
                authUrl: '46bg25z633etv6r6pi0a5pg45jp4gjpv7etpzub9fyk1ztfw2y6m5ppqjis3ucrrlfrxw0gitnqja2fzve3y83svrkwvqnkygj52aiqqrzk0m8lhq0uqz9bm97jvcapjg81iauwuib183ejjh8t75p9g19gh1sxkoat2jve1s75bvzgazep2puyl0z603v3x8ze7hgb24nkc1mfcn8djjiyo86absfeyubzfs747yboi8rb1puyn3i06bvojew1g92qpn4gteotmroa7j59zpfn1eoh043sne0mbyuijm8srlhkhmzdv7qa574dqre9cm3atfryqs6ekh2rd84qzg7sb9w26im6k646n9othki6t6puf477l1f097h8pvfsp3rsutjiy3xz1gwh7voal3fsgw41krot54nez0pgd8vlkoqumi4ef4esjoopq0ztrsoorg341cfjkas2vt4dxoqxc9getydb8oo2vprwa1q1mcoqra1s2guvsuay1jp93sp2vfbirl54rxh8txeuddw332m23iiolmw6vnva6l3i7xphu0x8s5c0np7ve0jnpwvtokx13fdtp008zshg1j6kobczisz1tc4hnlkiaxyrps6w36jyuxaaietvlgka3l8hk3kt4mm9v1cidxvfzkb91hdqjfzvs0gdjwh1qg68wpz0now1cc9eywifhma3h2hzfvn7tg3xojuhs8vmfa15ioc3rtx03pqdawvkgj3tdy0125jt0s66zbewj3y7xc1rno4ahgpwjo6jb1x7bab5d657pbj00qx8tm8vt7p4j9h5lw1jflaiumd0batlg6m4e07dljx2vm1uudfd6b7vhy1gwq9v4v11ngokwzfd1lqw0t5cdjmauyex9i4aheshvj3t4r5ese3hbshv3hi0oqeh9x80mmi40q99hbg398qg6it5l08nx37s0o5l2otjt9i8pqhoz16fp57yipyq1avl7l7hhqj98cr1had5cnh962fez5f3l1vdcsbsgzslbaugtt6qg3gpm8b1agxbma6d2hgn18m46mkrtnmuo9lnrcclu0nitg3izqlrobqkx8pukyuj8y2piso1ixgv40kryyh5df2f411jzbylvr9kphgdo565r7jjcl2yfgrng63tf5nu3kj0qo8byemmjprcq2dsniuef63pg2h0j9y7tgqv01nouwyf2d7a04upjqiluv1idok1t3ie721sq1wgoj25z5vihuli3lh73vny48s9imviyz61umlfogd0p7qh3ome4abu8ci41cwh80fv2hsuc2ip281d95kx1edkycv9acm1nzgqfvkv6zpm69nw4hxsoaldhuvuts1iiyc4x3046dmxwiqzr4xsneklib6svxbchuq4a13dwzkc5b9rsohfht34givauczjcrp122lcfm3ckmza5bcqce1p2ho7zx83ngjq7526pl973qyabw3ysn7gg29pdnxb7l6suhxqt85mtur092gjf6zi5bn4hkkely9ewc739uocqxt0h396co14pf0oo6pv6jtsxyd6emmeob4wudcxd2uu7qmv4tm7hmba3yv27kg6pxaqpw3ainydfij0o7lfnt3mjgdgpapvw4fi5ez6z89geti63s6ry95wn7jt873jre0eyrzm904v2txus81rd17rwx4zsvhmpl5ypllc92h2ycjnikbnp1c1w5elcrxb7dtiew1lx9hrylsl406ekuifq7na8d0ub3k90kxaojtbwfxwckbovutsd38ynri8vjhugv8rcen2nrwl7ntqeukbqewvyv076tdtlzgtmt6e1mdw279bpflpqfarvgzidm3gesjp0qakpx98wxiz3utdzc110vgxrpksvdffcuiqxqxr0pbg83k606qi0i6qljbjifk5kqak1zn6uqxscrn7hmuxg43alrloleyyvheryqujgv6m1lhukhfugo3es67cu90hlw48x78j4esl1txyzuo95uziic75i24q4n4pk023tyectoun39lje',
                redirect: 'vfn4mn73jizpnvho3qfi50n556jgqa7zypj0va4r3wkfx9ve1tytjkcu4dpyk2bz97tsok2ucjdye3y3bfh81pgsu3xmd26x2sdl3bkkyzj3s91t79jg925pgh1ii4dvhx59rua05tpq6njtk4lcxud9mnob8jg63ko6q5b8dm2ba0wbofmfqjn7c7sw3sprllub9rdj5rbgl9ykhmw32p1xs1esbfb185taaaf8f1327x8b63heeffpkfe5c5tbn1sk9ai1hbniaronji52eo0efunv8w184rvh9hah93dfqft800z4ux4wctkqrnkk27opyehvyv580katae7vwt8iz2z8o7v8462l5jao8tq347s6n764jp8w8ogldd0il3tvu6fbsett4hfxfy4wslqtvicuv063dx569bpf0cdnssrz11kyiodczlqnr4ptcljbf40z2f9s7j97i2a78w9udn2rnzd0eq5xt2r6kcgh5tema5ly7twzemxk6emtjaeak2ht920ofm4qr32svp9pf12c7mt2037dv1wocokvyrz0af1obmvvh886fb5srvik30weasnuhsqkxk1p9zzhwuzxna9a5ykjlxsfgu8las4qj1okttt0z06nzbte4ezndfulsnoisnjoj4ske6arw2oofujgl41i06h0rxm6x1ihg2l0356v6ru3o364o4bwe8cashqgznpsuge2kaufp9chrnfvoodk2lntsac2od002u6ivt0mihgyf9c9g1k9i64r6j3ar5sjv7rareg1iy6bnxbxgwskcpmrpnjecpckgov0yjo0r7umdfwgiusz6357ua0sc6c3q1gps6gzth4i9t9sookhwuj2bdoh6b80jos0ew92gnls93izn1if8ug527unba7enk7rc9g4k5i8n0j2z2zd7wy2kof22rvtpjja8lqixyv67llqvpoc6xc6n0u95tvlc2o6omn6a3wggms00n8wgni34nwfhk1sj1qo8w2d33c46w2xbw2cc0u0vulrel52g4ddl8gqfz5l51d8jbtchf6h59zykj5vb5bbbv9nrzo9jgbvu24fiuc5odg30t4kugpccjhd0d7cr9frdhdbqp0d1sfz9ta3s052vgedu45xk7lae44bqijq3nicuf66t9nfkwsx6l04890c5daizkt133bl6lqm64p4mm216mtq7lwc10roo68wj2qbw6idupgoejegtxqp4u6jy5f99jf60a9ukgs17yjgfmyh4ug4i9vdh2t8o8islurxm7cfoommheahn2snl2apv5w7wpfo1hpve3a5rd51i2pyd4mk6fcbjof2pv0owqdz0we6h4zoryplaqmnoljrd2dtjccat2ij3ae62hgy0w11pnd5cd9k7gogorlcqio1b5yqfyacez3jhaigqhysa5zsl48wwh14j63hyjq1nudbsjfycogq6zvvviy6tbk0s9n64m5gj2z79r1uz03o50e2zjatp98njthmyrsgjyszwutyfu4g0ipvogvc3sialro9jol42ea55i16f2krs258ru6ceky9bu06xsu84u3rk8vx55cyyagdarp505hjriumzhz7lq7ybl54tor541jmxigi1otqc3q7zm8v4jh7cti5gswq2zkmzq93ycvmovi83a232f9afo2ah6dwn82n6vyjcy3uogd2vo7ha04a7dpz27jbksq0y58fwkpi18tbhr3jjyarzklzhaxls7kbht8yi5smram6hy265xaweyi3j4gv5w74rb8bzulgzb6z45or7cr44ec7weoiajr1olc6c2kn81wcs9rjeql0hf57hzh67skwxydszv140xvumsvp0aeo65mj0c0knz5vrpcn9z1lxr1n5ypxgomxii62b3n7u7owa79xw9s1arrj64og397wrka9zl8maahjouq2xjwo3psc7112ogfgodxbsynvf6geh47872z1ludi3c20wetrqzru1wbcdrlja5oempzx1laafcbmurt8w5uulaoa',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9833963299,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ok8qoxvqlep7dp0i9mhgpsybcul8jwd738vh2n7qm7g6yown6ex8yjdwa8v5buabho8pe2ux276vy5jmeoobawaw16nocfk9zuxw9le1rva9ytbyxh3f1swt7cqpder2kn0dncd56nesnplzt01g6fmksbhla6pr276bjdmq5i8hquyxofxs6fx9agoork4fnhxiiovseijn4gp2ljvmuwkazrgak8kfg1wh6mwp0lm9c48e6rneqqys94jqp28',
                secret: '6gg699ed0wzxomfvg1678kax0jdovzynnawhqo0moj2n5rsv1gl25ym8554y1lnfke1pykocv4c8nuqaymvwwafhmp',
                authUrl: 'p4fjc2xjaf0da05zlsftd0ij1zbnil332bp2oqffsca4m2r52vdpz21bhc9mt22k09c27f34hp5viyzp4c2yq0cu62ycy1r1zr82nmbjhhb6xi036j5f4f0bvx3glbr85mc49yk4uya8m04mefe9u93wfmdv4g5551m6pqx4ljvs1dijqehr5yphzpwsl3s7wr1wxy8gfurdkv4jzbkq5r1b1i2m2wk26dglsdjau9xe8eq7t7vyh0aute0e5m8ls8a9tdkyjmcj90c5y2ry7qf3eitcipnq0maqau0u0rynpj5k5w83g95qtn2dmmf9mwjhhq2vq2am97we9fogfccbz186ygq3j7cz9rfxuixqdtbrfeg4yy2n7hf7hk00nsys61srgbg0mxd203ncp3oenxda7o81we3rzzw98omlco25fn4usrg49d8dz9unhhexvmm9x6jb5wc2msr47hgn6c6wxmm9ny9zn5o8s97i7q2ntfzzxilhqo4mux5s51w2j6ykqcpm5z6n6lquwsj01ifeempb537qewbdbdesi5vxne6zr885ifi5sury7uypxari4rj0hvdocg8k1sgpbk3l6k3ddbkbnks615x3gzlky8yex18nbtetj2xd9mdoxyg8t6ijarw0lafg43rh6rie369enn8vtplig7get3ad55d1ihjsrn4853u069qmyi7dlpljgjfqupnxyqd9kdl7xjamfhgs9ehkap7pvvfnq5up8arc1g2ct7tejwpixptomg2qivodc9ac4j33btak14sfojnnotp8e1xvkhthz3cqpnoruo3zndnotsavak7a9ll3y12wi2ls6bar07tl6bub0awkldoj4srdcpnwhwrt06uryd11ra46mxrmi8qmvoxbpjdpja9h2wvjrelt28e1ke0f0h2uou80y9kscxsyyw6nh3kjkapsts2yduku5p2ztwkgafk720rl64m055rihg1ym6n33amv5qa6y07a4c6evjccjir24jatj3nuzde20d8ytwj3nbuopuo78yjjlz6eyvlxr357gdng28ef5jn5juvkstwfgrscdcfx5fnj707gko3l1wq2jintomakaus9pnqlmekajbycuuet97zohtvcypa6hnrsfgsif7nlgr5lhk31chjdaqrel4zq5r4bv15goh87vylsebchjsawsi0fy03r80b5ywpqanqtgwn6f0g1m17qyb80pigbd3wa44pv1s6duxkn4tj7zcej7e9t5smh5g1woi9yxh1oz9clexpkwxb7aj5yo4hop49htupr59ki9s9ut270lpjnq3qxarm2rstxmczrfepgtcjb2v2f20eyshakfppfx8s2fntpd0e6znwxxgs1t1lfj50rw7201c5avjsrhzurcc8i7fya6jtrsbifhebkfp9jd0z67amouxmuilu8z0t84w1d3qlwz4pmm5b343rmbibs3br4ons5rk0uwej9gp73eee6iqx7hqaz5qplfogxfqavacu57ycvj39qh8clgcwvcvgwdaqvmzvkh1rlpxozq46obqt5awnyjk0k0zfapk1nn5799ks7r1zr525mp2askf4vrc3qfhz4tx8tgh945j2n41l8pxblr7p0jdi2pgko52jwztv7wr2ycxfp7uzuf0rvg5bkvdtmx3vsk3193y2i5yrhx8njbuwoi93wx08p49aup25st7jpg3r17rd6d0tbh14sw038fduignby9aynv8r5bxk4vdqdyowfmmbvmiyn9shxowy6d11ybdxmfidfqkd3n4yoq2b8xuhdyorx4g1pm9tl5fxhhdcqenvte0wnxqn0rjjud6wiaexspklf3h4wfh0bp6i8i9c0ldgkg9lj7b1vmsgc4soi1bjd2r7gcyggp9rgcgpdm9f3dwdesmlaers6qhk7kl58s72y8wr9rgtcvzd78qa304nj6ausavobvf8n10axg417a1bzuffryxjw7l2ouylbw3bx99wb5ghf5xvda540kkersu2f',
                redirect: '8pc2xp1cetnwxn2603b2v71gnwa46v54xrp2nazglccgksy0ssu23o09hu148iavkmb4qqlhy0rnws084pw9kfdaruyzo1zj9erue9c5s5dvo2nq2odb0uw6ax8hj292fertsvzj1aisdu3329wuj14jp1bsqhnsa35fmhfcco6igfrbfalqku8gib8flzwyn6u10ha9l64hdv4mgpcql4bvtkl4s2vhk7jdbtp75gavno0esvpj7pmc21plp024hicmyh6qjmynytzqkr6cu63zubkvwwf55ho1dscrg4qjku5t8dj19ftcjn4exytal4206s258u1c92szzlp7ntun3fbaeucr8g5nhkdo2p7dpj3f2ctsbickr5ip1gctfbve2q1325an28ddg9b226e91fu192ry5yxz61wvecd5d3k7b5tgxkxrl6fmoh34dus9166tfofb9vgurfujni5hx2we6h3rk7ndljlig7ar4p616pehknkj81ocmbnpnehr28z8ak1opcwiux5gd4z8w6zuqxwyvsqqsegvldhl3pxo62z8ueqme11uviy61qp8kfrvc4vqyd8yq01tx3ej4oc1bl7zl8uayf99rs6jw2raqjzjg9m67x04fx35mjhcy25knnptt60n292vcu8461jz25xo0zvdbzc6k9ggdvqmvsmcbn1ml2akwcn8i1w6r7285bi1kcegtf38lgmchzoazl0a5m0u5zp2ssfu304g8snvbg98a2iucvyqxwmf0z9nkezu4lt136qsqrfrf7f7meihv89quckf0kmn6jzi7htitlnxxwp2cvxo1gacqpr09thyci1lyy43v5oft130sug2iujomjh9uwe38tox0v0hdqfxu6s6xlvris3pdxoxmxv377j1k3jsh8bp625j2muyho9re0uifsk3t8kptwky83k0912rky1vcb6vym5zyrrynqxnmmxvrewfblmyt63tthrw01zgjq14cb43m7ysc0lbakts5m55i5pbh8qyz0pc2jlp989z97o0xxu2ic6sl5hari6wnzcta3qhkyct9a7r8aa8oz1e4muzjlllj5pva50g55zqkk19qrjtd0yhasvh6tuqqa0fv72jsn4b6vzqygjlksom0dsinrnmlm68d25nhnsmm9wzvmtdwsicgihhi28fksekry8krfjaxk756zj2us2h3zy7za61xu2fi3y76tws6dm3q0avdozkqd7szt6g4ps1l5atv31704ybb6cuy647l7dqjudao43hutcw6g3cfy4brd2s96phpvahmfx1co5kpz6pqp1hdvk822ss5mnksxx61plrwqd16udhj6fgg2yh6bvdo3lqhf4cvt7rl3jlwwzfl136ch1fibnf14vh7ln3379v74gvnuqplyip9d0jh9yebqimfei6wvnt00h7d8fo32egdprrv7yo38mij1jxt1iv3c2atd85rh6836q9z4ovt3nujxrizzxgkiy82gr4vsb407imludg8srqwnx8pp3en41uwka77io26y1rs1vwiodmk52xnzdgml479llgn0hq52mceirh4vnktp0q99th6wi3k7tm7psa0cxi98l4jas629awxgvkpsh4dyd4smmki4kpfxxc8akkzj83nmh0fgiyozv67fndlee9da5m8fvh98f4u5cj01wwyw8qfp5tzzbib3fe64ozu5ojp46wamsh7q44l0ajf5r4jkamvn2122w7jlupnn98a6wrhsjfocj592m4gjvh3qyutrcnjulg8yc49z5mptroljl80hrfcfbssh6hnctf0j3irtz0gzd8316c8uawt2y1dna3jtzp5dclcyw9i1iceehf8ad02wj4vrqrbyh3g29rrev6egoh67u9gt7hywlwbjz4wrxbvzl3giz6d0bvcd2ojemn519e25z1pf2r0bjf856s3p4c1iqgr0u3mkra62bymes6dozifya1kxy9npiipwozxbbllv1w6xhclld263027ql44eynncdg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1167932436,
                expiredRefreshToken: 9818698052,
                isRevoked: 'true',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: '0i0e9vxk31wwfc2417cpw2x2kp6zrpge71bts01rgcn8ybz0uesknt1aptf9utp9gceat7503xsmxwff2xr3rmiztm3g0xty09eonrx2s75yubsj650furcklbw19qdrgies77hq2xr9onasrlnu7csojemau6jkbxul8mvic7kq97w2ywpc7rqw3nxd2arlb7esnoupa3y7qylw5asc3wcf7zxh9ycz6rbfipltn3cmcdqyqb29cqfol7ijdaf',
                secret: '9344hotae0frx2glvlsljgn4lcw0otmftgnlcwxswqxn65db4cj8gpfdc53ec1ywog66pphspx2atlsi576vhqh3oe',
                authUrl: 'll281k6tpfgyn2w4mrutr8i8cjqoq5gxdat8uiglzugkonzjidasben55mnuxzwqndbn1bakuashedbj8w4aqn437x00r1r9stnl6zegi9bfjsfid73s6b3b5abep71jltvwigmk7r7hb2nxsejgpxu9r9bnouklqh5fi2o5dsz633nobuqvpp4ekunby9nk21w64shmagse20hzbydats50vetts8viq9n0egg8ijr9w1p2vbz32w5ppz86siz9yyz9wa77ld1io3sjheu5imk9ysg3aj3atactboo7av15svigc3l9qdpgq1a5ijzycnglb5hpf4sjsxcnnd9qhai90uuzv4fge87zci0j9xs2g92bhhh1ls1qm1pp3gtjo085akmtak3vuutwrju6jn65scgipjre3493k27px038qtbrsfqcrc2kln2glrieq28keks6vrsn7f83w1f9wvxyz4leipq7xrdqootcxjrlknep5z7rlwegk3qd0sk71rj6gabcraemojfamij90lh7nv6l6mup4r524fb1d3hqq8a88zrucqu0gisk0bwrvh4s2oepsxrnqxkolwm0zuu9wg13ga7ueabaqqyetqjp7u6m89zvbdauooo665w4k1xrj1dw0oefjg707927e8x2sag7rotbgos6183gmt7kz1yur8w05l5w4w42n76rxf5fq5v5rgm7arwqkipimklklp4ai6xggdmj3mv9qhzhd3rp2bx723yab9svg11gh5f2xao4txkk6lkr2f5zspqmzltj1dwaeli7uekcioasb30ye6k22o1d8wypvl4msptvjxmurhnyyivfygq9g23lg2gzegvr1yrk0lizrs4e1mcklp8zipbwucb1uu5wr9ksokhp11prbdore8jr9c5a20adlut7tgk8xpcpnf6hqmgttrswtw3fqsxxjo1fbs9yy3as1uvb1zzgeaveig205bxnzbnt6fognhg43xje5q7tevy81ozlybd8brxxg1e9ynr8hb302gpkbgf8qxv3yplrr1ulhe467sdd2r4c5mms4x2j50pelzyk9wmdy8v2ysiw45rpvvi62j3irop2ii6l52yccf72zppvkz31m9g9epbd8nsntu6x7lqse0u8xjblvihwv79cfdpsibk1v3ckw40eyrzfm8gn6ysbc26rypp6zy0h2pdnfutet253vbjzn2lxni4vfjuagrwsgewlp7ttrdahh0zc8osexjmj7pl9jdxzvfwp35f7jtktctk9xa2nb8s2b4be18hb5wich6goykadyh462xdvcejrswoxpl6ciulq6cuuhiia0aak5soi7trn51ti49rseamunazpau42mj6j5wtarpde0x275t3yuod879754m7zi3wlaizjwqv9ij22hhljht76zvf7pp8gwn1dpgmdlcluhhr1q9gm987ktxmeycf70szbj4cgfr6o115lmp6qcf9t1pz2fq7yio8s8lgfsamk0xxi2rohje68ep22qezk6dv6xpvt9d85yqo66ly5zcspcbuwfo7xxi042pq8ho6jp69poa16lomwcyllbchpkw6g9axux93irqlza366pnvfbtd6ymt1d7ad0jcq541yuu6vhk6dgmdatqso4s3cye7cf6o7swc4r1zzzykgey1467c0d68zvpivbfnzmpe6xuy6iye75oz5cvgcfno1fkecptlbpfnn0w3fx9tol4k9y8yt4ylp576vbmb8yw875kb543ghap73t4tb17taq9mkk5xe1ufjdwbn6ywe4wl80pwnqzuv65s9ahmsfsigutw0d0j4xaf1qr2arkiehuqz1noqukhruczlqps186ct8j4o43iyqk5qab4uhwp2mkfg6plu8gl39sx9lcd0iorzvbn6wr895lgywe4ax0jkfc7j5oc3hfyxzmws1jltttprdm5ndefjl5fiqztg15jtp8ych30gyocqyb7ivioxuyn35a6nael4qf7i5jjrstlzz86pd7ekgvvu',
                redirect: 'oa980w9cboq91fj20vpikthj65kzz4shfj3kg7uwvgew7wn8i7t6l6pzl5h3q9wqja2q92h4buhwmeniocg81evtmba23pjsifotmw5pc4amuwxdhd85uxyvjeak0vu4zve76dgme28sjdk6gww4fxxyrt8bdk6tbgvxm74skkmak9hj8o6dy4ct6nmmghtxfkiy2xdwwjep8qxy7nwu4s3pqankhyqfq5yruamontmro5wuscx9swu01jsm66xt79ypzbuyyu7lg70ysjoseqb0qry12fkvm4yvlerjnxzbpl3aajtsijg1dzrjwp9m8ajqarl83wbpct9es3uypf4l0qmn5p6k6tyewlks1nrj6qd745o05i9dpj9601qdy6um6ymivhxs683qxfn5w6f7ff4qrsfhsakrbn6j6pvofx02sgwr2j6snjv9p1zewnwikzaf4pdm8ybecpf5yebx1v8rkwzzr371qv7j4nuiaizagbhdnd28k68r7e4zuwfk6nifffp36gyfn8jx6vdlblzxim5x21t53v37qc7hsz367ybil7zxylr2wq0s6l5ia25ng809kqphtg9rhxk5tj8xyd23ful236hejfe8jdfbtrd1voh21res61zje34k1usyt94yhbzdpfw50hmtueeylmnuaygdj6ku8gg6gqtkfcuc3fi5vx0w79fxngpkr9gduoedivvcpdlbe3n8u631amfq53juovr8p43h140ifubuu6x43yf1ff8wjl5frlptxqwtwpi008lw8q1yxftqte36nv9zqc7ylh463qsck1f7n3j4vonqsvukwedzptutu0k3xg8qq4c21bjob456csqs6a7b0zn2ofaplqs1qudpibkq42gajlv695tknnwn6wj2caip16t5x3v6ekl4sc9w6mrrp3ave0xucw9tmascov0m6814274i3uvm45o380adkelanwtd0k6ugqcrz4ggbsrxlms3rzjryv4uotq7a5imto8tfhvmcmn8u19iuo0z1hznkrxkmaaveuzznobjhectaguw0d2e0o9i5wu1wayfp52cu6i0vhbfa3ts2el7284bjtnow86it5x4yqs75sqe9hapke63h13r3g5t00phn61go3yedfdsrngy575b0h9fqeexdcq65gmlfpqk82j6hy6ht5rd38c5fjd3by1nyrrya2g4qlcc23y3f1n8l89izdj2u45mdcmx8zdwkevxo2ivwhdt0py3iltsuxk9hbf8b1areft05gswe81lzcoadfghsdxy1g91iz4ngxw0ihm5t172jj6v33kf5yl5dhmbih6j2nkhaeswxcl44enqrwlzwplpnvceonzk7jr83rilrtyo8v4ztaopinrflrzp9qvr5pjo6s2j8b5pc5051hrkz9z0zph1a8kxntcdei1lwqw7r9fpfl1c28sa283r9vaacr9j6aogbd31jq62yuhjh533afj1dfn5gb4lnfi7xufzve7p53243p66tl073jk4r60blfdenz6e3lvye6g1lb6r1bva89u6q6rm2xt4xyeu3hopiibvglao1u22jylk97glxzox4qa88sodpfx2r4615bmfu6o0338ipayasj3sd2bowgsqfaidvey5n5xqaqu8iu4wyctx9mb1ax3lv068txe8h7d0e423d7iywj6my1v29wp4d9ny0jaxrj1qru4vh8ufpdynknvxz0zz4dg8o85ouumo9symqwin4yy8kwgyl7l0objkps0o3ihvmmx05tjy51qm2q1hvds11ncwvxh1mvtiscmj4l6k2a6t2ocnu9p1isaxmezlo94tal6zof3pxcc5o6aibkvidc9gnt148ekhqu2pbbz8ipzxuyov3gqd2qucj0zt0gcx5bez4hwk686x2rl1zbjs953cfb6tkhjn805mauzbcu3684cx5lo0ri4431dlar19jymvzw0tmwbnwv5w7d0x3sas9l57292iqjrqva5orkbhk0kn2d2krax4v43rfg69',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8460563513,
                expiredRefreshToken: 1969842011,
                isRevoked: true,
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'XXXX',
                name: 'bjo1pq2a5t9h0g40l03gki66ebdrlsrph13pk3eq1ysbv6426i2qabz69tmfl5i65leh6qtutgkc63l834wqcd06s1kc32mr3e4qg01vbc0pn9qh6y94oi7cj7udqfsj0ux164zp9cysfp6lwfkp9sb0myiw20zmeumoq1i6atwty32cqe2ud8fv7ord2bnh8libt0ymajvezrf5pif57drgu1mv2gdbywy0v1ug3mrumrqa1pv7n9j1lyuarum',
                secret: 'mowdcvj4zqwhk1n1gvergvqvicf1mb4tyme0tgcacvgt1fglenyq9ypa1yf38pydvy5gzazyz33z1li6cjuiq2h1dl',
                authUrl: '4q18je6pb57sbldk2qepw31ahqt0c31ht0rng0bao1e4lyzyqihi1gy418uzvktuel5g85njqi2lta0d8z00nkjyta7i0wq3vsopw0cpt6io5fee1umau7e7gz6cctgmzle8umt2clmgmidwialhumsqm6pgshcm5v1y1t55ddzsjdzphbpgfdidpzp5geoow3s5fje1hoam58mizk5kd74nao8espync41glxkf9bvr88z7umhfmnfsttlnd9ht2r7xmemrpzsj41ie7xpdlz3casomzh1qtgqpxjow4sx9dm5k8qjz236ke6ps94k28m9vbsuynkx5iyj562tmpqeo0qgond0y1g2avycl1jonacgd1stitphnvrdt1wlzz0g4l70g243qqkfaonca9ycwuspu9lkfcl02bbj6ot3eg7xggz49o2iu39psv99l30smn2va1snsjo8evjx5c1t6gfw480uwzwvyri8xgyich4fogyif12p9ky25utgy83y980cg3efkuur11qfz7yslosl9qr5v88riug6wck6pv6u0zysrsn79npzce1fam94muveov44ud19qorcprv7b3sfjlra1goeentkdipu0pgjl35f3zm6w54yzavy0u63z61ov6n2s76g260erdbumqdq5x97edgwcdrecodfow7h79pdi1fcliyae6bn5ysip86mcyrw73kju3qbnvgp92tdeg00oa6plxyd3aclnxcclhmzv8uk2gq2a6hu8xhsy5aoay8d4e3gve9t9came6c3qnr1eekh631w5dx0kcjd0rvw8cm6pxy3amn8x0bxxd4vgv41a79fb91ox6e7dsz6vp7alteajm4rcr8xrtaicfl5ogvuzebq5cv3xdccrmca6rr5t5kfv25zji0oibaz9w7pe89kkvqvjt5rm8bpr1d9nrmd9p5nffszjicdzqgp2mrqcjb3lytcgomfw11d6x4hbbvohqkaquc9x8kvcjttowxvc7wyu5m01ghc0csb2zts75yn7xttj57n8l6xwbwvjbgeqls8w53wa5o3qg4w0ayx8tzet88bjsuj7sfmb1rpoth27og8jwnxgekw2nvm309bu742r8swjp6cu19jbf9k15driglscgqldb3fyycraqwzekg4m29udb2mwermdup05c5cyd5pq06jgr2s58i902afdpl5aymy9iz3dhab0umuyon1xvtsue3bvrvoh4xjrcrp1ijr7e88h5sr3l5irz9e6ls0mq2y0ryqlpzyg8e5oxpw1xcqxa45l96co3nrasvp39hsbmvr1biv57ubxva7udwvsstmk3x7vctyui8xlpksd5s35w738u4kxxypm0tjy6ze27owxbgkmzb2lof5n74h6sgt8dmz2ycmnzqkj8xujjeheb9mnq6cdt50zfmhxdduu5kqzufylgb4he1ih64p7eccxqexib3hcfr1ngq6m75bjmxr07zypz7xpxse6sze49qtzbgghwc0vvb2ph5dvv7wkdoak3gxfuk8kiwvd2wi9q9j6bfq7bowptmhjpn673ebo4gxxuvnyko631ht4v93mdwhkyiabkabcsymi63luhfxkeqrqtzvzt3mhbd1zp91f6upw3net1piym3evdfvgp035vny4x9t6he6gil2fodqbqqy8co84vyeuv4981ngufpici90n6lyuai71xey1rl1kzshzvh5pv3ietsbmcnvzfj2bqa9iemnsm7mafq3d7muftwcbsa8ej4q6omr613b6gn9j41mvorwsvy5xp5lr9fbq924dzb92p3jfthlitl4z6u7k0m7y8qopnhkwmue0aae48webxgct9mx92t6c282bihpc1k41cjwrkzuotjrtokm7jljc9za5mzff8v8jbas5g6ppl37kdcq9vjkhknssnzf9mst6dw0m2vvdcg1wxhkjg43tc7tgfharvyqaaordrxd827vpuuk9qz6lys7g5k3xe9x42tudaj97w0u05wsk7ubwpb7s',
                redirect: 'ebbd96x8leto4aavaed7xy9g2kazn9n0enthsyhiwbqa4tronsb4bwk59b1sqqo9dhw3f3pn4sq3s33wov959jf14eqcctdewf2d6bsctge33vhwrwmt55zobj1ffndqaf0db849st0n9at8njmjhxyq4t1k8in1anyl3dm6cq85dw70snmzqdy9244q5qf7aefo6vnauq4wlj3lukp2ttt3zbiuuw2dok5m5xduv63ao72214n5xuy0mptewyhu1det1q3hprfbk4ie1xopk4ug7vrfvxe6wyjl6ryw6xcqeu0oei7otm01y1wwz5u0yaabqwfcscbxq1ixfuyv7m7ld42dtvaa54n84l0399e53a4lyv0b1j7sharq2u54z7o1gkny1h2g93cp14xpfwmm68y277o3rnmgo0q9dq2x1q4ut2rzk2zvis1hg8j79mbz0htbg0k6gj3wum16dqzwjcebcq51i5uydur0l3wlrvuc7rcbdknuoiaovkj0oei43tiwr0j2srorant1zo8dzsur3q62wjfxiuyrpejk3a39wnmrlexqv0k69mwy8fqoupk4cmisal6eb7hr6a4ds6z2uez2c89n45flzm7k03gwue0onbjpw6zh2vxlpm7hhy6w9aqssbti4etnfvg1ao50n9rt98nk1lueia4785yo3i6lo75byne6k6gfv5tw4i8uly192xj22u5u60xl0l1mc4i9oqe6k5r7qdry1eqhgcbakt9h0ua43utwvbw6hfyrdrovjras34epbas2vncrdg1hx85jk3u5o10szevqssrp0h5whamw16lshm96uwimszkxknrbq4bgt25cbff4e5shn0ayws9lvppmjlyvnmoqrwkx7lkn6cwerzdz2vgy3zj6xmh6q74bpsur1k0wz9bptx34qwi7b3pdi1cpckpxnld4hp9p1ckrq3adqhamttq9cqbnqbhj48bhm19cl84gg2arr9txo4a1pg6z269aw560n3f7q6em5x5aalxui4rq8l5wzcj4oukgsrqp66hgzkk9euxgi814h85ggnkg4kccrnhmtsjdme8ebdueiim9vosf1p7wl300b6da0yj8yemlbsy24zaamzydbiza3gsae3oxcbqxk80u94owqitygrmgv1kq6txuwtzb746m6e1no16pixpu4m4r8jl88i70wc410uyakesqfqf9u2i1c3mylqhb5ahn8zlozwu04ah406xbnq8j0kvs1fs2yjol6rxog3u0svunweqtam8n6pw5yee7mz3zzejq74xfgxiha1jau4tj9z55623f4bnghio01e1nljypquv6g37sbq8uvwtn64iuydlkl42z8v1ypsaczxoppzsfjbkm3u2r0e48imiirvl8xtoefm78lajbad4hnupbfir77ou13wf38t92gutbb6opeoppvl5x7n2cx3hk2zy6yf1akligbuvr18v205k18rh1q8iynjidolj9spg7j7whaegli2xjil8iv5ihnwxaxisqepzeena8l7d74uycpme1k9htj7z0x8yyjboxcr85qgfg7s5zlfykwxmtutuicizatem26lyiquu3tb7a2fo8y2zx9op575vnsx1qd16ksxyax7o9cd9rm6ekl8f46y5b53i3uwqylopkq6sou86lez9zcb2dap9zq1yftcwtt69ol4teoc11gzydyyhmdepvpknx09fsreg7i4a5qyj3wvu1oxfbm79d1rrk75dolg3o05ygfypf3rpxje9sn8jp65g4kge44s7rfcrdxejvmsv9k2jfhc8ye4pux9fx62abo6wt1wgukrgcnbb97zxh5pdpbum2nrkpyn7pnrsdjj492gillvh14x1gua96civa6f4gp2g4xnhhytdxrd402jkuen03vk9nur8bz1xwnxr1lro1ue8ik4uluomsak2ahl85fo810v5le43qd3kem18g5348qk6gre1un3yxzdirrufu6ord5sxz6rjam1r514wqfbbdwjnb',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9755863418,
                expiredRefreshToken: 5507841046,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'rhli4y6akchq7je0rher049lsuc4b8j61z6y4nneo2c2gicx27o9nuu4w8xy5opmexvyg2awx5sog6rz3310qlon3b75joy0dvu1mqf8c72qlv34epf0mnsu5p4bm4s7e9ch8oq6fyjyxp4dhlbk9i2p81a6juisqa5eoup5dbc5jnm3ge3n640ivz5rfmtvdbpti9jqs897go89o64oofvet0rb325f7pw9bv5t4s58lusaxsclx74gmev2mv0',
                secret: 'lr2hevl8acm7319on4da6iudgegudxvqi12kiuxudfp5f9t9tnmmvmyrfko0i9ek61azdaroyc5wiob5ppc75r7ozg',
                authUrl: 'l49e2awctlul4w74yu9gm41ahyynzelmpud96qwythc3qoufxn8zlkjd6iqeophofrwesysum08k9sdc27d4sxkiupf3fyi1dm0o6wj443ambznxn2rft0sul97b81a76v3zirjstufxzz2854415j6jiuwn90opkrg1lro3i5wz53xclhkz2lpz4udpq6hon2rwpmz25dlsgotju8rvcot47d6ornfr9dfmteufxi19cuogik8renxj47u5tkkm2ljh0y33rbd2ytgvz696kucc7zvn6w6kzztg3s80wrf9gdych4nnijoc3rxfts3slo9sb8rr74ihwwki29x785cgztos2jb2f00afwq79cqsk1o4dy0od3tvib452nkoiyixuiw6v9o62pe9wfbvc6hgytbme4m13gz7hkpqwfcsew48mln1j31tialh4gn4trzkolxgz50sukdp9hqv9t372pr6fc3qhqhpz4cnqcomxiu2aftqaurorvmuygwpabmcmfgte9hky8yjlexo5cfxdmcl6z0hnhercopvfz3a5b2jcmdwjef8lmyo5zllo9wwdi9bi53hdi0vli7vx2wpn2w8j33xip7hkzvpcljfe9rkv5ag6l1qhfgmzugsoregv9pxz65jhsy716nsqmfuwf7r1sb704izfclobatnduziwc45k6g41h4zfdlpuc19e75mrq7y2qyy27unjtnto1sq6v7nmcqpe9cazbvrfouj6zoaqpp8gicokvraoldop2967nu6gggake4qr4ock5mszi4el830yh0h66rbfk8dwsaqxg5fp0i1wly1k3px39ev9tgnvchrr3yqcnimp1d2lzzpsxvp3c08j6zed2h8pj1lkdp6oz5gz0555nwj2gdq7j4ciuiqrgbiibl1nxhzxwm8n9qqz1yki9d63hzru9fnivvxpkbrhy018ac7hrmrccqkv5q0g1derfg3r05ahpqax7la30c9uhhmam1kv6qh102s4bheekhjedlcbjdnnontbjbwx0tsohh86gk8shpjov7m65apobs73avhmqvi6rysli888jblhgbt24uo7bzenx6t1kdgquh4xgndm9ol4wrxzmexph399jaz7s5pp8qo2hgg0q6fdwpf89b0bfmyj9nqisnxw2ifivj1kq6r0kk466fl1hy71auxql0cec7qducfh5pdp0tjv6rjczip9c39n6g3drayw8jbtbjdwfw9td68xcvy5wateepicc3a8vyzaocwn1ftbeh4smv5784n1hr0zizj6xfptdcxycf7za60bb944oj0uaj8wcsqa62nlykkoec665tbodpob6ea2s30g8v7ckstx8slmezf5y7ds7qz230njixj3ryd3nqgzuinmx0ds3bwfx571bnftjg4o65iq1vkzld0wrnj81pxkcip8bb7xaeaskgvmyc9b2pbm6r8x5qj9b1x8mz7mg35cofrc4d5zb9zez9z7nd2kql4m0qwok8exhtm89iztqdz5tytitzokl9oyc1uq70k368yg2bbdxa9lnabnjzjvvh4v7uxp1nudlsnfozja1aez71gnaml5hf77r9709rcehfmwd4pfg0pgar6g071rhqbhudjktbzvjo7zk6ucl54bh9nepqpfdu8thcsaahkrzbb75tfgef82idu2ivpxj8c0wee9k0ytvzamz5xbrezauv02p4spqyfsm76b5d2sy1bzje97hroy56tkfyo5x8nwdn9jfzaj3x64acli7byp0gz2vzqwxhfspryodwuhheg3lkm6k7ixoga2vt5aohc0vvrcqv4q1ndulsmyrnkekjevbp2ueqxmjhfe8o2eaayj03f08qm974h9mgudwbn4ac21tmvmsv68tt39nlkickpl37l35vqvx4pr3lfyl32gckwwshgb7gecxj3vzq4bwn54p9p4gyjp1klp4xl4xi6b8azo5rzoo1w5dek49f0mxbaz0v7z3onkztwn8y1amac20ytrlrs2n8y4dro',
                redirect: 'yj1y3gu8dod2ynpyp8jx2fgzxd1h19wdd98bjxn3tpzoe0vk1yckyp5np86w2q9deg0ajrcrakt4n1sndgzrdw51iduvg1bfe2uvmh5pl03s7untslhvt1tesw4bensks6dpcfpf9pi3nhp8s21wx0knwstmhsyj1ah2wogury7maxwbc0cfdq4q7g6ge4f5cyo47ogxfh5oc2ki9wb0hquytkuqemvk0y5am6bhzpf4mks60g33amgotznnu7ktpbhcqx833f3zesntlvcrpa3f2x36lh371n3676ed6udd4naynhxmoqljvmto6iro6o88h44acv1bc7yd7fc8vm37lrneprbk2at6lhbuz9sq3aj94ix4pl22ebqwoeutye5sqktgety89d0uou68yfs9dtpozzpgrcba093puoevizkzqf0wra3vug4skuy3d9bw99t163uz0lgc7tyv8zwgtnkfz3dnez2xu8i02jkxmsn2tbxkcns8plomsfg86txz59yvmy2uo72mbrlcbwm3rmd61m6g86o08sd9rpt3o0joale5p9kfkwu76zapo2sbs6xr51a3oetf6m2taua5ckw7dlp9mf3oadcjmibr76a2jnsemksdi731v2m8wzwqie9uwdutzpo1jysfhp4v5gjy3y10rqx3ffekxuzxbj8apkgl33okd6sj6i0g0shaa5azpvay9sithx680h9tjhlsskzuzg2x3unciey0sohxsgiocfgob20b3scllyuy4nnds1gtk2asc1gkye5dklclu1esyfjdg1fvbyz6a8ys7rbijmyt365e9t9udc7cka1nkhwjmbco9eb2xvo0v75maodqfuwqe4v5hwbxcl1fwer3kujjviejv3tkpb3mi12tkrgn7c72tejsbj2lvd3aoy5h7fz8cl72qx3f5847nr49mo8memsru9t1dv393j6yjir7081pccvogzjmmhwkhmwrqtfkkjg4n3t2it8diequq4qzh9vhais78im2ocbi5dpik1c9gxwf185hmyzk0zguxx3gyaxtr4tt4anke6f56vygx4jsyxdg2hy4ne30b90mojgoythmsb31fugxcsnoybvsm63kwl4o8qua0yrp6e6e7bz5kkrhz9zgr0cj14jlduqb4p4l04i2b8cp7fdrbqkdhjuaj83jxjfcssnemkw74ika8uhb1xc8u6lb0fwfd0wep143mj8ea877mlquvsm87y17gnas255fwdtoxf2mi2soypsqllmnwrkida63lpb17a4s3x50tqkaam10g4j2h3bvrhihrmear2hqc6850nqhcop5jilaze1r6nh1uz1lqyua822igo8w5tgdvxckgvtvvl56vuy7l4hiyysy4ajq6jhpnx8vjw1t4cheqodkq6zedhjbef92g8hbygfylt7m8msurf27z71jy2gxsqjjchcd3rwsy1z9kdqf7wxk7g1or6elja0kg09kyrk5hwu42w915nm15a6lufc7dkb5jbe2akwyf3i4gabrudg12hlg3a02brq4eagbyo6muzjzm2yi3zcakmvuhh1eomj2y1yd04an5hz7apx5ovz33y8mp23upbn7vqlwvfx3x5wmqofg7niwfrw61xwelmblt8a6k3ygc8jhpzhnywa4v6v1wp7xszz5ua7ti8h55968vo3lf6i0nabf1o2yiwb7kr93aeryttvijw900oaoqi8123ez67967qxwaq89d704iitxjgmyqwotxozzflmhg4tnt03rh8a7qvf4m7cs42d1meb0rxh7umg6s3g59a3btiu1srxqwc4a54p8xl1yqa5kq5sooz4adijwamqinrs2pizjd6ak2wzb96ko00uuzzewoe7wqvpfkd6buc5rdont5oichmx0kr62ckv5z1mp5xc8y3hehneutigdii3prujvyjl0mz3hszgmjen8lq7lsb5bxj5fnjtu0oh5sk0b4k8cqsty5mi6twh5uw8pxuepb3ta58f3hhd2ch0k82xq',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9137117206,
                expiredRefreshToken: 5847291642,
                isRevoked: false,
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '829993b5-84fc-4123-bf84-f313544820b8'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2bd7a018-b574-4dad-839c-8d0f99fc40d8'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/1a75b2d3-eb3c-4399-8e95-505d13ff2568')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2bd7a018-b574-4dad-839c-8d0f99fc40d8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bd7a018-b574-4dad-839c-8d0f99fc40d8'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ec1713ec-bdb9-486c-a105-ff4200a2b9c3',
                grantType: 'PASSWORD_GRANT',
                name: 'vy1rvjg1tux6cuel43o1f570houg4cqiy07ifm9emidciwsqssnqlmwjknql6vcmwo7ma0dzrlxx5dkly6w27r2z1gevb4r2qzu5roldowhet6uvxfmm8ovdxjl23j40sowhjoez6106l99sho7je8reaijazxwmox6r3qxayjufedpk3qnxaff87k41mi33epqjk3rcsbehiaik9s9x2jjh1hg11jqlqd7ti8wrg31e57pwp8wfjndwtaksryv',
                secret: 'z1xs58h7qk2z6eq18xydqa3i9m7dbecoc6terogzpr5cs6mhodqf2mvmk8p4a8pzstozi04cjcrrj5mcs78k7kcfi9',
                authUrl: '9idcv6s0u8rigj6erw8615kti1sb3chxtwye8gylkj1koe7mr11f2xya2oir9pt2y7xyvv6tjgfcv2tijjbxaih50icacby6ya1j03tvld77qoi47q8g6helskhlzl3qugr745mst0zvlf7m97ad8uklhejdh14d5ck51uohriloxlcvn2aiig2aoxnramoyprt5b2o35dehqg4vm6ccai4gikndrhe4q5gubh77q85mxw40az99oe9muua4orn8qzgspxxcxtckzqu2msoa8f56mrnwvodxabiujfet2eyc4tn4jfdeqjtpbwokjlspqdes8ratec7mrfzowc4w4ipztcq2r49n39qaik6gkusn27xbctgzdrmnoz3w1a2xbp61nxjinlevr1g941ck4vlnhl4ho5jel8oqrfmtoq3tzx8ctsa7ftp1za6p6ts2t5ctf62ek2kw2yqf9f3x4juppqot98y8j2g3ov1gqu4rinrmkv14ecutthczo3e1v7r0ymu18t23psrdpar43eg60aka49gcum1nekbj9706pt24wpjp52d6zat5th5lt0emt93tbvy386g1oqbccx6jegk3ilndoamguz3n6cbwrder9a1mtsj9k9h8gxwpsiuiyn0njc3j21d0ha8j65xa1me6bkrzvzm3eeekfsg7ipdm59vlwexel8dufvz7ubya9yhhf81v8t33v6dm8yb8lyidlyinrzrjlqj2t4fv4vyspr3rhhw0wkzix0r841t801rhqfikcbs7ljempdfoi61nvspodxads0h9hahckvmtiky1hbhqoes0s06onc1fit9lyoyszo6muraexkmt7dpu71rjpw0s2fkgdbopq6z44dt6khof7m86o7ybayst5ewukyethb79gz1ldldqw6ourrhiy7uuu8bkon79gpqndbxlaa49adtg8fwvuzqsb7ygojhmztdy33ead84enf94hcx5b08vdsrrowts17tdro08ekewa6g0m16jeovutfynj3l443wto1zfk8w5bc1pbjrhzd10qe0fednew91zv33tnqieb6tsqo0sxkk1nzx8egvahv8vpbj8etunornc7wf9ij48s0p77z8yqg26hantzfgldatcjrxk3nyovqm7o4fjizwqxfwwo9yohc8za897up0wieftm9mtk9imdqn809xt1zzmtrbuy3g45j7gmdayfqz7sndg7415yo5ohhrtc2cvtca5fk32yt6xepomsyal9perkiq6k2cj3c39edruskzxym2xfwelenxd7snixi9obtrzd0jud896aq0c8qh8fpjefvjysxsn33k2s9xbzqkh77w49qn9hjx57b38pffla1dk5ees7d98xn84mc1q7d3e6hn6jsw1yngljpxujll0eqael9rqwhybmy82kcelemyeslbogbanl8sqinuqnb3drwxm7xdy6h5ixchkngwq4nyprnsjj7vxwepjxbus466p7a3hixnsoa9k14hvcad68meu4knxlosc8lb9varw11rebojzvan0pnp3y0ny9gzjb33xvlnijhxqe6jgq6922o2s8pk8etk5r4dk5hhopnz9hu9fa674xao2jwpz1kijd5ns460qlrqbrh0lmbkjggeekg4o67lqhhyvro1uoi756ykb37igwduv73dbsn9687chdq5xkalb6anu2ihridggrpbrbfb9ol9dtvvchiywzt8928el0gh5uagablmuea85ph202tgso2k8xskiobg0dxv7rd8xtj9tbzdptka1e2dx5k1t6nz3pnqjzif0tcqb56kyadat6m1f6oxe4jy0u1mk5oy3fczd8q762kxpdvlt83wxg6b5ihgnrv91oj07zhkbthvm2737c6wa04m2jjc7jia7nnb031uwc18w96tolwjaq4bcfunn03r0d65gps2xj27d72matx4nrt21olndztqytarltddlh8qasy9zx77egbt6yssufbdhfuhcl8v2flz9m1bvze4opykn',
                redirect: 'hovcnf8macq5s821jbsaeo69qfhp7huj1vkhknas8db41qdzocl3inc4nezfyixdo0oxa7a0q6wbtkvm5vp5vanf7k7y6wuppssdrvz3qqppa6hfkpwtl5wp9row51jg8prh0mli8pa9bhooz1903bsy9ysylhli8tyah2yukxmirgbb2homutdhx02ge2b932cjhf2yfi8gicya7e6psqa4vig4dmrlb08brdv01x1u5fsa7bt2tijfufdgiv8f0he3ctpz4044pvxd0k7t1me15iofb73tnpx3e4lbl9lqhcll9qg277km3uoysvawym35l716u315ijs6tzzkyj2y9hkqk0et30dyhx6nhl48ilwxqyzs4607y9u8ex42dgcrhmh7si8rmq9yift5rwxdzayn9w7egm7vb6aevb0yrxx1fvi3nffajgjo2de25i6yxu6m1wjramt3cf7nigqmnaaka4upauoqpjfedcemsp51z8mycjud1112fyrvqut4mycswkmpz1gzodd7oa8pzf8k3rtqcnwc106xq5jhzchltlnu3xegohz4jj3v458yrzayya6fr68xzyi13k46r4c5o8juetqjyn65y9dp3flxwp1pk0of9jhfml9m9y99qrby3s4u77kccnqp2kb8db1xbjb2laib812d40wptssx3mcrdisvwriegu7isum0o5uvo94w7rgyd4jn8xte8yf1am5h4tj2580fj68bz4quevcznwyiizt69rrg78nrewxb24blvmcuwkgr7uiajklelch33goomfd6th9whgi3aix3nleg1wp8xr9xaarh77nbdsd1hjz0cbmdxypvaakh1sq4zqgbb79bertcx4x1dzwj2t9nqf7n3zmrf5y0a20nqqwdd3rht7pz8puhh93wui85xgcjsqy7z5v0g74fhp8pbh694vcbdxg0rc2z28bspbc99h5fnh7x26yoaaaiahdkuchcj4px9l1bv8us3w3tgw3swo7hvfukdhzf9dxwtja0rm5o23w6t6ahpsjje3tg3k9wiuobmiwnjqukmh6io9fyffbqa9qo7uurgce6qr7b1adqyrjr4u6ff1hpw621rh58e8g8tlppladtc34e46293gmameldld3txzrdj8s8tcqcddw4ne1968fiya9u6pc84oplc6aytlpdo4jr6w1ezyjckhzdhnq7g6jnujjxlfa7xpu40ljp35bxcgh1mrv7lr89oip7upa8nytts5xs7fl3ylzv400vhbxv2hjn29l95uuw27l2a6d1tvapprvqpekgvskf3ylk6ux7x186iibwvkiybu6xcagdhriqdvbtns3xomte3sdrllnux6vfll6r1puyntt4v8qm6fxl1sys1hyffnwe7t7k8y1z47hkvrqzv0si3ur4kknamh576mxirdqtsmx4aetyj9m1d1wk9otrblyuwyysx083ur5v47p1k8gwglhfgrcvpxlb8mh6yqhd05t0tm7c0wif1uydw6r462hx1aybxluf3ak51dhm30ct0pn0bgt8dcgtchboaeivfima3i78nvn0ne1vqhemqmczaxiya9hxuot5wablu51ulzfulvv9mi64bth07zzsqxm6jomfjazjmp8040c323paays7e5254uhajulfxqxh2cjuq607cos1yeobltq0gsw0ohl720hrdxc116sc641myxpocv7oywnz7o6vjba1eapvfr4mgsd649vb6ce3tkiqdvxch0ia004q2lq7ef22h9qpu3vjc3gh204vch2fd4nw1ecyttgzzyn1k1z15mp36593t4rq0wpj1w050grrdz01hst94yuxsxkq8tpsolthpaaofyo297lycyzhqcduie3eopgmeos9vmsj2lxjsddhf2kf2bf6oay1joi0vbxfh9rq5158kmo91w45pkplpuhhzeehxikzgscdm9xkqjdxhgztfitmlg4okblidxsnfhjpxs2hriius2iihdowkv22r10e0b52u2yo',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6795850814,
                expiredRefreshToken: 5556390766,
                isRevoked: true,
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'axr0uz637m2qrs4o4ifyijivclhj65ljsadrzglw420silksyx3u7iqpp9jbldbjq1e2i7kz0af9u445fomv04nwr5ei74gyabvnrjk1ic0aj4ttnkx2mfgm6uelh02mxber9eykxiqy5rkilrqa6t635holcqjneyooha40nkywqgb5lffa5h9q426smzsbhdptn1pvz5nf07aebvf90hafn6478g08hc2x741g4awoqvmvk7vhxx0m42u1m74',
                secret: 'mdrp6bmjxykyfjg80arykwp18im4oqiohn7tuf0v91grxxlau1vyx0b861erdi1b5ixgenuu6sh0fboya45j5aziek',
                authUrl: '4lmi5u852ij8myppppcaaz5f20kl0099lqx4neltv0khc08yataw15verkfinqr95jdkgjp3r8wvi05n4mmy9o7l68zmvinnd8yk0fkda9fw80yu7ders71wu6erj8ip60ktsqiaemof04k5kj1fxpviqky9zcam9pysm4ftomnmvemlfxmbns0uccgbdcid30oh73xt34yj3z6zsz8og4stpuc397edwyzwufrfy5rfeafixhl5fmj0my7fshyutfaxg4tmwkukbfl91nts5w0v6042ui0jeuj6c03wjjuh8f5045lxq6j0urh6cvoxxu8zemec1zxe206cmzgd0isysc2k4cq3hhcmb4vj5i8vnuy7c2hwxtn6lmrycweg91qm4xw8lx41crz7wy97st0kb1sm0ill12yxjwfleu32ox6oz3ihb5tfjrvein6zh2uohgpy1lys5l0yyyxysss8ejdh306mqhamsjas25c7q4enhvobyc2qsqlz2k6xgdat8rbg20ncvby1wktky6az4lw0h9i3frmlnnm8v59q5vowpsermczpsg3uqeydw44k3c15ke3f4aid3hagsmasg4m61if2ncmwuqkv1ppjhiwas1kvkieuwacbhw7lpb7ybuiwz7j9cf8hj6pp0ez6tz6rhys895njmawv4ux5a0nwmwfw01xqbdpbwi9dfbfpxmgn16ts3926xxhyl928hec78nenkv7wbn1g0r7no80a3wb86veoffl0h3wz2gxkeey1ymlw5a3j7x400wooloj6iip44b27jm8ng1vure494h5rqt2z796rfnwirc5kjzuqub743fsbtg4lrpkkock7kwflgwmr3iijzryl0n15bpztrhe2okgyyqf5o1a1cjw409ckl7y5rot911oif5b1eqnih549r8xk35x207xrk3i16ih4gngiksb2p1mc1p35uhp6ttr1vji8qwvnni3qdefhqbvhiz65so9ji0orewzayldoz6dcm1o4jhsvpzmq4lajworv20knydfiq1x6gg0qhnnvufmgp9u9ymyy2wu8mmeoqa33cruuw22dqiqdt757axc8tlhf0i93avmluvflzlw01gajru5fo0ukbyk2ii9fn30x46dx9q8i6076kfc48xoymtw4lcd3p005dm2gx5do4j5jd5jez40cltasarjl0yjubowrafzuwtwgijommh6otf26gk40ny2cx773ht0a7aweaudv61za1lmcdd2wsihysnr4xf6b4u6si5jmtq8oe3tql344w1u9ogtdovah1y4yjn5q0e0dsxghsdq5mepvnic8u263q6b36ucxlk9s3wr24jpu3v81titwrzpk7ejcag06654s5m9y1k4y5y0wolwbtrm5tcwwif38rrt2jxfsftotdf1g5fpgnzw2lete50hxku7bd0vh2gnys9e6mtyzwi9u53dri7ozrbrg11kzw2fhwpyoin19j15nckybm9fjby39oz1fsqpefrd53g983bxpebhv7kbw398vw3m5yysve1lf8mslmzd5pb5oxkz1z1x7qbypcsrsjislcexmgkp3ixj13a3e98es2hfd4nor6mryr1eseafo9usclk3fo1djmbponady5uksi60c6w96ikezbhpxqy4y4p499safpyoc6xbrehtr37uf5oim3zfr5q0j6hrvxpydllfb0rrsc5by191jm0fb9sfq7gyq37itt2ovk81a0vlg5fpn7jjnyu3ay8duxfe1p6v56fvmvu1xq0ja7rl5nh97bqna6g5tfbixppcf9z3gboap6hc91iffxf7dh8fay45e4eo0cbjaczq19yxv7b8jhiq7imxwe8gci0i0ob2niasnaetjyl53ed5h0qizmvismrgvg14te86ei8fvlwtzv4d81pepifoegkb76hc38b7rcjae87iy0jj9ytvoc5qfbv0n34hq64i7rcvhallt2xgpmfn7ad8cf0kli0bgbxdw8hoqoh0oxq11qr8szuy8',
                redirect: 'pk8gorz4ncx9dsiuvcwv7amm28ed80qe9g0z6e8zaqpf6jescnx6bee6g9vfm100zf6uqma16qioy5qe6fcah1jad3sbp8yg32mejykr4bztok1xnvmd5d9fb9zm9oejcmg0m53fkz3nj9xa4o9e8tnzb07wm4ia8u9797gs3e2g7tet3e7orixkosotzh0cm02h4sfhiddql27hd243s1z5zmaxf6368qjeto4b90sxzltia279guwieb370ogriym2rhbl8ajjjsvc2ufhhm1eaofngzxrnxvta314mtguq1pfpoachjo1zmcvpon0tx9m7g95osyqye2ju3g5kao3il79539ga1w0ko9s3wauydax4refv1p3vkz5l0tdux85cg6t7rcahxnrdw8507ddlgaf9ov2ujl4o15q57g9wxe8nr58dj5eoe9fe3qycyx38x17oadmajtcspk2fs0yt76emk3gspmpnaomlngo6vfsk3z9kai28lgwuh9wjky8o6f5ec03sen9fuhq5u3ielwliml4mlsmzs5wfv67xkukvnienz9nithl1qn7zdxknr58xkma68bzp70zuwz48df15lm7s1lkv2w0z5chiv4g9u7iot43znf9rcdfcvua88a3ckg3f73dx55m71v5h9lxbcoum6reuvkuvj2nq41q1x1gmmj4l88djv7bb16ox7xmn7rcp69kmpvsdurphknbny75j9sd9a1dwfzg007ycwn1m9w5jkveibjktnjvr2ftj6cqtmehyrw4suo3aoxvjvwt875d4mf41l54kf2kanuqs4rfq2q5y9fmpn9lgzyp4cemza7vgz76lhark27tqgxna22ipnyn0e2lrocjkpx7ohwxrfxry7qox5a8h2dyxkt36f3uovpnifs4vcuo9yp4le3epgi1yqjh37enriaf861k9cn95j7nelcnlgnki8z2s6cidzusnzm6nnjedlxmab84ijkhbizh3crs92xs4uhocr6zld8fkqdcxeas49eri7xjx2v0dj90ncy3ewhao0sxe1m8d6l5ja4jk0xxzcwq785hd9we3bhy67ettn5olgctybrlybfyhn9czvu4ex83q8bg9ltjhh368rs8q05hevu70qifouhnfsxuj3y3iqxdyb1uo9ci2b2jk7x6su2fto5g1alfk5jafoj7ych5u0kl6bvqo65agkwsye66krtd1sxmq3li0k34puuq1antas0yi6at9s6a932zuotn8yfs5g6r20kw2plhz1bx07n8mczxvaa5r1kmso2w30lf4ojcku5w1sjfc8yzhbmmise4nzrvax8cpsjf6lckiv7l58of6f2t7qus5robfhz2xslbqg98gkzx62j39zrmk6wf5iu2lhycftn1lbzafr65nj510pqoil8m39akqt0x1eucu4f40s3esw007hx5t2299fttzjomp5qjmlo3tentb0hl6rowewyww9ws8n9jo4rvswha8zzx9i8w84vkl0hz5bgmumvqig2nsd1mf7i2axlxh8vfprcm50s2667wvjdinl3edo2mp9nsky5dgfpxyxeak6uwjoffmywyfccv2csb5pr23odz25lh27fjc3l2v05cs005j78xm709zezwk3ojp9io2uj7ck7q9putw23v5ffkxpvpyv7fmif3x16enni2p0mtimx6ang3pjr5glxvt7ajgw2ixn6q842aygmjpoydory9v3iuuns2v62cjrizvus3315iuo4fv7lrhdmnn9640406kriiu7bms69yfvtjkw8m9tcgg37zn44qpp916bavs01r35cyei8w2evpvk697pcwmivsfdhshdrv45ycyvp1n626ecmefamev8getjgwmnkys9erdjyj76tnkth0q3vq8s2z7ejdngttlm679g0pz129mxmgsjrez68xmt0dbmznl9xclfojb7gzbzjpkw9bhva7lk54hxwoksl9my4c1jo4bxqwm5szp0i0ewf9jugv26rprgc3w1en',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8492286165,
                expiredRefreshToken: 2259682322,
                isRevoked: true,
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bd7a018-b574-4dad-839c-8d0f99fc40d8'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/5446ffcd-09d0-4355-8ca5-cc24df83c0e3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/2bd7a018-b574-4dad-839c-8d0f99fc40d8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fcd2c551-115b-4aa8-a774-aa9ebf248bb6',
                        grantType: 'PASSWORD_GRANT',
                        name: 'd50wi8wf7uzau9mi6usckp9mw7eloau2fhyb34repxhqtyxzmfqr5tr98eshtc4mn8zpi7xb8eltxylp75dr08xu7o998kuumw02fotll0rb3609lv4nb4hts6wdz2odtkmkfeknqquj62ddz2gxcf4vgrcqbaevxkquysicvbpzfj1aqzgtcp2acc9f9g7jcpeqbaao0m37o2n9j9xc34795jqpcpbspnc3bn7vcgg78px1l0u9zycbxfc8bdo',
                        secret: 'hdh7f6nlitcrdl7yrzoyrq9ylinmthj6mxvnnshelyfi4jrpcfsv22rn8q875txmp08lnrrheeostci3qyhohs2mnv',
                        authUrl: 'le1et8lg7xemjs9tpnmu6jtbqc9cu1pgefn0qfwiedrkuvm9vv9nfduedjqqefmw8rkle5rpdmiciw4x3if1pvmtg2qdzh1kfwiy51f34oa6jn4bg2ni2bzz6pgbm7c6rjuy34ld50rnx2n3lvjdy9skvfco12dnpk2v6meg2j3yytebwdga7z4xrktgn91tiq3yv4dh44jlc2zcx8i2lh4d0291x34t2cfdun2ch69pkkr0ffnf495hja3l1tb7d88cqtc3r35by582b76iuuds177y5nmz2ci0sl7o90if5bmy90jnfrteaxcx23dyowlunws0dc5riebiu63hqzv7mm3b4mszdcr9d4lehzvwfebw70ondcijw6r4hq6ypuztqcnzoy8b42vwk1fqnx8z2olvsneqvajs7hbcwmofpoqpzypxc7yxickomh6nkg1rkp0zklzia46xwt137s06iow1pf3diydpp3f0bdvjmhzfu166nyxq1kiop02t65qwmx0tq8vmcn6vcc8sjasj7bvnu088444s5u0pj7vhssqhsbaz0edyd61vx25mdswa4gnh8l2qlpyxxor5umish0a9iqi0o3tb5razuxt0erhm0t4nmcosdjdlissj2ppho2fa1hbiu3kj8y1845d05nre1vmjt0mux8htql26q9elwy8x410pfbpg0xpg5g07gpcixli510ff5wqa92kx5j6drwbww9fcjb9veclopnwdipab40zlh43bmydgq5a5zheptlcr7st35lqzcvg0v0cx5hnwyr52xeazlnyvi0gcb0qwmqihj2qgbcsc2zgv4l0eukbvg8bv8n4dembur0w7ug9bed7ssqiwgjcgkvx1l8w01qxiwpdne7k4z6k2mwvs6xvczlygvt2bzuyye5ir2jw6r2ruoag55tnwwbti0hh9t500g5gprvbgussgkk5cwx5dizmvxt58fxtwuwda3ntwx5mvd2585zw6yh9kirovwof4qljiou78jvdm7iumyvbkgn3mctczy7s2u8s40zs102urux94u5bdm6yery28jiemgw5jv6u2d8lnb5xj9fnbzwfhorl7sisqx2y3ay9ms429c88qxfj4bgrue5yfcepovflu6jl8dh7d193kqdy5xhhekvpf7dhd7fupc9qmou1epyeyuk1bbje8sio5h8ja99yq2q894r141zkheqnwcn265n1l320yzws6q4m9gwzc7mmss5jmr29r7dzq0te4fqxwpbojsxwdyii45nxii6w1nmuidf48o02yjm8yl7hl6jbezkxfgpw3jzt21o7w2u1mnojo8ng4z9ovrn1f3t6uag28jq4efnkc91bc09fk7bpg5nl1wts76gb1leegod28igg1bfi0h0q8jkasuw4yhitvjfzorgz99gzb2fhokq7ndsv4vha6x51lsqjdhw4i8gromt5w5gltvoue4sb1rop49s6uk79gljeaqkrtlhowtl55yjxjke06ecr95aiapusd6ephr8lmwvkhsv5ljs5ijltvj9mbgh2g5nke828splbs19x0wfiu20ilsou1fjtxedw0rokp5yr4wifa8x2lmvupiabvlo8dbl6mbdikkvvdbnvd6xgck6d1wrcosufad59ytm1cdf2n3pdjvd0fbemvexsaz2k5qz3w8n5jzvvgsvhicyfbqxv0gge7wm3e665ou9av9o4f60fypb53c2avpviy41mbd33nifyuzuw4rpwigfmnj9u715gf8b0q679fsg00n7ov5u5eagrw3054gyxqmnloi1k646l6br8gjjvjh00o1g7ldkzhbeto59i391bzj9bjh03t0dj4t7brpr2dk6d2bbfzjn9qpdhvp4xnnisia81i46jg1i7kjd9pcrurdnijp07t6ke4g6p0p71bj1jcoozubyyywlcof24f8vhapi32supj2wzalqlit10387uobiooql64xqoz3dkok8n473ndbr9xki65jnxpqsayho68217fam7f',
                        redirect: 'd326mk4wwhmdqdb3xb3hi4nabgotuzsu0qv9efn08k0zzvgxniwh8f6dxodyisb3lz38en79fdahnoj7us4lipb21frm83gopd4a90d3wh12feave1vi0h5knrkasjliio53g00ca685rk6gu777agjotgoyq9jvl6zdhcjxntq7sx844ah067wkp538k1ixifa3tpva8dul6sbrtysqozoek8xsn5ht2ux3xna4c9pow419w9lvsoxhxbtj0sp98uutjozu2cutwrl6t9qyvvfkk6zhwuuodn6sz3qergtld435zklomd4b2ow58pdo4vkqkhkf0ejz23k13ca077oobmp19pge90bum0ex7cc3jusfjoicvutsz3tvvr86arirq20aoab3on18z1dfwjqp37m1o1stcds2zdtn0qhpgn3fbaqrbz7u12uzhj38fdidq4f0tpw35kss8l76463q4q35yqazwqxm5x8hau791nus9ftt75dr7c2iyhw3v9kidue4b1a3aeogz4nfr1g6iefuirby5dk4a0zl7h4b3c1uuum05io42tn3djt0ehlwx2bg4f2fxupkeotzqoxhz213xzwaqkabvqbbgudqkz5tq3sdtreve0erpuzmipk60dyxkurlr3ag46kbrz8xo8yyczebosyzcf4nki5u26fvmleuyt85nwr5mnikjveiy7xt19i8wf9usfeloimc2bx3n7hwy0tuj7o5v0usbumk88to3qfhh49fdw1p7n4on99lka43qktp2ms2pqa84bhml08j4ylw6cpmonr72fqm64dd5jvrc6f7htlqoxkteiun1t8dqhwjin07yk38y2mftt6tfd351uj8t2qfkeszhhpms1uacm4niscvqw8cb2zg64i495by9ul7xgi4saaa499dn8d1ktev80mmrdwsidlj5a3pwbz0h7ze91xdahtkn6y45bp1xssb67ui4j11vpfiqlv720po9dlhjlqagf26dsdf4rjbz9kg6zsa8vnh025dbdj34i3aojo9kdfdo8r2tjggrydo5n2985egoiz7pcfw5dehhlm3mghfusce2e58iuxo1qxh8vzjcyudf2gpf9z29zv9c5kzlbsmdqk6u1j299353lveo60wbphhrxnpzxy17mizbny2tz3wqujvimkjf9bxz784jm348elmf6fn359fu0qvilfrncmvun6ar7t2f4bss72rhwp1fuvyq418myhuiqvi7ce0pdkdpgadpfztivrxe0daa5g1saoxfbx6rwmtkv93sdwc4gwzod6uqjsqgapypwv9fk49kc4rhrmlx03mhhqbem5bcwqpkivntmeuzh7876rydvbafstdfamhpxz1d5c4cfu1kimcemhrmp4cqj02qox0z5iys3m8xsxll2dtuigxd9uqb12284919uec2hjd7c7ascfehmqap9zhl6qrzksddq4fnliylhoxxe9g7fbm597433i8wrgb16l2fekbv0337czfb58as88kq1jr4tiw13z251x1vqh4v1ymgabckz018t19w6gilmzlmf2azs5vbfo7qu5hwjlchsdirofn2gouqwwlbrsa926m7m40bpe1g7a3cm57lrk4nevg3nucv6v3xoznjb5y6uowz8bkkmdum6xcmidn4brju4l5qcn2t6skjxrdvufv9qxp6yetak2b3ir71ekwmw8ncyskim8skyfl3wl2zp39vy1kty6zpurvnygdajs0nuysrm59jvu0g2aeuh6rh88weab6qv1k8acrgoos7ht92cqzk2jvu7h2xbdzeau4d1dstlg05wq751cl4xmxan056t3ggfoycix92dqavo4rm8gl1att6cimt2iabzbeeb3nsfrxskjw6ctilzh5qdrahuj3v3r3igj8aaw1qdkzmai6pr1whb8jqd901f5j98eudiibr9qwx2dd1r45kgy7kqfck4a1nyu1kqsouz9jg3edqubs5qsynuqof0l5phv973huewsnppqlyn6d',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 8817265899,
                        expiredRefreshToken: 3177596332,
                        isRevoked: false,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'fcd2c551-115b-4aa8-a774-aa9ebf248bb6');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            id: 'f50799ef-2d0e-497a-8bf5-285452de76f5'
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                            id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('2bd7a018-b574-4dad-839c-8d0f99fc40d8');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0ef09a4d-721c-4af0-81e9-ee21b4e1b7b5'
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('2bd7a018-b574-4dad-839c-8d0f99fc40d8');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3882416f-ad12-42d2-9971-efba0400405b',
                        grantType: 'PASSWORD_GRANT',
                        name: 'nig5eht76foa4gchaagn0yz0qjb7on1h4jnr94t7wq11ipwz783evecbabhx788enkhzmd5bqqtldghuqigk3j1aleh7eo4cy4d92eg1x55ws3sbpwlr649qkyv3sx5rn71q13o4rzzv82hobfg8qpubcnshlc27dcree7i9r5l022xvehhj8hyiqa73h460m0hsjnypxn0wzo08hwreeuscmtf48mjxrxnd2tmvvsthc8g3ifbpt6cdkut017l',
                        secret: 'tjwq3qfsxywd1p5xem9qibwbucv0rxi1d43hm7y9nyfod9tp847qct7mg895g7qey5rj2cfvcekf1lt6thm0yo6hl0',
                        authUrl: 'i0ahg9yh25ggdczqbnlgzbifwmfsj0mev3469fh1cyiuymr6z8592i9vwik7s4rkum1g6vanqscco43l6o3blem1sq9v26r1yl4xook1rzsvu9gawn88tn4tgfo0itlxdeaj34yiv2jy9zs61ibf76dqt57tertpyp8gv19dp6oecv1y6u5v6i2xwjhjztsab41mmrxspo890873eb1pk9a0jw0geepqkij8px85fkjiz5ni5kiwt2esl5vw3fb691263tftvrmx7kt8iehtxwqicbce9ms2kl6ofxom8ennt0o4dahdzj4f8hgl2pg255eote0g1nalbbq9ywl6dm02sgys7bs13d6ok0lus6benvxreplahzwp4dm4n44hl8b24ans9ff1hp763kghbjidbsnq5w2aus9yizwkfixtfcsahn10dd6he1dk5qkfde1cugnxob633tpoj2h0id99giqdz26zsap5izeya68mrok6395n72su6i6v277ithbuugi24fxtjrmmbdd0v8a77hf3kdshyr0is15nfv7k2kjffuq4pxjz2z8xstotbp1iz7s9t5pg5a0vs0i56td0s0ef66fbraj546blq1rt9ale2rdkjndwfql3alklemch1s20tx1hm5oep3m2unu3pq3pb6lqsfhp2yyqznmyfvtsemxft1wjr7x3itw6mgju4csqd3vgrd9uyneo71eukrd8g4ojvizfmkbuv936miyg6ig3eis897wxsuncqqr870p0gzqhk1b4fqj20rqz1x31f7svy6pigu1pcqql28l2wio66ersqzzy5lrepjywlv5nj385jnml3txnn8t1dq75b4uu6egm4iep4ax7e8zebj6lxpmka2cg71kb4f2c3zcv22up6y7e2t79l230mbdw11carxgm1o7nu7n5upsoqj10w32znysdgj8j2c2n5npz7rlicp7y6u2ia84v371g4gulyuvhwswolw5m2k12i21ftmxgmm1h9z9hgd7fysxsp4y9zvok14rxqov3khx5c4i9nzui90jheqmnu7hawpkcne69c80zqri3rh0yh7ql7avqy9i9k18l39ke6glbvpbwn7b5t4c8jkqkylmrtms5lh960c7rjfohkybe8shn2cpcbui8g72ph1aklwt9qneau76qhtv32u415wwwlwxc1bp2skojd6nkwcppf8shbnwbamu2u8k8nkoop2oll5n13d1wuztzt8u2boi3llgkm5mehp2k80ozm69kqu4d9eh3k48e5sr7liwvls8akkpbyuyy9xgjbxvuqzjhlgbg430bobe27meol0nktzwmbcg62uohkifv615dm5yq4lkflelcjhipd0fngjnb3m3ijbxuphugezq38g8rg7r5aawykkft8ph6jp9v02kl90zmb8dmhxqjfs0bmf830oyb8pzrin9x46skqlhfw8ib0rwe65pzs4hsx1me1el5ixor5wjvp2jqsmu3vrt8kgtfywiil2f4d2il214l8hwlt27fnhyxon71z0ufbqtaqz7ftm5gtffc4o3cjq2ru707tbdzxsh9gaz249ia7j4dgz866f4zl8ui27r5q65oqtsf8obnpadmusq1kjfh8k8fyzhbwid3a9mtm2ewmp4v06f36xk6qlnl3hrticuzk284guezqn0o0aer5ua0mpcsd3o14cda454xbis261job4b88xz3fep640ks6tf4azk5ybby5cijsilk9tv2xs2jfx9cpobj26tyqwsy1bfjgelk9qa80ll0fwbv9etk2k0pci26pc24e0g82drqm549x2n89nri6ya09gzcz0hakf407qa3gd3nbvkoygyreb85kbrmhr16t49z5ayp4lqw66eyimhn4nuic1ehpo87w6g3xfd8six53pjidh9bh4w4dadd7wlm6h4diva2bb9q8el8gxdakdif9wlaiit3wt4q2a6961yjtn012uw1n3hvu20dh566eahqj4sir5mmot0ocy6nl8wg',
                        redirect: 'wug1tdzmvv7leb0s1kr0as1dge5njdqrb6gndgiiq2ncngn9r2589t8c5bz5gwehq0w0ti707pvreuyfq30jv9zm4jyylxmyw6m8efpjzg15e18c713szzr2kp3svla0ozhjupwwa728dn72dugeht5aucykbng2i2gnbunz97whmsdtykyhsxn302ur9pp071tl3yxgyi7jnmgqdulsel92zr88yipnr0q5uy2bpwsg6d224rsl8fq34lzcarwcuwmny2gx3hxhcai8b416jusbfkebmzl448f99p197zrn33vc09fshe746bcga3o6ublguv2c5ytoxvrk36vfjzrputjv0beq79ceqv6h8rji6yjbznbroceu9ig5mw8keonl5y9ahnkbw62icziox5cetzhhg1o97out6fdiv6c56xd5v5xcb7buirkolodzr3ugwrqsxdclid8mqf1x7aevsduewcmafxi7irigi2yse7je72l249rssy147aiklpw6msarbrr4y0x0trrfhlrvfpvc3kxc2oidoc6kxdepym0iw1jh39rzew7n1j4iwqctv3um5huj3un9kby7b97sc54qsje9mcwq6vj5j61dqg1m605vvzjpyi6moyi5o9v0foq8nzggjnkn9m4yuyq2tzze6x14bwf0f3a7eu60qi3b74ppzm2bia46n0e2bdjrtk3o0se3xpv27m92vve9slik3qtfvcknsd5qjmh8186ucftczahpewzd2nti81kx9l0pwsru340k9w2x4g9mnt25acaivoq46jwb50mg96p86418boqkmbthfvepvq74e3ic7mcam28carf6dtvwuix9933qnmxo93esefaaorpgz59k33uwcac3ea0a0qv9lyazt3f0cj5yiqec1xmmfc7e0asv2tjh40zgcphh04ppfucyt4swuslyg7tqdgjz0rg4d8qh1nwz3vlv6e6lr4rckj8ltposmuqu23vi33t5nks0tu78oo4z1dv53almr1s2dqbud0lgrzq2xizowqtrht4o5lh838dfs1zk1bj1jbub7uiiot1rtgd12syru4tfzjhs0w7on88s1fsm0or5sr0hlbd95lptulfqhl0mj1ci7ttc7ofl033tb61cp42gov7f4ds3c988i7nk94igevmmp6wybtt49eozd4rrsimrxgou3z29mwukuwdp3xyvz66sc0d0cy0tyuj2855lqah3ppigpbaukzunrqozg4bz40lbnomc768p66y4iac1pt18rmn6ad55a4yrpwpb1u7kgavqik31rbfc9mx7bnazf8fh96uq0p45zetx8ljf4dhnmi7tvwyyvsopk9domwtw6avcglqa4dpa11vql2hii9u04a9jxf97f7ssyywd2ut5rzje1uew2amx1dfnxnh78l0ml3br6qgf6v9800df01uh4t58cby2ha09yaw4vo61oedrm96cstkfeow21bagpconk59ah1kzchdr9873xugj2x82j2abpbw5gdr8n0mvpzyoe625rznhybcwhi2z00x5ft55bk64ewgycwfkvpb6gn0u7u7ppjolhev0dou726iu935m6askchzn5tdgbznsmpjrprpy18h6k6hy5syc87imwfrpcwx0p0s7grge0lymurkn5hhce678ebjfa8nvf5alxu805yrshutkgmcndjihe0z6b292fl7nuhru8ooodbirzl95nnam9z3a78hswx45iy09bwmqed24sr5mccgxx8hkev69hps9iccdjn9p61would23dbmi6cfojdyhgerdq2tja5a8668sb8caejq5a4w6fdpgi2a4bug2onh6x4vhguzvls7oevcwdxm6nwslo2hk4h5yb49iysvxwvwdxkqw1nim5ty23ls4zgced4neec0wlblm0ss7und00x4uzje0le3nz3lfr0da7w8e3u7809khfbwrfhxnm6sn105ykssrnpk11lkktrh2qcp3vwdvhkv23l6t3efzc4rclet',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 9527121669,
                        expiredRefreshToken: 9000054812,
                        isRevoked: true,
                        isMaster: false,
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '0pxb9bejzz0ipsbcp5jntzohy1j8o3o2d7c2aytl25e80bq5rnizdlb54ixnjjy0ha0wjwxewbylxuyaizt5t8izctc8l8svrffmvwy0bidy962cntorfwf1f5a0pkexc8yarwy5bsgq7qcbt62kdzh56dqgfjf5qg8mf337p4afug7ydpsy477y2yq3qk9vibwmyf5lun28wnvi5o5trkowbhpxpqiwueyr7s992v2fcsnywhj71v3n484jx70',
                        secret: 'o6n3xtj0fxgs74p8jgamoj7q46wl9qe00vh78t2zn138fjba78i3gxz5lmlr7v5cbf49ktt2kf1iadh5k0zeucgvm3',
                        authUrl: '8kv34rtiq4l2b41og28eb2qxpw95n6rpz0rst6cjzkylr72u3oourc8r7qyd3n26n7vrsoko0s0e23f1w6g2amxljpgmsold8vetigy37sjva7hyi0vm2dwu9plzxkvkz0nb3jaf00hzjuy9r4amz9umlwqlz2dx1wxmfkipdkxans4fnpmf70i2wgnbr5ctuaxhxbugdoh0qo4k6zpmjp1lvan96zfsowwy1tvmuf4rwyukvv5g4i9nnkrcreu4w1pk0kt1a3wr9zzfz7730yyvd1zg8i3wkbxip88r74npq2xgyrhyq3ssvbc58i50dhvzkki03ijrhdwpoqsclyb6myx73374jp24uzmj1nme0hgsyqn601aztc4tcib8hkit2febr723u9edmwl0l4eixu7prohew38eluvgg6hqeavfc2wgk26imms39ccauu0r0q7q496v3o88eebxekgr6te8sam6cbczpcz45z0jqaqdpe0d5kfwrknem3s7owottemw1j32anilhhzn2h2p1hgco4rk7vonil609d90enyowvhlapd9xcq57o0udum6e9r5wxmw2mwls3ltbf7221qj6e68umnvrcwq5vq1ph8e2oboelgl3h9c5vf4ofvega2wwbm6wx2sdt1g2xnitl2gm9k2mrf9j07d8652c6pn68u3lc1lkwq4po7nnclrn8b209xl6mizpiyb5t7o7svpwsuoes6v575mk98lkcbkgjzbbnwjncr6c382q1eqjoyrrjzrxd73xvildz9eatb11tg5fytoqeoq8x2ur50pve36rdztoa8sg2oucnfht1h94e9aawrsdl3j1sfd7j27owv0mxz8vlrutxgjopwbcnxi5ies3trgoyr7by7iex57x4danxdh0m4u7aqv2s2igawgvx9ajuuhtyrjyrv9eoats3ydclw452815j3l232kxhgi60r7f7jap3ce5pk9r3qn7pa55c3vuh23ogesszxxa4mdpqpyksrglfwtewnnu7qhpgydarow2bgnyoj6r6y4a4q3pgnagzbfil9qrirmuu6ns6lziaz6ex9loyrcf5hres2fq1fe2pw91j0x8ox9ap18ci93o6npcuu1wv6kfvit4563fh1lvbnn1tinaqycltf6giqkrg10jotsudg17xan2htoj7xggxjv62ybs9hdpuly79s7y49ybprjmkd8sdrggnz7c4mcux8869l0wljsbx2ai9vre0c799iuex7id0rt1aaiwp04dtv171a664gn0s7r9z0yrcdw0xab3gyp8dqoot2wff7w0ucemve5fi1rnuhn664a5rscj16yaaccbfh73ual3wop1e79j1gst62y7nu3hpdl5xinl5agowrm2nbgpukappsxxkumtg45yaoplotpbpo2db0m4tbdstv1sd9am1ltzrb7d6cj8w2dmqjxwi5kdfk07jedhh0m7efw11vyrws970rwtx02wz5snclmdjnzyzkl8sjsvvbdicuc5yfyqsqb7iaomx7qh6caiovxf9q2uq10plxt9qw84ldcbdyscp2jnz0erc7spb6p66obfvhg8ua0ot8anryfhwzt7b41r7wnprk0avwiiz6tl712zbur6fwlxfl4yqs0leozv62sln3vuvu39ebyutnhhlt5k4hj46k6bosq5mv4t2w449vemfg62xanvl8kdg8y3uz4be1jfnwdxnfro4itdigccb5i41o5rupl2mkt38jcq2t06q3y9dxo72y58e8jbyuenw570twj3ru4rwuzbzmhmo1cqlm1komhee79efg3qlamaggz30taaa77pst81x2b3joaomsaut1dya0i6995bagnjb2y5wa0xej3sl5bab8tjx0zj23ncu6ynzcwejy165hacw43vle9tya7mv9co1yi70v1y3hrgrgdi1fqbmyrbxj5poxmf1oz0qlb83y57om5m21nia5f7pnfy9e7993zccrvze4pbu66fk9qg74g539juc7bhuuf',
                        redirect: 'a8ieqro06e3w7usuxn43dvnoypei6wzk7o3vy4pn4mrhaxd99bavyk4vnartdto5ryr939c0tjztybmivyy1vft7un327tvu5mqm7ykm5r4qjrbpjs6pzngzxz35ot689ubwrx0o8xlbzzfg99va1xui1m8n96m4ygo17erwn888sx5vja6rwwojhlh067p7frbou3mzz9af5htirumfb97b83iyw0f256ceqeh39gvh15oxtolw14w8a628ituzwyghxe30h6j6lkeug5tdsuye8nur5ytcbu5kzxllsn0tf8y9pvzl2ipxdan4msnpjq6uwrtpnsmcxod24nzri1q6sdl3qqnnyxvkxl877wg3hkxse3380vn90saf5irqut7he3h4vc85a1a3s8mw00o70fu8brchmq16dkna5bp6arhmzw7bbal6xm7emdqx4w50zxkwx4vee9sxtutd1b9g1l3qz82ojsh06qrhbgydk3qxu0chn7civbr2eg1samu8nwzyrph5bxcdbw1m1yoi7s7y6hwzfapkohxzsdd6m9dadzitwycshxa4ckcyznjopqcu0r0g44er3omku3lwvz8h8qpxyysc0wkmyr1kn6v4fen66ddn3bj5v3l45boob4cjxvdhd8y4l3jw3uvy74jy2iylt1o7prua5wt18io4ktztyijrb3jw5085xcgfbjfvbzxsdjbfy499u7orhjy63s75c6mot2qdvwcv0cqq67mujnpbl3wdascodp5qppk6rzjkwi0way8yu8k34hwnbvf74sem4hhmj063xpn4381stpbowpzhvd0t56ytq18uyu2dbrqq8jq2uydalp1pbrmj6qcfjm0gncm2ows1j8s3945lnz3h22yklfntcrduq6obfsc2r3hsasg4out7dcral7zo0qzzm93ydrtikibnyivhdq7ahgtrfj5k623y1zx6ces89313yivttqzlb0tf1hj3sgov3rp561wrw1258kz6w8yjin01u36sz3a1d0t4kqwz3w7gm3b7h6xbjy01u2cwiwwgu5mbi498bjnof1f39di4diwdtt25q3kkjyxzmfe8nrw8irtzfqiy83qjsasdz3bhb131u6mnevjpgs3l16eywza1h9a1vi3cbel8ow5czj2ff3y1g4ruimc29jhpcxud8hjvaunh79y68w4069g9qnq5g2dfk1dbtn1g1ei0v24rd0b2uzgtkj9453uqkly6jy0fs0ok91f7nfppvfcx1y22hk49mevg4bwdmsrrjisp2rk3u910bfc73do6jydwxfjwqu28jdybo0hpss87en0g8z8mfu5d1p0f6v4kp557zu6ru24m4pmfk79maym3hcfwb4mm50uj1cae45miockk2hnfoaddcw5zl4rq85wz1wt0qx33quyv9t2o7gaoaz05p4yv99vtyk2li4x2q1a0diakfkdgrh1owdusdu4a2tu75mbs27sdeh6ulwhr7r6jvwvkv0ktonbmausueakvifh4tv7pilvd9ntk8aiszonn9ma1fvfxinbuenvmtoctx67vau0npcqxn6mzchvje9ahq9ljsetdzdgr5q4qyjdx237aebbhfunqvbtdin14p5gh9l2kd9nhug8nmypflhw5yhehk6j8bag53d7izc60qf4lf7cy0tpoclln81op282fakmqeg65kedobtoak00o1j47eyhavpj2pih5odp8nnatdo29byvucuumo3ijplb50qfzayobgxcvmwv8v9ffitfq3rk8i6t194hr7pjimj6mj32enkcoebxsz399ku81ukw8jc769uld4r85h9zcatbbvsfqocjstgld4126om8a2dbd9a8c39nq4y4himtn3y5v466nun6tndmf1ovh8zn9wufavs2gcofy13wrvguf3ry0vxgyiw6olhbjp53z6kn0ra63fpobizd6ixkekazklhd00ssbsf0zpremsetguhot6ce4cfiexqjy0rjqwiixmosv43t4eqr4',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 8856583801,
                        expiredRefreshToken: 3874078454,
                        isRevoked: false,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('2bd7a018-b574-4dad-839c-8d0f99fc40d8');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9b7c37af-0d53-46d6-b4bf-a3d85df85a20'
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
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('2bd7a018-b574-4dad-839c-8d0f99fc40d8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});