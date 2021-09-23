import PropTypes from 'prop-types'
import React from 'react';

import { getRenderingStrategyByType } from '../../services/listService/listService';
import { isArrayEmpty } from '../../helpers/arrayHelper/arrayHelper';

const List = props => {
    const {
        list,
        type,
    } = props;

    return (
        !isArrayEmpty(list) && (
            <div className={'list-wrapper'}>
                { getRenderingStrategyByType[type](list) }
            </div>
        )
    )
};

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    })).isRequired,
    type: PropTypes.oneOf(['ordered', 'unordered']),
}

List.defaultProps = {
    type: 'unordered',
}

export default React.memo(List);