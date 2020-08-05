import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '4iby5jnt4202leukbxdzaru22xkxs7h5a1sgutw18kp0br9wrr',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'nwsmfqio5bvqx6eyjx9b',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'mhoj1u8gh4jyuxxwicrocopzpyl8159pb4167954kqfruklxv7ehvkjrpavry9zlg0micgnlny68x6smyss8fvaq4cxkjocxzhhmdiagsm0tx8rsdycyd1uysd4tbn39ssrz443ewmcrda75xxvz01i7ueqog4k7987g7sxw71tlsrz62du91w2r5fxtpfr64bayzroxo1afp0jo3qwz4q7sew8jooq9xa1ityvp3uk7c5duchh3djep4px0axj',
                name: 'cdc7kinmz9muaya1no5xlocweseraea7lx01tn2vc37evn542qojp1zka5qgwf7x6h6icipkob0bq17lf0pg9e6izcijq7c4xusvtb8bmuvg8x65i4h2r2rejepyot3g6qa3z6q342x2p1xyr0sdzseqe0krfera2brpzgg593iqbug7aai0l2978e8rpb4lgbigv593k5x892p69v84wpqnx56x41mcehqugma2w8omy809s1qj5ig7oayljkn',
                surname: 'u1gn7um1mtd440hgmvyepbsm80ho1b20eic1q1ocajptrf1qr843xo7hhgewaw7ij882afa8r0a0dyn73oo3b70ely6k07v5yk2cndi2ssecbosvzl4yqmsyxx8op4wx0s1hglnrqa45h7hn3y5fa59p3g8r15kp8yjtud6k9s6i6vzxmz1p598ytvqvzme1c5qy8gvqag4rgd2tcynp9e0zz7l7z01zsedhjhwuzmwyyyhnliw9gtfuwrj3twt',
                email: 'x4gecu6be3727wfixi34u2xx9ixd908m2j835ftoykyzxr4ea59w4b7b77npr3tf6zr888rn6hi8u4apvtvxni0313s8sard40cdu53a7zls0nulgrqosz7u',
                mobile: 'czbstam05hnz1zxixnqsir1x7mrci2qb8zu14jhtitc95xcfkhv2830uksq2',
                area: 'd5w6okptoj8wm02uxg1yxfelwsqgtebkladinu2avri6ub02b9tpe2bzbvgc6s4l6iiagvth5f22uxp2jb32vbk3ip7031xzwojocl7ljtxsv0j0kkug7n3zjsxlxkvj8glp5vtvqki4pefme839j4qtszmb48lcw7jagbzbb07iripxf8eiawrn8lersh9ujdpt1jq6gy10nhi4uqo30ey5yhfmeaf70kga341rwgljvzx4z8izxshf37tt08c',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'suud7qlpsy6oc71rpponh3inyh6xhw5i05z548f06qsds6qr0m',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'vlfo1in8qythk1pezeb5',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '0c55o1k8zyhgc5ph6dh7c7yjrh4rngtu8mj6ofwe44pty4s04cm4vh9a0kw6cn9zgvldm495x0jyg6quqziyy2i1fvrfelk4urg63ug6nvbklcv4zpgbqvqxemp39m3qoeekuexcrm0py3y33mnpsl6mbldb6ew9k62k7t08hxwvjdqzw2dgpytyc2jegeib1uhdq4hztom1me95hum1isczu5pj8z6rhju9pd59yfcnxb7ovr1o9knezcrhgn1',
                name: 'bm4ns4y3tn9uuspi76qjceu33lo3ikkwrajxkekt72d7ogxbv89dicm2qepgjfmq0z03r4hw6reomzsrmtyed2unc1vyhl5i019c6uldnyfe6l45puhii66qhg48yq41is5b2rgrxite6m5otxuvncjqvc1aaz5hvf5b5wyedosm11r13rjnz9ga8d37h4a46m7zhwxzge4gpy63pv8un3nyjfa3ikifalvh6mca82gq9x0nrxr9q33dpioejc9',
                surname: 'r8d754r36x9bnxw8vbb14s43ysctw8n0y9qjq5mql8qionhumv84u8m5kepuupojxu5z97caugarlpsmk26r8g7ruovxnv0drl9vpvuly0m0bo4woc73kj99stlwb9p2q2p5aykf5vxndg9xkxyetl9y2gjc84k8kevn26qephkljddn23dw5wqyuu5d0kxxrnasqqewjy4njqr92isfaacoxxxcd5730s53besh9n7hvxngt4em6j4as4scpbd',
                email: 'p6v9ch8iqrv2cvj0bv0chsgshfczdgxfqhf1kxwwa70mfdaawvz0u4o5fbd1d3q07idxmimnsyvzhr4am3mh99p86g3bcwz9nk7yffk6sjpp0v84wmbyzkkd',
                mobile: 'bdfg5ik515dd8kpm6lcmp5fnixnaioxjgavmdbzeb6t4dfan8i6r0m1pai0m',
                area: 'kg4gyqd6hpukhmw2wwjxn2q0p0vcnf38hflqischr473yma1vlagvz1fx69nu7gqfn2n84w1wf3k8x2g3blt9j8ftx0327oweh7ztztvs63r0wgxu4oy4rpgb8asl0xtb8sf1xjgwbtvz1cfhi4jb7ocxcv5lm38f0t73xvh7l71wnrlxyl7yf55xd6ohk107app55a4s2nuolh9ueajuzidh5vjt7e1j97xka0rt5r0zrkyjv03u59ihksoh4d',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: null,
                tenantCode: '5cuc9gsx5k0cwggxlye7lxdf3vbdtib76574hxj13cxvfcrnl2',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'znwoh0j17vut33gccive',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'oeugbv9d2u5km5h9xjj6b6jh9rb7mgjvffpfxqekja5w9anmlyu19fx7tbcydk863tjaxdutnr8z03iz205jjsfhtlha2wqy1b0mzo4ka1sb00ntsddp95qn4nr4fnzi8ke03imjvkl5nhrg0h4rfhvl2kukx8795j70wp0gz1moo091cc2mrbrac1zajx4zy6ctbzknunq9tsl43p7i8mcidae7hvm1o2plz3ft4q0v9yx9kjyvig2yh47v5zn',
                name: '5yzjy7yd4g6s9do5sg6nkc79fc7zx4pxj9s4x4yvsl7me1qmc3xnywtdr3owagxznwfnskj0hnyujepk2ch4fbe4a71jsx98jki1u2qqa7eg84q4eyoyraah5n1yqmk4usrioh8uuxmdykiw2m6bfmnso2aq68gnl4zup732ulaf5b773rnl2axvea7kc38eii1b2nckjupmutu98czk5u5c906s8f63cqk212cr82xx7es8t45vwi43wo4i906',
                surname: 'uze1j65wjruxjyhgbmq97e9s4t5mvdrp13szcbbdehudlbk8gappga546b5my30j2idlodgygpw81m9otuikvcxgai61s0kq4j5hrx5lgbmwadzsoxdug2uhcaxuuqjf0g6lpnhlmexvd2oqbmdjehh2igiw7c0wn5utthbhb1ymudy2cwkdpdvgc4p8wkts20qqeysrx81txlvyropkc7dckqh0v7tt9wvgmb4xis5ql8ic25gktf3jfxy5sq9',
                email: '1ogtxkh6uyhfpprgym0qp5h4byx954x11powvochz3yvwbj5hg0dnh2uhqda7a32tba4sj1skr7dol2h95zdkbv6lri8nt3qpd769vsfe83k93qugpxcjabw',
                mobile: 'ah84aq06z2lfc0th8jhwste4ktuyzv5ueed19t3fxswo4d4t17qdoi9uxbk0',
                area: 'p9vcir09dlzs2oo7usbkzfnjir6o4v8kysvj2w748p9pmk2kytpzb6j92tm7fje5trryvopecyibu42o13ruw7k31hctj0wjdujn87gw8rgyq3t0cnke7unuo6037v5jgd6ihfvqo9d16ifxgh7k0vzgk6pd6dks3nu6fa5zhq72819523ewvcy1mvnww7799ry970n8hvb1np7ssdl4g8cw3z11kxbqm3aq2k8nf3fy4q386xkkqsbtndg82pd',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                
                tenantCode: '5f22vzyrhad1z07sh1z8wq1thhu12tpvx9pvxxdjaq07blsaoc',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '8elqd0r0mxvpp04dijq8',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '2y8mia2pzbjghzw7mal8s0gi191on4ydfzzqigw29r7v4cqh0ybdo99kcyawcgyfgz80y15unv2a77lyp287gaepptrumy6ldkebn9sj5yrfh2b364wiz8dp3bds3lamq7143lkmgfd76dppnt7jive53pgeaxyq3is1knj98r34ewf4larezrsdknrqoyxhcn0ba71ask4wxum83n2w9411mf3nk4m8hf35oigb0orszxs63xqbx52mi1475fh',
                name: 'vtyixb51guip8a8w2bkg9lzpil4vmzkl4z7ssch91cbbzj30glkadm296plrrzdumpnzpf9zsdyk0v6o0j2vrxp84g8ute8suh3wzsagl2uogqseauf75sr1ycu4t5zy6ztadn4lywildlgsus1i1x2l2wcsy7m1vk1ge26hb8qgpyq3f82jlhj6z333xvk1o18yos1buc0ylv7ff8hxfbeqnb5hoiycr00z5bk4m2eivukfxnwmj1e4d3nxgg3',
                surname: '25vqlk1nk0wi4vgmdld3uh9i2tuir8enp1tix4t9q20u80n5cip3gi2br5n75raqefspi8u0bkt4qpm8jm1z4mp1ggtmygo9llocao9ym0c0gdwyf47fw6e149ptkygcnlh7uellc5paf18duz4mdjvsb65jqy6aqimyhv86dydu2pqvifnayw2wdauglwx12n41pmuujno2zgt7u3irnxv34j5f2optki0omtx8madbh2gxw1by82hyh7a4gm5',
                email: 'kfv732fv3okbe8es4o5fw594wieyhpk61xatstixjpkiu88tqbohlnhwz2fw4yuta1vnr7gpuh9l0ikuzldhi4ccvm5k50tswko09pfxjcsqzvxrxhwf19sk',
                mobile: 'xg6mkt87cszlsc0b6mqiced6bctq1bbxvmuizbwny9mxbs902hf0mo1u43vn',
                area: 'v9olqtsga0chty5mn7bco40xuaqf93u7xu3efyh2se0jrrgxxgctih0jjtsrc0yshxvtxk5thnwrc952mdmbl46szyfpc5rnhhiox4pocsfokfnj0t7529no16bv6ur3sfsr79cyya1z6minyt0sy5juj93ei46q50rmmq572zws2348hp693bhq5fnsuufmibprmx61nlwz09d996mlq0n0o71xr88xptwqe8aj3medh6m2gluvqkaxcj7b16u',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: null,
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'mmk3wifynpkdy82gw9lr',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'u5f766qqz3c3c7mzbzn51xdwphfkyp9k0rrelsh2659uwb2g6uvh4qxb2r8dvo6nn6niytf0ug77ectweuy0wguojr4qrg5skog08y7mkddfdx301p3aiqat5oq9pucfjq6haxns5a4vvc19asvpdrpigcnmq84fymav3xvk4a0eib0vax3pg17050wixzx3p7b8jw8ttcizfr472qk089qt493yw2pljw68zctsb1t0mt8no281a98lw5sp254',
                name: 'v29ghtezaw5tjsgb0nc9jesugem18gc5cswzx67okq8xznpr4fp1ws07rnq3lejc0tqv1hjgkqrgsqugzhbarg01gpr66ra9x1iu3rotbr5gfjcnvhj153y1qzv2n51m7iqu029hpsb8s6f1ovvn83v3s36ofp74l2bdm1okoszq3rkfzo6be8djcu7mrpruxksuffmtee8q5u4yvj6u1ssc31nc6f2uej9ay401pt8xrd5rv1ktjgd61gb4q4t',
                surname: 'i1fx6gw86125jcdotutgwkbz85b43us6hs14prt9v68k3da0v35aplrjrnp1ydl6za8gdhahp4eljgw823ngkz8jdtcqxbgv41dwwqnrf0kmb0vj4z60r6f48vu56jn40l341zs4pxdp0jiu7lukpwocpdn3498wsuoye7mdbg6jfnv1p9dl6u1arpj0l3twiza6lh48tqo2jvmybyj97bocxnjzr3x3g9b4mq0kz93libqg1172reit2rdzadd',
                email: 'x4xp5ih5uygmrz9z6n21gbobq8v842adsnfkc1kwonr1qaq9c3l7mkt5wavy4hl8mfsmyymzuw1jrvi422xnjbyyhib4jy186dkil1shkp0p1nv3tyq61ldm',
                mobile: 'zg1lnrzzl9halwog0jfevk9pbp2aft8vzkkqhywxyledi499s897fm7cjbql',
                area: 'bmc3t62qxktw5hvra76eykri9uway0rwyxt3ixww5hi916fb9vvib91n0tyqbfnqdgm856ln3ntrieddlqnqt749632dxidwons7k7lnyu5feshqg1ciqe3389s7ud9p9jgujc977596255j6fg33o0fs51f3ehaevgowmx2c0adv7rmcp0gat3r3ncu7w41q1y57jisk8xkvt56ffkd6dtanbh2jc61w82cilpxlodgwbnmxzt1hs3xih16msj',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'e2mcyv3v16u5xt8g4jyc',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'jjv7ojgxydy9y6wtrca2wxsav0o142axtupdh7kkzemxnuipvaxw72rprj7yazxhdrjmt8lbnm9hu7q96jsonl5hk7cq746s7321c5myis492tdfkc12onithlrg8z56naascvcx0eizeev92umy8ja9nqqmuch538grvxp77jsjptct1yvsdqvepaiqk24gpua9mnqmzr90gdlbj4aabpnzdzzhzekb70ac73wdqb6x6tcath1be34mo4c6bns',
                name: 'qyu66iod4w5d2i3lgkbhsyo55tp4osa999p92wyr5vu9elps7tt5c8souvkgcc4ew20z3f65j5c125xcnt3uezsst7snal7rcemjybva1p08qx3flcpoqssu5yvt8gfovtd4jd9fmuo61idw02kfpe4x2ez2tkwucx7vnwb0w90f5t8lb2705b3s895o1oo9hk4o3vz1kqx2ikt578iuc0n7xoij1zseauh0p4h08pzf3bdjc6n8qrv9nj0xgzv',
                surname: 'vp9xn1l6o2cu71p6tu7kvlj3mm9v6g6ncwzvr2jjtfa02kmswjyqjd1qz5v1z9syr78n4y4wu92d9vkh1i4allxmh3z91tflnh1deq7u0gvudp0spklngb65o475h39j1050be1gndfqh6gf46e6pvd6n73l7uw52356z6o8a74yhd1j5pzl110dd537jbqrm08uu657z28jzx0av0aixxu32r717kvst2lw2hn2kplz9yxotpytyv8gz5pux5o',
                email: '7qag673kkq94ye9swhem1esikgrxom57pcuh972xz6xdmsjpwj9fhtr96fbfkqgrencie6o4f09fgyho9d1rfgc32kx2t2jmiro3b4xvdrv36ptw5b0v2qmr',
                mobile: 'on3apd7muvbaxx2ing362jy9rk2ud53donn256x0a3c76c5lwcnz3bgttxc3',
                area: '1o1urybyh2067j1n7muw2vw64ocl49a4xmbxjpv96hvos3vop879utagaxtx7wkg3gq73v7317so83buiufdiaeu4x2ziry4fhkoptw9magpruspo126nywayblmjxns6zcczk0nl736uyr7ltkxke1cr7t7zsg5y9otrlxd4tpyg52vv74zgeqpzqqxc29xendk20cyfcf8zia261bnehb35ie4we1z4nk9p3rkli800yaqpti6ylx6m6zya30',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'xapovp7ssr5quzm41pp6k0qaa4wqmt7xbt7d1y7z709l1iwgbz',
                systemId: null,
                systemName: '4o9q8tsyz2qjqquw17ak',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'ebuncfkh0fnrb4jrxi4aal1k1zjqehfbc7fbdnp00bmf4uad9pjw7gvuvobpb2fweu7nqdg25ygdhod2m98im9lhial8p4b9mmap82ao137t179ubqhmxwwxgxej92m549hco2avl2vy6adc9y7fgvqesa63oblwrc764kol8xcjbi5veg5wgrry2ftus0valt1fc54qkiv0vt035bfhcn4ezdnny1058cxmm64kug6iwps46bsgehoe5bf0hje',
                name: 'd4m2kyzeiunpb75r8qy01uia2q2z609s7rx1oy8r57b4y763vcoaiqap8vovj4o6pe5fzowx3fwgyu6p0xlmxnuxasia7hwxcdkjlgsvh1ybov5lz1ubycvd7sirfxby9hex8cz7e69qg7q2d47t1j28olehh6xzsbyc06x49eewdzzilv69c22ow7q87nbdu6zs7moisnhb0z6rzcyjm9y0bwofqlfrxutci8dsd1tpqqpmjwmwshc50cn88l2',
                surname: 'tlasr8hocmeckcthphdgfknzta905m3q58zyxllcqa7tibtala0stb1uxrgjtothnrlh92gpniiy693po465u2hp0q2sq669gf8tqfax67whdh3cg2x0eqgb3n97yz708vhlu6cbf48n7qfuvkwi77cfbqpele07q4tis5pvpr25uo764r633plp96s51gkymeoukl7m4tjtwmy6zmezp4g3bh8p0tn25oxqhr2k024urb7w8wlbeknzjcyxtd6',
                email: '3o3mqm1ul131wjep4hu0xlw5qnxk137yblp6jc30utzj7o5a7pa56749eaj793jobals8fdfgcinnqkzky2np6zbadgs0qp8dit25w1w7yx49yf1noxuyz6c',
                mobile: 'hguzdflb0r1621vtfmghrxoo7ij6mv4jv8glphcx24w45klf47uw62grdc7t',
                area: '5psaierfrplf4qp04asl8ntkzxk3uli6aoongc77us18b9qkvdr6t7agbvmb3dqjotsi3v98mw95kof2lx83bm8zuuuujh25xot3wdkw097b4o111pqggyonvjis6tozcmqqw55y3mgfdgb6o6b069s1uftds0gcp57vgazdct5bp3yhz6e84lt1t446pw8namaiuxxtatm4wo85uwl7hn59o29aii24iw0zsicbm6bx9nsqohjqhife2qrzbhv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'pmc82nqo60wov7dibywtq0m5hjnyujq6ur63ws2u4s5rl4j3y2',
                
                systemName: 'h12f3ho96gzh1asg7v6r',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'ioxrqm2gi02dorw687vem33y0fg76ls55dl0xp22dmsaijtd29x17hfdh16hvmniqvmt88lojbgwkp5gfuikcd1y6ag444s6ruo0tb89kjotl7shln2ogji1wilm7tx61bn8flv1sewnyjhhlt8bwjtjyruligbg8p4ppiwuq2khbkiem6ypkb4azh0dl1r9kfgp4yx22chv9xlg1wd5334om6ow75e4dzo5euqf2fgsbquz43hpfrpemp28qgq',
                name: '74jspa4ttwb41f0kpozn939rj67uimol1chzbvv6nfmjvs7gxoguz0or6zzso0kbg7ra3ba31r0uxh8gjcv8scfa56z9btgf1txl5ivu41p32wxzx0z20kh0xyhgbbwsvj8op2sogeaycpya9bz8j4sugf4pw94xz81mesopqttoou8wey2iyazaoepxxnqfuii3fesyeyr4nzl7xxdjn4b5t1pkcrysgtdzck2zquadfryzrs7iv4dtft10ir5',
                surname: '7g8ek2n6gbpltq9u2vw312zzxj6g9se7t8751kta3dvumynxw2reaepgnsuohhdyql676kckv6s3sfuela6jwpvuu81mji8jrbyb1b7wx6xevwejzxi1whddcsd8rk12ru5c8jncuantblg60w2i8zdkhjmkcgxem701nkpcfa5mlj3bpwmbcy9f0i7mm8add8u5x2bbp7atxwxhfqk0gpcn8kja5ety5800qu3tiw7j9toxqgtoyjyqcmpw2jc',
                email: 'aa0dp0w79kx56yblpff0k2df4x8orl4a9vue145evj65kqsqy9omg35iz2o5sb3j1nc7laqbkhowim1l09inju256h3teepbgfhh4fns9b45y0e803v5xl00',
                mobile: 'jpxjcwxx1qsf2ttu73078m4fa1nuzd4khn8y50kk7n7r8v5pg06mt5jksh7h',
                area: 'b4su1wyngytkz825f5nreotsl80bmdsoe1mntpt9vuy20uu7385suce0fkpfdzbd3gju6r332m02z9tvv815zl8rldgp0op10lu295jxfk4u59w14na8624z4zoitkm4k9wgg7dtkl4hm4suxn0ec5paxha56j1zhlbh8thwnz0h2ur3lz43kwlot3von3h18pft1qmrqddagt2ulhytxbio0u4pwqmnx7hgue7qgp6xp6cddr1s9cd583yiwgf',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'i6qd7se55173rgba02m0haeqr1qfmscxwo3mluot32defun57e',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: null,
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'ppcz9v9gbu7vrmu69awtn8lneyn9s2qxfrdmagt9dhcuy82hyi78ln1436prx0wvgdpa4cll3ke8y8lzupkukoc9tbs300a9lz378qjzzuhste89mmjhaeszynztrd5vhl275q4fyuiec2xivmz4fdl7hr5rdxd6ecxcoiganbzwvrnd2hqaep5qpb8g6i44gnt7gq3y06tkt8b61e9gbdzd2bjcdo3v0o0hfn9v0nac163rq3z8ugxsffffbe6',
                name: 'nqw26ggyhq34tr0jldo2clpev7h8eu8hhzgqqpts48nu6udngxex4eh0nma2geuvghrfdsnmflxtw0gxmkkcj5i4j1eis2h85mp67n5vr0fds248je2vkxwnh39jwzwdzqc80zoarg1lf4vbmvg85xcuoreetykjpod7uk6pr6fryvjcas0jslht7gciv2rnkig8oi0q37xnbug5xvlgyjms4p486pe2hfhh0dzdcmemx35wfjf0gxpm7r8ne7s',
                surname: '99anmocm7wurkurrixjpbxkdiohtt00eyozxu8pf8dr95rywsg71wk6m21igg9enn36x2t4qb7pv8kbdt1d5t2cutftnni2csoe7r3di4v7j7jusaku81a6dx6cxsrj6o87vhrdog95nbney6m7mxeatt54woxk3a9puvrj3f5htwsjl5ry5u4iraesyt61kurp9otxbcyzgwuswj6r86276s4dbo0rct2gvyp5g5ldnnlnoq99lm6kym05lda8',
                email: '3tmcnon5ng4sybi0r5o0fua64v18htjp3jsp4bvztxltitif9nnjfd6cyga5vkoc0q51o8gev3k3xqmo9fh02w12tyu10gmmt433pbftqg7zax9oqhaeoaj8',
                mobile: 'bljqbsq3atsrnp0x730vg10ddnj28socglbk04cozhjsd6biyghdn6t6sat7',
                area: 'lz8hwgk28miwj829vthcou1idfhdl7t2m2pe26eqytc6qj2ltwu3f1i5wghgfy3gu8tcy7j2tj6tcuy7x1omtdna5tk07zilmm7y15i7ehug0y0t2bn6eilqofv3iki5q4f034ta0wiwdi0gmlb15sg31o9jv6i8mbge1sb4j1zrx3xvmlidmajmzscum8f4r8lsrrv1557nuwxzbr10gw2yasg5zco4ae64xevyk8yalgamagwb0f8y48dlp1d',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'etmmyhzn00btaw22mf1r8kvpkqb8gtsrhn1v1f43412u1optjs',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'pop46s3nntvw8z9x8uw6ecvqmbosv9vawm99rcs6mtf39q83m03rzx0a54j8nnlqgs9utte8826oaz44db3ddwh4x0ynl56dztv5db70z2xris0zv43hk5uw5gx65oh4t0ekyapwbd48x0lr31nhx8vt55vrx2x78nlhk357159upop8itj4j1kr25fdraqtd0tgi4tz3amqo6muopspgsyr1t1klfz3gh0aq1o0rzrl7wv28zch1ikbrws9nha',
                name: 'ngyjn4o2mow6geb7tfcxi8olu2fqmps5e7hqtrovlxr5sh2y6hc3t04my353zuoeqvqoz9318mrbecjptt1o8prlfm1umfhlllai7i9vzgecjt9k0g2hu5zkxtw6r7x4g1ugx36l55qfeg88pf6ut1zozo6zcgy5exsdy0k73bk44uil7ob75grw6508oolg8gfgq55tffrlqy0moj9it4w5dhzl7o4r7hxmatirmn607uwn80yimzetvzy1jmf',
                surname: '2j0v3qd6okzhs0bv4bu6zbtex4xxqn939tf7hc32y18ydvq1g68fp2d98p2otaipewqb6qeqevii8hkgfu9kg8d7cyobomcgd4wa2xpv84bbwt6s0j0nind8go85t4qidgtqqgrzhed308wu9zo7ychey8c5akgdn7vfivc3uvo5gftvgz1qgaiptr1j0knmavhss7us239l9q2p1fc72nbj2ulq3nxltacq5f1n0qzo9nyocl8j3rps883uk7e',
                email: 'ekygb3g88a10d6t79rdtddgjwwfw3d08nx7h2tqsbivz12b5ntoln5nfp541ctkj2xynufntiazdfbf63iznjzm7qnf8a8uhu0vk73ies4fo3071bzbnnqcl',
                mobile: 'i6h0txvmwj72zj3fkm8gfd97y8z4z7b6owdwezg45aaxf3uypevf55k80k7w',
                area: 'l9yejjbo9a8ltdwior7mdz3au68gylqxh1yp8i95ekpjaufo4lqu19ydtpw6fmjazva2kya6tepuqlkvizvbyk0mo9qdggct717eiyxmuroyi65glrjx1bfzjt4nva2n5yn6prhvumx4y47jwprl3sleeqiuqng6jdset7m3hirfgym9tprxt8xo5tahhp0uw89mon8ypakw7e9pjrzilzs3khhtn2yaucoupyjx84xkuc3mjtehig18l82wl0m',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'mcl5q161sl0i0oo32o0glahedipjhlxfnk403ymhmv9qc7tnu1',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '5seyfodijalsvx2al671',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'qqu52tgnnencidk7qih7p1bpkgm5narwytfhbajhdbja4pj4wx2rhug77k5sczcp5c8bbcqdk911z1o14vk8npvfsmtrwtn9ccvj7lvz59ckdrrde3xo0s2fl5v1owwk35ijyxir9smd4gztf2nan56mlf0v1v359pvah4wge4t8krpjnx25kbg3wk9p3rb34dsphybhsle3y9isoleqetjbw5d49jg6o1ixdmx9iju4lf2ts4bh4zzk2hl8t9j',
                name: null,
                surname: '2uohwb3pmnskkz6pw3lrlbas0ysryigg8mxiv1dn71fylflymib4ssvdgiohihpt1zic3u1ld9fclsf6y376i0w7cebaaf2svsz9bdsi6lsiap7fpjb2trk6mch7qt47wknqwqnaex6e53smqpirnoq4gqwasoo8s5uqtt6fhbc25hpes116fs1ilnxphx4q4lavddo70qfj6bswfwo4sfzx6mdjynxa7ignigyeljpcqftzcyozs7wehgw6r3q',
                email: 'f5jskjellgqsbgmsz8zm5v2qkjo5yjv905taqv17xba2enppssp737wz8rmi19ybjhjbjxzw9xn4fdyo856cjdgrx1wsavw071pzalwkgkh2q46q702p86cl',
                mobile: 'yg8l4mhvld39x1tz9ru7b13fuiiqxovorwq0wuhmoijuolba7u55tqvoitjo',
                area: 'u5kik7il6gpsn2jezyq3f9s6g2ue4lcebpp884hi2joxtpwehcfec37fqn4mv6xvwt8cu26d9b9z3r5dhya2hlrohbe1xeqjutud83autlfejuf9dtkhnymss28mlo1qsdut6eojzlslw9q1c3ae6zlxij00m1u99f718n7xoz2nc9do4639hebdrkcj35l484ox4p15hzhg1c0hursj739n1lbkvotvq5t6tv04cgb7ga4ltkto49n3uplexth',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'erjpudpbyxmyrctwhy8oozfjjunjx1g2euht8hf66n7846fhl0',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'ywpehy4vpzdus3bz4n4g',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'kpaw35tj987kwo8w6cvt60up19aq45qpdtuq4spo6swr3s3y3m55q2tkvkhqmsjcsodqvfmcuuqtweqmbddi6jgthwy3hfhchk66kv730za7f8ic53pn829b6z1usbmnxydam0el60iy55ytulwuxqbpdc0fau0bunl3ehnpbzkzjysla8c9zesclc9kx2ubwo1o3t8axap1cwdec2w8rvi9sheuoialr6erc6zobbpxx30d1teg92htt7enj0t',
                
                surname: 'ijgbi9o1rthu0m6hysy9dub1nue642fykf35fv0vkf2qvi84bqeaebzbkg6kiu7cvceyre01yb554yzlnqvtbxil6r0qkounbbuosz1sqcvbhsw9suilnlkiv9fr1jmvkne35f92xx4bkialcdnyzhpgobtutm5q9z97axjafsnmc3ypfctl5g87fr0bl0u4wo394ah3n587ku8n6ieqrag5qqdi012lkziy9wlhqjhtcw57zsk4oqzdxctik4p',
                email: 'bdizo8wnqrnmjh1ky4cxu6r6uccxn6puaahnj42ym3umjyyxn4j7r569dkvmc3xd12fwj741jzeppcu1dnb5lhq1t9qy9972j2p9sa9gszlnfqmhsv7j5esi',
                mobile: 'b7htulew4zmnpfkx9n53u71g05fw7cdow1fk5nkmqt8xu4baf9pak7zih8y3',
                area: 'vzovh2mgi2ntug69gmvf9ne4etc94zummqxfvxvquahnr9l2csle1npwrbkfgwra1dxh3d27wsqof6wdqxf6zoykt18cq12ugchujwqaxhc8xoxdzcfzf7tqmc36oo7r1trqqdbz545lww49nx9gdqkp1zf9ecxehf2epwbdu2hcoo45ttnera5p93k6dpiiney9lwg5yw6qgkrc5zu9w6mh3f4ks3ft8pfmlk0xwgn7tku1ut4u3gxbzhea45h',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'r54pqltkya5ol7wnnomz6rgef5d6489q2tnrja9sg2o3neqhha',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'v4bpw0uvv7g4wky5r6w7',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '59aekli6pu34sx28q8epcbyulexxlo1j1dvyf1f89o1b8t0nmwe0q72w4ddeyjqxgo38ktiqe4r425kh5f1018h09c4dkwkionat7eb5wiva839jfdx3hx84hq0torkv4eyr5lkvuzewdbi4cta0db3m48bfp03l0tpuk8q6ktju4a4j7141lfmixsstapqkxlrzo0epvkaru8oekml0mzzozde1si9ncvnog31k3hzw73vhibo3fqwqprhao0l',
                name: 'semvcptb2srnc2srqvfx3diqhcy5963izc680x770t0kjnjw0a01nsagpc6t5sbl615t1c3r96a5yll6kvyila8l9mwtgfhcxzakttobyd85mtdvpikeyh0oc7c3iicn9ylmhsxtehjdmbzo3sj1wh9kdnx5wwd5t6pfd40oww8rs0te2lv1pjfdx23oh6u70lc3b5px1ohizd2qxjzueepasqey7am60xpmvkz69668350sijwo7getjhxmhx5',
                surname: 'kfakzqc9hfly3l8isvwum3sk1d9trjg9bwxcr3ivyu9a2mjhmuve6577znqzwxibfawkg0k1ne6p7d7bmtfqrdhwovx2dk3rus4roe4rawdf8uz1pzq77rqfwey4xe4gfs5tdm2ykbdefrn5qqtbh9kjuru4jl8htahxahp6amnn1ytmztfbr0a6qkvn99kcz3qgxs909tnzjydst703800v7645kzh8qn8twckx4mq81zkavwxsgcvo4h39crw',
                email: null,
                mobile: 'v0qwt4uug0gtzn5xgirzismpvqlg5gbqgrym3j2zhnfd8v399du1cgjm48ud',
                area: 'fr163pqjuc7milv1h0svq331b4j6k92xm2n59ccoyzuc00gwjrxo0tg2zl0p7cl82oqs1uynh5avfyrbxwionpud6kqyh445nmcwvvsf8w2nh3zxgnaxh6oppz4w0oru7k9z0o5qqj17so1ft59gkwwozhte185d92sqhetyj43eigk9g9uis4f3urtb4d84vd148jhkn3bnlbgbwrytncwpvqavc8js7ib7zmnjt4x36oalpq9iyb1yu5lxws6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'y7gkforth4hsq0ae87drritbkjn7fxxrw3vdys3zut6tw4elul',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'vuyppmisquvmnh5ipnuf',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'ltrogoqwhwrxnzjg5lysxvzteqwsu1rw8gfa4bu6pzjg3n22b0u36h856a41cya6zhytx35261tq4g8h8rkvzf8gmnsz43dshjj794zv8b2dqhq57m8fuqlfn7olip79twrsb3beno1iw10g55jf9jhjmc9tlbwuvq1uszrr2eqwqldwrxlazeirlrw411or5ch3kygiojildhx9cb6w37tjc58rdie1hpgwcjn1prze7hemb2om2xn8cg8yx5o',
                name: 'x4wqaytvn0qszkie58i8iq04f6kjjdolxd783ve4d77z0xd6a323je3dmbvz6qzcy5xqhdj0z08h6olmm6kyucqfzg6f6oqeu7shvycn9x7ohhii9d54z74qb4mtgfuplt85a8bvkri1hj1h69p4dk73z0vdi30ym3wnn0bqb5zpw0505ntcr0t79xzaj5x57rg7tqylr6mo82or16dctpz4qi10mgmgwazsudlkjyjyxono0961uctps7y6pic',
                surname: 'fmntvgbc25mdcw673kxuaakx2pxp4xxm1ip6eca02qk7hvoim32k1xz51r60wvwdh6yxmy9mzng52oth8cadugxdgkgx0qebavbycf3oar89hx2n6cx7zw9fgli7upzbzyqbipwm870g1emjzrhzvzib2l6fug181v9zsep5lzv86887khivte6w4qf3ld15txjoj2yd7h7c8uslkgovoj14w1ch1j5muz1gz8i2patkco0hqlsmliyri6lk05i',
                
                mobile: 'swb0i2uz1urnfam7f9s0pcnyc0m079kv628qqzc1fz3947usnydqtv3e1yhv',
                area: '9h0d3d8h2q179l1d3fz8eqph6g03a1lvhze88v2h44n94kjgcmrx7zcvpodsxwleytw7h0g5dcn8lodemq01n4wgw7hd2tbm898jwbo35apwdlu89jqlpk5csvr586w0heotjaj2pn89syoxxtp0xk4rwlpu6vpdke6xd73978ucfztm0vk7rb2xb76fzrx9suofi5yaozqexc4n4dm8hbq6r7lwigltu3ber7afebpgq64ytnknkbk86y1eyrd',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '4ivi7w5qoy8lp6wd2i1kil010gknfkg12epckzjmyfthji42zj',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'ds7zl8omohr7cpw609nk',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '3b4spiljpmwyibbg5m9zrpvsi1m1ib7mm670h3zzz5yme8hlcu4a18497hvk5ihmj0fva9p9sr83ytn6ormmhw7mft4wl5g7hfuv6q3bxv6wnbfpro02qyr1ovwfcm26wdd6cwv40h9ochv5d6jc2vxdhcaze1en0168omnfgu4yl33crn7he6k695frxwgueo999zb1npwzxcsfkic3dzsftofso7u3b6pfnuslpzviq1zg75kughcuruixk59',
                name: 'ob40k3nbb4dc861tyyzoeeu40qfb6q001kyxw9ms26cpdzz7howol3f3acq8qjemfv80swsxvjl7pk3jqhy1nljbj4hw066cv6vm7nhb3so9xsvr1wsrvl7wjv28xtw5e9te9pil51r7xrzt9ol5bux4z70rpadrpgc50pkt8vg1r616p8cvkml6tgf7y58sd2o2pv5ic4e45bwji6u4m4uwvzyzbjh8fcobovhqcbfweky916a4q2yp08tv8tj',
                surname: 'ljoon4mgcpvnqyd98jge9h94ti19bib2zrjgy650f5jm9a44qp647o8o4p8vvaubzyy0w5j35u7vfomqd31o8h2x8x4cr24mmlhu4w3j9jheycr3mmllcyt2ffrzp4a8rsdabt7pwwjfmec62ghj8eo70lpb2z6w0bys2pww9n0v6fyrfiwqk3lpakvj6pg5lwewvypdxrufdg95gj0zpzygdxthpjzf02t8e2r7s35x5d5opps9t6eutgj3fbk',
                email: '4cmr8vxj7fhdvz5ummpn0264f7bcdnl4kluctbqftnotjvay73j59md3fca0z1x1q4fq2ulzluy46mwibbyvd3gtb8hweom18oclqctw9ps4tkz7ggwoihyq',
                mobile: 'onflg20ytqla3racjw0fy6jyqjp67a9tfhrwmvpgx1xlg56y6hxweo3r9uta',
                area: 'm6wko1ur77chtqy21z1lot6ewemusvct1vurbc9d37x0584fp3nwimfd1uorp5333s76l4h3f50lpl2obx2itarnaow3056gpkn36ik8r6gdo0j2n72rj4aagljnkm7fp74v2z6c3kvzz67i8h19l11oyzu4nsesg5wd3bud7pc53vss6itpba0jepsged2c5lbzfn5fs91h6wjgc04tjpbu2haljcmtcnd25l682m75ec0qpey0d7jej96j8zk',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '5umr8ncnq35ifq0907w50luo7hucvsskzycpzuple3gtbh05xz',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'bqw2zv2ny03ltcxyo1o8',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'tvoes5w7mmjash2e356w98li2fy9nlfx6b3sluau5n719s0ddfmgzpynzmf2qiv989jxghxpnrmfibos484118ufvu2wdr5ha0ys6swirq2lyztzprn9qh286tej8mcgylpi3pj19r2075bt58mntg01u5e13gtfxh6lo3ve8f945yw72dq9az16dorvybqlmwe9uk9r82hgh77iy5o0p316h4asomf0z3n98iz8xjasouhil7yqdbxa7r68abk',
                name: 'krruc3gma0mw3juf8l9k8ublss264mb0w6rrf855d4phnt9qyrdler6u7ltfdyf0djyv5yo0nxybfonrdv4pmuj9355ae7ak9wf5px4b1m8w8un2hwvurjcz62kpikvujnzf2llussvc4xvljptpppqqbimp3kn1ic2sakvlik5zjzbucfxm0q5rs0agekkmmu2y007vidzaycwhldhib8we5jr0vna0y3e37euuwfqw14bq4sjvlrww3dhzf6b',
                surname: 'mi59479v0agn2tvwjmtzh1oyy5ftlrdsv66hlka36ruogoj39t7izar4wzcagfv1lqe2sm7dr0dss8epci956sz5s62e37n15no86a4i0kolsvjl1xkcs8fbav3rm9ak3ixtbenjtjitmu8msodl3ykut8jwpaj9vung7d6p8p1870xa9n34qx4s9ycvskm4rtmx4j6anph0gw9l34sl5mok1k0c41cuv867jk9zrbdlr9itcjdjg1a9zh8sis3',
                email: 'dqfjjoqryjzo3zxk8ob22gqle29ugn5ccr1obqj1qyez2vnoecuyq1tryfqw6ndo476c0eaab9z2zx0essifzavtrugnum21bfc62xtjvsbzsjzt6rxht4wd',
                mobile: 'yg0qya23n3gsa9kdj51julcq5616yk10dsea3b3i308o6e5j5onijg9tv63k',
                area: 'de8h6ckc3v7tfh0f2ina42donv2f8blkajvjnnbccn6y1fyqqpkohtqfgpl10ia9229mdw1hdvir1yfeq2llspphhcoo6p4ww9eoxdx6fb2da5ymqxkgz9gj1a1wef2mm6y1a3m2kewsxn07nade41hssibrstnl6jc4pr89o4aswrmwq7uoj1wr36lpz9ysy3de54vmqx7djj1rtn1defsmha0ses2j2sqbn6q7xzdugvsuhl9gnpfvbwc2i0g',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '846m6h49ccjtkklq16c8pyx0mnb69q1xxbh4p3e30i4jpc49r0',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '54fm07py5pkj2dkysrs6',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '2tgkij6dqtfkud909pua2u1mwfvkeis7qo7c8z7529nje7nm4zsxpx4oq2gl3c5swxie2nhjcgabumuzffi99w35d5ujtzenvqbhqb407rk9di367vecm1dk71i9uyj12n2zyw8toasykbem8a5a4kfpngz8m0c9iqduvcv9usirr6lodxbvonhrngudcjztoc3qtrtt1yddyycj0sunskgjrrfapeyenbdw4jor9wa2jjxr2g1grytvzb9pb0f',
                name: '3662dmhlvjfpzqj7pjnj489opge3jhbx0bjp14l59ukb5a97zvvj1c0imwc6kq4w8nha7k4wzeqiwx2rsacx3n7trkxht44kdt24re5k70y51b86smkapqugaolrv88gpkzarfkrjsxjkko2o8sv2mnm6jkzhszm8247ae7pedn4mig4oyp6kzxfinnmyshafgax4x5aqe1o5391kl5b7677758782odke0axdxr11gn0sdcsci6mrq0kmprbdj',
                surname: 'b3slyuuvi41aac273eir98xx0n0rn6xmgcqzszjb58yjk5pvdnh9ovst0kn2u4tyxmulw8f35kky6r1rg07atf8ht2djgjrtah0b7fip6qmxhe6ebz64u1we9h7fa21mh95izxhuqxik7xmefhhgczd4ts987rafdqpgk7swl2wlnzlmsn7xfsymb3k7crwirar9dc95tcs9cgmvidmrwhcie8y21s1z2rpfq2jsymvq866qnqmojntia1xo0f3',
                email: '9b9ier04htqiq6erx0p6r1ndep4g4a3fc92wjvd36g5mg32zrg6wkjsfgkqpmhysr05deufun2v3paxsvyaq79k2jgrz7t9cjfj20hkwihvzarrszlbrtbt3',
                mobile: 'bq7tnubrv1uci893tf85f1ds1hg5xq312njrl8ochwsvmd5g0r88uhng0855',
                area: 'th88xl9x7eoa6da4ro3vqauoaa9gm19uj6xxy8ozz2kln3vmi8l69qdw3zhntlvdnctvqhm2bh0dm9utblc94iolnf32kty41klkobra9zwty7yk0odguczubaocsfv8p4fhmntouvtigpgmqwf5opkhjx297e6wk84330csf5nce8n3lmr2h74kgjegnmmjxlaxlxz3duly2vc6ngwnr1lh2jo1hv04xmfookiphebhy20va32ml0k8hb2v23g',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '576mwg6lipbl3mlwxexugiq5ehmonkrummpro0r22z70ndlx1r',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '6xbz7k3bsr33dz2db59v',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'ns4a08mhwx37f7fzouzvzdmgpewhcprv9u2sa79ihrixhvrqs6le7n44msdyrq3jniyan4ycn6x3her1qfzkb46wxuqn8qwnomvrnzfi3eiyl7pzckzibg3pd2scdt2k3a2ld00m36i75tl7dxz1kd2qop1f6xadie0028gkpp9pthmsj23n61bg4gq74oy08ebp0cvfmptjuntyut7xzku3qh7hhne2nnstxkvsj6dj3rdnmcbkex26ixfdutq',
                name: 'r8cgiu590xcfzaq09ntw4b56gvrrriidae69fyxnhzcgscc9fuhj73gqaab35gcclzs3i5vzh5y78w7rdzgaw338pv7ezmhfjq5edzremitp70koymsu5is4lwecbgi28kte75gqtpacksh54d88dzg2w4nhmdbggmlbf0yt0o99a5sg3yea5mdv8skll4u068cw6e304qa8uw9xmy90vyg3krajvexeufnv1q0qyb2vzy6x8krk8ojptqr2a3t',
                surname: 'x6g62zpkdlcr16mqug73yifmu7avjhesbfke81ufhzjv4571baxxm2n5ab1dpah4vpor9c6ugt83bc4saqe9jjwkten5avyrnj9dnp6b56xnw4axfgrudd2ur98wa98s3w39sgtzv8qw7zc0zjabsq4hunzk7wvp34tp45ytp3wjjlkoo5kvplm92rg0rvjrby4nmeqxaig5l9az1n8umctru8ehyh5oa1qq87kmuco3jgcifxmgcj3k8g61j18',
                email: 'dx7tpq8igl3sei6z3zw18fk3cgvykxhkvlf5evc10u20h75oyo0kjnj1f1aoyfguz40exdwpcb7dqc29chg3u5jxp9pdi3ep57jkv5frgqzxtog56zsgam4t',
                mobile: 'yql35b9poa5e4y4b5yr1hq869xt22zakmhr5ainfatv3ajz3tr9769mag3jh',
                area: 'f3oyi893jlmf71es1agw9rkr9ac5ngjgivnvir8foqsww6aq0wzpu4ulal34tc96lizymbakuh9lbhi02qr9g3pijzsxr0w1uzpikknmn3x5pm0et5m2xlr9q89gqt4h3qwapjoobepz0gxb2dqxj2q07ek50u3dmfapphfshc7r6usdgulae8nawye09jqhhoecn1on6qqutsnoixzy6mhq5pk7l0vbt952uzlf5wqd4bqrw5mxlqgplch575b',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'i2fmx1a9pu26r4rguuyz98ghu3jpur7jycb7zvnwwg88bqzhsp',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'lssif7l8lutvg9x9k46c',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'zs0mrdjhqephvw6i9xku4r5ocrl0k1r5dudzlfwhg5k2w9s5lt9tpyanjj8togvz45m66ry5k252y0igtcbzmitb7u1vqvqqi839k2lo58v23g3ue7c5l4a6t56su4g503611rruytm1umgxa5bkfo98iuzvnvixxa1z34eqh8qnejrj2pvhijx39tnhlncl84058k1k2g50uygw28ecq2r7hg9q0fjk5bsfet0zrgtx30tckcnb2tcfpx8y8xe',
                name: '1golube9vgfaykgn4x6fxu3zmdlg5dp1q8naphdcquoxfwhazxl376t9tpntt60fhy15hn1s9coa0z8p78nr5pw22h78e3dc7ei4ueew237hw8dvxstwkbboklpfqmcnzkpfom1ujpu6in3ticqqv9x7bbkc9q6pll9r1gg9atxwaxpnwo0vyys7gngmwk5mriia6uj5ins2xmxjbmlr5ou00u0ibkhlhom85110oskll6g17vrwb06oygy5ydf',
                surname: '3qksgjj5rakfz1hkobbzu98ok0dirocf6pxs5uhf7hrumgtrie3roa38i1l639xq38ijg6w9hs8ncu5fu6ei8og3dtr46be5hnxe5oarh2ju9vkwi6nkyx6do9ft4qm0spb55cmkqdjin2ilunbbdyppl6s8nv42q6iocxjfbfrw61cuo0z4fmkv5h6t1s57ji2we2376k4wu4jzyq1avjnq6lmpdmuui1lv3c5c6ulgx094ogs3eodxtqt6hpv',
                email: 'fgrizvgc6833sg1w999rohwpksm289zfvgge3dortg6isbnhpj2uzy7jdpj2lqv1e338ih2on6hv9l2clc902xouijatd4q7xyq9ti2ckfyj1945oju88qlr',
                mobile: '0w78nl0qh9ds1fnpozzdra9c8dzorb80jklb1s3km52d2mvs2qb37idgn2xo',
                area: 'g4u4sr5rccu2dohqpkgcm0l5afjz5qzg0mrml77piqy9z06bln29m6y9ywilyhkgr66r7uomx2r3dc9ofcpaw57r9isprn12yk74bdfa2amipool3fhvju3tt3az62fwt83mnk2e69n500r8tzzg6tflaknljiejo5pf99v5322ll3zzkuw6a0gkg80h8tzj329lt6p4pxyx10d7sfjmgixkgrjv0xom2z6zj0ml3mmvf20uxjb4g01k68qvu01',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'fvnjuxp7vweddhvxfqvis30y5xf6byikwt9yqivmsjqdeofnow',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'avj2rd1ygb35hocffpda',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '6hfa2q341fytpz4asoz96v0r382o2ln8ivancn4l0sld5jw3hmarby372kda9e21vxrpn8hk2347nzzax79yyna0vxdaqc1rulbvyy03frmphy3i2anmaeu46wrkpczvfmxwuw3y9zwxi2m5k8qt1prm3fwd7lbjggz4nc5qdglhueov0c6c2szqh0yx94d47ccz4lrnozl6vt9er6tk6cr3xpnvk11almqyh2famy655ne1uhm0rs0nwch2irn',
                name: 'woi13ana1aqel7kaxme0umrdzev68tv7paqjg5aymni9apaxalatittthpnnv6i0vywhrqwp1twz06qr3mdicrmmur5j0r1qfgspbf5mrh0i26b8rhmecwk28x8qaopaq2z1rrsw8kvhn5szcnw88mlf7m9vjyw91k2ezvg477i9d4zk6rl0sbg34vaym57kmzcfu60g5jjctguv6ixiy5ck3mtmnijmzj5bj6noytvqzgg119pk8y8eliqzoea',
                surname: '9frs2a8wi0cq6hjs5hwd3xnx6k49zwqzv0yogl87oqt8mlk1owg5rqgfmpbp7qfry9zyvqyvw9y2qyjwdhjstk8xi7waau15xtnrcb64x25tczy95fs8roxch75qkeq9pipn666a89ep5t5bmwj3emnp08el80vckm58ulgajcwpo15hui2n4r3rqd3glu1rr5tkz97yw9z4oy6bxjnanwsxf8agmvyuo6diho6qv5gf18usrb6f3yywhk7cd1n',
                email: '12vz884soxd0blt9bxam6d8ppsnpd1sx6936pyerxbd86jqolhb6s3pffmfxwkgh3jbmkzgkwjyykelbalqpgc4110vmw3b3x8d7auriedg2bz11g6uk7j2c',
                mobile: '36l2aatmb6zh87e48l6v48lfcmt9jkrmvd045hhbv42jzozlilaht9dwfld6',
                area: 'ipllzdjmshozo2a4o0tkuoihcbr7rf5oivymiaxyxg2aphhu7p82ngp6pb1eswt9fw2qaafow6xp7pj6z4rhsq7fr5spv44osmejbgrgt4ssk8ibfmx2d1g8lqgp62tfpqg3eno6h10ucee80lu6om6s3u5rvwjvfd2owdfjjafpkyqkpqtg9u19plsqwwmsb0ysy1j94hdslnlce27z5kv4ul0r8b7ih24hdrw8s8om1lculrs1tag4bj7vujt',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '0o17qq2ltzf89d74q0bxk3aibs6vpex9hsrd1',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'gn8bw32ehwj8y74ojc2xc95q90nmxc90tbiitsv90b1hu4vj4n',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'jyx1ys7ru23mk042a3jo',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'zuxgehv9p320qcer8voszegvmxoo6qwkqdtcj4zhrd1sxfjuuk4bgw5btb7r1t2sa3nsd5ak1s4bqaxsyxbsu0mrzw3cym9latmebsvlomise8ys6zss8ak3gb6v659pqb8eigokcwgezogh1g5kexmsx08oibc3siiwui7qb9tlmj49ykchtblt2kjia05be0fg41jpeu4x0223xccn5qqqjuo2yhm253d63p9a534yfu541ppycwo6i85q6vk',
                name: '9x4sprwynjggnn7ifpaj78t6fc6daq2uc6zio0jtfjex5w3yi9gf7d8qry27kx47mq0lx8jw3vj54t6ilse82pbmkldps7yau0zenu27n8tu115da4ri6upfmec2r5qo2fdmgjea59oz2ly2g1ndajfma3dhubljjkq8xu9iasyksxbobk1kcdr2ogarpn02hx19cqcvy47xil9tr3zckesc27yf63ytwb2msqesgrfuqw0n45eqdo0ff4wxvci',
                surname: 'ypxf577y5hvm1fei5j7dkjorur3ublkw4mf46l3hnbg2zzydhak9c4abaf3ydyuae0f0n3ffilvs13d7xt3e2xdniv1kbyu4mnu7ogts9b8f8in0x030bafyzuxeapgc00gp7x0xul845v5p2la0qse4y3ggkketr4va9tosauyyyxcnsl9gf1er280dl7lp87aagynntxpth3w4bl5hcou6aq43s955im57r1lefe6c1x2xyursqny3h54pcck',
                email: 'vi0065greqab3ns4lg5oaj3e9vfsldtgxft7why6jzjebdpkxatcx54ziwkp46frt6jxzfdrvjuk6pj13bno34rn1f4dlob2hq47t7oeu4erls0pzdloloqk',
                mobile: '4hvhqr6wtpnj3g1l31339haoispji84gqqtpobxk0c7mr8omtshnuh1c0c1i',
                area: '9xb31khiwrlpnxvym2cyqxulz5clheed4gbx1hl3jrzhs0vq2x5ircz4wf1lxp4zu1w86na1tol6dfdce6lcw70sw1c3q08lmgsvnd0sjusiqc1t90ytg9tn7mgyfloq81vpb8fud7tqw3fqpjh5wjyyb52h3wfmnjpdslq47zbfsa0q9omt7s6bwm36ph598cionyf0e7kathtu6koep3r9wzjtg0lok303ptxq8m47g8a61kup0o1bd57sxkq',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'sr8c4n9fqettyrhgitynlvrgb5sd5w2ej27t7',
                tenantCode: 'xmfd2v9q3giq41wefxrhb1h9ru2lt98hp9gtme7xebago3hwnl',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '8gsqcxqi6livcltpyy1p',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'to65tutu1avy87c3nl3f414e0pqfagvju1kma85snp31kptzwl3r17b5asn7mh22a4fvu1a8brm3hhg0edascbd7j9wpmpapxq305ysowmlqxaqb3hzteo8qb3jt1mfgq35ww2zpki2r9wk8w9ip3xo7fw7ijmyn09iu7v6un84kzt4l5apsknx7n2ffr8lipfx82hjz3n82v2hqixhzwgogrv712pr7e59toffa49remr6ouyul3whzm5p9fmi',
                name: 'q1z9dupc6iix6kwy3cuw8g5htuzr04dr1ap2iycqp34ng77co9n0ub685nilv98g05uljaw8e2lrg0e5g815rkf6yehrgs4tfkhoddr7bancj55k1e92p0dzad8vc1vc6z9kvnc9toesvqcf2nif9v9ewto1zny672b0ywpgjrwippfrwg7jibw4xjtsv53mft7iy2rygqr5mzr1at43a99la4ntz16pn6oheofce9gyy52c8swbhgmsv1vqe87',
                surname: 'apkptgz62mjujmejevj0hep0pio3012pf17g4so9rujl7z3yycqw2r8ws3burinitn3uyzvr76vz820s4ah7bu7feboxy8fn8novoef8wuqhuid75if3pma5wnrz4souvflzer6gz3m6nolc22h1qdm91riqh0wnhfem8yvnpfwslhq6vhxmpl13fhesal3sfu9hfcaro7i7efjya8ihl2qsuie8v9u85uzx43uax30r3y4tiu7pm3hp31y3yfk',
                email: 'mv06r5woc0tmhh3i49ogm17bufqfzojpcbnxh7upo453stre7i84lyo91a7bv4tv9ooy994o4dvtq4xw8s056dxecmwzzp1i8ef0hyd25rdb89c6b3dk5s5u',
                mobile: 'yx82k7sdajguupnyb4qci7pgz4927g8o0minntj2b7p7hw99nhiqqcqsjaah',
                area: 'nc93pat5cmwlez3hh4rnrgs2u5o3pob3yc1f6919pbo2641fxus5k4nvzcm8wi60x3q9z76daynme7d104ct6bqq4x5o9jcke9zclnrjepgtt0hx02gfpww63uqpry8elezfro3cs7tx04u9enqbb8h3pv01yx94ftkd19wbmo5mxiajcgxu0qqo1wc87b6hb6f4zumh8el8xsk002x5lvr07gs6489z4zneewqbjyy50htyca3afl2o9d23u3g',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '7nbt3bug68caw07cp4k5tbif53p147s9h8z64vwap931ts13m2',
                systemId: '8qtx3i7pcq43i48jcb6i8zgpcq524wsauz4og',
                systemName: '2akpi163k9pzopkcwzg5',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'zm1d7zr8ercybo2znycl8ckue0lkmtbs0uavzid5ema2f3kk5nbiz2fcinfztss6pl4mlf5utgjctegdbnjbtvpm8v10vdqwham1znaqz9kjyj5winrayvi8wzluof3gx4jc07d5d7v4ml7nrz9n5uwmwu8rysf13ucavtqe4op0djufup8so79lbh4tj95t14us8qf31x9k8opbwaylkz0kv72n04nbndh17jpcf5d9mj6qmq1i6tmsj0ympyt',
                name: '4i2zebyjlwai9ub0mspdds83lx7xqqih99owwyuichwgkbqki3w98dnalandoirsoipwwbw8fsvf9jz8dfudgaaz3olcf86plyu4tm87t39km7mltf5dlap5v691hzoy2o3e7z3lm9tnemlbjsz6kgkz8qbrjjsn6fjtnn9zav1x8w14r8z58cbx2nzj0txta4dae7i6gdm3yofb8egpmjcu1t4kgp4mpuhwtni6nvip8ck4g3nwag0jl2cuznj',
                surname: 'yrxzu0zj4pqmqzuwsl7m1vkyhqbnu9s1d9fw8y1x0f2f98b10m14hed906kyqps9n938tih11kmwgc18b022kra185jjbb9bdof2akhccba8e228nc4gf3534rgqswgmqy3ua3e1yrubymmu08ytrnoxooz72bj33di1ndgby5lnbdax3nkvx3qg0jey04t9j945zchy0qfrh92sso16gsgy07gortdeepbx0wn5e01nvvpvsl3on8pvkhfomih',
                email: '5p4czueo6nva2bo6qiztnchqff5g9ug3b5pb3m1kdph4a3ua7i9sdrmu6dcge7tjlprxnypcpwnphk9tzwugfmvnrpmwrn3oxmw99ahonmr177x74vljnkhq',
                mobile: 'i5rxrtkf3c4r6zmsxtijyk9rb8qpu60i2tlgco885eekvottaw6wqlgvbka3',
                area: 'vet8wly6p7h3hu9cjdva9zxfbvv9wg2skpn3t1h32997g899ykxe3o4xsit49dg4d1py6mffz3f31o24q7vw7c0n82nco5j47lbjl2a8viuhqc6t1ig7nu4s9oypmfdrgmhls74m59vhcb5dqh0e35zt49yuph81uiimfl4n8ioqgo33ajtj5vyqlj6x3d1xucd7vjh56ln3ttelunyio67dpfwj2llufbquk6ao3oqd2ys1vsc8p46m00w7gmz',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '36m39xeigmg50ruith2pie8myaahg586muy7hx8yql8lawjaco',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'ey9r30eog72lnz8i5dzx',
                roleId: 'mj453cg7cinya1lydejp97meq6pmry8rco0mf',
                roleName: 'vwk1u5lujdn243dp75yvkl9sb6npbryaqm7jl8lzy3aydeet6atb84ny5zo5hn7regubmywnsweyulwdddby7wziz3rpp3sa9pcgtb19xoeuwp71fl49du9c6zv2qy08yavkqrqjwqafib3emm7o64ulssbaekxbztubs5sueqgp1o18ruv0xxpd0tw4ulpl96dvnva5c9ox4ktnn09hw03rl3olnvwwe7j348c6fwd01rccqwgpdz04i1b8k33',
                name: '2g2q4exlic12ipav6tb635ke73rk1um5e5n9g1av7r9u4p3y6ljy8ojt3911vhkfomp41ecd3jaw12q3iasoohbr63ie9b4g2b9g00v7avi7topaf651juuecafgs08l69eq6n8qtpbthpy1onsr72hqy0fav5puyxf1p6ic0hjkwkguhrje79napwyd3t3c0o37h5s86zd91cfg3nmpts3zk9qefl4l4m51gjhan42g1uw4qju72f1kxcx87ps',
                surname: 'oypv79gcdu9upiwsa324p5ik74ai3arnm0dnq0lxkunfh2ci73wle8ion71biks7ehzbz19a0qnb0l9lg0t8zbz87ldu38s9abduj34wnok8k6po0g6j082rpw3dpfdc3cf9ex5ugk18whdxn7tcsonuzka5la1ug666aemqmepuyi6pio82vletmxb60rzch87s608o71927n1htgxlnzuhkf2f35k7p1pmifh4cuk7n7j34mhybm84eupezbl',
                email: 'dkv7hm8m3g3yl5xu15bcyawr7npcfao7o8gd1174bejtsmgbz117t5ae3p44r5xthioq2p563n3wf747tow3lur1a67fyrcm3a6eez9melkppnqbkz994pio',
                mobile: 'tbjd6z09jrfzj37lsk72i28js2s7hlb37njc2ez6eba6ou8sua2g6x4tizpk',
                area: 'fmjmrfjtsdgz4mxd9mxc0hpvz0x4qa05o71w7a1wkphjhfo5t7uacgktj9gw3005g4lsmadmregtale6z662170cx7vnywx5fik4quf5btjh3pxbu5coikuispafznt8hcxixr94knps9ktr5684v477ad3s4rpbs2hjtbpc3el8yvq6wvgq4t8pmz84ai1r6reahjilwul74gbnv8ifu4m8e425g189qzfmlwwrv9c07a2ya1dns0u7oficf4d',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'nzgigterzoe62eol0u4yt4qa6ta25yft19at4oltmccpmpuf5a2',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'rt4pwy5q55wkx4nk7hwv',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'aike1npm8dqq46b52o5s3xoiq5wg8rsu3bzwpy742ln9m0x5lmpnjt5odtpxpcsji1vbisid21im9dsbisr5h9lujna0njc89bo81is1gf7yd4ajq847x9p0xj3shm2hu4xvziblfgovseppw57g7f4errhfzm0tu5mzhjlce48bt117q19kezbddsnyumlzstef8bphgcwxzahi4r0lpi0k4z252w7xhy0ynju3wfnasxy0cyj6i0v2yolq5d6',
                name: 'xs21otftjq6wnrpvh9bywucz4p1x9k5puqd1metkqkhfmikap9imj3k4i5q3ccx65mt7a1ma0aeobg1mgq43vqmweomlyrwzn1pdkzxx3otdy65q2gblege6h0zduy22mcw4ppqd61mnomi8a7rsyb2rehqu18evaz5l61pakf2k7n918e962e1j6whwrttrwx7y1qmyxqoe6mznaivgwm0cue8m3gf9syi91yhv87imhw4nz4c51xi0gw0uvt9',
                surname: 'xer9q9ot77j6vrc3410yv03t4pebxts7xg14a4pmqq7x83nnkitjh5iqi2yrtd8dzsywk42hzd0yx7dkz4i7pxu5dp29r4m8aemm2ited4nilo7g06kb2d9xpv6s5o2dw4bkdn3y0giyeqzljnd7c86vvqb45ohmxge6u5cwc5b6t2rb5jtt6dhus01nr7abxnud8y8lvyai8tfnfbiykoph3wkjfmagtpdavhdruvqq049vkhl4bml3ak6cbsz',
                email: 'ykp28whsheillt0ru1jghejly2reuqhzgee5q1nraihbl8eh9e6q94eu38jyndj1llxgmyox9vn2dh25znbgrv9avefxj0xjvhdbxpx3bmuk20lf8bptic1h',
                mobile: '21zjm0sd9qsoltg35y3ih9ndhsucl9vqvxwybphk8ljjpjm6xixll7b8qtn3',
                area: '0gj7c2i82yp8roty0ns8tw0p9apfj6y33np6x2os8iwvd2dpr0mqcj5b43rp0wvuhxu3h25mrq7lv7b7cehapo7u2nxt2222ke2woxtgh7soeeoqp8gjadbiajttif9nr5jh7dhmcalbdbctpjmq6vqn5j3ytx1vcltxjviwzr61dogs9nukhnaatkeq4h1szevr6az8s7yc6z9jphp3dxwbij6tqt8afk6j2dd78qxnn89303obdq7rab35a4u',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'ttsqbz3bsunpbe4cp0ylol13h79p2y85b4wkyd3u78l6z409u1',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '2fmmcnoiolfm7js520ppq',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '4iwiybi95eo813gk4hv1hcwnnm3wjjkzim4ihd2wcw2d1nlrvh82lr3do1ewj1rpehfsyi06469ferjvu0qdeh3xd44c9oeveldmzypyug8b0hov3qeett35zkprpptwjrbg57ceyjft80pug58pl0k2kbjrsi70m7z3mt60k8ymnbkljny8da7h0m17s5lq382h9qy3crae3ds46g72mfs7hhksmpx1m5nmuufekp7igdoiqcj6pl5uu7gwdfg',
                name: 'u6fhv01pid6vj3grs89d2thbe9zuf9ukx82i4ud5cac6ghoajj70ljr3ejtwp11882uwpylsaab0wgsgiiugedc5n3yl0y7nqzjg9994aq32ob0qbu985jz8p9x83u6u8p781fz61pbsb2pd5ux8hjiyb91oj4x78sju5bp87stnhxvoe8ulmlekreu3pkgyo5q3f11z2wtt2dfi3hmng7qllbl3l1i5lbjsx391fij3br49pv2xzhwf28gnc8i',
                surname: 'vz5skub2bx0rsw4xxudb5a2k0umv3841k513sfokupm4gl5xlc276ka3lkq2pdtiq5pws21u7ykievh4byaane2b8yms63124twbtkisk96e9fun73k5f1q2doqqpzmu7ncpvm193ctrecnt2a4x6ha9sxrvg8d2d4angwciwb3chl405xu03mw5qfmecnm0mxfj7egu4dtsvblw70aw00o3feqw1io1i41latpmnof1oa82wwfnhqnqqytdzvm',
                email: 'sk8v8a7955blylhknc03jzv4lyv89n8xob02whsy7t9jxqcvho5ccsh3kgfhmezup2zxlzeec9r31g618rlwhki0dazqpybc4pltt0jp79af77s2h91nwpwe',
                mobile: 'nfkfn0b1kbbea9jv3sau4l2zem1sfnvom8qklffeprfes3f8uk2nigkblp2o',
                area: 'iyfzfmyi8jwqtffe7iwoy07ao3rjvux60c34p55ch9zx3kv4rwstg1b1f0wpkkzxzp6tvfv3ryhfad0w08dpy9xnq76bgybblt4jfc555tlvkfz9wo8e7kxugzsuw28xv4ms5vcjf9ul4h4rt6rmkzv8v9wsjcpb0pqysfp8xhrfo3v9jwrc41v51r8233djwyy5jbcabwud30rgo9ll0oemxen13cofvso1yi9yqc4k9244swqfp95n6k2nqjj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'vcx7ba086fq0zk4h9g2pnul8ag2dje8kermagqg3fk4h6y1q3l',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'yv2ix79badrl0jn2m33o',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 't79885nyr7qrn85i0kt3utq3mfhnpzlpptvnjak2r7xioqy5btvw75zinlaw4uzha5lvwdnhsk9x4pnqnm1m127gt42czm5cw13jhrurt52asm3fcvwevbqt15whebzmut4b51vl9i6yf1opvxewxvnutfuvm1fm1a4qdz4z4eyy0yzd37iwhm0luydeis2y01zmyw0g3y5301cquilb065x8jf901hdpt0f20680baquvc2866zz73my2p5aa56',
                name: 'gt81fwtsniyqq2a9pce8fkn9w17a27vy8712dl8yzdwvd9i1szehdmr8i95m18opf6e019hquszzn8nmq7ecwcib4glsux10do1h5mvi4kho53qsoyfngikk36zb7lwsi629zier6iw2ce6uncyo7bjqcmh38bdcdmwf7svrertrn6hgsehvd42k1bz3dcn0arnvltfb0jx3dn799qa8iluqym8v0ciiacqlx2xwcydx4swlrn89lpgxzvl28fq',
                surname: '9qzqij04w54h85ikf1s2yu5lzzlcwggq889l4hkczopp923lu9l97uha1nmi3uvceplpheaty6s5de2dtp2q86aerk7pbc0bgdzd9f6ichtbibg6avy3sste0hcfyh65fw7z8t3l3lngel92zv6boi6r6a7h9mn8i7hgd6klf36njd8kxnmzov4nhrw2v70rr6qkq94ij3v7lgz2pdvvhour7hb3rk6o2zznp7i5nhj6yqnymf5ryp4b963b4cp',
                email: '3395mdpo144laaosopjxfx3cfnr7xoutia1mbnnu84ivjv6p5t09m18tlzu0fa49fmrq9gkv4xzg68mgcpqlzv5cdbjiinjvy64b4h2c45k4bjlucmkhwb0y',
                mobile: 'k9hewlgy3o6zbm4ta0n1clz4cwlqyoo35c4klpi12luk2a681br6d4y65o4d',
                area: 'at8q0seg0b4l9on8gz3ro650pgdbl038omles8ic142n7j4yhu44b5yur7x8i1b66ek5u7wo6fecm458kd9n7wdsbqgnd0h2ffg7s3pil407yq1cly1rts8bk9ckmo12rgnu3cne54v1ps91b2ejwxabdank1iisyar3atnxrqlzvo4bsbqax9zcmx9825fiacl7md4cor59mdvlniddtzqntaadipc08xcn99nn032am3gyxoy6g3uk0d64ty1',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'mgkwxkbdo2dgumt8e9l3zql4aew27a1wm1fz1q7mgqc70k95wu',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'premofuhbkdwfymnmnaf',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'xxc49nlhgvhq6hg5i2nf9k8k1nbd1qo5rt42k9p97vwo8619cec7dvllqlcvs8me87k4nvz309kngstmz1bjaotdhebx0yjpbxbb8h7jt6s5933588vmv8mwy2ws7nt2sukepzrr51ckus58049kqemiejuwtyq7ym6te7jljlrt7mn2qsv3t3lcvzt6f5kav91140qf12vztocffzi91wr38xyzldf6mnqwz11p9v0kzqm8ljjvz4afpwn9zqh',
                name: '4j23gw1rsih19k3pjc9m5kw33arz6lp0gyao03dttst9pxy7q963nf6u8ntcgw8fnnzdmui8ljrujd3ipqusho594osdio4jxeo0hia0ypz7lnh2tz1m8ulgmr8qcox0xx3wq55vr39whgt38f22vysnv33jtsaxajybty24lh5xoq9hagti5t56h1jadsmevzj4wj566bhczewrx4kf4b8661hhfwa253zz69q4bmpnjdva8zvvn9gdhjxs1csa',
                surname: 'mx0ds63xayw9uzrnx9hcxdzpxwmrm0mpmgaezmedqk7ungr5fngbczt1p528gkw4lzv4e5woff2kdvppc61mo4an6bjm2kj89hjzxg9qhsdqel8kswh8wocsx9wd3upxks4srz50g325901srgr3szjbx2uoi67wkvmp04t8759yble3xrtuugof68ecvfyg4nmmbx32cymzw08xjf2lofh3zxgatykji04eztrtdlcqdjkmx85pbc83qo0gewt',
                email: 'mj557wb07ne1kga59tynupaoq0mwgui15ipnqi7747c50dxx6k0yfjj5no7k3ocj8s3qfa0xc3636ldnaj8ygwtq5stz1dqwgavamvsh3ee6qxra3gejl5sr',
                mobile: 'h7o9l8ipe2ej5mn8txioko4y8vvwbqxnnkkvzi2a93nucol0dvlal7r8k7nm',
                area: 'ipknvi9yrodydyh9g5kwthvpc6e593pfrqsopqzjb09trqmltid047tgfkznnsqc4kfbbuidkw3afxr4awqjprag5050euesbf6p1nhizoak075s5ushwa8grcjn0t0knmmrlgznwf7ecev40o5oanycb5tti7mty3bcxxdiq8mx4soyf83c0fk4gs80xa2gfqq9y82aikvlxchz82d9petikyt6dy3xya55ckp2xry693a29qathko97ixsfhx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'uuqqhhywqfleqhyc4btzb0jsfpm2df1hfnvd48wpr38huyk9iu',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'h0xde44sckihfwmanmik',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'x1dklob8eittqjup36193jnl4cjeoctiittp14jc2dul63zcwk068tsub0yd9wsvhcufy21f8ihvdmxai1chjvqtvc3y7cgg1wsynqlbf6t69mnszantwoi0opiuo5wb01knkfx6eurlzev66bf23m6nf4j9t16fnr5wmk5of3610uf59gjiaj63dffez4t0isvr0e9i5e6dc7epg9n3r7f70bi28orvt3w1e166ejirnrv84xtuvjz30uwhbjp',
                name: '5jt0e08wm9cl73my6wptgj391fc5ubsfiww9vevcmnvxz5nvwg1kfyjaorc5qqjjndta557ldh8atzeviptvig63pzt7ap86zsikf56mhbsr7ijjsm7hvyfpw0maph9e51wdbdifrdou4alte7opu0amslvye0ahreihpd3zvo1nebmo4s1tjxzzudlzlchabnqv61lr6lcw44oxn8g3pf9d9z9av5n6aytzcg7o7yxsxu5kna3y22dpahff7q2',
                surname: 'ys60hc0a9ttrt0nxlk1r2za6gbw5mq4k60hgm60yc1nhw0iavqu6sextg96gaf3qs27l983m9jc3qdoazwb802634qgph7afprf8hyq7t9zo8kfdn088p8c7dk3ugvdubeb0wkt8efbh6jkjhmcpmvsogzjsgm505rirpa2w6tqki1rvgnw5abhcbspvk467ta7ik6ixci6ynxzd3zjqbypl32u2g9712tjqkgjrwm561b1d7kmbz1vd4yj3ytg6',
                email: 'e7tseztwe8aqwf9i0e07mfolcgy4vgdplj1cwoe0iil5t6424ndh73ch4dvhfptv7yy5us58h6mpd5qwsmejxw2212i4yhcayumpnahl3orycg6iggcgaoq2',
                mobile: '2oaualhueskk9zj0kgicr7sv7spkupz9mvtmvbvm02vqyjnspoifef8byvvp',
                area: '43s9z7bj8831qi7hqjao3scvya6s9hm4goivlme4b4lavlc9ej9q3p3jon6v6sr3jow4dhvu8tmhtab7sv6ozsgt78soxlv4oa7c45jz99judr5gtdqjm0z4e03z2ca1gqs9tdijtsrkms4r1obdelg76pl2j9c1jzfan7yrwdx22e71ixo69gzsjtos8td1zipvbyybd9omb4hq611vzohom65z0pt1ia50jd8ahvgswunf26rfd0yskgj6xiw',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'tvm9lawufxxy8rlrucof6mv9xqk4esuvdc04m520z6ccc2b3od',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '66ylim0enavinaccrau2',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'nv95im1cwa1bhujbufu285xe2rz1yebzrnk5f8zt6mllbg26v3y00obbu3y6e5onef6bwp0oj00xea95a592730lpf0vnvthffxrkmu1ipcerkmsf0cmeoh1k22nszr22n23kq4tsl2wefw3eoz1v2ya6og0ztr1iof3jxnm7sc6j72ofcrkne0nzrt1nriloqss0mdbr36sisoi436l6adoicftryd3ndi7bn3e1zldxeom4ktafmlhaiopfuk',
                name: 'ig3oldurlbssqk2abh0ijj4t4ksz08y5qtu3ocpzpfyzt0f7s2ziu6dlz9g0uxed57mu0275v0hthlvhnwfagl7iijgqdvbk2iu1qbmq7m5tpeh61o0333ryc04qvt2459y3jy21e1ar2iqwp5mvhggf6kq1q09qce28b875293udkxq34nz9814oyrc3bz8oca15d92fsxh0fyz3kaeh20z02rty1t1b5gyz1ws4ynj5l1l09wwodnr4rbqf38',
                surname: '2n3mjeypccwfw26n6fwt95jmmbvcltaiw448e8jvnpg6kim4q1tat2vx1v31vga5ens5o6pl9peghyiz1pprmlkhh9btvrpqvl7km7e6214d2pfbpvd8t8p8ckiapqgzxxuwq0p6pp4q6b7r33e1nf3olzlbqr4d9urf726ll3n6027w2cpfc211xwffs6goooal9tsl264bg7m8tzab8nfq685wohmbaefz784nbzn4iw38rkc5vk78kuusx7d',
                email: 'ndlujskb7h6uz6si9r0bkslxshwh3w921yv2b23dy8gqovs1q1qtesl6vspb6xbyr7sijiy4slebu5m7fkj0p90it59wzxzag2rus25gzsw3axjfudtxgfk92',
                mobile: 'esz4r9tj21z2sfudr640dwae2rj483lb0v6vihjmqule86n7i30tu5b472m8',
                area: 'jqwzz1v5dlbz6kivx551qnrxvcfe285pui6lcwb1r5mzokwd4wo79x85qmwity6ehbbwd2z0fcvniiqndh3ysdc77ip5tw8kknau4rd2obq5voszcdy6t222i2c14c52b78tbkq602xi5wgml4p2976og7vr12b1zstj6uid3uwr0e03pebp5vnjp2bxlydmb7i3jdhpbc8c9h30tu4sjtm5df7yvdlycrgy6ub0bile8hn1x0x56y7u7g3owrt',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'b5v97jedbpgook3muk7d0rnvohes8eyzvlxavhxbv5c4air3ey',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'bg5vuepr0eff228frfbc',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '5pc39ml24xhint8u8cgt15tbxpyq3491as4byuzfqzj9lj86zcm63sqfhmho4s3yff52p7u9lsrcs06k4ehqu2th2qxq5avw1sayt5n0zbdfzxuvkm2s73q6rlpxmf83myanme7ieotm55q5mk4okm8qp4k6n5b9towyiwn0bku13rqqoplxl24uxq47dcy09z66ku7cfcdoavk2cx1jr7x09or39ngu51jovgqtiz5d2nnn13lca20yc88qj2s',
                name: 'x27666gq0qf74dmmj2jno5bz247exjgglypecrl1m9xn7zbxpgat2tuyq48ghe7u54teis8quebxndo9q6e1yt93h8gqr2ex24eczrvlh6s8w2l06zuazt544c7l4zdkdt9ytooriy649avi7e1f63hntk2uhyuoevl01wlbewnevkcsyzu2xf3i6fya06y1e8e4fyho0d9di1285xf7y96o1uqgz7itf1m3rp0iy40qmatmah9jj2k3k8t9kco',
                surname: 'amcf0bkuc3obpjy7smoswumkw0146qh32jsid2qgxq0tlgx397u995rx87u6mfaavzpf6suivtbz0t5ogwaz6nmmsdsz2njlkd0uc3bqkix51qg48f86nmh3mhpiexmjbz457mmqku0cnqtmzm5redrb5lqwyx27k1nopvjgjr5cb1mqo5fh1zlr4q4l3glmbjd5b9s29v9g4md7v3hfwlra6rheunpcwyqauad4a6wn51da14fotj4c9mv7set',
                email: 'dlegw5n878k3mkwrg0pyp60q9eriz3a698kai4gy60fcjo9tlbw180nditp2j9uppx8b6wf0d31j45d868j2oz8cadktnqc47khbe9xapi3bc14wm804yy4l',
                mobile: 'dpgnhhrspjglufgvk6l1oepq4u7kwdjdn1fexc4wi8gooj9albqrx5yavaqgf',
                area: 'hd82o5j2mnyp2qtr3v2e6naapx057h93ippza6z4t0s1dld7qfen7kb4z1clcsk0fses88iyr7xdahpeui170te9h29wucczlq9comxoaocp2w8bapjl2ryv88jvsi4uug0i2vvzd164524r3qwst0wgqug1gf420u0jiksft2er1c3zonaqenxwpu9pfu49ukbn2m1megxs5081fu8lnwm1uohrk2zfporkom7obq468tj15q3gv6a6v9qmwor',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '8teglv6t67a1d3h7y3vrqp9bpj2phiecohft6doawm9rw6n5eg',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '1n9j524bsheva6jrsl94',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'os53lo806940ybetrk6a4ak4zq3ddw86evmdi5jbc7stughjplmh1rv7466yjzfgw88ix6n6p96qjvlj79gwh5qjkd2cevjqjtfgg09ofc6jiefsg7azn6zcdwgyzn1g9d0spuzy4j3x1hiqzvfb2222t9spr1sgjuhgiyo82gss2vbuzjaeowfmhcehzfkhbaxa2ju7vsnuxgu4ne6kdnt6ckx31bt88nx9ui6nzqdg40i860o1h7tx068yv3h',
                name: '4uq2ehrui7rt69ujpjcb1ofc7yvd505nk8hwfof2d0cf5r3bhfvm3uacjptvjkj71d5sdac8uu01dhvsmf0lhrs06um2u3g7lgayxlekd23nwrw8uvfqc2x66omanzkxmftcs9bdae1c58r9a33ly9h1ugavgm9g3xrqo6ss2xhovntl9o32kmik1h82o5o6fpn21qvfmz7zhantu3r7mjaq19wkgckfstp6f4p5ux4yuwbksf4cw11ckgqgyzb',
                surname: '1akea1csc1qpyyyr523fa7ujmjk0ko4jflxgvvtqsw491t3zh28x3r4hu03kfwpx2olda1y3o1w1esvp5xin7ax61fxvl3o12kkbz4qflv5ad25l4shkj8qdns4ls4nlv1pnimidkiajr8q9r3nl1vhhvm2r3glncrsw2bmx694j0amfgawycp1951t0e14vo9oxe1izv3nx850zpkdd3rcep5swswpsmu6qds4fbm98oh7tyu33inqwmv1wrby',
                email: 'd3vuvld4yf1cf6tiyrz34j05r21xtlb5rdsvxygjd00g7uw41zlptlgw6axskkr5zgdqdvipvsmu73pgtauxjhq6b8eymwx3y0j691athgupuhp6bagu9ywn',
                mobile: 'kkrx50274e1wwrtt14tie5usgc5xz9ilod3lbqze8k98gftdaw7e07vueily',
                area: 'oc0g266dsffcuyr7u0o9wwe9gr9t2k98kbq41nsup7apgccgabp79hs9fmzcerpdlpiswi77qhdzgbtjl01sogecg612dqv0xssno4eecs5nwgvyj1y48cy5wkhhw94ioj92fgdhusq7n93bonymdsrma39drr37vmqzbqpjcl38m61l1avhmbs58rgkgc2cyzz70y1inyulxupeahw2cg9d7mlc0ykugjaqt883rxto2lqzze733aq3x0wggjwu',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'mrrfe8zzl9eh0qqwga96hldfp1vzjsa5qv7oexk9yojipvdlk8',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'kqri3eu4gzqwgxq0u5r9',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'foc4xibemqx38nhzjmfad69my2a7umowk4mfolxwjozhuq4gv78217ozdnjkoujlydmnm9iuxl707ci5neakjsrq2pkzx0kv3q54p8c17gc7ezl81feplnwhlw8eb5shamente2vpt6z5ejvyzb2p7zfetzku9hcdw808bhdjxt5ppmm0qrujduwoomxist26dr4qn1ytky54iay4yesv6gyhorinyl2z309kdutkmripzqx17qtl3njcfgnjky',
                name: 'zf1yvrjnfokillv3m8gef5r8rs4jsfjatymtujgcd9z8yr5wmtgeggrirvq1yinxxgcm4789fwtqsb33ohpuy18zk5cw9u9tllag6wym32kynsk0kfxt5mhhpp9hker3ae8ktxl4xcvzl6urf1fc0xxkbuhag5loyb1a9l115t62othqbv5a1bzjv8ju7f5o9mk6nstd5n1urvtdt0ha5vmbe1ou57qur1u7wayzx7kqotdd8c2ejhoerjb3m5e',
                surname: 'xjq73zxzkkesc048cpudacxsbc4ov3dbi9y7rjiqjyl06cm0fklypj5pudiwkl5yepdm0y2jwilhqc0kurlkx9qudu2li4kyc378oii4mlo7as9jmh01ldci8091qy96yck6ik873p9r8rmsd0k4k9xgpezda58uxha654wejwqe75isv9p0oyabxjbxu91sxsf0325unkkbs7t6mhnxc0cmu718qo7w9dfws500p97wznd4fwgp55yb2djy5h8',
                email: 'rqwmzp70dm98olp162dz4uwajl4ae38vn9virgy4gelrorg7wny4ivshahsc1nvsgjy53jj8nt86p4anze47c4w536bptnkv9hdnwhkyzyrzx5ed4dcj0i52',
                mobile: 'u0swgszatcai9lxtfwjuamwe7in5jmwdyoosf52w9h0a20k4vokjlkl79txa',
                area: 'j6p42edwfk0kcif1g3l0qdhq3jlthly8n5nnmwgemdfw1fh7nh9auddkbhf6obpuplbl1cjbojox24b6sb65hu06hplzf85lo419z9jovpmahjdef75l2zupnehkcjc9g3i7sn4audtp0puq5bjgh06khir2fo2clkdo24byvetewpme3dtt2fs5f6kx9kmzl5lr8pkbcg8i8sbkljztdz6p288o1aw79jq323k2hkiuu16dkmx5bazx1fbv1n6',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'o7uv0wvgj19j8dk7laj60tq8x1hruxob8axbqogwhj5fbhpnhm',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'jaq2sstqfj2j601dvv1g',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'i5kdke8651n9rbfpm5ezhcddi5vl381i8vkm8gac3uis6htyf0fi71qcj23t4may8k70eivyd05w89j0gr320ghwsifmvq0julod9hrs4iiicxtpcxwpglfcrgfvz4h15vr7bh1hin94mjkb9xdtac8sdntogf8nidy9wzv52b2gtchkh3g55zc7nhf19kb2cq7agmpthylcdusu08rm5z7hdj6nyu8p4wmnwbxjhv4lo2h8vzcznnihxb5836v',
                name: '2pb1csm39cpanld2ln7oxy67jpwmaki3mkintu3rtrg0ctpas2gn03jpaor8pc1fqgwdg3u0zkdsz12jixsb93ro1no1zzcaqhlo0lh0q6gk24vrs0soppgmu5cipfeeoynet5glquip5uvfao6iwvbayv7ogy5d98xozxoheso9xwxyr76p0tf8kb1lejadrunhs9e18k557z7ojjewcpp6ozxz2t097vgqh5hobj79m7qblm73a1w52tng189',
                surname: '9nmyn77i04ixsgz4fu1eceqis6hojp9y2uvtieagri56v9pc6q6h9kjo57fk91c6ywxa467noa8btigshomb4ocdpazu5qfwpngrj8kgo5q73231xk9j5baipcfi4l5mke5pobid8vipy7hkigt86uytre4gi28oy0ktpxjs9lw4g7uigxx5az5fbuvcubhqxcaw88e7y24waygydsk0yojjhz7qn3plcvp0mr5dns7ocbei1j2jlco5of5arnj',
                email: 'i6u291oda6ma37t4c1cz0b1x0fjxiq2uyl7v38fm6pqye22kgu5o4h2cyb834fuhpd67g7j0f6ocj4r17ccv1itscw8etbcu51izyyrx8exfsxggbxopjchx',
                mobile: 'i37hv6128s2kewrn0cj3hh9ji5zqbbdkvu2e38u4r87ql3r5kamrfwhozvgb',
                area: 'nzs9b7wxg0qggk01vt9zt4omtchshgcguva4atc6oy92xwkaa1l1oqmsnmaicwqan9c263v8rjm7xaulq2rg1hoqz2ga7svrpas2y5vugnskl0n25aazue7oejh0e3018t1bqdfrt16use8t7gxt28nnr7yqv5c3qhr37aoh6dek5yp0opqus13l46p2z1rac4e07caj6dkqa8i4utk3g20hf8ax1v7wozjv1pfby1kv66d8q1ggka7gq3w9hhz',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: 'z0zp5v92dfqtouj1tsmssvfeu2va9ed6nvdgmf9utjj0lceqc5',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'cs2lz24w5h2lnlb8nlwh',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: '3n3s1oxkx2tpkra8o3u7auqvdb7sa6qri8xx6zaqy7975u6ihyl9jrwugn0qkzetv4djldhirnhv1mvuo2k298ahadgi45w1dejkghlxfvijlouk23ek02kqgwrytfdi00sp5daex0y291yyl3or752419hcry1m9faq1yo84n4mwyw7yl0zenc2094mzocnr4kikqkk7ed2adjr60p97edhd587n591qj1qyrhs9zxveh12fycj3qcyvvljzht',
                name: 'is8svz46a9m8766xlvaejqmxgwomur5naqmg99mckgthf1km8bs3o0thyy7zmb1z4sptloatsvb22ta1gqic86x19m9d2m6wuso44y6qflrx5bz912vbzbn7gjmos3rnoqgk807hnw5gwhnr72nc3ies5uh254xisj6yfes58sd9hkek9bjrwtoa7vgi64j9xuntrdw8as4gh64xk3dbuq7hwj9xct83n68e1j5z5azsrcpt4u0m2beukdzxkit',
                surname: 'yop60cky0evy0neo2y3aex783vzmprr1szlpu4ff5lm420f1jnytfqaldfy5bcwh1ra3b32y24vkcl0u6o299sis4ybxo7g4gnue8hewvh9cm4hbirgvp1kpq2o3rojwgs1b12xmiblt6rxj0jzq66xeg4zx76lq09329gjidbabk8rvpaqd633x25wgmtfvabvh2rq59lyhedlm2din786kv53edaudiqk940r0p8wiipsa37bwzlhm351mxwr',
                email: 'o58jgx4bdjl46a4m78iofy5fgpbvcl9klvfrwoavki5078c8c9l5fxm4qrmtifaxzq6oaxi8r6mjp5zk1p7ppbu56hf4c7e13nt0b0at15c5z2efonaahseu',
                mobile: 'focvsl8oa9t72qwz2mte0q6m6ss38zgi3irxc6tt80k0x8c6bl25k39no2rr',
                area: 'x0qqz297a13ikk8ck6qk8hpjld088ky8id5ianm2htsrd6e7quevredz0qdgpuk3nxip0e3e86g0pu5wdyhf8afhiar0syhqwq8nn013vrbkvcg7lqxpv7dar6vqip750otuls5uikjcy0g43igt92ty9q4b0zrv9odvkrb79r1bjyecjfhz4qrm06m8024h1nfsi8t2uuxh59qwcw5fsf5xa8r2oqfx3011wxix7e7fir04con2h0mdqhw9p01',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '84a9qjp8uqo1xgy3n6xa9m6vdmwbdcd6uk23y8d8wilugdj3sl',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: '2en4v123ixpofh8r1ewm',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'nb4qycv2omh3hx5m6qou62auqta65ry0upes9s5y9resa7q2rjitsjf4r192gts7tlg5udowdfxannmx91lze27fm1rhatbf5qgvalu5t6le6cejjztxfi66uqlos461yogfgu91msbiux63szyni4phvy43lnopwfg7xyaa3pr1yy2iy11l1e8owqait66m906h48868qcfeaq1xhefuaaakxnngtn60upvc3n6mxy6a5dh1mk7djcydel5kdo',
                name: '074rcv1lw5bi2pe7asr0m2v9kw61pjqkehvjmtnskyjirner8igmdzodse9o7aeyw1l2dhp5jlic23d711v2y4ixp8lumdqmcalrotdq7j0pk909hel1yd1k7ubhefi19yp3ithhq77kfbmb2qxoejdvfzb3akuruz1s6zds4om5h9zw4tjsvz3yh45lqaqb8jh47f2fep3oyc58r563wsqgikkvq2nrxvlxot8k0aly1zb7l3za43uhrq6fdv0',
                surname: 'tn01vi1iz9cnnukbp58k6iwcek37adisd75kh07n4sdl4gsi5e9ahzymh6zpcfk327nl0kcyh9is4np4l7e6fsbtqntyxjzp2rvx7oee2zpkp1ycqkaqqytfx031dekti8hkejhdgd1jpt7usdqylbezdo77porvlz76hpr8s14p2fvkxkdfek27tfwc6p6lokcqa0t1nhrs9lghaiyy99d52odw5qiwjhgtx2jiu0fmfcbuapijeqm15r0v2m3',
                email: 'qot870zhy4ca0kmaj540kqro8dyrqncf67g73bfzzdyc5v0fh6st31ld6rxo3dibo146w025glp5i6z5h8pnl1hypckzutvha1xxfgc23xxudk5mgtwhwhzh',
                mobile: '9t7exy0j5z3ze8u17g3jss8st0cajfkek50lztcq9uh6tznzdxdycfc8ivdu',
                area: 'rhis9aorp4cec1qhyens5u1e9nxml5tztf9zmn4eqrgoetiszlxk0f37wb7qsup5bdcuckv61qb8yxs4fyduk8v1s0bm0ox3wpje6skcd8g87uxscuwiuc6ybx34drp911hh6pq8zc85uv6y0pegg6vawi3l7uv9csyzw94ctb3qtfy0pz0y8ojm0km9j3cnztnwkpng4148b4tz3zip9a0h3yrgfwzli6a7omofjkmos3vvn721ehmpjxzyrpu',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6c3d299d-d062-4ac1-a60c-2aae22677bc9'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '018a3b12-9c05-4969-a7e2-b3803f3b9697'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '018a3b12-9c05-4969-a7e2-b3803f3b9697'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/66fb7918-2851-4849-a834-464cd985c438')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/018a3b12-9c05-4969-a7e2-b3803f3b9697')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '018a3b12-9c05-4969-a7e2-b3803f3b9697'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fccca4aa-abe8-402f-879f-f7fa3e342f84',
                tenantId: '488be4b8-9dcc-4ea2-8c48-5e2dc0b63696',
                tenantCode: 'jl8b16qh9sgoab4qpuumc576jo69r5lecqxwl69lh7n3ysqer7',
                systemId: 'f0ddd1e4-0761-45f3-99b7-801e245ee884',
                systemName: 'pzqtv4d89f8w0ekt5yo3',
                roleId: 'eaba39dc-f29a-45f2-9ab2-687384c0533a',
                roleName: '7h5tdw7becxcwlxloa87imt8yduqpf932nf28bw4x35yfpwcpmzxf3wzio6wp3w4w43zlyj75m6yz3hr0ykduqfwjc614ajx9c8x8jdyd9ur9bj02hps92x50m8ymvcde9xspxhohsx1hoy4up64bkqo26yoloow3w0zs5je8nmti0br2w6wh9c533zoca1e6gxgl2ibgh6iop1zbl76ry3e42zz3stisaydpjakod57v7z2mv8w5ibhrageqzt',
                name: 'vsx6uxj0cvg9t5ybheu1ko5qr3orl9yqg0mc9ftbm0bvw2l0ainyubmu7dnx7e95xlvmu5sk85tghwk57n4aieyldbh5wzhrvycuaanpb7sgt3ch0uykotsa1u0jggjlx46xzsl207vn1k2uwcusewkyxg036lwrii1bi755wn5fyd6fmza4sjkmpd2ub0cir7wkqi2trtvb6g5r1xoxv2czqoo08b0bi2tlbfxeajo5vzwlwx82hrzwlatxtzk',
                surname: 'vyggncqgkzsdphh8sda45hebf6ya0a7adaq2xlbitn1xq5a1twwhvsu4or21a8w39qiu09a0a72a3gf1tuume3inn45f4q1dwljinjpmvrgi9r5zez5ghzb7vk7be05e0wc07x78qs154n8yqh7whp1865m207d6tq47743fvpcesgmxjzcd7tnnriwf5rm5u1j3px9cj2ijsy7tl3tkar2fmw2ko77ls261woql31shq95yixkxc49kjzx6fxu',
                email: 'xvwpnaglkznvqnlc73rnl91u3mr2ptce2gkp3tzxtg16hkzq1nnyby3t48i8frciafz2v47vfbdzxdxj21e8oeiyffiqq0spvrjwhkmjqesnn65i62ph4i15',
                mobile: 'sdftqseins6zzjq6aowj89biu5agq1wemeshcx9rwbvif23afmqrldop5fsx',
                area: 'cc5ze14467ggtke4239dv3tppjaqrltnoxmtexuduuo52ylm7z2sdmxr2j53qmdv1inlc8q4t0o2ef7com30r09koeyl2omvfotdi9ovwnurnn3t9rtoxei6t8dcu22noyjjkv5yxg9gjxoo59dxe0x7zog5w1hfwu1810hd5cum7sobtt44lzl80i4tp9ad6hxo73jqju6petgtvh22du9q0mx9rqinimfcni51xfugcmu56vw9whmmwlfz163',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                tenantCode: '9sxquop4kv4oif5zyli8dyebuzm9wxoingku8wbbcy0aivahbe',
                systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                systemName: 'elxfkyth99p9j9xjzfv2',
                roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                roleName: 'z56cb4h5vccmqodqxi1svvnp1kftl354yp2lv8a4jbv3vsxopz9be7e1b0hkvelkn1cwbkxzy9j6zhgpcbqoan7xngvnz4q9tecxw47jbbfftmkfqx83rgoilcg9d0eemiq4xsr2x1idcldjs77hv4ufut9qu40p37z45anyh09fjh3jccseaqc9w42ppejttle40n6qee43hbwjvev5jg7a83som7i62pf8n33m2pum4i7gwnkhjv07ywhvurs',
                name: 'utovnh7cft6wl7y9udzunizxor79ojuzpqkue5ftf5ffyy99ej1tyro03w2noac2lrvo0sv5lldce7qfxxx19u5kshbsqayjv75osygvchzn56mx01bfbyitdpzogjrd591fec05p892mrxzudh5814rg8t0akxbx826diy03zmrvgh6bytgry8apce7zcqnuihnbg091bcfdog9t0kxofvd0tn17us7j34ffr7h39smqhih23v9mjnwq58xaq9',
                surname: 'iw64nw3mxxjy3xlwxyce62xkgtxsq86k53043smhztyfdg2s0a1crpz7qn5uheht52qjiwcmy3vxxq8d9eb262v763f9zf1bf80eilw43bk5jhh53osorfos3stpeijknlbkkzzob5rwgis8hseg6hub2yp7277hgeyqwezf6i1e6dntr7iwb1cqbhp0uag8eynztlbmcpuv8go0kwj92kizq0m5mkpdwts88qrmrenhsnmmcazbbvxwl89isn3',
                email: 'mnt2kb1b4lfpeuhdwbslhhmt947nttvji4qv47atsoojowjg41la5aggvaxtpkh0mw6z9wycwkc7ihkkl4a8swhtx3fx9tx12a7iks5im04naf5se1p1tsdi',
                mobile: 'p9bipd3iqi5ttcjnci6e9xr73xbfvzlukwql6ofrtr6pkmsn13qblaqrw7rc',
                area: 'o3t1ilts68h28voi99indqzxjj9hq8lb8c9hu0otgf1d2n8s1hor1ilp2un9el2h85dy81deukiddpyt9zcj5ndegzys5zcupjbkgr21wkz6st81gf837vuspq2ov9f4q6ze0fy6j5zr4964ue96h8pnaxhwgsxukkew5peblk8mjki3bknpvgo5cb9uzlopx9s3pfw9udnxovpkneohquli9qzsk9vvc0znrv5hahnhtckhj4p218p29pl9fjz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '018a3b12-9c05-4969-a7e2-b3803f3b9697'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/0b6b34ab-2f94-422d-936e-44a75a0c1cca')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/018a3b12-9c05-4969-a7e2-b3803f3b9697')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '74e4b165-0271-42f8-ad5b-a351b65f8678',
                        tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                        tenantCode: 'ivf9mtwebpsmf3bfj98yzabii0tiaf76k8k707dm0bqfakmtbb',
                        systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                        systemName: 'isqpn0mpz5c4o4uqsv10',
                        roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                        roleName: '3148ctsfilp38m82kjga02aw67e7v7atexokind9rdcacj2cx4xc4m4597ij491nz109ung6jnq3t4ujp8dig9cj84dna2se1ew9nq6aa6bvsjark5kqmnqop8v6hzc6ed3vt499qcq8vig9betqqqm0qjtx2kmlr47uajkdsijbmhmzzc7vzq4mh67mib2tmly6377fmbklvlsuky767yomf7ozd456ruvdrzyhdwngk3cqtbx5zvkbrajvele',
                        name: 'd9bt8j8z6g6i5656aku8h2aqdyj68a9xtz3517z7weols6vj6w539qbr6g7onbeje33vsrior7nak44en85g03ewtwsvpzi72u1ddg68ml25hh12xvfs6ed3pb0934ecv7ww6s03plk818o8rcxd2xolidd2fwr93wr5hbrsct2ixb54lcxtnb65e3sjugtorbie59ewinfvlek5ivll6id75vhtg9kfb2lkobn3dy29xdlzivjqnc9laz24was',
                        surname: 'wl9vvjro3xeecrip88u16fb8r6ftenzdr4otkfv5sje6r5rbh48avrv1d6kbqvyi65d7af274y1v3zpecj1x3huepj49ryo583dibkylw4fqaajrm2mnkh3xwsv86vd6jrlqkeddr9up2fav0bsfzs1hoi91eb86njzxb3o2d5veqjf8xw2hbffl4l4v6dd6avewk58tyfq6j5cn2opcsyh8mnonwmn0snjki00pg4ifj8ckfzfbr6btwhiqhyq',
                        email: 'afwxc5ll3lkq48kridejmpdbwp8qqb0w35h5wllgbzqoosms7m0fdgh31vru301ttetazdbnxa1t1k1sfo2gqim7zsddyvtchinw95c0jc3mmz46kma8x97b',
                        mobile: '903fhv1fn1rzm1chaj980sb17k84lypqfutckas4v9w72hmjvw3yyqjjmgjo',
                        area: '1z9ste94e1842ae4hoceyp3c9333lsf00xegxg78st8uahx0tle0xij9tmdqxso3w13mpdrjud4oj9nevo577wz2j4ouf3ymtw60jkpvnw6s8y15yq9s974dofdhtoieq3kj6g0upu6q3yxbx3jzp7qd4fjxam11gulytipbsuhl86s9mzokcmz62ubfy5ot6c9lzea9tikokm6gcgx1xmagunog5o6l1pp02n4ch41xjom7w84lzl0ey2af2sk',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '74e4b165-0271-42f8-ad5b-a351b65f8678');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : 'd7df8981-c468-4d8e-8c59-8e1d75e4570e'
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '018a3b12-9c05-4969-a7e2-b3803f3b9697'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('018a3b12-9c05-4969-a7e2-b3803f3b9697');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '79ba8f69-9a07-4ef5-88ac-353382d9f1bd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '018a3b12-9c05-4969-a7e2-b3803f3b9697'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('018a3b12-9c05-4969-a7e2-b3803f3b9697');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0c8236d5-0062-48c2-9cca-1261dc9807f1',
                        tenantId: '43b7c3d5-4f67-430a-a841-cdca9bdd0b08',
                        tenantCode: '11bjjiev2iimgtzs0paipaswen0l0uadkcuboahd0kvxam3mpm',
                        systemId: '3404bfd6-6abb-40c6-a0cf-f5d8435ca5b4',
                        systemName: 'fm5lweantdg35c5my4tn',
                        roleId: '91aca27d-a9c4-4f56-ac59-f3f86c9a7d59',
                        roleName: '1pscwqtj19sj0krjjnc6b9ve4l62j2642k8ifltwhldv1pkzr996vqc38jtwafz9xe64v6tyzojijv2ufpwbh9tqqp9uieo8mpv8u533z5ytcljk49kvm6w6jh2f5y1lm7wu4pn4tqof42g8r13m3pu34u26un6japd5ehjjocgcg6qnnptbsemqmq4uk2055kjab4gd5kzr9cxb7j3zm6eogilqc2qozmq0qt33lhorkec0kk2lzwd7023mwlm',
                        name: 'mc3uvk0m11igwy4xktd58w63rh8wgc2a2hpcit6o9gsa085o99760o5c1222h9tlysuhn28r9gr4n6yhkpkhhm3lqk1rnx3eohpj9y0an4i6bbkg079xategrix69uay09nwuqdjvtulj0ez1rnmtiwiz5b5r4jzhwo985tlljjefi65xnpzlp7z5nkgmq724a3co44e36k5t3soyky1c8t2m2n4us6zfbly761uml5v28bry4w22lkn9tccgxo',
                        surname: 'j12jcv1uyboy35ogjm6vmn4y1b260tcryptvguurmpa4msojo72wjnt4uny7ciw4fko8zqpads1z67nyeai1f11y3ye3n82f93w41hy0jzq63j3rn5x7hhn9yl7gwtu2vywqa9alqjchbv7pmggjomk7qvb5j68ccea9q3n5knashkghvd90tp7pz0cuhpfa9knqcop4lnw3dypgyctxb2ofebh9zedkoufv66srg4y8iehe0ioiuuvt3yijozl',
                        email: 'igu6qw2efst1ze5l5amw4kgx07yba7ifso52fphh27q160u8bazc23yssxui246xo979ufcll8fadidvi0z64wbc2wuluqilqwxrr2ujmog3qzocxf756kl0',
                        mobile: '9wizn440uc6epukzr0vus1v1jwlo6tbl4kqglc68lve5606dknoxgs4eotar',
                        area: 'v509f5aavm5z80bw8cn3ltiuktudy835parv6v5siikn40jxbpwdic6j40toazd3l1196fmrvl4aqk66u42ewoc4y0jc4uxlj15hr2uikksahqrxivp2ugvmgprkojwvf8umdaxazbcugo3qeyfe9y9sqk4xpudf0u1q5su41fxzlcc8f6us9qt8s0lfg2uelm4udczs183s3ae8ivdjfxpdmn4i2mehxgj16hkqn0p1qwjv1443px1n7m5xqvz',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '018a3b12-9c05-4969-a7e2-b3803f3b9697',
                        tenantId: 'a378e56d-a253-42da-8b53-5001a44cb842',
                        tenantCode: '9a0po3gkf9z9ef9yizo33q36altp0oasulztbaa1k1amwa41ef',
                        systemId: '28fc35aa-afdc-4531-ac91-bbeb9cef1cd2',
                        systemName: 'j2q67el8tzejrarspbs8',
                        roleId: 'b37a9d52-5811-472b-9416-ae0b76751e0c',
                        roleName: '78b20fugre4964qo25091a4afwjh3efp5nkwylp9a7ybxstavnngkoyaeiz8ioxs8sow1wmrr1va3ow8rtjuba0wjqd8n8w5hr3qeanyey66mkqncrz6le4q2ghxiljlwjvlx2z3njy60k645mqxedx61z3ausw9669m615panf5fnfkfpry8wyzvqkbadw3mrhr5asppwi6amsro8deu9ckem0rudft6s2u52mjxvz3bvkop3xni9o41y0ktwu',
                        name: '5600jb4v93ewnxfiqz49kk75vxonk74y7ei3pgluo784v8mzcs96a5puhm4k9fxrj9ziiuuyfj0y284f6pmz211vhth220hf04cr68ljx5ya1yzwsi1g10h1yws3z9v6bzbdugjupsw0g8o7sczip2j7z6k9bqeftwys0c5yojzao5k82ez3v7h5jzg0s2wz3bzljbi3x38rp618lpoxdzq73sb9r3b8awcb5gpwhnq5xz03nzfctoamnpn9t20',
                        surname: '8kiou7hk4ukazcziu0otgwdtzavdfo57po3kcmlthxaf33hnt7aiwjjyy9rgreamleeefcknn97sulbbkim3cfazpq9hfqyw2oumm1kud7cxnmkuj1x7rj5wab5h8ju5l3556ts7kx7ysy6uibx2rymwf0qgih6ygxekb50uudwdkys7y4chts4hh4pwienbj0hhm1ywvtnwensyyovc5fdumjjjf29wsdlm6ujf4mcajatsd0zfq189iy16a22',
                        email: 'k8rmdahnb3488i47xjdrmiwwjw476fpq2bqq7rbnd79uwwtczpbtjo9y3y0bvv4b5oh756s11tdtxf6xivino4dxuknsnr3d6qdagpyhfvfquihzdng1krlg',
                        mobile: 'lix17ezd3s2g6fazu466dsmtrwzmq6m4cku18mk7xgkuq685i3r2m381rn4j',
                        area: 'gi9ook3vkh51qnkm1ipf0uqqa82awapv6ifk6pylc063lsfi65in6j6xrjjfbb16u96zpfp0m03cy3vmlhroj63mu8wec438d2qtcohdko781129rquvncd5pzwfm627f32audy1od2ycoo6r3war8qhv4mhu2a2g9kytyv689tg4mebv6dmkuit6kslxj1n8bqtncoyuccyahgbtsuayhxm8ztb10922igb8y58s7rp0mmx3lme45v6zeio4iq',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('018a3b12-9c05-4969-a7e2-b3803f3b9697');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f76f6914-04ca-4d59-b3db-2975c1503247'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '018a3b12-9c05-4969-a7e2-b3803f3b9697'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('018a3b12-9c05-4969-a7e2-b3803f3b9697');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});