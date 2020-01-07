import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Container, Title, Field , Row, Column} from './styled'


import { updateGlobal } from '../../../actions/index'

class GoogleTagManager extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        const { dispatch, storeValue } = this.props;

        return (
            <Container>
                <Title>Google Tag Manager</Title>
                <Field>
                    <Row>
                        <Column>
                            <label>{ 'to <head>' }</label>
                            <textarea type={'text'}
                                      defaultValue={storeValue && storeValue.head ? storeValue.head : ''}
                                      onChange={e => {
                                          dispatch(updateGlobal('GoogleTagManager', 'head', e.target.value))
                                      }}/>
                        </Column>
                        <Column>
                            <label>{ 'to <body>' }</label>
                            <textarea type={'text'}
                                      defaultValue={storeValue && storeValue.body ? storeValue.body : ''}
                                      onChange={e => {
                                          dispatch(updateGlobal('GoogleTagManager', 'body', e.target.value))
                                      }}/>
                        </Column>
                    </Row>


                </Field>

            </Container>
        );
    }
}

const mapStateToProps = ({ seo }) => ({
    storeValue : seo.global['GoogleTagManager'] || null
});

export default connect(mapStateToProps)(GoogleTagManager);