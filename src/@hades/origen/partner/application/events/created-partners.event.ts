import { CreatedPartnerEvent } from './created-partner.event';

export class CreatedPartnersEvent
{
    constructor(
        public readonly partners: CreatedPartnerEvent[],
    ) {}
}