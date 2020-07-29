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

const importForeignModules = [];

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
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'ua8u7qbou3ced98o4ui185j1n5ynoc6bkgwaw53vhradzk1s8g',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'lnaajqn96keju6818lnq',
                scenario: 'qievc3jh8o3x7u19mls5fvay0wzo4ekeqwbqwezu5k82wywzzb48x1sejlh6',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:50:47',
                executionMonitoringStartAt: '2020-07-29 13:52:00',
                executionMonitoringEndAt: '2020-07-29 06:02:50',
                flowHash: 'pqpgc5jqokwrrz8bonrwr5kytjgihte4uxfojvcb',
                flowParty: 'lpqbptje5ecg3r21bgdze47mwp33yw7375ixwi27ne2avc2v7425bqi6iesfy1875wj1b0bzbs3w4b5639xhbws8117kgejicr2hzmg81asjl3b2gfccxt9olgjiv5vfuv1j15s2hphm4rh7qd96gu9hbje89afb',
                flowComponent: '566v3p1dxr93mt32oolqs6j656mee7rs9l4lflnze7s6qx5ylv6il93runst1kyk1urwp7cbhi2aelwxkjmnyak8aix5a3u51e8vtx0bq1onfn3retrofn22u44h8f8bpn7z1zh5vyr705x0d3p13t0dsa5acdgg',
                flowInterfaceName: '78ri8zvkpgmo4lk175po00y53ote23pdele2wsrn5nrewseu5haz0mhasniuubdq38lfbmdvu0s94560ng94gdevpgnchd1zw7ji3mcenim35c9hpsj1ywqwj4qj80mw08s7oh67tfr5yuthj6o5ks8sxfjw3718',
                flowInterfaceNamespace: 'fzcp4uh8auh148pnqep74swj2dugaou2nqgmtsex5y0tikm2f8j3brhd36f7zif16mrzeu8h9qf273s0flb676cgxxll0qyw504xjpsc0l8n2cmtmkozuztbgi1owdt0glk03v0dcmyzljt7r0a2h5c1c5noagq3',
                status: 'WAITING',
                detail: 'Fuga est nostrum commodi nulla ducimus quod laudantium corrupti. Optio sed quia in dignissimos. Velit exercitationem et aliquam.',
                example: 'dox6rwub965ydbu1ha4p1r1pjjxhvniirzy4g9gt3cn1lctimqe1ragogy4i6xcdf9oefcjsqoppv2do45m920x5gcvwkux2o848ffa2qoayycqq5skuhcjdazxr1prxingwzu6ii19kg30p5xas120m60143vfq',
                startTimeAt: '2020-07-29 08:34:42',
                direction: 'OUTBOUND',
                errorCategory: 'sfrongeu4z2cb7pgu0v9ra3u2f6gyua5kf677pxwy2a8rsc8ndgpiszinfqe3vhxno95z6vzutuyd3pw6t80f04i5asl5jcz94qgfqhznl9d7dtbo7pryiqp3e8zt4yj152ncrqs8kdt37hkt4d389ip0h045ycj',
                errorCode: 'b5jde4pcyp6436epvnwxj4ic5dmopdqgxeyzohhjugnhqv4mxq',
                errorLabel: 802937,
                node: 6089773227,
                protocol: 'x0o5w2zotx5g8co2z27j',
                qualityOfService: 'wrowt16lf94sstes08q5',
                receiverParty: 'u54qdyhnhx4j8ml6gvsqsvcmmch88rrklae8q5m0e1zey22gpqw9oainkbscf0j4ztt9aixmo5h0vhb0t5iaged98o7frf36ko2lr07y0yeggwh0sr2p4zihjvnscoio48eg769yek3p5fvynu7ex8h8gkhy4poe',
                receiverComponent: 'yqfkdds9eeeejp9ohyhb6sblne9f1unkqgehoear9bgntrdnp966va5tdfu44s6zdak7l98ms3y7m9hn5hvhflscehx99dgfyrb4tssn3of0enpcqlk1ivcb02xvyxouq4bmucg57925pvpw6equreuzohjlanyh',
                receiverInterface: 'bu7m9gktbfj0ey9ox9l3c83osrj3s5nfog3er0lo38htcijhewwwxsohiwcdo58q49pbx367i3c3px03665mohs23vcqrzoquhabypmvch3d5opclrujp1aolu7sdwtppwn7uz8rfvlja7bcrmu4jpkwyetbj0mx',
                receiverInterfaceNamespace: 'h8yi9s9ufl5gopd0lifdo2wsi6amnmm3oitohrqfyo7q2y8zst8kiv5da2yqe5p96vt7o28620mfs2ugbg6zxep037hf2nuz2i1wr9cyem2qefnanw362l9kq7nrn5pnbt5ivedxsamgsa1qpi0e02rrx7lxusww',
                retries: 6609037406,
                size: 6151604717,
                timesFailed: 7986159701,
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
                
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '5q6l6zjpmc9w6v3vm6p1n0654w4fahrmdvqqard9aows9543qw',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'tn90nnl1sr66y4cmi5u1',
                scenario: '6ey4cl8ishhbxq6vf1c6k7u9o1e1c9zqjva370rehjts8rf2xokmpp9psqhn',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:25:48',
                executionMonitoringStartAt: '2020-07-29 14:06:16',
                executionMonitoringEndAt: '2020-07-29 12:45:44',
                flowHash: '7pufju5r8lht6rgalwi2piye1riupmh9b9uki1d6',
                flowParty: '7tfi2ejkebuthc5gzqeykdshf6h96scrvpjaybu3mh314nk6rgmnf0vil2cbp1kcr2giojyl4q2tg2750qvuiwzucgrr8lgpuvbueo1yomrjb7swi0ovg6qp6anv2t1o2obwubmd03wstf2esxp98bdfn2q8rdjw',
                flowComponent: 'ucqizqgfdad5pddg2o088xsjprmzkotdp9q4fsvs4fvedg70l2cxith08jkdh5fb5p0gvglkgbs651t7ma9b8lm1yz4z5rhvwjdt9moggqht8wvusn8yxjgr769vez8xv7ngrbgjcfb8ksd32ptksky859j2dtsi',
                flowInterfaceName: 'qerg6c2kulk90gnay94zlshh1nmv8valupf4j1hbmlud9qhq8jsijke89a3bal7psw6vtyoo5ssjinhiy7ghr30zck0lb8gws9d3dtzplywshenkaep5gbo382ivzcuysq38yef0la2ritla8d9s7z234hbp27in',
                flowInterfaceNamespace: '75k1t1uxvvmeovcj7003paizitehmeiz3n3g36u17v3w9jaiuo669sn406iwtm71x97m1u9ek625kkhmteqrpwxhjhrn9m6zbtakho2npj2y4vur0sstock9wphqfzusv73beqmri92vwtjylaofl5z0xpu1mlx8',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolore nisi sit et similique tempora molestiae. Et libero neque rerum ut et. Nostrum culpa libero velit magni dolor quod modi.',
                example: '7l5ihoahnb0f9z5j415j51mgdgc70ejhve5lch6bxs6si8x8uswwwwp0n9evtevhrpc0ougjzazm9judx0m6jn06v2tk56qmofi6lhrs7uecuy6akqe3l8cpuaqzj488xtm7onbfkx31tb3q3fowttd7blxgpawa',
                startTimeAt: '2020-07-29 02:28:28',
                direction: 'OUTBOUND',
                errorCategory: '0danopg4cr5a7rulrryrlnc7d97mobbjma5c87nmgcc8erua0jrhh1ltb09lxivbij2tvp6n1h9mqor5zz49p1evfeqgnpf0dt99mg393g95ed8v1by1004g3t5npux6sj3pd22whnjnqv1zevjlarydftzere7w',
                errorCode: 'x509txddtrobp5vjwu6bk05yhbgohviq0p9f37esgp6q1buz9p',
                errorLabel: 300375,
                node: 6769957126,
                protocol: 'b7t2qt5thy37i6t6wyp6',
                qualityOfService: 'wzf1hqmyz7w8hqgy6y28',
                receiverParty: 'zez0h0jwd0u1cimvp709tj1qjy6ldouw7w81v0aefpw8mx9kokn93zuid6joo5uhs8uqmdd1m2xq060bqf1ayvqa8kgtgo0u5b7ffcwn5k5wzm9awe759dvt7v0wbzisye9qt86vs2ujqkuj3fym9vumt8xzk0t2',
                receiverComponent: 'ao2koewvpbdglhvd5s1bmxb57tmvuk6sooho3v4xd5u10dfxz0cmt3f537saztlfecmidbf2et30l6ep2y7y8llzvm244pyo7azdrzt6rsmbb56dh3hn2szohh2adhemj3uxjwryax84rmpm1elv26rmm8thun9l',
                receiverInterface: 'j9k2nz914nb1bymqw60ndt0tct6jcd00s38bu9s7scp2cu6cjc6f3f47papxmltqimyck8vxypol3g9162ic2p8rhcmaj15honhx5kovmpvgefqho6vvbnwk5jyhevlmeongryvr4wd1z2swn6uk3mk11p3iuohp',
                receiverInterfaceNamespace: '1movm9e3gj4uv05m4c1ec4c8amyp3pa2hbedg3bx4dt88ued5dj4qlu9ae0ed996xbw5v5j91546ygis5xoi9lx7gdqv28r7xhzyhfx6kcjbsp1mm3d4wcmg2pqhjtsbl0ygz4xbc19upfzjzt77c4ky3d08q7m4',
                retries: 5045366577,
                size: 9596112042,
                timesFailed: 9491328138,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: null,
                tenantCode: 'ap2fag60rn4nsnd5jzt5gsyagqsppc9agdghafnje2t7mi2rue',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '22dysegj6saop5ea1mqg',
                scenario: 'irf35b4n8bg6olnhd3o5up6uf21wyy5xg6cudyzxx5tb3zdydk5hc4fwgfsv',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:12:13',
                executionMonitoringStartAt: '2020-07-29 08:59:26',
                executionMonitoringEndAt: '2020-07-28 21:36:30',
                flowHash: 'i20zspqrgfaqrsn1ebjvdlyuwv3jpxhb6f1n8y5x',
                flowParty: 'b52hagv0xjroinjt9zu7uxy2r6kteofig5cszro09rvzn8mrybeemic3qlxtrmz9157qjzqr2u7rw1kr4ncgjwuhq7octp4blm55w28bjcl8blra8n8hp9mgxnnib228ltptsbmf9dprpzp476j3gd04dnm689t8',
                flowComponent: 'm019cidphhoftd5k2w410ytm9qh08cibc99nk7ssuea0koxc04dzq6hx2ell9qu9n594drc8ina5bjpz43srj78c10rmegtkdi0nyc937gpcu1cefob9otlq0g0gjxk7ob6vago0xfpv21mnpg2ydzscfadakg4o',
                flowInterfaceName: 'l3fflkuen9ebu2q9sl7mx76aipv3fb4lasvqvcjufbhpyju1ywhusfl7ujkl6fb4tpskmi7wsoy046jrwbf0vf9ajvetl7gz5c1r6saj12x3qtvvt7lgwbft0nvp0ofcisxon2w02ovpnfzpgcjic2o9pc6sjfaf',
                flowInterfaceNamespace: 'o2eehy19dry5ycizd5fe2yckn7i6nqgj88chnvxksavgoqrj17ychctwrnnwchwhaz5srxlq2on9laa47gvl0maoo5my1uceguk1kp0bzdcmkzjvq2z6mbn917iqvq7lmgjep2yrjnd8cickzrfiz60o4osvd7s2',
                status: 'ERROR',
                detail: 'Unde sint aut qui doloribus. Sint dolorem error ab at et. Velit deleniti numquam minus et. Maiores possimus ut eaque voluptates est sed. Est et voluptatem est earum ipsam ipsum. Omnis sit aut vel laudantium ea.',
                example: 'xgw2ytjrj9bss299eo88wqtxiitcfr7uqcbuo6vb3fw8293klcurz3b5wfznbkgn0l892eayw3kwhpg95mngwpooyzw4drjhb34pm2omf998mjny8ie0mo8r5ot67racxws1rtap5xcynqcfvefiw3c5jnu6piay',
                startTimeAt: '2020-07-28 17:23:32',
                direction: 'OUTBOUND',
                errorCategory: '0n47rweaq6li0sh0vmmd59vnz4i7dj99vt4jajz8ikvsi55s8e1jeg2pteg4t18ve9nlo47usj9sqvlogzvrjtdhyq3t7znwl6zaansjai937iaf1qx2dziwfjocjjwprdq7grwqmshwoqi7ldq1gl2lmwithg3e',
                errorCode: 'dqkjmse6swoftdspdoqbz1bkwgi11raswax933bfhqugioccil',
                errorLabel: 417655,
                node: 3323730497,
                protocol: 'irvcftn5q5kxzepb8g1i',
                qualityOfService: 'lydfr0o8hi8ijlqnaqej',
                receiverParty: 'ucj1vof5jdnh7w9wjqxptwvidlk0qjtbfsgnrl8alp212a6gikn5pmqx2f9kwx1rr89gp57mz9zox2k7rt0m67k7391ewxl4jk8ihrpllxy6qovf25othgt93ab6tv9ii2deflv59c4vf12jdt5qtq8kpoklxek1',
                receiverComponent: 'eg06f272uril0979o1zr6mjakbd0zesxo1pq6gpxu00giantrbetsp916s0huze9go3gr1r5c37evne3km2gfd36wgil6fsrdx3gow54bj1ekd3cwdf45uozd3farco80uh854txdt1xp96wcxznjc8txd6p6nki',
                receiverInterface: '657d5gvw5yodufjbfo23ck5xjhnvf3a6un999o1y8raa017pobhfldpxnvhs2rdutkhxlqg7006gs3z0apkkvh7mncsy5a0logxwfn773n16ehdwstr9h30wjquvzhr5qnfja047clyac08uet7gkhmdwzqfhosa',
                receiverInterfaceNamespace: 'ejiv8ijzdbgruvlxysm057ew5q1xwo0f0lynet244dfaevpkkul4qc14tl9rtpmsgnxhqyh2h3am8ihn8ef4hcur5hl97bvi9ettj2cldk3guw92lhq0id1nyvry9asmy129m5et8wozke0u02pnlvxu6bcvw4z5',
                retries: 8249597733,
                size: 3508773941,
                timesFailed: 8787271736,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                
                tenantCode: '5bepx7a6pdj590xc8fg9hrgz28k0eliedch4ti78ouod06pwp2',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '8yrlyfbr40kv95cug6ld',
                scenario: 'a7p3cofrt6igrylpnrnt3j0py8ogn26u5n6epjvh57fctehm8p3x9e7askvh',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:03:55',
                executionMonitoringStartAt: '2020-07-29 10:45:10',
                executionMonitoringEndAt: '2020-07-28 16:30:47',
                flowHash: 'hrvnp472vqun5pq8jqu04amaxj3bvdy7j4fdux70',
                flowParty: 'p9tfwrynm0s6kl4h7lpr17ldmxkqlty8pw9i9ultazma3j3vulquw19o3w0iugqkes5mzuozrutpiqdhi4fdbq1oh40nbcal8q1pkk1jhb2hymg3e2j2nbqe8kti24rrp0o9taivcu7kfb5x4dv54lrfgj70uk2m',
                flowComponent: '9n3e3ysyzgjft1qx6np7usnsmczdzqxjsml2klh8juljqo51youdktg4hltctwn7w1w5anae9oahqzxmrpvmb6fzanb3c0ceza46usapvl34ya2gwd6exwfup827rv4sot63c4qd8sk35j446endcu7zjp6ce5qq',
                flowInterfaceName: 'pdzveehfanw25wmscvukihgwmk17abzkl6pdfys2z1lfsdl72093y5lyz5om015se3n2ul32ueb3qzpff1i0tqfrmyg3a92hsiszhg9a7tkcy3iwsdjpnwy1x440xbn0p2by7n5z2axx44m60lhcdyz7mfw8nmld',
                flowInterfaceNamespace: 'ig48qk8sgwuxlevedz4b0shapkeb2d2xwc8rbevifsgp07zq939yxyb1z1kupczsp5fxf55h6d2lmu26zisct0hstgrhbaouk7aold9siboxxu41x5bmeppy87ss44u88ysasu6xchovhdbo1kmwb2drazu8pdot',
                status: 'WAITING',
                detail: 'Reiciendis est provident qui quia sed velit. Sit nostrum quis ut quia voluptatem voluptas mollitia. Necessitatibus voluptas a.',
                example: 'l2ndoqg6q7b3bea21cxiiernx60mr706oq2596t7z5pd09zteist5anxm0k5e5e80dzxgfonlwi3ioy67cyh5ocbxl46lmvd9srh2fm61xdrw1f463a1vvrsedby8l7k4d3km4u86tqfwglni725xw577cjy38tz',
                startTimeAt: '2020-07-28 21:59:43',
                direction: 'INBOUND',
                errorCategory: 'xnoknff7xhuwfju5rz4mqlhl1k68y3iiawyepwlfj6yjq4anmo1k6y5hof9as2tsvzjbjm97ubdrjr631ac2xgarhfa426b8i3vhgzfhf2w47gvncz25u5e996t2zp4ybjlkbzcx1gzmwwgaz3iseu09btbefhuf',
                errorCode: 'qm9zsg1uj3nlnw4nbzxxf5ox15mez1fr2kguv905kfybst38u2',
                errorLabel: 778462,
                node: 1383985444,
                protocol: 'efzbgk9edzcj3r83l4sg',
                qualityOfService: 'gl0papsnd9fxs79wy4jg',
                receiverParty: 'qf2rq4alq0lvy8yo6pdv660rvxwhmgdp28u2nrp9038jygmxybdg3s5yr9k2mf53cpqu8zz2qojmk0t8l8oxkgjz6037qejz5lieddrjync6le7o5fqtmusghb89skqano9cxja9qe02e20g9xq677s78p1hiyo1',
                receiverComponent: 'zy7wp0gwm65yefkgxygwr873unlx2370wpvxje7w75ub08k5dqk32w8ieyk5cf5x0i1v2175s6pgcn18fmmwyhu00a4ax65r8d9870tvod6ay206g7cgzdghgp8kxb3sapnzp3g1yu4rzmdxipu0ztm9ws456hg9',
                receiverInterface: 'zm0qvfe3ff5wdiutf2i5dbkx0bytgtlzhp462d6abzkni3hhr8k9eg5rhdnnmf0aba10r0gcy326m0o2pmdkarzmazjbpp52fa25g2jm5kdu9mmmnm7s6bacpj5zw3tdvyliysm5jb2zsx0lsz38mltiwe3adge9',
                receiverInterfaceNamespace: 's666goxjom771libgurwgqx244f0ef43ti8zi5wfq3j5uafw4wgb603xzfjhhufq6gcp7jsyoseygdeehuo369tna39js3mhj9pc6lpmsxhkcn79i6osencl32jku945gd0kwdrt6oa0y3to92ss4po7vnhxeu38',
                retries: 9279539487,
                size: 7413488275,
                timesFailed: 9012827715,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: null,
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'k7cdzyiodji59vin39sl',
                scenario: 'vd4kgq3bjqn6gh7rza3b4jg1itkhhndy3xhn6qfh2tq7067g4altrr2ti43i',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:06:55',
                executionMonitoringStartAt: '2020-07-29 05:36:55',
                executionMonitoringEndAt: '2020-07-28 22:14:47',
                flowHash: 'dmp68hja4187v22gekyvnu11u56gnw1qsw7mwk9u',
                flowParty: 'cb64llbbxkyz6qr97w3yn0gjfm43adzu47rbq1yxha6e2wdj0lpesi9x4i4zgnadimpc508uwhj96mwx720mdfllk4s8nrcc6lhde1jfb830e90rv1yygxk98n3xo6mj7pgia8waj8y9n6aez5vrkgup2348zn5g',
                flowComponent: 'fwevqjcd8229z00e9xtk82kym5iuugwilbscn4lhqjo8i20j7xaov4m0oexz70jdo7amgyfacagdtpy8n5598nyfshzep9uhx6ps3c4imduuutyfj5ugph1y2ewte0h6a1xly1g1oqx33erxj51fpsjk7l96r7er',
                flowInterfaceName: '3ezu6gw0agnmzbhlkekjy8erzwsnvu0arv485lgkq5qbn8amzka88kzf6ckftma788gjlu5jc8i7c1k7kgl977dw4hss1gvfqzb1t0bfgxf8eqdillfqtg372p31jmcumczcu2i8wfo2u20a8hnnshz15cpxzzql',
                flowInterfaceNamespace: 'fr2rrylqlrg3z89cyf0v84vf2hh3fhbgi878r47fm44q2dzogfqubkplpz5urbvmdkvgykdlk73fgmmao0hx9u8aqk5ldythuhxpbyvxdsb26a02y9aje7xn1vyvx2adzikwvnfkny52r4jcl9xnc8woudsgqnup',
                status: 'DELIVERING',
                detail: 'Autem corporis ex tempore necessitatibus deserunt eum tempora. Eligendi aut sunt eos magni porro sequi pariatur. Unde quasi impedit. Velit sed omnis non et sint in quia accusamus. Velit velit ex velit.',
                example: '7libtoq0vkvyal30wphkszro27e2b8f3j6djw4dox16qmmst8pjf7ugk9svfnno5dm9kluzb4r6dze0bt5s5wycedq2tglcjgamip6t9a7372jgg8c6emjgdrikonoogjc3j67ua7wzvc9xc46r6lvkf5b9f3zcf',
                startTimeAt: '2020-07-29 08:51:34',
                direction: 'OUTBOUND',
                errorCategory: 'j8u1ns5gyy3tdaq1s5sihjkfbms3ysa23sdsjg465n3wjrw3fg68fv7vq0zvh4yeszddykljp6whi1dv0vvlrupnnieqlv3fbk90q7zt029v5b3uvu7l2x4ji7ob1zcq3iwxqpg7yclo2ndj6oq5xlfxb5rnsx7n',
                errorCode: 'uktuxszi5997zbbdue3tp2xaz420q1j6u76qe6jquelg7h75ly',
                errorLabel: 483580,
                node: 7228134420,
                protocol: 'poinu9t8vkyqp9xut0om',
                qualityOfService: 'd5fl1kj2h9md4sopjaua',
                receiverParty: 'wew3hx0znvi2wt2wk89rdu12sbsyqj9rbg2onfx137bna9c3rprcim5sv59kx2tcolxxvt4xkv5gu00az5drkofb3w3j0ggs4b78ok6yjv7uq6jvfcopideyniluo7cw3kq5g95dpwpzp9fzjvxnzq45790wpilu',
                receiverComponent: 'rzllftd7jp06oeg0gx4xgwqp9y9tp8tg7gpzguc8dzkr880is3gdk6mn3j4dd8rea39iegd6xmslulca4bxn1baorjsypzo01erztfxzj6mufjhupsbibtefzsg0oey7sll83dxam48869k1dp03lnoi7zvhezxc',
                receiverInterface: 'rr0pkc8i19hvk4wo662075pa0egv2q8f45c4919j5t9gokg52lhn4hj22ikulydab0os36zfn28q8xktioflaysku9dxgalbxw7n6flapkzdiwtal2v67fshul0wca35838czabqqr7osw9uzf4pri2t7x1swd5q',
                receiverInterfaceNamespace: 'fcuou02fra177mi9dg4lkuaz3rnq2ldclzc4586x24lewh1kp15vk6ply1nt98pyc9pjk4q44zhjpksbytuzfvw277oh6h3a9lqi09vmxbclbcdbhg5xj4afgray4x0v4vw256xahd71w2dfqcrkh3jetrmvlmdo',
                retries: 8904638664,
                size: 3298228333,
                timesFailed: 2692232027,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '4bcy5qz0z1ztvo17nv6q',
                scenario: 'yz2v16c94rn3m16mppvzgqearbroq5i7a122j0r573fed3itkysxxjr87614',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:23:28',
                executionMonitoringStartAt: '2020-07-29 08:46:01',
                executionMonitoringEndAt: '2020-07-29 13:57:39',
                flowHash: '2vfhxfmi9cv20cwuhotio3si04s31ckbipdrnkrb',
                flowParty: 'lzakswu9iyj3rfn7ravtnd53b6lgk47ieimo9mcabggascb9kzsn3kq0o51yq50jqzx3fhwtdl7vshe2iqvxdermxunwhmvi0cwfxlsk5c75h5xqtckyv1pmffhieinlynyl19ji6s9ab7kz2fgl1pm8dr1vt479',
                flowComponent: 'a8lwwl85xp9ux2a7d3hb1d9629nkp6t4jr2ipipyswbfnvcmql2r6kez3zmt1pvxhggw3zqpj0l443k6wqllv7aw347d0dy35fgr1jtkotnm5un5scdza6cycuug2c9e7b81h4vbt5hlniohcdf398rk44o6td89',
                flowInterfaceName: 'qwfzzstljp0wsx98ixyuvc49slhxrpy6fh56wjxewgum40gjztv0bw1r5rsq0t1x0ei8275jouot4vb4fbdufe1y06ij94gua1nkcnsr4rivc1kkz5ayfw95wng8ru5o8vb7un4q6egk87r6zz2ttl5c48i93hoi',
                flowInterfaceNamespace: 'cumsb3u58j1r7rirriswu0rcrseedasmdq2tgcpdpze0gw22xg5p4mn9oas8vla24jy92ox6x6oroqakp78yt8eq1e4gqox212sj33hhsdw9vthpiec0bnpn2nrjysjm0rkk0e3c5tvxj1yy1rvvaab4syapxnyn',
                status: 'SUCCESS',
                detail: 'Enim quam excepturi ipsum. Tempore rerum ea sit qui. Neque quas molestiae voluptate. Qui ducimus voluptate nobis necessitatibus laudantium magni perferendis voluptas.',
                example: 'h22qx7mn3b6wjrl8jm9u2p67yyx7a9wymums9yzzidz5x18bpbrscdy9a6kmnklrcnz0el3xc47xkssrvd68hm58uzs7q0cfslvwgxlhdo6qprjriccd5qckkeuztinmryuu2rq2l8h0fywo4h7u2ubbbhzhcnqf',
                startTimeAt: '2020-07-29 04:42:06',
                direction: 'INBOUND',
                errorCategory: '3ckja08z0kozaezmd9jvsxg79e9p401ww8our8ydiq43j5y22plubf35hups040lzjwr2o0vjs30qi96gr82sl9r4odkj2j1byifzv996l38wwz70pwgn4plpdoavyn6nleeuft8p0xmna7qzf229xut729aoz1q',
                errorCode: 'n2yzn4nnt142dkqs8d0ei0f2la7tpkp4qtjsqvcobcu5o56k4g',
                errorLabel: 596628,
                node: 1143695932,
                protocol: 'bhiske8yqm7bjprq6ssv',
                qualityOfService: 'ulbpn1ck1nzqr79wvsuy',
                receiverParty: 'm4gv43ig3bfhtq2xw30e9if5jtm61rseilowd99ippppg65oxo140d62ufv8uglpwk6q2xtxn84gby0sb6hlx8p7z393ahtsu4x133wnn45spvqijwz65u4243opmo2bivn9kn97fnsrhfg70bt0h0ot7l0wy35r',
                receiverComponent: 'lgut06xtve8if05seh2fkk6vi7m0i43x9nr2nos1hahs41t7p1i79kcrgc15jmb6jh2kq3oj63cd8mim4x9ukkyyr91ht8gfal1ffyd485wewf4abrb2lte0ldkh3ujy55rq7upjjjbi08ik47x6a8bjbagkp8v4',
                receiverInterface: 'rek1bdmq2dat6aqb657jnrralnp2jcd8y0kgctjc5kh4mi2icupyzs4fo28rajeeaf9x1yqgawugopjnec4qrjkajud0flqwv47qgbaytlfp50mou0qrywyl9ratqn6v27qf2an8vv46pgm9k4pn66xh0pebjji7',
                receiverInterfaceNamespace: 'i7bcy28dhl3658nsdpiqvjec6of2bi1vao53d0zc5glabpn1ajxqv9uarsfmlnve209k5m11wp5cqu25218w8yyztahkoa07potgod73x0ow0yf7b7v3rqtiypieuq9qroihq0blfahondrm6rwxjw3vopk9vtec',
                retries: 2125944847,
                size: 4943149085,
                timesFailed: 6604631100,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'y36mplhl8i9mhermsw58nferejz5g7x18kxkdri34zozuilahy',
                systemId: null,
                systemName: 'uubw7qremfetqw0g781i',
                scenario: 'ocp7i8it5hucssoct157xobarp8m1c1gsvhjzjadr0svl6uecbifskcqorx7',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:01:55',
                executionMonitoringStartAt: '2020-07-29 00:21:45',
                executionMonitoringEndAt: '2020-07-29 02:30:53',
                flowHash: 'twtamiqoes2uq8o88vjjnaf6h36ytbldy7mb8kj9',
                flowParty: 'l79ei36hmpi4d6wi2ryxathmbzy06vj04e3juggjp0v0zul93p7hh2kmnbl97q0f0kx75r9ca6z4a5gvnazs96mqp7ll7p1ydo7ceiytmm003uoc4tszdu3gg5zxtz6r42j1bf2m3g09v6j21xk27fucvbswyst4',
                flowComponent: 'lkgodxqn0dwglz3ue508xnart3y5bi1hc154rdg3mwhs314q15cztr1ma61b66zy780jp28xc13578m8ftbp9pntababuzt389u1d5scm9okh1dbgsbxzn2pdlx7162xp5s1xj32d9m1e2j120gob3r0ezcivrqj',
                flowInterfaceName: 't7qz1gx4yq7gabsicz0v97cndc76bgipj4l9cqb7x8qs1tr2ysvn4c4dyxa0x7v9vtn7xo5kkl09q303vjj5gf2debk9bv500j6e136ivvih2b3zi1cvay53mr9twm8fv27zd90n8vpn10duwbzyn3ptz3js0mj0',
                flowInterfaceNamespace: '56c5218b7rvqp8vrbfek6stp96ey7giyfuhpvfr6qf7zbn5t1xlpsi9mpi5ausx0ug5dxlapj8j2y63l2wupum2hnnotd938gvtgxa4jrs43qtk5czyobglow408vfqwydnco034es7547mf2bn4vuk0gzb1ojgy',
                status: 'ERROR',
                detail: 'Vel ea atque quis amet quia enim. Beatae iusto eius quae. Omnis et facere dicta odit totam debitis. Quia ut repellendus consequatur. In officiis voluptas assumenda unde similique sit optio consectetur in.',
                example: 'aujb58gtgkj5fee7q9mc5b9fgzzv2i1wtlduy86tz2148q7tndp6nhni7cnj414pz09t3k2aad3wzwxm35u63vnndlvf4yuc0ya75rdao5upc8hfnwibt67tyqtdlelgzo71mbose5fo7d66sswjcm4hguardqcz',
                startTimeAt: '2020-07-28 15:47:14',
                direction: 'OUTBOUND',
                errorCategory: 'u1z2bamsumwm83zqgng1sdw0dbrmyj94v6lusm2snyv0ow5p8km86eul1l3kwsx9nnu234q2gv1ti43d1vdwrls4ueh1apbwmfba3djuud9lexcbqcflbddxeyyebzk0v8wh8kueo3gm2k9rvh9o49fhdp4sal0x',
                errorCode: 'as309i9tutfbv34fje26n1xgdobffhtg5ggyznt0cnq6lz9ymn',
                errorLabel: 362076,
                node: 2063184571,
                protocol: 'a0lcrybc0pfl18efjbmy',
                qualityOfService: 'qffr82kpuxlfv6auj7mw',
                receiverParty: 'qkax79pkhe7ihw52zpxjpi6tkuo7he98l0c49j9q1f7tbr000n8lc1mobobes3cv281a0m7diuwfk6h7m4z2omxd6xkakppcx9d6cn6tdrde2w463m423mscapncn6laxn0v0akjeqwzxrq75bp287jr71meglxa',
                receiverComponent: 'kpvh0ngantlkb0mph6usos5i5bis18ac1u16oiwvlgum938z42h9zm94y8yucwwh81w6v5yf5who5ck6zxwblopoau0cdng8sk29hi87rpxezvum6kerp25xw7odyf9zo299a5vlwoop9bqcxnth7mbvhbflfj7o',
                receiverInterface: '2kuclcunfapxmu9e3tiur72hvl5ogvwwsvwq06tqmfh07nubdzrpbr7e7lesajv45pe121om7sqp9hdb2n4i34apq2it010ob1ensxkqyukaby3sbmq0sr5eypr5dv7dqu9hjmbclm2cdzmhnopnf5kz1vo5j8rw',
                receiverInterfaceNamespace: 'gcxnra02ym3dq8miruxpsv15sok6f2woknhl5vuhhnwzqd7ptr98wvjoco4o1y1htdqb4ce0542lwgtpn1hlwqctcpwa7mkrizsfco2heyfvevhwruild6v84qvomdtuhfv9zkcgopcebz5zao3kncyj07eflrrl',
                retries: 6091873157,
                size: 1525486052,
                timesFailed: 7966429959,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'eb1tdb7658cbpp1r4essio6m3wpwow7k52cuajgm5uvnn1lj56',
                
                systemName: 'cjs0b1wd6eb7gifn48l8',
                scenario: '764wix1j8s2e5aju3ivs3xjjytbylxq50nbwr471lusifbl7y8xg41kt9h7h',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:31:23',
                executionMonitoringStartAt: '2020-07-28 16:16:22',
                executionMonitoringEndAt: '2020-07-29 09:45:09',
                flowHash: 'dvlbfx6fx5y7uwj601ztt1kcbubm6sg6x4fg32ly',
                flowParty: 'gauf36292ak4pfunk1tyj4i5axtqeebtahke9sb43retcu67c24au92a0tyzrmnzaa3s0a6n16qnqlg5thkk4ypwlzrd9x4qk8mso6p4gml2bp76jj42r9ytpw6jnh4h0bphk36whp4i12tcv22dlg8ynwy54wax',
                flowComponent: 'iwcraeczy7d8ax3wlgx37t17d74jmy43jnbgdk2hlqwwcnja0sqmp1fy76vx5ghc41s0k8rhfb4gtbn2o3y5p4phbutqkr3eo7rupsks73fi94au0pvdr6el8qtx6mx58ow594opt41fk3sx4im0dckaj9jqp37y',
                flowInterfaceName: 'fpk3zhwr6502qaj7w7w6h73glcmj7rfh6plfiq0vqw7vh4h93ppg2erph70qde34wi9qmdxud6l8qjjsoidgsloqin5ax7pini7316z07ofahimadv9vqq3eojz7gibsdmehe1k46a9or62sl6p11vepwswnqxmv',
                flowInterfaceNamespace: 'ctmyxjvxmkvfhjfm16aotis3nb049ca4rsvgj93pbeoamu9g9yipigr96sapjth29c1vsa7ufc3cdhl13qcnl4dmy75oxsw1g1auwbv9uugwidc6yzjgic22kpl10j7ebajhgb3wubpwseiwv3c76xp4ob181pg5',
                status: 'SUCCESS',
                detail: 'Nulla non nam enim. Autem ipsam qui. Nisi perspiciatis aut quia praesentium. Pariatur saepe suscipit itaque quisquam beatae atque animi nesciunt. Dolores nulla enim eum et. Ut facilis consequatur.',
                example: 'pxsnbt06kicb026hbca1tb0scaxohekn64rf4hby6xlu3tr347l4ny58pme1i1psqv9ltie0kzzff8nvp2sd3q5y5h1631865am7p9p6bq0zs1me941exdibhjupl08hgtdkdvid5cuhw3bz77ign0utm4do4bz0',
                startTimeAt: '2020-07-29 07:51:59',
                direction: 'INBOUND',
                errorCategory: '7pieatw3r3yg3rfaiwo0g1vfs7ctw2rdqmjzz5741feovlmwpxlmdnxobllqwaxryns27zk7wc0tcydwd6kvi10j7uj8513mo2sbxpq4irhld9ncmzjv3qnkn8x170lfrzfa6oa0d0mfcizeopnvhzh3zxiiihxy',
                errorCode: 'obttusexkv3gox6nwf2brdsd7yc5yzyj195uzkjzvsvpify80l',
                errorLabel: 800713,
                node: 4119842541,
                protocol: 'j6khpn9ojll0s34818qe',
                qualityOfService: '2beijkfrcu7lopzs7e4w',
                receiverParty: '0uzykn6rcegyycomoq5qb5i81yf0ier7xhse1tzlqpejaw42eixcim3xnnpv73bv7t03h1r8vyueq4z2ho2c41w7ny5mprff7h4hfxymz73jnmfzs99t01ei7eepa6owidto2ldflcvf26q0dorjepxsuvavx1x7',
                receiverComponent: 'xyn41fsxpxaqasoxlcdyobvnxuxpbzfl50wjvsnrzvmtgyqixb0fr6dk1e3dkp15e3tkr4o70a3zebmtgib134d2s4eoh669uvad5l5iv98eyv29u6kweoaub1rj5pgrprr38pskp3fy4t1xtdf1ft6q3hapqpe7',
                receiverInterface: 'ep3qrmutye3i86aauloc31nw00tdsbs5e64a70r7w783pzu8hyuzmuxrn256rpsxljlpzj9w2i1l6wj1ml3omoq3gl4imxs19dcw4dl2k9ebq5o2ewukjr9s3ct38he3d629m0e9muuzfdrqnbwj8ncutspd6qne',
                receiverInterfaceNamespace: '589qp9skgoemygs9r13fva7omj2t0962zqiyblc7h1u184bxpxwuq6xxdtbwd3uykjunele0298ygkyah6zvb5cdmb50eadl68uplj6x9tktnjbzxuo5xb9346fq8a0zj6h7s0yv4x9o2jvlybiivo7voqrrpvvf',
                retries: 6209215809,
                size: 1518785099,
                timesFailed: 9301075837,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '0v9yqnniqs7ira6kyx5ua96ntl8c3gb1zux3wb9aa8fsmod8v5',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: null,
                scenario: 'ala1ezcnmtg0zmatmlz993e1la7wtqbp0y5reofsn2ahcfxjra5r64ab1ge9',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:36:50',
                executionMonitoringStartAt: '2020-07-29 13:55:32',
                executionMonitoringEndAt: '2020-07-29 14:53:53',
                flowHash: '81jgnducv2lvl5nnbs4b71fdnehdh1xvgys1xbr2',
                flowParty: 'r390xjowfugv2oi38o6c5zz8q1qaa232jcje2n85hg29vogiageo9ymnc19rrh4jyuto07npss2hkh7rly9vifvbem46na9skyg9a4y9juhtut3ldv0x9qddjj7ooym2hccmugx5204e2mj4ln5uibi1e0z5z1g1',
                flowComponent: 'm38rtnhdrlyw7w74r3bonydkaqfbxyewgs34hl80dktopk06q68it7c2pn8thuze1e96tpx84skir968j3c5ji2okus0s4xi0ni3ws7up810kpv2u9l255x335wx7az2gm9464i2lt926c215kjz12er98klb824',
                flowInterfaceName: 'xrxiyrj9jslcghgefqlvgl2ye1g1f7b35k93zaylutg5zgue1sh6q8lw7w3t4mrfho3erwbi7y32umxkdrvcsre9bcnkkv0eem6netwoys9lccshydsx7lrydc0bq5xpiry4fw8z0ze8yeyl3xhi7b57lnpuupmw',
                flowInterfaceNamespace: '7bkrwwuc9arpse031t9n84939yjvzqsr0o6izknswrpqofrqm68uwr6jmhf05v3hdtattyfdz3ye37a2ra8nt8i95fq062ux9hta9iryd0bg4aowuiao9uczxrwjstiisydr3qaldd0q1otbe0fq5a5jrq8inqqo',
                status: 'DELIVERING',
                detail: 'Itaque et facere est. Et eaque voluptas dolor fugiat et harum. Quibusdam facilis omnis reprehenderit facilis.',
                example: 'c5knvbf5f5eo67raawk9dpulpr2nfjlboo0oondhknbyg7jq8glv49k6jmx73j7081c4ff10jzsv0i04bqfox4zxlga8hf1j5d714yviblgufqjhp06jburaqrjcv301axzbalpb1wa4lszi7xyv8bpqquusg6jy',
                startTimeAt: '2020-07-29 03:26:10',
                direction: 'INBOUND',
                errorCategory: 't6y6u4354qyjyg79u8it36yliwwvtnkckynm4tgoqof6s32cfb4ljakvpvov2mrehtojum14dix8fkiu52vd8rn1q5azonw9nm61c3hkvhawv82rgbib4a6zgtztx69dda23bprc0owki27ba5j7wa7e5r39nrik',
                errorCode: 'a1aocaabdthioyf6y3byy7yo9fkkiax0hsbrbgqrt6hl2m6tab',
                errorLabel: 402563,
                node: 1166075478,
                protocol: 'dd1opykonf1uc9rsxhrw',
                qualityOfService: 'bon3b2kewvxf6k5e2sos',
                receiverParty: '7l13nidgq4k5ymma1k5qrorxujikzpltl5bq7t9i3od9ep5p0i3e5gyhk8rlnn8qspbw49jdrw90evi7e4gqqw4w2fthku0bta5no8dswgd0az88jwo2zqj3wci0ezo14ejesf80j5sjjee1827bkgkqkj8qgg6u',
                receiverComponent: 'ye7jy4ljrhj0lf0f7hhn79t9dboaqd7qq6tubbcpp24de1mf8qqe3qes2mpbcdqcckaxhnkrvg34nkoh6m94aq8r7pirfx0msejukcdylxtezfxjghn738l2xkdmg7wa13tbe1h2grjgcbmo62gtv1fvqfj8xwrt',
                receiverInterface: 'y4cj5usb5ifyii0rt8c5y3vz0g910rcb8na5mzismwivh6mkzyf1aywv2k7f3hh3hii2con0pjc49w70o4825v989esrd3lzcalikwvdbklthsdno7joem6p144gjv9rqkcl9ffg542d733u940ehprc595cnv9y',
                receiverInterfaceNamespace: 'ytuk260qz89fww3o2yg39t5q26ho846yst26ob96f5uer2t5yescu4d5027g7o2p483qwqx3s0on2iw7vryh02t881rb0zha16bkdcamrvzann0zjbpqauxb52y9w5bshe5erhs2xglaemky1p6yvm4t1zx17j8v',
                retries: 4592867475,
                size: 8900382826,
                timesFailed: 2361987785,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'xejn4qqucnsvdlf7quljkms0xlufw5fekg7raf5m24zzwbrn75',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                
                scenario: '96ef7aqbfeb18pxlpx0umr3x8gh1l3j9j5hkduxgmgqurgjexyqk03j9x2ys',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:45:13',
                executionMonitoringStartAt: '2020-07-28 15:54:43',
                executionMonitoringEndAt: '2020-07-29 06:17:34',
                flowHash: 'afivgdkjz9o7lg3k3qa3j9ypno2uz9gkqfzqp71c',
                flowParty: '3lm8uh04rhclv3g5oocp1rj7q6q5s74hx6hlk0ilv30e533n8fugxabhzo3k2bgihapr7pj47alz5rls1sig58m1yqqp4o0i533sqjy1y1hbdrnitkbfcbfqgyaf5zygdz335odkwjqniprfuc8f17j4q6uimvnr',
                flowComponent: 'sst2mmk2wz0comdyks968wqxoo6d50412riikhlncg66z5zw3urtiu0vydikipnlcyyfctgaq56p8byy96lg4ym3sgn4i51oc2aburpj7ch193ob2ptz0hxciao3xoqq8nq729u90o60qar88kdpfymrherqthfo',
                flowInterfaceName: 'dctrakjuw5ty9kvpkd5381umijoku7b447n9p6gituzhib2osacpebudxnje5fdyamxieuhsd54jj32qph459a2fkxsokl1rck4j9bj531j3h7v5tvr6xdbp588l1egd0otp69uy6dv9fyw6iyzvtxih0t8doav0',
                flowInterfaceNamespace: 'eqd2mfweetrz9niyzjbcde3g97ajj6wvv9teiiwe2kwqukl0y0qb4qj3gjmcwaagkmckeyu66ljpsgvt8xkwarpfgo32totfk0b29pyqx0boe0pix71m8zhi35nsoeg2758qgpiru6jigppbrad3xqzd7diet43j',
                status: 'SUCCESS',
                detail: 'Aliquid repellat maiores. Laborum at soluta. Alias totam quod eos in ipsum. Est aut nisi molestiae ipsam totam occaecati. Unde ducimus corporis eum blanditiis. Ratione ut sed est quo aut recusandae.',
                example: '6t6m4ya7snvq5nacbi0xjhj6a2ab5p4w4av9efzzih25qqtd0k3plohcsafx8628gm7t80js1xpmtiwkfihjb0kx5evcs1zrx4iog5pt295vv2ag1cvmqm2p2f9e09l5wbm6sf17ek82yonum6ss4prks8fdq3gf',
                startTimeAt: '2020-07-29 10:20:51',
                direction: 'INBOUND',
                errorCategory: 'imitvndrouyipogfjly3hsorx5kbp9hifl0pnd83fdyq5idgxpmqt9f8vweoln9qiyt390hmdv85ezjs0c8ntr2ti0dnyncldz2f5qsbo17dbc6gxiqrirh3b20kduj90679a61jiuzef1kb2aob1pkga0z5zl5f',
                errorCode: 'imv9uq64nquvpkakwn38g1wnv3m9zufh0b67ox9n1cn1gwju76',
                errorLabel: 562346,
                node: 4652608179,
                protocol: 'u9qel5z6flc1lalt2ht0',
                qualityOfService: '7og3xrfm72oro7hzd4j6',
                receiverParty: 'shohbof1qnto9lsr56ln11ktztxemhxmytqq1osj6zha2zu5trc1w1w3t1oy8dx1b63dbn6vh8n0evwa5omwgogxl5zqy5hqly5fh5e1rzpihhdz3a8tr7lm9kteqvxf0q0vrcf9dujje8jwkzzr0btkwix9pazj',
                receiverComponent: 'zf2jp4q6t5vmqkfsb9sc605yurddkud34fdm0cg3bltgzmb82tqq8to98say9coeydkrjxqit339yvu2umfofcxsiavnphsecuz1ain9m75ibrahyc16oviwxd595aimkik47cqel02qwcao71yezgn20jsco7ad',
                receiverInterface: '3f5lryc5nsc96ldcmtvbg1dt7b2p7hxkk3jfby3gbd4v6df4rb4xo0uj92w6k9a91j7c3c44hkmyx29jyl9dsrl86ih8f8ynaxc4vja9czi0r552ka58zdalcf367wy22qjph058vy3qbnu5edl4c3xqb10tjjm3',
                receiverInterfaceNamespace: 'fg2esbo6rjhtyg62saxm813a01d2v9ghx1ukz3oln5bfmu3sxa7zf1cbxx68y4qt6vdimtfj7khzpok7n3j70j5rdjs7j57yducuapiiud92qrqkzchd2ggfzg8qcl6qy05j6bpnvj5gaem69vcbwrdtix5eitnz',
                retries: 9740188481,
                size: 7839993870,
                timesFailed: 5901474861,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'uwaqmacd3z1uldwruoug0f8xunobfggr75dmjrdc39jx58f9h0',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '2alcns08otklfvcvsopa',
                scenario: '5fqn89hbertr5yu5xhmwjoboaaanqv39emzkzlonp06fn2goaq4eqy9icose',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:58:53',
                executionMonitoringStartAt: '2020-07-28 18:57:36',
                executionMonitoringEndAt: '2020-07-28 21:57:21',
                flowHash: 'nbvvenw89qucvbef0vorgy2zvgdaake7hvps5vul',
                flowParty: 'yi1kl6gchlcvwezyy9dsxjw73qdhrd35kxp1bqox28coku4bol0yj6do8ey9cbb7u45odj7k2wqgaryy3bzfe2rjhk2ll5e3llj8w6bw1nv6rslm7iut9fj2107hqq9o3nc5oinm08y7jee3imm2n0zurufkkgd9',
                flowComponent: 'u47x2dt0soe78ble1d08e8th4p7s5rbo3orp92nkzog6hsmspn0hrkiivgsbzpfn2h11q7nps9jzf8rtql69ej76av44ybknrwaf48u84ep3j2elaoxo4e8ekjhmo6byoxh10s687yimanfkrikws6ioqw0ynut8',
                flowInterfaceName: 'm7xu9u5vq0s88gr4tb3cl3fdiiwfwllff9220qmq8bhct3lrhlr5uuuhkoylr75rr0s57ofqrz56aiisnuba0so8zx1s2iyururxiu8tejjn50mhbsxruox0r3ms4erzr08k8b866c5si97rh83rwwfx0ozon4a7',
                flowInterfaceNamespace: '1626jd872r23flyvwhnmc7gnewbidwxnhqykid71ppc1ell4d85hxtpv6nqb9wllr8vgedi7lxmmyx6k0ohqgafpg1yx1xd1lwcc2celua460emaly1r7caxncjr7r6ofwl6oogwxdi617y6tknini8rgjys1yaa',
                status: 'WAITING',
                detail: 'Voluptatem voluptate alias accusamus cum. Rerum veniam voluptas est itaque aut. Harum et vero ea modi.',
                example: 'knrgoxp9os95v1hu3wlnvs2in05lyccohh068obcv2d0lb0qdu6tlxw7gb00kggrq4kmh8p9g8jvvsg6hq1cblvkfrja7308etvmxyjewlwfgxut288889oc6xyx7s05j7usnhgz4edozwj0n5aay8akeyuv06gr',
                startTimeAt: '2020-07-28 22:07:47',
                direction: 'INBOUND',
                errorCategory: '0r05bwvkcdgp3vihzgv7qp240q3g06rtoe23azs08lbi9unvwjv6wl860pqzs4pw56967u3x0u7x2ie0c818m18rxrur9v1o3akbvjwvfpxjc3dnditvihpuxi7db17x6b9e22nn7q17o2nedphdy2pb4syc20sj',
                errorCode: 'wat85aylcthnjrr4tf4vq3519w4uq1tdo0rggm6f5zoqg1ikd0',
                errorLabel: 287693,
                node: 1507286875,
                protocol: 'cb38m9wlx822630kv03a',
                qualityOfService: 'b432n0iz76lp1yivxr4w',
                receiverParty: 'qm7yh5iyctd6rkc1rvlocv6jf1pn0jzlay1urhz7tvdemmall8vm88cyzewgl7twfpsz3fuworzhzluqncea6qfai8ofuha4wmi91g0ja36vxw8cyuqkuxex69970cwwr9qtk3kl9e086zrlw0ffc2p7uv62ne7d',
                receiverComponent: 'wwpurbgimf78he5xzralsmkjusk4s7trr7fh33m9g1ykrvlexa98fu5mzr369fv321z7jecryuqvo2zse0wrx4w39yuqppzqk7sjmqf6nyopziamq39h0v6pb4wd0lh19cirestxy52n9w8w4lcq9kgor6eah4ok',
                receiverInterface: 'ytojri4oi1buaib5m6fdot5txc2grxvt4iv2zedfm4tbuy7v1hvipecnc72mi71mcngpomybaoftrxkzwp6sgo3pvz8i1t7vyhn7v4i4e9j2649kay7gbpuyfzczmbcvowq88lqwrgkjc55p3jrr1lh4xoh7lxsf',
                receiverInterfaceNamespace: '9900zl0q4w66czc6sitxpsdj2cvjph0h59q1gn6jcenwvkkzhwy2exueu2xld1bp904xws4efefcl32l1ar7ipdiz8eqw15nh2hbpv4lxoovzmmpohalapz6bumrzwpwc3ch4it3hah1c5crlr5oqi1k19hioqc8',
                retries: 3005998381,
                size: 1370414397,
                timesFailed: 6315088604,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '7fknwvxi2v1lmsfm14d4b768ba3w9jmssn6wp9u1yfdpj9ioq5',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'g3h3xax9jt9limvo1q2e',
                scenario: '9aq2g3qvpu7fwzhcjdoftplvfbn298wghqvao11khbtoihdvr6ibml98vlad',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:19:25',
                executionMonitoringStartAt: '2020-07-29 08:12:14',
                executionMonitoringEndAt: '2020-07-29 06:48:50',
                flowHash: 'itrubu45f8ghrbxp8eeizb1gi181a1kov89bccc7',
                flowParty: '7blxivurkypwv1so65mgudynv0wgpcflol4m1uengdx35rcclpwl3wdw2ic6u5gh62x1s8me2z8k82tqkq9xl0z5y2hlpqe6h9aabd9a3a6rlxtz2tbah1lqjwue3pkk5am5sb1qd1xayc18d0bksxuhrj7afsi3',
                flowComponent: 'qhvzpps5cezsk2165wf5f66arltdz4fs60y9nr8inqou3in5cm0ve8odb8b7ajs3c4hylm2nncick50b4zq2ujv10nkovzge7c31otab96k46eb0hmnpiiuuzbcz9c4dh40vh1of9xcvqh21uyviea1jid7xy9ci',
                flowInterfaceName: 't9aprxor8d05sjaj0gs0jtiv1poasoaugn1oy9j26r66i6baa6t3ue5rrr3wu2unyoj7j7l5g4x2vkk8v6vlgmzortip3nxi1hisqt2bnu8lovyfzaowfjm4naxf8qx5ku5k30gsskaycbv9xvslnqf2pu9ylwrk',
                flowInterfaceNamespace: 'cnkuygiz6a2hhf4zbydhai5d2zogbn9gr025gpg7pwyej7nv64a5fdg3r38oyhtkst5nnhavtonr8sunzi2st856ubmx2el3fsvpjmwqe1d9an3q48im1gx0nsgxy0f5iuiv1d7l9n4l7tm87argi17zptlvmg7t',
                status: 'ERROR',
                detail: 'Sapiente eos repudiandae et. Perferendis a omnis est exercitationem. Delectus quibusdam quidem non et omnis. Qui deleniti veniam nihil voluptate officia aperiam quaerat.',
                example: 'bnwjf0wmehxt7d15mplevzhumc02s7ounae5obkuvoh04cuzlbqir6bq3x5pznb7lzz8fxfcuu729ct2fr3bkhstcgjrbn3s00kcas08jbgfcutvf1ctllhabvz17fi7kpj7v3oj5vaenww4ggw93zq329q16655',
                startTimeAt: '2020-07-29 11:14:49',
                direction: 'INBOUND',
                errorCategory: 'tiwqy2rtip6zfpwkxuab6b8vrovmsva2tycfpay5ve2dnlfubaqe0fkrwkv75swycgt2zvmop3erux8x3k1479gcu3ott9dai6dugt04gwv8otjuzarzpu1m6im7gwjzey8mdp0bfj2x8kw6gtjmc3y97cf75k0r',
                errorCode: 'bm53r8gefvobwmsiwbg86ywa3e2jmq1oj0mxm2666evptwpap5',
                errorLabel: 876202,
                node: 2724021903,
                protocol: 'qtjbtdpojjt46dm4kjfs',
                qualityOfService: 'rwjzgsno25p1ialx084z',
                receiverParty: 'gitt8ldi2woth1v9yz450v8noh03j98m50em2w80jpgyr8wuseqjuqwjhqvdkxajgounyr8g8amgr154c0k9bd6fwgmt6k8mv8ljwtdb0961whpms48mn8x3z9cwipq1uf2wrc1skrnhdia6lrrfwj5dn0fdqezi',
                receiverComponent: 'sf4hm9c0x06fqpfvklvambdwxguv4cvxd3ue2qcd4d3t0tp0gxcfck0ld1inf0rsyamshjrl9sc54pcmcz7so3d210j0smdnp0ltrk82bq5ggbqje05xelx8w7uka45z7gncv5lkgik42hlljam1xrmtg0e1e25z',
                receiverInterface: '9dhsri9p1uphjdpy4bgu76z67cfqn84bs28cl099exratrai2cnpl9831wzccbp2qfysmcppneda9qspwbvdxpznvksutm4s07ull8e7yda6lys9o9on0j908jm8obgktbnhhlhne7y1knzwgrkq75tcnz7hv2iu',
                receiverInterfaceNamespace: 'e44vg80z64o8f9ypprlblv8bc46anghn1d9c97uib3ednfn80pknq1qun9k516xouvf7vdnky2ouc1ajjamz66mwh9s4kkv6f7hjhpnruw4li8fs543so7hw341cvufhkgj62tnnx3amehky2wy1itn5m95l3dny',
                retries: 6643181409,
                size: 9660383421,
                timesFailed: 6253179059,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '9x9jimpv2yuwsvka1tp7bjhrbztdhru9z9misyvus0vrf6689i',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'c4xfe9bzrgcpzzw59sde',
                scenario: 'ydohdyw471ourczq6lvelptvqqr39pnavfct28nhnw9wni8g5aay3qoba6gv',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: null,
                executionExecutedAt: '2020-07-29 11:25:06',
                executionMonitoringStartAt: '2020-07-29 02:27:08',
                executionMonitoringEndAt: '2020-07-29 07:10:56',
                flowHash: 'shjtwv5rvv5fowmh9syx3wswdp34ycryhuujpcmo',
                flowParty: '3qqdiuhxxzk9iuk3wokzlvq2eb0k8ykuwqvvmp6n380s0yhjvfl99k533c33nsw4dsmlculxusyup2b70n6fczynmfkh0ahd8v9o03t3yobk0v1qhxxxs6dw0tkjezpvzg5bswlqumplju7o9ialptnybr7cn1yq',
                flowComponent: 'p8fvw2m7sxomtt4fhau7cjtxqhj4i6zj18nx1e0vjj9gl73s7lnixge394y52ytcup8yc4vw6oeh2llavxjs5fcz9fp7bssabzzgdta80ou51wlwmjqzoc5kj0g30cu8b7otz6k0tz933vexjc6w030wu5zhyg7h',
                flowInterfaceName: 'ros5wedn419ex6t243kv2eyrbe5dzmb96ng3d30ywsqm4cbdho6a3mqiz2a86ezm021gfawqy03rj9xlunmkk1yiz88w2qelmhkxjkpmz4kot2eerme6eh8rqy7jmtwot3ny3dq74dzk84iba99vlk2jhqgg8app',
                flowInterfaceNamespace: 'nb41klj5q7d609p6iogyldblfvfv0ltjhrl9u4y5gfa5xvza41flbw6bo427yk8rv7uzpldoditjzcpx4k98i83w2ilfqh6vv0gz4v42ayys92nf3upz4gnkdz6pfnfi7crdadyquqkj3s7vzccj4giiq2re0j3p',
                status: 'CANCELLED',
                detail: 'Necessitatibus porro ut aliquid pariatur. Deserunt quia molestiae qui id et labore. Cupiditate qui voluptatem totam quam sed. Ratione rem totam sunt sed doloremque nulla eaque incidunt doloribus. Nemo similique autem omnis aut voluptas exercitationem distinctio dicta.',
                example: '7y2yuuppocdqebvzbd7sfygj8t51npci46r1ajdd491ye05fbvam7inqxuy7blpq6tqye3jqbukymi917ply535dvs5pu74ezlvrves5m1mrwh4sp2hllqycwclh3grvpdhal4ampsoe6y25blltlab57p7kiohv',
                startTimeAt: '2020-07-29 01:17:51',
                direction: 'OUTBOUND',
                errorCategory: 'mriy4ywqpw8eaxnme6s407u81x3r6qtpesdzisrjtusb2ovjjonk44pjv07h5qq514fi8ohi90inz5hho204qihcrbja5k2egpdfun17bwuglwioiiifw0hkr1lq7fxapa4paun4fahtayvy0slszckv7bey9f1m',
                errorCode: 'n8eplmrs4b13hnnf1w7i94wzm24b6654n94oera1er6rz73v6s',
                errorLabel: 648160,
                node: 8680008977,
                protocol: 'b8yxvjkd486xrwwtms6j',
                qualityOfService: 'vrbrjbh1wq0p423i9jeo',
                receiverParty: 'oshcka8uadpiw30aoc85pxdc6n6pfiwlrosxlorf5cuq7nxgz9nk7kgz8kfxnahdj53ol73tx4g2x85fwlcuebbcsin6snjvllv910hg94i2ywo2jw62y0ewjhrlzrgp27uzkst3madyo38pd73brf5mpuqyggmd',
                receiverComponent: 'bpf17e9nvj7yo9uzyxkuvzoo8bxnwuidghifr7pmn82514pf75680tym6wtdr9crlzkuvvqg4e72w5qqsbs740xck8qr5zm206ikl88kdjrz5mxmdc07rhtg5uohy7kx4o8pjrbdz5bhsnry554ytur4rmsim338',
                receiverInterface: 'txjjl811atdgudziq6sgew0yd6ty4az6ecphxjger2i89b62x8cfvlk7v7o9vms6zpv3lv86xvlz86rt6tlwl6kh2pgv45fm3fu6703pc4nbz4j0pttpgn13qrg09yab6hw0jhxwz3cn0hn8hkl547xavb5skteh',
                receiverInterfaceNamespace: 'lq5kza28u0irsdzcs4ytxw6or20u7feeda71qojtn05ms7log3vl0rtw4ehkz2nicvt9t0jm5tur7vxumca68jiy7mwhkzqeaykb0z3nzgk7ai8ssit8i6ub5fjv45g52n1sju1cke9hgvj1hray4m45920wnoyo',
                retries: 4071589304,
                size: 7543792349,
                timesFailed: 2273228296,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'eh0nz0k929jysyb9fp3wqpdr3vaci479rdoh9vjkuxghspkqma',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '1fm058tmv9x5pwhco3v2',
                scenario: 'zgk4udjldntzp0r8isvhecc6jrd19gbneov9ipcof8ovg3e81y9p5rdhhgdy',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                
                executionExecutedAt: '2020-07-29 07:40:53',
                executionMonitoringStartAt: '2020-07-29 07:16:01',
                executionMonitoringEndAt: '2020-07-29 06:46:24',
                flowHash: 'l0q0aktae8x4ewil4dtesrylnhbncao0pp8321xc',
                flowParty: 'b92i9yvyoa0b7tvnfe7lmsucs5zqvdvs3g5eb03pfora5xqfax3uvez9s4fzbubzz77vk2yoz2nxty40ma36ysx4sh7s35cfj682ymtpp7gyh4pvcdc3rx6ox2w82b1jf6tr6tnaq4vbegp8dmdpsgsul5asbpoe',
                flowComponent: 'veyfigka1c6y4hic86ha5g722iye2cgr3x0q3qv2s23t7pyf4ere238yem09k1r7u0t5pmc9gvnbhylj5xahcbu49rchkxkeugujs5t6dv9700mul0epllvcyuwyhcf0mv4wltiwcf2cv2fzs19pivur0aeniqp5',
                flowInterfaceName: '5mdv3ukoxz7r8s8o30d8sotia7ol938swwyr3efbc5hvhlmj3t4o7jpzbr4w52nforu772lcclkelg454xqmmpuv1fwk56axunt57d3l6i4ufxqk31in4l85r4yoj3gt07hfhv7189a5hf7kad0mztt9ltusy39x',
                flowInterfaceNamespace: 'jwkxp4smjtws2r8wshqz0q1ros8z4etfv56e3pakd7suwet19t7xo69jx4rkdhmplpuceytaccjy04fhn6d5uxe34mg0j1f04fhpc2rdmj0rnmddrnux3wrkod4h7var0ghxvybu57djznohx5t0go55lpban1e0',
                status: 'ERROR',
                detail: 'Porro delectus voluptatem. Quo rerum id quia. Quibusdam commodi ad voluptatibus suscipit asperiores est. Laudantium sit laborum. Fugiat vitae consequatur incidunt culpa magni mollitia. Quia suscipit illum optio praesentium voluptate.',
                example: '5owm3vwolamwil0exjieg4vrpor7kpd9scb08prdhqhhbt320kvy8oawk4r3xsilichr3kc80nw0tna6p1tj92pevlepu3g67d9vj824pm8ryc9kkha1953dskw5qjlq5skp41y898kkryis1693atrqwhjaoqvh',
                startTimeAt: '2020-07-29 11:32:43',
                direction: 'OUTBOUND',
                errorCategory: 'a1h8hcm09uwaw33cor7zwnqnfx9gjudzg4t0yyb90cx2g6b2tocghno7mv78rodb9qiz08hzqyfkr1nyu0jitst5wvoyan9dvn27cy0baajv6mlaxopiirh9llgrkkkeluzp43ym02hlp21u0zh5cza7kijqjqrb',
                errorCode: 'zp1339hwjsq0j8ze4ikkuq2vtn9jq0n8jyvifqcbmh732qcpcu',
                errorLabel: 278897,
                node: 9087188073,
                protocol: 'bq4gjhryfy7zkl2hu7bd',
                qualityOfService: '2ek37aixzjbo2cy1gcsk',
                receiverParty: 'xul0koekcof1ss861o0rlefrg8a7cwpgwneqxvpp9oo9tw1mnmttc8jsyfzbr8efw6jlxhutpbi2boamlc6s2zk2t8jdu85nq5vf5wlqalt3clvo9oirow3nryvchi4s5kk46qmxm042xzg2kxf7j8d0k96upii8',
                receiverComponent: 'g4fz54o6lrlkvzahw7m6gfaqblqny4mz4vuq0n77qfqpu8393u27gbr182ayofb1uerroyoz5yonjwlhk9ww6c07tl12kinw7cnr7xk6bwawftf5afbepi8dlq7h2tv2d1f39qzbwu311thmgo3a8k204aw4r8qt',
                receiverInterface: 'gnzydd2cfdf1siizjtpvj4rrr8mn4rdjbyfszbkk1xpj57f6qtl19t826kqqvqguuwx3civqm0a02nllk9vlwjvfiwi7632hu6kg4mz4ryslfllbdx21exzdnzu3xcwfa9ee6kkganjavo1w4fmgw462urg821c4',
                receiverInterfaceNamespace: '18oa73biczt4egut0wmcglqslmgke10eaazw2sel9qv1g26dv9c8my18nfkcd1pwjxy67w5e3utwqreym4k83v0zr1rx4fmjg6onwxwc8fcrrq8cc84iyzmxa49gf69jmfhngzj5k2ujwc4t8wz5f13cn9vby932',
                retries: 6960498739,
                size: 9531075555,
                timesFailed: 2383643791,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'qikxkpoxgphbp8dnnjscicyoxicc85n9da0ra3umr95mrht99o',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'p26cpcawpz3reyoxon6s',
                scenario: 'nlrkzta4u1cx61z1ynt9zeuej576syifayxe4uf3popsitnics9d2zfx8db5',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 22:18:58',
                executionMonitoringEndAt: '2020-07-28 21:16:58',
                flowHash: '53bfl1vjum3ccdpfpocya2ollq3js8k953kcedz9',
                flowParty: 's8hrwe6jvmwbpwnsbe0im70n1m0q08e8b757jeswenzq2p4w3q3cj7qvrgwyx45oub01edp0kyonwxttqyd6euzi22px0xv5717e6rq9fr16ughlinxp2emew54cp0vugiz53fk2jdwaatmdl3qksbtb8o6bo8l1',
                flowComponent: 'lpyp5xp4n47cut48uzw3qonz4hjm2qdssdygpiy8jvcf2wi58oysze0dtfdctgnb1zaemgdfweoqw32tlgetp9p5vb9njpa2ylenkxclmmq4lef37bhrgfbvvn1lepd5chaekciq8tmhx6qw7wfmwqs7hzeh74yv',
                flowInterfaceName: 'momhl30066mgjjm0fegxwk28ibe3735ddodskjpsy1nt889f9z4onjz6emsxitij23t2k3mr1j9d0ozqjqwxq2oufbfovjrjifi37vs89jnwkb66x89sbrs21i256o3r4ju7j0zgya2vvjnoi12sv7947fenoblz',
                flowInterfaceNamespace: 'ez9y32160acjm8yyh8sudslyb6tdr54cqc9syszpj928yhnn4e1f3d9rkir0tkwwzr6dnd33xrcx7ddmcf4d73dsl6wdvpdko3towppnfpoo24xodvona2nhbkr2843robmmstqhfqa1ar1x6qgx1kduhzu3qwxq',
                status: 'WAITING',
                detail: 'Rem mollitia optio molestias ut nemo accusamus non alias. Rem eos est repellendus atque alias. Neque odit consequatur provident incidunt aut architecto. Fugiat vitae quo consequuntur voluptas explicabo consectetur ut rem voluptatem. Quos aut quo in velit ducimus accusantium.',
                example: '7dq30axlqzuicepwyv9x902yrylut1b7lc3n9a88yv3mququwixnl0xy4jbsf5koa9gkufl8blpm1joel2vtqsderusg8urbbu8j895jcupykq3yyd8p8gnfig9tgthoqgcb28y4hof1crtzvvpil7obb36yti5z',
                startTimeAt: '2020-07-29 04:34:54',
                direction: 'OUTBOUND',
                errorCategory: 'ywhq9amuw4oxhsg65eazhwdotdrybugqzd4lu48p947wh2u9mgeib4ilwb5tj15fgy80mhv4ln7l3mlnf6b133sa58uv9qc32tuc4ty554rqq3wij6seow05dqwu9zraajqvh1zx5eeeuma7cwnf7krs16m74449',
                errorCode: 'h3ogcyjiif72i10k4bh7di3opl89wrs434go7inyfcjokito7v',
                errorLabel: 575407,
                node: 8841332001,
                protocol: '47ygrnnbyzv4lsnn4yda',
                qualityOfService: 'bk1cofm95813pm7w4157',
                receiverParty: 'ygvz8wfo2sugh4pj087gwvvk1gy3e2jkpr2dganfckkaozt4xwgjlu1elusfl7lbp1neqx5cn0mfxj7uvapa6eijm0lfw8kwwnttb5j8mmbijy174tu21ouvp637q8dldcx81j4y1pr39vdh9t4x4rxi5pmjmu3c',
                receiverComponent: 'm7erxgqhuya9w3xe47tg230nsdg5r8piarqchy6k4sahk4zva0ycxstq4sgomslz90zpe1de8kd314l3u92p7z2rhi6381ps5xtozf0nzs87dhtuvnassoynid3948b29em5ardauhiwy33j4ppkuk5spt375787',
                receiverInterface: '1ylaplovgzlix0phccweian6bdbj3k3kobej96ehmr5sm99kx4c6ztuk6omvhets3922w01oc4jpvdo02sal56gcm3yigb5yuz5193pdxjvecwmlc1600gssezodsu7juv9kgtlsr1m25u5ic44ytj82n2fytw2d',
                receiverInterfaceNamespace: 'lm1u3qhokgcl133ccreq2fqfftcqd2uqzu6a7550o8pqgmnqqz45tsawh6pelhn3gti1yhu0gzpdx42vny471q9fu2xhy3g941cklzkqgzlfcweuytq1eprjs96251f8vc6r0319bfghrh13j4xeldjcqe3wkbz5',
                retries: 1469934106,
                size: 8652252247,
                timesFailed: 4200904853,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'gzr0qqwpta27y966jnpmlm9oec23oxc42ifx75jy7vt0978b65',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'fniw8w6xbsvkzoilvxlq',
                scenario: 'mt6vucuuh1rfnqcl1b0o173bzvj6micj4ihoqwmz3bwytbjrpro42o3dvc46',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 01:31:56',
                executionMonitoringEndAt: '2020-07-28 20:10:01',
                flowHash: 'z5ewq30eu13r5br5ntj53tivb7yymgv8cjryeazd',
                flowParty: '432wbznye3c1wungpcdvsvy9fs1xx21j9wbzcxp5b198vph69m0elyn876b1wcoxw1z5sf1pfugjw52yuup1l3w334m9yzxasq7yfjt1ebnwbt04hciss3cswcem9o2dr9nfavb4bl8xs5dpjtquh81ric3ol7fh',
                flowComponent: '49fjq7t4gqs4jhpdecqyp23803w9v1a3taw1t47o2zctw5p06ry3e55njl4lxud90h4sns4oo1d81uxggf25yarv3o4dtgm3bd83jizb1yfl7yri5g7aa3qt82988bpen9wdpa3b69uzdyrorsu1i4dbn2l7firw',
                flowInterfaceName: 'f9hcyooylstaezzdskmv0j0ajgfhmiu2k3e82qbyomkxcfts6jn0hwhyq0uae8fkrekunpjnpydnz5mer6mzyuvjyyzy40ctbbogiu17mleje6717extbs59dhsdr8m99jpfgou1xuwy1m8y1vqsvtau3x6l2o4s',
                flowInterfaceNamespace: 'is5jclplwadt484zereqq09cq893dwqcanmzgukya2u595hmhgxdrqx9ygkzapiujcf1zw2qgwq1aq1f9vz9y8av0ovp0drmx5fxxzpur5oy75syttzrpe1yic4yv8ykd300kk32pqhsn93de5v8ex1lrvz55wa0',
                status: 'CANCELLED',
                detail: 'Et expedita nemo aut consequatur et ad. Illum est deleniti sunt aut id. Voluptas ea tempora minus rerum cupiditate dolores optio voluptas qui.',
                example: 'ao0kblmudqvtxwoqugfgkkgpl5656sn0wizxrqjjmw0o8y0u4y7tfyefxsb9hkws2bg6gunx1r9dyn4mc8w1qcr21tn7d0fdclrpuinr1cg36bujwhefhx7413rony0t5yrq23l7flbrf2njcxprowak33vg3v0s',
                startTimeAt: '2020-07-29 11:53:10',
                direction: 'INBOUND',
                errorCategory: 'lk8cqxxhmx4lsmimrmfr6llszgv12smqxdborb1htyef46qfq4f7nlapu6ecg4g429tvcdl37ghwm9oe2swwp0pzz0xb6px5tosy16vtwgw2yvvga56djeqwqefhvpzci4rxfdp91xesoc1zu7vz39xreuqe77vl',
                errorCode: 'zl8hzpenouebmt1oz1kz9alzdgl1f1fk09bk83eoq880miqzw9',
                errorLabel: 378991,
                node: 8152204770,
                protocol: 'kiso2ia7psbi1ydo85xa',
                qualityOfService: 'pvx4jruwdpfrg7v3pkis',
                receiverParty: 'sxxr9ul13o6nzjolvpksnwe8jbawhsgrpbjtcy8xr0es5o49i7hkke8kea8xf5gutcw9qas2ngtw3zf2ce362qjci8mbwzz1bnzobmwoyirgd2hgkhn4ugnlfhfz23vy47wbsc43p27i3p4dlt820lku6uffsf69',
                receiverComponent: 'l0unwswqhbit0e6ouoe6ttxno1c2bog3cdlschtii0srp09ew20zae0t1uu3zxf3fxhi9ymxam3anq6dwugx5gqn4jz8w2po3kbn29amc3jxmogaoleyyhod8ex9g6qw1e482vbxr6wh8q4irk1kzwkwu4ljwbvq',
                receiverInterface: 'wqdwzm9rgutppoy4jke53wo48kay333qkz89djp0ceda686p42q8hbqf4ht9dn2cmnc7cwxntwfffpgya75ik3rurpa20vr3ofzxmxvby66p42sybk7xi3lboi5vsftwwhel6y2d1imry5c626wry7bu4k16bxpl',
                receiverInterfaceNamespace: 'ofx5zdvydet9jqdnv3wlqpfihnhokomzsyclzb75gsvnw8i0lxr5y5phxjuxbvlilssfucw83s2fd0jf5mlayu7hrvhn0jnkenzto52mco6l1rvpduzlkozl91bpcpnuhz7hlgqqxhyytjk0plhb05vwtgsitcwi',
                retries: 4197322825,
                size: 4160785680,
                timesFailed: 3325256621,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'nbue8ytfsxuvomoffckq32tw3mmsm6un71zhu0810p3o1jvmrg',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '704n4csciw5nyg12upu4',
                scenario: '0y1jt50egq3nej776g9il7h23xk3biz8aqje89m9anfwq1n06c9dzghurs3w',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:44:29',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 10:09:39',
                flowHash: 'wits3z2xzyry5hodgmiv3y7z3huc06wtsh1vmtu2',
                flowParty: 'kx0pbyc8uhpimgfl4h7g01f14o0m7tlfrg6ptt808xg5urxwjt275k0kc925ojntlr7nw24q76k3c9bnsal21je8csqtzi7bw54fltiihto8htg2rht6q59gisqekp1ls17lt1s6rfzkgzl888imi7tokw3cgvpm',
                flowComponent: 'ry4q1s6czv1alddjz570ipquufa6pulnpkkqkc3fb581duk5m6ihwds0nc891h63ybqd0ioeoqj3myyqg2zon785x46eozea6mpb1q4p62c10tydgesgkr8zmfyippadsjrnacn00smrnfvckxhgrxna7ufqykcx',
                flowInterfaceName: 'oqtaye65n3m5szey8cgblw1fp0x0x2ng40ov2fmlabp4byi9dnc0sv9u2ugpmn55i60ql4dog237fzjilapqcwtm3l2if5vl723nk49igj5aiqjkbg5gn9mz6rvc8x83gs0sdp58copoxcz4a13tpzbbgca2lrqm',
                flowInterfaceNamespace: '55jfdbxp4uf29evre0rcyrnr6doz1qgizp2h3t893c80y703f84fzy0j2d6sj9mjpjza22ewa7c75bg1jie6691uezcb2ww9ra4t4v1pfhc5ljplbkyogtdhe3m7obcvfuheyrmxzo86wys0dnsrmq0zl8eifsi0',
                status: 'ERROR',
                detail: 'Laborum vitae qui qui. Et dolores sapiente ut nihil doloribus esse similique veniam. Itaque vitae laudantium necessitatibus. Ut odit tempora eius minima temporibus rerum iste et ut.',
                example: 'adwbizdoxxtjn5djogwl0341lwkfapwszzqgicg5cdc9sr1ohdcvzfocfy3jn2lhblx6jwo7rvokspi0u8desd15kk5bxzry84m49j22zc8zc2fv2sbk24scgpz8corq0ymqbaokabgvuy0fg4ft3g6t7dyhdvd2',
                startTimeAt: '2020-07-29 04:19:09',
                direction: 'INBOUND',
                errorCategory: '49h3gr4lhgd3tsra3ac6m18b49imes7s7p816msolmfy4vsif5rlaf0clcia6dufskg4hcya6ph96c1j01iu3x744uagb90jpggqg0uuogvp7785qjeed9xqgogkgl9asm7ewotcxx2e56woy968g798ams9db8s',
                errorCode: 'p38yol9h5ywl7u3y0biahbs2fsvh1yrfbxi0z9zivqjkmrzxfv',
                errorLabel: 922384,
                node: 8703824752,
                protocol: 'htghhwp6mkyhazxbrp5u',
                qualityOfService: 'ftn9hfrdd2frb6t3krmo',
                receiverParty: 'brqnc5atohmfafuqc4jyg7fa9m2e12f49z0e85ahbl8he51ond0xwhg7dy6eql7yp3liqb9nemkhsnn96b4x3it93vle83sd6ovd2zpvsnnjk09xdudh3totc5r6q0whvkyqorslajhnel9ypstpdwxg4tza9773',
                receiverComponent: 'mwguinoldm63j3xttbiihnix29e5oze8apmuad3iw48p95225gqgdahj9r5l8xncnmtrx9f8a2v2zrdx48hp1ljgevqozuafafs1pgh5po9aop8ap917gh4p2vcmmg11dqaadnsjwhhfe6f7q04zn7n8u68fabbt',
                receiverInterface: 'bzkly40prefqfvxxjbeukvbcm6zynzt0g290izr3fnmua84ix1jnhhyjt9fepl7hft0o1bx9oyq1qahy05ebvursv6u2v0g4moui10ucrl44lfumj4lop3qtgtz8un5urj45uljw09z3hgxum0fu8zpno2jdrcvb',
                receiverInterfaceNamespace: 'ipq1ufl7dw6hgw92uax04bm7gsxzrsfvl15qe8nj2syktk027wq5kz4qx3b98n0hnpjovrr5k9puhi8f81fxzee41m3905fk1mbflb74zoadc7gg003oeu7s2e9t8hc4778v5jp9kdju8r5w2elslqp68fegvkv6',
                retries: 9275698262,
                size: 7822355212,
                timesFailed: 9049243512,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'mju494dbqwh8kpft76l7gxkimciz3ynecvldmu18laycy58qmu',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'zlg7d0k8h4aa5ioi4vhr',
                scenario: '99jqj51sc157xb1uagw7agkm5fswzmid7t8wf6w95jlcip8pi4jqmlqdtbwq',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:50:54',
                
                executionMonitoringEndAt: '2020-07-28 22:01:43',
                flowHash: '9jkcin19sotkga955r7xuxffyzb1rs0zvy9yv7v8',
                flowParty: 'p12onn22eq7c294tm2no2w4qpeahuizdeulrmkaijdzekkhln344lu8k4te3xz1ksup1xj9pnaip9mqybak9jxoznv2cstxnpvysn1d41uqde0tom6rsou4j0j93kuc7ab85ph22144ssls8zruuxwjhmitpsf2z',
                flowComponent: '0wfszdhoxbgvvvvc6kqk7p1o90vzg2exmrxlq76m4zi9ajb9qc4c5pyt66zd9ay1l338qfc8zic0zfi287pv4dcclzk8telhlndwh58zyi4swq60trejwqtgcogw53afoakum0hgzex4pvbe4snnx0q9k861udr6',
                flowInterfaceName: 'mrilzge0w0qhk470ddmi76z4eo54k2n4omax4by9p1gmb44pu6d8239g96doyboxnh3077okdpk7r8sfuj8oahwaosvrjr8u4nj5pcgrtk8iyfl47lcc44oa9rkrd7si3ujodjh50fhqoc0gjbib58dcdob925bg',
                flowInterfaceNamespace: '8iab8oidsn83rky3pxzzw2ytobreoleb52zsg5q5y2rgbrncux2ua83re628o4bkq0dtx1abvluhdzy6dzleztwb5evcyqltci3fi7fhk23brrz1pk1c8vqhlval3823zhkbzpkdt4pxk80jjfn1hzgxp2n7wsna',
                status: 'WAITING',
                detail: 'Earum voluptas enim. Est sed iste. Tempora neque doloribus hic voluptas accusamus temporibus quos. Molestiae aspernatur ex inventore recusandae velit sunt voluptatem est exercitationem. Veritatis voluptas expedita illo. Rerum illo saepe quia repellat aliquid id nulla.',
                example: 'vbdel6c2ofqnld4xvklbmyguzzfj2dm8e88se09h4d391j5s09erve1xgq1vprr6dpxbpdbxibntlsrqol8nqz8ze1thpv3hazwggt48mbscj2uw5cp5idsisawjwjogax4vob6pap6peryukc2zbrh3h9aqg8yn',
                startTimeAt: '2020-07-29 14:31:41',
                direction: 'INBOUND',
                errorCategory: 'x7w9zc7clmcd5bq6haordf6ugct4tvumktlvoj8fan86wnr77wgz2ffqflhvu6ywd0goexh59v466rqmni8scmczh52n711bq46o2i0vxsm1dxi355jshmxnwsfb37q4j3wbih3vv9anckxrigq773d01myy5qdt',
                errorCode: 'w0d1d9dbievgkicv5q1u7s9l6yvypmo1joeswiildarr5q9cas',
                errorLabel: 784641,
                node: 4345344120,
                protocol: 'wmlrg0spwx0z4xgzu1j8',
                qualityOfService: 'tbzrortlq1k8szk3cu4s',
                receiverParty: 'lwdhuwd4lubqyqd6wd88n4smz5gcwbfo4v5m88d6vsysrafnu7e0ca3hdm8tuvpjzbv07yrickh7e767vey33ecdlch9txzk2zy6bfhhppqso2q3fainkmv7vu7ato7z9jtq5mws63zq16q96it25j3lgx53wriv',
                receiverComponent: 'prz67ma1b5mr04n805iw5vgw7atcxu6rljoq6y3nb24748sw84vq6brojfmjb4gw6jde98smsgpc8fdl3o361y4hgq3lryjn9y6offitcx6x38lx6h3w1hucuwaitlzqvmgjmfv4qim67j227x9aqg5cfvb6c4fx',
                receiverInterface: 'v8nmr2b1w6i5314cbjv2s2qqg9p79j1e6o28kheb22hk21p343ak2a9rfvdrt9eww7mzyadcza8x7bouqengmfbvaz51rkxk1fn505feuninese586x6w1yu8igls6k0afge94e7lllicvbshmf4low6rvksmkws',
                receiverInterfaceNamespace: 'oz7u6zqn6g8ty9zm5pxprrrze1iz98zs7w0iga0cfvbra3ziu9h8285db2404mlk9qsw0w2ki8grhki9lxm33b0unujoscwko2wbgibr6s5cycnfc1pvzrktp00pgdo4l6rk8hsfcmwg72e9x14ytljn2kv4j1u6',
                retries: 9875357084,
                size: 6468924641,
                timesFailed: 4308625225,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'x19p6is2ng0lgypg8o0seyzcwtc1t4eqyo4xz0pjwpa1bp7uk2',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'i3ipfs5to70ebz5bc9e5',
                scenario: 'e2bs84xol16fk8dhw54uh2w25cn7bs56wpu5xcfyqrv3winvzpos9ld8jzfy',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:34:54',
                executionMonitoringStartAt: '2020-07-29 06:24:45',
                executionMonitoringEndAt: null,
                flowHash: 'frju5qs8w2zrtzctry0kryuczgo03pphoi3le02a',
                flowParty: 'p27076agi0qobsc8e1qt997cgvuok67qwm9u74v165o8ufq0z135ieefbwm3fgcrswfx9t6ks2jfg9rqf0eex13ev1t75jkf2s30ounnw8uad864m5nx7qzgmcip9t8is0dzmm6iqejnhm2uqntlqunhfs0qucvc',
                flowComponent: 'hu3y78crdldssrp5p1tgoc837tj2qgug419mzmxjulpf8ejpczelg9bedg2an2tdmfmfw3k7su085rpjuriegmd2rzbd98o69bpntl2zuak8wg9ef8d001ra14j8zu3ucu3f7jln5t6oq0i3xdqsljouqcphw8w8',
                flowInterfaceName: '4y4p0wo0kwjd1ipkta0sr2fqcnu4v0l0klzlfjudpircp1xbvlv0sndsvqg07drupj9fm3x28hbpcayvygjqocbacsvq7hpsdjqnx89lzuwpi00g3ccgdbzszb83jlxavhrwwirucdo7guaj3npi4gw44ff5l0iz',
                flowInterfaceNamespace: 'xufht4yycudvd7k2t1u6oif702i0chc44jpumhd8nalakp80fzvrsht5zhjr3sotnq5p0r8d4gj12ndjv06kjb1w3axw2kl8shqrbylxtm609yhcp786keikh5be9g7nkm41pz6x38hhr00y1807wjpzwp93jir2',
                status: 'HOLDING',
                detail: 'Molestiae et repellendus aut nisi incidunt. Explicabo et et magnam incidunt nisi. Earum aut est quia accusamus rerum neque iste. Aperiam consectetur ea cupiditate vel qui dolor qui.',
                example: 'lwus2rg6lfy2iuvva082ccdjx929in3jc7m4q2ybrvtbojrw4gx9muk93gixlxfkzbzvvsx8pqa70yvbnyhmbw35hqz7g2hve24dvcvsou2h1somrljpoqc7eqh6l1bj737p6pk86ha3jp041p50ftmoxawvpnrx',
                startTimeAt: '2020-07-29 12:11:02',
                direction: 'OUTBOUND',
                errorCategory: '0n9ucfea1ytasqkxkt1mgsslxxcmx4dpk8n82e7x4t59085fvec07jyicxw3drntnca1s39pxoozkxrkvsfdxs507fhglphoy4niq7ot6c6fiuy5u031tw7b2iq4azxohb1j5sgky5z95ipr1xyzoa5jf4rx4g8f',
                errorCode: 'c1lit5oxh0lxu76cb3a4axk4rq9hjzgopqpbh75wwmuj3qa614',
                errorLabel: 797780,
                node: 7650051634,
                protocol: 'jfkpnmyghffu1rlfjvrt',
                qualityOfService: 'f92dotyhorbarjt8d9db',
                receiverParty: 'tapwmwx0xp3qu8m6tv5qccsr5obcylx6sus30ajqdgmfipqggxprjw7dkgrmkrg0jkew8ugi4ldazg8uchdyj9jswmpemmr66sh736igh78oxj94womr8ah2d4c6s36aa2cvu2f0q1jk6zxs56tqxaamypzvfkas',
                receiverComponent: 'ooh3kryxr3c0z354sz6aeeh4xx8pxo7zv7dvhkai1dvsxbokjsgxhn99ab544ey38yihoxhbvmt1rrpilq06ohpurcvlbdh5vqls97do7w2iissaso84foqrgqq3itoushjr4hoeyr540if6l6zg79b38f2xe1yi',
                receiverInterface: 'rnemnj7h58azxqqcszfazv3dkng2vrg7sfhnk23oz25w71kijdtvitcmijf4qmxk6s503uzoa04u19oreblj6l8xuf5c06xj0jpirrz4g3wmeqccimaez77yjsbj6tent928ncnpesol3iirv1klqv4ffmttdshj',
                receiverInterfaceNamespace: 'geecs7rd12lrel3haf6iui0h23e7cyy7nj0ic5v1jn14v34y99vqzhjbj4i1xb0cjvogfazqk3f6hudt50yjl3fzrxwhoe2u6pdld9l25v8uu2r7ohq1sneqfaswvnxgujsgpzlw8uys5cvvo8uacw11nmq9e2j9',
                retries: 5463082098,
                size: 9025344418,
                timesFailed: 7161884057,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '1hlns16s7jjgo9gr7pfpovfg3ca5k195s2h2zsxmneom2jdacj',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'ersu1blk0bbu79xn5se6',
                scenario: '0ryxzdiiteywkhny4arjwzdrn19139rx5rpvgr7p889j4brhico61b8h56js',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:21:31',
                executionMonitoringStartAt: '2020-07-29 01:44:41',
                
                flowHash: 'yb5vgyhebaqw3faat2vvw3dxzjnzfokypxzyhnua',
                flowParty: '789e3ce5hxsbb0vma64qp0t4b70rsniy64xjcg51w9erv6u57emdimj8kovd9w2xyem06v1qlwaf4dc4adpf851qksjefp07hz1ljnf3soabktuvr3x99a7jprt8gck2dtb9jw07iou2i53zk9hsuj4u5o9royep',
                flowComponent: 'vnxvbp1zrgj5hff2ayngyvmg45rrdpvugqgf64t2b4pit6hd2lqo9pitwl55a39j4bpmu0a6dhcugna8qplnw5wtzzjfhvpg4iyl29h2b4t9kr572mdwukagfaevjhk72x0gqvoyg91jc8h7vvr5fvqks4gsi5b2',
                flowInterfaceName: 'xkt9sosvcnp4op50opbulv5kkuo9ylf3ytqiyj8ul5icba89heuoqcr7p2hhy30bsklbvet22lp4zbuxokmceqh0hiv7u0se1qw8p0p9nrf8co5g8l6nehdhnvxliwhq36duf3neqnqmyb1gc0zltxwg0kxlqwlv',
                flowInterfaceNamespace: 'uzh0hyfgv8miotlv70sjth9fx4nwva52pmc26tc7cwc06ok9fv8ok7b6cxoar4a1xkgn8j9x9stlywflm4dsgirf55yikba37nvdqcqof1yjda97tgrvvi0xjq60njbvztd4m16qzfclfe3xthweh0c0pq9zyydr',
                status: 'DELIVERING',
                detail: 'Corrupti ducimus perferendis doloremque amet velit consequatur. Harum consequatur inventore voluptatem consequatur impedit repellendus quis dolores laboriosam. Impedit asperiores amet ipsa velit quo ea facilis. Exercitationem fuga sit delectus magnam repellat nostrum quasi ex fuga. Minus fugiat aut.',
                example: 'l42iouq0x8dfg11fh7bwmik1iajxhwkhp5723dsl0intjsv0pclwlnwh98idafyzv82oa7hmb9b1rx95rsh1ccwnon1165imb8xox01jb4ct2w7kjchelb4m75vbgefjoph4vige13a1e11rnz0mmlyugh2zivrt',
                startTimeAt: '2020-07-29 00:33:53',
                direction: 'OUTBOUND',
                errorCategory: '49b9azimwd6qsxxsde7spjvg5jy3zxtdtu9gpferu0biixm4bi4guzx6j2g8c8ewrxkdnqxod45p4hozggtr5ctljwrx27xv2jgdoxi2xrctn61fsffmrs6v5906ijp4e9y81k2q6zq6va7d9wpyq26sqfejazls',
                errorCode: 'f069rb87100i4sz0baqynbn1ualzpknvah4aokq7c70vus2xie',
                errorLabel: 456137,
                node: 5521018831,
                protocol: 'wqhhzhdojna5tvtexave',
                qualityOfService: 'ytis6zlgfbdmy2xf3x8e',
                receiverParty: 'zrgohzapzhmle7bnkqptzn4fo9va5tmnqb5ghpap92lizxiacgtyzhfzo7dohqu42ck3wze3o8uzowppc8jtau6ahdlurw7acz85wibyxe26532xkstcrm8ndsom8684wtun3vzu6pjplgvcxw5celwsjc91vpzl',
                receiverComponent: 'be9pl4hk9p2olito3330vec7nz9pa1ff8ar97evcgdnlwsq66kv365uu3h3hgstsom68ol4oalf9b7kc18ytzozen7lrjq412uwm5uycql1f7hfzyxak8dw49pmipw82orudnaniufoizd4g6q62x2bwhy92gui9',
                receiverInterface: '8m0xs8hmb1ploh8gp8uiwoqognlijdxdsbaqpf3xumnx6ikkbgnvm5txyyh1z8lxhf9sovf3l0ov4ul01fyncf50o1kgfjzd7dw565g21h05qzna4xyq9bm31e1bbh6d7lbgoipxkjh96kgz1s1jrm1q2py8hzir',
                receiverInterfaceNamespace: '9o16t0ukgykn182is4klit2i6fr2ygvwfd6ka3qjy7kt7f1b324ladt3py2f2on0awfc3bjkwf3xjdp90ioh1uxog40zgww08s9nrgx958r12q8lw12nb0f5nlv90y47q5iw3sqmvtsmqx0hfmbqwcde8xqfgdsg',
                retries: 2411794452,
                size: 7124916580,
                timesFailed: 4006822638,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '0fberlxwivwxikm3jjzur5f8vsd0q158dt9nxv7syenfao8o2t',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'jaebexn1zjmj7jrditx6',
                scenario: 'vjkgzxeaqn53k0hdc75rpxb7spp3uezjmednkrhi0xh6z60euspgp3rpcksq',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:53:09',
                executionMonitoringStartAt: '2020-07-29 06:49:31',
                executionMonitoringEndAt: '2020-07-28 17:45:39',
                flowHash: null,
                flowParty: 'kmjapsnttlj50njdvrl1edidlexiw2zwsdjybpmryn71rvvvopz8e2zjfbec0bt5yrysegg3lia24tx61zbpntilw0z5ue7bcwgzuo4o3u6saghsrqrwps8oblzic8o1pb1j72815nm7nxzns2ltz18xqerkruhd',
                flowComponent: 'oz8g9813pgs30m6sjejn36mbe1xg1j3lcas0xmd309affibvxp43c7uk6b4r8xuqtmiq7sbbe53qbljo1igikj8w03f40x7a2bn1fw9oc5bzdjs9mif1n98uvoyfclzh9wpjh3ussp2fuzy9ima4yingshkuib2k',
                flowInterfaceName: 'icdjzy3ej84vunpbw1h7jjtd78c2xhrf4utvaxz7e1onc7mtq74he6vx6qeoo8t1pd94f51dxfq6towa6xb1b4zki1auj6n8lnzzzamc0bzeq8mwjs7l9g42j7wqvnqnmly5s1n1jaq00what9dqxhtqfvlonv1z',
                flowInterfaceNamespace: 'zt102s53ndkkf87h36865o28euvw7we2z2iecleot2lricwuchw4hhilzg87kzukw83ll3ts45ilogmwl559hbqcy42qf0r6qemjz3lp8ghqwyeiqb3ridii1j99x1pamvxuv3eqc0di27xr269qzuhhtjyb44hn',
                status: 'ERROR',
                detail: 'Quia debitis fugiat ipsa beatae aut culpa nihil. Dolor fugit dolorum ut sit sit perferendis. Nihil reiciendis laborum consequuntur. Autem atque quia aut sit vel consequatur veniam et. Aperiam quod hic voluptatibus quis sunt error ut pariatur debitis.',
                example: '9teobppwuxsab3d35jkfy603lxf89k2znucucubpbzgtamtdawtzrj10vmp1e20sni4dz5bgk4k596lbtxhqwy7rcsu48whitl03kg6v97nzht5lh8kipagdgj0op8ayyg4ofvbh1mtjjqij5cn7tdmdfg2765o7',
                startTimeAt: '2020-07-29 14:42:51',
                direction: 'OUTBOUND',
                errorCategory: 'ha3xpzyc62mwx0i140oen0o6yas0ggs6n7dfmokusb9t7x37lgknypnt3c6m4fb7k8gsw32igad7cvzb65d2erzm74ztbaz4k7pchwz8zg2zkez8uqq2bvirdqigq5idz5hijei1cmbjv61u2pxvj65gyq447vfw',
                errorCode: '8yrgc1kvsae0sh6fg8pwtnqed6r67sc6l17qrfori8zje6rhbe',
                errorLabel: 254854,
                node: 8246196494,
                protocol: '64kbzs5ep4aye5827cf2',
                qualityOfService: 'hn3mw7q3au5wlfihve0p',
                receiverParty: 'om42d1en22zjsfvcbn8gw8q72fb958ywhkgivdvytaq5xfnnhgca7se9w44546t0zn33n4h9sh0a07ne993bo99uq4p5smoy0hx9k13n2paw7livsm79ni6f2jrkz6sx2ptu9u1mqia8ur32iwu8pyx528lflm0p',
                receiverComponent: '7i2j5yf8vhzzvlrfx79l3ltzgmw1njo5lpnj7byygeifw0j9ssvuk7xm6f10u2gg45q2wuj6d3pvfcxtr10gax264aycfb9wq543f1k3hayhrg2wej59ql63gyu3ttrkhkv3s0an98mjjcr9ujgg2fvjvh9otejx',
                receiverInterface: 'dg7yw8os95ap78uk5s0jmva9ghhxw7zi48d60hu0ql8laqrlwdmfu42ksgi374zk3zw1w1cqi3zs3qrtyecdhg3tlap6v4ls4q1irjxlakyg7anl53mj72sqilu8s0j9b73q01jbhd6amzfrfa6nmltb48dca2mz',
                receiverInterfaceNamespace: 'kwa1br80ma2vibuguyeeypsrk3hwo7sk7hgay4h87yg9lhdyocug937536q49r45wwjd8dgspiv4cvi886l8wnet12hm7thcq11vsc89ftnv2yezxc8zk5tm7z4twekrnssszu792lj37htuqhtbcgsbm91in109',
                retries: 5924702509,
                size: 4635044612,
                timesFailed: 1409413328,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '5tnodoi6nzlsab4l7a3ad2ukmbzwz109fbgqy7u9r303g2yyxw',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '53xq97rqjd654hhl1497',
                scenario: 'igbiixv4czuylcsbev08lzonajqm7dn6i382ylyflz3gdpnz0sk64mi6m65o',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:34:48',
                executionMonitoringStartAt: '2020-07-28 16:51:41',
                executionMonitoringEndAt: '2020-07-28 21:36:06',
                
                flowParty: '7ohj0lmxe33gfs0zarjln20jrfapepf76m4j3kfyuasphv14mkqiwg1nz4goegij8h4wl0y4chgjuhwpmmkjijin08lbxepjqtbp60dvx34l58ati12mxnr2cfzqs2rckdanb5s5mdyyf42y4sopp75goblc4k9a',
                flowComponent: 'ytx0zzn0eiiwc8i8mjdypw39gr1siyg5iaktgrefqcxgv10f9irmp4rtowghdr617f7jv6t2542esx17t3luqp8s0393cy1qb98viirurczanlx4h9fhvu5w75s4vdm42xzml12ngmshtigw9c31g3frqp983rmv',
                flowInterfaceName: 'r0hayvlp08lqgea66q94gb3tvbh8uup2ucifnkrhmfjdnfufl4kvac1a4jez87y3guzlzij516f56007exu8vj4nzsssuy02fga9s46b09pkgtyxmaszoypldopfttritetdqi3stdv2mymlrvl39u0sbhyupzcf',
                flowInterfaceNamespace: 'fc1eis6nrkfmo19j995v9zpjpwzvfo29dvxp4vrr0udtkzpu8f5454ra6lrp7iexbkefi45urp070nkkerjal8ugdlmf15e4gze92rodjqpeys70r388eorc546uml6zml4r1mhvs6y75tloyk576osv04xpoqau',
                status: 'CANCELLED',
                detail: 'Totam magnam explicabo quisquam ullam voluptatem at optio. Eveniet occaecati autem quas quia. Totam aut et quia. Et rerum tempore numquam voluptate. Accusamus rerum mollitia et voluptatem consequatur assumenda sed quas. Doloremque incidunt explicabo molestiae rerum non ut.',
                example: 'bazgz3kpdwmoljsyf4q991miz5oufxhb88x6a44d3jmzxvj2ipd3y2mt2gn4zl3rlti1vyqxtwm43sdwq78ukz2ngq7slj73szaqk2o1p1t2lheu8mjrc7cqfbf8ttolqk1sfke8rgnizyu0srlalujw14l6sp6z',
                startTimeAt: '2020-07-28 23:51:41',
                direction: 'INBOUND',
                errorCategory: 'csfcd3z5yg3lrm288xhtdy1ba7c7s1ob2kc4fd6ak5yonwsp0v1t54up9gul1jey9ntq0uzt03p60y44nmdkaatb99xhtpr8hdfpiquzhsnis6bdky4gx007fzghyg3wnbr2kxfoxrivbxskguic69tdu2f1cce9',
                errorCode: '9mhwleu1r4e73jfwee1yobl8s0qdtortzbibtl95c1zzu6dhb2',
                errorLabel: 308266,
                node: 1583040528,
                protocol: 'xqga5rio9e11n4viksfu',
                qualityOfService: 'zs090hy4kr32l9j6b10q',
                receiverParty: '6ekwqpkgy5ifkcfewpit2z06ifeo39w8cayqteik4vbqrblif7z6ulr96k6kwouubz6gp39uahk6ov84v4lpb0j12xi3mk7f3h0777ua830uoxvdea5nmbb6urrp6wi988vl2ysl4njr08obdpbanzeio5kl31zk',
                receiverComponent: 'z10na91zdvanlw49yiztnv5qf973t84uzq4rxas2dxev3cr1i0tak05c7i6l0qmrhoocbsck2x2ubhh0mcvmmfgclrml0gvcsrvflmkfvvdwopahilp91iwt9vmqol2utsnc7di2u6at4akwns9zsv8vt4a800wj',
                receiverInterface: 'ofrgjsoqfdkzr28fjooc1usb9lh96toeosibercappo2fcw9fe7oyp73omzqjzamzz1imkjrdhy00uqgxp0rw1132ya4740zh09g9npu9igl021yv58k4a2oworwircrmz5pgqw7juk5vto0ee3j2xmznd18k2hh',
                receiverInterfaceNamespace: 'lo4f5us3mfqdafcgbihn57u1iyjxp6xycpp0x5dpbgaoitadbhrpt9c08a7izsnbkqqvkgyt3ik05i4j58aesg1lc39bymz96whzx2m9wojsn7ok17se9rsj47urv9xj3e2smaxywm0zoz1ndmtob1emc2v5102r',
                retries: 2616849568,
                size: 8938984484,
                timesFailed: 6047155902,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'zqe0z1nf5uhbmi5i7xxtstzq24xavkw0530easuri4z5z0vwm9',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'tck8zxjcql2ehe7ctljo',
                scenario: 'a7e7n7xz3jtkj4wbsm3yahlwlw3cdjlww0o2dg5840q8754313kp3iq20nuv',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:10:44',
                executionMonitoringStartAt: '2020-07-29 04:34:00',
                executionMonitoringEndAt: '2020-07-29 05:01:42',
                flowHash: '8m3929ggc65bm2w5yvtyfxkdi3bvhobfnskho190',
                flowParty: 'qifvstnessbh3plntvina7knmb6ps8z21p5y439rtqeh3p96q0ri4rvdf9byt2v4l8maenb5xp942zi4c0v8rcxrhzaegbumbbxb81ijst1v9ra4ubbozvls6sfbua1qxe3qrqvss12hls9ev4gq58ai8jlulzj4',
                flowComponent: null,
                flowInterfaceName: '9k1nm3h2x5pox5zat37wug4maix3tc3grsigs9eldfoeo0ml713zhfxs67i5h9s3d45i1mr8d0zrl61wsru5eyh2w3kgrp6hejjpwhwzbwnp0f8bncskyf5u9tq1jjlcjzeae11mf7fkzhpazbre58o77kpucxqq',
                flowInterfaceNamespace: '5htfmm62za7gk5ajilxgn23a8s8p9iggw0gid5qrpd74zkfitsewxfrwuzy7rrmjf8sxd1ppqa91gwn4i3g7fsihsqfrir3gm14qn8n0638oqxbbxdo89u7sag7vzxh9y86ynaeht7xkuvoj7838wqq2jd3n0dy2',
                status: 'ERROR',
                detail: 'Doloribus autem rem dolorum reprehenderit ex nihil. Cumque doloribus repellendus ullam sapiente itaque consequatur autem mollitia. Ut aliquid vero dolorem tempora aut tempore.',
                example: '1x9tgh4vwm05rnbr95bp6cip90ma35060ui1vvumyl7iz9gwmjs6lgcsibryu71vq0776597vux74ake2uzaeoqfaejtfhmz5w2astaqlxjckg7hegod37drkvl1lkl9hhowvyoo6nygk4676u5pq1a4wjjdoxl3',
                startTimeAt: '2020-07-28 22:57:33',
                direction: 'INBOUND',
                errorCategory: 'vb8p00i9sal9ws548fjenvm1wdqawiaplsgmpf95er7flmtvpagcjmwtayi5pbm37rcufjj9e3sxcb45msot4j3n73hrqqwe421cdzzwrtz69ef7jrcfz9zsxgzzrgprrboh2vsylyf8as29njgikznkfzjiadyg',
                errorCode: 'yw4vsh9ckh4b1krqwub5zrrcf3klfewqbtkn493txpgb740qsp',
                errorLabel: 409649,
                node: 2881022958,
                protocol: 'z0y9ad1b12joyaie16ma',
                qualityOfService: 'vnmno5ghqfo3dcu69vwh',
                receiverParty: '6bltyk40e6px8ds4mxo5fb3xkh553od3b6gk16293v69hbg1kfce4kfjfn3hs2qnxokj7gfsea5yo5xru8xgjnflvaul10b5xmasmv4r7txr7wo76bnccyokgqjtqxji97p07u7pswcndn7hkilv3srshhfbagz8',
                receiverComponent: 'piiu2wxrbmcrzvtvpq2hgkn93n0b5urnd750ub5m3b02b81omat35ol96b9450uutj35e1y6fjn8zy4k2v3sv5qmptc7lt4miiq9m75ayr96kjbyhx8haqopwr56mfhzcim07fk7uxd1sc5220chabnnk08recst',
                receiverInterface: 'doed59h20rdu1dlz92gmb8372bq36c3h27e92xe1gr5fobl8x455ukic8xrf3ndlotagpcsgdszh2652ugehdt7ywip9bihapxm7jrkx8b32hseavg41pkehjijfpnnkipdz0sv2xw72qeds4vrq8vykfsdvaxiv',
                receiverInterfaceNamespace: 'uojtwb8cav4niyrafg58obmzj0ljt8j99ek2zmup8k155n7scw2u0wa3cj5zi6fph6pui01p0lyadldsojqqsph2azwcodayizraqgpgr70svtfhzq5p9ru04l2lrty4rlgkvq1m0fgqxwvk85hrcfu4dp31lr89',
                retries: 8100769255,
                size: 5425530619,
                timesFailed: 7972541215,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'w4wir4yazqzykn1nuk2h5d3ytr60snj9l7rz4co6fygakkjwgs',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '9me2c4qf9v3phptgh7ch',
                scenario: 'm8351qvqz74m7dz4rck6l06wghxg8o0atrpand2ys9q634qorr2qyhrtv37i',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:46:08',
                executionMonitoringStartAt: '2020-07-28 18:40:52',
                executionMonitoringEndAt: '2020-07-28 16:31:35',
                flowHash: 'e68i1v5gezbstwondnjp2tex281u4pjywu08tj2u',
                flowParty: 'qdxadyck8gq3j64f2qan5yhqs5t3opwc7fy511gsmm4dg91iconnb0t0ald023p948ey5lhu2l9gejj7fem2ash7ugmy0zm1a4639d09t4ncx2xbepqe34415yn6qx5pa1cukd2zv2j3vk1hkarqg4wzkg9va9i5',
                
                flowInterfaceName: 'gmel2m5a00glqaj5tu26gmtiyn9d42jc2dbduqv5ts7qeqlaqrwacmn6g25a5pvt2ch115a3hs0f99zrf7iop0blk5gb5lz43q5m4xqqjs3bleuq9x08slqxcuck4ixcnko3b93kzelm0ql2flhwpt68fqooyxmy',
                flowInterfaceNamespace: 'oydcup5012o61a6tutfg4sze0skin3yth5i74mg8sb5ijx854au5v1wlzow0d6adzj4jlet3cwbpnjscw3ibv1uxn06idb4ovmybu967dn7zgwskefrsbz1tj89ir0ug6i2rp8azfsj8fa5tjxakrmh6pqxryg8k',
                status: 'HOLDING',
                detail: 'Iusto atque eveniet enim et unde. Sit fuga qui animi et necessitatibus dolorem. Asperiores assumenda provident dignissimos aut molestiae sit. Animi sit aspernatur minima nihil expedita tempore nihil. Excepturi velit eum porro.',
                example: 'crgyulgtoa4j4dav910xi7gbzdwp2vhu1h39t7xbb6ok59gmipju7gi5hixjaxixgebz2k0ijtng2h8xx6pnmsxpj1wat8r3wa8s61g169ejnv4aa99kyy5sf1ka84ch8ueeej4ys6t327warkbz53z49hap9foe',
                startTimeAt: '2020-07-29 02:31:05',
                direction: 'OUTBOUND',
                errorCategory: '4bprvm6pkkmrg1cetmurq8t18o88wd0ieae4hrai2ilh1cwr0uinmfv296tgbdb1zewzohubpwktrfh7io9kcynhaxd07hfix3po7knfblyc98gadh53c6c9h8lu697ohujps1whrx9frg2o7crc037buxn068ga',
                errorCode: '8xg0a0zmnvl9uslw1gzfdt2lbnscw4vuxwu4t8jpdjtcjcsbzq',
                errorLabel: 251682,
                node: 4930090033,
                protocol: 'sl74sthzl3d8xx8b9oho',
                qualityOfService: 'qoejo108dyqqv30zlqcq',
                receiverParty: '9ys00s2xtemdq3xi3bviu8vpin042in04xmf7o3sso9fl59ly4yen9as29uz3n3bn4x3l513u2do79q9mxqxhqce687ia9997wrw32n03su7en5aw3fm23raur8ep8r5f0pksk8jwry3xa1d766cw8l9cck91454',
                receiverComponent: 'tae3hnqyodfx7cl6phhbfrg11btee0wm07kfk567mctsembrldv8vfsbjcnzrzjs07zxzd8wxsn5jb89592pmekeyev1mwq706cifbqh1tofrtap3vx1dyej0eeywy18a2ycc8mc2ypljj2kicb8z0195ds2nt2m',
                receiverInterface: 'r5xmheqoxbwyeh9wfuts34cgnbwiqljzg3ng1wvh2n94pvfcn1v51rlingq4whgxh6740fpvx5noz7vna01nbr4mrb8l1ny2oylyjswknutzpdqxmjqd71rld2ysevrhh0rt8id2o0i2fb2k3znvt3ep1d806bqn',
                receiverInterfaceNamespace: 's51kk7hck99kyo0emwamskwwn02czgyyg585oj1w1zzry70q3nqjxs1nk0agul7v20j0e3xpqn0jyhetznlxjdptsq43hfjc6ff4npbp7y0ctf41n4hm1jqqayznixz0ydk8f3siynpbmpwj8hs4eiabj6avme2q',
                retries: 6866991990,
                size: 6782415013,
                timesFailed: 9873398657,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '8btdo51l7qv04rq4sz3vdtlil7n8pnebrrutumi0mxqer5zrsg',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'j8krs5rbjd2s0c7xtb1b',
                scenario: '5563nn2n0rjhirh5lfx3uxemj0a2511czj2aw7claz6s3skdtnmuceu5rkhr',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:44:57',
                executionMonitoringStartAt: '2020-07-28 22:49:33',
                executionMonitoringEndAt: '2020-07-28 18:19:56',
                flowHash: 'lzuflt2nq34z3xsal90tg4iufqqqq0m3qjrl2c3q',
                flowParty: 'j7knmza408gg8je0q8c89bpeekcica1qvbdicmyqqwwk0sqvvqxerbc9svzey1kdzqhnja5vvyjc9rlvpdxstd4sb2zh54ftzvyveh2kibz3k8ypjobec9mngz5gfh9hlupxv5tzdw9z9906ovntpabhos6v89va',
                flowComponent: 'd1wgu64zn75jtj76ivdxnlii86l6rsgy2lid54cfznpcbvmkpdekqsvpiyanvi5lnt06zti9necidtwt0m6lywdk51decue6uf0tzfcj6o7yrcp63gqvsr3lue9axcb0wo2b611bl15m2sc32pc0gfwtowv74zn2',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'jn06ourdey0jivxbeebs866745saqzrfqh8wpg1lzr4r6e8hl6v20k80017jca08ay6nokb8bvsx5d1cfh35zii1ece6g3qr94mq3nf2pwy24zlxgix9f026w3kv7ewn2qf4smf1t9y6ruc0oztzm5h0cm6pdv4x',
                status: 'WAITING',
                detail: 'Laboriosam quasi explicabo aspernatur consequatur. Id placeat voluptatem et quas. Officia minima expedita voluptatem. Et omnis necessitatibus nihil quia magni quia vero. Consequuntur animi quam ipsam placeat temporibus expedita qui.',
                example: '3gxwgph647l49lxrdme5v3ugve6mk4baia13rrzo11ndo9lguyh7sex3k9ywwwrm1b8oide3mlwynej90si2lgfmeco16lry41jb5uo3c7690j04n6d8nx0vdmthnvnai8sh04x1fxoccfvsvkrl4y0kdd3y9kw8',
                startTimeAt: '2020-07-29 10:59:34',
                direction: 'OUTBOUND',
                errorCategory: '5suld9rkadgz6esxp8aeynewywdapoxk4b45v704giquk23martlrezq8l993vlok9tlab7tou0zaobx88h04pfha96jripr2lprs7t4us4q3e80j4u66wv2gnhzccm48k6qdgjl951dqrpcfa6zlw0bqp5fqcyp',
                errorCode: 'yxv598avrh4zkuxs6pqzkzokpgrsvd04gx2hbqqtgmqf88zvc7',
                errorLabel: 886545,
                node: 3268746990,
                protocol: 't7a5egk3vgiit4m6wy2n',
                qualityOfService: 'topofcfs6cowbbonp5z0',
                receiverParty: 'rq57364a7cnpu7c5psdajybkv22aodpl411ehqk8maeseg29ibl58b659wiqp300889wb3ycu9l32cq4tex2zzfiwc4yvm8azx9lldjgo68hse0b1ttwuf1uz9yiohugv0nji91numnktoxfognlkukvns2z26e3',
                receiverComponent: '69v0d4lhcwr8ke16e2tum3z97fxqn1n0sis5ynli92uib50rbtbyfjuaxts36wa7iw78p15cpus7vqsnio2zc5h9ataf9o0k2n7gilji8wqyu78bhib37h9y7vxk3se1erfno7a83e5v1nsa2ass4a5jc5bjknxf',
                receiverInterface: 'm7keh2f3nqus13xexfbebbr4zc0nklk93mlsqya4zkolrsrmf5268zjnessupihemol6xgfq5zq08yqpmynlrn3sowx6ffylfwboiqp0c9oidzp0pfk8tj5rn602xz8cgj8wmckj6f4p5kjvcy964in5rt91q2df',
                receiverInterfaceNamespace: '7yuuniaafx9mjrqgzgmrigcsd5kiyx2wek4u39xfwsibavs7gbttjx0nk72qu98lmpchs2d1qoj6hbesaktzw1uj91a0thjm5rfa7hd8zcd8ad1w1hepjj8cggson5h03izreem63clutninnvfkv4tiac0gv2dd',
                retries: 9857577269,
                size: 6850389364,
                timesFailed: 4966530344,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'zitxun3u2uky6j71wgtimal3bkk1d5zkd9eqwp3xbq7tiuq7ot',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'j56b3e0na5iahrkvow8q',
                scenario: '1cj6kh0mei43rjs4ye47nv4m3wm7qs9xazyy54fm441h0zxv0sbn9qp1d0bf',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:25:58',
                executionMonitoringStartAt: '2020-07-29 07:47:23',
                executionMonitoringEndAt: '2020-07-29 01:19:22',
                flowHash: '1m79r9sxxtr8yot67x4pf2m0opy2n1q3zdmdy7c6',
                flowParty: 'u08slvc19c3951m54kq7z5xfdxa8kokz5dlveufk7au084jv7ejztwtvtb1vpx4fbbwoebbd908mlkdefwc1u4kxov2k6i10t8g59zjdziiv0idpbuhpw0s7a6ojsi6fdlut5cho9vsnyzepyx72rscno576d7ie',
                flowComponent: 'ellirl1dfis72wn7mhsw9ip17nrqxawiyudscr2plb01p2hm7v1n3ppf9sly7w0q2iaxtal22att5yzht4490ou6z1x428puvj1t31xa6kghvypybmdzsvtux5m9yg8hbfcs3juix31762pf83aw2tv8eyv9tnfx',
                
                flowInterfaceNamespace: 'a3stmoqycsvfqw8zc06yjyl6ctagfiajj4hs4cf3diqil43iti8aklnofmkqzt9nn0w305iyhd9ixtrx1q10q51pthoe0n2oioimknza6y8zq642bg5hhvz9ev1dw8p9pasr1vv36cvayx3mzo3bog4373oz71wl',
                status: 'WAITING',
                detail: 'Aut delectus eaque. Corrupti et excepturi voluptatem et nam hic est. Debitis doloribus magnam.',
                example: 'glrvzknac9nifyacujwe5awkfrpwj5u8pg47ealmh88lavobobu21b3qv94iab3x0osh4zfbhtej7typ7o8vonspkgs9seewoqv4z0ljj1wa41zzd9b5l7zzc4fr6ji8mvf7coc76udp89ln9lqpz7cddwkkudf1',
                startTimeAt: '2020-07-28 16:14:11',
                direction: 'OUTBOUND',
                errorCategory: 'g3lq824lu5glxkqixoun5x8pjqbzlpwj0ujonxrfk6wkg6dtm2kwnbel6gsfxmwwv77j1n7hmtdlftj75swfprhu966re18f38d17knvp48msjx3jignotf541eivihl8qsa5qfgjq234sjuiav3d60df8u0zusc',
                errorCode: 'cwn0t3ysj694j7s9lu8brv5q5kqvmralh65fsp62lfufomfcrg',
                errorLabel: 240546,
                node: 1574753835,
                protocol: 'dyufvmpx7zysg1ysfwhf',
                qualityOfService: 'tjubts3pln1k6mj0e28s',
                receiverParty: 'jvzvfal4sakzz2jmhp68oq8r7b7fh0kaw97k9whvuwoby4ox5ejfrg0nd860eg59c2wfmi2hjlfvhi9fnxx9zwxvvvq3da822m6d85hsaiub8l4nzt7n3f0x5ccrledbefdi9l5wbqsnqb2s3ogbksidmjbye6t8',
                receiverComponent: 'qil8uxd0157qbc80w9mu4yd3no0pn6v0jnb2yolbucre3p58efuj65edxyaw31shfdjkil9x3v4eryqoj4o9s561efrccqetam3xmky0jqukb4ql6pchgebe0qecffl5rh5aqx9q9rcltchhlfq0u05x8danv8ey',
                receiverInterface: 'tol45o3rfugot1v9i4i6342yl1ilmrj8oijswymlyd7sh8zaxjvzn793d9n5snwk0a1whfz91pqx4dyep4zngjaftw3cbd05psc62xthxn59088uwq1dvpnt0ds7eqryk0lm977yx1nldxfslohweo6mf5gan542',
                receiverInterfaceNamespace: '6v3x4jrdswgw9y68lqxy4pdfpn7bjfsgdbgmp6hz571auz73c1w20p9zepjmso6dh9d6m9rposhtedetea9nk1eidcpgv9ch5nxlq87sngslcdchml9jzoldyqqkg09kwnlqfcvc9mkgkxmvk7gcexdwbv4siifi',
                retries: 2511835814,
                size: 7209345568,
                timesFailed: 3273416603,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '9epmfhsesp712nds58fk8uublps82qgkelfile4b7oosyoo2rc',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '8bf1e3xxovs6b3el5q5y',
                scenario: 'r86sap6qc428gzqex15c6pkk80myul35bi2s4luu80qigb5b4yqii2j8xvyx',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:06:51',
                executionMonitoringStartAt: '2020-07-29 02:51:28',
                executionMonitoringEndAt: '2020-07-28 17:40:47',
                flowHash: 'alyh5asz67t9nj1xwy24fdhd21hb7kph6vkzs1i4',
                flowParty: 'vckfk922k7loj08opfhedt6if72i97n0buvz5zgz077jiw7qmrqvl921yf84wwstnahvwff97c32ngwww6fqfybrdysahf0k4h3yzsf0kihzk1152muk7rmrf5bn3dyvul43wtf0zrdwafahof3n39rg025xhtk6',
                flowComponent: 'hpimiekjavkwa0h4ioklk393u4zelh5x09pprew6kddvspe8hfsc0htsrqdz2d3khry6py4ytjcasjmtzl45qnsvs2e55krbvfbknij59jfnlcotjbhh1zwk7edmnd0bwi4dltr4j353y5r4pdvptowwst4y93rg',
                flowInterfaceName: '0uhh4e76z0wn9fd0g76emsqecq50887pfckzczc3y49sdisxaad4288n9r45yl5slir8fl549ieaqxm1u1o0fq6yaj68qjt89h8plmt8cntur244jkn2btse4x5hm39m9yo8a7br4jc0l1fnpqqpgrwekstneiih',
                flowInterfaceNamespace: null,
                status: 'ERROR',
                detail: 'Enim in eos placeat doloremque. Delectus voluptatem vel earum laudantium quisquam molestias quia sint aliquid. Minus ut hic est provident sed necessitatibus. Enim reprehenderit omnis est neque sed id ex. Molestiae et et perspiciatis.',
                example: 'f1spldsvrm8zvge0h7c8w8si3zfx6k50duppvt6nz2bhvg6uu171itl0p1bu94hcb0m7vvjjkwd52vji1lzt2naef7lz4blxdqt1fzrwgkmdbz5udg3u19qvw1y8zcgqwupzofn11qwruf1ovgutlxjoarhjvjid',
                startTimeAt: '2020-07-28 18:24:19',
                direction: 'OUTBOUND',
                errorCategory: 'hhm6gk3er3nltb62voinm7htbcavi2kzx0eezlu01a0mkgoemu5aqg1p05hcebpauylr44se3pgnhqxfipons43d3icsvf1pf67j7jdsgkq1n977cjr1omy6g7oqqv51almc6asoit1pw7ep1ia0ncxv4rujjnd7',
                errorCode: 'ldvzt4xfdlvdq3taddb9pkf7nsetaqjya1k7tfx52uw40j4dm3',
                errorLabel: 256744,
                node: 8874558822,
                protocol: 'uih900p5a8ygdrv1bihb',
                qualityOfService: 'k0b4gmj6trqr4dzvifjj',
                receiverParty: 'l5v4vzod4cf8nwlsd0c6cg95r2q7pjwp9krcdrvhxkutrjaph2p1kq62q0k7qmkwpfiicyjcv0bl14fq06dlpjyito5r6ntdjk4ch5b8ezwrwtvw680prj2vj64rt4wcknpp058dpjhkzxyb0qmmkp1ont5gdvnw',
                receiverComponent: 'n6h42d2872c9rxkn6jbyn6hr33fts635o039sa764j0q7acunyrvffd6pr7cx670ccsm2i9xvp39rpiv5gimxeyjc6le53dw1r5n0o5e0lcv01wm78uj8t8ajmqzaeay9smiy8grhlbgwqhc86cpttfd0rqqhgxp',
                receiverInterface: 'kw4uge7vtwcrhdbrs9s39ge5xyxoccop4nfniygejl1po54ezttgqm2tnw9fjbyglefpb1d0jqxaa7frpzb5rz3zux020nozg00e1j6f7tv41n2w23nmjfwgw2f31fj1dl6eipqwp2civxlsvn399cjh611tq0i9',
                receiverInterfaceNamespace: 'hay8f1hc8hrrokj4n38v20wcnyf3zhbrxx7cuezeeuxlpxh8gesbdujk5rvof1e4lxana4x4sm3px8npevu8a09lc05l5wihc06ciep5edddbx2m04t94x2601yft1n6zctwvgw33azx6a580zh4le0rely698o4',
                retries: 4106852772,
                size: 5010309056,
                timesFailed: 6453874735,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'hgzw8o741o95mw0bepww5qx8vowuhv3u1jpkrnsctcc5ca7d8c',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'n6qzh800ao58z28deiv8',
                scenario: 'pttj7mg072ilj6i220txphr1sca81bigcezctrhtchjiodv78k89ay0ydxfp',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:12:30',
                executionMonitoringStartAt: '2020-07-28 22:39:51',
                executionMonitoringEndAt: '2020-07-29 03:48:10',
                flowHash: 'gyas0cp1yj1xfdim3y41xhrt58mk6l3elgxh7itw',
                flowParty: 'kjs2jhxpyp9le57a8vadhcn0k55vn88uxbx4bas9lgiysiljv1ezquaura1bbnpnpx0ewnorbcess583p7pwwy4l22qdk07ft9lnup5lkexpk2d61pq9hou9wz832byd7uk21ltutaemcpw4gmjd2m96l28kjzvl',
                flowComponent: 'v0cmgvtzqb68gq7uq7sq5dvqy5p6v31fshn5g9gsy7ajsnbwaigtonedfj850m80uolbhfzvsqw2sgozptslg54pg34n8u3fh1e73yxf5hbby9310sbqe4ij95sr8arhvd7eyeivsiapk9dtt13fuz7rr4410exd',
                flowInterfaceName: '0nb2x2mt4vf70ythnbvkrr67abyxo78raor2zf9tiz7ui23uam5xywkud59rtui3whovyaswy3tqtgdehjsvnn8ikqggtf598syyt88gia7a5a3hff2zibveu0kuo623ogrto8al3078pqw8z34fs3owb63bsf1c',
                
                status: 'HOLDING',
                detail: 'Assumenda non sed est sed. Dolor quod eos expedita. Eum vitae beatae rerum temporibus quaerat amet cumque et consectetur.',
                example: 'f6nuos98mviqxt0m5jsjqufom7xrw8kzfxjh01mkgd7d3o68rzqfej4q5aseqnjoh9d0jnxzp7jwdvzqv73m1b0ptd6lbjnobvo61s7rr3d66mqkpnwx6vc2kf10dv1ul5kk2vgfjyr15mpck2r66vnni85b1eai',
                startTimeAt: '2020-07-28 18:32:49',
                direction: 'OUTBOUND',
                errorCategory: 'de1li67n82ef5xvn0hz03mlxtd202dya0rgnsbvkz8d49uqbp0ffa6rai734k15qb6287bmgxwxqp7j2l8e4sh5eb5qayfthgu6giqoobinkyopw9rk49pc3qvnw1ww5lx72vsp6dehc5pm4rtjz9s88q2odgosk',
                errorCode: '7fiqqcwzrxx6b79jpog7vhdteiuohvjqnqxs1gnfv0cy7psapi',
                errorLabel: 751615,
                node: 3755330352,
                protocol: '9gi2ypsxuqni34sgv6yh',
                qualityOfService: 'dyp4qivhylhgwksiz88f',
                receiverParty: 'g33aiodzg3m8ubjlud5p6yx2xup6noz12cg4y9ahmlmvffpbbnfvzx49el8e7ua6ml2a8g5t0l2my9zixe9vsribttudifhy94g68ehjo4f804wcs93k2cpakjfg5ej68vshmkfwg3ds6hltzs6xhd50fvskk841',
                receiverComponent: '5h8sbsfi0nb4uw0fsaap5r1ij372y321g34zpenowvz2tcwqzsoty5uijobuwk1ux7398bj7mho7cner0iyx2ca6bmanr9oyq0234lqaaxkfoxfyhb02h5ldkk6celyxim11c7zzlat4o6i1f1pw3fnbu4fh2eym',
                receiverInterface: 'lx3i01j3z8gcqjo9ba6pi69ugox1suc54hd0mkskva3bs4lhpmvp5ehzjk18a96r90v06yjmihwkkus6xxhtj2319ltcrq0zc3ei80jbqk9gua7hmrdwavqun9ppn0rmrxmzc66rjmyshkueoacpwel5uatxo9kq',
                receiverInterfaceNamespace: '8ljpefcybzw768zovxg586swh6gnri48luvkykkwwzihd91zcbdmjo1jk1uwvn2vov71qyuvl9elrgh95f4ptx2ur3q2g7645c5sn9nec1cxnh5knpx13348fal3w7r8vibr8t1xnohktk8jhzx40w113ywi21o9',
                retries: 5174391098,
                size: 4489252833,
                timesFailed: 2841241143,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '6q122z6u3zugr59a3vato0bqctvhh7mk4qf3de9qbnkta0kms2',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'maas9w07y83524o9c5uu',
                scenario: '5hd03lg4102a61tvky6dlquj4hkzj9ge9vfiinkempjmwa67bm4rs17uha5s',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:50:31',
                executionMonitoringStartAt: '2020-07-29 00:24:25',
                executionMonitoringEndAt: '2020-07-29 04:17:17',
                flowHash: '0zf60egkl2qp8njoh08imp1j9vqbew2teia884ry',
                flowParty: 'bqzdygnmw38rhrufi9q7biqxjq749afjam7ueb93o11y2p1l8nnq9atfvljh2n8j4us6j0vvql7qgzu0c4o2gfbmfryiifypoem6n9654ldgovbewbva9bot8vo0rooq6mahfplxsnfv6risgusnxepf8yrlr6zq',
                flowComponent: 'wktxnvnlyu8zwz4hpgty91t1asuts20y9f19avimry5n8cgqhhe7yur2rnfyryvvwr721fh3cbar82myzkuuhqz1lpt8vbskwmsdc9dvvhlmiys6fdr8ufceuunnea7rhm6hcsragqqysl0yqmb9pj0s0560rtrk',
                flowInterfaceName: '6n434i2d61on125oyyjefaw4tfrsa9mrlxswn8w0od4t478bk84umhs4jktqyqzgdib4rmou0dy4i0focyrgo2boxoqsyj4r2i1ouvmpac6k36ez3tms7l4g35ktbm4zowkti1cx3o3yk1hw5yvsvu80p3w30hfc',
                flowInterfaceNamespace: 'cw9srtra1cjgp831sjiyp4l5rf4a3gfvouz3wsrn84gi3i7op4xirfqaw9srkon12d9yzkm8qd0rhdv7ei7ak1t72f5r2bfos3oftzv69jdikzhzhb478uk2goebjf8qsth5rc11mco1zzdf1a8n8kr7pzjz70io',
                status: null,
                detail: 'Dolor deserunt et saepe magni porro minima laboriosam iure. Et dolore rem quaerat quos illum. Nisi aperiam minus at.',
                example: 'sreeknznqnligm674lshu03fm7ypnzxikg172iwelrc6813zvmosdlaefjtvjl9u9rnkpk0livyr9eoo8v0eri8gnzaxr1v92an7hvu7d3ojxy57vgppphvswbnoqkfc9vwjfztn7t43zq417dd7p6iaefvqd07w',
                startTimeAt: '2020-07-29 04:55:34',
                direction: 'OUTBOUND',
                errorCategory: 'mylw17j2ac13l8p9r73x2o03elwt88i3fysrtptcpkzr0uk7sm9f82centekcrqc0qnurq90t8lsyrv75nabgnozktr47r2bhugz4in25la5y7awk2alaljhtpmhzf8lp9x0khl9r4x3xfbufw45g00wwamqmyuo',
                errorCode: '1l1rzgnn3ycgi40d4gk6tqansgxzswic5xn07rbua1q1whun95',
                errorLabel: 124391,
                node: 2571019581,
                protocol: 'kjjhmdd2jxng5u5bnjdk',
                qualityOfService: 'p9l5nnxlf69689n2mzxd',
                receiverParty: 'ycgzzd2ahhemxbd8mfs9qdkyiv3clnyllmn5cs9ecuv3mlotsxdbs2nm50rapr3z7fttfsdp6kt5rxh3k1w7u2cnppx0sybuf7gyhtwerko7sd0dbabxqsq8u8bs205psq6ng3mxr3wxyjphgza2lmfp1hqpv6xk',
                receiverComponent: '8ef9fe3uuv4580lnz747guq6h5fbtqp77qa8yjxhynco13o5bace9i182osim4cda5nifpkcrq1xkmspgfpcdr1lbx31agt9nk3m65fq1y5x8szauq05t4vk8p91czwr3rw8j49rk8vsicxo1x07i9et6cm190l1',
                receiverInterface: 'oahu61q3t0xihup7csj5mur8qsuthhut0pgpu2k9mwwuzfl8zk042qmvvawkue7x37gibnjbq9tyzssoztj3h3qyxhyyd8ck9y8a3xmnbghjvfs4rsen0e26ptlheyhu8meann133xi4b9r8mt54ysy1wyghdps4',
                receiverInterfaceNamespace: '6871ca5qpjua3bzmy1wgmhzk6n3xf6b3yhp6a8sze1ev4gm0tf1cch939ea0ytezrpr2z23fojf9x7hknair2qtd37jhwpn2wnlmc2aujk1263vk5tjb1dbkql0jiyc0hs7v96zdxc8cnvs6svyku81xxhi6jozq',
                retries: 9041774186,
                size: 3635214042,
                timesFailed: 9322546166,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '3cumiu0e4jxs8zxhd9kfozb4ll712j0h0ozak8ohpbztd3s1s5',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'c71so6sl008c19e83eov',
                scenario: 'q57ap3hi48knfto8xd0naajayskbtp9n9d63l875vjwj2pfnqfpvfnnnjtlj',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:15:46',
                executionMonitoringStartAt: '2020-07-29 11:38:44',
                executionMonitoringEndAt: '2020-07-28 19:49:42',
                flowHash: '53c53uz0d296rrnkjw2aeykb8s1gvx9trb3qiv1i',
                flowParty: 'appb47oyhucsb513p7lalkmjbbhuxvps94yzu749glopumihtd65gvij6euwgsvst8euj8xl1zenr3ixlcfbb8oa1wt9nxijtwdnx1lrmi58i78e90dcm91oyzid0bubwchjktbj3qrwehwg4gr4sclwre7bfogv',
                flowComponent: 'vvf35ujqecmfnozrd682kqei3udt2h6blnsfb9kdjvk3s6lnd92llqcn6nwwap3b9nz6hycorq0ajvc8cgup2ska80o89d764gdt9iab7wwhoix4ab3trsjmfpqfop0h7ur1ogc4710968y82ry6tgyf8ht9dmiy',
                flowInterfaceName: '8zdpyqeee5k48p5p8b0a21n88cthw2oa0vpivuzaj4vuuwcoh9fp94fin3ev8a6crm7e21438ii85elbzgrryz74o16kerv40799y2yqlmujfz8wz5w9wihsiekq1qsfysn8o3k2g1pjcwgxdkqb4su8jaatppqi',
                flowInterfaceNamespace: 'fn76rspfxtkzq363a9redbf2oi8qmg3qmhso8o9baelrbj601clo1ongorj9pv9wzseg7kuls9xumon2tkjlbqfypezp5si4e0uiefteegkkd57v15sjix3wjmyviz0m1em9js85roonk8pyb0d9gjd2779buoi0',
                
                detail: 'Mollitia consectetur eaque. Excepturi qui quisquam. Impedit ratione voluptas inventore est ipsa sunt ut est. Quae eveniet accusantium voluptas delectus.',
                example: 'uiq2t83f9t6hag4euyp4pjhfi5xo967n38lbrbspy0xzz86sa9hu2jcneibjskx0uqw8thk4arzlnck3hh6mo2v9lsfml5ah6i0m7cj4r7ycmkjm2cjlknyqq55c3uzjwaqz61p71uaq0sbzqxasi7vzuhdsat9d',
                startTimeAt: '2020-07-29 14:49:47',
                direction: 'OUTBOUND',
                errorCategory: 'lwu6z4mg3gx36yjq1hy6vpwqoalym064tckuv25lf6v0lhfoxdr1pg7eub5k7xpmsrdaa7fnums8zhfi1bx082yl67ckidp9067cjv8boz9m1cyt87w7gjwag3qznsaeb59oqtrff8wxq02em2k9vhs4fria44a6',
                errorCode: '7jnsaobn38usje1e5hzg56hb94emn89sbh0zzzs3rfhvd7f5w9',
                errorLabel: 400510,
                node: 7734036329,
                protocol: 'uyndk3ah30isabk4qo82',
                qualityOfService: '4xli1fnwy7l0qzvjjz1v',
                receiverParty: 'f5bextpmhs7o4w5j6f05xsb848eqrrd5min5bpu8c8s5fjwjodngci0hmmlw2zaz9y21m4sw8j63kg7r2dtho0pfuto990albyzisczpxvtkpg34z6exiwq20sninolmjibl6l1f9p9l3ivebybkqeucw1ueeebp',
                receiverComponent: 'okljibi3u0g2rxjeofj88inen730kmcsr183xec86e07f1d6e6acrt5g4bczfev2h4i8ltr72956ecnpxvildtth9urxl42i4oe09eo4a3tsn36fxlc0cck4uyxzpeah50h7y7rx43i2wk0ln41kg7afy6qh9c6l',
                receiverInterface: 'yu44ux87893ehi8p3owz2tn8itr9l7ke2x8bvmidmd3qmcyevd6nvyf442qvzv51ydhcmmoiuj1a2qkd7tw6pkyb8etjafz20rgouwjl6n46prip83v3o5tp7xoeg2htsvh64q7zhifd61bn6w1mg4b5grg9esbq',
                receiverInterfaceNamespace: '3gav5u574brcp0mfc1so403th800v15fri324rmv9e2qa5hu2b3pngruqnnnksp0nrzz4lr1g7nb34ke45hh47zffsnr87e15pkmgi161rbk6js8mvw55zpudkm29x2t4q0pku9mi0lglveuhzrhwnscxskilqne',
                retries: 2167822855,
                size: 1055038043,
                timesFailed: 6111992865,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '6em3yt8txpdc00yctw6mzdsqsq7806ir1yfcweqejkku1vzgan',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'qftgq8th8dmjelj0hzy9',
                scenario: '094tw799y7unc0vxkm1997zfo8cqbyuvrookg6a0uhrye8sps8koghk3bllc',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:25:25',
                executionMonitoringStartAt: '2020-07-28 17:49:56',
                executionMonitoringEndAt: '2020-07-29 10:09:10',
                flowHash: 'd7z929csv69yh94embgi0efp0n8e0bapw9n22qi8',
                flowParty: 'cho07ketc0tbj5d1f5famik3vhhr4557n5ztu85j21fsx4kwlo3a4p3mjclgxm83px7ki7mvb1fnbiy7i078a2fmuk70ho7bxxnakjb3txtwor5boe23wmh1zllbg8g21w21kzcpmq18tabbytv3mbza7u4sasdf',
                flowComponent: 'ht274o6v6dui8vzf1h0nzzvnyp7hr9jepiedd0io3fj4gc86aud6onddtbzhn66lgk12hjp8iklck3gr4uib5vg7o1z9th8osqghp5ocpyy2xqu2lftj0fr00sa1os9l7c0pckt85543wrhro51wh7zdujqsfuqi',
                flowInterfaceName: 'xf45ani9w53vhijv3z7p94itsqay3p4hkzmtm8ysjmldap43ylx1vz81kby0i96fak3m2z3kmby6rgdr06drucddb2vjkbxq42cj2d77jr4g6bxwaa8nrbfoel0jycf57sksb4slg6k05zmmdle2nzrn9uyirmhq',
                flowInterfaceNamespace: '2g0rahhe8e9wueo5ttgvrda5zhk8indb4f70yntaeixa92j1pqaq7gzv6ui4tyjz1genlhjig2vl5oy6z4g6ja39kn9xpow9g6pgyeodxf3qtg0ng8c4vx378uyy4j7hbyqrz4zmn61ylh48y6z2qqv5iiqk96ef',
                status: 'WAITING',
                detail: 'Modi cumque aut deleniti sed. Molestiae et amet earum consectetur. Harum temporibus aliquid autem beatae perspiciatis. Dolores explicabo nulla nisi quia aut. Maxime qui vitae numquam porro molestiae porro nobis ut. Non in maxime.',
                example: 'j0h85s8g3lfjny6iy9g19fn48ldrp3bzhozm9wi3ayhcj8tb3lbo8jswijxq739nf23znae04iqyrgjrjm9lfbn6npnybmahai086oqg6zhd6wyjvu1h9w8p9um3oyry251vasx0b4fx5fsj4mrhwvgi548pjl1t',
                startTimeAt: '2020-07-29 15:27:01',
                direction: null,
                errorCategory: 'nf0lohnc2u261c4zuqevjtqtxwpw7uf8trj3sy5t9tj2tie1l57t4no9hqt4ohpy9dqaayxbdt01rnqrl9dv79t1bgiejf58zdxfayy2mswwgma63suzx1if65ilvepz12pqk7qov9rgv812tzzxvswp05szrt5v',
                errorCode: 'viannq63rsd9dqxgoxvs0075hhtg09ig93shr0h5qwwh0omryn',
                errorLabel: 326205,
                node: 9808408443,
                protocol: 'xfdwwvmygi3v9p0hyewn',
                qualityOfService: 'bglag05ned0jddv33qty',
                receiverParty: 'kzj2jdw0sdmniyjutmiejn14ka3xxyj6apor6lgo2n0m63rwvovtj23yk88kuhatp87mfzy56pk0gvloiibkiv2a4sjdx6x8aq1ispgcsf45sxfckjklcb0fekozzadizlgyocc5e3eoixvmqef5duzlwncqxk0k',
                receiverComponent: '6w9wm8d1xuiicoy0mp49wcshnjjxxkm6ldyfwcxikbqvlon7a6msa5n3all77hkeboiykacl0f1tfzmnff176e889sp3l9xx1xj5uishwk9t75av3yun25sjwdkrkqo1uebgtle9ilnwhri85b2qj2wtucdlvdha',
                receiverInterface: 'gxurjd79xxxcp9ytw9mdivj1vdw0vs4mdwz16u01b5bzvzx6rv1l9hkt71dp9ppel7usizmyj8b732v8tnnmq4sayzro451ohutm6chnspc2upiwl5hubjuxgdewjnubwyjkf4ts31a48ai468f2pt5qlqc6wzpm',
                receiverInterfaceNamespace: 'ayoo78lnn67mjc5w39es46gtb8y8olc18bbud3erpbbj3jqkmtrcu93x3vgd4h39w8l5ut5wqufqftlhuhgqboyt8s4yspuy60eutr1n6w57bng2dwi0m7do6crp8hiwdp9ytlzgyhyxf97b9skorn5u5wabdr21',
                retries: 5726709143,
                size: 9327819712,
                timesFailed: 8194414835,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '8o7gjrsab8o0k7v5y6i2l9gmk8gslt759fd09g8f3m6kioj6dx',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'd90nmyle1oibzg0flfgd',
                scenario: 'shf7tt095bfsfjx194ihv7nttce4ytoza3qfvmtl8oknw8nu2rc0yb7h6tuv',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:39:30',
                executionMonitoringStartAt: '2020-07-29 03:07:49',
                executionMonitoringEndAt: '2020-07-29 06:30:58',
                flowHash: '0vmiiykrivggl9qjkszelvbp8ytivtb5bckv13uy',
                flowParty: '7hoylcrcu7jxwpbdgb9364iplsj94syfftk4wt97gnq5btvv4zhkek4iiz37rv0owm1v0ny38r008ydyxkug2j3d22fovv4ooa6qcyxfee2ggqlh063yhxu3aesxrs9blfa64s1tcg4tdfnope5gyw0dl9z5nwht',
                flowComponent: 'frltd13hwwg9f6rydllg505s4b8hkg9atkspbd24fggwwsjgiztrho78oup3lb2r11rzdr1hkkb1skivsahwddk0980ju6p2wovli8won2tfqv336jntpyq4nhkabogqmes8va3ckpnp5wlm79gzxq3uubgpyzg0',
                flowInterfaceName: '0wdmitzufy6yss1j265ar0w4zrcnroaqjexvrmtqs2y5plpelryl8blkhlemxc6ewcazl7suqfwygjtvo3yg5et28sx3q3lbinhd9iiok5k30cdq9ohp2beo8godbt4927vetyod64l8ivj40bhj8822s7n6zsyf',
                flowInterfaceNamespace: 'mbsz4fqxn2pu4xwbqq36pyeox8iglgicceru13u6tbblorpeqqx9pjr40mbcl4opzdv3vy995d3npoibrbrck1fqded79x93iqul0puxi3gvjyss3939oa5r6qau8loo32oiwg1vqeiiapf9d4w63khw7h746qsb',
                status: 'DELIVERING',
                detail: 'Itaque sit consequatur ea perferendis vitae eligendi illum placeat. Et pariatur expedita modi est quae rerum rerum. Voluptatem maiores qui ea porro similique eaque illum voluptatem. Iste voluptatibus repellendus veniam sunt soluta rerum quibusdam ea.',
                example: 'ajqr2eqttjrb47h28h0i6zjwgk9g6ty1oky91pcjymcu5ddfm0ytfbhlcvvcb2tubpa08ijsuacbmsi85ku8l8mgo23cxxxvdrjcqmn6q1x9jj8p322jejv22m7yfsp0ovjfkm3r6x3klx81bmzom8k4fb90ibhj',
                startTimeAt: '2020-07-29 12:09:33',
                
                errorCategory: 'di18wh61mdgeaz4ytng20urjn3c2ci3hk6f1uc3aedufmc8ot45tohwuabpmd7pfpyuowyoykh9namhxxe7ytdjchmrvrj89qm9hws7zml09v5fo7t56n33f14aoqp5344gqm9cg94b3ezgtnm01d86goed05w2s',
                errorCode: 'r028e1jnn060ptzalyd2js9be6s47grgbkzxif492kpx40yci1',
                errorLabel: 382410,
                node: 4066958207,
                protocol: '0h9xmkr6adwrau3adhjb',
                qualityOfService: 'ba18dlma1qtps05s2s1a',
                receiverParty: 'oytk6vt2nbhmiy7lci327c9mrhrde875roljpmtzi8hc9m23upp8bex3f1v7x546fkpekck5s9x9b85ut4lk5kogkx1264u74g6h10moqv7asi6n7ywpko63hmilnm0oxq5mlkckzxnznzyqp5y3vdpiomnyww68',
                receiverComponent: 'mrkpehn1ipd2q9lny3gcmmurezl1wz7t1j09licd7mnjgjl8o2tii7zbwrzt9vesrpdestfnt7o9iepm4xkoezv6pv2f5oh6blyxwzr16ri4k16ix3a48vh83s37mfu3sckcdquzigw1t99o6wwem8emre0aqptf',
                receiverInterface: '0h9k6kpyha3c0y4z5gegt1md0dy9ykkdzevdvsdh1tir929rgzljry61avmic5qbke5frga09jgsg30dvw71dy4alsbyyfxi5sfokvwgc3j3bsq5jue3x8nvp2qvhwxc2c4bdfucqjb37x2r7m1wje8gpw9jd5bu',
                receiverInterfaceNamespace: 'yztao5hd2xb9sh6bhnxhct0pdikt5eww6x4bunqg4z8wreo7wbbjqymrbxbqxml2aj7qsy0g3qjhk4ofefkutafnchnxsakwin4x2z8yuyd7917x4131m3w6q80yorp56mnj8xi2nebon95pdivhova1loaqejiq',
                retries: 7626383134,
                size: 8565475478,
                timesFailed: 3001156799,
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
                id: 'o7ksrpcafa1732p3yycq0sfgc83amcek2ucex',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'xw1fx0053w6gjinugumksh1fa405isj33c7gjmnq09ajsnjnod',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'riu50xyop6oomvocd6zf',
                scenario: '8syjzvkam06ktkjw79s7763b75ki4t1lm17lrmcerdak7abwj5aj1tgw5kxr',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:16:28',
                executionMonitoringStartAt: '2020-07-29 03:17:06',
                executionMonitoringEndAt: '2020-07-29 12:29:35',
                flowHash: '5dlotnjfvpp22vz993gycggrhardmdsd5jsue1o2',
                flowParty: 'p8potr7ihgbtd69ezvh8b4h8gzec74zjr7rgvo2lq4r7908bjuno9wyo61hjuc4xqiomd3emk7h57509a5pokqoot2ipk818ryis9cbson8hbsmu0xrsudpalnokhmd6qfal4178dcyp2ojjzs59s55hmanzqaaj',
                flowComponent: 'eueemnn1c7umhyyqr4z6i86gpz1qsxnjdzh81md0snquo30qvjl2r5tam2jnw7d4xndin2skjg7gsoydm00y8g4ye3ap3o6p12hgcb2kg32tm4u734veh3ds5ysqikhgoozjzetec0o5t60aoqvyat3r916tug5r',
                flowInterfaceName: '8hiesigjhmpnbupg1ss1cqhpzn9cwbk4t6gkd221sonqd9kmp4cgtfunvh186ld1p8u9gfx7l3pmsk4asn7oecsgoyt3aeuhuu8bxephjkll5k4rc0cjcmrljjno2khjqc37uwa81n4rji8z4x5ivrvfetpg0h84',
                flowInterfaceNamespace: 'sy6wf1jo0uynr6e6yshal52k51hbum9xvxisfgj018u16bijki2j0qz0ewhoy4c7yp5ue1hi72tfvazl1q2ziypzlc9qrzt0v63mhwmtdsjrrzlkjiy153ur0oawdqf8plb3d4nddzvt6flh2ztm0q5uv1de0nny',
                status: 'DELIVERING',
                detail: 'Et facere id quae quas assumenda corporis vero. Aspernatur officiis nulla. Quis sint voluptas ut qui deserunt. Eligendi eveniet neque dolor qui asperiores. Sit repellendus dolorum nesciunt qui vero dolores reprehenderit. Ut voluptas et minima rem.',
                example: '47v1harfl0o80nrq02m623pbrif81vixwkk1hbudwpdrkbrji7nb27nudzjwadt2ib1vtt77awbac1qgilojt0np21txw8k7kjs3k1963j6g5kce6nwhta16p80u761q7vi81seh4drhg9pu29vnyc6ig1j0mbl5',
                startTimeAt: '2020-07-29 03:24:22',
                direction: 'INBOUND',
                errorCategory: '09e8w9lq8nsqpe5obirfa22x2eapxg8rrkjr31ovem1zbusvhxr7dshntuuv4neysju3kaeiq8p5rrqv7ywqcbgxkf25i85tpqlngmrqneitw5c7jpvp2fcoqvua6i8z2m4oz15y4mhc3xdbhc86mg7eo341mbrp',
                errorCode: '5e77482c7t4dkoexf4gue6uh6737dbjcu2qdtxg3opezbqgx7m',
                errorLabel: 920832,
                node: 4072991160,
                protocol: '84zusp1g6vlvvtrhla4v',
                qualityOfService: '41zz6hfgr7jc070ov8ph',
                receiverParty: 'prg48yqvw8aqgxqawouaxbxbvdbctmxu3j0slrhtshdrirlp81n66mt47ndzh2g7ddra0vgricb9cgdfeci2bq9s6our82ltez9lkk6zmo8093rpvasg5rs8t78l058vgpbioxmeib71qtvwhpbyjyn7yf3yjt9c',
                receiverComponent: '5ylji9xx530fs56ek9stxcm7bld5j4tptkjke5giwcuoocce59t0682cg9h5du92a0aua55dq8fyyc59hflcuu0sadcufj4n97u18x6r55p46c1yzh7exwokqsetrglfr2dyv6ittog6bal8vy3177gdjvfy9owg',
                receiverInterface: 'chkvaz2ta9wlngc2riacsetaj4rg5thilj2krs8e54hoaryucfhbr367wrk0hlfwfnmbihrevxmhgszwsndjbtwvb1i9rq93v87332zqi1dg68t938vzux8497x18kkjytx66i0907aw7ron9la5er7vbnlkrxyh',
                receiverInterfaceNamespace: 'i2fm13ahcnvz8dzzp8akogxv45p4553w8fmbswp8y366ooklxjtid5vgduvg0c3vtv8zsnm8k9vh8d2p8v7r065jsjl4ptlw9qxc9bxw3mirozk0beqlltb12ic5rako9jr8ln47g426384qc6xhxuag6kvjr82e',
                retries: 4546144091,
                size: 7209726406,
                timesFailed: 7255848475,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: '21if1oaosloh1f4g00v2wtb9d342blfjneotg',
                tenantCode: 'bixc2p8g5jtrbcjnhp2o41qqng19jbh5c7qz4xsndhbbgqhzgu',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '88eq2muxow18f3v2bur6',
                scenario: 'jgt4dhq6af0jkpjq2xzrnw44mfpzianpyfm0tot5b325lggi3fafdnd6o334',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:23:31',
                executionMonitoringStartAt: '2020-07-28 16:10:34',
                executionMonitoringEndAt: '2020-07-29 05:05:44',
                flowHash: 'gxe4tabjk2yx7vx9uqtlaa14hycgj2kdrode4xkf',
                flowParty: '3bj0gndyjwzrrgpx391z557bzao8f29zfxe4wttr65f7usep094marl34l905ompomxxbedckjz79y2khxlttlhzoxbsiupz0ba6rz7agwgdp0qjxi4k83we36k44jfz3acof7khbq2eyinwnkboqcxkxyos9l7w',
                flowComponent: 'tlfb1yy5v4nyoy8cwg7ki3gh4evaqyjpxqcvz6cu5onehv012ijy3f1ay8unbpw8n7gl5hnjohf2em42b5ytc5j7fb7yflwf9xc5f7v9kjiyj5u9yrlh2uh9jxm90q4216teugvpn8796rnjtk2515b37je4ay96',
                flowInterfaceName: '9uihi7s4xvb62drfsxfxwv82sj0s5fwszecos56ujs0w7o04es0heombws4ppgafu6v569sn7lq12pmtit4nc4rgl5x664es8n9fz4ihzeld4a94x1se7szqn6twvpdgk971hd68daa8rsgoue3obf3b7433f0jo',
                flowInterfaceNamespace: 'fhf9edcossrxa61ciypymzkg97acoq6vl1ko1n7f3o7392ibz782srkdujf3w3ijlr64qis6yjoq2pwuxszi6voo2vpjx8h4h9kitns4yyddo6y6ljgmrygdftgwfxx7rp5315zosf7gra1dduczvmamdomoaq65',
                status: 'ERROR',
                detail: 'Ullam enim est animi nisi dolor. Consequatur quis architecto a aut illum nesciunt. Voluptas qui aut alias fugit quo dolor qui. Nam rerum commodi non magnam dignissimos. Magni ratione et.',
                example: 'gik4sn1p19cnmnyzidi74cjquof6x5y9wx8xg7tkxak1tff50zcsw7xl00dgr24ie6drqivz2el6wd61uhkqtak1lwmxoq81xwl9yhl2buhcy037gxiilmhzblthceqbjtamv4i5quhphr3ak7alopfmeeh08qz6',
                startTimeAt: '2020-07-29 12:10:40',
                direction: 'OUTBOUND',
                errorCategory: 'zl4o0656d74m8bsd9xmahpfv3mjbcul1t5f0prqlvged4rump25cooeuskn5uj88caoyhk94i951f1ffw7ib9jbf8kw8o6hwhddob0dqehrhkzquqjqlzyuvt9d2rn6t6hfafp0avd4tqaiie4ls24dzkcxazi4l',
                errorCode: 'yk2j6ri9bo4mpvml99hx5e09vpp27zgy51q562cf6r9rogk4yc',
                errorLabel: 608692,
                node: 9232415269,
                protocol: 'rjui3mb7riqitbdp6k5r',
                qualityOfService: '4ritfygg4w6nlbmgljri',
                receiverParty: 'bcingmn0020e1tg0fp4uj50k57k9wipisvyqqcc3d6nwukqj6gwww1tbkrw7j64ol915y2zelj5z5eptey00nw178vwy5f8lbtmwhhzlhnb4kf9g5uof7u5h4w7myrai8wde7hdgeps7yn6433ne4d2w24nzpmv3',
                receiverComponent: 'i6zjd9g9q2vkaz6w9elr9uhpxucu7xv5lelnz01jxvatiwiy7aciyhot1otpadj1k31i53a190vcv9g2qdg7hhkepe4w3k0en7nl9r2pslzh26uqgj99a002yfgqqja3627lxl86lwc520h3d9qzs76pyo7q20m7',
                receiverInterface: 'zdpfcpr4d29qgtlfmdycf93szge938bbnwy7e0d1g9e7cdjwm18z00lxjvrppcvue5ujhq8shcyjhxd0h7hhaswksyvf0eatlcld5n6gh8uspbkpf6iswih9zj1uy6z84h1r419xkrvureft1a0t6oqu6vvcg13j',
                receiverInterfaceNamespace: 'f1juppyc6k3he23zeblnmglx532skhikl0r470580fyxm90cvqkik3vzia4zxambri1f8qbzyuhhv2b4j4u96pl7e27ltutnwvm7znjjrcb4gztc3eko0fzsoaarb6jc2e7vt31brbogizx4gw32pbzn1oae9c0b',
                retries: 1747855059,
                size: 8880069506,
                timesFailed: 3627116172,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '841gqx9d0nqcwvsf3o4ev9lmudd8i8zrtzv2gqfbiyzmnbg93a',
                systemId: 'voicx2p6zdfe3mk8agp1d62xb01onnsqx7788',
                systemName: 'oum6tgx7gtz52w8xjfvc',
                scenario: 'xsr3kskrqxuvwihl0pkw6zzrk9u41bm8kf9jsjjuz2oi2cbauaek6bieb7cm',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:50:33',
                executionMonitoringStartAt: '2020-07-29 00:02:50',
                executionMonitoringEndAt: '2020-07-28 22:40:19',
                flowHash: 'cesuw371xdfba6v494nbh8suwq6c1yuqweqyib39',
                flowParty: '8s971dr4z2gepn22h1ylkzjk3rm5txglvyiijho6d1c87tn38uu576v0zheikb0ri3t5uq4uou2bwasbzrszypsy0jffcvuazf8cqpq0p50almh4vybesozp14tqodp9j2g813uwltm3b2yfvqwmxcxmlark0unf',
                flowComponent: '5i29v2zjerr0gy6k7cq5gaam4os9s78h2z72q6fm4gqsxlvwbw34dwlignj9eo3j2128exk1tzbzdyci0n6h6ximr9b47fn72z7wa0wpjkr94rt17cf3wyeg074xktvx1u1tvfn4g4z0ew9xbto09r0latr5fduk',
                flowInterfaceName: 'jg1u9940x223az22x8je4q37tkpcr99btx2k8m92n6yaddagyeyroihyyqbo51dtkywt1oo7u3p0eg29dtz8680u0ygqr8yv43sa7qstngzpftupgqzv9znz7lxhifnd3fu0kw18ykt789ufudul4svzvysjala1',
                flowInterfaceNamespace: 'dg5n7b6utk0lccasoqvgy1a4chaa71vqeny1ssherjq10w3jejdan8ypdc15tcs522sogb9m1m3nkao9ub7at8zw8b4190ap0mv0inmijwnye8xikzl5ve61hjn1b79b72vdqiwctv5xwv1zqifguw6ckv6f5xf8',
                status: 'ERROR',
                detail: 'Perferendis quas qui itaque provident. Perspiciatis doloremque est nisi exercitationem sit. Reiciendis ipsam possimus mollitia.',
                example: 'npknzqwd4em3vlb6fhxvb534vbb7crlt376baaj3pbeqqbhbv4gx765jmsqhgriw6cnk5bf6x7z7363igcqlw6ginkvzoyx7org2lezqjt9tca0xbh0gycsyc20c7xw04ccvudb20au0vqgn4fdebfecsxfybmzn',
                startTimeAt: '2020-07-28 20:29:38',
                direction: 'INBOUND',
                errorCategory: '40a885a40pfd0hut65h6sikty5sfc7025k14j4hvbj7w8t8ic2pfqwrfd4uuv5prl5dw6hl8l8ksqgyxlj5yhkolk41m1kn13tlv1dpcatfydgh6efittcrjmouut5e50pn0obxkm9j1irqf7c045djidnjsy8if',
                errorCode: 'nlwnbfsjnv36r2w9x31u2h2uu7ls63o733dkcjnx3iublnpgwb',
                errorLabel: 994040,
                node: 8500422253,
                protocol: '86rrinb5400ymj8kb84c',
                qualityOfService: '5kotkhgihb5mmvneyk97',
                receiverParty: 's9xgw3ymuq744fz6cfqwfstqddk67mzer1rc3zvlt4zkyj4bbwb1cp9wv3wu8issbdkx9wd5cbu6md5j7dtwqnpo4zbefh6qicyy7i765n56gbk9bk7o4f8uhf4gea33t1cz0gjvyukp95r4pj4nwomt1ezjdilz',
                receiverComponent: 'jtdhcyux8icd4k89r9mtblg3zdoecmv07j9t24sb2b5oujfl20iw3pm8h71k0fod33146sgv55nif0orkx1y8a0u7ndl5px5jv7k8vmpkakz8r0qk51tm8vv2bw5e1vsktrivb9ese6smeesp3s1ihsahbk1a7jr',
                receiverInterface: 'cddsaojm3g2fc32040y870dhowd453d02knp8tajk8hje8loxuxdz0gw382d6l3b649ch8i9aarxv5pjy9sj4xa1grwz1zxv0bks6klaxmhr0o3txkssblroa3hyzddp3ikns70jrny1lfltu9kyjw4nx51lvudu',
                receiverInterfaceNamespace: '4mcd6ds7rs68o9qetn3h1gau43uvmf8o7utlrnhuokh2ni6zc2641plbc5b9k8qoopcj63gwj0f7e4ozzy3x50hn1tvwuub6zi3riikr1ibcep7j8ty552w85jx1hc8yv2i40otlawogtgt61nze1u0l4oihgp6n',
                retries: 9168776734,
                size: 3186317934,
                timesFailed: 4592456006,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'a1hd3qmkrfiy09bxztuaigiysokwkgu33f6isemo2so94fberj',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'i71vgwyx23t4sndwsa39',
                scenario: 'aseiba04mzbnj5n5uweo5guqxlip00kwuzf24x8r5t4v6o6qqv0qjcwdo4or',
                executionId: '6rb8px4wj77f265cubxr137y8dxa16clpjnh5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:34:30',
                executionMonitoringStartAt: '2020-07-29 02:23:52',
                executionMonitoringEndAt: '2020-07-29 00:23:44',
                flowHash: 'svjo8903b4tlsw2j9bqeye6jwsxcdussfp71eh7a',
                flowParty: 'ds4ni3kl7npeurhkkw3uez3sy8jyfpaa56rxjtiqwjpl5jg4udut5vx22lurlxazzgrsk50m992x6oo5z71bwf0zmsqpiewntabo2wj2s202smkeo086etbyia3gu57j8tynkgoowtjz632geldm1h183kbkg26a',
                flowComponent: 'j43jnwbkjond0xakaxyf3nt2a0oc6b4juajnvbjzy4gtkrlgpbjz53d5b6ky1h295lpw31htrl2f0ija9wi2o6jv4ufxb7h0j2oreewlarkgdwpb066fbasavqvt0lt046un4lvm6dq2ie1z1mk7iy0koj96gk87',
                flowInterfaceName: 'fm7j7m595ple8bn20tzwsdx61t1afj15i1yrk2mgmbq9gxrsw8ex4x6ihumd1gadgyt6yhs9b8mcc9clhzadh8ab4k3igmub302ouc1zsl2qbz9is4r4oq20rpulp8lsx0xdcy9wys3ymgf779rahnaejum9h8t1',
                flowInterfaceNamespace: 'hro98155rhn443hgkwvq62s0euf22arkf9eux70ry41gqhvjrniidf7iqd1jhxvvldk2hxw8n24sv7lsfehx89jtuyxz99qh2dlabqcr6bc9695xarmtnyqquw8fttq60voqeviq0zv5n5ikk8trw6kfp1cimyv2',
                status: 'CANCELLED',
                detail: 'Error explicabo repellendus numquam dolor beatae repellendus. Totam labore suscipit qui nemo reiciendis natus error. Molestiae impedit ut veritatis consequatur reprehenderit id. Nulla rem quae quia doloribus corporis nam dolor doloribus. Ad iste repellat et numquam. Ut et sunt labore.',
                example: 'gps98acmyeds89i5gqql7r6dywkq5ewf9pcfzv0q7tte4rukba4jpqhdnxxq0ov9eqzym9mgqgg7rb52lc6oe4qsvtzi5rk0j7zdqoaio9irepi7w6zaghjwgneankfmh024squxn312bhqqgnuy6cl01360u822',
                startTimeAt: '2020-07-28 16:54:14',
                direction: 'OUTBOUND',
                errorCategory: '7qfdl7glo9hyi44ikhpasl5n64qkwvpkn3hys98zb96g2fhehdvw4z5o2fbox5oyiuocbobxgfcrhi3xhqbwz3gb72f43k40hm768wxvuq7tubeqbwah3dgbmpscdue5zi9w6pv2blchxkuwjvp09jx82ircbc0v',
                errorCode: 'rdcsyeki7fellexboiapzdifjdlk7bawx716li4hjdh368ksx9',
                errorLabel: 515137,
                node: 2104619511,
                protocol: '3gkj7icgb0p8pv7r8ers',
                qualityOfService: '1pb8zjzz2l2sp4ernpgi',
                receiverParty: 'tjkknru7690qa5d4hv9bafo6m7cgxgma13v61os2jmvwhvzdglye7a2vxxhgcrsh1vpjh864i2mr1hsw7yf0230lply1n8ruieq3p2rsm6cef5ccvpmlxe13hcr0lxrnh4obibzff7p3w64rnl44hc91pubhxkuy',
                receiverComponent: 'mis6rpihybyozttuhahpdlvk695h0xtmu36yr0qaporhgaibypk9vv15yzbg4pi667xo6tns5syswbgq1eof0bbljwek1cagszqpk9a2vpcl5j36a5rgpc3nnzrj0l9afkd5pi4g4gu8saqpqsek50gx3pxno9c7',
                receiverInterface: 'u4i7od7xhuz6x2i8cms5f044ecjgpaaloc6tyalfw9938igiguwdsbomhyaxgoyqt1jqoatteouylwxyry1imdggq9nsamus5qauviitd39jhbep2s3ish4tefdr4wqbp0qh5r5k2io1or9v7ganwh3ur2bl0s62',
                receiverInterfaceNamespace: '8cdau8odooyomkws5wvcg9zcnaibujl4trfd5072tcwsrouffs527cyrqozkv1ndljlua62u4hnklmfqbt8lylgcgrert0gn3uc4rwd6wmyn8dwhuu154bukseo66mgosln6djh9fyn1hjgfrd7witkrsgusd07q',
                retries: 3921314245,
                size: 5265517219,
                timesFailed: 1630121957,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'stul19v2s1actyrla342ddnmvztjq3ziwgo53s4spd2h7suaib',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '2n6pycit5uugkb64y6jf',
                scenario: 'ouqg322xur9ohgnjij208vnf64f5hdu320j49w8g0zw7e83jtd3816kam4te',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:58:26',
                executionMonitoringStartAt: '2020-07-29 00:28:42',
                executionMonitoringEndAt: '2020-07-29 01:10:35',
                flowHash: 'wyn9xct69g9oc0e2ro1kk6fguhep4uhykc01h2pwo',
                flowParty: 'skkqpl4nq6jmp39iaxj166247mcl0uzca68c13j65nhvif5lygorg6cwgesew5n83h8ls5rd6cqrtzivm2y6j24ia3tzijajvwz6060kkv56plykt5ei9a5wwzbxjf0gd8d14aira6th0tk6mvhbldkl7yvci2ej',
                flowComponent: '2utv2f73oyjpfd33tqnuz2u9vlhtr2hjr1qt2hsfn3xgf6gzmmvkoczmuqaf2ll4feq7uwv3ukakecomgqnwioca9o7b24f2w2a2zkef6i9g4th7w156vdw66qbn4zt77q78pq348phdgrgue30iymxlgtol0yv2',
                flowInterfaceName: 's0hefv8rjcf4ctughfi5tqrbmowg84fijrdcap5pgyxawp6792oihgyw5izo6npsei56dxkmjdvnhleok9pfhoz8lgbkox56iyuphi1u1ioj3lx6krcrluupesqpaxt37agxh2eh7irgt589y1uzrtz3owryyafr',
                flowInterfaceNamespace: '41o2fngtz0pyggl2ix8yejnr1uuapbs9pf5671j7i28j282whlhfwes7mzz5v5bfsoe35zz7t9dffkq5ewz6kiub1st43lsx5run82tx31uxu9euxi6ulf9d9jhfoecmlpi5ily59844zkekbri9pwaifx97cps4',
                status: 'SUCCESS',
                detail: 'Doloremque qui eos eos. Enim unde tempora ad iste nostrum eius. Et quisquam maxime porro a vitae facere accusantium mollitia ipsa. Earum rerum animi aut. Iure voluptatem accusamus enim esse rem assumenda doloribus natus delectus.',
                example: '4hddah3252tlxa2f70xder5iw0n95vkeopbtqhd6pfohqiplgw2bs9a1avdt81iz42pfcjvbqvyy1bmb299ssl2o6rg7cjpfhep2pdydhahqcn8jonaqbne1s6i84vml2lxzepi5jok2exdas19rwxrlwsbdx1pt',
                startTimeAt: '2020-07-28 22:35:50',
                direction: 'INBOUND',
                errorCategory: '4hkp5rksxcq3nygkuu4b14bh7r7pg10np05xtxo2v8k78684jgu9zlpqy320gv982khwv1xf159rg93qlpv16wlb7s2uqeiealx1xmv3xk7itopq4o5wcoxjxlxdk8t66jlje56g0g8cd1wvnpik5ks1or5h81jg',
                errorCode: 'w4lm7dsoe9capy4xi1yrwuxzj2easv0vejfypzpm4vh77lkrga',
                errorLabel: 289928,
                node: 6161710499,
                protocol: 'zwct142pzidr3vleks46',
                qualityOfService: 'qs7p4hcu0tv4sacmggde',
                receiverParty: 'i6mxtqxxx1hm4ayqodh9w0unz0p8npl7o2yu5yd8xtbqc4whucf8z2pkj9yo8ojxv9yi0ljh3f21jgiyxpuj3ici5jcwfgz3yke13jpognptxbsm2tzgga0khtkcqahfd11l2j2s716i8qugo9hw9qi3q3dkld7c',
                receiverComponent: 'y5mtcrrt1adnuwisjghi81h3gzohrq9q3abtyjao7bal4iwbj0ui2xxvquj0ircfxnjvdvp1i0ehlsd5xzngp4619nc3zc787zlccrf6yy4q58ah4j4dl1ikcwrtagj6vqfbdudccb6n1005lv3i7jwq8hjob49s',
                receiverInterface: '55nviz9hvgzeb9tm2gso9fccyps1n5dkxtdcgv5uhuujacn8npa73ak30umycbpwxbuz9n6k0icc5bco60j7f7jev3gzb55w5pbgvwhz072rnhgt45gv0o14tgnbhw003vtngrf9eaq84j9ngoekgi31g26pd3r1',
                receiverInterfaceNamespace: '3ib7hes6swjnjxde30xreqdso30gh7a3f3srhpbts4h53c1i00c08m8390sdyev4tyj0qvqa5j5qmj4qu7fxzmo4o04jdpj72dr4xphasdcp0ciy1yydmz5s5jjto190tw80lh9obnvrq3u3o9024d0a6zfgz5nm',
                retries: 5100577036,
                size: 8810422299,
                timesFailed: 4281133379,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'c20o36wxsn04xdk1k7fv5bxyacfr7z2jp7uzjznw9k52ppcaa5u',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'g1hbtq17x636ug16h0ox',
                scenario: '7w20eqoxk1xu0wppeqw1yfg5bvgxcym5jcp1eb03y888jjg34uy3xdvc78w5',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:18:35',
                executionMonitoringStartAt: '2020-07-29 00:35:41',
                executionMonitoringEndAt: '2020-07-28 19:54:13',
                flowHash: 'rx52d03biongopi9las3oa74plr8f4ml0nav78op',
                flowParty: 'vx1aom1io7l5uwg86o2emv81b9rvfzxn7n3lrzxj42u2qtf7i27ljttilr76apt4dv81ikfo3hnyoa2emglxeuvnt06w9texmioxtbc1lnn87iuk01er6r8z85zkzo8zbing8ias6s5v6gueopll3d2zanzvq16i',
                flowComponent: 'dfst59x92azk15sjgdg322qi4frg11a4z7ydgtw5w27n7qzqs6d72xmztqcig7q0cnafqtqa3vf2cjbl7k2mm3ubhmg0a30bsn0s22f7r3ya5c4m32ygygfjc75ri8mmjw4njhwkmrvpkefq9q8et0x8y7sm4siw',
                flowInterfaceName: 'hnx3nfq7wxl9wijvff82lwp6anl0rbo69mnqwfx0f1saav0lyaxwgw7fneny3709ydmgmygfyy6yhdsuak2lyicd7bc8wmfoz1wlhyl6psibvqvl1t35i37uu3fqu4lrx0vf31omfkbz1aw6gmxhpazt0camjryc',
                flowInterfaceNamespace: 'lsp6u24wuodycxymg8pemrzhwtob7lpm2zu9yazottl7qkjmio4gu2qnr4wr8byqib05gu7srvzyd2dwrehia5e1hy51613kww45ce0m2i6mc77h7vol2o8dsl4wfe0andki27y3rxq0dijmt5exxgj9aalgytpo',
                status: 'DELIVERING',
                detail: 'Quam incidunt enim perferendis doloribus. Ipsa velit recusandae natus amet accusamus ea. Occaecati veritatis et modi qui temporibus nam.',
                example: '0dp3915mddi3jcuwhl0fsgd2gjq9grosldaht533b9brgjg90red8u62m2xwbjtbog9aez606o0qu1w027096sowi3i7wfj5gl6mgb0dkwu66nw424kgof66r4uk11wsxlvn2dgruydbdneh80hwri28en1x3jwu',
                startTimeAt: '2020-07-29 14:31:18',
                direction: 'OUTBOUND',
                errorCategory: 'nb4ebnp0pt6qrxkchmmk07ivj6agg0t452rrr025xbcgk18dop6fzrtj27nqa1sp4m0ycykzs54464h8wm5bfwza9xgtm9sdv4pcbloa6rrem9uv1lb2jpufeq0ierhox5jmwm5f542zyw71lnm7npgwm6rdf96n',
                errorCode: 'qgh58rrc4xjb27ssgexi4y4wq410x097v17t1fazy6jr9wlsl0',
                errorLabel: 447455,
                node: 9337926919,
                protocol: 'ylux7rmqgpgqq356xk79',
                qualityOfService: 'fnz6cjils65nuontfp22',
                receiverParty: '7em8oq6jmfzfjhkblbg1cqurz9bcnq3cippfcbpjjih7rpisslz7k15fw9v2umx9jucfsu6yvxaafuvx23szpdmkx6hq924n6mbvl6hpnj7urzr2cukzkb2y1p5t93ejiubp09b8x9jh4prs2cexpp1mrpl9volp',
                receiverComponent: '4oxko4nkkzlzcoj8y4bnmwjj1oqphxvm7j4etverzaak302wdgzhennm9mjedhann0p4sj0qorhh3xlex9obvz4r9hw7c6ekcap1zsigrazvunyvrhurca2v9xd6s4cmodkfhyx4otz5n67ljul33efc367yn87t',
                receiverInterface: '4clhl7jlw4yykqbpjjeemf3at8982oue0i4ywd94ys1yrzikatmq9daft1i75of970vj1buqbgjm607ncluevwtih4s6y2x4lxh14iykghtjuzwqom43f8ufaftyugzd1o1fbbnk7g1td0x4mr2uby9pu01zxj7l',
                receiverInterfaceNamespace: 'f2twkj9tk9nv5kvurh5lvtvct9zi3j45wuoga6ye8u1vr7g7oeeyd5hpppd2hw1i1cuok7tekvnnhjecm35b94laaj6t4q071p43o3pnaus8gx3gp1762r2ef8tz739cbi3npnmdorus9ap9ycvojpg5ohfuv2ee',
                retries: 6848928149,
                size: 2351367096,
                timesFailed: 9086175035,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'cy7ud0fguinbvq40xqjj4kc7p23tynby2t4pywk3e2y7wre21d',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'uiz4rdn7p9321a6qpkiz6',
                scenario: 'ko4dmbba3mi62uq720065fz1ue591nrvm1cyfbtbn7v8zlofrl3ggtbcl7rx',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:16:15',
                executionMonitoringStartAt: '2020-07-29 08:24:37',
                executionMonitoringEndAt: '2020-07-29 07:56:39',
                flowHash: 's4rdvawyjwm0wqmzwmuy2rnsh3tz4x65nsusd90b',
                flowParty: '7ccntirz18hwejgwsh2pt66pmlqteotfh8nzfox9bc8e5x3ravwrtlefm1tz668kaxmet8gm5h5rult6ssuqjb6vpbcw9gm5zvi09h3cp3q6hhn0ahaf7o62y7q2q0oq75ttani14lerf5w9zoth0nlvqi6dc4e1',
                flowComponent: 'b7q49vvvu6g7j5hlyfejwim7buxuugii0exm9us2uk73csgwv606vfllutohgxgok68hx5s1uk0xw8mo9pwcroi8o0cc3mcpwql2ars6ralogpwn8vp7wuyglm52h4vdctzdqq86ehqld0kq9cc5i731r0dbq7qi',
                flowInterfaceName: 'ayrgpld6dv2rpiagk8lvq7swrlgdkkwqtcxr4447up0xlinbis3oihxvbre0vzobmwt0x0e7pe0ddnhpo67ohwkjfpy5agoqe0x6p0cx2dnv2fm3wf3difgxztfullkzum5eggmhj2a6iemul7z0fjgpc4g6wqq1',
                flowInterfaceNamespace: 'a2mxpyu6h4ybppor98tsdefldyd0cmxyr4wg8qooqnwbksefz3hl672oktqex2rijxod645nafrsa4sg01bi2faao0cwrd5htc3g08mmjunu2twrlww9kg2f6bng9albcwuut39r8hco2o5u5luf54uehwmfcmd6',
                status: 'HOLDING',
                detail: 'Illum maxime eligendi illum minus. Delectus et et ut dignissimos dignissimos autem sit quod. Qui consequatur et in voluptas ab enim ut in.',
                example: 'ljidyzppzksuv9dt25r75z2ti8v6g37gzyyyfjeskx3ypo8v11ozatvj79e1ueizm5gjof4bcvn21wctu88l43nuatacwblxp9z3acx5lhl3lo3r03a0fxdnmot1nvygev0m3gqagf2qsqhzesi633qnoguaq9zb',
                startTimeAt: '2020-07-29 07:57:02',
                direction: 'INBOUND',
                errorCategory: '1i8e0f6655ztu9pom5zal82m1rsocr5nonwh4b7rwpr0wq6hr60b0o7zha71hv9v1lucg4gp725kxcs065agesocl7dc30ellatw27n22alhkry5rwakncxjsh5phr21whly4x8yj3lvp7gny6prljnpmyctt0ov',
                errorCode: 'yznhqfu82ja2rgr0at1w0qye3bynm71twn2e98d7vil3xg5w5m',
                errorLabel: 240852,
                node: 3059888790,
                protocol: 'svnoh1lw3t82o0uiwgxa',
                qualityOfService: '6gwjw66bqwhqpj8rhwym',
                receiverParty: 'v9wrakaesjgupv1wp9p5qenmyc65nn354xib06rk64zek0zv7v5060muxtlrtgt96jlxy4xoyiadrhzz3w1lyzzuomat4qkngb7st8i3stg1lxdwze7s38rkntiq4boa3u72penzxkfve2eba1lgr96orpet1d6w',
                receiverComponent: '0dcndgiluleegto2mwfp9y5v5yycwrdh1tbxiy7numkdb6fbhlhydlrxra77b9zfkq852542qrkg723ex8awt4jkbeob1pjbk0azyxuy4bvgxjramd47phrpw1ywmqm05acckssqbnrmpsdq027conu28gehfds1',
                receiverInterface: 'wuxa6eczcj8pg67pr87gp9tm8g4n7xb35munxcg81kge2ddvpirb02zdbd77a233q99l5so8709isd9g4dbd0aocmsv9ije3kvtg70e8qv6eg9lvqz27z9o7no5m26v5z79ed6dynu8ul4qrhpjrt0esf1pumhfu',
                receiverInterfaceNamespace: 'cvo55nkvydakvoz6vlgsxco2805hg3dvtna9zf3gr7bfcinywpwrbaa4xierq7kr9tknpljgkvq4lvf3vutzl12hyt4vbcxw846670rb5mf8zcsix547mkm8l510dr308oekgyyv2kwvmnqts0fhebs68zn59t2d',
                retries: 9676758292,
                size: 5125400245,
                timesFailed: 6373518342,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'dy2uh843s7hzkmiho4gqu5usr7vrynrbzjkwpdrghrgh4230hf',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'yxti3rqadiwby2nchmhl',
                scenario: 'ao75ejroazmlmo960b0nya1st8dah9hm26r8mzh3z3jki7ehe092g988fqx1m',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:18:33',
                executionMonitoringStartAt: '2020-07-29 10:46:06',
                executionMonitoringEndAt: '2020-07-28 16:56:21',
                flowHash: 'j9ocp28yloz8elfmtt1szzkuu0mcpwhq20aalb5l',
                flowParty: 'bu665taa1jq03k55o95mf7847e4x10w93kb47x8ebli0of238jfxa2m4u0z5g2wbml9smfakl6s0rlx3u1cu9fi7xgd48idtja7sgn60zyzkuc012m0deccnnumw4umyc1h62vhno4202wiosk47qpxq735pdi22',
                flowComponent: 'sfo1ial1dr7snqisrg5tviedrtkpvumteanva0hiffk2zsj4s74dmh16ggorx65y3jtz0cwbnw2a8kk9xlmfx5guu4wfmjvfm3g23drkht9ifl902yz4dw6jxf66ewdppzltusswv1bnjjf4yle8h8ert4i1986n',
                flowInterfaceName: 'fthf3pp4uk2kjj5cebdsarpe8iwjkagl62udcqyi44pecvcb8khktwpg2rztz12a059ie6ty6012h0trult9epedatvj1g5il20dqggdy87lnnao4d9wav1dm0cep4zxljbyabdl89j4kth37gl9sdwh9pff1jrc',
                flowInterfaceNamespace: 'lgxa9looe1qzrwt7s7wa5dgvcfv6ogzisjzk14e5uaziawdefgdwaukpyeedpdrr953a6xr3kwoi6ineviwnhd08559773t030vjisva5jeo2082sln6ptic6s7rkatlo2apkr5wqjnuwcp36vhl22e5hpstqu5z',
                status: 'ERROR',
                detail: 'Ut perspiciatis architecto aspernatur harum aut mollitia consectetur et. Tenetur sunt voluptas velit culpa minus ea quae dolorum. Eos repellendus optio voluptatem deserunt sit cupiditate. Nulla quos vero et.',
                example: 'arp72nyg7su28r284hxm5fmrggfnelc19pfb8axblfxcbrfllc8ek7lzvn21xh36dx6ujt27hkee8io550ok5ly6jpk3mwfgre3xbg3x8n83vuq50qapmoy73edb7bir4mfogwiw88u9u72vi5cpp7y7r5ohldmi',
                startTimeAt: '2020-07-28 23:29:42',
                direction: 'OUTBOUND',
                errorCategory: 'i92vpvr66q0ynqoxlunzrhsgkewsheewmwasily3h4zjv2v1m5dpwdxsyo0khtlt7mkmdchqvrtjq2p6e50tjyz5bgtiye2r9t2yyabzzkax9vxn0skztfd3nszj1hv3spl1hiq0xs2dogthkvo409cgmweh82lq',
                errorCode: '3cl65p6ex3t8vfusz2jtbf50v3fsq13aotmieefwi1owmsdk35',
                errorLabel: 606659,
                node: 4065559513,
                protocol: '56rwd9rd7kxtdxtk2b8c',
                qualityOfService: 'v04qa53eeei69zn6qslp',
                receiverParty: 'cn4blhen5g0rzfgmj3feiy4f7sjx21ij4a7h1ek65x0so9eiqw017k8bxa1wn7o1b6lxq0e006uh0b6n83of57z5opivv8pbnz2enshk8ca5s75lckk5ho2jbfn1eg2tz22ezyd62qbm8o2vmga0pm0w5wfyouf6',
                receiverComponent: 'rzz1l997n4rde8m41518diswpk5v97nx59ealwr8l3be0a3augqp2tyxk1q9xv8yv8gzh616ylt32eym6vtetoktljb9u7uzgt6a4261byn2nehmeiwbiftfd9yjgxvcfuo53v6pr0u25mrj1il4fkh1nrd53gcp',
                receiverInterface: 'vm0kwcfqy1q7iwubrhwrfow8vsk1jsv3gfz6p8jjk9ynl3lid5tpang14jlwpxcilffxyv3aj6hkvx3t7zj1bjx7fry58nk0og6dtjieqjgafkt5bhfw0a46ojut8uxls0ct0b5gxgqqedhq91j5pbwoxtz5izz7',
                receiverInterfaceNamespace: '0e6k9qu4dif4f5oy4gmb0xdxdoxw36e2uhhqu8jmri80bmn30aothhgomoep5fzxazvjj87al8nrbaad6ukl63o0juqsj913lgyjn2mxjsbuxeb2a4a1fizmy39z88jrladd9oxdbt6ih3xdig8micgi1a7jigvh',
                retries: 9127956048,
                size: 2837772923,
                timesFailed: 1023804956,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'o7xf2wr954ndtbcsgc2fqua4fy10btqqq2a1bm4kwwkrzywzvx',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '1rrpjsvoko09sdkc16zk',
                scenario: 'ujp0tgplumgtckjm0hwcdpicpraj2ud27qiskuxeroysm9j9lr3eq1nq3nsd',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:56:32',
                executionMonitoringStartAt: '2020-07-28 22:07:55',
                executionMonitoringEndAt: '2020-07-29 08:06:06',
                flowHash: 'a73snpcbpe37g1od3kdf9rp0jhctkgtql34jjb0n',
                flowParty: 'naz58qbp04o8yrz5bzxiarpiecaegrhchc47d55zwe3s4krzpim0oxg8c3acm0646v280n27s9dkpptgf8mo95rzi7kk05dpu28enefn1okvpe3vz0ravwu29gbwaqppb40v83zvxdbyg3ok3fo1gn8gvzj0yai3h',
                flowComponent: 'nsu86nx7fznx5ndrijf652pwarezujyo4ec7bw08uwi4viaat7hnkfp0b4l18nvv4dxeym7ccb579ch15ou2v8ce9zdijtaxcvoy66dme2x6ehb8oqza12t8xqpkh3v1sginkz672c9iqewjftkkahqu3vobag6r',
                flowInterfaceName: 'v4vtng3an206a8zp14l366dwhlbn4wppu4szvngom2vqwfjva9i6c8e9vcdzslci9jmmvwrtfuvelij22v1gnvx2st9uwle5rravr765io57j4skcav3i2yucltc6q01jlcygk3dxl239wa5y4uf5ecnlwmyeqzu',
                flowInterfaceNamespace: '4w6k8u9qcylbtyjlh9ie6gsne77ycusim09zjisjtjsyyiik6tx32dz1dhmm1a3fgtt3cb0uvol44yq41axq3su28wp0yde2dpe30aifhsteaveuku360kuykjktw6josdqiwuocz96hzls05ujcc7ajzywpgfv8',
                status: 'CANCELLED',
                detail: 'Unde qui esse voluptas perspiciatis rem hic facere. Sapiente aut qui aliquam quidem. Qui at eaque voluptatum nihil. Nostrum quae sed corrupti error. Neque omnis necessitatibus repellat qui est blanditiis.',
                example: 'ekutbkzfv4u2gx0i09evrfks6qaxe0svzt6ytcnf0tuhq942e1pwnsv56l9ijgasjqrclbqxskejz8932cqkkwrgsww1ew5zf24hxgcr0lvmk7q8hha15e7tvpuxsy4n467zzatqvoawpixerq8m4cjvnfsn5brb',
                startTimeAt: '2020-07-28 20:38:44',
                direction: 'OUTBOUND',
                errorCategory: 'e57eqm1uusd8ge5g7anjpj3zjjy5yfu10iuh6itmngldwfvm4twjofh0zjrh9p8lsg5m7nhtp211xxh6jksttrffmsthlc7ozqr8uom6z2qcn7f2liev5vdgylvparm52d96eu0arpjo4ut9vn0q07w6sob760s6',
                errorCode: 'mqk5lrsiw48wmrx8xtuwscbrgy4n4sjdd41xrbcdf0fhqbzc83',
                errorLabel: 317790,
                node: 6247205223,
                protocol: 'olcdtsdn344uwh0q9c3q',
                qualityOfService: 'bvddbok983poe3cn86l8',
                receiverParty: 'wfozuk2nlzfqvf0bba9w45zqb1364q4wdmenquem5bv8f1vizupsofz08i235higb8qvh16j7i4hddbnu5yihnymirjpctbfiagjzvlgltphxbc2ynxeca8z08nevd78ch93c5e9obpv121noknxkyq2nd9fpiod',
                receiverComponent: 'otj2miwje8rh5kcjk8gf6klwg1y67ek0u70xx4bzkd0cdjxi8ar1yc44aefay5oi9j7dk6h7aow6t3uqgfbgk6xbte50y2v6mjkcmkowntk96gi7vz3kieegamu9eal7jedfkz6ufwmvko4vjrxjy6ru66wbjh13',
                receiverInterface: '26li5wbcws91rrdo2drwxbtwuw6bmsdpszec2spz40q081v9b3uefbbhoi5b9f4aagj1no1a62xlb7a11x8gu3yx490cktsjasv70o2vwps68meadyf13erqirfvi7ajriygjshhfhjb3syes9xzc10ddfh6fbwb',
                receiverInterfaceNamespace: 'i4dell6oun8zjggmtd4pftw282xr7dxmlieko2ayl8zypulrcgons89rgrbby0c3ge1td0u8mkm4xxeh9plcu0dh6hbo5fq7miej62peze2bzqz1m6pljg1cpwl70arlp86e6opv09nmr0cg6es1vyvlfu4jdync',
                retries: 1356790270,
                size: 1399884725,
                timesFailed: 4779922814,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'vqwfzzwyaxclsytdlirbbrflg1q7pqo7jdwybtj08p1tsbq3gb',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '9cj2f57ttipee9y2h1j9',
                scenario: 'aet1qsur3rhp0dv9mw3z5bkbtbrwp2oqc2m9ycmp2mgwvvnutu67nbe1nekd',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:03:41',
                executionMonitoringStartAt: '2020-07-29 08:24:09',
                executionMonitoringEndAt: '2020-07-28 22:47:50',
                flowHash: 'qui1z6vassqqprk2ronvgstc455fr99s7y1atygc',
                flowParty: 'fip1shqxslghcgacip484hxgfqubpbsf3r9k5sg1b4anbo49gp7q89r0rq15mk006w139ya8gfdzn531tpk8to51l656hle7x3ozeihzeluiigw7j44o43lryw5kzjpbpizxre7ba6uo565bwzrw0og6hahli6xr',
                flowComponent: 'og3o2vl9rd3wr592pgevyzf0dbcramm3kjqs5tt65yjqfc9to0w9qdj4ai80qlakbdq9lgg17hw44asctlob7ehqmborky30s5ba74cdjvote2fmruoaxtfxg5g0j49g81cwumn2irbtgymqreduzr02fga6e39va',
                flowInterfaceName: 'ho7vmyuexmybkxrv65u7wchnppb9omysii8sw4e7bh709hvy79996fwrhu8bjawrl1q255bp6zri1olbqf7g1ydhw8mom28rzuzqqt1r676w8qcg55vpdr3t0ovyn7164q0jes958z9ksw02zozg2tyg6zhljdru',
                flowInterfaceNamespace: 'e3zspmp5ddi9kl9tiva14sidc4c151bhye8pm6dbxruy1j6g5ng5tio0hf4ouchh3eag83atuny87secsxdklkctsegpotvirsmw632kf1z5fuiqtxjcjr588ih7g6bxila0fahkzyq575m8jn99t6x0ftbvi6n2',
                status: 'SUCCESS',
                detail: 'Eum et commodi ut. Et quis omnis numquam pariatur. Ipsum nisi illum debitis voluptate qui omnis. Sit animi ea mollitia et quis quaerat sunt soluta.',
                example: 'gx4swspqdsacjqmllsswl2s3gltrsqzxxt67ldnsvtddvf7vqbvlclx2abhfgvmlwkqpiclzx24v4zyy1245y20wo6zpgl6k63yfi3sqkzvfkauxtg1k60uuylpfvdsetorb3en5ccg0tyrr2m8ykpynl253xywz',
                startTimeAt: '2020-07-28 17:59:40',
                direction: 'OUTBOUND',
                errorCategory: '02pi28n57nigew8ynd4cw24he02ckh7ei1fdtqrhegz325ewsouyhixewtl0t6n5qgy3c9t3kjoe0pt1v0ezcefp3t4uqdzi9ynt6cef0b39xwf4b7addyy3r32idr87aunizhklk8tr09o5p0q7slo7cemqzzq4',
                errorCode: '9tc7sahsqgbw75142ktqhwrfdtexanaw5pp54snxuh1oonuyi5',
                errorLabel: 614709,
                node: 4342760965,
                protocol: 'efp7io3m9iuadd5hue5s',
                qualityOfService: 'wu51uyvi8zziv62gsk2s',
                receiverParty: '26t1m3251nnp79lxskfzttqukqrwdqs5c78ij9plnyndybegie2din5d4bnu9p8gol7akvpjgfpqtp0sphq0zvnyi4yxjnwvrhfcfgc756iihz367wepqyhcwzpbqskga9e49730p96j6oe46ckzx71fm2os2c25',
                receiverComponent: 'ckixed6bmoqvo1m16m7pgmh2ri39oqrrw022cnppvg122s0n2ovakoew25o6u2nb0q18wt6h93xl7211g97ev1tc2xcpyf0letki3xmz9msx1n5hs87lyhveutagha3nl4exaeavfk0axis6gsiqcjbnl18lwjrd',
                receiverInterface: 'xmqbapig82rejv8p05qw6melwmfw50ushdjrpqihjagnmmhgx96r83wcqd96djlj6snpew6gm6v5z6kcjf5b0loeh05jr23rp1vfrsngy3bq8v8x516ppyobdl8ahzecfsi1o99a74ii8ls736wg5x2x2o4bk705',
                receiverInterfaceNamespace: 'i2d8coz58py9tz09zqwnvf288barc98e2kpuq10brhup79fl4vdk9ibbto4ybl2d0o7yxk1ab9dhjowjfmsttj0xq9mq50e6x8gttakp45vhxucw1tqam65du5x89hv2cfe7176aa0h3975h7002u2hx1kc3rlzk',
                retries: 7680211551,
                size: 8739139932,
                timesFailed: 1467677940,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'a8p349y1d52ebuhm0g3ncbx3pchuvfn9wzs12q9ypo7xd8y0ea',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '9eogr6j2o7p81x4a6l0q',
                scenario: 'kfkwytduyjoxdfezlx3hzggxt3ow2n0uc3b9elduh37vb2q4fu5g4ocxtbh5',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:30:09',
                executionMonitoringStartAt: '2020-07-28 19:37:13',
                executionMonitoringEndAt: '2020-07-29 12:17:18',
                flowHash: '7gjeqezm1heq4hn3edm7hf57ij3qi5ojfpcl4aow',
                flowParty: '2jcthtx91hra25rahtzvaxacxm1a8a36turzdzfg20195eu2h8jbs4d650rllqa8i59nvd4wm8zrpesqdu4t3clrmydp1nkdl81q1sx3yyi1e9vo90wjagy9rps07qxkmuu6551am3u1n52lqgtznjisaouff2im',
                flowComponent: 'qde5fnvv26899cr6idbpckj7g3gxiwtreq2ch5fhzneoeki78nddpirzdqy2g6y1bfrnhih69vkoccw64jbpq9kbx9ldgpoqch83qiplgfy06u0u27o2m9y9au6zhqtyv62ckkju1cbyazue6hkb9sf286evq6yf',
                flowInterfaceName: 'lvdse5y0yy37cflcds35z4ng7ha28olc4qnuj4az6qg150kny7ybhegn0mvt2f300z6t8pejft4gcakcwggy5o4hqy08qzf3q9a82o2u3f96wfprra5julijgtmhlzxbees6dwks5exrfyv9avw53v5aaway308vu',
                flowInterfaceNamespace: 'rjd7jms1std6yksf3m4ddt3612un46q5qvwjibeybhdnnvzi0ipt3acli8b65m6v43t7kr4nf3zwegzi6po1zwv0ahmp3p4niedinw8l5lnrqm2ousbcjxoydokn8koy39idcn6jwjqn9jjans3a8g23o1hgkgvq',
                status: 'WAITING',
                detail: 'Reiciendis et eius totam. Laborum voluptatem excepturi et. Eveniet est autem error quasi. Nulla aut earum tempora ex.',
                example: 'cs0bslkci8lkz1bj7i5kn9zguxk084ffwuxlfocxb3y5d4h5urn325rnf6yas6f9iy749808ufj1nretariwgt3gv9u4zjw90ekz5uobzuybnpbpkxq17mg18xbdv0mzc8urwv80ij5omroox7wgwktuszixxy0b',
                startTimeAt: '2020-07-28 23:16:51',
                direction: 'INBOUND',
                errorCategory: '0gqztu1raldjysg1ret4en75xedbw4t5ztkia4dwyblhkuqrkc2tgz8kir4326o3jv5l7rhm1gda7abs1hwv1j25y73aehz1v4vnti71odmrzw274sswe84urjoul3fdsq1m36bwa7fv9xubjotr7qby1iz0dsjh',
                errorCode: '3jtjowc6o6p45idosyo596wmbi4lz60q7ca677idwp1trchqj9',
                errorLabel: 864387,
                node: 9126338375,
                protocol: '9jk6h11su1sh7i45wz7l',
                qualityOfService: 'cu9wmv1gd48tgo9sxasc',
                receiverParty: '9mvvn20yam8p1w6mx2u49oamr4uihsdwrahcqro1rmgjlxrwir89oyxj1bwqbqnyaimsdufmijkhmccjt23hnex2fojbgq2xktcbq4hxr9c188ciltk4m8n63darg24su3pxipf5absrqdbl3n6jss6c914k6p81',
                receiverComponent: 'db0y64vnirqrvwjq96oko5gyosl8sefv5bka8gzx99lq7ndwmlh6ypv7eqze7u3xn0z1vabwe1dsd4o0pldptgfnxdnbvf9vmca4fr8qky1vit3risdni6n26omsd04emjws5887slqli8g8sry60xqp8s7vgir9',
                receiverInterface: '4lxav6ruh5wqgmf62z6k9c7plxpg7h3e2gu7zxg0oeqx4v3w05eimm4lwiiu6560ii5moimg42ks7wci8llre0h661064wxivu68743xlbf5bbo5sifk8tdgvqg2q0oxqdnwwtcg6v3aa8fhkbsgl1dflmhpatwj',
                receiverInterfaceNamespace: '4upte33zzneh0o5cg705824yopxvedgcguesfvghm88o429ed4nfs1tf075cigpcr0v0lqodv95bboroyq12upvkt4u3h6sha5bmxdzxn1blbx719euohwksqw9zwoypih7pwzzhvuvir5hkaspt2pmn79znwqq6',
                retries: 9770880103,
                size: 1736328646,
                timesFailed: 5426127204,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'jdrx2l5xx6vaapiruah7njx8xj98x18x3f4wpy3jf1jf3w4tbf',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'kh0n2v6hodjfemdoudgt',
                scenario: 'hr74uobfqgdslpp0fol3j4k78s2g45jqovcrn93oa6sk4lp9n7n0w5xv5gtd',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:24:46',
                executionMonitoringStartAt: '2020-07-28 17:45:56',
                executionMonitoringEndAt: '2020-07-29 02:51:33',
                flowHash: '6tghpjj5joz3zdjpzxfuke2jp3akb9c2onblaeek',
                flowParty: 'e978vf8b0fd7l8d5x27psunuaysrrbo4ssyyk5d9dlyjp1n7fefbmp95dzxs40crt5oyjijm3by1z9o8i5qyouwe00ghj5h8fcfuay17wu7lq0p6t3nt5jamieayci1bxbcdp6r4mihkokt68d11gbw7mblkpxsp',
                flowComponent: 'nykd0o884fyamm2tx6fcddyn34o70g6mnfentm7tylgbc11ygjhio2rxiwid0tdzumk8b8s3t6zg4n7aoxrnobfidve21n6uan3x4gpf9q1k59394za9hbbqy6ylg5xyfrx9rzl8emhmch9nmn0mazc05fw3gp5b',
                flowInterfaceName: 'wwsvv5w9u8ufm8fhhsqsyvyl7pwyh9ea907s38rom7fuuqomqyagxubbmabjcft68b7t2p5xp9htxmjajozlt2mx6jc5jcxt82aabxj5da9h83jk0vd91vuxdrihogi5cp0ezs6h3fe09dms2bgec60el9av5pd2',
                flowInterfaceNamespace: 'u298k1r7bcjcq9m7lqve9ltftpi3rjc3mk6dvpk8xk6lnfh8aebe245rnhcdma8m8o3vg9a01cjwv2qf1ig0r9niefluq7qbfu1mvw13x72mukx7j91lg6emv9kopgdagcuv6k6iocuuy7not22lwzhyyni1isyd1',
                status: 'CANCELLED',
                detail: 'Voluptatibus asperiores aliquam ut consequatur. Aperiam voluptatem sit dolorem minima reiciendis est ut similique. Ipsa ex consequatur sapiente enim sed. Ratione ut reiciendis est assumenda ipsum natus et aut. Culpa qui vero nobis.',
                example: 'ofikz8y2h97rx6ld639vth6c0ln0lau1g9cj4fzovzb0pogbhurkee7i9vmggz3le15tjqqwx55br0q8x4cpyd9n06eujgsdrh3pqmtjugk1xqquq8if26xt7p0a64w27yc2sn15m0si10bxxl0shsyaxtbc7f13',
                startTimeAt: '2020-07-28 19:35:21',
                direction: 'INBOUND',
                errorCategory: 'pegxl83cfqt7sgebo3it11h00ynxlkdj4xfmpe9rtyxc7oc6z1as1frymh8eiyzdx533ql90s57y1shc40bftb2gtoe9zqanwr7pverhwsz1ouiaskozlgo8ukquz15yx9pqufolnwvdehr6uscv64ne8vny82i7',
                errorCode: 'qpl7lgoh5v49vx16jqrx8ssqy61kux34o89a0mfesb78d1nski',
                errorLabel: 280977,
                node: 8735703086,
                protocol: 'o9bkowg5on50ugvzqbcw',
                qualityOfService: 'zf9724xo5zj17gaz31mq',
                receiverParty: '01wi2zw66h3y8zjkmafwny0gqs3be1ly2gxqse7xjc3wb8g42r4jj75c0as4l2wwlgacdiqc90nkkdmykx9k2v8lquaxrbx89gh6h4evlgujpl0m8jxtp69k59m5eewoqrx33dy99b7174urftpqdz25jnth5nbh',
                receiverComponent: 'x6y8zwok9z0cikxwc061q4gu6bdocv9479ryquiitwualwe1brm04ckvqv4tuq586sopx5405a5ybtdsuvucax29mx986xrs8u25zusxuha1ei36hbps89111zotxiiaslit10c9mlc2aqqb9ph69i7vstwzvl3f',
                receiverInterface: '3a6o7cqzaup10othc1lr8gwoxu5sa2n7vjq69f3175w0nkj3bv8n5ab639n5b9jqm30hy94iggcdw5ae0dwui256cthlvgt70oj05mm2ah5ejhkxse3jfo4098e7xeloj2fh7u8zl10ymavf4whbcw3acfx7l71x',
                receiverInterfaceNamespace: '5wlysxuw6rmrz1sboz4z4086bzhpt8pnkgwb3ktfi4fd788lpelk4qjiyjcrr87rsup6ygg4sl1kbd80crl875cf2hvte5t0vjuofoj8tf9sdo57s1dtbtwg1ekxq6gqe9s2xgo3fkbyw1mfjnbi4lnz6b56j2m8',
                retries: 4196025536,
                size: 3602152371,
                timesFailed: 9475856535,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'l79ubqkppajbhwpsh4exg82datx369ol3wrjw9k9sklk61yuc1',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'vdgf1w4fku0ziyrujh71',
                scenario: 'ucbstwpj8s5jyi30mn10wehl1icq3ehjcb0c7az10x1r25m6v5q245rlc8of',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:09:29',
                executionMonitoringStartAt: '2020-07-29 05:33:14',
                executionMonitoringEndAt: '2020-07-28 18:53:33',
                flowHash: 'waaivyersm9rmhr9yo7hifamz8q5stor5rrxd1xu',
                flowParty: 'qfq6yl4qaszcyu8jrdzqedjbr96atp1tuwak2cutadgr179yifwe6hy2qqvjqucu89qvds6c1xrvi8vjh04ymhsrafio9t8mkoqc7entoa0r3sqttrmjaxjclfnv5s602l1lv5gem0m3g86j48zbt5o8ja5hmhg6',
                flowComponent: 'k4ne1akd7mo0xs64yy79ietv1l9vn6wle95nm4ijn5th3seyb4xfipuk4syzvnog87e0v2wb46wo9j401l6qmr7v84w11uvcg1bvf2h0rny5p680ldmdir0jx16egzabwc084fpbzeo72hnvfe33mn55at8qm9br',
                flowInterfaceName: 'n4s8wilqt859inmioy81cmnluuikdlrp1mdaczxj3e3dvlwrt61jdgvssi3d5ga7qnza0yort0jxtumdndclwpxqf5o80zug6zng6r2xgem3xiejx9vblwe3b4d64rzw1znyvywgcogf77ozlkrs0rthcw419k7l',
                flowInterfaceNamespace: 'wbmbequo3y6pcdvdrdrzon1s5t2c3i5bzizgfwb3m40j3n8tnot7jq7153nfomdawnj2sbdzpl6lnq101esxmkxr1nkqlsd0c05qedh4r1d30dzgsf016iedd5mp0qjoxmaz2gkz4fh181zeutm1iwj14cns5pyu',
                status: 'TO_BE_DELIVERED',
                detail: 'Deleniti alias eveniet voluptas voluptas illo voluptas. Voluptates labore voluptate suscipit suscipit. Doloribus in asperiores tempore. Odit ut eum voluptas eum.',
                example: '92vdq08k6qw5oexn74oeckuv7lerg6h1afx6hdcusunimk1on1q52qf6n0cg0k83lk2e1f5su1kyc0rxegnit05k3e8vya3f270qtghcu465mawpwdmtzqp59vkz780i9qpk18w74dzgwlyy9lh752019rzews7ex',
                startTimeAt: '2020-07-29 04:25:42',
                direction: 'OUTBOUND',
                errorCategory: 'xc1vi7k3rxutj2udgjeaordi8pw06v9je1xpmin0bsjhmxudhxho6h3jvbzh0kz2djjppyk04it1yy7ml1lm5559e03afxeo382kzkvbq7ivftscadb2jc3h82621z0x8lf9581lr6oa8p3qkt9set1yjmxvc3an',
                errorCode: '1w7zterhp0lapxkxghstg6rzfkhtsklzmh6owb0uc75ghcypmu',
                errorLabel: 833962,
                node: 3818127412,
                protocol: '6xqd0pr50dlst64wfo1o',
                qualityOfService: 'yvro707gtffm67wdd0d6',
                receiverParty: '7436kgm49pre5lxgxqjnxrws13b4myxqueab1no82660b2tsyveqou1oi33hhfz1llmdnft312f34ihy0cvqj7rofwlqcxe0lnqlwd98yflj4gfi2enrkxqt93f4fmgg7gm5i1b97yvvfx0vbee8iaw7wtuq0fn5',
                receiverComponent: 'rxp7jtfrkulgnyix3q4lmkd7z1o9yhfttz16lp49ibqwntam662i78ytxz56i24h9fpc5wg44e3wy8knu4xz1a2qmtivqfshbq5es5oxrn2wgs1bz0uen10onbbk48r3z5gvdljlbe1omfvlzh0y5j03ll1u47fv',
                receiverInterface: 'dvafov8w3g1jyz4q3vspsjqj6wq6te1kl57addtqrszc9vwp9y5sall5n47096jqg7d0yn3xt6qmue9qw38i723m7iu47jtjz9zs3qpnz8qmgkz6h8kt9e82b5rdt75ezlyckc50m3qs0agn0xgqpimgo8bkyd5b',
                receiverInterfaceNamespace: '3wuh4onjj34abfqgza6bpu5u4987pqtfbs5u5yl9zg8f9zx1ty1ayidfavuetyw9uuwxgwg5cddzthof8ifq94r4uhcr6ifrz8c96vl0x8ttxr69id9c3dfkjjft15dxlmzhixz1i7ardl3nobnap2a0qk5uov4b',
                retries: 8270996898,
                size: 3989063164,
                timesFailed: 9054939205,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '8sndc5f5g6u847iemlsuvlt0a0wkh7sl8lt11622ayk0lo5cjp',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'iw5385tc7aj4gvd1ezgo',
                scenario: '87dism7vc4o532j3605g3xj828e3oz669gvi41eor852n7cavs7un1fdtkzt',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:53:51',
                executionMonitoringStartAt: '2020-07-29 09:22:45',
                executionMonitoringEndAt: '2020-07-28 21:27:18',
                flowHash: 'c8qtrhy86g9il9nk5noaotj1yx8ho22txakhwr36',
                flowParty: 'o0f0c2cugosjwgq1hjjnhgf6y402c2dnex7m7gkqwyfkn6giepo4lji0y2dhxo3wj5l44x7mc89dnzi08mefan2mqs518t2anlpwff9lyy6rl1p9c6gnaa3ot0n1o3f21s4j4wkfzzny7zef1gfl3pbesb0dtah0',
                flowComponent: '4amyxoydvh26thww72wa4iomvh4rcxug6qgd7keuj2a12098dqw85dbwkbvm2u5egoqltjlyvmmurbywlpyyi1nw7idwo2aqp5hzpzvv07ieqzgtc5vgrw5e2ybj505s63b4vxa08qbqjwsh5x7lvibp9dj54oah',
                flowInterfaceName: 'u2smar38tg58katrn927tj5qdnnnss5xpkzd7wtzojckfacbwnyjxwy7ljpkz1zd3vlz4a7hma8qs2qo5fb31si5hkzr4taak830ukqwstoyr8oh1pxiuzqyjfxqgpgta26urum2ojikuzm7cwjjsz9sk7qvm0j7',
                flowInterfaceNamespace: '1r0hgv663s6r7kkelzngqe29nhkn5jild6nef9az926rjty7wgljoz8aywfdy5hnm3t0ji1gvc3svgfklf7klzxry3xm9jmie4djzbm9ds2f2s6qlqbz6t8x1r4i0a272bovytcoy62wie157zuiywzubwqhr649',
                status: 'CANCELLED',
                detail: 'Voluptas enim ea consequatur vel alias. Natus iste delectus laudantium nisi sapiente dolores saepe eveniet ipsa. Inventore ex id atque quo.',
                example: 'hpc89185vdh9aryqq84pzykwbh9x2w7jh54wjynr2m97gj14z8us5uvl3lmrytv6gf91k43txb4r84jykhcclq904fwtahz29n402wpe6u0r4xkbrzaupkcw7q5a4o7vxa5mdnxia0p6o21srsfej8qy6zwhn4p5',
                startTimeAt: '2020-07-29 10:40:00',
                direction: 'INBOUND',
                errorCategory: 'iq4sfrp7imw1h7mocyhjed5g1nwqgak67hq4c7zvc0u088jmyosvg995jhmxsqx60eqom8bxlxuyquoqr0i2rsq5wrm5lpx65811pvja4qm8pscbp4m1xausarrkajojfvcujcamfp7ksunxrgekt2beeneubrrof',
                errorCode: 'ysvwnp2f5hclanyxmuamgg9fb0pyjpzlhc3bax5g1d8b9rr8jk',
                errorLabel: 618480,
                node: 8878844072,
                protocol: 'yn886qzfk70na6foq8hv',
                qualityOfService: 'ph81fc068uzz4i2fwyon',
                receiverParty: 'ux7ujl4ts10lzez6c9spme0cfjp7ikkj5prwrhkd4bpyuboi63jacjdafpebm0zzoswn8vv76iup8ve0cpg8zio2brorxr9opz22amctpudb7y02sq6j2vzxsuvqk7x1rm4a2yxq3lll60663xey42dr47qs5kaf',
                receiverComponent: 'k8huvnawafan9q8f269huow7at95s2xwzcy10cm0cqf2xw61to9glsy1sb5boqc5qysju9m66kdyv2ib2q9ydzx01bzo9d7o10uf1c2tu0rug69xs2wyzonbl2qmbvsg4s783kk7p955e74ycc94se0zldlthgu8',
                receiverInterface: 'mrxn63v4ypv8vk9tgixvzrl03px2taj7vwmun6sst78jawr51pw35thpiu68x8rndm2r1eph1y1vca8bxbia5f7kao2camkgkd64c4slmq28wstjk4yx6tapkxc8nz7i8rsbqv4gsz3lxcrmy3j7q1olpjl5pxc2',
                receiverInterfaceNamespace: 'nd61wvbnwc899vbec6j86jbuejkbxul226tzgxbjaufyc5zwx50sj8b78uzkspfua5kefo8tfk00c4j8uy1dkp085sh3s06zd26gzeioa5mpkzegf0g7dt9c17ilkau4aqwhsxef1vi8jzl1lkjth3chv6uzbyac',
                retries: 8159922778,
                size: 4662867829,
                timesFailed: 8044481253,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '9d5hoa0rzabhk4343sh66h4y4zvrjtjr2ahsgrkrmh0vlp9i17',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'g7awewmocf8l6pxqmsl3',
                scenario: 'fvuclr5qqic18h64u5f4s1ubsldqxosto4pe9pui24eywllvttzixx751cqh',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:14:38',
                executionMonitoringStartAt: '2020-07-29 06:23:41',
                executionMonitoringEndAt: '2020-07-29 04:03:35',
                flowHash: 'imh96oa622kjyi19ssrdyxqlpen27h84sghfbup4',
                flowParty: 'ft28jqgh2sjzvphjfgzajljwebogrlrw4ne4ofkjmd0ar5fbjz5crgzf1p4v0ca5z0r3tdkpbtx6x0bf6umx0zy2dgi3pxlvxlufjr8qkm7umvm0nwy5lf41jfc8r8uzrfr4acxseu7rxrxxm39spns1cxiys4q5',
                flowComponent: 'v0bjjru98ppq8dcln28to441xknslskwp4quabdk7m3he7zhjaybtuqpq4lelxhvz6isb5np0la9bufx3z32bag7972bdp21b3f50lqg873184pfgb9rkvchxzkdv75o2sawlgywtbnoqepemvjml4xkxnsqc79s',
                flowInterfaceName: 'f8qnnxtb54fok6gqbr7sxwloefwbd8bjgo8g1x0d8onxtwme2slnjnxfhy789l14lhrh2m8ghxvepadsz391036f738v52on300hdagjgwxttl1lwfmptk798od1a4d1z4s5aupoqf9lcznkaziex4t9i9t0qdu1',
                flowInterfaceNamespace: '1w8ei3sirxl1ew64029976u071fa0jfdr0q1nanoiecey79rs6wv6ck2q5z2r7r5zpq1osu14ombvnl18mdmij7lzi098cyfaq3qk2wjs0088zmyrhy83l9ckltq89zcr1tkd1njff1v9uq20xeamzhqtkfoxwzx',
                status: 'SUCCESS',
                detail: 'Fuga debitis est ipsum aut ratione et et alias. Repellendus non accusamus. Est illum error assumenda vel ipsam facilis.',
                example: '81ea72lbha5mehr4icgkh8js01c6plk4haeqc4ep9ud10mjbfawoc8y81r02jmtypr0pej7ao11mv4j70auuqku932yo5f1gqxuq36tsqkfjhb9fae5ygwyyodrk9by7ifql9fwwxsm2jd4podv5nigmwz321z30',
                startTimeAt: '2020-07-28 21:34:06',
                direction: 'OUTBOUND',
                errorCategory: 'xlt3gdzmhoo2cn4fasf10rur4w6wbksp6c9i9loe88t5anu9daf10jf2zfwplcs3ii1kubk2ar4oowq7d7xubmr4370oj906lx81rcnt20cr61gp8lq9byiqzkxcnhn4omw033hltrxjysv3xgmaa6glfi9idvfx',
                errorCode: 'swzfquc3vhfqttuqlvjxpq3n76w6yi3yaenyx1938vux22megfw',
                errorLabel: 903794,
                node: 9378190899,
                protocol: 'dzvfh6tbyoat6duh5f41',
                qualityOfService: 'sz4nluk6mhdsdn8sbwxp',
                receiverParty: '8x6wigynipaevnz764e1y8l9dm67hj7ab6oc6ykssn54hqo3iwpi478qrqyi6q0yqqve8sl1ex1wfacg50u7yln3x2fgohnv1awgxr9xfd5n254tresvh7gqcnc6hgtzee0s5ey2ab2vp07yexqdjkv0t9v1gcu7',
                receiverComponent: 'veex11pygkxcy1vjshskgbat28vx160mwx0i6lesytxvv55vbjqvs89ju22muswmy3zygfvj3b5xql8hgy6dxh5p5m1nvw8hp6n0zoouivsk27hw8pbqs729kd36c476dge110cfwloialn588th23ecj8wsidhl',
                receiverInterface: 'a7o6xa6tjxcntium4d1v9gi03swa11azuk143m4zbpdv8om1a4bp2pq07y02g8onyty2b2w17t3tz1kjy6pr4bmz1w2kjon1vm1sjxcopd6d0hgy0bvwy44zpnjlvmudt00433dzfdqcmdlb7wcmzmbo9u00ds90',
                receiverInterfaceNamespace: 'vstawaxxh5fgksaz00vegx3chhozzxtiqh78pc86pqizv3du1x9olbq9jlv3upbboow9okztdvrl2pwmt8432fkekqgeh39o5s98o41wz6mu805bd26v60s24xtweta2j01r643m6gx5xqdoqwsx57wg64dgewvg',
                retries: 8023307229,
                size: 1147102189,
                timesFailed: 6893855396,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'pqddh4spj133wjzlhks91xqx6mtnh3up11cio1ru9psvruvgij',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'xtjfifewh7h0pe5ip7nt',
                scenario: 'h0r3w5ajftb9dzjwjjpo9lowz4iw8b0c58g3jtsbckfynm1qkg5z73gfhwo5',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:32:48',
                executionMonitoringStartAt: '2020-07-29 03:45:37',
                executionMonitoringEndAt: '2020-07-28 16:29:00',
                flowHash: 'dgyzivbcfyooc9igcggpa4dhfmidl6a7n0z7apsj',
                flowParty: 'y36eu8n6bx6ased0ouygw1ttg7j7rlrc2v5j77onk6vn2glmf533dghfgr7gwfcrkn4x7yvmh6g2mruo31fs9i96w37v63yc8b7q3rvgevfpkq1s2bduz0l0s0p61kd1jewskc9p4dn6pdlvfmfta09qgxw0ykwh',
                flowComponent: 'gjddt7yy5tzu69s4gihpmbk77sny2al4ksulwqw2p88bcl071de1neoe94ha124a0ivojts9hxpxvkjk0r3nqohel7b9es5gkfgkhebebsyvcsr1vw442mxshrysoczj86t5gu3n6cpqycnbrmpqn6nawov6rwz4',
                flowInterfaceName: '9zu8uschsygt40k6t6f6ym39ejuwicxbyfg2jjeukppfwjhzh7pza4r9tj9xwhfjpawspghlwxzjkr6kwwvso3v9p0pk0jce9bsi06rd0sb8h2fk6d9j4cf7ushu1w3zkby4kwsqwnnq1qb7ygic2n60v9k07hdh',
                flowInterfaceNamespace: 'kcnm9pp9vmy550f74ezn8yi5hw7f592ndpqlnbmuvefer5coxmjex4ejzm85w2j60uh52ue6vygjvupy3zrd80lqkxbxkpimo9k8g0g0ni1biwgxahon3snccbc1886i6k6uarjfr3g18h1rbhgq5staj05lbrlw',
                status: 'WAITING',
                detail: 'Atque veritatis ad nisi quas suscipit tempora fuga et. Ad est amet. Omnis perferendis provident.',
                example: '11s9nusq0mijm3e8nxg5w9laymu5iygdw7ndex0dk67u814qpci2v5f3xqkx4i6e16et85ni0gxqtjw5q6jo6s7zznyiwdyz3f934hkilctmsvfw9g7r9ygesb8q2uytgoa2psxs778uqbvgqbtaaqd9kfj5iul9',
                startTimeAt: '2020-07-29 05:01:42',
                direction: 'OUTBOUND',
                errorCategory: '2953it2l31uyqm0dujsvx96fr536g1vsv4h7rhg7hvpnll9pyiml77lk0mssi5udvplhzeejtlt5vdge9gj62nbuw7osf99vv620ukrgorzctz6d5l5lmi654344gs2alow9oknjmfdq8reg1syashp8xkwj90jg',
                errorCode: 'bnc1wgihtu6l7wlg0iawj4yemzho39fh63uazx9ngd7f6zfqa4',
                errorLabel: 8979566,
                node: 8098684115,
                protocol: 'gg7ihqaefohqxxm1oya8',
                qualityOfService: 'f23pzvkhz14tj1x3vs91',
                receiverParty: '9kr8koluap7xe6c0zitrxm1zavgckgpv2w43qhc3vgmnti7f8jvjxvn7cy8uqbw0cu962rcanns8bpnmif2duiew6r5jejp96ufmrn1xiv4q9lorq16plom810lomxixzjulyhcy0t2b568zxd2q3l755itrnr91',
                receiverComponent: 'iwzmcxfljwzi10e780zdqh2uhiezgfpp0ry9m2vk5j0d1kskfrk0vdno7pcoojkkzjpk0ujag2mfmdkbeopsnzn74va7tgm0pzvy228on5i21nqtbl9eyyxhtpyu99xtgmfs39kvqdcbc3unvpjrjraani11awff',
                receiverInterface: 'su027jhmvro52ko8w7x4ytedd3genw8by9n9tb230iioszk8p6x251m5pxvcqg1ps1mblpwop9ww1wmfuyv9bgob1zj5tut1fvijnrtc5uxetnksrdo8r6v27c5n4rt8ufxuigunao986yjklmlu3joc3043lfd9',
                receiverInterfaceNamespace: 'm6juwpecnifwtrjb99a39ougle8p0x01a9v72r4y8r9fsx09k5hfbu9f4p10y8etkmq2itbyfkgamvyyzqc5uy5xm35ewr24y3bdphrxjjktm7vdhlj4su27u47i732imgzhbzme2jttav2btc3gnzp1woqminq8',
                retries: 4509243793,
                size: 7931123603,
                timesFailed: 6195799573,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 't31hlmcpn7j2ile2gvto9af5o169z7viy1cvkuboisuwcf14ae',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'ui3iarg3yjy3f704w5jh',
                scenario: 'zbgxgc5frugopzeszekkwn16vta4pyaki0yi0iuj2yw7j8txpb71v020lewl',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:22:35',
                executionMonitoringStartAt: '2020-07-29 05:54:58',
                executionMonitoringEndAt: '2020-07-29 11:54:40',
                flowHash: 'temp8zs8ojwztkaxrpdzcy30f41psl1x6yud42iq',
                flowParty: 'j14tvutd77qz8m5idrftku4ip0s0zvtjeblfugbuv6f42o5izzh5uv6ksa3r0u8gek3qw1mzduwo8twi1e593wnl3ik3g1rrm480fziludcngsce58rfh7ii9aqojxdhaj3cl43gaasr6gl04pzrympvhfho414j',
                flowComponent: 'b1f26s9et4h237b7ao5zajiffh91te89cnzu6gj2xr5jvz6xr2kj6vl8wxuif11uhmzdz4b5ns1374wjinnjdb5q9i2to0avhpnwi1dbe71co7a27dbc66x7h4nvoef8v8qdho4551lnb5z9b47mz5pz241knjgr',
                flowInterfaceName: 'wvz363yz9qfquwr7g6fkvgc8yntyze2xnxdsd4t62lbp6vv7a9x8s723mmxxjx7q29x2wxw3xh8wppp67sldla4lhtmn659h4jflgscjzcdydxukl3etw1tc8156myeyra9x9o9itflsbxc9zmj4px8ite6a7kqe',
                flowInterfaceNamespace: 'vopklb6jgkbewjkc1ed66a9zw6otx8wzjwtgspay94cugj5butt2khpffrmk4s6e1hjkfaledaz46876qrr1tdeaylopz50idxfh2qru0cllnp7ovp5egeq1tqw2zjgbg7ujhjfjytsahaxu95o2ss7jz6nh4dyc',
                status: 'WAITING',
                detail: 'Fugit cupiditate corrupti quia repellat laborum. Dolore fugit nesciunt. Qui maiores vel animi dolores molestiae.',
                example: 'zrexblkjrq48bptdd388s0rwkgcamcoy4e1uotamabstpsiu2wn7clcaqqjquxkufvk3nwp5lukjejyhoiyqmov6vtdwtd057550vwc45qt3lqyqgtse5vlzz01xuozjzh06tg622auv9hy2mduns865qfy1m0hx',
                startTimeAt: '2020-07-28 16:53:29',
                direction: 'INBOUND',
                errorCategory: '74grrkyxswrdpf7sqw2tc5nke4euuwpzxok4kablec935jruo2b3czjaexscq5xfutm83xqcxokavwgoxj5bhjuloo7jqrqubhxrzj5i71lzsj2a5yki9osro03g4e1obwij5qjdjik8n56c9oglf7cbj8kudh6d',
                errorCode: 'hmy3v5k0smbi2m817s41x3vnvem3zivnirau2df9blg3whbl53',
                errorLabel: 332864,
                node: 54191979403,
                protocol: 'n0uh8gh8y1kcs9yfxgyv',
                qualityOfService: 'gev2p0nu49p1jkpm3u20',
                receiverParty: '0gcfgem0046btffirfrkrwhff0hvnithubdrthclygnpaurcxpflx194tmoma2ii355sxtczu1rmnil28jx9cdu117t7x3nfxk8jls9vdkxno4bbn2h1zvq1w4fflr3k7752zwugzm05br8rrj6xh2ksekzffvmj',
                receiverComponent: '8uncngrpko81wl4u6yoy2o1nlfkbz8i249uzuuhyonibimnkfm90o7r2ypebkol6cyj32t8c8t5fg73ts3a8qlb39ljqu7mos3l0m33glup2zxuzgfmohzasmru4jpimlj5ta573mnrqq26ne3f5f0rkwk455xxa',
                receiverInterface: 'qoqmtfw13c83hxacza0w352qjhx3tkit86mkblq1ahxk1f1fc1oiq06gz3skq9y9kqae27j94tj9jsjfvfafai01alurqbt7ramqwh6iupk42j89vckfv61a8z3o6mpgfqapsfgicg8vrhyzju257ivfzfnnocpf',
                receiverInterfaceNamespace: '6xygw6dzwr0v235y5d8df28lndt8ojxcic4iu26ylsykupstle6ux3wev5ryuip9x2txnorpiufeqgf9ab5cgpr5wafaibnsdq3q5l43767kxk1z66ve5cao8awoc6g77d3ugi9x9r4wz0hwpnfu3mow6dwb8qlu',
                retries: 9588001747,
                size: 7028383995,
                timesFailed: 8325456743,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'x6cf0nromlapwo3kmy5r0blrdh3cs7hgcvhd8fu5ldprgf4jqm',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'spsiwfflaom9702yq1b9',
                scenario: 'bq0jp5y63k5mabzjqouita75p5p8jpnfbbjw1ab2am2s13ue3roikuera16s',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:06:54',
                executionMonitoringStartAt: '2020-07-29 04:15:30',
                executionMonitoringEndAt: '2020-07-29 03:56:09',
                flowHash: 'ow60bjfm4s0u6m5q4ubz54gg72uhmgl5je80wt64',
                flowParty: 'a5jbkamhxull30h60e7xjxnu4qaaetyn5yur21xv2z1zb90xm6wct5kzy9lvzyiun5r7w4eq2jjp9cm0vp47i0p52mr4phdsvvy2hcml7lg93rppriwhr2rpw0z8qj3pjj8qx4xsbwqcl5wpespdxnkf7gc77ywo',
                flowComponent: 'db1ai9mp57po31vw2zpco8sg77cd2k9xg56s2wxnako54aamybow2gq2nsen2wbhijnylufe5vea9ybye0lknlkm9kk67sudo0kfe7ef4ughtov6sgc72n11an6fi486qs3ku1gj9clksm40m3g2o5siawpfkx8b',
                flowInterfaceName: 'l5l5x8khl8q33ur2uk7yjt215jqs11fxmym1spuzewdmcqgi03hxfsubzbd594m4f7s49giazwykjb9jrbqtqnkm5uklacurrkmep5g8cy88j165652mnsxem3fzkwgrsu4co3ya77f9okhq0cgpraa00ba45xbj',
                flowInterfaceNamespace: 'r96wxb7bpfdez8iz1zzupu1i2svxhfb3h80n9y25c70ai0vnmsv86245hl9lh7qk8yjvy20vkml44fs91tf7e8y43krwiws52bbrov3is477qlwntu1djk3tmibd4vxqa16sgd5eolh6hm6rwmrf7dzejaezdvpb',
                status: 'TO_BE_DELIVERED',
                detail: 'Autem commodi at voluptatem iusto adipisci et itaque dignissimos fugit. Quam qui molestiae rerum eum. Dolor saepe et sequi sit quia voluptatum laborum sunt. Id et tenetur minima corrupti magni.',
                example: 'p6ek25mqt7oq4xowln8i19eukpuvj930i8ve6i30pltlk2ysyvgortcrv9b6oqz7lqwz45klr5tq4ggefbn4lbs0kqh23zx9rutpzzdywuvpgmfv7ek4ubaj67q6qehzzvlsfa5bxm213ms5j3flvxblieavop6o',
                startTimeAt: '2020-07-29 07:39:07',
                direction: 'INBOUND',
                errorCategory: 'edefn3tbpkggm23x6spa70tpwz7eiioyu3xi0p7ddjbfy80qq8yvuxp7x2x3awzzzh4mefn364kb4gc1ck0s9h75di12u9pcs6tbhf3nrd2ro9bc5zkhrvgirlbup7by4jiou9g3o7f2pylld9ookgkag8ozwggg',
                errorCode: '2kdyhgyhuc1vt9eoi47o2yratxjvcvwt2j64ulnezmd6irsulq',
                errorLabel: 143981,
                node: 1890549128,
                protocol: 'j1whxje2nlzycxoqklsid',
                qualityOfService: '7g0mqaif2qeb58mr46cm',
                receiverParty: 'm1pmwin009qle0ers57jqo9rhrtf0gocr04rhl5hkuo6b3wjafcuesdz2q9poz6bsa6stvhh7h0uera5grbb49uqvx9xg4nl3l4qyk9tsnqfbhp815llimtu6xdjvj4nt1761o4ye0wx0sdaycdhonc5rjr2h5zq',
                receiverComponent: 'cfu832c945oaxv53urbp1kksgcxay8yygb4gg66ikb3y6lvdu6m5r8imhuhqs5gduxxa9kh7vr2eyejj8g12barcromee4dwlfflql9azmyan1npzsju536op0z4ccmevca7qny23bz2xbtxknx29ze2shd7vspk',
                receiverInterface: 'he49mezxo830tp8wot407b2rb5dvhoou20m87rabo5339591ivczs38r8cnmswyy6w0v1twrdgoo2ixidoe3ximfi63zhf1fraivobru73a9d98ahnh7uduyqgx4j35a01v1lr9w9pe9662tle46vng0uyw01vb9',
                receiverInterfaceNamespace: 'd2b1wldd64cxv7ybffkfzrnar55g2u83xtdhsj436jnaogv5v1xw822zp2smwqpkibrekaxv589utasdgi92vtrr7iyczr3s0m2e1nw1ff4982gcdfd46ltlwb0i57ow2s1qqsz56m1y05sdpx98l2jzjfb4hk88',
                retries: 8803945903,
                size: 3918704310,
                timesFailed: 4063269216,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'kvtcn398evnhl24fu39vjjsg3rc9cwyej0cgmonv3ndtirw328',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'rc8wjw2thiapoq2hqra6',
                scenario: '8czcnhgvzicr0gsdfvumh0b94tnd4bxiatsvz4h2om1iievps5r5x3unixc1',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:11:53',
                executionMonitoringStartAt: '2020-07-29 01:31:52',
                executionMonitoringEndAt: '2020-07-28 16:07:40',
                flowHash: 'kduza9pcbc8qe5r8h86801w6a27ncsr99pc6f54f',
                flowParty: 'g6p8btk4twvxvlrhp7r4jlpnwjdy3a3a28pke1cnq6xoba6mtv3xa4psdlrw0e60hqlqlw92p5lxu9pwjb7m9yi7fwlwe02ip9z58s2fs56yh7crkcmd7ndkvf0c8r97vlj5tz2i5fzamz5sqs52szvqx6zf0aoo',
                flowComponent: 'kuyaaj79vwneirqnndawu6m76ho7sis9hp3vilvi8qy87mbnaj39gc381hrq0rqshau2m0zdpz4g8tk3amwiggo4prd5lfq0slr47ozmtlustelj38yhwao32jsl1whdun9q3ee07e5q6b8phn09hila4fv1igi8',
                flowInterfaceName: 'y83zmqkjzlvn1ozhdgql4n7xumbwcr14iu042ddd6ryx79g64khc3efr73ep927oxn7lkky15ot116f6hrl7z0qhcwc7yaghrepaaef8b62wkub1gvv23f4wvn85v34gpgg0gds7loa09og48aktwud5q6hxhw4u',
                flowInterfaceNamespace: '9u930tr2qwrq2taymvryco7clag5y6ifxwct8csp3d0by62zhzpe6cr1o012k0ahvhrm7x5c4q0iqsadyd1rqvhx7j0ydrn8h0bfazevx8mio17wle04scrxf1pj24algldwypl22j9cagx0bl4u0snbjvmst1pd',
                status: 'DELIVERING',
                detail: 'Aut officia velit eos qui animi in. Rerum velit molestiae nesciunt dolorem rerum qui aliquam. Rerum excepturi nihil sed voluptatem id ut ipsum. Sint et deserunt. Voluptates ipsam incidunt nemo adipisci.',
                example: 'yhim12n2ufdkp2qhu03lg2125dveck65hph4iypsc4dteqys2fmdh2zerx9t58hmbt2l12vctnuz8o01dqh3q4ye3f23jdqihwdwy8pwt3yhedfplkaysml8m1utkqyari3hzp66j1vvotnhc2pxd9d8l95wckqf',
                startTimeAt: '2020-07-29 08:36:34',
                direction: 'OUTBOUND',
                errorCategory: 'd13opk2kzcpocqx4mxkdqidrrf21bwo6ft9keisekhbg57cgpwyj7uv2477q0s1aym63jawb1xzg50qxzjb31jcp7auocfqwk07krdohr3d3yfg41jcjhxbt6wf255rf5lpxvxvdlm4ejmontqst8piwopcpk3da',
                errorCode: '7pmcv32be8e8uwbuj02zxwamd9oq2qrpwvq4b9l6ftu8n21ihx',
                errorLabel: 221654,
                node: 4570577065,
                protocol: 'y45sw5bhzrcl9e7me88s',
                qualityOfService: 'o4zulx1nne92sox6f0hni',
                receiverParty: 'aq9rapipgalfbnmsi9boepjygvly5dmj2oy6gb2h3lnpe11pjtmh6atprnu9td3ofskubtg6yjhjop8jm3zzqb1cppsar7avpscstt4t6vxeerlgui4u0ebhn1tqfwvy57jic2djs6hs7bzp8e55qqw21jmjp6hr',
                receiverComponent: 'jeagwbgrts6qax124w50si8twlwzs41cipwajqwptacg5a6vro7llzbaqskkmy5tq6pe7ew3e9jgipaot088dsd2gplcw1l6a629j51cth352to3mfvqv2airyybdd2b2ql5a6ic3b18eagmpbd364f3mf8rlp3p',
                receiverInterface: 'cq2d7lst9ckmpctxsna6vihzmza7qira5rf6xv1qhn69cgc2d0s5f8ntsakim7zirqwveelwdmqvg2amjpvr2wa1yn4rzo793w5cxu2phr8k3r0h5tt1vxkztcqx0pqwzao28g6iss405oe15ar1shhfncsr4agu',
                receiverInterfaceNamespace: 'qw07e1x0ozwi5ru8sgzyosqe5v6yji0sk046gcvb40qz9t4mzcfccgdmms06dr4p2hltpltsdlwuc1aa44asys45ijoj39a6wdozdpbqzv0sqnmwrocralt0zkdt0emdsimibcl75ya6623cpusct5gos4x5xx3w',
                retries: 6027819875,
                size: 5772533278,
                timesFailed: 2695587635,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'mi2xjowqq81xldhcjbwil6xymsuf4hvbgrgsh25hgg54vkvvno',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 's2u9td0gnhzaei9jwv5l',
                scenario: 'aqqcdeynlte3iq4v0nee9ejuwggpnomo3eavz9o7sif0t7vl38oap5kouvov',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:31:38',
                executionMonitoringStartAt: '2020-07-28 22:01:10',
                executionMonitoringEndAt: '2020-07-29 02:44:58',
                flowHash: 'omqlubwjsx2hv7wjtag82c1eq5xhq00vwkhb5zbp',
                flowParty: 'vm5wn36r0c5rs57r288q7vs9rk5dn071lten0r4tm8wrhw9413zk0e0b64uao3jajfqbva89lzhyphsoq9pwj5kg93bsbkhwz7ehhsd5me6wwtueubzzw9l0kz2jxitcogqou5jqxuni05s6c1q3wutphvjxhqtm',
                flowComponent: 'midc2d2s49j4qcev5279z02crlfurb7wbl2v7targ4b18xql0hxt8b68r1g72t0ecyibpyr28jthrxdszli1exwtw9ov074v9db0pb2ubycn5ej600hm7drurk5wofwnwg6206ai1246c5470pevm2zgybbjz0p2',
                flowInterfaceName: 'abxt70wolsec0ojjcvmoaf3576n2dwzilgu4t9f2loytbyxo06tt9izxx28eam4trv6aelw1luh8oav0o94m0kkk8dqya2s28vbdt7ap9uqifwx5nt9azr9vw2qb60ck9cd8ktyetnijrvx0y2xz4nb8mi2bfkl7',
                flowInterfaceNamespace: 'ygjr9xmwrpo44n3q58m1xc5ymzr1k1mrxtq94b2chbfw0kwx3kgm8to7x02znk6rijpz4r83u2fejlqxt2fe11440je6rqygezl4d7fjkwxumddu76bs0n5y6nhrbr2oqd4x1ib3mjz1slru6qegfm4ba9j2o96b',
                status: 'HOLDING',
                detail: 'Non nobis autem maiores et aliquam quae quaerat. Nobis deleniti quia. Quisquam perferendis sed sunt debitis facilis veritatis facere.',
                example: 'uadkeo99xlvmuv9mlu3z60s2xrji133xy7snd5ujpzt27ys8cw8bmlmuv89m76w000bzbtn7jnv59poxztruimf4yv47wg1q46sqf85ya8q84zsvtymklwu7o7bxohw28qq0xzw4j1hjsj5xkkp2glu7biqo3m3f',
                startTimeAt: '2020-07-28 22:53:48',
                direction: 'OUTBOUND',
                errorCategory: 'qds8jx3bziglcj5q6laeolw76xgt2rb6554ff0ioua4mqpafyghbin58tzsktihh2qjl4ib0zpmznc9hf6mhjeuxf0vpx7q3mgnd798nguskonzpki4cmcyeavbp0x7mo1b5f6e5cr14msvtotlgrt73ucu3gu6o',
                errorCode: 'ie1w1e2q5ijfnb5vkx0j4s0vm8rgpb33cvtstg3xnfezmu2x4i',
                errorLabel: 666823,
                node: 9465986458,
                protocol: 'kuvne41vxtxwqn1xaafu',
                qualityOfService: 'x03cyznw7tuukmqhvryt',
                receiverParty: 'td2b8drh2us96915flzrjbpqw8d926sz9sglve3dlbbisopq6erin9awg9fvb2qodsf6bnaq03lq4kseia0veg7wy9ddubfhwybczp8old6u9f2n96ihixjzze4z4jyalhq6p1b9hh4vtw28lxnrcppiddgl8jc4j',
                receiverComponent: 'jwby00lql3l5pmau9jw4vl9ry72s4utg29ec1kxpudv6xc8hkktsjmkijphujqbkatmdadeq7mcioqvpklggwtijosif6cy57tnvqeg152v9ni23xmdl6it1lxuz01ol3lacz1ifva95atmn2b337ziabyh1pktx',
                receiverInterface: 'q8qun2v8xhy2g74ep4cyzatqyh3xww86nv8w0dtuc32j5p5cc4eq0epr5ff6ehtdyibnl3253fobzvy126g6jtdpuw6zhifkkb4vcxggrrgrat0ju6qf81umqdytzpr7i9kpyw319i3c8hmu94q0dd5o2l5fbjac',
                receiverInterfaceNamespace: 'o6hs0domu13rt4yz77x02s38dfhe6bfjz2nv4aniwzy839ducgkg8i012k6lbrxbpubn81dzpxm32zka13oxwzw45vvb3mne0ozmz3d5cucgb4ptb6hak5wsfev5sacliwkw7encem8qtr7q4pzapapjbfh0nbq3',
                retries: 7394298198,
                size: 5913771304,
                timesFailed: 5336354427,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'wp2pbwjtfyg05flodilhu1uvaxkuknl043ddw1enypjy9jqmqg',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '3fpgugt1q16mrromhb21',
                scenario: '2kpdnsfvrmefukhhqq82aov483yi71nsclmhoieblw71br5438gn3ks1bhl3',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:52:38',
                executionMonitoringStartAt: '2020-07-29 03:55:36',
                executionMonitoringEndAt: '2020-07-29 07:27:24',
                flowHash: '92gmjwdvtipdeosleo7ssjurp3jeocaopqhuf2x0',
                flowParty: 's7fsk4gejg0xjs329w55rebypzjf1qosdsqthevs653x4qxhdpsgnatvlneh5ojvkgs6ztmxtc7mjec5jw5rgz2whkzf0dtoglcyzsyyi52obrssfp99m80j49u22n6wr6d4qokuxhj3mmbxzi0a13biku2uijbu',
                flowComponent: 'taw7q296709k0g3o6gkt8243xkbimbzzws2c8x4bs06oc9bsj444tc7hrfgzjob3xgwvgi6bjlsk38uvbc7nj0qg88fxvxnni47e8j1rzyzyyrcoac9ro13c2f0m4a8qo67v60fvgpunktkv0d3tkbvpchvnzgdn',
                flowInterfaceName: 'uv4qe2cm66w0m0wxg6bakp57x6sk5g9b9uh2envx29z6foidkoeoo0no6ovklz9tmlv3xuzfhzjas6sdhzvnn6dpia2ofm43syqlck372x62ls5wns02rxepcorwnya5amfvssbvrsw7qaf4h97hrvq9sumuk239',
                flowInterfaceNamespace: '6mzpnta3dzyouco6rhq56znzt2qyouu2hqwzvao6yknsonov0umh5gf47wgn4duaajh1tceknrc4dgo7659zirwd7ha3o7qpuzrs7nray0kx6l5onkep2zb29m1k6bgvjf09p0xm38vpha58trhea21rw6iposy5',
                status: 'ERROR',
                detail: 'Qui nulla in aliquid. Aliquam sequi sit voluptatem. Sed cupiditate cum sapiente neque reprehenderit alias fugit. Cupiditate nihil quae quia eligendi sunt eaque ut mollitia quasi. Quos quia omnis rerum aliquid. Vel corrupti molestiae recusandae.',
                example: 'mrancnl1cvfd4jzxfy5hz17671ljkdm4dv31k9tqubl676ev14tqw6gsp2wqstibxor4317brfiju4f5mjic9ii7ziedzku83wv2e8lpx1olnh5d2shbdgtitr0b65amz5frnz7fhspnmlazzyqprtnctv8ob3q1',
                startTimeAt: '2020-07-28 17:12:21',
                direction: 'OUTBOUND',
                errorCategory: 'dupk7li39cj8g9ky4chukwv0m9vvm723dnu4b246xn9lg8s0bmev3ll5hheu446360t3dp2ne3hc7zigbcz6bhn57bbk5q60wxn5yp5yyt2572l9t9idr0w5uxg474rsvg3z0h7qn531kxqfihcnsan07q09nbb0',
                errorCode: 'b19r9jlqjz53dif1fjwkip5drfsj91ljv8pyxg0p14czffr003',
                errorLabel: 341080,
                node: 8270469117,
                protocol: 'uaedu9x90ll38fs00qa6',
                qualityOfService: 'cic7ebcebdrgz9ogqaea',
                receiverParty: 'sn8wtgjr3o9ogxq7g5amqda5y6nqoys0ymw3sfuio9pep7fxtvgjna1a18t1qp78x8qu147kycllaf5g56clqgvd89mcel7dbszwjw7w1mhjpva75km98q86d1z9jqssq62q4ogmmflzimfdwtxu9dq9sa62mwpi',
                receiverComponent: '9ruin8ji4tbqrpqeps55e4ov4ca06pp7211qla8o8mr49yep2ov8cf0mux4xej5xfeu0epnkxncp63xgbb41yy47twyrn1lrrp8t19w5rr790qp8l6p20t2giissjdoenoqwtlilca3nt8s2j9dfgmpvtch1m0mwc',
                receiverInterface: '6arrc39e5pryrntzdqok3svaj3jf5amvuscgs5ln6g5102mdqffojyegy5gxa8d8iwjnp6sl3zr009awoflbu41ah7xoylnmjefwm47tevq6fuu2zlssk1b23xtadawmyo6ddyqv4g4wh1wtxhln34hrgp308raw',
                receiverInterfaceNamespace: 'ben93l3kkft2pftsuk9a0rb9jvcknka9eherpc4lzlzbak9888bmv1g75sdp7nw05esr9lcipc6zyypsv737q12nandtie0nx7e0fxawgsz4mmd2vtu4d3rasiclal4ntv5cbxtpwn3ipln546tcau0li7xk4qn1',
                retries: 5358957588,
                size: 8202326093,
                timesFailed: 8118845034,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 's19w7osjs9j9ant6vt8cc5bo27c183zoijs1weovqto7iz9ito',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'luyyhzfw9ldfft1spc9e',
                scenario: 'xtt40o7q3wshi8xk7svrpd7blh5wxdhtqakd3d17vbi4jtfusf3fykumbbom',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:20:53',
                executionMonitoringStartAt: '2020-07-29 15:29:49',
                executionMonitoringEndAt: '2020-07-29 08:44:49',
                flowHash: 'eclghyhp7735fxle4tyfcr9im4lleea3xdx6qxmi',
                flowParty: 'vmbv8gz585lbidcj5daq9uvvc3srnma9o0y5ojcnyamhjz2i27thvpdrt72flzzvrb8df4nvort3ni6d7cpi954777w7n4yzbheyb5pdd32m4bssftxefdnrt42603w1s774ybx72etuywdl77io13uwf4znx7s3',
                flowComponent: 'o68wg38qsanjn2jl2s25d8khhgt0h3rkav8msugl5oj91wzhl6p2dahcdtczbh0fztpif3lztr7ldu4nvrs0teq6v3y33vl7sqngw3gppczqdje0qyd7g3mb8xnkt81jdpw7p9sd35q5j0a1q9phpaawgmh55177',
                flowInterfaceName: 'mxrpaiqvctf0k8pcmqf4nbtct12wi831emoi9j00lgn3g6j95dztzh8yccvv5k6gc21cc5mtbcofc5eoqved962nvdr07mzymnocivwuoifvsvz13xy3ya11kz3wsw00f3zikv0map0s4tyrj5l5d2563q5n45vm',
                flowInterfaceNamespace: '50hat0u3fl7awkeibub0rsqbvjzupln9z4r7x1b5bf2h98tqdgqzdkko6jz2lqq3atpwyfol1uzbkggdx4fpqbgaxjsh08cfdigel1908mwgxq7t68p36izngmaf42bys8tn739e23p5w2gxq089mfne8hk8j4ui',
                status: 'ERROR',
                detail: 'Saepe ad eum nostrum neque minima quia voluptatem quia. Corporis ut ipsa aperiam reiciendis eum minus assumenda. Non perspiciatis eum accusantium consequatur qui. Voluptas labore et similique quasi sunt laborum. Soluta velit aspernatur corporis ipsa et. Mollitia et dolorem et.',
                example: '35rgz3jh0uofj6oios7t5bdvords8dhnlfvw9gquokex1qmfyz0ulr5zpzyj4r7bcp74gspyi29kizo1lxn2y99kr8pckrx3kzt88uy045pqh7vwaozi10clh90ad84oh9zck151p9su33sqc5yjgqmuvh1t3mpv',
                startTimeAt: '2020-07-28 19:00:25',
                direction: 'INBOUND',
                errorCategory: '6wiq4b4zx2azlvzygo5yxobx1k6jxzzwkoogn1omoqoc59lucvs3tz213leua605fuzwzzac14sp74w8gi22ivgdziihybgywhpe6ykvmg2pmy78iutxg1k6vsvs2zj11fwjcktcme4w2uzbzp9udz0zjp1v3wtr',
                errorCode: 'igt3cbtx9en2pv0btct4oceks5t34mctmal2t6b4xlff5s0jlk',
                errorLabel: 230462,
                node: 9123015614,
                protocol: 'qx787u36d05qpg4rtjmo',
                qualityOfService: 'r9oiqisyvomjey0vqo3b',
                receiverParty: 'm1tr90m66hsw1lfihkz1hedqdiytwdtqrni22ebf84mjj5rdb6mo6549ty6m9dhulkyueotl5klm6uyxt25kissnkgj4qiwvkpa2mokw9q9k2510dfthu7h9khonxm8dir5cdbxjxn6cet3uctc8weyqd291a0y7',
                receiverComponent: 'oq4pshg4gifgzgybdulp3axtla9mlvbnd1xcxabdc0qxlvep1f6eyqw2g3ganvzfgy2cuwhypqp06k1ylmsd9cpmp68ddu2cc45ox8zfctkxp0t3tuqw6yzx9ilddayx3gwo2oselw01xgeebsbh75ck5viad2nn',
                receiverInterface: 'aga9wuqrqco8mwvy7pyp462xc9snnr59efv1wwfv05tm1g03anjk0m96i2cbn4uixiuqdtrnca4ltf2bplx3sb1q9y4sjb917it2wqcpsbji1nnatqal2o03rwka837op4jfxjvbpkbeqlmjz90vmffizle3xi1p9',
                receiverInterfaceNamespace: 'qz0zxku73c74njeewu8p2cs5lny0nfa935nxizw5za9nktl27qnlp55il2eh9ghharyzzjbczp41b8gypq97b7xw83y2hmert57n0pgzgpz8wimswbr08z48lcasbx3lwlg7364gr208ycd4bwkt87omddktjh6t',
                retries: 8713670598,
                size: 3064909367,
                timesFailed: 8620529414,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '7xocg32pb1enw0sgj383e4pc3lbosfcwc7s0tj14872z3b811s',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'iprkg00379ovpnftuiyp',
                scenario: 'hqlcrieuqww2shmz85v4sqirsqz8zkv8egab2o07slzr1nogb2osbfwd68od',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:37:08',
                executionMonitoringStartAt: '2020-07-29 07:30:57',
                executionMonitoringEndAt: '2020-07-29 12:27:04',
                flowHash: '8gldmaew5dxzng7k9zqx2baj88jlrkce6p1xqs7j',
                flowParty: 'csauuuiktyyp3zr187eab2euie0o6vdy4pk8hx3xrv9y0fzaqo7jc75ah41ebocfkvui8ja6xeg7oup5eptn6u4j5xw947jz7j4gvl7mwx4zjzg4ylhwtzfhro3vskk2z2jiqqna8lui5j3o5v1ezodgq0y4omqh',
                flowComponent: '2ev7c46qhu9gvi5anf8t3vo0guv2nnn0vnlws1ikso14oxs9dy81v210rd0apjb708cdb1j7zmee14pz46o9figoyt0j66musx53clfx2hnm4z3igzfhn9xt9jxto2v4jf7a7ig6h3ee9dsfvj4308u8zr4q2h55',
                flowInterfaceName: 'y2adowpjw5ch9gjo85b5tjaxe3ff5h07qjjpdz2vewwtd4iags255h89wtdfh1tgntu09nmhtmw8jaga6nu7gf8cj6kg1zkw9jc5obr9x8qpu09c0fepyw6wp01d92up9fzv0hr6qnvsrwlb9lfi1lucwdk1im2z',
                flowInterfaceNamespace: 'i01ke3zp4x788sba1pheglkoxfiwb9g2ia9soebohe8rk4o2y0slg4p0ixzean3ypg2hcdxt54k35k20ge163eo51uofv0f4tsbmyg90epq10mppvbatki0twts88fb4ymmqq4pzwqh3vqisi73yh6khcjxbcw3a',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut facere tempora velit molestias. Numquam voluptatem qui nulla consectetur voluptatem deserunt inventore quos reprehenderit. Maxime nisi excepturi deserunt doloribus possimus fugiat sint. Itaque eveniet sint quo dolorem sunt vero ut. Facere est dolor rerum voluptatem alias ducimus doloribus quasi repellat.',
                example: 'ohy0odh0wy7hbtxgnw2uyfn699uo1xjdhn32qa09roare8ui2wingtz50xuv326mjj9oqnjsmd2w6m7mhftd6if7aw82ablkt0sdv5s6baiygpimw5sf9sbloep4p8d4slv97ef9rs6tb2rwqonm6kz12kafkwvn',
                startTimeAt: '2020-07-28 17:21:21',
                direction: 'INBOUND',
                errorCategory: 'g213igwo8002s6iapyxbajbg857el5lf07xiilf05qohewyhlbl5rw51nin1f7lhb8bwwprj423kzkilpevlpfvik3z6ha86j05b5ow9d3ggdco6w2a21hrzsuo8bgsyhgnu1sv958at6w42qmhzh44lsvhh5qc2',
                errorCode: 'u4f75hxpya8ayp7wy5jlg6fhd2tjkljlb81c1b3iy9wdh1fvs0',
                errorLabel: 926525,
                node: 3121355340,
                protocol: '5qd7abpld0ug5hfibs1o',
                qualityOfService: 'qdkol9zq0vkr31jmymw9',
                receiverParty: 't4t287rzqabzxm250en8nrh82cohqvm9kr1png992fpqjyfn2n9fs5j09q0hnvn702h73cuoyyuy241hcvgoqjcfl409qvjbq8o41xuhxb9y2pwn5a7wi9iwyexxq5hkh5taq9gw5q2gskn69svek9q6i3wmiiss',
                receiverComponent: 'igf8g8y8g594v3jfaonqvxztatd2dpkw766nzpkamwfm2m2e1hjuy38dam4os85sbymq4l965l5g73ib0jtk2fbwjm0g2fubuqn45ascris22j92k389ildqkgrtj7km9iaoyyirp02shxbrg9q5foq7nhe0jivf',
                receiverInterface: 'zsep85gdb5bqva5l9523jh8vcmjcegbpjph4rxt71su9zzinvaxrfxrbdai22gdgk00g6dq2mtk088yy78thgdz48y5sbwc8bv0b1rk3mgnn5dr94oldepnwc7d93d404hue6t1rm5jtqgvuxxc77wofqvtkreuf',
                receiverInterfaceNamespace: 'uwtb3uqqp3imophubtgsaf353r01eo3mw0t7q7dzqnhtm3pejv7qta082qcjyxx2iumwjh3z6p7tsy5nb3dk4ywdu7ndrx2fz8a1b7eibnj3nukbqsm51er3dy3byktxmyp4oiqipkhg62detwj8dehlbexk60z0j',
                retries: 4162143709,
                size: 1048908894,
                timesFailed: 5560553388,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 's0fq3trid6jf091mtcuwnnen9lryh7gyfba9n1ga3hs7crkvtp',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'qjjmlfforvjr9tciy4fl',
                scenario: 's8rawbbwoxtfo5qins03uq28ugcjd8bj0o5yrhjc6owuvh6z2f3w10pcfsn0',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:55:38',
                executionMonitoringStartAt: '2020-07-29 14:26:42',
                executionMonitoringEndAt: '2020-07-28 23:41:43',
                flowHash: '6x2d0qcetrgky8vkqdx371vn2qb62ihe3oibi3uh',
                flowParty: 'dwdkhww3sjqxwy5oxdfag7y2b9xj6e73e87qpcay2ja7mez5f8uuoso9coenlcg0wrud6czu91cojbiswo3qxqvuk6hegz21rz4gy3tdlnbehl2mw1yynkrka6skgx9dkqmvciavla84rlk8xth1ra5ofm7ozaj8',
                flowComponent: 'iwo6rb2561km7jpp5o8dhh3tf4vcaf4stn7bgspyfglsbot1fd05pajc7h0sz4ditxfinvxyrvdp36q2hx2x1dyjtqoyn0dw980r9wesd0i2wp7edb5utpkiols935b6y5409hx5me1lggbmj4hgv91uupg400xx',
                flowInterfaceName: 'eqxg4birn180jkbit1k3ez343cogw9tjqhj8inj4k6suk4b86avh5h5vv63q7sfttc8573ky8jlib3788u8ify6m6cymvph7of294gnutszpmu0i8xt2pyfhp524mxa4d7g9co8n0yq4hfv6ks2yeyihwv0ilr98',
                flowInterfaceNamespace: 'v7sl5impt1oivzbuqn5voiump3m8x8pqqm88beqj348c5rsesp8tl4ne31m3jgz51n89jg0nb4y8d4kdw43kyscajxwhd5anqlork0sgabqxqo2o4okwu6vq6lytuh4ux89kqzj9si7vjc5zhtedymuawulb6igi',
                status: 'DELIVERING',
                detail: 'Deleniti fuga mollitia est nemo illo voluptatem molestias doloribus alias. Et quaerat nostrum quidem eos provident. Dolore sint animi sed incidunt sint.',
                example: 'cgu54qzx80almuxbzmanesapogycipl0ce9yl9pa4xl8bld5w11cte5opg5zwkzbe7mtr3ahbv06ukg4dtnllw0qbp35y331jmbhzqq1vu7gv7qkpc1ln1apogczkm0pfpk9xlvwiz7ktcwlclblw4n4mhm6y5un',
                startTimeAt: '2020-07-28 15:39:00',
                direction: 'OUTBOUND',
                errorCategory: 'y6kpng8j375c314ro6pr3nafyuehivd029w602my6se8x3jkyhqh1gew8p0445lkk224u33iqjw86lllrursfu4rmjdwhy7ev7ec6rwulut305n1hye0nlhszsq14w5b2k9xxhb45maftdw62w5wzfy5e080j4nm',
                errorCode: 'iy8rv3h0xfl4h4kqn23k31rhifeo10ujk22y3gdf5uzw4be6h6',
                errorLabel: 558322,
                node: 9445577561,
                protocol: 'z94xvgoyfh37gofgfnom',
                qualityOfService: 'wg8q5ximiiuasw7fk59f',
                receiverParty: 'hgrjpqo47gbamrt8h5idkkvbi3xfce93yt1rckwstkt7zimyxmuu80jzo3kw4yvjtuu77rm60w9085t0sgrg7o6krnwg8gqbfaogum89qkb42qrfajjeh5sjew3gogkt6l1yuzgk61t5m0w2b6npwfifpp8rt0vr',
                receiverComponent: 'egmjucnmtp0ptr8p9uz7v33u425j3nstl82i2shud6ncw5vnss9y37g3y0pg7g407592tpws038r14k3f11o7e5t6exo8cw0akbyjfxm0dcreahgd4imjdql3orr2kaqwv2swznzmr8t26wwn6eefiq9sydi5jxo',
                receiverInterface: 'rbbitptgd5r6l8wkbia4n75o9ljgqs8o0jqk30kj5yy9edvh2i3osnwireccby0j2zhaw3n2n22jpp9xpn5lxyq8v77asoxg3eq4rqk5k8p2jcbgtkckk6g2bzq6jg10qpv5rqmxjojtmg1zjuzt59zvdhekqpa0',
                receiverInterfaceNamespace: 'mlmlydc40qvrbolaaj2vuuj6euypmdk5v3jsefzgdp29l4ok0nwp8crv5c6bjd02okj0vasdih69bc20fxx2sk7er2oja8i1ecnt0m2jivvkuyh2i0uym6od1tj88h7kby1whccqq1q9a74xtk0ztvxybevwv3lh',
                retries: 99186513489,
                size: 3498740866,
                timesFailed: 4036634961,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'krxg6pwgu91g9qc9wgchamapq29i0be3wrl7g0ce1j93ydz5i1',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'qqb2v0p0ti3g3d16walo',
                scenario: 'ufj2obvo3wbuc0j2rgz8wpidy3ir9mt5mjdgrf07zsqaciksh9d51mekb49o',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:06:52',
                executionMonitoringStartAt: '2020-07-29 02:53:52',
                executionMonitoringEndAt: '2020-07-28 19:15:49',
                flowHash: 'q61cstteqidm2piv1at1rpiifvxg6qscejo2hljf',
                flowParty: 'ehf0iatt2gfmbtlrdko7n4hn3yvjtfb429kmfc370mdyr9jwno90aehthplg2b74cj22kwka1jc4874lhu4egc4yya9i19n9bczs843e6r33so4twavls4eigizs7p595363oz5pskakti1gs7d10jacot5pcp06',
                flowComponent: 'z27jvozgu30vso6pfyp77rae61jsrxfiyklhcq7kvmdfsfnqjbeefclw70awxjvkpcp6rpkfiw26lkyct52av2xrj01epdu4nz06tao3zh82npa5x1g8h82fy29s1j49znwf0x25ciqdxaczo1tx5c89hkoxpc7h',
                flowInterfaceName: '0k6qs7ecy8xmbcp5slmak5fxnmv1d6fszwnfv55fszb7jeskrq8x4zrv9m9zmdnh7thaylw0lij48m9qca0h74f2s7dli6jemyzy7yfz5ezrlkcb37c2goyl0e9ffrbs8knq9kz7qvsvkh59uzc1abrvsdo71gyj',
                flowInterfaceNamespace: '572fv2yr014wnbzvd8umzspmoy3ecvus2831kbvl2mx08r3xli0dae0xd1s325e83s58ow8gyx7cpbnksl0lrogj0f6jmkxl9bcpikjtmvoma2ye3ee5npurr47ktiuciz5ssmwfx1bshuog2tzmrdz5qnw8bk5q',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut iure sed est dolore est totam quod ducimus. Labore debitis corporis inventore voluptas facilis ratione non quas hic. Et ipsa voluptas sequi quam illo est esse ullam unde. Et dolor aut quia autem vitae officia.',
                example: 'h9hrk76o5eec2m3067q23mglm56mlsfsheurpvsaz2j4p0w9uwsyzziva5xa8nqprezg5q2pnc7wy00m5y5lmf5s5qjco3s7ttqhwsm4syul2vx0zal7kbhlzpq8f50h7mg9j7ifbrxtei5jub8ztbik7az5hh7z',
                startTimeAt: '2020-07-29 10:16:58',
                direction: 'INBOUND',
                errorCategory: '31y9rk2i7xb1q5oy07fv21qhvob66ofv60nve5n2xe1mzqlqjnyu4udofriumuyp3m2er04ikgflgtv7kj45ia1nkcxrw999hlcjgeyw25vr0ci4q49pyck4wcbomn061tozt3suv75db4ol3b4y9wi9stv38wl3',
                errorCode: 'pshh3qa1jhi8byyk2pt1xvyiat43oksur31q0owwcw72kqxmao',
                errorLabel: 984530,
                node: 4703857388,
                protocol: 'f9ejbeuktxwj8mjiywog',
                qualityOfService: '4k6f7l0kgn6ykgu1b5pe',
                receiverParty: '6a48ckkr0xhiy9vmtl64w71qv9acetmo59wac6rqqyj1cu6q35fgsx8tu85b7kk5pjnpkmr7fuqf619xp3b7jeblweny8n0ib73yeh1o6wns2a4lg2z2ttx9utmdqqc0tx9paqfr20f2je9uyh2b2ypyxho7ya73',
                receiverComponent: '9plz5kitl4i3tq5lat4mya7237aorakt6jz4wl1mauxb7u2ipy0m6kzs6bb5g76sx83zfj2iomrsyxdsfqscrehlr42xjnbak968xsgnja42rt45a9453e1toyvthmtv7waad3licwhs48o4941qjznlfx743b38',
                receiverInterface: 'nr0ktkz4k2oq0xhdud8t91lb2qujkue4hbi2khz3djx4d1uus97uvxwe13n5tgdafss88cpniuv7tpb6s646tgfjqc3nuyk1upynpcm4mssz9wiohx95n6mm665khpqqp2rfqudcl9xbqjzaj3v7zay8puyh0l76',
                receiverInterfaceNamespace: '05uc5beuxsjoair6l5qk8b3wag0y98vnnp3ur6g80yyjp0l0rrll52yj9ezhvm0o9gngrq3wc55lyaoiq062cdqaa80wq11pudssypag69uf6zjkt6ts1ax4u9h5f203k4zmvqk1sqhgjh9k3whmu0uybnw1w6p0',
                retries: 2099183794,
                size: 99445893522,
                timesFailed: 4064221787,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'nhdbhwc47i0t8as0g3rg86oxkhs16977quwm0ijv3ihml4bjke',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 's7vsl2gujfmxbr2dwihx',
                scenario: 'd0390c9itkuecf0stefg79perf6pq8htzqppui2xyywpq3wyzvlc006iku72',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:50:22',
                executionMonitoringStartAt: '2020-07-28 20:44:03',
                executionMonitoringEndAt: '2020-07-29 04:46:49',
                flowHash: 'uoc5g5c6i8q5lsfe6i64s8rkzxkno5f4hhk1ofhk',
                flowParty: '557a07cuuq7spzurnxbmg5md6tgcfb8iizxmn61mbo71qz33bqnkezu4pkr0hn7xywg1d3ujdmm6dhllo7w8sx16xwrxrsxdfv5jiahnnpwj5hf46nbuz7kjet2x53150bddjegvejogvojl57y592frojqzztt3',
                flowComponent: '2ky1pg3efvnzk7w20dvyn77a6emb20covlux51gw806t9646l9367kdwl755ld0o2xrzit795cjm28sa0juxzy4lus9e7mydrtz25nstu3t9ljir9h01b3y62qx62zec5utv5yvb1edmn9nzlqab8zwzjkw96opd',
                flowInterfaceName: 'gggsbwu9u0z8nkv8ivnd2n2peo5dotlulh7t2v5ebc6tfp1438tbiaicts3qnztsxubu8frp7vsbdlh59ct7omstkalpivw8yoy2yz1zvynyydvtmgzsyj2udu9xuwzcxtxnk8ih0gs7f00qzq460n597j0gon9z',
                flowInterfaceNamespace: '8duqdgl7m67tl04etadpu0m6yobbya5szjarm4lmfiavoagah3946glb1bl8e3aj23hp6vmvskujhc7tjloe9jdgtgoyxi4n3puic959gvrix6py2k80zygeubzmbaioleb5890nssqtdx1edn3eqi3f9oko8uhj',
                status: 'HOLDING',
                detail: 'Cum saepe quia accusamus nemo alias illum est corporis eum. Esse quae nobis eveniet reprehenderit qui repudiandae perspiciatis quia. Sunt nisi at non. Vitae excepturi in in. Et sequi aut et. Eius sed natus.',
                example: '4wa2ua6l2lau6bt58a9zrauk6pu3x04chgzmefs5ocu7fm3trdbqhdgl198ckemah8pq60btrvejneyejx1l2lrgdp4f7l3sc2l2jh5v454yo2aezpjhv4hegt5t2q6wkmgxkflycd2hp8dm5eaca2vzfz0towbz',
                startTimeAt: '2020-07-29 13:34:27',
                direction: 'OUTBOUND',
                errorCategory: 'kwet6hyr9g2d0y45dd9c6c8lz58a00qfm8w2v6vm6fif50794sqnv76tkmql14io8h74wsqs7g2xjb7t1xfj50vlatqmfvl6p38jyz4pgvlbhlhr3y000i5e5invevbf71fg7ck213ohbmq8eovhmaqe0av5gpi7',
                errorCode: '7o6tqndmrmvmsv58lkoxromikyme76gkd351cy0l2pdk0o7ot9',
                errorLabel: 216292,
                node: 6581575518,
                protocol: 'kmgfv8su3qnkdp167m0v',
                qualityOfService: '8axcedwatn4kdcppcdjq',
                receiverParty: 'mb87d323wid0ll0tfhvy13io0xnbfqsh5zzix2a0653zz52shdiixfj7s5mcfiiz95z16q0zxzp2qwv202yvsaqz2qw13j9qgr17u7hvt81q7op3a3dq74emuqbit7tgn5ssa7ku3zcg5jiwnf9otfrg0e6po34z',
                receiverComponent: 'ehd30ylkt8q0wy3nz0wpaydpdws36ssb66mx8c42fxia4k6q3vn2r8seajbb9jl1cb8a84xt57tyrampnvutv9c14vsy5kkctf4b8vnazawp0x97uwpkjzle5eyaftd85beq38eq8bj884spfha2lsdu3754wsdp',
                receiverInterface: 'ehwiksnfzdkfe84956rta2hol1dcz1u1ei6ckpk3d1xg808t0bjaenj09ddvizslu9syxmjvxaf40006q10ahqf04d42lgih7msz1711muqa8ida60gddz00d04boyts9tym25n52fi56je2h1dxlro190g08js7',
                receiverInterfaceNamespace: 'fe52b7lvqb5fd6w6khjqigdso8h2xnrpru0subsip9u9kf8xns7btdnw4qcnt4lfda0e9isxhqrqv7fc0myds9vls8ehm5un04ey5u4nmswxozpmomyxbthhiqo7r5tkav5chlnvlsl7ff7pqxf6gahg4nn81fts',
                retries: 8642127825,
                size: 3716004894,
                timesFailed: 38865598403,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '8x1bvapz40hr8i7dvx1fh2qsnxn7axjxy5a7elsyihx31hsrpz',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '7mmpst4hsf6xa8gm08qd',
                scenario: 'b13lxgfs1jzyd9oevaijw634vdncb7h2klxpq9vqsuzs4pgteqroryw9ik5n',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:16:07',
                executionMonitoringStartAt: '2020-07-28 15:44:14',
                executionMonitoringEndAt: '2020-07-29 02:33:36',
                flowHash: 'sasp3r76wcms0xy749zu29xvzhdnvdynn6xbej5r',
                flowParty: 'qa7v8ni1gt15kj3nf6mdlcskfvehhziw8vndbf7z37yq47cxwmi5sbh2nyaulnz1u7kl2fl5dqfmhfv1z9iuevlxn9f583f6xno8j1ck4jc4gn38o77y128x26eflz2srst6gznt7iovwjb45vskvdtc0j7gzees',
                flowComponent: 'qk1jqkdcw10zgxamogq9aapw2z2nukyr5cikmlu543ecgsaxhebivx84ial87zq4cbx7k4b7l8mxpvixnud06auj99g1xw3s43cjbwdi0c1owljuil2xrbes2o2m5d8ewspwkrcbc7fqde9g4m7lwx24b553w0aj',
                flowInterfaceName: 'oaps172dsy8gv2263mqg68qkqxoafs0wsuwx125e857hlurfxf50284vjx7uqspf7c9lyzr9jph7yjr6phoef4gp4xwv8ey37b7p4ijldcrq1xb2f0014lyyzacsapwlw6juf4h33hcv5i5578rwdxrdp1n5ts3h',
                flowInterfaceNamespace: 'yhck50fpssy4vxw1r1jx7cb5w7d0a1t6hcmjan92d9b3kpdtnmubib33zc5n51ot50q7b2h5yjup76gm4hu9lj43xyh7jfthtpjlruvkp3xmlqotra9nicfd7np34c6of8jfblkxz2b8hu2mf1ncixhxrxtqfn83',
                status: 'WAITING',
                detail: 'Assumenda ratione minima ipsa accusantium. Quo quo dolores. Amet soluta a non cum omnis occaecati officiis quod. Nostrum sint debitis esse architecto sit recusandae. Quidem voluptas ipsa et dolor non non voluptas.',
                example: 'a209x8s7vlqwnv3cuohd2d4qy0v2s39j5gkdw1zhfbf6qu113aiduzennc5ehhm3vdjajur4rdredfst7p75ocg15azwsnbo9skx2el2vo3zk0ltncllbygjflf0v5739c1ot3vulhgb6nhd00k8xmlh33gucm3a',
                startTimeAt: '2020-07-29 13:17:26',
                direction: 'INBOUND',
                errorCategory: 'rbhhtmbs237pmq8uo2byj003fnq2gqpgjgls49g08jydhpbdv8vfoszgrym8b808bzvzt9v2rajimzcj7h9rpte20ueoiqmkph112vntdjnhufhr7k9m7foft1v2dkn1z23vn1x08m9imzqppofg9dyplzncvr4x',
                errorCode: 'er9yfaayz4ho48u0zyqvk1t31jzp0bjxc7gropp77qup8i10b7',
                errorLabel: 128010,
                node: -9,
                protocol: 'w90sfnhdhzdk568brgdg',
                qualityOfService: 'a8vklm9fwqfwli0lvvfr',
                receiverParty: 'a0sif1g599g1yjv2rx3b9dubh9ah94o9pp2vpwdk6m63dpjopqd8xtzyjinxv2zcqencz1g42fxyakcq1kbjlp28bboe61uv8heo1hv2fokz9ufhu2r8eyxvdtt4jx52f1p74dutx1rlokhs19hrtuxhuxo1vyoa',
                receiverComponent: 'zxbfcwh8n6ltkhotwpdycqv3ev8uh0sorriz0mqcznz6lr60gf106yofi3hxxt6j16qvctuppsj18hyp1j4r6cilura0pwpoi8o3dbypvwko1y37qlqx5bwrg7pxsmi0nh15prjbx59u55954ak190sf7atwjgpy',
                receiverInterface: '373ucrs6oy6s9j6661pzvaeglldaf9k3igwtpbv3gq4ehk0kfj06fmf94pyg3tuwasgfu797zp6jozv8slwuawdbhyhoyp4z8l3m6452dycbulktdpxlspej6eu4b1c9vkguiyra8z95c0wg3807ax6jpwi268rh',
                receiverInterfaceNamespace: '7lus9l4wgqcosfyjbamd75wnmtpcvbfdl5cp6q7egbfvfr767lq593pr8djia9kg6i36vx2r3wlpccecx5u316gmqb8a8po2lbmnkt8zhgjxm4sb1r570yw0hqdawhxcm7qm8xjdfkze86k2tkc0cwloh6e3tdsk',
                retries: 7647360678,
                size: 7570996880,
                timesFailed: 4832834215,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'tg1frcbs2xydq7qtbj2fuvtcg4jk91ebimjkya723i3yvjszjx',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'h6kc6smgihi53c3osa5m',
                scenario: 'uj21mniwmog2zvwpei1fmd0ggbdftj954t2cbguxvkxrsesm9pkj7nr08n67',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:10:06',
                executionMonitoringStartAt: '2020-07-29 12:20:23',
                executionMonitoringEndAt: '2020-07-28 20:46:58',
                flowHash: 'zcs8ldt1bxsqrd0fc662g76q616zhupasqaj3f2h',
                flowParty: 'tjcvcmjljtylzmwz15w52efu8pzq6do2igzz3x3gkndq6zf07r69m1v17fk3p2cwk1tibsfvmkjh66myulip4996wchp8548q422p4pfmmeci3mk4wzi7nw12ul557e6ipgj713iv23lcs4sgpxcpwyd7kef3y7b',
                flowComponent: 'k286iyzy8lqq9f6y4sg6exbqvzda0khoaqi7hsf3igakt6xf03exj3rxy8yumzn3eq92vfcv57o2egk1olajf1xpvosmmlk60pzv007g6l70mpxnjljv8w3xlhd2eg2i1qkx3bmw3i7qjbri43bkgg5deiejzz3m',
                flowInterfaceName: 'k50fjfbkh92z36o81szq36q4rsnrtst5vwhodz0hpw7222cvzfbq65d93qjeizg3955iq44mj7b2kyebl5gtvysq08u93otpzu4msasr4813p4wr1sqv91up9t26v68y9rgyn68z8txd9q67mz5pm35m5b3pbqvq',
                flowInterfaceNamespace: 't53ih2m6adgyn32svmt7qnsunvhi64x75sgyeey5rvsgqeo9bwpgk5zb5sowfoz327ccs3nrxce96f2uskeekbbihkkfci8ker6pvrfal1ltvjewhwnxopzi510hls59alucyu9gug4768x3loxaezw5ck1ko8an',
                status: 'SUCCESS',
                detail: 'Eos impedit qui repellendus repudiandae dolores officia. Voluptates ea reprehenderit fugit. Corporis sequi neque enim aspernatur vero iste illum officiis voluptatem. Sint ut ad aut dolores dolor. Nihil doloremque doloremque eveniet et rerum.',
                example: 'rrhdltzw2564y3pw401ksv9heqrbie2jjlymss1y4g42oim5hnkembg2ckl8wy1vjuup842jbgmj9ck3mgs3tba8itlq2boui9r1djplko9ch70g762ts9391r4uv6x6pi839dq41vxptbqhvot1lwig0aat825l',
                startTimeAt: '2020-07-28 17:33:57',
                direction: 'OUTBOUND',
                errorCategory: '767xvqh0p6nf58h28ginwy8nr0ygo6d2j85ipocv6dc0sdkruw42wuge96itp5li6la9q71fnkclboy9x8fm58py4xzvqcy7ab53ssrazp1lsird9b4de33b4du8nsn5hxmkty41agu24hh17q05iigsho3ssyem',
                errorCode: '5jkfdtxrnxuv3w80b48uueujy05hk3zw2q5jsvpdhu82pgce7m',
                errorLabel: 560893,
                node: 6941395050,
                protocol: '4bujtsi7vqqk6j1gtckt',
                qualityOfService: '0t9gnqt418tidqmyiym8',
                receiverParty: 'w1358lhfcgoi4m8d6549jhr1k2fl6rdc25639ihdijx7m2r1hgb7v87i4ckiy5yijl1o0efz2e82hv3u5w0970unzcun8o72gi6px2uj0r9auvk33y0ehz54c3d71aee5zo0h01dipjy6v3ba10a848tgtqb6l0y',
                receiverComponent: 'jml34z3339llxeb0gjyiewjfwqby4g0sj6f5w91ypcp5vz4qsltz4jjnoxtdlb41k5ryrkezfyf0fwz3xygkugkrspgjzk2n0mwviz88ouyltoscsc5t03ifdxuv9jivwekm2b99m5mev73mfjf0b92mr5w6g7v0',
                receiverInterface: 'td34awk97fmnr4gndoka6y9zerwm8z4cqupy503ia0asdyaeuydr7znt7cs37d2ekd9r05yi758epjdwjdrfbo3m3q8h3u4pc6izy9sk528z703dgfl2veh21vfa1pqpmpg4gftpnfq3l2jcfbe8kzd5wesok8cs',
                receiverInterfaceNamespace: 'f4umdweyt2iyjw582zzrri5euqy7udeqvgbzmicagjgxs7g7i5gttond0dhzc7dvx28glq1o8mk5hhsu9ui3b5wnak5rpclr0qic9xhxjbwkvlup9mhi9x1von0lquxu83g1acxcjzskew4mdq63nnb17je9zrhr',
                retries: -9,
                size: 2145082283,
                timesFailed: 3106106676,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'vhzdhn2ht8ftjf3esbjj46is149pdcm1o22svfv1y49m1z94w5',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'cbdvpxfrnqfbkyzcucdq',
                scenario: 'gf98ecoqailvh4b32dz06sb8gy4md5logjqgsjdjdz4qgliak02zxmq9qpcb',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:00:15',
                executionMonitoringStartAt: '2020-07-29 10:57:38',
                executionMonitoringEndAt: '2020-07-28 19:24:33',
                flowHash: '05rm86oh9t7tnj412fzk6wdtg7z5jxjplcsznv4a',
                flowParty: 'xughpa0n80bgwy29z4qaro6g2oar2t2f7vwis7gzfiafkmomr383bfo5xefmkezmyd0548spyqtv182shd1qcpcwootoe3bzy9wugze7l025gxkrdn6a9hn0qg6towy913eb2cxlbt4cvy0he9436muny1oaiox7',
                flowComponent: '7s1dx54p7124h2xzxjrpoab2uim6vjwwqzh1t51kajtdlfxk8fv584ae9at096y25oz7jilvnbizja3hf8ujs5drxsnuruypj4aimtj27rrw44utyrkfgajmodev6gmwht41pf042gnsgqzf3jgvhp4izamnuhge',
                flowInterfaceName: '1k10nlqercoeohmaq4mbmsqltnjpgms92zp69jf9twstsxmy30phnzcrfzfqe109uvp8joz06yfnkixya8if3zwmcyyrosakbjw7yghnxers480xrm0s3qsh67jw2cgvqbh93eazmp8cs2nvb0trrbbumer42049',
                flowInterfaceNamespace: 'sawm47ar2qojmwokgdlcbepuoq92izf1tf5hou51321gtayzb5ap90fjqvlonsysx1vouv5bigtf4b0ylruttlykax6drlgkncto8ianzj0q8aoxciykv7ywhvg2f1263boqbqhe0psye7mys7pjcgxjieb7uwtq',
                status: 'TO_BE_DELIVERED',
                detail: 'Eos laboriosam suscipit non quo quia odit. Quo reprehenderit corporis eum eaque beatae optio. Voluptatem eum modi in et quia. Porro earum atque. Ducimus et esse quasi ad.',
                example: '08idnlrt2nfvijhvc87y8gckz87598golnxar7gadtpka3frswqdkdq5ae90tcoomlmaqf3dvtpi49btchnyud3j56s7iajna73bm1qqp278tmqrf1mwmkbi8z623qbflr7otgtqfqzqamwxmvyvjqc7xraefu5y',
                startTimeAt: '2020-07-29 02:33:24',
                direction: 'OUTBOUND',
                errorCategory: 'q1uufan84az1fdvkdcxbhecspi99t6fg88su1rnv3fwgfmvdwwf3ihpcj7850303zjdscgy3y5lsypabq6wdob83vt1fxc9x5ewvb8zztcyigo11012msm0c781rne86ifhsjzwx5blxuj2804d1rljqez63r05k',
                errorCode: 'wxaicl2nwpxpqzbymvxvpdyrd3buywx684r206yehpb652q4om',
                errorLabel: 570069,
                node: 8994173847,
                protocol: 'bd81ya77fa2j071cwyrp',
                qualityOfService: 'bv802drvab2r14d6gaec',
                receiverParty: 'qq7suoea6qbhpvjhwhc97zn5tgts9629rhq7vnmpmjl7r55pfluwlcdm374o64muk7s070k2fxgagx4o4fk073tw2mxxunpszqg92syh0ux1mxpk7k6u3sso94xg91pl91kp0qsl3401d1anb24zgotrrhiavo5g',
                receiverComponent: 'mld8kovftkfbfpypuqhsustvfpehvt7vkefkajoppdkrmhxe3v3s8sjhuxhcxci2z566w5rdrnptfol1qbd87z5q4cmac9wvd7r2jc1u4u7imfd301izhjyqco7zglnju6hnxjfliqqqhgxwtfffunxquk962uep',
                receiverInterface: 'koczqozorls8x0w3kucie1c08k8n3wj2fcohgcibuqymiyt61xeykfyixyrvbk798z3cew12n5a20zai93xg90keyn1qjo8si3l8pubw83ot482sv9cl7h410v3rs6nd1vp3ngt056zwvwh129640nheeqt5ptrq',
                receiverInterfaceNamespace: 'dit1gmmwezy0lam1k3ai7usd49ydltc164xyeyjjnon9k43jtmej39dx9i8p2w7t02ms6aarkt3wu6k6nxw9is2fvgwxk4bko39rn24z2yis228edhki9393h1c1vj3ox34lnm7itmm15q4ak7pd43kerpglbzoi',
                retries: 5593695882,
                size: -9,
                timesFailed: 1029467155,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'b1xe3q3gn9h7dawvhsf1vp29d77clw687u1j5vcjwwo1mggeni',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '9an0htiy9457t3hjgjds',
                scenario: 'y15j17vrpkvay5i9j3teh94tsz0199pvhh4669287tuw60r30pnyraf5gqyh',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:50:59',
                executionMonitoringStartAt: '2020-07-29 04:29:30',
                executionMonitoringEndAt: '2020-07-29 09:34:43',
                flowHash: 'xudodiqydo0w8pbd538e1e17brfckkn3rhtcsys2',
                flowParty: 'aqa2jmcuhvhjvvgbqq0f253069f4hqel7fzod2bfmkhn6x44cll3j804bmg78iv84ryg5rmch6v89607ax25tzz0mirndzsavr95povraetopdm6qb8fpw1fywgcwl3vzlzk5lpuulx0i0eayvvdz5svhxmxiw5u',
                flowComponent: 'tvwbkgu6p0kn7frnyaqui47bcb0ip8t0j28wwbfx6af9j4xdute87ykrr8akk5dplhfmas0bl8cmme7e0oebyibjddz3uhxrzwrwhtpcpts32ed8d9hxse272qk5xir60uuwqn221majmczhoapaikihc5cmzsm7',
                flowInterfaceName: 'tl2eww1ne8fbp1655z6gp72t1gmftejpbaextis2cecnjt8bzj00oj0xsde2l76616zokl3wm45lqfqjml4aslpt6yn826fmzqt0gwlg914twsaot3olew7nemrmeusxfsp712fwegtajiow23d2lypqfo87m6a3',
                flowInterfaceNamespace: 'riqlsye71ivb2r2qk4e6moqz5wr4487iifywhnntw3p1zvr50ljskzkc5dk6cn81x15omt72zpn2etxh07oc7fv2txlmtui8q5vktjefyag7yvb5p81oxr4lxxwsfm92nt1rw6q0n9vrl9jrplimu5y3h0ox5pse',
                status: 'DELIVERING',
                detail: 'Laudantium fugit aliquid modi doloribus. Et iste accusamus dolores impedit. Quasi unde id pariatur blanditiis magni ipsum aut. Quae magni quas voluptatem similique in commodi sit numquam. Officia consequatur sit aspernatur.',
                example: 'st00247oeegg86vpdbwwi31v1k4vf572841lbb2vxwfaf6c2w3uuv14e09s2kvpzqa7fc0kjwaoo86v5rerazdbat0ef62xneimdkpjnnz1iky3l07ytc6tp485oiipr7aykwb6uibkagp13dzo16uzmjpv6trl3',
                startTimeAt: '2020-07-29 02:39:17',
                direction: 'OUTBOUND',
                errorCategory: 'nxslhh95hgno5s1y2ndayyj209nn7h2xccgsmq0zgq8kyunrrden3v09mwxb0uc4tmnm208an44m4te3rwmgucd6ppdgipfwl68agoafzi6wez9rwbkk7u346pcn4oc0t625097p2gefurzmx9bgghio4l79nlwn',
                errorCode: 'jcqa3859bjz7m1ia6wh7gruisn2t1xtz74meqms6pvfm17pscc',
                errorLabel: 722026,
                node: 1303709306,
                protocol: 'vy2m3ngxrzcvsxwrb33v',
                qualityOfService: 'w0l77h2e9cm547dc3uw1',
                receiverParty: 'o1hgrnzeuagl64t8awpm0xjvf6mpfxrgm25nabvrptf5s6p3kxoq0466wmb95s5xhld80eqim8x2bklyr68j6nc20hocw04ub4b5f3atkrvch4cweom29x4sxjyc8thbcyh63ht2j9kt3bbwr2c9p3y79p3vux4r',
                receiverComponent: 'spcao7s6eugow4uxaay6ydxyqzqhphmesu2jngsc6xrq0o3d1kwsgpejvqlfnx5opy42tuopnmkn2rwrgmhb2oepaps6ooaucpjwb2d0r0a37gba79se5hdbrfouaod51vclvqfifi9es798m9v1dkfokfwekf7j',
                receiverInterface: '11r8rwo1erxrld1fq2lijbv6fqypibdcu0h0lklkllps0z1kj4pyhgmr67m86imiq21a33fbv738ghdr9wed0jz31w0s0mwbxfqgm8tu2aid6ccrx05in28k6pe0jhson56137xm2hnsd1s32gi26xzzfuw18euf',
                receiverInterfaceNamespace: 'whg12pmb4p1uvf5edyral2hviwy3o7d37gfatx6645v74acalqtioibvwyor3nusuaptore2m8rnn2israbd2kox43c7z25m1qvn30iwcssvhfxy4q0jr8zml1nsny2uosdd6e4axxhq3eh4fku1mdtggw5qgupk',
                retries: 2432001959,
                size: 4112760929,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'vq1pow5x9u4uvqiab99h99xmz6mnlistx7g6339s5kvy1czphz',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'v2p8su79127vorfn3ctk',
                scenario: '4cy032e74gy34eveshtxuvekxiekgz5f5xwr04twabben1a0kkd9ypbsnh9q',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 08:57:46',
                executionMonitoringStartAt: '2020-07-29 08:05:09',
                executionMonitoringEndAt: '2020-07-29 06:07:32',
                flowHash: 'eolsc1s8cmnw12s5pmzfizqcwmiluthcmkfqgzs6',
                flowParty: 'ec24v1ll92gl1cgl42l0v7zdmge4cqkqm58a16iumhag66otm6thyex4mm90ip8o35olgufts964bl8xgqqvf7jwojshhi1l853ehziwc9298p82pzaul9skjvhtemi2hfdu732jh24cyxv96k4impoobwa2c24q',
                flowComponent: '4wb803rodbqu6rireo3km9ajnspvn0dtrips95o3gcfezj0ge7w7hz8c51ro881l5uzipm8f62ov2gl0pva4mzltfr5mxapj22hxjyl9w2gkaut75zqpe487sas8j76b2p804lhxwnkuyhws99v8c3mco34w2gh1',
                flowInterfaceName: '80nuc8sp2eyv4xhawaelz87ulscsrjbd6dsuxg0uktddoiurq9tjlo3yljtegntzzu59knodsrmpkim39ge6oo19t9zibpfacy8fb8ndbcrlyvy6m6xqvtr68x8s1faujrd0k3jwf998d4a0l25usq1gkxsc1hst',
                flowInterfaceNamespace: 'njpy0qyok3ro7a9t1vls6pwz0hzen0tuffp1bqys5w7x4dkf1yel7a6ahuuvb0twumhjwyapamxcsulto94n4swyqfkhh29exvl7xsk221sqzy47qfunbm5q6x3gpmmwu6972dbej9iema08cwdzzov8uasudsds',
                status: 'HOLDING',
                detail: 'Vel quis sequi temporibus. Consequatur commodi harum sapiente quis cum magni illo voluptatem fuga. Praesentium quisquam numquam quod eveniet in quia alias qui et.',
                example: 'jlgfowun0d3gvnc9goq6ka3sjpo3nvt95fi886l580pnncgxsyx7hwnx16yxkwh3kb1lf9ewx2fw4wshdgatcprdppiv5mxj8d3u3f2c9mbe4p86ljgj3h37dix1r9fbv5370wgsvax8uisu2bgdx2zn8hx4yq65',
                startTimeAt: '2020-07-29 11:15:11',
                direction: 'INBOUND',
                errorCategory: 'n2cf7bss29hl8wmhkb4dxrxo7jv53iikueeub4tiyey2r6kokgafw8r0q2ypf9rqcw924atcxc8k58ld28x03ha7ggg8l4icxso3y31kqmkios04rsjuswzdmx285rjzm9hcaeqrit6wf2wkzjiumtj4quztx5bx',
                errorCode: 'zqpzkdc2poo3czarpivez9hzf55r9izvec22xm5de041tijmun',
                errorLabel: 450308,
                node: 5287880956,
                protocol: 'b2woodxiydc0rrbp1039',
                qualityOfService: 'h5ge7wcscfxu9o3dqige',
                receiverParty: 'i49ig6gljb5giies9cj732npqpytelqgsy6dw7z5isg1bmw57yrw9k8ewaotih2y17s98wt2rbl4qlzioobsgb3n0d8g17j3kcrmewlgwprtmh39zxlvxh7pxx7geqx3xp7fx0yigmlqo39q9h67ry0r5et8yh2c',
                receiverComponent: 'ngm0jslv7y2x5j0emya0prv01342ilnygnv8jkdlomdizh0t8tvs2tfm9f8arn5t3bkbd3qcem8ypx49gtjfj10uh6gke60exrz8nm9nheqqwgly90e10j3xyti9bcp4fy06n9hd4f09gx6yjcuo0o856qi3j4c8',
                receiverInterface: 'f8wil6owahs9tvp0ejg28tp0e6v2ni0u8clynzvqhyz5x86u3v7qhud2a44xqppjeklyyt2jw3cb7qp2rsh202qsn7u55vc2lv3ocqul96dl58i2pncvs71uzv5k45csaxvceiyx0xyoo1o8a2gqnwrexa4hfqxw',
                receiverInterfaceNamespace: 'ujliqmaxmtoev49c6b3o7limgfeqdbk2c4e49jists00m89s0f3jyf3x5qyls3utanct1t7l5xzwo7tuw1kzr3rean9i2i2c32d58j20pqxp0to12cez0hp4u3pmwb3srzyh4kp1svcyfe4cu78ytzmnl9dd1q53',
                retries: 5553443131,
                size: 9898273490,
                timesFailed: 1624292116,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'w04v01xdaj1emsvc4lqzwy68f0ywj8e8kp6kmm263h2wpu3e6o',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'qhcpq7bz6sbybm1a897e',
                scenario: 'j8l1lonymh0tee012odihbvo9bo8z5r38izmh46jmj830sag91y6afge1n2a',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:39:15',
                executionMonitoringStartAt: '2020-07-29 12:11:27',
                executionMonitoringEndAt: '2020-07-29 02:49:29',
                flowHash: '19ijfhj8gzo6s4slwp2mrspden8395ogta951q6f',
                flowParty: '8wwsnrei9wc02nco5ne0fuqm56d9m0s1pr3qlx6i9bomj37x3ngk8whfls42sdd2wl49o5hg8fwk1l85a5cmzqwzc70zmwxl1e3ib3zba89bdtzu2fbj5fwudp9o17coab4hgscgui6pcaj2fzlb7t7xsw6xh8ry',
                flowComponent: 'txq8xlu0jvt92v57swizzubayuphs71wdxuvrqovucyb8cgnahdfm32noo2i1s6j6090gwi15o32zuqohvakvyooa1d4hch7xh43kt4yx2ym5w8s3w6pvgwg7xjuvih6nvhfk6mgkuet5w79daewqt8i8kutsy7y',
                flowInterfaceName: '66r29awu5vs66beek3xunnt552m2503o8up73m8k8sn9d77v2e1unfwt0oqyldtj9wx4akz1td5dlp3n1dbpskl1k5csx07bvow6brvugl3ogfgd7cezxz3imzmcjbxb5w1k3502rj5hdnbtbaqkt27b3to8dp1n',
                flowInterfaceNamespace: 'ni2ejx3fifbxw2syagwak85bu2186tek4rrvhivj2kmu6exahiqausa6vzjy56o1l9inf4d4rs1nn8zljrp417lao9q3iu10v7cwxijczelg2bqho72wkidug3mg4orhfy57hizlh5ce79wnzlbouvi6aioomr5w',
                status: 'XXXX',
                detail: 'Explicabo quisquam est fugiat eveniet reiciendis et. Molestias in vel repellendus eum aspernatur sed recusandae et. Soluta voluptate est maxime et quaerat fugiat. Voluptas mollitia minus quo ea eum.',
                example: 'bxmroo73vbenn3fbftnbyhznil85lyf67zvjwd68v7dy3fts7mmthw9744e0kriyry7niqiir14kj3np52563jhtmiocw8ayk0gmucbd4klvuwujby1oykzf8t7vxze8t5kb0u1p5pqf72llubfo23xec6j074d3',
                startTimeAt: '2020-07-28 22:53:38',
                direction: 'INBOUND',
                errorCategory: 'f1xbl2gq5n3302bx6czdnlhrmmi5efaqycsf93a49hc51gblbus99nryxdb48gtg3633g6b2qpcfxkvv5ou3lpn0tkv1agjpodjrqlg88ie2rk6olz5z4rqsdazozbdq5xmwnkw6aazocx81jsut9rw86hm13gny',
                errorCode: 's3f623ly9h82nyx80mizypjtee4pmf5temro0nxgve8scl5j8b',
                errorLabel: 120600,
                node: 3770677777,
                protocol: '1w717ifpnnzozsurh972',
                qualityOfService: 'qe5zx6yicdfuhwykzt1j',
                receiverParty: 'l8fh5eix2vw4be4lii9ac8ikrg8lha8emk79cmyf4tmbrueiyssnts4v9fx0mw15mkwhcwacs9ncas2q301j00skz8umcvu7ir1vbbjj2opfyuavzoxaqamf2581g5k2dm3yhu7cpjvw7ehd41zkhozcgulz7b63',
                receiverComponent: 'w92aavq03ah8v733oberj3rde5odx8w6gwpnfxp0hyib1v41db5ojfszuvox488u25ca63jor5dexgy4t30mpl5d99iwiq3jpjkq647a7eu4uxn04yqhtvjafnylckc2wzpkpzt7658gyexgasa9ei8fc9xd82od',
                receiverInterface: '969msfcm3dkt5ts9lycu2sbezpq9aodfw3d16f3qjz9vtnfwj7yhlxobszgmqblu2n67cj81vxdf8m77tle7l4q8nwb5fvb0gp5t1v7vg13scwldxqpxcjtz77r5r3z3q4stihyclljwzqped67kshepc2g3imrw',
                receiverInterfaceNamespace: '2akaktn8pilwsw0z0xkjiqida6ho5by5gflkesitbff60yas97qyihmqkocnlvgwgmnr0nf01bpufz0dhdewlzwf6lowt1b8qi7na5yc9l2974vfr5dh6mhg68gtahtubwzkklmaq1yicolqtuajsjwnve3f9unt',
                retries: 6041984070,
                size: 1460912727,
                timesFailed: 6289066279,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'eowfrqlw5y5vaooe82ha61ee111bb81lono7rgk590j5yhf95h',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'wkuz5q54s7f9n4yqnfwq',
                scenario: 'mqyn3ow96fp548tymlemg6y040fr05ijppu6pp0vaned821o6bor9g5dromm',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:13:39',
                executionMonitoringStartAt: '2020-07-29 13:30:58',
                executionMonitoringEndAt: '2020-07-29 09:06:58',
                flowHash: 'ohw4yzhcvzbq1vnbtnai6heryfn69p2zni3inb3w',
                flowParty: 'hhxac45k3qvx1dzy78ym8xwhytf4c3wxq30djmyyr3y9oru62iz3ysx5koxgk6b8il7jlx8p6dm27goy67vxf4r5elgy2ucvtvidf3soysgx48cg3vla2eoiyjfu3ihycdg87i3bx1yvfrdfvwi5182c890l4m1e',
                flowComponent: '43tdb0wmxhbzparxhx5nxal90o4587ckedeg6njf699l9siorty6cr8ofb7p4ay6klk57qtrujt1imrwl9gydgwuz19ruzhumqo8rng5l0xvi2w5o8isd62aiwyvxxw03eq2dcqksz8sdrqzn5b27ri4c5t8gj6i',
                flowInterfaceName: '1ifzbl0bt93wg12q7lc99wm4z4w9ts33bmao4mldv6g9tdi506otyr8d2pxpdkkikys5chqzxhrmvxspst3bzdp80ivrcug7ztjmkroivkzh4dbll7nk6lkpgakybmglhr8an3wtvn5svsaco0n9r0nbvpxx10ur',
                flowInterfaceNamespace: 'xkam1gpvnsp7st5bxrztm9n1e01qfr277gn0jja58b0lj6ik19jur9rkgmnp1gd119nq0iz3x84ww0yj654qmi6inuc0r33gkibb81zi0vt3dl6gy4g996qbjedcb570oir4zww8776q0j7bw8b0v1ey39zls1au',
                status: 'CANCELLED',
                detail: 'Quibusdam porro vero. Nihil voluptate dolore impedit quia molestiae dolor expedita. Nobis possimus voluptate et illum. Illum vel sint itaque. Corporis quas rem. Fugit explicabo praesentium soluta.',
                example: 'x8k2hhqq1ri8k9hwe291tokq4nizyb73h5rlunuas2fsstofp75qiqqgxvrwl8hhguh8a4rks6i1xv1af2k1i60zjxqpgjs6r43d6l4qk7jic36gxrh2fq67aj7rnhfdhgi999glp6f0em720zyxkuumy2inr7k2',
                startTimeAt: '2020-07-28 17:04:40',
                direction: 'XXXX',
                errorCategory: 'pnmunc9wnp4gfwmc56o8g5qdjejdmkgh1xxyl95u5gr6owmth6dn3m7aztt8fl4wtf7d2ru44mh0d1s94c7vju4q9to8l5q733mpghmvao6fyue0w10y9qv1gpteugmx4yiqn3jkewgofkc73i18vhbrba33qqke',
                errorCode: 'z8up3wgz8byjrbf7fd23kdya7slxzkf23vrk51difd84ui91h0',
                errorLabel: 521670,
                node: 3816806311,
                protocol: 'c6oaa2vtws3uhu0nji4t',
                qualityOfService: 'ughkzi8wq05yygjkph0p',
                receiverParty: '7x6058e7c4h2v28a52vw031u0atnc5gtx2a2vredyhfzdhq0xx0t8waxupxzhjvbbubyq4ql8jhlsq4hkm6090npeo4chp9xo3eu051hlc2rfhge8rtg2515qsnpv6rg8pe404ib7w7jhk2mgmkp7qwhwfkitdvz',
                receiverComponent: 'ytqa7zfg0rkrrne2q3389uozr18hpq2ndzj645xfcy5lzagbleargp71i2j99fnhei0p6vh75m7hysue3af6qovq9sipsotfo9qgzzppn6za95m8hwl1jcsfkp5m942t96xbh6wfiadyk5yqqhavw7s2rxtl9thq',
                receiverInterface: '4kt41jyw3092csxw4hcf0d9fdbb2chl0qhbvo8gc6tgim6q4n7nqv6lo8dc51tguhxeao3s29wbpie6qntv8i8ufd4qh3dyqquic5dhvmevz9endrhmbn7wfyagoqda0nam7v01d1p3ckrxin1d0x0b8gdfh8u50',
                receiverInterfaceNamespace: 'mnmmrlffky7b6wbqfk3mvwveecqz7zz2orf01t0gzp47ee409xsnnj41tlh5cq2pebbdyxipg8mx0iao9qhxxce0qu64iua574i1dhbyut216aovznpv5ub7l3n8szt5wf9bhzaokf6eoralichr13a3pfyht0jy',
                retries: 9534823238,
                size: 1567030464,
                timesFailed: 4079613373,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '00exgkw98js07vgzxud28aiz4s7bis32a0ena9fjzztogcja79',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'ew4wqwoprzt6i7jvx4lj',
                scenario: 'runx2tezppvb46bp6doogov4hcbma2esymbi5uuq9tb4brzntn8ltjiog8lg',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 20:26:32',
                executionMonitoringEndAt: '2020-07-29 07:15:47',
                flowHash: '21buth1523fh0wnncw73nzd75y6uqnzs0ciz1krt',
                flowParty: 'q1gdd3311gnj938f4s23cp7uv43tip2j5c2e9dkgr8spxt8eb7ql3rnzpdula4e8gji6wch5okrkyus1wxygpmecyk3mfo3cgxgsgl5mmydvac283k6fnxx9wq55a61kp2518t2c6nulmxdwvydnzly3y66wz2yc',
                flowComponent: '0q4yodbyleqtau03yw28xfuq3e4jnuxd1n1mkwzpbnk7l0ca2n0xnbeawj7cdghfaur0j7mf5ck3vea3iau3kmk18ibl7dulwgl4jjbx703czfsjcka2sdxlgxovkalw1r1bw404rxuyi27ylarx4j6fvfjcofug',
                flowInterfaceName: '2x3gmw24fm0g2aufiqmnd9mp7679hlyzy029ds61quofct0f6ms8egc2z79viubrrhe38hoy85sks1hk76y46x210xsfh3i2draescuuqxdn77tu0u9sap0r6y9pjw9yuynxnus4mwrb4ahv5ajb8oo7y48f1qjj',
                flowInterfaceNamespace: '42yn3gftfvrf9rljq60ws38la9jaqb6lp5sxpfamu0wkj9y24qh6k1h20ioz43s6qwruw2ts80u6482qn08t81035dfnymupn6l475p14xugos74yclc4u2vl62urq7vrsu4uq37jeakgz3nwmsc7u4euxlkxaim',
                status: 'TO_BE_DELIVERED',
                detail: 'Tempore vero quas facere. Culpa facilis est alias asperiores sit. Omnis at ex cum deleniti illo tenetur rerum illo aperiam.',
                example: '0c9axmemvuawlqzp1cu1rjwlh4q7igcas2rzftn0r9f629m92yw48ntr6m1475e73k2qa9b7mw85qqp7fkd2841za06db4xf82f54rlgxeirzwrjjpsekkyii2ai247t3pf6f8ni1o06r326beoy8qk4x6ypd3cy',
                startTimeAt: '2020-07-29 14:38:03',
                direction: 'OUTBOUND',
                errorCategory: '4ls882d18hqfhc2wqfwz11nfo40dbi88o30urbmjsrdnpfpdekgo6vjvlz3cdjvm8ssejodho3trb1axoj2t12zcjfnvqtxl8xeahnm6i9gz5gdd9dzphqxcj6ze78g79zb9w6awnxihf4hs75zlc35qyvtyq3xx',
                errorCode: 'jdsc755jqq6g3uxgobnk8ar4qcjxuc79m66ogha1kx326js5tn',
                errorLabel: 502596,
                node: 6845791527,
                protocol: 'un78r6h91jvk0ima1w6c',
                qualityOfService: 'els0bxziylux44efajuh',
                receiverParty: 'oig51ts65vtzm9ztmd2adzpfnis0dndv83al5lgmkwxhxhgrzjoudfdjt1u1odn1us0rtiec0cmc3ey23kj6xt3qf2bnvrsu07ox3eeuajy8ywygbo9enifflq5wr3oeq01q7z4z2bq2fa02zb1ppr43hance2p9',
                receiverComponent: 'js1k4638l3mkvvtyurgz5fu9h73orkx7mex9ixdstvzxowh2yykpzr3rcgq9ok5cq6uuyopf0hzu1fqdlfotq2hzoc876g4ra4ug8wmtwd1d4t0mw09a7zeljmys5ri4gr9gsp6ilalsdkt40ewlodvbuyef42gy',
                receiverInterface: '41skbk0m4hkl2qgm7e36qugpf2654ysrsr7r7s00dt6mvjk465pdsxb7worn49bgwn3x91rbowe6e3miyhm94jfzkfekit9xb7qn0h6p5y5gr1avhydi0ulkdjc2u2iyrkm044g1jaxgnjqvpinikvxhtxxf3qvp',
                receiverInterfaceNamespace: 'j5jb4d8tuzaagrbh31i9031dr2wvs72nj1wnqrefuikq3mavpa3z08br0a6psqbqzmns5gw1bx2fw6mlmsypgsurfpwahxslpvwjsv4rlgm80p27t44s4ys6be92fw4h6tigfa4lkpzi81jfecz8csfabmn76m0u',
                retries: 1927005560,
                size: 1122980085,
                timesFailed: 1434448212,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'begi0gznh7gi57r6dt5js0zbh98sjnlyt2732ky9ektycbdc8a',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: '2j5dt3qojr2p8xczv5dx',
                scenario: 'yzzgo6ipez80w6ztomdspc2kpvsgv1liidd4uixvzzqrteu4esl5icn0oa1q',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:30:01',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 16:05:29',
                flowHash: 'wg43gqnbr7s3rysiel95wbpgzt76jyy7kx3nl66r',
                flowParty: 'kse8pfwyckxhzqxhp4kikpwnwshl9rbd8izvbl9mqvmfp5qmqwvhqcjcqamzg73trp09mkczyy9djnuswzacmk4xnkspp8v0sqakeilahhwkt6jhyu9tm51qmw7gzuujyxu2mv11ca1wjuzcxcrv054c0zll2l8f',
                flowComponent: 'qz6sljyqyloa18zmvg9hp2dclrrhrim180jhlkshyzn1xv5kwbu5opnkcqannf0vgvujgflingzpm269a26ym4z7dxeu6zp43ixtls7nyd7t3zt91gy74ovowweb6z2qnhbotpzu8eid425zfswkdoomto8plt5o',
                flowInterfaceName: 'ic3nz34y5tlvzzagzrboalcafdpy4oq4ccilff4q0gc2c12nvul6fug42jimjdtf8z6l9u0fl8b4dy8qouicm0ainc3e4wuyomlz4cmu9tfnqzr3hofpcms8ffcc49g5emb5k5l9fgr1irsa75wf3muqumgr6prq',
                flowInterfaceNamespace: 'dlzkh28p7pqkk4cuooxks8vq4g7ys11w1iz18xqfh77pf2kukkkl4eovu0cw3gy2sbn01eviba990ymt9lxoe3hxtzed3w0e0esn2gmsvk77k7lietldme9n6esidjzp4xjgcgqpn7xwgud79d4gmz2i03wp8i81',
                status: 'TO_BE_DELIVERED',
                detail: 'Eligendi aliquam et ut culpa totam eligendi sapiente. Cum soluta et et quibusdam ut dolor voluptatem amet. A deserunt est reiciendis mollitia ducimus nisi sunt.',
                example: 'g8tau1q61et50j16ok9697xumdk43awsquehnpl3adb7i4jv724qudpd2h3ym6qrcdgwjxptygwmssz222exs3dlu789jdccphdm3x4t75lq9htcnfix01p2bymhwwgd6cgtllt4r4rizh0nj800igbq8u339y8p',
                startTimeAt: '2020-07-29 14:29:26',
                direction: 'OUTBOUND',
                errorCategory: 't79b20dtyuyfkmrgoqzsek387gz2k4ohd8c4oknv1jv2bgbs1fj9ob71otwhcp78hfabyifubyy4oub8ox206g5dzu6ypf9gbjqngriwfjbnhmr106owmc8rwp3ad1qftyikjw0nkpukhq6ymxc7f5xn9yb2vzk8',
                errorCode: '109ln1dt4er2qw4nfi98jeypao8awxlempdh4n93c6xjlojgyk',
                errorLabel: 122115,
                node: 2484750469,
                protocol: 'dam8a925zz73p7s2158n',
                qualityOfService: 'rebqr4ggcuqelutqfc0d',
                receiverParty: '0cngw1rm6abj4eielvwjitxozky55pvrl9twuls96izbq1nil2wh14hwqqgxq11bpefphd0sz3l63z2yyqikcreqzqpmqcyx9vy5bmzdjxkoti0f5dlky266lpqe2lssi27f0ijvx0es6axffmu39r4cftmh0d2x',
                receiverComponent: 'im3y7xg5hm51qvwryfg4qkqzx0qkr3fof74zbear8lo5uzzk81595p7bttmuz9kmubx909w8ly3dbfsm7xq7ssgm2utn34wmz4d1xgj4j1dsx6b927pxvr2bavtaei6ix54aduijr8x8x72yhgi5m91zgzmfkwyn',
                receiverInterface: 'r3ymwof0wtd5w61jl75a3jfhllqt65ci42qqeyxtj68w4awjzigs7ocov8fyhw798c4htfxuid5c6m68ry8zxralbw4p214ykzw76lrsx5xu5d4ox5n6z55mwbrwgt0usu5vq8ap952kjndvxs6dsf0fyap15ukq',
                receiverInterfaceNamespace: 'boxkmkulxw4m55hd5uawrup13zolfnq7b7wxnf381wao1r0hshs6ignfmi7ft9z8uutwibb2isy39wvakhhn06c4496thjsiznw3tw5bochnfjyte8836ucc47imm7u240d32gwqctjp516pzbb5tsyx1aamhixs',
                retries: 9883076947,
                size: 7257126287,
                timesFailed: 1737216252,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: '4320y3z25oyilbrosv5tfn21o4u09nu18tfz8n8dfzkno5e97w',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'rpog84i9lqzbjcicpfff',
                scenario: '226ds19dzwzoyqhmtfls52o1a8aw582j18jwy8mttk5yk3ohktqwx88fahka',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:32:45',
                executionMonitoringStartAt: '2020-07-29 01:49:44',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'zl804o1zx6pbxan9pbz4udg9i09wngk5330rb1ba',
                flowParty: 'vcwtoj5tvzw99so1o6en89ybtn02z3rjpujpbxc8s82prdynb1wzgskjn6ibr1tjyp96h7enxgx6rpuhaupm8i9ambvxxwab1rdbexmbb5cpuyiks6df4dby9jgb65eeecwjcz8kesrcy007g8xqlyrqrv6vws59',
                flowComponent: 'a8mfjlrney6saxcex82nljh0a6sagdgaamqku1i4mk7m6pq17lwr8h9jspudmkwvb3t2x7bkjm11upfyvfw8a45w385repjnef9gsk8op2yxuuvr2or0vz0wv9vksv15eg7lf8sv6vv1lazzki4f38m4id8kbjv4',
                flowInterfaceName: 'xtul2ey99hceuunzm4mu4vw2pbuevpbf74yor3v9ferjajf3ccle4ewv4najs1jb08ww3haq28clccr49eacd5evq3xl5rvvdo8tlm0u6xaje8kzzn7k41zx7a65rf592antmn19tb9e6g1qjogxn73p8lfl1ral',
                flowInterfaceNamespace: 'o4u5ni24m76jshpowrsf7lhn6y8pxajgyqayed4siic0hao6kxigvweo4n5hbs66w7xgifj8s07n5vpun6hr9r7ekhtguxmlhxjorro9p121imyb1f35pspsgwpuzn5rn816b4hdanlahm3lylz46e66b5ftjqoz',
                status: 'CANCELLED',
                detail: 'Adipisci provident repudiandae corporis voluptas ipsam et. Accusamus incidunt deserunt maxime qui enim itaque tempore distinctio iusto. Optio et enim odio et sit dolorem accusantium consequuntur ut.',
                example: 'euftjmodupt4k89x2nwfqjo28a659x7ph05jcq8jfwno8yakyipwtlrbo18e8n7k6b1l5x3ma7gdacn8xtekmi8cwzrslomzfb1k0hi8za071zkhyf0t69amtjbnbi71zjei9r9kqf06jzvzz8i3qxl3tzt5d6gu',
                startTimeAt: '2020-07-29 10:36:09',
                direction: 'OUTBOUND',
                errorCategory: '0812po70u6andx80lfq66r0ksq7nh100cg051slgbz28lthnxlheqnkyizexhda0whdqvap5i6hrl1f474025eyqdkv1xyjnv6rfue8k5q7zzfm0kh2zl324vhraz55x2twxdwpiak7kq0p6f0l3sl5lgre4b5iv',
                errorCode: 'sofofe3okmssu1v4du1bf1234sgxhndp5oxxkzrii4qh9j4t4b',
                errorLabel: 616172,
                node: 3790020307,
                protocol: 'hfsf5w8z8p7tstq9qbpg',
                qualityOfService: '60m45295yk1bx53c7cio',
                receiverParty: 'l5vewdfpgpdpd1en3o4y7dr8ignezg7yz9xdn7cdfwy9s90o7txu0ke0mthhtc696vz3uytdekblogvl2mrvjtiyqhq7h5dk775dd87knw1msfomjlffyjhdn8waxnp2q5pmz265pizzlgkyokpst2z803dw84kg',
                receiverComponent: 'yzmjdw3etx2jzve9fxevcfbogxnc1ooii1xggk622w83ef3gxuf6kq312jrk9uw94b6ug97101tfl5q0dd5ozh186qpuxwkia9l78a9wa2uwrmlwca333iq5g0dm0scmfbiiwosntgi9sio8pzc4frmcault5qjq',
                receiverInterface: '7oqqjqsbqgljyi4muupwi9chdcrf3nlwbk5rhex6i7l3s707j7q6wmby9q7dn06lxpjoobpllbwk7z8j4t2tac1aewxndkozjjn74hv2v1wlacx71sdfdx01bnq901v08pp30ox6nilncn4wnxjlgy2s5q82mli2',
                receiverInterfaceNamespace: '3kr4ljyp4wy65g4hg9mzbmqz096u9io3xbw48eh4pd8lixug6hgj1r92sqfn7y07rt4vyc1qgkcstxmdqwx77qccypusmbakqh4bhw4qll2r49alwbh8kh85c2phdacuha3qsl575wg7zeb8ltgs44crrax0kbt3',
                retries: 8835355891,
                size: 7850051037,
                timesFailed: 5183084578,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'axpkylqlz2sxx4r4dsuwk09fbaf9whi5i12v2ctvgrvun6wof1',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'xdmj03n7y3y1bbucz34x',
                scenario: 'eldaflb4defkbaaqjinkl9m4qqy2vjx3rz9hsjq2hfb8otbn1q8051qcs3gf',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:04:30',
                executionMonitoringStartAt: '2020-07-29 05:52:22',
                executionMonitoringEndAt: '2020-07-28 19:41:48',
                flowHash: 'lmyiiviglm5fpvmp88kczqpz2scjjqz47kowfute',
                flowParty: '6tw5g3bsqrtc9g6zxj8xrwizvdch2an9s784bmrrpfrwt5finsg6wlrv6jhhxel4dg9zi3wvfpqcplu4qixkwhdxmv9bwlbuuqrt6k3x5mqwlip99rwstorwfm33u80d9767ez6zn00om3f6hj7i6cwdqfkxezzx',
                flowComponent: 'u432anhna6v6q2mcnosddolm4moq3or32pg3xbdqs452tol6tm0xlzwse666vryux88ijve4o6u71sagv0f8mk1dcseno9gem4bxed1doexcj34kimvoh3ljdozw86anwaqmtrhyxhjff6v23pimzpvepckw4ldf',
                flowInterfaceName: 'lg3z2vxtnjkdam1sdb02x3d5mutkmiljmozagiqfytjmrb0c07enwlnmovni23w582j8bq6wm6zu3djtkvf9yzrfwqvdd42chgn9uijtrjq6cvh1uj5vxfyj1o6ei5mgxc28ogf0htwyw1s0v4635sq4ak0t4zur',
                flowInterfaceNamespace: '74ws9p4ied9c1fjcfn9myv9vprd1t91740cw6gy99es2s1ea0gpvnp3pea67tspetbjyiecjff99zzwyzsp8nm7wnt5h54erunn61ykczcjgoqesjn7bx91wyeeaf6g9uqt86gnad8bswqyg2bsis3cx5v84a12n',
                status: 'HOLDING',
                detail: 'Maxime non facere est et consequatur possimus nobis laudantium voluptas. Id voluptas rerum ut labore dolor corporis rem. Impedit mollitia dolores omnis impedit consequatur voluptas aperiam. Vel rerum occaecati ex nam et ad beatae vel nisi. Laboriosam voluptates necessitatibus occaecati ad et praesentium quo qui quas. Natus illo dolorem voluptates et tenetur et voluptate.',
                example: '5qio39aoie7pxy05kh3kb9lki0dix4s5fvnav9azmfxb3jva59is5wbv5nggx0pkgtmhz55myzqiavewvxmwoqbb44n3kpiizwfvs3yvvozhajvxvbtr95hnt0ek874csj8ottudi21e3qqetf13hsjzwggxc8gg',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'gw66xcvmzq46ehi9v2gwkdhi9dwhcm2j4epddjgtx9ssehcg9bx0odlcbe7c7ut430vawwabnrjf5oxtr06mnlberkyivlvv252w7z3ccrqinvos7727xhcwvpq70u0ln53nn1kgmxvgnuos890ce3x6e64uh0co',
                errorCode: 'i6cny67tgto22fgii3u9kh9ow9lrs9qs3f8vkwcnwymn0514z2',
                errorLabel: 222089,
                node: 7697870239,
                protocol: 'ooz468b740n55wqz3l8k',
                qualityOfService: 'yag1gyp7727ilrfgmt84',
                receiverParty: '30cgwktn3knj2lj2sw620oi68ohw218uu6fhe5uyb8rufmljfsadacvd3vw7b90buhadpavb4qn7dztmwhx7a9ro3dbzophi4hb7eh71v0zob85msjwi07b8lrof786y3yse7og30kbzqcndvmpcvr7blnwxh8bl',
                receiverComponent: 't8iwiq2o8qim88v4sf2ef2cvlxjyx957v5behuu41ebupqoe2zs8k8bjg0xrmgtvpnm0ykrp6qd7lagmvw0ocfjv82loz4449otfhxkk4ylio8uyx2ebb72456thhhuuq6eo39p3hv0qhej7lxjkpqu3gqbd83gc',
                receiverInterface: '5qlw6xtr403l1l23ww9cok7dox4bvehp9yjaypu8cagzqvwq73luidhsr5j5atwr4z79293oef3x5so5pr3w0vbebxsopagzr7n6yykg5vdmvf2ris7rtelgvqi49proeahu5mx6qqwchatb3391g2s3wzc6fb3l',
                receiverInterfaceNamespace: 'ouua6qq8kgv2pec9vi17p1jl3tdt1b9noolw87nz65hslfnvrrp0wkeujm8l6chszt8t2opv1l89e0tjvxdum6a9o0avzc71315o2rv6f3hvraad3lv4e1e1adxp3sr0sxlnn0myk4gnsfh8b6atdl483w29i1l9',
                retries: 1562757006,
                size: 2374997477,
                timesFailed: 4872092024,
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
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'c9sqjn5t829aeuizsluh2nqqplsgou9dpvu3aeosmw85n50n2c',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'uwyr8x8k6jof97tznexn',
                scenario: 'ak3jrqxnyinyl1dnd1v7tpddt1tktekewhecjv252mvtarppv8d86urhdl81',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:50:58',
                executionMonitoringStartAt: '2020-07-29 00:55:36',
                executionMonitoringEndAt: '2020-07-29 01:41:00',
                flowHash: '3yku6ft3rrl6g47djvf3phs9j74tpmu9i2gg2q27',
                flowParty: 'cpcr59aa85lyfolefjb4z7wmy9qouhok69plevtb39s1htl0nyn54nwoi52eyzd0e57aisf3cnbn657gwi8i9u70nlvl9vp2dbnkcibx4b7funcdzodc3omvyj8o5k4p74deo3pca4hd1w0rcunw5mu7ifdrxxlu',
                flowComponent: 'i0cnc0c1ioa9a25vnqwzp2p1wo7zhe9fpedwlnc4hl9wx32rfbxh3795vgnba77wj48jhrr6sh9tnq5niq6ueup7zpu1i7q9951xk6rimykebzhgya08r46t634ul8wxw297rola2n1bv94xwhtbew58h1ciki9b',
                flowInterfaceName: 'p2xzt1rhapsmqgc58o3thv7ndd4agsrcz7fhyeyrgtye6ot3txyjhxpoxqz2gsel2luao8icvv30763a8dwoma07yh30jqlxwih7xlr0kp3txyc6j6y6xjd31q2ovwd22sve3pkfs8mfzc8p2n65gasakqd747t4',
                flowInterfaceNamespace: '4a3kigct66lfa63x0fal8h54t3vcuxdsqdgb650qdn4ju2j2go04c5zrekriuo776d14glj6z7nvmdbsrctvn6geb69xwleet7ozmf21s9tbbz14ey6he4sjclk7v5djt5c5sejs6st2rhr1f1qt1azjbuj4qqcz',
                status: 'WAITING',
                detail: 'Harum voluptatum et itaque qui. Repudiandae in tempore qui quisquam qui et. Reprehenderit et ipsam dignissimos est asperiores provident ab assumenda iste. Labore consequuntur et ab excepturi odio repellendus molestias.',
                example: 'l68r0mqh43ev8ldicrnaxcgmxx8r5qkrut8ta6k12r9fdhim0trqhq4wvj1g5vxrvcyf6dhpbi7qwemzu37awlyqbo2msrladrdb9fjh6qujpfmp6vsuzmokke4hqzfbtfvn6bnxckbpdpvtrx9v1rk5fusgc1j8',
                startTimeAt: '2020-07-28 17:59:16',
                direction: 'OUTBOUND',
                errorCategory: 'tc839mw00xtgdon5230t9v5kau8jd7b5vaxc3kg0ibsdxd11f8zf3v94u2qsqbli8dffa60rr5cif57nc1emuttvn3wzne3zbzday5fecsln2oblhwdy3airwow1besn428ego443avzah9cjlcsvewmecpp45ja',
                errorCode: '9o37u2hnm9vq3pkg4t3x1k9is8nxz1ewffhdahuzv6zu2ep6ra',
                errorLabel: 964194,
                node: 1330500316,
                protocol: 'h5nsgz1vus6wmau4cw9a',
                qualityOfService: 'rfjmagqwfwf0ma6z4bsj',
                receiverParty: 'sjiedh88wmirypq49uwomb6sqxbd9cgcaxfin2g31juwr83nvavpt57pe6ixcvjl4mdp2elqdv2dreo2s47p66zayzejff7tbinswu7e3llc7une40nf1ex9i6v4rmh3neaevsfnc7y1xiun7yi567r0pwsldh2t',
                receiverComponent: 'wzmyl32048d2ffj613dpbwy5zpr90nl5je2c86eb3vc7gun5oboj5d5cvtajl7ys2phtvqi4fie5xbd6e8n3pobmcgssyd5175uv9qppb1em5pxwoa4a68ck1232yn8d6le4g19pzysj59iwwji02ad7m2fk81su',
                receiverInterface: 'dp7tkuaat0s7ccg2bzzh9yuq0smr0k5a9blckrax1g6vwlcyimpiac0134z6hpvj29rnnt95gxr0v9m6ok8nrrs308ucbbh2qe0r0pk3yap451s0tytfhzqbmwyoys3uq6x75xbv1kk5vpuula8wn8kxkxj1lfsh',
                receiverInterfaceNamespace: 'cyqz0kyjy3t19bb3ui1lob1xblw548i9648lpf2asgkshlklkpoj8qqgunnhuqxtv7xz5asolvvhlxi8hev0qdxa69vvxodfcj91ikx3o0ur3hwkgm3mtkvssnkc1wu86i790e9cbt4hct725ngoo85ptcwgwx5n',
                retries: 1156324475,
                size: 4404682858,
                timesFailed: 3479715251,
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
                        value   : '686f3cd9-ad20-499a-b195-28c763b2a673'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '686f3cd9-ad20-499a-b195-28c763b2a673'));
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
            .get('/bplus-it-sappi/message-detail/686f3cd9-ad20-499a-b195-28c763b2a673')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '686f3cd9-ad20-499a-b195-28c763b2a673'));
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
                
                id: '03f8d84f-30da-46d2-b359-5c2369a78cd0',
                tenantId: '9ef97ea2-eae3-47a5-9cfd-3b08e5e15f54',
                tenantCode: 'kpwyol49etjyjtd7zbj7cx49nmr2ykyofd9is9ay5u1ovltk6m',
                systemId: 'e4bdc0c2-0c9c-41e5-9149-d98e7ca8de55',
                systemName: 'pblfcc0iqo1qtf6eqj7c',
                scenario: 'czohhwaz9kuvaps1mjstdjckeqb092jv392vzjnhbf918h8h1oompj3juiiu',
                executionId: 'f6ba35f2-c89b-4bc3-83be-c9b623aaee90',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:22:53',
                executionMonitoringStartAt: '2020-07-29 10:01:09',
                executionMonitoringEndAt: '2020-07-28 18:53:56',
                flowHash: 'r5e6v580mpbdgkc0sgvs7xautez7vx3cgdnl8c3i',
                flowParty: 'jaxjyt25lfsvy44y2nkwmlo899x7csi0oeks39n5kpl7rnudw8oubes6s7hqy53hefc336x1vj07puw0g2qsspb6ilw3zicdknamrdeygzlpemya3es3ef8ukm1fxln4l2skuk4bg6v50cj0f7e4w0d4mjukyk2b',
                flowComponent: 'f2b7yg52peril1irxvwibb993zmnlca2n49gl94s9q4bqjzdl8cgjdkc91xyuo0phrbxd5k4hsv1ml6ah1znrh9ejcmi67v7nv0t3sonnyki6un142acvrkcns7sc0iketl4u65kh9p4dyhqe0bvjotdp51aap0b',
                flowInterfaceName: 'txf06q4owezg182hstrtvxgj43wpp2q49u13g7snhi8obv21t2t2lyqcirc4w986bvkd2ipj5fpobsv6x1qjm5hn45hw51jom4glkgj8tnlfqz5zg545nwis06m9cxl8qvphyew121d58rybqzfsfb7sdzddgcmt',
                flowInterfaceNamespace: 'b8aay9p69vtpbfe1hh1irfj0lqg1cn3f1cpixt6ndgbw9fff8wm5d7g8qrby4v65pnd4qz3cbha2uewaehrqukcond9dj7cxvhnpgq4aq8bjvun9o5nxz1chquqp54ve4texf4upc0sssxewj0h9vt2ym4nhiad5',
                status: 'ERROR',
                detail: 'Quam reiciendis voluptatibus ipsam sint soluta explicabo. Aspernatur optio et placeat dolorem. Excepturi aut sint. Rerum doloremque molestiae expedita animi ullam. Sint qui qui.',
                example: 'dv1oi9evm12wlnjtwp1flabduov4hhj272spjc7l18g3s553wlzfdin8otpoh2e8ow2ersrazvaotiseonlkqx6kb5xcvn4gt7n7ymar0z5rg5r45pqw2sf97j9s5l2v3clr5ha0sgak1109wg9k47m1xnuije4n',
                startTimeAt: '2020-07-28 19:11:46',
                direction: 'OUTBOUND',
                errorCategory: 'wruo40tl4p1ojd374yw9zpeh0hc0l70wisp91bjl3r4ew2d1xzng41uxj7xuu18vv8laswokaiaxq5qtx3gq8579jg4bjg9qpxko1u11yje6mtg9rfaxziytvpa1kx80bkoreipe2kfymg0uu817lu6y4i1cldyu',
                errorCode: '1sepw2s4f581vyo6lrpqtjh3mv90kjxh7mw3kie86kbryays4q',
                errorLabel: 793026,
                node: 7246056275,
                protocol: 'qct9hi76iflgmuqx6a9p',
                qualityOfService: 'ymnkdfbsgodpefry9oui',
                receiverParty: '0enbkaz8104gvok1xoao2js1byev2mn6d5ikcf8er2inoz98hwirsgwa5cvwkrh6qixddfv1bianwx6v643q8jmfbqbel9t2o6kbj40ybw2lxvc59i10w7bkfw02rbbug6by88241whcvqxmo1et1cd1v1drmuee',
                receiverComponent: 'xd6gacbci9so4m9yo16o2j2fp8f1wsbwqiumy0txs63bmkyl0j2fz7nd6c5n2142qjgtumdumfov532zmqiijm8toerun8fz8qtxgmsgotsqg1gqwhrrly8nlxpz7arpeerd6d4rcvx889xdulh3ga9ljnz4v2pf',
                receiverInterface: 'tkfmeg721makhz8df1di0l0zbuhsxl7f4bywbf4p04ogjx9szytbe4uhm4nhxh8qfj8tdf5iwmwaljn45in6j7ja5sagokfpq7kuhlmsxsddxpi1jensc1vx07c28ln5n5uiegt0d1qkykgp2a30a0tuqmg2q4d4',
                receiverInterfaceNamespace: 'ncdr1ca2xh3hbs0p1avt1lnypki2tnm89b539r71y2puo8gvburxlcmvqjll72s7o1pb9ga1mtrd63sq6ke215jt15rhbsqajddo8bms620qovwf1gs40dahu997skfamps2udyrbhpkf3woehwyn4c0tplvx9fu',
                retries: 5174788603,
                size: 8062134094,
                timesFailed: 3205245200,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                tenantCode: 'g43u995qhe2ltcav9tcq1m27fdgy16lpnr74b58tu71x4f1ezg',
                systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                systemName: 'pzphp4s4amwyubxzw2ty',
                scenario: 'kir2htgcncqzydd9vh37ban5xyfg1c0b8nwba5eyckcbkwd48n9cghsv0tys',
                executionId: '90b57892-902d-44ca-865f-21eae0add625',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:57:38',
                executionMonitoringStartAt: '2020-07-29 03:34:00',
                executionMonitoringEndAt: '2020-07-29 06:07:33',
                flowHash: 'y2gajdcrjbvg644a7hd8mkvalq7xnl1yt5tw4obt',
                flowParty: 'agfz66ugakai65ty20fbzpigiz8yr63fwahsdace1kknosumf53dujihvlqc3x5y3tal5sct4hzf8xwzsendc5b3gjkoz48nuot5o6s5dxvxvwqc3g3xxpeoqvswfhjeheiaxmt7erk71gmpct2r79uuve5ta2dn',
                flowComponent: 'nsomx250mybs9la3yo053x7v6e5mny99ogl4e9j4g1eookh73d39kjs97jbbwngfh9623ngjsu2bxkuyl8m20encdl3r5epbn4o58wu834ws3mnt474za7bamdmz7emtbuk0lgobb1xa5h5zq2wxwbnvu6xjhxf9',
                flowInterfaceName: '3ehtavt0xioyq9ret6h8auhus8xhuoyvsogesjcgwhtsqbq633zccsl9y0pkbjjp36hrcnkqxn8druwmxs0ppftjwnihn9oblyhdl8fzdb4vl03crlzew4wc9yzndj6okutq2q1bwo5wos18i258tnn1xba1lrcb',
                flowInterfaceNamespace: 'mzv7wefresklgy6cs2zrmbz85yf17hec0f53ip20gqono5yquecf44qrrwhrsjbi81tdkwpv3pixv5o5gmlzoyr3ok9y3x6oh4s88q3sq8736yd376mi0u1vqzwdky6qxi64hla4pv6uvj9jh9hhwti76l58onsk',
                status: 'DELIVERING',
                detail: 'Ipsum ipsam voluptatem ab animi non sint. Asperiores ipsum consectetur distinctio deserunt modi. Et ex molestias sed.',
                example: 'fw6b0o8q37i0c47me81ftr4cbtswjxrp7hfeho5x981w3mlui085uppi4qsejo5ag2onth51eeefuyfru50jpwfc4e5m9f51no8g114qr1thl7fg9p325avxao5lye208hm18car47y9uoufhsin7jiwryn6wi16',
                startTimeAt: '2020-07-29 05:58:49',
                direction: 'OUTBOUND',
                errorCategory: '4hq2tt0zg0n2h515a2fh06gjqc6rzskggdmrwt5680usoxq4ao68lf0i1tbjl77e4mf18ae8th4nk43yg8h7xobslq33b2yime9k1h21kzykxeq72cwc8tawqm6d401ylmgw7p8vxupwbr9p3d3zx9saqjkrok6l',
                errorCode: 'focgwa1z2a1o2xfexaj70zwtne3e169t2bvx4ksk2z2oprj8mk',
                errorLabel: 859080,
                node: 1659794107,
                protocol: 'q6yr227dh3nsbv3uy9fq',
                qualityOfService: '1cgy303pksff4qacntwa',
                receiverParty: '4ypqyg1yofidgsmzson72409xqp76pi4mzfbwpa16ttw5xo2lnn00at4gqgdmal0f356549dlkqfhw9jzw9gbo0lxnlshwdwo2v8n8sauwq8h6yka8gz65t9p1ai3o14nm3ufwow4cbqek913xkf4muxxa4kngr9',
                receiverComponent: '247doetg1n66jrilfo6swzd8scvkej3u7nciecyn7h1t2vhlckhq8fvk0ymlwxe2bquhthrwvx32it9il9pht0eeu2o2pzm0t90766pndu17xmmbu9xlee1rafqz3txc8td9b38mmejdxq7bvbwt5pq2gdt5jkmd',
                receiverInterface: 'phbkvt7qkokfzbl94pyf3f8lo23p87s9e0wclknedkfq751mfa98igi0uhxoy0pzp3x6wp3ouqd8en9y2inaot68gvy2vjcjfkqoxm16ynz2h2u96iekjfpkv2du7ncb3svqoq27j29fpgb44pp1y2ncg1fn7khz',
                receiverInterfaceNamespace: '9vexin42qennrfe2715szcnmi3mfxblqo0v5ihv9mruo39xw11x7ombszghci501i2l1rml5cdxbml3yqmr28fxwf3g0uot5hxpun17xsur8trmxlu21zp5yeutlihcbkauh4yekuqvfi0q61they7r74bf9gkpg',
                retries: 2920849986,
                size: 2403258815,
                timesFailed: 7289991110,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '686f3cd9-ad20-499a-b195-28c763b2a673'));
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
            .delete('/bplus-it-sappi/message-detail/686f3cd9-ad20-499a-b195-28c763b2a673')
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
                        id: '373d6f15-23c4-4e7b-abe2-1345872b18bd',
                        tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                        tenantCode: 'rezgfmtvvgbh5g34xxbdl7h9nb3gpceb1m6lsia11qt9q5sasq',
                        systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                        systemName: '76we8irpb6ug5qdpwgkr',
                        scenario: 'v3exb9k0fl0s6w8qtyuol0mxt0jinw4wk9odsbcqmrz91mans4b9xkqh5ctd',
                        executionId: '90b57892-902d-44ca-865f-21eae0add625',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 19:22:15',
                        executionMonitoringStartAt: '2020-07-29 03:23:57',
                        executionMonitoringEndAt: '2020-07-29 01:01:45',
                        flowHash: '30eggzs03ingbetc0uhn1dvkh9ir4gwp4zmpk6nq',
                        flowParty: 'f9lxzkjcny4b4zz7x5dvne7qgq3r1c0dwbrodrzoryymfnk04xuacg5xx3jkpvfizhqv92cq6esggpzfm895kg207g2puhdqoy4froimtm0r1w2bfsi474r7k5nno9l5t7zmgnpp90njjm534x889ysxs7buu66e',
                        flowComponent: '9belmgg9iiu2t23xzem3q8emgvfssvmsrqftm8nsop7it8ubcl4zcgzdd8s2nwq1h1v6j68fnvgdsax9h2ohpan63kivmh1pewr2rsnp4i6mimx7gsl0iwrwgd6pu9njbmj842shg2ssbohogamrd6yqt7aaenp3',
                        flowInterfaceName: '0i8hcqbuk6ubq1ewth5whzd4mqg1x6i67l45nmkby7hx54qt3gcpmc69m34bdzphai5e9ovt73zar5btjmekht67xb7ict9g3vswpp0nedxw9u2e2npks7zy2yk64ejlrlg2en42opkdyszlczjv35r8bd4apq5h',
                        flowInterfaceNamespace: '1ud0ycd6k577x6bywb2be5ykmt822dj01gjlm2tajoz1isy3tdkw4ab2j3vo38o0v5iu31usapyl26z16macr9mvbesaa3iclohe5olin6c3o2tktqj9vv39m93ox6v2cc9br0ayja7ewggq04gnnfueol2b92ub',
                        status: 'DELIVERING',
                        detail: 'Aliquid non quia in repudiandae. Mollitia ea occaecati eum ipsam velit. Quis et unde voluptatem.',
                        example: 'uaxg8z71gc8cch0k1l82cvaa6r5fnju5xa8n9j5ydh6blzy9sqk047wvzqoot0lwgz8hloqfe7r6wsv3pxddj1ipo54w0dfj3xnemrkc6gmxxi1xq9ja3c36iii5dooxx5r8cz70euo109n5u6k1snrdky9845j7',
                        startTimeAt: '2020-07-29 14:27:01',
                        direction: 'INBOUND',
                        errorCategory: '0t4hfwuv946wxiwhus10c6ecb4b0sqw36xwfnqa48v59ne2ipt2f0itekvk55nvrtdb9snmidf9p9uuzyi3w1bx3iagmv1g4z441bgzupi3s2kibywsjkgqembp9vgxaq9wn1o2z9yyi80qvwe2qwy4vwe8opkm6',
                        errorCode: 'r98e4mpm1kxbvwe2c84fm3014x4esv5nopx55fr16aoi5mylqw',
                        errorLabel: 906367,
                        node: 8553888339,
                        protocol: 'qe3665xvhcnuqbw0rvz7',
                        qualityOfService: '3yug47gcbrdca7bdn9m9',
                        receiverParty: 'fretqe3p8n3birj8ctfa5epy7ybmt8nuk62q6i7ayi2zialdtwqqoxv9zi35z7nbqi2hdtk8kva8sdaf33qjqix86cbcm4wgv2bxk0866oa5y7q5v066ibiuwhnfuzvzon52gkwlt4lhik5pfukid9y2wpk4v6nn',
                        receiverComponent: 'ef55wagthkgom6i6wyi3p5waof15yfumhxwetsoocduahlsxqgrqkskidiajncktiqtmwfcdha88o12dlj3r5rcsgmj785ytdv69ins2pj582l5t29wvifg4py9u2mnpqxopi3qgt4eig8i13xcylzp7flazjxav',
                        receiverInterface: 'bkn0clz1j18qg7rhsis0sd1ejmfu6stzhc5833srgxkf1chpqwlw0p5p4fdbf601stkhyrfvlgbvqnj90m6869o7hk0hhypfivj5u94lv3dyxnl8ut9uqkyhwuaos42nsijd7k6kosy5ctgfhytmrqzz7ewjuinw',
                        receiverInterfaceNamespace: 'w6het0xdt0wpnpl7zcp6nvrr7z5d7x3xln0z6348v5vtbkyh0ygp23kyo2pr7ynmx4ap1n24wczzrdh7653xfqx0xxggzhmp4izo30nbttxrboceb0ns5msssilxyds5dke8jx3na9wpyelzgt1tskqg5ao75dma',
                        retries: 1359362605,
                        size: 4487929313,
                        timesFailed: 1224882235,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '373d6f15-23c4-4e7b-abe2-1345872b18bd');
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
                            value   : '686f3cd9-ad20-499a-b195-28c763b2a673'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('686f3cd9-ad20-499a-b195-28c763b2a673');
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
                    id: '686f3cd9-ad20-499a-b195-28c763b2a673'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('686f3cd9-ad20-499a-b195-28c763b2a673');
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
                        
                        id: 'ffc42944-435e-4530-8538-dc0006302171',
                        tenantId: 'cc19b48d-78ab-4814-88c1-4db7b4fc1ab3',
                        tenantCode: '2kwyvve578rrnsh3gmbotyazsqb3lhxp6sjqjjoyui7qeg1zla',
                        systemId: 'b22622bc-8f9b-4e94-894d-5eacd206dbfa',
                        systemName: '78guu1esr9k4d39j38st',
                        scenario: 'kq1fln5snsrc24j0c2jr8urefe8seanhc2hie82du8m6yuwv9ple4kloeyc1',
                        executionId: 'b55373a6-277c-4d57-929c-9de4b0cfe68d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 06:57:26',
                        executionMonitoringStartAt: '2020-07-29 02:40:57',
                        executionMonitoringEndAt: '2020-07-28 20:13:39',
                        flowHash: 'i5qd82gxj7u1qiyhr34dw9gutfnai72topnvoz45',
                        flowParty: '3a1ea0fpzb2m1shlfbqi0l3euj5fsumiwb2owfpaa8lp7juqnei6y4yrna31vcc6jg1q71eu1axt7ud1sonscuzevq1qy6jqu883c71bjj11nsz81da0qp4uhzg80h58xucd66pr5yv28skbjl3j4ewogsrycnbh',
                        flowComponent: 'tyve7ciuhcckids7pepdjkss7jzsniuvnwoc0m5sjleuu0njszf2k6yc6azafojolsdk8ex9o8353uc3yxhe9o0ck374sxrw0lbjjh8jfzpzs8sg3wp0vgpmha2av3r6nvroifcrb1c9lw6nro53nhbpxvyrekin',
                        flowInterfaceName: 'd49gxjhc6hhz9v83x5nateo586ahrd7wzmv8mskrecmt80wjvxkab5n88f8gtlv2cacq9plweeul7n059ozrenvz6v3f0uuq7qkguc8oigc64rctwiotodttk3shtoz15850a22dhpxbamt1g8wwv9qwzqoo5d30',
                        flowInterfaceNamespace: 't46tve7cm7j72sapt7lzzlnvmmosxzb29lgmp1dq8k3oafruhjjq8kvxf37ev0l3pn64lb4a5mrs0uwpgpjuk31p7blh12l5w0e85hl4nuvh2grmbbj5xxg9mpydn4n6e9w3jt6px5j5675w9i9i1pqcmyqxkn80',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Placeat pariatur sed at et et. Illum quia sunt tempora quas. Nesciunt dolor dolorum quia velit accusamus eum magni dolorem nam. Consequatur et illo quis.',
                        example: 'fnw8izl7ohy1uqhn4zd6z8c1ddixd8kl6ifkbkt4i14mg412rkmmp2x1t8hlex4rxe0uoq246oehc4egwmm8o0xuutd6uw5oog0n2orm2144i299r26p5z9787sx8d5sok8hjkheozttmkmzvvjr7jjbdcos6lqo',
                        startTimeAt: '2020-07-28 18:58:11',
                        direction: 'OUTBOUND',
                        errorCategory: '1hg0ii27nv7xh4vw7skdpzm6cih1tyv7ufpj49lmjfy36yvi7c0vy8q619bb5m4x1afaygqvsdkm1mdikzjeik96michmnbwqzdhvezd918xm1jy1axa3xc44obg6kozo7p2ccpmtf65rat0l4bbj3j24p58m1zl',
                        errorCode: 'baw2tl8jrkt3tpo29a2wp3c4uo3y2yspemvyoyy6ljippmxouo',
                        errorLabel: 863939,
                        node: 6220186823,
                        protocol: '9isjvx6h6qc14rhvu4je',
                        qualityOfService: 'pp67ipg8m8gu9dpx1pa4',
                        receiverParty: 'ewk6kjmtj95y8lzn3s5p0opsbaswdhzqscmwukt8yl4tipse6vcu55axlc9015v4sw3lj9rbcavjjuxxjf51rsarlrmjpg03m1kuef2rxcuf21xmcw772zmv40lvmv5uqb9k64pfrvtogmivyhsz356moiqzzwb1',
                        receiverComponent: 'tgtyvln2v08o6c6jz7sta0etlr8y7hf13qbmufqxug79agjtkxorl5d2xec3blgpchrjxul1526tc7o65ewoqt0vglzzcaxpbz9ur80ewnjsdu7lfgugmkujsqb7medvv6xappdb391rnlb7yf807vaphaoa2atj',
                        receiverInterface: 'h00ls1ginzrr5r6428vrdmi4by84mzo1gm1tgxq2ocgz9ws67jgmd7xwg5u1ez8lprbbvvhi3qc1do4i6vx0ajskeuv9pf51v9y8aj4pfgllc7tmgwamof7u5kjk64j8hg8epl81ivqcj25k3gziffqkh63fll89',
                        receiverInterfaceNamespace: '0m5kcurmkihlcwzfq4lvqxwhx8haiuoy36vd6j2fm2506ls8kdo5kmr9oasxaekomf4t5h0zi0ckdvbeu7pl6bxaya0fh1gn4bn0xoovgp2hphdyyz2r4x93hhwf24xdj1zr6pwu4s8bsiacvsr2t8awntf9qbsg',
                        retries: 9643751919,
                        size: 1472765544,
                        timesFailed: 3912202715,
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
                        
                        id: '686f3cd9-ad20-499a-b195-28c763b2a673',
                        tenantId: 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6',
                        tenantCode: '8qsirhyzpgfgnoyd1p5fmk00d9pspxesjekfablk2u073g4yux',
                        systemId: 'a4992708-ee8f-490c-a300-5474e2899a21',
                        systemName: 'sj4qqvto6w27f0w6vxo7',
                        scenario: '9ueik0wd4jzdunlmdbeg2godh0lia4ydfikncbngnpajkdfcgqwcysu7nufs',
                        executionId: '90b57892-902d-44ca-865f-21eae0add625',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 17:02:00',
                        executionMonitoringStartAt: '2020-07-28 21:53:21',
                        executionMonitoringEndAt: '2020-07-28 19:41:45',
                        flowHash: 'p6beu6thq2axhtqx9qfuivjzlb035ifcyst5bqsq',
                        flowParty: '966dg6084n7t08p6qxdbaahux57orx5ps79nrmm12u5s70iy3cjqxsf7q1rlk0cclrbqnwi3mrnmtx4c64v0zqy8dgqg9gs7ycin2xor89816b84uvybjd63782vao91mogu6mh5shy7kpvpzsoxxan9cfrms3xa',
                        flowComponent: 'v5ggu30e9157plu269dh9b7bjre1kmtbs0b6ocnevweeuxz9h95rpld98wwdmy674n86faqmjk8944gr87oljpvc6dx3gbod5wjl39slppcmu8oay8z1axjuz57b2m3w85wfiv3an7j4oyawybgnri9zwo9a8tqm',
                        flowInterfaceName: '5yb72obvxlpxgmc4z0tlcby3zbt7u5z6d2ng5h13k0ls07fjbi7xp03895wqn7zp8kefo0vadlgaagg2fmxubz3a5hhp320sqdcmafxgqtqjr718afqjktpvj0l4t2s20isw87sa9kfi2m0yg0e0w0efo9ytyfba',
                        flowInterfaceNamespace: 'xua57820ubh5c9y1ddd1sn3ykm4dck0k7dlgex7t7accqrfxywd3c77mv8gwhkxktbo7tpk4hupv2xmoq7wxmb1oejds8dsjdaqb8avai5376ba7dj70gbneurwwx8n08nrs2muvnc2tq2tqlgi7qsyszzm98x9r',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Aut et eos ut fugiat sunt cum. Soluta nihil earum rerum laboriosam ipsam rem tempora. Velit et aspernatur doloremque suscipit cumque quae corrupti assumenda. Quisquam nobis ipsam. Ex et molestiae. Temporibus earum ullam reprehenderit in ipsa tempore quod et dolor.',
                        example: 'l0z05j4rcogy32xu7xb290t3whetmgawxiuzsvlqzjwyz04mb25lkjlrwe8a8ubtpn1laqfd9ebhoa4m1h21rtwow5yt8q67tyh9fr9rlo4ep72151x53kttuymijm84rzq8f8w294b30knsa7eavf1a6v2zdz62',
                        startTimeAt: '2020-07-29 04:06:05',
                        direction: 'INBOUND',
                        errorCategory: 'sf0a2ckzhdozk4evkv3tadkhrj107i13f5jpmcy1ettl2ju85br292fbc49wei6rh6xve1cwca1d6epjilrwgaecqu5y905kto4wwtnv10pcz2m7u5zw8hvx9smlaa7ppcrsiw9qys24p6unvv7t0ovc9fh19o2a',
                        errorCode: 'wzsubyvys6s4vlvb6je9grulp8ks9wsszus1g8wzmlzh2zvqy9',
                        errorLabel: 996608,
                        node: 6177172679,
                        protocol: '1ax12iz9x5d7yb5uym75',
                        qualityOfService: 'iz7i9zwimhigggcu5spr',
                        receiverParty: 'sav4nll1fccbxs0x8gxqa7h1uwv9448qmr1onu1lo9xafls0jqqyoa4lh5ek6m9trix74ejkp6k5ch2bjez848fuqyxunuq6yx0giuilia493ng1z9p6eccncnrx6ul3vy9e6otoz8wm9sm9r4jd0bz9ndvi1vst',
                        receiverComponent: 'ek490v3o5ynj6qof31szeu5hvqjs8967gb5j2fxeam1ir9ltluar260q3zettn5rwatedop1u431v03dlnj45oj5mu1yabosxmvc7qfhj4waicsh84jy4ke73dysl5jkuxf42fe1mi3nvosjw11m9u3e5fkggw0s',
                        receiverInterface: 'du9yu05o5jie7kaonug0cm38wq2nx0f2u63dcu4k6t3zkzhn6p024bniv8fdjc0wc5eiwaaxc2liej96si6x13wpwpo9ci74x9nv48okm13clq6y2f5m69uok0qkdfnlacxsq2bbejv88i0gg2tcgdnj8b48r6co',
                        receiverInterfaceNamespace: 'n9pnduk7j0n3mhxwxa4siicsbbs98rgg41nfyd0xrtgrw4epp6qs6wkqdjnwqefht91migefju4s7kr65ax3t0bv0wda01o7jtjaxh0uv5a17i0zmkfz1w6jxjp2qiyj595yu2khztoq2opmsuhlg5bbwqvcnpec',
                        retries: 9085638742,
                        size: 4992164522,
                        timesFailed: 3816702235,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('686f3cd9-ad20-499a-b195-28c763b2a673');
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
                    id: '686f3cd9-ad20-499a-b195-28c763b2a673'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('686f3cd9-ad20-499a-b195-28c763b2a673');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});