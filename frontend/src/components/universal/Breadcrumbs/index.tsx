import * as React from "react";
import styled  from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

interface SingleCrumbProps {
  fontSize?: string;
  theme?: any;
  clickable?: boolean;
}

const SingleCrumb = styled.div<SingleCrumbProps>`
  font-family: ${(props: SingleCrumbProps) => props.theme.primaryFont};
  font-size: ${(props: SingleCrumbProps) => props.theme.fontSize[props.fontSize || "default"]};
  color: ${(props: SingleCrumbProps) => props.theme.colors.accent};
  display: inline-block;
  cursor: ${(props: SingleCrumbProps) => (props.clickable) ? ("pointer") :("auto")};

  padding: 0.1vw 0.3vw 0.1vw 0.3vw;

  &:${(props: SingleCrumbProps) => (props.clickable) ? ("hover") :(":none")} {
      background: ${(props: SingleCrumbProps) => props.theme.colors.accent};
      color: ${(props: SingleCrumbProps) => props.theme.colors.lightAccent};
  }
`;

const SingleCrumbSeparator = styled.div<SingleCrumbProps>`
  font-family: ${(props: SingleCrumbProps) => props.theme.primaryFont};
  font-size: ${(props: SingleCrumbProps) => props.theme.fontSize[props.fontSize || "default"]};
  color: ${(props: SingleCrumbProps) => props.theme.colors.accent};
  display: inline-block;
  margin-left: 1vw;
  margin-right: 1vw;
`;

export interface BreadcrumbItem {
    name: string;
    onClick?: () => void;
}

export interface BreadcrumbsProps {
    size?: string;
    children: Array<BreadcrumbItem>;
}

export default class Breadcrumbs extends React.Component<BreadcrumbsProps, undefined> {
    render() {

        const options = this.props.children
          .reduce((r, a) => r.concat(a, null), [null])
          .filter((item, index) => index);

        options.pop();

        return (
            <Wrapper>
                {
                    options.map((item: BreadcrumbItem, index: number) => {
                        if (item === null) {
                            // Separator
                            return (
                                <SingleCrumbSeparator
                                    key={`breadcrumb-item-${index}`}
                                >
                                    &gt;
                                </SingleCrumbSeparator>
                            );
                        }
                        return (
                            <SingleCrumb
                                key={`breadcrumb-item-${index}`}
                                onClick={item.onClick}
                                clickable={!!item.onClick}
                            >
                                {item.name}
                            </SingleCrumb>
                        );
                    })
                }
            </Wrapper>
        );
    }
}
