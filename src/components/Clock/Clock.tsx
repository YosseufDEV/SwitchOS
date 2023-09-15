import { createEffect } from "solid-js";


let timeRef: HTMLParagraphElement;
let amOrPmRef: HTMLParagraphElement;

function setupClock(timeRef, amOrPmRef) {
    const rawDate: string = new Date().toLocaleTimeString()
    const timeNow: string = rawDate.substring(0,5)
                            .charAt(rawDate.substring(0,5).length-1) == ":" ? rawDate.substring(0,4) : rawDate.substring(0,5);
    const amOrPm = rawDate.includes("AM") ? "AM" : "PM"
    timeRef.textContent = timeNow;
    amOrPmRef.textContent = amOrPm;
}

function Clock() {
    createEffect(() => {
        setupClock(timeRef, amOrPmRef);
        setInterval(() => setupClock(timeRef, amOrPmRef), 1000)
    })

    return (
        <div class="clock">
            <p ref={timeRef} class="time" >4:20</p>
            <p ref={amOrPmRef} class="dayornight" >PM</p>
        </div>
    )
}
export default Clock;
