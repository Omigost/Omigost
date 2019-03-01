import * as React from 'react';
import styled  from 'styled-components';

import SearchInput, {createFilter} from 'react-search-input';
import FlipMove from 'react-flip-move';

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

interface StyledSearchInputProps {
    fontSize?: string;
    theme?: any;
    type?: string;
}

const StyledSearchInput = styled(SearchInput)<StyledSearchInputProps>`
      & input {
          background: none;
          border: none;
          border-bottom: solid 2px ${(props: StyledSearchInputProps) => props.theme.colors.accent};
          border-left: none;
          font-family: ${(props: StyledSearchInputProps) => props.theme.primaryFont};
          font-size: ${(props: StyledSearchInputProps) => props.theme.fontSize[props.fontSize || 'default']};
          color: ${(props: StyledSearchInputProps) => props.theme.colors.accent};
          padding-left: 1.5vw;
          
          &:focus {
            border-bottom: solid 2px ${(props: StyledSearchInputProps) => props.theme.colors.primary};
            border-left: solid 2px ${(props: StyledSearchInputProps) => props.theme.colors.primary};
          }
          
          width: 100%;
      }
`;

interface SearchableListState {
    searchTerm: string;
}

export interface SearchableListProps<ItemT> {
    fontSize?: string;
    children: Array<ItemT>;
    filterBy?: Array<string>;
    renderItem: (ItemT) => React.ReactNode;
}

export default class SearchableList<ItemT> extends React.Component<SearchableListProps<ItemT>, SearchableListState> {
    
    state: SearchableListState = {
        searchTerm: ''
    };
    
    constructor (props) {
        super(props);
        
        this.searchUpdated = this.searchUpdated.bind(this);
    }
    
    searchUpdated(term) {
        this.setState({
            searchTerm: term
        });
    }
    
    render() {
        const filteredItems = this.props.children.filter(createFilter(this.state.searchTerm, this.props.filterBy || ['name']));
        
        return (
            <Wrapper>
                <StyledSearchInput
                  fontSize={this.props.fontSize || 'XL'}
                  className='search-input'
                  onChange={this.searchUpdated}
                />
                <FlipMove>
                    {
                        filteredItems.map((item: ItemT) => {
                          return this.props.renderItem(item);
                        })
                    }
                </FlipMove>
            </Wrapper>
        );
    }
}
