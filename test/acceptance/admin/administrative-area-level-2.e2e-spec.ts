import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel2Repository)
            .useClass(MockAdministrativeAreaLevel2Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'cp6q0znl',
                customCode: 'itwj18f4z4',
                name: '5vttsnrwhmn6st7xtv9ycwtzzqccvjs5rmzehffd0b85oirppyljy5ffgfdkahr64dnwk3zi35xk7vc35y1bjcnbs6zan7rrafaro2lv33m8nyc7s6d3slne2lw5eka4uatw7iqjcb0exhejb3fjjxgcgxzwpi7699x89eyo4itonzvjkd5rvjm6k7rvgrqwpdlcsyhn9yod64kgtk62rci07rb87awvmu1i16ufreo8z8thjyjlxpqp2bbzi31',
                slug: '4d628gxwp25wziuque5lf87sml4l2gx46r4nzj9tq2vc9vtp5t0kt6c6z4k9pemrsh3darzpv8jbw2hz11ia90wib12ndziee9ci1junahv5nczvrj3d8qdgod02eb7gyiz04kzy3c09be7fmxfjaw1dkzjh0tk9qgcnxcthdbz1ird6rewdl0884j19rujfthd1ag8zjenhfwj3fq0d3ivyci1uw88k0w9lf7nx1kc15q7u34vhitiz2hrh5ys',
                latitude: 817.30,
                longitude: 437.36,
                zoom: 70,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'l4jh165a',
                customCode: '86vzlkkgi3',
                name: 'r0nb8kp2rephe35ere0jvt2ev6z24ls7vtb1jsouq8fngsu71frgtnylif782tmiavcti1ttt92jr3hrhhgoc7jrdb68ez4fe6ryhs5jy71iea4sqfhei5k80juoie3xup8p8ju50ylm2khlc5gu7tt2e3hribkym8wux4bmw4cmcgz5w3oovytat5l83gvnawnhpiud6beslro2hljxkqe4ccky5recu44l2gtjl9h0aw0fmiquu7tzjq1f7bd',
                slug: 'y1urirb7no84jg0uc8kjbfcx2d2uugvfds0mzdgu3a5z0rcruyqnyz2mnbnqryqx59xn7v7cem1ogsgvohe33w36xt1bnr0kf21ff7878h58qp55lmcm3n1227wtel43sm3gk4ynaacotfhudcjn3v1kild7r06mte952sycgasp45fuusgqspb51rq7g61l5ak5jw3cvrx1fxor1vf1r906o87jks8m3l2khfmn3r5hpir6kqe1td71h2jt7y8',
                latitude: 245.13,
                longitude: 401.58,
                zoom: 57,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: null,
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'q9d16nah',
                customCode: '883n4lftg7',
                name: 'kox8z8r8yfczbbe722wmotir4tvyu4wtfw87vhbouzz0blpxj43sx8tukou21elnw7vlkalo6d2p6317w02anyzjfrc5ag5u3p8epbuox0ck2u9peiu8f2379gov5os3zxxxekj8nykrv54j0t8sawy255e2jy6l8rrhernn8w2ng8fin4w95k0qwn1xd51gwa3z06qk6zoqjpjyufaxcwlfef0apsd8ree753wlmfo6mtbq0oku07jc82kbaza',
                slug: 'dbg35ps9owbj1rtjm98kmlc7gpkjjt1xot59efooeruersbmi72570y1khvx1vtxgfwjd860e3apn99i5hg9gdfzi81o3jzj2jghwp4dttmrg89hkv9nkz88h4fo4tr3npl9pa7rxmj17qn8qhq77anec1fnbkefehvp04bsjsr2gsr7zq4jwq7pypatnedx2q5ndxbkic2afyuurrfpibdlmcevexg8jsb0v1dj4odd1r6dnzxsnzqipggdnbh',
                latitude: 294.77,
                longitude: 700.20,
                zoom: 24,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'vft77mbs',
                customCode: '7tqa77ts4h',
                name: '3ngg7nofo3efu1pynfd5gt77pwwmff2fm5vz693gpxn2kc3f9y5a3unh20g70lp3wvuhmhy4f7bvjpfgs0h0j62cmfa74988x7h9v7e2g9kuenxcgdtqqcsy6a3m5g22as9myrqj055pskev7rj82qjyq347mur26lup02gtsqakpzk0gcmc2fwsswxc7fva1qdblfwvvxdum4m9vre09waz1fyj73ba1qeys160nz42oz1nhcwcrc4vshpul7q',
                slug: '04d72cf075ey2nvm6nsw557yxjz7zdxjd4emwz7liivq5dujtb7yg6w8juaz17heg6rrig5cudksg3pp3tkv3cw9gxpqj0ua27q0kq7owutod4iuw6cri5v2fn4in6fmtgpv3eh5mt2tbu1udj4h80gocic4dwxts4ltksds1ifc9caslw0wpgsa4qf7glshupj9sszw7jm4jxcxqikse14pjda49n3invnuqxzgxo4zffbnc3ql09ivkltkh21',
                latitude: 598.16,
                longitude: 552.77,
                zoom: 47,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: null,
                code: 'edzw6x0e',
                customCode: 'fpnqrk3fkq',
                name: '98ilxzjw7uja3yic06y6j7rxi4oppe5m1daoernugpy47wsbn6inn7dci0txis5yxo5dwhxln4bd53vkwwgw537z4hwaf8vb8uibxhaudjyyeh1wgwnlopks44wmzkpz9ximl9nnn242zlwu5d85l9thettvoclmzzginmqebdovg63bafplu4y24eq7abdl16djvsd6nz6vmfgib66g6ydvcqv3f1r3lbo1mq7qcgurx5am55vc7tg8oc6wnsr',
                slug: 'ri6kmwvefk42g8dmpijlo198azdh1gslskyubojz9kvcow4ywysmxn5jj565rq8ptkicg7x4i9z4bzlo8qintft8keb93d2vrb90cmi75xpu129iywgqtsbiglfx0ha66vr19ck8nt1m3mzo4rn1dtpghl2a9ae2n6nla24viafz0ennkjgfkgrc2g7hh3sa52enh849erhm0irdfw2qgxaxd786ts9akafvzfvaevc8g3t48zr92imed9xt3z9',
                latitude: 808.08,
                longitude: 128.25,
                zoom: 63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                
                code: 'hjhxlz04',
                customCode: 'sfnvo3oeh8',
                name: 'qramg3tmo1ewh9t4rgmd9oz2iacujodc6wskvmrk3n7b3f87q2rwz7ujjz9fwzsylsmbj55ta7f96bt4c48tn70a8aoarl4a7asqq6djd13mas5hfi2j1zzedl97brwx6u46jo3gjp9z170s99olab07ipcr0c2qavbl03s6p8kd6ypbjwirmsadaocxw2xpz2g9npeulrrjnyv27b5qtzab6djelw6d5hxh1mkekyup8tft0835n70hi8p7ftd',
                slug: '3gqbu3g9pbnu91slvm0why2u0befjj8dgvsqgjk0c4r0jmiasj0w35zqtettpzy77oi0i4nnsstt4an9j0h1cr145hrimo644m6n7g9t6n20uhu8wfow7yaid1kdozig6p1u2xh2eghkemb2pju5wy9nc7leq52mbvcxizeyzhrpr4azre23f7zqhrca362uhjamcfp0t87flkxs7qi5y4ed735plwz5wqpipqlmdok6pq1xbyiusmlf51166go',
                latitude: 985.48,
                longitude: 796.73,
                zoom: 15,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: null,
                customCode: 'blmrb88v4d',
                name: 'ubz8unodg8ztnth7hegzs1oiorlutzggygl95707rsukeutznzzukl9tvic6a8u0n82imu2s4fb2vhwhseo5cmza4n0kz05ncdxmtr3cex17lhc0idj4kr9488e1yk01xtmvj0qsm4b61kbyzr4y2sv6kdqgch55gscbgoqo3rjo8mck1iaqyzfk40jv1md5b07u6xhuyeq1rymfb96mmijh940rpazn0ma3ffowxzn5xi04yec6x482le8482j',
                slug: 'apmqz9a3q3tpaf6ba31568jkwprz5f6fyayn5qdjv2rbvv23epct79afyqsiu32xu36cportz151x4kwkicfe9i2v39dietvvkhhncnolpzbjleisks8knjeisv5fbe158d6a1fm95g8cp3lgml9l737xwgnyzzhiw7k44a2evvxh4mxpycmjuk91d3nh9iw4o5nbbe2u1xc4nup5k34cbugdv4xfwo122ipk23ue5qt14kkgoqn19q4llj997j',
                latitude: 667.68,
                longitude: 688.83,
                zoom: 92,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                
                customCode: 'qpa2ikha5z',
                name: 'kdpjq25r85yj684vcggvlwhoh0n34aanxmlybh5k7hziifvtyb4mdjqktptctsc6ci1ojw2i4yak9q3gzpsb0usfqtrdarx9041bzzxxc6elgstlpjqscsrryyq5wcpvzl48korsdwvkppruo3mqam8fju119dk607srxulzxreh4bqk4pf2p98vj7zr7vixdzd5pybfplen6jcpgfxr2xamitkboit3ywo7h8uw1b0c4di9up2ftc9rh495htb',
                slug: 'vzxghmcmbavapfejjlcqllt1n0fkz2kyodl4sy2a4xybbszj36zzz8ldvyd0gelzrtvncu0qb0ffopks6ubsg38ya7y54bu7qch6t0dsa4tqla0gp8xyorczhelbmw7g8rn2toilpr39rz5qk3b8ln1ir2xvj8rgl893bvy6dzxxngwwbc0nooq6euo83kwktls7coa0zsgjeit5g0zq7w3p8zapwnt26s4qomyb51ffonohgj1bjnf5hdwz3ei',
                latitude: 983.30,
                longitude: 882.26,
                zoom: 79,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'ytv3mjfj',
                customCode: 'edixjyn1mw',
                name: null,
                slug: 'v6rk01e31tmdlrq3gdcf8als5ivppnu6ootgbo0lqjng0trhwxo9fmf42lwesvko5od9yq8faicccz3m32q6br008ij2hewz57cipnfzicxwt77ghxvx6mt6smzey4cfcuy23w3ftn7sclp0xd4zyinam1xk83h3gzriqf8dnp9f2ichjkildt9ue95m7o8ls7fw2tfjv5f4chrvempal4zvbqyaw7jvn7626bxoq3n77g89g8w10atwxc3jfgv',
                latitude: 769.23,
                longitude: 834.92,
                zoom: 18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: '667lyk5k',
                customCode: '0o5l8qwjcj',
                
                slug: 'm9c7ehyooni721gdeukbfjaow1cs0rnurhr9f9q4jb6wxwi84tzn60wqdcvwrgjfsumxgi4jjqkh3aktsnlwy5s8yjfz86o5rp0764uwwg1jq3sin0q5zn8dr3modvz32mopifwto743k3lppap8hy1wxa2hcgy3xbv8xgddegip3n2ndysanczpihxd5eukgm8lggfmcf6n0d6s93lgjmr6vrs45y3pqzetcagnamjewdoa4iz8m3impfvjvf8',
                latitude: 598.23,
                longitude: 303.03,
                zoom: 31,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'n5gb3xj7',
                customCode: 'a64wduru70',
                name: 'nz8bu2lusjwrdtljx655ofyvmvbmdax3bbi4x0usflbbp4e4m29n2illl1x0h6frloy9geh8psqmy39dpm7l8vjrvq6pieu6vchglju4owl2aaqs35puua3tyb2uot0mfdpzcrazetr8lugd3u6m5esis7ie5t4jg94avujev0195jlcpx2cw12dvuevc2nxyayeeyvu3wugfny5gaamfl31bya8sspg5yu3317z4z5jdwta5iss7t7janusxje',
                slug: null,
                latitude: 765.57,
                longitude: 716.88,
                zoom: 43,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'fwwerqqo',
                customCode: '2navcm4niu',
                name: '42syxq86a42buwng8r8r6slo72eq6mjrvy95agxkhe3ljh0aed91wonhobtrk4gmwefhlr222vo0fhf9zivkqm7rauguc8krsvoydz8zzste2zj0698ug65xe2nwq16b7r2gfj8b9zr1b7swxpyti25ybzbucvvz57hz502xcbk14th308ncb3o56r6lk8htwwkpk4fb6a1qnfqcthze1yumqfsbijood5v5qqlfj0exql73o1psjb8hzdw71hx',
                
                latitude: 135.46,
                longitude: 776.63,
                zoom: 67,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'pzystobr7iwcsmde4jj4w75mha1p9yvan4xoa',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'awl2rlw5',
                customCode: 'x7rmeguczr',
                name: 'czxh2kqswejai4chqnf00ytmmg82rrnkzaumuyon92tvwu978clmfpjrporwttmwdt5fwsvmn61n0cz97kppvbgy29lo8941yp3vifo2puaa1h95wjvxdnbceaglzl0pkucsob5shjfj7dzaprxob74dj1aoelvybi3zrk2752xelloe2g7h0itx4cqhd772y82ndmigf03ux0mnmk8quj5s4pw605tr1fsftdjjcs0lbeabislrlrrefi77djh',
                slug: 'jgsro08qbftv2m2avnklezr61l9rn44az29p7o41xhkpd5lxy44dcbvp016asidhepiaej6nhe04pk72ph8mj0z56wmlb2u1aelv0h2vjhez96yeeq7x8je6fdmnqw1f46qzh7zj51gp9s1q8o2j2i49dol7royw5iaawvpnq39t41uecolsle1wu856yn9awn8a2e4g2g789uvui2762bxjyieykqm2ls70jdbjp0ldn5sy5s37wgei5i2aui9',
                latitude: 245.34,
                longitude: 15.00,
                zoom: 46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: 'uriuji4uf1xhbd4a67urq6rklif6200n0xgjp',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: '36ktx8xm',
                customCode: '595mwz8y0c',
                name: '0feyucsogspv0b4w35sp0py3f6d95ys5mflj6sisdwkd9r2x1ivmbt8ix7d81san8jbk9kwayk18e7ncqe0rhcwbg63ng7khvohn5xvk1mjzw7i0ertlk5sss8rb3if9kqrnmrhfeozxnbd1pzq2usu84oqv57gb2z0r8rwm2nia3bm7ibv8ztfj5p4uz6g9yn2moj0yim4bop9oyv45upo4p301yc58lopntnmud4q8lji90yk46gbepj1gg8p',
                slug: 'v1umiiwkvef5rhnv0l2j8dngbvll7bwp0nu21usjla6zbpt70aqfbppfkdjvhsa5u1kmn67d20fdqikhc8puq3kmpo4gspuo5y22rp8j880e9i49kum48wbpwwxf0iiy23m4avdkmaefrr2wx3tqrnuz8df09hc0p8cdugidilnir4w4fsypcdrxu0te2f14w36xdvwk6p8gta2ve4wkx2rl4c9tq4d3nue74n95rkt7tgr1agm8ojp1caxcqqh',
                latitude: 170.06,
                longitude: 246.86,
                zoom: 98,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'd0sioz4tegvfy2htgyk7owx727ep4k21r4fs5',
                code: 'c1ap2wxa',
                customCode: '6aovyazpqw',
                name: 'nf66cr3q7lu1h1ijpva68shl0ftxziolu9eeftdg0vhs57xg8e28gffwlmplm8fyl3a0gz6epu84ba5c0f1qru4vrys40n37zpwh0vwngfxkkpmoffgreti34avh248h3bcjwtst0hhz8u2wnkc17m5lauqnn3hxo1sytb6h3n82ubledk9qjok5ps3so2ivqzopanq8xxg95pikwq86xz1qfb3x3yyrfeil2xuf105m7utywsqwotxm9xhbfk3',
                slug: 'zv6xvef06ldlp9ekkg4ltek06crg7fyv8wkqtqhdk8m5pz15izy2m5xzy3mr7viebxu7njmozwkzh19g3uf27cosbmnei6vr63vdwnuepd0odkzp0gjndi7m3h40cwflicqyzdo9e1p7qnpxuitizezkhynith0gukkb2vmc3eijmc7482t3bfdq4ezmgwlkpqfdz1c5uv1eg0cyacjklf0b4ollde5pw11yzhk20z89nanxrt0t45l2g4qy7sm',
                latitude: 928.22,
                longitude: 822.63,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'hpo4hp7h2',
                customCode: 'j3shcy4px2',
                name: 'r0ckknjbilvp4z6j6z0r9710vlw8nwcrsapfnp7wgae8c6s767rfsyf9oqb44sqttjk2rp2ymmsl87khnquj01p103scz4penu7xvpqvuaprkjtfm96v49kp01cfymfx7e036c43lhtthylhq1ie24duz41r7l38ismke4xeyw8tob3pc1tdl0pmzp05hu6ar3g4kcrcqhsplcnkcjmpbv0d5v3ni6lkrrkwg3isdg0oa2reu1bolh6x4mp4yjl',
                slug: 'sjosl15jcs0k2pj5e201us39yc7ylo7m1jspotou9vzdmyfn159io97khnrmekrdx4zuijtffe3qj57t7g5i48vb37ulzv7zticzwfvbnl3x5p1c0bjtgid243uy80zoo4l8v4q9f16nrtcg7od572575ge92faryxgo2ra7q5cmpcftljpqsvhl8gdw6g3ou5el0kxpqszni4chmli1d07wmage1cln604umkewxdcokzq64ov8uonbgjzc47l',
                latitude: 593.43,
                longitude: 669.98,
                zoom: 65,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: '055671y4',
                customCode: 'zunnuicjanv',
                name: '4xwwk0gipr4ux8lax3rmka04sku9q5ndtrj974o26e302xbc6lf1q6judd7fg4lmt3irqiwerln6tyvjjinrqsq3ay02e10abd15wzgjfdisci86p5ryk11azcx6f2zyxxd7urkiqknswrkob766bkrm35uwt9ffjndt3x72ciqhdxftc7449wd6j0mikszmtrqix9jo6f5fetzd8zmsxvwdidoez53hvewxc9w7bh0kp7103o5mfpgeihx8ipl',
                slug: '1qhtnyg00yev8mlh0w9ykwf0we5mguyxgqt9lr7tp5qs3ags9o62ebjyjm5rsyagby1fzw9h909orojh9bnxj5ar1cqrmtxbo427ekop8bwhvvkit4yfc2rry8ihm2q37dikogr184uxe11rdiscnouvsrdtoyn0d9oqt8kbmqg8xlghy8w1yj5d40u4u3oqm9usdl6jmwttt51imn9b1mjsl4ulq0mr6pmnbkxvr0hmxzj1vko5w5zp7viz96i',
                latitude: 374.02,
                longitude: 167.23,
                zoom: 72,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'tqsiahbg',
                customCode: 'zh4179x6ui',
                name: 'ug1ba73lz9okx7reoyuv8mveggg5o8h614w9kornr4gd449a3lrf3h58e71en1lo0yegy2l4f9r48s4hjjzkbecu3srf3f8j3ve5ufyrcd8zufg70t84xa9uh82hufr2xx6e8frwfc0fr4rj6p5pd3swsjy6hipnehbm11mlyjovw6kxe93sgyxuluisyeev08owt23i453jhe1ol2svh0mw8oknj4c0rdvupwsrepq6dgy58b3mc7lqbvhbxa15',
                slug: 'v2t5i3lu2hkcotnk0wysr2lzq2n5wvakyv1m0zhggghv6geepsx2j1m7g1wr8vljk6l5xldtl3p6jiiars8dt30n2mn3kbtu9cc0g2fs2gkz20fv7v3afzmk96ton8a8rpnpt87jgxtus1cm854o3gslta552r0vlc9545dtw0johbc1qa1yenv5ydbgdu2kpuib3wpbbed8addurzhv0rkulvruj00kd1gvrw0nkkeb81b1hjemav37uu2qx1u',
                latitude: 164.92,
                longitude: 681.40,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'yik84r8z',
                customCode: 'u4nfnsgm48',
                name: 'wmyj9hksepp0hg5x98g14p5o0epoemvwu00o5gracd6k02gb3sephjmg8mtvla1xwg60bzw48bxkkuu9lyxomc7dcjf3a9larfewvb4s5by0ru465v2q208stoy7uwijixftdb6phm9km3hbzewsqxplpck66hs2vni5lebnkukeyy8kemayvoddz90ostkj73e6lw2omjn5nirbbc0zd7f38tosnbuj83d95p2dyh9aq5ojn4libk3pjxbwlv2',
                slug: '92tsk0wh85cwd6w91512yg7hs3j59loof75iu7gr8xx6b0rlbmkx8ldd8jac8xd2ssb64j46u69ow1y7z6bloqhkq5rqfxen16uyfj7shvnltivq4p25t0j13kwz08hsr8um79qu5l1jmw5gy9lf4deai2plt6w3hv5s33k0hapxq9fbw5cmocgj2s6fait50kumsudzkl8ql48a35jncnwbqjsszcb39t5bogq08t69e5p2nn6r94s4ty0tpgqa',
                latitude: 476.02,
                longitude: 880.28,
                zoom: 97,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'ug7xm174',
                customCode: 'xdntdxeiut',
                name: '9lwbru9hl29c4loly3091bo952f9xtns5hhnlgcqrzn3r0uy1fy6lm0vxhom24ckv06t9x0rp257qfanezzuzfay7nf38o6eruvrl7ylshc876crq93h6czxv0qjltt9wev9ag83ycccov53edo6icigptdzu9nerrzskfdshp64o1z5vf7dn98takae39i3eazka6j2s9vmq9nzrucohys5cnpm7imptmw3w8f13wr8vf71xmw2yth9cfsoa1k',
                slug: '18i7pzyxk9m8b6brgllbfyh43z0pgpzq83uh3x1omofknabrxp5k4je0cjpn0mqm8smilhdepw3khj6wyxj3ud55sie2xj9a7fj7qpi9lm12s3munlbkjvwnj4jvynj364rw2sor6ixqsh5wreiy80yehq8pxp39q4rs4q9aa0m2jrxgvcusltp921oedca0n01f7nj4pemty6ntq7d8of8ustx37mxl8y4spri72yinwzumbdnvfxy1j4mz3ai',
                latitude: 684.30,
                longitude: 281.26,
                zoom: 58,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'j1ttqmwm',
                customCode: 'x3x4ctgvcn',
                name: 's617us8topexp1esxtpfbzyf6otl2ef93vjv3cklf4jopfsbe6oc5s7yfw5wc9k0zwqydeuv7khpw59g2ythw8d2psqhg37aq0cq1gl2u9cidblgdsrmebv4f7c7azspltfnihgg0g1gnnw60yi7gdzd7ypic2h1i93twoxgvto3v2n7jysd13ogp4r4qedsy28odjx3gzxxcvwqvxqn8exgj8x8p2nne9hp4abqt24iabdtqxzs4eh5xk1fso4',
                slug: 'v61dwhrsvyu4acl5qk6on4fjclbszztelg403kaab58t5gf37ndqvjsk0dbuxgqycrux4hcq48omx8b357arpoytbm683vh7ahvvjvozaguzk26vvugm9tfgk4ckupaw6geg657934cuadt7g6kwjynd42zexn8oe5w5nxqcwlsrr58iqswtism1xetlnw45gfn0qupjzlg262833xzhmx3xyymchlmlnf9lukp5dxhr1wk9xj8mpu4cfdqbvch',
                latitude: 381.00,
                longitude: 414.58,
                zoom: 21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: '5ariwive',
                customCode: 'osdl6vm6r2',
                name: 'yi0634uffag44xntdl5evjswps1rqr23lrqggpmrth4fk84kbilvrayzaaims5reir5wqpr6jxk2i1o108gow2re4c8jn6j91jvjsm61vigyezwyc8i33gbw8ahw8ezcd7qyy422kjtqk1y9vzol9sipz59nl17c57sm41cmmy2n66vr3fpuvg154ztmxb7i83rj9svap4dbq986954o80nxjrdoyvy38i7h53v7qu68t6r9li7qu7hk9vm0tgi',
                slug: '6w9fbih7wn182w7cv6bb6gghvedoufgzl782ofdf5s5ft1iveid12l4jpa8brv09y5mh765w3b6366wfoe8xw4z7iaa7oveqdocig0ms832ilglks87ns0tichbl983qwvyp5pjjp8336im8nhn17zl83s0xx8eboul48qzsb7d5gmwvs6sfw6lu403ircrermpv0jrg0gpoj7mf4mqns1dfrvmpdhsg9qbaa9u7whpmuf316no66828u06cels',
                latitude: 224.09,
                longitude: 216.92,
                zoom: 673,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'uiq173rr',
                customCode: '4nx8j6gpsm',
                name: 'fil7dphuradtvf6vuadn7fn584f1rwq06i5newkho98wqn61fqua0c3m28g4qae1en023d4ygr2l6fragnj2ul88oehox7yufmetyvmb6zeurj7chcwzupcf9ddm3tu8ydjxifnddjn6z2k91x9zbgaolr3rcaso42xwm9fbo5s6ktgdurmzgq2u240kla7a0ktdpmv0vn5etczbq6patg11hwytmwoa5w91dq95vifrjn7bq96b2irpcuzggw8',
                slug: 'wtpd3dvhox2tj0jqtk3j1xxri13g513dmz5v1dnyefxebaf0e00bg0iw7xcp6y1mn7irfsj6s34umqdm5f0z31r4izc5o8yzowhgmmv1vms53k3ckbc0de8zm21021i603vb5ok1tfm6r281rmai5qm3haocdxlmu5aqp8tqzu482bnn0e83cr24yz3egydoqxbic7wui5llm43dlotz8uo2w1mxwzvacn1p4frkmd6rf18lnjfybaljltyb236',
                latitude: 971.14,
                longitude: 465.71,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: 'nzki8uop',
                customCode: 'ywjlexss4y',
                name: '87vdzn15icyfitbewl9ed5v3kwii8h6xn79nho7e3bbivclc6y9554had4xjhe28noa9chyzacvif2d1zeti9cnlnma1c58xdtps7doxh6fz45sv74oj8smkgwzxi272zvnl63mnxytu3wmg6k9895nqqrg90rxb77qg3mqt0giqa62pjyxfqbwzcc1xmgo8hh1d3d87133pjhjs680hcuoametata4itldzxwr7kgy9y0kmv0i5a41lc881qff',
                slug: 'e5jbmb9aljmx0alm99xzeamxefplthbdw5z38zu3wx47xnn45gra3uk73u6jg9rhlwp5o0do59aluwabefh2zveafdp3cgzfpjk248k4s9geffr060w5vgasmn2bpi1gnri4op4lm806d9p0faj9hymjp62wnphuslo1pvmq534tfmhqopewzzh10478ttr3d850s8pz3ktdvs7f76x8igzus0nbt2ip41xrxjpwkrrb51sb3s13zsv44vqz1r7',
                latitude: 982.86,
                longitude: 950.44,
                zoom: 38,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a1b3a2ce-223e-40c3-a179-b89dba299b0c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7a838c3c-9b46-491b-9161-dab857517d52'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7a838c3c-9b46-491b-9161-dab857517d52'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/b4fe20f3-a9ca-4728-801f-75b1ef287d2f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/7a838c3c-9b46-491b-9161-dab857517d52')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7a838c3c-9b46-491b-9161-dab857517d52'));
    });

    test(`/REST:GET admin/administrative-areas-level-2`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: '12b9a200-b86a-4d81-9cc0-7d9f45ce0f92',
                countryCommonId: 'd986bae6-eef1-48cb-ba0e-583e80d79506',
                administrativeAreaLevel1Id: '1193c240-e369-4fff-ba0a-6e0fcff31ca4',
                code: 'ig5x9sow',
                customCode: 'xhr867zdx6',
                name: 'surdorvo255s23fffzz9phttnbtnwodoaopz8i9demwqzg88yal6itxt7cxlsedr0vpap8fhf7823vsiwezhov3tdyzm7dic73lbxfga98r4t2827pai924jwkdef5gdt5m6m3xf01i2t3ltglp6t4ptyxxrl736veowbmazf83vm4bi3mhk6un7608cwqduboaz4h8ur07wxdxvtevwsdl0zsip8ec65n3h5djprtgy6s5u3tu9vj3q69n9hsi',
                slug: '96o1aqry4hr23sw3h5malmpluedvkwjhz2kwbm3z7z6ju5c94ajw51jxjhvskz73j38x2mmunu5kjye1c9xv24ay0bsh9e6l82l3u8tmeklknku39vde7zi28vgioxm9glb0hwqhhdyyyh7djoww9mkmqs6i9oypd3pmsdlbnbuirjrsai3n1rhn4odo1rloyp4des21lu775o4w351m1wocfsazz1h36bs6p5ygy1w5ptuptgiw7r4azqtrhqk',
                latitude: 983.25,
                longitude: 38.50,
                zoom: 25,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: '7a838c3c-9b46-491b-9161-dab857517d52',
                countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                code: '81jxp1h1',
                customCode: '2t8dxcq9q6',
                name: '05md2j732nuuumutrcf12m4vitjilyqz7dptwn0ibhnlih4q5hm8003fkhg4iq2tyo4hysfn9iy9p3fp339e0d5o1aj16r201mahmqhxxm7jkeh0b0f8trqlhcr64hdk48uhcs556o6dlykmpjd3xvkpnavdcgapr5p17z410gk4gbc5etuolwahufbozk62l2yl4rmuo9d6gd5q20oegmoryu804odls5bi5ldam9wus3ncj7omyvq254lrwyh',
                slug: '0digacyyun0am94n5orzf0ryvcrvkwx3wvg6o3d1cn9ykkkzuwa1ax7q6fydcqra5j0d0jess3il5l8qrjwwktwe8x1kyt4hqg1t9lr87ft2jazvcpfy7pqr00l70z0xt042ur3yzdx2i4ymlyn4q7r3awnt32k88ab9uf4blnlhhh1mts3bi0kjh04i0oift3w8ykkisrk2t8efik7grm3st7fqiq9a5msqq40us08qsqsiogvigbzhp5qzuk2',
                latitude: 880.13,
                longitude: 636.96,
                zoom: 45,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7a838c3c-9b46-491b-9161-dab857517d52'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/96bd55c3-7b94-451f-9393-ca120751381c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/7a838c3c-9b46-491b-9161-dab857517d52')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1f9dfa3d-80a7-42ed-a617-cb47267b78e4',
                        countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                        administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                        code: '65d98n7b',
                        customCode: 'gfdbuzyw01',
                        name: '816lcfcx6rsk8vdvgtvqtdgxh5dpy89f6rf6lx2hljvljkmz0w1owinfe3wwvdqx1otso283vpwaoo8lkjmec9m8kojpzsmyfp12f0nfx29cn4yr6bc150z9ns5yf3ph7i62qnlii73wq371u0k5hlmot6r50am30s8k0d51zi5d2cpis2fvmhxu3vkedh3yohe3mjp79jo54umytw78tgdoca5rfuens5tnxkkmegmhjh0dz7b3gs9fi3w7ka4',
                        slug: '3vlzxvdhts3h658p3zdaizmpnvjdz7v10k5vpouc2hysa0smayp3s1ust7siolk9n5vfmm3bu00xiuvbkxprb367goo5leony2hvwjfhthifibjeqga0p8q1lq5rt5eflazwzibmverth9gaf6q6c2f5jxgblf61w3bpdrp319r061dny0t06u97lz07puhx043ttknet2nf4ws453lvg0ke42tanzf1q22iz43tb2g8bs74zh8w8u9iy47jzeo',
                        latitude: 172.78,
                        longitude: 134.65,
                        zoom: 63,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', '1f9dfa3d-80a7-42ed-a617-cb47267b78e4');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel2 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '68a7226e-6d35-4e2f-a2c4-2c036fdb2cba'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '7a838c3c-9b46-491b-9161-dab857517d52'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('7a838c3c-9b46-491b-9161-dab857517d52');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4caac3bd-401a-4c40-96d1-300a6da385fa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7a838c3c-9b46-491b-9161-dab857517d52'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('7a838c3c-9b46-491b-9161-dab857517d52');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel2.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '380ff20e-18b9-43d3-a009-3c52d1b95061',
                        countryCommonId: '155cbbf2-0953-47b7-8e08-67a3eee09445',
                        administrativeAreaLevel1Id: 'f742b1f0-421b-4460-9ecb-bc5dd9da6146',
                        code: 'fa15unno',
                        customCode: '11rhmrzy9g',
                        name: '7pdhzbfua0wb7pefjtilxdy9rvqgmp3qo6gw9afhb27hiwjo7sgh9e8l69u5ueaq9x3p6aor3wc3pzffxpxqrl2l6ywhan36io96d72temrlyu0y2b1854gajlx1jcbu0mwea60pmyta96l9ufdxtnoz1wyhjmslk37q2lggqqqyynjqn8sl0lcaf9h2im0ua4ybj1k1w5ythqgophgqhpp3vv5deisyy4z8mc99bzn0nvr7tobblus3mvr8xi1',
                        slug: 'i0mlp0pw2n8vj6veojsonkmlhd92owhmqoaprjjnlktndrt5bybnutc8vo00ju0m7tqs3bg4yeswqwxv8t2df5wmf84olrmpujq0urgp5c08hrac8j6dhjhnxuqrkby9y8hq5u00bo4f7x5cu3wvtwxjp9gpub7i5t2osm99h4oz9c8whwplmzpjxcywhm8bndvz276prnlf6s1fsc3kcc3a6bylp23noonisuizgizjdf31e9ri73lj9q4r20c',
                        latitude: 542.11,
                        longitude: 414.28,
                        zoom: 75,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7a838c3c-9b46-491b-9161-dab857517d52',
                        countryCommonId: '9467bfc6-2904-4f15-b5f4-22fcd4a0dcf0',
                        administrativeAreaLevel1Id: 'ac5b02e2-b478-4c18-85db-e2fb8ef0351c',
                        code: '4rtck9fe',
                        customCode: 'qay3mzhfep',
                        name: 'yvvg2e7x7q5mryo8z8if5ma9c45s8urqi5r2nfjo3lj7uhbthighzj1ar5mc1i439ajg3o0difwnffxg7p8cqiocisjw5evmh7yms0ev1q8vz2hr7dnd6l4v4v67yx9k84ocuyg9anrhptlkst5eocartypiebzap6oo2035tgq41zw1rjcdi01wvu6r8ujo48jtf71tkivbv9xfs3dtcvvdavo6d4i4dmrhvpq6bx03flgozayk0c9p09en88e',
                        slug: 'em5tjn7txikxsb0smisxyufp7vown9w8a4chuulge2fqqq9s9odgsgy9tcc6bxrqol91kt571lfzo1u4tqgi4hhesx1o72qci97efcqn9i8glid63url4yafifbweuem6lu5ykmmaot9e90qv1sgp6rr2yk7o3i6voi4sy4edcro9fhgk9v6jqle0hhjl4gaehot3e2bfducx9ekr56sv7ktz2k803o36bweqhcaoscb89uoxnkrsuqu5tu8gew',
                        latitude: 82.75,
                        longitude: 898.00,
                        zoom: 66,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('7a838c3c-9b46-491b-9161-dab857517d52');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '719ac2f0-d6a5-4ab4-a5d9-e56ff7b3f515'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7a838c3c-9b46-491b-9161-dab857517d52'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('7a838c3c-9b46-491b-9161-dab857517d52');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});