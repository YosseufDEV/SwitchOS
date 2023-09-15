import { createSignal, JSXElement } from "solid-js";
import { setActiveElement } from "../../App";
import playAudio, { AudioEvents } from "../../components/SoundPlayer/SoundPlayer";

// const [navigationArray, setNavigationArray] = createSignal<HTMLDivElement[][]>();
const [activeSlot, setActiveSlot] = createSignal<HTMLDivElement>();
const [activeSlotIndex, setActiveSlotIndex] = createSignal<number[]>([1, 0]);
const [isGridMovement, setIsGridMovement] = createSignal<boolean>(true);

enum NavigationEvents {
    NAVIGATE_UP,
    NAVIGATE_DOWN,
    NAVIGATE_RIGHT,
    NAVIGATE_LEFT
}

type indexArray = readonly[number, number];

class Navigator {
    private _navigationArray: HTMLElement[][];
    private _afterNavigationAttachedFunction: Function;
    private _activeElementIndexInNavigationArray: indexArray;
    private _afterConfirmationAttachedFunction: Function;
    private navigationFunctionRef: Function;

    constructor(navigationArray?: HTMLElement[][],) {
        if(navigationArray)
        {
            this._navigationArray = navigationArray;
        }

        this._afterNavigationAttachedFunction = () => null;
        this._afterConfirmationAttachedFunction = () => null;
        this._navigationArray = [[]]
        this._activeElementIndexInNavigationArray = [0,1]
        this.navigationFunctionRef = this.navigationFunction.bind(this);
        this.attachEventListenersToWindow(this.navigationFunction.bind(this));
    }

    public freeze() {
        this.detachEventListenersFromWindow(this.navigationFunctionRef);
    }
    
    public resume() {
        this.attachEventListenersToWindow(this.navigationFunctionRef);
    }

    private attachEventListenersToWindow(attachedFunction: any) {
        window.addEventListener("keydown", attachedFunction)
    }

    private detachEventListenersFromWindow(detachedFunction: any) {
        window.removeEventListener("keydown", detachedFunction)
    }

    private navigationFunction(e: KeyboardEvent) {
        if(e.key == "e")
        {
            if(this._afterConfirmationAttachedFunction)
            {
                this._afterConfirmationAttachedFunction();
            }
        }
        if(e.key == "w")
        {
            this.dispatchKeyboardNavigationEvent(NavigationEvents.NAVIGATE_UP)
        }
        else if(e.key == "a")
        {
            this.dispatchKeyboardNavigationEvent(NavigationEvents.NAVIGATE_LEFT)
        }
        else if(e.key == "s") 
        {
            this.dispatchKeyboardNavigationEvent(NavigationEvents.NAVIGATE_DOWN)
        }
        else if(e.key == "d")
        {
            this.dispatchKeyboardNavigationEvent(NavigationEvents.NAVIGATE_RIGHT)
        }

    }

    private dispatchKeyboardNavigationEvent(event: NavigationEvents) {
        let currentXAxis: number = this._activeElementIndexInNavigationArray[0]
        let currentYAxis: number = this._activeElementIndexInNavigationArray[1]

        switch(event) {
            case NavigationEvents.NAVIGATE_UP : {
                // INFO : The JS Array starts at index 0 where the top element of the array is array[0] where 0 is the 3d array y value
                const isAtTheFirstRow = currentYAxis == 0;
                if(isAtTheFirstRow) return;

                const yAxis = --currentYAxis
                const xAxis = 0
                this._activeElementIndexInNavigationArray = [ xAxis, yAxis ]

                break;
            } 
            case NavigationEvents.NAVIGATE_DOWN: {
                const isAtTheLastRow = currentYAxis >= this._navigationArray?.length;
                if(isAtTheLastRow) return;

                console.log(currentYAxis);
                const yAxis = ++currentYAxis
                console.log(yAxis);
                const xAxis = 0
                this._activeElementIndexInNavigationArray = [ xAxis, yAxis ]

                break;
            } 
            case NavigationEvents.NAVIGATE_LEFT: {
                const isAtTheFirstElement = currentXAxis == 0;
                if(isAtTheFirstElement) return;

                const xAxis = --currentXAxis;
                this._activeElementIndexInNavigationArray = [ xAxis, currentYAxis ]

                break;
            } 
            case NavigationEvents.NAVIGATE_RIGHT: {
                const isAtTheLastElement = currentXAxis >= this._navigationArray[currentYAxis].length-1;
                if(isAtTheLastElement) return;

                const xAxis = ++currentXAxis;
                this._activeElementIndexInNavigationArray = [ xAxis, currentYAxis ]
1
                break;
            } 
        }
        if(this._afterNavigationAttachedFunction)
        {
            this._afterNavigationAttachedFunction();
        }
    }

    public attachAfterNavigationFunction(attachedFunction: any) {
        this._afterNavigationAttachedFunction = attachedFunction;
    }

    public attachAfterConfirmationFunction(attachedFunction: any) {
        this._afterConfirmationAttachedFunction = attachedFunction;
    }

    public get navigationArray() {
        return this._navigationArray;
    }

    public get activeElementIndexInArray() {
        return this._activeElementIndexInNavigationArray;
    }

    public setNavigationArray(navigationArray: HTMLElement[][]) {
        this._navigationArray = navigationArray;
    }

}

export default Navigator;
