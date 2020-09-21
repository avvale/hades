import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () => 
{
    let app: INestApplication;
    let repository: MockApplicationRepository;
    
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
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'aixsg7da2laux6n9ceblnadsgs2ifs5lfahfhn3j8mohktv8ql4507eb8fc7immp1jqjn0ba62w2v782x27zw0sdn0du77vu7nvbuuv43qshc4twxvywbd4zdsm2lofti8twsy8xz6zmhejsqqk3w3hjquufn4med2379zderpjvi42s46lx4cpc3rkeo9q8y5npvfl0ebj6qgajjz6vs6oax3zs4ogrl12kdu3duiffhnpgau0q42bw42he53m',
                code: '9vcwerd52grzjavm6huzxlz5ycsab4riag3i7tyz4bsrkmrenj',
                secret: 'ly8oonmbyuh6dcgm6nrixp0f3sdvuh2dklvgb15rfkgbeuw928s49g29y8eexwoycjst7ko6zw5515tn6dselbumdv',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'o62rpru0qgo692akdqm5p29fg2seqo5mgcolfb4zqwy8pjktnzobb6ck7oq0gkr3hhu1qr956x5r5kpzp3a11bks3bu0rjck0dtqvxflg99htjcgfqm4g6iu3gujjkrndk6rm6g5qs62uyytahnufo9vwp7isjtluzi5sn29qec1v76erd4mp8sjqfdp680l1s0a29rguvj20ocq37l5i0ex1utt1l4uj27ajq45v1d22trrtmexk8xq3fzoq3f',
                code: '9t7c7rzhququoam1u0g5msfyd1px20z9wy1lz8wn860jbu16rh',
                secret: 'n5hpw13m3f4mqg3ytf8bpyc4p6oplqwrehdwsnt3j2nfrpjy76znub0drxt8oz75ncvsslvt3hqate1dk231ovvluw',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: null,
                code: 'r6nkqo0fa0kqfmzrlpx0g3q5pcamaiw1prhjotqe33igrmtesh',
                secret: 'qk24fru2i6bwriixglv3vxsk5jhu6euelkiemy6pol3ix63w52wa9swty7inhxj4m65i9pixzus3hg05eimw2szj62',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                
                code: 'fwxv7163lmu10vunf01nrtgk775wwm5dsyadsyyqmyjpd93n0k',
                secret: '1yufoitcq7w25us1m743m2oid3p8fiyn687lr3ne9ir329zoz18gw3mc7wkm0uzjqelo7xpu6flwivjt85t4k5za6r',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: '8kp88635u2jjltelczkh1enbnmsuplrjayx9oqxlflug80yha87u29fy1bkegrro0489fk8jzy720zqqsns8wk8grdu0idc27o94fhuvrcji74luwgr66j3518rei8p9hyjcn57pfj59c1dtxxmalqpj60af8ez26v4eknq966a8gwpbzxteuw78mda3yur8c26oib4a91f40z2o0ixq9ws1ckb72ue2ylzvrfurrg9axx97yj52c3pujnk2pvy',
                code: null,
                secret: 'mi09st1l05hqztn787hkg2q0oya8rjxockwq9golanfx6syiq1igbrk3674301ra7zmc6z5hmbyumwyvnp4k0qz65m',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: '9p2gkmfnyi5d49g9t4sbbo8zrhmcgwwroeo23t41nc627i2aij94hvi31ogebof3fiyoepmfjsx5dy6ciz4sohp86yho1b53t8lvt1rsfyrp3eo97aq9gqj14rxe132r5cox3qdfss3pk6qpv0mr42rdutq3ri74s9043t47rxpegkx13b6jgrjae4n0fdtiygnz90ded3h6lf0va9o58mwzq3ofjc2jek3rmgijtyrk2m0pgo8xstwngpreobm',
                
                secret: 'x9scrjrgntpu5rtrurs7u3jkw8z1a2b5dlrf9d9943g8az650zbi7abamen0lvw2u5xnogg2b3uyd4byxb3t0byt1o',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'n6o92sddnlk4dzaigvsv43q9ct1x4ktm2r5v1dratb77tbc07v65o8y169y6hxerdrdqiq5p4b1cnjzworrsczn0cax2umb1ta7vn440fg2iaydbuou70dz3kc82h01i2zbdyawiastfo8fqim8g30iloj4mjx3tx3923tgpsvhveo619sodnl9b6y1wvla0jmaqccvx90wghkii0xfbbpe7km9qgwegricncnytyp1xp1q7o0vasqqt886z632',
                code: 'w43q7e6s24ze3p1u72dpvga0bfelp0puuin7z1i82zhlagtwtk',
                secret: null,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'aia395qe8u9hfppfsf49raoifn4s3qru8ncfle379a0v18pbjs5tezio04kj2tctt5rna31du6e3q8um5byr3m6she2ph669yzy81yz48qp8k647tykr8sd0y9y1elzb7m9dwwk8fdstatnkc2frciv275ek9lkgm98lamz5ph0fdr68rmvxcgcb2fbn0c8o1rsvxqhzut3gpnb3a9kzb1he1ced3ugw9kzrd0j82fjj1xsyqi6qdpidh0er4a7',
                code: '9byw33gpm1v3va7730bwitts3yezfg4hzknemf9ugex5yw5uvd',
                
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: '0fc7n9qyrkf204epz9kuhv8qw8ln0aoeysgxpeoreu92qd45yuyxzmr7rplbsik0k3bkxtkqzcy9nob53116lxom00he80d0qitao3kbhojvgiazbq6mvlng3tsjo408ldd11cdg3o53z7epdyfakvfyeaeq8lgecrfkq6akhzu76yv4hohoyn3u2rgb4cbxydonycimrevrrbhhoszi0k5b4env6u4lheepd0uvzj1f9ihjalhkz5j9bhbgs7u',
                code: 's7toqv8dtzjb61u5bya1gzhl2fm4ackeq8azeeib4wb5dvm0nt',
                secret: '7m4ulll0nblcyw95c6yfr09nseru7ejm6kfsnrwq39auflxl5cdqqlnko2uh6ky7oo4x68bulpr3shdd3r1r1vv9j4',
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'cwsslmsjnaix1qmmra9ke0roe6xbyht335eb21id72shnh8oz53t8dmx77m0hetx5cojxq0z6yowj8wumviulijqxjjvv9h0n1nminuz5z6k1jpfey61jhej937urcy1cxoosim8y2f0xowqa3i71ik51h5yut5nawaf308so2cemxfljzje5h8g7vdfpbzojpto3zuwmljin434s7a7f7968uzs0a500yi5g51s3t2m3i6w36yq01puadbp6wt',
                code: 'g9hb8q41eqdgg05sqskj78d41275zn5mubwict66uhjoy8ppmj',
                secret: 'u7n4jjeauf40p6hc1uyaca732ushr6bhe6d4cj08fmwjid1mfnr8vtoyuetb0nm70inzptjrzyujfdn1rrklundb8p',
                
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
            .send({
                id: 'ffqfkjj4jdk1ya7p4a7tz74zeaxto4u6ifp7z',
                name: 'p443cfcva8s3vqolqb0gfotszfncr4dol2egnci49yefku5m9fnl39gtqg5iumz2hl2fipdcjcnz7z5iu6i6g9opjxb37epdg7lg8rfm8jl1gj30i6lgwil493c5adstn60yafevm5bjwvmffpsvklwkhq7lvxb94n5dx5xnqe243xd8owitfmgrnldpnhlvp6ues0j7y5asnri4zrqx85955ya54rhgufj24jnm2m7xoq3rgeru1vigs48aeps',
                code: 'wukk7ury3cav9ooein9g7d764pe7wy48ixof5t1psvz1vglwjr',
                secret: 'u1ezzdsnra3omj49skrd6vcb4cmo31g6tub5okv1ste03yfskuw8mysk8xmreyxcslnqdqkwjg01e7fi93a0rrqjac',
                isMaster: true,
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
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: '0cm12mysxdl8umrc6pp4pkgmj9a2lgmx95x2e1an811blkod3kg1e9dl7j0kagv55u7annh8567oa10jms6fju3notxc7u51z8kc4zzl291wthgfy4e5rf2tt6w8n8d2afehe7spnhpot3o8njx1n90j9iit6b1z2gku8stcumvcfpost47kjgmrzds7oi7cp9ykamv1r1ay0zjqval5v2ywm9e2tsivk04vs7pnqpbxh1zl38pvpmjpc1ff79d7',
                code: 'bcxjimo3yxtfumzqhg57yo0aqexphfu6lkxgr16p7k1llms9by',
                secret: 'yp66aan469b9dg1tp6bymhp5o7exz1pdyh2bduvmjg4ibnio08f1baxaokwdswaq28qrsg1guvc4nwavxav9qremf8',
                isMaster: false,
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
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'ej8kajkj3tm94tvl9zhhu1l7a3r6tih2gc2ln2wbyz4xxcav4nx1pz1vm6oopufjxq139bnzi5ex2bqkosawmorsm2xhosyz9x5wsxwrjav4dd8wtrctz8xui82d3vn1c19zgnb2246p24ryu88zt3kbyw7su3krhhz48ilyaf2xhnwdao6pn6oh9en4np4du6ajlkk166ocloabu4rya2rp0ugnbgigdgy7l60qyzdd3g954w8cdjeh0wkjhus',
                code: '4epcmc82m6irmud2ieeiocjv5ujx07l00u53ptolkmz0zgadcux',
                secret: 'j8htodoqqt7z865jl9alecf2hrw8jakegvthowefqzl0qvfdvyabbvdp1yfjhcs7ffkmlbb9yixb1dyklxcj62m1qt',
                isMaster: true,
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
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'jvdvpoty7a2v9n8796sp5p7fv04qttfnn2mbg4ikjy02zo0slm8f2ng3sbfy3rpuk3vj8vvw42in7o9q7gv0s5zbfhi6g45tnty7exh7it6bwhwuen6du4wjnh3jbclfzyudri884wdks8v3wneobfzgpxj4ttedfpd0d33710t6hx1gd0svx1nsxt9yq8lm4uicb3sy2kzcnyhi9g124y5syocausvvngngdjmhqstm6rsnqcr8we7niyq38an',
                code: 'k5cl528zvpkkudgiwvp3ci90rt44nlvhls11c5maspavxqhc7k',
                secret: 'ylku22t49j5pvn42i9jaottiap0i6fuhcfpklqf9df4507aqlvizg572qbkirzvd7ojbzbq2b5m19zomdk224zw4zj3',
                isMaster: true,
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
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'swcu8u1wvkev1wr3g71qgf1ew5iptkr5y11u945e4j8hgadb7nz1a62s9h76yax11y2d28qaim5px5ttlzw6d5nwltbjhselm99o5bhukp44o4uw2au7w7dpes5zk7nij5ohyohbt78wbvkreb6n4geeum6bdvobiytzdrpodeo1xw0nksvfbtaopkj3uqwd5wvtgkymnru1b0lhyb208860ps0m2lqz1dnlewcnbk696nmjho8252b4eyp90pv',
                code: '808k80m4172hk14ml714ayp8m090bribtic58ck13vjes90oxd',
                secret: 'ze8g4exutee305uj1djp1owagk5w2u4cximd3kyr67t2ajs3ule2rtvfaxovrpcggau15s04xzhvg133qesrr69yex',
                isMaster: 'true',
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
            .send({
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'sxwuh79kga4qiawsa8xv94l47akbnn3dftbtz8v43hc9930q15en25yj81fs41lccmyjce1m3kmf6b4qf1fs9zitpuadqrcfpxekvw7zt2sa1by29zx4gj0d0jpctw8pf47q7wnhm0qmcol6pqwhl899w31sxv5qbyxmpmnwsrnl7bvlmv4940lhc3sg3ij7u6sm59pa2oicnkixaiu1rmjjm25uor6m8vf7ycawm66dw2x4psvkdcmdy0cgwmx',
                code: 'dr9u5ljjmnper3iyy4jkh68x3l40j806jkmq0d2d6q9kn1cpak',
                secret: 'tb0adlntjzhsgiuxnybpctrh60hjhq6jnnuvy06gbfvc9r0b67vv7p9109dd8va476y8esfx16rkl8nrp3f44gd64z',
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4d426b21-67f3-4e4e-819d-f139bbcc9094'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/b2ca7e35-05dc-4c88-a85c-fea7392748bb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/8d20a56d-bf5f-46ee-9ab6-959ee4c287c3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '15505798-aa9e-48eb-9667-f58d87463b9c',
                name: 'fyaoo7flo60op1ag9eu1wlsybrrgp42lq09p6yl0hmmxm7u1rxefwn9n29tmy9n248egjfo7f177cvmytik4w7sdrfurllw7x4a56g6g9dgcaeb8166s1caty2gapwl875ww8ys0oppey4hmz50l96semhfqz6b3bfvcdaez14t7itmy55lizjtl6ppc5lyeqj7ye9sqz6kugtqdarasfsn950i2c7k07eexlm1dmnm4rzbk5u1fonqn3muiquo',
                code: 'wyvrf8bnq1lvu0a8asxiv24483m4nvx7xoh3jqrxool21z7snn',
                secret: 'w5uw5fdi6wsqa8v1uye14251z58dd9nwtd2t4tplnozskg6oivbpt9j2t9sysgiag8jns8e2h01g8c0pchqobf2ol5',
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                name: 'kocej1z09zas1rpww55dtfuwowzqk7davylzuvstbgc628s1pf81wdw12h4e8ej6a3v9xmnm96o1q6bavl4ev0f4e5tfvrtsogwu7n4m98f4z952t2yo3nk3kyagmh5rjdt1l5b5b8hhzb40o4f8yi2mv4jqmqvt2b194vtj2bif70zrn0ig2430x52nkjapy7zef9pe6zzj92q0uj4sfj27wt9hkw6t2el78mc0g2y1j54nctx7h0xx77jpwzm',
                code: 'b5ehnsfas5sr9ymlacuaef4iy449xx5kim91aum1b9guud76yu',
                secret: 'x11fptqqgt0ryvzul7t07187ok2fy7l0n3i9xcaxxv8rrdr8b7jxp3cr18yv0xeuac58lyyc7u3vfs8tdnks5dnhc4',
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/6ad3e3ae-ecff-4f36-ae47-6b7b38a6200e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/8d20a56d-bf5f-46ee-9ab6-959ee4c287c3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f041cd12-1182-45e7-bd3f-2085c0dc88e7',
                        name: '6j8ngcktd20kh7r4ipli3ftwmtgu2y32vljxzmiyar6idopx7qu9e9vlmn7fmjd5w8fb9csirnvodooojpf1ehjwxdi8s24f1pb37q051b9gc7rb3ud1x2wbjog22udmwvczt0anzlvzx01vj83f1f1qb1g0iinn9yimhcjfjnpkgeayxxu0fzhrfczmzhms6ewyo0jtwpavbqrwpxk6d1b1a0qsd0u8gk9qfr6xo0qlky4xlch2xyf1gyfz3xs',
                        code: 'uwio8h1reyoi6lx9k7hzgu5qj7td6lbdx8xbi859ije0ka2oyh',
                        secret: '3zvax3z4y56spu0yed5ithh6w1fzvpw8geibkfaxppa7gou070nvihg38axbnt9falnspfkok578m0f4wrjjdgiwpk',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'f041cd12-1182-45e7-bd3f-2085c0dc88e7');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '8abf0c61-ab58-485b-a0d3-3c77d4dfe4fa'
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
                            id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('8d20a56d-bf5f-46ee-9ab6-959ee4c287c3');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '0638c092-39ba-4fb0-9298-882afe8e2912'
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
                    id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('8d20a56d-bf5f-46ee-9ab6-959ee4c287c3');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: 'c79922c1-f661-4b3c-9ad1-3b5642f95075',
                        name: 'cmznm998un0pjbcofmor4bdv9dgyukqx4tpvj03teokcm50efb98djhz8og53v2zei740hi8qrbx0gmybd6krbqk748713lmo66dey5g9xrfe1s2vkv8pa4q8uj5q7a5as0mtt50p52ga7pw7bw02limzlnhap6vve53hqrvbl52dhhb7cfkx3hpa4pr5ysmk7snt2s3imeto4zqquuk1m3qps8g0fmrt2k0ewwy5mk7oloe866gu89x5ks4rfz',
                        code: 'upxw8x32acv2p72vdnu4euz1vq69g0m0fe86u3cegvhgzneskd',
                        secret: 'ad6j280zrxgtth1rcv7s4kbfbvxr2sb1esiig09sy34bjfes09g18as728r17nw0rih4ujj3ky5xobc251t1jtifax',
                        isMaster: false,
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
                        
                        id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3',
                        name: 'j86pt1gbqk55zyv2wiyd2u1y0rt4wx82j36tcp3q8j1xybgpndi6k8nkaj62i9s5n4ankok32caywvxfsqtscy85m5kjbj6gdu8d2bdcpt9a7dlrgvu878uvuv1q5o01jhlq8r4pz4sx3l53vzt3k1gj759ouydzgqxk6okykymzislaokrg37cuox0sr4fugzv2v2jvk5j9fgbkfshrzqzcwsr0zywh00bqn2d0mpvlnm4nv41n4yj6ublkflh',
                        code: 'bsh3srutc7m42fjgf33lp45x7kth4gyqdcinwn2fdlah1ecmoj',
                        secret: 'ri0e774r15ym0sg2v5mjv446auwz88fuol9rb2pohtflw4w0qfmw6wgnynordqevtrwozjuxelt90figenm3va7la0',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('8d20a56d-bf5f-46ee-9ab6-959ee4c287c3');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'b9886ed7-c36f-4fd1-88a4-2c8dbec2cdc3'
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
                    id: '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('8d20a56d-bf5f-46ee-9ab6-959ee4c287c3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});