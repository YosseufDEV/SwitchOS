import ButtonIcon, { buttonIconTheme } from "../../components/ButtonIcon/ButtonIcon";
import { colorSchemeLight } from "../../components/colors";
import NewsList from "./NewsList";

function NewsArea() {
    return (
        <div class="news-area">
            <div class="news-info">
                <NewsList />
                <div class="h-full w-full flex items-center justify-center">
                    <ButtonIcon 
                        theme={[...buttonIconTheme.lightTheme, colorSchemeLight.background]} 
                        letter="Y" 
                        text="Featured News" 
                        textStyle={{ "font-size": "35px" }}
                        width={60}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewsArea;
