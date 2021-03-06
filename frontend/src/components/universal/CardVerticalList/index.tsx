import * as React from "react";
import styled from "styled-components";

import ScrollMenu from "react-horizontal-scrolling-menu";

import {
    faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CardItemSpecs {
    name: string;
    description: string;
    img?: string;
    value?: any;
    header?: () => React.ReactNode;
}

export interface CardVerticalListProps {
    items: Array<CardItemSpecs>;
    onSelected: (item: CardItemSpecs) => void;
    disableHoverAnimaions?: boolean;
}

interface ItemComponentProps {
  theme?: any;
  disableHoverAnimaions?: boolean;
}

const Arrow = styled.div`
  font-size: 1vw;
`;

const itemHoverStyle = `
  &:hover .ItemHeader {
    height: 40%;
  }

  &:hover .ItemSelectBoxIcon {
    padding-top: 0.5vw;
    font-size: 3.5vw;
  }

  &:hover .ItemImage {
    opacity: 0;
  }
`;

const Item = styled.div<ItemComponentProps>`
  border-radius: 0.5vw;
  background: #ffffff;
  box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
  margin: 1vw;
  height: 20vw;
  width: 15vw;
  cursor: pointer;

  ${(props: ItemComponentProps) => ((props.disableHoverAnimaions) ? ("") : (itemHoverStyle))}
`;

const ItemInner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ItemHeader = styled.div<ItemComponentProps>`
  height: 0%;
  width: 100%;
  background: ${(props: ItemComponentProps) => props.theme.colors.primaryGradient};
  text-align: center;

  transition: height 0.6s ease;
`;

const ItemImage = styled.img`
  position: relative;
  width: 5vw;
  height: 5vw;
  left: -1.3vw;
  top: -21.3vw;

  transition: all 0.6s ease;
`;

const ItemSelectBoxIcon = styled.div`
  color: white;
  font-size: 6vw;
  padding-top: 4vw;

  transition: all 0.6s ease;
`;

const ItemSelectBoxText = styled.div`
  font-size: 1vw;
  white-space: normal;
  color: white;
  font-weight: bold;
`;

const ItemTitle = styled.div`
  text-align: center;
  margin-top: 0.5vw;
  margin-bottom: 1vw;
  font-size: 1.8vw;
  white-space: normal;
`;

const ItemDescription = styled.div`
  font-size: 1vw;
  padding: 1vw;
  white-space: normal;
  text-align: center;
`;

const Container = styled.div<ItemComponentProps>`
  width: 100%;
  height: 100%;
  font-family: ${(props: ItemComponentProps) => props.theme.primaryFont};
`;

class CardVerticalList extends React.Component<CardVerticalListProps, undefined> {

    constructor(props) {
        super(props);
    }

    render() {
        const menu = this.props.items.map(item => {
            const { img, name, description, header } = item;
            return (
                <Item key={name} className="menu-item" disableHoverAnimaions={this.props.disableHoverAnimaions}>
                    <ItemInner>
                        <ItemHeader className="ItemHeader">
                            {
                                (header) ? (header()) : (
                                    <>
                                        <ItemSelectBoxIcon className="ItemSelectBoxIcon">
                                            <FontAwesomeIcon icon={faBoxOpen.iconName} />
                                        </ItemSelectBoxIcon>
                                        <ItemSelectBoxText>
                                            Use that communication channel
                                        </ItemSelectBoxText>
                                    </>
                                )
                            }
                        </ItemHeader>
                        <ItemTitle>
                            {name}
                        </ItemTitle>
                        <ItemDescription>
                            {description}
                        </ItemDescription>
                    </ItemInner>
                    {
                        (img) ? (
                            <ItemImage className="ItemImage" src={img}/>
                        ) : (null)
                    }
                </Item>
            );
        });

        return (
            <Container>
                <ScrollMenu
                    data={menu}
                    arrowLeft={
                        <Arrow className="arrow-prev">
                            &lt;
                        </Arrow>
                    }
                    arrowRight={
                        <Arrow className="arrow-next">
                            &gt;
                        </Arrow>
                    }
                    selected={null}
                    onSelect={(key) => {
                        this.props.onSelected(this.props.items.find(item => item.name === key));
                    }}
                />
            </Container>
        );
    }
}
export default CardVerticalList;

