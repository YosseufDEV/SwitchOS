import { theme, Themes } from "../../App";
import { colorSchemeDark, colorSchemeLight } from "../colors";

interface Props {
    width?: string,
    height?: string,
    ori?: string,
    color?: string,
    inStyle?: StyleSheet
}

function Seperator({ ori="horizonal", width, height, inStyle } : Props ) {
    const defaultColor = theme() == Themes.THEME_LIGHT ? colorSchemeLight['ui-secondary'] : colorSchemeDark['ui-secondary']
    let tempwidth = width ? width : ori=="vertical" ? "1.5px" : "calc( 100% - 45*2)";
    let tempheight = height ? height : ori=="vertical" ? "200%" : "1.5px";

    return <div style={{ 'min-width': tempwidth, 'min-height': tempheight, background: defaultColor, ...inStyle}}/>
}

export default Seperator;
