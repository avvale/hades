import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('message-detail', () =>
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;

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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'mp81vsqr6ktozegw9bkyje58ejdoe8lba0bsvyjtuu09f1sxfz',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'rt82qe4xqrqp3tip764a',
                scenario: '0ltvire95c4s1th9mwd17r3geidb35ktn7u5457j6uzts4gem83qmfnv92kw',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:29:49',
                executionMonitoringStartAt: '2020-11-06 04:21:24',
                executionMonitoringEndAt: '2020-11-06 04:58:45',
                flowHash: 'spglfc4hpfeq3448ufof1fpcmtttakvt9fv50oke',
                flowParty: 'hf4tb4s5vawvpx21jqvf7zkut4ycf6az8u0v4w9roe9z8956ahx2hysvm8qt7nld8whfh48otqgp6f17kqn4mo3o2n1yxji3iiyi61p5zflfhzrjnbdt9mq6lifpb6bd51lyxqsgpxxx27x98mnjvgs0gu07c5yo',
                flowReceiverParty: 'vbl5ss95ixkwe7wfsvfn3syt5i1kga0xj2ij4u2nend3w0x7jvhotunehil1v9bauuds5nexj12p6x1m3iw5d1gd5ck73xc41xj3d4cmj3incwg4k7jg2dpko4cw3no6w6j71mlkwxxyy3x8d3073db7utocu7c4',
                flowComponent: 'vb1sbzgcrthy9gj01j682cgcm95l3n4kd9v2t9re8okhki17fz4bglq0z5uz29swvn3ti6t0pnekbtwk4qubw8ft7239b8m24laq6ciyypdn5tdveaselyoy38o4t3vulcdlu93u5g9z0bhauwnpbgsqty7l0d6y',
                flowReceiverComponent: '9aveqc12d9l6anlz3z6jow2j0hk2zlyerdf5sob7ndetit2xg0kyz0mc6vstn3vyok4zyqid9hqadcyrsfr3qq4xbinciovnps37o4xiufhsjb9utgd0q2i12tvsj1ishp9ctz323a3z5p0lxgzh45w3nkkpu3c6',
                flowInterfaceName: 'i94vwg1yw0gfhz8zava23iok8xf24xqpf2hk8p03r7mxtd73kpqcr79jtm5debd7xtxnn92snasdydn7uyimkcakukms7z3qh1a6pa0g0s60yi7l9jx6nxw9qvg4g4fmghpw4wc3op4exk0hd17371rthifuae0u',
                flowInterfaceNamespace: 'tn3jx05z8qwfsjev52gwhfvpxo8reeb06rpvkclxpuzbi23i6qvs9k9giyln4728zz7ukr5ocedzz75m45pu0c2lhoak2to2ld1ctue8ulke6icudipi347ql1qt2dgxirtesohktlrqavblz65jwm4mhicsx9uc',
                status: 'DELIVERING',
                refMessageId: '56ljkctj0eh4fhtuzqt5yv7ufh266koo8phrhg80ruase0k18guxjxgfcx1wg6qo403xzd57uji51vf40pea25yxfn5u1x0cex3qfvpfms1pv1urcxlm19ivva6x3jt8ooegg78nac26gokv4eqzu94op694cu6x',
                detail: 'Sit velit tempora repellendus vel voluptate est quod ex ut. Eveniet repellendus reiciendis maiores est iste et id. Sequi velit aut quidem et autem tempora quia ipsa.',
                example: 'w34bx58a5uhojfkn71z96mse54nm1gerddlvs55lvreiasg13evpjfmy6qkdlrepbwj94czzsydoef07xmbp0swncw1mij5xj4es8sn63m48c03u5u1xgjbcwlk6op444hr87eid4s7krvm88st1j3i8q9xvnxif',
                startTimeAt: '2020-11-06 03:42:38',
                direction: 'OUTBOUND',
                errorCategory: 'c78tzj4bkzgky01jggzzo9qxlygtsdh8nl9br6c6brfo2ca9hie5vlqfopjh90nlmind7w4hpxsmjs685ayvuolndzec7e39vylxtdxtr4kikook6dtbr2b03v52b8e2bxmcubakpfwwj3scrx3oiaeu1pxjcqfh',
                errorCode: 'pza1ekul3764bp39nk3v8whbcp6c8o488lgaeelrhpgieqziq8',
                errorLabel: 930832,
                node: 8654045211,
                protocol: 'nfulkfo7fadsi0a06b3k',
                qualityOfService: 'rw81mc5p6chhhomvho28',
                receiverParty: '24oxokjhvla5zahas41kxctvpvcp0y24xo6n6pp3tmepmptzmvmw9ecmq4z7jf86e5g3175vmbhbudowey9x71mp567v0bmypnzf0ol66w13xdjxarwrzkcag9qdykl2jn5h4humtkq0ysxgil39vikz5dnlkmgv',
                receiverComponent: 'vfwd30zlq926j5y3zvfcrke5agly370xmwl7jiwhw31aw9ygh1rewh570geocr52yl3nuxs64aq064hxegdzfwve7hq4mdqusuk23a80bb4tb3865qlufq2j3iz4mr3c4cap9e44uz9baboffkrgywalc52amqmy',
                receiverInterface: '8vbx4kz0e9wd9in3pn2tuhdrn69467fs6gonkzh3t36v7ijjtcw106z3tlkbsur5fly0ld79sl6aemams9klzhbst2w3hfslxztyfcfejx2o5lfdol3ko88jndkqp872sv8ju56dhlbz0febfs5m0vzqx13ndf5w',
                receiverInterfaceNamespace: 'mroxufxyfc9exd1il1oa9f9fc7fvie8mxxlhhq67uj4lgsqjyfhplplxojan0dsjlil64c44aryihewrzfv78xih81ujdn72nfs49tl2gu0s7r2gcpfj0cd3lyclbrfzf2mq4wxprjhe0dng6gwk1n3lc3yzh0s2',
                retries: 5106993352,
                size: 7770202859,
                timesFailed: 2205057057,
                numberMax: 7239627473,
                numberDays: 4278542191,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'kg5wvp0r5mw9scz1nd4yia24p2jsel3rewa86w1a6lpsf7ess9',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'sl7g5vm4bgvrr09q8omd',
                scenario: 'fy4t4lb18zv0ww90qz6pvi8ptrvjhei4xi7u0t3ss8npvzk82klm7qqm7i3n',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 19:45:36',
                executionMonitoringStartAt: '2020-11-05 20:27:42',
                executionMonitoringEndAt: '2020-11-06 08:43:36',
                flowHash: 'grffawfyplykl68cihracmrz6gxmvliydt909y0b',
                flowParty: '7fv71yroqlpag0ccmkkd2hnebgs1rjhkmhbdrscffghrjb1h5eld5uusafe93wy55iigzg5i8763nder20lz7z5ox0y6otf8xf8a9ew52nwlk41eh55x2tb6drmlhrh5ub8wbqtjwjwsl5ch78a1qp8fv8qumbc4',
                flowReceiverParty: '9mrvndzlcexah0zq48e5ans4bo4knnnbg93ceha77pzz48q01lvutc20alsgydeneibxx5hkbozrd4ohsn79n18m459egpeg7t4u2qqa7kayckl628i306c6dltg52smri5e2t133r84le0k90h65cttek2k4yoi',
                flowComponent: 'gobvgw506gb9mdbxyp2dc1rtr2ixa6wk5039l54rpt1i9bkfl4f3pqzmq44dmpezq1otjnznqga3ct73ag0t5q5z1w1br21lmnpk80grof8eyr419gku55itn65joixxumswttgpdfvxm7cq1lrhrqcx86vcsle5',
                flowReceiverComponent: '5qu9pj4i4tex1q1kabqc7xu6vlg8milhw0f6tjk52qg3dq8tk12fjr03uscb832tpolnqe5k4g4rpqaqij6n6q42c63jpwxf4mkr28vgjw7eqx2dkf9uwkftaw75uey5ceupovu11t7hu31j7sg4ck3t30ewko33',
                flowInterfaceName: 'co5ee429rij0hdgz8b7x50n7ynwjv6jba106f0f7597tjdjydsmbudyt90urhf4fqftd4eoecz7qm9hr0hjnri25doqzx4irsq69huo4f9nkfnjsg8y0xtbh7oj0803acmyvzyudpctuyk01n9hmtn6w1rlmjsq6',
                flowInterfaceNamespace: 'ju3cr0w8xkbf7cjceu6m288huovuhths8ufreov6kl5cs62ydet70cmzy3w464iequ69lxa790p1skh38y8jp06c3t7b5pi91arot7kpqkial9ne3fs2phkec7tdcj5hww867rar6le3kvvnd21yrmtyipk0p2wa',
                status: 'WAITING',
                refMessageId: 'laeqvqdkjvfst7wyiclhlcbok6rkwegeil7mji6p6a9yc4av0sozrzfv6vywilih7mgnlptwtj3kw337nhqa5l3w0e71wdffsm8pwvh4jkvy85rgk3d7sl9mevimnaau4y81r3dgia1ejejbzgo2grbiggi5dam7',
                detail: 'Minus ut adipisci qui suscipit omnis quod. Et voluptate est possimus. Sit ab facere incidunt voluptatem sint.',
                example: 'ya3e31jdxkzvzlhsopynu04i4bduj1vv684v66yfzabvr5diwhji6prymepd1j7yjqid6of37evzs53lx0kgrknkhv1uxag3utqotfnr9ubq2aok08e1wcklfgof0zd0sxtjs1d1p3qx2z8gfzyb0svm4qsw1i6b',
                startTimeAt: '2020-11-05 18:34:15',
                direction: 'INBOUND',
                errorCategory: 'btap2ps8c0dlwl4tbjlb60c8mh0jwuulsfjo1qeemts8x2qqyjjvbufyr5sdn32sbk37k3nli78drqbbzg863p4t5a59da3l3x7j1riv86n8fd8rjgi6f1jlwlyzfni0efqz0t5zhov18i98894y9yiudulcusgm',
                errorCode: '5vb6iox2orqyk9up3in9wqcltud08nkr5ac6pm15lt5w2hftv4',
                errorLabel: 207747,
                node: 6681007426,
                protocol: 'ovxy1jgr824cc7rm75bx',
                qualityOfService: 'dd4mkmfy3exppobpw1qn',
                receiverParty: 'ojycpztqd73zmqdx2rwzksxrbc4zlxrz6121rcng49zk0yo53cm0h5i1k421ibs1yehhbcgq2ktwri54was7ocict3y5xzjo21bv0oblh9207wpxnago0gvvep7rdzgzsw1bb0q65ebpl0fjm5r7r4g9uyq3yppi',
                receiverComponent: 'sxevzs409e57a38s0976r12ea9km2d40m0vwrv5xqm29a3zrszfmpkqbkm52r2ei67hvtkf55iga0qpmo38ld7p99nmu74gargll16x7twnsk8yrm9e47y3qkecxdqaan9ccqujjsybumszhq19izhlxoy7n8ftb',
                receiverInterface: 'v82gd8yfd4vs5jynva0zjtjc3fz7vu4zme6zt2i9famk65n96s874p5qp5iohibkjqzaaer1y98jjsilepcd8ef91iypdwavo9blgqtwjvjq2nrcu3jo7g2ad8rhop6u7th4r3a84jk5b8vwywjshzac5yn4s5of',
                receiverInterfaceNamespace: '57d2kmqfwnki1nltmvd7ikk949d22dhjfgsulnmofmc5wogzitutbfxc9hq9urjd0np8yfscrmzdxa42q7c4nsppt3v3d1knd0w827cgiyo3kgaiuszj8f9h6cry7wdfs2x86bhq1wg1g19h61e13yon23mzes0u',
                retries: 8430336333,
                size: 7005682539,
                timesFailed: 1467893612,
                numberMax: 6256004424,
                numberDays: 2470060494,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: null,
                tenantCode: 'hi65cuu7aiu4g4vuizf3aju4nr3mdabom4dpspthfr725r9fd2',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'bh45hf60mq5klu98sxap',
                scenario: 'm1tznwu5ildv6njh0l7vcrwbo344t754xkwhr6rkeog1wtmyq4j923golplz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 14:35:56',
                executionMonitoringStartAt: '2020-11-05 16:25:53',
                executionMonitoringEndAt: '2020-11-06 00:58:21',
                flowHash: 'aopd8jkgf6ujqoyk6wabmg6r0bupvntehqwvkmry',
                flowParty: 'pw5u2d44qztnenr57nbsc0r3kei4h3g4hbnm96283wwoltc0clayp123lum2u2h5e2vlgq7exc3m8ebemd3elm03jsu7k147gy481pql478wptcmup95j3455zoyyc16f6tns3d32w1dmoi26s3oi1dysisk105c',
                flowReceiverParty: 'q8vhzzveob6danti6eswjohwuiddxjqj5k0jmlgp6srsdl9p13x944nv2uz1q1jkxxjyn49ea03slivck8zw6n6to3bj0yevxxizd0abrpzm71gl2oej0kfaoohoa1u2toiagp44ezv5tcdl27x63afap2vmv4im',
                flowComponent: '3pd7ns6yrbwoa7grviwnm6xa5mt1ou99dylq8yogf9f9ma5yo2o1zj1dbruhs4y0dr87nskkk2kv0n12llhjheoqlmul5vyidm6rk7hl13aor17g99fpfappptdqxr1hcdrja76ysh1ymnt8d7lgqyrrvcr3ve8j',
                flowReceiverComponent: 'v65aqzfta1j64r3dz307zt4nzwgbgf6tkzw00axv18ymp8xr931eyvitdch4uqjh1juurai6wu0rsz3fn5fhzjny7sn40e34olbjrg6t0acz346binydjqe100kquw1q251pgmutp7q02te7bwjeoaf5djb73ev1',
                flowInterfaceName: '37xuf6sak1rs98l0zx2etlnx8vlx453jbg8p08idj4ggtlz4uel4lmn0yn1ychp0nsvn2n6wrxacq7iwm0zwpbczgiq5ixyk3yzfo58q6nsjxuopt1sd79wagbe3xpvq3q02st0q5od7ul11wi3u4n0lgk2gw5iw',
                flowInterfaceNamespace: 'avjr8zgujmyy4xvx4e474x977a9d8sug552z0l186qjghp1l9aecd86nhut9fcqwcjws0kqi7vrr1v4yddqbmg4fuat44j477pcjrdlp5hskwtz5hwmzv9bjsmym5oou31mwn7yhd4mnprx00271c1raqwpwufhr',
                status: 'HOLDING',
                refMessageId: '13z281vwif7prkyd729husw6ccyhyckwwcc2knd7p73fwlbggx2gz2yv3wqa1hj1k2u8we8wr9hqhtk4op04z8ys0005b4fs65b87a90v7jpwac8aamxlezgbpvvbynwgf4bog4bp4jf4eo0mmlz7xgnz6hj4hnu',
                detail: 'Porro unde voluptatem inventore. Dolorem omnis voluptatem suscipit doloremque sunt. Dolorem ipsam dolores doloremque amet quae corrupti aut vel. Voluptatem et sint sed qui. Omnis rem illum.',
                example: '8ejmslqupzq8jzlnl4dm4clhk8bhkmekwv8polw1szpm5r7ffe0vwkf4yan4ogon3qfi1voxmfmvbeevkjvu9u80qbzb0hsh51uctaaqj7twpl88pfbheq1sr5lsv7596wxb60aqgmjx2szqt4hh9z7ri08q3p6r',
                startTimeAt: '2020-11-05 18:56:17',
                direction: 'INBOUND',
                errorCategory: 'ru7y866n79mtpu0whil8ld4r948wa6jm5uursk826h3apyjcp77byltyy9dws04eop7j03zgewb06ocnvcqxic8jlj8h1ysibteb9vskwtklt4pknyynidcb5rici47pnk37041097qpa4er9a26xz3anzhalgix',
                errorCode: 'dlchm8g14zn3zojob3l4lidejvhm0ktl65blwb0p3t2sek8kk7',
                errorLabel: 319867,
                node: 3173187975,
                protocol: 'ak5kuwmwu82kdo352is6',
                qualityOfService: '1zmunk17mvx0keucraz9',
                receiverParty: '21cfujase4qpyg0ux83cof73fokk53zp9vub6pkgduoomyhcs3k7cip5ng6j4lv821lk75mo3zvwarcrs63rnxjrfl8xtjf1mbgl657tyidp3ul4ijrydmbgitd1w1oewzcbdyuabk9h597q67bvtpo5m865mw64',
                receiverComponent: 'gcqo5km8xfnn70cjceuqfakkql3qbudcivx9wcvq7qzz7vaz6sh4ei9xd9bk44pka085a0lwx0j6gszupcxk0v3m9vw4y7hygy33hdehp2pvd6d3zq5d8x9ifahh9q2gmo73fo0zcclsnvyt5hd8e17asmzt6as6',
                receiverInterface: '9e7isebj7ijmcq844g16kkzg8s5wzr1902dwm1q5tbz2ppto1bhkkm6xzx08nuu9rvdep3zoo34ppphfdy66f5lvbur92k0xkxrtldd4mlqdbit0c38zwj83hgnl2036r0x8lyjib8zicsukg7svk7nz8hlzivni',
                receiverInterfaceNamespace: 'smdzxy202g99qq93irou2xjsm9hecllwwjdyytpfx5s3kfqopml1k8q8wa94e3lgd8p998zwkv5k784merutaetmdeozqe458d1ypaedleuudfbillux73vs1dfcw2ut5clt5zgnhisuvanwyn4atxsy8eeh6yl1',
                retries: 5749592977,
                size: 4932621418,
                timesFailed: 6970566426,
                numberMax: 7484691434,
                numberDays: 3952035228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                
                tenantCode: 'iciu80nact4hc1rdkyyqtg3m779e3q9g8670w6rm0ab1jc9tky',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'g6fnizgtxc4cm43ee0x3',
                scenario: 'fuhqoig5i5lf83l31kuojj2ujzk15hnvnq0j8nlhy2b4gt2vw8r5sw0vyj2a',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:16:31',
                executionMonitoringStartAt: '2020-11-05 13:38:37',
                executionMonitoringEndAt: '2020-11-05 22:52:16',
                flowHash: 'ji9tywij4v542nygn2ptzcii7d3sfuabgllsxfwb',
                flowParty: 'yrke8zwrthpub1jknbp21zwvm1rp6cec1vhbdcz88qy436xrjhflywexqevun8x98yewpkpilhl1a5ugwlinyw6tx7yxvf41jwrevvakz4ybnnq9pxqinc2cp58cjuldy2glnu2bn8xg8711tp54m2xk27ul54rc',
                flowReceiverParty: 'a3121keyhf713ybx8fmcuni404lp7pr8toa6rkmdmnixpgn5d3v45frcur4ek3oi4x4xmuq0slzqh67yvi9gnpefokihrs68dzbrkeq8kj3uaia2ay439emnju5slwbq76kqcn74p1r0b1f7f47sfc1824ut1wap',
                flowComponent: 'c52zrwt2zjohvrsg8ywjsln8m6faf6sr60pe35igdxulhuu4banvvqjq5xelzvmi03103iraso30tssh8y6o7j0a6dxmp178t41i3y9b0xt77c6rojufouumkawmknuzqtmmd8tx5etlrk1e6q2aoa3x8sbiahvn',
                flowReceiverComponent: 'q3tk4gj5rhlv9h16k8y4m51t71nda5d3i9vjdmaa1l48utebkqrs1w4nwprox4rw5les1usqx5k1zptbua8a3m7fex7oajpkwbncwihhzewt1x4bpk2d1ag4jivq905d0ceo7756hf6ahfuzxslqfb4v5v5hbt39',
                flowInterfaceName: 'sg73b0ckz2j2z1c4a2agrobteq01humf5cwjzg430ojb1yadgx17gd5pgahm6y6kruvfbaasrwsiyvcx55oq3j1uobofexyeknuyphtcbjwuvdx213j3eba5n2ht5trvmwew88lseg1n1cxs2xuvfunhnkl4dt4s',
                flowInterfaceNamespace: '044jh4q17qigthc4wdle6bm95y40fh910d90mmmjq343vd57zrl1ydv9aj8mgxodcmbo60gu6quujdqznjq52ody4ppepgiz1nd3a6qk0vcr6644rgpithog4cpaz4je1u4mugc6gv6t1pzncn1p7ix72nzra2uc',
                status: 'HOLDING',
                refMessageId: 'fijalh273ojnifjju9047oim2txoz1ng0dbev7ivyz20qczvztzfj35b3s4606kaj3jm86k1x64s3eyfpcdbbmna9dtcr9syklxe0uxwlkkxs4tpehsp59lyu97yn8wjoi76aov9uip1m2vx8pdf5rmhlik7z6t0',
                detail: 'Ut numquam soluta saepe. Maxime voluptate illo repudiandae tempore veritatis ut. Corrupti quidem adipisci. Ducimus ut modi rerum qui ullam quo rem. Quia expedita facilis optio repellat ut eum repudiandae. Eius debitis rerum ex expedita nulla quaerat rerum.',
                example: '5fslcgizr9m3uk74foq6ehqe8aoeugycjhqrolbg41u08tyjh8q75g926v1teswtw3nblfpuuojiegei2431gxmeaxyx7xargvm78nhze1tbwxpm9serkiev40x3gpnufifuhss25b7xjll08hketn292m7kerft',
                startTimeAt: '2020-11-05 21:49:46',
                direction: 'INBOUND',
                errorCategory: 'jscxsv2velao392twc2szjhlfsjok0kbymfvqibmeozf2erdcdbfllhg0byolw6s20d39fudg550wdehhldyf21990tasb58400apg1av1lqqbjtq1jjsq9keq3qrigaicawwfiz7db1g0j404x0zhcd2ot4c5zr',
                errorCode: '3yd8uzeld59t961p42zhal2r82k5ije51sur3farrjem729jlq',
                errorLabel: 992921,
                node: 3199286072,
                protocol: '7jpoq5394ml8lb0igphx',
                qualityOfService: '3kwqpuno9nff6aw4snw9',
                receiverParty: 'jd0n1v0h3tckej1zqng0yk3blj9cbgb3wcg3j7zstlpydc4qhwnlsn26s4u5py6121e9hzgnt61b297ri1bfkn0iqi8n7ivpibczy69fkzswuhsm9f75v35wpdhixpbeuuo1ps1s0wpnvq10lrtng01d70uv1nsg',
                receiverComponent: 'topdl26dubw4p1k6z8gv82hgcgvsgz62hpki21qy4kn9wtb6ec2cklr3o3qkha4c15onfd6blzykqe785u3n1729alsjntvsnwo96jnwa5juhp2n121w20gb4z8ykta1pzofhcr9uac9914a1degewbjkvp4hxrh',
                receiverInterface: 'vw6yka9ok62lun5f7tl9izlzkhrmjqc5j0bux5yv9ijfjg71poe742lhxmm6giqyf34fwmiiew0kwq0vk8xinj0z6bo5owb3n4rlfpwuhxznuqtemjpzuioi190o5wmjzxf7f8zxdfcnluli2azhhnsrhive2is9',
                receiverInterfaceNamespace: 'ghwz0kpk5ejzvj96z82utpfucqwxfu44b52tm2l1sd3dkvbhrl3qh029gtt3nbznqe4mwwzi1znpg7bbj10ux57h8u3oj9k66degfiisyudkankigifg6q0cgznici6tqfiykfec446r9o20gt7bizmxnpodplnp',
                retries: 4538664805,
                size: 9430796312,
                timesFailed: 4108832409,
                numberMax: 9815920319,
                numberDays: 7801017106,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: null,
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'vhyh7w2i1lk6ukcjsed9',
                scenario: 'wkut55sre5e5pqtp8hr2ll4ets8870w9118qspisxss426puwljfd4d1eaqq',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 12:26:01',
                executionMonitoringStartAt: '2020-11-06 01:26:46',
                executionMonitoringEndAt: '2020-11-06 03:28:43',
                flowHash: '3hn59nhb0h9auynn9zpmu0otsqmzvt6c5ggbmjsr',
                flowParty: 'c6boaoxdof4bbpo856nqbatko49zylf589m4sg4olx1te4b33q8it5vwih56zhe0gy0ty9vrcpi8dbg4iuuyhmwlrceqcsb0jv9xspksmz1pdmf7cd8v3ypiitov47pmi5ttuztxezs9ie4cmvlbytgoi0qtotiq',
                flowReceiverParty: 'np2a8zj72rjpp5pjqig4t0gg1sbu4ht03xol1qd4lllei8zq5bxg6i720ma6l0443o8ukhscbp0tg6jgmyxnv53x98egrjpslhjne719x3qx3ofxtkcj1g0c2bb61xggjglh82udl1ekjgnead4eir9xlue2rigm',
                flowComponent: '3dm6fxgf99ay1o5w4fw0h33y0dm9o6gafth2v3fex9hnivbakv0n94v2cdga77m3q327pmlskwn3dh2s43coh1ip0enx52lineyw5elkhce4eo26bckyw5q9dupaaktbs756oovznh4s5e1j7v75ebv140zfqo11',
                flowReceiverComponent: '2zj225bz73rpozt35aoi7pt9bbnc00h16ofdvg7d6nrk739rjr6857dlc0wyfad1wyocdp3st1j3hxhd4ch8wgcf1w7hn6x9ms2g86a1bwa3c44lr1xtorc21hjlax7kax1mgfxmvse4d4bu9rpx5jw1839n3tnf',
                flowInterfaceName: 'z0hnuftjn1pb8lmnohpc0nw37zjjjb3b1kvj7y6qrznf6urwr6k6g0hpfgqf6ogy0wneeiedr3k81vo7icwmodradfza5l3fjvd4ka9j0ydxzi847g323jbu0ea3yuhndaxk27iob7y49qml8ve7soq16tskeioe',
                flowInterfaceNamespace: 'qstqetqqoj1hbexy67631br1be9ca478cazgwqa0s4fiuvl4hee5cum5781wjijvrjns2sc1x34uwxlueqaam7pcnqljjkzbz4boqvw3fxsosapopod2z2hkxu3zkip2803shpk9b6bl6nvrpahr8il9iuprp112',
                status: 'CANCELLED',
                refMessageId: '54tq24hm7demf9jshgz1ct4f5v5fsq5y3toyz1a7opti1ghzd9pjzmw5x82ysp6ed4k2m2n2nxrv29e4z77otzuucbkm0fgpqg0hokpcuicsw715sudbzrcwlcvgtx2fwwfsj9dewtlbrtdwyiavbfzbfj6e876p',
                detail: 'Itaque corporis delectus totam possimus vel modi. Est maiores non dolores consequatur est nesciunt assumenda impedit vitae. Doloribus aut ut dolores ut earum debitis soluta. Dolore deserunt omnis deserunt totam velit asperiores est dignissimos. Quia minus dolorum quia suscipit cumque ab distinctio expedita.',
                example: 'vf788oiuic0qmpzj66rfdlwodsx23q1q2y26lplk5qh73vt14tvd4q8mfzp98dz9codgr1xgh4zhbzkm9kctcsz5dyoqpjrqev5cgfqas8d57dz1rbm4ivtigdqdhg7fgmqnhmo67vk4e8t9l9yqyv49drlajuhm',
                startTimeAt: '2020-11-06 08:59:21',
                direction: 'INBOUND',
                errorCategory: '5diuo8aungb25lur94dmp2urk58hgjs3rxug3pzvfnk6tl7vwiyit331ovf1xr02zha87d0remtu6zx1eqs53lam8za5jhjnewldexjczq39mlmwr3l5ldnrum4h9qu6vdn4m3vs0m39op16f1g0b2rn5l2gqn7x',
                errorCode: 'x1ijny5tyzd9me9jxrztdprxag96en7ljgdo1f4b9ptc1ccbbv',
                errorLabel: 577847,
                node: 2568807428,
                protocol: 'yldinmisi3axufatu3vq',
                qualityOfService: 'oimug2o3g2qjnud9xd4o',
                receiverParty: 'yvdy6a5d31en6rb3k134s5l9miidhoza237otgd9qlq6b3wucldcdb5wf0b75w5mgt0xn68lytk1lfh3hp9pvqysw2mx2v06s5yairy5idx6oozyhtxkvi0v5zr1qai6yi07gxmnx2fq9k53nef1vizcivvubuhi',
                receiverComponent: '08c4nijvi06zw8d084yeencorn21latbxp9c8hsstqp1kbol4br8asx4b5z2kzxk7menbgynspa14ip80mv2vzuypopck66eozckcsnwfipx9asw20ncdix5cuz1gf2wahv8tt2xyw55ebo1geufrive5wf78v9w',
                receiverInterface: 'drfljhps0znb2zbovv4h0xeyk6mnwuhk2iixvwzqhsksq2wdkwssmir7vn9flr5c6qpnipet57abjktmzu19d4jns2qy2tk9hxkf2svj5e0ru9t69uharb4c1k86l2qakh6ybht295tl4elg0okcf5e87p0db7yh',
                receiverInterfaceNamespace: 'apql1ack8aqr8gsixtxi4dfbjjaey7q7iyh9uvnh895u8mccd0xsgu6rsibyq6ox6zgijwgnt6npnbz4zv2e8ged1mtjam1igdkarbeg902fketqd97a0wopfl7c2r5cg4h1fc89p2rji858jswdzikmf777py3z',
                retries: 8499685458,
                size: 6499254175,
                timesFailed: 3885855311,
                numberMax: 6453769207,
                numberDays: 2258369000,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '67nqfx4wl3s9eweeivgc',
                scenario: 'rbjabw9800mwbbdbmvhgnqcenql2bs0erq0r3i9r43bo4ggkx9z16v12biil',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 16:17:44',
                executionMonitoringStartAt: '2020-11-06 03:27:18',
                executionMonitoringEndAt: '2020-11-05 17:10:01',
                flowHash: 'hnp1tkqpdjaozy16m3kp3tdzynqd1hgff1foihtt',
                flowParty: 'p9nb95i5piil763nzfsnuqsu9joxh94dcj4vjwwvwcfxmi161np6zuaudz3psbi87usnq0vjrl6nkhagtftbrvapqjl33xzyhkwqfmufnueorydt7zim2bwrr0cdjlrdvwmeixeb1w0njsevsdf2imzfbx6tityc',
                flowReceiverParty: '73nx46qcrhkwfbcinm070u086eb5x1jnc1ce9e9507122v7ige4ucsksyda5gazq5y2a8hq2alsmsofi13ew1che8pk9xwb3ju3wg298ytsj8qhxfku17t3jn9h9t4u8p4zdqdywfx7uyjk62abmpyh11rbvrfjr',
                flowComponent: 'a1jf7ms91x7ifzr225bto6byokm7uxf9xuic280m0ad21id8brybhnid5s95grik62qyvdcxfib8a20klmmwyuh3ja0na6hkhh8hpt00opyl8p8bs1uju2gi5tyvlfzsqr7cnsqaio1ajwzyrw4o3uikdt9yd6nn',
                flowReceiverComponent: '1b095hxceqs02k9yb0mj5d9h8dm1z6l9glvkzdplkcggudduzp728icwtnx7u3u2o8vgvrpk73ejdj3b5yq6t1ty4asie7jk78jta4fq67qi4iaqg30caeaw9bk0ciyub9chkm5eltw2gxqnj3p8j80d9r3fyskg',
                flowInterfaceName: 'enr93228f3vf8xqdal6bar28l1nipn8knye1gr93ydv7p5a25b5k2edgng68q45chqyaynsr9vssuvbgdiqu79roolr59a72bvl8mdbm7e2wt3tdf64trczwo21eoyynu4pto8xmy6e36aglguft3y7axzk1dhel',
                flowInterfaceNamespace: 'grzfiqvt5s4nkyhuyulsxoi4gck4n11pws7ynhmxjhdybyi4ehhbreq0lnz1xcvretlec48t3si0y72hpivbtlk43zc0vpv6r5aw1dudvknxvkf2hyzuhshs0mt8qjp58m90hvrtsec6sz1i1hnnybc2y7moxcpb',
                status: 'SUCCESS',
                refMessageId: '082vz5q0j9oq7y5h8natr1hcmsqhtrjyvxjjz0ck5oe3d6pd4weitmxcpx5baq4oewny3huvfklq4vika816llgex0cuyoe6esahjtd3vrtkjoky6p76g1zxnzuvayox16otsl5laynu1xicdoi5e3leq6fu3sqg',
                detail: 'Sunt nihil vitae. Dolor tempore et. Enim debitis sapiente provident beatae et laudantium. Quas impedit est enim laudantium ut.',
                example: 'kzcdhux6gr91hknr4aedajbotrluu0nuc8itnmvj0ramn2xny1ac3px8ftq08ma2t3vizey9wj40nj2nrxuztaes9iux4darc52guj3q3nxi3cpbgfsptwmzk6zv344dlsxifi4w9frlezc5cg7xer7qlfci10bq',
                startTimeAt: '2020-11-05 13:45:06',
                direction: 'INBOUND',
                errorCategory: 'vssb9kewecc3ins4drqpn9g2utuzsi5hne4gpj4cjv4udu7erxrgehf38863f7lk0fy2wawk5hxkocdqo3mbxk2swuwpk97wrn6nj8h95k9s55w9znejzr51bin3kiggt84ka09gtly71v3kynkujmfb3cfz1fej',
                errorCode: 'i910bdq1zinmh4vlpjn4jqv0u9n2w7ichlkb5ptp5648jfcuto',
                errorLabel: 479679,
                node: 3151492785,
                protocol: '79wlk1nba20jhqi93qj1',
                qualityOfService: '3nyyl5v55rb5vin8rghx',
                receiverParty: 'kxuz2vveoohwctuz0nmc6ocozysowbbumozjpwny69wraxum57ctpliol815zhggymjc29wmcf3fgrmhsuw33hmvdqudyy2rach6bp16dbzyi5gqyu4u4n82302f5b2t4f8m7ef8uhyowx9l5twv93ek74kyyxfg',
                receiverComponent: 'h8d5c0fdwgodp3tctmzdm5gfevv2mae4z90oatbivjc61ck0u0zmfiybguf8c0dtijwlbmgwz9uul3cpxxsi70sq2560yiate2o1eorrzkbxgtfgx1ipjqpi6sw01alw6u8x9m5znfdabevyq1nsjv3nhn5xdbrn',
                receiverInterface: 'iy6txjshd64d3iwjl4x66s9dgmm3xjpbl4r96rt48bi1edz9jvq5n7e03jsd8n70r3bdkwa6rhbwjqo4jinz7x8fddbr0l7soako3dwktvzgdige4j4rvhacc1rkh54xzoqpbykr1nzy2bmsqwm9ouej8cch2jj7',
                receiverInterfaceNamespace: 'btovx2e9ama77vuofrcv6om0uufq0smf686mfxij9p21rew5vhxohuxmia3z034wotgafxy9hg53loyioq3zemi8eo4kzrohw4cqvvpbqylryahkxz64bdx4xtbpa843dc4v1pzih7p7lujwwydkh182qfpb99cj',
                retries: 4877051828,
                size: 3392145374,
                timesFailed: 1273942780,
                numberMax: 3616051833,
                numberDays: 2019856671,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'r73bkhmn653rf3phd6visfdbjg8y2j3jta395thxns4yfxn5rl',
                systemId: null,
                systemName: '9czgacp3p4z0o91oocq5',
                scenario: 'qo2qdd1d64f8buek18zj9hejn7mmlu27nfuypbo8j4xygu71j0634vru5cja',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:23:33',
                executionMonitoringStartAt: '2020-11-06 09:14:25',
                executionMonitoringEndAt: '2020-11-06 04:17:22',
                flowHash: 'rpgzn0947rl865l6quzo8qgvpd128xxetfdctbrq',
                flowParty: '66a5u8jrcix7j15idqfp1xkl9jbdnc16u9z7qql2x3edfzosf40g9x3nzjiqetklpvgptzfg60nfbdb3rh3nrv2uem049y0vlvm1rcfkyle2bacedld41qek566ja2okdwal773limgam4maao7x59omw7nys8xk',
                flowReceiverParty: 'yqzzepj8afkgcdexm3pn4gqaruswbhvo5c68umfinj7ghgucqa97lskxqr7hhhew3tjy2kvn1kzuev53do1emyag03j2jxjn2ar3o4myu25bozlcjbgj4m2bgt13g8rf8dqh97h9hg5lyzbfg3e4vquk3x45v8ws',
                flowComponent: 'd0btygm3iw5taulzdxu4ry0u5aij880nsdwhdw05xs4ysn6njcsqibrlnrywhso5ppho3wqfogdoooxwpcd0d8rltkmddjk13290egd2qv9p055f5e7p6brce91kc38qm5n8evjyxqhxchqr6vzisuxqltv5a4g7',
                flowReceiverComponent: '8anwi7gyduioj1bgc3h24shza9esr3x74yoafxbxyxafhqaomzbdrrwtbyporzsx0g09yfh7uf602077arhd4413q6bbwlsc25o9k9rb2j1fbqtn80b777au1qed80j4rs15f1llbygn3mues17n7siu8gn8l1n4',
                flowInterfaceName: 'lsrc5gxs7ae89bompdfmqi8fguihx7rsbdjy7zwr4hex113k0oesdyx13zgqtxk15q42pn03q7ih7hrbkll62bpgeb0dxvj0y564rau4dk51ffia6vboz7eobqk7aqkbrbzygocttjpbjni2wz92ajts30irlzrf',
                flowInterfaceNamespace: 'jv9gs9uuzz94igcbfq5g69n7owekz1vsjt3hjcxqnhyg3tc67sn370xkxm9phuaw6twa9g3upfkd2t2v3dg1xnl0g2r347237cj0ihrcg1tgst9qcnnhjg2zk0rtm3ip3zludjmcl9jamio29xpwvh1878mo9elx',
                status: 'CANCELLED',
                refMessageId: 'faujsxhazi7g6wjrdj68l9ipfrrc2ofqzc8d8egiiojqp6dhr5bzgjax23lrei12hewuahkle5p49r26u0pr6716ydc2xr718vaf3yzkr1bndvzhjzpg917bd1dzehcbbupls9b6325qd9z55luqmcyjk5mmvkqt',
                detail: 'Ipsa id quaerat labore minus voluptatem. Quis quasi libero ea modi reiciendis debitis molestiae odit. Dignissimos et sunt saepe nihil. Ipsam voluptas facere delectus quia dicta dolores voluptatibus dolorem vero.',
                example: 'fuo2q017wiv5dqwge1w5kqh685wyo7kl2yy3em6qkxwnn6kqy31mfz3czseba6jd1aspsqvuuf82r72fykm80ygu54azmlbz0h9mxh2ovtf65mdyh667gkwt5qiyyh5lcy1zcewkjsogu599t59oolrf7wy157sh',
                startTimeAt: '2020-11-06 08:24:02',
                direction: 'INBOUND',
                errorCategory: 'vdlq80y27bmi43rp78wvgpmr13xjqpp1hpisimkdnmiryv06kcxgnqmx4cqlv2vsvqyevpuwt9892va673w135mbyakclge8g0c5ododfca1j3fw2xuxy3nxzb6fw2afnsork59econxqjpoiwzth9261ckd8bwk',
                errorCode: 'o3vjxfsciueoa82d4ztbnlztuptkrrsrnvmsn7vdoc9biehs39',
                errorLabel: 194472,
                node: 7829776661,
                protocol: 'xctt9rxl7sar2n4hh3ks',
                qualityOfService: '5dfzqs33n7p9yw2nxstl',
                receiverParty: 'i9hhn385rg5kswr5eij9oapx1kd7r1crc7xkz1vyiw44me47o2x53a1b04ff87csizeyhulvcyj9vft1rvhykdyejo4nyq0u6az4cwf5o10do9od3ogo5oo4dzrulachyy8awipd176n63sfieqmit08lkesinvk',
                receiverComponent: 'sgxry7xr0pwltnuwd9u08nxzhebsvcqusuj149b5o01c6cvue5s48gt4y0qe0w65u1c2a2wpbu7x2zmwpd7g61dgulpyfd0bb4vh21u58aaiu370h7y9j8drd8ozk6xms0nd6qgcatqbcpl1a6uovtnzqbo3zcvo',
                receiverInterface: 'd850mg2jjsxe1tbwpenh69hjy3ezkb2tuk0akjhawjtv70322rt8iuiks5a3k5tb8synwcav05lsaclcp8xnm8gcdimt5z5ls859kf1kuirt1215gcn2rokmvqk8aeyrpqjd0pszeqyg9koa6mxo1jf2kl7xoax6',
                receiverInterfaceNamespace: 'mqfmuca7oy1xjqpnkj744ktjjs24m6jz1ydyhlk9xwjmasbypyq3l78pycf4xym208oqkvuu5c3ia7pasoykcycw0lz3psbasl5eb03s1n95lda0ef7ogumtsz26ou7dszggyy7ig8p4rtrued56ukckj5f9a4p0',
                retries: 2553096863,
                size: 1625039712,
                timesFailed: 5056799621,
                numberMax: 6933613671,
                numberDays: 8622682466,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'qa2pi3dwt3i8tnlxb7h5x4n7ffaeb83zmsliixseic7xb1wud9',
                
                systemName: '9r254bkjlrh7nd62enu2',
                scenario: 'g3jxmu6uxpuwr7zdtbxrgccaqnqvs71z1yg4msxw9sxbal0wry00c1imh71y',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:01:58',
                executionMonitoringStartAt: '2020-11-06 03:13:25',
                executionMonitoringEndAt: '2020-11-06 05:54:04',
                flowHash: 'fpy15vd8b03rnzd0j7ej1t6xbitrmaxgoc9mduni',
                flowParty: 'wb8wx2m1hyv0kwtodh0eys52k4lll5q1yuaoo35lfpu83o94l6ehltaux2r96m5ugv8azu605syjwkgn9jthhqaqxu9ota07205tn7p7o7fav662xensr64w876k9aw7yn527t3k8qaj7lnftig44fscwwxpbwr4',
                flowReceiverParty: '6pty2xacut0no9owomcvtdvrxp4ij86q4gvj6bejwrpxvrmjtiw38ashg4gpddjztmgprmujcgokfmuy1ggc9fecbvwxx4v79yenf4u97jny56yjpdznaxgkdb9n9v9cz2fwldok4pnn0tz68c3xyqi52xmvuz5o',
                flowComponent: '6hn48z05yw7zephnj3w13wr0cfny5wvixs2220vz65gqa0bm94r1gvg9amsy4wby7sni7a30exfwaow7if06fy2iq40qq052spe3w8vulo9y87ztayefzrhgkuprvbstqcglsnyaeyyxy5ljpkjtaf3bn1nt3kci',
                flowReceiverComponent: '71gqklf9ryso2vzhoehpinq5w97njea9r9n5z6y8s0clafqhqqt026g6yi3fpmdiwaz56c41592ddbwqykkbhvqczzyj74gecau90fjjvl1qz451csvwulwttjq0v240r9kexpugaxxun4u4j4y7h4s5ume2l7q9',
                flowInterfaceName: 'mmubleqqd715lw42zmvnrazjx97z2umoj5xqae6irfxviug4nvcscjutst7l8f0rwwoxb3c9sqd0zjgn455e4n4fsokf84w57dkn953bec75qver5xr19egstsw8zzcpt9jd0aselivbeq6endafaxy7qmd21kqi',
                flowInterfaceNamespace: 'k0qfnj51fzumf5sr4xvvv49vl0jdbiu26oogj3mv9137ufz6o1k63eihpho7b8adcttmu7k9ijz0i4mvtoiguymeoygucp9v81irwrnz4tgbui29vgcehttwato8bg4d83hvblps1dmhefyvf1li1vmhnopy0o12',
                status: 'DELIVERING',
                refMessageId: 'qra4de5t2l99m55mpm7zwn5o7gwq4bczdxo033kcgdxo02f3kdlzhy99x1iiu4c4yf38qorc4vvgph98c040koagj47od3az0zgun41beldkcbez48we9o4mqkwdiyhv9p22shv3n6ygtnnb5n6ppqxuhnuauhan',
                detail: 'Quibusdam iure quibusdam sit eveniet sed eos delectus. Sunt est voluptas suscipit qui autem commodi temporibus occaecati nostrum. Quam sunt nesciunt ad beatae cupiditate non ut veniam cupiditate.',
                example: 'e2tii5yq1cslgqzeufmcbpdlnas86kv4y9mk4xuuv0wqnnhtwqiqizprru7wxrq7oln57pumunwfe1y20aqgusb210aty4dfg5fs669y06nki7v00453p756hhi11u5j7wzqa4ksf6unpkipfbf5nnl73k0bltt7',
                startTimeAt: '2020-11-06 11:44:34',
                direction: 'INBOUND',
                errorCategory: 'w2hhz7fy5kzddbvzx7b0e3alusasqg5z97ga9olcxnb4yc39zssy4m9m6vmmm4tq3xxkjgqdhf3tp3uzya5fp97mwcrp7fxl4ljy623lyykqpsmwgygeaiqislz1hes1i358agftpon9palsi7pwmhb7tc1a0wfd',
                errorCode: 'vbtesw412j4vckvzx882etmma7dta0e2qvn6rmu1qh1863jzcc',
                errorLabel: 973951,
                node: 8219414759,
                protocol: 'c4ducfjh2e8atvrppjcu',
                qualityOfService: 'm5mqfr8rcsvrk5y8mwmg',
                receiverParty: 'x6yd9ep2tjn8ej9b5xfp0spxkpfx63b4qyk65a18e4leitez66994p5s4ehbh0ek1np9a9720hnb4o4qao8l052nyml6zwi4iu87x4hvk27szmjpisy2j4xkl2codmmrx3q2txnuzjrx0pbpsww6n0h04nc79ab6',
                receiverComponent: 'in9tyef2aquuda7qz8ng77vb4zhdpp4glyvdbeuiwpq9wnv9n8nb8wmc1t6xjjkbn2idqqxqg8d3uvs3v39x19x9knytozn62ejqjipk5yeqp4a90tz7ekudmjiu4tc5rlrq50mxi156c5og7n1jac7g06xe1ini',
                receiverInterface: 'nx8jtq1i3t3d7cnlmjq71sur8km6girquf7fqgsfhvvpx56spkqz303t4iezqlij4wy3kj9ng119o84txz3ue7cwclqjaa4ul74ns6eigyy3rnqyvevbzfnz9qq1te1okpdq3s1jx5u54aph456zhmc7cd3dalfa',
                receiverInterfaceNamespace: 'cflmlcnz08id05jgrb26w8r9grg2g7wq7xovls0waziidgh0s8sre2dn78kaltv2cxh8u0ef6muyk5s87sqsjtqnwr2ajdj2lf22g4mbq5qm8scofrma3r1pq29exlqj8jc48v7oc3j390pmmlghf451zg4pktv5',
                retries: 6236040671,
                size: 3382028094,
                timesFailed: 3221099633,
                numberMax: 8529328346,
                numberDays: 2149111758,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'be6b8wpnsk5e3fufe5bofvd4v0imc8bhyisvx3tm63nor38bwq',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: null,
                scenario: '0xu2khq332ub55ywnhzpxqvouw8pyglxvba5bwhgkbcu0zkg5rllt8mupkla',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:35:43',
                executionMonitoringStartAt: '2020-11-05 14:37:42',
                executionMonitoringEndAt: '2020-11-06 10:56:38',
                flowHash: 'lw40g3fw7kxuwyfo4ym10ogattlvx6jp6d8gupoy',
                flowParty: 'q5vw5jncl4oib2eckt6251own8niwt6uxz4lvyt05v5137mzzfrjfwigatnnn0jbn9evyfwnt4jfftj2olmgoxe6sbh4jtniihwcoopymw642r1pisq48dmyj8karfh2a1qmlt9k1bpe1ueuuyzu3c7u4p67bpuc',
                flowReceiverParty: '0jebam2867yzhvmh9eeta29un9sdzidvb1dg52vdjsqgyzxw8znm1qfjiambzt9uw0ec3r5f43imj258t1cabf933y43kkupij7mvqimds51kuu6w5jj4u0dvcriu2y7f9reaax9r3b1rwva5atml1o2sskzgvpj',
                flowComponent: '203rkldxda8a6ub943s9bvxza261wvr03j6x0y61vfw6oonxy9o3wld45k34x9seg6fo8rjv7qlnypwhg0i85m3wypmhalsv91tum5n7g4onfdeaafevg5nrnkzrfher10ytulsxczwcdk7cc4148mtogal3hy6p',
                flowReceiverComponent: '1ozktfk706ovnhm2mf3lljug88dzpamgs49gwvv0i0q83rizrcigrcqzuqz61190r62onoa0n1n8ha31sr393mhs7bw3dm338yq7h4xscy99gli36wclq9t403q2fsmgb8vg3xlquve0x8208sc4td2s359fi4et',
                flowInterfaceName: 'hd5rbg7n9in96qqvvj7xfklh1ywireh745nzy5w89xepmd49id5cjbs7muwvlu4khbuj7eg73m5vxv6aezqy1epwmuyufk9defkr2hlflthnpp54iq07cbdgo0iq40m32o1hdr7n9wxcnvm5p5phzg7sm8lyityb',
                flowInterfaceNamespace: 'il3v352cq6hbjl30uslj50x5epwoztau32jfg087psop8exhtrr0qqrqr850o6u50oo9lwkg1zcvq0m8a5z9tqcosfuxdftvzu7988lxezlrcz21afr6148rkhznkizxhyn31vw8gk4zmt0quclad5va0z8yp9ox',
                status: 'WAITING',
                refMessageId: '5zqz8ywxf2z8ctzyupobiwzujf8mfeldfk9gosfk23lmpp2j9yemmzwhu2z4s7p13n8v53x92k75nu15vxzd9m46gqmdbnlc7ouwdy2cju2qa0fuokcqmmdi6hm97339u7gxgb8quayuosky089lj4y765f91xdg',
                detail: 'Dolores veniam quia beatae voluptas omnis laboriosam consequatur id fuga. Ipsa tempore est qui modi odio consequatur accusantium laborum. Nesciunt architecto quam modi enim est ab libero aut et. Quo debitis ducimus. Enim consequatur eaque officiis nisi repudiandae quam.',
                example: 'z2y110q0uienyj9n4cxyq26puzm4p50gaftasznzfyejlyjtg4ajnyfzzew97tyl7rtonwzmlcqq2s3ajus39qn2ykrn5kzty0fmsf3xozg53ivps4jp9hvdx4cnmiq2b1gc94fmeo2pf7fsr7k1xci6tnzhayb8',
                startTimeAt: '2020-11-06 09:30:24',
                direction: 'INBOUND',
                errorCategory: '0qgkbobutuqemngt66slkjedxciguyaock26x6zxupplfbv9t00e37veeoe2vf44g592oygo6ub7yqey1kme68elrcrtfz5qf9xzpos6fripmhetv7kevvexe1cq779d9efwxgenaokqa7dsufgqn4k2mhbeqp2x',
                errorCode: 'ogzocfzyhsntbid94jn3kekefml04gqmlhc7ddszxa35rd1ub5',
                errorLabel: 184764,
                node: 9194858072,
                protocol: 'qsx57ji88vuiq72keyig',
                qualityOfService: '9vj194amblnwcnp099dx',
                receiverParty: 'hebxsl0o4g199bly75o582qz28k67oryj84bel8685td659epoaol6y6n33542udo6hx6zmwif7bqbqik1mar10dyr0dws77y0pkyq8m21usf7be6x3zgff0m6w4nsntkmk3c6gmbl98j6of59kajmlqx2udvpjp',
                receiverComponent: 'qtl0clm49skqx6w01385a432yrqovtb3f29eamhhk53tms5ibdyzruj6zxzbl0zkfw1hazqimhurk47whyxa8sob14vxz4e03mvn8iux5hpylf0ng1qyjr8yejjd3op8ikuqghntsybbpqco3qy9d8hlsohz8uy1',
                receiverInterface: '5mfg21c739f1o2508rbwq7sis2ytea7rul3vl6kkyvlyjdmn4j4uplz05yh0668u1vkf5i17sgoss63ggxs1dr66rdo2qnoub7coxwkejwpa8co60tmrj3cxaoou8q8xidxwm4y7bit9hhoi1t8fvjbr2n1mohfr',
                receiverInterfaceNamespace: 'p7d3n21jmncm17h1i9j8hztdye9jw321940i4f9n7lo05n0w3si2jr76err26wm2o9mlxg9h6asy6te3qepohku6cibm2oq81fxpj6ibj12qw7lx7abyw78sqofm38lpatmr97rexuslhm6i70rauc7an6nbrfs2',
                retries: 5670297162,
                size: 2141109672,
                timesFailed: 3237475806,
                numberMax: 2242423072,
                numberDays: 1718385732,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'gp9yy4na1rvtnyrhwuchdazt7hhwronkzskacyk0vhlaxmcsfx',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                
                scenario: 'yvublrk4iscyes3soknajtyngnko33mw9jocw9q31hj1gxw9tlkftvgv2t9p',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:22:33',
                executionMonitoringStartAt: '2020-11-05 23:56:13',
                executionMonitoringEndAt: '2020-11-05 17:42:53',
                flowHash: 'tl193stclvgz010l20yknsq9fxfmz5vasytrc7w6',
                flowParty: 'em4w4z61mxvyi7ofg31khiku32gjwg03aqpd3euhjv2po2b907700sa9x910eenvt1s3k06sgh33t1wkawjwgkmiwqcj3j1pm8l6l20t6bivo7e99hqrylal75gg0ido087ttq6afs87d1spldbg5beazbx6j7t9',
                flowReceiverParty: '20z1ijk98lrpqsefgs05yw2qlhyazcyolyo1oqkr7vsahs8751htn6y8m9re59mcs3e6nrt83mbui3udmmtp3m033uqzlluq4ek73qut5zhbae1x2717ekvp5jy5z7bj82plujjl68hpc5gouho58jzcrvgofx0x',
                flowComponent: 'xjkkmeiqfoxwi8bf1p34vxggfp4i3688zxc8jm4dw23n8go5iazexff8e15q350d5ccff3p2cultwm4h5o6gle9x2zm9dctbee3jdspm6xfu1myjz9mik1kicu8sfpm3iy9tkcldjk7ja61ya8f3zu4i2d5xdblu',
                flowReceiverComponent: 'i0fmpppvmmoihn61izmmitc7edw2vwc4ebszkxy45kwm01tfq4kojkqj0rwz6xk3uq0z3fwt7pe2lwz8vj0stl3hsiqh3r906bu6dtumx38s43ygxdm86412yvwvnsv8f35hu6l248ia2dh017s8wmd9dn6lxwvc',
                flowInterfaceName: 'rj12is4ob97720om12w63pdcad8vr8ox0m0fbcfqn630540b3fxj977xmwf9utf326xlpgn2txy2vp28rh7fe8ab5d16t5l8951j8vur0gsr6gxqq75uijgyepbffn3od7721pjppym0l3h97xjwh134akvdlx4i',
                flowInterfaceNamespace: 'by362a6gmlp1wh3mil7jxxc8aqba4uerj27x2pkoskgvbwsl8rs7omlxx4m0ga75ierk109udzcrjb2gjqy1yn104mv3x9dcbipin24svliixgvo8gdz4ro8ieyhxl5kad3reyrdl3gjljktb8t73j8wf5g89jmk',
                status: 'CANCELLED',
                refMessageId: 'a57x9egzde6i87630ibq59tgocmyxko0r7qf39x3lv1n5dyy51x82pfpf20wysypr2z2q6kha0c7m9f216npgyubg407acu93jiof86p1hd59e4opsiay8agir3498zgsbusijhu2kbe6lepr722q1p3rppg5ug3',
                detail: 'Minima nam sunt. Odit laboriosam ea veniam dolor est quia possimus. Aperiam eum dolorem modi doloribus odit esse.',
                example: 'eznzmzxun8ptx00gebbtwow25tgybbn2xw3xx223kzj1gwv4up6eb648cq5pka8j2qhbw4f725bfcrxjsn6a311c34pf5tx7lah7v5525ph1gy3mzhxvpjqzhshwh8031v4va93r5veb0kn8eowuy110yxqdably',
                startTimeAt: '2020-11-06 07:29:34',
                direction: 'INBOUND',
                errorCategory: 'vb7zxjlfc6ke3i4y97d6ikhkbsonsn3pomzkoz1njtne9ng1dbajohr3c2odekhxgg5mgb31irntohr36tac8vdykmzg7q5uddwcjr6rpsxibeq9ne29q4bwxd0hxgqht3f6x9vql3ynnswlc5yl7v2ja69xm7z3',
                errorCode: 'elgdmzsqmjf1w1jp9z3td0uec7tvqf7bmg79un4li7xva0es4x',
                errorLabel: 509122,
                node: 5502704488,
                protocol: 'rznh8tynl07u68i1y2kk',
                qualityOfService: 'o4yzchj3ebyxa2uc6gsg',
                receiverParty: 'k21xcv6vyxuhvf9hy1qjo14jxptdxtpvvpvomi4ytqi63mh06oyawwb4gvow4ljy7n6mmx06e6yly5jiadt30jgarimys1gcp3dceecueoa0epcuj8g684e5h48ppga558fd31qc8vmvtdk4edy60ckgwukr3pbg',
                receiverComponent: 'sj2hnsfm2f2ympjqga0guftjaryeg5aqnwube63a7intnehnprr65hljgptunueq1ybema3olp7z1efbzpt8a3qn9c2h4npswzo53o28e9h1rk14qmokq8x48omk7wvu84ehc7c1c06krhj4y2pcw0xro9jdajc1',
                receiverInterface: 'f8sn96oni444lh44cg6b54w21spgh65w6jpn1pykn4g9kre48hgxlh18krkwippe079cxvq223x88lq5duj2cqtx84o7ec4sgck2jvny34bldukls2kfnybdwhdmc611afmkmts59ievb7nj4pu0sc3oxfczfp3f',
                receiverInterfaceNamespace: 'nduhwnrnf5ue5bex58xdqlq70p8e8pdewzjhj6h6xwaco38cz0qwafw6ys1eoddb32zcni8y7v7u0dj46h44n4j0wfitzgc2hy9l2dcqgm9dp9xfgo5cp2eypwy6f613nmkpye6zhgx3r58qqw3tecwgikt1z1d8',
                retries: 3720607222,
                size: 3306131715,
                timesFailed: 8174344513,
                numberMax: 6133232129,
                numberDays: 5304105553,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 't82rv9pg59uryvq2zvdxv9q267qe7s020yri3m9y3v2pb6lurz',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'dlcgzbolyl0qx12pdcyy',
                scenario: 'ctnd95p4aqtjvywwfvjhxh8fscxkqhcds1n9s8n4kukxj8200xs9chgn6rvr',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:18:38',
                executionMonitoringStartAt: '2020-11-05 16:49:26',
                executionMonitoringEndAt: '2020-11-05 16:22:52',
                flowHash: '8alfkqtspsqct9vealdvr7sa8ljysn3h71596cnp',
                flowParty: '863fob1oysutju2m7lrn9ebw2bq96cs0urhan4rhvaanpx7n1ijcqghaj924k6gcsqeu2sxbh6c3n4yav0v47tqvsn9i5aozihoxdvshnryvp5roi0i4xsg20z02dayphml1urlyudw5vu366k81qz17yvauslke',
                flowReceiverParty: 'tvemut37776ggowk92uqx6qhvxg1vaxa570nw2unx5d9gq1oxrtodt1jyqx03szwcmwciouwd0fx9867oss1lp1t0cl9tkexamsvf8saxsdf2re4qnqmipx37qsg8o3ry7609wn2gjlknkc2fgfpmmop66vq5t0y',
                flowComponent: 't1suqtpi4yz1jwfl78ewpyhwp33h1m8734v5hm2s556aaca962em7h5vfie0tg7xtxn0ckr89d1igbbzglai9j2u7ju4729ufuxyzz4ftgbvbsm7z8rkmoo8cpiy0j1byu5fy3g2nmyo7rrc8gs3lohuv31m70x1',
                flowReceiverComponent: 'xpdqttpqilpojtq9jsycgdou4f5dbi6k1v01mqhiptmw38b9yhn0w7pq3jxgmx7ws9gpk6jkn53ijclsm685omgvtkg8w8w32i8zolyhifabakaam1jt8vb3rbdsa1lnjh28feaev40cf16qv9s4vimtljkkxnqt',
                flowInterfaceName: 'ywuj3v7m3mzgnc6lg6wjo7jhakfzw1xeby1arxzbmnwdo3us1mjtqg7756wzae7iz9erjji8wh3z307fbuxcy2hyjw7umy96tp2jxci0y29ox2zegs7s2yca9olgo58q2lwfc9fzgvjujqtj04fjilo8c926ew6c',
                flowInterfaceNamespace: 'egm23rqqevwy6yf3ze20oglkywm76enw2xzlwftqrbx0pxgw7mpypp5fggji08hwzl8w2ys7lytdx5indo16y40yyquto98afacem7qsxq0ppvmpwcbsf296n6yjwdc474iwh48n0l0ldokr5i44zdyhamyi96sr',
                status: 'ERROR',
                refMessageId: 'wpc2djf0y5wta36r45g3u0iowh8jachi9i7w2x3ffe951yptg72r4buqoijjb9nu9vmsctwiy3fof7nadyqh3ph6hdck8ov459gsd7ia7hqnmbss2kcptp329rl3ztezwaig55hwph0nkqifiarlqnmso3re4wqs',
                detail: 'Et aut dolor doloribus quia sed. Et debitis illo. Velit sequi molestiae et quia qui fugiat maiores impedit. Libero suscipit asperiores quis culpa possimus numquam et non.',
                example: 'sopi0t0r6u1l8d7d15exs6m4x32oryzy8qzf9tep7vhcqzczdz66jiv3bb1eqgoex0nr10k6xjmpyhjumze300evev8h3jadnye7zpgk160x1d4azeyoqrz14hfkkc6uyb8q50xkxbnf7alatxwl4qutmd9e4n1m',
                startTimeAt: '2020-11-05 19:16:06',
                direction: 'INBOUND',
                errorCategory: 'yt2ixjqmpr09d8qrewydgyx1suam2ke48xcpg416zi19a5arjgbtl7v1g3a63y7j1j36178veswi9cqb31eflrn9b5be2lc4c8gb1n4dhhm01jinqon3rdc0i7lwro1ah5ts616et3mqkw40w1ywq1s93svesihp',
                errorCode: '3yw6ql7aicf019kf0v7gymd3smz6oruf49fn8iewq0yrd87mbz',
                errorLabel: 559558,
                node: 8268302133,
                protocol: 'vpctu9xuvtsx4w48nn27',
                qualityOfService: 'tw5gztakyijtk08xzf8m',
                receiverParty: 'oci4inmondltxh4p7pzz1d8sx16bozee61v8bsqug2b6tnm3t8cx5qmh7sopwlsq7gi25gwid2kdmnyqd6coeimwz97xdz225bzzneu4c4sd1lr5m8w0keuxjdp3jms4loc5w09y70y5s1islg2vobpsbd7pcqzf',
                receiverComponent: 'nptcqhjt0n2bjfz4xp811okcoe6u0en7x29frace7pw30o298oftfjlrto13cidp8wzwg72l1awpd4ryvyhbkbdep1gr4dq3e3jyi3z4i6pjdcfc0h6uv67vutam89fnkqty60t2awr0tstli717uyvr3n9ephqq',
                receiverInterface: 'zwwaozrpyejmb4xvqiw4ugf45xbuyun8gq381d9a7mwb2dghm6zildmbvjtmi0npt9d0o0s9ticyi00pd4tacu99a49e80fskxbfouny849kvwf69unwu1x5g54o0ouin1kk1zu7ms04k8tftc3yystvijkal6f9',
                receiverInterfaceNamespace: 'svt3pcslnbluq259dz1650xmqf6md7cm1ofydpaib6sud58qjnb67w5h2ak9evqq2m5lyhb0n4yakqydev895xwwgxb2x5wrzenifh0yvtqm36a2qu1qq8bentkiaifbnwrbd8nnnu5ndcvxbh63v09tk9z0nem4',
                retries: 1012344918,
                size: 3371924159,
                timesFailed: 6672679896,
                numberMax: 2903391892,
                numberDays: 4339051733,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'hkp7qbsqkborx0wq3a2olae6ogq0lvubpwhcikshtre56tyax0',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'i64noxiq3ugf7lpbfvy1',
                scenario: 'u6ahqqb2i71jxuco3vnkqtnz4a6egggax243sdelsr5mtrvk5t425w5ndvwi',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:54:02',
                executionMonitoringStartAt: '2020-11-06 02:01:02',
                executionMonitoringEndAt: '2020-11-05 23:27:43',
                flowHash: 'vx6h2u4hs1hnie7tlsg52r1nwqxpffarhy4hzqqk',
                flowParty: 'wtwxosggc7y0syhkm8fd5n6kh8x3p3b2i281plppo0fzl9nvroz23rh36wmbpgix0xjq9cglalo7i9rni66pgkdto49gjl8x8tgoad6dwfg4paa0b7v2e46k077hanrj0fi52kam1kse3otc0m8d4ome6bmftrje',
                flowReceiverParty: 'c21xw5lyb7fi1re2r2uoo25fg49vq4tsd7nf4k0dj5oz3164ybdpgno14pple15t7821uf2isq6eaxl9u3ps95ucs71r7kx28tvg4j4x0rpctj7ncfgb3an5mqo7mrj6ccgm6t6bgjbwqbdpl6cibi1j4f47vf2t',
                flowComponent: 'g3nakzn1asgfqkk0kf5dbjh36yc84n92xsxxfc3rfdp09x8gp3qmn843sd247sus0iuuwbpkrpvm9mnnrhh4tyrm4wj0jfaokfb9ykayw3j8f0ea2az0m07j8byohlitt2ujcltd7t01us9lytyy9aarw4dz7mes',
                flowReceiverComponent: '4xvc7uprqejqg9epo14xvoxnj03si8a0q9jdfprxh5evshj9cntpchnrq8zcow8dhu9bi4e4jp5nlpheumnq62lax8w7hj57v976uzopkym5qosb590r1vd82lnqljxck4ptvb82kbu1xixjs1ukgtfzsxpjmgwv',
                flowInterfaceName: '1v1h81q3s8wh151yxnmn27q8i2c8uxbfij38fk3leq4tc3v1hcra75ubzx0suu1c6p8c87r2usfe1p9e058zbmnf3810l012gti1c2k1cxpmttm1ow611vhtoszylhqeuewp3qb87fv4i02b4z5118ijmjwuklta',
                flowInterfaceNamespace: '3k43je3wtigs0ql33jaegbsqfqg4r4hi0wpfko526pgl1y7ui10s9i2hp8gb9uabbudpj5exg96q6uejxu8wu6nn1tnb6tb7gq3enryaamkz3e9z4tgf8z8rpcoayknnk7w1v34a5cwsigu9sd18y79dwz5v21sv',
                status: 'CANCELLED',
                refMessageId: 'z0azp0woq14qnhb54h9fxo5rwz9rcwkrvgy5ai2wvzzqe9cqlmdfc063oyx2mbiwy978aokffsvppnx0lih273jhwoq9y9eahlklzxin7qftqtwfxwadpalz6488st0julrknkw8hpbxvpu7uvwuk7nxuppxrdoi',
                detail: 'Dolorem reprehenderit dolores nihil est voluptas ut adipisci. Quis et ducimus. Voluptatem doloremque nam. Autem ipsa vitae ut porro est.',
                example: 'lq3ngb93h1il3uo4icr5id4ur71b2cagkcaik7axp9s9chpzzj2jvi632htzdbjj7v08qdlqtoiy6sfmk31g8uef6ufba39ywxu7f504c3g72yice7qx8v0rcnxn2oc7605os595ykivjpupuxf3f21djctftpz7',
                startTimeAt: '2020-11-05 18:02:29',
                direction: 'INBOUND',
                errorCategory: 'o3mlyrwybq8jm29qpgtsum5tit8108k85c7jyqmhl14eh16in6oxtrv6sau11dg6uvgrnjs83ayqq531b82dfhnkdz4vg83smyelpa243izi05ob9wfgdxbnh49c6wcgatoq3rn646u2p0oorww4w5z5004r8tj0',
                errorCode: 'fz4mi7gs5fr73n3udv9gfuceqpxr0qmgogbiex8lbbqhvsdyqn',
                errorLabel: 804147,
                node: 5072227068,
                protocol: 'tpqc8md1xdtu3zm3qy04',
                qualityOfService: 'efm7iawrmk3deqnxouip',
                receiverParty: 'l09l5zrj3glru37xl8k0jo98ew33j0uo3vsxcpwfhdhg1felqk0mbu2ifq9jekrgupvh2swio4ry4uy3zvk4xfpln6luvodj4baul1qjxix3vhfkm4lnx2bnr8i77qjub55o9pp986jlw4suw99l5y7cmz66ulbm',
                receiverComponent: 'p96t1r68kkajv8pbihxbg1bzvqj07nsqmwr6f275n153gq1hc4oey7fma3a5unxtyhtl8hn94tmyxp4y92qcpqzoshjo9ef5v2fozz2192zr9ajivgz6ytkftglt39cd4xidcig0ne6ap8stwl8jzxxmal57pxa5',
                receiverInterface: '4pqbt1m1y9uu9wljezhkxaw2wpfchktvgkplfnlcw3g2kki0j0n2rvmm7kzxdc8wkolfipuo4yadl3b6ktunbfog5658i6zwruza6fimfr26g0il4z7j72pvc97ocwgazzje3rul3h9r4iif7vzyq8br1pw0sy5f',
                receiverInterfaceNamespace: '17eo61s6hytij6bjcfrsrqq9z7to90h09edv8vpnvzq3febfe4xyo7hqhonzps227sdivbbtxpufkokxzhz9gy59olm7wcuts5udslozejtysdsni5fu3b3co6rc9nsu7l1a6iw8ts00z1l9oiz9p45274iry98t',
                retries: 2830944066,
                size: 8498689908,
                timesFailed: 2136152361,
                numberMax: 2966004235,
                numberDays: 2886218571,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'zbapldn58qmvp9puyf8o8317hlylxazhvdefw0zkpj76bd1fkl',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '2g9be9lyogd9mfa4d0w4',
                scenario: 'w9o0z5pkriduwh8a9qq4s4nenw7yzf6kq4uylsafgte6n9addxhm9x8nkydj',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: null,
                executionExecutedAt: '2020-11-06 00:45:25',
                executionMonitoringStartAt: '2020-11-06 02:39:49',
                executionMonitoringEndAt: '2020-11-06 02:40:00',
                flowHash: 'em6504ol0dxavq9ivr67kaacxs79xqu70328g72m',
                flowParty: 'fytzv09qkcdkmj49i7rlc8nm7xa5krctfswj545ponma9ufdb65a3pdjh3mdaaxshd1lbxxmfll24tg8o14hjwk6ekekpar7o2knq9lp7b6ofe3wobei0eysdq74balf20ma1sqd8byyxt9vqtvlplwsu45d9um2',
                flowReceiverParty: 'bze1dmj6ed9xazg56iytg6l1fa29jfr77tzoog6mwdzx9o0gpdq9c31ot1h2u3s0vn2sxm7t85vm1rb6e0t75i05m5j11dpcxtcjgv1iib31ubc8xhhkz69cbdf5xug6hiefztsjgnxg8gd2htnvc8lcaemtwc2u',
                flowComponent: 'l6o6f7ql94a7pwuem7z058o515w8l5ubmeqo896f42uco1130t4nou24r44hxvry9uvt9zc2t580o9ohj3uhx6enrj3apsgqpb4rlwwdfgfuhqphkmmo0obbjbwz4irjaoyy02ji1o432hefqjbwb6duutp5voey',
                flowReceiverComponent: 'ipqnp1t6bkn1tssdvuj3a6tzrw3l1azmhzfi7djgj01y1esibwezqddrwhytm3opkjeppuk37jydsgmghitb6hawsaaa46qfhcviu3vgp7la3zoiifg69dnhwo3tlcs0o31xlrlq75l4e12o0hcn2m6nbpealcbw',
                flowInterfaceName: '6kmy5u50gop42o17xk9rb4hqem9cmbpcumtpw1jzyv3aj1t8iy05leu3gbkl6gbgusmxijb5d1sf45qzge425lgyamutgubgovp7im2cn17m90sh2kf0ft1kqeyjz64wlvociu5x800kz7x9esysr0lewzbjajhi',
                flowInterfaceNamespace: 'jiob2rwezjktwcb22fz83uf2qb46kvfs80g6devyuvtwffdlzkbryg3ynj34yulq3a0wtmq3zs1hjxv23z7896tuc39i8em3tjffleoadoxcs9on4linol14hzavthz31kk1dbqqoadysxa7jhy0fbvacr18vply',
                status: 'CANCELLED',
                refMessageId: '0b5x7yg90n1df5wbeibudss81vvhm2vktdw30z0r6myjsuup40a0vyaflqjynnajqlobtcc4e5qro7xijn1q02y4xv6c8u4qs8mj5kbdg2h5ivlgvr0zq653wm30n9kmtnp6wycl1zx0yqpa95brw1x8x134yhsq',
                detail: 'Voluptatem in voluptas exercitationem autem. Voluptatem magni cumque numquam quas. Molestiae debitis veniam velit occaecati modi. Quae officiis sed esse dolor sunt. Dolores fugit dolorum ex asperiores vitae nihil molestiae. Dignissimos vitae quibusdam exercitationem ipsam fuga natus.',
                example: 'wjdiwmx095jt1l2kglr944p8ef42ni0r84jmcux4erjrpili68xdvps9vquygo09ckmomxak2z177b7s2gj7fs8ep6j0yr6czpdzp9b4gqpqizfbs9rtwvt2jtyjvjwor03v5qdmlc2mq4a6vsh5vau8h357wu19',
                startTimeAt: '2020-11-05 19:04:44',
                direction: 'INBOUND',
                errorCategory: 'fze7ixomb2lrddi5p8sg0thzitg2ny0dgspxlbufni2lgi2w7f641shgu5wz7pueat7k9nc4j90n353g8gosl7txi6gpdffh07g6sjv948sqx3rn96w3rjxmbkf8uoxmqmmtlp0u0qtuxbo4oupld4buslh2ashz',
                errorCode: 'lzd6k6nnch0oe3912gylcrio0x7yd8oim3d1edjv1eo765q7j9',
                errorLabel: 605852,
                node: 1284870668,
                protocol: 'evjghhtg59vsjmqjje0j',
                qualityOfService: '9hoydekqt2inj8k7daeo',
                receiverParty: 'o5stjxw1uutzcdefhj8gymqgi7hechwr50t9dzqc1m7wez4c98e8drfq1j0hay2r38m3mz2qyr9o0iz748x0j2bdg7n7mbxbkwz63wgu3ax799xg0l8ge61ig6a68rjeyappm00zhh3ip49ypjjijvl638x3pg4l',
                receiverComponent: 'bklve2sqcv12dzlrb7jsa2u2pprseweync5djmadkkxtv7c3xc381zsk266l1magusm4yfq8bircz0u7ti39f15ns4ffg3i9uqe78qwiuqre4nvqef0fx1lqyqhc3fvl90khnerfqr2ga9muc54jczbisktqwlse',
                receiverInterface: 'k0j9m7tc9ynwvtfvufbjyq9pxvorohzhfdl909gkfnl45e5xss0c9spakgbckekzfsun0h9h18kk67r0dgdrp4c45xngnb69et6iklikldxc7gilvfs073cd99s8u3nrwnjb74ob9ey84kjru0vh1177vzi0mbxl',
                receiverInterfaceNamespace: 'uf1me9ds7wwykzw1xyivnqhljxvw28c0hjw4l10g12vl7tw5c2szs0zomwjehceb9g8lbti26pagrrsp4r5l2pvfy6tp4w9ix5yue3ysey3mok993wrdkg6zy2ep7x3v2nypmffmq4ev8bbl0ggb8imvwc2t81e2',
                retries: 8783409379,
                size: 9770852631,
                timesFailed: 5739416804,
                numberMax: 6180522481,
                numberDays: 7439083304,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '3ep2t6p3wriw2pohxs6d5qi2p3n8b3mcec225okbiufmxh82p5',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'fa9xxjh5oyu3rg1xoz7o',
                scenario: 'viks6gq9i823i3vzeqs4mpw4lerc48jacvjboz4b78hthi3k3uw8cun3ti4w',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                
                executionExecutedAt: '2020-11-06 11:26:25',
                executionMonitoringStartAt: '2020-11-06 08:11:29',
                executionMonitoringEndAt: '2020-11-06 08:40:49',
                flowHash: 'h77c6vefu6qix8y7dv97jctd8u2y69ftqt7mt0mp',
                flowParty: 'd14d303x81x44nvghjl74etlzpdcdh7frvvxc5e9q53iq1olhq2bwjr7qw1psm7rqtxssjr7b7m1cu9089wux8cwyhgmwc7tk5wlosoavzc8u3hubxrng99gllt4z2lhbgsfu1rgp8u4ujvnxpj2q3605lei8ong',
                flowReceiverParty: '30jzqeec80eh6hw9icpmp7holrh4gfjizcluq0cutxhtbyqdnl1nydk0f4r5s60t5ea4ev38mcji6d2nxn97qyvwwiz36nbzt4r39gi2k6ch1lvofp0628bx1z1lvy4z85lq1sa4zh5qdtykg2ld9fah7ggn4f0k',
                flowComponent: 'i3s9kcrgnpdd88v4z9h0nreh9bzibclpadpfaz4mqaxuwxh2s5fkv8zvequkpbe2a8civxy0yz9or3uhnrucdmo3vnshgwtry23wv7nw2e9aptenlnh2m453if359o04ja2dtvi6h9v2v1j6jume78cergeky82e',
                flowReceiverComponent: 'ao9a5ou2rpz62lqm3gba6rzmrj6sj3pau9qgfnka8urkj4l2b81mtj6tmevn3r73ggspzemu14ozuz6siirq910ef8uz35nbpvc5x0dxa74yd324kboei2tbwqe7fj2nyk1ydi6ky6gcanf7pl1y6axjnexlv3mv',
                flowInterfaceName: '76te2iux8i1i0y57y2bbjavt5pd0pym03pbcd9vr28j83i4mf61cqyxotxmnzjef5ikegnhurz7c45r6awoxd9njtopolr7jdi6scc1j2ogb2u24cvqdjxtnl5wx02lz5rj57mdp517qx2is5s9bzew0r9xydbzl',
                flowInterfaceNamespace: 'gwd5p6fip170jm7pzl8bsv72d6c985mpe6apl29o7pnobigde61cqoikt6zdgaast4uzq0a0gx5682cp4gndmtfq06d73qpptgul4dj4f7o56njpf11v2upigsixd5s9628covluky0r9aqhiu33edmm8c7co8io',
                status: 'SUCCESS',
                refMessageId: '7kn9dfvauhd5wmp7itp0981vrmewd3jy19q7yul0xezg5ll9i311s1y6mj0zd89txqohm7f7bhb2t1kbx9ufgfx1ksk2lttgq5vup18e8de5vjxk9587z9u70l0ehp7k9xj5ygkibex24xtsuvkqubdsjylgsfna',
                detail: 'Aut dolorem autem est at ad qui voluptate. Reprehenderit nostrum voluptas. Veniam non cum non consequatur quia doloremque. Accusantium et necessitatibus sunt consequuntur. Aut fuga rem cupiditate.',
                example: 'j8gjtkylpzmvmk57hky7ec8uri1eh5yxw1ypzq2le043qatfdo5nescnvcv2lzil379bkdqvt2btw9k1zs2ruj2l5bai8qn9z5hlll2i838vcnvg5ygf4vo1xrxjmzxoqbuw4src88seo596x7k22hwjhh32qnno',
                startTimeAt: '2020-11-05 23:43:46',
                direction: 'INBOUND',
                errorCategory: '91ao6hapnux36giw4cq9f5mzby2ohgj65cs69vhylcb2ycrt2omu7ua0k58h4bjtab5fmv36uje2bxp658d6fnrb1w4jipfbxpxl4ur2zyp3clrogklnrj1mke5pbwia1rsspmsnbn9b0cvpp4th8zutykfvu3z8',
                errorCode: 'zsn7s29totyewf35rq3nxcga5jfkch4hq2kk3c1ssvskdi32mc',
                errorLabel: 460225,
                node: 2943794921,
                protocol: 'mazhel4bg98ikzbmbbk3',
                qualityOfService: 'oafiu3k2681u3svwo0ks',
                receiverParty: 'gvy55q8vxqna1ogx6azycw771rgta80jr0mingxtbizomjtfsig6vyp2f4ew3w97xuasnn1fcpp3ztbdpic1sviizfaolh3cfs9vvrj3n2rnsh338a2torektvggvqikexw4ssb6yh4hdhi3wwndip5b4hgx8ly0',
                receiverComponent: 'd42ci0oyddo3gi769jfdusna0ohuggp45910jjan8y968nydyeqai0bzk7g7rvf5yv9n80yvkebab5ftjukj6bjmt1rqfqlvubcb2kque4pgch2ps6tx7oixg3f6q1p552ydlz7p5088asnjtp5prtn7cl57i140',
                receiverInterface: 'qzagh3d15ec8eilaxtz6q583im71ick14dvnlz1t5mn56vl2lv4tnt0q8u9lx93e2sdvdjg4mjrb3ta9uffvhk80zor6e4ytl1myiviraxngnbbk6j0ukp47yj8mw8slmhpzxtoixynh5ipkr6y790p76qlhxnsj',
                receiverInterfaceNamespace: 'bcwui8v134qcw5qmbyjb5kk68wocofvsgan8rxiahulunl5di2vn6614evvw48veasj4q0vk3lp5sc7stn7zhrbi6ubnkmy1bu8znrjckj5cwwuofl4riy1ldubtjjnz8kpkh13t0noltx8kil2f0avv7efdlug9',
                retries: 5942059015,
                size: 4902734098,
                timesFailed: 1107782827,
                numberMax: 2599715865,
                numberDays: 2098242491,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '40twwqwbuyu2fzdcl79pylxvidgyznogolhfxbaq24gyc7rddk',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'aa81we9demk679v45o78',
                scenario: 'y70fis9kweeiaqbegbfbe180x72u507ahva301hzsdiaccovkpkma1ha9sfq',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-05 16:22:07',
                executionMonitoringEndAt: '2020-11-06 05:07:53',
                flowHash: 'ynhg5ye31bjnntcgk04d9fn82cp8tdsim92at4wf',
                flowParty: 't8xs3u5t65ectt9ybz7k08wxq3vzcoapxlqt818pmlbolbaucq28r3kcyl9t3y2gu4hjpxrk9fd4rqt37euwv04o5ypowqt9n3n2r3zz1e40vx7ke0hvyz2ff0xd718f46rnocn2fqozkep1oox6tqs6603t26au',
                flowReceiverParty: '59dsq3c3w17gnw8uxn902svjah9oka9e2kifaflw8qzg04wvqez1c4tp2e6jtiojcdi4852gd6zu9hb5mhu30er3kzyht351bsk37gk9dy152sxgdzboj6vxt36sg9crxpoazqfja7nqooup65v7g8peayrxi04m',
                flowComponent: '0t7lngc5hs4lzesuo0t89p92owwg501qosir97dd7cct802gtzkpzo6zpf7elgltg8vway2ah0ch82csqx6ck0ofh19eh9ot0mp1anrcq3s2oo93re79oxcsr9nte8ugkqmka22o0n4gw59zqs3pzjocajmoicug',
                flowReceiverComponent: '0l1go9xglvrmrbld3jnnj2v9xo02zq1id5dkwfryaulmrkjdc8z84l7yltn4es7omn2za4d8ej2w4zabuhiah2ocls51qq6etocxdapeyshnun8h92g5l86j3bsxzpd773xjxufpht34jop4vqdzd4rnmrnzz03r',
                flowInterfaceName: 'jv7zf98b9imuu4s7vxje2doo8auhq6rl50t1g4e6j8l61zczs9enouvtyzrdxitdimyturr2ivflmadukr3ujeuowr0l77h9372ulbn8wnrz37fwoxbiz0z709w90sorl937e3blxptonmdgrr66j42qkneh1nlu',
                flowInterfaceNamespace: 'yu77szd0p73lv3eqz8k1qjmdk4r53b2src4jf7ohinjcijxhnjgpj6wlbhk8s9kfp4tv6vffm72splgwmersk8ny1wt6uwtv1331kgs49kq2ep48902cobpal7mjqpur66dztnv2s89o683man0ql32bba16ors6',
                status: 'HOLDING',
                refMessageId: 'eqs6cmm56o2ihlgkqpc7o7a2h4mm7ex64b3renxj44af577z7q5ync6s6yz7f7bireki0984vewf7ka93l010jn4024ijpe68zdfiw0ekdxj7te2oi0v893a9heu1sef8kwutus2qrpie7sh8jxepl0hk088a8kz',
                detail: 'Labore suscipit non velit laborum voluptatem omnis consequatur maxime. Quia provident rerum voluptas molestiae nihil maiores eveniet labore a. Quasi voluptatum et consequatur reprehenderit tempora aut. Non exercitationem nesciunt. Cumque et nobis quidem quibusdam sed eaque.',
                example: '4cduedakw9r9pydcd894o0abalpd9ve64dv3d29gcgxb1r2b39cio589t4ndld7ts8mag09qlvhsrh8802l2oj93ijbh4e0eiahgzmbc88jsgdppt25y0rk4ujewlfiy6agok996db3irr6241jim11g4ywopllv',
                startTimeAt: '2020-11-05 16:16:04',
                direction: 'INBOUND',
                errorCategory: '7dsje4rv4vekjjgqa4s722npve2dkc5x47r6xay2pbtjo2hcyjkfnzbxp9j201qbsv0ofnuarpclcxum4yq89v4pwkrc9rum3fe2iv3tlyfeee0qjun2vtujdcppkm2cqyyexe4x90a5e4exlu8xo0ddqbqs0fw8',
                errorCode: 'vwe50n5elgm5gznmcazuf6td8bdznlzknvic8o0b3bltnztb9x',
                errorLabel: 168847,
                node: 1196701911,
                protocol: '5xy07eftzneeojrg9xk1',
                qualityOfService: 'qkmi0lr2p218mjenol85',
                receiverParty: '903krhgqxzy0pi61vbvdskxcladd6fut82mn5zjajlq18xbi9b9djn74293qmw68goeglwo9qmbe305cwz5gcpv8k8j6jdtdraugb93z9ytqk8mxr9xh22prjt99qckar1uhppx621dhodpm8llgb9d5dd3afoai',
                receiverComponent: 'ejhbray0x55fdk60i9mj280m9s0i9twdhjjwbrixe5iapmy8c2rizveq71ib9tytkdqbw2c5vrcsi65qac7ekco8bnzdo2w3exzj3gn650dla85uan4oteuyrmw6pbnmqg8u2sc58ma6byg14cmh4ku5znj1yjn7',
                receiverInterface: 'eo4zatunkzkplnwkjcjqh78ntvmaskwj5vobrx6he5thnejpbsq9frxuj9jvv7ig9odf4xldizi9cc44zebswq7kuaym1sgjg5egd2cwv2lkh9eqi3zfwrn4izk8yb0kav0o5kusyw95s9mweqxxo8lvju2hlqat',
                receiverInterfaceNamespace: '1845a74ig0lkq9ez37m41brwuszb435mlx29sdn976i0z8pt4e5oelgpdmqxjyzxjxkz86p0hq7hydocebbht4s47isjia5prhrh9jsldcweqm8z0t3zivi29soelplfyvjex0yf25e7784ijfqxnf71bxd3bwfu',
                retries: 4801006113,
                size: 2163689560,
                timesFailed: 5636278542,
                numberMax: 6275523407,
                numberDays: 9132474843,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'frvv4hamqywync1plybjgucourp8koxpjia3z22fr7w2ucbkk9',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'nhd54u8dcw6rwpb9p24b',
                scenario: 'ij0s4isg0cqs17sywu1kbwpl54z1o7ir1x43xiycum6bd6luluh2yb5cxu38',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-05 16:56:35',
                executionMonitoringEndAt: '2020-11-05 17:50:13',
                flowHash: 'yuwdyu584po41tw9trx57ce9c3pd4ikfgqeh92rl',
                flowParty: 'b9g1frez0tie4hagaujfw06d3ihhhme0lwfiv5ypq1sd82s0ufseq58256r9oxnr5at51uab3jl2inn0ts3hpklw742bz7g9ln9todb478u1d4hwdmdsei6xmdyp8q3esyub319vddw84p8xg7d5ztuvqrlizqxo',
                flowReceiverParty: 'lv93mi2iqqy8v83irbxywnwlzer3v8c55h5l9b1662l4wm7gprsttxauiy9963pdajmfybow24mmfqkpcvkbl457xny8k9c9apbrs5lgabmu4644exvt9dc1molrqwbl62ap9njw045u58xkg13d9m3lb5ei891s',
                flowComponent: '7c3aryw3cwb7ca0mkyvswzwzwgt778emkoe5ilf7ueah7ajz9e8zvclbbb2fazzctykx2fygca3r5flsivtegfxvs02tbm3fadv3fm4zact1sm7y1yggu83mhbh37f5oh0z99d1ne8vuefpeelz6nz76r9h3dguw',
                flowReceiverComponent: 'r33clxtkplozajad6hhi6plrojf6lullqi6grqi9dh1f4pae3hw8lzhlb5u6pc4k9qymruycv7lnd1bm9jskwesnhmhivp2d1195b6kcuu8yl39o84mvfdokmd7weg9xob2b9jdw2fou0v9qic2w29h3vmlzl454',
                flowInterfaceName: 'e7nj619uqozo442gq5z45vsdt5jfw4xt3m16rx6vh84uuxdwcigkhny3469dwgr1wzq54kapdujlkxolwhb0rfd68m07yh5pqj2ljl84hc5hiqpxq4rx1r5h3emwvjr3inrjjq5vxitrl1dk2rbqeptnwndzufo6',
                flowInterfaceNamespace: 'b9sqfqx6qjew52s0wwmug2wmmk5mtjj7ddwip2wd2w4tv61aej5vpfo3y2kzf8gxs6ffjd3u4veh22c64ij7bwm72cjd3hoqymsoq75aca0hc7x88fif98dyfy282904w0ejgamph2es7qh5g9jpr5p8mcqrblrt',
                status: 'SUCCESS',
                refMessageId: 'wso8tm5pnz36dde9pzcc4re34ko6qpavres9jo3ptdl5jrn2sdf83a56ak1tjhkwp6q08jdqk8k1ilkthuf4s8ss6kvmqr3okntl77keykh70qmgij931yhnoujo1jyb1vaiewnasr3rzbtn1c2q87ro6oya4ohr',
                detail: 'Quae dolores voluptate quo. Repellat nostrum deleniti eligendi in eos veniam. Consequatur dolorem totam.',
                example: 'cs1gguqho6qgi51921bwlldj2lxo9lryu2vhbs6lug08i2chnk0g45g47h5vzm3x3bi8uaa1nhtt5j56glsz7a4s56nwwy0f9jhlvg4ivoqs81zejwuzq3psemvyfh203mn5xxrj6dnkq9yurk954f7ddmi1tiaw',
                startTimeAt: '2020-11-06 08:07:38',
                direction: 'INBOUND',
                errorCategory: 'cytklatp9nen7r1h3axwp4uo3141spovxe2kiu2fieuphd52s2siaxmnqwmlwxnmjl16lgtu96kuo11h0lpb6j5cyl7feq369ijkp9g5dq1s1c8n71vskgh1z28kttrb3pnddpruofi6czykza79pux0fv47akdy',
                errorCode: '2e0kujvjgphhqd0bc3rlq8xdyz91wzk89cnscxa3gs4ih3p59e',
                errorLabel: 767190,
                node: 7781169144,
                protocol: 'o17a83pbx6h6st69vvyr',
                qualityOfService: 'bv7p6btd4m4kbm7ahafw',
                receiverParty: 'crcmra40cch722v3elmgyqwi9p6xe4iybzezabf644ffgy89en81r0ylt4p1wmf4x4qbpizi9rjhgllf7e0qlxfyds5xg8i9xhteiic1r71wiv6y7ouby7wiafhetqehqjaw77ybq62snsiiivfor97rdo1spa9z',
                receiverComponent: 'mi7rdl6zz009s3jwi68abajomwyguiscytf5nrf938zg4uoao49uo8orfi9aipa6313jxiiy01ha7mom3nwe9hrccylkyk7vvk7t3rlu9baq08fqtgxd7m8fm40jh0qjb34w5bwkzntfayey6c0nflh3o3can4j0',
                receiverInterface: '6jj1w9pjo4y5bjf2nindobnjlqd6ihuah138ywb0wum4lmmp2corh32y9kyjtlvfv30fpop0slwjjb0kdnxdd1zdlmi78hesh09i7oh8j8c82wr8rg9a20po6u7m09zpcwtvxg3mzn12gojjxqa2zvnhpvcgrhpw',
                receiverInterfaceNamespace: '5s3d59hy79nm241gmp3d1hh0l9wa81px8fjb9yi6n2v5u5siswzvaajj0bwvm5yxonxdrsg4bdooshgn3g9gyztbrio0y9k818mndqsmlwx2vcu5vz1k87bry7386nb9144ijn9aun8pbqa8wlujd5rxv5xg7623',
                retries: 9476432315,
                size: 3704075979,
                timesFailed: 5805538162,
                numberMax: 2656715663,
                numberDays: 8439451585,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '46tmaqzhejt5kx29onn889sj9qogn7739t9gh2u0vizqvpguo8',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'awpthp3lj012id39vhwt',
                scenario: 'a9oxvurx93qfzli40ejwa1ecpwpjsgktvf9vj3lpw65nwxh6ksjpr3gnox8s',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 16:08:35',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-05 16:47:56',
                flowHash: '2ayuku13x8hrwh0r7ksr3yyv6l40ngm6rbg56pzy',
                flowParty: 'etezf0cqe132p29ikccpjrclhy3ekp74wrf5lpg0zb8n9irn0hojyh79xc0c6hytxms06x66xu4qez3h4m8xmykyrco2f8vvi2q97dfkazzgvnpnvtkk8c98ay395h2mj5miwuyuqj288qs44aeud1alyxoomvga',
                flowReceiverParty: 'ledfnk89udcvgqpicuq1ujd89v5ttnqdtnft4bhwttchs2htqeebbns0j20nyc4ea9qyvzwyxfdadbp3b27ncb49lrv9fqhoh3eu7omz0lpfr8tu1wytvj1z9nt13tqugz86vy45nfic94f11rw1ddw75s5xmsva',
                flowComponent: '449u3zmq5b5zx8mfxx7qkb4yje43b0btykdl7nhnwmdzn9e8k7e6fpu6u8vbxssoop67qtho3i1wtne8p7gtgabdphn4mbmg0wjfx0s1d3ktiof7ziob08ws8a977c9onqn0p26hqvnkvbpnyvc5jp0vgkx6xp98',
                flowReceiverComponent: 'ju3kdlgaqlket1octwg9jck0wbio7w1u9if4iuikjoxlazdq9l84qqtwgrckbwh5i1p8dcawiwx47zh4lloefu1wdf016jok0x475bo0wqoc6stxpcloutmaektql6wouwk1qoep7ct8x3slyg57v7u1cbivexsd',
                flowInterfaceName: 'pt2i6wy4snceeevqdna3hcatqe3nxsr9ir7e4ttwl8t69pwq9xpxg1cht8vahue4diw6lux5g57xjkv9ziluwn508vh1p9l0koepu2cjfj59m2q5o8fwgi2znz64rxm4m4391suhrjp5krre15phyxnyqpr3c2yn',
                flowInterfaceNamespace: '0un0o4hitwwfdupoxd52ghwob0ybsywr4cqgu0tzh7vnrjal96nbcx626jsh0vfu9c7gtkuh9porbiq2mnxr4c9gyl7lamdlby6hqkrmdbc9rvx6m98w3ntad5opqtbbc7kwvaax3pxtvkncpnr7vauoyxhwjllo',
                status: 'WAITING',
                refMessageId: 'fn8g0zclqzymwuwgf05kfhaffcmor30cr7ahiv8pfhd2jzpluhryq4bkcx86of1pe16dl91m3a921un110ci94vnhcqdo7v47jmw0eihcs0skcw8o97gtdlzkrbo1rhcdeoikw3j5yu779zvgvc6xtwc5qnlw0xo',
                detail: 'Quod vitae qui omnis. Molestias culpa omnis porro eius voluptates molestias modi. Aut recusandae delectus nam. Vel voluptatem molestiae quos nemo ex.',
                example: 'ugzhtsz3kpynx76p4jke3261xudndlu7v75e2fw06g4132ihywt71idp8wxzyu7hn323usr5jcwrtgmi00h9g2wedzs21y7ezgsewzmcp6zyubhlz8q70urnw8doejmnv0eq61d0t9g5i6k5xqqijl2gidtbenq1',
                startTimeAt: '2020-11-05 14:36:32',
                direction: 'INBOUND',
                errorCategory: 'kztxt2si7oi5heyov3sns3a5fmwhxguoc8ahtsw9hbqw6ftedncusxyi0yaff3wgdgutguyv0jpn9kfphm7kyqdg16njjep3idufc2ef82gxpnamsshqqlxzcdenyrbvaykyhg1t8wsfp2zvrl6gql7ndqgkbw9f',
                errorCode: 'qwuvbe0iw4jc6fps934t7a33hd5qbp5hqcw68lpag2s7c1onop',
                errorLabel: 444967,
                node: 8176964781,
                protocol: 'etna3bx89zahx9c4523t',
                qualityOfService: '24i4lhcdpkcwtar91uaj',
                receiverParty: 'n6rcj90edop8pxqk0jm1dtlbzq686zidl6sxyob5kro2fbaxqsp49fuxpyxx20vhd6rgrm3idvsnjoc58gunyzkwrh9kirjyeom43od83o1xsebi3zquoirakf4g0ril7nzf1dqugo0g70ydss3rxpbcr0v00ktv',
                receiverComponent: 'txyc7nqqxsw7zu1roigpx3bg3et8z0gc9fdrndoe2534049v8mm5jyxum34ak0erkowy6fwidf56ddratmbs5vjqipucn33xoy326q1m2zqqul2oy2doay1icjga8pxcl9st9w0m0057wb29xuxywhhu3y6w6vex',
                receiverInterface: 'fgoniksk1iqj8aq3mj9w40e9mmgl6xsez2uhqpfmiyxi258pupjtzcknig8wluqcagpfkkx7nxlxx48e3opg4o00sj6qtco7olzij0mfwtgk9s6kiwkxxrnajox5ovexmjk5x687ismsjhodyrvml3b7vfajm0eb',
                receiverInterfaceNamespace: '1zl1b68ucxjapn5ae2ox9fh0mjzqysnsehjcqhhl5sf4k9l16x3tpi2vp9g8epck2fd4qj9oliqo02r5hac653hb67uc1vkpeq24fbp2g7d78rgamc4sbqyoo0pke54f6m9o3rzeavloac31vy5jaln1apzh1hld',
                retries: 9395390663,
                size: 1225713406,
                timesFailed: 8525980496,
                numberMax: 6276198324,
                numberDays: 3425858518,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '4nsxkiyj6sihmy3ms1hpxd0vfakbtszqwc0f5rulp31y3ol9yn',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'nz25guqssmvgss98179v',
                scenario: '0p8j42bgunwgjb8vzlmbcbhyon2rnbgs1txr8u4pauxhro7omhltm9q2affg',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 16:01:01',
                
                executionMonitoringEndAt: '2020-11-05 14:55:13',
                flowHash: '9fq5a87p1df084vxb5oy90wnglrpkbsvztq1nfbn',
                flowParty: 'nntfy8p5uvpsj17nqrdf75i9pf4y6k7fqkm03npmvembpn0ypn4gjlhkhskh7wnonqdvgp11ktrgocjqvk089rgkbzhuw6dmfup8avscxx2whcj0fxi58taij00gudp8ymnt55syjru1m6qh6dctkr6s15afefgt',
                flowReceiverParty: '3lfruih2n6b2gmdb25lyog34idy84mqyuyarsbjs7lz6uuxkbsimq8sft6rfzsnn3pwkzrni3kqymrmmwv7fnqok005fqio8xz98jcpm1dxool17xp3v205og656k0evsgtra0xtuzpgsxc32s2csqi5z49659z8',
                flowComponent: 'jznnc2u59aushkd501rte5a0k5kap7lscyftlx7i9q9s6rq1zkaczvi2v6evli2yoqn2ssdoy6vd6apu3gk94f49qd1f2i07a2mqkki97bixaadgo7zlj2aldtx9yzg0xcr5w2nk2gz2whla29pftu5d4xphjiii',
                flowReceiverComponent: '7btphyivrqeta0chqspd96xn0e6p82ex26cv9kujh408qii7od8ug35vpqtbg6um9t3sn3hvxc5fj3bt7l85pdrf8rr7jm2ytd3oc6wuoevm5ghqm27ropvtebznjd8h1ils8giectmzuq2ggljb7oorqvpohepe',
                flowInterfaceName: 'sxu7fmw4e2n21abuqah8xe8rbq80w22f2baz8g0n3zuarnmkxk2bwudq4b3jbjiagn8y1qhi1h8aisuhr46lp4eqar6dga9c5ufpq0alx3y85ndwadzt8coff2lryn0c8n1vu0t9t96k6b4vlb9as6z5sce35gja',
                flowInterfaceNamespace: '37g1jrtjrqffmlxwz3hjbb3z2op6czcjvyql7kpeg1t4yhnb3vi6x044s3o0rmgsw2g58831rwgwob98kw1pvwrhcy8uekvgdmv147ybse3yha60k1rjyno70arj41mxqnmeogiicaupl88zxpr1oijv4m2ziu3y',
                status: 'WAITING',
                refMessageId: '74f7vmr6par2fbrbx5qxlzdejwdjsve6i0v6hh5lo2jv9lqiz89rfurulij3opqorhspb0ru83kr3mq9k7ugosqo4iw65zyffqk0eyjvrx1sqd20o45bbz03y2nm52aob2pg9gg6p33w65m93iemqt3m2euxvno3',
                detail: 'Molestiae eum eligendi autem est eveniet. Ut est ex quis placeat est magnam. Et et ab dolor error quas incidunt sed.',
                example: 'jf71izbmrg4usovq0l5k9hkp2m41rum7cw3nvhbdfjbe6rk9eli50bfwo09ovb5ljxrmb4h7v9n3d0mmd9ld75sv55hv1mi1enxuy7xg22t5cua8ubdocpa0j7bbk4q5scpxfkrjhotgovdrscqgwirjir7u8j2j',
                startTimeAt: '2020-11-05 14:48:02',
                direction: 'OUTBOUND',
                errorCategory: 'dj6g8bcyg2lkyjdhpiufzjr1k0ng6ng22dk1mal9k8sgjy8z65kyzn74qtyubbz1b9lka0ajmjj9x75jki8q2ece2iedya5jlqh6ci4kx08asvkvec7b33e4ai1cg6kg17cro8mgtdfwkfnoe4uywju6sr8621ut',
                errorCode: 'd287yra9rbsafwhj2x7ie4p2btuqyk4lba34s8uwnx45bcbded',
                errorLabel: 264523,
                node: 6908101768,
                protocol: 'j557g06kmhnb481yoqog',
                qualityOfService: 'lx29325cstvt09hsbpef',
                receiverParty: 'log9q6ken6r23ulak2at3tiz4myskn0m020kyuzqsjoitrcew8wqgqvb4qa0igwp47kt9yufkt1oupb2gyi970eqrlt8wp0kdjwvbfe8lwrjr4rauz8kza8nboh4ayf3dzrgdisvnbunzy5wwj7t79m1lpm7g4p3',
                receiverComponent: 'x2nib0bpocmts871gc1aa03m5f8jsu3mkn0qley9tk55qehvaomdren5dwwilmr81p8hvefcxsbb1klawn7l0hbotdqnhlu6gwn51yqihptdprejr5ewdyiwyyuv0wmapl5wxu5s34l8510wir5av7ac1xv3myfn',
                receiverInterface: 'w9qyd54jtfh6vdruu33opl0uijt79703u1wav0ytdh3itirjeedp8ezz6ururp3viojqrmsiemr9qk23wp3fpz25kyco4zr3u66u35ghymndh9p7p6kmfvdjgd31zh73fdl4zuvg5mxdaebx08e4gduxdijxb5xq',
                receiverInterfaceNamespace: '9dc21e5wa4n0awg7clt8qp93165qwua2zqu2e0j1wd0kfqu64fhorfnrki345nl35zacmwq9vigy00mw4p0mn7ctn2wfroeid5kla80h64r71ecy6n1ncc1c60lwezk87lmuivgzp8zch1sci4vlmfi3y3wg9ifh',
                retries: 7964926753,
                size: 2309656458,
                timesFailed: 6871543574,
                numberMax: 3887302318,
                numberDays: 4107069503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'ts9utl36nl3blvjinoxsth9gevyt0vdxw77qltcoed6c8nk1w2',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ogafl1eetm0aajxcsnmu',
                scenario: 'mnxb5403u8ca5jckch75o7tj1g6ishjws0xfq839udnhz1lpvt0mluc1iygz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:58:09',
                executionMonitoringStartAt: '2020-11-06 03:39:38',
                executionMonitoringEndAt: null,
                flowHash: '2xh7ohj3ph1u4pt9r0qt55goljvxh8ucbxsokiqj',
                flowParty: 'mi0eurdo81swsh63mcg4z84gwvzadjvmy6322777ugj7w11lyn0ui63uhae71074a6xawni5q7g4mj38kiggk09vk6ue2ohcak53zgrtbw9jvzingg6alhoyuv18yh70t471f1ljtu7p8gr6q4o9toromg5q91ck',
                flowReceiverParty: 'uu8x0c7t7upi1dawb72v0y5wkqjpz8c0yyna01osgs1crx4e4mcopgncbaar4rzutr1mfriaj35d3rtnpo18xr85ok2fnvit51wyeln3enqcdpzblu2dmtnq8m8xlk49e3z8ivyctrcfqkzceymz6nomt47ihyud',
                flowComponent: 'wkj2qqkk2p6tom6t6hemv259820uf0wig8bm93b9lj54q04ep9tml4fn5mt1k5fhm4h3i2en5jdksmawm3k9syv04cs18xstcqj9oykm5trxmdiz9vd0houyv6nunkzgtv2ttuybsd7t0zm8dsuo1x5ekqcm9ckc',
                flowReceiverComponent: 'woreqe8o3ddafl9g23b9qu4z48gws90oqzeayq6mxy6zrt6dexy0juuj38nszuvbk7ouiiwguycencber86lq16tvmkf927kdu55ixly47opin4ow8ehle0s4s2uj97xc6bl6ofzohk1fay894aoadouljjlq4s5',
                flowInterfaceName: '9u1okjqdvd3zcodbunan3tn2el5ljsp4ld9guiafg730mlo9zdme3am9kttk7fagptxsr12h1vs4eki60m5454xt1q0q9dtsepl0cy8l6sqg9csua2zv7ap2ck9j2k8qdlp4fq5671nvyvpgsmzdx5yraa1tdubx',
                flowInterfaceNamespace: 'kd4irxjslnpjw6cyk2jdfx5rrgwhnx0jh2iduvua5xcgbc8dwvm72qr4cax1dnqeomsffp64e28wdgb1d4vl11mrt96l9byifq84rmlzf1me7pwpj6jhhixyyz8ifez6icfoegn8ah50fpvfji7kmm9h0yepdr1w',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'oys7mp4j0bw83l1ywtb4qqroew40y9h3mamg4cbi1ewo7ll3w0skzuxlb67jv9es10gqapvt18pwsc6mwqscff81btr0l3bnily5jd98tcor2uu9ejtptp19r132203od1vc0etm7azdn6kzqrfns5wg3ekg40oc',
                detail: 'Placeat rem repellendus sunt et neque beatae quo distinctio. Ullam facere inventore aut voluptates quasi. Voluptate sed non harum porro tempore aut sit.',
                example: '4wztfeu0cjx9s6a5xla9yjamwn2exny15fx5bdl2er0o5ah74a1tb6tiap28zgvdrtwpijy1fpfiaukfmpt00pvfvjevgv4b1hkfvy074t3dksfcajhrg02wmim2n1f2g88ux275dhcqvkyf6ntmtwxe1obbgwj0',
                startTimeAt: '2020-11-05 16:33:57',
                direction: 'INBOUND',
                errorCategory: '3869uzv5zz1eapoivhuz11r2ie07o0y5o6pjvd88upql5cl13mplq6d4r06bqxkd9bjejwkhdqk428wps5f7klrgctx1pcmvli7j2qc79z9dm5p4bdcyv93h6w421wvoeb6u9nbnm272r2kskgy2tx5fp9p3nx1a',
                errorCode: 'axj9dtmqk5n6jt14if8a7zmpnuokml3ibls2sin8oyo1qq204d',
                errorLabel: 187205,
                node: 7343154964,
                protocol: '55garz30d8jkuy5nerj3',
                qualityOfService: 't553chw3346m4foge8s7',
                receiverParty: '48nibp6i76mknwmkxtoourxnsuswum7i80yzmefy8d7cy1q1qhcohcwawhv6ntn35z5ehimu8jx27goxi9696ln0mxmg31hmvla2bprp8sc1bv5kf52rcvqukew30jct00rli7sejqkoery0182zdn3jrrw80myf',
                receiverComponent: '3m21iia2vnun5qd9eeexw3vdx69lv9m9jzq8kshe5l36dwpfmpfr49ksk1117a3x939qbz3bw0f4ageh8i8y7yrx6vw8weap731x9tnriw3u3ncqxwhp7eg757r1ygs2jm5zf44rs0g5re33rdeyfu42tgk2n6gv',
                receiverInterface: '4w3l5xo46m1cznof093owijcnjfszmeqtkvd8zedzsea8wvubdpobbev9s76qi954n33e1tqca1rv50h7cf3xn0769q9g3pedcrx1jpg3abdojd4zmdugpwufyu98s5lragjtebhn6rptoht11af0pajaq1868ci',
                receiverInterfaceNamespace: 'kvp58f8ujgy7l0wkhdil5u4blvz71bcor7r94ynyj5cxsx9p9ujq89xcs2l1h78jqh5acpd3z5kvo2a63zmo6pg02qiso08sdqhcm3cadel872w6fg68hzy8b6gb5amtuwcjzphk898rridmqv5u659z30lgul9d',
                retries: 6449871296,
                size: 1111582226,
                timesFailed: 3414625257,
                numberMax: 7532141320,
                numberDays: 4743706740,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'tge4fxaajpwja14o1y9xyyubv0usxleoiadf0p53ronckc1gmr',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ioi5kp8baitg219uwytc',
                scenario: 'km60nrrgyjxbvakrulzlccp48yjuhemfzajtk8fcdi9sbb9oliogla6308mp',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:21:34',
                executionMonitoringStartAt: '2020-11-05 22:53:15',
                
                flowHash: '0tgwyla05ubwjznot3ue1h6mm4b6snh2vo8sre76',
                flowParty: 'uuqawj5lf2z284h1z42ltn4tbtlgyxogsjykovgd9xutzgrkydx5ad6kmqiavrdsqr6i8x7rr91ixu29ija4dpmddwksnbwypcvpv28d5jb9p2xpfigxmo2gq6f5168rokueq7x1hcxere7wesul1zdzrw3prjzg',
                flowReceiverParty: 'c107i8u3qn8m0wm8al8i7s2zmzhk4vo6fi34rk8bjcfupuupykltq9qsy3tmoiarbhyvf85r26rd6t2hh4vd12x15hp5i61eo6l539gf4bmw6ptvoi4u5mjjjayfvbj502oxhalhf2k6as1tkqxv36gicxxpliti',
                flowComponent: 'u9yjdje11o9v35kkbzpf2h0xn3i2crn8luim7d7lrr46pjbj5ymxk4dkqpl417umwkxaj1eyukmh1awkcd7t3v1acjenqe8ak2rhbe7wcz74wrnx5m5m5ap9dt3z3fad9addek1utfzdzhh3p9drnwymiugg0eo9',
                flowReceiverComponent: '69untmiqzm27jl4ed4tl9pgxjejrp23sit4y39dn5xfnuslpee03zzu6y8ashjelaw3rweqox29l3b2ox8ic3axufjie4ewuv5ac68dd1qh0fy4qmzat5xw1k8490ukh1zj5k9gddbu96xi3qrfphndv1vppruos',
                flowInterfaceName: 'r3ids4rm52xybilbnsdfk504c7549e8szr51n0trxtl02cmsb3wdsev98c8os2eb7ljt80q6n1sakju2z1stepg8oxwsx5udp839gpqkkwqny7zq1jxd6bvv0johhlenm0zsomsxnn97enlap3smmpithn3mbd3n',
                flowInterfaceNamespace: 'kl6aonvnvhct68t42dxagfgzwczbz5rwod4cqzoi6syhbpios1naq3ozxc7zrbul2otj4hi6ujo55m0rnpb4x1ygr9r98yf6tfoyogf7jchtog8mkujy8htia7uvwayvcbzsxu0xtvqvefkc8n5yf107rsyom6hs',
                status: 'CANCELLED',
                refMessageId: 'jogdn2qen6mie7pdav1oy8r8m27ymt8g1eyc66s6bkpk92bjnj91q1dowo2k8eklch1kehvvdqv9mf87xbrfl617wk4s87016b9q98bsdpm8zfyo4r0mbk2h17nlral4sjkigffds2gnehpv0ojhbo3ahy51j1mo',
                detail: 'Debitis magnam ut quia nobis amet. Dolores ipsam repellat non sapiente ut qui fugit sequi aspernatur. Perspiciatis fuga sint. Nihil molestiae tempora.',
                example: 'vsdtkjn5889n118lqil4db6s08s6cbq0z7hnmnu8ir5tsk6bjoyizetsxme42yeuu5f8mdjhs52vanpoppnkvwpf2h6s97z9ro7ypkbysav8h99wspjbc5ymtfzrrr61vi4lvkt1s5v2h9eldz56po7xu5ihl1df',
                startTimeAt: '2020-11-06 02:00:18',
                direction: 'INBOUND',
                errorCategory: 'dpjv3svpwic02r1qhojcwnx8qv2l86pzvrnxog9omhv7sec7ekqk1vl52r6s4825ruhej6izvwq9zxdypnt80xbpgl7189mhuldf653w2yabd64l9n192479e6szzno5ylrzrycih9m6j3o9b4wu7ly46p6ibcvw',
                errorCode: 'i9ak8qpnmqs2x31axihq80zupzpfkj8wa4ds5ruaj7hcl0208i',
                errorLabel: 425954,
                node: 5478140761,
                protocol: 'm5lpdbktx7w4hhh9ncy0',
                qualityOfService: '2ab4lomrnis45moh54vy',
                receiverParty: 'e325sdz5kks9l493ct4nrjfmw3bn3mbh9z4h5qwfvpw5ryniw16u571smk0zf1qdgveyit9rm8hfiuxdi5deafmtoaws1ag5cxb6wnz40tkapk8e7nsoav5od1jvs6cpdj7mhbktkr49ok9dskvz318a4y4bfnxm',
                receiverComponent: 'gk6688q0vhcp18rxp0xk7n7injfs8u94b0quugbs1u6v7nh0wbrx4lpkp4e7imiqaa5jrufmgeuwnlpwyk1bdm1rxaqdcflpjp5udrk45fse33d1tu50yb7568s0gmfzbiuy5xujchwvyjrrq6un00qrfxv0cinb',
                receiverInterface: '5m6n3gek0q55qsq4gtcf0fqzp8ub194yqx5i9lw51upjc27rgxkqpusf27l3ad3nu5w1ik6khuimy5ms51qt4kd9iibz7bqwchj0ucql7fh3wvdrop12tfiw2quihukyw3kewphgfzwob996fr0ltgipij9s293q',
                receiverInterfaceNamespace: '9ntfu5wj7ysl7rmuuzriyadclo4ephaiqy607wta7qtczlzamgd0lgwao0aybzh1u7yfedrscdpkr1x7bhfer9dc28tf6bujdvso6z0zb4hyqn82u0ipn49vjk1qy3l0sg5scguj7814ddfwx7e5wx7duxk8fbvh',
                retries: 2574188533,
                size: 3439232087,
                timesFailed: 9786266097,
                numberMax: 3933527640,
                numberDays: 6818664137,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '9ryeqn8qwnsy9ajukynge2ngxtb9c4hz2q1vccmq4d68gufzd8',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'aw5habbxzl7sz2ny3wph',
                scenario: 'fn5qg3ir75antnlxvi25t0w3ymxdsivu5bu99vfevhoczq10p9wwjar1nk5y',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 15:50:12',
                executionMonitoringStartAt: '2020-11-06 01:25:19',
                executionMonitoringEndAt: '2020-11-06 06:52:13',
                flowHash: null,
                flowParty: 'rwml1nux83fwlgluetzxcrbai19m29jp9xjcxahhdhlinsrgvj0rc4zymnhxa4b9xz73sjctxk4k9z9vbg49y93961p2v9dz0g1jd038owahuj00iqrlkf06qxrczmcz4w0nuocyss1j6ykqpv2kksd3pfb2npsm',
                flowReceiverParty: 'nspujbc23x4jycwrn1x2au3vyd42u1e79mi791qgidkuyju5ekq8jqoch34n8d7vbb0xemnay2o02nzdv3qmp0dwpdux75686jjppgvlsfbxuvens8bpkr1gugc33jpbxtivx84vrwouai8n42fq7ww7gsmc1t0y',
                flowComponent: 'qpedo46kj1b5a6dxo6jwck47wx9zyaz9z2szl88ob6bikenjphov9dm963zq3tb2tuvnr9coe40ci5o0awnu3xg9vou5u8oseg6gjqo1nug0bkkabvbym2p2p3bcw12jxnmdh3ifnjhbr4n7rrvr9jlvjrzaa6c0',
                flowReceiverComponent: 'zi61t2zhrrgjsqhaztqrc2rrii48ecgplnb6owqyafjwqg0vfhkca2e4njpg6lov2f1fyo7q881etfc6ber514g5dd9x9n6dk6rdgllttt4fddgvrgygj79mjlm5efa0nw31wwi502vksbt9y4wqa9zr89pj7fyd',
                flowInterfaceName: 'nkcbe6xuc5c4c4lq6wuy9s5vax6n5rbxvmjbmr41pofqj2cfpcyfnuvdiknbbgvk62ufxydch3yempuy6rhu7fvwyma2pyipkm7plqnzxac3tmb0p3x6g91y8ax4fkikrxh24e7ta8b5r26a4raklzae2xl48hdq',
                flowInterfaceNamespace: 'dpmmwnv34p0guxx38hx4izz3e2owo4c44g9m65zljnk5953skkyl2kdvc7z5lxjdhiddmt4kbc150c94urmek7euwapqiv3ve83b4of7lwtrrhi3gs22uqg5524gfwwplkhxggvw675esuhqkd5tyw3az8wp17aw',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'autaoqk1dzyzs0qibvoxaluo0n5kbmrew6v5lxgqemtujq7z974zagm91fwdil3l0t6979ijeif0m3j6q845ynpz50bj7s3sos3103g7pc478qp56cee9ffobvhvyvxm198h8voawtk9zgt0c54ctzg98g11sf7s',
                detail: 'Aut quos sed totam. Amet ullam laborum quidem aliquam voluptas. Maxime impedit aliquam aliquid blanditiis. Ducimus qui dolores doloribus voluptas. Et tempore vitae ut voluptates. Asperiores cum ullam ut praesentium.',
                example: '8pap67z0rlcer5tup8175wl305lx4h9udiyzfnmucho45tssntbxhmt1rtsvcg5zkgagw9el6u33hmejo8tv2h6pru96boq2w8agd0y13wgub80jmu7r2dfmwe6dfnqptsb85tjl8qf00ya4zjr64rin3403odo1',
                startTimeAt: '2020-11-06 11:58:02',
                direction: 'OUTBOUND',
                errorCategory: 'ticm4fpih97ilzvzwuoty7trxvws2uiwpqtgm9d0lfxanr1krhkwuu1y7pwe1so39511pcryj9bmynpz6n5w5a160rbzmgx3515efjwhoaedv9ldpuo0k83im93322j0fddxzpn1ooslqqeqczz34q6igd5fvkrs',
                errorCode: 'ba44wqny8vp4helaqzadssijzk8p18nin14avy6nrdmyn9dcd5',
                errorLabel: 201357,
                node: 9167855456,
                protocol: 'wqaet0err9k9sowa4xox',
                qualityOfService: 'ckq1wfq43vviuicy2nxa',
                receiverParty: 'eq7kuf1jzz796zurjz844vu2j7yt9olj1mapa6dagvzeues7stcx8kl0ldx5voxyitek59aidudkiik3ihym22lwh835xcoc9yevkat5ym84k7djytrosly8blfmgjhd84smlz7iocde7tzxi8bw0uyg4oufnmx9',
                receiverComponent: 'dydig1uwq7dtxs208tq9hhgal3jbvwawdlo51nee57zillx46d5igtv5j25mkg5tn1k70v694e2wljnj2ygs2b7iklux6fmsfuycnz535hretxk126bvvkiytbvah2h9fuwypx1s2zxet8x975o0bvd8qtk47dxf',
                receiverInterface: '495o0fyvlpx8t4eojk2whkoe0c2elp1tbyncmwg4j0s42xa1lkk03ynbxcm4xmytwma55g4aj4dndqpxi22rof4p2n4cwfnfdl41glmfj5lxn2ir1cgdt0s8xyikoo0ic9p889zxo56b4yusn8izw8t3819twav9',
                receiverInterfaceNamespace: 'vhr8bsmis8vlpvak69izgcz357sj0tm5wqdheuo82zfxn9qg9mbi0mmdqfumccq2lep809yjvzijo0y64etur02g1do2w080cv3wz6psppg2ya1hk2vz5yyrfrnkssuvynjx141tp06ywpbum3wdp3yw8ttyy7z0',
                retries: 9670032510,
                size: 7512163866,
                timesFailed: 6990556010,
                numberMax: 2496852044,
                numberDays: 7262043093,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '7solienn0w7fqch2n8ivmeu2agrwequwahn5az72zz0nx0k1gn',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'vpzlxt1za5nqsnfr82bt',
                scenario: '2c2kqre6epgzxl9x416kbufr3cv7c5kx6kj3airy5yl1s3m0kz5bvk3r1rx4',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:01:29',
                executionMonitoringStartAt: '2020-11-05 16:04:23',
                executionMonitoringEndAt: '2020-11-06 04:43:27',
                
                flowParty: 'tt6q4vm2mpe2mr9lsbqbzv0zdfhd7k0lyvi4q5lzuzcjdtc3t2kbvbhuiuqwdg1qb6afg56ou186evhx0y9h9hjfxra0tzok523cdcdx5gjk22rtmm2708b2g7bqewck8otp5cq404ai3ryipx8unafyuzjifgrd',
                flowReceiverParty: '1raatjp78lwm8c1yp8bojq6lbwfiyv0tuz2b1ftfzleu03jqtjfaoslrdeqnrpnoaozie83ep71taq7k2mxlvhkw9xhm2omfn5s9aq4h9lztekxz8o8r3q2w7toh09to8drhgy27uvswcq8ff7gu9h9dgjg2o2t7',
                flowComponent: 'k92zer9rtmbsg44is4eke0zz5pyixnrublgqbiiiyccihiap2bf7fatqxbav39qp5or6whme739wgy6ti1t1ut0zugqwidmwiep3yvm54h6oum6zd79fkz0n6bww7o7la5z97wezc4fghcx0khha1ywmg6f2fm0n',
                flowReceiverComponent: 'rgsk2dunrw8a8mcbvj12ogy2fkpxrmixw403yp3zlqfx6pm3mgaj6i80576plvqi6idwlawx2fnp4ryno6nnkeddb68rg0pwngtakpchj3cqjkbqmuk7n0r4irz52kcu7vquikw114fzjrqavnphdc4dvnhmoe5h',
                flowInterfaceName: 'tu1h8o66odxmzlz7awu8569y89dqngzdlmchxtukimfxjaxvb4qxmp3zioe15xrr6j2im9tum8n0gugni0pk26u85nqnl7z91gl44ovml23rjkhiasjjfu42fazj9wq4slfl6avy7dmcunfs9st65cjt1gvhv4iu',
                flowInterfaceNamespace: 'pwic76y845ooch56ybss4j2ers31u2fhgym0h0tioyx8xyz60pxzvy2rqsrmsrrk5sbdb0ezif21f42w660bw66f7xj8r7j4ldleah5eqbd9p0dkaw97p84zto4i1j2vcxkfn38hwwdhm3ghdlsxbdz7yfdqr969',
                status: 'HOLDING',
                refMessageId: 'czl8enj997xuhq39s6c94qjyegma619n98ehtxadsmk5wbrazb9h9q7gl01f8slu2jx0pzllevhsnng5uxyqic016m045d24t8gn4uulo0i3k87d5viuf5fdw5sc87810vh35qkzhf8h8vzhfb7if34wd68hjarl',
                detail: 'Nihil dolore voluptatem omnis sunt enim eaque et recusandae repellendus. Qui nobis et quidem. Iure assumenda eligendi quaerat at sit et velit esse error. Consequatur itaque eius saepe ut maiores. Quasi quia debitis modi delectus rem tempore repudiandae voluptatibus nesciunt. Reiciendis expedita animi illum aliquid eaque nesciunt beatae autem.',
                example: '8al0uoir2fafu145afan4s0l3j22n0h24ypa4bkkvth9r17q2y6v7uajfkyi2jxr5y7lyor0kfplopr4k9ztgn4mkpvth7m9xms8nkxro5n48jagzvejbcjrmdrrpup89e45g8wbdtntwngq92cp701990cwgqa5',
                startTimeAt: '2020-11-06 02:06:06',
                direction: 'INBOUND',
                errorCategory: '2l3vboxt8znzx2sl1kk0omoz7luvwfgq9ehd2a7ah2h6c7msjln6ssefv0vg5aqvscl0q0znz5hz4n3amifa72tayw6c1xl3xy9gy7v46g9kimwbnsyi1cimbs6wxkd4kyxox7dbhvq7df37ui9glu1091hds351',
                errorCode: '2fpz6g928pxcv02tcnz2oqfpg6dh3cw2oegbd1n0g025e02uyo',
                errorLabel: 514093,
                node: 2840192726,
                protocol: 'l113pcgdrf5o97s9dzgm',
                qualityOfService: 'qixvh4wgsgpjpahsjitn',
                receiverParty: 'bmx5qkn9pp65z0f0xp56iani2nog8w3ojd4bkgq0k5gdnc5pqkh8xh2fayqszsidm0hovljavakay3b9styjq50lwli5rektx3v3qqedg9xcewy0o21f807xuk92j07qmz32v14ht92ssqeoev8kcapggd3ejtok',
                receiverComponent: 'bkxskql0t3aw6tm4ut4u18vjly02arqycllsyurwuqhu9sjvwuegluxebyupm50p3kjy643x7cyf0mdmsk7lgj7m76o5gbe9wkdc27au6xsil90kgmxgm877q1g531f44fire5xdvcecb7yvciodh2qk5ruocszp',
                receiverInterface: '3gnp822a6gjhei56wfbq46040gs8wyu4ax4vpqs5h8uzo7o6m9n4cfqoajzz5jwufjmifvjbb4365o0yn6b6zykrccswl8y2npulii1v45tc3i6e4538uphx2h5nu1q76hpsvxvfcc29idy1zsut90i2pcjc2g4e',
                receiverInterfaceNamespace: '29fnuge2851aowu8si6x559nc7g1ysp1zvaiz9cv7xq1jdw4mz3ijf5n3vhv4u9851nlpso63gvvxsh2l58bc6rpkt5h5a6tg6jo2yawybveteh7sdnlnnmkcbnpi30tsauj0sl1xm8hqi9o20c3fa2rwyw7gn96',
                retries: 7089947977,
                size: 9611316186,
                timesFailed: 3235988568,
                numberMax: 7447463436,
                numberDays: 5960750962,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'lrhmhdt13lw4wdjnb4mpm685mu6cn499cyhgy7l4gg3ze7go4r',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'pq92x4q5wnvqdsgqo01d',
                scenario: '5wyud8kvf27b78ajvyl911vvpn6od8edxf91h57xliqxm16q2562rkdwyffe',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 12:57:48',
                executionMonitoringStartAt: '2020-11-06 04:58:51',
                executionMonitoringEndAt: '2020-11-05 13:51:24',
                flowHash: 'mznxaz107imkeidklqcvvpvcs0hwy0e12y5m1o6a',
                flowParty: 'zpzist8d66h6ypapf2rp62p5ogy0veqem1tpxfayh0q5th6dkamvnmn6bmujnfk1vsikngc9fmsy13mjwqku8jaccmset5dwg5pz1fopt9b24ob294vtc5oyevqs05cqwplx19up7vpd7lhhsm9mtturx1ahr68z',
                flowReceiverParty: '7gcfan4dxbwsh7vin572wnwy7qe71any7pwfrjfb0d73wq6j9ozy2p8a4jkqg7y543jw5d7swt6gt6ln9ndtjjkbu350i4kbyw2nc880k2qtvnn7ry4kleaw5m9yri11z8p80f4tbdtp2hwb7u6p9wm8ep2lg4qd',
                flowComponent: null,
                flowReceiverComponent: 'anikvq64ktzu7c8dgf78azsmifhzb9e9cnb02ikwjasx0ayuhm3ntf1cdk3zhr6fdfc6eaugpha87w7oep6f2mezjuti5o29ua9gp9u3zwfxfau4iwtfwaxn5mqunljq3g7zt3ldwb55afi4tw4iitj4coa9vpzs',
                flowInterfaceName: 'wvdekcuc7jivitkaau6u6xtrt5kcfn2h4tf76rv2x3vnxs624s8iumwd3seo52nsu1dgy2v45bsns7ts2q1ss9pj0z2gao6w7902uss9se0poxu1911tnwrklz5okuucfedgfbupoi4hxsr0wax9cu68jvp74j1r',
                flowInterfaceNamespace: 'k9fdjre4ni3pkenjkzwpvj5tvk9edkexe99r116eu7kj7sf9d1q8guxg3q9y40prnhwntz5sp6jiwfba8algjmhg3bacdhfj6ziaq9obibrh0vrkeorn0h8s4hpbhcanghnjr6oyi0ylc6gyq5qprix62bqxjchq',
                status: 'WAITING',
                refMessageId: 'o99ijugv1zpm9vmjps0pfn0l4mditzpqsztl6uy35d08vcl7s6okq7cqxkiwuqsnchpnc4inuychysjisos9lxhp9hby4g4138fw81vzbaoik4207ztrh2w1i83vj1lh2sn1ucb8plcedr7e8unzidszrafee9fp',
                detail: 'Et nemo minima officiis. Harum eos nobis laboriosam quaerat sit a et non. Aliquam quia harum molestiae aut omnis nobis eligendi odit in. In quasi molestias voluptatum. Et et sapiente rerum animi ad consequuntur quia cupiditate.',
                example: 'ojiwblrm9x24dcg5uiwj6rj6b6224vryo2704nmf138nd92loyah4z8s3lfmrwjgs4epf40ybimnd0l4px7vjduw6ufydcz4kdd5yckmp3n47eaqf8q39os06pdliwjenm7q133pugnr6xj436fh3k85u0tbas6l',
                startTimeAt: '2020-11-06 07:14:04',
                direction: 'INBOUND',
                errorCategory: 'ogttxz7y0moh0hg4bcfseiw1cgql2o8pa5l4vq4a7ovb79e9lqvb13v249f3glsal5db99hgtzizl2gf7py3tdkr2mhe1ank83f8syj4z10dr6lvpozt6ygau8lbn6k9gyb5ffp9ahiuj9bz1i31j7jz8qkczzjh',
                errorCode: '591w61z3ytbmm4jg42smwf3ewo29ca4mop90t5jt5ciow3svia',
                errorLabel: 807066,
                node: 1603612023,
                protocol: 'aywtz7dp0f88ylalep52',
                qualityOfService: '6r9mn9yoqo33vql4yla5',
                receiverParty: 'yc0c0skmumpjz7hc2q8wp207vhkkf2qx0u4bvljjihhqa97vfgih0w40tvmyutszep4pustpvby7i2rx43eejhpuvzadt36jg42v6zjeb2xfmw7yeboty2jte9uqif6e8fbu9b75lzbn9xxymh18wgo1092vwamg',
                receiverComponent: 'myoyjhmldkdpiyqgibx6xgt6hqtow1nwaouen7gxid4fk0x6a1mmhcbsdq5pidthaelyz8m77okx958ve26mulrduc3hqfu8q3at17ajq2ksua1zjaqdv2qc1ej82e48m2yhnxlao4tfnz3y6hugiz7fu1egc1an',
                receiverInterface: 'am4oubvnsqldr1klxt3dqpo4vn7eaf7p5kuslc6covehhigzfhqzt2vibkjlcjtvejl8r899nk13tu5fc4x9uzdb63t5npnazxdldsm3et3aqasbx3tz6djy76rq4cm5zy35pvdsb0lwunikpbibs709ne596z8z',
                receiverInterfaceNamespace: 'bia2uorbja80wsd75op6jyyyhsm67qle30xii71kaeadio05p0vmdeurybx4t1vv96ea6rs1ysxqp4rdih0uls1mi4f36jkljq1m4xhq3ioidfol19djjhyp2d80it9l5iy8nglzr63y9nvdp8xqtjwf5ex2gosu',
                retries: 1157891839,
                size: 7130703399,
                timesFailed: 4799893851,
                numberMax: 9156319915,
                numberDays: 7116756376,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'cikdnpby3mlea38xg6p726j9zxrwd83cyxqiex1o22jg626wg4',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'wqlm9jmvhvn89vhapsc9',
                scenario: 'xu4amomyyg2fjkixu131hwnxpk62bpawv2y1zjh35dyif8yclwxoitjzstvq',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:53:16',
                executionMonitoringStartAt: '2020-11-05 15:12:45',
                executionMonitoringEndAt: '2020-11-05 16:42:56',
                flowHash: 'iisxzxt5iblh0fdboea781lj3jrhb65u5jasooj2',
                flowParty: 'o8b3u3a4f6bexb6ctjb4hnpzcghkyy5igemt9tvbpqa7eeucqmbq2k2kyj9zw8n5fjxljm7a2acva5k47cn4661ovzut7faos7dszzw65mf5omh59hz4r2hshll8ai61944t7qasuz33dyn0b8bv2os11tiu74hy',
                flowReceiverParty: 'irxqn60d7juud8q4x5zn90jicbz5i13h8f7mkfh81i7vuh0107f5zp1chmk5zpi06r0eey4tvtio8nranm2qs3gwx4hpzu3fi49lh46y4e3ly8t3vzakxzj1t1szob8hfdzuj65nq59tgdk5877jrvvrg1vjdzeg',
                
                flowReceiverComponent: '01aywq61rxss1vaahk96dplxpmksh9847u8awpnadyqbw2xuim93h0bmh3f2efo7zgeutkz6896ut9z24si1bxya7ag07c157r1xekpyyozr4fwcguo7vkt5rlpdb2zac1js75jufq8i23bz4opo5knfeqr1d9g9',
                flowInterfaceName: 'urv99lz8uuq6dlalh5bey2ugpjcszi00qetheppqnl016c3iesbgleqgjqjydabfn9kjdrv88sm6ah0q8arqy6itm1jmxbyc6zplr5ktopqsl1z57t9leu8porw10fj18hf7apewd37hsmw38dind4ry4p1h9sah',
                flowInterfaceNamespace: 'jb04m7ve0b98lsnurxh3ly4nqp4k8o4wy3xgx2ilbv00auupofmflgip87c7njo8f10h1oep3ewqhvlra1ue3xbu3pnuwk4sxwlem2ldt9qgf9jq05qisuldqicn2t0f7e2udduoybiah87nm059nv1ujbmhdebj',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'yh9rqn0bepno99qgdhp9glep09uyetgvdhws3e8yqp393mr7pbqeb1ubom4h7j4phmk4m44m3vj2v0k3b7jy2a8pptf7xjo249skzquh0parqgvpm5gi12igwzvtzr5439gdri2fum6e25py5kbe93x2roxon3wi',
                detail: 'Sed harum eum ad. Eaque nobis sed aut consequatur nisi ut modi occaecati. Fugit sapiente explicabo qui aut assumenda. Odio et at consectetur aut aliquid consequuntur aut aut.',
                example: '8plcowarvl5vrdigwgrytdc02jom8grpx48k688lh2c6c4m6wtgeg0aewj9l7eenfr3n5v7jm7cvs6d1ot0s8dzk75ukzmb59kbmlfvxtmgutmk6yt1ks6r2m4mz4ql2y1tlomzgt2a7u3xexp5rznwpr03zs83z',
                startTimeAt: '2020-11-06 07:02:19',
                direction: 'OUTBOUND',
                errorCategory: 'bm0xfa3ry7cucbiv94dsx9quk7prtsqotembpj9pvsvkul3s2rnssu1dqzihj057jl18njaddny8pi9uy0uhpkv5uv0e0wnnc7y2ey75f6fagbov48jeqixb52xupfbkb4hq4scila39cd7ca3xfuiens7o0city',
                errorCode: '1efzrhl21oppn34xttctr5et0ggxyi3nmw3itk1qo1hu813eiz',
                errorLabel: 988419,
                node: 1714576825,
                protocol: 'eytw8ugswfts88afceml',
                qualityOfService: 'ncszbm4obfxoa5kyc6sv',
                receiverParty: 'jcpspavbntptzr4sazsiow61jqgxvinc6964qoyzvn5jazp13taeocg06ymeyay8akn0qttdoqna7d444zq4qelhciopqgwyv77gtgp909kv4fxuevdu3aj58xk1408w7govrmgppok64p9hjgob85cr5brqdsk5',
                receiverComponent: 'aub78d284se3xwaxvdujtpkbicpx3ve0jsdpeoxikvsu4qanu61cs9tvpegsrtxanfg1fb2svt5c3bhdbqhmg0gk1frx94tbmo3x3vsrgehdjvldgy1i6ctwgm7x0k9x12icb4soqk9xtw7grrwecfvm1xdolxwf',
                receiverInterface: 'evwiu3nqlpu61h8kx1gvdqn5wmhosep7z5dpyxmn2i4ycuttzh1jb8ywu4up4ndcl38kvlz86bmc06ctgh9cq78ip3un960doz4gmanwofp0o01my1yz7xcjgv4po89e6sa95jv5xevurl5m82f6a0uwn9oghu8v',
                receiverInterfaceNamespace: 'hry9cl7r7l4n7h3tkqg3rd4hozru6gb0ehrnz6ho23eezv3fs5iebwiftsere0r37a1krahj00n0hahz0hhxfleh0garddkzn6g5m6hd71sevdgx6ge8oljyqrnkiy2xmgxllbqcf655i94jj1wnlse1h71mnbmu',
                retries: 7938000513,
                size: 9991805511,
                timesFailed: 1135830523,
                numberMax: 8876007555,
                numberDays: 2831963608,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '93ei12t3hlkkqc656e98kxwhwrp5ovkvk66nhhikyuqbbwxo6b',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'emqoplmuh5q48mqukvrh',
                scenario: 'fy52eroogoeyuwjfi40i9adz4egbrywjpydrl424msq6rlvw5tplpvc4et9u',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:12:08',
                executionMonitoringStartAt: '2020-11-05 15:34:31',
                executionMonitoringEndAt: '2020-11-06 09:34:08',
                flowHash: '0oklkz8e6bvp3ya7bmi3i3h6ye0f9nbf06nk0ked',
                flowParty: '9t9uxwj7w34brv2f5qzorggffq5gs2y5r8ropo4aun27fk04w357bopmbhpq7yl84xm6nsdc6zwn98mnx91qe0h62fsp49xanvwjcsatnokvjd7kk16m9jl3y8gj7it616xuxpl273wj4t96mrl9cilhm2tjwekj',
                flowReceiverParty: '63rdrz3h8teqsnyqzeg4spefrk0dkp8oqi0ep73y70qjh0aud6vh07bqt2s72gbb2i1x9o2lnvfq0jkow1x8ay1koyifush3vgdabxzk07qpomryvaxkvhgksldkq89bco53f2vi3d63fyrusltotl9pnet14lvm',
                flowComponent: 'v833fqriam3yx81p9zjo8zjsu883au7yk5ywe07b7ia1gism7jnskkitniidv0qzmdd6sopz1bkcoj9slec54v6s28gpoir6ha5fymc762208oihcjvu0zwi961666ajk33dv98c6fkn477lqipt9gs0u6c7f4kk',
                flowReceiverComponent: '6crrm91ndn5dald30szk7qulaj68vwbu5334eia149a1ur1mnlsnl8gkmcmpkf0d4we67bezl8f7n6gbyuei7hc5sqtkauhllfhqqjtnxfnk21753dpoj9xaedjfu5ujllr2m7jcx4fycnihs4u51zevvo88x12a',
                flowInterfaceName: null,
                flowInterfaceNamespace: '942g7czv2pgm6hel4bm69ck193jggi5bsojpyfd1xoegh7ysq3f1gpglqxxxdpfdpceqatlqb399uk3e9pt4mkus59c1t0ebaj7l0rltu6etpye4ayuknr19je0q5ruima8r6l4h87aedpuc5r1h8soo4xcytly9',
                status: 'CANCELLED',
                refMessageId: 'bfpo3u3m68tlvcrw1kk7ge7dqtbc3t7g9onbrvjl6qtcrrzkfwv8k8hcvd1qtsjw2iy6122cw035x9r3gne59bstqntnm8hby8ciz9l8q17lqklit5gdzkrbk8d8vi2b746b0bqd4jkl52rzm8axxlffvefync4c',
                detail: 'Voluptas quas sit deleniti quia exercitationem eligendi molestiae. Repellat quae atque vero sint animi. Nostrum autem quam dicta ipsum veniam odit aperiam. Cumque fugiat ut cumque vero cupiditate enim quidem. Nihil non velit quo doloribus officia dolor ab voluptatem veniam. Quae repudiandae alias qui repellendus quisquam harum autem non similique.',
                example: 'lgg26k88eg7yf9y937txw2pgx40i8rfmavhk2swaf3odq74vzhzzz6e8ojp4r4cepxx74gyrf1v6pq4gme4xap51ae1n1g926f9d30h8iybx4qmu44pegveci86xb3cowky9n5siqlqgbesppjg75hnhqfc7uay7',
                startTimeAt: '2020-11-06 00:20:30',
                direction: 'INBOUND',
                errorCategory: 'om4kneh5n6kjbewpdpewpavd1njhuw1igvhu73tgn34h7071r9xsxhvkx7obi2ks6sftpsc07qrqwm5z6kcuhfhwl5i06oox0lztlhodbp6mx502pxfow4q5isrv2xup3vk35f377rt6u3vv5pwpd1vl8b9hofsv',
                errorCode: 'y890y6h8kohbhfhz8d04zv1dw95i1dpwc4f8f5gr7oacrfmfut',
                errorLabel: 669600,
                node: 5483754693,
                protocol: '41p8kxv59si0dpq70cnz',
                qualityOfService: '2tuwqdu1me0zelvr8sy7',
                receiverParty: 'adgjk7uumsfcrgsa66z14cbvfgdstblj67gl0sg2vcrhg2l4abej8ybh6itz521bz6vmqtmagluh19y3li7pye9fihe4wbm6qh55j50d6pzwbq7lcxvxagq42kls30anr1ko73eonl0sbpqxr3e3ibizv1q960wh',
                receiverComponent: 'kb8equgnb4wu1mtdj2selr4eqh9wqre97hcu97yzhozruszo98m9k1h84aakp2rh9eolt18k8ophxtcjfhwx5raf4jyhftaqmum2cvcgfs92obp4ymximo10gdixv5clim7t148etfesedxof8ypwrcaea9a2cun',
                receiverInterface: 'e1eublv0tszz3v22sqa295mpbvgyp7nw0rz67h3j8nt2yojhkyxwwikx8g78ow8miwlbniwrq8ep5h663auqu3vd5ocmmn8ml3w0rjva5jg5hrow92dfkcahfu75o2ckpugi6ugn74ti6e0xd5in2422cxe46ljn',
                receiverInterfaceNamespace: 'm9cpi5mv8lrupri4eud4upvd9bitsk5e49lzlxj63pwhsnpdun63yml6l2bvcwnunme02zr5hgskt902rf0figwcr69zssm75pptrdjqtlxpnm7o7hdrz6ruhxq0hc86jpoxzt1re6rnwu7bc6mswfrk9yfzweal',
                retries: 1697913021,
                size: 6059094555,
                timesFailed: 6626393928,
                numberMax: 6523924385,
                numberDays: 4378535541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '4f9ytehgn8w4s2usxwws5awqtsxjkhilak0nnnz3gssg5qbzst',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'qe7gby9xubfn8ll1g5eg',
                scenario: '0q1txh9gqkjuemuhgvv7qkf7g21r16j0jkddriuzafzvji19brcqi9au31sp',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 03:42:31',
                executionMonitoringStartAt: '2020-11-06 07:35:26',
                executionMonitoringEndAt: '2020-11-06 05:26:00',
                flowHash: 'txf3wzubggqn2qpxhxvuibdhtc24lnkveqr8zfsg',
                flowParty: '8pkbc7z1q8ticeqcvdg8inr2mhufeif5ntnvd0vu3k92mt142phzaxrubm9ljo7eyx0ji4wowuu5g9703dp9fu2lrpirx8ny5nmqy876o2abb0dzhg50is6jpvrrxgynkevfpnsov38p6svoj2pjbq90xuxpt4j7',
                flowReceiverParty: 'sch3zxyq1crqrns4if0uhluqd8omagxdo15u1se6dmdlnqv3dwkfme93vvy36tllqp8m86va8g43yetqebv0bmcxqfvtc1pohx3zi7owaj59d8ibqybbarb54uhricvifr4v6rlgn8yu6z05oen1d1x38drosvsh',
                flowComponent: '117zqlezq16r83n9af83k8mwshe7ymbf89xsl0ycb04nzsuypro1zprbex78hanaht0dfhu8f99jx1fajk3kk38n0kl85n9sxt3jvgmj7zgdiamsfqlyyp5q2r1jdq9iz3drr69ll74bcay5qq6icc5vmd6ohnc1',
                flowReceiverComponent: 'efbhfj3o7wa74np5qumfoz7sq63g9hyzm3bpnwc8c8p9jb10fwk18c3c0dahxoq2o1qxajgj73073jcmxr246dtwhskqdr9m6ysdaxbxynlzsxp6us71v0dc6ss5nyzrtm4o9x9flq0vpjxqapa18hrlrgpyihdb',
                
                flowInterfaceNamespace: 'odfmh9361y6eiujagex40pqyxl5gkrrhlhv1x9uoyqanlr66oqrkd3uskekwxjjh3kp6ry5utvfnbjpprvs0c7e9vzlfe0ekcqh0p2jdawx4vvizs2wx2bnoankgfmq0fk00h0elv2mkj0o3vdkeypvqocjfzg9v',
                status: 'HOLDING',
                refMessageId: '8ryb1xwft5dhj8yit0vj26vc59oar6q8q3hdjctd2rrvtzinflq7rs9x7ruftty0bnxjh0tdxx9psvgc3o8fh1njcwp0y3bqqe13j0ahs6h67c9m38vuoopsxocmzd114duzunqp4oihrvykqbcnzpytf50czzi8',
                detail: 'Tenetur eaque quos deleniti fugit qui molestiae. Consequatur animi iusto aspernatur eos quo veniam ipsum omnis incidunt. Cum dolorum sit iusto aut.',
                example: 'hd4gwd3h3s68w9vu0zzm51pvzauk61azgt6jdat608wk5pcncp7agwjc1tc08nkcryxjkzpbzzfbax1rphthflwwqoyqkzvst55qwjlavoqkpnpq3qta0g0e671ywat1ihf56gcqfnso4ehfh6gbs8kqpvwcfrmi',
                startTimeAt: '2020-11-06 09:48:49',
                direction: 'OUTBOUND',
                errorCategory: 't20w7bjqzg4db9s03azrl9k0wqim06kcee1hhnr2puuqq8ovwz166wglek4w6ho5omp1vd1ua89igf47cw5ozofo42fv184mnwew1mmcz90kg5g22r0m229uybeyqnr32uvca37o2jbo35ef97a55mil1uonisxw',
                errorCode: 'nl9k64ltzpc5vd3nre1c3zl8bm3whh8kg61cm2l5z0h5qwc16f',
                errorLabel: 671587,
                node: 3497578829,
                protocol: '190c0nsdlj9cc095btyh',
                qualityOfService: 'm7c05mqf3yj9vhg4gyg4',
                receiverParty: '24o2ajvivz2bcg8p8wxe289dotc4jjw7jg6fqpbtxgjvbhva6g2hxv011nh6naha2c33lmcvsvk7s6quxz78druj40mqu68kmov4m5k4j2jkh7exdolpcr1v3h2h0ax6rdp29ltxrdw80oakmzrvrf913vavo7qk',
                receiverComponent: 'dsbtyja3u8phxhyd8ss08vye7j7m0r5dcmvvzlz7l8r6e87d4wj84qivq536y2ljvxatsmv6gq5y4v11oc9r6kse3whhuoyv1cfmdgw313kvnjge8o0mjjhqdlaw4nlwtgw93k2ec7d5q0xj1ztcjvje9ysvl345',
                receiverInterface: 'kef9zwvog44yfd50ws9k7x3dc7qs35nbcbhgspnxvwypxrpv19pqqrpu78lptartqeqklo7tk5aserey8x33uezg024ect5bfkaybq5z0yoj4i1qhats2ysdfkaxdi57smyfw4hlodzdasxnx90y5264166qvmh5',
                receiverInterfaceNamespace: 'jfg2dqgblk9f283iwhmpclwyv9bbz7j86l926zd33izr2qfeepoyoll7f6q5hvzl22xq0opf39mqi3cj3ruolqmdnrh96wthukdezlfyjnd6fc5q8ic12lvtcrfc2xeosyng8mo7xz9gbp2pyu0dh0amxafhthd5',
                retries: 6607945953,
                size: 3542231570,
                timesFailed: 9620512632,
                numberMax: 5700785040,
                numberDays: 1491828609,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'ox3onroyfv58pnhy53ky03soc56euasma38iekv9mf35jb7ws1',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'yrx9b1dyp2ihxi83x101',
                scenario: 'iebiqm7ipgvvyz5sw8lkdujooqe64twu6skibe36n0mnkbscyc838oxjfwm6',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:15:24',
                executionMonitoringStartAt: '2020-11-05 12:40:38',
                executionMonitoringEndAt: '2020-11-05 21:46:12',
                flowHash: 'twvq74224hzkcpv23dcyj21azb50tp33yyb0cizs',
                flowParty: '7ox6qlg1q0wgxwx4tm9dp93tt2flbz8yxqa94ipu6a1ks3hhq4je1zv6ljepdvkum6bevmav8020soumeyrmkwtpnh8p8kebom0wue4f0axcuuuex9hellgv88ecmsaguh3mh8a26umi21mby4s2vrzfd94w353u',
                flowReceiverParty: '4pcnfij01pw8irvkqdnizkalmcwzwlq95aebpj937s265iwi5sva87uwewh7ln4j2z5nlf5fdoh0roqjn75mzydcqu2jn0ce4wt8tmywg9risxma15x3k05o2ut0xg2xp2mhxmbyskrwcx7magkmr446i9b0fxuk',
                flowComponent: '9udpv24zlhwk8elho22sdxjvksoxglwt020n7jdsd5vbvi1yf3d5pnypcz34qhk985mbwat6tw1fgp5unqvrc7849vimx4g8p1gx9z89tb6pu9halgapszixd1ra2kqe41f7r73jd17j3ww4bcs7yv4t8fnqjzu8',
                flowReceiverComponent: 'zxkys7u0f8td80kvlm9igfw6oqz2dgfpuyv0ow65kcqxrdq2mtlq7mez51ywsbb4jkrxh3czlnw06ia6qwep80t7er3m4w1tzpa7n70mwxz7p5i95zm54ama4uyw5e3xz0yeo19pzpphsi4lsqnlko9eloqy3iph',
                flowInterfaceName: '67qlwqmkmp2ajn73ydlpmirs9eyywzpglx17ab6ms95sjh0lwz0a75mdgq10ll2cq3j7val191elkm5pcy2gu7b5kn93kbw4j3ixyo5lcxcuy5k72qalinwlrmszajbnnk517cv8549y3yv35gv4bhzmw5n0x1j5',
                flowInterfaceNamespace: null,
                status: 'TO_BE_DELIVERED',
                refMessageId: 'ud872l4ba1ok8g5i7dase86cetauc11wavrun5nwhheyu33ybhi837jf8sotymcynr5qisi0erfcsbrh6a51tos1ltn3002xumpq3a8hzcu1vyo7fkrrujnvbh0hxfzzyvvaf04ecdfdm4x9rjp8htxsb5vxr5by',
                detail: 'Dolorem eos fugiat sed cupiditate aut optio veniam exercitationem delectus. Vel aut voluptate porro aut sed. Voluptatem facilis voluptatem. Quod aperiam sit soluta voluptatem a quia quisquam dolores omnis. Voluptatem nam voluptatem qui reprehenderit id ut illum aspernatur quisquam. Neque rem minima.',
                example: 'nge18vgkts7k99yljbsefemq6dgsb6beynvfai41ymeuno8l3yluixucj1xl5ra2aibykj2qft7sn1o41ce6495pk8yibm30gl0ycifp1f7y4fav967jht8w7bdtww254svn44mrkjqejtnhd8rtcepx3x4n2gax',
                startTimeAt: '2020-11-06 10:05:26',
                direction: 'INBOUND',
                errorCategory: 'hclgeti4oi7o1m39zhaafkqrrb1ujuiup5pi7k788lzoplu3fd0tboju3t9zhfydrm0q9e0io2y29n8yovg93y5j0j9m7k9i670kh5lxjy2d41aqzvvw37jc1fp0vnvla17f88fko4o9de8tfv6j9gbs5lc9zi37',
                errorCode: '0w8uknup00zla3fn1360i0l9zkbdjn06418j3ser8bumvzwwug',
                errorLabel: 516292,
                node: 9272280981,
                protocol: 't15rvsl4d17c5khtdvr2',
                qualityOfService: 'sqf9peqrgh7ohnglunq0',
                receiverParty: 'iwsd7g41o679uztv713jmmozr2lyuv96pekf1yn0lcw40kv99ts9ba32234ulqy77pis7q2krpwkuf3kqmyusmulaxhol3epp9wtknus4c28sp6tnf191nid0tao629sothwfhd19zldgb23hqgif07p5cmemde0',
                receiverComponent: '65trjrvu6m73icqi98qs0adxqxlh7e7n0n059578h6y4yxd8gy8jzj5euj4ksxxqnzk64s5swmqmzm51vv690dafab6rj0rinc2i4yc1mscaiqj86aoh1q4kvey74a306dbl8d89pg6bjom5vc8k5ajvul0zsevp',
                receiverInterface: 'nw0w5r3dgnnnuw2wjov69tebm8bq014bbxwtulz3rj22crt3y4do64hh9uopf5vm9mltziip1uih3lxjyvfco4jolp3q677jqdw8nmyo98uxh4rc1rxwqllvm711unxtb255hd71ea0vd5d2i7m9ctv6jkgsept7',
                receiverInterfaceNamespace: 'dpdyhghdtxj36o4ou0km3egs8zds5fk2aa7iifvd42d6bj5gz8o929ij00n5gyzfo7yz93fipue078ps93h9rvww4bdbckq7rju7u4m4epijap6u5voq27856cur9wz61qfgb9fbhpcd6tp4jebcvr3y7xx9wr7n',
                retries: 2323600111,
                size: 5834551156,
                timesFailed: 4428470162,
                numberMax: 6802380169,
                numberDays: 2695343804,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'fz2unto6oaisajsxj9mfba3dcgr8o7gorb9ec8znj8vogksg32',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'fyszvnqvsr1p1f71n8ua',
                scenario: 'autlsq0wvna76w7q6z219k1v1rkgwuoxpioeu57jfu8gu23knmy63c4c85bj',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:08:55',
                executionMonitoringStartAt: '2020-11-05 19:09:04',
                executionMonitoringEndAt: '2020-11-06 09:22:24',
                flowHash: 'wkgihrg5njbrdcplrp01z21yx9icid7r8e78oj3m',
                flowParty: 'tvwj30u5v4teun0q90soz40xr4hotcgfrppay9tqber7h5glpzr35v3y0n5dug87cknxgveoqudpcg6m74802smyiut271rstu8pxtx78lnj4e2lw4qlilkgrzvwuuq84vm93m8an7rjb6g8c9cx8a8pcug5bffh',
                flowReceiverParty: 'zyoby1v9y52ed8ortzzkeucuwt4oui20niinua3pn6i0rdvalxx6kypun6z50etstr9urul8ifssd9yymlhvubaatphav3njcf05equ749qrit4rvl7qz1d3fs6qybodqcq3wmpvdvorup2g2mt8km3kz2ub48dv',
                flowComponent: '19yyoe1ojv63fvveupmn2n6eq4ho4hcmmcvkv5bd1lbhxy2m939vh0nntn7mz29bauedk8ldqm84bxlbhysawa51shw8iar9vg2mehmidxmr0cg8vn0o5iq0qlvd9crevrgxt6ogilh16t6o0v307vjp8qthjclb',
                flowReceiverComponent: '0d6n294g8pe0o8i5gjat3iikc6ut370ljfouwc38ptwc4kjjuf5rlarnjdw1pg4zxnoxky5t1ict6gno8iazomchw1ww0dshtzc72y0luxir17yjpvn8k9ocxyd4l9o2zlzzwvvqi1nt2ehxtvxgphs7gbug7zj9',
                flowInterfaceName: 'qd7ujp68gtoa6sup6chdg0cjpoe9tjnqzwp4f48iijmk57pzuv426m6pv5itxoyjvnkobemqunbvdrplpbaqgq1a4z1ryb6uclhmjsswdjmhknkpdy5fggnjopogp4ec3bu8brujjx5znbdby7fr62r16zbc5pjb',
                
                status: 'WAITING',
                refMessageId: 'f24hqymvl8v575tij8uax9ujzzwbqnk25srho1ufrb8wq0d06e4guds81genrdk25yhcsi1nme4n7tgv8gzxhacybhvasynflk0rgxsawomfvuo9j4z8akm19ww3whb73j2zb5jvyfz9sfgpp47762ph8h6nf0la',
                detail: 'Sit molestiae voluptatem iure rerum consequatur magni debitis et. Sed rerum consequatur molestiae fugiat. Quia et placeat accusantium. Voluptate aut sit. Porro enim est incidunt voluptatum ut sit cupiditate.',
                example: 'zdnk9fy8shsu93tbf6rnq0r2cp84di03t3c9vk343ka3n5ha3rua3tokinddevgld9twl9a4za1lh3j9x1uam6xww6fnbx992nv8m6br5sxm3uq7v4fx4vh9qifpxn7iirj99x69woo8j35mcawodcqg59693m0h',
                startTimeAt: '2020-11-06 01:16:44',
                direction: 'INBOUND',
                errorCategory: 'vnpki2vqhcxywsuzr5cfr16ahyaezjp4jkd4mtmf82ve4e8va7ae3cdgyg728wuq8pnszubovn0dfqdiw1urjoxgf7wnvpam58kfi8223is4q6if40kts723il1t6n7snn4t55pr0lg2aysrraoauh0wi0sepdqm',
                errorCode: 'efk7zye9qbxzplsm5hr387bq9n1jq5z0n185r99cwdmiw9k25h',
                errorLabel: 975448,
                node: 6337410713,
                protocol: 'qrdu4bb5ulvz4zuq6zeh',
                qualityOfService: 'fnpl1dopbw8fg26vmmq9',
                receiverParty: '10fja8z4nhv3j8ay6j5u8zmwnmvb2dm02lq73v02qazm3dxrtqrja4661k517bl7u0f2arnp20nqaglvy7is7chbz3blwrffhuriul3rswp7962rdhayf1j4im7e3p3h1sx7ehxo2ze37iyk2xdp4sxij1lowi8y',
                receiverComponent: 'qv39ct0u59ykjxp8fnaw45tajxshpus0ljtsbeua0thwi7uegjqlo1wjlet4paklf2im9zhlgt5y17as0yr63ts4rnopnbxgri2aygy9zvr3o99iam3mx85trcgqp9vdzueikks1im5lrg5td3fse3nvr0nvx5nj',
                receiverInterface: 'nkk1h1f672pwuxm0qje7n3ze4ujdk490zz5q122gz05tqtbvkzb6ldn47udra0c57gwwf1n5zufwhw58ltdf3dbr6ucue6jll60k8hp060uk6hlp5l6ahlwqsr0plw766tycbchvfelb7xc006yad9j8hd38yu8v',
                receiverInterfaceNamespace: '9f3gsshjwjrlx6rh74ghvdljxhr4zcskg8e1l1vfckodlg17i27yflj50kyw8tl8ipj91bmql65dlv05lc9r4x1fg9ezvihrvjatvzmymiap8g124cuj22b54vi9kc1qfleh29epwxr0t0bxswigoqji0ovza6ln',
                retries: 5834833995,
                size: 7193638698,
                timesFailed: 2520124870,
                numberMax: 3654006997,
                numberDays: 8883364739,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'la62n0qmq6w9d0jf6z6b4kgd6cs0d6zwz7w3vjr2mv7e67anrk',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '54ufe6x5pwwtt05zsiy5',
                scenario: '90v8dofzjkjvirbnzayi2v4r6rv04gj6b8n7hkd7vfblrmhmqdaqeusk3tl4',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:54:44',
                executionMonitoringStartAt: '2020-11-06 07:46:35',
                executionMonitoringEndAt: '2020-11-06 03:38:32',
                flowHash: 'romc56h23t6fl784u9u3kmbfaea1tp2lhnylyasw',
                flowParty: 'p9u1yqwovwj7tuip4qp3hjn6cf0ter0rmczc8bk07d00w52mig01jrvrngcgixf5y4t4eojcxelngt7lzslydgb1prloxgw5q7bz4bpuglk4gln2vlpkce15anql5p9kv6mkzhclhstyseasjnys4odkiai89ekb',
                flowReceiverParty: '19pn1v73eg5t52g03lvd5i0mwti9v0kz1gn3oadal5onc8rbhudexfg6yiarhvrbxq7nl2rnpjnr6i3ba2kzfin399ydhae0wr3lgyf6lgvtjf8do2ebturayegl3zsaed6lqjkeb32la5oewvorcrli2rdi39xm',
                flowComponent: 'qa5u34fr1x83yi3febpnpj05vq3q5o5cbqrut5mqzx1sio2vz1q3ova6k18q0a2cisibg2uyav45ur3w9nrj2v2eage0897aw7dd53d78as9yxpdernylgpm7lopgmzkwne52yt98dcts89phb6ysmbbj10op9td',
                flowReceiverComponent: 'ai2a9cygdtw5mn21zxtxgnpvaigjpzlipkadr32e3elhflneaweey0jufz8dd9nq1fycvz4fpkdllm6q7khb5jsjf4kb7q4qucn9suld6ndw3c8ryxnkrje96qkp44ttxebqovbqo0ebl7qurs1p5s5uwmnw53d2',
                flowInterfaceName: 'q3cast9e8bco787xk7zma3gf9y3wm0gp74pr8vq18dbzpbhce7ljajsix8s7hug9yvgxpfafdxvkntu7pkkzz4mklh0pnosl76f3328wj6put3bhdh9nfvp1oae6aa2vwnoue2buzpqgjqfr3mrjmeucjlpl2izj',
                flowInterfaceNamespace: '5usg8ilwiums7a6z8onl962mub2gcajvkeo0yfbez4rfe5bl5q7xn0ywpbj8zs2svojj74c06sg7auftszuxe0rypjwe700afsryd5xg1kyg5vhbu2ql5vwupca8h2lmx44q88dnh0e5voth5hthapc5ubm4cdy8',
                status: null,
                refMessageId: '2dtenc6rvatxinntgcu3w6uu8s7m3lrov99zgn9lm3i7k727fibjktt0adujqt5n77rhdx5fon3x8jdy2r00tesnh2uu2or04w85mvwz1h9qqlwbp31ggntgbxo57byzy5wsfmqihndt18ii2voftzysqkfribi5',
                detail: 'Perspiciatis a soluta. Beatae adipisci consequuntur ipsam nisi sapiente consequuntur eaque occaecati sed. Quia beatae ex autem qui praesentium quae esse ducimus.',
                example: 'bmvdlaa0pusck4579qefv8gcgesnn63g2ebaxxkaeyznqvf0i69uecotbmxh8uoymapskvxd0ab5wrhs3iu09b9hxpexytb39d03q1nxr2nlo10n62f9hekrc6zcp50e0hkqe2orrusfffcjiganad3m7ap0rm1v',
                startTimeAt: '2020-11-06 04:23:28',
                direction: 'OUTBOUND',
                errorCategory: '7714furhjzdrflwaygzk0znfa6grdsiojfln49hm97ijur3n2f9jtchhy4llgj420c69zc44w13h42vz42x6vpw5nq6y3ameizfvpapmowq3s17pudtjpmfkgecmc0b1u920h3k6230bsmc8u9wtdt3bqwfej81g',
                errorCode: 'malfe13l9hlgooy62juylzr671u9nzx3s8jn9j72vmnm4vdu30',
                errorLabel: 701291,
                node: 6263818292,
                protocol: 'px4oybjjlka2qy5lwizm',
                qualityOfService: 'n58n05ncz6imruh6ws5r',
                receiverParty: '7isx8p5jxf1731olebiefxpt7sl8a852w9rz77vakvepbmfute7u177yyb0bvi9rne1b5xt5qydgbu20qzytxqwexbgui9r1oiyqh2dgkc618dpxv3efhrbsefbmylisfmaq6s8a36rnnj211i20rtjwzqvupt4k',
                receiverComponent: '43jbg2e4pd5shmzxfdnxwjfei5s3swn5zn25q6t715rejhdi9u3xme4035n6l7x67lg1vbkdhygl7l33014s6ujsjas0rla06q73q11j0xvpfz3lcue0aiodu8bfyc27z67q99gdnuakiq99e9v702b0evbq3t77',
                receiverInterface: 'crpla969hpotvy2gtw7wv6l5ozagwe4ivt477cn900jvt980h80jv2j7sn7w6021zh1r42scg804o5ky3kzq30kwlnw72y28urv2g74eu3qzl16ptm4w4lrxc7cou6gcwlods5c8xkwea3gh603g5sc4qneyoz6e',
                receiverInterfaceNamespace: 'umjc51qd7z7bla9on1dspwumyfu0ilvvkrqnhppf206ti06lmr5h936a8ad7ukvprq533jxymn8kfidf9ejlq0c9rdvqdq3w8ljugq0fqa77imnzvsrz2sjajvm28h8h0ceyrcn5zmhqzcazo8h6k2pg0k0tdzdg',
                retries: 3446423074,
                size: 5571269856,
                timesFailed: 5645662472,
                numberMax: 6054511886,
                numberDays: 9532042475,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'bemw0ri0ndwla9krv5nofhw6kdwohh0sr4ru7dbw3oqbqmdk41',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'nab3wo9pg16gtij5vap8',
                scenario: 'b0il56a39x9qzg4mxnzmii55rtr1et5gmhj4pgt9wyk5yjclybcm7d9h1lqk',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:13:12',
                executionMonitoringStartAt: '2020-11-06 05:05:05',
                executionMonitoringEndAt: '2020-11-06 05:30:15',
                flowHash: '4qvv8uof8rm0eope1imjpedfeqmnqz1m3hwibnaf',
                flowParty: 'wrtzcx0ey152mvbrq9ajz6igo4fgqd3p294te0opgizfd6fh7ybp2kpfx6321lhyjneulu913zjjk69o57ndn2tr74ingbj6a977a73sderyrd1sy1k4z5fk210nahij8ones1ysdgard3gucclw7biytneyhs68',
                flowReceiverParty: 'bwo4w2snuy0xcg0nq0562ssuys4hse6cfxh41fqrbrtkuyx3oy54wgopgybqntngx2zfglku17apzd6wbqxfle84egpapuxc2nbxxmego4vl0j3pfcwpa5xf0s43k31f9cm8klp36b16c2vkl1t5i63dnzwbvn34',
                flowComponent: 'c1bi9uqaej3pc20thsvrqpx8y8qyp1v7if4wsx073zcbofztn6587k61gnj2ecmti0zn4qydjufbb1pv5zak3bt3bs3bdl359hgl2havg5aepdz20w3zfrn1d4q2zyskako55vifvwm9xvz5fttjlzi5d4vxf7oi',
                flowReceiverComponent: 'mrzu1oy6wpkb0e4bz1upu1jce443qvt6e9iu04ck9avf0mkil0e2m6j9gu71vkitlyb5ll1yiedjp8lahxk7s7wigka51fdfga0t0sj9xkx7gbbgpcmwb53cbvl7blwm2j9cqmwpwh6t1pkjiawmz947eci22jtp',
                flowInterfaceName: 'k2pmzyfw9owm9d281zsn33fy9bwea1vwty81pc68j211ypo20i7kbpz4ayia3bnb8s3woqc4hlxb8ese22ueih1mtahwignqwaulpgf9ooa76ff8pa7q801i3rnda69aiisad0mf1ijt0pasuihy0txpftpcsqp0',
                flowInterfaceNamespace: '3zojybx9wq1rabmc3bm9ls2g4o25fsc2x46hrojnfs3jltcyevcoyw67tw7zlcgndyrj5vlx1dzap7b524mxj7j48vb4lgyw23hum79109lgxqsnc4vyj4izhes7qqjjrk0abgyr18vpcjfhnj9moefy9h2nehqh',
                
                refMessageId: '2zd3aryozx6o09vtf1g4ugip0oxk99mba1b3ljf91g71xdwu8dqbzcrea4jaljrpqyi54oygd3l3sbovhy109dmyotjg4wz8kxgom9cpgd97ug637rw6dbrsbd52udzqao3fnwworgre92srhz8nqof85lo21s0d',
                detail: 'Ut nulla rem sed quod. Ut facere provident possimus. Rerum quibusdam est accusantium voluptates aliquam optio doloremque eos. Saepe sed iure dolores dolorem suscipit.',
                example: '85v3rry4utl1ba5z2gtarvn35y6wfclh03vw0ldrub3vcg6vo5xug3fhjo1q9elzfm8w0ychtmlw254thfj1r6kwkenbbvbjdeun4ljsyf5tytpdh9ztwwhqffv8hs8ar53m4x68475oum8eyapdw64qpjjg0oal',
                startTimeAt: '2020-11-06 02:41:18',
                direction: 'OUTBOUND',
                errorCategory: 'njo9zzgrl2t1q8un1w3x2d5nzp4jp9gdzfjgh0gbunh1gr1w61uj65o8t5z9u1a9y0v4r208cpfn8j26uzf3lvw55exu4sudr1rvf0k23d2f6iqtcahqhrtaqy5u12m5v6k7ohxwa1kyaadk2w2uientyws2vab7',
                errorCode: 'dxuiiub2kdwce6l6cs2r5pkf4t75gred11ps5832sk76v60yo9',
                errorLabel: 999590,
                node: 1463087062,
                protocol: 'yzuxmoj395zlv6w08gm3',
                qualityOfService: 'dzl7inxdjealvo2v69wo',
                receiverParty: 'qv7cv9oiaphqiirdz14yh5oidxnwr4rsp2v1csnhj05269ui1owpr8wq5nxnr2ek21gob0v9h29mfw2cbpf721uhia7v82tngh0qnvmcz6895rje7lpzv4u3e43bwuzkbm95zbwymzxu4ow2vjkmm24nadh5eydn',
                receiverComponent: 'y9q1s24x4feb0ijchlahmhzqsr7pzr1mpno90wbn2boeuyxlwyopd1bvxwwksopgnqchs12kpymxe4csioht5bexgqn5fdvdiq39yk0aqypu1ny5xrghkk7kl7q3putmt563xfqatde2holi30qws2voxgb7jkcy',
                receiverInterface: 'dostj3qohm76xdx18ygyktodt2fje71zu0wa1oz3ebzwxr99hgztey8om3m6bs9w53roehkab4zbkaomm6uepskwzvr33s801xw1xxsagcar96qaax71ml6q9h8q0y1uu88gy49qn2way8gl8zju2emg0n5kbomf',
                receiverInterfaceNamespace: 'izi82hy75zhlfbnuvoze5rolg4pl3701y3y43qfqhvvjhvbjcveogc1uucc1utsbrwczcf98iz3g158ma09wmoyayk21kx1zagoyhdxjy7d87lnpp9oodkvptgxd6k2kfowjplm93ebtretucyaghmrdmawlkflt',
                retries: 6070965466,
                size: 8514519996,
                timesFailed: 2227318124,
                numberMax: 3386299890,
                numberDays: 8889676517,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'a2wflyl5726vwlr4vxl4szr58hg9paj2e5oj68gm5okkijei6p',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'i69aol43wn3pmkrblzsb',
                scenario: '3go9eg40nj57mqwmmwqp7s3g5xqk5211mhvdzufiiph8q09ngoy1htuaoygu',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 08:16:22',
                executionMonitoringStartAt: '2020-11-06 04:27:46',
                executionMonitoringEndAt: '2020-11-06 05:36:25',
                flowHash: 'e9h8iaedpi6fw91a14ahidv3erav9doy2dv6jkam',
                flowParty: 'j4h5ojot9itijdgqvzhqg3x7nxeruo9tr7gwfhflbu4ygpmbf1zjdaj0fdgeiwdvfc6szil6k44oib913438qfkqudghizswb6dy0ewqp9ns3x66ta174te0n8mowq5tcv8nyblyxsbbvilrf1l49yywkqbhnks8',
                flowReceiverParty: '2k87qs40azy1fh3k3wi0d7027h3bfz68beg906bqelkogvjw8k8buscrlsx4ahd3sxcnyw2nee9t0kltsow5md0gv3mpamekdwohvj106xcu4ormxclc6mktvrtznjj3xa48aqu1ezoctn142p2nq3398zqudlns',
                flowComponent: 'yiiauvwsl217zurk0e41cl7sc348f72ofo601yyfrh835a7tq5uw1pffx4kaatp20la44a65fqfkxh5cnp2jb0w3s1cizull5l0oei5hbsuln7ipa3ampdts23hiv9ad7pe9igjzv4cpukh177tyawgw2momlv58',
                flowReceiverComponent: 'htm8ytth3kyo7nbljvo1qdpfc3jzwa484cnn0uguq0zpt1z9c6ve930subo4u8fhto5igqreatzo3jugl9hysplu85i1h8571f4r8mzcn08ppsxg7ehqz71hlrokicqy51u0ak6q27dyqtzu4t2wyu14jm1j452j',
                flowInterfaceName: '6olidou3u7kq2uy0w2byl6e1hfgimv904oeiixxdv08e3wunronvgzhd7ztj96jpeab7uaihtokz9ab3osu851c8hcnikvn37kbses3z0dd2z6rcsotty0j9uehe25ut2t08wyt8w8bfxhoky3aoqky7re045add',
                flowInterfaceNamespace: 'bphc2ukf3ghhbedty68tpyxly2p2o8ih8eoazm5n7adr2nf1c90hxozmcz3m963rm6ueukxqhudnv78nd1xtzwfyjfnhh9jtljh5g7n951e7km23zt40g1399nen79gccde8i7wg6inljn4g8yehqqhn5od17pgm',
                status: 'WAITING',
                refMessageId: '6hmd32p294p5pcndgatbxam6714bo8wstgk94xcnbujsgwqfsbkgws4apa3rrgr51crk4y4hopa3geb8arlszqtsguqg9mpllw6lhxlvjzm1w41u930c13mt35aikrw9lwm9e7zxmrodcmq21pg0e914nb9i9keg',
                detail: 'Quasi animi ea non in minus facilis temporibus. Quaerat enim quas aut enim ipsa error ad. Eveniet labore magni.',
                example: '1y2xtvgjzs1rz98ooms8nzaabgkrjhy2xjd0gb2oobn9v85448f24zpsmusqbeddnzwi79dlwu2j7u6ca3r8fmuqemwyez849tad5ydw79rnbsngipmnatwrjdz5yliktvnutaezrxl0lbsrkhn7o55o5l7wmk1k',
                startTimeAt: '2020-11-06 10:07:08',
                direction: null,
                errorCategory: 'xvmjpmyhtkmdldtghtx02kdyxgjy0nr91an9p35yggci7ujpt2gjg0j6y1socgdyjoh58uf4qtnmwo4tt72b9257bp7lgoauj337mhlyh5ivyh8cqretc2wjyf9llxbee1gmh3a8ag1i7n96z97selfn8216vbhj',
                errorCode: 'gjp4gbe8qempokex6lnb2lemswxwu91k8dexgz3x2a8x7k02e8',
                errorLabel: 247175,
                node: 2013091622,
                protocol: '0iu1x35zfzzwatig7djg',
                qualityOfService: 'heuogf124s1mq4lzvuo0',
                receiverParty: 'c2fdvwalwde6or8eqblk9zd525fj884g8h4u4ke1p9ewxfdi4l08508g0o1jumszs0t0fe3yg7xr07iveq1b0vx30wkr01tjcm5nrbm2jz5gap3jd9y6rhrvgsbkzjajrn9rpiqbpy0dygz3um9xtxihi53xkcjy',
                receiverComponent: '2qpjqqmcoqk4ro75jj9yaqj3o2p8rcvkwpir1dabdn5qpm3nuhrea264n3bp7d8cicif2a48jn6syml4z09dzprya8f11lt3q4dqt67udctaxojhj75v1x74yetqzm6unczwd1jbjh1cyk3imexgehopfx9s84jl',
                receiverInterface: 'm9glhrrhmn8gfd4u1fyywbdcjro9194hptr460v1tam33rir4im9qnlymalibolrb0bf1ottfsmorcx9hm3xuveqk7sncd665bhznnngpa5gm10pc6rtjy1vjmffizo1kbtzicykqi2cqj00hohfl0r0v0ngdxlo',
                receiverInterfaceNamespace: 'nuzc6bcngfmfd40s75to40117pub6cteoflbt78m6msrkcyeavhjxvqfa2fltwfm3ovi8yi8fi192zknr0sr4r302qhugqqq4ncuml2v5pos8w4y5kipxohnyv85l1uttmyvf94973l0nc70dbmv9z2du6txkbxp',
                retries: 7474641795,
                size: 8304931255,
                timesFailed: 3691403876,
                numberMax: 4992819969,
                numberDays: 9168187796,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'pho4jvnharzz6lvzh0iagcc18pd8armg28m53brc5bo5svuwbs',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'zp4sogg5k1vqn9soy1wc',
                scenario: 's9xg8lbsh7xhizosyfuiylva7pe8eva8kxua8w0cuv0bw2af1d9rs7yngpan',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:27:11',
                executionMonitoringStartAt: '2020-11-06 00:00:43',
                executionMonitoringEndAt: '2020-11-06 09:03:53',
                flowHash: 'fah2rmljc03k6gzs8qqa9zxoi06uvsq3rcva9swk',
                flowParty: 'cnbc1mlqkcskuiz1ii6fj2ubp5104o7pgyciu7fhzrf4aiebb2zkn1mib0tb0v35w1s73jkkch2tqh76812efmdu9t1hccwezfsjeb2k2ahoyia35qztui7nqnynsnd1yfkedqe3w264fn032hvoqanj6ocvtmwh',
                flowReceiverParty: '1g3mcr3lvv1xu05ms6iafpdnhsfffz5dgyxybvehx5521q6o5yfth6hdust5fstoxoj3yro2amvr8j19o95onw9huemnh20s7s5jvl4hoyabvblsabc96f6emdripqiclqc73cpp87qo78v565lnuacaaaidyn31',
                flowComponent: 'a6ggal64l9u6ea7u1tbrfq5splvelmf9hga3fsuqbtfb9u2a1amaqmb03fkfoycaiprlxlv0w9yjxvz9v2eao2chv9yp68hk8v7zps9k7tdss0u6vl2vqty9ljplnb92ersu2uov2wb76xtmir2bw6xraua6teet',
                flowReceiverComponent: 'iqnnb1mlymfwvpzk0pr3vurr8rzqaw545up9n3qw5luuvkjq40dgz0tqebegvmosptmyi838vz2ra2s3pr5nn6jax7c23gx15ve9rtol14t7kicmuj4lsxfzdgcrisuu3rw6gekgeur33t6uduii2tc4nsqakr8m',
                flowInterfaceName: '3bqkydmpmc4syns1nixphbv7qd2ae8zgf13dba1vanrwd9hi3c1q15mkpf18wro57t8nbpfgrq9sx1u7x0koof2rev85de0a84xzf0dfcdvgidykdau3hbn3y3q7t0reoxyhl1k3hdfyew44lglq3qk6uqr1rys8',
                flowInterfaceNamespace: 'j7asos16r1iat0cyj8khss1f3w6bn2wt5ro541kmr54y6lew6smrq0nidkibzbovexjzpuo6qvr7ey420prkwtjwxdkj6tv87h1c4sgfeo6nnv0cnlyd8hph2e1npgp8fvhdu9i7th41dazaztrp4kpp4lf8zktv',
                status: 'CANCELLED',
                refMessageId: '5r5f4qlw6i137shcf7fy7vmq2u7xgb0e9ok7zayp0zy72l5fd2qmr66fmsm11us3x8j5805rdtdzrj698qkwvg6b3hims703th22xix3ov2yjls2pu8zo3x272ukts3c9tbk7p1wontk2omsrqmisd7l827o9vms',
                detail: 'Adipisci quisquam nulla libero qui fugit officiis voluptatem et velit. Id saepe iure at quae delectus quia in hic dolor. Iste quod nulla incidunt non enim molestiae ut. Et ut aut. Perspiciatis aut ut laudantium voluptatem est nostrum reprehenderit.',
                example: '5d70e2tcpmarf5uabqv4e1wdxhk9mq05e29cvssvfe8a2ad3abkjaj07sf9oas5ih55dl5lwxgullzftlnpnuhs3tnufn4h9e8pyemiktcdzk8sutohduve2vmfh6kbz5m9tu459fmoko9g1pfz2h0yso36f2d7u',
                startTimeAt: '2020-11-06 12:08:45',
                
                errorCategory: 'o6tylb2zpmog8ftxg7gurujj706t25nsx034p67r5uspttlelztmjjaz40w2yjp5e2ka8pove4km69omlnkjzw6pndo9ip9861j2pw6y3dhf56zvczh8op7ka7c5atrzo36zfzu3drfp6h8z5dhbceh0wvsql30u',
                errorCode: 'on3p7mj8atwalvuvd7ucq73n8as9a6gsy4ltz35brmgf6o3bgd',
                errorLabel: 912075,
                node: 8517054969,
                protocol: 'wkby127m0ybe4n6hjhha',
                qualityOfService: 'xug98l18rllgmp7ls49g',
                receiverParty: 'bpb2g7jblttp0cnjt0ebyuxas31ze5y3ipb6dwf3gubv8hv47up17s34giknulrja5o7n0ea10x9fa2wngqvivg3cimiklmxlnzi21yj13jlp5qsydq876oth4e53tgqbb4vwi28qdopotw6j7pccdl0jjlrmuvl',
                receiverComponent: 'kq72mb0rj3055zdl3jzzfhwu9mb3gvo3k2gw13ckcocjwpknq25hsuew6kmqvxqaiv8kdmv4nxetswr5ose36uyz7rlwycs1g0n8uk2v0umywpsww69dwy9r6p9yvgl98sk1b1j281zz5cby79gioaj1tp2w9pcp',
                receiverInterface: 'sbw5h8hw4me4kevu9homfqmbov6n2tv7gh4jbxpxn71k1zslyyx4v8ci0fzy4tfbsdgg57dkx2002osioqclqji508nbd94sm6fao7x09vnr8n17h7r40902ps39j3z8m0fzfk54xco8u3czsaf5xc3vqlf344a4',
                receiverInterfaceNamespace: 'iot37zepa0e1l7k42h4n0smrj0w7gjjgy3ve7db8guvf0gkl8si9a4xbtkmz48naqactit32ye8a88hmyz21wc7oxxij7d2caicj4f6wdubfvgdc3659utr68936tu0pfhey9bowkd1zv8t4q7yc3rstjfjn4phm',
                retries: 2317586992,
                size: 5830098900,
                timesFailed: 7950957979,
                numberMax: 1848564384,
                numberDays: 7754964356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'qcvxqdpo6op6nrzqjd7ou49c0ccmvly6p8g8s',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '25ke73hfeciz5tlaxi7rjrs95f8hfobtm5m0tcj003rzf23eef',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'jhqus9mcdm1so6xb4gw0',
                scenario: '5i0hfw3olkefg1k9jsbzyb7hczd4mckfyoeuegrrr7f2zrcf4ybkscyk500s',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:46:02',
                executionMonitoringStartAt: '2020-11-05 17:53:18',
                executionMonitoringEndAt: '2020-11-06 06:27:39',
                flowHash: 'ehi0r634u0hjuj03zj6wco9jnwisglhajikh7qsi',
                flowParty: 'twd8gejkj6roy5ngnna3h0ycpi5f8sazrmnzqeib64ocm7ahe3x41rr4h41wmii7c7k89o5wsankm9ydj4rcuhrvu3f9bm86qax8tht36aj8tzz8qcbm7c6btkp7ygv1q8uhjia7r8lckutnqezkc1xfrubh9hy7',
                flowReceiverParty: 'f6vrlp6i79kr2iqclnjmjyk0795e8sbbp15ixe77jjkicioz0gq6kwl61zvlcbo06awjzk3maebt6rt83mp4c8hnfrn7gm8jgzrvuo97el21dr4xlmoyekicufldn3j5rtt416kbx61whb28i3hwuxfsm08woyk4',
                flowComponent: 'f7spat4rcw19k8yp4h8zj6e77y3n1gbnyp2eui0jsbl59zefiz3u0lw271cohhcea8faclmr7h39q6ici46arvh3v3qkukr1smz64r7bayfltkfkcx2lmk3ivtecc378ma73ge1fvb2ow8qusvw7zn6jwatg1rt6',
                flowReceiverComponent: 'iovxuy3m7lwqtw4i7w3kmu1ruv7g5w7gc3wijbtpswe26kmnsakq51blmvu5eerq0e2ve2ywbd7b82e8qdphnzunaxbv6bsh94sx9q9qg6k69oeisqzmnb8bjzy06oschv0j8iiob1xrboodgld4r34tv16x7vai',
                flowInterfaceName: 'cbhmf2q71fpfm60sn56hyk9admim4p3hkesebj7yjseens7ho11zr8e6m8gyb66fh5sr5ynfxypblnm67rofqyacjyki10ue8sucwgb4mkx1aiqg869atofo8xv421zckl3e2w207kxe2dst5wr7e4gf36obaegu',
                flowInterfaceNamespace: '9rtz5c3xfxlvci5l9ebrg2cueii4wb2itnp8tf3qgkujd5umvnopgpciavtgchrrsn5ybq1xu0tfoyciedgibcramy0a5l4rj0bwtrup1sc1x5gqred9sycoxiac74jyhiyfo01zx0uthbogrb1jd5p9ofppd213',
                status: 'DELIVERING',
                refMessageId: 'omz097iuat5d6aczq5yiblti28yw1kszpn89rx9iia72y5em8nvzt0avuplsw6d56yq2r39fbgre4ely3euvofruw2db31jzzla9onxm1qcahu73bllqn8e3lcyfur5giu0iqw7oupbiovf1pc8z589fnb7wrygk',
                detail: 'Dolorem molestias veritatis placeat qui voluptates qui assumenda. Error repellendus officiis quaerat facere ut. Ipsum sed odit dolorem qui itaque occaecati temporibus.',
                example: 'gx7xynjnlhzwojhv37yx1l7esun0vye40mbkx3v7ncywjpm4l1vg49mo9hula7v6qxeuxpv6jin0fdqcvc3m59sywkv5jlh180nt5f2f9vydvj7sg59honqxux6n6bxypylkmofqbr5zgn1w1zhy5m79krdjqwxl',
                startTimeAt: '2020-11-05 13:17:05',
                direction: 'OUTBOUND',
                errorCategory: 'oz7opegv5h6a6wwfsp0rtdrt7wy895wjgrpijz50onrrg1htn2vhlsyxlfu85w8m40qf3i0pv6p15l024fikg6ueuqy2ofc3fgotd77xp0h9rdcn0g0swjxv1qitlovp1li675crfwcb4g78ogizmsezqtygghk5',
                errorCode: '29klvn5xhsf7b36wxuanpn8oqt4s0pxmhaisjez7465iq58y7v',
                errorLabel: 321993,
                node: 8931524571,
                protocol: 'hn6am7ii8rw4odmtmk8z',
                qualityOfService: 'sch6rqxnn3yzbwdhc6c1',
                receiverParty: 'xxxt7kufja10xyc9695r8vjlx39rg5lzfgcifubhvkqjp39dnnzkes3wo1ldibd3amp0v238y7kiyhnwd1bc9gch6qo1pumsvb9anbu15awykr8e6osaf2k8f1i26z6jp2zqffyrloekvo7l81bpewhuw2oe12a2',
                receiverComponent: 'sssrdrpc9gi7f5ivvs1y0i8wkqmkl3asaxdojguwye9sp1lu7o4joiyxbrrcfpg86jygex8j1xm4ecan12i9icq1s8osp7vh553expxcxkmns6k03pkuyf5bbs4tqxnfr9yur2vv64pydouujolhpd33j4j8tyfx',
                receiverInterface: 'qy9xgrns3si50czyaa7l8uh5ip4963iux68jp3r94oibwmgoyyrqgeuxh4ga51md4pw0uwopjxu96a0mg6b0zp1b1ukl11gijjpx6cfavtgub4tyxcojdp3ci8fvkhz149ytgazrvf6o2h9mb6e82azy5qggl32a',
                receiverInterfaceNamespace: 'tkntnrd0b1udw190g6i6mm7vu9lygm8hqf2z2pznbbib5y4ow27ia00enmdrbpt45ha7axqdrciyqhwx70szfams1188b5904qxl5pkbrilxe5z5px54cy3clfeyta2maz9n5howvvoz2433phuze2w8o5iogvlj',
                retries: 5470064005,
                size: 5267706650,
                timesFailed: 4144808476,
                numberMax: 7071345321,
                numberDays: 1803045747,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: 'xrjx1mc9j8i31iet4hazdpjq72thutu73r9by',
                tenantCode: 'tjt5y5bfi15i9fpaxlj6jf7jpk70ixpnqah9whhxnkds4lfvf8',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '4ifb1olxdxxng006t72q',
                scenario: 't7op9we92gn51kjimrnlg2njmycms496st14zxkxpm08mf4t4o5vu5jqk6xk',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:26:57',
                executionMonitoringStartAt: '2020-11-05 20:12:28',
                executionMonitoringEndAt: '2020-11-06 11:59:09',
                flowHash: 'zrs6wtvfbpj8ucfol60ao9mvjv5vvvfwrmflrrb8',
                flowParty: 'rd0js6xfvm2osrdwoeilpz7otbg90p2tgl48dz6k08ox7ok9rnycds39wynm2baertuftmqv7p3phvjiw9pvh7ccoypxopsmfboc784qdr5lwsbvl14jk8xepjbihbo9rjl2665vlhgb8w20nkjvi8heq9z24fyl',
                flowReceiverParty: 'wqqnt428hl9i0tifb8zm27pvprqete8vkbqmb7lk2dh04vp49ixug5yhk7eu2blwsnnm813dnhnn491kvzsky6yps0ddx0jx798p099iy41si75txkpmo4xebr4uyyxq6xodkamlh8mgay780463g7slmewjk7pm',
                flowComponent: 'exdybox5wx3na60t022ajr2tq348ms69djc5y1gygobdxvcqov1226crxosco8lzhs4zhiq7s2gb4xe8weh0965ib3hlfbzil8k1qa7hjsk8ekv2pc1unriw2wi7jrlehgvxqogcobgwjm1b29w2jrvrweszg1ug',
                flowReceiverComponent: '2mksjo58jjtozurm7slgh6j3q0imlsmcdubwabpwt1cxm2jotnbnmpl8lop02jn8l6cecw65bvkrn0wrq245xdhkjtf2y1ybup2aep40eq9ifm0oexxqfg9tdk3e0iwgwhztfkhno5el1czw7y9f4kk5bbky8okb',
                flowInterfaceName: '40ehgb9wvnxvn7o63ujon0fh9u970xk4lqbatkogjtcb1pjbuopvhogaefr0i8ej6wr0z26cuw5gtfdivtj51woxgaymviq3ugennenbm0ix386ovtg4gsoy1ddm3at884ujin082y8ipp8dpejmi2vv4h66de4h',
                flowInterfaceNamespace: 'z6qb6p1mffpcyepuy5qx13jn00royy5t416ouherbqn0mwqb0wzc2koiicb70g8fxkt5viywtl1c7ixrr8n6i689bmkv6i24qkhjkx4shub7tgacumiifre9xj0a6j8grnc6571suqf3bvjtq2ap2ddy66gniepj',
                status: 'ERROR',
                refMessageId: 'tgs8o491g2q6n44v0t1h1fopf6l23quzpq3vvet7yn8cbb1kto3e622hdgab3d66erktxjhyuuqt67fiowupmcmzidc63g1gx8ta43vunhzsbxvebhdv3984jt8fn6whtbpkzscon99ea07p5dgbkghtbnfiyk36',
                detail: 'Nisi exercitationem ipsa ipsam assumenda. Esse tenetur nisi nostrum omnis omnis numquam ut. Rerum voluptatibus illo rerum reiciendis voluptatem. Tempore id quo eum dolore dolor. Dolor voluptate tenetur sit quidem sed est molestiae et. Cupiditate recusandae et rerum consequatur omnis sequi voluptatibus.',
                example: 'jf1pg7x9qfs2mkz0aiv0gpajyo8z579d50ctbbs34qq662h9qj4k12pa7qghec6eg6k3l187lgvxx049hyzmoj0dbum8vp5mcebbthg42t632ugbcbirrcxwtwqm1qdrsfgufu8lant79hssrvd1vqehp55z9dvi',
                startTimeAt: '2020-11-06 11:27:16',
                direction: 'OUTBOUND',
                errorCategory: 'p02rc032gvq7rrj678we3qdi7emea006iivrf4zpc1a16pf3i2gnhfesyolyre6x5iluhmyaf9pshkbrlqxjx4ijfdna7t3ocbmnmnzxq0mwmz4obowcad6kme0jhkt6mg545usm7leo7eigttqcj7tzd1ixclg9',
                errorCode: 'vodknrdj46b3fi24zcuh8nlxqhzu2x0utdedpjsrnf3ipf98h5',
                errorLabel: 824881,
                node: 9936094720,
                protocol: 'gfi7okcnroxooqr0lelf',
                qualityOfService: 'ni4alsrip902n8i311ns',
                receiverParty: '5mt8rltybuvain7on5q8xyft7z7ux028ystg99n180dztuxmp2f1prbvzr0ogt58lttzop2v4kxkmvz9fs03onjdamrqn8h0ysfu96ljxywnnmprzs6gya5efuzvqp4nqiwo8whh9utt0b95kzmenl4we0lvdnxo',
                receiverComponent: 'nzsut0ebdlv5v9l4fog29llc41s9u4esf3q3xmsi4pqezpuyjxfh7tyq98brzdfb9lhfa5rdil6290dpzopnic5fsbzqs7dcjgeiqnwnqu05rjqrwpi1stpkhqcpm4khc8nczzauhfiivijocr3q6adp1dk3j4qh',
                receiverInterface: 'o8b182elqw3i8ym0zbhbte5dfkez7tgukrl56yai6bxfnet7thyqatob6ld6mws5t3h2jacs98zksj7linjy03kywmy0m2njkmby2uao6kt4weudo9nz39gje1xlq5htpyosxz0jyynxur3uo9qd4zbbtcujq98n',
                receiverInterfaceNamespace: 'ljswbpgzjs1ut4sjh7c5ziqz6gu12zihtbakhycl8n4gvv3h1wj3anjixd8nf451apdisz4vgxqlnicubm2oaihp8kwe3t37i7971v44eog5gwwedctlu5epeeaxjpao39u9np1w4t9qy75e7g5ldak7rdzs4mts',
                retries: 1570265666,
                size: 1787036268,
                timesFailed: 8199187174,
                numberMax: 9231801593,
                numberDays: 9442716187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '2qpgt0tyn5a6dfvh73lsal0gq04tp7fs0e4xe2amoyo2qhik75',
                systemId: '50ysi45dvmrt7iwlyq05980ty7secpajajqnu',
                systemName: 'w8zwrgcqwdqg92s33tpm',
                scenario: '1z3dtu7js45knt2yfqn7aa52uks83w4vbojaq9h8lx2i9v2ccqi7vqpybhzs',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:09:30',
                executionMonitoringStartAt: '2020-11-05 13:27:27',
                executionMonitoringEndAt: '2020-11-06 09:02:47',
                flowHash: 'o4hwi8n74fnhjgsu2px7krwqy1ktshm0aixdcscu',
                flowParty: '7iuybj43i7tpi0mcal601l2dao52gfklqi2o223bo0f01sakksrldolwau8t2c9u8i538x002no63sf1emtaaid9jm3n5i3773alebp1dmaaoeg6rx0j870lvov50pykli3zk3rybnq5qwv4bcrk99r9fkk1nomm',
                flowReceiverParty: 'ngoczcto8wpd1ozlio0lrg2izrbitcspbsm4jialuvolo86vd6pq54ljphdal39oadf7sceobxocsfd0piwko2495qa7upbfirq5hn7xbw35qnqtelfzgnoy8npdpmgahzb4wy817lsyv4p5jehgv537ee3aw180',
                flowComponent: 'sblukmim2nqe2evh8rhs2lm2gf4jcku960pywbi8p3txcts9f74oogjfhhx2ervzaoqp38nl63c0kohpzuniyk06jbrujyd3pr2ijo80j4mxjkcxardu6pmjskippblkfl5td63r7lm78jmq4vczj9g3ftyzgob8',
                flowReceiverComponent: 'eviecbud2x2vm3mhy2lytiygv1u7egeao8n98c82vsolmilok07d2vvg5t2z83898u7unvwbsfbbu2s0ywxzmcty5snwyallfcgdbg4w6bw3uyijo288p9ygv3vzshcsmemuhj6nyixhpb5wsu2zvhde4am4iapv',
                flowInterfaceName: 'v4eyarn66qp91e4dre5ezjht4b5tq9jwqy1tnkwg1q94yxphseg27lg6snnofks5bjgp0w7igzwkgtn7svyzkdh7gdujdp0iu7nf5nrrvvakh18d55nv8stcg0p9a2vjmxdj6hk3b1urq64pj87hjd9bu81ac0c8',
                flowInterfaceNamespace: '1k4pkg4ps2jh8ivw4ukrdfc9p5ei8k60yyrzzkimhs7qbaoapvzxkmrjwiqn2qw4br1pg4dzkkbiafo8cyp5mqnmj4rqy052s6kzf1jchgilmybpignsx5ebvmzrtdpypr811g7kgw44x4l13ugn86nxq6jr1vir',
                status: 'ERROR',
                refMessageId: '9k6gbb7sqo95kdq4xdupxzzhrk27jmfml4x6ujbimv50wkwhzpud10buijkvmr9juz30cl1orrhfah0n85dsb9bwhkr0uacjxa7lq3p6h1zn1kb5t5lh315kr0w33q4rxeepsc1zq4rbcm9cd3c0vsy6f2injptm',
                detail: 'Sint laudantium rerum dolorem temporibus saepe eum molestias accusantium. Dolor deserunt omnis possimus qui et et provident saepe a. Doloremque laudantium provident impedit aliquam pariatur sit accusantium.',
                example: 't2m8vxufxoomw67gl72rl1nma7k2a98g1qf2s5kz24jdclrd8dw4bhpcwzzmhxmtrmw8firvxik4uew3hmjpelnd29i0z3rh4g9m22874wtalfbhxxjo21an9olp2wmx47ejjtv4hj2kbxkgtkmc46xw7lrq0dzt',
                startTimeAt: '2020-11-06 05:09:02',
                direction: 'INBOUND',
                errorCategory: '2iej0q62zj8mqofztfa5ez5lo8xf8ck8zybwy5r4b0qjfyw9338gzf0c59jd4vvt2xpc0h9e9hcir9pe0eubuoohsywwaxrylrqfijeel0050tz3w4oib37c5yby5i1cxemhsp3oxxltnza8ma2ds9vu3dhraaig',
                errorCode: 'bbzzr70b1mrhma2448oibf9snuean3shg75cn5l4y11lfqaamn',
                errorLabel: 638330,
                node: 9688917659,
                protocol: 'omhxtakm2b897f7q4k14',
                qualityOfService: 'gfqn6gcy8dltyba6derj',
                receiverParty: '1mkrlw1j4t44em9ev6rfdmtt5ndhwfy0ikg6koi2fg2n9jis35bdti2biz5uaklulged1yp01ro1j4ni8ayqo0rc80wwa7ipvi9p5adi7uqw1qyyto38mb6e60npyioesk206fukew2271dzggm26f2dv7xljf7x',
                receiverComponent: 'ly9gj741dg3fsfd7dup658kma30trqwesax2kc19uo0a4etdu3lm35mmcv9tdmh5c8gn1pldbizctp68xv3abhqtdqarq76fgzw9uvcdcn3dqrd0lj5awsds8n6rfk5hcccv3jif4xb3rjgj4zgy7f5x4net3vdd',
                receiverInterface: 'cuu2uog70cpty43sx0igulh9eibp7opnwbl6glx65f1njabvmpxbceeevtko0t9jc1c9p9c50lnc3zseh3j1x9gxniio0612ira59opyuas20jartp4qc8qtgnl1bdz2btzng6uqjdvsbqm62ilmioefvgoos74t',
                receiverInterfaceNamespace: 'ia6l5wn9kciqkg3xhlp5xzuccu3zcvaqe7u4gqxb81obj4jnb979yee00oo4jb9t023l8bzmsq9ptx8bknkwn0nsmvotbkphokq02vqav3219ay58hraazb82ly73w8fx1d1oevtget2kz944guxpeae0ie7ij0a',
                retries: 7446738557,
                size: 1351158330,
                timesFailed: 5413660509,
                numberMax: 2409603148,
                numberDays: 6610409629,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'lu7p06vfdkpvi7nd8nw4g5v2bhiqnafu2nfeuxz2yssisu8a2c',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'qioi2b7250q9cgqtaluw',
                scenario: 'oxm8scxqxzrbkw0u4mnz6pma6ss97frii0380fsm58ncsj9gxbmgwyw0033y',
                executionId: 'e50c1a8259xmd8di66abn9mmpp5l0yff9na50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:03:15',
                executionMonitoringStartAt: '2020-11-05 18:11:36',
                executionMonitoringEndAt: '2020-11-05 22:14:15',
                flowHash: '8cfkrdn180tbn4m7ofrcgiqjevx846x60sz90ey3',
                flowParty: '2my9aqgdi70yv4kbhgmthlif4j4umsq1ns5ov9yzjdupu4y7b0by1dpnbegljtcfb2dbry9xqc9gi68k7thovvf7skulsq7a5mku4hcuy8j3mqfx2sup8su629vfnwjspkkj8qfqu55kzhi2zd5orknftmahk86a',
                flowReceiverParty: 'eali98asxabd6g0dp83o2nsdddpm3zhept8mcusf9gio6alkqc065236st87zkgigl32w9o7px0nqlrcya8vedizuyktlkbc5rbzou9mi98twgoldvn8se961mj8l3jkv81g29ygip4omjjpzeivtej3r6dfobtj',
                flowComponent: 'd343jkoxmbw2n378e8ztgsvng13k8hadgpm7ps5793ps2zynyc0a3p0dlydrlsmd4idsp8xlps6g4mnje8ab7ki8ihnqxhcqtnzoqy6p76weshcdn76okv3wcs0bu5hgv7o70m3dhqo0axbiebvyclimorjneh5u',
                flowReceiverComponent: 'ifcf0fzyznm0l67o18kj7dci80ewgtjrdwbi2yzuj5tdgqjn0q2tfc1h4rbub5rae0hrf3lc09pxsnoljbmn95xo1xl6q2rm4465540lmjap8a36r1cq6ozfz40hluhjpa5xdha8w6hy0922kav9y9niz5e0usw7',
                flowInterfaceName: 'rce9unvnm8lyub6f0fbortq3oo9b4pk6ep6img9hctgbg73zyfiheclt594zexpvbl5k1pdam7k1kob7izdrkdb0c8ns3ipf5nktu701br0gvrwpkng9puo15shlrup89t33yjyrqcp3djqw9p6lotomd7qgs4a2',
                flowInterfaceNamespace: 'hqj2qryqmjq1rdbnclb4fkdo73ms3iudevqdctpg7kj71d67ixup7g89xgkdtchsj8zgjjck30vnz2uofltco9ty9vx3at58hr1524l6kgf6s62jtqcbu8aguzjmx6pvp9zzw3dvba4tvqm3obcarh9rhfvphuuu',
                status: 'ERROR',
                refMessageId: 'r3ot4kibg3uvb10kpnhw80mmjtlwsb60c7sjs5nwabrh3bk5tm3aw6rnbtoqhvorlxyh77wlk8399zekdou9gsulgd2gyubx6h65a2c2ge35923r8a080guu9pfavg2wllmsho58jykqtg6biwog0v9ny4ayz861',
                detail: 'Rerum eaque dolorem laborum temporibus qui earum. Enim repellendus laudantium ducimus blanditiis aspernatur. Fuga et nesciunt sit. Nam voluptates voluptas culpa perferendis ipsum provident. Est ipsa totam mollitia non quae. Et ab vel quos libero sint qui dolorum.',
                example: 'x24gnwni6o1dnxsnwq9vc5o80v0qqk6u0t00kpb0qmk7y3pusdxbcw21n2npbi8c2r7krq2u0evcfgxe62wctp2x7kzbpxqur9hnk4y097moia0gpqeach0fh48hxpojfk8fkob0st3y5yt6579z1w93vagbul56',
                startTimeAt: '2020-11-05 14:33:38',
                direction: 'INBOUND',
                errorCategory: 'ibd0yz566s7qkkpnv3sm9axom8uv2rvittsslmsq1c8rf4yejbijgz8xdf13hbx5n2yuxh0lo6886rc6g1ugfrohtkobgmy31u0vckdbotzilz5s5vwu8whz1i0styypk598gjht5j2m4dk8vjql1cr8umqbwbip',
                errorCode: 'kwjxw2q7rmsyyi8ms5kupcdoa0t1zuy61vczci5y8gob1ckndv',
                errorLabel: 798375,
                node: 4931875455,
                protocol: 'zl6n9g0fsbebr99bfpoe',
                qualityOfService: '838nhn0lsx24ml4xyi87',
                receiverParty: 'wdkkdk7korbrxf9it10f9rv0m240b4wt357l2bwa2xlvpye2tmpyi7nu6g57w4vsclge9tua1lil59py0uw9f04vmfzrs8vgzryxu0v03scxp33c4zijehe75ro43o1jjxxy1v011ko4unts7bdlxxaupso33io4',
                receiverComponent: 'wquvh4wd4v5x137gmmp4oxqavzdahshyhki3569bf9y80ia1orqh58n9gw8prvcr0tdeosbe2znro30l0mpogttjh93spf4ayfzp8s4yv6j4a6ecflt2lp0u17f7xvivdqi0v7ol531gwx0vy46vdqien6imgy5o',
                receiverInterface: 'tzmmt0oyjswg17qsvtoho5vlqkc6027dsvhoaqqj0xc9quqh1am4ntuzjx6cx4ynyyc6r4ugfsvpeku6ujwxg27ejrmbwztjewvsk4nfguhg2278w9ioz4qcy9akjwj7qa8kuuob3wu5dpsikw8dbv4bowvw9t7w',
                receiverInterfaceNamespace: 'g276gsjl9rbp452jdgjhfmoshbf31rmz7t1gt1ogwd130nrx5fcn7g7a21qh8gbo6ppchqzh78eaxku5wfgagapobayo0aom835a6d3km8vy1b9ahg3qwshsl1pu29tybjc5lu2c3tsd63msugmz1cuynsitqp7l',
                retries: 3279640461,
                size: 1045106366,
                timesFailed: 8693115766,
                numberMax: 9484183490,
                numberDays: 8500621552,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '2oz4brjlj7oerniok102u7kijgmg5uji8gfeprbio83clv8e6o',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '07tyy8sjty8fu6fg24z2',
                scenario: 'yhek8mn6ejtex9sg881dbfzpda3lbwatri8i45j654l5uhgn1ndwtyr04v07',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 05:28:06',
                executionMonitoringStartAt: '2020-11-05 19:31:04',
                executionMonitoringEndAt: '2020-11-06 10:43:06',
                flowHash: 'tf7mlv0nd2tjmtqnxh8brlwi381ocy22zkxf3awt1',
                flowParty: 'tus71oehukzd7w29hb4dxdb4i759szg6h04vaohcxa88frh0gpbfb9285dkph45oj5u3ar5elm29c7o19jh5edh4oupug383i0w50auogpkqnpa2biv5aev2n6pcrgsnovfmqvgunvhzpmebt2q0hlfhxevruv7g',
                flowReceiverParty: 'u81m3l0z394mbhbtm3a4y7gvpcxnn2o682xid8j01wwqu3sjqgfn2okc9cmm3kic04lgo6fsrc0rd4diy83ofszb0pnuhkez4pu4g2vko45pdmxqg3ntikekqbtaghn34g43mqfvi9oumxym6qrjfrtb89qst74y',
                flowComponent: 'bwwypj1w04cz61va060e93b55zjgbu54s1lls5fn7ohuru7exeia3ijh6ckxkfdxdf6gw0jcvbxdnpbgwm5pv9avqakx091l18sasjwi9bc9iw8j6qk39z5o0e7rteittco0v0uvzv6y0qufc2oxt2wg0iwkt09x',
                flowReceiverComponent: '4mymo423uavifill4vj535hb611uauarxw71sh2cm9rk9nubbgyqd3a5xqekxhz96tqb4hy2ouks16c9zc4upli800ay0tl5u8qeql331t8tc1fvaibyexx2oyrr3tc2hyrljplddj4rchw2nr4fxi1r09rm4qz7',
                flowInterfaceName: '6y8ebw7is1eqyi5dvkecj276dngbgkoch8e1alkccw40oehjmxfcd98qqubdfokxog9b77xv2moutsp7yyj9habdglfl5h9s80bki8segsujcrdjikzhpbdq3mqp1o651mcp1vfos31kkcjv4rm222sh55ez39r7',
                flowInterfaceNamespace: 'a1oygww7xsi9z5kgi4c13shtpwe25hv7vzzpy2cyes20fma005h3yiq4b4stoyfljhd1qcr0a54baaasvqxdzcmbw2u9iu6xtir7pua3qk772vzzyxjhg4t75nmuu2phv8id1x5v8en8s67vmbs4rj2l3ek60j5a',
                status: 'SUCCESS',
                refMessageId: '73mdruqowxlzizrw1kt01uxbbplsp5rgbrm2rf2glht72vj1f6aegu0ywn5cny2k6u3iajqp5njk2j8drg8rksl417h86mogdjxew9dog1q7r5o4imyve144enxdfw1xy3yx0rxtvidqlqc6c4xrfgoo851snmjd',
                detail: 'In et at quis exercitationem deserunt eum blanditiis. Ad blanditiis iure ducimus molestiae voluptas sed omnis quidem eos. Sunt nobis enim nesciunt iste. Animi et iusto.',
                example: 'mubrizr89asbfppjxrzjwno3lp3ytlujkyzmga33lqh5vffa7x8qyb9c44vqo9olmra1x2d0lca5udvqscx2ns0bsrm95ngid9wp0naywq3c9vmmdh6fltismaw3kq6jzoq626vh6imln1h43s3f35rb1wy5kmsn',
                startTimeAt: '2020-11-05 12:18:24',
                direction: 'INBOUND',
                errorCategory: 'wcijatpc0p7zvyrdxfcziup0e31z1w2xk7qa7udar1r8ybo1omdeun2grbkjz8kbb3qyw51hj3e4jlasgjroeiu1vwlt9isirlljm68je8anmsp4hpwao41nenopdq3uo72jc3l1w2vpadcil2jsynhnheyag5ph',
                errorCode: 'wz2doqtaspiuwlin2bjtgv52945h4d6gx7qi6s14pfqq6hhznt',
                errorLabel: 708684,
                node: 2719107159,
                protocol: 'c08mg93ggpevxl12prj4',
                qualityOfService: 'nnix3tvqjxwceb775ine',
                receiverParty: 'o82tvzib17wm9b3cktcfvkl299pq6r96j5ss5m67kai6dwmzil7wfgw1lfu81djee428m9v4vd5fej5kaugu2korig3aocn5h7dr24l9o5k4idnj1ez505bdllzv53dga9ity5kdjzwkf0exr0lotov4dj0sy6je',
                receiverComponent: 'odlupgk4t2w5xo3qkwhs9qc6szwo6f3rshqgqox21axc9g8rr115wzq7io5zntb28dvkleim8lznkn5hfwd3qr5p4fscvppf2zy79zhvjogfp87kw5an6636are0vm9hpmnjijh7pgi9x8b0zni39arxp9wnj0tf',
                receiverInterface: '4wudr6euzrisvw8vlx5vdbvhv1suw3r7l5wyid34k3biu19fzqjzue332jerge6ty9fofkslm7k11mtrytgzb3s559vu26gmbjkhvnrk8ynuqx63b0qk89ivzr9ghuntj51sslwqprbwqm3a2zphk0qbybagjxj8',
                receiverInterfaceNamespace: 'mayok37jtfxiucuzn969p0496fzhtpzwz07cjh00mwrx24rofho6lwau81s8kgkofp4d9tqsn23zdxd099xbwzuqks175ud4x891da5824zy6fvq8wz78z7mmrhqd1i0dr0clhejq2avv4qwmm3319kq9h64kqbf',
                retries: 9359129540,
                size: 3519623807,
                timesFailed: 5311500589,
                numberMax: 8376524248,
                numberDays: 8489322477,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'lbaif67ibmvbnwhed2qb6k2obiz2nyt2y63auwc23cezp5ja0s4',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'lylunem5bb8nalb0jw7m',
                scenario: 'lfmkxabt6o2robnw9sc4hlsus9bd8qoopd12j1c0si121qrsrtyhghlbuj4y',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:52:41',
                executionMonitoringStartAt: '2020-11-05 17:24:15',
                executionMonitoringEndAt: '2020-11-05 20:21:26',
                flowHash: 's852x61g5lo9lw1ejqzvbczy6l3d3p22gnahs3c8',
                flowParty: 'n89f4a1b0yxuvnpmdksdwrafc2haud3gsghxcn6fp6bazkpmmi1zz09q7r57q2fksqxh3ht90rx08aptlflpd9hx1yvvk49awbvfa4kzqu2nhbizzfobkn8h06ejv8x4ny9hingko61akng4f33qokgehiweesou',
                flowReceiverParty: 'pnfbuf1y6f3qn1ucy020neqdbvpdl71zlp6zty9udqex0odavrzo1kqf9s3n05jm98c0gz47aohoy1vwbf9ciu2z6k0pv8q3z1ha72my3h0grz7t8qf8aktyp1aj09kvcdrd2b4yrznluf0iano0g6z2hnp4884v',
                flowComponent: '58pr0ikpyijfs8bo3cx44n8puyglneifs4wij2omw70ie0he9dabba7uqw50g9ughqrj1s9bbt1kstw5zjx9bnykm7fxk30w5484kahjkqgxpe96qx56isujn5601cvpmsl14g0kl8d7r3035auc4w9xh4dxolzf',
                flowReceiverComponent: 'q2qlknoq3pyqjnvi4d49jgec8kesu8vc23jfbkr9acwb8b0f8z3ifsyeyakhyz602lovtn5eoh5s3dmfdgypfq5v36dm4wjuowpntsyu0xeyhjbs1f5zhxu57rt2qopmi607e0qwmh9zfqi4d7pmm2fq6ybpd7j6',
                flowInterfaceName: 'vdxp95a5zbodoz7utji29zo4fzcqgdjri3vfe13firlcdca9gc94e6dzz2wq9szvdtsf3w7n2im0a39ayb16cct9rw4x76629zed3lycaqlnpu0cymgtjzztma60edbppyvhtje6csts8ljrnt9w1wbeuyalfkdu',
                flowInterfaceNamespace: 'uuclnsvhtw5bsiubub4s5kzy3q48ncmlobe4u4nc09mlk2maxs13c4wyx6h2fwo1dj53c591wt1dle970hpe55xxpqpxc0m4x6rj7i5122avgaogw6m9fvoovrqkeqdzbjofzbo4lex3r04usgypjgcyyorz9e6o',
                status: 'WAITING',
                refMessageId: 's9tegvo3ewlw25pk827u1k37jdjb0xuub7f1h3b1ko15ibs00s2szagv6o6ze65fjskmmjn6vhbsomrkqu5ikz5yio8d2396sz5bbt8tm9b21b1gxx8lj9275dmup3uvk4h5ovo8cxc02cpgf39qrvoyj5109qdt',
                detail: 'Porro dolorum magnam quidem in soluta vitae quia perspiciatis a. Iure blanditiis eveniet odit. Ut ipsum minima corrupti id voluptas quis qui velit. Libero sequi nesciunt nobis explicabo soluta ducimus est delectus. Assumenda ut qui. Voluptas ipsam natus sit accusamus nesciunt aut quibusdam alias deleniti.',
                example: 'v2bb53l8uzpia0f001v8h7237kb84zrcb4dq4dukn6p60a2j1dh3xz18ax4svpc7gkgrbi99vadrru9uia7dphl55e0zjfqxfk1ucboav86mb3q0vti9w4uj48e969mpqb60lq5rmpu5rc0in8tzpg3mru4tgxa5',
                startTimeAt: '2020-11-06 01:39:21',
                direction: 'OUTBOUND',
                errorCategory: 'a6jvtissca3uj10pldip9bn4905x7vg1rpmnj2jngpnaa3pldzuhch2muo9dor28mllyawcj8fk27tnvasknyfugdraewlc19eih5fmreqsb6z5ty8atsqqtidipzjr6tm103lsk1342w8dlcpp197g99cozpuc3',
                errorCode: '13aul1tv9v8gipa7hjrdclhaowyx66i0nx5xhcm2zouow9s4ze',
                errorLabel: 949318,
                node: 2454420003,
                protocol: 'wbfbghmi0v907b4255s0',
                qualityOfService: 'd64h6ondqhn49e8445f5',
                receiverParty: 'c4vuxyx0ga4wz7md1uzwuquv11f5cujcfso941wej9mmothu9vmoe5exmowmdaocon35s8h8zwb0tcljex6r47txbrfroepzgb7hzb6u8rb5gyq8ep3rrph1bgqedy4yl6ff9ptzu62vybjdryaou64693ppgrn8',
                receiverComponent: '6veqz8hpd4qv9fpq8hz195pdp4ruj12em98cd8goy3t6kti0bcrek3jwv1raf9bxfcxs8mfqus7n5vfjunzvsjr3gxuoswqo0pvu9bht8e71e32g9efvd5bg4zaiyr8cw8uu2im56a4nmq62sa8anmre4olgu1ao',
                receiverInterface: 'za2itqxqauadraw0cy9wovbkmbzwrwhhzrhkrhpa81vm04ioiwh2qlk92gzct9enp0l2u3ndfos1wcplnfafc939w9axl05fdtteliac1jqnmf9pu19booo78fldcd60hsga3dhjksxldyjw7fn27elp6u0ht3f8',
                receiverInterfaceNamespace: 'xhn0utbd9h6tskk67at8bmpk1vnjbzi5iloijv53xb4lpzsa95xywu389uss6vkd13u1pugwxphiz29pu33qmxs6169rk7c161di34f0ozcqttfcxu8vfu3gy3okxpn0fo8dg0km6r1oxfhwxp0ytk7zzms37pcu',
                retries: 6738644642,
                size: 3196736375,
                timesFailed: 4422389252,
                numberMax: 2229940345,
                numberDays: 8978190621,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'rmzwspwdtknwp5m5ctgd5qc3x6l98fd0rtbugw7pswfc79wwj5',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'god2vs839ixos3t7ce0tj',
                scenario: '1x63c7gqzkfa9ma902qutp0908bsx4471fqx5mndk3bn8r3g982vvbwyav6c',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 14:08:57',
                executionMonitoringStartAt: '2020-11-05 23:25:05',
                executionMonitoringEndAt: '2020-11-06 03:57:59',
                flowHash: 'eovebualjav2j0y3y149qru3s4momi2szdr8izjb',
                flowParty: 'badsqcs1me60ltonrhjdyhyo8gcct4uod60iyny9i9k2v8equnn4g71r8aa3w9lbynypn0928ok1sh0uy7u5d6a501uag97cnjd0yb5zz4tvgw93xa0g5kq2zzbg9bogovlcc05f99q5ebvb2vicickiciyrz06e',
                flowReceiverParty: '96n55k45k0wxjbz746wdnkaswa6nz656u7ap0qk9esznddgt5kpek00ffu60vcyhnowmivytz1b07ko6rjtzvtrfx269fwvwirbx93te6mi50og1msp1y76k0lt3htglcw4f0cwvrynjtbg4pykomgzuv6mxqh4i',
                flowComponent: '0c837nw9yy0pvzdf8vuzvaa5m0qwg9gkqkvvx9qdwoedepbfopwpw0nie9wb3eqth2rdp1glh49stxqmgudo05x4bfl7ko65ncygaitk2qe66e2j18npk21gz2tzinvzcpmbiqbmb5t0fjh5cycywji0lslgkhfx',
                flowReceiverComponent: 'pydzwufknb4wvgeasg4xdl7k6tuxa9jnqo0p4syxgzty5om2cweffkrf4p4uc82ku7uryc2n5dpef0pmvym76pehox4ujm5n4y0dytl9bzxvckjppu85bctogd86szmnj3tcklmjlzgd7yu0w3ifu2f894ju8bbk',
                flowInterfaceName: 'xzbfg1s62u3q5ff3v12mmp2l7x002ny2rx4rkffow8l0aae844nscifnu7qku7n0htnixytlnuf7pt3pf6526wwar2my2srvne39otlt3gtazy6qjlj2ml7qcs2ce07qjbqs3zntfo80fcshisexi97efor6cw9s',
                flowInterfaceNamespace: 'dwnmzqc835ftwfmx4zeofgisaw5jwwrvzdgsktejapjmg31wtbnalahnkgcv9d4v1kq0h67f0iay22grixmbvv3hzjdv7pqgm7gjpoq6dtkfza2mu3erl64v3pdahjanw4h9pog0x070esue6zxkwzpit66zmz3k',
                status: 'WAITING',
                refMessageId: '0vhkpg36wbddppitw727w3jmibcyp4xu2rsr59f92zrdsc9lmxb1dqzwqphecghwhr6ybx6ukrbofelhp3g8u350otqzngig4c74l9pl4ggfs9nrvz5j1dd77dsoj08bhb3zywoiziy35ml30xlmw8r51wjmms2j',
                detail: 'Velit dicta porro est quas aut excepturi est quo. Aut ex voluptatem alias blanditiis et voluptatem accusamus. Quos libero repudiandae distinctio quis architecto.',
                example: 'k0rzsns674tzso56d464s92qgyj1lqyn8uqb89yxis2y78lq2vxstmf7h0aaouh985dvatmcyjflqe449yfqwj9v1u1jhyumaawzv7v4mejinvdn36uawi8soy4gcp6z6t2m0bnbo852mq94nksa3y91aa7pdukf',
                startTimeAt: '2020-11-06 05:17:55',
                direction: 'INBOUND',
                errorCategory: 'umh562b547a8ofpz7jdwluhy110tzc15dr1hzd8w11p0sa82fmykzvb95mmh1dtax3lbhtxgm0ey2ot4hjrz2cjx0fjgs65m4fhdawac1tnmhmjnrpvjecz2of9wdp8dm0mtvrodprejdwq5cw0st7aaaxdc0r7t',
                errorCode: 'ish89r3m9mrihrs61gytc0jfcgkrq2nlxl0hkyx1jo9vgvx6nh',
                errorLabel: 650209,
                node: 7998144711,
                protocol: 'u69mz5lqcd556el87h4c',
                qualityOfService: 'p3vd9kzdeg80lz9zfvsm',
                receiverParty: 'kfciqfrxw52xgrf4mr8jwihkzcr3bos3mj50d1uzcxlmgzkeojcz0zts3tzzms9podj5s7gp97onnyif4o5cpwrjixxf28f14yzbkqyng5arxyy6916ozxsqughjt2piqgpzhdnkfbysx4u0vonzjq5t0f4xxeqq',
                receiverComponent: '6d1j7n9rei4t7a1y4tjhs5s6bub6xyh52213u2div7igyp0tr2pxz5f10x9pyyi91zalbfv1w6iazlunev2d6q5axumyfpbo7nnpp9vauo3deputgtjstn9kh8ch7mn4jy7clerrt42gr7lvmw4h7qigchkvu4z1',
                receiverInterface: 'z7h3uei9070c9v3ju3nx7dtf3icjsrax74egk18f74n19goh7tmuptidklz8pyxx4jhtzftg5gurjvcx4j2zpfdg30vbl7c1k71sjpu0pw0x9i54hr2jtzakmsr6nn98jymbp482zsesmf58srkdh8o8hcji5ed2',
                receiverInterfaceNamespace: 'baffqhb3o3d4t1p6gddzuxemvv9tfutp7q85n0io3a53dkqx94svc7ryzpxyy45ecj9wnenknf8qp2tyfnmh9wdal5o4uf1ugkyjysukpr3k2s03fp5c6domby4amqye3ow15t0jh08smecyyedfs99pw3km8oal',
                retries: 2119071531,
                size: 1969648345,
                timesFailed: 8969455494,
                numberMax: 9798055424,
                numberDays: 3374508525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '3lxxlr2wx99aquh9jfztszs15q42wzquh3st7zyr4jljhpksum',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'md4xb08043uo9yu5woqz',
                scenario: 'tnuboe4aq3j7iwsx0dkxzjf8e2tcenv75arcb87g6foieje59ilkn4qyg30gl',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 02:26:26',
                executionMonitoringStartAt: '2020-11-05 19:01:08',
                executionMonitoringEndAt: '2020-11-05 17:54:46',
                flowHash: '6r7c1e8px4v7bxf9hrp13cyrfbtzcwprd1wob3cg',
                flowParty: 'bt7ag764u3t92b7agx8bqr1czg7hf1labdnl3uogn7mhaq93ikmfs04m71yvs2n25ohl9qyjwq5z0szgg60o4yxpebg25ld33pmvif340hst7gcwvs730swqowx8r97vrrsgxr2nbu46fzjvi8s4j4g9nxyk4plm',
                flowReceiverParty: '6uompt1f9lvjyt2xzx9q4u0y3yeeqb0rdmz7eojgu7doyoqbo8oaw723ffowzu62rozlaq1c3tnx7dpbj7zsc2vqkqfi16q5j6nj19tgdq9lfg69l53ou3gpfi47qcj4gfjnkpdmdr8yj13hjttig77hfxto8i94',
                flowComponent: '52e6nomze2smu3wrc99minkrdo3knjjkue2rllcjbnycij81eco6azo92pn05zrorfz3irrib021v8hyos1z70q094wsjflybk6o5u4m1aq4u2bzdx9efkx9ktl8fz52sqs36egln1zpfb2j5mbf2v6qln111jvv',
                flowReceiverComponent: 'ez1wfelvn4dz123nxwwz3cuwwsy1ugg49h0iutk8mmun0g59kph5s58d6p6gx6krw4ew3c1chddnzbv1qmm56ghah7u9lm2mzjsnnd8y3wcoxchb26tzdfux1sbyi19nucg3p3ofdtp3ibvd9qatlmxr7gyx5jms',
                flowInterfaceName: '8spvlyy512sxgj1959rrp1e4zuhewopyshvs8n7udvt8m9ao84db5851ccsihcpzumekf97ixtgqeh4axqgy3fm63c7r7jsgyuji1v0f4034v80ivhwjivotjmiiyb5uw6ugbqin5exm1arugl2zilkb68cu7kz6',
                flowInterfaceNamespace: '9fp4e2nt8g0djy7fmf808it84zxjb2lu4iqd6ocsxlrf6a3mrgg5bxv0xjpr9smm7452ebgc7l1edu6de9pdtuowh1jom24rvscylhpwtal09q2a8nut978qjzdhxnan9lu5fupw3g77nl625qkzo72jzzcmmtw5',
                status: 'DELIVERING',
                refMessageId: 'xcvky0u0alwg6jcix4jqfqot35g8jcxg9sl8owkow56mqcwma2b115m2sh49evbj90e46fq43cwmxlrpfdbn8h08ggyxbk7uqevfdknw2n69mi7myehyw5rvbjrnfw5j728gfdidtcsc0uu944lt8tgo9kuwz4xt',
                detail: 'Similique fugiat nihil deleniti dignissimos illo. Ut similique sint veniam consequatur et natus sit quaerat totam. Voluptatem delectus atque molestiae. Placeat consequatur quasi in nesciunt at laudantium ipsam. Ullam qui vero et velit.',
                example: 't2uj8jhyhlhj1kj1ujgweos3e7tulsda1gwa88isv8f2vja5vqxfjbrfpierjkx5y0g3f9z8vnfe02o6gbn0j5a6buvtm5i58g6yqf458kf0o73fma4ceqmlloce6mfyoyzjk9zasq3e3the5i8lwy65pdm29cpz',
                startTimeAt: '2020-11-06 07:43:35',
                direction: 'OUTBOUND',
                errorCategory: 'qmeb8trfi3pqauz4obez2yo9gz64u5inc5gxhvc3pukeresyi22uwy13mffpwgp463hsor8s2c5iehi643bezs5seriqlgt9b2wm1ismkmzj18m47usy6o9up62o5d8rz4ijwiwq9i1o5hwpdnmub9r5mpzw32gs',
                errorCode: 'wf0b0ntc5gkv254tzl51t2qslzmj3vxvjhpywodjcomncsxxm0',
                errorLabel: 718107,
                node: 8214882453,
                protocol: '9ekw5z8msyoog91m7qiz',
                qualityOfService: '57mhjld8wank8bxi0i1p',
                receiverParty: 'cdgxix6ccg45zyztrdu2ea7n18n6w9548d3h4ecqpfo96tk2rz9sdyy8w5zsav43l1rledva2th7wy3fxrn0uf555zfww09xz10pcuiy9hcxvsh3qgtbhrpkbueaf4uusc6k30t0vole92kotgb1mgdbizuqho3n',
                receiverComponent: 'i039n0au997g2k2yit69r5d00rocfr9l7uou3vy3smr5954n3x4zb79ptdo1tp6ft5o0iale9gw345enprvil7g2w490fnl7qlr44y07idol6spgp7d6sff7ac622kxc8zxb24voydxm70iu6w1b7gn2j3rhb4pd',
                receiverInterface: 'h9ku9j3aewph0rzdq25dk06tt3qqsyh439y432jfeefbnqsmabnfuic9pysop5wlid66bd53l1nlmczl51w6z0izbx91lp5c1f35tflhdwjw9v6hq1l6e1kkh7hnvtm8jxe7cq1pm3ged7w28ox2c4qrwvexfjq4',
                receiverInterfaceNamespace: 'gx8bvn4srvtlmw8rcf88sv59t3s5jscjxkuoziolikksdhgfnkv5p8xuzmy737n20058po9buecmgpapdkh26o02hdj8blk4hlli5ta21rwnov71358fe34v0bbyfpd06a8hn3xx5lkvixgz6h5kf7fp1n951tua',
                retries: 6420235841,
                size: 7464211571,
                timesFailed: 6639370796,
                numberMax: 1420424579,
                numberDays: 2439495689,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'o0zbtkjy2e7x2yz5dv8hr0358y1c6lu8s3hqjtpdy3mkt58h0z',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ki89uh3qvr84d3wksc7u',
                scenario: 'y1bqrrlf3q3vkw2hwfwaw89k1czs4vkyk2n4q3yp1tn3cwh75k8ezzcsbhjz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:13:09',
                executionMonitoringStartAt: '2020-11-06 08:47:35',
                executionMonitoringEndAt: '2020-11-05 20:46:40',
                flowHash: 'tdgvi4ewn0ws6r2h3hpllmxarsjfs9inmn7zw1jk',
                flowParty: 'xgonu0do2d6uakkvmnxevhwnx25j7rywy6xb09yvkvr3qk1itmr72n225gk8yk43ldkyaqa6i4gr5jsn78nlo2s1jzi82zsp45coysqqman49ja6yai0agi8gvkbrzrv76t732qz2xswrzo0b485t4jcibaak54ar',
                flowReceiverParty: 'ylwbqz7og8azvxa5cv6xlek7n7ljwoxpdop66xu48hiydbx2t3gury4fq3w5nl3f8gt77xg8940hwebs9nijyyji1s9jakh2kftli8gxazpc50biymotq6ir84cpx5zg3gqs8lw2dn0mcxv76519dd0y81xfs5um',
                flowComponent: '6o8h0p4vsjmms7ofiwqv36j5kpwcvv4yh569i3hejhpve7d7dnlbimjmxlpalgo4o9t5ktp80gntqtkyq4wiupqkifs2bq6zdjfpsoqzq6qy9y98huhkxrrvevets4eg2m4kiexvywvuvcso9urmxmtbjqkcxlqh',
                flowReceiverComponent: 'd2ujmoqwpjxafb9rbsvtun5lfw9ois03dl3r9x2rc8et3pwdw10m7nuap7ilxic5ay550ydemvin85r5hqhdvx0xx0o4qx9yahyqyx81299w3b7tt47pffracm6x79fjhe7w8mug4ftuwt8wchwirabypt2orjk2',
                flowInterfaceName: 'm7vq2s8tp1z1otb2249t4d7p5n7eah4otw2w140m349t8u2yzxv4fsyzb1f7n1rjm4dzs1yo5ejw4rx9xisbftpox2q70igp2yidqifq6iklyrb3i0vohei8ckvyhb4uhpltmkfia3nfbgqcyhhydvipjft3wfmw',
                flowInterfaceNamespace: 'v27yjqz1bnl58vlfz4fkjlazeawy38wnjbg6tbwgvywzod1ysvxhz17dyg4nul9gk2rh7vluijfcca421jbyy2s0o0qnbsa5rmh6rvw92to18bnmpur0mffok37qnk6socp4ttsych085pq4comqhsok6uduqzjs',
                status: 'HOLDING',
                refMessageId: '9uzr4os3y4z6sodlzvjv4wmz6y9idgv2hh6hyva3mcohtjriu4772whs4c68ovxt0ciamohr37m9ko465wr4dndbzj6xbnc0xcx6gznvlkt1cszn32i2kno4v3qfm7dppoandzsa8lk796ou10i6v12yy0tepx6x',
                detail: 'Blanditiis saepe odit velit repudiandae fugit. In id voluptatem magni eius possimus. Magnam id voluptatem est deserunt voluptas numquam rem quos eius.',
                example: 'pcqnjkbexuaxstqexiwcn19tg61yos9n943bjrzojuft8chbbqz7vl1p0kiilwf5ckmlvemcqrocngax9urs5vo1xknrtz9d3eanh2d30dzcnugggj4c0n7uph1k7c7hltdgi8ezrueo1woqkmh010l2j1cvuovm',
                startTimeAt: '2020-11-06 00:37:31',
                direction: 'INBOUND',
                errorCategory: 'yyxd2ye8p6bfezmzejxfrd8zfcezisfvpxcda5g1zich48jmaoc1n1jbb5ykqttg9biqo4hwkhjokuji115conoxnnhgycvqcjzua6fm9osg8jxwun5ncvgq901vabql5qmlciddngelagpps1dnpyeb84mgbqv0',
                errorCode: 'ob8tvazw72v2evgj2mjtzgvysnq6cdmrjv92mqzgnv2s5mvria',
                errorLabel: 238884,
                node: 7343721512,
                protocol: 'csn9odl6c6msxsogzzsx',
                qualityOfService: 'm344hwst0w89kfycgkxq',
                receiverParty: '4167jints1pw6izrwan5thtpexvdbu2qd1camgakdw4cmbxrby1sikkaj3ommv7irlbbckfl3xnaxf1u80e7iy5tyex1loyvdnc9jthv532zaknuoud2438jt0d9pvjlnvv74ityv4hq8yx16iylnz012hb488ak',
                receiverComponent: 'eakayy2spjslp5lvr4qh3gxwtnxmoqqqsky2vho1urkq7eydirhepxkcfac3ecm51nmwo3z2o1cbi7q3qdxbmv5fmxhomyvz4k4qj7gs2tfu8rdxtifi8e7a5k73g3rpcpxhiza7kb1gr7v21ne9g105rbb3yydr',
                receiverInterface: 'ut1ey52ff2a6eszyvp7bb6fbd18vo1ei59975cztgcf7pvt2ng2o7jqhvdrhexxpczfs207eo7ljg0p5zwgsu9nuhmpt5v52yibse9uutgox6zt2oaexmvadexlqz8fgmzren4otpur5k9gqb7r6rd5ek2j7uoq9',
                receiverInterfaceNamespace: 'et0ylupu6hkj12kpbpakf1mwax7ci5fli1k12gffo7lnnvgcpdv4357fr9rwlvqctsmihgx2uhsapmq0vkb24n21ypnlhzpa2r541vkny68xounlpsi61qg2sw0kgxr3risrjsa13kx7c33oj60bp0nwaverx3jw',
                retries: 9265078455,
                size: 9220623782,
                timesFailed: 2712593886,
                numberMax: 4796005639,
                numberDays: 2048107800,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'fz2x3s5j24qgg5d083hckr03gnvw1f14eeam6chsn4wh2iqq1n',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '3rkr6idjuei0kji138ct',
                scenario: 'urhdmzswtxpm6zvn51edk5e37dpwu77t5uzfuv916v5g2knj6emba64d9j1z',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 09:00:32',
                executionMonitoringStartAt: '2020-11-06 00:40:26',
                executionMonitoringEndAt: '2020-11-06 02:25:41',
                flowHash: '52kizdi419b1cpi6ucj6bejczpzt0p80dhggzgup',
                flowParty: 'yyaq3gg4wphi4vh7d4d49kjhd564pl0x3ayiij96hurxfirdkgydcg2tbmvzh2r311g2y1vwywxx97py2az0rxo0pw45fdmaweqs7lyv51cg20mqisl67fh8nvrp0rnutopv50tmp6b5k6usn9m5ie6mz8qru62s',
                flowReceiverParty: 'l5voc6smm4mpk5f3jw923r3juxk2e0xo9fg04hoqlxq9xxr2nfdzy8f1wh5hgsavz1ep3phl346i4cb2zjq3uaegoyuznihzm4iq1pvig3uovmfqiwjcrana86831v0vvjx1v852zxa064puh3egxc0141fg1amn0',
                flowComponent: 'n49ej859lmmu7c576p1yr0rfa1agd2fpcer5eo0xzfz2qi9e3y1lmtil3tz7lx7q26nmdjfchl1479xsdu9dofrkfgcj54d4ch6aglyt6k4q4np1779jxiozaa6yw1w18ncd2q9bptqi56ts9gip0fyg2b4inq08',
                flowReceiverComponent: 'g5nbq1mbpffi7dw8a2atw8m11spmcamc361280btwvsdij0a021bmutnj9dvi03hu3nmmq2bhms1fz6rqqccf7tn60i39fjz7260qpuv0az4fszasuvr0bwobv8j8omwvq61nv6tjmm9sgknqbepzy7kcp2vnbzk',
                flowInterfaceName: '8jfdrhevs18e5tksipl493zghivzvuzal6mrt1s7frqzw49vr2uqztoczhr5t133i10a07kryl72fjcja4fyj85hykm995k5k0fcscjjl7dglh8sx3vghsm28wjqcr4wl8zgshdkn5el3so1wbh7tdqh8uhudgfg',
                flowInterfaceNamespace: 'd571350ww8hmv1zh3fo9vtzbno179s3mxn7oroc5kq179w6a025srk79bj4e4xjp403n2nnq7mr8t1361pj52hk6hc800k6mk5s6anmo53yohoq1ai0vfnp1xvc2e6wj20wkfnzjju4lh60v8mjkvoour0jxc3s7',
                status: 'SUCCESS',
                refMessageId: 'majar27hetildzz11agar86tlztyjkmy8ukif6dbdy3jjqwoukdozia8zcywpzb6l4r1576vjibypkka9be2fbqre8d4v0tacvdl9cit1kttf1xbxwib8u87s99fk5kpso27poz9052v7ikxu027k8uyko1qjht6',
                detail: 'Repellendus facere molestias nihil quibusdam eum similique molestiae. Ut animi debitis rerum exercitationem omnis cupiditate voluptas dolor. Qui quis optio.',
                example: 'kt51nmn6fltagck9mcuzqa3apd7g7u8vknh8hygdssqnedtns3brv5gqsvyfi7f4yjrpldt9n0blky9j5kqosm46qpwwtawgghtvttoyieea9sjqdapxxubiiu4f5ucwmdzzpsro2h6fldi50dfk2ng7htap0lo8',
                startTimeAt: '2020-11-06 07:05:11',
                direction: 'INBOUND',
                errorCategory: 'sfjm6sgsjd923fe1xt6thviuw836i6rqr0q34yhgoddln0kmpe337jsfa7le8qf8lj00zppoupz598lpj0kqbwnhpubz54v2atmkxm11v1qp65t7cfsrg03s90oki9dcf6i6kygryxjrpdxn0r4pct5wsl9hbasu',
                errorCode: '25qvep6jbgw8bc6oyoxo9cbyw1pj41v7qv5fmp5ih3dy91gjfd',
                errorLabel: 103501,
                node: 4400693688,
                protocol: '3x8dy5b68in8ybtssgu9',
                qualityOfService: 'ectni032mku9dsojburv',
                receiverParty: '4kg29ndew0qxrpzy3tlcwczos5x4fqag1qy4x66z03dwhujko4vbm65q0g5daufjs2bnuf32hk7jdt77dn9uruqf50oh90v8q6e5qvlf76239eamq14j4qxx24mgalegoay4ygo2ey6cqa1qaejnfgzhyvvesz7h',
                receiverComponent: '1nm0zspyyv6eexmq6ryfii1axfjyqkmv6vp7rz4c2y2wkn18w6tknl877l2n1cxqk15qbk7u2i4swngxgzuip8lw1n13gxsvw8rkpadjf7swn9emogxzlmx7in4og6awhwuk3sxfp4u65ddgq2z706ip6uvtt9yc',
                receiverInterface: 'ma4p2k4c5xqxdzxua6kvxq4rtohm6tehix1c7kha90og8kp06f75aji2v47cd8hv25v3kpz97bc2yjje0ho5mle47h0prkrkudclj565v908lgu1ur4tetfo5hltco2frfgafyobvmqvai6gqgtywsh4ct5ycdpu',
                receiverInterfaceNamespace: 'a16gbv9r1qnofhphbkmgxq61ijkeu7s0oyjq6wt61edalzk0j1fhnfuclcan288digxr3sqaatpc06vqxyhfn8pw9nxwswvlyhlqgevqtgmj3ok81n1f1uy0zx92c0186bo4p51hz0nn8s5bv790h3mbcj6dwxla',
                retries: 2254657195,
                size: 9843089400,
                timesFailed: 1191877577,
                numberMax: 7157292232,
                numberDays: 8711865302,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'houc2dh5k0r3kf5njbswzz79cjpbk5is4khbhngk1adthj5odp',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '3l3euzfagoljgoqs4nq4',
                scenario: 'pxsxdj2k7jykria7yk4okswahici8jghoyl6pb52iprrn602xf7da5541t58',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 15:56:13',
                executionMonitoringStartAt: '2020-11-06 05:46:49',
                executionMonitoringEndAt: '2020-11-06 05:16:18',
                flowHash: 'yjvcfve5qdxuglnkp0i8dj5q2y4of0rxl5rz93k2',
                flowParty: 'xhl2ayt31idh5jmznjhxwokmzn901o97zr8runtkni990maqxgwwuox4sujgvodefalogqweq8pie63qtw06jmsdfgn085yj03zxslektbp0tyzrfgsvtelhjjx4eec3s6zl4jh7q6bv5o25sffesn7pjxu5zapc',
                flowReceiverParty: '0pqylajs3vhgx19930wdssbo2jyaf13txmkuqlq6ff446gn1ycp2e8dawzp7ffzrvd2ejqci2ugvlzlqrzntb1ah6bj4w27aqdrc7dq07mymbjaqn7hmhw0l4wckf6trxtcib7m67vqe7oy55rlrf3u7fqzppy7n',
                flowComponent: '4pd9ejx0dvls8nbrq202a9zmnfbn8ury708p53n6kul4qmb2l66juu7d1mt3m2j0qsxdvmeh2gzd4ffgzaal2xyirw620qtvn01rxrbbidatrraxxnofwndqsksbfk876q6laxjon33hbzn1zrp6g3k8salwu7z77',
                flowReceiverComponent: '1080qm8bfwj4ex53y1ksrlvviszllc3ldn9nwie9ma54g9e5g65rraqwnrbpwy32qwcph6l5uoy3nhq9jp8yn8fnh0tcbjova6339yr3hsdx6kg0r5jcjjgozt4rgj2bykwg7ktx61a87c0c733yyzpia27en3yt',
                flowInterfaceName: 'zgw3wymav5hwuysicflrbzpxs86ol554i4cyg112mpusosah97oj2kp2i21rcaw0gkwqtlj54bzrni0lg3bn8i76an8p9lfav5wp7awaaxh7ndpkemitc8s4j6v43xtzb771s4imql2ynvv6g9pybex6tol1105q',
                flowInterfaceNamespace: 'j4fb4ig63g2i7a4lwg6gvyjeighp37euhvqkdzc376n9878zhva82em7hxgtdo83eqvgn5yt4tmhrjza5uon4lhedxp3at0qj3z86swvbchdr5eelakd25q2haribne0x9wxu7f9448dweetf9quc0jjklqjl8yk',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'iurl7qj38ublyde43owxfw9a40jmh2xu6bx38egclqh1tahmb1opwby56zbj9lmoa6g6xr1rfezk9obvahbmlhhmexphbqc3109uo1lrmd61c1f02jmeruamesihti9vtc10tqw6h57g251sdmsi2gpyuga1o34q',
                detail: 'Consequatur aut et minus dolorem et beatae laudantium corporis. Corporis quia reprehenderit est repellat blanditiis eveniet. Nisi ut dolores qui sit laudantium sed rem magni doloribus. Asperiores qui harum optio corporis omnis laudantium qui enim. Quam sunt amet id. Voluptatem dolore voluptates.',
                example: '5xdb29a8pgbz3r3uwagd1ckas9ilo92axmimarhgc7xac3jcif7j2t6v9dxixz81n89zp1yte2irds1iooi21aovmzu7v89bv9f3hurtbybt6wxvaxq0jpxflkqfs3im8vibfrvrdh3sgsaltllcfyz455rgsuvg',
                startTimeAt: '2020-11-06 01:59:20',
                direction: 'OUTBOUND',
                errorCategory: 'xz58hs7hbrgg6vr5t5avnrx582s1b2avl4at2pjtxnxnglt8bf3pli2mc0yf2rlfjfp5j6v72mgjt8b5i0ii2c5dityubyjqd8gri1dzczhknhuj817pjkix7eidfdw51gnjxqkjkzpjfmoxv0guvqhebvo1lgkl',
                errorCode: 'xpyh1xy2ipad4u2rpg0w36kxy254twkyfe2kcj5mmarwg4v4a5',
                errorLabel: 335561,
                node: 1800932402,
                protocol: '99jyageybqcgvn9ywzh2',
                qualityOfService: 'fn7vn39it24aeemwg0f8',
                receiverParty: '5ebkbd14x1l2lro34z8aqjd8py2q4n146qcg3oj0aa3j8y6ec4235gfdo14h26auwc4lgww1wu7zzm8i4nhexfhheuftc69d9cybag03pi5ws5vvwi3kgqn5rjbbe9wrhrp0dvy82kf651sdkwy9mzxo0a5asvgp',
                receiverComponent: '3isf7k37kx9hkei10d7kiui0de2okqvzeos4jyyajtapb4igo74t72f5ghwxqbi0q77ptgk8lyu4bk2ipa93vvwf6fnmhqlu9kkmmg0bytm6y2nqnz9vjskjqf0018bbvs22ma6fsmf1ir85bq03giecr3vfgl7r',
                receiverInterface: 'dolct519cb1cc6vnyy6vm8sk52n8rakj0ex67e7lvm6lsesm32pi73jbshzplwaz6e4itjndwrosznz7ot0fai88ys3jt33pjkrgqihefk25qjm8xh80t9w3xp3yeegjetty1zb0o7l3nqibhewz10fotngerzrf',
                receiverInterfaceNamespace: 'z61wblwtl46punm555va5cl6a2sjve1fm7qnyg1g1j3j49vwb7euwdqdai4jfwxmsadxf99vm2iamd8adkhv6ge7807fvufn4fo1hifz48jg18ovrjtpvxxxoew6u291vj8ttigjfohyexv1irfbwyiaz70obdq8',
                retries: 3318297709,
                size: 2698875145,
                timesFailed: 2611756950,
                numberMax: 9073904004,
                numberDays: 3587921329,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '7eqpwok9j76dtpe5w1foek7m3p4489huerhx5fd96rhik7u7aw',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '908q431pp0694ws5yiv0',
                scenario: 'w8ok551lotih77p87lmgai0swg9a9u8gs2jwn81qdkr2hw1vhsslzln33isz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:45:02',
                executionMonitoringStartAt: '2020-11-05 23:47:27',
                executionMonitoringEndAt: '2020-11-06 09:26:22',
                flowHash: '2kupdjbmlejd9wmtcfdmbr4xilsh5hhtqp44h26z',
                flowParty: 'twphln7nfvgekus6ewi56dhhnxxek4g5bqez9k0bcac7wcoxrytd6r8m6u0k8b712w3rwkzsqaxojk8ems4868azj3eerepvts2a61bxdlx4v099wyq182o6dnfsvfxblhkvw6b6p1tcuf44jobam3voa2hewvfr',
                flowReceiverParty: '48czrno4uqke6x9trhpjy3ycdxmlalxo9c7vqapywpdgg510up0neeyg0l0v5huiq5ziyyn6i2ooqvvr4rrnlaxedrvf33g38q9fm9i4qfbxm9cw1c5g1sk62d1ldn4zy0b7dbnkzpz06qalxqj8p3vq8qcmtzvc',
                flowComponent: 'lhuclcv4309e96evuu19hjbgc8u6rkpkegsqiqt7bsn563ec66v7i6hbcjwid4yxyzmyhwc6xadsdh2nqcg4lvz1rz7j8p8vf76hqopd3zcwihrccpkstnryk6z151uc6fu20p9ne3949f2wlld2lbeji0hjlqc2',
                flowReceiverComponent: 'k8w10uy0hvshmt4r1c6gk9njky5drxrx3y5zeknysnvupm9lklmeby32v1xiamp7o33v82rgbf66jv5w1m5cc3wyaox2rozd82d71irzfynzub08q31273ebyocq5hyiq956a8ad8wly68lnxolhyivpquggk2f5m',
                flowInterfaceName: 'wesfodtblc8injtmmn8la71cxyd8y7ya3yl5f219k19094sv6rjczkacikm7ud2r19vf6d6b04zhhc08d0i5dysapjl92fr4u0pke8fpget8r48qmfigvtz3u0uxsfvnrms0qkdk3rcx5wcjqi46vkkkxg2bho0g',
                flowInterfaceNamespace: 'hnmc6v4pxqzfgkexd6c6te61r8ky0gytdabauaion3pzmmes8d512koiq54s5pcmwdw5mrhu760fcpk0r396i73sezipund28sve29ssbw2lb4211adjdc8e5u3arqur65yt7ymvnb60r0del867pzrppqh5tp3r',
                status: 'HOLDING',
                refMessageId: 'q0mnkt7fmb99p12kpdxzm98rr265ykqarpcrxw2rworm37glyh3ca2x5keptbdp75kzpf3egdbhjo7fb2zovrvn105bljnrfkrjs1k43kk88njjv08ps5g91zhyswdzfjpoodixiapc1p5iu4i6vlkrrg2w6k656',
                detail: 'Et dolorum velit non dolorem eligendi nihil et quam id. Labore vitae voluptatem. Dignissimos doloremque cupiditate vel minus impedit sequi accusantium earum. Quis rem iste dolorem tempore dignissimos.',
                example: '8xmse7feih8z7t6pzvudfmi40nhdynkgaz93b2rvv7jnfqt5igaem35lzq7h9nnhx1es5a3622ul5l8e6yvn9cpbyeykkiz88kd815vzoxyfg9fxn3vvecnnpztquf2zrgybrxraubyvgfqxrajzvvel1ufozjhr',
                startTimeAt: '2020-11-06 01:13:35',
                direction: 'OUTBOUND',
                errorCategory: '2ihvab5lw92s1tzyh5n1j68lgfwe2ejzukhkq2sfyerb2ds5t845ni3t2qink066cgf6wrtbon3jp9b2ik12vs3klco8kxekidm6vshlsxhz5zf8zn3m51spl1y7l7tihl1clrl6ganp0twf0jc7ko0tajtx3dri',
                errorCode: '012uaxt7pe8r6rh4ipjid0foj7mbd04k2lkrbhdxlm2d5ldgms',
                errorLabel: 945551,
                node: 7497099382,
                protocol: '1ugp4x1s89pa8g93ko1e',
                qualityOfService: 'rdjj0qm2ewiumfc42797',
                receiverParty: '2orrc151zuo8b7iwrykofo74yfxgej7gqa82dltyw6khy3m6ua73c7j2yw2htl77k6l9xige1duijov28mzsqu6es52ypyqj0dgtqvarkggvl0dryzl2joc0scd43hotuwwvjif27nif48yvyejtcyg4jv4sblwc',
                receiverComponent: 'ctbkkwyquy1dtwrk64r1syb7tq8vjxm1gfqb73ncxe1ocsl5s5ekozya9t412828za5rsvwmkgcnz6xi21nq1qir4fn2xfd3zz3ppn7lcvtocub64npjk4od9x57ritycb73orrnjmtps8wc5dbys54nd0498f2c',
                receiverInterface: '2053zvlk6wbk34dqc5s50jfewdyu38zgx6bukpizu8hxu832gctfdjlorhdhtaka5ck0kim6agl33yqy5qlqtu9088beiqm6e2vap3imsf2emk80ofvt7n3otvh11ti7zu7coim5ml12k9z428kjwhj84pbkrj09',
                receiverInterfaceNamespace: '5zm9rvg4k89x68n5btyacwqe6o9ijm5ffsumx0dt059zomqebdnae4n6r7vkcqhbk9msbg3x38lm84kjgays9omc3lmd20ozamg0x283i3pweynrzh1x3qusokm2wzbk41cqlre4pu3j2m7zlhiryr9307ewgyew',
                retries: 7177973765,
                size: 8823544275,
                timesFailed: 3277956337,
                numberMax: 8413899623,
                numberDays: 7028636218,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'rubngkdgor9vglselst4sxrwsa9ddlyxjk05ksu6wvqgpskgkc',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'iar62ld1jjt9x0bcfeop',
                scenario: 'vw2j3jx1z0j3pj6kwjjz8ue35l3o4t9w3yuxxjzhxbe660x8lmieedjy1cvn',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 16:39:06',
                executionMonitoringStartAt: '2020-11-06 07:10:19',
                executionMonitoringEndAt: '2020-11-06 08:52:16',
                flowHash: 'p1o251kxl0vdwdoschqhd8fb1boydr6smahut43y',
                flowParty: 'fiugs88pip1cungto2air1jrxpjcdhhq8l7wfwihnbl7735zov707aewkk20pibm5l7i6lt8lqge5fog9qiinlagsnnmbzlmp66ijcii384zu4kndwmvstytmobtfbzovookka4eo6co211zu4df6ffd55z3i1go',
                flowReceiverParty: 'e7istvs9itzq18336kkjs0uktk8kz83y4sy424tprsmdjnb8wuckezho04and9acyzxfgi6ecmj52wjzdpctlth2vxd0pa1eiudhfk3ckqwvywlkb8tk4x7spe2pmbdtbrbf41loo9y6muwg5dpsrf6i2m1860ov',
                flowComponent: '61wz76ao1a2t3bktjl2e4swy72wbaery7l94j0sp6s5ilsp17olr5bda7b3tf28f5cxu1ncaqquyuhj65h1bfytezyfoznmq7w9rx50w9i1qn9onus2qis39drjiydmxke6240118oq64r7cd3gkkdo1z59h2498',
                flowReceiverComponent: 'jrwggwl6m7qr9dl619f4gj3hsgt630jq3dkh5t5nm6lsb3vxrw4rlcz940amsr6ruuu1a26h8nwmo0pd2gisfnp5w5l2w747ppf0na5qd4ow44a32fs0rmhkfn9d7u0cmvb7ofystnxk9hf61v4hq01rx8qt0zle',
                flowInterfaceName: 'hj8jbfztf40cc2119u47ppepn956ztoimnhrfyx3hkwt0ftg6181435vyx4a3hrldocx4ccthf2gf66hm4b7qxgflbcsmwqc2qoencsifetqma2nv1n8w2xdnx756fe3up8e7pmxqriqvok5o65pm0hjf2t8in371',
                flowInterfaceNamespace: 'yxfnadc53grmu2sgyrwf1n0pcvkl67rmismmgm77s38qppu9uf9r43shnbug2f3v1opc9bmnvqebl707u71pmgn5mjrw8vav24aa2gcbp1kiti9ww7ndnptridnxy2rs5hd7ru3t3zdh9ikiajr6ovzbi77cts4f',
                status: 'HOLDING',
                refMessageId: '6i0c1xwzfc6faeji2xib20nfgpceum3tyznotx88168qgwl20r8hti2zve4yx5tjfytjw8yezg8qbcp2f6sf2up5e5huhj8edf0arc7cz3qt1z95zp7d1lacnl7bph2nimac3y0mcl2xynlt0y04iqggqootkl3w',
                detail: 'Ea aut pariatur assumenda rerum aperiam sunt quis laudantium. Fugiat porro excepturi animi aliquam. Repudiandae odio soluta voluptates repellendus eum similique. Aut tempore deserunt quia accusantium et tempore laborum.',
                example: 'clvv6wl1x5aqc22scby03w3t1a96ug54cmtd3gywtuwee8slkpqyoaygv1mp5qvn6oxhgpyoh3eciq5l9rgiltcmujfxdcpgjwzyuzzusj186ch9pmssdprx91e0kgk6hzryd146r92nciegc10ndyjyompfjzko',
                startTimeAt: '2020-11-06 03:17:15',
                direction: 'OUTBOUND',
                errorCategory: 'an7j4gea85jr9g7sagpv7kvjqnyr7g741gw74zwazapb50fb3vkood5aiquzvki8gp58zj8iz6weobpypzju9p0520ce1brpd3xopk5e3a03fefn5k8rsfrzfm0jj5hl64pz7jhbfh3dp3n44gq11ea0hruu4qux',
                errorCode: '6r585hvewbsr39th0bb6vv83oevmqrzwmcjbno7db4grobwpxd',
                errorLabel: 259997,
                node: 2425685341,
                protocol: 'ijg9479d5ns7p8w0wajr',
                qualityOfService: 'xw785e02ln7hed2xuxuq',
                receiverParty: 'mcbxphc7djfjuki1xt3p9yn90ty60qrf34vpg6jkq2y65ycndo92s2m5h4vvdeippdseiqn6u0fnu2xwmxkxjo1h8q370svds3bebb66sz0da0kefbeyhoesu6xpd6fwugt0o5cb9ly54k9aazkki473ajo3vxwl',
                receiverComponent: 'hnmb17rso9asxvktel0qr32pa0v19x4sokoyrht0nhuhmcftt86tvqubuj8fx6v7862ixco0901qa83v2frehs0dlf9j6ik17ngp406o9ipzh1knf9l5db7w3at2n1by6jvw9p9g2bofqq6deatv17vp2dmq4gc3',
                receiverInterface: 'tve56pwr3r8r2rdnroobc3ieq8meor0umj295f7pqf1ye8z8gimllg1l0w7yg5seoarlcxkri3x35pt0f6ra8o1pv524y6pmjo3b5q0fjo8c9kg88o3nxntkskgnab1nt306u5ymwlap11bwyc2jtn19rsjz3ymv',
                receiverInterfaceNamespace: 'wwf0nt04z8p8a2vib5wptr3cljsb0obdoaup8qd4meokr8ggvckx0t8lxfau1tkwdfx5ppt2i75lqeb2cjyyrggb5yxhxd49gp8icxcok2dxyrjnm7iquazxu86eusaba9exi06cc5x3l2r3m0h1bsnc7ki3v70r',
                retries: 1477393544,
                size: 9326470267,
                timesFailed: 2540688529,
                numberMax: 2558477076,
                numberDays: 4923085172,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'lkg0mpn2mmaqmegbzkocsodc41p88h1luswrxgs8deyu0nd5mm',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'tjsc4sps8x80wgpmwg6y',
                scenario: 'xv5aoh423e0h4i4vv1fzfxlb4uh192cv8vgwtmn3rer3xmbz0fpz7f6butby',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 15:15:08',
                executionMonitoringStartAt: '2020-11-05 14:44:12',
                executionMonitoringEndAt: '2020-11-06 11:57:25',
                flowHash: 'm1xf5jbl4el45cskroha5x1zxif66ngscbnogalm',
                flowParty: 'p0n687ajlvd50wu6ely47tvbdlx81nrj05f0kpea6qrr82z2tk1naah6zqegxjnxebv7e85s46ccl07ybpgdkou2zn0jguyofwwuwbkud6gk61z5m7048m99hokzskm807td2k6cm8z3yslfv1lcoj95y90g194e',
                flowReceiverParty: 'umrb80u0gubuav4tcml58mrgvxb2ieharon3ors6cmlshpu4kdylogjih9idebgp0ggtrb296dnpe13beza4m04l4imtdumrbd55p01tl1jo35km4i2j763lq2fgm1eyy6y4iflo35voquxnva085cldc3qrqucy',
                flowComponent: '6hxhgccd7geqn9g4evaut3x83bs2879jef4kz2jhxgyhi06gpb7z1aj92ji00gietr04lw1bhsnxwmf92good9me624s3fe149uo8di6qi4ignl2hwcqdpjy2i1c0bxs3tts3q4ea8w5apr83wfi2r2rhgdqiaif',
                flowReceiverComponent: 'nasz6x3rl7o3bev7nguzdtdkazmspby1i67fb3vs6xy4vx9btp8zoo7e51au3y935ffkpadacaowxo02oq0ay8nv7tjs0ru1dab0eqtj1uead7ixft3ymini45a11o4x8xy6npq51pin7z9wpmyw4et27nrz0iol',
                flowInterfaceName: 'geza0ymtxbv06p5fcz0gmyz78y2ne9mpb7lanpw67favtxzx7tkq0tw499lzqvbbwpfjlej5f5mftt6pm13wvqur904yq53bl8jmoxm8ei7pistwdjst8oh8ys6xfrqeq5e86hb3ogo7b92kbuz9bmwwqjgcot5j',
                flowInterfaceNamespace: 'wz2utvstrdkabtmwwidcv9wq729mtelwgtu9k3iqsltw5ur2sixpzh3d0ar3ljsj621dazu8agteeeo6wujss2qwvmq3hpdc2v5my44gy8mgx0e4e6lsnoogpde11d1bpje6329in4r9kygy4gggf7wp3emjs8f6s',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'a5y4jq4zpewmeyddbdbjqzazrur29qjhch8ism41a0oa5rfvuo0j0qmj0xzpftqzjziqkqk44wlmmcjbfahswod42rmz27k22h2szhrrnlep7jw3ea1uhfe08pye8wij7d507e3o2v8lexuu5dwtybwnrizmwi51',
                detail: 'Commodi nobis voluptas neque eius quis quia eum. Culpa expedita voluptatum facere. Doloremque sint repudiandae aspernatur suscipit vitae quidem et beatae qui. Quia repudiandae laborum. Sit aut nam voluptates eveniet quia. Perspiciatis est fuga nihil harum atque et corrupti tempora.',
                example: '9v0tqhbl56n1tbwbo18r89ew1thormfz5iyc115cn5dbmzxxx0myuks0l1xx4xnoqj2nulwnjr0dgs2wtkpcdnmac565y4g14rw34iti4stgo9z5evbzopckko5tfgz6m6r0drbj6zsuxb20j0t2vnwsbkvl6ldf',
                startTimeAt: '2020-11-06 03:57:36',
                direction: 'OUTBOUND',
                errorCategory: 'kwhop5fc8ta7h32be6iwk62x2t11u5n15g8yqk7no3drg28js6nmm8vei2kzkndlwhi1oixg0vl38m50gmc86zm7ew7k5p2vnh1p4875dzj2ynkajtu8rj2lr0hbxd9wmcpeeldgjbjl24qvimul8sl10xcl5w7i',
                errorCode: 'hqhq95r6ptlmp1t1lqsdvwp5hytsrx7gmxtw6htk4e0o7s077m',
                errorLabel: 536130,
                node: 7874592273,
                protocol: '5ryz1x9qr2qyqh6d0wzz',
                qualityOfService: 'khq6m0n1i06nbs2bwa7x',
                receiverParty: 'mcm740acxjt4d19tfhne7effm3acrhz0iu9253diojmkpectpbzscq2fmettj07qgmxmm4zauuejy74f44m7hdt95rgi96j6mhbs87xz90916iea31kzwns5l8q2tnfgljo39oqiyegixfo5b45bm1adtn1zpry6',
                receiverComponent: 'nm4d1ps6wf3y2k0wvw2jgb6seisd18xs4rshakzp2mlg7rzfpliqmg559memsalo2z5g46d8z77iksshxv5wt7nmbxqn62tab623z1r3vr87e7okbiyejthh8nh0nnaq6x8ulsl50fecck360cje9zjzylkjmwji',
                receiverInterface: 'zxp7b215xwi5wilsczzx8b7qrfjgk4p3iy5g3ov9s0uun7aggw2ls8nzk360fxsb6bm2k7skdzabh6d6ek75urhu25bjpt0rmkryhbq5e3o8x2xanlrnn9lgaofu6yr4qqjfclksf4pcthyo46fped2utxk3qutn',
                receiverInterfaceNamespace: 'xulljoefjwhbflvmc6rttsztlmssvqawnt8ch7l0hjgfemlrk2aqz1hic84v0gka8ilu94fhcu8hgxr9hx8x50dvm7g0v88c29b0ruy9iubrh6sgkw2ms8hc70kc7e40hwqtzlsyzs7kep0qdhxn0nm1q4drnbob',
                retries: 1718927150,
                size: 9657380126,
                timesFailed: 5406985950,
                numberMax: 6213791740,
                numberDays: 8080035226,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRefMessageId is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'g1nies2rbniwt3tk7jt855mek1ybiq1u1pmuvfwn3tj99qntq9',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'yq72p7oduzd2q8npiskk',
                scenario: 'n6euewuphpij60yywtouf90y25ucow0vndine9y4xsz04q2z8ylqie2w49vz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 16:46:14',
                executionMonitoringStartAt: '2020-11-05 16:14:05',
                executionMonitoringEndAt: '2020-11-05 14:38:32',
                flowHash: 'ivky2fhlz1kf4ux4xv5brrirawi8fvwbxdz81dih',
                flowParty: 'ds2zn9cxw1og8oimxqifu3lm0yvcky8net87jwjsqt59dwbfjr1ftuf3w6in3ivfp5zrha7c6t7pnkbgy8kj0md7p9batsbk5wm5u3o9u1xkvdv0a1xuvoc72ccn9nniedfs13xer25onlsi291x87ddnfqx26m3',
                flowReceiverParty: 'ytjz6sqv69wg7r34joabg72fmb011qcqz8e1dacr7x6azcr8lsw15teqnu4wb4p6jodmzrc494mhy1k0a44oj4pi4krnf8nc77gr6v31bju15hzathn1l7ldxin6hth2nvhsbt3aqnsu1j5sokesk5xwqcr8u0a0',
                flowComponent: 'eo4dg09dglupywc3gc2gaz9yb9fx2ydk2hipknqxp1n10655qje4qyk6ps2gwn5a9cn1n59z6hqe6moxx8g8qs6fj773h196yctvlsbp61xw66mji21ly62chu9ayhkw2c7ny0hrmb0908h2e119hyl0fk05pkw9',
                flowReceiverComponent: '97agosle43vjdr6kkv4muzapwuxrrjwavltpu8cq30c8p6exsw9v9va3lktk1t9oaf71i595pe7eoxm7d08ixc51p37tvhddk3x1o16xyto2hnjao52dpi8fck6efzf0a41pkl8j61v8bsv2fxgam3kb7t97s7jy',
                flowInterfaceName: 'xsswtmh05xi50swtzonbpb80wbyaihhxep18p5sqkin4ulclsw8mzaihqwh7cv8k9cf6wvm4j4mdd8a8fv79oks83ywxk9umqco7yv5ej2iwe2tyc21n3rlc9ngmuu5yvi7i24fc2qvj26yirgrnzb2uj8wea0wg',
                flowInterfaceNamespace: '7r34c0mod3qzv9z7ezw2qxavjfq7w1g1a0gvjjorf8pnvomv8dffc63g3kiwxg352dkdv3gxw8h9lkukk54kx1d8cfr6je5kzdcs0vk3f6yh7t07tpae3ozp5tdgenvdt6d3vtrzj1vfl9nlyakpm9v4vwgassdj',
                status: 'CANCELLED',
                refMessageId: 'qifu8ombvnqhf2p4gk99djcq7xlkyhazn231uuxv7t0twfqv1scuhkm4tps5l284ntccm0kpvy8nhmfh4oezhxkdenk94lwwvht340voa8y9ygxlxykr11rdlp207uofe2v0ksqt9j13xn7s64mgd8aiyhk9bfabl',
                detail: 'Temporibus facere non commodi saepe ut eaque. Libero at architecto aut laudantium quaerat aut molestiae id. Qui est omnis. Facilis porro commodi. Commodi et sunt deleniti odio.',
                example: 'h2pa43cqv4mkrqtzii7fjv37ow4hn9mx979bql19yl1rugx3kjxqiaag52k1n9gj8qetbc0tw4a4nrauzwi8thz8yhg2mjsosdsp8tats7phnuf6fe53dir8e2kv5tpd3kune9wy1ovvw0mm6cf2dc3lkw2igfhr',
                startTimeAt: '2020-11-05 14:45:06',
                direction: 'OUTBOUND',
                errorCategory: 'w4izw9mahwmugy22y9fj9x1ssaufv6mwbee0ilr8aiauiyeew37apca13yg3c30klfoied0tiwk48tu043525bvmb08b03roovj8enyl8snv7pp0qjzh7fvums65jqc3x3swj0wmz3188pkf8emuf468d4icgzrt',
                errorCode: 'qh2772hz7otxydz8523i96lavrlfrmlpm4di6amq5qb3oeoliw',
                errorLabel: 615924,
                node: 9395505851,
                protocol: 'q7kb46ln9no1f0kex2hy',
                qualityOfService: '2fpn5kadnzwsdo17v9ha',
                receiverParty: 'zpgs4uvgmg28f2tgtdna7rf95qx54o4w67iex9c17zjppvy9s8vk9brl4s9bleqvd85xbp1g01js9gnygj681ao6gcr556besogxylkm026sufejssspek88z0olbtyilz9lengu917hg5pdfc6xzkqlptvbzhjt',
                receiverComponent: 'h0f9d1t6m5pqd5ih7jpwxxdwmajxm9j8b3ta6sqf69dq1j1wly78k9bvjzb5lql5nuxt30n07ibix2g9gjctn9a0jjcblt5s85fmf0mx1w22r419yacj47r886dt7vk00ydnonhjpscmhk9cu4xqrhf4aeerauf9',
                receiverInterface: '1r551nog7c03h2700b67guhe6f808pom3rpz81bzwoezqu028abagiz32udpllgdxev2euk4831qenrio7m7l7gbghymdj7chc3ranfocqh88hiuj07mwqx56ndb3qi44igbbbmqchmpc0gym1dzmcmwl6tmw75i',
                receiverInterfaceNamespace: '8pab0kpaws7gqmwtidnygy18y8b6412lxwczhph2nhw6z4zigq0oz6kxmi2hlbwld60tfhe2y12qc8ckhvcm9icys1k888ypovuar5g0xk937a5gs3bmtj3ncrakdzyw6svk4l4ckq5dh9rlr94pe7dinjpqztxw',
                retries: 1832357500,
                size: 5605184953,
                timesFailed: 8570254125,
                numberMax: 1967414110,
                numberDays: 8533731929,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRefMessageId is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '8m7nis71wde1ncpsymzt2t2iua1gx1jbyfbvtrkw9kelcevsq4',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'zp9yju0xn1i4dho7e3jv',
                scenario: 'jrmj33shsa2en9ka0slvj4yef78k89fh9kvvayktho9vx0889upeh1ibuwo1',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:59:11',
                executionMonitoringStartAt: '2020-11-05 20:01:40',
                executionMonitoringEndAt: '2020-11-05 16:38:42',
                flowHash: 'aq61r91uqelcbxuhxxcu96fszoli6523vw6nk9c0',
                flowParty: '0qx15okpko3wtpcpxpntffqcv9d9b3qkal07zqx63gux735johezbqs4lve8hrx9tk7ws9fel3blvlu5ekprtnsify0qw19qow8vmybvvgqzfwja43lidji3mqzkctb27cq8a43ytlljd67s315uf4hyamr18ugh',
                flowReceiverParty: 'po7gpekqm4az11m3vkm522ahdnye728j3crw5489ih15kb1y2w03hq2y58mq30sicz9cw71oudjre02x5azj9ckajl95baie45kcli7upjo9ql6c0zk0ed8dg4lt1bjbcbqqygp5hdawvsj8yk224q3ucyabxe7c',
                flowComponent: 'crtt72hzqrkg44m3avvdiw4jy3g8g79z0svlsw7etaocx2gnt7z5wf5ws9h5g0begud72djlryolbzozaixtdflv9cx38mzi6p5033cqwx00hn9k5khnz70o8zdozwno5fl16tyzmeqshoaq1mk1r3dk5o506q0u',
                flowReceiverComponent: 'c00911qrwa85unl6sejhqicn2hcji32wke2s9dvusv8taiezxwujlo2coq59gnmvdis4wgztdyml7u20zwyewi01wkee8k5i4ua08k5sse7qpyu8q8pe6p9waorseonb6eaa8y5n8ixjh50fmqvgxsoqg6n9j0u5',
                flowInterfaceName: '5sdwvqus5d72es1m2intava2f9y6swl1y8lpxs79ylv5rjaq4j7s9shiiq786qkake40nojjtu4l6rgf4ldo92b84yuhotjogqq2bzsc0u1h5pwm010d2lrvazftxw29suzdmzlt6nlqup5meukj1rogllgpl9xx',
                flowInterfaceNamespace: 'n8nfs9zjny0l08g7sha5h6ko8ouvnwf4qrzu7b867m9ro1pq74rxlur9a7l94dg41vvw9b3r0dsjx1fsygrr2kl0m5ldbzeh4wvdsw2ko16muzmweiezf6m3ixgxxi323p7u6y12378cmdd2gvanqwc9l8z3xav1',
                status: 'WAITING',
                refMessageId: 'po1glqwohnr0gi4r1lglaytyefq8r8gv9emgsl2q97mn0oym8e41bduu1bd2le9xbz1s5bner8b78162eknr8ev155f7bvldnd09ducogm8hjj2yqb474egq1mbzk9clhn9uzw5620rghz7bzhu0iqfa9s2l21z6',
                detail: 'Unde qui nihil sit placeat quia. Occaecati quae officia. Fugit vero cumque animi iusto minima sapiente iusto aut. Voluptatem eum quia maiores qui. Qui labore et.',
                example: 'mkdkuipqe0xgntv805buwrp6vvrqmdd248p9jilssqkee2ubs7ia9oo88i7oxgau3fpua3jnrqq5t67c21fg98g96oiu7verxn2ynumh67e4jyi1s1nr82s295isxx22xfu8x7xktemniz2bg45a73w4g8r7t9d23',
                startTimeAt: '2020-11-05 22:02:58',
                direction: 'INBOUND',
                errorCategory: 'wxxmwrbk4wvth8io64g80ujsjyehxfdjyr82qj2rk4c4ecfvu0f5lftjucpqlatswi0ikg5alovkt00m14vb81hc8yjoe9wm17m6aq2rddd10e87n4rz0srcijp75w16wo6fz53p2u2vlt9x1gikt6j9zkrbbyyo',
                errorCode: '9rtomsxxq3lxeu8cze3l2lr2641gg1vw4gjnnfigcwqn3x9v9m',
                errorLabel: 768830,
                node: 3310473542,
                protocol: '7li5azsehixkyul6p3n7',
                qualityOfService: 'ahb8puyyzq917e5xdczv',
                receiverParty: 'ybyxha3uy2wz1yx5ls48pq5p2hfonavcf9ap5auapouo12dp0lsquaenrlp012qk33ncgdrzca1g5rtkox9glpa27w4yb1u2vvwy1pah2ubong1g4olxf2wqb6mkrvuu905vafkdtpeeahtij3gnq4l9j2t2azbf',
                receiverComponent: 'g60sc83rsffaotgxgsfaat6g8s7662voh9mv6q20js80vkhsbj9gn9drirgr0337afsm0jo9o0kuwkumrby6hdaieju84yuz1pafk1kwpd8ygv1wlqrtbim5nk7keyr5tcovhv55hgpm73m5akkm7kwq8aq7v28n',
                receiverInterface: 'r1fcpxinx6h5jrjzsx4iy8nyvom3u3i31tevb4wrp07a42vccnmxzv6auk9b2bjy68pxijs1llr2c3up4kjkrpv434xertbeshpy7t4by2v5engo5eu0lj4fj776mwwejzzcnphziwys4mg7pjsjmg0mjmg76nqf',
                receiverInterfaceNamespace: 'lutcrw82lutf7777buslcnmcmlj8yz7dfxijiun8wuf0rfs51kdrox8kfd61ol9oju5ehyoyfs16hvhaa0ha0007gkki1kqqmlm5qryfrmawkexkeq613h7cb602embzcr7dm0wjlt3f1qugjqua5sbubb746s06',
                retries: 1537857945,
                size: 8511009867,
                timesFailed: 5116945884,
                numberMax: 9212571331,
                numberDays: 4392783029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '9ksb9ccirvg038dybhbj5huadolz2fxkfsqzs1c824k5dd6lny',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'zbtm6ek3s7dw5ivc45h9',
                scenario: 'zrlxehiq2w0we3e9154hkrnfi196rdmc3nji9z94k1ssqato0i01txp8czg9',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:41:15',
                executionMonitoringStartAt: '2020-11-05 19:31:54',
                executionMonitoringEndAt: '2020-11-06 05:46:13',
                flowHash: 'yrt2il4g5928l4jqc6ldlifs2cvkpajtkjzgq1z0',
                flowParty: 'nr8a090lkff0i5fcgexvm6vwxrksvoqhnjl6cktofzzj0er8fqfubswpam2s5q72j3qcqi5k7t9k6k8r2282i2k2x2n5inh0n2i826kh5acddxvtbeksqlxormf3vpowa0eh4dyva4q0wzmm0qrjyg9aphfw7pl8',
                flowReceiverParty: 'twyebxq4n0mhd8ojaapkeh5q3qncr0e47jzph7vlee0gsc00yxz93sx3ypxa5pelult3yb8psl88dueuylzk3gycrtwy9fdpsp5mz0d4tduxba0cjw0cr86e20im4fdrtycwpty463rouqwxryhqsr5zmg83me90',
                flowComponent: 'v0wrwar7lt56bkx40tlur2o93obo2n9nwtu1bx8pn4vf9ar8qz93gecv5knh7rc7imj4pizjlywf7k2v93ryvosb0y2xa5cma8cpbber2pw9yqpzlzvtf7a1iuoggiteuubmv2oppwt22v46bj9l7smmzc2lepse',
                flowReceiverComponent: 'moqn18k8bqknaiiab9sb085inhmo4zrs4tgdc08dj424x53vdoprtt38xd5ux0wdpbj4aai80glh3sxw4fru9lvo7ky15y47fwvil762mme1te3ieu7ehme3953usya1vtzg6bg9s003b4hqga2lsqoskdy9nxcz',
                flowInterfaceName: 'cqei3ofg7ge9uelly8xy4un2tiqyoygdsy243yooe8yyuvd292595zbeg8fs6zrr1ao9j26ghmeh2yker8fpm6vk9i3odyuc2vbxrpc2x2pdbb61qd1wa9ve5232nkmfkhy0b1fe6rhxrv49shhh3t23aw1ijbmx',
                flowInterfaceNamespace: 'fbh5peh1znoet9rz4xls0z73g6gzuu3w6wm1cppn249lrj77bb80f67o9hj4pg7y3mib9f27p2wyw8tb2gkguuzp66ypbsv0fhozun2af82n78lj7zkfzk04hh0uyrpl6qnprdubh1vtxu0p1s1rxn9jivwesle2',
                status: 'HOLDING',
                refMessageId: 'ykmtal9ku7t6xow46o3wuwl4h3aymskmt7tpox3zl3qmayedeupqanye2ozngao32zyp6aqpzjw8jckc4r39a5ri1r6o93y8x47fm7imnx8d1nm9ruyfzrchnnvhtp1a14p15k1eurucnc6jwhfgtx4feh63hj48',
                detail: 'Velit omnis temporibus perspiciatis exercitationem alias facilis in rerum. Ut dolor eum dicta et odit. Consequatur deserunt voluptatum ea enim quos labore dolore. Aperiam non tenetur repudiandae est.',
                example: 'oumaizxonels0xo0z3nq7ymmlf4yvmwi0ltkm6c4uihuwy3bxflw5zfs3nht7dlysrnkqphn06pbkyvi1qm48sye1kkryif45imptzh7apyop65dwl10f1lf64epinoxb75vkoweoyxu79ww3zd0zwtnc3djdjzv',
                startTimeAt: '2020-11-06 01:58:59',
                direction: 'INBOUND',
                errorCategory: 'tl744ofprtiqw37zkox3dgmuem318qwroegxl13ou7vxw98muztf5au2ogzbxatrvy7pats9hia90yxhbs8a2tkvgpha57rztgvegj3ga51qdr1gagstnb2n3zohxaqp8dzcr4w9x34h5ia317spc90ysp50y4uab',
                errorCode: 's576wwnzzdg8nr1bo9ogmrk2bui5brfgpzvxfko8vzatd70jks',
                errorLabel: 400264,
                node: 1079366660,
                protocol: 'xpn5alkxfgdqaz63a99l',
                qualityOfService: 'ka7d6bro0hzn467xefrs',
                receiverParty: '10fabujzvtz64zz16ocdvlytkwznz0i98xfw5vi6mfaocvg27xitfw0lntz7amwsbngye1oudwjlkn9kp7f13kucy7u42d26oht0vaovlhegillu9tqdwjo7m6hhgfqo98h7g68hhoo1dl60hl8g1xdyyik86aq0',
                receiverComponent: 'bpcsl3bop3dq4xu09i7wh54l29qv4jxz4lrl7jbwin8bp5bocmg6q7t5j0u1bb6r1lybzsk8936mmkghp7gu0qxmu55uuvzsk71njotgv8of8ztwo55o89vr7vzlf9apzqpoc5u0ft9hgg15zwj7olbrcpi8sqb7',
                receiverInterface: 'r2nebk7dop6z7f3knhhu2t9wuus64n9g9fcemgsv7v4tqz9h67sh6iu9n5pc5upfpbrnpv92dkvnfsc0xt7kldzo4fttotbm26zkduyk37poziw1ty2u3zk5jjagqwg3rvavnr6lr8nr0v9hndtitrh52fs083l7',
                receiverInterfaceNamespace: 'cfxwudrixrhm74t3x0fu8e0hl29zza0rjpgy42ipd3kiy4vdmrg9lau15mlc2gqftot2sdr7yqf864tp3bm4nthvtqhptkdfvlgbufrbpi7qc2tcd3ftjrnqn6p3hjb2fixke41prqaegmyq0wpeof06umshk917',
                retries: 5918351502,
                size: 6722566071,
                timesFailed: 8181612380,
                numberMax: 4215403425,
                numberDays: 8954707161,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'i3tmdjy09dxf4h7sovsngkoq7adzuy6jx9s4amk48172a3hzts',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'felbhxqipjbyqhsi48ff',
                scenario: '6deo373ebjxs3196kikpgw2zpq9tdk0fw51gve5l6cor6nxn8dilqtmgpywv',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:51:14',
                executionMonitoringStartAt: '2020-11-05 15:28:38',
                executionMonitoringEndAt: '2020-11-06 08:59:40',
                flowHash: 'hsolbdcppa14evaoc2co97srz35mj28qgcjtmazi',
                flowParty: 'slksgos66p93dm0gghncvjp8jlt1upli9w4pgvfq9fwqjukcr5duta6l4eh6yx84jo4dhhvc2m06t8vnpl2mvu8p1c38kwvady767f5vr45ls0m7ejyf8aqpz2naos71ocw72ugq3oess67dwla6f78yrdl457kb',
                flowReceiverParty: 'pkwne7rga31tcbkmjxhdus7wusvwqtnwzv19in5qdmy74udj0d4uoieunjwl5twyy3663evx16ft2dnvhw1hq9nw9cztp6d7lgrfcrpw9d8kc7wajo62ul0sm6jafdtj19hmma6ypq4oh4frrpealtyr9kwmlrx9',
                flowComponent: '0wrnp814x9ii0fgcfb1amy4c5k1imoo5bv8vngn3tjvzphwm5b7gbmsnlmwn1flsbr88ux1tlo6vt66p65qllstaf34j996wi1j1f5xl1l72sw14czufwkfy1c6tm8jj4j8aajvwp41zdut3a0qjcx77gxhwwfb0',
                flowReceiverComponent: 'jlq946qdqiq97mdyrgaf559s3yym9o2cph1mdjlq9we05z4b3ojn66ueb2nb5ghw7ryskzu31qdhg7t3bm3u2xt4bonctoeefyukxabwerrmjdnkaov6bbhm10im52jrl2vn8sr3t634npqxbdl9ploqan03wvw2',
                flowInterfaceName: 'hovna587xrgyde966om3lsb2u66cvgyyd4eec7rena4btmm9yrgucgatav8tjzr8mk4olonmr9v8fi9kn7e8kgxsbv8vr1knps73ly8nvpwozi48ovx722oy2gad6cr25qe14l1trd5m9l4dyffg8sdxsvtkhlfm',
                flowInterfaceNamespace: 'g31nl8fjabtc4qu6xe76sr1oxnwekv3788inzvctgi6oxb0jx3lcn39vodt2tixot7kq1btx9gpsy7cneatv6no37zccegzepxrw76smxrb12ti73mymoy2s9mb05vcinlc0so02e8d1a8l6hb5o90qs6omaznro',
                status: 'WAITING',
                refMessageId: 'qa1aj8uvkqzlj8710n2l1t9jg6mhnohuimrw6eoakiuv6p5dv02neq3rxn4k55ptququalzxbuv7kdgufn19wtdnyen6yj2jd32hri9g220xgwi87o4zbl6leemwuomn1es00tflol132z41nmowmmswq7iihqw8',
                detail: 'Quas est recusandae quo animi. Sit eveniet repellat itaque praesentium facilis est est blanditiis quaerat. Quidem necessitatibus et placeat beatae velit.',
                example: '0mjn6yu5igbws71jlp7ho2svu2j43rh12herz2c5yljoth0p84csswm18tqoyzvebuekuusk4gi4nppp0r567x9e6a5xa7msivpq7rsoy0efaxfg4yboobsc63ju2xflr1ubk236n3w4zqv76tmay1081srwry1b',
                startTimeAt: '2020-11-06 00:11:30',
                direction: 'OUTBOUND',
                errorCategory: '9e7oxi1uqw0dht44npczy5dtdavdq85qi1jgedtoazmgx64zwy38ry1e2k16kl2j81bxaw8ekyec7jjlqhma08owuyb7b3ddorwigkoic0gksr5ct1umjyd4svk71t4un8s85677ovk8zhuhnpr3so31kweqdljj',
                errorCode: '98h6mxqc8e7axry4etvvaspabz074x7bbjgqo7zu1zx3zii4tka',
                errorLabel: 144605,
                node: 9191062016,
                protocol: '12ucvb5ocfumgsb9vqjd',
                qualityOfService: '672wbntovkqkjafkq998',
                receiverParty: 'lda6whwnyi0wzgnzuek11o92g4a53psihwe53ahhn62bzy6gf67u1v6opg30w6n6625657yzqqxs8ud99jz2c6xtdsmcd3xrcuzpmb6ui55rpw2pkwi02cnncr0w1k2mhx6mjrn3fpfrr4tav245jmd0n2yschwr',
                receiverComponent: '15aeo3nqfrroy00jhjqtw2bta2qt00g8aldgoaev0n1dxuzz5bby3ij0zahqrcozlplaqx4sfad88ox0aul4uzsmz4o8tihi5x4ycxf6py26o4vj9m8aqcqyj60mom3vzwny0nf66tqrtvlhgo7p2a2i88pcklvh',
                receiverInterface: 'f8786jqzr71h1cr32hyj8sahm3xvclabw7br4xybm8ke72lf6419nuwodvq0sbr217yqdyo511f2c6m2bljyhhw404sashbnwe7y22gkvqrvhec2n7ds7wygrdbrymovgy0o32mu0a3g9d8dd55tgc2fgrz17tyd',
                receiverInterfaceNamespace: 'v9vbh5ckmtbqvc3yex4vpt4ekecdt76d20nwov3qsa8ixctaxlyfabs8fgodyeyxhet0x63p8ssunl6r43gmevlkc4emokidzxggk9vh416fhllkkec1xlmrowx22kt8g55ai0mpl30byvzkswsiieeqequbtvgx',
                retries: 7486765177,
                size: 8911438016,
                timesFailed: 8604039497,
                numberMax: 6294287584,
                numberDays: 8557174962,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'lq6i8039y0ix1x67ntwcriz4w4iy9y0c078ojnlr9cdmh6bzjx',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'cucotp0vscxprb29u3h7',
                scenario: 'nxqe69v4qfi3cdjftsob9jz1t101fj6smzlctkw4c8786rhmrsxmmbu9z5rp',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:26:58',
                executionMonitoringStartAt: '2020-11-05 22:07:17',
                executionMonitoringEndAt: '2020-11-06 03:22:27',
                flowHash: '75nbrb0d1zim9qmdw907am42ssk569sfh4dh4u5t',
                flowParty: 'j7m9zj33awks00t367l51k6e1rdzvzms79iu9d93z8wnnkjtm0pmu5ds74mt7p9mmnpsx3mxs0mda0hqj9s10amwd1q80e72cgvezoun3iqy2mnv9x778ow2xytl0tryyld18j7b097oagp7tkkawdqryy7tj9w1',
                flowReceiverParty: 't462z253tvai2nppe7l22ypyfq23rat4g57ox7pa81fw599fixukpez3uch3l50grabkaoampquy37w5xeq8msuryjou8er0krtqwejobgmxw93xfr44kma7oujajptzw5mhjzy5ioknzpe63l7kmp6wwge7jenm',
                flowComponent: 'r9crqncy8enul70vgx6zqjxk3pp9sugezkm7qc50zuo7gnmfdbodg9me09dmu0skoe088z5gn8vqsosxvckz9mm3h6brufz6b3mc2q8laiyqulp2gu813f1i5eq0yrmf0ifzm6i3fasmmn52qiea3i9hxs903wyd',
                flowReceiverComponent: 'fnfepn22uu62dg0gokf2xkm1syd5q7lr1mtxxjx5427osu7c4ik8n0lnw4jz9jzef56eql1q745x9x1slqs9uhr3t7xvwuagaw7vqalkdrds8pkrz5e5syphaqv6pkoyvd2a0bc8eu0pd48zx20tlm4oz9z908zv',
                flowInterfaceName: 'c7qo0qp9owtqotb4312x3p2pa0v23mguv3yhxh1mzmlcm7j1krvxozf2z51y5qhp0omtoa7p608py7qelrbk259rizyoa1y2qrrdjn2gvwouds120yydfpfmf0gu097vj3h9366dptdw5uvgbevxlrx0ed9scstu',
                flowInterfaceNamespace: '95nxutyj1do5g35caaj5me3dit8lwfykwghnwor5qn6lspouheviizhyp1vg9hioag0r78sk063mfwoo0es8hvl9v1ex7o6crc36kf7sfr9idg5ku0m4r1batmwhaso5om54lyohxg7eqlnpesykfu3cwzfiqxk5',
                status: 'HOLDING',
                refMessageId: 'z2rh2kluqulggdwwmv1jff2ez3z3fnbtrt03emxzji7i240b7pa9rixvre8564akshydcp3dc94bd8f20u9a614vokeqfa2hgrcnfxnqhjc0aa9othl01ceqlkp2rc83rsykkb2shut2h9yxnpmtdgdjemr8my3g',
                detail: 'Modi expedita sapiente. Amet delectus fuga facere sapiente perspiciatis eos et ipsam. Quidem in soluta. Nihil corporis provident nihil at autem error ut non.',
                example: 'evqkr209cut6i9ucsi1z92apom31aijuud9vvfqwt76b1l0bs3frq627aflhf49aw9bbhf62um7qbhq115gyolb0np9rcfp8hfvk93jt0yhjzx62255gu6gbp0i26ahcnssexp0hu1vf8tn41oj5w68s1a1w5ri7',
                startTimeAt: '2020-11-06 01:47:33',
                direction: 'INBOUND',
                errorCategory: 'ba4cd8wkqn3wxvro6dqifxc0jq4ppx81hdt3qw3uyj645a467b8p8xvtpknse8hg193c13kbtf2ev7cwa46uu7d412gywhjsf2rsn6oaul91fygadbpuvzuql0dw5bhpjg8mnybqaqxcyhm1c6vzc0dnpyrcwinb',
                errorCode: 'dfjt3o1it7akeq9h045stz5th6nyw6tp3y5xon6voma59zi6yx',
                errorLabel: 8044716,
                node: 6216553134,
                protocol: 'ngm6u3yksr9fb1vqhogi',
                qualityOfService: 'gc7xwt1ot3dpfaici9pc',
                receiverParty: '0vbyvmhdhu7vreyrp2pq2cdrv7r5nih23g71yxle52fxut7fr48ppjdqxwkxdaw7li72obfjq30gy9yha1jcou7h9bw85vhqa3ce8iutb2h0qxfstoephdatlioo74ny6jxl40c8ymguaaj6vllgkrsnzkg65id0',
                receiverComponent: 'bwoq3whefka8ox8o76osi1ll9e2ivjdmvrpsrmo3s05kq2untewo85glfxnayw2aqmxnctfcxdnlphumaj1uj2yjtpoj37l360ybwge6e70a5tw27r87mxk8vk7diz3ek62etk92xv2oq3cik5xujgof3x86mn7n',
                receiverInterface: 'r2220fedifto6c1fxi8t5to592admcnuwbqzndrjg8xzu05z7a1bja50hzzth0195pt9uad60nb9rvpa7aejqrjfe547a5lh1ves8cv13gqlgmnvuecjduh2a8zamvc9rae99aw324qfqgopkitaxuh6eods46lm',
                receiverInterfaceNamespace: 'f1clq517719z12fcukdwfua3ct0lxth26edo7iyjrxq56e4x4xzihulnzjlrdis2vgqy1m4hn49i9zgguow9t8so4x4kquyqq5wa993m0dgu1i3hoqwtl96n2kvk0qnitjyg098yfpg7fk2ox6cpuly2wu48qvl2',
                retries: 3224757610,
                size: 3423891834,
                timesFailed: 9550905442,
                numberMax: 2923906153,
                numberDays: 8535268270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'hgcshbemszq81nlrdz4ps8b549t2iu9cy7un4c8xjrvyagp4vu',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '9bcz65y8b1jo6nx28d8s',
                scenario: '31j10btfvzrr6ino6vwq4zs01kiv2fff1rhsyjngsgt3r5w7ww1ndt4qt1zr',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 12:12:49',
                executionMonitoringStartAt: '2020-11-05 16:16:22',
                executionMonitoringEndAt: '2020-11-06 09:40:58',
                flowHash: '0fzoqylc8uzrol9alqyjcu3mhkfjsjd0jf1bwf4j',
                flowParty: 'awudjcigqax7tr5i9ghi6z7vl9alnpjlna758ouryjcebpn3kcyatoeak7ctagfv0txa1igrr2k0hkb7colpbaq1wv6iuniev25gxp52fxt87jqmppbnhowkaf7bm13v6kqr9yyq95trzpyldgrc5khx4ear931w',
                flowReceiverParty: 'kim1zvz7o0y1js3k38fzh49mud9puo8m6b3a1ezq9yco4t7ljjgyu6cgfv5h56nv860fjl9v01sxwrz4mvqnzhaom2brt104fr3siz947j4e38tdrm5882wp0zfa6bay7ezj7nzegj75dddj3685awphdouq57lg',
                flowComponent: '3mk9xp7lf20ve00uxcg2pgk4rzyp8k1zpqtwk5d3mc1etojoafvcgd8st8u2z7fii0mk7gkd1b5mzdztcwd88gti02paiuhxkv70gbjcbj594eh8sd8sect3hwz1xczptpzocdd9ftkzzpe1y052bbmmgthrm8wj',
                flowReceiverComponent: 'xsxzmlbhfcapylkngx9qg0abttml8g0tck8klr1o0eq3i8kwys2gyqom1m21hswseh6tkkn33r9zz4y43im7q518ullufjq2lpszmqlq03j0mdfrnbhma6dsepts0annrmd99t3vgyf8yr0evt0quwvfqtf1cqk9',
                flowInterfaceName: 'ptyxctdtndt81v2d147gjm5uq8xkkqh1jear2rew3505wuwu8ndumclop4s9gdi1mozca2gvvybo8d9wajiumgonwucslfix5rbqyjn8hbque0eq4m9mb4al9gu6l4zbld67igoi9qxon3xyeoni6hefmzqa20nm',
                flowInterfaceNamespace: 'efpt0ddpzn0byi0pw6fvzqxndxdfghlmiu8on5o8lheh2v5o8iih3dog71nz8jfgsol58zcdm4ofvh649hat48g35ofdv0aoecevl6h9u4awxf1rgfqzxzflfavdmvehxi1e21apvej0s8v9lioyhrdns9lxhuis',
                status: 'ERROR',
                refMessageId: 'nvg7ztbvqecl7pibt0u7rv0l5qj1et44gmot4pp579ucw3v3ne1v0tz86y7bxxynkpu9tfc20x5au7s824v27vz43oyasy6i93ftelo62bmvna0ypemxukskzortu3b9uvec0zl6hnxku06z90qhz1zg6r2lexkp',
                detail: 'Voluptatum autem atque est voluptas ullam sit modi a officia. Officiis voluptas tempore sit sit excepturi. Sunt minus deleniti quis aspernatur. Sapiente asperiores aperiam et. Et qui vero temporibus eos necessitatibus quaerat animi.',
                example: 'uvrcd6ran5fe2dox4eo0sg1pnj1eq220m0xqdwu6dgkishv7zf0k7p724rwwvrgecpq7s1grs55bikm1ycgjmft0ok87nvzi763scsis60ubu9uj1me2qa78e8s833gl73o0ge6a5pcv69obb0jjcgyapzdpbjp2',
                startTimeAt: '2020-11-05 15:14:35',
                direction: 'INBOUND',
                errorCategory: 'tnb506p2cjxwy9m4ncy6n6hitir1s88yix5ae0208nm96funbmzykbzpn9xomo64po4d95qkuj7vfe797f5tzd9dhofiwlakg0u90kekc555hyzjjstrdgbdxharcz9sbhu9c5hqpwdgx3dhk344224qb3sk5nyp',
                errorCode: 'chqt9j0t0lzyc3a0w44lrtch2jnrgvaqe5cy2b3um1788lsjaa',
                errorLabel: 272494,
                node: 23725562374,
                protocol: 'huk9epvqm6163zryuei4',
                qualityOfService: 'movqklbqwz5ijcke5a1i',
                receiverParty: '0hlr13lg5w45cmb7f9m5y58ondwzfbmh2vbvqzelwsd7bedsnkcbg04rhw9xsgug2aaikyfs86yjp3qnlg821wvqaguoyrx3h8c3bc1tsoco3xyggishg5fn381ki72tnfesit7jcq9lkha2hn1pekvbk0dxbnnt',
                receiverComponent: 'xsefx5g9bxvdynirkq6zp4pugklvxer6u83qjg5um5eq6rf6jngmfc0auknpwadu4s0fdlf6q4i9acvhzkuv7qem7gsjhunqyagvobltp1i0x8tg05nlz9407iljpwg3fb9x7uvfrd2vafw69r6qcfvs7pelqgcq',
                receiverInterface: '0w1hm1fvky6e2hcpzy4n0d0hrwcvprm8ofbt88swojjty1ky9ug9buhjuj6bqpw0c8y8cdjcqkkxw4y3i6pcmfzj64t2ef93tlusbklxtremyz5tz5cro9tslsullbbyri0bb3lihw0aj1tt5tctkqaf9ur4mt1s',
                receiverInterfaceNamespace: 'x8cblwsz9a32lucvqcy2lbay26vakwrtr4bq8e4px7gj37kszl6v7491o245fjc3p2nwg1nv74pcd3lmyo8ewdxwhu6obayfunb0tuklrlis5idi5vo37tmo1wxbucze0qaaviqgll4e00qlwqpxm415bakx4p2b',
                retries: 2674834850,
                size: 4537189341,
                timesFailed: 7196617345,
                numberMax: 8066816216,
                numberDays: 3027096901,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'zff87y86wnx752lpmia62d7oaoqij3z2uxkgmvp2n4cnw4e7l5',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'btvlxpticm4kzznemho0',
                scenario: 'ks721wr2w1pp21aneke7ev9oqprtswk62xhb8pzfci4ej9bsn9drchm9mkgl',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:34:24',
                executionMonitoringStartAt: '2020-11-06 01:52:03',
                executionMonitoringEndAt: '2020-11-05 23:39:41',
                flowHash: '4vkc9yewohzz3v4l3nv5m7jkumye60ndtxzg2rgv',
                flowParty: 'dad1zx48z69vbdkzzgv18wqy8dj2y9q8y5pi2ncukfjkk0v9mnmmtkgwnk1w3nx267no5g0ahbaimsnn7h2ooi7o78sqis9slha438v8qq19go0jbf7w689sw0oaxzs2m007blaa2dmlxl1ycz9szz3y9j5egh28',
                flowReceiverParty: '0151yy660t4yolidi593y7zcb8fbsjwxieab7x40n8k1f65bzs3hiun0ihxmvyul9mh0nailkfwof5wgqemq249abwowfiv1v8lvburdmvnbjb3w75605zrjvu2qp9kgf3he46oopoife6ryo10x0zgtsk0guzjb',
                flowComponent: 'pzceolah2r0du4gck7f87f71turtmkn7iedny7el126ziip9v2165jbmm1va8nq6935354a2zmgfd7rgbz5g9q1ep731tzelx5y0qpis1u2kikgqa8heo56p98daxrtw87n03gdlkd6l79jx1kgbvgkgpl2n71rr',
                flowReceiverComponent: 'ouglmxrzpijy3qoxwqcaonas1ftx93m5ecxx6261pw9jtwcmz6pcuadh2h66leo2qpo7munhvmthpfwoaeo3g0ryp5pfq9nfk59k4tolyczh7mh4z5uiw17xiixo39vj62z081o58vf4hjodtx13z1dp536xs6px',
                flowInterfaceName: '1fswpopz29y70lo4szjt5irgei7xk8ixf0nfdspyqassbsvr08gd34i8og1y059sjk6wkpbgzzmo5jxyl6zsih3n500jk9ifik3e8zo6siorm9bit21snt1hl98kviklcnlylvrupc1vrxzpidd39lnuuqnzgl89',
                flowInterfaceNamespace: 'i1ztm8cvr6fsv1ntgpqktij3dzhbdo5820mulo2103sj6ik8z82karope8ootn23vdwopstsk11l4jk6mp3p9cndbyu6b4ob5g7861km18yfds5aktdln7p1gjaafxgmru1nbui3mxr1beifn71glc857u9i3xqe',
                status: 'HOLDING',
                refMessageId: 'tossr65xspvmqikk2z8375jq5s4l5jg4sd89vc7zn4356eoqm1ah61i47glma5vmldl7g6c283eg31czh7v6dsyuso0ozjk36rhxwdvzj5x4ze60gl9zvmz3jhqdjx0pkhbd8nww1shruyyqt5uys1bqqdald3yu',
                detail: 'Quo amet porro sed praesentium deleniti perferendis id. Alias corrupti inventore. Quia qui ut. Ipsa dolorem velit velit voluptatem possimus saepe vel nostrum.',
                example: 'mcqk5zvk0jhyco01rn3x6vc9qwn4isslmhnq7yehbti703dws596da86pvwcmro0g67ol973dd1b9zwb2slaxb2572afegkz3z0fd92b46n0xos7okdvgg5lfbt060l96yw0p082820679qnf3vvg2768fv5rbaz',
                startTimeAt: '2020-11-06 02:52:51',
                direction: 'OUTBOUND',
                errorCategory: 'gisbovg11mbrb1ftow2qlvs9wxkqhd1oz5l0k8h8vlx37u304xdypkn3meecxbdrrkjy1q91dwfxitrzvc3lfp0cheg9fkkntonzpstinwwujtfcu295q71h92ss36hhnkz9sza727s6iy599g3zozpfr3eo9vxw',
                errorCode: 's6mh4u61nc51o1jbfmj7c2exw5d622w0bzmxqvb42m4ckug0q8',
                errorLabel: 338534,
                node: 9650527091,
                protocol: 'n7k4rfwgqzwnzukt73tiy',
                qualityOfService: 'ym27kmr9xxr60dmxxrr4',
                receiverParty: 'jlsnwmuw92er41uvduz401dqtunaav29b3bs6ikrw4pkohyut5jiui4iuwf4pr4p38cwtpaqp1fqntodx5nj4wmoufcxo3tlpjs3o8am4x77iprb7ngthmid0bmj74vzt2vlm7s1kr0dzvycffc7u32zgtixuuqu',
                receiverComponent: '2mhh03xrjn3p4rqkanau6h297uj8rlbgrr2o0z8mypodsbhbgdcgz6hu4433ygl0300jykslw1bn9ftg205fno96pk9ylquz1xh7cy1xak71zpasif2jg023ai3w2iv49ifnbazidnqgotkshkifrzhxzq6orkbr',
                receiverInterface: 'xzyj11dnrsu3l15d8lqz1p0kds2g4tj2smyk7oxwc3a7893n2fye4c3116w8u2tc4taen3en3koozo03khl7k9jdtj6hu8yvjhxo21lsydr4vy6frrelxvwbtzizbh6yt6nia0vykeipj5eoubvyvztfx36wyhur',
                receiverInterfaceNamespace: 'npda9vxkoim4xdzqr4ctbyqvlwr6gb166frm559ll6gft7osgsvq4npz6spj333rpxwyg9ppp88s0gzufg6mjws15g41gyz9w1z7tkaqzsm3vrehkt0k7pdkqxxyn4hotd8q2h3vzxgwtjuhax86rmmtt9162nu1',
                retries: 5312832032,
                size: 8156188667,
                timesFailed: 9114785562,
                numberMax: 1107609346,
                numberDays: 8680171041,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'c63rq54wv2bp2wncxmahgjceyc1nnth8q89tt99okcvnc2jf2u',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'agl4ifjio13869ymyc7y',
                scenario: 'kanqro3z0kxfizowufnqhyoq8osr46lhk2i47nbk0xj1j33zugmxxfqz61jt',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:05:14',
                executionMonitoringStartAt: '2020-11-05 20:28:53',
                executionMonitoringEndAt: '2020-11-06 03:32:41',
                flowHash: 'rdmrxz98o9lxv1iig4dlxrvhknrjeg11cy4500xl',
                flowParty: 'muk97txiyz0lfku6u48ao7rsg2i1npt3ulgukaow3qhitq5tfd1ebp9ctudtam3s4xdzep12sminajqgy1brdmtqmycs8b9xxiwxg4d1tmrvrfkgt4nwkpxr07f9oeuzg93j12a4tnrhoophcda41zqecuy4dha7',
                flowReceiverParty: 'bbdscgtwpsuy94on9dbd421ryn68ih5b1ceb40eek1scbv1qiygmtezt5ly4j55iffgnaz38xeohfn58xvy7v0dcnpqh68cuj0ux0hjd9kohu6tzxwaorgz839toagvz20oz72ukb40og93mced5zbqv633k9l04',
                flowComponent: '3jjakw5gd8zsp9nz4g318qgr1wzuaba4ykgsx90tl0i0jt0vxnsg1hd2c50z7g9we5p0k7pdfu4g10a1o0lh9hdxt6uiyshtnntcu5h54n5i72e3zjmnyf2i51bj2l4b1k3relrc1e1cm3oayhcdz9wu2vp14ojh',
                flowReceiverComponent: 'nsof5g11hepg77s0o7ntfv5fta7mp7docccf4n85fo4nskif8d8frgepzxceimkamq2o2koonl84krtyfr95rl482uxpjfqg1y4oyiuwrjly9jwa7sm7bazvagrrl117fr978se38sz84mwp9c2agt3fmc1ef0t2',
                flowInterfaceName: '9o4b4d9sm2zfs18g8ycce3khw9ie6jspgbnjsnbgns65kqt4scahxcju4qi01qhkdbcy1u2cvl02ubyahngg2x0sxphn0e2pue9z7nz0h4stz59tkxelfg7un2szrwi28ssxzoiugwa0pjrl74a3holersn90w0z',
                flowInterfaceNamespace: 'fnw490tbgtxltj4wm82t1v6w1abkx8c0o12i9wfqm0oh4o4k2euld8373b01uyjpi8o0ffhvfxb9073jd9mzrvoq8y1p2xrrt9qt9wdfism9z8gyxqa2bg0skg8miguvfz3m4r2p9v3hffikqx074zjje8g83p48',
                status: 'SUCCESS',
                refMessageId: '2ovpggq7pec3xt9zvy6p2559sww575wh9a2q6r430je0uzqqz100f2xnrp57qonc6xhxi8rm67fdjsoinjj810dr6v8ap5eco1g3jqq9fmbps03yhus8j6tws6yfkdznm0ltg9ob572htf94gb070z679j343h2k',
                detail: 'Laborum doloribus earum quis ratione quia. Voluptatibus ut distinctio amet libero fuga eligendi. Occaecati magni voluptatem. Aperiam beatae ut aut voluptas nobis et quia non.',
                example: 'c492m31n4z0lu4t53vjkral82rghcy9x0x01h6ug95e0aomrxb7wdoousuwit40mtxobs6yaldd6h7c677dhpr6f49xvcs6h2w92y8ztwyh6p18ba65h2a7y8bj71lj9kaw84bvi7m5m8zn8ebg4p1gn9n6qhb3m',
                startTimeAt: '2020-11-05 14:58:12',
                direction: 'OUTBOUND',
                errorCategory: 'om7x87jwmdcwhwwrr7x9ni7kwgezoziato8a6ferq4cjvfpb9hcn1ik838pd8nf5kre6899chxe1htnysfo39ywrmh37ytdnl1a731891mdqx9qwuipxgqnlhigmbl2g3negziqkj5zd53wh3rcv2bkdfyp3ljz5',
                errorCode: 'aeogg0w2npjhovljjhqvd7mcpaz08p3nf154oi7n9r67nqe6xj',
                errorLabel: 644845,
                node: 1201283471,
                protocol: 'z5eg8198n405vwoqkbbl',
                qualityOfService: '16ccpmpzy1hmbdtqi7ii0',
                receiverParty: 't1xp3afcdf5l1ldui6ljyjgmirqs5zznxi3maa5sba2ctdfl2uggqbl1fextm2lnrd4zw5v0egk6bzopx42bjjwmu6jg4ocvmhmr9vxb4z6fjkik8gfsm9loas6qtmw8g8as1zu6bhntc4o28nzusfjy6orjbp57',
                receiverComponent: 'q34pkv4rxbrfpxfhmprf6e51zqgqpbnioyf5xyl2w1xcw4txkzkfl0zd04azpqvehs7yfha9741widehyg0ikty8fmzgick6krax3dch3s7aerdci3afwmqpzqbhtf5lmwjswtwq559joue2v2vx7gir94ea55cr',
                receiverInterface: '54f0slv7rp8pudepblso8i7zpiivyeoi6t659k78gwsblvy0nflswwixh5y2dzuuarnyd55c1y5k247f0l1a12yqsky9v14tljx26uakoelh17l7wf3djggg3x3f1v96vyyjlx75f2u4zzrlvwe7967mbnnjpdy8',
                receiverInterfaceNamespace: 'rhalal7s32xyknir0t49m0isk0c5chzvjw99yqt37urq1rrku0jfssbkvf5wmwz4a68tp1br0sah1twg9ek3dbaqjvscgryonfcv05f28hyhxejq4n1ydeb2gzhsnjxav3nyo6plryvowm3wwel62tm24agxxk30',
                retries: 4798579758,
                size: 2782647991,
                timesFailed: 3174473702,
                numberMax: 2027773218,
                numberDays: 5250368248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'woubg0gcuhr0qgnqgqk0qtuomajfppwhw1mhmrxkytjcw61gv7',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'n7lj7cyh5pe944hbjgmf',
                scenario: '7gqui7keti5qkiuba86bqfux4qhnbn51etd748p52yk84dsg5vauwn5c2cu8',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:00:26',
                executionMonitoringStartAt: '2020-11-05 19:10:47',
                executionMonitoringEndAt: '2020-11-05 20:17:34',
                flowHash: 'v91an4si4x6snstl7d03hua6qu4ehzkxvt23zvit',
                flowParty: 'ii4v8390sivyyj5nfh7fc1x5pcmow09zksmkqf3647rvrn38hvq6gyoufswoqlhj3fblxhjm8xzd9xvhxxzct2xeillziaexu9v7jbnjnllvjc56229lxogbn3dqzaolyzg2ijuihgef7jatulgr01d4413jv70l',
                flowReceiverParty: 'acwu34d5ppky6o8qecgor5wv8qre5iqexfvql9stoviug1x5yij80a1ybvw183ssxpzaq1w6hgnonemhcnvvm38snyo2mmqum7at65nnz650p2g6uxxwjbqshyhv95y8pfq3pr5c5dy21ykdmzjbsubdxqpnf307',
                flowComponent: 'l261xepkkf854jgysfjeaaw4fhba3kzza31sc8fba8lwlocqe7aruvu0gcdd3yx4dbsbn6q39auv9lbqle7l5nwb5mxk9fp3ehs4wzajgp4tfjp51ddqu30byyd086wlu5059lkeltlidclvmq2xjq3s6oi23wy0',
                flowReceiverComponent: 'm8ifwk97rfnjxwpu5z2craq8k8o7235b5rpksnmmoagsw79f20sgpcur21hiwed3p2wqenqx122kq938u8alcrqn2isc15mpvufr4e2es9adeclxy7wkobdedk6y1sthn8zazt39dvg0n97bjc1z4h3trgf2flkw',
                flowInterfaceName: '1c98aeb1wnhjf1ui9hdrxhjyrcplolq2gotl1cxu65pvk0hmbb44w7gb3xw9vvg2mty431f33s2lv66iqg4xcgiz8ir2iucjw8btn7jgmtm5wy0pwd555votnvylexme8jhe9kk28slidd2dvd9zctf70shfxlnt',
                flowInterfaceNamespace: 'uwg4wuwuw2vidzt9jwgyl6p7luwspix5cefmz83p1ydic8fogkw5rbb1sq5orolend2romykqf4bszkreu7962nv2h22fhrzx37ram9e2dn3zbsxtxerqfttdg8g9n4xio74dga0ube2dciq2kof2t05rvnyl624',
                status: 'ERROR',
                refMessageId: 'oayrfoxl3ip2dpfnetiznclnob5ke5n8mt04jt93mm25coyblpux3g3n35n92zsbp4967gym832d31y3sk19zlpz01j4cp07lguh67nnfnn441622nun4eh1i40gz1d1prxmk2a4nnwwn3lwx7alkvabrcaani8a',
                detail: 'Reprehenderit non possimus et. Consequuntur laudantium at perferendis officiis et at. Cum doloremque voluptatum quasi distinctio. Ea ducimus ut debitis vero.',
                example: '9fb0rn5nutx25hd60xl6mxljxatr0muwxh3zhokaiczhf3cpg64algidrx4kju5o07jzw9dcwkgdsehyu8quej4ntvasrwtg4zh3fh9lzwhxpjdms2uzhloda1yuq0jnsa8e1nas9bl92rlyvqbv74ikdjpzettk',
                startTimeAt: '2020-11-06 09:25:22',
                direction: 'INBOUND',
                errorCategory: '7tqz9sefav3obl6s0mr7rh9x1g0q7yhxup0rc536zpj0llwn8lxiolvy0stf92c414kdzj6k6myaylxf5gabt4y56o3i33hwo1qqj09cny3gutb6ky498mckzkwz9hth8jj8pvcbnx318r8c9qfs7jbn6wg1uqzn',
                errorCode: '1amgdbwr5u4cakoopnknuztv2ggkctn5e0hevk68f02poxua6n',
                errorLabel: 902492,
                node: 8083870716,
                protocol: '4t3jepgheqg2y1qs4ctj',
                qualityOfService: 'zkb7uhh5jhp3p0l7k41r',
                receiverParty: 'dnoglxqg8xsh3au448m3n5hrxapijmv8ngicqj8s1gc08l5sxaxxtrl3mupd51rnfi18ferrsxy4v5hawhluuvzpo0ph2g855clfuekn13vw8xtmtcuhsovhrty0bks619olt5p3d94kn5oaweqfrk00rrbu51k43',
                receiverComponent: 'syatkk3o96i3kp0jrt77c9cx7xvd7etqz27ucj4djqsul8o9pthybtn796eoo62h1yrma7jjp1juxcwpstzc0mtezwammtfjk5cfvjvxmj3agfuyv1dqo2dme3i0v3w56cvq87n9h5fwz547jlnte9l8m653rzra',
                receiverInterface: 'csuh14p8jkrv5pzrl4ixak5xj9z0gtx4iwns46k2rlguphszv2yk1q82sbou66exlmw71oys4uzsjjuf1skxmq4ydlaim57ygky8981uwyy22nubdlrei3dqwk6mg5agnqmja83kz2vf7gf3seb2tstpfvrpzt76',
                receiverInterfaceNamespace: 'cb311rm0k722bjxyaqv92irk7awigz1x63sa14lfetxnwwm05244665s8hocohaw1ti0i0idhnnw4lkeyan3it882bbvu4qj96bqmvw2voauir9e2vn5ymfzzpfgbp6kzb8uhu61mqvvqukybw1syi4lzlh1in73',
                retries: 8683113659,
                size: 1344003072,
                timesFailed: 9810993489,
                numberMax: 4427843351,
                numberDays: 1920615141,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'chaabhmvfxncl1lyvdolsaqxniqc7mqyqse8yji97e3wsn1lrb',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'dobop2xwhs4g615g5ozk',
                scenario: 'nsadj9jvoxk7prohd0cv26vzwf5o9mhhiaj453wtnhs3kyf94tjpx6w96niz',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:48:45',
                executionMonitoringStartAt: '2020-11-06 06:17:08',
                executionMonitoringEndAt: '2020-11-06 05:05:27',
                flowHash: '1fjigk3ek9b79lqjwvbcxjj07yq6fnca4g5uo09v',
                flowParty: 'bbo7ac9dyvf3h7uby32vvy6je6hu3rd35z6kuwjmk52eyxmkwmkdv9hix7htrw2dfq6yjhm4mf1z80qq3xdt9esdkhxapoby34rdox99hfdha1a2cos2snu81in1fp5eq6y15eu84udy4ixd538shmjhuntolfhp',
                flowReceiverParty: 'hz4s2qoumsypbt4berwk61bx5a41ns289wq7l0um0w7v2kh6ncuq2lk476t2zis79h09rf2jerd20vy7fz20erhfbff0iak94q1qvas1458fflct67sr5wnqtsfcm4hpv6q4yrdxgviti0nia0moavsbkrzlrk0u',
                flowComponent: 'or8v4be444t639vw81o60nvp4zbg9g5xvcga4e60qorx8cuqa5lxtsvbaeaei6ars605d9ry5rwhxspns5fflvbea7tp8apm89ievafo8xtxxgs8puitxevbwpo108zv7364e3yni5n8xjnjk4202v5mh6ykr0vo',
                flowReceiverComponent: 'vnugiwh1gph6tlstssqygjlhng1yazd3pm6aaaa6wddexw33mknyja1umq4jy6be1zpaeilkrpxygea8aardedxk1yzhabp869lcn1cuud80zots9olgtxqmff4az4vu9jxqijhc2qinuldqbks6b3s9umaqplr6',
                flowInterfaceName: 'xw4re4kb4j63a0jbmsn9684isz4l27za8ktkm1n1d9hlvolezgmkth8mohj24ybdyg53tynky5511owvikgs9br5kyuxv1n5bey61ai7oimakarkh3d4caj29t9zoi5fgs2noclha1jyhk1c1lyfyzhg016sv6jh',
                flowInterfaceNamespace: 'lmfhnxoe1a9449xmh4fx4jhvoseemsd766ks7mqrmnj868bya1u5sjn44wchamyaoknpb8ndeu0uo2desp61u822420zicihtii6i37ylegz0myh4061ddry8oevgcxu8kgsvsuc525ep9zk6ajee9z6p7ffmux6',
                status: 'ERROR',
                refMessageId: '4q9fh15vykc3b1bv8kf7xsdjcveo0812epn04qveeec2pq9rdsfwse10a9h5cscwji342tceo2ruqwqo0m51xn9wajte2gzx8o3978awgy3mttehd3635ddrdkn6agi4lvn0kojk0q3qw5ndg06fkr6rjb4el6mg',
                detail: 'Libero sint expedita sit voluptas facilis suscipit voluptas. Libero aut quia eaque eos modi soluta laborum. Est repellendus aut veniam tenetur. Eligendi occaecati perferendis porro rerum. Iste quas laboriosam nesciunt voluptatem dolorem non repellendus qui perspiciatis. Deserunt non molestiae sequi quos reprehenderit aliquid laborum adipisci optio.',
                example: '83r4i6nvh4iwfxgn6drlxh69yvv6sqi0aoehaoo0wiiug5vxt9vwot77sryno8zzpzspuoqj8ke677qkr9l8em9fnesd1pq6lhpd8v7bbbmqnkvq20jmouin9lxa7znzotaw5i0hjwbgbn2p4vi2hcmzn19cmowa',
                startTimeAt: '2020-11-06 05:40:08',
                direction: 'OUTBOUND',
                errorCategory: 'md3e9qdmw23ezfos58dvywgfigsnzfddupyf5x8d3xmlmkkc4h0mzfhzn86ih35ncyow63tjrstn7s0h0adpl9dwuksewto8umggybge6sbzlz9aazqxsuo72xvapwbb8lmh4og1mqko95xo3mzvqfkwn46l17cq',
                errorCode: '2hbu5k3bx5x81qvkwn5sx3a2phte8hwfvpc7r5wnzp6t8ibldk',
                errorLabel: 144524,
                node: 2233982557,
                protocol: '588ei7cy17qh1y9em1x2',
                qualityOfService: 'u1pj2as7s5rngn0o3kyu',
                receiverParty: '25xpce9bm4ybife3k9erb6upv7paub8hbzrq9l6uvr4f1kft0821ulcptcv4z8oempeh1rtdk7fposnan4y32xxzc3mwnayx4kxymi873lgl0duxkcw1xl5bsvr9tpm1w4ot78hyj5mutu09and6qugim7mjnvxu',
                receiverComponent: 'ihyknofs0e09pyxa7u80npaysldyrcpzfj9esrwrs9hykrk35qguxzl6dy6eepw5rgnod5uaweh6k1x7wgkvk31v5v4nd0v72jq8hgycfxlu0be623ioz2l2g90kv2j7uinbwht8n9lb9iprbmc9xr21kswzv0qzp',
                receiverInterface: 'azc8kn9nwct2uwwsipur6eb6xt2w72513jfbzh9p0erxfoxlni2kfq7trsa3pju8f61c6p2fsfwwb7zvhzpkjau65v4kep285rjj624irzbjqpeqxvytm8xeaq8ch4avz9w4gb4v8d77cgtyzj10ki1ocdvwd392',
                receiverInterfaceNamespace: 'i3mafn2te9hk65wsgh5n5tko8adruvuobyotxc8z2iuj5zkdxswxnu634uvww9pcv1spddt7g20hsledlflpzebzu9hthf78v67vqw92cao85i8gbmofhzpxw3sla2j8xyk5rts1i4jh6fpk9di1da0d849k278s',
                retries: 3075760570,
                size: 9823005196,
                timesFailed: 8138108180,
                numberMax: 6720417520,
                numberDays: 3674759068,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '20ajccwq4sq4bxmj4n10xtw6yff1zqftvs9scjtj7jhhtvkh6n',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '3eqeozkq9vytsxjrparv',
                scenario: 'qcr4byptefbbrc6sewzwy0dv4yzh1qd65tc1884dgu2socw59tjjvk8aundl',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:42:16',
                executionMonitoringStartAt: '2020-11-06 04:31:35',
                executionMonitoringEndAt: '2020-11-05 20:43:05',
                flowHash: '6x8p29xt2jw20qcbted0omjvbt07glqzz1z582is',
                flowParty: 'oylq95ji44c4y0cv1xbeaf091iegko2pcech5rpu0n4q1kta62jylxolqv3wxvq6iqne8lsh9p1p12p7xl71wicw8h7od9yti54kptobfxpy9neachfs56t3vwpt1y6n9vc7lkbds22n81inaq5vgozeawk2l0te',
                flowReceiverParty: 'pd7e1fofqzsw6tjp19ad1ggcuehofezulkmnnn2v8sf2z56sevcg1y5sgrx1bvciwmetu424s4zf1sctszrj1l30zscky0oslbv5ubmst9ic20bkgxgmnvhkxrmfiovvafr36gn2li6k4y2yko3iay9vcr6ekd3y',
                flowComponent: 'lbvspqjap4f4fdwsge14f9p9kfsoimi0ua37dc07e6fw0s9f6u0tm9mnyx5owj4eia0yviol3vcrfvimw8nby3g3ccxdac4m3mi8qmlida97gs90bg0s3x1rr0phmhabcnu9q068ym16y5sw8buicdcxbtfzwh42',
                flowReceiverComponent: 'yi9oagqc1weijlj9goxbw5nso9pc2py7qq8l5b0mixez5cqdtf90zghw3ba1rymkxw2yeqr6g4i8hto5elc26p49egw2l429mfpko8wgt67fbrps3xrayzu3w8rojhb6fje49qc5ov7mbloyk1vqam9l3tjkhrh2',
                flowInterfaceName: '4iriqvzc1bgq4ycwot92arojf4mihubgu65ckhgbepnmxwr7gck5ce1nzq060zbj7dt0fdppivfgcfd57zcvsrjf3oz51e3l9khqtpn2tw2xs7t93srzd1mqi9lmjkncwnp2oaopvq4jcrxjzbdvofkbf0vqjgg5',
                flowInterfaceNamespace: 'pi8xmfmu4cgtehien9yfywz6oqw14x1366gvzxfx72j0uenynibf16vj2dqdovx03m5p4hcpx7rhv4f0l2vzdv36jgxw104lsu50zy8peyqdxemgwpa97q1m0dyz9wv0m15c1ba469axvcyxalnk6ym7l10nuih8',
                status: 'HOLDING',
                refMessageId: 'gk2bh6iyxt4i9st0w2p4doghswowcgczo1leolsre1o0dnq1d1p0hc3vqeintpxyvd0jn9l5ueklbk0systmrhv1nmoihhkrk7k39zs2a8j62l4ahwxbjkruzcbnn1eudizzke7piqjuqbkjhmkaezcatwtf3unr',
                detail: 'Minima aspernatur ut repellendus quos voluptatem. Nihil accusantium est quia modi animi et sequi molestiae minus. Est voluptates quis eum repellendus quo ut dolore.',
                example: 'y82hncw53zmyp5xpnuswb0i44ngnm0us98gygq67bksd0lwwxjaygfl5vcst7ollr63qveumvssfsmwsmfowl5vmlj90hs1n3sddf3rkgyef4x7h7rjdb5vu9ke8dn7o8b0vlhrbnb6e5cicsvs3gdxqo3batiyl',
                startTimeAt: '2020-11-06 10:30:31',
                direction: 'INBOUND',
                errorCategory: 'yo4wfxdse05n9m3a1qyqgwifpq9biszsjtl3u4v7byguj9n62sl501o4gjquv1bbzvsod2ab5mpemke1h7v3z91qdzbc7ti6b3l8l4y16hqlf2vc9lmr3q2guewbz2ibh3dwe0subxv9922e1agysyuy0we6yqeb',
                errorCode: 'n3afbds95bknq2hg40u3otp256u1ehylsn2icpkbg3tbxyud0v',
                errorLabel: 902250,
                node: 4808256781,
                protocol: '72j35ofvgco7gne8j38r',
                qualityOfService: 'aau9dsbhg6b6x01azay1',
                receiverParty: '1jap0lnb4msstkamxan2tku3j0mn78fatp3om0h8pxfvmvdrl1x0vqetv9dtvcj7nuzcwap3w8kn6r3cbmyl4e8kbchbt5phs85kvydxm9n4xca8rqsq9fplflmo5kfap02nf9su71wowxlzl6ajhcuaspfjqomy',
                receiverComponent: 'amd8w7r777kwf4dr65zj5d7jj3d93osp845hhoia37uva7clqljx0o3d94mvqi6uueo6pg7te1za68ph6o3udqiei467gqijq0beqvz57pzg0vkzga7v42bfj4mcv7aom8a9mhxtcz3qikq87nil9ztcqoc4ye76',
                receiverInterface: '4er56m8v7kvedzzk0dkkxillmqpr7jf5z9ly02v23w78r1h6ceus8fjfj4cqw7c6rxy3jz9xgv7sfvsg50etcmmlr7ndc9nb1trm1cwa7c9d7bhiiol1lpixdx7d98xf2v9i0ka6rt424xwc5b39wtoy0vo9mckx7',
                receiverInterfaceNamespace: 'vjyyz7z25n3hcu4v8jm0o3lsd4sc7zx8kkz1o7l8we4dtfqkmbrkb5erfe14az0dbsrbsq95thycqup70j2okprp7jkpdbvubgf20nmo4913vrp4r1bpa3dza3lq02i0qu1sf35blz6s59va246liuqzkv1ih9ke',
                retries: 5453507623,
                size: 1376127344,
                timesFailed: 5801333293,
                numberMax: 5564138071,
                numberDays: 7703831370,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'epqp7cto1d7k83080td40jos1iel96dosc2fm04ujiftj5ru25',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ofnf8onw32rmtj8yoyhz',
                scenario: 'fl2wrigtg80kk9u69biqz46pqa9r7lzh1qjizk6w89ng3ptp7b1izxmn82ev',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:08:28',
                executionMonitoringStartAt: '2020-11-05 18:11:39',
                executionMonitoringEndAt: '2020-11-06 02:39:19',
                flowHash: 'csmretudtxok1anu2488uiincrurf4asbrbvn3p8',
                flowParty: '8u7u5fam76xias8e2bwsl0dc1g173onjcja6rg2rzuos1bnn4wm4tl22jl8x7216wlphz9rv45zx4bufqgndtlnbgamdnr5b6g3wsz54zq0kud2phsmt1b6krz700is6jml816k3jjmxrcnz0qf7a2nltimme6vv',
                flowReceiverParty: 'yqa0z8fwmygyvoisyrm7cxprihnmzh1srlxjoyd14bv43y880fnk07d5wp1m1juxb04p5lruja1st08v52zh9r0c3kggizrrkudf2vp5xw1f9ts4uzt471yuupe3u1mru4q3gq50tchiurko70xvum6h72i0sjk7',
                flowComponent: '2ya9b3sb7dm6k8w5kia785d94n37b3bfrgdagpb4opflm8p7930la1yu0soo185ta93ufyp4ra4gac64b8dr2hxpsvyl3oi2k7yo2v0zs4rfgnlbu7mc5oay8zt8hip7s5nxws7o1tns5qce1vyrlsr8ue45vard',
                flowReceiverComponent: 'ql40fp4yxtz66rt66bkely7tzu26wpqqkr0lvk0dzmbkcrnxrz9d9tx2d6li1pthxkw1wuvi9bdni531z5mwq8r9qh71l4wpcwpr96drusezzffzb7ip17m5o69yxpouilfbab9fmt6802tabyhqv5vurk941e8d',
                flowInterfaceName: 'xq32s7rxs5oiu37cjjlaez6huu1n9ciimvr3ncs8yyxeoovszuyjxpcj1peh2swwe8pooxb9p321oyjz37az9qisl5dw9dk3wbguux11ce2ve18of2ofwozw6obhmrmxoeuragu4x8qe4dkd01bcthvex965ih3d',
                flowInterfaceNamespace: '9zewzcdvphlfq4j2aue2p9ip88jgtb8ua9it19btek97zhoxpynjsgivla0kjpjaaejpvdklysruhu1mrd5m6tt4zjcxxuevct40gyk0gelno72p9ndadtzta4c6j0c1n7w386e4ei7xcf1ryc96jmlhanoy7i76',
                status: 'HOLDING',
                refMessageId: '95fzridx4eoig4xzngl5anyubm3t1urvdnbi1nq4phurye7zvtekv2vg02559br5emc17qlkprcxglxtjpjk2nxxw3v6qde0nparpa129867d0gfziar3klglcvfsj0ffyfe2gag4bbdpdw59d1m89pjlfjqwisg',
                detail: 'Deserunt et non laborum. Rem aut id. Ut fuga itaque occaecati fugit. Est similique aliquam.',
                example: 'xhallqp51kf49s6ixu9d7k2jyfsuctp4hh7agc4rk8m8quf7dvtfcbahj67uh6z55rcthre7vj2z4ed02cfwmktnl7zpk07axbcjz6uaog5wn4me0n24g2wbo26vry7r79h5ap45rdxgqw597qrxt44yoszxu0zh',
                startTimeAt: '2020-11-05 13:00:06',
                direction: 'OUTBOUND',
                errorCategory: 'u8f6ceuzc58ti3oz0c5b0a2fdn1bmprh622hykilpbli36uqcvuegwen7vgdewzgme8n8x9idxyaoydhmdrjpkqs6w5szihmh3m54totcqn6nyf003308pqehz5e7y5nw03go0ixgu16rqoztvqp0hzlaonpt14z',
                errorCode: 'beawktmlbmyjsstnylwupg0wnr4atoh2r3pga41yp9etm5eo1u',
                errorLabel: 854466,
                node: 7245089584,
                protocol: 'wmh6lrlkk685j2bqomr2',
                qualityOfService: 'xmlenyf1iqeur8tmoc6m',
                receiverParty: 'iyv85zi90hiz870rzsppuionbnpwdo0wk8sj2fcbun7tg2vuep0q180f9vl4vf2tusf7i7vjkqjrc8t6v6s3wssrcerhbsdoejuwsn5idowtym8c8ddibun88q6cv5se0sjtui0y9m5n39dgz7lu984xc2dol9kj',
                receiverComponent: 'zhzltn5lg2z3lo2lxp4dztko589nmetfidb369pltuwcswdsuqk36maovkhwqazpvdyb9qa8zbvz0tah9j90pftiv0074974b2lk8b6vg40zqink5k2bgky1djjy1yg9ja7hnqy0rm8vaqrv7yomf9k2n4ycv606',
                receiverInterface: 'oh09hiqgr9gsire6rmnaxhntnuao84rguhp33kpwbo6w0t4yjk83nzjotfp84877clupyrkip1c9c0a6ipj8oh8lx1t8i35j8sku9bgiaxb6he7wox7haqegz20set6xrm2fbiqdta2iuprkcxb4s9n5hgn2uge9',
                receiverInterfaceNamespace: 'mpk9e427692g2nen6g0daps3v8zboyicyh57ppdpfp0g529lgz8qvcrubkzqmgn3k23atwbgpzfif47478bq68oysymfkd4hneapqorqhuwp8ta62kfe81uzkvh9fv1t11ukq8r63el708lrvanojn9oz8v6tqefx',
                retries: 3692740617,
                size: 1911468787,
                timesFailed: 6830906684,
                numberMax: 7087544870,
                numberDays: 9327601196,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'n6bdhvtg5bw7e15tfpkd3zx7qvn2r8v2v34nxqn53bjbt18r0c',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'njmgi66peoaygigadvkn',
                scenario: 'bg4qo86248o7a3a2jxazkezl9kun9bj2b583ilw5sq8y2b13fs1kyxlt01gk',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:41:46',
                executionMonitoringStartAt: '2020-11-05 20:26:32',
                executionMonitoringEndAt: '2020-11-06 10:48:57',
                flowHash: 'kn27h9fn4ijgqbhz5mvxtqthglwwx7ykmmctbnd9',
                flowParty: 'bujat02f5nf62fzcejbjagriw6s6kny5nduxhso99sjkw3ck69qjp6z5r4fnagvsini1issdp4jzn0f4s2vvifj0fyhk97nlgwe8j7u2omgcb7ozhgghm7g1aimcvbhjuk01ovjvhsvbp2o5o6ciowwyc9lhyq0o',
                flowReceiverParty: '64pq8q7cedaq2urbbyf053nao0fkoyqy8zynbyher0ozf8lp05vqk4aj39g8xfs7f9ggsz3e1kw7xltrnzpqhkgx8u5vmhexke7kdudblawa6tenv9et1fgkkv1hey2by22ntc0mxrpkhsysui4za18s4q77lcpa',
                flowComponent: 'imw2ed28sdk36fpa5xsmcy0lwvhukt7cps8ywtgo64iwjs15rrkhiug8z8e1bd5ersuwbfaluute8z16t2slia0up1ai3pm712sggg86focf3a39b0xuej0tvdnvphh2ql273v0sviau9zuj4cov76nw3n8zmxki',
                flowReceiverComponent: '5kot4dpqfs3eyf3bhaoacbifgo8i256t3n08f7qhwmi9flxsd91gjvxd2qzt91whwo95dfp4xevmstmfxlmf9o6971vqxgew424ohxdg60vgqyxbu3zw9f160slcoiw8aefh9huohkxglhiwa7wleosvstd5css8',
                flowInterfaceName: 'c7uai74w8v8flp3x5n4ttd1lkdtfbx57epwavm9azat4kkvyjhqfikakyebzskc28hb301eaj3iativdtthfg6xfy70y5erg65zd0y9yblu9lf7y17d5rsc1veb5nodcsxfuk54mcl69w9sit5xe88jrnn5o1ip0',
                flowInterfaceNamespace: 'n3ppvqg3avt6had4c8l4ms4bpj6z0vkrh3cfr1pygscc21vjdzlocarhicu72lt79f716jh0w5vyjt3qlb6lpusmue1vxfv4unsx0fmu63rzpb1197bi6ghvix27hj058xvo9b1j27ykwz4vwa5ff00b83psjhao',
                status: 'CANCELLED',
                refMessageId: 'h3ozfvaxpl78vw2frk2zqtv5ix7kj8no8yuhdsobnfzt1eibsgvuce40ea7hhrkd72sqv9p8g8a9rhoy9euwjy088olo3q9ezx5fne2vgoihaxungcxaq5ypget9gitqqj1bls3lo54iyrtkzbnusvabg5fxcqk4',
                detail: 'Et ex nemo aut doloremque possimus magnam. Voluptas recusandae architecto. Voluptatem id porro vero.',
                example: 'g5b1f0lzysbrtev0w7zrm7zt37okeg08psdv13dzldt2sdaggjl1rm48b90ho5nhijzbhb25psp4x7e1n0aiu9c7eumv4jd1xezha95n7mjxdf90kb2h6obgw68ataye6fio3lxkf77hseeqb54xrygfz1556wwi',
                startTimeAt: '2020-11-05 23:24:57',
                direction: 'OUTBOUND',
                errorCategory: 'd20rpiexkxxfexmx9z6c0s5r4irszd3awwgzs6q3ox2psotvoko5v50yy6ppa5li6k3md2dz7w4wwkcap7ynjuatjul6291r8mkfvyh4rr0op0jg2hnnjophixulqbtmtw5te894u6fkeo8tadvy11vbxtkpfxa5',
                errorCode: 'op75fa3yuu4azeh4ydt6hvr66wiibr71y0gjnbz8rvga9y8qvm',
                errorLabel: 826436,
                node: 9239155397,
                protocol: 'el9cnrgh846ne7qetggr',
                qualityOfService: '674eqb6d4uvf707fdpgv',
                receiverParty: '20ufvxw1tqm839n8y99xs4xq41cjlfcc6hv92c5xl4ymdaz9c0w8j4mtevrelv65t1jcvslhazo1yx5g0jwq14hw0rywko6ox54fek2moaajqywkvti9cq4t2zbyvtddh7xx4z3nvepu2nramc6qw1e60v6osxei',
                receiverComponent: 'qmyzdrbokah8tliqo5bjbefl2q16hzlflctf5tes3i9kdwslnsurroyt1p7p2rvlu1zx2721ns2ny8chlj55258jsf0oje03x6xgtp6ovj2pj948scxhx71n8waa1tu2g6ca8l177mpvba032dyeteoy8dk79zv6',
                receiverInterface: 'pkk02fvfe5i5jnxoikde6vna1llz8m01a4xf92hkz46013sa98dydamnz15kh20hmy7vihy6wnl1xqr06bnwdxqx163sbr0epugdydqejdvmjf4b9itrltrco4et8xo73eumewpbfx7g6vwbab0ygq4jw4haswin',
                receiverInterfaceNamespace: '3vgsxl641hxsm651iu1wkromqcc8t2epym01csd3gddeql2cw85pftx73wdd82mkz3r35mmbil4gt9wjpb06wm0d7ntinn1fikquqs5ehbuc6dtjsndog98ji1ok8ebc65i9vlrk6js78sogknxl2tf40onech4y',
                retries: 87484093594,
                size: 5351697771,
                timesFailed: 8851756483,
                numberMax: 5038112703,
                numberDays: 3237733261,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '0j8kcxx16zt5d6o9r2zy279molly2nniwx25acvd08jz66xhyw',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'pqlfsprhvbdtngwt0lh2',
                scenario: 'ex0ugjnl4dz8nn2ye7w2hukxfv3vnbnv7nf1772355leccs9lcx7hz3lwef8',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:49:39',
                executionMonitoringStartAt: '2020-11-06 10:03:07',
                executionMonitoringEndAt: '2020-11-05 18:42:35',
                flowHash: 'asrufnpgeuifppgp5iv905gni2tee97t5hvmysk7',
                flowParty: '53ja1mn2g9qyx8gcjle6q435p8euvn0hha5wpfvk3sg20jdw7e1u5yiv1tx3ryvebrpesjm86ph75z9aegd4d8ixng5pn3b6bla5x3rsqt54bu2efqa3uud182hztl47eqel6wbqmuqp81zkq3i6kj39f1i7q1sp',
                flowReceiverParty: 'vvcvg0lx1qdowex04eu8oml01rms2gtrufn1szumiwl6ixo670ag39wcoxqj3qg6kwgjpffbwo3xmf4l6eorxjnwftsp8cs2dv9zosdcrmihb89yyeyt9fleg1xpmy3mhy8thn2kjxs40mxraxs25hhh8sv1phqp',
                flowComponent: 'ky38qjf7k7dcmhb7gjfrsgcnw27dogpudy63egfkijul3o5g4r97n4k0ephl0ekcrpjyls36hmzp9jz0343cyp8as8z5ivy78wbynnzdvog6jh00v3fjof72fha12nm3vh8g7ki9t6ekczg9373ftopl0ulh1h10',
                flowReceiverComponent: 'gfl85541t1nnnkjeik0bzq24px5owq4zxjtqwnplepx2iz010gxc8oisj673g37ldtng71jswnlq8il6o7uoe0zfr2xx6eq6gzbm4n7yif02mn8g66tz7w603dd6t4sf23cb5dodxbo3pvp0mdrp3rh2m2jgidy6',
                flowInterfaceName: '68t1cvpsxg1wuic9id3lx4jf0p38i84ootmsr9as9n52ct8rskxsw5vduy4ch6r1expk9bk2dljuyssn13j8msgdahub0bnp55lkpcif46ur3c2xtbtnyiir13abpghgr22um7zfk5hvchk9f9akzu1r1lq397f3',
                flowInterfaceNamespace: '8y88dfmf1u77zxxtnl1k6foe36cawjxo9ocathj9vo9lb6j1q540tf25n65tfba9sxmywhqgve25nplax4rlgf580gibkq0wua3osm36yo36buo6apuvs79lexkjq3z0uyvr0dxotkz05ykouaq5j663blj4p6j7',
                status: 'ERROR',
                refMessageId: '72r7ucgsbu805izhiqognsez6gz97xpy2l9vtpmtwceca2aea18ks9nqgvcxgpyaw68tvgplgpvdjeld4kcumltfmv46sfl2gtrb4f806ufurlefp0fx8a5tr0b4ksnhshihv5yav7qq6apxsswmyjoclnjuoidl',
                detail: 'Quis enim possimus iure veniam in consectetur. Occaecati voluptas ut nisi odit quisquam voluptatibus vel enim. Ipsam voluptatum error. Est explicabo maiores eveniet repellat at ex et. Ipsam vel vitae aut delectus ut. Et voluptatum illo deserunt rerum sint eligendi.',
                example: '9hrqwjzfdvunm1xxbmvxfl0ovq6vhgzndc0vgpugv6ik5v9uft3lh5r363x6yz8nurqoh784d363ij2rwcnp3yvj2yt87af7q5eukwkunhc6hrer0el94b5n6zis88lxqt3xl4x4go8tkic6aq2nri571wn1f7en',
                startTimeAt: '2020-11-06 08:03:44',
                direction: 'OUTBOUND',
                errorCategory: 'm6uwbamm6kc10jexb9uriu0v2vbl86bve8y1nn9yfhb16ow96vcz827hlfa2zmc2ihunhy4uhr7y7wpap2a0djlp3ekuawyfjjzf6sjouko32q6k9vlo5w9o8zc68z1rfmbq00p4d333ztvvunumyo1mblaofy36',
                errorCode: 'lig9yum4yiwleu7bnjmemgjwq245ydwon8fwtib3eyal7zibwm',
                errorLabel: 705339,
                node: 5018807604,
                protocol: 'xpu21dovaf6n78jeze8d',
                qualityOfService: '1e22sckqysexwks10plp',
                receiverParty: 'ldkrigj7xsknrgsfi4sa9zhx4e6m7rrivnuei83s3p3ry0gz1chdc83d3si8cx59smrskyw428h8kdsqk8fuw8gdvw1f3t5frnk39krvk98vj04stq86gcdqu6mzsjzvyrjvc1u1zuv8515q6obw6dude9jejh4p',
                receiverComponent: 'i73ok126hf29tgxj8qdgay3srixrfy0px6pfxrz42qqxfboxy8zimgj3w72ebgbckoekzp6zouai31iu8ubb2udc1k3qgnmcodbrj2o35vttos3loc20a6bf44jtppcb0kwnls8rk12godo7cukbomvoev9ipyjx',
                receiverInterface: 'isjpcb27ss56acl0o9el8dx1mck868uyvoq7287704b8c506hgrqpevvmlofmwv37e150ls46i1vz84vrdgrx75wu0f187wwl2d6w7bu51hgiyplfhi6jb47faq2fec2qf6yt0w971w1fx0p7l0fo7jo2fh4rult',
                receiverInterfaceNamespace: '284riq2jakac3zq04x10r33p0h2spc0sqh755gtomx8jfgyff0whm9tmqwsz7cupwho3a2099ouoxaqjvybt47o8pri9r1joj84ff0rjl2dxvcfdzaxfg0aj4rrudkwg410jh216vsigmsoen7y3qq1d37z1kvhp',
                retries: 1629606520,
                size: 64289101103,
                timesFailed: 9932212487,
                numberMax: 5778126716,
                numberDays: 3715834480,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'a5r0fme83fsfv2aoniq5bjynnqgglpza48h8a0sll48bg0p1uh',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'o25t2g6nmrpc1lt12u47',
                scenario: 'l7ik95o92by6png638mbbeb2xu3m5u4pc9byyv5wcrzf9m0fx3em05o0feru',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:19:23',
                executionMonitoringStartAt: '2020-11-05 21:13:29',
                executionMonitoringEndAt: '2020-11-06 05:22:53',
                flowHash: '0ctpxwc95yd3fc6haz5f5odc9v8pipxjih6pvm70',
                flowParty: 'u3btmktco07m83hxbonudztw37bdjln8iin1zpv52sxqtk0tdru1gt9ct5uid8amlo48b4rcv0pnv5cptjsdeh0dhc46zxxaolqqnrwuwduuhi2682cb6wtxep513y6mwdpynrc4wi9b3xp72o88d8xx5eil9hew',
                flowReceiverParty: '0e57hrs976hne5gzx42lpp08fkrbisexc71toijjgxx4tza1j3g8sp1nppwmald1gebyhqs47kkl5wkd8tl8hty2gzss2vk707dm29ah6fecj7mbijsbpvwm8rblcexufp65cy317fz4oqzs1z39h3uvsjqa9zw7',
                flowComponent: 'vizxj2idk8cq5rn1g8gv3n3wuhzjtc9sl9osqdaldfjsd0500y6kkta06ftcfb6093txj9b1ps7vieue19enozdok0gglw1lpinwja5orp9jit7tm5f0raz4p0mlvxci92womc7jd2q2npibkatpnebtf3qznkrd',
                flowReceiverComponent: 'xdv7ge9nwsydht5j4uv8udr2epfbzbij5ov7il9wiygyrh3vb4y4ymleu9ibi4421o55a63k0m1albgcta43y5vcelae5mxggzvhg74ek9da6gdpcwnckb4r19wuw0trgv0yz87ptv0innkygh8wbbqp1enwoinc',
                flowInterfaceName: '0kaectfvowesldw9rvtv1w3n5smt1sn2j2ww058plu2f1v1jg9gd2mu39ac258wbhjvsd0rtiya1fbi4o2bhum0lf5ysj3k0u6vujb31xqb9wa6xcrn9ffh4qoued0su57tju68kf2aclsoucshz26e0ty75e8h5',
                flowInterfaceNamespace: 'u221pmp76p0qodj75452ndf25gichvy7bjh15shibwlhky6dgri4e267a2n907dz0sktsukc07m50ccuvr7kj53dqe4un16ia687mwqtnms3k7h8bdo6e5c4zbhhva93wz57fl48vs48agrs1bkw8g83ce5ubkgq',
                status: 'HOLDING',
                refMessageId: 'avtkh7dipqzgxy3baz5v6bk8lhry7q0tgpgmps01b8apbaccl5vpr1bg91o4xiuu5qltfelef7nr3pwayqz287z5ws0sk8sle2olrhhdamgz2sbn5p1z8qi6sbmxkdl8kpdnshy4u1b8yas7k3p23ph3coem4e7w',
                detail: 'Voluptates aliquid quod dolores. Et autem sed incidunt sequi repellendus fugiat. Reiciendis consequatur dolores exercitationem et accusantium voluptate. Saepe tempora error odio iure fuga magni laborum et architecto.',
                example: 'u2ict3be3z21t3vc3exe6iqrajwh01f99kajzxzru8wsvnm2zu7srzgq7fcjvmbvg6utladpkfv3bg6wx4v03jsbssc4isdefqckalzbei82axs4xy1xjm7zrebjz4vqv8ylb71s2xve0zuthspzrlpzmbadhqaj',
                startTimeAt: '2020-11-05 22:53:25',
                direction: 'INBOUND',
                errorCategory: 'wcndexvmskhxkwmmdy7cwdbgjmyao67lw059ausb5t7v926uimo66vmw040fvzixfcpl132dsl0hiqd070emsatrom5pfp778hnx0t0i4ccon1ddehxh21dh5ituk1cv5d9ksmy0xszq0lwtsjdauxx5icdcurax',
                errorCode: '1xc9v8dna8jw4rl30ts0dzfqlprrjsdbyauz3qtq7nb00mitua',
                errorLabel: 502489,
                node: 5462675583,
                protocol: 'zkkvdwgx4hijdeip5uc3',
                qualityOfService: '9krm34sl9tpxrh3qceer',
                receiverParty: 'fzeikd8q4qruswnu8i7xna6rvmwi9encqz73t5e35gcoyi7im1i3oxbuowmk3m8dzfil51iu08j4sd5uk32wkcrpokqbwv8d2pqqrtz6hdd154r9bszw1ppj2a1tn2p41ro2kowgz2sszgq5feqvrg6y03g11i0x',
                receiverComponent: 'u021phxg2yws6qahek2w8pnfviqpt1lgt11peit1bwcacg25gniiq0rrtb520nx50lyp4tj7hr7inzpcu5goep2ft6h2aocz047si84lqizowfh1k5inx578tktfc00wo1vvlmeoxyr6w5l03rg6hapqw49maf8w',
                receiverInterface: 'g5x2payn66kt7gxilu2rg56ibpqezkajc6bh9z6sl7pdwyef3i9l53o0w9idwakfx409l4e7y6jcc0evmksbib7nb3t4z6o5ighuxnima0793lplv97njjrdy3lip3h15bfyff4ygsubs0kuolczal3bi2aswx7b',
                receiverInterfaceNamespace: 'wy00s6uhikd7u6c6p1vhvkxkimjdnmcbgpfxdx80dthvc37u3y2shy7t5i0oqsty8f5qvitenq7yvgry9azgyy1ylyckbcqef9u98sxc4denjqgj9gvtzrda554zu2lvgci7blov5sxw1l2zm0n2cok7fdzsd6xy',
                retries: 4910943329,
                size: 4087732489,
                timesFailed: 67279148596,
                numberMax: 3539846735,
                numberDays: 9234864477,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '6d70io8pvqoj72pzkeph0nluatuf5z4gcarxd0x0u8g06zagi9',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'eksclhqxkifhms0thkhl',
                scenario: 'alsc7b1d4trflbnxbqxx8byup0w4g2wxe41azs7pytyd5d2sn58rilwf39vh',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 19:55:51',
                executionMonitoringStartAt: '2020-11-06 04:12:42',
                executionMonitoringEndAt: '2020-11-05 15:03:01',
                flowHash: 'k1os99xm6tq9e1weiv9uk8wnnvtn459c2jqxq0wq',
                flowParty: 'zz0dxvqegi3yid94ecnv17zg4kukndqjzwmkqf9rnmnplmap9figi1ky5jnb5u79xgfryfpobfahi1oqaz95f5ijyqpe78oos3sgkr5165ghl7gfs1o1nlqyo3h1vt0xe5nrjppr8rkg01i3tgau2s4lkdddrszj',
                flowReceiverParty: 'q7ru5e3kitcc3suzkaiooygyxvh7diz1jy0ec26ht3njsnr36svs3vqow87ap5umeg0oajg76zwi64x3bbltrho06i0epzpkbq1mqyrekwu3si9pdap3butmvcx3k25fse2qn71lyxjgmsvn4alqx13odtaq759p',
                flowComponent: 'ofo5e6aogyxtwp0vurpbrqvhy4ifcrnc65w3kfsts93q31pyr9bbd5clvml1vah6zzdcarwy9w7bk1rfqdeqzyn4j91lslew4ldhrb68om6be6eefu7njnh0cyvd51n413bcmg8juvtl5yio5a9ef5uic01em4gz',
                flowReceiverComponent: 'jebz8wmofvx9llsnfcuqoy7esw3u5arfnzswjmrwpyqf6n5hkoxe2jxt2p15jk7ah81xp7vpwvuqtfn91jpj9lxdycxom07tmhgtblwghidv10ntpzezzmvdenfjgxox6ksico1eouesocc5mynkpwwtygrija46',
                flowInterfaceName: 'yohwk3w8npcm1bkz6joxuqax80vo1iiadlv1nru5t2m07cmzclz3bznbkbaan6ax3755130006d82ot71neni8uixrhphuatui65gab9k70eo23yujxq8axkl5woga23sabje3ufhj8rp47oqfk6yi4x8fcwfjdu',
                flowInterfaceNamespace: 'lkleghkx6jm3fwajctp81tcg0xnhc40x8ilg8twjnh41d15d1ole8o9imhebphmuudm95ra1683jpaoy4qldcuyh8ufd915s8mt6l33rpnbkovkz9lb12l5u98o4ct8d7dqfyzve5okvdn8t51opfrmcg8xi9jou',
                status: 'WAITING',
                refMessageId: 'blvpbh96977dh2fc7djbtsr0lr6ukheh0nxqbnqeknog6xzr9g8mt5vbpnu2lh92clkdb7wuk65t3hmob1wtq6utif5nb3gwu4rn39j5i6fv6hq9bz44dph7sppbthn88punt3kep71c3n858y8b0hdosbfjf12s',
                detail: 'Temporibus non saepe doloribus expedita in eos qui dolore. Iusto commodi officiis modi maxime commodi aut. Ducimus officiis ut et numquam aut sapiente non.',
                example: '51qfx2kbmuluuxkxh5pw5g1o2biz6p1rsriiu53di06duahrk1pta1w543f8f3ksqp55eabeyosnc8a33c4bpbci3dnytlfbe2fg791vv74yji6jn7p1wwzkepwtia9dowhn3q29er9qk4ny5fn2eeiw11rq4j0e',
                startTimeAt: '2020-11-05 19:40:52',
                direction: 'INBOUND',
                errorCategory: '10v3g1tr7rdnjormaoh46x5z384aqu05rth1bt47v5sg2crkwvfzojgn2vxba5c3oungamzq297h4jlfi8a5nkjm9ffqjjlqph0obqucxdqfwdvudg1s7x5wfz42dxvy7zl9kxijmeat1wpz80q1v2fil4p0suyg',
                errorCode: 'm90e6s9xznqbejgynk9okc780fgdinqh4xbxm32f84ejmae8j4',
                errorLabel: 895212,
                node: 7084247356,
                protocol: 'a3ou4439fu79to4k8hsh',
                qualityOfService: 'ky4xfsfxc2kyirnw9b5e',
                receiverParty: 'os742xrxenunmle61ch0o9s2fxbb7fx0e4b8jq1546fruwqk1f4b195nqvvjhx2alfrq3m98wccdxgjusdy3tp1fg4gikkejfwv9cx04q1pkrmyym4l3erxn87dph48odrp0tccalscilp647ndfuryn6ck2ib87',
                receiverComponent: '1g9grio42zq2fb9o5ig1rxropav5vk1ejrho28bspfdyungdd46qvgyksy3dcdexa1sx7fyz407qhlfe1nnq9eo2jn40dqx9e7qr8o9rx08xcgyfz4tfzd2qot7sueced9xqp8i61pgbu6rosl6jdjtsuvtfnasa',
                receiverInterface: '0m30au2i6p3peex0dduk9y3khk1t7owbkp7iihqfts3yo72bo6s3zx2x1h40ppb9ywk2ejtoxnvx3lntygybqbf7eux9owf9ser0pg2hgzt5f896qmx4emjdlwqr8i7s3jirkb8cdbzqbkct9emh5tionk6frema',
                receiverInterfaceNamespace: 'pef89fouddalm48p3qwpx6wbsxpszul9h5hxakrth4woq6l1v75028axfp5mqmb1h9nqlyqfyul7dq6tl32rwf40vfe8nfjparhj2wgw21ru9mdg0ajw4rp1tpttcp9mmrtychp6qle8jjkthq4cu7eiwtzxe20p',
                retries: 1034457064,
                size: 7039987113,
                timesFailed: 2740389518,
                numberMax: 39716416919,
                numberDays: 2413283075,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'jt2tb1sugmi8jimgox36aul9kryrh54skeazsnsegdqszvscra',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'fza4lfp2ph37lwtd9lnw',
                scenario: '6b1gyczdwjzashoqvhmyafc42c2r50xoamjcl1pztkq8fjmd73wwc7jjgfa5',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:41:06',
                executionMonitoringStartAt: '2020-11-05 18:01:15',
                executionMonitoringEndAt: '2020-11-05 13:40:05',
                flowHash: 'zra8z4pylen22efg95wgt5xlybb5zr4vm1h9gdsc',
                flowParty: 'p16c6r99qrwuz4k473pvqki9o5g70o6sdi33nlnatultlbfnyegkjyf4ci5j6qzsfl6c8t2bj31n19vtowip00zvx1kl98w9t1vm9bn1zvxpxon8lt8fune7kvp24nnr89hbpdahuogooc288h3ce10p8s167a2l',
                flowReceiverParty: 'dehcytmnem7et309ek09npq7nv43pdoakketlgqivk5lhvamg58dpm8l70fputg3cmxj020ru7bfddz10e553til6002gkhz09ci8t0iz7w5ea1h70yxj37r9emphtrs3jr51fon006dyjgtdjan06jsu37i65rf',
                flowComponent: 'wql8dbkplqeuw0ni2yq1l75y41mr58eqix7qu02o0w7xlheztzh452io1hhkqkmpks6qgg15v53uzn8lap7o8v5s05gg0g8iaonglzo3v3yniw9vw7u8i4efb7x6tqop1dhbjqe7xbhkq71lyal06zjbpf8pbmgs',
                flowReceiverComponent: 'j8qc0muxi6h9x6d4zne4yt6zgdy546vid392tkutbp8gnxw25r0k9y24tyxze2zlhxitykz02qs0h95holdu5kgaz4u4z6ybllx66c6uejqiiexqc5eevnj76ec99kofpqpgky3bevm4uzv2invz8ahgn7275ooe',
                flowInterfaceName: 'oim09ugx3qic6lisyfxt4w5p8ah30dmrtbsqjrcu7tgeiiwb43lej76yc6nadw3dqkt4e05ziw2zc159nf0nbclj7q8cerq5gp9c4u8m2urse9t36ya3hpqkourz0d80ukl4kyhtjueadb7to7ejs289zcieatm4',
                flowInterfaceNamespace: 'fmfdpr3ulkl8713l802bcwpljaohns6vznafpdvtb8bdet3b1spp04srrotjfi3e7qh1ufdj5kbo512v4dpy999s7nprdz6l3yrinp38rvfpcam763sdq2xxvuvrm7rhxi9knr8ighdz0bwyx667pn0zfb8ytu21',
                status: 'CANCELLED',
                refMessageId: 'dwhjhi0qn75da8c7bgg6icb4myyqu2b8hausmdxujo5kza85envug8hgesscn9ayt2s61bl89a94g8tjzcretr0wt0i82wzdk8w5mjkxlw4liqhqh9p6bt3urvfklke9csv6dj784mh4eqhuve58a5cu8dkzajx0',
                detail: 'Itaque corrupti est voluptate. Aut voluptas veniam. Nam modi nobis dolorem earum sequi rerum. Omnis ipsam nesciunt et amet voluptatibus quis. Enim labore doloribus est autem quis ut sint et repellat.',
                example: '4e1wh37tnyftee8ouddcth7xj5kdo3s8d5dqak0pd2g1ln1m10aaq8xavdu9itaci5y575l5n5jj60n50inwhnk2u2l9wfjeh8di8qkontuqrmcvmkd7amkyp3ye1ewcq3m5811d44z2b1y658zreci0y39kbw25',
                startTimeAt: '2020-11-06 09:38:23',
                direction: 'OUTBOUND',
                errorCategory: '5exlm359v37o8nfxg6f99c1cuv7d4zu54kr8pyxahi1fqapocbhzminqrouccpzi5jnrsdocl9hyqep1i4fd3xrt9s1rk251jhf0mgphxzq0r0hqlk8or62fbzasd8l9xzhwdlvxxsv88i33mawvpad4cvmfjv26',
                errorCode: 'lk5t6w5bovyknzvl4j80wtf7f8v9lhdgso23tusuj2lh6xe1p5',
                errorLabel: 321149,
                node: 4920833640,
                protocol: 'cn4otqe7oeqotf4g7x09',
                qualityOfService: '3kcn8mlnpqhoenm0pyfa',
                receiverParty: '5fnwh9fangxhhvpmjk65q4qpqhaxdb7ytydsbg72oby6nufcirq2br7ehu02bq4p19bmy6vadcz10c7velpm2uqnynukktxbtsojhvc0fk6c97r6omlgfzq1ib1qk0dr9er67mul7n5sbw04nhw8yjhd8bl78f4s',
                receiverComponent: 'ca5f20mtjlxze94ufqoavz635wx6sye3xbd058phc887nsmu4qon6y18762ysnatyzd28i6rhbfpelnpt1v7orsw8sbamwfvgaee4dxn6xdiwjr9tcbo8py9fdzi16s5zhse1s0blle3rofcxtlo5gkx1fhrcd43',
                receiverInterface: 'dtn67nqk9ldfm0xkky6z1etzyjgoznbt1wwvgp4x34mlibloyznnhkvybiysrahes0l8fubmlkst8jtnucdpm0rug35zc9z5b35wux2r3jb7hjwzsl9xvdwt54ysspbo1pjf1lmkt4gx5mgc6h502vxe3djybdkc',
                receiverInterfaceNamespace: '9tn1cjgxprmo0zlouwrixlfmwq2fcsud653a4q3ubcju3d9x5qj77xl93dl5r8iv0125cdlre1ztgydr0fesjy2mq759fwreqk49kidchdy499v6q2c8xmk0kuhibsj2weosc1g8ttrktdkev56oiojyzwihvgkj',
                retries: 8366076055,
                size: 7996962220,
                timesFailed: 9019996944,
                numberMax: 4943219891,
                numberDays: 45339251115,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberDays is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'a4571npbh7hccnlua53whyyn7f9w85y4b71utifyn39e5os6tp',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '7vvdwrkdu948u5h8zxse',
                scenario: '0k3scmi09apy4n6denued0fpt2frbmshmf2hl1j1z9ty35azoim5chp62xuq',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 02:47:10',
                executionMonitoringStartAt: '2020-11-06 01:46:59',
                executionMonitoringEndAt: '2020-11-06 07:55:53',
                flowHash: 'x1o3oktonluwf5kcoh01msl1cbvnhi0mp39aynws',
                flowParty: '1eunou99q5inkm348odtira7i4f5hpklyrnjl74d6hhlgp3aic0etnvqltzbzl7ttxhupseshwut1j7h3m5tlpbiee52dobta3a96vdw8r9xayg2xju5yzs57kpj8v5u0bp0mznsynz48i5euq15axrvsbdkl2sc',
                flowReceiverParty: 'y0ij3lelzc284giqmg3jiinw702rc0766i0htd3p98euhdfow2p2y62iii7iagwuwkw2nmx3v5y0ip8inktfiuoos4g0hj1lwhqiqfq2kyrwi2w12a00lrkht0kwlqaat838g67e0ov1oodsw3vfribr7ahj0q03',
                flowComponent: 'x167npa5mi0o9lpotelzzyh51fjn2m4jpfm7p90i17oo1iuy2vpywaf53bf5h6tzdiwzpqsqvu6z1zc5ivkzkoy0vbspwcc86l7ef999guhxr7a63u6tzpix8t963iqpu5dvzbzoet1cvq8s2ec1dj0hr9w3o35s',
                flowReceiverComponent: 'w1isgglqbh7uqkdkocdwnrrqp7vku61t2h4bcf2581830y4byiuw2i3mif2h8ogf2odiqby049zw15sb8akfa07wloqcq7cz6wnz9pccv1a2k30n0dzapbkv0qauqimwteqg4qb8rjparqrw6njpptrqy98dai8u',
                flowInterfaceName: '0ukdbdnkpmbzawctlnd2nlz6o784e9uvy5f2as1r865g9uj6s3p858l2osoukfg4hjqmuxbox7hrf5qnos9ndb8konrd490zme3oqkkwghi4cih3fwwdf1va1e20oncr3f8nfeqyrngk1fjfj7s7csr19l9poauw',
                flowInterfaceNamespace: 'zigh725rzbr4zt70dnx79ff4ig1oe4sj8v08f6c2wfoxxvuie97dm5lhul4m59cqucnrtnw79oshdb3p8urm1b0q36h9vuo4qxqy8duzq86j63w2hveu6dk2sw1olppstwe7rq4ja7kt05gvkdpj9kzpooru83ii',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'c4t7zmaj5ym2s669yjz4z0vzfjmlwdmn0bpysknd451n3t8o5sna5zki5m5r8pseqat8uaikuqyxsu88r5styoqmjx7yv1f2dnjfwtukpghttvxxf9caxtympndh8mhp8dxwcnzdrvi907vvq7pk3pahwffjxr3s',
                detail: 'Vel ut dolorem quis laudantium quisquam rerum reiciendis numquam. Qui perspiciatis minima hic ipsam perspiciatis fugiat. Fugiat optio dolorem. A esse tenetur tempore doloribus. Aspernatur ut iure consequatur totam consequatur cumque.',
                example: 'jcxv7sn1ws2dwikcrynorgoycc83einw7xfdx3xu28dyfz735sr64a0g4sumnar7zgqhbuzrlf65ix0kyi9kt65287hdwed9pgdkljo11vuprklcdzfcu1au1y6wcppt5rx6adq86ra8q9wgyg3atgvyj0ykovk8',
                startTimeAt: '2020-11-06 09:01:05',
                direction: 'OUTBOUND',
                errorCategory: 'icq2o6l791lowa4dru9y9ovna6fdn8w3vknb7q7n8erytr32ajwf7c2w55xkcvkun5uwopypvkf4245fgkr25in4u5mjehd910xxv78j7exqf67b9pey9zh7pj2fkrt1x9i3hbijbro8uvxitkldctvor4pi8q86',
                errorCode: 'mm5mhestjm7jyib1iqlu5k3ldt8521f35y4vrbba9vdgzdffrz',
                errorLabel: 216442,
                node: -9,
                protocol: 'u2oww1rk78umetb8yj5g',
                qualityOfService: 'xo7ysivwdv6x8u41q970',
                receiverParty: '987dq31ldygdqrcd1nwfzv8lonftpd790srq6jxtuhpzr2lfxi9w8f951rwk3bdid1q4djzaswds68jhv9lw74yv82y9qqefvaxj5wr83lecs3t4ago58779gz1qbo47opmd30cl9gjbh8g9pugzww38j1y1qzrq',
                receiverComponent: 'lqdv2t7fl6g7h5gcw092s3m0wxvdfq8l2836g17s78x592vgfi9pokp7qct6bofhjdi1633y11pdb0h4xvk9ie8q2velb499jd8clmk5fm1vw9uea55b94to14i1nvu2f8lbxrxqfpga07elg973quusaxjp53gb',
                receiverInterface: 'q7mubqx9l9ubvxbjch2ih1y29ihbcks8alvgamwimcmut8m8gkumslz4pouhi958uhuyqdjuzqlcva5gxx3ar7zxge3dnyqs0c0hauurkg1cqflpr4mnp42v8289bgez2kf7chi20oa7355x1xlqe7k59uq6oijx',
                receiverInterfaceNamespace: '317zgex8859kljjof91w57i3q6xakxa17zu86exr2545s1jvrj8m9h65qtso0zupegm15f583pcbzjmrc50vt6xvm1jwtf2anli65whujahlctychzh80v1kizdrrpwi6c7swntuxv006us2qyn8icbn65dw2khy',
                retries: 7081488505,
                size: 4168607066,
                timesFailed: 8390748774,
                numberMax: 9407074526,
                numberDays: 8684785144,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'ioarztgcwrn57s9cc1ezrbcx7jll0j81b3gtzy0t5kv3zk7vdf',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ziq8iszb7pt5pbdg3513',
                scenario: 'm7f8egma83voba5ig6vvpqyi4rawndqo8glsk11krlah97041nijl802kaio',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:32:23',
                executionMonitoringStartAt: '2020-11-06 07:58:14',
                executionMonitoringEndAt: '2020-11-06 11:22:30',
                flowHash: 'zcbydbbqjec2fvzhk1ytzx7oql3oc6924r7iu029',
                flowParty: 'm3l3dtnxc4ue3k9rb8j4qw7t0dxlyjtwwrjs1zqtj81plfrit7vw7ohxwvhmsgzcxu3xuvhc5yrxvcjs5jk5ts4urarrdzv0jlfs8jjkk84rqtx4z37j1k3c42sby06884wu73yia38l9n18s4in7pi18ccjzy7d',
                flowReceiverParty: '6cwm8d3zqameoxczliu43uql254kfpbqc0mc7tb4mk5kgg93v1byjkfpax2z6qj6009ywzspxlafrvi8ku3obhpebmqmk5d0lsjfeiilphe67e8jbawr2aa3q9m4xkrqnab9bdl5ino14b7cjpla3cavcelylwxy',
                flowComponent: 'trfmbipbqclgk8nr4j3ningb8o0341gceiq0ko1j01dota971nyhpvi05f6nv0p3tem6zntcr5h98gf620tbaswwshwsasq1rosq2tuocmpppub0u730v8uzq8n4ckmk8rbdno0t5rqraer9uzujpel44xo07uwp',
                flowReceiverComponent: 'lf8y8hvm2z5xp2c3jmsug1tei2u68nllsvclvjis97mnpnwofj67wqokkp8hl32g7ylrdimy3ntu7wjva91o49df88qe3oobfmm80y07zg5z4shydmqtqqlp05zpvs2twxi9dzisv3pnxiuh7e3dnr9pz967ydg8',
                flowInterfaceName: '1hu9met179vc9irlhfe5mf44oe3432teo0cyjz40lc2xo33lzvdnn7gt2ktvibqa4l80gh25doss1h2t4kv70i6lmrqozec5ge2a5lk3f86poxj2sv9fwcvg3s2y9vctl7hp2oet2k4nqisd838d9sp3jmoquy0t',
                flowInterfaceNamespace: 'up5h1ne03gqi17raadxl0pjcmnwewwhc5fsmn80nefb791hyf80njffk5dnhasuz6d4cegzjy70z2d6gxaj46ri3zknv1kgt2o7whwjba8pze12e0vaujwnb6vpr17z5g1zp7arc8gqdc80weoowsf2w7kn1w67j',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'l8kd6zf5ycwsub11d90qms23hi92ouq9hc5hidzy9pdc67mp6orfhnzpo0xtzm4pun93wclalhthac0civvu5rxanwc825u1gp0g5291erfrult6v6ilgp9k8j7de2zesm2bqkwnjy3a2z00r0hv17jhxsfgenm0',
                detail: 'Veritatis facilis temporibus quis quo facilis. Voluptas ipsam in consequatur recusandae fugit expedita. Nesciunt sunt architecto atque deserunt.',
                example: 'vzkfy9skdh6555jj5hiwo60ggmfheye2ks49oyxdtvw7soi2x8im0yjdiy7895xqrfdljbwrsf1ku5699da910bpsmgeamojz00qp2mt6rgqhpkdipjquh0fc6yg00y2he6ryktmvg3nttlnkabrh6bros81pc8d',
                startTimeAt: '2020-11-05 14:07:02',
                direction: 'OUTBOUND',
                errorCategory: 'yuvnv57lfmpkpzkvux0u5z5z667aiflqanuc43mw4jp150o7x693ysy77uiljsqle24sx1kfqa0hcc9ihiesb2cdj9o6ee4m9an3rk836z60gdpwkjf3znrsogkedrvhyql6cvw93lxv9mae8geidx3us2qwof1x',
                errorCode: 'prdhq4owuju7ljufbd80cwcpcazxp3yh5h3eer7kpimkyr40na',
                errorLabel: 778606,
                node: 7286053889,
                protocol: '3b46o5zdx9htndj09vub',
                qualityOfService: 'of8ptuw06nylr7ptdnit',
                receiverParty: 'fz0f5vhsa3bvpwctt6ax1pp00350g1dsxdxwduv18vegqe7zwl0xqrdsi9qdc6u9t003u1wnnfjno35z08f7q4hly35eba915jlvk2rmsith4tpcvfn9jkhzj4orukcllvq7ndnus07qhccos32zmjnyvm9vg0j2',
                receiverComponent: 'bb029s2co2tzrfyuq3n52tt1kpa1pndz4c8mev2klfh82w2snrnucp5v8txzco4wed536yzc9qfwu2n7ekzfi5ytnqp9k0j6mg5nptuai7y7zua5yohnkrv4bpwkcv1bi5ottndkjl4plfq2jw5j7rvxfkrwvuvv',
                receiverInterface: '0hwn0i4rghe9bmrx9c4ya9dqa2br94gtfd4jmte0llp1q2ixnzw4nvq2aibkbr4u5a0zbzd11v6lxorss5s1n2th3h8mokmy0qvfcp8qd5uykuc418lspysa7s9f3e33a3b1zuubsc0hgcoqusnplxah37y7aou4',
                receiverInterfaceNamespace: '5ul2oph3psh8lmtprkpw0a540z0hudfvgwc1lcpzmd537a9f12y2kh1w46siy1lrp0oc4imu2bfap3oe054sqozixcjz0k7u08lx9jw0hvga29sjrc31tmdrabjeufnjxw3ezt3t5uznhl1xdxeb8u17djj4jo2l',
                retries: -9,
                size: 5664762699,
                timesFailed: 3810938391,
                numberMax: 2453369849,
                numberDays: 9424398807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'icog427t7xu6tbz4t7v0bfkw4nyz8baoxzlkriopw9qydxq3ce',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'gevigq7rcg3ijevsvblq',
                scenario: '9e2857wszktvfn2efrdn0u5keypw5jdiuesg8mf2s3jrhixfkx8bwn22u473',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:31:22',
                executionMonitoringStartAt: '2020-11-05 12:56:54',
                executionMonitoringEndAt: '2020-11-05 14:56:50',
                flowHash: 'c5kirxjzdjwi3slbx0pitnmijn0md2lm6a22d2mw',
                flowParty: 'q3vzmi8mumtuxb1uq2yr72b1mp6pp48o705g6kz3i69v8qs8c3ybh8jti6ui77t5olfqgdyv9hcdk4bs1xmcwswi92ce4i9b837zp9vsvkmk0fknak18pzs91b5z70199i6m0cyzoyoya7a8i203jp8v45gji7jb',
                flowReceiverParty: 'pdol2o6nwu348elgx2p24jx2bfte4gzgo8r9i0lr52tu7i2u9mzfefc6w4cm39e3xmhzrxus06wu2wlhgvhdt0mkfy3favxssoth0pa59oc6ewghpysgefkmap1i8gv60agjr6v1lawysbyso7cyd0u601yluiyg',
                flowComponent: 'l353z67qcigjpr6arp9s9gw1savx7l973etbvkqchjgyrbtig8x2j5bo11079vq223wddjr922akt4nr8o6o9pvs50glorzbr7wfalak83jxo2ce75dz1ajvqg1t6yv2q4ku82rt096c7lpi2hvwepn4y6ccw1pl',
                flowReceiverComponent: 'hwkg8lnosx4l5utp6m3ykqlej6b5meqhq2aqlhe4009knl9qbkhr5ewkc68j9aaxbcwj3bu1pm73v1qr9krov5ldzz49zdzceyw3r5y69fh8gpquzysehjscjbo7b87rb9jy73a8b95166jvnmvfqufogak4kvmt',
                flowInterfaceName: 'vkaf4m9qho29hsnyw8b33ptx0ldphzxmwocradz2wteej61x4zae0ij64zgmq6h3sfgi3wshfcjvafddgzvwd5z9zvt1wkr5pts7km4k30dvk786j3qzg9zchivkihd7lb6pxlhpjru24kibe9d3906lii359wcg',
                flowInterfaceNamespace: 'c4tdy1jix0viey87hd11fbzopnbtzefa9tl9loc5lz0ukp0m6mt3ocoj7nxgaq0jl5cfhhnc0m2h0wiia8j6b2qzoclwpbzm5cqvudf3k1ld4avom0h4naq644pizny3sasuq56wfmutcunvx1vjj8vfbznveqty',
                status: 'SUCCESS',
                refMessageId: '0d61qx3th7tjbpzcyvqdj8bnor1e8gq7k2o5w4l51xn8spc4gv2uyrcf58im8ha40xqsfaxn7bzenvtydrv0iiysd79qbwzxvee7vp88ti541xrvhyy3gvieh77ms5hglff86i26z582e0mp54n5zylck3cqb9x1',
                detail: 'Repellat ea velit eveniet. A blanditiis doloremque voluptatem repellat recusandae. Harum sunt sunt atque error animi mollitia expedita consectetur. Quia est nobis architecto error quia nam excepturi et saepe.',
                example: 'wo4sn1zvxwjj1srmtxgcxzak6cg73ad2164k4loum7u8ofw1nay8fcvqsw2njof69hoqpb953fj7p09y85o9frj026l2oxv1d7mjpcft6qnzc1i0wtf8p3qxhgy4r8fkfmk3ougu25t24s9lbvyn5bg6whqaxbfz',
                startTimeAt: '2020-11-05 20:43:39',
                direction: 'OUTBOUND',
                errorCategory: 'xavyvheum4qgdk3a775k4rc1uc3yuvww9vx51t42p2abtcxxrhmrmcha5kd5ze4ycp48bqs9rjxoj94adov9yt5c6gxjmhe16bq8rm8jg7oavxqb9tpzrp4jpr4v2lzqx4fma9ooowuky1sbg1nyfla301cgzi0r',
                errorCode: '3uqvj4cfcyr24p3vy0rlej7tag09wk8z36vw8crt5i179307wd',
                errorLabel: 866985,
                node: 1061129466,
                protocol: 'tswfjduug6dfq29o1fjq',
                qualityOfService: 'rj4shj0wlmscoq4tgmmz',
                receiverParty: '530rw0y8saxsw545bljx25yombz2t248bhja8n22rpocuigw2p3y7057blgrr73sbo1bev122jxpkqusd9xt5842a5epjn4xp18iilxw6a2tdcfrz6q3g0mt6zbaoprd2algawm3bo1vzzmyly0lmv1si3j319dz',
                receiverComponent: 'tv9ppy0gma8iill3mnstm88rq7tz7kcvrigte0pitrzhv028opdhiivg1d7nihzb4x6oys8k9x81kwepx4xa0n29gio2imf4qm8ywv4ibzg5nfmf14b37200e677v3uaop0vejt50pz7mctc4sucv1ixoaygeoav',
                receiverInterface: '8gjrbyfkwkde5v8citzqyilsyhnq7899q90220g5e2n58qd3fauccaynmf0r4v1j0ia70uksswc8hv31ruaddb9uguvahqjsz3faebo6u05ey4jj1gikchhqyqfehxj34egfsu4ne41nfnclt4bzi9727sva1uea',
                receiverInterfaceNamespace: 'vwdba6q8xaf0svww666uq3q05ioxgy42modx3ka66tlfnkz9aekfcwwud0iv0x21tv3e99intu7tboylxe7hje14s9f7odjsu9ymrl6snb6vefsc1d9kloajppufmcfs19c01y42i8562w25xe5cnt9ze91l4t51',
                retries: 8625436558,
                size: -9,
                timesFailed: 9116658715,
                numberMax: 8103273699,
                numberDays: 9598834705,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'uwjs9yhwyhvyo6n6vog1o4v55cit4lf8t2iqc7ko7cf9q37ntj',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'vzm765a9iavgn1fpfw6w',
                scenario: 'hvh7x3mn6xswjjckaopnns60rbbxla6ne7ncj3edp30zqmx7xq94fnwysm9v',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 14:30:38',
                executionMonitoringStartAt: '2020-11-05 13:24:58',
                executionMonitoringEndAt: '2020-11-06 06:44:18',
                flowHash: 'ucj6mwqjwgr2tdr4gt9qtktic1iqyaonvbhrx643',
                flowParty: '9z0cm8frc3mvddqnwkcabdtfv952lq885ldbcj7xrwn2kttf95xs4cg15ujza3p52w9nk9ua7lw85f08kqbd0ow84q9cbt55x2jgi34hby1654igp0ih6sed0zcex9kddjkea5s79y6bh8z3q5orstln769idwq2',
                flowReceiverParty: 'm4xp944fpxp1ea4tgjbsl83w4km5ynd6mkryz0ekdgsys4p1heqp0cmd2tr9o2he8h5wnwxc71qj6ndit7am1b8dzu059n2lzg927fxtvr6wfltg1qyl5flpronogtkngbgc2zchs4u4os1gq12ttkuhee1r0n1t',
                flowComponent: 'qiaspgc2t1zykl2fkfq7f173eak4lsu2mov6f1d44fwcl6p8l427dypmhkwcf506ktuffvyezns8nb51mucepeg9aes2z159zlg4ofkotebjd392pguuc7wm516x4lhjv24pm3shbfeasatt0qyrz2gs5o3egpn1',
                flowReceiverComponent: 'uoch4xpqtl1chi6p8upv6c2chsh3yzkz6o2mnwninni1mqbzopcbh68mjiymqoafiez3pf18n6bvkwl82stb5viq0nfzniwjnbc1hnpml3wfkvsq7qrje4d4j2v5xdbbcwtz4zndsc6xhb7s7guppfcdc1b99yrs',
                flowInterfaceName: 'ky15quvgeqlzel2qlvj6ko0gm3gv7sj8dn8o30u1i4kq7izxsvi93ajr0o5xa0kfxxar9betk4i0be68pbh4084xs8nfhev4ohflbf3xp902ge57vkiqf4pxcwu2w1mzp24lo3m47vy441fsmlem88gipoq80pcq',
                flowInterfaceNamespace: '772uxmn1qlegq1t4vtjp8enx17ptu9309r9os3ivurnymq5jyin4pnpe5glyo8n19fyuouegfthu3o6yv9bo18o5d9vnorydovy1ugfoa9pyaljosj67t50kv07hhn81qwgd243n06864idingdrfbuqo0gbe4bx',
                status: 'TO_BE_DELIVERED',
                refMessageId: '2uuoc36jzdyd0ooypjrc1q0sdjsrgi8o99e0nxd9si2f9sqq3niac8qgrdfpu7m8mvk6ibw9oq43st3g1356wxo3hftj9uaonp126mayo11ezdshsgt2lxe6mb3g7yysam3ea9ftcwtx228hm4izme8oyanw9isl',
                detail: 'Nam facilis totam. Minima mollitia mollitia quos quo non est voluptatibus esse id. Mollitia asperiores magni. Rerum tempore enim eos dolor sint ea eligendi totam quidem.',
                example: 'ff73bth1vdzkt0pfojtifprg9jpb64pgts1q12cwkszehhfklv51yx25c8eh8zf32so5w38nsvnvun1k45wcq7ci67wxzvedvz7qkxpkyi774ru60ckb6ekx6ulymcpjcofon1t44aisrbvokoqtmr0njpw4b7eo',
                startTimeAt: '2020-11-06 00:16:19',
                direction: 'OUTBOUND',
                errorCategory: 'pb9bibnhf5fuloself3iq741613yx6mpj0gmd1y8wtcljscekm5k9u1q6glm5j2zbggj8i9rbaayu0nnkt33fa04i2scwhawecgorga2tnz8c3s58thpix9s3q8d2rsd4x6e3r2cmni4nqyijo9h29sumjhytw96',
                errorCode: 'c9ojtqt0st1gy1ea1943gd2k3p0lz1o90ucoywtlvktluhoaxc',
                errorLabel: 414965,
                node: 4501852585,
                protocol: '2n68eschruc9hspqvf6b',
                qualityOfService: 'ot35bvpvuk1gfinlb911',
                receiverParty: 'ac1w1bzvnlcwg8a4f1yto0163jlqvsq25jee6z7qawhmhggkw4jk3t03upxzw5qosoz8juz5esdasx8m2ytvb9y6a3qu0rrclzsl33suz4u4yyo2stnl2uwhgckcqsknh4f41mizjg5loi31r7chcevvif70nhud',
                receiverComponent: 'feckggk2bdr476ufgjp8tmgi9hql30rlo0xnp9wwt4q2zwyi0ww0si9le8hf97n5r4w9hjc9yh9rmtqfvam4w8627h52c9yw3apxl3mqmh4ytu73cf7dz27w5vkjjz41bz0m4dgag8qr0g947i0n8xb9mb4ndqat',
                receiverInterface: 'fr7gnhiygrc5nsdk21zrbubc2k4g31cfakruc5euidsseeiwdbou9k07c74leqodws7nojbpio8m3shmjcuwhkswmrw0izw3rjii63vohr8nozey7aygciy0usiblpnqm6o9782huwlr9mrjop80ilta3e32lgny',
                receiverInterfaceNamespace: 'khsdamwqhws45sw6n45qcath8vmttfkp2skx1o210f2weerq4duk71he9vdrh7lqxpawyjb9f4fj6474lh49zfoedhssuzdwco0su55qtlfc723feiyuqvdi2qqn2gxax5hht9kwo76clxnb2p5vpkwrwkt0se52',
                retries: 5830398477,
                size: 3698213916,
                timesFailed: -9,
                numberMax: 8238130961,
                numberDays: 8670425083,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'scf9hhe2ujrbm4sp4a16vpiqv7678ack76pkqnvwd6a3fvic2w',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'qey3xtw0j2un7e7til09',
                scenario: 'k31o07stvn6eutv4ho4nmnezvylyiwev4bdikcgtnlki4hopfzrni78plbqo',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:09:00',
                executionMonitoringStartAt: '2020-11-05 15:19:35',
                executionMonitoringEndAt: '2020-11-06 03:45:05',
                flowHash: '80kx6tad6co0qlnr065ubu3qwm3flgnz77pbmq78',
                flowParty: 'jfmpjcb00frcu88f13c1rhpm6pu25v2ou22u7d1vgnk1ayist14003clb1qm3wr11oxbbbvh8pspc6yc7vvgpdv8b4hvt4jmwjnzm06lprwx0gkv2rlpemkzi3m74m86h7cmfd3pkh4srymcyp2wn3aj193pbs1v',
                flowReceiverParty: 'i1zpw61vfy6clm44wsf7v84ebz35bkcmiiyo80isbryk3eqeco2mxa7rywmuhxugs8lcnb25vvhzacumxk99wb74vqh51xiblaqb4577on9xatxekjk926s20478o85sxf8f68u5tljp4r1jiuy6yijr78wg0tut',
                flowComponent: 'w5wov7vd6p540w3buwgb8pxxulbrtu9j9gm3upz5e9a67h5kr0yvy8pr4v7y1im7ivj1frcxl1nt94e7jev15jhw6n7wrwf1hnhv2breje0cby81cvfvlzgirrco8wfvmvvmele67or40frbgxqi1zq0vwvpvfxc',
                flowReceiverComponent: '8698aoamezhnvzpysyen2a8pw2h1ge4aev3kjdjopx5uy1u4lzxr4ktnhio1xfwaptqb1u7s947p0gldke6kckgky1kqzh1ir0oosac55ca48gtbmkpkwb1hp8sj2ddonkqg8r20zjwuf1pe2rhorlf6fkn8fjuz',
                flowInterfaceName: '5dt9pwjfm99qe3rtwt42z76og1apf8sjvk8xt2qifesna6x6tqiyo0crzcp9w1y9k2e26m10apx4q3g79l8j6xtag3txl8ujy0wb2huh5ab8b5m8xpwnrem3qui5cefg7qgl2hrt1ru2etmps53ualmv02yrll2m',
                flowInterfaceNamespace: 'fhgczs4g8nlkre9i4y9h1xz8fw2vti53as381sekuezfdcf1pfu91nm02dh4lewoou84xlr5m0hzlflhox4h6vn9dv93gre01jsclh7ml0c9ktk0bl05qg2qtyxh2sjwzepn86pcyjtfz0ploksitu5io73dvw9w',
                status: 'WAITING',
                refMessageId: 'wzp3ga5crh8m5fkpfjibd0q133g3kh3i4qvc015p43hneotzeu59ynvd80mdkq11gou15s2b6azalli8623cuykispyftq66fjnrdicyvj6j52ww2rbm5sk2pu6rqvi2yi8u1r110yq6gyjf9ai0b6rq4h0x5gxq',
                detail: 'Consequatur tempore quaerat quia molestiae minus sed dolorem. Consequatur eaque repellendus officiis impedit possimus quasi accusamus odit. Corrupti et qui placeat rerum fugiat consequatur praesentium amet. Illo praesentium et a est mollitia magni non optio quia.',
                example: 'spizii1q6uzr9kg0gb9rfjwiqpr5m76gkm7kgxpivf23tdcby8evo3mc62l359k5fktv7w2cklvhcaln859o0pxp1jd0g2i4z2dhx1wzxgwddi21mu8wtv4dgjd9izl5ssttmwnj1g7vxos5ewnflq61g8l5w3im',
                startTimeAt: '2020-11-05 23:36:24',
                direction: 'INBOUND',
                errorCategory: 'qiiuc9ytq943oh4y6kohbr5e12ziqdk2kraovtxt2lu9d0dnw9lo7payx9at25i5fvxosbxyk3fcp5d8pudu5wrpf73bb17v3f0dypyzeunnzbx0z9lwo05puxyk4onaux377ijrneok1uhl819nyx0jwzc5zgrh',
                errorCode: 'r6ncql5rttj6r2p1q0k0fca5t99o7y9py42gq69n9oepaw7f7l',
                errorLabel: 301009,
                node: 5368061038,
                protocol: '107ertowrjhbuq2mtqwp',
                qualityOfService: 'cjgu3ircllc8b5euzr30',
                receiverParty: 'zagcisvegx3rkees8kyszn3ijcydvqel3bajr1zdgpcq5wy95cglmp3pyngt79rxbuwmg5rkv3tycbwus1pmvrngmynvs050cnliqgd8w2ebr5za7dkp1qliqkffrtds6eyeap38fyiytyz4k3i3boef8728voy4',
                receiverComponent: 'ucl8siaslknnwk0anwk4g7jzgiru5ov3wd2vqa0kn5b755fbqhxhzwcgrjpa99vjrmxrhm9no6y7tog3mdo3svi2cg687rrxry2y2uylw6txa9iq5jqf2vvu8pi04v6o08qjz7rq033mbq23w739tw46g5dlr7ig',
                receiverInterface: 'qhshy7yyjnvnbno4vnb9x9q3htyq4ald31e9s65om5k2tisiluqc8py9g90dlk0cftblcvwre60rmamepgfgbudh0ai3mulbpx3lkwqow6vykfw950vchaow80tqlpj490pqrjwv5abf7ofn06n5we6xeibfmbeo',
                receiverInterfaceNamespace: 'kfu586h5tokax3crd5wh26fbf4dty84l0sbwxoo60d07erna0umy34ny958oepkvutadgfhxwipwh0y98ay7m2w4tpxmjl07v6urnw453nppp56w1b6xm2it1ply9njs7240ivfq3k92qpv19955bq675upcytha',
                retries: 7851354811,
                size: 6084868745,
                timesFailed: 8628920781,
                numberMax: -9,
                numberDays: 8713762302,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '1thi9yifau9vw8qlf0lqu1agn2tqk6vum3zfp0ydfi47tcemrg',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'zan620i1tr5pngp5g0tu',
                scenario: 'ehgvl258wk2k9t95hq4qwwy8ogj9g51itr32l7iff99uweeowusxhjflir13',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:25:50',
                executionMonitoringStartAt: '2020-11-06 02:39:26',
                executionMonitoringEndAt: '2020-11-05 19:17:06',
                flowHash: 'x2yfs4mw5lm8a8uwq59wc5nxowar0fg4trqsrkyr',
                flowParty: 'pbxnaq47a28j4falx5oxvtoywdtccltkjcb44ya15pm0gef9pogah1k2ntjezz4m0od6rdyxss1yysi6co4rgbsxnkn7f7tmxy1ibolbnc1226b04hq1rdtwpgccldlsfb5d0neu9z8oxxzj4vx3guig79lbt4ar',
                flowReceiverParty: 'crhie29c7wgckihys3gbn2bi2ljz30b7s4g15boe2y3nnfgqvc2i76j20hm3jmw26dmoohq6v6dfrucy4jrewb7gb0vwuplcf3njqi7q4j75f5ovbxlsxp35pwhqp4d6y2tgzyur6akvc1y98w6e3ewsgsslafk2',
                flowComponent: 'scc5e5n8sll9q0jk5m60tnnoa145fqc1gqwz6pc53wzgozemoiunhwr3yatgsb8v9ioj1ajv7pu21ohjn8m5k37zu5wqmtjns9u8veyhs7229g2l847bqixoku61l3bf45qjzvw0dn4l5vghlqqiblqkut0wniei',
                flowReceiverComponent: 'mqz4lxcwt4u25gly8wma7ptf4oq2w1ozucvp54o1uwg82fpghlhk0o58sqn7p3gnwpjp09vjk0ns1z2nwyu2dzc1n68vjehy5t7mu04adlxcmvrvzkd394ntkbrg6qtva9qjvc6cf1n8nt6mkbzw1m7r5uh0af6x',
                flowInterfaceName: 'azasirk0d7sr853r4wmw5vjvcpux7ltn2gj1tzr4b3jvx6gczmfnc9miok57uhk2eseo60fdvid7p2jy08vs6ewc968za6yu5dez8sq5mnj29gpd7ccd7ecklzvn7lpf7w27p7edu63h2l1v5u6vwm6klqpox0wj',
                flowInterfaceNamespace: 'ahflum0qamvh758935o6mqutr08kdgmit13jolb21vincky0vj6lrzztahrekvbg3ctacjv4x4h98i3acbkbti8jlwc77sv4pay1jcad3fdzsdn80olnfeg3r6p4w4j6z3x6a430l436uki9vgufcgpk6zwfshgm',
                status: 'HOLDING',
                refMessageId: '3f5zh6sn83vee42owa7747aphxanrzaddzwvhtva4awanfrdcwmoeelcrz36n9hkziugo7br0687ls2n8iialfpu5bc34ydue7f4l5iase0fwzbnxl1nvji682d71i8jbpgg4xl5lm7yv58mefp1nl0v74ecphfr',
                detail: 'Est nesciunt corporis et. Et corrupti velit libero animi fugit sed qui odio. Accusamus deleniti facilis quidem cum. Consequatur officiis vel. Minima aut tempora et.',
                example: 'pc5c49yv3gfumwmgtp33m66mvg8j30n1ectzyukjjiloapc9e6mkub1nsppp6a7cjwj68ccx842266qgyw74m1zd4wdu9pdmzb5j89z2i22vpdlhbqcgdprlffp6mufqdpme8to40u35ay2xlry8u2jv5ydozx9i',
                startTimeAt: '2020-11-06 03:16:51',
                direction: 'INBOUND',
                errorCategory: 'ka91rmq4sq1w59swpr92aw2lpevlw2w4r7utdjrrxgr76yorsem6budy0ohehvsg82anutwsn42nk2i81j3rx7cij2gxx0130c2j98091yi0fs4epjjbbe6hd4675gb9zy19ze6eozaprfda47xce20kiy76vttv',
                errorCode: 'mn0cckjz65sxlxshiiikewmk6seuncvrju5widfg5bbojwk5n4',
                errorLabel: 992802,
                node: 4656620651,
                protocol: '6fh869gcljsufhcrxp9z',
                qualityOfService: 'k043473zkk23oxviafp2',
                receiverParty: '9ndg926d39o4b4ef80tnadapo0zenhrmzygzjffqznvj7lt8t0k8qc848rxsj5m336meyqza7laiawukrjk7x6jhz6119qbzls3dvt7u4txy2q4zg692of2v8tk6ds09l5cdy7qxnca9verwz9ww64g31u3t4fzr',
                receiverComponent: '5mlmk1dowvdall7voz27pxr4mlz1btwv80kslx0uy7zdtg5bwtgue89hede5fsvoyq8efs32klshal7o1iktc603t5git0zh2msthdh7tynfqopwtjsz2xgs5gwc8y407jhfbk1qskgmleg62eg89byobjtf4s07',
                receiverInterface: '4673cz4m3wrsea1c3d0g7wqqadqf2gqziirp03bb6jjc151xqhiz0qgdvmidgdrmktchug2gv5ax464pmb75r7akx5ez1mb818xdp3t7syhpnceycb3zox23ih2ixerog054vkm7qisu0an473u2i8wx0ivansdy',
                receiverInterfaceNamespace: 'k92gr6s39rzqeiar84cdheg0k15geabxrc5riqmm5xidtts5wwiim5m8kpp5k0f1b75yc2vkqdwejfmwwrar2jlxv4o9aaxiklot6m9klliul03pbz6cui587jnrdyjjrpu5f7cnvnh81tn1wdi3i9o0z0e7t394',
                retries: 5009573963,
                size: 8774391174,
                timesFailed: 6099983595,
                numberMax: 4382278626,
                numberDays: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'c0bjdeb202llrp8q82lbwjjkfoc5nq6i83yzi5wtgksb2xln5e',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'fyvf3hp3nz0baz0dfqq8',
                scenario: 'wu1qsg66dkbpbttav6mgcf7532vq4155xt9auiv1izcsm391kky8cnt8fcco',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-06 03:52:43',
                executionMonitoringStartAt: '2020-11-06 11:38:42',
                executionMonitoringEndAt: '2020-11-05 15:44:27',
                flowHash: 'kfjh955ts5r3ys8h0vydej5c3lkrj8v3xfbopoai',
                flowParty: 'fewz1o81o041kaqo7soml9vhbmqifqv3r1tfq7q5ja3ha7o7y69ch4trearepnx6dj48q4a3zohw3ofc17l9dush3l3i8w54z96i1eop3c2k96mcuuxdlb69qmqj2d434kw8nks7px16rjhbxpb1y39oybjmlv0l',
                flowReceiverParty: 'u3ffmkxh1bkbdyaa3tsdntx0mdsjblih5gxs5t4rgue87rcqmsqfiuhq4wf3y1hj2gf52jo2n1spr91jjq9jky9962xg2edcsk3fc3jj5scqptkwxwcr1oswmceh4ogauf4sqxoyu0177zgjr4qfupg8kxloi987',
                flowComponent: 'e3eei4ksg5746xl5kz45fmub0pqputrmvtb08m65anwfo9kox2r3sah33cfalfw2khav3sq6wnl4ppa6nn1izytdteefiao6xncocbeyeo5nryogpjthx1n7bmz8bvj2ys0zuiim686dwjt9vb6pepgs9ibn1xqc',
                flowReceiverComponent: '9ff644dpcawt896xlqivib8025xbvq4bz63dj9tojewvy4qhljlpek8a6gw7hmi6aby3chnuqyzfesshhux3f9kfbd5i98yr294wsncc8ees1my92d1ah33n0k1hpz4w9a2cxpff6dunp1z26kgnlgk3b4xcwhae',
                flowInterfaceName: 'v1zca0rvbc7woh75zd2mj2n0orl38isxas0wsb16roz6yecbmqcgqmp08p6hojscchgilhtpah4wi4mwtjx719uk2r69kcz0u8qtuv9nc8axnr3unud51tmcqgsyiv89fnscelgq6kh1tlj4pegkm4au7uqoxof6',
                flowInterfaceNamespace: 'swbiqb5h24nboib07rn328fys7hzdmc47gnqvu7f03zilydpgnhiz28mxv10hpspjclnjv2a5dz1jusuori4vd0taujz1xm2ffp6xr1x48iye0g6jg5ewg40h9qen6hk8cqh6k3z8q9pz862j9kj1p60lyt60zgd',
                status: 'DELIVERING',
                refMessageId: '3grsi7f6txxhij1ynr10vgyabgeuzx58pr7fn9aeqqle62pvgrw0yhmx9d3p3r0mrd2qeg1m3si0x4hbqpzb5ki5693jciklz2up5792qob48uhet1j74q3135x5js4ar9d43rwya4en432v15udxny3nk6toykj',
                detail: 'Vel aut est omnis. Placeat aut explicabo exercitationem nihil. Delectus repudiandae in ut aut.',
                example: 'vyckl4jbagjd4nmoh1mueqpmch4hvy71ebos2crns0u7zctvwez5wdfwyh16gfqo91vijycuft5mfqlfqw4vuof5sfgxyrt0nvkjqctc71w5ab0fock5pcbtebav5im4ta4zhbtluiufiiti0uc6gy8iqcyu85h6',
                startTimeAt: '2020-11-05 22:02:19',
                direction: 'INBOUND',
                errorCategory: 'znf0gx6pq7mtxuhqumn38wjvvo7p1c0ma98ssv64cfsps3q0r6cu28mvwpa5g1rxseenw40t4c1r64ymuxkvd7tji3v3a75glev0q28co4b6sfb3oim4sfyylu7kofrgcii63j97xz2m3l1gszdv5140niit13ln',
                errorCode: '9b058of1saanvn9kk36e8npyf5xdx4s82bromuqk5gun6kwtrd',
                errorLabel: 131773,
                node: 5342550611,
                protocol: 'rot0b8fu2jcna4hkkuvi',
                qualityOfService: '5xl9pioe0o7wx073nwgz',
                receiverParty: '1sdckitukuootsx6hy8759v2dw0uf8if1kkpqi6n8nllp1l2x31u5pqtpp9ph7a28pahxpocoycx5frbfc5lytskc8pyr6emrvsrqyb3f474bmdt24rcdlildpkfpsc7m25ow6ydzlel9003149wkyrpygcr5azj',
                receiverComponent: 'xqchko6aainhdhgxdlu400gxkeyv651gcd8hjs18us3wc4rcg8kd9sza89al5sxdpm9e7gtuhape926xit3ws74bcs6ygpjm55fpu9uql30ke4kazx3naml6c2l3ydls14w99383uhlmgfa87d6yzv7chbe5lida',
                receiverInterface: '4y837wi56o0hlca17wlst9kcdsl48n4sony01gukkkeic1zzsh8wi8l28fz0p8ec77vweq731mvpf1y6mvykdi20u09bh1qb2848gux6qxhymfrqic7j92oerktt3zlwbnldmy1zn2cevccld6aa1nka2fvu8fu5',
                receiverInterfaceNamespace: 'agw1t4zxa81fxf5sn60zv08edf4ucexooo6th3mlbt1x0bqdxaqdizvxgrp9qu0e1w7y67n7th9u8kk5k5iq30y7wi40hjhr9ijcbov7ss8ikhaslyz7srt8a1nrzri6nx070hlfv8wqltamhes9mmkoqsxpq0bm',
                retries: 7100265841,
                size: 6874478098,
                timesFailed: 7935213840,
                numberMax: 6142431907,
                numberDays: 4272449535,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'mr8up5mah5pjgdjkl2km7qq91e6bgcpkbxc0keopond4zps6rl',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '4agidro00yw6mckmdp3s',
                scenario: 'gjpburql9rl2ukk9t8tn98oueflibw4nldq05vr78b38v8zyjtrjl1pew36b',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:09:47',
                executionMonitoringStartAt: '2020-11-06 07:13:21',
                executionMonitoringEndAt: '2020-11-05 19:44:46',
                flowHash: 'je0eae9l05nmnuub9194m2iz3mcs9za3cq7attd6',
                flowParty: '3uudicheoponsh7adooeh3ko4a5t09jkcpplmx2h1ant8agp2borwvbuokog23mwnmc3kvs49jumw9noya2a2zj6f8zuxyty0dlik7bdr516urgv7p6e23l84mm5o28h58hjetyeazp4gduhxlg10bkplulgy762',
                flowReceiverParty: '76pmhypq1foi6m12xp2he74km10mojqo90sbmn0zgx09qn03w3ake6c1q8fdccsm39mx6b9ckx1jgyv3ffns2848cb2m1n7q7hzgmxk3375jdvkxqoe57dydytwawh6qf84ccz93s9wn3qhpbkxfbu7bkx7ol1gv',
                flowComponent: 'tjo5n6is3wffrt7rtvfgmk9ftvxza5y28o851a079gwae246a0i3g4p21dwh2bhsm6nzuumwkv5y648e1lwn9yz5bcmlr20m2ymr4qrjnf9dmedxxcrw13f4ejkjgjin2qctzq58qhkwyfcnee5vl19t48glzcoj',
                flowReceiverComponent: 'fala79fionrd57ojj7047a517jktp6wboytb7q49luvvga8jjpifnjoztf2eof2a0ojaa37cva50thmekcnt0oj8ahe3gcvmoulp0i19m0ongltd3q4d2pn9sw9ovotxada46g0p2tvrmlv7xycqnwn6e8kas1dx',
                flowInterfaceName: 'duexiwzhf1lebwvxk8hrctifxy1mvaywa67u7wmfuxg04ux5dvgeat62f7wv90u3kowbdmga96bhispu59d2dtzqjbciaamq7dyau7lwkw85ev8nb6htt7emso6ws5682hf751w1446hzjfm5fpltzieos8c4n0s',
                flowInterfaceNamespace: 'bm6ugmglfy3da60v46h9hxcmxcmjcmxwaid7y74yfpo3qmmm67n552uxuhn1xqi4vwxo80nv1es3ldnpnnet859dz76xx7gz50dswztz715sysh4txt9vp097ltzgq2pq0kw61qvuijgf6mxcqwrn6xup1igczvp',
                status: 'XXXX',
                refMessageId: 'x7rlfcvruyb1b96yc75gafraw5zzj2pz3v5iec58934grd9jzydva96qhsa704i1pl314zhs07wrmi33db5msze8qkqhgsebfog9bgruu4mt9thd7d4eba88knwrenyzl8zd6uvhkpgcmjasan2o8zrmwm92jp33',
                detail: 'Maxime sunt quidem eos illo voluptatem similique. Placeat dolorum dolor at. Optio ipsa et harum.',
                example: '03pyjr4ne8l5szhzy17gapeby0lro0tch42g2nfu63zcbe423r6q2lsz10qyt452k36fr1g6hvp2q99yd9u32c3hjo1zslsu695sjnhwojlybf7avu3cxxeamvd9ea3mfactpq1u97e3dt3trvlls5cqdd9ty4cl',
                startTimeAt: '2020-11-06 02:21:13',
                direction: 'OUTBOUND',
                errorCategory: 'gw3n1rjmrvi7hmckj582rtcmc4qn6adxpsdo8e4tbli86pewm21n6abl0vvzep7anyk9amvgzrewhh5gykk6u7cn6apn08yui0w9bngz4rezduzpmdurqqgepaql582j4b545h2tzk390n7kppsmgp1wbd72bfc8',
                errorCode: 'o48eb4x3h0q22r4hoh67tvavqrijtbsapetdqtazh8dyndz1pc',
                errorLabel: 311188,
                node: 3262087634,
                protocol: 'mrsya9rrdq1ioz7cgcsn',
                qualityOfService: 'dfagpqdkc8vsax3jhtdn',
                receiverParty: '794v40kfdovgpziwpxpbjtn9szcwcxsxzgs38ithsacpzzr0u8x56t0tdhbc5frbctmk9pgd1yj7zqjrszdqixctlozwneayqbq85x62g8pnlz2odf1r0hl99amnzqn2j1me7nlgfthl4wsvhqmcs8kz32kdidsl',
                receiverComponent: 'a99awjkk820litm96o7p6mwbxl6wl4movum8yuaoa8akb07vkobfhu2w45iu73x39a0tf7rbwnd92q5fd0murm5aw66k24wtd22rskt0v4uujlx3hntizu8t7yjc6bxjuww5a90ibxh9rn4rfwcciq2kf9u0vvby',
                receiverInterface: '532p82ugvlsouvz34xbe07doip1nq8xwa7qrouh69s5c4rhmrhdquxibgekn682u5grxdp1lcbhhvqwqom6xitzvxxd4nta5xu2ly4io13dk3hincfzw4at9e8dmvbp05jg5iq8syymted4y7jf2oqe3cnxcwiul',
                receiverInterfaceNamespace: 'pzu63vqszldc24vrl3wmi2452275uuugts8t95y17vrilesj993efi66ot5becpg4hcs8q8ybo3gl87hxxx69oi9bx49ri8o0ddaiiowiuhemn73mwqx6kmd5tvzvieajqx1gntqpfymfts6p3tpw7npj89c3saq',
                retries: 3213310879,
                size: 9445315481,
                timesFailed: 8340630061,
                numberMax: 5112373942,
                numberDays: 3297986753,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'zm6hm16m2cvs15u9x34svr910zhpqmhmmftgf46depn58k4oyz',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'qjhozjx3wnwnhws9axxo',
                scenario: 'd4fruucnhl1hfiiovobv20q9z78fu1v4lxxfek22xpihe4c5g1hn455hmus2',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 18:19:09',
                executionMonitoringStartAt: '2020-11-05 20:29:29',
                executionMonitoringEndAt: '2020-11-06 09:16:46',
                flowHash: '7rcqy7rhezmvoi2xa8mtra6urnu6oe89mq896usi',
                flowParty: 'yo1jyaerdxnt2lr7nvj0bd235e9kupkb1azjsj2vcuqcs32zzkdvrvd49rn0h46kjdo97joq8f3vx78l687e1ehwnscxdt9js6n4bntfw12ldbjxpnfshamncemo10mxqdb23bqhm0y3dumtifbf7p5ato0ygo68',
                flowReceiverParty: '88v3axlxepa5ylj5whqfy5eoyl4tayqtqslcdc4aal3qso7emjr2dbgtygnq9mjnxtm0fgaasgtcwfvgi6s592h9mnmy26e2dak1xf5kjwxqdl444r42baim01y7yri95e4vllfz9qyb803h4a7w2lux8d56uabq',
                flowComponent: 'red9lnxw65n0kljvqp1utql1lvpvfqubpbxspfo6ejx3rpmfflk78vo0q8jsc5v8usrmteo81v5acvn9i54117k2f5pzdlyismgjy1zshdnmsxsb5kyfcwtrs2w0utlt3rhjizlff7w8dbn0sjmglu386fy319av',
                flowReceiverComponent: 'wyawnh4xbr5n538y635vqx94bhr8oc8fee7sca1wcqvcb68ytjmyfurt69894yguzybyd37sztdumubvc6cr9a28khcdl7e9pv741p00rxlyusdn475sciyutta6podnahxez90z8trypfppi6p407se3b29lmji',
                flowInterfaceName: 'a95rlq2wtlvnfh9nuwy4xj4rdfx8u680pmhhz5qxf0p2a3f66ugfw9mszpnx5rqxeb2mm4a8z8yetg4cyu5ovhlkn6jg8p1mnk5p3kqjnht9cswnxrn45qnwm2c4ic9wizcrtukow4iwmmguzrccq6lc254ozylu',
                flowInterfaceNamespace: 'xyhmck02m4ipfbbs845ra6epmdy80uyzzyoqwkzu7ek0mbebr5qbb9yjnuwuwxv6kylwthoj2dpdwsyjy1pyvn5n8j14vjzjhxnxbm09993pwsvic8iu90xd93t3054mg1d35pqmhdp3kq5bcazdwt4efm30gvjv',
                status: 'HOLDING',
                refMessageId: 'm2dtuz9hws12uxsodx8krjbie4uhcim7h04w7ezupdyi6bm47m3kd9jknztsd1uzilmvih9tkh3p3trm270gef1mvemsgevqufq0x65ebqf65x6gnfbcbls4qre8wsgup3cf8bx1yahfrslhmsf7vdopwfabv996',
                detail: 'Ipsum ab voluptates. Aut aut id voluptas quaerat ut vero aut id dicta. Culpa aspernatur vero a aut nisi aut aut. Id vitae fugiat quasi non officiis est molestiae ullam accusamus. Iure nostrum eum libero animi rerum id fugit.',
                example: '1lgryg26d6y8h4ofvjhfc3tq5p7eiu2z8dwezghuflikrdual0ezw5g9jpx98jzn57tnxga51i2whk1gobf20mfno9z2duojjvy45s2rg10vhn7tj3vkcx5jsmsktmk021okf1kj9l749etvf3ljp8kc9ggtq85q',
                startTimeAt: '2020-11-05 21:35:37',
                direction: 'XXXX',
                errorCategory: '5s07vj4myhvhfxpmhw5q4d45x0sva9lhi2vsu7x9u140m8nf49wskhb2z1049skpmxp2hdo8d1oaaldyuqiqs3vz6edj8uz68u8csjgk9e93o9nduzbov8j859rjnje4ksalx5iovi4bs3jmvgu7m0t6igntuhta',
                errorCode: 'rcb0tlofiv15qnh2cv0zijwexm12evfu2vkwibdsmhtq5995qp',
                errorLabel: 698801,
                node: 7814542836,
                protocol: 'b5vek4zsprnnu0fzgyqo',
                qualityOfService: 'v3srhqgaqk6ss8a6112w',
                receiverParty: 'pxy7jh36jblqis9mvh7n9j6ygw34w58yuyn2dehqwfie5fcs9qpkhbqv6gl1fuvr1v63hh77yf6isowiuco9zicyi4rn5pjm6srk5eomvzsc1b2mfxvcrxipeocl0f6njcusj6g4bnaep6l75p2p9t3mbv7jvuyr',
                receiverComponent: 'neq22fb06w3daudfvix0yl52cte4gkmlkcfyqzpjjnygyl8jnf7f9j0zzw0pg544o3rv8e150jgxnbfd628gzvx0rbjy3m8r1mo0csx3akxgtcw45k0qsvgu71kcw31y1fi9wqwdjidetoju683sipl0yn26ujkf',
                receiverInterface: 'v05ayynhqmbjv0a5szqlnsbo3sdqu7lr5m6gc1w6rwdiewqi1sly9en5fnigtphez7g6ez5g59ew8ylw5ap9vvtoclgi2n34n3xbqolavtgzrpdmaqut54g9mbvcpzw5or7d8t9fa9o6nhvusfwqc1iwwyevszcx',
                receiverInterfaceNamespace: 'g3xs0ht8zuc6so75q9zl4esgwt12a2chc0z6kf08yf74gavma8mlvbavymkck2eovzoqxy90q1n9qq6j3j59f17zdqj07skjbnazwmxjuyit7n0s8rh3emizb1nhh5hyqmaavjecdwonoh0g5skw071lez82ihfw',
                retries: 6726110467,
                size: 3827136493,
                timesFailed: 2567556835,
                numberMax: 2144212514,
                numberDays: 6929479693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'j5gnr5f7oef4a9ztolxy0fnub03kvqe0goo3lr4yrc9741p3nd',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'kk11gf325ls4pwbncfe0',
                scenario: 'kv8p2xvsgnipyezj4y0r0mhfbi646tbxv9jxuppugisafvvb50uljasd7awe',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-06 01:46:34',
                executionMonitoringEndAt: '2020-11-05 12:56:28',
                flowHash: 'ws2gjch79v4w2bp5el5b68pzj7s6wa9ogn0v6yol',
                flowParty: 'ahr6cfryiyn0lknuo5iax1ft44xkavt56dxeyph4vohwvx97hhqy5i9x5rlfd5tebpndiu4bkqns40lv3uej78lej7683clyjzi1ww3xj5abv8qe1zz17is6ktkbq3hs8eylmqxbs1tm1mk8nbwlgcsuwu288ir5',
                flowReceiverParty: 'pb7olhxwd42hawyxj2x561bffwfesevusbqh4v3yjt5tvri8kcx28k7o510yrtmth3564znwbj94s2voi83ujslaejxnjpc0i4p7fv2wdyfj7sfxcyn59flfsoda2vh1ib0hkx4dyldsltas40fm77pxm9qjw17e',
                flowComponent: 'efa87s9jeznzigdekk5te7tq60m5xo39r93flwlcudviwe78rvz1mx3qkph8nt6lenkxreolygrz15q8b9b52ed5i7zeoj64navjdlppon62pny0xspcuf8889p5abo2y62xfbyxiol89uvsjiaf91f8igd1jtq9',
                flowReceiverComponent: 'sws7qv7xk63z12matzf42iqmndg1s7eyju3p8e3u5z17tqid5cqd6s6nj51e6w0p2247qsp39vjf7b5i4i6yt0c30zyubw4ovrwe3bw9be6wqv7b7x7f9ps7fvtdacj9jgyf5j01c061z0yozdgj3z7ca8pn1ctp',
                flowInterfaceName: '4agzhl3sfa26zlf3rlr6icp0gvq2s5xhe2ctx6xqm3rcanlcda2vd8gqt5ns32nv9sntfj8jmlp1w3363pm7hqqclurnslokmuxgfi84zjf457j44ngpfz3v27ojehuc9oiof4om1cbg9bm4yunwe5ib5jd1hpjz',
                flowInterfaceNamespace: 'gp81snx9yhb5nmvwz51746z9q3fwwmvbrxnag3zuvkeldpo9dm3p3echv2vbretbzjaxrbtyrt91w45sa6ghpgolppwu994jpv7nnl1orfi28e0yltnhr05hy4371s77ekp7ougggvhgcu90ruc3n5q9t9tmxtse',
                status: 'SUCCESS',
                refMessageId: '86kpxjsvjwsi9oj7mutu8dio2mz6htgnnc5xpf8ngezmlfi270cjeb7e2e54fin8626g6ickiwpdrgop7w7cdgfku1dstqgr0nbha29c78jtvfxihi9wpy79a01c0rylg3jyxxp9oj1pmpqoy4je826xbxtzsc7x',
                detail: 'Deserunt quia odit quam quam saepe. Itaque nihil dolore ut et debitis. Adipisci officia sint et eveniet quo dolor aperiam amet. Voluptatem aut dolor ut voluptas hic sed voluptatem veniam id. Adipisci qui quo. Exercitationem et nam consequatur blanditiis dolorum inventore ea aut nobis.',
                example: 'jvtub1ubjfjyqyrhrodgrkrekh3rjgm39f6dy7n6f4j9ghca2pnpvo9tjdbfh77iwy1gjywjb20ysseb4rovgdurbg8iuxgs9q0q87ppwo3fgguaqut7j7v0uhzv1odhpwgavlcpsc2kd9shrrx3onigzwc4spzj',
                startTimeAt: '2020-11-06 03:01:20',
                direction: 'OUTBOUND',
                errorCategory: 'wvbwbhjph1io9e69gsk1dd2hofao49kldmavd6l8jt2ynefvpeaqyzqpmmg9mdf5wss5df75u7sz9yu2gwn4bu2lmwr6ql3e7eq7kcsybylgzerp3vd129vdzhha9429ppum0dojbu8nj7dufuiikvhhspljay8y',
                errorCode: '4y7ksdzpzd4kau279wgj1kk6v6jl53rffjrq57st8k215khwst',
                errorLabel: 531525,
                node: 3374914518,
                protocol: '5lomwxh3hbinh83jwp8e',
                qualityOfService: 'sh2ewjkspcgxqn7nsd1l',
                receiverParty: 'nbn4xqf06sqq61k4r31eo90p7d1lk8a2ogu4a62zt4hws1aoa3zqpv0mjsazyh7zke4wa3gyzgr90khx75q6lu16i3xq8bx753f9oo27j4upxtxaqob2ctlilozskqkstzl86t7ynuomufbpzjeywwxd2ic3m69n',
                receiverComponent: 'bwddbis70ui8d29et4ebiv5bd2zimzhrxlnb0fxfhtm6y27z6liojz2bxf3x2bt8qv1mwr1iatf1ubwcjxbs8u15wkh2b6kdlwl76rcvd6hovlf8qao6z73vjxinxhddr1m04qghmny664cfatjn30zdms2d4dnp',
                receiverInterface: 'dgh5p3k5xhcackeovzgb10z1p8c4xjjciiq2vdjrglbjnu2ob1cgc9900zqhjq8strnywy5otnvdx8z77swesbbam3tp7tel2h0h93ks3jb31elto5r3r29hlc5hdcliz2j26rdkpip8w4me8kdgt23qjn43xap0',
                receiverInterfaceNamespace: 'jvdf99128pp398kxdvpgzojeesn3nkrmx26bymitpdhhu285suj42y8q3zedhc26dtod7embi72dumzxtok0a80jxup5z77u3i0bgq8ggylbtzwo44qs2mwlexad6uzhc0fvnq0kwj0h5ybmrk4xr2ah52lpd36e',
                retries: 2340482365,
                size: 9633888729,
                timesFailed: 8590232032,
                numberMax: 7170145614,
                numberDays: 7634729049,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '5po9nzwq0laur4z17ori6uw7g12qdj3n36qqpudodfxcxag0pb',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '5b6lsc1b4j9sd181oz5w',
                scenario: 'q2urd04eokqbgi1rgjks728079wpy46rr010iybvd85gdz7vt0udv7ysqapy',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:05:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-06 09:35:54',
                flowHash: '4id2xz0m0como7hjfki34u4dtawychsfxf91c5re',
                flowParty: 'k7iu25xktt0qklsto01of655l98gzetpdn8p6808jccdj9f37uxpdpov7vrz7336rt9cxsbjunfco612mnw1li0nhbuqffh9qnx5683jv7dksjna4ebdm0sa5i33u7tdkntmrl6d4u2dgg3dk6jgb74okx8x73uk',
                flowReceiverParty: '2bh5ndieo7iw9n73uynnla3j3w0ls1uaczmks4esd49z3crysonrcdvnr6iryng547umgutmn585ek7ur9rdxhdnzledsdvp1zclgzk1b5zynujkexw702vg9azcytkdvev2ahplnpdy180y7w7gjpwqacup277h',
                flowComponent: 'bry6s0gqu557gmt9gv2ddpbwncwnnysyeo69vf21pvnyphjr2gt0n72s00y6bz5s3hnyhvfqs7vvz28h2et1xjre9xjo7yzgsob2oabxrirjih0dgitdmwpecuttlnlkr2l62nh086y6pxstvvo42k97o3zax4wi',
                flowReceiverComponent: '3efx6pb819cr914iug9m4f5vxboe5cn77ga3me6e4srw84whwvc5z7x93iibe6ceeco5xtzxhabzryu714tuztsj5jwoy2oq3oz6cl199dpoikep8rtmyjq3y4ys4qjihotsei1p37wdmic9rimm0mmhls6vtqqb',
                flowInterfaceName: '93i0cbjkxwbx4f8mi99jefv7ukg6srpc2t0yqtz5bark4ouq1obdsrd27wnyj80d798jqqrc7wt9k126urvgrmvk4irbmjb7ik2x511ry6v50freayadpwqmcjzla8pemocko20hme5smrnqz87l7ak42sv0vzem',
                flowInterfaceNamespace: 's6mbuqv7pkc62l33ifbnf6s25id6xu7m3zapqi9guv0k6ijsybqsc4xt2agcd0hpc83zdtueyqwwr86221x6f2hzc5cx1k8v8ddmlyu9ccf1x6arsbgyz77v7m6ykiqdm6gr8hd2prkh2y0fdetft3q8bzkpb688',
                status: 'WAITING',
                refMessageId: 'lqhzm8u0x0itcg1g6gdowvok1oowjdoy46zgxhqtjuyxmndan4204iqdq0eu0z5yahay8ccr71fmlw0wzjvoi8cm7apu3il3eimxjcxfvhmelgb6wsfgxhos19bbmctus7758je74twkocb9p8qgyant2m6jcbp5',
                detail: 'Voluptatem eveniet corrupti suscipit excepturi exercitationem aspernatur atque fuga. Ex quibusdam in assumenda expedita rem magnam aperiam. Ipsum rerum corporis nam. Dolorem autem dicta omnis quia ut dolor est. Nesciunt et aut voluptas.',
                example: 'znxiipi5whamilrld2xl3bapfo25jawm2b801lcop8zgvf3g7eyxch6qugc5jrqf770mq41zuiuoa9wvjyk83mc89ktpzm6u3klo0o78bvtztg354gadcrfdg58mc7mv0ffbq1pkf3dtzhhags1de3j2uebtkmja',
                startTimeAt: '2020-11-06 02:21:34',
                direction: 'OUTBOUND',
                errorCategory: 'd8v4fw10uryj2d40djlvuwc0dydep1ga4jk6qxd4arvmxjp65v2uhwwb3imgq33pba1ctt5ow9t2qdt15adq06yf9i0o7aolazoavavrhhwpoalg6xn0ymn1l61g1dbp8m16r42jcaud0sjo3fir24k74wg8fjxc',
                errorCode: 'givlua1cta8r0w2tt3wddlwabm1vxqd7jx39tydy6a9vcb1dnh',
                errorLabel: 328099,
                node: 6366490620,
                protocol: '5lvxw06079t5t66p35ra',
                qualityOfService: '5pedsz59ghymslrd3536',
                receiverParty: '3cg3tax9mw1dfr2m54ulgt6h2gajrnm5rrpn679m09pdivm0cin6nnr6ywd17v5eghewy79z3jrgxntzjikx1uewthfcg2p92q9ggotiexcu43g6yj1czll4itrb60t02kch925murlv2cyuya5j9u1itn4vbgpk',
                receiverComponent: '0hhv561spg6llzgx9wuzjrzcy85h6pfqokku3j93pxhyisu5b0gptg6tgzsdfospdyaczz47hsc2nxyl2zefatlxm4bv0fmztaw5omaa0g5ezvlzl4msdsmevcxlqzo3myrvycatfw5ne2szbe1re9mat9lynx3l',
                receiverInterface: 'u55cc0zgelsohoztn0xk4y6bbjwqbsgmzvgjbu4p62mjm2ecl4qkpuuhkgi7cc0grgon0bu3z8i8q4v510mi43rj7d97xc7j0slz6546dkgvx239gqqad07ofg8xcdtt8189c0u2dq20kd48qkk0p96uyvzcctov',
                receiverInterfaceNamespace: 'eyos07cl3lyy0471knw8oj6grhvh5ytwvv6f8c4ytmhiv107quoexhh79a5yc9j4fzqznvtvvgctuamns8o59x5kk5tetczg2sdayzv1sy872m1y31dbhv44g8lelsz1qezs12bfza4n6aa0saz7zukagpb279g3',
                retries: 3359798486,
                size: 1390475789,
                timesFailed: 8446099338,
                numberMax: 3372086223,
                numberDays: 8386229913,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 'w4mpz47pvggv9i542bdxvjdz5i0zw18p7pdg3x6zzc0iajf6kf',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'ydw03nrienpxhb1opdv5',
                scenario: 'aqprceos3jaydyij8sz0shmn7t3rtlgrd8em01hbfxc0pkb6y43jxm3xsdg5',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 08:17:12',
                executionMonitoringStartAt: '2020-11-06 01:56:41',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 've9c9pctod6o3vg0kodq8u7gu8051ys0e6srce5r',
                flowParty: 'ridf0twr147bsvcq8dbbn277f4yw3elsglhwauj6ttr4hs82xlx9po1liaosazlo3bc2euhibx42x7n3qgm5ngoukgp76palakqvrg21c9lkeq0wm1216sso4c94cm6nc4zfuhe88ocasfxd8jvaqjtlf9hgnk28',
                flowReceiverParty: 'zrmyzlc6d8gljegj6fzpk7o9vza67hetmqsgon79xmaiwkc5mftzbyzqzkbp9qcsytlttuki8qdzbyxliof7291mt3xgaxjqy14jty0tp29mtk30loea3p0mrter1hii7ona40v3xjgwbpl0dz4h7mh5q0jee31j',
                flowComponent: 'gemaex18hjomjgm0pq07ls07qxs6t12p4ai4mpwuj6mb1crp7mshsbp0e72c3imdtae5l63qtt4kgsekg3uisfp6x680b31fu5jwh3o1vccyetbpaotsu0o2or7mqcmjm7mn814bb8l6mt6if43159k9utvcpybu',
                flowReceiverComponent: 'arr97d2yud6bpl4vti8exx0wsgvialdtix11j3ud33wxgsynetzibw5gyhkmjqgo29fsqdhaf2cvuj1s8o6a0jmcotii8vlyirbfdtwqn2mj02yr4o4yc35l6vn96ubrmio8pxcq0t0w5g7g6hkqfy8gcj0ghkg2',
                flowInterfaceName: '1n00x6anrogtec96p2m9r2w6143xl6il64b1libth78f75dr1xc3b9c9ks47mm9q46rs80zu2tq9fy20sax6arxfh6vgff6dk1s4kr8js60e9f877tdixolq7fry3joyl6dgdvdb8r6vmxxloiz0s8bs3la7tw73',
                flowInterfaceNamespace: 'ng4cmef6wpf08iau65a0vojfzc3d1gogsblskx97ow9cmsdi8mfytic4h2q7h28by1vf3gfhfe4nl5rnap2mqixped5e78sbgtyt02t8ih1hu5mvnyw128a7pakixy5hokqfozlgeyvrfrn8pw42rte0tvmc59xt',
                status: 'HOLDING',
                refMessageId: 'v5mk34ekzxfq7o27zlj3t0zrq614d716v36cu86s5z1fjmtyqhwpz8cgsgial06ri5svp0tnmo7s729cpi25t73wsg5vvzs9hcjn75a0hrqxb9to1qvdaydcmyfzd25xvm660zi8ty4wpq87chgwkd1mj9b8piug',
                detail: 'In praesentium ipsum. Ipsam porro exercitationem est sequi quia reprehenderit. Corporis rerum qui dolor. Possimus voluptatem autem dolores vero magnam unde ut incidunt.',
                example: 'bk9uwoow3k5v97m6p36b5o3ki84ax90rkjrgyfpvpl2fthbhrj4h73c85mafonqrw17rrmd96fzqlcczd3ubp4k261gd9hyljpslijm3n947m0myzbq5h8qnxjbg95i1ug661di08egzqwvyzluwd41b8m79s7s3',
                startTimeAt: '2020-11-06 10:18:38',
                direction: 'INBOUND',
                errorCategory: 'vc64xl2moi2in14u6lk7xwck93q6kwka6nsx405n9a9iw2k0pckzqfpnmnoev4s28ctzl461btx2f3xhb0j88za2ipm4w90gvfrchoxb8m7m5uy5xcpa0u2d20kpch1vx7kzjbukaubbzhq9s3hbncgu2ds9tsxv',
                errorCode: '99089h0c31igqczy1go27m7dwpteja8sg0vcu3rfn5aesw5f21',
                errorLabel: 663424,
                node: 5967674235,
                protocol: 'yfq6j7squ0ttp57g1nc7',
                qualityOfService: 'bnyz1tgj16py48njt7oq',
                receiverParty: 'luids3xk27pmehawrx4t380smxxeypfz7ak5dahb9ah5cyirc4jbr9dzans2qwz5cs7j1g7k0rykvhff0l8lsmpqjfqahdnbbl1y7gzefp9weml1jpoqx2a9xh1pzcg92ixd9kjgfvzpzt9jdti7h0y6njn5jel9',
                receiverComponent: 'p9du5axj3je4fszalomlcmbogezbfws5hsn8dj4i3z1j5j86a138tzspmmwemetn9essi5cvbgnitrm566ryr6an39o25z1vdz3qsjp97uvu9lk9jh7aec5pj3wg2i0pt8ji8kxwsh4twy5vhgnz2j85wx5lm1dh',
                receiverInterface: 'hk0ng5fnaxl267cc9e3k1i6opanex6fxq6sdj4buzlzd9d6umpkinyho642qg2cfc9rzido7py50u9hcemgvnyplvlaakfy5zv16qvi18lc3mk8ntq6p9wj8rcdatu0y8h00u4gcvp0dkipnf3qnl61n8renmbh1',
                receiverInterfaceNamespace: 'ja6fa04zvb5ecahc3sdgxawr5187lf5hacputm594qi0txulmmkbfkv8us9we7gl2ddej8wzx14o282rt6tk056w4rbr9s7zfboyxsft5zwug1sudl3grm0jpss8lh8xuztxokbf76lxdsmj51dn7tx05r2n7mbg',
                retries: 9928815048,
                size: 6935823870,
                timesFailed: 7637178685,
                numberMax: 3371622451,
                numberDays: 2395997356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '2zmbzfgwpd1u3x9k2i1mcnb90dgy68skpi39eo8nt4lvl8e36u',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'p7x6wkgsrhy61yogjuej',
                scenario: '6ote76to48sxge1vz6am9k7z7ln1gb0dwd2a6y51lnkt208kb253vklma2z2',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 05:41:35',
                executionMonitoringStartAt: '2020-11-06 01:20:15',
                executionMonitoringEndAt: '2020-11-06 06:06:38',
                flowHash: 'ab22zmfeknso48vnkes58olr32l3imqk4cjzgmq5',
                flowParty: '7hnkzt55hrok80yipavo2hw3vhvg5xy2bjo74prwkekj393225wfuk0oml8se19h158py3vdjyhx7aw4ofwjpbm772i9zzjuu2858jzcgxdh9e45evn0pydrzmva8oxozo1sl174ek0dg4fut55t52m4ikf9zvvu',
                flowReceiverParty: 'rtvmmsijyw91oh3l0u5qzqvkfioq8xhyj65ec75o1ahqqbcil7luu0thkiwo6rrgpmhot96qtetxnj82a4uygvd089kgqgq85g19ys3g0mgg3osdm6dz5k2x6pq63u2x9s8egwv79tisll6tax55onj464w5jnyp',
                flowComponent: '7v1m67hg6ngqs25hzuyttn1dthl6sg5prpvm2hivjky7ke2ghwt7lizygdg2jyngxmbfg8vfcddpxzurqpldfy2s09hlizi9ihy4089hc1qtzjz5km5y1sf9p4knqrbh6tkuf6s2p7d4xmbwzgwyl0p495971n19',
                flowReceiverComponent: 'dfnmuj60zp69k0tkyrtqcs82ud3d1dx1tuunvy79q93rup8gcjgqwz8kzo05lowduz9bsky27zfaxot7qlf7b2glh2tm5bm8z0d39xfyhxbj24dwdyjb4esnk50sazxhfzpyijwnvymivsgola94k1xodu68qx0e',
                flowInterfaceName: '278zium1nka8g85gbvwoll773oki3357emg2nt8aingkajcxd7oht0a0fpmpqzp9evtvuur2oqoctmiqjip8ntsfqqh3icdnk9ntua9wo747kmr6hse8cljri05zgtfzq3g4lkdnpdutrtzrtrljznpg4n6de02q',
                flowInterfaceNamespace: 'o7i6rahcyg9y2rp80oltzpwmrz6zm72mof5wtzgf4oj0sxvk4mkfbpjorbdxredv2q46gc12odbmymuvu01mu87kha0hfx2fucew69hnogxoe8w1t2795sklv8869li0430qzykvkxcg68ga689spcgupytb3l9s',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'el3qe0sygo1a702x4kxdtdptxv6ecc24ksbuvr6i4218ghccosdcaiyo9csx6br808h2sc4gc34d0842232ahf1d5l89b5l2bbstnvvt9drux7qfipwzmh00kbeqr3766ys27029bxyimgjlb6mvmalwcyjjho36',
                detail: 'Quos et et totam vitae alias et dolore voluptatum. Non debitis optio deleniti. Ipsam minus harum iure. Est vitae nam tempora enim voluptas pariatur. Incidunt earum exercitationem delectus saepe ea officiis nostrum. Quis dolorem quis aut aut.',
                example: 'uye445sxngh7iktyfi3v5myh06kpg85dg15h4o6eydwqhhr8vfparjtvz4ntraxyr5jev1fxl3rb3hch0ok49ytbvuwip9fun8y6f6srpbi9jgcze97q26101s8q9frhthyr77eocmtbi920ldn4r3c0i2h9ux2w',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'gvrcdrmkpt3st0qd6ykh643sfzknusfnsjqr01z3y6ezvsqrzq54k2ipdpfwwdtrc0a4wn1na0wk2odmdjo0xlgt9kpv87n4ya85pt60za36cnkdj5dqwg8t2e715iiw12k12ugyco4f1pla2zjvzxdvd7swah6j',
                errorCode: 'z7ir2vaviygx3405jdr36ctw2cbsmqlfbkpdf3ltbh3yutoxq0',
                errorLabel: 777383,
                node: 2830516049,
                protocol: '9jumowdrveyq8qy1gl5f',
                qualityOfService: 'cm4cbws9naku8su08x66',
                receiverParty: '65urjh9i4pyqpgfk00xxc2p199hgtfcn3prvxo3xzri6dv4nau6g9upgnjhicdpoxhijf0lchigwvk3o9cw1m9xz0u5c8fx5pi5optpqn0uza5nymqpqifgm9o4enbg9lnbl44eydhec19mexk93i84ynn3winya',
                receiverComponent: '4jda5to3ggum2drttubl4p6bnx763e2vzqusdg5pmc8ghlkhgzr9q75xxh7cjejj70q41gfal7zbyjjcqjqqw7z0t2tak9savfbhblthwj5m7xlyymcq0978xd9r1q7jqq6m29anh9rzpgr167fzdf7xrq5qyqvw',
                receiverInterface: 'bma5daq50c09d49gjbtkrn6pnd6gpzr2xhc51apxfck6isv9e5whnksspisxvo9r0vsyokrnjdehywb07jmnsuxi34r03ryac71g4ab8owjd7etswc4vjy2nqmhpngie55zdv0z9n37bxt9on1l0qf8nfzkjy0hx',
                receiverInterfaceNamespace: '5sjdxcvkbwegsj00i2xai5517675ueukn7eeyg2i20o20sdejdoay1ccbe5g47ahbsrbcm15p3egogbao9pwsjdfuffhmsh0uqzw7mq53r1gsm1d04496gosqd64tcyx6oixzb9jbj7bx42vaofk73e1uwupj2yo',
                retries: 7725988110,
                size: 3210292266,
                timesFailed: 7204097718,
                numberMax: 5579782897,
                numberDays: 9760967748,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: 't88g7pe7t1w5nxqj9vu8ah3iqhqs5kdz8oot225quplwlwu842',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: 'qp8wsg2az1xamdu6kgj0',
                scenario: 'e0s582j9vq9xkzsdc7a2h9jd1gldew3j99jzc2dfjzf8b6tbgi53bxljicr8',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:38:24',
                executionMonitoringStartAt: '2020-11-06 09:02:34',
                executionMonitoringEndAt: '2020-11-06 04:24:29',
                flowHash: 'ickcfk5g7p0cw192yn6060jz11zh2kzxei1kqbeg',
                flowParty: '6ptomfdl79u9elqtcx0maqx3yuwm52nzftcen2f76w9fipgjkv4trmdudy58scgt6gdyfiu1lkyj91yhzmu7db62pf4mykf65usmm2pqijrnt73fhryi93n2x6etse5a3xz6ummnnp0u88foxzdjvmt3rf0wbi5a',
                flowReceiverParty: 'kfb6njsuhhrprk9eo0r7c9yrueffokjo77mfemkrvwf819ty2s75ol8ilb0tuwuphg5hx8jewsocaqzavk0o2czsmzde2x87qzsevwaph248gem5qo7im0oh2z9fuvsmlop02oqtfzsgf8pci4x8cz9w56cvjape',
                flowComponent: 'vasfiipwwhozvoupf9vtk40yz2nadixhuxkwdp8zpoxrllc66888l83xl54ve5ntmi3cz53mnmozvfzcth85jzn17xhjwnrovxp8pq1iifvwuhgrjchcx81mcimp64cdie1qfmokqvfeki8s434bbzwnuf9351w4',
                flowReceiverComponent: '4pee0uckx4ygquug3oa90x3i9xm76dbqc6oj3gmok15tb6ttaf022t9f50w6smwat65ou88usaanuqeaoqc7vplqagqqqg7n5drq88bcz9z5baspba2n3brivchj21q1pjfljhk41hurjvr0ij0i5m2n05ew4jtt',
                flowInterfaceName: 'cfjeoqb2l09dtbc6bg3d7lqajhmjchpc9mb1m7y7sy55ddi6gbk05f4dt6znp9z49762219akffldtkbl51z0r0glrjc1zs0m9h48ac0wuiv7ysfymq4zllsj1ywoco4ie8badozuhigjbi1rwm9b09b237jtbm6',
                flowInterfaceNamespace: '7c3q5rmlf6o39jqne2wgv2p3yvks94yf7p95fnvd8cod15kvcblvlp7m3hfj1d3756x5scdc5c7luw86r4uti4vweieb2b0ds1m9vegpmhgcn1skjwy4lxoue0fb9e6ag7owzptvntg8q4kfzpxp4hsxlyrnw6vj',
                status: 'TO_BE_DELIVERED',
                refMessageId: '6etrj8fp9xxbyxw442e4iv7o76y2y16x2oo3mr5krplqiz51on25nd80b0gij79rr6u6blmtf0sraynurekih2yd0nhqf6paipr4yw4gi7mzhvgco73o2mskvc1s0jthpz8i57i0gv61dnn0xcuvilkurgrmzvpl',
                detail: 'Neque corporis tempore eos odit nihil. Et eveniet in reiciendis. Minima accusantium explicabo doloremque totam qui eos officia non. Voluptate delectus aliquam corporis. Quod facere aut perferendis. Ut et molestiae illum quis voluptates explicabo labore tenetur occaecati.',
                example: 'v0eekzkh04x5rzhc1f0h8dvkm937xnrnyp2sr1ylnrc94wxagvaz7lnmn181w0yqd2ejmfyv1l1xf828u1vik6tfln114fn5uhsa0lte0oix91r3os3x8o3shc5lu1q35z99xr7eqe3cslqbw0znltfa8olok2gy',
                startTimeAt: '2020-11-05 15:01:36',
                direction: 'INBOUND',
                errorCategory: 'tpcfgnr9amyt0lvondhnwn6xt4aj4jy96x2n9ifny5x0rzz55yi7jzu2pb5uvre9xqannp23twq3g5u19oa8wxh2ueyz309nyel9kiu39ctqonlzak4vvn3nrgy2za52pk6xgvobmlpysrqs0s3yzwh3kkpz5b3f',
                errorCode: '4u1fny3qbwz85xhiipxu9cqur2vq4xfze0dka2stdue57tpktg',
                errorLabel: 949635,
                node: 7797244737,
                protocol: '1gu0yzdy0pf3knrsc37h',
                qualityOfService: '1jfxsv0kvrrnymsvfztr',
                receiverParty: 'x1kznkhk4gsm7n42o3f4qp2xt310d0o7llu4h0l0hml090g3ccdxrte86oepabci2i7c0iw9kwfcriiril7jgej728uzgti9be7i6uxhfa36qeer5waskurvw6p451ix6wcs1a025lxzz96fyakydlmgyn4ko4tr',
                receiverComponent: '6i0rbnbm5kv60dvtuaqc163yzb87pof50hnx1ewjrm6yhzk9p4v6b535calug8l1hb1mgldix956d12j6o6gmth3p66kl81slkwkwsxqv3gijbzurnncvqbszlukofx7x7qa6i0joavpsy81by12z0dwglnhy3a7',
                receiverInterface: 'c8hfn51or737j0ww8ot1equ9j370ct08hoq97e0dmu707vra4upq2ngtzeffvltgn9wweje36nzyosdjxkc2v7xslo1bwryhobh5c7nz4fued2bhzx5ln76daejwgqia9cdndohyen4pvacezc5ycyd7112sgela',
                receiverInterfaceNamespace: 'zxkh8rb0ucfqorvtijp2kefolpiimjjlss2udcdi5s7shjdt6onh0brh9a9z3mo4kglpm22ze2t5alnyjsvf1elba7e22zx2smxj4kc63lmydwynxwc13r076etets18bllbhz9q3dnoufwfm99c9le60u6aqq5s',
                retries: 7364217365,
                size: 2221357113,
                timesFailed: 3058338652,
                numberMax: 1431753125,
                numberDays: 2360987255,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
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

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '562c1542-9079-424e-9591-dee0e3069826'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/8a244bd9-9934-497f-9c9c-7f058979aa2c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/d5917c79-7430-4453-b9e2-d35e94b6d9d2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'));
    });

    test(`/REST:GET cci/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '2637367c-46eb-4984-9ee8-70d1caeb7c65',
                tenantId: '46b04002-8bc6-45e8-b735-f86e6a1b3f39',
                tenantCode: '4f9xq1t2c7n6c0wpxcglsvy2fuwkgahvkh6utecqtfkaod9ptd',
                systemId: '08d61af8-bc1e-4b81-b6df-eb084687a0ae',
                systemName: 'fxk6za8f14afnp5hhgui',
                scenario: '6ngzuqg3b6itnmg2upucbadrq2l7iyifmsa3mxro0fg4i9zfq7mrsz86f4oa',
                executionId: 'f3b1e6ff-38ff-4fc1-ad70-876f15b80d4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:56:21',
                executionMonitoringStartAt: '2020-11-05 23:35:38',
                executionMonitoringEndAt: '2020-11-05 14:37:17',
                flowHash: '9hgtt6eamgvqhxa6yju1lc7q7ohytx97wwzhetw0',
                flowParty: 'n8000fc3qi24zyy2bxui3495mh075n6l38t34iorsqymqopipllnb0gyr9wsio80pd0z2o1imheb3hnfywrjmtix0qs987x4qfpvbz8cdn5ww2pp8c08xnemiil4xth37o4jnfh6uy0y37il38virfk1qwf94wbe',
                flowReceiverParty: 'o54786keecawvy2t1x9oo4wbprvv3cqhuykwp8updzambi5w9n7qajxly1k9r53irdxgbjfzo4w3psnkklrv8x6jaboceaig77hui8yy66hxida1ggl1rn6xhc8o7japl1evhlvws3casqnabfysqjb0rwn258lh',
                flowComponent: '6eo3jplrhe2n2r2k9xzflzkgop68s4dxxrprozckykwi1eqssbrcnxczf2momnkwhsgt4mgrl4pr92dfcsiyiz0ab2j92gaqyh5uphdswi68dp6dbnu5qlsaov5mhmau42dv0wcq0of8rqfkiturks6bh0cnocdu',
                flowReceiverComponent: 'dub152mhotvhswinhfudrxz7c15pnyyehd6kued2eac0nz8m48n0u06zwy65dyziiurzod66jlkkpxhpbwf1qf187284kr6yw2agldxt2wbapsy6a80tsn8wesknv7zcegy8bqjnhw1l4oybgd9ay0o0m2nwuqo8',
                flowInterfaceName: '010xal5pdmohj968jnko49ioglvv9tfbjg8ve972vf2t5e31i39c1kd3o7xvipisb6v3zv2iy3ckryuzbfl0efgjpj73gwv8y94qht49w922u6fnqir8d4vsk7836ni4kr0p70l2tki1gverru8muhoxgen0cck5',
                flowInterfaceNamespace: 'jzh7v8n0xu6xpg71v30r2qktj07wb3nx02sd35e1ueqkro7kboolkb6qa0by3ooqb8srg0rcjguvi808w4410unbdu3z9mmt7l9f5do80yoabqrqu2oa833jgr0zdx06i6hrm1bmvq9ikfeljfpgetlhi5oatomy',
                status: 'DELIVERING',
                refMessageId: 'ayi707th0jrfvjq4er58rhxw6apk4frrzozxgkuml1ehgv1o5qozr39zaob7niupdfx1syo8t0x78n3mw5br3t562pv34h7okzq1o2u6h6sxjt70wvf44pdn3vitbrch5ronexl1l96gzp276y01pztpgs53vpcm',
                detail: 'Sunt laudantium quo laudantium. Provident dolore dolorem. Dolorem veritatis iste iure debitis incidunt sunt ipsam et sint. Suscipit quia omnis aliquam perferendis. Corrupti voluptas vero in reiciendis ipsum. Nulla voluptatem quo tenetur soluta.',
                example: 'dh3e7sq85k81xd1vib6ut6goo8hpe20vkf5yq5d8o8k6h409e62cuc03rcyy9tgth841j0yjzenozihoc4s4d8i5fi8717kdlyssexsjen1mk2lci4cp49bg5n2wabv7ff8mphjx8q5nb67o3ba4j6uc8pt0ff5q',
                startTimeAt: '2020-11-05 21:53:58',
                direction: 'OUTBOUND',
                errorCategory: '7ltn83xvd3myspv1hgwv3u3qyomubwkzsqm24v0zqw9byo612trezpa74tjwlfk985ni91z0poj8tntbn4qzqhv89thc8ggv40gw26eb4edbwdwzvp93x7fopp7u6pz5pdne615ch9k0yhwfhqfbakz7bgclieko',
                errorCode: 'gui1zudk0r7ovs3vcrkqvp28qrii3c84aaepect84vh7r0v85j',
                errorLabel: 637627,
                node: 7947759744,
                protocol: '0ubcxl274ptacdhiimki',
                qualityOfService: 'r09l1yjdhjeqxgi76ya2',
                receiverParty: '5l5yxb6xyih99jqo2d0ur852kiozjey5qul19a8ukmzsiltnqxx7vc69lia6qz1mtv2g4ehbc6zbtndc5lukh04josbt51f1v0raqndkclnz2fbbuiuehfp1xnep9xjfk1041enlgkjf3dkcde10xmpua9vj2hb9',
                receiverComponent: 'qcu5xtpyo14ocn2avayvc7hlsoxu2t2hkpdg5pi3pjy63pbdgk6gx9an1m4mhsqqqscnf9xj45ddczwb4dk0ktfds1w3dwtbzyqfptoj8pdles3jvlu2ifxy119dls8gu963laq362ca1cqngcnzhifccqj9b4ml',
                receiverInterface: '48hyjz3gi5vbbatt7jz3ihxruvt7gn6vha4v79cylek2g528wd2arnv5dq8eahpo33gx6w2s792gcjopbgq89rnvdjf4gp9zyw9t7bl7a0onebn47f2scbd44sunjllwxdorycbrx0yn5euhmis1vpl55uxqlfab',
                receiverInterfaceNamespace: 'blxtrsjwsbwast1p48w83ch27k60axebtvmacczguolnd7esofwfzwf8a2eept422i97j6l0swuf2bhm8gkq49qtkk03uul3n5gyj0aeqyk5socbirkfsrhw00lsgep45bkdylizd1j0xpigiawpld2wumtjayom',
                retries: 7825945806,
                size: 7432801632,
                timesFailed: 7810913727,
                numberMax: 3322220310,
                numberDays: 6463571891,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                tenantCode: '609j9sdt6bi6fygi2st6rdbjxdglfcnk8chkhnvgf7i5lllkxv',
                systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                systemName: '416nlhwzn78hq1xbynjl',
                scenario: 'o449da3xofrs8ebo3zohld0hdwfnu10roylepdts2kdgw6ooufm6ot77daed',
                executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:53:53',
                executionMonitoringStartAt: '2020-11-05 17:22:34',
                executionMonitoringEndAt: '2020-11-06 04:03:46',
                flowHash: 'xx6y11k5aetce4kzvnr7210xfs03s686skipwt4f',
                flowParty: 'jwfk8huctuzr19e4if37cir7x0ptkaqcuwxglph4fjkfjfta1km202ck0jh267nasst6mczb7lmvzj26jh2h0zs1utzjro6wlnyrpvkmcg68oewwcygyksnkhahk2mo0ck53iacqyciktwrqacb1qtcsngx26emt',
                flowReceiverParty: 'mnyu2b88syrdwo7apcfptmqz0b7n9i6x2td2qm9h7xig8lanvqq1hcpd9a1z88is3ebe2n19rlh7r8spkiynysyi3dspek10327e0u9pd1ukymlz0cmyfnjx3fg0c25zbfkubqg8qqfg3wibtld2xqns24om0sxx',
                flowComponent: 'seaixq4osmqi3241q4egqebwuwj5s2xp1gyn4nb86688wdknajhahvhnc40pklm5ojq1zb1gct9mhy8pqp9pfiyn9yk542d9dqltditq84j3h5n3z4cihobv46wms0vr5v1lshpobedw9jy7zmduw88mpi37g69x',
                flowReceiverComponent: 'iub2c3jp3ucfeotqbvrhf6c5bhewb5v0jal1iqvjeqousrsqwscednr4s6gi66evw4ec1eubt2fi6urgzmgude89zlouvixdvvnrkilo3e1d3i0s07p3w57jkuprnuaceg0vjmghqj8x4fpgvkwpjee6pbwuhqfk',
                flowInterfaceName: 'aj04q41zrgh95yulgjbhbdvejxondhxx6kb3vlvvm0loznc8vzmhhlyrkhekzxr5ml8xtvekdkam68zoq72tmg9xvj6sg6ygiwtwzl29ykv44htwpkd3alp43k7gsv9ppxhlajiwjfqawrmlhaln8i477n9wpmwf',
                flowInterfaceNamespace: 'pp1ykywr8kmwyj1kqhc64sohrcr27okjyfmpnvvr2k8wvo7o2d4si9ux6o454jyszy3ey7iz349wi5gbzcmukv9bdn3fze96t0tqhingfpe2yr36h9qvdmr2qxr8ihql0re3wmzyk72gbg5yh589y038gyvg1dvd',
                status: 'CANCELLED',
                refMessageId: 'qzr83u3qoqn5ti0y2a2xpescz1bbln4rpup6fmlkvewqoby9l4ybdgbd991fl0gqs1yt7perviiqoz652lmk4nxhqveijydbnpsr0sasqds3wy8fp8fxnun2altunr492zrwmg3lcpnnkkiga4twl0jwf236tn4b',
                detail: 'Quia enim et enim ut labore praesentium asperiores sed dolore. Veritatis cum fugit voluptatem saepe voluptas fuga optio. Aut voluptatem et omnis mollitia dolorem. Perferendis non eaque ratione corporis amet et. Sit voluptatum vel impedit ipsam perspiciatis delectus et nemo.',
                example: '8xdr76h78v2wn1417ltumtfmbx6y0q71faauelsn5ssaqxsq33fdvj201cwpjhl48kaeaophfz956hlq4ual9eu9d0ih4ofpahao9l5e05176lqg0nx6txx1bmha8gosz8584k6l9xck1u1exbu3ektzoe8zrm5x',
                startTimeAt: '2020-11-05 20:01:24',
                direction: 'INBOUND',
                errorCategory: '4esogef5as8v4ml2up3ilpn6qz8ue6eejj2lidy15o3mgx00i21wff5iwlc6svvex3mqx3berdqaz762oh1vgd85qx0nt7nboazthupg6wroa2y6x1o6999p9vu2q13xqmdajy8g3kus103db9ogcjxlgamqlkvo',
                errorCode: 'd7rre9fi6swsui8jfb32xq3i3kudwsn8lyq9h903ykds9juele',
                errorLabel: 817693,
                node: 3330639756,
                protocol: 'wqha2a4zhxyrzld479gr',
                qualityOfService: 'dejl3j916wtmhfuewjvy',
                receiverParty: 'x1ozyqkah7el0phk5ot3wqvx97qcogrytpezjp36fqayxgqx38zsyfd7ft083qlevgejx855adlmtmi1hloyx0o95d6nvratdvspnvdqrp3uutkvpiwr5w1m0pxhnww63sctw092ke6szlrsa6laxxwvrqepjegu',
                receiverComponent: 'vdfr8k4iafgs3n6enkua3eq7quojsdvd3rmdrli6t8v6wcc0vwbqczbmem9g21sqlud3n1f866j83jei2dpnslm40kd870rythxazpjcdcciu2y6ofi8n0mi4mm9ak5apxfh65x38obbjotlb5uw2821kw11awc7',
                receiverInterface: '5auxw0by1xzhpufzzn0y3mj5io4jjbpc22n8tqxfdbro4wh4snap9k1n98vzy0len43fwmw4vf2bfswyzkzlp0acbd301widzrn1ftxbbi8kvit5kpzdb4lyo6pc64lqki2a1yshieg4d7znkaegdw6pxp9z7i72',
                receiverInterfaceNamespace: 'antfdqby4ppm5kv6rjqqazcodlf76hsh0i04qykr2pbzjpzgosbrv7xh9qcb724c9cmwpb1ufehcaeoaeyc6da7x0vvx3st437lej6kcu1ljdflqj0vg0che42y3cys1wiykxf6cg2y9w0tlbg2ignia5j025fno',
                retries: 9001949413,
                size: 8563969395,
                timesFailed: 6324249953,
                numberMax: 4872073606,
                numberDays: 1877046815,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/bed870e0-b710-46f1-a0eb-b42b9b835c78')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/d5917c79-7430-4453-b9e2-d35e94b6d9d2')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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

    test(`/GraphQL cciCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9969550d-b090-4be8-bb96-3b17e5acd745',
                        tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                        tenantCode: '5at0ss0vui5wavxlmb22k62be0658zyzwuesxzqvggxpi3jt06',
                        systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                        systemName: '3vc5nxjduwjb1fl5z5ib',
                        scenario: 'pn7igwjh3vvnyozkge3tzh5e4p5279e1tggy1nx4hx202unpvu7hc2i4gdf3',
                        executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-06 07:32:03',
                        executionMonitoringStartAt: '2020-11-05 15:31:04',
                        executionMonitoringEndAt: '2020-11-05 15:35:26',
                        flowHash: 'uwmbjxsmfpd4wr4ijhnx7sg5x8qid5uiscpm2kdc',
                        flowParty: 'fswbfc5p5txa667rhe85y6wa1eyqjjp98qzwnx4if8khe2uxy3820uqrj6b3emwqnq25m1ovj3jakz3w01ppq2ghf92n1dopzmu4r29q83eijeufshoxhpd7ezologe2rpobv16mv27xqf059v5hibdyxcl7yozs',
                        flowReceiverParty: '9uahgjtd8ihxm1i8c3naqrtf6a0fplur7tvz8rmxdgcqwemsdl93tl4vki082ing8jpgn3nbsgqicv3do5jp4sxrfhr239if5b2f94rg9bq13o3gxx2qddgwluhtdx5yve9do4jbif7qs80ayw11vxhw4eg7huu2',
                        flowComponent: '7oqcybe990pbetuqm7bwrxjkar8f03gcw1ky7pcibplpd5tkvyjx1iz1b7encv5u48dxlw2u7xk4t0rxsqqnztc0uerkfmfmnrx2cplh0ygz9c1zmu1ijq5eh9xdh1ztnnelw81suc114gwlj8lhpkmnqh3do5k0',
                        flowReceiverComponent: '4x9zn19rq19okmpi05b76lu2rcb3vqmgenmcugwdr1xomnqy20bhix7t0xwsf9c7ta6s4a8ptxesruws08bfp916gec3qxgm36bcff70vc3saj87fcw34rjpca1yenryjyhc1i10ic84kuq3lgt0fu0cjz8ejwrl',
                        flowInterfaceName: 'neqkg8mpydzl3bb5syom7a8zgatufm06syv6vjlf96fcp2hxlple5nf9y3z1dpgzi0j7bayd6gbkinsdu9v37hlojpusfwwzti3dm8wd5edmz7koc1b300mulrpcgyrxeut5h10ymqa7wf7aun5bvnhvkd1ptnwv',
                        flowInterfaceNamespace: 'lsj33pqfs485cogtwcknamkmxtby8ulbmneuvl35o7a4a7veu92io6sia2wsnz333gxu97iydeweyk9ht8qzllu2ykgtn1ib9uqwpvnawe988wex35oritprzuz6d3axchdov7xwhpu6x758088191vbncvt1esc',
                        status: 'CANCELLED',
                        refMessageId: 'm1w65cldpsqrwyzvj5k8dhudmkrzu9d5j0cmqgb2olxw4w9m5qwx1m2uvy7k5zn93yql9e66gwd05by68jkw766hrvyiruq26b8rco3s0lxz5l8e5kd8xxz9t0g3bl0evw984fcu5rmkdnufbo0xwz7crj5npqmn',
                        detail: 'Iusto est modi accusamus unde repellendus. Aspernatur est quis voluptates. Corrupti animi quis in.',
                        example: 'd2dft9gw6vqkctbw7ugat724ty67xgmzpgi3uc4f3akqfrg19zol517cw7588tljo30r6acsogauzz620u9ge8tymv6zbm54cyyp716km9yz465g6rfa1rvdr4hiygzvnm8azobjl0fh7wnd66zsqj5le4d7eakn',
                        startTimeAt: '2020-11-05 20:36:00',
                        direction: 'OUTBOUND',
                        errorCategory: 'pngr9gat8dqk6gfp51m6ktqzqi5h3k3c50zcq3yt9m5upojjvygxo9hqlkp47w24mz9dykvy680ffklulghqrlbhj85zqdrtpuqm24m5vrr259lsini4g6db4fjag7ez59czu7o6wnx34667ba7tog6chl1i0uvt',
                        errorCode: 'crb8t6zqg52s4hrq5ojurr4sa1vxd2lmafq67w611bb22160o9',
                        errorLabel: 330992,
                        node: 5463411618,
                        protocol: 'wj84uchjlcu88mgs8sal',
                        qualityOfService: 'p69d1sp2u2a0y1szzucu',
                        receiverParty: '1h64h4e09u6abv7rrygi6megsheib41y0p2kcq7c1t5gq2os70r53qgx5bm2b6ee9gpurr9va98esfszql3n858xqn6db1tobjqygz9cc77z9azq0y3xmteulrshdojeit9ahakivt1y4xsulefu2foclvsi2ekr',
                        receiverComponent: 'vp3y2g9fkewejjnttw4bqzd589knm2ebzxxg8jbsy5md20iq09veblcfmw2l6s8icsjzcswofa84egxri0kze156pb5z93t8w33cjx7uhtyd2ow55jmdarxuy9o5jy95pulq317mrdg8dtw5my47zucea3apnq09',
                        receiverInterface: 'c1vcixrz09l9mhhxn44emlm8zqkcujo4vnx90e5bopb3rbsywg89lsucf2m5tdnt6q9bbv2qrgvikaq4q6eovwp7rk5er150nj1ik2xuuodl9k67peocfju3v1bw5z7a6w95yvkl3uspr300povtbhyjh0kdrz2v',
                        receiverInterfaceNamespace: 'soqo3vubtyj656fjc7zkxl556l0u3g9sl538g46cc59fc84dmzlcv8y0u8fl2xj63sb8avotgqeq1uww68rq3wjs82tmr2r7mmo1zoq43t3ptwg7bn124elda2oz2gatr2mw3i1go1o97af42354sf532lrruiqr',
                        retries: 3498290446,
                        size: 7020330328,
                        timesFailed: 3768797842,
                        numberMax: 6383595274,
                        numberDays: 7642339797,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '9969550d-b090-4be8-bb96-3b17e5acd745');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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
                            id: 'f2a77059-8b6c-4ca4-a2ec-f556ae1e95fe'
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

    test(`/GraphQL cciFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
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
                            id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('d5917c79-7430-4453-b9e2-d35e94b6d9d2');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3f29bb2f-38a3-41dd-8388-8186546e8f9b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('d5917c79-7430-4453-b9e2-d35e94b6d9d2');
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9cde2f65-d0ca-4340-8d15-717f1032518e',
                        tenantId: 'dfbcb915-4a13-42fc-b6cc-8b65b04af6dc',
                        tenantCode: 'l4slstcwdu04c1arml8ry4lbhl4b7astky5db5jtypviztnb47',
                        systemId: '97a92b6e-adb3-46e1-8d16-25ac8f4d8e3e',
                        systemName: 'ua9hcv690z0os77se819',
                        scenario: 'nrah0lgyynbcxxof2pcs73gthknc3jgu8uhgww37mjafl2es5fnxzbi50sad',
                        executionId: 'a99a9e45-2a13-4bb5-89ba-0de2fe698ae6',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-05 19:11:28',
                        executionMonitoringStartAt: '2020-11-05 16:41:54',
                        executionMonitoringEndAt: '2020-11-06 01:52:42',
                        flowHash: 'ljb6v5l9g9by3puo3zqhw8zhoch0g2qsclsq32cc',
                        flowParty: 'nyi2hzelj509d0dm2qil71lil0rmf7i13k0zo1wzlmth67iub4deeopqn6pvsfh9npcrxtsyobl20f7slux3fddrinjmphf5leeuscg8ez6li1mm933ro88r07vgr6pi3q675wjr1ydvwd2a9fufwdibva7uczsz',
                        flowReceiverParty: 'nj955t2p7f73j8p3n7x6xjk6en5dvaq6px5xnvfidxtuodvaz1gvyiiaqr08ywb65r3fxzr9gvbkijuhn2gohr6lphtp3tqqt6elnno574c72qxa8599pomedr37bm3lhdt9zakegcmbw0868dsy3ssh9xhu8pny',
                        flowComponent: 'qaqm9t4cs5tea27p7jn5o5a1s4ywf4wtrsr7m07r39o5f7mge9kls0kaciaul5dbpdx9h3so3cgju4n7xigoyls2xs53di0e6krq19kvkrn0rg523fo8e9krskx7wvpb65fhgg7ymhl3592p25jn78jpvgjwzue7',
                        flowReceiverComponent: 'szdfbd1x7pkypl70edrmrrq1u688tskfqa7d6k8gppmn7wpov0517ryd0q364s6cahqjxkht5r3u1v3lpldj658x3f7x8hotyt9eq7l9xsgd83m1d9wpngphvo6tybz0oaf2imvfhu1ke2jp2f6ra9d0b0zwbjih',
                        flowInterfaceName: '22gyic7ahx1r9ipfnhqjhsqz40d4xnt4872iccgr6i22v5hdgrgas4t30uhoy8i6az3dkbipfn2nyuv3fbi9sv6y8tvdlbv4bj9dvk2jwe5ss4f9gb9vrgwqwky9607jp2ohjq98l6zvkbsap97uuda4cgvambvj',
                        flowInterfaceNamespace: '2h4t0tys2bykudr6ruxlfx4m1arjlie2c2blyfmx2yq2mzobjegmy7xha312urihmg5ifnefbfdwzsae046qbcp4kleasto8n1qqpcr1eiky2bfqoa9hnscwhlcxl5n1dfjne23p2dgrputwtd8iwdrgx5t1gq9d',
                        status: 'WAITING',
                        refMessageId: 'kmjblnd9puepokzio1e54ootso522tt3ruxq7i7dk6l0247lpfaet9q4mjq3avrl3enjd6684j7calo7ylnndhdimrm7f0j1a5fa9q1uar095urmhmztdiasbynjx4tn3370biqyxv1biwcqdd94rzrmx6hmgvnb',
                        detail: 'In molestiae mollitia et fugit debitis rem vel. Ut inventore vero deserunt et voluptate. Iste enim modi ut expedita aut non. Sed omnis aliquid sit. Cupiditate fugiat voluptatem nulla praesentium pariatur ea in ab.',
                        example: '85ukbxv63ki8egrdbatx4if6c9umv8re49t9ibu7vk5mrq0k26nnec1wy5sumfxonkuqz5s00sr9zyu73j7q02gxmxiu5m6oxrjm8uzrk4n90ussjgd8qz6r8i0pfbvla8lr2ysw0ushzb3yhqnoydv9j31vewni',
                        startTimeAt: '2020-11-06 11:16:53',
                        direction: 'INBOUND',
                        errorCategory: 'r6ny685ju5u0g63qruro2a5ynozq9phi9ec65wrvzz9c9if595jgxt3qs5udlbtq7ztvgai0u3ff6i87gjfqxlvlvuazfpx09e0rnf0soeofsyp19y2uumakzk5boa7u0is1tgwbbxqwbkhwya000fylvh205xue',
                        errorCode: 'req5oas2e7w2hffhsozasjnuhyupcoeu3cil3nl11wz8xvsfaz',
                        errorLabel: 844417,
                        node: 5725651653,
                        protocol: '05x0h7z36dkt4bk02hvb',
                        qualityOfService: 'wl35b8vyt56u0fwx6grp',
                        receiverParty: 'd2pl4egkr076u6qwv9hhg8idpmbjfenqqj3paddhm8n0svgb19q0eug1ieyok42dke76uctiisww1t705hkv28q0pj0no2niqe69og07hbm57zd2rlcgmm7gc14sjfuxbo0u7m471zf3acbc5ttcbca9z5jw6ayh',
                        receiverComponent: 'h3zp0w9eammnudryq5xasp86kvtrndki6ulvigwb7geyszde71bc5zm780829cwckpp803i8nc4m3m8y7fbqsf8rzs95j7pcc84p087u9ti7o2pomc8pt96o9ensd0uqrdenloenjdfpkr9fqcqq041ngrsahi45',
                        receiverInterface: 'dx2fstrv5w1tzelwr44ncr7ciswzac70z1kzo2ysl9y5yo08sao1qwu5jh0n91i13qqo70o42w39v4set97tc9i9fbzpatubx4s4i5fp5qwrsx9kzk7kkburk8wv1zex5l8a7lo8q2s0qv1se3s9b6qxfb7uptx5',
                        receiverInterfaceNamespace: '2q4nuhnocwshhp0x30oa3zyvyg9uq0jb6snj8bsu7oumq3laqyxuh51clhvpihluhowrzcvxj5ng6u8d3pzjlrocw5ozf6lcp9ms93116ktn05jjpuqtt51at0lfyog13j3fb3df5oy9fym0cajgmnn6o51qxm9l',
                        retries: 8203092263,
                        size: 2894317088,
                        timesFailed: 2537724186,
                        numberMax: 6753570875,
                        numberDays: 1448655804,
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

    test(`/GraphQL cciUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2',
                        tenantId: '5ff12e4d-97f8-4169-b8fb-bb6aefd8da9f',
                        tenantCode: 'h0ria3kbvy5jjiqa71kx8aujwiglbqmb4nl09xla60xc2r8drc',
                        systemId: 'eebbc732-98bf-455b-8856-9c27957942af',
                        systemName: '898ic04oy0x1ts1162me',
                        scenario: 'ji3fbclp0tahyvcjzmzaczea4532whzdq7sgzps0azf11v84f3vvw93l42xf',
                        executionId: 'e9d7855f-d0e5-402d-8012-48c077552e38',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-05 21:44:44',
                        executionMonitoringStartAt: '2020-11-06 08:00:26',
                        executionMonitoringEndAt: '2020-11-06 09:17:48',
                        flowHash: '971qsn9tepncmk87kblek1p1hoc2jj18bjbd3lql',
                        flowParty: '8q2avr2bl7dtdik0cjcacfpiakjby2nm17omi7l98cqtit6wp0ksruwudlzg3j1u6mvydae38t5u49m9oahwuzq7labib16ebcqpcq8emzg60edhiw3zq2u61hjrjluwqji7x67bxgsiiowojkdzkgze50wag3dd',
                        flowReceiverParty: 'homveludxcikccgaohqkryp92tkas1w582s49pup55j0mliefsfsm07wxcbutxn886g04drkct9e67h6k7vhl0wf3ww0um3vq4vv4pnr01aj14xh1d8k5j94st5vk6bq3fzaqqgbl50t06ad89typ1chmoqvmfed',
                        flowComponent: '3zvmwowd9std40q2eeke4h17sr5b1ayc9ohtjk87uv37pzsivlv4rfstlvnqdp2krxnhs6grwef9o7l915bv8doui5wfihm3w3u28b39issyrtc1j84z3aw08ao31bgnsk1melbcd47o4nsorfolyw3uqi0u1qrq',
                        flowReceiverComponent: 'b6bt92vnvwuadfuqes8hihs4o7a9yytjsupk8idxqm03xu88hebcvt3ec5ozek49d6l50gtikbemuyin126cla5bmy05f808ncdj32180wdnosnn59bf8nwqpd08rk86fi1sjdeao7hfa1qrm5t1sjnndb5pkorl',
                        flowInterfaceName: '7kw3pahu9d5dvztbg2kkhsklkemk4bqld7u0umfce3j3a20xhbis0abhdqdjhc3wgd2sjttz0jg8zm9a8ofex92flionku1mn4ayvqukpb8usyq7el9pjtg0w3p8bsg6t4s8e63m4j7k7r2rx7qxqav6mwlrq91u',
                        flowInterfaceNamespace: 'lk9f5gcddi2mq9smc0yuwky3iszzltdgxmmcsrnvjde7fmujexp3hlfcdekwsedgnr1v0pmx0t6n3fzw00cv76wqyrknyh0t0tuvzwgwf8vqwtjwfuc76yv973stng619zm6a3v8p5iapxzpn8ln71yur5gcx15f',
                        status: 'SUCCESS',
                        refMessageId: '5cfszxrz0lo47sxt7gu653nt0lq7kjurgnhgik8z5w8z5ctpqbpmp3dxs1od3va1ugxh6fe619uzp8z11wozhwqt90fccbbre83d1rl7324qpmoe3yd2a0xu70iii1pjzbwn1dyjnzq8aw798radrsgkkkiq1afn',
                        detail: 'Tempora illo sint provident voluptas porro corporis et ea debitis. Vel quibusdam exercitationem expedita optio ut alias at repudiandae eius. Enim libero sed maxime totam. Dicta optio rem vel. Eius placeat ducimus in molestias. Et asperiores deleniti omnis dolores.',
                        example: 'zcpxmsgw0g587077gm8ikauhk32e7p08ud7mllh3gf3wcorpc11co198f7f17vgkb6ijvm0npr6s6x1krwxxr3n68vxfge9q99gvgo0wmbb4a41wtbrs4l6arj34f9lfvicjg5depltp6wt6nses9vxz6isosqkr',
                        startTimeAt: '2020-11-05 17:14:16',
                        direction: 'OUTBOUND',
                        errorCategory: '18mbf3cmfvlp7henwhexkn5co5p2ylewckqiy3uocwo62d8knr0ob3gxxlnlz8emxerx80b1j1p5ybr4uhv7fxoi7ldidzvx7db228dptr3fahjc467qwhyuw27lhi84rqbo92kehgsijxgrufn69od7dl0p830m',
                        errorCode: 'u1rc6gulu3q5c762cqrn9x08xmmupsdpekcg9p8gbxnbd5rrps',
                        errorLabel: 356662,
                        node: 7532162600,
                        protocol: '6y6w91gk9tdzpqjunnn5',
                        qualityOfService: '17i82ou0limrk0xy418u',
                        receiverParty: '041w4bvn271xdr6lozmiri1quqvysv1udgukanzqjfxoikicppxdy37j2mapa8nw5uic214hurvg37u556jufl5skxyn3jo40niou0ewfcbr5f21e9akl8pfmd1xxjjox4fjzat7a0qvrc47shnq8h20126al1hg',
                        receiverComponent: 'kvip2c3l5q1uw97va5lv5cq7vionrp0z63zllhxul421wswv172xs9vkxyq6b8kf42ttztp52bo62ss72adlz6ysrhfijy0ykm93iu3hac120wnj8wup8d7hc7vpnq2l94tjsnboytfdn7gjibnyrmdrxutgxj93',
                        receiverInterface: 'coo6arjpyabpgtcabbcpsq0y03liwsbin1y1w85do01gce28gpsk8d5xogecwx1i736blqqti27ef2rbqvspgv95gftfo6idiwhu69a7oh46rupt8ofobyhezp4l29m4y17a0ongvt1ihz92gx3sg3nq08emowjh',
                        receiverInterfaceNamespace: 'z8ynnqhx9oghag44pfunl0l8zdlpmcbieid18o7cnl28cnz4jeeelyrcikpi3epm1x7wygjoi4doj45r75j6wpgo1iu4i5f3ri7osz2mhg0kd2jeiwxtebkj1bequ6c8n739apo87ybw4vpqfapld7t5ydljfbfz',
                        retries: 3247284326,
                        size: 6579422934,
                        timesFailed: 4935717733,
                        numberMax: 5068349433,
                        numberDays: 3168654107,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('d5917c79-7430-4453-b9e2-d35e94b6d9d2');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb69902e-98c6-4416-ab76-6ae5c3774993'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd5917c79-7430-4453-b9e2-d35e94b6d9d2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('d5917c79-7430-4453-b9e2-d35e94b6d9d2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});