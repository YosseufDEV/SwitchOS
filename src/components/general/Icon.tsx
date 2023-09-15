interface Props {
    svgIconSrc: string,
    conStyle?: any,
    inStyle?: any,
}

function Icon({ svgIconSrc, inStyle, conStyle }: Props ) {
    return (
        <div style={conStyle}>
            <img src={svgIconSrc} style={inStyle}/>
        </div>
    )
}

export default Icon;
