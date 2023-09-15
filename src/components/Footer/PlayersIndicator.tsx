import { createEffect } from "solid-js";


enum PlayersAmount {
    ONE=1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE
}

interface Props {
    orientation?: string,
    playersAmount: PlayersAmount,
}

function setupPlayersIndicator(playersAmount: PlayersAmount, containerRef: HTMLDivElement) {
    if(playersAmount <= 4)
        for(let i = 0; i < playersAmount; i++)
            containerRef.children[i].classList.add("player-indicator-active")
    else
        switch(playersAmount) {
            case PlayersAmount.FIVE: {
                containerRef.children[0].classList.add("player-indicator-active")
                containerRef.children[containerRef.children.length-1].classList.add("player-indicator-active")
                break;
            }
            case PlayersAmount.SIX: {
                containerRef.children[0].classList.add("player-indicator-active")
                containerRef.children[containerRef.children.length-2].classList.add("player-indicator-active")
                break;
            }
            case PlayersAmount.SEVEN: {
                containerRef.children[0].classList.add("player-indicator-active")
                containerRef.children[containerRef.children.length-1].classList.add("player-indicator-active")
                containerRef.children[containerRef.children.length-2].classList.add("player-indicator-active")
                break;
            }
            case PlayersAmount.EIGHT: {
                containerRef.children[1].classList.add("player-indicator-active")
                containerRef.children[containerRef.children.length-2].classList.add("player-indicator-active")
                break;
            }
        }
}

function PlayersIndicator({ orientation="vertical", playersAmount }: Props ) {
    let playersIndicatorContainerRef: HTMLDivElement;

    createEffect(() => {
        setupPlayersIndicator(playersAmount, playersIndicatorContainerRef)
    })

    return (
        <div ref={playersIndicatorContainerRef} class="players-indicator-container" style={ orientation=="horizontal" && { "flex-direction": "row" }}>
            <div class="player-indicator-box">
            </div>
            <div class="player-indicator-box ">
            </div>
            <div class="player-indicator-box">
            </div>
            <div class="player-indicator-box">
            </div>
        </div>
    )
}

export default PlayersIndicator;
export { PlayersAmount };
