import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

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
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '15irbxnw0jjgry7rdc1yly9vftcbblu6i0007jn88ryewulnj2bxr1cm65keh2ad3zkdcli1o6pq76ud4a1x1wdxpqfw7gqp6ua05fgq6aiywrbx4pbnkvbdhxk06vc8eh2fw7f2gclr7ejl00v6u9gkuk49cjuws897s20z6fkqq0gjtwke8uqhyy4oieqf6wwqpbt6zw39spmg4127lo0qrrwecpefdre4x9v3v6arbh6vz5850zuxcmgd5j2',
                width: 867327,
                height: 780850,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 75,
                format: '4hwn8x8w4v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: 'lus6wgrac5rdzrenvtk339b5nro4on0mg3lap74giqlnzxxq6ioqbow1r9aqzq25rb4xejy4zujy7hxd5m4p6z008dd3p23215yqukefxyqe5w0x18lw10y1oeidf5064bawmn1l6egipb0n60bqyotl599nnbfu8o9mfoda8k0biqx562b94dqpe3wzjsr2k625aowwu5mlce9o0vg30xc643qgnyfc88umsd10rpn30vhe913pcm6s7ue0wfa',
                width: 936573,
                height: 325316,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 57,
                format: 'we8w27gajt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: null,
                width: 357725,
                height: 284982,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 28,
                format: 't0bdemzraz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                
                width: 996796,
                height: 789061,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 24,
                format: '8927mmmbib',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'g7a89ui4misdiwjrkbgxxcld8llrdi542wi7wir37saql6p3rs1q2bkmefw2kav1dso08kqqxbgl2cjfacrf5vmgpqp68lyq2w26a1d8jndmb3nly84sd7qur3m192aulvkd1s8a8erp07b8bxsd382ze0qvlcp303q3w07ic3xztfbwozv12rlgp8lelp3x1yjog1jmqci9olc20udq497390538z0kcubc1ps7kf9n5sycquso9ayv6llpgx4',
                width: 807648,
                height: 232332,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 17,
                format: 'pp28ervmlz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'xu1x8nc9rgec2wzt63krq4qdyly3zmhg4hu5o6oszc0drukojirhab50079hhski6ee9uch8586h1oyz4jzuq55gcq9426le74p31gshai2sh979mwws39kpylixmq90fbxb76gdm7eoajvk5efsn5lz9wv5114zcnefbaz9k0fkhmc13v0mx4n3o9ds34by81xl4ays1w28yf0mk27ac4yyzqv3d8fzjl66uygv5n6dmf7kwex3m9kxtrc6z40',
                width: 824472,
                height: 636386,
                
                sizes: { "foo" : "bar" },
                quality: 92,
                format: 'gcnestjcjr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'py6583n1kgd0ntdsza9z3kado04nv7n9oot7m',
                name: 'k26bcuaax3jcanowz3ruzt7v569b0qt104hnv4gjfqhhcxwveoaf4lv8f9x9e6hguqzgcbe266o0t3qqah7j4xoiazshs55ajm01bmah820zar1ys5lf8cs437ue9ij1aekd0xzwsoz5ozawma19d1t4tvxcvma0an97h6ssigozlecsavvde6b7fd2owho3kd6tfpx13j2ocdyy2g2xo5ijr87h4p6aktwpqh937gu6wm04obfbslqx5a2q7ed',
                width: 639847,
                height: 515953,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 23,
                format: 'm9zx855311',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'x4ne5pgdu5pmt6gb53ax3xleco69xpo8v6vzzpiul0mji85akmo5vrqjpc3v1gc4v9klc5rd2vft0sq1colu89yq9ki5fkjaf6x2pdd8x3zls56vzcqaw4hwz8b7z0tw5kl9vplf5yynzamo21np64ywm7sueocxb2gx7b2mzv1xdrje72smgixjtzv2h196ai4ut2z70l7m3zf82quijqwemzx6scvnw3hdmwm5hht927pp36osz05wai67545q',
                width: 712246,
                height: 569335,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 47,
                format: 'vwxejokwio',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'silr136gle8zemi8qrnwuyckf12f97u4n3fzcsnhslf28gty45y802wb6f5nu8sw4gqa3z7gfn876vc2m10nitmcv8opf8t41pzu1jtgzxazyuwj1bhm2rd97n99qujryjgp7zczpllbydi1rw0h508cjdby6ivnpe570te6q63jy9933ax7f48only4asfjjxe2qkb7zt8xkm7rfx37vnc21yso9wxuokg6cumhee0ybmpnctidl4pr3sz86ir',
                width: 8608754,
                height: 619235,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 14,
                format: 'n9tt2cizf6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'dqd7idhy0rzmmz56fzn4xacf7hqb9lnueyp3754wrdsmvgsi97lqf4in028yzgggd932oek64fqj69eawn0y0x8e30ci0q9s0xo4wvc2yefo6gz27hnhlvk3np00tp9xgu25m1pyd4mr349k9yr2yhsv642mu4rhk4cq3c2rtrhouqt7h6yz6u3izz3ufwawd5do3erqavd4shi66mirny10wpdmajoa7vm1coueeu9vxsh01km200l23ybkhvk',
                width: 254585,
                height: 7860709,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 68,
                format: 'rtk932mbl9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'kr1ew7ea99gmcccogm2f3flwdodovn2d307mm0w9mx4zmkigti2x2p59lqheorx1ox1xmy69fhbq8zkctopzyvg3076muf67xb563tyam0k24ha41g6xnmpaxu1mggjlxi2flyzv915q2b52m8pxw02eqxa9r6hvxu8mrkcy1j89bz9qgnyrhmo1ljeu8fp77ynbp9i8tbiyx8kro4wcndob13sl7buf6s2qcvlqclokf1tn6f2dmpoe02k8fm8',
                width: 829105,
                height: 322452,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 317,
                format: '05ssxodhwf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 2');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'ii0s5xqd54602pmxrzpn802uzoaxf21cl3viyc7767v5v4ysiviv5312095g14148ddqfmi482sjl0ubz3cikxpijsofx6fdzgpfe8i3i9649jeos751c7an7i1tp9u8th7xrnar0w41d40t3j6ll4v8i6338rfk4n7hqn2jtpk3eoolxozh3kkrnyydeqnzyp575ir5jr6gl6t9mtd5uvwm08n7ya22lg5em5c899ywtt3619ch12oy1840lxy',
                width: 849833,
                height: 464134,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 46,
                format: 'u187vo289sl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: '6fvq10mzo4bke5dgdk6o4177ba37znoiek70lmkozf7gr0c8jwe1by5cgv8qu6lwkwzksalft1ajerfecvwrp0zrl36f8dhy2zy5lpe2okoi9vqfeme29m16trbfayg2hzbjgweca3uh6iuy6s5k0qawv8g67njg6ka8zkh3dd0zw9g0jv2ezcovrmf5qav027nhqy74cqvjf08wmzhtewttqqzpl5wr1rsv5sfaq81fawdpdboicc5r8kq6en4',
                width: 304820,
                height: 639936,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: 'wamhtpaepu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentFamilyQuality must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'omsz99699itdeauspg385l7qn4e2a3781uikaxsy2id2c0imifnmusdb3oxzfxr03du5ket8n72p9f4c6so7bck0bpyqdf6fnvs2b40w8hvis9d8gkjtq8m5t8e7zflyvyok2txnwa99666gwhpvzwspbxfri9s84k7vcn33ivbviqgin16e1ka7b9hifuoc8chd952g18pn79ka61h4xj3c0uiymhkjr9gzfnwaa7ylm4i4yid272nync1ixbz',
                width: 664740,
                height: 680623,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 13,
                format: 'uipnf3ijx8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '11079248-afbd-477c-a315-779788602be9',
                name: 'ldv44r0sro802s4qnc1fijlqu96yzhdnp60rfq2hsotv1hfulyqd9lfopv0dpbhkkq9amswuwuw6f7jgjy2r8ot64ih0stgcqwqu1mlyn7vnh2qlwysnploiscj2d0sk5m8m5elap0bw3cxs76b9i1hxgxq9tz1ojn3v84km1qd0g3ru8bhqf3sykaxu8d8buda7h0b0udl9zy5kvuplz3oejv0x65l6t04ik458crl4thtsalbdkvvy1dojali',
                width: 204023,
                height: 534139,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 29,
                format: '8ph80if1qx',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '12aab0fe-9a5d-4670-b217-407f4dae1fee'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '11079248-afbd-477c-a315-779788602be9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '11079248-afbd-477c-a315-779788602be9'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/b4420c18-6f1a-49f1-890e-4b84f181533a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/11079248-afbd-477c-a315-779788602be9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11079248-afbd-477c-a315-779788602be9'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bfec8ded-d4e4-48f5-9e09-6f411ed4c722',
                name: '2d67wg90zz76kmr33xhjqg2xiwdvjbwbqmi8nulk6iv8yxt8sceqi6d0hnf7nzl4yo076mo14em6xsvljs2s8zwewz4uagfnp0p7rah1czsay1qmj49exgt3b34ars2zgu6rbg3nuzhhwgw7mxosbxa0f1tqa7kbvumxj8m5ugj1utpy29a964eg7w3rfhce34dik1eny34e4n2wzjhzt1qac6nv1j0ozlic5ufnz8put4yssx7ajzrcwfy3tg4',
                width: 439889,
                height: 155765,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 40,
                format: 'u9gm838r83',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '11079248-afbd-477c-a315-779788602be9',
                name: '2rpvcav3asligmvdbd3qftn6fbjs02bo71kdiun30f4jrrj1v6l2h9awp10c1ni2or0o4iwhw5mkqpzy33216xu2o0dtjth814353dgnlj6zhhderg8r0ot4n61jdeqs7b778gp78c2id6o6n6m3i058fkps6lredy84xodkvft2fsk3wypogywelpd466un3qitp521bya2gxxhsaa1fp4c5oprlaeaqqhmoyjkzigm343fa36zhzppdl55lq5',
                width: 342072,
                height: 600699,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 98,
                format: '8jg94v6xnq',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11079248-afbd-477c-a315-779788602be9'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/8c4a551f-cd18-4e1b-a632-e7e8f19c0cb6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/11079248-afbd-477c-a315-779788602be9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ef366358-c939-4166-8a5e-ee22ee1a1a8d',
                        name: 'ct37cbczsdm2ud06n1lyi3fx11mgpq2m9do54g33w4wz6vkb0qw4o1aazx8nxqsbqrkwsec0av1lx1esue5d4cks7pb8wwdn6q5vr5fi2ytvzlyco3ondf7xga7612p4v1fzo2n5ug0acxldox4bdsgppiue43nv2oyhzy9343tl86e86cmntz3qyv5dggaw29mrha2jatbf7yey25fzcf37huhqkmxp5cwmrcbueanp0lo7f9bn41mxe3tgedp',
                        width: 467766,
                        height: 101678,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 16,
                        format: 'uqdclepxoa',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', 'ef366358-c939-4166-8a5e-ee22ee1a1a8d');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'c6fc7add-fb15-4f17-a97c-2c48d404e366'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '11079248-afbd-477c-a315-779788602be9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('11079248-afbd-477c-a315-779788602be9');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a59a5e97-2927-4072-8556-ce5513ad1500'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '11079248-afbd-477c-a315-779788602be9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('11079248-afbd-477c-a315-779788602be9');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '20fcd208-8729-48f6-acaf-234e66925769',
                        name: 'aeeewed9jtzfvlomwst7tajqqesgd2qnr35sm4910noujpfazhu9eksuv60bndtgbug3pvsqozq3dkzdupeid2ave1lvs5c4yd9ga8nisj4yte3iw9hgbrnf4aky15410csv435thdmf9d4zzq6rbardu67n801tu9tc02rtq8k4feht79m4a1iy3q2y8aslz6a7x2600fau3fo666bupt2mdcccqtp6453vugzycn2hyw8n0qgd8puym8w5w69',
                        width: 756103,
                        height: 196424,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 38,
                        format: '7pun39c3m0',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '11079248-afbd-477c-a315-779788602be9',
                        name: 'qaln4ozevm38qoowhavz9dcyu9y90l8lun1wyty0e2mxybfn8aa2ap1j03fj2rq5p64ca426vcjqkub72igm381l1ycd4l40f2t001l4dt2gs62yzmuvy2rgzol8jtunj8eejswy2pmvcyd4s0wa4pcqhtb4kycl0gtub4lr1jyqi565y1tt3y56ii5cl92eil0uoow3pjw6cefwdq0f7a52qxh6bm7l6fhbrg8y4clis2zh4vutfgnm4fzdqtj',
                        width: 649965,
                        height: 958186,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 68,
                        format: '7dead06o87',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('11079248-afbd-477c-a315-779788602be9');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '043dc4ca-0f09-4dad-b3b4-fe07638dc7f1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '11079248-afbd-477c-a315-779788602be9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('11079248-afbd-477c-a315-779788602be9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});