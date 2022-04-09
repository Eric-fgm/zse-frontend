import { useMemo, useState } from "react";

export default function useSelect() {
  const [selectedEntities, setSelectedEntities] = useState<{
    [key: string]: boolean;
  }>({});

  const selectedEntitiesCount = useMemo(
    () => Object.values(selectedEntities).length,
    [selectedEntities]
  );

  const handleSelect = (id: number) => () => {
    setSelectedEntities((prevSelectedEntities) => {
      const selectedEntitiesCopy = { ...prevSelectedEntities };
      const isSelected = selectedEntitiesCopy[id];
      if (isSelected) delete selectedEntitiesCopy[id];
      else selectedEntitiesCopy[id] = true;
      return selectedEntitiesCopy;
    });
  };

  const handleUnselectAll = () => {
    setSelectedEntities({});
  };

  return {
    selectedEntities,
    selectedEntitiesCount,
    handleSelect,
    handleUnselectAll,
  };
}
