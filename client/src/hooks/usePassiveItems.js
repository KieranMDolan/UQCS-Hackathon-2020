import React, { useEffect, useState } from 'react'
import { SERVER } from '../appconstants';

const passiveURL = `${SERVER}resources/passive_items`;
export default function usePassiveItems() {
  const [passiveItems, setPassiveItems] = useState([]); //Else []
  useEffect(() => {
    (async () => {
      const result = await fetch(passiveURL);
      const json = await result.json();
      setPassiveItems(json);
    })();
  }, []);

  return passiveItems;
}
