export const getRandomBG = () => {
    const colors = [
      '#FF69B4', '#FFC0CB', '#FFA07A', '#FFA0C9',
      '#FF99CC', '#FFD700', '#ADFF2F', '#20B2AA',
      '#87CEEB', '#9370DB', '#FFB6C1', '#00FA9A',
      '#FF6347', '#40E0D0', '#DC143C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  