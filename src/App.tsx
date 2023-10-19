import { Component, createEffect, createSignal, Show } from "solid-js"
import { Route, Routes, useLocation } from "@solidjs/router";

import { initializeSelectedItemBorderAnimation } from "./components/Animations/GeneralAnimations";
import Start from "./Pages/Start/Start";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import EShop from "./Pages/EShop/EShop";
import Navigator from "./Pages/Navigator/Navigator";
import playAudio, { AudioEvents } from "./components/SoundPlayer/SoundPlayer";
import News from "./Pages/News/News";
import NewsIcon from "../public/assets/icons/ui/switch_settings_icon.svg";
import Header from "./components/Header/Header";

enum ActiveElementType {
    ELEMENT_SOFTWARE,
    ELEMENT_SOFTWARE_PLACEHOLDER,
    ELEMENT_PROFILE,
    ELEMENT_OPTION
}

enum Themes {
    THEME_LIGHT,
    THEME_DARK,
}

const [activeElement, setActiveElement] = createSignal<HTMLDivElement | null>();
const [showHeader, setShowHeader] = createSignal<boolean>(true);
const [activeElementType, setActiveElementType] = createSignal<ActiveElementType>();
const [activePage, setActivePage] = createSignal<HTMLDivElement | null>();
const [theme, setTheme] = createSignal<Themes>(Themes.THEME_LIGHT);

const navigator = new Navigator(); 
navigator.freeze();

function afterNavigationFunction() {
    const activeIndex = navigator.activeElementIndexInArray;
    const navigationArray = navigator.navigationArray;
    const activeElement = navigationArray[activeIndex[1]][activeIndex[0]]

    setActiveElement(activeElement);
    // playAudio(AudioEvents.SELECT_GENERAL);
}

function afterConfirmationFunction() {
    switch(activeElementType()) {
        case ActiveElementType.ELEMENT_OPTION: {

        }
    }
}

navigator.attachAfterNavigationFunction(afterNavigationFunction);
navigator.attachAfterConfirmationFunction()

const App: Component = ()  => {
    createEffect(() => {
        if(useLocation().pathname != "/")
        {
            initializeSelectedItemBorderAnimation();
            console.log(navigator);
        }
    })

    return (
        <>
            <Routes>
                <Route path="/" component={Start}/>
                <Route path="/home" component={Home}/>
                <Route path="/eshop" component={EShop}/>
                <Route path="/news" component={News}/>
            </Routes>
            <Show when={ useLocation().pathname != "/" }>
                <div class="w-[100%] bottom-0 fixed">
                    <Footer />
                </div>
            </Show>
        </>
    );
}

export default App;

export {
    activeElement,
    setActiveElement,
    setActiveElementType,
    activeElementType,
    ActiveElementType,
    activePage,
    setActivePage,
    theme,
    setTheme,
    Themes,
    navigator,
}
