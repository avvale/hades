import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
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

    it(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'xfndth5j7pcgihghzpzv',
                scenario: 'tmfh9zhb5dr4cp0sl8n2n4atmaec8ww5lh38tdn4qmkul9g0fq2939jsfj3j',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 08:19:50',
                executionMonitoringStartAt: '2020-07-15 01:35:47',
                executionMonitoringEndAt: '2020-07-15 17:45:11',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '8mwipsun7gqzhf0h3g6gg1tka35hfbdkq62qur9mx41sn4z5eycfg9ms89pd3w6e70wiyb9qcppd1vtdlwvi6o9hh9dchjasrx69g4hstg888mekll4munktuxv8rg38q1i7v917132hqlhhv853hxd0pop069ea',
                flowComponent: 'x2k1qheqbne7rpzijgjemy7ej232ucq3yspwd29zczh4w38my11mnlg1zrc1ezrml0gnck55tnzmaexka4zml3xd1xf5wccz79ubpb4xgr79cwr3cwt875mvmb5r0b9xwojr4nd3x5ef6vtp93ombhm1ff990rbq',
                flowInterfaceName: 'msf7zz49g3rdwjoqkyxxs2uti3xcib8tttz3n6az4s8206pai11mibthjxiloybkmt2aa1rt2wezwwv1ozetpxq0w9ev11q7xycxdc66gy9q9i3kha6j639a067izn2hfbgu3bxbjbq36ad3op15s6w3tdmiuipl',
                flowInterfaceNamespace: 'b8xh9afp7p24b6y0tbx1u4to4hkpajavltvrsjb3j0mmhdfammykn13r0k3dmjgc03ql8ywnlrzse42b41pupkfyz08cr55xzim5yp42al122fevslp103w10ov45i60oi3rnk5z9je1zrxp8ygqx751ym3yl8uj',
                status: 'SUCCESS',
                detail: 'Earum molestias velit consequatur quibusdam. Eaque consequatur magni molestiae laboriosam. Ut excepturi velit rerum enim quia labore cumque neque.',
                example: '899pby8qgo1gf283ks8934u0olu6y9lqonw82yqan82stzerte15oz8x7jz79fww6ga6z96971dqyhdj6r519xaa8ul464mri067l5j3nwwktm05qov8crpb1h54yr8uuakx6wdcsebj46q88v7o8cq152v3sm3n',
                startTimeAt: '2020-07-15 23:56:06',
                direction: 'bhdq9yjdnghqzuskmfw9',
                errorCategory: 'h6ljd1uqkoym2wjr84035dh0avgpnmbs9qe4hrqfo27rm4q5l4xrmr3jth5uru7tsydup0li6kujqmzimxy6lspshjh8l0gcloxs2n5ob3z7up3698pfmngt8cp4xo64fs4cd0kwg2ovm0p5eaat93r8xearjax4',
                errorCode: '9kwn7f37wifspqv7fb6z',
                errorLabel: '6dhh9esyqan0k5zk15hpgiy5uc8kp68907l08nyz42fsv89lwdr4sw52srck8khzk61sia6vq8bmmddtf04w9ahpbl5bp2dyzjh6ox7dtwbfi9ucgqapgwqgr2e6whtbt4c4nez914rcenglso7z9ghypzoj8k1u',
                node: 2378753629,
                protocol: 'vobxn0e7h0zmvrgbap2t',
                qualityOfService: '5g9o3m832n3hqvanrgpf',
                receiverParty: 'oymkq8ky6xsb9jme2xyk32khqhqxs51qg25154r2o1p1zapo7t1fuju86zh4tng53bmm8dkjanzweuudr0h2uhfxjvf650v2kr6175ao20g8ggyhbvgteg4vpwuarrpyzzqp4ny249ysk640q4e6thpedczf0txy',
                receiverComponent: 'gv7tn1rvpg5b36grvgteoj9c3losiufbt8i5lu57hbl8upye1glyfurcq2euxdpernze3sazuuoi1u2y487lfftpqh868qars737xi80lwml3yjyjngbxgm4hgctf2tqpc41635piqxsbdenw1xtiltqjf4mik6k',
                receiverInterface: 'bun2w6qvzot8c9rsa5p3x7buz89lof6id31akgioayz6znpg4lp9pn9xtu6iv5qm2ody043y03r1fhtrg71oj83oxgahhgo8y9sg7pjltvtb8onwkha6070fqj5l34vxdtx86101i6809ve5m7i0ekwkle8oowm3',
                receiverInterfaceNamespace: 'z8j696hqmib1vaq9agekmbarec1n09xag2r4aeu54qin2w8jdwu8adcmtp6n5fkx28fbsb1vlimea8ova7q3wp8umvnum6py8k0fy7zq3t2evvgt7b0gvfvqstu3j4mxzemlosxu7gm7b7ielb1ayzv02gssimhn',
                retries: 8231110238,
                size: 3821400352,
                timesFailed: 3859075808,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'wwwfzagfm8x9k3l14ovd',
                scenario: 'y9wfuxg7yblrcwbdvfyjeyaq3nkn6va4vrys0309p4csb7adonwnaasn3ov8',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 04:04:51',
                executionMonitoringStartAt: '2020-07-15 21:10:48',
                executionMonitoringEndAt: '2020-07-15 14:29:32',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'axsfkbmsppd1iuocobji7d44y9roxzo9v46bazemyoqtv061xvludi7yncngzcvikyjb0eaum3pnf3dtr9ohxx26fhf5t231xvuysgx121hthcw3xay0zabds0gpimonmmi0fu9pw1rwnynh99sqlx9js8di8oae',
                flowComponent: '8xjxq5rijdljeqjwi7ikdxcdnr43yfs78bzh1cjid7q972kp5po93is3h3gzpx20ct259fwmtbp04q6ybe6779jp9uf0oq63gjx2u9hkr7cg2jgg2s2vwgvcd2wk001ymbsxspkxm0xyteq10yke6rvgsehm80qy',
                flowInterfaceName: 'k283gdxlrx1pptdt2b1fevijwlt5x1758pohnik83j6r5v5q3b42nn3ystgpubq2nctecs2vasp5pu8mspycvbd0fx2xynohzzf5del49mnl5v8nxt3oavh3vcg33u733is4keovrt3zml29rwr45ovwa9z07ktg',
                flowInterfaceNamespace: 'qv3xlinxbtei9348ob9clrep92w504kb8y7x2g799yuzjwnxmerbv7zhs7tws3j4sb91ag5f1r0p1lcmazdyaa3xbmqvu4m97nbe993lif10wki6wmqd781nm6e9kc50jtb4gr78oeyvuchdq9oaresri6d7f1ia',
                status: 'WAITING',
                detail: 'Repudiandae veniam consequatur laborum sit natus ipsum accusantium impedit. Qui consequuntur magnam. Voluptatum natus fuga eligendi possimus. Veritatis velit expedita qui quibusdam eum. Eum dolorem repudiandae est amet natus omnis. Illum distinctio temporibus dolores voluptas voluptatem tempora eaque.',
                example: 'jx4sq9of2urfc8zbxpszpsy0s1e0ou0fn71gx0nb7u82nl6rfnm5f4uy3lrekk4lpkd1a0ws67cho1lg54rz4r8ofhkua8u09l9qv6q9u2qq2pb3y8c9rl191idubhvzfywd16m5nmzxuckeqvpi6wo3w8tk42eo',
                startTimeAt: '2020-07-15 03:03:14',
                direction: 'te4m5nv29jsd8v9gu5tz',
                errorCategory: 'tq9ujlpqibw74oe34nh27ffsdh7vxv5rdfqt4idk4ato1wbt49ft5hyk8ubef19031cmdndhm9al837cowcerhiyildbjn9zg2h8wxoofizoiudpwdd7ok6emgeilmdd3qs3l02kuaef9uqb912l6et6yxarhl9y',
                errorCode: '63zwg3luhw3d9lzio1wp',
                errorLabel: 'hw4x44rabvbx31h7cuhyrfbtkl8pvzlly5ymo4entps7a7f3glfjkiqivzfnby0oho0s9y3fp5a3u8uplg7stzzz9qcmyyi000juexhtjm4ka9gzutdojtdjwbk05lokkdn55mqbe4ex3pdbowuj2vkse59oxnhj',
                node: 2944166211,
                protocol: 'rh6wllui35m5dvn5u0co',
                qualityOfService: 'ef3eox5yc4sup379mf59',
                receiverParty: '8vhr066to8rnr241mt1y2h8r6x7ascpcbkbhw0ohn2jgi0w4cx71evhoetyezoesno7gow8nfm0spsc2yrlc8653enfx14rtkjow7za111i1pjzx9myv5f4140vjpboqf7ubd9of8lfkib1xid0uaadnda7khbb8',
                receiverComponent: 'w7r82insjouem5iy9kldzzwz044nk9f2wrmy6nxopegcsvnytc7pjgjus7an3w1w3rxri1ep0bziyhg0xkujhkmq1hf7fh8uxshj06tnaqr72449vjj9vmwpau843y3zg95379ay73y3ppvz5qf23kstiyhan8xk',
                receiverInterface: '1juna5tvf8j6sg8qyopwfnlqwxv424hizp27pplh54kv3fzhldq7hm931nh1k8i8uiorafbhlo4hakzii95uf2b28pr23rzct2ra24dlturhoctfqy4mb73urw8bm1uxu2ie9ccv06sf7vh4derrw0jbjvhp7jc7',
                receiverInterfaceNamespace: 't9gbvlt7vxmx8yeoblpix47kg8dazhfcy1lox0y9st8cfwmkggexxtk7vxgl0kv7789vjswzfm7313lyttlnws4zz2tmzpvdf85jn5ey97wobmwb5wc6vubp2danfm7uaf6resgz7rjzwpg3d7z09bt1fhhhepl5',
                retries: 5309428242,
                size: 2988536610,
                timesFailed: 2493554195,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: null,
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'fp105liullbkju2eeygu',
                scenario: 'u8319mylfevuggae3tgauxfsjxqxb9x7h7z14kscuyyqlbk40zkfuu4ypfyy',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 18:53:17',
                executionMonitoringStartAt: '2020-07-15 13:24:44',
                executionMonitoringEndAt: '2020-07-15 19:57:47',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ezsmgv5fq9i6rq02c7nfg0vuqft8flegj6gl3j0hnwxenzv97q0ulwslz6pti3dmrxkuiq76i6sj5nza6rztuc9r91seciazdhydddx3re1hu2u04zehl0l1m5wzhmn0dxw2zi0c13ocaoeqpkigfya7fl1tpwdj',
                flowComponent: '813uvgcc38ry5e41apr3pbnwwozaw6pp1zzuak3jzd1fvyx3yl6wz335uefxib2l0lncjs033v9rz3hc1a6fmns170ukie47apmwynr07x407d50t9odyytj7hal2byy23bvkspkkhx70v4staiwjpeisbs0g3hr',
                flowInterfaceName: 'as7cie4gy4pgchlwvkbp2fubshu6tfsi56kl4x8wqyfqcdn1ad76qphq6irt5b62shcbkvo2a2mjsbw8xqxg56vx132ibep7wy7viltq32dz8wflto4mi5p8mp6hys1j6y6183dhoga2iuf9fc4i6qksiu04p5nu',
                flowInterfaceNamespace: 'r9vtwi0jtqgafke6ny40jl14q1p7m3xjs7y38g2dakhjltdzkozelsajmnnz6wr67z3md6rhvaencfc8qczsqdshxmj49cj2qisy3ghgqsiia2et7jg57qg45mssiekkfu22ktim6pzpt7h1sbnh7aijf7fpdfpr',
                status: 'CANCELLED',
                detail: 'Eum voluptatibus ut molestiae voluptatem voluptate quia provident. Quaerat enim voluptatibus adipisci. Vel vel reprehenderit.',
                example: 'aj6ww3fxih8ue42c6f3c848uw2om3y4i0h9mu0ngubkdjbuju6qgqv3geglo3pt3xcmssrn9b8tvq1l8snuyjrc8jsm2f5fykjow49106u2i48n7sez0h8nx7qhnnmx2i45h65yvvwpj8dgms8ts2f87lon789l5',
                startTimeAt: '2020-07-15 20:31:29',
                direction: 'uqihfbxqrrbdsybgqtqy',
                errorCategory: 'suz0bf5q0rql1dd3vftzj159rwyxqxncwqkbmq7xw0vyhj149y8gev5bugcnl5mgvpp1lb92g6h0zip0ghs2k3smlb45axc1sqwspf479yitf72s2hlkbhzu04w599jm0syuhxkfgguducgn6fwbxpuebwz88u9s',
                errorCode: 'mvy0uslk1qpxnzdv1m7b',
                errorLabel: 'ietrcde2y14bwr026ad6dcf3qv5hxpgn0hvxh1gicqe98ym3brq6b7h214li1we36xq756z62tmbd18s9g2p6oyw7vypnx3e1n8rm66aehf7un1t9cbinobt3omsbqagojhayqytpa2frrz5kqc6ewgl6djrn6r5',
                node: 1887043310,
                protocol: 'g0cytq3uutdqmocds6sp',
                qualityOfService: '56jvdio4z21lf6tcuh9e',
                receiverParty: '6p6y96jmhsicg2evi3rc6dzxdgw951q7cpozn3rewmh5m7butcc5vprbsqub85i450z0taikyweu6a6ky8w2n99rg5d8wi1x2d8o9yxuqvte7abz2n9lbu5z1z0jasfwmxkq6unmiy36w6ora6lzw2romcihqjvs',
                receiverComponent: 'djlm3u14uu01spbdyis9fsuvflc2t1d38hspo4887c83tq70gl05xlkgkaojf2ce29r1eccgldcwpjb5ir8jynmhigexllul5zqflgwjp8la830203mxv30kmfq63elm5tfv1la1x1cqre7kmncf2b20ontgmohr',
                receiverInterface: '9w6ptlih3b5sp1up6m7pu8erj5cii54rndcqwsmp2us2r9ali8aug75kk51df32ljjootsur0dqryz9wpwcml4wx1gfbfs0on466hk9lg4wvjou8k5mejgo6frpzxhoe33dy8upv3wvkeu0mrn4380i6bwhn7mk0',
                receiverInterfaceNamespace: 'xqkbh1ekuocjbrq9st3ji8juooeww7ueac1hdp6kik77sgnj29jzapg6jgmj7zkk3a1eu1e3jd95b66nsxul37foa9iigfq2emqibcdix0rb3ik8ndijj6qsc3qcip25gpv7yq24bamjholtwvbyy18zun645wpt',
                retries: 6640996152,
                size: 4405578094,
                timesFailed: 6098489149,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '7ml5g6eekcqdvinzluqb',
                scenario: '473ls8doch5c1qqyprj5oso0on10ih6656zjoh100pyc2mltxvsshglifacy',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:02:49',
                executionMonitoringStartAt: '2020-07-15 09:25:15',
                executionMonitoringEndAt: '2020-07-15 12:17:57',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'f5hf8zoc3dd7zl2vy6bn5vfele3uo9svka6rib8qb2s78xu85dbh7vb23c0iroy05zqxotc79jt5v8xbsi6tsx5l6iamv84vel0z2e8306180ibiq0u3xb01ua8sdn4lwns5peha1gymcgfs9ce9w4i9auhzdnau',
                flowComponent: 'f530qyunjgy40lcnc5aamauacl65cixodsu274s6ekockvxfbixl8hhqls0vqclblijp6e944n7mksuxkfl7of517j6n1sq7i0bxdoig9a7r7cu34z8vz9ekk4jru2cjgp79itj0rdy05me9okhsyqte7xwwxbdh',
                flowInterfaceName: 'ima8m11jspegp272wjzy5bs1m4xhdamjkl5py9b7v89m7ivdzm8obf7y2h3w59y0ov4ay8o3ilww13uagxojvio1j4p57oji5eiqcpcgo2behv9mrlcmjgaddfokwe1rhy1xr2a8i4hzlqa0tlq7dful0kyjb8zd',
                flowInterfaceNamespace: 'c3buv017zh89jqxtleiu10halpgzevndaam9agef1l8alu87t5r60vf47ptcho2kpw413q6lvk4frbgxoxde0drjqjjrnwldqlboohe2gjlc1jial78bv0f152hmkjuw7kqoyzi0oe7ctpswvjvypsh5kky7haaj',
                status: 'HOLDING',
                detail: 'Consequatur doloremque dolorem expedita. Nemo voluptas numquam facilis vero. Dolor perferendis molestias ipsa. Natus sit aliquam dolorem voluptatibus quae maiores fuga culpa suscipit. Sunt commodi et ab vero doloribus. Ipsa quos nostrum voluptatibus tempora tenetur voluptatem fuga.',
                example: 'axbf00w635jhe0xk6mk883s4tbfrtgxbtzwciaauimzem9mdghxibq4s91fua15skhuayos5y944hrg8kb91htrilmheos5gnjxgl0lx9jcfsx9hieldfdrvjjq44kurqogytje7sey9eot414avidm3pkqjsxw5',
                startTimeAt: '2020-07-15 13:45:23',
                direction: 'r64o7l3nhe0ybgn3uz64',
                errorCategory: 'hmhhn0fzmuvcph75jf5hseb4y7jvaq85c7gt2hptsbvgtyvasieo62rlot3ex6k6feb7qykihww5akw4o1lfr7bzfmvsqy7lrrku1frcry8a2gj408ny48afsetg013adrqwwlrfa87b5uf7mol98dk25ggxa1w0',
                errorCode: '97htzg7r0ahwhjaqlv5n',
                errorLabel: '5xpfzwndotbgzjqykv9l3rg9uhuh09zgehzfjkyzx8l1ve6362i3eszfbok65yhqa7z7wm64pggre4pb80wwe69qnpu8jvyv5d3cbmnkktznuzy6rozr6597mn5mph10ocaga8o99y2nwaq8hvrd32b8a49f17lo',
                node: 5719518768,
                protocol: 'mfw1o0ecxvys1cqso6tw',
                qualityOfService: 't8h4ws266qvgjxr2dwh8',
                receiverParty: '21r6fwvoi43pht9raxupm4tetf1jjbctm4r111w18odz5dapepqs7tmbg1uochztqg4ocxuarks1kolua33ss9cvu4o25yhbwy0sf7lst0lejw8o1na1gie2z6xryvt47hut95yhd1n2vqgsduwbb05vskhlafdn',
                receiverComponent: 'kz5nade3yy1e2lm1ppeiueiq6amm0k9dob2hj6yxzo6am27osnsv5asj9pbocg38vu2xj7m4fuxquid5jyj2uyn5fkspc7l1nfd6t56tcyj86xmh1agbwiqslefkdtq52kui9dwnw3ga438btgto4kmne4hqc782',
                receiverInterface: 'vu9u980zl04swyzqcjntd4lpe5jqgovz4cojq9esou00bsfum9mtcubjxnrmokjvcxp7ej69ickgif7xb8f0ly7rgdnid6n9wb3delii6i5ttt6t9za9h4cfsbcxttcnxs2v8smajme04pbfgmoe586io0sjnxvq',
                receiverInterfaceNamespace: 'g2vcyfs7jiac8p1zag8mqlvcl9ttucgmccv8ehsm2fpj66hkfck6fitqlyr34umkniudtf5srzs24ttfsfzd5bfi28r573x6ovdhn3trl7np05gmao7wywer3347bhkwxgqrauvintu68dgvqeqioess0v8lg1wu',
                retries: 2644162124,
                size: 9769145830,
                timesFailed: 5116377201,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: null,
                systemName: '57w46ei35epzdcgbd9hc',
                scenario: '2bxagzfuh79omp75w2wnpy6lgemvuqmmp8sgrpmvzsl3p8thf3qolqqx0qqp',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 11:40:55',
                executionMonitoringStartAt: '2020-07-15 17:54:26',
                executionMonitoringEndAt: '2020-07-15 07:38:10',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'a5l65r1tiyw04eqhcazvtfkpv5nwfd2ywnqbxf3js0ich9c7fapquy72gojjwhnfwiyj5wof6ayle5n02wpo4t0ztd064flwrpj788687vjprnhukg383g0cl18hfet51lwvsiqeis7nnkafey4dvd2jczjlf2mo',
                flowComponent: 'y808bg93a17yfi0qyz6kwx2t5yr93zgtxx9vubho5j6aqvpvd0c6ndpzv4hppud35js1mszuo1mhz6bj1hvhbuh3t55r9e06v0c6x808mi01atcmyokmokaa01jm3dg7m96wul2ah4ru0s7ay2o2xn5x2uem8q4i',
                flowInterfaceName: 'w10kfrb81mo6lc1iz0hyv3rn7t19ulihcged49vko0im1g55l7hosqd5hqrrrwtg33qvd4lxglpwn1eusc0lw8mhau935ztq6gp841aeuxusef9beth97ql92nc2k7mu2ni5gvn9pz1seij9z1u56k9d45r2xo6r',
                flowInterfaceNamespace: '65eyyuh6vv3vdul9rvay4didwr8bfz92882s45wg89ysrgce8d03psdri8i9lqc21ng08h7wrtzq9ysd8v52lvsezvwfdr2wmxxcb6i489jo7me1va5x4hjxf051twfmjxoqgl1jfzphtqpk8zygh6xw0gq4o4z6',
                status: 'ERROR',
                detail: 'Voluptatibus eum excepturi et deleniti quia. Illum atque reiciendis repellendus neque ut. Consectetur nemo quas alias doloribus autem alias laboriosam. Doloribus debitis odio et dolor. Dolorum autem temporibus ut. Quis voluptate provident provident commodi nemo harum nihil quia.',
                example: 'sk6be4e1c9u0bd8iuectih29a7fw0mej3x67odov03ywuwml23skdobn6s2ngzqmi8d33n5i7ipt302nl03nvqlxjo5pugiqu11w3esixyj19rmu6nibbov9kgd9hssfi750hy3qkytkx5z8nrrmlu0ffnt9gmwe',
                startTimeAt: '2020-07-15 11:02:39',
                direction: 'msubjn5ie458h06mo54j',
                errorCategory: 'qd74c73d6u6mjy76cozg7c1hq0i4vr43bh4kkxu58sibpp53npcxlgr1f2co21oko4hyjh1j2a9qdmcee2wicm25d8wkz8qg4e2e574dyaacks2s7ge1axpecf71jpuxu51qxxk2uyaqk6iwizlyfzoekh7m3eq4',
                errorCode: 'blgg0k0imy2w1bz7cb0i',
                errorLabel: '84m3rw67n0e2jhr4u42s62ihpysudli30l8wtzwn01f8dxvni8ziaczir55dej4vkfdixlvlgwolhv1lut82c5pen155esh6whqr5vb1l59jy9e8t1zdunirmcnskezwd9f44m7r3jchivp2yzz2v7i4qlaaa6dz',
                node: 3718951200,
                protocol: 'u27a9hbiqv9c3tm38dcq',
                qualityOfService: 'zb8vv55gv75hy6hvww95',
                receiverParty: 'onzh7qb8vxriadscsqrjc5glczyqv6ufzxpt0vi08xh47tvllbvwbqt4z65wxm15acmi3ln0d5bu9jw183soufj0lce223qjlclxmlgic119okrwx82sjz1t6kjdyw76qh5b7uiw4w5dagxpgdx440izxp5ujh99',
                receiverComponent: 'wmor8ur5g2m0xn17yzboqxrpmntjlat6svodjxptuhqzm5xi5022qz8klbnhlbcc3c36weft2p1qlxp4684r2sbicw9ymm5tjxzolo2qy28aze5necjgwtqovhx23lega2vw14s04p9cz6pwfgb46eyhob6nkedf',
                receiverInterface: 'atlyuns759ocsxmtlq89fgc8l4x5s98dsexbk82lihhsvpbsyelkyrif3cj8alug3ymxbirfmekebwlb7zcaoxjda9f8jbwv17tk0czonbgl366ik7ymkb0b7k7lxb0iua8a0v93f8h2mcsum1gah9y3aarkwbtl',
                receiverInterfaceNamespace: '1gya2r53q2n2wwt07qx70nwbwuig4mfb65wlz1rlo2zzz7mzs7nia0xg4vsdg9zr4xx0cxe818z76cujzmwjnaxmckv53kh6th7oe1yzdphvd90h9hbs37n4ad7bnc7ykb3srxy2wzqzydsi1wa1saga3me3tx9l',
                retries: 9213773363,
                size: 7449552975,
                timesFailed: 7802831602,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                
                systemName: 'wv0vwiz6461i79nlnl16',
                scenario: 'xbtkndrheygcz3emvajvlwjmgj2cvs6m5aapg0lewzo8bkhw1a7mpny261vz',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:28:10',
                executionMonitoringStartAt: '2020-07-15 19:53:10',
                executionMonitoringEndAt: '2020-07-15 21:09:16',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'n69vjobj8czsyu7rw1a9ewst9bkezemq75iercen0vjzcmkmvt3g67e7x8jf0uxarzvv5t9djzov1l49poyvl3y9vcv6o37ldinuyjy8s1cf5sgnst3c3u5hzmnrocx68gvio1iy9ya38kl9dwxovcjelajvzuxj',
                flowComponent: 'hagiz0hvz8bswg1m03jc23k8qr8ir36shqaq8xwob6smkx6evvb9jy7uawvlb0e4bi75g6q4zs5qzrtuev4n3rz0e0o1rwqngt641m9m3597wqwvxinxj8yfkyemgvgephr8au6gtksau3c7s8tdevz17s939bec',
                flowInterfaceName: 'ux86swe69woc489ci6oxrefvo41xu2vfm0d77aevrhtqp1a58btpja98plov21cwfpvspu5kyrs3yz22yp4jcc4vk170lvgw9nsw3uukn9w4o6bej5ieuu8647ng6uxtga8pmnskstbt3rzbt18dyxd0mf18xveh',
                flowInterfaceNamespace: 'cth25c5svz5bwkwgrk92vapm076b4rdkmrdelhb0qwcat968hudgzx3hkvhr44c130rzeea8yak3zmvwvjulzuxh887prn2xjqqufc9s6td9z4h7k2t0vj803fu3nspqi4lxx1w53vgeehk301lhzy9w2ux2uawq',
                status: 'ERROR',
                detail: 'Rem enim perferendis quia quia sunt ut in. Quas molestias pariatur non. Laboriosam sint optio quia illo.',
                example: 'mrh1r0lu2s0fnxo71vz2aw10q7z6jwmetqalmopcodbku92ddnb69ehoilc830u1appblqgetady3mpxyyh85gpiy2j9aa4xbgslvnwccb6rtsdrzx1ou5vsgocl3knq2y2n1h8khmq2fabnbr341skzak93tsgv',
                startTimeAt: '2020-07-15 21:39:06',
                direction: 'sahjzdz4bf8249e3d8jo',
                errorCategory: 'zc1n6jdhmew9sq7hj642yzyf6qz9js8gwajqe8h31hxiyrjee4q861r13bvkckala70hflm3vrdi0jejfy7fvc55iuqonmxv8v8mwsckhashitrpr46pswup9pr8daf46kriuv8vpt5pxkl6lb3ir7tk7celq59w',
                errorCode: 'wo31fx42m5vfu5blflz5',
                errorLabel: '4nlmadulndtcrzrdtwu81eo2q8cf0uvlp4vhynbs01c7whst400cj7o8hs7sg94h4dafpl1xfnn7fezjiude6hev3polqhrtyq19qmfsropkw4536a069ohk597rvn0npvfjprg6wwvcwegrednuvbepn7pgc9i3',
                node: 1264168800,
                protocol: 'ne5gixlvr1wnxe9cmhvw',
                qualityOfService: 'of68z4rhu7brsy98gf0c',
                receiverParty: '2gfgwa9fta84d1lmfc42yfabk4qk7usvhkgcdnfs09yu4diamdrnm1ckfzwiu47jbfw5ikz8zfpxftsq1w6epcuod0ofg9dpy60ehjfdy6bnjsicx804wmleauyqgx8fpnx4wp2tqc52uhngz50saslpymzog5x1',
                receiverComponent: 's5q0vsadjwhae35amtijs5dw2kbts5qrvzzl4qaj4byqz82iokuc3147aoabfns52q42ornjfd0i01ki6mh22i8jeavu63r6rgqrwdgea62sp3qikznn49au7wxr7q24d6nm5mevs68ihqui5uy1oct70vnhwy3i',
                receiverInterface: 'bt4mzcbwl2f9od2nvvxr5nht09grfpcszxy1f7ftzbhiiazilp6cqsutmja48cbmh55om6bgefnhek6ejup89eng70lnvozw5xn1bugi9lc8snij1x1rht8npiraws2urr9gxdaqim57vktxk9rwvyvmd4py7z1e',
                receiverInterfaceNamespace: 'iwux7k3zul98erfdxm820raer32rb8ewnz1tbf5ks1qf1nrd8wmdwk5maxs61t7k07u4c34vtk5luecm5jy4zmn4qn8dlg62m9ynh0ao5sqjoh7g1u1zc44j3hp84lv9ln3hhej66kzsgy1oqg3p7yi6go4ifte6',
                retries: 5914394039,
                size: 5042306775,
                timesFailed: 5974186073,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: null,
                scenario: '11xayfweo1yts6u26ieoj7zkh9a3wpcoz7vpzar6wclfempqhn7ydyplbkdy',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:17:55',
                executionMonitoringStartAt: '2020-07-15 02:22:34',
                executionMonitoringEndAt: '2020-07-15 05:00:10',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '9zopd5x0h9gq7l2fcbtc9sdzslj7jfyf4q8x2jdiboez9zcsetau4yfp6pf45le7iskuktvx04acutwfzqwbq41d3rqubus7tb4o743gt8o2g92fa8d10gnbrndyohymfsypa562eg4rgidvzr69dht38gyuj3wr',
                flowComponent: 'sxmzq1uucdwe15f4bf7f33455olds2obkyflqjh7jn0r3izvkc73wvep2v1z6lwxfeywp70wd9tthckn05y827esfsh61eu3pzzutmt2jm0tve4kisiya9632j9y2k8azhvrq2gnc2ykm90yqwj7qqsjautx4n69',
                flowInterfaceName: 'm5lestfqkb858q06hp3u9acf7p8aceqew5la3ftmz65xki8qiingm9za1vyxyxh714ke5ilu30lv9fezl4mwmqijeyo97rwwnaqmixfzl843p1cvamqqeqyndn2a23882d5hq42jkftqso4v184zd2xftwval1k3',
                flowInterfaceNamespace: '9xvk4s9ubw45256kt8ja9os5jq3y6a9yt94onayeqy49jbrrqn4qmcggxnook3axvtxjazfd7k7b4l46tgdqy96pdbgeyy5ayd9s7f6u73avjocfnuz1kbbxceuaiwq8i6de36j7o3pb3350c66j1ijr5oxz2jm8',
                status: 'SUCCESS',
                detail: 'Consequatur doloremque rerum eveniet quidem. Est excepturi deserunt sit voluptatem non laborum omnis. Et eos consequatur aperiam odio omnis saepe doloremque sed.',
                example: 'xfs8whwitz62lc5vfjiw9ei2vk1o43xtg9kg0q1hk9u5o5qczzz6jenot5i3gw8abi8br2cxgf0znbbscu213z760zbi9nhxycaeraqt2fka3awpcefkotid62b29bs2dpxi0k9walqjjtolk7hepfa1gvw125au',
                startTimeAt: '2020-07-15 18:27:38',
                direction: 'aj3uzjbq2z84wvl8p482',
                errorCategory: 'fambi5g96nbyscylx59q5gwykq3xm5f0b4dvpfn0fmh3xjlaq2naanuiiicpo7iojknmyulwfvx6razxj1g44cwhevl1y8nopaqe0x8xw0a8vtmxhro6ni4dq93ajt61329t7xrp2u1m7liksg7hv5n6ay5eaa3h',
                errorCode: '3cis20vrzkje2ywque5u',
                errorLabel: 'gk6yzqwn5qjv70lxejthn1t7dbncaj16ae7auzvwvyiy35cufyi94zjwdqkhidlehgxyrs5j8ixlm6dc0p4mrgx3nxmbypcabbkor96m0xhos89molgef7mjvz09zw78c89g990xot0zn8iuh8pg73bphf6y5ko6',
                node: 2704415262,
                protocol: 'prowjxx5fkfedlk1uetg',
                qualityOfService: 'bvre5fprdzod442fbypv',
                receiverParty: 'vwql9h2m38c969pgxpp1tz31p09u98w160urtlrqxobzgg6nujfliqatc88jpw2ys8bkoqsrxmp0bvjem0n1reeydw6rkblk7r4xtkdzepnmm87qusrfyk6sspiv9wnc4jqaht8645wm349i43pj0othmwudob63',
                receiverComponent: 'jbtfra1z6ub3u6t15ra74ioqozmkkzcfogxa46akf63a9yxi4har8bcyhntnuahdxr0xphbyguxksrrfj19bxhgsu64tjfmmdk0hv37gea0lytzlu189j9rk8mpjb99mcysb9gbx99g3q7m9yabtepavu4w95l8o',
                receiverInterface: 'h4k33mww8ef8l34tguk44i3koof8ztenqv6zyea4fva4dzte6rdzdi8cfpebdqzfbmsii8v54ih2es6mdym49tb27ql3dmg2gk628vuul0ifnw37ltygxcxtv2nncr99bsmxbms79o0ozu4anvfrvmkj73rmou0t',
                receiverInterfaceNamespace: 'zzkv8mg35bmt6yttehv3y7khdn5fbvh7a3elbusvj4tgnj1cblx69innoj9wvojt4g61dw9cho5kciwhd6loyja4d7ir8octj9tmrh3bh59n9gjlhl8qfy7tvbzeushqivn27a4t91hwpi3judzkmzp9horjamie',
                retries: 4431147093,
                size: 9134037783,
                timesFailed: 5097236218,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                
                scenario: '4qzja5uzhboiz30f3534wgo24mjlmpxf9capjoeppil0yqzrl7rrytwyyoan',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:24:11',
                executionMonitoringStartAt: '2020-07-15 13:17:46',
                executionMonitoringEndAt: '2020-07-15 14:02:20',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'f6mt9p9prb4um4fg8lmqh1mx4ib7kf71cb6ubcmkltu9ig8y9p0a48hwfc9ke19qbbmp4qa3h82alfqwfm15zwfv6p5avdst04vj8umebyx2j6uvbf5phsy366nxkoil947bfxqko08p67ff4lssnyenwc3p84ru',
                flowComponent: 'ue69xcldtxxnb7yspiqhw7jwdd2c36a853w3tl4hcimvvc99k18micd5oxo7gz0bm9x2n0di1l2shjpuwfkv1qsqgdt63zou5q8gody41in86zl6kgs1ubtnkrxqfieh4z85h42hm89hl9vydsmwz2fd7ew7wbk3',
                flowInterfaceName: 'qomnvzvo8agu7jhwgkk5ntz2f2flofd0ukzc575avtp67rp6cp2vob5y3j0g1z0yzmmld1w69ebgrvj9axz4vycsysayxyj7206bykk8awnjqyvu1pg2aaospjga78bca1fs44i02art3ui3fbywjzq371kw7gp5',
                flowInterfaceNamespace: 'e5anda7vsqau6hs3fdk4xnr5ppjwnatwg9s7g7vtuaez0pxqtpm71zde7p62zmqaai9g2zvvnwc2xrprsx7o08prhd8bkbbyrzg6icfvg1r9jg43ng7aqc82gln5jmwiuy3r5b4juvf5wfxkem9cjvgqh4o9pz25',
                status: 'CANCELLED',
                detail: 'Et nam ut dolorem dignissimos quas. Omnis cumque hic quibusdam rerum. Et repellat optio qui dolor. Consequatur deserunt voluptatem quis neque nesciunt. Cumque commodi similique at iure nam sed ad laboriosam doloribus.',
                example: 'z7e63hqnbscd4zncub03ioin9wvbstmde09db0j5d9k77oeg5ulvcwspq0q6mqnon5oeuaw9d8rqymfyt56dgvxx82rfjnivyihqevdpzzmlpzkykvn44znckzwpav8v0ahta9i9hfdrgdzjfku2u7lzoeg4kffz',
                startTimeAt: '2020-07-15 05:41:17',
                direction: 'zqglcctvbgbciybhkxyd',
                errorCategory: 'ictktr5gnp1970g7wrjhdyfaa5bs9af2t9q3jf81ekdgttptrfareov9y55ziicluyui692s3v7agrzc1qkgbflf14rp216bd8bm78lisgxzbebb53qxtucghef5ajs9op9pl8jbs33laqw318x7rqmqwciici2c',
                errorCode: 'zrit16y2rjscash4tgii',
                errorLabel: '2l1o3cse8gkh1dfqebfa462j43bnz3qe278baww2fu0qrfxv0r0ijsq6yne1zx41xyz33qqvzhlsete7mb4psj10r2o8ld5yqeqqmpxxc0jc761vbfix7lzos68uqgw0mn0bk1ph3zyauch78sd41uv784fw5kqo',
                node: 2617940631,
                protocol: '95lgmqo2hen9zcvrl9e3',
                qualityOfService: '0yvcwqstbwrgme291imz',
                receiverParty: 'ih7zfv1lzyfglfgqzzbbk6axkupgut8p72nu9pcvkgiyd3mxdtua3p2yaa4gu11xrm3h8prgl8rlw4hpkq0v36hn9y47eyn9ar4jdntve6aapleweho3y9dp7hs1tx1nt2zg3iojvzp3vj0x6jeobrfj0022rjp1',
                receiverComponent: 'n5mmm5zqsq0efcb5lz875av38ld2pgkiu5ynsgkp1dt69wlx5y5mczlcxioi9a3tczc38ig7p8fnosil8sulcde8s1ku59hsrivgmirh7xf9tz4ea7ya61g6y2c9j9ryd6lrrmr0uzxzq6h47eai6dyajklc4shv',
                receiverInterface: '2nfu2hr70gcvq0kzm6tzkpjb5vr8gbwbfgeser34opbxkhd1aof3gqett5xxh1b53j64lnwv5ohzcrjh9eh9zpujjwsdbz9ir4emn0bhuzcpxtsnd1pzzbpm4acc74jxhqvouxii9msvw9nwccqcnia0ar206jsp',
                receiverInterfaceNamespace: 'arbue4v3gt1l5owm2sipykpflwcdi5cmhzmunl0d7b5r4y6c0uf0gw9bnd5rdf1f7l1lwpi5nyxmaf7es54xz01oqarutf355xilabylokhwkwo3lw5v8m5jjrb3t28fvyjqg32z7es9fy0u6cfhy4jg548zx387',
                retries: 1154696108,
                size: 2400510130,
                timesFailed: 2263191701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'heiuzywaga103ytk7j1l',
                scenario: 'z834gbfb8zto2nr6vplbpyyeo28b6v0bn37mtavpbtvhprna4actc66trwzq',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:42:50',
                executionMonitoringStartAt: '2020-07-16 00:43:06',
                executionMonitoringEndAt: '2020-07-15 08:21:39',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'sowmmltedgr3k5fdnp6goxm23jr57fb82ueb66wu3vsecxudpilekmcub671be2endaw07tu1md4odd8o5xw4ygw6yy6m3qz364tcel29340rr56gu3cr5s69cizuqf8dknsyw1lhv6xouccbp7d2o9mh8qk8ffa',
                flowComponent: 'ywf798yj0pym5imble0evea04mdm6uikvy1v0xjwmesdjo2in81lrvgd2nsjhhcpkw19p07swoaqqebgk1wyeiiz8qy96re27bsy4e6nmtotwedkgd7j0lg82ntq0jcyawtfeenoaa1271006fr4a8ar5kbcce1g',
                flowInterfaceName: 'g5mjfq24te6gjn04zm7gndanmabgvbh6ddzgm9w5c8uf7zn8xvjhs1cvairkt2i7mht7nxpx5pwq5a7mqkbwlfxwwwlmg8vf4bziauvkyf9oi5hvb5vxdaih32r83hzwy9nuqlra936uc3ips26vvoha0gnc80xg',
                flowInterfaceNamespace: 'gafg25y5evyzpigiip4fx8kfgsr944o93vpy9hadkijvwfzloomjle0nvbdyeiry9z60btnkbrpksv6pcpighiyt6hs907wjd0hoiaokmxh09wp1typpivp8cyzl0b7is4n049v3d7dq3d46j3w1l9crkcaq81ii',
                status: 'TO_BE_DELIVERED',
                detail: 'Sit praesentium vel vitae ipsa doloribus mollitia sed eos dolor. Aliquid atque sunt ut quo eum commodi consectetur ut. Aliquam cum ut asperiores consequatur culpa quasi dolorum consequuntur. Quia voluptatem quae.',
                example: '6rxniyxlyowffo14z8nbqxb86pwxwjh1mwebjdyhwylgzt4drgnte9oy0h7lk3bk5e30no93q6ualvo9l5icyvgd1r3np7roi7u488jnreuv1n89j8zfz6e675drm3ko9hx0u7pspopm7uniqfcqm1rwmugxvxr0',
                startTimeAt: '2020-07-15 14:32:26',
                direction: 'r1szfyj5eikoz9wymvda',
                errorCategory: 'hm6xb5vao5aa1a19m8sd6ytpsb0zf9lxuggkia0i5xun932o5tm3hd80x18opmyz3r9sctxnrnu7pw9d7pcfdgvppc5k0c68624opuo290urpn6emh8zyv9gffqj12f30tfv6blzu1iqmet8r4t4ty75wzu8ro6v',
                errorCode: 'fh8y2577yzq9691bd663',
                errorLabel: 'up08l4q7im7kmoctlhekgyx5bx1xzs4d2suhp2mpahe11bfjmvupnpwe18jsqdndnxu5ehbd1lswwi6zrlq51rrozdyegb1bnxtepvr7yh0vsep9l6r55840py4zp74h6nw8bmcko5l95qcptu9479hj71ruyqm9',
                node: 3570743435,
                protocol: '0xwogw87o5mgzyg6fion',
                qualityOfService: '9xauzmzw38x8kzs8kx2z',
                receiverParty: 'w2i8ivfhp4j1mh0i40073dynwfnk74bswjabqdfyr9ihb6mvwdw6va46ers0ug0n251bmtpu21i54nwg6x0a742pbzraz4m7sehqzudz1hbtn2ho1t32lzjgfvaxb3nehnt0icbkter30t8wkuh0sdah25ngsobd',
                receiverComponent: 's0wcdj36x2v5kzwylcumvo8zrz732mvygmw323lkypyozahcoc3ctwoffhbhi9574tdcuorgnpdcsfiu8ccareyo4aw7antr2pmkdi3o8plbbqf1dvnp5mbb4oepj8h6ergtsurvxlwef0tfnu0zr2bxfsg9kndr',
                receiverInterface: '0mkz9s0cqbey474niyfijem6tfy1o62rcsormoc4coe44mjcqpespq1t0ej43usuayzou5uwo6udztj74n0cuh8rks97mr50bit1lh9bf29kf1nwo7y5u4xgrqmidl4eyaeqzxbqq8o5iu6i7xrlek1xjwytzmvm',
                receiverInterfaceNamespace: 'rw8vhawdr2fllb7pveq74toht6k8hqpl8mp96spqor5y0ftf9f01qg9z9ygzysrep0dytvuxl37n92huafxqclkp9kcd0l3frjosqwrwidyl4ebw0s1db5gczs40gg77eo55sc6cb1mkj133r8w72ubkppub21wy',
                retries: 6889404982,
                size: 7220035591,
                timesFailed: 6537673221,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'bf5olcmq3hutk1n1szx9',
                scenario: '57mysbyih8jji9jmylp1u8o9bv5o7dqjox4ld1x311s5vr9z4tang8gei6zf',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:33:00',
                executionMonitoringStartAt: '2020-07-15 03:22:43',
                executionMonitoringEndAt: '2020-07-15 23:25:21',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'gk6k9zklnrpftucnmodbisuip41q56d9bpyk9bgds7curxfev1yeslhidzhsvlsac8p8uo8x3g9x5xa2b618zo0e3cyu6r3zlw15ndxt1qa2ygu6gxf2l7d7mwe1yj1gvr82rkf38n8lodwf7myslfcsm0z9wy3c',
                flowComponent: 'jc68hugr2bb7g3gun4na9ailiclfir575euips93e4b4x57pdibf03xnkqhkr34y73h462az2pmp6d6sfou9tmeyjs6okfpvruqzy5ut9l8v1wiciirz7z6wghqurdvczg0hdh9qk0gjyalsvxbc9a1ysqhl1clv',
                flowInterfaceName: 'bbwg8615vo8eq5rzfj80nf40ia6bfj2nk0vij9h1ipwl1nyj05bz5fsh7le1fch5nt7nl26rhydgobfupj75gvzrk2wei2fzj69sxyswiehvr57p5ertjct3gz8au2uqqskqhulkn8393603a9x8g8ov5zrdgewt',
                flowInterfaceNamespace: 'avuywv32t4jpkup8yo9xbxzs2jitmpa0x9dbuuagme742jr8wcuatvstzg6384nnla405rywc517trtkzvsb9gpcsh81q0u9k6l2ulsawn97jwzaizonbf6m6u9qh7wwn3gfyhs5mhg4pbep7ytaf6z2hyyo1fx9',
                status: 'CANCELLED',
                detail: 'Sit voluptates voluptatem labore aut quia vel fugit incidunt nihil. Placeat vitae nobis vel nobis exercitationem et nemo. Corrupti aspernatur officiis et laborum officiis et recusandae aut veniam.',
                example: 'wfuo7hhxjqx5j9l82yhc94v7lt0m50fndzt1kdzt59x43e45w45amgzh5918iwcydp565495orl8b2zjvoo79np9f68txprx6yep8kej4nay1hb0ratfaahnpg4g2ibwavbx0t8vzv5x9m9i3uc9qw416kylm0d8',
                startTimeAt: '2020-07-15 10:04:03',
                direction: '9o1z9wt9p0l2am1trju2',
                errorCategory: '78lhavtxke8fo2sx4mas6y6lf6ibyv774mnccmq12cp0prn5rn22initcg5ikzbsq5x55yezauhr0unse9rvjd35y192kuqljdz109z5tz1vqj1dk9bjfz9awj1un0t6pke0ad9fu22axtchkvdh5huy0vmn51jd',
                errorCode: '3rag6eacyat321er2vf6',
                errorLabel: 'bfqkosq4sman3cjdlggfc3hydlyupfds9mvfwbagoyr2pksgen9wf8i0wucdasrqcbm4bz9xay180ouevdjd4jmte72nr0py8vrzd2r8fikhoajpx53ns87y7lycp8excmnnknp7dol26yovufvt2x7miaxpuign',
                node: 6503997802,
                protocol: '2vzex4ig5aitf1nrl23t',
                qualityOfService: 'xma2su7op3r1ac6eblgh',
                receiverParty: '1c17ykes38dlmatztulsewkwwfmkxq37lhi2z6s4npigoy6rhaerug2yscixqie7q4v7ir0p3oh8etdkay2y44nhkjui2i6au70vpaephltvssi3pni3d682kp2uczyeb8mmbasq4irl05v47wcm1z0oe79lm5ei',
                receiverComponent: '6mezef0w2zmy2xit83opi5f48f0zq552kokwfc93tt359mjtn2kocigilv01nr2c04p3vk70l9p8obvws9zog0dmqiud7p23bkwqq30m8yz57mh4p8vdchldqwa4m2utodpnuzhg8d1bfplawb0e3ijpksu7si9s',
                receiverInterface: 'o5ia3b2lhwen4ub5y7cd16b6t1kur2q0qm34wncbwlb9ys58jheuzwtvloywnd4z6lz4cot9u78qmd77ba8ueufn6t0gtxfgontfjt4mk6sobgz9b4fzx1o11rritl39wogxgawkjq7i525n9s784vgow8xin2lf',
                receiverInterfaceNamespace: 'f3zu2yrrvrj94ru8uexlz5hnfhwslefobaic7xuax8wi4i4skis23c1568zhzkymc5qh85wwnj8iwgab98x3tztyj90sfszaqulbkpqkjziim2smw0npq3bxakl6vbhljr2yk1idvmdudhyf3f6rxa5lpohypqa2',
                retries: 8496611892,
                size: 3899893996,
                timesFailed: 4055671020,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'js6mrlzjvrty1qeghxx5',
                scenario: '1hobpduguhgtok7z930u8lvdxvhh6pvm4pejn64e4shp3i936norh0z0z4gx',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: null,
                executionExecutedAt: '2020-07-15 06:48:08',
                executionMonitoringStartAt: '2020-07-15 21:58:55',
                executionMonitoringEndAt: '2020-07-15 02:54:31',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'pthpkslp481uqvb4qqt92yj1q7xw4sahfjxr6jgv3nb2clpzsghfitcmk9vg2hgpi7s89dkzuuxemi2quixwqqpcm3i9iks3e2hp8ir5hn6j6lsthotc9n7x89grpefud5xllqzjnxmar4ytb97a2vb7az2fp0li',
                flowComponent: '8k5tvvw25sz7m962p7ukpoqvcij5b4sgmxq3gcohbyj0sa30l1ipttjcfsdg6uplsbkn5bodmrbih40c2uy8lt78a0d747eo0cz983ff66lh7x5p1jr4wy622hvjfn6cudq4sg7sj8j21h1fy1yi69ww9q78z0v8',
                flowInterfaceName: 'fm6j0rvxvbk5l9wiwahwbc5upilozyozuvu2rhugqukkf1v40j6p4e71kh8zv70rbsmb4am0gpjzjqhsxm2w1h4mkbdcxwyrn6kqwvt5rqzvveajt6ty0h0aegswff2radir0byoflz17cqres4qxj5bl1k09umt',
                flowInterfaceNamespace: 'y6ib5726hj4qw41l8vesvayrf9guc7l6z5n0d9bdir3ql8y98ivtpob2vieoi8b2cmlk5lmzrdfxfpn7dt6mnpmitqmj2u7j41czp45wo57ysmjocxeexpfimvietfhl5emk3wrgvb5xklxv54rqoo1lt02gl5cy',
                status: 'DELIVERING',
                detail: 'Molestiae deleniti et omnis quos delectus error beatae ut. Suscipit est est et illum incidunt illo suscipit. Laboriosam dolores magni dolor officiis aut eum incidunt ab. Voluptatem modi ea id incidunt eos voluptatem.',
                example: 'uhanwhgt4ji49fgu0km14gbrhfsohwp5grw4nq6kyanrwikrxfigp5pae1lj756egtm9exyupb0p5a48ezi3x7hg6jnwmcy7gr1w34hp3nk7ssipycbdxa7buc218rzwk6ekqrlwntsv2h0uvhs890znh1n0yr3d',
                startTimeAt: '2020-07-15 06:38:06',
                direction: 'amz57d5i9faw7wn0s4ve',
                errorCategory: 'ttm7ry5j8elsmp1zu5rro9rj8d4iphasnue0kvapjjyvlypr1gw4x0u1z9mbqgribu7h0z9esyfvnn0l8p4bvv5ue6yyprts827kdn0zajkh3r26fvcqf7j3j7zcm6oizza0sqw2pe0uq6xjaohw4s6pjhspduiw',
                errorCode: '22apqd12nqv6pomoiffj',
                errorLabel: 'vkoreaapjndpak68tizls8x1fjuizsnvqjo5506o0bntkynfryoojt6cagtiqlubm7oczj0exnky5rfryqvlbx7cyad119uo1abhk6j0cw30nv8fhugnud6nu3k86qry6oex92x6pgi7wyttt74u1d5xnmzk2ial',
                node: 1347600805,
                protocol: 'ztrq7fgzvf7m979fu426',
                qualityOfService: '60jmzgj6eruzmt666w2g',
                receiverParty: 'pc7j7y5ts76b36duulbc4yyrtlhrkf9m0d3idojrylx1mkuja6897sfupmoblt9t85325nekek0ca4tqg4cj2hwr0zxtivfgbq9t06fgrkxtfwxc268oyp1bpowuly4a5db348h0x94tsdqk5xiszebk87dmsltf',
                receiverComponent: 'bse6424mienictbm5pxpu6x58zr3nhr7oo60icbdh70vxzpgebm7qehmrlmwhdfh2zca9ori0gtkksxaj2aft8yn1ewxqxoqeq5269r3ikuwaqyn83nacxgz9s02yfxfycuuwnmx96adkjlhbmzlytfikx9zgpck',
                receiverInterface: 'mixbj7440k9cs7e1w0gxnu3m7wan2av71yjiba7ftk9dg2kwedz2yvxwrvzldu0gp0gvmrnoi5j7e0mcj8l7ieny11mwd5ftuleyysp9fq281uqqujhybfg0alp6jawaiqycjozm0yxubkrs3oa17531pzkwdcdv',
                receiverInterfaceNamespace: 'fd1qd3j51tcibg872ko8l8we02wd16qdj1007j68fd7ugc4o0qdjy0uvhsx87kabixxhyuhl4pr3badiy13ffvnqib9k1u6qkpjepsflhmg53yka9ywj6vds38nrh5v4f4i63kh5r1c1f0r0ims8gfz70mjpahg8',
                retries: 2010610850,
                size: 4083837908,
                timesFailed: 6723386552,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'ogn3qgqk7vtb2o0k0sz8',
                scenario: 'in0sf8xk63biicfyz2gjrx0yadjimyybjqnncjyot0kyfxbbj2lz8fhk6q1l',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                
                executionExecutedAt: '2020-07-15 01:51:08',
                executionMonitoringStartAt: '2020-07-15 08:36:34',
                executionMonitoringEndAt: '2020-07-15 20:15:44',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ini1d5shjg0vc6ox22ffmmkl7gyqod4y58ay75wu8nccfk0qyif32nhp4s2lzxl2tjht081lnd5q9z52xhsqs82s14jl9iwvrvmu1btnuvp88is1tb4xspwaef5e5qnjc3eoue5sg31lidu2h3pi5vr1eoybn4yj',
                flowComponent: 'wo6lxlktz46bhjgrlbcugvm08o6yd33yi5p846pqe3e3c6n2f8rzbugg8e5tks7hn507sv08eudj8uttbt7ctdk2cipjj96pz24zbg6ts8bdcofg8zxprjlthzi0hy4m0grganfeggqywbko5v2qv8g4thvm4jb4',
                flowInterfaceName: '9y48s7uxqy4w1hhcgh38t14mkizc4txg4pjabea07a464e7qrot2cu7fntnmlevxz61mh1kqa0xvkhm75zs0odlrc9biysn2q9a2lh647ne71n9wpztyvppz4tcvu4w2mnjx8wqvvructx9lgaqq1f9ly2c6qx0u',
                flowInterfaceNamespace: 'cgvwov4vp0cu33cwlm14lscnsp6r26b29ccm3lohczrp0baaylh3o7af88vmop0v532mdywyq5a5laeysnpja51iu156i94jhbsj22k8kuyzuv97yilv3yhvaoj2j2ysa9t5aosflmzhlhbsxf5a7ncx7o4jbfct',
                status: 'HOLDING',
                detail: 'Delectus quas ea odit dolor. Et et voluptatem. Velit ipsum voluptate fugit vitae quas fugiat et fugit sit. Rerum omnis eos et. Nam vero laboriosam.',
                example: '7r4dqipscftv8vxdt8atjrhfgewuxm1dmuyr8idjxznvk1egbe5h9em5lg3to8my3bdx8cuj0xrz111ewbnt2c9eh0y8exoeq4ease9541tn79fovpcgsiebbinui34ivbgpijca6bbwka528lmc0i9b473k2777',
                startTimeAt: '2020-07-15 08:09:22',
                direction: 'iicpx6wxpmhmbq8isere',
                errorCategory: 'uoqkmyhvfbxl55km5yx0zjq6s5euwy7ao22ee0gpvse0p4agd7dxdvqaenbxve0v8eued26yrfyycs56os6r6stifz31wgnmwwa32f9rx5wb1unbh5hkdx7pdv1cnguojcj1xl6xw5kuc4cap8xg25dj7028f702',
                errorCode: '1hroovz71umn4zmamtfj',
                errorLabel: 'd1ii7ywp0upiykavxp255d7ijkql89nes0o17knzoi2i0sd1mgggl55148brdlcn78fctxalzhecrlb88ge7vm2thcl6td4fkcgyt6v3t7fo5kzsuuz3c5qfxbom9k74n32p3kvrrtz9hvo31nvzr473o7bsr6v2',
                node: 9288805939,
                protocol: '591pigjqojehafv900v5',
                qualityOfService: '5nuzpcz4em23bdi5d5zf',
                receiverParty: 'sgx68q9szvzi05rufr9fsx81vwwoxx47s43fjc67ezs6z1zt6hl644hiz3023o0enwiljcu1ytnyh4n0i8dwpqebpv1v3wxfcwfz9ci2j4i1yvkbjcujh8511m6u32b1igtg154ibgrz02yhu82r23wt9n6aoz9o',
                receiverComponent: 'e1kqrtnb3f6a0sha4b5ope74gie3mhj01t0wzzjh6rzxbwxcx1ppf3tdwnl6372tt87879ga92xfowqtzsbui9x7t6h9btgs0vbq05wwsurslmsbipva9fd2pvq7vndoa2vv9ofg46eaihupcf4dhkha3kpz59qe',
                receiverInterface: '6g06ozti07ofmafq7plw2xogn54zy5zbkkmly959phb9vlsmyayg74c2daz0lze0emgjgskwxd72bg9bao7k5igimxog5yuju0s8d0k7ec90wpj6bvl647ww5805frz0jipav4q4bhp81zicpvr4xfx5ce9t6k0f',
                receiverInterfaceNamespace: 't0cr1zrxy1ihennb5igv4sl9snr5qe33pjnpqrsw0pn70hrxo64fvfbsbfu83mk5flcq0wy2sm1y5x6jptyg4t553ajlev9ufpvbzx1i3t2t60dsqwzlj82t50ioq1ot9w3klktnridxa9duhcay8iv1gwlurleo',
                retries: 1427452666,
                size: 9137486341,
                timesFailed: 9766862467,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'e11l2ofg3otapgfypbkc',
                scenario: '4gy8l74js0rwsqfl1l7e09rkkzhnsaegy0vka61iydq91k9a5g786kegr9r7',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 00:04:45',
                executionMonitoringEndAt: '2020-07-15 11:07:47',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '8xpmzutiqz6zddj98cfpsf5goec09pdpkwi691p1g1s8ziyqwe7pbsy36urp1e9isx3wk4fydf487q6768uugkx4vxqc1m8ixsbllp0vjle82y8gxd4q6szbetsq1phj1tc9tcbyq1uz5octps6vdv1x3epkmk3k',
                flowComponent: 'm95z474b8xevu5e59ys59fonnvt51mqmz9gwdmiyteyvixp2xfesq3l6ei8bh808iwq8y08g38eie0hei1m85yu9wxo42wcn1dnycttspfa25o5b0i6v4h9t2itr5qaq8mwz60kyy21js838w8d6hx2u44zbzlcz',
                flowInterfaceName: 'ea1outaeka8zqvi59uxh5fmk2ca2xst12d2koj9j16c3qh5gest69ibc23wwt79rrynwa02p7q8t4guz54ekr0rblfs7t2olq6cbnxwj7cujd69fajg87am2dn1tqaogn5rueyiwx5koesuxtuw891u8rbuuywwa',
                flowInterfaceNamespace: '1uhrrxzuzn0tnabyts98gc2fjfdtqc80jdzv7054ir8f4g2rysns6aemimyi5skelbiyhjhe52qjzsv12itvccho8uz0y2or3fc4tuiemwzcpmakbw6l8yunl37xvz21fmi19dz65a4v5uk13gyl4h4fa4p401tv',
                status: 'DELIVERING',
                detail: 'Quis voluptatem eius et natus velit est reiciendis. Magnam ea rem est tenetur dolorem fugit distinctio illum. Ipsum tempora minima et perspiciatis ex. Quae provident et ut ullam adipisci occaecati. Voluptas aliquid deleniti provident voluptates voluptatum. Tempore assumenda enim ut.',
                example: 'nbuux29px5efz6zapc90i20crnxtj79338ydfic6gn7tsz78dcgz0wwzq48zejnd54pq9eud0k0pl7c32vuussie3x65a1b3jpw7y4pqwl2t8rfhpdmmlsenfe8066j6l9q32bd8g4aoys9pf7iatttc8yvubrzw',
                startTimeAt: '2020-07-15 02:28:22',
                direction: 'd8zkuvxgpb1ir7cq8skd',
                errorCategory: 'zalsiw9iqr3xhruzdae30t5b7qbeylbbbqfsofbzug4xcnu19hu4hufv4pgh5tlyssy1t84a18xycxi18b5tmyrtdirpyicaydb99ygjp0d98lht0y9we2mfsv2rpuwkm2vjfu5czk9vffqnd8pd6mgatlu57ohw',
                errorCode: 'oznuv4l0epchebbvuqnq',
                errorLabel: '8qbg1uxo0m8va5bwzjohx2o8v8nwru5h8u6wvrp7d3ccnm5boq0my8tmmmbwi7j4m9fw55n1pkvub7gwoqyr1eo5wy2w84oas8izhi99x2ybyqe2jugjl3ywynj3x0idlv62mcyaczq5rjvs93mxhqz8de6b8cow',
                node: 8214526047,
                protocol: 'bk11amndjny3ykj03acg',
                qualityOfService: 'v17ukpie0w8l5q0k5yen',
                receiverParty: 'zeuls3b7gv69j2qoqhr814pqd63pkac2rlv43hvdqre4ohlbyaxv5zkfi7fwhq3wqtp6gltq47olin357lf5z66dq3ksaonmkqjug96v1e9302q5h7oa5z5lq28oah0r4e5s2c4p0q6idxf9629nx7zshivyy9xj',
                receiverComponent: 'a1wyfd2robfoahkbn8hrc3nqwsfzo6yo27tfuer7f5gg6b8zqk92ztzg4b3mqam0qic29zqzowbhkx6k8z81glx8ivb4jjo3wfyfvo1tgyx0abyoqf6hylz1l3ydrqtfnbin9gcz3ygnvwhqada3g43odu9kply0',
                receiverInterface: 'pj7pa16cqptrq6hecoxdvt824xf2gkp689nbzvjut1ooodd1w80nxx01okji9xz8imrhsof6vm3284ymwbi05hxtc0j6m5an03sdoifzxa4gw1s3ap2l2kx0y034v2lhx9j0bvwqo0eiytaecyqhpf5n8stsv5xj',
                receiverInterfaceNamespace: '3meumfrkkn9e5pcu9gp3j5no41u0ibzaem1bl2sccw3ekqrf7wwdd8dv29zz5wereqibsh97qoilvgrq7dety9gvthjkdd17ojc9fr241no79cw6p6dqnl8vkcro0ngescrxvmik9v1nj4rwkeen8dat7jtppv0j',
                retries: 7740278277,
                size: 9971760151,
                timesFailed: 2667952530,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '56h0iqvy6825pmiohjtq',
                scenario: 'kqlm14ntpcgsohzeu79oeldpssoh1t1g71m49t4yvp8qvhqnoirbrrfd6ptx',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-15 12:01:55',
                executionMonitoringEndAt: '2020-07-15 13:29:46',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '8comzfjezwex2rzyph6vi760g0rygpcc7hissfokpdfyfh97ox2qicb7wvt7av0pmclfpqe2utd9l02k7kbrote3wt57l4tqa5c3kexclxxa11hljssbas8yb7fxsjsh4gg40lkp0h8yaw9vfklm4l8gs50ns0aw',
                flowComponent: 'pftnvhyxirnde5ib26v46x15up4lvx2ij0q6ypv4evsx2c6c4q5v329z170v2x26kedq62n3rqna99ubjv9eyyew0yj63h3b511sxxrk6w56kcapbogjfpj5z6jdgaz3asq78wduhkyo6oti465wgwhqo8n7ghxy',
                flowInterfaceName: '426roastxgixawhupx6mc2ggi3o467dwfcxeygkx8906r6mt414rfqboqly1i1rfomj9v8npt32hysjk7r03cqytwgci0j4dvobe2izgm94ton9q46trj3qoheqacn4z5lhqx9ylqhw75mlyy16amaj74h8bbi8x',
                flowInterfaceNamespace: 'jqk6yx4l6544c875coa0a3d1ze7piw35zi9tb0hvssllh3staqrfue4rby9uv1vzwxkmo78w3be1xsk05h5ik52z5aoxxsvgz96kg5gjr4rwkvnslwkmofh2zd0ieqmw2v9lso4tmb0euhd37ndnyltd9dkvqb0e',
                status: 'HOLDING',
                detail: 'Officiis assumenda aut. Alias dolor exercitationem molestiae et corrupti reprehenderit velit dolorem. Voluptatibus sequi ipsam omnis architecto praesentium dolores sit. Repellendus praesentium adipisci accusantium sint possimus.',
                example: 'ae9ytkxri2vz0pyl3vzw74z99ej5pcm65yiiw8dbfd927w0amyegyhvv111a5z9p86qruh53ba4lgu3vus6i5kzlni4npek12352qxl6a5vimtujrl8w2wjwnbo85q4vf9xg99iwjb99z959kgbjtskogk0ejhdp',
                startTimeAt: '2020-07-15 18:55:58',
                direction: '4k7bhib04k3qie8mbdro',
                errorCategory: '15a1efpdcydjdfrkgmyaio0qj3docnaeamrak4dl0rr1e5ynk5tzg9je92dnd4zbck5f01mdbxc4ru4ogwidm127h8fzr1eg7yloi86kn22f9mp3igqjkam02z9ea097tzq0n942wyn91bewgz9pkxjvqc6z30w6',
                errorCode: 'qdipbouxgbrxu1t3ny3u',
                errorLabel: 'y50k0yg6o47yq7bfdy7vz9zf5svc8lkzyfprm6zkw8786abo236ojcwvce2l7j348pvggrfj5metsosjg9q35tjk7kwmlbu2jij8cocmpittzzomkr8biqoj7hwoyctqtc04h5eu17wji2843rxbe6ov6ktcjcgo',
                node: 4760113910,
                protocol: 'q09lilt66q2h3rdf6bpg',
                qualityOfService: 'ayu241hmw85b2r4zclay',
                receiverParty: '9b1ii3qg5px4p8cg9nc0t2de7q2hp12j2eqyfyz5ujooqllatzm8d15g40xa7on4hnptaf7sbyf1b0pcoflyabhq0gyljk6bty51bs16mep0s852g92rsiewtk0ob80yq6dfrdix9gktru5z9rkb881v1998tlg8',
                receiverComponent: '5kkgcz9ui821djik4tqv46j3oqdllgjlfai953hiwdzvsxj2v56d6ee8sceqbvia6cvg1nhyyc9wexqqv924jm5xitl3s47pju4sdx05o6lvhyrdq52yrmyy6goqnu4aa0pmqy2rvryije2mflovqhlhqocmcx0y',
                receiverInterface: 'ti77wea7h53wgjsq4m50pk2m3ix1j918ibptaqowsslsfr7rluaac4nqugas1vv5vtg4f60euqcs8p4lvbtm480hqwk6x7p3w452fov22jqa2ot6eldl84aw3w4ajbtspcz4jyu5zw839z8zy0gi5ow7odccm2yn',
                receiverInterfaceNamespace: 'yy1wedyo106q6mtp53dezdiuki5doidlg38x6olg7nil2dao2ov7vi6slom66hxcso391v7zwt06bju4s2q5sf9gnxif5giu0uy7sueaavz6op0k5lcd7f9v326hea8lkqjq8k7zpk6zbgd76oqd24ltfygbzex6',
                retries: 1350076133,
                size: 3833968617,
                timesFailed: 5250239274,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'i4nj93jvnpt09g8cwbqq',
                scenario: '5zpwmj0m0nf18vh07nfgzca52cmqd3ckqi49i4i7oddvqetchfevm2ffsxnd',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:42:06',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 13:24:32',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'gkc0q9m7u3xon9ewez0gikdx533tto9bvwr01vqzu7l1i3hcn0cu0z5kec272xts1hkvcf85po8bx2g3jyk4khuoy3rsufv7o5av7vtuk3nuflvquyka2kh2xggfsbina35dfs2rpt892ly1gzquqoom7hv7dr8h',
                flowComponent: '5t7aig4axqkz8ut3u4njigpmpgedvqh360b3z1db4poxf9mhqi9055tobhd8bqh2cz0cuth2gxb1xpeaot5cbsobfpfkvh2bm87ampgcqngwoeybuhg9r55j389wst6t4g9vbaeb9zwgto1ir2s4jqm6jvfx7iz6',
                flowInterfaceName: '1u6mdfbtq8yhrrm6lhcqf4nbnd5rkp96yimd5tl8pgmv0ed4cty9lblbwwwy604ngd3rpwygfpirppngjwo97v7rx7qiqi2pfdqcgvr06amq7ikge6f2i1fnmi5iw2dmwgmtoh5r9w35t4w4agjlns6fwt0eebot',
                flowInterfaceNamespace: 'ee11hz2z4r32iuexpsga6a6u6rdlaji322ms5cfk6isck19kx0r9bj8qhl59zw1yfe68pm6bwslc4ccewr8rj6sxeid4pafl2p1jczhhkb5jeqztne7nprwcx01iycap5i0760cydb567v1vf3q96dun3w5mq82b',
                status: 'WAITING',
                detail: 'Praesentium repudiandae rerum dolorum. Aliquid dolorem quae recusandae ea. Ut aperiam provident maxime. Distinctio optio sequi velit nisi quasi a dignissimos et. Aut voluptatem blanditiis ad.',
                example: '540j69zzlje793iuytpqf5oeq11w4rik9h0s08iop8rfyst0n610re1fslnp1q4phix3cj5bqo741nbpx3kke1gmzh632mvbbn7wd172yfqg66h87e87e2h85y9nyuazoyvgtavfcuaz4p60kvb74l71v9p46x2t',
                startTimeAt: '2020-07-15 05:27:58',
                direction: 'n3g5sqq7uey5wevqfu6q',
                errorCategory: 'ma94t6z2ezlvm5y7glat3b7jpfj5t7b06862ylmu2prnwc3cobdozw2nnlfxc7rov1hktov5t1jj3374sqo2mendnb99oe74evgay6z13xfakwn0bjxbslrb8joxusnw8ydvd90nmgr1sl16j31xrt3np0fdlz3o',
                errorCode: 'pqtng9wgflas35ifkmfn',
                errorLabel: '3m91h9x3xt4xg3qy4w7fswfg78lxpszsg80q5hzy5jvqvo1fbpxijz7zmk28d5d6vkmb8osv0anc4xq4e4vvd54986oaa7p779zaur1ymvjlo4jv54xehprne9h4yappxf9es22q46l5dqgpq1x8wlbaoovc6hm2',
                node: 4904062792,
                protocol: '0dpr1hh63axqne6v4ces',
                qualityOfService: '39okge1lhkfg6o962v7l',
                receiverParty: 'zb9mbfu8bu362proy669jmo42oesr7csb02x8uwyaty3u3pulb45glkj5buni0b9hqiytmgdzqajys7qev1wvsfrqjeamvvl9mvjrzxifdf1ssnogg6ssy243fj0v1gf1kmmc1ydgk8oiw8602zbsdsn14cgs84i',
                receiverComponent: 'wxq007ce1qt0lve8wxgy160o844d6nn8o6pt1s0wpbis4bblkvebtfv58rpaitg9yoizfp89za1dwd9e00pds1ozzn3qq1krnm6e369eionv5e0u86oh57lg49fdsw2yrov4uy851mndcmraa175chpb0xblkswu',
                receiverInterface: 'fhz2x7jg9h8ofat2io2sx4yy1345bjtdmnrsvcs65q1lyuaf203kjoglqqn5d16viz010vp72yf3cxadt25q4gs6t6dvyfdn78qe9tr50lex7hdi5559z0dibothwxqqeyztqz2fdfdhs17mostqgpa43yiri0xy',
                receiverInterfaceNamespace: '70a6j7qf2ftwrtmob2o1scuppjz7iz1a69v6tpfai9w6hped4fm0s81wjvunssqte9h7g57lwtx1e61wwffkpzbwiqxunwzjabrt4czi0k0pypwluj1oi9hjke1xxd318gqzq6lbswsrbo1ep5yv5fc9nd8osco6',
                retries: 8211227207,
                size: 3204356969,
                timesFailed: 4749910161,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'n282eannaixw9787yjy7',
                scenario: '8phhxmmkwpyf2s9qx73y6eyye37zqp7qay74zu6ryjq3xboyn7ytn5wmp84d',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 06:44:46',
                
                executionMonitoringEndAt: '2020-07-15 08:44:34',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'u0kkc1iutrgn52ao7nd6036ynouzxxk5itpsxzyvexqokk5ip5675zcjmg0fugs7s4a2m97afatm0gwayz5zfnw89b6ntthrth9jqv6vmnzoc2ixpancn5i7myrn2psey7mhysuzgfebrlzf205awplfv0mslrwf',
                flowComponent: 'do2zl1d60s4nubt5kf8h15pluj09e94szkwqg9n7dl0ld01k44t7wjdpjw1s18yl917tmruwptsi0f6u8indkjwrtqusxv85i8ckcwkltrcw8m3jgjjx2lzb6l6e9dg4nsaoy5zqvgfu1jbaj0wyotgt6lm8zct7',
                flowInterfaceName: 'zdcxpamwkgi3aghzj1xccajbbs5cb4kdl3uap6dm0whgbzbgpdpnnvzuj7azflf063dglth6g1tz907s411h2g37zakfojzda6xyow9f8neykbvxtz8ile01gkqljtw8010p8na2ualmo7lpwq6euprogg8r0i70',
                flowInterfaceNamespace: '89w47at6kf0zdl0c0hqyjir9eqii5pu9ywhfcuyzrregia6zj0t29z3iwg3u9tuyr2n8ffrwgxk0h3vk5wlgeozex7b0eczgrxzp68etcur02vig529pwddb31yprgtb5z8fjkeaxx32j4w63b22heg2vc7uocwy',
                status: 'WAITING',
                detail: 'Ipsum odio voluptatem porro dolor impedit eveniet. Quod nisi alias qui. Veniam ut quia voluptas est illum molestiae. Consequatur voluptatum sint est qui voluptas et. Fugit officiis sed adipisci sint qui velit reiciendis.',
                example: 'foahk3kksb37hs9uky50h0rixkosdev9i7jhwadxup5x9shalesixu161eaj41338vlb6mwhct6o7faqauflf5ghp61zq0tfgfdxtdj45tlsdtv24u68wuy8np7fd3isvhfc024y8ow3i0zg1479b1tg5xw4amsu',
                startTimeAt: '2020-07-15 10:43:01',
                direction: 'rqy27qw5zsc79x2j15a9',
                errorCategory: 'ps8kbvvydx4a065j6f7bgj6ldwqi9bx935erm1pjmbiduldbt0j1w63o6w7f8d8cj8wij0iyeizs5fyu7q44fqkzhu1exysnelg2c68vaj6dqjhs82rfp05zbogujz0ha3asft1iwdlldcjrlf8o9dvc13rxfnyl',
                errorCode: 'vkjpsv9zjfzuk5ocmsmz',
                errorLabel: 'snzq1yemocni7yv0wg9gokyjltce33mb8h4r2cuhzhlc0qbe9icf6fvnkkjjj057mg3r38zrov7sthket6q3vlcek50o3q9j89a10te70cx4yv1d2tsxhtfl8ju92v6tyj3ij3t945amvoyzp6fmwnqh3rdbqj37',
                node: 8435110113,
                protocol: 'ut8iot68n478mxva7c5w',
                qualityOfService: '5te28gsiy7o741klgxzf',
                receiverParty: 'xajwje9okv2l2r5xz20utwwh494n7e7e5kb7lmg3zqxsjsvpx60cu1yosdlrrcolvctdgpce0a1i3eajllzrj477ci67k7ermidy27wnio775adgrurgzqp54ktrdxiojyuw97kogx2x050hqsof0bjbiy73l02s',
                receiverComponent: '0dmibc8wfanevrrjqyr1jgiriy9onmv8zu971o2w4n44mn3b4h96q29ea4m8h9rh8gixoxvzq6bjay8wyogh8n5t5v0zif3mfz9phuw9w24fr8xyzrvops3dt5f4opexj57wghglgncw5tr9rm6sk3blpbwe3r61',
                receiverInterface: 'ok88pcconge2lede7vgaq7j2o33x3gigz30j9cwcemiinuoy1i1z9ow4a27kogkfqd36fjoqxaua3iw76f09171p8bt0jzxg15t1mcykbxherva1si6hcpaspntfdqlnmla0vbm0xh5i0kilidr8mc8rnblpoce9',
                receiverInterfaceNamespace: 'ay1wyco41k3y3n9a3my2sg4fpzwnldybuwpcb158y8ly9osj3tbm0ngx6yyv1ho407gt28pu3qjjct9sx4tsbiwshd4dauk7kqdp8rtyn7mztlk3ms3lp9zovo1p07oh7bqtg8vt8598qj8oqwh5i3x6zimgpk0n',
                retries: 6330473216,
                size: 7244641735,
                timesFailed: 1912207751,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '6trwckw1cjpgtbnq26sz',
                scenario: 'z3qaml6gpmd3e2xbgiuo0rudfrrtz3zydyoub3g6fs94nc8bb707izzsul62',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 05:24:10',
                executionMonitoringStartAt: '2020-07-15 22:22:13',
                executionMonitoringEndAt: null,
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '48jat1p8gqybclgb0bedjrzk97mo66qiapkyxxe28pnl2fa672qz98s4mzcnmpb8x5pauwk0ly4envhvfh2pma2e55otfilw5f6ndqgnpxltm0xzzrmi33bg2t3fsuj58wyalt5me4rpjenzhd5g0419vnn84d1f',
                flowComponent: 'slnkksx3tjx6qzi25o2xictgcrloknm2zralpgjuqx303uheqyj62xuiafm3pbm0guh3xtkhktcrx90e86ul0sxb666jqnnqs4wm3tc6yh6upt33aog19q1e20y4wpzotab0evpdgxc82ud7tquwftnejuabi41k',
                flowInterfaceName: '5jkc1rfck5u79qjn0d6qhu0dkem31xmqff8whyhphocnyl3dz5h502kvqy177nt46jl0fcxdmnimhutsdaazafabqunvoeiycmu4b8yned5ishoxk5lrog48k0onhum2tyebmwqdzl9qm5miqezhgkkb3km2jfbu',
                flowInterfaceNamespace: '656bwtb8wucoesx8vq4v6dc8lyb9zg4urlrmun7uez8hdvwdvmc5a30ob4aa36foagrtvmltcdoxtpwi4hf2z8u5nfukc7rv70qb26mn21mcok5m418zn5t05e50rvue3ng4boskwrqauu3znvotwqjag62804i7',
                status: 'SUCCESS',
                detail: 'Autem deserunt cupiditate numquam non nemo corrupti officiis odio fuga. Cum deleniti voluptatibus et ratione aperiam similique in. Omnis quas sit repudiandae ad ullam nobis beatae assumenda.',
                example: 's1ca4g7npjzz1kvouzegdifqhcmk0faykkua4kqkgv6xk4bb5fcvtm34mbdtau6snbzyrlpywd6363zg0baa1z1utm4ckpwhsjooboxec03lvzot34ht95a7gpifvf70yetux8uo37mkszvi25u151nbb1rustkm',
                startTimeAt: '2020-07-15 22:05:56',
                direction: 'y515f39u408ph7k63d6u',
                errorCategory: 'ufbo4yexp8fciyh2yw1w4vhps52suw9ry2tjvtg0xr17x2vpw2gyrbskc4u31dq8khg5nn97n2ba7sxmek4bo5pac1wwlm33fdrw414rt7h3rqlbrfs0p4wx7syt6f52xhi3a8ju58nzsvfez7yqsm4yvy1ucb8d',
                errorCode: 'm1vx50okwiotkb9yjlid',
                errorLabel: 'jjq9v5yguxn8qcv59vemks0h2l1m2dvtfgdx1f6iqnlantyyqec8oudkajngn4t4cawmg0dyvko1ra3bhbwugzdkbzgqmtbe958g7pd5767etbb2qs8xbe8i4obwnrouf6o1a6sjn32c39m25p06qhqbe5fk2ue3',
                node: 9964269122,
                protocol: '3s21g7mt0r6j2u7i94bl',
                qualityOfService: '960z0paim0xzkr2puwc5',
                receiverParty: 'jpeea38cx374qlxg4hp2tn30nt53mr5lvi56qnyjohmqe9eogxri6czzvmg4j7qtzmavjdf6reh82oaxbbw48veijp6f3k5ahkkff01189l6ul7fyceaex3h7b0pi5ax7fe8wq0bcjqcw30w33mdt5zxdgx6i3sm',
                receiverComponent: 'q5k816ir7bq2h3xoi1aeuoagewh484vbawbouzo9rhqq0ufz66llc01litgro8o33s76kcbgo4xhzta1prqrps8dmglmm8jeoiwfnvi2ngxnpau47xzrjge0a2bu47um4kmvqpbi7en701j9gwan257fadukth5h',
                receiverInterface: 'qdiu5h3vibnpyyaczbdgvgb38put3mtn7jmez8gklydksztoz05it1r3xusp9m7boi3te18ocpm8ykcg06ts95rajatagy0ss61noq7oc6qa15jr3nxqzwbgij8le5gf5by65qieushdxh3gmvplp1jzuq5whsy0',
                receiverInterfaceNamespace: 'k48io213k4bdu4ryjqa4pgcdd3xr2msohdar1umxji0p541zanjtakj14krzycwqx6acr7mspfvmep6v0z6gdfz9a3wxyyxpmsulek95pe9ra64kc2ggjr8by708n5vk5hd902i8xhrajaagsr50er26i4x3jnpn',
                retries: 4235751083,
                size: 9933509500,
                timesFailed: 1499344355,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'e57pztxokzy7l4rkzoeb',
                scenario: 'hllbblicgwn23fibe48s5vegj5g44nn1s477ehbgpiijddzp7k72n7ajxzag',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:59:09',
                executionMonitoringStartAt: '2020-07-15 10:30:05',
                
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'nwdflda2fsvgs75ixdtxoy3gql99tumf2b1cmmlxxtim00j6ral0i67itsk3kwta8svaiakkej5e58j2c6eqy0eik7k2chehknqvt3ctykhrdrqqtkx5rfdorh5jx31k6wzll9aimv6xiwebcqj0vun4qdylu64h',
                flowComponent: 'oqwn2yx4ca4pe4nqf1scih1wwcw8xk92eg8oxzvelkq2s4v0tjntkbsnvzj1ppgs6rd8hwupg27ee3kiflc7whxuv8e7sqofbtwkslsmjaidgnd5byp6r5o74t6rukyom1pml5dv04lr16nyzxpylrwfrn3e36nm',
                flowInterfaceName: 'y7hg8710654djiy24q4iv9edcd7nnhm1edoeldrfrqquah9ayg7t51tdppjzft61dcv3imd0hv6gazephsyy6iccg2rq6jyujz7ldzamqdiqlr4unu58xawex9q40rxiybum4zn7odwqhcp6iiyysc9r06pse3x1',
                flowInterfaceNamespace: 'oi7i45pirut1cpkd32r1xh10vydlyzc0onh9ywsmebldtecdh768zwn68oi6svhw1fxp55e1enresm9s9swpdasbx7ig2uq2fotdx77n397k56ptclt8whtddhko99e58dtsypif4cist392jw36y9efrpqp32l3',
                status: 'CANCELLED',
                detail: 'Et harum qui temporibus. Nisi omnis unde culpa doloremque delectus voluptates quia et. Sapiente voluptatem non ut accusantium voluptatem porro. Enim at unde earum. Optio sit incidunt sit.',
                example: '2k5tdxqt5telxtkz6ltlpdj9npre8npvizglknf53mtueey118sbhf9if7t1exshgtorbfuog5dwq13f787qu0dye3auccax9jwk7ad652jq04otwd7cc35l4pkra9codem7b30jx4qjd4c26zegngg0mfyufsko',
                startTimeAt: '2020-07-15 23:39:21',
                direction: 'd2p1nia8b3paqlq1j73s',
                errorCategory: 'bpv6085al144tub9pk8ok4ssfyjv14n39t71ep27iytm3v5a6wamvlbvtz6ay6ep56z6v4t9mm9ficavm2k209z5z28zeddgvdmflxny6319v0xwszwh86goxtoi6z1v3oma72ipumrthq7f0vzuomomzvxvzd88',
                errorCode: 'esiu7d0ssa48td0k1p4m',
                errorLabel: 'slba6r1q66w7k89i0i4x4qu58l9fhnj1bcsjzpqktpt2vfz8qcqb9murtjw0chwy0owqbsudzustrzgoin7zkx9ub4bdnqqfcwju99x4ukpka4n29pbu0weh2wb6g9svyfr9se3ytpeseob3gzi0w21natprcwjh',
                node: 9044583593,
                protocol: 'xob6ml3j5syaqc8dc852',
                qualityOfService: '3vfh66agy9w4g5bjacul',
                receiverParty: '3gmlx2943ee1dmp4w2a03rd4uc8hd5lql5gz0gy995aomwk96cei879ppd2rlg6r75kx6hi6s6m72lxd0m6i1a43nkynwskf2w3flbqjmhtdxf0ghelvc2s6vev915fp62da083io08ycl85clchk0h4mh7ylekk',
                receiverComponent: '93sf6llki6o8bd7701qmzhybu6k53sl9yytdlzt4u98s605lx762b6q0fpz8xhtmdjexksjdkt8g3wkqzulqowy8ktpei4ir9hfcwhunx2e5tavj7k0ybz1485zwxepbq9nutpf99f24c118l6rs6i8mdhgd2mr7',
                receiverInterface: 'aiaklyy6ig8sr9qv1ot0hdmbbius0li09c70kou5zgtx79kefgi16irs04otu7m9s604s4edl0bk2zscdxop75hzctrwdbj642hswy1fb661d5clf2nhwy51plseltzh2vywipu5qojrx8pvytnk08kf35zajk8t',
                receiverInterfaceNamespace: '6w445a5re6ktht1d9dnqm15j3ww0lm5y26ilqyj8msx7gyqphl8ymi0vfdjoc0jxdappodsyo5fqtgun2xrrpkstiu72kbovgfzoo43l0fnbq4b0wz1832lsjc9xkrj23cio5v6n1x3ajfq95awo5qq9m8bplcof',
                retries: 6027168943,
                size: 7713669834,
                timesFailed: 2296437231,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '261bdr93k3uipqe11316',
                scenario: 'hxav74dunbtjw7ujz0hbg2werji2xgrgatmelsz6ng5akphsiyr99aio2jjo',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:28:18',
                executionMonitoringStartAt: '2020-07-15 23:18:47',
                executionMonitoringEndAt: '2020-07-15 14:16:14',
                flowId: null,
                flowParty: 'wiix7q4dgyogbbaiet5sjqtjmz1txa2y1dmmlep6edoukdztikhq59e6x7eirsyzjoyqnv4vpowj78mska1fv4lvyx5nu2yin88nkos9oq5bc0vesa3rlwofyk0du6h57q8rk3mvuoxe1xdbqc4rf1vor1ob1yam',
                flowComponent: 'agv0n5nvd97h2hqgsltpdub7sp5315tbj0aj33vvkvvz04ygd1mmwu5k6oaome15ebhaqfppunln218ejvmki970jf5e0l6zjxcy9mwtxdn1oq7w7ttlv8gfjvq0p96ak457py13460l8xpu8pgd2mm380jrwgxd',
                flowInterfaceName: 'o2rfgr16qv4k2cdpez1qqx5yxygelsyunkuqwaaiexictoxl81i1tn9rkw73517p04ntcmy10821pz72j3flyqskz051uf11uqhzer35bjb4v0fdhwoyg22tyd8b2zy9iu21dmnw2lec1gbq8li3v6hzwxqh6udz',
                flowInterfaceNamespace: 'p0q2pkdrqvhlrlb4j02k5fxvke1w7eji2cyl9mkgg4q7d0sxvz3jfc9dbiz0rt2aiafb7g9hq9p6a5vx4ic58gp7p0nizu489546emjwogzbe530rys6p3sh1iv1kkbty4lwri3yi6yej1zn4tuz6kpuvp9nsqtx',
                status: 'WAITING',
                detail: 'Quis in inventore assumenda perspiciatis ex dolor. Fuga explicabo similique labore. Nihil ut architecto exercitationem ratione ab sed rerum. Incidunt repellendus ipsa architecto vel. Modi fuga illum rerum a sint nesciunt eos. Assumenda sint porro provident.',
                example: 'fr93f1fofrb8mteldnbkjm8syqt7znc55tgrvxs0wqg2fh6vmkriyp01d22rme9ijbt2itc57avk5ivqu2hvne1ehwsuwott4piziq18ld2qfhteckp9s1r3ls2x5khzz2kfhnyajedhvnmmnuflqsn6g46nu4ve',
                startTimeAt: '2020-07-15 07:10:58',
                direction: 'ringq23dm8skrglpowt7',
                errorCategory: 'ui0oi6m8ql07u0l385mhz5oeqym55sgd1jjj63jsgcaz5c56x9tahtnk6tw984nh6ynjj08rap0ux8ccoio68diy37rhduu6c0bzgdocq5rgitu1v2ukfl7jrf4c0oye78arriaqt8qgpm2az6vulhwqm2eg0yb6',
                errorCode: 'rbrifqvmq87ag6zop0le',
                errorLabel: '75clhveqd9qz8p7uivxrykfgr4mdg4xd0zr7w7f01a27o8v2pordq6u4y01pngi1oaflhh3iw82xq85d6i3rawelchq3kacd8li9ceot2qvyakbe6z0dhibtsvnbnmdow6icgrdqrjueg8y3aocj46r3y1y5jnp6',
                node: 6515922062,
                protocol: 'hp07jtxapo5crd94vid2',
                qualityOfService: 'o3iy1didixieeu8idvkk',
                receiverParty: 'fyxnnow9z4tduj5g24x29qfh86i8cq4uyvluokqwo9jserwznzyuowoibdrvva5vy02apyse4odowbtlj2tao99peh6l7zukm2qcesz572u074u7obe05olanv7kkyiicvwg1zdy6acifjs15jhemrmyi7w22bsk',
                receiverComponent: '7pofh7qq0hda13jgu0wv44qky1cqwqlm79w7v2qeic9v6d990mto8l9bekjtp04scoms8esmu1gs861wx0lx7we64tmie3xhg82ojvvi7jx65s34zqriiz55vz4y01n8g03fm36oiwlepwn5j6qb4ri37lrnsngu',
                receiverInterface: 'c6ag1uew8g1ti87giywkhcw94h593xkvb4x1316l0bfhfm3y8q6lihpmquftgpljzygec42a4nmbditjeb8yak6os5iohf12ed8y7vls7tsiyuz1oxc9p4965qcdq8vx7srw31fc1qxb3q0e2shws41k5x4rqfyu',
                receiverInterfaceNamespace: 'j7qfylao35ro9jozpznrry71n1ecj4ftcthv7ur95zhuxyfmv0q121e1nfmqj10uzo8x8as5zkamjpu1ku2zkchspc8kqy6vvaxhv2kg4we6k4ia9xn3lp0c6dq4odmnatzv2i75ntd8nxw4z3jhm8renyqc4k7b',
                retries: 2705584212,
                size: 4465745362,
                timesFailed: 4788945559,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'mzaysaj1c2jyjpbyp9z8',
                scenario: 'uo2idic7yofotnbz3p2zsab1796i0eq5csnakbeeur750a64jx6vgane3prx',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 09:26:36',
                executionMonitoringStartAt: '2020-07-15 22:21:42',
                executionMonitoringEndAt: '2020-07-15 19:15:12',
                
                flowParty: 'a5sx3d1kvv2x05kdwui594jpzwmjdklkbgmp665lhkbavxgkb8c2pngd0yfxjhjar2iyufma1f959o4rvyn4iax1u2daf1l2lesj7pdssfleybxxhrsyhrpkrexeyt6r2lg9h9w63tqnftvc8rcs7aycleu46fux',
                flowComponent: 'rghyb1cuwy68zyg9rtcz752l2t5wyueae61kormh164mm47l7gryr2z4xfwsjlssklrlzfggqiiobmgo18rw6njon82pzboa83z1sxbzuxky7hwywxzdf63syrahz5odcjaccoe3wuyab36t947mrbm27l07y8w1',
                flowInterfaceName: '19t6fpcdwzwipo2ky72w12lk04oqc0j6sbnxbdox1rty0gwbt6d9guzhgxn96wazojsjgp0spcb8iuzsikfbmh8d5tidug06bb87lx3a7z2euzibeshrujj9urnyx1nyfh3cnjb7fgcw146rcqeunka03yq3auja',
                flowInterfaceNamespace: 'd0m4t6jttv90tqcz2npct1z0a4wtz0cqqx2ow88lbajf1mfq3n0nf9z5iomx088ajhrcwd8w6g3dzhphnx8zpgih7fer954m64fyambatsqdphusalakiba3cw2puuf73u6nptrsezz9os16dvaynxu6earv19la',
                status: 'HOLDING',
                detail: 'Velit non inventore corrupti esse omnis. Et saepe eveniet quaerat explicabo odit. Eligendi assumenda consequatur exercitationem veritatis et quia doloribus eos quo.',
                example: 'i9hhg7tg790k7rpdy27rbiqk09jdvzjgoi40hqindu7g4l7n3m699ybxjb888u65095p44x6267kav7bkoujy7dqexcuxj3moih6ogivsf7oeeqgx0mwb9gyy8aiylj2gzlfm1j0wqir18y9hcaiuv3ccmg23nly',
                startTimeAt: '2020-07-15 04:58:32',
                direction: 'cd6t0xwq5ycsjzhgqac9',
                errorCategory: '9c38ade7txvm67qg74a8nusx6szayy56sy1aruas9n3ggvp7avtvulz13ogqljxqnt94r0vk75u1mpxgdpol25y2ldls9os5k9ou1h7pvp51z97425du6sktxft1pxsyz0c1k0tqz4mo8e5i1jsz0dpzsfu3e9aj',
                errorCode: 'ujyxzpy0e7nxdo44l5iw',
                errorLabel: '9ps75khx2lwenp5ajbow6abpikbgh6fcvldbping867sphhinecbe9efmlm55fgy4ly8z3kokb8btiln8nbbsjyy02pb3yvc8qqafmbazq0tihzb0teaqppnn2jbfkb2andw7ckgaw90urzv3gor9wawkvwesua0',
                node: 7045091845,
                protocol: '80g9re9q2nvi3lqkc59s',
                qualityOfService: 'lvlz9o54j3tykqt2vvog',
                receiverParty: 'wl343x9re47ra6rl7xd9ma6pmxf5xjghmh9mkxhkbwyc5y6g5tiotikes79ecjk7ojvnnclrtb8bjsmqvppg9fh8n9rs4rrnbug6kisn2zdsy3fsahkgpxh6lpqp7bj6csdw0n0k59dzvyg8so7a6b8zxn1um2cx',
                receiverComponent: 'xrjbicxbwe02zxrbo2bmdb984qoisgcdfy2atg7v6a9n2512vpqows25amixymyt20marf8smjpcs14b5qba0sopolaq4fc16d0yfoklb5i99cgkll2gwy61p7wdzztx7hw5sa4vyyrbf1ohh1phnttw9i8qfrih',
                receiverInterface: '07dvlmj9uaz0pnj21j2yojm7hx3gjhrq2jseiqw70x1m1iqt5b7us7mpc78vcqfuja238745bkpv80horgdwu0ec4ig2p1pmi6tgz3wsrcabzc9x1x8q6vn42nnb9ps7ibju4kpu0fwavilym1v1pw5yclc4uf2n',
                receiverInterfaceNamespace: 'f62z7aiu27nl74igdbj4fx7nnvkwjx65z6w4go4mu6pwwf7ns38mbcdkaisn3gqd971f7sa69y23uuvjoneqrvvxhzxjnfsk4g946qazvq9x6oyxfxtq2ymstzw7zd8w7ezmgiprnwj4b5aj9obalytmf8ssu1rk',
                retries: 8624281437,
                size: 7362431290,
                timesFailed: 3508280817,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'ke09vx6h61jpo44kzo08',
                scenario: 'oekcgf8i11tcbifzh4kg56mrpr2mawcodgzzm02184scofrubdelxtz40xdp',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 02:17:23',
                executionMonitoringStartAt: '2020-07-16 01:00:19',
                executionMonitoringEndAt: '2020-07-15 16:12:56',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'q49g315kojynvavzh99677wu2emzrrmrq0fptg0lvkg4uvy4m23g58ahrktwgtz5htuz70flut419m0db0dvxwdbalopkgyg0370ve3fz6mk223q6k4w9c7eooxl6xr7ao40lk3voflmqk3wcj5cagh1v62y9d26',
                flowComponent: null,
                flowInterfaceName: 'tku9069ooi9o7exivrkc87x5bp47aitabwq4e5i4rqarmez6f92z9l420xs2n67phh6r4h7z9seicq6b6tngcx852pxdrhug13moi0jz0blw5srfxz950jom2fb2he0edpqru8b4zub8tba28dwyl8rclnimo6o3',
                flowInterfaceNamespace: 'bi036by57rv3sgdackwv28f36zqrj0kwe8vtyj9lpu51883h3ce9u5lwwxylz6xsf3nr1v09m62e3bjao82i7djnzozitcb2atlbcts12cix3fn4imgv2wjyvya48ts93lsmo3v3mjku11uev20flj39o839odmt',
                status: 'ERROR',
                detail: 'Ea tenetur eum molestiae maxime. Non numquam at incidunt. Maiores in ut ut corporis ut illo explicabo ullam ea. Rem dicta et omnis iusto corporis. Dolorum neque magnam voluptas quo voluptas eaque ullam pariatur architecto. Ut non neque sit quis ab enim sapiente.',
                example: '2zjlyoqmp40k9d9pqd2hqotw8tm0plmg59kba8s86fja5gpn06zdd3ua3bd7htbgbqi77wpws99fp6812pttm8anvkdiyuiyyodazdunpiv62bpk31f0rlaag3b5ah6p3o5mz4rr1884r8tte1okgng10ory4rnl',
                startTimeAt: '2020-07-16 00:40:44',
                direction: 'z540avi17w3ojlquz2bc',
                errorCategory: 'wt8xsmsdx65nrw2alt62wg1xe0unwhznomqs6fii2drloag6lx3r8mxjjb54cmz8d5kqgvuwnp8epgymt3pdbpdf92ftw1wm5zmnf9u48ojo1jo5qj8i6y4309bxdfg5ypxi658g4mlulc9mxrevdaa7ppyndyfa',
                errorCode: 'us0qt6l48yb1e0l4g9sf',
                errorLabel: 'bxd6320q5habyz688wgt2sne5g0r7kiocrzez40u7n9sbiqqt8zjui0cj6aawxx5vhaqdddm9e3cjdnq6cksoqt051rvumk9piedflnommvq5i89scu9ko44ilrxowlkwjcw34gokcsretmut8b661gypankeng9',
                node: 6499089034,
                protocol: 'fx0gzywp7gxs70kzgflt',
                qualityOfService: 'qgo7ftdes5wf788co7gu',
                receiverParty: 'cq6hw862mpm8ut0s99ixb48rg2xaxslh2q0el94dx67pzknre3q7fpvn9elj2w4q94k0nilb0287mymvmi2z959xil69g8v8imcwijp8wc5rvb2spa5nmc7pm1v8k9fztdehm66gp92wodobi9yxx1m5tlnk04mp',
                receiverComponent: '4k8dh5k55mp9k4rvvmhy9m6hk8bki21azace8k4wvgbvi4euii3m4abux79dhenx5r1qju228fg69b9uluedoof5v6r8tpjndiuou8twv3uqpyaky83ta9e8jfji1fo2zmpwdg5yd1mvm3d1mj9hrfmemo3be038',
                receiverInterface: 'kd38ml76ucspy8i85qbns7wqs3k8yfuyg04scd07ul97bhexrizjr54acdlrgerki4rnyjij1f1y0y4v61qp0kmcc0v8dl8ezsjh2xcie4otb63kzjf1qoyftnak8f0j0xcv7x374x8doydcjdn4f4kbggny9op8',
                receiverInterfaceNamespace: 'zs9lny2ghtw4tg03hno0jjqkrynjdbqkhk89lxjr90medbj76jge814ceqvv59qsjyfxj0yqr1ufmgqw2b5q7djudtvx3v5yfsitxu2ultuevfu7uvr4ndx2xagtmiz1s0c3yndzxtptdljn5e129lj9b8xfbbao',
                retries: 4196079303,
                size: 1728820370,
                timesFailed: 5006925492,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'l8zlhafxzyyfn5zr5x9c',
                scenario: 'a3rxey2sdsstk7nux87iqm72alcnjmkh3r4yus2lnl3oyb69x64e637yeq8f',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:16:56',
                executionMonitoringStartAt: '2020-07-15 13:47:50',
                executionMonitoringEndAt: '2020-07-15 17:55:04',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '2n5e355urwbgg1bj1yupaw2z0q5xpljrbmwzbcu8ia26cs8oix9hnf4gyx08hjfhsqn61whxzojv6rjc1c6cr1sx69t5zctihw2x2d0szp41muumwolttxyxol9ng8mw9g9cucokqac3wd4boodj2liodyhmhz2h',
                
                flowInterfaceName: 'ux0rw1m6428dn14ib9soq0t2zj2bj3w902nsjkih92wxypwu9vzu47q637ievknazm6wjybwgcqb8wrbbj09p9qyz1ydmm5jube5aa4yv9id1qgzl38otonnz1ssl9kx1ob4pxng739e28d9l684yewb8u0l4xje',
                flowInterfaceNamespace: 'f6nvhabx1f793cs4k10uiiklccuworr8tyei2i61y8unkoeob1jx981yh1xmpv96ob2v4g52tjb90trm035krmstv7kdxlg1pl5tfr4dxeuj8wbgitibyd7k55gif01dihdpfxsmguzx3j2b6p4gxkgwxmwbgnkz',
                status: 'HOLDING',
                detail: 'Ea eligendi reiciendis quibusdam aliquid. Voluptas quas cupiditate placeat omnis iusto voluptas iusto. Temporibus eum recusandae enim praesentium. Perferendis qui est repellat nostrum voluptates eum. Labore iusto molestiae numquam ipsa.',
                example: '2ynovx1w1t3xvqmyb3o7f74bxlghwulr3l6mhwlx20ko293n62w0jj977rgbmcu1qejp66voth6ijpgr6zgs6ad1trv34nejabula4n0gexyl6cjzcny30b9trs3261sa20drp7cupj7glc7y5vphs64qhhs3bao',
                startTimeAt: '2020-07-15 16:26:42',
                direction: '9wyw91tqr7g3q002mj1v',
                errorCategory: '5x6l1iw5awckwe5cm299shkhrnydbfd2af16b2wgiyziu1odhf4k0avvog2ny6t8ax20wn5459n4apii2g0c9kf3krb8baurivf0c2bp867jdc20j4tphpwlq6op3dclemjtl5degfxk9lynkaylsv3gsyyiv83i',
                errorCode: 'n3klc2vgjtewo1fedl4r',
                errorLabel: 'kch7hpdoo8f2jpbv7u2tu0qgzvap1yph2bmkgkfn1v20we9h1cnhuaikue6ru3xu8beaw35jceucgo7bvrkh0nmpqn79qlgh4h6k3gzt8zt5u29rhicdlfqfv91izym9m7jh44i33u2yfx3ro2tbyzkvvwsmc8hn',
                node: 8843197867,
                protocol: '74ezx2wlexkqzn0aaeaq',
                qualityOfService: 'fxrmar7nroo36047d1r8',
                receiverParty: '912ahayxyqbf3b1tsyc92mcw2bx6s3tf0upic14dqvz3o5ot6woys5z7pr05gj0ss5bzinsxz15jr4gy9mx08udm3xmj24rnhqsj8zzsyqj6zrgqkufdzevig5t8beqkbeehhtvgbrake4gsyvqdrls5b6qduirc',
                receiverComponent: 'mvu9jl6ym7fh7errtwi7gm9girgi9h5t4lljb7mtmhe3lmkcazce4dkpvyg8kvb13l2j4yrhwgjjufoiic19lmhq70gon94r6aclk7ywmdck6m7l5zybbie70631omeqotsgujpowgkrlfjuuf1vmsope7sdh1jm',
                receiverInterface: 'ji9mz0h3692e0zuftsw2sdp3wtd7vz23sb0leb34gmuxxjt514f0ed0d3zturcl8ayyeg12ndpiojm3daqal7i12ngp0xqr7m2hlxwglpew6h8z9mdnv9bf1798wczoxy3qgfhky5ewlaqdz4f2yp4gdaep22ijp',
                receiverInterfaceNamespace: 'vw7jlo6mrpyh8x3v8mgbsoysp5zjre7k2m2x4r08k86wt4cpe875dv7wtzt0bmdst3toudi6d704kyny2qql0zvcf9l1iztqeoe1x99lumajshlqumqgl8iknmheb1h1ucn90xdtr5rt7lyiep2fisovemt0y5e7',
                retries: 7403876609,
                size: 8522739843,
                timesFailed: 5201403703,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'bz39pez4jsj2prwbx8vt',
                scenario: '6l1t5w6v3t5jhmcumwabty7nhlbg0c9j4q3qrvci99hw6cj7uwh6giywjlo4',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:25:45',
                executionMonitoringStartAt: '2020-07-15 02:54:31',
                executionMonitoringEndAt: '2020-07-15 05:00:37',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'sfvdjkmldmahv16k4orswgmolgrflslkmsh4hlyii13rrjakdi9wzomwpbkjxeza1j58ur3czt8612r8dxvg6pdih6p46ydkrczdrmd04c6gmeptejy5zgt9dtfuezre6rtpd585zlpha6wpiopzvmggkyhh7igz',
                flowComponent: 'fokg3en8zui5xcsvf0phy2byyennu1uohd9pwe0q8zv2kd1lyeknxu2akpieteq58o8toc5x9du3cfi0c98k996olot45t1j2751c512r5vnigqu16xwojg8218mh2y1spokor4rqq65wfadc78rg7hf7a0g6g15',
                flowInterfaceName: null,
                flowInterfaceNamespace: '235or6it1afwse5bkin5zoqbs08a2ckj9gw6xsc8zd13rb7vw1fh71no1kumefv0pnidsr78q94n63ijivme9ajwzpqu5g05mmxl68eg4f372m04d3y298wbasn29adu5fygqww7on076ez302ilmqvpahiirthr',
                status: 'TO_BE_DELIVERED',
                detail: 'In esse at eum iusto. Ipsa dignissimos tempora facere est. Dolorum et a officiis ut nostrum deserunt. Sint recusandae voluptas.',
                example: '3ehac6jyugpqhrtf12ci96nfkbjszu00iksvnxyfby22jfnhu0ob33e5xjen3i9yyiyrbb6f0jpwfsxiwmgvbcoerey1raqyysg7n9z9rjpfuahjeczo3h3rnmwz086fd6xwkz6lrdbfb1hpn08feknv3wd23elr',
                startTimeAt: '2020-07-15 21:47:39',
                direction: '1nu9i08qe3pmu775rlzh',
                errorCategory: 'pl9ioxjtifd4b7yv1x8l3p64ljw37psuuy3y8rn6o91ctb1ap8ntnqumuweom6xp25nnkf899dezifttt39klgt8meuev7aes5ue51vrpqutmsglrnamp9hyjap6xp7dqskb32k6jxzhxui3fn2rybsq0l7ehc93',
                errorCode: 'li93qfxvau26k8k90npp',
                errorLabel: 'zh5setlvesoib6ev8bk9nvk3r3qlp11865m5kb74rfgwlt2glse8sl2yaq0b9t0poeqbj7cd74hicka6gwurxjcrpuf2ckd99pi8yujga2k363pcfqet0t2ygana4u261vyw7vk6srsrgqxbm9o0n7k79fn6bwbm',
                node: 3382038219,
                protocol: 'yr3ata99v8no9sntugwl',
                qualityOfService: '6m5xkea8bd88ksud7kv0',
                receiverParty: '8wwyxx9r06e7vna3hpbx84ke83x4x3fwgwevy14irncenb0u60h57zpeb6mf8nv4mcmdk7p8z4necrdj9omannwf3fsgakus7gg0cewtqvkqwerd8rd34dxznkdqflia810jb4gnaravia80wdxr0fr5pxazqh09',
                receiverComponent: '4xty19zcrl6v3wk8lbzgnlm5wng4pnw9n17usmlkljbmoj3exy4xjja0q27wgpxqrsy7u6knfmorfaqs2uaem12czd7t5l19y8f4nnzbb5sp7osoa515q02app3a9pe1b23x70izc5dixyt5gvue6y1ximjf6dvd',
                receiverInterface: '8rx9748kx18c8lgprtwlyeyb156pw05kbesd2530o44kj2trh485ac4c8b558lhbxbljnqfc08v0wxh0s2o0aahc8k38npfau61guq8ps2vro4cb1vvpv4cbzhj5jlgu2cdn5ry4r51jzqx7o1ac7z6ozj48u8zn',
                receiverInterfaceNamespace: '0x5yvq880sru3704g0riwo2y1kusihchk01zlwv0rx1wwczpimpsu0inp14bzuyvko26ddmg1iljvszz1vpc1gyb2g1ertr1xpk6i1yadpppu6z76xkfymnyaqt3ulx0jeqjooawrpg63wwadqksq5smuv7687jg',
                retries: 3999599543,
                size: 1857897105,
                timesFailed: 7581649499,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'pivi8wh4viryaa88hydq',
                scenario: 'f5k2wkeopupa251ltfwusm3a9klnahgksv54a6yxvyz9p6x693hw3bfeqwgw',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:38:42',
                executionMonitoringStartAt: '2020-07-15 10:31:40',
                executionMonitoringEndAt: '2020-07-15 02:13:52',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'cz3ajt6audclygenb14r0lve6eqq8s690byp2df50qcqu83i7s0dhjpiu2i12ims9ko48dq3m6xvkvrsrchndlzx4wzjdnvdnv5hfn2hxva25bqi4wgyu4v856tmbn9764beptwto2u7v87j9k5bsqldhfu3vixg',
                flowComponent: 'oa0eysjqgai45d9oxe01hhxth5vvlf5dil7lcgy4709lnd17wpccr49g9n3k2xmb4pcqkewnpmnsntjx2vog6jxlhq02j1dphbuclw4c10yhgq68tsj0l21ceol3dm3sx6lqpop81h4263lp18d7xzyzg22k1b74',
                
                flowInterfaceNamespace: 'd2pw7vl9mbolwl5mxezlxeys8tr1rwtaz74nu8u02phpilvj5yzucm23an8ir334kmo8vieppp1raauwnw800hn3u4ftdvc13gah5sslm2qok4t9s9e0m5u3pg3prym58g73baicr6ifxpokii8dwmy2hfrr6r9h',
                status: 'DELIVERING',
                detail: 'Aut ipsam nulla vel. Excepturi et ut asperiores voluptatem ea numquam optio quia odio. Ullam et ut sit cumque vero fugiat consequuntur repellat nihil. Qui cupiditate perspiciatis itaque molestias quae. Quo esse assumenda animi cumque dolores.',
                example: '9unecno8mfjex77nqsruptf52lfpv4gv8q2zewsx4qg42pkyg4ygziwbgown7qap7gjpnnkjj5l38xp5hpf04ynnmhi04ogunzq0miydoyybwvygerm15wbgh15w30ebicdnh48gggae2bsvqjp5y3hx453rsodj',
                startTimeAt: '2020-07-15 16:57:14',
                direction: '16t8beapb57fh2o4okbd',
                errorCategory: 'uc40htl1egv79c4qnpkab83z2dc487ds3d16e0103j3slxjczhlbfcav223wd6261egzc30frk28htq0tkv1egy54zcbprdys3i7yaw15nhb851a61l6ppfox2fot71p3cpml6upsauht1ozsaw5svf8csjnsxvp',
                errorCode: '4oguo4uyout6qxv0ij42',
                errorLabel: 'cpg2lb210twf8phdhh4aet25gb3k4vizacemp706j4pjzdvrf801yvszyieaqezbouyygkhdjxd9w4n9duiglqc9lmsdkh3grm58ido81weq95sbad88iewt3m4x06ik0qcletmk5gdp1ys9akiuo6342nqcothh',
                node: 8401727740,
                protocol: 'uylp2lj6ftnkfs4z5vss',
                qualityOfService: '7zfnweyw7zpdwoy2mqs3',
                receiverParty: 'a13aehlj3b8vv7u3z410pbkaf4a11b6ua3tg0prz73pf5frj5gx5widge17g8hdg7zqw8qqcz1g0uhgm4i2rbwwens8prte8xszyishevdlfparx8s74yiyxfe5w77nt5tvciua8qszb6zgelr4h2opyiq2xpuq8',
                receiverComponent: 'hlqn3wr2k0itypkddzk3da4nxnxvk6qrl0xg71dd50fw1xokencge8n7jnxhlyc7p47fzz2p4bhvfporpvt9kt0m5z4qyhiy5upafmcoqwbrr0kje6p54q2cpi6xlqa60fso0ll8s0p9x0cp7fylhvafa0q16jl2',
                receiverInterface: 'r6kf9wr2bm7fgt7kxmhsy6614krgybka094v7iq9f5ktp16h2egn4icwjjc1249nixn4bexkk3n41avjjdxxnh3rg0zx5pkohhhffbx49vwdhz2ak55wgvv5ds1iyazd50eq8bnyvr0r96m3mldmy0etnh9uuien',
                receiverInterfaceNamespace: 'f5324n48p2stdbmbatrnjpihia0uwj3j9r505fmwaxogmcbtkl21js82s42z3hlbz01w9z0bctmeotdqp92uo3pd5ayry7dejdxutfcdptq1ooejbgtwueo4bn09gozwuyaatqgsxbu9kdqn7nf79pycifn3swd9',
                retries: 5997278665,
                size: 4420136472,
                timesFailed: 7365954182,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '8g4lixzf2m48j2wnmmp7',
                scenario: '3jk80d97zjvcspuo27d46kvp049aayfc3teoxo000gck2rvemwss6a5np1pd',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 08:59:44',
                executionMonitoringStartAt: '2020-07-15 06:10:12',
                executionMonitoringEndAt: '2020-07-15 16:58:25',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '89v5sbwglant7ax53ioql1qc8i25knyacwbx2x561cqyzi5bg1pc97cctn8wh4vvwct57u1u02jjnd0ovzqc6bqc5scoxtpxykicrqzybaf067yfp3s7a8iw4891fhis1mp848tvy6mxtgygxe7xtl7ocen8pm0l',
                flowComponent: '03me4fy2wv2jhgtiumc45uq1uhyn84d9uc5ifdldgoj0365gaxcp1nkaofx52r87vy1s5i3b8jdssb8bnzu8l1boibpclwpbbvym2himozq1hbz2tw3ut2kzgpmtw6wj73cvny4xn85yg04k784nq1te3achs4m0',
                flowInterfaceName: 'lq4f3rnvohdqiczr9yxn0v1fhq2jq0nwlmmt9tow9nho81asu5yburzophc98lxnf7klw2awaff6eadg7et3yiwhawbcnyo0ek1nfwiva3lnbtcfhqwhtwrq21w2iulsrgmx7rcgq5nli4a53i77ipe2ln7kydwa',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                detail: 'Occaecati blanditiis nulla sit dolorem. Voluptas neque ut sequi accusamus. Veritatis possimus et et quia architecto magnam natus et velit. Veritatis sint et itaque harum ducimus ea qui sapiente iste. Quia et vitae tempore esse et. Nisi aut eum sunt ipsam vel et id est.',
                example: '0srjavd79hhwig3snxcsrfvo3etvwyeus5nc807wcpomzswqxtycgsl190gp59x0xylcenxz73izjyre9w8c3fyunkrm26ojlkmhaw41o4jd9v2gandqj4pbk5p8y72yatdql1p556m72lgulx3g67whdoql8mvg',
                startTimeAt: '2020-07-15 07:37:41',
                direction: '04rs6cl0vp20psdwgj9t',
                errorCategory: 'eq1dolqhbqxuwzp53ja6bvhtjar1tksl9765t0oyjerb5eh24pdxnzy4nz2j4wkelue5gn8ds70tvivzvkva5wuhytkwjdgzktunkfmynl1hbo89cmiqjwhoob0d4gue9l89l8dagklg6hbozxjtuyh8i5depj4r',
                errorCode: 'vdv7fr4k7asfku48cwtm',
                errorLabel: 'w54pkutrv7c9kmwy3av2gzvb7td56gqwys0vzq2ecivqwbdvmsr4n6wewe6yu04xhpiv3zfus0c9lwitnu1un3tg7h2meifd28v5jt90mtd9vuzdy2pl826oht0ma15ca595obgvwkk06c5jqv6mtkwwwbx0ztx5',
                node: 4400809293,
                protocol: 'tibyy96o4y7q6877uurs',
                qualityOfService: 'p5j60fjnfr74tuxaqeuc',
                receiverParty: 'boyyr6bvy0hbzj8iap5y8m1abfnoy0ljckkgrgczsrkhjsj3082c089a1xxevgcr29umjw9rp4vyl5gq1rwhqq1e0oc56re0undla0lb22wtxnh6fkcxxtovbqywk53tgdwekx41foqa6ff3ctr507vrd43biq98',
                receiverComponent: 'hgymxj5gm1he4evypl137n2d5dieewfbot9cuwursh6yirqfw5rv4puditowtvwwevyjy212ha83okvhlnljz4ikachcim65pxw702ez2bldrdo3o78zwxnqbw62kxpavkeyfqrhndxpl7i68iq88ukg0m645k9i',
                receiverInterface: '8hbnbjc8c22hxih495m8sxnxf3tuxa4dwg1qz1whp76irae5bj3153yl7jwaq99928mn8r7x8th3hond2vbwppbn503p7bonnkucema8emyq84m6wbjnyj2qqbr3c5baod5mwcr7okcndqs38o4kjmy32i1y2pn1',
                receiverInterfaceNamespace: '85pn8ibarm8rj8slzz67lyl332nin3lp6weu5k78sln3fi44n8nyqyljqelduvommfwujm5yfzdi5sxe76casocisudu2ggsutue9yy4o4p99u96qfs0c620axmy7omgg6svqmwjpnzn66dihyiarehyh9p0s9ns',
                retries: 8934842440,
                size: 1559585574,
                timesFailed: 8506938946,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'l5a111gule3yah8xtv0d',
                scenario: 'hiz6ny4y9w2omt5jw9ru61b2nl4yw03pndjcrejvka37ll8yxwkivq54eh17',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:14:44',
                executionMonitoringStartAt: '2020-07-15 06:58:03',
                executionMonitoringEndAt: '2020-07-15 15:11:08',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'k45dz4vpt5dufppmins59epw6otupkp22ue320fz4rka6qwic013n4jjz6g00gd7uz3q68au3pm57j0trnywg5lpja8h3puoludyg3v8qrkh2vltb10etaz0l6sd0d5lnl5qs74526oletkw2qxojyh9m1g7hyon',
                flowComponent: '6n92sff2ft101gizizkyb19ekl757w6xi2m4906dbhzm2bw3qm2jfno61vgqrtra1cxcsuabgzo0hb2tssxr3xesnweekw05ngw57lbywcwuqtnt3f658dedoy30dbm70sab6pn8ks6rsi98nbxqs0hjkv538s8p',
                flowInterfaceName: 'neexrhj3vzyuo0ol7vna6gzp7cm0h5d2tt3gfxtcxuel2ztzt0uq6d7aegdj9wkm5sj98qbc0941mdremj5yxm50yugcs7wnlyz07cx548x6j9i9cjxphxmd26ibv7lvmcj8j42v3sla9yu6e5aplgkxzx3ajp7c',
                
                status: 'WAITING',
                detail: 'Ut at sunt. Nam qui et autem iure illum cumque. Non debitis vero. Id velit ducimus quam culpa possimus.',
                example: 'z5ygzyiiovytgs7brsxs7ku25684luyj0ird5zxqjpce9zpc4as1zvz7gmrghip6wu2ubthn2m30aguialzrg394gvad97n6iys4qzs7debb1tcf1mm53ixw61whnrzrkn4phpqh7455bfdo1fjjq3zplwxoxa1i',
                startTimeAt: '2020-07-15 20:47:57',
                direction: '6czdg13rqdnc51acjshd',
                errorCategory: 'uebnxdo68t0cayjopoirj3no1se9je6dm4g7ov2udwyu0fjm73iuhas34ud3qxzo9my0oy9v6fwssw2dk62y1xy70dq8etwzhfls29ict25kjn1mhug9g04q1til6pb7tjinedtn6adshkbo39k3ydape8lpai8a',
                errorCode: 't2323fsd9xoqsd9r9mj2',
                errorLabel: 'oj8rhpqra08xlru4e4w1yubvk5hyx3nl55wzte8jyz4t71tprtse6pepb6j5w49kq4i389lyqor3j5dqrpotuiku2x0234nhwn17fjy5jlv1cr062rc0b2kiznr8jvrv4jhrzvvags9eki3t0bxjkqt7529mbjbi',
                node: 8925474880,
                protocol: '0ka6f8mguvgqn7el5bug',
                qualityOfService: 'su9dabiob6d7qqa8l173',
                receiverParty: 'q393nysh5nuuhyd48lcgc0b98sf21f4c5y7vaa62a9z2tq5f7qmv5o9ldml8q32t8k0u6g6poi80lpa1u992bjkxg2a2rxiuhbtxjedzpvucf5cjez0jaurolvbkqvnw91zce7jjaoolf154gwfls08eluo41o5b',
                receiverComponent: 'ddrjz3hw5r93c1ecw23xldcz5evh6uwsilbzs3twqc8ppjj7p8w3n09sjwvatifi2ayclxl5przjg5ngy233cmf7gdw50fz9h4nztlqi5f73g7g6fjyt7ntc2mxmoq7ozofr1rycewuikyugsazen9tsltskb2e8',
                receiverInterface: 'z3x6j5wjutj8cq2e5zkazw6d7ana2adbhmpn84dbgvv8tjfukiagol6gf04cu1w0r87ul9at7a25gehhs9r3b6hcsaxq0onziuluv3261cdbk5fzs1envuf4nmcubwgqrj4j0kyqw2122egx9aqck0lynl07yqy8',
                receiverInterfaceNamespace: '1epkb40zbnwmgcon5drdvjf5e956tyjvis3ja7ej5h3i1dg46yfeut9lsw5fyzcuk19na42e6qm5cas8i8p298fa98s8quw69jn0a0ojjzpgx8qwlbmjpqzzvrifm3097s393p2ukf20hr39oepxa51mmaavfunj',
                retries: 9544477454,
                size: 9253495066,
                timesFailed: 9490734239,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'qs6h7xm9ezkju8jc0i7i',
                scenario: 'imijt8ojszp9u1uhb4qm310dz0d1jfmnsg0dkl3zwv5t4s7wbz62lqy8sx4m',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 15:35:56',
                executionMonitoringStartAt: '2020-07-15 10:32:29',
                executionMonitoringEndAt: '2020-07-15 08:54:22',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'eli7l5ixffl2pkw1r31xyizlnyviikx4vywex4mb6o0atvee7i4rm9x3hpjx0mae7qpxwmhy513b3g5woozdxk4hcdh957pbtqvdy9ovy7m4rikwhjxajlvrdcmb50pjgpkklfjqrha7gd8j80dnj7krp35g0zjd',
                flowComponent: '5qzr5vd0783m5c4p9i43d1evtot7onyfn0bvneyupvcy3t59n7jlfx0n832nh2p8ux6jzloisu6eqvujoq4nuav44lk4b885kr2c1553n974o1k2rrkrzdnth5z6ap4owajrl48ez09kq652gjcernfc7bxqijpw',
                flowInterfaceName: '015we88991x9monbm4vi61b9nr7fjg0jnlqhjj27f1o16431z1rappikl81xu1nhqc9npzc7wl4udgy1p9lo1c00opjw7vcew3n5ci56lx86vtugqobqhk1e1c0h4r5lnl4iieuezb60crgpunr1wq2s3dudmv5s',
                flowInterfaceNamespace: '3sb8s05k7o1fvcirke2040z6vux8fj2ly6rdxlefkz36x06i64bsvfdeb4akrtmrjv17mvl0v3r35wte8wyvqb6a3rwnhvpoy074dtsxyu7gwnt0dv4kh3jd79j7t9ggo7c6xop78jf2hmvke6jf1yo5diye8hvc',
                status: null,
                detail: 'Consequatur quia beatae similique qui et et. Corrupti placeat nulla et omnis debitis dolore et laborum autem. Nostrum perspiciatis ut ea ea sint exercitationem ducimus voluptatum facere. Iusto cum beatae aut consectetur qui ea quia.',
                example: 'kjoq5k20fdu7yvvgp4938ad9y1vh7fv0qlvrohoj3nfdu0q7ttkms3g6opnr7e0x0w37bycpu4im1ij9fzvrb1wktbksbijcbhb0qrwonaa4acuo20n60wo0vpwi84v1r2ylv56dqn3eqqcchobpia3flz0ojllg',
                startTimeAt: '2020-07-15 15:28:44',
                direction: 'cwvewsoswe0fy3gq6dk5',
                errorCategory: '5b7ywv5zzgokpyqhrsempqe834iw5t19e960sm3x9ufq7izv46c6ijnziasxd0s0yuxi8sgxfyc3vqoqzq93ilgpk96zahuopq3690je6ygdogz8kjs9ylk0qu4e3bxkgthsz6ek6wqj98hy9ccezta5g6wzr1nn',
                errorCode: 'fhj8cs732mmm9n5yc2qk',
                errorLabel: 'x9erjxkiyosgn9xrsni7n2lxuyl0k5xwh3vxiaff3v9w9d12jftlimv3qqvjprd4pd0e062vvtkcbeamw1e3hqr4lfzwixlukejvwmo9ax77m1xuts89d07zcywdund5rjg0nkmqzdaujk1fwnowyc5aj0eruxxb',
                node: 2361777774,
                protocol: 'tilxbofmtrka85m63n0o',
                qualityOfService: '1mmncg6rwrxezsni8rzk',
                receiverParty: '0r3ceqw6pm6k295z3m1duofce27jwoyihi5zokpbalds1t5kv5e22sud6nv004fi8y2sjzqv553hqs0a1omn63xv8dyplice7squb325cclcg1axw38jvb82udir2yaib6slre3vtxpy35fjcwwdwcqn93ay3rmf',
                receiverComponent: '1nmu5hotj38n3xwxqsth559b7wboj17d1kel6k9jvi5kc7jaoiga53t1ux1rw3n3ze6k59zwpn07k44kl9cf6xz8ugj4cs180fjhkx8m3xphjktq84g9ejn7ivxuvm7ecn3nlm1wxqsssyo4ra87rm3lmskq3s53',
                receiverInterface: 'ffu0oc343v8nf2aybsbcmq98an5kv2m6tw1js2zcnfijm48ebu62vmp9azf7gu7zzo13isag197hdijjok7x7wi2ty8ufrariwrhqb9rogvj6q3iltqyv0wz3f06x4waqui6hrav9je0zngx48jtrowakj336oj8',
                receiverInterfaceNamespace: '1dp6lbp3gwj5budi4hd8cn8b6h1lxfuiowrajsz9qstgljgr45g8cmx4x95466fhi0pos0ygsxxn37gvgxviuxwtcyevcg9za0zqtus8k2u9b3t2fu6ue9gcea1zbhxitropmr6ew4vpbuizw66g8b50wlmu9wv2',
                retries: 8416081379,
                size: 3921268568,
                timesFailed: 4154192877,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'tve6tba8ovu5qx98tpb6',
                scenario: 'q24gkzbvezztxptzjuop47dkafihvp2hjl0l0u1zuap0ku0e9veo6g3fojm0',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 15:35:23',
                executionMonitoringStartAt: '2020-07-16 01:14:23',
                executionMonitoringEndAt: '2020-07-15 23:51:18',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'v15yekqt6kcd5vbi7flityngiplwa2vzk4c9o8yt8z8zbvyo1tjtijelrixewjudx4dwnis6kuf6zyvwvff9qafkx9ghotgo3ercr51502dhsyi2plbl3ovohi4fz2fuesqf7ixv478z7hy0ha3404oitqgeciwl',
                flowComponent: '2d7kuh2n4k79r134rre0wku3792btv3xxvm9zappwr8d5uqvknw4deemeoiqfa5mxnqht2u62qw9rynwovwtsrnhfcakj9k2n39d9fil8rh1phkgq1nz0kih3vdm1gj7kribend2dnoam3rz7qxrcuatkdebxem6',
                flowInterfaceName: 'y25gpux12irccfmne4y9i5gtszs8d8w7k15paxfzeox0fc3g67qqrlowh8a46d487onqeevplnik4lgc69l4jm5npgdr08mgt3b913r0x69v3xgdsfrbjus608591251tqd1sp27b5f7jyx16firvvy1iiymqrvq',
                flowInterfaceNamespace: 'hck5ut7gfzm42m3srtb796x6kl5n6pvdlji5wxucw00xh6kewlcjch8mc4vrhzxmp1j7vwnsj19on07cylf45z4e2tm604hdo5zeiblwd5h0qurdt785hhebat8ilryynmf1jbg49y2aynr4b0oytjtrfqhtasep',
                
                detail: 'Id cupiditate ullam exercitationem nulla eligendi architecto libero corrupti. Voluptatum adipisci nobis harum est. Qui voluptas et officia et quidem quis ut.',
                example: 'w9mwvz1kkeglx3qrs9l7ilpevlut77pyb67ky467bim08p7tyz2nlxe2opk4xqmmb5bj9qjq94w2g03nzlaiwv3g1gnrncll9sc2gc00t4zzlt7crosncmqdazn0tkhumzalryc3mufupvpsg0w6cdpdkmdkopik',
                startTimeAt: '2020-07-15 15:18:40',
                direction: '4lni1seh49bdkj0clf5h',
                errorCategory: 'stiy4rt1etfjvsq1q1hj263tml1cn5g76ogtl1ik78zvlifmqck72q79jkbgnmgrcyah705da2ddiioyqxyzrfbgf1t17j1b9v26mbbv44f2gues4t3j47v6a0pq4v1nlf5k1dtn4gcxk3mknp2u204hn5ggn6go',
                errorCode: 'eqihplvkc5wla7axf12k',
                errorLabel: 'cfc96slowia2cgjwgm7m6u8189hgtawejxv1oalhnsok5coq99d9fob0tgbom7u09p0duw9bvqy8jhmppnitjc9gya35oq79sy9lp2gk0xoygrt22tdr934sdubr0oxrcuisyqy9q3e7wcbehbvsvlchy51r5u0l',
                node: 3676029644,
                protocol: 'wb4rq1guqx031ccjjpu9',
                qualityOfService: 'y1pqf27vmxi0sck36rz8',
                receiverParty: 'q9pc8ta9ne5vrwugi4q94csfurjm3pj5zugqel063vf7k2hw94ro2vxpi82scn5usolo3z0dwfl1rhhegevj87rkewaumhvsc6tfhuos8nalngwcms5vycit4rr5ym0f4j0f4i616vkxc26xv3j57lzv64xhcqza',
                receiverComponent: 'rmppvu22pkjv6ig9ufyn7xyc2lwfv75othlnw4bbx6vuisyxtt1f8q90yxel6vmqg9p7tgpa44zmtm3k66bobes1eet35s75e55ikxom523t4aeq6dwo7j984llvft2rkzcxqahmaa7mmxnkqn15fmhx9mljyws7',
                receiverInterface: 'ijm4qvhgi8wu9m77p0x4p803rerc3nt1s7c24xqovgt4laf40cx23fh0abycbdoi0uu1x5y0dxzyn9amtf8kawcj6e1lorti6mzuojf9x976b9fz9551rxlomi64e3q0rhb2o1pu048tivoksv9uiirsurm3ikgs',
                receiverInterfaceNamespace: 'ephk1ioc2ge6h8vat084130vgmau81emvmemwwrw285g85cvkkn61sa2e7mx1vx3pfwk7op7xp51udn0sep5un1h6p719j6r394d8b66qa0l6k62nyl6ln4id4ipklrqfgzlezof7mek96fosy2mb35k5jh9jdhz',
                retries: 1917255340,
                size: 1640827226,
                timesFailed: 1124805379,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'opirmb1s8cecx64b5vey2avpgd1n29f3lyt1j',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'sp5iovwz6z00loiwhn8m',
                scenario: '9regy9ylugl30i19zq6xhxtwxccbw92um7y3sl26ys0ftelpkm968a0umnuq',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 13:56:56',
                executionMonitoringStartAt: '2020-07-15 03:25:29',
                executionMonitoringEndAt: '2020-07-15 15:39:29',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '6e35dofkbniae3s3q34ti3pzrpuw4tta4wpdipppclw5psclr7ehhfefs2smlv40981okc4kpneu2f31e4at1zzssbkubc6bkxo5hbaamh6cfs2yi46ha3mbgu8e2xholhnzx5gwdl584ut61r9w71i2njwhiuxm',
                flowComponent: 'crb5bxaxj16hfdhemolyol347yfrtp0ovuvx7ek2wioep99uworzt0tyb111z42rsgb6ohrp6lq3dcxar1rnotwhzg62z6ah3bfux2dqjuubptsxm2hklyx9n4v21oxk6s1dbmi2gkyzq7e9i9wpsszqw9opjbfg',
                flowInterfaceName: '74x7060edd6c703snm4wth11uuqkzpxk70oltq2ap55df9jfsw3zdjazgh6n06gycvxuoo7gdp14wg7tt7ymzs5tkvrfmg5275wvbx31wdrzrt2pl82jmwtnmonbqrgkroni8lhratyv83jm4owbmollqpd9g0z9',
                flowInterfaceNamespace: 'b3huv39vmj02jn703pzr3hocxobu9eylna2dhr3je2l6n7qbbxwgp7l42jaewenf10ssrz76zeobzpls6yaphiqktqt60nvd6dgh8oeqbpmqg6k9opfvlsmxk58wlofrnvhjcqp43osp0dnlbfj97yns1diedc2v',
                status: 'ERROR',
                detail: 'Ut occaecati non aut eos praesentium officiis culpa. Ipsam a et officia vel. Voluptas neque doloremque vel ut cumque vel. Voluptatem et corporis totam incidunt eaque architecto aut aut voluptates. Numquam aperiam ducimus omnis. Dolorem delectus quos.',
                example: '0dxk3si1yu2q2vi2ons7ct5af84ckik2pgy4kgwyfsiwjd0rfk8s59huh7j9d4cmmn61dpvm0tn8jr06iry90637ewnq338n0f7ydfly3losjryuw134tvx0lbeaggi6b8n5181mjawb6lvtcxl5x15ldto0y6zv',
                startTimeAt: '2020-07-15 10:30:01',
                direction: '5wjz7j6v9c4hd9lu7umk',
                errorCategory: 'lo8ro8s1l14psk5ov60friqdb5uicesk1qrlnviii0ihywz0wdlwgeg01nbfkfl2sgaqorvgwvxl5lmlcd33vkeeykdfci94y6c8wcwkk5uab4t1e9zvt62y9wbdar0vsjym1lrlu7y2spmjhuta2go0ri0jivs1',
                errorCode: '0jc9vgh4fgyqv8cdr8qm',
                errorLabel: 'r27rxmx8d39ajd5e654gbzxm340bt19mtq5yedzzee231p5vncev3jibbfo7kkh054czbqtf63rmabxbn0hco0fb6w2q10upwcha9lb7fi83ijds5b3wl8ws1xdkiejtmnx70s2g47uyv5xts3lhijhehvy0qxez',
                node: 8429112611,
                protocol: 'ijefvmmaqvxx80tye86i',
                qualityOfService: 'yvj9nlgshtwxo8hnr4k9',
                receiverParty: 'mn7tvpxpsn2tu8n2a69hpgz4wagt9ngg0hed59s2sudjvpiacuy580zqugw8wd0gwj1vgbed7k6jl0kuefdlapsxiqcuw262es8wxjps9kq59p5jcqnc8o0koreqky9olrik5l7fv4uf6pjmwtw8tb7y8to6qqtt',
                receiverComponent: 'pu5v0s6na9b1p0ouzema96y00itmt583gm20c3g3rwjd9m7s4rr6vsw31ze1kqd2yinxg4ggzra4d11q33xlwrm35czc13c4szai9dutlkwfv04e7q6s0i3hqozufylu2orh5ok9hsqwhc3b3bq74kz6orw3u96o',
                receiverInterface: '3ys89s2p34m4gnq7690a861mm0vcs0o9gvej1gnbjn1dqqxa4rbh0q7hz5e55de7d04oodsyula1npkvvazji3kc8hs28yk48tvp15aorr63cckawo89m4i5b3gyfuq0fuegsgir26ib51tzuavsu9mxvwgivjvt',
                receiverInterfaceNamespace: '2ryl4bc8exrca71tac84svxxtublo641r5obbj2f030zrfwvra3b48bor7mkfcs82xo6aaqyej85ysrap8c1sgs6obua8aye45n8hcdae5mxj3l78372kqjiqydjxrcts2ro0k743ki6z1h95656odpnlezxysee',
                retries: 2925330986,
                size: 5642546943,
                timesFailed: 7919835824,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'o1qjt2yuuc76ihllsk6trzm0lifq6svo0hbge',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'ua3ieqm2hwm8op5eijtf',
                scenario: 'f3l0odojvkopmzsbu6vg88bhckm1am3vhzxoextmmtk9obp7wv52d1jneom3',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 11:26:48',
                executionMonitoringStartAt: '2020-07-15 18:14:12',
                executionMonitoringEndAt: '2020-07-15 20:34:30',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '30vi2qmwy6efezi8pznzbo8wudor0f3mver1np6qolyn44d9rgthlv5sdfq3c0o6fmv56wrbws6i8wzk2kpz8ooyx218cu8uq88oyedqk17kxkzio2qstptfl39ap1pjdi2vfembrssk4nz1t2zpx3diw7a3vwbc',
                flowComponent: 'dpxbrimz0m1gbh9qc27xfzrqnykq0bdmoqdxnuy0jha91uo9nxe87e5v2b7x9o23wm3ohyexpii25owyz4lbqac6uvy6osdlpl97gadztduv6zsy0u8hw96ahxv8jqtvcka2k76tom8bnqj9yug387l4sk491zt5',
                flowInterfaceName: 'wbi589hpokvds2sxfor608dt7exk0gewh5vb5jrhy5si8yhyhx09qj7023ppktj6cx68xucsodtligd2skexhi29kybftqtikj8n35u059w6e2tmp34dxgj6o34oqkiofuw9uj077qhkzxjfoxq14ycrqfisov2n',
                flowInterfaceNamespace: 'hgdruvoxx3v6co6fjfd7lqohj4dt7sm30dxgbvsmp1q73zqwpwnddr7u1jzdbrb0exlg0rb1t0rogqtr1nftlldsurhm88ee7q9uk1a5yfk5w1vf1ttgkwnmeiyetyaa511jofds9l6u7x7y56vkg9sretw73u3k',
                status: 'ERROR',
                detail: 'Perspiciatis et reprehenderit architecto provident quod repellat numquam. Omnis quaerat et quaerat quas neque dolores. Consequatur enim dolorem nihil eum quia magnam ea. Sit sit quos. Nulla voluptatem error ab error.',
                example: '2m81kknkc73sof9c854t2pna1uxhr8in7yihep0bql8dq30bxhjyhdxbyqn2j3b243pu417eqdm23otpbtkt9lywykiykg2xas14cgzuq0fz8yy7a1388rn1b1lbxpnb8loymbcf5cq0kkdgzuweczb1zhs7rnv0',
                startTimeAt: '2020-07-15 04:28:32',
                direction: '0cy0na9890p5fuwe9s4h',
                errorCategory: 'eaxigmfb36nbann82vzxop5yzgammtwhzddc7zz8nwbay9fr3hspak6i9acqp1xr3jt0vxnozzyrvidk13yadu8pgr17tuzji5g714d4lpfa88ipxjf1qj6mh3wf3oj8ogmipnxw5u9rcro3qhxw7e7u1m88xoin',
                errorCode: 'pgp6krx07bogpsblavur',
                errorLabel: '2m904puqx0ffibvxb0yq9bmyoxm38zsepvetbfcu4jtte7l9hcrm44jo32va154n7p7qgaj1lw8qmjr2ee1ckfimn6t2i966wbj8s1yrcs2dfk4jrdh625nne0f8t3d6ejsz6b6g9hjaidwesyl6dpxlvo9s75yi',
                node: 6491746766,
                protocol: '8pqd74dl0ht2a41363ht',
                qualityOfService: '6s53w3m0aqkavrvx6pmv',
                receiverParty: '1tm8dtwxux2n5jyfy1guv120866dbfho9dwrrvsm8nj9483evy2o7esr0elpky7y5tveu4iyu5308d2szveuuwgja3klkyh2rcncqankc7ufw3wa2b5zwre1yffd7r08eqk469dc47tg6f95pjlzalmyb9bz1dxg',
                receiverComponent: '167c51ljfqhtkzz5fkmazqa08xin3ht11c8pftw7bgduq8h74dz0yvddnu6f03dpdzo1tut1kp5yawbrak8klkxq781mjwg1u9hlirdt3i8ikg8ifet4idsht30t65l2az07eblvx0o6bpy5uecxrj2xzp82bxg9',
                receiverInterface: 'bj2tb6wq519juwee1ptkhv03yl50nheoj2drs04c9rdbi094aytzxd6268b3hele544as0zwk3t40c17bjkjkrlyejz6madyf80zb85bj0sv8pr21897n3wvasa9czq15tnz4avppljb5a591g08s4cygypdyw7q',
                receiverInterfaceNamespace: 'aaen3034ifixhsc4uv7780d0wgbsbv80de2rivazlaltlvrykuc27swqyr88ao6cewuhicdra62pxzqc1gu5ki0a3yaifwwio66ffztmggnxnfncqrt7dsgc1xytq4xe09b5p9ocr92p0mwsgzyi9ffj1spqoyz9',
                retries: 7637330710,
                size: 3725200992,
                timesFailed: 5274379588,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '7h9uo3dyg0m3u3w6kz01farbj2oaz15dwsqlx',
                systemName: 's5lccj1bztaxz65ew0i9',
                scenario: '9opvypsiph71p7x5bk4ig5je5y4wmwutkte46d71iseap2mzxete593ki73c',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:05:49',
                executionMonitoringStartAt: '2020-07-15 15:15:08',
                executionMonitoringEndAt: '2020-07-15 16:43:15',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ffwiy42ilkh7wj6o8vbq6njx7uwdq6edjivh6yfreu51m7dduuxm0rokj5ki5yq8fdi3klgcwt5zsuka58o4e4uyp4j3qq86wk10xhkg3d6h070pe39o610pe80tlb43sckrxhw59nl79cwrnehj16iqoyow48ez',
                flowComponent: 'vdhpg3gm2apftgbwdjii26yhwjvk6h4hg0l3083rsxejtchkac0dlh8cdwvtm2in0khnfhflrdxcaan7z6q3sem9nu87stgr1vssx3d0d6h44kx0gr4qal5klez6hzq12ofv4a7zl4xux04z3izv1cqrp8gt2for',
                flowInterfaceName: 'g3vh9gjtd0fzex1g3m098uauogkuo9i0jv7mrwyk9ycwiv9ftsdkxla4g6wk4obyweehwxmaj6m9is3ornopa2b9pzel6yx18hl31ujysxkjbhr1dyq3wgfth3519u30mumg1ruwtf9655w6c3f0nwubmn71b5ab',
                flowInterfaceNamespace: 'm8atuqibxujvtt0g5ti4lynl86myt6nclr869h7ncwuxj1grv2rsotmwgpxi6ajqbbqigmt0unltr01p3a2eb3xd24xppsipkm6u5hqdrnxnsppruzig47ejb2bb2i5xq2rila5gbpl3r53qk9g8ps3fqd1s9lng',
                status: 'CANCELLED',
                detail: 'Rerum repudiandae est. Sed saepe iste culpa et quasi ut rerum officia. Dignissimos aut enim exercitationem.',
                example: 'rr5wr12klw41qxjgp2c3jdfjp9lpncxt52pco7805vnikvicsf6xi5btb2ozrgw02nucjaa14972ic3ii6mh0f6taqhq4emu4oufdca0telka6h2e3w0h88bg53bds40nt9dtdw8zb7l8llvsfkgr0bidv84liak',
                startTimeAt: '2020-07-15 22:43:42',
                direction: '4br7yozpa2p9kdl6rn1z',
                errorCategory: '3xbywpu6ka6ff8fnm5vofblj8psxejsz8d8km76499lzepw7znw4cs21kivc6fhc9ppc9qng01zldy6xu9eng9rzc9qrfjln92lj8uj0bh7utqmnvte2v1q3gc6sdjtx3mvvaak6f1h5k2r5nvr57uhm0i9bwldd',
                errorCode: 'g8kjho4t3gqjk4huv4l3',
                errorLabel: 'nze2dlk3btpg1m0ihyel2i5kv8po1soacdst7p6h7q56uy6vb7aie31i7hnr6tw1ty9ek4j9itjhusb6ika8vpktdcizjruovlrtuet1qttvzsz4jl7m9p4n6fzvtxm9aedq311hadbtri6kn96akpgxdydodvk6',
                node: 3721283864,
                protocol: 'nzk8just9kt2jdgqi647',
                qualityOfService: '2sm4gh9ra9fpkzed7n25',
                receiverParty: '3sgje7df57pddfzcc3rsw5e0dv8oned3ar67qcm6gh6n05vg0s8vhc5z94uc5g1tx28mzrmxjhk2hgcwvvlc5yg7ni18fb18b3lxjm3lkj6qgh84vgj6eh4twyz6ua2z63wlfy0nq385dlh2f1mf5yh9tkf0ei1q',
                receiverComponent: '2og4k3qaxk8jy8kfnge57zsewhc24xggckt5fb8jsdwnbvuxf9aqw1n691trngozfar72jandf7eyfd7pb3i0a8z4ujeu1282inifwqg8k4y712fg6sosm1fkzl0mk6x39szbbi0tdvtjr6daartc85mmudvz044',
                receiverInterface: 'y5snihqmxpwq9be6qrig9jz5xafkt9r3iid836ipu1735asw0rhaubfg197led1mthksk93po5jwg0mble2uoe4j5aopymy44b8rzdua0lhbw9av1gitz85are4zrj25u6v5oubcnj0790ej10kxqnhvcbrijaj5',
                receiverInterfaceNamespace: 'bgg0yx2evibpzfts4zsumxlm55srlb5fodysex7a325cno6pkj0wlqdza0jgin8ih9qvu3ql751azlxjppkf7xo8mfd7xyux0fkx54z77wekdxy0xoouiinax7313eyck4lsq26jdgueidx3k5kfaj5lfy90ywzh',
                retries: 6729426987,
                size: 3070400179,
                timesFailed: 7107845054,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'fe4r5hxizrbl8bc7nqno',
                scenario: 'zfep9hf80wqpgqc90ipgvbro7jnmijz3km4ew3mrl05knwgxhg5uvaiauzoo',
                executionId: '57xn5cklycbzutk5bu96kzgh5azzt6tsis97e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 08:03:38',
                executionMonitoringStartAt: '2020-07-15 23:59:33',
                executionMonitoringEndAt: '2020-07-15 07:25:33',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '7di22vhnws756fp0tswpli5bhffzrtju0e8gsxadbns05bkbw3oh2x562uz8x9ke7xgdhx530ju5cn3528lhfz6ilr1lquim9xgf4mrsw6e77gf8vhqvad4m0uinzzctrjyt8gblyvc32hccbrtixwalaa1oej53',
                flowComponent: '929q9zo07kdfyed4wau6mg4owai2xpqoiv62uh5bsryt74crsyowcqukpbfs0r8vnaquh0rwcp9j8ztfhmh7pgnlvslx4k6fc8rg0ppz3cjnj3jckhqvdoqjgvh5dxz7wwo6ybxu538x4x0esfosf9tyekd9onki',
                flowInterfaceName: '9o4jwy4k063zaau03qsn12iy58igfeir1b0tg9zq7cvspnhffw76odt3x99d7z3coegleqqgdru2piopxvi5loknn7ko5oitm59qm575fwb3pulp8wi66v3d5xd971720ne0vt5akramtgqmbi41bb5vwx112ho4',
                flowInterfaceNamespace: 'a247j1l7bcr7cq2l0yfp14kpdanglep9yykljgv3mugvvnbt8fqusdmqs3fxe92f1pdy6w61xpw13vt5sqgclu40x0wupop1kjew9d62extfarszb048901317h8stykcn7qd8fs2nu5jpcnfk0pnqrgz6dx9gx7',
                status: 'HOLDING',
                detail: 'Recusandae saepe dolorum eveniet minima. Sunt reiciendis et occaecati in odio vel assumenda fugit. Quia voluptas repellendus pariatur quod tempore voluptatem. Quam ut adipisci. Qui deserunt non aut consequatur ut.',
                example: 'j3ewz5y8r9eateq05bovoegf0lbfogwqkwg4q2btuk5s1s3jcgd7hz9v3e9dho7celsbh5x9qn2j76w3mvh1yftmblmanyd6h7pf6827xyzhf6maqx03hbb6p6nf71ubm4xvovl5gueqz1anp39vzoqf21hsjm6a',
                startTimeAt: '2020-07-15 10:07:52',
                direction: 'h06w84kduehgy9em81hi',
                errorCategory: 'aw2hlb6xxzfsslsnzsltjg2zcyw51ykof99d530042988kkg2vx0ui7fgs4pxv5uetjepyvthewqa59w6xzdfi530tlyliwak3a0hljhbiicc2r5k4wbp9finvt1b7cah5pvsordyt2v0kwi2ddklcor38i10hqb',
                errorCode: 'xzmy8otxinc47lotj9yq',
                errorLabel: 'tmtamdfehqgmkyff0xio0lfyiyrqvsifvdgp9i5qmgniq5h7r593u920ys7vvjhvdxz9lqcee81z8xv97dp6hkz955nhjmhsaypnmtkmmpm2n0mor1wz5d8dv7l9bvp6ebu4wzumhxx0nugl5f5xm53badpjgixc',
                node: 6260643326,
                protocol: 'qodxbr5k5qmz3t2se33a',
                qualityOfService: 'w0p9apdwf1fz6mjqpqqz',
                receiverParty: 'j36roosdilf0yw6jfbin70lcgn3uy0e3et53k5nf6pk69f4jpf0vxbob0ej1954fctfwjwfjipb292ikl8eyul8i3kpucpt3nan22pcch7d8jtpb86ago0qlsvrr1a85uh0rxjbz7k7dhs28knsbgcijpsh6yk45',
                receiverComponent: 'yddobejpg2x7g1p391cgcc4wgac5bq9yhie66j4ywmx2t7xyyuov2zlhgky44elky1vh2q4mwvuhuu19dgpofbvzvjj20oqimlwy5o7lmglwxp9tat0ir2lhdgq827ub71i9ks9sij2ak2r7i0ede737fw83hmhz',
                receiverInterface: 'a9g0x6zjblaw3t1cqy3ozzujkopmig2vw2i5k5hq2dsjkx49czmmwsdacpxs1m8lmgfo3kyvd8wblwvze5ozyq0781ube62h5lf02j2m4kw0zi6ig9pv8o99tkxxempb3lc08auxiifmx5zjih0ytsmeb63vmhpu',
                receiverInterfaceNamespace: 'utle0nu14ok1v96c6s1uqnp1yd2vxogi5afhpasniad8tl096j0p55jha3a2wqhvh2he1nj0mf10rdghragayoo0hqf4skcf4pvypbfnsczknd2fvbvgb8yfq0gv8hz8fldvuw4o1q6pqdbururjaxcpcez4jyjb',
                retries: 4182297740,
                size: 6679426776,
                timesFailed: 4306332922,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'qumje37ndiksw525btmu',
                scenario: 'v29gzfbjsyr07yx53qauqcdxg3fwpab4t6w3uqpfoawom7ugtuwe31tc6kzw',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 17:12:41',
                executionMonitoringStartAt: '2020-07-15 19:37:56',
                executionMonitoringEndAt: '2020-07-15 17:15:30',
                flowId: 'rki0b9s8264t9rhb4e00vj5fi10unjqf7yter',
                flowParty: '46nwis4gsecngjpoha607dvdt9mgkg5282v86qzdvc4m4vfwy2px70u2g6glnxftc2tkl0n44s0ezm6xh5qyk23g2khzsws4zyjnoznqq3ew7h92rsnk69zmhnh2yestkebmr2l9tdbadhgqbooaaqvq75tdlkoe',
                flowComponent: '5qipfjoqt3wqf7iglyjzhqf6d8ltux94vaqbeefe7s51x3g5ty52nahvyuznn5qg5youg4bw9mnfam13beh2kectuqkact18unahzzosr4plv8wclg0pmobpzs5qnujupv0qun6675cftd7gc2ijw9509sd7g92r',
                flowInterfaceName: '4ak2j1p6nptufq5zcxh0sfdqzsfc7m12kk6lhqcm9e279qa2tq3xpbep7lk27z2lvrqllwk3iyyk348hbuhxfooldr02wg8nu4u2ijffzswg2yfdogapvp7tz1mvv6gdu55679jzv1gua48xmd2ktr30ymct1uqs',
                flowInterfaceNamespace: 'c8hzp8ygzb4npbnlda1l87780hss2jlwhb1p0bxcrrtt8lrvbjd5mqn9w1pvm9wod73kv4xj76jxmjar98y3xy25o7jxbtbvqercfny0s56jzaqll86klwg8h1awhpb1wekw05ozougzp6swgz50wdtiitsp426g',
                status: 'DELIVERING',
                detail: 'Aut non nisi sint quia et possimus et quibusdam quia. Nihil eos at alias. Non blanditiis pariatur et a cupiditate repellat. Accusantium esse qui. Et distinctio impedit natus velit dolores sed et qui. Neque sed voluptatem ab perspiciatis non.',
                example: 'u15ikba0wr2b4jzdmk5m5s2pqsbmw0bph9dhg5uiyad01cuy8dw8hdpaxmaykj2izyp3fxqxravj7u2k7dlimfjttlh4vk6rp8wp3oq48odoxnzcgmhp5i72rf40c3xm53jbuyl0wzllxcokq50hpbze862a757o',
                startTimeAt: '2020-07-15 08:46:42',
                direction: '0i95rvn2w4d0t9q63jxa',
                errorCategory: 'eivn593y9icw49d1v0x0yzb92igy0cajocyne7md8tttpzgon3xlmhwp1fdbdi3c32yeqs5cfnnsjw49uo6xk13r2jfsr9n6ll49t2j5v5ol7089ffkiqebzowqlo53hbehtt00pmy2xp4mfc9zn171xjlwr00s6',
                errorCode: '8wz0igfzzybofk2n5qah',
                errorLabel: 't24nv791tv1vn12ool6zg0vx7mn0z0br6eg3ky0xkm1b98t2vsmuragiu931rvcqw3ahh0qeo2shunoyvzr343fg8lvhgpxu83o6megbzee2dcli9dwfb17jlmqt0v7xpsce3o60uf8a2j37ej0g98hkd92dlzw7',
                node: 6282353617,
                protocol: '6sh842ce0okou58rq5av',
                qualityOfService: 'vh6hrgy6frkwmvuve6yb',
                receiverParty: 'o9jvfi5msg5y4cgkrytklgr2ucfgqiay3up1hu8qzmg7av5vqxgrs2exnwih5w8gfns18eta2hm25xfs9tcll5oohos7b71o7msjwrjlnwmjy1t3inaifoxm6z7ts1gc3h6aer5mn8ibc7eagmg981v7748axn12',
                receiverComponent: '7iclpqmilgnl5ecsq1tiwpcu81cl4mhr8q0q99hzngkyk2t9xwxrnvdzekeyunv0bj6aecj76k3s2lljbb2i9nfr75ygslfmj0h42t1allowwdz5s3m1zm3i0v0934hffascshk26zt2oxwzszgtizkmt1nd31dt',
                receiverInterface: 'o3j4p6mg22qy2emtrwz85t4gctsmr8i29mnhfgq2mx5424ilq9n7oleo1kuyrrp44x7ppf6wdrvt70ltcqc9uds1vg4wj3bhssaze6fa7172tett2pyzuamsxo6ah9bipctf7djd4p5wgtz54zzb4dgio00xhol2',
                receiverInterfaceNamespace: 'fvh0yaxqfn68kmpbsovcemkenxmg97zqbifrnozr6un3kw9apho9otgehvcdotlicc57d5clzogc3x9ar6jjfqrmjw22xsga336nb39v7akn7r6q6qb21jo5gxtg08kfrpzvncwbqq85ygybzk76yzv34ospgr61',
                retries: 1909853831,
                size: 6949476642,
                timesFailed: 3185153368,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'z0c37r7n5b1fpvonp5p2i',
                scenario: 'vyrpmvcp773v000k3ms9k3fivq97i6w0rix533y8j0lmjloehybkf9yzehdr',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 04:57:13',
                executionMonitoringStartAt: '2020-07-15 20:42:13',
                executionMonitoringEndAt: '2020-07-15 18:53:20',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'kwss5mtuutp8jn4iqqpi4827iq5v7bkvthvq95jtwgqrcuqp202rokd27btx34w6hh3asxwrw29ev5gudpy9zi1b954wh6jhw11md5fig57y01mt8qp4c1d316l8ard0tkmsgmin94zywgodl3w1kjrrj499cskh',
                flowComponent: 'shm3fdk3ndbh0vi5fd7pjqpmz6mxq0hysgzaqjmfvnyhvgr0ni1pefpsc30r5jqnbvka7zsg9s3kkiry0wjz62487ez11x7icb7wvmmqm3ojcp9b9rdr66kf4i4t9774ayzmahz1jztsf3o2iqt6j56wfjtcd84z',
                flowInterfaceName: 'm7tqvs5ivy50iiu3l3z4nin4cd6v5jznyvpx77nt9mnw876mvp9ttjlbanbhy0caqp001dl7sydeubvyknf9xpqmqmylp7vrjplu4x63qway6gxh7n6yjpnlpgttvyu89jjwejh3yodghhyfs11v09up5a1d5ojs',
                flowInterfaceNamespace: 'elea1ek598jr1f3fkskx4l60ja4v6wp6a6pkay5mqcmpxfrn2suk60ikozou0thvmfe5gwjjjsvunhmrph7mvhqnp5epz8ktnkzsib4hk1qg51xwj8vivkkwv9axei2iwj8iiv6crs4qu9gbuce73fbl5qq56dkd',
                status: 'CANCELLED',
                detail: 'Dolore aperiam facilis quia repellendus sit dolor nisi magni. Ut sed blanditiis beatae hic ut pariatur recusandae deserunt. Consequatur et quasi eos libero ratione sint est dignissimos dolorum. At rerum esse quasi autem culpa et. In maiores voluptatem voluptatum. Et esse veniam aut nihil.',
                example: 'grgc0u05hu8c48oh6nb3lhom9ruuf2mv9yg0t1391pbbthj1ntqko10tgmkcvldzxdirkg1kccfk6ubymftnizbts9f2gy86174fpququwuiqjl2twnppl0fmsh1zcxebeppsih50q9rjwxsb8hto91schcy4owv',
                startTimeAt: '2020-07-15 17:13:32',
                direction: 'jnxs7e4rwmas3rcbs3mj',
                errorCategory: 'qbow337byn1rs5go0pbu4dx823sach4zjovbhu2ov2nienygq1d3tjgm3anfgm17lwktoktpeki3uhr2e828tf8mzli96s6nht83gsuyrcy6iv2zg3itlssgvl8zti7rh5son3wkrmmkpa64hba2ynpazca3mypm',
                errorCode: 'dazwgri7d2n870xwx3yh',
                errorLabel: 'g0e4d1a8l95hrywg6o4w628ec310hysgitilyv8bb8d3w55lfnziwwtbcryoayk63efxr1d7hqtbu5zf2c7nxlsz1swpzsj94rd6vjpkuovr6bzj2kbfnxxzulhzey5a4gqw0c79cak1sjft12nyst4tlb1g1pa2',
                node: 6037122241,
                protocol: 'bb03jlp6u8eeb9otbdck',
                qualityOfService: 'uieemywrmyu8i06jgogj',
                receiverParty: 'jzprbejd0fbczink9101xonfgr0q27yn2vm0cj1ujqn0ldwdgludkfzo9zam5h2rhqee2jq82du192xqkrgym75w0yuac5yzonx03bhl60bukexl7hr8idglb2g57u407zeia3h2q7u74woatyz2lkfmeof24skk',
                receiverComponent: 'rxxpp5v48o18n83mjlcl71xv4gzwpcebi9nrizb3ut0nxhgniyw07imnbaprhbgakxs4nqnfamsp1bstxmeoz8spa1vajipn8difm07otvimwsz8ej8li3di81oo0orl1y2sa1gqk2xwdgthmjl2j8eqb16esuba',
                receiverInterface: '3aubbyn278wnnf3ggacdtig09i36ep4yfhj01xb3re3damwwlxh8ib6eu7txgd4wnvst26hy2s1x1ossfb3kvl3usvad3vu9qr02idx2j538ao4w0nsmkmr86j58e8ldn4jwkfbk0q9te9q00xt42rhs89593m7c',
                receiverInterfaceNamespace: 'dsdiggjlwis6mt7u31l723wdk55tzfnoejw1b9uib8vx49ghz8gw1s9g6x7bpzv940rcqe2s5tifsx4yhjze9eby0x05z76wbpfzn688q55ta7l80m0dkzyvlvzmpsugmmngcjvsqrva9jk651sg9npvvkfyji9w',
                retries: 7980585021,
                size: 3047264108,
                timesFailed: 3712433963,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'fu02w5ey807db52ro522',
                scenario: 't8aaer9f7yxts1f9br3am84mesbmvb9cbjvs0pj974oo9n8l4g7vibkv84b5d',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 11:38:32',
                executionMonitoringStartAt: '2020-07-15 21:04:27',
                executionMonitoringEndAt: '2020-07-15 22:05:53',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'xxf45z3qzt265rb83jcxzvwt2pmli665iotmk3orcqxl1uirwstyk2amy0iif7kdkximt22qo79knoevcpnehyzeh5sz07838uf62fzz78uu8vg5hvcch88diidod4p012adssx8gefumvr0jprf7ciluvhf42er',
                flowComponent: 'k0frrjdtmpwhh8x7h11hog2f3j641v8zrd3lm7fe5ku8zu0ao7csy21lfzyojyv4rnetq488b1hhnts71wwhvpwmqnwmccjqzlee57sbd4lejohrievo2ivs0fh8y4dibeeukdluk5nyis43g4shpzm3o8818ph8',
                flowInterfaceName: '4dkkhflmvd7p4jzjslzy7bzh8btag2dje0fs8qzin7mlhrbuwwfxeivdzovogvso7qsoiimqrp9s6azwxu97049cdsosmsoiu4eswkfuffud3zr8ktayzuajg7psih8trzl4bcaqy77eltij1rzhsii960542lzc',
                flowInterfaceNamespace: '9lzn5u2ib0in0d0q9z5lnv4utl9jterihwnuu6ox9xnd1j250bkg48fnna3nb6r4v3t4nz4cl37r7wqc8wco6pqiu4vlqytvy5qe6119fuk4xhvuf8uav0t3s2pe2m7n9iev52aotzid6kbt0k13j2ifi2khc85w',
                status: 'SUCCESS',
                detail: 'Deleniti itaque atque amet mollitia autem. Doloremque culpa tempora quod nisi eligendi error earum facilis. Et similique aut deserunt. Iusto id consequuntur et eius. Eum rerum ut cupiditate ab sed quis et ut. Repellendus harum ducimus neque ut.',
                example: 'ja7knrp8z5z19ewzse6avo02qnj0yk6oioszdu74x712aiqf86gzoxp8f1rsjt72nm3erjgp1hkllgbyo0sg6sc855ox9tfa2wwhif2fbvy4iftlbrn9tm8q6jbjhxt71fd7bnai1vp6bibx4p190glsh74uvkbs',
                startTimeAt: '2020-07-15 02:20:51',
                direction: 'jluflx7sgsl9euwcvgoz',
                errorCategory: 'fg8u0sbxqdev8240ao90n3z04scrdjlsqg8zu6um4pmrdn2yhhqm2luwwi3ljbtle4434h3wfbo2b8yy12mzqojfytik3yjqy0mfvkpt6ulimbbs5bsl2hsr1hgg8q913gnzrmhc8p3eogqavijthg38y28irub3',
                errorCode: 'qjkv4trom3dplggesmt9',
                errorLabel: 'e4mlhrp4rh3wb9u7sfysv1h4q3o8m8qykyrnjmww62zyh7acett3tegfwzx9qfsbpacglx33lxw6z7jakbetnd5ptowin5fq9p59p4xdx3c96e6h2xtoldxyma9r1ax6kzzrj9zn3hm2yu5i04cic8xqipdl3cm9',
                node: 9490587492,
                protocol: 'd29bexfqm8ntkqnu9elg',
                qualityOfService: 'uyawdtg5x800554aievd',
                receiverParty: 'zvwnej3bzrq4h1zel7up28f2qlx7zyvuqopi77g6472c0buz55pnpfvo0d8u6gxgktvk8wvfety2i58elq2nhn408klk16d1vw012htakdcajp3y3ebjuq56lof2bfnkf14cjga7mx07a8l5oaxxd95n0hbu4nf9',
                receiverComponent: '3svh08kq4s7pchpasm28mwmhjz6enc5rwpotshntczohufcg69hrvahbj3v4afsctwtjifmige2pea66m16azzahhnbl1soxd50hfm194bfum5wxndprdtsx1lwbb9dn5cvjzzgtnoloar6k7kez2jzgknqjv26g',
                receiverInterface: 'oo9eyrsalbnzezzt7m7r8vu2stfp2mq10618j95d8ztho9p40n9dqck6hkf02k1q29ixizxqsbsxfn3uky9n6fym3l7a1huse7be3szpfaop85m7fuvmmiuavdns41epnjshf70y05h56qdcr4dwhyvi7q0ap77z',
                receiverInterfaceNamespace: 'rfbjx2y0oxr1asacxxoqzhfgzg75bsi37r40yaumi28xfjqpre1ectyzzrwefn005oww6i98dsob5556l3siu9ll8ipdm7d60abwexchotc63infc10xlkisur5s8rpnngev9tjoiixainknogrp7dkgsi88el6v',
                retries: 2450883190,
                size: 1582820182,
                timesFailed: 8355885170,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'rlsfmvvhrjtwfube5yd6',
                scenario: 'gylhvoxtoj5tzmj8bbqfc2fn9gviyukviq9031zwb1mr1mx8hrsl5j4x048l',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 13:00:16',
                executionMonitoringStartAt: '2020-07-15 16:45:06',
                executionMonitoringEndAt: '2020-07-15 15:14:55',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'w9ml9zk4uklmz7ptqt40j17bl6tdfcornptj2j3hhqv1bp46z3beci6j89gdwvjvirwr3a9etgc0717p9iq7x9bk5z5tdr8kxvp3t3x36ll3i4f67hbo8gajpn0atvnqpx20eucvh326tey7wyw6zrlhc7kkd2ym9',
                flowComponent: '9mdqjkgclq1d9x2f6tokobu0zms0aud3tzm9u69157u2z4zi9warb7eb3mmqiv561lpplmcnifiv6n4v3yd6sl4cdtpk8uw3ezzbf5bgbytwxenvfrmafocz6gwmouqcnzozidudr5rus7r11ftv9qaom5dj1eql',
                flowInterfaceName: 'b3qy592r37xmhpspid10boke2x3cdoqn2nm5d7rz3u8v0ppcxxwddjv5vuv85ctl4pm1x4lvucdbvv2wz236r4lsonbhnssioskusxl5fwkzh6835ipyg303p982xwqhc6i3smeiigmaciic544xggu7z466h84p',
                flowInterfaceNamespace: 'sfslifhbgy0uc1w829fxrz6ttf6x2mmogvqejr26ix68tuv7nkmbg8z68akgdjiatizslsn9fdwilc2b4uipwd78bsewbwl2p5hj23ru52vhhn6u5zqbrx8vyba0xiukkp3thbmi6km3jc4191vrbmveca00tzcx',
                status: 'CANCELLED',
                detail: 'Et omnis unde quisquam consectetur totam. Praesentium ipsum ut necessitatibus minus in at excepturi. Voluptatem voluptatem autem.',
                example: '0n3hnc0im590hj7ilhmbdnx3f85mrafbbxpg2lmw5gjp0h53aaqcfeb2lba4fuashluv05ix6fl20ud4ez32kocovh16kxsox0mleilk3hgcf9eocszvmo3jcd5rq08wcx8loeqn4ge2lxye6u14kioveua63eib',
                startTimeAt: '2020-07-15 18:28:44',
                direction: 'ag13fgldhlr87908jqth',
                errorCategory: 'kkoori7vrbabbh19q2mim354vob14zgehzlft1mklbputsvqvxgvmdonu71foylyuoyfwtz6vmkydvyv3ay06ntlkoy14rae69ku7oco7rw4bnqmr4g4xrsexysxkhsi6io7ew29pgm37z4kpp8qvhs0vygvgi8o',
                errorCode: 'mqbbq9sx8hcq41ulfyb5',
                errorLabel: 'cnneeyqnp2mp2pkk8o5rlr5jkwpuqg6tt9iiox9i1uvfv27b4v25w3i91tn4a28fs5ocqdfckelko8wbxw99tzekbu203jlmyrv0h0rbj1r9kybye2i30d95pnkqn0ic2jb52r5jkai19bw5rawsnyahhanjnhri',
                node: 2790966882,
                protocol: '6u67zpre8m8br6qhzm1z',
                qualityOfService: 'ox72bpvriwib2ogjufys',
                receiverParty: 'c710tgt215clckko22u0saargd3tdovr9kberz1d24unk6k65l7l3zzykw574ver2dku126hk0b1wab0vnq5y5f2fg3i1s1jj3mrhx75ix95b36lll0won671kgm0914i7xli5zm1xsd6eqi5usy2iq49pm4tukt',
                receiverComponent: 'xe4pqf329ju9ywbhyhf09w30wew1aj0qe4tw6ai604f8v9sckmou85y94ozi7k2mlcuwyqgeuta45aozzfw7ke2vllewchhasbr7rajoeygirofz7n9x39jz3doumejc1xi7qgi9fl7guvpybepbpop8ehdt5qmt',
                receiverInterface: 'js6v26dzqixvtp3dy0gc2hmmig6dud2i76a3hz6u6sdwjcsow8vw1doopn86wdjfkr2pctu4l3nwg05btunnzlqu6wrim2r3y5inytvp7uyp6j5o8u5znmvm909vn8imximjpfbj0qpmp5t5uqstcu71em0yxyi2',
                receiverInterfaceNamespace: 'jx7wehsxo3gxihob7cz6j06985qzrbkl4osxdftz6yigsfip6nng7cd1va0pb17y702wfal28nr08d1i6sftf1gt35kuk3nxskfr68rvtxg3knuqguyxuw0jfmhbiozw14sbe9n9t5aiho5e4kwgc4yw92iwu0zw',
                retries: 5103998208,
                size: 3327761549,
                timesFailed: 7142046851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '5fskfm6nsch6gut3ovqk',
                scenario: 'skn2uxvfyrmcy2rb03bkv7e4tylhhnk2kthr2qvmf9s9pokxbp6xjfyv7uzz',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:39:36',
                executionMonitoringStartAt: '2020-07-15 03:07:15',
                executionMonitoringEndAt: '2020-07-15 07:13:11',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'iw56bozz1us23efnas3trpjyltsgyik0zmd8ykkaek0zcemml4vyqrmdc9ap944c3qoj1iy6oizn0iuz9l1k6soewqavp502di8erfa3pup5cmrpum9tia4jofb9listnbnnn7obpkyvv7rb69fge2qyncnca9ud',
                flowComponent: '2brkmjkl6pjgoynp1ok8cxy1651fx29w07ab164kwt4jpc5klm9mvoywedh9lb0n61zvto3hpp0tkvcamtpa0nw7zb0idxg0dicmulcvzoo7c58zuvhd3iq0gd8nq4hp5cuav0otcrz979u2ke4mvc2ziefnqyybz',
                flowInterfaceName: 'y4r5pm41rcslk1cdyhwtnnxfbhyvq1guukii7h4c1vycb2kjdmlt0oom36d530u7yfiuouk7v6vo7fsv0f9pprcd8bx7v2d3cbzisacdq0eohoggudl2j8mv1cxi8n0kptznlrtafa0yp519gdzdrke5xy0l33nu',
                flowInterfaceNamespace: 'doatv3wlculndn1fvcqi3gndwljf6jgi2amvsouvfiyh7q438b8lx6qfbviveom30ara6ybrzw4p3dsa0ldqehxqizm6n1hfs228xi1fcgaop5b2m47x62cw3ctbi0512i8lvyle1p5y1w7udvb5ddowz2ei840d',
                status: 'WAITING',
                detail: 'Velit cumque eum. Sint saepe et voluptas quia. Qui sunt et.',
                example: '3h6rupz1zeyi5kl7uv12x2nfx7aokmp95c0hnrc7ek3dmv419fm4ehef9l07bkawh9a72ell0nhuxc4mdwnymghdde6np6r7jxboo3wgs9bwr7luhgelax3kc3s5thizxhsow8232hwmjp3642vmyt0b0r1llud6',
                startTimeAt: '2020-07-15 13:19:25',
                direction: 'nyrqtt840tnkw5j16r3r',
                errorCategory: 'tdnk81d5zhqayjj18xum0cs920cs7pzilt5q7srriu3jxj1iqlnbou3j69f30s96an6ltndqjulxo8q3pky0ba7mvt4bezcdgmoeraj3cwekzyhvdw2xcfwk72v6vn2flvfbcn9fgwegi7piawsb6bxux5mpvf31',
                errorCode: 'mnycwx6k7igankt2v36w',
                errorLabel: 'f0quo954pjojq8ekyysjywwjlgc99a4zih10ydfqejglv4ub2drtwxjprzxfw0g5tqzlana1jir04yxlbup8m4d36sf4q0idp3yxfvdbf7rbdgmfuc3zzzntococ0cuoinl63x3759o7ra2ji2bxm6tnt8azbwde',
                node: 6162370250,
                protocol: 't4zct44294zc0f3xn7np',
                qualityOfService: 'w0fka8f0qjzfrn577no9',
                receiverParty: 'srsi6myvc56at3ap5xrlll67uxws5jnmg307ecnlh9spdne8wp4s4ebdzdcvc887ehhijda9m8gti8pjwg88cvy4f8oots31dz8vw81ywy99l8n4jt1ne22tjn2kiibtyudwpmsw2ewbx91xiyi44s2zng0pjuin',
                receiverComponent: 'clmf18mkiw9zphhsvyym45ig6wt32ip8cj33ykpclivi1zcep39527ii5bbmttfk23ymj1lojgvr5cdyeksg3gwdvi7zawuin1qrnol0wlrbsh272qjs4gxthxh14iscsbhri6siljlfemvim1lrv847z21tm4ow',
                receiverInterface: '8na70xrz54zgk08a5ky7u2pvvqzrua1oyh2g2otp4lntwfom3zq9qfowwvrr194su1nysfogn772eo1bbfjkhd37cfj1qdq2ky6hq0ee65hwva6g8uhxafet6f8uoxgdf4iq796zn46hwa8c1ke2twrqscb778o3',
                receiverInterfaceNamespace: '4qcsus6jffa9xiv21zuqtoqillpbri55urhk1qq925sosk2m1kdhv0byu3d1v39vout4qwvm0h0hteh3rs27lc2sly8av71tkkv5ev1ih1u4bdnqq55joa8ge718l6oepv5iihqn1am44v2f0pv4t8t385qj14qb',
                retries: 3422490821,
                size: 6062841471,
                timesFailed: 9039538704,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'rwaqeopt1mb6cw8pj7dp',
                scenario: 'i8ddvjpwxg9p9wf9h723vqhl3tyex4yz8w6bsflb0zw1guo289ugvz5wnqqj',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:21:11',
                executionMonitoringStartAt: '2020-07-15 18:02:51',
                executionMonitoringEndAt: '2020-07-16 01:03:35',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '4223ojchte4d8ms22cd1t5svd8tcvu1hnwxafvujrse81abgkcaqu3l3no4onyws2y96n0eeiscufswt43p4v2f6caolcskrcwah26uasux9udx51lrxht4vwsp1psb7u4e6howigg37w323y5fkitogs1kgdolb',
                flowComponent: 'lt8cx67pe2c6nuw36x233voda49mpq3z4n0r9old4h48yubccj2ehfdum55g88usosxuvk5w834d16ao3g2wm2fwv90bpgo2qu5iya7mbar2j0j0bdj7s8441sh01dlnzjo8ujqkc4uudgqiuowmln8is81sy0v5',
                flowInterfaceName: 'xpd48527git8b8g583v6f3i2y7f0ncbi5lqd7zcrvcob1r0d5y3ek7kpa1h9pn0g3kbqiu63orbmf446i5fglsxhug7rxecfqa6spcdpt72aux7c7ioo2k82ng1ex2j571v96wmg5q76ryz48rk8ojo0w5xsye1oe',
                flowInterfaceNamespace: 'ee5g76v1lqztu79j71udbf7bbxyfg3fbykryiz954r9cbd5nsiv48bo82d2uv4sf3pnk64a7huf8jloojkmrmkdlm4r2ibhngvpyxl7y5kdqdzgexi67j35o11xun62ga5l5m1m4t5mrd68ipmghpg41noiezae6',
                status: 'CANCELLED',
                detail: 'Vero ea sequi cupiditate eos. Omnis sint aut. Impedit sed vel ullam cum.',
                example: 'ke71v9y9qbw2p8hmvy8g2n6ll8od3y9baa6xtpjbkx0fhek3hnp5wotb6ffl51pp8px5y5a6dx19sehyaul07qbanolh4qkmho86en9zfyi5m7fde6jldp4c8wkthwbpzv5icx1qi0bwnp7tix6t4mibvphczif2',
                startTimeAt: '2020-07-15 02:41:55',
                direction: 'nj0xk0ivqhfw9xy3pi2t',
                errorCategory: 'iqi5oz6koqoy5efoyo3xegjyb3jm5o5c3dp0d51ny0aeo3lzpbnrexxoic9q0zmt9vuf1ufd1foe7yidbfey8o25yhsxvx5dzh5l2rhqzmwp2b6y5p83g3h8d93fwpu5icl3lj2i1i9pmqm5btqf6omgaymoj0no',
                errorCode: '86y07dsbafnrfehqpgcr',
                errorLabel: 'j1b2noand35gd89gu82gr7dc3lmb889ho5n0uqflpq6qmr5xuu4600hrgb5za1so3z6u2srb8j7cwe350gcde2e4iveggw3ufek5c9xabbsvbs2ank1stfea9cp6kf35zf6grtavsqk99yaqyubx5jdov0fsdrlr',
                node: 2348434342,
                protocol: '8sb8g80hxm3ileshbi9s',
                qualityOfService: '9myi9katz34d9j0ydcm4',
                receiverParty: 'sirkorv811lano1b3xswovzitgyh79web5pwm4wb7buryfydgszv80qk8h1htmsf3ndofdaexjcsohu6m16diezih7bstopnl1nt91x288bos52stqqkkwbarp2spanu7bifgc1rmyra309l786f2y8yjv9m1l5n',
                receiverComponent: 'ybazltwyzb833bsmajdpcc8esn1lqbx267pn0zujvv7f9s0uqean1nxr7p3qvm4rj9zjl84r1nk4d3fn0donpa90ss4cbpvv8kdr8rfik8qxy5fvya9aedeuhnwn6imtbk0r6xn9v6rg6e5eeyt58unpsl35ai1t',
                receiverInterface: '7pzv1b46085nfyego1otwpvv1fr5hwt2n4v4v2a94u9sddscmhv0t7ryff5b5wr0wdv5nux770l3zes7lwmulb98aiv3h88vop0t4huvk8kqktqruc66bckdd7q77d0m9fsxaeg4yqcpcqjo73gsryz37lnky4sh',
                receiverInterfaceNamespace: '4li517zjo1ly3m08vi99htkt6ddwisk9hdd5rqecu8wa6mayt1cn6tecmguzv3f7sxe27dm6v3znyjiacglxfuvlma529sjl3a0af47hqmvy4q3j9w9fitksgrchrchvzxksyr8uzz9advkk9qivajc02ji2x74v',
                retries: 1080588286,
                size: 8389805514,
                timesFailed: 7489153467,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 's6hao8vnu5wtgdku418r',
                scenario: 'lbsxovvkrtkuamffoolex1jmrsg9bw6qey2n7ioc7cwc9boy96j8xrhqly90',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:19:09',
                executionMonitoringStartAt: '2020-07-15 14:24:37',
                executionMonitoringEndAt: '2020-07-15 13:07:34',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'je076d917x6rbw0e6hn3w7zdokw83sxvmhkrezpoa6k3jltf0kce5bsn254gww3mtt2p6d19ox0i07k8t097m6l3f4yvmqo8b94m6wmpl96guqkbwe0abjd1lw5uiqkj4v8bsxtj6kl6jd7r8bew6s9hf3q90qc2',
                flowComponent: 'c27jh2k2ocwtbhlpa2askydk8e7f7u4rjf1ph1cv36pz93zvvwmtxb5nxqwzfdnwvg8qr26prsmt6fclmv15xoem91nxgiq5anpgb4ob2lc9mzahzb4ocxkj2luqsk5e387iv7ezqiv881lbhy58gagy98mxnzc7',
                flowInterfaceName: 'qbhgqebysov2koyooiir7fapede2tmqxxb9zh7q2yyuw5miqop6yvd3h2yedgtmzvwknhwx93gopzpbf5v89byifhpdynr4a70vsa819dw642116i1i0hoju9o6xti4lx6zxvtrjy5xh7ff6jtv3e5ftsynep0ab',
                flowInterfaceNamespace: '96ye7pv6xlaifj8lhkpwno2c0v2y3709guzjc209xrikoo49vdi1hpu6td9x1vof7ag7iwzb6pz4jtqqou36ag917ppahd9fmyhn2ht13oglmky40ebly0puv05oknelg5arq4hyr0dhfjwn13b4finer1oxmgtsi',
                status: 'TO_BE_DELIVERED',
                detail: 'Consequuntur expedita voluptas voluptatum et enim quis fuga at architecto. Et aut repellat fuga doloribus veritatis corporis ad quis fugiat. Ut reprehenderit suscipit aperiam delectus sunt inventore a minima. Asperiores quasi reiciendis nam quia consequatur voluptas saepe.',
                example: '1moq7fimvhbg58ee2wjo96v1yqh0d397tahf1zc1q3f7y4h9l8n2xggwaaixlwxbqo09yxw744anacj79rcdfm3or9gbpmh7iorzno62g5zfyyrf0gmvr51dxqcld20vz7l7kk56jjkwvivuwxn2qsdz4j484u6p',
                startTimeAt: '2020-07-16 00:30:22',
                direction: 'sanxtw4vn7j8jw85ic34',
                errorCategory: '916uzr7uvvwijsyvk2uz5tspu3y5hngqi8nz7epz0e5b2ua963mz0ery9nvyey25dzp4pf6ko0gpmoekawohb98w8irrpgx8evbe6vwzquttxxo35emi0jnn0c0wucypsjvcfi7kfmv2zyu4iwvq44uftnblf0h6',
                errorCode: 'dzf6ik82sn08a1d6af5r',
                errorLabel: 'aqt59w4fd6xd9ck9oid3o4t1fv03jcspomrv0iec1gnxbno57o92iwv4135tznnksi4jz55g824gmwet30maecd7uiauuzp6vwwcujbb1wol14mdmp31g2e2tlyue2fikephvdfli5n30z2r21lxka6f4c7ngich',
                node: 9767194027,
                protocol: 'h3z6uxfudvup0ojf842e',
                qualityOfService: 'g1yfo9s7y6l2sqfigrgf',
                receiverParty: 'zr231v500zgcqqcshol172vrvo2khhvl6lvh0wzr9rgkm4puhhd6p7cbimakfqx6jh3ge3q6t1qbjmda52fzmr3hj2x3hhrbd9sakgt4vm39hyij09s0l0jxunut2snhiwgl6ymhut975388o1otmy8hw8chov28',
                receiverComponent: 'z15i8jp5fdg9qx94tad2bgaodv05vr53tvwhjciwcek8cdjsdqluinighmjttzjna4vvq116kmwh7d3o2pdkurfr04rkh9pugfhk5nsz4h5e4464d1p28m9zhq9wrnjkohfgvwx6ndvex1qevsfx8pk32j324fag',
                receiverInterface: '3w5l5erdlyyd76jozyur6zgrlygrzxaub9f6ps4dhgz9j2dydaqrunxpa0lxffzn7no0chjugb9fmaolrenlgtujiooksws7ea2fgd7e40yq6v04ep2e1ppubrq8eejzvpumbjp27veduyk5ogf3y6c5a195k1a3',
                receiverInterfaceNamespace: 'mj0z8tcqtfct5zrudb0jd1947q9ecgwf27e6k20vcbavbdaahasqruzow6zxxl8zqb9lhz98gd5wcxz4cxvwnvbcr3913ts2eih12iqe9x0enyzk1qkoitgtpgifiqjpw4l7m4zich4d2f6qjtut3hge0pekk3s3',
                retries: 8204876383,
                size: 7589524033,
                timesFailed: 1413912579,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '40ojcxc0jbnxol8d2k85',
                scenario: 'nexgcuzlcaecpcmohxb0kxh368f0k85shjg9rjdbu507uj7gjy81ih1bi4u0',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:19:56',
                executionMonitoringStartAt: '2020-07-15 11:14:29',
                executionMonitoringEndAt: '2020-07-15 19:59:31',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'l64pskh54b5j7dym80808h3s9kau024hng8hgio3zdnbyuenuq594bxqzd2e6q3en76bimx02cyo553wrjrn6eb67zujrnjlvtajnnpau9dbp8yfgzzjvx6t5yap23lux0pks5xjh15jk5fyec5qesagd8lkdnnd',
                flowComponent: 'dmqrtp8npohtov7jumfqh9w0ylme6x71vculsg4jt5fkfvebbdyvh3wr0hwje9498cw46ml5dp7ucd2fd32b36oby4dp7bmtjqmtm9d6ahmhqgp2r1qu3c8c5uk5tnau5mse5ej3h7bphx6chht1sj9tmxiksxc3',
                flowInterfaceName: '5q9mpbkl7yf036sykhtrxf7w4f5mm8w5xepw4yj0f4yt6qdzfyta0rygmj87w42587sd17xcebsqi4lgy6jg1fg6ky89syidyp8pswbnfm8mj9ublnh5p9yuenzwc429srqcc13iogs2mgss8e4ajdb0o6zoi4s7',
                flowInterfaceNamespace: '1bk9blbdzbl4f1xv1nfcbltxro07gb64s09bppx6bbb1fwknwirfpatgk7g0kz9qed2tpn52u2yhoqadyo282m5ba49pmd73364ehy5wbuflhz8azm8u0rh6vzh34noc11tt21b5ur9hupzv3ty275t9d3i6xs2p',
                status: 'WAITING',
                detail: 'Non voluptas provident mollitia eligendi nesciunt eum qui ut perferendis. Ex veritatis quis sit fugiat. Ducimus amet aut iure totam eveniet. Aut consequatur facilis qui quos possimus laborum saepe quasi. Delectus suscipit et quia sit et minus tempora quo repellat.',
                example: '9joc6v7kubihuqvndjg653siogddjmfa5fg2yeby06oyqevjf9noony5vmu7zvcfb2djfzl7p7njkpsy4ol0auqo1vrrm8huo8097q89j1igcbuoqrt2u0981sgjlr8oket0xl84a847bw9inplozus4lc59q7kg2',
                startTimeAt: '2020-07-15 20:31:17',
                direction: 'iunejlwe691d15rqxa35',
                errorCategory: '3bbrhx0a6u9lt6iv1n6ujto1gwedhcx10dq06asvrh464dnzgc4bnnku9iy3xt9gecdywz5lhtf5eum2sturnklyuhpeybglgmdbev4r66v69um6y56l3zd1q9rvak037nyaaap1oj1why5m8k5ch3va55mijamk',
                errorCode: 'i0d8wm4644z7i0lynwtk',
                errorLabel: 'ukmdc96abbjh4ov9s61tznj6qd80n4fqj6ezix4ajz222rqzfdynztrrne9o8hz4iyuhyytms2e427hrxqwvplnw3mrixt94gkbgufxcubrttvhcmx7dx8ktnaxgh7gt8dqyhsjj5in09px3ud07w98rw5alxa5z',
                node: 8157439330,
                protocol: 'hxhyfezeovqma8uerpur',
                qualityOfService: '56lixj5k4ggxxz89rtq0',
                receiverParty: '0avxprhkuh2wdjykg1nna1c6ob4njllqsircq5awahtjnu1qspqcztqbgt9dyw1ik6o7fvncbrbzgsf59fqmw19mz3htdtjwwbi2bdo69p2bp3kmr9hlc6bpd9jlyzbzt5jk6mvap306tx0v1fzmo9mi786iyzc2',
                receiverComponent: 'nq34j0uctrlujae0g6plqyjf96gbsowf7saqhalcgel7hnvk8vwadibyinhziydhx0s07vtilfa7daimza1z365qzsy33m73u11lnbzempvn9yeedadxfdgta33rlikavd9ndbtjmkb9gcwmz2h2ng69dsl7rvpr',
                receiverInterface: 'zzrws462oaetnmcamcnnujtj0wu6ja4gkeft882loly5g3r7mcikhrrbozp5xn6wlsw16uhblqbxtwnv46hfboift9zkiy1mnbmstqqu62724id0lsp6gstzywbboh1n53xmn1qrrx6ukihs7xwhbjggicy4n3gi',
                receiverInterfaceNamespace: '8jmtwsylr3vlo5xw2bsiorca7sjrpjnb02oyuj429onsuh63nbs63ici4611fsrp5q08a2jhl3f5kpektv3rcbhdtbg3ys0y16wbioyncc90cuxkvcrojcfogpapxuyx4xj2djs549sll78h9e5rsfzoudb9u1m4',
                retries: 5227259835,
                size: 3175452351,
                timesFailed: 2066821124,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '4ju5v3lg9ah5wef17uun',
                scenario: 'r4wjdsyztmnt7fk9ks6rtdteasjzzczrdekooc5x0fq17jsppk83evsx6fbz',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:19:42',
                executionMonitoringStartAt: '2020-07-15 08:01:15',
                executionMonitoringEndAt: '2020-07-15 04:27:14',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'g4sdqavgl755suolujlur0kjv8bxspxy7gue915symyx163ibawbftk2xypt0icdkabs3ejea9w6wy1udz6avcfkqhwgqiuelqf5t52owkkcpthqfwv6q0zd84xl4wj92dl4c544d497i3xa4w3q8bbj6j3u40av',
                flowComponent: '0ih155ifzllqcoiyin7zkxpcs3jezkwzzm80w7cgi01cblu90xfsf45g6j4pcuxsqm588pb74285d49d0ntrdi4l8vj3whzdgz4wxe3nc2s5oj8n1xe1iq65es6aq6dtt00qbi95hh20fk07mgphw2w5muqt3qqo',
                flowInterfaceName: 'zz1m0jk1tve5l3y46gbc61fqq358tqwf6z7dzulg9evciceuj7tdkgqgcznpszfczwgk49jfke60agb11zhhewxg86kpndkl19j20w1h6az4nof01kdutyfn1soojrf8ie6ingr94zwdbuydcevgyiyor8t111n8',
                flowInterfaceNamespace: '09ply0bufqwq229vijzg0herv7ecq4jowpoizggsvl3k1x6kkhxmrrd38gd3kdokvkjtzakwrsoy0jkr0vvy3tirlgf5sq4yrf4fz9g20rh9xwf1uk81vsij94cs4zcuad0k237l6v96bmpu5q14nftdnajn88rf',
                status: 'WAITING',
                detail: 'Aut neque qui autem. Est numquam aut. Necessitatibus aut itaque.',
                example: '5caxn4joson4mpen3u8z91yj0se1mhu2gz3abg8uiqko2548ewj8nzolc87877idyks38jdivi71b5aefugp0x2p4uoqgmfv7jccjpid885pex23x1otkhejyoagbpbrd62b926qy0sxh8qljfoaw6tfsp1e0v8w',
                startTimeAt: '2020-07-15 13:09:54',
                direction: '7vbeznfrvml0zz4avz001',
                errorCategory: 'z1ezsyozynsmpvx7vdwtprsoal9ytd24kzawlv4rkwbtzknuupek51ylzh79waz50zeky3bnobxi17e72xmk37lhzpa481u0417g2uo6u94tzznx1lwfexxwr75l69t1qere8m0xgsspfba5g6xetad621id19pj',
                errorCode: 'l81wgz1n6vodzc7hj2h6',
                errorLabel: '9pcjxxh9zcyhiyq8dnxjj0bgidljrlmx7a4044o4fjzoqr7rrib724thsanzcl2imsq2lvf253v9615vr9tfhsbo11xwut0s162vak7ov0ir05hir8ibugiy4ah3pwad39e9736rgio0h4hopqfn0rya2mdpef70',
                node: 6807526474,
                protocol: 'uydfs6czrd7oje5iii2i',
                qualityOfService: 'a5rskh7q4739lyplz4ur',
                receiverParty: 'c8rtdt4b2ab7ii4f1fhc9jvl90yt65i3woktaqi11wrp0lazqjbhva5h1g9w0js8a7c558wetuc9wt3ywaku07le417wg76knz8z4bdfshj4813psbaum1w7crf8hpsb51cvf2swazokhi4wndzpqlremwx63z9z',
                receiverComponent: 'in2nqdrgu1oj4jxdpk01zjfghxh80yjvxjtniu2jrldls7zgacagjuaqp65vinlr1wkw7b8rqs3wz0puqg3xfv3ero1jx8h5b9cv6lt5uzl8u0c7wbv2cv071oq4l75syghtnrs2hsl8ninoi3o84n8yk3p58878',
                receiverInterface: '5xlmkn9f3rclpwmfo0fvkxnpqpurm34ina2x80xvmra1aulhdvi1pw7mtxx88tz05k4i8cm1smke3u4r0oquz3bpcdyjbg6kkk7qgbduvb3uvx3pfupfrjqdkqzj58nibzszczjhe9r0lwmwutu0q1pucith6gaf',
                receiverInterfaceNamespace: 'kd4369w56lewg7erlrixwat3j3fny7pypxviad473ed4caltyz8um0b3vkobngj6gimpn4r869ob1l001stf0ckakpijajlvyp486i272bhtlbg4xg6nsbxigejzfx9s35ov4pfl8vuzt6j7cuzu0gmhsfp5vdg2',
                retries: 3267601971,
                size: 4448021026,
                timesFailed: 2132284890,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'qwpjmcwwve3ffn76rarf',
                scenario: 'suqrl5533k93u7l440s9c90n96l681tnmwsxs0x7f9llm95yqqgzoeqapfdt',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 06:54:33',
                executionMonitoringStartAt: '2020-07-15 23:11:48',
                executionMonitoringEndAt: '2020-07-15 20:08:28',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'opo4w7k8hjr4dbbdupgzklzo4co5mhiz862qulv82568qdfqxnjiex1gyzcwde8jmbzhvjfn4aqoj01pqpumooyx2sgke8gb6rvsgefitvgsdbv1jtizsc7owsocixtwnazcsqz6x8js501pyibqfqh2tnoowmgm',
                flowComponent: 'r6g21iwi1bh0hjut41jv9cv6pc1gcj632q66bsn70qbjvhzmw94y02qgpgz3wqsk2ja5lmuhnr3gj2p0izzpt1btijp32nmkpsmxefdp7f91ao9prozbshmxmzc3u3p6nv3p9jb7isxwskmde9ko5fubnzs0wagv',
                flowInterfaceName: '0v8c8is8lc2fib6uksu83i352xjxwyfe5ykgqw0rc9w4isya4mb3opej66qr66gfikdf9j5x01vehdmop03jydtyhpcusltuo9zydi8dqru51na6uraxsh89xwiywudty7i8c4es4p0wcopre34elvrbad8w1svf',
                flowInterfaceNamespace: 'w77h7ic8wqbnnh57ihkxj8tpk5binwue1m1xckgo5ekqg0drbcf4ndvrkonrsxbdkbkk2tbna9yg7yr4rnnwb47nnof9i2n6ufcetsct1lhcuwkrqa2hcqjjfqirxw52f94qy4iccnwongzljfrm1e224xbnt77m',
                status: 'WAITING',
                detail: 'Blanditiis autem explicabo voluptates magnam quos nulla. Reiciendis dolor vitae. Et voluptatum ad.',
                example: 'r0gwm7ojc9zn0xy8gndn2i3yn7ez0i1yli16colsm7trzcpm399moal4uy6vp7023fbe6axbujzd8mqg0hwq9ume2qhqdk2aou8q61c892q7oj1ghzbgu3gu3qdbnfcjhrf3utik9d6iwpfjap9fbu2pakjspt4u',
                startTimeAt: '2020-07-16 00:55:02',
                direction: '65q63atjldbvh1h6hqxz',
                errorCategory: 'c8zgunbow1pvyyzz0n44saidxcoqxkoif8ws25i3lxtlnka9rrtxm9gxokw0t6vjq3p94fy9wauy44ccwa20ujxh4lxmyzdncwrjmjx5suo9v4n7syma67dxfk6k2jb6ys73aj54wmukrhy2t3v51t6nrru7r2xh2',
                errorCode: 'p8dhjf2fulnnr0afaqds',
                errorLabel: 'uf1txwfg7q9tf7fg7j2k8zw8ugm54bn8kf0dft3mi2qgrodg3jkhiw3c7thhpokt5mnmpvx3v4185eu4dc3a308ylepra2esaa2vpv9mjkpxuzhguh4r3y4g8166wyt13qy8noy9qfe0dpaufusrvr8p7i51cca0',
                node: 9466690232,
                protocol: 'hnaxmldbfm1g7735xnfe',
                qualityOfService: '5on4q8tmdokdvy0qdb8m',
                receiverParty: 'katbmaljoddexutqff3ii9njo2d7ux1ls42ua8irr2mcp46aod2f9nhfd50muzhnshizgk93uzkcsnicrz0ayfct9712ajrvl8egi17us2azwgr4t2tdnue1wkawuchf37buc8zgnq2g8or117w1vfxus873qcmw',
                receiverComponent: 'df296o5zisd184gwl0hjmfzroxobpsnl1wkvgnjpjkc0tjo29jd8r4q2dwsuq5v9lqs6xjnlzk1lea1gg7o886a8k3erljggby6oysxm4mcrzqrggnlahb5skdoiurue4nfv5j8449wo15xa7kprv7k17hikbss5',
                receiverInterface: 'w8mlzoc5izrzhcju2vt00x32tsqlp1kskddpdwt9pjjjo57zfamypomz6dagwlvcuq9142loegqmus0tc67fsxcmtdm9io4qwk2l6q7cvt5nwmo8qq1l0aoc4qqyef2rmn392tqzc84gk3vtrexlmvjqg8dnfy9r',
                receiverInterfaceNamespace: 'g65tav444jxevs6pxdp385qfjqxhbzxu2pbyzaw4x7rmsy9r2lg0toqjpnzfuys10tla5hyucdup3yw0f96h793ho0u1z953lh3zo1yjg3vjl0s1gdstruoi2mfsx7n5vhc7o5wwdwcegiuyzkaa61mfvm6rm0ng',
                retries: 5679768750,
                size: 2408700859,
                timesFailed: 2032956787,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'z8r60gb7dh6k8q5yau0c',
                scenario: '9r012mzp6zhv56tvg9puwie3m2jfettkcrmqhj500ra6ttma4txoirmylrmj',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:06:20',
                executionMonitoringStartAt: '2020-07-15 18:14:37',
                executionMonitoringEndAt: '2020-07-16 00:40:20',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'trzfbfimva3tiwh60ygb6xgg7vj47isvw08ta20c08aedqjrmq46d83ydk73sfsa56kanio5q6dn8pcrzd5532e1253rsndec1hpuckmatl4ftarmpxtjbju2jdj1t0l62y6fl14kn0uyseciix8m6p549vwuv6x',
                flowComponent: 'mlcjw45fxjow3swaxszb1x6uplfz5q56w1goov1c8oz02qqla3p2c4mgf5pwpaw050lzb6w30rykut180ensg3wy7f4zj3xuucw9eynd9uzy3d45uhg26yjzoepj5sl23cc65ukjlvfeht1ybaj77xlebj0w0227',
                flowInterfaceName: '3ga87vdx9w6x1a4rqv4xoeszxglwqjsl22ivsqrcbv95bmjsilj9b0q6azaq3zsgkh98ptmz0xdbsyrlpr0npbalfrfnzb7jt39pzwq7eudmyhvok6lge8fsm8xi3pkjfuddb301ssfwl0f2cwbdgwzs852qimyh',
                flowInterfaceNamespace: 'n8kqndnmpxgd38fyxav4n58yw5afalm6v2jxbwnyj1xwsj6on1rk8rj653239asq38fmpnj84pdevk9pi8mpt3xayof4wttvqadvivlkbho5y5ft8d32qxcethpsdki3tsrgo85mqwa0lcd0oi64dzikw3e9op90',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut neque officiis voluptatibus nemo velit repudiandae dolores molestiae possimus. Officia et rerum ratione. Quas ducimus officiis id velit totam voluptatum.',
                example: '0m04wpu1mtb116wusdgsyibsdvh4rndgsrcz5fajmd4d1y641ul9nqtpmvneaht6hm89iylomhog25eaab5lbzxc2d5olxseh54c5w7ilr6o81d22ez77pifo8okoyys62inj219fua3g1g7olqdz58nln7im7wz',
                startTimeAt: '2020-07-15 18:29:28',
                direction: 'xcylb631vpozxt3sgknj',
                errorCategory: 'lilhsnes9vx9z12qd4iubjgled3h6ncxtu5dgcuctvxc5gzcesrzcravd1sbu1jlzcf8o9aydz03teuk8kjzzjnvg5jmaseivduhoc0g91i2pxn1kmctxhpa3o36vivm979lzg73c7boewo6vayerp8ht5g79v3z',
                errorCode: 'ob7hj71bx09aojek6k81c',
                errorLabel: 'r98uxt9nd6j9jawymel6d1i4hr484zbt3qgraru7u2fly78n9e7gcd3efnsnezrvjpqyc39zfsi4gvz8qaf3o1eju39xn4bobhkbwg2mo5py1jgcpw53cabkj7uab6womkeza1nue7ydnzgmfhy81bf5605zhrh7',
                node: 4733812177,
                protocol: 'ksiyxbnsrldjbs53uzwv',
                qualityOfService: '5ucf71p30vrhrm0lh4dx',
                receiverParty: 'dor6xxe0b9ahj8qqr6lxe12n2fyu397ax5zbhazleg74ggbjjacz5nevjd1k0fp601qgi1qwt2gddya6v9qt5pjmmqmc0snp43sa59jisdrp4lc0aqb0a17np2wpcmc6nh21i5n09222y6vnr8aznxncvdc157ja',
                receiverComponent: '9ixn73tt2gjeadhgg97lcjmmb3eu2kiwj7s80pnxf3vdmblfq0x2qlns1u5ysp4le3fyeukszlqgrgsfes8gacshj8hum9wz9gysgtk3t7f3bxw67w4bcrwt1u0ggmrxqr8paud7f42iwquszbmypuo7gs2oewvr',
                receiverInterface: 'ldcdpom95jhm3du12d799gpl7e0iio0q0jxqyge22yvexnyjn54g6gxonrijqji2bxgrxmtyn0j8mw7aqmg60smufw1u2qvwqzxxbia06odmgg25bxvswgkfbbwf2ct0ax9q9mbk532gjozvf836ggvhwqm428rs',
                receiverInterfaceNamespace: 'ryesr5ujrwhql8yc0372ynzf6yrj6wglvo5r99pfuj9ktmksbsky32p2uxe66wufs5lmh7pe1njgxaaaf5k18by38laruo6z0zh45kfbxsqtkdtvpl7j08swzpdxfuugs4wt6lh5e98dzgdppyaqo117ja2z7kvc',
                retries: 8981103024,
                size: 8277617629,
                timesFailed: 6982868399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 't3pqfntvr2vqkajq4b3g',
                scenario: 'gh2sdtuc4ajt506e4sfhet6rreeciud4up0a73q3hg5roz0qbhn7sly7obc2',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 04:26:13',
                executionMonitoringStartAt: '2020-07-15 08:39:00',
                executionMonitoringEndAt: '2020-07-15 15:21:53',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ozev6ovk4qz9nvcyrkjyn3mmm0wbdbvqyavk973wn5bh3j4i4564z3jivx328zkmt4g8trhd01idefcfy84o6ibtuoziaxstecru8dephma5i75hp49jaqrs3fhk54mwg4azbmt9xskfs0yqwna4kghuf0rmqtd4',
                flowComponent: 'hf7pg68mm437k002mc26pv5rmmwc5eyyrmw4efxvetsy6kt6qcop692rtl62omv0s118cwc782najus5z9wq9lk0t44b74k7ispe6al6ikmi7489umjl655jjo2yglcp4xvinjg9gstvj8pm256b4p2j748lks39',
                flowInterfaceName: 'tglvx0n48v7rha8i7tiutf5j8uhxvjl5af40k2wt356jgn72bdl7bldjdvwzf9c83tf70l8u5tpdcmoxatelzcf4wylz90nmlzinnb7tfu6ji96lpsq0h61fr9rzr0owc0w4xczh29pdcsj5n34skly73wsw86mf',
                flowInterfaceNamespace: 'uajghgljeiu002ylnsb542lg8s7g4yi0wm26yvegl5c5sfhea849qerfpc194fb7iboerkxj9tbipd6dh6cyw2ic3xo7epnovwfansp3uzfm16nigxqrtmtpb9aav439ggh6a0rxnwa4hou9ztbzq6glyane39h1',
                status: 'HOLDING',
                detail: 'Omnis non nulla vel repellendus incidunt officiis dolores nostrum. Tempore ut et et illum sequi. Ut id nemo dolor. Beatae aut voluptatem provident laboriosam. Soluta et vero qui ut possimus in illo ut et. Eos et blanditiis enim magnam.',
                example: 'h7ro8g9pc3dvidnhtnmnxc00gyv3ir01wt61fw960lv3nmv0nylbuwh7kdws8mxpoetckbij3sovvvuzxbyczjj15k1jux78i06a83qhl5zlf54y9671illblcol59v1c7f86u3clbogqd46hyq3rftlrpr9dzh3',
                startTimeAt: '2020-07-15 13:29:49',
                direction: 'pgv2tn1bdfb3auoqa5ji',
                errorCategory: 'jurp80rp7lsj7c7axh95u3pvg5lk7o5xajrqjca7excclt47ppzquj8i6lxoycvai48wyb1a247v2fpjmzw1q99a9flhf9kmfj1tzhut4kjs6zug3sat02yvl4rsx7v8842k8geaztshlt3cd0dbed3wlpais5lp',
                errorCode: 'rb4x0qc0bq8tmgkh4d0z',
                errorLabel: 'wk9gloi0ht0rnek1q6ykydi4bm2g7tkd8fyv72vnnavyw2zxwfst0co9qjlegqcx6rp3jmn8hqruhdpnrbkr5b5q9ense9qwk5e7om0wfi29d77gjw5qsxx183qwls1yara93use0sdwuw4li89mq8ik6ubgleh5b',
                node: 7513399497,
                protocol: 'jnie5yjgl8cpxi739jd5',
                qualityOfService: 'dtjf32j72ka9h5brcwme',
                receiverParty: 'u0gm5zu2f7oladmu901cmnu2pe3ltmy40ccqzh1s2yscor2571f7comjfc6hta88xi6l91yupvqdvxpk7xdq5i3ev8z41wsuymml401iriacie869bzxy4nsl6vmaa3613n3z5k1diyoc6q54gumca4vhcm3j2ea',
                receiverComponent: '0yacl3390vrr1nu0czzfas9wnrqoiag1budg5p7gpmf2k6577shsgxwga22ogz8jafa6q5pxp9kk6xdl6mm079m1v6p6ibbofbpk5fayo5sk6l669fb6wjwmhwtot4fdrpah1f3bpq1mjm344242bvktslliy2nx',
                receiverInterface: '4fr4fi4dto1fbt45ffpeqjxst6vuyshxbxd4o6h3l7k45ke5hzuhihjf424moj70nly7igzgmlgyo7xiis26f5ai8i2jclabkxacl1yw60aiuulk03bi3jsw0ww1smaqc6l8jicx56v8ryiecxnw7vk1nn7n70ud',
                receiverInterfaceNamespace: 'f4x0bq4wj6nf8ndnooio2315rqrz5853m9p431yneouf6lo3j020rnla0agp1xqmi28d6nxzpi6o0l2nyag4wtb3fl9eqx6vh0fgymgc6yyj8cvtsz2hmrf15cqfao8zwomdj6015h0y00lkjw0ubf3subkqqx4c',
                retries: 4766161887,
                size: 3800107782,
                timesFailed: 8990354063,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'z2abnxu2rgknizj6hnni',
                scenario: 'nvjnd8wbg4w6ji1bsuhm3iknqh1i45q8bhs4zff8kas4vigaeyt0mv1m4ckh',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:47:49',
                executionMonitoringStartAt: '2020-07-15 10:44:39',
                executionMonitoringEndAt: '2020-07-15 03:25:08',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '3btyy3aljk5udssdblaail9p7dtatnpj9u2f61srdxh41tl62s3w97jyp8ts9rlu1gsk3b3ooasaps6s8o9igxbzlcc6g72l6ah9w2cwbdvra8ljdlop6wp28iht3xlkxw1mplueend4o5490n2ozu781dopqeif',
                flowComponent: 'kp89intoxf7v6cxf561toeht6gr8scazxrgoaqxhjxao22vmdrzzhh1f48d04fz6sc952au0ayu4ig59t3nq70o5ezfu4v5q114ilswijfg7ma8pcmzihpbmqw5nhflj6me8ffd0ef7j55wsabwvax2yln2eap3v',
                flowInterfaceName: 'z7o5q75a5cn5qoc8dgijh0hr10a8w2i1l69zwsh5hfqkxj44zobkarjket5pth0qim7h2zdgislx9zbd962sc57h01ndo2h2i1vevpwmnimfa2bm1syb0o6jijvp13shk4v8j73smgjvxu8h239ae6uuesyy40wy',
                flowInterfaceNamespace: 'o5kqhkn6mjsxvh7z518h54nosw8t7dxqkqubu0k7ks6ig9u3hj9gqyajsetn0wyaj41oiwynk7mtc8lchssvfcyzxqa3buv9r0jkwrgi2ltchjerdhrzd045anojdbexrakxbwvy5cqtfcummxsviz1fxkq2qgig',
                status: 'DELIVERING',
                detail: 'Enim id incidunt nulla nihil voluptatem ullam. Asperiores enim officiis debitis deleniti facilis molestiae necessitatibus laborum cum. Eveniet eos et molestiae velit qui ut.',
                example: 'emhnmb84yohtal1ep6dwuwaih4ryy9hgk4eqaadj3fdln99sroyzrokzdp8yun80p9n8sxvfpukdz7r9oj58b7ph6puyby4oa10zlhf88aqcby8t9zory158o9sb1f55jbgpa9daenygg6quue8ozqgrw8wh8o2g',
                startTimeAt: '2020-07-15 21:43:09',
                direction: 'ubp4k5ce0jne6jry5ifn',
                errorCategory: 'tx0gib13372ky5xstlnlaaokx7eldqjs4304rpxt2xwy7f7u7gc4lxv6ffuey9qcz4y6eya8uye4girnrq0nvt0o6lh47sfiayf8dekxoq8acl0odty96nnmfwwug2v400umv1wsltn5lvzim4qsy03t4pchya1t',
                errorCode: '6t160ospz7cs2bmibt9q',
                errorLabel: '7zpssvmbqmpuvzcwn816d1dguyr5phgjs2zd39ae6nngol4l43w4o53nokl4tw10i2a3hxzmw32u2c538qvshwlcb6up8xc1c5j4ep90xaf1btghm451najvj8zkpsgczkaobrbel43iipudeggtg9jk7sz6jb7b',
                node: 14426256747,
                protocol: 'eah3389cj67hdhi024ks',
                qualityOfService: 'wjctax606qf4gpq2cuov',
                receiverParty: '6kg6d6v60n6rgdyq6fx8p9y03rv5gveo5l7y233pf6g4wif0fok7zucv6qddl3f7nta87gagp5ep9b8ze6kbcgj2qbl840znzdlk0uvuiaathw1407qlktkupzugk1gh3aihonjben9kjsvcpea9p2z43hxwgokd',
                receiverComponent: 'i7t40qfq2fz1uznvwo0cf4gbosf5dv7demmotz0x156dz799q4jukjytv1jifcbcsv47eb522txu18rnt12je7ohv20it0okmc7lj8uhc1ihpm418l8pkxj35vkpd9m5tn6xfsex0rrrlimi27kk3a75p0bkwpko',
                receiverInterface: 'qnystfs0diwp16vjy6cax7elndlanhs5qnte253bap0iba4cefdxm5li768q1lrbkdhs0x3yq8i27ucnqeyuwn7449j89dyvwt22iaycjgf58bt1qcdjnss0bdpk78nukafy1oy6k9tmgickszxe07dkihtcrgut',
                receiverInterfaceNamespace: 'ktc0a138pan0aa6x5mroz93ioonqke2yfxe1mz25ah6oe9cxx3lvkjlv04sh5xns1a1vxt70exi45arbn08nkgf78h9ql76k0jwyyzn546gx4aggzictels1csgs0zgwrfbavvopz0ku8snhh04z71obwyliksz4',
                retries: 5145410362,
                size: 6132355353,
                timesFailed: 1967954514,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '6weiltl0b9d6mcti5eqw',
                scenario: 'gcdyvg3u10i8e1w1yub92aufzi8zwvgrsj9xf5g55iyqei1j9v37hbl5pu4v',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:33:39',
                executionMonitoringStartAt: '2020-07-15 12:20:28',
                executionMonitoringEndAt: '2020-07-15 04:42:54',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '3w9dh0pbh8z9ucz8rm2z70q0gzu7uu5jkn9qhs5k9svqmgudxsg3rvhc3m2jal1bb8xmxjaobbkt3pb4ft7izd33emik0mqjvgb7cfjcjn9mk197e2e8ihfc5l66d85yn8bzn4klnvnko192aahnzqbjcbprqlx7',
                flowComponent: 'jie9in4ieq0taocmpdonnyq2dem3a6i7yi3ts5ksum9n3hoo9143rxv5fb71l334gwmlr4vx6vjx1zi1jx69ymyjqfm6vr8g28tbw8fenk65ryo8y52o08iupljcodscj7fkubi9dk1jctesxmu6h5ay591trbsl',
                flowInterfaceName: 'yvo7j1efxw0501k0w7r9281wgbrvezo8ntmwuu407f2lmkmjvvbatfyz2forc8jwu9i4xbqv639828jf1k1pg8o89a1xkh4mjbm7pq07afi32zn1g2onw6qz872zd2ql8y795u25m63vfvjxx33du4d08juedru7',
                flowInterfaceNamespace: 'sq05mnhqf3ppi9mbx4ib7uo21bn8xc4cl4u5nb5i36oikxk0zrll5y7xkfg8edukue4a5hau3svm4es9kdqoachv4yek7xj438ri7jgqvud73coj7kfwg68nj5c91p85grtez8n7tgkh6yox24ys6etza9qt5xmw',
                status: 'HOLDING',
                detail: 'Sunt autem quae accusamus est dolor voluptate sit. Aliquam mollitia non in qui molestiae in molestias. Esse deserunt sint ut.',
                example: 'oz4cpa6y1pj9yavjnoemmnil65f6cvhjv635f1telatwl747x62mx7zwv1nfyz042vthh2d1iqhyx0c7sxgig7s155uxziod0csz36ivo6g0f00ai71l1kca8qaz49lqg9bful98yllv33q6jkrst9m31nwtxmrs',
                startTimeAt: '2020-07-15 19:56:52',
                direction: 'a3nxd7ny6ktac76ceuxa',
                errorCategory: '96lazrzmv2hpl3nqnm3kzlpgkb6bogsct7vizod2l3nl2a0gc3x8juvdp63iumtc11k2hpethxy6k4232lwju2kgvcwj8ds9dac5w2y4hatdqm5uemua00iw21kkjmvzhah07i5ukhh6wgmddzcb6nz1rjew66r0',
                errorCode: 'mx8gyodhghe0psr6rrcw',
                errorLabel: '0073nw4cqgoawa8kk3k8jxsnenub1i4bz5honnm8horuxpnejgbovs1tmh4894xqf56punpxlaw754elplvz1wwcgqe1pmx9hq0bdwxhxpfr3pwf2yuddk5aowfpgn4yaxj5ic80ee88gd61mrevchfn3fmycvc1',
                node: 7021376217,
                protocol: 'lrksp1kre7o8cp0zitjau',
                qualityOfService: '0utl2bvdjzs9enty1v5l',
                receiverParty: 'brzw9d86nlu4vjjk8gczpmunvqa2do62omknotxboj2p61trjvpxwnpsr0r7h8nz2ct7wgjx15nuago5mhp4l80s4qq9swwbxd2qld73xzdgbjmwug3y8v09gm17pl3go2ltc6f9dxek4slekd42zjq01fghcb13',
                receiverComponent: 'a5vsuflzqi16zdnc06z79fzzvzys3p650pn0abug28qrf9rl0nl1ml3qvvz88ddhfb5o4mrk9fcixhketnwgj4rte0nfgdne0d4yz00ch6nufq6pn66sfql9ybj4ewdl0the54w9jk14g6rhmjpzb04w61pqwhe6',
                receiverInterface: '0h2v1gg9i8gbkn38z1mseh0nql1r1jq8zrg54e19gv6yj7y3ia1pitvu2ri61396t9nryeld0mk7cd3pausrhvto6y9izs2wb3ngrfjx8jpwo4eh0oumojygzxuz0bl7288uls0p2w4js5qnilmyvqf2yd9yrwz9',
                receiverInterfaceNamespace: 'ln2f7cq09gh9tb8h5qdatvo7w9f9sf3ls6tv6hixl6vva8a48k92u4xejnbwqho7f5xsikjczqfttcnbgi4xt0obxak74k4gx50iecn56mlugpl4dmkbyo4i6krolgv2qspaa1vbjgmh1dffvg1fdt6gpynxdujc',
                retries: 4191179622,
                size: 9901598387,
                timesFailed: 5501393843,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'xh7tkbmfc3mlv78tul87',
                scenario: 'vpl4uswa5tng6bp2s4z2j8cfjofij6yc6citc86xlkoyxjgofgoxg460r52g',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:19:53',
                executionMonitoringStartAt: '2020-07-15 02:53:19',
                executionMonitoringEndAt: '2020-07-15 19:25:58',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '2l62ej1mi8wv3ceeqn60dxs2ere32lc55umes5v1vaqoodd2qvh0vi8i8byi2kk4xrrsv6vbwizq1lqm3627ez5k2jcff6g0vxue8s6cojsbkcgh3dow7yw938jg5i01e0ydvgw1bm4xvaqks78trp2k38mtdxpd',
                flowComponent: 'em674efyonvmbjuvz0b1kmlcjoipewc094229onjsd78hp2bjuz5hcdtu12mea33de0mc0fjq9a86bi41kzmquxzp674zagomcswvgp6rzdn00hiholcz7klp60uj3y2a6nsre255ib0voq704dua9mr3w41xio0',
                flowInterfaceName: 'hiy9o32bai076cz58e6lwivcc650tycx24aztkngqyrfki23rlx965gjbm16yjwuo4r66eurslxmms9v5b4mww7ty0ldkr5z6vynylll7af4k1sarghvg8hpftiyymd2uq6t12wh0tfps9sdlirm5nk9noovyjka',
                flowInterfaceNamespace: 'w4lku6sfvy1x7muslpufdb6iqtboe817b5wedwsy3xokvpe91tmdcwxtrfi1zttx5ppumqt0o85y9zhzo0flczdy4yoawhj6w3hhd717qu08ujy8waf0cvveb6l37s8krvmr0fu4nr9wyvs35usef2ednr0z5jfz',
                status: 'HOLDING',
                detail: 'Quo officia quia quod earum dolor incidunt quos maiores. Voluptatem tenetur et autem dolorem consequatur. In voluptatem distinctio magni aut eum eum. Quos provident et optio possimus dicta est et in tempora. Temporibus sunt aut est. Dolorum at assumenda nesciunt qui illo veniam molestiae eos voluptatem.',
                example: 'uzeoe993cy5wwcgetrs0ai1t6t74u6wsm89q60hbd5nv7clq6zozurv6ly6d9wo2zcidyfq8ukdo7t7q99wp5hy5r4slj7l7wd85fhlyp8qc9yfqj4q8p3c1pnvccfmnyy6pv8qwg6r5c7f3ur2ahh82y5yjzk8c',
                startTimeAt: '2020-07-15 11:25:46',
                direction: '760b29kgvn2yd0xtmpom',
                errorCategory: '9vb7d8e1hqvi29shauwktjqg8tdf8hl6bjlnyz1w7ywnck60w6b5k0foryp8omhc2pp3a0g5waglhgqocddp3chqe0clxh9r4nhfjzpjgf5jjubhj2dak6ntmrtiooku9njx15juuw6s3v21xgc9fxjjp597p4uj',
                errorCode: '48xf3i5hbwb0fg2mlrgm',
                errorLabel: 'rzrybc3g97rvu6vz2sa815ffvb72cxvgrtou9np6792wtaswughxqow8bbnbaaoa7u3krt3zre73wpkfhvl51q0iny3g0az3g1t18cono0ei6wvjurstpu90jk64jos7ory6csy98m1pde4pdtnpfpjdb95eqfa3',
                node: 6860390044,
                protocol: 'pqdu0xy75vnszsnd9n8h',
                qualityOfService: 'ukkdgbi9yhd642luepvi0',
                receiverParty: '22f19wi6phf8z1lwdjl4weh6kylth1jb545snfezf7g37cvb59drp71qz7tl882hvwcaj69cnfch9ffspwui4vqiejwtnzsmj1p2p9cljnmk5hdgaeyo1nnv0qwgzl34kb2fnssnskw32jtzkaldu6wzdpze41dw',
                receiverComponent: 'tt54satp55grxmbau7tjpraf4qcqa9z4iio90ydqh0xw9x88rrxfi2usrno2hwohz9nna7o90ki0bbh15uhqn4r94nvlznimg061snveyxmo5befolx2eo4tgnkmt1zvypxirbee6j5irbro2avsp5pqvbv16mzw',
                receiverInterface: '4gcp6js7wi8wu9d174hkawirqrxs0zvcmrq6ba75an6fqjtwlfy765jug16dc3j31ubg19mwgsszcp571mqy0g7nkkr7dtalgi0z95n559iofqltwf9pg1q7ybeugzjb7ago5kdrcgahamr7d02zrusnldfashfy',
                receiverInterfaceNamespace: 'j42xrul7u9cazkxmiiwbe5s359ctpm9b8tcwtxf5io68x124z1eg2gla4c73avsygcuj3bbe3bj7r56vr7m8wjmc0epq2ysyod0z3r37wbndy4tqrtdnx5d2uy518puka696ttkf2atmx2bc97j18ym2e0qcddod',
                retries: 4160698867,
                size: 1497966898,
                timesFailed: 2525010942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '4p0ywa5w0b3yi2l891qy',
                scenario: '9r382p7ijh4vepju4ypuy1kjx3itnkcgoeap4ku9kbni5o1fztnfwitu7vkf',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:50:55',
                executionMonitoringStartAt: '2020-07-15 20:07:51',
                executionMonitoringEndAt: '2020-07-15 10:59:34',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'xralus8fn1sjfs08oed0qoipjiq3rb2fqbi36asywffro5chucii24hdkd8w5vinfxychj2ra3m4n37wj6opopyjiwt0rhgpyvggtva7tel73cm30r0okwzfoa4nk1xmzf63gettgqfiy5me378lty6aw6qp9d46',
                flowComponent: 'dwb311923drfdbhbz40jnae07wj3yzvo5v4jpefxtgkk9eeq1okntpnys8oygmzkpzonys7xcv9jub05o1ixl4lhkci40lx5fghg34cejq529wgkjsr2vmtdojcl3dbwnb0a9e5g31t7ohwwnphg59j72wdvmok2',
                flowInterfaceName: '6m6myyuxk5l7dkih86advd9gfr1tmopszym2xteq4lbrv521f9hy690wy3mpktsmzlqr412bhctradqd7dnykuea2s0vunaasbxi9vvggg88jg8ga1qgb80r43xq38hmjs43kbcpojwjjtmwii6h1js1wnkulbhj',
                flowInterfaceNamespace: 'gs8gdah03sza4sn8pu1kxg6hj8w2lun7eiykwlw7zo33ym0llvd7kvosf7knbst1z0h91enea07qrd8dhwyukfmrm0zh6zf289b5sptj51poi89o8wf6el2h6p8ac5dcp5nhmiact3totxuqokic9u80sfpc1e3h',
                status: 'DELIVERING',
                detail: 'Nam enim dolor praesentium dolor aut est adipisci molestiae optio. Vitae ut ut consequuntur. Eum cum eveniet eaque culpa excepturi.',
                example: 'ueqen0gxnykn1k2x4ntkcr8otaylihcmzrcagfve1r85yirg2kebs4wj79hw5znf1w93zy0hjnmdugrkzp39snrwft7sde34em1cvrxkd2u782vgri8qvnbxem7mvxzycwla09420y9h4q2rwa8ihuq0g4v7sxpy',
                startTimeAt: '2020-07-15 18:14:34',
                direction: 'bpfuo7s5viuytrcocz2e',
                errorCategory: 'qd2hzpdvwf3v2ojv76ka1vougsnsbn7bcfiy9wwadq3bdlrg7uxsnv15ydrmykukwvu614u90fnlysbh2ysh0ibrhmor15lan3hfsbmgl8vgkm0rqhlmyi2odfmyg605nokuiq41htbyy6ewgvkgmcx7cre5qki2',
                errorCode: '5nlasinifm97xnwcp2s9',
                errorLabel: 'ixwa1c4wwk780mdm63vpbyc9as93q2uml5tg4wyotbz6vcht7hr7c1d0vx24nwrtt947uw2dgc31ukblfqkoqso2fvkadhroibbpo83z8og9ebxtg5c5cll840zxs6u0f4b0o7t75h6fismzxkppv3vx61ol4i17',
                node: 6567504734,
                protocol: 'az4p88eoigkg15mtqqir',
                qualityOfService: '5ow12ims6up3ga0mp1zh',
                receiverParty: 'miaeevqlajz72lg7rui3q1waq2u2thuw38eddioclirr827q6tq6fdt058px2qowlk5kupb6gq4cx00098or2au59bucxowckynx8h2nxvc0p4b6pdcxvdbi93qdqhgmap53sjoqryq4m8txocpgraf6jmodv1qba',
                receiverComponent: 'zu02cmjigbi6cqru5workv2mt3abw9gahdheg76u1qszu769bfcez5mspyz2q1v06ihceguiui8vob55z55j70v88oe61ne6ipagbiho29kxivoqw5jbu0x1uksbw7gujutn8a2btarnw5lg00dblhxf7xseyocb',
                receiverInterface: 'oz9xv8wh168uluywueickgm8p5a88h2cf3pi8bik653psaps4cii85xhr4iklz1e5qatmigy029g02xrcxcge0fd06hkmaqhc1u0baqlucho0uj3lu5kf6g9y1wn0auwltm1a9lqzbq1rwuwap39vsb1ixlmp1ld',
                receiverInterfaceNamespace: 'l6ftlnlqgan3f3b4pkumwg0vca0xiy5wp2rld59zkjz5xk9xa98rlh7mgb9fwsv7r23eqvdiy7or3jq5cq7dqw4znevsy7kaqdxmt5kkfj3px3ok9jthb0snnb7x8m6538qq4pt64xpi3bsw2a959au1d6yzoe8r',
                retries: 1073091982,
                size: 2457035704,
                timesFailed: 6603017370,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '68idrj7rfllkjn1nhrvt',
                scenario: 'h8xrm4hrekd4gspjkigvo03w040s8hplnh39fxbultvj38r4ryrgipc3xctk',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 05:11:25',
                executionMonitoringStartAt: '2020-07-15 16:44:01',
                executionMonitoringEndAt: '2020-07-15 22:30:43',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'bwrngf9gdvi4i9cvd80ehwixvxy23y8n4c2j5agfzdv49sa5v6abt47dve94400rz7wqddw3kze8iijr5b7o655vq5nfi4bl3w7riiom9rrffopt8lm01gcyeiyltbm80l1thcrvibqcb5m1s43pu8z5sttw4b5s',
                flowComponent: 'xdrkt46va682b2lyfjv8hxn6ptrge7d56w2xno2kd0874e1jbd4ntb2okm103he7nh0565szvk6sirpbr3a9efg15rfjwj2nbh2tmeqnkjgcc2n8fjej7g0mi2jjhc00k14hiojvuxtsccsidsh1uswrgs8299g5',
                flowInterfaceName: '4fk0xx9h9owinlrcemsool2twhnzflkhym9mvo96ik9jlrepcmdaq8eo9z1vwnq6ydgl804zt1id4e97kixbbltze304499el8bcjegbcqm6eu876pu4ileup23zcwk17xeka9o00iw4mpo1262v3iuklpw1dbfn',
                flowInterfaceNamespace: 'fehqafhrr8mr98mtkhfocxm4gsazg7gdk7b4qhw9m4ttmyhhs554z24ibjs1yae5l5c7j1lzvbe55c508g2q0nhui2w7msyvk49k81whnvhtux6gi5b5qryxde1vpczhh0gmueilw8t5oxltdc38imnmpdkqe6j3',
                status: 'TO_BE_DELIVERED',
                detail: 'Et modi quos voluptates doloremque. Mollitia tempore totam earum nulla. Nulla enim sit veniam explicabo. Quis quo eos ut quo ad.',
                example: 'uqv61mpw909v9s4mrzzepgd4azz3pjk5u3ocb6z1zbibbyyodk6jg6g8t5858us9p94v0vyhqm81vp1m39k7ohz3skxiers9794gnffqufkl57wx2yunih0btrn901pa1ev0rsrh7ncugmbjmunfgbfqhwer7bv3',
                startTimeAt: '2020-07-15 12:38:43',
                direction: '04pk6qisfy2vjxh707k9',
                errorCategory: 'gkyjldodjf9r7guudtoodz60nudiwxnfqdmepdqgurzd1pko79m8q3wo3acexpt5waf0e8yfbz7ku7xzdfs3qsvgkutqzhjb0qit3s9rvgsrthkxu8vhxxj0jt87ryeg0m6pr9x6lgw9pptt6891fugs4pwbmuev',
                errorCode: '9dhscvjsy8slvuzhd1gj',
                errorLabel: 'ttuym2euibvxl8xzlmf4ondfbj71pfz30v8p85j4d55hxphj3mke6mf1nafc6sdwg8qwsaww2mg9serrh8735teu6qrv4d9jwm6ijdv098u0922ptmncnhzexl5lzbt78t099iv4vba3es8fei9i2tprtm10yijf',
                node: 2344403931,
                protocol: 'up2lnx7kkpi07y4rwsxm',
                qualityOfService: 'gg65vcn1now2p395ateg',
                receiverParty: 'kol7hj5gcl61xxyypkhjgkj5m3cm83yphx6em6p37dukc5ms45ehtggtjcapqo3ixnkcximsv8rvdhun0f2tcnszig3t67sw2mw04e39ty0hpwk58lrde74b6v5j24j9632sxftb5vnvp4dg457a4biiokeruqu6',
                receiverComponent: 'cc42nim2rj99cb9nsshsnt2tc0aade3tg7gc9c4c79wak799ahstfjv3ii2ugoc9t8lscggn6uennd4w65gm457ojgdivqcb086qe3oa91mqb8svxgufush5mdh5izrng5xv3uaqitsjmwq1ir1cu0vf7uf7ugv9z',
                receiverInterface: 'o6o9m3qlv0u554ci24zvqmbx6u72v4yo1lnnnp8x00hs2pkud38y2palfeg09bpjz46ec0cxuvlcppcdvziiasvcliy0kcdodwzodxp2e93rqqj48icyk85khsdhhb3p1oa4qn36zrghebf7vwedec0qh46mi8cn',
                receiverInterfaceNamespace: 'digvo6ljh778tuqsgdgce4t9y1adxy25hmoi2v1lctv3lsbbx3ufi179snqos6hjlv01kq7fsl4gv75n6s8w17si3ofy48ylbkatvm6e8qj027vvotsiw99pilapanl0p3l0jufsnt1gezvd5v66pev9clph7qu3',
                retries: 2406333121,
                size: 2605337649,
                timesFailed: 9885744305,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'nq6cka8090qyvofxeq5x',
                scenario: 'ebtvlp3b4o7p084n2e3y3cizy6kj61m9241jgxos5u9jucz0tmcrsrjit19n',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 02:31:08',
                executionMonitoringStartAt: '2020-07-15 12:55:11',
                executionMonitoringEndAt: '2020-07-15 23:45:14',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'q6vteafvpmwt8pj2siffrpqdgu9wjzwe4h6tf2pwyvfsi9zwtkj9mq2ukebnp7fmbfdgamx0tagwwzunezyokc1xcbs9ejqm9csay7kg06eghdbu86niugp9ost3adq0kr8a8m45wgg6zng8qv07w328cyyt856x',
                flowComponent: 'v95ek9ja90lajuxb4rhijon8usy57c7ok030rebmmyum3zajapm5qq4nvvgzuvcru7spi19nmn7wy9wx88y1yf7exze1hdou0vncsnqdih8xn96c9bcht30zdyvx0ddk5g936mivmfrpo4probz4xa8xpwq03cac',
                flowInterfaceName: 'itgam3yvatbb2n18x7mzmnzzmkpn9osipbnm66p9z0kngbt7pl53x17wqbkd5ww4a6jd98zpsqvv0nhlair33djowjbz9j23coq4hxr9jrvuocx59czpzpozr2jc5etyht0ooaxyk56rod1u9p12xqd7lv4qlcpb',
                flowInterfaceNamespace: '7tbt3h50fuyy02rwuy25ntmtr21m1wsvn6ptv8p2h4806h1uqhaxfqwodkodppm2bqxqf0o4mhguflewj68s48274p7pkuc4dr5wn9ixmqsqp6d79ufvf02842ouan88hw7f8wsiowchut0e4s7nzrjnq70n5u04',
                status: 'HOLDING',
                detail: 'Sit distinctio commodi facilis quod. Omnis quas atque. Ut eveniet officia dolores laudantium nostrum natus. Magnam blanditiis perferendis vero iure eum.',
                example: 'vb573ap4b10xy8khw5e3jz1h35hbcdhc6tsqw1epz190orual12q8s5ivrqo4zql93bzs91np7xzj7metozj8quixol8mv5vsu1t8pm2hwfkyzupr4td35xoi4fre8ri2azqfas8u6cuuy8y7olq8fenjexbvz5e',
                startTimeAt: '2020-07-15 02:45:54',
                direction: 'rpfwjh5s3737vlhmutg9',
                errorCategory: 'lnl9dccz446339vlzqaggfo4o25gs2qu7j1cqf3u5jxmmhec9so2kklt0tpz0c911ntw8av2u434scqyzdgyyktgubgh8z67xv8wrgrh3zzms3ihk3z400wuqo6msliosdpdl8xrwdt1a8m5rx7uda2ewhze09iw',
                errorCode: 'h0qqromrmurwh19sggz5',
                errorLabel: 'jva2j3nut69z47oo6eg83staswjhco0ducqneodm28gdsq74omygyxx7zyijp84auysepd4d9p6ds92w02knbgcfyylq7dhx3a93phs4fhc1xdw7b618ry5i2ak3ssfs3uxw3kktforagya2quca6maalr776kjx',
                node: 5042752167,
                protocol: '8hrxnzkww5l75d9jx0sf',
                qualityOfService: 'bwx0xt53fj0qbrpyflnz',
                receiverParty: '6egwhbnmvfyga36w9prp4zhsj9ocwfaplb493mgvchi3skwnld3kkbhe5m8nl7lxyijqni483uqz4nh34g3ue3sz9z5pzyr935ar3kki9t2hc9is3513qr63c6yogaqs52yvyh8iy43k98wc07bpnsgq093zaqey',
                receiverComponent: 'yg613v8pg9rh3rol5rzvxqopde22e5zbpjvdqovx1lreoytto4qdsmunuxumdnh47n21dz2cjc05nszr2t86qe37zdplbqh0wbnjopgece4vzrpsnrdviva4ycxpl9e4vyhi5va2mh8124ycjywxlo1uixsded62',
                receiverInterface: 'cooebvfzyhe08oahto5aqvhtxw42bo14m3waseky40ln9wyv925djvk8k15uwpb9t9qgvqp3lykrgcyotc77hkjufbtmlntxztzglbuzrawykv1nysr3lysemnp77glwwbschinem42rq47a2tycu2mnxeqgqtjly',
                receiverInterfaceNamespace: '9zhbjy405unwph936ervqzakoaekj59bi6xoahwm6d40mb29fskj1iwv676h9zucq595gbm43ygtd1hgyfz4ibx3eu0tut6r4ufy2mutwc6rzg4ai8roi25npird1prro16hupr5uni46vvydofpssandrn489s4',
                retries: 9245406459,
                size: 3899723065,
                timesFailed: 1715581902,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'm28v0n4wikaa7fn5l1iq',
                scenario: '56ceeiranzhbhv836v370l2k3y4t6dgz4xc4kf6p87lv3gr69yq85ih2s6fr',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:32:16',
                executionMonitoringStartAt: '2020-07-16 01:33:00',
                executionMonitoringEndAt: '2020-07-15 21:44:21',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'cyu3ermy037dzuxmgxcz45ikpcsz7neum94ls3k37syzdyml4ly4cwonoyh74cue90r18438g418r2mt5i6tlpbpgppfqrovuxkl4eakplupmj9s7c0tql0cnry6brwuqwlwrnnqzkgbo2dqe58ql7wsjhpdthac',
                flowComponent: 'hgd34iu0uninm8m834nuqko589kc5pt3l9uhsj38ehdzu8vmplakkymors4nyi6cp6j9k46felu6i9qrqki7boyzdztftwl3ewq1apt323z2o406zse59xw0eifies3mpfiarm8da4ntpyervlb40d46758wo9jy',
                flowInterfaceName: 'zqqacmik2ywbr5pgchuwcq9v27urqrbmdhownecl2j7u2pjuu1t4gdd8vbnh3ffqsda25uky12ym3zs45pfcfq85s9xxhxnnxiy0b3os1agqbipv5uzti5w19b71mr7x681tfq8cf9ow18bgocwbyhadg4p4v3pa',
                flowInterfaceNamespace: 'fcsihrcyinkcygf2bwbbxko9u95zlkcx3la9ws23d0fayexwddrvnl5ofm7kdwjlyrem4y66pokfbm9qx0p6ra64b9qosdg8gg7msl11m7z6v0a7ydkf29emtvriunlupageeapiu2na9xymx8imsj65yh567s5t',
                status: 'SUCCESS',
                detail: 'Asperiores laudantium mollitia voluptas. Quibusdam reiciendis perspiciatis. Nesciunt debitis et qui tenetur dolorum consequatur magni vitae.',
                example: '0yyyaqqrmyod4e45yopc0wxpoh0z864rcpv3sbu7104hxudl2vnrrahrxqetsnlmhppuvw70tdqvgv5r2ke6cy0yv7h7bmr6n9kykplazp9ybetv25v7fxgvhresl0g7gn0vmk4233ltroino546ncn0ljl944cf',
                startTimeAt: '2020-07-15 02:29:14',
                direction: '4rkece7mt1khjsmk2mmg',
                errorCategory: '4c0olg8h5ajmsxhaiyil2pwq9do0bhuniqawov2p4ujxd0yo709z38in4sa0550ei0w8cys6otlr2qdewo3vhvrkpr3pcct7k8dkslaa64jvy4zth12omi78oea58mkmfzsfkf1sl7cm64wyydi5tfuvdlt05b4m',
                errorCode: 'evcg5lmyoqkmytc930dl',
                errorLabel: 't0rnu1zwhtr4bvomi2e7ygfkv6vn5x1y673vgtzpq99o58q3ewojdcukaojl4by5eihk4tlze1dkxuik6mvw4028o15zrnfy8d5nii4cr19hht56at76cgw20n7jrzzdmt2w05vzui2y6y170oxv6f32lbcw3vu7',
                node: 6419547211,
                protocol: 'i9ykrgfrm7ukyxy9fdho',
                qualityOfService: 's9q7dooxdb5zeg6do8rb',
                receiverParty: 'cbm3em4cqy8uht31oze6zgrln9qc423kub4ztu6jb4k1bx9il4qkud6bs3wfbg5q6tzv917kj48a9ro48knbmqu2zpxhg9y90xwpt6b6410m02qps8i7yq33vecvswl9re6q977lna4yeogdcacmqyn17e8dyn1i',
                receiverComponent: 'vbv2ulwb8i1yo80jk5pathyzjdqcrtfsug9i8usrpr8gms2pl6l9ta2s30nshpv37gsni2nmg0iyrqft45hgykw2g6x3gh1fvmd2ewp7p2g7zfl5gvh31nig65fe3ti46odp4qbsif288rxk7w2g2w49mz8lmbzk',
                receiverInterface: 'uw2woosornppobt9wnm4lz5bgya1ykajnjlvh7b4k0p8nlpuq68o4j0ce0ss1ct3tf8uveao6mcw386k0id2eia5511n62sqf9rz9xwyuiansdp52biu90igjlcdveuy5jd7k9mv1a5scia9ztoeb4ptgjms2sap',
                receiverInterfaceNamespace: 'zqdsv50o7cxmpsfxjj5fer0mofeke9bkohr684gad2no1nen1t0ak5kkyeh5hiyju5zi5r5t0j3i4qnj0ud57yhdjyjn2fdqns64h2jc68pd47aj8nrgcvemm1vpn3uqk9ealgeina1t4eadlwg6wvalna92whvsm',
                retries: 9985570895,
                size: 2552156041,
                timesFailed: 2464141701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'nzi37kklkha61nge68k7',
                scenario: '9ekspycesdhq4dr74ydld3owporqg5yvukp3cqoalesyqy35jmhijkqq82q1',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 08:26:03',
                executionMonitoringStartAt: '2020-07-15 14:02:26',
                executionMonitoringEndAt: '2020-07-15 12:33:36',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'l1ol3rkkqi1i77b6y21yywan25r5ytncab720sf3cxozcxpejfj3avbumq5ppk4yir53dkjwfz7wsw53xbhnktoqoh7968fvnqzj8hb3wylyiyacklf6664yt1y98aq3eh44o906yhm9pwtqbgbyf7kznd76dajo',
                flowComponent: 'mweoipk0m8miruvz854mceg9xzv8nbg7xtn9x6oej7eo1j6g3cemv8g4y4fkdtyub9b6jkk3mczub7wxn8hnjljef2emqrbo4dl3hk9tjixm1b9v6eukt9hodyqd8llxoldkft0egk1pqcj65r5a7f6uw0671c4i',
                flowInterfaceName: 'kydvcpgn8ycdxuovyewa8037tamylq8wbkzi6jsq0sw0b71wy1tabm7st4tdtcsgneouz3gt26gwjsr29e77xan37zafr9hnq58gk0kwtvkrxtnkropf5cq1tlgekzz4azbeoy91yokln3027bgfxt47dxsixqjl',
                flowInterfaceNamespace: 'f4eoq1btysfv7w6cts6yc67g1p6bm5by15xax7vf0ma0rkfsi90j695jjxbiu1e9mu74ooxgl0zbmf4guudhgbjgqpiv1m97bdu5hrkgzwacg31djxyun16o8824bko1siyaauj7no4zzm5l6n84dh72wck7mte2',
                status: 'SUCCESS',
                detail: 'Neque qui odio aut. Vitae ut laboriosam distinctio modi labore. Dolor similique quae. Ut blanditiis similique consequatur mollitia exercitationem vel quo sed. Tempore vel nihil aut vero. Autem nobis temporibus quia.',
                example: 'fto6h60569oczmmv0uhknffowrd3ls24koxdd0i59g4pnwq8h8gs0ygp3jh93dmfibdfh16t9f4sgw03zrpf1ihfiq2u6pdjjtn8lo0qvu6ntkpxtbajvrhnuhs0u9nm1xvkw19d2jnoiezxep46ha2bzicwaeff',
                startTimeAt: '2020-07-15 01:57:26',
                direction: '1jl9b6vdzapk19jeg538',
                errorCategory: '0qpujn9alake9qrv2owna02r5s8ntz6sfiu0qqy26e9l73conssko4qabz7v0h9yttyllye6q0v3iot12xad0tlxbiyqplj6f5zwej3mqkgvomonhjdi9ecwj0t9xmbex44vjqk7x4rwgn5zzmj77tn5xvh5jxge',
                errorCode: 'miy0q93nhbqulhy2x5bo',
                errorLabel: '849hm6mof3f135shfsm7ktlw78mpcwzkz7r4ujl3hnu4ab2064toxm61yhmovqsuqx7sfiuaie0cilv3oo7i5qteytfkilxlh0dk6jg8ra7ai3xnpjdgz14sbxst8k3ao6eotwrfl1x6cv95k0tky2t3xl9se4oo',
                node: 1655610545,
                protocol: 'xqpmqfv5ea6lhlz8gvom',
                qualityOfService: 'l0nsdxxobm4l23jgnpf9',
                receiverParty: '0jbj4h4w62a0x4mm30uc76aioax5o7nwkdhem6fpel7y20hzgg0xcgxhhgq9ee5qaocbfi3d7x40iksm6ni2o364yb4p3l7pj1knc2izdbekm15qyrrf4uin96g0yxe2868z61sqt8508bpzl25fcgso495t9zjt',
                receiverComponent: 'okfa2704en7d0ozhtrrs2o61dvvjcpy7ons1svsii0j7velbib7rzewdrg8afvuntwmoxqn6p3rgg48yo5c3exin6depg6x2s82jzbj8d52zorcpwcvyzv5l2g4wrrwjsoqkqnnp3z2p9fc3maqvn03gipyw2fli',
                receiverInterface: 'd18ow6j51n1vfnrq60hmtlwgxxu82i5y007b6mt6pbamjphq5uw92glil92dffa15vr08qbynay241ex197vs9f2jp6zazmqd468w0tmloo6s5xo00hujqw5ninis1v1xqoikblw24hdo70ya1l3ixnd200rrfus',
                receiverInterfaceNamespace: 'iqoge83e9uuk9o1np3re6yrt9lc6ehx9dihehiw01tg8z32r7i2ing6gfow2bjp7xk9ywsa5aif0zwi5cxugq139buf22ljuvhcui1s0e2va1e1v5jl385fio5qrxy72ib6en4cs2w6hzbc0268wk738brh3xvgj',
                retries: 11057216115,
                size: 6758050704,
                timesFailed: 5515876668,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'dkxtzt1uit1sbs31riyi',
                scenario: 'q9jwdpeellz9i1q2poewge2fet8j0gf2j1g23csgxuss52ibrg78d2tctr4k',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 14:01:16',
                executionMonitoringStartAt: '2020-07-15 18:09:17',
                executionMonitoringEndAt: '2020-07-15 08:24:15',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'a5ir8rdc4z471odrbf0yt763rnmxzfz2g794d1s36lsdwduymatr2p0ivn9iiwhvkwz39p032x0w83v5nl1uwvhugx80mo31wgklbo18zpfzkk8i40emczc6b44y0lt9o1hpsqbe3z39rcw29t2vsi1em13hbi59',
                flowComponent: '39t0y56p0k6lf9yrhv2ughdj8noisb81c56t2dmcph1w3wvxva1cloasi9b25dtxms9fhfh0kxwn6owomiwj1lek2418w137c7m7cr02qgkj13pzyb3gwn6w8dledlyuwvbnqzoz3q5o0773x47duam0fmvrfill',
                flowInterfaceName: 'qcip8149p6x8r1p5yethfx97f7y0njl8e00jfwkq9m6o5piu6zrs9am2d6faurrerv1bnetmlbnegmd4ch91o559auqmddij6k9poyevikhkj9r78zdzv1u7iy5s0mv2lvgc3jmscmreup3p49sjmdb64ji9lpw2',
                flowInterfaceNamespace: 'sv7aaj3nc5nr9li8ihpp8mnw4sgfghdibrijqjw065vrsgv2lmjhwbiq4be904z5eavsccoowjstqou0rznc48lwipf3s0cq07ncpusgc1y1gj2kum8rhygcefa4bw23yvd7s8p23jjgbyoa5qs0p9nckbj7xnh8',
                status: 'TO_BE_DELIVERED',
                detail: 'Perspiciatis culpa voluptas. Facere vitae sint qui qui eos nihil ea. Maxime voluptate quo. Esse tempora ut reprehenderit. Ratione tenetur ut. Rerum odit quae voluptatum aspernatur tempora quidem ipsa.',
                example: 's6v4flwbrwx3zubql990qoaeiw5p8vjjinxnvhdppz62jc07nngjjfy8xxgwn8b3cgzlh7p1wfg0rqf6bpsgngexj6mrjn8ba7o0c7o85k1pz744ols9e4bc91vlztljvcd6z55314pun37d452pu1rl29tbapvw',
                startTimeAt: '2020-07-15 08:46:42',
                direction: 'm5eaep4fz0p1c2012gyz',
                errorCategory: 'sttref3qdgez40tk11f0hken7gcqk3wg145uc94b3ctz2w85vus9o3fo56u023nixcoglrcosohtsh3b9zg70hp4ks94drrbexa7nzuureguu6utaa8fwnwur433lkq50snl7bien41ftxkeuii0qhq7dw3fs7r9',
                errorCode: 's36uoyx2g5hp47a20bmv',
                errorLabel: 'l3v18fte9aravsgrfx6dvsy20plo6912d6fn3igcmf6qdjhfpkzw5vwvmqk039mswiywnvnmb4qkt0wi8eyd2gm93qbtxswm0kgkjjlcek4cn15xn2as7f7i9y1ez75swnrmbvntus610pqkou9i12pogp8krhst',
                node: 5893468136,
                protocol: 'mt7mp8y2r5uy2rx46rlp',
                qualityOfService: 'e30f603s56m1tvaq6v9m',
                receiverParty: '8sooonl66t9aqeqek0511z4t6v7ztp4a58fy5oh67ngplsntucl1k7dnsbwprol6ule0h5nksq3equl228w3nduicmk22o4g31oob5tw90ptzxljhxo0fs4ab9m98jx5loe3zucanwsx8q0ge1dqt10knxiqus2o',
                receiverComponent: '4vy08k2b0qdbe9swmtqta9tn8rkyfdtlw0vbcjq11jgbnss9xckc1ebored01c9c0a2niv16qoxqqqziilgfl3mhak3pxfuxwdni3yinqwrg0uhldid0j1rcfmsyw3jvrz0mlbm5s3t0dc36rviqyqvwhuth270a',
                receiverInterface: 'pdu8zktwwz1qlr6mbuzj4ftkxkkk3q0okl4241ciokv55o0sqgubg9jqg3aidnq5wv9orkmfxhy4mqzive8d711fzkoknnpfnwmpfu7nnqj041nivma9hd838f6pdvrfyf5yqiebgzmm9k4oed16uhk7vgpbrzjl',
                receiverInterfaceNamespace: 'bzrl01m6x3l5j3q4rfa0rnx4nx7kc0a1gvq2khif6enogf74y0twkn1tp6bu14v7ubdah8jt30vl1kour8yfdf7u2ervesvibya9usr473retib930pnn0exqpplljhui1xey0irzajoqntdumxqrltucbau19xp',
                retries: 9589491708,
                size: 81416483327,
                timesFailed: 7244713189,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '5ieu12voqg0o3cjjpiu3',
                scenario: '197rt2ub7cucudatfw9nzki9utavst4gx29owkhcp4g1uz4adr4ogpqemqq9',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 03:11:36',
                executionMonitoringStartAt: '2020-07-15 07:32:16',
                executionMonitoringEndAt: '2020-07-15 16:26:37',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ndb8okx64y7y0e3flljxhi0fwvfr3om4m5njpv64obiksb9svhy98fih1jirttlnwyl1mi7mtcgejrr7wltk3hexi31m3qpphgvs5v8f9jkgez61dq57bwlkrkbbrc6lmrr3u8ilt1nxluvvxi6g7yeduahaq4ja',
                flowComponent: 'fj7y11ay7ee3c68dmu3ruciwrvlq3rol7r02t6x1ibh17utgtyf0pgo4jw1kfvy0g5g95j4phnucddpjjysohq0fb168fm2375ecm4o2folfmf6cidxtzcnof9ickt1f14lc2rvevzevbefu1udoekquxi3r887r',
                flowInterfaceName: 'i0vnk4i9la7hpy74avwxtkuk79ud9syipzt9hajz7r74czn577pg5s6cnrgadyy0hpnafdkh08ev1vi2c0cfs1odq0zgbsvgbik8uqgb5rzztiheu4frg4sqb8d1s1x6aq5kxji7dzy9bwrul2r4d6txmtauqn8i',
                flowInterfaceNamespace: 'ndnx5jkq5unb3uohxbaqrv5ywjrzt8ku08ydkgtwtg63mokvuex6fuub9p6zby2sdoh1hnqvsjfdw7pz5o3wl5exl5s06h6vn48aq4zng3bzwtg4co0gwe3ocxn44olmjs349z25v5hyj51x59jutoukmkyr4j09',
                status: 'CANCELLED',
                detail: 'Voluptas eum occaecati molestias nihil voluptates omnis. Placeat eum dolorem vel. Hic quisquam odio est at dolor voluptatem porro nesciunt est.',
                example: 'v832ayh6hiiu7lyo5x5rswd3zsl4rza6p2v0m4op34r8gdp5zx8tvz7f52wjonmr49uztn5ushs0376nw11gsrq8as3d6vgsyssso6d4xqfbcnue59sp47nh7imhit9ts776tucny3a0mz650z3ezsv3ni2c2nrg',
                startTimeAt: '2020-07-15 09:57:37',
                direction: '2kf06qa0chzjspauqbgk',
                errorCategory: '2zxlwb2q3603nbwuqhpmqqz7vc3z4bj454d17em1kvm2skal4s10surgcbrzp50mnz0e5gfak2wl52zm0b6zpom6w0a4qee23vp7a1monblrb40rcu69frpqq0w9g79usnp1dr8bxbehujn8qfzsqg5qq6zu94ax',
                errorCode: 'kaqk1heu4v9h8b8n203j',
                errorLabel: 'mfcontwiwnwrh4s117t4bfu5kac8z5xx2ggnnnb6do1dg2obulthxi7w8tgzon9sq3nhndvz6tgnjrlnlafpszyicwrxdqivqsd0gglmevzv63dzfvgpx3xju6nkzy03g1u4gabouuc1lb34w3jtdlsk6hmdoa9l',
                node: 1961620430,
                protocol: 'yjvqvurv0zk46o92noob',
                qualityOfService: 'xmkeir3ftj9b3jtt4n8n',
                receiverParty: 'v233cseugvltxdyufeyqce0rqv2xqeeahsz86d8lmai56ltrn58s3et5n9dfqr3z6lgoa1a1r1roqrgttsatok9lm0kumfjmstimrfw13zsdgh817j48u7ikidmn6709a88d4ezbek35a42d4q5tn3m6ktmgiq7o',
                receiverComponent: '17q9zfj8o9dh69fm0g4liainx9sjt5v37d4uuc620xracprap4f8sy7u708fxluhp5qrezulo8lduylfibo5zo90ufvoabfm14tcreokn6lm9q79dhqq53gvxbom1y7nbbxae47cxu15qmjwe40usty3wjtsboi4',
                receiverInterface: 'ee2x4smpd3hqmul0zsdixipx2egzjjj15c0yt7qudwn1fj455yaq9y0orkhzj8wrov32okzzx3fv2q2vb484r1dvx628x1yxixrb5yff8eeupou4ohyaqvg7vezaj6y605d1de0y3hppxq70ytrg0qj72wyerqyk',
                receiverInterfaceNamespace: 'syby8gvlnkg603j7k9azdb7wrdzfor7kfshbvw38b3cn8bd0s33cvctn5x066n1klutq788sred3bsr949k7kabf041cd6b0fvfn6mbuwghoporyhdw21krpkfja4owxlb32i17j3eo52w8251tzntx1t2towpwd',
                retries: 9227309777,
                size: 4325670621,
                timesFailed: 61613824780,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '0ppfmbamqb0zt9ebyylv',
                scenario: 'k7x33cf1ffbh5e3iykspt8pv3032bp2hkht2694bf5vh9s1l7hdn36lx2k5h',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-15 11:21:01',
                executionMonitoringStartAt: '2020-07-15 21:09:26',
                executionMonitoringEndAt: '2020-07-15 14:06:19',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '103awu3s7r2y2kblhg5vw1fy04n6pktngplm07ahpk22wytw0bo4z0yjq7msop257ug3avelvhzm8nbv64awsbsd3ipnywtcyahmuupz2hf63l9dvpw4840wwogix898i7z1ehwaxyks0umx5epyjx230lpbmmc9',
                flowComponent: 'fjtfvi3jctcyqd15cvbsvek5hrpouixy3urvmv4oqlsquec0cnqr4mt5io0imicswznszib8s2oejih9b6owkzq44oihk2rncbvgzvtmwf2n3n99ogmfl0lxphkjgqxsrtiwjhv4toeuzyopl0jxx7uu3lca89j7',
                flowInterfaceName: '1o1xbp7fzl98p5uk8fvsdj77vzs4xivy6ispmwka8xlg9604jts110xcqu7f10bd3s65gl4f0b1nr3w44fgpdul7izbriny8orz1qijli08uu2xnbnflmn5dmu6tv35ty06xvdpj2tznbfjid2aio7s6p3g6kwzd',
                flowInterfaceNamespace: '55a572l9oiujao8ai3ugbopp2pxuqhobxarpq27vtgga3bxszpavqcly1z93r8cmjxuabmgq3eyunak527lmd5b68rimiru70t9xw9h5fri3dhehq38ieeaeu58czedg3783h03h8705um11c5mpvrrsy6ejk8wq',
                status: 'WAITING',
                detail: 'Non eligendi aspernatur aut. Laboriosam accusantium dolore facere. Ratione adipisci mollitia ipsa. Nisi quo veniam aut nihil excepturi aspernatur dolor. Ullam dolorem nihil libero et sunt aut enim eum et.',
                example: 'w8lg8qlg9sqqzqkvqxe0q2dyhw9vyrfnk8ji5bwrdex64sjnm7od9utvg8wcvr8evdyaebhc2c4j85w0ca05feio9dz2pif64k2nxmbdfoay7f2z12suulc13q5rz66nlrcz13vsns5xvp8pve84vvxfsnxtiooz',
                startTimeAt: '2020-07-15 12:00:21',
                direction: 'u7stez3jeh925ftuvn13',
                errorCategory: '7wtk4o84sojb0tpi9ksrmj6xamkuc5t5dyrd1yauw3kxnh4jj51lx3zjm1lp3rk3r65nucx2neitilouprmnskuatuc7hjcpl608bu12ueoxr1envvrbnxcvz1tgkllggr1c7rgzn0lmphwxi3cmxh2tk0yaxwum',
                errorCode: 'ylt02fpu078qc3xgvcf0',
                errorLabel: 'wsecs7stmil66genzs3eoe0khon3uj3t5uf5ilwru4hj9h6bivm48jp7eq7bb8s9nx1g4yhroi1hulvsqqtp2m9p62fio48sco9bvvw380xm5zu2kbs80syykbvdgd6chfpwdpcydf2xitx43rceiagj7yx7puud',
                node: 8560392332,
                protocol: 'zdn35ql7jnyrmrohilbv',
                qualityOfService: 'g8u2hlaq7mbnnrt2vtrh',
                receiverParty: 'e331w0xn7z4itbgsb1pw4pjw51h7la9f253fk72jtvkf15bbd2ixpzju779ibg8mlshhpvji3x8nrhyb1i1i45b2cfygnui4swlnhgkx8sch7pkbz5qkzhfa1w2vdfatwslzbihrut7zha0nji6we7fxzgufe0l0',
                receiverComponent: 'znm4wl6kuoohyggdb9ac4hlbqojbo7u5tczpo0naovy0ibzz2dcw7xn5psj2fkultk918jp6wg0tocp96o9uau7fs95u9ird5g0w87avac15mtyhq1nr4rhjg3mv84czxa93e9qo7uevf12bhe0twdvpigciuw7t',
                receiverInterface: 'ia1f38yxb262kp5324cb3xfpo84karu26azxbq55cpx72ffacysvemfi2i9i9ygkyifae58fwfhhi7pchfge1x4jb7l2jrymteg15guqisqyp0hxt7t7geaqjuz2zep4p6gb1al9nzen4wfyvzy06k5xg1tm6nas',
                receiverInterfaceNamespace: 'mklziv8ocuhi9qvvtds87xdmszkovcu4jap2a8f94300wp6d9zpobh1wx6ny75f1t9u11kscxnchib24um69rh5roazcjp5vr9vhjl3i7d0iydig5eg4qqz2xm05vys8d4l3tlaett7wp50njtq9jwixki5jzfw9',
                retries: 2032207235,
                size: 4646670951,
                timesFailed: 3908435275,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'fgo4c94elo2spcsbv6ge',
                scenario: 'bmgsf4omtbj5wyiag5kgv7d5qyzfnv7ou2l1acqfoyojvis240a6wsd97wvq',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 18:14:24',
                executionMonitoringStartAt: '2020-07-15 11:30:13',
                executionMonitoringEndAt: '2020-07-15 14:18:56',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: '5irkpwy4ormcl3icat26hr8p2bn5t16fi7ayr0h4pqz1jiavv0zgehfagv8aa32ipqzk4g7ipecdhtpxyye5amscbjdtxp5dp5hqp8oogoieutyo1blq6f1rng5xh4q25zahbjmtayh3umcgah0eul0hsq1ryt1s',
                flowComponent: 'ifgm2ibqmk956xd9o70pzwgbe15285cs5kihlo3ijp5dc075o07tzdxq3hizgobxi1pe9igplts2zspqpb9fqo35g9dep4091ednpfivm6ugkcuv99aw02puci9crlz9o7cs587wgv4bq0ru42ev9huine4fq3r9',
                flowInterfaceName: 's35e9ilrhtpspanfsl0jw38x25iwxgnyvu99g6kj1kutemvijixpuedoogkloyejdzxob9lmfe9bx8k6ye5y7vwlaz3yewpd9fpbcb38njdy5xk66790kg39800zr3jinxybjpmtj6m0ch708t5awmv5dz5ic0pi',
                flowInterfaceNamespace: 'a3i3cbnvrk9kelzrk9iohtguuevnmgma6e5hnvdr5449oc6er6w0nwchn6xpgcjymia8uu2nyubbnwbw0ezxsevr7ena1yhgegiy10h8jdty7xcbpi9md4cm7vmdawuwrgj4guhe46qheux56ze9pgr4ilpcojtw',
                status: 'XXXX',
                detail: 'Placeat delectus mollitia. Ea quis autem nemo et corporis id repudiandae amet cumque. Saepe et ab. Itaque consequuntur temporibus quia facere sit voluptatem ut consequatur qui. Ipsum commodi placeat in voluptatem aut.',
                example: 'ccc85xivv22bmda2z73vf6gl7i38o20b7drw4p42x3341t767l7ba27bw5reyky64btba602ikhdn1jgbjxv5ps03y48x01mwudbp8u72qu3a0um321nad131nk0l3ocgqkrxes7xcggswntt1vo1rqumr0lswuh',
                startTimeAt: '2020-07-15 07:59:00',
                direction: '1izog9l4aw2j7lh7390u',
                errorCategory: '5b7fvlyeooa9qherl328gmmxk8joh0dmjnq2dc2ting3rt7xgxj69gwwi1qyn1chgb3mc0g9hm1nngt1y5u668jtdkmnehhn35sbfswc8hk1gv9sr28lyhlsa5qqz3ahvm44a6u6qpmw4qrxtcr1uw3f00680mhl',
                errorCode: 'lgk4kxtk8kiw32jqqgao',
                errorLabel: 'ihzmm8d3qw8q6o1c112029reorpljwecdm2clek7c3r5dbzicok7xr8ik193kzhmtm7p31ku7p2iolfebgtgb62vfhow4ev6sem7hqo5204f26csqjfxmrep35j3ejwwlyjqpzwi1h8t073auhywm253a80lmjg9',
                node: 5918049668,
                protocol: '0i3t8peu6gi3o88wvo63',
                qualityOfService: 'mstd8eudbro06w2tuvtd',
                receiverParty: 'tvq9tmrg9k36kettqkrjq9lsr3xzxwa2podqlw8z0p0gg5hchqpt8ss02xa88h6gbt5aaor5qcx9t75qe6ddrfkxb575f6jvhawfuwfab6tgt71j2i52jbq3f5q8a4uhd2vj4atnetpwoe25sf8u4qwifgx4c9in',
                receiverComponent: 'x5m3zaqyxqk0em5a0x4s9sif63svozlmfal918hhj8blymsazx5fst84jgdas1knygko44gkzmdvyk0fpfoci1o34nv1gwnz8g2dgxuaj61uwrb7q06lar97gvogjzdcxo5f2jymtl4sr3y0ej9lyono1wh95u00',
                receiverInterface: 'g0acyfek8kyxy9wsonal68p0ijyanhj8d8anzwvnkqa8lja2ii8g2wlkyqqgr6skdtnb9fyrdw4a477rcxkr2u1fg4xbkwf92l5x1g6p8e3xlx2zyot15jm7iqso4a2gope4qdfmohghe8v43ga9lxfd9b9ll1ws',
                receiverInterfaceNamespace: '46h4f11hd811bzt8nnxn2q3z89lyzad4u4x0ath79d58p7r17qokj9s2wg7l0cw0cbof2o93o42i4zfov8vchvbucbrjx7uob91lt7erm3d12qc1y3g31p2ipky9cdvvdvx97mljbit1jmxjynhn1pef3cny3hca',
                retries: 8566935953,
                size: 1685128784,
                timesFailed: 2794349514,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: '45ve89co0viuiaobwx5e',
                scenario: 'tzp2345eym8hk0l16vt9v30gkk46ev9kgbrjcejiyrmatrblwrqylu1zucbj',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-15 10:20:52',
                executionMonitoringEndAt: '2020-07-15 03:26:33',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'ytnfhel2gc1rj6cdx7xvz1q5nuixgxrsvtsjaa9o8nuov6y13d9z4udb0ucxp6ea1wa2049u872amyk3djxotaz0h5rnejvv1ac3tqhke8xwbi6g8d73xbawc0utktep7xtncoqo3bapbnx6dk1tdj8yle7exilr',
                flowComponent: '0arg0s885xiy8j48ir1z7kdlxw5v1r9l3fr2x0q71d3jjd4tqxau4mvt3utzi8zsbbtbl70avboimobp2p05h857gz8mc1t1sb0zyndk9o8o5socz9doe5afryku244tnq0w71iamt9wb8qtu8gzqhwq8ypygwhf',
                flowInterfaceName: 'pxr428ghv6r5i1zjzwufbilaa98n87ofq9examlpb0skojriawlzyqwsw4sr55ol6jylo48z9liz2rxaw2pzcvmhwv78kdbbomccm2ar1ic3xwa1wl4yb4t7zrs1wcodcnlkxayyeqly0bfwpywjpioztnymvxwb',
                flowInterfaceNamespace: '0r4w8ezlj622wbs262gldva7o4dq44drhh7vidyu9hobvbaectfyugdy07qg0ztnc4kdqnsvcd453ucyxtadizqfk7538qh6g93ewzuytgokyty1l0oqykrawtrj5zzt5x2njboat0cgxdd2lyw0ykcys0hbuiuu',
                status: 'CANCELLED',
                detail: 'Voluptas et voluptas amet ab sunt quae non atque neque. Necessitatibus repudiandae eaque eum. Eius et at at ab rerum aperiam accusantium. Iste possimus voluptatem id id ducimus.',
                example: '4g5h433chkshjoh72emlyzg7gn8f658kacffnmapcx0upt4oeyawthu8r81gqbhb8lhec70n80brztxnuqtu3xhtcntyiqzl88o524a4ml39f7dc0nbi6uap2rcjbsb2cgyls26p033zoevwpjzhw6gz9gn7ol90',
                startTimeAt: '2020-07-15 12:33:35',
                direction: 'os68uiz0u0lj5l8m8tv6',
                errorCategory: 'v306o6qxzi9a3bjtsxl9d3k50aot56lw9xpe3k2gl98vz8sc6hsljhpvsxdl53ckrokllthp8p7ed9k2scftk7glypvqx39sb1gg8quk8k405l2yjj2y4i87x798zbd8wfru0wq1ok4trfsseq1we2pxc56z8zbp',
                errorCode: 'kosplbge5u8l7gs78zmx',
                errorLabel: 'epaz9jddil3uvpuy3uqtgpppqu5h4uksxunlnpbxaa1v86i214irxu1mosl2byix1vcx6govfrtjmir51rs0z5v8admjpcj0btwb61klrenay79upd2ey3y7snjiz4y431vl63t9x2x0zjojasaxza7jxfjso0y2',
                node: 3702763332,
                protocol: 'kqt1n2dxnl7dwju0ynce',
                qualityOfService: 'v4l1r7gzrof4ezjpyect',
                receiverParty: 'xw1htc62d23c37nq0bbiomftzu9r7pobcjyjhana5fblulxhr2d3cns6xa74aemw6fz02nxei83l3ulkw2liimzp2xkmwyxf27u6y8jgalymol5qdkwcolnlv70yiyobd0pgaw0ykf28iqq2hr5z5zlsmgba2mjp',
                receiverComponent: '87r9vko1ixtdhm0ltwskpr3jjc737pa0uquckh0ftm1bustdp1d0pavfjyf08jq2y5za1qi91bnqfin6kzld6v2ck05tu26ps2c53ygp00cmblo2ur62em9jzso4vtxnrp8ek9dagxm4cyerek55h98pd7yi1qko',
                receiverInterface: 'bxs48kdyzv3dv7b9yhu3aynj62p83x6dwma69lwfnhxxcckusfcu3bt8iogk0sxvrjray5j40piukldhlqjz8md1gujbgjhnfrh09r8b4r6exwatf8yjkhqdqhdwwodas30opcbowxva40k5wjjhj2fpcesud2xe',
                receiverInterfaceNamespace: 'nnnen07c5k0gs8yhqbl560fs4f1bd5o0qqqrc98fhffurxoni43dvyvkpgugul20otfttddrqhqsspd3prcx1ejhutflt52od60ss928o7qcyzqq5jy9gg3hhp3pp8yqusy0s245rkqj34ugaugr5otvcdrw00dp',
                retries: 7304436631,
                size: 4487796128,
                timesFailed: 5280768747,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'p1mtasmu35l08cdoe0yu',
                scenario: 'kzibjapaeecqrm8td01bqtmzlvpfj1p55p3uh9pltxgm2sre90kene07kmy6',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 03:09:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-15 11:30:28',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'coxcp24fpawfbn9r6vxisskesqhpi48n42v599w5iwoni73nixuwjfa7d9cbjnzs5wlyqkemlcvi3j8exraygnt0h0g1ab6qxv7p9a013gsiohts83x49d09hzwcu7xzykbpu1aejb36jkqtr3nf7bobvwri27n5',
                flowComponent: 'j5thf5gfl276p7l72w5e6tzjzh6kslyyj2admjlyrke453w6552oo5mq9s94hs4nwrf8cwkgtzjii7e6umutho3cjaxhg4cbkk07nbtodef21pdtmh05llww5bts9id8vxt4lh0msxucjk1g2k3elapf879pc8y4',
                flowInterfaceName: '1sq1cytpsnztm39g52ez57uccs76hmae2gmvttkyctasuhey4c4nevl4yn05hlikktn7ni0qe5er2kezrsvm44xjbpkiq2acbsjeii1jx2d1vsvv5a407mgim7fvgjp69rhiurxc0kw8l403mfw3ad53mtbyh78t',
                flowInterfaceNamespace: 'niqcv85loe060vgupuwsj631f6j6dn3gdd62ymjn6igmlswdmz5ekbumdrdaltw0ixms7oomlfeanci99mw4t8noszi3itp43os4lc0pfda7djsu4ol6jqwg0mbcfcmrs3rvh7wcg42cpwwbmgu9rain23xftl2o',
                status: 'SUCCESS',
                detail: 'Assumenda omnis quo ut omnis perferendis quo enim labore. Veniam quis minus illo porro eos. Magni quasi perferendis id sequi qui iure non voluptatem maiores. Nesciunt necessitatibus voluptates voluptatem corporis.',
                example: 'qvhefg4i0undcd5v8m7he6eikqbb8x1sl14n735i1cwic04w7sezv84fj319vfxcnz1vezyohl9h8c4tt4sfsuz1abios2olzixfdqn45tci8ckmq5l5le9k73frfjvr2id87yi70wp11rvtzic1a51sybf3a4je',
                startTimeAt: '2020-07-15 22:05:18',
                direction: '260wleo47dm6d9vamxwp',
                errorCategory: 'im6uoxuid51xfjoe3tkjefk2hl9uoysvpg3vp1a45gc9bhyb7ytcgxxju6efn3hn7ckvtomb8jil26hyw6qqu4aozdet6loiyablrak6ghexnb2hlws8avia2viyneizwdtvbyyxvz3q9u9j5es9hhgbzexkbi1m',
                errorCode: 'kg2a6bbscha4yduc9odv',
                errorLabel: 'fy87rejwflrb40o5gyy7or3jm7d1erom291daokfx1p9s0kmn3iznvmbpa9st9crsyobh22uztgaz0tbk3jkkxnxxsoix934115xcmsw1fky395dc0ewnfquw09ayuvkl1rtuu6lu2o091q58mvyynym8l2p5mzi',
                node: 6198188226,
                protocol: 'gm1yul8lcofztzw6b1pz',
                qualityOfService: '6931gchv3lsch5d54wzm',
                receiverParty: 'nreidzz8pqiifcmaqt9oxgqx04ouslzxoqowwvzy9fxbzm66zqzjxj6matu8ivdwelqhchkjfce8pn8lgif6a361wanjmi6eo23g4hvjzyxoo4o8wrab1bx6i8xamfgk21iw2k7gv7lr97ggm0smgylq4le3qstg',
                receiverComponent: 'nmurpfwq3sv5ral5idudzp5k9qu3xkwd4njd4nkj4vtswhkmcf0v7grbiwdcfint23oweymhvaepf6anegj5asbp2nfvlyf3fkztbhr9popwo9np3zim73wmq08ywwq0huxeqg3c2v4zschyhhzi28k6nzki25kc',
                receiverInterface: '8oc83l1kimd04rhiiqnvns8bgznac2db3ztcgne1p90e2efb6wczyobriq0jlwwkh5xxrdr766cnt5r9awdro30nvim8x9ifup9jiosed9pa28ni2b0piewaugzbtf6q45bq1ln26g8tczth1xeso9gax72vocxe',
                receiverInterfaceNamespace: '5rr853g07qbpkehklyu1pxq7ohho7moz7hmxkyfw6xqv0usruv42zgrt0xrlx52q3pwypdijinvo3fhoku5zy32dq79ny37blfpa3cjzx574ql0ui86ja5ffx2aztgdwfnyavhv6mfvzf88w1jj9jcik8ep4dq87',
                retries: 1411921457,
                size: 8988407532,
                timesFailed: 4403059696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'zekuujz5puqj13vu6cl2',
                scenario: '1mhear4m26azpvo1zt16qh3rivo53bieml2p0i50y3sx8rewlu46zz0jgrzr',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:20:37',
                executionMonitoringStartAt: '2020-07-15 11:12:23',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'uj3jq38yl4ca8mzyppbf150gohjjaulr24ovnbyg963pp8xawo2n26b1k0eagb61e9gp2tm5qq31nw32qf6d29ouduvllhv7a2czutv3925xyrlu0whcvqi3vojzi4j1djhm0lbaohj2p71658nf4v6spo2igawx',
                flowComponent: '04nmqy1ubn2nnqkyvsus3uv8tu1fwjraob8jz279rcyabd2ycncn0rpd79s4qkc3el3ljlhhn5fky3ire3r3sbfmx9m0ut6bgp0cgb62z12la9rh76nwz9bcyv1d23emam9lvggmyl4cgr0bj2rwf6vguptqa3i8',
                flowInterfaceName: '3lfmgtje2s5t44y59mbqze1cm5yxojtjaeu81922182mx8dyo91nd9mg07v0go2hmajx7q0q6aodiyj0eftodco3lxj66613fczkift77ycp2015lxza76ceufaws5s9z796xj4txijzvbxq81mtq239kt23bjl7',
                flowInterfaceNamespace: '596km2i2hl1uj6td3hkojvze1tlq1603yi6fp1ggkep2u0rs5ygu06h2un6t2z54i2qloxc1cih726vuvm83aklh6knb3p8v8k44g22j5t4804ymwb4n7phygk3hmean781tnpt1kcn8imilo7lwyzu2l7yy9b04',
                status: 'WAITING',
                detail: 'Debitis perferendis voluptatum quae dolore similique iste id est quia. Dicta fugit non. Aliquid nam dolore.',
                example: '6ltjzgo1guk2xrhavbu3no1mqpwqmojaj4i2fn8cehbvh1yqk63rubcq6xflmkw5qr7wb8zgtgbqvnp9bwzthvx5cs9q9umtb2j7hbqsch5vmrm94q87y1xzce0pzu3png3i2ka6jmohzyalzi91nq65i2pqkxgw',
                startTimeAt: '2020-07-15 07:51:45',
                direction: 'rtw10k5eynt51xnnbqps',
                errorCategory: 'bdp3zdjjvp86zt2lvnjttf7fo2dobby2iizc0p3hl8o9zb0cycwr2pua9ntdupdruft34uo51r1mvwgpryv42h0c0f37suxh8bdb494oswssslv8fiif8x6dd9z27bebnvku812y1htc543hl8zjw6hf6e6pt55j',
                errorCode: 'm92j3d5ihgh38a5nr9te',
                errorLabel: '1cxsnnkrcz2mv09tdnwrro2pnn0bqbx9rz1q6881cbwuanrm05mwk2mhr8xqw1vm63sdz8ep5e0bxdqdjluz6hx9oy6wwy5v4ecf2ywv1psddysffpb78da3ablknljxj20qguakeze1arww8z48w42jc5107ebp',
                node: 4687837359,
                protocol: 'iznlazv6lhlao6xq9ntw',
                qualityOfService: '289qlh3crjz4glwosvie',
                receiverParty: '5onzx78v0fhg00aw66zxa1nh0kiepq77zfs64kub2g4nqgen781579v7b56yiw0l9js86eafrvv8qwfx3nqirlxb7dizkwil2f1m6q91d5eoclc9wafaz6zwocqo2m494v5yiv6g70g00gnq9306m89tqwi0rdw2',
                receiverComponent: 'cxonvphgxyztm2f366uln3r95t29x3dbo95fboumj2fw2mjhpttyonfs7uvdosn3az2u2b65arwd82m5yjbdyecppnevvdjgmc8cs6wapbc2ay0mepi05teb2cd8y1knwk0cah8gk1qp40tw1olpxl6qomvubyyj',
                receiverInterface: '4hgw99pssnx0u8pl3la2jiwngkigf6x80n6iqg94wztxewk7m2g2u9c9chkodxn1vmsnif7rgrcawt3loutw19fsrhvykm79526by4czwjr3cf7rw4mlcko9z2secpa7rshiac39ed5razfldefi2e18lp8zobl3',
                receiverInterfaceNamespace: 'np9wwoqnco5m5sqpbi3pqi9zt272jlsd1k0v135i399gu6k1exfltlk91o0u8swqmj5lekxmwss8rswo219487trhb4zkomf1jwftbcrqjf1vbu7w6mjb83drx4jh1k31dve8ff7klfsjuvclu6p5kii1t2fs7dz',
                retries: 8680892243,
                size: 3143833399,
                timesFailed: 8976037759,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 't26lgqnnqpej5l8tujr3',
                scenario: '9j1rvsetdnjubx2c2jvl0wlj3vxeegsdumgttm4jzbp6jhiow1w9s7wcy5yx',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 11:30:37',
                executionMonitoringStartAt: '2020-07-15 20:57:00',
                executionMonitoringEndAt: '2020-07-15 04:27:07',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'k3pv834jqahrtmqbgwoz5rxz7dhlyakbsyuhke7g1b6pciuol54ffgridv791n1cdbakq4cnrduvcst3lz17jvqhr9mejcfse8lfqxfyge47u4xufg5prbryuaxml18253fnaqcmdrbmowvo9ql4l3at3re4laot',
                flowComponent: 'r4tb3f6l0md41xropf5ziphvsgwac46tep0nur0uop2a9g4bymm5qfs8sxaly4fwwpkm4nwg2vqobiaevatxj2b9hf59fi769flk80noc17rdj9ppnnggd4tdg0vjpm42cx32zfokdz3bbxaealn42sdohetvnik',
                flowInterfaceName: 'pg7clbulaxzz9k2v9f07n4xgu1pxfjlw722sp81tgd22nuxluewy8tuoikg5lr5yfpx5bq3vl5mxnbzyimi3cypp09xuzqt6wogd3feooscl78tog16bjdnhrhpv82onn0s8s9m8g1tl6biynd8phny6xb3syqwy',
                flowInterfaceNamespace: 'xf7rn5amymv7mrloltxxh8kz29279ietj19emgb6inj7l81j8657dq3fc24mipvfhdbdkck0c9irj309mwryw4a5ywiy8qmra79tewwqblp6s0xyngq7tkef2d1swessmt52t0smc9uijmyoc7jay6p7ti27vggp',
                status: 'CANCELLED',
                detail: 'Impedit placeat ea qui sit. Et repellendus suscipit velit voluptates. Tenetur esse reprehenderit sapiente quia maxime nemo et ducimus aut. Aut distinctio voluptatem sed eum ut velit.',
                example: '567vx8j1ggxjnlfeh8ar60umc36t6lk3i7q7826lbwisezcgby4h7xpfz12vtmg4idqhdldlsrlrhgudngc323niv4uz7im08u4bso4jh7b66s80u0yofywp8zpnpmsewgoquaroh8l7t88595rgepwkjiguaoi5',
                startTimeAt: 'XXXXXXXX',
                direction: 'c6ryuouk32r8z9fuk5k5',
                errorCategory: 'uflhiof1hqjjqljehwndicnycxe36kdqkr2jtg4u1ajo40rbvevungcfulr6tnp6e2h1f8rewhfaw1i4f6ruyogpa04o9608jqnym6m7qblul99rcvz9v1qzx0jcx89g7iy6j2xrwkgkcjb4ucutvk4euun60ea1',
                errorCode: '9psev1ypqe35j1dik3m6',
                errorLabel: '76wr2ambzssl80p8hwbq6jgvpb4hu6ypgij0sobpp7k9ivlysf9k3oxwddhwxr6s83qikhcfslhksuuks35to0wam003mvy837zl4r51aizax4mwhepdwylktbineg9ad51hfw0pzhrfb7x1ys4qldfay3d8d6cl',
                node: 4757270938,
                protocol: 'ls44eiuw4g713w2072tp',
                qualityOfService: '5wnoohfe4ft2g9jclnpe',
                receiverParty: 'ppc5d9bph1enh4554si078nm5r2ogb67sz84vlywgw1z4ztxswdbujilx6m29y3ot5xxmdui4lllgvv29neoyjs1dmerqronym81s3nf8xj9s1566ymd0c6pc7fmcrc2qq3kib2k15zqfz8rzqvghlr56uaslu7z',
                receiverComponent: 'a22kkipl4gnoixae3u9xc2gbihxzste69f4dita72i9birajmf0a22c28ug01qzhbbrgv36txbjfxui548eg2trdsb9d3qrjmg6ak66q3j1s49togl6mh36cezhc9is1mu38af4utm9oiguaqn5m0onx270mgdaw',
                receiverInterface: '1cch7z9kk5qg9w23pa997z4xd6wfumxn1rtgnoz6yj4qr38dhhgcluwc4ik3yqjam69j7dwkwn3v2vw9ltarto019olyz5jbiswleqeaflumo0bmn9rkwlx9v3ge9xh6ibcsup59la4w8h6r3ni5siyeup66sj6o',
                receiverInterfaceNamespace: '66vtnqeoplfaaam7021j6zs0emongy2wseggeo6mpo7zk3k9y2b74tvx4jckupnlm56luzoi7va6t7c665s46douh68hh29qtnzuv3s1hpto6ewo12zm02ft4astwgr5egr1atk13lvvg3lk3esl3am043cgpofg',
                retries: 6757284604,
                size: 8267592342,
                timesFailed: 4426490953,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'caypt3gvfa3c7d0i8r7s',
                scenario: 'er4j96t5opkey5wlwc6uoqi7nxxp9upq78fjo60jc7dtbzr0r7msqnfwb3w9',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:14:02',
                executionMonitoringStartAt: '2020-07-15 04:47:22',
                executionMonitoringEndAt: '2020-07-15 22:41:20',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'is47eeyc21n4bxtrtd7uw6aafmkyk7tqmtzldbnj02vsq9kxphxx0mrmvsuv5lnugvlz0j8siz0mvihm025k0wyau0g5fniywupvgisi5tpsyfqp8g7yx596b5hg9901lk3basc55axs6jsp0dlb7kbgd60wdaof',
                flowComponent: '1tv51nuau2dgekks2mswf3ndcrvopzwt0473vdvkv79b6y376g9v7rsvx5x4wgwcfcodqxmb79u9hbtvbrnrxvch5bhb32wm3p80oh0kygq5vyssfr4sechgt2htmd22tudre0k9erjelehq03v6rxfw9enxctel',
                flowInterfaceName: 'bl6elciapwaztbv8jnrjy2l9e9toe11r3rh8o707hxd4i93fhyew3zii2xcnzmnayqv9a78pcewc6rpe4ec8a0aytquncfcbk14xjk3g9obyhkesft4g5e6hi3ks599yd75k36eyjq58nnldhxjqz5nwz7ngn8xy',
                flowInterfaceNamespace: 'x7iwhtymwnq2mntrs5iriidw0vdf28d2jtyfkg9f8oh2e2e4efcrfaovfa5h4kaeqcljmllu4wh2h3xpvdfbo380tnm7utkicm9u62jrtgahx0y8mdi3qanuab4kwbhdu6sqcmpnwvj6y961z1egxncy0sax3mhu',
                status: 'TO_BE_DELIVERED',
                detail: 'Laborum ab in ducimus soluta distinctio sint. Quasi dolore laborum non molestiae placeat eum hic harum. Autem enim qui ut.',
                example: 'iofcz1w43dm8swcv7niqer6rl4d2vy5d7ucnih9tk632kp3bu36szn04tjr6epgqwd5gkfbto300vmyadpp24uypds40c3mdanxemtbb5fky92cvjct69o1a841ni4o6wjzfwkgmhwwry73wojum3j1vl23kr0fs',
                startTimeAt: '2020-07-15 18:52:03',
                direction: 'gyf110vsvs66w29gsogr',
                errorCategory: 'njh45ienlcmnesdp5artril9fohgd2g7aj2l41xkdhdhv06srqwjm8ze2e0yq1oqj55vpxt5jh8lcsen83pixo7f5idk9xsd244wlf4jsw4fyt76sossbp4xn36qz98pv81dol8ssvp2nsrgpubu9h5a1tif7uxj',
                errorCode: 'bxp6nd11wt96ac7n71h7',
                errorLabel: 'z96prfqpoi4ddzmx04y2p1wjg8pxmxfz9wbi3p7n3u17cca4lodog4yod6mkfyxc5urd33nb7jkk5ys0wh2hpv7srzxx6qg1eg67jcm7acriv3x088cyw5oivxi7yr3yqx67p7ab9cvgbl0gav8o2vs404qdqfd2',
                node: 7578073919,
                protocol: 'eypb2w3w62wkqh3tgald',
                qualityOfService: 'c87j3s2tuaj5t1z9qkax',
                receiverParty: '0e924n5vkxfrxf3rbiddhjblvyj9krivw5i44jypjiji6svwm3wmvxndvtcjdz122sm04m3ccq79jpkgvcwoafhocxd0mdp1rsbc3beh83d0h9bozsy9xjei20tzxqod1vmkp9iwxkjq1tz7b4e4q5p53b8wsb6s',
                receiverComponent: 'atp94j9lahbyu3ti8nsk6oafykv9aywhwrlymuydor0r4xayqphvo94aq5enyr5n41mpgqzw77yz3jdo8cvjvx8id85bdgwfvjzljkyohamyv70x0sv8ncyhavwhw9hb1et555u1do08j5bxvxss9ekymp1587qm',
                receiverInterface: '2wev8ihtp87aa3fnzz8ui9g6z8t0ujb735ge64p65sdqmfrvjpr65cypncq0sgvmn9964yxfcuxndxouam6bxhrbgdv9e1q82ztf79qm5q8q1kutj4mtn5u2zd2vopk9u6k91uag6al0pzah4gr1noua31wm7cpf',
                receiverInterfaceNamespace: 'q8xqxi0mhenq140byi0y9747560acvrgw3qhjhfrsxnrzf8mbeshbpe27dxthtmilknxatol2zfw8voe0ivuuprbg2xdsgzxythtmwdu67ta3cg1g1cyf3nxn9bb8wz638swhnvo4q74uoldikh5inlf5hvx8r7m',
                retries: 2206160139,
                size: 4042122639,
                timesFailed: 4812928660,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '827d03de-7afe-45e8-b1c8-2b8b51d6e800'));
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/827d03de-7afe-45e8-b1c8-2b8b51d6e800')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '827d03de-7afe-45e8-b1c8-2b8b51d6e800'));
    });

    it(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '97dc0c6c-6bf9-4015-8b3b-f939969aad5c',
                tenantId: '4aa3e44a-5db6-4246-9e00-d93d5c70e4cc',
                systemId: '803ac236-87a4-4cb8-a32c-1f3890f6e993',
                systemName: '6uq7zfdmbmgmxzhlhaak',
                scenario: 'zcxnv2uklh23327nextd12kcb4rgefsswz1t4d323m3pcscsgv8qg907fdoe',
                executionId: '7f231ce6-3cf7-4465-bb00-96ecbe19946e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 13:03:14',
                executionMonitoringStartAt: '2020-07-15 20:25:52',
                executionMonitoringEndAt: '2020-07-15 10:43:45',
                flowId: '66e68a8a-a2a1-4664-9858-25b433c9fae5',
                flowParty: 'j8m5zb0myr83sdxo5043h0ubtiq9b1dm8jarcp4gt8nwdhhnv3h7oqezpbye00f6nt2rqbw5xrdv9on5mqptix7zx2y9b1lp2bvc194ltueal9iw5w5knymr0k2x3kifscbmim2cwt7v5nme2c0w7o5ujie83cjg',
                flowComponent: 'jc4ece6nbekiz08jj6ldw1romsb22b5frdq3yp54uiexfya0f8h6os9e2e7ash3pbc7yb3gpjre96x8yuw1zah4dscxceopmamxtwe6wqyi9te3dbjmasnz6ecix9luw38ptwlfqgtq3rl4s6ep8hzwyy1ofxti8',
                flowInterfaceName: '2wmpepo7d0l6mvd4oi5ub1kw3kbmyy7wvzrziqtltemvuqdb6dc3c0wxcxzktozl22md2uukwir34tz3dhqfh9ocqjjr33javzzn8wynq052hvciuzpchdcgop9xu07re43p6uek8qd5b7tkuny9phj2c8oh4m0o',
                flowInterfaceNamespace: 'e109q7zv4qr2jutv1y3xccxc7e3hhzr3e2qe1kouj41n3f4s4mrrkfo0ypwzlzgqrpawmnlqkbjgvj3d7c60l2indvb3wcgmk7cvux335tl18kysqoan1sah0nrpfa6di35lmxbdjgb1ikgeo12stniblwnghhb3',
                status: 'SUCCESS',
                detail: 'Sit nobis expedita sint non tempora. Doloremque et sit vitae perferendis. Omnis consequatur quibusdam et voluptates voluptas ipsam et velit accusantium. Tempora non consequatur quis voluptatem ex quas voluptas.',
                example: 'utvj8swu0kflvx6i20sw4fpbfcmz1xyri6j123n4tjprmqo4d1dx608not2lumvnxph0egsjn9s996k14lb4kpjukkx3nv62zavsctazmi8wpio0v1rbwk30yqc14q98x4yzeq8r5ba6191u54fk2r4k5dgeczd0',
                startTimeAt: '2020-07-15 07:17:15',
                direction: '23lrs7ab2oddy7hvxyp8',
                errorCategory: 'ky5sgcuuk3rpm1jltwi9sff4c9tsloe9bp3zzdpr02qfe0xfqnz931uys8adkcmxe8f45dlhw1ols6kx5hsme6ccp51afi9uzuddm3yl94mj66s5ucoqt21rn514ad1zbiw4xu0471cq2ha82qo7zkwx0xycjf4r',
                errorCode: 'eqph7s3vzgmx0gt5mblp',
                errorLabel: 'rho2hg7w799szaf39dnzr08cfxyomdrhwdb5iafm47e3odrgp7he4vtdvoe90bs8k5q1el7yi2zmo3qs9geog1nf62mbadiqorzej6i2dz4ibtmgfnc6ff6gjtkwj9ss9tarmfx6cv73g3bhco823111r9h8tlxl',
                node: 1947465772,
                protocol: 'ivfn1ezc2pras3k53g0b',
                qualityOfService: 'x09q0v9rbl58jjvdp84s',
                receiverParty: 'iqv7w3aem0zsp5oj77bu24mjchfy3locwpmxgkjrurvytjdxaoksqsjozlm203w9mhff2l9a77auxk3olg2b1926zkiudsled4ozi317apgxib7d73inxgm0uiw665fe2c9b8r18sqcirnf83qw5m5nfmwbpoyoy',
                receiverComponent: '36l00d9tlp11sie1y9r0jtlhhyhjeerkimq3hdi1qbrrl1bf2t8rbd6pryt8a5n218cyad49toy6jvtmgmgz9r1kz6ayr1i16ckur2mu0pcye95h666gzl0zc6j8e3oabiaa04wt8yfd70ivwysua97arvu7q1xj',
                receiverInterface: 'bsau4dvwt1pjhoq513m7uzyw479ursgtha2qyc0lb8pnw4nokq5tqh34f0jugsm0v8lzq7tr5sfwui4a8lv66zin9zkkvplq2qnyfyuc1ui3g8fef93w8ypwusncf1z81m58gvm59nrmb2nwekdhytdyqa25rqfj',
                receiverInterfaceNamespace: '30010i1s2ej161dtzryjuyfosri10wuc4sc15006xff1k8t3t7xvbfbjduw33gis3dmnrhwukop4mabhfc6vjbls65dptw28tu0kasrtoc99p3tqsozxknq2pgfzlidxvx8ivdo3snrb6wnreuvqgwt05v0tke1r',
                retries: 5474574691,
                size: 8013848507,
                timesFailed: 7264961169,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                systemName: 'dxdajjibq16uhf6tr994',
                scenario: 'rq8amkrj294il8br98xdutmk3fxeos5ck406v8ltn0p8qjrhkgnysdy679ar',
                executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:54:18',
                executionMonitoringStartAt: '2020-07-15 05:59:05',
                executionMonitoringEndAt: '2020-07-15 13:35:35',
                flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                flowParty: 'wx7c0p3fao36gnhdrdvin8zcfdbahf2o1c4zxmf2wiyzspy30gu1pdsyebr4i93rr1c3rcoszfawjhir667k1pljtd8agt8xrzntnws2vqkzukudx6umxefzdpv72saso2ax6vg0jqbp40gwe8ag1hihq4ov2tbf',
                flowComponent: 'bjonosrvpcyhhnlkbuzfcc2jc97s32gd134fn64d3368itnmhyh6vkd9vshxvleeinfghy96j4ys44bcmzdbtehapxswtan6fm0uogsaptzbsq0fix40emjkg39m5j32nw1tlu151kp1dozsfw8xa0xq3wnixak6',
                flowInterfaceName: 'ml7ctbpvi6sekllpj7hh2vd1x35zs6a19b9rv23tl071l6pg8019esn1nbowdtlvccex1uuabqe8ck47istv45oj9dfyzkouluhnp4z3j20n3u8l2arilimee1p2maby1v1pi4bzb29937jy7h4ewxam31rz6s9q',
                flowInterfaceNamespace: 'p7492zfzwbi0xn1czxy6l32aaqjpkmcwznqlhfi615z1lslx0bsicnsf9tm54tez6tvn19eso6k7hxe4fxpdopu0anxc6suev09u1g0xcw8eegeb0mr55eck4p478gqg3dbuk330qyt9p9hy542rdtpjzq80akzh',
                status: 'CANCELLED',
                detail: 'Laudantium velit ut inventore rerum quam harum. Repudiandae odio maxime quidem et architecto commodi ipsa. Ut quia repellat ea et quia.',
                example: '4i42dffjnpr69kenn5vpnays4ctt4zhdctyed0rd6jgq91x8b2akk2ibkwi5scchhxbg04wf8na2f1crw2ml35dsrxd3i0aqgiwjdz8q18vw1as8x31jhc12u2vkz9wbg9bpu6c2ho5nizhinaf0360yzogpqb7b',
                startTimeAt: '2020-07-15 12:59:29',
                direction: 'ykn3ovzpso27ipb67a82',
                errorCategory: '7fg8sk6jod8ddycvv658xnto5ebpt7ooc84toqdyi61bu3vj147ovsjkow2qc0f8in7sf4ts655w1sbtyi164il41rwl9l1yqkq19dkyxi7fm09cs24h1jmv5hfkbvcqzhh91wcaqfekql9zh8zkjjbjpe39s5sg',
                errorCode: 'lwuvgjddoop2bwrj988e',
                errorLabel: 'sxq6dfd0swe2tx6hjz6b5u2tp2q94pamd8q0eqs5aj701ka5y4286du4mhmjq3sm9p9peeout8hhrpbw2f4j9ztvjgi8aqc5tx75iogzel26fj7ssgwtx46fbhzt3v92dttku5082hidhaon6hnlt7r4ty42f6se',
                node: 2859428191,
                protocol: '14hyhlpalmzm3ixg7b1x',
                qualityOfService: '2aftkj336yxwin54ar6d',
                receiverParty: 'q2kpecj2yi77acbpfkoa6fo55kt453afp4nbrdu7rto36qjzdvjromrpp2driidzd9hu9xclytwgl6onues1xp49p6l0vbtsra5a73xd829ll4g9drzxuf10fcwundc1jkdwzu3hexpnwe3zi52b0f6ggu592kyk',
                receiverComponent: '5v4tvwjw039wu2gntj98nzzgnnsyqj51ma4a2y8yp3ypiq9rokv7b9uxjt1ibrydsupn2ms7ljzvw3p5uaomx4agy2tizul58m0x1wkbymuffouu0rkr6h7g1yrpyh9hz2wg7gqhf6boponpirlnbfvlj88vzt3t',
                receiverInterface: 'jhev60xjfxl115p5fu7rh918sphw53fgutnxb90dk0aghkmp3r0a7p6hshagiwgml8grmk4xp891j4eeqb2gcplqhmejf8nkq309di26n63529zny3zglgc0exequ3uql4g2zv7uitkocq7tg6kkcey1owqwyrma',
                receiverInterfaceNamespace: 'eb4enlv8brppzzaikekgc68ckfa6z45qp7sexuigh4wvutg90m728ca1x36qyu6wlmast7yy273fkdfa4jpi5z54szyzj5xoxtzqkidy83i9py1403r9mulhgobo86rm2lbw071ap31e15s35kvz11f4hhqtl9fn',
                retries: 9173106745,
                size: 5182322024,
                timesFailed: 9305675272,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '827d03de-7afe-45e8-b1c8-2b8b51d6e800'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/827d03de-7afe-45e8-b1c8-2b8b51d6e800')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    it(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e8a9b4c6-c201-45b3-842e-f0f9b096f263',
                        tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                        systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                        systemName: 'tkhisws5192lwfeyhe3q',
                        scenario: 'y1o1t5jo4agl5dpiovmco9ojh8fdo3j9sw9sbdcvvh9wtc0a1ss8wmcqshkh',
                        executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-15 17:06:43',
                        executionMonitoringStartAt: '2020-07-15 11:24:08',
                        executionMonitoringEndAt: '2020-07-15 20:29:43',
                        flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                        flowParty: 'fiv8p4izuqjqr6bbgrfa2kqh6zn25cfkhzykcqtk0y8a414zb924lynd0vnks2xf8nzvthph0v6wf42ujha3z4mu5nftsl85yzbb6tij9gazxcpa2x7olxcveltak6f2xt2po9y5cwehqyqklicqn2co72e0c0g2',
                        flowComponent: '013cd8pu1bnuhkpt2n41nni9g84u9w0oovmn5dv1j1nv1rw39fevra51far7cn1yyzc6ezblnjupnlslaho68gmtuicrfj19gk1b7o0l78vwz43dbwepaltvjdbwikd1zgtmae38sc4n7ga48ibpdohvh6dk8k04',
                        flowInterfaceName: '826muchqy2anr7zitzzhoxjvadx77o23miiufk6cb8z4zmfn6vh67td8pbltiynodib2t9z04vz7ypfcddgmtbgibbf58ii6032vhwlzvr2tutbon02noqw81tai209iaajd2ux2kdod9ynjng6hiv02jw93wuv2',
                        flowInterfaceNamespace: 'o3ompzu23l3tl9fgot3125nzhj1xwmn7icoks9xitkum1f2ju2p0g0xdven8136ic9veku3s6ta7lep52ng1anjvmn2t8ul6ysfd8berep36qswogk4kofi8kgk7god8y30m0vx6xykno2j6hjb549qlceps4rpj',
                        status: 'HOLDING',
                        detail: 'Officia non rerum rem fugit. Aliquam quas veritatis nihil doloremque. Provident perspiciatis ad nostrum qui quia eum ducimus repellendus adipisci. Perferendis voluptatem fugiat et ipsam sed. Sit hic quas doloribus sequi tempora nihil eveniet maxime.',
                        example: 'dl4xyk460enl9tjvec715dwpxsy5osomqjgibegybgusq9d06oxl46pb7os39tdv194hbr5rdkzaswk1y3qkglc2y5j6gi4vz23sypuuzaphu85sbnb8wifklmhgxt9aykrg0e7490hh0rc90vcq8ic72p0tqhm7',
                        startTimeAt: '2020-07-15 12:08:23',
                        direction: 'u85vq3i6rc2bg1y39dec',
                        errorCategory: 'fntu8tpyucbz5apdngffdtr73oyaahboar64sx4bat3b5j9bw1z09rye03xljowu43nhu6eayoldd3ul5gm1ajelqdu4pq18pv36cnay8u2ltv9n1orwlwp9dilxqbl4ph6ja39mqdc68ocm58ewzxx8omf3ptga',
                        errorCode: 'x1p60qckmy3oomka38t0',
                        errorLabel: 'wbl7xw3x33wywpiy27w5yiuydh88itlq0mxi5zcss7vf06nneq23o844d9sym2htfpsesgs5wy73yhivxg78goe6ttefu3k4fvxlh5lsbsjg1q89p4086kktx2ycqynz6e1f4zxj9dhwnmberjr9a36z038b2z7d',
                        node: 5167513946,
                        protocol: '683sdw1uj73rav0u1n1r',
                        qualityOfService: '6zmnuo3r0nz5i0afubjv',
                        receiverParty: 'w44hnudr5bzmqfngptgp1y7cxwddle1nu6osj5ktu2er213m9tuknbijws1wbk6bvk9fihhs6obz32y9116qk1k2t4k8utcp65vj9n8u7it0gmrf7rf472kjae4805k4nbbupgl02004i1p7ytx7kuh5psv6fuy0',
                        receiverComponent: '82iebtvsh875yhqlq7r8mcpi03myf48mql7df9pk8rwffb504xf9e15sfodjrf7e5nmr1u5hca7xy17xeu47a3f2tw9d7yz6pqj5xbdbzrg08klsq7u4lbidazj7cmdlnvys5qvjtv89zdfybk0s0u25zbfahhls',
                        receiverInterface: 'hdccm03omtwkmgnxunwflipd7epjakwz8iak90ceijjkgulnfnywcscj8ypu6lds17p0db19c4u146qyb1xa4l4skxosfp5z0djttonbs2jzzix473goskd60hwx5fqauattsb1lqc0m9ika72d2y9cxuxebvy3h',
                        receiverInterfaceNamespace: '48r2mgxl14k0xxhhm7u12yjpip7kd160vynotxd05nqn3zg0ipauv0b8oil811w36qkki9j5lwphgfe3vkp3mqcv0r54ehttxsdwtjt8oxkolssqsfh54pad7kq8kj0thhp6hj8ws6o8dggzv9n7mkbia1g8t2we',
                        retries: 9080081824,
                        size: 4184197079,
                        timesFailed: 1094149550,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'e8a9b4c6-c201-45b3-842e-f0f9b096f263');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('827d03de-7afe-45e8-b1c8-2b8b51d6e800');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('827d03de-7afe-45e8-b1c8-2b8b51d6e800');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e6c6a0b9-11c3-4453-a7ea-26b38aef415b',
                        tenantId: 'f78eada3-6639-4b09-a398-4fa53a78a0bd',
                        systemId: '9ec32586-3f2d-4b88-bf23-62cb5bad1abd',
                        systemName: 'uekiw9xqfh7qvi1rme9i',
                        scenario: '0xdod9mbk8gy90ne4z5l6vtt249vfv34060rbmy5h5tx07oc5ipty1jduqot',
                        executionId: 'a2b92532-f79a-489a-9a02-9370524b6d25',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-15 07:23:12',
                        executionMonitoringStartAt: '2020-07-15 11:13:33',
                        executionMonitoringEndAt: '2020-07-15 18:28:56',
                        flowId: '007975e5-0927-4cf4-9f1d-76ddd7bc1454',
                        flowParty: '887ryiw01ytueo36yaew40bc2z1o6wcutou430am3hc6q863wwvj089qpha7a9cumfi586pf8nhupgpo9sapo8zfyji4z2aana7qv6yhl9br2ug6f5hnoc5vq4ng4t2h7hci2jdar00mlwpdbyf0rxoxq8okizf7',
                        flowComponent: 'nlcsou3yinfxmeyr08oz9qon170d8kofehk0l273ka4ds1ga28sthvlyuxhqms8uqtuzlkwfo2vhy8l6sxcn35gwqci39i2ke0ztphgogfbjxklr3jjpiwzow2ntxlbx00v710an49sxqflvk6njzv1ujt8czj6j',
                        flowInterfaceName: 'cncfqrr9t7eua6dihx55qd9kn87mcvx55dnhphuwhw95rxwi94bnackdkaqvpbjmtpszt442ukxdc8582eikvtpi8ub5ab424lkhqrjgcvbm815ec5mqbeui8f5wo4gnifndcyp7e2jw4e4m5l9149442kd7ib1o',
                        flowInterfaceNamespace: 'kmx0m3dvb7sdoyte05x1ksccud0aov6fhw3tv70k7jm6zfxnheav9lv0sc2kycrcob26qddiyadab0ucnn4axs20nqp04428s3i8zsd74f81wkdyyctt6qb5b956r379r1gt2uzc3ezoifk9yvair6j91wne2x4v',
                        status: 'HOLDING',
                        detail: 'Unde amet molestiae reprehenderit aut at. Sunt consequuntur enim omnis eveniet accusantium qui. Et inventore quia tenetur ut ducimus.',
                        example: 'rgfufghbgtsslnmfzt47ymoaldatd6j5pelxlxgl7nihogx4gntlpo6vaa7ltx4hc2c0mjmjcoz24ifns6ghqsfu3vl35wdu5aqe8pqp91bmp34knbs2jxm6tn5zgtqnho389sixvot0ze2v0jm4oete9ysrguyn',
                        startTimeAt: '2020-07-15 18:21:11',
                        direction: 'r0ownmuzci6ewron0upb',
                        errorCategory: '4k56ymrloumgb41ge3pbp6nvtiyjx3exasdzgmz5a7nlp53k3ez80iknrrjf7fxwkj0xqdcw2x2ojr0nykaeovm5wl86fwxbjbz0g2guwip7wzjtk41f2k1e6mn7wqf2c0yw2ol3wto55eaoo3ccqcohyq3ev1cg',
                        errorCode: '97zprhde1hr7fbus3twn',
                        errorLabel: 'zi5admia2l26v9zs8jkoccgpfbkt9p20550sihw3jamby2wvuer9doztk4p8120qysdfykpgjz5stq2lpnkajwk5k14knmsdplqov47ubabe7rzf0vy8z3gsqw5g0g6rp4vf2407fxh6gcj0p4equ2qg1tulvwhf',
                        node: 1405755288,
                        protocol: '1tdi1tlqd8m3hj69f16v',
                        qualityOfService: 'ljav1yz2wpe4rw2l8ijp',
                        receiverParty: '33qgr50mv4313p6bxxkejfdqa12hh33ksxsahn6muc05xcm7js7pdvnzlaohg03w6ey6fr1bxowoc5c19um3kmk1gmyt8ck49yvdpp043qt64xr8vsouv2jsvzd6pb9q3y046db6e5fhxkivl5egets0q1mf3uax',
                        receiverComponent: 't1txty7htudtmsdv2uxfd3awehger21px7ch6rizjevh9bdmwcdh8xs801yvptgkayylgzpzi2cefgohay1rooau0lvof0bznf89bw4gsgi2bpafwig3ffxgj1lwghzrnpyq8d1c7888m2i3ji7r453e4uaxeshx',
                        receiverInterface: 'tof1yxv5knbvho8p5fzt6597fsktnfnhuww7m3wfms12omwvz90bvlsnpol2st7b7u5vxb39wwimtom8z81kqebvleavuf9g40070rrz6a1tgdtt2w16tzbcdx8oc9887imwzm7rgyfrgwknu2fwl7adw2ouc992',
                        receiverInterfaceNamespace: '8bv8h7mam5x74ej0fzc7nvry6eqzthblp58qb946lnprd5c4kwvk9d88t9nj7sa3a4qtivelpt80k4tdobsadr1dci7hf2u9a6m4ogyeotqry9zl14v3z6ypy9lpo53mrmdqgzujan5z78nkvsw49bdsuelsl1ao',
                        retries: 4258021312,
                        size: 8459096146,
                        timesFailed: 1665648749,
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

    it(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800',
                        tenantId: 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4',
                        systemId: '826afca0-24b2-4e1c-b27f-42c86cfb6336',
                        systemName: 'kj02wii8q2thfb4qzdq0',
                        scenario: 'f28subynjoy7j9h71017szb452nw2225k3il8rc9g34jfoxquwn0vi2vphbx',
                        executionId: 'bb46c976-e4a1-4565-9ee7-2e719b0a0830',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 19:17:17',
                        executionMonitoringStartAt: '2020-07-15 18:33:20',
                        executionMonitoringEndAt: '2020-07-15 03:02:29',
                        flowId: '54d9f494-d5b6-40c1-ad6f-04524a63f9be',
                        flowParty: '9v4zw56dpq9r032fhwmjbj1ii0mj9y0dzumxb2dk2wa058dwte4f2w4mqtjh4pq602jmbt74cdh0okv2tv3t5vb2oyy7u516du1mig8akw89as9qtvm11a1uoy2bmow59mn3rq1f5vny02u1rpwqtsckpmhktwvt',
                        flowComponent: 'q5hkgcr2gvse89fpny9b4bkp8ihg07c07gacv4p0ds9l4njrpz26cl1mag2yl18birhr2py63phpdwf7wtu6qjvygfvkjq5ql0makvqj23rqgvu38g07z6x3sb3ksbgnumj8aabdvbsduxo21vjwxblvq11u5kux',
                        flowInterfaceName: 'qx84lv44dly7qpl91rjkih46r3uc9x8bjmvozkjea4d7va0upj341k7vup772pim4jgw9b0452xsp5f13xd9qalhl6evoze0ig3c0yag0kffu6v1s8ulvoeink1ceih9kfh5nssglex93da16n3m5ugr5nnaso4m',
                        flowInterfaceNamespace: '9afm4m36iea9s55wy799c8auqulwpojocn4s4mh4h7zvap921og7req101cjkj2ajt9irvmp32pw0351quqwow3z37d0aifnwh38yqo7dbqbe09b25tcwdynpv18qchfok4f52om1gsabcfjgdy8eavpgwc0m7wl',
                        status: 'WAITING',
                        detail: 'Sit non nesciunt harum unde fuga dolor laudantium iusto enim. Omnis numquam ducimus vero consequatur omnis quo eveniet. Incidunt tenetur eveniet ea quibusdam fugiat. Repellat sequi aut nam sint nobis et eveniet. Neque ut cumque fuga soluta ullam ea autem.',
                        example: 'i4iow0rnsb3psju137raj2velzl0wm708zaus419uf6ik6njo33nrhmsov3jawxftbmn3abya8ycuhmld086k6c5wyis1fe6ew5orw6tk2bcosebqgxqypbbk4x38fm1xerrt3scwb2885qx3s7esc2s14l4wg8y',
                        startTimeAt: '2020-07-15 10:00:47',
                        direction: 'fznbejq1ws3r31htqfpl',
                        errorCategory: '4u6diud83qwrnljv0wiyupns52fs5o1yuq5yzkeljr8v9206vy5ouv3cxtdm0h935ufqter3rfgljg9lz4iq5lwxpc6jva6xb8tnsvibpw421a4zw9f1d2vo87vbsa65s5iuana5xa21h3kzhekof9n42tx9ltsu',
                        errorCode: 'na6ci05oqh9zhy3k1aiu',
                        errorLabel: 'of0lzcit9bwisjhmu8qjdjhrhxdxid8g0emr58832hunmln07fblf31cwoizx3y8fwl4u02x3by7rt1m6c6a43c4arsfyrvx9ml2nm0vt58f592i9x8va2q45zye6wlst84j62yavk05cfbuhaedneo5bjj372z4',
                        node: 3124966734,
                        protocol: 'parztu2vcvq1zf97d5x2',
                        qualityOfService: 'wp3k98z05lje5qo1glxz',
                        receiverParty: 'kvvy57zz4bjgitib2wogxcrmocixoq09vk6lt2kd03wt9r5ork7lk9nv1c9c5io9h4va2i6tsby6twlj5q3409tlrqy468v561xwk9b0njhi0slw0f9czfr4fmnaqgr5o1m48exvvkm0rqgnizrgwrv9u0jus0k2',
                        receiverComponent: 'j217ozdx0hdzaeww0pco1pjhw9eiivytr7os1uiukrbigjmj8e2wce6zz2brp4x24me74xakpw40a24vmagkv81ago6dax7u9k30zxp17coccmdhcp9302oroeopwsg572xvp6n63br3qqmyrxkna3dhvrihc07t',
                        receiverInterface: 'dkvlbk647cycz38c0ly296u77pc1oqrku12wti8tqdw32u029kcb3b3tkrplyzfqgpzbktzrffm0v1ypbjkxsw4c382zg2519tyz9l5oc5n77wb4i5b95ton5xf4q41msed4jhf3gn6qm24wqmtq1pme5ub0jf9z',
                        receiverInterfaceNamespace: 'yvv1oky30in0rsp2swkh4jrfbfw2hfm11h6wewzm4gxksfe00bpcw2h86ailmwdect8ipj3usc9t7eglgqyqbeczf6nz8rxwzp7k7q36e0xh3d67espy2ymtmys9rsgeajs8x7x29e610nj2rh735o3tth04o6j0',
                        retries: 7172925694,
                        size: 7523021995,
                        timesFailed: 4392616173,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('827d03de-7afe-45e8-b1c8-2b8b51d6e800');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('827d03de-7afe-45e8-b1c8-2b8b51d6e800');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});