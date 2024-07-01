// utils/randomColor.js
const opacity = '0.4';
const predefinedColorsWithOpacity = [
    `rgba(108, 92, 231, ${opacity})`,
    `gba(116, 185, 255, ${opacity})`,
    `gba(129, 236, 236, ${opacity})`,
    `rgba(85, 239, 196, ${opacity})`,
    `rgba(225, 112, 85, ${opacity})`,
    `gba(255, 118, 117, ${opacity})`,
    `rgba(34, 166, 179, ${opacity})`
];


function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * predefinedColorsWithOpacity.length);
    return predefinedColorsWithOpacity[randomIndex];
}

export default getRandomColor;
