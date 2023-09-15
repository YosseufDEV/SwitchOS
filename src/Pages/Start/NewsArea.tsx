import ButtonIcon, { ButtonIconTheme } from "../../components/ButtonIcon/ButtonIcon";
import { colorSchemeDark } from "../../components/colors";
import NewsList from "./NewsList";

function NewsArea() {
    return (
        <div class="news-area">
            <div class="news-info">
                <NewsList />
                <div class="h-full w-full flex items-center justify-center">
                    <ButtonIcon 
                                buttonIconTheme={ButtonIconTheme.BUTTON_ICON_LIGHT} 
                                letter="Y" 
                                toolTip="Featured News" 
                                inStyle={{ 
                                    color: colorSchemeDark["ui-secondary"] 
                                    }}
                                iconWidth="60px"
                                fontSize={"35px"}
                                toolTipStyle={{ "letter-spacing": "1px" }}
                                iconStyle={{ margin: 0 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewsArea;
