import React, { useContext, useMemo } from 'react'
import UserContext from '../components/UserContext';
import usePassiveItems from './usePassiveItems';

export default function useUpgradeList() {
  const passiveItems = usePassiveItems();
  const user = useContext(UserContext);
  return useMemo(() => {
    let sumItems = {};
    if (user) {
      sumItems = passiveItems.reduce((acc, curr) => {
        const id = curr._id;
        const itemCount = user.passive_items.reduce((sum, item) => (item === id) ? sum + 1 : sum, 0);
        acc[curr._id] = itemCount;
        return acc;
      }, {});
    }
    return passiveItems.map((item) => ({ ...item, count: sumItems[item._id] }));
  }, [user, passiveItems]);
}
