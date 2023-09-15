import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { menuLifeCycleStartAnimation } from "../../components/Animations/GeneralAnimations";

function News() {
    let newsPageRef: HTMLDivElement;

    createEffect(() => {
        if(useLocation().pathname == "/news")
        {
            menuLifeCycleStartAnimation(newsPageRef);
        }
    })

    return (
        <div ref={newsPageRef} class="news">
        </div>
    )
}

export default News;
