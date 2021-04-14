import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('resource', () =>
{
    let app: INestApplication;
    let repository: MockResourceRepository;

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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'crh1kfc4ax39nrtw9jc3vidiq2u3c4564kndhmlcw6qspmy6u083p0zjnx33er1ybzivxlxsst0eqp5921yhrt3hit0ir8tl4l17ja3y50gxa2x3glkyzbilhgm7i7amrivjk5ficdhhnydemf1xuh2p124vubl733vvw2u2hizz4s1ttcc0ptwuqwcq0qemm4wccgxotm1jj3627ihkgl322eqec6aux2l68m0755m92rrbpza537tqsjtf1ef',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'pevr1avm5rjcgq8ljlfq0gbyikhgu9lj0k728fohptjd7danr7pv9oj7d1j3f79haa4uvnkzt8ku7vsxdmtw4ykhui3zj8m4k8z59mpn12ie87qbv26qliylbhi7sa1phr47tkzc4lr6sa7ahhlt1r3444sdgjjmn2dyct32iz6hgugmjd7ck38ue2u6o72rwkcbj6s9ijxz49043vhmoge2mqqcterxsmu2mge9tnvsducoegtdx9b453yxv7z',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'ud45r4dgwiq1ac1tllqg2pr3wvhh18jlmwkyh4g8xxmqvn6nh268vm937h8j7e3eeh11gdig1bf7yvb3eu4l012pfwew0m2r2u5lypikx7j4c7qn2llw5idlxxzkxrfrvhazxio2om8kax6odq2l67ij0mux903z3namtmehqfaiw4ir4qh2hm8clumha9wqyucvrl0ytnkfs4c0vyh8g9qu1a02espqqrs7unh6b84ds37272w41533uucx2nr',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                
                attachmentFamilyIds: [],
                name: '0dir0jkn9hdvlhpt7motznas48ufasj38s1qz5kc3rg3uc41msoldvk1gocwo5cf4gyn95rly94xktuxq1bgvos5u8ms0ux9pwupvx13rebts9242u5vw5u2wsjr5q9z5tm6idcl7zn0gi5j99q135le7qngspazhs0ppcmigi7ttcrnnzz1gj7t0sx71w0yc5f05lmfr4qb4cctk4sdl1zatd5q1c1vc8jop9uesg7e449tngi012bo9h299lb',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'us1cpics6tpkxufubtmn7rd6hlcckm8d2jfwh79u91jt2vgyeygnyyfw2ka2kwwnzlq4gihixkjnb8zsmcs2gabl26tp3cf9ibl3ouyyeifqg8davwiiann0nfryafdt5rzv7wk63pqnpy5gp9jfis2zv3bf5zw4c86ajh5wvy7k9ehl48sb1gkb777u9yhe9d3kgwar3f86ad65r2lsqmzztsj818grj0efqihvdilrwtw0kj6sslkdek4cxgr',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'iexs2zerm1fp5epv86b03m474krugcauegz2et6pfapn6udog7z7ifwo7r6gw2ap74d0kdc9q4s8221qgkgtm4nl7if3emu9sqttciqjwsnrojwdoedhxybe8k90h1udr03b4q5d3um86i0f33fe5zd9z75wwo326cd10fz7wo8rpmwq2dida53megw2c9xv58vomrhuh2tdky6bdwg6gajkuuttyv8q58wa0qn1rzejog7acgc5m4rnu4x1pcy',
                
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: '1z6ioi918upm0tfakz1i8foydjaiou04zej5dgrf8plnf8rxg590cx860ptp1s5uht3talnuyt7duy3jt9g4icqpmub4a0q6601h8jimoytyzk81mjt9l1hc20wqffrzng9adsgtkx0v0fg6wxqbju1yppxvzwsjk13b33y1n41a67njfjyv3l508wobzo5j6wlwz4cft6ppy0ib951y1ama283pmzdy5oh1mf51m2aksp3hs5fclv2ihgyj0ps',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'nfiskiiqh2yt2zrlo48yjxda2emvapz9on6pl5noxblvhpysyojhjzh6e3r8szbex6o9l9j0edy4rco8en1t0t606xf9ggb4dwm5ehe4u3vsabfoyc7grbj5pef34bl6qj9kn24bfiul698cy4vnjod1wua8spcor805npoz79v1b1ibc0rk353tr3gpqz861srhgb8fr2h05v2971gw8qbdunw0fjgl3gg31clgzye2ml1xi0j4n3ignwzvpwi',
                hasCustomFields: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'gvcbaoqfwczo9kr6zwshixpfituqt12unqgrx',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'bznhlw66h02iob0pm62pe9v0s75e2o6hasmce4btxax8udxdgc95579cwzdstavwkh3bcsccu34qfbkw11k578h09wp3r1o3l9d62pz57v80im03fb5yu2rpw1aa6nssxu9siyh2ed7bmcnvilss75rfm1g4be3vhu0zbzue512dq3bmeukdb0ifpfjvq2uvgcxbmyqbb9894m28npiqi8pw08lrhbk6bz6yevtjjpla57ewtvxeiao81vgjfjt',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: '082bn4jxlk2rd53bpnvm2xuqjw0059f8lawuo',
                attachmentFamilyIds: [],
                name: 'ixvnqzm5g5koihj0sihrru4uun8op1b00794y9fp1b0afz6jc8d654wfgctwgeccecjd9d4hlsnbjro5w2tqlx7i8efxp9fqynmae67pgcmdc7d1sbcmzsau5lie26ghxyfbf4ym7b66nlj0u87n1znqp7bdyyx1p9k3tp1hp4xuwpttwuk22zeb17zl87fqr8sp1sohcwhgr4fs0yai2qs5pdjz8gk0r2iy2ce1rp57g2n2kpcga03g3rw0qzw',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: '9nd86qyrwtxyqg3fvacs588gtpj0nf10vqiig3jd3v8sj9gjo7d94hvod78e812phnse3gqktxgj7rhm7i4eu0se78clopjxtqadf14x0l5fft46ic1fzc8jki22t17ffa0wp0z7lgnqm5pknxgqmu017goy4mi11pgbl26mkytsklzsawjwmhaxzromuk1vvc5ufxax15talcscpkyf1uapapb5zx75wi0kgppvrk07mrx8y8coo3hx2tf76yvy',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: '3tgi0lmg8s1xcmqt4auytezrnmaq3idzwuxpyer4yzyjre6plbtikln3fl8sw2ji8yuq0k3zqw9cb1nm8l00n8mfqcdwhh43zy6d2ro5tjnmctfwub8szhdnief0730xqo7wnypgcz2ketk6c0i6jw8rzd7jtncvugrjq98zg7m8k55kwtum797lyurabpdpydn2qqjtzpyk19wly596jb3se13n88fd70qib3t11x87pp1c2jzikhj98vzfkme',
                hasCustomFields: 'true',
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'lmu31et5lkwjuo90kdekp336r6sswkh1hrf3i1bltg21gqoxqnkx8gsyxict55pv8btyh70nnn5uy5d7styehvofhcwy7oey2xtzrksg8k975swlrvsiowknwoxjcq6te0ogmpu1zkrf3hz3bbboufu2v0dlm6cqama0fpydkehrk5h4uppa79qp0bhpwwh8iyqj1sypke2fviamoberj8w0z5o4bi74h6idldljb8wtslup488ln3u3xyaqcq9',
                hasCustomFields: true,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: 'cunvimikk9f6x9drxcwj1uyuwk772ybwrc8fi7zjts6czkeu4nhtzq1y80xsra5lbb7sc684g21xpm9f73015kyspnd2nhuulvi98mfej56b7kskug10pn0mlayg293nwuko6iv9czhufmd2pl8bg76bfri7klzk54zryvkzpzzsap9e8mxujgrk1khlommlrx4xvmplyqq5a91u8g3tvg162t5wu2ei3bbjbmejbzsufqco7szhl3jpo6id2hq',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'ce537a6c-a30f-4544-a205-f0bf4ea67257'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f82dd331-89d6-409e-9eda-640e795f45ca'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f82dd331-89d6-409e-9eda-640e795f45ca'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/5749faa4-4b28-489d-9c36-3f12ad8f944f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/f82dd331-89d6-409e-9eda-640e795f45ca')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f82dd331-89d6-409e-9eda-640e795f45ca'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cd10281e-fc69-4491-8dfd-7de2bba39011',
                boundedContextId: '311e7dd2-5d7b-49fb-8dd1-3f5066719d05',
                attachmentFamilyIds: [],
                name: 'l7nk74nrprrrnzaxbd67egdhrc9n3sxqhg2ngheqom6mjl2hj66jbqlfxlvxusy9x36e2qx5xuu6dn55cum72fg2vv812m5z14uelnzo5qgtcezaopm34g7w24piffslzwh7tv5v7kevqrkeqp1tm96orj097smhwi77i5f0suingk7cj4bwevem4amltte456wqvaj98kkq21ij45g2lzis55w6jvyhanw56av6gi6rpjw2kt1uq7cgvtbyrfk',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                attachmentFamilyIds: [],
                name: '79s3mrnpwjpuvbeciymxu34odad67y6w19y20hg742vpq78lrzww2j72v5sq6i5v1xtklcocskxnz8v3qfb39n2jn3286vbbxjdas3wl919qf9krv36aral5tcwq0qtrmkrqyggma48i1g453c7k81bwpx54vagfrb13xjbe6g9kpwkn00d4g2vbpkuq5mvify7p9oqblargcy5vcvw79vravb7wzmh33dqtl3xhdu7yggzxfk8qgh8mese04bz',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f82dd331-89d6-409e-9eda-640e795f45ca'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/4d7d80e3-fb76-4972-8801-f6ad0349408f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/f82dd331-89d6-409e-9eda-640e795f45ca')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '643a0bb2-4d63-4306-a727-803fa71474a1',
                        boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                        attachmentFamilyIds: [],
                        name: '085jpp2e82do7pukxguqcfisr3rc3m7s83tr9pudn5ur4143otumf90kpx6dokt1cq5t8lw83f9h29rp71m2i78b2sluk9rwsgqexva0xh80xkpovtn8y25zrmds358pzrq3rdg69q2xejg9m47nmgy7rjb0rxdi2iwx2vww203dcabmdxkbr0s7tmubrauoksqowkbcsnh4lpoezn7x89w401a14bac5y6wqsf50ik7qbc2m20bpkp792ifr4i',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '643a0bb2-4d63-4306-a727-803fa71474a1');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'b8adea22-8fd5-47de-b3d2-c915586dfe7d'
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'f82dd331-89d6-409e-9eda-640e795f45ca'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('f82dd331-89d6-409e-9eda-640e795f45ca');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd6a1c2a3-5631-4947-b5c6-ff959b6a8d7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f82dd331-89d6-409e-9eda-640e795f45ca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('f82dd331-89d6-409e-9eda-640e795f45ca');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd6ad60c0-8fd0-422c-8480-8595ff132403',
                        boundedContextId: 'f179aa22-3299-4758-953e-7e7101156e3f',
                        attachmentFamilyIds: [],
                        name: '4rzfvkxe4gng9vmb6waq1z3rgmp7r1ebvuswticwkluzxnvyv7ytvau08hi0k1951zz9otldtf3e2eh2ef7atiee9camilzrz20akhuf50tucokdp0dtf8mqdnbayxa2c6lj94v5mnpr0habf3mjusodjr0olak3sd98tbacl86hu5iwaed3ous2vbe6aefyqkl1i1zsws5yz53dqs3b2bw8wks7io4buogp27no5pid23des0zqb6x4vc8j0v0',
                        hasCustomFields: false,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f82dd331-89d6-409e-9eda-640e795f45ca',
                        boundedContextId: 'f632be22-ccbe-4cf9-bafd-5f757fe80680',
                        attachmentFamilyIds: [],
                        name: '0drr67roifge4x2uf7ttvr960hfo0wz4ef48xamqx31hh4b0ojls4r0kcxqzx0gsc27k4n0bjoknp1vm7nnpb248zdgfhzehuktyhebhxmlzin60uwvbiabkbuq9wv3y1myigm3jdfge8ajvlsdmk9tyfeqm9dnlc3okakzkl5g34c6m9ou2q82btew0htt7dn3tytrymp3cfa1ia1gnqw53heidt0uzh8iht4xxcwuy7mdhxhca1m4oekaupmz',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('f82dd331-89d6-409e-9eda-640e795f45ca');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aee74628-6348-4dbc-8a41-a12213573a78'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f82dd331-89d6-409e-9eda-640e795f45ca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('f82dd331-89d6-409e-9eda-640e795f45ca');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});