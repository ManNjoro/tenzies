export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFF'
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h5 >{props.value}</h5>
        </div>
    )
}