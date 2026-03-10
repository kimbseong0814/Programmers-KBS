export const store = {
  currentFunds: 0,
  isFirstEdit: true,
  todayId: 1,
  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  let storage = sessionStorage.getItem("store");

  if (!storage) {
    updateStorage();
    storage = sessionStorage.getItem("store");
  }

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    if (store.detailList[store.todayId]) {
      store.detailList[store.todayId].push(newHistory);
    } else {
      store.detailList[store.todayId] = [newHistory];
    }

    store.currentFunds -= newHistory.amount;
    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    const target = store.detailList[dateId];
    if (!target) return false;

    const deletedItem = target.find((item) => String(item.id) === String(itemId));
    if (!deletedItem) return false;

    store.currentFunds += deletedItem.amount;

    store.detailList[dateId] = target.filter(
      (item) => String(item.id) !== String(itemId)
    );

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}