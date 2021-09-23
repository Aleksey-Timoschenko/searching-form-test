import PropTypes from 'prop-types'

const Button = props => {
    const {
        type,
        label,
        onClick,
    } = props;

    return (
        <button
            type={type}
            onClick={onClick}
        >
            { label }
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([ 'button', 'reset', 'submit' ]),
};

Button.defaultProps = {
    type: 'button',
    onClick: null,
};

export default Button;