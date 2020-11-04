import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST cci/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '5ri1wbsmhctr4pad9t40xmrn2nzdve2osk6ah0a2s1pne6dodo',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '7b12jyf82j5az16cvr57',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '80udiougmbwokgj5jt0tqr3q4vnnkzax89l6lkrbi0g22gzuhl67j2wngc7yi2utkqrqg14nll8h8lclnorwdetc5wh4rymfwrc2hx2m1ufydli3wbe2j3gol79fxtxwi6ud13qzgfebgomxzveyi962l46180jk8r0ggex40hbq06i3l6n474ke6llxs7qxp0tv7hdxsupafj2rgkl29jg7kqpemaesoqch1y2pcyzdbkrdff9326gpkbe3s0g',
                name: 'eikg4a6azbjgwp3rr6kcome43v4rnq12mt9qm1nvc1xqcb7rc1p57grxdh129wqthf32uy7hdyi8arumsgdqfw3nesrn2x8b17jrh1b73lu5rscjs3n9lpxsgjv3g0a58ejwzz0xd5a79bbnyemq82t9wxml7uuh33znnsffcj7hpiduikw16lqf95nc9la25dg416z343oasbdd3mmbru6hh1j7w3e5k3g0sq5nc355bmu80vcvu9fteua45je',
                surname: 'yh274ac9h97eg422qpggybslz7pdls3hwyoiphgawy8tprq5wj3jzi2u4s5yrkxmos109leehm6dl8me2xkuwu2yez6g5vdmmincf5zvgarigsjmro0yorh2kbtq2to2kqintkvdhn1m0cmd43zs6osk6y4hjx3g43tg73mz2p5x14os2iww9nblqv3kyjqsjrbf8bt7f42iap4whfu6713xvbagwmhlxmwus4o4wkodg1535yjbxvvm0g3ahuc',
                email: '019pfsnlsphi2814pd9n8dx9cj0024zlag28klrl8gia4p690ae6svs3jrzxt6icdcv190syrr2k8zv36draxdsxwjlg7lfrobi68s08vlhhl0usrp3xsko0',
                mobile: '8m3zrd048g59x6df8u2kkv2ekjdrooejilgnxjwooqox57kqc72d3ni2zwfu',
                area: '4h1htm36z7cgit8wc8bxk0d8dynia5ne21t7j1jgdp0h6n3jzca1tqflc7ch4on6068qoo8mr0mqvaiybf0ldivw56m6zv851keqvs6clft8wha0ibvdwv8t3d35l60b8ofv2bdff2ay23uuazrtb2a8mhjxvks1pu79tx6ou8kfdjfp9udigns4d617plt58j9b3l2a6jxcb6cozn9drgtdy1dus1c4yh66m0ccn0alchozzvn09g0pk8hhqbk',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'p3slxxmznmygzo9j98d1irupa88bs5jevw92ahndjywvl6jddb',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'qrhao4ddwn66x5nnullu',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'xj1674g8urpc3wuklez9atdn0a1502zkvskj8arhdu0mzmddumt716ytzrhchq0wofkiameukjcytv5lk6u7edvpe7bhjuof9b3xd3gzzs47b1z6y6ju94lrf2dabld97grnsxdx4e80xn1pae5bpzd3ii301k8eq7yj18qs8co6te2y3462m6i07qtfsxlyogv9quoixiljg4he1m80lpby7tuy5urbcc7k0i87yivq3a7zjj7ggirtuf3yxge',
                name: 'uf0si6zere1h9563h18pk96bql7tr5yxjfkhqk3csf59z51w557ijzun6tl3blsl4adg8uthy8kxmacd6p1n1y8xv4iwtdcb8qmxnvhmsf23ylwalvuqlc9ggzvh9rn5attfoj6w000r570llt1hw5vqob7n8ifhsw3bgm3m4wit5pp1z7ua07jx7zeldzx4iz8dz7f6akui0xm3cuhic9l3r4qu19ee7nq0lqyzahkmke6rw9vg5ehv124w52a',
                surname: 'veic0frui86c942hw4up58qkzvszr0pdsbwosw403aui57ucsdsr7y3ovsvcuynkrqe1synmue5omqgnpqxtuhfzsqna17r5vovw9j4sfrlvxgblh9znjx0a6auxzltnk0v392tkunma54oiw461j8fj9ueukbiu9x4zppqcw4y0siwbekkcllqoyivbc54ngnjt1nlq9ausrliiyb1s8cpyo5vn98647qm7i114gvn98vmsbx4n6vtf33irkop',
                email: 'f759x60943u0gyetx0r4efqts2lr25hd5i77dwjxk0um7ov5jttcbfynhbl6faaxoyd5pnxazhh2rs3u059daiuzx54oug8sg9c4ptkl5lahofjftocpo50g',
                mobile: 'rot6bh59n49wise46p7j31uwpi1t09slqu80hkfj1h97g54v9bfbg2d1r8rd',
                area: 'mia8h13y654wbbuatro4p59cnc1scek4qa9ccp5n8me5mt3yqhwbs44ft9m80pbjnq5bvanl4hfboaz0ntzbq8eqhg2x11a0hzdhbdu6ewda2ip1gv0oo0r17o1ifdir9xf9i9nobb3b178w93k9jypzuyhxnvhqywsurarlqz96n10i1n7zpiszcyd4kpnoknmb3iwgrqn9rzhm5izwmf9gkywpnqj6wdxbocvqhul661y5wpxr1qo3nt4l9z2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: null,
                tenantCode: 'akqfh2wjfwufa2lmdnij1cylmzdd9twm779hxd5m6n7s3ldg2e',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'zyxq0h4wu57lauqkdkyl',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'ptmnd815jo6ivycglmjhd5gslgn2u0rb965vj7wfcp927l94a4p5wcumuqw8s23vdnllyh8es9mc4jkjyadn0nr2mvuyv4ui45lu4rpkc7ikfy1py9q92g91afnn6xfecoksd7w23fcovsrr2xrpt8a6j4c471lzsz2tkfrdc96mg2p427ym0nlgfj78iwtc3f5mjpca4pntvp59056jt3gkw7sjgsytsbqyrpkqsiww5u8k774jb36294yzgbd',
                name: 'alizyhf0takqhhx4lpkmar8vqijkql36110p0pl2z9shds1dnerj94qsajepj73a01evqfowlxh8bgqwikl9uu2s4fw9i5tbjo6zun9xmsvzb2gaeoggq0rm24cdnsrdbtrbh52k6onf70vlebm1o12zaeyqf0daw6zdpjh0qo5due3nufsl8act9lgarul8xy8ia2eck85gob7bbh5tc396p4w66gybje4urcviy5un2wca3v69g9i3xemp4rm',
                surname: 'aajxu2fw2vi3jzgc9g94ruydabb78ycuqt79a0mpczqx9t0ntc7ttaxdxd3wkn7jz8mr4tmwmoonx8jl1g3gstr7gxckzpnx7a95zzm8yzfimr5zngbr32z9fs521uv1ucu8sjxrkps5dbjdaoo59lsubwcg34o2picncx8iwhq90ah7bqpudhxtbi5mfxmu17btep6l1d5v851cplwtn9858b6mnf4rv6bd73cn0e4fz3zvhqxrkqytsn3ic67',
                email: 'hawz7nxr04hcy33rt538ufiznqbjyit5kvazjlq9k4gtxbx3jwn1byrx7c4fpggfz33l27q538lod6x2bu7jopa61w3w550tjdpq4p0atdzqkbo0xj23yk3v',
                mobile: 'iej2taht6vp7ptssoytq794vw7xuq8015f4bi79sjmppimzg29tmrouxt7v6',
                area: 's5o1dlxc2aoy0qjw4k73jsqzvxekj6mrqo8huk5ky2u2jifdt1lz2yrozy9d22b1bt1g6b5f97b3v1xaxw7k424kqksvrx3bmhcj4kacj07x2lp3qkoole7nrdein5gsujobl4eus4upuvkbb9dmgkrsqbrbvif6qooarjlgx5qq3yrh2g3y81mytr968fo9u3uhgx4fdt7q8bbqt3mj6lv935ozn603ef2ztjmyvyl4de55eandxe782avumy7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                
                tenantCode: 'bfgvkiudiouk0hmou4rj188hwb5ekdy2mr04vu3j9d6zvw9so6',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '0axca6it1bk9iakll4ds',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'rkrxodzz79v9kpeci2mggq8uvpz2noygdgu3ath8apei2ofwzicuxy7qpfyvaopnb1h4senzm0blzcvc0afcblup0oc7vpuh3ugu3tmm71gvm1bhrbx5d3w5up1phpmv2x418u7ybes21h0gbb8b0wumwy0zw00w6lb2pikjv0jeb8r1xbp3lu915a8e602i5q6fr9dr1t78xr7jteitbs4nnsejqqowf2pl0y6q7gqiqffzsohyedelp1cbl69',
                name: 'be3ln6zvbx2uq4aa64u326zhxyg7hdbnnze3auhf3ji95528jx199hw9nd5mzo9udx9x8psnkcujkk0d1ec14robc225j9a9msb453wje0mzdf7fkci3l091w7qup6msvwzbl32dd9qdklspz5exq2qdxd7pq31j36dohdd1y4s4avlqdtbk3zpgfvgbv087txrdn1rwnea1a1ycivb2n5ktg0fjyo46yhh2gon22j45kh0cuy4w6sf8tss0rfn',
                surname: 'lt0oobqffclr4f8u37unonyss62ob3n6j3tll47fek2u3zgm4cz6l896mlijixrpitzdzdbgw48dd3o1k5oj4ov745o9ta9lg4aydbjpfspa84fwqtzsd6jcl1o648egslsb5z1ajvhhnl6j5xkdyiaehljq116ytazttvopzn3h25tivjiax6z36z5iuimaydzdoezxmi8q92y2eilr5no1k1ozrv122grcki9iw76y40lc051jgjsr600jo2p',
                email: 'eku7qvim0ohsm8qajogbpflldu546vo40mjxi37c0ie78vpvxvpyjg36wzm28xbo04bw54jl0wpzbrphxjl5bvht4c8rge3wwsnrputo6ssdg8wzlhel4eme',
                mobile: '8fg1wuyf5t0uslx8z0nowlomimcbcvb3gjzqauferqxtndsqmbn1c2pc2lta',
                area: 'yxpsff75dzuwg4etlx9h96brsg43f752iub44bla471ay1xt7p3796xcpobqukvj0mcnp344oonncxodfk5jqbkwctiekl15oz34xowg6qfnw1osglyntq8qzh05bwekk0g4ev0c127g9cb6x2f2etac2p3f31uxoqshz4i6i1srw3ahgk94253lqd7dnkx3b5lgmy6w1a7ku5vk488ylhioid0ywajatqwub69vo0hr5e8zrb048jlak9l3qp2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: null,
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '6ouwspr7l50tp78ibiyy',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'qz68szwm6qx8k4hzkbe2m139lj5mzasgkyws4uchyctda4stmsaway7c89jo7rrh8ki6urdl3pvaetumfbvotozcrkk0zlm0owl8drk5zxw9gagznk0gtnzexds9z9b5l60a4ttbnonrls5e2xu74nv8wwv88o6b7eg33hnwbf21whz6i9mahe2cybp7b92dye83szi9t6btbh4xnpk37btusub3zscwgdrf2xlxeo2d7cc6a5auhfbxzny3pib',
                name: 'jwssj0hgeebevsu3xrdic456oropj6jxxkafmpuf98jbd7yz7snr3p9wkb7falxrbbkqge8gypg5mejf9wawa0i3m7pe3mg0h86wdq9wbr8xhhdn9izem6t0xfq1lpxbmy1f91ig0x2jm4xdcbnmj9hk3ujds6x54wjxf7e4rz8dhilgynmhk139lw8zkptujhijuqx1t8obx14i0738wmz162mb4gcibxrqintbkkpv6mwrctb935alghdkidh',
                surname: 'w1nd2h6jh94f8nxmkfbpjwau7fakmm8s19cexos3dkebh3wwao0jbqxz4api2t0py3v0lq2svt28f7ynu2wxj4p574nsqtfyh7ldew6bd0cdnrg2bnv76y8m6am4u0omokvl0ydok6m7xiinttsb74ljmuvl41wwurt678innmx2r6ujq1eaex1rvq61v57n2mrj5dtvrykqdh6pexpsythlfprm2dz8ei2ejdih1glmirxcdxu4uw6fzjlaugz',
                email: 'y454fqmnrnm7hufz9p9db560trqvu940ud5xis8fblg9u7a3j38m81ls50h7d3z920gtucnz2wuygyua8cwodavvox3wg891sv47ea1e1ks1l35wvrg4txyr',
                mobile: 'w7usteklkhjzummus94fweeelfvhof2rziqeq8xzhuchb48hw9g283fujkx2',
                area: 'of20jdwrfho2iaj25iczo9llxjvtglezma2xm6nhk07urkm98ow9x5bxh7es9zvgzxl04yujv8444remoc92k3ntqgaa2po02j5d0j92dh2g8pmkfr1n5dlpadqr0dumcaoteooz5oxtr3al5mk1dxetf3njar2i1jo1vdwgau4v0zngctk3o5raw855fq50qythc2h2j7s276rlock5ihge72237ncye5v4c6y558r76vt40b2omk4bb6khe8r',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '4acywwgusxri6i0jvr4t',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '3z81jtuwjurph38sxn4ydvw8wdslw7apzwvw3btswv6jf7jjif4gh0fg99hjxwwtfc531xv5hwj2jajcfox6st807liddrq4gjzei62mqc1rvsjkq1tutd8wp5vdo3zodki9vowtiian4v0x66qezgtth2lsozrrdhq41865fzk4me3kcv8vonr1li2kofxevi2f77ecl7i74xg5gqgzptyzm29rply0nj69toi71mwcbte2uqu5u0h5gxeh7i5',
                name: 'myic0sx3282mlucff774fgypqcpq707l9g5vt7xejzajyqauko67my1rtuqbgafmka221a3mlvg9hmhm87fm7hwn0tv9sl3j6e2vk10mp9nzx6lj5i52xridtesqif7qnitlge8btr5k2kjkj2ha4v5p9vrpdafcsst4k7fme1p7rzd9qrakrsivcxlp2phyxhpgrocxu954nemv0i38h8a8m4gajfim0mso2wuthv3hcfen52oohwvtv3xlcg0',
                surname: '8aplu5qdaqb9ij2mcmyox45vu5665mf7dg6fkgg5nbe0hk8w6lb858hfejlnu0m2gwr9n22kcggucmw3ufbipyv8zj6l9tjovsle9dxez5y2vqlxiedm8rxobypeizdsfi9hrs4uutzzyjbw0119irdgrab0otvtl12p5okp8qg4qh2up4zf2kxh5jcnrdpidunyw5ye70n6cpsi5jzy7krayudohhtsj30kgtjm3u7hgxy9earvtq4ohc5pmzh',
                email: '1aj7a1wkqq293ghoa785hzh3uys5swz485pzwr2bdf81r9l6gqlggb78vtf4kfnf85uwsxhpu9ohm19wcbs8an7jyl3yp7zpf4frdvugsv2598w82mq8z8mm',
                mobile: 'a8g0yd6s2nx5st5m76qbyetv4zqvwg4fcj9n6magjoudqlxuyofx6bi97mrk',
                area: 'h5xabotlfr6xjygwu58hrilhuksswx5r86y6uo992k6d6morjr2boqsvq0wu1ce285ql8woo680oq4z4o8tpmreqwdu9qmhuzbi6ml269smcouokj4dpb044vohrlib1z6o6vvtl3ld3yuarm546mhxv8rk8yzoexf9cqpudmlhotnxp9y9hxr1vsuincfz4xo6qc2mztrg8u8i4x8hls0zq6zopjv43ggi8glfs9q0g6sp14navo2lg8805xk2',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'vxs4eezwo2yauf8qkjcanykzgy81mnfjlae6smtivm9yfdmqem',
                systemId: null,
                systemName: '8j8kqmc204rywfnyjhvg',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'hwqc9zgvpgiaxfr61h9mqaiba6hvb5v7uktlg7fm4m1vurlo8um4wxsq9qgtofe4ybhikbg3jn9ad9vf4dyitr02gpxb7vkj1fm4rrfepw5dapxyudbilpu7tfmii2xaaj7uqryxi5nnd2zm4jsjllgdmd6inbxgfa7eioj2izxyr24htk1r0bafybj5qf8u994uc80y7tmg7ccl7o57at57mosfogvrlvmlnjc5uk1wmfoygb9podjw6eivb5o',
                name: 'drxt7sokdw6rqog48iqiuryd0td90ickam54saafkido0x7nqmnz6yckfwtuk4ef0pvbs9i7upt5kfvcbqlup5ul18feiswy0u3pvnvqt6w81vxt5prr6gvwnmno7dq2ylawru0s81el3eb5a9svmuvk6e1uwvbqwovsduw9aqekrn7mtoycsw483lwzlpfglcnlyoc9xlv6ngkoygx64ful5p68ewc0fp6jx0gwx2qgn3df3kjceyx7saa0704',
                surname: 'ao1kgpep7evit26glty20xnrcjfwt17wuydqaalv5aj9nb9km08an4yj5l83cj7rt36wjxihqxe7w2cuxfxy9lonhx10q5upahi87dylwsot1gwyf7aefwdtvnqrla1rvbezu2advgr9vbsbbonral66g44q8csh2cu9rphohj786hjm0nja1ks41xxwpfkwfydrefrnkfy4cn36z6md60xhddauxxdermtutq1oa1knqu5ui4o1lq9twti2c9v',
                email: 'km3wl89opbqe5m1dexy2whf78y78h7ywt8exjzqtk90x04mbojwisy0ckr7yscc6vpb00er02bkhhh53govqjw8kt2qun2bcoqe4wy38dx5dtl6fvql2r9r9',
                mobile: 'im836xw74hwzfdpl0jlscfq26zrkr0e1a67f77r0l1zvrngekxdpq743q20w',
                area: 'u7eed2res0aubesqv7qylg18qa2sofl4gwyp88jm8w50x4ixlcvd5gexn572z542lgaz8kw8rtqen3z6uqpia36rretrwheyyexsnfpbbwdjqtm15i2ju4ot7wzudo36exg9ohkowrsb9xcfehrnoxhg55vt3e3gx9v63j2lpqxsbexb1q8smplrcx6hg2lmvqihhaj6zp2ay4oobwxcimedbq0emdxnugtinsxyoq8uvfm8y6ymqwkxcve43s9',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'nt1ra40v9o2in1ogbqsj18syotlatat6teq2g0t7wck62qqrgo',
                
                systemName: 'ud1qe5cbvysehshwbes3',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '0kr6tcq5sku2iq8t4nj8ffffcqmx3vgybow5lfpi52wz3ckb5on919kwi2e1itm7qwo9tekral7mpbnzn9rft2dzeuqzh6ajs4n68v4tpeccw9io8kn96trx6r3gtn7obxrt4iippbk37rblath98qhqqctnay3jpurb1uy1u6qp6bcki2qvi6s43o2sato2hgn36rhk5ared63gvhcxx9txw38wu25m7prl8ax07lrje0r26r9mo1si3kedugh',
                name: 'huqorgay9z2ilwrwr6kazt8aoedqvulvebgqa5olmd4ovtlxexdrm0ksc0bui4rorxlc4fhlpsvjcstj9tx5xtecz0idfmeyxg4451737d9u7khehr720iqrvyhpgrx97aw39jj41detk9glol03pqqaxlk078hbp3ndauw47r76fag1r9f1mz924yudiar2mpsfc6lq5726ch93zzlkgalqln6b0dohx8elauy0x4gcx8guswefzvlic09o4ax',
                surname: '2k646529fdd2groe3qf7wclawubbqs4oync20dwkhp57vxpqe2bgenu1av9m2qbdcts73w4bhixy5k0ci6545k2fhk5u85ndk2lx2k20ykrou6iy1qlpz8e8asxvm1wv7j566ihsmawasaftgv9swywe4hrl9kuzw6yr30gcwniibn39g14ku0wsej29mlstq5leqmea8vnhp97lf1znvt3368jwpons16yiz9xfcvl1ykdozotz1fb0sqd2rzs',
                email: 'hkpz7ody343uh0ugo6nsl5rhs4bnsp1rx1rw1re9jewuyovg83ve72y3txudxy5jxe8gvkd7g2zfjutz5zq7xgfhemyt3nxeywaaqjwdpyzb6guhr98avupo',
                mobile: 'htclhabgakgojcgz6cbi0uhy1xfmfcrwudcf2eiu33kxkqu92zgk3dzpkpnq',
                area: 'cvnsa7nbb2wtlrz5r3zyuubs4l3i0tqgw1036jcqddik2gnnibo2wteer88sd45uwf6u1favt8773k7sqjyg25kms03uxe31oq05hye7dvkkggkb1zqlydlaz566fl5rup779ewqphnup0x6fhsg6sjwn83blol7je5d2rw1t3oxeelkjtjr7k6mrz80vn4kaw8btcyv148ks3pqja6tljgvxkvyh3py6yhv4hmv29fo2ukc6kh0zz7egwwx8zj',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'p0mktgpffg82ais67vwjre1xobrlmc2rdsjdpyp27qes6vrjgz',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: null,
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'kox1wt9iwqs9q74062gxlz2q0zvq73iejjud3wqat1ah9au8smqq2vipzz17kgh6yfbaafuui23zxi37qjq6lyguwqchl2int0t4rbba36cm4atwu618qzxc2y5twut7eb0i7yf829pk87buni4jc15b7yk83yoac8dary4fna95ta08oere6uiiyp1zfi5fj4r1juhjrmcukut0yrx8u9aswyt8wcz0fsrbwbr0da8xvw7juer9vkju4u9bgdh',
                name: 'q8sd601dddfol63fk4k6usiutn8k72nhwttbeoppctimttutp2dgamo1qv7q7o6jjdcezkq289nyrsndy7l3lazfpjjt79gy7g6lbnj1hwdt4qwvvlbtqdepzoq2lva2hgm9f6waoutr5okotroatk7mlabyh56pv5sf4z39mrl9gjpwyz3xtff8v58iu0ighfpxw97kmukqiil6m4a408ktqcsfqqyf6nwudc3m1nqhib86tu5mcki07972yh9',
                surname: 'qslfu46ff6b5y7oskq1xap520y9795rgnambb8bmtannjhv5glyjs2h4sob5k5nx8fwdo72o41i6s2h9jvu3z6j3l9mygw6qeq4430pjgr6jy3cyn9sf2wdf2zewkxqibwwenrc7jnqw86qknne2u6iez1oivpva1ghqqa80f2ccy52sg3bwiywep50kslu6ik18vq1aoipqvdwe0zlgd22ytu6cyxjxotskn69y988pxnj2t5ryc40nqxxmkxe',
                email: 'n6luti1ngwt3gqabayrvtxce9b23pykdp71ucd3ao182kvjr75xhchwcipdizbzjcwa0yv0fc1xs5f69wl6c7v75ll0jt1nvpdo0bwmzg05sh045vvuuftvh',
                mobile: 'ep4li1vega88xagwmxu4mig6aj0uj73qmd73tp1csrtvvb1ipfjfjnowuimh',
                area: 'ldn5pok8w6vi613gp4bm85ulfo7r4yo54o9z3dnyhdnycz5q8dm9csjh3dyoh0wsb5qr2ep4s63jh2pmbm0d8ukh6j7si890mtfdriaol5ekj301iytvnla5ifkpemy6n94qimcp9axe12e238u3038phhf3n0it9gv28l7igihkhjb366vv0amo290b7pxl0c55qzt44hn9r5fuc0u3x5owncntrntmc8y6a94pkle2xm1wu9htrcqqgoag0b3',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'nz683h8r2ug1bjz0c373emub8t0v18cccn17pb6f1eaofxfubq',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '87kosav0uzub2c82g8exkcun50l9fzrwrmf12ugwoyxcgxhlzmksjgjjp4knngndy14orp1ezs1ayehvs7p5bg37a8zisjs921v2j7t81u6p93ffkhihc0kljtss8ba6eloz2tz8w478emfkcuqreu9x9nsjeme061936aajhqdx5q42rsctja0dn9rgfg9puo9597e8g8m46tcc3jvfo12nh8g7do42wrqjhuj8o8npyg6jwpe1j55wzlt1lxp',
                name: 'cskrduogpronn3xwnpwojhc2aokmtaph373kzdlcdfki67efiep7ad9x0jd8awul0dzteo1gdogi2hsaxxvrbpnxfgpmstnub1sahh8ef19a6n1q34yya70v50uxmboqm0xtfe0dr3o9h2v0hup0haa22tjszfqayg6uacxfa3s7p0eu6nv873ytpu0hery7quwh3lq3zxviz4w2tlyogwed0lol8spd8cq1l9uqdgog43rw51n53y2og0inq4h',
                surname: 'iurtqq2d93gfzotm6x0vszrpm8azra9q7igqvbtnncfvlszanfemt6eo0wcdvrmia8unu0fic4tv4bre8ucxo8f7n7s7zls2vxwfg9a3z8bh0hxj1futujwjf7alcooym07l3voy92aov1lt8dt43ah94nl9u9lxjazjz35smesy1wsjedac9y1d8zvk0u3c879t0b0bhgeorgf4xduwm4qb5bxy66c5gulphu2aqfvcpqmbr7qgjdhjkl3xk0f',
                email: 'bb6m47w9h5dg8kptjmlbymvrtqh8lbopl06mbtvl23xnvraifv1d09av8h49q759reqm573xjwj2k8akxn5vrpatxqqgw7wt1l2bxil5ae8rhit60jv67f5e',
                mobile: 'c25cjg1ijz7o285dr8rdjg55p7afg24g9gxsqfyqzi0fieyedbibgbo73apf',
                area: 'unoi185mgx30k69jvk1effm7qxpfgz98tgtz4ixkcco95r24in2az7zzjsnbdn3efz7kekj0zwtazdwichr00sifkkavf9wuimy2qjstaoot0bl1zrs24mlnz5mpbiqu8t98tejxpn29lq9ear23agxd5w2dktnyesey9j1t3j0w5b1864srwrkyn1c1djl3j1y6mddq0gfs3l1yo7aogjqmdsijwkj60bwfqgr7eslc9w2l2jckoe5eomi5rky',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '9c5izm7m4fk5p8rh99sq6bviquzk8cxbsjzm1ewf3e18hwhn79',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '5bydz3lf62zlhzhxbmlf',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'n5b6cpkaccnqbn1tvh3vz3upr0a4klzm74bxo0se2aiwklvspnqh9da0krcuxg3dssfou47o6k4wq8v4v125i9elp1han1p20cyjm3e4t709lhbmlul4n1bjlqt3e68r0tp1mpdjzjc1ir35u8sep0zccqup7jrx4mn1nzior8iqizl5051adcmiuw89llzkb84fw1ybkpz408x92tokmsexgbny7yrmjvvfntbrmsyki2bxpwa1t53wistjmki',
                name: null,
                surname: 'r4om9yzmayqtfh7o8ti6u6x5s9v4zigtpigbbo53uneprg36shwgqc7i5b8mczxmdiju4ueagrq1glyhis92v91xsmia845b4h75hh5n3xnva3wo8s3pfa767oy34vukrg99ltzto421gwxxdz4z6afbub84jjfbq6jmwkxyt83q7yx37svypvxuu7bvs2psymw98w4dear5yw0cyqwwxbt6l3c38j8ke85p25a8a981jhtjziti07pj7n4w96u',
                email: 'p3s02yyc7kau2j47fik1haukh2njvqkb0365jpnoit9bv15970njoduosjo2pea0dt8nsza3onko6z6b2av8b14wq3v1v69xuxaq62ooirsmc1kn9relf8lr',
                mobile: 'xm2uemfee013uwyqkq8t3mopqa956ebmhry7kqzyqpqdm3sda8sqntq2cnmo',
                area: 'xfyfxloyc8s11dh879iiwmr3lvxyqy7x1vooytz7m81basf9yamad00va7r25wfu0ey01hfd0ia76awa8msu171qzakt1nn94h4obp0yfhxdctdt480u1binmy1x846ama8qhzzkmcax94e20x8bryfl5ch25firhqlob57zrk117p8z2pe3cphl5tj840jyr83rvna82jfhgkc1gosueeze0pwe8db9mfwp6yq5b0t5fkctpwdx0su6ddckh4f',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '6qkrntzx1l8v7zuiq77bbe184sl2yauasd1ve6lockd9y1dx16',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'zugqm8mqzrhqybi83l19',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'efgq8s1bzxr3af8gxkplnw86zkvdyy38znawcnmge6fjto04u0fqealc464th1fwc4s1mbd1bi57f204b2up508qew07n7jyiu1pvewedj5h2tturcxw4jfzdz29xn4q9jyiyubuwrt8sheox7vlvj7loxni0d0mxkj9xmez1ybfjslv7xpc42y3czhn3kv7ljj5xw8msfnnus33i7pk3cmv6mkl2bwmtti0pcxoom2d5z9k7n266zmunbxszri',
                
                surname: '67oy4ambvoq82rjwiimghoj4nq84zdripb6p4hgoy37n0ly2xgt8rwa2i99vdllo885gihfqugtqbporrajw24zsx2f8tdeamsfko8dkjtj50bgt3z5rjbwl9wdkmim5dsi4442axodrdfdkdx76ysbcw0e5sotg19ya5rct8o3ikjuzam93f4uka806pq89dl6pw2nvlf3tjdt7s0ekoze1eu9ka4cw0oxvoihkziie0pcyjewd40weauua84r',
                email: 'd9dy8kjh7nzww1h0xps4ilaw9utpywkjdfs5h0o1o93inqhwvm9m8vso61gedyold9xfzrkwxaj4fbn898blbv5mzhu6pu64idrfvu7eon5je7j49xp3dero',
                mobile: '6c1rn93ei6ff59bilw7rbmgbi458jp13lyuufmf9k24jo2spfcfx5rr6i70q',
                area: 'ow4u4yx5wkx2webnu5ju4x5l1ofqguthsyc0cdcfsnpxwvoz3rmp6oxp5uesqbqk66yrphl4jg569oxc4g32poosgcxip0n5726dkvml59jewjxosofy2ggd8l3r4pknfndjqfu7xt7ukyqwzdk88g9oqqfl4w8pohi4p3dxgre83qwqm4af92st8tsp64mil0m3ekma4gnyb4ms3n4qqa3yo8fyo4fbm1y30cneiy5ovppms65wfwinzqnbclh',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'ckme7l6jsxa974ic09h7t474zt2ht6l4657l6ai11vxiqaeqyv',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'kf25nzt0zvrp7n0qco2k',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'tqlr46t1x0snzhy1l7myusoy27rni6f0z8i8971fu7a4n5td4xyczrle1r27klgk4f01tzekbg121xwc2uk7wotghzmef2u0jaubx02ird2g9o7b46238lwb5jhpvomp6kv763hvurr90clc52h0557k2jb0xlxzip9o7b03kpudknv2g0phmeparrqz1m6wn6tkdso64rtrbyb9kjfwueyk8b63hvgb72f3bf9srb5115z4oyp01p9hp8nnxuo',
                name: 'bb9opo8is6xgg51pexb6el56rowgpz69zgslkmmqsu2tr505wfrefymtrmdrjl3gaq89le70fdqblfjf21n73gy9ninw450c9ojjqpjkf8vtqezme5c3go2nj05j1fdwa5hj0jth3ri7ws4rt90lfqmeukbwo7k7nngubuz7af2g2o0izqfiekkoqdb11uhi2iisd93e6qh3a098glvvyq77vwztke9lxkseqisqz4hdxcq9ch3q4f7davo0svg',
                surname: 'tlliox0z7wtlvts3t7ogfs4smtg2lv2vivqnakr15t253ztbq1jrtkmdemw4s1olx66ofu0efcm7mpsh4k662bzxsbxzzsx535k54oar5ezgqa5qnfd19f9u4nahtm4p9bh2cshwpael2im0701c71ut6mxebypuo4tr0r80artvr7vttnej7loszca3kqnaorvpehwhmpraa1rsept68twjouogzl55egfbjqf17x9rkfy46qo2gakzz6xw99w',
                email: null,
                mobile: '6vh29pyu5fatg8fr1kh1obnv7l8hngs9x0u2zp91ohhfbf6y6z55wqps2h8m',
                area: 'htyep94h4eqxyyd9boa4kr92mifofifo4sjp0o44g9jvnxegf4xvrr9gxn51sqbo8kyeyxkfmxep2eupb4zluwhm11etod0fm07cv8ex3pk2k6q144xysrig5vsm5i01ec5ee3lh0mkipesyqil05lwyuky4j01owdy7cpvarjzx1fv63pwty926omrwgy2xm1rir5yxy7cam6rnj580xcx8q27s7lruib5gv9vohaiotj6qztl02un4pwn3lnv',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'w730tu8cc1rkez0a7p3li86dxr5irfogg7w8b0zulcfj7lrjxt',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'imjwqbqcamywn1mfux39',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '2fug5v9iuubjusfpucgo8ozhbwtgfm50vhhekbibvi0qrgr8n9mv84q84aaz6hngxfi163gs9mrswomjf978g65kva9hkxkslnibk0zfxtotrgmi45hdcqqic06ad8w30x7ur62wlnigm8pmvamvrdenh3znao1d7nuw5j3kwz4vym3yzoc2qfh827t6n0k69dt52o3jt5m4jba502xrwi6dnamvfh9828mqv3j3ebn9jj7u9uynu3rrxqkfpd9',
                name: 'dlr58bj3x921xwzqcg1a3novxyhjm4sbbbv3kj9317omarscljxc2lrf3wq6hio61kq9vyxyw8ycql9ra6oriseip5t7cs3wykff6nzaugt3ixzwbg3qgzz1z7u693xxdzpd7zf2sn0rxthqfiep2wp1bzncz61yrv7b2viplu1xnf2qcf2a0jwl6jpxa6oknf4ulnxt9c4upyxv3yk1ocx4tnhbhfm7266af7gex1ji3xtbv5wcr00go8y9eq9',
                surname: 'h3pp72vih8pqhz5b552rn30a6312ie9mdiqg4oqaefhk3e4u7uo0ujwpd5y6wo1kyorleahbth30rz011px87lg3xxc08rxeq50udwf8e46zy63sy79nu42ohv7fysqrgg9a0bydtuby0sl9tvr9d9lpss4xdwg7prk3expgl0qo0zc0c2dngtcbrzi02bopv0oacbk9a86qhn7vx1fzrwt7thmirt7fiho1gdto1pml05mtywxwclux9cs751m',
                
                mobile: 'kj8d1mirg5w9dcmwzjcb2c8g3hft5b8h9pzhd1522wmh0yfcmzrqwu8872tb',
                area: 'fw1bqcdidgng08lgequd09ebvci4e7uu4mk6gy101krxyle9dc0j9sbbumwq5wq0fzeogrnigjp47zncq8rjxa42g6pm9y7vy0qv3u0z0131gh16vu326b0g7h5tcjz9ixngujvei6ftvgxk7zn30wryvun7utic2bd38vm3f0is3ydjh5jtpfi0lj4zugwcnpl1vxb20ts19b2yagzoh7943njbug8khn9p0bwifwtdm0atzdyh07lo6e6opcp',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'vi7azn92dk364uqxzis0g1qfq1o4c4hv54ej06si78qnv9k2ce',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'cyzo9vwwsamtco7k7wx9',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '2simtgo2oq2svq6921xjrznkm7dv10998ycww2q6c5gd3lbt0xsxr39839vt9xtm2um23b4e92jw34e22tp77qmp4isykoj69agtqqgbyhwtdvrb0yu8mredrzzzcj0je7scdqwuewc52cknay99al7pfldipeu1bdbx0zeude9yp1uh1oslzpkji0was21ybp8pvl1ez5zkcf6mw8czc34fwfcxq6776pz1raznq1kk8b1tpbg2sko1yz5oe98',
                name: 'un080yrm5n69ruvwvglomoxsjm0n1wqs0m7sl5zpjjorc4okz2944evlhmnuwnh8ivydqhsiwh81xxak7nhvzbhjci5up8uyuhpaqaqj9pjr2njis38r3juf07523nqqq7oz5nveuprqgjxvg0mox5za22z2ga9t9rxugccbmvhi5mj7r1qnlv7eehc4v813ertachiz4qmzfi5rd9hzck8hfwev9lwz40h1wa7yhcvqdjx7w8sdedhl2v6sobg',
                surname: 'qol874ow3ztlfw9sf78ozhy8lu1rwrp58uu3nslhyagjk9q0k95d4c7khz91qsrxb9lcpn2un24pym4mvoknkvrj3o7zuwko9d7kg6fo64duyhkbhkitc98x0h0x3tpzgpan27dp4i05v49qzv9k6qo58ez789ybk77qata3a9mf10xrgrbvocol3mtx496tdirh5h7sib6zip85mn1796gi8hj4xf3zc3fm9277tlxfyz2xpbdc6civ6rdvun0',
                email: 'd23umewkysagnuaiqwt6ybjujire04j6aeiy4ems2vhekggh48fvv0pscva7chkpg4diy1xdondwdap5dqsi0t28qffuuazkmsl54rtz3ukx9wp4w034tkwn',
                mobile: '9p7grxmeph8m1we15yyf0jus2ga58hpmzsfg6yafz1bbkf2w17luoqmpiv8b',
                area: 'bliwg2pomrkf6gipy12i8ltxfa30xcfs49glejbuyd5hs30f5653lfghafa5w81znr6d18wiijejxn735dy6fpmpq4y21vule7y8bo91aglk0h1qhfcovfyhcvputljkmmnevshl1ga5kielmzny5gtrgno80mtdupv4oa5bchc24j1wqnd0jnzia5vnnu2kb6v1zpu8u2uf35xqsio3r8po3zd4wq9o2icglmaz0yjryvx5pyhakdfebu0v6mb',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '0r4318wq8yykay3yqh4v8vaco8i2b77o8ah4ng8cy8q2ktp1xa',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'fm7o10iq7f2f6gv9zvej',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '1v65c27nxm8crl81kbkghudsej2b5ywclr30gbwpj633qea916md3o2k0gi9gzorpi1shwzpts291rzhn4bz5zgeq941yn6l9xomfgq6l80nw8khevo6fayavwk17ujnz45tlewbd9dyoshv6izulwdnm7obu216f01aet9r4h791tezhixpzj80l4abi5buyd18yvet7o6euc637tf498pmmhklxwi0tike6adwbfygrh13f8nu72k1kh2sgad',
                name: 'sihi2q52fz2v6cbckcoaxg3nn9d7khs1jnmmegk5ny8v9u68bg3vt29bqs5cf1409hsj6rdi5csqj3lms2ez6n89a7nmmeba5392lx88ra578exg3kmq97uo9y7pzbefukl5xrienv636uuryyodegi5y66t053lsavi1dh6i26pjttp83wxvlsl9g1g799oh4l2fh5phwo1ionga5y6wbgefkp8uo6wau545y1kjqgi68zmjlyipu7u5p3eug8',
                surname: 'xfrxw5opdzv8r7bigf0ipyx87wjdlx6nzmlr6vdozegg9aqdsa88gyr4yqsn334zpcxpojti1pb5ytbknxpynimwper7r88gg9z2bzrt96ozgtzyh4y43uybz9ku3782e5m8n58di8bntmtsia6aom08gsgjwc200f3nkevrwl4foh43h1j1s2ujql6yl1ggqme09ovnkeonyr4u5z1sc7ayxovsxwyjlqeddbviwin30zzi7j3ctunxfos2ztp',
                email: 'qrp17r9vrizo85449e4yzjg7s8d0xpnb64xcgpt1vos69dre4c6qgyok7f3mdjg2sqcr400p4opz6wxwp06oyfr32jyjhg6b4aualul2fk9o3xu60xhcndwh',
                mobile: '2wi5e48dyj3m9w3e9dwafrs5bs4chgssxzn4bcby0p2rxbpjbzlh9a4w0psz',
                area: '9nddwah0th4hpcw5ws9skt2kh7zg4yb1yu691grbrc5wce6ew09kskpaj0zmmvbvaaslghzbj15jqxyhhd33ndwm5czz56m4jgqqjg4jjshtsuehydtn3e9bvfdxjvzadfwubndb4re8tkzd1fsrj3odlt1iuoxz7kjgiuhiglg1kgk51sb417auln3rodfiocn1ire38lww44rxk87g4n83gyumdd1wjr299wdayugg245ctltcy330b4c5o9v',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'kcemvkkloai0x4lnb57yeiqbiu26ezs66t748lyb2we4ypbfo5',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '1eslt88dvmi8jsfs71yy',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'z4v6v4da5xjstegko9hcl4l2ltjvro1w6y07dv4y5tmienne5gr0ego80piyr2hco36f46tofmu77c9guga2d1keohrxv8worzrcsf64i06df8o2vexair21vqq448etfu51z9d871f5ut4x6rjetk1x7e1vr4krsvhujfpwycyl2qgacboi5zgi9yrwubk16idrox4smly9v091g5joyngbiytsvopdugpngtw5u9wt6a5yb6f2r5t2poz1o14',
                name: 'hdqxivgjy0cp13hm6og7ftur1opcxo5jsibigw5u0jcl35trqxfqizrothq16kx5jrjpgi0uf5sdi5s42ryw6oe0gtxmbi682t5frkq01sz52cxp1vuolszbf2q0w0oihjcq8he2ndi15oymun4y3rhfgnt23gm51d1bhz2glxheylowopfzvj4cevcs8lg288jyc3ay2l0r6898ute8gl9sju7uh3qwjsbvpvv51hoyo1n1kxea70x1f36y136',
                surname: 'j54d77iipxu40etzbazcx5d1f3cx87adlaqx78xdqrn5lttrwxtay7rmirypwtjnn2ywfvcxpkedo8nznuht0995498ur8mje55pjpggmfgapkwmwi37rwbl9j01i81605qsepoosp05nfwqyclj2oinbkcsll23wm6yi006di7qq22hxss6d07cwed00v3lwb3dpp4z31z6q0ee0vok6ycyly8yguwrmp9w71u268pvqphdl5b9nh26rskpfii',
                email: '855paf08qmu0xgr38spbfdnvpmwusagwtxmux5pj4gku05zs5rzjtw6avc33qjior8qkqrb202x2d8freaxbd54gzspg13wajo0pyfhb81kdb24npvkr6pw9',
                mobile: '251krze33i4wvf4ky9buxwclri7kzwv7pp5x79knceh6n86x43jjmgq1gaq6',
                area: 'g4tyuia25ixi1d9qlke7oxqgs2t8wk8p4i6fp56d08ph1k5zi7lj3pdrgneoq2z9oid1x3w76dl9k9sy346u0jjfzhf1eo61bl773megd5zkzl00256sk5nb6lostuvftj8iai4bb189ahiyudyblgqyxtjsxqkif9jngl2pcdqilu89kcfahovpmy651zv32ra67741fp7j7m1lnpzs8ayc9war6ak9udt7u4698ytqh8z6i02vks3e3d6nuwn',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'wcxeikogaxeeacbwas5l80vuknll75lfmueb2jnpr4alco7v0t',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '3904ec56w0oddomqocui',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '6mdagr8o3y3ucppqdf086w3094scpzyy0vnenxjj3caqe5wwcl7ztlsj9fawk364qsr5b9er9s1figqbz42cqwyw5boo1nz7u7eygk7wpzvr2qfq9vqqo278czaua4cri2z550r4ktcaizcho07opntacdbhmrmoljt7ushq8fe4m5cbk9p9o1f2mz5momvqqcx0137pcge3c1oxm6mdijq03sb2inl7ovsq20bp0o3e7iny3qt04i9t297cdbh',
                name: 'l1xzhjcuxqe59b4o9bjc55qj7k7fg420m86qkf5bcpw7lwgjqv8t4nrqun520g05mgj09tai3r8cmzc07zzqhrh8yae8cd8flhmlsjyxy3s3aztt3bfwrbgh3tql6vbhyre9k84281g6msf502w0ng7sqmkl9yvq7vty8lnka2mm1bmdaz19trxz14lf2c77is9ex7h0afl9it4dqpotzkf28ev4nuvbws2r5fs5qx4v4o06fgur6rsay2nr5ol',
                surname: '46nyse6h6upym3vyrigx2f6knc49a3q1mbjzb4fcys0fvzw5ofy922htfn5dwkwuy1i283fixzeo98omro0qvb7uaig7hsclwk3196w3t705w1wdlacp6ehzz3764luh18bcl63nms2jef31cgcxdfn7tlcgo3w4u66vcgdfc6r7x2yejdoel4nxg47nyhj84drbed09i6eqd74d83c244eow2vimanx2adi7ottffg7p0ze1l4dffoeqp1omke',
                email: 'h06gpfralh2f6tqdu98rbw5zocuhk02u740pcszics5v0iyjx8ohh3iy9ej8zs124syugmbvqd4rwnif400wudhptfxukabmuwn834frg3wi6w7ccp6f9ocb',
                mobile: 'e01b79a1ycl2ie08bgemjmebong6ll6crke0i0dnpxko6n6n5gym4xl8yhej',
                area: 'ins2wyr5gvk8qwcjh5k5ortsllcb8wjniosu0jy53s8vveatitqmn9ccm1dqzxr4yu7heya3mwomt8h960c2yie1nbxyixpta6xul9m6ott2z3y0uxc45pv4beiqkets49y30drbw65ts63emhht6czmqsbbxy07lvvgdaam9cb21rbtppr90svgetnlclaoye72dtoyulym08k9ow56srcpus4dxeny5o9t3yfrniqg0rtdksyue6hsglt6iy4',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'th37jdys6k8bl4kewq290ah4fe6jhyi5dvga4qo4nxb8sbok37',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'awjwdb092ylb3fhy6wes',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'jqj2jd4n0u3tjh3w5o3jtce2y82mfai4ywge6k4bh4w3uo7oo36b06howp8jjh4zlg57bl7kd948k8tlworgo02xdi43zkw0rvny0klhf52omlgga5nnviltvp5i8321zwxhh8rvy1tok72b2il2r5ixvy0jcl0tw9lk2h9ptiped1gdc0l83kgypubpgbkzkh5rfg6jajln00gn8035gru2k8qtgyn8v03xf3hpf9i0gprrkcdbhop05lprq4l',
                name: 'blgi3onck2rw7lxmanmyjxs6kzjfi5lch92c0vy02lh33v6stgrpbaopfsz3nziq70der0bms9vsw1mvrcdn3lzquh2ok3lb4l4xjho8plkkamnlrc8o61bhkvd7rgrxao2r4pdqvuy6r6zklbiqwurwxvb3ckig2twplw12aia1e7fwt0sosp31q8z376rvsikwhkpv78k7yvfjddotkim396q51tljptsognblnyemuz8z7k7xvi6gmnzya4r',
                surname: 'cckqd36c6m0zhxh2whr965d4jhjfhona6nzumgxhiztxzfy1ec36suriorbhddmlv44bjgvb4hmc1a73tneq5y0wkre7nusx7mgc5yjzk9vd953icd4mmem4sv1wnegcyjevdm1cxqw24x4zlw9zrtl57wrupmzjftjiv16dk4ubx1u7ukykh6d6itmfbuqrhd8jhlzeuy6d3p3k99ho613e7vwti9nr25s8ieqb1awlpsvfy0a3qtw3hd7v2je',
                email: 'yz3gnshw0mzhsm03hvvlsh7k71o5e70pb77ipb8nozxo4l73rdqkrxvllo6p6yqo7q8ni1nmtykwm00g7x7nadnuj261865z1s7ih5j28kojcfqtvzrb0e8r',
                mobile: 'lefy8fe5qzd5zn7vfyhtq6hav5p8uv1yl1yleax7nljdh47aic7few8jm9vs',
                area: 's20ijer0lns3s18psxlj3w8rynwotseenuznikofecidadf3qe53m44l0onpfxs5wkzgpem0idbmvrtselk32yyrnih7a85q8b82ktzhwucyqaysfnbzv6lqd3ltgrcbp5uspyiz9n55mbqkrx9v6khmgrzcn99y954cy7nzibopz9dbdzlt8260kvj61n7814mubh0j4jth0gsj2gracyqr5ontkrogqjtbpjqparkltbmdat7eipbovdkmv3b',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'tlsalfs924tyuv64levni7p1vt9lr79hw9ihyzh4gepffu2ku9',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'nm8zt60ljvmb6skdn2ku',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'y5tl1uruf38s6v48ed5a47q7fhh31gqa3pg2xkopzxo2bn7lezy3h43gc9i71x3tht6tpov4t0zkah2afie17l2dwm3yjl0tslfcbilglgkr1xel7ez8sq3fudjmc8wxl7l44dt0rzwvr5l87jzllrpiroehnmewgjhwy56t8z0twr3xx0pwasy45oh9ccq0zy8svce3jztxexw0kzqm05raintjgibx52gr61ofxp2npwuno057315hienz7rl',
                name: 'kdf24hsp2fbrvrdzfxrzxplra22uwznkoaguawkbpqrbsbala11kdobmu79ly9q4cei0ts2g49w3sqv45jfbnodzwmco9porzrzvatsruz0xbycd9y9x53w86an4py30yo9vogtjegupe9sd0c5eix32srjqdpjh6ickqyp2fobr98avamptybx1qpl6akpjwjcs52i1jidb2zfmedxlqzwkevru1rkbtyz3xla7kwdso3aclb8f7i9d9l5taue',
                surname: 'mysxg7e80xf2h9hlkaf4bvnh6w7i18v6q8hfbk3zmeb3h5w0va3hh6dl5kew5jpfj6g4yuuhzuzn4q2yoco97p5pv6a383iej73p5v2s1gfpcz8pph42m41wicl52phhddyk4hzbqxbovpmzjnhc5n3zyytckalid9g5rqiba5jowhnndgooah3xmhhzlxewuuu4afiroghcnay130th5t7x8d5aaf71vjtpse818wc0wjqg6492hbvtohyubob',
                email: 'mvmc1dggn3q3i9beawrna1ogs4i9j56g2kio74rqnn7xgvmnpwazktn6gnclpmal9znjij8fgy850g5johh0fpqnbym23pbxsthkipgky4mdznmpm72jcgmo',
                mobile: 'ojrrutjlvbs8x0rfoaq5ey13hknud8gq975ffj2oerdduuwlemnaoedfx9p7',
                area: '7fmicl61ap3ifp7r4u0tz1eobjb3wp009p5e34g5a845e0tg0e98pz5rqezshmiefffn7e4gb4uy79ja9hjci5uec9j4otpr2ng6zw9c3sc52s2lvc2om91ok8h7sqp6znqvj2ehce6trhu7gz9rm6h7yyo2hv5sjnk6m19ctjko6akut79wiofrhojubltc6f2us7gkp5nfn14u6uz4n7bncmh72zn7c15wewn2e4tpxh33k803e97lk0jf96o',
                hasConsentEmail: true,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'qumf0nqq5qx60p32i0lg0zp6eplrnrl6yoxs1',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'xsg9e6c81iqfcedbqv5pzsttgxo02bf5s170lqqc6yflnh12wu',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'az6lzdwgvkbc2nmmgouo',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '1vgcinoewtzrjv3r63cdfyldv6trztyg1d9zg83wbok8w2my5g4zpy07k7oaba2255azn0cr3mtpnrdp5h5doy1gk2i8exy500o3423j6svr7uhfuxhppomai758vfh6xepttj2o6cu0dtc57sdgm8pkjx2y05x27j1h5e5kx8fdghes2pzrqrym3fix3g761cpzp6e777er9qhhehy5p6tihpgpe811oo7afl7kx59n7z0r2fgwp2i12k9am3j',
                name: 'kqi8shytaz17wba1mdh1rgi3ojx526rgxk2ilszpqw6q2afagdr76tf3ltv2gvt26abqccx9bqe3r3dpxtsz3uslfj3tkc9bdrp7gjv3tvcue5mxwsde631dsx8631znkrrz9duz687m9ee1mzqpd6mjiei5ky45jklog8djvhxoo6qd14nk3rfe28vzb3zo0zzuoihdem8zgd7ri3h47bajiplm19194lmcgj9ocni0hcrfre2o0o4fkdn55x4',
                surname: 'bq27y9vj8otid4yclkzm5s00drypt35lbqc1805b5msf14v24i9ww9nct3no5pbblclo1xd923oum8pnzb1hsguwq9pfcmst2m6b1nl3yewu7sffz7flmv4pgwzdbmq65h1c4g8wqij0myjcvj9x3dmhor5ktyzpqm691wjdbpfffu1kdq94gn6uzidqxkn62nf8c9rj44ao4h12alypyezrz3wi2bpxhc6te20k8qkckzq3efcit2opakcicjw',
                email: '9344fr2emxssvwikee5lz30e9qizaj8x569pzbuy66lw60eplp2g2cdm9253h851fudbuh03ay824fnshw9w1g1a89uk8f9dugbdaihyu0lr1mlceg7gxtye',
                mobile: '8x20xldhs5nv5ou43lmeki8fvf07sdkj85ue321sm380rgzm8iwqht1levuw',
                area: 'bpwi1j1p7yki66qbxsiiz1bbjksd1xgriwjvx7k35ezkb7qx5bbgbm1s5f4wiqmnb7giu8b5fmhxrs8qszkxwrf6baleobi47gosm7tckvp65no04ntf82qmzw71oycopb0vj0uuq5vdszxylmrnu2a3w8m82vuo24f0h8rkcezkc1bb18y5zef5jg36p8t8hmtcos7wnbrolcn6kv7fhq16eczo2px0t8h1w0sc1muu7ee33b5y2ra4ry38c7l',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'hist1aa2tsngiq0urkgps1a2d7vbl1asof53o',
                tenantCode: '9b2nzbsxo2ytq06o14gjaubr1b2yk2b0i84y9vw4di43lxcqmp',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'z3dehe2fctu5m5zs4913',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '9qkrnzhh8j5qajghcoysx01axwz185ayifadlc8n658ewa8u68jofm0abd75qvh1cep3o3qrs6nctjr3fe8rqkppabuw43mcupepjv42j0x4ftn1a8achegg9yo9ntm0xxq5bpsjbevr2ktga4y8bbfwwl2kctkokkl7rsfvusbfzi9tmbv565jep8ek4nwahpys0z7egbbi39bd9u3n884y3vuvhhakubnbx0jjca7pjo0jwx1zisv9a4cll3d',
                name: 'oclymb33lpc42iiswyw636o963kynewn6odf8uij2gjrbxvdm2payh97enk8340vh0lolc70sxiamz1y3wikt9grbgpveakxapx669ye5q94siyxwuxq7dxm8318fcniljqut3s1n2fenpab83eh21dyybm40zm9sgr8s5haiex7dsd94mr86qioozlhnoxnvaodz9fbq5x18cfuia37ayuk4kwkar325902758sijvftjrwaac7lu9gqpn6u1j',
                surname: 'c6sprt0qkh5akt4t5bkvw6m04j0ay862vwoahpvhwso9j0637a6yswqul5p33c50jceyrf6q2d6rp14y1fxn2hwamdc39dgmgrvza800tiwrp558sly7hg5ncx62vno6fwefu0fwo77tv3sx9kht5ib0ddg3sqr3u1lqk7ggse2s2x4ypxixsb8t9j5dfloaefkz1hdbll06qbxosupog4fs3ykwptket9wx5m9bm814e54idtg8l6l0cvpuigj',
                email: '43yjwlg4x95fjqfaj22oohw8zxidt8sjkdaf0udgwk9l58cpn46gll60taycpx2cfx0y9agad1zo5qmtqbzs5v6za26lhloe7xaa95hmj9thyo2pj40w15e9',
                mobile: 'lsx2laxelwaw4bc7d3fmlimsepz5l708l9fl97emhckgk01xrwzfaex2nrka',
                area: 'dtv4vv69bd8v2e5k14tlxq7j76ji40bepeqtt9f7v3m1lumxh3x9az81g41naznxyyzb8zst1a7n05w0gtkz99s6lhktwxamfd7u7j0xp0pxsd1hcfnc2iuuctlryoviojr08t8pys8lcq989lo05duzzpt84i8ow6rnuk0isduyluy0iuaa6f3oh46sf55i6im57gyqn2w8e5unjthmxs94rzqp0my62t81ia0wz0a7zj7ud4r7qpqpuxoxom5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '7wtawapkafyrshvgpacf243peph1v9unp4z7fxcgw9gs88vq9r',
                systemId: '7xhtk5ml02pki03amf7f01gk5bjmvspfpezbc',
                systemName: 'bu3qrxrt5gy1yj87m4wh',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'kckg4un46vfginkplnz45sj4vks9mmwkzkudu7yxn51fhp7w5se9hfzytvj14yccw38xarnnthn5culhq1mxqcy9rc9rqhc8bk6l58rl9p2sliz31ityt1qzix8ceqbnx7pemo5jxgsmjearpx1rgvmfnn39j811glef9denxspvhoxpv9295hanxh9gq9k5ao1cxjrduluv5pkdgilmvl915ehobarfvr0hma76u4cfmh7wiqlcn9l0yszvhk0',
                name: 'fhs52qsqbpotw9bl33e9thqeeobsuam6eu5h6y2qccnxnvr14bpz6fi7uyy025rzywhoyy7s8qv0xsqu7o0jawsmym7279ld6y8wl5i02i58jr9qt48qhi0qq8i1w4i0lqvgmvizcu7j7sj35x0cg38bog531df65e7ncrukovdgembh7fepmduklkcdi4ampl9u4y7k87yhl6oxwfwv8798jv9ai9i63nnr8fvu9q5ibm06lmx572a3mh8sjdy',
                surname: 'k0lvilf9zu5cubptehkzg934z6pizlchet7tltk19gxn12mhrt166dq6m71cn880ksf6wtqhfdb3f751w8wkt4pr51rclo2kqeg5xrhbbi9gm1y365q0h1aa3vat0sx105s3mea3cqj7sj4yhids4j5xtzm9y0ne9h3xq344jry7m7vczo6chgyzsave0cz4e5itnvvw8sp7dq5slttbyami9t0t82b1ihazbli53wh1n73gstnpl1v0080iidv',
                email: 'mvm3nqapq9gnw39ioazhfy9ziou218sxrsu9gdk53aky4a8k5o2pmnjoc0t1i98yt8r2k4bgbyzomy66qfpckw5yrdcj1riercx6af1e2rvxuldn5n3hqjv1',
                mobile: 'h8ao551wkod9tmf2qe5ptjamabnb2ps3l9fqj6szr9yvqegi1xk2deadyndw',
                area: 'crtlayxijnj3yn5odsq2ugejwi5hbv3yiy9alg4e590jk1mubsg9y0vtm4cq0w7vsoocn5oz6ka8ul9qpzfq7gcg2kheg3mypyku441eyvscfrx1nx3hzdhn96z7jbdim73xaqs2yc4m5z517co4ukoqi7m7fk8k6ideyj764hbyb177gdljtvjjbprek3bxsz5brivr7dd2xf52fe2ya8rhz5sby45py57lhn8sxz5p8y09omqqzl92uf5ivam',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'mgqfio2f38wa00oelbknqjwtjiokc7bi57uqdmd7riu7ghgjv2',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'p7ef2my9i0ygxqfj16ir',
                roleId: '4cxnau3xcmjwzmbma9r3d7gbh6gwhkunohzx3',
                roleName: 'cowjin12n7q3qp7mcb8atpwq8wyvxyb59pt9y4rwvs2soo9ka6c6qr60267aolik1hu5guy4yc0bdmnfvk2mar514c7mn7fumgsq3q49h81af0jmo9do725lkpwjs1483kdjwo9co4eor68vre74zb8qlpp7nd59583whgdof5i6pxbty1gu34ohohyxy4gtbebvooelc9p1ltuyayp8hpjxwiv06bzc221k0cwwkt7euohmicrj8nj8wrjxmsa',
                name: 'wws76s12i2peg65ne5rdfp6hyobytdm31eisybb3a29ezi1ywn65piuuqvroyfflhvkllffmbrcn9run3zouzmwiju52vpxs7idihsdv3gbr7q7s7b1g8yg37fh54yk689wabr9x4vn4sb0du46dd2d8rvcugen7zt2gk9jihds1gla9q0ojrfvso5vqm5iwmuovcdj0f97qn98rmu914h5q0ado4n716mrf170fxmoosrl4m4rtqve7qv2jpt8',
                surname: '24xinuexla5310qhmwdra8ul1hyqa1lckyy92hvrak5g5z1lfmlz5717z1fp5amd8ap3qckmla1cyppv9e9rq042ahcnpod9vhg75p1l59seho931kzgqrtcezafluk6sy6q7jfbiis1xjv7lwt35iz3vr52y0v8uz5dp0p4p1ib0zox3ct6ufml0i8trzx7dv4944tihf5rww53t3xym31mk78gtfqm37n0ic5rcr6ki5de7x9l4p4twymixqk',
                email: '1mya936k3njh851xr2loklr5lw38mv5k59kbultfx6v4vqhsav3txet7bujmii2oged8o064fh21nu0nrpl71kp17lyw0vwpyb5nj5d5futno9f62r1vwz0o',
                mobile: 'ytwf5gacurwr8htgzylumt69oxxjsom873x566onm67xkjtv811zlgwu7yrz',
                area: '06rzrlw41d58j6chst74331tf4zu0ux4lavobrebgffe7w0wtv16tpq40hvq2o82thj6pk2neuv0snxw5rn5p4whum1n7rdbdgtx0kgr6g4l8ucvklctqor26csv2dg2dwszd0j7rz4sv4jkxcgjmtavueomk8k7zw43gtz4lfcznk10hyikphhu52m6za4qsbai3oe0e2k6ponov0hntg4o5hv91oohi0x72q37o5hoztf30r4livj7ot6zsst',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'kjgu2my5cu0z22f3pslclg60davsb9aar60sig1rkthf0x37990',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '0bw5vj32ym8nokx3338w',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'dceu1tgu2e7uw0ggk7uwkhfaw7dff8mormsxo8adiov8g9h2r54i099s7auy6p26ttjqu1ah9p8affk8kdxm5x7xat8aorkydgenco2yqtg8hwpjkzr8y2cf24279m3vy99cggx0v3ff8oqe4g767e5vx3hj3yeetlqeno6moklmajf5qnkf3vx7p16lhf867plwdp8cgukrk8c5241b3irxcejiqoj36stmgrby03eok6xj27cfc1qgln7bjjy',
                name: 'b3oudetr1t5dxumqb9ieadc5erp3xy19fbaj9mnzoptdobvatpshst74fg3p7960fzfbk55i6w74pcbfe4db3pxlo08zc8loocwcpzr3j5k4kxax3a856dmtvfx2bgctmlif10m7ssre2sp2qa2wvuv0ewaaazv2arvi75rvebbm6op7t0bknun37wmyj1ysxa6v1kxwxz9aj7xloirnzas3hepn3hwa93l5ff7kv9ddeomk7jmqfivohwrr4go',
                surname: 'glxm7mgja9x1a6m8su3xeha0krso1k0w259rl31rphbdlhdgcv1e1pr29h2mex2k2tmj81sido9664z99khhsf8g1l3g8gn3jnlqqqcptor7eqjlfbb278yjf0ihnvokhf77ylinq1kwh2whvmbl545ishe4n66pb3zoopssy7g9qhiuqmwsp1mzd7ec9orffb5tswhmq7bncuvif2orqsly7b6xtl8i2v1m5n80m1cvizy6hu2vetrewa8kyf7',
                email: 'wek9zj6kfeih83v52w74hrmcoe0jnyiycb80j4bro37nsn8fnged7jp4oqlighxl3jlv9v4px16rag1qeamukvydomi859w1tzjye78vcebpkyxbiy9ajnch',
                mobile: 'z6wlnszz543qnioh52tfnznqf1bk19gq3jik0q23vrtbhe6e0uarkv95v5iu',
                area: 'hc6rdmu7m7d698xyqd1mbu6cab3da2hbs2qn98u8lzqqnrunx4kle43tjegzojmpfsphqa5wttd6ohpv7p4kw7siz8325hitvhwcgi4yvnvjt23t29cju0zlxfhss8vm271fa7y6awb0a9pnw6o5w912rcn8ksqvtgc00ioildf20q3y6akon69ymypomfrybgcrj64xhiz1z2imr1whhiau3i3np5h0is44tzfpmwnijje5z3n3jfzl3bx9kkg',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'a0jyecivgcakm4vvmr1oofz49g03v1bsbpljtj8k3hcu9yfzk8',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'aqymtmtp3u5ly0lp6ndax',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'got3mbtuwcjdfw1f1730165e3r5x62nofb48irqaz2zhd4hdld5e1u2xlelyxf4b17su3jl8nc3o8vyrrng67797n13bqjhcb4qg66d508wzwgmlxsdh7p97beocqmp7vdwum7k71zr68auw6y29d3vl2udotaern4p2ru6x5xytpnmdf5beklt36m6x0zinma9rxvfatbobfeodxlxng9wfxd8utkuw4gqecwfd2qc3an1hmye0t52th51ujgq',
                name: '9haef2jm8xz9005mp95p8ywcpnqmp3lu2w5pu0dj0i504wtddwhppilru372nxe6sn6u8ybjv66ygez7q0n3s6uablmeml061pwexoj5jv42k9lbal8r98rxwq790bfs6l08dckzng1yyiai51zm6dmbglkoh9o8hew0dbj2c0v3ggxag6saelo34v9cp0ae66bgmm5ppum5zgmt90paytedskk0fle9zq21g9jbax2dqgyo39mvn02k1igi1hy',
                surname: '4xpisb717f1s4ukid670igr3vyznhl8y7q0zyi40a6vdg8edarzolbvxptnsw06hjogagampsh9w2oab070skfa0zdzcwsv9bk52sy7lmbdkrkgvs6c9w2alar4z6qii9pyo0zy82x9yvkg3x4gkcqhga3esks6y87xo385dapmd8jd0mesntc4wq7hhwjkqx8kox4hpa85srl5lei301s25wjnsrhwr8jibwismohzhbjzgmqhaxkh8nkpjhwj',
                email: '96xdwojrdwdivnmf24m5ij2n1228xdlvwv6bjjqbx5t9hm5yel7ojocabkpvvr9h0jmonejww449m9v702d65cawgewyjvaz6ieppltmb6hyjjwajm3aw93x',
                mobile: 'nmuhea6nul1x0x92q7ux09p48qlr8vq7ny2kookn3bahai3z4c78sgc4vmem',
                area: 'nde14cl8jykyk7slcs15q41rv8t6pd1ev13l125t05vgnylo7wcesiplasus5r6ecgh84v0wv1mumhyi67j5dswkebzbhck5nxkjnvumcvr0814ovz1o0wnz7hrm9b6ps09ldx6bzano9j70lwdquf0xaul2wrsyra03k56rbqyhid59jb4i8j350un6a4u0c3bjaznbxsdckw2vackdpqemvzyi0gokk2vdg8qumdfjtfz9bo71nrfbmhpb9pi',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'y81hbrwacrrguh4svdppyue4dlwbm26zdj967ge60cycmx9zfo',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '1m55g4zeww2lgkafi6oc',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '2zzvpkynzpnfbdy0cagi9w8tl0a78g8fnhzjskepsjuclotugjwbkhsxn9nrcfkxcoq59xvkuwceedvf1snpn4ghojrrpdebtbe2va4s4urd7lg8jbpytywxm5edxyjppjxj9r6qkw89tzw252yl906ikpl6njnoz0e3sn4qxqzm3df8lwg43jmjvs67x2e65bklij51cwpesvolgmpkpiyauz2ly6yfdlegbikp4exv3dhc9jksai0g3vmvrel4',
                name: 'trmiw6dtb2p0ja7xh7x6x85hcyvy92irl2rh2run3dmfj7vnze5bs9846do3qlcdvoimbxj4iy7m42mrhxt72v71x7pg58kr3wlcozhukjorm4y3hm42ygudh4cguqolp6e7z3x4y0drtt63bs7vpruasjw3jt4i9u04h1darslaca33ie0gwiz7c7aa59reafutcf6heliaj1puzf473hdy63xh3kv20jvgdin26kzgwbxqeog4ek942apj3z5',
                surname: 'q40m26f65gkwvc05bklg86iyla0bn1ol2nxc8jdkl5dykyilfijbv2vfijjcaylk5tcswintr03cp0dn6fz2sdk8etgwqzo9bws9ukijy9peckgaql1uz6xc746fjux6454kipc3hfm6rp81t8sxkumj25nfve5g4q75ww5c7xngvpyze98bvr5iotxqltx0xaagrp4tkgkmpyyylz2nzwabuq6bor2s0h8780wr1xkgtnioorixft4f061bn3y',
                email: '6x81629anmklxdd0s031jdrsh3cmp4tdyem43ws4l4mgi7mofdb0ulayj5cbqjvkh6aoif0har9hliy52zhw3p4tcmfmhrcux7di3pn56ehfboloux0uujq0',
                mobile: '1ym2bmh75l3vg1egdhsz4cg6i7hzn0ov8qjs898vksnx798vvjasyu7ai331',
                area: 'd056pb6c0ch2prcjbdqnigouesvwjtxl6vfnkeue1my5vhx2cvva6wxpmd73qe799889zyg648i5hdb2g3qi83ln3f0p1kkhjlt9ems2zh6c0j6kz5qobc4px2aggplhecnirbvkfd3a629i1f2oixeq90nhaak7b8lgcbo2qymmlm2aaez2ophigfimdmzbg2nx660pg2mgjthjp3mk2oxdy051wj0vgasa85r0dw949yxny0ujrb5hfc0qpof',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'dranrw03pksr2oncahao4jm6pbqe1ak8fl0h68oqhrimh4lpux',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'ybtticn8qprxxufvbaoe',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'ld4t9uqhhx8t2jibc00tevhtn9havy2e5vmrv6m2aqa1ngqaxbeoepbinjdfjbyy3m6tt33ssymtm6lfasqzocrizbn5h3vm1zkpf1wa24ovukhuheyv8yqupz6fi6scuz0mjbf678d4uudpdug9ccl9nq8ehs9vagrzig168n4c7ammhocd1gdqqd8j16q0oid2z76npjg3y8rh9apeys48xkimwuslaavdu1s6tqwd0c31p1i70f6z0bj9wzh',
                name: 'htpo2ammkbs3bj4od4sisk5wdrnhg7gha6tc43lerssom3fbkgpk6fhuy7e7r24cl1mm06c576osfbr68tqqaqbw9vy397hax7rtppaaze2k31taux9etdx5h3ghf3ay41fzwwnbq0i9b5ek3ndmyzntnz6sprfv70szirlg8qlaxdpb7ohb1ge7jl87x3njyh32zbmd9oka0iae5krsg7slrkiow7b0br232nmdp9t0ljacrffr9h6idnhzpwcj',
                surname: 'byjnm9771jyl477gwa0dausyfl57hp0ph6r5duuqw77tscbnpfuo9zml990dnfeosbge9v7bfee8oduqsc61qza1x3px11y2z7p9rndaalqbmh9zzakzecow2qu8juq628669ckejsybiphgctqgask8uerwsvnhds93g9k9o8pr8qj7twz75lu3dtuauv35x420mgzcw1c62zoacq2pkwh7fw8b3789vlpcvlywhm8vykq501txred1nkdvz53',
                email: 'v01e9qqufilrwrc68vy5onndyf0936a9ts688v9czlq9hjmj7p9exxmwmnowx44s53vhxijxg7hhydk9wa23ahfgr8emeyxu609bgwdzmbjkuvkn4giiv4x7',
                mobile: 'n1w1jlsdussanlry2nws2poec3mmvf121tjh5sac45kw5fvfl0bgv55jv9i9',
                area: 'btixn139f17ylpyl0lu9xvrvvg8jv1alws8ckx4f5quvjv3cyvd9izhalr5s9kmmb8qtc2izntap18a9frjwm07si2k1ew3cosa8v4nuuaqz8uls9v18lpjtx09oba8umnie2thi7vmhxb6frb540aejsoog57ygkg8fsnvjrwow4un7rbunyruypov2xhbmlkke8xp645m033m61v3jemtzbzb0j6nyf0nduiqhr4vmednhii6fdnvckotfo3v',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'ameon8h7nrvtjm2z74hml0sqgx66awdash2cqig28triqtua7c',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'cvp64v7u1s2abk61j06k',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '5a4quv043blepgwop4ittf0sbvcwqa1szj7p656zkgrvk7h3pb0epz5lvt3qzzprg2qpzr8zahk5eji8gnuli9uat395fm9kn3z2sfq6ejzdxw8iyzi97oy7tbeodg0qs8kkvddtjo6axesjrebt2tpd58xiq6q97odrivxggc4gelmxbbqrmcmbsor7xh46vpy0w4lb4xyas2mfi7lsf333t55cd7ee7xiux2krrb0z5h0xq3a9ihxfqqp2tyo',
                name: 'gllgqajx4arlk79ybn2674u0gp1f99ltr37abaapccwc1ssq63dgpfxjqbdzhc662z6yshwnvz3mt0ffrlgdlx4rnagvu82fh2dpyijcdpc7gzol1rywqyr74q2flp9jtc0igtjw8x9f3gtvk4qjod9yqpo5dx6y13owbk7qxmt4ow980k58f3ff6nr3ijz67ssx3e8kheqxx7lm4pnolwp1l7n4byzchwu0kvxw12vz9m4mljq73gpmkdki7ra',
                surname: 'k7nevsq5ovqh97i1l0bhy5bv6mzewuwc89dt74irxj7dgs03yfm0k8nnajurpim4pkw340zcx8hm890n3k205uhpxaegxbkzihbl1cgjgeluefh1zcil6sf8oxd4t93ig92592t2pxldb2lmo9ux130aw75olbyer5qxo15z9c5z8ms6pf6iarqlnt0fcmu32spijane1bg6upp3b6af4kh1gptvdnjhadjmpe0mfld9dyg1tw7e8tqt9zg98j53',
                email: 'z5tk1guune3ivfehn0c6589fz8i561q5gpcl04ompjfd344usi3vlcrjyx8fovxhls4t1urkaaibqs9ub2uq0hj8lbohqc42vj6hgs0z2bvn0rhm0hba0unq',
                mobile: 'zza4eugnppj7cutnt8ao4uee22by8aielfxejlfgin7zrh26ln99hty0iol5',
                area: 'l5l5gk2nodds5mxe3u2r97s6enddgva173mydeo0ztp13ij6qrz4vsolhz7hurhwv9wk74gx7pr58lyut9v8ryqr49dj1l7x4x9nnzmlgafm39xm3do56eh4zi7pmoafyy3nlo6kjbi6utq64fgsajsy1nngsgc9aaiyhb61099jyzecqxmo6hzdi4lkc1fnt6073ybg31gl1a4zsxwqyk5r3iw5mxbv1p319eztp7ju83vg42tqwy071tp78x1',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'f8dh8xr76y8xw5pbgqmwl6s4q6sbi5qlzzvnyn5w57ixiekndf',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: '4gje1uyvmyhjrz9395s4',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: '997mce7lpri9a55so7yms5e73azz3opxqhw3bw2dax6g0t9uaxrpi8zg15qv1s4qpl0473f6ox6zxv6gp31detyp2yxye7zlqfcuwpaffqx67h65mgh3q8bc3fspgo7iypehk14d15csovc3n8oh32cnith1h61smf0hf8oz2wzy9sfhk8wyq9g5ohh6mont5j6kqqcpiuh45h71kcklikqlpsztl6dhrbh0dxg03ett8psj35s8vg8otjhx49t',
                name: 'qkkfmza56mt86g50wn4q73mq7cjv99wqmn1mj7oc24l3779e8m5jq9hk7tu9hvj0ocwxcq0jq20necegctcxs1urfg4ma51k1jrh4fly8rgzikby5qqtxkgk7up1jfeizspvuagfjji4xh6c5j6ovfq6r1meusa0qmmtef1v0ma4vyvpzta9dbxz0njinzao9vtr86qsq587dzytuhetsbe9jbv0nx1i82iiewb42h6tl0sng2xbyh8dlvulfjo',
                surname: 'nse0zvijgkyxl0w9lhq3kili3i3p99ygvizt0wscoghn2vptmaml0n94dr1gurjv5eixi9p1obx7li9dnaaslvczxlgdg4s4fd3p4sk99ohj3ub0aunf5lv9v100kpw89es1d893dsani73qdnq8nv3uk94ur06xlb2d6a4zc5bbetiz735nqkjix8pqxgdd1s6hcr5dn6xfzoponf711b9xe133xttir00d8kllppmgb027rkl8fnle24oh6bm',
                email: 'dyiqh1anirt4gszrer30qq9yunau0kkpisn2ajasm09qmzlhn8c9z0urf7ky6p4u07kwdcl4l6ehbhpc819uqhdhhqwkx97p0b0fbxina4fnwyxdjw49vjvqe',
                mobile: 'o2frcnmxs2tf8fa95s2h1mv2s8jf5uj353rynjyxdmv1958i2tj3d687537d',
                area: 'htprk48mp08j8b9lc93yl2nfsrn1gf6blg6914efuiw5m8gcodfyqzw8y632doc36pdjbjz1y8r5shyt6816si6xotrhytjl9adkgq1sh1x4wrt31gmc30j5u5ifm3axzqgcus1ajojf8cg4z3id4yfrfbknfrbmua1lef2im4e4umtvxzvcm4jttoc0us4scd7g8gjeaocswvrjuto6ron1vuxgi0dad8wd69ozx0slkpmmh36v53udxadqy4b',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'iu5poeptgg4dz0mc0pwwlb0zd9vjwi9cubd7r1n4jp93b9bzyl',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'lott4n8zp7karxi2my2y',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'exxmlzziru0ng9mwbufj20nn4xzaql7757du3ylq2x46a0d7ntubny998wy59ercijr68vuqceycmutshmvsdnrozhr6bnr3mhes0dwmh671x0gqcqtp1ajyclbicy5q02i1c8pyn1ktvqrazzoho14toqdadd17di6hwf0t3piqsuoyblrflwqv1p0yqniz5hi4z3rrhherju7xo40eazj2ltxjzjiyuc4gbfz3g22il67b5b85iicyrdqf8l1',
                name: '5lu2yijdwwyfssmj393lv99pcfd6r04fs4xqoyfl3lviltvz62hqc74cokmmyz2b504s9jru8pakiwnthw5o7kgkxbvhmp14f08ifequh3rl1jfwsd01s66pyce7adzkg55j2m1gfcazpkg4lnb7wg0cx3m0g9kstql9ibgzq0tcc9fn6jp1c1misra3r217czyth5mwxbz8fie3tdt8z5mwllyrsbh5rqbilfmfkc2e9j1nst0mvtg6jlm3pg3',
                surname: 'ly0myo0cwbmtqavt92s4j81an6lm8ompavizc5v38ah1v9a7gs9eik4428zyuc6mdsnoo7r9wto83iug8whpio4s7tlq5srccx2b8ypefelw74xp28tstolw5yiia6tl4ip8bst93ar72c06r9rq2ugsnn4yayk5cbnqxwzvvzaeent74qr3ksaktgufv3hx1d8iuk59avi8nj4lm2dz6u0lwfznbt9elbh9vyf2xqhqlcnp645c97qlvaxow3x',
                email: 'f9hgr9qbfx7flgp1m6vne5rv1g99izu6v0ms0exz61u47njenoc3mgihvqxnnqjthfza493p9khd2med21oyf3hpf7de7lsztehgv51sq0i8u0xa0ze1ab2s',
                mobile: 'mwwptn3g3e5eyj3yq7qnmqfyets3yxeu1air2vivjmno6gggjjayuscxxjyik',
                area: 'cluz4uo315grmymw360kwk62vdjgmr81aawgowy57d1yp3gpp68n5393aqrs71cghh48d66k3qubdb79tbeldjr1b1w25ji12rtk98uxcuwn8bin2h7zke9nl2mn4w6yn09nwlk3ugkuqaovlb59n6qg1tw7iqr1ygg3gr1st9taibbi1rbznhjkmbj7zqgp6m47z95xnh4c8lsajt6hihzjfsp7fz47exmvnoljygi3v0vn6tkpmcc22gf1g1o',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '15j2e77koyk1eyq8h3qz2w51oemvio81aac9gfsxmkf3f6wvv1',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'or0eq7x20k8xcalzplj7',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'oyyjoy8qkzzijf4gqzuzpr8i9gyj51ya0yjrklyxfdqf6wys2fmeu2xxoraz0fpn4prnv64kkyd1ymiqt73cy14mb8igfqj9m587cycho32ai52uwuzr7dgkj511l4rw165zo2da0oxp32ex5hzx7gm399gl1n7jx8ystkesqm0iwlx2mjbgi9uzf1u47ec8go65h173tv0awjvm20afaqjeuxn514n1i4bs8sra1bt5t93tu68cta6i35unwwj',
                name: '43kdisfz3z2qzbucf09mfxlfr0780l60gt8ocwnhqvrixjxm67s49ixtzpbp39mh4mqrt0e1dv12sdg7ka2xoh7opn6nna7n7x2scvu535me9rg06mt9u2vqwiwwfb30nmii5n3l1ezrb3ozbdvlelqqbw1c4yk97yx1a84jzca97ka6ueg1whm9vz0qmjnab3ic3n09kvk6pnkxdmka2max0y6ii8q5hop6ri7meqv7udl8y4rmzgyvqthtgv1',
                surname: 'bj2p1yd6gufz77h5r5rh7d3rg8fmzzy2bj3bgfcgh9rhls6o0xmeao19m2nvxgexcyhpkjwpwidvmha7iapveu54oz5nv93hwgjjlkioqsraa5ovsl7q08owd1s2efs07atbdsaq6aseqwz13dkrg5g1m7pp9t3sdlactlglf6c3vy4x90ybi1gz5a58g2qq0wbhsf66tzi1fe8xwovfzf4d9z00cwb7djv3t39z8k3oesydd03gzki4rd6xzg9',
                email: 'd4fcovb7wnx4ygxl2i1v05b2vhgx6lyiss2m2ttpp4wm6dlul0ryklx8s2g89opvljf1m6t40ky92r5y54jvph7tlvjq92q3pw0iub59iyon2y9rihnmoayf',
                mobile: '4lfq1qd1bf7nolzn402968qee9k73usg3bzz1altix09tmponkrjdw18m5br',
                area: '07nwa5s0yr8totuyn9xu0hxoiap7hjdcce6j5bm9fgxalm3wfscbhhqsja29aupgpkmkbh9vb9v3iosdqcwsjeboa9w0kbnycrja279bm5kpeakp4xflqufg5b1dogh6jaruss95a68u9j4qoan505cu3bp9vnfh11vi8uob4zh3vnipk6ercahhdb3ok2o4qohymum1gwv9hj4sh2b79bmapbh0o8q8f6el27mk5fkzqw7fc7674yjxqu2g25qc',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '9jcwtrvgev26nxellcsqww3akay005ttyqs3j90k9vvglagqhr',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'lhqjw5drl8e5obhxca1m',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'u5e9wtwt2oyco3dxnrzmy8uacn7549ghz8b4jvrpjl8z3g8ypqh6z651ngwkihdaxwwyz2dineo9zg4zxpuffclu2hvqeb1hb6bljwsyrz5xacxby5f9dt9v5uein2chxh5bxx1pnjrz5o7z531kkj04qpcj0q39k2x25ezlmzsfc9wulamap3w7eogtomf2a3fxz6ssedsab7hn184kdw8dgokr2dki28ny16lvq48jah2q9pyqjh4c2srua8v',
                name: 'sijab8e7kg1iz7k91wcqluxb5jjszizn1lnqgqc4l9yvhcjqx8c80bmnzwshsikdvz4rcdvd3qrh74zf51b4xu0q1dhcac35osaci9x0gfwcd8q3tngopi1fghmu50b3akepvf524r1i7mytofcueffar047337xs22cnszg3kup7ljmrr53ue9v3cowh5gjkz35o7csfbb6h9wwl3u92k2kewnmvbyyam0hm3pp3722e87q0o40m7qmfkpcdb7',
                surname: 'z9a3oc6iqeubts8mtpllx24kfgoi54d8nl84foq1ocsb4dothqdkee9r63cw590gy7pjo4tlg4g1fm3ut1t4vwzgqnw9wssrwx3w7flqjttm8u9kbsezzx0s18kvda6qd0q1qnysp2itc7lsd5cn5b7fwa86r0uejk3x95qi9nvizjhlneg59fzenwgm59e2zjjmghueffutlmy5bel5gut6163jmuyrzuwqjkh8njse778mn3wonqep4ugp969',
                email: 'awhyfowwgu1lq4nfs0cydwi80pv5jkedcfym7zc50j2n4t0qgqrc1kdk8odgg14oleqcmvccodcjt27pvn5qxinbuhfk70kmn3f24v44tspvzobjsjehzho7',
                mobile: 'ryh6wj0ecp2xudl3nqqh4hz95s9x8q0392m5i8rwuc4r8kivxcyfufo6lei6',
                area: 'e4rbj3esrmpjvyoa6iotza7keraazj8h11ipbgzrufmfq5tps6xrc44aks4h1hw2fcgcs3gx8d2i34oshvzmcy9phwq9rs8k26cfljsv05hgj3et883n4jr2kvhw4ys17og5cyxuiw0g4zqppqygewwbwqxm4ls3330eonur64rqjth7jlwrsj2rb21u1kk999t5lnykz4bz92eeyq1qd783pmhit0klag3mgv392ug4x27sufcbf5p8869kskd',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '89pxn7kwlfvn9di16i6zngh792aillknjb8sso71by6qlxtomh',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'v4qh85240j5embqrlose',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'zukqjqeud5taumvo9agth5fypvaco9oj366ivua2afu6vjt21dysxswgz8wppen7i0j0g8azb4iswfhhuv86p7e52iupdn07wjkwe4b8jwjwcv55stindzvmq3renbblgx4g4m0vtaoah2w41fyhp92vqujc6puc3b6lza0lk7nsdmy40s1swygvj78o9b8dztzn106up7hfgldab6a204yaqg4rxcdrcq9i0v4etkni5k4vu0rtzdwhcz0lpdv',
                name: 'zppci1i1y1gwtcn0g7i5hdmxy6ry1alziqsxa5kpkmgm8n5gs1j67z66g4i4iucjgjki2wohdqniqtpr2kkkj3q038vm3zh6bwxc4c8w8yahng1piq82impjyjr9g0z4e8znio4ikpr2a4qb9lg8mibrkkgz51du9bv2jxus9ss42a7g3nq73osrl065whvlt7rv1l5ff8b73zq3rqfsyvsflc8f1jx5huvlbe5kl9mnfptn3axgbsd3t67nwz4',
                surname: '5j3x2n1z00m4wyzesh3jxzhkp3d2ttkzs2tso4v26yg51liqad6nyd6vqsqam0ycmoposrayz6r9bxkankrzqi0m9mjad3bg3qw1fq5mluo3q3filu5k0hwdyjiv0y3xym5fojb41ejy34z5y9dmghoaamfm6bybm59v4ztjseoq8j9uv5mjw20p1p06pad09y5uy3fgnesssigmip8wp2lodke3h3shc3i259alansfbvss3tgcgj66s56t9wq',
                email: '5sdvj973b4ao0bz2zfutiu2zsikd23drum9mjtq2yb7yt1swzqmxq1wvwvm6rqbmueq8gqku8qcn4wwm8q2ltdaiv6ya4zrlt1wom9fk3zcfcrw7bd7vykxc',
                mobile: 'm2p9pp57nap0qq0b174m27ifcp3vpvdh26jerjw4doktakoefnu00vafsus3',
                area: 'v3iby9bvy7kdxvo17fkxkg0co0upgewch9ew8xuwimgnj5hheipel8sap2j9tr5oupme3q7hflmrskqvo3861z43xksh07tbxlewm38n847psmsul4egnbir7g0f1di9ibijcjoif02szppx5lk6ueet05ptmymidx4veqko2i4v9qfgsshzvqngiq0a1npu1hw23wbv3cvj3g2x84grbqzlgjvou9u25bcxql7q65ubyslo6204qej68t9prrq',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'x9mry8sinixdk77xd8m13e75eme2xhx9u2hfe4qq3mw1wg0us3',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'jips42x5r3p9phazs1o1',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'oa46yiaxk0apv19wdwr8yfqa33t03anpy706zzbnbrtcy4unawu5c546fw0k7asd84c9hd7uapz15fyy3hwee90ilsyrklgml31rjmkld78znskqerm14kt9dcxannwryw6suxvnxbg912pdwvgxynws7qfxotrqkmmex09hbsfi065aaxj7g19rj7k16xmt39163a2bu122q7hf1he6btplox27fu70y4ya1zne2p4lv2oori8o5jd2xwup5wh',
                name: 'c00v731h7wxinvxk350rez1ik033nyijdvy6tzfy3vz4iwx1ij1dphtx15yg7awgokucmtmiov3k0a32m4yfxgzn315ja3rgyiiz8pof34ofio948vv9qeik84yb92emqv0zkhqfk2jpetiyufigni61ninjbr28si5e4q128qbz86coaoztyg9bou24pl6u7kdyiuru2p57cl83tjog6w7gbaw1soqxymq4prihv3efsg7cpnzag10ukhaxloq',
                surname: '2tn244tyzku5rnukpr3rca3krge5sbd082ipbi51t1bby1rfhjck1fjpifdnocgar5slr0zp1knpytrr5attcc85k3u8qidmx5z7vwuv3bmc3bcwyys37mcapxhs96g1retrkqwuq8y2nex03uhrc3t7y92tp2boq2vvgnms6huj5k2fj33gvth69psrkldr7dxbeki34jiyxaq4li6tiif8l8lupcepcpyk3r1pvw3ien852tj4ug0pgohaosv',
                email: 'oxgpawlrphu7x67q8hb5mep7r7x8uvjdlq18vg48d2g9zw1k3uoza72hn1swxaoyk3dwkknud6g7d9y32m7vqfbnor80kessc5o1kugm975h3mrixuf2h2z5',
                mobile: 'lgbwsdzq4p6i5iw23d0v5tip42h2ovdtslgeaagv3aqjip7zmv5385rr6w35',
                area: 'wsbs3xttepo7b0lv9yvhbc5dctwg5lzdmv7xtphgx2tuy7einl272kyctkxk1gn17yqsj6w43g2bm09cd76r9f6yqebkjj20ilw2y0weim7dvktm101mekd0sv405yed49f3i0a3c03pakg5glh88kn9ur7wefh9qtydwkk1qbx711l4wkupz0t5o53uvyzdakm5nsn9jekpga3f1uh6ogleri33lzpiphr01u7ge97zo9rnp9ak1jt6gptqji1',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: '8zonpfq4qdi3avlfn03p4i4wwuegoh68vk16kicw496cf6rv0v',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'zh4uyvjs9y781jdk77ma',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'yi8276ud2x3t3kbpjzoh7gdk35pn1qfbgbxqxxwfsve27hiu7ac1i9e4891rn93dgeryvprb373u6kjz6z8ryup6ab7uvfx6gkjl90zn0zadc3rahybntqpk076jjvs3aa9ur6x9uaareevh2jtvdh5myqv796rqoqf6dqhr3chq5nxj4c0lo8gs3i0633jbreps3cn5sv6zburr5lyv6vknm066kr37wo7ej8nt1gtvfe2ppwhk57yt6f0bn6r',
                name: 'vyhwtnmpjn8djnurh2u33ec8zujz0x118j8wyyfyozmbywrxsgqvtbkasx5d100z8ts6hnbf0x2cxo5gl1830euma44bm3vc85lxbdu85qjrdoffamfnmk6sa8ivjsqk5lts9gdvppbhz6cj4y3scwqtqz07gb6o18hevn06dis6489sfypogo0p1ygu4qq6vepvyy7w57cfyepw6jetyut4nd6siwxjj6q1qnzm0b5pg0pn87ye636ot236pjm',
                surname: 'ceqzrkle7hchzw3pjprb037jzk7ndfuodsyiqjzgy7na6d8bh9yoj83cbxfqfkr9t67smj1z7anybfxcmv0ywf8roz6r9aa2vpw7lp8tprmu069qw0exkq7pqpsyvoij9d0xon795riv4nw1jxc1box3xnoe59t3dtcrfokthkpc3mglxzdynvnc4yk44m0ghh3wmgre29abv24uu6cvlnk0p2qdc2ir02f3fa561uf4ij3077e9581pl7xbzby',
                email: '4ycy3bny0i2b3kl4ebfoek5s4tptua83ugivhqpvd6dg6uryfgegxkqogjj0vwvp54d8iz3ywhftv8kkklwkw2m6qiy8cleimg9k9ha5n8o8trww02sth1xi',
                mobile: 'mpn6b6h346f7xcejs1rx6wtrqy4cnd7b3t1qq8pi4rcrmzmjnajthkld711s',
                area: 'by2fk5927hafqi3s8fnu5hqavnxw51u4g7u205ma69y5qw13nxw4jf5f6kfaexxfw4nxeecf0cuhtbqi4iorczgwuhvnbk7cm5h770hgab53rts7fz5001441abdq0yd1uei7inh7c86qyipcmbh670r7l05kjm6f8zoazd97p8af4gk6b4rsn88nzsprp4o8j4leboik6vuocot9aowmz3zy8mjigia2ny15uli617whs0jgwtzh3r3b55vy3l',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET cci/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts/paginate')
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

    test(`/REST:GET cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '61db0be8-6fe5-4f1f-a1c3-1b166fcad712'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '232c7673-279e-4755-81ef-0faadd50963d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '232c7673-279e-4755-81ef-0faadd50963d'));
    });

    test(`/REST:GET cci/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/ab03452d-ec6f-4d0b-a5cc-a1f70002f1c4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/232c7673-279e-4755-81ef-0faadd50963d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '232c7673-279e-4755-81ef-0faadd50963d'));
    });

    test(`/REST:GET cci/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '7b793c97-33b3-4b21-9769-e31167548c4a',
                tenantId: '2a7fa866-53da-4a68-96e2-9b539f7df1ee',
                tenantCode: 'vnsdlfzxpq8n6ynrdl2ov33nyi8vof91oqbm49psviwb4rfnks',
                systemId: 'b9792fd9-a7b2-4c2f-af6d-3527c58e7197',
                systemName: 'hxoglvz3q1m3w32oeek2',
                roleId: '12cfef11-139b-4630-82bb-b0e20e520a56',
                roleName: 'yrzubl74q2viwo6fgqih2sqhn9g7jucbshzsmiznc7t0hpxipdglyiext9b9cegmn016kwax7dm1ualx1om6lytayk359asphdhpr8pfkue6vu1rudr3oh5tcyap4gyfgkon7cqog43xhaly2klhvawc94sks5mo737alon0wdzhd8zhr0751w52g7ul3ni0mcg1s50y263vvg6ex9co9iuwraovhxcle3kp9pw9nlc0wvhu2ro5mpvljg7kbx8',
                name: 's1dnnw8py3mhkcftolu4j2uzx4ymhh5noxh3zi8qpqhj8wkea0aztr00lzol3hrwd5ziiywpjf0vvxiqv1zvr5inxqbthxdpkdkkd7jkhvziqb062s0ubvd9wijsq0pqz2gtuz6edcl6qhu6ic8b6i205464bz0nprvxqhbamloi5ymqu949rkrr13zgavaxuf7c3uwaf2tnu0q6vdtcjd6yh0ve8mvsy53vv1e4imqf1zp1eh0bp1sc1sjxl6s',
                surname: 'g4n9rcjg1dhi8fyukapju4dx4z9ereg4pwf90kk1dgvxj1qgvw8go9svs9uq0fsbt8n3i38uue3a02jkbslnp5tz06zxzys2keodm5g2m9e7km2yi3i7963r0v04r4st3is0ib2c2bu6mxgtlqa6y38yjj7o8x5z0qgzxaw37etfme7mcygu2r30smlnjpt3r9aowlo73s9j8g51epgsltfhkkz1k3y3nxjctk6yc4bdjkfa18xwpc2utz9i8ku',
                email: 'om4asv3a9uyay9q7wr3y2b072w4gjb4lrph6n3ryqza613po8aonv1ms760g7b9q7v5vasg030xdnzuhfu5czardeiv2hy63e1moobx8iguyb2yu0i1rec1z',
                mobile: 'dm29dr0e5zk2cebi6aksmby6zuozunmx0lboxugliktzq5ag9ydmrdrvhrhx',
                area: '1swpiag2n88cfoku3nxkyn45o6b65af5br7l693hi8ds9e3fumx2qma9sj3n2cvavp7ic497dhd85xh7lhq12nzp4ryr2g4ccyvma17l7gz68oku292v471m85cobaux6n5t2h3sf5mnquzot7zk9vtvauefy0o0xosxlr6e2axji111ik2l7jr7y8yzjqimu3lrcj50zipa5vh834trztftbyca8aeobjtdyjsazcpxhg5rqfqm2q0onvevc97',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '232c7673-279e-4755-81ef-0faadd50963d',
                tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                tenantCode: 'z1g54j9yu70k6j2kl2cdb956znhycqrz6zlcpdp1cv5er0v4tp',
                systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                systemName: 'bss9mk4lhhkw18nmcmlf',
                roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                roleName: 'cs2a9gsovbkxdq7o64oartrow44fj9p8kkpcnvkwlo8gmh23m8tjak3g4ery8r7d8fd0hflery87ksxgrvhehl97wl5bk5tu4gizl0kxy4luqk3jzpmfaezklfac2acn9s65c59jrpvmgre4wvs1srbaevtszb70vaxlb4cqkqefl2oinb75mpsbaf9qw3t27b9cbxes1ajtm206mz0hbmjk1ntobtwyp38sevzxsrb491j3tiixvt65j9e4hxe',
                name: 'd2744qo8ypaak5lo2w0drwr5rrhjel95r0tiucilr5u8r5uotecj06fno55zob83nks9m67cxgabkuzl0nkivgs09ybnjugn225dl8pwhomb2kmtnk30q76xy02gegrczgfrbelrrpztrv75pxazl5m0po3aq5mkmhbebxrz096e4or3hg0ab2jamdhdt2d3tvkhll4gfn2cc713zbihjik3gwn7clppcrpo6669ww12bh91p29ce222z2zjwnt',
                surname: '8lgxnjuht6i0336rjicewmqj3ukxsbxrhg3enzbp1wn8j5c3f8fxy5f65hbzhw5i2aq4zp8xrzc2u938vxnxiluu5ue7gi58c9gbsktigs5n4yr4zxyoqrtpb1rnhdlwik1pn21a84sxnj6hn4iazf8w8u1mwidnf6x2vcovwj7bd2u2psadob5yto4rlpkhu3y4qjevo0i00au8oeh0t5sxumeaoazjc6onbpbhj091q14d46oz02wudh0ni7d',
                email: 'q9wjvrcfn8f1nc9kqtmxnzngdbqvfobm5iopzmno19sn0mc0i3kw97b8neod5q76yvglymip8g7yevv4s3vd7fiuitl5cn2cfj1ntxgvzisvie9h7rp8mx70',
                mobile: 'js9oee2jawq7elvw6zyeb0hx5cqrxlcpnor99d5myxy4xydhl7e7t99wmxoi',
                area: 'bdo7v8zrtym0ux2xpknk25acgioopac56rudhp1hloulfabrazrav43gl06ns0f4bpvz9k7bz88brlce0k4yet7eycrsbmlsa3z2a6lvn3le1x159asagkkiprzqc4k7leid8h5c56jcnd6er65il2qe4jnmaryg0q9e9hoj9ml2al2lhqkhcc5eub2m0l481k860cly9jnwbayt3ycuxui61rc6ry7w3ezfmat49hp88x2tszm1e56wwu82rtl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '232c7673-279e-4755-81ef-0faadd50963d'));
    });

    test(`/REST:DELETE cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/981c0e8e-a47e-4a84-aee8-890780b2b757')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/232c7673-279e-4755-81ef-0faadd50963d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: 'f4ee6e12-9526-4314-b933-3a0e1c47fce3',
                        tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                        tenantCode: '7ied4l4n1095nc6x2omlqaswi2rnb4741bwsceyypmg37sm18e',
                        systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                        systemName: 'xb9zjwljvac8if65peql',
                        roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                        roleName: '2613pyxo74fzmtwexl4l15s8nhlgye5crjxj3rpvco2zrirchsp3qol0myr1fk9lmdpgc95nrjdtocp0vkw12pn38o94uxyvmh7i6v9ybx0uli1qlnhmfmn9lj2b50ndo2taas8uyqgp0vro0td85s64citk2rnm1dziwdqwlnyl3rt6bejn840ohxktasldw557n5ir1ph40mqc4u7cddy0t2n5w27pagfna5wb0edpl52a4af37netrzw3ypv',
                        name: 'qmn8btxs0x9gyy038v90jdg6ju89jtssayd9fontq3eljgbq6kfba3alf4hc8zrxorlwuxpsuw7efp7pbv7cbktzn5xhgh19lcoyjxt6gnvpp6yezae762babdchjhydqvr6yi3z5tucjwdxqvy12efnhkg4n5ttkg1gfawmr1010o1jf2r2wdonlxb34sewmqry1kiado0arsfhsnt2l0qu4t3m40y1d2ri28exmw4gqn4ecfltu135i152p8q',
                        surname: 'w21ao3hookiao8b9362ve2t3yidcgp3dhyk044q5bg7brrgmbl38yxmj7x1qb7b69tn7sopoze1q7f4zxgtei35s3irli2zpdl07614jgdb3x8tkgx8066ybueft37qp0qncodkl4ymbo9pvvyerljheut8jcd9r57dp5bl9d6k1unylwawa6ojf5ok1dls3rui9xkn6295ojy1s9rdf05cliswf35c6rk4clnjo7oyk7wdaq2piv9wcxd316kj',
                        email: '0k06j6jwlhmp29qyytsbc94f39qj1cfr6wfhpsrryh6ggpnzvj92bn6b6ewyu7il52e7b5zo6nt7hu8z13mx2w2o61ofk88r403luejsqcuyc67x5opdyzqt',
                        mobile: '2o96oz4teiuhq5x9pzzd965fkefn2jegatbpfdxbw8hs0izb973v6s2rbey2',
                        area: 'e6b1y350zr9su05xy94okiw5t86zs2q97pkeku4ofgozjz0h7h0orb9ypps1mlsaeac2ihqfeynl3uy1luzjnf7mg0qjv7fvxlcxppwob5ql17h6n5qylqxkitht9u0avz8zr1xv61aoggrmuuq8eaegobcd4256219bl9z0bbmma7n619vwuy9p4afqj67eisvo9e37c02rsqlicfiefy67bisbwqmru90fpkdzfgfza3lex2klpvvsbl6zoi3',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateContact).toHaveProperty('id', 'f4ee6e12-9526-4314-b933-3a0e1c47fce3');
            });
    });

    test(`/GraphQL cciPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '45a5c944-84b3-4b38-a6f5-0ad1c868be60'
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

    test(`/GraphQL cciFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '232c7673-279e-4755-81ef-0faadd50963d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContact.id).toStrictEqual('232c7673-279e-4755-81ef-0faadd50963d');
            });
    });

    test(`/GraphQL cciFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '84d0da7d-64c5-4b59-a276-11c98f7afedd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '232c7673-279e-4755-81ef-0faadd50963d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContactById.id).toStrictEqual('232c7673-279e-4755-81ef-0faadd50963d');
            });
    });

    test(`/GraphQL cciGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetContacts (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'd40dc337-2ac5-4c14-a695-8e608924c8bb',
                        tenantId: 'b400bb9a-6dcc-4086-801d-f6d0454568ba',
                        tenantCode: '4936wqyn7c8ieyeyshua1qxgqp8m8t2z9ic7er3je5woxph3eb',
                        systemId: '5da1298a-826e-4d7e-8d2c-5b22cae79354',
                        systemName: 'rywsogksgcgl7okot7es',
                        roleId: 'a4188177-2bd6-477f-97a2-74001daf0fc5',
                        roleName: 'atdq1n0fhp2imjjoo9l4k7s6noc9cqwprlldeoc1infy5sbfx5lvlad9yysr7yi8rn3971u8fsnig06hhzfah379uzbt7rq1a7dk4i6blbm422d7bro1jt8mok0i4d22i8eypk1823dj2i6aybxtojazw2a2f6ts4lj3fu71qhyv3oi9zi1kqmy3hm29lp7neeer3j5rij49o2vwy1ty3xju7oeyyvp4dsmu9chyf6x64aul3ny0ncqkyfva1ta',
                        name: 'xcsihekn5sx330mhbb7wgr64qjippfdju6e7n4w60cwb511lkpdavpqtj7phs4ut2qdhtqyh7np7yrvp8eh5dfz54c4ontjxqobmeii89q7fl4tir3rx7qqtjf5cpv4xoyeejs5i4143viqonwjnyo9vy9jhx2guxo32ilpopftolx2mnlceotky8vjw585ayav6m1mwnfvfgj4bnh9wskn6e7xhp4uu7q1bzqod28zxin3uo82q9mcokx48732',
                        surname: 'ycmj50ph6z2i470d97qcnnvr2uby75g9mvykbhb7zxecdpd4yerj3spkwf41fxogwhc33ixgk8v4bj89gadvcnk4e93vci4f477ewinppbcb7tqlufhdwy7xnr6v5x2uykxl3c4cjfofuma9sr8lrlx2jjy4fe7e4slxmq7crrecl8291djxszjm5yubusgvksc9eb519jrs18vp2v1pe2wsrxrlx9ch8p448sz00svlfh9v5ae8d4vhf555tlm',
                        email: 'fe5tvpwzgggglgme3gjqmckpdjovme69k0eygxajv7dkl9j4hlu3zvfd4cmagknwt6zsclbt8seeoshg4mvorw8esh0s1bqyspmjryz69dzbclwcbajptl3s',
                        mobile: '13a5j53sa1fs06z1eojjlydrnj7dgzls9tithk80081vg4kn8ufgwvicm5hz',
                        area: 'i8lvlsn0c76nmrbcfc8cph2g7aok9cv5wq6p8nj4nzz12rurlpang5fsjrlrp3cr9b1alhjmtdf565zrzj9q9zvfcztonp1c4nn880kb1t9j3ggs7bt7h9zrpxibmb20xc4k2690vt7wj4m67c4fwr9fuzyv0un2yrm59eftqx6xn0ixtsuhf772f8im9lcyza4j67vgenw4j8n5wfz36ifrxd0zrm6kwl1map3apphc0f7batjkxv2zllauhau',
                        hasConsentEmail: true,
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

    test(`/GraphQL cciUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '232c7673-279e-4755-81ef-0faadd50963d',
                        tenantId: 'a7d9e7a6-a779-4c5b-83b6-3de56452ce47',
                        tenantCode: 'tsxfpl07icwdn1rqpui785x651mcn7cvdj6ay1kva5vunajxp3',
                        systemId: 'e3df8f0f-0fa9-46f0-ba28-d6a0b43c80b3',
                        systemName: 'bsa93o5ldiyl5gbbm7ei',
                        roleId: 'cad771a5-1910-4157-87f7-eb8e744434b7',
                        roleName: '87py51i5qjex4ekq33z6klflda2568od8tm1sa8ojpthk9x1ar6y5dadckxuebtpljykbiqij21s28p5fcsdbk8qo9qfza12ipc0a15bsr3nv3s4q6nk6rg69hg9o4sbgxd1whvnad93m1a43so2ts6lw10scohec9sgu2iwupn6i8jx7epy6eqsjm5tny9akjt4joik7wwy2si103lnr9s1c06zbdr0w2t1ots3sahvlnodes2puldun6quzf9',
                        name: 'aq1rx5fourljkt4f2y0jien9f9fppf4je5yiid44jmz0tvejllym6pnzi2go8t015ylv1mmcf48zdda11z0l71bh0dsqmbg4ls8zeavj2iuccfitfn1qnc5gfobentzeajuwsxnp8erpe011jfcqnhg2f36yzkfzxgrpszj4dsw2r00ah6mmqy0hnoic9juk15hjspt0m28a83ej14utr6bcwdu8w4u721h34ag7rm85ejbae9pjobroq6095h3',
                        surname: '7wuh2pjmurbocmwwsd2evbzp1xsxuniecd4tffosqehyfgioezclplgtu5yirksgkzgwpadn3i5r8rxm4xfvas7ik8b0wwqyq7ugabxwo4gnjobg2quhrh59o5faenwdov521vy5hsti4evvxmx2of79gwi74ecz2ev4gm2mzz3vdtfmvhx86br52ptudtnw4d7r88i4ihfu8w8j1hj6n9lzul550gqbd0q55j0exk7mvlqo9xxdyb99vx34lc8',
                        email: '5dpphkcq98qndsumweu9rrtuugtxxh5quy2qag09uk9mkx4p2g2urxaeiw75ushx2hnq9o74eeqt6qg1u55hiero6fcri0erleyhshmnn0b3wta766gzyxvg',
                        mobile: '82es4y50kulp5u83evje1pid7mvvf02ycp3i3rq62f747x6eyz54eiothv6v',
                        area: 'vzogqanno8dayklfjx6ctqbnm348d5skrmsvfude0xmpngoznrxbmxkbt5mptuf335dq0xkwkrb19mxzniwdmhxmkpf9m5se0crkw56vrdskesdjhbpzqybvnvjeveltp9e18ofgvhm1wrq7sfinajcyucpxtyl9lxqntew6f3l6ejrpgjiao2y5t87ftaqepiim8ynjap6y096zzgwhqyea7e18h88b52oey6toi8logh2rkbpzy0pxyuo4x1i',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateContact.id).toStrictEqual('232c7673-279e-4755-81ef-0faadd50963d');
            });
    });

    test(`/GraphQL cciDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '812b21b3-f3fa-4411-899b-34eea2840002'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '232c7673-279e-4755-81ef-0faadd50963d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteContactById.id).toStrictEqual('232c7673-279e-4755-81ef-0faadd50963d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});