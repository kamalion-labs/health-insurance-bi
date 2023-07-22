export const CenteredMoneyMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0;
  dataWithArc.forEach((datum: any) => {
    total += datum.value;
  });

  return (
    <g x={centerX} y={centerY} dominantBaseline="central">
      <text
        x={centerX}
        y={centerY - 5}
        textAnchor="middle"
        style={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        R${" "}
        {total.toLocaleString("pt-Br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </text>

      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        style={{
          fontSize: "12px",
        }}
      >
        Total
      </text>
    </g>
  );
};

export const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0;

  dataWithArc.forEach((datum: any) => {
    total += datum.value;
  });

  return (
    <g x={centerX} y={centerY} dominantBaseline="central">
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        style={{
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        {total}
      </text>

      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        style={{
          fontSize: "16px",
        }}
      >
        Total
      </text>
    </g>
  );
};
