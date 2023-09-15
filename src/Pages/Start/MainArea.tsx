import gsap, { Linear } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import Status from "../../components/layout/TopPart/Status";
import HomeIcon from "../../../public/assets/icons/ui/switch_home_icon_circle.svg";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";

gsap.registerPlugin(CSSRulePlugin);

// TODO: Polish the animation
function animateHomeIcon() {
    const rule = CSSRulePlugin.getRule(".home-icon-navigation-started-border::after");
    const timeline = gsap.timeline({ defaults: { duration: 0.2, ease: Linear.easeNone } })
    timeline
        .from(rule, {
            opacity: 0.215,
            inset: 40+"px",
        })
        .to(rule, {
            opacity: 0.215,
            inset: "-8px",
        }, "<")
        .to(rule, {
            opacity: 0,
            inset: "-16.5px",
        }, ">")
    return timeline;
}

function MainArea() {
    return (
        <div class="main-area">
            <div class="main-top-area">
                <Status/>
            </div>
            <div class="home-icon-container home-icon-navigation-started-border flex justify-center items-center">
                <HomeIcon class="icon-navigation-started-border" />
            </div>
            <div class="continue-button absolute bottom-[90px]">
                <ButtonIcon 
                            letter="A" 
                            toolTip="Continue" 
                            iconWidth="60px"
                            fontSize={"35px"}
                            toolTipStyle={{ "letter-spacing": "1px" }}
                            iconStyle={{ "margin-left": 0, }}
                />
            </div>
        </div>
    );
}

export default MainArea;
export { animateHomeIcon }
