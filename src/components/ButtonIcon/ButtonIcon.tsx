import { CSSProperties } from "react"
import { Show } from "solid-js"
import PlusMinusIcon from "../../../public/assets/icons/ui/PlusMinusIcon.svg"
import colors from "../colors"

interface Props {
    letter: string,
    toolTip?: string,
    background?: boolean,
    textColor?: string,
    inStyle?: object,
    iconStyle?: CSSProperties,
    toolTipStyle?: CSSProperties,    
    iconWidth?: string,
    fontSize?: string,
    isMinusPlus?: boolean,
    buttonIconTheme?: ButtonIconTheme,
    presetClass?: string,
}
enum ButtonIconTheme {
    BUTTON_ICON_LIGHT,
    BUTTON_ICON_INVERTED
}

function ButtonIcon({ 
                        scale=1, 
                        isMinusPlus=false, 
                        letter="A", 
                        buttonIconTheme=ButtonIconTheme.BUTTON_ICON_INVERTED, 
                        toolTip="OK", 
                        toolTipStyle,
                        inStyle,
                        iconStyle,
                        iconWidth,
                        fontSize,
                        }: Props ) {
    const isLightTheme = buttonIconTheme == ButtonIconTheme.BUTTON_ICON_LIGHT;
    // TODO : Edit the plus/minus icon to only a plus with a background circle
    return (
        <Show when={isMinusPlus} 
        fallback={
            <div style={{ scale: scale, ...inStyle }} class="flex items-center justify-center">
                <div style={{ ...iconStyle, 
                                 width: iconWidth, 
                                 height: iconWidth } } 
                    class={isLightTheme ? "button-icon-light" : "button-icon-inverted"} >
                    <p style={{ scale: (Number(iconWidth?.slice(0, iconWidth.length-2))/38)}}>{letter}</p>
                </div>
                <Show when={toolTip}>
                    <p style={{ "font-size" : fontSize, ...toolTipStyle}} 
                       class={isLightTheme ?  "button-tooltip-inverted" : "button-tooltip-light" }>{toolTip}</p>
                </Show>
            </div>
        }>
            <PlusMinusIcon class="w-[95px] mr-[5px] ml-[60px] fill-[#2D2D2D]"/* class={presetClass} */ />
            <p class={isLightTheme ?  "button-tooltip-inverted" : "button-tooltip-light" }>{toolTip}</p>
        </Show>
    )
}

export default ButtonIcon
export {
    ButtonIconTheme
}
