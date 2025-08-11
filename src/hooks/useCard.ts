import { useState } from "react";

export interface UseCard {
  activeOptions: boolean;
  selectedCard: string;
  handleOpenOptions: (cardId: string) => void;
  handleCloseOptions: () => void;
}

export default function useCard() {
  const [activeOptions, setActiveOptions] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleOpenOptions = (cardId: string) => {
    setSelectedCard((prevState) => (prevState === cardId ? null : cardId));
    setActiveOptions(
      (prevState) => prevState === false || selectedCard !== cardId
    );
  };

  const handleCloseOptions = () => {
    setSelectedCard(null);
  };

  return {
    activeOptions,
    selectedCard,
    handleCloseOptions,
    handleOpenOptions,
  };
}
