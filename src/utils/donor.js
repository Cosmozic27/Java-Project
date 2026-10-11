export function filterDonations(
  donations,
  { search = '', status = '', category = '' } = {}
) {
  const query = String(search).trim().toLowerCase();

  return donations.filter((donation) => {
    const searchValues = [
      donation.name,
      donation.category,
      donation.location,
      donation.quantity,
      donation.claimant,
    ];

    const matchesSearch =
      !query ||
      searchValues
        .filter((value) => value !== null && value !== undefined)
        .some((value) => String(value).toLowerCase().includes(query));

    const matchesStatus = !status || donation.status === status;

    const matchesCategory = !category || donation.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export function formatStatus(status, labels) {
  return labels[status] || status;
}