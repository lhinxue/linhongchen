import Vibrant from "node-vibrant";

const getImageThemeColor = async (imageUrl) => {
    try {
        const palette = await Vibrant.from(imageUrl).getPalette();
        // Assuming you want the dominant color
        const dominantColor = palette.Vibrant.hex;
        return dominantColor;
    } catch (error) {
        console.error("Error extracting color:", error);
        return null;
    }
};

export default getImageThemeColor;
