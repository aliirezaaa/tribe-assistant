export type WebhookEvent = {
  data: {
    id: string;
    actor: { id: string };
    object: {
      spaceId: string;

      mappingFields: {
        key: string;
        value: string;
        type: string;
      }[];
    };
  };
};
