import tinycolor from "tinycolor2"
import { gsap, Linear, Power0 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { footerRef } from "../Footer/Footer";

gsap.registerPlugin(CSSRulePlugin);

enum MenuLifeCycleAnimationType {
    ANIMATION_SCALE,
    ANIMATION_OPACITY
}

gsap.registerPlugin(CSSRulePlugin)
const ANIMATION_DURATION = 0.033;

function menuLifeCycleStartAnimation(currentMenuRef: HTMLDivElement, menuLifeCycleAnimationType: MenuLifeCycleAnimationType=MenuLifeCycleAnimationType.ANIMATION_SCALE) {
    const timeline = gsap.timeline(
        { 
            delay: 0.1,
            defaults: 
            { 
                duration: 0.2, 
                ease: Linear.easeNone
            } 
        });
    if(menuLifeCycleAnimationType == MenuLifeCycleAnimationType.ANIMATION_SCALE)
    {
        timeline
            .from(currentMenuRef, { scale: 0.97, autoAlpha: 0})
            .to(currentMenuRef, { scale: 1, autoAlpha: 1, }, "<")
            .to(footerRef, { opacity: 1 }, "<")
    }
    if(menuLifeCycleAnimationType == MenuLifeCycleAnimationType.ANIMATION_OPACITY)
    {
        timeline
            .from(currentMenuRef, { autoAlpha: 0})
            .to(currentMenuRef, { autoAlpha: 1, }, "<")
            .to(footerRef, { autoAlpha: 1 }, "<")
    }

}

function navigateFromElementWithAnimation(elementRef: HTMLDivElement, 
                                          iconRef: HTMLOrSVGElement, 
                                          navigationAnimationColor: string="#737675",
                                          callbackFunc: Function,
                                          navigatedURL: string,
                                          currentPage: HTMLDivElement) {
    const timeline = initializeNavigateFromIconTimeline(elementRef, 
                                                        callbackFunc, 
                                                        navigatedURL, 
                                                        currentPage);
    elementRef.classList.add("icon-navigation-started-border")
    navigateFromElementBorderAnimation(timeline, 
                                       navigationAnimationColor, 
                                       elementRef);
}

function initializeNavigateFromIconTimeline(elementRef: HTMLDivElement, 
                                            lifeCycleAnimationEndCallbackFunc: Function,
                                            destinationURL: string,
                                            currentPage: HTMLDivElement): GSAPTimeline {
    const timeline = gsap.timeline(
        { 
            delay: 0.06, 
            defaults: { 
                duration: 0.35,
                ease: Linear.easeNone
            },
            onComplete: () => { 
                navigateFromElementWithAnimationCallbackFunc(timeline,
                                                             elementRef,
                                                             currentPage,
                                                             destinationURL,
                                                             lifeCycleAnimationEndCallbackFunc);
                            }
        });
    return timeline;
}

function navigateFromElementBorderAnimation(timeline: GSAPTimeline,
                                            navigationAnimationColor: string,
                                            elementRef: HTMLDivElement) {
    const rule = CSSRulePlugin.getRule(".icon-navigation-started-border::after")
    timeline
        .from(rule, {
            background: tinycolor(navigationAnimationColor).lighten(20).toString(),
            opacity: 1,
            inset: 0,
            clearProps: "all",
        })
        .from(elementRef, {
            background: "rgb(253, 253, 255)",
        }, "<")
        .to(rule, {
            opacity: 0.75,
            inset: "-16.5px",
            clearProps: "all",
        }, "<")
        .to(rule, {
            opacity: 0,
            inset: "-28.5px",
        }, "<")
        .to(elementRef, {
            background: tinycolor(navigationAnimationColor).lighten(20).toString(),
            yoyo: true,
            repeat: 1,
            duration: 0.175
        }, "<")
}

function navigateFromElementWithAnimationCallbackFunc(timeline: GSAPTimeline, 
                                                      elementRef: HTMLDivElement, 
                                                      currentPage: HTMLDivElement,
                                                      destinationURL: string,
                                                      lifeCycleAnimationEndCallbackFunc: Function) {
    if(destinationURL) 
    {
        menuLifeCycleEndAnimation(
            currentPage, 
            lifeCycleAnimationEndCallbackFunc, 
            MenuLifeCycleAnimationType.ANIMATION_SCALE,
            true
        );
    }

    elementRef.classList.remove("icon-navigation-started-border")
    timeline.progress(0);
    timeline.kill();

}

function menuLifeCycleEndAnimation(currentMenuRef: HTMLDivElement,  
                                   callbackFunc: Function, 
                                   menuLifeAnimationType: MenuLifeCycleAnimationType = MenuLifeCycleAnimationType.ANIMATION_SCALE,
                                   delay?: boolean) {
    const timeline = gsap.timeline(
        { 
            onComplete: () => { callbackFunc() },
            defaults: 
                { 
                    duration: 0.15, 
                    ease: Linear.easeOut
                } 
        });
    if(menuLifeAnimationType == MenuLifeCycleAnimationType.ANIMATION_SCALE) 
    {
        timeline
            .to(currentMenuRef, { scale: 1.1, opacity: 0 })
            .to(footerRef, { opacity: 0 }, "<")
    }
    else if(menuLifeAnimationType == MenuLifeCycleAnimationType.ANIMATION_OPACITY)
    {
        timeline
            .to(currentMenuRef, { opacity: 0 })
            .to(footerRef, { opacity: 0 }, "<")
    }
    gsap.to(footerRef, { opacity: 0, duration: 0.15 })
}

function showElementAnimated(...elements: HTMLElement[]) {  
    if(elements.length != 0)
    {
        elements.forEach(el => gsap.to(el, { opacity: 1, duration: ANIMATION_DURATION }));
    }
}

function hideElementAnimated(...elements: HTMLElement[]) {  
    if(elements.length != 0)
    {
        elements.forEach(el => gsap.to(el, { opacity: 0, duration: ANIMATION_DURATION }));
    }
}

const selectedItemBorderAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0, })

function initializeSelectedItemBorderAnimation() {
    const borderInitialGradient = "linear-gradient(45deg, rgba(81,196,195,1) 0%, rgba(11,174,192,1) 100%)" 
    const borderFinalGradient =  "linear-gradient(45deg, rgba(89,245,218,1) 0%, rgba(88,251,226,1) 100%)"

    selectedItemBorderAnimationTimeline
        .from(".selected-outer-border",
            {
                delay: 0.1,
                background: borderInitialGradient,
                duration: 0,
            })
        .to(".selected-outer-border", 
            { 
                background: borderFinalGradient,
                duration: 0.4,
            })
}

export {
    menuLifeCycleStartAnimation,
    menuLifeCycleEndAnimation,
    navigateFromElementWithAnimation,
    initializeSelectedItemBorderAnimation,
    showElementAnimated,
    hideElementAnimated,
    MenuLifeCycleAnimationType,
}
