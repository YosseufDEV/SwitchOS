import { createEffect, createSignal, Show } from "solid-js";
import gsap from "gsap";

import { activeElement, ActiveElementType, activeElementType, activePage } from "../../App";
import ButtonIcon from "../ButtonIcon/ButtonIcon";

enum SelectedElement {
    AT_SOFTWARE,
    AT_SOFTWARE_RUNNING,
    AT_SOFTWARE_PLACEHOLDER,
    NOT_AT_HOME,
    AT_PROFILE,
    AT_OPTION,
}

enum CurrentPage {
    START,
    HOME,
}

enum ShownButtons {
    BUTTON_A_START,
    BUTTON_A_OK,
    BUTTON_LOCKED_A_OK,
    BUTTON_PLUS_OPTIONS,
    BUTTON_B_CHANGE_USER,
    BUTTON_X_CLOSE_SOFTWARE,
}

const [ selectedElement, setSelectedElement ] = createSignal<SelectedElement>();

let buttonsGuideRef: HTMLDivElement;

function animateButtonsGuide(selectedElementType: SelectedElement) {
    if(selectedElementType == selectedElement()) return;
    gsap.to(".buttons-guide-section", { opacity: 0, duration: 0.05 })
    .then(() => {
        setSelectedElement(selectedElementType);
        gsap.to(".buttons-guide-section", { opacity: 1, duration: 0.05 })
    })
}

function ItemActions() {
    const shownButtons = [ ShownButtons.BUTTON_A_START, ShownButtons.BUTTON_PLUS_OPTIONS ];
    createEffect(() => {
        if(activeElement() != null) 
        {
            switch(activeElementType()) {
                case ActiveElementType.ELEMENT_SOFTWARE: {
                    if(shownButtons.includes( ShownButtons.BUTTON_A_START) && shownButtons.includes(ShownButtons.BUTTON_PLUS_OPTIONS) ) return;
                    break;
                }
                case ActiveElementType.ELEMENT_SOFTWARE_PLACEHOLDER: {
                    if(shownButtons.length == 1 && shownButtons.includes(ShownButtons.BUTTON_LOCKED_A_OK) ) return;
                    break;
                }
                case ActiveElementType.ELEMENT_PROFILE: {
                    if(shownButtons.length == 1 && shownButtons.includes(ShownButtons.BUTTON_A_OK) ) return;
                    break;
                }
                case ActiveElementType.ELEMENT_OPTION: {
                    if(shownButtons.length == 1 && shownButtons.includes(ShownButtons.BUTTON_A_OK)) return;
                    break;
                }
            }
        }
    })

    return (
        <div ref={buttonsGuideRef} class="buttons-guide-section">
            <Show when={ shownButtons.length ==2 && shownButtons.includes(ShownButtons.BUTTON_A_START) && shownButtons.includes(ShownButtons.BUTTON_PLUS_OPTIONS) }>
                <ButtonIcon isMinusPlus={true} toolTip="Options" />
                <ButtonIcon letter="A" toolTip="Start" inStyle={{ "margin-right": "90px" }}/>
            </Show>
            <Show when={ shownButtons.length == 2 && shownButtons.includes(ShownButtons.BUTTON_A_OK) }>
                <ButtonIcon letter="A" toolTip="OK" inStyle={{ "margin-right": "90px" }}/>
            </Show>
        </div>
    )
}

export default ItemActions;
