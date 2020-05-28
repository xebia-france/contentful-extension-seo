import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Banner, Contain} from "./styled";
import PageSEO from '../PageSEO'

class ListPagesFormations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryFilter: '',
            categories: [],
            formations: [],
        };
    }

    componentDidMount = async () => {
        if (this.props.extension && this.props.extension.space) {
            await this.initRessources();
        }
    };

    componentDidUpdate = async (prevProps) => {
        if (this.props.extension !== prevProps.extension) {
            await this.initRessources();
        }
    }

    initRessources = async () => {
        await this.props.extension.space.getEntries({
            'content_type': 'formation',
        }).then(async result => {
            await result.items.map(async item => {
                let categoriesID = item.fields.category[this.props.defaultLocale].map(category => category.sys.id);

                let formation = {
                    id: item.sys.id,
                    name: item.fields.name[this.props.defaultLocale],
                    categories: await this.getCategoryNameByID(categoriesID)
                }

                this.setState({formations: [...this.state.formations, formation]})

                formation.categories.map(category => {
                    if (!this.state.categories.includes(category)) {
                        this.setState({
                            categories: [...this.state.categories, category]
                        })
                    }
                })
                return formation
            })
        });
    }

    getCategoryNameByID = (ids) => {
        return this.props.extension.space.getEntries({
            'sys.id[in]': ids.join(',')
        }).then(result => {
            return result.items.map(item => item.fields.name[this.props.defaultLocale])
        })
    }

    getFilteredFormation = () => {
        return this.state.formations.map(formation => formation.categories.includes(this.state.categoryFilter) ? formation : null)
            .filter(el => el)
    }


    getIndexOnStore = (page) => this.props.pages.indexOf(page)

    getPageFormationFromStoreByID = (id) => {
        const {pages} = this.props;
        return pages.find(page => page.id === id)
    }

    render() {
        const {pages, defaultLocale} = this.props;
        return (
            <Contain>
                <label>Select Category</label>
                <select value={this.state.categoryFilter}
                        onChange={(e) => this.setState({categoryFilter: e.target.value})}
                >
                    <option value={''}></option>
                    {
                        this.state.categories ?
                            this.state.categories.map(category => <option key={category}
                                                                          value={category}>{category}</option>)
                            : null
                    }
                </select>
                {
                    this.getFilteredFormation() ?
                        this.getFilteredFormation().map(formation => {
                            const pageFormation = this.getPageFormationFromStoreByID(formation.id)
                            return (<PageSEO key={formation.id} page={pageFormation}
                                             index={this.getIndexOnStore(pageFormation)}/>)


                        })
                        : null
                }
            </Contain>
        );
    }
}

ListPagesFormations.propTypes = {
    pages: PropTypes.array
};

const mapStateToProps = ({seo, extension}) => ({
    pages: seo.pages,
    extension: extension,
    defaultLocale: extension && extension.locales ? extension.locales.default : null
});
export default connect(mapStateToProps)(ListPagesFormations);