import styled from "styled-components";
import type { CSSProperties } from "styled-components";

type Props = {
  title: string;
  subtitle: string;
  price: string;
  diff: string;
};

const ListItem = ({ title, subtitle, price, diff, }: Props) => {
  return (
    <Li>
      <Col alignitems="flex-start">
        <Text size="lg">{title}</Text>
        <Text size="md">{subtitle}</Text>
      </Col>

      <Col alignitems="flex-end">
        <Text size="lg">{price}</Text>
        <Text size="md" color={Number(diff) < 0 ? "var(--negative)" : "var(--positive)"}>{diff} %</Text>
      </Col>
    </Li>
  );
};

const Li = styled.li(() => ({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "space-between",
  padding: "4px",
  
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, .05)"
  },
}));

const Col = styled.div<{ alignitems: CSSProperties["alignItems"] }>(({alignitems}) => ({
  display: "flex",
  gap: "8px",
  alignItems: alignitems,
  flexDirection: "column",
}));

const Text = styled.p<{color?: string; size: "md" | "lg"}>(({ color, size }) => ({
  color: color || "var(--contrast)",
  ...(size === "lg" ? {
    fontSize: "20px",
    fontWeight: "500",
  } : {
  }),
}));

export type { Props as ListItemProps };
export default ListItem;
