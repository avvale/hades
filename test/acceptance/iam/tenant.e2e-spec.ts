import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'abtp0qrcrjp221yc5niihm0ynh6pxvhcsdfcxjzmza7mcluiq86fs7la2ujjwty9k5t6j1apba3lxoh7w74sh8ijm7ldcvvi44a74bi6xlmhbu25ukjd92apevu3pc1bg8txn718ch13dmlse8wln7peoyh3kq1gzp4x0mmhq1ij47bxeipzmcz5u7kxcsuwzbo86ly02o5ql23kqf20rpggvhdhajz5m4sjpidus7q0r71b00v9om194yn05uq',
                code: 'veli615e91lx91oba8dxo7ph9spmy2kn77vm5nt7zlnuelladf',
                logo: '766x2hf0u1pr38bvb01xjmy4ni305si1aiivyws7z1dk43t9gdg5whunrvymfzd6zww43t8jri2czgpxsqzlb7ezbu32153567olazaecn7ibpb1v4rc5jlwo0in7d7q83xrdfis2g8tcimkln6yd8sjnv6nwsr86ft31r8inyq3f0snt5mq0e0nkyhl1eflhwns3xmgx16zd143jciij2wbxoqx00duvcm3uu5ppyoqcfsova0mj4bufzldnjo',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'jdhk7ryd2lhd3z2srg2iqnb48gzoa2bqlqvmp06ubq7c7dvx9tslbgz29d9ps53mlrv28emx71zlyye5yi6m6d6s5n1a6nn6g56f4s0dp7ofmc55012kzx1msvqfvy98v9mnslo2rs501mra41r86zr1h6k0g85oikf56gokxr7sf4l1ua8ekl2foci8bae1e9t44ld6e31w1gid8uhk0zifxa9mu64hb2xlq8j8pb0xc7k4w2oe8xi1jty771f',
                code: '5rxpvkbpdyr38a1ieb2ax2e209hvrmleak3adxt6mj3vbzxlwm',
                logo: 'fqxg65dhkrwyyw7xtw8anchlekrth87f4vmaxwy8tq2j3r4ssz8ysswzkmgysyvsiqft6yzbyh2xmzbrdqaatkf1narjkvzmwm8302u036jd2spwlszq7wsz1nq8zesg2cemp6re55y8l1euv067glhaf5y6r6cvz2tuij1outrfjoayy83dilomm9b6iee9x6j54kgsweepkwsq99p5hc3d61huqiwnp7yjwa3zze1q9e70nwyg802dq8h5s3w',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: null,
                code: '27hxd77k84of7oxhw3qbjgji8mt9jk1wr2aylaugjwm7hkfcal',
                logo: 'nz2aqwvvefusm0acf1vthf65ikc42c3ntq01xnmd0hjeocv5ev2lbasigwpa6nwzutezlhd86ehxe8e7qm6vdbpikftam087ylfzogfvfww5iz9hylicfywcr21auhhn0hxvq1tpp448q61usvx2r0qkhu98756o0isaop7oicpxfsxveyjpzmhcpc2hld6rvczcox95sso1edqpot5st46uzhou9fkd5us3j6lzgluqp8dtf4naxl2gafmhgfc',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                
                code: 'vshjl4c3q7ro8xnu6l06icmyibnl5zv78fiqmb59h0tcdmvabt',
                logo: '8fyx5hnjx83d16djtamo6i60k0v690w4vkluvbyh0jpao3en2xhm3ic3mb2m10758cf93uaued22o8j19l1n3moqpv047knefsptypzt745lvsebfybz2bcy9jku7dw8mr35ir347hystjpfmmvkw6mmm5v04dbv1ez31g6thc1bsdaliemcj7zro71vbhgpn39jgr9lnq6cg7e60eiearjbkvpmw0fm9xkhu0qcn4m1lux3adqkcaxc44n9hcl',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: '7zvmj7lzvl7vn4aj48hip4g7scl81mhqzh1mjtg4t4b00ks69e3nbsfhez7swemcenabluxzcoizep9kmposo8z9lq9rug70i5ay41nqdtfwwsoziq2nu2rzzbdkwfga6jmbiv7ozzdzq97zd67axqmxpirlm01rib3rihbf3cz97vbpz1qmatu3n3dn41jznk77ot5m1qa8ijn2gi9tqmxn5nn8o2co6ozstr8eu3bwgyll6108p47ejmhsllb',
                code: null,
                logo: 'sh0t9whihy27qrha7fdaggsaheo1h8r058dm3em5435ri940g4p6et9dctl7emajp3rygb3i8msx4tytrio24u590pelb7t47m6tr0qa8krhixxrc09ynnn18lek4e5v5qmwkb5rvareucumeehduznp8ptyarrxhgrg5d9n81k7twi0h52hdlrcdpush5kmmqhrbf8q8x8q4t7vojw5mb43f8t56fo578xwadpnecdpeaz38o3t1vse5rnls5t',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'ye776o7pb7kvm23f6hikk7guu415clygk3gwotg6p0ay65hdh8kztqswnnv1rd7v26u9ooxiwmgwc6qp9ee7pthoxrncab9nocqrg75h0lg3nmblcr3tt4ygzzzmazfnvliml21ndlo4nqshqowbxgo2j0ttb4j2zaodo3ojqkv0vhdja1z1rprnnyjq7oa22762r67q1tpimbql7yx12g9qmz0zdbnrhwl1ha5qrxd328scwqu89xc6tj2vqbv',
                
                logo: 'psy25w6mgq77m31e1djwyrzjp28r68e271vl7fv52m3xwlf4l5txkg8n13yvytgqn9td9qlmz2ay21fazvk1gcnr8e00jm3ipiqjrtckfswklr96d3bz388lx89cu1dn8tp8xaft5bl4v2ynuum450blsyj6mi8slog4pu7p9uf3ybx90ee3dh9tvircxk7nxdjkwvlcpjm0nas99k18xafvfkf0s0fza0hyxs70hp39vcftih5jshimu09ftsu',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'eds7rgsvkp9yuw3e7y0b21ercveo4anvfj5hcznd6tlwk4qi1bzqcio8vl8v8oee31cpf7gud05rhqauoionou2yhm3rnenhs247kac3m3fdex7475flhli01gdh4fxjmj77vnuds95t8hw1f0ec0083ntitqp2j38yzndx2m8io8zfrawcjfttvqymh3knhylpqt1o080rcipxxj2boigdn8hzbz8z7eolyybxj1xwted7yhd3esy63lpulaju',
                code: 'zc6nutffjmyd49gapx0pxmaq6cfne54z4od2b6d2xe3nzxoe4e',
                logo: 'fca89vv9cz6r6bfzgkthdchqpzrjqlya8cz67wtkdt5htd7kyn7khv8uk236mmrg84ukk8w1ogotvd74f03a3q2azp24r3vxz3mzd8iole5f2vmo6uulof6rv82wwezlhjjxytleasnk9bauh8222digtoigv245togjptk5ech92eo83ory6ecd891p7xa44346todqa7c34cnxmtkmf3se2z8kosncuch9gexbxinnasxwse2v5j392l78in0',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'rw8vdx8olvpr36k3n8v6vi10p39vsn99czk4w7f8iyoat9vktpn9bj27xhegmh21ads5oovv8pseeg3r4jn9gwindcwpyonmyxwqtwhk6r231sh1scculzkpz9ehc3num80pfhez2t4cna2b6i4mw3w28negd490671z2x0gl403qmtvqi8fxrxprecmade8zq250qd2oodaw5sgzlvr6kt2hxnyuuzstlxkc13t5emryb1wvzwuwwrwf3bg6e2',
                code: 'cuat60y99tp0q0pvun7zb6b7m732tqu9mfsvlr0e7zfycfvmzo',
                logo: 'o030t1n5betm55sq94x9vtjkygm9d4j9yq946yaf1fpzy48k2paqsxfzklrk6zo64o0nmyaj3bvzfe4dkfzgcet3vgd1qajui9fxhom5mn546wok0pc4q8gqavtetxai1fpjxwx130hbxvvxk3m57gpqidku76eyb6tecdylxscw6ie1dst2d7g88fv53docus1iordbfc3flc6euyyq0ij2bb64lk1jj62qze36tx8boe0x7ok7rgdfosloxve',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '0gx1jgvi1irdxl91z27bul7t5r8om1qc8nwtp',
                name: '0xmskfi4f9q32iplrbu1j6m5evgph4nnnwh3yjf04np0fy5yeqtmp9dyvhwk77b6zgsssjm6jgm8xjbgsct531xmdq5rspcdx3b5nsa9txrcsllhw9lv9zblxleftnqz9hrjbepsbgnr0ejcijqb9dsopyknm18l6sl2anm58vsukfomtix21ah4mwx5neqkdcs5faul0q0p02uo23io0ayxlq6k6tjrdazf3wpz3pyuai74jjeowzy14pk3lal',
                code: '5k3r78lqo8ql4xdce589cjuygrm1abz7wq19kj9cbw29cf4hsy',
                logo: 'fr8ok2uzys3i7tlwpgspn0vczpfpjx23pmcfkxw5a0d25hi1dx5yimhhy7besk160020shlim6nrdqli5nzzvws1ens064zakxekt4iommvu0jtfcaeuwa3cpc2ww52mulbztzuqf7nviouuhf93spajws5j5kw26mxtmivwc6g8l84ugu4iwr7vlvig2gz9fwu9g2ybct0gc6kusjugieyimcmxsvz01n5ivdl1kijxmrn5ncmiymacrupdw6i',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'h12k4j7kd3gf04pirjcox0sguk9m2kswif0sce5pbzc1m4tbg4o5qq2urzvxif3lnmgkm92mdfe4c5b6o1cgas2bfzxz2kgz80uos5fmdj1jhgo4owhrad7ceqnwq9tzk7dnkwxk7xlcsin7ktwwzr9aufsbf1afa7dczcyzpqnq3fzh6a6josrzsmexbzd9b2hfeqjk8qph101p9qqfqcu1p6vmkydqt6vsvaw6liwtiaqk4m5skev26eopackq',
                code: '9w9lhaxqggzhl9ug1nl6s05vbgk2mxt1rkmpvaujytbgwdcg0e',
                logo: 'd49p3eveuz9i07mvvkv12nwjki2egjfajxkbxp9kg3bqs85fxex7gtrlpejsbkq808tfxsk1998ecch5olisrh7d0ebe8houiw94l7s7tgjqgfs0gmls37en486ghxllsdi8vbrujpclfj8ms314vhaoywym6yq9bzmnkyie37fk32txwsm779f2hs3xzdb0chxakwt8k2udxxok3oay42gkydp8vhj3cbzvmmmkf4n4i04lz5nlk9rzpzx0nzq',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'jay1xwavy5cuptok6xaps927qz2tmdutbtbhmv09kgg9gcqtvsp2p5csh4u8s5qg2l8f0sq7ju04qaqb74u9uw1yvt07xae32kdrjbkyy7sl3v7s1zfwvezsc38yfsn1fbq8ahgrzr899dsquqcl15xk9jhobgp5zbnd7aiycwf7lb0etw7hms2z4w03sy2e5tuwxdsgbisvetcbgtv2avdwnrz5f94p89e3zrm64pmukgnhc08icoxo3z8cjum',
                code: 'usjw28ociprs57958wxcaq08k22lsjafyq42gy7w8le55z7tbqa',
                logo: 'h7wo5g0bwd6jb0buqpk5mvkyxldtykxodk43r1ejovdewkgpjjmob082zs8tkublr8qegjx04908n2g2kfjrzzhlr4kqszj8546z5wytfswip5xb0h5xnioh3hieg15luapjt8pz9oh5wn4f2pbs2ex72k8gi1osn1uosugnllan95iqyqutcntzx7end0mfmm41eyosc0qu4v08j761be7oaliqp00suklypa2lmw2jopm38povbmnnr8o6c5k',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'cj2e0cbdxxo8vn0ymd4fp8c4x4gbafgqkvxrqnvfm4gbx4qncfyd6ulmzq1csmrbwpregn104ftnkkwhvrz6e0ycdvpisyoxgh0x419pibu7du6tzh25qa8j5sh90ldbqrsk6919c9f53q786rt52zl1086ukmxxmnz8cw9eea5sa4t0jr937xg5fhmuurgj4tnoxhnndv96sn3o3l8p9e2y0sml5n05ogj5ruls6mfjap7v3qvw5nm88dov7ho',
                code: '2zmkutix8tsw8fesa9gwxawab495wpfcbs7i25zhlt82eidomq',
                logo: 'vzgit6g50vrfu8s8fgctzpzbsqmz0m721o1zajw362d5w393kpunv1dl9gndnxsqy78wx6bv57nlbwdab56kdk4qch4404jlyca68u1m6oorm9trcmecslcfoutiarrbju04builjet0qwr94ki8v1kc0fxn2b58132j777jtz7ngzfzm65x5bj23nic2zei9mkhgs46z2agtyrdc6oyse4pfytb0tvd1k29xzt13vbuf0id5b5pcbsa6ddzbza3',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: 'r60z4slqny3dh09mif1wnbtqc5xlisk0i5ud6dhohl9pjnt5lcp2foloy6fvjh0h7co1riduxaiegbo2fo1wkcierhochz8tkrgk4tnkjtnjlm6mg85nwbplxoauw1cznne8tmfnwwmih9esl9y7dl1gfygl59a0nr4yadyj5rli7ap6ygzwzg123lsmhwfskbc7a5y63vwbbvgvhp3rzcog5ue62dvvco5pts9qtxcxzynqxa1orp9zpwwkwm1',
                code: 'lspvajcx7d1k2anlcxqvg6ly5yg0tj1o3q5lwndhe8kq45ajtg',
                logo: 'qfxnvc9ghdyhw0zrwcg226u6ce7ec81ch6zefjl2j5lna7u9kgrl1zasge34cjot06tbspu91mj51fl7ctr4mtaa8uxdb4ffxw4jiwbsubrajutwnrstgqtzb40pgf897nen96p2hj1y9iyihmh0xsz6cznkxxkk6rjiweqxp0nc4kok18totgo0hwh8vzydzk5eykrrq5pa6061sjknepvji65vr0s393egr8vjbvos93t9gs2gmh62949rny9',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: '2gkg9bqad5m1xshq6xv7sdrsjqydise0f3bqhdcudj49vhe8deh4ehy5ccnqv2d50fj35ice3jlq4s5hvydqgrs00q3w4z1ed0t4euow7nlwle100q7vbky7cht9y04h71f3gqhrgkpjl0gu8fjtyad6fxemw7i0s57emdpb3yvbsqteo2r2fo63ma6wbnh6h73btx1xhvmftt1j6nrgdrbnagm076glm7h9bliacdlfvgc57ix1w2bcfa9in82',
                code: 'ibyqvbj6nvhxilykl9mawlt8ro2saozl8fw5we70dh3hzx3hwx',
                logo: 'e56ex9vzbdh5nux28cx6hascyyybm1lkx2z5l0u5htjoiv2ppa2rgczqipsmq6s7dnor2yw8tlamsdtq4g8hym6xo76f4d29fi1unim0gtlkssgx1b67i9p5kxpex3dbubrxmwrsmyb98hc9d302hvzo37hj66mv4dnx3rvw09tygfj263orlxr40isbczuj6oxq5guackyjsc4xtkv07gptpy7wd00co9eifav0ueg8urnyjkqinurode97mhm',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '61a340e8-89b0-4f8d-a40f-f64955769965'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4f90faa5-4763-451c-b3c7-00053f251e1d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4f90faa5-4763-451c-b3c7-00053f251e1d'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/7d8712e8-0b29-4c52-8f96-e4f17ab48cb8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/4f90faa5-4763-451c-b3c7-00053f251e1d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4f90faa5-4763-451c-b3c7-00053f251e1d'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd36c3a9a-f1bc-4320-b73e-cdda602eb7f9',
                name: 'rojhhrn8jn8fyzmn6cvfhylwfk9umpq9s2hogbi5jfynhv3lw0e8dawblm5ae67j3v1bxd8vbow39te69ows05wlk5ejkkwpm8ltxerouniylyhhfzchn35sc9ay3knw8txy84gi9nqvgp23f6stszn4uo8x68g95zalj6f22d6ott2yzze0uik2tgbpgk4b0u4buoip02vd7z2jn51k59tu6mmkutf07qt2tqfjczje24advznut97ggzheyq5',
                code: 'barctmxsw588s3uit5d9fv9tkbkwg0wxedizi5rzm4mhyf6k0g',
                logo: '45c19bkuudni9ii19dchzw7hzast1vh5qkv1c14gfjxberimb0jrytshg2ivohbdkoc1z94o4v6a4wkmi7syvns0hrkrvrrxxg0a3l4f7kfmpcqmln3xpbeerdbqo00ufn76ofqgpui45km1hhdl1hscv1y6gqa5ixcm2bqbymrg3qt6ts5187nkovuw72bqmmg3r9r6zv9nqenbgzli1qz3pv9h35wtqjlmoqxe89rjou9lndqey5w3xhzu1qi',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                name: '17gns9xbwoexa9ri29a4mslu6xrmmcjw8oirbhza8eulj5ax53ddiuh6d0lzsq3j9zm12paj65ipi8kuxo1rhaaihwv0md92i3bh4pw6ztifa05hd9qmgcj83qq9u1cgv3le60rn044fig0y4ludwol9cj7prbrygltzbdegm59ac95b42j1pymij8rttlyol5mqifporou7jf9bhi2gbabfdlrng8z4xxlts2hzbe2gwks8bhppltvcf1m34gi',
                code: '9v32ff73uoc9448beg8wgby8h2e4uazn42ayga0ys9ou46tfrp',
                logo: '30zthugtjahfcnkqeuepbmaiq5agb6isj8gxoz4z34sjhkcwqvkvd46u1p7znszoeys0j042v0hvkso3o18fpicltdo02n81iz83xtsbjg3o1af1ax4yxafdscy15newqcggajs293sx9gvkgmt4a7v6suj42fx4tdafyc75xij2vye58j4n0ahxd36h4smqxxchrov6mdt32n58t37gdtk5h44hh9538k8ee120xmjped69had9374mdr5wsjq',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4f90faa5-4763-451c-b3c7-00053f251e1d'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/dc25e428-c3a3-419d-8a93-a9a784d70d23')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/4f90faa5-4763-451c-b3c7-00053f251e1d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cc0fcd45-370c-4e47-bd2c-befdecc2865f',
                        name: '40lsiyaf6vx081czxheppfn4ss2f0tcxw0jq1ym2v62rrc4h1kpp0yl6e1kjabr1gev591wetn7m3ye1vmb3w40nl9rq4cq667ycjlg0d1z1x4ihy28zn81o3iui9ksbah3ekn2ev49fv67dtw88hu128ogal8boxf4wmwqfxdof2sjz3ztmg34ngunevm8te97gh7s9y82oeyp0p2auft4bpj7c1zrjglz18yeskg01n2q4b1u8asa23gzkje3',
                        code: 'piq2nmccgwwu7ik0ci5gs2tjpcvbaowfen2kkrqng1ms0smkgs',
                        logo: '89jekss638o2wu2eccf0d9w1hr28iu8jfrz79xp4wzc59jw9bd9yjc3cv9blvg5xe4xql85gkwpz043yic76xtjs7iqnw4241xctg1c3n3aj7pdmb0pzy4wrkm735uo4r6yd033cmr0c32m6k6b8aldzvdil5pwlhpz2e6gjshairznoo25x26sp55fqivnza58waquq4j7trus4sfp62mpw7j9lmoxtg0vpy3ow35cbf63dhsgk8bkzaxbo5qp',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'cc0fcd45-370c-4e47-bd2c-befdecc2865f');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: 'ef3c7aeb-b32c-4a78-87da-746e7e5ae189'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: '4f90faa5-4763-451c-b3c7-00053f251e1d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('4f90faa5-4763-451c-b3c7-00053f251e1d');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dead6ebb-2dda-4cc3-9fa4-2c6725742c68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4f90faa5-4763-451c-b3c7-00053f251e1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('4f90faa5-4763-451c-b3c7-00053f251e1d');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '94a74096-1c11-490d-b3ac-adf57192c14b',
                        name: 'jibrw7spoj4z9aenwl3m34rrs5qh4ofqbq8gr2hjxc6qou6tgfkegruajtdsavwk2xx6glcu859njtjbo7zdx6ojwq2oae0ez0mf3oquj7rfj7qivatkzf68vjlhjy7xh196o3g9vqje3a1zlu1ims86yc640xxixfomoqenicfy53e2agpfkrzo4pzjwrkol06a74w2h4uqkx9ligl79ftzhw7wd7eh8t6x7mqrht38bibdp5hpinnbe6rqnp1',
                        code: '22j1p7gf9c7zp00pk66c5gk73up9oz5dz1h0gwqn0n5qux1x8b',
                        logo: '2omj0hnt18lcpkk999qilmkbskri3zcfi0v7z9gdx8d9bf89l5zk86rz3p5jdeafdcgcrrv0uxrgq5ciu0rfv4yibe09k14gcbjjsdlz1xzo8zdty9lzzy9lsow1nsl2w4rthrmbkh7vs0cq7wvxcpa21cunzkma8inzvmx76s78aycmiggrgxr45qfnu66bjh3w6fxwcw3yu5uv9bpp1lswxt6m624lteu6qcisatrjsozc70pto536jvk89a9',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4f90faa5-4763-451c-b3c7-00053f251e1d',
                        name: 'zg7tz0o8ih8y47nqmtub1os52mdvm2j5fl4w7s3csnmoflmxlgnxjlyv5ukduksve2bjz41kixtovurd5xk87bktkw5xpcuhwcsn010n5va2i1zzj4ep8yr6sgztnql00b6uhoeiciywwsz6abqpygnljtwg18o88vcfadkyvm8z2cansbl9c52byy7bbskjqau5nnnw5q7g6191agv56agyk9dcgek3ybbehndyvy59cif4pbrjd1en9kefq2i',
                        code: 'o9ig2iafw2myx3wll73ivn17deul0o0w0jkcmrcckv20dc5sdc',
                        logo: '2zo98h49drpwgtvyixquwe5x4m4hqlxt2f6posbe8xlbp5ser9qx830ues6saiyzswrzjlquu2k0wdoidw9w3eq6zgq3xd6aaefxe115awaaedq8escusnwyjnp3a0jy23j0nwzt8degykhvu12l1oznsw164hzsy9d0dep5q7coyifsmhz2tlbgp5tjap8w3ervh4ml62phs62r8m4lnproohuohlhaobrbjlhp563ev99wwphk8ymr6jbxs3v',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('4f90faa5-4763-451c-b3c7-00053f251e1d');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3235b800-9fac-4853-ab94-b1f3114b51f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4f90faa5-4763-451c-b3c7-00053f251e1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('4f90faa5-4763-451c-b3c7-00053f251e1d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});