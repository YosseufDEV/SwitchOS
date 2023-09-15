import { createEffect, createSignal } from "solid-js";

import Option, { OptionIconTypes } from "../Option/Option";

import NewsIcon from "../../../public/assets/icons/ui/switch_news_new_icon.svg";
import EShopIcon from "../../../public/assets/icons/ui/switch_eshop_icon.svg";
import AlbumIcon from "../../../public/assets/icons/ui/switch_album_icon.svg";
import ControllersIcon from "../../../public/assets/icons/ui/switch_controllers_icon.svg";
import SettingsIcon from "../../../public/assets/icons/ui/switch_settings_icon.svg";
import SleepModeIcon from "../../../public/assets/icons/ui/switch_sleep_mode_icon.svg";

const [ options, setOptions ] = createSignal([] as Node[]);

function OptionsList() {
    let optionsListRef: HTMLDivElement;
    createEffect(() => {
        setOptions(optionsListRef.childNodes);
    })

    return (
        <div ref={optionsListRef} class="options-list">
            <Option iconStyle={{ width: "63px" }} 
                    fillColor="#eb4152" 
                    iconType={OptionIconTypes.OPTION_NEWS} 
                    optionName="News" 
                    navigationURL="news"
                    IconSvg={NewsIcon} />

            <Option navigationURL="eshop" 
                    iconStyle={{ "margin-bottom": "8px", width: "65px", }} 
                    fillColor="#f9a107" 
                    iconType={OptionIconTypes.OPTION_ESHOP} 
                    optionName="Nintendo eShop" 
                    IconSvg={EShopIcon} />

            <Option iconStyle={{ width: "63px" }} 
                    fillColor="#2970f6" 
                    iconType={OptionIconTypes.OPTION_ALBUM} 
                    optionName="Album" 
                    IconSvg={AlbumIcon} />

            <Option iconStyle={{width: "69px"}} 
                    iconType={OptionIconTypes.OPTION_CONTROLLERS} 
                    optionName="Controllers" 
                    IconSvg={ControllersIcon} />

            <Option iconStyle={{ width: "64px" }} 
                    iconType={OptionIconTypes.OPTION_SETTINGS} 
                    optionName="System Settings" 
                    IconSvg={SettingsIcon} />

            <Option iconStyle={{ width: "57px", "margin-bottom": "5px" }} 
                    iconType={OptionIconTypes.OPTION_SLEEP_MODE} 
                    optionName="Sleep Mode" 
                    IconSvg={SleepModeIcon} />
        </div>
    )
}

export default OptionsList

export {
    options 
}
