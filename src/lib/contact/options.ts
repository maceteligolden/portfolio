import { services } from "@content/services";

const offerOrder = ["ai-product-development", "workflow-automation"];

export const serviceOptions = services
  .filter((service) => service.hub)
  .sort((a, b) => offerOrder.indexOf(a.slug) - offerOrder.indexOf(b.slug))
  .map((service) => ({
    value: service.title,
    label: service.title,
    description: service.outcome,
    slug: service.slug,
  }));

export const serviceValues = serviceOptions.map((option) => option.value) as [
  string,
  ...string[],
];
