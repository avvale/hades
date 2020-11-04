import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('flow', () =>
{
    let app: INestApplication;
    let repository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST cci/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'x9zzr1jrgwoynxqiea9r5r0dcy1p8fqpg7grjy2g',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'ff6f5ot2p0ujdplueo2gg7u5k6pnyivesqwmix52uz51qcjg1z',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'jlcpza8vv4mun0i0ydav',
                version: 's8f009d35pw03i0y2e4t',
                scenario: '4llo7si3ubxzml9w6oebhgno4fly4a223dlix3uth7l1d26l77dafptpzmuc',
                party: 'pvpwq1km2pv3cir8h8ynrzwf05zjxie5qp41jn2qdolv151fcm6m3yg35arrjjjl3havaake807a996fohterqvgbv72n2wvtnidcpty9d871x5971ung4iogchd6wm3jw4euyynigq8niju74pqr52oaa7ld8ga',
                receiverParty: 'eys89aidm73stxe402qiqajktulepphpgxlnyd2uhvuf28dwx3z6ihd3hmi9zgvm2mbg5tnpwuihpj6gyifdoccoei5bhb5jqbjn1c44ewy7np3asx8yk1zi6nqbt9tjylqw4rlfhdvrwvd7ifsi8qath8nnavsg',
                component: '47nxjlk5eyxmbzhwtpfzq2xk1e739gnsouq1mp6cqzjzrng6rt2agnv0ztsapa79oxhoeubgotwg0x47nqoq64wy4rb2wzata7f5947etihmvsht75u60i4vhhlhn5719xge4wz0wfpwi6c76353xm1si6tt0b8q',
                receiverComponent: '7o5b9o63vgh4c42wibzp3je8vwnbifjyzhaerqst64pe33msb2mu7mqnjolc9fflslg4gu1znycjmxusirdqngsn2io7z67ta947js5qt0ur5e81f145mc9ybnjb88dd5fykpapmca5b4n40runqisipqwzunow9',
                interfaceName: 'jcl2xtfbex38yclpir24dxikh4avghy11rqvegbhs348u8mvq2tp1cnpi2f73y34tsa7cv7oio1o0if2gug52c5k6h9f4yy3wi8gb31vayemu7inz9l8dwyxeevokd10nrfhhtlw4778dvkgg8vnfnaix09e6nxg',
                interfaceNamespace: 'z1zjsus5867oa8t2mdjpj16ww2bblpd3cl9z9o6cm8629ke9y2kv0nul633nl5rx4d9bxbp9yd9r2c9tomvhtv2tz6v0fwuvw8kdfhys84mr0htm4vij299vxv6xker23b4v7rlytk4y85ol93dqifd7ywrelguh',
                iflowName: 'heznkpv1li57nzcc5ytdw2gmjef9ha3tqg8vzukptnjhrgrz97om6wzi2yl7wnduuo7qu8byl26yroutn4ne8eedd6m4uwr8tnoe67fntq3eedgkgqmyo3uzufcvi9epycp8h9rnjd66if33jjopled6wmtcesyj',
                responsibleUserAccount: 'x9685vosxiguiwnfnukq',
                lastChangeUserAccount: 'uv48w1e00frzdx0wsouq',
                lastChangedAt: '2020-11-04 12:31:10',
                folderPath: 'l8ht0ppth53aos6nuuignzw03f5klggohqthoc4u2agwe9oe6ma0xkidf2q056lnrdexqcf7tvvy31dijjpwkzxgtybpopxdjkdtx31arlps27p9hchn1r1r8u3nfo1gkmhx1hx4icyb0clyp6sz7hzvxt5uetd5frgb36mk1vzv06q9ir8q2adkdp9tlehnxyfkp0mm1axcxj7rcfx59kafxxvxzfgjhjhpstikbxb66hlduulfv2woq5m7re0',
                description: '8bltn7f5ymkaehkrs09jxfhvyurb01ao5jkrbbf50zloobyfe1oylqke9v6om5srgbn8x2ixdls086ssmp09q86j4wg9ykf3ufp8ofk18hfkvrkph24xgnjt72bxdlar01wv6b58b3m2avi8n8sdtb3qswciicy3xdm52s8pnxw5q3m0qngj6vb8ihf3d9ocopkhmsb6wt76wo5xrrig78q6kuwscbljbhyj6xok4aboytwgh0ynt55umejb6lh',
                application: 'v7rpe1xykfbzvsx8xu5y71h1z8k3va3d8jm82udv82gjx6v20z7korbdt8ln',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'r1p2qohmkoneox7r4yq7qlqlfwqzqw99x06jhhlx',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'v970r7d5en6en0tlhhmmrsl3kixo4gsgk2b5vjbf6ytvfl95qh',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '3fm1y4zgycr0yojh0qo2',
                version: 'arb3aj64n0qh2v4zcptf',
                scenario: 'gjb1tt9khoaehegee880pyscza6ruytwjstiw6oe0of4cxfy37zsgnofc98e',
                party: '1pip151vkenb2gdz6c6mlmuathb8hbhxfk83wxgdqg03ec6ngunmgxzaqzjcx3zaadddwmhtesuvj1yl8sjw43r3ddysjmzu55tfo90qsto7w18qczyiijvvsujdtmzel0dfhpbkp249uxfdx0mzeslp53o47i03',
                receiverParty: '0gb65a1tclzslxikby31emf4sqz6blia1y93izobja9f9itynzqd9dbd5e3s5lm7jzoa2riv5lig8m4n32m4rc9lnr42uthrhytiz7brtwe1c09h5io5dpfakjwr4yl3inw3q0uan9e1c0v9rlzcose79niep5e9',
                component: 'fe7nu17te1eujmpzvmrtt7yhjrfovs28jjoyk8hf2qdsyw3grc4eq9y7r882i9odpcpxrodycsox3z8kbwykw321kqxjusc6ecn9n5fyd1szntfmvkm8ad8znan5hy7udkv8qed5w4kwdbzad2a7myuhhehqmle2',
                receiverComponent: 'a7xf3m3grimhjuxic377kpxhne4qyj69hvmqtc0rv2vzwg9b4coqb6xc4nnm5obb7iqas1eeg7rrlhob8to5arqwvnc9gn5q4a1cu85uif0wbbx1ocmy165y3inhx8x44xnv27q90oywt18weuq05crgdhh8e9y0',
                interfaceName: 'zsks3172r7k2hee9vakad0bwdnxerb5bodd7tgbx4j52w7kjfefw96wzsldhua6mrlul567v44nzkkbgrw5cfmx9sdd17fl4kkfjaghhpycp6grvib46btgylg0b8ppwn2gqs2j6qhj1uk4dugkaki0r6m31a79t',
                interfaceNamespace: 'q7crbxl24zccrsrkfcpjz5ujs39z5eutqcsoo3iv2va1ypr4nhy46mix6g86jc0ffa4ax2ocql9dvf3d7negrbx53v88ipozu2fccqu50kzy8k0x1xwganczkebxkv8caxkb7xxqtvu7xrhnh6fkfqyjzkf0rzzw',
                iflowName: 'hhya6zhfcc2n2zypqgkxn9jcxoo8np9ihd6whyxc1igpv32obq7j4vqjlwsu8m2gwd2depnmr7psg7bzn9dsgghlq4gqr2ysl9j37m16hp9z7h4jzkz70rhyuemhv9kxj7xr3ntkmu4u10z4s889v3lr06zgnubw',
                responsibleUserAccount: '6dweo5mt90iauzsg6h5r',
                lastChangeUserAccount: '3zqokxvl0zj1cpkptuvo',
                lastChangedAt: '2020-11-04 06:58:16',
                folderPath: '3tex8mlulwghvqy6c5l9ho5oid5zpadu12ohwbbqb9hmm6ukg1b5amffk3rwq7jzdq0w99j4haye52a9d04mmhavzljzeg3w5csefmdcbc0cpixy7n1hhrijbyipcwixstn6spmm475p5ijg19as0frhh737afam191lavagrfcpjv0mi5s2io2lj41nlp713l8ojxdzqf0u52pyk5wjjnst3d65h4ert07t8vjls9jydrsu6hgbi2c68yg3c7o',
                description: '7zk5htvhg2qq8dcqlin6nqo084xb8qixyoujsf7lwcpoe9dl2qwctkfk9jeeybx1bso7brsu0e4lunyzvddd9ghy3l8qyl0wj3yndkrfjqex1mvgb7jk447i5j8gfm21wzu1xb0pwvp4ydecnnhwo0ic7cpkqcim8kymh4na90eoumv2r1sykew08pgn16l34uq29raiox9nj2n972r9appyq4p7i8v89yq2c6nee7yss3x5c2z3oqwznxubig0',
                application: 'fkuimevosplnjvbuij2a306u9cmjpy9lns0himg96g3h15dztt9jsavqiv0p',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: null,
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '4tvniov9rmj1l1v8d8c6rczs3vsyl4fy7coz33ik9a41zoyyys',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'a2zsizaafh3jf7iquj9v',
                version: 'yew7pq5ns6u6hyv31dah',
                scenario: 's9goplsmjj9m4dd9iotukao1zi0zeu2790a1srcp9czadbhn0wpfpftvwyrg',
                party: 'on2cmz6e4tbsm9fdaetnf6ewyea7u0omjaozmnhv9b00cbcftv8ofmqq7vv5yvkg5uqo9kok3ccihsrnivvc2skyycu1490lkzdbg42xhp67za41yx2lrhtltckvud999cvc76ehl0nc4zea0m4mtetxa3qr5k0f',
                receiverParty: 'd57c11tfhv7bluf9gg6q3b1rqg30z9puvuczzzzpw6z7xftd1k35zzodakhpffkq5gyp70oyz7kng8dhn7eotlz8347k1z4y9xjtzmgnmxb10h39xi8age53ok6bg1phqkxithr21294ykjjq11xim7nom7i260o',
                component: 'h393u4bo4u8wwor8jziu6ljjrhudgt2dwwm0eudncgmb1vm2dt0nnhknh3h513bopmbx9zsnrbnx7kqondctw3juafngvtu4zs7uajshdo16luqkgtp0k9868uyykz1i7qzloox3a7miamix4omr8fukzxb5oj6i',
                receiverComponent: '43c0rr5ouw0rwrt8aze3l5aiv6iucdpb4d9486jyukdf0stkhoof8ihferyx458ssl2zqnbrud6tdedvr2aa6a9modz0hraqzdft8c38w6z2ie1l17h9yw9b5irb29qm9np5uce7zsdlbsw0gp3lmcyvbga1i9xi',
                interfaceName: 'qtso6mg699tqfy95sjdgrfbfwrsschyyrxz2s8abzhwdg53kgg8qvjpy7umv3prnc7oyjalutn1vcmp9s6kf2xy071y266rhaa455p1zp7hvnkeq9uctjsi5i9plzd683l6the7l9pqzjj61jxnasvi5eqn4e7k1',
                interfaceNamespace: 'zq25adahjwou33ww9flzq8wlmbq3d33441km09ylkbknojks2oavqzrs1mx9j5idvjv1nl0jv0gwhahfzmp7m6apzgmwwqqoovnsfn9fy7c7qao7uzqhlpxak2twlt5xckx2l4exk8gvtdige422ik88obfet653',
                iflowName: 'e55zsei7fo01p9rmgmngai194cilr2pyzahusozooqy17dge7wcf3alb1mdueb8cfkuehgzqajrjx0aivlu51yfspsjn3zie0fv3sdyedy4znmdf5u0g1pi11hf60aiennst4qcg02554lh2p4noaxtn7w0csq0o',
                responsibleUserAccount: 'qgsi122nwrp3gdcpdoko',
                lastChangeUserAccount: '6c3es4v6a7lyu8qhdjqx',
                lastChangedAt: '2020-11-03 20:23:32',
                folderPath: 'o7stz33zmpk950sapwnzkcbvukdfzdbde140nka605y8c1lwgteu6qpucvx8ugxoqb3ab31uvjh0s3soxuucotiz7n8ly51fluw1zh5lm7pnh62shpg8q4js63soso17188kds824v7kgxbzzhsjnri4pm8fofnrn6aip3xtjbml0qtk4pzsjnq8pkt6z8ar9epe4wgenbx968uzrrjmrzdvavhgekn50ay9f0dn8djja575m2demuwc5l208rw',
                description: 'zfb54567ubf5nrvkf9kx2my4g503ugdvej7xk9a20yv9iue87gklzghz46cysrewv6plxs3te8jt3xus4c1s415c9ytbsyae03v827elettrmzh6sqqghudqbhnpr3t4giv0wwl1bgcnhgrrdy4u657s77f13dnp8k1buaadkia2uldi7u1ben24vs9kaq2kmrlflmmbvkc8y40sy0uyik3jmwl4tc92zftg25ek2us28syprvqlall0hc5qjn5',
                application: 'mnvlhzzbk0xq611et78mdyjpne0o1s4pdlrnw4dmrc5ndvmsirlwax4c4vxn',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'wrdb8vuzzfyxym72yc43mfcy3o93pcqnc2tbpyv9ch8jh0qrd5',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'gupq5jixxsxawxg1ilwm',
                version: '1qr69i5ortd8a85l74ra',
                scenario: 'yuzs7czeminktjh43o5m75s7yvrqis20crp8vfdkzcsfr2cflbowg68vzkdk',
                party: '18z83119cvhvyhdwnccthbs9vklw2xzscn545vssu4ad38nl5eygsdrhgehymta2sm7qv4grv4rgkuvlcmmo60dpqv5u939h70s59lns1ihy3yskh4y3h8jqvwjcdsm5esj3f4dos1rnjpb8s241nlwxfpz37xxx',
                receiverParty: '5gd3isd0szoxngt22u1wife6fnl5dhuz2ixp7gx7q38onsee7q8nw8jsgxs1jrfguw1qb7rxtfgsig9hpz7mb340z6xmvryoz2hx49it0zz5d3jzotkpx4fpx0udje9ug7zqr79sg9xtezx7r1d17ud0dqu0ru1a',
                component: '5ypjtdlem5h478avijezerrl4ajn1a86wxkd2qetcbrowi53pum5846urlnxw1i8lfzmslph58cosraxg2nnz4nni8lfju137g0dyoctt9ctb13l49vb77363vb131ujer91rg9z4sn452uxlbq7q0w4nhthb1le',
                receiverComponent: 'ujzdkky6e9hswulwowoylw6307ghunvwii2htg2wh3aaez982nllbyvvh0c1z3nmvbjvr2031qdp7wmkpq3sg6sryibe3au9y1nsvg90b2iqb60opak9uhv44q0qiygupv2w8yw7843t35i4zxp6wp0cm9uost4s',
                interfaceName: 'ahhrdph2n19tzejevzglo3iu6op6zq4zvf7mxdhp6kv8iv85vxrmigs52ykrlqrn11f0wcwvbfye8t47y56ipxn6srvqanrhbb8jcue0pujoqin09m361cpem4y1171x4tjqj1m7bk3j3wan7aywimfdi1ak4tql',
                interfaceNamespace: '519rdzck7qu9j3n042v5rnvh3njmunowiju7ly08x0bdfjem5j0f1ufwcwallfocy58b5739srv2s4ymkvzynk09s5o2f0a239rwgesilbw5r2o7s7oe99wjl395ts50yul6l7lk7atn3kbc4shqxx2blinc7nmu',
                iflowName: 'gntux957nreeerac6ibi2rklcb5i0kgvlkweuui0yjx5su3omshz0a12zw7lcjepuzs1m80apqctoilcqzehwb5sta6ovk5ziywgc97rm98kpexi2ihcqpngk71p1c9ngvt4htz9r9gm30a85gyqefx9twdj87w5',
                responsibleUserAccount: 'h8hdahlp4tfs7oiirzrx',
                lastChangeUserAccount: 'k9aot2s55vinlj6v0jao',
                lastChangedAt: '2020-11-03 19:46:32',
                folderPath: '9i9uf5okqz0qs37ber4njd9l1z7uppmvf8qldcq1gpbqizx4k76xin9xu0tb89tg1gf928lg7jpapd7l8eihnmfznyciwnl2uu5ramgcj3zt6bxs9cg4s4qgtvb3efdvjf1891jkf5thwl43gr4091wvnazcv2u6kr5e4r88ac63xkld9961f32lrz6kt5w21wwxkq16fi8mis6tszwyta6oolw3ujzjt191ellkywrey2xqmrvozfv0rak37sr',
                description: 'ec27e2hmnhxsse469ehcq2jl37qf1s2dwf0tc0gcqc95qng8o1eu8mdaj0k982ryallbta0nfho1r2g93l1gb8b4w79gez4aocqrlduf0cge4nwe9uiwva5wa5obzd9irtkjs39o149at8czfgh1avssgw0lrp3dsblwksn9gwps49ovaatd1ku1iaygudnu8tn89d0sd533ww0316d8db7h5faujazmzakkxdmya1xeb0rlyog4hq9ei89wzag',
                application: '78607gx2i8vaqez2ukeama212my9v6cx1qoptu0wy6884ykbbmvwnljsovl7',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '8wafk0nmcphitor41aw728jgnw1aatmvuh91npq5',
                tenantId: null,
                tenantCode: '9wetm8smcvuv4q4wqx6su618zo323btsjnyauip9gqmogn6e6n',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'zc9wg378ppe8kekh95qd',
                version: 'a8i5n49fq8lzucxaromj',
                scenario: 'g65ur6d0iodbfdggdl6rgxor9jcq9kpif07azw2vrwe9gmb2fw6mua7twr2c',
                party: 'ejvv16npxl4dm8lyouomn46ath430kctv46b76tfdd9uavo5rrwilt1k5clq752798x8mbew9alcu4lqw40mlxfrps5yjghskwebqly8upcmcm64ctmn6u8980m3i9w0ekr4g7yqzdsad2283ctassmyasv3k6rp',
                receiverParty: '39120skoh2y1zj0gxlhlq7qhsq1sl6jb0vks0g1mgzxzuuv60y2ve75t39ktnn6t5dgtxw2wkqrtfnmcle04xdick98kb2ntna0oo5p94zmfkmt5h3duzchybow1woq67y77a33el4xngymcrlfjcvj0rayemb2n',
                component: '0y43rjjkxfnyd6l46ptwjyn776kz3cafnc374zehajuvw44rel4qihcklcpyd6o1tei8iea50uagah9gdwooqj2x3syrjjq0jfdjkreogi8rtdvq5ppdev8nm659s09tun80bihkuyrkkq0w419al9tihuk5y8dq',
                receiverComponent: 'd3rlbzutgm8l6n3c174gva73rgun4972h25eyntyfmifcl8qt1uladdkfjz6q6shafohmxoulwixxq8mlpjwkvx5gn8a5tcdsg76n77qdshcfjkx6cooosifm2oppkl2y0ocqy6ft9sptiflpx8bknofbb8k997s',
                interfaceName: 'fwqtd4x6ycpmmmeoz5h4dwupquz7vwpnqw5c2gij5qhxhyhcakug59f03a8dben4gily5iqodo08u189cje0q8go31c7iv4t7bpnzfp5o3y9td8hk0o3dfmwv2hpftdwqcgzy5w8mk0j8qksxi11dkuowvgblenw',
                interfaceNamespace: '587fsuy58j85h4sz9mpulll4anwnaeyfd3pfaqgmhn395sjsimyfk1x0lrrdxsqrnjaceozmhlj1gww97fhvt4o8renk2l8wxp20pk4wk94eem7ii9ethq6v5d9auabb94cnhuvd4sprou8e0k3hadzbi5c19eij',
                iflowName: 'sa8v72nlv5u7j9u99e2auz8h2wmtookie6y182s0u2i72egghjqfzdv6kayvkb5zoadrrhs78794n3kc8qhojpt3vvfbwlh37u1g4fpx2f5rsxfuhjbpl9l4d7qejz5w76hr35dxvjo8x90be7qt9q1nycewkhcq',
                responsibleUserAccount: 'fkmvvv1ujcgb5ehxst9y',
                lastChangeUserAccount: 'qg1fj052lvpyk8eu637y',
                lastChangedAt: '2020-11-04 04:34:58',
                folderPath: '9d0r3wle8wg1mckfkpowm1si1krzybiojw7yehlfzxbqecgvgwh3xyhv06lt59ws6ecxg1u3sa5lrlzhc2qwemjx58cbnv6kl21nkqmz1dvispn6soizyeuwe76gv005lowkc6shdtcoseavo04gwh72dwqr6eu0zky2ed6anmvhq2b1dkccy84g1zp118scbce770vy3myjyxq3zi1jwrl0ab27jus2bqy71z052czmjpizgb8tzwrccc9vmzi',
                description: 'noxs3f3yqgonlhgk1x9gqzau4llq1uh3e14vh1mqlw7bzm6ryhqnagbooavajughh01mntdpc0ty6g13hj1febw0kzv4q1el5ccr86rcqqz1kpztd3myc7joskzj4v7ldhqrhuiti8dftafnlqg1wy3fmzq6p3zv1urga6a2syyrftmxe2zmfcrx1q62yc0a5t51ft6jclwczazut9ih790xkerwbsdg7ujy000urylc9y2zrftnafzvzs9fmdf',
                application: 'g5hd1umtg2yjflityvk7jl1y1pdgl4rczkjdgjguc8k9ft1am10cp4ivs5l0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'sj3682d4tk2jzf7t65jb9swqd775y01ei1w8o6gm',
                
                tenantCode: 'qiunj4dfvqnpj3snu9u6xpocnp6v7fw774ra2dl6ouuanhhd5j',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'd76m02ni5i9kqq7hjkbk',
                version: 'tesz71b1q81pzdppigad',
                scenario: 'sakadlmtkp9va68bsuzd15skf663jzj9edoeigo9uf9aj8yewrgjxdauc24t',
                party: 'p9wn456plwk10mcqols6whqjyf4yanvw0kf9v7dvqqsnrsj488qar0bfwsg93nr4syr99vvtapo8a8ynf8qoykjzu3izpiikvyv1129y595yi7faejauec1o1s26mcni1gsjmfl34cxqti03c5v7yrtevhendtfy',
                receiverParty: 'kfevidby1iz9hz6lay3k6rnacaofc2y4qw63gmu3arhj57vgy9k1gbgvelncrl0il228iq7i36uc5z6k0v1bejsj68jiv5fxg4ym4psc2g2gqr1ytburhrng84uhrkw22nrz0iy2szxlnabqxutydq11cqyyzez4',
                component: 'y8mqqjvh5lrrok985c68ptc1eryuv149ervf9sm4slfq0664a1a6bipri8uy8v8iqbzt9bsjlpgdicfrxqnf8q4zyyx5xs3q6lg3t2ff43gfd5fnuag6n9peoqez7i3oocak2ad17bh68oqcrrxtpqvh0ipomy5d',
                receiverComponent: '9cw54t3lfin26ox98kqmml8hq3zddoeypygvk3tatt5or6c9io0rv43j4r8djsiq0i5s0bwr6xxngxdsp2qcxv8x0c9zkp7ablc3wm1a7m2ytwvkrs485dqslod823w8a5iphl44mq027lwxpl4nh2awvz0ys9ig',
                interfaceName: '45siizy0poxuithuvzkpnxumkrvycumkl7df2tnfscyxnuqbswnfkeuu6lzkpsjx969y4m06qjeazsr55j5dpkhvgf93c0dmwf4z5axbrxim2u0wys4lpopss9bnk6owmxn73l2cpr68es1si6uo2ygdy8ipln0r',
                interfaceNamespace: '47suv461g0159np3zzxyco3mbeg2a072ckkqled91ge60mbhonvkur84guauigvfrv7svu5fn62l6g2kv0c6gefpehk2lgayqzcbajt87moguhsxf9gqt6nc69bzkzz539tcl00qxqntr9am3y7wpwz0s9g9wmwf',
                iflowName: '45nynu33ihg1t4isq89wjc5d0gosbs0hvyhg4yvhatcbpsu5es8tnm425l8t4ogajo5dbrgj3ue2mtgzhtugiwotyaph1aj6ksl2xsz5bq3rc8xas29w2l7ga22apuuny27gikapzy2wrnixpbo7xw62u5d84ltt',
                responsibleUserAccount: 'rurhcn2u5sqqw1b5qq8j',
                lastChangeUserAccount: 'ulrzdba2omfhfd8o4hmy',
                lastChangedAt: '2020-11-04 14:06:52',
                folderPath: '4hvvxzhqizngp56us7erpsesb4ik0k6exhi6wheyfdpvwlnhfkbbmxnehdjx3yqoxucvi8gqzzewx2ntawqm8fjrck8qm9mrk8y1dt9vhqusgp0cl2rzvb3yxwn88c2pmckaf577vuwc8yzjz2abr4ydpvipbaz8v6od0l0r9a6deck2vs5vdlqpdwlfmff7eb6bx89wdeasnine09x9nmouq8jje1l53vq2xjne7o7xfty1gpf6tohisxh8qcj',
                description: 'nnq3n788uirgg2i7huxjo2bjljbsx5iceqlkp8jzezl2qo2lm29ix2hpz51h6uacg84s3fhdxrnkk4n90ox2tezh0l6nmrpy9fbctxwz7il7oadze87d2pzai86gjt3zj70c9lfxz9wnvbkksvrrgqmn3yxfgfhnig33z9wjjzfx7cpslvj7gomyqe6pri9c829mybi8clfd3fgotly9vyy3j6aqo9jq3il2thy6xsy5082c644m2h3j3bfmlyk',
                application: '277xyf8gnb1cioeqqvof9o13ya7dadj3jxsnms9np3p940tfh5jrcub0asa1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'j5pxnajrwdcae305awfkdhc5mrfiv0tz7bd92c6e',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: null,
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '87o12dm2qh564zw0htai',
                version: 'ijnks6kv2boj9i0eekyc',
                scenario: 'h73lbg0uzpnpelxl4gqjabx5x1ofxehtbz8ne06h5nzdbxkd80anlhbtmy5x',
                party: 'o4qy2bwwxgfge84it4jlahfzutrhycgq4lls5fujpzfii6aqblhq681g0d3hp374bsmkcxtgktxevmoeesf3n19brrbhbtdhpsxxpft6dhrp98erma5t06mvfcli4806brj92aw4hywiv2tolnqfbuh3v44cxpao',
                receiverParty: 'kop2z81uz2ne2c28ns9ngb0mb1r7abhm3e1ryb7gkcyi3eozo3gj1gxba7ech5op5toffclozu7jrmsgohblnmervbbr7dbo1mg9klhd6k007wzsji2k0wm7p9yfos2ll0k3y43t65v32qyfwfe3332rgl29anfd',
                component: 'sr077u8xhmy6t7pwv88cqcsj0brsxd9hxva3svw2sntl5r5myego37oyvqiok6imt5c377nus69quw3fthwgewfjko83xdf17s257jlhrl7k87q1ypv5zo7700h1tqso2y8jkkcdylzlw8g6frbwge04qviaarmu',
                receiverComponent: 'ge7kcfl6w4djuqh5o7j2b3gbilqa0jj9xbod8q6ye3yttg91iwnfmj4k21s3s9lnshaolcwj6b4cx4opt7pvlexc5k8ratztp876pvagcsvx8pozb16iwhqd7w64ky01rbjl1yfz1o3mrvkuqq8hely095t1a71k',
                interfaceName: '25lbxwmzfiti5izl537lsab7pibzbl95xtmclaz000j61b8gv7yv8b4s5j95ky8ro434b4lr6sre4k6iz2yij9njhps1ql8s8357yjuj0nlm9yzbad17p29scfrni80nrx0fd9tz5u00ah0r7vw8qqqrwgte1obd',
                interfaceNamespace: '4v0heca34u52u6cr7pdmv80dve7d4paiuqr095lsnc78vox6910kjjzqu9lc70w0ezf2eyf805q04j9ortlop8ch25esrn3ehvzzhnehy4kuqiitztmexoaafigrnyv425aoaz8ctz9v8j2kfmiwhuvf4lqmbeg0',
                iflowName: '058s4fviop8owjc71o0egvmjkatzpaajnujl9jtzxdl86onwgogxtfurtiimax4q2iy0owuqtfb0rsk9uvun76s7l274cmcaias7092masn8vddtkm963khat9kqvepj6yerttiodag0zegds0phkcraag02o8qs',
                responsibleUserAccount: 'hchvk2jhidr4lzu14zv5',
                lastChangeUserAccount: 'nqgtmowogqcix0k1qj4m',
                lastChangedAt: '2020-11-04 01:34:09',
                folderPath: 'qmlb2wp5re8bh924rrkkb087aebpq300nu3qqdw5vcrxgr7yyso40i16isistq1ggxnj0ekfqr5yobjpliguhkm79a0y6n0yc9tor1wyygw17ll81hhxj8p3b5sfxvdkdocydn6jrp26qs6e7hfgxng06dmgqkv3vyspqw3l25xydin567k1urrf56ld5jy6u1jr0qxapxcz6qbl6steulopgmovk5oj0y2f6idxn5r93blhdjh710z4qzmz38f',
                description: 'jp3pytd4gme1r9tyk16bn7r27f81espy6q21kardslveuvunclpvmsups1qvp049h9luxm9uywcuhszb3tyn1mu2pkyczkxiwkv3gk9olc8dyep2foena14us5pemyakycgfq0s0dgjkkaj0l5qjjko9hxorf3m8mva60di9fid4x2js9nfxnc95i1cgn3qxhq2p6zwoxj5bfwoc3n1bgqfb4fw8vj83fqqkrr9061cw8wxylwd8zddzrddyjiv',
                application: 'hsbwrkcpnjtw80vp6usiihyfj9adxkvv5wr44g29cc8f5otnmy0t7u1al8j0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'fvdfsy71qyvs9hwd1edo9ntd3ydbvb02bxhaqt7r',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'oh83r5m8rslg3z42sx2o',
                version: '2zenwvfryv7xoa9stk9n',
                scenario: '1y6kbfuhi2ifal6h1xl11w81diefqtw66ga9cpz2l0jdys9is92up4a6ntel',
                party: 'og22gjxbar4pvlmje4z5rtg5jx6tkxafl8pqrc23p7sm72vdbeig6h11agbvn4xvsw5xrjicgai8orn8r9sugrf7c21c58ol2bcz5pz8u3wh8mof99xg0nls1pncbkmt14ysrvdt13zyoakx7ltaa2o1l68j86jr',
                receiverParty: 'n8fmglrk1xknfg2b1yljl6opfp8va3emcfjeidh0faw8e28fdltyp5a149s11sbyjo67bw4cq6xpx63vzq74bmroqt00nvijibi66l8kgts36gvyqp6ptdqj0dezegzu3xvkifhl992zq0mmoybadtglpdpd8lsz',
                component: '6ems4bptqs256m37v4mq4istwav68aeej2itedzg5em857rluxbtv9a6vzypi9e9wss9968um2a6z2hhckkpu99hje0g81mj7cp32dey5kdxnjp4r9osu46d1s3vtxxw5iqkzsfs0gblndjauydfozbw7zkbmkhx',
                receiverComponent: '3t7njsz8eoegmdaf7r3rporxh7z9qi6aiw7vkoxlh19jojyo5pi9l74jnx7dxk3isn2rrmh2yvhldbrb9lu7f0dscb8nbrsuy7jlwq20uf4qpw4iaetguus7dtvjbuewyg4yq9cns0xed7y7dxflqkk1293qt9wn',
                interfaceName: '1ygtusq8827vej6qff7cjw2984zxvcn251jbugkt8x21wy01j4eer2x7vzwa8vlbkkefsj7as11onvqcfbk5qtmvkkmx5pvrfp761aw0x4a4fkvv4lq0rglff5xuqfpi6uxgvj2885laj81p1da2gzhq3mez3upi',
                interfaceNamespace: '4ebza2xg7gatp1dro3eizbge2gd3c2aqo9u82ikcyfkubk701z2ovkd43a8nm4g62pvx85gpa7f45kx6xd1leil1lq4ul3l6g4b8w80xaasqso4kq6621vwb725hsekrjrhdyfsab5s9mosnkvl4blxcfq095srh',
                iflowName: 'spyjgldj39quaw20q3c3j0f18ukcab70dse8b35re2eaxv3s4f1qafp0aghk6hef72a8qhzdiovowgfc1izrwm6blo4ar0xberl2j0jfpy6u0tg5ohgkstz6ty4ui1rk1hf8b2bvv82udoud76qu7ukb7sp3swwm',
                responsibleUserAccount: 'pcfl7ukmjm9crzu3yd46',
                lastChangeUserAccount: '54jiogtnu54x3nakap7t',
                lastChangedAt: '2020-11-04 01:29:35',
                folderPath: '7cjhlcqzbs5ws6ibpg7tzh86els2w6n480oaoyvmp0hbh826gxog9j5g9i3q742h1x2eyfakasooogl40uh0iuc8ts2kfklek1sy9zxf29gepksbh7jwcnbnszmu9ariolbzub7dmaydfi5zo5md3daa0yojzpvtvh30dutns2of9f8ka87upxjmsencivu7wpghb4fmtvpx957b73b8yqhlijhraeq4k8ksskji4dc0lyw1ub8jik5y6bv3te1',
                description: '5dspw0vtghqvblev1hjivtl7e0vk382ckpjpzk06f60brh8lnaobjaf5x6qrs08uapma55se3qoy7iost0a4nmcb2zfh3jus2nquq8pf4tpb0kxgj58xzakkrtzja49y66s0177eju09v3p5zazpqcmntlm8q61eadmrq4toab3c92vm9tgd7o1r4qu19qiccowzpgsi4epyeqie1678us87aj64celby99wqa85vrnr3dkhfjgo95jndjr874d',
                application: '3t7nbgxgp3lxe40jm6jbv50jp340amv48qrua5at8b56rce7kqbs5tbsipbl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'hsnyzyklwlny0trkckv5ipst72h4bno9r6eohwni',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'j8n1xgibewi9gwr15da9nhl4mknozd8q10pft2b0nwkait53au',
                systemId: null,
                systemName: 'z7rph49sb56zzp5w3bdl',
                version: 'z0e5nwoj4p7w6rqlmi9j',
                scenario: 'dd9rwiykoggqtsqk3lp310q06n4rjcgcn0cos7sb7vj2ffe9rsh8tjsu815w',
                party: '4ocn1wnk7lzbd5y2fuavix89c5fbzqt35tpcq5mr1osjp6i3uh3y22k8gx3fxf2mdg3zjpsxwmr6k8678vvsbnt2sdda8icbwci0atjymg4nmltdqev2vcq04do5nsd5cf1v24bdpka1co9z3wnpbhbu6j4lnvcx',
                receiverParty: 'hqx05pix059f5zd63n4luysws0gr3jcrj0ke6aysnwka3aoyb6jd3ifgzasr7jjq0czemv7vfaq3i9cfiiklpjppykpnhnwknrqkxpryy8jhh4ufvgwkrgk6utorbt62jcn7zxnyl1ox2exxpoy0gjzigf1899dp',
                component: '98smh71yne18kpcqogpk6p5or47r9qzuq50y883g5gzx3s8eroid258lc797hmm74yft1dl3dt3nla71isffjhjojdfefye1h118f59h3taz5if7g4x9ygurwigra6j2luwwxxx22eeq3xnjts8jx2ve2uccjr2x',
                receiverComponent: 'jtx3qrwse8uljqlhtsyoug373ntjb80vqsl7bvs198otutfo2dh59m0ecejbasv730dv2ovfdqwe1gzndehnyuehdhyt2rqhvre8aqk9phgn53b5keaxyiwysxrpi86zplruym46kan424ghe79hlhjj45thn1zt',
                interfaceName: 'hpvxq4ucc2g8pmqupft6ur53bygiixfkwgbj9fsd33x64ico00fe0lykbon83ftg42bvwe65q0s95u0ndvll3whxu8vmx897knmro6ynumqlz2icumclsounbg5ln24tpls4de7jhibu1dkyccwxrop1f2tr9eln',
                interfaceNamespace: 'u173bvqjk1pu1ftzxazu8cnqepn56q70supksfqk9f0bf4dijulkjxvmsshr2n1vath07kbka25uiw165oec8z34wkeu6twnynjpoaowk1ltdo971edefasda1gllldjpp7sl3t6no41unf6cnwg5fkkof2ajq17',
                iflowName: 'oxwdl03x9siaeyl7nrpvtsfu5n5cgqqboh3t07z386e9tyhhzjsjqgxkhhj0lbsamg3hhu09z7ydnharmdg31zddco44c8giy3jjv8dx066f63rjf9xqvhokhzrc4wi4asrm0ict9cxm2moxpjgz0n6866g1658s',
                responsibleUserAccount: 'ogxl3o3yntvc6o3euix8',
                lastChangeUserAccount: 'h0fl9e2mpl5s5ru1twfy',
                lastChangedAt: '2020-11-04 01:29:49',
                folderPath: 'omj7edfxrxtguawylo3iuhwdspeoc8lrc98e4vpv1qp6jyrwcgisyxsstfgim8uhobabiund72plxkb83f4m1jxxaki18eu3hfclqzq3yw8kadntgb0iqto02t4hyrctunlsd1e8zr21nm8f9w1puyaeju1gr8l5jjee1n863fyc4u57xh20jcemr4ngl1p34skf1tmcavzmni078seh7xjo3kgm8p2ujce2gy628zxqxwk4vkng22ofqh9jsck',
                description: 'n1v46v66vd0ynffd71omf6tmj9b1pnv7pyw6w75eu2m358mm3anqe50yx4izve6mqn51a0v1w5dpl9vq1jrkshq0668sfwtjto4icfwmfcjhmzlt5tyf19kyzyhnbzflii1ukf7nud254p346dv7l4ua6s32po6m8jy0gssqnej62gak2fpb42vo3z5kya6qulqdi6e9aooo7ovnbmuf80ln8o3kik7xhbqotbtw9vfrtj2j79aqxwa62n0r5x6',
                application: '39t1ci23phgx1a3dxi70hrs83qgqooocislhdb7exs4q35rl39x0jh3mnqtj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'uto2ylf5fnixasab22gmter689fw4jiaz3yft2gq',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'jq8pqvdw0mpj3fvq3zo9ub1htdclc13yx8utxuko9oycm7uu1s',
                
                systemName: 'kg9h2pb9b6e6zr5ocky2',
                version: 'dfoq5sntud0hke2qng8i',
                scenario: '67os7jdip6gktuln07ui1rp6zbb8pba3w8w462tg4lvpyuyajz6nvtyc8hv3',
                party: 'sqvpkbzqdz11q4mebxdpup12ocphwrchw4l191ttav0a3hrt6yv74qi263b9pb5bvizqqobhwxh2ig5ie1njzgbtf8itje4y6w8uzfy6qjnm0yhcbmdcn10c958c5t4hnqcwjtxc2208zwkebykxjcdwl0d87i5a',
                receiverParty: 'u76l50yqq1nn3v8z47zc7mys86kkinsn3drsdza9t57u7h1dm0wmqtbdsiymhj2xobzlfcj2eacr18soe0lv07yhk9i96n2zbq1jgru3e33i5e56saedk6getyyp4knbc1qq9ap9dwpciy57t6fqqqwkfsa1g1hw',
                component: 'n958s74mxm154q29tayoad7y3eennp1mwauszubbfjpk31nmiw5a53g4qff8rx34ysc15vnfp53s2vri3in2l56jjns72ucnvy2wqilnnouixrg3keyajsfjj6rsoc6o09gcfrmb33mnxf3ah2p6w1eoe67ydewj',
                receiverComponent: '758xexvgjs2b4r6czlwypxon5xun4sctyrwu141rmz27wo962frx5q6qcujnfn26ql2j1sn1azm35oxiystqlm8wzc1jaiah2wiq31vnk5llssipwjcq8o0dsgdakl2x1bjm5zkfcikujlqg2u0o01dqjv6raoos',
                interfaceName: '8yqsn5s9mz6mlstbdyil92ni3opi89n49my8mdajk8tphp9n7xb9yyb1ect1wwjtl7idgz29kt2rh9c1maanvumj1mn3l0ch68y0pv0ym0rhrmhd0skj8sokvoaf5p5hox0l8upvtbzgeszsz5swrljd23wvkpak',
                interfaceNamespace: '2xlw9vhqgm4hbn69dqpgywxqga2ayols9fnhynjisxomwq2ivnmobploh6dow3ys89u9uiykat96j90rl8xg76nzjpa1ztuomms0nrdutmae2atst4o5qwuus8gwwl0077361emd1ntcpfzaq8feq6ezz3awur8m',
                iflowName: 'lmf3h2hk3ne25q0zt9dmbso85xufgqa8l3im9ishb0iggjo2xbkakbf2iqvyhppwtp8grmm6odsw1c2ue9ee95oy6kr8kd1h1fprhtjfrysdr713xdps1wkzrtn01713tcgwcfsn2qt7gp5yxvpchjmpuksajpv1',
                responsibleUserAccount: '4ogi86ck8jbnvvqrs5be',
                lastChangeUserAccount: 'm3qgwl9qmlwadejqezv5',
                lastChangedAt: '2020-11-04 01:11:11',
                folderPath: '87n1y4ieqc8idf7uewze46u6rtrzavzgkweuclyf8lzoqmeuueudjwqyl80ncrhfpehbuhpogpso8ttsbqr90la1n1cb1xdo5oatywvj51ywe4j2nm39udikmpsoszz1n3ou0mnjmhbqmislvuco5uhfxb150axit7e6rj68xjtifusod22r1exo6xlcb7c9hvchkqhljg5gv3sovbc123pfqcp4b5m9eqi41y8oy9cbdfrpstenvxkdwwvi65y',
                description: 'xx8iyg3zp5qczc77nc9l4qp5sh17eo2ebezsfgh3e6j38o46097em2p26stgpefio7kce9dlz84keirvkohja0vkrrujd6inp0rjjmvo1gie4wmmqzkj5p77rvlsr914oxcbpqrks73auakxiglxjtjkwqbpynw38hol08mjl5wigzsya3fkhy0hqb3ci1w9iegkq9b0z5n7eyi5z66c8z522sq7secr49xa4aknn3ik2h823g5quuixtg0squu',
                application: '7684n4si2j3bc91r64ptfq9qmq9taz69nxbvyzd108s6w80dhxcp0jggmxqt',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '0ilx7se7xe3115it7xade2harvcjp9tpmpd4io9r',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '72msba4hgrfxd6u3dwsn79qx70fcan698s7p9kpjdz4roa3ebx',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: null,
                version: 'ta6o9o4f039spk1bqf19',
                scenario: '0xca4q3um0jjctcoqd1u9ez4y8h0y7i68v2zlhwxoi1gq8xm5niybnfh36ai',
                party: 'msd1ffbp8sc0g6cdxc2g324rnc6kxkhwflqcrjvtm3sl04oqurdt8tylkkgxx6tejr25do9jqa8w7utjf0itg45mwjurmmgiznkge2qnxudxtd108dczich6sl99zidb07rl8934fg09k5wj69z4qncvxs7n4utt',
                receiverParty: '9vtri2sx2ia95sjwp5px0toqwx9rwbdxvkllm8g75tog23blesajrlg1sdk4r79yvql1n8wfr5m53c49b4ar6a6rf1404iun9rppwcp9ehl7mwd11g6earkmje6gmezwgxbibdphtt1apdd06tc2vzplaph7rixl',
                component: 'kvhtgaffjh4t7o34bomixph3unrpbje6w03c00vovuedwumexqvoxxvyn2t74mr9hk5bpcz4kon6tid9knwtmnra3dxc6rclkel2wkj3f4j1i0eow8155dk8s3hayv2oakhfnqf20jsc4ny1gz0ilu9fyt8g5j3a',
                receiverComponent: 'lp85p1hu9axfvghtmyqqgdxd0e7osqmxqlll9as7m5cpqzmnv36w4cudoc99dt199mn7f5b0pkwlt320ot6ar0sfkdrwe8d5n6n73qqp5lg9qkbwycpesn7k9d6c6m03nh0pe9koo5k8tf0aol26n3b85u4s6nro',
                interfaceName: 'fmfhyk80sp3xpl6tsl4dcm9ak2vw6z1yaufah0mm5lcsq7dp0gzangg7xhyapgoxc8mr2s5oflyssy2cgsvkyiw2tirsjnrr0c8sivdi0fcg1bpd76l2nh7vtuutjw1nmov8ylgrggq0p5klts9pulf9pk6sj4xa',
                interfaceNamespace: 'buicxwrmb73wv6baak2gvs00sqyssbq8u2cu0ebfzlclmh661yn2nipqil3c5flp4b6p3ugq4v6nnnqwojl3qpn7mwyu6zwqrcc5yisl3ps0lrr235q2uboeb3y2miin2ie7msz5krfrga906gxlkpekahy6wufi',
                iflowName: 'y0r28kh995z3v59s2xhhom6686ytekx8yd105pag2bj1s3pmfpvpt798of7r6angusq4o5o46jicr8e8vjwks1ujodwmcgsoxlldi3b03txrcme8095t904bee3ztzt8hcx5vfxfmviqdzin0pqee9b4yy8ax5nb',
                responsibleUserAccount: 'sr679tkylbmze45libei',
                lastChangeUserAccount: 'nklkawzpyj46b83nhlho',
                lastChangedAt: '2020-11-04 09:10:03',
                folderPath: 'j8w0rcvy8sdbfgiz6d9zswoj8vlmsw2lr5w50v2qb0l69m7uibg5iu2t36pmss4g2vlxczeh87ek5y1l958zlh7e5tmonyqyos8mrxb0ext7v49twr9izro6lhe4r2669mno5vfdmusw4mp9wy2yeni02myqc5j16lgxoztr8w3t8gjqhwhjppmyxmp692ib402oht442dtujk7ig34ut8t7pb2fla8b2yg4175mhmnce5hfufalnywu8ngjod5',
                description: '9ir9298sqovv7tk53gm42cwudqzt8cqzrmtis6jumn40vkvmgf8792zg6kknlv3iiwvmn5owo0swz25p50zsp3b25sazfx5yisxm1d697i2rolbd83mh78cojgv6tqodd6jaizwdgxxugbprw3116x7dcfv40v53powra7ibgz4xl3r6s54wbj67ec0ltwke9atf5u28q82evpt3gk494td63z6qhnzzzgigyvs5wt5zzo5fbagbnjhls5uftaa',
                application: 'o345h1t9huhgtassydri409rk1axy5bngu8ghn0le4qfdt2erkv479y5f8wp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '1ilzpczineomxt99fcblfcnokk19sxfkm8tiqqo5',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'yrxf4zlq83m1b92uep32h8tt71ishimsmpi2rhc6imr00r89o9',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                
                version: 'qdcwiaa97crf4t7iu4o9',
                scenario: 'bla2zc1p99tf1baq6enyxo7l2yzl6vdklqrmwgxrco4x9u8bdu7nhpcps8t0',
                party: 'tcly2vza0bvidl12a6pjkj91c6kt9wecnr3t3slh6mdmq4ir3cdyp693n25us4b11cl1whuunc7fe6uy2q38m11v8fyj3ylhslcnkjuiznbqaz19bmv6grau2r0mppgs9r0ils73w9bkua4wt3vq9hblsd0g264h',
                receiverParty: '9nyy1aizc2piuvis0johlem333jpz0ag7ujhok22zv06nvqkgcs2o26d2kuy4l40t2o3lnfnhy3ncdgvxql91iu9qcwypzd574069szcv92los9xyfiiaykdrjwu8k29ddij8tbgmmxuubauikdk8x78gtbhzeli',
                component: '2n8dc0eyqrhhqjdh6r4t000u26hqm15of3jruqu9ga8htzmxbuv55b8k70w577c603mptbzbro1umgkduua2qd6htabfcfs4ojsgstjc2de8090lj28jcz8okl0r48gqbl2ngfdbp6q9h6l6vl13s4qc5tk3l2pd',
                receiverComponent: 'k97skpo8ldzad0dxf3nl7v7p4mxlmgrrp2dc1polkv8jqic1wgl3cqee0jzotuhiyvsvqcx4vejxf5e36e746ut9fy85uwqf96bwcbjjxv14h85c85ldpuejia8qaru9fht6768o53pev4o3bx5qisg460mo1xd2',
                interfaceName: 'euq91h02awg2wdraj0vkdmxvf0oyd34xdh7vi76f8bytpcbwgccup0iynrumduno0b3jd8thkhxiazgowx2sdzowsb3j6q5tcv6n4logm1mhgmryd1cyb5rtnlayaexnq8z7c8wi2arnsk7gvd2yau2i511kly0r',
                interfaceNamespace: '6inkb4focn22pnw5qhy7zne76f3bz3wq2tjk74re3u4sj6rn1mlmh83db5j9k0hek65liazre21xt6p5yza7uv9vp0llnawpctm44jcuprh3619te1ea29r4dp54jao51vdaoxc42tfmff1qnx56w0a7f7frbeiw',
                iflowName: 'aitwlm1m5vmfww6541sk5ijd888cif3kxxz8y3z58ikiey4ir5tq7x1kqcc0q5jb54c4npmj1nj9a9df4duzw6vm4jkcmshjg48wrhq01frxcw2lqqt3hfqxb6zul07wlsnw5fx5dd4j1ypeexw6qk3avjnahzdk',
                responsibleUserAccount: '5o2hk9q3md7klwqj4v5x',
                lastChangeUserAccount: 'pjvusnc35ea3xzd2fgww',
                lastChangedAt: '2020-11-04 04:15:07',
                folderPath: '4t4cquzrdsaoiktjvkhy4tbr52q70argqae6pg61fhu6gdnca3htwhq8fkftp6rlkvasd2s9q3msjqm1y7pt1dni35gjwapu1q4d0f74kt0y9kllvlnmea9tbr7jmx0htptiu7akjcq6pai2trh4hjxbt7lv05mdk9b2e05gy09rzs46r9cw2a2euayf2q14w7ahto27areolltro7l6go43e5j7iynq3f8v5tzuqqeakuqh67dc55mnvhokuef',
                description: 'nhqcizncmv5yid1yfhwik2egeiueyln801xm9od6o5cvm52rf8610chrg4r4f6pu6ke35vr3selzuiihion81rel8zylo2oda558iesypwgaza841g4vwaej2gxu2vtvirie6zbdro8t4xvofmmp28vsvlkr43zgg48zs50i1dlvsr0gcwo0om3es4qu9vr4d95n1kjai0vp4yzo5yniaqoqlwo9yrudb54ga2hvj5zgzs03ohwtpxwakh0jutl',
                application: 'kydjbzxl8z6vy20yvd2awau8reqmshj0f3i661wou4ux5615xpn2om9jnl4b',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'q6qxt1q2274agno98kz18os6lsiq07wodilz3h22',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'gvddhes93054yewl8ii5n2m64vniatimdgydb07xp1c8ur0vmi',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'd4stk9wltox12e9d5a8f',
                version: null,
                scenario: 'j2qb7sdmmq6g32w5ouhdbkpqis1gtki2omjj6r3vwpvj0liej286ykwd842x',
                party: 'cnyfr1umynwebf9v6vd8lw40dcoo57lwkfsud1jl0gb7nbfecwu0jyxuijv2elkqa9dbnkavx1kx0fgv4y09y9u0rqtdmdxrgtgka2970c7kfvolgia9ocn9puwsmu6anvrjj1tdnud8x36vy2zsil2ff169q0z4',
                receiverParty: 'ouglwgj6m5amh78k01nkorpxgqdektsjfd63q0gm27d1sjrwsi6j8dvaun1g9dt9h7p7jsmawmb1cinfmh5qwnb5r1p12sh5edkfq61xqvnedbhg6ywko9uwt2biryp4jc9k3fbwsjwf0ars0taaee4eyug3132z',
                component: 'lc3imd88sfjxzfsnus7yvg3ctqf33vc3tar5jo9egy15guyempp4h44odn0s88c7eyegwkpraugnchp3ai8bfy80jjsbay7axe2v137h3gtpsvo9gmtd5ek6h48wj27e429s3sh1pc60qfu162b6wjeah7qnp6nj',
                receiverComponent: 'rkr4c6kdcsji2x2r9gqrsn67z42lwbrfd7z7p0yvzlauuzpi3j7xi57rnb2ueo0ewmt4n74c0h0qghfqxudge61we2u7nvfm8bz76s0gjl8n0apxs8dk6r06m74eo5l0eorzc182tihpeavsgppf7o506f1wzbi0',
                interfaceName: 'kijxp3ms6b4c6r9s1zskhcl4huln7nzqzrfnw504spgwdtq1n8iwwjprmb26wvbhjc4z4s7lz7m0rj0ja3z17iazi6o3syfrk2v9o22lsdktg6zdxjotq58640wlj3bm8tcok2qi607vio3qh4jt503y9tuhmuqg',
                interfaceNamespace: 'xe42kbzt3f1edejjkeqglzwxoy0gd923zrxvx7rwt9wz493b9e01ldaiv3m7xt3xko262q245out3nhnogixo9o8e6w3d7nsyjlxsuxdakuj3yei46oxusgizknihf5zhj6picw5h9orzyo90d2pgkmt72b9ru6r',
                iflowName: '3eto7m7w6opidwgeg6ggxe16fodnqtkdj9me66oe77d7jy0h0582motyod2ksr83e9tux38gwlw0qo03easjbgtvi5xts25h62h345k8mqg29zy0t141eu5oduq16nokiq8amtdu5gs465xmfw5orgcvcgpc62s0',
                responsibleUserAccount: '3wu2tetaajhnjbbjcbbi',
                lastChangeUserAccount: 'qtrg2pa2a8vpnmh29ilv',
                lastChangedAt: '2020-11-04 16:03:07',
                folderPath: 'h661flxo33y5lyutjsog9nnvcrcx8gs4un2d9mt0kfvigj8gbynfsj2hwyztcd3eqo1tzri17w5ga3d4sc1wvn2ofvviyvwf1h86xyrdl39rwz8rfwhg0wjgf609hlsmzb7nc6ts7egol7orlewhghmd0dblxzbaznm2dkpkgwceusb2vbkdl1d75tifnp9e799846m0d4p38f0y3vqncthssd97ws7agp3vfm5m6ea1xnz65htzonscr3nqlt2',
                description: 'uzy972oiguyngj05kql50xf6bkqdrljkkrnfrnv04mvranzn3ee9p0bmkh1dmujgy79vm4i7s78aoyj77ot6o3fdo630rcg6qa7qx450dq66nktzseugbacmvdvcctptfwn58g7f95xghsxrlokthlr9l4cmx58jovycvjhu5aqsin4ngju5jfc3ffwb41m6umwrtdbz6b7xs49dz9w3i65wew86doxecacs3izguepq6sf16aiuhokdg6ikbhw',
                application: 'arihcgn8p0f259duwnzx0ohk2uazs9p8rkvta1fjqe8n4xephp4chp8vrhg0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'ageq8xquunt18786dvu8s9hyl7y8vjfs8gk7cwt9',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'lw09kggq431ctxfj869y5wknvi7ae7vd1ry1k0swmywr9jce41',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'e08wckyqvyv8l6ogbhq7',
                
                scenario: 'iaff44xceocsqxlbpmsgy0dc817wfwug9momhb2s4661v3pt7abe7vccmlhu',
                party: 'n7qu9b2g3a80l10yt295uluqs8vit8tyvbq71scgquhkn301ha3ub1z4k17gbcitdyym52aecfe469mw8pw9ba1xvh1z33qtkchv4pswwwulvh6z3dxgefno233pre6l7l8rnactsdyk6g4y5i4fopn8k646mm10',
                receiverParty: 'bbfyan8v9d8eigilre14emjomdg1a54kybmv40tsmqdws7k95nvf7ksbmvtofsnpuokiq8h6rfl8czyis14iapiam8smvjnxbauqytpji0dmy3fi8zfoi9s5cnkjsyalvlx4wfyf9nxm3qlffq542cj3vxvh0blg',
                component: 'nbsz6ky2877um7aujcuz132ejaz0a3uvkpfwi54ranfonvufm46yws2ux1u5339jo6lotdtwx9tbtk4bf5dqvh79qblh0s8qgw8w4akpjfrtchf4m8co5r3l23yhh04ge40xb39lqttk5oq6z5fjrq3avle53r45',
                receiverComponent: '0m0zl2v94tnpcq5i9bgru4odliikgrjp2olmnconho9yo098dgd71o42nvvgi55vo0nn2sf8nlxrmypfdp73h6j65td0dmp03mkknyiztgueabv3hapwgbt7kaxewn8s95bb26vkcw25qbe2qo0ykpin4zj2xsf7',
                interfaceName: '3nqmhcizd3jkjrhz4mxi11e56wuopmm2gjfjlpbft40c86gowgoo46qen27sfm77z8rcyxc8xupfpfu4z4ykh2tjtjaf68qc2lu2d77dtguqhp8id605p2uix55xxezy96vuke53uiuseas2l6l5qh8qmx3xsrw2',
                interfaceNamespace: 'rdp61qdfhggbjm4qbshrvhy6nnbxad64pvzhlkot86l6whr43p4q5a87iv2xcaffz47j165a6ie1ck77ccsusm724prqhw8k9c4x4g6mdnqnjufucfkslnk1d673bc95no82nyaiywxj61l7fjojc741eh6zvt1b',
                iflowName: 'egngd0xob5dqnj7002jwo7kr8egj3lmlxidd7dm0utvj82eqck6gbomgq3vl09qa4pn0obi5pzogza39s021kn4b1ph82lrlmefc87t1n6xdglrfetug2cwqwnjglnvpezwpxyx18nv0c770fqvjsbjj3x3v0d70',
                responsibleUserAccount: '9gwiy7pgfy37k8656hwc',
                lastChangeUserAccount: 'wpdmfzamay2k8unf3ymm',
                lastChangedAt: '2020-11-04 16:09:45',
                folderPath: 'zy40yo1eizfj6a3cuygicw0zbiy4dtmxwayj8hd8l7n2qx8s35bscjmfrwgk07h89im7o6834de3l86hbtyt5kdc12fzh0u03w6pwbsv02kjdl4fj2pdkhf9x24xh7qabpq8k83nlrteljw84ohdatzcy8g9dasu540rjm9i0bjojsqf0r33hdhwugt83mtrqeq0wessd40olxc7dlzuxuud42xgck1ultc8m2avp1x7gskmt0uxhky4mvul0ll',
                description: 'd4brr0z6hpaq4d0183zkpetrk1uy57prpc1zprfjvaodwep9okut59tcv9vhpdz203a2tdoe7yhhfhiv55ky78zfvna6nofh0op1ghp1u5z0m8x4urgypywkoi68n3jzwtezu9fnxnsbql5ksj5bb71i541k6w75uh00dzvq7dzvyk7qro4gw17c2y23yvrtbtxt471gzfrvhdq5lqcwcctwc8veqti34ebfym9im7ko4tjtzc5xenup3n89jsa',
                application: 'v5dm3gi51d99xriek92bnq4kob8ulnb62gvtebfsv5ydllve1j05tz16cqiz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'psvvdldoai57ddvo0azzw1lnd0hprebgd7qdts93',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'icxlnjici0ia1l92qf36cdt14xoc0dkmih5dz00av3pzlzllvz',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'yqntvm012z5hyoyew3x9',
                version: '4ja61g8s44pmpe9ox7ux',
                scenario: 'l3isjvvy1k01srtacjyou24xa87xotsanez1kq9u297utz9fi67c6ge563og',
                party: 'zle4ovhryol7ysngy42wgjyxqlgih0tcwistzf68vx81eh5hfae8pudhig8miwpao3mu44762bvfcbokkz4rve12pwp4vs53wqqn2kdietd0pclf0pfnic5di6ulcjyao0ut0k64peqqj6rf8gvw04v0h1hh1t14',
                receiverParty: 'i14qjfa5hzh7o1x4ga3tcaa70strckyvc2q3ignya97qdbsd0h4pa3anxnm3vm444uu8jn80tq15sq39hceuod8pixinx3vkhs8fvvr6qr3qv1giwl90ev77b0mfiitaqvp51fhzmrsrqv3etxfxxrlctdbzcrb4',
                component: null,
                receiverComponent: 'iiyfuc89ik9tp0vmp4h7x010sowaxhk6h84tz8vx6kgs88yvimlzv49o6i0kpg3gewkfdcy9x0jb89njap2irls9ts0h0lkg29axnx5dgmsxrx6lxypacln6no2d418gkx29hglzhi5ek4akyaqzgwzrvrmg90a0',
                interfaceName: 'by7h3o04o9d53iuapxfpyavgjx0cwmjlzh0nk1gbkmwu5b0zc29pjv9a4hbyi8p750yugp5sf1on8t22bymm4bzgem5ureg9ljyc3mzwxgpz5fop9y50pwpgmi9ip595y2f2b7cc83cs1f0aob5vlm4tax0fduaw',
                interfaceNamespace: 'jwb854xjxxbd78xb460qfjbx13x8nsa7wu9liorfab53lhpt5tk1halrqc4kba0lghm26u6ngn9wzt9uhr8xwxd0abzifd1nhnmjeetvpn89l79gg84aztssjpjhs7ounedriio5wm2v57nelqahpq7gumaakuit',
                iflowName: '8s872hqyll4kwuvc1dl6iltzmpx8mwm77x4aqa6bkte4jfm0ekw6abe7qlt135q5sjp1chp72wp3ud1a2d4kvnmkaq8acossylmxw3psao48zkngomcvncorrbfyl707ziqb87w23jnojb5cz57nba0r5el6znyd',
                responsibleUserAccount: '4znj6qq3xhv60uv6v2jc',
                lastChangeUserAccount: 'p0umqk0d9tas86ia9so5',
                lastChangedAt: '2020-11-04 11:54:13',
                folderPath: 'tlkhj2l8wv4iwr8whbmo3rfy0welevzc1c0uslb847xlzzlemyuyktjrbvo7xl25bg9hly1xjyeyl34nhovilrsql4mn1zldx1nuglfm76hfvftw1evmeowzkpuzbweouq7fibjs1fc9nwv1cpjzrofe2tfa5i3gg00erxgccz22m9ax7lqdmsnnzs45gsjs818l6kk0tmqp9uy15706kihtgnvbeez5kfde27dtgnr58ocfhrxi1frg5lvmu6v',
                description: '3e83ih4n8yy66ve4pmwo5hjdkvxsac89nke3hlsi2sjhvsb0u4mpuk0mr7jsdgj1rwr0q4i56693ykkbmwxbufk8qxs996ulc37xwp9uc6srlkex3maxmtts8ex55phk50lyqsw1juw8dmx9zy1ba8xwlg71rs1dh1plkq9ar8z9nnazoqowgvypyojz332y1ie94v7uikxo181dphsphlzzbs9v6fci8q633jel6zq6zqk6deb2bg9bpbtowrc',
                application: 'qj2j986r18iiilq4c042dgefu6ku8uxe6uy48a0njlze9yv97ocztyhi765t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'hzq17vg69oi2s0kduygy4srv56g5zve7dyxjrx8y',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '6aqlw6b68jzgwg6knmymidn1ufhchm623nrz0u196chxkx7cwu',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '78i405iqglku1g0yrakr',
                version: 'p3dkne19dx4jf3397tl7',
                scenario: 'ydx7pq0tyf8q33drnb1uxm9ymskczi344eqe24pfh1zwz5346h6n3hci596y',
                party: 'v6ecgn0wxdfipoqc8ki2s3ngckb05lyhca470o5ii6jsugu0u5tp0d3hati5assy27pjaky98nv5y4tbt2dq2mxrxa9euwm5vqz3l6lnxpjvawyliozqw88ox2xhbjdtmkln8whbcml0ep4c8nvi0gmhn2jievy2',
                receiverParty: 'hp80hnvmu5f9w15x8e4ibwayctuu8wclwb7b34zwy8s11soz029t72y58afzbgkny2k5rqktxesmqjg3twm2qtq7muxbndoycq3vv3qffnzi0wzfesk5dxyreermjnez06xt4b3eubaajfi6sfkmlp36l9lwqc9q',
                
                receiverComponent: '1ou171zprvrr33ceika7muft6o0rn2tb42y799lms8wnvf5weo58kdg3e4jybo9c2udzd1wa1t28xcdshwlp10r20r2r2p175my53pb9ad3bdftt61po6etzkghcnz3m6muv6keix2n1muoewb1dcblneep8p5oq',
                interfaceName: 'dkf0uh3syndofr9n07f07pq5cg3cahqx6gqm85uwzob2rvqlpixryutu0497ng5fb0uxgkif2yxbinm2v4kry6m3wy8ftqo4xi2lo15f61ya1izogzw5vqwr78hb7x6u109r968e107pm94qnxgzl3rd8zdg8ak3',
                interfaceNamespace: '2vgj6912hi7tpjpxpotv295pctxyqsu3m3ddq7scnto3qs11puo8es5gi9tnv861cj3scyxdyvqwalfvbcp300hgbul9coezthg6uuhndlxhxnhhtd4035ve3az1bj129ufrcvzn8ar0fcvucojpnfna1vbqt4kx',
                iflowName: '5bk9b4x2g5rrmpmkxhc4pe516y8j8gpxbj244jindh1jff9083n4b6ude7badwsv8p4hf7rt3pnfvk931cgsdhtuiw21subsn4ii0gorxn1i0dyn5v12m0sj81vfaj183og42xwslpldhrq8a49420lvnbab5i3u',
                responsibleUserAccount: 'ovypavfw812ny5bf4s76',
                lastChangeUserAccount: '71rlvuorpjde3mqfhkr2',
                lastChangedAt: '2020-11-04 11:27:41',
                folderPath: 'sfle6b8dvx0w0g4qzk084rga2yaagsnl9s897q9hlta5l6g4wh33eahxy9hr7sanba12s2ya2c2r4x0qct0s6re5jgkrwzlwwd5xfgrmyz37mfhg10a7xj0fdd3kay4r53cjfvlfjwzm82u4l4hi1n2rioush4f1795rgocrhn1vdi3oowuzufbvotyvl24hsnb0v5lsdyt2njvfgfupqu0u6vglgekxdz9zm0vk9u654x2g9t38brrjihabvzk',
                description: '0vxjsayz6su0kemkj1t4ozo3coyuf174xvi18r6y0ei9mlk4nfc26sq74neyigbnme9wsytvbe6m2g8ifn5b8j22bt8jis4j5v5ncdus63lkoibl9de8pbp0tfs7qk0u2m56hjfa4m4pxb4h4vus4dk97f2mssalr4hslnb6vvz4ytev0vbvpme7kttcwa3zgrzqm9xcmm5b0zunh3b3myxfdzsfqe9nvjjw1dnxbvo1lqi95q2x3sxp2p13kb7',
                application: 'lqk0scq7u5g14bqtr1axqidnrp4vuebblt5owhdpci381zpq8opmoz5uc4yw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'v2q405z2ffthtbfs9ci5phu8m4fkpja9on9io261',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'eiqcfhv7vzlmafzpgrnx5yoi87629zyk35tmg3q5ksvswy53w8',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'h9n2muvz61o10van00gm',
                version: 'c05n4xcqaz4kaee2umxz',
                scenario: 'akqhk1k4iwvuowls3apk0ynu3jbn0owa12s6y1b424oxko9o8zovnm5eh6gy',
                party: '8ferqa0ii18sg0m4uvbu9nqer69i2l9gqscvlm0757aoyq2qw3mmcjj46ydzjzkf2ccs9uq6gavfw03igpspixf6zkzu0hrc80gijfvp9e3e6wehkz59b0n1q5d9rn2ubgyqqmzadz5nnjq1bhjtln24p5u9v5is',
                receiverParty: 'eaq71sd7y4rvowgz69yuhi5a016c43ipikrjjemx2yxg40k2lcij0d3vm3r3eh0nu85s2pmhupnb78yp8fsgnam9673vrnj3shtfiyh52bjttrxgh26clh1pttg581jjgqjpix48ezslk4r59271mmrpz5xfntb2',
                component: 'zgh1y2evm1ldxmddvkw61wa2w98438bmyr58xccxgvqjxdgbwtpc2rreju4615g7sy5fhr1tfarwovspz9kjjrhukl6wxax0jlnji8m2zyl9jq3usfyyj7q5nxl04lapljj19lt8fv5dk3wo1kbu8o2bk9s1mjon',
                receiverComponent: 'i71vhbpmjeq4tcawdt0lp3sh0pegbia9z5ys3idsf3murd0yzr5xilhgpmc1byahugiohjbbowt07q991r2m7kne210p0ybu66iw7ulxixq2cyuumrjx5s5mhjvnpmmga9ils69wviehpfns3bbaqeguy90rbkjg',
                interfaceName: null,
                interfaceNamespace: 'rztb6edy190net11desk1m6j9aj5vn79t8zrjgbbpjvbsu50s3p7ftk26gv1edcs36c6lgxqmjtrwumkrl7iads4uod3ztll1r1hp965ylpynownpgzoq8cb1bzafoarxoygw8ot49eu66u5ohoglftsvprpxgag',
                iflowName: 'jw71x8teovpw5r1d78ywpeig6rmvmlssadz30cmbvkmt0gmcvh8nbipkfx6iyme1slumwpyhu4qgt1pqhx8ef2csfz4yn5qrugv8pbwg1gjvsg0a6e47ry6lcm755xzof06dgy0c6xxmk502noqr0eygfvubvnit',
                responsibleUserAccount: 'hdbkkdee5zzyh3gws3up',
                lastChangeUserAccount: '62exza31dzvhc4aui4dd',
                lastChangedAt: '2020-11-03 23:19:12',
                folderPath: 'tyobfjgcxn5g48qk5kwyqts1fgjkyepxoug9lj2hyts2yc7d1uh990e8cz36rcvcoxt0hl0v3wanhwn3vvpcsjkt0ojpnner9ys04oo014w9nxswvt103ftodkrqw81aii29xcq9onulsnlfp2vbskxiufqrw3s2ik3axlaosazqjkozftktnvky02xhknpy26ez54qyafm4acw8r9qhl50kpilcf2pifxlilqgitp3tf4561d2stkev05irjei',
                description: '4y3r3tbxva9yxy18e9bju6lx6icfed3w3pe803jpnrrm0t57vees5epgacwwivswdpqnumg91q7qv5l3zbn4twyfrnzniuvx2co4r5yn6bban4swnhqtge2p8t7dd172guhar9zknwj6afe4yu18gesxavrutv9htxlbi9lxvcj042lkmirq81bzr4cxsu5gz02otaufwgj3hbkmqowj8w511a0wsh6a2jz1ge38r8bn2itl1oasrump07bttia',
                application: 'f8ragviifljbwxdi9rhcbfn5kte1vjec1f1spjsjoumlmhbzqikhck3o1pzw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'yt8fu855zdbfs1mo2otozjrs62rwq84elmeqd7o0',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'xa1d86fufjafix0foj45mcjlx1ve839dfqk9epm4gcmfln7xkq',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '1feounhu4tgmcmxi7rou',
                version: '8mpng0ecfhyj0s7x83nf',
                scenario: 'nceccek12iauutyd5rhc4d2uxo7uidc475r1ogxw2ctht9ma858mxgmk7wwn',
                party: 'a72lozvekwxaw3mzrvhk62x41a1ijcn7w9mdzqq49jcw2k78jm0sx3b0e8zqxpwu42cj6mbxzf24yi75bh0f9nsqc64avrenug1s886ed39r9phrac4tfbds19bwt9j006h0ilewjy01ny2pjqree357j7yana34',
                receiverParty: 'gioi8o5cefobsgwc9gi2ls9mnccm8971ibntors62kutq7iovhll356ttx21erriyvtb6drzv1ycmnvx9tkwwset6hvu4zmvnd7kofort94murvp8mti8s4xgxxsh4wr8qz1xts2yt6nu6160d5e19ojaw8vc5ws',
                component: 'kez474u818tpd5i6zgvhr5k81cbx21tylxcep5eychemwf30bbizwdxu1pagkpmbz1onznsjdc9bptgav6sh9ofr4ht89bo258onmabkkuv4zrbstmv0220v0xs9phwbvi8ihtklbtf2iuh4zzsebrvxv3jncd25',
                receiverComponent: 'w6yoxnpni1t3afe1rz38z1eezx2yb4c8bsucm1779us7bdc4z2324c8k5t4y654v9cjffft0y6x8tiu7w7203rhhn7bz4epbcn4b46ncoasje1up7a0g4z3he9o6350enraf9r1nacz8dsf8xo3ehpgww1y91y8a',
                
                interfaceNamespace: 'tlmwhefuyrazodel5rsngju86y57r1172zakfwa8g0q4vw4fi2j2z0k0xg87uu3h1v9qqo43daolslki9n96vlc6kw0s5k7a415s5o0gzxxqbhs22f83ivq88lc6ahflpck2r8lyv70pu1wm4jv66jjxoe220yjz',
                iflowName: '1auw28c19u31dbqw07ndcajuffba51q09xjzs0s0pqnlfa7pks11pmmj894bbhchzgdlyi3qvt84z2hju1onvv27zjqb41z44ddsl2kq6u8elr1myiccbi2lls3iubvayektmrxxs5yijrme3lic2s8dkbktbg5r',
                responsibleUserAccount: 'yhdsactu2n2ic6g6yubp',
                lastChangeUserAccount: 'oi9uydvh6h30krj788rf',
                lastChangedAt: '2020-11-04 04:01:36',
                folderPath: 'u77f80s78ue6rfwmmnci4eca1d2i9p1ysisfzh4kkgcjftjfkgnogfc5a4p8ife8zxmbvg2wwffk0cipn0vmx845buk4a1i3xxl2f2xkmmbolq5wpxl18qi0038eojxl2uxieblbrocj5kp05z0j8rih1uxz76vp6lggtwhmo9jq4kmcjxmo0cp3eikp2rb7wiwfoa344t207v7z37i2e3k9neajmexbseb9340fcswwtsrk4octmlsj51zxy0u',
                description: 'na3v6x1xweozje432zp055lhe8j53aklr2r4uctp7uvgxiviwch23ehl3hy9ye32qdez8un7ugdnjt9i4xil345gk0y7pc84v69fbqf068rjh4ye8pbehqqwzbjpkxutn8jdkgz3vbtnyfrxl4a8902ytq3p96gels6hn5jjq9hjffkw0uc9xhvantu5ys35hkmmzpe515owe5n92v6ve8xkl8dw3pjtnrhb0vqp1vgug4e7brpvzgvgsz8muve',
                application: 'ir9jua0scps10fezmpc34cy0rqd00ernf6j0feiziyuubd2pvhjjs1pvtuql',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'asliisrh5q9h7q4uqtqludhlhrf227t7h3nafwfo',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'e1umxsec6gue06u6g1nqjjuncr24xwqsqny7910qap98qlc76d',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'vrsatu8ufm7mpl2jawf9',
                version: 'vftk4cmaxvsupn350w1g',
                scenario: 'pcsa73g1b6xo11hexw89mygwo28sztoipo3n1w03t3j6o4x7zjh2zk77d26o',
                party: 'cetlnd4eqyiwanje07a6uq0dcgiqr6f26yuh5f2hxtaugchg3fhjek5in6rit1wg9t95a99je53alca4fnhu7pkazaho50383azejqb4y8j5tlwe2vp2idudcvgrx16ffzgz1iiojcuqm0v8atkdrl1spuo5t680',
                receiverParty: 'sebug0fw2e4fa25dofp7dhiyaffsvrld5eivrjfhh8ser7mzecz26br21u17u571iivlh678p53yael0z5yyn67l5uon1afm3yfcchuhukeyje5g7xh1xmxplqyzz2p4su3mljzcbcory7x6xvzc55tbokox4c3j',
                component: 'iewonw1tjmopdzaacm2flxpr5tllx1jg1o9v5i6dgyqv8xgl40ncb8uv70szrffs4uxc3lbrfcdltijeahw2uux9tfazzsytywq543lvepddv9fxw79ppjc3bteg185vt92ifuufx6s3iyho97zxfsndaihbzgm3',
                receiverComponent: 'hgdtn6av6stcyd343gdajyoqhf6kto3kjggwfx8ck100k6y6h1zdfu3ogweobx8j3yqxq6wp1cjv45pf5ht1gwyp4gqylzws0w72bga2d180ifa08ukrucwq1s27z367scrqka1ikplikhg46scrjwbcziymqoc7',
                interfaceName: 'd5xdmhkcr6zcqzm97fxb8jvtctfntze6uuqfplc4p3mfda41j695kpo4ycojvsrezk37su69u5t3m14xh0x8opttztg3plougxy9ug6b5kexjjr1q56yguepm5tglpuragy7j6bmsazure6l4lq091t17uq5wrli',
                interfaceNamespace: null,
                iflowName: 'p7bjy4nj75l77hgf8r2xa4queadv41sum8cvovu9303s0y60mund8bz0d7vknvi2pjjdg0fzllevxr2yjbq5ktjid0rd73gva054qix1xtrd82aw5oztqu8js2fv76ic4ip4axbapzh0fn8e1uqzgvc3lqwoys1y',
                responsibleUserAccount: '96fhlesuydlnw02u38xu',
                lastChangeUserAccount: 'ddrt02lub53is9j3wp8i',
                lastChangedAt: '2020-11-04 08:58:25',
                folderPath: '4470p6pbdw4pmnp1j63iq4l5q4xsvgne3aa4gw2ibazjkefidgo4cc1552oy2ef7ngi5g8da3zzyb671bp7yl0qtj5wexyx1d6clxe9kac32sub2gjqe4ed2yaqv9rmwz5tertbkeslw4umm62yajy4foh4xiyfcpsk0e8kbxi4zkpe84gbv33nfst4e1y986pn724tww4aj3isni02rhxpooeuan02oums1yuo8lctuzely1j022rc6zbc7iwa',
                description: 'aok1uar47bs2bj3dsokm2wn6t1qma0ofreh8tf6rn1v22ty9oqiommdgpd8cv4cskbvuqsjij95mk4mznerfre0b2juwi3y6pq7id53k5e452c5hp7xkg4ql41wm8njpbj1cmkf05riv0adg4v8z7135zftf1wfo3v0x8fbbzqbmacgvm94cfiqxfm8kjqkzvebzujn6kh9etefqqais5q0v3kln2ae4tewb06mezucfwb16ecuks6jdoauljx5',
                application: '3pm6fdl8kdstnz91yssaoydxrejns12jh4z4dgyi5n9wmrjl3ssy9ovt76dl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'xrl2w0k3us4el4nsz48xwefd20p2rovwci94e37f',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '72w1ndkzqikl2escp6n14pw0krvo4m1qn43xr6ojhajqem1xk7',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'jial2b1dbm6n3spsp1ll',
                version: '3es9j5huvldyra9e2ddl',
                scenario: 'b3zt8bl69casz9tzamlm10j5q8jx94bsb3mt0s4dkpbzk76v0rz9y8w0nvtj',
                party: '95lstz8dedxt0a2lvlwqx92ylfyujgllilbjuhqz7disckxm8lk93c8dshviocfa5s5fraj33xi7l06iguboak0zp2erv1yaenxgm8yytkl17hi2byuh2fw7nbi9xcsegdrl46qcd7bm8t6jx7r3xfsw4tk8l5ka',
                receiverParty: '7yuraiol9wb3kp7jbe46i1dnsjub4a3m2lh41swqleuox4tm0w7asrvnoqs68ou0cpq48gc2wo4q9hir2644x4wkpn164564g4u2k5fv0tm720vd8l3q0rpiezzi4hx7o5aydm66ry8c8z26csb69j0124glencs',
                component: 'yj0qja2fepss93pvhm79qyfc5qlwlhtjab330rrpxtmaqlxqexrhdwsgdoz1weldo2v6mot95iyy8266jh20fpdknoew9cg1r4k7ykp374haiak1fa5hx4rjyhgyo0ivp0t8ewgbjoeu90azdrwcnxe2rcaksrp9',
                receiverComponent: '40x4ea5sniuar1uqs98i42iy11jxeedz5g363nksbuei5cbrw2iis8znrchg0r55ucjtmqv1210vva4ujebmncw27yfq5j89mirjks93haulfui3fyah8qab06uwqdazxenbsoud6w6nszbcy9puw399xrt1av7e',
                interfaceName: 'r7xl6fv6n5083tfi6ty13sxgdym8p78k0u3cjib5fkjx9zitel3ggidnu7qk855be1qlzmorop6oi6yaeo7mo5vgluhtin7ew23lk0o75fv8y6cq98fv94bcicy6fge7kmtsaypesscrdjxhbc6ykyiq31v72rn3',
                
                iflowName: 'paacm4i3zlu48es06zcnpj0k0h0bqpz6yo928iem148dyoh770jxguv63mxf11s2l83x60iu0vjixfopgk1op7l6gblxi9e9xuy2s5serl4j3wq398wzdg5cime4x297jvl7iasor5azejbw1slrxnup8gthyxqf',
                responsibleUserAccount: 'r4hzqn73myfz7f2q1si8',
                lastChangeUserAccount: '2wx8bax34hb7bl9dtua4',
                lastChangedAt: '2020-11-04 00:41:26',
                folderPath: 'bnxpfnvpm0ir5zikv70lgouhw0vh1bmotgittg0aq128h6ekz9eeo2efd3gi7h43lnv150v77zl82biueoy4oe699yxatkgkpv62x1j4ljuenq1ck90wk802b24tmpfdsby4ooda947e4os5pwgkdy0olkmwuwhaau4z2hwj4o1eztjxgakme51ztn9or5lmybrqq4yafisak4ucctbmtt59npuu1vou9r3pemdx19j3ri8zlpoc4999koy8arq',
                description: 'fuuzv8umbu7ka439929yap157onfm6urh7p0qv0tp8pg31o84qxr0zx7kxmbl7jz4h6u0yspolawf99v3ehd2mffo9w3y5dl7tz7z58a8rqqgfpa0iuv8a1c3luz1vfpfsuyx17ucwec1z8mjl7vk3dzjnbip3m14o0d1iq10sir8k54ki79p7f0va8rzv10eycyykendim9lvy7v94hshz9t32jt8tfwb1gp1c6d10rps15tihwini6wh1f984',
                application: 'm0bq3z4m2gdppwedw0d1p05tfbc02orvspl3h56hwpx2jg4ylhd4obmb3zr0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'os0zy7a0vjndoju8xzrd3ydu5thneca2fvlwl',
                hash: 'hlmy78ke38xgjbn1nnbhzhctpd6ag8rnjf16v1fw',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'e6d27lg1u9z3fa8hjn4grt8fro8emhrjw2btu4clsgm7hh1lwf',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'fom8kbi5dyivzafchgdl',
                version: 'lkuws5j6q6p7ltriv132',
                scenario: 'h68r25ha77l8lw5mynpyhogngnwjbr17gvmy69ztccse7tdme5olkhdm0yzb',
                party: '4y9q6pn3f0utyxplta4j5y2drtytsbu6azil3rr1r2eotn0kw42n4rum9xxi6wu0midffx5yjqwpwbf0en415whnp3scmlsjawiz1hvbnhpvvwuouc80498h69414fvkxc4rdl3srm9q9i0rkho9cpx2y8ld2rqe',
                receiverParty: 'xxgdwou7ggy25uf0pqu25xi2tvxp2e3c6j59rh3uqibnq3po4xd35gr7kk4ck87kgxwsrhwv2uy5ia4srs2lmafynqeayl6soe3elewh1o1ksz59esxv2wegu3fc1gszkoq4a6ap6hgisvtvhi80eker618vfr4y',
                component: 'wbgmcxb5gixvssuih5lhf45u14kwnko6vu8c35cb304bpbr03hih8yh0ex4scfz92h95cvq69t12tlfqi81wyy5xdfqm75xlwrow5ubza2m66m6j2za30kea2q6e1fj81xh3874h7td5h8e32i9gasy556j44p1i',
                receiverComponent: 'y1v2lnq5ml724nkjjhzzlxyepc694e3djnkf8oo9x7hrngrfwc12yzm4qvah3qvjph7hgklbmlvzq26d362295k7en84q7gqasoe25khdulumqxxufn9acagvxx7qx61nak1f868dnq5in2f3vob7gj69ysmtlka',
                interfaceName: 'oyr7oyokrrieiazu018798d3cltcxrop67y9hkrsv8imveqgdt0alvf9ox8i4l4j1o5eczfyupgvg3ud9ru2n052sm0uc9lg329xcljk1sejequfnfamtqmn40ddp6ycknxcgsgnxheklf3ana1b859osentgysc',
                interfaceNamespace: 'leaa06djl59je9q93vpz64bplwoxekba5yctv5ma8c999663hvdojmvmds91ora45n83o92ke9w28d3ryw7pav5b0arjw4vb3hae4c4090b5a6pgjxj47h9oo4lc2pnf31cu680kul87dqlqdpjiuzc7gxeyzdsl',
                iflowName: 'r78eeveuvgmlihv8ix8f4flxpics2ycdk75bhwo750upm3qi1qw9z7v8w81z6myy3gv9vlucir01bqn7gcru6ymhsf44n99r6rbmqljr0ege16yh5l1xa8ni1gxfynw10kn9vjtj0cyaubxs5adb7r6npv81bcru',
                responsibleUserAccount: 'dzrxa8bl34vhasf295x5',
                lastChangeUserAccount: 'jlu5qcozvzhxbtavb8pp',
                lastChangedAt: '2020-11-04 00:59:26',
                folderPath: 'xuc654m41fta9mnxtynfzo9y1xdstxzbe1c5dcyepyzac3mda0qsm1h70x7gm533th44q7fbxi23o3nyxbarm6acqpkivqhm6lvy078wh3b7gsb7xbwja5jqiyrdv3rnt0y3no39kknbl0q19rhabbjbm7g9mzrvfs31zf5gxqpecgzyovmr5is20pvtvtlv7chik7tulcsuhs49nh8vuqodb4pgpz90zw558ldtigkfpcx3ywcw5bfyt74byrj',
                description: 'x2dpytd2qqxcg7erulwa53k4gp8buxjzw9xkzebld8w6v3k0vd1ql7g71fcwxxwjp56plprdzv1vfpl0733duroiyoimyzfc1oyk63qn0sts9q0mo4g0fvbmbdart64u4jsfxfoxt3kma1tu48tkhkd1rzub4j465w4gxf7r9fz51df1mtufg3y5zrfe39wi5m3lxnozfrhuipfg1lhkr0y6h0yd3bbfhvghmhh9udpph5iqnrevnoep0skey1k',
                application: 'htry1l0k7agw7ybgczab6otmoqjt8nf3zym3ppm6tiuc3jhh3apo0dym11o2',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'xk3th7a5ss7jk5vschae6oeouyc4w0w70x0e6od5r',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '233kb20zrdkf4549szmkcetfvrmbbz3owh07xjopagutcz60gt',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'ukv4ahm5hlkmz10q884k',
                version: 'lid0u1hf3ybyzexz60p2',
                scenario: '32tvf88e16z69i0yhwg90draved8neyc2erbdok0cve90i2kbjy060v8iuqk',
                party: 'it4u3exe2lx9firvyv3zoluf1ox6itn2x6mv86nuc6fgoo06ghngz4zt2nsw57fgu0bxfen8omzxtfaavg0n5pfoo3o6eqbhymo7baoroeqo70lj43p787x275zqihlei780832pn26op13rgb68yms2e2l0umsr',
                receiverParty: 'cark98hfjks2fm9rnfb5f0krao710hcmukol2n3z6ohtawhdifxjzts04f0klujj7afgjecocduptclwfgkgb6u2pbt3p87z5ci3prjarmg5aewto0zdadm408dywfs792zhy8nnyp2kwne853ty5vmdm62g1s8p',
                component: 'ziufevyzlcbb0gr9p6jgfi6m0ciweym1b7nbx8e7w3ix4jla0vooc43rkaaey9yevya8xwo57l6da35nh5h2wup80651yoaldd3a6b3ooxkv2384wfqb3a21o01q99yd5g1941vgfh652tq4f81g3nmx0t1p11mn',
                receiverComponent: 'qv9o8rkkt0boybzu6rqj6io7wj9mv2eo3zq1jwdddyurcdal9saypeqeb8v5rbg8aglezuz67lj5fczimx8j3bdhwtqern0ijfaxjpqgq5fy4vfmuet2207nmq0q0jyjjen0itg1q0e0lsg4wt9zurleo8qo8sgs',
                interfaceName: 'hpy2ydjhx50zss34xfbj3d9mrd28rzikrwqjiucpsibscm10sphzldidtx879ybkmtyj5rm5e6it317pndqp9udwqoh7mmwlkc1x8emvnbz6ygln14sbdeshvstikesuin4v8j2exypqrkgdih8i86eb4nvoxnsa',
                interfaceNamespace: 'up2ii6uvch7d3rksbfyrfk3m439hwzd1tnvfim0oiv2b2rakh6zbcho0v2d9muv66h3d6fp1lqybop5hx6a4wlnbhvbeb4wvvluvgp4f7emdsf5mzkmj1hluglkqczzea4ddv6uxe5tk2iihhvgq5kjh2nwiam8h',
                iflowName: 'fylucwt0injbhg2jvh7bqk0ms4zj62biaj6gzglpd8irxcli2conu7zncgzabhe5ytk9g8dkrjda50xopywuqvim8pzs60ugtbz3sv3usbl0y226hjy1dgrr4twluxak3yhpjiagpkxkgd4qry1xhjrsarerrhgl',
                responsibleUserAccount: 'aze6y1eyhpl7m1c1940n',
                lastChangeUserAccount: 'nj5mo8t941rhxlxlg0m3',
                lastChangedAt: '2020-11-04 13:27:44',
                folderPath: 'uyqywvweu82atlnp3fhjg85jn5fvskrxci7udor5twusjdro5bgog0xw1wce2p62djarzb4rf5ck1cimpvkhqtuuqyiboxn6ncnaoemdcw9uyg1tr82ykw08ar928rf5k9d9ha2wmvv23czaj76ttk1d98g18jh10efbbkk6kidug0x7ds31os66o8n1vnqhrfl36t52memhedx229pssmp9k33dc801yna1e3oe2bak3oiuchfd6ddfwqj080m',
                description: '27d4qij9zxq4769smy96bkyip749lleoqky4g145juzu27yna48q6l6a93uyi7xifkypyefiopu5e6hoxeju7e0w008ythwuodsxkrcg0sewub13wbhhfxpe6lnid8r64qt0b7xm7ioo3ywrqbefvx9gdmx3qtnksscrc1cuq4fe0357o4nwomo0q1te8fumdncnfb9xozd14dia1hjlad376p1h0411mpn2ctrw8e649p475iecv7hwh6wyur8',
                application: 'i77c7y8wvnioo1i9u4xslhrkgnn7laiwvsevnopqojggqlcpggocj992wtlx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'mcaafcw510ohinmazpkev45071usveht04d5slyf',
                tenantId: 't5m4cz7pxa63psydvkc15z3240l0ol2pltucc',
                tenantCode: 'r2sajblx2u094ft3d4v2cgywzuldp255oxiyb0o36vgj3ye1v7',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'gt4tm65uinlpbsyzvx6t',
                version: 's6x9honol3b90yz0r8xb',
                scenario: 'pq8blznbqlf0zapudat1eyu3qxs2oyvrdn9vg7xspc06l2s5dlb595vxflf5',
                party: 'y433mtl96xd01sbsa53ih4ovxbyunb1uzlhws3tb74jeco53z04i8wovdb4rdh76534ekqck7d2c14h9copdoqzfkq0q2nst37ereiny7vmm787dls6gi787ryyxid1lokvjr4d9f076pyjmqp0s04dhyzgykrfp',
                receiverParty: 'pvaaymqxc08gdcbxe7vbk2any96y8kgiph5yieu5qifz0ymotrz3yznofy3c4ldvj2xm1j59ojcng2erjzcifxal1q534n8nuzw7s7qi0bwo11gefk36mpfikb1ryzr4wx0bm09ri5imb3aywnd1359f58zj9kmk',
                component: 'orqjejke41nw8f5r6g88ds8iy633ya6k8je80rzjs8yawvsun6shid6cvnrzgdh4lvdni5lqvrwjpl6r67jnwekhys4zpo9glgqqak33fzzvfw3lhoen8gji2fpqust2x5d0erzasno1snd3rv0pyjnswxdslfga',
                receiverComponent: 'r0x7b4iytapotudv1cayjeog53n4at4fq67zmw7zxgzyasx7u227ngf7u4ghw2swdgozfjc85mw8jrtyl4oo9wrcwm9dcxagqhabmemy3bmmoddadmqfl3ffjcpfkal9uvlppbnpqc20ypz8zyqio7o3fnrbog2l',
                interfaceName: '8cmvha3vbi52s3urtdjlnkfjrx3at41fxlopvr0z53mzejygjbz3zc5nlbgnv44x8ltypne42mh2nwkslkdmz97uhm0irnr7igrn3ir2m12m41br07wdi4ivj6jwfyftvp47b220lptckz3vw974dt7vek55mcyw',
                interfaceNamespace: '8zd4w1ahjle90qehlf3a1zki2f5elmgnrv2njbh131ngpzhk2zhjog3j5y3qfy3xvcmmu04e17yjr01sd3z1u7ja9rapoipujfi54xnpmvuxlt2ozhs00zn8qrs6prnno83rqj2g52o4g0zx9e8zy72zl4x6fucq',
                iflowName: 'et04694si51039mh6o1vgggkb17h4nqmg4baqnutp2bkn04uuqgu7b0bb9arym2gne2wq7x8er0e9gp89il4ddxuc6tmlqdt9qujdj2omt75r9264erjgchxceunpv0hfautcjeaa5439rkcf7bqu6yxn7xye8bo',
                responsibleUserAccount: 'vd8nzpxn6a4efy2guqac',
                lastChangeUserAccount: 'eo4dack801s0lwwkyz16',
                lastChangedAt: '2020-11-04 10:12:34',
                folderPath: 'i1qc3s1qw35beewzrosylmjg474krcho48ghp70quh3nfp8lehycuoac5gsiceadleia9xvc4tinn50604uq4f3p79ww0yt6w500jo51s9ry7bluv9r8s7wf6223d75hue6e5gfkd47ljx4cu1e5zbi0abkf8c8hsyf0gw5kuu5gm11tuh5361hsbr20uy3qdkbq37rjvt4mymoidbd87rpo2qx989jhv9obvgqk8ipj8j16z4nntp76d06flp3',
                description: 'arczrpakr8m4fdl8jsvp4zrl93tbl825mka1tnbez6ghnoz3odf8strt97e5eaf58t7bdhrgp6vggtcr4m7k58ec1g8p9hp8ce29h6jqduklz5x874w1wvtce1t63x54f2uookfkqx9bfscijpw3nc0hpe2tp7orad6eqfxa52yljvbrq2l8rxugyit3q7c0wxko96y76dcb0s83t8vm6l72wk65894xf3taljb4ep2bxlexqh6t33uppvys22u',
                application: 'g60f5mn0tae02x0b3zsnb8veqwj1kulpjg9je5lrhuh21wv9bowsty5zz56n',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '3lycqp7jpxrun7cbymv04ypskp60kw7g51thczeq',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'f5v66m7d2oazsblxiurx4npx0n92amwh3rfzz5lp4tpj21mokh',
                systemId: 'o58211u9ner885yifnflvz4kvtnnkjzqilmdv',
                systemName: '3fpvsipq0n1x6c18qbex',
                version: 'ojid6imils8hl1f83rpd',
                scenario: 'qmqoc1o40rr2uo6614apszzwywanzthc7hz74bhwbbkdutuqdbrdwbrfhk9l',
                party: 'trlc0qa5souqv85812rbfdiurkdb7sau6s01shl3jhjxox5v9agon80s3j8enewrhzt6vxutx58d8lrcxjdlp7abnnmpivo93q84b3jn4efbhqp7drotc3v2at775h8w21ff9a0mutq90rribb52zn8m0x0jrsgl',
                receiverParty: '493wd57mbxbk7otywobf1da1wam1o73lc46381u6wfn09x4n6ff99ab6mv5pbr31cgtrbnt9vgo4gljtu25mtgt8re1k0i6svxpm6qzqe3w1ebdl8mqqaree739eeh3pf4cbok71dtsqv8wa0ll4rla3n1ph4r6a',
                component: 'w1lmo8m9zwc3pf273jia3cq6k84faqpa1fzpgtbbpj5eam5svaeefm3mkh8yhuylcq25haayt51ktvu83t8j95b0jpshqzqmix846pbhyn50almehk6r78pbs8jm0h9fqtvapqb4p4kda1sd5hfqdmbo2kl5fjrc',
                receiverComponent: '6dl5exybqmjpyat1ofy1zr2rvjyz952b63xpr70jo8h39ku4jrw5yvmz3a6sb4g3eh6c61i1rocz6h6y8ih0kstfu1uukktmofi4iew7j90oclqb37s56n36n7iwkhgvaqjhz3lf4il4bvzj1tsnmrfugo0sa9ea',
                interfaceName: '6wy47vj36kgdrlqtdxfj5s6k2r69n9in60kpeg81d5du0pqv0agrjikky5n9pe2679sa85y3aagilfxih4pbzbzsonhfmj9aqyd1ddsbmupos0ktyomhkw7jvcmpltjf5qofeszlhjq26mc4xayevxc2fxv93sv2',
                interfaceNamespace: 'ekig0gg7q08pbh96laqumn5nvn62bmxkb4w8pbi09b5xv0yjwb8araqplzsreebtc96bn5lzjlbhbj2tcrh29b3yl98z2ghwsi868es9rh1qs2ky375aqm7yirgtfutlops6dznbk4wnl89v0rhqh67kz7h53qau',
                iflowName: '0bmip48yx058ddx496aawos9vy0z2lfjfbjte70b9307jihdckiu5tp3p5qjw7g41znuaq495qzho492ii2g4a0xx5o7lvwz72forbyd9pfmunk3f6rq9tx4l45c3ldhxy72rnsqqw7lfdiwsfgo6hmt2zd9ew1o',
                responsibleUserAccount: 'xydhv0tqqy2cf0j2f7ar',
                lastChangeUserAccount: 'owzrytbpkr8ext6d4v8s',
                lastChangedAt: '2020-11-04 00:53:29',
                folderPath: 'p0cgrd0lznbcfjc348toq8js8ydnxgwnv5uh1i441oudrqnoe0sx6wf9xh3pqz4nlrjvsf7vpn670lqzphchdfz3zu6rje7lsxmp2e99t4hrdqoa99h6k1b157jxpdngd6qs7dvmbp1m2v2x9seg7knf9xsmd82m7h5btkv2lc02eomuvrbey21hyb5pd3t2edmcubbj97k7ycy8r24xh8tzp4k1c1k7nmgsszufnvuu9ury6arq7figrcrzmao',
                description: '9uni1vbsgmuzq2rvq5udnn138xb3zoor10cxxuuibwutl4jy4rjh0oqbglmd8tvgiw1rrp8mj6px46qp6yguyst9u3pfudcc9mzju0sarjwn1b288ul96osbu0q7apf11fbz71sppyvdedsg7z33dn8qddr3be2y9nknplxoc3qcqgqrmcmuy61x5tivexku7q7u3lk42mxcjzl41aupp6a3oqdbemtrl2uppfbdim1pbgbfs4w48sc6zlhj5qg',
                application: 'z7cybmvkh5uqgjyemk2w7p37axakw8dgobptf0g22rsqrcdgwo6vcdix9fwe',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'h6qma169o7okr8js4304j47jpgjkno8v8gvqvakz',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'nu4737u440vnejbke25l9lizmhs7j99z5xn5v4odwhggrmwepu',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '78qpup5gu5k7u99hp8kd',
                version: 'ya8nz9l16axzq0pf7fmi',
                scenario: 'dg5p5l26hlk30gosdebdr47e6uxmwetmes2yaezqgcox4n8igyopb4a1ps8r',
                party: 'q2cufr4hln4a3adr41hrk1mj3wtt1akz1vblnmxyaf2z8z50x6rtuxmwcc5czmyihr8wfmcieiqwnbocvn3zhfmwifki1gc0votcuu7yftqpy75ey2dtvr7g6ftkrkex59l4zo8xz0mykyji3oaej3b4coavy2bm',
                receiverParty: 'ou8hvfers8qax1yrgqjg4od813jh3y3uyex9w53qdeludhpkepwrkdcohdm7yav9okrwv7sqnoxayvojrpjjrsbdx2zt807ocs1yt7mvbo0zi2yeq52dbntyri10yd0qkmodrons11hqop48jwz1mg6p5shhj7s7',
                component: 'opz6e5igeit0723ojrtdq9khzm2cwocx35nc0hzn6wvbfqcnt602umlmkjakrbxwsciey3immzypbofssa47yah6wb7duefovyjd2fpkq3v6ye0w3k5cdhxhfh8qmlflero5erbbnk3n3nqadfrsxrde2rm7xyiw',
                receiverComponent: 'bixm7rll2ztw8fi7kz9tfuybet9h1avtmlkq53gl3nupqpksx36xfo1woa2mrht4zy5nw5mbzymtt046ucvipsmq8eoeekdb9v0y8bo53ksxxe36bpxsl4zgrjvd79z7crckg1ggq9r7ft6nlenpalzxw2u7kjtz',
                interfaceName: 'tiq3d04rt7j1notlzjcfs5rpzprs3rkk31arcgpdft61e1fgb4q16owrgi9uzyrb78ug4sewsppiecpo48qoyfed0d3jmm3mzcdfltip5ny07t0nqh4kceo69sctnyd4irpz7w3qntjgjo6rbmjondsnaa65pkn3',
                interfaceNamespace: 'h1w7vgdvuoknc5kb3qs2q8huqyxcvlcipm1rxq7mos2s49tycw2jn9v91r9uwbql9z0e6knh5vsgj9yh8eq9rp96biy55jo3mktruavbxvvyb0bhk73hn6bmomt2p6skd8he57r4gk02jhhr5999bdkeb4dce1me',
                iflowName: 'x9qnyxt00tci01vsky7981q9agkssyeovlknclj8sh847oqzi7qedbba5qt9o0i4ck5ys9y0q70addg82kjmkep5agrii97xzjhgyz5p7xl4a86hxv5ipr2qoe613s8yhc7pp84krrxs72blehbemie0o094y2cg',
                responsibleUserAccount: 'lymnombkiabz3j31pui2',
                lastChangeUserAccount: 'mau90hqobzigjbg4qvc3',
                lastChangedAt: '2020-11-04 08:31:25',
                folderPath: '422vzvv5v9r4chjrrxwg08fjqjfruby7ler38ogw56ilmgur4jkf4z3r83ju9o1zxzivea1zmoazghfzj1niex14fnkngpg12b0t2zr0bu2n2j3rgue7o3mrhi01q90dyjlwa8firv4t6l14u1kh1tmn1vvdt5wu1txh6x9u624nslurbsic8zr1fghsotctlsqkwsq1mz4y7e6ivcet293gxh78mu7dr9603h4r7wegik53iem49phtgwy3edv',
                description: 't9b23mr6jbzmawy56d6ebuhtske8zqp1vxioj6vb3yx7aizgnp89btta78ond3ynmodge2cmjktutqdhxc3559ghamldoxg4stx8zcsv5e68hfbtcel4fq1g20owwvhedxwzc1vy5f85xsm8v4mjkn89ooqyyt92qnr3eg6vng8xttj4pi5aq73uzli2154l8aa6wfgwuuru2r1qmmr5n8h9wbc6uakityjdj6jbi53h52dgb2czl7w15ectaj4',
                application: 'm895k9sy5lzn4p1pnfg5vsbcb4i1bt14udvt1gjrlvas6le0x1p036wkx6o6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'dopigkrvn5rxzbmzd8xuixzztxvhnpgwbe8tr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'o4gytlji5x2ecvqzgkpv96aaxizyvcwhzq983fdd',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'c13f5oomiczz2cv8y8dw91rp42lkdjcjxk3x6ohx2jefmcdmu3c',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '8w8aqv66izyap33yl268',
                version: 'zabmitdytrtznlt04c2i',
                scenario: 'w3ifesbry09miw4poign9ktccl8pf94nxer69yrj7ivly3dserratuekjxti',
                party: 'pqmekum969k73mkdondakto0aqzs324aurb67wc96ofzl6nj7bz21wy50cc12zmug9geutzxwv7gcllycznowz8ptt7n3od8pufp6fs1jf38lo0i01v44i09e6x16t9tlmxrfvvoke5niymi4ypxjm9j2blp3bn8',
                receiverParty: 'i7yj70r16mfkgma1iw3m698ja2x4ht5w8e9sfbeqcbogqcmgyaf3p2sgyc426bl25bhzxx4q12d3r9rrsoxdhaz258mg81x0renwrtsb4ig2p12l0yrbag1uqmq9zwglokk83fbx3u4s3sxt42qje7hm69m3t48r',
                component: 'x6dn3u9pn4qschzjsqq5s6wigt0lt4002dme9ur0mb09sztt5s5br1pn20eo2xadt7aolk9n1f01941fokq5bqf1vtumye5so61jzl28e0921azcahn2h5w1tlwv787t2rcwn0airx30n51x8uv1swmw4pvty8yh',
                receiverComponent: 'wb6xbi9cf5rl99d4n2foms5rgf6nt5d3m34gp1aqw4t79h483abg4pkrlpk96tngxrk1jzkl0adhxm1eju8d0dbym8y4dkarsxnotfa8n0lwgavhis1o7q4nzqzgtxj749s024wbkhbdy21m4ob92po77si1g4lw',
                interfaceName: '34xm5zm6f4d5ob6hczy4khe0dw2ono199uclyutyzft94hnaxnnau9d3yiptd12k3ap0u9a8cwwuzu4ryfxx5q2scnxnvq7d3bvqmqzev4cgphuw8wpu4uvr59jbc7mx4zuc8gmgb2n5aehvurais7mg1ml3lyf7',
                interfaceNamespace: 'dyw8ch6d4cm4kgohdqeyyv30iq05jppra7h16bmsyvv9j7uvnp8jbcjp673lk54wh60z6qumv3n05yqib74g0y28kf19es367tqsbd56vaxoz8vqhkrd8p7ks1lbiv12m20f7601mvz8i28fap3vuajkfdh1leu3',
                iflowName: 'epnz2qb5h5xaoheueswdttrdplyi81hzbxeg14ukpxhcp0avk3ld9n5os2xrqsuifci0gsv5guxs61w5ghjcoi2hb5en2ryreo6wmr2ki1igaz3k398wl0cdyvd7ay6ynw345yty29ymyl6rc6pvu1edzqo30ve7',
                responsibleUserAccount: 'q295u02qviusae9jl68j',
                lastChangeUserAccount: '0uncl15hkqpyimhxx9zh',
                lastChangedAt: '2020-11-04 11:14:27',
                folderPath: 'y30v5v3abj2uswcc746l79jdx7d4qzrgov9orkqahqk3juy1zh6ddzvq8e6nf76davbyv651h1bbyg36f9ij61ju1a8bj1hqe7djvjqy0ou8j36dbt4daf6qf7gqj6bju9fbhjnoov4vyii0585uy4vii4w9o2b5ihfx6nlwhqoqp44nm2cwv6r62iej37ubonbjgwefy20vp44d5wx7z9dyzqlu5bkr87rz2x1r728ftbrncy4vfj346l4g3vo',
                description: 'tre9ayu9jzyr23yp8tiemn6owr6hrnj7xx6lh10xzmeac0ul9oile95y1850zxv8gp6ilorwbecvofkbe2cbydlm9hlrxr32i8tf65nm7ukir2bq09rk648bs58k9tjub610bgsvtefk35fphs2og30k2e3b37f0zef4meqb6osm161bsh0bsmjm3ezpjepeh4cody1lvgac8oj9ebxpyrs7qircya8mlpar4s36lbhurr4533zhsilphtxotto',
                application: '3kqfir22ab71jjrmdlofbcu4i0puzlpi4rpt96ursn1v2xljlqg4ro8cj5ur',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'm6pwxr1bcl3ygyf8gs743x58z5ql4gq0e9dy273d',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'rh63qwnbd03pg52ohrdpyojmo0xip8qb0fhzxcvhuqmoem5fs5',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'mcx40vivlkzbcyup6rbg6',
                version: 'o672i9enfzqxgd6zaxzy',
                scenario: 'bns4hlj10s52sfdg585qxvpax22t5z08c6x2u8wzqa8729z85kmyje4z2jxf',
                party: 'ke8t441euz9p7vql5iq1ocyll9ics0opmwkhveebhlxzfh39jsya6ci1cid12eeca2a3086cpuofcx3hqf4y3m0xdgo19eky40ektn1vgix51jxgviguu6u4lnx17b8efsrr9cmqrkw5rabk3t51axiejpgl1005',
                receiverParty: 'wh0achuwddl9z6wtdm3fgmwnz4hocp1dibdw5nfrg3hgeogxwzlud011v93x5l6dc02a951zw33kjfgu28eaqxqamqfnptwxozt6xfwxn9y8okk9i19fokq5myepqow6nez0r9i1rkzxg37pgesyyekybr2wlibf',
                component: 'xn6rho1wfav1y6x9x2rskj1j33ia2f64pthbbrvutzq3zl9gw4mk5ntfx0h32hv3zad282fnhmkeb0t7wwq84d3peqni5x2giusihrf0uy9ltaydnrewdoxvgqvxof3jlf96buvqcqm6auuyx974lzt9unwpzwdq',
                receiverComponent: '1qruhnd0bjy9lci5e9ct5bbdaoshoyv3hw3nibt8x0p7a6osmq517btq28jdesyi4tdpgb5dyvznmkedjoxit01j4c2xsqy4s0yftw2kaugpdn77zv7e7l3aeh6d88vy66czxukxt40xkd67ciopczzwx4kaopb0',
                interfaceName: 'eazvxnmfenuro30t8wru4ob10n2aec6ega8o34jar2fh6su1n7lx3r28f4ag7xx87j9maovu5fayxi54zd5akg396bpot9geqqklaysctd4xmocut1cgufn9fj5itumy5i3gdcm7s8bvzonf9se2lu6ot6n6sebo',
                interfaceNamespace: 'atz3q2c2191m2tdkosaexmg53fsr3l4bae2jojq0vh43d7x5i8x5eyf05nr2zdcd77zkzndim55ih62vkhcfvrgqiqjinfu82pfrjnq497qab8oyjuwqqcm5rfw5u2drazcxzztbkwg972dqgmpi2atm2at0it73',
                iflowName: 'wj8inpmghnthawe91sijadqs50z8ncawtywzg6ioicvnxzvbmz472hp3ci53en7mur0oz49qh74bsgyzdwvnew5bmiqjuveotjw4eb6w9bvcx6k35kuwssu5opq241it8fam2osbk85912r8juazemoszjwr2mmm',
                responsibleUserAccount: '3m6horwsob9jmg2mbpzg',
                lastChangeUserAccount: 'lmm6ynry89o6kwp40q2k',
                lastChangedAt: '2020-11-04 16:42:10',
                folderPath: 'nscfl9lw0z9k96q80htrfqk7lvam2nvh6gzzuhdccdcyfzd5k6y8o283pntmoq2welttnk590dsulctkpou9pwh0j3ebxbc7bsuf2tfv51p4qu6g325cmauk3baa131uzek3bbn1whncz8549vv043lz3onllutzo0gqfy1kas1hce1du0fcslj1j7l1z9dmnyqdq7r285gffzjp4i79h0p8s7mzc8wmgj096yyruxtdabbe547j78uxtznnadx',
                description: 'f3dpn3ytqsahdrzvss8bx74627hoau81798s81j3dybbybyc6v4cqgzcmfss232rxcff30xeq8vj9ahlhthoit4fj2oodkbc0j00vow9sqim2p1qyli96cjxpa57w3k184zgve7ooqte5d5cpkbfkmlrm02m2jr75qi7oixu8q70tanboru2jmnvlfnx1o5j5hbb4fsrga1pwynb7dzfeill2mntehizjhob45lvoriz5s447o1dr0xs1jzq8dm',
                application: 'b8hboa9ffz7yp3yy4zkza3svnuopm21xqgp21gorlc4dmwqapnd0q5o504gt',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '0kdkras63y9smhw8xsblr9ofwzcuahza5c8xdiwd',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'hbbq0gcb6wjanzvg64so1zwjwt6g0yx37k1viohwqo1dinbf1y',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'naj5v5rmkxcrfxljaqs1',
                version: 'd6qbzbra892ntr3jtemv1',
                scenario: 't7zhurqj69wglh708g5uhgulukge0i22d8tbta59ay9v1ncn0gunm21ewyt5',
                party: 'ab0qle09g5wb9z0ll6sl7duzcc1xqal1g65lhw6k7pule2azbhnn2gc37k5aermj9l83sq41yvbi5p88xedw44j4dkx6h9dlxb71tcfks87gfndfeasdaej0cyx82slatdjmj9r4lzn68eiksrdwr2b2o1syxzn9',
                receiverParty: 'q1n2w1sbify7qdyb7wf8f5qts36rv17f4xdcbofdfupo2wdh1tn5jybemfiplbmpyous0zc4efb5hcgs993oams32lm1dyoxtd9gk112uu1d3xn1xvu2e285t8p6srf1canltu8ry15e3kycuwj1dvn3dldguvlq',
                component: 'pkb7pnallxsqouim5fs2ke98vjpw0iy5k4rzrz354pgpayfgr2joy8re86b0h0ejpr3jhgmutviyyj65i641z9kv8ysdklde3dh1ce0yipn73kqehmna0zrbtfz29nano4s75klr1w1x88i2vwo9orpyfgp6aeaq',
                receiverComponent: 'xmybwvyur61xnrzb0crmub7z5v3o3qruggqzloza8617c4x0g6tm3dzrt41ap5c6bxcomikon8oqyarn19jng744ij03fhqdv4zn0xcgtzebrcxzf10jga6dhjbuujrtknk53phlimrwmcbkll1y61b2c292ob5u',
                interfaceName: 'qw37gow799vqn4ly85ydrts187qzwtyl41r5von8qnqlkjz1li6uyybtufmug06h6k2b213b6aw1wp1i8ipoi7toyuph1cedz5wbar3njd21fefngs13otjoem7qd02iowe5zp9c7ew6nn4p5mf9lyugy897gn4i',
                interfaceNamespace: 'z447rvopdq1pjp399g8ewh5czyn4xybm2wcuvh0h3zx3wekp4l6sxesog9jam8jz22mntwojjogwq6cj0rozlc1q7v5ylg4yqfxhoau88xxx3btfv0haaai61fuomlzzr892mqfear3yac8bc3dylqvon1bvgcbw',
                iflowName: 'pz69ie3h0h5tl451ksrweoiw4dtwgt0qjab195b5hzsuzf9cdn803n9csxx4f407no41utc089hbd45bx1btpchpfc7qkutfwmldhhdcdskaqcfeu9jk1z0t1b0f51ib6of4wacrlrvh03va4jdzulm6jcs34vdu',
                responsibleUserAccount: 'p21oio4szj9g2q5oli8a',
                lastChangeUserAccount: 'lt1pswy1toywqpz4pq93',
                lastChangedAt: '2020-11-04 08:45:15',
                folderPath: '7xy1gs401rhsbvzre6suqq2vv86vcj9om9tsp50uq287ar92d724p237ua0ecreotezylnqy7x6ct9eulhw0wus48siknmo9l4xdnpf0dskkdk6sop57d3f9ahyq7xr28womw25mw0zijsrfloxn2vlqo540glm7wo10gglg85h8zfhy6uojbxedl316g1s201izgksatfyuykgp4u3ks1v183419tm20f114kr0xyre06psmy4qzi8zx08kd7z',
                description: '6hhu33pdkm7sjqskg2ay58o5esgwe4qq5yb3fzzggqn29bbvrqa56qq9ijay9z1aotsr6hic2mbhy09kpvvh2lm5nxoaxc9u3p7n9vnuuamqu3oiw5t3vxotjmsvmn8u7xv2if4x8m5fbjnyzzw73wecrhchj9bhl3i1yqb7i8uft8lh9y6xdwz6ba960czn6ma4d7e7ghgpy18xlpfa4v53u0spb745tenyih2s0bi2lqujv7otb2thczxetpi',
                application: 'n0qa3h9ztt1vg4o2qa08zg0yfd9lwx5wrt6asx4ph5amfd7exdkavet4m4t8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'n6ouf3kehm22cmv4fzr0dvxxryxei0i4qxf4ugb2',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'snpduyzylq1jnlpobskunjvih9c9tfx2tuovyj9wde0mb36x85',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'o5hu0gr06o0p4hh6xg2g',
                version: 'nf1z1n8jmis2wi34jjfl',
                scenario: 'nx2uitbocdqcjnwcl38zhvbg2kcb4mw9t2kd319ha3abqc1g0p1ptfa1iawtb',
                party: 'r7xvhz8ubusy3b0gmhnisgfters7xqqfli419r1pug0ln72af5koblwvrgnrn84g7uzk9at4mypyndhcigcqlfl7tuiyq9cxx5v97tbbt4dpj9of68yxaodkljx0tqh7xakhcfyjza61zy2ypn6v7bbjtkfy31vm',
                receiverParty: '6rcox47aer0lggk43xi8yx6lkdj7ofdp0em1kkrjbio9yagobi1g8xaz185q5fn9u2evh7wcga4r2smb63od15ip8623zte5j2q9djkhco0msxxsezzeyuhwsq77ygkn45z8c46wcs8l8ysdqry6dsbuxwtt4nnt',
                component: 'hufvf9z33y1we64u9ayfktalv096csccsbsfag1qs7cdfuubkezojv1xphcrjv2huzu83mqbijlj8gzfx0uuifar5eqad65r5kdt3d1340oqkwqwprvak9i6zb53u9n4w8kd47yo9c0qok35vzgmaz8ak95mlb9z',
                receiverComponent: 'biz6alpwtjim9xkizt8g0yq962f4frb3qkrdbi7gemudy5lr7lng4f2rjt2p5bfmkr188ww1w4ix1szbohjlqt6v0rlw21saezoukmai1ugdkaejqti2t1b4xwt5k0c9m18fybmr1566w10s4ab55bhll74p0964',
                interfaceName: 'h0jgc58b1xjyhfutgzm7j8c73wzykngr3g1ktev5tbumt8qd0q7qbbkc5gnkfsutc34d6vg8nw41c2hilh6xaz61pbsycjl1dxlkcc6q4753mfagmu1eiv4u3dhlf4oy12oya5e31uy8c4w688dxckh3kmzher4c',
                interfaceNamespace: 'ppjmvf9xmzkfqsx7f7xfutse9ay89v992qz9ex8ohbzkgbglbdmf3kcac7qu6mxo9s8ebwgyhfp1x6uhh0yhor3784nfsruc79fhw51hybub70xxe4vqs7sbgt3ayglxg6u284okrqxlytvy59tx7e2pvad5lyol',
                iflowName: '4e3yn99nywh6xyajpvl4j38f4h3psrcqxrbjjr86kq6epty3w9dg9p46a7ldui93djjs73uyv9wbmpuayn6yoroiq2oojil6wdsdj2l8hpc1j0zcvkelupdvgjr6xt8ggvh3sp5wpm5x2ts9krisny8ib0vy2kc1',
                responsibleUserAccount: 'jymacrq5glgwaicsqf16',
                lastChangeUserAccount: '5lfahzumng0hdsszpnw8',
                lastChangedAt: '2020-11-04 00:52:06',
                folderPath: 'a87hj6l99q89qafyyx31xvp2enhx0zfyq5uljhmqensg7ty2fthi503blaqeh9619xigmg7ythxe2suts8hnd6fi66dplm4ath3nq77udkxkfzdhl309btss777ouu3ovisq18z7gsq9lyjxg078j8gbwy6sgu2a6eizk0t2ahxd9hqpfr5ezip4t0fhvhd4bubby6o662auxjoma0h78ay2q09hy46d7ba8shroqmudcnmcvi430p9chpzj00o',
                description: '0lusxrtwidajx1ihjtksae7vnbp5dnst52ri7dan1mmd7wbqj6j35kmsuejvl9jascp44ixxxlf4xbntl90bjwy6ptw42ly1cqb57etkmst9l568ywgdp8q315jhvksj9mj2dco7pqypfti44rza005d40ofrxbw559la1qbymf3881wyqa5rkm3tsnd39pt82n94jw31src4i6dycstex45x34qtnqg4beyebedvynosy0yf1992dfcwej1p7k',
                application: 'sw4bw63ond8hf274pywdypfkhyx125y19pune7io2ypv1xkecj9yawdm57od',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '73temly2hmlhhqxibmotby71rj3vh10wsnha0fg2',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'p6kz1obacxxuu9wc8gi0qhkexu8s63pvmmbmn3qi7wqa0p6z5z',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'v51zykzo7o91qnhjill7',
                version: 'zrky025hkf350bneujos',
                scenario: '5n69o1lap5a6w22a7jvzr1xgyu82fd2ym4j5eumuoqzzbx8aafns9fdy9eo3',
                party: 'leh6nid0bpyig62rujzod613ni01eh1gl40b640hepfo5949gs0ila43vg9rpdc42f32ke7xvzo2k1e5tc4bhyxeudsnznbidig6qn5uf8blis8nvwri9ur7v6vw37ceynsppcpra153cg4k51awq0a4cm8oj9pmp',
                receiverParty: 'll5i7u18x9vsh2nnx3uqg10g2wrv9piy5u3ita4hjq85mr03stmix4jys1342gymr6x28ygm04f3svfcwfr9u76uz7os56vi9s3x91fiunpmtirzc3ozai7wtkewup3clrlqfl5rw2u5q8nivd556r6kljd62g0j',
                component: 'nka4wtfr4zh6o7s8uxy2g4962f0zlxdbirzfh0strkljphevz12kpkv2hefxo72539gvmjk4fmxyv0mdkdtssyuon3q3uve2vk5iflqa2uu1t22zeji5u0hb93dtgclwiftgycie7smnr95na3oikg0wtrpx2vah',
                receiverComponent: 'rjmy6e3gbzmybt68m4np18cvzauf0eshs8iysey6jmizein2qc6ymimuwrcktixprcos8xvoqy32tesmrakoli1oni1ncdqh0mh3xbi6m2rjy0oc4aqtf63dt7y0rvby39jocb3gtcissfdgjh61zlc4kg6k5j2g',
                interfaceName: 'z8728yyh1yr4ham8leodjeo2iotxrqfwyazvl78173l1m9eqe2far4auqd3prtdmtha6q5e8srftl1l1biqshtmoy9rzlha5aked3browjof73lqdic0gqc69krwc8z0tkhd07jobcpkw1xvi6y438b2l1jnrug5',
                interfaceNamespace: '6wr0avnkzslld76vz57q2xjpm4e0wb3bxdhmdlwyi1b3q305mpb08vl7na59fghacvkzlasqm6atrptkuh1ud3no1sr0k8whuimnxqnlu286ww51scmki57xephrvt0oichuhxqlx1jw11j6s4vlfipcx0sqhwbb',
                iflowName: 'gnkhy5gpw2i8hbqe302hb79n8fdhm59yj8r3vy1getllqlzycna39ww3kc6p4g21ea91bv3xyzzjl5deare1s8w5rz65rq21h9v7xrmb7fwo2ivscivayfzig7zxqrj64mqh9kta9wzh0mvl6wbdlpi1y3ce9bdb',
                responsibleUserAccount: 'lqeimus1vr14wq0itfob',
                lastChangeUserAccount: 'x89ptup3sqtrivpqzc3n',
                lastChangedAt: '2020-11-04 08:49:16',
                folderPath: 'n5xyuugc5e787zha6zhykslxuksa6xqcr5kl1wtrbtuy0dr1l6c7qedbgjy4v6jke1hlxutnhqftvr4h1ozmmtjag67ui5c0h9md3bp1gq7t4kr8sdawz1ass43dpr6tgbmwecpgt6hlox1rp8nanap0ncv6usokfgye7ci8hpil2r4vlxkmuf6re4l5b808uxv0e9mv0f31lxd09bz8dtmec67q8s53m0j4aypp6irdfgoyc7rccsvvy30zc5j',
                description: 'u00148ezk3byxw4v5tmhmbarq1vh7ermths64kzxz0ruurbsn0eymag904u02bkj3xvbv6fjtc8cuznjx8zj3j3cpr01mrve54wfyvuyqq0qms8kp36b0281i83m0xpr3iuunwzggfldybu2trrnj8lnwosil746014a40n7wejw55v4m3s55gxd84fr7tjz7frtx1hif687vt2w7bdy4du3oci3r4wnowty5wk086o4ye6sy7m4o1dwg9ybe1w',
                application: 'nb7u660f7ujwnjjtvmw5ul4y5mapl4550angpgi2yt8h696607dbhxqvd5yg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'hkb3x646ldujlyfpxzbc9m7x54egys28xjyr6bzf',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '2kq5rgwvpluv93orzbng4t95y5aesb6xx6c16icngygzodwgv2',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'oh7wmod3ziias8nqic8h',
                version: 'aqdnsg6466dm1g3dsgbn',
                scenario: 'aov5lwhupjs6jqt3tqjcyalksbqul302a7gs1ntqvdfvjvtizkvqi8viu491',
                party: '4ycjy0z4ce0m9upzshtqtpkf59jm59dqibs56fzupx2bmawjlyws21el3mhsbq9asyhuckq9b91krgr7u1ajk6c6s4dpyzqh3nucopltepjsstb3n8nmgwmkwdksv6tbc7omhkv12muv71nqgoj9bwwdim2bdncv',
                receiverParty: 'df9lausk82yzlw543te52mvjrysi937aqx9z9uzxmrmckotvaiybicpynkcc160zqcb45yp7z1y29bvd8a59w99p29kuclhnzoriptpygmlwxfkejajnr9dampy3h2p36isbxrn5p8qmvmfb2scrp3918uylu3wv2',
                component: 'bf36ve92sbdzo2x21juslzxozv4qymrq5ndbq1bfdxt267ocs5v3p1ixwop2yfykvnfqq2c3aukklw4qqy8f950e7eng23f6nnskkegs1v5qdk4zj50ssfcutuztqgytgwcqd55n739snnd2sqpxjs1m3fbcinuh',
                receiverComponent: 'xmqyv9erolv0ax14oldhn5edsxlb7rks5o4xvwsdp69ky883kyx5l7b7rp530gdlbr8snrki0ifnof1rppx0q1enyeelbkj4bhgf178h7bf5irbzfqbn2c1a06l0pnbiath8rsajulspm56fz05zb672n3qok9nm',
                interfaceName: '2n4zumvwv46pxhtypuk9im06gtdjru0udqtyas4yflmezsybrkkfgyrbx173h5vda65uharbjlgxyei9coahvqhb2g7m23ovbscowbe00yex6aglw12zj9bo9a7dyj0rrsnhkrnsll1roru4z14btujqak8uy5yb',
                interfaceNamespace: '0fnp7gy3gnqsb5bhov1vcyxlyg23bpjdytt3o8tp96cnmsdb0m12m44bmy4qeans37jvmqkhttoy002poubg6u4z9t0ch7228rtknts0ww8ye0ji554qfult34a36059t3c8j3ih925ojxl50wq36p4lfwpxyd24',
                iflowName: 'yoa2x2l1oz9yhpvp6zdb4oqvmfmi8v9gp8yvpkg7gu8z0jqrj1lkje2n8zsvolu511lzsr1i91szqk0qtyvfwrigzcbag8c7ev8p4wkdm1rdum0ijekjrxbwgiy87b0yzayqjmu8jq01la6sb3wyxe7czzlrvbti',
                responsibleUserAccount: 'p2iwhdqdv4md0jcy1rco',
                lastChangeUserAccount: 'nx38icgb0t795qezvk6w',
                lastChangedAt: '2020-11-04 12:34:30',
                folderPath: 'cop6lh32icqg2kcaxah02n2lyqfm9dbm3glyonblskfinpwjwvjgs0kps4yzeyxcrb57yo4gv5hqjejaqe9n3dmz1rc9h8ljhkfh4l8ngyouid1to09dns8dth43uxldw2n1u5n35rxojrw683bmg6nc3u6nth2xzof7x6fjs4pylo4ahufherp270887uxt5ljbe183bk9k9cddds5xh9yq16fuarb3z44gp85dczec836wwnyqtc7fsrgoio3',
                description: 'sk673cili4j2kihhabtbb0e5i5qx1w52nveang6r06o3vmke414ifnwedgckr0ljl115zoy7qchqiv0974j8cwrubkp3re9svtu8sjs2u272plv3idvhbxsp76rdfonde2uyuozfsjwawj7x2g0tov8xglwqrh9xkfbyv3trz9hn3wu679lrghjszwzw3b8h0w4ez9k7ai6524tjwj8holdgyvqdfc3pbnqmgmxsd7hy7hb0wjt06zxpaiv4i2u',
                application: '5724m3079qvx5gvb5g8k6g96s0k2x1bgzxnffoij2b2jp1gehvfgfz7nq1nv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '2dlcy6injsmy00dgmxgs4b5cs8ly3ie7ns5og29d',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'ljwythidi3su5oe22iy38t2ec337x41838gdxpmndpe9uqfr8i',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'v9w3upxmeocp5ahpmyln',
                version: 'yj48jb4sb4b30y56ab93',
                scenario: '0fntawwyj81g62hj5emd0ud8avkivqoddsst04ihk3ovqmp7vbipqzgbwfta',
                party: 'l87mov3pqvirtdntasl7ed531yqpy2p0shdey8v61buprnfh8a5lzbjjfzzf4eoyujeknf399c2ki8vf2tjdpu1zc4aebqecggl1qajcoj56pb6m4jz14jn63rhd79luumndmeetcc6ynbabu1wt8i3dmxcr9o38',
                receiverParty: 'hl8pzm0ymj4sto65uxg6n0i64nuvuymfp2fuz20tpokeq9ucb7rwc5m3ggg8klid1deb9lru8wacp6gqrdo8qd854x8l3ax390826mi9s3blrbj2hmzjujzx7jictnb6u5qm44lqj8te6kx9my0kx6pii4reg8kj',
                component: 'poqtdqu20psrw26usnbtirq9sgtz3fw0j74ec1irfdo85rsj3cxfqmqvg4f1c3js9pl6yq617dglrve8eq2inpcfrn2kreo7asz0i0wcibkybkafujey1tw7vz27tl580axgmwvyarumspsuooe3tupi3fhc1qs56',
                receiverComponent: '5cpuwg5nhv3oxmbxwc8e4ka6li19az8buwifh9xzrxvirm85jgmr41bbxoprk5fzmzmdmkekhowjgtzr6mybzzac8z8eou6xqb7fmszwx36t0k3zge1xg8w5pfy0is4gc5rog6ixd1gffcz8lz88p8r3z9kh3kup',
                interfaceName: 'gz0c7rmgn0p68xtwgnkbuqvnp782upgqmphwedaiqlpl7i4kl36q905aqnfyw6wc8pu0dram4kussld20no4ui3i6lmf51jozxcwt9hxra5jtcq36gwkg3lraro374fn6wwzsnojxtgm9fhcw14mggwbakkss6uq',
                interfaceNamespace: 'rmpj6hnx2etv2y9cs903pbir0vtoe99jncunt7ryb42lv7iln1yaxjsg9kqoi1lbpzo2o5og3robzhzyrp8xshy08arrtfosbie9mi7uyp64pfbdnzy9i8tr74uwk90cv75oug3gxguk9fdabnzg22wpcxxaeez7',
                iflowName: 'vs8rpzqw3n8c3bo2lv4ae2flay1co907g514kfbgrl7t8e0kz587ilgap5m0uuj8rj77wexedfy5q622yqsp0me2johoe3ulaiodwl9vf2tifn3z20r33stgedf2aps4r7tfi4akdv4rxhucjqm3944ni0g9eias',
                responsibleUserAccount: '6rnvi8pj1j1elfsq4xfd',
                lastChangeUserAccount: '5atuhxik54auxmxzt2qd',
                lastChangedAt: '2020-11-04 03:26:31',
                folderPath: 'zfok0s5lslom0ijnd67mfpkegpd5ivwu8bb5aibapm2ex95ydrr4zppfpezoeammffr75gs47h4uwxxoornk61qxjleibqrxah0xmeeh5vtttok15j0bzwpdwaxxa16fclmnlyn2nzn3m60la4j3njrt4uckadtmx8ie1qxug40r8yf43frzhv9z320p3skxwrs0mbdgdbe77n22ovdcyob9qx385t23chjt0x8wot9m3yk96hiek7ynr22zqc1',
                description: '9kd40kp3tfvxwymrp609mzwb7vz3d770llnhl01reconvjzs9aqao1goxpq300sk0d5rtgo3183qs0hd1hktufwwijpaynobvgvfllh3n9oerzksn7wsrr2jjs8j59r4svrm1a7ouzv6t6fzboumvlnl5sxdmk7zzprl9iykdwsnoh4dm5mr8s52i6yfyyv90hi2c30xljugvm08lw5rudw4ur9rvl86hgnihkewbc2mo9wcbov80097jiw42ip',
                application: 'nxe62bymeixi1gq4gma2kurmwlcagfrbexddi54iea3kwdvqd4crtz2zlfjl',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'ejao2g3cqno72jf7xrgnn923noobz0hdpz09do8n',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '7ie3f4i7y4lmcyki4z7ct7mo2a33jcdm56a3x1jpln16ca4jyg',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '28350fgjg7bnpy1l3jgx',
                version: 'bz8k7wv5n27nlneo3xps',
                scenario: 'cu5m1y3fa5dwriydtun9z7wxlcvfgfbqwjasykxoboavxfzhrmmt5a0wyso7',
                party: '3jtxq69owwfy6zerl7mrg8a835xfv4omkyc4558hryqv2ejrxtsgz8x3htd3c3nc8in8u9owbj6v31sm876bs2yha4vmo6j4i74wyks4ej1f8d1f35s1ryqcv9rwtha5b4n4ytbp5xqiynrxep9utzjekailn5ix',
                receiverParty: '461uy3vpsqd4khau41gr368v1992ya9wwor018n71upiqo8u94ef0ess3avc8wpkadvw9r9jitqfkfv4kbkcda4chflo1jrtq3jaukulm1v1oj09idmubfjm8qh0l2g75jbtnkpuydykxi0k6tbrt1l4ixi64y90',
                component: '20au8lasm55i5s3rua0evsxpz3sj86bfrxmlnosmv4ss6wp7txuzr8hu2n2qu8oe5gm766jthdfx9dmfrh3a74k1284zlg2dx8vuyzg20uyezxcpg90cyvax2gm3dk9ufhhzu35omhuiuos8e9q1cbv735k7exmx',
                receiverComponent: '5p6y47o7uft2pa5pzi567rnpl9xs19jqhcaok88wwn2vpmbvdu0gvbianl1607h52xfmai0iizrodv6ode2v0ty1ohcflc5khutgf913a9q5lvte5nrj3evl0v89ykb9mcln0kgbg1ho4agrp45u7vjl06cv6i2oc',
                interfaceName: '8ciwxa01f9i1y8lm16cu00l5k28uabqg74m0h0m52v1g1n2zzpm5omyoy1h8aajzmcauijjxi7tjcoc30bdsk2gu1o3y6vc2f9qq4vukzf6q29932b5722h73esjq9qopw73t82cmbxwblrdb1j5i83hpy5h0tpj',
                interfaceNamespace: 'yg9nv37wt264w5wglyiglwi7j9gud83acnwj41v4nvayd8vz0quxq0yho3sw8eej0vfygpu3hv5tv0gt0ubip2su2t9ia83qts76e5pxtswyb0reliotduia4wn1ed84kjnxkw4ja732n4cx5iw6u2bppxhftz9h',
                iflowName: 'h46nnhxy001nm8t829mxumh5t4j2l44ufs762otct84ake74dvltfsxihys8q34bszlwi64v3ww0nz5a2nl93ml61leizw2hua0e27wdyi0f80jrba3rbbxm7heaegx7ku58vpzbixgda25xwo1mc04vbq8icpp0',
                responsibleUserAccount: 'nn23msraybfqwlbszc7m',
                lastChangeUserAccount: 'p24zlzjrknr85cg3cpjl',
                lastChangedAt: '2020-11-04 12:54:02',
                folderPath: 'rh8ovgcaoe28gcbfpzkkryn7xhyddj4rx6v76cg0mpzv6wlyt6m8zzjzdo1lipbmzawvmj5n8ywu0x83wo0htqm9xumb6r4eo8xjwmwbfsf6qpnymjnq8fgm1w4wytozwo56jzx26wpozxejdgrzf2z07p3qvs0xb880j5qwjjdti96br6at2yk8wbbdv88wekjknrw949yhi1ph70hj62syd0gm13a2qk64cp7t56p2phr9843s7l2v6554int',
                description: 'jfdc6ivcga1jazhftost6qkqfq4ljnxurdnw822chbc5t0bj7w04w2uk8yrn34ca7cplfn984upmvcujcos5ib5dtfvlmyfgpk4lnyyajx7ra29i2zn7awnuc5cc5ux8qyu87xa2i014futgs88hj0fox76jgb3tv6dgcqog1mbucntf1kj8zwat8jt6jhccz73zn7bu5wrf21muq0v9u7vev8wf3i51q52nrnd3bv6u1zl8067mq143lm4xgic',
                application: 'pax6zo6fa6suncapkbpx94gwnrntaiju31rkmxcecvyc13q119wjvnqmqpsx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'sdzjbzrb6qo0pomnyqwqlr6miianr1z4jrx1flg0',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'ctf52flmt2rnd79z0yav93vb9fxthlsj06ypvup9z1hl87uqb8',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '146wsivbha4tr1bvr7ag',
                version: 'zk869jd0jh0f0qtdy3tz',
                scenario: '0gvc3lbug1prsn20t7vklbwd6km04xbe16znotr1do29ndfoxj481ernqdsv',
                party: '9gkzl6dge3w2ogb0wbw5yonf6ysg9k74eo2flfg6i7xcbc94fqzazz8ajmczfkxks7h7me3qlyd3pn7j69neynuaq3pgw3g50z7dkdzqaq1okcv1w1y9c8qp6hcsxfeiyc2gxk6rckz7llbgmwdmzy0n6xlehjin',
                receiverParty: 'mpe0j08p3bo61bxkfut1jf1tcieuu7d7xq1kvj1z3635fifeln7atub4a50avofwq72adyrpaqlvnu5syck2t5ggdsj2vkxlkd1epsd0dpwbbhqxezst3c5jsx7sx8d8dbht7q20f6h7i29tpdvi96cy4jpnfa6e',
                component: 'tvi9fum66sa8xahtmn6hibyc6gxoppr0lmbc5gspu9l0p7tk2cpru4x5mjyv8k0pxdqeulqt5h4gnnmghmqywbhnifpif3h7lsfc459uaexyninnd9ke3ua9o9nfnvy2a8sa4495mzw4m1089o0ounesuyujsfxh',
                receiverComponent: 'tuxxawvgz5r0c0tlcyzb0vhlxjnztgt2z6msvfupujsw59czfqfum9y3wo7u3uy1dlxnlhrs8logfsjhp0acovuoxr8hruuthnzeprh8ygnd4kpoo8j2t7iwxp117c35woe7vzcuzuw66kc37r4j8u4pnzaogr8y',
                interfaceName: 'ry9euahceitodz4pi3br9r2vbiq0yeutolj8c5dn0c1sk2li45qafxnt2z0omgukkwm9v65dro815mvkkdeem5rwdtbovjjq25809u6qf0n16uwxm95qmxwtg411yv0azmyofhpva86sbxt61lgzo6jyetaaqafwk',
                interfaceNamespace: '4f7rjf8zp78nct47zcnfbs9sc9wh4qat7izbz80kqdz6iw1pg9fmdlbjpoanwbjwr48xxrcx738nvzj8et82euil3j0h75aogqibqwpq7i1juzyt8zt6gsyk2h9kzlxjqk1i67o4mq3i4p5mfdscujkdbwlt5phx',
                iflowName: 'ecy9m2upu22u63ok62h95uzxyuxljn9ahg7q2np5qd5ypotnfiiy4z7leiurua7402lxppnra1e905po49luc3c4pkandedzxohrtpq25ghtb0k48j26z2dzdtw6jr4psbhfd3jdqc0kzixv54qnxmesjh8axbn3',
                responsibleUserAccount: 'sfh0qkobrvo1uqeu3vz7',
                lastChangeUserAccount: '2g59w88v25ym792bsfmi',
                lastChangedAt: '2020-11-03 23:26:33',
                folderPath: 'r80c5dsohf1stb401gcdau4m8i7taik0lcoov2j8pd15t2rqd61y3ta2btkeszyx9yieofhrav8d3lmzp087yn6rit1wqor0a9bb17skqpaabmpvdztocyjyimn0q7n7mazkjcifpu0y6sk6kz5ywwlc3xosiunfvl4wd0d65vabdr8uuoydkor3cehowrd1d8hicktlzsondegx5r31errx942786tr53ks39czugm5v7n89lry57jrapob6nk',
                description: 'd8cnlc4xo0bfg4mgsd0ncnk4biukvc9e82rnax6nt1v7sa0xgp40pen0derzubn5mznom6abo9wvua4224v2tnkumib5u658t8n0ctq26re2vltycs6tt923iu7utvsqeqfy1j0xf1hoeo2r4b4mlfa98ffupmbqd9pzn9939e38aeyq3ulkfo4vo870m43gjzud23meeqy03uo2zvv23lzo1pkl0uf6tcmchosb1ykasrsmc26rt4y9lxf1oyg',
                application: '1tz3m847llz6tazde0lxp6ttgmrlgyno9k3r7rdq2n0txl17fnfh1623tvzl',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'yc7bygxcqfm1j16n6tti6cjqttqgiqoalc6llza4',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 't4nc9hoe3kx54mui9zuf8usy0qpdxtw0j9tbdyfxncia3rpyyz',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '97xmnox016fu5luz1ohd',
                version: 'bs5ffc470mcysh7wwum2',
                scenario: 'etzmnpl811vaqq8tlvz55ju5v9ucg2vlv0batcgow7hp8jyu0osell9e1tfi',
                party: '7fb1dqgaa7vtktegqc6ketcpuplghemtic59i3cbyyoynowinbnbrkoafxy1rc4rngfvmj7223s25nd5z5achowkeb1zcadi7uw5768nnogu86dzf9c056nbhh5lbvxaf1fi03ntfqpmgl74xas0dtolq38vcszi',
                receiverParty: 'slnhqnt27chbake8a4nkb76b12mit43b9ndz06sajcb5sijs7a8blveqmb9knkl1mcvgxxi5zrwxre01r52lzdg5dlzi2snqqceoo7qbk4o10axh7umobhsgob2egb9xx07ad6y9sfiqmctbs9nb0pernc6t2nga',
                component: '87medke5l3g8g1oqhp9ut7bu43nlatslty4n4q549lp1o4d7qmdi6mt3qp86wiz6jm4hrjvlifbvyuhpcupfx38b2nuoclu0l98urka016ay9z4ejibzhhv897kgggesbyn4cnoex5cjrn4d990hviv9u3s47zfv',
                receiverComponent: 'ibymdt6kwm6dytapo80w0a9rvifl3q00i4n8ev3wwg90h9kkzwcct8p1tqqpg5zn7esm7u4vg9vbzk8rgulv6k90lhbqe7xmhi3jih1xpzkjan6x93fpnbhgcym7d1an856mn0t75uc4dv9p537e9hialc9lyp18',
                interfaceName: 'onfcmqsovcjtn4nh4nvz29hi2ue7solv35r4m6jhx7cb6wanba5832f3uxv490jxtyq1p8g595gyjs4e86l6613nedtr6cq8uivy5f639iga81306vnmpi6p64s6juj5qic20d48bxfiaof7z14hr1y2yjqo4rr5',
                interfaceNamespace: '8wvo0g2yo58idbqqupsuf7eiecn9b5703zq0261mx5ntw7th1e8qgi1jufel7wgone22kjnn0tub85oopzf6vka4qzm8hcj7dc7u9ehqdg2ej0qtryc316n9uxeuu4l7zwv2ed9ctc3gu8nwozk5qdnj57fv1vdpe',
                iflowName: 'z7c4sss4ejp3afvskn7jdn5zt4kuyv9azob5w4y5qlox8jb5iqbq34acm9u5i4r3aaxygcr4jt09oz8027qvibyoeebnfsjbzb8o5hpi4sjpbaml15ng3xb2oagr6bueroz5migoh27elok8wyszstvn99ol4eq7',
                responsibleUserAccount: 'r3kcnkamgxaae5cvlwc7',
                lastChangeUserAccount: 'j6a5zbfoe3vg66nxyfh9',
                lastChangedAt: '2020-11-03 21:56:51',
                folderPath: 'a5p1pr5dp2xc0yhh16z5zxembqrtvtu8gyak5vy6cs5jberlupawtzpnjxe2a3fr7ik6j848bbdrzpf8ju5epckq249k3vjnsi5jjtprl9n1ypvlydtyrvwcuzjm93py21bxl3var7belzwft72xjfbmuzv2zbns507yyeox6a4gi6xf2oak7y7mohyiele8hqkl6puh8wt3vov8dy39zwad5lahom4yl85y7rzgbt2umh4kcclmj7dkrbkmlp5',
                description: 'dy2hcjmw03jw6qh9kutco0hz3v89pbvc43qz92qgi5xjxe9vohajld7pzx7bweik9ei4ispsaeo4crxrm2hlu91jryeyjncyfpc6iwj892ubh3xjbkh3tljzrdzghmyixytmfxpsoh2zgn37lfssfdtdt4c71boonhe6iegeatsdf8k0lu3ptexg2idanx3fzrvy7rr8sfz19qdjnfws0pgpt4t68vqh3qv454kj903icok2ux5w4d538s18zs6',
                application: 'ksh5r10s3vjd7ro37etv4wr22fikvipdz3bfauh574we8uavxkyaszvlqkvs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'os4wfoz16wlhvw64ezinbi7xya2exjrastjbjidm',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'ztv5fi2cc7j1j55mtwb69r20kmhlmzlkvhj3rur64t0bis3bop',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '346gkyq5uk362vhbdfi0',
                version: 'mi8xi68f6adjf5blxceb',
                scenario: '8ntziijj57pw767i4uk3jn032pwuvts1phv49hdvqez6hg8zj5c4h4j8kaoi',
                party: 'ozw6eyuuk9xhpew4uvuf6yv789xxf0983dexmzjs34ezw98pbyw0gfyijpuzlb1d18mmekec0iw8eo29sd9445di67w8vlilgsswdpel8jn0mh54zp6l6okx8q7zce9vu7mirh2g40m4dap3gqsclw9svkvo64ld',
                receiverParty: '1mxdbpkmkp9x4el28syr26ojd9fi2fsoj5d7o8tk157ptf5ib73lbd1x3z0wp67gkvfs7uoichdrhzv0wknlz5c416ellzsednksnceophrljdz174x6cl2orpwkzcj6s1usrchmdd98lckyqeia5ubt1y3atziq',
                component: '2fl5kav6b4ujpeldvrxp1c67u5ab8oxjjvyo29zy4jmqjv86ghu57nq3pza3yafl55lp2uwjpji7n4btg75531w973w5fbgpvcwwcbfr47qz7vgbi6sn3s3kswy6ah4eim8dctu71yup1ron74m01jbst2j86thk',
                receiverComponent: 'hakofpuab131wlvnfcd7x146re0207uxli00w8ugzhiybuqwuzt4k7ejz72tjle3k337al6lrsu4t17r14ejw5lv608la2m0le2ayhzahcja5itrjinp3nbj1c4m5kszc0gmr1eiyb42pldzk28ezl28kq2xvk1q',
                interfaceName: 'dced4qgumihdx1ajfdqe5ft8759n7c33txg0t3r1rkupkzoxmudm8jq92dkvtrajks875de7q7jd929bnhrxjvi9ffd3b598gnlm1zcwyqlm1z8hblwvw3aoqhpeto4xl4br6rsqt73zu9j2rmbeqapyzjeomoci',
                interfaceNamespace: 'sh4e89jqps0bp9zpgc7dc0a75s3a1ekpgxrfrzcjrfho6ozrmme884k6syskgjrmpzcvm5vm4gsj7t9vhs9ds4eg60mljjket8ecqg9436xqkvz9t212v0l1aon8ygpnpplxwr3xknigu84ybgred6zcvtq4qb01',
                iflowName: '1cj360e39hg9af736vz0fr0kc0yz6m32sqaj8kgz6nkhpbefh8dnjt5c8guy9egyv9kshkpnmvj3bhaiq6mrqi1735u8lneafcbgrl5w72o5t56dsj4kaf0jfqndi8h1c09sewm09x8hpxebek5x616omjfqzuhmj',
                responsibleUserAccount: '5isbtm7ckzppcv7mrbpe',
                lastChangeUserAccount: 'ijkb7e4jn3z3ogf1g4hh',
                lastChangedAt: '2020-11-04 10:04:39',
                folderPath: 'smh5aloaemdy2quafi9z6g7yds80i93tu6kkax2wdyte48sbk0mygt5zrjo3tucfiyxpyk1mxoij5d5n0bzcz9dhmlwcr42qpk59aw3idldkds5wqhy3a6zqgxdmt8b5g345n4f8bn9oagj6mo3nzbk8tdl0q6uw3q81kmvurlmjpi44u0hgps77gdm9k4o8lppctxtcx8gvvzkc2tp5ku4u9j4bdtop5905uv9v4vzqjs3ja2m35i2vcmvq7fw',
                description: 'vcfmct9j4hr8q4tvperfs4bw3gst4y5x0qfs54al4l6k30rgvo9p7pek7akt4u5jtn57ehkv53llif4xob227yipjkc8d671m4q7l3ub6rz3zut275kfbwecbkmsqro7lisp8zyhul50p8rbxnvmf55qmxrqf6k9k5wr72mnfr47upql26df0144r9ai4yw2x87s27bjsbed63w1ldq7t3j5w1lih4p8hr41py3ydicujpvei8gmgmprs8vt6xo',
                application: 'g19ziax8kim96vxlr1u6fbvy7u5u00p6id01wir1rb31ajzeogvhf74kz18y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'poxebqkk7xqjjbcpd7ltnybber1zv16eydxlway4',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '2bk1v57yls5si6uta53o29j7ynnhv67vok6l2187ojxmqmfepc',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'yfq4y7qmi3uxuchaxjzn',
                version: 'y0sujldxyywtkw5f3dry',
                scenario: 'zrfmaylq6dnh5y6zlyprheesw13uvsyvrxjsm9i2jtjaceyohl431st4iv3d',
                party: 'yolbbir8ls13lbb6iy5cexyttuuchsozet0sw8zfeha2gizjmnz3a6ilczx8mww8xqgw2kg5wa1951dks61jt4viguddb6u6zwu2qc6tsllacsbvrfau01vy0py1buawicobnnqci5ymqwzhi7fys7gujgb6xak6',
                receiverParty: 'wsqdykbca4j5yegr8hvxdab33mz4q2bn5bwt47n4lck5wcn00r44v3xttg8efn8cq4j19lft9igncc1gyqgh8fzs9dyh0bdz29hubrrp0ac6tgqia4g2h55sma9xv2iw0js7c5rixj8euj2x7mum3sizcoo1vhzg',
                component: 'enm2lfduxyg8zonqbpqqa8c1j8wk8ydo5r7pj7fxw7kmv0yymztpeqbwbvcys56lblq2t4pot7nsff0xvlvut4gl3fla1fqj4ebj9xvvlk9t31x8y0nyjwzcoskrfqxbimycxngzze7g3fd66vnyqj50grvckutq',
                receiverComponent: 'j340txfzvq4brqm00vawek3zbndlo6kloa5wfo438mowtg9ow3u3nx7fo3gk4rscf5289fjxedrmro000c5fq7is62wrzoex9jcgx4ey3uc5m6esr9un1570s8fjj83yneko720gma4o2s25rtajyvgfz7bud3wv',
                interfaceName: 'p7z9xcz3d11dvomn2tauthtn3vu7vreqd8rtxr36jvt1nkvysl7p6fhar3ovhq0gprb4n4igtr4v2fasj0f6kjrl6485ibkcpwt6iq8x1s4obe486jzn3cl1pim1tay3m6twdcqu4rm9poregeviqunpirlzduzg',
                interfaceNamespace: 'm78a28od5wad9jj8e5rmeh75z9srg23i54ndayae3oq18m22dowfvqv19lblwl3by5jups4ptmwc8hnx4x640osgcy55iv4196iabxvlrdxrbmhcep9yn2s68vga7zzoyjb36di6bwstemqq4kl5ukqbr24dvygb',
                iflowName: 'igxu04r6jrjkvls0ewjibwjjrfx64epoqjmud7upqyxxippkbhm30b17dx8agp7gs6y3s4itybsh3qt1ibb60nc6sv1aayaglfo1q00ex24r7fsvgtikjwb9ce7prazmc0jbuas69plx3z55iegalzh5i9e0t15u',
                responsibleUserAccount: '1q00wdejest1rt1395t6i',
                lastChangeUserAccount: 'nnrtnt6u78gc0fwc1mup',
                lastChangedAt: '2020-11-04 17:36:32',
                folderPath: '4yes9vouik70k8zpnns3l5l5qp350p7c8qf1a9sgrrhrsw4xkufzn3zwk8hobphcz428kn5oni7mk4ai7ixyhtml6sl49ixoy6a301gt0xh545jb759a6qg2nxlnsp6oa925l9t918g7i6zolouhu11euoka1un4nfoeab9ovew84odo08doug4mcqmab1p8idql3213o7712de52cam39vke46pxx3giqm2ziqwlyf1erk29511pols7dzqv9o',
                description: 'n96t4hq87mh4xh4lev779ssbcsvhrj0k534tnhn37beke6j553qwzt1v1olrmhx2y0hae84r13xw5mn14o3cx75wkq1lmjb0nc0qtwmxvjbhiy7pf0nmp471n5ve7iz7mib275q4ah2n9xvpepmcesxyf78rfws6y7k3v2uazyvlos2wbv9m69zcvxu0s515kyt6s5jzgpno368hujpao5k64qywa5u5z6q1y8n08q45u5rk74hbceu3omjk5s8',
                application: '1naogk0uoapfuz6pxvjogmx2t4sgmggzi94skc0nrvq1nw1b26s2qdz67gjf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '9cpot516amh39c1zoirm4nzwobgy780cxsjipsh2',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'gsn9lsgcrbqv6sh6ycn1n54crrdmxj92mymto6r0desqbh4chg',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'gks0urq3ne6g7w15yfw1',
                version: 'd4sboon5nns5azl8n9de',
                scenario: 'w8x3vhmvlwxhuz5owss0f2nqmd3ehf7y9v6smbrkx270joibqccyrtano13z',
                party: 'ska8bi53j4j6rxkfwl1arg8ixvf11lql310w2r7njrp9vxstu2dmhrde6b2b586u6b61le5oaao2gnm7ijbmv1zi32gao3oo12s11bqa8aphtc1si6i5ofguojrmx6kfnoahvgwf6nv1g8kd1zme504z544zs2z1',
                receiverParty: '4plm19drjtr904kk2xaxcz1117gqoadh1kd9owqh7gahlfjrngt8szqjjw8vkk7nx2m13mvv6ckjmmf5rc2ictnxc0dxu37xkx2mly9fyxf501wgef3ffal0mkie9kqrfuorlbgoiufxcr9wfho83lx4kj46v55x',
                component: 'hrgethqdjhgy6fai27pudw8vqrytllgv3zoz3cidous0u2k2hl1xrvj44hamfb3azwq9pbv627s1xq9g7xqum4djj1aandiilhaamyj0vi4f9ludf5mbfo89dl4540ejkcky8i2g4zdiqfwj1bw4519g7m65nxa1',
                receiverComponent: '90sds1qou5w9ts6mwadfwppmtejioghx8c8ytklh5q9i2c78d8og1sxvlpdt3mtr86p5kuoueugbauxmugmpjp6d1v7hq5hjvt6v5obb5fioi2yms915fi4za9qglox6ttxc1kipezu49zetkhpa80kt8hy94dtc',
                interfaceName: '3ouyuqxnqvmwopvfqztg7g983awslyqupqgx7mvp9gq3k6ki52oa6e0u1vc0xwwjcwzmjo3n6uq67r05izdarn2f2fj9dahkhnnt90p4z2o4x95r71k25mc05lwzajhowao9ecouisqe2lbc0sdpab4y5fvmvp6g',
                interfaceNamespace: 'or4yd8iomp3ehesje50b30uwstst8735r2z0oq5gd4zr4d3yjr4tnl7ts4b33aiztidvtmvjx7irs1rhqroq5ksesni9v2nck614xanb8p5c5gdtoqff1zx1xurapbwintfiok590neh6t4uiqw1ty6js5bpj5uz',
                iflowName: '2tdy4u8tm18excf9wa1xhrj1vxx5mlkcrqkitlbfjlqoal1ci8kq246azlih50fxuv0pby0rm418xgl6aldf6xqvu33onmt7qoddb20bxiodoua9eq6dbwmuxld1bzsjtrjbn5fi8vil989o4rtoq825f1j4xayh',
                responsibleUserAccount: '0lqr8hei02ym5taxaxkt',
                lastChangeUserAccount: 'quikay5wk24nhopp4kxy7',
                lastChangedAt: '2020-11-04 00:47:28',
                folderPath: '08e8e344moxgr3wlwq9b5c4incy7fqogfvp4tzphwg1kfkvsanl8bn63u1ggnqy7dnqstwxq9dj02wgfgmvvtdwkac5az4ku4jl3p16d284yx2xwdl4mgc3jbjn01zxvpgj06dypr3ehy6lkfmgyuz843f16k09v999gneiaq998qesacluf62vhbx9kjxt8vv0jy9ozirohqhw1ykpx3gvi8u1wl73y1htydsym206zdbrwlywdtvgdzdxdbhh',
                description: 'xw5xqsl6xdrxno5h0zvmdddi4a2lwaebvvj8ak419134i6d5ydagtf7w30mbtgex4kr5wn9xfvep61nmf3nlsx47e0t5jikiropejuj7tvt2getkckru8r1w51cf3ry0hwglgz6zhf171h59lt2vmy6s053g106zau1ytqv7tipfpgny31mucqka8bmgds6b3g7avbcu1zjkypvh9w4tvckki28cy15qhwj3cawnftimjt6crszhld8ot6a4sp4',
                application: '5nric1mwuy50rlc9gldcpvvvh54d1efn9te80qtto4decut9pjktapi50oq4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '2x5tc6mtaguvm2htumdn9pet393voz88557vuuv3',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'fc8t7mw08ugpldwusvys9ww1fboqqv7iomdiokvu1zskdunzwk',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '9rs4k5ipic5ylrk5mfsi',
                version: 'faq2hl807dwuwaou0nvg',
                scenario: 'ioni837th7n84q75gbjcgg0bvmfkec1hezfcikzyaynk2v9o3afc2j05ztf4',
                party: '6lxubpl0bqvsw99sfvt6zy6mmsj05g85kng24wr2rwlwpkhbs4qf4ltexkdhqtqogfs1kljhpxisqthn6t6pm5zgky02z98v1kaf8s3gvyxejnrhcrv0c32fo8a9hgwqhu93np6cpm6ivy3a7134zjkp2us7tua9',
                receiverParty: '9i0qlb46jpue3onoq2rzrgz3t7mrsvf3gz7hyaabkyjld65yz5vdqivgecvwbkgybzj3s7fgrx2tzkxgj2p8v03wmdsskr2uwkmk56wheewkdzfsfemsw7dxh7c2gh4hvrdetmq4wkq7w4flj4svuu9c73lywve1',
                component: 'vuc6lf7nl3gsxwrf5awub8tixvr9g6zd81jzyxh1i52w2r8c6kcib41b110zwb3k6d7pid047vmwv4u8gas9qj43hxo6756vayxfy59gjt7giqwkptiux7oww0wq2g1v78dmike2r786bi8u4r484fbtoga4a191',
                receiverComponent: 'vuinxu78pzs2y0jj8ud5p2mlj4re7w6keuyq2v3s8kez7xguxuc3nmvj4dadzi7lbgmapc2omlqm0z5k7zwldkrtopvgc7xby0rmoufb43dxtnaz7qehzpbj4ns54ane2vsgcw1u0c5f7ixh2crkpi7sw75j7sh0',
                interfaceName: '6ff4jnff7koige5yjvdky96ihdmclkctg8do7melp93110ve8hrysyp3ryynwjaduco4eiqeo7n754n7r1fudw6qzkcl2yjvvmj92kbof57ufgtto6piy521jd1a1wdcn4345bmsvi1avhn22eqapp2k2p3891po',
                interfaceNamespace: 'ztes1z64b36pkuhnplzwcmdigbnlvvrm1neiq9vyj3w3ti8ovjcqj235to0veczfyl5oslb8mw4pxkf19qb3d17dyeu665ua7ffh4tc12loimk6i3jnijvnig6vx7ntgo9keph38imxoah9wak67ib23c8rzpbp8',
                iflowName: 'nmahus6o4hcjvus4by6064uvxqfxb70szqatdnzsg2ipbk45v91wduxjbf18luv9bexu79k5xfynai1vszbb7twou2zjz6m7w5g770pozy5hbegaw982ktse89muygrpghvhnnqqy2hkn7m8sf2x3aok956bt3cg',
                responsibleUserAccount: 'nhl7snz09kqrvz6vk44a',
                lastChangeUserAccount: 'fblhhqcstverghrpzkgn',
                lastChangedAt: '2020-11-03 23:59:43',
                folderPath: 'rek2zso98smc5216754z4j2btz35a9v4zd7xvuvaz4m380o85vq5yxont01stb0dxox5h73eyzzbijgatbr2lyulsarisemp4l1kbzhlz2u7h4x29jrdvctwtductukdw9kmhau1llo62hsl7dlghvs2lfpcew5qggerflvuqdqhpr0mkyh7ktsaf1wde5im7z32pe9yy34gzvwnn9gm4im3ason88kxgpg9blud3szhcpxoiuaxa12cwe9rspnj',
                description: 'w4r7kwr4o9fbc6w87b9b0bx1uzswlwh91g1i4qec5l4cyg690jut3z7ax73u2pu7j0ca4utdlnsygedzl7f3czeijbppldg9zjkduidjluuxcamkj35ut6mhd89zm2kpl54hga94bm3472dpczf6b0mnt9golnrtvqkvxy9enmz0bok0ylo2gquzuefm993g9kahys9xjfqi0bv05yoqpaxur4vvfcjungxlq4fgpaps1kzx961237kekegwm27',
                application: 'ppnirna7uqlpwy78gn4ksa3gql5z1jik5e6fpgkilkyijcfbo5qxb3zl77n1',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '8agyp5ooke9dkqt5ej97w3qxsdi5s6dgmkk8e234',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'ws5pp62n0mkdzuu1elgnuq0apgcnzyp120qlgto6nq1zg85fq5',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'gqybellqvlmg8x4od4j2',
                version: 'p7t69m3hyai7119711hf',
                scenario: 'fc2kb50dnxx1uq8d5ufgw1xpo592hx6y21gpvfrwjjlfx230n3f4op82ygpk',
                party: 'dejqtjykvfjpsyg377m142vpw6w65zym03v9giwcl4yf227qoottfdaxfpir20s3ykti53wfaa9r8n1zpr42zi8130gnpc4qabz3rtuk1k69v6haii91wmg16gfk516pznx27x8etz7tm5g9x01pjjb6lkkbftg7',
                receiverParty: '37c3xife1lgsiqmsm4axno5fl3q3apxswh7xx3y04qxpf7b4zzza689zu1v047w8adimnbjranyjko86nycov4tgppaaa2fzrcuiec96yn3dsm2n5yqj9pj521548lq3s2wxtopagp3hle738v6qi2ya53gua34q',
                component: 'uwwohkyfztbbhwraq92r2mg4vqk7m17e6cud3mabs5hizavg5tqfi3j3r4mzj3g02ga4d2v58sidpg3a81nw1iw0ptl7gpi613gtfglry67jmiq067kn3pgkjss5tmtpzm2z620dzc89wrwt0oe4s1193m452had',
                receiverComponent: 'tfkn3huppc5tjgmawv7k70h4bgrcw6kqhqt4oefy8aodoc8tynza94r9dbqmbx6k9avdwljqqx5j8n3810xdbh7s8gavrlcl6nk4x4t7459sdhuug6mmbss9t2b50kt5pjgxl7ug00g0zxod0bnm60w00rnowh4z',
                interfaceName: 'tck9hvuc0kkt0nvc9isexqjmc5tex0cxt0399ikpha6apant8p0u2uuasl836k35quhijtpyfklrlnn7gxrbwxkj8320v1cz0dcs8iac8cjrf0zic3n5mf0hdovhjp0m394vv6h4z4mytg1o14mu51037bxxdmzb',
                interfaceNamespace: 'gzfv5wbdra3m3org6z1mpi64ouwdkcklyc45cvzy2mqia0hbytkbj5pbl1ngj6gpoh0yvo0btu9snwuqkh2w2pxvmztrgslinittpu96dvuxttb47yzai7vpc7sckip8448agg7iet9aa5438ppdnqmjw86g092b',
                iflowName: '7l2q00dz2luv1qqcokzps90d1clyc2h7m0hgn2ahu50squjp4tuysuwh84n7z8hsx3law8fi4tz1i2ekxtcd1ion22h0zp9brjrgtm6wj6dbqwj2m4phg9ac07u0wscb89i9fqjrzn96bexk694m0h075e98nbxx',
                responsibleUserAccount: 'w014f6dlrly0j5s3nhxq',
                lastChangeUserAccount: 'wfg2jui5aqyee9pq4986',
                lastChangedAt: '2020-11-04 05:03:02',
                folderPath: '66xu5rksxh1qlxqqnao5otb6zjqc40623llmlu3zorypefnwzkqn7xq6hnwblm1jicq8868iml5zqxzgzn9272sbstrr5s4f7aj4n83oni0bkhg1ytfjtvmr67t8601wbm9v5y0mmor2p8o08u2ip3f1hhb5asaai5grar4af49dnuqi5k5fforbdbygqxsv1f18nxkcnh0bypbgrw5uwkuhhoa4fbmukyuclhbt1ls0z4yfxms3z2e6huhvv69',
                description: 'ih9bunszfipm6c9c9zbvsamatoomz5uue8c1mghlik28afbvonhsavtym42hrwo109somm2xkqrxteu3s1qkhmvoh5fl028xy1k07lxgcu0sxmhlhe9sq9s5thbhxovrb0q1q261ixzgrygrlhfvhdte8impd8qvygdd2cid4qntoy3hakkx97tj4g5nlzofkwpprvmlsrnatoiuh4dkwl4w2ckkszqx8mp2j1qewvetd51biku1hqsh2ncejarv',
                application: 'yryqffths78q1xk52k9mndanfy06p97fdxxn68006k5cbdtrubcr0e8beu63',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'd25oo1fhcsd6wik1891k9c3ioraxav3359k535g3',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '116erxb01qhn8m1mee5tdio4h1rq3i9lk7lptu8l43t2amzguv',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: '9me7b75ftvgjp4zyyma5',
                version: 'o8oyadrm1v5w3rpjo3il',
                scenario: 'nehv47ub7t7egnx2yrx6du1wahvt589rzb7b8ei7tzm2ofrdcrgkptxiw50b',
                party: '6vjazlb04uexdm0yqm5jtta0a94lmawf5s1re7us6p6awlek6qdqsjercwcumn4fpv2t3z4ktljuq1brgbb8hfwezyaomcbzin6v91x1sjjf3fnhwynb5j2kscqaoa5hzneo2av6q4evcv7y904sxdo4t28nuyiy',
                receiverParty: 'sk1o0251dro9fvh58t1u2zkbxccqscb2z0puelx15nu9amcfwp22b4jufg5h9od5cc9d3nws13yn1d277duftaf1e2pk3tf2vrc0cnaz342l4t06sbv5hivl3fc00ekymyp7h9sxu4ktebpd4p4q82fbkmoi17v1',
                component: '0wigcuncafbfxyxkxks7ndj6wrqhscnl15578rp8bpqve2ob5sg51izule3okksh5zptyiwrgs69how73wluaj10gx69wkpaa2yofdjc0berj0lxc5zolgzwve2opq2a8cm4344rhfvjf54gpx0reofa3snhh9pj',
                receiverComponent: '69yrhufbirrxk9o7elqksmoafjl5xe1g130x6je86j3vlbsy7navw3xqnuryjw8yrxc7n36fa86o6z7lmk79u8vwuehq2te0426uhrh6hfg8gi8tkla49zfawlq599rmjs5jqpypgk9yhwyqqv55497dyuhntrgx',
                interfaceName: 'dx7bl1783l24frmxthf66urtea95hazn5kzyl8963345in7ilq9dnude1dzmqqwaza8ghip80fls521v278zllt7owobvc35yw0d7lnh28rvdbkv2993hywudj7xot5msc12kj5wn9zfoy5a94sgiubefcb0u4uk',
                interfaceNamespace: 'mzsc8mv4r11ho935kej42kl7ri98as779m8vm8zrv3qecxs74xe4gj4e8yyqyeiyv0c18zl5xhnkq4a81wjcxuqe5nae1vfsn1yh631bvqohdokirshc1x7fu5mevn05ti86ez013i494xk1a5ualiazcfkx8pxf',
                iflowName: 'wae7osc78x3jvjjr21c0lafvbco17t9kllqqoje8mtwa8p872xklsfyg6l836fnjsfhjg0tchj6q8u3mdtm52o6t7x9js3buxabcgc755qe8v2y83zh1dwsjqaahdg0aesg7zb5laoux8h1i47ckc0mk2pvfklkl',
                responsibleUserAccount: '72z43k0kkm9xhuqo1xl5',
                lastChangeUserAccount: 'twbni264s2dl0qsfiq94',
                lastChangedAt: '2020-11-04 11:43:45',
                folderPath: 'w5m335cryfcbcskdc7nqwtupjn00emmegadqlo4apg5ey9shk0lwxyq7whdwlg15a1s0hgib8g5a23xc6my11ncuc81kcu4ahh7ox4inp7uv09kuix8jwd7wk49muor9m8eu2xgaoywogsx7mayv9ty2p3qes0hhc1sjaijz2azjjblyzumryws4wwjmqhccsi1vrthhi56s1etfjkratepsb6zlafi8j4wnihxd3avpdg5lfig5y428z09isq8',
                description: 'rzgwos4jwxy3p987cakrxfy7ak3dlbtbvbsn9z1ybm0aej9hiblwa0nnkilderkce5wv6htfvh11jyi2l63hglebl5yknx9ldweemx3m4q0wbdcesjobjm3j0x9qylqqajli4ulwcjt5f4q6ztr716433hq1cmd7ktq1lgt23lc5vpj4ga34cbn2dg4y8wb7lsv0dl1mbtp7tm3xqmtcx9g6efb88qnsx93n39ytsykpqt0wdagzgfty8xjnoc6',
                application: 'vgwz76sh671o0rsj26d43tqkh496yohd6ceum6q0fjfnokitkvyeb2iqblgvp',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'ke5qcchmj2kxzttqb09il0khxeh1eckcha7maaxu',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'bou39uyw1wotf9pc7vycs2lddrqbwl50oyu8jtbkhjt9n9g3q7',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'sj6d9tqx6gm1dp79kjrs',
                version: 'f9rf2awlfndrp0ydg71r',
                scenario: 'by2jk2kioz8hlk8qv3kzbc18119ujkr7ap68xedgyd8h15u7lpkmz7sjuaxn',
                party: 'q5e24purs7ooy3kh9ob9owk9crv2hk7ht1m99ttd84wfg41gi8uxa5jyqocyyteuua8lbtc7cm7vppkeam52a4hd44xhkbagtijq1169wdofn36osb6lsaadz67m1a2zyfasmpd9mgddem5pssnlzlak30p10ihc',
                receiverParty: 'enukxppipxk09vpjmbneekd5iix4ke579mfytt0ipj6wm5eb3xa1egsponr8xt8ia5w4rn70etean1frjni8pjx09650yr1vnbkts7qdwco0oj759e301b9erab9x2mrviyfhph1ur7rlxj110lsm2zx79vmfavh',
                component: 's07kjg166uolkl1hd42iwa1r2zg9r1icyx1l3tolq96c3o5vdcdnt69dq6762llx2zc6psvv7p1edjwq8u3wxmlyacint2w9vpj6w4mhnatsmoadew78ho95lzctdsv68c68zup1skltxa2zbl69c8eyzmammqgl',
                receiverComponent: 'it7jy7ysv2m62v7q4z1xmtjdrgg0n43gn1tb92x3779mu3o1ynh30hvbbvzx5qpa4dw6861z3rrv03yoifvgqbmlgv69x7knfds3unxnfgn6yrxeqtwldcgpxolsjt0yeyjbyerpu5a8r6p1hy179nc1rgfduxhk',
                interfaceName: 'iegomvqemhrop5v5gmywrlthot83pory40o6xp047ttas2fn00la1pf653cf45gqmrztxtjs4yid08cgdavl4ul9w1417oex240t1jkplpxigvkdkkdsq4hbv1qyk51smu99u7gxz8kb4a6w0lr3n6i12n0047l6',
                interfaceNamespace: 'e61r7c749kqgfhjwep8qirzkyiml6a0yghbzwxgm0z592or41d5zz9wm4cfs2krlr3ey4ed6ria2ec6bp7wuq1rn395i23pgox55t9w2t2vqjlmskq28371pyt470i81547q31hbat2rux7tfpgyke0qjiz4iib2',
                iflowName: 'jl5rs2xh7oj8rpo6q9fm1mylz6ac84e3u3969wnhju0cu39h3igbc6lfh0v4e4fw70hz1pfzg3qb1r6i6ikbybcuptet38aombpps8lv8cmjkeojjewd4jo8x4ebmr8cowhi0nft51tk7ll065syr4qjb0mddvx3',
                responsibleUserAccount: 'e4omvjvlg3hrcfr9095a',
                lastChangeUserAccount: 'wwh7ft3t7rdbw8firc0l',
                lastChangedAt: '2020-11-04 17:54:38',
                folderPath: 'ylr5h9kevndq06uzsn7pxblwq053k1cex2h6seur4ut98c4n1ya1wowxwoob8z1vbre3bgr91t5aqi1iu3tyorbbl3a54l6s7v656xorzondi62rqys38wdp6ar1l99cc1becvweoam246v72eqz81r2lhv9trtd90lkc9x4bv7xe4amf246u2i7pjle45uuywbu0w5tczbosvzxkkv988cv0p6ck1iwsyupwz9k84hfo3n8xwwh8qq7tal75y9',
                description: '5rs06x9sy00banubjfsfhwsolvj314k0xp49ze89v2n7fixhv8j38l98zb8hfbybwwbr6j8g1bm4dry2fu1tpnhj2unl0g3hswpi8kg09snddmalz8e0r1b45w5iof26lzupg5ugua1bh4f50fxqneq4rr68hh66s19f43y9aqf3a97bpmhck4eelihe0ksu9weajlcirudjuyxlj9jnj9e03dy5es59m91700vnomn64dbn8semvzh1rn4kh9n',
                application: '3rly9zmuyq6q0ev6zobgz34k3w1gzz65e59gvwbbxcz9ui7e470osfxfajzm',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'ryztr608vb44iiuqbxl2r947upmg2104nnfszota',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '9x6ix00wylc66w7fdp5trurf1nzk0tw4mnmqqu9gg59xtc5x6p',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'do49b3esvvyl467mxf2c',
                version: 'e7oog8tx5nxgfpras4qf',
                scenario: 'ipytkn1i32a86u4aa9tj4wwyrfy5mkvft19fv2u1iz3fwdsh9kx3sj8b5zf4',
                party: '42xb0d201to0okimd0h71k1wc76gnesb9vgk99pw06ygcmvkxzm5ml8mc94ck4u40yb0npgyxgbym279s04hu9m02c9ru5ifdvrrytycsqp5r1g7abz44f3x9fjfxxb94y325trc21h1a3gnqvxxrlisz7tx1b5h',
                receiverParty: 'cgg9wntc66peuihofm2hhjcgy6euvu6ccershbc01uo7ha88hwv408zxyw3f8phym24huim2gyx1nml4p8s0x5etc63g4rae2euu6kion3gj99rp2a70s5e3ndrc658a7k866swc8kugntmixpff6rlnigrh634z',
                component: 'fntt5byfwf3ayqrqvyeub6olmtg3h8n9sh5qd9ma8ww4qm8ggsc6xbgsje8dyhb27zkpm72rtpocd1esnae4s2o0hfh9jlettph2f0urpluhocio6tcrmhfm5vwnbgymv5iirwil71qu2i1s334tr1xjiiypofw8',
                receiverComponent: 'gpgls5x7gavzbr2n9h3r663pfezdjdaer6l6r3n6aeu00fjxmn5j4zp3rakv8i5uijafqeizz24f33o912bfkvpfqq1xzht8i6wxaopr00194gdeqpff38173iim3ujr9lfw4005r2u3b1wphggtcaql1w0b3ass',
                interfaceName: 'uzokjsdq6ar9axi6m78d78aw7fx5qqoekzwlrf9vueo1b6mlmo877xkhl7xpz70t57yt15zl6sqwhcowfw4fp5snkubguz9f69cpie8f4pdq97hd1rz8c8yig87ybp7x6m1utz6367xvydefd5u1sbnkh9it48v1',
                interfaceNamespace: 'io59p4u0iyh840lict6yi21u1nek7e2edwh9dgahxvfko272xptmlwbhgz0wmd8ektp5y8ngt6hakxqnc44uniwd7q21ysmm5xeyx2a8xg34fq6hbi5s0x893cormmdlkil1yl0vl8e3x9w65z8w5x5t9ttdhz98',
                iflowName: '4jpxkdqbj0f3877hrplc81ervsvetgiwvpgfi2acticcpk50j764z8qmg8pxpj040l7g9upjcn9cjafwj2n1vfavqu9en27pqucvtauhwthfesx5d88hhbr9ppm5ocm4o9irtf291om5vwek51kn8v3wedxenwoi',
                responsibleUserAccount: 'gi1o3w9uy1el7vhohg95',
                lastChangeUserAccount: 'y56t33mv70h14phbaiyv',
                lastChangedAt: '2020-11-04 13:05:45',
                folderPath: '7gmgyyu3n61ugm76i57izjrlscjb688y5mfqgzrzl4g49qqehpalz0vb3fz3bpqx592hc853lm4tt1bbst2cialzfpkh2a67848r85l7603mwlvqklujz289uqxdileamq1oc4aa50iwpjzd72s9xw8qpb8xh499a512vnp66msr2n7cewxpzybk160v7tqdt1ytj8slhb91ecla3up5c3lbx2lnlvaevdrprsnx6mddjx7uwp5c0vej7f86121',
                description: 'ne8hrevkfuv813mbz9fsmwmne8nedx4q6wj9p6acgam5ioqjce7isc2rwf8fz5n3itr0w2jw9pov5dqvsxr57sk01kaniwafkzwo6q114dgjj38qw1em48e63m75z66c75s6yh8j8xjtp5xes8afkba9mhr8r0l5pfmameryhu8qz90zuby6nwnzrb3xvi3gghxv93rrbzl122kru461892lb7ddqlb8zmpjomub9wz0oi8e509kdbpudwogjuz',
                application: 'x9669v0rhicgfpj1pm3x7i3xwnvcoxiwd9xu3vn463dwfl4grnjr0hibyfve',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: '7jsr5uppkyk81p06ik9zmioolbcdr2ktsyp0rld5',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'f5r4yevlurc6e7m1dcq3juunmx3v84p3fovrpcml7k4al5jl30',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'p9pb28za39e1jfee4wju',
                version: 'rn4dyz2oiunrpkc6r19t',
                scenario: 'sk6wk5jrhhw0i40gnl8b9l7weryx81liw43poe71fq684zl74u1euc06tlgm',
                party: '8dpthzqjzhd5w6nhj2wye2oj2uykk6lko8r270662xjm0q5bve1zejwbcy4onbcswop3xi22iwtyybtjg64xklk6afgi7vzlv0m6za7mq47psp01mwhwsypl80fv8ayemes3mwl038t9fwwgo0gkoljtk097abog',
                receiverParty: 't1t7infdepipqr90dtdvp9tm9pdlq8527nip2l9ncc24liqgyx85y0miu1dorl5d5dkb0ecwstlsyjeomvh9k7t2reohaab1648w0we23xpad5r6o9c39vug9n3f6vk9a1qfkcsn9cuncp7xjbyj6sqrd9n8kpns',
                component: 'umom2hntnfxtcbcbzfd7hmf7i6k8xh66zgxz0g82pa5awspw1duzinaoqbcrhehrg64esad0peza7swum315y42bluxjlmgwwrz4ygemjrfy4x1ivbp1t22teeqqm1adjpkpsmwiakwe0jbxbmdywzwxji5s8k0s',
                receiverComponent: 'kn1004k3c7wayaal31p8iswjvvbj2zf8pp74moti2z697nflmmtgyhx20upr6rg1vkccv73ts8z3ei97xig91x17bg3a7x4gxm2o0vsqj8kgb4mq4513zxz6znoz6jepejx4ej6i4rejb05vcmeiiiqsp3hhekaa',
                interfaceName: '2eyz5r29rj4ynci2gxlq8wwjspsw0z8bjese0wc0sh7q16spra9d88w6o84krwmg8cdhyjfv1oj31urdv1vd2tk3drafv3i2tx6zadko2v2o6trwnhr9t5x5xwbetfla9xkl5snztalihqpx7hr13r9g67cadwqb',
                interfaceNamespace: 'mzq8xaqddr4auh8f2m11yq0u5yfu5mhtuqazsk0we5uq9jec13czgwina1i11rxnvzdkms10gcdus5v2jcur89o46ofyh9vg40zyyfgi9n1c0728a0vzrez484vdwasyelsi7l0c9obb4o8bg76oljuzidzfiy6t',
                iflowName: 'hw9lie36818q4irvdjc0tsjcp5xqji2auk5dpp3axnr5bgec7j0zfyxg4fdpz3f62vdpbawy5jhqjsgmczh4i5tb75ta948eu908nex7j2et4e233cm9kgu849awc0zag7efdcd9wp060424ftqlc3co5ixvjoh0',
                responsibleUserAccount: 'qt2u0opz5dwca35es0cy',
                lastChangeUserAccount: '56m26vgrs26ygyqg9tg0',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'r1irq3jfwmfn1ggoey79mug06w8565szag1divkaajuijt2r76axq4my4gw6wqvs0imff7swbdnqx1i4srahug701wwsmxnpviccr7djg2idu2vrf0qk9sotwmvrnbiv0sfny6r4wbpqw09yq528l4q6iayj2d3f99xqlh6vu3r5o1t5jv4piyfxa0xl8a8km158tm27d3mzk2w5kag4ljjs4wu5kn1hulnrhxrs4xqurcn91pafbozs1vygae8',
                description: 'fgbwgwkbvq01an1zozpp7wvhc5xelkehvsgohbbwnsl4koyk5rp2uu4fng30r2wkwv4d69zn36l1hln8e4vs60frli9akvz4rbkbigtxvbtzjiqyebsxrsy0u7ebjxeekc5erwx4vluanblhyron8pk7izwne4udjaa56d2wjktzbm742rgxr2va13h4g1lee32fs8qasl6a5ggakhy8crac2ma3x8u2jmc4yzxuisca25o16kpesjena4amyzd',
                application: 'bmsy608oqsyp6b8ewtckdpj3f7z4m9kv9ljejew67radpyvrvr2blkyxh2q6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'epv72449vgvmqhx80nm3mhd1lc2lemsb3fmkj5mp',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: 'v298y7pa9hwbfdsejz113wntdqg3vy6czrq1q0h2bowug46fm4',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'vknb8r52bgom2kihrpyj',
                version: 'hhy4zrma0ubpmymkevnh',
                scenario: '8vgyrzdohx4mah6ot7ujgqcutk9diioun9sar0q4jasljv6yfuzp5z4bjpwv',
                party: '1qlcqvykvpzkwjn9qhh7haeqzemrl6w5hirv2ixxj61sechhy1nfa2nt3agnfr1d7g1v7vyk42xqoqdedjyw0yiqhed9h5jf25395dpr7xrgp20m5n8bgy8ulmof579ms3l9t76fv3dusu5q80fx9fzx2akncr8q',
                receiverParty: '3vdb76kuu0y14f5ftgd1pj8rp83onl39qifrm7g1ayqmp0tqv2h6n4006119z6hekwh136yomrwn36ouaa5kd0ibvoz6ua7v2mr4aiyfn4j6t2rra9uvnv29ib63vw22af8rz1jyykovbb4mq2cj9v3ytv4s8aua',
                component: '4s38sbobmub9mv8hplgeep0l0eltoi8n145az2is8q33peakln22sts07ozqyel5d7xefgu5ynplv9gxgmpg2l17qa1mqfcd4s8un7h5ihb82f6ay3xfhki097kcltiuqd6a8zny30fw5fiod5yt1ebig62c77mp',
                receiverComponent: 'y2yopp7l3k8k0v6pfiqbajrv3df4218cpi2ubyc30orwm2ecp6e17iazr1dwd8throilphp7yk5a2vpx25sky6ddkababobdesjmptdajl77vy50l4tzjvl1kdcipjq45wvxe906nm1ncijnyk9jxuao57g9czun',
                interfaceName: 'noyzbow7olzmkdog14o71x0axinax6uwtd8upnk7jtacjhwhkwdy71lsfyfz45clwjtwlkelh8vc0tfsj82wxncghawyia4h96gglhbhdwrtfaesy0y2x8wgv1ymchizkvt1jvbedqv3asijdh5m3q4tvs7ctzic',
                interfaceNamespace: 'eu7nnol3hakffbwijb0j45pekezij1703xt19j8ac99mp8l2scqe11633sxplpscdun83snfa0heech5r6apoq0s4rj6ne30y7wck7jrp2wh0xrpc5zzfgsf5mwsmvvc946af29m7fp2gyaw3cqa6r5uopa3wnr8',
                iflowName: 'm1xvwl4ye2vx4owpytnhnm2j3ktuqiu6cbdfi3ylpfhxeji6m5a4o8bhsefah8ya5rzge0cf3b0k1pqrqo3hwta4rvc4fs0d3kj124mp6qf8bjcubkirysduuvnqr50l0f34fkuo4s071vhx90pvmlb32m0ni1jw',
                responsibleUserAccount: 'ln9dxmatyi65vmro4c9c',
                lastChangeUserAccount: 'd5x9hzonsadkk8v1bzbm',
                lastChangedAt: '2020-11-04 04:45:43',
                folderPath: 'q46zqhmmvb6qfp7axw2ylzmjg14qygmfhiguzw9bt31l602yhp294epx73qvaqdr3sgtz14q07y25eklmk40oidky4ipp1vp6pgzj31mv09yes4ow0a6qi0c2dnjobofjcdxyk77oa6r2afs096j7t61blkx5dpdyvmfkev2g3qsfhflrgawp6lkby1tk3imdp3fwz3i4w4qles5xilt4i602vp9njje00veo2qbrrckug7mentmqcex4xi4v2k',
                description: 'rgzlzq704vd0u7b5xe4vjmt6g8c7bxwcg108wlf79f5w84sw9qx04htweba0okpaasxl10p29jt48mwa8ysi43txda7tcx9ukimwtwkrgzqhlycq9fxwg3mxd8o3noe6cl51hletkkhop7qfrx8ev66kh2x565290y6adh7o9ba5yzfdk54264oomml7i7w1v9lzu3p05oo84rxh8rsw7pjlkbor0sfpiqlkfa65i623xva7p2tdsv2ipwa7cy3',
                application: 'h1qd6a7ymzc1izortqu9japp0o1eyzeh2bxgh6103yavrxyyq4rnq2gu3qmw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET cci/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows/paginate')
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

    test(`/REST:GET cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'e41d2727-75a0-4f22-9eca-20bf159a6042'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'));
    });

    test(`/REST:GET cci/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/59f65de1-8534-41d2-b297-66f5ea6acc9e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/c1b6acf7-b771-4aba-b2f9-d6be9507b923')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'));
    });

    test(`/REST:GET cci/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '38a3fccf-cb9c-4996-a8e3-b44282d905d1',
                hash: 'xkuwm8epfj3hzwoyvp0drry87nvntssopd5ecoky',
                tenantId: '6a4006c9-43ca-476b-9d35-f18f67ec838d',
                tenantCode: 'c473lp51zsqk3krgi956ho6vq0nck1fymflujh2fc4t9fm4lhb',
                systemId: '74a71f6b-cf71-4187-a4c8-c4661d071ba7',
                systemName: 'htf9dyugzwwafh7tpv6d',
                version: '59tiflv4mwf0y3vvmg6k',
                scenario: 'ah5vi1u6hv1auf6plhuey7hdmme39y20ydgbdqqe2tm4thm5f3yzfkhwojec',
                party: '4b7702vh87omvg05kz1ny8p80c00vy384w5207wsj6spbv75us3pboh9ccap08dbuunpbjvi9g9n9cggnd1zo2fa4z7b2sg7f2yymuqo914hqdpb7x5lx8kdfu220l2e1jxt81gfvqs4mcffx7xvgrrztqr2hi46',
                receiverParty: 'xvge8db9vbb0tzqou4makhcmog3abx46qmqxjd0e993kpmjj8cr5r5ynbcfevb8cygjyqbnzlkeph1gwta6ou4lk8uoedsmgr1f49s50bwiqsp9uxic8im07t29m0ih60e6w3je283hpo9000brb8utoqch370p0',
                component: 'sqzugaq687td0p11c0qxek4a0gov9xl9qmrn3r9et46lwh190cmc22kx5xob3j7l1w9wx4m13wps1db39zw0jjmm0833fvov8johmos8ykb6r2kar9eanrlhfnrp7fuooy9jiwvvw5vhqi5nfd55o8di7qmpubzu',
                receiverComponent: 'ljzmz3sl22w28oksikoavnu2hsalhwcd6yrbq5pwmsnyhqjqgn0504iluc2ym55j4o2p1bjlih68g91666dqmjx9y7gw0xs707at1x2y1mc5d1r68ahwodnanezf6hcfqh8idtmqavyf5r4lhy64a8x08sbers8o',
                interfaceName: '6gh1766xwjd6sa8etmnjqxms0uhz670lzhhwpzanum05o866m5s13s42ql0bqs0cdk489zwwxhwlamyhyf62tn4dypgqkwtztz7dggwa2bakveaj4qf5c1txmrq17cv0hg3ozjzxbqfc2svikm7oyayjzucsarx9',
                interfaceNamespace: 'maqw9agcskixx4eni4m90loa4dpsri17rlsc9db4027mzt0qke8dfzq8rv2su2scq2b6p7hqwb6zhzggdf41qv2zpabcteo2nop1x0l73wl90xr7986u2iuhaqh5wuho3flre3zak4f6ub1qdazh21q8qk1n60uh',
                iflowName: '54e1qw16v3tb7491f512vyc9vq9mqe0stjbcef4y1zxf4l0hszxb2vq9qq8c5d1sy836hcq542uadxo8ya79yjj2pk4ofg69hrst4iolkqyb60qn5yrum1a7dyhsrcvsn2zssnmk422gg4v2f6wigjziml07b08m',
                responsibleUserAccount: 'zyjymgy1oy3wovbz5bb3',
                lastChangeUserAccount: 'o127djgi8sex1u6afd7s',
                lastChangedAt: '2020-11-04 05:40:59',
                folderPath: '2kuh8tlpibjvlgx68ibqcvjlq9pbvr1v1id40bwyky8ungu7pwk1yiwsh4tars4bsq18bnhl3fqkyly2dt9nrr0348ew2sh4qgkk6xbo4yw8fykpamsy1xjdm1v3t4f5xv7zh2fnf3t1t0m6uxvn87r9ww1tm83peeuk5horwnqzvje4mmt2f4x8v3qrkpr6uischhrwvjp00jc4kymcdb824o6bsq3ycdhuu3zr8mb2olii3g9fdrtypwn4kim',
                description: 'mld0dtfvegm64m2khyj8p6j02qlk7tqn5hqlgorqonsil8g4l89kjq93ltilv3ifdceyy73t31bcabvdean2ff5zu361273b9go6z9mh07uasx7ortxhlkfad4246r9nh4rxyy5zoiz5wlb2lqkvrl2gf1rxl9sbhhx01xeckhwnpax8n3qr9n1snq76vdkjcaeg2jfg5ss1bjgefjslztb3m1kejxceygme72mx4nskb2oei2ktfxdr5rdfp5g',
                application: 'qeff6v6x4s7zeknh0my2wot5kio1awmgbryp53c7nw2xv3ysg8mmmyde2g70',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'ccde885f-3e65-48fe-9fb6-039a5369c0db',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                hash: 'im6pt5dk4mhq9gipodbv7cl12w23bg0tp7yyyx1q',
                tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                tenantCode: '4b7frlnp4xnn8nu72l3122u5feh3xtrruvtvmm0ff9df20ze15',
                systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                systemName: 'grf94sp8422i6kxlksud',
                version: 'sqjvwc8ka1pnh2vsdqa7',
                scenario: 'd35yy02eqr42ythd6gxuxdmfb0hcrq91tpwhfoqnxl6pj1mntqvuzjdo4qd7',
                party: '91pv4zvtzhxx9j3z12xjgglgkc5bpimchyopdtjyc5xea2zv2ku0kokl5v5y71kh3s6qh7ts26lpl353o7fr43mjgi2kshx79duhdb78luyqbfgo34lukvkbqpm53ltruelcdcwhy5k3umg2svb9bedhls4djrlx',
                receiverParty: 'xntjklyhucn3qfkt563im60n37e2se3he3p9yqa76hs68m5u3yr9uctwo4zbp3jtr0vl2dhlozeu0rlluet86eekx0ldo0xddk8txag9w808ecf9zwgwcrgeyo6k6vrsq0vicnhzms1blictat1o5s5aig9023ph',
                component: 'amipex4bnerk46xal9ik9nwg2byzatbwcn6was16du3958m5crghdlb6g6t8mp8fwm7dik4g8t04v3r1rrvbi0u9feva2z005aeosbf9wzacna1v9ojesb9j4g1lxn84guixo1hd0axcxvkm459os245pjub29gc',
                receiverComponent: 'vmf0przlpmcoggyaww7zxprtitfvgugbh5l3dn9e8d5hhlzlyyvm7rr0q1ry75rp8ae3vrhrqznac7v25vnv3iffo0wcd77t8ksoudjk1pnea2tk2sioiouwigb3br92pbx1ie75sujn22aqgl2nxgcmdnctr2c9',
                interfaceName: 'on3ddrbbq2a749i21hrdhntski94vpkrnk9szhlcqnht3blhbhkdqtvfqofl5ufdnovsgy3bz4oyz3ytk6j4r31a3uum85b3kcddpctm0qs7jvvuwc5hv1mmnt66rl7e047s9phndbkn5y08pd74n4ezd1hyy0rf',
                interfaceNamespace: 'lte3sy9y4u5dy7y2i1q5avbtexw7ajnzldy0zvnienz23rys10w9144ipyjnnktmnlencnp8tzdkcqksi80e5c4k25404dltblaul92rd37kon1rxi34utre7wgwqulfhodweyw012o0izzps1yxzl222ulqqj5s',
                iflowName: 'rgw2k4d0vigx121jhmmzszerpkfpzvlc6sulpu2a0me6c7pajl0tgjslc8o3is1uldkvkttqd7bkq361wbe6xi8mercbuwhf5wquxmjw48481bcrhewg65ljid0re7uw61h70c8j1kftxracw73jbz4o04bftuzp',
                responsibleUserAccount: 'l7zylvsjqy3ewon7e5j8',
                lastChangeUserAccount: 'zwf654iqokmocfwvit1s',
                lastChangedAt: '2020-11-04 00:43:59',
                folderPath: 'sbp33fk6wlychmltv3it438nkps4swgsaag13a74j1nukblp5la3z81fsrqdu3j0fo9j0enwvqa2o78fdutj09sq7klkmbbu4f2uq7af8jao6lxanyronqbvqtwyws24ha4ez6pjclgnljxh6ikyhrjgchklq7nu1yar081ouzb84bj046jmxkq9cietdd7wx839q9pwalibxxfqfmb28k0iqbzgxonciudxc5h4mt35sdzd2elqo7rc62k2ttv',
                description: 'pc0fcc8sx4iyfzkmvhkwco8s87g7ibae14z3zqiyh8ryf8t4ecqwyrymk65804c3ufndb8sun8t51skahgn0ylalaxk940jv4uarsqa05om2vnfa9u4kgzwsq5nl0jageov4ybeh3tlhbr2flyxwszubng44q0e2oq9nnlo722td9dgkaglls8z94y2f18n2pn1lwilmb0yhmkah4fr2pk7l8abzemuc7cylnx9v2kl9vwa52ts40que7x73pn6',
                application: '97efbf9r50dwtzu1pazynmuq4ivrcw748ay2ryus40q6raob0ekzqi19muvf',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'));
    });

    test(`/REST:DELETE cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/ee9ae997-f72c-4b39-b8a8-d15036e0a4cd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/c1b6acf7-b771-4aba-b2f9-d6be9507b923')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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

    test(`/GraphQL cciCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5e5acf40-dec4-4574-be5d-ada3fb356894',
                        hash: 'wj7r094y7p0ce6si155yvkco9aq1114914xfylt5',
                        tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                        tenantCode: 'cuh2pke7o8sa8skfgl30gz3z6okacdn738m2ymay8oi6dtnzan',
                        systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                        systemName: 'v4eu0vmmcpjur47ufhuj',
                        version: 'eaumsviv25m1dq46hfh7',
                        scenario: 'xdyxlcy00tr8fd16u5f6c2r6pp8ebz4i48tiwevlpx0xdz0irbjxqr1avori',
                        party: '9smjkghpk4d383689inxc6w4dzb5wg2uj48wmzt1ywjyqukp0du8gp4o2dmnnwirj2jmqck3zmpqa9hajs901d2yhy3j4pqum22pqt9auej5re8f44viwif1d4ylw4xz2qvx62ua9s6968k1qler8bl0oawnpazc',
                        receiverParty: 'tmty4zb5b0ej2cjk3ro0w0o57upiym9y7dpne2kshz0ygu94sqp0glthejfg4aapyuhoigzmfih2r2f6eicwnpykrk0q7r7kl85t6j7be6ksmmo6zfghlnbg9xqsjk66k4h6cjwvk7qmntpglbh71eu2x6mwl9b7',
                        component: '19xbnt1lzrzkk8ad2n0jxeqoqm3zmotztfg9l4qu02pkj236ltm1fwzge3lyqes5kh39uogoifbg8cyu8qfk558r71r2h1ofi1797tx2ut3quodg1kupngu6e80j06lbqs3fa144dtz8rnb77wrrdfm9e20pe435',
                        receiverComponent: 't8j2soro3ozbnisablt35q8gagt6qvtkhqepe8762falv6ccru6o6tzjlxbzf82mi7zplvl7lufsca6tu02qkkb53bgchuyholsixy2isi7pzpfncos2dxojq3hpdznh8dzmkal2a9vvfdrm8mwytwwbk28yhi90',
                        interfaceName: 'ctmu9v08ho03pbbwi0ue9t5ajpfhdobkmwkeyj88v1k8dr7q1fvgq6dgpvm5avks23fg9tguj57sqc8de6bo2rp0xrghfrlshsnwkd3br43wmaf49y5jnr9syvksqwf4lor75qz14sb0p63rv384044j4597ur4s',
                        interfaceNamespace: 'a2o1yj5kg2n3p8huy7ykme27qipzoyshjfrpgmzyqe7bpsh2zjz0x6vbky360s7y0yil9t5nptz4aldvwgejl4gwd86p6tb35x2snm29nhkxzfhpqfw0wviilmqo9jsagapq44ipzhenflrbunfjt2vyp05e001n',
                        iflowName: 'y2ch63efo9c264bo3ckabmrtew0iqf4wf6i95ou6xp6d4s7o9zos30e4ru9hux0igi6t72644c23t58a4ze5hxmnn72q0qfax2pa3oz6c9n05gov67lv4tjhlizz2so6ua17onr6tvx6aaodhrhfwi23pg798i3l',
                        responsibleUserAccount: 'xian32o8ej9qg84sccxh',
                        lastChangeUserAccount: '2vr30lsi5orppbj45yir',
                        lastChangedAt: '2020-11-04 18:39:50',
                        folderPath: 'pb4lw1124qrskrxrzg74f1o9tzoz81ni2gpyaviypyvamapvo5mcvce9t3lnmjd1nhz0r0pf7h2t3ziimlsol03hjs7nnrysvjrqzt9mysuur775u9bqkkrjrgmr1feu77zmkct1sptt1zlzzc8gh2b4fa8dcsexvnhpz0k3ojcdot55pwxsfpmnd78p15dfalzqt5x8zj84r8pwo7z4j4tv5dy33nt7fc21dkzzcnqk42u6wyo4s0d9fud8jgy',
                        description: 't69os5q8dksftw8qacjzjc93fn7paxj5j6lbja30u71h4o5uy8titisp4l6k604suozbazg6ex05ymz6to43sqsy75ypw6rzp9vlsv0y4dgx8mucvq2xq65sh4d23xn3m32g82c7dil5m88sw8utrh3ldo0wwpi0swjwy1dj9o0ywl3j13fypt5plg1ht99vugn2sbgnamfxruh2wr3o3qme2ia2i6d7btprue7fwdsk3nmsczbmnjw42oirfe9',
                        application: 'gayqhogbn6yd1s30z6sodq6z3xnqm2ykaql4b66m8e311vgqsenwutk9scxc',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateFlow).toHaveProperty('id', '5e5acf40-dec4-4574-be5d-ada3fb356894');
            });
    });

    test(`/GraphQL cciPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                            id: '66259123-7a56-4deb-ad70-a5be358f8a66'
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

    test(`/GraphQL cciFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                            id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlow.id).toStrictEqual('c1b6acf7-b771-4aba-b2f9-d6be9507b923');
            });
    });

    test(`/GraphQL cciFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '253e2909-644c-4660-ad9a-5a0827500821'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlowById.id).toStrictEqual('c1b6acf7-b771-4aba-b2f9-d6be9507b923');
            });
    });

    test(`/GraphQL cciGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
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
                for (const [index, value] of res.body.data.cciGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cf8cb359-0a93-4e5d-b5e0-37fa304733e5',
                        hash: 'a8q2zaxelfsybsf4c5jdkt3w33bkqe5rm13mzebu',
                        tenantId: '4fe05959-e8a0-4bfe-ab43-f4a09631575e',
                        tenantCode: 'retiyd5xqakr1g387k03nof1cegd9sj86fdz6d20fihtyitlq8',
                        systemId: '9e2435ce-39cc-4aba-ba06-3f8d52516b2c',
                        systemName: '5y8mhxjs9rjbu9kz3qxt',
                        version: '363y0je83g96o6v8mpv8',
                        scenario: 'hqx2kje99x5j5xrh4lad45p7m2r8l7ppyqg5fxvlum6y1y9xf5ngs7t9s2a7',
                        party: 'ux9y4264budb6z62nb9lm4oomk4rasir92j14vppvs01le46ylbm1q85csbxzdq9znz0vttvs7iolrvtcjueeeqal555zsfjiwmf7h5xgbp1x03djum11d7yibj4n4pfdecds6z50ka5l2tfm6lus60oq92j6k6z',
                        receiverParty: 'ylv2b46uvjsdj9aim3zgt7rwkjsmbgsmc1el43z6xogct9sa3d2vz89nquaes64qj30jvootx2gccitdh38aruxiaspqt97nnwjps3snmc61omgdrdsmvgg866kqtj2h12trh5vf98uwypwu7w2xholo6cs8m5bp',
                        component: '2hsmo7t2umgxwc4262dknhny25jxpg2dqhu6s9oo4xt9e8vswf5ptty5inyz5pbmgbaqgob1w35ik8ofsqt7zxfidp46nf7x092d72l7mwo6u46wffliy304wgqh7zrh4zhrsxp05onwouvhn32u4n6ufpl7ld5g',
                        receiverComponent: 'wpph9vub14sl1peji2t0g2kk0xhtshht4pyaaotachg9a9mukdvckt8hd6mck6vmdhe3iz3mfo2x939zu5qx9fo1cu34ucvmr15u9apb3w662u8eqru57fn5rce8qw6achtno8aqcq5drme2h49qa0hl47vte8qf',
                        interfaceName: 'uz89kc0wddlbzs6617h0dzyu0yuzfmzemiys1lal1vshf25ks2a28zw0tahvxdgg4qn7l4xfuhm87f6ngwip53h085992vb4pniyq4adb8lcmx0ueu9yemw86k6ghji67mu5xug27rhegpf1yvxg6ntdhy9ph4hw',
                        interfaceNamespace: 'popos0mnfsrdyxiuedrqcunoax1bsioliwd0n120wlsbtaxcvwedjbn4jvt85gvu3ydqiwndxxpra81dgqzjyk3m7tx6x7r6tzub7n5aum5qxbmw0asfm1u5tyjhvge89pqitzbrs675ygw2t8x7puln7ushzek8',
                        iflowName: 'cjzhw98otxma7d8aav662ubwpqz65v03xlt4208g51au8c2h7i4jqbzaomagweghilm4afh0dfwj93ufxl05xil0u444jbh7rrmqsrdpq0zujjg51b1tnovf86qkbmz8mf6e4888b2aqkjqg66tbads546wnuv7c',
                        responsibleUserAccount: 'vghhwddr1vtnrz1xdr8o',
                        lastChangeUserAccount: 'kgecn8ykmxiyqs3vtow1',
                        lastChangedAt: '2020-11-04 13:48:34',
                        folderPath: 'b9ddetthl5pdnoc3vd9ili065cdp2h2zxtpesfibafi7aab0nq5heet361t4p2uw6v9ma1sbu9oy7iwu4qjz5qnasyml56yba1alnuyd2e1950orcxn8cugksb0r0fvtedsmzouejly50ia27929ih15exqnzxsfwu4xwwf06bc3cdbrojprrekmlp0x4t26ti3mo5bojri6zgx6b0zr3odpw55y39qff7rogmdnogmowb9kuvjf8j89ruj2g6l',
                        description: 'psijywqnbsdgby9zvmchox3yg3afm5txzep5wwcu54roidijbhkm4fo7zgjylx38pyw64u0cq67dgbtfb887u2ztxj6r3817e27nlnjpyozr9bscbikul8zxo8laags6802843m9mx4q6xkd62xkuthznaa3fng0p4ra4gc4oa60zvbi9rdttygmz77tljaprbpbbefyajtt0b460evjbfjhuvhxw2va3axd1dtxbypckqx2ryjw5995cn89ibv',
                        application: 'p6uojlpra9ngtnmvjszrbtbyp615mqim6g21q6q8n9fqywaf7hfwa2pz4zel',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '0e9a0cc7-f281-4132-956a-7c3b524bcd7c',
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

    test(`/GraphQL cciUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923',
                        hash: '6v49e75rrlqojvi7n9gq6iy5i6unawnhhwrd3bzy',
                        tenantId: 'ff0822f0-cf88-4d88-a789-9e0d0ebc2366',
                        tenantCode: 'cvyi45y63p0ay7488ftw1d4q2t7kvov2tb0yx3359boy0khjgm',
                        systemId: '7cbda5b2-3a1c-4b01-b6c1-f2919a0ce6f6',
                        systemName: 'huht9sthi1e8wox1k2gk',
                        version: 'sw2yz0g066v1okr1052p',
                        scenario: 'as7wlv8jdle3vl3c6agqm7d32ckzq37kuvqwo0xrsmc6fgrl1i9ja3k9fnph',
                        party: 'mcor7qtn6gm0o2651avef0fu3ppsbj55nmpymng8v4vo8ochb81hvo2xycg4tv4jjiyi2kfs7j4myprtnt3yn4npsnyxtpn96ftb81a48f5dwrau1tvr8f39fi0bjt1i63gjwna8l85bsoh2pp6p5ammnewbk3rd',
                        receiverParty: '8n0ercjl23blp6oick6t9mmcvzub2nhlghychhuo4dbmskzrfx8gx7jc9yh1uerc0eb1ymm0j32uqqxgf1wst53gleojb62nxqcf0019sj6c7ya245pnpm6x7fbynyy25h9u3ztqrizkw9u177wo345gzdccegj1',
                        component: 'zy2o14lhlp3i9ffbnxa8gu3c955uttc4xpgmlxppsaxpdva56lcx0vb9eto0pdt3wxj48gn3d0q1z5ylmbfa2z716495tj3p6gytpdrsuzcespnpklqduagyhf9ywyk4rc0oy4dn6bnzsu9h1ae1kis91g9ve2f2',
                        receiverComponent: '7sj0gn6scku204k7x7vhvz9xfoqhm911e0caf2pqy30mco5zcktq4b56kvwksb3yw1bnr4ok7p5ftzd8ppad5aw38ztc04p4i7mvj3xkqsjqc21rq01w2c9rp2br5as353znbu0p18k3gk33zyrrtl92kque3ov2',
                        interfaceName: 'k8pas2srbq5jbpautkb5wailc860zkh928tq4p7e3y4n13z2jukn2pcmjcxd6apbylw7eqapjyio0ox433rlu1wtfgd3ueuixsspt5skmehcu4peseusca8sk62ri1brtypdcyhxce4ku6r99f038xfdw6jwzxj2',
                        interfaceNamespace: 'wyidq9naghcov2bmx1m2yhqmomrwkbz2eqmf98o61tjzfv87zxeouoltq8xntsaujzlegkuom14gwj01hx96m4hja2syubfn68ymtdw5bx40bqabvl30v733fjuyey1nfkmewi7utkyitsln6g74xf1hkfo326vj',
                        iflowName: 'fpqx3pmepzfr2rn9l97mcbrn02o9nx6yhf0ynrpu9m1cajmv2hv02kxfue7t5zhu9vrne9tfnwi44iee87pbu4bfc1hwqkazcizji4woxhzddia8yu7bbkruo7yc1qhduifo8xbb5y06s5qy6bqxuzpn9fuitqvh',
                        responsibleUserAccount: 'bded52h90advpcwjln9d',
                        lastChangeUserAccount: 'h6znphvzmq8syrg9exa6',
                        lastChangedAt: '2020-11-04 18:24:38',
                        folderPath: 'zs4zhrnio029155vecll5lfw8jctt9wzeyr5qd8fymnz3gp1gcb1f33j7or2guzsu2bmeaaiby2lgm9mm95z2bzzsueqsm0lsnlk5vf4sputk1mju87t45lscl14tau44qgi9re9m9loz0ew1prfttgerce7xreigutx293erjxzwyij9y77le0s2wactv6mskr63j1wn6qgxpyzcdx4vj5lboqp7sz0awdnadsjhmsxv8v02oub4awnguvv0g7',
                        description: '3iiixylxlxkyo6tr9ra1kmkdtr1y6ws7bdxygzq4x0o3n74di08jvugsog005228426opon8k4dwm0bevvem1ezdgui1axj7m316ckrgj4725n5jnwi7j6zo1fnxazzlhe2fbquxcoo976wnlgtwdls3ulse7goo70gi9saohmo2mzlrjlww4b10oz4isnrwm78u9ngiccom215u6cahvwwh9eljuazau9bixke2uk4j6u4va5sw5rzai8li5cy',
                        application: 'm5sapg53jpio6z9xxlri6d69iq3p2omkk9fl4nmi75ovnwpk11dq1iub4od1',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '2de31759-4fdc-4b63-85cb-54cfc63e8458',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateFlow.id).toStrictEqual('c1b6acf7-b771-4aba-b2f9-d6be9507b923');
            });
    });

    test(`/GraphQL cciDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd440652b-cf90-4d65-8f24-f2b5384ba33b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c1b6acf7-b771-4aba-b2f9-d6be9507b923'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteFlowById.id).toStrictEqual('c1b6acf7-b771-4aba-b2f9-d6be9507b923');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});