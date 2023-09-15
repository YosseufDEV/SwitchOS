import Clock from "../../Clock/Clock"
import WifiIcon from "../../../../public/assets/icons/ui/switch_wifi_icon.svg";
import Battery from "../../Battery/Battery";

function Status() {
    return (
        <div class="status">
            <Clock />
            <WifiIcon style={{ scale: "1/1", width: "41px", "margin-left": "38px" }} />
            <Battery />
        </div>
    )
}

export default Status;
