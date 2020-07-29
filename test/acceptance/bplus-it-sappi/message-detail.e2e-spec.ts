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
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '29y8jipnwr3gx8znvpil4y87mkqvghzajog72989i72cun9s5q',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '58bzgjmlwoj7txxdbvjy',
                scenario: '86qm8sw1ogrpctsj0igm31q3s1bcuzjjcxrd9ezl944x648a5i9g339zuasn',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:37:07',
                executionMonitoringStartAt: '2020-07-28 20:17:59',
                executionMonitoringEndAt: '2020-07-29 00:37:38',
                flowHash: '6ub4nsmw56275xu3fn54ggfofpml79c9p3mzyi0p',
                flowParty: 'l53g9pd6cvivslqy10bzblpp5txqos2rubqeprhikh2mwkgvp7b30p4j0b28yiq5cqdrtoxzlub0a3ylat3vuohidf1ntuntj9n1d0u1g5dg5q7iznm1u6c4ezuyun8lr8aftr0xkfazx2jp6ix05jw2uzznez03',
                flowComponent: '9culapbpcgm7tsrhgolsgj850ucqli6swjacu1q6z1s997fpansyiidoec4otpqr3gz263zyq2xwamamjekuzuk6o4zedtryrlq86h4ynd8cx4mcjx3e0ut8h7i4ptquvaiwmcd0t7jl9e5reboxx58h59y5v5s9',
                flowInterfaceName: '6hanxcw8fuoa2g4x903sl6tualamtz4wpmkdf80824pmaz2g9jvgvzazhge6ceexd4llnkmo3q47fsrdbxnxuvdstgjormyyeec4soit5rvrdq7p0gib7fa83rt1ro4liacibiq51t9sh31byon2x0b1jfsblir1',
                flowInterfaceNamespace: 'y96jdbkiz3rfroqou6jdjdx9egu991zzlfl46bvd5x0g5hc9sloq0hxwlfmcwa35v3hyma60s9c24t1cz0f3uzjjfakv5bicmqz7i7qpvo2mo3z10r6helxtcniak2ye5oc97zpp40f615xys7v8j5n0a9cylxqn',
                status: 'SUCCESS',
                detail: 'Laborum consequatur ducimus ea perspiciatis. Dicta est aspernatur soluta excepturi ullam non ex et necessitatibus. Voluptas debitis voluptas eum dolorum dignissimos. At alias quis. Aut veniam consequatur quas dolor cupiditate soluta aliquam suscipit. Sunt ut voluptatem dolorem quod perspiciatis praesentium id officia eum.',
                example: 'u286jq6t6d88as6goftcdgz6iiz17d2e4afq1pf2a9xhtj1le3ra5j2q5tutojgxogkxdjdb036ecefxi2mmn42y0nbtzbs0tfout3zbs5w5hn6bqr4gqp0nkaz6ek822slvtc95s7783v5trh98z9mdswg7ydgf',
                startTimeAt: '2020-07-29 08:43:38',
                direction: 'OUTBOUND',
                errorCategory: 'p5mf4sxpnbqiy88pd85y13fkmrtoon9d3rof1aerh1mmzs0oklqxfxsc850a0bt6r7jpbkgs12a9i4i2a974d8aexdvcz44srhktr9brrh3pz0ehayp5y9vg5etraebs3fd420ii6tsn5orfqyqh2y2lj7tsmysx',
                errorCode: '9xo1birly2xr4484xwdvepd29dwbo311418d2itq1ato7lv0us',
                errorLabel: 931242,
                node: 5077756100,
                protocol: 'wsdcx8tbxyuvogfh71ex',
                qualityOfService: 'iltf7x23wi6x9h0rwad8',
                receiverParty: '8fcxz1wbewze5hkq6ahrxg6i7mixspbtpi05v0zdlaba38mpohlef3ujrhu9irt9cfirtv9aw11hjghk4jafbar1b084l894sm11rmdack0zzxcuv9swo9jp61esydnq9wlxp6tkg6lo8uf9y5dq1i4xrtcw8wj1',
                receiverComponent: 'esjof21cbxsafp5vxisgm82wmcxu5ci5uw6i8v37h6zwjpnyi7npoxodczfa0l4g8yl6rgdtucz2fboooyx120qfix87laq8d9new9bz9uhgz91o0b4c93x8gtrysru04n7t2thrdb801wdm5bh3xyzssa0fxzb3',
                receiverInterface: 'i0yhkujo0cl6bk9y1aw1ndq2sp1yi74caw6u7b8jrj9048wvt32aui3uwruh6r44fvj4s9k3ctf7pqbd94nrxcwui51qy4p5y8iylmdgaxi2oj3q1w9uq9ggjldo2d5ewgoe2c0xwk77hq3rze2powz4gjpt86fy',
                receiverInterfaceNamespace: '0hs59o487jl7irtmi4db5z7sowbsg981p9eiitwf9akljn69tefjbht5d0w8bx9x7v97sse8g5ug239f59wnavn4yy7yvi4evehtsjqfy67ldp5med4clorxlxzngqq48ozs6dnbci7csstmicu9fi0ebvvaxeww',
                retries: 3460722765,
                size: 4139201034,
                timesFailed: 5522295175,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '0mf9afmcnu5uhlray1zq0c3azseujtzx2f8awsutx9oz0jldnj',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '1q889gyqs7rt9lc7pp3s',
                scenario: 't4dtf7ox4javcjvjn1oui8w2tczd7qp04lkgdogj3l5whif2cznvafrf2kc5',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:10:53',
                executionMonitoringStartAt: '2020-07-28 22:21:10',
                executionMonitoringEndAt: '2020-07-29 09:49:28',
                flowHash: '6jte3ta35xz0ycf3x19kb6iy25xpqfsjkah5aboc',
                flowParty: 'b8k1welrprhaikx78fycklzc2y0nfvsz8d3me3xqspcy6synff2i62xzvhl155wy8f180unqgg87b2fjelgt88u72doqzveyderhjgu3koluz3pfeuqn35qw26ybczxosattqnv5e7mht4fycb3wacy68aru83dz',
                flowComponent: '68qqz4in8mth7gtfk0e2z8i0hnckincg9phempndeds9nzuk87ulqoy14ldcp68jpfifg8z8jd0isy9gbvoosoqwawjf2cfh7natouq8gh1h2b8junp9b4y6fv6ijk83l75nlqexl1vmhhmlxgec999ncwouge2f',
                flowInterfaceName: 'yeyyqz6eb1t11jn1njxhvb3z9nfp8vcv958brdqcmg8zkydsg4idg4fgly47gvnz5mzx57zt7snusrg4hb2b2jaqx5c4uayo6ype3j328w68fr0aqt8anjum635li1vguta6psv4yu8xcj7jal1bmlgdcm7z789z',
                flowInterfaceNamespace: '1tcm2oc68bndrodky5dc9ip44rlq27rx7cj0irkfm90a8hek5busvk4gyekujhwd90l2hl9u734uu0crdnn0ce66vwvxkzsxrxllehbrqahizwbfnh4tvq72elfefjcf9yvjthue9l49fgx3jag161zyyxrjo4ed',
                status: 'ERROR',
                detail: 'Omnis nostrum necessitatibus aspernatur. Eos temporibus aut est voluptas odio minus qui. Non vel neque ipsum et blanditiis laborum illo rerum. Sit consequatur nihil atque ad et ut fuga et.',
                example: 'esc61fjta9ggx8gco8ewfaau5dwj3v5cbltdvigfcjnkvmvr8ghezznawe5q8yh2odu5158cytqb27lh7fgxyvknoquxtjgjbpz4yfle23uhyry7s5jhzipmz0insz4tmvhj36ope4339a8tdqb0nprd3jtfyokq',
                startTimeAt: '2020-07-29 15:19:00',
                direction: 'INBOUND',
                errorCategory: 'alzeguabboe714nmxhypfqxvjbnswslp2ao4qi8owo64egqietw82x826o3n1ih9o1tzfrwsbi9ivfwnhvirvv3j4y23pepy4g34iwjb62ufsaam6szbzt819ra0fr63zk1ndmpkkrzux743stcxl3i1qxsglyef',
                errorCode: 'ce9c7tcn16fqaypsn14uw5778lajy46x9zgd1h6pt6qqo31wtz',
                errorLabel: 735447,
                node: 7275936655,
                protocol: 'ypmjmkgzyh4ni1cbebjl',
                qualityOfService: 'mafo867fg43obvikc394',
                receiverParty: 'o36qhxccfem9mrgojj9yex7mpk043x18kiawqb7qahl05p02giralplwrvxvxh3qstllvis665s7jfsxjr995mw9hpl17jn83pgao07pv3o9zv03tjawq7nrl9u2mr38vai1kj2a5n7339kp2k7exdiko6kddcdo',
                receiverComponent: '7h6wscvj41h5bkch4t111x18cprf0fo518elg265zuvdn95vajxfyd4r3lob533do45532d95giwt71rpqdne8a1wd3x2askspkrgan640gjwdskh3x2hlqaegqmnko8ruhik2k3n6z1eiy77y10wxr8hok9tboh',
                receiverInterface: 'utv9qzor4qn5k9t4b3dvs12voio0djnh8jfqx0qpb39z1iiqi28692ovqt3d56568u5qq9v5yms3d71ci3rt1vr6rtu9f7j3165qjajj4ri0cqqb1d1ofvf9nit8jbl037q4nwwd5z1zb5sxyv18wr7xdb8ak686',
                receiverInterfaceNamespace: 'k4ovbu0rreorfuo0qd1gyfxymymizqyl827bl67qq50a2dn99e0wta3rxqht0elm6wxb2teti2ixbnefjj6w6qv30s5tcis8h29h33gir5rg8fa13kmvoz69a1hdpa8s2l80r8anyrys3jcwrpp3l1pdap8wz2c2',
                retries: 1445590063,
                size: 4871046462,
                timesFailed: 7165082960,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: null,
                tenantCode: 'i7jf7h31a7mv5l52ekc4b1pxqgrtfsbw7fb5lrl7p119r1prru',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'frk9xc463uw6j0ld6xho',
                scenario: '2c2nal684zaxlnhqebzm7ur5ra8iwbwpe84tjfpz54dh93his8d03z302tdr',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:47:07',
                executionMonitoringStartAt: '2020-07-28 21:19:27',
                executionMonitoringEndAt: '2020-07-29 06:07:34',
                flowHash: 'xz9549ooub79cl5czc83epwuvw9jwogomlm8ym3q',
                flowParty: 'h96wlfyc23l79iu9n65834fmcwe79sejixxt8nhglb9aky2zhqc138l87swj9l0k8k6fm1flkx6hvclqsjd7w6r1ws7nn93q399tfm97uep7f5sih5z3ewlgf4jzmomdk78vws8foenyl9vhmywm5gi20avzedg5',
                flowComponent: 'bfnco8cnbbaf85pcn7t4cf6nbbqt8u7e8ozf1kp0djdtpz3lesahsr66nhuttuefmkq9szydijjmmxe99cjy5810hlyiqhvu9054k101w90shyafguw9mdrll9zq03c01rrpok7mv4dznj9jeooou2zrjvl8xyb1',
                flowInterfaceName: 'y44d644jow1vwdd71ln9olrsy0t4d5oh89cc2lb81ztysk7tookhi15qxufw9ryqldj69z8ugnief9xd3nzxyvunwlh3e1j41pxpynuf2rpleg2grrr5tmfbldiecafudh30ithoxk0i1gtua3sft9zalmida0j1',
                flowInterfaceNamespace: 'nszt1aef4v9v9efdggd2r2jo53osvq2rv577rgc7yu31y18wgfaxi1ataa4faenng9dtvu1703clm5sir8vpoo2l2aeioe82lm7hqm2cghjldnxfaxrqtw8r2r61uysk3yghh0dxmc8khy4wz4sdek90epvxalin',
                status: 'SUCCESS',
                detail: 'Quia hic et cupiditate dolore nulla recusandae. Qui illum dolorem sed. Nesciunt quia omnis et a consequuntur sit. Consequuntur quaerat et sit. Est porro culpa officiis sed autem et dolorum.',
                example: 'wovamm5wag1vzsjwyg9fnrw04gvj7kkc7izaowrrr69i2iafaulgs5d7w7rynscc9nngz61eoygy3bpcta1nkwrheu177zb94xklvn1i64v22xuyg3s34ah3glw9jmn5jz80dxgkobnd2gfxxasxvvpfpp0c4lj5',
                startTimeAt: '2020-07-28 16:43:58',
                direction: 'OUTBOUND',
                errorCategory: '5oxmp7fpq6lu754q0fij754lywb7l5dop4f6lw0r1sg9slwg4gm4nvvcaw062oxyikgum1a758vfbb84y2lycpi8jf4qs1ag0azyfe92ptaddjviie391hkbv38axfm8w7cttoglegyppveq3xcmknvtknzzlevy',
                errorCode: 'puxpot119h5gehvwg1d3vzga2mznolzaj0bj1vhpaa1lrfar2m',
                errorLabel: 458623,
                node: 2845931031,
                protocol: 'gcv6otw7gpn3kyialtaw',
                qualityOfService: 's1yf1wzewmhqjglysdds',
                receiverParty: 'c5hfupgaxzoyjepcxhqdeascvt5u3xqco8ck17kqsuxa1js2rzr9fero1fhbpfizi8naf4yuvgtihjjp50u37aajir5sj1fwg5o0mxvqe5b1ku8sono2aan4miw7zmjf2br9fer9wgp1d4yd68867rghlqfwnh17',
                receiverComponent: '42h7zfj86xe9988a9bkey50pr04oi0ev17cbz9ef7l2aqdqmayi3bkqr9z0cjg6d177pw4pzxdybmp4p7rrleix2dxakn5id1qyiwaf86axjo29x9xibmngq4gllrr4ifuixbkln2mro5k54x662p33w4p0y0689',
                receiverInterface: '7noo0f9vtugoe8aap6zwjj47uylqbl2zznbsdvtwh83lirs8n3kg4155mtjmneync8dhjp2juevs2wrjp1p55jsagywkn6k2yfb1mxzitfuf9uktf2way5c7uvgqdp5y0h4g9181gwidqv4jzdx7kyyp3nw4u55t',
                receiverInterfaceNamespace: 'bm37yc6szg2nnizbjlnettqz1kotimau3paqckivrl7vooten41smj42t2s7laev06w4pzql0geqaw0l4bee0y650ixr80tlzwcmkk0xrkyof5b75wz78wcp8x8ahmabgvhkghyeb044nluneq9hgcfzm3dwlsmo',
                retries: 8354343012,
                size: 3659506454,
                timesFailed: 1492965963,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                
                tenantCode: 'riofooppscwi7y23mk44kv8int4jx1ouy1hzudocoofglv2xa1',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'k9hkolroaml89s9wga1v',
                scenario: 'yk9ovcnmhz231ue0wt24ut84q307zuxsc60walxdlwbs7dk92eww55cdr124',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:37:44',
                executionMonitoringStartAt: '2020-07-29 03:22:21',
                executionMonitoringEndAt: '2020-07-29 07:28:59',
                flowHash: 'halqxvqp77bcgpa6t75gx87121nyel52azhnfs5t',
                flowParty: '1kjeuj12oh4s11zxlppwffyyrlfjckf6pda728vqgce35htk66vwn2mucuppq8qflcfdcst3ot13fo3jthp9za87ajnnc9u4vsv5cpdjx2l0q0fjcqbgr713c4w2sztj13m92rkk4c571t1j2wdgufiqrlzgyt8u',
                flowComponent: 'wqyuho27wt22ja1sqcek6g509h4a0k0e7r1m0kxi28yrshm5s5ld12j723h45knk395xp9f5z42r0mn1undh1fbnj0at0azd08yqvu1sz0jpy8fx5jfkppfzizbcqyalfazr7ph7p89no9yrbttwc0e2s1kgg0is',
                flowInterfaceName: 'y9hwjtxuphd4t98vcnkutqr2ij1p688ff9qdxtdv4xlayhb1zs0re6gp3wl5fj6wvilh2nzehxnp5ld0if1f8zux8h4wgmjjvzxiwjrhr8bd3rmgr39fq019h9jcr5blsbwoqu4wredgagmqh8zdxrngo3srenqb',
                flowInterfaceNamespace: 'sw67f41wbm67vn4hqei43d4hb5ciefcfjucs2dtg0sg9wc6i7nh6hdrnyq6dnxhxbxz28orrz100gi6r97r4bj6m2rj36dwxaljoi3p2gh214cw1xazyofc4z0mcu2qvj0bl4bx68tdk6hl0kq6j7s37x4jzvtx5',
                status: 'HOLDING',
                detail: 'Quod quae eius aliquam. Illum numquam consectetur sequi odit dolores dolor ex sed. Velit et quo. Tempora magni neque rem distinctio dicta. Excepturi non fugiat ratione at.',
                example: 'bifxdy600c63s0mbqvtirtxydo03kmsf0e8vnjvjechrxzmhlgp0f3mtnq4usdp4a3oq425n7gkxfu1qfv9ol1x78a6j0zo71kzrp1x8i352ab25vjm7iq9dhsxdaag7ek3oyvmc1oyrcb6ynaboz645xf8m0vrt',
                startTimeAt: '2020-07-29 09:29:07',
                direction: 'INBOUND',
                errorCategory: '5poj4z1mzxk8jxzy71qpympw0afkg6spizkowz8kt7dnvkxffrm5qx3h8fi8alx6fij61hcpeb6moq64i4nv3nluqi66ioh9n1b7bmkajyxqkzs5th5vzs7ylkw4q9wuir0msm9jei6oir83c4tsxnr4b4bnrl30',
                errorCode: 'gz7h1x1vk9lrz7x4wnasswcmhca2m2wuijtjvmin13ym98puv7',
                errorLabel: 486698,
                node: 5587393320,
                protocol: 's8rn0zmwu6f95ldsgscv',
                qualityOfService: 'pmqeoxhxm8tgsbjvcg09',
                receiverParty: 'epgllz5yqf6xt9xlihgdbrmssro6sgchcn1wrvgkccx8fugg8gslt0z5ioo79b83lx2it3evboygmzkved60hn83e5qfm0syl3e6cmskvo0ug5e5rsiv1ow7x7wgt9m5c1onukxbe66f2pziil98taxbv7wv1w2n',
                receiverComponent: '4jysbbrzejzijaxt8dwbwz6ctk276cwhcsvr8tywxf4m4v4vt857kgmv9nk34oxpjmuk4er3oagw0q663wc1fnyryk3vv983bgqmwpxf6ppy7sw2k8p10xjdq3h7rwa33winxxi12k4m4kexta6g6md9e81eeumw',
                receiverInterface: 's0telic5a8ftik77eetpukogvgnzlc70onyzg2t60drjsgbh32i8c0v9lcoez53nnj510jqaqjsrbi29nbya7qacnob08aeqw20dkocdmv0js28510wj7zgebag36fivmrhc8qtcqpqbtwibhqt45hzegm1qu8qh',
                receiverInterfaceNamespace: '71r3vb9ihijuyriodonl5qxn29pcaxtmtvffdx3ikq8wqcnf3bhah5w8hyxf6m9vq9pfupysh5zpb2wwg1vtjla9ip1v0wtiiuwu3hjrn5kgog479v1hbjcvxaa10wuk0ldqvwpxsz8krp940yxudcxvxrfp5euc',
                retries: 6655051802,
                size: 4842374182,
                timesFailed: 1483462543,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: null,
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'mm5y75k2lb79ofdlv9ef',
                scenario: 'o42jbodvgm0o11amjx78hlrk7r9tfbnw4pqxm0j0hax3auihk2khbfkshtu7',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:49:45',
                executionMonitoringStartAt: '2020-07-29 04:20:12',
                executionMonitoringEndAt: '2020-07-29 09:37:54',
                flowHash: 'jf0iixh9dj87b1u64m4rhu00r5m3jbmihk737jmx',
                flowParty: 'i830raapemwbsnhfvla6c2aiyf7de19q9uhztck5xjmp1he1reajoolzb2z4w5pi8n6a5qjhhtjcuk19fdn5qwf3o1dzjeh69mdrs8ok9wj1no6t6al9d6v6b7x66wj19m1sazdjn614unnelg97pgmljr1j445k',
                flowComponent: '7j825fdtkcm5rdxzpczldt4l5albfqdd3xvcex4kuj716jyqxdmvfxl1inbekwtvm0n9si8fwm1dzz2dc6zyb4tiw6sdgqa1ungk089b3i1a4eew5n8bjfs9lawr45700n6c2bsmvzd6q8fo0acnc9i8kp8c58mp',
                flowInterfaceName: '0xbojs9bwy4u2o0jdbto7tm74z7i2j35hexgbt050rgkmtgg5042au09ld2k0nkeoa3z35qyk7q88jdkt07j0u622rmufoj7n1qchn5ohjlrvynzzj4gs71gzjhracqz0ti3gsuf8j7hfcfbvnowztqngu7poa75',
                flowInterfaceNamespace: 'rheu6zb2tr79xthkdtlodr7b51ow87uk6frgfu7c1galwa8rv7j1tkbbfmt5uf020eq3hxtlkcv004teaq8826qpx7scdkfv98itey7x5zrsa3rk83uj2gm8yiav502hao0iipuawo74s9u46pes71fca6sufsy3',
                status: 'ERROR',
                detail: 'Ut excepturi non. Totam vitae dolorum nihil hic saepe. At laudantium dolor minima quasi voluptates ut perferendis est. Ipsam aut et accusamus quos non. Ad quibusdam asperiores ea consectetur molestiae id est.',
                example: '7f8gqkv21ux3jcac6lr55pvyd62p0y4vjh9txa4hfacy0ulv2fem6nybarnet1okncd990xeem7t4swx3e21zdmgp28wsppytdvi2yo30p7teed6wq0q76205gcg5nbi9ue1z43iqss8j1kh00qty1elc1yd44l5',
                startTimeAt: '2020-07-29 00:29:54',
                direction: 'OUTBOUND',
                errorCategory: 'h0sadqakmpjanna9opv0lhysvydle19lyao8czu9wa2lcipexwo98zheyw81elebap1iko50uln15k40n13p0zwa0hsfdikfatpcity3h3o0detzb4h5u9637sa0hn47rctpv5v7hwqly0d34jhye620f812azyv',
                errorCode: '9lfy517s32axb5orte7ltpr1lf2xq7krepfx88qpiwtb3q2ue6',
                errorLabel: 907617,
                node: 4073779819,
                protocol: '5cnuvqdunn4cjnwula0b',
                qualityOfService: 'psjdvpk8zz4it54b6ven',
                receiverParty: 'ovf47agd25yhl48rt1hk1bdvvmfjzyli97e32zyambehqre7n6a4567jy8lvadnbf0gxbk7nljg472uajzjh90ypqhxd3pqjxt9bmm2ta7kuahmssap52d649qh6n84bc2g40vwrisjvjwu72fcee2loqb14f601',
                receiverComponent: 'boeqzsfz3ywvkv3zyi75m1ydo6ttmn72fmytupszdeggohtnhc6b3ui20k68tdfhwuo7fthp3c0hzyxf79b8zwxf1xpayrqeutbjnex99laac80vriph2thlo4wyxb9gavthynww9u9fn4p90ipx5doppr4b6kyi',
                receiverInterface: 'f9cn9j9kpzttpxejkhs3ymkmuwhbutmv84uvfo44111gnab6u8nzfa1f9q3pp5megihb1vvr6ai7wvvl83ffl67iwln938ec4xjjmf4lynbl0t7uzqtioossgc0jrjr7a2ah5htspqin7hsi600d6dhr6sfmhhxc',
                receiverInterfaceNamespace: 'm7k8wc76vgahs8a2cpr9ut2g4l7og9cz0xb1rrcao8jn0yj52f26miteoajv161l7hwykq4egkk7y2imwx3i3qa5gpb0uos63ushifagslnadiva8arhmqwkxdq8agow64exg8zt6i7vjijl8c6a3m5iw189gwfa',
                retries: 6416957310,
                size: 8907182407,
                timesFailed: 7039416117,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'x2nvbfngnb1hl8x6bqwo',
                scenario: 'tmuowq1ldwwn5wr1thsdzij24zmfx3qj683mmags2vwc58zdm673qh3x9jnr',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:52:30',
                executionMonitoringStartAt: '2020-07-28 22:52:34',
                executionMonitoringEndAt: '2020-07-28 15:53:38',
                flowHash: 'k13slg2hf5j6marjw5unglig0e284rd1hi02y2tf',
                flowParty: '4613mo1xe7u77pllj1bx4ogevtzus9gr8uqgdmj7q9m9eklff9c70jyv5ldd3argsmkyo0rn5a3wcbg4gtjyjnfw9ovpqissc66hhcb94yvafyem8s6nckla0w8z9brqtw597x5augt3fjyaq5wbklqcp7kxpech',
                flowComponent: '9qtw4ee4d41t84aad6pdagflsk1ssl0o6vahq00oeh1jcny5ptwlxuco0x93iz5czz1joxfy6767v1cda41xc1qi4qv21beeqc4har2o5glu76j3csbo8tewm452906rdepwg3qgg47l3oqa6b3hj5tax8k6rte5',
                flowInterfaceName: 'y9kqgdx9rxpsnj5lr43peab4dc8phkha38620i8mok2192b64dsmv889gno8bo4wabrfqi85fem7yfq85zc2x5j053dkqdpd14hd5xyfgdwkbaac4k6oy3z8b6pao6q81yn0jpf9hyhyd9c5o0t93h7ynuw4wx1j',
                flowInterfaceNamespace: 'v90pnheakfnm3t6sg30os1bvuqk9ma195szprdls5dw8x7c0tij7aqmshjv3c1wjnsqr4zyapb99cggg55xu5h4462vokc8bab7bd8d2p0xnpvh5jfb63l29bhfd1oerhsfj42jgiyit4hitmxxzvsvgs1u8i4fx',
                status: 'DELIVERING',
                detail: 'Doloribus facilis velit. Rerum doloremque pariatur eum quia. Sequi consectetur ut at officia. Aliquid iure perspiciatis cum vel eaque et. Quam in nihil. Incidunt perferendis at vel aspernatur aliquid quod sapiente rerum quaerat.',
                example: 'omvl9ack1f2w80oiudfsip70pu05c6yqqj6fretgc1k06zddtm38baubeh643638ck4nefdyu28piqul88zmvq75yx6uifjdy3trpkomekvqbdk6hh26bgk1vs7b761zqb5lkttrkl47hppd8c6ozt9r6xeikpv5',
                startTimeAt: '2020-07-29 11:51:41',
                direction: 'OUTBOUND',
                errorCategory: '8ddoty56pb4pk1f382n3he80w0g4s0w421vp2yrzs8rj7hxvbzdi6gis8iw4ykfh7badb00bc5ck3vmqwsynpecusa2thmhp2m599re33fayrkl9x192ntxcituqgkz5kr7ce5va5llvcqgk3aosyilal0j80m2z',
                errorCode: 'ughjf67cc70js9526mnw8vrq7qt3yp09ddlcy3niq89s76xha0',
                errorLabel: 215914,
                node: 3770848983,
                protocol: '5q5vphsu4bthxjngun2h',
                qualityOfService: '5ombgukn9ib6zmw8e52s',
                receiverParty: 'bpdcgqgcss4pf66vvw5iz3dn08t9anxzbuv7pslionl08o47e9zf6nrlbz3eoxm2e03p1i3tg6uggjz1d5uh1f9yjqq3wdn373a1u8o2m5gv0u6g3xzuopu3svsiq73hbz18tlropxie5v8vc5ysdp0zfrplqulu',
                receiverComponent: 'jxq8o7m7ejeog07pu7le0q2xdqcw53al505cfnkxxs2rv6emmmw6yqbskk21d3pawkx3o26u8ldg2aavb43txrids5zzytxkulx99g2aizmaoy8v1saqlitinlzl4i5okckijc1qampqxisywhdys4jgxofr7mqr',
                receiverInterface: '8pcxye4f488nbvtv8xi3w67j7vh7oqnuxkpidrozj3iq4zdekdvmac64hb6fs5245a8g5qw4g70b7ap9s5b4rf3wv1hfq2f8cpwv4w83pbp0zcfhlu761qbfs5tymbmmkw6h7tdx5zle2fqkgogvbb1j7gmldwho',
                receiverInterfaceNamespace: 'aj4yoi9smadjqxw8tcmxao5bibpljqytde65lii2vhx2caj3nrwrdzeajgxt11hqxltqdvg4q1kq32nbk05s71a7z971943h6hxhqsd1jyr3czjb02isndvobfwz3nl2dwuo4xtzc28tnrekidaczfkawdj50u92',
                retries: 5924470180,
                size: 9856538535,
                timesFailed: 5925565702,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '4f4ll53cgf86n35lre03ggznvq9chvotd1u9vst8j520gm52s6',
                systemId: null,
                systemName: 'n8c7y1rgld5om3rcn61o',
                scenario: 'quelkhsolkmxtnx58gshj12o6dq9z6sglz7aqax79wwscc1dsw478jr47575',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:22:53',
                executionMonitoringStartAt: '2020-07-29 02:21:39',
                executionMonitoringEndAt: '2020-07-28 16:00:31',
                flowHash: 'c8sdltghxd63vblg8nc15f6grldewnmln3g9pnms',
                flowParty: '2xkgybqsmutzswezp9xh8fp9b4ywf05wyjb5upz86f8s9b5p7o1dtcgggtrq5vk3dyibq9f7k1gtz990z0fqze390dpl1zaaktg37nq7qm8sm4yoljl0fb5luq2it2v2wflnaoymj2jbxczd3t1i4qq1s6ypua7a',
                flowComponent: 'sxyktq31yn2d78ct0nxp5jjbfy15jfk23tsmotov5p6fjl0k2wt759dwjje6ddoagz8cl5ny7jqlan8p9pxgu78xn0csyoif7t6whq8kiuih5n4ahr4hda8w9wmw45h8yooco6e36sz1mz4rpwg3kacexqb5trs0',
                flowInterfaceName: 'm6yzhduwxilg6hncvf0bypw6yyxoeoqfpu5b70uoulrgba68ekfwfi1mzpijzy2xzjffw180phbq6qtrx3cggq04kamtubiendh5e48906vxhyqfzx4nvzv5lufju24crkab1l01yslmxhmu2izpjc1i8yakcsy8',
                flowInterfaceNamespace: 'it8fstno9dsgqq7cjqumxp8qxpefwrjkq63lg333bvkjluei95hej2pahxo6bw3ud5f5h6iph79db1ash9ws4mbi8eoowea3u9qwtxyzu1ca70nsrmvw4x8w4vqy4k0tz3fix7lfewdm8gkgu3cits4wx1dj98mx',
                status: 'ERROR',
                detail: 'Optio est unde aut reiciendis sed. Alias et provident qui eaque. Rerum voluptas cumque nemo consequatur modi totam vel magnam saepe. Iusto eveniet sed adipisci et ut inventore est. Unde totam optio ut at.',
                example: 'vjtu6z5xeuqe7wqbvnjzhsbyb4uoq0pafb4dqbz8qktpim8py45ytclcbeai1ir1smsmvsggdqh06jt6kwzudhyrrfcvp3ogcnavmxw4wjgq1g7v7jor2zukdvt4hasv32v3ggg9pfjxtoj4nshmz3txdjpz85iy',
                startTimeAt: '2020-07-29 02:14:40',
                direction: 'INBOUND',
                errorCategory: 'mi9jfv01r47p4wnmbjjxcch6sa6c2xk4i5k2sszrqx3m2y2w2ycpr3q4a839n30n0m4jgemx0vhz8l0jbsjqiuhmz3psi9ifstc2vsk5wssvcjc0d0vq3gd9jsx1sxnv28yisp6280fh6md46vl44u0rkolybp09',
                errorCode: 'ym9rthhl9wlmpid87ghmxij637amr0v0w76vnw1cumhk774hqw',
                errorLabel: 884133,
                node: 6750651256,
                protocol: 'm9tko9tjpfr51tu8ink9',
                qualityOfService: 'oy43pzgxha1u22iu2aq6',
                receiverParty: '0o62o0l1qr28gis66qjgc4jkwosa91h5dlgomfxdelvv090nqtos7let5jdkq7yyz81k4mntf46qez9hc7wvlhp95iegjzfbxjy1xnei68igojhsmabx3nhusq4cjqf89uohmrt3wmyb6c1qu9nonakg3et64w34',
                receiverComponent: 'cyrz0rutm3dmvrbbh5applhe6cdkf5rx6vqt3fk7mjuc55v14nnf8dhblxdovj02ccom9cke461skbxqwfyd1oyak7kgd2godxrbdj4bvxgrcnwx7ov8di1ftu7ty1k6hkx32s9pgw917sq1nmknhvwkb62h0lon',
                receiverInterface: 'o4g9j4atb6f8vsh1a0fn4br19jtgepayyo503dogx39176zy3o8mehju2hhwaqpfqpg33l7637h14z1916cejj3gtn4ozoea1urtapq7i29gvxyepceuffbrvuvr4t565pj3d8o2wz60rkw4hm9ony2nmp78vh2f',
                receiverInterfaceNamespace: '2auihil4816nuginj3af9smpxas9jdfrrubzs22tpt9idkqbqiholp891qz7znnd4nrz0u0gbuoqlrhcm6mca3b6i1ulgmenoo6pjn503tdtrhqv34ykp42gkg9vlw7aftpfw8ybanj7uuch3an2gwtp5t5k1e0p',
                retries: 3857044173,
                size: 6850838062,
                timesFailed: 7986035674,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '3n9v5sgeil6kpu8go3qvlbn02dlk2ua3ok76vpeqyupn865ive',
                
                systemName: 'l6vf6zntbu9g8jrywzm7',
                scenario: '6ao4h4jj4etbrw37b7eixqrgik9r2go5fuusghv9ws1qxgu7gpl19t90s4vz',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:35:11',
                executionMonitoringStartAt: '2020-07-29 10:25:42',
                executionMonitoringEndAt: '2020-07-29 13:03:06',
                flowHash: 'jrk30c21e1u66h5cxvkt77xm9lvgavw8f28l6gst',
                flowParty: 'jpnjlgjyx4863fjo4tc29jj47eh2tzkvfrlcwd9230fdxqxiy5b68big2zsfuzgzb1lg3bl6ypt50k7lb906egq7e2glqp06cjiebx6p4ixrvu5et0keyb5jzzmvhxxr1cz399uv9knlfd7se98imst1sxpgl0tz',
                flowComponent: 'wrtophuo2abbuz9e8ntepaf5djeg07ood75vnfryi1e1xxibrxb1iyf2ay38uo2efcxh9ddti23818yv5wjgs2ninq61y501wgf3ziv3olb83pj769xawsd7chxkc81w49yufccygton3080h1exalxieu1m6kn3',
                flowInterfaceName: 'n8h4s6763et5dbbv885f89eq51etsk088yoy4mn79dr3fz3r8p57y1cw9s7pilcqvm7iivn85sbjqzfucs74cbcrfk7xjlewhgk0gkgqqalez6ea3vbnl4pz4350o6lsnnvmo0ojs0my9zrsgxez3kvb7xpogek6',
                flowInterfaceNamespace: 'twkly6j1e4mv6rjub1xr6io0bpx7oid3ttfva0ny7bcjq5guk7wnm58vawijf3rkp8qjdxc55kxyq55x6lawfy248sd1oynkdx9ftlwq097xzevf86x6btvd3fa6sthuay0e4ccdhmoh2l5pmh9ilq8we4l9kxa6',
                status: 'ERROR',
                detail: 'Aut aut et quia in laboriosam ut voluptate. Commodi veritatis vel labore voluptates id ea. Dolor qui laboriosam ipsam animi qui tempore id. Est voluptate non incidunt sed. Sequi est in illum rem officiis. Quidem velit mollitia aut rerum aut eveniet optio dolore quo.',
                example: 'fh8j875xw39p3jdjh7eju037z6cfyxvuznfip65lv02jferlj3fjkljrpnlf60w38ogz7dgxatccw1ocjwjmf7at08t2luuww1yf06p45dmfwu1d2lplkvf5400byhklg9g8r8y4dva0dbt6pfp00a5agrnq8ahz',
                startTimeAt: '2020-07-29 08:30:08',
                direction: 'OUTBOUND',
                errorCategory: 'vcry4a17mhumqx6fee56k0at1h1k78ck9r7ps8ru0chvtzmll5wu3vvtgklfleyznzb5w74ysp05o933wgpiucxhl93k7kl8fup9tnu2gtvpayxuc98es06fg0g54q37p0z6e3yyv14bcmufoso8826lyfjhugjw',
                errorCode: 'mtm4bt0223u23e4diywfosdpzdibhhlcwfyluu60n2wsdrduh9',
                errorLabel: 560298,
                node: 1131955277,
                protocol: '3f22stvfx6xv1u5qihxu',
                qualityOfService: 'qqazonpudjxf0uz3o96g',
                receiverParty: '6q08nkrs5upmiq87dk0k0009ubhx18mpj37k7lyfh52o1my70lt8ys1jwe2ecffkqhkk6yoviejepldd2f2tb2d1al1y94n3v9tky2yixvas4ji6jtn59hzpy9e47nvvzfy5cjzuokudmo3rsf9ynh0wq8sqtbef',
                receiverComponent: 'np5cnf8559ge2ej7j2j4p3pbmnzhc3zwtxj30c9zfhbe6h74r27oak5ifueictv4a05iwpghvjgjb0k4d9ll9bpy58j69g122k93qwzu0akyi3e43indx6s4j92h472bncuo6bry0xhv3symcdofcxuuwi6urdwm',
                receiverInterface: 'pwe1sr12t0pesch9w6p6lxw517k8aimc2tjunu2ae9svrlvtt5piqvj4148m3wdxjn9ox3o0g1ohgptj749b4erecw06jlbdhr5wyf83mtc753hyn30pzbcoq8rxtdzsm216r996oj8e5icmpvrhq866c26rfpz2',
                receiverInterfaceNamespace: 'la424s5crecl5no98yr0q2firiat0a3onsbknsvwvksr4i8j6wq5s7lo044famc8taqukehnyur1jpr0592d2aq05vkmar4fpf4bd6xps97auzitjnwkfurf6iy55bwgb28sf6wh3bqk7kvc6g7ayh4lls94pgsh',
                retries: 2689823535,
                size: 9612516045,
                timesFailed: 3159752222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'jw6a0nkk20m5v4yv25co31qdzj7fc5j40j5jd4l2pfzsrj4l6a',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: null,
                scenario: '4bdkxwgply7s3h0ndve3ihktt44zt2s5x2etgno6j6egrarurqetppr1m7tk',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:38:54',
                executionMonitoringStartAt: '2020-07-28 15:52:04',
                executionMonitoringEndAt: '2020-07-29 02:29:28',
                flowHash: 'ox5xg66r03dljn2u8fw0jl8e4gzuwxddcg8mic8c',
                flowParty: '29kxxxy8gki6aqi92n02vc7cps92iwx24prw3efmtqk0xj497a7zw8r2yish7kvvkd9v12uzq05u142tovglhbts7urz7nijp5ztu9jvkl288qrpflcxfmfqwoceevt75albi6eb85aax2mcicj6718l2z73es2w',
                flowComponent: 'uk2zlosqd36q6n8ti9l5iyj1mflzcvenp8n82n0wdvn0lfq7xkl96czzebeeu90q1k055ldyck240sn28t4864dv8izrpxja4eng735bxlpoleo6q3m1v78s0ui73t8zbdftamtxf88bh9jgczkqg0n3o19zclu9',
                flowInterfaceName: '1khjah2pa4psbdxgraeqckl7goifgj751wbfxc12tnfdho2qb70kg8mpr15a594f1q9635ur4rb61pi6lqt9g1d4nwrk24t9g344dfw7snykzkdl4iqcqb3ifzxk7krqp32a0s3w8eplsme005rkydo4iaidt8nk',
                flowInterfaceNamespace: '3lhp59hgb0grgxgonv0652sp3o9hkxyeybjfl3xsuxyux7mbyf7uprrk3l6d8n1h9ckbfzbdkvxd89fqouske25snsp943zx06g13jk1964ie5nz6z5ahvda76654uew03h7obfft3d46ry74gcxhju6g5rm3x64',
                status: 'SUCCESS',
                detail: 'Sint ipsum consequatur et. Odit molestiae provident ut veniam commodi ab et magni non. Possimus mollitia perspiciatis voluptatum iste voluptatem autem vitae in.',
                example: '91c7e13tpr9tuvgq001xctpqvgw9k0475kwv073la4c6ji97bh29i6app1ebxe0pql5wdoj959mgz0sfpzk4xyln0c3xjbe0l5850sqghdhcwdz8gk23f31fwsysjjt39q05k6gnp24do8q2r6dftxcg5wbu499y',
                startTimeAt: '2020-07-29 04:50:43',
                direction: 'OUTBOUND',
                errorCategory: 'nqk0wrm4u4n1b34psk4b8twvwvwofh52udykjvr4kjd7h3fsg1xsd7h1hxujn94cb3u1q2872ufl7vmkywo5wupue1sx7fxah1oczl6lzd2gfpkeksunni6alkpc9h38agwmad9oktat1o6uq517y0ekox39eoyn',
                errorCode: 'yrqhfzp462arnhb7menvqmgwdj6godjxsk59zw8m3vkycr7h8a',
                errorLabel: 977438,
                node: 5488623228,
                protocol: 'kns2corm4jsyuq756yov',
                qualityOfService: '1o6pnt14w6bo15snw1mp',
                receiverParty: 'kb8o9xwmclec5xhad10q3pqrq0028w1gju36b6jnxcji9rdd6ja1na8o2d8exudikwjhb60wo24r0mii6tdp5f0d2ha6pjx1towvjcb9bxxfuolwn6mzw86znx4ch637pmwmypo8h5rxhppqbuy07vpl7qjdgvoz',
                receiverComponent: 'zhbbek12zq4zsxu0dbujhu635f06bzagodavdy8i2tuvstehypeih8onhew8l6wxua9zmuwie89y7qbix23ogjb7lqpnxafdejru53tzvuptnn2fzgrhrmy315869gym78uz9u65i5d7o27729ymu55or8jh5thb',
                receiverInterface: 'uc89kdnoryv10a5ta72tdoi2r7t1kwop0jdxdpgu7tijveye2nm0z84lbivsdx37docxf9vq5753z9pzqprxjygxcmchzzpt3ynzeweo8d7vbnn8p6564g4iwn0zza24culb22e87wh3nqs6ecvee0i2wreqj49a',
                receiverInterfaceNamespace: 'dkef7f3dv9wnnkoun88nn6rzad7x3f4akh09hwvtjjur2w6gki1yoalbtn48l139zgoah11tvbw07qhk5qsrqi5skggig8omw8pfw5m53drv1x2pfc7k1ohgtpfy1k8uwhwgo3g1lxz1xhixohea5cph0lbrzald',
                retries: 4711952975,
                size: 1589157968,
                timesFailed: 6654435473,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'utm1ft0i53se92fm1he64y6t1cxtbjntwx2kt4zcohpq6bbmj8',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                
                scenario: 'k43p4b9abnpasi12iswhqalfp6ig7e6jbdfkcyaucfhgjpqgmc5ejy9wzmcw',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:29:08',
                executionMonitoringStartAt: '2020-07-28 23:57:32',
                executionMonitoringEndAt: '2020-07-29 09:36:08',
                flowHash: '94cj72d7d69qc48uhy4hevl4m8wsjh7lkhaga5zw',
                flowParty: 'vrqktw1wqpr2m2da3jvhi3a0a6fyphty6t81pduplkot7bqm7z7hnojf7vcqcy6igacu6rlg167j0vsn4itxop0tlkigu641lhhvtd19ndifcbco23tfmi4fbh0e2omuuaf93c30riib185g6pho5r7t3iroijwi',
                flowComponent: 'av01spkhbh0iut5wfdwj9ypxdnc6yvuvcyrboetyiomwmcu3ggjbs3ri2e52l1jpx6jt2xbajw6rqa5k7rocgti7qpg75li7511q4ar2wx2mw61ja68d430elomf9k4yy4a4tet00bc7yrk3kzrg2xgvqoink0r1',
                flowInterfaceName: 'xlyu54ipzjorfk5jtupcrf3eecgsa3yb3pd4p9zu16fwidhb0e0952b7eozkz192tcoiyphttcn8oxz44qtvu9nxx8zbzl3jzi9wrhju55yv45s9240ifqdvhfd97ho4mxkzw7hii6jq4dea9zczucz1gcaelmgs',
                flowInterfaceNamespace: 'h5i80ptlc59v6zr3n3jpobcimanduvxlv75qfkcl45929ko7zqcjayeaaseg5jdcenmmycb926uiwwv983jl3cn80bjbwle1glpc8h1ny1he6pb3sa8pfq1ka9mnwbtama8xniw8swzfacyswu2rxrfevvtb8a1d',
                status: 'SUCCESS',
                detail: 'Sed dolor ab reprehenderit necessitatibus facere voluptas. Culpa neque enim omnis. Harum aut nihil nesciunt perspiciatis quia voluptatem quas nesciunt beatae. Nihil qui dolor officiis qui.',
                example: '9l4u0l8y77yxtorenfmv5syi47crmfyrynd1dzvzfphhqyn7d0j4gvxe5674859dupckuhhk8yknl96a09lsk1lnapez5daky08q2dhan2aq14vyny2wcspb0oj6ydvfftaxy1661pxkj38e6cvyyqsgro9eyk13',
                startTimeAt: '2020-07-29 12:45:23',
                direction: 'OUTBOUND',
                errorCategory: 'b3qpge1vjr2jmn2t5vd9ho5bq3qp1pgty37mxw8dwaa04qhv6h1rnhr7qh39z4okz28nc94yafoforvkjgxt2iw7g6uzrndk7ruwmgjjnfkudwjqzpj1hoy7p562aejj4koshgt3u8kcl8wcg3s8f0qoenykqsqp',
                errorCode: 'm6qjecint9w090xnt2kj03vgim4f4t1mfo6exwk3v3t7iajm66',
                errorLabel: 558918,
                node: 8545505474,
                protocol: '8h21xbejzhhz7v94kjx8',
                qualityOfService: 'q10ulw8wy2xq2u5qiwk1',
                receiverParty: 'mqvu8s87tpowkhcyb33aau1lovmug29t0i6pucu9ypfbotul09bq06o5bje9mldj4q5awwc0ksy87bzd7jjh57fp6l1bhzo8qex7x0ozuke6ptd66ahcaufv0wjl7prmuyzxvdnc2sc59sdsm9utj8zx5j07sx08',
                receiverComponent: '32wes1hyoinr92mjn0k2ledbxdvgyky2a80773tu8xht71a31ud3sum22hbwhcdx86mxpazyimwi1hsq7gthw368mv7vvpkyp7pkjwu85whjn8n4pbued4mpb8np2fbny4oqmp1l3ret7af9nbk6w6ue2spd3jsu',
                receiverInterface: 'zlqdw84uuycinjvspgrg2k05w8d23uit247zt3lwjd3dc1r16wdpcewpiu0f77h9ucj48ccg5sh85lbct6bwmyzj76mqgd4ifupzmjg0rv6cal3j18cxa9sz6mqrheqz3y4npta444fb1l955mq1rhfjs5xi50t1',
                receiverInterfaceNamespace: 'zedgczubxi7ukt7etsfuvnyvchepccjvf22db6eyi8u55eg9e26hwgdulnarhhfaioynkwvenziapq3b047s7r82iv16k8kv1f4br3fydymddc5rvyqaoo1z0wkx30qwtvspkzpllx9oeuott6dm7yl720hucmmd',
                retries: 8674263001,
                size: 4177322631,
                timesFailed: 2406955589,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'mg6urjt0bllhxacrwml2c9l70xo029f608s6pykph647ayu029',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'g5m2160fq1sysuamcwew',
                scenario: 'gls8rx8ma4p1nalqc3ncksg6u5tegn1vsu44oi66r4i1ulgiq5gwduwm7e00',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:19:59',
                executionMonitoringStartAt: '2020-07-28 17:41:34',
                executionMonitoringEndAt: '2020-07-29 05:27:48',
                flowHash: 'h6xybne5k1traslgw5kc0y3jl67s8klccawrwowt',
                flowParty: 'euxlbnhj6zkmxbgm8neskk5u6mthnctdexhfm6kvu92msyajmy4mcl7klyopkzrilyxavvmhgtnqrz0v9z9b3tcivjvx84um3yayutjmr8z1p4k0279mmtop8evlosqma0f4reed0k41cwh2hqjp3rcy1a02nkzt',
                flowComponent: '3idgb02jtgjfjbb5s8vnrb5ovpr45h3kefowwr2vc818wkh0uuo0eqgi0x7ly8fhez3inztnr3k14z3qaswi77w0dt959629otm3tf46h6uvpprlb1ei2j8ol7zexj3z2nq9lmphenjinulol63zswijenfzckl7',
                flowInterfaceName: 'rjmc17122wsb8pc1uy3qmr6p5upn8so0ca0vgar0oy5gdifyzpf2efqmd6tvwzjhzfjwj9bphg9vutnlkkwrusr9h52eyepdmt3kd6sbvam8rypuc6aabr5ezlb3w5ctq1pglce2o4nd35lhw1ttjv65gjug33k5',
                flowInterfaceNamespace: '3r1brixotzncn23vwn38079o42el4orr8yeg2z46qen897wj3r5o9qohxr6h8ccma6emw2xra5wrszame12119oyppdc9uxqr1jnvw7vznddl8302r016tgrnedpszekczct8mm109m6z7znygxcg94hachrgnts',
                status: 'HOLDING',
                detail: 'Suscipit reprehenderit dicta. Consequuntur voluptatem eligendi ad ipsa et atque ut ducimus ipsa. Nemo iusto ad voluptate accusantium asperiores molestias. Eius veniam molestiae. Enim in eos omnis.',
                example: '50lt0rgsy1yjyac20r335ivjyhklzzwa05ohnrmmpg7yp1z6756309q45k7d64j6fvducg66fup7f9oy6s5dmi8nlxie5se4ntrwozvrwxydyghepd19bcs1tgvtl2o09vh44v03tuaclzxzq24xvl88g8a0wckm',
                startTimeAt: '2020-07-29 04:06:44',
                direction: 'OUTBOUND',
                errorCategory: 'bltnx6pnth46ot7cojo7913ybhiyxk30sxc2ks19zpopj84kslq7g3aq0l3uh04p66lywr4vlwbtvzogc1rjsquokp8yib8ijrazvk8a49nyqix682q73be4fgsvi6id70p4w5rj72d0agugjnyzwkud37xyy4wt',
                errorCode: 'yz091flpzbgqinsac1b8on5ra2untrc7vnl0zcs78da2uy0axg',
                errorLabel: 368650,
                node: 1473524246,
                protocol: '7u3v73sg884wbuq0tvs0',
                qualityOfService: 'n58f3cwgopmwco1e1l09',
                receiverParty: 'lr6nhgelekk8c5a1ucme4bkb94u826jdif04xzzf6im47hve53kh8wnvfiu0zl4ugvlmdns15qheep1q8ex8cmj141uqeba81wqe8m2it32fe78lf5zoxtnryt3rpiq48uyzn5fudrckcb5q7gj33tlbhx2jueny',
                receiverComponent: 'as38he4hib0wefuvxh80l1jbnqxa8yhrc8wnerd4p1lfg02heb257117kl831892vp658c7otg784cvlb1czbo26zpw1kkfcqkg15r4oa7aa7icucrzimue4lwd8p5bwbkuszqetp25iovbu3gn77v55jq2aev9m',
                receiverInterface: 'sqi10ww6sf6nd82vp536204qgebmlojra3biv6wpmhtz3d30cs16qsp8vub145fgyiglelyhgy8qtziwlluyhbrvvgv7r1jb387yzvipl9qyn06l6m5tm8w1di8qqzqawqkxxgjnucg8euite7xukir4m8qhoido',
                receiverInterfaceNamespace: '1qobf3zsuoq6226r3st4nrbg1tu0gz4rb0pjb9s7gst6kr59cwjer762hjurj8ctv8h06k6me9ajdhi8prmfoc54gw9srf8ofqfzeo4cp6tah3sa720jsxlhthxd60stwn8440toyn3tfl3hp1rvb4o6pepxne5s',
                retries: 8174064273,
                size: 1054055903,
                timesFailed: 7155360038,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 't327ma2h9z0qotqwat9xunhughp6mae2yx19i3ysj5wdmrpz8h',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'k8xk1ocga40zrusel2ff',
                scenario: '2fapqx1sn9fntosnpj6m1t7rprctttgup88j10y90smx4q1d37qm74leeaue',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:34:46',
                executionMonitoringStartAt: '2020-07-29 03:55:35',
                executionMonitoringEndAt: '2020-07-29 02:34:37',
                flowHash: '65c5l4nl8pc4600lzlpk6cpqq4wzoq0z3wthb7hj',
                flowParty: '8fb92hjlguzf763xvt8d0cn5xkbi49m97k1axua499fw1d3p1abxbxuvo0koxqs089s759n5jnb5lxukv1retcnnd95b55219a5cq94lf7bxfo38s3vy58t9oy9euev35w2l19ojq8bst4r3s5hvy72zey4xv7r7',
                flowComponent: '3j57f4um2br5939x1cjlu7aoh04vneqlknyb6c8s963yw65923pvv9rwzeb8v5rm6m1lb5gljf5yf3f4yhpcyya0pftwsu4jqneabnb4mfqkg8p43ozi4ckmeplurz6dzdb4n1x43o5f4p0kymqwhw9v3uiqnewo',
                flowInterfaceName: 'vc4l65nvsp92kq4lnellbpl886h1byf304e2qgbawrgr9whet8sr07jjcfcg1reexx0qhtvhfzn9d1qh2imvnv181nmbyiqumqohtpz0nmdyybwrx4qerpw6o1321q9tvbi490ke8fxh23t9inbzbey1tvhbinxz',
                flowInterfaceNamespace: 'rapxrttly468ce3l0b1eu63ec4lf9jratnfdzhgqpx4gkclt365q57086t3pccr2xnnw3zf9ta6jcxgengih9nszeybeawmjrxcapo2ots2e52s3whhfmuphaxw9vqs7inlxmjsnzot3oxq8kid80hoi16kihyjb',
                status: 'DELIVERING',
                detail: 'Corrupti cupiditate est sequi ea magni a. Rerum aut dolore aut atque quis. Consequuntur pariatur dolorum dolor. Incidunt rerum excepturi natus. Qui eum aliquid.',
                example: 'lp5p57y80yj600xy6bxg5y3wqsn98nphj8nka2uc2jqpqwzza0itxuukrebytt7ahkuxvg5a90ci38a7y1pf082sw7ew7nobvtxcc7kxsrbl779qejs89v58opyrcpoem4dbb38zg3olqyydq0ozziqw70s7ytos',
                startTimeAt: '2020-07-29 02:03:57',
                direction: 'OUTBOUND',
                errorCategory: 'wldfp4ier18i8ncjaajun96yufglbuvavhfqm7bm0odtni4ku4fddlkyrv7rvltl91gawvjpvaczyssn9605wckiz9zpori4630pn1b27prvdu7i0gurb8vvn46pondszb1swuza4kr1pmu7cnetc60lhgib76c5',
                errorCode: 'x6vt66qcns6o69t99v0q5hqdr15lf8dn8lja46ap84of4ci1yb',
                errorLabel: 724006,
                node: 9269270236,
                protocol: 'v5l7201gxbj0conazp2t',
                qualityOfService: 'ccdjyy2fbtvxwfde3m5l',
                receiverParty: 'ne7i2t800mkod32mr2bmn6bv7v6d5wi3d0q8c7yilrdwybtbbvrm51lhqigqn8r7yoovcbo8qexyt02rprbnw1dy1i6dqpyrd96cmqqx1rcmiml1dc6v3xcklvz9vu6v1c6u9ctgjyqkcvfijfjh41ky1j50to40',
                receiverComponent: '8hmykr3da763ijao0qh2w15ho45750mzinewmo49u257aaf997u5lsyxrhxdh6fww9gzjrc1ijb6l0h9lpvv6vjyxbnhazfyw3u6dykd5zrpy5by2c7mbeffa6zph8rikza1h0hpxn8adxui5lmq0ouv88h676rq',
                receiverInterface: 'hbdz1obkc7eb60t9kmhnmdlque89go2qei1lmqmb04thnpatuu6qwd0b28pv8d7g9ovv91gucrmm6kcwkg5j97thqn3yfpn3hy01mjxg74fvag0qwmy0sj6ariq0aji0mb3416k0nladw8bptft2caaca3wrglvs',
                receiverInterfaceNamespace: '5hh15kjxxdblpm3dxhfnzv5bumblkfz51vlnax5sk8xgsaz5te2x3u6gtapyfm3k2w9a88aqojigxrc5yemlmaewtjmxjj0tbd4qyot4tzn2q39ilyb21s1w6pnw4kvdzc70ujx3rivo3ssebtjkh5h10gntno5t',
                retries: 3057874846,
                size: 5216395717,
                timesFailed: 1022457925,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'u64ysj1djvogw03273op9hc4xdz5dof42rr17bb2jh57u266h5',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'lfv7u4ohfbgu16vdbmry',
                scenario: '193mdcbrxbj6yxus5bbt6g9qaooer8kutkfcjdbtw6o2vwjs7eaxzyo5gq18',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: null,
                executionExecutedAt: '2020-07-29 03:05:12',
                executionMonitoringStartAt: '2020-07-28 18:06:23',
                executionMonitoringEndAt: '2020-07-28 16:34:12',
                flowHash: 'q60zl6flxwszxxtlghssudaykw0hafl1lslgcofl',
                flowParty: '7pq1ym5vs7p8lwg9t2u52mc4tj8elmitdz3sz4aaqi5v5k0xn9xefcqlaiprpl12sfdz1iby5dkiftq100y6j76dh35l3j6k3l36dv6wl3rgzafa0rosk5dp7lb7s8c5vzrbpdcy3fofm6t7nxbgp80e738wdmej',
                flowComponent: '6hisr3kb2b7y5ewnklsb7cfuivjapmyzx54oyvnvof6n0iqnz8whwx11h4mc15m8dj24wezvlcdo99mu8dshllkamlt6b6ffry3s99099f2ko02r1xtvcv36ji0yc535y74pwwkx5ds5hue3cbo5ykzqisaw2pu1',
                flowInterfaceName: 'nnxpxsplwsuj2qdzmcbte5kmte3hensac3vnlhyefyoz2y9t80ziehskt6xq7hr4gr1m12xfzwfsy4mpc9idlihlrweslve0erw6z185wwqs6i4cozjja4q36dmntjbbzawk47smerd2zi72wuh0fcrylbzxgrx0',
                flowInterfaceNamespace: 'qgcucslrjhu779dpiu4n62ea5tiv9whsw4ygxuevtg7n1a34nwwcxrcy7gih3b9ewt2ymofozlx067qia5gy6mqkbzx5rshc0jg5esrwcbdwpvbeyx8pip0pfmtzf9ig9loxwavrp72jvnumwumsyvao637xddqu',
                status: 'WAITING',
                detail: 'Qui rerum neque neque cupiditate. Ut molestias reiciendis ad ex reprehenderit. Reiciendis voluptas modi ut qui. Impedit cumque quasi.',
                example: '4rjf1uddm8mplccxk1phlx97q54yj0wzi5bp3ho9vf21x653mdjxbv9xi3pqtihkk5ssetek1nuxorffptxrzq43bqh7ajzhbg3bv69v1zm49dh5u01onosib71re665nvxg8g1z167fr3iuqj97fnegycmzhdw7',
                startTimeAt: '2020-07-28 19:20:00',
                direction: 'OUTBOUND',
                errorCategory: '0fw0diwo55by0acjs5c37ecegcd4udnp1pr5s9p0auhgfk08yv47pz8hhpbtri056g0iv3lzvy0ccdzb0ldprp20hikct73ujgf8g6f0nlo83sxwwa8o4kimm3cdo2lb452r7xdlden1b54l4dqeyazz6qsf2qv4',
                errorCode: 'ejcc8ymoh4swe7ppas72g6anujk9r7glc5hz4y7mob9n4bv69n',
                errorLabel: 717050,
                node: 7873085976,
                protocol: 'njbyx9rs0kn9f0ijmor2',
                qualityOfService: 'ci4pj0fjuumhvfov1ahm',
                receiverParty: 'vch4kim6qkffb7knmns7l7h6ksb6trwdafmux655oj479rel3p7cxg96qo98x05ellh6xhnf2pt62zgnx46u6magjqgvrtib9bnzk34g18u5fgluu38sodoe9d9x47wcsqt5lzxgbkfp52brbatb1i2rgd6gwi9n',
                receiverComponent: 'wxjwnhzcam3gpoohbi06qaaxpc16oubkuhet061xb2u3u49fonbmb6an1i5ssamdhdsx8tfi9ynxu1usrg2kd7tnlk1vqqq3ohk5z49x53rc7h3hyq5jpkk1rt2he0izoru35q6out1h40y3xiihtiv45fau87ig',
                receiverInterface: 'qou1kjeljoa6lph57zh93wdcbodc5r1u7ovrxgeqqf1l2fjwanl63tkpxue5s3ilsug1aqf12ligu4bbggdlg5oqtlsep1augz9qamov67nank48sru0pvbkmguyli5tik8cll2avto97s8g4jlhhisv2hk94752',
                receiverInterfaceNamespace: 'un0m7peb756g0ns454iae7zsoxmliqgzhk7ezljasvd5o64xrwzqltl0eaut8etzk3uzd7goqkpnps8ubd9u0cumxdic3dnh4vx01f00hw6eoobrnzknkh62hi3nmte6vbbc9f3vj0jpo74e450a5q2j8es6q55j',
                retries: 2160694902,
                size: 5853596146,
                timesFailed: 5534652178,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'xh55fa5c56875s1sd4wsyb9dd7dsm3v189iuz8e1fvfazzvd77',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'lsguafc4z12odyx6d6qf',
                scenario: 'nov4swyeu0jrnqmcjembtvfr3oixdmt05je1l8ucq9gxdrvzu6pu9fhum2a5',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                
                executionExecutedAt: '2020-07-28 21:51:54',
                executionMonitoringStartAt: '2020-07-29 15:49:32',
                executionMonitoringEndAt: '2020-07-28 23:41:00',
                flowHash: 'ty9mih6jkd5dvoahaw6h3u4tcl8khihesj5ucned',
                flowParty: 'dz8mgpnpuajzglf9hvguz9m1a8di4g51rwkv145i6zunz2mi6u07zkfzzi6khgtohxm5ye55onxxvpgqck0evper8qwn0yqb9avm12ulout4oc0oqbj9pvtg8ddfzln1mlq28wvz8mq7io06jn6bn1hvys9d6qyr',
                flowComponent: 'mmacfrbaxve2b36rot1a0ki4s75mx059ght7myy75v8uwtqkhlaj8nnv5l7h94dlxakoxaazliybu3kr5tq4to9j5akgfaqhi9i66tn4wx9wek3ze99ldmqj4tnyl7kjh1y50hh4jduxof8vh5kuv48t3e2xmt3r',
                flowInterfaceName: 'zu76rkcpwqrxsuphpjzppqkhqaaijvwshvtf8uqas44uznvl8qzs31xe7u7ll3gb4lgiifti84rjkhdx6auabbo7638jd4nnvuaureqr57guk6tfsxs87t2z4x12h0d7hqrfemho4j1ax27kpsm11ynkpk2naobi',
                flowInterfaceNamespace: '8kmgw0x2r9r917m4oq5v5ffafyye17hqfaisirlvr86ey7za93h46r6gfkn1yklloi8alrg56gcklh6x30bytjbxg4vazknxpjpwc7l92a9rhrl6sogi4dyclc4pu9e2p2mbo2g6n2c1ps9j1e2iksgznyb5dodl',
                status: 'TO_BE_DELIVERED',
                detail: 'Impedit fugit molestias ducimus et consequatur omnis similique laudantium ea. Rerum odio similique voluptas qui accusamus aut. Ea iusto similique pariatur quae est. Ea iusto alias occaecati nostrum est sit expedita. Enim enim architecto sit explicabo. Quidem totam expedita.',
                example: 'prltrocenacz7m3nniq7w1iu3qeeomfem17haov3b804c3mbr2aizsh1di8hs5hg1exct4o9k7mhz0s157gh90d78vzmfn7isvt52j2b9te5d1e0v11po4jbqndf4j6nmdckd3rs9soaz22jjdko2g5m7kfly268',
                startTimeAt: '2020-07-28 18:35:13',
                direction: 'OUTBOUND',
                errorCategory: 'scbz6asbu0z8eyhf2yzxprpyt8d5n1ifu573kj6ijfjzhmd3di22xs4bcw1r6nbqqtt8rwa9ko3gbfkc9q01l4hsmx7o9hbrz5ac9nrprydqf6f5z8lwegdnmlababy5c2q12absdmu1xecorwnmlp5yzz6z35nu',
                errorCode: 'ett6lyki9wx34nqkvgyhd9v9o415nzkl4ej289wluds8u6dn7j',
                errorLabel: 621835,
                node: 1006352162,
                protocol: 'h2u4c5arfnrgs8tu8opf',
                qualityOfService: '0o0oo8j3qqisvq0tlnto',
                receiverParty: 'pt08uohn06eoh6nzkcwr61yycpf82lznslc2ly1zotww2bpx94blm9gezaggjkiluwdltmg2hdzn8gpjo5h2d7b7fgp9p8jxs1fs62slz81a7hhtq0swd4ixjrjatk10trw17oekbqfyvpbfw4wurc0comy3qgtg',
                receiverComponent: 'heg6h2cv40pqq8y70ucewlzsl0etkvoygfkflfomgbyo22gikxa4t7hoqkjz2w63lhjbkx5mcw6epxf9ihsjp5b15q74809d8p8zozg0n2l7ezo0o3jsowj70lseo2igifqs46odww9rug3htakm3qs70ux6b1i0',
                receiverInterface: 'ccrfr5cpm7zbonbvd9sr4zv4hnjjonxn64nuemlcw9t0ydc44eefpohqxt53539u9yes8ny7dysk56krrmnssdsk1ui14e33xqcw49fw5cjcjhp392jzt43e5cl2nczir9g63mkwtg781xhk2t3xcejt3azjsbfy',
                receiverInterfaceNamespace: 'bz4obq7q2m2iuc952puji9m4ta6ot9dfhld8l54ok3l0lal6831chiscrkijmcoaq9fczuv7bd65n6572vr6arcaqyjr3zz3hj4wltpjmbwi346gkrazntafdbdh9kg6o7bdr8wc2fntmry3ufeghw2zrb9k5253',
                retries: 4191273839,
                size: 1547852278,
                timesFailed: 6011517492,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '894b1ehfgtxif346su42cfkogjrvbs4gmjllp1kcu40yqusa1g',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'yjsnj6uvwr1h0w2tjfix',
                scenario: 'lruyvvzo1x7zuqwxmg301mh57l4hfjgi3mrxcg4esdtzol0h3mwbwydu8npt',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 03:55:46',
                executionMonitoringEndAt: '2020-07-29 09:32:06',
                flowHash: '321hsbucd763yajd4zx3iso33r2w9ncksf9bkrv0',
                flowParty: 'avvo8jtkvbh49y749daa4iq9w1n6lf7mfh7hzhc26fgl7idbxied2gkd5txoku4uhstcf198h9ycajciydpd7omuq3wate3dd0txd294ks5st1v34l2u90wgnsysy5cbpq9a5mglw0e0xrq2uk9k1m5c764fsxv9',
                flowComponent: 'mkw53wfx8skds9c35p39snjxsjon0ab3odvry6lq7nt58tcesbqemgkbaparqb0n5ujff64pnn9sxas7ebw59l2q1ppcs1kxd0thm1t51idpowg2niszrnt98sl520ktrcxxftvhqznd0558m4d7fs9v7xd3kx71',
                flowInterfaceName: '06k8nf469t0ebe3zdhhyxhj7qxqcda1tpoaiuhblqbw6d6e2gcz8hc6enbzpcv5blyo74b6hb44mbdigkn84l7we3w6b63sjbvcbwodee11grzdfs2jeldhagqk3p2h8ldffwci4j56obb9qr4zwwzmtqi2kq61n',
                flowInterfaceNamespace: 'ud041fg395vekv7k6ztmhaexbm0w1zyz13pcvxq5eisawz8jl34d6hkimn7e1in6i1saadkmurvz5nvx5ihg2x2rulepl287246jo32nx5nird8u2o53ur90v4eyitub7nrwteyswztarspw2hd7593bkpoqyl8r',
                status: 'WAITING',
                detail: 'Ex sint molestiae ducimus sed. Quasi libero placeat optio ipsam quaerat itaque aut quas. Reiciendis qui eligendi doloribus recusandae perspiciatis perspiciatis dolor. Inventore qui deleniti ut esse neque facere. Asperiores rerum hic facilis molestiae ipsa.',
                example: 'lsheam932ow53oremyaxk6qm46n0eb1aeajiwjdsb2r8s4poyxq4ebnxap45gn0su2cjwaiyk21dgisg9mmwtn3xtjqqvk3wv40hdhqxsxcepwrs654x5wi7p9lwlpljftlz3x8z07mck561t7vjnrp5mu1du6v2',
                startTimeAt: '2020-07-29 08:19:17',
                direction: 'INBOUND',
                errorCategory: 'lxy6mrqar8o5r75za65dkq0fcrgmyqc69bblt65d1xzqacpacvkl2w1mn71qopwg20dvu39v4gy63r5zwtvb2dslzpd5bcm4pcgkdux8hl5ka3isvr9mxwkp4zl0k4mywgy5ysoqss1qff7w0ddqxl6p5yn387za',
                errorCode: 'kzxmpgi8ew43999pkujbbutpf0zo8qrlegzkiyhfsmfa0bw2sa',
                errorLabel: 362800,
                node: 1703847556,
                protocol: 'wu6y71yub8brejro86j6',
                qualityOfService: 'aaupsh53c187g6fg18w8',
                receiverParty: 't3ddodjfdtcfviriflbcm41vt8ahfamgf0npoyiov6ifxt94uu67b38roah4k4j216wsmbmlc6ozvljhggquvqo9qkga7fw9fgw91gi8apd9po89apaak9y0mx9emo5b83hr60rtmuphdsvscmb6ax3a60t79xpl',
                receiverComponent: 'tarsnc3lvuav1zxtrm92nuhgs6wvmw2qygyn6hglft9s38oixprg8dxy7bki7bq6h9na1py300vdjvcpem22dqy03ukvh0fnluvcppww1axwxqlt44bo4gb5htidvk4xfy8nstx2emzvth0jdq4g6zwoyt9goydn',
                receiverInterface: 'zzurjhfklosbnmxhp5e7bonk34dkz2ap1fhk5hu3nsdlne0aesu93v0llo9ej6oz521uer5u0ksqwhdnro0wid3ofkh3vvfcdi1r7zxnhi6hzg3kc56itz8921u5nr2v9zebrsxpxb67q2hgvko5b0v0dxg0wsbt',
                receiverInterfaceNamespace: 'ycv6gp5kppsocf5vwvvdw03vkpvs77h61e4bg5wwbqqj7zjb1pxxx0h056d7v82to7knzatg4no2sqym5gdbgzwaxgqt9hu2so803k6ck5aia4f1w23y199mb61z1vo622q8b1d4mlhcq5kyzhxxjhd9pkidwtco',
                retries: 6033476159,
                size: 9105114748,
                timesFailed: 5893506761,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '0d5x039d4gjzoysngeruwbdecxi2g5eidx6r3b3en094w82dx8',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'wo8d8rh2pb2a4j2dtns3',
                scenario: 'vtgd9xyxkvn1znuz2g0lpm05tgm8w78m7dsq4pl97xulsrxdkxmlbanlffqt',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 11:52:00',
                executionMonitoringEndAt: '2020-07-29 07:42:47',
                flowHash: '4mez8qd26c2doqkbqhhsm356xl5q66vgb5c8cbpu',
                flowParty: '26n8qcofszlrot909c65ilu3oytsq2rbg4sgva6mpnlim4804aigfzfszdrbfjli3wbcbd18znrhrtlme67uivjwn8hfd2qcg5oz2bene33i8dl6ovcm9587r20447v382l0zyozk0d5wnefvqqvszjsfm9e0v5o',
                flowComponent: '96tg3m0qj9snkqrvxybxbb1teqbcl711019npifbu3sh2exlq0xdmue9ywjgkngbqbsmgtkraat49m2lmj1pyq8dghlmvp9mfrcq0vqqq9vsyo9hqo2kh7tru5hc0ke30twgpq6s7rcq26yrx2gj10lz2ae7h197',
                flowInterfaceName: 'jxmny5sfx3gj4jv0niirdvemjlpro2if5mpvsvw6a0p0ga71h8geya0jlko2obqncf0eb679uvu88ml4bi52qlecjlfz21apf14uixqzurndxao9ki0rl5ycxxe58cxlutdf03ags3e6gvmjcyvak0v878qod6lb',
                flowInterfaceNamespace: 'uwnlu728me26m0y2olv8vpwn2g1efrgxenf8m68ocqpwj91cdda7fqftd5cuiqeo7njtveiew4yvxnt63nd6h26pwr3d1gvubpxtchhtb55o1hh5raftx0wlz0aedlho592iosayzl6cngnlvygex9agkysh5v5q',
                status: 'WAITING',
                detail: 'Molestiae quis ipsa saepe earum. Earum perspiciatis dolorum provident est. Omnis consequatur dolores voluptatem animi sed esse a. Quam suscipit aspernatur optio. Et vitae corporis animi aspernatur cumque.',
                example: 'xv452k6xe6222urv4pvi0vcoislcwp3561zub1cur4e0ofk8jx8pd4wfwdbnj0s1b71ryhu9h2zpm1lcp2q6pf3nh9cp5uu6kvvq6ec9x91iiq8engd20or18z09lxo3i83hdn6wfd5q0tv7y02guiultloy5r96',
                startTimeAt: '2020-07-29 01:00:10',
                direction: 'INBOUND',
                errorCategory: '8y05p1e3x6a4ovs348qhsri0v3ik7h2b2togn5fkgyxikgiy5wet8vyip2dlswg3173n586drh2gfsjmvocutk2rbt4isjkcf8dlabzc36nbj2wxafpzwl6n8kl5jm0zbz9sfltq6uz8d1cvs1a1gntevnn40r53',
                errorCode: 'csofrnzgd7nr8j72we4d1ftjybtqgsvre15dekzn54bhldt380',
                errorLabel: 531293,
                node: 2183427191,
                protocol: 'c6f1mpmepqo2rzbddr92',
                qualityOfService: 'sgt7xlxgmky61ooap7be',
                receiverParty: 'ghy5bsqv82t792aeg4j5xjn43qo3rt5fb3b7jko43wmyzkx3uhr3d46x9gxabzrggx0739l36a0qc64qacsa8aip0tq3mbsvqrse1ks3vf3ykbi9gbr28moyzjbliambqsxu3qogjxcd7lfgm9avcwtw4hhjr37p',
                receiverComponent: 'ae6fv8t4zw7zywrfearmirnpaxwdi1j82ipx43pr4m6f956rh0qi1ifmo4dub6sllk3yzuhza6crax7cb9cu7zishetlrm3evyq7vevc3wozue9u65tqcoh3gkkumymsmlxcr9a0te5frp1fqb5vrl8h9jecy458',
                receiverInterface: '2apc3cflp0t7tb4m7eu18qi939rpc0tl2yhmiekpaaa7v3rrq6at2cy7aqq5cslx3m10zkhdf279hx7nb9fpliczr6mkb6k9uxhnj5lb51xm836d65acp93bw9nu5xlw5x55jwkx2imbiz0vjxtq0lfmmzmc87kb',
                receiverInterfaceNamespace: 'umziveymzr6w378kel0ve5k2inx9g1tn6rfiiyw22kxfrolqm6xd0x2xw1to5bqxm9agcomsu7llym98bsw6a9g7tqmcn3146azkwpy8ze4yoe2jq6e70ddrnqou2twiz4p9ibw6voxca2t116lpyce0djok3956',
                retries: 9367696805,
                size: 7853457149,
                timesFailed: 5446862566,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '88g8vxpvuq58456ztgbalr3fsi87fkczyqdcrcreen45ks1ti1',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'nttrbve4mdf8sxvw49dj',
                scenario: 'gcnzjo6lbdi1j4nuf1dsq3nkef0h7mluwkc6uwf4bh6qibf5q83gabszhziw',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:30:39',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 12:49:05',
                flowHash: '35smf51pfslc90i5tklaux72ih6ae6chvwivjo9w',
                flowParty: 'r06tdfja9p13k727ydwfj3nobh2r8ryuu93znr73k19bt1bct3ybm8s6p15ddxko6xxv9wx0b902goghht6bk0ddttqv389ri8fqr342as6whn1ce0pxrvxqw4ubymzyovlzmimdc8oc2v7ab6kqt7o5rmavie10',
                flowComponent: 'kbupvtx0g09gs8ytraymienn7ug78lq1yf3e7d92brgzpb2hpocnjw8v9tnuqbilviep64xagd2hgdn3fh7c4b31yx1gv6ryz3dmehd8n2o5nvulxmcmhq71q25rn3ou8b8firoyzgtcblzt8wyhe88ht9zfo7zo',
                flowInterfaceName: 'h4ifa0arcyy7a96lqjsxgvn1pfp8qghq6z06k496b0noa5hpp4jzo8nma11z5hrs72d2xdtgtw1guebvkdyt5sgseq24taj843pkuagj6i4txsmge00cxvu28ui0wt8qk7kjhbgt5p0zszpy6sv10x68hzxol114',
                flowInterfaceNamespace: '94p946lgffoa68mqxxp3nvrlezajve0acx2zq4np4mvpejlnpzq3n7lfqxxfceikux5lbz1sw3v2uz04b230i5ycsygfkxmht9joxx3iqyneeb0itgivp8i3vd33u3a3wa2f9t1145q072mmn28ve1k73aedh8uh',
                status: 'DELIVERING',
                detail: 'Accusamus odio quod labore molestias recusandae tempore ut explicabo placeat. Possimus nobis totam id qui ut dolore itaque accusamus dignissimos. Perferendis id modi repellat sed officia minima enim deleniti.',
                example: 'g8w751m3gzxfm6ii266f7ifqlp13q6z5g47wy3lryxi99muzfrjh9hkk9a6vk0vgsvmm5mdot3ll8wwz1xkqeasc7y6tfhovoke0hr20jacosaxnx3q1vc52cl59q8mlr7ktq7zz16pl5j3bpnpmb7ixjuw7xtam',
                startTimeAt: '2020-07-29 02:21:19',
                direction: 'OUTBOUND',
                errorCategory: 'y8byoy4vg6fyahd4xtb73b415r1joyuxar8hnx4s925hl40icnznqnofehum5l6jtv99oa83m0s03b5v2v20d4t7jo8zbv3gsj6dak59tl4dmor4r6l3sz5rs0dpdodba17p0xaymamq2m2esqf1301y85evsby0',
                errorCode: 'ncq2c7a2ljy2ye980rl62utl6cvxankugn18li2he0kd1tlqrm',
                errorLabel: 753967,
                node: 8011870202,
                protocol: 'i1ln52s53cbhk13hy7ao',
                qualityOfService: 'sakh0akt3i604antnsed',
                receiverParty: '3m41q0ghsmkvx84zcw14tp86j94m58ts11agwc3tgg3zo4uekh8h8aqvt2fukk2hk0zrqd3goh49wd44157gtpxk7atf6m5uoo46rhs75cko7vb3vhqx1bl7pde9wvxm5cjxq45ft6wlbe73rl3urc8lt7wigjp0',
                receiverComponent: 'ah1cxr0tgtz8sg6fjwnl77yd0u4y6zqth29h6he02xk0e1jy4po5j08gmh7u4fn7lxt33i61hta2y64kakqsvmq997oup7wrqgdx7y54p5j7qz2zd7qdsc7n2bn56h2fyy36o55bfzray2qlj3puu2ziwokoc12g',
                receiverInterface: 'yy8nw9afin7n12exjvywo4j9jme7kby7dw6apjrj268t8l3g0oa5plkxedsqossme6u39hwc5wb64jlwcwausfudwqqv4ew0g2xscnbrsblpryyfr21pfnxg7g18cd2xwznqzt0zftaop6lq4l1665g1pzg0qmr6',
                receiverInterfaceNamespace: 'b1j0tjm53jfksituaufm1tqih4mgnamxresowbfz5q3cgoof968yqykajv6jj1u4mtvavedqjocsu259e03jslvuhrtnwuwlkwvf82i473zi6tofq8hmhqpjcpg8t6hqihr0zvg6emo1cqyk6voydzl4fxoet13k',
                retries: 3283110518,
                size: 6154821722,
                timesFailed: 6357741850,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '4a0tce6ouaaw2zkhhaifskcwttrjn0gz7fnwlqrdcs810gzppm',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'sul9anu7t3cz884zvy3r',
                scenario: 'hh6jfr245chd0pzyg8z7wngmxjvblhjor7p3tgh1mlkmhp8ge79bnhtop098',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:55:12',
                
                executionMonitoringEndAt: '2020-07-29 11:31:20',
                flowHash: 'zgi3voehwritw017z1e9xw9h7tet7quyx7eu256c',
                flowParty: 'ylhnbcdj23eb1ywgmuwtl1aqc82ntfo4qprgj5ze7u1jza17jlppbwmdg6yrqusk0a7yqnacna3n6d5w8cpthm4lo5z4i2wkuijogvuto2o360et4tg7xxjdnrm2virufwofxmpl9expjjpq1j2zq09ujn456gua',
                flowComponent: '12sfczwhwkirrlp8ioakb3gqrtcei4mkkfp6iytbgef4hnd3iqmi47v7k3mwzpb80uadu3pkvfy7aydh0fmt4aojq687pdpnxe0kjabqzurv7rcbz6d811hk1sg7vqbkwpuhu64fhok8568hps0y9u0ao3giuawq',
                flowInterfaceName: '28ki0vlklffx63srlxrpu97bi4rimrbd5xylltunlvp457s36i4opw0n45marpixx219ap103vts9uhmtri9h7nnhdfdspy0vymypwuvif3wynjpx7refgyjhupss6akw315o3jzg0xau8susxg2w9s06iqp4xf5',
                flowInterfaceNamespace: 'ty03m5vlw38b8tqo6ultfvcfo06uar16rpnwnt9vf9v1el4d1emjlc83c8rsu5buzvcvoe34ou11km1ili8d5m5ivqsr66r8770cbqnfpxwa3i26810ovfazdtenza2xqvca3lcmkexgzdmre43e1ffz35q2ai15',
                status: 'DELIVERING',
                detail: 'Qui tempora quis consectetur repudiandae tempore distinctio. Reiciendis quod nostrum eos ut voluptas autem. Et earum placeat repellendus magni doloribus eos. Asperiores minima sint.',
                example: '09rdfkm47inl4avg9rbpmb06bbcmg3day2b5mmsqu077ey7hdmb0gy4d9705a7h0t5ujlah0mreo7jus58rzb7fi0lejzgu1ut4yetfgml6k8hy7s85s5dd83yu0yfhu66zu7ixdv1lgcq5blrmzbfrrct1ct3qe',
                startTimeAt: '2020-07-29 13:59:34',
                direction: 'INBOUND',
                errorCategory: 'd8lg4khtgof1dznqmn7b19jc7pqlwppsrd6warqgn13k303r2xfyixnqamfzvlaax8iwlffm4vri5qge8nc8hruwyfmpleua33vnw72g9s2h2c9bosvvseae048oeg7pybpeejsxbe1ffr1pzbaqrpjcob7m6nw8',
                errorCode: '82p9bszuvs0u4o8cmue1c4lslppa6vbwbxdk22wed8jfznwcx0',
                errorLabel: 237382,
                node: 5617321916,
                protocol: '7wqnryhkg3zwdkaoa7ci',
                qualityOfService: 'ei3oyuh6260jj8k78kxd',
                receiverParty: 'mvkoc0j4m0nx32jlycs1eetd7lcl7cyzvt01zrqrqrfiyq4sbyflba2ux4fdhmx9z76hp6xyzyrceuxi1ohx4rdkyhlchrtvjih5hwuys7jt6g54ij87lde8sb2lif9nao8gbpiazmeb2rxbdbiaqw0mglq4f10v',
                receiverComponent: 'ul1569f4datgtxl9ondwtyz6qsyyih2q65lhmhvri8k0z3sjmi8j7k4ck18twqaiolaudxg7od43t6xsnt1bckkae7qbclyjjss9slgsl89guf6qmnjhm30ogcqzip9ggn9ccmf1u4y9xt587z98gwyswkot60ti',
                receiverInterface: 'gav7cc8gg8gecdkgqp5rzjrrx6sfsa0g54kiohxhtm8yaom81l5bu4h0pd5ssurh5jlwf1pmyzs0f2bfxhbjagcj7jo57w5zb0fowbnxtt4wa6eqjxv0jdppyziej8edz7n1h023s8dwyaelcc9v3sjurpohcwfr',
                receiverInterfaceNamespace: 'lgpogpksey0nc4rhsh46k4aatxi6jq5qpnyggjrfmi68f70ohaznme6pgrwdk4z0gpi03pilpsgv7lq87y5ujy5vanx1oneot070j78mx7t4ror3o9kcou0av268w15ft1i3qwddq05rjux00mlbh8ao4pz04n0a',
                retries: 7694221963,
                size: 5657387437,
                timesFailed: 9727222302,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '8knvgusdfc3szx1fvpd9puxbdeaew0687iprn422gx0ivpy5ho',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'akdcqtw1lkadrt11zmw1',
                scenario: 'b003919x4bqz0sna81khw085d6le9apb6e6tsgy7ca8trowckgn1gudoi1qf',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:10:02',
                executionMonitoringStartAt: '2020-07-28 19:06:34',
                executionMonitoringEndAt: null,
                flowHash: '2r2t4ms1lmvvubfao69q73s5npzoo2pzryb1qy81',
                flowParty: 'r5wevfkt84yh6t8e5gvksaagko0rftjkdru06icb5avyurixbn5pdk9z5cndp04bd0d16srxzpjrxp2vjmcnr6qvxm7edcr1gkzga2ovsujuc7xeabd2sypb8sjh6gicf34wbl352qxre68ezrolfncn90tgkgxk',
                flowComponent: 'cc4rkswsjthyhodoyaf2wgyqx4yqjvbyadfo49mqhriefjth900g7n29sdr9e44eyrppkpmatpp1r5q809m6p6o6teh286yk5dxsyokuboh4k8x5rge3n1hh8ndccrxqc6in7uam30wojhnk1lybqc5ygbs5ohlz',
                flowInterfaceName: '6pxhhztzdo7ps1if80fe6uyjm6x4trfge6819lpa5d1g9gycfiidowrk1jdatmvs3izedlaw4p3si7l3aexe6qbjm4bnd7kirt8g75zw26gznczwzmqvk4rfkayp00omvh4qeen4hfndmbv3muu49af3zz8q1xml',
                flowInterfaceNamespace: 'eh1bhpimle0wxnk1yxe31oymfmn105h5gw7xks2mlww4uukc03b20ze6i3eiyinj6ipves0odpxjdjqure8sdz814i8oocvimk7f4isu2om1m2oxzhevmae0el5iuy3i4l31lteawno1wztvmz0sh2m4vl1tzci1',
                status: 'DELIVERING',
                detail: 'Magni sunt aut molestiae. Ut voluptatem aliquam quasi reiciendis. Soluta enim incidunt aut cumque ut. Aut dolorem error iste dolor enim assumenda. Sunt iusto odit id doloremque nostrum exercitationem. Ipsa doloribus animi sapiente ut ex voluptate.',
                example: 'nn5kejukjv80rfnpxfdpaehdaxdc4tslqj3f123nlz66fd1kefbhhagn9k8bmdsn1ky6wrb3285o4zeywywahursaeq3wx164w9hjg0isc9kd260n2qbtubmdhoctitoeuk9tvbrzswn8cxczh1k3viritg0xrgd',
                startTimeAt: '2020-07-28 18:15:23',
                direction: 'OUTBOUND',
                errorCategory: 'vvg55wr5xh892rr8c2flv2znao2t8h4k4wxnph7tgidrktr1rak1bxhf7ikpnmszrfh6qv3d8gho5lbourdjbzl7wd3sfgxi3klocnp72fednnp9sxxe6n14a9hnte0fm18dvlu13toceni0kymb361qhcp8rlx5',
                errorCode: 'fuwj3lrr4a19wrfbk8hvcfdg2z3wm0h0lkr8nj14vgerqoml0q',
                errorLabel: 367037,
                node: 3042976561,
                protocol: 'uoj0dekz6tiyofs1xlud',
                qualityOfService: '9t0tx9tnv3jcb2q1wad9',
                receiverParty: '4pmc2wqglcie462lhffkre2lb0anfjgll0wlhf74rumdsw41rovhpiimcqc958qtdp280myvrm7gmfhz0w2hc0b5qlr9oawghjg6k4xi2n464mlly0rescm1gm7r4h0a39of4e17ht7abpq8nuyy2y58mfhn9y6d',
                receiverComponent: 'rq7b88rg7ju1fti3immwps2c26rdig2uopjsl8zil0mqf7i44kgf99cy779r29nmp22mi5s1mxf0nojnok5rhp9pgtphup36b0e4lc20d2j92fypazvvswtp7kctydlyil0910u64kkgn9b1176m85leu6py9s67',
                receiverInterface: 't1n1bfyastp9ss3sygdqsxypyb4clu2kd8vhvj8ga85vjjb4okpo2mejvafo9o5qoqzzw8b6uw19rq140vx0zz327orzke56rmn5oz3q0f0opug3bur5b9mtylro0dvwbzqowfoqlgmmj6bilvxlvbvbedcnip31',
                receiverInterfaceNamespace: '1dzf5te85zzw3q5s4cep5z7beaij5e3tr11aw9aptbofkrbcfu2wiuxum8maqlndlaso8r4quccby8b49pf9ty64cg3i6mtirli7ab6ohl9zkj2t22tlo85adm5t33u8qdl1bghdyqmtjl5wq4aljxc25y7gimwq',
                retries: 5254081167,
                size: 7921879742,
                timesFailed: 3867235220,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '57ln8izutvneygvfn224xvi0l1fx9o7js1m2gp9o6s36mkh4o2',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '2l0ngq9ty5qhtnv4p4ta',
                scenario: '225dyihbjo91yrz2p4rtpbtssq9pnrmouot2hrkljj48rr4qoyvfhkk4s5sa',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:57:10',
                executionMonitoringStartAt: '2020-07-28 20:34:36',
                
                flowHash: 'qqvhv29rmgdcu0o12hrg9pe554dkyxb554da7q2o',
                flowParty: 'umy2hjnp2wke07e7wd2q9wzcetrzmqayv2ypd33z2kp3poi5mnlpq79u9ix3usnzuj2p8zgj74ojex4ffuqci27a2fliqe28q2bxbny7yhgply801db6xvn35yepdb0ges8sqv8g2fbr1t39427d1rc3iqyi9lln',
                flowComponent: 'er18bib7a4298hmbdjc2yuxo6zoy3f31e7im7wyjlll8usjvvr996ofxqdo0hmlvpyingpx2hs0ix8d5ql2e7bmcdjwd8jvggycp99g1051vw00adglhdf3ghm47efpteidmhvqseadw9bcma721aqlrafa44pxl',
                flowInterfaceName: 'wcy3sqqyhr4hexbnottqwx2y1dhz1kkwqf409sa62qgfiznzc3ok40elrzdzcuk4h1xowb5zqy3jumwcbd0tv2dde0t2en0c83vb4nkb8inp2965kn3vpvr5h664sy0g0bunrgpninbnmdjzgdwn8fz8em6dj4n4',
                flowInterfaceNamespace: 'q1y8hb2hrx2l4do8l39h5klt1rndu2ll1ndra1usf17frnswn7z6gxzm9j2dhm7oylw3dlnfsiocjlpso1prrj1d9r6wt6dbe72rzu6oxvjmmjhhvnp1o5gq9jmetgfdvrej8ruz92gvrfvzbd3rba4uczs8ws63',
                status: 'HOLDING',
                detail: 'Accusamus est id hic non. Ullam rerum ipsam. Dignissimos hic optio pariatur. Harum repudiandae inventore. Quam aut est reprehenderit libero incidunt architecto.',
                example: 's3apsetysxymg5f54b0uelj2e8bo3cuzqc8tgqx8f231hhh6t9wvizcxxlm0hhwlcftzuti880km8mf388k1zrntjeb4x8babw2p428zk6wwtlypvwv8qv8vs33e0yv1ps9lmt224wqiowz49cf4tsq4z3eghfyy',
                startTimeAt: '2020-07-29 11:46:17',
                direction: 'INBOUND',
                errorCategory: '54r3jfq18dvqrdp18q959z12jvwbxrx5trb4hikmkrmbcc4x4s1gc5w3xvnv98iltfx9vhtgqx31fy4tmo1yvtmvmla9cy9z49t98eanbynv9nkwmfhpxwzzx43tznpo5euzc07hngnwavheeei90wiqib0u9k4o',
                errorCode: 'e4dphb4wgxplpanhzc1igf7jafocap8y7dcbg9q5ikqenek8oj',
                errorLabel: 869242,
                node: 3794030985,
                protocol: 'wcywfbqhbe6f2iv7p1p1',
                qualityOfService: 'kmhfsrd65991tu8c53f6',
                receiverParty: 'mia8ogqk97zqx40dms500ieee3lws4bxd6sl177c329wdb8kly42uhqujkhnn5hdu1do0j367vhpf19aotpyst874lv7qpsf94trbz4o4igqj3r4le0nlbxomqwfu52ahfwtj4fgako54luiecn4npkrr2egyuaw',
                receiverComponent: 'otpkfwu2wjecvlua3up7ojy0tpfth3s78wnq7e5mxk9xfjo41uzuvs7wiv5xv9ugkxi13hwlh82fh3izdnap80eeom9qet67kkt4gp62q58ekrjix5h74mfl13812u8ehb8xlojnf510xrlsqmenfn707tgvok7n',
                receiverInterface: 'xmwjv6x80u966f4m7y2vzu1r5mb18l5ayjui8o2m6qhedk66mojxzrfvjrtdfq2dsdqi7iivykw0jt4yp8qu1d6li8jxnjav2qs8p99tgsy7rkgatlcyyxzx1lz3rdez2yfbueoqnli70v25vdzgo0vbr9ra86dz',
                receiverInterfaceNamespace: '97gerbhq7x1fzexrlj7odv4vwmq6a4b3zdku12h8qi3k2uwdkz5y39k4hb1xurjgo066f3xdfrvdrnxq409ii2m45m9rlqf2ffgpijeodddf5bkg7muts1ocxkqgxtnwi8xw0fsypyrhkugvpc3ttvaogd2rkhom',
                retries: 5330081986,
                size: 7098925517,
                timesFailed: 6572583503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'aio0pen9vsdg8wpa1yr2od3duyh8y6t2gaqx240p3at6c2pqnv',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '4cnhdtc5c6hmqqzuyas9',
                scenario: 'q1koez7c7qpiwjyvqs1azb536jonwar3im9vc8ub4kq48mnswwi0jr3zfkgm',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:34:08',
                executionMonitoringStartAt: '2020-07-29 14:37:06',
                executionMonitoringEndAt: '2020-07-29 11:42:50',
                flowHash: null,
                flowParty: '5u553h50j37gdg4z7y77ya44mmugmci10s1fyuqrfc46yzlwb11kz521itdkeyt9n2ujymin1b22qk82qegys9n1lomp8dyyzvc33dtgjhgn3zjqgnzrax30sbee1ord4lj5nrzj5b0uy94e962vsmali5cixbqh',
                flowComponent: 'btygoeuu2bpzzfv5v0v12rsdhf54ezk31hbvnmbflpjc0ysakrc8dbazpnaqwwnnavbchs6wo5at09dj7ez45dai8mez12mcry2giapxxwjwh76pftw35yekn0hesett0rb4u5b4q811bbprx08fzfr4fl0l2jx1',
                flowInterfaceName: '9em3695tgcoe49q0booginqaydxe5w8d99i6w5octi10paopguztcurcptozvwixls4ylbsdlwh7rfjvs4s036y2husbyf4pq94l77cjphs7a75sgpi0onqdjm7uoxyyh89k9z2g18mqjq5h857t5651u87ev7aq',
                flowInterfaceNamespace: 'lhuq5r19rgko757on3krjhez8kku4k46j8b31jtiu5ofxhj40ucyk1aez9wilphj7nznvv9ylkbdkk09mkflw6l0vwvxjjg65nw0inl4mpbs9v57q7bn4w38weie0i711llupm27gh9qbjgae43dilbgg48huuoq',
                status: 'SUCCESS',
                detail: 'Est voluptate consectetur. Id quia nulla sint debitis eum qui sequi laboriosam dolorum. In ut itaque.',
                example: 'nxm1ov6qn6w91c1i8byjj7x8vn0yvr9jsuwj5za5cavb5z79kswxr23ckantl8imcc5kufozru4z66dbqbt9ffru72xmx2acuzz4mkdvb2gboql7kv5p67t4zn9j2h5nkzncj1eb2xix1mtqoaukclem3axw0b8z',
                startTimeAt: '2020-07-29 01:29:47',
                direction: 'OUTBOUND',
                errorCategory: '4ds5hwsfla7xly9dcpe9emikgwabr0owadltwa37q7qhtg00pz1bl2zcusnj4xthwshrtv0p0sb3h9o908ueydfgfy9zf2edcwtn6ih1z7q9kaflytpyyishxl0ka6ykunixt17gpdf078idz5jmk1tjpna9rxja',
                errorCode: '8nv06wr5loqq07a9t27apa3b2xdh32lgrhglzo8mx0glqbnj90',
                errorLabel: 419557,
                node: 8974375304,
                protocol: '331bj1df3z2rych5t6re',
                qualityOfService: 'qcw6u73faapxwujnp1z9',
                receiverParty: 'f5snji3uwp5di43hawf2fro1n29wczgmp7dr5u9baotgtmwzk2p6gcas7zwm9rby8tf5lhwlj4bpy7bsv4c1svpdnsuxc1okimgrsa25ipg27o8dko0lbbprjki22s9qsjszp95fi5upbk8p27xdlbx5x6svdwop',
                receiverComponent: 'qh1ceiw2e5i70nmrjqatykiubf21pg8bk9mk2q12hin7qnr2ma4jwrpke1fw7ywwd917bopcu39pned2p9r3gjn2j6t1sw3t0f1ghe2s2ht7sbzkrhizn3id2lh8v0wd6xqye4eok6gs2tz6t4bdgldxr27lseo0',
                receiverInterface: 'ek6cvp9fjk5aeuosc1jxzbuzsgf7zvkygbg4ltxkonzvecn43fnhxc03010p4i4x2bgl3y0qgibaxr47eaim06lciq71r0nxjx8gksxr33mjqtxg8w40nn0mprdlcp4ij0tgwnm8k37uu62ztkumunegeqyc68jp',
                receiverInterfaceNamespace: '0rpiax6y6gd0iil4nde39x3jvf5mnliq5ow917gduxe730378wjx4skoxo2o0ezvuqga3c9dmmvcrwt1pnkjctaagbz6uqp2ik7x8igvu56gh9shphd786ncqn8hth2k3der98gb4ps6365ihxtxv0x5xfeu9imn',
                retries: 9836239620,
                size: 8517366908,
                timesFailed: 5895972741,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '3uhmzrmqi5vrqshz5rhy371huupy74d5f2uhlu8rzfxccpjqq6',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'sn0o6thls5ggzgaf0fyq',
                scenario: 'wugfd89jfs3gcwbqwrgg6ave3j4lg0qiceihhntq0amd5hnv4o9gd0f1vw8c',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:22:57',
                executionMonitoringStartAt: '2020-07-29 05:29:38',
                executionMonitoringEndAt: '2020-07-28 15:55:07',
                
                flowParty: 'g9kwhxx2wpjnww2qy7f69fcj7h2ig5bdt4akikujbvp9f8n483jw12zy3bwcaq6kexir9degz659zilqxpzly8m9yvetsd3oix9qbsj6scxgo5z6abxzq2j2fi3ikqe2v4h6yfyqefx8nl4yxtibyj8ziwyor1nr',
                flowComponent: 'ckgy7ix2e3hk2omc4m4fkb0i7xlzmg73nowofg5g83ocekcftjk14f1qaci3u0nc4jhyr1paoip6ded381tgz85hm4h92rid1s1bilqlzvtqz527c7fwln1u72g6ea2rawatd579ibklp6rvcb91sceeq40i9zpx',
                flowInterfaceName: 'uyj5zij9lz6bhr8tn6al38s15ed4kkdqwgays77aaoljg055c8ys2864f3fm2jtvlvzft0niu8y9f5kfhrtt75m7zoel5f42jlli1wq5gln3uk22ijiftf8ptebwmf8iectd8um9jmk53ieaxg3zp2ywvqjnz6rl',
                flowInterfaceNamespace: '1yzuu2kdakbelqmxll4ezuilop7kcbvsplbg13xgjngo1bay37tj6kuj6qbfki623a8dfwq5fl5lcxiqc1cusv9r5eoz431o47dtmz2gkjdcco9psxe8h06oas7kzijfl26ad9btcqmfdfwn987h3j0tpxzbhbka',
                status: 'WAITING',
                detail: 'Quisquam totam eveniet. Cum vero temporibus nulla accusamus at sint. Consequatur qui similique architecto unde ut esse qui animi hic.',
                example: 'ebc5yi33ppi0ujhw6cr107zm5d6gkugcpqaxh5a1h2d2etqp27w6e6khur21ygg4sx4inudhw3q31a285j9hrrjmj78ayb8ro74rv8uf40j1molv8nn3kc5pde2q1zheti2zcmyoryrcqt5zxrvclxw9049orenx',
                startTimeAt: '2020-07-29 09:00:31',
                direction: 'INBOUND',
                errorCategory: 'om71008ggp9lfm1s3yusj72qrlutxudgiuto2w1oletv5ezyi9d90zrwf2b514lxb5nchdp4r2s5azpjlgsxlrkcw6tb0yxyulruakjasls4e9heae2dn32u33gjyokw7m9lhxi1mqvfkbtt5ylyztgevxkyuh23',
                errorCode: 'dg12kp86t81e6wvytipxdhs23zigjiapy4sd2b10hkzn0fdrwb',
                errorLabel: 339510,
                node: 6041672729,
                protocol: 'ypt6uojfb0eq6elshjpj',
                qualityOfService: 'plb54q6dmkba4sne6l38',
                receiverParty: '5z7y22d6jnragg15ufwgjg90ntesuy1d6e745th3sbp42okz95r0b39iq3imktvr10jb0a2gqgdebjcyf1du1uqd1q2ygyqg9gx77mpcf3jtjg6pf1q445lk9amm4y3lzht0rc84itqyzfew8eccxoa3qqzi6mr8',
                receiverComponent: 'u74fxdfiiysef2qagypwpknwzqbkb1hp7z58mjjscrn1dtup1q67e2z6ta9z2v8174gd83kgteaw4vo5gt2ib0gfnrmprpqygviehatmj5uss0zvt8fdokpjvs984zkrzlsjb93lgx9qkbewv4grh2bg845yec4r',
                receiverInterface: 'uca5izh07xipp4674o57og5rccdrk074re2mlguggxqusjk4ll3umiyvmda34b0lr30ec3fvfc3eeomwqyd63ciyf89lf3y78miip9v47zyln5ikmb0yrzppupm627c4883qr080q8h82u30f4yl08usjkcmj84w',
                receiverInterfaceNamespace: 'fo01narw5foh7y6f9khw4dd2dlxuy26g89hr620v6s69uv3309boqqahtxks121ndqnbr74f1y5pe0rxjfd2053h3skfp07giezoj0u3m1cjj5grdv7inf7sst46w30oboscjewipddfl6h93l965ydb7nbksg4u',
                retries: 7141179750,
                size: 6700956420,
                timesFailed: 6305516294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '6davhyqega6ld2bl2u9vvp3j0jlhzu15445gebvatg1df7qzx3',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'tfxpvtzhw4nkgqep5koc',
                scenario: '8nzu21fpcdpwmx0rofoxemywftt1t3ef47tta7s15ub7pwqgbgm1prlv3nho',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:32:33',
                executionMonitoringStartAt: '2020-07-28 16:29:43',
                executionMonitoringEndAt: '2020-07-29 01:11:54',
                flowHash: 'sus8bqrzyxuok5g6grl1wcqcbwvlgfpu5muomykk',
                flowParty: 'p9adb7sj46bx6miyt8gh9phledfsv4z51wyxa9drvk2qhkvool1ys98zd3pyyhe3v4md91zc1f6uubp2gynjt390d8uxne0nxzlwb5hab2kcstbd6py8owklrl06pno3kta1r986dfeudfp2i3shi4sm9ungpp4f',
                flowComponent: null,
                flowInterfaceName: 'lw0oq5jccb6h11rklr7pkbf90mt2lcl9575jkep5nqvsxi7vvlq6k7mwsfjkk2is1vgg6dsgq4fwzsq1oyh3z97vtihzr15otjr5fdffli8bx6jllchy885t553go30ndh0c8gwp7l7xc6mdnsiom8og2dhfep70',
                flowInterfaceNamespace: 'kkmqv9xlo0zfh6a7gprlo0qj3rjc351zlz77fl93tp75o0dergjr1nfy05qktugfhj418e07v6pvspwz5gk20pdb3rk67lo1ugqzxuyb6qosr8siftpa6fep4efjvm36jbnal3gqgwx66z1ytm95szno08tc9h2f',
                status: 'WAITING',
                detail: 'Qui voluptatem possimus molestiae perspiciatis. Eveniet qui ab reiciendis est cum velit adipisci. Quae distinctio aut nostrum doloribus sit. Sed aut omnis quis. Natus aut voluptatem occaecati perspiciatis ipsa nulla. Et eius quod incidunt quos libero consequatur animi tempore facere.',
                example: '2dbzsjzv5ni2xlymb9z1eceitixxxm51ullpqpktx3fwmsj5ummsh5uwlup2anjfnlu4k7kttcx973jffgl7ruclu64qfr3th6izsgsph73j9zgfe4vuu5i18n5yxl91h4vtmjf3cfzdx5xqh4azriduebu1xovs',
                startTimeAt: '2020-07-28 17:47:30',
                direction: 'INBOUND',
                errorCategory: 'hu966memcx1xvl3bqaidiis81tayktylkcic0q0thrfimju9eanyzjg3uaefcfdv12kzlya53j6mxkwryq33ny9su0wv1j40hozsg0m56cu700ihb0ikztk6qlvqpquh84akg0cjtfezc84a36afvz0dcje1oyxt',
                errorCode: 'xf9paydxpxukwsvswyhkbvsuyg23521187m5fs2wm28uv0nzg4',
                errorLabel: 426025,
                node: 5913279323,
                protocol: '8r0jym65l255mh5m8khl',
                qualityOfService: '2u7rj1tirkwrq57jjl73',
                receiverParty: 'az4n6xqlfe2ttylzgrs0bf7ygclllq4goddt4s4iahayw8hmpg42q5j7ay9au1id1aczs4xdtqckk9cdumz2hcu56g4sfffmcnc4tur03h0b4rhepe4q9fh7fpugfdzhko2p828beu29lclbc3ok9l8g5p865c1j',
                receiverComponent: 'pwpfcl0avvndeq0oswj6v4ykhbe3lazx7dyidt3s26dnvu39r6cglzswcfovtzjmcmojpz2l0r8zhlw1f530dxv7gmpm1t2yxjakgxgds399r7qenvau6rxand3a2br0cyquh9c2eflzapm561raakmfdwc0r2ks',
                receiverInterface: '6prtuv13frxrepu6alblo3g5dw19oa4wb34qpulfd17vnuim2se5lyid2au6ec9lpc44f7ym548gytk6m1e1t6y490bucnoeed10ayumhlloywf7cu4heak3ahc7nhygnfs4ez6acqh341g2tpuupwv8b3s2xfsh',
                receiverInterfaceNamespace: '7rwmn6gss6iujn56x572xz0c1owcl3734zdpn0ro4oobq28km5mdte7d580reed2icizd7uncgbv7jbc3m880y9rfjy268qpbng8v1fu5dmes4kljby0l7fx16uhyk7ca5s6vu4k79in7ae90vwqfobvqxmz1qby',
                retries: 4815645886,
                size: 2986826880,
                timesFailed: 4720822831,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'sk70qbbifhg9hxne5a4tfhbdwdkrbqlzccnftxfud3k1zbjbhz',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'oa9hjjp3txp7vcgh0h80',
                scenario: '70as8lm2bwj00980n0cvnmqmvnxp28f0w5cq9vt03rpikuqr85wxeiw1300b',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:22:39',
                executionMonitoringStartAt: '2020-07-29 11:58:43',
                executionMonitoringEndAt: '2020-07-29 15:26:12',
                flowHash: 'a17deaewdcj076vnizja6sh2akk9zhcc39adi8hb',
                flowParty: 'ij2cd2xxbfn8a5daxdvrs1211kl599rkx0lulmc5fybncz1c9hf848ymmgeo5p3o9dcijnqtc1odjtlxb989aadrfsedntip1lzleu6accnn6lgkoxhk3uvgllj0q77rf8sn30budhuzppnnalganvn1smc2kpk1',
                
                flowInterfaceName: 'z4cwzhugpbwdmanpx0zy9cxtw47l2u3ejtxk4bh5zaa4hn897t12j1qvlc8n444f24dszciy5saazwr9io06wng0ad60xopod4jp6nwgwy935wvneb93cvpkdyk7qp9zyo3pdqn2kh9kn6nc8myfd1watrtjmrka',
                flowInterfaceNamespace: 'l72zg68hyf5gium6ocoh7h23f6r0pevqemonz1s821ugvu915obxnuu83w0t00jggjffq0avy6yr32rw2hp9cvwwdrmseea2b0z87tvg5gwsa5bll6j3hilzdj7gzaoco8cs1vai7os2dvoo9qmuupn8bg0u4lyf',
                status: 'WAITING',
                detail: 'Dignissimos omnis quae voluptas autem veniam. In quia et quia. Autem totam recusandae labore recusandae eligendi nisi dolores. Voluptates fugit enim magni ea eos accusamus sed et.',
                example: 'd71aixjxpgamlbhzkm8gpurqst3j147tt515ju57d0by8wunecico19bznuf8eva5blvauesh01slh4t66e9uouqfee5fxz67plqsoxic3jsbxuu8j8q08pfh5h2zhmvq8kgmt8mj19a5vljcbjn5bfoklvdgqn1',
                startTimeAt: '2020-07-29 04:49:08',
                direction: 'INBOUND',
                errorCategory: 'u6qwp8q4hiivhm2vlnuncv11sibi2yszvxtuptprfmofe669ra6i3tv6o8t3up94hxgrxmi6o0md98dru8q1xmkh3rvly7mdum671e7kdd6mjycegae6vzvup9ny50s7rffsp80rkpodlp56r9xalakmhdw3rifj',
                errorCode: 'sx9j4ax7iwflfa0recte1dphy48ojke0w29gvin2hq6k96co2g',
                errorLabel: 835951,
                node: 9510395903,
                protocol: '3mp270tvmbkev02hm6lj',
                qualityOfService: '80mjx43m69p9nbaf7sct',
                receiverParty: 'djoatz5m87osvjf0rknpacsfgliztpld9i86s1by4hkln3hqj8hfmiirp1ji1i34sunv9m220ghmx9uc7v45x456sff3bigj81fo834dedov038s9s2yqmxp3h1pcajrtb4egm7rjcabyovrnebkn1p5jhad44jg',
                receiverComponent: 'in5i9kc1eek9tt6ubefycwibf5a9d6lywfkb14cf2xccs0vl2b42ff9afqenyz83q0wuvkdkettkevr7d6banyy3vtw8y15p160b1s9c9ss66852dq3k7iokowazjy481getyhoom33fwfw8gxhq8dwd5xlqednn',
                receiverInterface: '1cd02vn4o2sy3am01wzwp723d8w6r3qzok3p6gpcwt1uzdpl5ahjtvupirhs4j4birlau27jdrkhh6ecjn2kww0vdoqhmgxzb8zacuqe42c9bd2ukomwv3mdsgrvde6w70apkz370uw78p6qenunl5goqwrqjuop',
                receiverInterfaceNamespace: 'lw3to3n6pk75czz2mvaysgeiwds2t69bcb53e3z2u3licbls69tcbq143gujyfyddao79y9qivv5qo28pj1pf1kq1uagvc81vj6si4njvxtahmrvzg5qcrcxyka44be2hn3oqymbsyn9n2we9dnn4ecsuqau9ac2',
                retries: 9395831135,
                size: 1029124616,
                timesFailed: 5420626544,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '6p59wxjlwurz9pypwilfepwotlf83z6fqgs2tduxbist805ml2',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'l2o9pyytwbldd557ncfk',
                scenario: 'y97fngrhf1hx92yzv2u1xn1y97sp2741ds0271jk31k3h260a46xcxuh3xwv',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:54:54',
                executionMonitoringStartAt: '2020-07-29 04:00:27',
                executionMonitoringEndAt: '2020-07-29 14:43:36',
                flowHash: '1dzoy5ocerf2emh39umawy24sn5046qc8a31he3t',
                flowParty: '10ry8nksj7zkeknj9snoq8zmfkr9z74y9e8oza3n2pubmc111r9fyejxhejopu0y5lzf1cdc99c1n88jn8e5w9pohryd09u7padc1a3wcnu7lwmngo5osnyn9l33c27zfnqududjqcqad7g8be977v6utvm1m1if',
                flowComponent: 't7zv6tvyukt7o6rvzpcud7bh8dlk95yf7nfmi5qlp4vb4y3j1kw9oqvq2o8r6tggh2qaweyulf1poaahtuchatehw8jb66t84ty9cenpxy81d03jwyh7vg4intzm4sk4sxph2ucme6qhtmxa3hsubavu6xbc8g6g',
                flowInterfaceName: null,
                flowInterfaceNamespace: '78lfewinpxm41ka437aaslb9831eze50bxwt11vyyk834sz2z96jcwbuhlvomlqskkulve57vjfptmkunxlwv2hpm7xpypk7rhu3jizatpalg746mclty46dzw2mhgu6999ar84dc6bbo4aoy00jjorvqrzvmrau',
                status: 'CANCELLED',
                detail: 'Aliquid ab reiciendis non amet maiores eum iste magni tempore. Illo veniam omnis esse quia. Ratione labore error reiciendis cum esse molestiae qui.',
                example: '3exsxrvkde19tpr089xfhr9au3ozqcokzdnzcg1q2kf8l2pf6qfpdrd832krlzirwt68v9830e7t54l0bcl7xv5q1h1x2e988mzv4j5pncjjr5iquoljva0fb3z5f9gv2yp5nuggl2baxcmbrgl99o44yo52e67x',
                startTimeAt: '2020-07-29 12:16:24',
                direction: 'INBOUND',
                errorCategory: 'h9ac3pxxyxy2qk9vde9sv1f4cqxzfeplthl0kj1cuo2aq6je9c6iij3a6w12vxzpdqhvi0qd9wxo0rfwxzzvfg23ihtm1av25qesa422qr6hgmiresykoc214te10vb5e8z4w6qwqbizfcjjlfujk6e1oxgw4hql',
                errorCode: 'fx3j1fxbpr6lmf94pf8qqaa5oqhsc94jeafr2v8wvkie044d4m',
                errorLabel: 815996,
                node: 5396403637,
                protocol: 'p7812zhe5ng22yfk2ocf',
                qualityOfService: '7mddggb6xyjji9rzlppq',
                receiverParty: 'akmf8gre2m2prx3g0g59sy11wg2l3lxnno30kqmkhwklrtvhhh1pjl7bm5wjkhom1ww7gz12cae4pl1l7ysilxsxoxy4jsz9w058m4apshr6ko8ww122rv7w01hi6hyqu7bgjx55ai46jzidm2q81t8krff0wyn3',
                receiverComponent: 'wjcpd7gg13umjzjzp627vd4mjxxg7p2ph1tk7djtv15m0wkilqs6nlqpbizzaacc0oor3vaxc0rcd1cdv8mpr0t9vbgc6crs4chuolmt8uxyc53c0rehemcjamfvfe2x482jm9h3jx5sq13wzceq1d7rat8u8lkc',
                receiverInterface: '9zgcrrv4wppo0jnl8mjjj3fl42cix6ld2me5qn1sj5b1zwhw65qprsfs53n6foule7qyx5wmmeb1ekvzj7g9z6s76q9z3wqwg4gzfxjwe0xdvx7bi9opv9b1i4mimd2vmxmqnd45ps53ewmdtjo7t4uxb9f8yf31',
                receiverInterfaceNamespace: '51rs5kygt7j04cbgt3ca0fsru8w3vt44zb7qdq1uq4l77zl63785g6ez4w4tvw4nnekijv8jh3z2q76co1e094301q0dp59id22wu7amg5oq8t1xib5s98jkq3zo19y8jfm5dvr3qw5k77bzt7biksqrzwp0qacs',
                retries: 6025078055,
                size: 3778513984,
                timesFailed: 5150647237,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'h8jjadhzbfjy3rncvzoiise6yqn2yps4maxjliwefdd7y6wswz',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'jfjjz0lyo4wnpf7v5ll2',
                scenario: 'iwwket9tqntn7cdu8vv03tldhq83fr06wy9v7549fncrgkzmmlvfb8sz2l3r',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:47:30',
                executionMonitoringStartAt: '2020-07-29 10:55:10',
                executionMonitoringEndAt: '2020-07-29 04:50:45',
                flowHash: 'e57918b6mdjqq36yleyji6gclrpqotnz7pvjen5k',
                flowParty: '6wo4ck2r79uxxps8ui21ooadixxw7rvv2p1b38w77u27ep5orz1h38e1jpxnjsys3s5sdovyl4y6ra3ny5uf2ejt62ahug33dbopandfj1vzfbismstao6ngobvxa6miqx9ivhqttswaoyfp4khkvyqx2n4uvfwu',
                flowComponent: '17gpwzd6apdlvagcqqfnezw914e2h2892xxsk7vzny2g28abu8j161m1ppdz89sl1gr4e0qs1o8h0jlasktg7r2lx174w6u3hk1pyfe8kq8guwruklhfhhdye9uoyqxxhh0bj2wqd0fk295dq48cvu7z513h2v3y',
                
                flowInterfaceNamespace: '4l5ilyj0xmuefyn8b3u3d7gxe5ys5yusq640hgg85jude3gzn96lvuye1mzffabv9lc42bngw2j0686jerzcnd5o7svr5r877homjwr0dcp42210g2gbpbpyt2l72f5goe2qimalmd29mkhtvnq7gflfs1jetux2',
                status: 'DELIVERING',
                detail: 'Dolores culpa ut doloremque iure et ullam. Unde deleniti necessitatibus est aut voluptatem. Perspiciatis quia cupiditate amet. Beatae molestiae sed. Fugiat et reiciendis distinctio eos sint voluptatem tempora.',
                example: '0ztqprq03rx0d0i2wxxgmza4sbtxpkqzkdw8jjshvy21w09q01t5eijmnyb22oa0q5vuxilfyp30apt8qbnyku2wn7pc0ma9njj055dpwuslzux07vumylwkkzz22s5c4snzl2ba80mvhrpr5gxfhhlb6hb0riv8',
                startTimeAt: '2020-07-29 13:28:06',
                direction: 'OUTBOUND',
                errorCategory: 'p796a2xjlmxaabv9ehyylgfgv85rpoh6gg62j47vhle72dnbfqf5t2pmuq5rvc3wfwqvl5yuxngiz7yctwcue6um9634gus0g1n110k5jhdxna77iakdtn0z2w8u9z6qeanptt6vsh0e2mj7cz615lepgl3t5d3x',
                errorCode: 'kbhgzddu92evztpdoek1k4t4blj18szw4z3mnyy0sc4z4lv4ph',
                errorLabel: 674916,
                node: 5117445803,
                protocol: 'm4movv801noyb2cz4miz',
                qualityOfService: 'qq028g5icx6skduuwx0j',
                receiverParty: 'iejihspzkto1td8kj4izmn4kdpe83jfj3b2ahyl1y789s8mgiv9u9571w6svzo8mede14j5w7g1meb49tukj9isofgzpph1y053bq0cjcsav8r7grarj6gfs5m7o3xf0svj9orjgvkwrghomdnq3snmqal4lwkj7',
                receiverComponent: 'iinj4e28775qwhqxl93icyqgppbejcdnkdi2bhdiumgrt3wk0j2tu60gm5yzbf1xsqrkyp3h9a54fhun1shb06jqjhphhm2eytt3ffd4balpa9858ljczkludyyizmpc0f5u2d9ndwi40vvvjststpik43du8eup',
                receiverInterface: 'pnea9hbqcgjjss8vyri8k3320os3v5184mjz8khbz3eq0e2x6ibinewwgh9x1dux9bkwg8n24vip8n5bxjsurwht7leupfnlyatmb8gc66ogjf6kjd7vpwojv7ed6xsl5uedbjw5wbiiedf4chjmi73qb3fii9td',
                receiverInterfaceNamespace: 'ghxbv2bcvi78l5on9bxy0xrkvg1enta1rthv7uttnqoc57abuh2xr1sd5gvmfbefyx47kkvfk8rbkqzgvt9qbz11zfl3fbdckabzgc927mguexum1jwm1zt7fuui6cq1yqpasnsdzr4k5zcxhpdo7w9iv41883t1',
                retries: 7686081252,
                size: 3970227432,
                timesFailed: 7151835491,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'ae48f385e08s9pa3pxl8fibb452tvy3ootcy3q8zik7f3fawr8',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'lt5bpjqkyudsv5xznflo',
                scenario: 'f1wajku223nmhhnbtsv2q1x02xrlanheebun1yv1rxw9o893lrid5dvkh69g',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:58:09',
                executionMonitoringStartAt: '2020-07-29 01:08:57',
                executionMonitoringEndAt: '2020-07-29 15:40:37',
                flowHash: 'xj8q7m88y6v3amyv6gg0iymoar1jymwj4vpmeit2',
                flowParty: '3nj787vqz80c9s8pvc1dhiodzocobpec151c0obpr0jq11o2olpklqv4gyldoh725phgqvguya1ji4ca08em63ext96wx114cakdqq7bs6udpaxwejdpd6xp8pl7rev1lkurybp4asmw9skisjm3etpsm0kv1u2t',
                flowComponent: 'vj338j9qixs2vvzjxhefs7h8tdpc3n626s9lmp60ww13w8sed8e9bxp29lr0uj0ga2ptdjwyh24vj2lbovpikzp6qmyw7f1e30tcmh9pmy8pm7sc910hah50fj2s50xni1zu371ali3ob6ehu0p5o6fxkzn16c15',
                flowInterfaceName: 'hr0myhnsr70a71byshwnbav9olpl2zjrx58i06rbu8y3ximm700se4jx1qfidx3i8gjucodtwdv2xseqmg827foqt4tklbsj21jzmp3lopksmr06chhtkhmhmpwabg9yobf2zkshfs3azk8yqxxs7tfd8fkr6kfm',
                flowInterfaceNamespace: null,
                status: 'SUCCESS',
                detail: 'Eveniet cumque earum. Magni libero deserunt saepe libero. Omnis error voluptatem fuga sint. Iure et ut et qui blanditiis. Eos ipsa aut aspernatur. Perspiciatis illum sed non voluptatem ea consequatur cum voluptas.',
                example: 'vm1adxrnvjrv2xk3p8eyufrbmctvujif0aekdf6ngmbb4m3i3n2rsspowroszbe276v7j6wc9oevlxagth38cb67dxazi4v89ybi5eg7x0lehc96xyu2880uoleuku8hrm5alttkdoqlv7bk4q3ecra5884cwqdv',
                startTimeAt: '2020-07-28 20:20:01',
                direction: 'OUTBOUND',
                errorCategory: '1er2vhsjl7z9zlyh2kl82myd8i58qph1lzgw083jjv9tgid917xh59r0vtl5j4d3pcrqc9d737lk0wvc9y2dmvrzt9lss4bt0rrvguqg2ic4a62tw223qepmmsaqkdabsz05g8uhynvlu26b9m24bnf49vdwjkr5',
                errorCode: 'yf7tcuum7uvfintt6ltrozjbrinyz4yrd3z27692x0bnmylyy4',
                errorLabel: 917073,
                node: 4764436642,
                protocol: 'yxl3r0ryya289nwi7k7q',
                qualityOfService: 'syacclfs1b44wsqwq0qn',
                receiverParty: 'frl862rg8o5i3ew8vvil10yho517cw657bp4r1akh0jb83zrbihyb410hfmj3jbwa497smwhgw2aetpurj5adkccah40vzya61hv53380q78vic35euutnm9aregegom9yr74qbzxx05joi92i9n5qaae1mhf4jc',
                receiverComponent: 'qlozd2vpod7ogeitojldav3ee3zpivt9pds95ox2m4vuz1cvz4z7ayokai26ojg5lot7bvz2p4p21o53dq1atewh5ttqcfk9mo88ou7j0y2l1a7nm84v8p6z7pd9yf51w5r9m8gallgyjtty0aypj18eya7n7u6y',
                receiverInterface: 'ih7z96j3zhsfp6inaoy0duuzk2k3e68cydp3ynsacrm2q9fvihjqtd9xf1ethk9v7vkbmmg3m53re5y9x1cg7tampbkiyme75qopg3xh6jknl238xdk9kp9jkqumsp1kh0jaldp42ggiojwsnwtglnw1gouyjv58',
                receiverInterfaceNamespace: '04kcmbt76nvzayuq4ly3n1oqngydk4czk2oucjye5votq8r8catpwbporyk3xuxlogxd01uec80us3bxg22wbpaqm8cni2kmeg0anie3fwe3lx7l2rkjn6w9penub9ravfpnj7osaszsgyej0w5uqjnehgrzxmn4',
                retries: 9871426161,
                size: 5487132810,
                timesFailed: 5365803717,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'wpp8464vdn4ge8veqr4ubtodhv2wfbggtsszs7l3s0m2hhocem',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '4xpxl9dm089zon1curic',
                scenario: 'mxht78mhr2fi4dwa5nszw1f7m6t0euwqo1qbs5pqxdqh4x22iszprmoprat6',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:48:36',
                executionMonitoringStartAt: '2020-07-29 06:28:24',
                executionMonitoringEndAt: '2020-07-29 15:31:07',
                flowHash: '8wjm2xgsp00th3bzgvvfwvy6c99wu27r0lk0bcaa',
                flowParty: 'l2nsrnq0ydjyfu2e9pip24entpouefjvife6z2esxok8hqqz2cls7on6mspsi901163afknu3wj2mg418ymps6vjg9qyusv9ecsf7a7j9uixq47w8jyugeteeqbo9hwumu6ium2oxc28nzmv6bl00kjglhwlg9w6',
                flowComponent: 'ljc60z2c6qywc6lrlj0vyr6w77ibrlwux5mihms7eraxkwr6bxx5o3n4k4t6xg6xoqo8l7g7z6lhmt0li36ozwye8rc1816ny7d1jf3dsqtwgyiyw563vn197fqa3j4w7hokhwgja81hvkbgfadp57qvc53tlqug',
                flowInterfaceName: '30bsyznlucv2l9e3yd6cq5agw435lszwtetu74s7billndg38zueljvs6g8h9zfn5etlx6g4bziwrzoic1jeereel7q9n9dovy54v6wysph76yysuch0dzva143a16ut6tn5uz3k2rjben93my9fo3if3yopm1no',
                
                status: 'SUCCESS',
                detail: 'Et debitis omnis distinctio non impedit. Consequatur ea asperiores officiis nihil corrupti enim sed voluptas dolorum. Fugit voluptatem enim omnis temporibus asperiores qui sint inventore. Recusandae et ipsum est voluptatem autem rerum. Dolores recusandae vitae. Qui magnam sint.',
                example: 'zyfwmnks69yrqyuajbgzcl4iomjtmre141q5acowlgd7r2uklowgdqvcg8wmtkaxek9fsshettou717d4frwti9pr7oj06ta82jslwzotuypxm76jq0sx71ww3rsyhfxbb9alq9smt6lip3sths8fxfx6solo60m',
                startTimeAt: '2020-07-29 07:14:34',
                direction: 'INBOUND',
                errorCategory: '806anjwz1vwsqh7054pi4eak41zn3uc4mqci5ld7xi87k6k3bb71wm1jjzpxz8zzl4yywn32fv7sd2imiucvgywwtdm41sp56xel32gzv9i02douczj1986o7lmcgz6ozc33xx8vxokhcpi6rq1tgb8552a1wdxt',
                errorCode: 'sdwa999ibjfaqcgwtpyj9pt5tm8de7jt5avvetyuscxpnav3te',
                errorLabel: 618071,
                node: 5918629498,
                protocol: 'i2u56ggjw3m7oj8vns0x',
                qualityOfService: 'ef4v9l86j28jsuy6znj5',
                receiverParty: '2885karimmbn8t2s2iyw04t3zkh7isk449s1vfnhuvko6jr8og88yqa55fyqngw6ctp59273yfarkescgwb1ohjlo24kn1b3ggfw3f59zgfnfnedoxv0j13xek73644r65q41ugjjwyow81squ34k89ejrker8i3',
                receiverComponent: 'w9syem4cio5t0eu26d7y1g4tr4xdt2k9rtb76503yobncyoxgd7rvgcmxelfnczobhcgwuuoutph94sfp8o9ja1y679glezgbvearihtu7l92t35mchnj1m0yaryvnl1z88mnpjnel1bhgw2oldocyaaszxpryd9',
                receiverInterface: 'qhl16zr2309vqwkj0woluvolrpwcdjjmdpjca0z0sjjqxcgv0jvzieqqunavzewcny43dr3uw5qn15x7aep7e1oo37mo5pljy3vucxoj16dcujzowmn9l4hclfdln1d0keqvzd06bivxhzd52g09amgffyf76b0a',
                receiverInterfaceNamespace: 'vi3pfagerzddru9ece01lpt8ag7klx2llu4jkrswrrlhgxkb833pzwuvl5na4jbn3gk2sm9tfe8sx8qaw5rykgavsmh08a6aoui8xe36je7z04adewosnwjuslz3quskip4ayqtq2xsi4iiq8aioanx31fhpyxaf',
                retries: 5403138347,
                size: 8664535829,
                timesFailed: 7886765187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'bdzc786kvlnip4kgy8oqlwfjrhw6a6eb5bh4j7j8akz8zw4pvr',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'sk3rzy57nfvijanzid5m',
                scenario: 'l2fjdoo0elyj4cupa5i6jnwhonnytil5la8uz0io4ggeinwx498az0rl8pjk',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:45:00',
                executionMonitoringStartAt: '2020-07-29 10:13:23',
                executionMonitoringEndAt: '2020-07-29 15:37:28',
                flowHash: 'j64834luazjt5j16qy55089rbnixhfmpiln3nrrp',
                flowParty: 'm1vd6qh8rgxrlp6j8j3osa075e3n6zmdj7ehno28582gkgq0h58rqeo1ck25xo2yyj0x4hujfjkem36jvaj8hzqhlwpud0rbbx2dncl70592nila0il02vtbxithivyuekkwh0kwy08zas8zb6k7vxg0mqp0796s',
                flowComponent: 'wjnunaooyyaxsb3xr4qkxfhztvq3a256x0gh7pk3u4yf461a7vtykqbtkbka6fht3ovc6spjzb3xd6aksme6o5wq36as81x3b6fxvil4dq8glk5bhvczp6cq4s54kvfzpd8iab6xc7juag9ha8oqgsn0aknp71xu',
                flowInterfaceName: '796s1v2cqg62w0a85jo5vuf092dotbogfwm9kxr11gryu9xxshc411b8nhkmb8k9qaporvs1vzctpsee4351tf1fvj68jc388zx8oymqfylzi5zem7xaoculjd6qytbwvk58ft7b5haj93vrmiw7e8tvfar7hbx1',
                flowInterfaceNamespace: 'c4id92g6ab4r2t269s53pf58chlny497oh04wxfu1eohq3vo5na1ibvyqjdzcpvo4p9u00as4wd3c5spjjzb4rieqt4wcgkg5ad72oveyoxsic1uwjqthkz0qejsvlp93xvj9grg5c8vvdc2k63phvgqytti6vx7',
                status: null,
                detail: 'Eius perspiciatis soluta. Tempora quam sed perspiciatis corrupti. Hic nam delectus. Et minima occaecati. Est quo facilis.',
                example: 'pgxpwz2iouhuk08g4ahzrbhmjp4smlroq1cswhe611jefdz61xdywneri28i4zrxavgczxrldm0vj9kg946ubwzc79w2zgkgz57q3s92iob8l46kr6bjqh8im842jhg2cipz5tvpzup4mxoh5hbmwxlkv6w4cc77',
                startTimeAt: '2020-07-28 16:34:52',
                direction: 'INBOUND',
                errorCategory: 'n0pv1efwfy1k04djc5m630v9d5w3dmgd5epl6h8yf0r8rgdhfq1h7jgdv7y8h6wx230nzht1fl67ro2ncs6ejpiyqsaj6rxyvx7n8iqnyd9q95iqng2mqatoart6xghv0ypshcjxiqvv96rtd42pxo41xlzmoqvy',
                errorCode: '89opccqi1ov2tn05t7yha7muunz4d8jh6d71q6z0zpvgr7sn1n',
                errorLabel: 347639,
                node: 2229990575,
                protocol: 'jauw7zv7w3ce4y4s1tql',
                qualityOfService: 'ukrf0wqsd76fha54v232',
                receiverParty: '7qnly0x20fxo8wtdwj8ew1hkj4jinaj1bfrvqfysto0h863d6qgksh4zkq6rri8k5dc9f4qmaff0ofg5nlf9j4jilr8x9z7llottl8h9aea3wl3ogzxlpxdcxgf47w88nv0s2gocbfy9zpw1dn41si675ylqxxes',
                receiverComponent: '5kdi0vko0n7xdke2vquiw4xaszpemp2d1jbhfkpdr0h7azaxdflcxdpwyxfimgb1bbrrf3gx4c7y29sgnqb4hzurit9ytyy3d6dfwa8dl2il0pnlu2sesj92t0zfy4v0wwmj857yvqcxo4u4h2u594tt4576ol7i',
                receiverInterface: 'k69jq13fvueg829nnm1wvjpx5cq9we6sxum5gieksxhk12dgl5rya4yn5b1k9lj3yh6pxn1w4tzhojvwh4v1h3axx9mkllq8n5078m5dptjkqjq97tjt2s3hutsdothgl0kimaorhw8ljwkaftg5bu354acj2o4s',
                receiverInterfaceNamespace: 'hldsqya0n57aaghv644akp0juvgfqtueu9dy2frmdfzmndo3hsdp7w0s46jgokx8eng2y4j3qvdfs0tz7pambpbfbv3fwc59850xmkyh8y1mbb4e6e8xbceycebs8q17a2uapsgej1vztgcd0a9cf3ytneae5tck',
                retries: 2168693476,
                size: 7243437679,
                timesFailed: 9646591492,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'uhbd2s0pmqfu4ihsjs8ft78f2kc2asimtypb4uqx3oehnczw3o',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '9csa2gx2psvfjsluj0a4',
                scenario: 'zf6gj1a8y7tgyf3bwtvaz9cpabgqqs0q9vp83xmtj4wbcq7zjfhcj9e72fff',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:12:08',
                executionMonitoringStartAt: '2020-07-28 20:54:59',
                executionMonitoringEndAt: '2020-07-28 18:34:16',
                flowHash: 'zkbzvdkj6mwn96rfju3byhu2a0t8uwxv8rks9xtp',
                flowParty: 'vbt6i0eny4r7y50aexo3t9fjw9u5lmr85gtynt9fg6funzsomrz7vmgmyy8y73cjwj7jj978aiy20deli0hg3eyctnk7xptm93ferd4dbzmu52n2rkcioe67ivcs3idz1r8awlug27tvmg4zsqecfjosecns9dgk',
                flowComponent: 'yjf0iz8fcftulputkcsh6k8jyf1k4o0hw8n3czvpm2s7mj04cwzoa8akkt0ff4s9h7mnaubsl0g8dq5xo9ln8x2ggjpvk295boei6bg7pi8absnnvvbtp5l5ei886jgrgfgikye17fl71abndcsfdx20xeqk7g1p',
                flowInterfaceName: '207auin7expoqk5dw3zx98s05xt7gy6tdis12w12rn4ed7dsyloikno1w0lvfbj03s8px981dx7r1mxzb6ioyqnnndkpb0xar2odl8prii80wd0x9wto1zmqdheduz4zm4rdbgtvdz6h48ckjl42degpdw6tjezn',
                flowInterfaceNamespace: 'xdqrdsfitffkvdri2bnjsab98nh1g2odzvq0opbrylq0ge2pz8e8mn6k7bm8wut0gwvtbi6t1bvlasmbxms0wlsns77187c7hup111ce76lzhwuo8pcv0qgmerf32yp6q0b7in14yoenl8tvr1wd19hs47cjmgh4',
                
                detail: 'Dolorem ullam illo qui exercitationem odio incidunt molestiae adipisci autem. Consequatur est sequi nostrum dignissimos incidunt culpa voluptatem. Distinctio laboriosam qui dolores sint sint nesciunt sit. Consequatur praesentium sit nisi. Veniam aut et inventore dolorum eos beatae. Reprehenderit eius eveniet quibusdam velit qui officiis consequuntur enim sit.',
                example: '9zx6l1i8s3wxr3ifcx2v5ipimn4mvzbauryuk03cn92onnjtvta4oybro7p1i4jqjnoo9eoqoiu302noakrmmnbr1w7s1aby3dvrhpm9dm1kbjo83w6y4yp5etspjk0q4ihykx17l6xuxeowssdref5vdbrcqe64',
                startTimeAt: '2020-07-29 03:08:20',
                direction: 'INBOUND',
                errorCategory: 'p3x5npims8fmc3abbghko263j4fji56fmtpbvwg1hewnrbxz48jxu9qcp12naf919g3lwbs2e0787m3q5isekfn584bbd9d8ee6mr4k9xv3smffht25ngx9f7qkn3b85y2aja3k2eqprj0b9ayikpad0ki4mn91f',
                errorCode: 'gw3dnfrjadlaj2evvbbgg1192yt8jwhdvevpwst4ypjopuw6go',
                errorLabel: 896204,
                node: 2738329429,
                protocol: 'x9tfx41k1v5lezq2oo8a',
                qualityOfService: 'mihqo01a2u4pxyvinmj4',
                receiverParty: '7y9kybz2zdaingco6h0h6gv2chj7v05c1gbchbahfg68ddamppcaoxkuzjpl0u0ekxqazq52i071oguqwj56k998m7relgv0htm7x21fn0fxg81a3k55eppbjonl553r50409gdcl7hatq76psf5u484yny6d9qp',
                receiverComponent: 'blfawu889fuyz2s253p5uhuhsomw2m8w5nobzql8dgc8jz793fhi7a7q9nr9a1r4xl0rj6a404sy7kedbjvhmhbtbhqxliv8x87pcwo72y6td8ig5wjy5w9mz2egfohq71h0vjslsjzc8os63swayy1dvoqret27',
                receiverInterface: 'g4uo8wdupjfc2d53zdge3t8q4433tsm59sdmdiaw5wgat2z5ynm9m9p8v12zfh7se43yzyop73r08udi5lfyb86bgqde0hlv2ho5n4zwvrqmrlv5hvb90hlfle61lu1jnnea8arj7rkmv1apjs8lbd05vx9z4s4m',
                receiverInterfaceNamespace: '9hcv4b0be48wqerzlla8shzkudbvoge9on1fdmdjlmmdh9kouwopj9irrjf58ijt7ckhk38ds0bm7dlx4ivpd1etlxa74q91ddgfmhpxz7hgre2idcgl3z01bjar6mqnwmphaq178ryc3h9rkuxvhx36xv1qm5a9',
                retries: 6993355922,
                size: 5262268460,
                timesFailed: 3319046039,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'qv0cu68u1a3gyqvlb7safkvh9msgfawsxbsoayiytml6fw3pgt',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'nnc6v8pzsu8fy06y8kx8',
                scenario: 'wzmxbotk3mi9gb6ldyec1w3udup3diwnr7pfeiltukhdvs7xy149bb9o7vw4',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:31:26',
                executionMonitoringStartAt: '2020-07-29 13:50:12',
                executionMonitoringEndAt: '2020-07-29 12:12:03',
                flowHash: '0k99uc5t3a4wzv4uxg5wijihm6550csi04iwvg34',
                flowParty: 'ej5r7k91l2wsu54q9kr12o3km03iq3k9hi4r4kc74dnghfja1cuci3km893bpvosy986yrf870emrj3bj14k7kw4wzvwgjebek03xkebmc7y93ki9c3999lr5apbvjocdbusa8t5qz8ca7ncm4l8dfgj1sdwm2pi',
                flowComponent: '78tl2iob9gtc0t59kt0abre2qs1yhte2y6c5rh5szh0z50me7qh4az21q1l94wf1cwqvn0j9otgb7ev4yqv4ygxe9sqwbm6p3hjr3i7mnnlfwrnooi70clv6780jamn41fx3pdnfq4v5g5q9w0h8wc3lfva7uc22',
                flowInterfaceName: 'l2aek7uismmfng61f55hi9716hx6iky5dfrnj2zk29m3g9djs8kgozds8n6xe9lcgpdl6dnbty93i2i6bt8gpuy6l604786mjg9unwgwsvi5zjuozy1hkuey3svynqg5vuo4f1ybog5gupda8xd55b9etkzwfu8a',
                flowInterfaceNamespace: 'v1ik5zh7qvvsd9uo47y8ycnf8huowznapuw0z8mkixh5fcsugs8n4nn1ushwn2rrnyjhko6thzt1etc7or3scv8tb7soh77v05awh6lhguak46lxsgbmy25a88k6iod8o2prafkvle3yj90gioyzdb9j97vkpwrh',
                status: 'TO_BE_DELIVERED',
                detail: 'Quae quam ut magnam. Labore voluptatem architecto est fugit vel eaque fugiat minima iusto. Maiores iste laudantium ex. Officiis possimus cupiditate sequi enim sequi. Illo soluta officiis blanditiis corrupti temporibus numquam quia. Sit animi quia ipsam.',
                example: 'tz3avsmebols70okikbq8e9ftmciwlhphyvcy21rdsacwwvsd9q0wevmr7rto9h4tmvou7uka29z01r12kolfknvb4gs95epfad36fp74ayq6xx7nw5mdn36d02tq3fik6eb7e0pu3r3qq8vaeeosjebokwgcof4',
                startTimeAt: '2020-07-29 02:30:58',
                direction: null,
                errorCategory: '7x74rzilw4sxcgvzszkhfufg64bgmtf0ildmg7qm4uzon8rxkwsd8amezq5y3ld0owl3emvg7vohenjirfdouy084a04826r8y9e72nhubl786n2xl4piugsl652suhixixsahlp5ah2a8hld3lhf21fdhcnuqrs',
                errorCode: 'ki526ubamfrxfrxc5mkg2x3qxfr9csy0sods2cy7gd34r57jo3',
                errorLabel: 914368,
                node: 6521157192,
                protocol: 'veiwgrmf8rd3a5dyq9od',
                qualityOfService: 'f68cyrkbteq6yx5iqwfn',
                receiverParty: 'xwpetmvkyfdiqbek8p7tv8fi9ajy5avymh8vc64be8njl7akxx8d28f4if1ncsf7iyu0sjkgpp6hiard1idqd1kuauzg15vuicamow56kouwnaflvutomapslwkknby1ip7wd5abb5miankaq0ipgc8es84nsrk5',
                receiverComponent: 'e5ok0833hw7qis498r9b4ygufkwc67ecx5dvqsucrhv6z1z2lgr9qyoemo9jxfsph711hnyjqqffyio3ees077bwn56tecw9s14r7g25o6r1uyj6krmxl6a7osq6sd0bh9ho18k3bh3m1ejmwncxx46mk5scoaoi',
                receiverInterface: 'lfjqpy4f23x482np5vm6mcnqpeo1rt7t7l63b6ricrv1vrtt9fnklil4ag3b6cov77z0096uxb21bh654vaoay3aikolm1dhc3g9sq7hbjlsfhnxrm39sj3t1idovlh0ppsi246xmyvufltbyn9czj1hzunl8pdq',
                receiverInterfaceNamespace: 'gemka0ztyq49wrgx9dhygpv1ziagf8a5vuotlfajkcfbo90zy3uk7l01f39chz15weqppxpoevpubcq0184gpfd70ubsr95lbuxp8u73fkfic7imqrb7xph9tog1zejjvmto4415ickejqewh63p25hiaznh5ghs',
                retries: 7729386443,
                size: 8915527923,
                timesFailed: 3181813285,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'dkbdc7pgyues87qmp5gz02b7hpumpqy4389zhezu7hd9b14oqg',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'ykb8tx9ahy0u6dn9ftoc',
                scenario: '34b12an96vqgrmi1i2cxsz4wfqde355n3ww55oep1cg0qs8w79ux59gptkrr',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:29:24',
                executionMonitoringStartAt: '2020-07-29 02:03:51',
                executionMonitoringEndAt: '2020-07-29 07:30:55',
                flowHash: 'ipswp1jm4lkjs26tnvbjhc9bc3wdvashefsza6hz',
                flowParty: 'l5uo1c5ygm2yxco890e9tr6vz6x7bfxcaq6svwwcesp1fl33yk9emghwshi8ypfz1a5ku29fypv4c7joqled20oy4t7w6lp2pfxbacy7jdda2uem3786jcrinmo55y65hqs0ifn1xu4u1ykw1ugewgge3lzhpm2t',
                flowComponent: 'pahq6c5mceqgxf8uu91ue26ycpq6xrcuimwa6wz9p150eerm6hhxyxt2ktg88x2tfphep4be6rvs3eitlj22j8xxfotfxun50nhr1nhenrkd62n1pwjs6ex8eu6fcfirdaiy82uapxigrewuuh6tm3xbufoj5hv2',
                flowInterfaceName: 'jh3jykkovqvq3b3vp7pt8el21zl3jslcm2flnsspo337slkqsvqgf1wx6fgr4f55tdsy4izbeasljjvrc1iajdz2km4wvppuzxhgjw5i6qigzrui4kkfacqpigmzg7b142506v632ezhnhmn3rhmfa88oak047fo',
                flowInterfaceNamespace: 'uihrg4v27rssnb9rxjtabfieaj34fe8y4036ycjh0gnkznq5k4qan4w4wfm86zidghx9yoahpzeqwkl0nrcezxpvpy6rv6sp7885l8euujh7sazfyhuoobi32o0bk9rak978s0i7c6bk3v3lqiokh12kd67gunrf',
                status: 'TO_BE_DELIVERED',
                detail: 'Consequatur sed unde incidunt assumenda aspernatur qui perspiciatis eius aut. Voluptas amet tempore. Vero itaque quod. Et distinctio nemo a facere amet aut maxime maxime. Et sed minus.',
                example: 'bkekneifwj2cwb6pe8tgq7y9n7yhnohzyxcxm83qx0tt50xmxp2qnr0smpiimry8qcqtwfli0q4xwzly6ukr91w41kt9hydwejlzstdc8zagbyph1hvy6bz5k3go5m1890ncfzxi9a3aopog1y8ag7bljn7w5ls3',
                startTimeAt: '2020-07-29 00:06:55',
                
                errorCategory: 'bh53zwtxz6v6z9f4khkekwnrv9e8ctml278qpuau3mzx3fgx18mo0pgzi2fyru0of0f89glwt6ykat4azbn4kvv20ljvl639w7tlu7az43x3zvev0g39517xeac854ateedjr89cw86vgh1wy1p1ucwdjdnvnsa3',
                errorCode: '62q3pa5yblxsj00brfnvpqqlnl3fw7au1ry1j8440xi6vsyvcp',
                errorLabel: 542707,
                node: 4753961385,
                protocol: 'e2a7w8toryxp3t03p849',
                qualityOfService: 'cu4z8eiezbx7169v274f',
                receiverParty: 's2g5mj69rcd335w15bx0mvn961kl8mqxdvode47mgih33inai1324opqrj50ujmcajl90axs1ce23ht9rvwjlflu1uakppne5c92hy4vo9p0gxdkb8qj8e7rv4ivf6ybs5tvz9jzy9vpc0jhti12qbz4xqfyg7z9',
                receiverComponent: 'rm5zrcik83x4ascalrzwetlsqlmoicxk6er1gr072sr0mdc1g93xmw7pcroa9ll1jfnmraa3b4ire5ijmj9qswp7ehik89mmk35yszd899cou62viugki75avia9ghdq1r60aj10uhmyqrn49bl8fm0zq7ugmv55',
                receiverInterface: '6xxe7natpgt3z53zxrwux3tijroddw1p4w806c2z8oz0cxerdwf9py1zmvodtnv9cqow7ub3si99xjl3n8nnlvwhkesykp4tc0n2k74tl4v9p3pja4ksd8satchmbzw154h3m84sc28ssetnecoelpkttp6443ty',
                receiverInterfaceNamespace: 'zzlkgcoxxa1mz0ff9c5igkqdsuqnezsoikvvw7shhm6rlx1rrkogn7z9dpuqcvd92zvj4hkqn1eq415o9leq87i3mjxc2w1i5y7myc6kg8xmlp5e01icwkkk6c88m66ho4ql85smpnaigur0ypd57j9w2k89hxl7',
                retries: 9786019729,
                size: 5428509401,
                timesFailed: 6473695649,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'qvr66prapku9s2mmt4wgsduj5b6ez00hn10q7',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '7szzsnk0ep9crp4wepck2x4hak596m4p71vqcpl4852pv7ervw',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '9k913bvd33hbr7pixg39',
                scenario: 'bk6hgbjn1huaza5n2hz0atsljybuz445r0uqeyhk9sqfnlha9vxrvoc48659',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:59:49',
                executionMonitoringStartAt: '2020-07-29 15:01:04',
                executionMonitoringEndAt: '2020-07-28 21:23:03',
                flowHash: 'wg37v10yv29ar0i95u7nhqo50b4x3mtbhbdp8tom',
                flowParty: 'iu8lrxs4el5pr27lek06euu3fvjpbe9cqz3f2mnc91dq91pktonppp3mq6ag2tw2m5vrnkobfvyfee6ahz0dxnr57tm8g6si8i22ptr2d8g6iuzehvxidgx17ou6uuszmpimoyvgltdx41erh7k66hvse4g6z4ts',
                flowComponent: 'hjv4sdza75ffxkh153pyrib1i2p332tnknvhux2t10crepkzqffrehs0t6ign25vjv2lp3zgqv3cn78tocue1swx80eeb9vzn5cqnu8k7w4lu2zax6jrhllm0vyaawrvux4pn89tj6lcakuw97fv0gjxdw7uzk8s',
                flowInterfaceName: 'r7h5060k3b8e47vrov9o8o0duy8fs855wn417s2eq7q18e13n3dyr7iji1m4ht3gzcg8x5lti2pofhu0amfmnm42sktushrsv3tbh4d08r8gazatnjfrgj2sy0kfmvpcy28jahfs0e3pkqxqhnqm3fuzrg3bz3q3',
                flowInterfaceNamespace: '5fmkol8w52p0wynrbnzpaz2g0vj11r9c4oz3d1hjkq6gbfs2qsmia1doqh6w7dgi4vqhxab41w1ps38j3s009dfsfuhzbr0z1p2gtl8a6h0db6el1dprmaj19dyil9agy4c1ft25bvmjclniqc5d3aea400bogvm',
                status: 'HOLDING',
                detail: 'Labore ut impedit dolores temporibus sunt corporis aperiam incidunt. In explicabo placeat doloribus quaerat dicta porro. Nihil facere perferendis architecto nobis omnis doloribus non. Quam voluptas nihil consectetur repellat veniam labore. Placeat vitae consequatur nesciunt eligendi est quo.',
                example: 'xp7pk44d41lqrqc13jiavyycrhq56s6gtuvlp1i89apb5olq01t41fczgechtvbw16rnkw55cp97zmzqlp8bekolf1wzj0ujo1cz2ba4o4owrqozkgpnweggd778r3k6vacori0rjwnep7j23v6cqy10b385yprj',
                startTimeAt: '2020-07-29 01:48:47',
                direction: 'INBOUND',
                errorCategory: 'iq8lghvvdteobmkbj81c2matnvecwu7pdhse7k9x468o3ljh4ckny7sy0arwipgy6rmk88ih2hvxvjif6h3tqp9b5wlhyxummq74wwcvni5jiuo6ukq4ubqgvakmje2b3ag5hr9h4chn9h9brqaqwwwql2ebj9sr',
                errorCode: 'ax1k6k82ulayssfcs0ol8b0bsiuurak8syk0fqgruyza2vlxqm',
                errorLabel: 716212,
                node: 7330662034,
                protocol: 'r4pedj38adzx2ebuuqzl',
                qualityOfService: '06h62sy8nqu9bqpohvz4',
                receiverParty: '0jly8s0m984rdjxgj0zrnidtk3e969me8h3i431jfoe721rvxebmycmt0c7gkkhiv3pmsu71hf7ipbxlsde1ez3fp42vsnwf80ffajbwri6fif91gjtiwxbxa5cfx9uze6nkev1qn53xky8fqwytnaxsc4mhas3s',
                receiverComponent: '9gahh91k9422a3cw9bo15rg2pc2qkeybqc0519wmmshi32zkl7iy5ee2jrsdrxi3hxci6pr36zu2ebxepb47rn5o4jk3d86jazpre24cytshfhywocum0wet9ntw2xbdndd6q1mefq9835s92hmjxavp6eyw7rjx',
                receiverInterface: 'qmf96cehvjnywx8c2q4srx8dxk0rfejl0pyj5umdrxx7cmfhgp6hj6i5h4y8hb17k9crox5xvst2hjlr69lujxdlj71mqc524c1ap8vez2vy8c8bcs866ewqxjdc95al5ohh6t0gbzritapvltfy8lji8i0ue08r',
                receiverInterfaceNamespace: 'g8ovfdcjh6stu738m92dz0yfpt7tbhj97v6836rfsrow0joff9wzcz8dopis0cca08ujca7vswvxnfcx7ugq99508bfq4r92wcn6cb381kqonzz2c1xxkz1td44ddjauwkp4hmw9hhin68a7g51exfwa9mscg7sl',
                retries: 3403848689,
                size: 9520345935,
                timesFailed: 7092617507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: 'urqay3ut4v0lf10aw0fsu9ga30e53902co85p',
                tenantCode: 'vsvb7wbtrk58k8zvslgtpgfly7mqh60dl4vd8bq92mhjjon0dk',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '2daqw4t7e4y4m5xjuuuc',
                scenario: 'xtjbitcta55592rhekxjb2lc7qod5x7vt7jhzwhm38ty1ji0w0gwqxxzqoo7',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:08:22',
                executionMonitoringStartAt: '2020-07-29 05:48:40',
                executionMonitoringEndAt: '2020-07-28 19:06:24',
                flowHash: 'zq5pe53owxcabqpqlv55fyd4xn70wwxi3avd5dfm',
                flowParty: '8hly93az2gdwyo8ltzqftc3fvtv8ztp7hj065pobln8vbc45zna9naibtv6hpbh1jfabo7dvpvczka5zexgojk7294t0vmhfhlr8w219g7hryyg67stxdudmcewy6csswog3ig0msdgg674p5qd2mhi1ndl1e3a2',
                flowComponent: 'xevr4rdkbu29oqk2rhw04ul10v93g54gnmzkylokba1tanr0o4yu9yhbq645ibt2fieskcqh8slbsvh1pvq5ajnnnvrg2j4wgpc4ttbgayx0obnry7dbzpsewinck9y2w2r4q23twzqu3ec678hyndhhx4cvp68g',
                flowInterfaceName: '394ui8iaklbs7897e88pmyn8w0higfhpatk4dt80d5osoaucfo9dlyw3vb8shp2wc8fv4nk7cjfvfa9354youyqbhk9vwzgfc54y2pwmbjwn35yrm62snccco0splfqaz60r0pax03b2n1gv9um4mugl7ag7wr9w',
                flowInterfaceNamespace: 'qkjauogk8xd1329rxlsmzskz8wr920k0dctgkvwfb6rb56geapmnp7fjubvwzja17iu9db4f8qpgpg2i964ys6zjvss1kta504tf4kvd1pgbwy1zdqmenlc67agy4mh5gmbf3fkbp2nj0hxo2hzgnugax699yc1z',
                status: 'WAITING',
                detail: 'Et et necessitatibus. Consequatur quis necessitatibus voluptate quo unde perspiciatis cum. Saepe et consequatur consectetur debitis natus excepturi veritatis sequi est. Qui sint ducimus dicta nihil et quam pariatur harum. Voluptas aut ad deserunt nam.',
                example: 'no6bpktctaww801oa9fqgn5iqwssoymkf00bixb5giilarbw9qrv5enu9swzviu00hqahf103qxhfuryhgj2g82n6mxpendjv02w7bbc70ioe0qy7xvy1nal5btxfacrdrzzb4txzoj42dtjjfiglwz6ladmyvxl',
                startTimeAt: '2020-07-28 16:50:01',
                direction: 'OUTBOUND',
                errorCategory: 'gz183c7b6s71tt81drzyybsdy5qy0y8oew4bn2osysjyibozth96rxfin7lfc37p5dcrrfp32b95mr2u21xnuv1efnkwefverrydf36tz35qq4ung7z7iymle0u915hfe3xb83kfnde9cg8s5r247jxfrsvi2zz7',
                errorCode: 't8r2f55u5bu8cuzifxrr0cfbu29rorte6reuflz61lwvqvjuu4',
                errorLabel: 959514,
                node: 5055863585,
                protocol: '00ryub84sre3q33b3esi',
                qualityOfService: 'oa2h469gn0mlcqfadla9',
                receiverParty: 'zxd7xfpdzzkvayl28pddpxp3wbdfiffnibz2y3mhkjwwhrp1nnpmbi2ic8q9vdais1oliwwgu11li6d6o99o14hmfpuwj5gnyg924ez86vvd1j2awgapuk4tdfj7ezhsclrg9476uzdifj527wia7fcvkvt3jfwj',
                receiverComponent: 'w3hv8io13tazttdoxdhipskd1jc855o0ong8xz778vkzfmjh967pp5ffna4cpxpwog8wi9rkuipmg8xg70amenf37diaqbap5gv9kynj5wxfv7e7p2q8vi4pz4q9v5l1z0ymxt4zvuq7m1a4griijdpb8t2sclsc',
                receiverInterface: '2iwuqnn2vwqh9srjanj5ijjzirwbmb8ucvxt7ys5cnyxbh63u0wv40mzmivzf4yfih8dhy5fmynrkcooqjs1cvbeh53fdnelly0qqjng9is1nkncibuvlafp9gno1oily7jx27bzgdme1tw9l63ed97jf29es9eg',
                receiverInterfaceNamespace: 'taw8fdsv3yo5sea8w2oowrfncmgzvwgykjmt09utmz7yz6lri834c5jhivuq1475skf5vmrii0v2u1iszcsltz4h6gjvadzcvzkxgq4m50zyfy5m4nealq6eap5nbnmao9zxnqsvslk4vet54q75sxzgpvk99xpp',
                retries: 3146629517,
                size: 4371323302,
                timesFailed: 4072504983,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '3cc059jhc0psgn09mfedc9qy50bqneh8qzbr62dcgsojwzufxc',
                systemId: '48b3qnxerniq68jv00sfz0t14gir0g2a4gqi4',
                systemName: 'h8c6ahxel9r1ia339nf8',
                scenario: '77h9gh0c5mdaxtiry7yawr8t5avwuk964u3xegcw3ck2j4y9ao4z1pjtlidf',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:24:55',
                executionMonitoringStartAt: '2020-07-28 15:53:47',
                executionMonitoringEndAt: '2020-07-28 18:54:48',
                flowHash: 'v3wmfycv204l4zm9v1tn5rloj59qgggw910lk4oq',
                flowParty: 'gh6bgl9iicdcdblnyul28l7fd7p5b5j4uynsqrjqwa3i4djbi77twkmtihdscmckul7taryn9hqz2rhi0izo6l7r1qu90j7qpwoxuc08rxa2nylhj2xrgabbg1w45jp1qab95sngf6dcm75xim2fgfi98x08y5i9',
                flowComponent: 'nkjwhsif7kszvad3tdlmrz09l46gr0jq03081p6meg61dto2pjaq9msd0muitzd1uac5h5a57uq8yb724bg21ve3zw4mrark3o40qvm4xoqwdz8j471m34orevw02ry58fm877uwytbjnmnez0bzdwel5n8h5pki',
                flowInterfaceName: '6po18xxmuzeh0xm2k8uqt6kl4fv5adtvs4iiu65lg6v24cfzh9zpwqaumh38tysqymqd3v3qrz1pcmz6ax1kr5nr9yc3h1gtly79x2kqmm9f2gpbykdloyfszg7e9qzi8fmwmk5ldl2i9zvooiy9ejuxa80grmbd',
                flowInterfaceNamespace: 'h40398a2kuoiogzz109a4hgxw5d8flrayjt52ytl5v679ijg6jyrzpg8pnqbeoneh60g6b0ejp5ha844jejrp6h7w392m5jfivhmk34qv85o4zst7oo1p67qjt36mu7y8qxfewn63no1u7zaem5nveicvx2y5b66',
                status: 'WAITING',
                detail: 'Eos eum maxime eveniet consectetur a reiciendis consequatur. Vel assumenda est. Omnis ab et molestiae et voluptate.',
                example: '9wa3vkt1jxjhsetk8z69lvwie55te8e4u6e7qlbl4dtu76d1kbovqa472lxx32gfbogrs7gda0e2eyhv1iu5vz9c3nm58wtw4lr6zib8hvr9i6h48ju7s2oa0kvo58yb043eu731o3d72sviwc1un4f1xo311mzk',
                startTimeAt: '2020-07-28 21:35:17',
                direction: 'OUTBOUND',
                errorCategory: '09knyxymo189she33mij2vt90dedq0s9xu8n5t0m8reb13p257par2lik313drsvugydw0s5rkuby9dkb8zjoyvq0t67o9gr09ibpoybhdhrddkveku2ntbopekl9lcm74dg5ydivf29t7hwbxzj2mis4a8o3yru',
                errorCode: 'prt49b3ztlxrnpif0dzl6y5p26n10xrdf3eq7ph6ek0hbi03b1',
                errorLabel: 482233,
                node: 7446218968,
                protocol: 'aloqmu8znfiibffn8tui',
                qualityOfService: 'm6jnzpp09wv2p8djgycg',
                receiverParty: 'dx17re0nzbqzexry27r9cwpc6urjx830aw8dbqfwb8a8ckxt2sse4xff7m3qey2ud3zpmaxv25764jcgbr5hza7jo24du1rjef7p89ruqvaejpwmojbdhwjlegvi5pdwghys75f6hr30gxjzq53mcl7n77d8souv',
                receiverComponent: 'nov91lp5sgluexfs1epicocanlajavh8ycs6kwdvvwychbzbbhu3pjq9nj5xrzgc37t81ar84kykujxxzoygvkk9681z8mi0kgw4cf367cqu6owff17fpgccfn66ck227inr50hdoqutgqe6j6u8miey6euc5u21',
                receiverInterface: 'pwz639b58arp9m986acgdymx7r1blsim2w4x3yys5vo6tnwj3iajhgqi6laoezvrymb6g0suyx5kh5aftgsv6axqk5m8p3x8zuz1a5xoi0dq5fd13jt081psxdsjl8wew0xpnpgy0lsd08v4jtk2yt5aqhkwneti',
                receiverInterfaceNamespace: 'q5f9xsm8ffwziky9h77vnf46qrfndqaktvset2af6cgmnfd2j7r63rmfpqu5wufeymz8nf8iw1mdnhxebur05xa8dz0wvp0bq8dq1d2xojniquqefkr2b6jki3cxr69ejurq3tvqsok01aan94rl882muud4k5b8',
                retries: 1424882124,
                size: 1833808312,
                timesFailed: 4300155935,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'dy8e7nffnligxm8mwy4uelrher4eevgf5grhclyzksu0mz6x10',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'oyol8y0ksvcgao7xgr47',
                scenario: 'npwjc8ceekp2iucyrl3vp6i2axb80zixrfzxieh1c1nytp02u5ff1nnivc0k',
                executionId: '6ikq0tkxk8knpior4w3m6w9w6umig5adgh6yd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:34:30',
                executionMonitoringStartAt: '2020-07-29 13:48:48',
                executionMonitoringEndAt: '2020-07-29 13:04:45',
                flowHash: '0mjjk4v51a3wnezqruvw53n5724c66ackoxgv2f1',
                flowParty: '5akri8lk8p9ct010rwdowc74ygwau5hkfnlwwafh7un5ul7papkxosv6qrgv2a7iiqn7g8so83zsoco1ecc1q98iznfn0aeul9qgciozb02sc21awy9rpthmuo0wqv0zx2t2be5hbcdwe0qpyglzucgirbz4svnn',
                flowComponent: '20abxc68bb4drp6tjp5l8npa1rbl54jz1s0626hkdbjz8pw0caieslgvlarg5c7e4pmpofvd7i908gvv5a07xp4en14yx67vs7jsl9rmyjs9muevlsd9u20ztcz4cgkw58fh7jqa488xv9byxbv77d1324oeneem',
                flowInterfaceName: 'm6cf4ljpxmnnm6ie26sn8adz0l6y9vzivao4hrrdyusbr7kkaj4o4pdpag2p3nguniww1st6p4crvs9gpbjaeh7nx13qpms2v986b9ljixjs5o0egq0ov9c5knwqjzshsvclennic7zodwi6uvkah1mwrywmtbh4',
                flowInterfaceNamespace: 'jocmi65gbdevzstia045qzkuvkjyfthsnq1yrpaycfpc8n3ls2mxekltu4cnywrxr8juw4ib87mxamgfccwvaoh0vkdcc428wg8me49jkr1t9xwop4x7d3z9x8b1sy2ln4ryd9h2ay66a9vxb7hxpbecg4avd5p0',
                status: 'ERROR',
                detail: 'Molestiae et deserunt sit a. Consequatur at omnis nemo sapiente delectus alias corrupti. Occaecati iste necessitatibus et reiciendis similique sit. Non enim animi error hic quia magni aliquid exercitationem vel.',
                example: 'aqjjv7t75dxqxlvermn9ql3jr6i8tledsn6e12ae1u5vb68udmj8ul16yjnwym6fhj5u4agzpp9odq8ov168kvtc007zh51m6uo350i788m05libqf34ufmiyfezbfc8rj11iuwmoofg7sl25rrm8h8it9ceeyjd',
                startTimeAt: '2020-07-29 12:49:20',
                direction: 'INBOUND',
                errorCategory: 'nnw8qrf86ekzei1g6x6d4dwnpzpj2n2hosenugvski1nkukhcluofhn1gn9z1hq314feifaygoeo97ff9mniw27j0o0bkvd3t9udr8vlae8447slx0puy584fzx07puwfnf8fenf2uad6yazknk7vtdq8y4fvwqd',
                errorCode: 'zh2hsvhmzytgl0tufmgj1vuxnm945lzxa4dyzve5ala87rrm6n',
                errorLabel: 340173,
                node: 8367225952,
                protocol: 'oqv82pdzo3clhmo6ao8s',
                qualityOfService: '2s7vnjqhayboopht06dp',
                receiverParty: '44h2vhzwsh9s0sf6ixw3o35uyni0n6nr10p77lfxpz21sh60tzs9hmijkmnm5aokh4i1wjr2tbgd5slprlwm1c76z590tux2rhgcoogbdnl7p12kc8fvvfxxpzol2eox3drlbb24nh3fvy7uhx78n9sxgucud9qr',
                receiverComponent: 'ff23cet7urdvnq2napbp4v41dipnsu9s0t27js8i1mjt4lvcz5fpacgpqdikjdljxrinjo9mebsw0d1tpkp3p90niu34irpjodptogtpbhgvpliju35w4l0vkdt0twbdqdv2e7rjabb9xa483byrl3tgt2bxf4gj',
                receiverInterface: 'sq96yc5l6coxhquhdjrn87e5jqefvk3s6buunr01ud40okm9uyu18odqfeiv3x9b0lnet4ezai4w2mjgd1dfw69k90ljomm03iathi493bsejp9nrlodzy8ummr6o03adpyinm6a5kums2d5z7plw3cjto5v1zd4',
                receiverInterfaceNamespace: 'w890nhmrg32ifnoheaitx2nvj6mlz37mz7xnkr2ndg0fyusywls2zojco7klucegdappf5yih1c75sjpqbd4y76rjgegzk3srq2em3vrn025q7g9j0s2pitr0rx5t1f0s5l9hffaclns602njro03apflu69bd4h',
                retries: 3847923150,
                size: 6150224407,
                timesFailed: 5246377539,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'zuphmpa0vwfx5itvzyjeeb8anss1gf7biuep36t973bfhtjqtc',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'jiokumk7lbeellgdt5hz',
                scenario: 'v8uk3kd4s71zwzh8ze3y132me8jf7kbbjn1o9epd963c5fqdsd07bhq76ih5',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:49:27',
                executionMonitoringStartAt: '2020-07-29 11:18:06',
                executionMonitoringEndAt: '2020-07-28 20:53:27',
                flowHash: '82hy0dzqbsqlszsscd3jj00vd1fv8pinbof8675m6',
                flowParty: '23jztp4mlgryvk4eu17s1eb5zj6okja54niung60bzhubd5vy7ajvvu9peplp37awj6jptb15yd8msgtpmy48wt5q8yzjtmm43nw2oh2d1a0a51b3m2r7kxmeqgsyr920do2b4kg24ilfufhy1rfx0ohtiyip2yv',
                flowComponent: 'xsvu32gpexlep60dhejeve8s3wmf1x41af6vnp4u0seyvj7fx6zt4j3hknsa0xzzg620bdejqkhegswxnhlfm62mbqr3xx2ksuucc1z32vk9tfpqt92rqf3fiibyq8cnum26qfz3mzgwwga1yeuglfp92dso0p23',
                flowInterfaceName: 'a9ccahnhqxrobj9svotgfd0kpz3vk61112twp1pbbgr8t1zgbpnvirmhxde39rr795lfeucqtqtvl598ejow1p40zr0xhbgge1omzgwo7i27lyclq1htxyiwa63stspwxjjya2g91m66bfy9nnvxdca8olbz747b',
                flowInterfaceNamespace: 'tlrgy9p1o3p7e4umxh0exgxiup0oj0c724yxe2e22r8a9t52ak5f3kgysi3bukao5enowueh1t2otu29xhsgijf5emgvbuj90bb5kikbha0art9qfw9njg5cn90yzmex82meaqf6uxhrynbjmf73aw0mpy1jiysz',
                status: 'DELIVERING',
                detail: 'Nisi placeat nulla repellendus molestiae deleniti. Nesciunt nostrum eius qui officiis mollitia sit suscipit. Quod vel at beatae. Inventore atque consequatur ut vero. Corrupti eum quis est.',
                example: 'ntxo7xd776pjyl8x6pdw4bq7zf27mzikjjaiopn01p93rzd8uey31lkzioicf0l71rouxu8ivbdkhhg1uc7gfr2yi3ci6x6gs570eie3rhcsk0hsmrk2829la59ocn8vyl5v0vtlpgad27yryhgc045yabjxi9rb',
                startTimeAt: '2020-07-29 05:12:24',
                direction: 'OUTBOUND',
                errorCategory: 'wzzxotr17x6skisbn4thobp1pgr8kg66avpfg1199ptcbhecfa2we7inxk33laubwvxo8s491qh8y1afmdcv8hhoik69wun0oo59z2493ffslp8ed4zetsgr2d2b0st34ie41l3ea2ofq4s7ze3qrgn8w93vfvis',
                errorCode: '1efa69wi50gc5i4lb2xr65sr3imft2i581e62jc05ot72lftbk',
                errorLabel: 552671,
                node: 1408846785,
                protocol: 'hnuuyf4mnts669armxsm',
                qualityOfService: 'xlmcws0bfih7rbm8vc7g',
                receiverParty: 'pc66lc1mble7swg8ap4xdguqm24ukwbvvg4u58wuan7j6kvej877560mfkchyc6jperou6vn7gedkbmm8fa7x9v90b2h6n9uo0b2ntbieemordh55ph8tyb7uwgcdwrqfg0aqb0zdnidgzv3o0r968y64jjig4g5',
                receiverComponent: 'c91ttcaffmfm5t5xny5sawvdcjdhgsyskenjr0morzhksrb5rnn92rqa7vmiq2cflb76kyr4ngchkn87vjoh61rx6csfyzwgflto5q5n0hh7ribp1wcn6s4uul5sp48tb6ajqgxxud0hgthp9o45fkykcqg3qx1g',
                receiverInterface: 'z3zlo7z2hso0ynmkd4lq90ftvvqvaubxjtjrjg5eeo4icsh9xi9yxho7fh0u18124dmq251rv1ze3n7baeoq5ygdstmgys8ch791lq6trc3iprso2m0wtrhcdfmm1eo1u9m4unnl1lumtlh15jay5l8jc70g4ym3',
                receiverInterfaceNamespace: '7ukyl8ug46dgdn0i4jfpekr4zcxaw6c1isaptiueoo5bvrrnzu44ba84od3e2e8ruzqum4ndlrxpkt9ln8wp6mxezft7rtrathwd5e1j20n7yjfnvy3y6lu4tc8h8z3nq5ay3koeiq72m0hzrn2ba6w7f15w62up',
                retries: 5619502101,
                size: 8715471141,
                timesFailed: 1107994699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'wgs0a3zef0axdgv1lhixqpscqnivit9w5ct05lr4uypjymzqwns',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '3njk0gzqol1b2h0pcqoc',
                scenario: '6m099fb91rlbps9se7kotv6ff02be736847306klwl0sal8qo2s0sbpzyhvz',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:11:22',
                executionMonitoringStartAt: '2020-07-28 23:16:12',
                executionMonitoringEndAt: '2020-07-29 01:54:45',
                flowHash: 'c0gyqgi2j5gw962k862shx4ad34i0ukj9fqmer3i',
                flowParty: 'e2wg2x6atrpiekxih0w7ugorx2fb42pqg9ozw009f6l94y8kzlgs49yhzrdsopnyysbst5tymoqz8ehcrkqmyrtmsk1mfv0tztfd1v9hhkik7o1e0w5ztb9mrq0tp8afc3fr7uf3ontimgeb5qirhnzhdfg1pka7',
                flowComponent: 'c9mr36g2s5j9o7bzup8c9mmq6p3gogzvzcxxv7sgr4q31klsui9phbkm6zhdl4i3ybp1nok7emoatlkg6yse8096071unaneeml4swddfsw0tv3r6emm53849qow2yasb2ng5d254zo1x3ad12ls44e31c8ht0l1',
                flowInterfaceName: 'fn4ixel6qipowysbnop676bjqkrwtlmnlfddqwlh3a34255flkbas4xzdvbzrgch8mrbx53aab1smntetxhq4zmf0z0205dr0huyjgh2g9itt59m5o0ka3793tgyabtxwo4nnrtwj1ii8gz55ekahptsna5yfs6y',
                flowInterfaceNamespace: 'uwll90sh7pb1okbqkehxjxlpmqw5f1amxz0p433p0v07squupimcruqh38doem07rmqzt7t1bcfdngiaihkukvakf227zwqkuovx6vnbg7enff1577c4as3bk6aerfbnua6hvtft0yoaqg8zlez9ejzukp2jtlqh',
                status: 'ERROR',
                detail: 'Odit enim aspernatur sunt earum aut voluptas vero est. Et consequuntur numquam veniam tenetur fugit quae. Vitae eum dolores earum voluptatem earum officia. Similique in reiciendis eveniet ab. Blanditiis error aut rerum est. Id omnis soluta.',
                example: 'zj77ko92gtpq4bds3yq0vu36q0qxn821en77hckgac7gfo12n9dq7d1e44kai2f12yhyb8snbutt5c8qpfxu65tgz55vphowpd0tvkktwh406mqsgbu2vxh4u3b2xthmcai05mcbhfwpeo5hwfxi0bwy49o7tikf',
                startTimeAt: '2020-07-29 10:04:48',
                direction: 'INBOUND',
                errorCategory: '9rjo8ggohry9p83pxx64gyqpfwiv75d44t4y8irtyaxaomngtf5xut61wmjry0ftbzcny05xca0lzph6gvo1prodam2gh2d6966ezlxnkrislilbip9kudek5707c0hf7ajj1dc3u6g8m9dh3phcpghb78z95l09',
                errorCode: 'ntvj7tq1iigl2q6nc2zmg1i2r5dhfyaiy9zydxemkt0w4qn0hw',
                errorLabel: 937808,
                node: 1676391681,
                protocol: 'qi03lolny5dvmbc88duk',
                qualityOfService: 'ls21alovy0bprzljb5on',
                receiverParty: 'egl66g66mw3jmrez58asngdb96axjoduw0f7nyh9w3wyupdsmsipwv91wovzut95wfvubjeqdn066jrk7yqrtd48u378dv1exijljsjarjydciaqsubw4hoegwqjumvtom4pcv4pkdtfdfmqal0jwtfslf75ff4p',
                receiverComponent: '8kcr9c8cfadl66ikf8vvjrv4vsphknicfa4er39vfn4xx8p588dmvqv59mpd6k8ey8zq7vtk75v93qao02vlok7z65f8unkmg9wdzck2v3lc0rvw6omzaxc8ozs9yftrhj3kw28ify43lbi4vqgyo6rezmqe4cpx',
                receiverInterface: 'gyjb94j08pulkprzw05oihqbp0n8u616vacp5iogb55tj20ozso8a1q23vc4089djyfec8pbw4xov2suxkn6guex2bw3y4n6klrr2ztm024f1fpe6vmmbqcrvj2la0ecl3p5loa4gvjdbbl0xr978712rd6m4rj0',
                receiverInterfaceNamespace: '78ws8x1f6l1ure475nn7v2q604vk7aal6ae6ivgc6kccx22d053haqfurac91dp09ew5xap8kawu1e0mqnimhaqw6gcg6neatvf4y99r4nxld054nsgk97mqnu9ygsooytukle9nsfzzyn2kd03yy133pjbbnuat',
                retries: 8555044833,
                size: 9928518292,
                timesFailed: 7984659952,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '6cjnuaxmabgmp9ixf7xlobzho395npmr6bg8g5dlbwbu32e14z',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'qe2sic0nj9qku9i6s054m',
                scenario: 'eud4spucvn5di5rwisvs3jgtoxge8bqjo6b4z79bteprh3tuf5cqd99vicd6',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:17:59',
                executionMonitoringStartAt: '2020-07-29 14:11:05',
                executionMonitoringEndAt: '2020-07-29 08:06:04',
                flowHash: 'f2eceqerktk6hwjv0uamr384p0cnp7pknmm4dn3h',
                flowParty: 'xv5as1sx4ywz3dnbxmcq8c7k8bb3hr34k5m2uvwedu1a7l6ykjzkmmkhx0kukoll78xo7hgt4ydkkxe8vuhs3wsa3l70ofl5frs47euzuvo8eu9mjinkv0aryg6m9yx3k7ci9xt5zy9ra80k4iv1ygxl2od3wr2s',
                flowComponent: 'q7y9d1om6ksryyarkjcoh7sa658a8mmgia82ie0kesrsyqz5z2o7hjrig9k4m19pq3mgyz1ec31dxmaxkqqerfwcfjmiezs60ykcfiw31ae5a0860wg5avxhl1pxjnkjn5lp6vvv1q62737s45xut72t3suuqlhb',
                flowInterfaceName: 'p4cysb0dz77dy9fa784sbzwl4jyual6wgtkc8ejwpjpezrx5zdbirkqp2zxipkwowexmmlypvgqh0ltc2gp6x4wji5gosw3iby692pmn34j92u6azm29ebtfa3qqkeqo9h5a5oerx5d1hoo1omutqsv1mrp9cx28',
                flowInterfaceNamespace: 'd0u0c4cpz4br43dclb5bz94qybg14psxd6l457t7j9gngmaym1ir0zhavrvbflrl5ooeyeyansxdx0n005nehautublhfs8k5kksz4jwhhucf6vn3t8t96kfam5o31ib0fo2oq20thnjhcnhu8yqdmn066hjjjhg',
                status: 'TO_BE_DELIVERED',
                detail: 'Sequi at sit corrupti dolorum sit enim. Laboriosam nulla rerum esse molestiae aut. Nostrum non facere delectus et alias consequatur repellendus earum esse.',
                example: 'z48h1g9wnx58ubx8umd51kbtj7zi1z67q8ixn1oal9xsgrtqts2fc3spcf902f698ixuz2luzkq8l3psaudmx7xv4p8j1lrckjwc3cuwxh9bra94x7rj6jqwttveqsucq2plphcpl6nvjc79po72aila1l3z9tuw',
                startTimeAt: '2020-07-29 04:10:51',
                direction: 'OUTBOUND',
                errorCategory: '310ioo70knvs2low9c6ys30zq1sy0rr43s1sv2kbsruhujtfxzgfctxq73entqkru8t1rl9pkajtz1d9qihd7mn6fq2klabntbtogxqo424b2rc1nmiykjunu4xxlmjk2qxx44fkw2pdhf5kmdg9r44wf1lzrt74',
                errorCode: 'bun97xxwsk9ntrm27zsbzqvr1tjt2pkqhlzjsnnt979u66euzz',
                errorLabel: 426116,
                node: 1841268180,
                protocol: 'r8iypyqo3jbbsh02lc0u',
                qualityOfService: '79vt4fdloigqrfggpxzq',
                receiverParty: 'jymxwr2r2xkp3k1bh55ziwks3pq4gwashpd1xm1rhar2tiw08trgpcnbub9fwrr81yw828lpnvzehad0mmnfanx71cxdsz2d831h8zi7x1qe7ujb8yufohch8vmow89w8d99n78uj2llevdlbecln10fx1liira2',
                receiverComponent: '8ecvz556jhkavvak7em09f14lger3nx8n48deks3577806zj7l6rb3bra9lruziyi6qeu5uxsf3g0bdaekcf7lrg14yrdnqhkghb5ztbhhep5y4wxkw6mqrfbxd96jp3kp7hk8ijs5r426d25ooqqt16ia3t7x6z',
                receiverInterface: 'kfod6rjctq5sxsijxgnd6pzv8bj167ujxgqv6yvs61xedjt8seko1y5k7qnbt2xg4jplnltr9ejtvyrkxkt2n5xovhn14oz5iqbxiqqasywf8ipqk1nd5r3d3420s62ub7lfruj9c5o8o27eo8xma1s3gku10q5d',
                receiverInterfaceNamespace: 'iw0r7cnh4ii7z1eb65laudb5rw2s2jir8u7ihpcsqghykfe3t5qyk5pu4rlg18l6z80qftcyvxkmhe3zm2tx5mfg9bgmfb9ob0q9coisgd1bdq610suyj0tivpuhcxozbx7nz53d9drxtlfbpgiojx5jti54ot8s',
                retries: 4079428197,
                size: 5082234363,
                timesFailed: 8649695490,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'kfpy4a1qwh25ugybzp1pur3532kucpjjn50guyx7pi9f6ff2lh',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'a7qbfx69xkr2av0q3tbq',
                scenario: 'ltj7daxkrma7uzozw63426s2vchuptg3jbfgbwvwy1im183bnzffqcf82fz5a',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:29:31',
                executionMonitoringStartAt: '2020-07-29 10:54:00',
                executionMonitoringEndAt: '2020-07-29 04:08:32',
                flowHash: '9qg4wu72quyxs574b9jul9w78wfk0b8phs3c6mb2',
                flowParty: '7z7ga439iym5n9m6rn64gon62yh7qo6nc57uyjeoejkem4qer222k223arjija8ma1eezaxviuwgxrfl65dmdnm4o5ei2orqoj9kp1u79a08r7htfdrb2chmkyi12649clabzyyd3pfq7jfrfbg7kzqjbl5dbqs6',
                flowComponent: 'uhqoen635ecd1s1ht0xouqlvoizhftaqr7eis6kc7dzg8klxt8f6caw05i78nids1g51mno1hepmh6hq4nplvcs6crfcjw148pkx8eftrdtqbawgeahjmhsrng5iwj0a2qbmw8ail3jx5glfg39mani9pbhqzve9',
                flowInterfaceName: 'ztz36exear8mbuaxqghuojqjmrb8xe3pz6sz8oletbrxf4hdgacwsbiazmqxwub6706gmuk04y2kin5ygi0jtr774pdcbn7pk58p101l4g07zy69k99471nbt69kobuna3jiccmuvdmmigfiebr3tbo8ntvpzo1d',
                flowInterfaceNamespace: '9pnqpyzzqyzqm5heale3ddyii8ttyvkn9zcoekjnolnssjj7ehb7lv806dw5o2p7w2g0spk16ojy5kiv99cc23umzx13hgxzpq9pw2o8z4uc4z9413oezuj7e0pgqkvv155erp2hvif80gzqou7tqa3js6a5dcfj',
                status: 'TO_BE_DELIVERED',
                detail: 'Quia adipisci dolorem eius iure laudantium similique incidunt. Enim labore doloremque optio beatae distinctio praesentium numquam. Exercitationem dicta reprehenderit voluptatibus. Iusto aliquam accusantium optio et in incidunt consectetur provident. Voluptatibus repellat repudiandae.',
                example: '83xyjzfk2y1kp3k0fskmkk0mmw5jsddbordheqqiblpi5x8bk4jvhfk1ywc7hy8g037hmbeuxe10xc27aelhfli2c6oxr90fr55t3vfq2vgy1cuhtgxyr1jhjgw87lexny2i4ldrt058hkc4ty3c7iquwvgoon4z',
                startTimeAt: '2020-07-28 18:52:20',
                direction: 'INBOUND',
                errorCategory: 'bxij4dbwqlzs5s6kobxi43byrbgp67jqjb1o6he8p8nb1h7kvi9ogbtq6c5geghbzmmy34y9wl6smy42cy6fzcd6o4sg8ee3gmynsug4d9isnvs657z5me0m6jb9vnb0dsy91opofq3r48im2pi3qnwh6l6idvnn',
                errorCode: 'ik2m63bsk6a4m0kzev0crdrlyfifm973zo239ps5d41vivlrp9',
                errorLabel: 797954,
                node: 4626777112,
                protocol: '87v15nw9q0ny7hjpxajf',
                qualityOfService: 'almhma4pigec5bazsdgs',
                receiverParty: '3rnyjp4dhygoz90y53qw55amqf30qaj4yhg4h6wt2fob8yezptorn8fmq4dnvkdckh8wkauv4i0xhzn2i9po0h7lkg8khdzvbsi49drdyu1pzmqpfff7pf7d67pt0we02ydloxz1jgqwibxm347z1uil72o373kc',
                receiverComponent: '0j11ssbhtatfpvfavi5s0sm09kki0gqd9lpesrfbcsc5541k742xggv7p2i7jyoc5quf82rp9pmngt9hqsu783h1fainw0l9ac2qulkqb4hpvxxpi5mw4l6vfiow3piyeeq1ay2xtsg01dc7mvfr9fp52tslnuim',
                receiverInterface: 'nnk7wib707kofob99gbl46awnawzpha5zxd8hj54olx36lpavopv0nzwu5htoenz0u6ss6uy8r9ajoa3mwxhg04jt0ylmsabkutlaj8ghm2r63jajjfpll2rb1z7k60rzuzo0lpeluvdywk7qdk09ozmi23cnjlm',
                receiverInterfaceNamespace: 'p2gytwc9hvmrugdtjhuziz6gqen8bsho1n1n1lc07g1k9ww76lcpa4wxxz8ppthw8qgxmkeh0w3ncb42qczhxslxnucu5jlptex5xkglz7mhw8b6fwf48h302l7o1tg9z8vkaa79g3auoiip9677d5rtwwtsvgk7',
                retries: 6548525110,
                size: 7655294718,
                timesFailed: 3366186202,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '4mr6hwvcbfbiriozztk8q6dzradaqk8a6ht0pn6egw9lx09ens',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'mwdttyv62j1fju5zjcxx',
                scenario: 'o4jkmkurc7ddywp283dhfs224hwn8w59nflye1j1d6vf6elvwz2j5a6vk3ix',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:50:41',
                executionMonitoringStartAt: '2020-07-28 21:45:37',
                executionMonitoringEndAt: '2020-07-28 18:36:51',
                flowHash: 'pn34csqob9dw2ue1gtdjwxyud0jk8irp5a8tvr4z',
                flowParty: 'nftxhz4767pzf6c3twbkfrnkir48smmhxh94ka8a24x7uba23jkbqobljuylb04xi5th5bdkgjeqwq1w0343zzmeunyafo18ocnxvazen07uqtvdps9g2knzntr8tc9rxhz8n2moqnzqszmg9al6uz5kv3femg8wm',
                flowComponent: 'gdwnoiq8dkyqz4716c67tdmbwt8g6yyzm33d5ev69v33pjdy56ij29ejdkevzrdsz4jajgiz59zb2zgk68hcc3em6fet37yc59blqg6w987ytq12uq2s4knzkov4lmap76pme9xgsk6xarl87danier8bt4d14dx',
                flowInterfaceName: 'xoq5oav49pk4lqbxo8ucy96uq8jsvmzan84298qg3jmmxqd101a1iz5plw7p6uixasp3hn16lo5wmyfa5smo2644y426dmr7se57w2qihjheloox55naeg3hekka4vzwmx2dqxgqatcblr8ngk6qt0glyxq3zt7y',
                flowInterfaceNamespace: 'i8mjsbz19i29kh9f6iyb2pnteihjtn1bep2n6xp65rwcraqnsvohrrjk8ablwq0knpmzwo8dc4tnwbxqjbc61po2skj4n3ql140uj50821ahtyb02skguxsi6i0tmmchu1mi5mxbe2hmiy8htnp5djmboovae9zt',
                status: 'WAITING',
                detail: 'Consequuntur id aliquam et. Quod consequatur culpa quia fugiat molestiae voluptas. Qui est occaecati quidem. Recusandae omnis dolores fugiat omnis doloremque exercitationem. Tenetur ratione neque reprehenderit illo porro ab eos doloremque et. Quas molestiae unde et labore.',
                example: '6xjbttcpqr0wlmr3mztt2ylb7en43s5pi9c4sm2xth8wxta2jjgebv6ctvm2ux198uf0c2l2buo3s2b86scs1mrcdktwn8c57ic6fitehhira5yivyj5pl32jzl0pwtkfjkl8d5nhen36oapt06erctcsatujo7c',
                startTimeAt: '2020-07-29 12:09:11',
                direction: 'OUTBOUND',
                errorCategory: '7r5evc01062nx0vdarys6zshf6gmuxmhwpczcv5okkyqkjuggai3d89hei2sxnidtucyev0dkftqe3i642lcykuszc4xwrdtmq7vs6seubz0k8n5mz7eiq7a6yeu7ju0fhbnbfwb42mrpf6jzuha17okt1k4ubok',
                errorCode: 'gzbnrigoity8cn6u3v3qlyepzu2pr1wtz3svwg4ko8m3xlect3',
                errorLabel: 564487,
                node: 2284771460,
                protocol: 'gfkubx7bqx87rpomq4s8',
                qualityOfService: 'ky6c5pqk12e115owf3ku',
                receiverParty: 'xmgh3vrq80a5z2rk4pgggvq6bzrf7thmi96ehd4iedgzuuir0l98s1wg0kw4elcrs65lmmjih7itn65dfcd1zn7uxom0xbop1m46255q4f1ocj6rmfw5ah4mb6b0t0m7ykfwisgd0gunni0vn647w31r5z6witld',
                receiverComponent: 'qu8b6wrdwixmkrpmptgam230ep3a0p6zxbrzxoe8hj990kiuovk2912m5i6heywg9dn43qwxbky4jnd0gs907o5tf5u58zup39qmpbumh74vbez0fdvuiyzc1jpa18rarxkqjth6ywyqte9jm3lli1isrnu3aadt',
                receiverInterface: '4acvo7ajetdj9m8i3292an7wpcp606uzebni3edy8eon4anlf6xe2glhlwkyzu7f8gyil3ehqkszz4qtip38hagjvpznb9jdyv16v7hw89riqmld8npj3chjnr0jydu34z94m73ne4yh91xgwbpdk2ccwnnokgfk',
                receiverInterfaceNamespace: 'w50i3bur6zjqbyq73xik7m8i9p2ygmq76c0jo640glfhw1gqclyd747vuhh6rnle10czmvjqbjhl6nchcscnnt57yrdfpg0avvpkqscl2j9lrrw5xfx1w58zlld774rt8wogdak0r9jbpzsh4idxuux5fonavm1y',
                retries: 3285186163,
                size: 7632647828,
                timesFailed: 5262120802,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '22qwut4s9z8sd1cof8xdf4mrelw3i1logzj05uv3vxc4j283u8',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'lwro8mggbm6o3f4c9xn4',
                scenario: '7pdlx2gx9fe4lic9bknkhhj9i3ojogl9rsegslcjjc79yo9poww7z8obshhd',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:37:41',
                executionMonitoringStartAt: '2020-07-28 20:03:37',
                executionMonitoringEndAt: '2020-07-28 17:35:13',
                flowHash: 'gesdrl31om2azamhssr0lpq1flc9xoiam0ejjlyn',
                flowParty: 'cq2mt0xehlfj1myxcjbhe9ra89grloo56krsew80mmdgth587vrd9x8ujbx4yy6df7ukd6yh1alfp59tbv4szm72idvrz2mzo3t1j7jex4ockow3uaya35c3ygtelbyxn2mjtp9w3qb4mthrv39e10ns00cjmspz',
                flowComponent: 'lysy70zg971sqka1xb35dw0tqwy6yqph4ye1dj9ipf395004k577fck4sdf8jyh7mkfioesxnvjhl4th5fpimjaxsmgw32phu5n4qsfpphmcg0byhxpbkzoc94fvdn2jd79l8jihuoicc49mh8vagicgxv5jsfzqb',
                flowInterfaceName: '9cvb8fm83cu8rro80f3gbyxg9r2cwmpsh1rud72s00fjghe2rh73kjppfb25sww0yzi9zsi0f02d307dap2u79n6ri4xoj3avmi7406cb3203wylliuspe6yjn9bjorzpctukjitlayrtc4t53qstcsgfsbc2o4o',
                flowInterfaceNamespace: 'pintqpea0hrumn0hvc0rrb1d8s91y3r1mlfmzux81h21gzrcuzobeec7kpq4m7hk0203fq4dlicmcdnt829pebwmrcce8gm043ivfo0r2a2x4rtm2pf85fbi5xwh2besxpczd62hbg12ixcdks73klqu6duv079w',
                status: 'DELIVERING',
                detail: 'Nisi aut ea perspiciatis. Sunt rem labore quo voluptatem quis ea et debitis. Qui consequatur omnis nemo neque labore voluptas sed labore vitae. Pariatur omnis qui eum dolore voluptatum molestiae deserunt. Id necessitatibus ex non. Voluptatum aut officia iure occaecati repellendus suscipit sint.',
                example: 'alu1t8kvj2r7dqibziops5ugntl3x3hd9uabi7h4iwfryx48yx7poem2ycm5q2g3jnr9y2c3esuzh7vet7cxs17hq47idoag1oz08avccczifj68fqnxs6e7m2vpvpz1kpbkawdlzqc8u2bn1k1aljktoqxb5sdt',
                startTimeAt: '2020-07-28 18:47:27',
                direction: 'OUTBOUND',
                errorCategory: 'angrtnri90f7hegx9eekejh4lnm7fduxobmvwze0u6jr1bkkiukn1n5k8uqvkunhn4psvc9zzj3j4ida2nc3vwkakaw4nsxg3gp3myq8hs7z19cunsvkp7kjdkb4jfcrmkxslumfj1zywnz1u20f29rc11gkvk18',
                errorCode: 'bsr3e8tkg8sazhvcgl2pm75uou1q1ckhx7wilsfa5752punnml',
                errorLabel: 528019,
                node: 8266270701,
                protocol: 'm6p03nvmtdmq2m17j1pw',
                qualityOfService: 'g68kh9ehqcltj6wf25iy',
                receiverParty: '6xxmshomlr7nggf9mrd60mm6ed457jcoumqz518fjtd3ux3hnxuctosi15ds9qwtmuxex2yevqivbcjwh0fgotqx888tq0xkwizvpbm1uwlhn73awuk1cc3h8n2x4bela6kqatqa850m3qzr5kx6a7i6vpikfqjo',
                receiverComponent: 'xgzzc3it34ypp78shy8xkpr0d0ujaw5zvkqtqs3i2bhzm0snayc1grd1nn0xu5o7gzswnoih0ku7ycy5ejnj5lf1ho0pxcfh54pvyh0etiacfv4q2im7yim1sm2vbvn29q7outthacci6tn1wxp89pmbc1lb4flt',
                receiverInterface: 's180a0s5jgl11bbbvx6y7zqraozg4svz5dohyfgcs06n2mmfq683s97tv6r7ihz9tynix05rosgdluqsees9odf0ciylack2gvfs2cr85rmdu5e4zl7lhj4rg7zehmff0277q8n4psi5yz83f87vgbdgrjoc349t',
                receiverInterfaceNamespace: 'xkmgsx7ni0p2titpd72z9v9657qf2suktebij7pfebgcxnbwakoaadpi26yd8k16pjhi2041u8081sqt1sw3nyhiol7yyoqgsqa25r8ccukv7nv1iycc1omykpvunkqe2i51o25ik1s2hjyne57agzhj443i8ol9',
                retries: 1991184236,
                size: 7706752515,
                timesFailed: 6084896656,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'iqvxm57dhpyxu78vynjsnq1fyb9lqg7igy74wmkdrn2535wmzl',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'imi73sizeo18gs665jkq',
                scenario: 'm81djllb9i8ctqr7cy136tdwjti61k753jsb11ghwy21s18qxyiwg1sn393u',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:47:48',
                executionMonitoringStartAt: '2020-07-29 09:48:48',
                executionMonitoringEndAt: '2020-07-29 15:01:16',
                flowHash: 'g8vsk16w58acfth4g4nuf5aey3d8nz3xbqk7art2',
                flowParty: 'vdmtzndpypin9x0esps2rnf8oyzgw4pzfs1irp5ygx992wuas1013a19s8cfom4fzuly6xoqzwjyzc0tb15ab5rqyc3wb14ul4fqjhu46bfs4rorad313ckvs78z0alcvkpifd9ch2hyhwv3pfhnby6b2q02gb7x',
                flowComponent: '0nxugfv14he3wxl2gs9byroodc8it8mqa6hdnxyipzbsf8cdj2ty32ozecjee4xxlis6qnvwg650efshf50c2dejadgpf5rcben0kt3m3b8vnrxe57fwjqg3nua6z8tit9gysolcy68nptx72lhr0yd2hclbuwlo',
                flowInterfaceName: '05j7eo4ndbnp5pjdd20z4ohlpvbwigxcnvtxoqblqllg36s7a99gevutmtsqb6fao7m97dqfr19d1k33l0rrmhlwaax19z1s6wifjdwuc24pvc6qn1nzi1zt7f6qjineemsnxwe4j1936watfgjuro410f54h6bsa',
                flowInterfaceNamespace: '86fwn5edcy5udk5k3pzjnlok5mo7yh93o9paoxex9zgyzj9sjivtn7cl20nz90i291o2pcwdvh0hshq0cdui5sa9y011amxaa6btlljcbon5src4vhjq0fkql8hmslj67bgf1cjaeqaibb3v4lfe7tysxt6cznvf',
                status: 'SUCCESS',
                detail: 'Atque ducimus non atque. Doloremque non aliquam sint quia quod. Temporibus voluptatem est. Doloribus sit voluptas. Laborum nobis est cupiditate maiores est beatae minus reprehenderit. Voluptatem harum est magnam sit fuga quia aliquam.',
                example: 'rrocx4f8pk8lyr8umtney9998rqjuzoc3bnsvrksp5ygcz0n5ozcvxxi9z0rij9ktea26lpd5t2scs162uufyq8dvfzqp0rp9xx0uti8y9kyzgixy2gfck3qri5xdcmhwgv7mmclhs8zfm920u4ibwj54p6o1k48',
                startTimeAt: '2020-07-29 05:41:10',
                direction: 'INBOUND',
                errorCategory: 'uh8lnn2d6tuxv8zriaa87s3tdalkaeym0hdw93s72j9h983wa1bm1slqwutncbycbt0cyry55dz0yeyl2826uaokoe9rqij92y1fzjmtplk6wplvagwz57piqfvpvuncnnfeq0m908ir7v2i32kkwde14k9j1kpc',
                errorCode: 'o2142wq3epv41s8e74ru06trkabrqba7toma43u8z7hztiwh36',
                errorLabel: 194645,
                node: 6303513805,
                protocol: 'cbloihpd360b05aoptbk',
                qualityOfService: 'cdsd38dpl0bkaag84mmr',
                receiverParty: 'o2kh220bp3mcaviid8wdkbl7sgbb7omabtdk32o6hyjt23rrikt6wgqyubq2sla4o6j7c86sse7fwkmmc1vpfskh0kiad7sqdz6pg22s6m5ckzt5pt0z4tuqwsjm04ogh0txihqc0rga9i1m3dso6ty7hb66rhcy',
                receiverComponent: 'bf66siz12fix0c842o63oo6doqeo3uk4eygkerj9dew4yrw4lwdcefh9thzoe3p5fmswpxixcemkawstsuz4pwcxw792lwu4skrganxj56h03w25z7cbhav79chi5k7lacxeeg3mk71lu4qmkp5psm3kjyewju3v',
                receiverInterface: 'cghzyivurmp4zu7jyrixrd4l7gnutcu0jgf8wo3t3kpr61h7ga3rhenkav7v6gul2jky47rcu3f80mc27733dypdpjkrjs31du0ir2uthxyr1tom2nvy3pu27dufux2o99wn15rctjam4wehzl63bilx6990m919',
                receiverInterfaceNamespace: 'uj04b3fx84h3agwtd2dp7mg03ssgdcviv4141rgrq5my2en09fe2gfv738b21qtep2a0iv4zny16xl3zqoe6pk1fcm0q2ckecaqbb1rjl2e6emj0y5mjrfqwwtf1u0jvkp06ngct8qbcfkity41qwbwgy7xuqghw',
                retries: 6394116610,
                size: 5364569313,
                timesFailed: 2818586892,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'wul3icj5e47pxi7haeoo8bu6qohno12pgjsqzpe61e6vgwagn9',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'oa680bb1h1y7s2ns50yb',
                scenario: 'yneaq6vnbrgly8wop9lhpuche7fq2puyn5vg9vbyb39vn47c9v3z1ihufkes',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:18:15',
                executionMonitoringStartAt: '2020-07-29 13:51:28',
                executionMonitoringEndAt: '2020-07-28 17:35:32',
                flowHash: 'ax96bo26qn8w8btzlqbnm9q0qxkzi5sl8sjhcsm6',
                flowParty: 'do9d6yla57xmajy0xxd675z9p4ojky2xtvz1d4pwwg1yixptsifycq7n59qd6s8tuy3vt89tfx4mmflpwytpszv27onh8ehx3mljn8me6ibuet4y2n5tngrjofz1tic0pr0e8zbpogtz6fmr87id2v2xex0yvicx',
                flowComponent: 'jo3opyutv1irurqegicnb2gu93z1ixx5cieqq3vdtkwooy3gwwv1ujo5fc97ab2xtuv2k5dgl1t5diynw13v7sadjme7my1bw37ov8c6sxo9jaltr234v535hk55ms0fb963kfd8t7z7s6jh0h2u66k1wfr0fio2',
                flowInterfaceName: 'xn4w8zulqj1f18m6i7u1wim3nuc1jisr469x3ys4zvuzbzhnxlbin3292qh21cll2ek6suo2mxdwiybcvixsxebz2l06nnr0ejrvyqxx6iy891ejmw2j1kb4via447sfecj58eues735uv0zelwv805lemp30g3q',
                flowInterfaceNamespace: '628evniuijeqs86cbomlbft960x5ss9c8jjuxesroybtclik7ixuild6y5aqr8yajkvq37895ye516iw5malu4cuxt5p6kn5wsmckeh8lpcsga72qkosrne01cu8kvs930z8lpx6btfbjzy1dc06c3uxhh2we321z',
                status: 'CANCELLED',
                detail: 'Labore et consectetur eligendi et cum officiis non dolorum debitis. Animi eos dolores sunt itaque. Quisquam ut quia vitae ipsam dolorem dolorem. Optio aut cupiditate esse est ut.',
                example: '64elnahus0uiym0l5sc7qyf20ll1auwiwvxltomcrooicaa6u4tmny7r5b68ggsphpshqg05z9jpma9z4sg1l2o9wonopo3xohxia6vjk0pzpy5uqnw4c0ht6yzsehf0ldexbth43lf9n5pt72wb90mb85jfxx1u',
                startTimeAt: '2020-07-28 22:25:54',
                direction: 'INBOUND',
                errorCategory: 'xxjnt8l8wrum76o914idx7a0udugl2589k74evzzness7n9lux8zdzx6z83fse3s6unc8mxt2wyapp8ak736nk0sdmqnprmbzpmfb35uo7fd46kl2kj2ijafiss0mlbh0snh5mqtrpm853momhbr9thz3b2c7oxj',
                errorCode: 'qf0531vn4k1bc3861kphmstdklgmxtu3e5ijhu4r51cw1nns9c',
                errorLabel: 720787,
                node: 5812104755,
                protocol: '3sffrs0ejut2a3nf9ta1',
                qualityOfService: '17az4n15ag442i2cqx3m',
                receiverParty: 't7mcp76z7z8fnxyj2hb7kv4pbiau7xrwlzpga1uwm7dftecfk9ncdhb5tm3c452dvjr5lffeo1nc2nlb270loibrqd6uhgzgikox10xa75wl0zculutc5oio5fzh276gu37vk0u9hq8jsis0f3kxirnqybxu7c89',
                receiverComponent: '6wdbjudm42er2sfp06fcrickrljofsjd7p49yxm2rbzcui5png3qh2k1pqkultmrrt7t6d5llmn4a26kt0vr6bc366lpe5ls75hjuoimvfnwzowixurljvln4f2gcf600amgv4524dgf935btnl422vu4z6d8kpf',
                receiverInterface: '6cpt0ajkuoxfxfe8zvhf8ems6kxctv9uc40sz3alo72l23mt3gy5y2p7xfy7r9j19dmx2vtxyux9mk47gamdz4xs36i0nqld4mx7zjwcel7c9ngggg9h9drcxg9v9yj6u6a9hiqxrt1b3iuex6ualn8iqt4ivzh0',
                receiverInterfaceNamespace: 'd4arodl8tj9midewlz4nd3d1wl4vur4b7c3yi28qjg8b4fnjm5mmopzcue05k2ab5rnn9xc5j4hokw2f583nc8meinwncn5lwnlw4rr5w05qx2s40wk0vk0h7yv5iiok4leeytrh15sf5al5hs5j905z3jcu9azz',
                retries: 2567876784,
                size: 4105643971,
                timesFailed: 9626294798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'jxs1sw3ffrw6cdu5aiyzwhtyuwwi5qq5f6tpsxzo689ayimgm7',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'pebcc3wbfli7qzbxp2ia',
                scenario: 'oz1qiw8ns84u1r9fj7y247k06thx0p3j7s9absfw42fy13jpsixqy4zc7haz',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:50:45',
                executionMonitoringStartAt: '2020-07-29 06:25:37',
                executionMonitoringEndAt: '2020-07-29 02:01:16',
                flowHash: 'syjx2ts1wjb5bsoz0cuy4r4q7lxdukmtymopkgf1',
                flowParty: 'fi2m58uba1eb3pwg1j8xh12r4zthfiovzhlprvx2mga6um5wnyjkmk8bpf5avsj9ttpxsexnkc1khjsnrzok9flf5mupacjcjtkeguokjjdm59wabbrvbdy2xwewl5rylf01bzxch8ijgonkmc5ez8a3tyq36gkk',
                flowComponent: 'qm5ilw532luig5oiaps0wfnswlz9k9mi03igjwnwu7ir8vvqkj0iq63zfwdtkqoib8p2q2mzdfk9mf0khrf640rn7pxycf1d5ezge4q8aq6ysuydjdlzhs40w2138gy4zrxywyrnr8xtqv6savb5x776hyvouutp',
                flowInterfaceName: 'sbhz8cqigye0sdbphi1jzeak9g9uwqnt5ks55u8zbupm49oikqn0rwgmv9fn8o1kzkftmjtrjpjpua86pv62qkh86dg6hzabhc90dt2j94l763tuqwqmlbrz76p4adzywsyuz3tes6zqt2r2f4dqodtnsitk0ou9',
                flowInterfaceNamespace: '0uqfks0xzdo2gxehyggk4f6e6qxa54pj95poskgkec8puo2y3q4a75b2b6xsc4wkkxzejvzr0mlljrwsov6mtha8ii0nf3goo8r83lt97g0u5y2lmf6y7kr6whou2si3xlm2u79q4ccvh5s65zuhl15673uqrvg7',
                status: 'CANCELLED',
                detail: 'Tempore accusantium aut repudiandae cumque possimus autem ut. Quisquam provident commodi doloremque amet quidem aperiam fugit. Quasi illo quia dolorem mollitia. Facilis excepturi alias qui hic dolorum doloribus ut hic unde. Laborum molestias quia dolorem sunt quam ea consectetur libero cumque. Omnis ducimus sequi.',
                example: '2nc7ollnuikousz8l1rm0ukhnt603xfgq6qfbkymrofmo9pijffhf8zfjc2m5l9n5jagau09zbxhgwco6qi5uopcc65b2ckpclm8lxzovk3sxquddwobua3tvez900qz5j2dx324qhbfcuxr2byayngfabyvm20e5',
                startTimeAt: '2020-07-29 10:36:26',
                direction: 'INBOUND',
                errorCategory: 'czrfjtn637r2uz01gi1nybmuc8fx3y3gjrqmcr46jnhe7xacjhpmrouxp4tiw0w4g7rd3ogxl27o6yuqzerxgybeiq4yl18sd38vysrhnfhjoa5z4s4xkj2ug5dpjrqcxuqpvysvgvst1l6u94l9k4879w1iqwda',
                errorCode: '04cc0xcw87ugjoaa7zdrk2ko166fbrpehbh08x1ehvkt2e6tkj',
                errorLabel: 365856,
                node: 1628976488,
                protocol: '8de5szpgv3takc8q1nzp',
                qualityOfService: 'leroi5ky7dttvr01qz9i',
                receiverParty: '96l13sz253ttfimlsposqerkz6wa2niyznfh1mofr580yh5y34wkl0s9x9ifav4gja39cckvh22ifqdfm1wy1tphf6qy3ipe9jmtnhqf7yvmyfsxq1l1ykcjgju0f4b9nvxk6evsf65wpbkeazbmq2p7vux077it',
                receiverComponent: 'lilgiaqceg0pm8sn2khi692bt8s2is6up7qhshfqj10yeyb357i8sua04fe3t1v7v8bvj4xyvxeju4zauy7iet9tkplwe92ayxqt8uqbzfml5mr2ziyh7zixnd4w2z1rzbx3jc6jm41fs2zzgt05k21b5nb0wdj6',
                receiverInterface: 'gxsem1h7ety66195snwzvyyn1v0u6liuex6xzs0zw024m50lt8dj44kna08fs0wbl1xa9lav1e6hcbwl71vc0frtc89mt005sa2qlpn7qged78u6dat2dyhknjzmwxz0y025t3v98fijlj2hcdw81gmby4j6xzgj',
                receiverInterfaceNamespace: 'kx4trndhw795ydwra6ggyqm4x9eher4724tzlm1x5gnl94km1wbp2ev26ka4mt53q94ls6wqiy8wkzajkj57z8a9cxcwm0o1dtbe9how1f7t4rvc8pi46nzye7ippo4dy8hrrts9qjxd8prrn8379d5ep4vsbaic',
                retries: 9835166057,
                size: 5594993550,
                timesFailed: 1922630966,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '17aovg01jbp9wr5q3pdn4t296yyp3cbd0wobbmup6ycfejiamj',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'olh7a1tierh7p48xsag1',
                scenario: '8qyxxbyrn2nb54xkugqvsgnimyrvprkv7ln4dmq2zdtlweiyzlzas6gaezlh',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:42:15',
                executionMonitoringStartAt: '2020-07-29 14:18:50',
                executionMonitoringEndAt: '2020-07-28 23:59:19',
                flowHash: '58381qxk83jybete4kv7g3c1s679jn7z5ldia4vm',
                flowParty: 'pf534r8gjplu8cxzrcz4f6ovzc94sjhmguzx4kjgco45yb8ztphryjco11ly4iw3k72vcj9l16h6r8flkq73k4c3ax8owb9qd39yrjbp94a91mv4lvgh732a9zqabwi9ha52dj72cj1ppfcz8hyzc8ahlvnd9iu5',
                flowComponent: '7srft2fpqblle6i9szo7ojagkrizyauxdxzrzac3nozf0e0vbqwqbsxz15yd27uv645yykrk8eeprvywefjfiih54oeio7u54ost9t58qnzgzsmwqowxor5w51es84hrvpxgalqd2e8pdbkoysceke56oujpc976',
                flowInterfaceName: 'tsy6ivf3ga8p7cg60uwerlwppvunz6bup52oueins5cttf8or13ul8vofxlebmcps6afo2k5z2z4nc730h6csvifa8gwv2bkja80zn8pichw97qmzcash9uilvolmdj9yj4yn7488wo0y945xpsakxarzehe8j4w',
                flowInterfaceNamespace: 'cn83tngdxnp7z50g3vmo0woljxx8wo8xmuzw1rpxqddj7bxg14xld57e0p6k6iy78ut7zgjj03nvfabuo38pc4ke5fxkecflzsrtwgynxpco6biiw3767457oos22ldq0x6hxip8lqr3urwvtj5doz9ujni5bt3f',
                status: 'TO_BE_DELIVERED',
                detail: 'Iste dolores sint iusto nihil sunt sed minus eaque id. Aliquam consequatur impedit earum nobis iste explicabo repellendus. Ratione facilis fuga debitis assumenda. Dolor deleniti consequatur facilis.',
                example: 'a9dg7ip0yjsccmrekpdmpzekjbqsgwzj4n31112115beknaa28eis7jzszpnb6saex8oxfgxefuvpdhvjbowcnvdq6292rn9du2c0yt28bqg7oisvgyzsx6pxd7el9fuk8udvw6fka1ax0q2ejkbks71vd9o1a8w',
                startTimeAt: '2020-07-29 00:52:45',
                direction: 'INBOUND',
                errorCategory: 'wj3baib93rtjj1e02atzk1okwnedcjerwa3kf7tauclulrrcsdzqbseyjqiisu14bas94kpgmmsijkdnuyxgv4llad7qelo50epnsktb1ny6cyw1oliiaihtxgqy34p21869lqsiupzdks93q4q1z7c9fh9xwijrs',
                errorCode: 'npkkw1j04s33n2ltoxwcgicb4vqaij00ppy26qu8gilbqvl19z',
                errorLabel: 404888,
                node: 5030615532,
                protocol: '82qc27qfk5wcs9mr24qk',
                qualityOfService: '2z93qy3fnl6zst903dw9',
                receiverParty: 'p9k0r88pjlaiembdiqxklvwtqab25xlgdi835qbamblbwwkqg5v7kbhrsw2bycwtpa18hocpurgj32rs8m6qh5panzxf5vvydeyjkmwh2xvyu7xyctuqcbt0reibwyhixp01r9c3je1dp3xpi0jaaiykemxezkva',
                receiverComponent: 'fsxfs9sc09myzmqt2hyn9ggka6ybnktewew5gfkmaiidpmc5zxsikfk8g39444vf0vyg2uwvg376r6qo5pjrgsgjswjarmtkp8dig4iy69kxyfgxqjvbrk1aer7jk698wr65zf3c96t3yz23sxq2tu1aml7bp5cm',
                receiverInterface: 'tugujs1xg5zac92rh88gvfa7fzp58gylwoj01rc4w8i8m7e8m8oicnfysd4b5glqtmpzu3aqx3hukwrtduu7retrlscd1zbhh3h1xuw2ppqk29jy74b50ya5pz85eoizk4asaztiaycy4k9umu1cuo7vts8be20p',
                receiverInterfaceNamespace: 'mn8i9b8yu8irepyqtgzl6zg36vtluprg422ws7sstsq2n0xpxmzdgc5dfu0jxx09p5z32aif0djvpm7hi9uyu5dp885swz9h9x6cbvlgucbl42tv9nr9k7m27emw5urzn84uwo7rggrbz80if8km0zat0vjhec0i',
                retries: 1856664552,
                size: 5513835817,
                timesFailed: 3601750062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'dh33hp6qud9z179opqv2dv7f2espv00efn0ebgcoj84e7spa4o',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'x0m9k9n87mg6hropm0vf',
                scenario: 's2ugkgvf4z8f6o2ovpneokkcmtvbgyl1c0d4xrkdut39y3g9wz33oeoheann',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:39:40',
                executionMonitoringStartAt: '2020-07-29 07:26:28',
                executionMonitoringEndAt: '2020-07-28 18:23:33',
                flowHash: 'e3po6e8zqgkbr2kkwktjtqm5xp4a2feanjswml0e',
                flowParty: '9p00kruw4oe3h1d5d59hci45r5oatmlbqe44d8pi9p2bgn09rs8pq540bvmf03udk8d90z81eh3r2i0qv35vn2qhwzjd3vvaprizqfv7lzpts9g6jpq35iithtb27moml3nhpifzwj7nw9i7bjvuy3mmxjk1torw',
                flowComponent: 'e9zj5up47hju8aw6zj4l1c07focklikf5pyvqbqrq9l75uai5nfvgv3wbnfnmr1fokemgrfpmm60jwe5enj051huigffsme18qe7jhc0medxzvza2ifcfe9szllakplryn8nja7vqojxy7hytdctwqxf2hou5wnx',
                flowInterfaceName: 'qodxen18lib12ln3p1pgi57p7efx1al33pscugfptxujff48hxkovg9p41s6hw99ihwx5upy4hlpf7ihop3n0j640m17v0uz7i962zelzzvvg0qfv3bknfb6mmcntqaaysgx30ipr9b5m00b7v1d8esd5hlaf8lt',
                flowInterfaceNamespace: '8bn3hbsjh3iqbeweb6c3ygi7d74zaeqa3xvpilnf3a8c9uy5yqjapp7wtq5zysx5kdkt3cd7rvy2npgz55whmdcmqp9ldcg9w3q7cssk6rgwij3ub0dilnkdm6k0vj3k4mioodaeebqpal854cawpbt931ryj4l1',
                status: 'HOLDING',
                detail: 'Similique est suscipit. Doloribus modi ut quos. Qui quia fugit doloribus quas laborum. Deserunt voluptas nostrum. Minus et temporibus. Et rerum quia.',
                example: 'icsitsvb616w8xvne2rc9ap7yukxq5tbro9upgffvkckodk596tnzmrj863t6k28nr7dhysic3o2wdfxij0hjsby0zlmzl8f99a9mumsmuk22mgkmd95rmr4hqa1hx14xfyy73p1350ct6rhmy83ph6dglg6oidg',
                startTimeAt: '2020-07-29 08:50:19',
                direction: 'OUTBOUND',
                errorCategory: 'x4m5rmtz9852nms745qqc64vd6xwi9raqloix5lg5pmi180rno9pkm3xstpnulym1172k1fdx4u52rbdp4yj2d7es9yuadj101aw0dg4ue0sxpqlck9j58fz1nlp0f9hxgryvuw4bhvlsln0gh81e3uud1w4dcl8',
                errorCode: 'm0gfp65to02ordd7tueahlz221d6v6ai6l9hbry6ow2sflfl8x7',
                errorLabel: 982979,
                node: 9407124411,
                protocol: '9hc80w5ssicryrwd863b',
                qualityOfService: '00c6hlrrz8i8y7zi3uic',
                receiverParty: '5emngnsjqn9wjfpcuzb710o76ww1oqr8rboix3jw6ja77ee831rvwoiqqy7yozj707hkise4k9hv18jnskd3y9b939ggfifmj04pgjwt0vil6q2p48on11tgaozqrq9lm39q1e6twhf1r7ru3tqwe2nbth96k0uf',
                receiverComponent: 'ebnn8nwd4mheo2e2iduk48aaafbfr6mxn0oudmhs0x95842s232ro7j4lb9fku4o63hdum11n3asumbtdsgeoqefg7ji8nxvec30qx5jc33p1kx87bc2kvaiwzrkcwlj8t1wjz43cwlmqnou7ucoemqr5s3xem3w',
                receiverInterface: 'd3netfqervp3onsrgbb8woa5a9wht8nz2i6nk23kn9bo9uf8fg8qwucriij9x6svafhg9xigdj1o3x0ovlnr5njqs25v6y42l5cppk9n3vvwq9cg7pxgc1ua7x413f07zysvzu4r91nhcvwcoly339w3fispcuyx',
                receiverInterfaceNamespace: 'mmrig1jgkbp2fe487aakviw1v6tsyc8nl7ewaedat8h6vbm6tjz78kbd72xfz41b9pp48py10b86mtirzhz7shnmsa18fz68krk9crtsqfhtdgxby2p2fpvkqzgul6hqwhjzv2lshamcmx1q5taq5gdd2y2kcljt',
                retries: 8318539010,
                size: 7004370124,
                timesFailed: 5782036368,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'hhv6t079lzgdrotgznt8wyvy72vtflxlzvz3sskf72nspiqrko',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'xu5vcegsdt30hs2jcb47',
                scenario: 'i5lh318gv7m4qdhwhgep7w8wsfmzpgdb7cqk1r145fd1qfrscc161y2qg9b1',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:29:28',
                executionMonitoringStartAt: '2020-07-29 12:55:10',
                executionMonitoringEndAt: '2020-07-28 20:24:28',
                flowHash: 'r1uldh7b539z16s3mx3uv523z8cxq0mfdm9yqub5',
                flowParty: 'ek5e8r2m72f3oex4rh8zg2a890nzmzqkfhj5u47wp1tnkt7el2ch1yninuka125cpom4brs9j2zcysevk5b6a1pauqfhpb9gh5loefwg8cpilk6aes6bcpacltssld17284ohiorus0ssqvhea95l7v0m9wxad5g',
                flowComponent: 'zwu0vwcduhspnm0qngilmwit0b5urwerh6gvghmywelpcz7wciwisooqagxj2o2jzxu4tqoqd1nm815plxrz6kpkgni8p2mapa8otckrfg7uhubynrvcqsylme6fo5wt8tig0jdkzvw2vonsxr584pcxhsbjfr4k',
                flowInterfaceName: 'z1ynzowvwiue1jhmj338bsqg62a5wyy4jvedsdqhrzj692iz3mll4nub0kcdi6si7pfq7gfa1bemycnzq8u6m9inaeiw9vewxfygydt31snig63czr8wdlidp2jcwgvko7wtv6fueg6r8wo5oxhsbqt16ouf8lbb',
                flowInterfaceNamespace: '8p9o3ziffn67ciu5abu3sif08wq9c0t25kkxegkx7fz0wr7h248tc5lja39zqj7a60l54popk7zfn3ovreoy8oiwp2x9kfqolon7i0akpm4oade2petgmmcqmou96n6nrivzjvho0ipgzmewib7ixnrulqzy3ru9',
                status: 'CANCELLED',
                detail: 'Et expedita atque qui. Et animi rerum dicta non molestiae molestiae. Quisquam esse reiciendis nihil. Ea quas necessitatibus praesentium perferendis assumenda dolores delectus quos. Et dicta atque harum quia ea.',
                example: '3kjshder7b8ad9h0h05mjo39n9mge535nf0gk6172gxz9pbl8cvyg3q6evknkp02cxuivu7zkwyyyqefmhcpw1i8f8az5rdclh9vewuarg4u8t2mjgv4hmloqze4jk72rq65p6txc8i6vlmx7356hov1l50q5tr1',
                startTimeAt: '2020-07-29 15:48:02',
                direction: 'INBOUND',
                errorCategory: 'ywvruy465uw38e4xwen3xkuzoka3wgu94owd8m82bpzornbulm60uuw5klr4lpdcedx8clg6n0blfc3kjse70bu6snnaj0xjil41h7d052r0kk09st7gavy8s0qu8nmqa4gxx84t3q1245rtu9vhi01nj1w12zb1',
                errorCode: '6k0eysvhgk0nl13r6xlzqwcxglf2spz1yw2k6swectxhcs77a3',
                errorLabel: 7509782,
                node: 6734438385,
                protocol: 's72gc3ai050t18hugftq',
                qualityOfService: 'o1v0k3lv44hltmkilt0k',
                receiverParty: 'tp78qo3zzfrsdwjluxi03mnjly8p1lpgsbbklqvsgli9mjcztitswbprexd5hprfupvc1ztzgn7ach9r42h459q2xfxtab8khvlsbzhh0kylakk7lwzkz55rnmj8bri9ettqgok0gk1c7zqlmdaksy3ypzt73kuk',
                receiverComponent: 'l1it26uf2di7rwf08tx2u6w6e0czhe4jyttkob167ijo939wh2df38ef9zqlw5uoakaknyw83xqgj82m8ahp9ahjo31ymo6q5j4jokbihu4ssg0d1jks284u1zsczdfrtp56h0o4rqpz48t1sijykikvsbl8mht0',
                receiverInterface: 'cog17e0p9yi8gmtlkf2nfm4h0uxiypgnez6mucia3rssm2a8v0xacbhv8x4t4kg8lrfpeyuqq2jqu05xqq4hlw300umssh5ix4c9j09tpk5dbh5t2osm0yjevzpolmt1y2qc8wbc1t68qb2ntgbsdlybmwdl6z95',
                receiverInterfaceNamespace: 'yjpi8gtzoc1khpttc181tgq8eo90p2sglx26kr851bxgp7x2k9vorbpr1jpj2oudc632aygyxxqwky89rwg3lp9k87zloqyrehfzz3v4k2up3k4x511edimjex07oegxuzv8sehhq5yntdle9dbgvjqshiu9yzx7',
                retries: 8869417543,
                size: 6238477494,
                timesFailed: 6424935976,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'q13ppny2veljshb3oexq72qtt0su7plrsykfrt089hgs1ov98q',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'gnr58yh23imxw7x72npv',
                scenario: '66huv3ai23fl2peq2jv072url3zqiv6qlr4q46jlt6wcn6h3v4z21vwm10zi',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:59:53',
                executionMonitoringStartAt: '2020-07-29 02:55:26',
                executionMonitoringEndAt: '2020-07-29 13:57:54',
                flowHash: 'xva7a64dq0jdv91f6p1wv6nj7mq2agk56109y00q',
                flowParty: '1jb386b2w0204g40vwq0ihli7rwjjooi53ji7dscyv3jnsz7r68sskqi4jt8fgvdaqnv81nx00x4oyashoec3uweg1l5jus9ixkqgec3bhca29vozd68re10kvpmp7uj5dp2hntmf3gdw5ahp2fie6sgnnwd6k8w',
                flowComponent: 'e9epz4iqioadka5459tzid70swyzsid75ckozs978tza0tmxcx5kocbnjpfbaxghn866p1l2qv3jnjsoan7045wola5poehtskzeilibif9pzebil7o5hk0bxrmep5gra3h3ehtabgk061anb8vpqe19nixx3ae3',
                flowInterfaceName: '5i2dd0as08kzoge1ggkrs9b5ro42kct2tlw6702fy9vrrc1im4j8x130ibiz6cg5fwynrocxct1fq7kuszciwo6zg4blj69lhytijc6nwjqxf40fj4mfuz0cdci3kv1qhhzfqrsu2j22yjf589ijmupb2q56rxgv',
                flowInterfaceNamespace: '99s9k4z190x2dk1u0z3rbp98v3tpau4018l1p9tnf1dr6btylpcewyrzjeclfpgwfoqy2k6zfz7rzzptlijhpvt1wmvwsuwvrhtbk6085nku0qzxxqydqwxqvn6lo0yaw9qw5vgduufvrk7tfh95ia0yiyp9i817',
                status: 'SUCCESS',
                detail: 'Consequuntur magni et sed. Vitae itaque commodi non esse et natus tenetur maxime consequuntur. Quo debitis dolorem et unde qui quis pariatur odio eos. In et ipsa. Ab dolorem veniam distinctio.',
                example: 'rs88cak5r2rjnolxozvw9xde848tzht261ank4nim9xfxs3k0od5pele9ukz1o9bezp8zztbaxvmwy4t1xi4hgtzwo1iy50xb0gcsg36mihec2cvcugr1mq94gsr1x62bcnmzwrglwkp8xaz4j9ngbcmby0cqan3',
                startTimeAt: '2020-07-28 21:56:12',
                direction: 'OUTBOUND',
                errorCategory: 'hp93aa1whkk59g6hdvjtdgpfj4j2lutif0o2pxv9p5qg8v9j2vla3asbauj56vzej44bo5ut9m5fwg37t73g1rrw8u6jcnv16r7z7qgpitue27ox8ui8zt560xafgryk036tgprll3q2lmowsq3rtod0su9pf0y1',
                errorCode: '9vmhldyalr84vqdhojltw136ht61hzizbkao3vqj6d2eejpchw',
                errorLabel: 567344,
                node: 11608268143,
                protocol: 'va4d9a3hv9whm71cncaw',
                qualityOfService: 'whc3re1pqu4m4n1010f4',
                receiverParty: '3mb0i56l89l5isp06yw02ewztmmtgy93om59ayn3cuptt7o2ovrke188a0gikx5to72nt6ukqzebz55tngzossyk6i2obcsk2yui4io2yaqeii047p8pm5p7v3j9qt6ilxbml86vjnfzexi4weh8khdlkq7yxjc3',
                receiverComponent: 'uf8ujlwue4n3u1lkb4t947racdh14z50jggcq78tdir33vdjkyd1x2jgpikfqc6g39vpf5b4xdidpggk60j6av9yk7k9g54m6rvzcqdh6lia9l4b1l2na56dx24vb3f5c6j1dw0319v683huoe79q1zqik8pr3lv',
                receiverInterface: '8jargtbwbw00299w46y3lc0rcso3edhjqmra2ywa465kv3sjzla4uldd68db1mg1aggwnnhq93kd59zoxo5rd5xkq8f3sarhtl78rzjw9asrono1dwfwv8f1dc0njhpnu1dp1i5gs5366svws06vnmh26hf5iyxv',
                receiverInterfaceNamespace: 'aibo8xoi6veuryyjhbnu1hpstea564qph2w8xuzmzprn83t1bzawqg3b24bovnaj8l0u2qver2nvacndegxddqckf0r9e4onlj6vcitc70flqz5zh3iglcen6o1av1y6hey04u0g0lhccugsz8bcu486pamqnw4k',
                retries: 7737383156,
                size: 4448241309,
                timesFailed: 4115277967,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'toqhmkisrflekiqjj7thwqv39q9u1fcsrltjzfjvnqdmipu6fq',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'uxvcvfyhcr2m6w0avj1k',
                scenario: '6703cwa3tpklcqtwgtc2cytyut3gosv6ft3r30fl52w4mculy9qer2oe5gbi',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:19:57',
                executionMonitoringStartAt: '2020-07-29 10:35:24',
                executionMonitoringEndAt: '2020-07-28 23:36:09',
                flowHash: 'awerqncfclvguau1zizghq547h21lzmi6hpc4wp7',
                flowParty: 'fjhmdw59gf4avlsd341hgn5c4lh7umtp0v0u3uro405yf0y93grpaxcvjnnm28tzqnmf8h5qrr6inijf9sn34ks9suz5jsmrccsmlealzrjxbpf3oai34u1kcv7ezrmkdx524xgn3ttmef3nldui3yrjpaq095zg',
                flowComponent: 'igrgqrb2lnf2p9frs8fu4uo6pdyeaqm4b4xl2s28m6xbeewtle0afeq9fs7m9kmgm1arfqcujumn48gzrq10usvozfzy983lyanvlrk6z64vkx0yyzxcmadgv8r0gnor1ksw2zxr7x0jkq2mbk87rxgksbxvae5h',
                flowInterfaceName: 'r4wwjr25q1kw5p6et7oheccqbp0huh4z6ypy934kgns5gws9vwl9g1vv629hnrm0382fbs6lgnju810xywm1b7qmwani8zan5opbfnh1jxfcbw25n4qrwu20dz3x60sasa3oz4hd0h6tfu3gsyarq1il1tzgxixr',
                flowInterfaceNamespace: '40mdzxlue32das84sd6xpcipjwrvim4a5ovdtmfgj9xclzu5rr8x4vjb7cjvgbwnyibbgzzftkbf0t94sc5gigjivftl5g2ogx4v9fd3r03t996evwr9bjw0te0vkbhcg9uo7dh9g4es83teewvvqd1mhuwoxbg7',
                status: 'SUCCESS',
                detail: 'Est quod qui aut quisquam non. Eum dolores aperiam aliquam eligendi. Accusamus aut et. Voluptatum eos ea nostrum ullam fuga harum. Est doloremque qui molestiae optio amet.',
                example: 'l4or45qi57jw2pxmwk09pberpgnk0iv44ws48vpoc5yuouypng9d8wvxbc76bet8ldgw4yz7vcsl3uf01cq9a5lhqim0pqtyn8yaxwle3glou65au2vi0pt8ogx29pgyhz2894idnu8wuzoduytusuours2rie2s',
                startTimeAt: '2020-07-28 19:08:43',
                direction: 'INBOUND',
                errorCategory: 'o4h7es8ibyx4e7q9vyftp3nrr8yztlm9yqngn7d0oktczbbur50wtimghds9muopsj74j4qhtyaffdsy42eosmmtwvzxusm7whmtql444h50070i2yah25lrwru50z4mzu841id9slb1w28iav3y30wq6pqgyzbo',
                errorCode: '82sttigs8mb6kxjkuo9u3nqi32zk25ho55dam59rhpmpkd3q7a',
                errorLabel: 372298,
                node: 6775262463,
                protocol: '4405kw2aajn8koxhrb255',
                qualityOfService: 'pt7d8d10umn0f7wq7zt1',
                receiverParty: 'cfl81dcr730p70zixhuocxvaso35a6hfkp6kuozdpyp4h9hgtjc6qivzyrirw1juwm11ojnhgag0926yb5mhu5rx9lp0kg54im7m34405v1x4gnlz532hskacpt7hfy5pnudoznnmaa3hofcdva0v07zwrqb5bt1',
                receiverComponent: '3u1h7o2ggitdib3wpyl7xy0xggrxb0ydkra2km7cerp21v7tdfhc5eeaq01ujg01b3m9nfej2vqudcwx4z2d5yap7ol50k47xtz3vne995vopmo4dl0m2z2fjoj3f9evdamsowg53fwof6f2orat2226nwweesq9',
                receiverInterface: '9mglflsxs4k6a5qmkmz1cu8iaq17lo6rwx9rzryyhywztj4u848bxmyjna675mqe5zo7i33b3alb02zcko8f2nh6eeeof7nuhwr1zfmwigifhf1vp1unx8rx0ur09rf35rv65le8rau04xeib2qgdl1vzksvlt4w',
                receiverInterfaceNamespace: 'k5p6bf7r8fmzlsa9qcabc4dfgdom9v4hlfbpo7yju863kmlysmrrmn8bhuafgnxeq78vd7d3rn4d09gaw45t3b0hkpeb5230k6lzadisvphhanjt1r7ec9n4kiltshyjt0jlsoezrfwmxa4rrea1di3uxvm29tih',
                retries: 8297786636,
                size: 7042654008,
                timesFailed: 4841520944,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'nvxx9hu8u3nobi1rx18hwhhnkgwtxmj1zuhis0i4r9ltk16kcu',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'uuu2u5wogmyfo9wp5tct',
                scenario: 'yx4prjo3ejovokr4mblpgm8utqn9u33o4cc1yyqh2zc9l7kv5vtbnvumt8zu',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:17:07',
                executionMonitoringStartAt: '2020-07-28 16:55:19',
                executionMonitoringEndAt: '2020-07-28 19:10:23',
                flowHash: 'aimh0jbn0ogo0plfqno7lx08wfhtlhl15gnvz74c',
                flowParty: 'nka4dijdth3v2r3e2ilff3gaxs4grzkkxqovo8xg8i14urmndctu8f7xu5hf0ang67c2mhhunwa134pmk3jjppn7hn36tunwwgvd4d1dgxpg2sln5lpe23eiw61t4hxx4o2nfrsejdjbtl6v40duchfithkufyxl',
                flowComponent: '6xolfldpy7aitmoc657adhibh4z1fvt41r80gt8gz1ewcjub3cpmw1lu1loxcrbq7fde0vhrsgz1379suv268hukjhwcty9a1voobuul96qvywinq1qnuvzbjq6f6yph8co8t2neawai199wzdwmrv90dcpyav82',
                flowInterfaceName: 'iopvuu21ugldofl9wshqs9h7a8s77h5jupzop3va2soecbv31vnml42z3yt3wfqzk0i37kbr14dgrqb51r5a27yxhzua4h373b7v59py8qxm69383ed9ahrjthypmh2b9kwh31pgubiwijyklgak1sipx0fs15a1',
                flowInterfaceNamespace: 'y3z4nw28i1s5r14ywp6pfgc5aoy0oqltr4knixb6gta7o7k87lak2y8eyvy91iycxln1rsbbut9o8i9laboagn4x3kyrt01ct6xb6jodjdbsmwyh2hlon5imcpjf0wacehakiu0gsfh9pbbwypgt5n11y5wd0mge',
                status: 'SUCCESS',
                detail: 'Qui in vel quo totam distinctio dolores voluptatem. Consectetur quam assumenda dolorum. Sint veritatis nam et pariatur. Saepe labore sed ut eos blanditiis ad.',
                example: 'k9pq4zdf9d0w4oe0bxapbc2ifi1t2g9lci9ffupn93ejhrmuxvqxvb5u244i0arclvqfqmn5hqufviuzgvurcimnwbpya5dbf3b46zm6xm3fsu74zblwmltw3jml12afhn7b8k1i1ux10zurxg8z1ke6eq0r5l8e',
                startTimeAt: '2020-07-28 20:06:58',
                direction: 'INBOUND',
                errorCategory: '4a1gbutg1arhyz5t0eum2qkckq57mvelvdhnywhrcjdo2g13rbw6iyxoplfbzlswlb7tmmyx5espjq7c8p56xx9uskm9pypeovxdqfsopxldlkafwgamjqgy2wh26a2gpbkza8irfniif4hizsa03j2id04w6wmx',
                errorCode: '09fkjfsmzwz1klaool194py1ik5pcl2a2a55puw0oyblq6cdh7',
                errorLabel: 485690,
                node: 5506603440,
                protocol: 'g1mhwm562eskbiymgv24',
                qualityOfService: '570zhmwrub2ugcmw85r84',
                receiverParty: 'sivj3sz80cq3rs24wtoqzzs7cljiul7pcwg9e9lj69a8qq75rtcycrn9dyz5psebvxl9yysarcesq0xqeltn0peyd5qhym3aikzpzbylhck12s3ddzpwzewhvdhbzzogzkdmdggrhchaury32ayixcig56gyxlz6',
                receiverComponent: '2lno88iuwq9et381wrpybqgvwgz80xam0753ib1wbmoi3idzyrf48wu3p6d56nrx86ttx019pt5ytdi9ey0ndtlfuoctl983arr9ll8fpvnbl83zam20awxm5jiqhzk4aw64u8t09emfhw42phh6n9hj2ccm4ek4',
                receiverInterface: 'gtu541nzdwlmwqvw3dgt2hno8nltg0j8wlaps1v2s7w4wtp4rmmvguunrtzfo546fnqqlvj7un51chhrwnt4xxkirkb8jtk7y1skgharxiihhxfaedtrss2opjs1o4tc0jl0xuzh75fwcet5nde503bljy8w7o35',
                receiverInterfaceNamespace: '5cvj9omyp01h8ch5h03rc19iab96oinpn411cqo8izswcdk5glerkzm415ij940rp64f29ujnl04usnkzncng7jayau0v5nhgkowhm1uh4udpu838g2ohqej1omr2s73a7sejxw8wj7iseyx372og2mt1nqcfr6z',
                retries: 6114792870,
                size: 4647350929,
                timesFailed: 6430139043,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '24z0o7sy73kmvz7yreclrt58tm8w3nhpdrwjn5ov7vsy7pzea4',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'jnv2md35tr4cducif7od',
                scenario: 'jcgb539mzd7evcsfuzcavvsp4035lnpvk765q8b32yn28c2wvwy92tehgbbe',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:57:18',
                executionMonitoringStartAt: '2020-07-29 04:23:56',
                executionMonitoringEndAt: '2020-07-28 17:19:12',
                flowHash: 'iq4gznkr8u5ajg11dx864ajncznpwrxloy4zj7fg',
                flowParty: 'ncfzq5il047ak8speglyjspe7gzwv4d4i7kjqsby621gbni7p9wwek0he6cm4j774ab3csz9nora2nrwpju9x51o5ftzcjzhlbr70md5os6tynzj7ni31ogu9n43hsjkw40paz7d1pa0fb8u0rqackc243u2jf7y',
                flowComponent: 'effocxie7f9210smu4j4dzlugb8ih81eaxjjrboc9litqps26n5g2xc1aqp64z6esnn8t02xw43kzcidfiwsgoaozmhdqkx4jgsrsn0mxa2uh4calld4hc3jz03t9ujb0djewss3nhfb14r4jwkjwhkncldnbdv6',
                flowInterfaceName: 'qxxak9ssahfee4ju4azrmo8ah1ooolmceks2z1n6yw3ezae8a17p5yk7b3ngsqrj304wj3o164a5zzja2qf4rzejlxv2be2m46muvluttr2fymu87q9a3zphkwg3wlw3obkex8y9z0ud0p4um6weh7r59whcf6vl',
                flowInterfaceNamespace: 'ox4yfimkjmp24vuokf1dawmo8273le93xmsud5chersfflo2gsdf6vrqitwvjzegj25nt0d1bigy8en2m3e8x0iobwuypnursvzxvac8qo91fz540327pyxcw4v8aihpn4pmix6zyi7mwgw26ytblk3b8nfo1h73',
                status: 'DELIVERING',
                detail: 'Quibusdam quos dolores optio. Sit sit accusantium et. Laboriosam voluptas aspernatur sequi est. Enim maiores dolor. Quasi accusantium quos aut vel dicta.',
                example: 'xtdlv4s96zye4qw6nhk6k3o04zkyu0kufdw3236y5v3afftyqbh2lbkxjmpvueoik1n099vj2es8e8iglomklyvp93g02svdj1wycfutuj4atmn377r4gvh79q1pk0w0g51wt45fmxb54nfkuzsgrjere47cwmrl',
                startTimeAt: '2020-07-28 19:56:09',
                direction: 'INBOUND',
                errorCategory: '833xvfd4dw83jen8rrrxqtcd671an095o0zw2iyzwgrpryr6k0kcclq0nak3ygvpbjw84mei8r275a24ozdd8gcup1lsc4lf4tur0xzldwcujqey0rr2vbd0p13f86dcizs832m08pyb1v73hz9dbx8zhuzgxrc5',
                errorCode: 'btuvg44fp2wwzqu8dvpkinx73usix1gl44e2vyz9d0u9cny3qe',
                errorLabel: 891783,
                node: 6852818258,
                protocol: '78kohkr2foz3j5z09qd1',
                qualityOfService: 'jp7bcqhkxr8d3wy2sqh3',
                receiverParty: '3w34kj5xsvw0b1kelbp6wygd9tw980o63fq0llb5haf5g5ser4yduzjom0scrzz40wm3jg9jrsli3c1fmydlovb5xuf9rlyo6hmiwvimr3jjy6ov4ycftaoz3jzv9e9emr3qir2xes8uwbb0mrdddo2unhbqniukd',
                receiverComponent: 'kw7equjdk3hzgmgtjgg5d6t4n761tbosw1f21y4vp93k4vjh3xhvwa267j6t308hk220phmwcjb7qi109bli4v84zn79888kejgub4jm3ial13q6dkh3mugpqocczvm2eaqidgdbxkkot9ljyygymqswbfm5hy9x',
                receiverInterface: 'z3i1z40tivuni3ofzn6704bgajn6mung5jjbv03sk6rsklr7xx1tlrycd3tnt7puzs5d6jjxxw2bzy545jggdb0u29ep3ceu6x29c2ji679ifw873l1duoqqjq5dcqwfpvv1xdn24tvt380h70k44v6llks5rs05',
                receiverInterfaceNamespace: 'nsi7nukc9xt9fii3ws2p5gbm3g71wc98wi0j3u9gn5un5cprwv6mo5p0b9ao5zhhy7dg0ootdrc8fu4bvgmpio819vuw7cs0a26r1fmkzyuzcvmpn4etajnkttffdka09spgrgfe2p3v51avbts91aezkulvmk05',
                retries: 4867300325,
                size: 5535561035,
                timesFailed: 5397761241,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'ocw6wfb6r6jtn7azc259iieiym5ggk59k1ctf6jj8t8nwjy8aw',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'gxnjmlgg07rt29rwj7bd',
                scenario: 'cggw8p385c3rrbt0g633akodljfhzmnszh0tbeev1jb0ti858fxmucuoxzwn',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:18:28',
                executionMonitoringStartAt: '2020-07-28 20:48:18',
                executionMonitoringEndAt: '2020-07-29 03:48:22',
                flowHash: 'k7pcs2qpaj5pxwzuie8o7jmmni1lhapbjlhjkft5',
                flowParty: 'rgmgpf56vo8b9xxtzvvmjp3pjz7786yhjag1tc9kv59aom8b3phd5gf2rqnpdj6wyzvxlqo0b4onzijev93bbue74ibof7vm8nmythxlpkyxi7xtizjhxbww7mwokezlau3co9zhtg7gs0t7qafyburehxnpmo46',
                flowComponent: 'qyald1rzjarnyoc1yega3fn0qfhhf815bxe0wgubyjtzb2zs87p6wbz06glb71rnhh8w5fubjkcoosn1a3v8lpzuw2s0voz3p5a4f760lecle6zokd1bo30prt3a3gvu19w9axe6hssumn58rvbw5n6zi9lq9f8l',
                flowInterfaceName: '1xpph2s796x9ymd481laf776s5hgnulceo7jl5r40wlhuhgo6xv289ilf6oivfb995zn7kl5nk63pec4266m4hevhfxf2b5wfddq0tux0adtrh863jeoce2m1i311738y5bkl66nv2uh6hd9okhm5n4zrws348aa',
                flowInterfaceNamespace: 'ef1d55adithed6aegt3oeaqvbljjh9idpy4x4e0xhcdssit03x3j5lmv2pkcrwcha4ebs3uqoky0n6wo4pd5ipu2dxu104idarjkhmic6wun0btq27ard3nt1n7yship9jngrmtr5hxhr8f5d80orjr3n9xn074s',
                status: 'SUCCESS',
                detail: 'Ab minima reiciendis accusamus quo aut ipsam corporis voluptatibus eligendi. Velit nihil laborum voluptas veritatis qui cumque culpa sequi esse. Sint aperiam suscipit voluptatem debitis consequatur.',
                example: '4541u6ebj5737wswywhir0scsdhcg3y0668j958077khcwuxah71ufjdpn0khs22bl7ess99m7dndqoo9bx7jtic5y9qvmb1e1skjeevc4qgtbiofumdzrwg43m8xha0zh9ki3sl5vpoauzp7a2bo0uimsd7zxsz',
                startTimeAt: '2020-07-29 01:26:51',
                direction: 'INBOUND',
                errorCategory: 'qdyugtjqt6zjlkwgp2ajsl146a59c10tlqtvh5mbgox6r88p78m39qhacdec4olawbgyjzd6b6z698rwve9ezcr4pm74yv2rz9ubyfc93koreq67tqzs0wnww89nlpcxvrfd76qw8z2rfxgn3cy71p4gjk61ko0v',
                errorCode: '2ks22b0yrlp00b3xdyf2d7hc0t4y6mlzfm5135ouz59omaqw9z',
                errorLabel: 104855,
                node: 3862345273,
                protocol: 'q1vm5wefzjc39mz5ielc',
                qualityOfService: 'a5uu9lcep5kc1z0uz16o',
                receiverParty: '0cptj1tsbve6qzszxtxd9htiunh7z16wz8lshtfzsrzrmr9x6e7ax8la52931filsutvi620ybhmbz770w0r9um4biqov59weh1vzpgosg5fxrl3flwmu1ouqphx2xrqwg7jopkvfvi42t2ce157icg7znko2vga',
                receiverComponent: 'j96m011ismhyk7u0yu9k298s8wm7o0zzgbaucfbcc88y3bp8sqk0rgwaaqhg1k247790xbj20zo1tqe4616ew9vs41foguqesmx4agzi5dkadmb3jh25rdsnnsujp7dhh6y2vqdd7snb2m4krhvstlssj0hfiyl0q',
                receiverInterface: 'wp9ebojhpscra75utz9uyg1abncfp6ps0iqmlvbdogzqrveyh0bkvf0fuvwn3g8g0rsu4nxhmgjxpi3i0kzfaooyfcl7ek7tcexo2otc3ifdhhm95qnvzgweepx6uauznei809qwv3taq2eox6t7c3eqsz0tjdtn',
                receiverInterfaceNamespace: 'gswaw6ssfygwrnjts7405xi5mfgycrmqvwizj9jp7us2d3rq6g1q44ns5jr23288wgc7foe91v1rmv57cl9bbxddl7wqhc9ynhdt1zhi0qnfn8vsb1lc8grop4bt6o7v4487p9b8gjch7srk25m554az0kaztmsa',
                retries: 4808130874,
                size: 8411993793,
                timesFailed: 8235246426,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'cswh4r5gmfkaljozugvq5rgj3vpgk4lc8jrtjlpapnmq31j362',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'epw0qj1fl258sq4rppen',
                scenario: 'edfkha29kotnhyln3ld1o2cu28zztnwau58mcunxzxkyvdk2dn4vant61qd3',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:22:43',
                executionMonitoringStartAt: '2020-07-29 03:15:20',
                executionMonitoringEndAt: '2020-07-28 23:50:16',
                flowHash: 'fwk1t1bgobr03tj2hej76c6mhhoisxuhbqu3meiq',
                flowParty: 'bls1ro7htmoaxtgd29pkrgo11hnp442swkojklufdp4r0hbwts7603c8m24usymch94r85pxbl4k21kak8woqvape694t97cvdkadoiwm28a7zrcixyls0zogcxr5mmd2tlklxrxu7zd1klmfycc932q2pvxt4ue',
                flowComponent: 'kuxnyey4ntsptll7pzsnhxqvurtnxkxjff57tmqoshrndvtb9u9tg9rr39xxjld9w6hgda18dm6gbhffgggifcppb8rb0tf3348m9m53cd619o5di9aqia46zxreyh0usb9tbmwt0eh3a8a61bo77p8p09fr6o0s',
                flowInterfaceName: '8de14av63q318d9yu3qfs0m9gum1z0fa8caa6dd3o8nc0g1oh3qbp55ike5cnyraqhpwzhe05qvb58h22a4pn9fzgrltxkbs09fuwg7v3f6t7qqk29arnrcsm7p39hhb2d08csfke2uxnwpe69g5e8mn7foangrt',
                flowInterfaceNamespace: 'gumrbf8eivsrt2qq5cwpe176pfqlof6zueakseio650zv5c0e8otgk3zagdlwcibm7lze46llepydeyu8lg3ljiiyppno1wg6s41kncfja2unu2g2602dz1u47t13hz0hzcru7aatem8g8mmk71xr4vqf124v6iw',
                status: 'CANCELLED',
                detail: 'Cupiditate officiis et soluta. Facere omnis neque incidunt qui ut debitis. Rerum inventore magni tenetur rerum iure rerum voluptas esse. Necessitatibus possimus maxime nobis quos qui. Culpa quam quia non excepturi. Sed voluptatum minima veniam.',
                example: 'yrlmhcwzkahl3v0tkkkw0me96h4cr5bq7mrxknvw7b2qlnzmrxm94ek7aap1g7oniwbepche6slij9u4kozylm7hrwkorgx11jpx84lksis9hqma5llzilodqdk7c7sst66s1r4uyyijbp6b2kz0jevfmqibqso3',
                startTimeAt: '2020-07-29 11:47:28',
                direction: 'OUTBOUND',
                errorCategory: 'z7kj4svpygbyv3ayul4z9jtmu2zpf982pc5av4zvjp1afyp7kfmv4k57wlwajke6eqnseu1gt0rucz6f2m98t82v2fjbpq2y06ncbtn2bp8w6xrorwjej7236304isomi77niew5h5p7izzncwya6dl2j2bkxows',
                errorCode: '8ra7j21q9casdwc07qrrxmdgnktiisi5bw4kyd6pjw7wxe1jtc',
                errorLabel: 997162,
                node: 2896565718,
                protocol: 'kgwu8kdar4anp6ghf02z',
                qualityOfService: 'kdmhumr5lgvabss7s0iu',
                receiverParty: 'xdpln6svrd6e7rimgkvyz9g6hzjm6txu51ip4sifh4xf5oawiu8r1wxgkfaxpdn7pivwdma614luyfxzcipddz0gonlo0x4gxv0qjhhnbq78eq26gtwcjeb2xm7qzuqu1r4tlfmqvjemfh9eqf60j4saxpg6j76f',
                receiverComponent: 'cyet2xlpfqb8lyas77ncafo5uspnyj3tpqr9zliemj3gglv79v177sq3sfrge4iy6iguoioepuki1bhzc777iyi32k72ceak3o0230mu49anuruqiz1mgdrlr3tnqgj94ybk2n30rmdsac7xv0964gg54da49fc3',
                receiverInterface: '7jljtqh9683ev824frwout3j726c05ulewvlt42xnab685vlewdvfprro8ntpr7vgyy9s8e9exjaxsdgj6j1nworx6rswdrz6eqsvlvnmh2w4vnjsnypf93bxyppiue9t60vawj44665akxrjn2ikixiif1ejwn03',
                receiverInterfaceNamespace: 'fz1g3lwcuhzjyuezjcqs2q2xc6leb9ekciaqzw44bzzed36catf7r881yb2mgrs4ffzu9nbh1edypgyywlgukasob1w7ssazqeggs50p8bvouqlxlqwdwwu2yprd34e8iw27xu3cqa7eikssdhqoacoad2fudpik',
                retries: 5789343041,
                size: 4615320408,
                timesFailed: 7332357906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'm1dzwfred6rbmhu6yj8o750aqk19gko9s89ff4of953jy513ds',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '59hau31re4um6sqc1sfl',
                scenario: 'cvdcekn9wtawijdij5xlf3w5n9wewbcfx39nhlm83cq8a7lxpva2ppdp5c1t',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:47:08',
                executionMonitoringStartAt: '2020-07-28 18:30:12',
                executionMonitoringEndAt: '2020-07-28 23:17:22',
                flowHash: 'qj71m08isakzypjjwnosf89p4ttgsk1wzduv84vt',
                flowParty: '37suimgqupfx3k00fc1j694afatvpgaiztyo8l5auo69r49c1s4b3a1c1xgy5ehojcgq8ab7qtf87l7cnzul0yfic0cfrngulme65gwgu764nauf7e8kzusxk1hdixj4nv8pmufcfqk5r1dmhdt659vaz4pxkld5',
                flowComponent: 'z8cu4lexaqsdodl13bghyt5wktgitm3zzrmqkz15cao2s1zlou76vn3rjhijru63kivwv6gymvgbm99wcf4so7zh9gcxi0jkbmb1eomq6bbgedf0jc22orddwrsctdauesiukpmkr8kcw3w39ogco1edgoigmiea',
                flowInterfaceName: '2wwj97b1keqiku1kal3yjnzkig595oa9ofk74s3k4btby533ttr65c8naxp4kcsy0g6dneovpnlz69fyw5oirorm8g5c75f10xvx71chymx0yqqx2cuw4rirpp1exo25ivg5mklc8y8x7dlleae54dny7zuuu9l1',
                flowInterfaceNamespace: 'lp6nhwygq0n1jv4ubdttu1j4kw3zbxonon0ocm3un7llesjmrn3tvfo2u6hc2f9n3eqp02ra7lwm75znnytw89jf06nfzy857m0vurfy2xblc0bekkq01cg3qb7vgwijoh8nx7zb55t5gj5bfm3wtpz3jpbm69f9',
                status: 'DELIVERING',
                detail: 'Fugiat possimus aut omnis eos quisquam vero. Eos sed qui nemo sed quia perferendis. Et assumenda tempore mollitia impedit. Quae ad quia non ipsa ut dicta. Voluptatem sequi atque dignissimos et consectetur aut veniam eveniet.',
                example: 'yuuhmlp0m3svrceygi9ssy2yupjza90cfwthaky1ytg1wwu98ur6c278zk9251crr6jh5u75cy6qjn8hxzlcrbhgp5tpfxyp05rb3vx7oh0hm2z7bql9rcc524vbs8cbiq7cyiys2dwsukkwbc5xbqwngmpf9c42',
                startTimeAt: '2020-07-29 09:18:52',
                direction: 'INBOUND',
                errorCategory: 'cndcetou73sypabhei1lua1ojp6sfyzl6mmcnbiv8lg7ok7p2904k0a1uib7305c4hrv4j55vn22eja6gn1yjc2jhvoyp3f1ka2xo102y9fqzgup1gt2u27expsk134xej4fx8fz885ezh3c953gs75r3sg3qcgu',
                errorCode: 'gt2d23k6iz6cegfmsc5x3lvyj1l3j27xw50bx7z6d2cw3vur9d',
                errorLabel: 212472,
                node: 6541731859,
                protocol: '5qpsvj5drr45b5xumv6o',
                qualityOfService: 'hsnra5uegnxgv8dbgyex',
                receiverParty: 'h17a1as4axtyuwgmgz6eafp7qrpjlm591rvqyrmm34clobr6x259r3imbbkdm034g1qfvg3a8drqcvfcvhso61onym7dowfvck0jmfnb3rtvj0mortpsr9qzzm5s746iwczmubp8bnhyr0oqw7crnn4m3ixz8rqv',
                receiverComponent: 'ynkiv886sszc9atjp8f9dvy2rwp9ksywoey1jb9s7hnbs72te8qklleoyotll4wgnda2x53c8ls8hc34dksfeblpizmi7ww8wirhkuz2g9u3ymqbjzrlsgciqwxug06f9r0iwkcrst9bjri8onoeptoh9xzu2ku6',
                receiverInterface: 'jwhrrkvvqgypd9wpbvmqxxpkkre5comm7gws8zxdto3lzvzlxkbm8qduzd8vq8omuj40xszfqkfu6tozxm1arxqo4j8dd60uys1f0t1idlskzthg1vhvkikv8ygpoq7q7ak1016c7l8qlf1xn6lh17pq8o36e6bx',
                receiverInterfaceNamespace: '6cf3dxpuyq6nejm9lcmqeejky9zqn5falt8omjx5i5tx8l07uv86roh1jyq1rehjr3t9mf4xts6jh5sgcca5e0arx9az1wq4zh4qugg2sxlgvzoydmpp9i7q275n068olhk0mr9gwpj0jmup3ktd9lt2olq3xxdgu',
                retries: 9732964074,
                size: 5552434926,
                timesFailed: 1203029798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'adjxo4itjiv7ijesphxx6j8wy68o6gtg9yn9qxs82m9iheq9bz',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'p6cz6otxdderr86tuur6',
                scenario: 'ocmjkx098ruq66hccw33lmg82ypq5kc63e12qdxoie1kx9pqf2rrwtfykvtm',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:59:11',
                executionMonitoringStartAt: '2020-07-29 14:03:16',
                executionMonitoringEndAt: '2020-07-29 07:17:51',
                flowHash: 'jv9jqi2chr373zz5a3kovt638uda66yc0ijjehfd',
                flowParty: 'w2r0nzpm160kd9mtmrrl5dp5qtbiz6niphuvnhl6g4anzjfoz4eyvmvyl7vkwzcojdpu51lj1g5utiy8mmhollbhl5jukcslddid57fnspqj7rzchq1ef7tm5cnj2vj8y1df918zxjz49uzkp4ihlace6xe6ig04',
                flowComponent: '8dm60lvgejzcx4csr0vxouzrf3fe6jc8ugidygfdnq3ici6ulsj5p25h3amm10iydx3ppi3gy7xy4d8ase4f23x2ruce8jdwwnlfdmx6x07tvs50xhogalqbbb9q4sdux64vjeuxz63ykao1x129xmco503dyhvw',
                flowInterfaceName: '8s3hb72vobfc1qqc84dd00cy5829uo5iojnjrks2w7ah5fqkact5pygavlz6nhcc8dvq5s7w4oru65qyfqjrqr09ytoudxzczdmqe1khtrac8zdt5p1ajahdyzmd8wycjscwf28bo0z01z1qlfqcu70hyl3eveoq',
                flowInterfaceNamespace: 'z218vf1blm0zi6umkxq2160d25h97glvl8m1j90u2p06g16zn9tk9of7hlutu6j42norcz2kdrf86j3ys8gk4dlk20wja0wgov33hv6icr1ujdczwod9mhrppvin0mlp2p7bgw5r31xu33w52xa5tocq8dnz822p',
                status: 'DELIVERING',
                detail: 'Inventore consequuntur dolore necessitatibus quo. Voluptas iure ratione. Animi amet tempore et. Ipsam possimus non quia voluptates provident mollitia molestias est dicta.',
                example: '35u6dh9jo16zcep49afiefsxmmzp1tvxfuqrjgyvjw5zzevfkjsgoinndd4rppumxychxann33von2ppyk3k4d5rx0paj9hu5z80qvul7dfefyrwoo0nqfiy6w4onyvlvsgoya4r9i6tirte66zohdwrskb4gmqn',
                startTimeAt: '2020-07-29 08:36:18',
                direction: 'INBOUND',
                errorCategory: '7uxwmjukrabbvd4z0gcf86qcefdhaus0w9fw86vltah29yw2l2jycxb2tyrb7bax50648088omal8075z724uoaxozs0vr4xciqxyoycpkm45b9fsjuwctc61scqpm4ljtpqbu6dkehztyv8qphfdh3wq5txhhv7',
                errorCode: 'u6wyly6fcv4z1rhiytrv94ds2eioz3zf0lb7gd6d88dqzqknlj',
                errorLabel: 638739,
                node: 5768289469,
                protocol: '2cwybop2f372a0kk2d7a',
                qualityOfService: 'p4ho5cy7l1t1ulvg60wa',
                receiverParty: '98ao0f539uc9u4g9vplv6lqg644bloirjnjulfg6gino7qkm45frfapl2aw7bxymkq354hitrrbdunsswqmn0xwdoywqz4p6xz8p614wfyng5n8ohvy88q3ukak2lkdy08w58mc6ytjerchquiljg7nfewslaqh7',
                receiverComponent: '3o7hfsonpnv1ayoux0r7zzd5wcee5v3wt4dh3psd16kncyndsirzx6277yrnnznc8z8ayzf1ttcicek7q4h414ij54hmuhy2iciars502zhf51f521nfi2nxhcghod7ofykyarf4bjn578y57z0e1ncifkzcj52y',
                receiverInterface: '9jekf5uz0fp9fkyprm699jxj9jvea89gcoab5xz60o6qh9vn4z3tkn7t6rsqnt75gr25jm9qbr1sxe1e6ql9h47zkifmfqigezyigduud2j0znlyl1gq3xhq7l0itsuecqkvpypb4fxp79cs46np81p8wia6ksgm',
                receiverInterfaceNamespace: 'g3ygrsiafiwn9i6jo5qdpv3k6wuzbss2oka5a62dci2887fh1rw7aixol837rabh66atk0ytb8fop081qnq0so3uiv3gdyhslesz4043kqjrjp7kh11kdepq0q1kilnqnp85f79e24h8z1gc18bkk19o40u1r4k9',
                retries: 68236741521,
                size: 1609637356,
                timesFailed: 3693130938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'wzd0lo6t2sez3b1ensnrpxpghjoh66c83ydyukhs8829vkc75k',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'z4lrqjwmbw85i7kfakvc',
                scenario: 'npr35ggylnagvaavn2o7ze8ous5hrn6amqa3fvsct2u6aeajpfuehgbzxumt',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:09:53',
                executionMonitoringStartAt: '2020-07-29 10:43:21',
                executionMonitoringEndAt: '2020-07-28 23:43:54',
                flowHash: '85qimxs8kkbe6ogkom1brroo2eigqvvlt4ikcze3',
                flowParty: 'asajy4rhrpxadeweag4fvkk29oy59c8ghxb1u36r0xuxrpy6etprt3geoz97910q3ef7kq9xvlsg6trv90i1q4d3amwt760fswm3d788sil0oxwwktd0bbs6ssfmglqqb4ctm7vm83t1d3dcesjcpixnnzkuschc',
                flowComponent: 'd4neivia6ulddc7ofai1xhlsojschoyk9c4pis9pwtdapnqo2wwoxk9lzr2aarbskwizklm0virisxgvc23e98hb6vx4jid9v1y84lsg2rbskl0j3vu9thrtzkjsh2a0zmgy5iqhoi2ce1g7p77kz9fu72ga0ryu',
                flowInterfaceName: 'fmwmdc3jmgn0wg29w48nljnttps2qxbzg7u3ehwg51zpi68fvm8w1ibaqr3rlqamm7qqvdxkvsr0t2lc9gj26ejdrds55dyqg29t6zni567556pv2y6umxbfdti3koim37zp9f0o1cuolt2i5327l687958ftb8p',
                flowInterfaceNamespace: 'osievwf05f3wnuzbtzsu2gcwg0owszmdlztmvb84lncjt45h504dca2uerp64tune09yeub9h3tt8y57bf156d4q4kezedj4lgqiw6hopzwkkrina0sn67fb8zjsvr1jdy8poy627vikj8swn0y9eggixj48wifa',
                status: 'SUCCESS',
                detail: 'Quam ut officiis ut velit quas voluptas. Odio quae et qui. Atque dolores dolor harum earum et modi. Vitae quisquam perspiciatis quibusdam quaerat omnis consequatur voluptates. Aut alias rerum odio delectus.',
                example: '2y86dbzyky3c4hkyy6h3u5w29194t7o1hfzkfvves7b7ze7sz8pwzfw1gxmp1touh9w473vn1xccduyomi6s21ytziuw16y7ju8avo1kwdw5n0da15sc0ijax44mt7yckr0skf58dm1gb2y77237j9b105upbcbe',
                startTimeAt: '2020-07-28 16:42:37',
                direction: 'OUTBOUND',
                errorCategory: 'nvhju8s61hkwejgqkm3mxa4wrrf4roc0sblxnnrl69jbrtt7sfswz18dezjggagvyd2e9pf1eyg3viu8ja9sbne7r7lhzzahgem9eqb9csjxn6asmqk8z3w65r85l8zakntgurcvlqxw5ljl0lzntjx4uf71a0m3',
                errorCode: 'smhooyks5duq9dg5tlrd8faowjcz8d60g4vvfuv8rnfmc4s5wi',
                errorLabel: 211695,
                node: 5283733744,
                protocol: '8n1uvtxyn76izilk6of9',
                qualityOfService: 'kue7ftgevcqqop890mzt',
                receiverParty: '7yaf6tocri0k7su2th080mv05rt8y9fbg4vqgbugr5hsoxctbnkn7ufec6vobpyalbvmngky3rncj7bqn1pieyz38942isqjllovzjnoioimxmclbw42kc0fpeujn45edfhnhbb68tj788go6r8lty956jrgeyzn',
                receiverComponent: 'q6sn438nuez0nez7q5dix0y7y8vrqd8bxl17oypgobazl9fm88fywldc0bznnx274im19irsu1969bvx49lf37iw40gr2eu4ersn9euksmy8h4o010ep8oisn87kekxr41pbcrs5s19g8blq9kw1n9l3ov27se7e',
                receiverInterface: '748j1zclkz1d0hik0l6d5737zuvzl3ab3a49l3gcz8nq87lc8mf61yrbaess2kr4oola2bxccmlibb6fwpddghq0zor79e9kaqj0ip2ccivyi513u28gmzidf1mmi95t6zv1t93i1h0wiboihfpcsk3ia94l57iq',
                receiverInterfaceNamespace: 'dhcro0i5tjn21qpvoftf7dspfs4f1s6771gicaowfmkumii0m90biqef8h3cqgm2qi3tyhwh82h0tihobq04w41e29ir6sgr4f89kkawuhl6ykoxaulobytr08xwqj260d4lzd8fzt3bth1qkzai0vpb4h9oxl8e',
                retries: 4186955944,
                size: 60597230276,
                timesFailed: 7908135605,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'iw79h9yu8v6rzn9up4vmrmicb4s3bwb6h5eocw60uluqeur3zk',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'wqkxchoggo8oc9co9jnb',
                scenario: 'zc317ofdokobxu6mlpyu89podd6aojys5dwrv7sol3e45vekes0ckjced5iw',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:06:13',
                executionMonitoringStartAt: '2020-07-29 10:13:46',
                executionMonitoringEndAt: '2020-07-28 21:21:27',
                flowHash: 'fli8k62n38r3v7djgh3jmqm2x04rk47q92jrl21o',
                flowParty: 'dlkg7mhobz7oyls5cz087nhgzg627n9tcc5139vcwdn1xknp26lud81p1ap8947ylxb2hj1isioksgjxvc9e4wt3yjl3jwcvfhojibxu703ucckkbvg91omgy2ya2bzwudmygi9zwo7mm3236v51q43iq12l41kr',
                flowComponent: 'yybnneshm70ya4jvft3d3p7qeprasu02nn3x1kvsrg4ha4t71ie5ffvbwnvhs34l70006fw1z5nub5jxvyam4ruc2x4b25qx6vqroc452wva8jjruf1ovdelpzhfsiqxdd0z4vqenv58v7la5ogzit38s85o4bzj',
                flowInterfaceName: 'v7gq6j2xh9ia4g3s5zuqrvcuat4a9jeckwamejrl0rlsuihxen96xglkp7qbd629uaxc07dowlpkx7cms8bttsn76enu9xw7nktb941gfcfkyge78cswszjwhs598thf5njojc3yv0ixquxmi9f4efnemy8gb21g',
                flowInterfaceNamespace: 'uhxznluzcqcg5plqd4tqbco43rjwi20gnn06r81o9g0ty0no0vlk6ijmrpzehtt9o5r6ahbzcpnq79mel632sfg8ecctedmw87oan2p0wgw9kebw8z8aqhdw0nyo8ord4qqfhv1d8r1cdiuw9u481gboc2mcaax2',
                status: 'DELIVERING',
                detail: 'Itaque eos dolor reprehenderit et qui. Impedit distinctio voluptate consequatur reiciendis fuga suscipit ipsa id fugiat. Molestiae nostrum maxime molestiae non ullam et. Fugiat quo magni eos ipsam sint temporibus.',
                example: 'hzeepalgj0xh59ffgua7qmw71pjqkevm0wfsw3a26amyl02lnddqrnbsbdusl9rvpaencv0q6tgi7mu3jpfij9ecz5m7zsx5oc6sjpl37mn3oriofxh23ksazmbdh96nqr1hqb7vsyzgk23hp54pl2kycrc96n7r',
                startTimeAt: '2020-07-29 15:30:02',
                direction: 'INBOUND',
                errorCategory: '9uj8zz5rgluc452huefybu2vsxpgzhf6xajojgmc20hmx0suwflh9el3nsluri0l0giq2v8ajh3bs4i536smkc0ju5q23bowtbyx2yoh8o69ecd406sqvfdkxf3ughqsth6hx5skp1c5u0npjoormxzbgaisrxa3',
                errorCode: 'r9ue73pxnfn6rq4k829esux04c08u5c8krzb9syz4yqeha120q',
                errorLabel: 237266,
                node: 7637470453,
                protocol: '4z6j8xjn87yk7p7zpqqe',
                qualityOfService: 'rkcnqj5mz86htucr5xqr',
                receiverParty: 'xje27sthwp7xjnaef2fppmg80nrhftv2peccvns6l27nvhlqeztc4ocgvqu11qs0rfclihmyjhcvhe3ix087yztgyfav2wqkx7ae58comd11geaguz8q4wa6czrnf74b72fk3g5ip9kqvhzznlw5sksd6g271x0l',
                receiverComponent: 'bkq8uoki3y17h3n7hira021mj2kf89bkoyr4yk7v3mn8ejh9kxlw6bwg0lin8ei2xsr1hgdkm2ddgjni2mk89tq2mmfd08qsqsayzny78s39vhkb668e87ziw2hkdjnis9yk74v3njgh5nxcf24i28mwlvljewdi',
                receiverInterface: '6xdcbk2yss5971p1jp8oqtkm1tit3mk6a8qf7jrqlkakxbe8dynhhbthfboadc9n9m749d0wb115yd9rq4d21mqluifb1r2w741667zxrnw83ekkyucvudg8yqru13m1a7vo0li19k12lt5a7w8d4ikwcnd3cg1r',
                receiverInterfaceNamespace: 'ddxlylbyz3y0v04cygxxdazjnro7ek6e9fwjlsbw2auivg0irbsutjgrb4x2onbqyesbnu54emj02y26bsiog3eqke3vjhq6ayg1knrkfu67yw7nl7wlchie1vf60z6wzuuf6j0qrqaeswo6xq5co10o75lf6139',
                retries: 6583474061,
                size: 5451966316,
                timesFailed: 85046568946,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '2llligb4ok43j4hluzd7m9u483spwmhbooq8nvkzzgcinqvf88',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'mwim07p9x6s17hu5hegr',
                scenario: 'x2v9frk0us4ht9ldeeoy6qpq4wpeo0cmeknhjexsook1t0shoun474zube65',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:19:52',
                executionMonitoringStartAt: '2020-07-29 14:29:26',
                executionMonitoringEndAt: '2020-07-28 18:42:56',
                flowHash: '4rswqp7x2su92meapxdc98p8cij7dzkhgdgskw8q',
                flowParty: '3ithtub1fhcacum7xfmsj3syfwfe9zhvsz6np29dvxhwhfcuaegwmk7rp8nc3cnvu6fzpip4u7z6xnq3y1iq926cqnnm7wf9hbsxdesrqa4394rt8x6hhb5fkl6tcd7eza2f47sj067thsemerpca8ew63v592pt',
                flowComponent: '7tlqwc5o8ihpvapc2pv4z4edz6bm6syj5xj7lwrv7yd5jl8hur9iwnrn9a7hh3bq1aa4txge3zvbmgqp6f0dttonlddvjy0x9fujns4f3c0vdfuuh7vwckr8pun5sj10rpa9uhzjql0l8hygxx1wcdno9w0khom7',
                flowInterfaceName: 'pj05iplnxrfnw8kg4q9qicruu0xzfzfyz4urvqmn4vmzghah4zc6vis68vu0b3423skzmglayki427obk5ge73b1521ixubxx57883brsbpp6t6n7bnugfm6dkpjsdxtn085w0tgimn1msmis1mjxmclkxsmzrwk',
                flowInterfaceNamespace: '6audjyfx1m9tys0y5mvdmxzmzk0af6eyq6h4h8u3njagduxkld4ow816yzrkxf2i84zxu5pgbyy6b1nrsk2p5w2csdmv23ovsxlvdrgke1rp7piefmves5v3p0bkbd3d6hoz2xkx7c1t3dv3iyhwmx3zctw1kfxc',
                status: 'DELIVERING',
                detail: 'Voluptas itaque sunt quibusdam voluptas sint eaque repudiandae neque. Nulla veniam laudantium ut sint sit consequatur ab qui. Atque ratione eos dicta et. Consequuntur cupiditate corporis. Dignissimos est cumque non. Ut et voluptatum.',
                example: 'twz0gossx7lwz18rdpa6ihpkvoktsnfnvvkdiarwnw5td22b04c5f16j5djsrbz7lezdvl0imjbswxcpj0uc49zyfbe2oiydlj1dxxmn0a7psmz5b07dx46vwitvtonqkn3de0o3p4s4rk3r1m91lluelideii1a',
                startTimeAt: '2020-07-29 14:48:10',
                direction: 'INBOUND',
                errorCategory: '54mbjt64ojkjine0cnkmqwaopdqkw7wszb1lm1gzekbr9ng47nlx3z3jnjhn28lw7ob00ca010rea3q4468skx0xvv512cdzweelanwonfuy8n5k5kdlt22hz5nxhtz3i011ixlef3vsxq6pamob60wyynf7d4jd',
                errorCode: 'f4wn1nxprrexd19jnxylcoe0nbfaaina83v1n0gnk6fxhbcwcc',
                errorLabel: 865564,
                node: -9,
                protocol: 'bsd1j9vwh68iixvew0x6',
                qualityOfService: '2fmgo52xtciaaxgo8lm7',
                receiverParty: '5wfidccpf0hfqyjra6k1rfzs3pql8w1qoxuyomjz59l5e7s7uubetj998amn9t6p05dq2gr17pvo1fd44l9yy3v6h1avjbhmvdwvcm839q31pn71r3131cc0via7t6sh950jey798yidrbbgzju48clvrgcoijpa',
                receiverComponent: 'f0jln91cl2u79mhqm098125h96icek4k020hbe0xkv373v9lw214xyxr44sagp6u6cv00maxvrmiw49qfsh62umjg81vgm900xh6jdvwb1xen55iamh4nsp1qw0gwj2mnikf3h0tsf9njopz1hkfx45o60i3tu9w',
                receiverInterface: 'mwo1kcvbqicfupcwa65khl8hgx18blf9ii0ax2wul026gtgzi5cdd6lrod6zq5gbb1reir5ots5w8n0uhfkjhf8kaedaxb8aih3aozf5r2j2l08jreh750nqizmg99vti8thdmt66imorogp3wa539soot2o63nt',
                receiverInterfaceNamespace: 'gy4ugno38sfqllnp6psjsqfd1javx8jpd81dw220tmki17kii1uxgl4crov2fs0j555hpfvbd2y6tf2gjo3rdwh4hken3m09vmfi8xc9e9ecjn2gct3r61v0tz0wte85hjt8ch8pc7xj7vabbi8m4b9bo9f5iwtl',
                retries: 8219295703,
                size: 3638497991,
                timesFailed: 5726758242,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'wmwzcl5bxray41t5b9grafrswrovv1okszg9i2h1szvk8a6hi7',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '5szx8hmoy5hr18zginn9',
                scenario: 'pgss3h5ojbolkqeid4vqoymw4iwuqdzqbvm64unv48rikizb47d09pfg1z2v',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:35:33',
                executionMonitoringStartAt: '2020-07-29 03:28:02',
                executionMonitoringEndAt: '2020-07-29 14:53:12',
                flowHash: 'qh1rv5wv64eqlg5ufd1z0h7vgukaogvqfn42wqko',
                flowParty: 'wurejc93hm9hz0lf66oh38o8rdtwg43g10axagf51i3kv7jm6eo62u9e5vmxq8iij4apsh68er24sq8cjk0hrrqitlbtdvsdlv8gbdvpoze7gpgirjgjh9n63yu2lsrwq9hckerpu7hvy9ocm0729vm87hoh429m',
                flowComponent: 'w7ci7njv7uxgtrukwk7tw0os7tpmvbxshqzv4gzy9pw2a5yloe9dpfyhbn6gjfa35y8qrgrn00jlv8hj13gf4m7het7qz8kqmc8rg79mrcgfjy3t87ve5nflbi95tfpr9d4t23s3jey4r5cljz1wp01bkxmwu170',
                flowInterfaceName: 'zo2uo8071eel5s7uep7oomdstbq5plsftrwurzaay2fbs0o30m4hks4hce44nj40q2gtfmt6z95fbeci2knn3nk7v2fdeckbwli6qdyo3yonxshui8uea587ajatq8ff1dj25puey9s9g6q2qy32uf5aqi4rzsj5',
                flowInterfaceNamespace: '8vkyfy8a8ph2f2we8hbhamqhae2o32g9nwdskw44jnnb66iy8lsylvh5z0mb6gfgk5gq4bflub6ziwurgfey6kdzs3aujanqyk9gxd0uhax4omb0ngqufp0ipvmlmbxlqcv6r52u0ee3j4tntcqt6s71sorl1zwf',
                status: 'TO_BE_DELIVERED',
                detail: 'Aut perferendis et sint. Sed ex doloribus nulla et ab. Et qui aliquam recusandae non amet quasi ut sequi. Voluptatem exercitationem est qui dolorem et. Blanditiis qui nemo cumque et illo veniam. Libero adipisci consectetur excepturi deserunt vero voluptas molestiae officiis.',
                example: 'yjpzwxgwedgt8j254qvda658pq1paubk3atmaq2tetl5wo7o1tvaj2nsuiz4t9gkjxu66oaa9km8koy7jv9nkulslh5uyyk0wdi8tc3x1v6noo3u194cysprj5h3ac1j7nqq63vkck3h9s9kcz2qjopp9nosb4y1',
                startTimeAt: '2020-07-29 05:44:24',
                direction: 'INBOUND',
                errorCategory: 'slzldzmq6z674n1mhrofnqdfs9n52lkqkrbo22wn2cbmazq9qodtn56tmhtkbcjtmj2s6r2kfyznvcu3vtdqmj6bzuylqv1qykvzh641ibdp8fy9wvteo01yzcxvcgwfr0lgxu50bx7g1kg9uh27c5bsr6bw8v9i',
                errorCode: 'tyv7ge4g057c7sxrc7gvkysxeppj3e42evndljiiphq7c0qtbu',
                errorLabel: 509819,
                node: 8670508354,
                protocol: 'kvky1mu5nmyd7xh4lgu1',
                qualityOfService: 'skopo6vpsl84ty2un6ys',
                receiverParty: '99k9h9bnuqtaadsdqedu6nx49g5d13k9vv9006z3q90rx9lxag7nkz7x1hqsgib3j3zxw8nmf5u844g44cp6zax1to0j7kplx82i0r5vpvzm29wqhqnjxnkpfv6mr18vpvjvg0g6pvdbgy7mzek2uea1fu77q7nw',
                receiverComponent: '73wccav4cgdi7086iq5r35m70z8jl41yhiy3ctjalmvu6wkhlouxr5fbhicuiugjfj0rxipdgppya4tjlh0w8loz16rhr7sgzidb7gsurbj6qqd555g62bpqkfm1bxizcax834q5loe65xs38bjkip7sejn2tp89',
                receiverInterface: '28urfhfvt670lkaehvacg7816eoy7fu2vsk10tjg2bw2ar5deo56i1unuayx3bzckvqhz6v5erf5dd4adheoz8kefjix1ordjwggqdwt6vniqhurdkz9lbwx3wh86oswho3atxelfulk4h7u5euohyqzfqp2evml',
                receiverInterfaceNamespace: 'nrea2y1jxvbdkvcg6ydhknjs8vb2wdteh8w8z5a9tmacjgc3cupzbdjt5kzjmf2oupiitx4dl90q623dw95xpcfcc86a5d3rz1x89fyi7vml3wv3y691ya9t3kva6pmf4xsm6rzvb13185mcrtld3lroc3iyzwxn',
                retries: -9,
                size: 6277547954,
                timesFailed: 3798535362,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'r8c03n3fkoycfthdif2uzw8mggsb1b6fxuc0h6i4opkgidm4q6',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '4dst86co658p9inu9ktv',
                scenario: 'inklbbiryr7793b6wki09ogre44d2etlemm3qb6ynbjkfibo5u3dz2o7pjed',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:13:13',
                executionMonitoringStartAt: '2020-07-29 05:32:23',
                executionMonitoringEndAt: '2020-07-29 13:12:14',
                flowHash: '7chr752hlw1b98xqp4jjz5ct8jll0ucb8f3cue8k',
                flowParty: 'ap5x7uub2l4sw5ndul0i1r8ke4jbt3kw1wpi06opo15673rou61cwum1gen3xwcznxrj6c32bry8791jt8hkep9ikx95od7qhwsny6hykfk5yrzogqudxycvofxqz4r6j33qu7rkzgcnu9p4y2c9dkldlxkvtv00',
                flowComponent: 'xwuv0bdx9n3cttyfmdedturdn0ba0t4tt282fj9ydkfa19lyc6f65yvkiemjeintm56ur2fx1xd7mhz40978p8oin0r62xgic8dff7bvuz43pjj56isz6gjxzw5hvu575h4kxvj7znprxze49fughepq98mrkzmr',
                flowInterfaceName: 'vtxtt60mdkmzwk38h7gkiaazhjif4u354rhtzj1l4ludfb6jhebvw1qyk0oinnabiiemsrdd16nkkt77iv3lm0c1il9ph6am4hgbavphsdmxoqrvdm55c3k9th469flx0ekfq9xnt61gj79891g4gsr5yd0bbjvb',
                flowInterfaceNamespace: '13bk4ih7qiwuu0duqt8t6eazwgwi680xfoc2k8w7bntr7dnzvselflp9d27ka4ux9nng9ep7ot85bw58tzoe03fq8fs04j9jexiw7lv1jo5329fzo6isd9h65oti5zwvgid2smvhc7h1miao9l8724ygz8qdhpxv',
                status: 'HOLDING',
                detail: 'Ipsam sunt doloremque et numquam voluptatem esse eligendi voluptas. Et dolorem aliquid ut libero. Temporibus tempore mollitia quia dolores quis deserunt perspiciatis est voluptatem. Et voluptatem error. Dolores qui et eaque.',
                example: 'ajud8pcejly6unsqjvly2mx3uryezu3ph8jjkvwu76wy1mx6c0tcjuz26wjxf4bokou0bz59svixgdihj5r8lormizhge9xv9eceb0r5o6oq5bcsl5x8u8wwmktt3gld4eisofv150ktqpp41tqhh1hxykinbg1q',
                startTimeAt: '2020-07-28 19:38:56',
                direction: 'INBOUND',
                errorCategory: 'dnbydt9j8cvikxf1xbvkokqsilo7rslx99qd8ev54jgmvnu4gnsic5en5xx9ord9c8ovuudltb8816zj2piaeblil64882adjuovpnt227e4v9lkmtjaf1wtedpphzfhaydu2nwiirkn8bbaqp0n40yubbuh563u',
                errorCode: 'i5z9rs0aganmx4zb2kc5a0wie75upcqrud8w4nzxixmowaxcvz',
                errorLabel: 336142,
                node: 9759789517,
                protocol: '4t8rz8t6qhfe6bopee7m',
                qualityOfService: '51t1jx1jbt0vzwxi581f',
                receiverParty: 'apdfo7a4iy6zbbd5mbdhsuqf4iww7y1ulx6y3jsn45gbpk06dbvxtwzj65zafz4mm5wtqgc1j8hxeuki5aabw80ovb7qmtxps3roh0a17m4h3cbsx0pk652uqvrro2zzxap3mpdztrl81w7ntcl0w8grqr8hassz',
                receiverComponent: 'e9zjkjr0g4lyv481as52i44nz2mo2u05esi611rp4bgas9hh9t3uvn21t7g32898qgbq30frxp5q3p6zf5iqr55o6ddc8v6c4o0rl90tod80v2iwmxqbfr969b6n0os15fycizum1ew4tzoyb6gl9k9gtnjg3zrp',
                receiverInterface: 'k4khlnsp1d8pxhvycdhzd63yqenbxugrgpk0r1hkv5pu25ia3gi2elfyepqq5d3sqohck18ihbl6deqj5irg4fgevsgmnw1n7ihd0hq96ep6zrojw52vs9jg7lg3bzzixf0hj90s26c262uqgex4ah12cw95gh0g',
                receiverInterfaceNamespace: 'jgg9th7b0d5av4oms4llkh0gnmv8l99ox64fbis9nr37gvoyibb3pjf9lkmo8fdnbcwi0rrwpenda5ltjxwshvidasiabmtrfcapxldjrafxuhi2t6n5e4hqbfhnpgrrft8yaozbybhouoqcs90fvmhy5of0kj3m',
                retries: 2005263669,
                size: -9,
                timesFailed: 7380651574,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'm414lmxcjw0i5i6bktx0q0gb9w350wdfx5cxtib46hsa43ognd',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'i3t258evohdpz0nu8y6u',
                scenario: 'xb5lucohlg4fnbjqffu6udv499f38ay3caheh94nevjfkz99z492rybzhhwh',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:25:49',
                executionMonitoringStartAt: '2020-07-28 22:39:21',
                executionMonitoringEndAt: '2020-07-28 16:12:46',
                flowHash: '86porkj7xtrpdppym8ueszhodjcmrb5uwrau2g06',
                flowParty: 'j7h6h9do82lw8cy5wbitpu18imloh0bxccnzvh5r27r8qz8hmkv1pm7jszklo4ddiari9x0ia3z5f5uwkrs3vnvhhrlcd9fz1ea4oh3dpd67wpn100pd5r0ue3wuqltmksrba12o1b17pymqh2igtkxkcelg4wsc',
                flowComponent: 'yg0moq4wihx6cgu77ocrbmmb2ola7cvl6ptvnpy4zpaig2swg8yz1w5qffeo5ytwb9n7ya4zfgv51ulenn55jhwuv0zucunb0wvq1j1s2e3nspsvyvjd7fkxd3r1q0edl2obg1z6vkoligg10g1bazhos9us3x6t',
                flowInterfaceName: 'uxsqiiwp0mtbs0z9m9vle27pck09oj6bilw5kslqkgddq1qzblrsm87ucfm9ch4uodt9femno484eeidlhf839mahrzx2boj1i6kg7bb4i6hlz08o254ky5wkjzaeecyjhw4uzmz27rnf5u3qvn71hua7gb79hms',
                flowInterfaceNamespace: '1cmks6q5afxvs69oxpj2ao77px548e36o9li1jo9wfq48jvhlaz6soomfktqk50fx4m8ybexibjw4b9bsyy2tke8lzalt6k6niv1og73n4jmzqtayg1tqpcixf3tok9472xixb2blhiupvqspsekv82dwa1mr1bz',
                status: 'CANCELLED',
                detail: 'Eligendi dolores laboriosam atque sint nobis dolores repudiandae odit et. Et repellat et reprehenderit ipsum voluptatem rem. Quibusdam itaque incidunt quos ut debitis est occaecati.',
                example: '2ahb38ls16ahh5dsxvfq42z8x8bjj6eyhie1y7mh4i60c6zgv3ll6kw4nfrxy74bdaywol8gl5mp2wfddjqicf7uetmktzxpr4tew7hblszpkbu91jhtsiy25cpygeq2mow850co9ehbw9mp12hzhj7qo92fp0e2',
                startTimeAt: '2020-07-28 19:57:26',
                direction: 'INBOUND',
                errorCategory: '259ihuw3jsllw1ce3xa1no16s1vqir0qv4blwiufbepizir54nx5ts4n0a2q3887lvz4as9xzvh9tqeciwgx1fqsflu7qfv4juii6d4kp5mws0y7bn2xx9uyea19jb6263o73bezyx4uktx92hwod6wkwxwsocab',
                errorCode: 'tagkweyc5dbmv3850pxaw2r9yo35w2dhw5ziipf3ku1rtq7x0h',
                errorLabel: 534137,
                node: 7697907475,
                protocol: 'nr3nsx7q3wguzpe9auuu',
                qualityOfService: '8uvoauflinp3mbbboter',
                receiverParty: 'splweiinqdt8pwsrbebekktdldv35hx2zg1q6n3qsze0otnp6gqiwsamz65cqpgv3dw2wj2g87uacwl077hkcyuuvrrig68lbo3zgf93zherpjo7qse6ous78aer5sgsw0bosjie9kb2urqbqajptacc44p0a1ex',
                receiverComponent: 'pzc3ovmirshj4zqx2h04wvbg8odd0lva3z3b5z8o2tcmfvoqvyf4zv3tmenwkoxp8j4b0l3fk2088t0twpk0fl5loubr7jaeu9vt64w9m0sv0oagpkifmv3ds3ttzqzb7qibyssj26z0hecpsholl79m51o42ith',
                receiverInterface: 'y82ch2ljqokf8wmaezry5upj8gst9cp9h2sc19pzj2dt97cl3u9lwq6vcd2n7jmqzr0jlwfqes3ktrwxege86ksdsn3asxhq152q4kd1lgrruv6efjn0ovlkviauc4uympm6ydsxtuxty64mjqdz5wxzeoysort1',
                receiverInterfaceNamespace: 'w674mbn6khw8af67c117e92mpfdm6hvfkoywwpcef8bm9e1ofb0xtzx98rodplot71r13duzwbkb4t5tiytneghp9hynxdl9ymo8rt33vrnmoxn8fzt1yfzevg37xqk65nocwebom8cef5z4u5ch6mkprlj1sxm2',
                retries: 5762680809,
                size: 6914351955,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'w3jygna5i53d6xzznhulq2qr9k88945yxkrzyiwx5g6j1cfav4',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'xuoclaowb6qpv8q72im1',
                scenario: 'dslqa9ii6q7orl62cukwpjzx7sfyg27iohau8wehwh7cc1aa8to96n57hha9',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 20:02:53',
                executionMonitoringStartAt: '2020-07-29 10:31:54',
                executionMonitoringEndAt: '2020-07-28 21:40:04',
                flowHash: 'qp81i7h9pisnhxj4fhm5dzufy2t8tak2qx7xbd2j',
                flowParty: '9yc04z63s069qnaxxjrbodhls7i0an1c3p0umpt74050zpkj92f4mlj576lcdeyibwkyldb52dfioas3egrxi2yxhxrjmc92d9y7osutn0jl2v72ctens222mjd8n3avnpzzce6rqwwe4b89nvdl11w51gvc1dzz',
                flowComponent: '9qefsa1j40hlh83h5s9scs8c4a719xq47wwlie23bpw58cvjidhb5bj4u2is30nayvj74tngjwykcovl7nm9o5tgg4att2kf9ngbie7d52e6dncu834srwtc08da8xfivvsw4w1jlaoebducyebp15cfzjnc1y3s',
                flowInterfaceName: 't2e31qtgbt95vetanhqlmm0pj97o8i2p0qpy55n0s0bkx4kq64kpyjyh1wdt07b9ywz3a9fcqd83v9qfcxr5w0htdfsp7suvf4768z8x0fo1uligiiewfyutuvd9jep6c3ra6iykli9hwtwlwq0zlsupuncucn1l',
                flowInterfaceNamespace: 'dzmgxcp7mn7jy9euiso2gcgj2wibxjxwcdltqqekgrkvvt5bojppp82z4wsuioyzq044hdgwhw131846bfotw8vkqgmjlyx6uhmr3p07f14uc8gjzmt3xo60q45di3ozfx7btwg9ibd30daj6fr94vhwhtv48yod',
                status: 'ERROR',
                detail: 'Repellat voluptas quia. Beatae reprehenderit occaecati ut. Perspiciatis quia maiores labore omnis.',
                example: '5q0hiui0fo1f9been89uz6remzy53ewh9d8nrra8r3vhgzr11uxhhazhobgpvclhvlkdkia3bqmxqrxq746zrb872qoxhildy2lk2iqx4b51urs48lbnzq09qav9qpsux2lj408jqa3e28engcxyho7m2b0aos8t',
                startTimeAt: '2020-07-29 06:18:58',
                direction: 'OUTBOUND',
                errorCategory: 'bmx5ahlix00g770jajoah7lt7xyl9attvg2pz1a8kzacts166m5d36k0rul3ul5gcno70iy5h1ilwmqpjiic8rzgbmn8jsi0foqiihnclv3v61q9neduaawyt2lui0s57fb44s6nsvt00w871o430omcmz8r7qwb',
                errorCode: 'nbp21px1piosxlrx7sej3atacjhoyvfh2oou6ny5bt1o4thwxc',
                errorLabel: 401699,
                node: 4468338706,
                protocol: '68rhi8dgm56mmq9f96em',
                qualityOfService: 'bznbgw5rudgb5rrbd5qn',
                receiverParty: '9nsduyuyh0njaiotx2wlamcy2tdqk3uzhw12eycfq2vzgduex8ja8h5qfi3dyn8ojjr1spywme76pbw5u2flm07mymuxni23n0q8xjnuemmynaznxembga4ewz3yb929vpzyvzz0gm7h9uhmm4vbga6dnh34a8pp',
                receiverComponent: 't8u54tqxcnrqo6xw9dd93y7e46hll8r9650fopvn2rvslh927w283247208lwsl5dgpv4vur6ighp6u30j6bza9lbbhmmehsyn503hmujg8rtw496wk05pwrbw2t9bc9nxfei9jgj66zdqrmv2lj72a4ftbw8dy4',
                receiverInterface: 'u9crnfj7eir8okrosdb5eai5bkgrf72gq31sc1er39pybs6o3zkew3ydsd0bn4ehdtkmojsoe8nc5ec5hxsm01zotwq5n5tdc3e4ry1d69pj3j012npdntlmkpvqra98zgy68elv3x0r8tkj5cc4tizvmkj8hyox',
                receiverInterfaceNamespace: '2vk03dwukd58axfr1w3zaf8h1wqtshucz5rm3dyc58nvy9ofvq41vv0wxvf996ie7yzctocc8sp79l65x2358p95aut6qlg4kvmawd8ch5jyyr3hbtib9zbq6tbz5nzdh5vbcsu0835ibsh7fqlmkmy8oq2ibuwn',
                retries: 8524026385,
                size: 4318704635,
                timesFailed: 5625670125,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'y37bto0zml9a8k98s1j0vbuww97rtjqo7h21220qermeocb4pk',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '24t1t76y1jnod48fkjut',
                scenario: 'wl3vfz5zzcterwsfr6hpwy2lj7m9fby0h9q8oimnft20lj8qmxhyto6w6z5b',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:09:23',
                executionMonitoringStartAt: '2020-07-29 14:36:24',
                executionMonitoringEndAt: '2020-07-28 18:52:01',
                flowHash: 'uayk8p7nq0a7afbszpykbbmqiu5tk8mcnxl35tbe',
                flowParty: 'fxisxf6qx9oi48o5bqb9e1wzrjmhbpvwukxvnprgrfrjl7u9319l4usg3p4tmi6dmufb1qpwdj6az0u8kje9450quv3bxrelx9jwxa0e6pvjhog7k60xhv1ncre02crwvr4xyzgmerlvemhldxtiqcmtczo6esx9',
                flowComponent: 'hhhx2nzmfaj3dfkq26dvpg45pdtyfl6hlj655jbm1xfiao7ywdd0iuqmc17psqqkm28inh1lx6z8u8aw0qlvoeo5aop8eolcqe9xuwvu0xtnnxqf8yenymyuq67c6sa3edt4s7gbftx73b4xdoy689xqfys8d187',
                flowInterfaceName: '51v8vaticm7bvrt746jzlrhf6csmhtkzh6wzitiz0r73w35e95aqqtfqqqb7a9v8f28tp6v869zhqd02hy5l6csy8joy65w96uhvo5rf9xbe3cwszh4geravvsounygvvrlm0i6393spgik2kjh0y7opu2ab5yze',
                flowInterfaceNamespace: 'm7rwi3oiz305nfg1mm0tfuirrg2nk433klbhqsmwxq1ksofdblm1efkhuqauwo9heojxcja3nlgnzywumzof4pk0xwwgoc48gssr2ki50icdkh8o1snoc0ilikr0i6cmfccmkangwn6npu9h6n9gag1882rdlqnn',
                status: 'XXXX',
                detail: 'Inventore sit qui. Veritatis qui voluptatum. Amet unde perspiciatis impedit. Eum cumque deserunt vel nihil. Impedit ipsam laboriosam ipsum odit nostrum.',
                example: '3lbdzowzmm63yse4h5dfwstkv5z4njietik4nmw130dcsy7x8ghjiaynzck09q4asxmnmibzo94gpclxsmhkemf2lt927gyxe22mcmi9w2owvrj3jx8cgg0e49zwwhkvmlaxyloyu4ozasrg9ciq2tdoapshbbic',
                startTimeAt: '2020-07-28 20:01:42',
                direction: 'OUTBOUND',
                errorCategory: 'fbp90k2rio2b6gstysz52tfq889l5pw4fld98p6q13cmnqd3oxt6zpy2x2c9tiro120ql3ei2xurqw2b43ixroiebpbjktne157biub1nnzokda01mmmvx1n28wiv3dmcxa1n98n8ktrdg2irsrkklgj2khdgf0p',
                errorCode: 'oz5xdx2of5vch57w1ghztt2ipyw1ysjoivcagqsg0sid00kx0t',
                errorLabel: 630242,
                node: 6500728067,
                protocol: 'uvu7laips5q349kethcr',
                qualityOfService: 'kxzbkn4ke2ls13xe5m6o',
                receiverParty: 'q3x03a47qnj8jzhiax1d3vj7a2uvl65yipla479w3vypy02hvmdqhikjm67k0ffxujdibj0lscip99x7ylbu7vd2cakp4hik85u17w345wxwoh3x3m2kdc5imd5gs1osf33stjj1c6zk4kun8pkh73t1gywjcuk8',
                receiverComponent: 'mj314u66o4rpyikeag62zjnu2qlhzd9q56m9fwu63jfxidm0shn9gmxs18b3figyhtuba10o6uymwij5vobel6acjqdmx7dg3enlhm4t5x32fj4ycesheb4viv4yvz9gko37vfew2gamgahu22efv8yb0pinj3c2',
                receiverInterface: 'x6shaxu5lq835upcrkxdh7r807asgtsnt5gsjl3tkurchs5i6vockti6d0v84c55a2lyy54ix40hcxlxg4goqxq4sxyefgjyuygo52cma151c1j0ewa7lei3ou0ne8zoarhlk8rlaz2qtbiio8vgvvml3iuf30i4',
                receiverInterfaceNamespace: 'b51wsl990v6x2qhs6azbwkmyu351jhd33wulx0yemo9wl9yhukiznlgc10bfjw3mlg63r49i2gasdiftwzqqlxems6qg9z0esl3o5uw11g1ehk3wxs38f4g3ov5xkwf7xekbgolvunmhm5too2tnlnbk0n4um8v1',
                retries: 3943106786,
                size: 1801808670,
                timesFailed: 3441939950,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'rt9d8cwjzsg8d3t9sqpkfo0xben1pkdcdlfzwuxg196y0a6dcm',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'xr1glvpqchargztvgjeb',
                scenario: 'uvurw5iirwkbgyv6ykscf315z07b7wc3ydsyboajwirawe4vcmqcj9bmh8op',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:16:44',
                executionMonitoringStartAt: '2020-07-29 07:32:43',
                executionMonitoringEndAt: '2020-07-28 23:40:08',
                flowHash: 'vweyuo8gj91b2yzn3m5uh64hg6bqp43pzht5577o',
                flowParty: 'l4iobchz8a0p7w07mzs2ktcmnny046pq0qx0r9vpjtb6i2gephfgkmhxnnhlpjsttd9etw04buc4luwsfd14sjvvoxaj4mhoxkeg8cbou6jbrddew8jvnqspitlrz3zzd161n14gemkwe8krq9c7pso3nmc35jma',
                flowComponent: 'y8q7kfrcg0rrcnat9nadwn92bw0a1qyavczb28fdqu4baiol3gq0g03vbzekph6eb9dhffwklk76b8db9n5tvn1wk6i755fizd7rjwpv6v595f7e6k57f4qhlpmu0w4y3iqgdylajpk9x4yaa5y9i17ptlyrin0o',
                flowInterfaceName: 'e1kv5l6bn7zl4u3gx9lpn3s2uvwun3g42ezsfrqmzvj0fze9th5o0m317mz06w8jwcgm491dddieuk9bmmgkjrxsg3igetee2ya671k0y4sy68gwlf24rfdvhchm40j917tb8dt0amj9r9tl1msp6c43z5endgb7',
                flowInterfaceNamespace: '3f6w3jmxfsdku1lylopfx0ld2elcjv521rm7ljxm7u0f07gugwh60v82crmnmlvd27p0pj1hec7dcbsvbmi9bjie8yudk8mtf5zhfkai7cqpn15rhxoiagyvh10belf06ddjtjq0xe9y20s8xtp5zjih4ztwki3r',
                status: 'HOLDING',
                detail: 'Sit iusto tempora tempore. Est perspiciatis voluptatum non quasi corrupti aperiam. Quae veritatis enim animi.',
                example: 'g6wnzstaltkyebjqrpwc5gec2xfaqmiuuud7gosvvr5ebemgvoocr4poctrnqbp6nm9kviz0mib2sel1rpq5wmoise8xpy9uj9g175m94i43vuoroklntc9qnas4gsjv74edi68twcbchjjacvcunou57o5blxsi',
                startTimeAt: '2020-07-29 03:49:18',
                direction: 'XXXX',
                errorCategory: 'dc8o954gibxrb7e45bd140x5fpi0sxhkhiglbivm9cb501ppt2o030ydqb4407az26wajj1fuxvhf3gaa8kt3855grh3kpgnhf0blmu9lt742gds9u2bmo9vsbh8xnxclvffsclm0tjyeu0awdzwoaq5nx714xq7',
                errorCode: 'hbwzrqqs6nk6yb35mnclclwv1qplbwb8duon0idof6c9un7nwx',
                errorLabel: 746079,
                node: 9201435942,
                protocol: 'bv5u6afrs9l2t2bvu7x4',
                qualityOfService: 'xa2b2dehajvjzir4gmqx',
                receiverParty: 'rtjgzd4jdqr2hdfb20c9g9dzvriwfhn8xtg6to0he8aqtwz9n9j00eemh0glqyzxn0zzuldjerylzxu4h7ymlgiqhrjti8yfjr67wfetp4jowklk5cl62dy4wax940ajmkenoxsiczmpu1gu3s0pajamv9rkdudt',
                receiverComponent: 'cwahyeb5omrugi8d5qhxpy5hymxpt4gcj9qnmvcyw2033mycgdyxtruin8tieq1n6cpqmk18ry1aisxrvdltir6y1wtjez2lai3xrgoy491s9uzd7v62efr5h87efhu3ol4qtckta0mdtb95xhmq3okfb32hains',
                receiverInterface: '79d62nmj6imks5fb7aykoephslzggz9zjvwj1y0ip3f19u3sugqxi9o2mzjlwj5938zj9ptp9m6mdnbxl2ebnm4i85xa6p2dqxom6mbxp2v67gd3h7hf9jt6cvbcgveuz6u0ofajxl7413n9g3ojc2toxvi44xs7',
                receiverInterfaceNamespace: 'cynvf0h4xczn03xoiimz8v311229no5d6hg4gk3s6nfyf6923hmi9t6wjlvo71jh3yn22crj2zq5y9ckz25pis3oez75otqzeyjff8ml2mvytv468kuzzh7sa4zgw4119gqg8jvgnv34wcuktcuxfm1wmm7y9gz2',
                retries: 2435966153,
                size: 8518905724,
                timesFailed: 2544399685,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'pbv77zjoghr1bzpjlupoxtnbkkuwywcctrnqayzt4tczgzilmr',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'o256ufx24norikukv4nf',
                scenario: 'miuppybhwwuydy61oer0bfq9vqkewnepg5ba40sv4ds9znktto1vnp51upl0',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 10:57:25',
                executionMonitoringEndAt: '2020-07-28 17:01:08',
                flowHash: '8dugmfqfv5jx9sv8etsw85mtm1frazzhakkddihx',
                flowParty: 'gakvid3o6ettokkvxvsrigqd2z7yq2zn0ne3nz91r07whnqdwb3suvev1qblptkhkt3d6mvg8rndumi2uot6vgmk42l593lifftxzmx7i508eeu647udsjxp6mm2ey7k50fzm3g0cxahxinbhbbcw7fdl9tfen1z',
                flowComponent: 'uxjyghga1z347mrndn76znsv6jlsyo7zjl42155owuzb9kp4052fu8ffj0zgmc48vdiz5mmey1396lac6k618ekhyrmhtsgymepvdrr2nt724ndqin1ltgc4w88goa1xztoff9st7d7mwg0ac9nire9zwxc8i8n2',
                flowInterfaceName: 'fk8hiaebekd06wbl5oksycijw5puqxold7thdteyl2ful0ze4cwj17c8ijyikldsjjxmu9buwkqwxatwybu0kp75jvz9fl0kh8oyvjr5qsq5dug01gnqwh92jf3x0uki14wqeadipiu0bded0bzz9v93td9fqea5',
                flowInterfaceNamespace: 'giyuu7279eo04kkxt4swnamo72ki2lt2elcw45lgnt3eetllab62jya3ocfgkhc2twca7t6u0tgiuy7xjcv54vqlbhs58jrj8h9avhhnd2h4ynvm6nujmd76oaj448lgk8swc8qpun3neuw2984tgna621g97mup',
                status: 'DELIVERING',
                detail: 'Sit non corrupti natus qui possimus non. Quaerat sit architecto accusantium earum qui laudantium rerum officiis. In a omnis quaerat est et aspernatur. Est tempore harum sunt in. Reprehenderit qui sit excepturi.',
                example: 'fpofbpqr7gypbkwcbqitn5o3drdgw6444clpbjfri9k0d2yx1jiwbu0qzvb26shfyxnir2w2vz16ppxzp73s120pz0qr2un9bc02mclxy38zzoaeauq65qjid9urkk9hyr858g0rvzorycdiw1kvprgt6lknlp19',
                startTimeAt: '2020-07-29 12:16:32',
                direction: 'INBOUND',
                errorCategory: 'ulrwsztmi5o4h1r3vdby4gxbn2wgc8irj36yz7n1ovlwbindnauu76xi2alknfo7kn08e5ah0dgwa17h03925zj9vm3bfqp426s97vk9nr3bbk7g8h8gamxlczhygs0i9cluiv5apx3xc8ifhabnh5dundclygzu',
                errorCode: 'r5b9ewfutfh0hd7857xvjckjoxrf2esbgqs3zzubjtsygrpql2',
                errorLabel: 974705,
                node: 8054858457,
                protocol: '1swqcuzbw6oe3vk0v137',
                qualityOfService: 'kettiyjf2k6nfzzr942o',
                receiverParty: 'qkbk51e6fk6o85a453iz3yl4mqkoz1mxunej6diwcvr6hykhah9slqs44ivrovvp2u29hp4dg2vpk2ar6wx4g4ajg8kgzvo8fh2owlrqliiwm2bn0svd59kyk19sylkqtdcdcm5c85p6oal7h0kwkjh3hyk5n601',
                receiverComponent: 'kj7lq5w8vwrv2a7ano0og2qi3una624fp1gdhdvf1bixilfzzs5nzf1waqkij4b9g21uk9niarm3ozifnjznpdkqujwf1bvnuw65bn44ruelprylzzp7381y2to6azea239lcwzp5n1lzj269adkzqcx3rb8ow4g',
                receiverInterface: 'c3nenlyzllx4w5wdzx0xuyjfhzgizqcvxn05lhd4k5jq8iwrtnr1lkq607yjk3as53d6fk727oh9sgxcalo7j4t8dsk2n9odxtzpgaeqnhzoq4ywzmcqqf80zj9kddr7xoutbr6q9rcsnb6gxow2y0amjn279n2u',
                receiverInterfaceNamespace: 'gnlz1mq0w8va70lb9p8hksj8qnjhs691ri7grs3kq22nrmkvpvswig3rt3kcyfrmkt7t57n83k9vmnqyazlox3eqrmujx7mm21wcu7riy8qfj1vbrauanvasiz4c648sfo2qyasi90vm7yu8flaverd22tnewq9b',
                retries: 2789784442,
                size: 9366250972,
                timesFailed: 4076862311,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'zontb8yvh6tub4v9cl2ydieffoxd0v4av9peqc14w2d1zib7k9',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '1kxjh3f4wbs005u8f18x',
                scenario: 'sbkrgbo12x2nwpvfkxgtml2d7jlq80di7hspt10c2o6fy2hi9vj8rjqy760x',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:19:29',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 21:51:02',
                flowHash: 'gntg6q7ljtfh8ck5leggkf419jt5e2rfyjfdn1hy',
                flowParty: '5eyv0rurr7gw4xhxhclbev0blugmfw1kg54s0o079onaxeq7iqh82o6db495ru3l7t01haz052p34jv1rzow7hozz7ws3oe8fg4cs6e411qnl0h9dwk8ih9ouoprh65l1ppbh7veyqjaxiy6nyogh3n06cejld6m',
                flowComponent: '35awmx9u0cbsj2h2vb6icdwnm1mxdumknkxa99o403h21t2s1pckirt6gyieuku5694pd2qczwdv0ee04w123u9kureilmugvpc4ge8p13v3uv2kl8ko4gkvmieab6d2u2zqk9s1s8wstkbuafre6vxs5eq95ow6',
                flowInterfaceName: '56si2j6wwclnuhghxrev53owlbtkjtswwtxwhgxmxrgprti4qm8c03htdvh8056rpmydfeyqflmmhvtufivofev9u9iw12u5cpco7msc2qtp056tpp77tzin199e29obcbgaqb25p4erwr0oo5n37mtjeijujtm0',
                flowInterfaceNamespace: 'xf5ip1icfdaxm0uz863ddlx23iwaqhrmppj5y9jt6se4ojzs8jqbmmqcnt07nm51jq507mm9dzixjndz1au4v4yi2bdotq9qlvbhjojy0hd1vxajotmkbda34x6i2ytgl357gzt7ueyfenu0j6dx57wzszawht7w',
                status: 'CANCELLED',
                detail: 'Dignissimos voluptas quo et nihil consequuntur reprehenderit ut molestiae. Ratione molestiae ipsum et. Impedit ut voluptatem voluptatibus laborum vel. Et similique exercitationem facilis laboriosam voluptatem consequuntur odit. Praesentium doloribus maxime.',
                example: '263xbmjs6q3j2zls9hxxoq561f2jli0gyciz6i54i8uehynatxe6tlg24rio7fyal85xmysu0qc69u3z463qvkxdzh100rzppb1u1s0pqwiim90828f8ukl3nxqvix36qyrv878148npgyachw48ubpnu86gfrc1',
                startTimeAt: '2020-07-29 03:24:07',
                direction: 'INBOUND',
                errorCategory: 'utmxbmw67j7bxva2tqldr3hi6n4y74r1wf4kgda3orlxca73h24sewyt6vo0gybm4zv0tfqy7ffld77z3oaepdketfvu4ak1itw9968iiqv3kaecnf3ck3ycxle75bh0mhtd2orygfzcl3zkpe0tgp1robklod17',
                errorCode: 'qjavxtzjpi6p0hmq242c9tjb9gsrq5p1p6myu7ry1pmwqxz1fb',
                errorLabel: 925259,
                node: 5864901473,
                protocol: 'wzlnr2kn3skjzmbmmdjk',
                qualityOfService: 'wfcgcdtfa53b3laom57e',
                receiverParty: 'vmfu1iezw5rr4kp1k36w9dh34h6b5cf4b78paggiko3zy1uajhh4e2vxb9l5z8wxjndralglyz59s6yuvh0cfg1kvqkptwlqoojif1st7gpidgq49qp9mlihm95w5yhssm2tlelr0r5cs9cz1koanfyylvg5utm0',
                receiverComponent: 'nqx3ofn75z20x21e3jo6b0kcw7yw1f61bb7ko4ltw1spanc80w8mn7lihmfnpg86zemn6vclt8t8bdiyjvil9pyto5q6490eyvuybw8xk1f7qh0ghf1judmko0d7g2t41bxv80an27u0vxkm5r9j62gremld53lu',
                receiverInterface: '7k7c3ko5rr5vc3lrhhfqekfyu9mn8bbb6kh23924yhliqc2jxzquk2q06qbch99fu8bk9gae4xt9l8z32w1fkvsy9yk4387k3aycsxwkshi1svzsfiyd4ro0rnbdottjeq79a2gqwqlwdd7nu4z3b7bvzqvkiy8g',
                receiverInterfaceNamespace: '05wfzyh8slqqjk7bx7kxxfh8p5u7b3tawvmwgtwieigevqulhkptt7reno0edg4f8koi7pngjppof77057r3id35k6c71m50orffondszoubkd7i5rlosdgbq69ivavlpeidfwpf9p85cb9i9297tk4aiel7zqge',
                retries: 8269513502,
                size: 2564655263,
                timesFailed: 8327961536,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'elzui4myctz42nn3laksikkpe81i8lpx5thcccltyirchvo4mp',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'lco3c2lnmhnsjok3x11d',
                scenario: 'a8iym1j908o7kn4o34pqvah3if5s3h9gx3gxavcelp9hxtl0u8435mc4ws0s',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:28:28',
                executionMonitoringStartAt: '2020-07-29 11:48:04',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'kblyhqov8ig2teh6rez8424euejhwvg2sipitznz',
                flowParty: 'tx1b2u4yf30w9rw1ctdg58mjldydbejlactb9i0rvk6nxnvukpao5g2lul2bhnkztxr9gnj64gnhvh5k1fkay1ei5gj4egzw5tsboyhrn0xew8ertfir1f002wxse9gwfkzot3qq4cqozzo5a8t31p97737fc8zf',
                flowComponent: 'v8mh3tze6qosafcxy9dg65tyheuk60be854ztxxfx08d4i9f35tppis5rkw7wpwe41sdfbfcji03iz5agc46kvq191f2hkse8za8a14olv76eva7f3n455mdockekbrmudsf18f4y1eps4xzh665n3ehutx89mq6',
                flowInterfaceName: 'rsw6ql1dtf0vk31tg8mowq3xovekgvpuv8ub1px4hkhciy9k4welb3u3hece29erfx869j5h3ydgyirc4l1s3e1w969qogovnjbo1a1poy492he68u43f5puxjwme4g9ytrpiaprxhjbxvx9ohbjvjdv6j1mom7n',
                flowInterfaceNamespace: 'zezsum86v4rjh2fg3xx13du34fgg02qm4r0rnuv3tvd39bvcmfbche5ntmp8x57tj9picq3le3sr9c1eyimtqrcwzdc0urkw9ethzazq4xsjm0t2d3sqdnaie3gghdiaq3rgzdlojoo4lh5lhcwk1mnc6l6bqebf',
                status: 'HOLDING',
                detail: 'Odit dicta sit est. Inventore et dolores. Dolorem qui doloremque quam facilis dolorem id ab natus. Est unde et dicta sit. Autem et nisi tempora possimus minima.',
                example: 'zpogs36gh0ghb6xqii6yulravw8zgweq4ikocoexit0ystml7svwfogtl0zklwfeowmquhl8bifpm6gr9n4yapq1l8r8lr9cqb9guv6d3ji2oq71nlyr2csvo2u54m3lc9rfinchpxkwpu2ojn8cninz69w8yl69',
                startTimeAt: '2020-07-28 16:35:29',
                direction: 'OUTBOUND',
                errorCategory: '6q3km7h71mipzjip56k8404h0amqw33htfwovc24ryeng7jspciudc8m9yd2zncnvvgk1ip4fkflzgyyxrzh91gnm669npgqqrg3hcghet570957jo5zrepsw6h34h22qsvoxh3yz5r8l2ic1m1hxgxeqwe5zm5g',
                errorCode: '2cbi34f1aqshgio7dpt6wsc1d0wijv11ssq1n6gxwaq5h7olmq',
                errorLabel: 318398,
                node: 6405779378,
                protocol: 'fb0j2ezdzpj4wlt4rb4x',
                qualityOfService: 'topysfgvi3d986u9dlhu',
                receiverParty: 'riaihw2kb3sn4hmtfx54m7ioe5xw98iaywgbn2a4s6aznb6fz5wxjrfqz18j09ocktwrvje1317kl56si2pkq21m9wk223vibwsu952n8niiuntrama4m5ousjxhd35c9ks1dobwjb2kxkpn2f55u1jeudowx4ef',
                receiverComponent: 'fk29ky9dgirbss0bgu5cadtu7we44qwcvoev24veepzayh7bvzh283ov7w12mcy9xjsn6q6xg0g7mt8b9fcfg8ovfbzstsdwf2wpx5k13iw0lywkqypzvc1jt3kfkvrwozawaq2gyg201k8hrbr0g7w40sconfqj',
                receiverInterface: 'lo4vi3g87ndnlf5hosj7vmb6gmjtp89bqd7duj8ou74zeiongti3jz0qkys285mmx5gda9v7olz2v8xb411huxh9lpj3hhj6g5d3eueerlmcgn4arjw8er0notbrj1faim267nsyu8kpiyov090a8vq47if12fxl',
                receiverInterfaceNamespace: 'aeyaognk0dtm2u8hx3v9rb1bn3pi5lbup451glrm9b7xyrpl371fmip740t4y9cohikxbg3dib0sqy5ui0ylapggnbd2ihqg2nh3myu02zr9bradwjyuy3j3hfuzz1c0gzsiy1tuwnvnrifdx5q1m3ccsla6jsk4',
                retries: 5430897552,
                size: 7119849633,
                timesFailed: 3486705576,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '3eiesyz6bgbupxvr0ockozb9jx6fy320hshz9csojr1yywt5mu',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'w38hzabc5mzxni2vdio0',
                scenario: 'kde3gnsm9o4luozxvtewshd8eciuaqz3nrjxj4u6pyueyyaoowkqq5yyyvn1',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:49:22',
                executionMonitoringStartAt: '2020-07-28 19:41:39',
                executionMonitoringEndAt: '2020-07-29 00:44:22',
                flowHash: 'p8mugt6qscezjtrth2v67f33x17wi6s5bx8vuinf',
                flowParty: '294fjazsf8455lvl85dw24ox666acs4l2l21oaztn7r9rhi1dncw6jnxg0jhzmo4gv6v1602gu7s3fz6m1jp585z259wm2iobaewxube3y4ej9ztt4urw5pveax2vje32822xa67p29j4rltseg34rryfei1ghze',
                flowComponent: '5pufpm8hhigxu03fsakgk3srgkblhbulc2whbots0djkzxylqbpn05fqc6f4ude0bchul3cz63zswienb0xkm10qumzzvb7elyjaagt5jiz74tghemlo5mk0exbi8qnqljsxx0ihcmizh8bi58cwrc195zaaxccl',
                flowInterfaceName: 'tnoq06tzkp1xenma7pkzb2jb5s1bapap8zmk6026jkd22wbzfw90ozcoruj7i3uao361e05whby4zc54vxti35tms288nkwom7jpu1a3mv4r576trslcirk8zyu77rax7pnvkd74ps37u8v8o9zjtrjwqds69qk8',
                flowInterfaceNamespace: '0urn8smy87u1xot1bm5o0ab5qud2lczp5qfj3qvefz5m82py3kvrq9zk87sl4wevwlmboe5pnxi9cqj390ewj3mpfnoi93zhg52cmwwa3gldq1z7z8s8i8fdvi591n188vyc1br3e293bq2o08j5dw5bmsdcj1pe',
                status: 'SUCCESS',
                detail: 'Deleniti expedita in. Hic sunt alias eum molestias autem id quam blanditiis. Qui expedita ea perspiciatis in eveniet ducimus non qui.',
                example: '0ou8ayqe6c4bk9acamfeb0unmcquxye3p2majspb5wurieuig2u76jblldrarsxfhtqqjq6amhv6o3daf70hvcp7fqq3yfzix6znk3k62puftqjztksdzr0ll6zrhcboo017w0v58g6v57ajo3vyy8pgc64mzxqs',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: '3rp3b96r9p0zdp39xp0aiwr89jznw8j47j6zrytle8j3mumtg0slirlm4cqejbtw2zn75btes4e0xow48n9whqipbnuzy1xq60lxq3mcmhf3uff4o8vyr2b0cvnpknxrrt2oyfbla9pdxnypmq0n1c3mppmvuwdv',
                errorCode: '15dybupbq89c0oviyd0szoqza2p61nyvkrgoxbimc53sda11ya',
                errorLabel: 598859,
                node: 8240655650,
                protocol: '1emdvws8dqn5x92z8q2x',
                qualityOfService: 'w15lbwc7u8t35t8pn2p0',
                receiverParty: '200w7yjl7ftsjjfzhm2wc7ucx8nlljc9eyzet69kejtjrf9945qrrskabcjqbqfv11vehci00oqn8anlawl8lusc2wncm7axcpbgbkiina15uqvj5rqlmiaas56w3njwj06l9y2bb3q28w2tfmmggcn6z7lysl79',
                receiverComponent: 'dl6dv11qduez0bvlinwh5y04hhcttwuxz3mtsabzt9oz5q5wsb8lye1skvrhok9k504hv1ewtmumibtt6grbltjulbpcw9vkcta2qgrenfi09ey6ibngkgumy22drp02if1cuappg5bjrbo2sasu1kc5pvcyjhm9',
                receiverInterface: '1f8krr9hiav1aaetvdoe91ohx2nl36e6fkca4m5pd32eqhdslwnw81w9zodflrd8s7bln2duncgmlx8qk0aqs0zmva74j6odza4cxx2soxyrxdy1hasdbgloxrhs196qtk6u1p6svj0sa56ej3k9b39ydjhlgapj',
                receiverInterfaceNamespace: '70kvjg7ylpx4qedaj0havbderleq4kidbqur5odz7cta94dtske5zhprvp8v00q33eiab5lrspey4odgewck8r4n41lr8zoqducxay7qd3iywnw7fr59etzbtnkls4yswc5bc6fdavi4nr5lj6moyhdebr2wetw5',
                retries: 7441627465,
                size: 6518327366,
                timesFailed: 1188470439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: 'mlewxfn1xe3n3f3gkfs54b1x86ym1mqsjlqrshunhr43402xu4',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: 'yk231g0tpocu52bb7myv',
                scenario: 'pwjkun8anvaf25zefw09h5popzsaxasq1yfkddnjawwsq73yfc01yzg8cc1n',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:10:02',
                executionMonitoringStartAt: '2020-07-28 18:39:03',
                executionMonitoringEndAt: '2020-07-29 01:13:53',
                flowHash: 'wjp6rnsqqvz3ff2xf4dgotxt8iw0rsho1cvva476',
                flowParty: '5sw7bf9wxfla7axhdydeussgnz5t63aktqr0mb4efomfscne6crz0y1wp136hmbf1u7x80iqwtnkhz2pkihq0phwu8diqm1ixt32gynexew7hxj9k9j6qylqfbb1hre7xdrl9k7emj2rgxmg2uwuqch7yeibhk0h',
                flowComponent: 'xu6g6y39ufz0jmyz7f7lk2gul69l5j4dstfjcqd7r59o3q8nes9narz5h2jcohrajo69mzch6qfvijcm23y41a51e0wvaqaevwoz7d1hqtdk6cd2emgkr29lyeo8ksrjp5og568cpiue8slmojsi4n9rzajk2a13',
                flowInterfaceName: 'jjm3kz4podv109ra6ild5qca456a08cph8x92lp4t6p8zmfsr39mhyg6qo5wfqhrm6a1z8t9cd38536vxm0lwo05k37g1vg6iuyqp9csb8f7inzk420bqb0avutlx97ek26n997l0na2py7yozxs1s84fx6geh6o',
                flowInterfaceNamespace: 'mej5uihg9oxwi925ndyxsodpu37xkmbhiuocmmfa8fx6jkt88uivxd9j4h1v0wo4kao01l7yuaicc55k8e3r26hyg182ljlzy65c4eao0d0j4b9guvhhzx2plwk6d0u54itflb1u0tfllk29eunom1qhdjlfszek',
                status: 'CANCELLED',
                detail: 'Doloribus doloremque voluptas et quia. Aliquid non rerum. Est eum aut quam ut. Nemo qui ad.',
                example: 'sk0nh18v701gr0cm6bf548n9kf68qxmt0ta3cevfqadcxppmlgns6cq7ceom5b2266a6nvqmrz8vum2rlri3sx9mv7jyk1kekmplegff1tduiiltbgw2xkvamxkq4f8w0xvi6s854qzjuahykmpm9ehsqfrdffp1',
                startTimeAt: '2020-07-29 08:41:11',
                direction: 'OUTBOUND',
                errorCategory: 'w7uwc5213kg9lthasce1oh5xrqcfjffgrauazimc7quh5vtuoygxjubuwnjzl53o16sbqrcq09fhk4htwsnh2ir7ll7c1wzyxidful0lqwb5qzo2svfacnn8qvvmymi5h63sxtgdiv5vv8s9q91daq6o7w479fd5',
                errorCode: 'zl0j4w8qvtuam016y926ii2925csbfwlno5kizcbupwoydrvnq',
                errorLabel: 500183,
                node: 4172450440,
                protocol: 'rue8l4upfcx58gba9ck2',
                qualityOfService: 'i1mfebw85oehnsswpbcl',
                receiverParty: '4mt1ykk19cxedvna5vu6lyg4ferzi9lr23iv4zdhytpf47208oxjt3umwpwwyfxz4o3n6xnzibrjn9vuqyrp9ten7wj5o238s5vwl1boh56z87m1ssc3dk4s5eawr9tuaxjgxi5fbqcqe6l5w1v1bc1dgrdvorvz',
                receiverComponent: 'gvmy1a5en76jsppu394x8z9qgof2wpxeyp0kwm3v7m96hn2cc7dpopk75ecjcx911csm4ltdiaseo920ft40yxwwijd4ij2d7bou68qd0rqyigzrtrnvu5nha443641ivbgzbkpi8naz5i7w0mksahu1jxaovl1v',
                receiverInterface: 'phri777w5lxbtxn3czrziv3luu3pr802v80o20kv5upd4fwubq3svhmeuc4np2kbnrlhbdbngts3qjl4lu61u8mi3e970yn4s2rs53q8uix5isj5v7nubu7m6z1c6ksyrasj0ccwiukcp316jrz7e5hkpq5lrlaj',
                receiverInterfaceNamespace: 'g4g1e48hbt5yuok2gc4clydir4o4akioredfknfc7hy5i2c8curqgyevcdcl7624aaerqgmpelnbyyxjl5iwjgzlwru8u0uv5yroo8f3vaxgeu8wzrwjye7fmdntgkcp1u1h9797tech41y3cf2erpy7amot2vzk',
                retries: 7444357574,
                size: 4000713524,
                timesFailed: 4213610115,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
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
                        value   : 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/a27ac773-ed3b-4f9f-8dff-685c65f983ec')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '33fa82ba-c572-43da-a56e-8a38728c7b33',
                tenantId: '00cc3536-29ec-4210-8ea0-304fbe87917d',
                tenantCode: '9t1tz75s0a2jcc9r931py8ln7ty5uqk2xr3tbj9c0oxwi0z6xc',
                systemId: 'c398a945-b73f-45ac-8b24-10609608c30a',
                systemName: 'gg5ypkv3dkadf7otnqcd',
                scenario: '5x29n151hbajehin8j4t0xx5hj44wg2ennk6skn108aqbluxwcsltuaxb3sf',
                executionId: '36e3b870-79b1-44b8-b955-1c1a87261a38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:02:11',
                executionMonitoringStartAt: '2020-07-29 11:53:27',
                executionMonitoringEndAt: '2020-07-28 20:36:03',
                flowHash: '373j9h90rc9jjtatfm85vdk59w2wdd2h9yjkkv80',
                flowParty: '0trk6ovvd61n1kpom23phodgim3ydwa2d8b4bzu5rcymnc2en2555xyseh77xnj0zfg3uthn882pjz33ngf58bpr4l5qgus708fgoyg100hoedemux8xcwd13bq7nai6fyk2my8oygzjdnwy3etz6lxk9p5fumff',
                flowComponent: 'ju0i9pauosbgk45awedpy1zr072u3tjf2z40ghh0fyfpmufywc5eibwv4zh35hv10n1rgl928rk1tfyi9reki67nr7vh4lwrphm4ij98dbgfid65vacceu14nq82eafnoc75j81xhuq8bi0wkq8iptsx1liqbg3w',
                flowInterfaceName: 'cqomcede6qse7v009m4flza589rw7w8hzgwrclwnln88t0aq9ijhy8fkqf1hm8hpof1788esjcf8alz6s0w2xaxxxtq05z95hmd8oc0yn0v68mlrj506xjlt3q6264egb9q3n3c8r8dvargxtvjszl2a5hexfk98',
                flowInterfaceNamespace: '5qagloxr402rivxt480ujeqlo9j3x6f1km5m79f0j1z5y6fxwsk4s7ko9v6sodujjc7zzqmjmb5gvmo53qks8aet05p18o47ee1sqxlosxvekj2lm7qzht3dvudywff764os64l0n9hipvrs4jksmcc2lq30edhf',
                status: 'SUCCESS',
                detail: 'Pariatur molestiae soluta enim sit aspernatur. Neque occaecati et. Sed hic libero consequatur modi. Iste nesciunt nemo. Ut possimus consectetur quia ullam mollitia quas aut.',
                example: '48x89o1glsu4mvm13eui30hkhrikvz89bv87ssv1pr87wg8oeqd1d7pfht7okckx1k63v3tvazddxsapis381yzveimt33tlbfx4fzj9wxcrc7lyc6n52ael65mtot3a2kqw9xlcxa2lt94uck0t6xayy57e3yqt',
                startTimeAt: '2020-07-29 04:18:08',
                direction: 'OUTBOUND',
                errorCategory: 'fxnv4w0owws2n1qmdq0yy3y8ukb54lwybjvcut2k3hnc7yp9k2x6seyhqoh09alar80qkh8rsz9rkhrrgpfd1hq4u4vrgzpy8fhtp1bfgvkmm4s2thkgd2fqat5qo99r7s9rto6ncjl47foaig15t8vq21av6x8d',
                errorCode: '6oan0rjo03yklgf6p8l71poc8xfzp5d73tkw5p7h7xg1k7kdsh',
                errorLabel: 347977,
                node: 7239499474,
                protocol: 'uymy36tbkcekjam5x4rr',
                qualityOfService: 'e8wbada7bufnyt61kmdv',
                receiverParty: '8cnxn4mwqhbwip5kpibsk9lv0kbrdblud9a2e3j5aaewbdw7b4nja0l0ajjiaddmvhfe7qsdsqenkq2ygw4yd4fp97pnspnwqgarmm069dshed9ox8ayjfal72pwj8v7g2gykf7lfqs9diwshtpyxt2zgqujnfah',
                receiverComponent: 'ewps7tctxa2bddy06ykvy0icmb89ghlydxk2w608gel1k5blwknf7odwhos2gnhfgp7p5a0zutpy2ghjj1t2esegkti5vh2rmr4ciwc1bdzptq1y4tjlo1r4kmlk647lem1e40a54sf545tqg78qjc2iq6huq3wl',
                receiverInterface: 'afpeuj9h7irvivg422p91pphg0hmkpme7avpatqtlyyep9wqp5woseau3nfvd4qiivlen0mhenrwkti6i1bbr9d3v6qo9043l31a38cmrn699u8bdg4cgcqto7a8771y2td1pz9vnapfcqddgylyewpzx1jcl33m',
                receiverInterfaceNamespace: 'be7hqukx59tytxw3qkjy6dug2qvukwrz74l2ettrbo69zgwxe21eeb1vezz0v5xqu2oyrnlhwwxtqbeav5fu9zk16ezj8pj4ud3pu3s5yy638gd1cgfpoii8fr7rvllb0yb2aag9t164dueki8xj28edwydfcsy1',
                retries: 8094690941,
                size: 6541284925,
                timesFailed: 7560802268,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                tenantCode: '8narwansz74l12w3kw4fw7c9a9bxuzeniitrspf0s69uxn5od4',
                systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                systemName: '1qdjrg2xcmdaxfxlqxf9',
                scenario: '86wod8e05s883w7xs8g6666cpda3266gt394i61c4ftrwlv8ffljhlth6yjp',
                executionId: 'ff016f67-887c-4146-bd38-356134465749',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:42:29',
                executionMonitoringStartAt: '2020-07-28 20:01:37',
                executionMonitoringEndAt: '2020-07-29 04:02:03',
                flowHash: 'lvqrvz7jyv0v5lnp7f8p5vnr84k4ntioszgjeg3p',
                flowParty: '75gwa5jhjrmcz8uws2jjo6xkpw27jwye5hz1td13h1jyef785d3a2fxd9qig5zfwllogn7d7r0wzlzmxjpll93gx1unfosatorr7nl3vg17enw4ruvgek92jouzcqnvrbfsfatfztpajn5kqh7yhet2jod7kr30l',
                flowComponent: '0424ghb580q83vcinpghdhsnenzyzi5hr6piz2v1xu6l4zb2b1da6y395tq09slb52637cz6dhqgmlr1gr8cfxx76aw0lk6958mdt3nu7232a5du7bzg1ipq5xdlvj2in21rrqzdljxxsm830vzf75doub5pyzme',
                flowInterfaceName: 'nbca4kpvpv7mcidxwzvh2h9ezc2xw1f3ld6fn4n4a85j0l37hh7ypfv382at2pzqalya87k8w14rb6cs5s9t7h689fkpmyzvtg0rl9coxd3097xxqzaawk12c0hhva153luueuf1ou11n5d8vfv6i8ky1oefsmd8',
                flowInterfaceNamespace: 'lbowa5f0imbltjboabxnaujqb6jkcdxot8m3w3j5jd2yxyg2381hppz9iqr957dzlftbosylg9nlf00apzznp5mux3a2i1ha9p15g4hbily59iijsfbddkhc9n7qbmp8cglohqgyn0hrrtnf71y5pvuypktmdmrn',
                status: 'DELIVERING',
                detail: 'Eveniet rerum incidunt consectetur consequatur cumque tenetur ratione. Sunt molestiae optio odit nihil aliquid ut omnis. Et neque totam laborum dolor. Soluta est aspernatur voluptas voluptates numquam soluta.',
                example: 'mq1imi1kdhalx6mic9qjiyeghbe8trrf6uz645g4lzp3myudk5tc999iv84zmg3ngi2rp7zbxgwqntg68yrbo4lqk1ps9sf33ey7zql30tnuchzqfwwqgz507qar83l3rni0wyub0ttsa5aapec3wa9afe4e77zi',
                startTimeAt: '2020-07-29 00:50:46',
                direction: 'INBOUND',
                errorCategory: 'ih0z3pxuyetuashtj57l18q8ewd3w507ls5jr3do7quptg0l2cagg9b1wid5llss15ch23noklmeu5isfgg8y63rr17uakorl1jdiv5kjzy42eyzvch30w9lerjra1160obzumv3pzxq0nyk9bhkj7cqwr8pf3qh',
                errorCode: 'a6a392veh24xqtifmp1dqall10j4ow9ny092zqnhioatuxmn4r',
                errorLabel: 108718,
                node: 9055487487,
                protocol: 'jl1v26tpfx9x6yaixbgs',
                qualityOfService: 'p411j6pyt5cshvqah3ka',
                receiverParty: 'wmvp4ck1gdz2k9b11zdmdn5d1577frn8y57ktxvix128duxqfa281gciwdgmb1e0yhqcw8jblm69sxmammms26w8bkhc40iogmv85iejus1hg8kfo4hpwaxsetbtezkl0t6wyn1fq1jgbz7nqnwmczqklud3h0xs',
                receiverComponent: 'c6iyj0i5cja6f8v985ygibgkutssfbk4kgq8o84di5x5kuodtq3jiheu4lbyauadycyrortowpfj8kxz0iefh4nm9j21uehu3o4ysijlz1pqpt7297c9l4a5w3p0eh1jbr45ba2hionk2teg5pkelce8rqxqcfci',
                receiverInterface: 'dvxfy67ots741nbz90cu65dhdns5wccxu45512ao9ro5nqfmlwx3jk9hci2oit36udn79bkillreka3idrt8xmf1z5csf2owi1caldwaq4lh0013s1ts8e8j5svuwku0e1aqu7kbnk5k6lh52zqh4mcyquofzti1',
                receiverInterfaceNamespace: '46di5jw4vq3g9cpvbd9nkj0900cs1bo2vakjwrq3lyjsx9kuj4ltuc0gc5iri2h3wxkna5wl7hk735vg3oxtvvd7n290f72w3up0t5jvfjn9m44m45vedzo0r65x3qimlo3tuwla4680cyq81s22gbafxk4o6dad',
                retries: 2382161349,
                size: 1488663947,
                timesFailed: 6413366949,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/a27ac773-ed3b-4f9f-8dff-685c65f983ec')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                        id: 'ee11d822-8be2-4cb7-8b38-15f5bba5af60',
                        tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                        tenantCode: 'c5803uhocky8oia5xr0svvjad6zvtf6z0zi06yfm4oaks9jim5',
                        systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                        systemName: 'bus38xrzd2vwggshdne1',
                        scenario: '3i5ohdb4y8hbagbzims0b7ogr18srmq0s6rw1rylr2x0ry09nr12g13nx72z',
                        executionId: 'ff016f67-887c-4146-bd38-356134465749',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:28:31',
                        executionMonitoringStartAt: '2020-07-29 01:41:40',
                        executionMonitoringEndAt: '2020-07-28 18:49:15',
                        flowHash: 'bl8zflb58mjldlccyk1ercs7gi5uza3ybvsb5iod',
                        flowParty: 'p4obfkghliyuvklgcdkskuuesfxu49oinshhi6ppg5rixql0y4gv03dmlixpcdar4k0vmgxs450g9m82c47q6dohlzt0wyx1uzayuk6723hi9eacwn6qz22gw47dkfpi49lyfe0hzoy52leh1lbv1zxxl8j5udj0',
                        flowComponent: 'b6olsv1poeqnx51ckfa02i5ut7y7ttbohiyp5j248ui6ny4skbfqjq9aa5yro620i6j7hb8atf8n1di001tunbiwlb2sfdealdlkhs5ladqbt4te21uv85vw20qrfvlc2qfhiatxn81mghsn1x2h7s0kxdkrc1rf',
                        flowInterfaceName: '6dacd15a18mfgv3133qpzbw5funzmk0b4ys4imt4bsk04w0e1hsh8t6v8o7n5c9jpi3aa3zxhck0b3pvijjbnunh81mcaropygckq2qkiu2t2x1w9w0iox9o1rttacatljg89eona0umtnekrk64or9kmif7wq8u',
                        flowInterfaceNamespace: 'ec2zx17mixkx75l21qo9h6nzd64g5sopkslatz0iyvjheghsv11tcru07gg9fr11h8833z5lxp69mn28dn8npaeok38lm0sku7ejfm7nq71y5b6egzrhts8pk6t43fk8hmz463ksru4h14yp6vuxoubwytagira9',
                        status: 'SUCCESS',
                        detail: 'Consequuntur voluptatem ratione tenetur inventore non cum non. Repudiandae a perferendis veritatis aut. Voluptas similique minima culpa non expedita. Eligendi molestias fugit saepe sit pariatur. Nesciunt consequatur perspiciatis. Maiores ut soluta deleniti cum vero placeat rerum.',
                        example: '00y2lxgjalkm373bda5x3zn065j7nvb7kmmycmjmbsft2kblphchx5olvdnzgtv8hjy6upqmggjp7oknj0uh364xtjddwgwqknm5d8mj70piy5ix8ijatyv9ff5em2lm6mo6ijcz07ihstoaa3tpsmpe9nf3owzs',
                        startTimeAt: '2020-07-28 16:43:38',
                        direction: 'OUTBOUND',
                        errorCategory: 'jcvyy3a1k0n3imizrcktz54f381uraf4aloievdj0om7j21bv8nsprjjautphcqkd0o7pcink4ccai7s97rmhp6x7a2kjz4b2mzrzw9msxcd4whbr6quty5li5qbcdoxgj4sn76w8c2wsdo8vewtoe6tdk6mefki',
                        errorCode: 'kg1zydsagzayk3vnkoyd3jdy12p9h04jh6qflmc6lfkd4plwnp',
                        errorLabel: 733303,
                        node: 6172963352,
                        protocol: 'tf2v1r81iun4vcftk1v7',
                        qualityOfService: 'gf6jduovw3u6h90f3gw3',
                        receiverParty: '0tuvmaaes8eb0urwfp8aivc7kdgx1di0j8bbrnfvg2z22zwhq6npkju7g60a5gocy0qzxgfa7fi7dw1syhjyhvpdnpqogef765mooe8m002ut84v7wo4ig155lyvpcn0whxry2mp12eo12ntra4i9nkiwjehp3mh',
                        receiverComponent: 'ir5hyrlx2nkwbdogmyvgx52uiov7hdbcof4wl0fnrspjla0zzxrgoslp0k9jdgu6dj51d912lpv8i1p3ho5w1a09ixijm7x0c55y289kc1wfplenfe5dn03a1am0ewibtx8nxyjenweukdem1282bcqvq4nu7cgr',
                        receiverInterface: 'b4xkjx47fu3hkz359a2uc3yr6e163p2ulbjvlxyne2u0s4ey7dy4l59xyuawzqa47gyyym79wo923zaggvu7fstx6roycc9whj5638u0m3r8y1lrhseautga0t0hex6r9gyhcmdrroaocs8zgdribmxhiwzfefw7',
                        receiverInterfaceNamespace: 'trdqyz1ldnrzyplu5qb6sh700mf0dob88jkp4yhlnqfzuvngo4rn0i17oiosa7hqw2sxuv5ztamch27ikywz8sodnu2cfzq4a8233jxrkc525mpp6uauv3yfraa9qb2duqocfaddrlyw3sthvy627q9s63zgxgii',
                        retries: 4048739790,
                        size: 6414500637,
                        timesFailed: 6123471292,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'ee11d822-8be2-4cb7-8b38-15f5bba5af60');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
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

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                            value   : 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('a27ac773-ed3b-4f9f-8dff-685c65f983ec');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                    id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('a27ac773-ed3b-4f9f-8dff-685c65f983ec');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                        
                        id: '1f0aa59c-8ec3-4b53-858d-c8add5a4bb54',
                        tenantId: 'b25739ba-1435-442f-abf3-5d529f54be61',
                        tenantCode: 'kgx0t8lccxexja2y78m171k58in9eksifw8w3v0s6lt3xwxjza',
                        systemId: '2b2b5ea2-f291-47ee-8dcf-a183ab92decc',
                        systemName: 'r9go92t7zquvt92ffc27',
                        scenario: 'yogg1tu3fkqat1b4v030nd8xnivix98yu96olyvwckvqnjkevl59d5cnhu7k',
                        executionId: '6ffe2491-143e-4592-9c21-ca29e7435cb1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 00:47:30',
                        executionMonitoringStartAt: '2020-07-29 15:38:56',
                        executionMonitoringEndAt: '2020-07-29 02:40:31',
                        flowHash: 'jkvnx2au2uej29ankwawxv07lo9e3ekzomzgkwow',
                        flowParty: 'lsu4uokpmkur3nbhrw7tyjkn4dzpcqot62lf97ao1v50sf2od8tu6vajk4hlud2q5u2bx5i18tkwwgpziv4erd4643cvq3sfrmu9muinl8uxsquis6dzonwsdt0rfi1o8w8higr0y74b36rzqilouu9xd9do4n7t',
                        flowComponent: '4xdb37ou8ef48r3msx6q38ct03zs05s3t9levrmkivu27kfego24t7tzb70s61agcaojkmy4mbuydzwtkhjq26wp2f9j6k81adsi42xhqvipf1p2qbtmlq6eqfcp0g4vqyf8dqpguumdeoosgz6buaftc2509fu1',
                        flowInterfaceName: 'hb8ft305um9ihg49lp7pscrmgxx3tjmv7myitx1dxkpo59s6nyvw6kl4dcgi09dn3k54j5mnjyj82ioxkfx1bhhzc2dzej4ckjihp7sb2lxy8458dl5p166jpoeujstnt1ezzkige015ugmvdzvu2b6zu0bm1gmd',
                        flowInterfaceNamespace: 'bf8utrf6kjq3oft7iabx0bh4k8ivukhg8yombs7kmg164hbb46lio9vdzqjrz46vkukqhbkfvo1p8kr9pclgd7mhqtv6lujkibhuhieecpl74xe6v3jsjzpj0grl5nk1p7g0dcazul2n7f0x4q6emjhctcalfi1x',
                        status: 'ERROR',
                        detail: 'Consequatur tempore officiis animi magni. Voluptates perspiciatis voluptatem. Quis laboriosam incidunt voluptatum autem id magnam autem.',
                        example: 'k7v2i3oldem7wly7mxwsitbkse3eu3kbcwj6qi6emyw3nn4xjohmpfgh6dj5bbuqvl43i8yyxyql1ir9fbkuzzavasod243j2w4m32rrfi1zyo9azhzmgkovk2t5c8djibp0y167njw8r629q74z5mffhxxpwjzy',
                        startTimeAt: '2020-07-29 08:34:49',
                        direction: 'INBOUND',
                        errorCategory: 'jjsfv98fnyzmzj5b5b4jctfwzqi14ktqyhlgw258k4xky2pia5ztw16aw4qnw1u8bngm5aulk1ccrecfupf2rtoays6di1u1tgx0s6rhjp04hng3tokf9xiw3xugckrjwjcs257n7q6uhdeoivyldh45qre7x9a4',
                        errorCode: '5btlo00wpr8n5qxgyg2g7fjfaxbomoen78h4ze2m7mj2q3keqt',
                        errorLabel: 127280,
                        node: 3156783568,
                        protocol: 't1xs1y416o39o097f8fe',
                        qualityOfService: 'hu9i23cawn3a55cletj1',
                        receiverParty: 'umsfhcpfj83mm23r7wnurf9x3pqerfr2ixhmnaib5p96gnbwahxke0xy63ezdut8qbw1goae4xc71i98y08y710l6dbezdmck8ore1r2k12hgt7zp0p4dfuyukugicu4xz8sxvhnam3t4csqu7zwmlnawp9jl5ab',
                        receiverComponent: 'tv1brfr8xn4vsbbzc6w4dpds7nc4gcp7xv496qre1ymhxza1j0ukktpilzevus3avj2ekx3iu1yj42n8pfq2wh69fvihvd95xw9f7o7u1z6zh8snjmk6i1961esl4n8q2h72zlljy6xw9k7ntsxskiqiw0juc28a',
                        receiverInterface: 'y0nrb1hcfguwtgupz0mps250njwbgiievmeoy4k3ep5h9efmhjm1v7k2yzoj46f3ac6eu27l7sixebiv40adwhgrui3hfpnmzubcrkzlsrz4b008h4d1917b1rw3ln8m5i7gafk9rxfyl0pri9x457nocliio2qb',
                        receiverInterfaceNamespace: 'qdx40zavq1w2ff2w0vsvavzlc4su46ixcewnhroxfymsvnou7siw44mtjuy496eeklf9rc1a0z1z73qdgddbjuez5ru2t1j742733dcef1srui375bskq3ar6wyaluj89ftzxycifdtsjykifg4eyfrs5nfz1aui',
                        retries: 3534176233,
                        size: 3899534628,
                        timesFailed: 6406132296,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                        
                        id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec',
                        tenantId: '3af88c70-a54c-4562-990d-44ab464f5c5d',
                        tenantCode: '7r7b8960ad6rc49p347vz1sc575x8dvo5lxmz1t20uowvx6kpp',
                        systemId: '0080f5b7-8930-47f7-8197-62402c76fdea',
                        systemName: 'rt4rvuy3h45x4ln71992',
                        scenario: 'fo4qo6uq8od2hi19d90apr8c5dijcqzk0xo2gahhrr3xngp5ibbb3hjewkej',
                        executionId: 'ff016f67-887c-4146-bd38-356134465749',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 04:25:45',
                        executionMonitoringStartAt: '2020-07-29 05:49:27',
                        executionMonitoringEndAt: '2020-07-28 20:41:08',
                        flowHash: 'cx4oki0cdaa81fdx1n0qtjqpex990fyf253wf90i',
                        flowParty: '8nlznb72gugy5mr1hyc4bpe8sm39o73i2zmpwci6nnl4yhi43zh12vdmmhfzxp37pqx7otmd9sngmridv552qal0yjo2h2z6v35lcvw80deumv9li910eyntwxiqs4h7h7snic71amrlygyhypt7362ps8fg79gt',
                        flowComponent: '7ssdmczx8dori1s5tb8imu2w13eq9a99svk6oyai19c38l875dz0z6wwn7evcxi7gyosea2nd5kpcxp0ex18bhhtcb567a5jg4npb1f6o4k6f3xsg8vxejk3lciycvy45iiwnsv1wyvduil8sef4macnz5nr5k5n',
                        flowInterfaceName: 'x5uoxk3ubct98jf3n2t0ee7zclh3cmb85ytfs8f4zmfbw0d2d7rvl5oo6a9argc1qds3t40p2q35o974a73uwe1i1e6sag2iwp5dr8thsq4xsg2vb9jvbzfrv9zj8u2mtw5bick4trpu5fj4r96t2l1iymnrnsyh',
                        flowInterfaceNamespace: 'xooodez0nk4tutnu55arfw5jpw5eyuedt87eyu2927177hy0svptnrji0z3ekfci52zbt7rs1qyp6thz0h05nensm0qqa3wh4a6fz0fftfd3bt9h4qs2ww0sf80lqzezncayrabw6mm79uxl04m25o2l0c37ob0x',
                        status: 'HOLDING',
                        detail: 'Quibusdam fuga nam est reiciendis ab est. Est sint commodi sed non tenetur quo qui. Aliquam autem dolorem facere non.',
                        example: 'sjr7ry73avth5i469j6t6al1f5gi988pefizhf5bipuz05rbdxndahja3subzl0rynjejfu56vi3zrahnr37hej3yz2zeccxishbki31cuyxr3w12d6kk3q0scsa768dwsl1vxrzgb306bih1i837m4a9b6i7496',
                        startTimeAt: '2020-07-29 11:04:42',
                        direction: 'OUTBOUND',
                        errorCategory: 'ynrmpnirj8nnzgewpqx7nttpbbcpldsi0miojed0ytwzpibo5jcmmrggddo7srrd9f080qvwvfr6q1ir23gna3pvayz21hnognsh9f2p184d5cing1lj4subtd3f1tn40y9lofr96kw6mndqlemtl9aaplqddtzk',
                        errorCode: 'fhqr1clcw9n9pn5wvmo1yd0x8qs6958agvndteasp9eincrjb2',
                        errorLabel: 827850,
                        node: 1242502950,
                        protocol: 'gkn0lvhjjm2btgxc169z',
                        qualityOfService: '7za98nkj72qfsrmssqqs',
                        receiverParty: '44eu3xr53je94ojwrx5hynyrj96g9nfpr6vhzzx7l92aqy0yuj1da4a9x7t4mi0q4ukggz0r1fvk117px4x0ecmdp15fuybvumf2tqugjt7hkgeeyba3evvaoyluxzmrbcsk692yi0bu9mgsux97p36d3qv7ifku',
                        receiverComponent: 'ys2s0jfak6uxpw90y513niht5mnzcagarm5c922hut2k04vc9n6xce5yxldvxd0o0dcj6iyjruviubmcdilwrie1k1t1shk6yhjf7vd0sb94wsgwil1ojagbsw5coadp44vacevjggdlicsmvne2q42slm3xqmvm',
                        receiverInterface: 'do3dvq5wz7v975q9v23l2f6hk4fmdqllirfjlnuxwolpxitunfdex3xbjgocah62urf794pcep1u65vmmce5jq7mi8g10skt14gy41cj9apiwxwad7cmyqy2a0057s98zsep01yxvyx811y89m84asj5cd8itc2q',
                        receiverInterfaceNamespace: '7jty6y9lrsyeoa5jmtfz3mrm3331qiqc9ry8fnjsefd2tf3zsb4tsx54epmu4fb7pim2o7hq0bjw4mwe9tkrz30rd8c7llftp7vgqhzojk7gr79hl0oni5jxm6ybtrujbnrj4j8v8xwt7gdcf2rlh0282tvgtdqt',
                        retries: 4861992212,
                        size: 4519661251,
                        timesFailed: 4756912646,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('a27ac773-ed3b-4f9f-8dff-685c65f983ec');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
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
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
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
                    id: 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('a27ac773-ed3b-4f9f-8dff-685c65f983ec');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});