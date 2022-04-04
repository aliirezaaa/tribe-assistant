export type Content = {
  data: {
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
