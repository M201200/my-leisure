type Props = {
  minNumber: number
  maxNumber: number
  firstNumber: number
  lastNumber: number
  label: string
  setMInNumber: (event: React.ChangeEvent<HTMLSelectElement>) => void
  setMaxNumber: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectMinMaxNumber({
  minNumber,
  maxNumber,
  firstNumber,
  lastNumber,
  label,
  setMInNumber,
  setMaxNumber,
}: Props) {
  function optionNumberList(min: number, max: number) {
    const List: number[] = []
    for (let number = min; number <= max; number++) {
      List.push(number)
    }
    return List
  }

  const minNumberArray = optionNumberList(firstNumber, maxNumber - 1).map(
    (number) => (
      <option key={number} value={number}>
        {number}
      </option>
    )
  )

  const maxNumberArray = optionNumberList(minNumber + 1, lastNumber).map(
    (number) => (
      <option key={number} value={number}>
        {number}
      </option>
    )
  )
  return (
    <li>
      <label className="font-bold text-accent" title={label}>
        {label}
      </label>
      <div className="flex p-1 rounded gap-x-1 bg-secondary text-textPrimary">
        <select
          className="p-1 cursor-pointer bg-secondary text-textPrimary"
          onChange={(event) => setMInNumber(event)}
          value={minNumber}
          name="selectMinNumber"
        >
          {minNumberArray}
        </select>
        <select
          className="p-1 border-l cursor-pointer bg-secondary text-textPrimary border-l-primary"
          onChange={(event) => setMaxNumber(event)}
          value={maxNumber}
          name="selectMaxNumber"
        >
          {maxNumberArray}
        </select>
      </div>
    </li>
  )
}
