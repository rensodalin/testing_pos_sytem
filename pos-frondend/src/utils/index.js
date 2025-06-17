export const getRandomBG = () => {
    const colors = [
      '#FF69B4', '#FFC0CB', '#FFA07A', '#FFA0C9',
      '#FF99CC', '#FFD700', '#ADFF2F', '#20B2AA',
      '#87CEEB', '#9370DB', '#FFB6C1', '#00FA9A',
      '#FF6347', '#40E0D0', '#DC143C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

export const getBgColor =() => {
    const bgarr = ["#b73e3e" ,"#5b45b0","#7f167f" ,"#735f32" ,"#1d2569" ,"#285430"]
    const randomBg = Math.floor(Math.random() * bgarr.length);
    const color = bgarr[randomBg];
    return color;
}
  