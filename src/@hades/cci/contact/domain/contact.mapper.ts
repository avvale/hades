import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciContact } from './contact.aggregate';
import { ContactResponse } from './contact.response';
import {
    ContactId,
    ContactTenantId,
    ContactTenantCode,
    ContactSystemId,
    ContactSystemName,
    ContactRoleId,
    ContactRoleName,
    ContactName,
    ContactSurname,
    ContactEmail,
    ContactMobile,
    ContactArea,
    ContactHasConsentEmail,
    ContactHasConsentMobile,
    ContactIsActive,
    ContactCreatedAt,
    ContactUpdatedAt,
    ContactDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { RoleMapper } from '@hades/cci/role/domain/role.mapper';

export class ContactMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param contact
     */
    mapModelToAggregate(contact: ObjectLiteral, cQMetadata?: CQMetadata): CciContact
    {
        if (!contact) return;

        return this.makeAggregate(contact, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param contacts
     */
    mapModelsToAggregates(contacts: ObjectLiteral[], cQMetadata?: CQMetadata): CciContact[]
    {
        if (!Array.isArray(contacts)) return;

        return contacts.map(contact  => this.makeAggregate(contact, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param contact
     */
    mapAggregateToResponse(contact: CciContact): ContactResponse
    {
        return this.makeResponse(contact);
    }

    /**
     * Map array of aggregates to array responses
     * @param contacts
     */
    mapAggregatesToResponses(contacts: CciContact[]): ContactResponse[]
    {
        if (!Array.isArray(contacts)) return;

        return contacts.map(contact => this.makeResponse(contact));
    }

    private makeAggregate(contact: ObjectLiteral, cQMetadata?: CQMetadata): CciContact
    {
        return CciContact.register(
            new ContactId(contact.id),
            new ContactTenantId(contact.tenantId),
            new ContactTenantCode(contact.tenantCode),
            new ContactSystemId(contact.systemId),
            new ContactSystemName(contact.systemName),
            new ContactRoleId(contact.roleId),
            new ContactRoleName(contact.roleName),
            new ContactName(contact.name),
            new ContactSurname(contact.surname),
            new ContactEmail(contact.email),
            new ContactMobile(contact.mobile),
            new ContactArea(contact.area),
            new ContactHasConsentEmail(contact.hasConsentEmail),
            new ContactHasConsentMobile(contact.hasConsentMobile),
            new ContactIsActive(contact.isActive),
            new ContactCreatedAt(contact.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new ContactUpdatedAt(contact.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ContactDeletedAt(contact.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(contact.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(contact.system) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapModelToAggregate(contact.role) : undefined,
        );
    }

    private makeResponse(contact: CciContact): ContactResponse
    {
        if (!contact) return;

        return new ContactResponse(
            contact.id.value,
            contact.tenantId.value,
            contact.tenantCode.value,
            contact.systemId.value,
            contact.systemName.value,
            contact.roleId.value,
            contact.roleName.value,
            contact.name.value,
            contact.surname.value,
            contact.email.value,
            contact.mobile.value,
            contact.area.value,
            contact.hasConsentEmail.value,
            contact.hasConsentMobile.value,
            contact.isActive.value,
            contact.createdAt.value,
            contact.updatedAt.value,
            contact.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(contact.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(contact.system) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapAggregateToResponse(contact.role) : undefined,
        );
    }
}