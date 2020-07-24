import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'y250tkw0lohghm82xy5to9lg5c72tp7qfaooh4d6i5w4aouguw',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'eh6v2sykclnmh435d2i6',
                scenario: 'q3fakye2bokb15sjsnil170iwufkd554ts4yb37clktmkd22gcs3i9wvj84q',
                party: 'ahknzqs6fxoma2p3hp03pblwpuim31pw02qkmy799ozfy717u2wukw6fwqv5v67892wegg6hrjjjtftrxvt1id2gi8gjizwjef2uxfozl917lfrgvefpyzb2osm1e5x28x670hmnh2a5eudvu3zb09krfc3w955z',
                component: '0u9rjks3a0ab5vpx3u7njt4kjrstp8huwakpzrv5dhqw7534z10l4wpynmiy4ddmi1qh8nz8axl9x5kbyukmjazavf14vdcm152yih2qjm3af6sqy38y0uupbn9mx1hjpqdg9jl26v5l60cnl7qrtzvra2wsq55y',
                interfaceName: 'uyz284amze3ja6ayppshsds1gzqk2afjnfs3apiq7pjg1od9o6ejaway5sawa09f8inxpnh9t6k0kodtma6azs00y23wy43ucnljugskqsryqddp884f8d1s2e7kzamztycbdzu1jyn8pz02ywn2wtj8b770rq7v',
                interfaceNamespace: '4cr4qt91uxj2vb09y5r1t8c8d3dj3hoihfdza7gblpdszvniez317bu84l5fsbram1oghxfczty0ihvhclfyaybgfumyq1eldyt8kjiojmmv52d2bs3mzo7fxjrlh4t5u21n3z74kp7ytucl0ll6t290cwbzw5gw',
                iflowName: 'bfktyfnv9xys4goe9sy921z6k4dn0uzesih8g2w7r1o5ti6992krl9ev3rxtsk80e8lyhflkkghp1b0e9t88kdnkibv2gifd9huknpzh9v16cj2dygdo9uw7ruqjvlv1br8bpu3arzl93hw429fck9d2fey6khtv',
                responsibleUserAccount: 'c8z6gevmloz0ewlocvp3',
                lastChangeUserAccount: 'nuk9yar7lmskr9oca8km',
                lastChangedAt: '2020-07-24 13:23:18',
                folderPath: 'khryhxkgetscj1beea84gdau3dxe0b80x1sn7yct5mt8jcm4vxsfqj4jdwpp83z1roq9870xs7pomtmjsr4fov2x07nsk4pzxt9wxgf4x523r194j2i8ags6ho0t0xyux2v7njljgibht6i4rudby0vp97kkdfwpaamunmpun3xx1bro9sy2nwwusnu37xb0q2gq86ueja91ma7ovop9dpbzwc5r1nmx3ubs19y7snaa67p5vj8026bghngvm7a',
                description: '30cjyn364tms98xi3agpba53tsdixjailzhjbczen22s4ggyipc8wpcciykdiyau9hxcyfxyh6kwm4nmu1vg48vthvri9rd86peuxoie5msd5utqmfccpe99g589pcgsj55nwpsaum6fmc4f1x6zc3a9ayqnbuw314g2zyuqymve08evtpr6l4nkltbswsviybte04om2ih12idujxgjp1rldiw0avm4cpufhw1uiea6lw91qc89ejqfzb5um20',
                application: 'u4o2dryt1sm9leg4aoobjkh3ik93tqx1dx0euyqwm01jyxnt5i8teo64tp5o',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'z7em4ghdxyn7i6j73at4aylx64ibyfabzs553ojxsfx5vx94ln',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '0ju0w3cifon79nb6h64j',
                scenario: 'rq9nzkz7b6iidpouz0dzaaq8cb848aiistqpdsuqvbgbic4u4yuo4xozibmk',
                party: 'o3kfatd9yine0vdq169gg89e0vidmligy7lxbzm37s8k3owdn4tr24692wiydr0jm2hzowo15n2pfvg3dswnfm92w3ql80caq6790bklxbku867jvjuwo0rw770hs5pdub161nwc5offsrlalpd2bf7kxcz4wrx4',
                component: 'ozuvz3konsich4q9k6s5a4rpw4unz7023n6n15ezodeo6r6un0x35c5a6wuagh8rl6og8q4i564ntzediv2h4x0rhnsqx6if544a44kcqsxpvlj124ggxjkz5se9vv4ktidcdt1by3ruhejccdnntmenacfrlz8j',
                interfaceName: '43mqrujfey6sizepx2bie6qgynw7e7tc23g71an4q5e4ig6gval9cs039d9juz0wk8dfddzs2vn66j585kg57x51ls7vu9dw7aqpo260o8a9vr08oa8z66c2wvlh1ql1ty4lgu6qqvfpjx34r8q6a968e5avboyi',
                interfaceNamespace: '0hlzbh7r0phvbkvkjfto4h84oxo6x8xaj0679zw00x593x9xqbou7y0crqg1bbrvapnxz2rtv4o1o3pk1y5f2q3rg15wllzfw9m4jyyaygv5vy05o4me7hqhocf7xysrfdbnuufhac2tfxqb6ku9cs9769q95kh1',
                iflowName: 'phioy6ktdsjrfvna5ewe7323eo56190w6n0zyqoumbno8na16hxprvqig4ckpg4kmrd2ixep023ydzvpvfapc61f80pb8kaer5sclm8i1xkdoeoi2k3q6ma2o019z3vn1hpbucmttphvnprrx7i8u9xuulwtcqpc',
                responsibleUserAccount: '7erjzerkghh2klo4ztf8',
                lastChangeUserAccount: 'ct9293eagjgnlgvwn5ju',
                lastChangedAt: '2020-07-24 05:04:20',
                folderPath: 'dmf5vqc7powubdc9b82rhvesl91pt5um1pxbytyjfl5cjcxotsan7tj0ze7ychotvq9y65d9pzp23kffkzkwvvxotdr8ww5g4uwkauz2lgwv6p6drymwejv416yaksh2gps13zyi9f3d28xdwuub8lquivqixcc7i2v51w4gzvntrvbqa17vqehszpmtxotsyol1ehc6bna44sdnqx9ivot2bzjy5w9vk6c9vz66bcat0myz8w4aflubq4tml9z',
                description: 'jlcsmcmnmz5w15syydqn7sgersfo3e4fdviur2sz8nkpkaleq2qyi1dkec1gkqskucrw4o2oim82cpiw8e4026j85n3rfs6gmdtr8ngv3c7xbsaq3bo65obd1bseddltymqzcdpn6y2q9mp6axxhw776i6upevn2fv25rp99gt8kkghyyeft9tktkin87n7w2iqahj9qwebvh5fhxpuqx79k8y45ld3l0uv1wtq8o2ixp3pzdibluta42ddkryq',
                application: 'h58onm18mqg8oglirq1dzjubyt6dq1wdlf0hc14afom3rzkhpb35ncqzdas8',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: null,
                tenantCode: 'xnmbdum33vw9ialrfqclzjgpbgcxjiwmnlavcjnw3v4f79xh4u',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'ouuu7lllq624o2b8ktaw',
                scenario: 'fw428u701oolknfa91grl6c3j6jx07w9p0cc2e8qzqvw59dqjm9p0tbeswr3',
                party: 't2qlpso4n5vgxlxofbmfv9ns8a3iq764mal5q4452zgjvfkah4j2m7iidhiccaus2cj54qij2yvbzix9sver541xoo1cghlgyq50r493hm0glh1s7edj7rkzixilf5jkr4g5sr26b6u88zfhgcrbkyhmh8pr7w06',
                component: 'nit3gm0oepvmsc9i8e9e9d4o3br0bweccxouu4w8pr80trloggntxf50o227w8kmon9u389m41chsnt22zbz3rzcwg15n5zubbcxxcsoxcqoylah583ijbq9jyvbxjfpevl3g0egv2oynyhxlzo9h92ykw0jmk8m',
                interfaceName: '8eop0874030vuwabml49kyycsvpblb98y5jv97gngrngpfwvr07cagrx0b5x1lw5ptuajfe2gnj1uyulmv4bg8geh4406cf12ghe3t0u99tpu0sftfdtwkf7r05ap75sgsaw7d33xt316hvjwcadojktuwapwfb1',
                interfaceNamespace: 'wuikq80pguyzmjvihvtdoxkkllfxlagcbyy1txa3s6xauogw1yzrv9vaois51ckjk8diq9bxfpmo99a5gk93yf10dtc3s7wpmufs59mz3wzoia2nd40n6d7gpcmk11tcnp7zgou5pnv8dbtocunpouq7o123t4ib',
                iflowName: 'nl91bbylw96zz9um04etfl8eu9w4cjcv635yvusm6pocctq17n7l5e1es6sfl6mzqlp8mf77o79vffes68ai81qcz4th8we5a3r3ogt038gaa68i2skyz50re8rmmm221ps9qquzm5hqjdoj1rity6bvsj6txz86',
                responsibleUserAccount: '8tc87hvw1rds9csea7zb',
                lastChangeUserAccount: '8kmcx762x5ztoi4ic6zo',
                lastChangedAt: '2020-07-24 06:15:31',
                folderPath: 'l70sexa6yrtdqju6v7eg7kczz9wdriw5qnyzc0y6ppx7cvefflkohtpor3u18jap0ftvtluopb6a75viclicpxo9awdc05yla3mlfwpqbgjj1xzbt3rfl7u5z1rhpw21iebb5zmh7kt28krlws236mmcyipbr62y2wrgui3idw7rby1ha1dav5leafd43x8xu0xzuoruogldl4xdtjtphzcupymehc6yczinozb70ph7zbbeylf6v0pg3neduau',
                description: 'gnk9yp5hhj45cfm2izfxsrx7vtg9ks06yzjcsksw7rw5c6gg2v38pwhvyjeocwvjdmolf700ajx8it7zxtupyeu5nqcvq74v9cyoxkxu6gc2xzp1e99ybgjb3ei8gerb9cf98vd8tzld9wjyh0sfn09cqoz2yojkqgyssy0vem9p5pkk1it7nqv8h3g45fujumi5kwa13j5r5fjo4n0gr423nipssj9cx1nt1rnj2vh6jmb3cmxepgfa8soiet9',
                application: '3i75uxsvzcsk6uujeax9ri0ayba8ibhokqirw6pjl4awnhnvkcz4wbqk08si',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                
                tenantCode: 'goc9g15lwt8119flb4dw3yge1uqj2wtupeuqdpi22rugwl2fbi',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '09h4gal1gjxdjwxf63w8',
                scenario: 'avszjlps0i1kxuk0cvh6o9qdd93ifxzd3qi35wq3nk5730ovr7q31ua4mj1m',
                party: 'qaqqq2hc6ygypz2vjgoedrve4d7vjgvbz3szn2202b91e8rcfwal7hwil7u502f3sf20ndhjj0434vtu5opwdesxg62lwwd86duy00yp5tztjmt4cu2ql5lrgf0jbq060wrbex1lljpsnnywpt8n0l6lt9auvvbk',
                component: 'jplt22qf6jfzu07szq1zu6i30jppslzypt7gxmr7jldnyvh6gtfuen5lclgcpy1id8gkitir6kyerpzgmckonnx30dw8anvq006r7zouziblsqx28mzi3vufgnhlzjqobbg0cq48w63ilqlun7n3a8qjwztibgmt',
                interfaceName: 'y0tg91p6qbjygc3t82p1w8wwkbq5orv16odq6pu2sbphn4dzxb9oipcalup9690390w1dcilkgbl4tpgghwqidsz762i62tkjfxcw8kswn3m0fbw9jn0hxcbom05d9bgnyz0ejdv2oib2iadl2ouahsv4kddgy58',
                interfaceNamespace: 'cu5j2i43vjqd7yo21e9o1kxx9cnt8yb7y6xc58zzicbg9ly51y6f1ee3lcpejdhv2230kejml34nih9law799av8zejosrhj42lswo10ftjao5h5dkyvaif7b2foa409gp5zo7bkju4x7cuyoxeypycezucpc0sh',
                iflowName: '6db97v2ojdp5l9my8swk7yyeqxok6is0pa06xhd09hl3pextk9xj4uwlv1whdfi531khr9v26urtgxxf6n4gsds6hrzs6vi8vupahoepgqkx2ckivheyw269z7f97hjsfjhih45yokygcgq3hk4hlo2pficfyu8k',
                responsibleUserAccount: 'olkc8lhhhf99yqyt365c',
                lastChangeUserAccount: 'glra9bfgi2omwytonxqd',
                lastChangedAt: '2020-07-24 12:47:41',
                folderPath: 'eecyp72a2sxvovg4q40rbnw860ammbs24sgvu666u3r4puumh7imt0he8ksye2cyscqsqht166tg7qk6gd7zbt49hid89k7alk8v5hmxd0eumle8xnaqbx18gjb7c8p43x3re7va8shd4zbpbzy9qvxkakgt4e34mhqjznk1m5mlyxx0cqq7ic8yoeszgg3krac0tuffwww1zmmef6oa46hyncg5g0wodtgaehdyx0yb6noyy7ye558x45dtee3',
                description: 'mbzvuhgwo3b51ehqe840kaprz6oflro8c6cfjjhhk5c5dj9tmspdtigy4o9jt8mvv0ztj1ey5uij4gpc727jv7kdxzy09w7zna9s50pxpdu6lhuo9q2rm5hab72klvlaqpemldcnycsn7s723ekznmyw0r5cvl88aek9d2f0qh7wb8ewuwzwmjek4pe7aks6yp44p0w04fws086geczzods7k19xdwnjvn6br6tvk0o086zknkpytou2xyikufg',
                application: 'gcfuxuifnt2k1dw2loe35souoqkj12n8mw1u5azohg6sq5eihzf5x9p58iyn',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: null,
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '6umwj8n6bmbsecrncaza',
                scenario: 'bvyqp07n1fwgm4400fek99fefmbzb80ixt3hxrnnnbpcg68igujktt8k0r1m',
                party: '0qu7pisr6wfw4zykl4a6grqpo1aygsir6s1qx8yvicak3f5rp5u4oqixeva97cv4lmp9z4m2a2hl7rga60lubrbegbrzug9k5vba978pj8ac45ozsfojuedjx1wa9oe4dfzeq3w4afaektx3ujg9oxhwjiksobx0',
                component: 'l7h5kmzlg6wslgoxmupcfm4fif5ex8i3y818gr1mpiag9wvs7fpk7wwklutng62a2s3tmhr1maj1ea03xzqe3j4nvkxxp1qmxswp1enr8jr31s0qly6ou9doye9ypgncpp86t2a6g6ut1z9vgow6tbuw75bshbpx',
                interfaceName: '2z1z7szmhnf4bw2zlpxa88fathfr8gcwi79s8rj3hgghc3t9x140gx2buiys9shx5b57roznt2ryd0gb5repxwsza2d920s3pb3wob2ffb2mi6363ho6pugc38w7vvohh0o9p1cmwod2j9fcwyc8k8j8r2w4dto4',
                interfaceNamespace: '2ry2wnehu4aro2hbbb87n0rmg0h3zb54cj6nufvs8qjjhw3lbocpk0xeh4ftmpygzjxq0y5on06k1k8limw1f5hzst8awfb2s4i1fyv89g29e129i3xt6umtcdjh7vx047j7clb1n1zbkns7npqpzw0syhyq4m1r',
                iflowName: 'c8ogy743jatbmmsehoozauj21tpwns5up6qxyrwkdnim6r859wbchnwrnjhvfrvc2bd3cgyyi7m7bcfnmev5k6tcebspk2r6lms92azbw4h76qt0c8ded79nqw4jt6bk5fnieqgcvrhaifpsg6pkgnaohgts2nmz',
                responsibleUserAccount: 'svsj0xx8tm0imn3fw47w',
                lastChangeUserAccount: 'qzmt4t1yyu2rsxz0cdnb',
                lastChangedAt: '2020-07-24 06:01:55',
                folderPath: '29bamh7e5z4t49b8ttu7capgi7gificmgwpp6xwces7yx8h5ccsymwh1bjl9rpby0mu0x738uom8q2r12cjk44cfjsmzepuonj4epjj6x6mnok1xfhnzdji14wpiit5zi93jxhimiks1wns2zy61kr720hocd2nk9blayov7m4tth99maw0d7ib3mmmqwglvkssj25zgpbsoj7ttx32dvyxsxbqa7wa2s4jqs9mqjxov31rf25eg0y9rvwpnj2c',
                description: 'kacd84wjrrwgdoqrub1x6j6cazrbf4p9jas1bbljt93rhu3c81h58rrz1h79pxmwzqaj3tuysrrbp4lo8843dgu43eycikyktwu7aoet9ydpl2ivvkftzszjw5s898c5me4akn0g5p07j94pn0nvhkz4je5e8mbjglqnfeqcyl1cg8k76axv4bf7pn6rg8ag6vu6hokz779znif6oocd9qrb845sx78a69yajqqz2qsb6ypwp3y6zk38a7rgkq1',
                application: '9wa6nd2kbj5ivhcmnmejgh8dsc73k4sdxzf4glxyuhelexlqqzjiu9i146np',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '90txv6b1wedlxl2t9f55',
                scenario: 'oq9d6y4qlguc04opmbr55k3xnk29vnl17mu2tix8400wnp0hz4itat0je4ol',
                party: '6rc43x6zc8ao9qvw9lt5ye95obyexu3d5t4elhpkgwgq1rhjwxwrxhu3piso6ghke4uselktpwadp26ykhoenpkqprd87do26ayr4j5kamzlbt8w5nwv2h5y3jyq3fl03amkipub5dtyhc3bdfu5m5qr5foic2bl',
                component: 'i6tta9p7xbgb2txiiwfjng4w1kqxoawt7k8qyz7qjuxvcmbnkcxtwrrllytqtorfh8eokadulr8vui4yalt2zn6051x6eyicjauhg9ejgf27vx1zr2c7kow9q3vc0blt7b3g8ohzqxteaksfzx11yaeviscbk6hb',
                interfaceName: 's33ouwakm7o91iqxdmrzpwcdvbzppbfryhpg7ckkk8wwbiwmesc4fuzpeoaxj61eg5nxoqy366cdfy77m6jfx6jhy9mt2yince1g725y304ovhs84588u9x5sbwlgz2pvie03g6f5frp5a30eo2odf73ek22o0at',
                interfaceNamespace: '1axny3bgxcrdlfs964fczekgqpajpemnxoe4rzfl8x826lbngxl9sflinfiyhafpcpb22abif2ilh3s2yc9ubvur4f3blpt0k3e9d61fxlr270ouidvgb3w8gxhm5czcf1ausztwd2dxscfr3f11jg47wy313xg4',
                iflowName: 'igwj3pe8vxnd4keu9800vlleq6sclwej1nfzgfzkj1z6a0blmiet2eosc9xcok9d9qkfz755a6uce5wpnfycy3azexjat7k6nekws3sq8g6ab83rsd01ov30ozm782vxg7u5sxm0qfwyv17jhpx00sfccm85roxs',
                responsibleUserAccount: 'falepsi5trjwdx86kr6f',
                lastChangeUserAccount: 'p2ztjv2b6kky6lxuezpi',
                lastChangedAt: '2020-07-24 09:53:50',
                folderPath: '75zvyipj612gwvxyslkeolorbq25lnid2opiwfomuf0biw4mr84gp6xs89kk47g1zfx9yxq7klxh2t85somzv3kbybk9ah7yzubmf8xptjryo8hc5kn5v0e990tjwuswy6or0bi37841bvig63duyc12jclqc76ylcimhzquina0ig7f2alhunfn00v7a8j8bc5bsr4eq6f5wigs3bpk7eed58nb2q867l7v7itufldj4kt0rtantded5z29cxh',
                description: 'xm2yh88n7mbf7zx1l5p5c06rydw9e10xc8mhkg4a0f00a33nvozmnt2xc2s560mafrpcencv6w7qdeybskyh2kbcvbg85lxzhf4rtfrwn90whi1ishhxyqpamxo3jh68lhlgh70341a5kj6nug63zuy0zjqd4py6j3kqnptl6ttbouenrdq05422dbtsgifoebe2gcnlygibxawswq72grcg9ac21y96ql2qteqkz6kkdz7r3o8fgnv3dc6treb',
                application: 'fzkbzkn0dk32wxqvuitjgf1sisrv7c3asngdeygp1scv2krwh6qnr4vs6r3j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'zoneeaf4zqxcc8yo2v3prgdfxqlm1s7ek0uoeso6dz11l2viap',
                systemId: null,
                systemName: 'eo9ck52i0bz284twjeyh',
                scenario: 'vwutin1m6grzdbpiqb6zlhak2vykeaguk5b0opvmfwksnkvaqfjmkrhoi85v',
                party: 'epwkfq0lw1kyco51j95bombohbkhh88r2x27e18yiz863o5w6opgszdsa7oih8zbh0gq853oj680bzicppgmnrk626og2treuqe6atw1u65t53drme24v0p751eh95gvkhcja3bxpn4il0z9pubb25ufaeqx5f9s',
                component: 't5u6t3hdmvs92jn6vnqxj0k5zhnjw5u6odgih2tazmlasc5l5adqdy4tbwvz0bsu0tn2wnjzhcanu7g1q1a4adj05jl3meyoen87y7dsms4ygo8lrxtauwxc0onf1y63j38gimx6tdokc3zlbzg7bs4jeblvb1oq',
                interfaceName: 'w096crj4096y4uybysukovfood77n07ea3x6u3w2ujdqnm68xm7lc5530fcmlek1ird2eojczdntdaqgd9mcclloiwkjl7r8eun1os5yuo1t45t2z0cl7f756gkd9yofxtcampjw56hz9ohc2voj005zshlmo2sj',
                interfaceNamespace: 'v0n66kodlt70hxayfuj5531uywbjjrvhar0e7shgaowyqbdo2ydau2zm53kq5c4uhz2tx7sntgxhvh6jhmw07dgc8uhe0p63cfwhmhgk817bs3j4m2dawwweb35o3teojzmmoicstn0gv70g5yqmxfc33e493c72',
                iflowName: 'drwq86mfktouq8p51juzyr9e92j10ehel0ffs0wvzn6x22i4f7j84jv4gpy5z6rrhq3bqbocaomr793hfjwgy5vezzo6vwcv6ydfbpgsiu2uza2wnxrj0et13n3ifuj3ooxxrprph8x6663fhmhjwlyte2thm6oy',
                responsibleUserAccount: 'gf1cviziv6ik2qbqmz5o',
                lastChangeUserAccount: 'z6e4sy8tx7y12kb5slu1',
                lastChangedAt: '2020-07-24 03:48:44',
                folderPath: 'qxlzqf7ps1mv5y6kv1mgqsi5dl6tawi42suyq3qy0yw8m2e35bbokoukgy0sim7agbgdmulvy4j8u8dwrpzuezhe5nrured1i8jp9cfwkjaa5peah1wrxehs4dg9gnzzw5r5zxa4saak02n2jibmzrvms7icauw5zxeuhgm1fgz6e76a5sc2c8h86si8eej5u6ijiesmy2p90o66rvc5bdodcbzkoyspycuzrud9q1rq6y57149uckc1efhxg7c',
                description: '8htwpjtrmkw5yuwo32fo5d8qx8i400pgmr38uhnl1zmuj2yeu20zl52aesc3tu04d7wux4h8k75r2m7p8wftus804na3eexyqbj19betn2zhb5ej2x204irtkhd6aart4kq4gg54sc3w778774iarg7jmoml8lnkwsyfxku12asuwdk379jp0sucljskbpoa1flz0lym9kjqva36erbka03ack4hb3blu15nuuiwb5nx2g9zzgbzt1c3iugl43c',
                application: '1f9n4lngkmvhpx7171m076gttvippfzn0mqdockskf5h6hi905971c60zknn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '93hzpxfovgm8vyfw2htuebxmfmjld74lzsb9lxyn1ct1tri44o',
                
                systemName: 'uv3yv3ptavgb191hs81j',
                scenario: 'gyc1swhoe1tozat47t6utfgldp2oheejr6ehpsdkpl533usi6lnc7zmzzc1g',
                party: '4zvy8dltivv1rnubzicboyjhdnp97dq76ee028sgd29rt31j8oqlmzjubnncov1pkuqedtqnyk6a2xleu12m9h5bgw9qia42t59m1k0a3e6u35s8cqs9zbu05wen3apushs9w9fsxen9qp1m2ayvf41ipvoqr2wt',
                component: '2ab71eeuxrqy55qds0p9eqh21mgp82m7s03ujdti0d9glw5a9yx4kqas9pw68qb8gkejzmtuec2vkgxt3q1hngl392yh0ay1chrdxp6ckuxfxzuxsmsjnmfcqz3vq075zar65d5qu3zjbigqykxtnu6tu11hkks7',
                interfaceName: 'dazzh1isasdn8fvw5njie93910vg21ztrbjkykqo8yt76701delcx4j2enoxznv4ua6kylvlo9ziu7qdxoutm5qbeusx05og3r4sr8nj1y0e4z7vrpnlyhv9q1w94uy4nffvcxholc8fsd9nik1fmnyvep3qg9zu',
                interfaceNamespace: 'lau4hwicm2sp35ayiz72uxw3iiiwjr8kx5cfeb5n17tw1fb1dgxb557egqtllkv5a2r582c0r4ciuw67au5yev9l0pykt2318hhssg0crr45fvbkiygc5zjb1v631orytkghqclwge6w4h0uyf9ms1juyt1dkivb',
                iflowName: 'xpt3ma2y7ixzpsugba37rwxqmvmh3pmnxs0i0m53q4ep87pbz11rawxn4px8pemmfd81fek22kzvqbpbu5orxyk4wvjtqz5cgw1ct3wzteg9mq5ttqdcu5x5dlir4924vf6fk9ys75f0j3y9z9fqu43r2sx2646t',
                responsibleUserAccount: '4ua74wqhh5w342on7uv5',
                lastChangeUserAccount: '8rqnum9bczvtxd1i9ir2',
                lastChangedAt: '2020-07-24 06:12:59',
                folderPath: 'uxi0v82ifwqnb1xsrfm6erx0zs6wpzqwbulfn2z489e29ha0pa962hfg5rng03ytuykctboupxwryf8dcfz04eslhrb2rjp1pljhc0gvwehb5bak9c37x7q9ohazat43n4m00v4fusp2id0q4s7a6zz0dqgccd7hbsu9yrn94ozoyjxj6duqc5ta9hpzfkc776p0g7mlqhen71oyo7810h8szkh0njc9qf08qapnt2bmnbdmfqqbj4bdupd4r84',
                description: 'pqq2bymqxkwcnim1uextomujyv2wf0p2o0546jqyofsjvcrb3ns22io8hsrz1zfo13yieqggdr62vsoinwf09vp3qeq9a8wqv3bg0u7h63f4c6pasn114l09bqbgqja6t0bp5wd9haa40s3anq5atilv9boi1y9homtsw76syziy7b3209p5emmf20deysgr3xcpol6ztshxhiqplu8s7ru8khvepod3cht2xi42ol10acwhct11oegdb45fuav',
                application: '7lrxowsvor3qoe1vv4azdfc4ckzfimbwls0ke6a2ywn3jvggfn53jrt0vr37',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'chqdhpb6op4uala5xj53n03theavjv138ncxds83117s0mw2ax',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: null,
                scenario: 'nh4vfj3mxpvq7g05fgl87m2frxb5ue9ddgde1th2wvcb0z4xg4fhxii2ql6p',
                party: 'x1i9za4nj0klm8secntaid9iwpjptz2fqyz8t1ev2aulexj2zoto4iqhgl4ufmxi1ga6dtzi6fsp1sjmxnkex5zq87p1611eyu1umhffxia8fzxnyd6hheg5eu966z9lutrhyddnpan2d0vucdxxbfsyfngd48np',
                component: 'rzyak6oahbc3seix9qbuq37an96q9huceby7fhyjazp2syzadsgfwlf0h05b7lzk60776lvuqs1aruybm3m8tmr4veo5cgx2f0ekvxmwt73jc0vsloue5f3tli7atq70lia6q387z1w63ase3p5vvyew065rylsj',
                interfaceName: 'bbt9tkupardnzyltj1ujjvhn25cd0kopmkv2wr441v07http6h7ih1p6nlr2ucg2hskmb3kz2m7w2b4zt42bp4iwrdiz7w91ihwwqaiphww3v297gy4mogxzjcuswzfx5hd738bz98s2ia7ktsmvvpb5fxmmttop',
                interfaceNamespace: 'bsooc57d9t1dvj0dvwfpoe6wacxdr06s2a04yrwja6hgt1052h0mab5bt350ivs6sv1j7p43ma0dg06yah9okjc0mgf2i5f97hfmvqshv1jvnlr2o2gpa4jent07esktyem7jer40ojj6o8gh3p4pyk7iuqtm24w',
                iflowName: 'au8n45a3fxlnqllzga7jmaqj9ik26960ql516u711urh6nq34d3isj62lphwyzz9nemw1b0470ec7fz54dno7h948ixe7r756nuqqy29vm7btztvxq4lofg8csbwjc0y9m04rufbgv0reih9aq8olrl1f0iaeewc',
                responsibleUserAccount: 'sxvb9w68kmyb3ojm8ilw',
                lastChangeUserAccount: 'khhpcjrgwj5vbbky8iel',
                lastChangedAt: '2020-07-24 15:26:17',
                folderPath: 'q926seaswg8n5c3wab3bi6v7zs83wqs8r1sik6tpd4scpnqxx64ix7wl47rqcj39uxkf57kmg2p82rfx89l68qt79h87wshx6sme24qqkuzol8gor7rq3zkleoxry4u6ndkkekrvr2k8wg8vtmo78iwvukjez8q71zvfzuc9nadzp3opb8lp4uexodo96eff5oqom7rxqn32f9fotju1j99orptbv6sp63k6wyn8tvr3if3i357le07hrxd4ugs',
                description: 'qyqqgmvdehewvir36ru1nxyf02766ux6ahtv14lcq5r6c54or9s47b2vj6t2czxtmwzv14x4mstiypkqvt6dh4h5f8n30w6o429ou9xws64vz1njvfh6nprwj7rlanuprj5lip8k7e0eiq9l8p62uf765bjk3xxrvtl9abl3qlolr7p2asazzjcxkoufn7z2f19s652rw8azb32fuc1u8ula1cxkngm28dv9uz10m3rn5ikilhn97u0ew6nop8f',
                application: 'j4wi0bcoiaxn4oax641xm2fewabr74zs73f8xo6de55usvjqfhlv7j5ltpr3',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '1bdetatd6z0vfeae3q8yhmtvmjbkt257vjkraxxq2y4r7sdx17',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                
                scenario: 'xpxf9znrlmgqqulto4wrpuhae7cnscdlcq4365h9hhu0znjgop1chjr0ogsj',
                party: 'vg992y9lagwf4fgc1bs79eikagtifidel88eb1sc8nnfik8bodxxzt1zbqoscswk8bdfuo4uqy4mpz6wexmgva7jk5mkwr5e8zrwyh7bqlrwe797tgl14yegmaf3zx9m2juhv93kcogdcke1r79qatghqnyzrwpn',
                component: 'potndlvhpzfpihdgnt8nxbtz52fdno5m5kl1506uyym351z2og07lj83vitcprtcu7g64vqi1qvswqml1u0co8fajkohxwuwgk07jfk8j0k0o1grs51qz033d2zr15h841srfei38lcvs4korr68hyphxz5zbfox',
                interfaceName: 'ikl3u0cei5qbk8netyv34x1asqzp3g8ggf168xc0625ktdkcgedjvkrwgihoiiockmk9s1p0lekgy3qp8c8is01ykm5h4ae6i0seemf8mh26cfhjjm7ztwww6pzvhwv0hynywnkgd38lerk04crb5us33o4uqbgi',
                interfaceNamespace: '0bmg0ij84zjmszxhy9qcyzclrylgooy6u0nzrudm7ygvyvb657wzz8471la010tt8br4y1vggtejv7bzon5502r42cldoe4ahfjy0qd2ntuggzcxzf5he76082o4ag17jugg1fqmpv74xwqujykfekn8l5netpx1',
                iflowName: 'iyd5t4troppojwa1p9pm58jtfi09m7px5kl050mms7jknxzl7adoqw9rtrmgupvhb67n8vih5lb6x3nliqnyjvb7n814a2anpqekhimus60b2h0a9m6h5fgir2llaig6sox15y03zumjxpeszea49287iu0u5kuz',
                responsibleUserAccount: 'yjtceg6dwon0phdxykd7',
                lastChangeUserAccount: '49fcep8cdb94dp4bonv0',
                lastChangedAt: '2020-07-23 18:50:51',
                folderPath: 'b722368yjeu9wf8c8uydlrtmdoloe32dm4g8dosj3h0m9s7s7ijuqwp4saxcvlf9igvdlgx4xykr5sc5vo3wsr51uym7mf4c1f4eazcribkijbd9adi5px3in9nsl7lw1v9350mf8nkjvyxk494bkubw1vmotvnlwix7slz9m079rqf0pwe698klijr179oaad6gf1rqdqyaz9kgmtsif2skh3qgtyvz0oscw1xkxs76embd0e8x7m225ki3hyy',
                description: 'jsra0okk631qvfr0w00qdbdfmhmf5mm2qarq93jdu4n6vxmnubfdnft785ctszsxdy1u12u3yffljjvd6caoagd4k1riceh2j1wbs9ngfylsjmuvn7i3uq8zgs04alqle49y628e5uqy9e27ybdzhrcptg99ps5byneb9kxo5765fdg7pjbzu3o4at47goswmo0s9jai9vhru103olcbj92vzp0d83ow676iz3he7asd6nntf9sgohm9yvdokx9',
                application: 'zml4wb0kxwn19wvyqcx5hxj97rnfh48jcbu193i4cx0bheh8mloc5n2op5ed',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'cap0h7st8q6k5eghascnp3i6v1m84qlhwgmaar0u87yj34fevr',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '9zspw6wdu1sjz2ake5tj',
                scenario: null,
                party: '2efzu1d9w30xxofhq64b61a7h711niunverrhq7tormb939y1j318wuwby24w6k04amigbtgqt30l79zrqivdo7vpctn7acvm8rei749snex485yh4otitr9r1xxjdyv2anor9v547haoyg05pkka8t7vv7eoghe',
                component: 'a4soqpyk6ba4x2gvxkp1quti0m6359vf7j1r3felql4vz6mywwgj60ldwl301cmgt9kkj0iietix3ohbrdwb80yxsyhg8b33lc9hnvoobna71wl4ttutj83p8gfie4io32jcn9abgnvgep5x2aoz9l50jgyps8ey',
                interfaceName: 'rocgr8bcvyqgy762hag4njxlg9t4y2z4tro09dm6z0ue2wtwgz85r329fkyoowa3pzjkao7bymnnxk168onwqzr43bbigwmyonuvx99zv7n26cz9df8fm5fzfklbiv1d6zotp7cm9dqel92ir62ild15zrzmcxos',
                interfaceNamespace: '3tfyo74xea25bnu1nup5fj8htpjlf1jdre7qndfajcgvezphwastaw8vtl2uy3tg6ncc1z6mhpsdero2ybn65qikojil9nhktw5q7ur23c6ejiqrssyppmgiihtw210qvnp5xzg0m68zcwk9urtf0r63x8cutvif',
                iflowName: 'moyw8nbrltjnajt95voqv1j5z3e8l5c91fgef5627d2u2x5whnnvs7z15cetz380fiy9mhui9kpondmpq6o81lgwqfbywdpafr0ycbi6siulmlbti1utop20cc53slxrog9j6zsaub0zvyxour1ica2gaur71ljs',
                responsibleUserAccount: 'ab322pun5gekcs47vrpy',
                lastChangeUserAccount: 'reh308jn3in7eomrpjel',
                lastChangedAt: '2020-07-23 22:08:57',
                folderPath: '2nf8lvg3nyy0vgb5fo6rpjrylkndzjeld3jnbkykpdkfil16n6de613kykobv59qx6y675iwbeotplw8wxberatyjn9eq5fnfy2on94kgkea3env37311arxk7k2ilixu10j43ydpx1qk1gc5wggm64ymw8cszv342xsayoumrmwmzra35qljtjycik492r8vvnpteue2in53013df7st44l3bhz3ns3a1utlp0321tserzcb6kcj1uicw5yckt',
                description: 'gpyve7vihm70804lebxhh0rv2ou5hjmbawmsl3fnfruzj3niz910d88yj9bakoa0rwrpyo53lmrzftx115ggohdjftu2n1yc65r9rla54n2xc4ukwkzl2parecrhd1pvjpi52l4ogetxk5yj3jfcvqywasxjm0e3fha4ru41vzkibocazcvu9ovx7gezyi67jgvg1iwum50oturxsrkvoyicdp8lvfiqm7a9ye91zuvmwfpr9cm8gg4j9ecbwf3',
                application: 'hi0fdx8enpgwlbw8d2rbs5h0db66a8o48puku65bwtc2r1r2cf3mkqiqnx6g',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'kton1ial175lf6qetn5p1cbd3ty3o9gx1jmtxnufwfme7mqtnz',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '6tl96i9mu77lo32ifmw8',
                
                party: 'u5vru9nzw85lvi2gy1e3en0ompgjatb9rurn6jp1s8u1tm6lwujyoln3i3x7lezn7874gz3y4kqajfmrxg2lopiskzbwmmis9hlvyoh3cbdw2rfwrz5mrqv6q8y95lv3fmfho9umsssecg0m39z7zs0u7qi307pj',
                component: 'j32k5husztagjcfz67ylmo358snsu08to0zh5ec1780cdx7bmu5ot2huy7lt5viy0bp84wg7bj8jorhl0hukssmo970u69590wqvt5kow32r1u99yiee1rp9p6mdb50rkd5fer6q9ptzsb5f513dszn9vqaq4v51',
                interfaceName: 'hskxakxxl05prpmit3wc3r3rddt3szqasrqfdzei134l5jxibe7wvmcyb3dk1f6t38j0r6o4j0u31257sf1ddct2dcm5ebxq5iwy91r5n9loo48hzwv03lpp0306x5er4pf1wiuajkcror8tp6mhpbhckconjhlh',
                interfaceNamespace: 'ksci4hewdsib2zm96w2zruch28t4uusd2zeubt765i36sqem47odny5xzz1tnnsgeurtqjx9zqcbs3mdspyehuoc78lnplg2erlh7doewywm0n3ttwgigcaz1dlkva7u7020neyfftqejklxmhf71v7jvjhs5chq',
                iflowName: 'jv15fefikkrwa1deorc6nj956uhlnjghdxbg26dj2tz1w6qimbxjsxco8n5r8ddym57dpk4r87esasko9uikp2ngebjqhqv1wwpnzksstivl9b1jtaks4ixv5k1lozez5ocln0pun0eq8cisukuhtxr2zzncm9wv',
                responsibleUserAccount: 'o4czknv66mardx9ho9x0',
                lastChangeUserAccount: 'bl3i425qyq9nhhzhej82',
                lastChangedAt: '2020-07-24 14:27:26',
                folderPath: 'ngf56y74ko4m35g5r2ona5qq9twl4y5k6moztejdbb0serxtg0puq5zgp1ismylirhefg7mwod7dievp212p25z82pkh51er2m68xgqx2gul97n8n2ns0w31mlqxo8fwc0movu4ifho42g5cadbtzxj9th379famllr8cipjjn6kb99hi15pn7uulz9wjtf5wcd6z04a3rjij54t7zp4djz4h12msre1x29fldy7i2jhenxv36bv7laaisn6kj1',
                description: 'xssl3i9g27txo4qm05l0hvi5ixg1di209w0g828d6nlpm70maj4ez0kf6o9do1hpf5o2irj8f1186gdm0sfugwewegs1p9ibgibmcgcrb4p17z7vjj8sy86o0uez0addrx20p87v1djr9cwfuugox2crxn4ev3qu518c27resrpt0seeri01b0ifb99dldeu022av55s2r180x0nlswnhmtwonogo8x4v9wg4s7rvy57dpgokwvzn0nltks9jcc',
                application: '9h4i771oefenbqo70lvtdl1ehrvm8ruo7x48lk1tp97qhxkscj899u9qibme',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '2f1kv8rbyczpsgjsia4zejnz1zjaq38zyy2baj1od35n3oivp9',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'fvbtanh0rqht7m05uarc',
                scenario: 'njqyub762u7ktlmc3frgiicb544xlc5ksrdizw3paxvek6obn2wdkdt4pamb',
                party: 'w8mbwo0d68ym4oukbaw6km4dihheoairoc147nvpw4posn0dumhv6kqweu2ubw7ml20apz35n3fa1uz9f1pdqdpewg572pg81htbxrw397p8ceu4v3ijts0mzom7bncm5kcbhq9ibujk2oep09v5ldaxcbg5gcc7',
                component: null,
                interfaceName: 'bj347m0t5j0k66m7j89rj0azrb0hvxy6e1wy84s51t5slmooeze4l6y356bzb86nnlqigmnmv7bd7tlkhg2y6un5dk6m31x5a9nbfkvu4g9dd5tgp1hhs6lcanvsrp7iaiwb3sh1y2nv1qpyi3qzprkwe5v581t8',
                interfaceNamespace: 'pgche10d8g5nxcyd3p4jqt1srj6gialmso4nv1mwn3fr2lhg8sxjrjfa05teeypzraukjzpub82fdxjui0zeizagy1eyt6ru2vzm2mpbw81w6e2bbseol7mpigthp1jtz6873pe3hs5ex3trvrlq984yrhsph4ne',
                iflowName: '4y6lgaxrwlpqn6c77ye7asx7a2dnkb14fa80a8ic0ypntbxqt9i0acqss850l7q11fsll6t9jsczjld4rf0vlc9sl2naobu13lmpcxofrz9shh7ezeorqpd3k14ah9834eufely2872j8594gfcla44jiwfn6oyl',
                responsibleUserAccount: 'c3hbtewv2qljqxvksc8y',
                lastChangeUserAccount: 'ip26c22230hrci424q4q',
                lastChangedAt: '2020-07-24 08:35:11',
                folderPath: 'k67jh9z7tgffeeevtxaao0pjd6r7v31sxg0aksegv737mempadb6uh5r6l04b0r47wmlf95t549sojc4l6w4sipwjr6o3584wx2656jbcreds06rbuz3blups1ar7gxsnqmtuzulyqgfwem48rktv8nzmvd1lrr2j0iawrjpk0l1dshm9c3gb360ehxwbmsstzlblz6yo4kqdsbmlbniaqgokbqqkgyxeq3rlsmvix216d2aiam3n0vk3ppzsz3',
                description: 'sbcm4v7xy6u0khcdo8wp9bb3q2ch920z1x6wbieq5cwinbnbgqwofs1dtvy558dgb6gj3iwcr9zthtk27ml68jhm61jsr2c6uojsus3s6aqkk8xi38gy5xkiaeob4z978ixt84wmdj0ckxihts42drw7k9whl8128j06y8sgbahzm5y40g6aepayiq0w6anwn0rin7am94anumjxic911bxg400rsj917pveqoeuzosvrbjgar0yhpzry3ned85',
                application: 'dgi8z3p165pp2xc3lecymhmjy7kllqewezrl4tt83wrloaknno9mkdvp81lw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '7aidx7327tx5dihknjvu5195j8oqly5eglnm2vwz2rcsdijoal',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'odr3bu4hhhrda1jhsxjv',
                scenario: '4hdq7qv81tm2zgbxhfg1pi2ax6zvdqd2lbm2mc2ewga39py018oehnipnai4',
                party: 'd5bevw87hijbd7kogjb348fqjq22ny3l7edtx1kr6tuxub6as99x3jq9utv828cttro95de5v12321vlyb5ias3sfkdqu5hbnqzjm5kgchxb06y7cpf5ddfi5woihc6flszfo744vhn63sjdtn2ayzm4d5lpxi8v',
                
                interfaceName: 'gv5kbkfn2j2fsrbp793h6msvtl23omrni7wcr4r256mgt32fkc76zfz3mvplym8msju1knvweqjlw4h15iwrwfci97ye30tni4jun2rx67oewkk6eo7kulkc3odolyrhrg7pgjova7e7eyihrcav48mvhotclevl',
                interfaceNamespace: 'bfpc369687h4txxka4yggxlexre6nsyvg0gg407j7hih1n0ngnt9ga61cps7878p11grwdddg60nf88e07ffgnbtkrcjvekt70o35qnv2rlngwc9wtro8gmky01aky8skj8q75qcnbcg4m6skym8s1mgqxzspkc1',
                iflowName: '99p8168p61bnl1jhik1apmvexfeff83g8ci3l2s1tg5hkfx30mppj32b38dx649bjc17n4gzg2pr4pt1qsu2aejmryaxoyz4l6yajymyp33g4eukjzcsbzaps2j0zome9e37gxnio7tbw1oi8t1dkuebfsxu2g4x',
                responsibleUserAccount: 'jxhcc7zya1ot0p83rzkm',
                lastChangeUserAccount: 'oezb9egib3tbhok1gncv',
                lastChangedAt: '2020-07-24 11:16:33',
                folderPath: '6cqw4t5sbdeayykixsdosdy5plrhfb29hyrm9cqj5jq1za602lhzfos5n6frg1hzfd5xoz4yv6izav26av52stpxdnxzgi3s8mkhk2a4hr71pphd0x0bt1mcl614vux8fld79zvd1rj04zq8sqaz6rlpzkmw5967lhz503e073tvu5kej8xo0x6ln1e44x6ymjbn6i2p9lr5j5ts50lmetx2uns5abpt5rpesaa6eejr1q7uwmek8ui5suiie9h',
                description: 'nitwxse98uppnw06x7ib37te1rong2gxx6hqgmvb1ml15oar5uzyi9wxiacahlot2vp1z17q3ji1t9kl6g3y8q9fpek7j9evrst4qnzqjshz1o26cukjfabhllzicmaqwkv26h9idsuij13fl7ukywqpfgv57mym44ex0v7v01qirgbyc8giaswzm2u7v1dwpytcglb99ivc5irb5u66se5knrwyig6byixofrww1fmt4wsuxs8wthcxka1irz5',
                application: 'h7zn0greo2ruqqc6lkyfww26fvh1z5u2ljoexjgk0qow9lofuj15w1vpr28u',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'ever2rqxjoyniaig14esve9qscsjqo1s6e4i6m2o8xc7da1jh8',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'cxbckr9ebh9bt49pkvnz',
                scenario: 'erc3ar9wicxliq0f2bo1umhkhlamu5513cpd6p78ku3gho6je46t709ldayu',
                party: 'xpfzrcp07lmwabhsmr1xpbo55vlodhnjygin9bjim6f9uofigvrhvxkabbzxu8rtxzohn67usvev91q45egrw634vrdkm4rpv3k5kvzseqts98pg4a5kbvwbygve8jh8tayld2r2koe7t4vyrmfe8p5q29hhwrtt',
                component: '3cjdwkz7q05q3dty0iitnkxkeievprrcqwj0rlfdjq7ow6jvcwgb76j22bahl526zijp5m1usm65l2cvq394w3wsdjv77ap0ejrlbe56tir53qbstn0pgbfsgkfqoxn6lpg6gtesgcknysazufuetlouybl0h3ir',
                interfaceName: null,
                interfaceNamespace: 'shs2lk4vdnefir1erfmfv6sy29ga4hl7i9iizp65of74900gd396d2fua0j50z5e8nlhck6fkv7j0vx755j8tsor931woz5f32kxthy9zb2ya70giyhhdmjnimieiy8lcb8r7tz357omwomv3ctjg49030d7q3tz',
                iflowName: 'galxy1wc28scb5nluco8u0mnaacfaj718ssdetzxcgwewghlpe2dbnunvvqejdl8zhkubsurq2jz7pokkgf4ezsh77fpi9u74pq3x9o9et4ziimk0z2pl2btri22kp4z3u9te44yrxg3p1nkqjq6leo7sx13j0r1',
                responsibleUserAccount: '2m1p4vhmd77vecrpiri2',
                lastChangeUserAccount: 'ju1cvl4jv4btywdqljez',
                lastChangedAt: '2020-07-24 14:49:51',
                folderPath: '53l5ax7l6pdjigeeap9p72bhkd2r33zxurfg7qv8gelzc5c0nq5irjk2o4uhcn1chf2rkoeyu30y51hyw2oj4lzyhxqcrs7plrh2qyqfw8eg4rtrpgsch4j0vdc8hfkcy25qxzf6h6ac4e43hx77ivcm1pk4w0pg7gldgb84nygky5apv5khj9atq91az37dmn97nter7ux8iw7c7mvb75g7cc0plwza8i5uc0k19kfeh5va6rud46njke119kw',
                description: '6rdllxtyy1s6bwhod21w5wrsvd6dub521399cz14o8e407ofbcl5v0fax60awoivrd17pnd1vle7x8v9ciptepg9081ijdqez9o6s1bu2befjuk4qfp6grw7j3pthdw7tna9q5b57sn15e74y6j3q2lzmtaf0af285pmumhtyfd324ji93r4nf0k9go2avmnmqu2trg9pl1u9q8amk3o6az8f3677m6nxlx7ebp5l8y25cdv4wyv93q6djvsgj7',
                application: 'l46x80ecvkf7gichdmz17dambr2mx6zo5xis91jiphy7wqfyh843oull86sb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'r6n8owg8ok42sz5820x9e0v37f00rtpzl9bfmewx50j29yda37',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'zg3kyb3qzmtb3f61ng5j',
                scenario: 'dml02fydymyvwo9yqkg7qefr1a4utk0409qmzg7wvkb7jnz3cnmgivhvbmcm',
                party: '0s4e0jyepwwn5wfui80liammak1iofua4xp8qrffmikln36webesp19sy6wol4d5qv8bkmx672o5z4ekphnls2kfmc5x73rgtr6tj4xx9ktnened2r2qflfgx7rcfjtmyao8befea7lft9g04rpc2pv9zrfdh8wk',
                component: 'ttnebp2xszl18fywevzryli0rdw0bf11zet5kjay2wf32z9cufvgb5tfqt7q6dbtjcbsts852e0ea0tt42gtvlmsahvexh2savdocc4m747bkoqw0psnmgwp55euygrojczwhji6u6yath57gcmtysi8c866vzge',
                
                interfaceNamespace: 'g06zelcyh2s5zatb2c6p829c6l5aa1eg5etu373e91rabn1bjk5378bogqa68s4lso0n9q97socj2mz9cuqc5k9ennssvkucy7c9yiqujcuwdyhwah9yjcwq6uzpaopxd9wwwcncf14h26r82elzc1zz56dvrtn2',
                iflowName: 'yz3sydmk76k2frf9r6hpowdvdg37rwkshloc971yer1ruw550yez27pnji7c6qsco8ded3sb8hy4zfrljgpy1c9k4669ejurqqtzxk0gfs2bbo512fofvw2vibpx0pjj050n83i3cd2o3tjnxhbdfgiwnbunz4u9',
                responsibleUserAccount: 'e2jiluk8d1x18h8ajbag',
                lastChangeUserAccount: 'nrb75qvv78kpsackl42m',
                lastChangedAt: '2020-07-23 18:43:29',
                folderPath: '1jrlvtph2rtb81uwg4g2ujo94jzntvhbgnfj7qqa49q2sesqtoulk5dkcboe2xak09ngdc497y1p6ad812j53cmjl3b4br5763efhkaz8vqbctqi8m7jlw4erclwqv7938jsyp8ecq55da616qxucg2mjktamb1ch538wmeebinc3wbex0tvnftf7wgt4cp35uuvi8102c3rcojui1ymfvn9plo61uqm0ktd0i9crht2altll1l3d4aqanbq1k8',
                description: 'aycbu7xq50k38yu0htsfyuv125r1ziwi5ie4d8aorsdlwifqs906sbb13x1m79x6zlavc46akavy4116eopyp2d81v1atey9rjdj4o7fef8v3ztwjuw5f9m3vemqm3vr6z1rfnanvg05s60dz14tq3saet7rbtsyw7y5dzzkq0bwhhejyee1w685zuvqsed0jg8igpuzhxu4tqc1uq2ju0fhk3fy6rbr4lr2wflwvxx3m6iin3cjhpoqs2je80g',
                application: 'tbr5uuedcs6a1my4iwv0ft3pxa6ol67dp5ju9b4y23huq361p0kl3kmqekrd',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '4ie9eu4tscd339wz9i03mmvozchrh7czy5hz0l5z737cs0ylk8',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'tjauxfzpjvx14k7vctax',
                scenario: '73ourvx4qucnhfifmbbzdr2o6nrbq30ylmr4oxtuhfvedzrewlkgspjbwx4r',
                party: 'i2uykgzgroqbhs7trke19jrpzsfluxfxw197pyuo4yq0yv83958z5ye4wpnq3mq3pyzdhvnmkpolcdek8w8kxjuybtfiwun91j7ggt5c75kjof0tu7q1f8u0zua80yl10s84riz963g1ybi9zk5zae0gh8vhbrbi',
                component: 'n2ylwjke8ym3obujgv1rhl1uvznvtfgt44gxt6wys1w3igbhitqat6jk8lzacuwwg9dg6ek2kewiivt4qtt1kadklyd0x85g7k8miw6g4dbelsm4mid2p6pwmik2mf06t5yhs2oyrlgvsyx1xfrwhszwu5gw7fa9',
                interfaceName: 'v7ehh42m4px8odlo9nj52tcxw52jbhc6m96sts1p3lmncoqyrzdku0cuiows8mf25lo17fho4y1vuuhps2g81zwwu2tpskqzubvlpon1q1susflu8x5kawqwl17j01gjz7v4qxf69thfo819xqcqrhm9wjyljz1v',
                interfaceNamespace: null,
                iflowName: 'exveh3rrlb5zq552swxbpwmp0vd17f1u4bcjqni9epy2j7zw9zlbio21d6tdtjexymer6mlkckib6gsmkv89d5oql90qn6tr3r0r01dh8vucav0rk7jl6zry2rqblfop1ipp6ws9zi4k8wfhxfvq9kannrdvofzc',
                responsibleUserAccount: 'xbct8vz0ogwg0anijl0o',
                lastChangeUserAccount: 'me6wb9bmisskob3hbt5b',
                lastChangedAt: '2020-07-24 16:14:10',
                folderPath: '7t0oknmp8x570kcylxe7vl5reppdvepty2vaow2dhzplf9hrbbvp18ubsrv0910ewtgt1sf067wdxbt3ul94gh27gky9ae99iw5fshjar8ww86hqpno09mofkq37k2gx50tyzs2n124p9iq6xwz7fbfv8cmxry99egf5z4fm1bz0kqxz1snqbj973mtdwq1zejpxajmxycy3wxhobw1bc1swjajl79gzqrc3rhqzjz60ne8sl3b2ookenajbthc',
                description: '56z58ks7s2bjqmg8ye0qymdd78ikn2l60xib4z6rnv43x5qx5fgwdspjgdds36oex98rpd7lmlrefrjd3br7ilssoihzhgyoyjjn4eqrfnfg969ri0i57iksyped1sj58fvo76rj8yb1f81zt0egvown4bavau9vg1qm255j3ufz61nnnbka7twfq9152n9mpua2z5ypksxabt8ht0442jvlsyeq3qjoctkgm7iu8y448f1fgktsj7taz7f6w8o',
                application: '3tbe2075y4j0owavsjsvqvnb6b3e7ocky45qt927v860m7ql4if040bw3nja',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'j6ikd51d4mo8qel7i9j45ynjo8rfajdpyc9z4a5870apvskj2e',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'dhyc7ev91kct0n544f8b',
                scenario: '4dmy041zorq1hheha74epghzbnk3tpacuyst2zkha85thy3pi9sk0wk2x8qx',
                party: 'u090c5lk3huom73w0rospqvgbmko1fghgpi9yc5f1b6clbcmhs6nkqgado15f6crvuwwainlpuwcxxt85lxcp8axbwoq41071cz5sssqo2hml66wsssx7wrd8161sctphvrgqz23k9ic3kqr2okloiph863pycep',
                component: 'ngwxt0ubmia0zqzc25w075q1oxh1ifgrpsqpmt9vc25bkg259lh6xydfdy2rf8swqkk3abmxfdnm5xxynpbvx870chwvksbtsetnns397ids1vh7iaoobwi9ew478lbuppbqgdpsyuvpv9w0e1lp0kkkv5btkrco',
                interfaceName: '1d5z59u1rtitl7k7tab01khxei9ead2irrtttvo34nepbbn2xwyy1zg4metsl0rujaw899j5b1yi24e18168qdgc9r0duq125xt55ac16dubib7jxrk08h9b1iquh4vhcvputyw1c43476c6c1jc564eficx74ma',
                
                iflowName: 'sqgtpcdmfyqtluxftv381d1zmgjq1ffvfpi7tzut8if6lx6okc79bnjqyt0nq3wwbr4k9cskivtx3lwo9x8z8pchfrv387lorrft4k6yu77dbhr07dp4mp4y2sdmr667uai6wj57u2lzls9m4gqg0n5yj8hs5fiy',
                responsibleUserAccount: 'va47bzbaf6x6prr5gr15',
                lastChangeUserAccount: '2ozso6xxrapgq6vfei9m',
                lastChangedAt: '2020-07-24 09:42:38',
                folderPath: 'eezft2z53vo6zgx2yoozwd9ajbwzc4w0exlplxhyp3cyjox1fao1lltw21qshr7dqirrxct3v5h4l6z2ehovh9xysvzyn9qwkzv3a9iebiyduw7mykyvewk79nrj19eetx8gfbfdokg2ts0mb8wkh4886thgyag81vhuc6ypjd2uz16nx766a35v4z7s03vos0qk5gokpvl5aa1jazfbj2rm31is128brrzh674dtwlw2hdwgkzmbu8leo061jn',
                description: 'ro6a69crtzcq0veafkali3l2ph0exsdgf083i1gz8b36vepdwv6aj33jstzrh7nep9313i0qypzasek79ixrfncblmzc5vflnqzvi8u6coqcoit6z7u42p0l1kv0tun6xd7jic1vvi6nsyva4wk4yuo8aqc6taorq07wuyfpyxvl3ub5tj6p2h7eguyrsd1yw7wtluz91rhwlruozc896qzp342itdp0pf9b9qmmzrcceyl8fpcm1e36lzi8ia1',
                application: 'k7qoy6kowv5kyls4y7jdlypc7a8c8fwlioq7gisrkr8zlv37kxgvoqm23lgj',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'h9sipdnoygjjcuuv716njutuwz2d3bo39bllcewolbo0h0psc0',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '6wt1vaoc0y59y38lltmp',
                scenario: 'zc1tr3os02punuqa3qlra4sxihta9ii65btofrffpn0rtdf8p3o8w37qowt6',
                party: '9v19fuv0k4dwq9pyqdy587zamnkmxj4aphjd2svc6ngy1mwgq019tltsxbym5ezow6pbubl2chntxld0mpmnhavkiz67q94zvo423kyj2xl5c0yaatpuzlweiht17wv1ge6mf8bg7zwbmkvx3lp8mpgofvtrynqz',
                component: 'xlynnsgspwejyp0nbi0081p8x1stbll0x7y3fh17v55a85628r5dreuw2jr0td8nc3r3ycnynlf604td95lom2sulxyfr8b04f93gignwel2f5gi0ivafbtyjehyzgaxoxwz3z0hquy8h3ykyh0zcmknspq8sp67',
                interfaceName: '170urm22ri26967d6hf6yszszlysln9gvestq4zl3jfax3w26k05x93flha6i1hyencpxqaejqzp4ix9o3u49xb13trhi98h5su8ko7ifrc3qvee1uuhkbow4xlltc2rv2shzl0p7sesx3ykhpdwa8duh3flt51u',
                interfaceNamespace: 'wtrfru11c6vchr0ojmr5ym66gxsb77l101qh4cfjew0pggfrdfkzi52tem84flab6ajs1uncoe7zhfz1992ugy004q2p3ja14uoocnmhumrq48ep87epz7qafjw48ygyi0x9f6z9muy0lz6j3c7nhq4sq9ic7nib',
                iflowName: 'oqulk8n5dmxigq1wtnj336oh6rhu1f4lb8np7mci93mojqoyhbtbca9bfzwyp1wov3knoq7gp9efqm2yl0mrickt2jcfvkpwx835axrmfe6pt2vxmcr9cid3bpzhgxe03w6e52gjs08c9t59hpmkxkqbbgbno2mh',
                responsibleUserAccount: 'mc1yqes74e61eo5wptqk',
                lastChangeUserAccount: 'dzt3f9d8mbhvul07mkla',
                lastChangedAt: '2020-07-24 06:24:11',
                folderPath: '9xz7uq2nv72747b5kndz6yudem64d3dkcxt97dbhqho3vdyv712hshc1zu1orj4bcy02p0nh6tc7tkpfslrdtml5nbjudq6bb4f831xdmakeb5vxdmp9ac3qofa025aq7af5o461vtrdah9lt6wf3t5y8s2cvtuyb46v97uo9td494mvcb4sasq61y05yduh05zzld0vl58ye8dg1tqssrw0oco87aralfb1rumfaxsj8aos5vjhrskb8lrthb7',
                description: 'kf62wdqirz1vls9idmf12gw71darw7abvzpti20fudf4734703hhp8f36y6yzzbhx8jovcxct06dju3hk7in0em5fcc9nwpw24f1jq6xq4h53eryps6cxh54kzupkdsd459xnsl8zpxl3em7t38htl6o1mz58hvzk3x7nf25x7qqn03sxaiobmpkfdabgwxoy8u5zp6b9h5ckxx6uwfbnkubbbvexealkbu7pllujzrxm45q7euc7pmmerqebcn',
                application: 'gvcozfvhog0qreb6yfy5qh3exahv33x6a8774g0fs60043vx7yr4t14ohqx3',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '7gznf03psmh9edsod4pr9cn17hvyy01mtwag9f17u3jck02n9i',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'tqj5lwswr3ilwsj9f71v',
                scenario: 'nsxihvwtu4ct4bfwjq2jxjjpxcty7k33lxnjdyn6kp8pet0jhepdkpn3j22u',
                party: 'i2ap8c4vztvmot3923cr1arrca2hh8ctwp9ds89w3zxxhwopgiajg4pl9e23jchhzvk4q3d6yw29wopz5ohpayi34vlt2201k6bj3t2qsiilj8vwm4qgzxt69uh3p0j4avczl8ksixv3t87qblizf0bg2wpq5nan',
                component: 'itc2l6x7cwk7jcq5amsx6jarl7myawltmrgwaciaymmwwu4xdkukz5nhsc6y6m6toh74m7hn4c1nagcfwoy01gg7fhysswfm49gjuimp2vuevk12q3a62juws9q340ecgny02y43jhdaj7zhbkn6i2jbrm9x6z5y',
                interfaceName: 'ajoxnmcg1vixj3c878htkpuxsws79vivhiffqe4w2rxtqv2f5t05nhiqr4jv4hsk0f9n51061ho05mslbwdt3bxdd9khw5k9omxz79e8omet2c3zlm11aixfbq6vlenp5toirbl5r7mify67gw9vnu206sk03kct',
                interfaceNamespace: 'ygrgcd5htkjhizcv8rn7qq2gs8qcujz865tlhqeove0cyutpxbswiykeq58oy3ky8ufkrvpmr1usc5mc3flbtsk7sldqy4tqmhincb5fcjb177nmgoeg9kcxu7du0rd5z9byobdllp6bma66bnqg9h5skeepeh5h',
                iflowName: '4ixc65e3gn6pv1vd5akenyg2t3yu300ywb385wrkt35mrshbm7habl471qw3xtxnh1olcoflovjhgmwnrq55nd6n6tvbicfs0w1sla0b3kwzbkhkmv4xs4pychh9efof4pvpubziyweuwfmv0h9pkrtj4c29b28m',
                responsibleUserAccount: 'e2bc45d3wv858jaf4036',
                lastChangeUserAccount: 'vxn7ayo4olyehxaouabc',
                lastChangedAt: '2020-07-23 23:24:05',
                folderPath: 'm9tz6u1zr3qbs3ga63b87pfr8i3ec6d7ulehci66iuz314osk86ttg8np7z64tk9etrnpt2fg79b2p9f7417yrnngxwbt51ijlottqieoo0j4mc8j8nx6vmuhx71stocy6hrbg5qniveu65566vzd1lj7j64g3wg5kujy9238mlgz00qwmeyf4w523gxf87pnuu1eok65d9t2m5r2vnqo8e0u2mjo8748y1a1hwvg28opd8xtnm3dxx7ywnv3ad',
                description: 'zwa2b8ddc6knw8r83jum1w1kuzg4umd72yjpds5yob5cdxuqn6jrtyua7dyobv5aazto63w2qs725eoz7l3gu5g8ax379ahdj2z6v5mqf8bzgc0dj4xwxh6jrr3c044lx8hgxn8c2y82wigs9u9o51k5ay0briv1rfg8hedmgbj8yp95holzp4io0xvvugcz6jhjhzam4r61xgdurzd4girk3f2kk7snlvdfjq3tbttqt8cv9uftv1rq4i584vb',
                application: 'a6n6hib1ssvwnavgb6atiydzrcdjd9bmqrxyj1j9rtgyqrouc87meivdvokb',
                
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'a1dseqzk2djj9img5momv5906cp6odgt0lb3bzlxtk44tn0zhk',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '7h930f4vfxl75t6595iq',
                scenario: 'vhinf8l7hv84sgn0cem2vw3fjbu4n90saogv5rfgdspw4gkighvgd7f2jslf',
                party: 'jssfw3yotpa3r3mrkvt1hahzvrjqkurqo3az09dfhr7nqxsh4whk4nll83w2lowi24qgnssm4j42kbbiphx78s8dqt4fif3azi2a921ugjw4geych8mpzhyj318xresrr1taq0ob2na4n46gt70iyz1ug93pmn3e',
                component: 'c4u284a3nk4jmq4kpdik4twy5j5wuiedm04mrrg3d7zvqgkwx1mnucv17dan7a03rxysmpxmj2fxvyiihfi0z714u7govxacx5vyzc6pc85fcvq95m6z2wp5598byc5ul9t8xzewitkypbdhizfatyqfd3xz30sl',
                interfaceName: '8hon62bsp6sj8pzcqu6alhy2sqmv6rk6p44ppk4nbz2gentcv7hkx7kxatbuusnog9xi9kj8k1xmtapif4ffu0b0nkd2aauuup3p30g91k7452llpxd8y9tfixemsjteezqqr5ejermz4ts3we7oytgfr6pitkgi',
                interfaceNamespace: 'uf7zxu5r58s4ordlazbv70ovxr8t5nqdl8c7dvzrzamvvh60igid6la7u8nxwzxncv4x3orkn5l5vzkguzlnsspt5rbm5xkj8hf1rep9pgj04teigcoenf5tp391uhryoeeitzogtyh5zlabogdx05x28g03bqwa',
                iflowName: '2hbjhtet1ztawz03punnnm5760rl5afpbl53uvqtb6f13kec1pedsy1cwildcue7qylsil669c50ftp4mjip4k3lbyfmv756qvwi5qqf8hvi6up0ze1hhnw0fltl8s6zk3pzei6q2vjxzw63zp575hv804ga0uen',
                responsibleUserAccount: 'f8pg063fzxgsrj1dl347',
                lastChangeUserAccount: 'ddyok52czghjirux309p',
                lastChangedAt: '2020-07-24 03:57:53',
                folderPath: 'eg2qtp11p9ntx66e3po0vg0of9uv3ze7xydnoayhuzz9p0013w7ptl5naa21539zh8d9m5p9vuvq1qqtuhxhg5a0wey45yxqxi78gar38mfhpowucmcmz8jd234esvw667eefmfsicjsipafp60svd1fg7ajc9f5ac6vxq65oe3j2n8517pgdarcje4g3ss5xpadx66hn3cv807qiixso1oj0tea8p6357duwh9hw0zaue0nnkiwnn9y8efbz1o',
                description: '8mitviajkuu2swwd8f56pucmjgb3yynwf2bksr1rvizwpvbnuj0aen26apwd95ab4nw5ajdxunriv3in8szwki5oy38yyww0cwv7wzrk8r7hogt9kkvlmb4x30kfi1uwxpmi6qsnb2cadw4y3sv4ohct6x2ydg4cms037jgma2z5wofz0shs0smrnwvxoo4z9hl2ek6cyxssivehsm3pgdq6shext1dmiw31s06m1ke87wr5rp6txwayi25426i',
                application: 'yrnfdo9ep1xiq4qorgx5gq9e084kwny2xyahsr5bk33tlu0wsgg6sxoj5gp8',
                isCritical: true,
                isComplex: null,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'pxgcrhzrtbygzz8syqdvuhuu5i9zivgadn1y3w3hcyutwsusl9',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'oenvy20n76utx77iwrvs',
                scenario: 'knbhu182a9og6l5f7mdwd3hk42ndzsmh6igocfsinth051l0hjvp0yinza5d',
                party: 'fpou779mh5q1kdy329s4h8so2u70pp8qve85uyia2oclggsdiei75hp8i8p8yxl5ybpm2ehrymsotghkta1yz6hy0r7cdtm329w2jdvlx3b7py0hriyfo47lwlpk5vuyczbaq88xu5n69o7e2v4it9570tnqn2hm',
                component: 'v2dsemjrdzl7ac75va1rb062b9zbqbohntgy8s0pp4eheacek61wgxt2q2btbr3bv86500b1zxrafsuej2eufm3bpppx5bxbcnr3ede7zexh8arc332fygd4xz1in1dqm51dvy93rlrktjp1ihisj5959vnnmem9',
                interfaceName: 'boq8c13ljxxo01u1hplln35kciwhmq1fr45e7slkz5hq8npdfkrxdy9ce25hsqxwtx1iekcczw7i273924q88hon667y4z5kczo3suhum66h27i96p67htgzs6xbnpxcjjbywindh3eatkysst2n9m29ca99y6an',
                interfaceNamespace: 'wk49ta8fxfdhdes56tl1heezas3ou9c1gearva27kys3gigjq4m5qk9ue1ngqg82sm9v9khvsfrpf350rmlm6kttcnpihyugkffgz1nkowwcpk39k13fmbg6b2ge7lekk50b0mvij2u6czyqgoc2woo1n8gp018c',
                iflowName: 'ie1vpd9nsv01p7vdn13o9c2trl294jntgt9kmjum77ks6krr0jki5l4xptijiunm760zbah0dxc38vlervgiwqmaoevcsv7nvdzz6u2ieitdejkcqybx65px72cwfpm0us4767ugzpfnaht9doq59x7hdanxhltg',
                responsibleUserAccount: 'tofyxihpg6m6o9ewrw3g',
                lastChangeUserAccount: '2mk6l4gewf1unbfy1yhq',
                lastChangedAt: '2020-07-24 08:15:46',
                folderPath: 'a06l06klgm5czn6s9b4csexo6bdoicrhz9ham0v2rais6zn13qad2qq5grydk5el35wxa5uxclmuvfbsr4j3impehw7ltc5upw78ehk0l3awdu8y98nc6mq7eqbhbi6co9srq9kechdzfl1ef7dxz6yuqx1ma1scspjd902qancwo9y77vrcv076tnot1yo7et0wit24ugqf7e1bbmz0qy12yz6wkqcvjyce7odxfl1pmlr7z2lcveo611l2fn6',
                description: 'b5bjwzbg2nk4o0by3nybt15tzluc8g50ga65urghnr0ua4lbox974j3oubitswrge206n1fcra7geqv2p2cd6qwf21cykhhkgt4wkf36glgn5u2wh3ghlup2dhd6528o62kt461x3t58ozjxglhiolp7xmjg3c3w4hebew17430juhvvw573x2wxh0v1rhhzpvqwiq3ksgu526anmhhhy40g6cajuaxsydwlkrrv3ehg2d1b72zt1z630cf4tt6',
                application: '3xs35idkxsd46beu7y9gl8i78f0nd7nwpud51fk4f3p352xaeklcwkj1rkzw',
                isCritical: false,
                
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'bbh4d27knf70th0ogj8y1ln9w9g3cmaz4hx8p',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'yzbs3eovcn6whygqfzb2fwzh4ag50zoz95ehm8nh8ara91xi7r',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '7fg9w8bmwke6piu79jg4',
                scenario: 'e6kd8f25wxuccqr3cl2684bmw2lbicrjj92rb95rn3o6u6ev8q86adthsx9j',
                party: '96ehpemus29m025bg7g2bkmtjgbh56iacry42r713csz9pwjsktfw3qxzh0t93klbn95jzjbdqvolous135zyp811ga6qh68d8v0kujud5lx6pgcc2yba5h5lwoq3zxnj0bgp6amquozf8vquuk7pgidasbvvz14',
                component: '3umb94lf77gdh7c2mqc4yx3jjowgbd6lajvxeztarn2lygzjeyjcnuf9ocr6brs772h1rn4cgks5i91yxa320d5cfat06obl2n8907qour6k00sufier74hfb9th8u2szdfu5wtqp973jm3k5vs1uf7u42j9yuvc',
                interfaceName: 'o8d6u56qphw5ho2vumu3lk72c9t1nfadievbpfnhqif6s5739x2b8eqbgtpfmdt5zml6gx8ocm31yqztx5qsknp14ybo3ldfpiff4yj2716r3llawdper53j23762bhoj9pvm01gv4frzkvr0al12cxefau5tgcv',
                interfaceNamespace: 'jlfwbikuou3p9mtncok70gvjgliz2how2t42neyn0caw3e6grjdunt6e6ziij2grv5vmw1bd0zv2gepkgvqjifv1u9dcdww7xn6sf1ywffk946dnxtllijixul4uhkxfdt4t2bkcmd48gta274f62di75cnmy9tr',
                iflowName: 'tjrmc8382jf7zr4o8jbyacyvma6rfnnwsusl9mywlle46hy8z9nrbpkawkdkd2duh7em7niitjjn2peml3boofrcpzslkjzxqz5iiqc3tq9h94n5a7cs6ek5l60uftfwq0n0datl424e1s4nmndzrfmeoomdmc8f',
                responsibleUserAccount: '5sk15vkj9qizmn645xyu',
                lastChangeUserAccount: '2bgvn5tzvkhj6n5gckfk',
                lastChangedAt: '2020-07-24 16:11:47',
                folderPath: '2xcl9jv67nlxiuz9qvf865p1oiqvgnxfdo14a5542rnvxyhviplx611t9lhxl1uv2bnxzm2fdods0mo5zck3dv9agn1vh414ryq3nmprulg4xprvuvfy0uevva44adk0ex8of79m38rp8m30ub30cfi2gm9853i519h7p4ey1mh1i4mn70un4zjny853ya5xrb483xv8u12mpvmit9v6ftrqdb3w6v3okznl6rkr5hlug75h7r9v811ud56j7u5',
                description: 'draondf8zhwjb9l8ar6ozfu4uv9p2h0f4daldajwo9bx1m2jikthfu8u5b8ujbtevn8rpijyfsdy99z13couonp4oa2x7i6iobqy30lnspyx0nvcuc673kn62lyw9lf5ne7zg26pdrt4e05ycv2zsy7ky1z6zmn35v18ip1zvvw3h30wy5hj2k2dhths9dltbksgtn6f911n2vgxxwhehgfqcszoqs71gkmd8lsen32lm734u8ecw9gcyfpmgus',
                application: 'ffou26bkfbjzerpjdh7ueeiqo2039tmvbq6fdybhumamw4km2z0wjrlf92ik',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '25r63cv3f7f53u1hv1cr95s9952t3ixd08ygj',
                tenantCode: '4fv3y45ed8v7nxszf1ywlda18dpq7lwbd74k6int9le2j95z6n',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'plez1lxfq5d5lc837uiu',
                scenario: 'tnmqp41057jo5flq15x5iqucvrqwvb2r0qdvywnucvxkxyykavynm3r9xz0q',
                party: '6g440rpdtr1vahkqoxb0c0pygpezo2etd63hshe2emrlxm7w74plykvi71702gyxker9uy8lc1b0rm04ybeijslcz5y5b8nmat5g7pz0vkp1nsh0lv3p6om92k13eulcsmb73y984icem95zvg4g5ty4uwgt3kgc',
                component: 'ruh1o1gwf92ezoh5xd6hr67gsnxut0r8fawd7sb3bkvnzjbat70gztdj2b9nn7xi5lhgkewep3nopkczpnxn405lswsf0ejlqp7jwsq2p65f88xwbeejfb6ue9rod3lvyi6su8ytjf0zo4t2wgsl05t8o4jwbz8h',
                interfaceName: 'peaibndefxdb3h95zasf897z1xbt0lkc798k2n97rlxgr8m95wsu0mplif8cpol9m3q8j26flyg3kf8r9wfcljbszfdgqh5ren194vj268eyxprfu6b6vm74u9ry7xg0e16dv9wbw790689unkgovns4hbiraykv',
                interfaceNamespace: 'trgk3abnpde6svqc8kq4mz9ddda6723wzz4cu1yzbyx3yoauq26kab7c9t2m12mtk84kctzbxt71xpsi923iguyz557g21y1pbg62acz5d2nvbf30qoajf559jt8y07t9m3l4dcjbd7seq5qx137uy56iulyb8lg',
                iflowName: 'ti7mc12mj1tielib6hiyh0qyb9dlb8qrvduho85rmdcdguq10b9mz346ipzbddt8a9lbllkqtnd7nrz6x3tfajwvfy1uf83xrk4lpktbnrf504velyy0080u9dapbb62kcbv5bqp09e5wetojool30iyijtafqot',
                responsibleUserAccount: 'encmca2oj9lm4dvdelnl',
                lastChangeUserAccount: '5oxi6xbt1fkanc6agmol',
                lastChangedAt: '2020-07-23 19:14:25',
                folderPath: 'ald665qxda84w79gk9kekyglhie8yvyx85lbcni4m7s4qf3ixqo1duwlazrnkygoxtf953mekpoafclnibjwnziv87m3wup3wz18vgv2meczii97wrvlh695qs4myw2wy7gjdvbiq54k4naji4ltzyvrmd84oxd7cpt1j7cugcikd992dywxv5ygik8zh8t7f0av7umfqd2u2v4qfh5tp077uh8eoiikl0s58uk92assn27blpcawl71kh2ntbc',
                description: 'dbkciek01kcy8o0vorn2ofygxhlghsc9ktwzbthsohbu6ai4xuvyl65q8eiizpk8tv99vmwhu6398a1dlngqqj7twcles4888vamre2ht9n42ufvre7s9sc1pnypbmstxi6w3h22dw9fwsmk36czg1quatsi1owjfsfzksnf82k5iv60bnch1bhp0y9s45didq2t3juo7yhotnnvul6ikc21c99y8zmcw9trgtsuau1byt6yztkfkxg1hbb4kvf',
                application: 'lr2khtlew10h9dravaid0xlox69sh3cii2he2uh1try6dmoua5bsmsc9c8ga',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'glme512rkdxjf13g61dx31tnkg5emovu7j2n6spqvl0voq5ta2',
                systemId: '4w5lyigxje6eus8ucmvll5gyfpwupqz0qk62k',
                systemName: 'tm9u9lz9l4muw471nd90',
                scenario: 'dlo3z0jg0ybk7y8ybsdke447v7v4bnvdrxll32zzi12yzu6wxuc62474aven',
                party: 'a34m2ow0d6q8894dmhfnz940je0nskc5eoospqpqjwho31bob35ajn4mswu6g0aqsfue8b3a6t73zkrc8v538rwlpg00bzely6wccv0npi1v5nusn3wu5y1aacwvyxkzkkpi66o94fw1vzqy7nsv3rejb919xwbb',
                component: 'tohrowjfe0seoxjaskn0mox9l6l6m74s5b6r4ozgookxyjqcue0paozyb31j7xzpt4d8itehkpc10uy5jmj0tpw6qldcxolovhgtgyifpg8vj8huffqngmb24xvo9kfe1npgbfr4equyy6drljzhvu447rp4h51n',
                interfaceName: 'oi8uv3v2bnx9u1lgcdwsjgs4iow7gdni75dzmyi165pg8vqfsqfwon8dsl75lmc3085v4vgkoa9lob9upywkkem338tjpj4jwgnete21w9cuatsaj20x2v4slubc6hjppu9xisx015ai8g2ljq3zf6dabzcwgac8',
                interfaceNamespace: 'gjhiz85loocfekaz5sjduo7c8c95naq2349sxprogm4f1j3z6253rr6e4jt4twxvj8z7qffzlkcwpu4j13cwzguddrju3yifzfqpjq3utzv0ygjw6sekwz456x3atqlgsvcdfket2ctw2hmh3bf7wloblo2dhjcn',
                iflowName: 'ytqaudh5odferkoxu5n3j521bur1tedua849ofnvyalnqpdr54r9h1urkltfun4vq3xl6it68m6dz9g90bjt6x4xrcm6amcbrx4z76qgiykz0qjamwmw6cqx28j98fdxpiyhqpvis5tmdztevy2cdna3pzna2jw6',
                responsibleUserAccount: 'dhx635a8vvcu7tptbkwp',
                lastChangeUserAccount: 'lvy4d5oi1vkjjeam7x6v',
                lastChangedAt: '2020-07-24 02:33:27',
                folderPath: 'hmgzot281ypt4skuy564ape5p99dn9rk66n2yv22rjsdt4ku7nu6j7azbpzvuun4lr2n8twl9ggya9j876235kwe96r9wtq9gn9dox3n8ykv2onwcq9nxt9gmy6l4lbel0ff6bcjgc9fuog7r55fvj7t4z4amxbq6hbw6jqb9ij6i7hnn1er8id6c353uigng3pwq7fpvv3z4azfuqtgy7etpdcsadg2jup98mo5l3xjfh64r63m5g4p9tck7dc',
                description: 'xkwq23i8gfi7mpy39grqujakeq3b9e2q15ic71tf4q8ddi0ewdrb8za03yp2sqgphydb3k9uugjsviv36s14rsjk77r127c93jdqr980rufzul3wf7i7k9am5z8ln7exbcsg2z6itkpclm7zuturyvcp4mz9evb4iqe9n16lau1h6kve9kz1oh928dbrlg712rjllw91ft8jg6jd521xrwucbmth4o6ti8700knfc872wgtf7fh4hqmz0k26gjs',
                application: 'ytqi3cesmsn8jie0w13afxflmvz3i0hlc1u3kfkh3kcbo6hzx4w10rodv7cx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'i5bqku6heqi03aonl66m3eina9q3ods8licibng9ivoexlps5m',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '8g4suo1hfdsxgliy99zm',
                scenario: 'e31meptna4d1ixwxj98a752efli5bumy1zta1kpszj7pbnfvahkkbkdmevmr',
                party: 'f9oohdr460ow59hftuutzs3o7lwvk9ahs1nob48ek518wg0y11tq7x7lgv0hvz84s4kyhz68pm8byeeh2dtpkovquau4l4vfosxtzzwvipy9gc0b4drf38r58dsbv0mss52tpvkjfm92xupur7i3jcvd1vv5orsn',
                component: 'sqgfis8hdb93jyuczvbex6bi0zrhyrxgoom32ztd9c068lzen06frvoaupihiegmikqhktjay5szkxz7p1orhhtcxwu9pjanxu4clhmojkt6lqe3ugz1bq0s4obizx75oo3u6cul6xwnrbfl51tulrjnclbmb7w5',
                interfaceName: 'fm32ma6kucv6cr4xs0wtmhxs6tlndr6mpcab5oo1tz6hf14bnmm8wwgyxqaaqmxl5ma4tdhxoeqo4tvani1wxcup8fvi2m7hot6nea5ye781cel8en0kcmkag0a66b3o38ew5g3bvu5ffx3qch458yd87hpogiao',
                interfaceNamespace: 'frc8esbwyxhdtdsumjuxyw5foae79ak0h5gp572s4cl8qac8gz8hqphn18swjk0v6jjz478mop59g9ukkqomxwzcoam6mrdhu1aha1w99ww2w9hp3fy3ecchwvt729z71c1qa9e2mtcd4lvs8wsbv9yzaepkawm4',
                iflowName: '6kg6i6obxvr9q7vto5ctvt384wk7e4oxqc0azhrc94il9v9jq1u8n0alrjssnqyf9720a3czz11bquardjw2v0tc58s9cd6guz9w2dsv9ud1y4zfqw2ke7kduzn9835cftksyfa37fut4b9qic1r4p1183jiuhi4',
                responsibleUserAccount: 'rzysautmeilorg1yvbij',
                lastChangeUserAccount: '9k0q9ct0bdnl91yd2ctc',
                lastChangedAt: '2020-07-24 12:13:07',
                folderPath: 'wrs391v0bkb3qcpsce753btqa85u7ld10nibdwtk055plo5h1qxngqwn7o6qqmrkrrphtqmsvkijjzpg71gk1ih172budjvil9jyhn98bv783a1t9natlbhg7mn0vej72qist8063mwj6cqo3m0y2qe1d39sf5x1vdlkwmsr6q7ltff3nak8qtid7z78couhd2mnakfcjyatvqrq9kwije70uiharjl6a9ne8n4j9aoqca7ezw8lvrrmd1w920b',
                description: 'jk0ajbo6sasxft8b5hoyn85jl1nvypsrcuny2woy6jhjpg8c4ceughmj3ofnliir0itwcorah1bl55ihn760vsoc6xtczcgv5g5mslz8ylgras9cqdz7drgl92hz1kdk0d9v2g9nje15lxryp1w4yfgt1sx4rsaqpdnetolggki11lozuhuautjvlnr7g95q2v2mbwly0jcg1zx9jhtkidk9yo7a6rb6ulk42wyffp2gcgzeewzm0t9qiz5jxlp',
                application: 'fkp59attswbt3zr7ueyqb3hsloil9prv29j6preuldmlnuh104rpl48myrco',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'uprgndcm3bu8ii3zgs09cmwuhswefngaegu2f',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'y3jrpgin905wx9gaaa50lz096fwl3l9px36p1sanml0jo419qg7',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '08bdcolsy5lzhxefiwp3',
                scenario: 'twcjt27i9j70uj36zmjo5p2gt6mfolwf6no0p168hkjsmrf88wus30r4ggsx',
                party: '5enhzuqatal0kb2pimt30uitew59enfo72u7zxyt9708657divq5zy1cgs5dwl5z553yr9k3vrqnxphuggtdkm1ck2i7ysboaed6bt1vuz2uiynr11g4z9hhsnk511qcngzhaoevstzy6hc2c3uerrn8zg3l8bmd',
                component: 'jpz23tp1i0lc33j2lv8o6j7qokdxosvsmqua2iukg54jil26q77paklpnl7cqq7anrxtujmmz9wfpvi9ec3lhm3hyzvi3u2ltya8q4yjqunip0dn4ul9o4yzr4cnenqupu6jteb1rkv9szdo5mpr1lkrfaxvn3sj',
                interfaceName: 'ujve4x8sixr5f4o45nbadv9xe349xugeat42gq5pdua0g7dhga8inpum4mqv6l8ypryp0aaug92nmx2y2af3atmq5tg7trqopkg87myra8tjy3f9gb6hueiijttjj7sh6hmenv4z99pz6hfuuyadqjqc0ijw167v',
                interfaceNamespace: '1d48c8g3ttrc6ta7y3zmu88o4pg87vlqf3zvzawf0sdytu1wl7d12sauib8ziuppkxzmvicxiedj6tbgds6n4fckcgc5x3dwz3f8s33y0kzdap91k7qhcyvwv1tfokkjctw2fhqdakqblrh6bkdz70xh87lc6926',
                iflowName: 'bto730y9j467veya6fbpqfjcwfdr9e9cho9iiyde3weje3tkmgclk6xpw6ekn0fgcjy29bzqnmgezucx49faqr7lscpp5418ed03o45fx0m9hxnhliksz723u19ka9s74d910e7w2t3akofkgtq8n6biyyzlgl1z',
                responsibleUserAccount: '4127w1mma8vosrd7gd1s',
                lastChangeUserAccount: '6m9jszi9okzobrz4aeag',
                lastChangedAt: '2020-07-24 03:53:46',
                folderPath: 'nileo847znrxvdsdjx7tqvqkdlrnf2wpu4s4lnvexx1blv1x9eymzvbipc0cni0ecj3z1igyqioomnb1brkzmqolg0mv95d5usd2egra2vh8qmgz0qq6oh5vh237f4tw4i6tigyi6176o4ph1esmpxak4zbtevle3np6gcxzpd3jaefct89hp3l4fcvelgyx6dgchjvjwvqnsemugfr9dk5dqycoeddgtbwrlor76e2q8ahzp61fdncbz1f5ntu',
                description: 'yb5fhsiao155v2vwhmck8vqyr5sozljxwc7rw533iktk23xpydnbfgre5yyos5ls5ex82o8aje6358dv9040yozmnz70ilioumm9hebx24yz04a5z9xqt4vtjlj80bodv2cjaa19fw4k99tbyt1aiqeqyfch84klzyaxj41il8dmylnvobgfyl5nt8810nkf1jeox7kh5gr2bti64jlhemjn1sw7g247qib8j0eyv7jdqhhiw2cw3pu33i4gtr9',
                application: 'atjt6nhecw2ywbvgpbay6id302goooq8dwo8nj8b4bjvefvdo7u7cqq3r89u',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '7ku52xhx8ykf0yma7lib7144rg9j7wkopwbjraor02ln9mobr0',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'bby7gjoue63yiv5w9kw0n',
                scenario: '5yaxqpunhodwcj54ecbuo1kn4y4jwqbr1tz6juvh6o1ikxbqwratbavu8rfg',
                party: 'u7pudxsa9bzyfkati522c5mgtsd6sjq4ftla3t3i8kxxm2fdw3bu16dqzvonn0ammqdx45hs2gm2c2eeo6rxaet8qz4rkq11gr67gw12om4syfutrgtsy5cb6ons8aeexaxrnsiux4ff308gf69gowgbtuqweruj',
                component: 'tkf8rjoj0mf0cw8gg2xp8gy5a09klobq4tizd4oof9gi9soi3tjmeu2lz80l1h3vfcpc77b99h505cqccaa702mau1srkl7f5wv6shojzf2fn2po46g9qj3ahow65elyisw74f4wueq0bxe61ayrg49c7sey11fs',
                interfaceName: 'v3d7vow244gwgt8fos8lyxb5wk6lvlnr8z2vdl51evlxr61zko0715openlkfi3ivufts1n9vffurqvadnq1ppu1svxckqlmx9b660f24lpp2r9rg3qn7fdztodj0x03roh7tf81lucwfesup17h2ftq8ch8n061',
                interfaceNamespace: 'jliraetr3qf2a7mu1bu1mc1tg14ou0nqr4vba4toijr5qqhurtsry7xt9h5muy5hax5vmrko2163ykrmwdge90nix5ungrvkoeieme8ytzkzxygppxqatt4znaevsp2lnozdb0ds6ij0zu3e6a43uhx32wyle1kf',
                iflowName: 'fu76q8y3txu8c0en16g7dgtnkzvzltv3qz8xxa83mq9k3l61qlwhr9n2cp2byrywpp6sgv8lgruwifbm8t8s3utqplokk4l33nz7e514hpru5m0raalape28bg11fzjff1ap10xio0sso42a4yt8cohtazh3zkvj',
                responsibleUserAccount: 'gz40u69ou7oyzy6214m4',
                lastChangeUserAccount: 'e4pgwskkoad0xabj3omc',
                lastChangedAt: '2020-07-24 07:51:01',
                folderPath: 'guabfb5boy32978jcsqpzrcy8y7uyi6sbxfilvljcpwy089joukqhdyjae2bjabcu9t9gnk6v0wixjvh9kk88zc37oqomozpjjvsma1egdnda8rip0oqj9d7adhen9h7g6rtgwkkbjcaigwwcmkotvproehbrgn6ytcokanr873x6ou9wvzn5aarso2it4xu4jmy1s5rps77kb4cyw27byh1i4z7ge5ktrjlziym3t1o5xrvm7ev82b8pgmtrz7',
                description: 'uw6f015hhwaxw2rwdefgwm23lgbks5vdgh69en9lcg5joyslp1ct3qsfk0lo27rv4re3sjl3rnwx4inuo84pk9fzx01bmljwp3sy6bqq3klc8vxlauwfu07mb5a4hbuyofnx9vwmweqiabp2srvd3cnto5hkfufq0wlqoqwafkzu7rci8u2m7ue6l38w5l4ujs147bnmfhsf29waugfrj10f4f18q32i4379cvrqds74nvhsufp7ua3xu9tyme2',
                application: 'xwzohy1b6br7rmqgtq26q8fhn0dp4sbm42mujwagln1r72r1bf9hqcmctb6k',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '32jqsg6hbql0td3k45co9e7sl6ew34l3qtisqrhfahj6ax4dst',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'ph27cc161rn2xjka7zgu',
                scenario: 'cshkrcs0f4iu01tpi2h2uqxux2uykwce7fhq4lmduz5msfrhn3qxq5hj3eskd',
                party: 'i2xyy4z3uc6msu3igyrftf9aocw6e4d551i53pbfb20zgztwg024a9oguvsnxswy003ge4z8xitdschtkks1yvsi9cm92zu5232jwg0o31ogzc8g1wh54tnjc48ler40sv34zv5uqbqrlxlbrefxwdx3lkf89ogj',
                component: 's11eoqxnco2cf2k9dz9h6nw50l8xm4ccgw06m067sk2syyo5687sw77rbctpn45d997v3ob0yfycrfu4buvxom9cqtv8q8us7ogisrvm7sg8nh3klh4ox8vipdn8b6iv4z69ly3sl7r3szu9crinqkz9o78ash6c',
                interfaceName: 'nmuiqdvyfrcturz0jcm0yf4lzif1ss8wx5sjtfthx33pu68ym1uoknufdhik7uj40o0d20twzevn702d7dhd59pu1kxuvhymyhhrjudp3vpqwn5fdnbc2hjrgws4ytewvs2yw8w408a2kjl138y76ggreywmaru9',
                interfaceNamespace: 'ef1p24gvq4nawsf2ldkvp56zcotp6rhl9w3jfzr21k99w8z2kz4w1mjt0m0pna0r7xlrgkh0adj3jxo2yf0huduoot1g1x1ltegj29j2sib6l9th0vapxfs5fhwo3jihcppzea3k177lefddn1j05h15ju3oyqud',
                iflowName: 'q2vdr1t087dqmr5pqskv6mzcew0nir0togdh5e5pjt7w1l4kmqn4ydmz9z6ognlin4979n781zt3eurwn2p0pw9wzs3nmo87mrkye4je3mxpak8m31p7gcfw85cl5i34hh9y51n2x2u73ibhuy5giknvqas43hbq',
                responsibleUserAccount: 'tw7mziyqwi86yoz25obr',
                lastChangeUserAccount: '1vq94jlejkya0lyuqumn',
                lastChangedAt: '2020-07-23 18:57:09',
                folderPath: 'ukvk69h2mggul92gkx3bcgvuzx9sddk8b8imfglolvp5yvzulq0bl3aq6s9p6hrvbwgc2jw8cr1noi8p6sua3nuvr7y547eex8h4p28g11t6boz02lng8q9yi30yoxfd2p3kn79o8z1fkp66qrdnohuvz9p66hmygvo2k0y0uuxkzqfb4iftpxhca6bppqu6mu0470btg89hexm7b6tvuv2jzahchfi1tnbyay0i05qglevlc10ip7g3bijmozc',
                description: 'citcda9vyc3iy8scuq4ir6h84h84tljt6tj14btu2ywyas91protnu18aaw3qey118y6m2xf12oa22gv3dj5p376fkqr3euhhlr23zdzmldhbg062ifamlj4qirxuutjn0a4nmr3gwp4p78rvu3o9ygaymct1u2lgg8kahf9nrkl8de5zlqnzhd8wky68y4kw3qhv0mlq5xqnec99x9nj4l3borf0vn52nzf3b76841cnt0mei010lxie890cr4',
                application: '92ef4f48xu1hzsuojutmn003tbmtsvfhpu8uave8a9leh4ag5jhzkrij160r',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'dh2z42i8ft3qdymioawggmzziruo29zmzdpfmk6r7xl368ba02',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '1au8uv07c1izbdp07lqa',
                scenario: 'hx1t82g0yo7fy0arsbxlhgaqf0825uoa5p41f50muhg5kviihzv7wm8ziit6',
                party: '900brch4ssrl97nomx1uxkukgagsuvk86lj9vlxy3kywws4vc722f18qzmtqqqhckaef30kkvuynyltp6lhoo5k5iviwmo4fb1mjt33txp8xwm96k20fhkm3qt3tc5tgai51psudjqrxwl6pnjlzniitv1bjcq31x',
                component: 'fejd0a9gm3mqp922zx85g7igoilq5i0h9dkri11bp0n2d85gsy8sgme5l3omke4yy42hmn04sval5adgpfjze479n89mhcbwogm6g864l1wsmk3bv7mbs6blchyza3otuj2rrb046kez0tsfnpmu5i1ip1rparj3',
                interfaceName: 'gqm4snpeizeijm601rfbaqopteepoq6tw9cr52s4eiw2goyo87icudmjlnya3oik7kfn282wc2tnddl2yysiqbbz0al5ohf8o9o4h1gw5m6pgcurlwovzi009reoq98834mhq5q1kmhixrkgme0nj9kh38l1pit9',
                interfaceNamespace: 'zjik5ynomeq1gopuzrhersm1kl86wsa33je6qfdevfckbsl4zo3w5egjbsfogbt93scfqkbddy8b2popu20yk9qvg4l7ahqjlk0b9p1cjdtnabfgnrs0b4c32i42nnpda0fmib0uax507psmsihk59a4i5437tqc',
                iflowName: '6dz9d62e1xlrxcpmua44qr4io04d8czf5x5m76h4k611dx3cgcl8si1llce4u5z9mwhpjalhbh43y9huvol6fg1d8nu88oqyaispaudw4khyjwa84l57z18k2zppffs4vsr5r2cxba8rl9djon57q2htkgdbzq4y',
                responsibleUserAccount: '39wto79rc1q6rdjzbi7n',
                lastChangeUserAccount: '6ox7fbgov3nw108inyrz',
                lastChangedAt: '2020-07-23 22:34:25',
                folderPath: 'iy0kyhqhososbvi8fhzodyeu0a80kh978df3b09rzs4cwmv4zbx03gn7nlpwx5dwc32hyk9mzrvky6f8a72y84c24uengkz6j1mvbi5uz00axh3q29g9z3tul671is7vve7qetl1cq09ufefdpmu6w1zhogss7o9v8c0a2drxqutyba912hvixzeqmzgolg72d0eh2rqegexdypzqyvadvkdk7vsq3f8iicmwmqrg3setecfivu8ulcuptj9gqr',
                description: '0ghiidudczuk8mgcl8ajhibvkh2pykvos9ygslkptk6qneqg21fq4oh4j1b55ea5xybiu88nua7fx7jyk5siutuicjpbhurj59150gtq4gbxopkqvrkutjzge69lblj5dgka9f4c95knvmbmwgxgqqr6v2mktcfb6upwpz1xxjkb2uk5g0svabv3dyoujcibpz1hp97mcvkgzstho8vn3zqpevaqfvt0dzhdrpgzpt5a6s7pobg3kbm0ij7mq6w',
                application: 'hv8r5fb5hlnkjydhw368o08uqvdykrk5cth31vjbsyyrw6hthhgv1mh1x3hu',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'cv9gjl9ql263y4xhu5y0b4o1kk77yv5pit5cx6vb0fdg50cb0j',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'ah9n26mdwtvq3wde3av9',
                scenario: 'scdkzj4rbs496dyjftuz6qk17nowdtcwhh625b052twpsjyarwonow3ff2de',
                party: 'pygd8ntd8afgdstx8p40mmh5p8km5alcplaqquosywhby2osy0k9zzrj2wh0xc9fxdgjzjsx7pn14b6ve7vs9uexjnwatjr8z9acftq12sll2hosa7fmipazu25a4k20opmwph82k681n3i2cygyksrrozv0jyvc',
                component: 'i5oju5026lekwjf6ns77r0325d5nwvxzdtgn4blebm4il0isjoepxrc9kz9xlazehzc4uxnk4fgigcog87bji3pbgaqghblwmhuuozdhm3e0shgkeda8fhficzg74mj79at734knnywscxdx7y139nj4tul88tzuf',
                interfaceName: 'sc9ppwq4l8w33bvj2kdbdt7hf47j53wnkvjgj2vco55hau0gs2nx2ff11nd35qr6iolukgj4p1t1yg4ja9wqxjw3z8zjq0smtp5xxbv9azr9kivrkshfovtih4zvlv16gajf3twjacdrqp8dyhhwolvbx4xpxk08',
                interfaceNamespace: '4v4nlnzpze0r1f1o21lli910kkc7m2cozprjwd8huc3k6ov59rghg3h855f0rmg8jzfcpuevuag436ypv7ro2t9umeqs9jp1iybhfwjgfm9i7030yy8o1eqdms9c8zpv465l8rgtj7dzbzeuba41su6otckylsf9',
                iflowName: '6tijkou9pycrv7wv7xvner29jn1m6qgrs9hencealytvkom3d6eyvqzofrlqidov93sphu9vf2opykii54xexqun5oyi5nj1brkujvtts71k5oic6an1pi2e3nas40204nfwc6q5lqybhlrs7j9l3yxz6fcmu8mb',
                responsibleUserAccount: '5fcmh5o2v79zbxmrb2v4',
                lastChangeUserAccount: '6vl29gfhpy8vcddl3n9s',
                lastChangedAt: '2020-07-24 10:26:53',
                folderPath: 'dc2080no0wgfdkrhdmga83gm5mlu6hdaiqibg3f61uye2qfdhsdpuh9jox29o85vroo4xlib0ufl0i0b7nmc67k5i2tfaxc7a1wmzhp7ygubhifdwjiuth0mkr7tcx86pep16du5a6hmcm2621rus9bjj1whx20cchdf4yuhd7a0kk4cgteycmwd7q6bjw4llpdsz4qr7xaoph38t55niw99cbhz57lyg97jdzr3raof7s5z4cmn3hhd1e2dg64',
                description: 'n4euzv0mr7b3ltqwzv72hjlxf5am1067cdpkbulz33bowcdoag8baay4mkr4uq8u8sqjsj9fzxuxv6totl0q62y0f8n14sgzqdvi5f635uvxek225fvag4y81pisbeodu8lrlijw0ytsd0gjnzd912i94yq5ocucqwmi7au4lqbxl8hqcellu9kgdruduzc4ogvh27o7fwdfiddwtylzrrybvk09055mzsa1535jqvccw1p2u3ynr3ulw0byygj',
                application: 'mg1ay4nzztccloi1zdrwpa8v7l6atqx5kr6pph5lhgo6y77z82mw8zct5ewl',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'f22gmdwhvcjatbxzp4qxphzucelzk7dzpxup6k79ubn5ejbfdu',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'h3lx2u4x3nmlhoq091j6',
                scenario: 'hwgkbtwxqf4bqsex0oxphvk3gtxioa1b2gfmgnedygstqjuc4pbtl9p7wd6s',
                party: 'o8wp8q6363zhbib5ueer61h8owpusqt1ajf0nj6e32nja7xcuf91d6ookwsglrx8c1qkl2yz3yqr8qdxj91r1rm8u1upa39qgpva78nrjyyclg7i0u481me8vmtllplc5txi6g9o48harsvtfxy59zr8vhz27sim',
                component: 'lf6jti9bcqzbdanbjvdrcg5ttm5hz0mcbg10ok7t160kosws8i99r7y8316g0gaep43xbv85xivcbfqhzfmijfmpabigl51r93x42xanj3ach8ma17ihnmp9j50gso4a39m6bi5z8znijamw5p6z7959nouelpt5',
                interfaceName: 'epk2vxwoxamwfj7cxvskav0a8p8rugwy0qrhnik9gugs4kfz5jz6atdxq58464ucbft0ikfvvtprhvlto0v7my9luv2qs9pge8on7rzcgd0r9flpth1uhan0do27l4iz3zuo6gw2u6eh88bzgufx5wzz5yb4zxlwv',
                interfaceNamespace: '8972bq6g1xbapqw5hifqs1vrizykkevcmvnq9c3lcngjleoyljopdkzu2n6bp1xwevpjsn303lqlwkn8jwkka772mhyp98z9xccksmcrij0bakege49qf76i842c6r05t7p2codaue9sctmonoy8aeq5tvnagd18',
                iflowName: 'bps0p0o1qg3aae8t2roq4kob81vf7cwnq1b5emsn6p4rczspm3zgbynx055mktl85uyjv6rq37bnn82gp75tjxdd5gwxapfe7f0xj546ejtc5yuf7csk7bnx6ig2y74jvqbx6b8le3bxgk03p7zbjftd2zto6ess',
                responsibleUserAccount: 'zf2w5rkhp6jlp0dtc3kp',
                lastChangeUserAccount: 'yuj2ncndcoziier1jl1n',
                lastChangedAt: '2020-07-24 07:31:29',
                folderPath: '1nwspxhjyt0jzb5tk1bfvlwib2gi76qj144b0jey7wxjjsan6xg1yjoakp8cyc16s8zj4y3bgv6ozuony5gbe3ft0r2dpvllq5a3t23d2gqj972pt6qoce2wx4qjnoz2jjr4q6ele6jsx6myntq29v19fbth23w1gh1kr76am93j2wjlgtj4w9kvjv3yzz9j77q9b8ve736akfs1l1ya3dz4bxwckasu0cx52la6cvdjp1wl2dpcpuu05iibkgd',
                description: '5m3pxmwvn77get7jb6afb0ctxic7cyd7p5c3a3icc60xr2mbedyoktv3mxkazwwx1mv4wkinj4m926ksmcsrvqyqto2489shy5hebf1av9nq7xrsmze8jqulbz7kwkmb2bhnpekbqtqc0o71mwr3vv71sp3vdscohfdvst6q81bz1nrkxh7uzw8f2aw95s5n07xl2v3506xzuuguwah42byqkt2j8sbdct3zdva4uf7ewdri0zff1ahhplm2w18',
                application: 'qud11vb3rk4b46cma27ecouz0fmut0x0o8y5fifwkhn8ypa9njusagynwj7c',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '4toa9zdxqf4jbv003q0gpchs73j6yneetdbxinw2zyqgor85c9',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'mbxpn12h564j7zg5qvq6',
                scenario: '3ysvxanr25tzgmoh4gemycy6mhgvx3z7rkcbtjirvb2efwjjj82zbkfd19gw',
                party: '9ptnjvv4lvc4e9c8wjc6y7m2bjrmgsxbd6y02d6h8zz6e0qp6xnculay1fcqohxvn2yoc48yyq37x0cxydl7cepypq4myvubkqp2ls4ajc8pz05cnqy2oypucpqiboanqz3zagh63kab5uhygahq45pn1rbvodhd',
                component: '14zsga9loql29wgxzju7l72gamd1aphzwh29uv3mouits9kdxpxpuaqoy2jucnhlmqni1mqrqshwr2n0e1w8pwmrdm687sw1s1f4v8ib2epbzn2x7imoc0u9d3rho21s0j593tbqzm5z8qko9mmuot1toswjnovt',
                interfaceName: 'nmyqt3f0wcoto3rknkvpevc5127slmemtnvnjrhcxkhiwhgn5c6svy0lb7750gy7om79i3e4e0eo3wqspi06tcdqnulhbxb1lt5c3kju60rm17e72u4qsbn1kwka9oyinio3ondjfn3hwysrfdm1e5zgxhnctl2p',
                interfaceNamespace: 'elvseixctd9lw97wo41ayyt1d4h8bfaixzhcoehgv2t1oaa4w3tjlrmgrw1r1cyf4jmwi7f8cvbjv6kaa85ddpyrx72j5a44vjvjbmkdu6vvp54wws6jyuboqb7djkv9l5hit5cptp9j070dja66i3dg8u52agsvx',
                iflowName: 'lluc1uhz96dp86jyc6r05b8v5nhg44baj7i0p9ayp612xztfhns6bibuydbuch616vegvwh778ze6jgenp1ymjfqiv3rlqfzbhnkdukz7r5z323snh1w457uszu8fdo9z2f7rc2dgglvo5b9egrwwutvy6wmlymx',
                responsibleUserAccount: '1t7457y9tck3f0744zt9',
                lastChangeUserAccount: '7s095fp4ysnxfrgq6lrt',
                lastChangedAt: '2020-07-24 04:15:38',
                folderPath: 'h64eu65t8cbailmjx8awdaj9x6ma866b1gk3ya4q3zgecge78ezr3n9l0qy9fu29jhcseb6dcmchnbx20ln16wles2tw94olsiu0dqb54gd0ijgcmphvp3kvlap9quw8ki7p3djgoj8396lrkic5lhs0sgj8k0cwp25tsxlcgnun30glb8nn4msf1e2sq2nqce9jrr9f5oze6xy9g464zjleoklwg4clcufr7qx06xdopjtfbr5i7quvh20g105',
                description: 'sxwt264yd89q5qe8crodavo0m6a3fb3860lyx4odverue7nm6y26g9rqe0l0rim2nlqg7jr5s1r2apchungmb37dt85a60k3z4k8vdekxn048qxioowiml0rkd7hde539wxi8i7778b8m9wxnsgk1mj99rgdqxq5chcosa618e8024njxg2qvbbjx5u2e3sjm6rhnof3pngbm8lt2juh2mpfv4xg8s95ec98nsj73m487r7sjw4zqjxhmsvys2s',
                application: 'rg8vdle0uskh7yzacc2oy4ksrgd4lhebbybomuxqu1s18itg3mzkmlteof5i',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'nerl7kdd8ea8chwus8a5pjdw4blxe8r7ss7a3aihhtclix1qcm',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'qmrw2wzfsl533j3iyytm',
                scenario: '741064o8kaqaeh3fj5xaxsgi66mzx5ntm9p7i2t11cgvvkrg102pv3vzfb4k',
                party: '6pku05e2w7hydug0hd667cn5j19s5oqt02z19vgema4lumthvf80tc1odrz8pr08hlwxy7yw8y716zeukktg1smqogo06i79edfyv7e17r1fa135x7j1ufgrlbkt0kfz8eo5xpwe3p4sazcaj9u5s22hkel2zgl1',
                component: 'o2yd2ccw1h9kmmoa3uat9yz40kynvvk5ufdk0s3nkjzpwhizbf2ceiynx3415srf1z8q7q0wartyhsq2esha334g43k18j3hq3ml72wo2hmhlam8dcywm98obm3kmtsk1pevcybycy8a0k3scggap65f1p72r0aj',
                interfaceName: 'rxttrljwdti8e3bud9hsg39u8hvu1p83orhs88slrnjkagxr8pech8enrr72g0ejp9u1zjthldlslrxi166e9bqeilkbawx1n0xxgdy8b7p7tx3ya51i4ejms255thogofpe2c9i5vk76n9muxa1e3r35zdqaf2r',
                interfaceNamespace: 'xdizbpojhfx5qzbk0o311dir0himohtpy7akfag8gm0ha4aq1y0z17lgns9boyvbmm3zrtos9jnxsih9m7780elibdrmpwt0g81n27pkf5x9uobb0oznqfjyaekpsy8aftuiol252r5bb3hc6nfzqc0ufpx0hcms',
                iflowName: 'i9vl0t4nsoc31ifw8pamjztieepkscw6m949euo27p5yvqz55bxm08r8g1xwb4zed5yjmq3wboxjmj4tytnx02xiejukgldqohthydkisragm237acsf0avb33aybdxzvab4loexprafr2zbzgpjf3gcig4ws04eg',
                responsibleUserAccount: 'eocselwvtuucelgpsqzk',
                lastChangeUserAccount: 'kmzt9xrweiorh1wde1cw',
                lastChangedAt: '2020-07-24 04:27:11',
                folderPath: 'gbag3xlfeaioetghyg7qvtljy8pl159gf0ck8xu4ilc44szfjyg1y60vblf14hsqqfrviiru2a8ts8k7vieji66muvgf10fy4x1441tx8duhxcojoltemts7imz0ryx5opppwkkrllzq4c7450wrw8qhs3fg3iviyacwxq5x471kqnzrv4hypx8enfgir7qp4suaz6c2rznjs1yl4dvd620s35we6rvqq5iigdk6ytj2m0z5g3mtkyi5qrenu88',
                description: 'cr3qrwx04c1lbds1l8xf19rmimtaz2cbqy1pulsc9ukjkc4ighb1hrxry53ieni1cwmbcyqarvzrqt9yqokd62lghoieoypgrat00h3cnl8roxbaesn23txlpmi99j81kn7xfoa4tnbdtpr7xx2694va0b10hl45meebjz3s7wzyjhpuqe8w0xe8i62d7coong10fijvocep3but65yamfw8vkwin3ybnvsy3367h31suuc8hfs8wylkq9c4q40',
                application: 'xf3660l7vblz5dd5wd5e0gwwqrtvwx4u82zxb24dfquz0ws763a1k0jqhdi8',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'zdyid1tbhz6izqgspavnbhzwgs74iauzmii24f2ubwzi30gnj6',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'jljqgfub7oq7os00pv3b',
                scenario: 'w2i0e126k234f1g02itl122gtff1v8kw6k1tak83bzhtcyu8czdkyiga59w3',
                party: 'qxsycag7mfqlvn35th92ifr48l264xgsiqd31rddoskta02tili39px7dqg5ooqhn5evpu92r7fla3d8ggyfhwb2x1gizud3ltf06u84j4i7dnqiku89ex1szoxazj54rcvptnf0l80soj4che9ghd9o9fvwwy0y',
                component: '0jjyaxf4ovlr9r3vpiayzworgryb7pt4gbxg16hcc7fatu7oyvkhyle8342ldupcpb50ql1oblrzrs9o2k3sjya33lthevqzyfk6oyo933exojv1ai06igfp6k7xdcy19ybksifdr0cczjll8ycn95185ey4we3s',
                interfaceName: '2pnrfzx6k0ya2hw3bcvps8wumo5ursbegfm5my3ewonq2egy0jdr5yr11q1otsn0m1mlu23b7t05ep0p7kdy7jea3n0qqt50c5k3ski9bt7b499nni9gpwaivc9xkl0pc0g53hzpswdvhefnc7t4wjvhkjwmgb8f',
                interfaceNamespace: 'nms0eoik6eou2sfhn1zxrtwyh0xsk3r6gz8i2vtqrdg5a65cpq3zl96x9qtt2f57jl2uy4bozpxbhkh04kal41jradit13cmg6kqdg0kj0qqlwwfp13lpmfzn7j0tw03g1nzrb20p1gltonm2um3o2rk0yeku2k5',
                iflowName: 'bk2uqfqiuwf5czzi7cfhenycjyc507ib57bglvzlrd01yxdy389qr1eka23k23t853h8lh4oh3l30r0z8samfjzjd8y959brsqkrbtdrot71lp64bfmr2xunp5ao205ijxiu63ln41rx4tcut6d0c4kpd4ca5xs3',
                responsibleUserAccount: 'lsk4fp6513amqut7qthnv',
                lastChangeUserAccount: 'yv6aikzd8sufcs7abiqb',
                lastChangedAt: '2020-07-24 07:50:02',
                folderPath: 'z4q5znhi9ls2klz3zvulqxh05sakoh6ajrcffiahgaxg4wa9l2ynuit0cpu2tw4bpl8kakdiat4uuyie5s4i8gvlmc2x4x0k9ms9tjfb922trl5xg1c3np38pz3qztic7cfro4mem64zotazvmupahxgzhy55cu1ni01akzabbbfab3m4bjiggnw1zg9f9jsouciqsmyhqzh5lyco9f5hrgq18n0qsw3pqmg1hfk3e6mjhe127sfw7f7cma3ugs',
                description: 'mv9kvdlr9jgxla9m5rxaqfu6jc0kclqh45z0ujkx3ltomgfmu0jifjiwyxa5dj1i3a13mafym7s0jn71i9j6gny4ufqb0hsvzdstfjff0czban28kzn555a9xcgizrm1is5i97y5ljko8w2pgrvplzuk3xw6i060dz24ehndyfztuw65gulo39zi5uhy9j5f9x72hd1jaaguq8gg9s2a3rzzmnj48ghyssn556pjy4djb46d84wy4humc9xnc7s',
                application: 'v7frjoc0vksajm3rac0ap7oawfr53gvo43i21g0jitgwvailm53qgwu0a6z8',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'qrpsogyrur8c8gffjruth3zul3ygyzis5r1iijy9kk95jheokg',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'j9ycof8xs0dev5toq9k7',
                scenario: 'y6d9xnlbtyljbqa0wihhqqi0n60vd5shmp9y5cv4yrfuwpzbq5g942jgn0q7',
                party: 'vn19bnx0kx6l0kjs7l86fxmuq4rxygt2xlpzu6dmmwd1u73e1ya8wa2obc9yorrbtuf63yakrkgquoxzml6es8si0rsucjhb7ypdop8xcbz6m4v136ipqqxlim8jkx81n30pxhnqyuoytsr3991h3y4dw1c4tflt',
                component: 'imnjanevkk32q7hnqjq6dl0z4ew5pt201reyuzt495f7mnaw95a20fks9j9zsqry94x14doe04f9d9kpzx6k4a2k0onifusbb8q6nm0uzpo2om2sprsc7zc7cjvfbxnnifhjh3volwbe2xvh79kgmupemj8n5foa',
                interfaceName: 'dv16ut4beobp2c0it1b4rwwqaz98fs0aewzo9e5w0b1tl24au4adb4om25ge4x4p9gj89sazv1rhjvxnk1l4oty7ke334mm2t204xivmj516g0wws2kxg39lz0j81uaptwyu29vhxmxav5arc3ckusoc7ufsqg6n',
                interfaceNamespace: 'gzjt47k0h80ipndvey5op245mj8eut57wtysxqakeljldcrz3rpi97yo2la2ujadjt2g9q0wkfjm0fp59lwnxsdll7sos5wb967fjmpuw7zmoccbr6597wmjw5oj9rprc02iupp3lvn6grr7yhdbnxve3v3dw2qn',
                iflowName: 'cus3aw1h1lf1uv59cfhs6vvvbjrzz5w0hp3qkh3ro51zq9gzrdoga6uu9udjdb8a0n9kvda52827ix4n8d3r8bx5lw8pigmh6bcqckti2vsse6ksqjqcpedgcpucawnirof9zg9po7dc11xai39cxecemusfchww',
                responsibleUserAccount: 'u9wz01dg5tljxsrgv1zh',
                lastChangeUserAccount: 'lic934ujfj0f9bfeiehy4',
                lastChangedAt: '2020-07-23 18:52:43',
                folderPath: 'y90hglfyh9v08wkf5bcf4rccanm5ehm3lut0lprbf5enorrbfpr08inx0ox87ijaq619jh4vjnucqzjmr9skrwjoenvt31voksavxg90hpawa6ejtd6nexbdc5lzhs2uxsrr9g36u7opo283iqevcnyztcduq3f7iq35je41w5hziuimm5upeyqn6kyneln3jvv1744kac9zosx78xm05mt0ggaad2khq6p8x8ir0akjxg853ka93qph0tc4v8u',
                description: 'yv7mnyktseweeqa8hceh9f1sf2k3r295vkzcof8d6alic1ub8pufqfkl96ckj4cq85s91alxuup3v8t1rieg0ls8r061ffpi015n68njw8d97m49u45hqfzohftevl72k4i3jaixv28ypweja7q8geikztam7sbq0at0zfrxxqxfy4w18zarmamla1nc748oxchw7nve54fxcic54pk0qv15tkn095j9darjpvrhvea5cnhx4z7ls555z0yasgw',
                application: 'kaigdlwhbggrjtsqhzl4nur5xf2wbj5j8l2j56srgrvejb0li1kdww2xsvmg',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'cgacmek8gqexxz9016syfxb16f9nce7ujtp5skcf79rx0gr6of',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'ijakp1j13fliuvjd214l',
                scenario: 'ily3e5flz5nxw979abuzb4b3liqk143zk5mjxi34uq4uaxn0rx05aqodm5v1',
                party: 'd041am7rclzw6djy03ip1funxj74wi7mfmff543ucg34lstqgkq173b8jec993hqs0disipydxw5x4najmnbzp4yhka26lgh1k8yr5b3ybsmyyza8aizukm5o6rmrd5lugh7t2qxpc586c6xco3lograczljxjyg',
                component: '3jdlj92djmd2ydcxtiidjv14etzayo8s0urwymzgsg9vk12enxko5vtepcgska9dj2lzdtlvrd3y6x3pl63gpq0auomd3gr26e1x0vdf1te10ennqeawzwitns0xf343ht57g6km4whablstwrzz2dmj83mfuosa',
                interfaceName: '2zkq96xk3htwkz0sthctoo5vwoh218p54f5ta598yiqukpw6320aj1ncebaufzgkyeg9v67qmnf34hgbrjd5j33lkpd2sdgzcjo6l860m2cwh9gntae0e9sv0nd0y9370bkiz858wo4a82n8qe51166o2o2e9c2s',
                interfaceNamespace: 'uhvflpcyerioo5t5znmrsrsbyyn5nxvqryg2npnirqqft0rvcvbviedwcdpol45nsr18hxiradksslz0uqbwqm2uz0bejqqf93psccmaa6b70yjesqk8vlvilme7bswwz5n1uw29w4zzd0qejf67uh0rmpvbx5b3',
                iflowName: 'lsu67lfxu2jv0p959bzv3o6com6av5ossdgeuf3vce1pzq8v732pjvtr1cjg2rm1sh4200vqybqess3mq6ntz5tbawvo8g8vndpxsu53piju0bwiwnozst8xwrsviexvefg7b2q0ipea6xydbmnu0b5czevirt0k',
                responsibleUserAccount: 'q4zhf8dgyvr3axuprfq3',
                lastChangeUserAccount: 'vhjdz8mgsj3x90kcttzs',
                lastChangedAt: '2020-07-24 06:36:18',
                folderPath: '30ywdchmovbj9l5f7eo5yqdca8gepr67nmm6ps60mmrwmsxfc2sjwnr22kgbabxw6y84rt2pnk0d14ws04eckgh3trxyz09c3yvkbzpyg68kcexl22bab93ehakpoqne5lx6gomrljwsuictacanhv60n1m3jvetd8ivcapi7x5h9rbh25pvbra0kb5dhsgv1nkv7o0b4brvotoe0id62fcj2q534k68emchoitprjxo130x7bifxtksarqxyzvw',
                description: 'uesg97up1jk4ixpne1gl5defkeas4v2dledff8q8l8gua7s8xfqtzbwjd37inthxl9vfr1x83lroxs2gqtboj8stcow1mxhi2ejncvdh8gppnifflkqopp6owrj4x9p4d5o8cny10rmu01zu2plyzl8e3koemixshlq8zp4a3rxojesd505q797c57d78smefnfri24ey31wd1ia9afadik1wgviz6g8gv2n65piro48nu4jv71c4oulvcsogn6',
                application: 'zmc21k8ffj9kixofchlbw4rmua7vyql7d1a0vjs4ni7j075chnypefcqlkmv',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'igankkwx0etnnn6gr74cx0guleyet1d14437mkff9cbb09rnq0',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: '4od88imsq5dwvfq23q9u',
                scenario: 'bx61f84wuuhcg7zw5jrhp38gr4a3snytsmwnv1gcwsfvo7nlk7xeidfbo6v4',
                party: 'l058rdxikd9dcweg1ahj2ww0jp974iclny5g8iudomm8bcfhzb7pliyyusfwouka7eiijxlumgys5v4hu7zgx0vl5on8xfwo1feuet7o3rp2jr9xyhjudy5m1ufttexr90bbzskh63nzwoncia2wc4no7spk2ge9',
                component: 'pex3y749yl2qiir5sqtfszgy4qu0pwuzt6ze25lnjdj1dxdspwdeaao1qsal8j0ch573zkok1n8n0q6p94fsdswnty9izvuv1i4yddtbxu0h20l5om5ch6om3a0m5shu62upw19ogyv9lpilnzj9zgm4dbjjha63',
                interfaceName: '4xrlzfkdq4qvk1kmfvgi8tjiicoypnn45w5fkuqnr3zri0eioee110r75pk9gwmafbvd4w4bvs9d4535it03vntypvei4asbjsuqop9lcfefjtvi9fcgpe9vcaqurxlydi2qoxrt3k66xpmyr90yxragvib2ii12',
                interfaceNamespace: 'ui559uw2qkm5iaycspy24iyja7lms4qe4n7mg0ut8f9lfwl3b8v34u5yplze6w23znzepm8o00h9uurexiscbn4oas16x6dtje284cgu6u36lq6l42ryoaxiht2cj6ypo89vj8dnmdscxk78z8zt04znk1iqls8o',
                iflowName: 'arzaj2g3h1i1w52dojqcbrjm3ytwiwilotfsiha17p4462e9yjesf2tsraqnr0j7jvg8sx7lryfw3u1wwh4v19u888guk1nq3r4ksxiplvbi40kvq29gk6yhjdr3efsym4urhu76v60vf26q8ofk1ija7ypsw5fc',
                responsibleUserAccount: 'sfh5biapqu85j6s5ibjx',
                lastChangeUserAccount: 'me0ff54wpjnwrk02ai13',
                lastChangedAt: '2020-07-23 19:23:04',
                folderPath: 'iln1lkv6a7rr4mbx9pj1y8ivg7332edv82eu3n1u6u5q3wkam8zdx6whohwbn5vdlaqujaj80iif0g1n3a3zjm72rdn0ykfpfmofl2950niujiptw49od6ly2uwdlefke430n08swk3i4ujwt9zf18wn9r0nbo67aafyc0db8z6ztj8rcbjwwpqhjdik61y7pt2yezux1u8fbw3zwmc5fpx3mwjolk7ey6ww1yyetup2h5ty2dk37ffg6v4i0r7',
                description: 'snd9x6eu8kt39a50gjyl3nk6zlsluncezw5h39pqylwmdvltrqww86403458x7bzc5551ggebj6egt9u8la982ts4ipqk41k0vpbha4cvyg1f8r1sy92yti9ol012dch4u2sczbqp00fg6gq2fhilrhbjrik0gy5vz4hzr5wjjxsvb02icpngmchjvsxiy8yz008x4jck0l7fjfjcxtn10l39j28imverg0pqd2zd11ko4vazfb424eitaom8455',
                application: 'daguv02zpwi7c7qt3xhaaece9iyj0zb9kxiok3dl4g839qsxz60s707i3uyy',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'pznszm0lni0mpsu08qhtrkq48ma68y6kf50lq0axeuwjv6toz9',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'u2x6i4jtvj4ighopdiac',
                scenario: 'hhltos4umv32i0fivensf69iz80rja4l88j2y9ns57bdyxkv903zm0g45uo8',
                party: '879kjipi9npfphi1wesxv4wi743w3ua1hy3uac16ynrmewka9jhuo5i4g5sjrlbcnlxgbwynuetgokwntlh8r3vdakelmtzi1ngrd8k19y9htv6t23xnypqpo3oj3raa63grzmkn9b0u5tlsu31obgml8h7m1yg3',
                component: 'wyd82w85l7qa54zlik47qcxbtw9kfz31cdb566lgdrmwq18whp3o3x69ccaczez3nfg7d8jp454howtwynkksmwb0qzhyom8ryvvptefboves1syq8m1pegk1kf3lsvxf4l6jmpfcn34cdzik8l0q0v0fj4jhhlf',
                interfaceName: 'jw2678oizvbtr4jh3nx6n5o1ozi5ulgbwng8x8go80dvnybbc59ce61bmh4qq05xnwhemlf5ep3ace0yq3eox43iwfsr4r2k1dhh81d79qdqrk8lf432sfcckw6hbd0pep9t9cqif5v2he38b27ajdu4j0ctdx2k',
                interfaceNamespace: '8qk4fzy075qzlmszyrw0brqrjtyyvd2bek309gy3ec3lonaiwk8anckquc31k6b7qpl5udiz84oiptn1s0kyesnmqotda427moctqoqdehukepkqwh6rcv5lueme81wkgtjmh5cf8hvu2mvn7zi3yn2ydxk482z0',
                iflowName: '890umsjv15gf5sepd3s9m9hhu3eqz60z04jxirj5bb3amarfs62qos7po2ne7gc87yyih30sawu95qoc4ld9lwwr4ffgwh7eujgg3vozidajj3ilx25kypz7utpxahfrli4awu5rgy78foqqey5ol83sr3kjk682',
                responsibleUserAccount: 'q9jvlybn3nnr1x88c4er',
                lastChangeUserAccount: 'hffmbng80rg7qceiriwg',
                lastChangedAt: '2020-07-24 08:11:01',
                folderPath: '1s1kxnqxagni8ufu1w5jfqjtlbhy96d53o2u1wahm5unhy722odxx9wwbizcxq9b8zfs778l504178sgq0ws8mecm7tfu87se7pb9vdrm9vsyft4weteudv9cwbmqg832ajbdigrr8dn6zoq6nz1eq4rzazt8bagsadrxlqrgypi1qc7ji5zr8j7dbq7sgmx3sdipo9fwghuil5a433xdltmfqczsxxdrqhg36bsshup71wqvlfbohc4a64h6gl',
                description: 'ah22la6a6gu5m99pw5e88svj038tlc2ccqrssp0btbc8ffqdijj85uv17cl33ap6b8m39n5pcvy00yjjpd9o1nhlgq14kcjxr9g0mo6hvwpui2chq5q9ri3so8o3ryjf6ku32knb89apkqajkxr96d7n6hpik1sp9yuqqj3oe8x4mmjvw91hapznbfsrd078nvf69uqyobrpcj4f08esop9e1n2zwc38r7pp4491xg1hswdnc0e0bd3yqhhsmpz',
                application: 'cfag32lhg9bsqcwbtfy6go8dgjrpm1sopehwlr47pxh02cryhizui61eb6p6v',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '5k2p90amnx36wtmdamqghtbvxv4tu75t7g0ufs3byptxzx6fyq',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'fltwb3n6a5p54z258wb9',
                scenario: 'ywldorqr82oypz8fh2arhdwucou9oat208nkaa4v5fr82utoy05e4311fqaz',
                party: 'phgcxqxuusnom7jtzp3uoc98u0ssuwwnfeqen8xse2ilujqqpo34ixi6ga1wjyf79pdxsghrcr3i7od41i1aniefz667zjllylhauazmk07j8wx8mg87e4yys5yfc2tqlljiw2zwisau8cprjrfn4y37h1c63k6e',
                component: 'auf4ovblk1stmr8ibwfyh1uvi6ioedjmxlpx1ukh4otley10bjdysmonl90kzcpfqnnuq0j7ttbjkrnbvr8pwnr7da6wi0s5jtzns7qobp6cdqehucnw49j1yg7csxn2n9umqcq8ce31ugtj7kqegrqi1vkpr3vx',
                interfaceName: 'atf1s75ixooaav55wgvl42inlnzd6ohag6jbwmbbgp5k3rgsq43w9s0tznkm3ktv4r8bdc6kvhtz6asy05y5slqtzg8x0ers6s2n7ynrmsv5k0mvyrt4n5qgjffi45194vo1xwdg8w3gginjyjtyp4nmdqd1h54f',
                interfaceNamespace: '38hcr4n5oonqlfl7s30uqcfrfgynrcahnwwyw0v9szl9px9emqyzbgpntjafcbqwleneb1mscm619xp0k042cjtkq4cdadt6ojuiurjpn6bsbwia36qd03ynq9vxommjn0lhi1s0alk7cw0n54gydgl3j1egu5jn',
                iflowName: 'ebrsu2w9er01ekzxi1bkd4903aj9x9dq9tcktczbcwdnen0pz0i0bc9km34sxcijyxe7sx1j51tygc2u6xkr63b07w8jgzlpfa0z5qh4bjg2kckjlj88u7du8ljrozn368zm66b1tlmhxfgp0c2b0ol5l7hfwu3p',
                responsibleUserAccount: 'c62sycrjx6ln34cyyxz1',
                lastChangeUserAccount: '2zvs2bpb2di9tj3fb2kp',
                lastChangedAt: '2020-07-23 20:45:36',
                folderPath: 'dpahzrbjjrt6axwyocutpdgwq987jb95jibwknhzu5x96fedefsv1aw3dbjoo6zagmdbwv2i74s8jvhp89v26jhi4t3d1ngs55lolfip5p1yo7dqxix7cmab3c3hol7b7wy310zj2ugjir9m0qrvxhsn39i5ev0irgeyh7ldl41veuhrh9cyxgq7vayc692egjm5xpwochestcq0ekjds32q8ka5007u4l09wbjb77is31gj7eac73uotlv4qi5',
                description: 's9rxubglzfn8muyd1ipia34jacgcnvxrfb1uohq0czvl2lrnebl9yadqe4a78xci60melct0jq5w3qinmezg35aypf30mp408rdbeutbdg9w79cuumxtcamtz2b7h6h4wl4bzs78ifjotred05f3ki8sw572ik82gdqaiyx6twg4n4hco884l0t0czivi197gsrryvs4a69q40888v78h78tqgo60gxlvm3mb191uw2r60xh9y3rev6owf0y2t8',
                application: '1suo5mdec4gozrzlfj2uftn3eszcdwu4ki5hkil2lg0b6d7oobnjzrajh7pw',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'qodkt2yqhebne57fjkwgy7zh4fmjtj4mzsz5u7ugaw2gvhdor7',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'z9j03w5xqyw8obqyhjqf',
                scenario: '5ara8d4obax8j3mj5obw8gwv1yb4ptf0i9cyb9k0pisxc10e4uv359rf49w4',
                party: '0d9xffjzysf690xzjvodfy8hkqb2t9c5jc2rkc5x74qn8lh19lxvzbpoihd57umlcw20sg5q0dac1wcwvmhxrnknq34228kw33n7o39wsxi0oi6vl23muv4bc0vj7ur9f6pf4tng9o2bpvckgd5k46ajconhboqv',
                component: 'zsvn27edipueeh81yxa2mb9964j2li7cwoscb6zs9de67jg4pjqku25ujbnhnsrunxgncn6oe1wht6836xevo9ivov6n9bunyhjfvyvqzekzdwbjtfbfo3eyrv7z0riz96ar5hhufs0pk2yd4mqi4whyr25pqbm7',
                interfaceName: 'h22gcdtjdbbq5grh97cgmcev8zdaixizumulilcnmb5fbeicf9fe4k3yfa7batbq55bfxuz1zz9q0991ao05j0ngrj3894t5g8ptn6cviio79j18phed5siazvgs4vhvv6hc2izzjhvlx6i8198sioep8ileqmla',
                interfaceNamespace: 'k0sjl2r5wct2h1k79arq2k3xlxgfb5qodc27zl8tpggyx16osbex1fw4h9vb52o9ypikicu2kz4f4s9jyu04ngd2ylgn0yvq0yumac1hmxptqf4s90zikgqiv0s7gsqz5scpt6y892y1lspet6kmwimta7fq8iz8',
                iflowName: '82wx000ccwj5r7s0tb84weer4d93yjotwpe8lc6mchi9ctsz4o68jnp8is08kvpg0q0zi3aogjnxqy1hmfqa6ynditm0vo31tx2bf7e27omw2ml702aag86zge9vh4y3e3jcc2n847ne6b8qg98skmelswbw16z1',
                responsibleUserAccount: '8e9431i3hf1q4xcdaj38',
                lastChangeUserAccount: 'mvlr2hc00qwiy4nop3sf',
                lastChangedAt: '2020-07-23 21:39:33',
                folderPath: 'dx8y999er7npzec7slhz6nz8dt2dxkzk0bvxr3va0xhynidqu045hqw0bza943x66ypmrgdcf3gas0euuzr326gaq5eq4xj9ptkzgle8d9ojuypazymnlqs56590pq8rzu7h9tnoyidhepk4n5u4ytr3n1ank4hvupk9rbevq3k8wxbt9iujlf6dp7y1vbcjvkig82dv3h33cfh2b3u9it0sczt0pvlxvfjc8b81vzihe0ybqttxlv13pcy66tt',
                description: 'ym3oe81jyptxiq601y5ig5d3pdxkyzpnkzysxevzdh8qjc4fg4lcjnvs0dod0iu4rhwj3itrkepkpntt2tml03p97qxmprpjgg5v8x8bpxgip5pii9p0xi8hcxn2lv20fcjeulh7b42svgzlze2l3wzeesq2163uogvny7ev6s5w9ao3vygyzsogzl66270mvdd67j87s8v76g7noc276td8gmsw60egc15l6ow5z9vcfmbf3rp9kxueyksas2d',
                application: 'izi4zd61dk5113w4ovz7wtk6kew7yl2ga93j73ktuprwi82uyqva3sqw37t2',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: '22phqqm9mpmh32iepq0xjqpx76ukv48z15ngvgylr9blqmx0zi',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'k0z0w9bx2add7l9sdkie',
                scenario: '45twraz65tn8a13bzd1sp3fzsv5fb3og79hvlmivgvrdbuzd5a2jkia4w0ki',
                party: 'p7nohxwyq6i9icqvrqtk3s48hipo464wwfzre3stq1ywwho773kxpzya7qkgb2gf8schu1o3vfshan4wb4bnqz8f8mrh1mg2d4mwdni1pdclk3b7qiqqscn8uxp61rdi8l7ta1yzhad4f7ml83v7ybjp5jj5tsdp',
                component: 'zii5og216sp6tqn661w45gd4a4e1d0j0yn80pd09monk9t9bj861q7rpl6w9xi20dxwsg3ik0dk8j7ry3fxv7mqcuoz8kui33xwvxuwsi64dbfweu9nref9xeabtabieylc7pi1q51063rfdwwa6tecf9i8kczb9',
                interfaceName: '5nejb0n8zkelgw6jyo43tamkvfsrzfskhlk19s7ykpq4vireky5barf9h4h4jols9mpxuyacygvm50baucbbbz00clfbsu2z5vj4kt7lh1vaxt0ann70hk3dntil3w0yttu94almb4qn711bjq3bpfmmzjecs0zh',
                interfaceNamespace: 'xzzoud6m6h8iwu8svwxusia5153yqcr1rf3at2urqcwuwos5lrkgulb8wc4dtma091i7icrufa2tmboyexbpoyi87a50l8i7an54axms1fsv99t0hz807kmc6dx7z4l9ihhwg75etdsdkaoqk1uae65ly6em4419',
                iflowName: 'idyfkydt6kmnm9308s4chjxcifm8gsg4y4mqft8jiu122hjrpla6ia501cqvt5cksi5f0yaehh4fhv4ckowarez4in7u67aggawjql5g833iyajknz96zfmhahaqffv8gxe0r6lq80ga8ez7fvby2f3l9oozdzjj',
                responsibleUserAccount: 'l89hhcwlotcon1p8bbg0',
                lastChangeUserAccount: 'lbotda9anccoqs3fod84',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '13blvqxfhq7xcposx17twbpdmoj4d3qja7cvhiapjuzzdie9pyk62ivtqlzb0487dlw77oheq6rfjrgqoa3sojvrk49rcnqyw2i9vo1z19yxg5sfxukivwiwgsvs9sno5utoa9n5fbkse7ram8ya4n0b8f6dbhazrtb1sh6z1gzcshsd09hx1ejg8g4p1sn475ikp3ppvpea7wurz69motze47padwd6may148hsdoxh3jpk9e07bdc23m7y6rq',
                description: 'm1ty25jmbydopwbtv0jveu0svhfuj532b4scqq0hofcttqnm638nzhf3kv7cv3asgxh64wyqv56u3wtk8j9feysw3t3zuca2izax0x211s3mr9c3jhu1cb3peok3hxhj656nduhcw6qwjadfj1z7yxy1t71pw4oetzw8isn9dw1zvc9wybspttcgby3ewhksukrte8ycwt2m0ka6fwj44puzasrydsza1qhenripsaup0qh3eykizm45tkf6oqp',
                application: '01qodkee40hgxi5ebsu79umgjuypuzdgvei8ikyku209tkc39zsu61a2llp2',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'ofp1donwsest664owe6u6v3ylyuap77bzcamt2xu2ec5cmkgfk',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'vrqkrjjdfeyjg562dhca',
                scenario: 'khjl70gy8lv65tdvojpeivm5xgokfv7dgwjdkvyga673ewrkw6w82vtpv2p7',
                party: 'vj64xirixojg1bdnad8uvgl5m3158weik83v5l6rfkwg5gz4bthfhsaqtosfudlf8s7e967lh4tj90h2pfabeu5kvskc17dstqjhrbu6e976xzbks5xekofcoxs14sry9enaytpu9gnb31n50n1em35ieh8sjchx',
                component: 'qmn5d7nd0rw8ohpvi1wgfdix9k81l57a06ugcrd8svvxsk6wepr7cjpd9vfvyiwte9wqv050ncrntmjbrtqwf58skxpp242qd2clrcapftjdqzfdo2216wlnojyhefyvssf0p538lfr5jxbjc49tg9k4xgos31x5',
                interfaceName: '04ygtyd51pkn5xe3bekw36t3suir0tw0fco951alojr078jk079ufb46afh47cvfbw3k64gub4butls0soyv9uy9gi9h4gfifgy8sr0jgq55l0kgbp6fqrd6hsqj769fa0hynyrt4tbp0ft77gs37cp8ejbxeucl',
                interfaceNamespace: 't8kukkqi654jbnzgb1lxzm5rvuo0s98tvjfa0zfs490cep8sg08p1s2ybneydc3tp4400qrhg66dfdrmukniyu79t21nfs409c7bvjlayx4p3nrvlgf1iotrwa1l9o7z121llz72lii191xg7k47v8m3s69yyo1g',
                iflowName: 'othp9gbbagmq2hrsegeg1febnjy18lcczovez2p221pjz4jdb6452nflhelvtuq6rg58wx97vlg5sc61nljp326kv1rtccmsyqoyfhotcaanujmrq0grt5ei4x63e5puf8so5283ibi7o25sngaxexgmuvkvinwe',
                responsibleUserAccount: '9qcsz99thkxrpt5ravx3',
                lastChangeUserAccount: '6gavhbvp9bm7ii5vhcgt',
                lastChangedAt: '2020-07-23 23:42:50',
                folderPath: 'iczhn5krlasocmohx61hqws31sl9hyt2knnz4z31g36qsxyj2eric8rzepvzx8j5o521mzqq5vq4l2hdhruvi0favm2sdgt8io2xe40evh7xyqx02qxinhs8altqpzl4myhit3wrqd6x2mcathc9pft6t5r2ioo3ti5yz25luey6xzt6lob5ym7b543fe83sn3ivtaas2f2yfhn50eb11nfr22k56chl5aizg0zi5b9s9f2c6dx0qfs8nmgj8uo',
                description: 'tx4x09d828s32da3edlhbp6qy5uhtckbjz2wwiprp70knboejxgzukz1ib0igmyg2r3tvuqtk8s4u1vidhjllpy43zc1kispm1etu3t3qao8fwmr5t6hsc07s8wins84hnk54fcywyboqi3tovrxcmgw4wvzu5f9acn05dknnf5jvh7zh50j4d3e9ubkuf1hu2rcv118wdih23ftphxcg55uwypbjuaf0ghss4kc052lub56dp7a7uakz0quuh3',
                application: 'dw1a7jm57mw31st6vf2pydjd3n9ky8h9y2sdqait5zvl48is76fe1c209lyy',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '794001b9-8cf4-41dd-a73f-15418d3472de'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '794001b9-8cf4-41dd-a73f-15418d3472de'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/794001b9-8cf4-41dd-a73f-15418d3472de')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '794001b9-8cf4-41dd-a73f-15418d3472de'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '536d49b2-1c25-4262-a102-8fcdd4f2af14',
                tenantId: 'f990f353-79a6-4b65-a8fa-802819840ddf',
                tenantCode: '04vtb2ienlnucmwvs457w8azcal0nir8miep5hnz6f3i1df1fk',
                systemId: 'a5bb6528-9ed4-413d-b17b-16b270947465',
                systemName: 'q7g62q0e96oorz0fpor4',
                scenario: 'ba1bj1lgft2ulcl1shtych0i4cdzwnogoc0wlcye8f54eoq5gasq79zso0rq',
                party: 'dtomz4eppwn759q2ushd1k28vb7s50ao8h03vmw4ht3uvb0n9i8408d6hjbd8ox8zv7ya46oojw09vbk493o4ore0udquirk00xgkciwlkgthlv7cqizm1rum59r3h7rp0rx9hs1xu809n8cqka239myemelcgpk',
                component: 'rp52m4wxag31zxho7s1a1wk9t17g8bx525p8w06zfyp9bvnw5jk3tcrlceiq3dxxlocer5lkiqswcofey95l5ntktvswauukedpjr4e1a0rijmefra2xzzequ5zrq6q68vb9286tyvx2ws8gd3k2d5lm168j92fh',
                interfaceName: 'hvg80y27k8j7hzdqkwri4w26itu7k8251q7ic0rhos5minrvqgt7kb5b0axvh9t5uj59qi4daxrixa3qckdacjsdwixtjli7gwf9berk5al6c4lx5i1a20o6qafg60ri466jpxlahbw1gyqreg5fhqmdlnmq0q4x',
                interfaceNamespace: 'l7wh3ak2g2x9ia10kyvvyy9rjr3sz2cgb3qqrw9zl83juvj5lcn5taz2cvj5b1oeukn0ntraixl2b9rtkhjrgnie989dy35d1qkvnf3xzx0qjme5snkbfw0zp4u1kngqza83zlblkmr1hdlzkl633q7hq7bsfh3r',
                iflowName: 'hlhrdg2wlabu3vx4l5xt2b0c3zh6n8h11yho74gbm7gzecufz5kub3z967e9kegcduu084zwn064qmedbb7z87ub32gjtn0xe4gizy4f9097ud3f15tpjynptzc8snenwh47w8ygreyjhi5b91608otd8ao6ibta',
                responsibleUserAccount: 'itn6a5jo4rvdj7i4fuez',
                lastChangeUserAccount: 'dzeef2q4rcmdy97amk46',
                lastChangedAt: '2020-07-23 20:05:44',
                folderPath: 'kpbt3b0o2dvhcu8rq0ze490kwxt6k43h350in8vz8j1fxgw0scxtdb5cj5oxwzjn8w4o4aajfu23uh9am31di0lvjqxp4rzebk1dhpetu9e2mai8gjjt5oxlhd2gq9pr4fksf5ui56pffv9qot9pwv9k9ncar1umth4vhg8d2l5lom105n7c36pvseyh6r1na3oxdf684wl2vlaipkciv33d01jn2w9djsu8abb6mqqy6wlc71b3ocejizrsmvj',
                description: 'n397cr8p1xxepdzraog1y44mlh9u2hh34i1lh749kfc97xyshcnttzm3qhljjc1lz2gmilbvwtssfa106na2xkbm07iy8ltie0ah9tp3757r7jxkb5n7dzm37wav643n8rid3czsrykfmojh41czfrt33y2zll27drz2n6fo0d0xuqtaa4ikqkoymhnhw3ka7qm3mxdmuoaxb925paj665zjltvl85wi75hy2gxjaf2mtjc60z9b9onfw08xokg',
                application: '0r6xhallnqho68hr03f6kb1yxeebl2frhli6n56ec3qhouv05bshv3yjxa8f',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'b758da2b-5fb9-4cff-9471-4d1ec24d681c',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                tenantCode: 'omvw7dxy3uu2ygcur0elt6mjzkqfr095kdz65xek4t1thugrc8',
                systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                systemName: 'iva2vuil49q3m31gkirf',
                scenario: '6tvlsivwh23zwfjmueywlhn6thas987cnkuy3kdo92k4qvjb8ssloua1fprv',
                party: 'o8e4h8823h0436vgf6d4nzbopwdz7qajmdq0zi63ulpxl51tlh7certg6kok883ljrgw7o9qqicoj7b0zz9nlomgprvwn4rhm2836k114yk3mztuqvm13i39xe1rt9veoh7g1zshwjf305spd2eacl9et7287s3z',
                component: 'l8i1qanszsakann7ovxk0ka13fhatanvx8jhh8ampq3b2jcsrrgng1mjrrpxso2157vnhl7jvzmyihwjez82xr3bkk7yrr8wtokrdmolhm07ubwidozdq2gouc6vziyj0t5g5kk14zcdc588zroyby7ke7vckmsh',
                interfaceName: 'q1cg6fyv9ukrsd6fb2epahyt2vamokc3lpmcvdkckgidrflcjfgkhmj54fhridfo5y43kkc26dj3ze5ma6p193t2hxo9er3hfkfzs0lv8xw58ao6z6r1gwurta1yfosi7sikc59bhqvf9dqe89q260ho8cuoif1k',
                interfaceNamespace: 'aulyss7dvzg48akgdb8de7msigc89od6oago4zlnfsq356i8bopomwponjrml1b97x394abqlfgabh6gzy4yf6j29pez0h3s1ccdvrpc6dumgxdxeqomytcun74v3zhjvg2g193h9e167v0gwfjane6kb0tsnp12',
                iflowName: '1qy121akb0bt2uhlio1fov993uv6l978vg8cioc80ts2atpq80j1sj5pxp8m6wkqfyynpiycqx202sh90bu3cibgxgya1r7losqs39em2wqzyppuudgk6vi83rsiqh9x6tod7m68i7a7ykbnneyd9fqfcjhijevm',
                responsibleUserAccount: 'gnzt079ylg4xzhxn7ly0',
                lastChangeUserAccount: 'gm3ahhjyyfigls053upu',
                lastChangedAt: '2020-07-24 12:35:34',
                folderPath: 'p360ss8khuczertmbyuoosjdq65pbdvw4umdn6fhik89j15x2c4piql1zgfkakg1o3yppzlbeutr1by4spot8xwoixpw1hipp9nhcie8jq4qkqc7zee2ss1x0rku8tjig0ktaq4regw3iva2bupc3h19he11hz4nc3awg988rnzv0bo5hwrssfeezeniq0vzidrdfa7rufnp0wwylmhkphyxti0yr3higglxz486iinbkj8oxz87lvq1l5oz965',
                description: '8kgaf5055ir2b7x9m3ls5wmnfw2oicxf4rryjf4wha4em7a5fyed7fqvm2ricbulb5q6rr03wbursvwlroyvcq197pbrb8brjhnmer0vh4sey24u90zgqrcgkm7uzajwjkvryfa3rgfp4dh6b7of2hezftcmful3o000zexi1fytv6ztra6si5j51bglvb9e30kbhq2npjgm1kll7v21nfn11n4bsrexviweg27mofgdew94qutsafb9i74xwa9',
                application: 'dq1zi7fplb4vvg5sdkgjk4wxlkbcxvh6thke1loqz1brbp9unq355uxj7663',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '794001b9-8cf4-41dd-a73f-15418d3472de'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/794001b9-8cf4-41dd-a73f-15418d3472de')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        id: '3e299126-5450-4e70-adcc-c6cf0d1c111e',
                        tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                        tenantCode: '7vqv1kzy2diecag5cx6incoqgef6tkf5ts3tihd75h704bwbaq',
                        systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                        systemName: '61gzizjevi2wpgrwh87m',
                        scenario: 'k8hat5ehuepel0kr16syj87irmrv1nq0giit9prchonkpkp2kshpy113m2o2',
                        party: 'f5fae75bnyl9gybkx9yx9bv5kjvwnxqz3i7t40a123jwzinie8z6gis6th97k1vbfsg86aczzpkk7omznvyni7i5tx0i5euma1q7j5xs8d6ou4565l24hqgsff8syaapv4qvzkq4mrf81wznqmfmdjnbh78hnvv3',
                        component: 'h63dfsnmzuh2569u6ires0k7ld8yrhemjj33qzzer94ovenvs6k0nd0cum19u375l7vf2o5efhl9s64mslmpc6lkawgc3mhdplzuvo886q4jhyngn26depp0dxzob5zvb6cgmoudzqqc3t9nna8wf6rb308lpmms',
                        interfaceName: 'bln8elk0i7obealdrs34i7lze46ctsjma54jkyeis2db2szaitljr191hr6thsoq1j3o2w7sk89fu6xa8dnulyw9itc4axb4ce8rjw9jq0pdunubslw6am4ss43pt4gv5dqyojyb128ij981pdrd831ymnbohqzt',
                        interfaceNamespace: '6p91hko3j63vr3ofphw0bq7xby3vq6l7b2q0h0ojp8vhzaugunhiap0dhj9ji7ivqxzgcxiaf7b5sup7fq1u481cjtdblqapvz4sfhx56eoozfohba4v2su5qekjfyujfjmev8oz31u7bhkbgb08ldja087px3lo',
                        iflowName: 'oijt2nsqbhvp0g580omlgjhi2a22n2zkg8ax1b8j2ztox7nu58p0ob593ow7edewvnr9c13myryd9lxii6rjhmjok8mpxjt7d0h7q4x51s9g26w752t3a4e9ddlnzd7dky8txxtm80r93dytgx737gmarwy1uwb6',
                        responsibleUserAccount: 'i8z5de9lay9tu222xhph',
                        lastChangeUserAccount: 'rz5mdxhf09pzbe1xjo1b',
                        lastChangedAt: '2020-07-24 02:07:28',
                        folderPath: 't1hj3dp17rfk738x6z743u8qhyn3779il6ud6sdxgy125cpfp3l7gnenwetvvdf0rzyvuucn5z73iz9w93b55gooqk8wmxccxvbhxke0ff89btdklnt188vfvur6tjgg0q8olrmvqyfdvrple7vs93lkoj4lpohjfjz6damtsbrgd3794fu8ullet19ic0hw4axm6fjr6r2ng7f9kvjhbcrmarlxmx1te418eazwopmati399qq581fur3syrin',
                        description: 'li5xtb1iy35lnc8k5hplf1wrhlyatooz3f2zw9ydu8lg4i9b19wp2s55aatkke2b4yddzofpo62diznxd6v7qtf9h87ohyritv3jghmv2srnfzuzj69pmizdhhzylxf9f9b02oesepx1dw321bmufs3m5jcsz2ov7dmxj03t4ov3w14cbtlxctqcslm1v8od52ns85xcra9x7a58yzpw54b8k9a4vh07ozdpebgxck55b7rf3cy4d02bshlz4kq',
                        application: 'r3esucynmtaay7xnbyki6dnszx8j3ma4zyb9tls2swzhv8yf13z5y6ippvaz',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '3e299126-5450-4e70-adcc-c6cf0d1c111e');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '794001b9-8cf4-41dd-a73f-15418d3472de'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('794001b9-8cf4-41dd-a73f-15418d3472de');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    id: '794001b9-8cf4-41dd-a73f-15418d3472de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('794001b9-8cf4-41dd-a73f-15418d3472de');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        
                        id: 'b3fc4f6f-977d-4324-bbd5-76de4cb6a7a9',
                        tenantId: '1650c188-9140-44be-9729-69ed85c67c00',
                        tenantCode: 'w6timf9paryxu506fkb6ygbp8da9vgot572wxyhlqu2t0ashl6',
                        systemId: '48dcc224-d2f5-44f6-bc00-534b205d66f3',
                        systemName: '3md7xu10b5e2qswojecz',
                        scenario: 'kdasw6b68329e6d1jajtv3t20qnoxc2sak7f3klmlyqqtqqrz2iwpl2td352',
                        party: 'sj2fuln9ilf6vghxw95igaudl01er2liytn7ymhaqsd72pvf4vfxky7vtrs2kehnigtojnp2l2j34r31ove1vprkrup3yck4wdsqfke1xyrxwl79y0p6aubuslsoravcbm4y6b2k8alamfhxl3n9s2twlw9qt9or',
                        component: 'c7efr5md33v6hmplad1y1i311dnb0pyx4v0p893mwaskxxkevip3xlnxxryneyt420lkz8vkpihejbyy1jeok5ohyjypqctdmv9jn99ysy6i4n57xhv3r7ctq2wj7zg9ya6jo1fzv66ptl7iz7wbp7emkvuwz0dp',
                        interfaceName: 'xo7j6ekgqgimsb5hfvci2oberhddzknvwcitu97q035oml6l35t88v15rh0evai0rywpwk39famrh1iqvqwsqayu2l2xa0ktv78s5g9x4slglfj3y7a968vey6bqsoh1tws2lcz8fvmalti6jmcv1l42n0374biq',
                        interfaceNamespace: '09u0gb4r1cf9uc0eorptz2hk5rm69ng91un442nkq70i29b6qfev3iopg0i27oy27gepxh00le0nrbiy35m3zkly0xs6fom68a6yyt7de719bzdtrqpf6ne8n8yguse1u0ncjybbg7jutfd3jbimywrqjez9q64t',
                        iflowName: 'rexbsjla2x5d8u07fyy9ndqc2128n45q9gzcfd77wwodh6296y9gs4sndchyw1h51l267cxu9xo8ba3rwct8s1oizjp0wgash3yud5p4j9fgvd8meq12yu52m451wtarpb6atxztev551u57g1dtx772w31c85xp',
                        responsibleUserAccount: 'c6xkk28q8m9cziam3lqf',
                        lastChangeUserAccount: 'c9zq1bjyrb0mrol5brns',
                        lastChangedAt: '2020-07-24 17:52:02',
                        folderPath: 'ysgtjyt6ewpv2mmdpznq2i2gnox82m13m2n8zt8zjdr08ozzrs0qbiocke4g9e6se80c30kq1m10q2ik6dnz6h1p3k7oy57ap2hbchc5dy3iqxc1gsv507mcm0q00kdgi20uzyren59vknlusrax94mzf2lsj73ady9mw7qmsxcdc29cl04r9oyc4v0aobee4rszqk2d43rzr54rvgwp85ofpfb95y34xmw8hozisrs5f8kp5n3crcgouwzk7fk',
                        description: '9xxsfecjr8inatwpsv0dh97nymbmrj2rty8w1muaazujoygjedfqtnvwqexplqhkwha6lou6wq5oet43lkxz8yrw3vh09tlmlrj1r41dtb9t837ghiszpzp8knpisjjondr9wapumgpcyglzxqtw4azzw05jvo02kfqmritj2ac7nhbzy8twx7m5w9s9d8ycbj26glgyq1x2f34wixsznwevbcm9gk1tziur2hfw0hwqlhx2dboqgq7cuzqg6bf',
                        application: 'cimrcb2rhfziom2mq297jys0q9dg7u1yj2pmd341cl75ajdhet3k71qyo2sy',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'e214cd85-d582-4bd5-ba5a-95308820b35c',
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        
                        id: '794001b9-8cf4-41dd-a73f-15418d3472de',
                        tenantId: '782585c4-40cf-438a-b856-3d4028f1ec38',
                        tenantCode: 'zv7i15wagd180113vmbrmc711hu1pzxycy6t41fw0e3o4nzn1r',
                        systemId: 'd2492e4f-c54d-432a-a1e7-5bf6fc002707',
                        systemName: 'rzx3sfcpr82sx9f1lphb',
                        scenario: 'uf228tcfu01fd2ykoosvhv3t4hk21awzere6m1gy8978eg09n9pytsuceklb',
                        party: 'qbeisljnyw9szdgz5b4ox6gobrjjpufn8txv16uiwnxafzzxxnscqfi128yvp5ypv7d413xzf6osfzuasftw9zc0ne3fjo4vt22n2tn9o7jz0lmmu5ownbg3vzsono4xqqgwqbzd11xz9pyxgnjw21ye5584w3nw',
                        component: 'ghneid3vpb57wad17lrv1jllpzbyzytgj0uyins9hyxyvhs618s9ptax3p3mhzoqmkqn9surct1k955zqr42eso85cok91872tmxis92ip4mal11rexv80ta5erw5dvo7d53om3d363bhibdrkeq78688awom2hg',
                        interfaceName: 'lcwx2rceu04pz1nt98kh6dfdzg9na577cpjvy7l5dpdrdezbarg14rrwlmgiygnbmisby05o0td1tv6axf6gekqxrpq055lqcos97iq3a4y1e1vvywnbtrvwb96l3x0yi8p5d7puc458tvmi16qdp18j65dhf4fn',
                        interfaceNamespace: 'mwppym2dvinhqv6ueb45qj6vi08sf8d59d3gcw4gzf0ymi92un3ycctl3hog2majtarbt1ns2ds1iz2pdpur2r9g4vhdjor7ircz98qg77awwq964p5vsqz7f5iifh299btzk30yg3m4cebgm011jdy42r2n4ko7',
                        iflowName: '3ouhogoxjjxizkii1y5ps0fmg4i64sksp9hljmyrj95ezhlrwati6gehwmt46yisidzspn2ttrx6qwfhs3nos4zqqhmgdtk9zgb4jo6pn8vganokjkafkt4qb9qtgxx6dys3oo18mop08m5tdjdelmdw9q8ru38x',
                        responsibleUserAccount: '8oek9wn41nsiuvndest9',
                        lastChangeUserAccount: 'dqcu1in9iztuyi98c4qf',
                        lastChangedAt: '2020-07-24 07:33:21',
                        folderPath: '06twmf3m0shuwcba3kjstkbu8cfe2cf85661qv56nrbq3wa4ai9yyr0rtjlwjvs55f2fmqlqoy8i1oqfj0pjnig0oxid2e1b1o57944lovndv1qunn22n3wf94e2w5pi5d6z3s5hkg7nkvwn67fy422vvo66vqmnhb8nx5n3kp683oscabqzp188qxvnjn2hap539hr67rxr525qsh0rt0yvhb47xz4upvh21ys01i1f4tnnvs0t3xi9ed87ktp',
                        description: 'nzfust9e9ak829kynsnjpgoal5zkgyjrjicvc1kasl8a86n1h7a06xc5r7h05fkebcj8pmvbqi14nbmnk2p05uav6j6v5ab864n3hjdnx13gsotbdx9nekoi4mi3371k2x10np7s1bv5lbq21lg3w3sxcgdkes1etvtslhxtqubl9or9om4qsvr24ivuqdccnsfqxlw47duwjk7svxc7i6mvjnvmzfp8cl1fsfxr7g0nbjdamti6svx2vccxom9',
                        application: 'z64csu1vhmixtuu71uggsksqj3erv3dqywresoopn6hqriayhddtfrdzcncb',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('794001b9-8cf4-41dd-a73f-15418d3472de');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    id: '794001b9-8cf4-41dd-a73f-15418d3472de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('794001b9-8cf4-41dd-a73f-15418d3472de');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});