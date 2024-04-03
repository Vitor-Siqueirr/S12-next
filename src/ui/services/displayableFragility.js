export const displayableFragility = (fragility) => {
  const matrix = {
    1: "Very Robust",
    2: "Robust",
    3: "Common",
    4: "Fragile",
    5: "Very Fragile",
  };

  return matrix[fragility];
};
