import { Show } from "solid-js"
import PlusMinusIcon from "../../../public/assets/icons/ui/PlusMinusIcon.svg"
import { colorSchemeDark, colorSchemeLight } from "../colors";

type ButtonIconCustomTheme = readonly[buttonBackgroundColor: string, letterColor: string, textColor?: string] 

interface Props {
    letter: string,
    text?: string,
    width?: number,
    theme: ButtonIconCustomTheme,
    iconContainerStyle?: any
    textStyle?: any
}

const buttonIconTheme: any  = {
    lightTheme: [colorSchemeLight["ui-secondary"], colorSchemeLight.background] ,
    darkTheme: [colorSchemeDark["ui-secondary"], colorSchemeDark.background],
    lightThemeReversedText: [colorSchemeLight["ui-secondary"], colorSchemeLight.background, colorSchemeLight.background] ,
}

function ButtonIcon({ letter="A", theme=buttonIconTheme.lightTheme, text="OK", width=38, iconContainerStyle, textStyle }: Props ) {
    const iconColor = theme[0];
    const iconLetterColor = theme[1];
    const textColor = theme[2] ? theme[2] : iconColor;

    return (
        <div class="flex items-center justify-center">
            <div class="button-icon" style={{ width: `${width}px`, height: `${width}px`, background: iconColor, ...iconContainerStyle}} >
                <p style={{ scale: (width/38), color: iconLetterColor }}>{letter}</p>
            </div>
            <p class="button-tooltip" style={{ color: textColor, ...textStyle }}>{text}</p>
        </div>
    )
}

export default ButtonIcon
export {
    buttonIconTheme
}
