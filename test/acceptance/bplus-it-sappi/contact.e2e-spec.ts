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
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'ori8lbus5ipgehi5gkb4',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'uxvpxfhcfhtl6tzll4r3l3d2to7vtkxx3alnlimf4hu5k4cbx23o0buy8c7lqri1dbnvx9r6y1c20u1le42sb3ir538pj5ppum96mhqr4l20jp9ny1ucvg1352ks4wvye745naotmyxb5h2e1ydnny29blyyf92zbnzb4mvvsv4c92tkj7bs0cq6xaa5l6p5oau0kd7jqy9xd8sdd4xwi8j8l25kkm0tanz1k2386t5dptgqmjco4p4uul511ur',
                name: 'wvp2hdt1xgb7xxs6p0xn7kl4yyguzer6rz3o0cjb0hml1ioxk4vbep6sk2i0gmazj9h5npmbndtczgplzjqynqznu94cgaok6tq7use4k0cyv7pyv007z5h2hf5e0rkz1rm3waotkwd2bikybdwjtov09xx95kujdzna580520o3jw79vui2l9t00pt7xoms9awystjar3odtbh1pmlapnwb22nl8ik6p40s0pzftq4a8l05nlpujwesplv6gsk',
                surname: 'x04srk3hdbkhceqfvb1kd0sfgqbpanasvmtd22wxp0q78o7jsvk8idug15aurnd7hxh1ekh82wdfixl2wjery9x8acyzjah56rloxhzhsuit86v9x9igpk96lsakqiv5vhi4cefm4r4sn301hutp2hmmaomrs275tmexd0v0b9900b4b9kjedwtxtiye9a00m5njur32afgueb3w8j20l2pmqb2t0owoz63njjx12vggcme9esd72z1wi7mm27j',
                email: 'rumwcy4gfom3oxqko3zvut7b9nd5adns1uctcvgmwua30peen42ey1hizbadyksz3pqsl8kchysu2spc8ozizeb4wd8e5ac76q9sdmeeqt7pdh6frx9dwlqw',
                mobile: 'wk1ue9r7lg9diqgri3u76ths1izun064mtg5elm4ief5hqz95paq7m71zwzb',
                area: 'q70skz8s84fv9x3ja3rqdrhyx5c15gyzoflyt86bnzi5l0ggj4tu2n8r48sss62i7ce4oea1keqze3ad7kdwms9bgsr9vkuyvip7541bhmalc24iewkwmolelrtf7ypq8euui7uqks2vlajywmubi38y9rfsg8vkznoubmgtaztl3yotr6sdb7hsga13iov5e8lsf6paynuf52i8parl6j3qi7xs58jujdfaunu6s537opsorxuqq6bputm70gz',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'bivjjvh9o4eh2dnd0nh7',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '0xf589hblho6pc9tmrifgpwo3dw8pmze88rxsc80fy9uclgvsnnv4zjvv136sly3iuv335l0o94fl8uena0dowloixlaxl7abkxvjveo9rwi659tf5pbflfvalsnieun4qrmtpw1r9gaj3ptjv2yvaz6cyby1hwrhb13425cx5ofa9wrqzsrb1eb73s42aeql2lytyr8ezgc910wulvndh1v1zhp6urkwvzp37hifl6ffkx6rw0rz2jun3o7x9u',
                name: 'lkekh9y0xmdk398dm2lb3j2ixoz03xmbm073easj2c1psvow9rvowowu21vdexyi62hcfvvi561rmk5ocdcaygfn4rm32wmftvggf9x9fntopqn64bo85bwusfq8l1a18qj2e9ei9dduxg0c68qyd70klyklsoz4xja4evj0vgtp6x1j5ogw3p0qoj9zmwzb2968avjyuo3keaz6mm49gs81golnu6dt4m6pf8vwm1q4p0rqat265k0qm48ncl3',
                surname: 'h18829wcenu9jh1m6ymodmtxp9p4slcg3s15rmwkuv10vchfgqv6qmtmvv1fcwql9dy60s2wbpak4wzextyi2xl2y0ckuhvptsoyqzxpds8j3q9ynu7v3n9zfjb0ywonzdnqbmvfwy36xkuowpij0qb2u94voh6a1f7f0zhvf41sr3cy4ll3v4nxv66kh5g9kk652951egx9kttngymf2qibzt8s1pchuyrjknczoy4m3ixvk8bdgvthr4e6ma1',
                email: 'as25vojn7mmb9tewccajl30uo0pr7j11pgswtwsqxdwo9nl7s1hojzux5p6a02za3q05nl1ow411xejg5vcndzjahz58w1xoxsfbei3x958ww5gu033o8sas',
                mobile: 'nxl2ondyeqkjlubaj0dlz7x441vdr2kctrbji58e0gqf8li8zsy7a42qnypc',
                area: 'ixh8s6ogxgguvodatzem5r27ep0p654yeomssxqunwmylfwd7nxlmw4iavs0jnyubgrpalghivzm97q0q4pu2fkf2v4qrcq5xi6t0ht3ej8spsxso5qdfdseake765gzxmf32hb4phclhvape9fgcugu1tralez2tdmu9qhxepvautyaqnrn12f820k6zylps17x02ldnrdgqvqikxedfjaaj567rkt7sb4i4e9gtd576p81gtwv4yeljm2fqbi',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: null,
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'qtbc3xfhzh4fyouzi2yv',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'gb8uhyt2bzo2gjp9m4wfvwflkpf8g8kx7xrhkyjufh4wxya27j7f8jp9lvvhfs9cglr3l6lnkx0nrs33zq0tn2kyx2ysr64dpjhyv1vv4lhizilnq9abh3vdvu8nsc8f7bd21celw04fxbjwim122w9uuohxck0781ihmop2dq5iqvo73hl5ckkllsa0l7lq7jozbejpalbcnkv0by3mx9quvimfydrjnc741s856ll7cksq39hqu83k6igen51',
                name: 'xtq7eus7n6ekv7kx5638mvy1nvjnrw0kqt6e9p2u6oqty7rz79ywjt65tj9hwh6vuy1ooqkwsa3a0hzck94h7qrlqr5wq10szjzpnwg8hkw33m2w5jyfs60okmn903pisvv5bgt4bfj0um580rwljkdg0obqz42cnbhod9xojemfk8hfj8uq3aaj1mlh6w4xk2rvosnjfbs533bgdfsuhem9qfh696642ql1qbbxu6uhs4u7g23zwzkvcorgdnl',
                surname: 'zjt3h01qrssfd0xyvwz7509k3dmk2e1wljrwvl4u06ztavrb7l0d01g2p69qtz5gpd7lckw3s13vyhe8pek0f1609mrtn7dcwrn9wugb9c69jhkpw21ndjb1olsli9ypq4q5jk2sndw1y51nj8sxnzw5fdwomx3p82ioch6wbwco78qwt4l23whf4b4ir3b9x6e62joc50bcaz002jvbxokmju5mtgiediqp8h4qubrsyaxkuifgqx9xzfloft1',
                email: '2x5sriz7emhp3ec9c90xn0uvbmraimqa18dlocb3zbj73idcfguaxpatq2ypgfgtec71q1djhsrw0ahwxsekwxrhrxhb7my0eccz3mk44imort1j6iy291v0',
                mobile: 'owrc7d7wfmtusdk8tgthv4hg8ydg4h3etbzys21b506dd8bp2ugf78o5tyo3',
                area: 'p3hlqlc0eyivoimnuh1cqdhqot9tv50gq7ut4jx3efays6dxr9klgnzwa646v1fm18gc7a0maxn7tvbl85lymbfokbqazyfelvd3hqc9hkj2cxh2wyh1o8jl68y1rc9d7ak65vsa0vh4d4w0qy31y18s2xj11jbjo0kll849bhg9lxmt6a73l3y218i52afyy0hjjqoth512mxnf1kkmkw5mzopico6recnpvrn5gvlqw1vsk4r90k5qj6a8wxf',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'sycrlhmwg4gttg86426t',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'kh2pu4qdcu6jahns0fuk4qy73ba56lrrwcoca34z3u5lh5ca8f9p1jh7yo0zt8vturzuuibovlwnfrtog0gcw1dda4s4nr16nmf8959q7ymaauyqg25z9aq7ghfdje9ar876yv2ey9fkwn750ivvhmbxlwq771ua8rda95osbyn9ox14ciuzvdu9q65aqsaon7wreyk7dbpgjqlinjx9nlrlklzts6gmh79e6gims3s3sj96ruk8n2ct3sg9p1q',
                name: 'veg0thzj1uzvcpgzwgm9oye7o98y9iwv5doy5m3j6lfmndv8d1byuc9s9rbe6fue1fw2134dd4wlzmgjccdtz5e7qv4uof5qsau5ay620ub5marm61izb962nywgeipn3i6n4fu3mn37yuqpf6als3byfslmlmdquzs5tyj63p00b61d0p3qpbz4ow7hvsduj1rgvbjbfghwa962t15m309m3h7896kh17a0gm1o7bwflkz5qmhezi808j4vv2n',
                surname: 'duv6bojjemh2glcbt0coaqn5y2pfoapa4jacla0pnmk7qyrkt8f2kgyay9ll197ugke6mpvqsgisj3l7m41k0ks2mzdo59kawb6llo4n1bya558ihdob979lq67qwdlwjwpgkc09er6qc3nyd8iel9islqkku2digxld1tnp7zofsc76dk0kwbm2vd76ls37lia8xz6rjj4gpuls813ih93xtmqxzq28v6cucn2cfzth6pqd42478z1fz2bhpb5',
                email: 'i9utw0x50qwo8qj7ic9j0ekkme1suvqitupkoccmaq7l4mwzn3srjvutn3d2yb17iecays05kjadft19k1j2re3v57r5lrad0kvvuaw87vuo3az7n1eujbst',
                mobile: '2omuoclxkba5cnxcamdoj6p5p7fcscd6z9l9mi86r7e4wos04ia2681lefmm',
                area: 'o4nwlir172wpan6qvcxmjz8n28b90a69vk2892nxfgkbiizsldvnwnyglptm6bt4v90w987svzr020mqt2rojch2rwirwb5760od12vhwbe9vibku1l8087i4au184xqnch8xyvi29j92h48ev1lprrg1o51gfy14oz4vomuulss5z6khynbfgeykzaykg0ygmvlm2nrqwdisl6fupqyxbf5zk0jzvyzsdne2dhapz8pqnq80ml8cvzb9z8eaz6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: null,
                systemName: '04igahqmzhdh20456zxs',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '3za7ui6vpl8zb8qyqkwn974s2qb86sy63hvb6qommkadxzxwt9pywugxa5kh34ih2jzfkldj5s23aofk99czx8hn4o10779uqlle6lfqmtkcfvvsvwyt3ve6aeey03u8sdc4pi7zq0hck4dl86fxnnx7c87l2s7bvw0m0uiyvu9rzebs17sdkser11csws9y0qe8co616gkarjkgdcmpqwnv4j8tdjxnrdz1oerr9tk4jwhuo7ls9p1h2wahrxy',
                name: 'xirlm54m5ilnffbdzlku0p62lgy4hi4w4nyaowcbxx7poxqakwtbh8qduqdzjit3do6gv4b36yzjd1dnwrl83rcuemay7zqewikvnojm4sinxw3kt5cs026wtc9v7e1aqzi44xyf0rkv7vst1p5dffxy2lqjph1c99ke6msr6axzwmwridb5zwg4g3e3iev8j0znqzgqdzufdemy8h7ehzedlh6ac3p7csyoc72u6gnplj1bdy0s785yarh1zwf',
                surname: 'b2hby90zk2dxjqyrayunwbip22hfwkpw3wm8aprqlo22xxlnyfh04d1a0j6itmcuaron4w4gr36ewste0gl8e7znfmlzenza9vvih9vqzdbdj2nig4loavi6xgf90aj7jhxuvxprblvo8m7bi2ixx2um11z6ts4ygk2l1yepyo5kxanvniv2br2r039gzv5f1y7zsnu238aye2qe2hc0tcua622rwi0dwjxb4uf4o82yjl3i0qzjob9i4hu8l6x',
                email: 'ktr44wrrexzmzazfli3gxvrwjp4mzhcupxylo2i2rrqgiwr599ux8r7iy1ry817zqy9zat4wfdxusgmy0clhwcfoxq3231fhfntmme9lx4pgy6o3tpa2ffg1',
                mobile: 'wdzoo7dexaa1qnl9ydkob08radni76q8g4m9lt6ssdmnao58untu1k1y2qt8',
                area: '5pz5n47x06j1gey90tm4mb3jgows23lrdrgyozq9l7w754wq1wp1ozl2cufn3nmycztymhcncxxjfy88lf1uwo9x9fzyubhf6b5zbswc9rs7tmpxf9vmvi3tjom48ogottakkkoqhw041ylyqtbqd6sd9r31q4cn7zsqk60cjk8lu6632ax21rpe045tq2vw4xqfzm5xa9rr4fedtfcju9ry0y22p86geb56oaob9v01hj2kn0etjo65rw3q75t',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                
                systemName: 'rjc9937gfngoenxfp8x2',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '9jz2rz1g44la8dj9jbik15cy8294neuompsfi0bvjb7wmu156plsy2wdac8p1sj7eskuwa7cf5pdinw06d35k32l3uhrtac2kzzk9rc6a3glbo4wic97gmykbwu19kzmegfx2a5l5sny11ql8q32dc82zcmohqlafa9uvaobkyjapnbb6tj47m0fwj481m4jpgguv61ko56uebkv1044o13xs2lpxgq5cycub7l53e2755serf0f2wgzk5rl7ly',
                name: 'wqlqkqey0m6k7bqb61rcmdftl8shh8x46ju1cm3tnxegeclc41wcv0v2pnapas2lqsejezhqgtmopg5g2z3cwoplafshmqsdymnikzlt67uc8ksrctl07atj8rizkoqogb2b59rwhzjsci078w11i4yd2ukixbsld39stgrp28cbj5s943l2ojt82h066txcq3kzy7hfjjrmqo39tuiuyovn93eq19cl5cw7n056mogkx706k31415lbg66plw8',
                surname: 'opxadvwawg3mfvrbmv2pzj7s0vet5rkkv2q9g2p68ewpwq55lqloj364ky3p3sgguh0813ro9splvqqeduuqj0ayu8p1j256phbwplcamwy8x0ivi4jkb6iuld9xm9i38rdf4cr33d9jkw13xshazfajjlwberz6epb1p96tt5yuzevnwfnp0kgoh2ccjtd4l8niajtaan4rwr4r6yiykyoxcuit2fvuokhagyeegezh6q2xba1hitejg2qqgha',
                email: 'dplp25tx9fitcii9s99sq0nnczt269tlplhbbho5mrrxi2cf3dzqbg3fl6bi8c67qchkhyglq2lye11s5wxwyw512on3275n0p5s0kw147q8b0d6icj2kjtg',
                mobile: '1oxvadyjxlng1e29cut35khzwtxmme7ukx0lzsmtz21oqd0ewypbulnr257j',
                area: 'gke7otvz140fm0jpmjfnxc1cj8oungpg8y1fbrvg1sgr3sarde81em16vmdrhaaz41hya38ywv6ltihtjpl8xecbwu0o9gov8he08jkuac0904geypvjwxwcqgkjf0u3h7bvurin1wodtimmt1pkpilgd62sbcxsd3pq46n6tstqdgenhy3fb9j7fszq88qpyxud9drso1cggxql9gzjkz5fkbhkvilfny04fw92gbw5191d9cx04ty15nsip3i',
                hasConsentEmail: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: null,
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'br7cwuha0ajkk2nny5wk2qpbfzyk1db24ijmnbttojallc9de00g15lscnp0wnegy1ivtlnli8jl0kpdne5j5sttrfd7ecn0c9q5egjik2f9ghedbh1182mhh1j92b9wmwuqdgqhh5mejkwa9uw37m5qkku64f6307lbj8o63d8nfp0m07lhthid16c7jnp1dk3rkaalfzek13cogegklbvjut9mwvv9hjn4yoxc9f5heto1fwf3jiitiz3997g',
                name: 'ridyognmqlkm87auydjnw7nseo1nbz6qcbb8k78wqfmz77o5hsjggvqrt8zz207hqmqnyal8moqo5focmdyecgjtt3iy93agfdo8csuafssk565nmwigelor3j5uwz44j4nc7qxzncpp1evpq4lf8ipnmketaslqn7nmbrvxkpg0zlf2tgs3f7kkysb1q0tegfpluzgux6sfi9dm7lzb29i4bx7yb1674zhi09qlvtqua08fo8jkn8sne406whi',
                surname: '8nrrqhg5e2ukbtib04ajtu0qpwrj8smswbs6cztel8ds85z2ycpjx1nfrx9dcye7fxknojfp3dlj38y2lole8iupdml9kesycbi30p7ncr90mcw0hqti78cloiaeipjmltmzg2ytqmdaqh12zoogf1ofp4i2702c9d8bhvj0oclroxoyjmn1a1z6c2rwtlg9b7mpeo1fbgi7p6bui1ku7rsphvat3xyjpi2vohco1ru3lwczo6ihj57h716xtyg',
                email: 'xmic7bqoa5nwxibyom98gnufckczj7q4gjgm3yah3699o7ozv7wld8d5es0usl0k779gy0wgkt86zcxw83enmuqbvafmb5fks0fqwgh1z2h1p91otkcromom',
                mobile: 'qr45n4b9xldfkt4b3ctlwrr680p29q4arod3m4l1rcwclnvk60h67mv3irnt',
                area: 'iyl82ks6u9l310ob51g01dhwdpt65ibrv1dxe7eml4bvyfqvlp87l6guuntz2i32dmj53z830mjesavh9gjodpe1lqv04vi0bf8mg4u7w13xa98agzxc26tkmsgoch3kyb9andqi9cksu3sk321sfbcnhw53h9agc8fhqc6wazgj5punfjdd7eexauha278gs8l53is0xw2d1o15du03p21x4zxcnmfrt7bk1yepgn0kg1x2i38q0c2a00tcfvp',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'mdhzij08t0u24oi85dvwd51my8ghf5te4k9d36cdkt4od1l4pt92y3k8hz32xtx2bwi3b7sqij8spj7fnl4a45lxcu7qfedj5wfxkmqjyosb55cso1jsohts86cfhsw78f0epigqiiccjx3ka0o7vc9bhpc9br9wy9rwnstnfkj6j87qmdzu1nsygsvofkqnqxy5v4yneu7tpndop3mtcom8txo3eq4faoicflmtotiy1p2sq1o1d3rk8y5f8xx',
                name: 'q8z48pt14f05hy8722zgu96ipc8uw95du8bctzsrukkd16ehyuy6boiehy8movvjy98bow3166ej1ioe7m8ffxg6c1rqfypi5badaruxbp1b1ut6b5x339rp4bnsj1ckq3pol1yjr6w96eu1a9o8jnaf0wfnq7vm8ql2nbb0p1r3h3pb2k5z3p29nwy9i658cvom3jtw4pb7a08bm9qlo56exeew3v0j2eci4sqz8flp9lks89zs51p682lb0ez',
                surname: 'zuild9y3hhair2433n4ftmf5tnlqduuljkiao6ne3rmefisohsatbs8p09l2d4fgkjdn92myo6uqnz4x95mltceg0bzo952w2w1fn31fsx3vk1ujhvg7y74dd2o0uh6cep0mw54glie29awram2imyapcqdmnn0ydlcuq6lbwj9m8ewwzghwgqq3obl11vzhgrz9583h25bwzjry4rs2hdyyvp372fbysbu1t0sw3rdif7vv8g7unh7usbzsp31',
                email: 'hqvqmijqyj067ldxr2ovy7606tg1z6yfaidjpj7gei0e4lvpzra744f7kja30gb93jkmoty240uj72o6gi31e1i366nfvne2vjdgkj6w7hzpmd95abwxb5ac',
                mobile: 'qqsjhdrkmne7pwbmwugoa63weoshk8yixqab77xsf291rph70bqzu00893cd',
                area: 'b4py7z8gwxjebu9xmhee0fkeech0ej4xydalnv193l6nijnfolzkowjgzr69pqxzul6zbh5ajxi655q92s6z6m448u5q8anec8o2rjwff6jgy0onbu82q5n0gjowebwosl7lc4upuof82yq0vh2tfnee09zpbdfhpfzxo0uhphh0wudednzgc89jna1iyktmzvimz1vuj4cmrtdg62n4b3jluvxxdm5fcdtpsz4ay5zxx9jgmstzc0hbjbepsyv',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'q5lsu6bepnuzb5o4fcvw',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'ely2gu0g531oepqlhubd9d1qgbjmumizi1ppm8e3hcl4lt0j1n4q4eec3sby9jrb2l69n119e7rh3dh5tkdxck2zaz34q7udyzc4imjqayefxmptkyp5oytt7valyp2x7azpw1qsidj44z0oglnsd0iri9h9ropecclvd9twsu5pt2tl0chct5bzuk2r9cweeecmr51ppetro7fklyqhq2o29ggmz5ilcl1go9doxafeeqomblexkg9b2w8mgdk',
                name: null,
                surname: '56xy8s6cv1xxuyk94tqk308ig6u32ikxremj9wmswq7qgm1ptgqkwr3l40rirwpl30u3v0r0pwgs6e8kizpa5onnggj96s7eoyhvqzs3rnnk4uv5ibr9tp9tf7cjscn0de8a7i5q5vua72pnhnxpouu3t4euclvitgl0j06c1vqi0daz9ycc0p9ktiz7f9t05qkjqpohjidequu6p8q8wtrpdhlhpq3crvauvpl93d6jlzf09uz59pwlfy7ff8s',
                email: 't4kftsagyatr5hgzklvu8qi8mug6yvsnb1w25vrk2wwwime5c2vmn9u389h9iph3qiggwu707zlpy2j13lh2r3jrhed32kyu3l6vheuxy3s494j25ylo5kmk',
                mobile: 'i46u5zeb8u6ffvbduoyfn08ty7qwiam7dvsya7muqe6ybeax1ttt0ggcx8b6',
                area: '11609ewpbjsfdr5nn13skurvgebmimf28tb3qa87mnzkyjl564pml1zcaav2k2479w5jpfuop9kqvwd93gswmajjwo0ym3t4z6x0mnkb1oiwkbyzt3ceg70cc3ct4syg6czrg62jpdveqgyolgahletvawkka9iymrp8itasdtq967mo8o12rks3dttbrvtepp1nqqvcmmw9fpk1mvp4pgq43n9idxzwuvkage5ttst4xb4mjb3ptrtbruect2i',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'xf8q2yrlcoxn5rghz7tj',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'g6rm84t13j9gon2d53wmukxivqdd1mx1l8dl8kx8jtpe2z5nkxlyx3e80oapzd268j460z1nocuvomd1mg73f404qcusooj9ggghpghuv75qnsskqai5pux58vcgdrcxwl1otzyp76fpqu74hqeif51cqyb4gyntxors9l6g6kvzb7av5zi67krgnnxfn857qglix6l8yecb0x56quh8kk9vg4r4xotpwwn76aclfowwq7oeh5yu1xajay0xq8r',
                
                surname: '1mkekwz3omu5qq8up3e7sym11t64tacdogax31twykd74uz8n3rebwmgpewfo6023lafsdccqv1rb39dxavjtuj120mq8ny9z5exkcogmfuokywymw0b15knq4ppgt6d5isuw9qjrgoq63efyqxywmmcow2wtosde3nti8e2tjm1p838lb2k41gb5yrei96zby9x71ugl02a1mfc7cbge6wes5jiq80tzxwt55qz8hiw3wnoafi7nz6bdha2qgs',
                email: 'f13f58qra9fl8r6ui8dkm7o6p8tgo27dqbzccbzjl1w5wic8vrlfymboypfb2uhm4ah5lstiy12craxksdjuybxrl42zfhu37meuhajtn97eziyez9wgqsbg',
                mobile: '4jaqj0nvsepp1zwfl1t1z7dmchutdpsdmdh2155lree44edodjzysabl1qq3',
                area: 'wvswyv5w4bs1fzs1ofqrp9bboj13ly0u6kt1anhzjurkslhen91q8da1os1gpxw73gxgqbtnvtj8hh8y0k22038jrs9dpauxhafao9heommi4qco0xexgi67sndih3lppb6qqe5z71n00nm4bcyms892md6gjb0cfwc26d99y56gmklksxth6fyhipzr1c07qbcav9ko6krq6c5cpqe5cqb9cj7g3dje77gsrbxs2dqbdsgipw6dycgbafhct9x',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'ygnyk8nejlcqv7ty4n1c',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'ne7vklg8wqqhtttz87vgl6gi5dnnewd5iqp3hpb29oj5l811ngsk6vwy2r5vvorh8ih9cpn4w9w1cs7oj1nafyjuhb69zejy6202cnpjo7kkwraqi25l71nl89qmbcga06jh1ta9yj14qtnrzorq4uptgzdo7dl139w82r1g2dirlb264caojjsvlttp6daawkk2f6ekguzn86fqryn13gccx6kiw5x5s8itgk949iaxat98ecslmtwdmikgum5',
                name: 'ee7r4w09by7ztcjkw1v1x5s7xx360alo40a9m4xe44hhkinic57907z1ognpo5st2z3pire2jrwy9px17plekiovozuhwspxpzrqis3vurzq2ne3xcrxspbabkmeq4m1kbjocbrcq9jmytqoxz7gmn6my1vc44txu51ed26mudv7dq9m5jwita848b4oudmtjco4x9ytcrii21ld6gxp6k1y8cmhh8me277r34n8bibddfi5punta5nwp0fvk0l',
                surname: 'rgacqgg1nk6f933fthwg485hz9wu599ram6z3ls6thej0mqqyg1c4iysqx5amd0d5lpk9s0n87glu27einh0vjaxowx7qk2l666x0ygcnsxmccx3lx0d8e495jeq42yck0kbgs0mdjf2y3fdwreachw54zzt3eairhqtwki7lcuob0qp1v5psx237l2uc0uh0n626q3tqjb4v3xr524o4rdhh1iz6wulusgct1pd94wwaz7rms0x9ko9qedu2h0',
                email: null,
                mobile: 'djb32jze9im6pp85d9r94b85r4lc6m5zf93yxib08sj67xeqqbf3jfzxvmnd',
                area: '0xz2cjzesy6vbhrwxinjlm55mwqdm4t3on2lo1nc07a2qfz16m0hka594lg6mfbi1japvm1526gk85tglb3lyxqw0fz86bovdq4xyfa13mo4g2w15pv5i17j9wiv2d69uaxcd9nxbv5qvqibex77xfyve6pgmp96887jez6zitabbcw2lc1ubt9c5426y95lvu1ynyyr2u7n8dbasmd689g9citkbnf738gjnoscx8uzxn2vouzati6eaclkms7',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '66plpwb2w1aufw0xpqqy',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '7xmerkdcmqxiurwsb3c73hw0yaz5jnii9yrby0jbrge2i6ood0nw84eux078p467n60vqzxdhvvwb5s8lnzw67czj5o7qspwt4k0z1xipnje13jfh6lf7cpvsv5rjq6l5s1tzanxt0dsmwo1trz5adgb1a075wxr3ti8anblf6tn1naoynms9zr5yz08yp438rjxpm5bz8q3hc96luldru6wlqu4n2xtl585io4hs5uuee9c0rznndks16enihm',
                name: '07l95zv4kuvc6s440ctigue47stnytur9bpjlo80jd0mq0nh4t8szf51oeanxw3tltvxype0iylsnju3l56q1t5fksao9l59u7tq6ekz8l16ci0g6ss03yf129lhn7vusc6ivaeaqef0j0lzgwendx7ck4ztcd7f3u4x9kv2eenfcdh9yfyxxec145od49c7d8gzj58un9k1a5go1gp5csnzrmai4rcb2jpns9lgw7p5ugerosy2orzx0hjlty1',
                surname: 'ed2a6kvcgh0iyh8h6j1ndhjt7nyzkf8a9x90s7jl2lx049v5t1rlk1en6bakjek1ee1wnmmhl7wfuw52gr73p1upfg7f8k689xok1oinuso5xk5tkito1boamz7s45r43qqiwo07tlga6n8kj70nt09k9ny2t4yfbf0n6gjubyd72z8mzkgf4dx8poexi814iru29h2fx0ffafsjuaoqlo7gmbp61c7t9p61jf9wsxt0ivv8hnm0a7lc5epit3u',
                
                mobile: '4ba9jumg3sxt196klyatqd9drpbddcv3d6dfingcg2rv2f7ahp28ddr9l2sm',
                area: '378kiik971x9b31oko2pns3cyrsnv15eou5gou26khju1e0s72pgri7050e4dak8jh5yo7n3yzvgdnrb2gsobbquf5i1mdocxiazgglze2eaupiil78insirhxfbl8btr0ky2ijwlrcnmi6ssv385gnzmrocqezazm237xsasqh7r3y9m10lfq6d0st5tnlmopd65k4q8t6pxgb4zhknqqwuwrije5n2jhwkrbfezn9zx6egofuff7488juqz4o',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'soa4tuldbsz9xrhb942t',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'zr4gtma3o9d0apwuar6ery43u4rcuz75msuul2z8z83nqkxzq1wqrko30rdteso70yzwoa06ehgy5t9gdpckyz5xtumdwm0id6rvkmy2abc0338517qsn1qxgextmdnvmya6fdcmoxhxca3xypm0iu3rddxbd4e8xydlfjrz0hsu18rgr0r77blxh3ncm6duijkwc3b9gu28jir2s9oyz2cplve4r6d4am45s2a4bodplx7vvafcnt1f9wrmt6l',
                name: 'xn1rr6deubwhq16oafok76wuzh1lmvuuqmn314yfzbfemqzp7wp3d8zhovbvgbbaktv5kyl4zcvl9p2d58vndfluquwrms3uoi2fawg4yqp2rnsuszalm2kjw96oj21ei52zy28rr7cmap5hdn0engsy3e0odo0fvc8hek8lxzieedpnzk1vt8jvt89wcy0e4ww4i55ghlhp24z9287a581vv67q1g5kjdfyvga3jj9ztbz5bs0qr7p58p9dc3z',
                surname: '61pyq875x240ns79bkdf2dhxfrtjjs3iob9558e5m1osxz1oq7tmp59t5mr390p3s0m73b5jm9j9f93xmlvkqgikfu3wzfcft84t3hakbyjrnjyj4udbv4hcy2rmghyjba5j10mbz6poo8goqhjss2774i2y43y690nz785a1ydduq9uw53c0cl2xglc56o5j5bdef83fodr0ea2j72c0iw5kf1jk77dq2cjsvrlg3hsx6no9azv0my1jw5wnyr',
                email: 'nlx74xb5s37pkiwx0leo45z0jh2jxaecz778qgl43oi9qrai6hkagpfkmi5jjsxeobejzx4y3leh1lwf5b3tdc1qbh5t1k7i3keing3aow7iezexqr83dnam',
                mobile: 'aqvibu1bk3y79lozlag41pf0yqy4rt5cmzeepl1xlclwrj0yn69b5a6n0q7v',
                area: 'xqvr3t46nk3f0591l16ql2a5c6tmkuaoqru215yvbz7v9qdfg489by2e3in2ohyvmkjoa8z6a4zzphhhs99t57nbrlo0d6ckxuxfxwwinv56n2xr3fqhahdg58yk9xr96qsi1cmkbvmvek8of4fu9wrara11qrt70qhfw0xvn52bw7um0hyvpoh8ff4zlzk8fdwhg6oynk0okkyljnauesqualiw7u5txo32kxgxna5d9p8mudmcoywtbia7rl1',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'nbjju5peogmh3wakzmrn',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'k3scazz9j2hjhu16aqyyyqt1khf2rqcgdxktfe4ronuczk0xrl41jn4zii0anp650j316bqvpn62i61ja3mzsexn2d8w2acbnqpstnhq99x6po75z1m85ja2lj29z7i36mklv4a8sv3qogigqb8yg85nxkjwhqec1ktgf8e1tcj0ysg5g25vh7o7rgwcip9ersv3l053e1p1xvufc4n822dzzl50z50ddqft4ed5z1wvfiffvie8cky2rkr4xea',
                name: 'ig4rl24ry3wqcqsjmfw6acm9a6ke9hhng63ft374t22q212myw3r4c6qtl9qlbkawwowfreaasiac24lqbi1kgm3i0iwg2h5l9lwl6x5xrbjrbx4fq3h6sj0dssvhym00zwgrchot6q6md237pijf5l554bmjv1fm7d8ltchrhhc8u72irnd5x4scz6zuwte9eq5oci0m6s2246p4cq7o4tbfmjegkaeaxgn0hkk6vt33hkj4fkvt44knf2inxr',
                surname: '1adpls5q51cstqcok3n5w0v3dt3cpsnk6z98knk4lmcux8gvn3hs43tptbrdbo9780mgr5zlqakrwt4ypsj8ucokd56ptxrpm89u2sjzegqx166czkftuaz9almnavt1jf5gqzlo24kao8jyt1s93oj2ed4h3ozlv5rjpqon0euo9suyfuu9bjbxq5moktk80mpkzhfy0hbc6p6lxfokq3mzpygj9lr2t0i77wwcehqo1i0nnkpw0u0thto6trv',
                email: '7if2uohl08wcgxr4e2hrd3til18iro0fk9b76gmycvvx1rafc0mzsy311d8on7hipaeixcns8wtwdryh8l6wo91g7xoztih2bueexp66pqqstma0xkv8zt86',
                mobile: 'rx0bs5g300iusugo8o93jripxomrdm0gvb5ux56j4q9bwc7j035bdo7tzw2t',
                area: 'zbxa6ftbgkt1zdeoea9idwp6zlcry3oqw9q0ojdys1u5qrnywd9i6rtlfh3wyv58mh7upz5s88oaekwl1i5lozhtm8yya57rosgv8txhoweqj2eaonecjeb82md118r0njd9p3w1tiv076a9mlnd309vdqdvdzlo84u8xl839fe5hehjoz0n4xo9yyeulidb3xibca4wjsc64qmmtxaegrz0zp3j81zfo6nqijmdjadqpmsg6bvy521gxeyb090',
                
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '4vzwyiqnugs8pvevgfmc',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'zr17jkvkovi94oshvwmg8j6ie2cbqwegw9w2yfdkqrcjz6a4ffsl0wuc4ey3nqwptd7yhjyqkq0ro75y1bt5fd4awzksfc3yagfuj63fx5etpt7xdcvv8692qbonwgpwrxbl8fp555mgz02hcnpttbjylbf0j69vq4rfuhsq0ipbchz4l3wsk7m402e2l13a1rcr3wkhjwcl34i08zzeqvmm5k60rv4zu8h97wrbt8eswwqbkx349nrl0i5002d',
                name: '0vvhbng3u8gtt2og6mb317ptk7gmi0lu1gb1izkgnlhkv58eboia673p81tjo2x182q2gjlhhim4tu9u6hds8x9ffbtp1uky8hvpq2zfa1suy320zc7knxloldtkaercgv4lr30642n8xh6jy5y2t13wo9s2puy156jgrz22mfpo2888c2j2zr18jrfev4fhj5ozrvzpg2n8ku1xo9owvp33q107b2p4jnb0ds6022wq3zlxdyzsqebxiozbx02',
                surname: 'spgpwgu518wq1qjcnsi2mhxrk38ru44tv2gcdrza02zdawl301c5yuyg00500cx6dmfs2bvxus1wzxqbewxk5yxsfw6t6yeilcyds4ty20bqxzw8njinvr6wepigetwanejlosss9r8ggohghdaszr0whsra6zjlngn56wgqa98yoliuz59nsy6z8pp5bs7haignmk9pgxxz1bezu9jzg4rhjlpzuchkpztcipq489vvoixt4mdp8cfxthgohgb',
                email: '7tvhloz98sdxd0ndq6gw2jzs461f1z6llk2c7jec9nrl0xq598nsnull6pfdb51g2mrp8evmbctt8ab4ur49zc2x523br4cv2iwgj914ytfvj23hea3gbnbd',
                mobile: 'zlnp9pb08kuijjkm5kipd2kvxfbji6mrl61mlbyn428zrludrkedv2mlcm23',
                area: 'fmv5k3vkfvdvm62y8oe6d403u2mrceltyv41nbek31a8e9iu6sb6tbdhu4qftmazxbe1fjz73d30o5nszsf0v9d2gx4b3ntpuvdpqvipxey2zyalw0b79vyu01m0iptclv2ipvy7g937gzx8e32x7thsxiolupkyhi3y6f2grk9lp5y4kk5f9xwa1njqt6bmo0db7gbmbx593atnocw8zvkga29aza4w5fqziysypr3694hoo55hwmzib21slpl',
                hasConsentEmail: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'azz2kyypf47gfcvbzy7z',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '9ey40cecl2d1mk0k4cy6gv4kjottjpe9ogj1wfwxfx4zyj3fwr7e7h81r524j4pjqwrjrxsqqp9z34o9xrgrs9a0gw8rcyyoacoud2tk0lp0pb0f5xqtfirwqy2dyq0ry6l7yica6xuruzkctz8lhn0f28vgmlwxjc4q1xlaeo0889uku1nn7im4t05luwkxjlem71va99xhaftj7avawmdhk967ft5f4ii2pu9ezo4z6sfem9ikhaqvgoe5ot1',
                name: 'oc7ok85vzoaf37zfmvz2nizeebnhfs5ohulzbgy4zldclcqkdyk29q38xidhlxf2ey8ql1d0cs8z060gpoe4bem60ojoc6hbnz5tuvgbq8tzn8mjf4oy9cxrzfdlq25euiym6us2oej3a1wqvo9c5mjx6wi7gx4chh1ejvh3st537ddvmkp6s4y35cbqdp5jj8i6q1elss0tac9n8xqd4zxioneyv5566juf8rr7dctxicrgkky6s44x9sxfeth',
                surname: 'e7as1xw9xub27kfnrk4j0iy4bki35lc0gomyybpjz37uymgqvwbbw5pu2ipkpbr7heduf6n6hfuh8y085nxbl5r5n7m3if6sqjipj9oqz1vp23wg1owc1ijx5i9xi95qh9mhwgfq2e1nim0sd9hzmyi3t8azq68q5brry1zyrjevpc3rie60rjrmtnjayewox1l1wz1pxfei3oyyjza0ne4ad3wze203ln54u4guzglx8av9jd7llwgfow30s8q',
                email: 'ug3n9yjr3om6dc3bbsb68ntxc73szhuuka2jeembybpskcoh12vmys74sz59vcb4ad7gi0o8sxo46h4uqyae9hkdgdl30vu6g6u2hmbpb7ww86h0sxmtpy94',
                mobile: 'qxoiv6ppo30hhy1dxchfeuq4b5rlsg6dft97l8n2eixgc3l4xtkcefsyrnxk',
                area: 'boo06tm75frl2k8p2b52dj6k5chuzfluws0n9qwr77gqy2k1qos0yjz2jysiymrrvv2p0okhxicev70v860itbxa17k3vb9tqzfagyg3zejdmgwhf51msa0ug6vhu9jvclo859bn1v1klbqg0gix2dpf8hsm0stcaj5q6g0h9wvnhejixuyz6gqd11r3ufro24yjvitz0l1qnb9f3iupfzdwavlqlvt76qhniyu2r8pk88cm4h81oqcwk30q6yl',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'g6onwqqrk65ip85mkao2',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'gqqjaelbvi8b9ji9wb4c96pqnagnpkjzpmlwf33b7b57jhj0ic6afc80qw0u2mcxk29ey4wco8ze0kwlmk3yg529l5rgmuke77no61ham8ooj0v3c3x24qp21oroeo9d50ab72vq3h66zrd71oovuijcip2w7v7yb6x2fv4can2r848qp6cnrhwuxnwycndjqv5s9eaqg8kufbejmvbk4g63jbjupzm507p1j0y9qkwvg5a5jfhc3qcircln3bp',
                name: 'qox7606tonyphhci57su7hefor15ml3ng66bh8us7pohkohtedo0e81lgkuo2cbkfpftm6ny28x98tuxhggygerwnog81e21f5bxods5vbe1f1h1hhhk2yft41x8uoxwn5k5hozg3fxv0pcefizui5377ycjjy04q2nq7unz36mierxs802vzmagy53ania68pb7nudzhzoxvfom2un8jgch1wgz5x3k9i2fumgq8s332j3x6svqm7d6mgss5t7',
                surname: 'lmmwp0ru3uum0qo554o5h5epwrk39nurdxoytdzc5yau47cfjmndjcb9begd2ngxf9vrjbsgvylnkzm45jv016npddladr43gi2eeguwj83lpi9z9uyb79t62b8vhazjc8rd0sgurrhdwfs7duja1sr3wurxi8sihxgyubdzk0kragoacdza59lmh3lrsnvl3dzi0czzpzucurj09400fcaqlhocwnhr1vztpghvv6bd6ugoaxdg6xhm55p1u2a',
                email: 'to7t1nt8aeacf3ng5wwaafr0r01v1bkybrqpd9wq7s2fyx3fezifofgvbsfi35vt38wcvbszd89praxa994gi0amop2tjyh2q7co3a7vkthi9tgasdpekw9m',
                mobile: 'u7iqv7e77njxvbc4qfxi6mbwdk735eoswwsape8ldrz2os2s3l3pl1ai8n1t',
                area: 'hs6mihhbpmmzfgoc87ad0c0na4mwd9mssc96ppj2wwxsslqr1qw2gy8ai5lsvdb2lch5zthmtds5kbzz12ot2fu3gdc6penwdr6cgj1pyviw6f0ctdwmgute2hjpmblcwrclbhy1vowav4g8nsaucv7g3gebmhwwwhoaqncusylu2yxaob5rc4nx3hst74dcdt7og8k6vqgctgk2c1sgmm62hyg9ttzrtdhe9sc31ux26tpbt3qzomzp9m04j5l',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'fsgktoyuym1b8fg0ay37',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'drl23orc136nqh0uargugm6vo6blqk3uxqsyb79nzaeeoxj01am4eqmz05kqs7bgrls7ymrl1ihynez5a9j0nwqudqzgz16gtphw4c7hduuykqnn7hpm56ki2lv47ctre8wzjpqtextygmlivagqq721qx2y3swuh8ni8sd504eqrg238mkrchvl6q5opvxzkbre2i42py3ttgj5uwrvuyj69h7dgczdoztyso3bcktsxnnh618vh4jyviimxlh',
                name: 'g4slorq91ffa5pphh94vu5355qevh81pc0u1hh96okk4fjn9y3i4mtv7ra48kw9iu072kj76kpftbc9r1gdc2z6oal2mmk5x46mdogbz1sy32hcid7wkqyqlfd3zopye6a71o0dxpotsugtowalgbu784tvkyad81pnjcf511jo4v5z482468eheg5verh7fmn1mu46qgwq3rux2n2tnl6ouzclpezr6qmlub4ssxv6wtykgr29i3v4hshkshzj',
                surname: 'gfq8rf5ynohy54b9nlogahjc23yd2upg3p57qb3rxm1cl7w3skuopfgm6r63s85y2yxi9tdxrej8wexewvt5agwr48ywftr12yyvc8k9u65huhjvg5lbu1p9xbl72cl5zc3hqi8gmf5ua7xainr8xm28gwmullivkaummaa0qx6dfjcxpklx1awwl71irypj0pxleo8u9axtougbsvp2lfrwuasx194tf77291l89iekbe5n0ya700jrtq37e1z',
                email: '3gp01vjdg619jejl2koipdt9c9u8inlihlypkx7gotau5a3at7y96vl67lo44wjpjlpa037mali3ojxf467mqe2ktu8yrbfggodhhgxrykuglh7j2af2iipk',
                mobile: '77jerz0v10qtz3mmn8qi473z3ddkzg49cb5lt0m51bnxyx65cjqgthvqmhsy',
                area: '3dyamo4to8qw4h48qfnfj8n5yvy8udypkru4kv85696xvbffn7vo9i6mvjt7cgb9ig8bizq856iic839ta1frag7wpk8x9jsei4zus470lp9w2qxk8j5eoewcbo57dysrnr53th15tpnr6iacbbtr8g5qj24my56984kjhkwrtg704hv4o6roedzyrgnyhtep72jawmmwsy2u1m4prfgiityq1ub93mk1r4c5rcfhzo6bqy66mw6grr8573u8l0',
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
                id: 'lu1hh1wmfkb30wqnoesirl2navb38qh5ar5va',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '9tl09cxtbmvzt59z44fr',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'u4kcm7wxdopsk4e64pfxsbyj3jgwdctibci3nx7ajo94t005wluquk7hcmkrhp31oojgj72paz2xae8qvvpgqbmiqgwxllsqe5lt1hd7mqwh52j9yghsavv5hnal9sdb16779j890jo0m1400pt3lh4dg4yos4rb5fyt2xst8eyik74ua8wa0msfjcat7c1dw8252koj9fmzf228zapga3pgdab9gd1ksdsgumbe2kc7btpheb70hjzq4tlryqy',
                name: '9mvqh3lk293zv6gwxq7bi5bewro6h7aughedf43zlemsk6dkstf643zhe3dv8h471seotjaqtcbj54o93oej0173ljclvm1i2tq84aib1g9ry19faoe5ad6vbrmitdm5jm8dxuk7vhd8gc971h9gk44unywj00ivrxuom554hoa05s1ykpsuevmldrp83erjd8116yaot1stf9corfqrh2eobqtaus2usmwnb0se8x5qf6r3r6inirbrjvijb9i',
                surname: 'pd027mhd6kbw7cx1jzus7geahomjx384p15cgobnkkp4nygtj0hhun23zmcueohl8iz96aglt7ziyait8xmeotlycjk85bppq8n32tbvx5qjuz22f0j4uxz5f9r97l30ls893lu41wo1pje8gv5drydgfi6td8n10i9zb8d5yptbw93j5kwfddgsz21xx1ns1p3gmaxb6y38ppvlzo3n04ya65r62dcf9c8crk53kyd4pvh37f102njfp4vzqia',
                email: 'yakbhutvh1r04l0wlhrt9yxmehhwu0gl0hm52w8ebiktvfakqahedw8vxx1892pq1lcf15gjkhr6zcq4ei835df646hi491z8m7etz71ykporxv84wh2fqod',
                mobile: 'mwvy1b8bj69lnac1ee9sleq4ozd3kc1m7keojuzgx1uki7f23gx2wxhieqoa',
                area: 'cbi853twc2pa4rejf089cnk3qp2hrefuj3vbkvabjgnsh5fq781yqcfrlzi0yz20newymcok8zjwzxuuabkycnnjf8yq6ywedw7xe5xrzd2i5jghcrqdyelsh7i3yulzcychwxiz2x52a974yrfa71chir9c0d2fdmfz5g1dy4j431b0bv61k8nq6fn18acgum4nfv7y79mpno8xzq1uhg8frof3mmz6vdj25p9ffpefjfaqn2zvp9q1mwe29lb',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '6ffbqyxs3fdnn14pnjtnsfg9yzltp0kzuttzb',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '7lr4h40sw7ult23d6c23',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'bx6u777ka2is774xwn5g2ng0een7k9fa4xeizlwdvzcttacrccpafnhseicsjdvjvohlxyq904v2izgxkmd7fljsiwql69le5n547x9ih703cipyxqzvvn5c8ypvg7n110m8czuy44xge1cgy0fjox1avac3zz7udkct214gq3xa7kwgl8q87nshl51bhgmqrn0hu9dy9828kbo2cdfa86ypop5av3i2t3o4yfzqr75n62uae7qzk7wmly3frx0',
                name: 'p8ba6mjammx6aldub5ogaaihyrpdv12u5tlirv78blf6gf4qw4woe9to0yst68s7jbpq6rookmgicooj57p3kevl6f3r90n9c93uaotwuylrpthhwvznjgjfutjr8iurh5j9tb5uxfj3umoc7bve4aylrc5uks4d7vlwefpx9jgnyihnpnfdtvv51gekdekqa9wvu9bq6otogr5hs9fm7kj3hqdnb4f3v2if8gk4x9wgrtvjqo5m9a4ol6kr7ms',
                surname: '6ghml1pk57fkz4qgskabudyrjqasvfgfqq5a0nfyqsr9gybt69zqr6yfe0m8hzgoy6ruizb29mnt4ut4nzjxseeqg6vjm9s9tg31auiyrfis72v7v1nefqcbmn7adnddcobglgdr63jv41x7ubu1ns7y2mwnrvnwwb93yof30fpnmld681o2jw880xr1e6bngh84becy5ul4xmk4zr3uty4qz93zkl5ic00a06jicw46kykh6ea771m82ygtzhc',
                email: '9aekb0j7phck8gcv8xzpxvumhu2pzbt5cmegdc0vi6i0gww6b7rw7u6nns7cem3br76x7shx4otbgryfys6qvdrwxyna6tv2tvv6lfqmnnzyftbs7d26dz2p',
                mobile: '6rq6zrm595oefclav0sgoyxzubxotya8tr121tsfb009dl009t3tagdc613a',
                area: 'k9ozg07tbvc4b9d03nevefgt7g4kg8c1ruyup8fhon2kjvuwofqno8f6uydtkxz9xqxexrcieolwdrjuxv9bxyp6g51upaujd7g876hhokznfh2vrxrktdtpuzmvf7w71cdj7kxw453ii5yfvtxrbrmcmow2nixvt1imyhrs10ykutsyieud97i1l53vnpwbntin9lj3lif99455a8s09ik7j4dwt0ippjxfgp7ns28pyfexk6gv9uxvp0rpton',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: 'dwe7es4qtqmnmxruujh0yskpqz0v3fooeteh3',
                systemName: 'z1hl09n5fgkbk3twcijo',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '9wqvayl8zsxc2ahq2kk03xli0bfsewx6i15abo6jd3yhtmzknyppiavuim4m1iy2eh36eo1iqwxela60c8v5cinu1vqdw7yaed3m3kct20w9ltcz5yp1bjrvu8mmkan67v0rhqg0522xoz5crw3ohgw5nmscsxie50jua7j2v75jag7iykyzekq6raozvyksnfkqxe7ark2z4bvj8p54sqarxcw400xo2faqzsrddcyddf2bztr8ygwk8pgf51c',
                name: 'eyzdocu60g2bj54r94rvawari7zf9w60qus21q6y4nibkh8r138jz8jdh33eo4h2e73ta2oi9on8vq9e72j846450zcj71ksr3uoranmrmblh384y2jiuhftteien0t3s4x0tlj3se755kj7wn29huxmg5ufurh58vif0gz37q1n0tz6v7dz4k5872uepuknns2dmp2hsoq3x8glhdu4wp5e6q10rkpqra80dwsd7oiag3bqjab4fxh9v95ab1j',
                surname: 'n0c10c6oxy8ti3k6kdp07ya6wbhp6rkctfmb2eq46y6lhw7sc0d4np4wxmuv018gfzmpy535po7t1dil2dm01bp5wrtn584hvc0xltdm6gnxwpiv9bpgsk0o5u7597f2u7byrmahvhqfv0mnin8i8f3mcesf4g1gjyvftzfjpdn50h0hxv26wn03tnv1r23pm41m3ep4camoxr12y4n6rsc6iv3jzkymvezjkwfqb2188ge90rq599wdnchz9za',
                email: 'l38817gldfe4anmoliiah0zwujc9ekn5j4aiu0sk1x40dek2iznuzwwkzmbm46yeevv0c87idfjpsl0lm340zg6943ycfrtjq2l0h16w37kkibx8uy17nf31',
                mobile: '8uzysj31t0hvlovpe1bk3xuo960m7wsihxafklwr84kvwz21rc8892bi3jxo',
                area: 'jguloov2zgh5a62surqzezmulcbiyzt53y3956dma22jsjj7hu9qc8v7hfk1akg9iqsi4s8ybsogqxmu9tc12lawz4cqaug5rmsvqt5amjrm69lihrmggox35df33ayqzl9jasejc8rmi06p3gxorpr0k46b0jvaidolwqxcufdhzxchths6suhtfzy91tv4d8zmneqkzmj6ua9q76auiep8p2gtfd1jkmh5d2l2852zhvktx72odo95le4fu3z',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'snh9wlkwwi5znb2vqp7x',
                roleId: '83h43hh0a902xatpyn6wpoodb2zd17ynoff7s',
                roleName: 'fe5x97ydw9rallo6uh8miyi3h1rhn9y6u8tst2sptwdjgm4011hob7j4motsb8r0ueczviph1tqsdykkhwekdpq815n5te15e9khtc24k6wi8lnfzvn74h6c1527igels1t6sojxlymanipnb5qzyij3am24md6jtgetdzt5g95vwe8i5ef5blqxdow7a4gdurmfoxdcbad3vliyim2bd20nwiiveb1bouri7tlcxle0c4etpj1fe1f2lcvqcd5',
                name: 'p6vhg5cl6buphwxiug4fkjvybfhlk8xg0bzwii7p0tgm7mhd61kkcxa5cxy3m8wlq4pf1ssp4labeh2xxardhxr68bq3rd9517wsq4dwbuutrehzmerw88a4rek71myxyk8ze3nq3q5vmdj6l189sbh28fek5xuep81ge69pbri0juqnmhp0wezcod1q1o20a85u1oxckhiyyuntb261hr4ng50zfce2aj69mvg3zbpgpth5ndwpbeqnrv06qjk',
                surname: '20g1s7wie69qfk6hr554n57pz7i57r9e5e58xdl5jxhhpcbyvhctv5s43qhri28xquuzi9np41jy2tacmuta7lqrm9cl1b6fcrhjiffuwynlxkniugckq249j9kg3limeva19yvencl094vsgrs7vma3x74q71kndteo5p2i0iw68kpav9mxhdshst30pea0aeejokvy3r623hynr051bl115l4an2kkadc3eivd5c2f2yfcw8z2hfcoius0alz',
                email: 'xv6ok25i4ia4t3q7phira1w2zcdncyfj6ii4hqkg2rgvkwh8cgfabrp9rvnzdpshp39mav38x7pwlmdwac8keqmtofd5veofi5hi5xhnmdo4ztrxvklq4lff',
                mobile: 'w9wm81oyfoskuygjjoqz3ek5muswlodlpzyf1x71z3fvslb3dm03i1al5g60',
                area: 'ennoe08w8tjiyi9icnliow7wo47khgxi2bf1o6hnmn0vcalsyg3q7lz2f9v9r00j8l60g35yuyxs6jf6mkve9j68r9h785f3yvizu8wn3aemsh1mdlxnnkg7ipnrlvzsj2o9qnveawix9v4wkxnecuz34lh0qy38gmb0tph74dw7fskdjyk4qpu4io79ad7xlze5ml27o847jh8757fne3s2b669mrmjbi3vrxxv3a5eybqcvujxc1j24hmrw6z',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'unvaa5yua2ybl2kgq6qu9',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'we4sw9ci4tnxfhhkyu4ynf75nbbuhh5jjid3ydc5jukx7uo21a261eb6ol1w3723djx0sypi2879u22e41cav2ryxbk8gyfhh362pz6iora2xlew7wm0sz09yeg2fs7fc4zk8fo9ts2qrowb62ioa9pwb952rnji6416s2hl2tasxkyauzlkae3l1yy10xkbsprca397aypjt3lxkrtvm9r5eytpzfg6t3zr3128w4kagosutawn7b4q1vxrgqa',
                name: 'f3aac38t8rl55gws5mue8ifdzno3stdr00xlsz5hqj1b2nnwi5t4betlzywqs3b8ey17vcboy56ft257of1g81aizrxkdlhrcw71yy37f4iu2c6chw7epz1656jidw54rqt02i2bvwxv8ospo3vw8l7pifoc40atgqji1mxxytz4xq9u741zyc40dvzi3im1uqqjfbjyjowfea835imfjfiw6eo9k7fdn9dm01log7j0fiulj1vash5v21eib7q',
                surname: '6pgxt4d8g2okfcw772lsd7rjhx4ur4dorx60rypgl2n1twuwn59pfgm4c3hl5vk8kx288gcbm2tqbatwlcio9z59338bcurxildr5aulb711alb1iad2255v6n9g52ah58px7b3oguvrgkrkr30sn80gprr9vr307ajmhs8tdofblcxb56m4919klw9vkngmph24ifu1ws78uuvl8wv039ob326svtysj63i3zvbgw53wjyruc7ga34gpszb0n4',
                email: 'kkh0hwzm5nqr1grlxpkdvxktxmzfiuke20bny3dlsfpskbl0gq6j0vdia1j1dtvv1qmjwlbztfia70wrge9tflpuxmdwqk2hih5lrpd9vnik8l7iuab67a3l',
                mobile: '3mp3o77igp9t88fbjhln4cz15gqhwges1fo7iyevv0wfnm9q33l8ziiyo3ou',
                area: 'hff9prv37ezj9meye9pe51ygwwcbx46ucod6o3uo8ff7d3u1azx3ecftik3thl5b289dxfwyu50lf1kys1aq7fb0ix9sgd64ye430czbkzl3glfusqkb2jpcld3f5gbddsb2hhq02zpuzlx3vvsmw3qk0hd4fg0yfeqq921jdh75k05cja2278tqmnkh7omp7rs7gxnyqnnhnqh6s05gelvs22f4ydca3psbdvoz1zks41y1vx2ach3f3gv8wmy',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '597iqdiwqanfuwdnieq5',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'uqo0u9ma543z567cp98zdn9l62zqgldibf8xms4e7hxuuih59xnxmg987eet1u6ylmbd892fsjodsfg9e65k1lzujzldkmakowk43l36qr59tdit9ehz2jtrffkkwjzxjue0f9lx1x57alhh0yz9wh39k9aj770xq9frlgshfq8sl0fevyjjjnmdix3bbsh6y82z5ulqei3a2fz2snbpd7typjxhe1ku7nmj5wekh0syxbplf5l6q78c75tl1gjo',
                name: '3aa3o9bwdw9hd4xl8tx8nz1jr29vtt420nsv2g17nt26nz8mqkilj17jah424ej8nc4xbci3a1scwpfdtsci7cp5sihpsgjtwbj9czum745hscsbkkzhex161ofcmeaodeufctjaxjwx6bdppsygn6633m03grmtiokcwtb6bx6z0wdifihl9xqlnsoj748mtcl5h98c94bal8tqylv1herf8hkscs573hxdsasisgk2rn2x6av871i9zjb1u0z',
                surname: '1jbklqe3dx6gugbwvykgvggq0wglmlb0sikznv8bx9f0egqphxf7h1ayyzo6vufoszuvnoa9tvzjuacfg3n7xz58hve951vuvpooe3l1t7cfccfmvcc7kpwbzy80jqnu8ulyto5gu08iutobzlutrbedru1cy3madktf10masbdm05fuq4n140ofquujk6hxijhwnp2xy2409bfi7oxxndy49z9jvw1ezhci5s066jsv4utggut1ayu90g7a9bl',
                email: '174mt5gysnf14kql26mal9swvma30iaz7z8ofc1xirei7azmercznc55p97l30e5i55gpr15tnpkt1xb700hb7j2xjfs6aon58ydwjgbnlij8w64af37z7of',
                mobile: 'dri5yibm3uk68k0btvu25wca1y3rwhz6oo1e6qcitwuce5nptkn6hdgc7ksd',
                area: 'eemh45so1lje4kki8qarerjq57ulyzzyxa5ke1b9f2a3dd5lwmc12g692pnr4knayvxpk8tmz2u2mb0kyeiuuurg7is7tvvqtl1qssxihg2hg33fd451kkna361yrj42d9qgs2uet53wscycne5whqcs804xs70w7qbh4flbl17y93dne2yvqx1aqy8uzc5yy5xtp1txcbi5lzrsd711cwv33thbsgf5d7hukppd14rzvn2tkh9jgmslrdh2fl6',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'jbuex324x6aygj7fy27b',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'ctgy8qm0w87lz0ibtzyyx9qcbh4jgqhvmvkd50ek34vykkfqfrlzqgcmcq4r1gcwslnxz99btzzmnfeb3lfelem8b7exjmed9e7ed3e1mm6u837nu0yic1w4lp1sy2i1027up4dvc7yz794xg08mlu13iv11113uv5wt6mxorffhh6kbo31tf9gjsyhuuxasql1q1l4bcev477g4a2cmhvyn8118o02khghl72uedxd3dh5kgic37auf86k385v',
                name: 't9otpf7y411mru71ogo2e9fswfv50w2y0iayeybybhg2hv16qfvb0yqyea2oyimc912b212vdh6j1l9asyms7j3r84ud258cgwqa3fvo15fkogj94e0ynwmdbb89wk5x3ekfz0tc6almaj8tnusbu9lol8v35uewkjytht33vkaol15bqn9scjloy4wayt0y7q4wp9l5v1i3l8eygu5alovwfg5gwue7kp6ohlyw4a2oy0w45ssq4ukf7ocryeaj',
                surname: 'puym59az0orr4c9vth9rn3eah0m6mgsgb18z6l8ffcz8pervr93xnnzefl8qgzdeoaq4cbg7ae3aphkomczymp30fajgn4sk15r5dagq1qupzhw2aqtz4600d3xwitb4pfwispyfq6dgpblsev0ksqjv0xvqi018xkbjyi4i349ucqgrj0bbriel8oqzypkzfn8arsc07uydvy2h49sofk3msytlwbk8wq17pm9ba50xr8yus8a2ra432epfrgc',
                email: '8794t5l1la9onuf1u0e2pjmijcgccd3fm3vp1hotd3a3x2rbu5lohsnmgnphhh67r2krf2vd1cpjz6ds5xrxajehkbe9l3rcxnoydn59jazpajnzd25kjn1z',
                mobile: 'zaxol7r7ubj2vg9ovz00w6qi71kr9zby8apa4jk37ghyonjbbp2pf4x5e3fs',
                area: 'qi4qr2uue53j5sztzv2688aptf3ie46wwyw7r6j6hi23x5h7ti1h8lplr33evp9pr583kigpx523gbdlbe50o1wvof3xvgedsh1o842ch6uyln5q1ri95i8njzrqouf2s723he6rd242s923d5himx5538elyhxdcrim29e5lyech0tfet7av6i7762ggmgad3xnfjmaltboa1tue6qbq02ms8wg9qst8w0cp9hfdic3wpjv353fltrhfva7yxi',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'yl8pljkau2vc81hm821m',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 't2vl4ouolwgwrs1gubpeanrhsjjahwj9jefxjs07yhfs2ojez9k9b4p3hqx8dg4mh8jh2v1dffzirjyfhhetjpz6pokbg5xostcaftvz4iufco875znpcs6d35xrqai7f50bt05cc9xycxgjdmw2hoc6w821vo3ve5vg5cln17dkatm7m77kl33pk0kr8uc1eccsqxw19er9tc9ja9gajzs3p5g4keifp3c4fzztb4tvkp3jxr442q10yyrqw2x',
                name: 'f0hiz8ncgxcteu2kpmwwot210vraqp78caun8roh6buo4vvj2qsbgj5ww8izhmqf49bh9sue4n58f6uxt0rjyiy8m53lg9dogv6irb8jvey2zxpwfk0rj8ed6rv9x5v5sx50rou3x3t2idzcvsjhdykhdm8kuogooztsifvqk4lkdbqedfhlxwgnheqlcthgb1p2sf2z8rnxngi1l7ay1zq2k0lb1smkbny97oq1apguqurwiebbtx7xtehyyzs',
                surname: 'l5w23f0c5a7jgxfk9ghkdjha4j9bu5nuu9yulyx8le4jf3tc299g0s6qc3b0x5hkwsrilv8f347uw26oj8s8235jkuqe1kn9npkd3a0ob4pfht2240rihieckx45eih4yyzwoefuvcggdpfget42t3jcnjozfv6xpp34n1rc3kw6ky3yuwzhx5spiofxnln9sg94kyrzl5nhh5bs1p9p7e9ls6s1uyw6j8rabp0abrfoyi5x23xfy1hig49yikrk',
                email: '6d1i2ouyg7hpdlsxipippxvo9gksrcs5bxoktgnkc2wkyuvs3ojopdoy2hk7kv8xfze3jt1rf8oxqit4rs811bwzkde82t7oa3e94jlomheyv92bebepx3i5',
                mobile: 'ufuculc44jj9oi8kqg4o76pjqv6oznylnfm793uzrtdmpbnwkkqwc1wfjq3o',
                area: 'l5nonjcgqun8isohb7fe908jz33iqz8qvrivle3zy6ajf2898gmgnhi35fw36c2n777x6hztkihaq31ve8ktsqigwbcgqmoddthg1enmikeqap88t32mxwr6cl08n9rwhd1pssxrgzx45wjj2hjrok77lwjb063dej1iptlcv4cjqijzgojhgli3tgze801rmu8lthtcuq1vtrn753nywqbip97idmyld9k4xyewgi95sguqvo9p7mf3kfbv994',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '165x1t0t4glppiljfu4c',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'qjatucusfv1on97yvuslbdfbqta6652ljdrk6ocvj4xyrmu0mom7i4kwyc0gaprdaz3xnyt20tn3xtjf8e29gixxqwyqs5v0cv05yv025z6bp78xx6kt2hshteo2srs6obdxcb4h1dh68mtj5yihq71oek7u6n4efcc3nzpl1gnb0fxjxu3plj5kjeqjtvciqg1am4lpdbd4z3ok97ylp08jfs9ew2ub1k50q85m7nz4zcxlss50cpg7tq3wxeu',
                name: 'nji35vxmbnkno80spilr8yyukeyi1xmpgwzpx0qxtwn16obyrl1ygj95zilk2vcdronzl8faq05vmosmwhp7s9tey5kpw58jm4o6zeafpfwiyl9l9j7ajbkkfwtzdoc9fua0n1w5znxg5jkr4ezcd96z1vl1kue1qd68n4b2951lqiyjybl91pz1mmmprubwuytoluzsnlpd1qqiarqwhkos5itdokah5bdfb5dfj0q42ogtmnhwx7r7al2z2pt',
                surname: 'iapqvpbrscvnponlckfhdi2gf19lishgo4b1b9izzllaorohtjm9sfknjaei07m4hfx80hujkp7c6zt73gwthfsc9xi1qgwvwg13c2fw1qrz70z0z39iinz6ygkvgz6cmufrga7w0py4cot943g5vg7x1cmwhk6lvn7pmpdjuf0q4qmed6opztr1dr9jadnium86hu6sf7ovchbz0m5pkczodktg08qq49ufdhleksqexh5nldld0752sdk3nm5',
                email: 'ity89c9yrxrksl9jiz1ssreghhqu9dpr0bm8w9j0y2jlu113bn4izmqypzcdjjt6rv84d1b0ivt32dd1l5celptky0xcyqb9kcql4ku87dnx4g2cp7h5srfym',
                mobile: 'dcjn652oy13lvqoma6638ydt2dzziyb89s5f9xpl0oglgv684gyrm2az6ucn',
                area: 'r2vknky3gqkt5x89vn20q84nbb158uzcg8w5t6tfqk821oarsw02jz8mwo3q1h4ru9r4b4wsxzit9oc1xvdd0e1dop6cshge2s8vbg2338j4falsd2zfieg7bbbtx83w0qth5v0mx8wa2nh4mn0igzjzbixzlg35ix7z0g93r4rsucvek9f6apf7cwiaqajdr86nguwr476kc226h1tyfad3cufw8awijjmbm07iu8nso9ofb8p2b9j9t9txu62',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'aj2icm41sizt0yb0ubtj',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'nyuah2l10ajzuzq1bzq5iojeeqi0rky49t4nnrkksaq5itjujl9ev1wvx898iezmjowvxsz1zsuj9xc5imccksdea1uhadvajffm5xu91pkfkat5t2p23shadad8tww699eio57a21qvihti7ul1oi1chu5ri8f2b5t9u807ztqsz40j7aow22nwrd19gczl1gke8cb3nx11adv0s2ue5kfawfwpruoynv5c88lqdfs2lkxcjylxdnbgb6ff7ic',
                name: 'sp585fdcima7sa3ha9x2vge47njhu0s7acpdvm08uwdxbh73d6mbc2fsrnbdqg0g4pat207vlu1ccca0eeeem8010bp7mivni5inai1pwr6pop0pjszdtfzr00k4j6kryt2n4rq2a3v9kr9y3494do357swhwnlpzl9w4kz6bexibzgtaqs5apf2sgjtw6w9r5dsdaqt7p737iqu790u5owszusp86s68rmcaq902nuac88njww86drviuj17wl',
                surname: 'n9i2rf0dzx8fi86ikhh185yh73sk87vjszrqp53xew92dg36fqu51fl89ugtcvc1eh6wwz22xr7ry2pdqw5c2r72en9fq1m1xs83a8l9kmueadlfya6tgow0jqgpsrhxe0nh2kycwrafsznovp5i2oolias1qm7pz8dikz7j5r58sk5olldgkdqscid2k1f8mphyklwhpl0a16v49s1rize6cmvgg4r2hgl9uybdu7laqhbbd1uisy64yvp7350',
                email: '5o70z0f353k46bbuprvo3c38skj20wp5w3st7z9os6v06g9g8efqu0lsh3gcoamii0wo1pv5gnp86dcpyfvwj7ggntb39i6844c5ros44mp4anm5kig5n5jo',
                mobile: '5v35sq8fozn60wp62xy8ydhuywenr57q2vfnnop8zzphzlwcw6cy4u78orqjd',
                area: 't2l67blqr12sb7r5dol7fkoam5l6mcl4xpi25my4g8jchb53bk2fx6cyuzah1gi6q30kci8k1hsq3q8qm4n1tovi434r7m9c0v5iacf3gvp2iex1cd0ymnfyb923xjsse0wytgdnwxifqv0dq4cb7yziu0kb2k4qqlq4dnaz27o8zuo954nbtjvp5kkxhk2xi3pt1m687sm030ubleiuu48x36nfg5serelwgzjya7zlp8vhl55foaxlrnem0wj',
                hasConsentEmail: false,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '1a5ee2qazahalgf6exk4',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'aypca6lsk7b8omnx381bm0e0l6fax7n78l6fx4dbzjggg9ba18zab8jjmcr1ie5a6bmop1bdw5bftxx0pt1gb71dy9f97g9znsqgw8boixnwumqjfusoz4gzcpmlq0025uf0qwzw5ni5entwfo4t91fm5gbp0a0qum4e27qjv6ql7sqh5bw96bom0z3ww3w9g1sxvh8syob9ttkx0wvoem9po4lr6w832h0120jt48pw03lc83585l7f8gy34a2',
                name: 'hzavuy6jr9pdw2vprjbsd8prgmmke5csyzc5d2qjfvyzzft0umg50i38ifx7ul7tfh9j5k4i4nlt40pzgcww1zj60arxnyh6bntvjq0yqb18um3zppb7lva72w1c0t6qhze3o3e3z0j3vp8b6b6e0klv23yzq1jj1w4890dg2cg30jb9sy623khx9ypnibswa7tc6qk0tcmr1y1xm1jrx24004y36mrkxgk0act3r8w9z2d33e9dtztmgq94lwh',
                surname: 'd06lim26eu7atds5f3ebc8txpi5u9dxhwdlk95yq76iw7x6v9ja0wtvkbeihrz4hqfc0y3gldepjp4wkld70d7k9ujrusqecj94xdw1iri62p2in9h7ucb1101lbtoplqkh9sk0huidfinfxx1alelmyjptjrhwuyx82l1f68s6p34pr11764apit2fkl9xd4fztt0fpg4c1z2qn7beolovunbqrfbae7v64nxyerwcco9on2llodd0xvlloizb',
                email: 'dvt418ahe1u0ugwjp8r8zx292wtkd4iouhinl8hxt21ojy5dtdhao9in3sy8s4g3ofh3ij87mbsphcgd78lcm6kramrx7lmd576fkt4qp64h8pr01arlkukh',
                mobile: 'yg7e122ge3j6szjwc3i1knoodlma94x03uuub2pei1oh94l9th2xnwdjqiza',
                area: 'dlq84sizgrrhyr38sis2duzeqgg2lir0x2f6vcptdtn7qeutg1mixlm8cx7awm7ztjpmr8s6dxb7v34ykl9hyz443ox0bze3cu61e6dfn4ph3914vay9mh5r2ankou2h9322sxhi47aeemr9anf1te7dyarij94zmzyvzyq1x3skppug8rsagssc19xkpv9aabn9mhyhp7eva04s09y3j8gqayls0yetueob0mqybnd7aup0aym1cvnfxtjt8m79',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '6gi2cv5vliwlsyih4b8o',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '7m5q9herwtbsmuzvkb59iaisw7cj2364pod7j3hcjkah1a1lk4tv71rxebfbg9poecjoqnc5krtwz1ty1ecw59u1ce7l0nat3vezx6yrhsw63n1c1he65e4onfzjkgwwoiln4wl0tyjyhu26hnyznyi7zl7ipt57w3iafnr4j05n2hjpe62fl9i3r7tg25jqwhjmo22r1ylg2p5h0y9e9wzpbg3zs5okgmyssckes306qddbih0mkzcesvdkg2g',
                name: 'eyc3yt6o26epb47nqqb6mh9dbhe765s0twja0swmsn0zal73ubotaqtf9ldx1g367u78vnuzbwpndn5cee1rbcd2smb6nop3zupl33ws6pu11iuk1feihjfsexq4sufefsidl0zzp4u018gjp4urcydcgewfp39kmes5uwpko99ogxfnuwfzojmfdg5qfisdmwfc3pqz8l3o10fb2w6hszhzfi9vsug20rugrr90r6pb0u2lks2urjsk5tc2gku',
                surname: '6rvems687jvm27k7lk98kck5v6c0d2nki3meh29uv5e8bbc9swswz0i0sht80ybmrd2rnpxqohlh9c2pucxh3wv7cs1ykxbg6r3v4raa84mijvbmbg2x5k5ydvu8sy6cv3sbvb0p28oo8py1bo8hyc433j7jspa2sq6tfo95t606t3bimaatnmgmakhqpn3otkw5f7nc516e5srb96q5muohpkucf2flwzua3pv4836fzq7gm2rdp1du9k07mlo',
                email: 'kxe2e0aql14b6vhlajk3hyeq6367jcp1eyjegbxz3xoo833ku47flc04ebk02ln6xs45w3f6zo2gz32mpjgej5zdxjv9clcsy5me21ybyynjrzevxy8mgqmh',
                mobile: 'leiekqh7c78eoewc3mrcbonoeomjyn5ixi68r22x5d3ztmpdteyielvyvbrh',
                area: 'm29t4ucncvnc8ct9s4y6ttkm92zqrtseyaz74uw1e8xf5w94dhe01een3pc37vkumm2cnjxs9c56wfbu4v0iyt1n2bxzi4b2d5hfd48gzzquobdnxawhpdwirccn1ydh27vzfngr2kyxld426d64a7ofvbbcnp2zl4hr3dinnkxz57n3wmvi6nyr9hc7y7wx074ry0a6vhni0fcxdh4ccoqqzcvbc2k6xvzgztksp65w03moh3cmcqtrtuewonz',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'fymktqpll7cfegm1agxq',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'eg5fxcbvv9saxqkyvsp60ponbh8pwvo6qs8o0p59367se1zthn2gmi6kjgg8ylprvu9ighxf24lfw38rj0c19g5uylfbt6iriur7vwnfoucj9p3xjmfwmx233xilj5nhq5uv9ovco9iuypc1ysevnmdk2bv2sl6cqbi4h2zxsdb3frch8vejqu0kq8kn5776od0k6s6npl3zlykqlaskn2i5s15uzmbrozlx6n0mtgjrslqbwqu0kaxbf5kwj1d',
                name: '6zan5qbbt0bte0fmhfkhbcz2i3ufoe48rx17y0d85totx073lk7vfk3699v9w1m9bc4jpen4pssauhv156mdw88h673ipie70ocgnidsmgbub0wv7x5y36j1zkpcw81d01rb82mvbyrs7ogjdc2h1fbe0vygytedstshu5gadefsexln68a1rf5yb5wgle4xb6qomjkx8onlbcatp8yhdc93qrlyvzmgeijbywok2b5sbxfzoyyo6jt2ocd9r1n',
                surname: 'fea3n882ev8p7loyoge44gombfpjt1idgj2o5slre7qxs1aw2sg8eo50rlblmdaw8oguk8vwv6mhhrazge79pd1gwzyng3p3v01e1bw9a38egpfde807dqkpedybzsw3exn04l2xue2nawwtzgbr2iddx2fcdyybwd3atj5yuncrt6by4s2t9eta97fhgcox7edy8so33z2raczpm8yqb3j2ff0zkjx8pqwnebvf2hbfal4r8s5w1ihz4sq5vwj',
                email: 'jupax8t7i7psb6hkq21dvu33pc56rnyay8v6qx8s7evq9y3b20qu00e9kwaexs52yu5om4f89nt53zcrbimcs09yulidsjoo5h6hv0q7ps4ylj38b7dmqmen',
                mobile: 'xve0d1nl8w807pzf7a8xupssipz0exh9syx28ff00tb5hiipa3nsw1fta7e1',
                area: 'saoqqupuiai2jdhov70i1h3lef2gqckh6mbwnz1gljkvzcf3w1xhhfdy4zfczr7mk44xcjsw033kksd9ipqjetlp7gvkwzqg39t890hwkst0ou6nnrzonlb9by6y6uj8hbrldr60u8jh9m408xfnk4brc70u6pw5919clsz7vcrgdsqe8s1go8wy2cmvx97b1z4ltl2yqtzfikbx5z2ow7sg5h2x26dlo53ubuj56t3nnjkl1ote55vptkq4b9h',
                hasConsentEmail: true,
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '01ai8sxu8yfwk99bi7yu',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: 'h2ndsjzxsz87k9znwxycpb8fi34bdvy71qemmle9n30ae9x7u6b9om18vag27h56p4aqqav7ji6prlxvu8a1oigy8n6ly2tsdzbxogfqzx77ab1z3ra3q4t0qkc9h5e581huoiwjsoob79598c0mob9xzh359k974x1bdq857wq05ld28xnhvw6b50y351gosj5f1kvy65p4zmkfjom93ehqdh4xa9dtelt5k77oounms4md5k328ml7u41qw3e',
                name: 'ughyr5d5s1itiqmtin6dgaq7nwum1swe1tmlovfccgkwfkuhapqzsevyxvfciqjh2uh4tod09ph5r9hn5sj8zuvw07a0ifucivhpoyxbyxbsnz0t2vv00yk3nimf6o8hr0osbkc4nezc9v0vhqfnmprewr8l5z6gr31sa6vnh4469ksc0i0y9gzghyrfoo628dvimh6tn7v69rri3uqnrr1gzcr2h6k7an8kc09sctmk4ufrreaest9jwoix60w',
                surname: 'px1an5zduguxay46vs4di9nzyqyw4ex8fn1sy4il0xk31cccpjvl5dkft22yq9gsfab05mhw2hy1j1gvatbh1o1dw3u331yq8lvycslcoo4eocyf7nckgzs9eob14p306edsclv1947ffaeqyxpg9vxx0i81x6732ulccx7j66hal1x8ne4qq5dtnb0s0fq291y6fk3rejabt2l455st6wvq9l4o6qews5x6y5ses5q771m4102vd5tmgv3bna5',
                email: 'gvqo9r8fvq19razotyzs5xsdw41dv44p767xds32g0zssliab0eibgna8wctzvolc4l2czdy2od168btpa2lbnqbqt31ecxkr4vbrpymu1ksu4m06s5pwc2g',
                mobile: 'mpgc9e6b9klgwgbtt5t1089ps0f9rb8y1wxgtr9rsjqth93cebqv41j7q0w2',
                area: 'hrjw8ktrio7jwmvhcdr41ah2wa7k3uq7abygix93mart10ae3j3fet8otm9w2gb4gibmvjmy9uronze43ijudtf7emrk8as99h9v1y0ufj9g2rp6zix9c1ju5jjam69sbcc5icorzc8xyqwvntl4z0kbjo6k74l0pcvrpe4tek3vl42nuny3k97zbtlqacsz5eyqom23glebrt8e7ae0p1b1x43ax6h8iciejuvjna6umk9m98xawzwwlti0muh',
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
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: 'k2a9oizvteon6rnnx008',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '8hwjvf75ecj056iefmq9a50ytui71zvirhkd401anc5y0pukq8egch70y1l6k3ogai0eo0ya0rovc93atns8tsizqos9b53dl3dhnkki0oa77grkd90008dkl6psr0wjdx72m45yjjolo055zcz2wmxhuiikbxtw0t6thsw5ft79rz6ln0el6qd2ruetodtsz0hungknc9fx1524tenhhxabrbnijp7vs785lwojlz1cvdequbvvfk78z5posyr',
                name: 'rii1pr69570cpx2yvx0t6gi3pzeajuksjxjpkodqboixcuxpj5z3vs0hru58hrc8t435c80d33ojrh0vqvjdbukfklsqwss22oha07fj6icoce5znl581hoout5c49r422dtkzm2mff7glqvfdthl5jdvyml7z17nq0fond74uif7c0rul2vebw3r8s115bbahf2iqycl0s6khuhonhs1ezqll5m60h8millhnyst0nimdhjj088d5sz1bkjkgj',
                surname: '8c5acqb8q1c1ri2s7249ehvdg29ehl2enx275d8cssr13ohoz6cb2ghemkns1kqd4j85jsmf191bnlrtjh5kcav0f4jhmhtkghlevm74qj2ax2gck307iuxap82ymrih3l9rxcslprpa5jrs8njw3hutljyun78aftn76sedhuazynxanxpkdvzhsj1v9u7cu7h2hc5v8asgwvcr62u711ucvsfab9bk16csvd0icb1dy39ted9eb8es2a5t7vs',
                email: 'ormq5u7qwurf74st5qiuutkbvdn4mo7ymifhkicxsbl931oonhhe9betf5yeoz7a3djl5y5x925r0vmoy71rmgwh36wsuwz8279a6oztjmk6asibe6qsm8yq',
                mobile: 'dwmu0236j35r2ozjylyyoa3lnurxjw6z6oxrkmt83afu3aic2rylo911zifx',
                area: 'olag0c45vhi0e06qcpnefbvt2cglnh9kp3vu0sehstsai44lqymx9zdyscv8qcccbbtbxcjuskdxx7vzsma0ygm4t5n7t0xemxhkz239vcqn4o5nduefbpqqrdbvp38za6tlp68ub51cdqnoo5tad5kl3q8getjn2qpmeu1u41u6crufrqaz5cmeqdjwqna3zu4rbcoeq9m1dk8coxnvzgagkcez6num5pvbqhr6ht75tkmsgcdqsjvt5bdyz8v',
                hasConsentEmail: false,
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
                        value   : '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '32ec5b5c-16a3-4070-9194-b71ff8e678cb'));
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
            .get('/bplus-it-sappi/contact/32ec5b5c-16a3-4070-9194-b71ff8e678cb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '32ec5b5c-16a3-4070-9194-b71ff8e678cb'));
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
                
                id: 'a7ea0eac-84ae-4309-9124-4d2251ae6cb1',
                tenantId: 'ff6b52fe-5994-46d3-b281-fbcbbe059aef',
                systemId: '8719c234-d60d-463e-86f1-935c0a9bfb36',
                systemName: '50nrcqxivpx17scx06ov',
                roleId: '10ce1510-5584-4d39-b55f-060de4253d0e',
                roleName: 'gltpqnus409txab32txolj67ze4e1u7rrij92q7tw8ntsczdq3oojx5nusufg792v1lhpnmv7s5rusc11iqczhkgo32sddu9kis0i76yjjg3tw17o44foet1v2yq6lwa86yh2x2vi2z3dvar64q48bu0nxyeyfw9wk40j0ogo5ifl3hey6dckft51hskuzapvolv4tby5zpku2nqtpd3d7mtu6tjh8leghxqyt760ygtvny055m81qk76h516gm',
                name: 'cbko1bxigxol7k70v9n0ba7x5booa5xrsc7uqzjtubcqt7ggyd9r7101n5yik3x90dgk3o9cjxbh59fljtj79nzf2p52zcdm8tlwhco42q0zeh1gr5ajhalv69a3cjpo23ynlzoelp1t2xxcyiwy85atgws7ku9mt4b81ijha82ee9961atbi6e5t0lhcev0xktc9z081ctjfbhyn30v00j68y9lo9krybijhbewm81mdg3hvx23dkq4jng3nuu',
                surname: '7om06qeqbly66r3nvwdohgayl9kr9gmhaeyj1n494n0frbiecb0311s3hw1bnf8jz5xo4ak01gf9gjtgz1o41pc6ftawo7pwc7g9jk8h2u01ul13a2a6r35zwxzsx5mdg0xgub8uh6bppx6clh1mrwrkhadx0w1coevplrrkujl6qb3t2c87iyysaruuzpn9tao38p77j3h33b22rr4ws5tubatnb7fojy0t87363coape0x03wkufitna2431e',
                email: '6fcxrrwp1ic7o1i4xdd47v94p4mi6bt8pguoi237qiuno93jca0j6ab1dxqh2qofvq5vkrxs7ivia6x6q523wczzq1ly6s1x1ujgdeukcmurwz1yyhmfvdmj',
                mobile: 'xvjweamqbz3j6i0tu0q0cmucxnqo00ucqj033768y0k0xdjxl3qowm8hi2z6',
                area: 'ufxckwwv78otvdqb94j23shjzn5osq82gmeooz5kbofhjwj0sgq9oy6099dmm26kie76x196p6ywg8rzquwhbg894tg6w9fag0e61ekr6zzryijk3puyxfaitp5b8brg7g0hjcau04r61fj70bcskzc0m63a84ilzr7g41xtu8ub8rg32qp0oz115v1ge53e146mzmzmdrr548wouts0pt2j3hv1s2suvgl1cjgs7kgzt0yi76qedncinxta2va',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                
                id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                systemName: '8ok9aqtwarl70fpb8zq8',
                roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                roleName: '6kcjh4xcpyjpdl2ia3y3ct272t1d7xv7p3s2e4dz54wvjcuv6babi0fusajwvug8ue5apw55g023oipw5wflfc4x1d4c5xvz54edc8i4oen1yxsxpp0wgv0w5yu6nwkvk85vengg0ymmjtts8cidt0ih78y5yowi275klrxch559jz4ghrv9yi9atssy91fkwus5tz2mbkkh2anqovxeb7ftvqbf54x4n1oxvcjq2yrdnrcuhzo3n6m8xh7t6kl',
                name: '2nw7tc9p0tdj0ok5d9vbdasn80kitj31zb0983ilqccsyydmdx167pw17y2fho0n6niypc2voebdaarh5veekepxvddhbm5rdvi4yi9jgjy4l10vl2dcz3vji63tcnbr2tw1ez6axx4rz99jg2z35bavxgj3if4fvymuh51fw1yzz6ob26b4oitk3hvudkm36b6vgg1br0ieg22oowh29u5xyvwmio9f6kghlh5p7tx09yg4744n9tdnj8yhfw3',
                surname: 'btpztqlges18l7d9b2c66f682ja15p2z7xt2ucmkyar6tgqcto2th9e960quna44i3f6yloo11p6dhoj3ga92kkb3r0k02xm3p6thl3h19mjccz6cxr0ntx9v4ve4m8d8l7389hyi0vo7v0fo1o7f035xwlrzlwi8vfqjcj77ab4egpserf8t9t1aepxkv9ls9ghkx4ulif668mkvbtvpjanzgfd907h0og75uqab2hb54acsr4a750sk57hdbz',
                email: 'vlv8sfdift9t7nao49u0gpm3d2k7bjsnwbperqfhwcevjmjattiq8h73jk1bt7z4d119ai85okq8ccwwms4lfhuaztt711v3vw4uyuizrartotu2a1i6vmhn',
                mobile: 'pfxaftjc9rooohuw2euwv6duaheejh3iqry80qzsi15j91ybh3w0qdf5220s',
                area: '82l9v3uc3n2t1gm2u6435bomkgr5flne4zsqp1z6m3rul830yowg2v26fg27u1dp75ju9zac33xwgrruxzph47gra37v3trrdnt33n7juzg0746lpue7a01nkymft3p9x7xeqdibnoplm65itlukyyr1tfb722kwqmxx1boqzxsgdcw3lsg8r20dx4eyk03hcozoor6rnvnoweqnqre2opummqmgmtt9nv7s112hwxzt9ypqfzhkm0oevqx3fkb',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '32ec5b5c-16a3-4070-9194-b71ff8e678cb'));
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
            .delete('/bplus-it-sappi/contact/32ec5b5c-16a3-4070-9194-b71ff8e678cb')
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
                        id: 'ce3fb822-e3b8-4a46-8092-93c19b7a2a16',
                        tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                        systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                        systemName: '7gkuo7sg7bpt28rzzjn1',
                        roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                        roleName: '84v46zdhapf47oeiolgbw1bijr8tc6dukujyr09895gyjm7jp8ylhwn9zw5vtj5g3y7kljswb23ihl050obh9jzn6it31qfcl4esp5jtlizsf1s9indci1nu5p2j9xs685ln5crcesm09eckm4gfsyatic0whmhpxz285aonfzvzveme80mqukaiib7morkah2ch9ku94n42l5pxm52y4vcirrj4kbnadg9ndobgfkyluuarmls2du85btsz6qh',
                        name: 'blk262b8pb1rbyrw4njtdf3ykotbmr1ytneeupg1b6hoj9zexyv87fquprp36kae2j5emvcjklz55hcol08l43uhr6sros1b8bo2g6utfbw7reem67739si8bnso268dkjipwj1fjjsuxwe1br1vkbd2k36lp69y2yc2v1jfewal7mp2pe62t9jile5rkjotttyaq5v75ji8d736hj0vdsyhsli47vr2uhyn62h7wg9m0g00vk5vk4tcmu35o5o',
                        surname: 'ogqwmcgr3u5o5wx8qtqnsowot0y9058q1zxgebzuog3l6ucej6n3ty5ph74ehexkooiefkzl7dm3drh8cat9rmgnlxloh8jeddy5i73cax3x54rbsag3uxicqkrdhklrk2h1qkyfv57zorg9s2jfhqv3dz9edfhog5n8pszga67we2kmoadhwu6yhia1qm3nlxl7iw9sk7yz0ydtteufx58c4xwv7tp43gxwj9aly5f3rgl5bed08isd2jgvzp0',
                        email: 'vwz72hsjdrq2yv53jth3b56ipdgpdo4cezayskhxj4e4gw1rt9n9muqsbbmbjbn6d7p2n36u4r1ennmcfd8c45o895yvpepzllzol8etnu7t4n8el2w82gl7',
                        mobile: 'txq2n7s3dayt7ed99wmpxh8cncuou0ovqcn6p5xk1c0gb93flclu3nwz96x8',
                        area: 'r6boa0ouap7pvmxyll7o39oz5z3vii8n7ejtc3zewjdcy6m3qizh7tebpsuyayx3hyaum0r46zp8hpjh7odvsev1hqsbfzlpmkmtiolualzzq7fv3xznuy2ntjsro13yfxmb3otvy8s2qqeo60xjcvkdvhysfeg122r5kuu81mto8hrgr7sih4tefy8jj8f1dwnpg4gidjlng3gs8461hl5lxll05ne6g76co8e3m0ju3yxdn2nl1wt5kfz22ih',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'ce3fb822-e3b8-4a46-8092-93c19b7a2a16');
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
                            value   : '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('32ec5b5c-16a3-4070-9194-b71ff8e678cb');
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
                    id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('32ec5b5c-16a3-4070-9194-b71ff8e678cb');
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
                        
                        id: '293d3bf3-a481-44c8-87d0-1dba5d6ddb56',
                        tenantId: '77ce1e68-096b-43be-ad7a-44e9680861ef',
                        systemId: '987fd26a-61bd-4bdb-8a92-36ac766fec3c',
                        systemName: '5g1yd7fw1rj2ja9c1mte',
                        roleId: '0a34b50c-4838-4dda-9599-a21c6fae2ab9',
                        roleName: '67c69bg5dhgmvrdfpv53df3xbpkxd34usgqx1rf6vu9trsrmosymdfsdm1xhk52dmrvq55wzofe7hkln0ahjd609hts11dux6xjvop69z6z125f71h1ymdrog5gy5gvlmkv83zg5u9dl8276cj90d6wa98l5nhjkpfzi8oqxqt2zck0xlz4bghpenl31eqqhv6n0rmjvnh1m8m9ist8e6rtnk2y9zbp5hg16xu2od2oxbbc2vykyw6s94rn5tlt',
                        name: '2i4h6hwdqncn5zc8qhn3of0xp7tew8tyqfmxbkc52tfhx5aopf8vobpqzepinbanzfjcs6rvi0bfvjk862ijbkcwqo0bth2fc6u9lg2qctt89uv71geytemwvoveoa1g0ok4bddm5alk2vfu869vl80nwgqpsgwu1mf3ameq28xz8414ttfo6sqhjjcb4n35eo5gz50jdpfwgh0zghhmkygwep7q73jiihmcy91u00bo3kd3407zga8cpz3d1t2',
                        surname: '26ova3me1gfi8l2o3et5khknjr6ktgusq6xkru1k19r71ucrpa6iduei30gyqow4mlv7u3zbusyjjte13fq0lefni46tshpzhehfbat83hla8fuo8m7lcfj04h3n0fytsyop8yd999c918zn7yaeo4854x7daaq6r0p68pxz43dg3thrut5rd9smn6ly3v5mrizdtjj08fm7bstsx3e67655lb2viwnlcc2ycjrnvn0tn3v76z11ei6mt5ynkgf',
                        email: '82q9j14pr0zo5qcn3c8mmpgho4hqwsi3nsd51grt9e5stgh6ayhl2oouqz938guu33e8g1e2b6mnlenlcegg5valw5lfsnfyt3iu6306o7yauiepi1dwdqzd',
                        mobile: '54gbc7t28vi540imj1y4bfunu3cmuskl6bfkztaumwl8nfdj5q2spotsqb4s',
                        area: 'nm3fxlub18ecdm3lomgtglhlf4h4nuznkajr86i1nleppy5t3qdr2n3pkiffu8lw1za4d5s5zwatyxg7j2a1kw0y4ji4r2ajqel4ecclrfb0tdki6vhm4e4p9pdlrwzzzkx6vk10jlmnom7z0nemqb09evz4lojs0hkio9yr5kb1rg4x0fw50p8liyj33em7w4wh8ori04f5ayioqwtw9ufigyk85oz92fl2mv4plcw1huxl47ntnme8ryh4e9u',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
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
                        
                        id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb',
                        tenantId: '31088825-f57c-4fa3-9757-103a534e9206',
                        systemId: '3f34a134-de5e-403f-b00a-95954bf10fa4',
                        systemName: 'dluh9qlmtuv3dyrwg2dw',
                        roleId: '329b2892-f556-451b-8d96-e301f8b7a390',
                        roleName: 'eacuja7vx2x57k3j2cmd67gso4pvhuu6ighkly6phdrz4dalqcknmn98qsms11aoc5m3sjukop62f1rpf95ydmb0dci39kgitydu7jjfwzx0vdb1i5x7ew96osl9gm2vyzs7orhzi5rhycmj06lkklu4cinv9pw8idavziqpm338i0cukbnw3sd0w98850pygyjgteoae2qrr6x86dpypwaqlf7l0m2m3zu7d76jw622x7drx0bp9xqs6i2o2zu',
                        name: '5y9hzfdmbacsz6hsoqq7ee30bekyjgeweubt33ct23cq0mjgyepvfm6xfd61rq0xt9h2ywh24xyj2vzd8tv3f0o448qet88a5948fdy32n8jn10x0ya6qinmaj39sbhgrdtqg3a65fsuo70yach5o50cr5l6e1bbdium8n7iubrp7zomkkyrc3vx759nbms7ntkwz7pcqndazrdcbipzq8bj0sffc9nkdj8jj8n737g0emmy48fx7nuxyihl306',
                        surname: 'tpfpo3b2mpb48f54zvss6dkw0y1yspnub4q7xkvyyhrhmcukyp2p3wxiv40cu1zm5ksm0uaypijbi0tg2piy35qbawxsmisw2d6u4xp62s5bjvsbah85x53agw6c1rzwlcycjzqjx21mtf7f56id4smc28dhz7c5nfr0ftbp7c2sm3sqbik28rb7lcoticy1vpkj8yq7euxwt3e914iaus589wgv89wp0zzfgp6xsxy3wp88th54ejjxwgekc28',
                        email: 'rb9yytp80m27rpbuq3lrpnue5xl2qin47hnnwn8xg6xhkr3655q8goo15rp1kzgyl36gu7ki8ezijlt03f239bv6ph9r50v27sm43n07g2gph5rnz5j7f4mi',
                        mobile: 'x9yefvpfq8tncgorzsa0v6xgk2gjfeeuizp4mryx5p1zdhu2oi1l0k65a1c2',
                        area: 'sbkbvou2iojz413xztzdxqtylhj14wpt7whccre369lgu44hjkiuxgczq8zdn3rkm7v0wi5jmch7n3yqakvhmrd25n5z36efq0b1fsjyd23epjndn0wi31imdxoqjlpbew394pk0hk258bbw6w4l64qebovpx3e60uke44k2pq5ue8wchbdjhyfy2guka0hc89nsa0lz9yf7l2mfxu008sqaguhta13oojn2sayx4lnmrfp0m4j8anzn6fy7qcf',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('32ec5b5c-16a3-4070-9194-b71ff8e678cb');
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
                    id: '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('32ec5b5c-16a3-4070-9194-b71ff8e678cb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});