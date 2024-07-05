import React from "react";
import styled from "styled-components";
import type { ListItemProps } from "./list-item";
import ListItem from "./list-item";

type Props = {
  data: ListItemProps[];
};

const List = ({ data }: Props) => {
  return (
    <Ul>
      {data.map((item, i) => (
        <ListItem
          key={i}
          price={item.price}
          title={item.title}
          diff={item.diff}
          subtitle={item.subtitle}
        />
      ))}
    </Ul>
  );
};

const Ul = styled.ul(() => ({
  height: "100%",
  width: "100%",
  listStyleType: "none",
  padding: "4px",
  background: "#131722",

  "& > * + *": {
    marginTop: "8px",
  }
}));

export default List;
