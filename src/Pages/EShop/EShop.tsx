import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { menuLifeCycleStartAnimation } from "../../components/Animations/GeneralAnimations";

let eShopContainerRef: HTMLDivElement;
function EShop() {
    createEffect(() => {
        if(useLocation().pathname == "/eshop")
        {
            menuLifeCycleStartAnimation(eShopContainerRef);
        }
    })

    return (
        <div ref={eShopContainerRef} class="eshop-container">eShop</div>
    )
}

export default EShop;
