import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { setActivePage } from "../../App";
import { menuLifeCycleEndAnimation } from "../../components/Animations/GeneralAnimations";

import MainArea, { animateHomeIcon } from "./MainArea";
import NewsArea from "./NewsArea";

function Start() {
    // INFO: useNavigate() Hook should be in the the component top level
    const navigate = useNavigate() 
    let startRef: HTMLDivElement;
    
    function handleStartNavigate() {
        const callbackFunc = () => {
            navigate("/home");
        }

        animateHomeIcon().then(() => menuLifeCycleEndAnimation(startRef, callbackFunc))
    }

    createEffect(() => {
        if(useLocation().pathname == "/") 
        {
            setActivePage(startRef);
        }
    })

    return (
        <div ref={startRef} onClick={() => handleStartNavigate() } class="start-wrapper">
            <NewsArea />
            <MainArea />
        </div>

    )
}

export default Start;
