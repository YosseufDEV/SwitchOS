import PlayersIndicator, { PlayersAmount } from "../Footer/PlayersIndicator";
import ControllerIcon from "../../../public/assets/icons/ui/Pro_Controller.svg" 

function Controller() {
    return (
            <div class="controller">
                <PlayersIndicator playersAmount={ PlayersAmount.ONE } orientation="horizontal" />
                <ControllerIcon class="w-[90px]" />
            </div>
    )
}

export default Controller;
