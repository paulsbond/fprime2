import { Element } from "./Element";
import { IconButton } from "./IconButton";

export function Table(props: {
  elements: Element[];
  colors: string[];
  selected: number[];
  setColors: (colors: string[]) => void;
  setSelected: (selected: number[]) => void;
}) {
  function handleDeselect(element: Element) {
    props.setColors([element.color!, ...props.colors]);
    props.setSelected(props.selected.filter((z) => z !== element.z));
    element.color = undefined;
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Element</th>
          <th>f'</th>
          <th>f"</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.elements
          .sort((a, b) => a.z - b.z)
          .map((element) => {
            return (
              <tr key={element.z}>
                <td>{element.z}</td>
                <td>{element.symbol}</td>
                <td className="text-right">3.1233</td>
                <td className="text-right">3.1233</td>
                <td>
                  <div
                    className="h-4 w-4 rounded-md"
                    style={{ backgroundColor: element.color }}
                  ></div>
                </td>
                <td>
                  <IconButton
                    icon="close"
                    aria_label={`Deselect ${element.name}`}
                    onClick={() => handleDeselect(element)}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
