export const normalizeName = (name: string) => {
  const capitalizedName = name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

  const [last, first] = capitalizedName.split(', ');

  return `${first} ${last}`;
};
