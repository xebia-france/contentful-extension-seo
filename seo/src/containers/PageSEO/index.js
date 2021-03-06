import React from 'react';
import PropTypes from 'prop-types';
import {Container, Banner} from "./styled";
import OGP from '../../fields/specific/OGP';
import Base from '../../fields/specific/Base';
import NoIndex from '../../fields/specific/NoIndex';
import Url from '../../fields/specific/Url';
import Data from '../../fields/specific/Data';

const PageSEO = ({page, index}) => {
    return (
        <Container>
            <Banner>
                <h4>{page.name[Object.keys(page.name)[0]]}</h4>
                <NoIndex index={index}/>
            </Banner>
            <div>
                <Url index={index}/>
                <Base index={index}/>
                <OGP index={index}/>
                <Data index={index}/>
            </div>
        </Container>
    );
}

PageSEO.propTypes = {
    page: PropTypes.object,
    index: PropTypes.number
};

export default PageSEO;
