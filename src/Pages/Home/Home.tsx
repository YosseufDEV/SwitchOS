import { Component, createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";

import { navigator, setActiveElement, setActivePage } from "../../App";
import { menuLifeCycleStartAnimation } from "../../components/Animations/GeneralAnimations";
import { profilesList } from "../../components/Lists/ProfilesList";
import { softwareList } from "../../components/Lists/SoftwareList";
import { options } from "../../components/Lists/OptionsList";
import TopPart from "../../components/layout/TopPart/TopPart"
import MiddlePart from "../../components/layout/MiddlePart/MiddlePart"
import BottomPart from "../../components/layout/BottomPart/BottomPart"

function Home() {
    let parentRef: HTMLDivElement;

    createEffect(() => {
        if(useLocation().pathname == "/home") 
        {
            menuLifeCycleStartAnimation(parentRef);
            setActivePage(parentRef);
        }
        if(softwareList() != null)
        {
            const homeNavigationArray = [ profilesList(), softwareList(), options() ];
            setActiveElement(homeNavigationArray[1][0]);
            navigator.setNavigationArray(homeNavigationArray);
        }
    })

    return (
            <div ref={parentRef} class="wrapper"> 
                <TopPart/>
                <MiddlePart />
                <BottomPart />
            </div>
    );
};

export default Home;
