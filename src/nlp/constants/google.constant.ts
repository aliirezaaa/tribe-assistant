/**
 * @constant
 * This class provides all constants that need for Google NLP service
 * Sentiments object shows how sentiment score transfers to a human-friendly string
 */
export const Sentiments = {
  ranges: [
    {
      name: 'very negative',
      rangeNumbers: [-1, -0.75],
    },
    {
      name: 'negative',
      rangeNumbers: [-0.75, -0.25],
    },
    {
      name: 'neutral',
      rangeNumbers: [-0.25, 0.25],
    },
    {
      name: 'positive',
      rangeNumbers: [0.25, 0.75],
    },
    {
      name: 'very positive',
      rangeNumbers: [0.75, 1],
    },
  ],
};
