import * as React from "react";
import styled  from "styled-components";

import TinyButtons, { ButtonSpecs } from "../TinyButtons";

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

export interface ItemContainer<DataT> {
    data: DataT;
    img?: string;
    name?: string;
    actions?: Array<ButtonSpecs | null>;
}

export interface PlainListProps<DataT> {
    items: Array<ItemContainer<DataT>>;
}

const ItemNameWrapper = styled.div`
  display: inline-block;
  font-size: 1.3vw;
`;

const ItemImageWrapper = styled.div`
  display: inline-block;
  float: left;
`;

const Item = styled.div`
  margin-top: 0.2vw;
`;

const ItemImage = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  margin-right: 0.4vw;
`;

const ItemActionsWrapper = styled.div`
  display: inline-block;
  margin-left: 30%;
`;

export default class PlainList<DataT> extends React.Component<PlainListProps<DataT>, undefined> {

    render() {
        return (
            <Wrapper>
                {
                    this.props.items.filter(item => item !== null).map(item => {
                        return (
                            <Item>
                                {
                                    (item.img) ? (
                                        <ItemImageWrapper>
                                            <ItemImage src={item.img} />
                                        </ItemImageWrapper>
                                    ) : (null)
                                }
                                {
                                    (item.name) ? (
                                        <ItemNameWrapper>
                                            {item.name}
                                        </ItemNameWrapper>
                                    ) : (null)
                                }
                                {
                                    (item.actions) ? (
                                        <ItemActionsWrapper>
                                            <TinyButtons>
                                                {item.actions}
                                            </TinyButtons>
                                        </ItemActionsWrapper>
                                    ) : (null)
                                }
                            </Item>
                        );
                    })
                }
            </Wrapper>
        );
    }
}
