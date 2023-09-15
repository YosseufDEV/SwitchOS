import { DOMElement } from "solid-js/jsx-runtime";
import Queue from "../../ts/Queue";

enum Axis {
    AXIS_X,
    AXIS_Y
}

enum GamepadButtons {
    RIGHT_ANALOG_X,
    RIGHT_ANALOG_Y,
    LEFT_ANALOG_X,
    LEFT_ANALOG_Y,
    X_BUTTON,
    SQUARE_BUTTON,
    O_BUTTON,
    TRIANGLE_BUTTON,
}


namespace GamepadEventsBus {

    private class GamePadEvent {
        public readonly target: DOMElement;
        public readonly eventToDispatch: MouseEvent | KeyboardEvent;
        public readonly buttonId: GamepadButtons;

        constructor(
                    target: DOMElement,
                    eventToDispatch: MouseEvent,
                    buttonId: GamepadButtons,
                ) {
            this.target = target;
            this.eventToDispatch = eventToDispatch;
            this.buttonId = buttonId;
        }
    }

    public class EventsBus {
        readonly defaultAxisValue: number | undefined;
        axisReturningToInitial: boolean;
        _softwarePadEventsQueue: Queue<GamepadEvent>;
        _target: DOMElement | Window | null;

        constructor() {
            this.defaultAxisValue = 0.0000152587890625;
            this.axisReturningToInitial = false;
            this._target = null;
            this._softwarePadEventsQueue = new Queue<GamepadEvent>();

            this.startEventsWatcher();
        }

        private startEventsWatcher() {
            setInterval(() => {
                if(this._softwarePadEventsQueue.length == 0) return;
                const softwarepadEventToDispatch = this._softwarePadEventsQueue.dequeue();
            }, 1)
        }

        private recieveEvent(event: GamePadEvent) {
            this._softwarePadEventsQueue.enqueue(event);
        }

        private simulateKeyboardPress(eventToDispatch: KeyboardEvent, target: DOMElement | Window): void {
            target.dispatchEvent(eventToDispatch);
        }

        private simulateMousePress(eventToDispatch: MouseEvent, target: DOMElement | Window): void {
            target.dispatchEvent(eventToDispatch);
        }

        private translateKey(keyIndex: number, target: DOMElement | Window): void {
            switch(keyIndex) {
                case 0: {
                    this.simulateMousePress("dblclick", target)
                    break;
                }
                case 12: {
                    this.simulateKeyboardPress("w", target);
                    break;
                }
                case 13: {
                    this.simulateKeyboardPress("s", target);
                    break;
                }
                case 14: {
                    this.simulateKeyboardPress("a", target);
                    break;
                }
                case 15: {
                    this.simulateKeyboardPress("d", target);
                    break;
                }
                default: {
                }
            }
        }

        private translateAxisMovement(initialValue: number, currentValue: number, axis: Axis, target: DOMElement | Window, callerIdentifier: movementCaller): void {
            if(currentValue == this.defaultAxisValue) 
                this.axisReturningToInitial = false;
            if(axis == Axis.AXIS_X) {
                if(currentValue - initialValue >= 0 && !this.axisReturningToInitial) {
                    if(currentValue >= 0.5)
                        this.simulateKeyboardPress("d", target);
                }
                if(currentValue - initialValue <= 0 && !this.axisReturningToInitial) {
                    if(currentValue <= -0.5) {
                        this.simulateKeyboardPress("a", target);
                    }
                }
            }
            if(axis == Axis.AXIS_Y) {
                if(currentValue - initialValue > 0 && !this.axisReturningToInitial) {
                    if(currentValue >= 0.5)
                        this.simulateKeyboardPress("s", target);
                }
                if(currentValue - initialValue < 0 && !this.axisReturningToInitial) {
                    if(currentValue >= 0.5)
                        this.simulateKeyboardPress("w", target);
                }
            }
            if(currentValue == 1)
                this.axisReturningToInitial = true;
        }

        private softwarePadConnectedEventFunction(e: GamepadEvent, target: DOMElement | Window) {
            function buttonPressed(b: GamepadButton) {
                if (typeof b === "object") {
                    return b.pressed;
                }
                return b === 1.0;
            }

            let softwarepad = e.softwarepad;
            let currentXAxisValue = softwarepad.axes[0];
            let currentYAxisValue = softwarepad.axes[1];

            for(let i = 0; i < softwarepad.buttons.length; i++) {
                setInterval(() => { 
                    if(buttonPressed(navigator.getGamepads()[0].buttons[i])) // Using navigator instead of softwarepad because softwarepad state is a snapshot of the current state
                        this.translateKey(i, target);
                }, 100);

                setInterval(() => { 
                    if(navigator.getGamepads()[0]?.axes[0] != currentXAxisValue)
                        this.translateAxisMovement(currentXAxisValue, navigator.getGamepads()[0].axes[0], Axis.AXIS_X, target)
                    if(navigator.getGamepads()[1]?.axes[1] != currentYAxisValue)
                        this.translateAxisMovement(currentXAxisValue, navigator.getGamepads()[0].axes[1], Axis.AXIS_Y, target)
                    currentXAxisValue = navigator.getGamepads()[0]?.axes[0]
                    currentYAxisValue = navigator.getGamepads()[0]?.axes[1]
                }, 100);
            }
        }

        private listenToGamePadEventsOn(target: DOMElement | Window) {
            window.addEventListener("softwarepadconnected", (e) => this.softwarePadConnectedEventFunction(e, target))
        }

        public watch(target: DOMElement | Window) {
            window.removeEventListener("softwarepadconnected", (e) => this.softwarePadConnectedEventFunction(e, target))
            this._target = target;
            this.listenToGamePadEventsOn(target);
        }

        public reset() {
            this.listenToGamePadEventsOn(window);
        }

        public getGamepads() {
            return navigator.getGamepads().filter(gp => gp);
        }

    }
}


const softwarePadEventsManager = new GamepadEventsBus.EventsBus();
export default softwarePadEventsManager;

