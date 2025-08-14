import { useState } from "react";

export interface UseCard {
  activeOptions: boolean;
  selectedCard: string | null;
  handleOpenOptions: (cardId: string) => void;
  handleCloseOptions: () => void;
}

export default function useCard() {
  const [activeOptions, setActiveOptions] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleOpenOptions = (cardId: string) => {
    setSelectedCard((prev) => {
      const willOpen = prev !== cardId;
      if (willOpen) {
        setActiveOptions(true);
        return cardId;
      }
      setActiveOptions(false);
      return null;
    });
  };

  const handleCloseOptions = () => {
    setSelectedCard(null);
    setActiveOptions(false);
  };

  return {
    activeOptions,
    selectedCard,
    handleCloseOptions,
    handleOpenOptions,
  };
}
