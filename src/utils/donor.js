export function filterDonations(donations, { search = '', status = '', category = '' } = {}) {
  const query = search.trim().toLowerCase();

  return donations.filter((donation) => {
    const matchesSearch = !query
      || [donation.name, donation.category, donation.location, donation.quantity, donation.claimant]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    const matchesStatus = !status || donation.status === status;
    const matchesCategory = !category || donation.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export function formatStatus(status, labels) {
  return labels[status] || status;
}
