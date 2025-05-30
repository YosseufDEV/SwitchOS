import { createEffect, Show } from "solid-js"

import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

import { activeElement, setActiveElement, setActiveElementType, ActiveElementType} from "../../App"
import { hideElementAnimated, showElementAnimated } from "../Animations/GeneralAnimations"
import Profile from "../Profile/Profile"
import ButtonIcon from "../ButtonIcon/ButtonIcon"
import { colorSchemeLight } from "../colors"

interface Props {
    coverSrc?: string,
    softwareTitle?: string,
    empty?: boolean,
    testingComponent?: boolean,
}

gsap.registerPlugin(CSSRulePlugin)

function setupSoftwareTitle(softwareTitle: HTMLParagraphElement, 
                            softwareTitleContainer: HTMLDivElement, 
                            softwareTitleClone?: HTMLParagraphElement,
                            software?: HTMLDivElement) {
    if(softwareTitleClone) 
    {
        setupSoftwareTitleFade(softwareTitleContainer);
        const marqueeTitleTimeline = setupSoftwareTitleMarqueeAnimation(software, softwareTitle, softwareTitleClone);
        return marqueeTitleTimeline;
    }
    else
    {
        /*INFO : 
          Because element position position is absolute and by default the element is in center I needed to make it
          initial to return to its default position ( in center )
        */ 
        softwareTitleContainer.style['left'] = "initial"; 
        softwareTitle.style['marginRight'] = '0';
    }
}

function setupSoftwareTitleFade(softwareTitleContainer: HTMLDivElement) {
    softwareTitleContainer.append(<div class="fade-left" />, <div class="fade-right" />)
}

function setupSoftwareTitleMarqueeAnimation(software: HTMLDivElement, 
                                            softwareTitle: HTMLParagraphElement, 
                                            softwareTitleClone: HTMLParagraphElement) {
    const timeline = softwareTitleMarqueeAnimation(software, softwareTitle, softwareTitleClone);
    timeline.pause();
    return timeline;
}

function softwareTitleMarqueeAnimation(
                                    softwareRef: HTMLDivElement,
                                    ref: HTMLParagraphElement, 
                                    refClone: HTMLParagraphElement) {
    const timeline = gsap.timeline({ 
        repeat: -1,
        repeatDelay: 2,
        delay: 2,
        defaults: 
            { 
                duration: 13, 
            } 
        })
    const $ = gsap.utils.selector(softwareRef);
    const softwareRefFadeLeft = $(".fade-left");

    timeline
        .to(ref, { 
            xPercent: -100,
            x: -60,
            ease: "linear" 
            }, "<")
        .to(softwareRefFadeLeft, 
            {  opacity: 1,
                duration: 0.05, 
            }, "<")
        .to(refClone, 
            { 
                xPercent: -100,
                x: -60,
                ease: "linear",
            }, 
            "<")
        .to(softwareRefFadeLeft, 
            { 
                opacity: 0, 
                duration: 0.05 
            })
    return timeline;
}

function selectSoftware(softwareRef: HTMLDivElement, 
                        borderRef: HTMLDivElement, 
                        titleContainerRef: HTMLParagraphElement,
                        empty: boolean,
                        changeUserContainerRef?: HTMLDivElement,
                        isRunning?: boolean,
                        marqueeTitleTimeline?: GSAPTimeline) {
    selectSoftwareAnimation(softwareRef, borderRef, empty);
    setActiveElement(softwareRef);
    setActiveElementType(ActiveElementType.ELEMENT_SOFTWARE_PLACEHOLDER);

    if(!empty)
    {
        setActiveElementType(ActiveElementType.ELEMENT_SOFTWARE);
        showElementAnimated(titleContainerRef);
        if(isRunning)
        {
            showElementAnimated(changeUserContainerRef);
        }
    }

    if(marqueeTitleTimeline)
    {
        showTitleFade(titleContainerRef);
        marqueeTitleTimeline.restart(true);
    }

}

function selectSoftwareAnimation(softwareRef: HTMLDivElement, 
                                 borderRef: HTMLDivElement, 
                                 empty: boolean) {
    const $ = gsap.utils.selector(softwareRef);

    if(empty == false) 
    {
        gsap.to($(".software-selected-inner-border"), 
        { 
            boxShadow: "0px 0px 0px 5.5px rgba(245, 245, 247, 1), 0px 0px 15px rgba(0, 0, 0, 0)", 
            duration: 0.033,
        })
    }

    showElementAnimated(borderRef)
}

function showTitleFade(softwareTitleContainer: HTMLDivElement) {
    const $ = gsap.utils.selector(softwareTitleContainer);
    gsap.to($(".fade-right"), { opacity: 1, duration: 0 });
}


function unselectSoftware(softwareRef: HTMLDivElement, 
                          borderRef: HTMLDivElement, 
                          titleRef: HTMLParagraphElement,
                          titleContainerRef: HTMLDivElement,
                          changeUserContainerRef?: HTMLDivElement,
                          isRunning?: boolean,
                          marqueeTitleTimeline?: GSAPTimeline,
                          empty?: boolean) {
    hideElementAnimated(borderRef);
    if(marqueeTitleTimeline) 
    {
        marqueeTitleTimeline.pause();
    }
    if(empty == false)
    {
        hideSoftwareTitle(titleRef, titleContainerRef);
        hideSoftwareSelectedInnerBorder(softwareRef);
        if(isRunning && changeUserContainerRef) 
        {
            hideElementAnimated(changeUserContainerRef);
        }
    }
}

