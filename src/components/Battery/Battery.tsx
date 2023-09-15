import BatteryIcon from "../../../public/assets/icons/ui/switch_battery_icon.svg";

function Battery() {
    return (
        <div class="battery">
            <div class="battery-percentage">
                <p>95</p>
                <p class="percentage-mark">%</p>
            </div>
            <BatteryIcon style={{ scale: "1/1", width: "52px" }}/>
        </div>
    )
}

export default Battery;
