// FONTE ÚNICA de ferramentas citadas no site.
//
// `earns` controla tres coisas de uma vez: o selo do card, se o link leva
// rel="sponsored", e se o bloco de divulgacao aparece no artigo.
//
// ⚠️ HOJE NENHUM PROGRAMA ESTA APROVADO. Impact (HubSpot) e PartnerStack
// (ActiveCampaign) estao em analise. Enquanto isso, TODOS sao 'none' — o que
// e literalmente verdade e e o que a pagina /affiliate-disclosure/ declara.
// Quando aprovar: trocar earns para 'affiliate' e colar a url de afiliado.
// Os cards, os selos e o bloco de divulgacao se atualizam sozinhos.

export type Earns = 'affiliate' | 'none';

export interface Tool {
  name: string;
  /** Uma linha: como o produto e construido, nao o que ele promete. */
  shape: string;
  fit: string;
  /** Fraqueza declarada. Sem isso o card nao renderiza — politica virando codigo. */
  skip: string;
  url: string;
  earns: Earns;
  /** true = rodei numa conta de verdade. false = documentacao oficial. */
  tested: boolean;
  cta: string;
}

export const TOOLS = {
  hubspot: {
    name: 'HubSpot',
    shape: 'CRM first, marketing attached',
    fit: 'you want a real CRM database at no cost, and can delete what you don’t need',
    skip: 'you need automation or a second pipeline — both sit above the entry tier',
    url: 'https://www.hubspot.com/products/crm',
    earns: 'none',
    tested: true,
    cta: 'See HubSpot’s free CRM',
  },
  activecampaign: {
    name: 'ActiveCampaign',
    shape: 'Automation first, light CRM attached',
    fit: 'email sequences are the core of the work, not a side feature',
    skip: 'there’s no free tier, and deal pipelines aren’t in the entry plan',
    url: 'https://www.activecampaign.com/',
    earns: 'none',
    tested: false,
    cta: 'See ActiveCampaign pricing',
  },
  streak: {
    name: 'Streak',
    shape: 'A CRM that lives inside Gmail',
    fit: 'you want the least possible tool and your work already happens in email',
    skip: 'it won’t scale past a small pipeline, and it ties you to Gmail',
    url: 'https://www.streak.com/',
    earns: 'none',
    tested: false,
    cta: 'See Streak',
  },
  onepagecrm: {
    name: 'OnePageCRM',
    shape: 'Built around a single next action per contact',
    fit: 'you want follow-ups to be impossible to forget, with minimal admin',
    skip: 'paid from the start, and light on marketing features by design',
    url: 'https://www.onepagecrm.com/',
    earns: 'none',
    tested: false,
    cta: 'See OnePageCRM',
  },
} as const satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOLS;

/** O bloco de divulgacao so aparece se a pagina tem link que realmente paga. */
export const hasAffiliate = (ids: readonly string[] = []) =>
  ids.some((id) => TOOLS[id as ToolId]?.earns === 'affiliate');