function hideSoftwareTitle(softwareTitle: HTMLParagraphElement, 
                       softwareTitleContainer: HTMLDivElement) {
    // HACK : Need to figure a way to change it to be more dynamic 
    const isSlidingTitle = softwareTitle.innerText.length*25.92 >= 708; 

    if(isSlidingTitle)
    {
        hideSoftwareTitleMarqueePadding(softwareTitleContainer);
    }

    hideElementAnimated(softwareTitleContainer);
}

function hideSoftwareTitleMarqueePadding(softwareTitleContainer: HTMLDivElement) {
    const $ = gsap.utils.selector(softwareTitleContainer);
    gsap.to($(".fade-left"), { opacity: 0, duration: 0, delay: 0.03 });
    gsap.to($(".fade-right"), { opacity: 0, duration: 0, delay: 0.03 });
}

function hideSoftwareSelectedInnerBorder(softwareRef: HTMLDivElement) {
    const $ = gsap.utils.selector(softwareRef);
    const selectedInnerBorder = $(".software-selected-inner-border");

    gsap.to(selectedInnerBorder, { 
        boxShadow: "0px 0px 0px 5.5px rgba(255, 255, 255, 0), 0px 0px 15px rgba(0, 0, 0, 0)",
        duration: 0.033 
    })
}

function animateSoftwarePlayingProfilePicture(profilePictureRef: HTMLDivElement) {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5, defaults: { duration: 0.6/4 } });
    timeline    
        .to(profilePictureRef, { scaleY: 65/70, scaleX: 75/70, translateY: "5px" })
        .to(profilePictureRef, { scaleY: 75/70, scaleX: 1, translateY: "-10px" })
        .to(profilePictureRef, { scaleY: 1, translateY: "7px" })
        .to(profilePictureRef, { scaleX: 75/70, scaleY: 65/70 }, "<")
        .to(profilePictureRef, { translateY: 0, scale: 1 })
}

function Software({ coverSrc, softwareTitle = "software_placeholder_title", empty = false, testingComponent=false}: Props) {
    let softwareRef: HTMLDivElement;
    let borderRef: HTMLDivElement;
    let titleContainerRef: HTMLDivElement;
    let titleRef: HTMLParagraphElement;
    let titleCloneRef: HTMLParagraphElement;
    let titleIsSetuped: boolean = false;
    let marqueeTitleTimeline: GSAPTimeline;
    let softwareIsPlayingProfilePictureRef: HTMLDivElement;
    let isRunning:boolean = testingComponent;
    let changeUserContaienrRef: HTMLDivElement;

    createEffect(() => {
        animateSoftwarePlayingProfilePicture(softwareIsPlayingProfilePictureRef);
        console.log(softwareIsPlayingProfilePictureRef);
    }) 

    createEffect(() => {
        if(activeElement() == softwareRef) 
        {
            selectSoftware(softwareRef, 
                           borderRef, 
                           titleContainerRef,
                           empty,
                           changeUserContaienrRef,
                           isRunning,
                           marqueeTitleTimeline);
        } 
        else 
        {
            unselectSoftware(softwareRef, 
                             borderRef, 
                             titleRef, 
                             titleContainerRef, 
                             changeUserContaienrRef,
                             isRunning,
                             marqueeTitleTimeline,
                             empty);
        }

        if(titleRef && !titleIsSetuped)
        {
            const returnedTimeline = setupSoftwareTitle(titleRef, titleContainerRef, titleCloneRef, softwareRef);;

            if(returnedTimeline)
            {
                marqueeTitleTimeline = returnedTimeline;
            }

            titleIsSetuped = true;
        }
    })

    return (
        <div ref={softwareRef} 
             class={!empty ? "software" : "software software-placeholder" }>
            <Show when={!empty}>
                <img src={coverSrc} class="software-cover"  />
            </Show>
            { !empty && 
            <div ref={titleContainerRef} class="software-title-container">
                <p ref={titleRef}>{softwareTitle}</p>
                { softwareTitle.length * 25.92 >= 708 && <p ref={titleCloneRef}>{softwareTitle}</p> }
            </div> }
            <div class="software-selected-inner-border absolute inset-0" />
            <div ref={borderRef} class={ `selected-outer-border ${empty ? "software-selected-outer-border-empty" :"software-selected-outer-border"}` }/>
             { /* When software is being played this will show */ }
            <Show when={testingComponent}>
                <div class="software-playing-container">
                    <div ref={softwareIsPlayingProfilePictureRef} class="software-playing-active-user">
                        <Profile customStyle={{height: "66px", width: "66px", "margin-right": 0}} imgSource="/assets/profile_pictures/item_12_2.png" backgroundColor="#fd6a6e" profileName="Yosseuf"/>
                    </div>

                    <div class="software-playing-text-container">
                        <p>Playing</p>
                    </div>
                </div>
                <div class="software-change-user-text" ref={changeUserContaienrRef} >
                    <div class="change-user-button-icon">
                        <ButtonIcon theme={["#39C4C6", colorSchemeLight.background, "#39C4C6"]} iconContainerStyle={{"margin-left": 0}} text="Change User" letter="Y"/>
                    </div>
                </div>
            </Show>
        </div>
    );
}


export default Software;
