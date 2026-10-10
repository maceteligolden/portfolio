export interface ProductSpotlightInterface {
  slug: string;
  problem: string;
  solution: string;
  gap: string;
  ctaLabel: string;
  hrefKind: "live" | "case-study";
  direction?: string;
}

export const productsContent = {
  seoTitle: "Products",
  metaDescription:
    "Bloggr is a product you can try. WatchNode is a system Golden built that is no longer online.",
  h1: "One product you can try",
  opening:
    "Bloggr is online. It learns a business and uses that to suggest topics, research, and posts. WatchNode is a system I built for anomaly detection. It is no longer online, so the case study is the record of it. These are products I own, not client projects.",
};

export const productSpotlights: ProductSpotlightInterface[] = [
  {
    slug: "bloggr",
    problem:
      "You sit down to write and the tool has forgotten your business. A chat session does not know your audience, your voice, or what you are not allowed to say.",
    solution:
      "You give Bloggr your website, or you talk to it. It keeps a profile of the business and uses that to suggest topics, an outline, research, and posts. You approve anything that goes live.",
    direction:
      "The direction is a system that understands the business identity, turns goals into marketing KPIs and content goals, reads how the content is received, and adjusts the strategy until those KPIs are met. That is not what it does today.",
    gap: "A general chat forgets the business after the session. Bloggr keeps the profile, and it will not publish until you say so.",
    ctaLabel: "Try Bloggr",
    hrefKind: "live",
  },
  {
    slug: "watchnode",
    problem:
      "Rules catch the failures you already named. They miss patterns in logs and spreadsheets you have not written a rule for.",
    solution:
      "WatchNode scored logs and spreadsheet data for semantic, sequential, statistical, and temporal anomalies, with the scoring on a queue so it did not block ingestion. The hosted product is no longer online.",
    gap: "The case study explains the system. There is no signup.",
    ctaLabel: "Read the WatchNode case study",
    hrefKind: "case-study",
  },
];
