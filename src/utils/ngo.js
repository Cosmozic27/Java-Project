export function filterNgoFood(food, { search = '', category = '', dietary = '', area = '', status = '' } = {}) {
  const query = search.trim().toLowerCase();
  return food.filter((item) => {
    const matchesSearch = !query || [item.name, item.donor, item.location, item.area, item.category, item.quantity]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
    return matchesSearch
      && (!category || item.category === category)
      && (!dietary || item.dietary === dietary)
      && (!area || item.area === area)
      && (!status || item.status === status);
  });
}

export function filterNgoClaims(claims, { search = '', status = '', category = '' } = {}) {
  const query = search.trim().toLowerCase();
  return claims.filter((claim) => {
    const matchesSearch = !query || [claim.id, claim.foodName, claim.donor, claim.location, claim.quantity]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (!status || claim.status === status) && (!category || claim.category === category);
  });
}

export function formatNgoStatus(status, labels) {
  return labels[status] || status;
}
