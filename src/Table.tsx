import { fprime } from "./Calculate";
import { Element } from "./Element";
import { IconButton } from "./IconButton";

export function Table(props: {
  energy: number;
  selected: Element[];
  colors: { [z: number]: string };
  setColors: (colors: { [z: number]: string }) => void;
}) {
  function handleDeselect(element: Element) {
    delete props.colors[element.z];
    props.setColors({ ...props.colors });
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
        {props.selected
          .sort((a, b) => a.z - b.z)
          .map((element) => {
            const [fp, fpp] = fprime(element.z, props.energy);
            return (
              <tr key={element.z}>
                <td>{element.z}</td>
                <td>{element.symbol}</td>
                <td className="text-right">{fp.toFixed(4)}</td>
                <td className="text-right">{fpp.toFixed(4)}</td>
                <td>
                  <div
                    className="h-4 w-4 rounded-md"
                    style={{ backgroundColor: props.colors[element.z] }}
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
