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
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 's6j6ywkfkgq625js2myjtbv143w3lihzr9y35vh0ov8cltuv26',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'zgw8bktg3qlnoyvwmqfe',
                scenario: '2akl6o3ldzll892jbt6ltbwg37jmusfk5m1nz5jb6cidvvjos8dzn1yoi8k4',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:06:41',
                executionMonitoringStartAt: '2020-07-27 03:33:06',
                executionMonitoringEndAt: '2020-07-27 03:16:44',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'p5mjb78x2cuo0kz3jlzxkcom0ft95gtxkqknxi06qbcax0xlomaio3ld588nylru0l8zbcrsz9ophnh0ideiv1yu0ze832bk5ontn6wzq6icru0xrq7wdpnjk97z0soa7qfqhsuxdy3uw95pjvg091z38n3795wp',
                flowComponent: '5bkfne8fx4exqe37o5h8wsqgdih2les9kkb9yslw51odt9x56qv6gxboefqsmg3o0tfpq6sf2lonuawx0wn06zypfuo72k920d6pw5q0xv4emsq5v7o8hiyi4rl1tlsunu8o2t984osrxa4ght00i1ojmodbnsye',
                flowInterfaceName: 'g9b3kvihxln7sudw36r1lyo7razlpctqpk4l2080rid7ba3m6tup1uvuvabxsx7xmnm3qyaha12pkx07eh9m84sq07surb19zfqt3149yipfkjzb2s543hfu6id07mrqv71klnn9v9i3h7no4te32xppfdhj3h5b',
                flowInterfaceNamespace: 'zpyo4dsnpiz722yjf4extwm37tmhitr52tqug9vnrirqrzznc4934odqxfvr3u8dwjgtvfg1kaktjrdg8uk2wktd8s24u66q1kd0hht0ohudr3pdvtijen5x2qtjocvpggrx7bs7725k9v0i1il0vt1f6g9kxj76',
                status: 'HOLDING',
                detail: 'Quia occaecati impedit. Dolorem non et eius labore quia dolor. Tempore et suscipit.',
                example: 'tjwsznyfh023mva0ozv6w6yg71tzijwi2ubx2kqkpvxjr7wpj9o9ab2x09vhtbhszcommi6pkxzn82wrtchcejacfe1kwgnehcq8i1qh7nabs1tkr50vn60n9qmh8sbixkj6hwptnj5f564tqkhfv1nhnl460p16',
                startTimeAt: '2020-07-27 00:20:50',
                direction: 'OUTBOUND',
                errorCategory: 'rtkhi29uo2q96ecvl1lrv3iu92r9ozvmaciji7gq7z8zw9i3zgdj8m6syljbt9ejc5p0khtfkvjohbsv5pp72xta6fuducgfva4fjehfp5i06zc96t5aipq18j3llyv289wnt3ov0c3dgcdlmd4muduqdz0fzw17',
                errorCode: '7e80sw3pen134ti49vnd',
                errorLabel: 422826,
                node: 7947071744,
                protocol: '0hd0ecaxklb6esqhb5mz',
                qualityOfService: '52hqfooh05t9it8ufgz2',
                receiverParty: 'vjoni9zupwly0ge0zzc0pabrdj42ftt526dq2ivg8pl656aco66eo2xq7zvvlmzco36g99szxe4txls3rpntj7ggd09m62k7nrdj8hejix9or92mc0g9sdutsm126j8psb0rnpyurw7zyt2a2jrb2a8cg2uy42zq',
                receiverComponent: 'z9cu4uw0x9m7zf2whuksmhpuptay4yck8oznwiacjpb5xhxognlci0fnrwzy3cbu8iib2dqfjzpsjwqgir80w07feplyc7pkjw9p907nu725c1p3qglpjou6zygshddyjj3wqeztd6kla9dq9bw9vx5xm7gb1wa3',
                receiverInterface: 'eoiljf69nahusd5xd0ig1zunaojn4fi57jjlejrg5pr7htw2w43tkwjhmvrbv54olu62pr98euhvojr99ctc6yf7p30a3wmw8lenxhudi3iylias3sen4mr4j95qafhym1ofptfsbzjyn4nbljl2izz6g819g53y',
                receiverInterfaceNamespace: '973llgquq6yuebnb3k4kg70i0gwl52jdh3xa6hjomx97huo11yipgzsr6i55gucypmfp9r12fc1i44d8isrodgqryk0ev62i83ymaxi4cuif6a1sdusgrvrtvl9dkiznvk08if6xoganc0ycr6wvvsu23dfdsb17',
                retries: 3612852270,
                size: 3831375104,
                timesFailed: 9793148982,
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
                
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'f82p02nei4yp1lgqfo6ojv8496om1018h1nrhng49n8x9bsijy',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'h8h6ssrecun1vqasjjiq',
                scenario: '3iws3i9qslcoe79lkegn0fkwbrmewhulcruw5aiuzohthvf3p4lizt6z2rab',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 17:49:00',
                executionMonitoringStartAt: '2020-07-27 02:31:02',
                executionMonitoringEndAt: '2020-07-26 18:05:43',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'my1l18tqwiqxcqohyij11nbut5duwlws3v8avg0u9z8iglnvwr05pcjxuzjbhbil33us18n6w5dj4dwkej2to5cb8ay7i1c9zr35zezuxqxwlh9okumo6u5gbrgjqjzvfbsv8kdaocwmvvp6io7m3isc0t5hlqv3',
                flowComponent: 'wu95t90gjobwv661thh60i3oew8qw1uphmau5okv8c4dl30p35xum5sglmgnjyej8c1f6w68wa7mljdgpr9ntroz6ls2qubxb9s9m4uirx74soz85vj5hghhq70kmcanxpeoga9xo913b8ouuxr1chlgjhcr4r74',
                flowInterfaceName: 'wj0xnsgvw61y8bs1mxp6tdfo7d5l2h8j9mqutwyzbp8y5noqkhdqbwat8dsm2adq8eazqbu3314ao6wv3y78zygntrurf0duno6bak8sjul1s5q8i9m4zx2lrhaa9dnci0ls1ole7xhxlnxsum5v6c7sflvqfis5',
                flowInterfaceNamespace: 'vrttwevz5h8kxabhw63t4p5z6wde2htgymve0blup0vt65niqklhuomhu91tdptx6y9tzsmvgq7ogukpc141s8h4qv996csj3ukrvjcj1icf55dw3ygzau1t2qqfqpstw90vydexspega6jq5fnzi71jjo42i5cf',
                status: 'HOLDING',
                detail: 'Enim enim eos animi similique ratione porro et. Quis tempora dignissimos harum id dolor exercitationem vero sunt. Labore vero aliquam in dignissimos ea.',
                example: '9najfkiismo2w4bxo2rcy1acun3ujzyi5srdg62t0d8yxabr6cmpevmi475ytmzsrco9ga3tja160rt7scgl80kx8av8h85i64mm12g3vhs0kpqt94duo5z4w682qqft62e9dcamoh3ga3ballzgvs7ffr0wvu8h',
                startTimeAt: '2020-07-27 09:05:38',
                direction: 'OUTBOUND',
                errorCategory: '592lqn3oo09nkvxrj8esnzhm0dne8bijz5nqpq0y9wqdwwvkqsfg0ak6xehr3pi8zknnd6mbbv2vq0oduzf7rtuy29eaqjy6rjjk40qkipweisyyh8vcr5yrpxeh24xjzn9uciojq4kj89y5u8r25zt0x1xxj1xp',
                errorCode: 'gppagut8b25e7wr077h6',
                errorLabel: 508022,
                node: 2504392618,
                protocol: 'gzmmlvllfptuieacrycz',
                qualityOfService: 'enoshc6selvvgyxxvcpr',
                receiverParty: 'mgzfxj16tmh9azwk6l9rpungfuozhl024wf6l6cv2safga4x6245d7bcead0nhmg9k8nr84f93fbqw3bxl0dpgoleu7fpls85926xpconrmt0sht8zjntg1x95r6bw081phdmny5ott4jq5j376bpy5qno4yy6ix',
                receiverComponent: 'hb185l8n3n6yhwmy51v2i3yklgo9cd13tfzdox9driyboyyjhv660qzxg6ognnainidipzokm008w6bhj1f0djek4zwrsykj3gmwzc5b3fq6jll8kdc3g6rrtl9rbd64y9ja3hqlija4ews142ct60yvwrfcui5c',
                receiverInterface: 'et4v115bz1rnt5vv0afxuvd0wxts22ktefkjhqj1rxb8zhq2x9iqhhsl5ow565s28qnr38a5das5azqujc88eglvkcn0oph5juvmmzctuwqguwgvxj6ewzyepp1x6ci1uo3o52l1s8inne2uehkngtm9448g36vk',
                receiverInterfaceNamespace: '4oahkpfns7ib8rsbakieb8yf7s2js054qwo8puv2941dybved70ol0l5ji31myj1pg3naqvr8cth6r25exd19prakhlb79qtvi21t41y52dw4vk74bybxi9m2mjsrd065hhkwg4jtlruudohyyggwcjtn49ueigu',
                retries: 6271694915,
                size: 2154705598,
                timesFailed: 4773170569,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: null,
                tenantCode: 'zhvgmz9uwf1o4fs6tmoiuvrnb5qftmoosjr3ipd4wlbtnbvi18',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'pm7eoesuwjzu6h0zffvp',
                scenario: 'k6hdeemi1njf2rf0gzpp7h4n7pw4rl592o0bqojvpnwekw44udtcpbsn4oqn',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:02:47',
                executionMonitoringStartAt: '2020-07-26 23:08:55',
                executionMonitoringEndAt: '2020-07-26 18:20:23',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'saj85dudifyou2x0f8yb669fo7l9yay7mf74z4pob64dkxspv492i1430i8vgo0v97m984xfnivywwiqmh8gd27lt19nbfohn0vk26snfxbjccoq4clru59445oqzqoogi2nfr904hhuf1emknymng8d8w4ogd8p',
                flowComponent: 'er5m4okkv09th4jep9h0lvm9xd0dlelm51x6y4o7m9wwhqwpn7iv4ayafz9dr135d799bvywcdewar7npfaaaqrtjb5teywjo0h3u4rq7lxfu5ujnd44ztz857l1kdd0rpdomqrpas7q10y4mbka90tmnfl88lwn',
                flowInterfaceName: 'emulpzefaiyzcr8wnwjufgrazopq8792kgcc3m73ws0cza3t1spldypnfyj7tvspyvuy2b4ktwpa8kl4k3uzrsd9vhhlgp5979r8cjcr4z9o7n2jw8iv6ibpt6obyg6wzut94h6ht4gxtijk57lle99rykwhcvft',
                flowInterfaceNamespace: '3g4cokpca8pztrb5hl1n8lnkr8zb74n2sdteo9p6bxpx5ulpbtgetw7jwgxskyqi25sdfvhjp63l661g9yz7m6le4hnjw0na57cfeu4s15y3i7dgjk9esehoig5qehj0r45ve4uxxx302ph8qvkim9h7j63crjyp',
                status: 'WAITING',
                detail: 'Earum ipsum repellendus voluptatum. Sequi consequatur fugiat eos nulla recusandae sed. Repellat ad asperiores quos autem vitae. Tempore iure distinctio quibusdam qui eum error libero. Dolores molestias qui ea. Ipsa architecto nulla.',
                example: '7okr4w249evdksjvr29av0r2gfdhpl8b622j9oy06zzm5lnme274tyn8tbixvje0j5ow3yu8ydvb58a7ysxp9vnrusk0zco3u54tfdjjhr7y3au1ofun6zc6xyw5c1ska23y5clazv85wc5ic596oxrh0novxxnj',
                startTimeAt: '2020-07-27 14:49:06',
                direction: 'INBOUND',
                errorCategory: '2kno3flac7dxbrcsgqi88v3n7zcdyweys47luhqla1igryf4yco3c7lrzrtwxzt3izi3yplf9pm7xl695r8ams6dc2falrvhzke8fk5c8unhrve2hu0qdi7p3u4wuxgd37z9yysry1lenx4wudlwcu1y0dxo3rw7',
                errorCode: 'sj90nb142ijg8nxemtik',
                errorLabel: 270265,
                node: 8619555760,
                protocol: '3w7drchmoyo9aonrv7zb',
                qualityOfService: 'qhhht8n9jdbvf4keem7q',
                receiverParty: 'b1ppbymw5g4kxon008tn1gvk3s07b1wdy2mdoj84w7b5x7274vj7t3ffo87c7sj1o7islacateey7hh75cz15ukco2xrsnq1lwlwutxkhy2lbmjx3k0ygv8o2pyw105s0m0n1gacov3of6sgqbz8zsrzogg37mt0',
                receiverComponent: 'piethofw51c247381cj5ixs7lt7focci8hrwrz51biqoc4ttta8krclpmq09xpc092sqi4pk1d0jfo96hr7zx111l96p4mywl1gtlucgxlkyf88ixxv6lt0qcpexqw4jvp9bjob8c7s1rhfrwnbh3vj1oo96b4z5',
                receiverInterface: 'w5tubw95liav4dna26ruewto444mylmj9re0duf5ups4v46xzjrlh27e05s5z1vy62vjdyjbevnr7ik0vsk3nai7tobx98qb9xxbaqoypoakulj2j7abkg3d8bu0ue45svsq1p9k4ahbhp8ptr1axkeeo1dl3h3w',
                receiverInterfaceNamespace: '5x8f0nu2echzy6fo2bxwvudo6w1n047bckpmrxy8wjegxb280ixtaunztkx0jlqvgwjav0fb6rbecfemny9t9ajs0em9il6m6e3hyab2br9ub5iul17nidw0ti73k82ro7npgo7v8zmk7j6nibd041cmo5z0zdkm',
                retries: 8334981439,
                size: 1341402299,
                timesFailed: 3308958408,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                
                tenantCode: 'yi6v9oncr1xkeurym31ccrh509uac36fkxpvyiou2nghdc4831',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'vx2fjb43p6tosb6442q1',
                scenario: 'nr1of8e0avys00r34lt254tj8skscwda3bjr5vbhzremj8pxot1em2ni9xn8',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:48:51',
                executionMonitoringStartAt: '2020-07-26 17:20:56',
                executionMonitoringEndAt: '2020-07-27 10:52:49',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '5bc17ysjw2k9lvcb913dw6am2pdef63b47c4zmq1ydnf02krxor88ajtqyxp6bx03tuk0tp0300l6jrsd0m168113qf8bzv8ufrc5z1fpcw24tya2pymy3250w8jsc8bw0jf8rhyijhzj5kpclw7qg453e2xekrd',
                flowComponent: 'qqur42qqzeibbskou69jzajvs7hgalowtmrhoze5ikn41yg0j3l2l2eaxa5kq507vvszfcmwbrp171yuxs1x4fbscbaqhnvxipnv2cw45cmaf051dd0141bdewobkgf73upwyr3wx9w0j6v1lzn5cfn9whf5gavn',
                flowInterfaceName: 'njr6la00seo9lan1mx4vxr9bphy42bts0gjz1npeftc5h2zn620yfhezz447tvbs90yxqcbn3cnshwkbix52trwitjg2hjob1p729ajamivvf980epqqgy820kdxahpw9uvcmniuldybdlxl20o2q3rdgutafxod',
                flowInterfaceNamespace: 'dtttissbnv528bmzfsegehxb28xtvkip1jbi8d9i6u17nf1dx75qyzrlfe5ddn15w4ztt1wig1pazz7gxbyebscnr357nwoatcby9uwhjaetsik6zgss8t5gqz2dahxvz2u2kvx1qdzbtlaz4b8e12o8vvj06k5l',
                status: 'DELIVERING',
                detail: 'Officia et quibusdam dolor sed similique beatae similique reiciendis. Odio ratione reiciendis est qui tempora iure mollitia. Accusantium nemo rerum magnam illum beatae magni. Qui aperiam omnis aliquam.',
                example: '6ojauj0z4z5bw1aopyr3c3w03mb66dt7nusz0vbmeezgkn3dxykwjhxkcjfdeytp2abz4aswvtzx6v7a342t01d9ovis36qcecvoakq10pmv64vq2z8wal0xcc77bjeucgnh29lfqrq2eh67robzo4bm110gx20u',
                startTimeAt: '2020-07-27 04:45:52',
                direction: 'INBOUND',
                errorCategory: 'fuddadldjkh2i3n5tid5vly7a2dqcm1u4517cfiuxb9y3c6lk80itl6885qhracup0zpljsnm4qclnwenle4q2vv600oijpmz9ox7zcjk1yywlr739ld1overef7mkfftwvfl2cllogshmgkil2lp6ow3u1j6mf4',
                errorCode: '90zv78yo9rsbh7bbdsk9',
                errorLabel: 832747,
                node: 6023476629,
                protocol: 'xvdwhmhrluup2bf2cyx9',
                qualityOfService: 'zd8a2a7zk47wjc1ewghh',
                receiverParty: 'j82lqhd9igshvzjuqgfig5emascic0ws7visvvt1sd4q7rg7l2utnlq64feu5u4k7bpr9g25spzxe94fmtenao8pb3stm4gmh0ieufozb3n4aqcshwlfr5v7r9e3hngvh3fn9g9qt1esmuihhl4x1hq4lves65c7',
                receiverComponent: 'px54z38hnxg6f06axvb21jq2mmx9ipni17e7izzik01gz38905fazff7x61dv41pq9trur369uxwwudxjs8ff1b4j60p5jh7t8gijpazq6o1jc1xiiy4g1g5l5ptb0mry0m3jsn5pllgs9vzk52fy8ypdzomgo8a',
                receiverInterface: 'iyd0f5juu0cj0qo8n8dt7vcyy6lvev69pm8u8szjf5f3jui9j1g9m0z6yrl8fq8jio5mnrng0f547zjtg4x7ddn2mtezwu65v31ynoa5mrl2fh9tko0p20xmz4u9xmv7qduc7m1g41990mpdr2ovv2wo35zh2mk1',
                receiverInterfaceNamespace: 'ijskms8bskj6trpyr4zvsl8cydeao6s18kw1eqw5zagjhpnrc8qouxh0i73hyw4nltony9gkg1e47sbtl2jdu7vqniv583f780jpj86y2uac768h2vog4kbca934hp1jghvpmjxbvymy1z3ck7j5b0d2xw1yhod7',
                retries: 6334291228,
                size: 4702687017,
                timesFailed: 7626239936,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: null,
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'uopmzqcnq3uu0oid5tp1',
                scenario: 'vzojlkt2x532bj39e1eixf0rco5mnb8k9fgvk5acm2ryt7h9q4nsvimqah3j',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 20:35:43',
                executionMonitoringStartAt: '2020-07-26 20:51:13',
                executionMonitoringEndAt: '2020-07-26 22:03:49',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'jlhd0f0eoqyvnq4sb730fe926fhqmmqbkfafnqpmhjbbtithm6aveaw1zsqxo8ic6ta1fjst41r97ssf3zbs0as9i1zqsc7fnwd2xjyv0l76yviexi9bx0f0dx2zavyz6px6n5b0st779tcm3pt1pf8irb8iv9gt',
                flowComponent: 'm80t2buzzt7s5onkkn7cs7edulr61mfr4o2xgmcem5fjjlse29hp0u4ytqmv0yw67845eoh04d43kpo969rcwu4z532yvta19ko49ib2k3bijtoc3bsbgxrwbnrkutn41wjvpvz73ywq1hqs6hdrdibupc4mjv0z',
                flowInterfaceName: '44c8gdblpmvjm3x54qadlkcr9fp5ztpt9ljqmn4m76kyhkajqsxs4dpskv1djcp3u9mlfp6377ms60h91e12yug0mnyf4wqjz0z39g2v102giw0hnn4g4yfuzfa8a9x3t0hhrw8dmkdvyjuzkawommqh97vzi54t',
                flowInterfaceNamespace: 'kbhh5he37osxwqwsx8rcamx3f6lfj94yxiawbv6nhb5snuovlixjiggsja2mmlwonkwwh889ias1x226qq43okgxihhvo6jqvtf82wza55e7duohab675kobubp6e1zoobg1ttpv3xqvvuyf3c5d20t0xxylhplw',
                status: 'HOLDING',
                detail: 'Tempore libero hic reiciendis. Libero corporis pariatur amet id tempora. Placeat quasi qui praesentium quis corporis molestiae. Deleniti dolor sunt vel sint sint sed quisquam et et. Sed consequuntur aliquam placeat dolores dignissimos exercitationem.',
                example: '5sum5qi8d906tklo4l6rqzmo6fe17e4h2ofq8tlra28r6ij7efb15wtta2i39jn3kzzx2cuepvqaupjb93s50oeco2wbucleahu6iu7wg8k1jkzuup48opzaq5p28e0yu9fnuv5k47c6nlr6k8gtip67wkwahugk',
                startTimeAt: '2020-07-27 12:57:59',
                direction: 'OUTBOUND',
                errorCategory: '0eviz1lpxdv1ibdp0esugltb19tidz8svwfpbb0nslwm3xxhfivxc6r63u0z8hzdi37lyhngrjyqvgz0qv7ezy0202d7122sfcal36tj2ri3t51ob9eiw6mfvht7mmox7v75kmc55uoezohoyaur699j529gbz3s',
                errorCode: 'f5bnjt06obnp96mjt6lu',
                errorLabel: 431962,
                node: 3756840015,
                protocol: 'qhh7ox13kzq7wd1jp0tv',
                qualityOfService: '2wnhfmx8swax4z5x8czf',
                receiverParty: 'jogksaor2cm7fsz3iiy0ff4dt5vqhsgxcr1o7tvrhnr25vyeyiclgpvfve6ru2c3sfaryvhca1svtkipuaf46tym0t0d1u9w3uznrdnwp91m5qh1zl4jeyrj4pl6uscclmx8vq1bd8y5p895tkmxzro0zsbg3b3a',
                receiverComponent: 'ghx64412fsocujtbtio97tg26cemd0is3x3s7dyn859fkgvqs8q8cpxr6t18wxh7q1a022u1cjopauckqd3t7x771ns1ozmefq2hf2z89zq1966enfjcpj4n3mhfxb6yesd4e8d3towrua2j15vsa6e1bt5nu6xn',
                receiverInterface: 'i0p5ujy6l5e677av6ry5xahufpqtlpv3ye1b4du0bd582ew14qhgcwcr52nbaaqqwm3x0yff0efoj58fdosczvy4gywrkfms72cusmmnvww60j6qa6ublw543ir6rjf6vu4ycytuktuecuvezxz03cf8oepeaxut',
                receiverInterfaceNamespace: 'yc9zgskq73h6l2w1gcfc0xpibh8x5h4bjk7jmagncmcsmcnahswez7y87xcvzxn3dwp4kfntacf22t0yxg6xq2e1by440e3123ksjp5ztc0sy70rfj5vylp8raz1k0pzj680hkhrlnagkb9svgcrlyubl6jkcwfv',
                retries: 4045011339,
                size: 1695352005,
                timesFailed: 9209033379,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'vdbew7ma8w1wxcnl8m1l',
                scenario: 'iokta3bmosdn4us474ehke2mhygsp0p02yet74e3ojgij4vz94lh69rgcknc',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:12:51',
                executionMonitoringStartAt: '2020-07-27 16:19:12',
                executionMonitoringEndAt: '2020-07-27 15:08:13',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'av771ankia0hnibu836db8ihjdaavoi340uk5az322wp25mdlgbhlto6ov19vpup63fis4y2opkcdubwdvujmng10l9yqcnpik06axuhpcr7myru3tdlljdzlagsfywszaklego34bvol31l7wwuf34cc2krk778',
                flowComponent: 'ko1c1e6wv41hanauf5ar6a2joy000lxn3ect43iuqm6zycncepmp2dfo0s7p5zm592ad83ndb7wvyosgfs21fkp1y4rtb35i72dqr542fsbehomepn2c0nvj6a8budz7k905hibuxgdhuvov380linixb2ohn90n',
                flowInterfaceName: '7ddqpogu5bfaza19zf0464qvcyfga7pk75w6sqrlxzd3ljyfqr7cq135g3th80rj4ifxbw19hpfx8s0ljfq2se66xo0qcjh1scktsexqcthjfwunp5vu8s6gf64v0925127ob9ios5i0pe58ddpoth23f3ltruh8',
                flowInterfaceNamespace: 'zna6awt7ck9tn6k3sga0a7eqlb08mhtq3a0f0yq7d0nwmmvamb1qfeq6aft5r3afvv00mdmkhx66nxgv6iykqzj1yq5h2d7tu3f42yf8mfr1i5fmosax797z4q0k9ojytvv588s9hwnip4gt2bs3vlljsfgxwb8n',
                status: 'WAITING',
                detail: 'Sed aut ullam nihil aliquam quis. Et est fugit laudantium nihil culpa animi ipsam aut quo. Distinctio et suscipit delectus assumenda exercitationem. Et fugit tempora rerum. Quos quia ad est. Dolor qui at.',
                example: 'es4hifjdir6b0wpzxlact3lmoo5sxg8wta25v7migrml94q8rqxduzn7ljd4gae1ppbdvew4iqr4ax9s2oafafb7mhwr6ww46cx41veztlg6oay1g3sjsnzjwz254wtj9glabyqcgum34ehukzt7ve9ne8zt5cc9',
                startTimeAt: '2020-07-27 00:34:04',
                direction: 'OUTBOUND',
                errorCategory: '3cagplijqw3963swuhg0rpnwzrvsnx564dsv9sd3ziwl5k01q6l1km5ofqztqi59ds8jkiva7ogrfaxkjkml1rurypvt5e4siseee7dgevoaf4v15vzqwh29kfm39tvae6ovv3uxmy7y6uqo7u52odn0rpgtzv93',
                errorCode: '4jb320wdiq4udgjyhxdr',
                errorLabel: 473355,
                node: 8515588462,
                protocol: '4kdwihk2y6xuxefxn3yl',
                qualityOfService: 'wphhiquwz6i4lz36b5ln',
                receiverParty: 'fm18yt7w85tfjdx6g3agu3w1cb53p7qnejh6mbmk6ktoxj1oeiho1om2reodkutwaq5rzw7pien89r8if950purh2q2gl54h7o93rk94v80369r1161ac9yteqeduvxs8c1jp9fhvvlv734s21lrp92rq68ul21o',
                receiverComponent: 'tuxmt9ffymleoasck1vnb3s65fl5ph9mgr79pfx8n4qp3yt1drfuu48vpft0n3oi887kkgwuo2gmdyxbvsxgbh53nwrg5qt2wpwhndx89r4i851s8czo3hfrmqj9kt5jda8iuo2q2ttyrtokvnsj1v5gxi50wx4z',
                receiverInterface: 'idoe2qebzsrbfs73b3allgoq2fc08oej2y896fkbmwajus7s2b12k8dme7723689dctcjzh9ifu47fiiapsy0no371svi801c2ipogl1cnirehfuj2yaan80immi69thmj9igsu53qwj5j7jowo7df16x9bmfmyw',
                receiverInterfaceNamespace: 'ots6gej4xriqz748wxvh63d3ciergc6qvtbif5c4rz4lrk2xbjgluvui5ijoqqk30sx5v4p0c5n3qge00kba3gca55kife8fi96dzsfqa6n7xg3a9c0dxzz1p8iu4fou60awqfni0plrvj3spalhb2rcg5b2cx8t',
                retries: 6705891256,
                size: 2969473456,
                timesFailed: 9468715995,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '4jbd97zeq4x86se2ibbarqb08gyq3ydm8fs560k398sg5omhn8',
                systemId: null,
                systemName: 't0hrvx0s34jco13857ui',
                scenario: 'cy90sx3nohla0c2dmuor7bdpsaqlsiwdjc79175hx4u8crl874ou1gce5dw5',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:56:49',
                executionMonitoringStartAt: '2020-07-27 13:22:59',
                executionMonitoringEndAt: '2020-07-27 04:17:54',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'u6ul64qir5uovns86bblsrzepjrxcrfk3jr9dyrjoogbzqmf1kx5x1pm72brskvoqhoib709olgzp626rbfdmh2isfvydd1l10g6muylsy7pzuztnl46vw9mcit2uq61fmbb544cyhwkkvevqi2lgo58bobhi3rq',
                flowComponent: 'kj7klus8wnnrk0fxi0xkd5m9d6anpj8048780agdsmlwn5215ee3lsimiwez70179jvn11tkyw0gpvch1pg1224rkiwqmmumsuj1axcf23vth67dohyzz0k2nu65i73a1315a0dxolp5ctkejirqhmlzs9o1swwa',
                flowInterfaceName: 'g7w88136j8vhca8tvpl5k7jbh06bn0ptk91suhnna8286fys1yn05yrzewa6t4k35kf9cuelv5hx1b7c8y1gzmw1yzgf459i84765zyql7mku2rdlktxxtarq4600phmabotsg5yswhaj1vcpnu8yijq89wd3a7n',
                flowInterfaceNamespace: '3595jg2zv2wu3lu5tuahdzkjlqyisl7681wz61ie7mk0xhfl5i40a8hic3mhr6cj8hrumaz4oyui010o6gfkb8tkkwsyifl80laaqnqn7j0vvaluexauknsdv02prt5zlpeho9mtznz90why85790fe27yxa6v67',
                status: 'SUCCESS',
                detail: 'Sunt porro eum consequatur eveniet hic enim atque. Dolorum qui eum dolores. Dolorem non et in ipsam quia. Nam id nemo fugiat velit officia itaque omnis ullam. Et nostrum et officiis tenetur a ab dolorum illum. Sed ut esse aliquam dolor velit cum eligendi.',
                example: 'zic2nvcbxpa7rd8ebxfur8v94n58utllxxtbdlc6aw4frh7en47gmk467i54svftka89px81k6aehn8g8s5m1iiaui1wx6l2b1zbh9p3mdejd8jc45mzwmm08fzboz0hyrif4g0m4zzi4qixkt3jo192zd318mff',
                startTimeAt: '2020-07-26 19:26:46',
                direction: 'INBOUND',
                errorCategory: '64lgyvaz6g1z5cnrwp14hkl3y7ntvmuidvlep2wb8y4z1ryqp9u86zvqan9atzn90maasmn8h9269ik8khvmo3t7vi4e4syaamppe0dq4qcs05s87u8y3wxrqecikmbu6x0ua4pgsv82vg2bfam5472uwp2gg4kx',
                errorCode: 'lnlyowt8x3wp1p7rnwbl',
                errorLabel: 807839,
                node: 2430624234,
                protocol: 'iwyxjh68zvo9k3h7ijva',
                qualityOfService: 'q6sj7i08uf0l92cmlkqg',
                receiverParty: '77lldlyrzzuipa75bi7jm0auwlqtle8ifhh0kzwklm2mgkjiq2ybyi4i5jh6vbvtjr5bfut60tnzf6p4akwusdwn41ylg6hzv7pfc1spsqpdn3b5wy7ex9olkkbrsd8kouev4jvc4dfx2yb0hgktoals6q2qdlmx',
                receiverComponent: 'f0l5vwuh16l0et9nb7ms5g8o0sz94a8lyhhx374s4cid13gmbofghwo7vjqwwwwm9c17iounub7b5gasg6zqzbu559ilaj3w6f22hibrv278easfpoo1mxptoxeyzmg1oc2rti1ot58bz5a5lmrrdg5qs6hpmtoy',
                receiverInterface: 'x5ilbkaxf1771q2atrqpsdexz3kf4ntq7aj87q9kdxqw64eqfhtrndmezzuyclhu6b5yyrhq05pgcuti776u6j92rb7syynl3rcwtftz64wqcaa05mowxgjj32wq29cfyjavv6jr7wrzrf5qz7y7o8f94riaec64',
                receiverInterfaceNamespace: 'y07d0yjgqzlgfm22zegorohz6rq6tl1vbltb9sbhx6z1wagg881fe8wzmn2jxyyrp9ww2xkb69wtne8bu8imziltxqmm8d970dchatki4v5g9yq0noipwqi1ev8u1xwzr94w522zb0e5glbkc1t5uhu2tbe1ozgy',
                retries: 6552695675,
                size: 5340778499,
                timesFailed: 2856134583,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'y0cks8eogjb0g4o4h42ac5wtlh18npgc2sxbfta0p9iggzt31f',
                
                systemName: 'sgnt5ga4zz80ysy418wj',
                scenario: 'o0l99sd6hsar6q070xv7lxg7fow2erxm0w4im9ezmnq7iwmmff65e56cz5nr',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:01:59',
                executionMonitoringStartAt: '2020-07-27 03:44:44',
                executionMonitoringEndAt: '2020-07-26 22:52:47',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'imd0euth6jlz18xnq74rw5r8ulbitpzn5l71q04y3s04osr5tdcm21dk9lo4ssdhrlmj6hon1ghyqzl1gnzxf8uzvr7w9avs8ef3x2t7s93zvpi8w023nc82oqjr0cf689jc5701uum84g9fwsimyzb5qef1a5yl',
                flowComponent: '16bmeh8vj9uryiog4n0mos8up7g8d4uetifgj4fmsffx3o4i5wy6gwvwucqhx3va6cymtsfsegv7fh2q4775zrlrpfo7c1yds86s0wsffkoi1ht6aqt09gwlgqrrci457nm7c6e8jlviyf2p3a8onnq1zjwej0yv',
                flowInterfaceName: '2ki00nixbhcdyyep7h6sckersd1w794bzn4yad34ta6v6dwuyikftgzyu1ddepxs2111nr584jjylzz2wh9nk0qhoolbp1v0o7h8vl6f144ntyr31xr1nbv38ac034w7x4d6x9y58g5bvklknrcci9izjzguask4',
                flowInterfaceNamespace: 'gfmaw2hqcki72eby10yro2v71clm81ckb3pby9oq3nicsfx5a2l3htd3n0e11h3cmjt5yr0ep98mf50vibtubeao728y63730t6xi9vfsw858bfjx3sdmtswf0rl8hawdira48wugzueoyebb4dr9da3u3c9edl9',
                status: 'DELIVERING',
                detail: 'Sed quia rerum animi aliquid alias magnam. Voluptates ea ipsa adipisci magnam. Vitae nam et facere id sed doloribus. Ut ea et perspiciatis tempore at itaque mollitia et magnam.',
                example: '8w73q3v6ctpqc2z1eq634azfziwxynfr3qtobgniw78kpwqaho3s706d79l3fz16p6cnjhqanzqoh0ye66bfne8aubgfvitr66lpkzxfhqrv6msm2rufi3fsgkng4aukpmm0nhg44r84sud5bthhhxppt5qyjj88',
                startTimeAt: '2020-07-27 13:11:24',
                direction: 'INBOUND',
                errorCategory: 'a8kboh0qwe3n0zpndofuve2bj11pl1pegeown495ojt97xca2n61ctpyh6cgs6ipn4bzgcnemz8rrutr0kprsysz893od0up67h87x1z5po2vgg6qerho84z4gzno5bfpgoorpl395pbb1c5kvbywiydai3clxtt',
                errorCode: 'd9qpygbxc24ngkq1b1ky',
                errorLabel: 646819,
                node: 2250477418,
                protocol: '86n4gy7j4jyhfnyb6jng',
                qualityOfService: 'zox4z1flnfl7h2r3ucqn',
                receiverParty: '3uvsw3yri8hjq0wm0pwd2de7i87vxlnt0e4178rx789a2dtm70feyzudoscfcth9i2t9c6zoaadsb1lhicpbefyac5sfpyf6cbs38vjatqhtzwpvwqrgm3cd1xkemqqzb0uvdvo1nogehmo557c4l37znad7gpil',
                receiverComponent: '2s2buyjjize884vir9gxaihx71rdux8hz9vhaog8maudkl4lj5jtbe6osa4fqorwvafmpx0tpk4rlai8bieuc2xs16tqs36y9exmpobj4441onexfayp6tbf0uz64u6si6nrp47g7l7ark2vdlqzts7ji4y0sn6b',
                receiverInterface: '6a4p2a20gvg8uckaifwwrcdshgz9m565zud3d1yvkyhkeh6dy5bt4ti77h6lztuxqkspjtsvf7we0qxk49hqk44urq8ios6aij4hwfiwz9cvoec1m2r6pp1c8694t7wl78303n55x0zj490vkpyh2l91enddem8t',
                receiverInterfaceNamespace: 'ubdh93kn6np0ezmq1z0p96ziswyoqsszdtv36c42lyolpu3wl0cpupcbzsw1ao6ltl1job3wnlqz6hc3dnycl0ciqwkblk235y4o3uq6mzm7pda74p3cl9f57bd88pgslembytrm0qejbe03ry5ecxn0ekhkggxu',
                retries: 3304927322,
                size: 3627294710,
                timesFailed: 7175389979,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'x2vwf4cnwpbvcjzywppzh6ll8y76yaa9sa7aibf71wo0kexayx',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: null,
                scenario: 'i1gfa9a8zvqpa0kabdst54dhphs8xrly4iilsmhlajtcdwu7hk4ctp6pvazy',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:01:26',
                executionMonitoringStartAt: '2020-07-26 17:42:58',
                executionMonitoringEndAt: '2020-07-27 00:45:33',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'n5jt0zrxx8ot0d0vnhuwjpw13u69dyz3fbxu88isy5rulpbsw3xrnhz8mi2tv8hqrmkh7okodmmgfx4mg1gsg6tx6o9ltehtafy3r32qk72b0ewaxl8jz13bmb0mvc9wp0yqzoeh7gqsdlkmll3iasv9if7kghdw',
                flowComponent: '7x01su0d6fsm0gsuh4i3mig5l1n946xxifs1m0cb9c2c8zld7slbt9dagp8yvy8p56jgmh0v5ucyn34ryysn8sh5thvhx5gu97hux8p3lu3bc3oz23c019jvugil9kmh1r45wp38x0yl1xtb2ixit0sc1lmy31rg',
                flowInterfaceName: 'rpy4naszse8fnwaaxwxurhfaztldf7ckfvsbrkwl925wn3p2lqrj5hltwpxxrojjrngpcveuq5lq8kxz79gu31a9j8whalh4stinfw76luc14grizrgfimi8wh26z68b5hukqepew33k8k1ugplwzt26nkc6d47n',
                flowInterfaceNamespace: 'chvcnirkmr1mdbgk1vn19aye0ol8lpk7vzcxp2y80iwxvcdkd7w17qaaru0w257yt7eu5a6ftplrr9qr8wha1odo9kk6dakjsl5dujt8xfxv10uxhuzw6i91vee62zrcfabkx5ik7wwhr1ae0rbja3j39e39wub7',
                status: 'WAITING',
                detail: 'Nulla voluptatem suscipit consequuntur est. Optio magni sit et. Debitis rerum laudantium iusto voluptate pariatur fugit ut odit et. Et ea eum a sequi. Ad officiis eaque.',
                example: 'x1hc8yofjuerkm6ojamsgmnw4v7nx8qnhmifodk8u45h8vjqnx4o1gq3xws12k1u8tpqhtm90qkmputqki2i2328dk9847is0mnqd9fra6ebm94vhfvdwvp3bh28res7sjmgwunfd3lacc8zovlrukb0e2arbnle',
                startTimeAt: '2020-07-27 07:23:24',
                direction: 'INBOUND',
                errorCategory: '58jrmbsoy44naf99b2kco6cg7b7btsu5edelnrxq4dymqzas2hejq7lfpypf7moai303jl10ar90fozmfq2ay02455rvnx0j9qye6atfo3z27wzphc1kqkel1gosocnulldweuwq2xm8jrrki4zope5itmy550hl',
                errorCode: 'nnr9nezs62jsts3f4hwn',
                errorLabel: 731257,
                node: 1776634592,
                protocol: '3b2rudb2abppual2nawt',
                qualityOfService: '3iioevsdzao6zf6dn3ni',
                receiverParty: 'okk69u2goyu676bztl7rdanc8dfsk7qdvlxwf8scijkmcgcpdq243ydp1rq3zdmarudk29mo6spgu9yiop98ysnpu4qfzuqmajp76zu8bl26r29jp6s9f27ngrldvj1ubm5y4inx9vp209u8aoiqutic3a6rd0k6',
                receiverComponent: 'wlkmb4k3o3scc3jtdkps4fld4pfzbuuzh7c2ymnlm5scripk84pz63pein2svhvvm1m5e9wc5pcl9iqksdqkw01zftdbr98qhgaaypolixh42s7poq57s9sukh4a9cwmws3pezsgah8pc4sizit8j0hqgwbpihv2',
                receiverInterface: 'xtbj23bmkuwbnlcbey1a19r5rheuayypyzv6ddpg0jw6r3p21ir5v5l2l65ieby3yqs9zv2m73pxtbijqrc92op0djwl80lveelyu7fybwft6s21913suppe1nwptbfaswp8bt8uxjsuaf5gon300v9kgvahs46c',
                receiverInterfaceNamespace: 'uotozg3ezmqgaigpms22h6lsrpv91xzvwpt3frgat14vxvgkkpzxpxvdlabnzu91czddmjdu1x8p7qggkqlmvt9xwinquuxn0gk8t2a5imwxptjh6aiflh600czxv88yukuxrzcsb3ouhmriiespbvo0iiiciipe',
                retries: 9887411968,
                size: 4377565846,
                timesFailed: 5364101995,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '0cevrdyhdt7v9c46snu6ritp19bph1r4bz7yzoy250hj2wgotd',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                
                scenario: 'g5phaq2awn4luqf21lmupgoffvglwj7qkdnj854sqh2mm7lx01n3fgyhkxyb',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:49:54',
                executionMonitoringStartAt: '2020-07-26 22:50:24',
                executionMonitoringEndAt: '2020-07-27 14:02:36',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '3k5vmviwd8qs2vc5zrpr82nt0682pdr1pkscdcx9mzfdrefrjof2qqwqrkqrebzxxnsco9lwyrsl6e1mj369cyk458ie8yhbpcrwmd5cpumt2lwgb5gqykw391uchvf8460l3q7yenez75mzsslvuyd48m0emxt2',
                flowComponent: 'hurmkyp7vgx4b16iy1dvotuh3uekerdajfkft239387bodjb2jnztanymc6d3b9e2giipwflg49ieboz7zkzhrtux5orpfvacu9ngy978uepvhpzhvsntlyszqwccaa93vpk0o22tglon8w4xidb8mze1vah2oqj',
                flowInterfaceName: 'ol7zleubmjolt607kypkvftxptlxzp5wpde6a0qj43polntdm8sbalog9t6x44hbhbr3bjvn04guv4twc76u30bh8vefhs4jun6p0k9cigdypzcc3asugazabd6o5g8exgkx7r4uax9o2hmzzs1srcrbtvfm0ujj',
                flowInterfaceNamespace: '6tnayl2ajzzyddspbmovm1nmoi4dwqkfgy2su3iuiscioxxlvarxw7557brz2erbtafo8gnizo02uzj63mv9x6lepmxb5f0ja5reepydps6mnzxgnmoo7d6m8abq6omxsvc2h28u1ekh68d1milzzsmbx9cfz182',
                status: 'SUCCESS',
                detail: 'Perspiciatis eum est eveniet. Dolor voluptatem pariatur. Dolor dolorem in. Maiores minima ut aut tempore consectetur totam et sequi corporis. Eaque ipsa omnis officiis qui libero. Dolore suscipit atque quo quo et dolor.',
                example: 'b9pz7n9l5owwrowq3y17lw6gmpcsa81e430v28w56zxbl42k3eg0yobs2k2mh8wsqo9almenmb66phj465f22et6mwh407wke4f0xzu0u4t6uk0xw5oyl09u6v7p5hfohixlacw4tcfquriexkedkb0jxkttfp3k',
                startTimeAt: '2020-07-27 00:10:28',
                direction: 'OUTBOUND',
                errorCategory: 'ikiclm95ndaj6rnbjkev43acuxdo6afptuq6lgkqokihj2y5wkukcdrau6c5tm9zwaic4b63qr69vxtyla619cop3yu2aq02007ihffkh6wecyjlctadqapdfrtqg5kbnek90utc1qrrmarxf2a1ydnvfxhc4irh',
                errorCode: 'upw1wmop6ruim9uxgrvp',
                errorLabel: 383802,
                node: 4947424072,
                protocol: '2hk9wmylu7y3rp8ozafb',
                qualityOfService: '6pspweu9vxr5nfylv45y',
                receiverParty: 'wlnh23rph0hbc2bo8znzxied68jalsegif2uhf6fav2xgtsnb0cle5se3p54844mesltjbs0vqr3eba1ttnq47qzndyrmbhf611cc7gpm0phd8p6ayd0kmcl3rk2uelm7g1wl5qugbp06fetiethg4lh1njoaln2',
                receiverComponent: 'c8eqei8pji2zon5deswdzpzhodbsmvg7mogidtv1tikbv7shra9mzat02pcw76m51md7gq0c3olb4z14ooiriwex2fs7v5jmjyayyftpssajhs8majevbm1dc33tc0ywgqhs55l515awuurue5wl5yykkqnbzvxj',
                receiverInterface: 'scvn86vb9tbuhv0obzrhb0yssd14qbif1rn4rxw863vz2mgckwljnzn22g6rugna0pj04zsrvo1a2sejqcsiko6emyiewcn3zhh4rlstqibxp46plsbi28af8e00pu1p2s2zgvddupjr2cledqyc56tcyj3efobu',
                receiverInterfaceNamespace: 'i1t5i1lr47ztpth0ao3nv1c08i5zsfyfydxyupl0zxcvaieyq80xqjuby6y0sifmgpsto0dyms8n0dmzol014bwppc3qj4h8lit0xfnltl6z3nl9l7woik8ue25pc37pqr7w242qk4yrkzx28de0nohp2ogcmy9s',
                retries: 5935560353,
                size: 9441666058,
                timesFailed: 8710725054,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'hdk6p9li8fp4ele7i0bop2se1c5lz2f55o4xl4mrwoqq8v838m',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'cnrrzpwgwvlns6aop9ta',
                scenario: 'jat0dw1xep6jiv3eksf96vhv0gbv4cbcfc2z8qe84runuu2sdqofslltnwq7',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:44:01',
                executionMonitoringStartAt: '2020-07-27 05:32:36',
                executionMonitoringEndAt: '2020-07-27 14:44:34',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'r589axov1xgya5dx7wpe8d82cm41wxdz0vigdpcm4bbbou958mswm0dom392voc4jxsajmnsniqhjrq6mw4gn3pg5b8lfb7543hyjb15nyje2ga6eicfd8f3p082h6t6q2dck0ani02wq1lq917gngcdz0593a93',
                flowComponent: 'hkuoowh47frokvdl8i2kr17l15e0msvyce19je351q4ivai9t4d9j85gbcpkn2y42k1gkhdgzqoue3eq269vbb1igxzo3ajqsi50b0msz91q4w4mrlvcg6rtu3o0gq87ntqlp5w3zz3rndzg3iqalj7s8t0qs0a9',
                flowInterfaceName: 'nlvwj2o97zwm0tqu0l6ycs0a3sz25h0rgw0eoqkrdp7fvn0g6xr1uzjy8tf4e1gxt082gmfmek82xj8ag7429cuz0uhw7zbb46mev65q1xtazttiltmli6u4zocbq6nexzrjo4s6vdqxk4jibyboc78rj7gs7znn',
                flowInterfaceNamespace: 'hk7d27en5pq15e7tqqx7qahigi0vfm1e6cy9e4x7b2sw7y34mrir1i4xbt5agrodsz9bpousnji6cta68jf0kys3l2iyj8n0b0i7tbmi36s58iaaibzot093d1411ksj9d91uqnn9u61awlqxhxkvvx2m5rms6xd',
                status: 'SUCCESS',
                detail: 'Enim fuga officia ex quo quis. Porro quas vero est. Qui eveniet aut accusamus sed earum laboriosam nostrum recusandae. Est et beatae et voluptas autem repellat optio.',
                example: '6sc0vvhzlm4sacpix6mqslpc5stvp0vq6n7sm06wxov9hmt1z28s97g90ltc48v1jv2r6hzaa6d6bpsud0hnedj0r79mjqnhm8gszeijhnrojftp30fd5c6ah79titom845p1hpswhhwdhcjhbed8442wa8k8pk5',
                startTimeAt: '2020-07-27 01:52:42',
                direction: 'OUTBOUND',
                errorCategory: 'fu290eye2v6ii2779oyfedjh3eev1yun2blgm55s0ep7y1ryl8251yznsyy340pmvm6u37mxb1leeuu4mtp1nibqtle5q7n46a0ipub98j3zdeyzscbdlmuynufmo0kyrgixvhk8u0ihawqrwf3uo5f4vvnwzfos',
                errorCode: 'kph3exuwp4mvgqvsg2h7',
                errorLabel: 924333,
                node: 2856046058,
                protocol: '4ccgr8z6cucwdedoljhh',
                qualityOfService: 'mhu8ze1ewufhqt0fwtgq',
                receiverParty: 'zcfx27yfd6jsu0pdigu2zl7d63829fft4wrajk3ijhyy5r9w8y81mlsv33hb7igkcq56uu1cdh7x3pc5sq6q61xkdzi7sx19axacmmmm3anbz2dqhvupf753ptqo4dw77cl7t75jj60mhfqeuw22v6d18o8j004m',
                receiverComponent: '5rs9uidexpxoaia0i4nwi2h4b1sebadtd69xg73lpdcluidiw09vry9vvor9pzghnlc6melqce1dwuqwfiwl4m8i7nzktcodnxcm78hhdir65wnm59555m3n7cf8dwmzmzfex27aggzi9cjfrv528dp206zlkndy',
                receiverInterface: 'h7dvpiltyvn5wy12g5bly2fltz6d8ruif9rr71jaq2iqhk5p7jl0setfrw1mdvwqvxqlj8mf23i3p922umj4uu937cx50i6u8lckvni59dm60rowupowih8f6a69bna657z4f522t9zn2kgu5gwkw8sxqssze7oa',
                receiverInterfaceNamespace: 'obevyog6bmf955kp70dyhs997287tcxjavavhyfi80qcsojsawohfbwt5ry0svi36t6blnqn8de6y7jhb3xzweojn9p86kzmhhedaytl7f232c81ewcgwun6hsrc19zo4n1irbsdswbyqh39cwcte5vjykyyi3im',
                retries: 5379639232,
                size: 1191697801,
                timesFailed: 7765182114,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'xln4dmg6segmd7mmoql76b49iv5bam1ldiv0thf5xd5qdl8jo5',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'rqo5ledmp0wzo2uok71t',
                scenario: '2e19l3jsqwloz0huir6ifklyvcwwjhrrpq2ntmtlwhi20p51mh7yk1s3am97',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:33:18',
                executionMonitoringStartAt: '2020-07-27 16:27:14',
                executionMonitoringEndAt: '2020-07-26 17:17:21',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'vswtsho8upwvwwnr67574acfb6q8kzx9c5034rmamhfehsfj2b9og7rv8weoh7athsqrdtukd2uqpqys9geffs3d632ilajbxwunqjqo0k9d3dx9nx0jb795sq2iwel7l6b9eb62jip94l3q2o8emwk5kp5nq46b',
                flowComponent: 'cvffcz3rx3gvugma0fnjyzuadpa85pdceul0gbbzi964xsbcj7ygakc80yfabqxdlfh689zejxnq3o1szcpfcf4gubmyvjhoc12qoac8mucdp718zwyjoydqaamnsj1itfnr606tvwjs9oo5f7crldkk6r2ezhem',
                flowInterfaceName: '8266wnt5ektq3y4jhxrmnwh21vqgr7dacuc9woa6tofbxhi9oob8vtyepbf4vco8k0mjk1q4ruj4quba3ziorxjsm2pjo59n8j4xjnz28ybip0naeqcm4bntr3bhlnqhxfp91hrhghx0lv9ybdbf6b68a32bq13c',
                flowInterfaceNamespace: '2gj8a7yhckzym9ncacns5dg8yo48ddx3jkj13bascw7pg6plkm0n59gb0kr3rllae1ty72g6ofhi35k0zawnp1hdwawf6mn93zifgyi1wj20xdm0tl0q6k2052xvuofdxd1d245mo1px02qxpigja64mrw0onawt',
                status: 'WAITING',
                detail: 'Dolor voluptas provident iure atque blanditiis repudiandae. Vel dolorem eius laborum ut quia omnis nulla. Ea at tempore similique dolor ipsa ut dolorem. Et quas rerum. Porro omnis laudantium sed molestiae. Est corporis occaecati accusamus sed sit.',
                example: 'zbw090i6nneei63e0zgo2h3tsq0oj3wn73mr5wad51vwzi71s3lz1cuari1mhw08hnl602iirtuy6p6vwqjtx92goq97e5myl1ape3gtykcyzjk5990tmrc65b4mfan4fg3pg0wy77rujwml37gallhpcmy9zi9q',
                startTimeAt: '2020-07-26 17:15:32',
                direction: 'INBOUND',
                errorCategory: 'ad3idqnt8f426a9ijnsww4onw3xx2q6gu3rsd22dy32b8rjnjyv6zk46ug3eozwpwryd0fc7yfgysuv8j5vq5ivmwodn3fkk8srfvay1nug8uf3admmjp956cer44xs4uiw53iho0kwi78qiefri23qbds9owwaa',
                errorCode: 'x8kto6lg2j8h0r5a2pz6',
                errorLabel: 658724,
                node: 8324983433,
                protocol: 'uc94d5xozkfvyuecetrf',
                qualityOfService: 'o9qsobcgyhmepe6hfyea',
                receiverParty: 'ot3a27phtr4jskyfvpir759vfqy29mris3rhqjps5f2jx4grriqrm7t7r5xzgzk55hwz73z5va3z4km67j9wl0c05fpo0x95qrbw86nk8oi2otyiaq05ducyyg0qc6l709ku22frnusdx515x8pkubw9j7phfl6q',
                receiverComponent: '57wbyguhjid9f9irf54iurp34zrm6fvxs6io56kdne5bplssiaacap8o6uykhju6xtw8w21ii6x2kuib4287eatr0sxwpfmjm2lg8w5iclfpbtny2ir4y3voxd3gzofnouskwubmfzqfgeldlqsa64luo3ch2vms',
                receiverInterface: '219a6vddnswcynse3251ryjghfkzqxv9djp8xy7n9thwaph9yxmbrc14dpmielwmqhspo2vfatffeddxmzjhv2slb2tc4g2s5ngpen4hlezc93cq1oay7qmoxlcrdx8je978e71qu6aflrn86xenr6jmre3x5blq',
                receiverInterfaceNamespace: '8clbmguayetn8obn32ui5ff04kpdjg77j00191bc8jfyxjnqcae6b7ysm5gfjftywvstl30tx41arvyq9csqf9x01r6o08kuykjboleri0vpbrfdnglk7cuv38xq535vooddrm1eh9r7kjkh6skh9uagr0c5s2sl',
                retries: 5816619517,
                size: 5459883974,
                timesFailed: 8993428197,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'n4cuf0q92m52u6o9xnjr0si6cdziaefyvw4fm1w3kstwabw9gp',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 's6xygwqfzdja8ftb4fkd',
                scenario: 'y8inc4fs9lzpthkv68z32txxt0d4ruysy9w8ox1gnlefi1nx35msh3mzewec',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: null,
                executionExecutedAt: '2020-07-27 05:41:01',
                executionMonitoringStartAt: '2020-07-27 09:29:03',
                executionMonitoringEndAt: '2020-07-27 00:00:38',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'kx1cq923s49fpwv9q7c1nbqw4yebus4wwtstw165vs07qckv61autrpd5e9y19tf7l4160ez89hq8ujakftkilym2zrnc8ice1l7iirfrceqxfyctrw11x6v5bgmwvxvi1w60jau4j0xekxk733x7wks08jizehj',
                flowComponent: '3hfl8uak5f31h9ba0x5cwali8e5kkfufml7i28nyqgi112vmobtetiear81blv72f3oiwko85e1bfdx74hpgp700mgq5205h0awyux20hrgwm2b0p8ve5iolc0q11o9ndrpvlm9kcxu58ut5v2yv6t3qxfyu0lu7',
                flowInterfaceName: 'y86p8ttjg3oodidtmp6ricymbenvkokxx5lie6ocnbs7k5uwjlsut1phjtlx127sso4ld5ntw7rrx76526xtbxyogis5oer8orwefmx13kbh21xp4cdi4ownpw715vbarozpwjvellnrthu0i1xcaelza93hg551',
                flowInterfaceNamespace: 'c6ij8iqpqccdrlcikiy5uzdcdi2mm9rn6yhdzsljf50sp4y6yc462ibvdreea0n0w4unqwr4fe2wi41jqa8xga9doslo797i35ea76km8m8kw5y9swvwdio9it673z236zhlafk4r1giuj8g853u3puz2kvkfp4w',
                status: 'ERROR',
                detail: 'Praesentium delectus veniam perferendis. Laborum dolorum eos dolores. Inventore dicta et porro. Fugiat minus officia deleniti quo illo beatae laudantium. Suscipit repellendus aut facilis non eligendi reiciendis molestiae. Omnis commodi optio ea fugiat deleniti.',
                example: 'oi6mpml9n6jqt1dvv8z9zm134e0bmlqin1bsw7deny8cgo1vy4tvu9xp9cmt65m9nwgvja9qinnoa8efk8cgongfc009sdbn1vqzdg74yk60tcgziltpo9597f32ipneieuerncy8xb417p404i3bnms4ugb9l74',
                startTimeAt: '2020-07-27 03:08:51',
                direction: 'INBOUND',
                errorCategory: 'lnrd9mxppc7od7uczper6yxqxl0h31yqkn56xujx1jzdveml1lfdk9v3ngziaxe8w766f9071lt7am9e5r5hv9eoqw2in3vdcnlzs2gisa9noqlugvbikeuwll7f2w5766lmh2kp2jwlenmchds9ak0kaoz6duek',
                errorCode: 'ex016m0le1vky3zall9o',
                errorLabel: 211101,
                node: 8859040047,
                protocol: '5wvl5o49o6gs5azpd4x3',
                qualityOfService: 'hx34u0yewhnk7ksgyaze',
                receiverParty: 'bvmx880t012hz52p1lzptdqmbsxa70cx6rflktvlnrjppm5v1w5fcl35h8zhs4d4s8sud5u5j3cxxc8telfktawmao39rcywmk87k22bn1i0u69vkqdjich4329qh0546lugxpsh84h0mpap0grg31e8x1n2l38a',
                receiverComponent: 'ec98lc6bz8dkz8g6r1irroekm0nv1eoyil8li35bv31q8h99wtbqvhjb5m0xnt2c74dfwp9ksdt7pizca79gvtgcnqmjjr0exc8kbs7yi5u95sl07qt7ca60kk04jap93drriolegdahvkgn47upssetu9b4ajv4',
                receiverInterface: 'v83abilsuki6ufhagg98yhj0fh0uo2etx7sis0t9xlrz0u4tpqtcc3bi3ykikw5mvuz9b1op1wai313zxinesa7zup6ym8kh9nws7bn2udc436c12vv068i2hf5hr5ff8gtmbj3itbwzxd4ymh925oml71wtnsrn',
                receiverInterfaceNamespace: 'a4232akodarvci0lwg07pu99zyj9lt7tneo3qo1k1ixjilezz0zvqrbep2vi1ld3zjp2h5n4jbw4cutkc27unyo304bjcum5mkwlhwh1dc8kcylg3dlb92fyudpgcfr3amc6celheswx9unwffwbe6h6ldgi70kd',
                retries: 9903643507,
                size: 2026410847,
                timesFailed: 5390822947,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ip90j3tlms3p0fijm3av10o5vpxjq0794yjc4jr4iyhlsbtrfs',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'tocw8s4r15vn2cpd9c14',
                scenario: '4n07zcayv5u1xl0azq5cowdrf85v1toyuihbdnfurde844vjrrvy0edkgw9k',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                
                executionExecutedAt: '2020-07-27 01:52:56',
                executionMonitoringStartAt: '2020-07-26 21:26:00',
                executionMonitoringEndAt: '2020-07-27 06:52:31',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'hqoa6ud6bsjkozfuu9i5mlv1nrtymrpi4uxvpdvuokqpqqvmoqlj8v3v6wiovftyypv3mvd4uodk7j8g2b71yb09jsfhnhwd95gi3avdoefrsjtj4ofnyl82vt6tjsb9m446qog8ov3jii8qnw3mnfjp662nigni',
                flowComponent: 'axivutoeg3yx9c0dzicxmp34e7g14hehpn8wejfcygu8wles4ih8bdjx0wbfgzd9aw9l15upe5bkrwg36o7lcjj7rgtdsrqr3n5ijhdcbtczvwx1b0fyqf52s5yj1eyobihxirm4nax7g7buwjlbb2typn06oxj4',
                flowInterfaceName: 'egtypa8982csywkoirryfyx8kb82qn0v2m89cy4ftwy078wq3po3clk79zuf9ck9kno8arz35gqkms20k0r9vhlrenedovf31m17k6cn12lm462i5g92jn1csu5wg62x4zmff3lg8r309o4z65fi42bwiqqqb2yh',
                flowInterfaceNamespace: 'gez4s3yzl6q9htmmm4ocvg74vl28efs1l5ma56iz2wa31ep6mszz9q4gdi4cjofgtv76xpd0kzkjwjqunfcjrnj5432hdtqpezwqjrscfnqa5t71q57ytggy5gygfevu81nmypdy9i44056hnh0harpqa7rbo1bc',
                status: 'SUCCESS',
                detail: 'Doloremque at doloribus ab eum. Dicta nemo optio sapiente odit quia consequatur laudantium. Mollitia amet voluptas repellendus animi ipsa iste accusantium iste labore. Cupiditate assumenda et deleniti et. Ducimus quidem blanditiis. Blanditiis non placeat sit.',
                example: 'pbonr24p93cgza2oz21yuxwnumy8u3urygruimtrlta45g9e12a9sp3vfq8g3t0guyv9o4nyyqcehrwh1xsdssjrx1vuszwk412u7wm8f584hx6anubtcp0s284s115pkxoaovahryqizztb666pd3g4x8o5uju5',
                startTimeAt: '2020-07-26 21:28:56',
                direction: 'INBOUND',
                errorCategory: 'aaenqkvrjcmee8ga409x76e3afvqyxpnbfgs35do06lgjkmzou65j9gxhvhzlzhx3bygqrimhztyx7qm0fjtyxrv7x3vad5jpq3uuye66dixg5m4d4dmuaiid4xy063097pz09fdz6zos4c3tnhetza861yf9z1m',
                errorCode: 'dl3m99yg1outfkzs8e8z',
                errorLabel: 383933,
                node: 8443768009,
                protocol: '88f0nrsdwqagezwib44p',
                qualityOfService: 'ev64h5d00lg3qfub4set',
                receiverParty: 'd4k7xm6yqbk9m7f399ybvzffi66ip4spg39o5jdgbd5to32y5nn7n7obgkpjobbcfqm3xejz0l5oahxtzpjc2edmk3jyjjymyl902ss2a1lmpnqv09tbckces0dnhq64eztn69xa8pl5z3oocwnlwm7cun0pznis',
                receiverComponent: 'x1tqxaukfqf6w8u0jnhtoiyfmgfutmbre6ig8nb1fkxpv7i9g9u5jryufirrrmxv7by9yhsashqoygt08ml3c48ns0xvaf3sn7h3oup7p2t6qhs6f1a3qlmnvldw8u60z5x0si98wevimcnpbpzamvtucf2whc1i',
                receiverInterface: 'g55020zt02j5x574c0gcuyq6h1p6i041jva3uvmkak54qc3ow8mkwj28oigaryj0z5dz3aenbesve3g9jh79suwh94mb5bvqvupxqbg2zujidyckflq12eqcxg35wkwav5gdizqt16lilidf5ojxxlyz0zthr047',
                receiverInterfaceNamespace: 'oyw55nsp9u1oqpwg1qqqyoiskpn98no0d2wtuplxebousb523hwzzw911urjncu4zovb2jj3b44d13jv60ctnw291qkq3x787arccnqq1wl9sybf7zokir6opxht5tn91lbandmcnntr4x1xhmgwsnevltr195hp',
                retries: 9042527991,
                size: 2971785252,
                timesFailed: 5918216832,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '4pw637yq9qdqkb2w1l6hzs37btth9a54qeyedt7pvdrf931vr5',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'j4vw4epvnwkn5tce4dvu',
                scenario: '0hhy0k7ed7kimh47pcq64n734aw6n90mkja5u5wqtkzn1r8ln9ffnt63hjem',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 11:56:53',
                executionMonitoringEndAt: '2020-07-26 18:35:55',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '3xm9oef416dp4p9oxp5gkj93r0sbjidvuogmwd5cime8pecy2hje2hbhdf0ecf38as03ifish8u4m4jegqxy286mji8guqo4xdkfiub6eltkyq9jpmsw2vgav46cargpxl1htszbvjhb9ja586hysxcasi7u6th7',
                flowComponent: 'm6rfks1r66kvqi21j90sret9zhjsmoa1jfugxc5ip50w5d0nvxs791utvbt7akxejrer5uyes5zsyfj2f1qyu5g6xrjx96svc0s1uuw72vitm0q024ajhk888s5iqfn3pz8jc8p6o3n0wb39rp7tordwvkfrk3rk',
                flowInterfaceName: 'ck708dnm6ng1zpti2lehimbeb1eo96gor8o0heya22o674bigdzg41xh1fzycw5nsjj8p79t2x3xbq1xkz2rkqn1i97pi9zcx3vtp4dloombwtkv0dojby6y575g37jrqqsz0uf7oj26te6nz8q8f3xukzv8fatn',
                flowInterfaceNamespace: 't7w42r16j2amddx71exyn10p8sozrgli1l8blzfs9prgabs5amd01hyrionfti0e60dmbbcvyblpatzr0vgij780bu8hfz5vgf4qlyy0zfphbpw4fpl0l4romqzdf114iqepa54nwz4259ffqm4l6ck7wdgfsz0r',
                status: 'ERROR',
                detail: 'Porro consequatur quaerat animi dolorum molestiae velit sunt labore. Earum dolorem vitae blanditiis et sunt. Et non dolor possimus molestiae aliquam. Ullam dolorem et ipsa nobis delectus dolores iste. Et voluptate sit est fugit quae provident.',
                example: 'aru7eq27mesnd19eopy03rfk35r1rnvqapnaua3b1uiocgc1b8bbmjs97ty5u642q89prgltyphvqcbyh56fhailcbjkao3pro4srj4z4frqb92aeoi9q7ar68t23i60y664womiduwv0x9sabtp32w8nafer7bn',
                startTimeAt: '2020-07-27 10:33:06',
                direction: 'OUTBOUND',
                errorCategory: 'ed7bzq1m4sifj6dkk6zfy6p0wiwjj3lkezcvnnnjq2k4v0lv6omzyb0d8rr7awft6y155dl7d0i9qyan4xfz35fcx4vntf1f39n4ftrok8qicqj3jxomaodkxokmnlwvmtg4szg631hy2bzqtmxx5mevz65duvvg',
                errorCode: '6afn7yj2nd44yub8vzdl',
                errorLabel: 591237,
                node: 3980042004,
                protocol: 'sx7japyfjgevx1rifn9n',
                qualityOfService: '0fj1o20o596zfq0l2pev',
                receiverParty: 't48fblewt5ver2afg1ktqse8ja8rk7g0vj7qkvqrfjfz0riqoff3ivd0o65gdx9trc3y8o9f2i7s20fw8eopnq3gnqrhhshzan4fe85pysp23ktpfy02zalf1q0kxl7j2owvr4o0s01br9xnu4meoso2o98gw1lh',
                receiverComponent: 'bif5xtkfaeila6m3gvhxtw5hanbjvnaqi5jbbte3ma9lg1htcfh482iubo7lb1ilmv5uluyqmqsntdyjqxsccpm8hhyqy5hvmfoqf3xvhlnoj61nunuz640a5v5xeuf801vox8uyol3re0tdklxj8d108sjk82nb',
                receiverInterface: 'imqvx7zodmoiqf9rsosgxtlidmjnoe2w3cy2lb8jztt34m0zkec8c6mwfy90asxjaqp6lbwzaqhgaq925cjzwmb52939ke9v7va4nekvmwpyew97y7w0z5a29qlpgcgl8norxskgz3dups0khbo237cwkwy549jg',
                receiverInterfaceNamespace: 'mu12rv00yldqwwuxkpjsynckmbei744w4u63nmu8eef8uoyl1ykl5i0iadbexgdoruj8le6vdwh2fubjgp5t8vp4mss1vht3hc8vgz3tpuubdob7nf0q8yl3uu87ljt3xdbnt13ck3fosboknp0do08wpko4zbla',
                retries: 6520248214,
                size: 1081997055,
                timesFailed: 5301991707,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'st1pngbpxcnht1t3eyrx11jgqg4tq4ivkxed6e27a7mraeiz56',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'kloym7oodoiwaf3200wv',
                scenario: 'yxye7sloxo2vhkz30i9bmv440qb8so5ln876bfjq2pwi72oadlvvyd1hnmkt',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 10:44:25',
                executionMonitoringEndAt: '2020-07-27 01:45:42',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'k9fdtm82r6jvccn7wqvre46sk0r0otjv22e7emngkanxj51luxsz6xu5ppptdemeqfu823xumuwqyoru1oohoo8ti8nbjue7u2buemha1mjfv171bqjufptl4ey8ngtzfpt6yih6g96jdopxwitybcuzztf6v4ly',
                flowComponent: 'gqroxsq1dew3ngad61raodarh4oud1tsycnoqaeg4a6r5wyblf8yiy8dho3p5vqcb8tc5br7lehc01ldos3h1pb3ylu3gfv8io24ep61z4ryyrm8by0vtya6q9omyd4id5eqhcjcypgpfah80z544umescml3l8e',
                flowInterfaceName: 'aaulb7qsoyga6exve9nqefz7dd81su8t1tz39ld4uzyiii9644gjxipxodezeacmu7ygeg31b7383e8ixnvh29tddkg33e25htz1spyj7vl8m974lrlgbksqgxj6cmeu73bd0tztpf1r9d8vqz8uhy8v11s1nxp6',
                flowInterfaceNamespace: '5gp2idc6vvhvb0wt21uunzo71z6vypsskzopbdcz6jfrqatx4yaprbypvavsrufaeaujktems9eqm70v9mlokgq8ex85xmqf2p85h915eaukxm9mlhyc63vn5f2061tewlvaicb3gashts8mu3075ll0i34y01am',
                status: 'TO_BE_DELIVERED',
                detail: 'Qui et perferendis sint asperiores earum voluptatem error. Occaecati ducimus qui facilis nostrum quasi autem. Aliquid totam similique velit esse. Ut quam minima iusto id qui amet minus dolorem qui. Provident reiciendis in voluptatem. Et voluptates repellat consequatur amet et.',
                example: 'qzsrzwh7oc1r6euaxhouacwhwa1lvronpcn93o8chympf67a8ugecwii67h61p07y5glh59622d7r2wdk38tmcchn91gf4s8aoq3wdsko6xgi9p3sql849rtwjn0wu52g7fqh0mzxi4lomeyw13ow66ex0r45sy9',
                startTimeAt: '2020-07-27 09:46:01',
                direction: 'INBOUND',
                errorCategory: 'z0zp9yz8b83phgp0w4lav1yz7dlaib9q9atu6jh8kyldakn17ovwtuxom4jvq2groj99qlpcjs1go7286at77jqi67jbq0ncube1656dzwbz9xj0ivjz17hoyrcxv6d6i72etc1jf20xkv8fmrfseh5o2yeivyo6',
                errorCode: 'qqm4k04xcwmecb3lzvev',
                errorLabel: 393619,
                node: 8470183510,
                protocol: '7foj4i8fp0u77apz0vs8',
                qualityOfService: 'bed1206ubvri0mf0vp9l',
                receiverParty: 'y32ky6ra8her5l7k96uw0172a14d40jh5z8g3dt24026k2kkpsooxwm2oedfg0b74p43mfa1bl2vf2op2xc1cxmzhmedgld5tmuhyhkyyuv2j8jx78efgcrbcxa7oz444xg5cxwxhh5dy0ex6klm5qi09shtuucj',
                receiverComponent: '5iazjho9qcgdg6oeragiwdchztgqz0g3db11xgp2dwzr9wum7ipfmd0vm9g8tn20paqu67kcfgkqt6cdrr8w2vzhfyzsoxw71qddwgq8jrcxsrfw2pfsh8qx98d5fq1960sso4ct89dxwy0niaqfsrk7ga0jty28',
                receiverInterface: 'kywr5lp7p8hstnpwnqwe09wcv58hx011t3i0ee3a7zna5maii6lxplel1xe1bn55qvv9hji4f177gbtwzq30cyve3ktvnwskwe6f6rmq0l7bu3caxg6of77axaycaqbvo67v75o5uy9b16mo8bd05di5795c96v6',
                receiverInterfaceNamespace: 'bqkf7n7jgkjfrduftsfqwv0nv3niqu3tfv1n2t6jyuo4n3ydthdimvb5shb35a5chkltm4znc41eyb9z1jcu7z8qi75b4ruie641vnn47aklx2b6l4btkqomuenk2uw8h94oyfagt5qmkylcuxni70ibpumm72mr',
                retries: 8576328853,
                size: 7358172945,
                timesFailed: 9928373882,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'hderwmrp0kox9y5axy4nkfgzvnc6fqdisby4joqjjryydha7p5',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'umt1bcojfrdotir2kenl',
                scenario: '910vxxm4anxl1utr18kcmn05a3zds4pz75tzrd9toikt63j4xegzhzvjhvuf',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:26:30',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-26 23:54:47',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'x0g6adwx2et0yjht8heavx6gn7vkvselvob98no6mstj1a0hruok9603mozomka2bz1i7uz1g54gltzdaz2fvrbjdlpl4wvf1zkhuh337pjnm4svzj87bf4kw2d2iweizjn4926woco4cjvx8c5okomj61jtmfa9',
                flowComponent: 'mo5bdsl1nxvfcddnlxjvm9cxcj0a9a0e0zeolnqrgad3wmle0ga2igjl1lu6a46whkdgg7q5a60w80ozh9rgq0smffe1bswosafeazn2vpi8j2a06apicrx499fknum76dn5kvd1xljewke3e1o34juc1endiupt',
                flowInterfaceName: 'aqx6y9enc28tld7tk5upns9r4xz1tztaqrstsldpp334zjxexj3tax8gpduk1198rvutld3lpx3on6u28wrqhrfmj239w8wz9ub0wycxglfbel4bhar2f4wh23oawig9oek9j8p8pz347pjlkrzg5krkwcytm1ev',
                flowInterfaceNamespace: 'n7yfcfrrqjldv3yx8w38hdy9da80qhv4qt3nw0tz4ljzpefdrvt0nwnyiob4evikjwhed7hqpvo4nxz2mvu2hib3ogu3nhcrp1vciotvdqgkjh6xumczehg9q7jq1m6b7aqkr1636wv98bc5cytqqi0in7od4r7x',
                status: 'SUCCESS',
                detail: 'Tenetur iusto quia harum quae et voluptas quas officiis. Natus dicta doloribus dolor magni illo ad voluptas. Ad perferendis necessitatibus ea. Nihil vitae porro sed autem et doloremque tempora nihil deserunt. Quis doloremque similique ullam ipsam et qui natus veritatis laborum. Quasi iure quibusdam ea.',
                example: '9qf2gt7rywkde3pew5gy8d6dolyxyhjq1d4bf8h0otttryl251uyu0xuwkk4yl76iux4d9ii25e5v3dmdvb2wk09vbvcnj7efyclpxhen698yhuuec63jbctidr8hs5o33v6pv36hncs7u7jg58k9ybiatqnlbbv',
                startTimeAt: '2020-07-27 01:02:23',
                direction: 'INBOUND',
                errorCategory: '42fsus5titia4fq78mqt6nquj6s9hrv2oqk25mlhlwwn40z94j62s0d74jnund9c9gfsbiw7oul0ukcir52up6ygv98lwwek99i5tnwvuqzdxzkcln2livwed716pb35t34rv17rnuwtwu55inxurnn4wmed1gqs',
                errorCode: 'm9wadb4m6teakioctvts',
                errorLabel: 373520,
                node: 9398312381,
                protocol: 'om0pyzozrfpbev9j5tuf',
                qualityOfService: 'ozb0j5a0e346c01makaz',
                receiverParty: '0mnlmucgmfpj7t6lv7p3u7oat74sk3a1bonqmo31k5bso8biqf4etbe21qp84fp4cqphzy80fhwquzikl836yiinruirvxq1bp2p1qs9uyywx8h2q5mz0oebgcc9gh0b03osuctat3ekzabw92915tqh68fzcebh',
                receiverComponent: 'tgaam7apxr9ruvia71uv6pk9dbdnp4ol445rlbxjwntkdxg2cju6p3veps21lombr78opm0fy3kq0h71la0wtz482897ibznxc4q7tt9ws1mexbhxg2tt47ga5bx9isax0mtu59j6cco3li0q74o00zclkrsrzij',
                receiverInterface: 'vzoaeymy00yfb55cg4bpd6mbuwuhhau3qsnk2y2zwgou2yp036act3p2shzex7vp99nq2y544k694yca07ig4po8rwou9ueqrwk07ttpollfxv782876a7vvh9o2xbf7x010809khz39uk0fjp12qcp2lkucg1n2',
                receiverInterfaceNamespace: '9051n8n1jrf9a1ujnprow77pwa48pgud4ykmytl3s56u537gvnomahof27nlfgt2mjh6e86vxs7ex91tle4wqnnq9g7eu54ap9xx79i4opab2qmfoya6cvyu5zzu0c2knyahtnaonus4k1g16geaa2ib6zkdqkoc',
                retries: 8569244753,
                size: 2751263654,
                timesFailed: 4274126124,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'qodvnbhl9r6tzuevdd5gzzqqg18x2cpfuw14kt5hx9jimcwkyx',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'zel4n6qq6k7i99vlp447',
                scenario: 'sses8jk1f4nmpcmfisixn9ksmkgsmlr23b2060p80ncvcg99nkptcn50gajj',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:50:57',
                
                executionMonitoringEndAt: '2020-07-27 01:40:49',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '9vod4nx67pe20iub9vgv14bwmrk8tk4vppi0wtdczkty4fqpbou38bnungen4t2xs45zlqdk2zv2bch17odd3nn73elfoxfxm2i5qzry98senxiyi9rr6oh0tr9euvvo6r8l8bb9fhinqmffftpqwjosze52enkt',
                flowComponent: '7l9xa23upypyzrj63v2njaitmj2xnq0nfozebant73pnq5iqeivvozy5jmy6q3eq6evf2n00m6g69nm802bie3kfw7gncdbr24dhkc2bpc05uk0hf8klcjnb5ley5g8h4zq8gjx36vrxctbq04kxuqyk76077jph',
                flowInterfaceName: 'q1n2wvx3o8aktf8xukng16ftaz5tu0newfq02hns02pdzyen76tduq2noxjbx4hm3b6sx0f6rwwg10uc32ro2iv9qasf9v8wak2x17fg8q35i2q4icx0zx3u2373u55cwr0hx43z1xoa6ejpluvxap5mdohycb7q',
                flowInterfaceNamespace: '8zdxcbjw9m2348wiy6a7te7imaorhpbaf1csep9uyk3l7x7vuib9sn8bzn2e0crqzwmzajvkc00knxd8tzed1kdrg36jjw1y5ptqmi49645zqbxlgzr47pa96f6a06eysbf6e1xud9f3egqbxpjcus4bbzdc775v',
                status: 'CANCELLED',
                detail: 'Architecto ut culpa. Accusantium temporibus aut aut quia. Recusandae perferendis esse aut asperiores nam repudiandae. Ipsum adipisci et.',
                example: '37yzzzbone40eohpy8vrk95nq551x9d1niqzu2c53ss6veh8p8r2lt7vlsbnp2mxge1phz1nglhw4qqegxdskdzjayhn052gg9snuoynof5rggt8rnuuh7qj8hlcx1gyzivf4mmhteiao87efcovd13mjrqjmjf0',
                startTimeAt: '2020-07-26 22:49:26',
                direction: 'INBOUND',
                errorCategory: 'kz2rn7ugdrzg7nffjg10vlgltwklk35smzyq73gon5niimw307mia7p6j7i4daqs81fqinxj28u2bvrbsuqxy7u83ii5xxubybjnjxxeqvfl3pefo3bj32d00k0tj099wz6e8o2pnbngktyb4lkbd0orm99g73l8',
                errorCode: '37r4ds7apho8d8cy68v8',
                errorLabel: 776666,
                node: 9417880766,
                protocol: 'gyuiz2osfea8ui5t11im',
                qualityOfService: 'onmkafw4f11whpdac31e',
                receiverParty: 'yqr49ruiux0o6g977rmsqf495pw468apushhtspgu7cmris5dksl9rfb6vbx5scug1o68sjj4jq7un1r1ctj9t9c64g4uxnl7m9hloqhtbnwdbmd9h7jfkmxdn5367adhxvwz3zm0v8yeftb6il3ywasllbxpdw3',
                receiverComponent: '4be6f4mre64j54gwnuh4i5yx8yhosng46vcgjxo3t3kc195bd7n6facsjkgr4zexmvr0h00ky7x5mp7v5np4utarx174hjrtsmhnpkyuswbpucuk65n63mwqxfx8e9yoa5i8a2gqw0e2to40lzig07kkb1e0g1x7',
                receiverInterface: '4nyd76u21hqs2fqhzxz92zfe74mdmn49buui7wdig537lrq580rtfe0akcszztcckwfiyr3ani8jv6v8vzj88lgfka4t99vgcg92oj0pvwx9qplun9zdxjm9rbno3xp3ay2znkwxnietg33ctmdluqx2j2f8rvwo',
                receiverInterfaceNamespace: 'r0vvbd2rxklbfi0nxt3rxnav75d0q6q4d0g62wtmpgzcs142rvzko5qielsfbb1xzramb4zmoelruikzdmrhhvjksucnf1sdemxergebuymqe9hprz02xm1oblh86rfua65u7jkiur2ck9rg88flkf5ibs1osce2',
                retries: 4257988579,
                size: 9419624001,
                timesFailed: 7579384722,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'mxunqv8fgi3fedliphg0i4eb9x4ag1monjwh7pkpie5ltq2rar',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'doln4yssw8llem329v3n',
                scenario: 'kevw4eh4ywhyxw6am5t8w561celufqhjklzb2prqcs7yqxg9dx9tegcoj9sx',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:04:53',
                executionMonitoringStartAt: '2020-07-27 11:41:28',
                executionMonitoringEndAt: null,
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'jpepzamh0ll1qsnghigqyqtk6mocu0fr3lpd2j5tn1aw5fd1puy6d7kapjpcmp7tcl0xi8t9tmboklpgu2rmlkw4ttx4g8dlts3jq7nblhj567zg9g42gf8yxbgvp4oauicaig34tjdtq0xs0evldvp59jfh6w1e',
                flowComponent: 'wr2wyfjqme6ecpvxtg2g2m79ee711wh79yc2p50d7xby8gnd0v82b75hrczix5lr5fmb3lj7dd7kg0ol5b4jwa8yxmebn89ueo8jhuzdxxr82s3i4qyrfyx4i0zhzwovlaywapfymfe6g8rkz4nd1vazxjtmmysl',
                flowInterfaceName: 'mn6n353hkc6lpvujf4xcj5yyf2gwlmw164y5xlxjsnynwde23vf9fzbfugym7nv5qhss1fz1zrkdxhjqz7skba0n00suxdgfmd0bd9wjb98u5dn4qpn4heaj5zo51m245vgqfefjpqszpg3jzymsxmmjisya16sj',
                flowInterfaceNamespace: 'xbduzjl38llayqrtdfh9vk9aca769icnx5rscar3wwtj24xgpernolwpxzqectjyo73ubmzr7d9icr2ur40e8vjs0onuobzwewzdrk7682z3m2yzux0oot7prtkyd0twoqvsz84m750g066gv4lq9bgmzn8bgajr',
                status: 'SUCCESS',
                detail: 'Qui et odit sunt asperiores qui culpa. Ut earum non numquam qui. Libero similique adipisci sed soluta deleniti et porro qui. Mollitia molestias temporibus dolor quod ratione. Sed doloribus nostrum quis culpa cupiditate.',
                example: 'kas4uhh0ga1dbqz41r7ru2aj4npdw9t8g7pp77styuuh37uztn87k8pzeyzy20qtd05zt5qfuemie4lqoty0fmp4g44ybjlxdi0d7mq1vzgr9n52x123a8gl80lbk33gvalvwtmqlvawkfbmhhqsy72cwgmpmamp',
                startTimeAt: '2020-07-27 04:41:23',
                direction: 'INBOUND',
                errorCategory: 'uyj5xjyliz6dn2nvvds0rfdf9m1i8if8mur0uh7esa5gx6afq2rddh1rnsqtdzoztmyv0fhdcuinvfxwevckazmumas2bdvbmqwklypwut69qkbb5u6nzht528xsyg8m9lnpnuclrzh40pxim5weto0cjb1dr1dw',
                errorCode: '7g6gwletz9p1y3kq2r7t',
                errorLabel: 110370,
                node: 5350723664,
                protocol: 'cz930ipj1pieuu9pbmrq',
                qualityOfService: 'u1r6kw8olnw1wlbu8jwk',
                receiverParty: 'ntoruc6qxn4066t1nnivcgfrqpw0wo0uii3qqtgj0vf8ou90zh2j1j9zueht6wnuo3i18pma5m9rfdu6jzs6t5wb83ve1gmuwp8tw0fvou5z5ugrpdbzbpum8ph4qi1amhzfe0yrnvvlsfospt5or0xpdabcy8yl',
                receiverComponent: 'kqbr68hkfxozycduigkhfi98g1r3sk5uin8lfqllo4ans79eibxsms54llka13yny9gu4ytysfccmwzyxs9ij5zuej7jf99otyx1f9a9nh1idqhxs5nw1b4prklfsom14ykle36cnx13a895whtdqtz5q6c18tyj',
                receiverInterface: 'u0onvy66x698xehys659z56ly5ov64qf1ztu7ijxrdummbw6hzya60osccojrs4g86azrp1dot515ykr7gzi8mbm7nrej1qkdcgz6y3g6sy0h07co45i6ujvlflnrjupl80xy47rrosiwczgfpocqe557o7e9ba2',
                receiverInterfaceNamespace: 'vzy7lwhovjxsogpve6789w32rhojtg7q91bs8unocer94hitbmfc9wv1tnhnk7a1qmrmsq78i75e4hjlus8epgp2vvy94pbkypo1kmtkfxuy19zuc2zujomazn2q28dwqdtdhjd7014653wz3rddc68ef418fjdr',
                retries: 1106294309,
                size: 4394614559,
                timesFailed: 7716740459,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'hc3heam0ceivcy9tkveo6y1pt96xq4v2k5c5qsz36hhu5nqf95',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'iiz5hxb6kmy01c4bhjzt',
                scenario: 'tiuzct1d0wz5yrgy295ypedhdhhmb3b2cq7lnb0i9nkwfdy7m91eefiypjiv',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:52:38',
                executionMonitoringStartAt: '2020-07-26 17:52:31',
                
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'qylx0jcf6l4m8tuy19v6lajmn2s3cvvg4jnhbe70kretlny1whgw0zglcl72okjnty0pqufceei0k24cqtcn1pd07m3gtcv4s3af4w4dyj7p3ygaixoca23t12aextbybi33glwayablnfg7iss3plsswv88clwc',
                flowComponent: 'knym9tii6t8jftitszl09uglwev36oqm1x8ige3gtyc1ghrmht5dw3q5ksptvi12tw9c5h4r650k8l04wde7dnq61waijxfpv68lx5a5vn6zfxtybga9s178qewswlxoebl2sqz00uano0ulnyxtks3bmrr19hxh',
                flowInterfaceName: 't41dre7c7pauv73t9enamx1wncnmzlwz681g733r8sh6ua2p0wux1c6vvtpaif2k2htq4vhcpchmbei6eoq1kb3oxhz0x25oscy9m548afcx8itnpj1lhqd5krpzqd3ol4fczaevsjdy14tpg14butr7hzcoqxxy',
                flowInterfaceNamespace: 'zek2wsebn8ky3z204ifn4e29okbe66jkllm48s4irl6527jlxlrnzwnkgmwgdr114m601075hlmuguixrmd53aohnft2ikfodc6qsl4s7nr425vldtf9gx9hp5yt79nsejlue7zt7ghl2x4f5wof5idnls5fiaf7',
                status: 'DELIVERING',
                detail: 'Error officia rerum non exercitationem consequatur molestiae. Consequuntur eos quae reprehenderit quae laborum dolorum. Porro mollitia nihil possimus ipsa.',
                example: 'yew1lxej66tytmkup6v9xf5ftfic1pq14t5myhj0p9ytjm891nylip4i5c7bg4k4v8xudlq26jg8rpqac4il63oj9m3hazry47vdjw8qi9m97kyvndtputwipswihndaxipupta5pmcvbrdijvbt8gj7c1kmpac4',
                startTimeAt: '2020-07-27 13:10:49',
                direction: 'INBOUND',
                errorCategory: 'e428kzxkflzsl7lu3niiga47d40qr4ixe0oygtqqu12t26vhcvp0ipj8sz82bqol805nd95cg9sjkikknp1jo7qzxj9r8d9tlixeclhk1r1zj1o671fax2kcikgvxu1fj14z8ltrayfztuvx7x6hqokq0c0oflkq',
                errorCode: '4ding6txc1xjoy6q3zaq',
                errorLabel: 968141,
                node: 4223175989,
                protocol: 'xgpfpxl6t46zf8g5e5uf',
                qualityOfService: 'o9g8s5w5c6vvle9gl2yh',
                receiverParty: '4qq6m3ik039ezjbtfwgdz4cxl824pexutzdqctyylll6hi5lfssj4gxs4f7pt0eqklmphtjovijgosdboqam1ajbnnamq7i4hg5fb4qo4blhfqawjl15ne0kopyuhcys1s9ysye35wk6q08ex319w9469vb74m6m',
                receiverComponent: 'bfiz5oj6hwc6k9l6il7sw84xmu1azrisg1lnpql0wccj34f63c93g1viwo400v9xjtr4vbsnkqjahfz5v2ybr5qm153kv0zq8bljwzortbgt8lqgwwj0zfpio6art6fow7onbe0jszri5wo6bjpx111al6cfhcvg',
                receiverInterface: 'hp3xyvpmh5gf6jpb8i4jf669dq4sz1ss9uvmrofvnz3gyvkmnfr18x9ktizwqyq8flwdjif6j8u3pinjnot9iddnapdg86ienjzd1avxea8euur4oijik8m3q11zhyq8bbljocgylrzzgpnorz92wdghyiyjfhyh',
                receiverInterfaceNamespace: 'vlzl202xrw1lhg55164nlkghexahydxxx0j0d1vabby5ghn2nw66ktdel6fpj534v17428rcmzugeyxvw0jh7ztz3klw1sbfwo0k0a88m4z25c8v3m3nuop2bqahezzlshcf2ooz99z37jcadbwplsy0dek7hvs7',
                retries: 1715254724,
                size: 2621852807,
                timesFailed: 2195857627,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'uivoqdxqnuwrv8y9q39fpaiq5j15oki1fnyi65oycjgxva1fwk',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'wtldtjpgdoldkxyi5h6q',
                scenario: 'ga2qcme2d1yg7dbkaqtx0v9tkd55wpewdlkll3d0dbxbcy0qduotr2poy6xa',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:57:02',
                executionMonitoringStartAt: '2020-07-27 09:00:54',
                executionMonitoringEndAt: '2020-07-27 11:32:34',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'eek2uaokex92be6jkgcz8zi3qyztvi080mw9hgwy9q0ykew5cfyj2ott13xecnh961rsynbe7iq948sk1i2pxjoexx46mijt5039ec7kscd1967bf8a7102nn2dbnskma0f9isj16xspfsae6n5s5wa5ex1qyx0k',
                flowComponent: null,
                flowInterfaceName: 'u3hp7w0l7kof8k654nylw7ck7g22f9ccdukxvsc1j7fduio20nevow31b495rbslbjsq6jwlus28e37dv5bp8855npst3unjxztu8h04xbqv0nwm4awlq08gftjds3g8hwgwo4ybayzsjcxcebl7myv78seldp72',
                flowInterfaceNamespace: '0kccfgtrja68g0xab4worrqx56xligiz3ssaul5xvyygpivsg5m2wgdrp5w2pwybswb4s899lvzfhy3hzv6n6xic1iz4ag7fmxpxbvj8gdf7vxud9oee7ab1a4uantn624yhg348bub4wbc2lchbjke6128r5rce',
                status: 'DELIVERING',
                detail: 'Repellendus eaque nihil ut rerum ut non voluptates quis. Voluptatem quasi ipsa consequatur molestiae sed vitae impedit tenetur. Quis quia facere. Similique amet sed ut ad. In voluptatem magnam saepe nesciunt aut quis voluptatem quia. Voluptas maxime adipisci nulla est quia repellat nesciunt.',
                example: 'zyhj8xdhip7exsikhcul07iew36puhb4wovfumbytc4avcvn06lzfs5xkmmoieate99ll888y17f33alhdirm90nqt9ihx55tw4bee012n69ur3v8zcywwpu06bpzobkve2mpwnzn0j3g0jsi9x64eqh0jraiy8c',
                startTimeAt: '2020-07-27 08:43:43',
                direction: 'OUTBOUND',
                errorCategory: '10935qf1gtaopghz0aigspaq3t4i596igd061abfain7gc01ad0nz4ucl218hwtb9m8jun5ccvx9aklu1gmlfc8h2aji6l6e5vstnu8vok2he6qchqukpnq4k2dh80ia569z8j64mgsqmqchh59ndhxioz5uwbnb',
                errorCode: 'de43ptbc0r1u5je0zudj',
                errorLabel: 535012,
                node: 9734458298,
                protocol: '5d42xlb9z3r6165n5ue6',
                qualityOfService: 'vziciva2djydctyjhb87',
                receiverParty: 'dj23u7ck6615hl8plnf0us3aegydada7p5jmw1vtybdcvlngu8ybo6j2v6galgar8vwmeq3wr6ic3fn8zy9srud8lykimym7s3qpe7xgf81gy1fnwlode3262colpi6804iszxn7diofjchk8wn7m7momph6g25j',
                receiverComponent: 'woj06k72hnlmbnk2mfb8gsrplkybqh62spujsdu44gtrapogbo439sej5eiifd0bba9camsisrnlroznvnviia4myamrim7lvpkaropnagaabw1m120qoldi3pdzc2uj5vow55g7ph2gem0am32glksw5iakseli',
                receiverInterface: 'jxy6m2qmln5v626y4h6fxlzsoyfzx0xonrzdmgvynkzwv6ukht1k90rmlbx5r9o8pa7oenu5liiccqnk3qsq2odfsa22agxc42i88tk43nfglxd0aptqe6sx9ghh6tij5d6ub1laqltn3ecml0rtuo0b64c1dyow',
                receiverInterfaceNamespace: '3g4bg9p3gu3q1z0agxa6444qg8n82hav6idkae1tqcg47l12km1i64g29fu93d1k9nxneyb5nzy29y3jxj4bl52qcyzwsx3x5dmc38lsgfc64b34iuezxtan1n2htke252v2ekglzeq9tr55oud1ridklmvrol1k',
                retries: 7407981024,
                size: 4784915724,
                timesFailed: 5549709230,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '7sauy5i8775nez4i7w3jt1euzlb889erpedr91eztrbvp7i0uo',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'ak51yfrk0pooj07c7shi',
                scenario: 'js4xqh66icziy1h28kwe66pww6b9x1wazfqsaxacw3hcjqhxvt9suopn9hc2',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:35:58',
                executionMonitoringStartAt: '2020-07-26 17:40:34',
                executionMonitoringEndAt: '2020-07-26 21:59:38',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '85z2pqjg41fowakajhhlg7bz6ve28li5sek02vf56hh0dnotf2uu8g5brmcj723s3az0s64yzllvyy0lnmx6893y8gkqv64t6s9o676jgyr00b34z8zkxoosugw17v1rnngfhs3da4hdb7g3yorap672kwyjk5qm',
                
                flowInterfaceName: '65firuo567kp1ys08ewm4m5k6uz2yks67bk6nwezy0pui572m9mwmzypx0d4xgn7gwbpdh1lnm56cobj75dm9gays0zkeqenf1ehw1l8dkj5iuj7ytjcr4kxkmrz36yef7qj7yuiv63amrdru1ixc872hsfsp2tv',
                flowInterfaceNamespace: 'oekz32hsztezhtngfbuhrms465mvay3fcss6agzkdls5o2vjxpillvhx4dd7c35th2gb8ui3q4nsef2bylgpgjd9ir3guaqlfsdnja5btbq8fimqlc51cikhj5nevwapson009gnuppluceieqd053977szi7t3j',
                status: 'HOLDING',
                detail: 'Et cupiditate rem fugiat dicta autem nemo temporibus id beatae. Adipisci accusantium voluptatem aut quibusdam. Rem ea et facilis tempore quo consequatur qui. Accusantium hic quo enim beatae. Quos voluptatibus aut est vel expedita quasi.',
                example: 'lxf5z2umsazysn7apmrg3fmhjy7auur3z7zbyeq5749oznb8qmyzdx69htd1a5pth4223eq8nb72uhziy3ien4odajn6075lnsd7kj28kx1omci983thwfu8fl24j20q1p1yuxmdbqgngm9rp819tk3vrz999ocd',
                startTimeAt: '2020-07-27 05:02:05',
                direction: 'INBOUND',
                errorCategory: 'hcq0vzcqpqzra3u7j1rhwfn12hwqwzr5uxqipsrftlf05wj72j46jpjtqqov0bc2idxxuc46d0dsaw04ahz1gmca9dgpx8p0fe4g4l33gp2keykzpaccugokzqt55ar7ncp9ymcsx4vbcdmbdshrp3qcs9yy1q7e',
                errorCode: 'p5ofnke2yrk2mwewvmzn',
                errorLabel: 827309,
                node: 9733968944,
                protocol: 'aexzc5yo0d532q39k711',
                qualityOfService: '5kdbpsds4toyl2z0lw2b',
                receiverParty: '3ahmx4w5hu6jtpkj8wzk83bea80cr0pienmt6g1w182cukmtno4qy2pedoivlcpgrgc3fnrsofyjm3mx743m1wkjbnpo5xprmy760er0mx9zfzuivm479t12vuaa7xu5ali5w0tj0qzazeg6cngnn31qmmo3aj8t',
                receiverComponent: 'tcwpn2miewduvs8gnjwizehw9rbz7jcs3kqmdg28diq3d691os8wrmqgfzs9omk10zbk6d6yeenljpnoihi1v2uu3mz67g4d983ku5cza8x7r8g22hrzdceiw16bggy6qsb4r9r3362mf2ci5h49wbos3xdgudfn',
                receiverInterface: 'd4qxrl5d6wp0s76rnwz35sf582n71ryg4g26tid388i7qgb4kt35fryw99ut5luzqz0qrkxq85izwc5zcf04ysqhbppl6i2d1froerg988lla6zld6k4l11j7tphrf70ji1tib66vr3faskkpaaeay71bgnts5sp',
                receiverInterfaceNamespace: 'pf7pzahe6m1p1zcj6drb0n9788qz98rlkc7trd05rfyo72u0poeqr6uv3j0pp4x50w792gyxvve9y6x414slccoo9rsyo6z1j7yejyrkhdmyrvowsigrkp8sooyp0dsklq9dsblha19yqdig57p3frdlb1gmxx11',
                retries: 8264227715,
                size: 3991669834,
                timesFailed: 1616757376,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '6sqjq8sso1u8004eh8208mu6mn6rjzrrix4it77bif8q3sjez7',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '30k5x9y8aamcyc10fbhh',
                scenario: 'xbx0r7fx6q01o67ecutit27go0e4phrf9x8kd0lcl2157dh5rtfb4e7eycux',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:53:10',
                executionMonitoringStartAt: '2020-07-27 05:42:35',
                executionMonitoringEndAt: '2020-07-27 09:33:59',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'jfgmidkmozm8pjij2nieav3jka5mv0bo7mwl5npx14f9cinoygxomhhnrzc8refioxv55rk69on7qgi493ialara5cd7pkh9s4svuq8dtu764htumtgcl0r4p7rcnxyufkzyvohwc7s7tgu716qwm8kxbc8huslt',
                flowComponent: 'vkdtoqk28h40m9pgemh5dmmcimgl0nmsczfj5et9rwkt0eaxdo1mcfry6cg5hlca5jkfzesbc0aucxbqmcoi8pzi9fbolo1igdqktg4pnhn4j4foec6wm0ojirdx5pyz3qq2moq3l54qunjnp7n4djp6f7ly1yey',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'ij0kfw1zx0j71b7c2i5bulokaih8migpymn7ii6sgds68lezzhr25vph8evtuwlxtg3d3rt2neeoxootce6q2bkregfgxk1v83xwi46tn8518jtetutq9v39o0vtqi3burz4q82k96gkmc3iogk01cahp3g268v4',
                status: 'TO_BE_DELIVERED',
                detail: 'Consequatur odio soluta occaecati officiis. Eum totam consequatur sed sit tempore totam expedita ea accusamus. Necessitatibus aperiam maxime at sed. Eligendi dolor dolores facere alias totam quia aut esse sit.',
                example: 't79qxdln3cjk25p4p20rc7pv8gg6narokmjbx8k1capih71zuolrnnmcho1jex9r1g793mu4vwe2oh04e5bm00t8o6w6ce3n3j8qkms7qp7fepclngc5x4zpj3dgwhe85y36p6pb1cpdfxzu2o7wmdgk1rgfn9y9',
                startTimeAt: '2020-07-27 12:05:34',
                direction: 'OUTBOUND',
                errorCategory: 'av7aouzw5lzi9ajcnzzgblrzgemha4zoy2fedudj194p2uyuh83w0h58wooedjj0wk5t6hwgtqdlt4svd3ctjv8rgicgzrw9xtd530op04d4rjtogcqzdvknke4cojr7gopjro8n5590dviaxy2ju8hiecx972lq',
                errorCode: '5md7wbctu2i7181r9tvu',
                errorLabel: 992256,
                node: 8786595572,
                protocol: 'sppngm1z7y5nu685sp8k',
                qualityOfService: 'ji6057ybdseo960k748t',
                receiverParty: '832qao586q9b69t89vbv8elpfy103hhwzlvpx0su4kwxkubydgyv83i9741fhko5y0qd5snkkmuik9ikbycj42mefiowfa6fo8v2cytr0iezulw2m03s83n2ewjguy7fw2mlqatdc7kysrgqmrgm7o28lqtcs7ub',
                receiverComponent: 'i1oixiuod64xljnnqkbc4reynp9xcvzv06qnm56diypfrukp169dqomkc699pfoq7hk1c2996wtumkt571t12jqs433gk9wbawkhvla0k7xx4nt5y6o11ox4qhge3rx8flb0aav4x5xcrn3g1en2rsk2il8puqcx',
                receiverInterface: 'wg6i2dg88u5y4d6fpje5eet1mx1ajcbbbm2wnb05ro09okog3j1kavvbqlh60p116hwm32fy9beeljfoot53oq9yy6c27w2m6rkp16s1r83280lp632sgwsdnes9chw4vu6z0drhm0009o0bzs6c6hxg583cpyal',
                receiverInterfaceNamespace: 'qiimgxexl1lbomic121r59s4bq2bo1tg2em2o3isjajzi8tnr2bbwwoklsrkhugncgidi1h0l42z27oolv17cvuc1ad4q0if4qrz4il0li1vuz01q7vysd859dhgt0xhlhpqpbkykxzhpz6m0brmtu3p27odl35p',
                retries: 8037204405,
                size: 8505976054,
                timesFailed: 1203506810,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'mlljbvo669y162hqrctpgqvdez2ceen3zmrpgh119c4ks9ot3s',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'bn12qawbxa47fwchotwr',
                scenario: 'lfsbhe1l53xkz4bkjg0zcypubvsirenh0hpm3fdx2obs1tqcrpio2x7tmfkq',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:24:58',
                executionMonitoringStartAt: '2020-07-27 14:09:50',
                executionMonitoringEndAt: '2020-07-27 00:25:53',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'xqp8sih0iju73odw7v3mtixltgliquplblniz5x37xgh9efrhwyb8myie3npibro51cvqbqn1nd4q8z033nhwug5tl31e63bilnqx7ovo2vd6jki4yrw3rw78biuu5c2wbwwjfa34a57o2xqfezf2hihge7e4n6v',
                flowComponent: 'qd4oo6kh3e2hc5b4lj4d01r5szg4u1q9odu9g1iwaynysv9p3zqwu8vrxfzd215vkf1ogdht8iflk3oxdninz7izjdo8hx5ntecq43kk9ggq7e1r92whwx72kocs897ig9n19gvr9r8p3vvnq27s7qg7vdo2mkz6',
                
                flowInterfaceNamespace: 'ux7nx4a3lg0ininjf6sokh0c697cw6tfr8wj0phg0tendhrbv0hme4nmeorpmunn4nxjmrjo2lq2mhyka8e1a5zjaykuscitodfqplv2f4j9vb7zuzm9beh53t73l55fm7lzoe39ayb1wcbykxccvd5p0j9eurgr',
                status: 'DELIVERING',
                detail: 'Quibusdam odit quasi neque iste. Eos architecto at qui. Mollitia iste iusto sit doloremque. Assumenda consequatur alias. Aut voluptate quia consequuntur voluptatem enim voluptatum iusto est hic.',
                example: 'fldx0658xgvzsuv1srfme53qjixt0pa4ho7c3m4p2fpq99cyxbi53hzm662869296z7ruwzvnoxhu7f9ouc4m3ll0se3xmj5aj5asck78ttaqxi0x7v251pra55ioqcdn3siff8kt6shx6y2irxxo0pcstu7s3ez',
                startTimeAt: '2020-07-26 17:45:33',
                direction: 'OUTBOUND',
                errorCategory: 'g8gzxo4huqztjgs4h6ksrrkopte1or1ka8udr0fxavuzut5zxqlwanevglxwpncrl0190ptln0au3djzwrl4p3c5td43uspq3vokvtc4dyjwob5ezclb6kj6qqbehfedbyualz3o0l4e5uhy58w61qxpnypfitty',
                errorCode: 'nv62mmbxzrbiara1o8u4',
                errorLabel: 300215,
                node: 9082211817,
                protocol: 'uf67cyskslqtqee0tbt7',
                qualityOfService: 'w98ckma246ennqtf8kmi',
                receiverParty: 'ig7gklqtixjzos5fi9m6rmp7407f300qjb2ucm3u0dhsb9zd83ypuwtpkqdcrql8b42a8ocniimb60wjq72i3r96y16lnuwxdhmazhzzq8sv759m0ysfbulitvdpyxfisn216zpb7e0ppqr0oejpcbostkl5x9j0',
                receiverComponent: 'o9oqxwz9k333f5hav5t6lzw1xjm1tlqwvjwqx103p64h0bbx4v8i1of6e48c2vms9i01df1rqzfmb542pge9j5pupzd7l0lkv9ykr6p7oda1zcff06rg35o68jflb6xi8onyuf60lywqudmf3bot79p6n6lzt1jm',
                receiverInterface: 'm2u06ee4yxq3py7deymwjj3auex2qiwiz1pvd5yp5c2kfemp6x862tjq136tiuidg7i1x5f73zejkxv7uiugnrl5h77ylyv2tozt5jel1iha9tzzhp9a7a5acvd9lfbhilxclvni6jmnkxmo7aevf1max7nc0yes',
                receiverInterfaceNamespace: '0wqg27mms1r99ibeh8uxqmofg8kmlt65e4m1b90btehk9zc29hfw4kynq1nb0n1861dep01e2clhzfhipmtue04w3xlwe60lsksmzv6vbz7eelkqfoet38i5vug6g7r8t9e7fpxh2y16wx7x3nod372qpuub9fe7',
                retries: 8122624376,
                size: 9604578939,
                timesFailed: 5120208102,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'e6kauo8jke7vusjan1yiojvozyflt3h25ofdghd77d5y6he419',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '0rd01u0c5fouons6yez0',
                scenario: 'yxvw2ubuxwlatockpg4fk4c9yww0wbygs476trclklv84pbrl7kxdh058cdp',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:25:23',
                executionMonitoringStartAt: '2020-07-27 04:10:56',
                executionMonitoringEndAt: '2020-07-26 17:20:36',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'o2ibwpqm3db5zpwlewd5ke2gvpp2umjcvj9vv1sc43ktomm2bs0kynh9539wwg55zxfw8dvno97kdjw7j8reghuxrtpk1swzwc6ifrheyypd5k5glkho0wfqx09bidwo68ope45hcjh0fbd0uqr9s3v27oqoxf8c',
                flowComponent: 'ruyrvp4lpyluu63ktfv7f6lcwgoesye8i1fp4i29g9v5ig0rymt94s06747vy660tlr7i5q96udo16icnh7a1ci175yubbg4v2zv6butplp7not2onpg0pnup8peafuqde4gve33eg1lr9lxkblt8is9glm86osy',
                flowInterfaceName: 'sg6hmcqz7i6r81l24x8xa6w5729iwylr265bt93ian7szxk0lgiskqk29qbq3rtjez2qlwzrmg7c8dsmlm9dn923twmnqo6kqb2h2617ccejg8im470j0qorrrxhyv1yaq9bgtrsf0hk7zfjbi61g8w63t5mqhs2',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                detail: 'Harum eos quos sequi id unde laborum odit sint et. Ut eligendi ut laudantium. Est quia dicta ut non et. Inventore ipsa perferendis amet. Magni officiis soluta possimus sunt minus.',
                example: 'ueo8h9uxh1kkc26274dhquq2dv53ifu4yybi54migdves734x99ej0zgan8e5j1a26j4l0igmv38d48udgp3tq661a25ci7vonfzw3bmywfj4ekh6raxa1c8gghe1lvkb309meknyw920i1fhcxmsifyoqqw282v',
                startTimeAt: '2020-07-26 22:20:28',
                direction: 'OUTBOUND',
                errorCategory: 'fm3iltzhdtf6douom6d1i0831xxw2qmg8wks1no821jcrd88a52ivxdsl5y288zbpvczwmhj3dlzmq49r5qz3cz56modydnm27tscegzmi5x4dbi1yits7duacanq8sp8lkv4tsfu0e9mdjflb1pim27dp9sm03n',
                errorCode: 'u5cm68cjh47cxmhksnqt',
                errorLabel: 546072,
                node: 2346268438,
                protocol: 'fil8y7ugsxbgylh0jr7f',
                qualityOfService: 'e6n3fyo3pbjooma26q3b',
                receiverParty: '0123yw8dorr0ute6rq4qqsjpds4ph82gbaulddouxadvgddtea6df0mclblq945mdjsebyspxmbtn13au8wcryxpno93euj0i0woz1pxn247e6jsdrtdzip4xz2mwruty7sk6hvwy92hfmsk3j8b75ixxyp78wy7',
                receiverComponent: 'u4eky15cfys53pnqkugz70rw7l5upegtj3ygt1e1gxih2ldj8wjyzonnin2g286k6swil2sdlxwyf5z2t62b5es54fc0u8omr9ubvr2e1oc77rkckevo4rqwj4bnuc045bqzrlmklq9tu33kmrnwkydd0a678r3p',
                receiverInterface: 's4iy3p2hysqk3abu89ujsk7qd2c31og22wfljego5z0sxeuf16udm8tlr319i5ifkn5vnkh1774yq4rxea5y2pzwnjt6erlmprpsri3psm2tt67aqmzsy6zivyzl6emqut718s7mhwwhpo2fvzl1h6j5uq8xqvdz',
                receiverInterfaceNamespace: '8r05bdcrj4jj3u6y7z8sydh1is0dw7g8ho78r4zsh9x8nim2obj9ln0r1l7hlwt64f7mta3xrvunpgp63p3tinbjm26io6ftncpr7a37q2rk1oa08kto8fyzz9mrwf3e8qje6r5ce41i48t6t2jasd2hq1rf7tkg',
                retries: 8549179791,
                size: 7928469049,
                timesFailed: 7252147282,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '8g4y8dnroqmxzp4nm3chkug3434xdtv63djyc216ujyuplexis',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'nd7cl8rdidawsnfq0zch',
                scenario: 'selzbnfpf6zeceldq3bh8ynkc71fkebbxakh7p5258ogfyme5ec9l993wpnz',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:15:04',
                executionMonitoringStartAt: '2020-07-27 07:02:53',
                executionMonitoringEndAt: '2020-07-26 20:51:08',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'w54imyjdn7h4al111d8f6wxppdugh616om78g38pjbxdj0qp639a32sfd3t1t8dug89jkc9djkiojmcyc4ar7jj8sv3w4q4don4bdhzx7i75qsb5cq23cifd7ywn2r7ddrdw28qq9cxume8k1pqwua0fmh9cbt17',
                flowComponent: 'zqfmbwadr09su8jvfthhbawbyqw0eoe5u5cauhbk9vtdvb6rpykzh1zbfa958dfh97rzbldwbg4feswu6e86aewmb5jjvzdsg8gxgt9hatfea30c619zkwg4dqsge3fo97gjokr8vznny5qpre6tn7n5ufgbkx88',
                flowInterfaceName: 'cjw794q7aryrc0cd1msmebuxoxbl2v078jadz39kvvpwmhtd6dkhcttwn8j349ii84sy9wb7i3dzujvy0bh2eaatoryppg09sdl5eg2puqwd8oafh5d2wkotd17h14vt0vo8bwfd2jtgywutjzkgl8kjedjkk2ze',
                
                status: 'CANCELLED',
                detail: 'Pariatur consequatur consequatur ut. Sint quos quis consequatur. Totam totam eius neque dignissimos. Vel consequatur et assumenda et debitis labore voluptatum ut. Consequatur delectus numquam quos.',
                example: 'wieic0lng031am0jaecnc6tgeotxmmqzbx6qn5t2kj3l75d9ksc4kwq8u25xbzwzn71cvreows4x2sri6868wmqvx4dwzncftai8b2ly7sqao8tkw1ab8694yuzkozfxgbdzdeb3cz0xqgzetchmtekmvjfbchuf',
                startTimeAt: '2020-07-26 17:18:29',
                direction: 'OUTBOUND',
                errorCategory: 'uyx7eo49ud0qykkgj3jyrmljysxvrq24bnnn6hcizw36xvsy81lhk249sesn812s6phski2acm9g4czrwm3l1hvoj22olw9h5h6urybqboayjex4d3olf422puzjt9z3isnowwe6qgiwn76qfsrucqmx6e4d8czd',
                errorCode: 'wc1hlhkt3vng609hpa4v',
                errorLabel: 649438,
                node: 7288689935,
                protocol: '0saz70pc14wr6t5b3q31',
                qualityOfService: 'bj6gem53xdhudthkauhi',
                receiverParty: 'pblrmwe44mvh8g0sw6yobjelllfwehh2d7pqavfmzvehhsgk1xwxp4i6sj6iegfqimkrydhgp8tavklild5kaujs24xhg3rkmpta9ecg4nf6tfur9jzndz2gzqop1eiuxxtu7min25v18de6j0ubpaw1iufd9ffd',
                receiverComponent: 'tnr0uatsyeyy8dzsfv7bcky0k71f54qyq9wadl59e9pz4jp4yl2e40ylmmn0un1skpfkufigv83n24zqv2zuuqlv0obf87ll2s5ad6k6th9kljlco7h6raw9hv1bi9eowzphas7p56g3jlhjxjdtdht0nt3kchqa',
                receiverInterface: 'mq7qrvneffyhufxs9mxtqk4iqgrm9az38zssr4fkdj4lu92nqgz6w8w9bjhwo4p6w1pipvxv4ift9dt98mrn2xuygzven4sc5rxsgmgx9sr2swovn5bc2gzg1bxzv8lekuymqbo83sko4axtlnvdsjtjofbxrgbk',
                receiverInterfaceNamespace: 'w632n85qvdezjis5pgf26a9jui0yruvsjywhowio9ogwej0gg0ej3lt1ixzhugfgt4mh7hcjo7lqt64eo2aih1n9fan1hxfhi5ge5pam1vyp4owr9v2q62lco2lhvg6g9ecwr9uucvxtj64dir9xn7v2vxq78y4g',
                retries: 1288034004,
                size: 3235187254,
                timesFailed: 3187244932,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'kg2tbr4f22m0prt1mq87gz6w8nkyfumgejozg6iivnow21gtcq',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'xxwuj5r0lyllss4z4y3j',
                scenario: 'ybpvtbh7om7hvfqei0j0kl1xfnz3j3jt2eas34111hyhd4cix58vhpkjb2bx',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:31:00',
                executionMonitoringStartAt: '2020-07-26 22:22:16',
                executionMonitoringEndAt: '2020-07-27 02:03:11',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'y590or7ag24z31crqqmbiwqebp3u206onj1hdzvcjst1v3cadcjo1j3op0brbv6fb7hkcbuwg2uosd6ugr0z8s1u793ecdnqxbl5gzanbgwh8rma3xsi9ypv3zx2k5yi0jhkzueiu8orz7bp3nar4eunwyiqdlyx',
                flowComponent: '722r4ebamiczrhk141wshzslqyua28gcx65kxpku664v84utexn42fiixvhkjb9w8aa5nxpzjhvduvjmc2dl69fi0s18z5z2cv7kphn83pca3i7q98z8foakrmztltk7j7hu3dtnnth4z8syji8srk5xuo2vfggz',
                flowInterfaceName: 'd83rw171n3sovwcj4omg901zmwjpppvdsk5wkyjfk2pfbocluncgpwz7f8zb2rxz0edgifqjt0vnn5tn69leb0f7hgxcx9ohonk9xvk7j9iu6zd9xtzb1bvxtjmelppu2ajl6nfmsslyhqx8fttw6kayn3irupyl',
                flowInterfaceNamespace: 'xoixomkofp9ii19ifl07t5cu9p5v8yw53wytd90p91p5a6qlomiumrrn56dxsqt3ejozc3nmx7xh6zjcnsi9j79t09nopvsw7i0x5vf22rhnlw4700nml80t51qgty4ry8hplera3sajsaqc4zeco8tnlc53o3lr',
                status: null,
                detail: 'Dolorum accusantium dolore. Vel necessitatibus aut quisquam reprehenderit magnam corporis recusandae eum. Cum dolor aut dicta et blanditiis sunt. Ut cumque voluptatum ut quia minus.',
                example: 'gybm3i9f5pc12ow1u5wyt53ue1b2qd11pjgdoym07rwkgtubrckn3qhjij08ep1qi6vlpdxtn9suhdmerq3ytl4ybxd3ogwfnzewpu68y4fcm5jvvjrb8cqusx3mzue1qe799ldp6yr2pc9rzkmj2efbvtmoc0tf',
                startTimeAt: '2020-07-27 09:36:14',
                direction: 'INBOUND',
                errorCategory: 'binjbkwf3p0pgsym8cf35glqfhrrbqyxnk30u835ompzbwrmci8wdb0tdeteluexq4qvajqrrqrb1hqsqlv1qu5n5o3qya9moqg67la6f9421rh73dy5ncn8ue3pfgkuf6rtjtmll1rj5hr7ponsv6uqs8bh4cjv',
                errorCode: 'aa34sjcj2s5yrolv452e',
                errorLabel: 777591,
                node: 3366595304,
                protocol: '3wkpdl3qz7g8onqpy0d2',
                qualityOfService: 'p5sm20g7mwqc5awfdt97',
                receiverParty: 'oxwd3m9m4zbo7xlrrumwjtosh7cpgepj0ktex5jqh4wvj3z981hyk1unorr9q1r1y9khn1cvcnmconbkjdqzaivu562wpi06kqwuphgtkw9hfoxw0bj3d6jwi9nqhlulqm4rgtrjz8itlu48bccqfv05l4319318',
                receiverComponent: 'zobjb59adv1vylco4jge2nqdmwbzhkvueon932ec9pibn7dvvwx7322yxfs04qk3co0a464p6ntygw9v9yrvecxuqvsxlhuep0vqkh7k06zvmwhmb37id3xrh3pcxyh79dgmuldzcv8kwi8olu3bl1pu323res26',
                receiverInterface: '2a1inhvp9trbpz04y2v7pwvh7z6u6d1m53129et9tlxhsukndqorb9vq8o1008b9c2wy308bo5ehnnk7vvxrxfr34zvtutsiwhicttcl6ib9etp7ymh6my4p131wl2mupgbsl0ebxj0tpi0edb1r3u3wqyewg7d3',
                receiverInterfaceNamespace: 'licuvsuhm4l5oej4q9kgqmzzerwvwh3qm82atn1ig2vy74tzz16mwsrb3u3jdzwgxspmbvx0bstxbg89asj76zxd0xvod48dutg86250956t2ewzajiywo7el5nmkyhgvszf0krui5eobssf55hhv1lbvzfpehki',
                retries: 5054665263,
                size: 1333236816,
                timesFailed: 5071301501,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'uc874lft204hyflyue5ki6d1y153excxqo46ul1byo3l70uwsh',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'bjda27hzbh2fgb8hqi06',
                scenario: 'twasaisv6wt1jk4ttlnps1ebv5dvwve4mwessc6qv1j5538ira10deuh72m8',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:10:36',
                executionMonitoringStartAt: '2020-07-27 00:58:27',
                executionMonitoringEndAt: '2020-07-27 01:45:45',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'lqwnrflcpeybox1e8oricfkh09guqb2wwwe00pwz5asxn3okjoy1qzc76gqjq25ca7wfvvqg1ow5q8n76zhnkrzm91wbscn963v70dd1op4xe49mfz6qkkdtksc2llqxf29lctriclzpvi40wo6j97pi9wuqo31h',
                flowComponent: 'w1cuuixfhuegp3mmpm3pk5dxo5x4aut27f0xj7bmaadok27mt79mk7jrnta67cjp59ndwsuyzpcu9sl0fldoxdq5prwttwl1oh92flu1a97anwa15x4uxop3te0dmenksmvsqcaptyewm253t7f929suoofwbi3b',
                flowInterfaceName: 'oyjkyzucwm33h31qct7wy74rgeqnl3e15ieauo3xq5ebr6iqn553qmnlfcsaozczbm7ri707j7wtz7nc8fcq5ykyfh6gy4bgsa2w4elb1e9r0eud1ft12v7wf8amnx5w5tpdfnpfnlwox5nq1usc6vt3vnr73gsn',
                flowInterfaceNamespace: 'muwyezgiiwuv0gd61d31rkbvb0rp40ockoepspzf87cwlnpj3hxqe345tva9iklrpj84jyks0j1359gb2gr79ab3ic05p2hajrbahkk9gyjp1123q8vx4glsskhz2nq8q669l7a2j3xqd1shuyv9xod6nea6tx19',
                
                detail: 'Qui in animi ut accusantium aut quaerat. Quisquam laborum excepturi qui eveniet molestias vero voluptate magnam qui. Sed facere placeat voluptatem adipisci aut quam atque voluptas.',
                example: 'ajp3d6m5jthmm2fia8epidvbrcqk7tpbe2qopz3dw8hdam6d31kop1tlab60wncwq6n44f3d50e2cf3hh9wz5go6ungkhfd5zyvy5let3taibzgcdv5o4opad93qgzcc7bykicub1lb8khkorwkmdyi2046uoppt',
                startTimeAt: '2020-07-27 03:44:35',
                direction: 'INBOUND',
                errorCategory: 'n9lv3tbwf8xf330t9rc1xj5xm2hw5gokqllzlvtf1u7hehpfkkexnpmoynmcvmkwidh6k30odtan99rchlfoagbrz404ewmr7bap5tbajplruy3v30adsqst7wzzij2cpr68mcc3iia09zf1rvk42d5n1cst6kn2',
                errorCode: '2ijtxi8jyqa69p506gmj',
                errorLabel: 207596,
                node: 9767741597,
                protocol: '1yr1hp1eynf6fjfn2mui',
                qualityOfService: 'cmu9la150f6bo2evvsps',
                receiverParty: 'egykexerc02qlm5hwz9lzieoux1da4anf64pslt9d6dmfj3wzsqigmvvywovb8d1yzfx7qxui34zb9657vgsimo8r57qjv7csjoz7h6xokqyul74zfr2ta7004izdwgdzdjaphbjx7va9lyvgzhfuu5af9ug1eed',
                receiverComponent: 'du0ds6qzvgntuwzsnm972etm5q2cbj1fhy0td77vrxi35g8hn9s3k6wicxyfxkxdh5u1pc7696xohmfot7e84q2eb7xlr7hcpq02lk25akbtp3nne9nsxg1x3f8tsyddttbt7f1wizks50w31x585qxvgeekd5am',
                receiverInterface: 'ec3e2ibxnl6dwz7i0s4d9r4f3p4j39na1tpotpgva46ymtuxkv8vioii8v6v6gvix167utz4ewcf6hkdxn6w255oti22inwgiwrt0neugsqn9b4m8ps397frg10ge121md9sja9riv44s86a2bnzr8afytf4yohp',
                receiverInterfaceNamespace: 'v4dxejqhncca0y7jj3l2x7gh9axxg2rdr6g11hn4jf7tkc7dditdwwc9hqhl6injqa51kz0znwzsic5ekungenn3z5t24cknr2x9ktd1uvenmolvglsqwxy90o6ib73evmrccbyr8tfe4cit90j6iqcbzyhff7fn',
                retries: 6284223675,
                size: 3868550920,
                timesFailed: 7920253766,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'qmhflgnls3dvk145i7d2759728yusscmcdo33zbj84782ukutf',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'u837durb5xzjfc54z1qc',
                scenario: '0fs3gwn4uhr6ostidedz1z5mb0zmsegn3n4v9elt82yp193ys1tgcupyh4ek',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:09:06',
                executionMonitoringStartAt: '2020-07-27 05:10:32',
                executionMonitoringEndAt: '2020-07-27 06:41:47',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6dbz4bu8xvl14m3fbmsmv1fnwtc29gdvtwceqyfu6edya478b3y3zdsf1gzz5ajystcwerql2t4wdplhp23lb0m8ipvwl93102otvk6bz4kf1volpbfygxaqtl26q1vkroabobnn7aac4646j3uoh9gkfuyl61jh',
                flowComponent: '7efq8p4d4t115hab7qcn3fj1cfq5cfgtbfsolgiehzocl767n76tuyzotslltkcakhgzgqzt2xszaz7hhuaq6v4ksj70q06c1x6gvm3jc9r560pfmr500ao4kh4d77rcwmruu16gfg70ppsg4iwc4wqdwpdxtj9m',
                flowInterfaceName: '498731l24es59l7c8pcj4zrir9ka2p3u4c9ha5ibwli0v77orzq5sqwi7jf5u8pytlucxrg7qyinzi2fobsoz9q670pvffjm874zrrs8ftrq0ybivimt4ecl84lj1eqeq1jxer4jjm90m1ypts4fzqgq32qt9t6z',
                flowInterfaceNamespace: 'pvavtsi94cdhr38f97npumetdeez01d373h6axbu7oegoes819owptqhtbh2cqrhewr8wt1fz2xahnpheltl8j4uqiluhai5bdpitcc6ayllkw8u9t70notmphgnz4q0p4wsd6yxwghtmlske9iope5nkq1u48kz',
                status: 'ERROR',
                detail: 'Facilis quasi deleniti veritatis ducimus. Repellendus laborum et minus praesentium consequatur consequuntur repellendus voluptas. Unde perferendis explicabo sit saepe. Hic quis rem.',
                example: 'lj8dleakqq4tegtgi6jjuq1553at9hbwkthtfvwh7ae2wge0thy4niupoewf66upk8et2po5bi6st6l2bbltwi5cy8lbzdcrq0qyv828mrd56vf0fxe46kgoqmxz0me0z2vqud7lhgn6k4ljts82gs0oc9rooxeu',
                startTimeAt: '2020-07-27 13:10:26',
                direction: null,
                errorCategory: 't652d642ptz5f7hhiumyivcr5h0qqlnennpbaq3h59cgph263brtyqtm9peu91fhltycjszahwi7gdtf647vgfwqicpe7l73fty526t5tcvwdiccfq5etha228k3j4zcbq6s953acxcr4ec6ukc0xjcpdq0xwfas',
                errorCode: 'ubycc9t882us1y6sfwju',
                errorLabel: 542959,
                node: 3516291129,
                protocol: 'y2vnb3wg6pkk6q18qhh4',
                qualityOfService: 'biz9s5bik66hiffr5ios',
                receiverParty: '24bp6z5ycc44m3pf939235z5wfbv75o08cphldcx0b4keyf7von60d5pk1k29s8hslyj6j6zfvop0of6k5sp5csigrnjheh7wh8rrk5c9tc6eqr4swdlonpwe7uu5tmp5k98lwd9g2bndd8q96uffjz5p0i0dobj',
                receiverComponent: '8rj7bsp9g1j0zd846oqzjmr7aq1x7ozwkiwv47x3nos96dxgq466hqn19f3myovaf9qzpkl63m2g0aqmeyp0q3ygas0itcqxi911ebg4v2wmmmvp8ezz23fehl5tpu8w7zo7qc7qv0nzoce14zlfnm77f3e5ixmu',
                receiverInterface: 'btfnbv0upl8ohknlhpdrq05xt0iyt3kvtzj6gny1qtaqzq8w9snu19k1cy42naja2xpvd1lcidw8mu3y4khxw139f9j9zzdw8jmeci4tszv41olfl64gsn3pg2p8fi44uw22brk9gnse3b2kjgc6ub64bwkaa81b',
                receiverInterfaceNamespace: 'odir1wbx9cnkybt8ipu7b5206ytxcc5cg3z9663qxpwkx9iidqj5m9zcq78ofkfvh98snq4tjr2awvqbak3m7e9bpcboc9yw38uwu6df44ukbbm831miaw3s83m036fns8tp9vhpvt10cjdcof2hng08tj62mwz0',
                retries: 3840092867,
                size: 7885294731,
                timesFailed: 3038439870,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ab6cfs5me7ws6eh7n3uz2d380faocs0nyqcbjyknp5iy9y72aj',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'plfuah5mugyr4gcbj4zb',
                scenario: 'pio8v67e9qkjmai5j2kwe355oyz4pgcz9largoxk4ypu3j0csrx2qrkai9nj',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:44:02',
                executionMonitoringStartAt: '2020-07-26 20:23:09',
                executionMonitoringEndAt: '2020-07-27 16:02:05',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'k5r6jpb8hap1hjeu3bxe8e2zgzthrvkanhoia884dotpn1ijrul1hkwqr6xssovsiahjbpdp6d9h9a2hsyhenrjlsymp29woecw4k8jq7jas2blu6yazx1o9kzhr3495iydnzgpq7pzg0zz6gygintwbzaoeol5d',
                flowComponent: 'rv54otobdljdrx6i5rc8mquifz2xj41zj2xm84c5iik07p5oms689j993ep54r8gj78c9e1odbwj2s7vp2auub16g8wevg6rd17z55q6wnkho57hswaueof8t2rqhcomnuxeku31kjz5i60wubvmz3fcc2pjoirn',
                flowInterfaceName: 'aucziw87drl3ascmqi3ksih8zwr31keonrdef4irvyc2r311iwmlqcfm04n1lqjgbx95d997r2skn5twatpd4odork2oexpcjq6vd9tc44ofluhnpwfuqoiyefk53atcp1g072405b3895z9xpkbx7itncpzz6wn',
                flowInterfaceNamespace: 'h7i0rnpfkylu36rviyovbt2686m0eg9csifwfydanyqgp4237vzs25letzgcmxmosmjn3gm8vl19nnzynlnmnx1y52c7u5z5p2y35cofjht6dkh2i4et71uzpmyiobp8vcrobk3vxzbn74u5wim4miazbfli5kpj',
                status: 'CANCELLED',
                detail: 'Id corporis consequuntur. Omnis cumque omnis. Numquam quae exercitationem quis quasi rerum. Quidem rerum dicta quis at repellat numquam. Autem a molestias eveniet.',
                example: 't6d9yeffb1dcauffs9qh0k9joldn8z9coldfdxddi6qs7imcaqycbb675pkd0leabtc0xp1o7yt2oenlbi6ar4dxr2yl53q9g9z1vqg35xtf8a6kcijqmpkvd3quh00yyqtvj1cd3v076dp9ihk555xa9nlg0d2f',
                startTimeAt: '2020-07-26 18:49:06',
                
                errorCategory: '984sm6y39qu3zd6yr1w7tvw17hioh8kw3lde6zm7bh8aqqjnu5ipuolcerdyqo8uyrqesd38kkfcjlj0hlfuscnmrrr0u3nzthyz8co22b4gsad9fzce98fhh8x6uay5gmajphx84qtuagwoq7n2v9d8mb4lawmf',
                errorCode: 'wwngoqh6kkr3jlw67aiy',
                errorLabel: 593754,
                node: 3503532591,
                protocol: 'sfmkyrn1qzou3glxv7js',
                qualityOfService: 'u853yrex6fz8ir6xwakt',
                receiverParty: 'kh97ba72hjjj5sltxj8ufabbtgr2ab1v0wa6khbu2wlt7siiumlcz5j1nq7idamq31xaxfkd01udyw3bnztmob4biox0sl8rdjeyr8mgao7ddaas7bs61sa6uecm5495cdscod70afv2wiashms1qy72adsa6jml',
                receiverComponent: '6jjwbsg0zxv5xr94851q6vv2mjm6o4fnh8sdruzugyuniyn99swao29ctzd0wk58k2kjh8m4op6c8wafptkcppldlj5cqodlsclddaa7nnk7wl59k5w4wdl1hcxoz9supw95dfqipjv6j7sapp2unyotjfvumvhi',
                receiverInterface: 'dh1m2eoq5q2wwp1c8h49ke3xv6fiy4s5ck872b265jdiber0dgtcji6i2owqazmp1o4b9qk3507tsn8lrg64t4jz2t8gf5yfh05ew7xktucy5b581q1ybvrg4x3lhdqhco1lcnr46gay6oohq729n3xupe82k8s2',
                receiverInterfaceNamespace: 'ttg3aadbfi4246f7chqxgug14o6jc5xjhlm4y6vinq1zmbwlrvxykwcb2iwhf3mjijr7mgakrjnzh2l3e0vx0mtcrg2rzx504awfsxhq2ovwh1nutnm6e8kpz6l3yaodgc42ezp6b39iq9ldzrucudwfuwqol009',
                retries: 6387662398,
                size: 5046656976,
                timesFailed: 1068528210,
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
                id: 'a9bsnge9vpz7iiem94vt3u87npb9po2ovf5yj',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'uzctl76s0pzk6lyvr79622ugd581xs8wngvqjmvkhdbf9ql4ym',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'monl8f6kl7lggt1wem54',
                scenario: 'o3dh9ue77yhbg9a96vpmp3cbs53xhz3io0d98p4kxp9e5zmkb5yege3rrgre',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:54:45',
                executionMonitoringStartAt: '2020-07-27 10:19:25',
                executionMonitoringEndAt: '2020-07-27 01:10:50',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'w15hs163snzcjvhu3xjjn915e7mfa67fhy8wj6da34n93kwqv0x7uw4b6xef3nseawqneju3n0s5sci50gqhwy3yc5siw5opkwx2xhnmo4gwecxdfi6h9sjqwnui89eetb3j7jq4mdcjgcsk2y951kylk37q92qz',
                flowComponent: '7v2t6poz8jalas15fhs8j07wgomb4k031rw9ir9qj251g22qdhnvg5wh3zn7ahd372uhbctdh8293phiqto2n5h0h3ljlb1hz49o05p2zg9bqzgifeyi5llhlwn1huu9ft6oj42pqeckxjmilubrvvrs1e42ij3j',
                flowInterfaceName: 'gmk6lx8cji1nj8dnp0somxzpgu82fju1ctcd8h4fg0lxvn5sl9u06ro79aevrlgc52rv3hwzuhzpli25xjuy5i8tnyn9w2nc4f68cf2l6ick1fsy38ywy4rk27hg9fdboex65212blbfj7ls6plzf370r72g8m57',
                flowInterfaceNamespace: '1toiouqtvgtv4spxfue5ind7wvvywy7wgsoavk8yu7p03jq2ljg5oavhn26a3vrnf1qunrs3f7xed8yqf8ejegmv7ol26d0slpdsr0pa2ldnnuva2pbc0dha0z53bualhtnyn3vcika4sf831p2eq5901etfl9mr',
                status: 'CANCELLED',
                detail: 'Omnis in quia quasi. Reiciendis ea ut molestiae vitae. Iure praesentium voluptatem ut similique quia qui ratione nihil. Eius ullam excepturi saepe beatae beatae neque.',
                example: 'o853tsqhjzaxqwksoylrk79n1tbm6mvrtpjgq6j3uixw34ucfr08y41jqh4ax4v94qmi7zwk0j2jlakf0irzwru5lbz7pkq63h5b5l06nf48ci67ukngqd7y3z73y0ujvgo1ixatwr8n4vtrv3r25anpbhsvdmag',
                startTimeAt: '2020-07-27 02:53:37',
                direction: 'INBOUND',
                errorCategory: 'v318pvei2o6gr8hhb4z5adhppzvrog1juj85a24azcndlflc5y2jklroih9x72bqxticlge2suxkbyyuzyrz8lyqpt1012yhp42ipyxhxelvovvt1ps5zyt1s6lyt8zk38nbhggaabyn28wjoa2p2zs5bxke29ce',
                errorCode: '1brae6lg4zc0j2drfhct',
                errorLabel: 229941,
                node: 8484145711,
                protocol: 'nz83vs4oed6zg3huvy6t',
                qualityOfService: '0kaezd27bq4sp2qwpipj',
                receiverParty: '7xhgktr72c1orqx7oopl0ijk3xze20ksm0roojhy25l5ynfbl27tbfvlypm3f3dqhhfp37hubw3rxi114xmp4b2657u3byhr1oq9di8ib3yl7g3ph200jhtg3xusu55v9ib6hbf4z2y5r12w2ia4knjjjgqg4b7u',
                receiverComponent: 'v9yvp9i481vcevghtyp1x9zlm9n8cp8et5ma3zo9yh13up72wg8ivm4kkoib5u32tbctxrv886wlw55gqy5ijl3lsi4pzfwrz813vigm818ia7h4sony44g44w5dc47ipgztawcb428x9trui6fh7qpplbquf54z',
                receiverInterface: '9121ts24bn3tfl4jo9pet4w6axh0kmsu2beygyy7xal0ssav42cvpig8sq7ztle2zkr40k4dsvcw9y930scokr8uly0j37dic9cqm3ntmyun11y3vz5vio718p4j9rrkpdxzzjgzu7xqjrlotzr49mdglvec3h8z',
                receiverInterfaceNamespace: 's0csdmd4polrr90s1rahv3qhr302xm70iv4eh65ur1dq55e9lsc2j5ewrcx01vvcw7r45rt8xwiyk7lgkg5xf4gkswhl9d973fkrrrmlwol0gkr1l0pfms8arlln885p07vubt2u3hm1whkhund8n6c4sq09t7zl',
                retries: 2712367030,
                size: 2381733281,
                timesFailed: 4573580505,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '1porkk37ebohn24swgux8z7eukgfdwvb9e8fe',
                tenantCode: 'mpwef220dcrypi7hgw8lt04ckcq90kje8qw4s5ny4panlue7c6',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '7v6hqs03mb4qwjns65qs',
                scenario: '84h4jt8colziiasiyaoeawnirj4ehgn533odatt7kw1d9cwvs2fgf7vairt1',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:33:21',
                executionMonitoringStartAt: '2020-07-27 00:34:05',
                executionMonitoringEndAt: '2020-07-27 13:10:53',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '1s2ts87scz2e9kdxf7zx6qlxhx6zzn5joa315egnev70v1m2ejw11aoabw8oyoz0tujjdr0g1cv1hshv26eqjvd5s22x29j0p79ni6tb4wo5kwxduywh487p92d8loncq6ln1poklsetner887jze9n0f28voat9',
                flowComponent: 'c22ielzgmqyzbw00o48l9cto51sqgs5r0hsv5klkpbh41eg7hanmatgq2o3afn4heedmrw6alj9l4gcfjb9hkf9uycr2ljlpeu3r0mya33t1h8ta3vw24xjfvi640j0vmggzhc37748hq88080cue3ocosdvvefo',
                flowInterfaceName: 'xqwlvn3zjlsi1mvxug45ynmhk0f0teck7tmbtgcudga8vuu3ooyvl268y5lhx5iy9zkkff2mqb1r2f3om4aehbxofusju7bb68pul0d0iec2eztdqv9ms3ho2f5sfenl9ph77r4f9foalohu5d6tx5h879bil93v',
                flowInterfaceNamespace: '522d0w9bz5omwdojhdivw4qrzp59u4jv7r9mplwbairtzwmxq46kx3zz0d9slietzts6zk67kyji2zfac8ivpqwxfoxezclmdb0qqjrubixky0lzjtr8g61ayqk1joz3kv83bewtq4u3sfis543tyvs9pq5j3gcx',
                status: 'DELIVERING',
                detail: 'Quasi iure mollitia. Aliquam quod quia soluta quia deserunt debitis doloribus tempora. Cumque eligendi reiciendis non molestias tempora veritatis repellendus. Odit atque eos debitis. Quis nulla tempore itaque quisquam asperiores ab et dignissimos. Necessitatibus et ut.',
                example: '8p8fr5nhg0vu0vwskm91g5zuese1yzvwhirfklbb7v2jm5j0lajhyn7aegsfygn4t8aw3gfa5t4mreccoaglmthsx7ozc0xw44ysjjx581diwd8vg5se43rxir1jgtipyvqmart2rjt1o1qw9zeuiik6a8856bid',
                startTimeAt: '2020-07-26 23:18:56',
                direction: 'OUTBOUND',
                errorCategory: 'c30y55nzja88w98jv08zpmb2586uac5bb2ppuin7xecc5zuvik7uw3uaph04okpagtfrvri6ykz0rvt149eq0k147fyiu9iw2bugjs5ku0z2me9uxjq2penvsyp8oyxus1dab9wcka2lemj0mu35i1a6n2uf4y5r',
                errorCode: 'slz4ijfg8u2w51v7vu45',
                errorLabel: 510345,
                node: 9694323868,
                protocol: '7elt4qbba45zh3l4675f',
                qualityOfService: 'quzecqn1r9arggbr7ufk',
                receiverParty: '36h3pwmaeacm1013oa5yk6jhijsxx4d7h4pwwmr2l86sd3vjd0cncwefm8etyw8ctfb4mimivqhdt8eycik6xn0oa99672iggoomouxf8dzxtxudmfgzkscnbbydzv4caf5356qjsc8mmjjtu2357hjvqq7awo4g',
                receiverComponent: '6y2urv19x93dxv60yo5ucxwf1g24rd0pr6pqyzq8rwduede9thll73u4dgmxn96ae6mvzf3id0pb2q1qoarud9m8ksykhwgu0qm4002q81mglb3lj4zmvomkoydkxy31310ijxldqj9g4t6e6wr3w5v50gibt977',
                receiverInterface: 'nmwaarrjfmmhlrmma80ukxpwhql0nsvpn15e6g3j7uy15ap16z6rqcse9wybqsb2h96r812n5bf1svpkm7l9wkrl2dhpcw4wk77jwehwpg5whz4r8ddxze37ar3bj12yoh5dufdzd3nt5elqe5d70ta480tj8745',
                receiverInterfaceNamespace: 'irx9tts3yty4jvc6ticticcaub6joxgs4ltfw7m12y3o9xcwtif1u9idxbc8zlhmlgx7nidwuvjftv1uon7xpki34in8ct9g7jyxkrxomrhzl327dvdnn0e6kr1mq7eel88wevjiq0l2sh1m3qw60axyksu61xda',
                retries: 9301162711,
                size: 6796898214,
                timesFailed: 2472186614,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'mwk35gtldjhm3297leldf84wgji1wn7i2ntpdk5qui6qcvh9xq',
                systemId: 'q55elea14ih20jjf8fqbt1wk9jshk20xaxsnt',
                systemName: 'pc39aw54yu3eys9pxs9l',
                scenario: 'g6pb3fzb8234ovwl8vccl25y184m3mmpsafan59p2b6tvg6lt6wy779lmxcu',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:50:56',
                executionMonitoringStartAt: '2020-07-27 13:19:47',
                executionMonitoringEndAt: '2020-07-26 19:33:37',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'djl9oyr9z7c0nox9o62gnnqzyivth5wznpd4h3w9hboe432c0noigdqrrky4cqww26muaz8c1z1ixqwi7koqr70twseiz4jahiequ3eahvxyh70k3we8vhki8xh8ebv7csdci8u5abc4c92yb2eodou6dwphezz4',
                flowComponent: 'vjqiz3bu5z9kkg14d5rzxyjnv24zf5jarajhdkjwosvm4vtwu12ypsdtdb0l3plcg0btysdefq2nknpkq3sim3352va9dkgq9xquol3no8p5bay5iydvidnjx6qoax7vqx3ofa4cxcruqavhgiod8e425svkw3s3',
                flowInterfaceName: 'aoxdf0bu4y38bozyqiwwrim132odpiwo5lbnc3xti62ghe7tad0nbpaivknrv5a7nettd7060f1cv4yznnt1w7e9ou593ld69vdf212c6wh4k4ayfgo9ojsyjcow823qb8is5vcryho8jlzua5168lag87fjnu8x',
                flowInterfaceNamespace: 'x841z0kvq824ciwu5z33dg6jaya6pk7yon7sqgmwivzk2e1mfbd2fqp25mti0r0lpaavg57h6eqtt965mikrjor0tna0ts6d1rn39ve5uefb1ljemg2dwcz8oz2ncaq3sfbandoz5x5p0ybu2ifo99t0e3ny7kxr',
                status: 'WAITING',
                detail: 'Eum dicta sunt ut et explicabo deleniti quo. Et eos tenetur et non dolores aut ea tempora libero. At aut ducimus et. Et ad nisi quisquam et tenetur. Asperiores maiores eum placeat ducimus voluptatem.',
                example: 'qs5fq33vmuw4m60gq0brsvut1a9820x0mo6lo7osc417ii8nivi3s0ko5t3jiq0v6wm1sa5jm45wic04mrkob75pbixwbmfsfhq1vrwizz6y25kaa48l62v4g6vcs0uepbbdqq0ogdypxc0lz6650kuf1bavrl20',
                startTimeAt: '2020-07-27 09:39:42',
                direction: 'INBOUND',
                errorCategory: 'fnsskf9rgwgl6qum0z8ldjabet5266x2kh0vxo7w4cxnephnayx7th25yenqladc3tzkduoouxlsxm4qvh95rkvlh6vwrwgcbjv5qg3iqaa2rtwggopp9xjgr6uc4od5gmzjs6ziddmrv1uf5l99ils1fnx7wxjt',
                errorCode: 'iid3ltz1chu0yaqqejhs',
                errorLabel: 647774,
                node: 2622168672,
                protocol: 'l21up0gk3afxkqp8xn5f',
                qualityOfService: 'iw6qf1njwv710cgzj9ik',
                receiverParty: '83ld2ji6k9vtxz9znt4gr8ihv55kkk5fxhi3pzji9z5rpg5xwpevy4gjemsjznagjyovj6ldpix4exknmwbk99rql29lwl81t07xl6c2cdzci8l3tc43mrjyadvs8fx9rv3yq6yqtbkyg87lkfwu0wouonapcly7',
                receiverComponent: 'yyhlcpd69i4crqoa4lvejxkpe7bj38xa6df1kmiiukuc8ijkvnh362c74vgzeymagcbv7nhqtxbwzqd0lkuzu189q11qeudjjg26vvcz2w7skz5rrfcn0ephx4fkqvp83uxd7g5f6cvmf8rj2ccr69h3260z0jsi',
                receiverInterface: 'ftcgz2hb3br7anlj3bxbl86h4c5ymtpjasp20ir5mfdqmo7i7epk3sdvns1843dgcy5mnsmvfmx5wfx13miagc075028aifbr5ry6k2crlk593ersl087z6l6ms879lft6ck4qewhdcsbl0iykyr1ng3kyq92pny',
                receiverInterfaceNamespace: '39mqeucfv35rm4y9r7xn3z8xp8awlaqrhig4l7a8er412db7co54931g7l7jp6okq7yu7jgcebtphpozx8x9ofdmfzyzssixe7aidvy5povu7bcvruenw3ovd8yh3l0kkvghbto7w65w0zjbqor7tu41gvb59os7',
                retries: 7030928858,
                size: 8536727660,
                timesFailed: 8144819787,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'jeotf96ksg0oojltf9y27v1gxfpro1xvoe13kyr7rcv5mtrmr8',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'gwwdfmork2q8xxmbif87',
                scenario: 'gvlpmsj3vqww9lhc51xnj65785f7zspw6n3m4r7rthdk3maajjmo4fo2jzil',
                executionId: 'f32u8zwg0m7ptdsahn1pigfob613i9bmeialt',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:55:47',
                executionMonitoringStartAt: '2020-07-27 06:46:45',
                executionMonitoringEndAt: '2020-07-27 10:02:11',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'ddwydsnmclmflnptx2bfmhcsbf4ty2z60d7dq3rdzuzhy4o5i8te64xubo70sv6axgmau64d5gj5wkteugkjlzep8bmnn7olk5qfaawp4rxedljnxtb0atrie9vu6dhi6wtotmx7h60qchyd3wmmio88g18dped2',
                flowComponent: 'q3zsil3iqta623tnzjcbcwz32qe4oknivk1h9e1nmqc8vnz5jrsznyx2xvoqcne5wyj1wkknob2hmq9gxxw9m76um7q6326nu67mji0a4t7ytekbl3k3rp03oinby3ti5ptdmnmr8ojqwsjsewcsj0pcjvrjvpnh',
                flowInterfaceName: '73sulhub44mg5j0gxus0dg0kuquj92rye6foq73eacoql2jmrh60leawbdat6pjvvwc7uhh01cm7m6lw2z1lfchta0p17egjv6s4kaz2nii9nqso6mhmauszo6palsegru76ko6gwitp9gy5fes0ha6o5rrcdujh',
                flowInterfaceNamespace: 'a1v7caqksflocxwapsfszmzvvzivw65z62pj53d01dpxb3yecuxh7w82eo0bp1d8xyoibs1xa5jys1d8f0m1m4qnem3nryi32oa1j6crwovw1d0wjpaoyu1734zu3pgbnv3lst4uc4t0h7b79b6lfeu6od8pp5g4',
                status: 'TO_BE_DELIVERED',
                detail: 'Facilis in repellendus optio maxime libero nam officia ea quam. Aut quod ut accusantium porro. Tempore voluptates sequi distinctio. Sunt fugit eos reiciendis vel quaerat nostrum exercitationem recusandae. Deleniti dolor quasi voluptas error qui vero. Error dolore nostrum repudiandae et quia quis.',
                example: '6xl9gfj9n478ckqv5sushjh5svqj2qiv92dwv4alxtcgyvpf5a8bs75rr8s1e8cgpbv8ega326f9xzdt5qavllbus56hg8fys4a966q7bam6o0wxu4dhgv91ij2wgh0zlvaljvaudxgy9mog2ooi5jjmc7ze64sm',
                startTimeAt: '2020-07-26 17:16:34',
                direction: 'INBOUND',
                errorCategory: 'ej29vjcdnlmjtcc638o3r1vmpckdtemuw3ap85bkjez4qa6h5lc8rqxkyu5bmdimu62fcwxmj34g86t0r8ihlnm8bdzm48qaohnygivlu5zr2pvdqhnn3ai394llwokh2d4li3n7vmg2am9b7k068tbe95vq4ng0',
                errorCode: 'r741v90i5kjjwcmadlim',
                errorLabel: 120631,
                node: 3350038293,
                protocol: '4f224ns1s08ewro3vtng',
                qualityOfService: 'd1h2iaxa9r8l2vqb80vl',
                receiverParty: '82fnxpzjad8sigazmsku6wzofyukhosn5fnl7wem7ncvhiyzqamea6m5n012pbsxv6ctick28mn4pf4q7akfrq88hck2haagu7wdigq8f6aj8q4u73eba54vmf6nj7s6grsgkm6ib2js3c2gb65xxl5vb462y9jk',
                receiverComponent: 't6h228pymovm4yza5358xhhs6q6yg2fiupk3md0xtfjrru59ntxm974poopio96gbipnr62vxqu4va4d195uw8x2w65rkj4f4res94z9siahrqjqf3ue42blkesp2vqy4up9ulmhptthuf1sj1v188al3wtpo6ky',
                receiverInterface: '87k4fe5g7jboiyq79dgfmzycdjt2sagu12zkj6w1lz495rh0fhn6ye5szk17uoe2hwk5nyiz26ygxwnsjioupbn75z8zb3865vngg7t8weg61jz7veiini0hqflrirp646qavybwrpw8mhusqv9a5hdl9s9m92qi',
                receiverInterfaceNamespace: '8s3qr4mwg3sielqsb70tcopbu53ap0f55pmi4hclpib6sxw0j0e5kowkhdkm5axgtl54lfmbi5f64hthj4f5r3l81txi57vw4528kz4jragvc5bnw1rvjj54aswnizen4hexyud5iei6gj5v4th8wdvvfchxny8e',
                retries: 8950927592,
                size: 2994817418,
                timesFailed: 7283536393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'zg7s4qgxkxkw51l0dp0inea30vjugdpsx4yilser68yf09rnlv',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'z5ib8zdylflreuatrbo4',
                scenario: 'mt71jqz1dpxs0tlj39ovv8gx9k0skwzhn502y3986quei9omvjm3mbxjaaov',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:44:16',
                executionMonitoringStartAt: '2020-07-27 13:24:27',
                executionMonitoringEndAt: '2020-07-27 12:16:14',
                flowId: '992yiw8rztywmklohsq1p47ulnak368e2xrtz',
                flowParty: 'rgh3wxbuvigl43qc2ec4ipw4mc4vl5tpentxesoprg9slqcu7r6cr7pnsnws9d7tbtbantjh7jv6kv1nbxjunco0lzky95yda1561ahplz6mmeyarkqjxk3uc24wwlbukypeot956ho0nasayeo6xyb8pz0sxnxp',
                flowComponent: '0dm279nzv3v635a199nzgxzaf6mdrqnd01i5a6jcxwzg34bi1bs64tih2jpnhrij118lmh6zxngnr3h9itla798rd9oc3ym5vna9dhfxswbqydlp4bx6s6616ukax2tku7mrsl1uqxvd8e0hp9oruc74y1p2hnev',
                flowInterfaceName: 'mwxzao4igllhnoelapm6uaufiueklyjijvgiy5n8q61kch0gszhb749slpc4ng7rbszp6158jexdssbbtfhjd94r6ve9y9o16qb0w1mm39jkq1lxgylwcl6firco3fyxw5fvqtvzdwf3n9nfd1l6jt7q8s213xfi',
                flowInterfaceNamespace: 'xsxp864ww67nikmqazaysf9pbpdfggsizhz39tnsfkmqkamk7z31v8km3s1m0g5ruzq9n1ekd2s6lqul4668rgg89928qspkuir0gjqyy810g9u6pdip4rh6pk552tzij9qul8dud169rkfzdyzyetzg69ue7cef',
                status: 'SUCCESS',
                detail: 'Excepturi esse ut unde deleniti animi non. Ut magni velit earum quia. Sunt qui ducimus adipisci voluptate occaecati voluptatem blanditiis. Dolorum consectetur iusto doloribus aut sed iste laboriosam dolores. Ab saepe architecto sed voluptatem et in ullam. Occaecati quas et earum officia mollitia.',
                example: '8jzdu931irwykgs35voa479fbki2ok1iilj30wsnxcpgeur93plbs3snve9m0lixt2k374t5ta3fxmrevjhlpo0z1b107n2i5owlbkrz9gbct1rxqqlk58jq58zcf0u4rvbxidwoog8movegired62brt96l44st',
                startTimeAt: '2020-07-27 07:46:12',
                direction: 'OUTBOUND',
                errorCategory: 'yk9p00qb1rn2gid0hh6b2ehfk8kyy6moqttsh4ol2ofly6v20k5vcjc2shnp7z0134xpp3kvk19sr81lhr7flap93bo10w1qp3yytx4v5goyuylhvz1r3pt14zrf5jxcifmgq4ri2f5esl2pm8tqdhe1ewojw6gj',
                errorCode: 'del2qwsf0c2fnj91h7ir',
                errorLabel: 606269,
                node: 1543125819,
                protocol: '50b5anjuxagom325griz',
                qualityOfService: 'ed04st6pf5mjdmgznulg',
                receiverParty: '0fu0tvzcb6ulcwnf18038838nemido60e6yovicakh6oc32s2jj1n4xsg3jr6vvfwnitb2e9z87be10la73mdxfho54z3vcvqwljcy873mbqc8lh5c266d3syajwjo6qggvx99twzyov3izabiegxed81gcq35k9',
                receiverComponent: 'ocjahyjq0he5f149j2ki9nmre44hk6ef2ol7v8mvwpr3el9gsy9qjtyly0zhyxjzomgw1wp2jby93men1uxj9rbn1ns50o5b18nr67n5kvr7281r43hg0pz8rvygizw2qg8ksfaniwg78m4bu38zcsljxifqzdhv',
                receiverInterface: 'nx696hft1g5hixv4d5a4iso3v8frcy36f4grkot3hq5rozo8hue5t2er3etyezbgr4xbmnlf8mdh6v9kb5mqw1jz29tinf97uldbrp6hmmedkracasngdm7wb1dqyuiyicfr9w0xxwsnm0fekiy07yynu4fipyio',
                receiverInterfaceNamespace: 'xotk9mcqgpfnv8in6reuk46fuvrom8mupi0v37e77lmo41bqk7h5l66bg49lk11931oirm1tyb8b9vasnhms0ql0brrut8o5f76c5tjyrgsy08n36j5o71mo4o0m7lri55plsz4uk7asg9il4xf2xxsub23g9h3a',
                retries: 9440740575,
                size: 5120427234,
                timesFailed: 9590181468,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'q56kjyzyifcys80yxzdcl7oqr5i244ju6q3e4yblpyo3rlghp9n',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'zeed0wqj3uyfl3pucaqu',
                scenario: 'hjilfsy21qhbtl2hhp9bhr7a39t6fn1f0xuvvbykyo1nar1cl8q9n3iarfog',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:29:04',
                executionMonitoringStartAt: '2020-07-26 18:05:59',
                executionMonitoringEndAt: '2020-07-27 05:56:31',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'dtkwmy1a8tc0onn7r451gtfrffx9i503cc4t3v262f2w3sg8m7p257eahqrc5c4r3ikouegy90fjubh4r63oyor0nmbkvqivzwr6cnplvu2s4wq016mcku978mi35bfjvg611pnzqx9p0wel4s3hb9vkqhb4ml9k',
                flowComponent: 'mpblext9am82qwu9y7mnhx2efvmtgx370j2ckh5o1k4fpuge03bpxfa1tpta0vyd6yiaub098ng2aahgbpcx2lfqr2qwiwfbvo0qhjqsib61wzrjhx92u6w82gt9lwbxon2jc98306c8iznn71rp86bu3sdko7ay',
                flowInterfaceName: 'ggdx85a9gbnhm34xpndudxr3riasjceb05j81dmem1zrkby66wuy4hdo5dmqn8fiin519os4dg4kdzld5uf0bfztfm9n90gz8obwfyspbyhlyrpqvk27jyflaaf4bksxgpurx5w79wvcggcg3sj1wscc7i1iwo3q',
                flowInterfaceNamespace: 'hw95efz7u16enac5axnmqch071ungpbb47cy2e5tz9lg9uivigqr9naxe9lmlrimradedj1gng3478s4wg3npkb0ajqaxefwnnfd8tjqmvgbtwo6m2x1oylmszgm4lvf6lv14pu5klwxj7a52wd7qhweaj5byfgn',
                status: 'SUCCESS',
                detail: 'Eaque hic provident cumque rerum quia minima doloremque est pariatur. Et animi provident quia error. Sed consequatur minima culpa cum qui molestiae hic aperiam nemo.',
                example: 'rhsiqng29a3b57o4k4o0l3mkleh0m6j5j8wps8ehp9nt3uer2571weql19alxn9m63sjrk7gklud4nhe4bh5d8zyhu4wjlt66eayubhk3lvgjrvolb8rlzsm6v5evczxbxjjuvaoa79vhvton9d46s794xc9m67h',
                startTimeAt: '2020-07-26 18:13:43',
                direction: 'OUTBOUND',
                errorCategory: 'oro1ezme27fltdjzag1kw6k9veruivyr6v5wk4xhm55uwfbzhp8z9snaesy6bvml4lvcf4e37oh4pm8nl37b11zaxkwm0qt8xokv8wrt22atrweyo6w6o9r4fxb25ao56mdzoxxoau5xlfsc5f9w7c6mg7u81ld0',
                errorCode: '7203wse1s08uuwcvi9mx',
                errorLabel: 942389,
                node: 8614961670,
                protocol: '6oh2wzwx5yfn3gcywg0o',
                qualityOfService: '4q62z22cbo306gech2jw',
                receiverParty: '4wnzj5mm6lu3uy34xoor6rry5k4fxacfo3e30gn5jwfu8baiosda5c917fqv484j2j4npdyqyhmo132z81piczj40dddwd5hyisb7bbzxez1033inhko4x4kqh3cwxl0fa0m1xoyr6vbwa679lx05f6mfh4g75lx',
                receiverComponent: '16tpfmtwfkx6shoqibfypl4akitbm1r69ez9e8ndlcgfxfrtbhba7zyzopsuvjzbykrwvv799xviwz2mpwdpmujva8uh5bu9lzhw14mqgkfaz9i8d0d27uxlx13f6h9zyyn83xime773jnr1e6oo548vmn2uwt3e',
                receiverInterface: '7j3q5ffqq2wwzpug81mds68yal5jq38yufjcrc7arjfbeucfdux6wpmdr1l45tci4bx7380ra335tw7efem8ut0zw9wvtatpc22pech5fioxi3b157lx4r4ynotehfnmaskw50aq77njezqkpvdp1jzqqgnsshuh',
                receiverInterfaceNamespace: 'fky1yf8sd6tabcwtf22y0h4yxvolyx9bdh31uzxtqqiqzwmf078xg8qliona7pzgaltllk13hpj54ypsu0ilzmmopf0p4nv7yc968li9i3sb1bbci54jybynnl2v9u7xzltkw1ajp9u50zva5pe7xt63k3eiqjti',
                retries: 9483236786,
                size: 1767080916,
                timesFailed: 8313784462,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ugyl484d1n9vchwxy641nllftyk4uu1m6kafla1ytuadp8lt97',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'uu0amutitvcbk1iw4r89b',
                scenario: 'ca1y31xn1eob8vyacn4xzrr0s3khwggwe01eul5ei9ss7crua47oicitff8l',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:13:50',
                executionMonitoringStartAt: '2020-07-26 19:13:43',
                executionMonitoringEndAt: '2020-07-26 18:28:44',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'pk1gkk5qrap24b5dfkysjmj0zclmtxehecabakyx0gc4xcn3hgkoto5g33ss0cifdlysumhjw5gb092ps1bvp9kndhaytzobdtkwmnhp04qzilm4u12djhyiwgkw9ij9dzc7uzx5nrmyrztkzigqxsfwcwq3fpat',
                flowComponent: '7fbauqava40rfy6nknis6qgle9d1zsdqt82lzxzfcksf6psv3aa2f7gn4d5208ummsthl1t0rvb9hfqokajtc5iw4h09b6volae07y0lv786tdlz4iue59zt7vaakym6mg9ejvn1dgop3syo7mn6ojiqgg2muhyt',
                flowInterfaceName: '7th97gw0gviwzo9p8y4r7v10zmrcx1z06lb8hybmipgpvnmvi8fvty1c1l6f7ftjcenx9nhvyv200shf4vcgdshgf6586yp9aoocytjf7er2ovkhf38s04f2bb9ict1e6jwfl6sdy61qbvmna5zuhk4p9rsz6lsk',
                flowInterfaceNamespace: 'qhamuq2zb1ceewt87f6m0kfsg9hg4h6t5xsm0pwiqw5hyu7u95st9nh70jv6wqxaijrby4bpbxnrqa8lv84kaas1sugk5tys6dt8bcu1987rztti6gbdqkrwj9hia6p7g5megy0wug6y42mgqnv4w0fdf1sp806d',
                status: 'HOLDING',
                detail: 'Blanditiis recusandae est placeat a ut veniam fuga sed. Rem temporibus nesciunt ipsam ab officia. Qui pariatur quidem est quos ut voluptatum qui quo optio. Asperiores vitae architecto impedit cumque pariatur incidunt eum quos. Fugiat libero fugit suscipit dignissimos a.',
                example: 'cq4dotubnlaym7ms11je1jieogwa3dzwla82zje89k0mb28tlbqd455ub5gdszaasemkmk1r5jslmgd6sn3csnnx4lar7djcuphk5so1ptnxe824gb54djf1m6ti0s0qshebw5m4fg6oq772nl0gtkkf857j6uge',
                startTimeAt: '2020-07-27 03:53:46',
                direction: 'OUTBOUND',
                errorCategory: 'bc5y60sqi3iwfo9nj8ehk1u4xblxpp311sgom6d054jzi8ebt7q9shdc8lm40uyn61ee7p2zfb7k7mwnhn3rx884ii6fips40144fiww8qylvc6txzzhlgku2zuxnc3uxowy6rqvkva63xt207i4vkks53pzzon1',
                errorCode: 'dg0ss60r10mgai15p7ta',
                errorLabel: 976621,
                node: 5664246779,
                protocol: 'uz4au8xuf4wi7b49e8b5',
                qualityOfService: 'bpt285ujjzbiholf4b8n',
                receiverParty: '77a1k09a02bpatho332cih60rdifk83m5q5nyl5nl9dha1glgw6lpco16zrsuk26n0t0tt7vxjjf5u71akor63v6o2f4cbjyklp27yhloc6xx2jdzdpbf1gee48ez5pkr9pyts0f55s4ug3rxfjbpwwckfapwb2b',
                receiverComponent: 'uqwv0415qzzah0dvvhf1jswwhqzxhog7ked5nrziugmftjjv1eukd4r3neioy05r929og3ua08o7dxp3xb3uu5kgsxi0f1lp9g5d4dsvgnxh3h5zj0g6gqtju6slug6l4o9mnk173yhf8ydey9fpaubu30qchfky',
                receiverInterface: 'mmt8gie5utslcpkn6twea5xltftwy70sg94469tal3w0k1c7ml8d4o31g3q55q0yvlm4nhls597kovq88ny2m468k2od2nrauglksji0nbn5d83lkjm85wkagbflvkfpwqwgtr9gtobo6bjrvkr7vx0icround17',
                receiverInterfaceNamespace: '9m35xed54dtxnt8e3ct5uwvbbumehdyv88qoh2j18las3a32hzmi1c86u9lf0vvaq8vmsg0z3xtrhk6f2cfbvypa7pkbyni8ksg52nj7l3hfui80a3cf05umlr51ddq275svcilj3krggepvzmd3f4n2snr6k939',
                retries: 2900789578,
                size: 8247490213,
                timesFailed: 5309404920,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '3dhvb8eyl0yk217zlxsy2rrozcappf4n9zmokppqidb8cn8unt',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'x03n170eq0igc0clbu9h',
                scenario: 'xi3wjmeqcg4g1jy5kul0v6c89vz1mf4vdq1941fx091pw60bgvwd7vyuw2c6g',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:04:26',
                executionMonitoringStartAt: '2020-07-26 19:05:35',
                executionMonitoringEndAt: '2020-07-27 15:52:23',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6jdtqe6noum7hx3ozsjycr5t1rh4ae4g8nzew6s523bhqq9h0ssqbcsx1ml78q6m5gz871lfompfcgi56u4sqfpwd8ayrl91eomqkj72fiogcx9p8db4hczyqk59mqwsy442me4seqtbhw3eivhmqwvnbggkg67i',
                flowComponent: 'pvkl9qkd4cibmymvzsbu41wagu6na9g14x703679n1jl3edufg3jdcsgspe3dr9xxg3ptrt7niwi5676mzc2q2ukl11l92uqsd0fmjdkz8amr77oqo83548wxco5u3xlycie7mdlidfsee9w0jlqojb1cfvbgqy3',
                flowInterfaceName: 'jtou1jv4oym1n6afzjkq0xc5bpsgkm5v9vfed2sg9gbibyui31f1pjfx1h9d6fh0faw5le15twxv9goqq6gjiujubah1zr31ccp257cmpyw6s21jc6cglamyfkm9eqsqwk96g9ubgm9qx92qx59kldg55tl0ox4s',
                flowInterfaceNamespace: 'y2cusqc2fzrkbg3x83ybi0m7z8crwc4lvje2th2hunb9t7v4izr4194luyyh7v93gmlqynabso9k2k2t9ulfsc51fnvk9pe1te2gspze8nn0oykq4smn7z8z0gd0vnku7hx8mk9qjs9rsoymaxp41pzacckm5qit',
                status: 'WAITING',
                detail: 'Quo voluptatum vel mollitia aliquam rem ipsa quia vitae. Unde laudantium quam quia a dolore aut et. Perspiciatis reiciendis a dolor hic corrupti perspiciatis quo dignissimos. Iusto architecto nobis quae eligendi reiciendis accusantium recusandae et.',
                example: 'muyf82ankq4wkznxtnqpxl0odi03wq7wsrdobwntfuau8s6mdmrvzgvsczxd52cx7l72ebyzg1pfa2pk63w43wrq139tl5h5sx5mgfu8rs3kl3kz2zkg9hqi6a0tvnxvf0ulurmy3oeuapsu1mmaip88ifm4cy79',
                startTimeAt: '2020-07-27 15:31:33',
                direction: 'INBOUND',
                errorCategory: '6bel0q6fils7uxloogzwo0wkvn12j1p2h5kkk97jvf6ipn0tgbp5xs1olwuy6brh9oxng59d1knp8bmdqdwnc0wkjbzjdb2ghcf9ck2ddg44lrprnzp2cp24vyka1vudzt95pwrayvgerhu9n0p2308swrjhxs50',
                errorCode: '1set3r3fi5wnw8gkmjri',
                errorLabel: 446790,
                node: 8892019319,
                protocol: 'ju22awb9i0or2vv3x5d4',
                qualityOfService: 'va5fzwba5yfx6xplg99z',
                receiverParty: '6ld7yfnt2vwrn7t2j4g3qow7ll9h11i36zssf42sb5erxmknj95f67m8tdhrcrtle32cztysbo2sorpksmjfl69yzws6dye5gcvj49aza7x6zm8fvopelfpjkn04vhexrw6l4ljnahk54nbxs41bppy4qt8xz0r9',
                receiverComponent: 'cononbpptt5pix3afhhyyz7vdoppjzctqruv8hvrhxp0g4au7q6qlil932djkzkksqlwgxgdxyms8zt69crj0tcac1a2a3l3vun2em11b2x7fgosara7rvr1g9k8qo8wkoqfb1f00c0ovc7l50uubmjowoyzgkmz',
                receiverInterface: '2h88k4oc0smvd20gtlobkdf9k27uskbjfmyktgy6n0cpp9k20aiwqx0kestynmvyhbqf740hdiqpcs0a9rg32shdlxbjnvvk3vysvtqzy16ata3hx3y9mmf9rflm6p2v1kzcw8t3kq34i7dcim7tp0714h00v7t9',
                receiverInterfaceNamespace: '5tpdz61imf89yk09rm6auz6gg049i2sgr8vypiavgou7538muqoyblucwvktvj1eu2r16voqjwiweyuqpqer9ehaonwlwe2md2lgea1q2uuy5itpno4gmeo2dlm24aupa5ng1d0z41iv0km4paa0xi96c4p8c90b',
                retries: 1393630844,
                size: 8777860273,
                timesFailed: 5641043768,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '5z86ly59l0jmqdude3k7gaq86oxhrepvrlfkyvxdjm9xbkiekw',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '0hoqhidkzo0ar5ajfj3w',
                scenario: 'kao73r57yumqb2sajmg4rgukhw4miq2wbtyboubnu3ynlcw8b3n05h6lr4cv',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:57:30',
                executionMonitoringStartAt: '2020-07-27 13:34:06',
                executionMonitoringEndAt: '2020-07-26 23:16:23',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'g2xrwtz17u3a3z8w8jocueh8aqqulsassbgghf2rh790m38dwo0rfne2wfdzhjdyvy0dhzhc50u4720mrbvijc6hlp7d9gpo4awtv5dxvnn5e8hr0q1up1q9ppfpme6l7h579u1cqwgaiis339kbbcanss8coztkz',
                flowComponent: '7o7wzwmfzql1ufp87n8jdfp0e8heudtt3l07qu4xyae394nsqayc5h5drf7xqe64zhndl5d1vxjt8bztgwp34zrlslpoqo6zna80bzg0ai1ty3i1fhm53yvrub5agcksj97jhq45sh1shlva5hod1iid0a1ta21d',
                flowInterfaceName: 'd7brr1vs860o6amqbe05ajg76ber7fwqhkhjm7p47zf8ebl0vybxxjv54dbywv0uh5msqpcwdqz2a5y7rgz1p1e5j5er299ktsnqi8dao1orac0dhoh3h4p97h8o13eny0r9lwkvap8ec7ily79zwbt6cmf4i6di',
                flowInterfaceNamespace: 'tn10ga6o5fu3p72gwfzuk2ilr4twvtu7vdj8iy0fowv6l4n39c3utjswxtieal4lsu5p0rch2gkt6z2v27ms21jj6pyap1loe8adh7kgprm8o174orf9nauptdlonh9t13exzooex46oyyi3tiu55fm7dwu76ma0',
                status: 'DELIVERING',
                detail: 'Sint quia natus. Qui ut aliquam nostrum fugit et. Nulla doloribus asperiores excepturi ipsa nam. Et consectetur illum sapiente qui minima minima. Sequi ipsum est quisquam impedit aut iure.',
                example: '7ec5n6c67myz6lmfzbn8s5d16atxptktggiblq1ui2i7qesdr71gs7z4mntg7cjwahhk504st1rieh2ue9iif2v5jujnwsxazd15zc3sj2u0mazllrflqfgegs94zf1d2pxn4926hk1d4lx084pvdr6cmno63e4o',
                startTimeAt: '2020-07-27 01:23:32',
                direction: 'INBOUND',
                errorCategory: 'jf5rae216ipj784pyw1d31a5osakd6poo0u3dpzmpfa246rua6gnyjori7u4s392dsmdidj0x265mx66byyhkgz9mc3igew3lsmvvl7yoh4s9x6du99nn1ilreinpqz5kihpimwn4ebvdttwsodgu1dswrda8g8d',
                errorCode: 'ppzocc3ffg446cnd5gne',
                errorLabel: 774784,
                node: 1245762560,
                protocol: '7wpdbnyav18myf13wkg2',
                qualityOfService: 'vdua9dfms28xqerhf7ea',
                receiverParty: 's59z5iayqp8rv9ayfuvyrx617czjv98rarhtdbwpzihj6cfg2dmcyun7y2egbnuun69vojf3rm7zuh2wdoc8zbel08a03wfs0a7zhdjbfh2zvtfswuptuq8h5pjdtmbp282tgx7osas955d90bkd9dh4fd91xh14',
                receiverComponent: '9put6n8b2cibiyun79887v3nboclpktsxtt64pss5q8n5cf8z8wao1twjidmaefs3f4h78j1n6iumatu677b1bt1eamb95pcn811ky9cezc3d8rdrsx1f1ebiysec3cqqx5qmx8oq5s7i74rent5xoc4alulnk83',
                receiverInterface: 'wk38ipjh389c6uv2ahw9t0p9i34wxr5sfuxqw7m20po42vetd46688fqza2sb1xcxrqk0t0eu3h0pz8jywyk3w2fztn1kkzu933cu0uqlubci3w8ajah753lnmnvtht1weher0f3qttcta5wg36vzobkq06s1fpy',
                receiverInterfaceNamespace: 'vx5vbwy5gpmnctohqqsjb95bmnm4vwh8dpz60rrs2qae66mf4620d2j4ea9djtar7f6eid4tkinihe4glbiypmr6hs3z8ryiaqjrqz93htju8ifn2xjg7g3ouquedva9wyq1bioaee376i3pkdgfj9rrm4652v0d',
                retries: 5976188879,
                size: 9006388984,
                timesFailed: 8692159934,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '6h3ksr2agau45lopzxc4h83k2nv9ll1x7omedhmx2qbg04aeyu',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'rd7omnd4yaz68oyps94s',
                scenario: '49uu4iceogpktb6r8tcvexvys3r9iujwazttqqenzr4fh6so748xjwvv4tju',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:15:40',
                executionMonitoringStartAt: '2020-07-26 22:09:10',
                executionMonitoringEndAt: '2020-07-27 13:06:30',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6ui3953nmp1mq6zggmmv00irq59xc5mc2dt8zvf5xv7qlacbiwzb3vki5k4ct1i0nz737cxry4er5273ryfqp7ncd5w43ruleccxpgg27y7vegvb3odvr7ocu3qj70jyqc99dz16vxzhwsydaokawhgb0301pz0s',
                flowComponent: 'f0nqu8k7hjd916ixvds5gwvhksffyja3ucsd4glbznsjuu3ihf9r7yzdibmp02l682q5lhe3d0submks7qemevxgqck85brrgrc58lfxykjx9qcrotncb9se67r0ovoz1jlkhpjg4fg1zqif1mru5o49o4d7wwxfk',
                flowInterfaceName: 'tldjmx806ws02qol6lrwrka2aqxrez2aaiw4mbcdowc7if25jyy39kibgs9y6mnkgmgzdei77dkfzhh53crkmizcyzxw1xwgua4mvluyytvn5ucqsjfjplaw98lbi14814pzu9grmx1z87kv3wusueme4t2cysup',
                flowInterfaceNamespace: '8y7fc02tfh1y2jefd2aq5liyt8rxaexitzfy61mw4z37p65byo6j3vydy8uei41r2uvj3du4irikddnwd63t3cbxmu6xodvr18sicags59v8ndert094mdm6t64nrflbacpiose0ig96o63v6phlyf4nwc03414z',
                status: 'ERROR',
                detail: 'Quibusdam aut cupiditate saepe ut hic tempore eius temporibus. Error aut dolores necessitatibus fuga non dolorem dolores incidunt rerum. Deleniti odit explicabo voluptatem quibusdam repellat expedita hic.',
                example: 'v78h69x6p1t4xkmyathooxyr1x9hucvb0koe71svaxajtpkgizmy9csii0sr2wcufrf9v0scx5tot080jcuejnhqcunfjrfe7glrp1qgfoup8js80m23e8ky7kj2595dcb11qu28ddvf5lv1gfd4f03e8w8e4dz0',
                startTimeAt: '2020-07-27 05:22:46',
                direction: 'OUTBOUND',
                errorCategory: '7ymnxhe26bl50j0qbmyzxw58ts9s030jl96p9rv0ual8w6mbsjrtt8ps2f5vhx01buobqijwhyfh5e00b2vu3w7x9d0gpzbkowbwpaszktewc8b3bnknsg1elgh6ydala6q67v3vzyafs4qyfahyraoz9t2d25d3',
                errorCode: 'eu6dgh5dy8mm9nr9jwbw',
                errorLabel: 354372,
                node: 3386987254,
                protocol: '0wyyc0o0wyj0x18pzr5i',
                qualityOfService: '09lcjfi9kwkk0mn9kv41',
                receiverParty: 'mtg1egxf0evwren8l988awl6uolp3980wwfuh32k2hsebnhtafwd7ppxvyc0dk7fpwc1bjp7zvpblnajwzt64bbldx5zdfqezncx1kt2msmes59ix9mecpsefe09wlx0qfwnewwhsijp2nezt30jhmga9qn2n0yj',
                receiverComponent: '7osy21png5i2uk41ery33705q9vz3u44bf8mncpsfvvsq0fa9l52uhp6fxmaberj32f1b71htgc8rc47687t6251xof9yzel6j178eylheub9cmnz8auwn2hopjlm2c4ne3r21iq3da394z2damvudzuvl4nndcy',
                receiverInterface: 'qr5q5fvpqhhfj9z87rx06egorkt7rogfkgqhhan05x0tovzrk6ecpxcct6xemr45q0ras3p8pdp7n5vz6maeepmaw2sy5iu3kkj9nfb03dctnocygcf6xc6gc4g2cb2sg70ylwc8mifp0mt1a7nch0gziphjhlzu',
                receiverInterfaceNamespace: '8dv2waaen7uhvi9mnlu4d62mtrevqdyupofywxhi9dthwgg18wzq7ksn7xz743k3jqfi85x06hh1lr4iom5703yvss6w0pujc09jkbscsyk3dw3q18e23628ub32wyouz0fza2i45t70ymd4u5yhtm6v3whkbhzq',
                retries: 9207220431,
                size: 4546788842,
                timesFailed: 2986927552,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '0wcg0bnpgx1qv4a8f6fw6d09rhs9pbd205wzuyv91ccmatxws8',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '2dse7vcej8m3jrsbsa8w',
                scenario: 'j0c1o66kb3mlp0673tezskrxr46e6dhlvxgq218aoubt41fjq6a64r6hbb7w',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:59:11',
                executionMonitoringStartAt: '2020-07-27 09:19:58',
                executionMonitoringEndAt: '2020-07-27 16:07:00',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'b4gpybntqukeguocboselrxpjy4rewiirocyv478monfyngbl2yy1q3fc8b1ht4rthni8dtk8n714gjpwi83bkocn5bgndb1941p6b9llbmtuqujkobihnjs6qalpdm9jenfdpuqsrdgo0lokwtyqdcr7d6t9gh3',
                flowComponent: '8xopxdmf4bircifum4wz914q4b0lr36r42wbkpbhu1s5tyoag5k15pcgt1fl2su6a07gnjngwe633g2l75gbj5j2agsnofh0x8hpkdl6ct59220ak9tbcj2or42qo278y2o1e84t1rswgmdmalgdzgnxdiif4rhb',
                flowInterfaceName: '4u10cedd1q6sr7eagorouxjkprd4z9xtnguqau58a6g3wrb9r3tpy87eyfn610ygmgcd7ibzzxkt2ancf6ihh38xpq3hpobld3vwvp3kyd4pmol1lw0w8z8gub1ulimq7eoc1zhlmpxnuv64qco2wao73r38lyqt2',
                flowInterfaceNamespace: 'nkdjfvyfa6kws5vgc0eh87emyn356ktu863kl9cisljzqyw9tmekv66ubnt5twygckwm73mcxbdn4fyvfnwmah44moik30cdhxpx6elp9era6jchf5skaab28peeoe4qlijo4fb2ygg4lkhvwevupwevkbv0ojcy',
                status: 'SUCCESS',
                detail: 'Iste quam est. Amet qui hic dolor eos saepe quae cum dolor. Aliquam quod cupiditate ut.',
                example: 'muxgxujz5hr2z67xo4n2sleidw5exmfh18zc87glmlx0we2mfga7h40r623hcln38oq31dauz0cwsl26wl98lvxyozrmo17ofpv31hezpw55iugpfi4bz1n0c7wh2m3vxpz5liaqocqktbhqpv2qnjccfefx8ugq',
                startTimeAt: '2020-07-27 03:20:22',
                direction: 'INBOUND',
                errorCategory: 'pa29n53d4xkgv9vkeakecoexavmbih0cyf2ozp38z155uftu4u3gokvt3peowa8woozhdwyhhbeycu9lrj42wd8utidxj8opsryds7ghuj9tgzuzoxi3wznmi1kvct8poj5bkp4jw4em64icc04zuqus0o7nl1ms',
                errorCode: '2l34vp2oi0dnmb7v8gfy',
                errorLabel: 433396,
                node: 5805049471,
                protocol: 'vcgv5si94u0dw11atygl',
                qualityOfService: '4nv4s7pvqhjvucxr118w',
                receiverParty: '3fffr2j67qrvkzpp6j2eh9w4abcw57n1xle4yu853spc6jiflwzdveku4oxur9cho489hnbhfeav2ujskauflvksil83l5fv2ei3ivkg2j4rf4aewnaz2wh68si6mo262iwtzt5tbvp3694kpipurc9xw086ed1h',
                receiverComponent: 'cdwnispzskjkmqjzzjz0x40f38yxx8syevdy4qvvkz78lug04p3313hud0y8holcvc6k0qnvbtyp9h490j0azpkgww8osofnbtnc6chbyowxrioqn1mer0x8dtzbfco7d2c5ewp72a3ylwz2chu2rqsq3j2j44pa',
                receiverInterface: 'i7dvd8iqshwdkd9mgmhrk9dop2rnu06nb7cdusrkq9ai7ec8r0e8hsd3gpyo9ps30c4xfmdcpnsju60z753mmg6u3vwm5v0zvzr8kl4mgnlhld1n891hq19weai546m4431i7epa9zoo5utmtmpo34aqralvt4my',
                receiverInterfaceNamespace: 'x28uasm2sov1rhcpbohqv8eos86w20934w438pwkt2e2wejjlz20pkm2qf9kkl9yubbvyhvpzqogo96x2jwpvuazkxfxhkj134gsegrgp13t9eqj7y12b1cy7dmb2ffi7blrlk5mxbtlkqot9yjh8o5r1r2oidu2',
                retries: 3116013912,
                size: 5297705443,
                timesFailed: 4280157203,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '0229aq0zo2cauqmgujmqe3rq0sc69guugz32w53ex7topec28j',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '6lkb2l5wejsd4x4ngsiv',
                scenario: 'o91di2tacsnoozg53wee60gfzph93x4onijii9872bvrwassxrt6lvd5thj4',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:09:37',
                executionMonitoringStartAt: '2020-07-27 05:26:37',
                executionMonitoringEndAt: '2020-07-27 11:51:13',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '7fgkjabxyzp48pmg35a44e47km3qkazbft87v56m5ws0svfrbi360dr6w3zanovwo6gf9vmyv1waou4xsex4xa1ku3b1y1xifaprw3pmc50u833vyd27c6v294pm3nptq5uphm4t8lbl6ppvpwk4kzo3hpax3iko',
                flowComponent: 'dva1almlf5mcq3as5fd7tgcuh7jntr4pyrp2udey9ns2m3lzw85353tnwfgkmhybcgioonet88baxfmfskgzidep5h9lpo10mrol7ghpw1ujin1ox1h0a2pqb6zgll0yb8se1l0pxxmqq9zy549rbfwpwh1si23b',
                flowInterfaceName: 'ha78fo3vmwbpnmyos8mxt5yjoxnafledet1ajkbwmp9kthws0qbzg07ei568ru5oktta0xfsjksbk2ct88cmdqa9odb6m3w6kuhyqq0vay2mis21g0ppsp1livfam4uvmim3oefh578t2h392g55pwowq347vybq',
                flowInterfaceNamespace: '5nab9gh27crfx7h6i499c9yofajq8v77vzdhr3adst0szed3gdcy9g3uhn2dssqsdx8462b2dx1rbj8a7z9gvwlaftyt1udy3ylddb5buo7xckeu67lr2qnr8f9yvz44op5inc92bumrxlzxkulozs5fbjc6p8v25',
                status: 'HOLDING',
                detail: 'Aspernatur voluptatem iure reiciendis aperiam voluptatem necessitatibus adipisci. Modi dolorem quas. Minus aut dolore pariatur aut vero ut doloremque eveniet sequi. Molestiae alias alias tempore ipsum et suscipit maxime error libero. Et aut eveniet. Voluptas sit officiis ad vitae delectus aut tenetur culpa culpa.',
                example: '41krc72txihkwabs78dit1z97yzwgynvka03hsocwwx98yio2eaz1giv417387f685bu3bt0n8q9b8q9q7d23h9tecrj9p1aize1awqhdgzsjoeu6z3ubjvwt05rmneolveysb2isf4at6q6g5h6il2n20gw64fu',
                startTimeAt: '2020-07-27 15:51:43',
                direction: 'INBOUND',
                errorCategory: 'byaqfn70ir96sw7uhz2wffa3xmiwlee36dxis2gw9i2312nng1ddi0dmkg6ikxhenar32i93rqqydn5oc8bgog3feiuh5h6bv2obfc6nlyb5nipzjwi6ws05v6coljxpta4pnvm55mudvodczwjop6tglht8789g',
                errorCode: 'nmnol61q12j8ugqilya1',
                errorLabel: 445557,
                node: 3649726952,
                protocol: 'hir999gad05irhlz2kx0',
                qualityOfService: 'ccciie766nvo564cixis',
                receiverParty: 'ltxqcxdqsvngnmb59sktiflq4xcekv5zz80xtnv8xwp1asiijttucej8609ka2hlg1f7nltamnsvymb8ewr10e4s4sw9e3mk6t416723tpmmfljzsykmk4efftxtpgo50vu475sqgrhbrsxrsjgc3j893fccyi81',
                receiverComponent: 'ihm093iaevb2olexhfkjiwz4fk26oz8j78ta8b8na6l3cweye535qvkha8koq5pthvhhz5ze4puilj59f0dh74rtveekgruet5rp1pnno3wym0wrob5l2cso7ffzq6ijod55gjzwlsk3ekw3wmfc4yusw1izn31p',
                receiverInterface: '2to1akbx1d08grl0sn905xa8v4ir21fo6cb608w4n2evkxnrdqgdcvvkw3lqq9cs0pohtp0dznug4xdkoawwpslbrxsb6qyhb736t527qf6g64y1186q3itnx8vocks0iqqispeyn4fxykgq6qg0q7qz0c7yjh65',
                receiverInterfaceNamespace: 'g638a1jbb5na90kp1bfyyyys2j0mgmzj8ru6tcxx5baeye0oq716i7h22b3qq0f0054qny39x9cl81v93vb8v26sj0wgbx4yhcwiqc4z87s5bgxswzobzohhw6mxsnaslrsig4w6salncqd2icv7cqczmxua2qwp',
                retries: 4529272404,
                size: 3977566879,
                timesFailed: 8135033225,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'fjn0qdlmxt9imvpm8ipk1cqwi5crudydjgaxingkizb4vjpf7c',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'arsnk1trogxrsoq6fndl',
                scenario: 'qcz1yt77hcgtbhrnvv4m219685k7gy50rqmmjtblxuchv7gvl1mckc2asj55',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:08:22',
                executionMonitoringStartAt: '2020-07-27 15:06:25',
                executionMonitoringEndAt: '2020-07-27 15:24:07',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '81bamub27239nfhmahqiqjy409lexyg5i9fw2w7xyz84b1esqnp12z9witj7qy3g25roqwzo25wytyrw1yjd89f9fg4xqeq1e9ooynq5esraf363yvl7w7k3jgl1g3zztm5rvnf4ct4ehammlkxaekf5bzsmhtai',
                flowComponent: '6dog6zff71gxmw6pmczfxq54dzzbgge6fjs1dtzr5s9ixuxx06osy5din8cvjmyzehvf0gslicv8qwq9ea8794qvluoi76n6mrafzqrls62tkkfgn03i8gd2pbfv1mpnzm3z8f1ocwvu95ge95e02gqi40bdgoaa',
                flowInterfaceName: 'kiyoq6fqget8zba69l9d77vsd1w1mfqpycpsd3jpjnyuaxj9pjyznm6d07tc9mej1f4eivdq939wepd1fd2110lx4ns4d2fodtx5t4p5cgir18j2uydk0xk4shwfm0q5h6ujfyblcs0k9a4gli0p02y8e78we368',
                flowInterfaceNamespace: '3skwg6146jkyta2lpgc016wjawr5rwjc8mruk3qsr0qwj6itx08afddej9i258xcnddr83o7999kl4pk9x1aykzmidp2w8k10lzwdvvw9fu79mklvzixyi2xsuyuehpfl86d63drf2mf5ra2t89q2ezgoeuca8p3',
                status: 'ERROR',
                detail: 'Modi qui voluptas similique eos aspernatur et adipisci non ut. Magnam fuga ea et quibusdam debitis aut. Necessitatibus harum totam. Porro corporis et et dolores.',
                example: 'bpwshuj5vlwxv9ive5mk8v9sihbvzl66epe2f7kceqsfi3sv0nzcwrsmlna8rm6q9k2ogqrt8w93mtmy9q3ubmpphq6jibfez8q3ygs2s5s8xk0ie03n6opihj7770tgm58g6qpewlt1nnk6j0lbbk9r0wrwcpc4e',
                startTimeAt: '2020-07-27 06:03:13',
                direction: 'OUTBOUND',
                errorCategory: '3hdvoelbm4004z6o7munybk8c1vvffimu6rqbhypj7qtxjnv1o0lgdv8kers2zpaavvt7q7na32jzkcrqi6eabb6isa18ixp0kw7xow9je0exe6u6jgz0v83itri9m9r0bgs9z492mjhwc7wxmg7xvw9op6s6z4a',
                errorCode: 'u78fvic3iys28k8uke45',
                errorLabel: 421984,
                node: 8546332604,
                protocol: 'jo0eodvazpvuryhmilrg',
                qualityOfService: '0kcdntg35let8iukqbu8',
                receiverParty: 'odu48ozys4kcioibm6cxs3ti0qhglcp6hhhicil38h1qir21l0m074atxpuw2e3bcbjl1k0jw2rlxbz4aosue5iikab4lkre0kik0ebakhjap044gzadgl0l77i5xt3pr80l1uosknq87fq2ayigiwaa183vgzts',
                receiverComponent: 'mfu6ez4zswrgf2p5d704q8qo45664y8i1pehqoouras20a9s0ldxsmo1uqgtqgodnkaqsuv5bnjlqb47m1evw1ezatxlywu50zozdi7ivfa86q76srhacb6eht6o5rgasdd2sl7954wjr8vibijbigcftwhqbv9g',
                receiverInterface: 'wmcr0uwe66mtk29gpfki0n9j3hawwi4rmmeakzgvmxrvhmesbg4ygecuh694n8v7e6342ei5ncv8yx2kaalnmotuuko9n9m4mln6b24lsid1vc0vt4vqcxccoe4vo0o2wbubeol3n4qzxipywepc12ye8bmtt04j',
                receiverInterfaceNamespace: 'n6fapyzslnidja8a3jje2hcflyz8wfl7nbuiz3reivse8lcz72t048qgkh6bl4gjkls211pygooanh9s7n7fp4uzi7heoqzr8fw0n97eyoqznt90ifbxxagex76as6y4euw1n1uvp9hs71nda8ks27500id2v4ac',
                retries: 5072671528,
                size: 6170745600,
                timesFailed: 1617425141,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '1b070huc1689ha74vxopudzd2qn71jrbo6dwr6vqqyxjpuc2p4',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '867whmtk8qlc8k2aeqow',
                scenario: '7niy737m81k6xrmupalyor51ko6q4joc6dgo6x3c0ckeo0tbwk0jicu6z38f',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:13:35',
                executionMonitoringStartAt: '2020-07-26 17:03:44',
                executionMonitoringEndAt: '2020-07-27 14:11:17',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'gq91cbonsp3gos53zeardz3jm7n02do9kjvefao1hcvtcsgewm1l613qaxbjpfa7m20nbeak718e952tuwgzga3be3c8vc8ta56zj7evgigsbmh9yhj4dkeqz6rkk6lrovigcf2rm85av4ivrfb5yh9d0i88vdu3',
                flowComponent: 'zuemkp3g6pkpuc56e04a3mk1b338yn2zcwu0ca6y7tj6t7idfoz67cxmbab98sevwpl3t0bceqve4rvsii5n1465llvj6agbbvt6tjv5ff2rc1vrx0r4o4u09chygjeft2zq7rxf08m1amoeourf0p3ui93e46dl',
                flowInterfaceName: 'e7lioikmx5h90f0p3fhzvp9x6uaeg54odvy0vugby1w348jypmrw2lkmn8ukpvxkfj3xlb27pf1hjfhxk5emis3h3u8k9jrmi1nayppa1ebeorn3zkzwy8cozss528s4swf75nh3wc4pauvfd0fveyg6jyke8gih',
                flowInterfaceNamespace: 'x79kxz08roeiqjurkbyg9fe8zrkofw8w790uyu325w5dzxn8xpavlcndhcdesrfb6nwgmcnccroiw8k7jtgydyka6zv07olp7nkbh8peobjcvb4bmp56j4vspjyaxtwhkx3218u0dpe7z6il0dy60cuyyegailvu',
                status: 'DELIVERING',
                detail: 'Tempora sunt nesciunt et consectetur. Neque facere cupiditate. Et rerum minima incidunt reiciendis optio omnis. Blanditiis recusandae itaque quo.',
                example: '8x0c1xjcspos3gg302qvdb8pq0uqtfhzjyxm3t3ygcp1b2bky37buwcbtjprec17ze6l2rpqdzprfomgkz7zp3zk0zxjq0ix8egv2gin9n9f1n0zp02ucrc5132hhhc6qucpnncn46roqa5nng61qjmzoemuibwy',
                startTimeAt: '2020-07-26 23:03:30',
                direction: 'INBOUND',
                errorCategory: '2czk5j50sxig0bh31f1sscbalh075u5togkynu77w935roh7iz8gq6mm19vl6xc651gwdcdi29xmwsnh2vd9ciwy6qnhvjm834l5bb9tff17ng3n2c9o031jd1pfx4ptdf7iksfv8vqu54deyvppd38e243o3mijz',
                errorCode: '22qi2hip8ci0brksliv4',
                errorLabel: 339373,
                node: 8751496321,
                protocol: 'tjai7kcd75w0mvoe7ghy',
                qualityOfService: 'jkqxekfkffspa12foyyh',
                receiverParty: '9riyc6b9whw1p2rj7oskvdws78jgoz3yh6xoewjow5nhtelwgg8k6mfv0yqc03uk3ka01jqiorophl4gs14o1czj0oj46nfix6ufabkg5vynqv952x948dyrx7hk4tsz1n309snk9fjug0y7eg9n9j63odjf274l',
                receiverComponent: '9qchm2b706ddbmbih2ufk2oom6rnknxbha3cvqk3mknff9lwov9v8bg322gnphu5bfqquujxa5steuo6s6or7g0kjyzd3hpg1vsntdncrpsn9d5kt2g6koj9mwue1g51kumd9knomttwvfz7n8u6juo5izfggvlc',
                receiverInterface: '8u11m6a0e1zdqvrw254396ztjw2mlnqczzkev2eu6l0fvu6x47h8p975ahoq53672et39mfum0kip6tgsvb6ofcsmkd40mhk9rtpgitsqtbul6v6mezrtjlkrbl2ohfomx20awmr7643ab6wa0d6zpi47wwn41qk',
                receiverInterfaceNamespace: 'vq20goba5f1rnirc3cfgs9qx763yyw0006a7wt3vs54uy3vwo8ss1td4juw5uep6jli6cej6th6ul4qeds5k30f2a4jbjke1xweoqlu6b9kawg3mp4navjbzigzgyy763uco0kb5imotl1kmgw5goxsv6ox9ow2u',
                retries: 2513343847,
                size: 7273812702,
                timesFailed: 7493680737,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'opuofr1chm1k0dgr6odfsh4g4evobmiompapdusm3b2mk0slj6',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 't5dxdbyd0kmxejhsc2qi',
                scenario: '50o5e5ykxnl7m1j1yxy43y32bubdb37iye7q719ub10a8bn57k17miex31ap',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:21:45',
                executionMonitoringStartAt: '2020-07-27 01:48:30',
                executionMonitoringEndAt: '2020-07-26 22:25:27',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'knzrmr3jx96d05gwqw6coqfxe5umkbe0fvd1jtihdo1scukg3wty1kwwmygszsyykl99edjffu4loszskr74bv0cqu2fm7k4pierkgkj7hamv8ktks3g4f5e5isz5i9rrymndxbwrrba22akmaylstumuwj1ltb3',
                flowComponent: 'f80wdgs8f6z0pyqgt3np38bjvh7w6rzyrtf5lfpuka9sdjqnz4ad8p2hqfjxbpqe5j7cynrzg3ji3qve0run28qc9y12ptqi2kzp09omi3rmprlt5sbkh4z4hxbrmg1hcstvr3kwz510bs9op7asby28x87lozf1',
                flowInterfaceName: 'k5fzm60cv091ghz7zcpny7z0iw6wsnwqzef911lh47icc93p1fqoibcf3l706meqgdroj849ktwtkt2zqep06r43vrbtu1unwpgacm6basplkj6qysineinw3uc17qa8xi4iz4nwjbmqi352bcbqakvnz0wsx9l9',
                flowInterfaceNamespace: 't3h4zfjpkezsvsebp74ry0pchhk1rjcbzfy6k3obth2cw1d9rr3dpro558290q9yjm6g762fstsw88jc4y7sh4hj2i8n1ygdrkrwelzsiglssd3p2wex89gqxjkemqmbzi7khwytmv8ff7x0wmm2mvdtj9boefds',
                status: 'DELIVERING',
                detail: 'Molestiae reprehenderit ut et. Ad maxime dolorum necessitatibus. Dolorum vel quia sed sit. Voluptatem explicabo molestiae velit. Explicabo eaque deserunt quia earum reiciendis. Nemo rem quia et id omnis consequatur nihil aspernatur facilis.',
                example: 'g4ogt61hdbpx93t22rvy3tl3cugmvr6ry433sm4p68anl9ea3ogl8sdlbitde9zfp9ejmxye56i7qau9etcj1b2pq468sc61y7cgg1t7w8ll0rl2mo6n14uanl0ostkucdrhnsbpgy6wpku2py4ngwmxz2luvd9g',
                startTimeAt: '2020-07-27 15:31:47',
                direction: 'INBOUND',
                errorCategory: 'msq3x838pkk710xlqgt0msr7ahxvs39bwavjgatukh1ailw284fkixuun5wl3jxqel2794byyr3uu6ow5jfcbp1ldsk9vd8ph2y5m85cfk1bi5puhrrvhgb16ywtu0un9refu2g9isowad6mpykpcvmjrqwg427n',
                errorCode: 'p3cset27kq8nbh3ltd0gr',
                errorLabel: 807706,
                node: 2425059124,
                protocol: 'mjpcbr5lim25diax6pvn',
                qualityOfService: 'hb3j0ac2ffzbezza6f1b',
                receiverParty: 'tcnno5zn5jnsfsdmnmf61scfvsyg7ozyj6k7d2ypt4q8rtyitfir732ur1kjj4p67y2t5l7zu2gzpmbsj7lnopjj48x1o1wmdb0kbsmfew9qjru5mo80iayo81qyru0eeifibsgh8fh3mvvqzgqxmr6yqz5120wn',
                receiverComponent: 'ah4kprhfmtqfud0thtybid7gkdhyf7s364g8j4rcg3esjqk330ay2uxptm1jq2wezb2oi2ki3uf62g3l51mw6fxzg15obs6vlm5q35of0ptz37oe4ppiybe6mlk5mmy359k9iqb16xqem5hc6r3ksy0lahqach8q',
                receiverInterface: '1mw8k4eg1buctir8kznq3ts83t5gaxl3vd9og3n1346evhubtkfzuq2z2x2uc594na8jlxqheuslbknncco525zu30rv4qgmzknn0h4brr4kke4r1q1rgz3idex6dpx6fx5jw166l71wo38o38i4iamm30sheffw',
                receiverInterfaceNamespace: 'a7txmlsqu69kh45nnse7a0enbwvnxvvubzghadzg4d6r5q47z82a0nm1y50uhuu6i40zo4tgiuq6yw60jv2l468attwdwhk6l9xs40drc0btyg6p4pswzj0cy75qu23o5nbenjbd0bex7chk7gaxgswnjy9ucax6',
                retries: 2857589422,
                size: 6675992804,
                timesFailed: 4857163515,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'hbipvlot8yc0kqw8sn04xbz3y0y5zkpru79kr644iu5uenzakl',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'wd7soq4pm7i86deorz30',
                scenario: '62lf3t8h1jkdwx5fsuougpqz4j0szvxz9zr8y4f0hydkodqdf48zgev69tbr',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:01:16',
                executionMonitoringStartAt: '2020-07-27 09:17:27',
                executionMonitoringEndAt: '2020-07-26 17:53:18',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'ikzmg4arizzamrh82rygwk436v2vi3h9xbch5r0842mr77jrseuulfpjhllzauh1abrxckvzt1sb1r9jl2rlozw1p8767o86zfj95gybpr9iks15b5etajsb1squf47hqfu4sm3wwfbw0e73jp4va7rkdslmz0a5',
                flowComponent: '29pqjeecueuk7lkmof5of9uhvp9mu4kssvkbhbmqkydqgosb6ju2bm3jyt0pxqpznv6o56n538hz6mrg5c5zl9swl8il0o11e6w7eyqyn9rt25cdz3pklws0j6imnr7v36tyo3a5olv9zezuxhj331f8tnn0f87c',
                flowInterfaceName: 'uvc1rpvspr1q2zdf0wo27oukq43vish7hvj7jblv4wkdtlollobksxsrx4rd202dzxopsawpavp86l5b1vfyfxrsy00xhmb89b0bikr7qfq7a4h4whn99rizvidqnt76ukeluoh27j3g6obf3znwueknizp1i7lm',
                flowInterfaceNamespace: '75ye61zv3udtkj6efs8ri95poovct9jkydzzwd9jdmuh31j7nbohz1zka017ccf10wwbj3arv9bqh9jhgry56epwnpslnlrxab1uae958fqs1x1uousuxlcqvosm7k5doei2j614tr9ki0uwz8w4aea1itsrzsgu',
                status: 'CANCELLED',
                detail: 'Maiores similique commodi eos soluta quos est et et est. Assumenda et aut consequatur enim. Fugit debitis aspernatur cupiditate quod vel sint.',
                example: 'f1neop5ogwrfr9yn1jsmtajuqn1jzk6fb68jepppb9njfo8z0e2hdhmmrcntpyuijh5gm49bw0hbxsn4g5fxgf6eozlvfyvc9ej17ofv3s0ksollp6ksaxmkftv9vkkwc3nkky9yxu33byk68sq2mlaa656by2sy',
                startTimeAt: '2020-07-27 03:33:34',
                direction: 'OUTBOUND',
                errorCategory: '99wweqsnvrov2nbpw39112m5qq6vh5ff8rzjmp9em1sln1g05jmv8mzuaw8j5pbdnsbrzhuievb70pysakfok3deefgeo0g4eqmb1tm158seybubdt9sf6gmznfqmpqa4prcv0nimytij2mp8zzdo1r5j444pbf1',
                errorCode: 'ms75p8be4b39v7e9d6wt',
                errorLabel: 7668949,
                node: 9981866737,
                protocol: 'k3pcpcvpc262z1ah30q6',
                qualityOfService: 'iufk8rm64pmnapp90h9m',
                receiverParty: 'f7qdq82c3l1qoxv8ripb6tsip2n8m5uiu3tzo7pcmwbt0jg4kmx77g4i2hqjmyqqv97hcvqqo9i479a9yqajiwdpzjnue7onm3qvq9s5z54kljjvxu9tln27fkki3fbuvi46kj9qlynpmfwy2l14xyke50lfcl6b',
                receiverComponent: 'x9ddpd6vn9qx6y2iwu45u1g0t6yydiyfh3zbngdcywdyvv5n4qg0vo01q7bux35463za32biicfzfqkv4xry4rq20qoee635ipcjdzmei4kdjkd5etdqshfr874fs2t7hd1a9nalpflqth1742g3wj4uhmt6mdz4',
                receiverInterface: 'msvhvpbr1ct0pegzfb0d22f8vkn3nl9ar1zgs3r2ie9v9x3jb5cwbtr0ra02ai8mcuvumj9zofnjy7vc33yowbu9xkwroim8v0jbmh6sa7azgbnl7d08705zm9i6cdxneraqtrfe8vdae0bsi9fnhu4kxrods6mg',
                receiverInterfaceNamespace: 'b5aew4ijxqp22jj5rcsph6hptkxdmy6muxy17lqs7gh96whlcjcutdxl0ejksktrduqhjhc0z1yuke2t4mpc85c02gcy2vbb55xguyvy4j6jthkf5beiav90mhl1iipd82nhgyjb24d2bqfo4e7147lbks9sst3x',
                retries: 1242340016,
                size: 9295582252,
                timesFailed: 4019332349,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ixs6bkhn479d5o8f38mugl5qwwqc54l7lqa86s5e8sx61v8xmh',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'ai44x95nzkj1sp68noyb',
                scenario: 'v1r2uwoz4zgv7yy0eewkikz7yzuk2o6wkzjpe61s2v12jiq5sil6yivbpec7',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:24:22',
                executionMonitoringStartAt: '2020-07-27 04:53:59',
                executionMonitoringEndAt: '2020-07-26 23:57:38',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'eewluyonoa5z14alux5uxkawqc47cbknvejmcb2iwlh6839mzdh1eddew2jzh5561q5t8t9t9gbgdxj6ylywjl8zfo1c8vmwje5ufdtqktsx0jb884zxa9w0s13cgmsfpgixx9u121zsu0v6myevsellcunb21i4',
                flowComponent: 'q4kdovbdqb93sducs0pmqxt2issbeyplhbfescjpc2qka8ui62l9jg54mlqnj3czxkiy5tnk2f4mk9grvi6lftwnzhgb2ehqtwckds0b7ytb8qfmy9fyhh9ip53lsu80zg7jeguo6jp1g2pv4e9y0il90icurhgs',
                flowInterfaceName: 'v7a0elt89jnuxp94wlc48i4a4l91p86vx7fnayoixhkldt6p3sar27k3ojo8bqncw72rgdh3vtbbkhblczuop0lzrihjlvv1bwm7srm392cbolekycawuxzp245a7zvq1me80qsg5oyk2srhg5v795wp3l7x6eqt',
                flowInterfaceNamespace: 'x0nj90z5xmmj3asxrrzhnef6r7h4v8fp0997j5vlublw6t87zfjcu4j6tzt9ten2iwbbvdlotpr8jgzda66i3s6bgnj00poiia8v6t7dq2lilc21vcyyolv2d0g8wzpqn1sek6j53efup1weq4pvgundggiyakbh',
                status: 'WAITING',
                detail: 'Et commodi voluptas reprehenderit aliquam. Aliquam ea id est est optio et doloribus at autem. Natus molestiae et doloribus voluptas. Magnam dolore assumenda rerum natus perspiciatis excepturi aspernatur. Excepturi alias voluptas dolorem omnis error exercitationem.',
                example: '0opironiix2nyizdfxzoe42v3og0nwwtzgzjie6x6vwquc3zzeobtrt3nqnwd3w11129s3wer3mmo77ix2k5xb4mlqbbcn8ia4e38ylf8331r0e1qq8q3jfvthjmbu5vj0s53b19wvbcdl8pdso40aitcsad41o1',
                startTimeAt: '2020-07-27 02:02:14',
                direction: 'INBOUND',
                errorCategory: 'b59kz9828wxzhczmx1z3vcbbr2wy3vbw44aa27edh6hvyg2qnmjet7p757sqkbivv1ypfg7evc167j9ofmnz6irkixfzgxkn4eceu9jdgykbiwhp62lw53u59s1hxuzbzk6vdp59h9s4a8qfoohhaijtwmv6wacg',
                errorCode: 'vbo3af4d8a716erkmy3z',
                errorLabel: 884107,
                node: 17836799866,
                protocol: 'ine87lkmhyyfh2duztsx',
                qualityOfService: 'c4t8kts8dh7d4hfjnuce',
                receiverParty: 'qkbc8f4b9dtwk3nqjxk2lzfy8ckl5gl29hi2zb2wa0wfq4nkseqf5zfizaqfubiv7xb8vymyx17gqux70i8596rstin7lg57eh5c97zcepqwlcjr8bzvw6gys99u1cw8mqp02j7nh65a9cxfpm34n1z4anrf3mjr',
                receiverComponent: 'ma1610roh9asszw204gcwhi050sm0949nrrhhv7k7bupvt47qhx2zi7970xcm9rbb45mm9dduwg4cblikn1mi7mttpz47gzaiotokm6b1n6reqzgoe3vljqwfy5pv5uvmf9ivf58cefhcrhjwo58hxhgydf51cki',
                receiverInterface: 'nc0ztsxzob9fgqai44s8nr4or7363jzhr1jzx63fi9m1o6n5ciqjnq3bs9lodzf84otzld1b1ch25t0e5r67o3gjqpj3f5roy5ntbz4bsvy2l48rdobgsmgiqj0x5ocemmtil67zc6nwh58on14sef8phuo28xr5',
                receiverInterfaceNamespace: 'zkwfoudnnod5keg5cbg0pr921qf24p8quenqhb3w9cs6acgzvsuxoqv8nj0lda3a0ozp1an9ygywt7q0c2yfp2trq6clnhfsebt71r4gtjq4ae3lyh9junnp1ykmtlcbr9wdu0ueqfw8uwoyvfr5019poxi16m4a',
                retries: 5485821536,
                size: 6572305285,
                timesFailed: 3130672667,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '2kpj9g8q3s9ve43nolh155bz4a56a7h66r6punt188fgjvx2qb',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'z1pa3wdjcdidsvrzteua',
                scenario: '5k3tv7kykh0o517lu50p0aatgbougolo7dwgpxr8x593w1vk8oycoiphcf8u',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:28:05',
                executionMonitoringStartAt: '2020-07-27 14:06:45',
                executionMonitoringEndAt: '2020-07-26 18:19:54',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6z4k68zd0hc8k084xgbrcnt11e4osaw4938hjjucmant1bimw6pxmjltb9hev0dxegk3kgowxosgkjzl202dkrg429jewxzbe6ai7fvni4tzqghtrguyo88e9xliui7dd3ujm4hi2tfgjwg2iumibo673moqlgc5',
                flowComponent: '6jh97w676qu56r632tf0gk5d3pg7wc5y0wj6iolnzktkrcd6jfm3in7c5a15kcub6htyjhf6ah6f97qj8568hq4om4zffn4m26ll2ec3tx4iotvqkeahlriu7c1a8qo5v4vfm1yhov8a6g8091ma6xlsu8iqkm7w',
                flowInterfaceName: '0e5s4t6p3xymr5yp7en4tdgmn45p8eu33pkl6fml78yufheof3xoaqkabe8agmpfrjnwdqpt881j4weau68zk95o9okbscwgx7v0gvykeggiudy2fe3vup9176fxfl7e2edgrkjxqf6d7uc77mcd4qklrxl7zwkk',
                flowInterfaceNamespace: 'obiysy5hxtwy04n10kxr1vx0rvnh4qudkuq831zxjj4r2owq8hc08frtq7f7fjjz09jwh2cdjvctvhg3livw2jgv6i5u5t1hnugmicljio06st2vshen2613os95qc4tyg0z668oa3vom0e4w5dizdporsqcctwe',
                status: 'SUCCESS',
                detail: 'Repudiandae numquam dolores voluptate sequi officia sint voluptatum quo. Et perspiciatis perferendis maiores et. Earum quibusdam non voluptatibus sit ab error et. Nesciunt nobis placeat ipsa omnis sit et.',
                example: 'diojqh67b8rqwwoaxacpi2iofqad6vnam3dtbabwkpwwpfe067udli8uhozgrdk1s4ax8k1zo6lavqa987w6wqrbh0vis4d2z71w4vjvtzf8nhrkdwarroad5bgx1gastn8ezudbk2r8ef8uvag4umi6fhvldelq',
                startTimeAt: '2020-07-27 11:37:09',
                direction: 'OUTBOUND',
                errorCategory: 'h3nxy1n80kwmfhhkt758wzg67axqb14xuplkg5xlx8b3kjf9qqwn0nh3o060n9j93mdcrg18pft6x1hlswpld34f180oi2071ur0se0kwtgo7wvzvilbdf1yth0i08l1o9sd6jlbvvhkpqesbhhqzm90b67cjqok',
                errorCode: 'tubjbvbl579z77y5o4lx',
                errorLabel: 200605,
                node: 6196147474,
                protocol: 'vaolhhcnbk3i7mvpnqzxu',
                qualityOfService: 'bx45tcxt00y3ej10nspx',
                receiverParty: '721mnb1kt6qamg35g3nq4xg78ccxw4iu94chmehi7qy1b5b3v278dt4q6nmdcp4robmqxtqdq6324xkz1tkkv44j766ux71sockcvrydukw9vav5peedqyhlwttyyrl130vl8319cqfsd20tclrxb1erjl9r78c1',
                receiverComponent: 'myaufr671ix0ou3u7v663navt9teosx37n9n641ojipxvvfyjao36eftmfd0fjnr854w7sn6v8wr8c820zeezgpgnc0k51p0rj5kwg0be6hqutsp60fc77yb7wfq85tofbwiouvmfl2ljbtb8belmvdxrnh5amek',
                receiverInterface: 'xoxtuc8g416xuqkedxa9jzc8qn3bugkf0vaxxpisxxaov53lcuffd0jc7ssk4z8vt71nfkcrn7wra7nkzu3nk52usf5dt2zmfahds5omebd2o2zk0hwqofav3tzw5u0i5zqpak4c9npj1q9ud62jym46rq3bva6s',
                receiverInterfaceNamespace: '3q3lvptw9dyq56vjxzzaz7al1omu891f13maf822czytr51zojn97qsazem7s71hvjgxtb10jna0usxbrngqknripjxbqi2xi6q8l9ezlx1n50z6phkor9o41aljfm4mu5yxvn6g4tmm9jqffd6f4yujje0obdwy',
                retries: 6294156063,
                size: 3146133301,
                timesFailed: 5045990897,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'or7tusf1klj4o0oim2ey1m0mkf3ym5ayjm4s6i6for8eucp5r0',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '1lwc2vzsn2a6dgklt2ar',
                scenario: '2ga7xnntru54o6xmo1pn4zwxb31ddt8p6xs89nic7w795xp38aiiesgpsm1o',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:16:55',
                executionMonitoringStartAt: '2020-07-27 09:43:52',
                executionMonitoringEndAt: '2020-07-26 23:45:26',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '5cgvo9bycydgo4x1chagylyr40mgahmuq41ndqsz0c7v4ba8ral9ojwm8m65o4y02sqg91uft5qja2hq9v42blpfnzks51o7eskcffrl3d3xmgjp8jlhk9heuzx1dr0zor1yrcqjc27ddp8nc7eo0ekqbzokk6nv',
                flowComponent: '708haafscoxvkg7ciu7pokcdihsnqyo9x8ocesuxxpwqzbawql2m4mc46k3xwk5i507hp9oiwi9we2dazzlsashiqy6fa6fm9afybq5nviwpe3buhzj8kcbj6aylivpjxx6uv5jwlz938kiny69b7ybmspi0ll7l',
                flowInterfaceName: 'eyu0e3p4z88yyxes663ba5s0maq27m2xuhiwinup3avykof21b9a8ln1nz76ty2qcgcpckqketacf7exwofh1z2de9d56r5nrq7c44ty9kspf31ez1xmm4snrrkd5vxryp34z4avnjvrhnv8vc31e6wwkj92y7b4',
                flowInterfaceNamespace: 'hu0ftvf2teb2sm64gks9nr9z5lnwbxg8vxhli0i7ec9ahydxy7nj2m7nmuu4sllds2fodxc61oow7rf49pa2gfczvbyt34c8jhob2169g7ixrtqnvodzdu1hb5pmxajoksfy015q9op1yxt60imevwcnmekl031p',
                status: 'ERROR',
                detail: 'Quia maiores voluptatem. Magni fugiat quibusdam laborum voluptas. Et asperiores est nostrum eaque ipsam illo. Vero enim sunt distinctio nihil ipsam.',
                example: 'tzmznox9i9gfz5y5l7uddtnalon71zc2kpgisvmnuhdvqtlqgclydshtbwrayizcck9uikj7iu8ag6ky4dqqh04ti7m6urkplqzd6us6ilvnne9tvrldx8cordlt66anga80pp4btj7ite3v99j3jx2zwv6bbkxc',
                startTimeAt: '2020-07-27 04:36:38',
                direction: 'OUTBOUND',
                errorCategory: 'b3vq1sxqxtqxm3ykd2nie3m47nqzbx3xt9codiyxr0u1yspjc7q125gg1cs6uu4xkl6glosldl7n2iyu96ch1pzamjpsfhfve1r9841g3isrbsig4aom8ilnjbosb8etpsqbtwhwr7qkpsroiw9jbi119583mqeq',
                errorCode: '7kcp9f8x0fyeevn8g6k8',
                errorLabel: 589647,
                node: 1609581933,
                protocol: 'jh9vsd5yxqph1ekvc7ne',
                qualityOfService: 'h8wqim0i66giktlreqixw',
                receiverParty: '7szc87x0awxvylw46xk6ls1tfzeqwf2jcp98l82qrsgsqssickyczva25fcing3s8zy0gw7ub7z4x3v5dhjwmhatynhrx11qifmyvoo4palm1tfq9qmv64qd5v0597uwb1d2mmauvpp3xv856mlwdxqdhzu2xa6q',
                receiverComponent: '77igcbt91olr2lw6bnd8kc7gu6cy1xhio5j5z0fdcpr0bgr2kmlvkpgxoqog8pjznwe5wgpxuknjkmojxsx9p4uto1ix4a8sidry7djznbrhr6fd4cxqbvymtgur2k45qr4p6axlfvzid2duabfy0wil14o6m76y',
                receiverInterface: '0yc02bvyozavuaziig3ecbxox2aq5gvnsx72jgqxj0jqa3z7ibfy74579qiblbwgcrb6bdrbksx2by88ozta96anweojykpd2fw4wjr5m3t89pbb3qturcixnqgm7vbyk3tyli6w7ihayn69eqaqtoq8p74ddx67',
                receiverInterfaceNamespace: 'py8of4mpma6hfgjh2iv1bp9s09ffy2t2cn9p7129oez0mmxbvgmya62jkcextk06n6ov8oz2h89q6b8usuuutooto5hefi1fb9ku58ldtgb08kmbzht96qhkym5gyn2afb8ocjgg4cjqmk5o5xoopipb8lqkqhis',
                retries: 6075515194,
                size: 5680103915,
                timesFailed: 7462026919,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'xtwgj1eifhfsi9gnwexjg9tbi2mos9yfcfiuyzjchp9j3cczl3',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '2kmb87nodlcauvldjbz4',
                scenario: 'qhj2bcp5m1wd0mbt081im2kgvsbgpkl1p23b8wtb6jewde1y5qpmr3opa8tc',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:05:10',
                executionMonitoringStartAt: '2020-07-27 09:28:26',
                executionMonitoringEndAt: '2020-07-27 12:12:35',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'yl633cw2k38e4i8kl5f4rzf5btd0qucl0q3rud6lkewg231y31q0pbqm9by38ak7vepk6m3tn40dy19d2g5xexsqh29izjbt2encjltic97g604behf02fe52joryoyk5khhrpaglxozakug4i8fbje3srk7te00',
                flowComponent: 'lkxux426k9zz8ryo36isww1tvsrv5f5s4y7zvjifk7uajghmr1auvaz7lw56y5lztbs6isekdlel8et5wfak8jwrnwn853jqmhwctrgkv52wshe4uzlm2gkpvo63aqccffvwfuq4ip1gbt9580pr9ptfiqppgh12',
                flowInterfaceName: 'b5o14d8j4k8xg4ax1i1es3zxh04n55ugnmycpaudkqoqt36vxytkqo5g3x4zb5rnb9g1fz3kcl9bocsbnrykxk26pgv9tuet5iy6skiy6dvz0bjyzliqoyy8fm1f61hf2gti88c3sltwzpsvi6a7x7szz5yz9old',
                flowInterfaceNamespace: 'nfyraoc4mnt1pyyklks7jzzi2v16m4vpea5yurpot8lr8rd9zzqr96e6174o2sfmbw1kvdxrp14mylr4gx5s1iwu585pb63al7e6364o05jeml3gulwi227btao8b9lapoed0kl389on2gk66zcwdhy81ofy595k',
                status: 'SUCCESS',
                detail: 'Voluptatibus omnis repellat numquam eligendi velit omnis. Ratione quia ex molestiae voluptates impedit. Reprehenderit voluptate ut. Libero ut dolores. Rerum ut ad aut voluptatibus aut nisi.',
                example: 'imiu8iav6y1451z9maswys3v03xakqbwb5wzs088dlta090x88qerf22a3trn6t3v8451seus6t1bim13potxj6k04xbuhvxv7rrci1pzwxd1fad6fypu192tcl6ibajpkfrlfyw9zsooqmcd8ugszqpdwqscnj5',
                startTimeAt: '2020-07-27 11:17:57',
                direction: 'INBOUND',
                errorCategory: '2qdelcxpf2yrfjp9hfy47f9gjm1p2h7ku6b55m5hvlhqrbntz82ui8xjqzqk9ogoiarmg7dln4wm23pk8efdlhbuixmvsdfg4ttgs166d5yjqadyk7c9yw8p3k8zoqhl3mtjz2pi9mz2hktdqmlwyxim5xn4dkjb',
                errorCode: 'u6ats7gt4bax8ie35oho',
                errorLabel: 800056,
                node: 6408311481,
                protocol: 'y4n0b9pgbukbfhr0gtg5',
                qualityOfService: 'jqmx7lmgzargunanf8f0',
                receiverParty: 'ekmnkpqe6yyb09gxk27sqcunu0kgwxmxndnuzf3achk17rlohp6rsypzmiqzwcdqm4qfuewmdmmz7ulqt2ilo6ka24ns9mj1zzcj1e436609jj2iay8xnsnjl3h88je6rgl1we3d0otrswpr5ancrgr181q705lso',
                receiverComponent: 'ku153ltj4h8dj5fw4a6xhk3r1ihv4mbn3w1tszuifpxso0tkex00pnmrhhmi3n9bt4dooku4mne57wzclcdiby9pberk1m8vxmg6qk0p7vhoq9cybyshghkwl6cfi0xp2qb2vhdqi3w70gftx2pvrs77kv58pn3e',
                receiverInterface: 'k9npjknaiyqy3fp16vqih4sz2xko0cqnj9ln9qbh31x1m4q39zkjh4g3q6zrmkkpnl7wbcweuigj5e7elzrypp2wvkzcrqg4k6qb91p8x95klg7d8gwwvbkd3ubkx4pkm72glawzdj5tdgevtgwzkzfpf1x9f6qb',
                receiverInterfaceNamespace: 'dh4movm4wex1df9pdrjztjwacvdri1wdgssefl7omb6ri12jxkgsg76191vnr7k6955n1f1bce65wsfab5ztahfvj3e3hv6rrawdtkcxk0ynz9lwv8mo8kkgd1bloojbkexdbr1rf6g0hprqaj4w0dzxr945fd6m',
                retries: 3030484155,
                size: 3175005024,
                timesFailed: 4029157387,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'tjdn99qn2hegn74ggu918kji3l20axiym56ow6jugc2517u9rc',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '4pi74yct3sdcft6grn9a',
                scenario: 'f6n7rxjdkcilrlwzh4ovoe3ln2b55jpn5uva7ipulp1f2wt9uzrfit2jymdz',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:13:48',
                executionMonitoringStartAt: '2020-07-27 04:14:31',
                executionMonitoringEndAt: '2020-07-26 19:55:52',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'pvxdmajd7mfuzgmso9wqya02ah7fdooqpnbvokq7h1ohvuxxag9h8akaeb2zzz2t5zd23x8c9w21uxx67l6a0kf36cq5frzz5m1p9dn2y74r0s1ozfwj6sm3uffll077iuy2ri3xxcydua80ui1s4mrvznu7463n',
                flowComponent: 'ezrbfrl07xgaa6ord3zqbnza7aocdmeelgg1d77eb1jzn2u3fb0pppo8ent8hplw7dv0rlsm1o2o0tuov2d2s1xj06m9e2mmez525uwesqgg18sd4741wkrwlr3afg4o2xetr61unfbknox1y99hdi4hwq6xdxqz',
                flowInterfaceName: 'wdermcmsqzn2ia3x0mk0zgeb5mrjq8clyrsuntkmw5zpvl5ddemponzqwyj246zni8jgk1w5f5qy5thimuf1rg530bvx5h6hi2e0i8flpll6phvb1umi3gj09djnxx1bav0z8y5lb1enqabfmq42xcdt2mfl2h2v',
                flowInterfaceNamespace: 'nljb79g2ameofr6olyq0v3yay9h5qsr0936qy1ozi1dvex1otlpqr7nupmfltd4bb85xgmw20idlmzfnxb1alghnb98hehnoq8k6nyz3errryg2tzv7fmnbx95b0lu8om97uvy97mabja48meuqzadpal2z9wvr3',
                status: 'CANCELLED',
                detail: 'Harum temporibus voluptates debitis saepe tenetur temporibus minus. Ut qui non et. Doloremque odio eaque laborum. Qui doloribus voluptatem ut quo ex porro corporis. Omnis modi voluptatem.',
                example: 't9vhxvx1yu0m09o527z7ln8tdvwpsobc01bi3piet6rpaqhfneyduxyuic7kbw4cscjampqjcmqg7xv2nq5wo71grdwxaiy1bkbuv4s2tjq534roztb5kt6jlq33hld3e3op2t1qsuyrftrl6o7hko3sy7ajigtz',
                startTimeAt: '2020-07-26 17:55:42',
                direction: 'OUTBOUND',
                errorCategory: 'v9ej6y165o3vw1ou7iy3kycfivsy3iu7l6pdha1i560d59wpogda5ew5pfy66wm1trxsboowpl2pp51mk0fgelwau0mlyy6mhc1nl1n3htl075k5vgfikuk6haq0sgasm6f9sf4av0kuihokhbbcmc7t6mxq9i79',
                errorCode: 'dw69it72e1wopt6qjibc',
                errorLabel: 652707,
                node: 6722567060,
                protocol: '55l3g0b7c20gyxvhvv3x',
                qualityOfService: 'mcz0d2ezdimflmrqs4no',
                receiverParty: 'fxffbt1icaalo53b0ehczmrxmw2vopwxm7yj2evyqcfsvt5qrxt5nw4p2vdsooioh1vwfj0kykqh5rr775bajmemlfgkgfgaptloytvzfr6lz45gw1qftm0d35s3b54s3wrko8j930bzxtyntfsns2hxi51a03r4',
                receiverComponent: 'k6dep0tdly4x5nv5rs9zejt9rnzyucrqjv19ly8fmj2hfdml98oqnpcixbqy1g6qcfkv2ko4k1dk7bys9zu28b357266xy5ka8v2lb4fx90ilgzoaq1qxx0xe8nubujpedtr2btwbj2wipjx8s42a4dwl5ae614zv',
                receiverInterface: 'na7aoj1vfvlbdsosz8qdif8uynxidteri7l7e3j6rim76v5v7ae3ph5c5zaa27d92q9hurwethp703vhmejo4v3p89bb1rmr6fmhoulj6jojfucjjlyzd6t1s1ue7d5cg54pt7kel01w5ge279npq2i5l61fyicy',
                receiverInterfaceNamespace: 'ql8jdpc8bdm3rx9rfhxnyma5b5hr6gkg9ansrwd2wlb8yn060273n03u43fndjc1s8tmhpzdm6jewnojy27aui13gnjddb87itxrv5zbfwhorckcofm63y59q1isnusantjw4d5ftmi516va9syvyt3nl75jzvar',
                retries: 1308464996,
                size: 7674917559,
                timesFailed: 5684674584,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '0r2ssnwa3bgc4c33e88trs90vd0599fxb4x85b7unlpqtx1sfk',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'xjoipqz1r0l9atmkzr7r',
                scenario: 'v3wr4ujrg4dnrgmbja9hntfx7cl6s1syhiy7ktq8y2c4numskuwlmzvgwfkl',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:18:07',
                executionMonitoringStartAt: '2020-07-27 10:33:50',
                executionMonitoringEndAt: '2020-07-26 23:25:38',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'focuy9bca1rr0yyepkiwan69exew8a24w4vlua41ix0n76eue0leb029ftkk1w5akz34rdc8ci079r5z1sb2gcbd3chftnjttnm8tki9ryc1b1tb2n0zvns1tjm29a5uwesizr9ekmw14dm8wk1sz5c5kmlysiom',
                flowComponent: '6b74qf372ughbiq9lmf7dhrlw3qknjv4xpdojht0687hd3t7t2kqh5amu82fcpuubovwbuozqgzpmcy59vxuibmsyc5iz00rcmqz9nyk6eqrzdtq6evuy2k4dhqm91esxob80ld328rije6qcovwaher6v74hkdu',
                flowInterfaceName: '5hk5sfumbka93jk0j3qov1z3edi348lyuo35dh9a3heq1xro5cjcok5lnyh2ys0lwxn1s12w125nek9ib5axoxtp7d0ap3g7swgzjns8bmfpxo2rbsha6nb3dwoqywihz5q63vxvxq49ehjfoq4t4el6xmz578jj',
                flowInterfaceNamespace: '1vlntnydtsguvnwe593eazvkplu9ee8zp25wwn3zh5rs7luxmndv2iayuoewmdntb8831gdya639xu7kdnavq2mc6c852xuxz3hhwij8hi5ytpvbbqrzzju26h7lo2p5m5zuvbz4isk7d7g2xea8vrk0iags60of',
                status: 'ERROR',
                detail: 'Autem libero ratione rerum blanditiis quia fugiat fuga mollitia quidem. Laudantium in consequatur. Et ea cumque totam maxime ut ipsum at quia. Expedita delectus dignissimos occaecati sint non omnis consequatur possimus non.',
                example: 'rx2pqkuirxt95n87vm3zlhuk8ch68qz2pfgh4gp2gr3958x6iukb9y26mkvfkowdmxecpuze1rbnmk00ma4i5h78aun40jesn3xnn6vng06u1rr8gxhbnvt4q2teemz72wdqnut6tkp6w91qc3n67ut964k3d2jm',
                startTimeAt: '2020-07-27 09:44:06',
                direction: 'OUTBOUND',
                errorCategory: 'rdfwv7lxzjbhd9u1u8ejhn0nox06f62c4f6pc4433j2rcf5cv8lq3pbn5uyb6txwxpxcu67ke8ipxbsvvr81er49hgngx8qqmj0e8joxzdduzuvitn5492np10icx9lutmhyivyz30dt443tabtqzc5d4o6h8nb4',
                errorCode: 'ynxoiur83j4p8bq1611m',
                errorLabel: 922042,
                node: 7391214991,
                protocol: 'kuzclbjldztbr5m3uup3',
                qualityOfService: '662pqbmrp7q0q0e7yzw1',
                receiverParty: 'bc4z2vjcskbz7jt9ibjeeqmcb82syagpnfar6ars5bxvff8l4uk8frc7zv8d3pzfuldigvv69aww77m315ppr3lb0gqyz5x59qqgj0ellbybhd3o9fwyx1kopgfuw6iux3gsylg86vj776m3bpn25lz36h0zwe85',
                receiverComponent: '5ppngskgny9u5kfdrrpearj745xrk9ruaexma1i1opnpcdr050w9htyrqvp9bu82540jomff6x2ajw1t3ruxdpuay1l37x0svnc84ql42hyoe11j5nvpi3i8r8zsequkk30ph9e2y78bo9hck83x5293sow7fd3u',
                receiverInterface: 'mi5xs954yi6leod50jbuegh8rtwvvip39rainq5qoeea8wocjv4rfogbdqjxk2x5ncs4t9oz9ue43grlpd22urrfiq1tcasv5h0u0tetlonyhnovutuq7ukw3udbevadx3jwxz48lcuppf1genid26burtjbf467n',
                receiverInterfaceNamespace: 'vlsz2hxtv5nb4gbrra6ymif39n5owim667ezmzp6dsf49xxa6npw4yaxvuhrfh3irlu0l0y30tbjo8z1pb9quhwbqsxlltojxfsdvs8phnuiv8iwg4u31m3iyb4wrsfib83xaue6rlnz5iqk13tv5lch0i22pw9g',
                retries: 1310884473,
                size: 6519223474,
                timesFailed: 6693928705,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '4e1p8a4yctuyb52jlzjnfor0plo23wi7jcz1t7wtv2swju6ndp',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'x004kf8akjexfbo2xfj6',
                scenario: '76yy5tg3gruq7knb5hpjyvrxit66v9zeqlc1pthvdlpdfxvz7q01v9y540sm',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:18:44',
                executionMonitoringStartAt: '2020-07-26 22:07:10',
                executionMonitoringEndAt: '2020-07-27 08:58:59',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '8r3dw5t8nrfel6jyuzk21ygc94686z2i46fqtop3qa584wzvnna5ogsllfpjtj6ux7309wlg37fpycn21z5zb4zb698h3mx8kgoyz416iiv6bz189davddjyvleczfro16ijj1p8djlst244ws82nnzl2e5g2oyp',
                flowComponent: 'uwip3b0b5ul83l4bnoe68s41r21xb3r0pw91xoe9qarx4j396741ti9pffdsmpu5vdk9lqyf5a96t8oh7q20ocyni5jt11jkagivbtiq2ejnzdclet4ydk9udepzba4h4lfkfoy37dcdg1e2tv1lv20yxcc2w9fr',
                flowInterfaceName: 'q6g4q29pu8od3oyv321vhw4ht7twb6n1q3jwimqxfr7m7k9kph9dojv6rv7vwno25mplvnm4f1jshatjokzlxc11foavwepk0obpl6srh78sho3wqncxi6iqc4w9ynfa88a3n98y6uk8q4r91glpvqf7c8y6ruh1',
                flowInterfaceNamespace: 'cvejffj2u56relno9tq8ix86hcba0ws7y8m3ko5bbmwthbyuwfr464ou7dna4ssbcaxgigwpk5i69g7va6pyxaj9eipsc05xyfntiyqal08trwmjs86oj43vnt3dz6trwomgbh1ng3vh7dewm81u3raxdsw1gwo1',
                status: 'SUCCESS',
                detail: 'Aut non rem in. Nulla aliquid est adipisci nihil voluptatem quia sapiente voluptatum consectetur. Delectus similique rerum dolor culpa cum atque. Accusamus non quia dignissimos qui vel veniam expedita. Rerum minus hic eius ipsam.',
                example: 'nmu1owramy287v5heplcwi0risdg5owzdg3naizree73560yinbtapop7xl3by2hc1i3oc10a00xem0a8cxwuxjkj2lvc10eoecfnun37oji0u7q4ysfku1lh7754ce4a4a4t2ivm734d2cekfk7z2ogawo6tb25',
                startTimeAt: '2020-07-27 05:35:48',
                direction: 'INBOUND',
                errorCategory: '3a2qdgixuxokeni7w11evguawf2ng7sa3rejpc4mslfx7xa1bl5b39k6f365rcavzm9s6aatpze4idcvr5xq1lptazb7yvzxngbl29xist7j6m68so6ycwcbpdfgall00p95uwq0p3hqdtup5meu2g37r7xt07bs',
                errorCode: '66zyrmzgmw6qllw3wq0k',
                errorLabel: 611884,
                node: 9937614809,
                protocol: '2gbwvx8nhztsv0aemu5b',
                qualityOfService: '60iyijp7mbs8nr5lya1f',
                receiverParty: '05o76fbg9mjof544pfvqembck6aj4xy7omsclkfk9bpw6vzw1lndul83yu75cr8khr3uqquj6pfck81zefbx60hqd169eveeo119ii3ia3zvq74ru8uvvvm5okq9mvrwpj7ovr6v7els9sfh6txqlbvlmq8i6l2z',
                receiverComponent: 'd94qh3m0sfig0cic447ozn9j8l70rft2c1au5gc0l282iriusrn7b3mpqodqqef4f4e8fd36s8qom2uv43qp4qq4qlg7w1xkqiv61mdeuafe82z0avty52qzcys406n1tgh94end7605isuebjrt8r3qt425pm9s',
                receiverInterface: 'a7diobkocbkiqrr3zyg0pbqupubex4yzbn3y54bkhjvdqd8sylvdqgme7rbvpvdedsb6o04gwv6z8r364b2x72nlapy9dtnl7nlhj91udabtuyjaq1mxpghl6gotwgd93gmd87db0nwnu56l0mmykdygr7iu4gvv',
                receiverInterfaceNamespace: '6zmnt8nbszjy2lkggweld13q91m9jysbx8bt9el1avwr1aoc87ewl8yh0r5uetv9jo1hn2m19l2j6ojdji55crkdqo5maw9rm0kut6s2elzh1y0erexf83koy7j50e4f7zoi563oxovs0650v4t0arx5mojxlhyrr',
                retries: 6710254339,
                size: 5368209258,
                timesFailed: 2196275933,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'qbdbmf29c5oubdo981m0yg9v8mep0xohdllhh1em02sq2ohiab',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'ej0zeu5s8aeq3nlusk64',
                scenario: '3t5vzz7g3tl8ntsu0w22brx47s7rts3992tlz6umfogy55oc4rebt9xzhzcj',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:55:12',
                executionMonitoringStartAt: '2020-07-27 09:07:07',
                executionMonitoringEndAt: '2020-07-27 05:22:20',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'td6d8tm7jk8dc5427bn7hvnj7x8et690xrgq0t94gh4st8pomq13nt5zmnplwbhbdoy89w73obkt42kcwbom7ykfhlihfb6lhrj5c4ryjxn1svq6x20dp4jb45g89mzlham38ptm21wg6zobikfptuz37ozku9kq',
                flowComponent: '4ypax2iu6pvqa15mh3kargir6caqfyrof3jjwrt5spnybis9bcxx2lucbw02vpu8aad7igzxbtvt5dorymnaasfy1dslngh0tkmlq8dh9dgwg7gd691nmh0j5mtc16bsq9dy2cohassqsjtw69ak6wq0lqlcax8a',
                flowInterfaceName: 'fhukq51f0xbyuwzlv2aowtalcr4mafs7ws91rlxwlfr635lh6sjsdhbomyjygvewvp28hir9diz7kva16gkyg5hmqdw5i8j6sjitqsysu6x02auax69dhtrxlva72yj2d5vlktwa43bcicjr8p4qxdweo950m17n',
                flowInterfaceNamespace: '1xuff15gfchsnyld7po6ijsyq6870wwr3fh0kcurd42aatmw8665olrpqzb4q6pwek76ev8lxomfcm7evud5eu54a7ro2rnqep1qic4p9a1olkyhs2p9iwzwjea6trjajayugg0a3b5pnc570xcg2scxfsvshnwf',
                status: 'TO_BE_DELIVERED',
                detail: 'Iure delectus accusantium magni. Ratione deleniti voluptatem ipsam magni. Eaque temporibus ullam quia esse illo perspiciatis animi fuga quo. Commodi fugit cumque iure aperiam culpa dolores fuga vel doloribus.',
                example: '5jd4bk1chb01du50xjojkfyomregt8mwn77ad59rx07wryframx25624v5puabyooygd1woder13j49hxycfixvrv97f86u0wtka1ehntpr9kaqfjz9srxwzdzkemyk6xee2o0qctc16m4i1dgr87fjlzs43v9a3',
                startTimeAt: '2020-07-26 22:55:29',
                direction: 'OUTBOUND',
                errorCategory: 'l7ll1hm6htaiqc1ep8ieo6q1k36rznmdpbc5mh92vq1axtfglnjxpug2e8p076yrtv26y97gjrsy8kzvn19l1fgw1qn0lm28j9o8wiuypkjz819zcdv29vkfj0xa5iz9fnu3x8zgrhez53hmuddtz1pj0uk1y515',
                errorCode: 's9mb6yhwihoh6s6bgy4h',
                errorLabel: 690796,
                node: 1065906950,
                protocol: 'd9yvnlpv7fu4c5kxfcj9',
                qualityOfService: '8xuf2fs8ink2k4y7o0i7',
                receiverParty: 'fxc3ukkige1p930gszjsmqdt5tolg4p2rl353xd5qi20y3j0oxvqljd884ic1zmj981gxe4gv2tf40jrjxi218y5g4usmm4ispx95sc13vn1l7x9o9r5ytyooxc9ismzj4vmv8lnf0y3esqlse16v2ivngbocph9',
                receiverComponent: 'urmqrevaxha3n7v8xbs4cypq7cbri9mpm5rolsougwfe1srg8x4bocdzw6uq44o4une74pp75v4bd11lyy0rwz1wn7l6ta6t6ys4em1rlwu77nxhfb7onhp68z24oaz9g2ccoxqvgpgqnbqm9kgolhicf0gy89hm',
                receiverInterface: 'vmp7adzjqyh8sqf6zibk1lihiywnhrn8f23zfjw38p49j1o9dy3rtozuual9nloeddk3qk88uwsokirjca2myu1ggqe9z8dwkl2bzqhlt4upxxl3x60cuzm5xo964u5q88cdtk7wsjr81ft1dzvpqofbsxv2mfq6',
                receiverInterfaceNamespace: '49qt6abhcq19ytfeuv6s8out8wd75ifq7uklfli0q5ugme330f3ito30isp1i4cbsulqej7mc8n0efnp49hr17dagehgth83v1erffcoupate3enpm3ydl4ai81e6360y9qibjb59qqhgrzhm45hzyhygguqg95w',
                retries: 11326509689,
                size: 1019731413,
                timesFailed: 6960261822,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ratx8tbjmlxehydd718ghexmjnnzflfz2fqqyyjqol8c7bfxgl',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '7zafcz1vfepgpnucl47j',
                scenario: 'g7y8wfvuce7l8dume0ec2cd5a76slvdjctns8lqgfq8mn6wyhc1egqnqsbk8',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:25:45',
                executionMonitoringStartAt: '2020-07-27 16:13:18',
                executionMonitoringEndAt: '2020-07-27 03:44:07',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'blrvwptqrtq6x14uzumwdni5epwmnol76vgsy9evt2namf8j78ci65siho4dayznt9l8myfh18g9h72nyaxgfauiz2dnzpvnm5dt1hcu4g658sf5wc73lgy1pqruot7o5ijrggmb6p45c2see30wba5jsuz3brce',
                flowComponent: 'x6tszn3bimcf9utu5yp1bbbbxxu20zv45dgfi3n1017nju898cmdcv60r8ten8ds8w53tkg4z1972bbex9gqsi0stbop9xge3xkyz6ko0cxp0nahn2ztmsbvliyu2anendf6dbfsa99iob7gy0cgw22rizro15rr',
                flowInterfaceName: 'srdvkqd1oo7qz8w1vde2s98uws5ll2m5osmw29jl8btpjz2q8r75tkh7dvr0vvuo1c03dcrq6she7x01kpyhgphhnovqkmv91vukjw2juszpup1vd7inkpzi4byxe50cd2hnwpps4x4yq5qri4d3d0g8918tz74s',
                flowInterfaceNamespace: 'h4mezsushs2keenh7xijedg91j2wkrxfdjsvfc878q32u3a992izg2vhkrpni2iddvq7v33vybjamdxy8skt3pze03m8c6r4fpeg13mjet9pm6xvsdrq5d0ckfk28cn4ws2lc0w4hk51nrhln1y6ochh19npgzgq',
                status: 'WAITING',
                detail: 'Fugit necessitatibus est delectus aliquid et minus expedita. Odit mollitia corporis ipsa. Quam et est.',
                example: 'c10ss3jqxogucwxv1qvn0jp3yqnypg382ynfpvb6rxp43dev3stoel7npecf3048qy17yypn376aov9vu0bn2uunnx9piqaw7gxs5pbsymb1z62mxxzey795klevsf3lidoizhatmy9eax0jo8a8ij6dz1bi49dj',
                startTimeAt: '2020-07-27 07:23:09',
                direction: 'OUTBOUND',
                errorCategory: 'wfyjq36jt17nxitb43lka4a55n2czevpzmt123v0tfrug6zzaqeqer38s1ghywizfd0a5a0o3n5oaaij2znsfiodqfqh939gr7vc5fh13gg14qwz9txyx4ea9lo58cn7usuqij62mn9sat0fmhqs2fp20sprz5oj',
                errorCode: 'hez7hkccjjz60yys0uiq',
                errorLabel: 669451,
                node: 3165694146,
                protocol: 'hr9oetzvktj9juas79ms',
                qualityOfService: 'hlfg0z3nnv0a8ijvfy7l',
                receiverParty: 'w0ge6bngevr8w7aiz2g61b8wvjy3sx4sv5kokzv02atjxo8kve9rpxxm4so4dv301ivara7f2dmqgp4hqjj9zlubkm5eu98vr1ws4k0g8ko9wtgu10c0y7bdzzmhbehyh61cbsbo0hlftnqz3h963b9xfwc1wdgj',
                receiverComponent: 'dcs6dmh165s9zizjo31qs8zajwpq7dsi850fu72btnyryvl0qp3pgbsvm7qq6emgbesp9ap50sfa4q0g1yxkvso0fjknwjg1hj823kjz50xry0k7ru7rsg4m78yiqle34qwoyqcudmw97dh8t1293m3dli5wzxq7',
                receiverInterface: 'htkx72ai1hcs00pwy2uhw4mfl3vcgmoln0ky18nakixsd08jyp4nma7qmy1u0ks8szl5s10evu5mkoeb4muwd8ncv2miy5kyeozn15uyvcma779w5sxz8b2rgeuru1qxdgo0lviqc8g2mfduwo3dq1ygj2b4aee6',
                receiverInterfaceNamespace: 's3xp352bzl3qs7ro7wvhxcbe9nxpngypz05qi5qzbytfgjt8hfhv8a8p7kyvmp5ocyyrilfzibz2slhm79nii0ww369hl0nkd79yopx0zt2sjupin0z0xkp0ujv2snshf7miznaa2r0jqyic8tt6aenzjd7y5ujt',
                retries: 7676288745,
                size: 40041779864,
                timesFailed: 9162647607,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ksgehuo7anmxx8qz787qa7mbnzi65h5s6mzg149aniq1lrw8p8',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '9z3afu4cbs6q7iamyj7c',
                scenario: '3e0c3cek7xpfrm7mddklok09z76km7sts5zr9eje4mxtrb6fn52y2yjnpqos',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:21:28',
                executionMonitoringStartAt: '2020-07-27 03:12:43',
                executionMonitoringEndAt: '2020-07-26 21:31:01',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'ib3rfv58kr07tnyl0mqepyustnwfweip4q5zxktng5f9kusmhj8uz9p5d7jd17vl8af3hci8oybkzzmz9zjmrk3oh4vlttrlf4jz1gq2iw8zcaufvaao4ubk98awcyp2tiqz4wflozmvs2t4qhrnrxae8wzorcee',
                flowComponent: 'g2acpzn7002hwdo4cecebhcem88jxjzxy7j0n6q3qfu9okk7jw0t7k3xf667q0wurqih1fp9lvjitgyyonllj31ssydbgs2uetzayq7uv8b1nzztgxspl6xu1b6j37hxwqg82rvuw9m3xmdomro9epjhagbm33ql',
                flowInterfaceName: '50rj9p4w53z0ukuo4kjvh484tw6vs2eyvoflth3kgqb5gy2sso7ol7sb8tfjtwougqlp7nnchctnhf2q9707aihc20zgjc803lkpr91rtsv65r548pf3zawzzexr7dncpu2slwla1hhak2gwld91y39qpx84fygu',
                flowInterfaceNamespace: 'gvn7o7iogpg0yblebviyffpdkhw5kpeyqimcnsxej4gh3ow0nq8x7fq9qmp726d687abofxnb1py7m910w8548n6y4hnas1hmw2wim47ndlwnbyjz0o9qnu6zc7p57l5sgaf3q6bsw3raqghfcdfh00mwv1vgafg',
                status: 'TO_BE_DELIVERED',
                detail: 'Cumque ut modi id eaque. Est quisquam saepe repellendus. Repudiandae ducimus tenetur sunt quo a impedit dicta.',
                example: 'i2l7z1ca1w0mfjm5090jl2algz11j64iopup1lipz0ty2eo31wxcms6i98ed0c8ss1faxsydkv1olrhnm435hvczsrfeaifg1yifbem8e36gu9g0nun6em5m312ddxsyjq5owb3zlr8zp2fih5cm08sdbf9lh4zd',
                startTimeAt: '2020-07-27 16:41:26',
                direction: 'OUTBOUND',
                errorCategory: 'chk9zckiyd29i3rok1k36y2t42udkw2m7vfx4nf2dgpmje9hewhvkpn02las7ojcqp9bozgys5v86sg5n5d6lcccy2mmrf9nfybeyqhjge6phvy3rjjfnklamb3l71gb1m4uzln2whjdad8ejo8a9u08wjvi6g0s',
                errorCode: 'g7pl894wn26p98osqwhy',
                errorLabel: 657409,
                node: 4966047966,
                protocol: '27navn60zzhz4d6jnjcu',
                qualityOfService: 'es9x7m9s202vu5frq55b',
                receiverParty: 'qts6ik8pjgpsgap63dq46tg7l4pxg437znh2c6bupxhfildti1c162v91b4466vnmlfn0k6g4ci8opccp99knslsdbj9ufno1cdxtojtexw0pni5gqud3g8yxkicjdkyo3bzqjbv8io6e8k3aab4qatagx82wrz4',
                receiverComponent: '6vcprv6u1swo5uufspgz31xioxkwhbh9ftr4s4dhggawjnx7o3orvzcev5ebx3lj6d0ypx3xiu301e4cr2c90o5hlcuuq1lg24a2cigxclh9a0nfswdjp2yszosaisfuwpzyabqesaet64y9r0sleiwqhtm45hnw',
                receiverInterface: '3pm1mk62pho3ulcle0fvme3et73oy8jihmgish5cajozitsv8qj1hj4fj3gdwtzvm032bx7hhuzt8390p8l9eeabqgv4ozad7vvet3r08c8q9zrjjoe5qchm45z20y1l390wifoiqk3xmyac9g8nvwz59hbk6ydc',
                receiverInterfaceNamespace: 'pta14y2le7x2vsocs8by1daiffwgsdumkpxaskbl0miljmzwddy629yazvwrcvs4bi9s8nfrrstce3cmv5eqje2t491zbx12qvauk1da99pldfdtw7usua6tgq2yizsttrnt1fanvosqphsiw0jybmtdowpj7jzn',
                retries: 7335596940,
                size: 2454502863,
                timesFailed: 81952159254,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'wv0dqw7583h4lheqbs4h6qosy10ulv3z6wbmt280wu6qtrydsl',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'd9914cu5qji72ekf3agc',
                scenario: 'j0xi9n0d6mohdybr1why9z6wfzk3fjo1011uvkrl0hhzndrwui85oj502dqd',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:39:19',
                executionMonitoringStartAt: '2020-07-27 07:01:03',
                executionMonitoringEndAt: '2020-07-27 14:49:50',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'awytg3bt3d4e5njdffgx56s9qqp333k8wlvxxp71khoongzef661zdeh56dm0hnu9r61szfvrw6j4zxfepmopghk8sn6azs98x90mmy3tciobszwhwzgrswdjr6dvlfwm5lci5i8vv3kp4g938hpoqhrhchedz94',
                flowComponent: '7sdlbxij0kp5u27ua4xs5hnpgk8ybv0npn7l316ycfkj6bfxzwvrrlpckwsuu2xjpmk0b0rfx4ow65761rwocmpmka4ywp5gbktmml1z9m1vaikoctp335j3vdge46sl70pzr9qtt16wwtgswaz8r0tl56uj9nt3',
                flowInterfaceName: 'nt81g98ovpj8ts58yif6veakalpech9ji923gtznmjth5zhlb0b8ar2ass7y3ulovna44y381w5cyjx6lf9sirhyb4fp5icjb5g3frdxl9kuun9720a2hazi1uynqknje5ugewfhbk37ihmqlqvw1bntx2otu0n3',
                flowInterfaceNamespace: '4da2gmpm4m3t73dfwa381r3bdpp3966820wm8r1i3lyuhdfrrh8wh977cbsnaxnqlid78rmpzy4gt5o6djdl3ijzqahjbcrk0rpv0qwtjd5a76ydezdx1t2ckc5h0c2at1n9mlr9daou22w99ptkqin6wwl4bny0',
                status: 'DELIVERING',
                detail: 'Architecto ipsum omnis temporibus et. Vero culpa quam aliquid. Voluptas dolorem amet sed quod dignissimos consequatur qui odio non. Non voluptas ab molestiae.',
                example: 'cjz3de28ns40uf8bu29hkqkfr2cqr29jezii3m3v42bzitw77b20ixyz4d8b6qt5xzm5tp0361ar40o674fpmmbuhqcj14l56tnzgehjaivev833svwq5kz2fopgkv4wr0ibpdmierulwhlgumvq0ikqsx17uhal',
                startTimeAt: '2020-07-26 19:22:12',
                direction: 'OUTBOUND',
                errorCategory: '69kjinm4meggbybewwqikcd0mtzz3u08iivdsdvihn8zlidim9hc9n8ejhek0f3fl6f1lm4ufmrr1mpugdqf0d7awyimz6a9gk7zzwc70tkl8uazm8mqzocdimp7nou8nddqc8pqz68lb2le5wrigq4qqi1zeums',
                errorCode: 'w2zwdw1fwzizsdzq97s1',
                errorLabel: 785422,
                node: -9,
                protocol: 'jx4y97b0q5uwnpxws108',
                qualityOfService: 'ouvthvbzmbcrw2hgv2yo',
                receiverParty: 'sjwyd76uyh2mbxhroerymvwor047tv93m594z42nvvdwex1fgygyk0jdf6lybn98531cqeto1tkzi9dz87dunbwtn3hlxbvqs01l63yloyob6nlydvn63i3pvely2shkimyab1nu7rzkdh50qcuh1p5wcxgczz7n',
                receiverComponent: 'bmu13bgt4r8m09nj6p0svudt0n38qg92el29aepn6ij4osl0kfu2w473s5fp8alc8e5t6ij5raz3psqfumsfqdt8nxmywi4y9hlz8aqo5m6z1itq95rphpxexiys36vp28wtcto4tuwkkvru97mi7xs51wv9esmd',
                receiverInterface: 'tveqn5cj5xji48a848w61y7bz2z9hz9ba29ihrjmkp978z0j3ttvsjgvhiyxd8nwig9wd7jjq179y8a1ar9vrtr8yqqp40frujlht27adzi7ks4w51viy8kkmp0755qhtnkdijggyhpl8m6qdcc3s3po1hl73qnv',
                receiverInterfaceNamespace: 'w7feg0sgpxa2klbw08slloxfseyrc6q3rfsqk5rvibflidqawjx684g7gouorni3lc2vulrvaf6yvzo5majvbyp4yui0usmc6v74jkxpf5d28339efcs7hj2s7a4a0wqwsqcm5uqbx5dprihz2dhy1zj0rzpg9qb',
                retries: 3386652039,
                size: 4899054221,
                timesFailed: 3175400328,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'xio3pdr8102rs1ybdevyzta33ng9habkrr83lq5ba6pozvixwk',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'gwxhgyqufnuid2e1wtei',
                scenario: 'auwwe0jidtubengtbhxjpsf42t973acduzqizyv6ixxc743d1qaznzdebu6f',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 16:52:32',
                executionMonitoringStartAt: '2020-07-26 22:34:19',
                executionMonitoringEndAt: '2020-07-27 00:09:34',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'ee9bnlx1ir5d0thaylah5dwigikli8oi6j9cq8hfc44za556z8iwz0y07yernt3gkzmvfefdha7rmvqt962f5kcwl9a9f17z7ebagzkj1ygmfi1n36cu4za6mgo1wgbw13hli5x4uayjia0plwkxq88klhlugfud',
                flowComponent: 'q996ti4d8l4crm89ylnwt8afshjcb3jfubagn8ocnkz116cslnimkmjdv05f811t7r82isyt3ogjxqdl98alz7bylr1bkrqaj50xt39urwkoyr17vsrw4u8l0se1c4dii8neab7qbb8xpg5uygcvg0ofostvuhgw',
                flowInterfaceName: 'z6n8qxajwjxmvanjuoivu3m36vna6x6hn5w91v6pekr540993dsvwg91s2zwxp17ao0zqyr4zirt0i5wk2zdsuri6shg6on22nz2o2amy84piitghq7j5pzzydwkdikg3x1m966jqzquteei8k8x7azofalwloom',
                flowInterfaceNamespace: '0ehdq6dnqov2yxopayqfevhjj8c0yjfk2fwq75aq7aixx03qwsfns1xdi8yhiudeblngsi64ewhqju82p835rqeve9v2svucy68jr2l7x9ojkhar650bugoz2eyonkgx3eatfc9qrqurlougy8swuym2mvmeo4jn',
                status: 'HOLDING',
                detail: 'Vel dolores odit et aspernatur beatae quia quia suscipit. Cumque ullam rerum blanditiis. Id accusamus provident. Deserunt soluta minima odit animi fugiat delectus ut in. Autem quo commodi vel et laborum sequi est.',
                example: '8wagfr4h55cjfcra3dzq2apsvmw5on7p9hfn7vzdk1xy0ls7kivjojxafmyzv8t0md0yctdn6fh1ivvgajfeo5ovbsb5otopawvh4s8qnrdoc280b8xxygiaaw3mrw4k27cn0cymxd9demmvq2yavkddq35gxr2l',
                startTimeAt: '2020-07-27 03:31:07',
                direction: 'INBOUND',
                errorCategory: 'po749t4btthc9c2q0904xo8j2k847ry6tbwvhc0c86l456gwzcjealw18z509myx4a24v7xdi8z7cx4aomaod7829fc7bzh8iinqsum5fmkti1d81qmazjirzcaqu5ywn7cl5p1v4tbdusfxu0d55r9izb56k4ds',
                errorCode: 'zovdenmng9261fid95zu',
                errorLabel: 621394,
                node: 2401144158,
                protocol: 'p5pov0rmegvu5qosn8b2',
                qualityOfService: '0wt4cmd9k9zj468n368f',
                receiverParty: '451s7cwnd3f7vd0reblvxoamd38k5gqip8p7wn7jt5b1zymgle4cwubp8buzoha3y54mp2ki1h9fenxmt1yr73lgkih3libfdkolhrtdo8fjww48a5qshk3hke67wx9pv0romiacc4ce410dq8cybwug9cbwypfg',
                receiverComponent: 'f60nij8tuo8ufjtancbfirauaua8xp2rey5x919igmoszrc2ujcwe8cb8wj6i8pg1juh1owgj5ysr771r2wpxzho4teswq5uwnmzif54f9bdcngvdyw1xlmv0a6dyakq4flx355m77hgja7qxrcy0m5ja970t0da',
                receiverInterface: '9mbpck9rlyo9xy4fgj9wwv411buktdskal4yambj18fejk2f8g3hh1d4t5eyfuy49ywgymzeioavufbutzyyqprls8z48ivksj0e2umyqx5j1bufwb4745th62xdq49n4lcvfxavrccgx0qui5d6zpkz5x4cn1nw',
                receiverInterfaceNamespace: 'saq7uwz1pz3v28jufcknbgiweaalteht6e4ixs7bcrrce65asjyln0ac9bfyuc0vmqkhdb5hff444ke1mzha7jgdt6j4anq5799s7fldpdk6oys17ppgqou2htixfwud2ketw8b876s2bs9591jf15vnier2vgfu',
                retries: -9,
                size: 5348889474,
                timesFailed: 4613150365,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'eobpexy1swdvn1c434ehjibq0ob7u58kmtwhch87lqp5fh6jgu',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'qoykhbvzkc5zk3n0pze3',
                scenario: 'op0z4s565lmz2andv5iw5ylze6ec7zn2jwl2edediecfupq3qqszrfandntq',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:55:44',
                executionMonitoringStartAt: '2020-07-26 23:24:18',
                executionMonitoringEndAt: '2020-07-26 21:25:48',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'hcvdrh0p09x3t54uwtwb531h8j8b42mc5vhaz460qfssfoco6r1i4knxrsl8b39fnu4cr9bgqcawh857tnwm00a0ctfc4l416vb77aqbskmgc1j8ylxmq3vg43orh3h8p9lfgsvqv11pi8o4z0ld4pzg36ckafi9',
                flowComponent: 'spmbr3fuxzk1yxa7o63hl3zwi8fbp0ayj97rdv03o55a5ux3wjwwmd00qlvhvdrkaxtb4r1hnbewjgr1qbqcyhc3j1xopj4hip37nnmm17qemyhwl6vamxiq3rspj9bblqn8bubzo0kk3gd982u1expkkundeibk',
                flowInterfaceName: 'wkcw2tmdql8d1vp7udw1w5zdwuuq88v4icp0u1juqqs1w8zd598kxznwdihn687m44xasfiarr1iuzcy75dzk6qsl49ccwa6cr5jiilvhsaexwfcl4ib0dlvofvrh78dt83ukbfxig2ene8m06x3mm4x6zfwtch3',
                flowInterfaceNamespace: 'g9618x8t90kkepmqwpqj4ukvwaef4nocrkwr7pt845zyvw43ewg1gfw0y5949kor87wbcg5clzgrjcmpyhjvwlum4v3lvkebgigo5ppqkjpja6phhrigv02yddezwktxurcywwmff3k6h3731j82zcf4bbkrjlma',
                status: 'HOLDING',
                detail: 'Provident sed autem reiciendis adipisci id nulla. Ex laboriosam laborum autem assumenda voluptatum. Ad voluptate nam repudiandae mollitia optio. Sunt assumenda repellendus omnis est. Ratione ullam dolores amet quia dignissimos modi facere. Distinctio dolorem reiciendis harum sed harum accusantium sed assumenda.',
                example: 'eu7nd5wkxbuign7ajbn41kc6i10i7gujr6qm7wac5fo65uwqls53tjxr28ab5qiioyn0jml3zyd80zr1yda9djloiegkw7dsm9fk3r3wskkmgq3oe2kuxp6rmesx54sodqa45srqc5dbmddc7f67n84aqxbvstds',
                startTimeAt: '2020-07-26 22:39:04',
                direction: 'OUTBOUND',
                errorCategory: '6ci2d585f1vmhol62y6q8yid1djh0juygc5gh26dbmql5plzp1xgi7fkcvvg106dh5xau3e7gji6xzgigmzlidcf7no2yw57q56skg1jhrwg8jccoo1rznacvuc317a1zudwf1bxk448s3t30hpgd28hgtle8qd9',
                errorCode: 's2vbiuxha2tdqemaw0sm',
                errorLabel: 580886,
                node: 4138481335,
                protocol: 'tqak6uavpj03bhveuuye',
                qualityOfService: '3zbrsg049so7qis29cmm',
                receiverParty: 'mrla0613m1p78eczddtp5b9dqpjk45sennz49khp9qwjnj9btw7vm6ftwrnktzm12f886lb2i7j6xkgifs5iiciy822jgvpyhwi4tg6rohbw8ynkf03gsmpqpjgkihq7xz7yfh0o6ijqmz1e9g2th4r4bz9s0tdm',
                receiverComponent: 'kvdujaxtofanway2w91z9vvkly8uxbfo58zq2ihtzfy5j6kve0n2esqefu8kwzmhxk1585rm7q66mdb7v364ryd7m9dcv8lzuijd22p7dggqgc1ec8pruc388ybeq7kc7prtb6pemp76ychcywxgwum0fmjsmbje',
                receiverInterface: 'rr63ofmmg2xp77nlhl27kknl94do8f8ncy2m7rjfoj2wxtb7p3578zq8yk7j7hrvbrymzovipg436a9q4rtpvtlxaakt2jozvz653hruras8kxl9rs8bqql6rc5ycxro3eeh98elyrriej18ljmcoi7mzhbqyjdh',
                receiverInterfaceNamespace: '5emop8e120e8kpu9lqqji7bh0c98o8p8fuwu7424gh6mcr1xf8i3uh4e8d2j9irzuwlk3vox7cpb02qkrvg1tqkj3xbszpgovsk67rl5bb6sr23p5wm5lrl4b0c64s5nzmffrhr4x829okgpa0p34r66pf4p4ajy',
                retries: 6634725093,
                size: -9,
                timesFailed: 9335651243,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'aa8frgz5d7vgnml49oorezz0zcos99l1m4pvkhkd0khpa1m5qm',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'entjiqf4lq4krclrq0se',
                scenario: '5lchspkdijd3fiwfwois25chswx8152shjce3229enmk6qwvmj12bou3pacy',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:14:59',
                executionMonitoringStartAt: '2020-07-27 16:13:11',
                executionMonitoringEndAt: '2020-07-26 19:15:47',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'bn7zz1wmflsasrehck9v08eq0ige3jbclr3ve4squw1ygy9vhrh9m1upytr3ydcz5dm1htt5pgieojebaffp96hckc7xjip7vpzmd76a01hlv5k9nqbr501kq0e8s1qmoj5vwr7s813x9cwuw9c539a8behm1sis',
                flowComponent: 'vmpmhlw8102gvwc0jw628clmy1u4ac681v3ozbosbjsq0s9hlwcjaekk4hr67umppeg5r00hhye3rsal15a6ycjdvnypyfuj51sm4o8p8msuhw7jv6oxx2beu8kx3dde13py6kh9ip4wgfabm3z7q8mmcxg472hr',
                flowInterfaceName: 'ugosp1vb6xgq0lf8khx5r3n4je12oms6blkdo9k5gt44h1sjo7zttxvesjrnn50j8fm27ehd1g03390pjwqoexwjqggvww9mzr0z3y5wxjog7glfnc73gjogh1wgpvv4aljlrndj3iewi9laufh9iw2jvg5h8sbu',
                flowInterfaceNamespace: 'lsnftjtl2ihb6l93gnnevgd93a7ssuc57pdi21szdx9cgumyq1wn6ry8be0rndk69g7y811xguwfmsozkldz66ce3vhykgc5rnnmwrtbhfzkgbieaqotbpwcllbkpc70inqquc5wshpqmlia6lc7on64a14yqt4i',
                status: 'SUCCESS',
                detail: 'Vel autem voluptatem sit sunt. Provident illo eum omnis et provident perferendis eum officia aut. Exercitationem autem cumque. Natus nobis qui porro necessitatibus non et. Molestias nisi dolorum quidem at consequatur.',
                example: '0nyat3wrpriomugf4xhminlcpcf9tgv66srav21y4o4p5skeaxzdt59hi0ttpv8ikkjsj9coyjjmyog0sohw7zedlo2f3vb17ky9350693sdo61j4hor82r0hurwwqt9eptmpiolkj2fzd4j8d98hajtqhpj4a8j',
                startTimeAt: '2020-07-26 21:22:32',
                direction: 'INBOUND',
                errorCategory: 'umltln1bi94cufb6lrn4iretvy6ybx4s1nvkd2qqom0ig40gj3u2z2ccqssb491wawfa9dizv6vjtijvnm87y63dff79zb92zsrsq5fpbrowbjevqvh6dsc9ai2rzeadhkklhblvucl81x50x3t3nk0xm1kqlaop',
                errorCode: '8lkbwqegw1iaz718s5yw',
                errorLabel: 503013,
                node: 6903033436,
                protocol: 'mroosto4rm63m39zs3lw',
                qualityOfService: 'i7f5o29p40b1gzy1oaud',
                receiverParty: '6un77wvovnsbzjzy2p38t0pce4ftbh7k2d3hjf48jo112j3xfs6l0ddu6hhhk1kni500wxprz4unrxnqx53lagv4kx7ijb7gpid8stnj4izr2u3is41guz7wlsmwhjy9m9iol6nyq2ym174dz8z35iy73luf14w1',
                receiverComponent: 'ug64p4ggowl2cx88z6qwe6a0y7iqg6uv3hbso9f5r56bn6ayf6nunyxaukwvik72q6yfgr6ci7goxgzv68glwci22tfcqpth1ijzq2oq4ph70cls3brxp79yjc0h76noeljcgqc6yvi8qwk924dkcqq39fhn9jrf',
                receiverInterface: 's8clu9h6bkayqyqakf9m2rtg3ai4zz40xfzonkio7jt7qug26al60s7x541fn3id407nm5m01flavp7teo3mwolez1o3f5mc4zw9c7r8hr2d53bbwnzfdz0ks2nrne1i9zapp75iruaudikal2n9gwiem7139g1t',
                receiverInterfaceNamespace: 'qpptmah0f5v750nutl4gy7w2ap85mhef8ki49tj5k1xwk4i54v350pde6aqyov55tem4x6hr7bajb4dyz2sgw274q5sihelmzdckmoobrw4u2bb4oa6cc75nolres30868asobppkivyzkf1zbs24e7o0vq9shlm',
                retries: 8290247430,
                size: 2706114900,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'ntzv4cnq4sxjizmffbiozye2tqzoyqzz1k5wrsuarynnwnmhn3',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'z3dv9iixc6qkseinbowj',
                scenario: 'q48ebu7or8vg09wmq47ckisrta7qv2z909xu0k95482sxcl6e06q72pqet7x',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 15:36:39',
                executionMonitoringStartAt: '2020-07-27 08:23:44',
                executionMonitoringEndAt: '2020-07-27 08:01:48',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '01m59ac1dq4u5rqdil0wmzxm2u7kmmndewnpt6ju94c2ao5jmghdzsb41na8qnlpwag5hrqxp7lz3awjqcvubc96nh6xribkvoo0zh4k0wk7m5sybuu87qpi7ly9vdfwqhx609ux9wuuh465vyzrr2ut64p4ji1f',
                flowComponent: '8qqphudcvgrw8lxxwb16dviy5tzj4x8hqll7ce59c52fw65i4dksyn2osdlwcfyhkpx0yvf4cd1lbh43dtja0xffrfkfooxgj6c375urngf8n3pmy0gtz9rqhniak637vxpdtsquk276v6kvqmfr36oxatkfutm0',
                flowInterfaceName: 'nx2w2lbd8l3hyr41k0rkby0j89cvxid1ujrv5lkr2zpzhv36to52ed6ymrc3xjb5kls62iu7ku84etkcjc6yplk3bn7rhyvrxe9t9ukv9c69qhzjlrvd2vdci5cgcnvj5ypp7902gl0m0ynyp6yujsbtp1jepwq6',
                flowInterfaceNamespace: 'eaewi62orua8rfihpq9h57k6i9qdx9sgmydjix1nthtotk2odmj2z0zvd8tm3xsem7bturrsfyq83qc4tgjgpgfvi3enk9r1g7532423mne16gz7l47x4x068toiaxbm22e77bjs0tqtn9jpddesmpojvmj0tdu7',
                status: 'DELIVERING',
                detail: 'Nihil incidunt labore occaecati earum est culpa animi libero. Qui expedita dolore tenetur ullam. Qui qui eos omnis suscipit aut nesciunt. Illo doloribus itaque soluta.',
                example: 'd34rwpiy5tgyz45kv82kz9vcucm0sblr3l03kklet8lat5m85y2z887c2lsybi8ul8gncnpnvjxrufn15p3bc7rk9japznparewa8gdrf5wd4lvkv2mqvl6qwh2xowmu0snrbgs4ghovxq7hlsecs7bg6g84jnp8',
                startTimeAt: '2020-07-27 02:36:00',
                direction: 'OUTBOUND',
                errorCategory: 'zjs3jwfsvrzsdyylknvqoih7rozwymeeaqeupiklai11cjpz4uw2bftix4i6vonun8p80eyugc4cuu6nt159f9mgynwy10st3s0s4jzadbfj4fhyuqc7khoxcxuiqdka8jqcqqzar08df5p1rx2twg6onfhgvodb',
                errorCode: 'l7w6jqggytxsjgj1onq9',
                errorLabel: 910175,
                node: 1613456117,
                protocol: '5rpwxtiha66z9embz3ep',
                qualityOfService: 'msayfccp5aro0njgiun1',
                receiverParty: 'uqnh6lta3xy2x2j4dptbphy13c7xpffdylk0uzeskwkfjc32xi3mjvzr51rybnegd6wwah2mphjn4p3pzh09ow5c4pqdeudeg611b1q8sp6uxy2qdxxxr7l89jyydcyxjs5tt4ml2p56uft52jo7fxl351orfrfu',
                receiverComponent: 'pj5s0uf2481a49izhc3vbz9c78w5osrhfe0clhikzq54v3wumsslive7rq48kyepgl8oiot9z6jt0og6gno8a2wl80bveupuxkj4pmb8wqzsvj08vugyhhih7c4hs9on2rac64flpshvf9bpyclpo0dbyzyrubne',
                receiverInterface: 'ucbfefstcjrkvfysdnty8kq36e4yds7wp7ydapco12h6nrnyntaqdf89o20r63b5my76o1ykmta0vwek8f64o12q96ayq05q2k2syozjb3c0xr38etjstlc296g9x1t9a717e7019u72umh0mmxxfg0fizjmj5k5',
                receiverInterfaceNamespace: 'ahq7pgcw0sgbbgghkca7dze092llpt0pke8yqkm1ite4ko1gmusk0ob00hp4vcajs64wr8u86xf5s2b5sk7ouuol5dhm0fdhfcr8nlj4wjodcdx8vw1opbbxgnfyfw2sf7op8q1cfg6o4nu831c1i4wsubux63yw',
                retries: 7643699010,
                size: 2367559182,
                timesFailed: 4442641002,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '3hjqk0g6wg9i275r1dgc93cowdz68ljmo58qe9ogs7e4pzcwan',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: '0l80al3pli0p343q7xgs',
                scenario: 'ayv6umpr9607aqo43i8q89fanuleuou2tz4178lsgm8n79rpixuc84vtsbbm',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:17:58',
                executionMonitoringStartAt: '2020-07-27 16:12:57',
                executionMonitoringEndAt: '2020-07-27 06:04:06',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6a3l4fnp3yg4gznbrpq8u3r6r6141hfwfunry5oj6gebcb35n12dgbxniagqf41hw6uukaxh6o1f965lctu431draaf74eu0kuygbkksgc6atklv49z7niprjmjkp2x36hqes624ys3dtyo3u32prikzvx9803nf',
                flowComponent: 'cnt2trb56j3ith9gcv086al5utuyzelurqb3hxrr2u8uwjmzklkhjqve5q9dojs2yyq6hzdf1o6on5kgr9teavtm0yuokdheywx3zdwa2ye6xm4whrxrsa2cl4whvak426rvh2wia2mxpu2hks3ujrlq4v2yiz9d',
                flowInterfaceName: 'kc9ap03qyfzyz8c231v0imvg6atvrsv2o4mslpjj8myxka557a6vi253tdd2vihnlzu701squ6up9x9ne4vm31mmzwlesksgjje5fktg08c4829eb5f9uke1oc5jo0mjvmnznq3f7sqopdbijgkdt9xwz7wrd4yx',
                flowInterfaceNamespace: '6cpn7nftjpz4hl7vj9krpe4qj8fswrgyqc3lv4ytnr5b2pe1mtgvd8etiu0j38u3enl5fg0dyrpjdbrz7p68ynt2e9uphlejs8votemg0692r5thkf5ot2zy4bayg8mhkr5fj32u959ndwy8hv64r8yuuvdxson5',
                status: 'XXXX',
                detail: 'Et quos perspiciatis aut. Deserunt dicta aspernatur voluptatem repellendus incidunt. Iusto corrupti illum enim veritatis nisi voluptas. Quaerat aut sunt dignissimos ex officia qui. Autem incidunt temporibus. Aut veniam necessitatibus et omnis aut.',
                example: 'q6jqyf2cog2k3bli9s5uawp091m37gp6f7w7gtce7yw2j961kf6rt12g23v0z21ugy5fubjeng88pu48w3bq9zilz1c2hufx8vwb87ns00e2spsh88zdsrmq5bxpzjtm5bajpjqt9tdyj6jlra8har93fb5i3b96',
                startTimeAt: '2020-07-27 09:16:56',
                direction: 'INBOUND',
                errorCategory: 'kgznl8oz2celz1db8b8uyvuxl8x8lm2foe28zehv029ea8av5yeego4zwcq3dud0cs7on7wzar74nsfvi4f0qrb3vb83c0fnh7j7x4tipzvzkogwm556bxehexbsg1iwu7jn9iuns2rpxm7e8xtpfsks0een1l60',
                errorCode: 'quulv5k2vnzr85jyf4co',
                errorLabel: 399334,
                node: 8418340369,
                protocol: 'rlg7sm31hdd0kie0bfpy',
                qualityOfService: 'rn2srxqnssa6aqgo582b',
                receiverParty: '6058ww3vuk1kzxrmgv1btgqqk0w0nyn44xy9uta7jyo2rw9i626ee7g620vdf9fpgbautqvorl73b2ov2506841rp9smcgmnpbi7os22n5aektlipicm2hn3v0vrja4jjcsh1r639oagi6l4muabo3lxbrmgmkwu',
                receiverComponent: 'ylnf271cjfygmhpwc98zsgqmbmuvs8wf6m3899wmicx2otwyxq6210s1xc1o1dv5af1apnoja17vhkddp5s5v2ar2p7tm4gslaroorxtdollzl86voe3x75jyvniui0fa0s0i8kouvil99knprqbqka0hh3ddgcu',
                receiverInterface: '8wna5xztddu777steuhcafz5v0gsvezmgpga2649vb2omitdrki42ui9ow127yvd2kob2vv5mrq7f66nkycm1ioqc9u4az7h8wtyiide6pbktjftqm5pqhqenlbxt5egbgih23dbche8356dzfl38zrsfny93d2k',
                receiverInterfaceNamespace: '7hpxvbce43t1jtnq6wwu7niz0497hg517am199rg4g6fxov7di18be90o3zmzulo89goptj3lcxuvkgcn3n2y78dkvhs56y7rl7h0mciryu6kwuf6hemcgn20pksorqxi7bwidkoxijt8zicece9rvkuo1gn9rja',
                retries: 4638115992,
                size: 2726237021,
                timesFailed: 6313627456,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'qem7n0bz2osgb4gl4a7p9nlbxehlw8yl6ehieug9s0cu5k8qk2',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'ixnrp9fpm77fba5zul77',
                scenario: 'zj20izquxkyfwz5sq7t43fiaewqxaun3qlc9tvp7g0fz7dmmp352dwlrv6wl',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:39:30',
                executionMonitoringStartAt: '2020-07-27 01:57:47',
                executionMonitoringEndAt: '2020-07-27 10:46:30',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'yk3v4oqdrsdw0a7kjwwbyb2biit6qxzvuqe60ykzgsxhftsngc21bsrh7tohiw62q9ezta2djakffw9tgx8np36zqmovwagplqzeup97fksgdpewatvmq18vjjadkpqrs18h1jonh6kbvuj6nkbh6zima88xhpvn',
                flowComponent: 'y3u4vwb6uk4xobtbc29vjzqye7h9rv5dmzryos2glsyidz7cel6gepqsdxql23hahsv0crmt3astt34hjn39n7a1fpuw4mesf8tzlcw8skltr2gli73g8iz1wt1596jsm68aoyk4ifu49b97m8ff8adv49sym6yt',
                flowInterfaceName: 'pk1f6whzfxxg3pvllpin9q2xfv57rshaau3j4vy8trsi1cu1p9crifj5arbychto2gkvxh40uoemfi04nmptjrlmdgl5ufb57l6dzasdwt7oqy4qsdsyg7ih9ehb22ezluasyvvbx3x0un44kkwlgvoyhsbsg1uu',
                flowInterfaceNamespace: 'll669i3b0ube5jlffecsrzkgmxf2h5ds762o20rr49j4vyn5px0xcj5hppn94usglf5zpt2fzprjn1zdguc96877fgcdgjjd31pfxigmc5ianc6xc4kid6otjkj18qu3qunbd7dwiv673tv19srl02x6stodnvjy',
                status: 'CANCELLED',
                detail: 'Quasi possimus dolores itaque qui et qui laborum. Dolore est explicabo. A consequatur voluptate. Qui beatae incidunt quaerat minus praesentium dolorem doloribus voluptatum amet.',
                example: 'qwa6u1xiddcvmnya9wp0xszo43lz6az6trj6y05a7jc2bqoi4v0a07gyg0k2yu34s1wwxkeb4k0k9zun3ncnlghjcweizgnga1fvbk467ecg7m1v460h7d2y10s2xgxkfh9yhmh13vwscypb4vczerw5sqntokvv',
                startTimeAt: '2020-07-27 03:43:22',
                direction: 'XXXX',
                errorCategory: 'eedodpbicu5fr20u7esmyzszjs9he9hz7b9jc3vjstrcvvpw6ksf76ar261n6irud9uv2fkswfv6dk84aqnwajzok3dc4kpdiklxqfdm7uylvanierasmn2l5y32yvx9gz4uqbn9isa33kh6yb2tbvd1g5erni89',
                errorCode: 'nj0sshqbnm4yuuc8oje8',
                errorLabel: 138182,
                node: 8075541880,
                protocol: '5tiwyyprupdwm42e1h21',
                qualityOfService: '5bi5ukthshba4axyzi4i',
                receiverParty: 'wqpynu3biox3y5witn580rhji7x2l4y7ahsrlp9wm5xhpaywhlg2pvhznbs4pkam2ji8wk0bufevipufk06px6gf6q2tfj1ztsrkvlqez4e1p9eg6nze1yqlywb11gw7fr6yp361btrqqc5kr1chlgopsifau6mm',
                receiverComponent: 'l4bdsn7lcskxcy7sgvwq8j6g682jyrgxl7ws6m4ma8lrtd26swqushhozugsjpz3xxzxseg0e109l3xgousk6z1f88zz1jgf72i8a4cx3wlp90swfks8fpn1jprb8rrbi9fpcaf1r1aug81bgwvcsyqnh262o31t',
                receiverInterface: 'nhqsektwbfg12730yqhfhbih1t7473crlj47keh30a0jdqjuovldgab1596acaqx28n06p3a9xhd9og5fksfhd3s29brsn4zy47gcta4adp58knuomqt8qal29kabrgo3tddaxpa9mctu7gc4ikzs9kuzi96zoxu',
                receiverInterfaceNamespace: 'yqph1pdng9y6ul0q3od6vj284jui30bvw9bhio65xzmqfo61nw0xz0wtjqvdtzhaba5rayfa4gayt20p4q2t6vhassezp5puebnm0arxlnjovv0ysb4obnjrquua7nvmhi8fdqzgfma00qem8g28dpllucw9yblw',
                retries: 3163791648,
                size: 6068289702,
                timesFailed: 7931832751,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '94fouyyksl8cqltxchu693lki34aognzifx531bz0ddkwq2hlj',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'da2mqo3saf650j4bsvu1',
                scenario: 'z85xdzqy7lw6emyzzsh78jkd3o1ig01alohzg2saswtnxlvc0pajdqxp0lpj',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 08:07:50',
                executionMonitoringEndAt: '2020-07-27 05:02:39',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '22ixoubdg8u1k377rjct7wxcx911et0bs9lv5hjcdvjmtswidbpk0gh3jc7pvs92pmd2n9wskfbt354j9zz8t2ecw7ed9hgcbc1v34deuz4yukov6te2bqszap4p0w21of2ry56mqmnit4t9h1mkfq9yb3u0k412',
                flowComponent: 'yvbciwvmk1rmdi10z25i2u4iga7jr3y6klkwno49hyuu7deg84p6hj8k4apibf6v5tr3blp0saugtxiudkxsv4qdl0m0rk9k69mfj8jsaunujljhllsumfs7i6zorug2r7ggbvkzvl4d87xwic0oh8yo19ranm8j',
                flowInterfaceName: 'efhj7918p2khuf8st9t3gsrnnr2pk00waot5e34hzmoqml9org0j8giblb4g3lr4y7bv8urolmcxfazv0yizofjdasdyhfstbvsaobebb1y238r61qcb48of55cm2dhrx6n9b15rpmuodkidzfkqllvkaoea9alq',
                flowInterfaceNamespace: 'mgsbauod6e2oba7wpjrmj5opp7rmt8qu98xnlw7qflj91tkekfqitg1z1yeex8sd8devjvmyteoyrmjzslfuv2hh0x6yqr447900k998fzhscfovhupcvz34fcgghpgjpslufnbyfoqdkijpnwqfllel1lqan9ze',
                status: 'ERROR',
                detail: 'In voluptate iure adipisci consequatur ut. Dignissimos et sunt quibusdam. Reprehenderit quis quos. Ut non unde illo dolorem. Autem perspiciatis quo non sint.',
                example: 'qio1s1qw2kbh74ybuhmle9tnaco3jl788178qvaprdxq15uj20zuy6fcbfgdqxjtof6k0gbe6y46kiza33pl0xpuy77ofznfia3pco5eli56fkpfzxk6iq19kbkwb5lgxee6930fn6raane9h79zi63y7h7ti23q',
                startTimeAt: '2020-07-27 06:06:12',
                direction: 'OUTBOUND',
                errorCategory: 'sypf4lf9e87j9p66dqsxvn88slrvsjccq5yppefqj47f5jnc5mtg70thva5m0p3w9pagdnckwo7y11z366s6l7ocu9x94ckdl21dmzclnei08y3vkvspuzl056cdjpzdjpwg7ss6mlafo0l5vbr1cmgjen3p4yns',
                errorCode: 'b1dyea6hsm51rvd4zdzj',
                errorLabel: 782749,
                node: 4180310669,
                protocol: 'xk1qgywckgnjfauzwljn',
                qualityOfService: 'zuri5if6mdnhdi6foqsi',
                receiverParty: '9cy0et03a4u9psyaxjzvp5f53ctdoh5d7emfxlzsg2y6pd62ikkvy761h3mu8p1nryylo7kx78onnxrbd4akm0fz7q88a9uqg2jmbtfn9p2d37ur03h3hshjj93xtf9oqb7qg871xq3gk7fai44vfdwgjq6othzs',
                receiverComponent: 'gy33268zlgzuzibni6f858ltb9qpn2ih7dqvl0a7h9y75gsawfuxpk04zp80zbqf1sw4l855jgwdr47q5efs7jvgq9ec0qwscff49tovfoi0mdyfjuppz4hvk5pcs0qwtl391kzdb0n1hippx2xqobpqgn16mgc6',
                receiverInterface: 'fca5dqrpcavbru67x9gnma9nvb1r23uyfst0lduun7vkhx7bii62r4t3of5yxrqlr5ehsb3arc42lvhxxyo4tu5u39ay1hlfy42yevu3vo2djc0avtr46zbgx6dmamf04fwu2uxxsl7o0kyeoceeauf27a3dfmjv',
                receiverInterfaceNamespace: 'pkx03cp16etcl9iztv9guozu557qjwtpid81dqgm7o6p76fykn16ofswftzxsgk4ehstfu6pj7a9zjlm7iq9wwa6mpcqi4vacb3dapy33hsic9yq9nysdat166f1940g6qag3r1qc54l68r5nlifrqvpnsjjqsdf',
                retries: 7849892280,
                size: 3514314394,
                timesFailed: 6719628501,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'u0h0sobtp7j2qckzdqi0hzje1fqb43ddxowabgiw8opowf2q30',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'u3rrxcd7u85wfsrwy6mb',
                scenario: 'ugd8twtjdvieo8g31kcvi8ha1mruoty1rthm7rbct0cjvl1nvl1y26nsbh34',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:03:14',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 14:22:19',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '6gv3n27fo2au30wzrer4e08y1pylmc4o5zxbkccnmk83gqt5kvx9fm0v045q1pauhil0s9milagd71gya7wj12nb5vesg2r2qft6axrliuisjxj779nrw53dtyrpa5nblk4auiul9ptxsol3eqwu3lvzemywz28x',
                flowComponent: 'wshr4rd5h7qia4adcg3k4enp1tr1kjgy7mt446aqbbqh7o4r72s87pma3vuxdenoniq2lgh2cm8es4p8nemsy14pypcy5amdzwycyc14e8dm9tjvgtcfui6vxpx50797taw3r1sd4on2y3ebrl3yjwl4vfmnvn88',
                flowInterfaceName: 'u0jjgufs6enwek68lmpfgklq7b97lkftigp1ivyrbbzkg11yr9id06fqufpn2nvt9f7x3j8ciwz3urclggx1fvojxsjgb733cprf1zr5acf4omxqhci6l5lw1xrkh5h2oj59m60c4hf3641dfht0dxp51jk1tnv5',
                flowInterfaceNamespace: '11f4g39wovohctq3sk8n8ekd53ux2twwc3jbpt5hypb4yl4s1j55bne7cbrmfc06mdpimc1wdmx0uqbcnk9o1gc4i3drhcoznkbvmzht4b2ro3o9f6of41klm95aiw1j0oen7e9dbo1399cvx7y9vxio1ztb0nl5',
                status: 'WAITING',
                detail: 'Autem alias rerum necessitatibus. Quo quod mollitia nesciunt. Sit cupiditate occaecati voluptatibus velit rerum enim quod voluptas incidunt. Autem qui doloribus quod consequatur aut. Quisquam dolore voluptatem ea animi. Ut pariatur error.',
                example: 'r41op2beb9plz9dhl6wqye8vn753huld0pdsxxzrcgnpil4xr8abf5mnoh3viusc1jix8s6lt63ap757ggxzgjn4oy2138y4f2dkh1s15euzd4cxwr66kvil5yoowjik6t80bojv32vhdrmy2kai1qand2uuvwsl',
                startTimeAt: '2020-07-27 03:37:31',
                direction: 'OUTBOUND',
                errorCategory: 'yt1498wihvvc50fqx151ywb3iitq1uzjujupcvqeo6abotw41gap6kdkkqwg4z6nng5i79mtgo68hfvutjcbgpmjdf3jksr0ffstuufs0xodhhgbgpiejwx1ix2ifxml009q5bemp8odmmg39c5zotrh93z60317',
                errorCode: 'c98y9wke1j0hs23hl0x8',
                errorLabel: 371034,
                node: 9048020306,
                protocol: 'jqvy4u00dggv4v6tkria',
                qualityOfService: 'dcex31ocyfdht28rhp9e',
                receiverParty: '1not9xkv9jvs613yhob56zf4sns9pqqk07o7gdvio0k5xq0uc76xylzvk81ioteuwugyy8loa7hdh1w9s52fbeaz355i6a6a3ab6644xtszithvms3j7cw53d3ijfu2i9oih0bcxxzrbmlyf2ym48gvqa41b2026',
                receiverComponent: '15fu3acl6wajz5yysdx3bsbjahw9nb1olnoiw9en3oyl9n5cy7dnmo628eszjc24txr0sdu8nqjdflsycy44g1mt6c3idwjs4e4lf4yemw2hl5q332tqym0rt86mll0dmbf1u7eajiydynx3ivpxz6dfx1udy891',
                receiverInterface: 'lg7xetf33we2thygwtlafmpopzp7d117pim2zx9lfgsoeispeafgro70mjjqmkd5ooqj4xbbdhxp6fv8uli9conzitc7o54pk9wxh0prht10ik27yh7hckvzuf85re2ju97fo15sowxt0qa3pq37hzu7s0nop3bw',
                receiverInterfaceNamespace: '9on5kzqguflex9sj73r9vg75of3rqx67n8uhth5ne3lr7m84b9v6gsdcrmpmgax0g97rolkfdot1o9rx68bdbz2a7wfc2a9ksk8o9u9lumcuznurzmol1jt32r7pt2vj9gz0mvkgr19c2ethdp7t3izlgcjv39gt',
                retries: 7519632647,
                size: 8311172383,
                timesFailed: 6002651303,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: '0ojk5iedhf5jz2rww384n2eoah7tfoip5r4dqwk8jfdga4zzaw',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'xmtts549mlb7eyjph4as',
                scenario: '72opadt54m2gromkli1e4uoygdwq2t1qqrhw5o2lclvophvq0w2dxt8fgjry',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:06:35',
                executionMonitoringStartAt: '2020-07-26 18:21:34',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'w88avgtrs1ax8bdsbo1mwyox6nmk9enzzdi6440b1yn72xvuquwnf2k7gxmpvzh48jk85pokrh44ocr8es5f1dj9ufp1y7oj491zq6xv2xn3ok4sobou6354aajoor84miuxxvqsjy2uued6anrkm8luffrk4ube',
                flowComponent: 'i4bqlali3rofjxmjjm4xifutq4p7xhfgjfr9xzmgsclyigyd4uwi985ac9o5qeeps2vlw2bqmz4bglfkevdf8el6i4c62fbfyhfxchche6uhbnmy8ld567dn6vzt9nf07n3mbtknu5v5f4cw4k6o95v6jcgtz9g1',
                flowInterfaceName: '484oc668rfzrcdkjd4gvsx4fs5xj11gignm0p2gxkieyovezol0hoi9qqrp27em7qv1mf90eph11ydits818acja4r96isg8kujmh9mfpkc34i7iv4wisxlzxk6849eo5ew5oe482hjqjcwpfkd1gbh8jfnupofm',
                flowInterfaceNamespace: '2g7m8oejcmr79a4shmjgw1y1y831giyynpbyqoqy00q7xfl1pc61k1ws0prscf2mzjm6ta21vuzyxwdzwemiv0stjotmwid8jhk2p8y1nhp2u6w49fx03mpz9a1crdm8mpvzm1rjuzqqn2chixym6a6ng5tiijrw',
                status: 'DELIVERING',
                detail: 'Et omnis alias. Quas voluptas autem. Sed vel perferendis eaque.',
                example: 'v3218vmj9147u7vjwkdkfbru1reqv0m0takubt11jdnn0j03cpuu29u6qhzdn0xmmuyq5jz5qc9jj7qzk7lfueln7brt6b0gdp1v4v4zmnizbrnkaboz63emh2xwc9pz185y02c7tex55buqjri1m33vw5on9myh',
                startTimeAt: '2020-07-27 03:25:43',
                direction: 'OUTBOUND',
                errorCategory: '7b4othrmnfzh1xeyj7dau0x643l7rg7d5bla588q3pyh2b3o8hfwys41qrp5muqk29jxn2zq2rja8y4xi6shi4lba3g3o0n89qoaaul0res9pvmhn2hemxgzfwwbfxsogxfhc8lp0nzhas4h80li2ln86f7bzy7i',
                errorCode: '189yxbgvsq4ubefp8599',
                errorLabel: 205702,
                node: 3807412726,
                protocol: 'bso0r9nautfc42llihoz',
                qualityOfService: '4jxbem8mjgj8iiru36zo',
                receiverParty: 'aj6s27xvof8mwq0azatf5ni9a5ehwwjmdrbl7p0zhyz2upked08lx1i997uz086tz3i1lv6vd7x0iwhpp54yq2cf0uhfevz2mgggotdhiqz92p5pru89deptl2k7qflc2gmv9w0teal8gvzptnhmw7ppxvqrqvfn',
                receiverComponent: '62zt0ep83ime05u08ubfvmu0kjs9axvvb5a1h61ac5thoe93zyuj69bgjxtzu63r7cj0davje646tnbazjr29gxeg6bw8qxmljdzvqygvcgwwnhzm7x44tle87d5rj7et3nz3eccvpksx0cvwd4x4yiv8r155qjd',
                receiverInterface: '4cisyfokfh85ys1aj2e9pdbgwdpozvtehloll4zdmxaf6kxb459naypy2fn5ldnjypwrdqkm5d0ntbptovonbuc19nokz1508itkoxma6nia4lnbd00n55rd5y2xdbcve70oe6ujd0zjfh7y3gai8s315myv9svi',
                receiverInterfaceNamespace: 'm5ydgl0h5dk8e0ddehdvrhrnm1zcwdhvje280xam8ieazawqq2q44wv56uzwsx6hkhuiqxwqooyuwpo3b5xf34czlfcsav7soztave5os06x9ueoy5wz26vymo5gi4r61esq10n12bylujah61x83cg54lopt9hd',
                retries: 8594181876,
                size: 2501001436,
                timesFailed: 5719082247,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'i07tvbgv6kxiysq7j5xqc0a192gksq99v3j0x41rr1z6faizuq',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'lxywnq0iylmw1yaamxqi',
                scenario: 'vtntwqpm96d5wxot3ggi3c7htqf4u3uc9ui0zs8ggdjcxi4pg8mqf0t418jf',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:54:47',
                executionMonitoringStartAt: '2020-07-26 20:23:48',
                executionMonitoringEndAt: '2020-07-27 12:50:01',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'gpfb18k4u3xz2s3jmw1jnyftmbl6k2f95gfyashgf20euhine3bs19x19rycxej4lfvpdhgkwt1ra4tlgsg3jcd5xd4n1ppj8pnikz6doj9wmkwfyu9n0fpq01g3aiicfrmffbtr45flnk61qf0jarzcji4r6nxv',
                flowComponent: 'f1bialrpxe1l9d2o3fxkgpyy1opo0plwvki98i6q9og07kojsabm678amorlt9rlkv2ot04gd9suluiiaofpcdhx3mipn37wmy49qtorlkdnlwyu0fzh6p6s3wz82pugdfj6e7efsf2tps4xn70v1lytt7ypbdhl',
                flowInterfaceName: '5gvqjis79y7bnuw0mrkapfhlqz42ul2d7qh09rq3703bts7alicdqdghd9jmkato5w6a9vyer077owlgtf8uk5iq61q3x2d9w3exf863zoeyb96ymfdlb7mxq581k2m8y4wp3wgryb5mugz8arhpy8hidufnmusm',
                flowInterfaceNamespace: 'z2wti9gypc2w90ejsvrji0brblm71af5c0mcsdt20msj5cu0es8yvdw8qydfrsov8swrin5dzxoydwbon78cudtn5sw1jtsj7l7d60tqof4uutqr2p68oes71xrpl7lu1s01tdghlxavona4alwup00b17n431xq',
                status: 'SUCCESS',
                detail: 'Ut aut ut animi exercitationem voluptatem. Laudantium debitis velit quia deleniti est. Sint aut excepturi ab molestiae sunt doloribus perspiciatis laboriosam. Culpa voluptatibus rem asperiores omnis dolor vero soluta.',
                example: 'z58wrqw1cc5lokflw7m78juoavrzy9fmu5aqw6bh3m3icpncf157kbiaoyryh0zltr432fbtrz4n8n1e9kjcc73in7bnd0fjwtxi4jpsd8ti8pfbu613fgs0m0aluvtdbkknsyig33owt56gekdknsx8jxvicmqz',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: '854xhslxgtxtixoz0kpgh09sjzidggkl7rynm899a73wnl50zleigl6pw6yqvobsw82q8nzouspbl5oye1jxfz496uw6830te0idd3jq0xtumdzv2b5mrvyapob5kt5qimqi2df3dxzsbwfjjaalew6r1yk142x9',
                errorCode: 'y06vo9ij3ipcbon6mhty',
                errorLabel: 623702,
                node: 1686541988,
                protocol: 'jhsrexsyy2ag9j595v6e',
                qualityOfService: 'y7gxjl29z8micu1untqs',
                receiverParty: '671zqa0998803hruwy6jtqezj4miobbid9blqhaqxibavur5j9cy7qrkzzzx8913wka8jnk8ps5bexfn4td30f5pg8gyyougwd479a21afo054dzpxv09ycbgttz57swwugoo023mcmx6nkbl71ny7mse9nnom3r',
                receiverComponent: 'kfjuxryn6ptsc01osiyz1zsp1iijao6nsseu80vv735sfnm9vth1t76to6sp6a6up428wx8571pl9nf8qtsbhnibbt4amq6z9jzl7q9xm0b68zts7y4xkb9oa44k2w8ok0ks6syp0xt2ho7kus1ithsv4nhggoo7',
                receiverInterface: '7f4cuers18pumhduvc1evl43fzshp4ril5km06eteirfj3ylqyppuwpm6yf4g29jkmknb5r7yuh0gpo68jrzuobr5j1oiwx6zbufwxs8130myxtqizl4zhzeo9kp2r4aiuflm4wsz29v9cak3udep3dsgzsp3ntb',
                receiverInterfaceNamespace: 't5j4336zazxldk2e1joj1zxxdg8xxdnu4dbzptf3yxo3lmpgpeixt8bqkpphwlr28g81y4wxakd159ya88g57312aw6ip1v6o6s4ggqismzvna49trjdc7ltsmx7ekwa701z3jv04ezdncdii6quri9y1z800f3w',
                retries: 8236441448,
                size: 4991949580,
                timesFailed: 4898642111,
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
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'blj9vltb2d5brv9vxt8uun00uci2fkvvauq1m6edjl9bwbfie1',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'kjoiv7eemc4v413r823q',
                scenario: 'not6oy358np4sjz86vge743rafrolccdp73rytqows79i8zzg58z0yyq5twc',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:58:57',
                executionMonitoringStartAt: '2020-07-27 13:38:45',
                executionMonitoringEndAt: '2020-07-27 03:09:19',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: 'qhn26hvdm0fu5fvhhm4zl0rnjvh2no3hov4gr4gd8ytupb05ipsrzbgwhxx0gw6kh4o4r4k7kmg2ew39ny1adexqe6n138ehxeu38wfrtrwlerw8bkmrk2gle836j52j5ika4g0h1out0ixro1pqd9fl47i08q7i',
                flowComponent: 'z1tcv4rdpotvxjp2nktv7af4eywvt4relokb02n1wdxhnlcjnp2hl2mauwgbf0djum2qjmfrn1te6nsj14l5pron2hksu25lbd51me6g16m5a71byziefbkpfitblhb0nyexukwoyfekrwzjy3v1c8nq0pc6gtny',
                flowInterfaceName: '9r0j01k2sztptsx3wkdjey1q8u2oh287ylc0h8w0bro96pevbep5kr1ljdtt33bckqf2ofjpb79whi5wntuqvskp255f56jppby7gh0v1wlqz81rw5ednp8mum8ndc4etqahu640u4v9vg5ajvti3kuvqhyy2v5c',
                flowInterfaceNamespace: 'sfdb7cmif22zcowrzycyy0cyqs35gdj7ssz2j5bilaocsgng35n1q2t6he21m1j5ch12dw631lormlhusunqbb8cl3dtiuze5p0wnr3p8l5n9z98s2r36rw4r55m41rj5buafm44wxps39yglmt40am9synmf3jk',
                status: 'DELIVERING',
                detail: 'Sint ducimus provident molestiae omnis architecto ut id nihil corporis. Aliquid illum aut libero laudantium ratione voluptatum neque accusantium. At modi aperiam officia et. Laborum ipsum vero veritatis perspiciatis at tempore neque.',
                example: 'gw7cgebeq39vwi24wrm75n76ajcvyekg9lr2011ih4vd7t4hnwog6xwd8y3347i357b8eqmc5hrwjegogm19bowr766pdlzv2hs3sur5v4hsc4ifsa62c2uetjbzpxmu03nvffurvwq6rkfr4fh5yew2nszn0ejw',
                startTimeAt: '2020-07-26 17:04:05',
                direction: 'INBOUND',
                errorCategory: '9943qlzvwo0ee43thz5un68a56ftu6i3g5yht2ykjqjcd2ggfuiby79baj0tjb5u34cgwuzkyvorb1vzrokem3ah74rchjlk7uksdk93tp69wrdbatiiqs8zutch77ja023im5tbqsnkwb0xkds032qakfhb0hvv',
                errorCode: 't0pjam6wqhcd71brofw4',
                errorLabel: 528081,
                node: 5159845909,
                protocol: 'bu6dvccu0pltcmbpcnez',
                qualityOfService: 'qt8o6blgrckjdpo6u1mz',
                receiverParty: '9iojylhac1hyli7waefbfj3fphc6hph0fas5q4ldunlx4373eqbmgj54xls1fgl1hsy4ij2tun71716b93nsghkyzi0lesz1796cagm8ny3h3nt2b5ku30a9cwz39iczqi8ig733nh3qcq180yvz69i0lzkiaipa',
                receiverComponent: 'qzu1gxrdey7to3muldrih2q3z3ut05hksf6r9si1rm7j1ev8xoab33hjr084xks9uo15ip0ztor0smtv82g4q0tdq93fw9ifhv24e20gdfveddhqvffed9vxnueu6p8fgd4jznbtwvu6iys9kb3ou8bqqfpekjke',
                receiverInterface: 'z49nimkyjy2u1srk06p5omt7400bcrlz5teqzvfzly4b1jht751ll81cwl5bnxzqzsrtzqwolpg41160mlx5adohpl8svvwydaeli17nas9l55j78v8llecexn432ez6i50nrkeuc8vdmcj81dhcurdb2t8sfmsr',
                receiverInterfaceNamespace: 'v4aqogmjuoqm8p63ursnmlr3ip18cjln70hdox11r3107x055rsufcyjk2f8o6nbcrk4tqjk14h1mkx5oqa8vw1wy2cf2sxb3oac00iitfqs3yb4qinbhh5i4q5gsgqx0rxyxj07j5rs6312ng17of5fdag47dee',
                retries: 6401225004,
                size: 9573158739,
                timesFailed: 8356662819,
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
                        value   : '79de2087-0846-47b4-b4b9-5182a572d36c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '79de2087-0846-47b4-b4b9-5182a572d36c'));
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
            .get('/bplus-it-sappi/message-detail/79de2087-0846-47b4-b4b9-5182a572d36c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79de2087-0846-47b4-b4b9-5182a572d36c'));
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
                
                id: '1a78adc2-36ff-47c5-aafa-95fc95c80252',
                tenantId: 'af981151-feee-41d9-8023-55f253a8dac9',
                tenantCode: 'r7pqio3qaqde3j3e4yn2ntaeztaojvjup5m6f7v19lungwpyo1',
                systemId: '415cbd81-8af8-408c-9faf-d249f01bdbf8',
                systemName: 't4gwk2u5l1e7qwfojivs',
                scenario: '0ltp6l31ah8ym6axx94iox0kkt3ltrxxn9n1hutncxk18j29c733wu1ct5v2',
                executionId: '4e24144a-deaf-42ee-834b-c0fed0e8ec66',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:01:46',
                executionMonitoringStartAt: '2020-07-27 10:38:00',
                executionMonitoringEndAt: '2020-07-27 00:18:36',
                flowId: 'cc5e9da2-b554-4365-8bbe-bee57d5f8236',
                flowParty: '5658w086jtazgthf6s9dl5qhdgspbj5fpbi1km408p6ldpw4vpoeklkx8e0oh0c3no9rherik90xu0vyjueed5ipk5iq2hjkajh7yovqkt7znn5suavcu1p7mqzpoei9907ai5gqfhcotu6b5s8lgwddiyc4aa69',
                flowComponent: 'y8oeb1gdyfuykbgoac42l99tffqzxnko5bla20a48wuzpa0fif82iocf1i1617uczwn6n8y3tscdi71wn4ymcz56xderv7ru5iz0jgvgyiac8ix9s54vyfuyvee2ub1qloa2e00r6irokn1u6ny8eqxh2snkcl78',
                flowInterfaceName: '3do870lktws4ax7lmew015ky0svzpla60m3uh70zpxw7y282j2xa5pujsynj7xedp02rc8lkmxhggripugkcjb0w5x331jap17d94ed20r9nqni4pfe92dezec561m8txrj9lgeyvcn916ofttenclul9klzcl13',
                flowInterfaceNamespace: 'mg14yzngj122qeoo2aemiiadi64qf134ql6jpnux83v1yarpbjpghzrqx353ur0yu1obx83mkt1zb27rmtevtgvo1noapovaj0qb0o9oaob4vmwx8wypw3a0g0w223sic8clqrirqik7310n4k6rblc51eof4d46',
                status: 'TO_BE_DELIVERED',
                detail: 'Doloremque eligendi dolor dignissimos dolorem eum molestias. Sit eaque ad expedita qui quibusdam numquam inventore autem pariatur. Reprehenderit sunt vero dolores.',
                example: '6xzatdxmsnv6rs1txypbjso2batubb1x5649gaarwmnie8xuax6l2wot685y6euqda4rutum01co6fkjswuseee9nirzpcxwrrm2b3ykdwkc1i573lmbf8few7atxup67pcg11zgwkth7elewcjdwaalr8cp8vha',
                startTimeAt: '2020-07-26 20:53:43',
                direction: 'OUTBOUND',
                errorCategory: '9aabht7wpsa1mbvovukeqk0xa3hc9wl4q4jyd3lqj88j5n9wnxr4d37oc368j8df8wh9swpe0w3297zt37avb0kd9td1rylvv2bb5sfnuchx3lud7szqfr0zjscvisq771zwc21jf1ptt9v6keu3jnjwhsjrqzvi',
                errorCode: 'vf2fz8pul2ev9o5zvf86',
                errorLabel: 408892,
                node: 4443873956,
                protocol: 'ugsnr7q6g7oiuoz2a4r6',
                qualityOfService: 'h0swavqppqlcgzgrwp7i',
                receiverParty: 'uh549zoohncjbzye058tqfbam3rly4insu7exw7aenwve1hj7aozo3wmuac4q9f5tmju9522ig7x8ebx6z3t2vk5fcpa9vqxs0fpo4oic0ih5hq44ykmd74janvlk0bsizgefasbhze4n8cq6lo7a4q7n1n2gm7n',
                receiverComponent: 'zuyd44nohtly71v6hsx842l2m0lz1vt1r145lapuiyt6cpoor1j14vfsosmxwr8bl50vw8fjj9affg5alzzadr9xri27xh2lv6kl537o1k0q2tebn7gqi5uozwyj5zml90nnb9w3wk2smjfturrklj2xn87pi8st',
                receiverInterface: 'f290xw2i0n0ofmbbcghuth3x4o90vkdnl1wb5uvu9i37m0pr5fyily5bzpldzynxg85bcdak243bx11zgdd43etmsl77nuae5t15c63kqbpwcckb9hh9qg7o0qume1qbcxzwgqdrwnh9u2t5dwbp4apfzb5e76sw',
                receiverInterfaceNamespace: 'cyo4d16gtj4vdw749d0ax5h5ihy7xvh0hi6gtrozj7ih3re3imr1ji4tzz92bc03iw7szuyb3cpozfpgt1gd0me6uou4as66fry83wdcid7i8f1bxap6m4fil94wvyri39di7c8y9v2irqm8ud0v5dy2xo5n1l7n',
                retries: 1746262578,
                size: 9483087383,
                timesFailed: 8479150142,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                tenantCode: 'p3mcdepy0i9xuqap6mu10bbrc8g56sad0kcb5pyijmy0d3845l',
                systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                systemName: 'adllbgfrappgyjejn547',
                scenario: 'kpd1vw149fo7urzvugi30o7cf9fow6tyyi7yodme81vxzbbk8l89p0u0w764',
                executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:08:38',
                executionMonitoringStartAt: '2020-07-27 12:15:55',
                executionMonitoringEndAt: '2020-07-27 12:34:10',
                flowId: '69475263-2068-4745-a249-c0e37746e355',
                flowParty: '822th65bpem1yztihvz3botwd5baygn3vkxfy639jcuuju8pj89cq5en2sqmvgod1wlg2m7ryj0is4vysjk04bbj55clkfa9uv1d9tigf5q457fzme9tg8qyefzf0as9643yfc3ohqfxt0lctvok2tqgbcobac6r',
                flowComponent: 'm4qmlmgtky1kufkh0gn1yan6lf3jutk2lvshgfvej10pe1lvpw9uj405oi3dmrdc29p7m1b7z2wak62obv7vih0twnclhcljyzluzb9jgqvuoefg8jegxd33jwykklf2802e8f5qe8jayvaqx2vmsoxq67mxvqc5',
                flowInterfaceName: 'iim067gjeisbduaz9ket4e4x17ego6yey4xmqzohwvl1rbvaw8ffwq28olewyhzx76be1fdexb741l8jzpaqnrgwwcvr1yvyvy7e0szcrbaa9vk4757lqtoivwrc85v6cymz1ye89g4p2s7dfttb1h4lelqtnajl',
                flowInterfaceNamespace: '0tuyv8azshyaccyetu8gpe4xsfrf1qudcuc9xlpbqwgq004hlzlp2t77uxh83z8kf7g37ps4n3xkm7xecq44ivgqi390qy9mua2onj5clgcc21fug0krvsuxdk4us7nb578dmv26ih5pm5o0v1kw0zla22z1k3og',
                status: 'TO_BE_DELIVERED',
                detail: 'Quis aliquam vel numquam ut. Ea sit tenetur blanditiis. Itaque id beatae tempora quas consequuntur. Molestiae aut quis ut blanditiis nam. Sit odio fuga saepe.',
                example: 'w9cdt19sf129yuy22u56juuq9oe6atwhebqk5j6kwgdygs89lhz9i0c9qbyuijwmzzxgbqk8fv1wth71ll2alkbieywykip6but7a9k8uub1lt3bmvalencehj4wj1hsnynltvdgdpbnpo6clz85wjnllbafkz87',
                startTimeAt: '2020-07-27 07:41:10',
                direction: 'INBOUND',
                errorCategory: 'yxmo8v8z1wq0rkyjn6dlrn6v94qow3t73g1i4inh2nhlznbjf5w0ac5lgrox7gtx9rfg02poyzvgw723kohswkepaw1c9bwfgf0ia3iv5noomp58cvzgy2qsyh6qhippnpjftsz6evr5hi3n5ft8dq81n1j853iu',
                errorCode: 'qsalixzcr4e8lrzfulzh',
                errorLabel: 760854,
                node: 5871890192,
                protocol: 'uhe7wjp9z8yhmhp74gbe',
                qualityOfService: 'gf7m1n7zjnicqa9fiaql',
                receiverParty: 'rxkai02rfbjuvgbxq54cn9vxibfkobmsihth2w32p2ndwh7jvc4lu8wwz2yagelvyxswyv0j5c21eu6kmgl2wh2oi3ic108w3c00bbplj99rdhjsf8f1b83sxrntaui3bdh8icnv2taqcsbf85l0gy8g4aanehpw',
                receiverComponent: 'ympb7cyij2803sci0x3ifaewtj87a358bw78h3l9amlvuco0j5odva8tenke191p3kkq75w76k5ys1htjnej4guzmbo1q2jlgho2pms6ixtgp9g4rn9sspi34d0ttpcl65ocm2qm8xnai3zkuytt752zfq4rzjjt',
                receiverInterface: 'x85il8ptrrm3ft7xf4x9w2sc2a720afb7e9f12px7uzfnt7o7xrj60rca0grxojwx9phc1nqte1v9g6zkcc2q8du58ey0w5clhw8d9g2wield3jm1ezwuibv12hagqipv3cngkrzzykta52vajklc8hk2b1pz93z',
                receiverInterfaceNamespace: '75lyy5vwonrmsrmolv0h8kyhs75dyz67dcstzumtzpanx4wc35qbscf8xf1bufym8b4vcjcl99jqmk7lksctwkukuhqk5r8ut7nx5cmzwj8vlszw59wy4glok7bve39780lfvw9dwnvfkfdg0iuvxkcburk9dham',
                retries: 8555857794,
                size: 2042435445,
                timesFailed: 8684737041,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79de2087-0846-47b4-b4b9-5182a572d36c'));
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
            .delete('/bplus-it-sappi/message-detail/79de2087-0846-47b4-b4b9-5182a572d36c')
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
                        id: 'd70ae04e-314b-47de-8f30-0f1f8af26eec',
                        tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                        tenantCode: 'bps190qpsmw866ffbpsjumfhdvh8m8fs4wcam7a0o4lj6cvhn3',
                        systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                        systemName: '64pucvgfdvzpmn9oozgh',
                        scenario: '4j92php2v2jpoqqojldr73pmv28defnlqvb4rr1ik9xentuonb3wfdyg24kv',
                        executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 16:08:11',
                        executionMonitoringStartAt: '2020-07-26 22:59:04',
                        executionMonitoringEndAt: '2020-07-27 06:09:04',
                        flowId: '69475263-2068-4745-a249-c0e37746e355',
                        flowParty: 'co9d7rya45134t3vxczgez0sdnju5szfuxno2rc0ngrj2lof0wpn8a7xx5h9xlhz705ru56xhbtbzgpjukkeqkfnxm5d64vas7jbd0ef0pv5q3n2i1037jt0aed54dseh2frpk49ff8mbbbla74snefhd23mkc26',
                        flowComponent: 'ksx1csaeryk2tqmy7mwuyoo0ma4fsy12xxkckubsnnticr05l8qa3dsq95uie2kgdno8pid5nwnc2d789ixqzhv7e6sw6qe1ewfisxp4vyt3afr86ao71faa8hnll1f8zd43qlbs2ut9djv82ry900oobrpx6kn7',
                        flowInterfaceName: 'ozdl5hyw4lkdin2bbx9jbrwkug5akq4pg7chdvw7awe50bbaz26chufd8054n2g0ta96i2alz3p2quxh39xb2rqbbao5ut3jtshgff8n8shlnif1btr53onpsp164dqxg2dmi7emob5c3eew81b0y8wwh4vjzwia',
                        flowInterfaceNamespace: 'g84armhe1u3a199w7cnapbkb32z9ye47xco0yhrxucfv74fj1im16930lka9nh87gotsvz84pb1tpjurrvr04vis08mhymzbwazcoaqcpadn8l8dcymeus06ht8b3v6517lgzhp6796ru6t6w9mhlmkjhihh0tdc',
                        status: 'SUCCESS',
                        detail: 'Laborum magnam culpa doloremque repellat aliquam aut. Qui ea velit ea eius adipisci quos a et culpa. Error et perferendis accusamus voluptatem et officia eos.',
                        example: '2elcpamqaiv9k1sprpvho6dh8pghj1azmouwmtz6aw5pn9mmeudy4aqasnksipjvski38suas4n1t47ggmw7c0yjhl720sqwve0wpuw0fjdfu8chimksc46vcqxkjofaqygxs4ib6u6z8wbi6dy0ac84292oldwo',
                        startTimeAt: '2020-07-26 20:17:27',
                        direction: 'INBOUND',
                        errorCategory: 't5952nnh4pumt9u4qat9e4munm5vxy85qbjz0hd91h3cl8wbsn4c77hrc4y9gmee1k61o5e823kj90swdlkgy56ez4vm6iuvqiu66llkggf4lvtlixiq337x4v3mku2s2gxomk9qgs50p543o18nkcxu4dvaf2qy',
                        errorCode: 'g98800a09f9pqadyjrmz',
                        errorLabel: 640440,
                        node: 3229960472,
                        protocol: 'ypnkryhkq7pkuob93zif',
                        qualityOfService: 'iwuefai1fpdk7mg4m15g',
                        receiverParty: '5n9r5fafbz4ma03ulu408jye71pwi2690szniplu2yhpm16mjx5xal5zl01qgux32bbxo0kgeejymed3fhd478zfqe0ppwsxccn8f0v29455081nxt58fhmns6q2djegrjcf44vunwc887carjgu1x00nat29e5k',
                        receiverComponent: 'j6omi45nb2ebktkp0dbj32mepein8p16cw64383nz1ffj25bl74v0kipq48x5xxm1axm1u1v9k8wo25qmvuekwtgoutsxx1zueusu8kia6q20di72ojyfmk2qe1tcc8g1nbnjn7lwfvao3pd7amaxso1zllxr0ck',
                        receiverInterface: 'cj5uogbi6ewyffahqa351mq9rkj8mtqd20nw21tlopls2ikqyarhedl80240vfs9ruvboaw52w76gz2fwcn0zp9ivfrcgbhfxb4huzs5h15ncdcmq970hznev8grf8v6codk95y2ux83kab250vs66s9ix25c27j',
                        receiverInterfaceNamespace: 'zqfu1109e0homtnnj3qvy8z7f5rk6h81w0txyfpihy9gapf1umy2iyztj7a5tqne3433c7op77jibln2p70ozl0qmr20mh6ze63cns966l9pa7b3v2e8fh2huqcvxv4fwb1b09nqr95k7txvvv0htkluwlkcvk5m',
                        retries: 4541694740,
                        size: 3863232418,
                        timesFailed: 5792952736,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'd70ae04e-314b-47de-8f30-0f1f8af26eec');
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
                            value   : '79de2087-0846-47b4-b4b9-5182a572d36c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('79de2087-0846-47b4-b4b9-5182a572d36c');
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
                    id: '79de2087-0846-47b4-b4b9-5182a572d36c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('79de2087-0846-47b4-b4b9-5182a572d36c');
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
                        
                        id: 'b658d556-27de-4354-9481-72be90260615',
                        tenantId: 'a6d92f63-dc14-4061-b7af-4676bf193f93',
                        tenantCode: '4m6apu5jwle6icvs026xaf3p5sy2vb2l1gmoi6vvzet00t19ux',
                        systemId: '7d5eea82-5bfe-4519-bc9a-94427e48c3b7',
                        systemName: 'usyyqv1vac42k4exeqbe',
                        scenario: '5xi1gexezhlj1c5msx1mydty1f947aqwvaw885vqhqxr6di5i01ssdvaggl5',
                        executionId: '5de97e4d-11d9-475b-9857-153d9644fc07',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 13:54:24',
                        executionMonitoringStartAt: '2020-07-27 03:26:36',
                        executionMonitoringEndAt: '2020-07-26 20:04:06',
                        flowId: 'a2566152-dde6-4821-ad95-07abfb063d4c',
                        flowParty: '96mv39tg4m9728nxjlqtsiid5zza38o1jwzeyf7jy5vcg9bd9kfz70111zggsbzsax6lj8owxy2p9ncugd6ylmelrh9ezl3c1rrdr9wyse4cxlf1ggrvup44he75rib6ruof681goiop705uej1sszvrx4knp57z',
                        flowComponent: 'gx3ovmiiopq4mxcz7wcb5uc5f60yhj9qsnejuwm55nuzyb5xlhm1o460kk8leadp0h2yyeyzxz64m8qnhzjtdtpwvss9ik5m3fxekfyun44103s3h1gg2g2vreffv6jpu8e364bcwi5aan2sbt6i6ca8911jeb6i',
                        flowInterfaceName: 'alqhti25wn1jn70n5qluh17ums4ipq6jqcbvjcoh8zyjw69im8lzlzm3osx2x4gkpqgyu77dvj5khoku75o3tpvgjveowue4b7up4wh2x8lbrvd2deyuojq5j9rzujvxdklm5lwfxqm529jcxw35i0y85ka9g2st',
                        flowInterfaceNamespace: 'uyjjl1vaetjkjg159697puopo8k077dv5540zhhsk2tyhkjqnme1k8r34ypkq60cf3h30d6p6wifkmywmhuksd53xkry4hgc7aakpy4x0g08t4ykhzi7ux7k8vkgcb92mrja34ypgfzgr2b8in5997043r18u43e',
                        status: 'WAITING',
                        detail: 'Accusantium aut natus qui qui dolor eos voluptate itaque. Et aut quaerat deserunt occaecati est hic rerum in. Sed aliquam et animi autem. Quaerat nisi eligendi. Omnis quisquam eaque quia in architecto quo accusantium. Veniam ipsam reprehenderit ipsum assumenda necessitatibus laudantium impedit tenetur asperiores.',
                        example: '6p310z0vm1lb5r67s8xbuq2ay2ig7jec76vgm4lrqy012lexyaprp2xmvw8ffazd7shiesk2qxxhwhsaxt2m7m1b2h3ijewfwsks4676tmn8ktjfyxtn1zo2b8w7jkc5od0726xa9o6fl07z2g28frfep87gwzmg',
                        startTimeAt: '2020-07-26 19:26:21',
                        direction: 'INBOUND',
                        errorCategory: 'o95w3r18k7a875jfnllm31vr4dfi0spqob2wv9mr3hxwzqm03rlkmaistldri1olhwvaxwf55jsb1bxgt28bmn9w7yebof4cgy5a56m7dnep7tc3f7ui5i569v708e1l2n9x9sw4bo57zfr04gixi6na9gkcn4lb',
                        errorCode: 'd89uhhae07b48qbccix9',
                        errorLabel: 425150,
                        node: 7102204214,
                        protocol: '1fa7by462ugnixnahtw2',
                        qualityOfService: 'alxq1gs7dtsz5t79rmof',
                        receiverParty: 't88afhzgzh90qg6j2yat04ccma1po37dw3f2xudncxnutd2bijq763ivffa8p7670o2fcyzxx2dtu3acmyb3oriyyhzdhi216lmjb3quw5iw45uiczz0xnq4t1u4vbykv8drn0tiufs3z0ga8c4z5ycvtp4vjape',
                        receiverComponent: 'rwph05md0zcf4ua3pay3ssd5er9mowvi12q5q8xa97szt0nqwvtzhr4uw58vqtqdev70a9rjvyuioy9i9n2xxqhtej013eqsuaekm0sf58r2q0ulra7kqzk5r8ms5d018drxgu35yr2uv6f6331xkb9grpnom1rh',
                        receiverInterface: '10846cdk2oqq7ccrmj9lrrc0iswlij5jd1m8ksnz3voygg0w7eqk22qlu59e3pnyv59vhnyvf2k63kbzkc5rr6hzbf4iwbwgmo77gapnqbe08yzc4ltme73o11np020127dxtoh4s56qsont9d5oftromlbhqg9o',
                        receiverInterfaceNamespace: 'ulm12ul3xatijwfguxidz0h9vb0skkhloikvi2rz2b39dbbkexn3848o38xu90z744biueraz366nxk9fjvt6vpswhcuxo4z86ynqedrlc6y6tvx07b2gwaim0hl8mhqczxf1ytc4qj4zgedxye2o31i87y0jiv6',
                        retries: 3516065170,
                        size: 7987883159,
                        timesFailed: 3768493331,
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
                        
                        id: '79de2087-0846-47b4-b4b9-5182a572d36c',
                        tenantId: '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9',
                        tenantCode: 'hgo8nnxs0p96diqgcwdzbn33azy9eeiscmmjouovfbr6327qmm',
                        systemId: '0c8af42b-fc59-4d94-8b23-21249b593a96',
                        systemName: '7zjfmopyrhesrf4p4geh',
                        scenario: 'xazbpfz8c9vtsabmljkvbp9q1rimlpyw6thuiklqrxxp4z4o8z0p9ninjo9f',
                        executionId: '18891c63-0400-4f46-8189-1bca175e4527',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 07:42:18',
                        executionMonitoringStartAt: '2020-07-26 22:46:25',
                        executionMonitoringEndAt: '2020-07-27 14:20:17',
                        flowId: '69475263-2068-4745-a249-c0e37746e355',
                        flowParty: 'ksreuzk5nesrwovlc2zwopx2zmrevcb020w5dvavabi3yf59a5i4yj3w7t35zuqqy5dyik0hx8ycxoj49i4d7w2o48goffqw9eta3fi8c1hd4t3w21ppzoa3u7fv8nfefa3dlr0thdy8zbqt75zeri61ah6wof4p',
                        flowComponent: 'b38uo8z1b16qrgtpt401yifcav1geu99egqgnbmzjoyl1j832rbho8jtic1h5dulm90a9bkcnobq1o4zwo7vkkkohm692jrg58xdq0ro2nyzq1doqeirvw0xhm06twlextr2t5seiwdwrvmq897mnn4zablh233i',
                        flowInterfaceName: 'p2lff7uj1q8eu6yikebghppsisku7pn2jyzsgvvhdvv8okeiaivv57cup19xnxammjw3kn7pit3odj4vrpu24wvyvt4yk9i974omvjm0jc0x2epc0vhnif5t4pfqurp6s13st57cx58him0r8170wspfrihir65w',
                        flowInterfaceNamespace: '8o0dk4z0bvwx0vsrxlrv5bsq4yl3pgu1cpjoztbf0wssj481ckrta9mba5acltry31uwqi1jagm2z9vfgnphik15wwv7rf35yhj4b3cy0krpu0fw2wwi6fz6zaup1wvjloopn3ech03zlkvd5792pzbpmmpk5sat',
                        status: 'ERROR',
                        detail: 'Voluptate nobis blanditiis ea ut eligendi molestiae autem voluptas velit. Voluptate accusantium hic ea. Veniam error velit optio.',
                        example: 'kvt4rfajxzbwk40rwl07nz9uxyvsvxikgtrswm46pdjx22x9a4l17ba8er0nt9fvkugmoi7xhdf2e4odg68z0o6ts3zw7ksrldooee814k50ru0nqnmjj797e3u4jtmiew1ird7ykhp0iiyzdqfqayppzincbnu2',
                        startTimeAt: '2020-07-26 20:04:53',
                        direction: 'INBOUND',
                        errorCategory: '632fkkj0i8u0a4d2pxxisoognp2tw9d012780h09qy4uwf6h8ri7gpvysa2llkxpaqjd6ysxsrz2hx8w3q8b087zsx5j10i1m7l7z1ywa24eue7vjeodjhl3tcc4rz78usiet228bxwv7qqo5bavur63xztqol19',
                        errorCode: 'o8r444qg6qha6yxpljc9',
                        errorLabel: 881474,
                        node: 4071106688,
                        protocol: 'l5mobgh98st4pqnhjxjx',
                        qualityOfService: 'mhkh3igq7zdcklors181',
                        receiverParty: 'uplcsentdu0fveg706gnudfi9kdmp1qsnvrnnnml15m738vcd2lfxqblsj8jrrvw8anbw11urg4m261vfwhy6e1djmwgdkozq4b2jtiwkwwve5iemnb28m2g86bs0xliu8ym08jplp0w22x4z0u1sqtaozcbnbey',
                        receiverComponent: 'pylthdvzdnqqf6ak02eufc6a38tsylb58iwi4jqot3ailc1pa748i5qazgmb8so4zov1chw3apgcigy5geh4xcf1zax5lhwxc8jg7o8odtopk1x6wob9x7sdqk4gega1koynagaa1dahfhowavm5dc68l54m9a3p',
                        receiverInterface: '6yklszfld7stxc2k138qe5ihi30ecsux1pgteggyw352vfff1l3d8mon3d6m62sqqc98kytu3pnthvfv0rxplkthrlt2z6p1y6p3puxao8y88au6ty2d2tuzcn21zf3atm90vlc57eg6s51zhkg7x6a6m85a5ow4',
                        receiverInterfaceNamespace: 'o6pa8pwl2wuc3mfkvdgt7br6djok7ocd2rzn38yhybayfa3wjcgdz86ry71rkwwtlekildvrvfom9gz0r0bub3ink0kgs7yx9gt8t99ev0rm9vhps8cppvsdlrctg5ishkpq5f3zfuvrkqppchydoi4o11dwx1ax',
                        retries: 7524912441,
                        size: 6027976088,
                        timesFailed: 7845305273,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('79de2087-0846-47b4-b4b9-5182a572d36c');
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
                    id: '79de2087-0846-47b4-b4b9-5182a572d36c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('79de2087-0846-47b4-b4b9-5182a572d36c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});