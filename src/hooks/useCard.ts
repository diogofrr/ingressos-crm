import { useState } from "react";

export interface UseCard {
  activeOptions: boolean
  selectedCard: number
  handleOpenOptions: (cardId: number) => void
  handleCloseOptions: () => void
}

export default function useCard() {
  const [activeOptions, setActiveOptions] = useState(false);
  const [selectedCard, setSelectedCard] = useState(-1);

  const handleOpenOptions = (cardId: number) => {
    setSelectedCard(prevState => (prevState === cardId ? -1 : cardId));
    setActiveOptions(prevState => prevState === false || selectedCard !== cardId);
  };

  const handleCloseOptions = () => {
    setSelectedCard(-1)
  }

  return {
    activeOptions,
    selectedCard,
    handleCloseOptions,
    handleOpenOptions
  }
}