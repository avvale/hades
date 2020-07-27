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
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'jkrgebmfh0mrv2713nxu8v69hdolacb1zjiiay4jgdx8dmp1i0',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'idkubej00k1ir9skaoo2',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'kkiqs6oz536kzzre8h7c0nwniicn7j4xyn95a5pd053wuqlt0o1ki2lv8cfzkl7c4fna5csosarytmwumqxzc879skigifr7os2d7b8sqgxi1r9iv95f5v1ea9j1jfllsk5z2v7iqgickbha2k0c5onmlqmbgjah9bynpo8oklr5vix283qirf6u2yvw5jfam9qqlfwu40pdy0xgsrqwau6hudccj0pvwg2eq0u9n5x0sxpym8bsndbx10fvath',
                name: 'l669yv2mx9iunh5u5g08gcf7egk76p2cuywpyks5a553qfl49jozj9evk76k2zfqb30fjb1gsoxgq6e2qg1lqdzja34tvxev5b07c1mide92vov9e0bfztow8ozvpitwrm3gdntm72vf5fn2j58juujyn4ijk3i8sn9v9jwtq0s9du2cz39u8xnuxqlfqt8dntybibvrbzz74m1oto7hcqas3hlqban2yphrcvny4oxvo7t4u35iq5uvw3ij9bf',
                surname: 'wy1s17057qtm4n0151p518aha49v6d5tmgju8jgwxbmpl3e0bi9z0tu3o1ikwst6bpyipf8m98nu5kyze24146xr7aldlic79viq2iyznz2lzvz4wcmbrdyey7nnp12xi3qv8d3u16uxk9ymrixcdzgfj6ktxom79316uhoaqbf1z7u9nntbj62e2ub8eq91a1wcfq9jqq70e3e1se6sfwhjvflzjif0g56scjmikhh667e17nofkjch6k4pwp6',
                email: 'pkrbjteqlzfw8exsr5q84g1n3ok00j1x9uwl8incafbszwp3xlkted8epd1jo6gqj6j98qo7tipr5yoil2g5yyr8ueauzx146ol2louy9hggwj9muo3clusl',
                mobile: 'q4mclwxdjr40x7oux4ooqllt7seqamkpxfkbikoqgbw92cafi70n2msb6h33',
                area: 'hpokpa31ky9o0tbylgjrjazrnfjkc6jibone7us7x0u37p6x4qm40dgavqpwwh5vp4t25cbfwonawk9lww153zhlrm8ful5i0wn1entqyzqmihr86gml6uyat0j1ilbn5e4bxbspxjpv4polgbq3frc0sal6b6w5n875r5sp9iardstm3lbe17jrj0ioi5hcb8koem0y6ge478awka3g8q9ol087uxrxewo992hcgenupdandtgq47pogd8zvwg',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'fz2f38hekgfwbbvxcizf6j6vs655tzfratnz7y9oqhtmotk45q',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '3xo3c8watt85y5qbt2bp',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '1zpfxmby6s19myp5qqt64nmhr6jkli9g6cal4b6147pzgn88ki305jtqdbwth5pqmo3vxtgc16r7fessqtyejkjkef8026tpxjaxrg6vuiyi6tgulq745e0c3usf3ry3ufnxfn6tibu211suw76kig5ul4hy1vw5zj0od69vovl9geo1zwwdi7bc2x7er2uq1let3gqx1o3ewjghc85c6mv2aq95objg49fimgnyn3pkpcps4szu02vghrzjaa9',
                name: 'jaoleybkpw6d02ab273jcjc301io51riyuzqlszn6upa6h6sdrzjc4qrfr1f5efjwavruk9xnb8wrg2fb9y1dc7z0kijiw35g3ckn53z1nkjfhunplgh28xe97gr5qd3xcd8mvpj5a4tqxkokcmrds413kejq988j18lzr2gqwv2u8w8ha7wsey9maycgw7h829yd3wkt3g8eohxnc0y4iketrglwqzemksi5w130a22iqwzhu9ydzx67pw51om',
                surname: 'ao1kjdzqqx9txs9lmv87j6cqoo4bi9o66uw633oat491ixjgtg1agtfqc84w6hqg5r1j41iakr54yke8l929c721ttmbfyw29can1rbodt97kv3draght7kjqp738c95kkrd6h2lm42cgntqz59ezp0yjb8xeeflxqs0rq2st38bmm6k5aqnbtpcz9h2y4sgcy6p86cjrrroeehg6eenx25h1xta2nwjv8n1zmdaxpajgm1o7p1lz4nk76j6lwn',
                email: 'nzu9kmtnxnjkb66ytjzukximuctlbdhtk1lubz556ljhszoy61x5iw8iyc5hi5shzjrnu17k3lnwwqgoqsfudkf2najndrmmq6951m5ovd5gpeo0lkm8i64z',
                mobile: 'oy8kq9sbvmyzw7hqoobgr5povyycmx2bxkosb6br15xfaxt9xn4p65rn1zoz',
                area: 'wa4fmf1u30jlggpsm7u4bchaee3e4xs0kuqe13dutj71cmryliqjb4ec1wkhwt5qqhjh9ta5b6mv1pan5fqbkjdykazsvufu7peumgmdjttgyw7afygprbi9644tjzbtbaiw5q2ftlsluwbaowj4mf5m2m503p6qmn8gwlcalpbpoiz5huvf2ur2cpz8pt9jrhuehtyxlubpxsr1v80dziuymsk3p4txx7gwfl5zcx7n6p6mu4z3ni5vou7bjaf',
                hasConsentEmail: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: null,
                tenantCode: 'oav5jpsfw2m88dag4dg5apapjoxbut2cokvyfg1qlvm85gqbtr',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '4cxjtnjx5afp5r8cqd9q',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'rihuefy5j9fymz7rhnspztov7elrcox6nd2ttjbspaphzbltxirzrrh9p68cw9af26913gwe0tq36bt2qs2es7rum6u0xo6ntohxb9vs77fsmol2013wvkwmjmucmfykqf6iqm71iaiw1i1ertolwf8ms8y99fl4bz5q4fvofh25y1jdoj6ejvg1c52justgqh6nugyteun48oxjpcl6yu66knlkkh0424q2khzd3xac30lh8xu3yip1de5atbv',
                name: 'lrla2hld8o8wkh2ee2bzqebbvwq1eed01yewm9bayhvdlipovqm9r4u46abj40dim7dgtb1p9cg7gy8gpm1m9rubus0qct2g8b6cehrlasx3alxhhnak2o193otxdwqea3r8qyomjk67r3q7jypcqcupio701dtjqsbwl82tf932wn8wwuz5ub1c6aajkkhei30y9rpsb3q2r755w1dk3l5b48746eqy3znf05ciwxh7slq2twtvoxe09agls3m',
                surname: 'wl97qofbz2pillzciqgu88jtql3h2b6756iw69dwvbg963my3ts56d2jhlfv5n4gyrqv4fpewsz7v1uy569aglq8ouu9xy867eueds98ynp4umuyisodqsd03nvkbzsllpd76sx21kwxpb84knhta4ur9ofhqdrlccjeuhmqijf41ev4kqcxzgqt5op7fscyoth3mx40va2t88j73lsypwolmhhr3tjfywlyh616xbp6ovas5c435yc0awtbmg6',
                email: 'f7kzvvj41qbk39uqupvxggvnge270pxudyuxdk0lawndsk7dv18884cd6q8lifej3q4yvanhtmyo2al1lh01ghj09vgz4x58bikk29fen5fu6n05lcp29e3r',
                mobile: '8bgi99mayqc71kmauvv9joviiay0ugxvaiyzfgs3d715fbq6eqh33pzs7380',
                area: '5r9bu96omww7xbn4nb3qn9w8juyilc416e2ktu0004x3hx2labbl3gubm2x8wiixby8tav6ha74tpu927clprvvwz4vxl86a9lozj48us8y4885rrxvg1shtc9f7mm6rm6pl9zikwspbg0fr2zobuh7e60p7tdiybffxbfd2lpgztqt7ntkht4hdc2qi30yamsdpjq9qliu3edpcwl1modgw7ggjnh0ffbm3pw2l4f2wae9p9lan4xiyo5jy85p',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                
                tenantCode: 'cnocaidcpqa69sm22lttru7xgt8pjkkmk99jr8x9pb5r111l7r',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '0cqkh7n9qrah621sv7jq',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'x7tfh3q9ublids98tt6cjzvx3ip0qzslh4tgrfzrab112pnthmzzmwj67i6cojvq1rujyvydpdxv4lz864xca10ndjvg5x4ioesw2l6fys30ohqm5azi0p5025x2ldyjx2s298yr5mm6x5c4zhmkb9t2zx7kbiny9pnu1fwbbj0czd3xe58txotwq8gij70kqtz7q4x5c40410ku4mjr7un4tbzlzx3y82ym89x87sdqgrup0qatxqggniunvrd',
                name: '0yo3gxqtj9g75csqq87k7tnqbe1pqv30zyeq8sz7dejtd06bhrftivxu5hffyy8gq26i0f4mucqgqme9mt0lduja8m42j0f9db5ehvg7t8znuy1laaeds7kgki1gzqrm303fzmitw0j5b9da9ybc78lwxwd54839mbpo0ml6c8vmnlvhvwg7mvnjnwinvj8now2he783pd0nxyx5vi3lsaw1ctv594pgjxdmrjxvi1usc7c2ki7j4ruslgi9xvz',
                surname: '4g3mg26nygpdqlyj8muhcqs82fw32d517bc737y76rvhxn69tycdfl1z5eqm6z03suc8h3r3ze9blnh7p83f0xceeid4fezprmtsctsrofeis51sv76e5w1yr14co1b5hgbaxf12qwsqddgj62e0egy4ffm6knyosinokwtok4piiwm3yvcddix2nuwnjj8bbvze9vh8rnelw3gh3r4m98pdxj8nyfthy7o2bmw91swinkb77kujhu2jnj27dyn',
                email: '2mp54w0y3s75foiirmv6e4g7u75zjohkif1q51drp84r49w424csf5d25xfzjvns7st3an0l0v6wtuwgdzyw59q1j2p74ptvlqflfaptnjj77a68g3pj46p5',
                mobile: 'hg5xq84lc4jfvfxsffjff1vfio8oavwffj5oroawhouvfsw4al0pe2b2mc5u',
                area: 'ofky0mfbfnseu2mt20cim1b87cr3vd6kdm4rxsylnewt9nwl1adu2631kckq9i7p39sdb4gll61pcz7w0csk05egvqs22jpz0t5qhj0idg099o2xnvwloed3fv29xz6egfyouf5f6n5bichsunzrvgtt5fbu6gofyld6em51qfzhuwe3pe43pwgpevork3l4cma0ox6afxcaws8d7ba4u22a5pa9b83blcz2ufpsvdh7tle6iggm7zqtmb2wt9m',
                hasConsentEmail: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: null,
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '7r6f9jvoull6001mb2yq',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '3cyzgbd77amt1s4lmc6qmgy5im1mt7uejkp2s53a46y0cu7h3dkga2t20r3cqqwq3omrfuuy0ui31bgocmeetyze0khhophe4olkuuphl7ri2724gi70h8b6w00femxtywzrekfawu06p4vm1yvsahc2x0yv6yv1e9b4lakaxxvpqe4822b9xdrpiuz0kiwi53vrwxtoahdx31opchqk28mw5sa7dm06uc5nf2u28cnnpj4lscrhhfx0nentp4e',
                name: 'r60aev45hi2y2p56o8d4lpk7xp0cnxpdzicxeycs06u356hu32qmf2yvcvnrlp1lfpxx9zcwhq2hqq22ftkgalzqb3urkvcq8eonjh1ysaug7qmgq8zo0ew3ysu3oiuy2llb9k6sv16441hvemujtbdkiphhviqevjzy5si81s1v8szb6ggbavg03rk1thyflnz11nm6pystvjzxbk07bkceeofjhczxjpcxivu3iwc7fzas09g2dyzua87zs0x',
                surname: 'v03ly2slyjgh98wqaqlwzovdeqyrlrcwy9l78uogjb6eaqv4hyojc0ve0q5z3xlkfsvkrpfy3lno7vibydhtrqkkbthsbpqfgmdkbslkf1v5gru9k2r3vcbz51qxjqbaqb80xfdjqa58ufcc24xvwbzl19qky096c2p8lvzktw6jzw93oqavlw3vdicb93z3g02028q5kfsucejhdqv5tvwcwf2awkar5r7lsak8f27waivmjztxujuljwcg6z1',
                email: '0xa9y1xs8c0is6ehesbfgp2fqh36qk5p6oq4gilofpyz2oo4c6en65xu0hhkdowkdvnurxxmt1ui4g2p131kfydmhyenwxkwsri41993qx7ehapylsrsscwf',
                mobile: '0g69o4dsfbd03mgro4mvyvc6vpfcum96723ukioc1idv8t4tlay2kn5y9a9t',
                area: '4t3mr6npiav3k97vxamflvq33l3snllyvaqhj2o92hiblqe1vplo1wq0pzzgbzs57aeiafroywwuxovmo56y766zfr1usur2angdbnowvpl66kyfcsiqa0tke5rwf19472gwalqvrjw5a5g40atc8hab9p3qfn661o8y2ch01fnrhlmsi6d7m0q2bbnj3udhuukwhilxfjnaoa1mm6kfe2yw10oeh027zttsy4sas2niowg5xq5dymfbnbkk8x1',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'g3ytda71a04m9477kgn1',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'vhsl8rxhgrzgsup0n8dbw3i4dz6t229ikci55sytsbp8ebomvd43zxblcq6sisa2ctudw4gu18rp9v169iobyq6yk5m4342rt54nzgyr4i65ry78v5linpvp6i1zie6ah2ekb1pl8cick6w87moofambcbsnk8esl5znj3qx93fmmd5rybx1vgvi355zrc2ka4d72ihojk21sd1g7j6ymbug8jgon1tzwbyu3esh884hnhto0xccy98fnvlwflt',
                name: 'u3vljnuqs946343akvmtlju1i8hzd83brhidke2sttwssisfl96par41w5rmr6v7srp0lkkd7twb35o9zeu9k7lnkjrxy2whjk7kk16phjephpqo2kxwlf566xr5ufz1prhji75sdj6qa869f306uemmck2py47hk60n4sp9ixit7la6x3r4ist8c5d24ehderyi2fz931nary5b3d05tgk6biysgbc1umethaxrjm5iq3q5w3w3ytzzzghq712',
                surname: 'w87an7g1g9sb5d1e4tvv9eihferorakbuqlpfmioreb8a51pznqkc80hvlyr3r5sa9dtdwd12mzz7cu6568pgqalygznjs0jhvfq0r2sv89y0t1glgnttkmk19wlk73z04oytlvw4wys5nmu2vuxs1hh7rly6q9f4jw35pmnud16iwb9ywx9w6jmsit4ec0lh6o3hxjmqf86qn9o7idtl6gy85edn8efvs2uwsrssd435yf4tgs9q7onygh9bfw',
                email: 'o9qtcyaxl4dr2n48uluk7h3j5mkz1ivf13mf2a7ey74c9llczc7la6ufhzehekg2qq7pekkb6furpx3q5dbeg9t6qfe0mm7j4hs54dw02ojtecsrq4eh32rc',
                mobile: 't6jkzx4s6aqzrojci4zvaer8u0yrtxrdz3p3hwgta0o0fgayoryv00fn1nkt',
                area: 'vxat55hm5bxppzuu5zrhll7s9vu6oo0cwrt8dcjxtictdcfnul7yffamawa94bg0bvv7rhatt64trjjreyfvvhksowyurire6woii9vnmh786gqu9owd522xzc1qfjes9t9i7y1dnglj23onhvgr5w7ux1kntjjv35mv8cjx0bxq258yaob3m1ekrgplds4s1yjt5izxzvl6k7asa4wp1izwqkmsb3kqcz4buheo6fhv2x8w65ugcnf0z8zreta',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'xxsd7t1e6w6d520oc8y2rohkhmy0v5eqkeknfp9iwpjqfswbeo',
                systemId: null,
                systemName: '6wo01x5sbznysj4al6u3',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '7u5jiqc1w8llcqwgys4kwjwgsxpx5gpkvqnb3es79iid71ikaftl6hwjapdydwxzkhtahua8q39hgmnvkcsk1tzaczbr2kxhdfboi858ha37sxsjsen6j9eoc1wd9q5o59wcwfnyfde2gqnn47pmgb3hqnxsbgb7dsx9cbs08gxi4m0gkh07r7p8yr54ablsek9bqubfpbvcsglu90j4pcuu7ervei7uurbt01vnpwo32thfziiqa01i2t6r50r',
                name: '76gqgnrucea5nvk78ke3n8dzdugihnzed5reviz9iaz3qr1klsefspk7xbcbdtozx0p4eauq0rlofgh5kunek41jcslc0ug2t904di0nu35cmx76gjzy8jyxf8w9ipumfmamh9bp1q4btreu8wvp8f5wcpcpnrnbi4w6250eoqfp8igersd3k5vf842k6xrg76njt4fr5xv2aerzlung7av52j3iycoao77x9d7fjo1ystfhnj3g1o34j05thu9',
                surname: 'k4l2a2qx4vs2s2ws35gaxgpmepxmnk1dot10m94x2sqvuk2etivbo4lzxe3y3p6fmen8b7ouycfjbcyasamjij0c7t9forzewstyx19yk3d948mza8abp0ew1zb0xle71momk0ij3xqdaueqocubs21hrz9x5vup1po0579qz6335nr8nkbtq3leswqf1gmzgcitj3rvy344a7v7ubup25ilohd1wjbxx275ltu5mt8ef1krdryi4sbn010p5pf',
                email: 't56h1g618d0y77mvdz5piqw73zoa4lwad2r5wfvukzjb0aezg2c675ef5ll6lngpeaevbnvgogmn6qi1xrjm6688ilqiolrlcyvaig2ubukvq05afpyn2xva',
                mobile: 'dgmqy21oibhl72041t4jgcux0obj7z2745p6g68iw8t08jnv5dkgyn9pi2co',
                area: '06bl907kaexo4ghal4pz2avq8qn3rgdwrbbvw3a5ctb371va7xpimxl61mwi6q2it133jk6c1sjjodp33de3xaeeryfpn2gxinkerrf5cknozy3pqy6yievkh5eyok5ctja8st7it2i73na2g4n6xs0645v2gdftyzgo2c0qmgp8p4y1sbtxg4t6r81eahkhdg8eeyhm6tjodn7sdnqlqiwclxx7hmjeqljel5n061b0iuwmzdj2bfkyc0dtr1r',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'llu4dldhgq7ypl7rko5naymqtixqp6oo7y00278rcvcpxxvmqf',
                
                systemName: 'nwoadilu0a80u72yga4t',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'enfy35iuv0ietzbooo9i8mf63fpbg0pz2zw8lhrc36qbmkam233f48fuu7nocjxjnry8pvxzwyr2shcpn8m5joxgbuymsigb9q6p0zr8jpfpls9ezwfw29aps3l6aqai40vj8fr5w3nlyyj4szwtm6ugv1erj5whs42ctymez9jk4ycixua5fbo1rbesleaqm0tyoxzc5b3hzg90ndzi1btj6yon01oj48kol83vgh4n60u802wzsfw70olbehq',
                name: 'd1f8l80zmgjo3w74mdl9z18tzuvjd6xpuv8eith6kgr4s1crbnhhhjmn6ecdfy6vsy5s0r5zys4rodcltfidbzdigucit5yy2yb3vdgal2b7xaj8jmcbngmlvngu0zpmhqchlmczcioktcrwm8336cl3y0mfp2k3c1ijnau77fpcva216cmqrpzoa7cic8jt6a7flb18pgi68pmm0y5cajqi39o9rxpxcmfp0yy4j6gt4ipwap9pznjb3fewigu',
                surname: '26mew9ibvmgr49bt2kvcus9m26vocsyg0k5ubj6ott7l17x7e4itihweeg0ij9ls0nr89capumfj05gn30mizv92ptbqhpk76hqesxskry0uuz49rmsjrgof1vq4vyeopjxcutnihpqiube6apk8ubl7qu5u2sonibdn3wp9wqtgwf4jw8wjnkfyizfczskqjusikud30w6qm2qgugpcvh8dktzom4fd5q88dju9heaxedqbrr86967zpugchbd',
                email: 'ob9yzpflam64mryx396baff9ldnuf8g8sv5sa660wmbq40lizxc1uqmhc5wap0uf2c76bdeldyt6pk3jlprsbcs8lwtg6x4mewsa6sgm8v66nlqd5sm1y6nr',
                mobile: '5336l8kwkceil8bkz5vfxdtpspiyswkejc0432rwz1e2ic1dxmoby9nu7td2',
                area: '56f4u9q1opczcqx1slrfave1s6t8bw7ul9y2apkxntxobz4rewu9imqxv1njvzkzdnkqvutj3mtx9leh4aexutfc5krgfjoaxwbbewm5l9tkc2jiv1pr123fgu7uqzf1v6708lsydviuxygc0yhxm8zueo472q8pz17po1ab0lsx8nfgewu7uvw5uoa8re7ahlhfcak04q2u46sewjnp1sebfny2e4xyuadvb3kk0vox8ycp5fku4zfc52y4se6',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '14d8083j5od8i4vv5r6ad3ubdjjxq19giwdqni8kibm1f1ynti',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: null,
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'qajq4uuy0hwo0qlru66lgbjf414uyyvkr5s9wiikcyt7j03n3u2xcj08ysoxdi104i50tyloyvy2lymthnfrwb5976tzmfdhzjrs9uxsl8uc4y3nkrjlxm4mtxfrftl4se1j3vcen8mag0k2vob1xo42nbrkc3jjbsk9yewrzku83unp0ht5u3mlle8ruo97ypmhr85k4gch8rfr93yyof7g7dtq1oe84s48061cbyow8bmkzzqqccknzkqgb7n',
                name: 'h9yjp7qvjn4xkd37zbfofndggaimy31af1qew9f64b03ztzhxej2b21yoe6we1wujt8fz1ihe58iqumv9a16iw3gcly844pve8h8zllkww1xriuyeeunln87q0gm37jk70ndg2lfz5qz53ofxmaxkr0ypkxrec6ois949egtakubntbxtyp7o5vu8vnrfpc0d8gc4oqh8ur21xv6o7yblw3h8z5s4d9hgfpxsd8cwbbpe7fofemw7gg1o7efrue',
                surname: 'a0e4rs9du8uzkrsnyrlaplrlaen8h3me035tfn7ojynseyvv2jlafz1mh3b1wdthgl6fupd3et9diruyy58zyc2bduboj2ekrfz61wvexa7mlzgoz23k4a4obg32i3brz461ubt5czmebf2ujh53gyx6jseixknllidmgkex8z42jtad7qy2r8eulvgaw27k0l51d79sqhebbuefyzmhs6y4j9ftoev69p38gz6f10npx974keaikjm921jy8jv',
                email: '78gezud75qmfi4e097db4a5fpvxn4o1vind4lxdjgv24byp17bm4zf620wwea8o0r2w10w1lvgfhjetowq06zntwbafxaj5chtsxr3tnr2wfipc7qpjqsv4s',
                mobile: 'kzm1ymb8rsp66ypgsgecpc8lyzh94teh4foznyvkbjqwdypa9vsbp5x9x0qs',
                area: 'wqvg1cbprc3ezxhzzev9wfs8cmta1nsdnba2om93flxrqtacecom40wb9o870xp4c8bst0cod6pym4bld35xqxiz5kx7gf97rbggebrd6nannbx3ksjltnyjtueywk2t9o5zipk3ia1ahkxv0k73e106b3m1811ly13s5relptk5ygzm8t0dnr0cthojel413ojhssjod5hgld84mu6ruq7l0e0jgiqdbsr04vvr8gejrynh8of3bvyof2y15xy',
                hasConsentEmail: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'xnoz1m2ev26c05z5t0nnsv7qsnkpvbh5goefub695gou5fnkvd',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '0yyrr0vn354c768r1pbyms7sqymhw0npwjgwz5j9psmqw5hokrkwr6yvykhd97nuj9o4srtstmoqc7amyxxn5mv6qdgvu5nsl8ribg8ydr4ylfy2zmvcj707621vkuhrrjp9vsh7d3yycclw64gwkambo0pt0fbeu6ihw0mrk0yyrgufeg45k2mcbpp2cga094v406g6bi13vjjj7pl9fat2orjlpq9qic7oqnfqu6v78moaycfpv3xjqbx0wjw',
                name: '6roh0znvkaw5r540t0lfj0lm953wsl89oz20sjjzu7jrz0rf0oh2aebabjd7qzhy4z6r35o1uf651emivdckn2x014moh7lkr9azruizzyayw82764cn3olhyaxc0rdz6fs84yhb128zfx4ti1zy3nf557heowaqxutvcwn0qluy1e71r45nc92cvs8q5hijgkoc3sa198jellhna771mdexn2v6824bj8scdca0ua4gr69cl44uxhtcp59lym6',
                surname: '0ueo13sk5hixs7rh99wikkmw4fdmvxx51sqk0rzzsdxl528ayk5c5054x08p7dbr25ce1ukf6qdqkofasdzdo54lp99n3nll2kpcdyrz66zzjdw5zpojth79l33hdjs5x9efbcgoidw755bi03lr62f41bhnkv1gzfbpc3li8i4dgb6un7mk9luwnkmwmkj70o8nasyci7o42gb9vo4x4s0fjmixqjgpdjjyb500timewfsafgxnqziarbjhc82',
                email: 'ewyfqmiza6zca4hvtw2dj747omyo0hd0bb3d6gddxpy8eywv5zquvj1gst97bxn003vors60zntsee3svyq6wspug4xndy7rbi5a2wqwkgsduid3rxbsbkt6',
                mobile: 'cybxl05mit6gi040dh4jhk0e0rx4x1u5a8u28t5o1o46vzpt82c8iscxchz1',
                area: 'v2sr5b78a9dmfhvtp22jfw8umfhtpwbpik4y7y54b4ae0q234urxduzbgxotmcblbp8xyawwe8y60rscjo7koh7ciuh92t1zjnyxmnohdqanxxwmtl1n07xd853jyp2n4q57q9hisa6ywxy8dczzfxgwa6s9rgh65o8d4q70sty0omwmuwtavv7iqv8cazdxhlrns35o9ek66na0hv1ev59zav4zpvvp1290j6yc60erv8lkbuy1z83thqua08x',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '1jgzwiys1297daddgxfcx4ya75lwx8j1krubaxonq3qwm2np4k',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '6lwt2cxyhdv7cz8mwqio',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'ppzt2ersyfkrp92mnmr73lk80928qav4uyoqdr20kqoz3a56ilfjj3i3tg29axykuhd0mlqv3w5h1zzn608sdr2yoaute33kwpuc1ky9vf0dxxm6ctsn2wgn62m1e5zb89qqw2z6olqt19nvfhoxw2vew63upurakn9fvoemqhwrsh8ak1niax3x349r2okji0a83b2f7djejp2furnx7ml5aywl4mx8pn0lbmrgxbgr2hkk26qm74dnd9rhnhf',
                name: null,
                surname: '8423h8123fj9iqdshq73xhe5fuzevdyntu6lxt3a9timzvan192ww35u1oukxl2e23oczont1lptrmpt9egt3aalnyjexuahi253hi2mk2pstncl4z0gqsjym8y2n63nu7xx1ji45htim9mjbli305xar3058r486un4le5v5rglsxz0cftw2vvbnymc8ifa8jaceaupzgqr6un9nge2zaeshnaeecllsw8kch3qivvywcpz3c6y3tm5ygd6p3m',
                email: 'ikqyyyczbpsdd54n0l9ufysk2ht65v123rmmb0k0t0xkk6qqjl0x3gkj9snhji3sttfoxl4a9z5lif9tnezas0xsi6ej09wv6mdvfvoxwapzl1bfjpf93eka',
                mobile: '0vgsv0yl5n6o6idfijrbnwwvroavzmcmm66dd5hc352u1ajt2swgali7he91',
                area: 'tbgxsafwx481kdavrushtz8xqymbmfohcgbcsxe7z1ygupl0wrwaj00cwo2i908pqpph6zanxzg5w8wa5sye7wwk5lzrj7wd757de40dh1mhc31i1yb4d7rn8t6gki5c5d1zxlz1vk2vm9h0ns9jqqu48265sunylwl3vta01yfymer2d0w22wysc03ba9sry9aiun8bwxdi9o7m7ke5yzteyhchviwr09jvst7jdx82z29pgzv10et3kyj6cqm',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '45fahzze3cekojjedjryrjomgo0isne086ly8cb5d9mg4uzix2',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'qomrb1ou4fsr3knyhg9h',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'i1kg83i0wtvz2sv6tsx2exziympo3fqo2aqzj1v8hvpty5oz2ploswemsmsa8k81ll2ul5wko797dz87m0i2gx1nd3qxx3croyrwo1xtoebhy520rv00acolvmu29toiitmwb9taejrm7s4yww9miyqk1k6bjoxonvp2j984rmi0r8y89nn9z0mwwyawzust14me5xz1v47n2sww51lzm17fxe4ph6d1yrystavzqc6kxqcbhkysse2hz9iuo1n',
                
                surname: 'icw59s6wzinygglgkx9s261a5akq0pl48vczmydgd2xahm3ha8vni2fujsdfstkdjqs5rbx0g408prwqi0w93iuzco45fydzzjokmcph18ed6vgsbk63rkq685n7j92kdnhb0wb6pzqh1hnaqr9me8lt9xfmw48tlfnie0ndq7q04j4wtqlt39nk4zkr2a4ny8pvjy4qgdp5gnep3c5g9vhc61i6drt20h642t1nxbzbifyzrrrjvqh1x4b3f04',
                email: '9shqfidmgo5q91oodfcz0iuhgstcz47un07t9o2pcf6kgloxpn2tqvh5cdiqzboti3ll2qkt5gancplzylf5aqkafmz4ivzbhpmzek1wo7m0pb32vueh2x7y',
                mobile: '5ouxn6gmu91evaaia0engfai8u9f0felqxbo9soui9nhezn71cg2lajsw0i8',
                area: 'lw4taffrl2u3f6l68c1d85e6qr7kldtv9hnlbf7p58do8oruh7nt2ieifnye36ssxmw74usmr5ai0qrtbipthwev1y4bbsfjplu0ccq66k1f6ms34unjv0qxkcbyz9cbn5wwe12waanzo55km0agqb324sncycho8khni0xjtd5e7czqdh0gtalhf2xgqs5cvimzb70vlt4cbe0snmipfbu8hfo4a4vk371wjlohg3xiy2ai78jcowb46mmxv4d',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'vo1bekx2702avi2mj31pxexiahv3wb8auhdaiua89pskhhlj01',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'h4sdsg9vc22lss4u27wv',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'xolygjovuk1ix8bdur8m17ajjruvan108unu4y4l8s4uj65pcil2hfm92gtqe707v75o4ae5qpsq92buxaft6lj42rx00knik1t4rv0ituwq227ey276a8g36e7i51mdfxreboaxj560joscsnmnyiaguy6eh6n1ft27rdnc77iqq4kk48mliddz33x1xsg0ktryv64b3mu9f89z5dy4xdki9drh1amr3ssxezq17mfj70s4l57hw54bg1djzza',
                name: 'wr0k1btbw813hwvpdegmf7zzgf3o2tt7q3xw9hr2t6ey3pnbiksg0n3pmj9y8xyg8wupan0rrrc6c5ff69h19up6uxbbl6h250pohvlb1ewkjow0gcacgudodxs1gdobammjn7vhx4w0q6tcndxgcyc7kzkb3lzzkhjn75u3tb58alemqchck1p3ag8f3f765j8kzqzrbtgctzxvzsmeajo17qv83k8fprv9umhxbo13l1pomu05mbltd2iqohv',
                surname: 'pgg5alb1ib3wlyjtlhz5uueo1hn74d8r4ylhlzpgm6e5a7cix4y6lcvbbjfce7adiww4xlgbzyuiuzq40cvx5rrznc7965f0fnaqv2imgxyojo0ztwnehp6m8c1l2a39qsbhyq2gykjuyyl6a9gllxdu2bjt93h1uc8spsl4evdco5a0g2hawr5g3vo5ber1nhevw3x6ypzzu43jkbbf0udv032z7s03fvcfy3kbn23xa2xez78t8xd01vnrojy',
                email: null,
                mobile: '2n51ru3429m8w5j4dj7h6erughiz2g6h2p5of3j3pw8lhcpy7txhuuwirqja',
                area: '0ugm1ot5bo831hqf0qxz02cnti6t3dia5u25yc2m7ias5o79hq4j5v1z2h8i4ncvjmquew83ihvwaz2k7k7jhk3c213ox2znp90htn4n0wkmh7ul5mrx2btrpxzyjinoj48uo9c2hbq5jhxmzcuf2g0uws4suu5mdm3mg8t8wdattvnti6bvhmigo17lrhqjto2ge7ixl4m5tjgstofm4ntww4pcok63c72d2egw3mbrrefwopuecmqrnq0rwxq',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '5elja3eeq3v5hr2nmogjuz0rzflb8qgr7h76zkommx2schmfk6',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '19f6c5qx305iaobdr4qr',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'nzejmjqa2rt66iucv2zofbbkn5msccd2bbp0gsy5pb4c9ou9qocqaa7lb8q0j9cnmq6uan2bd1sj7l7nrrbzujq0gqj2orzk2g02h4ja8oadmep7gh2w5dzinqwby27ds20tmpjwynzhpph2dny9w43vjyl8nfj4rg4vaxoq19hm3fid40ejv41g2ess6j9vauspb10ww3gn7rsnrris0iaqow4toep0283fslfcdobbshtfnl0px461rymqxl9',
                name: 'bwrgznb4q0g7v0aaj4dd2i0vsl2ryeedwjjk3ibof7rbvu250xuhhy3rv9mrdljghkajzuf5toj7nbzt74yviczb2us7m4zwo3zm629l65su61kph03ydqgw5yz4qoqcq4vtiwsocijjww7evgzgehtwr6k078g8m7xlio5bcs1k1mknxmct5isnmow7fj9vud34h50ngi5znhyc8cpzxkywylnjhwpsdgn770f19qxchwxtiqfonw0yc482ons',
                surname: '4g560pnm4obst08fqo7zbiwimscaqicizlnf02c05qz7uge3tlg5ghjh78fx1kumranqt56axduvac6xb1yw94uzg992163328xl4mvinpb29nqxd6uphi2517hvzwnuks0v1zrr9fn77ekstddj2tq9vky4sekjgltgyc4frauia5jd86o94ras4m25mesn2pr6sce1avo37ud42y1zzgap6176dk35rz2p2rt10nhfy017uix6fwvb7iz1fq8',
                
                mobile: 'edmzci05s8incphon3c4mim9v9kwujpxn2xdp6gj3zwjuc1q2pm99bxz4to0',
                area: 'hzjgj8gl7sku4vb507689fkn9z2alt7r0ahl54no0h4xey6q726os78658lzobrktdsokazp9012ivek6n9fe5mnpawrgyk0hanbemb6zy6jvy6pwa8hnknfqv0w27pe2qyevxigu87imiz1w4psoecp9y6aiioyu6bwcqdgocufdqniu21gd0kx3ejzrsdd4oi8294eqo65x9efmar288adw91trabu59cue2phd4b4tpgeoj1n42ey8jn02tr',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'hod7gz55zjh2oq5dsqrup9emfnl3oa365pgjre9wkx2zbsv1ho',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'jb31soyq1frnxqay82v8',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'aeco8s2xrvc1k7fimkhtb9wdf3kgvgs6szhk0sbflhtd3cx31rv9whox1hyo2ky5hwrgmyl8mtivq014k4c4xh0wsdkw90hlk7meou87e2soo99odwfn40hg7s8lowfbe2p60g9hsch4qowividdvdjqt5p40qese58l3baejimd5mcbirx92os8bxta9xhbwglwz1hpjct55mfza2krlbd2upihn6r4qkyx5ij8hsmouzqhl7utp3oditeeuvn',
                name: '3p8ls8glglo6mu4ar2yf6l74l8kl2ihqqjht859wwai8gvl7ns3asxnt4rwystyscq4lr21lsbvcij4mkevhq3ey40nn8gzwhpdsth3wlnvxpkdx2yald464w8mxrtkdqn156n1nkux831lnnqwda3rp84g0tdw1mo9madsgfre1ecj7ao4lbiwsuhpe13mwbghbu14j5l43a3tbyysp8soy7tdfdas1d738j1051bb6vbhhz3wgq3riv6l268s',
                surname: '08i6wgau1s3qm0d9j5wge8hsqxysvp7a216jpzjyvanwv5lyk5s9o6ncrjjdcljmgkhbbx38q5jznd2p05jau29knogh3rpg6vkess8nh3vr5xcc9ekgv248srwqcnk0igm8loq13hgnpipk3kptkb6lyqeuxhq21igq6koojmrv01slfzi4c4x4l67byiaigejjm0se3rt4w4q8hiekks3p838ynnw3i3dg3w37z2lh3hjjaxcspcj893wlg7d',
                email: 'j8s0p1xxmxnuhguyplg2w034edy57jusncnb1v0etrucxwrmgnxvjwmlwxmjhfrvs7jxxg9dtgdzv8nwe21n3orxoaljqnlk2n1yepknwqn5ogdezumtz2lj',
                mobile: 'd6dhzrybt5y8v960di0vz1ptuf318b53m3ggd8e3x7njs6nvffr917do5qio',
                area: 'snem5ypfrshwopjswrurexheiz0qqetylmzxwcfnt6dlnqcdmmmmmg1i7nqplv8xncbpqz4yn8lu91w8e57y14omyz9z1btm33t8tc6qlsinyj9cxxzlgztm4c65o4adp73fhimn8mjth9lb8e6gl5nwrtwhp78cwnb9c8sa9nw7o0xm13azz9e3szheoaejzhtagbhapp5tv102y5bt3evn9avgnuzsfj6uqoybptorbp12rpbzt2fdxkxids1',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '3n2r00gnsdni9yzmu5az9mb71u977tzpt3dr1os3z3xndkej0n',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'lgpwlkzmxiyddxtiq9at',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'wh9mw822rtecniw4wmhzoqgkluj40fhclsc0kwb5wb92y9zw2p0zd4m286ntp74aovkprrldopioi3fspyn0gtwy7u83pico6e13u35oinutkly38xo66shrb598h8si240e4dbnoh33b5v7s7wagagqhui14p4oeti4q7mdj3p736v1n59sji8o9hu0zpkvlp4x0m5jhjai41o7zbevqekvke48ytwi0ns8x7ka3lvbii6dwbpdzfzv5obbfkn',
                name: 'lmzdd2mhfj7l7995dcdsgx5meyhtf0da4r0fe2b30ciw9dilqxhesvalfz8xlw4bdjob56sa0y6bkjuem2506jus11go83cu8hhi0pcya3sk7w8ds5b2qzne9sfbd4y0s2coz4i9c12f7pqii61fdh3qgxjp0c4uj2p5qhwvyrhqjzlcdiy02mqy34rq0qwflkmjxqvjjd86i2sjpptar4e2mhd45kibzji6sqqc19qot97wvoknza05o2k6v23',
                surname: 'xrq7ru1lelukeamr8ik9h7ubpgn5xocszeemek8n5kivylgbxo18x36qm0ap0z3g8lng1vwtnkd1zffeg8ctxt9lli9o8kkvlvnf25n7jlyb8nc7rd1rz9rldniiu2u1ititoksjrrv4tvm0qu5zog628wxxj7tvde3qeqyyjsadr7a73vtrzn282nwu0irnc05bnlgiqipg9b9trf0oxw73f00oh9l866f9184x4wjckngyl84lbbf4eds2njq',
                email: 'he5hwx9e8nptjxifqos7wknilvcz05jjuzg24l313dggwq5qdhpd4inog40w1wtfu47qz6sw1kvyw2rnpnae2vi28tmnh424x1k252lq5xgt13lfput152a2',
                mobile: '22b7lj5ur4xxpmziycr6ej0rpik9zjrfctymfh0hgjjpq0sfq3xj0bwwlh9g',
                area: 'wp9vfqki3osjbur61ljfs17l04kwks5ovgr0rsffzak0dtg38of3busyov2zyhfjrcqo1o56h34xa065gslwcsvnemtlmtpsdkco786q2kvod8xp9kg3idn0ibgdtw4boymoipwkc40ac1ukfg7rce265kp3f73ckirygnlbbbcqmiyzj2cgfck3xiaxek417ruvhhndh15bd1r0vi6z5uz5exa9kirvw2pw2sdi5gjawuqqbncmk5vglfun9gy',
                
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'oxeuaa32672f6lnmfbzokbd1cfrh3o15xic6dwhqixfw3uoxns',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'irjyy4dpz15emvub4pab',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '9vny7lub5sqeh7msy3x3682euwjyug11bprwbusuw07hogcp7rq128x0yzl5o0v8ab55gqlsn34o9ow2kyd7ltiid5njkz3vpt7enkthxj60yeyjzjflnlsae5b29czonl28xjyq5plpvofy7z0zipul7z75twquud1e5vcgyyvjpwa3yucyrxoxdtseepswo3eyst7rftg72uvuq88mb23h9cofo9chpa88hulbghlnj3bujnnqe9tyteavret',
                name: 'j79mxe5w1n6petvj5pmbmjqij6wemrq1s6gjh803gwb0gfws833cd9ou28xuuhu03vz3pv253vkc42mnce2zb1pf4yl2c6mbo8jbbfwunletdej0pvzx0eego1wy24ys734lr8v1ft24e25rjspx8wgy9uayyqimkduyqywvptsdm3ncoq0muq8i4cij2mp896e3idwuslhc3pc869pszg6ozoij10iaklgf9ccsg599qkud5u79uvwopsi2ayc',
                surname: '9qaob6thsf6ie58uf1640atydwb1xl8wbfnzwewjfdf9o9axqyt6o268k0yxak0jy2kch1p4yw0fhbcmexjrifsz7ofgao2t9r9j18t76tsh4u3jnyg1l45jmkuhbpl2pl2gpluj87h4r22lyxlwt0db7365m15v97xsmgiaf49dkqw1420wbmjf57j8x98auwj7gsqzwwpe1j2wj6ju8flbl4gxy1zqmqf107phqe6wmb3u8vls1dthz61cwui',
                email: '6k4zsyh860tnvpbguo3gj9rh9o7krn2w6p1zob9ayij2ntolhalaz6ktb15koo2axqyh6qof9d0yeld4pff5y13cwqkwokhfwavpa5isl3wdnvb6sid7nnye',
                mobile: '9fteg63bg8eivzky2jqt6mi3mb4ejitlw8h15mtkqpch4j2ysionqxyyaci0',
                area: 'jy4o9ah7dagjc1y24833z4abzzl51cbt5wccisswo4gwyelqibrh0tplgfbwpbsn9b26jxelmpe50jfcka63rarge8cbr8bpd6pl06dv6k5wszb28dcd5f4x1rxpas4b23s4gag8ficz6dralxs19ehpcqpzxd6p4kh9g3tgd6aeyxx1da8d3u6594vnwemnkyd1q6sy2r95pzjmfllbjzh7y5xizaglm0evauo0ealpl5e1edjnnzl1l7f8ax7',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'tjn36gmniymym4hlsnqv0figma8in4er46hvrkn1805wcy1f3a',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'eu4m3h8s8k7m2cee8bmw',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'z9tbn5s38bgyrym0npv76o7gdek1t5i3oq8isx16391hzzvu4b5joko9vr7dxyhgty45rbino6hixp1mp79fic2541i91r4g5sxvn7763rspgnc2ehefz7h6o1gp7kpeam00ozntmcba3pkiaib4qrn3vby33wi5essf1bzz8blgqpz89p8z7s4qte88lz4qe1dje1h8dijtvqu24xbz9pv45u1581dtmmmda63tz19e7bbrcts81seilc9ijbg',
                name: '5p98w6y1jur5taxkf3ikg5xtrto7mqmqyf3t6sgh4g08sa4ho9a7mebz7kxgg17rxoiwcyelft4gaw2d0ax10g5yjb8z6yjva1mxp4tmeswl3fnh7va6mzegffixo320d04ci4emojrmlt098owfn0xeqxpbw2nr98zy5pbpr3irjw46oacz1twefeyqqc3gcag7gd3qrrv78yuaojmhy8ys73qm3gs9utdn6svr0jhv3bpya70xi7fpw4kop0b',
                surname: 'v56x5az6pvnl8ptsfe4qlueszcrw1k32edu1zy4pz1qael17lsffs8h38btnghzn2xatpi9vlr4x80f05ie16c6c4r2ooenf5duy17d3jp8lbdhi2ghfaai34rovxnhqmvtsdigexp7iero2wxu3sspzt99o7339hiqcwypd8vdfruksfrqb7bvwmvhytoowyaggxzaxk7suhwtbfbr7h2l7rmrr3j9960sppwygbg1ks1nm5cgy10e6ap19r1o',
                email: '7p8db96yftwacmf9o1uh2632sh39ejgb2muonlyfyqq9ty6dc5s4nirod8myd0mnikj1rxbitg9luon9st01k5gl7ihorskh736lgwv85mdd25cv92j8b2pc',
                mobile: '56w5r1h34x20a4wwr1d7ldl0ecx6siclpr1u5gke9j9fuema7fzll2eaey2i',
                area: '198fvn9w7mm6efqfva5dfn1qd0ggiipfnvygzr6rq82l65eo5cl2cvvpzgbelvy0yn5j7hxdyij78y15onfyjbyoi6bvoepb8m4s5in9xol7qf6fy6jd0u1kz3o0f1e1hfcoyopimia8jhdi6cp0qscvwdjw9pdkk7f8o5fwwk91byellb5qtq1wxwhpeotkp8hqclku56s85sicqtsnr5kyncz3kl5i54mqvj227smdfeqrsmnbquqh9spcnlj',
                hasConsentEmail: false,
                
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'awbszd0ndb56kow0bh9pfiia7izz308il2a5tjjlcq5z919lny',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'z7zdgozydsbsffi7gsyg',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'z5hv29lqvb0v3ptuh5x2k9r9jk24xcmhbu9pavhjk6t3k9nur952tv5qxt10nw0lmottfaa4lo5f6ed5xtcbqzozb3ov1cmgzy5l6d58604bydqip5xac6hfqqmnyw48h4z1j1b6ma9ckwit1fni18u8vcx5qvpcnlvmerasycp1p1haqp8u7ndc2gfl9wnf25hgc81ri4ox1m4fm0z6l139hxvca1w5uyxex1ulj94welm9luqywlklyl0jjn5',
                name: 'tzbbczmdqs4o3h70pvcy5txks3bohsnku78wpt55rpsx950osvwht1datqcxaothuhhas9e7efhfrd5tfi8mx839x4fv0p2hyj9z6ndu27qdiaewxiuqgbnjimpqjsnv9fydbudw17sc2d31o5aglv2opkoa29lsy2y9ew0dl0rtwrk3zpe5307dqngvz79evf2a9st64g98n4o0a92qngn0q7uyzagvdf1nujp7bh2qcbsk1fps4u2dy35c857',
                surname: 'wpirn51maz9ns1qpxk0lmbcf3q5scu8814mbv81ej96oth2yglhuf5h2wbt48iob9p2e4gnj6jxo0qcqlkq16jeft7wdmyyw57neducejvo1uxrwossrsi8os3rqfk7uaa445qcpvujrlnzqdkujlnxst8tfx9xvs1ae2u9b1dk4s16palp0b3yrrjqhc9s9d7uclr25ey19b1n1mijxs8v65co8uawttdk0wahdg2q8ts4uj6ire7gk9m8i8u6',
                email: 'k5eih89hq8hv9ztq224cw9cajsez5l6ldsfgod02evw5um0wfbjjggrtp1s0e7lns4xw84i130938yqfnxlltm5xxh4vb6zurbxvn25jxc174oy2mk8074sa',
                mobile: 'f0q7l4dpdl17mhih6ykttx6e6aqf3de6kckakc1725xfdgku2ss92sg7plu4',
                area: '98c8lf9e8215gj0ahema33rsobf1bgd6scgwzoeztn2erkleqd9xflep9b6uswm1ow0k8ojxp7ndnd3xqhfvclezq9qm3rfh2g3ht6f7ngr3qi12nlpu2hdf0lbaqr8tt9llgy3tnoqhurrtqkcvqyt2fe5rqvrx9b1mr1ymo5ath46zn26sxp32in2plfwuyrh9vcm8x821w8uqhcgulh5yemryfqz3fz8218zmzaypq4ynauhbzjk1ylfq8b5',
                hasConsentEmail: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'nxtfcswh7sbp3eci9ib1cjq6amnibdx46ksa7hii8z5b6xtfpl',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'hahtovfdiniz7i5k94qv',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'rf543okey4x1kyb6u42fald8djb3j7qd7bntyrkc78m87fj3iuhzk905uygexdlnt5bla4fry81sjqxs3va2e3cn8biyqgg1jbocv2upjd9dgqds05hnzqs27dn81hc2e8dkl6c0j4if3cyq4pc63tvevbf1yojm29ma0aixz6pp59coq1z1lf4rrmj9gu9q3awaezyc3ed0mr4crx5obvdys7m3klud3gj632umtud00qek0jef4lyw0pa14kn',
                name: 'pzs33gjsaqgvr08snyodjzyzk5gajm57mbgqag5kwb0t1kbzgslqcnrhy90d9e3lh03i95g4gxiihoezmbm1p6terk9ud86t2c70m37pl3sje0spgxf5l9hnf32ojou9qym91usjqdjb16dzae6xxhw4c6y8uwip62sakuuhm1jdl0hnbqax3pac33p71s4ch030qevc41eil3gcxfg3q94ghqwz8sws8cxv2jc1yntdrhljbipoj04ny4sd486',
                surname: 'kl2bfc246h73daogdwaujo7tsw1p6k52oiyk1y7uhch8p1xulkxxfyxjvc22h2rlg79tct7kadsppeh7rkvwqeyl59uj500u0gg12agigxzyh2ygp8qkadidg68zhfvdh33qvnnzjk6qzw1gfttcwaashba7kfomint2a103prufoev3ruxwn42m9m1dekmx7ht0n9n0uvhh58y34j23kvepjrtc63jj7zxlv62fm9016zrmlr5ipobfrwy6phr',
                email: '5s2ooydmvgswefam98q3fcttp26xlz33e82xjs58p5qxc60m2cx9c6ebg5ewct2sowck8miecnoa3cqme26ou1vuwtpj6dfhdn4oalf8sava0awon0ipqq9o',
                mobile: 'te3wk4dg0f96ig25k2dr7q2kkwhl975aafvdvlx8lf6pp1lkcsrt643f6yhy',
                area: 'ec2hdebkp2rusvsusli31z255aa9nxhhb1y0k0lr0oijw9pohuvkxwsbzwc29qda8zkgferjo8u7l5n56pbh7esnzvkuy7j8npv3ceab16jxfb3pd4mphk9gpvuo6f9h53npj7hcjfyvpum9uquwv9yvbepmpmj8qe7u7203njd5fwbe38g6aedm6u3hpuhjruof2oxtjs5oc7dvntvd3o17anfwj0a1b3vg3j6fca7pisims0uxycupevaarc5',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
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
                id: 'xcgnaenq7d76ae8maai13jx8sgfp769flijmt',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'rroh92d7rpn6fdqpa9tguwo1iruoib6pm8f0u5ckt6qlrm2drj',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'qfld629l60lxi9mncztf',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '7zybib8k4z9qr949rs0j8x3h548w5py2qtbfr7h27p0lgnybw1hpgo338ap3x8anyjxxcx2jn56njpfmav008vmslinn7lbbhs6hktm6jhobkmtheu33f5jsb9mp3l0l2rfczquuwb71imtz4clho7mm9egohfl9g2ljybo8oh87yt4gg7tbhhok9kd04fcit2zlzc28vbvfdmwmrnq8h48i9n3kb33qg647irj3s56mncpnghnjz5qaiis8xfj',
                name: '62iraabvo7i705ttudxz3qaqrjwpe7rlhobt1ku624xbfxqhcrfb643bbdjhtdi5bwj8v9x687iog4ivcx830fqagvlqjkz09kmw0vdl9jucwa32y2hafuvtyuodzccroet875149szvjhcrc2hl3ax1pc512fa1ip7kug9g7pqjv38ctp3zgul5t0vi6z4e8ommp0hwj9fnn1aj4t8ijr85caai5pp3bf3qn4nv21xhkwk713x81eeet8sl1lq',
                surname: 'qlvj2a56er7d6kdc8ji33k9vjujy1iwtutdh4sica0ga9b84n1hrifqu657vfnyypk6zzldi85jdyz7xz9turdmmuz4f9xylyza2b0rtetz6b3n4t0481maxhmi6xl38no86qwctwrova2xfa0j34yqekc6errfgkj5a60iypc677pzfpbo5l8vn0kkx96vtximod1f7k7trl8ogu1avg8916o5kubiewvh13qb3k7eg3sdhw07a46zrjesdvr7',
                email: '6c61k1lxn9fko6kyx5iabjzfbd2nw3blnmorwu1tdrx4ikd43wpqr3aighz3reuonbhuw7rs82v6t8wn07ka8jdxo3sin3jwdz5xcpcidrs4vgr2p6wzfoxw',
                mobile: 'p9sgyd2699me1acrysemc62pphvmkdwnftj7yruhet1nsu8diccc0xac0les',
                area: 'innmyamgb28ohm5fqgkdwk40wk8ny5tzkdappqgwk5ghm7sys33eqnzbt9igh1fhgoazu4g1urrvomgug72ehxc6asqfjoenlsa3i9d77sg4u7pyaeettegxymvudsq9bkvikit3dmykn8dj7x3ce7buiptjntwggty5od0qpozlazq5oci5egyc10od4ld9xbqkouxkc0nqcj57m4wwtbro0vf1gxgp6lrgms094cx6l5ztu29gdt1p24hr2h0',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: 'yzo3cez7k1mgmdd6vksl9em4luiluinaqx757',
                tenantCode: 'q3ftkr81jm31cd5s321oipm1ynk0do9yknie6plvz2qjf6hptv',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'so881mnshj9nu8rjhrmk',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'wpu3wsevnc51z3ark8j883l7ehlnzeg1l6gjyy8udftrxj2t5zaarosvhwwftlo4gor85uwaaqsox9ap1jdgj90897yn4v2izlojb1dlplc3x5l7b7ssqdveug4345zcfniaazz1ndt8o0q9y3kymci1l3v2aivn6fapz18xnqrt3gczubdrtffmff5j0b8jpizhynp4ccxa12vvcge37ke75b0sdbt0103hbuhpol6tszch6saoa8vlx35pmiy',
                name: 'vqpha3btvem0wjckj9af5uroljgkeqv9ttuc0zlbm2vgd8qb149tqlmkncom57xwvgml6du4elltghmi115tqvw1hl4wosu7ax86j08cmxy539f63ayetx2l80l8rv1udovbznp930lbjg7vysgw9h1i9obqj0y5cmg3sfjwpl96rbxj10ztfzsm3sf3osevv5fje1rtfpjqck3nzqiqcjjj1n1xslvzlferhatpvviw1nx9zfscrvajeaer69j',
                surname: 'ob1pw0u5raj3w6ra3rjgy3uduy9ncirpitzsdel2z05cf0ncuycl1suu4sj3i9tocg6eb2ow4417dn54z4fjs4cnr3xeuhs92ep8d4i9u85bdcqqk4cguirwghcecromomxo23l4q0ziphypndkg1bbjddvw8wlplpr05n3s2erkw4x3u8tssqj8mnsahhe1qr66t98fiif22n3gqs884odjrbw8t26roygs6ekdeivanco7r9287iy3x3ld08a',
                email: 'zsk2sjnendb7ksz8h3lqsudmwl3zjs8vhrls642pf9rx5brz8x90e6upp17go2k22pldg5pjewf1nj7wr3sdcb7oty7376izgkotiwshvu4gg22ezi6wx890',
                mobile: 'vr7crulmao8a98xwfqo2mgw9wpmdlhst6k2yaoo09g4lj1pm92bzed1kxcf5',
                area: 'giy622e0aphkli3y31tn3j9bhff2s72dyaff7r3g85ux0nmj5xo3y2a94m2xzuhgfk3a1nhvozbv0lclk265r64jzvpg4pdh046vczqxv9qs69diotich008erflou59ss4yl2sah4w9o8utrnnbrm9xza0mpfmf8l2vw0l5c92la2dcacorfl04036n3cinl3uhptb8e6i3eju4rg2q287z1atq3x7woz6lrpcg4f41elle69huj12epkrxwt3',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'heu662zk7x29ewaq2pwjohs6adhoalm1y7uq6p57dzb8u4o88z',
                systemId: '41ydyk6n0mnf0way8fra5g9slmo9kxsryafix',
                systemName: 'hpva3s0ds1koevq1z61y',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'omvz0vmeodw65p6d9pngu8co0sqsr03ujno5y9f15ditirvzpucl7ccu5ggcykq9eya5elr3o2jpnt4sweicwxcrmrtt4l9xg8sosm26gi7d3g9k7s8lbt4qdi7gvcimmguqjukia9rr44l9lm4rbn3bk7zsp8s8aki7ln1szqob66zy18ok9hovv8zyq8cz7gl5awd8fsrqjwrx6cgud6ur9kuamw65njdvagz2l8ackrsi7ncwalsij74zjbq',
                name: 'vycn5upr8u6gi5hxvthok8q5d482449674x4usjugbq28hfd25nlfboi3hsvbxjviu3ztv5b7kwr5l7oo5kh5t4ystu5quo691uulwnumb67sija3fp70gar9v5hwa14lcq6158mmtyfvvuzotprb0gxybq3wb4fx8xjy2rx5jtt7wc1d7day1q7ykno4vti7cxn64ofnc16q6455x9rwyxyivy5ciin77itb1igyj2xfaxwtwe683le5n5awkd',
                surname: 'vmgvoouo3jrwjh7gxjjelfq3pote7n0i0jt3pvi3nzup1rso913iodhll65rs81uaetv4rn5vzzgaivyr0n3ned4dxohait92nq2e73rjvufpjyl8vy7k8upuuz3geq9zzb1l20d01o4hfj5qh5a6n213u81madfua8bxvuqq4i0nx8ayhkxbl4o5h7h6e3meq97ei9zu1nmm1y1mpw97f10nz2kd6tldi3yr1c872reuou3cgw9hn6n39ntnan',
                email: 'l8b297qaotvhfwcaj370cx81awogluj21grvwwjxokwtrcnzul2u15vrrn0b3trhmp8m83um54lfh2pp6alh4dn067nzukox1rznlvjyobg8hgkwz8ue2vsc',
                mobile: '9kh2vsb4ycvqdpqtlpmzlc76vf7o7o8itftvyj3gjplmmiaeoj5fsid6prvc',
                area: 'rm8cn6t5oiqkebt1ya2xcxbjs08wk8dzbsldhejnytvbwu1dyr4t7cjd4t0r0x0wy7s0hwoj3dqjj9d74z69zofmfm30y6wda0vkrg9hqk1rs07qj3sqzi5a5r3nhk6siadcu5rc33xfhwa7f293y3bq2mw89edadouh7rqumevhyscaigz4uo7jg2ezehnovn6jvhwxae60r40praxjl1r42me921v93prtij81jm0nobxojy4qq731dgn5xmo',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'gu2fg8e0wgpszva18z6p6llv4wv4h5v10stqa5kztniebyxonv',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '37l8yeyiptm2683am8fo',
                roleId: 'yymqkz4tkwk74ka59ucemhagpwquilblorid1',
                roleName: 'p2u8r8anq06pwmg67xh3mnkk3t0cmpqg9hry1dkp0x4e2t22z7jv7tsia4pbx8gu72kjkb1bsofvzcsq76zli27xo7ho08x4ejkcv8ul4gf5bitrkjsvdolegccj18id438l2b1zk16bnzv6fcf8ja2s0eojjirfha6pwogrdn9aak6x3zv25890qy4te2hveb3xw9wsrl2bqzvm39ez57pfpr4yjzfa2y18coot4j3t2e7t01yvwibojnj4y4l',
                name: 'jlhgn1hw93aq3itm969yp65av434dk6h7sthr6anypupykbajdxinogxe617ni4n451pyi2znqeb7dh09n8d684c6hw3qaa2kxeyl1yqigd0wx207rnmmge8mygo51fnidu434irpz6cc0iftabhghfn032pbkqngw6fj60ada5zspurjxbov0s05ugfds5k46hcann6mlfrd5i07tvrq5220r3kmkwkv09vm2rnei0unjrxwllluydxklf6ncl',
                surname: 'v3youk0k3xu1g3w6yv643w4l9lnzwuwizfefvt7z8u9gfkqhxln33sm9woed4rtyst9nsqgqe0uilgfozdtp9x08dnes4fbknlfb87fnrgmw05m0hbbsr0k746wi846xab8lpz2rnpk8gcezd2bc0oi6l98raeeohlsp9yh3bwsc1a5sck1ojkqspal1f1ue0slxe7dcodzl1lljzelj4iej6r1lyh8qq3yesadghpr7fku2vt7diei504zlg4q',
                email: 'rdyfkg1qi8cfai8kh2wcu0x5uqw0gop0thrcenipesrc4p42x5vh5capiy60626codpv8puk4kjkoxta7fpp3bvfs9oc4zgrv2c9ppkx6gu280tghxxipcfe',
                mobile: 'cjbyo1a57hw2habu1nemyvu72hhsprscgsh2o3uycm8y3sfc5xjeyer15k2i',
                area: '9lc2xqa8r1lf8v0wbl94v23uag1k5cptdpfkrnqwrfo7kct9oy1z3v43iatityehv91bpwv4fw18nw5iyrakbwx8nkn822yd5v8m9ec93di7q4ur5nvhwqztk3jvogr44irvlhulih29pufgg0regd2uwydoxep31vyodtbhjf9f9cg0kdqkngshxefcn9ghj90s1dpws2xik268xf8k3tazi1vkcrsq04vgaffwevx23ebukpan5f1m54tr7mv',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'agfg958uz2snfc004rw21y5lmbkeldghlb5ddpvdzaxnlmpsijl',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'ow15wi9u721uhjy732kb',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '9a0b2o8btmvlv1jteheekg0ale101nv1fx28hytwdpxdo20tvcew7s6jkowz4dmtw3pdvyihf3es5iv7o6pj1gyz0sphwlmmxj7mzzkjfs7cpwp7i8l2t51ycy4ven82pjcqqfpjptpl8kb4fs1oe329y594egbdoa5d08ywmp4yxkdyxk6pj0990npyz02nnn3mzos1q6si54u5x0jkmvj0cylwkvvyviobvlhz5jexvuhdd27vc1wq3mkumek',
                name: 'zgywny8i1soel2ka8mfwn05wfukq4dkqi4tneiohfl8dg57yg8k2fzwctwuqihvyzawolwqzz09kzvuan499r0l8a3xkgstuudfgybsea7r6wd27uyqiwe5bm8est96fnl6c79mtl8eczenc144ah64pzzr7j3jradh7bn7zqf74jvbk7ziqvpdjm810a6pwhuegfhf1ij611cz0f7uaz8p5drakem2dzrmr3ns7gbngv1qowmicnveo0tfb0zc',
                surname: '654clwlkhc1imlaj8e3ppyc4lqbyyeamitvaogjhrjil5ohcj58x3lpzkw3t8bbzqh20q93n2js1ejibm2e92rjp618hntztvq2wrkrlvsowe4y4ve7f3ziyqjf0qyj9qzh0us85yt2i8cxf9udg6p8ehn8xix4rgzao1ngpzi4pva97zz0ntevpg6zd7mamefvxq3ewraph6dqwwov04p4p764uokooufb5aegjd70bmzzppwerq33jxm4les9',
                email: 'alkyva3ly5h6105yuj90hisdzetwktpr1x368giu6yoqeosey5qtbkgrv1ywc8t9z2txvhbzrjxb6yd32j2iqhtvu487rziwp0tnk9tepo8gjcnzi4tvvix4',
                mobile: '7wnvgob7gbjaflng2fm6pg9fm7qz3uodngd27zrjhgvc9h1k8j3lwbt30495',
                area: '3bgs1551kdtmpsf3y15q1tnnajiowquyvddsrwjdprtrbp31lg5niptvbvkk474l31xonopfshefsfcoeohqqoj9rxsakag9ku14p4gz30nnnt85cjfpj4js1dwveya9f2zpvn6hqlcm4i2u7g87wfq4em7v4ki8wvip8vk9kewetpx7c9h3yi75qdofcbnojcz1mhggjs2ooosrgyrzq87vjt01wghi6v7pp19cjt8kvnjhnr1q795xpwth2rk',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '1oj475b3wrj7ceyy0yjv938w4ye6vyr1t1cda0pcigyfxjs3uw',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'nnucbva4o3ettupao6hlj',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'j7ojy2mkogfcop30xttxpa4uvfo3ggpw5ogrgegf7uub195bfv9wwvf4gy0sxqus2c6h30y5rdbupc7ja8gnqbom8dj4obqi14bv9ba00bz4avbgyqmlgtdns5viuvlgo51hb7f3ljq39g5thab2fb4h85dww994g3eu1rvo8uvqksjym9oxafysb4c6ubluwv2a6wysyqk96pxypwq2bi58i2vkvzrij5v1pocfaifj452yiwz5u7bilp0nzwq',
                name: 'jceywlv1i6mg2s22i6iayfgqd4bq8scce4aznti8pltf9ow7phzfxhqu5t6kdtddw5kgs5lw7njgmyf43z3ad3iryj04xgovg57a2xbgrra7ms04xhggwlnc2wl0m2dv9pmjfer9nrwfbwld3ioraa829nun09gcv8p25e6few50v6rrrb4u6s02txs65nmal7saznsmbktwmal89022v0s28bqwfnzuyvbw9f9n71low9szumcgh82s3xewuao',
                surname: 'r37begy3stsytck33xpuim8eafvyt3yjff2kgxvtd5ozmyn6dw0b657929gcwmgp9e8f0ogiecfeeoqrxm1zoql6oar0qn4nf8xenhqw8ax7mk5c9w2u3jzzcwxw7g7a7q8nikrq5j30y7pqyrbxeq7zwaosvp89pacxcm1s9fubwqpmnmshzs7uqfacpi34ix0cqgr63gi9hr1lwotwdpui9emgoq5lesx2wkjbodoz4xbz650z7sjdxijcdro',
                email: 'hemm3ksslp52djd1j572e0un155rpjkyu2c2ff5zu61neg55kqxmrqe05yeppdyb33qm2v11apxifjhj6s7mle7aw5v69q108y4l1o46gutqv1wdbrorewzc',
                mobile: '1t83vs4cbzy37yczh83ovwbszdtv7nidgd8ioewxotx9mrr2d73lbuip6gje',
                area: '11t12bm4qd8x277timkjdwm7ldylcll0nv103hyvwrin5245biide9y1bff9rdlniv7pww5lliovzt3wuxxyle8h020usdok2p22a7bdk036r72ooajhhahaow5p8dx19pd7m07k2c101vvgwoyh6n2de19rmmg61h94smwea0ms85yb9edzha2sq7tadpcerdk2c3ypxx9pom4kucnrigo2mzdf7z713rla7b7606lgmhcsceg6z4imvtj6jxb',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '93n9iu50rlm8wmhi0ai1ga5c5imm22pyrfkl4u1086zr49bhfz',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '8b3mxjuf7fgrn9u6g52l',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'o8fb3gm8ajfocfq8c9m03nmg3sesf1d4ncr24647htx3gg8twignc5361mj5ubbtndx8v3u4rmp4akuw4ecxrl10n0qbrsa47gp1f759twuuwqyapg9t7j2g9nxl392e188xovws2qj1yj21z7969tq2tacwzi3jkm3a59sfjzfd886fep81tzflb4w3hi7qh8ji4thmpxutokw79ncl62qav2p1dmzonhtczoxvc233t63my7ozgflyzvdxegm5',
                name: 'tpr7w9qznyloh4mrxss2j7efun10lo7748b6nrhth21cwpc6nsrbyf4uuam2hj79gu3k40vroq37sabpu0pimu64imdjfftuzpwiw5dxx2lnbfdj222c6dqpg0h8ndv60zgsmpfz6lvjl2zx49dcnm3a9ngf40ykpr7zjwtnx8xqfzjx4bad9q2se4t7uji2i49shwyfte01i6a1x9zvk7ubph4egosu2c7jpiwax67821k6jxjjhop6xi27m1s',
                surname: '7eld3vvxc8wsiitedqrr8zt24ekegffg0n7xl94b99v510dkjvb6apli9nazyseiity3t15r03q58cfq3tiwsetg7n8osmu0ec4hdb96ocmup3jkmbesc2aimqqjn8xa04hk3ni4x6a4zll1t1ipd4gt59bs5j3ck86qp8bnq72v7jyzt0utr2ccamlmf5nabt7vizuw5mznst0mp898gjvlx4k0o8p1b5p83zh1r8miy6bin6zbytkaurdpe2g',
                email: 'pvbcuo3fxwd8vat2xiw6hnxdx1kez7s0yq3uzb97yk7s3ooxzj7nzhwdozfmthuk1rvrev9a9qpvgujdu3rp7nuu7jeb8otvm6ft0a0odwnwyi2yo457iz2g',
                mobile: 'n7s3rfarwe7wns50e3przl98fryma2ob7njv5sde6tipndcrbc28xjoiz78z',
                area: '1b0aldyricps46fkntl0xkkzmj0gpucclnjh4gqk16ajvihq7riwx3ca4abj62le8q7iy25a59p8acxbawtm3wp8rejb73s1uzviw8juogh6e3yfcji1en3gkxgvmdrldwtx477pc99tka42owev93d3xtoifuo8m2ek7cvr5oun2vmhr170e8hifhp3jer0ygy0doec4mytdpx3x2v5fifqqvp3pbrk3396b58fso32wmbjs34wep9hxkcskf6',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'jjynscj9or7irearqb4qaegfy4txbb4t7t0hykc5q73ky9g2gl',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'usps4cvx2wlkcowppmc0',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'si8iiph95v342x5uebal7ljfakvlusrb4c0h0903lnzjr9cikfw4fygqowq0g5nf69d3llbzm2nj96b3g7ys2mh1lthzb01vbww18gsuqqg65a6a72nef6lcxoh9udgfxlg0xsty36mufev9af71r32wx7b2ah9a8z98omwx8hb478l5akoo9ayshijvhaiihicwajafg276tzgmax0tka963h6qh8e7kgq27wsyfh54cw4pybnc7peevh63tyf',
                name: 'i1ckw0kz53m709491ot9hqsra1l8z4clgk6jpsnmd2qz1e8iwbjhvnfidrp75hznuotufnwk3zhl9ixlaybirfsxzwnerci3kk3qyz2oyf722i81a3dnmulgzk9422vd0jcznl6u0pljulzv05kcyfmu6wf2yemfbqjkuxzazfeugofvzw63v0b8p3qpig7fi434yc5rs0d5p1if495qlqan26wcbyk85mkymjyggw7neh0od03p8d49575e5t8s',
                surname: 'qhixvu07fb4xxvkpdi35lcy1kb00jy6mb2pkjfsyrsoho3yefsd1kfjwqgo5f43wk1aabqlremeli8kyfr7rc3snf8o4jm6hints3kx5xsmsx3k7en7foea5wtyvm7eyrg1kp1hvawiwegn57bo0nmk4f1m668j5pt7e6d9o6pg9loqho29k698i7clepzrsxp0lmya99qc6k5mmc2tand7y3fh6w3oazs9s0pczok1aqgk324716odgbr1ofs4',
                email: 'jm7i2ybs6ima67b17v15p9y8scnapfk7xklbx7nvgjl6wkfm2575pcvqruu05tc7xzkwd4rjl2eyh4g6n9b6ueixi7jg3mqe51wx24fdm0evgvgimahl6776',
                mobile: 'h3loo8zhck6ow3pp9wd2cr04u19onpb8wo4uwfl95agnbdiuldozxtxfevme',
                area: '21sybf961cpsraye6c0ozn2hoq9exhyd7f2o5u8irk5m6l9qw03shvudccaj33ut7kue2iu9wa7v3oflkxbu7iyle513960ihzgjqnmfoh37kyxb1xjl2sauetoq7vghagnor08ejnw9g1oyyaumgaec6ynfhp9mgqu1mhpylyp46bh61d4c2cjn1xus5zi2b52ihnbvh5c064y6yrmbz0e1fb6mrkkvi028fo1vx59c2muxgxdg0f7o8x2y0hd',
                hasConsentEmail: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '1ta6q16v7j37hej5yu4d79qd931au3aklt5yms7qhfgpmfq35h',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '4lvtabyxr0dwb0e27tl8',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'ltbs59a2ni4t9cffacoudqeiwsx2sxn8y5hovsoact3l7b64jx2cf9axhh1xplizs9fic9f1nig6tz5jraeozbzz8je0of9cp035auekir6xsrg4t8nmongzewd8wuil67lz1xb0hhrafpmchqtpiy9m1yi9i7hurq04hvp58ifqsosa57ue6m0vh6uf64vtjiwq1ecra5f82cqpjhdc0d47limm3uxvcew98w6jwqvpuap00szyj5qbfmt57k4',
                name: 'sss8uza33taly2fkbg0dj32nh4we8wu9x1tmgtar41znm1ithu80ggpntcumrms8zrff7sa0blwb9i6ymdzgssoqadganoec2lrw6lq15ybf62llp0kyhjvnd7jka6b04aw9fz2gf38eba1mwxt7k05xghl66303h1n0z1y8lcznbila97tji1n07rlurbu2pw020syf3ek6uen20mvbnglkkb3cfrmrj957txrwno3ba2oqp9crqdqjlx8tuuh',
                surname: 'zsb323rnsoa4i9f3hq39jzfqj7g0yk7jp8w9bh9q06dep9hg68au19nmrhht7mwl20x8nlcmiy59xvxqn26e8qts2lo65mnex9j8ik8vgn13xsjuf66r4t7uygk9yuv3lms1txlqvj7booyc86bsy35hnw09drt8m74f9j8ianqe2sx84386dwto1knzbrp0q6w2e872pdw64x32wpp1dqvxggsh1y3h5p1d55xh49kgjfz4ojjlfq275ri4ls4t',
                email: '19lryq0auk8flrop50gjnptlqe08b4svb6s5p52sen13pco4zksmd7ccl664pspdn160phs3ztkv7lki1yqmkqj76lssci2u1w6xqeyv5yix4llaet3qh1au',
                mobile: 'so2g0789sjnq1ff2j5q0b9qi7ogj3dql75h2phvplh55uusodud95pz1kbsq',
                area: '79a3rs2ccxzd9n126blgarjc1nvy2qsuna6pkt5mn8fo3vcbkbvgvahf2iexhvm7fnb6mrw9l7l6a10p2f4fxd0pn8qfmbqwqp6fwmj1o3bzhv6x0vbgnh77cgp4df740qdidiv8tb41ocslt40i5lzfen80dzga5ddjp9q7kmsrgsf9hjdatf7q2zqrqw2iqjh7sssg6ajkffj2mt8of5k9b1ubayvnev6j914254r600sammaovsntbj2pc5c',
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '26cld50q4c5hctkeoe4fm9toufzqd5ec3ghxle49e5gelxezhp',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'l76e49tavfq73cehkmb0',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '870zldseqrqvvw7t06uirakhwlyfe8z4j6pmsg61yki6vvnpzo34pi0bt45vd9pfsrieckq5ruqpxi66xaub27e37h4oh8759owqqpnrn9zi4jkwrqpmpr6f7t3oebgxh2mhlyekkx1997qrtbw4hi8ldwqrid6gao2wt42421ofikj7dqrb0p7qbmz39a85ca90srxkzy4adn2od9esddmct31yodmi6hehhcgd6tkjlec4csnpd4nj0onbexe',
                name: 'uotxjkhab3sjtdnm9fxpch2rz8qkq6olzwhp00fo01zgtx4ybxh55uqtq067rcseioxc7kbzdxdjl5src0q42dcfprwpqb9iucqfnk4lyhwtf0ko7js7b4f7o0y7fb0k7s193k1o6qe5ktew763bgxdt7wz3n9z2e2d4cwbxqhkx3ujb3xti0gu78pmjtplr3971qqsq3oeiccktv8l4ypnr3lg69nnwbqad7f1imj7ryjbohsfxcjdj0cjrv2g',
                surname: 'g6m91gf8aow0j65bnvry9rl3l5z6sibltya19d7p88djrubqcd5s5bdvmz351mduyy28ao80fv8wojp0gsw63tene2liq2938ka46zy5z7uad2nuskg32s2mv4738x28u22qb4wo5n3x3b2voxhoou0azd4djip2pdt3nb8h11eogcezipjhpzpuvohu5m3fn0htyafvq5ry28nlcdfabj7ocykwrcaczks8yogvncp7nd7n02569qqdx8yql2b',
                email: '77is58zgmkz7um30djxlot3p7hghlafd57wootyzeej06zq1rbrq7oc7cbct3fakeelwv1qodbaygmfips3noxfxzduql3ihuzfz3lbvvlty1pc05a1yy2tt5',
                mobile: '2cbyxi0489uqmmpg22rbti19xlbrrby5ofkohimfbl60pesleuooahmv94gd',
                area: 'te7zj5jokg2z04q2wydopcwk7l43i2o3zvduqwtbsonw6ncnl4y5bloo4dzitt0mp7alz9b1owvq1e90y2ajhyzbmgcirog6sggwqw9g7ts931jb5on7d24b76sy4mc3o1e59g64kndru5ximmp7hsvaqi6033r2ifbj9fyqxh50kjtdx8dg6g9j6b6i4ig7x5tvpexahakr0sasfjwvpnzs2kg9fe26off8aomaugk9dofdx2gmrk3xvjipab5',
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'phrwi97rmqcbv6e2j81wwfjxyonnohqa90wqhhojaa7t9xkc2m',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'jxxub6ky03qqv6d8aoo5',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'yr7gmgk2lj86zlm6qexxuy7l36xcizv4bg1vcbc3gask4ni2t4963jb516cm6b5phtc4its7nsdys8w24fk02cr2sm6ererj9lp58lgfj07uosee69px5rchk1544ytohbsh31fbgtm4s56h4b9a5ghk8b5bq50fjob2ovzh2cq2d6wo8oemlf2y8sedo7rsanepole6c4yx0wl61weqr3lxj3sob1fug5e8kbkuk68rbim7048802bpi9v2frr',
                name: '5hvo6s9o2n5l804oxsf9lc7ejzrxutkfjoqp41g45qwlgh9bqvhsxnxn06fzpjmmw2oydndpxk5nqv4uckg8cu7a7ogyex6y0ns9bhnqaipznosd3fmg123y3h8iyq7svrfqqh9200f0gcivo385ib1evvkhjfgrrn7iupojopi9jhar4qtskbpwo3w2yb41hksjvz0rzgb1qy64r1i1pcw18hhgsvgpgd310it38h58vxuqvhyjkhw8qxkrrvt',
                surname: 'xez7n0wc9frd95pdfoj1g92oh5xq7rmwyy5l1ykgkxobkhrqakfg9dcadn7pe0mdbnxvaijgoh3u8u6px65bssal6r1f15bdlmysd325tz9w7o6k743krgfg4kjdcergefmm5y0fcymcpecjzm9bmqzlyqviar97gwaas0hltsey70v2o1ktttpafyi3lcfjq1rl5lop9qy5goy0w2csg2sw0pgix86qe3243x33xhahzfay6vfml769zon449b',
                email: 'y1zr53q0v3zbx0t4thn4ouzphqlb70wcl2jx3rx97bqpxv7pjm2bev7qefyibhsfjlv3n73agi2038szu0n4p7lg41vjf0kwoyz6fx1g7f1xubw5owhpnjr2',
                mobile: 'k2qbznkx6mq9gpeltkekjzpo9vadsqagigaio9yebtlkuztt7jkqsf53q4f9b',
                area: 'cccl7ory4hcatkpot36fd3o8jd4ar5fcm3cjhpasdl0msdhswtevlamr2de4ocwesbobf8far04hcoy52r412df28l2g8np589338l4gnw68o3ld27oo9fk9ah3iy9qzq4k8nhgihsxg27b87yhj5f5an1co7eeiio9xsxn0ipit43wetynpr1gpnod6yyovwalfowr48q0yxecvqt2uhho6f4c298ivm3yop5z1anz3sq82xmdxsmchc5bqumw',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '8yffn6846hc2qcgo4bw29pnol814ozaal6vns45z33bxm2sywo',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '2bbznfixqvd1ii6jwlxz',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '3nc5df1224q88evz749hdadbfbo4uezwf1iynhw09svk54yotmr9e2pd86u87q572gsf8983zmrs4cxddsmb7ewlxzblala5v00rcz08vrlz2nc3e0ifg8ecf6a78bxwi9p4qr73y1rc8yzuznxt8spw7r3m0m4pj3c3okahasq5k56iadrmjpcjmh2dn5rnwiopbv8snlgulm0c1fqcg3mocp1dz2osvl3s017ypw332bsn34qb8a62kkfn6yi',
                name: 'svyvdbphjo5sq83ouyzyro6w6ibflvhfiejjl8arbfzxos64x4qit5a1h737rwuhpp4yonwk96oc8bmj4w26gwfw668cr5xc2vh3aqtnpyg4n1877uhfoibp1v3lv09zn8bnh3ft2kfazbnimq1s9yx3mibc1s7ucxf1p3a0766xqllun174j6p4mglu4230zovn000k81x1jj0us88oox9l44xu9cv31xoqw3c4rh5b28ueoi182g3qacw00p7',
                surname: 'c8u1u7uo2bg7i6x3jytrfnqfz5z6g2fjv0rkyadcocw40sj7x4u7c9gtzj3dn6d3h129q0cmn0vfonjb0dh5mjrkhxf8bucorpbhiplzbznz3b68r2855nqm3bmzceybt4wdwb0sqqckokrk6uh7w1mzndihex996m55sdpoedeyxjt4e6259gexi4n5gumkvkxx2sb9tpc4ilmnsl5xvj1ieffs7us3si3ltyyl1m7hxueochsdb6i51tg5eur',
                email: 'oa3zfjy33yxke4y2912tddr5qv2fb3amyclivbhw1chxnfne2deh6aeg7wm7ax4uhlkbffutfjdcobtmpu5qupfaq1j9ubo249qw1458hqj3pejudndzd8j0',
                mobile: 'accqewv3pplku8z9svrg7tq0ophs8mniu5quqdwg4v4xjxt2x9pml0ecqf9t',
                area: 'mweygcxq3gw2vgb8die8wd26bfzmijf54qutpgckx1utrsgpqpxcas99akqmta0cf79g49czxlv96u5gly62kxhsrzr56xnlsq75yciq834zhd5tue0g4h24pegts3ehkd1n7gjxmt59i3mkn8tr7dcd7cygfhqlubcdjz3lr4kuy0qwnlf8pnamh9dlx7um4b8yemdg1njx954de6ftyy5gaehp0wuorpa4yeqo3g98s8njldzzudzosbvk47eu',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '91wxci68k87e6wmhkaxaeqisjm6hpgwx9bpvex2fpzfw9oke8c',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: '3pn2owbramj42zo7lg8i',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'otpw4g603m4te3c8u2a8guo6k2zxme146y28gnrzrpqytky4ai3e0rp8rs0nqfn9ipcrk9jmg348f1lttxrjak1x7oamxqnbovavdx3oxwyq9om94f81wmojlxzu7qu0zdt0c6tz7n7m6ri8voqb3ixhxpvr8bx985ho6xu7wfkkj6mzi4d2h8c0rkdcd9ed6jy96mu80488cg2475svvnhz2wn1ptxrwrawv4iw3ns0q5vz9z0ynuko1qfc18x',
                name: 'nc77bs4xnqj3i3h9vwrwlklcjs1ca1oypgz2d9pxq51i56kf5iajygy4bu7q4qgxsrur40fs6i9jiu9qvxkztz1dhfs4xurbxfpes92ej0ql3qts8oyu77c1dmgnrxjkkszaonojbahbmnifs8mbeuwmay7shk6x40irgc5h0azvuwuxoym6thdgcu0w5ea5618z8mjp7nnesf6qktakvjktpxd6usi5d7jd2cn2156qxrjlh7dmwbqrvkrwkx5',
                surname: 'c4svrkzvglt5toqlydmf362zpbo4b8lfzw6u5mq4nvwzvsi73yttgd56se6fwo1xi1su78b3fxhvrveptdy9744d2usa2q12ovqhts3pe7fnjt2vvdajgb8lkysc82qd252l3m41nihzvvy07f5w2o5ahd6464s7qf5cyzjpfnzh60mjohbd2wpcm9dt641h0lp7tuswli79qp2ehq39oywdekmmducz5zgb2s27oyht80e78fwuzkr815soa40',
                email: 'lx2vvl4dvudht0zn4p4909utk0wrmkmli2d3y7vwc191cb3gsutwoazqgdvpeulwxsvwlmz8yjysvuwjakwd3nhxqevty66hl7avk0uywf4rigpsz6ucogy2',
                mobile: 'mmvuaicvtzg9awohi6fvbhhqyptscavpglchnw07yypg749q5ju1e27pegox',
                area: 'zgpixjziiks9d13ndcgq88uyfywhpsyyrjrpzxs0ucdxpja0qoxw4b81vz4tz6kwj4scb7vz5ym6l6sbtda4agwakyw8ts1ibqlb1i3n9tr41mn06qfy2ewztt6kr5ugkdhsn63s7kdvdv3oj5rdkd9ee4ij63ezv2cg5ug8qytkpmlsml2c1o0t0zxio6xpd3c2yi1v2j6mm09hqc7yp14lupkk2k7bz1mi26do0h9nf0dlnnazn6t94ao5rev',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '6qaz3080d6mn62ve967usqo52hpzbdvgsvzxe8jt3g3a74l8xa',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'ws4munx1ktu25habr3qg',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '2gapyxrb8ughub6gigu0wtiwrb2h2tb8wxsldbp3e00qc6ph8sos1ddefwva2xqoyhacbs9h6eetup60t7o2vivuuqxz40vc2lz92k87bez576uob11bsavk0ludcfmnlu276vvrkjfpq221cqzisciln257k89zke3zg7xw2e5ibtct2jr2e7piniun2njpjpwphdmecxatsrfoqhdxtetzhye6g3voot16odlgfr5861mz0d3463jwolm9pwx',
                name: '4sb2wysg4nozq0z2f9951rxccolx2q862c0ywewik7mh5ao5syhr4bfg9j779t1nqkuv5m6psziiq2s0aqzq8seglpkci98yb0qni1s4msg922ksz8dmfn1xfmaylslwfthdkh8fbh66spr5t19l09cgjfjrbj3xhxuvqrzbxsv229p7oh86tvyjeqou9q0cdyorrsvshdgh8an7n1ddjdj0rssv0rdoqbamnx0if8blp4o967nuaed9xzlbq62',
                surname: '7ivegle2i7muaid7r83d6ij4sggwkiq1gsfr1hhxml6hcr8vslknfbei22ljtyhbpbsewg4qwqy913k44ab56k6fcmuxzex8op8iifltblvpamh0vq6203ftlz0n5lkxayeto342lqd70emg690w9ghsaiyte9v41ogt4k0thshvj4c20v76pep6eout691iqy3u0lkga55izpfu1pye5x2x2l67lbqdvl83trv33eoocchb3e5pd2hkcinx88b',
                email: '29er8n37ig3o7ecxvnx6ytf1krlrhypvk41mclwrhfy76fb0893du9hya0mznvwqao9lx3ysbe2jy3riql1srisjveede0a6tiyp4x14ehxsbriaq4hb8iku',
                mobile: '3kexnkfotb6uymcflowq88lhbv16mu71rmuwsarvmm2izr7oazbhbq640oea',
                area: 'i3lhoftag4csjc2h84m0pb020gwqxbzbuqb6g3tmmn5xkksjstyivo9ozi2bd0ff9bn3cbhzg6vk3qki2nwuiz7azrf1avvfqemqc6zpe4d842cn2kbh4059pbrjzw05ts5vm27dponc8dl3w6zfglbpud4ir2v3p4czw3vv0i2psjpbcuc96biwmlsac1lbb64n84fdranvjj8lzm5sx65fxtrheotigkvxiofyu1knbhcfign9st481oycu7t',
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'g4lk6cjqvgxaj6zl7ikcgt2jsgcz6ac9jznszpnpbl6mc9meqe',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'n6rd51ihzy2u9qu7mos9',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'wsn9l5jdpdc2q8c2ofnj65kedf098gwdrj8nud2a7q4e5ujxhfcemichw0aaxvj850rpo20pjlqq1xvtkfvgmn2kab6urcuzsgkndtk6sg69x81fvpychkodbeytwdur9ce2a0ranpuh7o237is2vfmentp9r0eev9tz1rpmjdwzga7bpk9n5qqzh5ct5hk8fi75gsstr5ygelm3y51eomu4fph3hf902ntzlvy0co9dotutvu3uwhw6jtu48lu',
                name: '0ig0xtvipw2kll65mvdo2u8q7hn5e6514i9qtdhttfshj8hx54pzwbz7jqv12zsbzm0raab0ibeacuf93t230z1uc3gieom3n00uxelvw9v2qwoxih21acitpugn9t2toszei685g4boxot4cmxzkzmjlkig1y7jrtwdaj34c0dso6z3qvu5dsdgwx7k0f1vafo4cqwfv6pru8ospe5d8x27vkt4604b0y0uobzq56tn9uf3uhcahjia9vs284m',
                surname: '21fapgsu3wliz341teqicpgaa710pycwipooy0nm1geucwmefha3yc5udm0fxgvzgc1grrx3dtg2i88c8tsr1auur2twbgpfqy7x6dxovq84vs2emicd2jvd9x2bujkplcm0526vb3daafplt9z1jy6pnjlqpcc0c7k0x2dw3s9u7fr8izhqshhbzn25bhk6cnqhpf3dcl5qpk5tj23bvy7al8l9kbxk00pj7gelcyagricf4vqhn9gx15l4rve',
                email: 'ru4046ca2od226rlwu1isrbm0i3r0m4k667pr9pv4p7ohy410ln2jf6vdzo6nnjok5uqkptgybo2jmbt3u2210spj66g60e429jxdmgo3s9qts3v44svx7k5',
                mobile: 'mqucmg50d5vltolij2jydb3wo02gwq7rjyn8ksb3zf06fvucssc6artal1fb',
                area: '523s79h2stjvq52b5907lvrn0jsfnhi2ii2tji09i6hzfi412eaeppavm5ru7gg1evsa4rxmozirhquv0l164er5a28cgaenzzueuf2yoq21n79alau3bm9jj0w777hjxnjhhiu85z7p9cmezgtzk8b23ydo2c3kmzt9ynvey4zxydzbc4hg88o5322hki50tnq9fb0m82kb3bnku5eso4md1ey6p5ttvk34t7rja70w0uhv7x1q7w3cysqc4cb',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: 'sium7y0eew1orkv7vgg0caaqi99074s2j54p8ss9wqbfuuuif3',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'lzi182qzb2rc2920d8hu',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: 'dcqp2mftt8wcvxcka913vjie3htdxlbyx0pt1txe92fwl38qws70yvcf32rurcoix25e94g97fnzad3a4j83gk3zvcnb0633eqsy5sjywv5t3jrnwixbm2xrvnbycocb4zpa24iciiseo6m85w49gdqs5m0flmpfq1kdg5d2m9iu0z8k8xj31wgs8skdkuccff4qdztwheqfouk76uks48tkx5mpa5xv5wv5e6qr4afmf2shtlibdaqhbo4ie4m',
                name: 'qdpgrptddurxwn68dxk754o45ncu0lpf0kx5td76washe2h8ttqwwg79q291wgr18cu4kpzi8m8vxly5byaax47zmm4kufkil1czynxqlya2tttp5lsoouo286be3jphfbrkhw2b7z7yjysjot1gxtwzb3cgv25902td7by8dhsqzi3grj54cabm047ex8icx65ci8n2z8k1hdttjjzoihg1qfdw965j60gc40jupk4ghtxy0zzden4i0ajwqq4',
                surname: '8d74d7bss5fp1p5vztjxid4gdgzhu96y1dnbq6oamkzyxkeud8hewyp1bbqevid3i6n1yu2vwh83n4506bho9v1klzpaeddcqekmsjprpy8dsmzh6muq5auwekhhdwug81m2nui8d6ag5hq2wjw07n02rrayjrgvpr901o9livlqugm0ggzm8vruo9zl6pvhz6gtouitthxxyznyutxi0w8gx7etafonajy7566x10n3efm8hg7hd2acmjy7nbl',
                email: '6d5oj90hp809uvqn4ag0gxh1on50na184o90iuyruncvyn7fe4wk4ekb69m40eg1go5aezjspu3gz0rn1kgbq38rtjmdhawai9zafe52o16d0eik7cyxxvbr',
                mobile: 'z9sx4loso3dqfq5z4rkpxh30uaap1ufvnsph1q54gjxcfc1cxfkn4ke3l0za',
                area: 'thbfraobdmeebau6la1f1wmttoxb1wbkizgew09btfihm73ik3tlm1wqhtpw1giw29xvqqqm8bfbrnuzyolqss0wtcus6ive85kt4c8uyem47ikovrcq4jb9kunpwsbnrkg5trrbsvo8q4wjgsv731b9mi6eot1nvlq9r6qo16ln8vaq2koz66qs00fqczv6501ep1w4g5wfghhme7ksfehtbarp5c9ocisrk6irlue2wwe929fxjmrdzcezbun',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6ce5e8ab-aee2-4b61-8747-dc876dff6912'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/6ce5e8ab-aee2-4b61-8747-dc876dff6912')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ce5e8ab-aee2-4b61-8747-dc876dff6912'));
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
                
                id: 'd9853ec6-45da-439a-a248-dd2b2ac0bccb',
                tenantId: 'eda97752-aa60-45fa-86c3-57021daa96fe',
                tenantCode: 'wc4tnax9w4r843vookgpmt7cvfeaz5qb0mnqwsgpu4faw5hubt',
                systemId: '13bbfb7c-178a-462d-83c0-8c9ad1176301',
                systemName: '4wuo3p22u4af0fipyt38',
                roleId: '5fc2b31d-1e2f-4496-88dd-158d5c9a2419',
                roleName: 'vy8s02qevas867kduzsqapgtjk1iigf1dr1poiqqong4cxdzrqsuq5ftbnss2bt1yyfk9wwa6k683gcbtddprqtcljdc48hs8pouz0xhxjpxs0eiq6eydvcm4hnib7pwsreobvkmu586mw9465sm32s7p4hod05y7gd613i9c2gu4dy5cp006dqbhegarwvd3bi2mov1z84l5yey8k4fcc0p2xzmngqdxn250yvbr9o5ads7juu0ofy88wcbyiy',
                name: 'ovzv2o46y8za0p1p9z4keob5j7gcc7izd8parg10g3bzwg3lckkld8xtwvgv7lrl7j22qy2vaqpa039oz1yrkicmfltc67xhqkllwwtfjosk3jplcm32mbv9k7fjpcikqv8kyydsn7i0mta54wloehx45q292mgbg97q6ylqmbyvzwu2gngvr8zqiw6qc8igef0komr978b6ubbhdfekbz57cv66n1ruk7ik5vaya3dp9o0ptq5g4f9817ta5rg',
                surname: 'ha9jan186x5jzcnehnz99dvnsfzyh9m8uki2tt4e1rdwguwraaie16t0so5pwdveqzc04caqdvym78s3v4s2bjflq8wp94b4kijd8qdrxruojc5q9sc70c9s12x8wz5vll5ujx42yxddv87vqtj92hpawnnh3477liw0qlmfpqvpmtxturj1v3317o2adjnol70j3s8u1dquec9aphz9to1m7v5tt25myxg47rowltj7la9cv6aruzn846til4k',
                email: 'zsm8ymwl43nqiy3wie43nnv6zuo4jw2txmkxf8dgf3rc9w5cklw15hyl0pu9a3xz52fe5fcr8yu6mwijf18td1dbiikt9eobxigxn5nqiq8l7su8v789x5sp',
                mobile: 'yk8e7p2omq9z3fjcmb07spmpp5s1eaylapjv5y8wcxypikpcx9h78mlpryi8',
                area: 'wzy8zxh1vs91l5ik18szwb6c1s85rezp72sujgz801h22uvhpgzy3fa2w25m0ubora6882d05tihxh3peu94y3dzthlynyhprzgun62mpp9w87aary3jtir0w6jelgolbuhvmntytbp9nkuha6kmlh3zh58u4tii66b361pajhhlwxtpchtgrvzd5f4r5jfwxf1lc6gmx5lvb64hc1rsnbnzxcrb5f7ukcks6bgkvk0unwidgmn47qpvqpe7i8d',
                hasConsentEmail: true,
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
                
                id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                tenantCode: '2i371fb4q0jvcksiygle6b22jtdy80ael4xs0rrsnuxefj95sx',
                systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                systemName: 'la1qfx12612twzbyioc8',
                roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                roleName: '08dcmva8yd1bxl33e3m5zi1yzh2ttzes5cn1eht0cps1toy5nl4zfpw2fxi4t8zy688w7rfculg0wiou2enbfisycleabjosh746182q8lzthf6fn8i8f7fjqvdgdjhvc7wab78515qdnnubdc9ayggfkeazjlbx6xvnzwfui89iwxg4s7kz1c4fzgnsv5a4nrr7gsx673d735e8zzka0kbprhnsvv75pojbird3k8jb9v43ou6a4hrp4ejaz63',
                name: 'yxuu962q51bsbh8mlhre5956h2ob8qioi4vtyhbqh84thcrof53aqiay7f25kyhj5ixbuxuaayn6kr656oxs4id5czhqv57c9dem37cxx0ww3aiapq07txt0nin31bqar9l3n3wyw2m8m3zfnnj8b41m2on6e8udo2ch3n5diufeonhf5ra3cnuwiwqk54l59s0ctrrhrzphll5tkoulrnqlxr6edawnvq3xd5fo01lsaokeccjvr2b2tgawitt',
                surname: 't0f4nvivtc96ez60z2d5x42tghkqyaagdxgwon5cxz3xcqwc6hb2eg5q19p90fc84etoju3m46guojnf41ub1y4x03fp0fki8qjvt696f037bg1sli365zqntgt253qlco4y4k90bj0hee2uxfyy2u86jncwxbmcfe78jxjuqgf1gq1cjej5i9aa03yl0tf06aeilibyfbrp0yxu420bbu0yavlo5qn9dnh3ika5g2kv1msx5lxl7ov9i0ygp0e',
                email: 'iibh2qcvc96jdurllxbkhjf03bszghua8nttecviq7gutt5mv9ugp1fo65e69ve3a7gdcjiqmfht3ety2px82g4s7zl348se9nm1or0dn8j21bqe2fr3gzq8',
                mobile: '7aspucma63cd06pumodzuzdkrdb8jcbnncyu2m2jrt6n40wqoz7c1embxcpw',
                area: 'jnso1mqi3nfcmdny2pb597steucsb0kkp4sqq3r8833knk5kw0wzedq673q0dam4kkf8rqg9soouwo5crk2wye3tmx7zrhcx17yfchczfdvuy2r5vmtjxz6727u2xy9samu4u99yd8w3t82rldqcxzsnn32p906hd3sji7yaqcsyxdfpiic6026wknuip6ftpk5khj2dfdj4onqy6lsjgu8yb9l8su8q2x57skymo1ktsnyo4rbi8rgbs1xmykf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ce5e8ab-aee2-4b61-8747-dc876dff6912'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/6ce5e8ab-aee2-4b61-8747-dc876dff6912')
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
                        id: 'cc3a498b-99f2-4e6b-8dc6-3a50b4459eb2',
                        tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                        tenantCode: 'sxkxqga1p4ywkgdtd6ubgw6ue7k1klrogiggu0wyllsfv20dld',
                        systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                        systemName: '8eg03foj0bii66ufxaf9',
                        roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                        roleName: 'lj8r7os44xqoa43p80m1q39o2wzgnna688fq21y7rqg21rw1l8xi8iubbr4q20q9wuzlsdhgyvannkl2pyizldn313vjunscceo4ei8z1ho99u2mm2jkkh8terw1m32x4wcerhayxy1vpqowrhh17aqtpfabhfziq4xqfqquqw8ch4xatj9yla2lzrzm5o2oy07y8l19vwezapszzdseuz2bluifhsawv1dpapx9yqlxhyvmbj4n38fq6yodykb',
                        name: 'rpxbj8zpmrr9i08ovnn4sgm176e3prnywk1xhkocy1489rt44fqsd19tgvzydygd4rjc54kepupqwv9op0hf7hoiexxenfdqkvk3fq6xobplvgbgyp5xf8nqlso6namp3cr4a7aya42202wfulurzauom9iu8lv6613sxejy8z1u2t7go7uijgjazmymvx1g4rnrsbd3sge325bhgb3poiynhz7g55it0oytm4tsrvkkbmmv6ibzyfdlr0q78vt',
                        surname: 'orbcplubseo342e2wqyu0cn8ggfpdpsdbqlit5zwjgmmphxtu4sw5fvje71z2eemv4lq5zy18c9afrrxy3qjkybund554zcr4b9dzxvb81sswfbjbi8ijqvy30cghtqo9amly2qtdt98m53t4o9vb31plbdni239ffk39s8vhy2h17p16em3nisv7tbzj87tpr6jhyun84phtloit0b2tl76w9e5vwckc4z92vrr4of4286bfzgc17vu6c1ra0x',
                        email: 'oyhwl88syea6eyruloqoe4oc2dnwqr32hy6n1acuncmn8o2uyzkzdp8mbyo2d28jpp4bnmoxj851izw8ftl9igk7jy6yh0wb23vzz09qzt6e8b9mxwihbudv',
                        mobile: 'fd6o3eelobkjry221ul9sxtazgoto3zbcfq4xv0zikszurucheaamescsi4h',
                        area: '2dn3cng9qm0c8olju09kiflboxnimdm0vcf3iwsy6nyddkyjfjq9ev454n68b6sztqn3t39saxnlsqwqphxuh4x21iez9bbziqwahec3aqwu3t2d0rwvvvw91e1qrlb2w8yq141mwqooujgrwmhy7ectgy72o3redume8xqta5pvsmjnu8zt1aqn9vi1wne6hyuoky990fzm34sc1ar8tu3q147qtbbvpntbow4jhisntxsi3sai5pjmh14w1rs',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'cc3a498b-99f2-4e6b-8dc6-3a50b4459eb2');
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
                            value   : '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('6ce5e8ab-aee2-4b61-8747-dc876dff6912');
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
                    id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('6ce5e8ab-aee2-4b61-8747-dc876dff6912');
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
                        
                        id: '28159d97-b103-4a4e-abb3-0103cbfd6116',
                        tenantId: '8670887d-dbb0-49dd-9bd9-aa983d6325ac',
                        tenantCode: 'wy4sbmgk8qfcn0bnb8rthovwllc24djtqp0cx9kvu0o3epltm0',
                        systemId: 'af0771cd-0447-43ab-a0a1-866c0b8e6e32',
                        systemName: 'gv57u3aqetttmhlkf3b0',
                        roleId: 'e918f967-4a0b-47aa-9956-708d7ca0880a',
                        roleName: '5bzcvcfeja6j1sdq76ycr2lhkmo814lxegc5a8vyxxd45thop3l8w5wgdaxf25u6a8va7ez5groi2up8cy74m2796hpij8l6ubac9loqj8xs8pagxcf73399gb2mv2ujzsy50iefh2wijv09h5v87fpi3yoo4gn8yc6go0tszr2muhqk2vnw0nwt4lv0hl83t4mpdsm7ixev0nb27r2y3oj4uejntekpsvwvuhwcu5q0y1763tdtawj70qds09n',
                        name: '4jjs5ph2s1yar90fwoc9acz63ljghykiv4ulza1yey6y2ya5evzdmd4hogg053wj9inhuk5od09isu01uqfs5bcg0v0lm5hilionmq9ue6tlft8j5o0vcipo2lmj4abju5x18cmwcatt7f0ku1vvl4zzknzctl9dev7he1tyedx4c0lnr2pazlh4lvla5vxoyu4334dz3tdf2vi1yysfo2tzi4t7phkue8524tp5febbyudzx7a12mng5zea5jh',
                        surname: 'pderscfvz9ne30ky2yfh6huiz3ssx6kcq6yud83bd7jrnpez4e3jgzea6cnpefznmpznddvdmk6hjznixbwee7fd6bmrqjnezknkqpdzlrjhqpnwl2b23ai1e9xsat4s2f51uix7ga28g4bh0k1pwv30gtuc12jwouzpl22x8gqvctl6fc4czo49snzut2oj953eph9zmifyqr25nhh48tbqy2qqlokd4fxzygf7gtm9ysduvt9shoccsgje6or',
                        email: 'su06fgjpvqyfdg7dc45b6i2bm4dofy3qbrql7gpbcbbb2oj9gx1ylwvadd74v51di6cii74iveqgvu2gbhshznyhj76cl5qqw3o94rd2ty0amclkexrp63oy',
                        mobile: 'uxn2ndn38vq7igfwy1xwo7hwu034ch6npn1uql86g6f0lvsho0z0lgsdnm6t',
                        area: '7auz3wh6hj15xe3sd6ilcf5hiopmt9tmd3lztqh03xr2f6z7z7qru7k5mb6nptiwwyzum2qe43hr1khnro0cb8tmi2mrgai9vn0et31ll4tczu0phmor8lw4gvl9efy4jji7t7y5ffex5jzazt2uiyu2y7al6xwmouvag9rpms4hisnu8p1w6iwi6f666bklggc1w2tlf5gchb66ixt5nj9307ywrfeiaqm5gmvlcsobgddezwc35qw6vh79veb',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
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
                        
                        id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912',
                        tenantId: '2bc95a65-aad0-4b66-9718-ef4317b25191',
                        tenantCode: 's8zuwe8sgw4a8xil7vlrvlzg7pncbxq7f7o0s7c91pfqmxidlg',
                        systemId: 'ca953a6a-5b43-4b17-99f8-a4e13377109d',
                        systemName: '5m26hzyauzjm2cyfmrd1',
                        roleId: '4d8fec59-fb28-4990-af9a-9027981e1424',
                        roleName: '3o4xzpw7axplybx79zun3tkuftsmig9muanx1gphmcfemalbh90gq7pda1ru57f9pla8d4xews3u0l29xxaetcz145wkvwe34yyh4bf45oq08pj32qdps6x81r38eq8irvjggga1n4uheuq8hc6t731vi4ryks2xotlf0rmpi34pd8kk1d00vhqncy4828cu4nlar6yhtbnc551rz81iwg8n2krxgu1t62ibhthqgnqkxq6k7jhy6ey3q3srj6p',
                        name: 'n6whhmxxuyxxxmrmw3vufsbqzmaem4pyc96qu6gd3zk10qj9jyvx4dnug8kj2xglek7n88u2y4tp4usd1tu1u5b45erjl93h5ro2gq1q44mih8wiriz1g459h67ydv55p3dfs6ucg3y5uebs70ofmzhjy7zhx1p4tjiehfhq4jyn95wo5sfcnpuh04ey2jxpol4tgbrxmi0uzm4izl4x8y2oyhgpu9p7ehwz37xx658lbe43qa69l79gi5zpvkk',
                        surname: 'dwwo7ntcv1k1sps3bjkbz2guni9p96fyz7w2iyfp7c6eitgbb54kdwwe25irloj3p82ym226e5ozt5vmd882l4j2lui10fy9e9uys7cku7xpe5jm3vh628rf174llcpa3vicpue0om4ox29cv4wrwoxndr5e2az64s7c8b4jjw6tc7sj3lb5irn0f7bz6tgylot9lqvd2xbvbpmpiftxaouokdifw17vphx9m6wc18lkaudcojde56c01zsykw3',
                        email: '5xv43irad2i46howo10fywnz3gkfp0sjt1d2741o0w32jrttc7ncrn7y1pzmaoo86brjrlzo5jlfjiw579k01x68kqo26jh815zx771y1kk9hm8b2xbfbnx2',
                        mobile: 'ye19gk7xa5bixyapxlmxte48vagb77hndfipn7oy6oh9hkc1x2ugd04wyb7c',
                        area: 't6jnzpptbrb2182lxaagt34mnm364alwb8g20au7vv4c9pwqfz937lfdldsi58288r58cp6r4yi3v1y9fsuj1zfj1oh50yhb6jo92268sszbd73keitbq6ftyqljugs1pydcqvcw0c5crd86qds9ngl2pn49o3ycuxo0ywx8pud5ubxo3or67lw6ul2lqi2qj20p15ay4iyfyyuh6sdt5ogqtvbnsy1rbrkff3dky0z9cr8ypzz1kx4ura4y5oi',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('6ce5e8ab-aee2-4b61-8747-dc876dff6912');
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
                    id: '6ce5e8ab-aee2-4b61-8747-dc876dff6912'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('6ce5e8ab-aee2-4b61-8747-dc876dff6912');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});