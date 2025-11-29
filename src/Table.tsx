import { Element } from "./Element";

export function Table({ elements }: { elements: Element[] }) {
  return (
    <table>
      <thead>
        <th colSpan={2}>Element</th>
        <th>f'</th>
        <th>f"</th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        {elements.map((element) => {
          return (
            <tr key={element.z}>
              <td>{element.z}</td>
              <td>{element.symbol}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <span className="material-symbols-outlined">close</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
