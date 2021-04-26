import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;
    let testJwt: string;

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
                    TestingJwtService,
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 't2r69t3nfhbavs0f7tm5c69h1rmvewk2rqx706femmbm4jd3w0b03sgvay7au7kej9cq353h84zln2arc7mkmc5tla38409f886dsl98uth9ue34omtqasuqvkpeftgoml9hv8hv1srfea2k0j5f2m3u19jmpz3og9c7qb8cwe9pv2en6863hydg546gsren4bdrds03u3mfejweox93gzw9yg9co99emhd0s6m845eeufd3h8t66529563hzih',
                code: 'rml1faaigat95rhnorqztgq5esa287vetqpxjen4ay1d25ttl5',
                secret: 'o9u8k0o1snjmehk1j38tvwzv75e1svbycninxupproi3ixy5d2uq1i9id0bqrtyckbv8t8fc7fnz1axlgb04xt6dhs',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: null,
                code: '0eryrcmu89kstazndn7i6s650lon8dp73qgymflzgqwpoc47b6',
                secret: 'nu0c4e5asyywo8kg1iaswgg1dm894ype3fy59b3569pvgsqn63o411vmpx16igvdf94v6ll31ho8e66kl01qy9yeg6',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'y5bnhxjn93x6zm3epfnhszfop9ehz7te34050h0ixhw056i94sz3gj89dzj048rqtkopkialdws8jep5wbu8piv8iozwt9wg1sgmurhmcvlxx5kynf8urpwh6w3bvfnniud6kmxa5edsn8o0k9avhq6e9zl1wc1rqbf85ae0fl99rkbg7ngpuvj762cck0qqafmjaied47ekyirw8yo7l2y1lpri20imvxrzthu91vadh5kqdb85vpj76g2n4xb',
                code: null,
                secret: 'ddaygp3ny5jib50mbdk677738rc5432rh8p26yxwal774bnehiivhs506fq2chbxgqmg5fzrs1p9sq1ub5mglztf4f',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'tcs4881er3vs5m4gsardtq5z14hk8erb2dg7hyhwxdz2ym9biwth7qyn57jgq418qntp96x9ietpq9gim04dvnclbwfjpmc167tmjm0xeypn071tdx7h7g7c09h0kf1g0t9t13pyffrwjpdw24fb5wqxcot0dm1506evnvef4r5bzna1k9usx6mwuxyt4f2xk4orh3nl2gbsuzej5lgfjplwyutiof4ybbcko0la687rt71we7suv3u55by61wp',
                code: '5cswdcm65u5hx1ajtnjaixym1to4aprzmrkkfzagnnkcqlh5yo',
                secret: null,
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'd8qwngidjj7h3k9p6mhf0axwlbfbm8uhvkmvxnctliqlvopzsd1hilf70cxfscmucsea4wi9ft1ou2ku5crn4j2wdxf7vdpwcg510q4kgv7e6vxiga1vximhsjckj3ec3a8l140b3x3t83vl7g3clyupizdmcdxz7bs9nv1b2z8dgi2jmcf1npzf4klmhr7o8cjqc2pc2pn5rou8y6retnez96mvc6119zxwpq001ljjwxwpqvqfz8wxo9xmi6o',
                code: '4xp57z3zmu640gyv9xu977a4wh67lbqw56i9fuecvs3v1rwy4y',
                secret: 'mp8uhpsqrdic97jv6c0bq18qk1wkrbjnjjzrkttgk75rsvcfxw8mr7af6rf2lzqmnmfx2ne0504egx6u1xoc162979',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'iyikl0iwvs8osafrx53602b8o5xilnkc6rh0axxdbfmqtjo7htpbho0uj62m0i9c7w7sxbrs0poy7r27rqi5aw6zow5sxdjfxyrkfjpqqpi1lv8xucuocuui7002va4o189wkphx2xrqm279ddn46fv425b5sa3l7j35kox210dbdcvbq3k2dcp93gfkj3lit1gl6scvuyujcdhby7sjvfs6pf3zpwq5dtqgahwutpiagmdvdp24nmghsl8sx3e',
                code: 'zt281qpzkc7g1rtj59hpcqomr9p4hwo0kunadpwys9z6k93v6r',
                secret: 'k4m291svst6riey5vq37ri0phhefbon3o0jvcl8tmdajqonshkqebe1o2o0d9q434ky3y798h24jwnnp2ao2nnrkw5',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                code: 'ysb9sbwns1nxzsja0mu920fs9e5ucijb6vk4hhqxbkd6n0jiea',
                secret: 'cjg0iwozm03v8o1u9i5a6tm6l0eum3jnm2tpsha1x0iojxzynhtfhdnzvzobs44go8khx3zbf9tkmly8h5uvqpyc3c',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: '7007jb284od24o8n6ysgkqokhri0zxj53xlh9dg1bzc4igeqwcozrk80l2i1zjis7gx147f2tumltpnl0aegpjikmhyf7i0hty737goqhfs5bo1olxc3qbeac7v0tfymdinurigb0jui4qdpgdhz6l8iikt60wso8yhq37301n2reipk5qt5vzqc0plav62oxj6yozf9g9s4nwtfdkxppj4z3gqsihceizeitln9qhzl990wx6y9ak6t942han6',
                secret: 'fey5o4s5v5s5602x22wwjoq6pk6lspn30h2vce89nlordjs0xzsez1i3fa9bc7maqoxgo550m2pitvqajmqgaxk6xs',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: '9i5zrytlz6xpfd4fi90ikr27gbqosm3z0r0bwplamq52xjeot1nlargkogvtbbzhgwc2m06jjkipan7wjg0f145su9w915slyq8ndld9w8l8rxqa0sbi1y8btpant1ojv10jg1h2ovyjiulg8b6zl40b9kti1i6ns40eyc43medb755sdeyrx7apo362kwtfu2yyzxvjch392s8nxnw59xras5pd8j0m9t86p2xm1ivr43b65me2vajbxbinntk',
                code: 'qlkwceaslrr0w1qnjs4lszi0wijlvu6sl92tzel6qurhipljc5',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'xy7smrjdk67395cvqosrtlzu20rbwpyjca5czb707aasiibq5pkvgodl3zg5en0a4hlj2voarwg1lc6d2lpa9peb3vz78c9jn02l9vp12qs7v3bolwpbe74zx2y4mjle79dcpel6ejczoi3q131mca6myi9xu3quglm19r44pkekej8k8le5tfrxzopbx8baiioh3r6d6ct4hgnmu4bntlv9ti9xrr1vqimvor3igtiiilayox9n334snqccvdw',
                code: '7m8rk42ku4awf2w9mslckbh75kzh1i7kp60wnl17l9k1400ezr',
                secret: '0i8tdyd3pgy2t327nju8csrntxryzln9o2uhosej4ge63apdim8sx722dntbpatmzkehbekvqmj7qhezbrsi8ywzsj',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7a5w71uzpeoiq5z2jsg52mqzudkl7c2xrlf3v',
                name: '4ns4hio1jqdhza1m60pqjqxjgcm190ucgx8y5xavpvq50v3bgi5tmqaiq4igrpmpfl7w7zmlut6hxmevcbkwabepscdh73bskivtnwjndl5x56egx0jlkn6qy2lxcgcceoo5ee76ewn19h7tn4wxew6355hr20necj0vuodaekww9hfkyu16ydeh780eyfro9jk4criqmvos1y6nfxio8uu7c1r23nw0onxrzgzzr96af40hykzner7nmvdoedf',
                code: '6we5z86y2vr7bw179q2mh4bo5vlx9w7mnly9631yuexq8sevz6',
                secret: 'ctjdlk6iomery59ioq9ju4ijz8yn2bf8528746xqcpxk0dz6gbn9y4t6khcl7umtsqdqewa8eun9dgg420nhs3sql5',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'bmt60n4rz83j9cnjgkm682seg6s9c6g10y29eosq23ppvcov4hnd6aa7lum7807cd5tc4pkqvrs5qugrocfhgqpejbo2jd1w6clla4q4rgik69ikiljtejx05yzy6w5my4u4lhsrkohbkdh9ljfgtflnw28lhoiie7ccdywahffjkonk92vw33a5wh9zsollr4esy1csd7hn5bus39uylcrcyymlvvqt02lqpnmewfcyrpnr3waxyzvkcyf0wo6i',
                code: '199pryoei37m742bme3fx68a9jist6d0eo73hlo3whnkx12cw7',
                secret: 'p3zew84fm0zgrsgy3ydm7h1fe4been64vacolpuwovd2bpltyr9pmg1dk0zt6hgp5s8oc92jnav61a4ciizekfn52m',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'nxcexmx8f2epky9hvh6ehqhhq2erby455v9a6w0vwxcqwroqpo6cr315ez9y2m2lwizvjzoylv64al6br468a6aa5lor8mcgzbopp49g72haqospxyblk17beys55a1v8yw3gbvjlpr9cs4dxktvocphw5xvk74z3ae7r6aep8o5t3bp1g2gkm5uz8dbd955reb5o0w620tv4qdlfkf4isr7ema230su0sn3t7mwv1vw9eem5gnwzzu59wivj6c',
                code: 'a6mx7sh5or3uq64nj54otjq9rgpcqqujx2cnmb2z1an5v8dzc2y',
                secret: '7kttko1vy4yde4viqis3y6izy2wu73yq5s6qwreec4mmm830m3s52xzt3r87x4z5s8e7rrjvp8ctk6o1ytqbyvju6k',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'z10prhlv3de0a90mpile0k5v9hfqmr6z6n2s3d6aeqnvbafp8phoo8pazx8q7f55vs147rf38zxj3zna1cuebuno8wx6wg5638g04m5vvbmnyf9wqubpj1kblu4twujxn9gogf16z1gqd9p2tu2pps71eu0g3c5vke2k9d214713ehc2nlsxgxjquw6ogtur0ujiljjx4uj30kvlfrwjpnvcpn1n1z7w0vgpccqm5ypazln9q1wn27ey5hewl1p',
                code: 'gp62jt8hlm14deo1t7nj39di9v3nwytt6vmph1v5o6o5hr2sg9',
                secret: 'fx32sr9ecvgqe1iokqr3rpofsnphrhh9egnkop5ou3td5i2mq62u37r6rowz7yrcxzko2tj84dsszllx7wie0eo5b8l',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'ai0s5lviufapkp99viyl50uaiophw6tiup9ziqfs7c6hh99y6dnhabr0dnvq3v3dzsaktvzcdfbudr0l1fk97a1irhx38em5ryinbh9sckuxw20j0gcpn32pl13y75ca5knp5ch1vtjcxcz1b6aybjoab7rzr1ewmcsf5jl1ff3datolmihprlk5jz9zel0q0ekec5x2031badkj9lt6he0o1z49mo06brfy8njye140c9qh92uyq6car1wc4cw',
                code: 'x97f12l6rk7ouiwjj7jy7cqgvvicjfv89r1wnkoaezk267zzg0',
                secret: 'q5l1thblxdew0jgpq86c3estse4dxz9mijzhikkk6k5mkgicuq8y3e0myr91m8rtm0dyrar54txl9vrb6csy68lr79',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });

    test(`/REST:POST o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: '9jphiellj9r8wv7gedreaj0oafxmjoy525xh9mcpilja5hfkak207eay904j5avuu1jiuuo8u9yozqf6kg4023erm5lajlwfgrgw588nkbvt1nk5v805hu1qr14uuuk2rd79j671na1avpxob4uzq3rm3ifao09j8um86d6dp4nl6nw43e839b20ccu66i0k343dkbuvzvu1jx0mafd1oyqqbza3hocuckn94bra24mqv01dtybq5fpigwum9vb',
                code: 'f1lpncittaiv0ppbv5yccxncs0g7n71jqf3no646ptqzmia3nk',
                secret: 'puawlmkyon7lna1tm48mkdw8a5oyvv1r7fwdkv3uzlfpufqrfn3mnvr3r8c8t9wuatu4s332rq1mly8pdt31o2z1nv',
                isMaster: false,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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
                total   : repository.collectionResponse.length,
                count   : repository.collectionResponse.length,
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'eddf53ed-aa61-4546-ade1-f34abeecb3c9'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '0572adad-e65d-46c3-a665-0f046f36ef35'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0572adad-e65d-46c3-a665-0f046f36ef35'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/79e58a97-4dd4-47b6-8c39-d82b8aa4f939')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/0572adad-e65d-46c3-a665-0f046f36ef35')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0572adad-e65d-46c3-a665-0f046f36ef35'));
    });

    test(`/REST:GET o-auth/applications`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '90b4cbbb-5375-4636-bb17-2672c815bdf2',
                name: 'zc5j6ilbo8te29stmtp66bu6929l8y8uiotbg86l9i4omj1uqam3227vr4l1ro122w7wrylikrjv9q7cbob2lhj9gsningq5wyx250ga5cx9z78exsd58xljlqmr14dlpewui8k64z9h9nbxmdsmw40fdbx6yvpkv4vix5jj3e4wpepj1ek7v9xvx7zx3dw9tgfwujwj1n04f2xkdoog6hnjvh7z125bp9julup2tjcv0v1c5qvs1ry3omb7a2c',
                code: 'bbmzi938bwqrgtvmv9pfik00jc55mlyvzzya97vl96b3zvm1cl',
                secret: 's0ro19r1gzoc64qfp7havg3uk0anveejjwbir780t9abs1teqyqwzzvy55zao0pv5l9ym1q3x5kg0r2n6n564hni4u',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                name: 'xsi9uzh0vntbaa3r14xqsiu2o55d78dur32nq9148ci3p3qn99ux8edhvb8i1te9fcmfkzc2nd1b6oc91oy2xm9p9ju2corjwkrgxv4fs3tbz4yf9h2oefmf0eskjzk7vz01gtlb3ky9bk5e7ov3y156xe9vjk5fxzqm6fmd6vgq7elryt9ug8zzd1lwtrqad4nnbuq8woi13pcjeb0douj1yurqcfourlnxrwmjnoykbspw6ifc5sfoo0bcei0',
                code: '336o9wbg0mx34qleojqwvdekb99yonrx61nhu4b09f5cu13mfh',
                secret: 'rk9nwyssqsmyidj8tgj27gz0g221dp10n9dcr51ku5txnscs3rqi0tralk7gpbsv62hzh73hz0ogr5pg503s8czgz0',
                isMaster: false,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0572adad-e65d-46c3-a665-0f046f36ef35'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/6098b911-19bb-44d8-97a4-588a341f7ae2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/0572adad-e65d-46c3-a665-0f046f36ef35')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0661d283-214d-4089-878a-1f075354a67d',
                        name: '2sfy792t2cm75qf0q5yr8ylfh85d91pa0mcl11iz3qh3h4a9akjbc2bzo39hxhz9cwelguekeu075m2paesq1rul4vk4n5xofhbeio3l9xmipgijp3uoi69az3fn8mltuerju4r5m0edbn2rel16apfq123m5e2vytr6szvb5lnix94ekivfn2c9ome2yryq75llm07lbmy37wsnrou2qe971075l9t00iis772ut9kzon1gyvmsc5t8ozh78bn',
                        code: '2v0bsksbnnfzresiqil205ziiodgv0z96iiq61o8f4wg6wj70s',
                        secret: '738mbma2xpy1177jf6wfx0m2q6aokb66eaksj25murdj2mmt9z49rhisnshviyhi2ilx90kstr0oepsw1iqi69k134',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '0661d283-214d-4089-878a-1f075354a67d');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
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
                            id: '68e00633-07d0-4dd8-876d-9398ab5a6415'
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

    test(`/GraphQL oAuthFindApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
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
                            id: '0572adad-e65d-46c3-a665-0f046f36ef35'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('0572adad-e65d-46c3-a665-0f046f36ef35');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eee4ff4f-347a-4fc7-a6a0-9e0d80d53926'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0572adad-e65d-46c3-a665-0f046f36ef35'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('0572adad-e65d-46c3-a665-0f046f36ef35');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {
                            id
                            name
                            code
                            secret
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
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0112db4d-c3b0-4831-9db7-9ee1e194d9b3',
                        name: '80u8wcvdtmou2sslgxb43x6babbohff2d1gm8h05xl7a57g92viqap29lypnc7fmcpkk2ek9q4avk524nakhiosl7k0fny7oig06hdbxehcmpcx3plalyl6idb78nu2hb1cekx0nn9jdtwavnpixgbqbg3e713az7k2ul1o6o1nulbya3v061o0vprx2n5tziusr9uej35ibs4romoam2k5wml4v4j5pakn1jb4haz2ehzk6xzw8o05gz9kuxse',
                        code: 'degmbvhfceqteqtlenaoranwniqdtolfv3yzmdtro7rtpccb1h',
                        secret: '5m27syn4rnmef63cd4lz7w8fi0vnkmqkb1ospey2hadufzg2wqn9hx3z4rr1v6xec8c379z1qvrz9cua0f3wg4is4a',
                        isMaster: true,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0572adad-e65d-46c3-a665-0f046f36ef35',
                        name: 'ui9h2k5venbc8a9zr311ztqzf4f0oqsoygcyaik827eccqujl69qyu6koxalfw1uq7m0k4m39ykorzss1k0w8avhklzmf5av3uhrznso2c3mmkisvni4hwnut3ip917m6h7ar60d0i6b5exr80ewgplgh4pazyl4t78r9fvz1u49uczjw0nhkps6lbr5qyjqh5phn294t1vtk4s3rx1k2fp0teobjocup8ymb9uv9to9i135yuygr56u2cjt0ig',
                        code: 'ph5eibatmeml4pms45rc7qy3vefc5cns4fhc8ppzimbuijf6bs',
                        secret: 'jjzpnywo9pa74u0niqabv6tr95q2c8n54h0u9wvlvp1cc6r1e4o0ppvqk3t61dbok2bicyacds0kyvia3sb08gb4li',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('0572adad-e65d-46c3-a665-0f046f36ef35');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a5610914-1b8d-43cd-9d16-b0c90d29fe8f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0572adad-e65d-46c3-a665-0f046f36ef35'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('0572adad-e65d-46c3-a665-0f046f36ef35');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});