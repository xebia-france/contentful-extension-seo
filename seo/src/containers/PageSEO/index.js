import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Banner} from "./styled";
import update from 'react-addons-update';
import OGP from '../../fields/specific/OGP';
import Base from '../../fields/specific/Base';


class PageSEO extends Component {
    constructor (props) {
        super(props);

        this.state = {

        };
    }


    render () {
        const { dispatch ,page , locales, id } = this.props;

        return (
            <Container>
                <Banner>
                    <h4>{ page.slug[Object.keys( page.slug)[0]] }</h4>
                    <h4>{id}</h4>
                </Banner>
                <div>
                   <Base idPage={id}/>
                   <OGP idPage={id}/>
                </div>

            </Container>
        );
    }
}

PageSEO.propTypes = {
};


const mapStateToProps = ({ extension }) => ({
    locales: extension.locales,
});
export default connect(mapStateToProps)(PageSEO);