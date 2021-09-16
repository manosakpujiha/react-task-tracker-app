import PropTypes from 'prop-types';
const Button = ({text, color, onClick}) => {
    return (
        <div>
            <button onClick = {onClick}  className= "btn" style = {{backgroundColor : color}} > {text}</button>
        </div>
    )
}


Button.defaultProps = { text: "hi", color: "steelblue"}
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick : PropTypes.func
}

export default Button
