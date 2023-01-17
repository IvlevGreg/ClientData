export function sortData(data, property, sortOrder = 0) {
  data.sort((a, b) => {
    switch (property) {
      case 'id':
        return sortOrder
          ? a[property] - b[property]
          : b[property] - a[property];
        break;

      case 'createdAt':
      case 'updatedAt':
        return sortOrder
          ? new Date(a[property]) - new Date(b[property])
          : new Date(b[property]) - new Date(a[property]);
        break;

      default:
        if (a[property] < b[property]) {
          return sortOrder ? -1 : 1;
        }
        if (a[property] > b[property]) {
          return sortOrder ? 1 : -1;
        }
        return 0;
        break;
    }
  });
  return data;
}
